const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SNAPSHOTS_DIR = path.join(__dirname, '..', 'audit_snapshots');

if (!fs.existsSync(SNAPSHOTS_DIR)) {
  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log('>>> [Playwright Audit] Inicializando Google Chrome...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    console.log('>>> Navegando para https://pathbuilder2e.com/app.html?v=109g...');
    await page.goto('https://pathbuilder2e.com/app.html?v=109g', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(4000);

    // 1. Aceitar termo de cache inicial
    console.log('>>> Verificando diálogo inicial de Accept...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const accept = btns.find(b => b.innerText && b.innerText.trim() === 'Accept');
      if (accept) accept.click();
    });
    await page.waitForTimeout(3000);

    // 2. Clicar em NEW CHARACTER
    console.log('>>> Clicando em NEW CHARACTER...');
    await page.evaluate(() => {
      const allDivs = Array.from(document.querySelectorAll('div, span, p'));
      const target = allDivs.find(el => el.innerText && el.innerText.includes('NEW') && el.innerText.includes('CHARACTER') && !el.innerText.includes('LOAD'));
      if (target) target.click();
    });
    await page.waitForTimeout(3000);

    // 3. Clicar em Get Started se houver
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const getStarted = btns.find(b => b.innerText && b.innerText.trim() === 'Get Started');
      if (getStarted) getStarted.click();
    });
    await page.waitForTimeout(4000);

    const charactersToAudit = [
      {
        label: 'Versatile Human Fighter',
        ancestry: 'Human',
        heritage: 'Versatile Human',
        class: 'Fighter',
        feat: 'Sudden Charge'
      },
      {
        label: 'Ancient Elf Rogue',
        ancestry: 'Elf',
        heritage: 'Ancient Elf',
        class: 'Rogue',
        subOption: 'Thief'
      },
      {
        label: 'Forge Dwarf Cleric',
        ancestry: 'Dwarf',
        heritage: 'Forge Dwarf',
        class: 'Cleric',
        subOption: 'Warpriest'
      },
      {
        label: 'Fey Gnome Sorcerer',
        ancestry: 'Gnome',
        heritage: 'Fey Gnome',
        class: 'Sorcerer',
        subOption: 'Fey'
      }
    ];

    const auditResults = {};

    for (const charConfig of charactersToAudit) {
      console.log(`\n======================================================`);
      console.log(`>>> Configurando Arquétipo: ${charConfig.label} <<<`);
      console.log(`======================================================`);

      // 1. Configurar Classe
      await page.evaluate(() => {
        const divs = Array.from(document.querySelectorAll('div, span, p'));
        const classCard = divs.find(d => {
          const t = d.innerText?.trim();
          return t?.startsWith('Class\n') || t === 'Class' || t === 'Select Class' || d.id === 'divClass';
        });
        if (classCard) classCard.click();
      });
      await page.waitForTimeout(1500);

      // Selecionar nome da classe
      await page.evaluate((targetClass) => {
        const items = Array.from(document.querySelectorAll('div, tr, td, li, span, button, p'));
        const opt = items.find(el => el.innerText && el.innerText.trim().toLowerCase() === targetClass.toLowerCase());
        if (opt) opt.click();
      }, charConfig.class);
      await page.waitForTimeout(1000);

      // Clicar Accept
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, div, span'));
        const acceptBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Accept' && b.offsetHeight > 0);
        if (acceptBtn) acceptBtn.click();
      });
      await page.waitForTimeout(2000);

      // Capturar dados da árvore e estado atual
      const liveData = await page.evaluate(() => {
        const leafElements = Array.from(document.querySelectorAll('*')).filter(el => {
          const text = el.innerText?.trim();
          return text && text.length > 1 && text.length < 90 && el.children.length === 0;
        }).map(el => ({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          text: el.innerText.trim()
        }));

        const statBoxes = Array.from(document.querySelectorAll('.stat-box, .stat-value, .vitals, .bold-text')).map(el => ({
          class: el.className,
          text: el.innerText?.trim()
        })).filter(s => s.text);

        return {
          totalLeaves: leafElements.length,
          leaves: leafElements.slice(0, 100),
          statBoxes: statBoxes.slice(0, 30)
        };
      });

      auditResults[charConfig.label] = liveData;
      console.log(`>>> ${charConfig.label} auditado com ${liveData.totalLeaves} elementos de tela.`);
    }

    const outputPath = path.join(SNAPSHOTS_DIR, 'playwright_multicharacter_audit.json');
    fs.writeFileSync(outputPath, JSON.stringify(auditResults, null, 2));
    console.log(`\n>>> Auditoria Playwright concluída com sucesso! Resultados salvos em: ${outputPath}`);

  } catch (err) {
    console.error('>>> Erro na execução da auditoria Playwright:', err);
  } finally {
    await browser.close();
    console.log('>>> Navegador fechado.');
  }
}

run();
