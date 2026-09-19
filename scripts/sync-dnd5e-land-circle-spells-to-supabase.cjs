const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.resolve(__dirname, "..", ".env");
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");

const spells = [
  ["dnd5e.magia.escalar", "Escalar", 2, 280, ["bruxo", "feiticeiro", "mago"]],
  ["dnd5e.magia.imagem_espelhada", "Imagem Espelhada", 2, 252, ["feiticeiro", "mago"]],
  ["dnd5e.magia.invisibilidade", "Invisibilidade", 2, 254, ["bardo", "bruxo", "feiticeiro", "mago"]],
  ["dnd5e.magia.lentidao", "Lentidão", 3, 280, ["bardo", "feiticeiro", "mago"]],
  ["dnd5e.magia.nuvem_fetida", "Nuvem Fétida", 3, 263, ["bardo", "feiticeiro", "mago"]],
  ["dnd5e.magia.forma_gasosa", "Forma Gasosa", 3, 242, ["bruxo", "feiticeiro", "mago"]],
  ["dnd5e.magia.passagem", "Passagem", 5, 267, ["mago"]],
].map(([id, name, rank, sourcePage, classIds]) => ({
  id, name_pt: name, rank, is_cantrip: false, is_focus: false, ruleset: "standard",
  source_book: "D&D 5e — Livro do Jogador (2014)", source_page: sourcePage, system_id: "dnd5e",
  data: { id, name, sourcePage, category: "magia", summary: `${rank}º nível`, spellLevel: rank, classIds },
}));

async function main() {
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await supabase.from("catalog_spells").upsert(spells, { onConflict: "id" });
  if (error) throw error;
  const { data, error: readError } = await supabase.from("catalog_spells").select("id,name_pt,rank").in("id", spells.map((spell) => spell.id));
  if (readError) throw readError;
  if ((data || []).length !== spells.length) throw new Error(`Esperava ${spells.length} magias, encontrei ${(data || []).length}.`);
  console.log(JSON.stringify({ ok: true, synced: data }, null, 2));
}

main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
