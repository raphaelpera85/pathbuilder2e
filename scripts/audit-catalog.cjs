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
      if (record?.legacyAlias) return false;
      const key = record?.id || record?.names?.en || record?.name;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  const value = catalog?.[category];
  if (Array.isArray(value)) return value.filter((record) => !record?.legacyAlias);
  if (value && typeof value === "object") return Object.values(value).filter((record) => !record?.legacyAlias);
  return [];
}

const report = { generatedAt: new Date().toISOString(), categories: {}, totals: {} };
const ids = new Map();

for (const category of categories) {
  const records = recordsFor(category);
  const missingNames = [];
  const missingSummaries = [];
  const missingNamesByLocale = Object.fromEntries(locales.map((locale) => [locale, []]));
  const missingSummariesByLocale = Object.fromEntries(locales.map((locale) => [locale, []]));
  const missingSource = [];
  const missingSourceNotMarkedReview = [];
  const placeholderTranslations = [];
  const invalidSource = [];
  const invalidRuleset = [];
  const verifiedWithoutSource = [];
  const needsReview = [];
  const mechanicsReview = [];
  const duplicateNames = new Map();
  const duplicateLocalizedNames = new Map();

  records.forEach((record, index) => {
    const label = record.id || record.name || `${category}[${index}]`;
    // `duplicateLocalizedNames` below already checks each locale. Keeping
    // translated aliases in this cross-locale map creates false positives
    // when a valid Spanish name matches a Portuguese name.
    const nameCandidates = [record.name]
      .filter(Boolean)
      // Parenthetical qualifiers are meaningful identities (for example,
      // Nephilim Celestial vs. Nephilim Infernal); do not erase them when
      // looking for accidental duplicate options.
      .map((value) => String(value).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    for (const name of new Set(nameCandidates)) {
      const locations = duplicateNames.get(name) || [];
      locations.push(label);
      duplicateNames.set(name, locations);
    }
    for (const locale of locales) {
      const localizedName = record.names?.[locale] || record.name;
      const key = String(localizedName || "").toLocaleLowerCase(locale).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
      if (!key) continue;
      const duplicateKey = `${locale}:${key}`;
      const locations = duplicateLocalizedNames.get(duplicateKey) || [];
      locations.push(label);
      duplicateLocalizedNames.set(duplicateKey, locations);
    }
    if (record.id) {
      const previous = ids.get(record.id);
      if (previous) previous.push(`${category}:${index}`);
      else ids.set(record.id, [`${category}:${index}`]);
    }
    let recordMissingName = false;
    let recordMissingSummary = false;
    for (const locale of locales) {
      if (!String(record.names?.[locale] || "").trim()) missingNamesByLocale[locale].push(label);
      if (!String(record.summaries?.[locale] || "").trim()) missingSummariesByLocale[locale].push(label);
      recordMissingName ||= !String(record.names?.[locale] || "").trim();
      recordMissingSummary ||= !String(record.summaries?.[locale] || "").trim();
    }
    if (recordMissingName) missingNames.push(label);
    if (recordMissingSummary) missingSummaries.push(label);
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
    const summaries = locales.map((locale) => String(record.summaries?.[locale] || "").toLocaleLowerCase());
    if (summaries.some((summary) => /pendente de revisão|pending review|pendiente de revisión|efeitos completos|complete effects|efectos completos/.test(summary))) {
      mechanicsReview.push(label);
    }
  });

  report.categories[category] = {
    total: records.length,
    missingNames,
    missingSummaries,
    missingNamesByLocale,
    missingSummariesByLocale,
    placeholderTranslations,
    missingSource,
    missingSourceNotMarkedReview,
    invalidSource,
    invalidRuleset,
    verifiedWithoutSource,
    needsReview,
    mechanicsReview,
    duplicateNames: [...duplicateNames.entries()]
      .map(([name, locations]) => [name, [...new Set(locations)].filter((location) => !location.includes(".legacy_alias."))])
      .filter(([, locations]) => locations.length > 1)
      .map(([name, locations]) => ({ name, locations })),
    duplicateLocalizedNames: [...duplicateLocalizedNames.entries()]
      .map(([key, locations]) => ({ locale: key.split(":", 1)[0], name: key.slice(key.indexOf(":") + 1), locations: [...new Set(locations)].filter((location) => !location.includes(".legacy_alias.")) }))
      .filter(({ locations }) => locations.length > 1),
  };
}

report.totals = {
  records: Object.values(report.categories).reduce((sum, item) => sum + item.total, 0),
  missingNames: Object.values(report.categories).reduce((sum, item) => sum + item.missingNames.length, 0),
  missingSummaries: Object.values(report.categories).reduce((sum, item) => sum + item.missingSummaries.length, 0),
  missingNamesByLocale: Object.fromEntries(locales.map((locale) => [locale, Object.values(report.categories).reduce((sum, item) => sum + item.missingNamesByLocale[locale].length, 0)])),
  missingSummariesByLocale: Object.fromEntries(locales.map((locale) => [locale, Object.values(report.categories).reduce((sum, item) => sum + item.missingSummariesByLocale[locale].length, 0)])),
  placeholderTranslations: Object.values(report.categories).reduce((sum, item) => sum + item.placeholderTranslations.length, 0),
  missingSource: Object.values(report.categories).reduce((sum, item) => sum + item.missingSource.length, 0),
  missingSourceNotMarkedReview: Object.values(report.categories).reduce((sum, item) => sum + item.missingSourceNotMarkedReview.length, 0),
  invalidSource: Object.values(report.categories).reduce((sum, item) => sum + item.invalidSource.length, 0),
  invalidRuleset: Object.values(report.categories).reduce((sum, item) => sum + item.invalidRuleset.length, 0),
  verifiedWithoutSource: Object.values(report.categories).reduce((sum, item) => sum + item.verifiedWithoutSource.length, 0),
  needsReview: Object.values(report.categories).reduce((sum, item) => sum + item.needsReview.length, 0),
  mechanicsReview: Object.values(report.categories).reduce((sum, item) => sum + item.mechanicsReview.length, 0),
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
