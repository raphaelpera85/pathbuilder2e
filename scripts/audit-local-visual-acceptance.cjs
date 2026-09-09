const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const locales = ["pt-BR", "en", "es"];
const viewports = [[320, 568], [568, 320], [768, 1024], [1024, 768], [1440, 900]];

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const report = [];
  try {
    for (const locale of locales) {
      const context = await browser.newContext();
      await context.addInitScript((value) => localStorage.setItem("pathbuilder.locale", value), locale);
      const page = await context.newPage();
      await page.goto(`${baseUrl}/#/compendium`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      const categorySelect = page.locator("select").nth(1);
      const categories = await categorySelect.locator("option").evaluateAll((options) => options.map((option) => ({ label: option.textContent.trim(), value: option.value })));
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height });
        for (const category of categories) {
          await categorySelect.selectOption(category.value, { force: true });
          await page.waitForTimeout(120);
          const result = await page.evaluate(() => {
            const cards = [...document.querySelectorAll(".catalog-card")];
            const failures = [];
            for (const card of cards) {
              const title = card.querySelector("h2")?.textContent.trim() || "";
              const image = card.querySelector("img");
              const cardBox = card.getBoundingClientRect();
              const titleBox = card.querySelector("h2")?.getBoundingClientRect();
              const imageBox = image?.getBoundingClientRect();
              if (image && (!image.complete || image.naturalWidth === 0 || !image.alt.includes(title) || (imageBox && titleBox && imageBox.bottom > titleBox.top + 2))) failures.push({ title, reason: "image/title/layout" });
              if (cardBox.height < 120) failures.push({ title, reason: "card-height" });
            }
            return { cards: cards.length, failures };
          });
          report.push({ locale, width, height, category: category.label, ...result });
          if (result.failures.length) throw new Error(`${locale} ${width}x${height} ${category.label}: ${JSON.stringify(result.failures.slice(0, 3))}`);
        }
      }
      await context.close();
    }
  } finally { await browser.close(); }
  const cards = report.reduce((sum, entry) => sum + entry.cards, 0);
  const checks = report.length;
  console.log(JSON.stringify({ checks, cardsChecked: cards, failures: report.filter((entry) => entry.failures.length), locales, viewports }, null, 2));
}
main().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });
