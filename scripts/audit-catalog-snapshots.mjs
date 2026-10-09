import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "src", "data", "catalog", "snapshots");
const manifest = JSON.parse(await readFile(join(root, "manifest.json"), "utf8"));
const errors = [];
const byScope = {};
const totals = {
  records: 0,
  missingPortugueseName: 0,
  missingPortugueseSummary: 0,
  missingEnglishName: 0,
  missingSpanishName: 0,
  missingSourceBook: 0,
  missingSourcePage: 0,
};

const readDirectories = async (path) => (await readdir(path, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const hasText = (...values) => values.some((value) => typeof value === "string" && value.trim().length > 0);
const scopesByKey = new Map(manifest.map((scope) => [`${scope.systemId}/${scope.ruleset}`, scope]));
const snapshotScopes = [];

for (const systemId of await readDirectories(root)) {
  for (const ruleset of await readDirectories(join(root, systemId))) {
    snapshotScopes.push(`${systemId}/${ruleset}`);
    const scopeKey = `${systemId}/${ruleset}`;
    const manifestScope = scopesByKey.get(scopeKey);
    if (!manifestScope) errors.push(`Escopo ausente do manifesto: ${scopeKey}`);
    const categories = {};

    for (const entry of (await readdir(join(root, systemId, ruleset), { withFileTypes: true }))
      .filter((item) => item.isFile() && item.name.endsWith(".json"))
      .sort((a, b) => a.name.localeCompare(b.name))) {
      const category = entry.name.slice(0, -".json".length);
      let records;
      try {
        records = JSON.parse(await readFile(join(root, systemId, ruleset, entry.name), "utf8"));
      } catch (error) {
        errors.push(`JSON inválido em ${scopeKey}/${entry.name}: ${String(error)}`);
        continue;
      }
      if (!Array.isArray(records)) {
        errors.push(`O arquivo ${scopeKey}/${entry.name} não contém uma lista.`);
        continue;
      }

      const gaps = {
        records: records.length,
        missingPortugueseName: [],
        missingPortugueseSummary: [],
        missingEnglishName: [],
        missingSpanishName: [],
        missingSourceBook: [],
        missingSourcePage: [],
      };
      for (const record of records) {
        const id = record.id || "<sem id>";
        if (record.system_id !== systemId || record.ruleset !== ruleset) {
          errors.push(`${scopeKey}/${category}: ${id} declara system_id/ruleset divergente.`);
        }
        const data = record.data && typeof record.data === "object" ? record.data : {};
        const names = data.names && typeof data.names === "object" ? data.names : {};
        const summaries = data.summaries && typeof data.summaries === "object" ? data.summaries : {};
        const localized = {
          missingPortugueseName: hasText(record.name_pt, names["pt-BR"], data.name, record.name) ? null : id,
          missingPortugueseSummary: hasText(record.description_pt, summaries["pt-BR"], data.summary_pt, data.summary, data.description, record.description) ? null : id,
          missingEnglishName: hasText(record.name_en, names.en, data.name_en, data.nameEn) ? null : id,
          missingSpanishName: hasText(record.name_es, names.es, data.name_es) ? null : id,
          missingSourceBook: hasText(record.source_book) ? null : id,
          missingSourcePage: Number.isInteger(record.source_page) && record.source_page > 0 ? null : id,
        };
        for (const [field, missingId] of Object.entries(localized)) if (missingId) gaps[field].push(missingId);
      }

      if (manifestScope?.categories?.[category] !== records.length) {
        errors.push(`${scopeKey}/${category}: manifesto=${manifestScope?.categories?.[category] ?? "ausente"}, arquivo=${records.length}.`);
      }
      categories[category] = Object.fromEntries(
        Object.entries(gaps).map(([field, values]) => [field, Array.isArray(values) ? values.length : values]),
      );
      for (const field of Object.keys(totals).filter((key) => key !== "records")) totals[field] += gaps[field].length;
      totals.records += records.length;
    }
    byScope[scopeKey] = categories;
  }
}

for (const scope of manifest) {
  const key = `${scope.systemId}/${scope.ruleset}`;
  if (!snapshotScopes.includes(key)) errors.push(`Manifesto aponta para escopo inexistente: ${key}`);
  for (const category of Object.keys(scope.categories || {})) {
    if (!byScope[key]?.[category]) errors.push(`Manifesto aponta para arquivo inexistente: ${key}/${category}.json`);
  }
}

const report = { generatedAt: new Date().toISOString(), snapshotScopes: snapshotScopes.length, totals, byScope, structuralErrors: errors };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
