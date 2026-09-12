const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "supabase/migrations/202609120016_seed_core_compendium_granted_powers.sql");

function loadExports(relativePath) {
  let source = fs.readFileSync(path.join(root, relativePath), "utf8");
  source = source.replace(/export interface Dnd5eFeatPrerequisite\s*\{[\s\S]*?\n\}/m, "")
    .replace(/^export interface[^\n]*\n/gm, "")
    .replace(/export const /g, "const ")
    .replace(/: (?:T20CompendiumEntry|Dnd5eCompendiumEntry)\[\]/g, "")
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
console.log(JSON.stringify({ output, items: allItems.length, spells: allSpells.length, feats: allFeats.length }, null, 2));
