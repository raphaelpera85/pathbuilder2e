/** Atualiza somente os metadados das imagens já publicadas no catálogo. */
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
const fetchWithTimeout = (input, init = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
};
const supabase = createClient(url, key, { global: { fetch: fetchWithTimeout } });
const metadata = { imageSource: "local-project-asset", imageLicense: "project-generated-art" };

async function updateTable(table, file) {
  const catalogPath = path.join(__dirname, "catalog_data", file);
  const rows = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const updated = rows.map((row) => ({ ...row, data: { ...(row.data || {}), ...metadata } }));
  fs.writeFileSync(catalogPath, `${JSON.stringify(updated, null, 2)}\n`);
  for (let offset = 0; offset < updated.length; offset += 25) {
    const results = await Promise.all(updated.slice(offset, offset + 25).map(async (row) => {
      const { error } = await supabase.from(table).update({ data: row.data }).eq("id", row.id);
      return { id: row.id, error };
    }));
    const failed = results.find((result) => result.error);
    if (failed) throw new Error(`Falha em ${table}/${failed.id}: ${failed.error.message}`);
  }
  return updated.length;
}

(async () => {
  const weapons = await updateTable("catalog_weapons", "catalog_weapons.json");
  const items = await updateTable("catalog_items", "catalog_items.json");
  console.log(JSON.stringify({ weapons, items, ...metadata }));
})().catch((error) => { console.error(`[ImageMetadata] ${error.message}`); process.exit(1); });
