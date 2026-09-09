const fs = require("node:fs");
const path = require("node:path");
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
const rows = JSON.parse(fs.readFileSync(path.join(__dirname, "catalog_data", "catalog_weapons.json"), "utf8"));

async function main() {
  for (const row of rows) {
    const { error } = await supabase.from("catalog_weapons").update({
      name_pt: row.name_pt,
      name_en: row.name_en,
      name_es: row.name_es,
      description_pt: row.description_pt,
      description_en: row.description_en,
      description_es: row.description_es,
      weapon_category: row.weapon_category,
      weapon_group: row.weapon_group,
      damage_dice: row.damage_dice,
      damage_type: row.damage_type,
      range_feet: row.range_feet,
      reload: row.reload,
      hands: row.hands,
      bulk: row.bulk,
      price_gp: row.price_gp,
      traits: row.traits,
      rarity: row.rarity,
      ruleset: row.ruleset,
      source_book: row.source_book,
      source_page: row.source_page,
      data: row.data,
    }).eq("id", row.id);
    if (error) throw new Error(`${row.id}: ${error.message}`);
  }
  console.log(JSON.stringify({ table: "catalog_weapons", updated: rows.length }));
}
main().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });
