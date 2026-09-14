/** Atualiza apenas os metadados de sintonização dos itens D&D 5e 2014. */
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

const requiresAttunement = new Set([
  "dnd5e.item_magico.amuletoprotecao_deteccao",
  "dnd5e.item_magico.amuletosaude",
  "dnd5e.item_magico.amuletoplanos",
  "dnd5e.item_magico.anelandar_livre",
  "dnd5e.item_magico.anelariete",
  "dnd5e.item_magico.anelprotecao",
  "dnd5e.item_magico.anelresistencia",
  "dnd5e.item_magico.botas_velocidade",
  "dnd5e.item_magico.capa_elfica",
  "dnd5e.item_magico.capa_deslocamento",
  "dnd5e.item_magico.varinha_misseis_magicos",
]);
const noAttunement = new Set([
  "dnd5e.item_magico.adaga_envenenamento",
  "dnd5e.item_magico.armadura_um",
  "dnd5e.item_magico.arma_um",
  "dnd5e.item_magico.botas_elficas",
]);
const ids = [...requiresAttunement, ...noAttunement];

(async () => {
  const { data, error } = await supabase.from("catalog_items").select("id,data").eq("system_id", "dnd5e").eq("ruleset", "standard").in("id", ids);
  if (error) throw error;
  const found = new Set((data || []).map((row) => row.id));
  if (found.size !== ids.length) throw new Error(`Itens ausentes no Supabase: ${ids.filter((id) => !found.has(id)).join(", ")}`);

  for (const row of data || []) {
    const updatedData = { ...(row.data || {}), requiresAttunement: requiresAttunement.has(row.id) };
    const result = await supabase.from("catalog_items").update({ data: updatedData }).eq("id", row.id).eq("system_id", "dnd5e").eq("ruleset", "standard");
    if (result.error) throw result.error;
  }
  console.log(JSON.stringify({ ok: true, updated: ids.length, requiresAttunement: requiresAttunement.size, noAttunement: noAttunement.size }, null, 2));
})().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
