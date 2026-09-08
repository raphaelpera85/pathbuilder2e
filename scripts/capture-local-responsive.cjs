const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const outputDir = process.env.PF2E_SCREENSHOT_DIR || "C:\\Users\\rapha\\.codex\\visualizations\\2026\\09\\07\\01a07abf-d77b-7301-be8a-0a21de325216";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const surfaces = ["compendium", "builder", "rules", "downloads", "library", "campaigns"];
const viewports = [
  { name: "mobile-320x568", width: 320, height: 568 },
  { name: "mobile-568x320-landscape", width: 568, height: 320 },
  { name: "mobile-375x667", width: 375, height: 667 },
  { name: "mobile-667x375-landscape", width: 667, height: 375 },
  { name: "mobile-414x896", width: 414, height: 896 },
  { name: "mobile-896x414-landscape", width: 896, height: 414 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-1024x768-landscape", width: 1024, height: 768 },
  { name: "laptop-1280x800", width: 1280, height: 800 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
];
const locales = ["pt-BR", "en", "es"];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const report = [];
  try {
    for (const locale of locales) {
      const context = await browser.newContext();
      await context.addInitScript((value) => localStorage.setItem("pathbuilder.locale", value), locale);
      const page = await context.newPage();
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        for (const surface of surfaces) {
          await page.goto(`${baseUrl}/#/${surface}`, { waitUntil: "domcontentloaded", timeout: 30000 });
          if (surface === "compendium") {
            // Wait for the localized catalog state instead of matching one
            // hard-coded loading sentence. The English copy changed to
            // "Loading the Supabase catalog…", which previously allowed a
            // loading screenshot to be accepted as a visual result.
            await page.waitForFunction(() => {
              const loading = document.querySelector('[role="status"]');
              const catalog = document.querySelector(".catalog-grid .catalog-card");
              const empty = document.querySelector(".portal-empty");
              const alert = document.querySelector('[role="alert"]');
              return Boolean(catalog || alert || (empty && !loading));
            }, null, { timeout: 30000 });
          }
          await page.waitForTimeout(250);
          const safeSurface = surface.replace(/[^a-z0-9-]/gi, "-");
          const path = `${outputDir}\\${locale}-${safeSurface}-${viewport.name}.png`;
          // The catalog can be thousands of pixels tall; viewport captures are
          // deterministic and pair with audit-local-responsive's full-page metrics.
          await page.screenshot({ path, fullPage: false, timeout: 60000 });
          const catalogReady = surface !== "compendium" || await page.locator(".catalog-grid .catalog-card").count() > 0 || await page.locator('[role="alert"]').count() > 0;
          if (!catalogReady) throw new Error(`Compendium did not reach a terminal catalog state for ${locale} at ${viewport.name}`);
          report.push({ locale, surface, viewport: viewport.name, path, catalogReady, title: await page.title(), bodyText: (await page.locator("body").innerText()).slice(0, 220) });
        }
      }
      await context.close();
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
