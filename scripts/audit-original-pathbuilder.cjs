const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'audit_snapshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando Chrome para comparar classes no Pathbuilder 2e Original...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1440, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  try {
    const pages = await browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();

    console.log('Acessando https://pathbuilder2e.com/app.html?v=109g...');
    await page.goto('https://pathbuilder2e.com/app.html?v=109g', { waitUntil: 'domcontentloaded', timeout: 90000 });

    // Aguarda o app carregar
    await page.waitForSelector('#main-container:not(.hidden), #backdrop, .menu-bar', { timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000));

    // Aguarda e clica no botão Accept do diálogo inicial de cache
    console.log('Aguardando diálogo inicial de permissão...');
    await new Promise(r => setTimeout(r, 3000));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span, a'));
      const acceptBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Accept');
      if (acceptBtn) {
        console.log('Clicando em Accept...');
        acceptBtn.click();
      }
    });

    // Aguarda o app carregar todos os dados (3mb+ de compêndio)
    console.log('Aguardando carregamento completo do app...');
    await new Promise(r => setTimeout(r, 8000));

    // Capturar tela principal após aceitar permissão
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_main_builder.png') });
    console.log('Tela principal salva: audit_snapshots/03_main_builder.png');

    // Analisa a estrutura do construtor no nível 1
    const builderStructure = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.innerText?.trim();
        return text && text.length > 2 && text.length < 80 && el.children.length === 0;
      }).map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        text: el.innerText.trim()
      }));

      return {
        totalLeaves: allElements.length,
        leaves: allElements
      };
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, '04_builder_structure.json'), JSON.stringify(builderStructure, null, 2));
    console.log('Estrutura de nós do builder salva.');

    // Clica no card NEW CHARACTER com mouse real baseado em bounding rect
    console.log('Localizando e clicando em NEW CHARACTER com coordenadas reais...');
    const clickedNew = await page.evaluate(() => {
      const allDivs = Array.from(document.querySelectorAll('div, img, span, p'));
      const target = allDivs.find(el => el.innerText && el.innerText.includes('NEW') && el.innerText.includes('CHARACTER') && !el.innerText.includes('LOAD'));
      if (target) {
        const rect = target.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rect };
      }
      return null;
    });

    if (clickedNew) {
      console.log('Coordenadas do botão NEW CHARACTER:', clickedNew.x, clickedNew.y);
      await page.mouse.click(clickedNew.x, clickedNew.y);
    } else {
      console.log('Fallback: clicando no centro da tela superior (x: 720, y: 380)');
      await page.mouse.click(720, 380);
    }

    await new Promise(r => setTimeout(r, 6000));

    // Capturar tela principal do construtor
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_character_builder_ready.png') });
    console.log('Tela do construtor pronta salva: audit_snapshots/04_character_builder_ready.png');

    // Clica no botão "Get Started" do modal de novo personagem
    console.log('Clicando em Get Started...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span, a'));
      const getStartedBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Get Started');
      if (getStartedBtn) {
        getStartedBtn.click();
      }
    });

    await new Promise(r => setTimeout(r, 4000));

    // Capturar tela principal do construtor aberto
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05_builder_loaded.png') });
    console.log('Tela do construtor carregado salva: audit_snapshots/05_builder_loaded.png');

    // Extrair todos os elementos clicáveis do construtor no nível 1 inicial
    const builderCards = await page.evaluate(() => {
      const cards = [];
      document.querySelectorAll('div, tr, li, p, span').forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 2 && text.length < 80 && !cards.includes(text)) {
          cards.push({ text, id: el.id, className: el.className });
        }
      });
      return cards;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, '05_initial_builder_cards.json'), JSON.stringify(builderCards, null, 2));

    const classesToTest = [
      'Swashbuckler',
      'Fighter',
      'Wizard',
      'Cleric',
      'Kineticist',
      'Rogue',
      'Witch',
      'Champion',
      'Barbarian',
      'Alchemist'
    ];
    const classResults = {};

    for (const className of classesToTest) {
      console.log(`\n========================================`);
      console.log(`>>> Testando Classe no Original: ${className} <<<`);
      console.log(`========================================`);

      // 1. Clicar no seletor de Classe
      const clickedClass = await page.evaluate(() => {
        const allDivs = Array.from(document.querySelectorAll('div, span, button'));
        // Procura card de classe (geralmente tem "Class" e "Select" ou nome de classe)
        const target = allDivs.find(d => {
          const t = d.innerText?.trim();
          return t === 'Class' || t?.startsWith('Class\n') || t?.includes('Select Class') || d.id === 'divClass' || d.className?.includes('class-card');
        });
        if (target) {
          target.click();
          return true;
        }
        return false;
      });

      console.log(`Clique no seletor de classe: ${clickedClass}`);
      await new Promise(r => setTimeout(r, 2000));

      // 2. No modal de seleção, clicar na classe
      const selected = await page.evaluate((cls) => {
        const items = Array.from(document.querySelectorAll('div, tr, td, li, span, button, p'));
        const opt = items.find(el => el.innerText && el.innerText.trim().toLowerCase() === cls.toLowerCase());
        if (opt) {
          opt.click();
          return true;
        }
        return false;
      }, className);

      console.log(`Seleção da classe ${className}: ${selected}`);
      await new Promise(r => setTimeout(r, 1500));

      // 3. Confirmar no modal se houver botão Select / Choose / Accept
      await page.evaluate(() => {
        const confirmBtns = Array.from(document.querySelectorAll('button, div, span'));
        const confirm = confirmBtns.find(b => {
          const t = b.innerText?.trim();
          return t === 'Select' || t === 'Choose' || t === 'Accept' || t === 'Confirm';
        });
        if (confirm) confirm.click();
      });

      await new Promise(r => setTimeout(r, 3000));

      // 4. Captura screenshot da árvore de Nível 1 com a classe aplicada
      const screenshotPath = path.join(OUTPUT_DIR, `class_${className.toLowerCase()}_live_tree.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot salva: ${screenshotPath}`);

      // 5. Extrai todos os cards e opções exibidas no Nível 1
      const level1Cards = await page.evaluate(() => {
        const buildSection = document.getElementById('divBuild') || document.querySelector('.main-column-left') || document.body;
        const entries = [];
        buildSection.querySelectorAll('div, span, p, tr').forEach(el => {
          const text = el.innerText?.trim();
          if (text && text.length > 2 && text.length < 100 && !entries.some(e => e.text === text)) {
            entries.push({ text, id: el.id, className: el.className });
          }
        });
        return entries;
      });

      classResults[className] = level1Cards;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, '07_detailed_classes_live_data.json'), JSON.stringify(classResults, null, 2));
    console.log('\nTodos os dados detalhados das classes salvos em 07_detailed_classes_live_data.json');

  } catch (err) {
    console.error('Erro no teste de classes:', err);
  } finally {
    await browser.close();
    console.log('Browser fechado.');
  }
}

run();
