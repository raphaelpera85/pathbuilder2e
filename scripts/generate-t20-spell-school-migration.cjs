const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "src/data/t20/t20Compendium.ts"), "utf8")
  .replace(/^export interface T20PowerChoice\s*\{[\s\S]*?\n\}/m, "")
  .replace(/^export interface[^\n]*\n/gm, "")
  .replace(/export const /g, "const ")
  .replace(/: T20CompendiumEntry\[\]/g, "")
  .replace(/export function formatT20SpellDetails[\s\S]*?^\}/m, "")
  .replace(/: Record<string, string>/g, "")
  .replace(/: Record<string, readonly T20PowerChoice\[\]>/g, "")
  .replace(/: Record<string, Pick<T20CompendiumEntry, [^;]+>>/g, "")
  .replace(/ as T20CompendiumEntry\[\]/g, "")
  .replace(/ as const/g, "");
const contextModule = { exports: {} };
vm.runInNewContext(`${source}\nmodule.exports = { T20_SPELLS };`, { module: contextModule, exports: contextModule.exports, console });

const sql = (value) => {
  if (value === undefined || value === null) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (Array.isArray(value) || typeof value === "object") return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;
  return `'${String(value).replace(/'/g, "''")}'`;
};

const rows = contextModule.exports.T20_SPELLS.map((entry) => `(${sql(entry.id)},${sql(entry.name)},${sql(entry.spellLevel || 0)},FALSE,FALSE,'padrao','Tormenta20 — Livro Básico',${sql(entry.sourcePage)},${sql(entry)},'t20')`);
const migration = `-- Atualiza as escolas de magia estruturadas das magias T20 para as escolhas do Bardo.
insert into public.catalog_spells (id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values
${rows.join(",\n")}
on conflict (id) do update set data = excluded.data, updated_at = now();
`;
const output = path.join(root, "supabase/migrations/202609130040_refresh_t20_spell_schools.sql");
fs.writeFileSync(output, migration, "utf8");
console.log(JSON.stringify({ output, spells: rows.length }, null, 2));
