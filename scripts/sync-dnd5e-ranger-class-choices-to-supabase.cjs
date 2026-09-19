const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");
const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) { const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/); if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, ""); }
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");
const options = ["Aberrações", "Animais", "Celestiais", "Construtos", "Dragões", "Elementais", "Fadas", "Gigantes", "Ínferos", "Monstruosidades", "Gosmas", "Plantas", "Mortos-vivos", "Humanoides"];
const terrains = ["Ártico", "Costa", "Deserto", "Floresta", "Planície", "Montanha", "Pântano", "Subterrâneo"];
const classChoices = [
  { id: "ranger-favored-enemy", classId: "patrulheiro", label: "Inimigo Favorecido (1º nível)", minimumLevel: 1, options, count: 1 },
  { id: "ranger-favored-enemy-6", classId: "patrulheiro", label: "Inimigo Favorecido adicional (6º nível)", minimumLevel: 6, options, count: 1 },
  { id: "ranger-favored-terrain", classId: "patrulheiro", label: "Terreno Favorecido (1º nível)", minimumLevel: 1, options: terrains, count: 1 },
  { id: "ranger-favored-terrain-6", classId: "patrulheiro", label: "Terreno Favorecido adicional (6º nível)", minimumLevel: 6, options: terrains, count: 1 },
  { id: "ranger-favored-terrain-10", classId: "patrulheiro", label: "Terreno Favorecido adicional (10º nível)", minimumLevel: 10, options: terrains, count: 1 },
  { id: "ranger-fighting-style", classId: "patrulheiro", label: "Estilo de Luta", minimumLevel: 2, options: ["Arquearia", "Defesa", "Duelos", "Luta com Duas Armas"], count: 1 },
];
async function main() {
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: row, error: readError } = await supabase.from("catalog_classes").select("id,data").eq("id", "dnd5e.patrulheiro").eq("system_id", "dnd5e").eq("ruleset", "standard").maybeSingle();
  if (readError) throw readError;
  if (!row) throw new Error("Registro dnd5e/standard patrulheiro não encontrado.");
  const { error } = await supabase.from("catalog_classes").update({ data: { ...(row.data || {}), classChoices } }).eq("id", "dnd5e.patrulheiro").eq("system_id", "dnd5e").eq("ruleset", "standard");
  if (error) throw error;
  console.log(JSON.stringify({ ok: true, id: "dnd5e.patrulheiro", classChoices: classChoices.length }, null, 2));
}
main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
