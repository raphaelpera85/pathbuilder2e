/** Read-only audit of the supported core-system slices in Supabase. */
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

const expected = {
  "dnd5e/standard": { catalog_ancestries: 9, catalog_classes: 12, catalog_backgrounds: 13, catalog_subclasses: 40, catalog_items: 111, catalog_spells: 58, catalog_feats: 40 },
  "t20/padrao": { catalog_ancestries: 17, catalog_classes: 14, catalog_backgrounds: 35, catalog_items: 66, catalog_spells: 66, catalog_feats: 412 },
  "ose/advanced": { catalog_ancestries: 10, catalog_classes: 16, catalog_items: 53, catalog_spells: 34, catalog_feats: 0 },
};
const expectedDndBackgroundChoices = {
  "dnd5e.artesao_guilda": ["artisan", 17],
  "dnd5e.artista": ["instrument", 10],
  "dnd5e.criminoso": ["game", 4],
  "dnd5e.forasteiro": ["instrument", 10],
  "dnd5e.heroi_do_povo": ["artisan", 17],
  "dnd5e.nobre": ["game", 4],
  "dnd5e.soldado": ["game", 4],
};

async function count(table, systemId, ruleset) {
  const { count: rowCount, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("system_id", systemId)
    .eq("ruleset", ruleset);
  if (error) throw new Error(`Falha ao contar ${table}: ${error.message}`);
  return rowCount || 0;
}

async function run() {
  const results = [];
  for (const [scope, tables] of Object.entries(expected)) {
    const [systemId, ruleset] = scope.split("/");
    const actual = {};
    for (const table of Object.keys(tables)) actual[table] = await count(table, systemId, ruleset);
    results.push({ scope, expected: tables, actual, ok: Object.keys(tables).every((table) => tables[table] === actual[table]) });
  }

  const [{ data: classes, error: classError }, { data: subclasses, error: subclassError }] = await Promise.all([
    supabase.from("catalog_classes").select("id,system_id,ruleset"),
    supabase.from("catalog_subclasses").select("id,class_id,system_id,ruleset"),
  ]);
  if (classError) throw new Error(`Falha ao ler classes: ${classError.message}`);
  if (subclassError) throw new Error(`Falha ao ler subclasses: ${subclassError.message}`);
  const classKeys = new Set((classes || []).map((row) => `${row.id}|${row.system_id}|${row.ruleset}`));
  const orphanRows = (subclasses || []).filter((row) => !classKeys.has(`${row.class_id}|${row.system_id}|${row.ruleset}`));
  const { data: dndBackgrounds, error: backgroundError } = await supabase
    .from("catalog_backgrounds")
    .select("id,data")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard");
  if (backgroundError) throw new Error(`Falha ao ler antecedentes D&D 5e: ${backgroundError.message}`);
  const backgroundChoiceMismatches = Object.entries(expectedDndBackgroundChoices)
    .filter(([id, [group, optionCount]]) => {
      const data = (dndBackgrounds || []).find((row) => row.id === id)?.data || {};
      return JSON.stringify(data.toolChoiceGroups || []) !== JSON.stringify([group]) || (data.toolChoiceNames || []).length !== optionCount;
    })
    .map(([id]) => id);
  const { data: dndFeats, error: featError } = await supabase
    .from("catalog_feats")
    .select("id,data")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard");
  if (featError) throw new Error(`Falha ao ler talentos D&D 5e: ${featError.message}`);
  const featSummaryMismatches = (dndFeats || [])
    .filter((row) => row.data?.summary === "Talento opcional do Livro do Jogador" || !row.data?.summary)
    .map((row) => row.id);
  const { data: t20Feats, error: t20FeatError } = await supabase
    .from("catalog_feats")
    .select("id,data")
    .eq("system_id", "t20")
    .eq("ruleset", "padrao");
  if (t20FeatError) throw new Error(`Falha ao ler poderes T20: ${t20FeatError.message}`);
  const t20GeneralPowerSummaryMismatches = (t20Feats || [])
    .filter((row) => ["combate", "destino", "magia"].includes(row.data?.powerGroup) && row.data?.sourcePage >= 130 && row.data?.sourcePage <= 137 && String(row.data?.summary || "").startsWith("Poder de "))
    .map((row) => row.id);
  const t20GrantedTormentaSummaryMismatches = (t20Feats || [])
    .filter((row) => ["concedido", "tormenta"].includes(row.data?.powerGroup) && (row.data?.summary === "Poder concedido · exige devoção à divindade" || String(row.data?.summary || "").startsWith("Poder de ")))
    .map((row) => row.id);
  const { data: t20Spells, error: t20SpellError } = await supabase
    .from("catalog_spells")
    .select("id,data")
    .eq("system_id", "t20")
    .eq("ruleset", "padrao");
  if (t20SpellError) throw new Error(`Falha ao ler magias T20: ${t20SpellError.message}`);
  const t20SpellSummaryMismatches = (t20Spells || [])
    .filter((row) => row.data?.id && !String(row.data?.summary || "").trim() || false)
    .map((row) => row.id);
  const ok = results.every((result) => result.ok) && orphanRows.length === 0 && backgroundChoiceMismatches.length === 0 && featSummaryMismatches.length === 0 && t20GeneralPowerSummaryMismatches.length === 0 && t20GrantedTormentaSummaryMismatches.length === 0 && t20SpellSummaryMismatches.length === 0;
  console.log(JSON.stringify({ ok, results, orphanSubclasses: orphanRows, backgroundChoiceMismatches, featSummaryMismatches, t20GeneralPowerSummaryMismatches, t20GrantedTormentaSummaryMismatches, t20SpellSummaryMismatches }, null, 2));
  if (!ok) process.exitCode = 1;
}

run().catch((error) => { console.error(`[CoreSystemAudit] ${error.message}`); process.exitCode = 1; });
