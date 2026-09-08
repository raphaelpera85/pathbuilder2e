const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const checks = [];

  try {
    await page.goto(`${baseUrl}/#/compendium`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector(".catalog-card", { timeout: 30000 });
    const structuredWeapon = await page.evaluate(() => {
      const item = window.app?.getPickerItems?.("weapon", { includeIncompatible: true })
        ?.find((entry) => String(entry.name || "").toLocaleLowerCase().includes("longbow") || String(entry.data?.names?.["pt-BR"] || entry.name || "").toLocaleLowerCase().includes("arco longo"));
      return item?.data ? { range: item.data.range, rangeFeet: item.data.rangeFeet, reload: item.data.reload } : null;
    });
    checks.push(["runtime weapon exposes structured range", structuredWeapon?.range === 100 && structuredWeapon?.rangeFeet === 100]);

    const search = page.locator('input[type="search"]').first();
    const firstCardName = await page.locator(".catalog-card").first().getAttribute("aria-label");
    await search.focus();
    checks.push(["search receives focus", await search.evaluate((el) => document.activeElement === el)]);
    await search.fill(firstCardName || "Arquetipo");
    await page.waitForTimeout(100);
    checks.push(["search filters results", await page.locator(".catalog-card").count() > 0]);
    await search.fill("");
    await page.waitForTimeout(100);

    const filterButton = page.locator(".catalog-mobile-filter-btn");
    await filterButton.focus();
    await page.keyboard.press("Enter");
    checks.push(["mobile filters open by keyboard", await filterButton.getAttribute("aria-expanded") === "true"]);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);

    const card = page.locator(".catalog-card").first();
    await card.focus();
    checks.push(["catalog card is keyboard focusable", await card.getAttribute("tabindex") === "0"]);
    await card.press("Enter");
    await page.waitForTimeout(200);
    const dialog = page.locator('.compendium-modal-overlay[role="dialog"][aria-modal="true"]');
    await dialog.waitFor({ state: "visible", timeout: 5000 });
    checks.push(["card opens an accessible dialog", await dialog.getAttribute("aria-labelledby") === "compendium-modal-title"]);
    checks.push(["dialog moves focus to close", await page.locator(".compendium-modal-close").evaluate((el) => document.activeElement === el)]);

    await page.keyboard.press("Escape");
    await page.waitForTimeout(50);
    checks.push(["Escape closes dialog", await dialog.count() === 0]);
    checks.push(["focus returns to card", await card.evaluate((el) => document.activeElement === el)]);

    await card.tap();
    await dialog.waitFor({ state: "visible", timeout: 5000 });
    checks.push(["touch opens dialog", await dialog.isVisible()]);
    await page.locator(".compendium-modal-close").tap();
    checks.push(["touch closes dialog", await dialog.count() === 0]);

    await page.goto(`${baseUrl}/#/builder`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 30000 });
    await page.locator("#pbMenuButton").click();
    await page.locator("#drawerExportJson").click();
    const legacyDialog = page.locator('#modalJsonOverlay[role="dialog"][aria-modal="true"]');
    await legacyDialog.waitFor({ state: "visible", timeout: 5000 });
    checks.push(["legacy modal exposes dialog semantics", await legacyDialog.getAttribute("aria-labelledby") === "jsonTitle"]);
    checks.push(["legacy modal moves focus to close", await page.locator("#modalJsonOverlay .pb-modal-close-btn").evaluate((el) => document.activeElement === el)]);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(50);
    checks.push(["legacy Escape closes dialog", await legacyDialog.getAttribute("aria-hidden") === "true" && !(await legacyDialog.evaluate((el) => el.classList.contains("active")))]);
  } finally {
    await browser.close();
  }

  const failures = checks.filter(([, passed]) => !passed).map(([label]) => label);
  console.log(JSON.stringify({ viewport: "375x667 touch", checks, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
