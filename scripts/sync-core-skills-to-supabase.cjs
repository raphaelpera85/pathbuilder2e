const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { createClient } = require("@supabase/supabase-js");

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

function toRow(item) {
  const data = item.data || {};
  const systemId = item.system_id;
  return {
    id: item.id,
    system_id: systemId,
    name_pt: item.name,
    name_en: data.names?.en || item.name,
    name_es: data.names?.es || item.name,
    description_pt: item.summary || data.description || "",
    description_en: item.summary || data.description || "",
    description_es: item.summary || data.description || "",
    key_ability: data.skillAbility || null,
    skill_type: data.skillTable || data.category || "skill",
    ruleset: data.ruleset || (systemId === "t20" ? "padrao" : systemId === "dnd5e" ? "standard" : "advanced"),
    source_book: data.sourceBook || data.source?.book || null,
    source_page: data.sourcePage || data.source?.page || null,
    data,
  };
}

async function loadSkills() {
  const module = await import(pathToFileURL(path.resolve(__dirname, "..", "src/data/systemSkills.ts")).href);
  return [
    ["t20", "padrao"],
    ["dnd5e", "standard"],
    ["ose", "advanced"],
    ["ose", "classic"],
  ].flatMap(([systemId, ruleset]) => module.getSystemSkillItems(systemId, ruleset)).map(toRow);
}

async function main() {
  loadEnv();
  const rows = await loadSkills();
  if (process.argv.includes("--dry-run")) {
    console.log(JSON.stringify({ ok: true, dryRun: true, rows: rows.length, byScope: Object.fromEntries(rows.reduce((map, row) => { const scope = `${row.system_id}::${row.ruleset}`; map.set(scope, (map.get(scope) || 0) + 1); return map; }, new Map())) }, null, 2));
    return;
  }
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessários.");
  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  for (let index = 0; index < rows.length; index += 100) {
    const { error } = await client.from("catalog_skills").upsert(rows.slice(index, index + 100), { onConflict: "id" });
    if (error) throw new Error(`catalog_skills: ${error.message}`);
  }
  console.log(JSON.stringify({ ok: true, rows: rows.length, destructiveDeletes: 0 }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
