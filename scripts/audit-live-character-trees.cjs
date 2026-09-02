const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'audit_snapshots');

async function run() {
  console.log('Iniciando captura detalhada das árvores de classes no Pathbuilder 2e Original...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });

  try {
    const pages = await browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();

    console.log('Navegando para https://pathbuilder2e.com/app.html?v=109g...');
    await page.goto('https://pathbuilder2e.com/app.html?v=109g', { waitUntil: 'domcontentloaded', timeout: 90000 });

    await new Promise(r => setTimeout(r, 4000));

    // 1. Aceitar permissão de cache
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const accept = btns.find(b => b.innerText && b.innerText.trim() === 'Accept');
      if (accept) accept.click();
    });
    await new Promise(r => setTimeout(r, 3000));

    // 2. Clicar em NEW CHARACTER
    await page.evaluate(() => {
      const allDivs = Array.from(document.querySelectorAll('div, span, p'));
      const target = allDivs.find(el => el.innerText && el.innerText.includes('NEW') && el.innerText.includes('CHARACTER') && !el.innerText.includes('LOAD'));
      if (target) target.click();
    });
    await new Promise(r => setTimeout(r, 3000));

    // 3. Clicar em Get Started
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const getStarted = btns.find(b => b.innerText && b.innerText.trim() === 'Get Started');
      if (getStarted) getStarted.click();
    });
    await new Promise(r => setTimeout(r, 4000));

    const classesToInspect = [
      { name: 'Swashbuckler', subOption: 'Fencer' },
      { name: 'Fighter', subOption: null },
      { name: 'Wizard', subOption: 'School of Battle Magic' },
      { name: 'Cleric', subOption: 'Warpriest' },
      { name: 'Kineticist', subOption: 'Single Gate' },
      { name: 'Rogue', subOption: 'Thief' },
      { name: 'Champion', subOption: 'Paladin' },
      { name: 'Witch', subOption: 'Curse' },
      { name: 'Barbarian', subOption: 'Fury' },
      { name: 'Alchemist', subOption: 'Bomber' }
    ];

    const results = {};

    for (const cls of classesToInspect) {
      console.log(`\n========================================`);
      console.log(`>>> Configurando Classe: ${cls.name} <<<`);
      console.log(`========================================`);

      // 1. Clicar no card de Classe
      await page.evaluate(() => {
        const divs = Array.from(document.querySelectorAll('div, span, p'));
        const classCard = divs.find(d => {
          const t = d.innerText?.trim();
          return t?.startsWith('Class\n') || t === 'Class' || t === 'Select Class' || d.id === 'divClass';
        });
        if (classCard) classCard.click();
      });
      await new Promise(r => setTimeout(r, 2000));

      // 2. Clicar na classe na lista
      await page.evaluate((targetName) => {
        const items = Array.from(document.querySelectorAll('div, tr, td, li, span, button, p'));
        const opt = items.find(el => el.innerText && el.innerText.trim().toLowerCase() === targetName.toLowerCase());
        if (opt) opt.click();
      }, cls.name);
      await new Promise(r => setTimeout(r, 1500));

      // 3. Clicar no botão Accept do modal da classe
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div, span'));
        const acceptBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Accept' && b.offsetHeight > 0);
        if (acceptBtn) acceptBtn.click();
      });
      await new Promise(r => setTimeout(r, 3000));

      // 4. Se tiver subclasse/especialização, tentar selecionar
      if (cls.subOption) {
        await page.evaluate(() => {
          const divs = Array.from(document.querySelectorAll('div, span, p'));
          const subCard = divs.find(d => {
            const t = d.innerText?.trim();
            return t?.includes('Select ') || t?.includes('Choose ') || t?.includes('Style') || t?.includes('Doctrine') || t?.includes('Thesis') || t?.includes('Racket') || t?.includes('Cause') || t?.includes('Patron') || t?.includes('Instinct') || t?.includes('Field') || t?.includes('Gate');
          });
          if (subCard) subCard.click();
        });
        await new Promise(r => setTimeout(r, 2000));

        await page.evaluate((sub) => {
          const items = Array.from(document.querySelectorAll('div, tr, td, li, span, button, p'));
          const opt = items.find(el => el.innerText && el.innerText.trim().toLowerCase().includes(sub.toLowerCase()));
          if (opt) opt.click();
        }, cls.subOption);
        await new Promise(r => setTimeout(r, 1500));

        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button, div, span'));
          const acceptBtn = btns.find(b => b.innerText && (b.innerText.trim() === 'Accept' || b.innerText.trim() === 'Select') && b.offsetHeight > 0);
          if (acceptBtn) acceptBtn.click();
        });
        await new Promise(r => setTimeout(r, 2500));
      }

      // 5. Capturar screenshot completa da árvore de Nível 1
      const screenshotName = `tree_${cls.name.toLowerCase()}.png`;
      await page.screenshot({ path: path.join(OUTPUT_DIR, screenshotName) });
      console.log(`Screenshot salva: audit_snapshots/${screenshotName}`);

      // 6. Extrair lista exata de cards do Nível 1
      const treeCards = await page.evaluate(() => {
        const buildCol = document.getElementById('divBuild') || document.body;
        const rawTexts = Array.from(buildCol.querySelectorAll('div, p, span'))
          .map(el => el.innerText?.trim())
          .filter(t => t && t.length > 2 && t.length < 150);

        const unique = [];
        for (const t of rawTexts) {
          if (!unique.includes(t)) {
            unique.push(t);
          }
        }
        return unique.slice(0, 50);
      });

      results[cls.name] = treeCards;
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, '08_final_classes_audit.json'), JSON.stringify(results, null, 2));
    console.log('\nAudit final completo salvo em audit_snapshots/08_final_classes_audit.json');

  } catch (err) {
    console.error('Erro na auditoria detalhada:', err);
  } finally {
    await browser.close();
    console.log('Browser finalizado.');
  }
}

run();
