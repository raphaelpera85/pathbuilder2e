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

    // Se houver modal de boas-vindas / alert, clica em aceitar ou fechar
    try {
      await page.evaluate(() => {
        const acceptBtn = document.querySelector('#alert-accept, .btn-accept, #modal-accept');
        if (acceptBtn) acceptBtn.click();
        const backdrop = document.querySelector('#backdrop');
        if (backdrop && backdrop.style.display !== 'none') backdrop.click();
      });
    } catch (e) {}

    const classesToTest = ['Swashbuckler', 'Fighter', 'Wizard', 'Cleric', 'Kineticist', 'Rogue', 'Witch', 'Champion'];
    const results = {};

    for (const className of classesToTest) {
      console.log(`\n=== Testando Classe: ${className} no Pathbuilder Original ===`);

      // 1. Criar novo personagem
      await page.evaluate(() => {
        const sideNav = document.getElementById('mySidenav');
        if (sideNav) sideNav.classList.add('open');
        const newBtn = document.getElementById('sidenav-new');
        if (newBtn) newBtn.click();
      });
      await new Promise(r => setTimeout(r, 1500));

      // Aceita criar novo se pedir confirmação
      await page.evaluate(() => {
        const accept = document.querySelector('#alert-accept, .alert-accept, #modal-confirm, .dialog-button');
        if (accept) accept.click();
      });
      await new Promise(r => setTimeout(r, 1500));

      // 2. Clicar no seletor de Classe no Level 1
      await page.evaluate((targetClass) => {
        // Encontra o card de classe
        const classCards = Array.from(document.querySelectorAll('.build-card, .tree-card, .plan-card, div'));
        const classEntry = classCards.find(el => el.innerText && (el.innerText.includes('Select Class') || el.innerText.includes('Class\nSelect') || el.innerText.includes('Class:')));
        if (classEntry) classEntry.click();
      }, className);
      await new Promise(r => setTimeout(r, 1500));

      // 3. Selecionar a classe no modal
      await page.evaluate((targetClass) => {
        const options = Array.from(document.querySelectorAll('.list-item, .modal-item, .choice-item, div, button'));
        const opt = options.find(el => el.innerText && el.innerText.trim().toLowerCase() === targetClass.toLowerCase());
        if (opt) {
          opt.click();
          // Clica em select/accept se houver
          const selBtn = document.querySelector('#modal-select, .modal-confirm, #choice-accept');
          if (selBtn) selBtn.click();
        }
      }, className);
      await new Promise(r => setTimeout(r, 2500));

      // 4. Capturar screenshot e dados estruturais da árvore do Nível 1
      const filename = `class_${className.toLowerCase()}.png`;
      await page.screenshot({ path: path.join(OUTPUT_DIR, filename) });
      console.log(`Screenshot salva: audit_snapshots/${filename}`);

      const classData = await page.evaluate(() => {
        // Pega todos os cards e itens da coluna de build
        const buildCol = document.getElementById('divBuild') || document.querySelector('.main-column-left') || document.body;
        const cards = Array.from(buildCol.querySelectorAll('.build-section, .build-card, .item-container, div'))
          .map(el => {
            const text = el.innerText?.trim();
            const classes = el.className;
            return { text, classes };
          })
          .filter(c => c.text && c.text.length > 2 && c.text.length < 200);

        // Agrupa textos únicos relevantes
        const uniqueTexts = [];
        for (const c of cards) {
          if (!uniqueTexts.some(t => t.text === c.text)) {
            uniqueTexts.push(c);
          }
        }

        return {
          cardCount: uniqueTexts.length,
          cards: uniqueTexts.slice(0, 40)
        };
      });

      results[className] = classData;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, '03_classes_comparison.json'), JSON.stringify(results, null, 2));
    console.log('\nTodos os dados de classes comparados e salvos em audit_snapshots/03_classes_comparison.json');

  } catch (err) {
    console.error('Erro no teste de classes:', err);
  } finally {
    await browser.close();
    console.log('Browser fechado.');
  }
}

run();
