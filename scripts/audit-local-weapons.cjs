const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${baseUrl}/#/builder`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 30000 });
  await page.waitForTimeout(600);
  const report = await page.evaluate(() => {
    const entries = window.app.getPickerItems("weapon", { includeIncompatible: true }) || [];
    const weapons = entries.map(entry => ({ ...entry.data, name: entry.name || entry.data?.name }));
    const missing = (key) => weapons.filter(weapon => weapon[key] === undefined || weapon[key] === null || weapon[key] === "").map(weapon => weapon.name);
    const invalidRange = weapons.filter(weapon => (weapon.range !== undefined && (!Number.isFinite(Number(weapon.range)) || Number(weapon.range) <= 0)) || (weapon.reload !== undefined && (!Number.isFinite(Number(weapon.reload)) || Number(weapon.reload) < 0))).map(weapon => weapon.name);
    const duplicateIds = [...new Set(weapons.map(weapon => weapon.id).filter(Boolean))].filter(id => weapons.filter(weapon => weapon.id === id).length > 1);
    return {
      count: weapons.length,
      missing: {
        damage: missing("damage"),
        damageType: missing("damageType"),
        category: missing("category"),
        hands: missing("hands"),
        bulk: missing("bulk"),
        price: missing("price"),
        traits: weapons.filter(weapon => !Array.isArray(weapon.traits) || weapon.traits.length === 0).map(weapon => weapon.name),
        source: weapons.filter(weapon => !weapon.source?.book || !weapon.source?.page).map(weapon => weapon.name),
      },
      invalidRange,
      duplicateIds,
      structuredRange: weapons.filter(weapon => weapon.range !== undefined || weapon.rangeFeet !== undefined).length,
      structuredReload: weapons.filter(weapon => weapon.reload !== undefined).length,
      structuredGroups: weapons.filter(weapon => weapon.weaponGroup || weapon.group).length,
      samples: weapons.filter((weapon) => ["Enxó (Adze)", "Arco Longo (Longbow)", "Espada Longa (Longsword)"].includes(weapon.name)).map((weapon) => ({ name: weapon.name, id: weapon.id, hands: weapon.hands, price: weapon.price, weaponGroup: weapon.weaponGroup, group: weapon.group, range: weapon.range, rangeFeet: weapon.rangeFeet, reload: weapon.reload, traits: weapon.traits })),
    };
  });
  console.log(JSON.stringify({
    count: report.count,
    missingCounts: Object.fromEntries(Object.entries(report.missing).map(([key, values]) => [key, values.length])),
    invalidRangeCount: report.invalidRange.length,
    invalidRangeNames: report.invalidRange,
    duplicateIdCount: report.duplicateIds.length,
    structuredRange: report.structuredRange,
    structuredReload: report.structuredReload,
    structuredGroups: report.structuredGroups,
    samples: report.samples,
    missingNames: report.missing,
  }, null, 2));
  await browser.close();
  const failures = Object.values(report.missing).flat().length + report.invalidRange.length + report.duplicateIds.length;
  if (failures) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
