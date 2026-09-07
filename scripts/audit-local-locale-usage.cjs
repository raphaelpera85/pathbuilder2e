const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const locales = [
  { id: "en", compendiumHeading: "Character creation compendium", builderTab: "Weapons", pickerTitle: "Select Classes", legacyClass: "Class" },
  { id: "es", compendiumHeading: "Compendio de creación", builderTab: "Armas", pickerTitle: "Seleccionar Clases", legacyClass: "Clase" },
];

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const report = [];
  const failures = [];
  try {
    for (const locale of locales) {
      const context = await browser.newContext({ locale: locale.id === "en" ? "en-US" : "es-ES" });
      await context.addInitScript((value) => localStorage.setItem("pathbuilder.locale", value), locale.id);
      const page = await context.newPage({ viewport: { width: 1280, height: 800 } });
      const checks = [];
      const check = (name, pass) => {
        checks.push({ name, pass: Boolean(pass) });
        if (!pass) failures.push(`${locale.id}:${name}`);
      };
      await page.goto(`${baseUrl}/#/compendium`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector(".portal-catalog-page", { timeout: 30000 });
      await page.waitForTimeout(900);
      check("idioma do documento", await page.locator("html").getAttribute("lang") === locale.id);
      check("título do compêndio", (await page.title()).toLowerCase().includes(locale.id === "en" ? "compendium" : "compendio"));
      const headings = await page.locator("h1").allTextContents();
      check("cabeçalho do compêndio", headings.some(text => text.trim() === locale.compendiumHeading));
      check("sem kit inicial no catálogo", !(await page.locator("body").innerText()).includes(locale.id === "en" ? "Starter Kit" : "Kit Inicial"));

      await page.goto(`${baseUrl}/#/builder`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 30000 });
      await page.waitForTimeout(450);
      check("título do construtor", (await page.title()).toLowerCase().includes(locale.id === "en" ? "character builder" : "creador de personajes"));
      check("aba de armas traduzida", await page.locator("#tab-button-weapons").innerText() === locale.builderTab);
      check("rótulo de classe traduzido", (await page.locator("#planTreeCol").innerText()).includes(locale.legacyClass));
      await page.evaluate(() => window.app.openPicker("class"));
      const picker = page.locator(".picker-dialog");
      await picker.waitFor({ state: "visible" });
      check("título do picker traduzido", await picker.locator("#picker-title").innerText() === locale.pickerTitle);
      await page.keyboard.press("Escape");
      report.push({ locale: locale.id, checks, passed: checks.filter(item => item.pass).length, total: checks.length });
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ report, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
