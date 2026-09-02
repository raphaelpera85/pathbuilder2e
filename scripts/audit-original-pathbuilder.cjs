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

    // Clica no card NEW CHARACTER na tela inicial
    console.log('Clicando em NEW CHARACTER...');
    await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('div, span, p, a, h1, h2, h3'));
      const newCharCard = allElements.find(el => el.innerText && el.innerText.includes('NEW') && el.innerText.includes('CHARACTER'));
      if (newCharCard) {
        newCharCard.click();
      }
    });

    await new Promise(r => setTimeout(r, 4000));

    // Capturar tela principal do construtor
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_character_builder_ready.png') });
    console.log('Tela do construtor pronta salva: audit_snapshots/04_character_builder_ready.png');

    // Agora vamos testar as classes
    const classesToTest = ['Swashbuckler', 'Fighter', 'Wizard', 'Cleric', 'Kineticist', 'Rogue', 'Witch', 'Champion'];
    const classResults = {};

    for (const className of classesToTest) {
      console.log(`\n=== Testando Classe: ${className} ===`);

      // 1. Clicar no botão/card de seleção de Classe
      const clicked = await page.evaluate(() => {
        const divs = Array.from(document.querySelectorAll('div, button, span'));
        // No Pathbuilder, o card de classe contém "Select Class" ou o nome da classe atual
        const target = divs.find(d => {
          const t = d.innerText?.trim();
          return t === 'Select Class' || t?.includes('Select Class') || d.id === 'class-selection' || d.className?.includes('class-card');
        });
        if (target) {
          target.click();
          return true;
        }
        return false;
      });

      console.log(`Clicou no card de classe: ${clicked}`);
      await new Promise(r => setTimeout(r, 2000));

      // 2. No modal de seleção de classes, procurar e clicar na classe desejada
      const selected = await page.evaluate((cls) => {
        const items = Array.from(document.querySelectorAll('div, tr, td, li, span, button'));
        const opt = items.find(el => el.innerText && el.innerText.trim().toLowerCase() === cls.toLowerCase());
        if (opt) {
          opt.click();
          return true;
        }
        return false;
      }, className);

      console.log(`Selecionou classe ${className}: ${selected}`);
      await new Promise(r => setTimeout(r, 1500));

      // 3. Clicar no botão de confirmação do modal (ex: "Select", "Accept", "Choose")
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div, span'));
        const selBtn = btns.find(b => {
          const t = b.innerText?.trim();
          return t === 'Select' || t === 'Choose' || t === 'Accept' || t === 'Confirm';
        });
        if (selBtn) selBtn.click();
      });

      await new Promise(r => setTimeout(r, 3000));

      // 4. Capturar screenshot do Nível 1 com a classe
      const screenshotPath = path.join(OUTPUT_DIR, `class_${className.toLowerCase()}_live.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot salva: ${screenshotPath}`);

      // 5. Extrair todos os cards de features e feats do Nível 1
      const levelData = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('div, span, p')).map(el => el.innerText?.trim()).filter(Boolean);
        const unique = [];
        for (const t of elements) {
          if (t.length > 2 && t.length < 120 && !unique.includes(t)) {
            unique.push(t);
          }
        }
        return unique.slice(0, 60);
      });

      classResults[className] = levelData;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, '06_live_classes_data.json'), JSON.stringify(classResults, null, 2));
    console.log('Resultados completos salvos em 06_live_classes_data.json');

  } catch (err) {
    console.error('Erro no teste de classes:', err);
  } finally {
    await browser.close();
    console.log('Browser fechado.');
  }
}

run();
