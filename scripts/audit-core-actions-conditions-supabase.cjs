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
    catalog_actions: { "dnd5e::standard": 8, "t20::padrao": 4, "ose::advanced": 4, "ose::classic": 4 },
    catalog_conditions: { "dnd5e::standard": 15 },
  };
  const results = {};
  for (const table of Object.keys(expected)) {
    const { data, error } = await client.from(table).select("id,system_id,ruleset");
    if (error) throw new Error(`${table}: ${error.message}`);
    const counts = {};
    for (const row of data || []) {
      const scope = `${row.system_id}::${row.ruleset}`;
      if (expected[table][scope] !== undefined) counts[scope] = (counts[scope] || 0) + 1;
    }
    results[table] = Object.fromEntries(Object.entries(expected[table]).map(([scope, value]) => [scope, { expected: value, actual: counts[scope] || 0, ok: (counts[scope] || 0) === value }]));
  }
  const failures = Object.values(results).flatMap((table) => Object.entries(table).filter(([, result]) => !result.ok).map(([scope]) => scope));
  console.log(JSON.stringify({ ok: failures.length === 0, results, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
