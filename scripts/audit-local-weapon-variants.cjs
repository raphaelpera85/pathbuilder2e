const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function normalizedName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

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
    return entries.map((entry) => ({
      id: entry.data?.id,
      name: entry.name || entry.data?.name,
      variantFamily: entry.data?.variantFamily,
      variantRole: entry.data?.variantRole,
      variantOf: entry.data?.variantOf,
    }));
  });
  await browser.close();

  const byId = new Map(report.filter((entry) => entry.id).map((entry) => [entry.id, entry]));
  const families = new Map();
  for (const entry of report) {
    if (!entry.variantFamily) continue;
    if (!families.has(entry.variantFamily)) families.set(entry.variantFamily, []);
    families.get(entry.variantFamily).push(entry);
  }
  const invalid = [];
  for (const entry of report.filter((item) => item.variantFamily)) {
    if (!entry.id || !entry.variantRole || !entry.variantOf) invalid.push({ id: entry.id, reason: "variant metadata incomplete" });
    const counterpart = byId.get(entry.variantOf);
    if (!counterpart) invalid.push({ id: entry.id, reason: `variantOf not found: ${entry.variantOf}` });
    else if (counterpart.variantOf !== entry.id) invalid.push({ id: entry.id, reason: `variantOf is not symmetric with ${entry.variantOf}` });
    else if (counterpart.variantFamily !== entry.variantFamily) invalid.push({ id: entry.id, reason: `variant family differs from ${entry.variantOf}` });
  }
  const duplicateRoles = [];
  for (const [family, entries] of families) {
    const seen = new Set();
    for (const entry of entries) {
      if (seen.has(entry.variantRole)) duplicateRoles.push({ family, role: entry.variantRole, id: entry.id });
      seen.add(entry.variantRole);
    }
  }
  const groupedNames = new Map();
  for (const entry of report) {
    const key = normalizedName(entry.name);
    if (!key) continue;
    if (!groupedNames.has(key)) groupedNames.set(key, []);
    groupedNames.get(key).push(entry);
  }
  const sameNameDifferentIds = [...groupedNames.entries()]
    .filter(([, entries]) => new Set(entries.map((entry) => entry.id)).size > 1)
    .map(([name, entries]) => ({ name, ids: entries.map((entry) => entry.id), variants: entries.filter((entry) => entry.variantFamily).length }));

  console.log(JSON.stringify({
    count: report.length,
    explicitVariantRecords: report.filter((entry) => entry.variantFamily).length,
    families: [...families.entries()].map(([family, entries]) => ({ family, roles: entries.map((entry) => entry.variantRole), ids: entries.map((entry) => entry.id) })),
    invalid,
    duplicateRoles,
    sameNameDifferentIds,
  }, null, 2));
  if (invalid.length || duplicateRoles.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
