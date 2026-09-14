const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const routes = ["compendium", "downloads", "rules", "privacy"];

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
  const report = [];

  try {
    for (const route of routes) {
      const page = await context.newPage();
      await page.goto(`${baseUrl}/#/${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(350);
      const result = await page.evaluate(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
            && !element.closest("[hidden], [aria-hidden=\"true\"]");
        };
        const controls = Array.from(document.querySelectorAll("button, a[href], input, select, textarea, [role=button], [role=tab]"))
          .filter(visible)
          .map((element) => {
            const label = element.getAttribute("aria-label")
              || element.getAttribute("title")
              || (element.id && document.querySelector(`label[for=\"${CSS.escape(element.id)}\"]`)?.textContent)
              || element.closest("label")?.textContent
              || element.textContent;
            const rect = element.getBoundingClientRect();
            return { tag: element.tagName.toLowerCase(), label: String(label || "").trim(), width: Math.round(rect.width), height: Math.round(rect.height), visuallyHidden: element.classList.contains("sr-only") };
          });
        const unlabeled = controls.filter((control) => !control.label).map((control) => control.tag);
        const undersized = controls
          .filter((control) => !control.visuallyHidden && (control.width < 24 || control.height < 24))
          .map((control) => `${control.tag}:${control.label || "(sem nome)"}:${control.width}x${control.height}`);
        const bodyStyle = getComputedStyle(document.body);
        const rootStyle = getComputedStyle(document.documentElement);
        return {
          route: location.hash,
          controls: controls.length,
          unlabeled,
          undersized,
          scrollable: document.documentElement.scrollHeight > window.innerHeight,
          scrollBlocked: bodyStyle.overflowY === "hidden" || rootStyle.overflowY === "hidden",
          dialogCount: Array.from(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).filter(visible).length,
        };
      });
      report.push(result);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const failures = report.flatMap((entry) => [
    ...entry.unlabeled.map((tag) => `${entry.route}: controle ${tag} sem nome acessível`),
    ...(entry.scrollBlocked ? [`${entry.route}: rolagem bloqueada`] : []),
    ...(entry.dialogCount > 0 ? [`${entry.route}: diálogo inesperadamente aberto`] : []),
  ]);
  console.log(JSON.stringify({ report, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
