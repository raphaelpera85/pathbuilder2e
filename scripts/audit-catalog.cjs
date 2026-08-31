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
  "ancestries", "heritages", "versatileHeritages", "classes", "backgrounds", "archetypes",
  "spells", "rituals", "feats", "items", "formulas", "pets", "actions", "subclasses",
  "weapons", "armors", "shields", "conditions", "buffs", "skills",
];
const locales = ["pt-BR", "en", "es"];
const validRulesets = new Set(["remaster", "legacy", "needs_review"]);

function recordsFor(category) {
  if (category === "items") {
    const primary = Array.isArray(catalog?.items) ? catalog.items : [];
    const compendium = Array.isArray(catalog?.itemCompendium) ? catalog.itemCompendium : [];
    const seen = new Set();
    return [...primary, ...compendium].filter((record) => {
      const key = record?.id || record?.names?.en || record?.name;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
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
  const missingSourceNotMarkedReview = [];
  const placeholderTranslations = [];
  const invalidSource = [];
  const invalidRuleset = [];
  const verifiedWithoutSource = [];
  const needsReview = [];
  const duplicateNames = new Map();

  records.forEach((record, index) => {
    const label = record.id || record.name || `${category}[${index}]`;
    const nameCandidates = [record.name, ...(Object.values(record.names || {}))]
      .filter(Boolean)
      .map((value) => String(value).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    for (const name of new Set(nameCandidates)) {
      const locations = duplicateNames.get(name) || [];
      locations.push(label);
      duplicateNames.set(name, locations);
    }
    if (record.id) {
      const previous = ids.get(record.id);
      if (previous) previous.push(`${category}:${index}`);
      else ids.set(record.id, [`${category}:${index}`]);
    }
    if (!locales.every((locale) => record.names?.[locale])) missingNames.push(label);
    if (!locales.every((locale) => record.summaries?.[locale])) missingSummaries.push(label);
    // O compêndio legado recebeu descrições provisórias em português. Não
    // trate uma cópia idêntica como tradução completa; nomes próprios podem
    // permanecer iguais e por isso só detectamos o fallback conhecido.
    if (String(record.id || "").startsWith("item.compendium.") && record.summaries?.["pt-BR"] === record.summaries?.en && record.summaries?.en === record.summaries?.es) {
      placeholderTranslations.push(label);
    }
    if (!record.source?.book || !Number.isInteger(record.source?.page)) {
      missingSource.push(label);
      if (record.needs_review !== true) missingSourceNotMarkedReview.push(label);
    }
    if (record.source?.page !== undefined && (!Number.isInteger(record.source.page) || record.source.page < 1)) invalidSource.push(label);
    if (record.ruleset !== undefined && !validRulesets.has(record.ruleset)) invalidRuleset.push(label);
    if (record.needs_review === false && (!record.source?.book || !Number.isInteger(record.source?.page))) verifiedWithoutSource.push(label);
    if (record.needs_review === true || record.ruleset === "needs_review") needsReview.push(label);
  });

  report.categories[category] = {
    total: records.length,
    missingNames,
    missingSummaries,
    placeholderTranslations,
    missingSource,
    missingSourceNotMarkedReview,
    invalidSource,
    invalidRuleset,
    verifiedWithoutSource,
    needsReview,
    duplicateNames: [...duplicateNames.entries()]
      .map(([name, locations]) => [name, [...new Set(locations)].filter((location) => !location.includes(".legacy_alias."))])
      .filter(([, locations]) => locations.length > 1)
      .map(([name, locations]) => ({ name, locations })),
  };
}

report.totals = {
  records: Object.values(report.categories).reduce((sum, item) => sum + item.total, 0),
  missingNames: Object.values(report.categories).reduce((sum, item) => sum + item.missingNames.length, 0),
  missingSummaries: Object.values(report.categories).reduce((sum, item) => sum + item.missingSummaries.length, 0),
  placeholderTranslations: Object.values(report.categories).reduce((sum, item) => sum + item.placeholderTranslations.length, 0),
  missingSource: Object.values(report.categories).reduce((sum, item) => sum + item.missingSource.length, 0),
  missingSourceNotMarkedReview: Object.values(report.categories).reduce((sum, item) => sum + item.missingSourceNotMarkedReview.length, 0),
  invalidSource: Object.values(report.categories).reduce((sum, item) => sum + item.invalidSource.length, 0),
  invalidRuleset: Object.values(report.categories).reduce((sum, item) => sum + item.invalidRuleset.length, 0),
  verifiedWithoutSource: Object.values(report.categories).reduce((sum, item) => sum + item.verifiedWithoutSource.length, 0),
  needsReview: Object.values(report.categories).reduce((sum, item) => sum + item.needsReview.length, 0),
  duplicateIds: [...ids.entries()].filter(([, locations]) => locations.length > 1).map(([id, locations]) => ({ id, locations })),
};

console.log(JSON.stringify(report, null, 2));
const strictIntegrityFailure = (
  report.totals.missingNames > 0 || report.totals.missingSummaries > 0 ||
  report.totals.placeholderTranslations > 0 ||
  report.totals.missingSource > 0 || report.totals.invalidSource > 0 ||
  report.totals.missingSourceNotMarkedReview > 0 ||
  report.totals.invalidRuleset > 0 || report.totals.verifiedWithoutSource > 0 ||
  report.totals.needsReview > 0 ||
  report.totals.duplicateIds.length > 0
);
const strictProvenanceFailure = (
  report.totals.missingNames > 0 || report.totals.missingSummaries > 0 ||
  report.totals.placeholderTranslations > 0 || report.totals.invalidSource > 0 ||
  report.totals.missingSourceNotMarkedReview > 0 || report.totals.invalidRuleset > 0 ||
  report.totals.verifiedWithoutSource > 0 || report.totals.duplicateIds.length > 0
);
if ((process.argv.includes("--strict") && strictIntegrityFailure) || (process.argv.includes("--strict-provenance") && strictProvenanceFailure)) process.exitCode = 1;
