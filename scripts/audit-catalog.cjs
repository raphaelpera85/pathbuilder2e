const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "js", "pf2e_data.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${source}; globalThis.__catalog = PF2E_DATA;`, sandbox);

const catalog = sandbox.__catalog;
const categories = [
  "ancestries", "versatileHeritages", "classes", "backgrounds", "archetypes",
  "spells", "rituals", "feats", "items", "formulas", "pets", "actions",
  "weapons", "armors", "shields", "conditions", "buffs", "skills",
];
const locales = ["pt-BR", "en", "es"];

function recordsFor(category) {
  const value = catalog?.[category];
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

const report = { generatedAt: new Date().toISOString(), categories: {}, totals: {} };
const ids = new Map();

for (const category of categories) {
  const records = recordsFor(category);
  const missingNames = [];
  const missingSummaries = [];
  const missingSource = [];
  const needsReview = [];

  records.forEach((record, index) => {
    const label = record.id || record.name || `${category}[${index}]`;
    if (record.id) {
      const previous = ids.get(record.id);
      if (previous) previous.push(`${category}:${index}`);
      else ids.set(record.id, [`${category}:${index}`]);
    }
    if (!locales.every((locale) => record.names?.[locale])) missingNames.push(label);
    if (!locales.every((locale) => record.summaries?.[locale])) missingSummaries.push(label);
    if (!record.source?.book || !Number.isInteger(record.source?.page)) missingSource.push(label);
    if (record.needs_review === true || record.ruleset === "needs_review") needsReview.push(label);
  });

  report.categories[category] = {
    total: records.length,
    missingNames,
    missingSummaries,
    missingSource,
    needsReview,
  };
}

report.totals = {
  records: Object.values(report.categories).reduce((sum, item) => sum + item.total, 0),
  missingNames: Object.values(report.categories).reduce((sum, item) => sum + item.missingNames.length, 0),
  missingSummaries: Object.values(report.categories).reduce((sum, item) => sum + item.missingSummaries.length, 0),
  missingSource: Object.values(report.categories).reduce((sum, item) => sum + item.missingSource.length, 0),
  needsReview: Object.values(report.categories).reduce((sum, item) => sum + item.needsReview.length, 0),
  duplicateIds: [...ids.entries()].filter(([, locations]) => locations.length > 1).map(([id, locations]) => ({ id, locations })),
};

console.log(JSON.stringify(report, null, 2));
if (process.argv.includes("--strict") && (
  report.totals.missingNames > 0 || report.totals.missingSummaries > 0 ||
  report.totals.missingSource > 0 || report.totals.needsReview > 0 ||
  report.totals.duplicateIds.length > 0
)) process.exitCode = 1;
