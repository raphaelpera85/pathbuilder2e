const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "supabase/migrations/202609130001_seed_core_compendium_current.sql");
const spellMetadataOutput = path.join(root, "supabase/migrations/202609130003_refresh_core_spell_metadata.sql");
const featMetadataOutput = path.join(root, "supabase/migrations/202609130005_refresh_core_feat_summaries.sql");
const t20PowerMetadataOutput = path.join(root, "supabase/migrations/202609130006_refresh_t20_general_power_summaries.sql");
const t20GrantedMetadataOutput = path.join(root, "supabase/migrations/202609130007_refresh_t20_granted_tormenta_summaries.sql");
const t20CatalogCleanupOutput = path.join(root, "supabase/migrations/202609130008_reconcile_t20_core_power_catalog.sql");
const t20SpellMetadataOutput = path.join(root, "supabase/migrations/202609130009_refresh_t20_spell_effect_summaries.sql");

function loadExports(relativePath) {
  let source = fs.readFileSync(path.join(root, relativePath), "utf8");
  source = source.replace(/export interface Dnd5eFeatPrerequisite\s*\{[\s\S]*?\n\}/m, "")
    .replace(/^export interface[^\n]*\n/gm, "")
    .replace(/export const /g, "const ")
    .replace(/: (?:T20CompendiumEntry|Dnd5eCompendiumEntry)\[\]/g, "")
    .replace(/ as Dnd5eCompendiumEntry/g, "")
    .replace(/ as Record<string, Pick<Dnd5eCompendiumEntry, [^;]+>>/g, "")
    .replace(/export function formatDnd5eSpellDetails[\s\S]*?^\}/m, "")
    .replace(/: Record<string, string>/g, "")
    .replace(/: Record<string, Dnd5eFeatPrerequisite \| undefined>/g, "")
    .replace(/ as (?:T20CompendiumEntry\[\]|const)/g, "");
  const exportedNames = relativePath.includes("t20")
    ? ["T20_EQUIPMENT", "T20_SPELLS", "T20_POWERS"]
    : ["DND5E_EQUIPMENT", "DND5E_SPELLS", "DND5E_FEATS"];
  const javascript = `${source}\nmodule.exports = { ${exportedNames.join(", ")} };`;
  const module = { exports: {} };
  vm.runInNewContext(javascript, { module, exports: module.exports, console });
  return module.exports;
}

const t20 = loadExports("src/data/t20/t20Compendium.ts");
const dnd5e = loadExports("src/data/dnd5e/dnd5eCompendium.ts");

function sql(value) {
  if (value === undefined || value === null) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (Array.isArray(value) || typeof value === "object") return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
  return `'${String(value).replace(/'/g, "''")}'`;
}

function itemRows(system, ruleset, sourceBook, entries) {
  return entries.map((entry) => {
    const category = entry.category === "arma" ? "weapon" : entry.category === "armadura" ? "worn" : "gear";
    return `(${sql(entry.id)},${sql(entry.name)},${sql(category)},${sql(ruleset)},${sql(sourceBook)},${sql(entry.sourcePage)},${sql(entry)},${sql(system)})`;
  });
}

function spellRows(system, ruleset, sourceBook, entries) {
  return entries.map((entry) => `(${sql(entry.id)},${sql(entry.name)},${sql(entry.spellLevel || 0)},${entry.spellLevel === 0 ? "TRUE" : "FALSE"},FALSE,${sql(ruleset)},${sql(sourceBook)},${sql(entry.sourcePage)},${sql(entry)},${sql(system)})`);
}

function featRows(system, ruleset, sourceBook, entries) {
  return entries.map((entry) => `(${sql(entry.id)},${sql(system === "t20" ? "general" : "general")},${sql(entry.minimumLevel || 1)},${sql(entry.name)},${sql(ruleset)},${sql(sourceBook)},${sql(entry.sourcePage)},${sql(entry)},${sql(system)})`);
}

const allItems = [
  ...itemRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_EQUIPMENT),
  ...itemRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_EQUIPMENT),
];
const allSpells = [
  ...spellRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_SPELLS),
  ...spellRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_SPELLS),
];
const allFeats = [
  ...featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_POWERS),
  ...featRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_FEATS),
];

const onConflict = (columns) => `on conflict (id) do update set ${columns.map((column) => `${column}=excluded.${column}`).join(",")},updated_at=now();`;
const sqlText = `-- Seed gerada a partir dos catálogos locais do construtor.
-- Idempotente por ID; nunca remove registros de outro sistema/ruleset.
insert into public.catalog_items (id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values
${allItems.join(",\n")}
${onConflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"])}

insert into public.catalog_spells (id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values
${allSpells.join(",\n")}
${onConflict(["name_pt","rank","is_cantrip","is_focus","ruleset","source_book","source_page","data","system_id"])}

insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${allFeats.join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;

fs.writeFileSync(output, sqlText, "utf8");
const spellMetadataSql = `-- Refresh idempotente dos metadados de execução das magias do compêndio core.
insert into public.catalog_spells (id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values
${allSpells.join(",\n")}
${onConflict(["name_pt","rank","is_cantrip","is_focus","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(spellMetadataOutput, spellMetadataSql, "utf8");
const featMetadataSql = `-- Refresh idempotente dos resumos de efeito dos talentos/poderes do compêndio core.
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${allFeats.join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(featMetadataOutput, featMetadataSql, "utf8");
const t20GeneralPowers = t20.T20_POWERS.filter((entry) => ["combate", "destino", "magia"].includes(entry.powerGroup) && entry.sourcePage >= 130 && entry.sourcePage <= 137);
const t20PowerMetadataSql = `-- Refresh dos efeitos resumidos dos poderes gerais de Tormenta20 (Livro Básico, pp. 130–137).
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20GeneralPowers).join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20PowerMetadataOutput, t20PowerMetadataSql, "utf8");
const t20GrantedAndTormentaPowers = t20.T20_POWERS.filter((entry) => ["concedido", "tormenta"].includes(entry.powerGroup));
const t20GrantedMetadataSql = `-- Refresh dos efeitos resumidos dos poderes concedidos e da Tormenta de Tormenta20 (Livro Básico, pp. 133 e 138–140).
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20GrantedAndTormentaPowers).join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20GrantedMetadataOutput, t20GrantedMetadataSql, "utf8");
const t20CatalogCleanupSql = `-- Reconcilia o catálogo de poderes T20 com o Livro Básico atual.
delete from public.catalog_feats
where system_id = 't20' and ruleset = 'padrao'
  and id in ('t20.poder.companheiro_animal', 't20.poder.especializacao_em_pericia', 't20.poder.foco_em_pericia', 't20.poder.iniciativa_aprimorada');
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_POWERS.filter((entry) => entry.id === "t20.poder.ataque_poderoso")).join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20CatalogCleanupOutput, t20CatalogCleanupSql, "utf8");
const t20SpellSummaryEntries = t20.T20_SPELLS.filter((entry) => !String(entry.summary || "").match(/^(arcana|divina|universal|essencia) \d+º círculo ·/));
const t20SpellMetadataSql = `-- Refresh dos efeitos resumidos das magias T20 com texto conferido no Livro Básico.
insert into public.catalog_spells (id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values
${spellRows("t20", "padrao", "Tormenta20 — Livro Básico", t20SpellSummaryEntries).join(",\n")}
${onConflict(["name_pt","rank","is_cantrip","is_focus","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20SpellMetadataOutput, t20SpellMetadataSql, "utf8");
console.log(JSON.stringify({ output, spellMetadataOutput, featMetadataOutput, t20PowerMetadataOutput, t20GrantedMetadataOutput, t20CatalogCleanupOutput, t20SpellMetadataOutput, items: allItems.length, spells: allSpells.length, feats: allFeats.length, t20GeneralPowers: t20GeneralPowers.length, t20GrantedAndTormentaPowers: t20GrantedAndTormentaPowers.length, t20SpellSummaryEntries: t20SpellSummaryEntries.length }, null, 2));
