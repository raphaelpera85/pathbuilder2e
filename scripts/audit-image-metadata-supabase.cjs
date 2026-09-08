const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.");
const supabase = createClient(url, key);
const expected = { imageSource: "local-project-asset", imageLicense: "project-generated-art" };
async function audit(table) {
  const { data, error } = await supabase.from(table).select("id,data");
  if (error) throw error;
  const missing = data.filter((row) => row.data?.imageSource !== expected.imageSource || row.data?.imageLicense !== expected.imageLicense);
  return { table, rows: data.length, metadataComplete: data.length - missing.length, missing: missing.length, samples: missing.slice(0, 3).map((row) => row.id) };
}
(async () => console.log(JSON.stringify({ expected, results: await Promise.all([audit("catalog_weapons"), audit("catalog_items")]) }, null, 2)))()
  .catch((error) => { console.error(`[ImageMetadataAudit] ${error.message}`); process.exit(1); });
