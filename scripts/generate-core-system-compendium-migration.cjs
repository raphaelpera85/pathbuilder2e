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
const dnd5eFeatChoicesOutput = path.join(root, "supabase/migrations/202609130010_refresh_dnd5e_feat_choices.sql");
const t20PowerChoicesOutput = path.join(root, "supabase/migrations/202609130011_refresh_t20_power_choices.sql");
const t20SpellEffectRefreshOutput = path.join(root, "supabase/migrations/202609130013_refresh_t20_spell_effects_complete.sql");
const t20SpellDetailsOutput = path.join(root, "supabase/migrations/202609130014_refresh_t20_spell_operational_metadata.sql");
const t20EquipmentExpansionOutput = path.join(root, "supabase/migrations/202609130028_expand_t20_equipment_catalog.sql");
const dnd5eEquipmentExpansionOutput = path.join(root, "supabase/migrations/202609130029_expand_dnd5e_mounts_vehicles.sql");
const dnd5eAdditionalGearOutput = path.join(root, "supabase/migrations/202609130030_expand_dnd5e_core_gear_tools.sql");
const dnd5eWeaponMetadataOutput = path.join(root, "supabase/migrations/202609130031_refresh_dnd5e_weapon_metadata.sql");

function loadExports(relativePath) {
  let source = fs.readFileSync(path.join(root, relativePath), "utf8");
  source = source.replace(/export interface Dnd5eFeatPrerequisite\s*\{[\s\S]*?\n\}/m, "")
    .replace(/export interface Dnd5eFeatChoice\s*\{[\s\S]*?\n\}/m, "")
    .replace(/export interface T20PowerChoice\s*\{[\s\S]*?\n\}/m, "")
    .replace(/^export interface[^\n]*\n/gm, "")
    .replace(/export const /g, "const ")
    .replace(/: (?:T20CompendiumEntry|Dnd5eCompendiumEntry)\[\]/g, "")
    .replace(/ as Dnd5eCompendiumEntry/g, "")
    .replace(/: Record<string, Pick<Dnd5eCompendiumEntry, [^;]+>>/g, "")
    .replace(/ as Record<string, Pick<Dnd5eCompendiumEntry, [^;]+>>/g, "")
    .replace(/export function formatDnd5eSpellDetails[\s\S]*?^\}/m, "")
    .replace(/export function formatT20SpellDetails[\s\S]*?^\}/m, "")
    .replace(/: Record<string, string>/g, "")
    .replace(/: Record<string, readonly Dnd5eFeatChoice\[\]>/g, "")
    .replace(/: Record<string, readonly T20PowerChoice\[\]>/g, "")
    .replace(/: Record<string, Pick<T20CompendiumEntry, [^;]+>>/g, "")
    .replace(/: Record<string, Dnd5eFeatPrerequisite \| undefined>/g, "")
    .replace(/ as (?:T20CompendiumEntry\[\]|const)/g, "");
  const exportedNames = relativePath.includes("t20")
    ? ["T20_EQUIPMENT", "T20_SPELLS", "T20_POWERS", "T20_POWER_CHOICES"]
    : ["DND5E_EQUIPMENT", "DND5E_SPELLS", "DND5E_FEATS", "DND5E_FEAT_CHOICES"];
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

function featRows(system, ruleset, sourceBook, entries, choiceMap) {
  return entries.map((entry) => {
    const data = choiceMap?.[entry.id] ? { ...entry, choices: choiceMap[entry.id] } : entry;
    return `(${sql(entry.id)},${sql(system === "t20" ? "general" : "general")},${sql(entry.minimumLevel || 1)},${sql(entry.name)},${sql(ruleset)},${sql(sourceBook)},${sql(entry.sourcePage)},${sql(data)},${sql(system)})`;
  });
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
  ...featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_POWERS, t20.T20_POWER_CHOICES),
  ...featRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_FEATS, dnd5e.DND5E_FEAT_CHOICES),
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
const t20EquipmentExpansionSql = `-- Expansão idempotente do catálogo de equipamentos T20 a partir das Tabelas 3-3, 3-4 e 3-5 do Livro Básico.
insert into public.catalog_items (id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values
${itemRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_EQUIPMENT).join(",\n")}
${onConflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20EquipmentExpansionOutput, t20EquipmentExpansionSql, "utf8");
const dnd5eEquipmentExpansionSql = `-- Expansão idempotente de montarias, arreios e veículos D&D 5e do Livro do Jogador (2014), pp. 158–159.
insert into public.catalog_items (id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values
${itemRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_EQUIPMENT).join(",\n")}
${onConflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(dnd5eEquipmentExpansionOutput, dnd5eEquipmentExpansionSql, "utf8");
const dnd5eAdditionalGearSql = `-- Expansão idempotente do equipamento, focos, ferramentas e jogos D&D 5e do Livro do Jogador (2014), pp. 152 e 156.
insert into public.catalog_items (id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values
${itemRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_EQUIPMENT).join(",\n")}
${onConflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(dnd5eAdditionalGearOutput, dnd5eAdditionalGearSql, "utf8");
const dnd5eWeaponMetadataSql = `-- Refresh idempotente das propriedades operacionais das armas D&D 5e.
insert into public.catalog_items (id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values
${itemRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5e.DND5E_EQUIPMENT.filter((entry) => entry.category === "arma")).join(",\n")}
${onConflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(dnd5eWeaponMetadataOutput, dnd5eWeaponMetadataSql, "utf8");
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
const dnd5eFeatChoiceEntries = dnd5e.DND5E_FEATS.filter((entry) => dnd5e.DND5E_FEAT_CHOICES[entry.id]);
const dnd5eFeatChoicesSql = `-- Refresh idempotente das escolhas estruturadas dos talentos D&D 5e.
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${featRows("dnd5e", "standard", "D&D 5e — Livro do Jogador (2014)", dnd5eFeatChoiceEntries, dnd5e.DND5E_FEAT_CHOICES).join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(dnd5eFeatChoicesOutput, dnd5eFeatChoicesSql, "utf8");
const t20PowerChoiceEntries = t20.T20_POWERS.filter((entry) => t20.T20_POWER_CHOICES[entry.id]);
const t20PowerChoicesSql = `-- Refresh idempotente das escolhas estruturadas dos poderes T20.
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
${featRows("t20", "padrao", "Tormenta20 — Livro Básico", t20PowerChoiceEntries, t20.T20_POWER_CHOICES).join(",\n")}
${onConflict(["feat_type","level","name_pt","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20PowerChoicesOutput, t20PowerChoicesSql, "utf8");
const t20AllSpellEffectSql = `-- Refresh idempotente dos efeitos resumidos de todas as magias T20 do catálogo.
insert into public.catalog_spells (id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values
${spellRows("t20", "padrao", "Tormenta20 — Livro Básico", t20.T20_SPELLS).join(",\n")}
${onConflict(["name_pt","rank","is_cantrip","is_focus","ruleset","source_book","source_page","data","system_id"])}
`;
fs.writeFileSync(t20SpellEffectRefreshOutput, t20AllSpellEffectSql, "utf8");
fs.writeFileSync(t20SpellDetailsOutput, t20AllSpellEffectSql, "utf8");
console.log(JSON.stringify({ output, spellMetadataOutput, featMetadataOutput, t20PowerMetadataOutput, t20GrantedMetadataOutput, t20CatalogCleanupOutput, t20SpellMetadataOutput, t20EquipmentExpansionOutput, dnd5eEquipmentExpansionOutput, dnd5eAdditionalGearOutput, dnd5eWeaponMetadataOutput, items: allItems.length, spells: allSpells.length, feats: allFeats.length, t20GeneralPowers: t20GeneralPowers.length, t20GrantedAndTormentaPowers: t20GrantedAndTormentaPowers.length, t20SpellSummaryEntries: t20SpellSummaryEntries.length }, null, 2));
