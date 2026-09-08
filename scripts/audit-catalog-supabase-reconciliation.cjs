/** Read-only reconciliation between catalog seeds and Supabase tables. */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");
const supabase = createClient(url, key);
const dataDir = path.join(__dirname, "catalog_data");
const tables = [
  "catalog_ancestries", "catalog_classes", "catalog_items", "catalog_archetypes",
  "catalog_heritages", "catalog_subclasses", "catalog_backgrounds", "catalog_spells",
  "catalog_rituals", "catalog_feats", "catalog_weapons", "catalog_armors",
  "catalog_shields", "catalog_formulas", "catalog_pets", "catalog_actions",
  "catalog_conditions", "catalog_buffs",
];

function projectToSeedShape(value, seed) {
  if (Array.isArray(seed)) return Array.isArray(value) ? value.map((item, index) => projectToSeedShape(item, seed[index] ?? seed[0])) : value;
  if (seed && typeof seed === "object") {
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.keys(seed).sort().map((key) => [key, projectToSeedShape(value[key], seed[key])]));
  }
  return value;
}

function normalizeValue(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try { return normalizeValue(JSON.parse(trimmed)); } catch { return value; }
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalizeValue(value[key])]));
  return value;
}

function canonical(row, seed) {
  return JSON.stringify(normalizeValue(projectToSeedShape(row, seed)));
}

async function readAll(table) {
  const rows = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase.from(table).select("*").order("id").range(offset, offset + pageSize - 1);
    if (error) throw new Error(`Falha ao ler ${table}: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < pageSize) return rows;
  }
}

async function run() {
  const results = [];
  for (const table of tables) {
    const localPath = path.join(dataDir, `${table}.json`);
    const local = JSON.parse(fs.readFileSync(localPath, "utf8"));
    const remote = await readAll(table);
    const localById = new Map(local.map((row) => [row.id, row]));
    const remoteById = new Map((remote || []).map((row) => [row.id, row]));
    const missingRemote = local.filter((row) => !remoteById.has(row.id)).map((row) => row.id);
    const extraRemote = (remote || []).filter((row) => !localById.has(row.id)).map((row) => row.id);
    const fieldMismatch = local
      .filter((row) => remoteById.has(row.id) && canonical(row, row) !== canonical(remoteById.get(row.id), row))
      .map((row) => row.id);
    const mismatchSamples = local
      .filter((row) => fieldMismatch.includes(row.id))
      .slice(0, 3)
      .map((row) => {
        const remoteRow = remoteById.get(row.id);
        return {
          id: row.id,
          differingKeys: Object.keys(row).filter((key) => JSON.stringify(projectToSeedShape(row[key], row[key])) !== JSON.stringify(projectToSeedShape(remoteRow[key], row[key]))),
          values: Object.fromEntries(Object.keys(row).filter((key) => JSON.stringify(projectToSeedShape(row[key], row[key])) !== JSON.stringify(projectToSeedShape(remoteRow[key], row[key]))).map((key) => [key, { local: row[key], remote: remoteRow[key] }])),
        };
      });
    results.push({ table, local: local.length, remote: remote.length, missingRemote: missingRemote.length, extraRemote: extraRemote.length, fieldMismatch: fieldMismatch.length, mismatchSamples });
  }
  const failures = results.filter((row) => row.local !== row.remote || row.missingRemote || row.extraRemote || row.fieldMismatch);
  console.log(JSON.stringify({ tables: results.length, localTotal: results.reduce((n, row) => n + row.local, 0), remoteTotal: results.reduce((n, row) => n + row.remote, 0), exactTables: results.length - failures.length, failures, results }, null, 2));
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => { console.error(`[CatalogReconciliation] ${error.message}`); process.exitCode = 1; });
