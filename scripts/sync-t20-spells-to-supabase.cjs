/** Sincroniza o catálogo local de magias T20 com o Supabase sem depender de SQL manual. */
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
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

function toRows(spells) {
  return spells.map((entry) => ({
    id: entry.id,
    name_pt: entry.name,
    rank: entry.spellLevel || 0,
    is_cantrip: entry.spellLevel === 0,
    is_focus: false,
    ruleset: "padrao",
    source_book: "Tormenta20 — Livro Básico",
    source_page: entry.sourcePage,
    data: entry,
    system_id: "t20",
  }));
}

async function run() {
  const { T20_SPELLS } = await import(pathToFileURL(path.join(root, "src/data/t20/t20Compendium.ts")).href);
  const rows = toRows(T20_SPELLS);
  if (rows.length !== 66 || rows.some((row) => !row.data.castingTime || !row.data.range || (!row.data.target && !row.data.area) || !row.data.duration)) {
    throw new Error("O catálogo local T20 não possui as 66 magias com metadados operacionais completos.");
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("catalog_spells").upsert(rows, { onConflict: "id" });
  if (error) throw new Error(`Falha ao sincronizar magias T20: ${error.message}`);

  const { data, error: readError } = await supabase
    .from("catalog_spells")
    .select("id,data")
    .eq("system_id", "t20")
    .eq("ruleset", "padrao");
  if (readError) throw new Error(`Falha ao verificar magias T20: ${readError.message}`);
  const expectedIds = new Set(rows.map((row) => row.id));
  const synced = (data || []).filter((row) => expectedIds.has(row.id));
  const invalid = synced.filter((row) => !row.data?.castingTime || !row.data?.range || (!row.data?.target && !row.data?.area) || !row.data?.duration).map((row) => row.id);
  if (synced.length !== rows.length || invalid.length > 0) {
    throw new Error(`Verificação incompleta: esperadas ${rows.length}, encontradas ${synced.length}; inválidas: ${invalid.join(", ") || "nenhuma"}.`);
  }
  console.log(JSON.stringify({ ok: true, system: "t20", ruleset: "padrao", synced: synced.length, invalid }, null, 2));
}

run().catch((error) => {
  console.error(`[T20SpellSync] ${error.message}`);
  process.exitCode = 1;
});
