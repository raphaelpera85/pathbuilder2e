const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const viewports = [
  [320, 568], [375, 667], [414, 896], [568, 320], [667, 375], [896, 414], [768, 1024],
  [1024, 768], [1280, 800], [1440, 900],
];

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext();
  const report = {};

  try {
    for (const route of ["compendium", "builder", "downloads"]) {
      const page = await context.newPage();
      report[route] = [];
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height });
        await page.goto(`${baseUrl}/#/${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(350);
        report[route].push({
          width,
          height,
          ...(await page.evaluate(() => {
            // Regiões com rolagem interna também não podem estourar a viewport:
            // foi assim que a página de downloads passou a ser auditada.
            const sections = [...document.querySelectorAll(".downloads-section")];
            const overflowingSections = sections
              .filter((section) => section.scrollWidth > section.clientWidth + 1)
              .map((section) => `${section.className.split(" ")[0]}:${section.scrollWidth}>${section.clientWidth}`);
            return {
              innerWidth,
              innerHeight,
              bodyWidth: document.body.scrollWidth,
              documentWidth: document.documentElement.scrollWidth,
              noHorizontalOverflow: document.body.scrollWidth <= document.documentElement.clientWidth,
              noInnerOverflow: overflowingSections.length === 0,
              overflowingSections,
              portalMounted: Boolean(document.getElementById("react-portal-root")),
              legacyHidden: document.getElementById("legacy-builder-root")?.hidden ?? null,
              title: document.title,
              route: location.hash,
            };
          })),
        });
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const failures = Object.entries(report).flatMap(([route, entries]) =>
    entries.filter((entry) => !entry.noHorizontalOverflow || !entry.noInnerOverflow || !entry.portalMounted)
      .map((entry) => `${route} ${entry.width}x${entry.height}${entry.noHorizontalOverflow ? "" : " overflow"}${entry.noInnerOverflow ? "" : ` inner:${entry.overflowingSections.join(",")}`}`)
  );
  console.log(JSON.stringify({ report, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
