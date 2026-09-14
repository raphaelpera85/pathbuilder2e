/** Read-only audit of persisted character routing metadata. */
const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");
const supabase = createClient(url, key);

const rulesets = {
  pf2e: new Set(["remaster", "legacy", "both", "needs_review"]),
  t20: new Set(["padrao", "jogo_do_ano", "needs_review"]),
  dnd5e: new Set(["standard", "2024", "needs_review"]),
  ose: new Set(["advanced", "classic", "needs_review"]),
};
const supportedSystems = new Set(Object.keys(rulesets));

async function readAllCharacters() {
  const rows = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase
      .from("characters")
      .select("id,user_id,character_key,name,level,system_id,ruleset,data")
      .order("id")
      .range(offset, offset + pageSize - 1);
    if (error) throw new Error(`Falha ao ler characters: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < pageSize) return rows;
  }
}

async function readCatalogSystems() {
  const { data, error } = await supabase.from("catalog_systems").select("id,supported_rulesets");
  if (error) throw new Error(`Falha ao ler catalog_systems: ${error.message}`);
  return data || [];
}

async function run() {
  const [characters, catalogSystems] = await Promise.all([readAllCharacters(), readCatalogSystems()]);
  const failures = [];
  const add = (kind, row, detail) => failures.push({ kind, id: row.id, characterKey: row.character_key, userId: row.user_id, detail });
  const keys = new Map();
  const systemRows = new Map(catalogSystems.map((row) => [row.id, row]));

  for (const row of characters) {
    const data = row.data && typeof row.data === "object" && !Array.isArray(row.data) ? row.data : null;
    const systemId = String(row.system_id || "");
    const ruleset = String(row.ruleset || "");
    const key = `${row.user_id}|${row.character_key}`;
    keys.set(key, (keys.get(key) || 0) + 1);

    if (!supportedSystems.has(systemId)) add("unsupported_system", row, { systemId });
    else if (!rulesets[systemId].has(ruleset)) add("unsupported_ruleset", row, { systemId, ruleset });
    if (!systemRows.has(systemId)) add("orphan_system", row, { systemId });
    if (!data) add("invalid_payload", row, "data must be a JSON object");
    else {
      if (data.system_id !== systemId || data.systemId !== systemId) add("payload_system_mismatch", row, { rowSystemId: systemId, dataSystemId: data.system_id, dataSystemIdCamel: data.systemId });
      if (data.ruleset !== undefined && data.ruleset !== ruleset) add("payload_ruleset_mismatch", row, { rowRuleset: ruleset, dataRuleset: data.ruleset });
      if (data.id !== undefined && data.id !== row.character_key) add("payload_key_mismatch", row, { rowKey: row.character_key, dataId: data.id });
    }
    if (!row.character_key || !String(row.name || "").trim()) add("missing_identity", row, { name: row.name, characterKey: row.character_key });
  }

  for (const [key, count] of keys) {
    if (count > 1) failures.push({ kind: "duplicate_character_key", key, count });
  }

  const byKind = failures.reduce((result, failure) => {
    result[failure.kind] = (result[failure.kind] || 0) + 1;
    return result;
  }, {});
  const result = {
    ok: failures.length === 0,
    characters: characters.length,
    supportedSystems: [...supportedSystems],
    catalogSystems: catalogSystems.map((row) => ({ id: row.id, rulesets: row.supported_rulesets })),
    failures,
    failuresByKind: byKind,
  };
  console.log(JSON.stringify(result, null, 2));
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(`[CharacterMetadataAudit] ${error.message}`);
  process.exitCode = 1;
});
