const fs = require("node:fs");

function readEnvFile() {
  const env = {};
  if (!fs.existsSync(".env")) return env;
  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return env;
}

async function main() {
  const env = { ...readEnvFile(), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.log(JSON.stringify({ configured: false, failures: ["missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY"] }, null, 2));
    process.exitCode = 1;
    return;
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const tables = [
    ["catalog_ancestries", 200],
    ["catalog_classes", 200],
    ["catalog_spells", 200],
    ["catalog_feats", 200],
    ["catalog_weapons", 200],
    ["campaigns", 401],
    ["characters", 401],
  ];
  const results = [];
  for (const [table, expectedStatus] of tables) {
    try {
      const response = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, { headers });
      results.push({ table, status: response.status, expectedStatus, pass: response.status === expectedStatus });
    } catch (error) {
      results.push({ table, status: null, expectedStatus, pass: false, error: error.name });
    }
  }
  const failures = results.filter(result => !result.pass).map(result => result.table);
  console.log(JSON.stringify({ configured: true, readOnly: true, results, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
