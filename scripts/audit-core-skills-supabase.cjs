const fs = require("node:fs");
const { createClient } = require("@supabase/supabase-js");

function readEnv() {
  const values = {};
  if (!fs.existsSync(".env")) return values;
  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)=(.*)$/);
    if (match) values[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return values;
}

async function main() {
  const env = { ...readEnv(), ...process.env };
  const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado.");
  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const expected = {
    "t20::padrao": 29,
    "dnd5e::standard": 18,
    "ose::advanced": 45,
    "ose::classic": 32,
  };
  const { data, error } = await client.from("catalog_skills").select("id,system_id,ruleset,source_book,source_page");
  if (error) throw new Error(`catalog_skills: ${error.message}`);
  const counts = {};
  const invalid = [];
  for (const row of data || []) {
    const scope = `${row.system_id}::${row.ruleset}`;
    counts[scope] = (counts[scope] || 0) + 1;
    if (!row.source_book || !Number.isFinite(Number(row.source_page)) || Number(row.source_page) <= 0) invalid.push(row.id);
  }
  const results = Object.fromEntries(Object.entries(expected).map(([scope, value]) => [scope, { expected: value, actual: counts[scope] || 0, ok: (counts[scope] || 0) === value }]));
  const failures = Object.entries(results).filter(([, result]) => !result.ok).map(([scope]) => scope);
  if (invalid.length) failures.push(`provenance:${invalid.length}`);
  const output = { ok: failures.length === 0, rows: (data || []).length, results, invalidProvenance: invalid.slice(0, 10), failures };
  console.log(JSON.stringify(output, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
