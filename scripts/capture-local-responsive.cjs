const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const outputDir = process.env.PF2E_SCREENSHOT_DIR || "C:\\Users\\rapha\\.codex\\visualizations\\2026\\09\\07\\01a07abf-d77b-7301-be8a-0a21de325216";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const surfaces = ["compendium", "builder", "rules", "downloads", "library", "campaigns"];
const viewports = [{ name: "mobile", width: 375, height: 667 }, { name: "desktop", width: 1440, height: 900 }];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage();
  const report = [];
  try {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const surface of surfaces) {
        await page.goto(`${baseUrl}/#/${surface}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(1200);
        const safeSurface = surface.replace(/[^a-z0-9-]/gi, "-");
        const path = `${outputDir}\\${safeSurface}-${viewport.name}.png`;
        await page.screenshot({ path, fullPage: true });
        report.push({ surface, viewport: viewport.name, path, title: await page.title(), bodyText: (await page.locator("body").innerText()).slice(0, 220) });
      }
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ outputDir, report }, null, 2));
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
