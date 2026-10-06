/**
 * Gera supabase/migrations/202610060001_seed_dnd35_cov_catalog.sql a partir
 * dos dados do suplemento Champions of Valor (src/data/dnd35/dnd35Cov*.ts).
 * Usa ruleset 'v35-cov' para manter isolamento do Livro do Jogador (ruleset 'v35').
 * Rodar: npx tsx scripts/generate-dnd35-cov-seed.ts
 */
import { writeFileSync } from "node:fs";
import { DND35_COV_FEATS } from "../src/data/dnd35/dnd35CovFeats";
import { DND35_COV_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35CovPrestige";
import { DND35_COV_SPELLS } from "../src/data/dnd35/dnd35CovSpells";
import { DND35_COV_MAGIC_ITEMS } from "../src/data/dnd35/dnd35CovMagicItems";
import { DND35_COV_SUBSTITUTIONS } from "../src/data/dnd35/dnd35CovSubstitutions";

const BOOK = "D&D 3.5 — Champions of Valor";
const RULESET = "v35-cov";
const q = (v: string | null | undefined) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? String(v) : "null");
const arr = (v: string[]) => `ARRAY[${v.map(q).join(",")}]::text[]`;
const json = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const id = (kind: string, raw: string) => `dnd35.cov.${kind}.${raw}`;
const gp = (s: string | undefined) => (s && /^[\d,]+ gp$/.test(s) ? Number(s.replace(/[ ,gp]/g, "")) : null);

const out: string[] = [
  "-- Gerado por scripts/generate-dnd35-cov-seed.ts (suplemento D&D 3.5 Champions of Valor).",
  "-- ruleset 'v35-cov'. Idempotente: ON CONFLICT (id) DO UPDATE. Não editar à mão.",
  "",
];

function upsert(table: string, cols: string[], rows: string[][]) {
  if (!rows.length) return;
  const update = cols.filter((c) => c !== "id").map((c) => `${c} = excluded.${c}`).join(", ");
  out.push(`insert into public.${table} (${cols.join(",")}) values`);
  out.push(rows.map((r) => `(${r.join(",")})`).join(",\n"));
  out.push(`on conflict (id) do update set ${update}, updated_at = now();`, "");
}

const tail = (page: number | null) => [q(RULESET), q(BOOK), n(page), q("dnd35")];

// Classes de prestígio -> catalog_classes
upsert(
  "catalog_classes",
  ["id", "name_pt", "name_en", "description_pt", "hp_per_level", "key_attributes", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_COV_PRESTIGE_CLASSES.map((c) => [
    q(id("prestige", c.id)), q(c.name), q(c.name), q(c.requirements.join(" ")), n(c.hitDie), arr([]), arr(["prestige"]),
    ...tail(106), json(c),
  ]),
);

// Níveis de substituição -> catalog_items com categoria 'substitution'
upsert(
  "catalog_items",
  ["id", "name_pt", "name_en", "description_pt", "item_category", "level", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_COV_SUBSTITUTIONS.map((s) => [
    q(id("substitution", s.id)), q(s.name), q(s.name), q(`${s.flavor} ${s.requirements}`), q("substitution"), "1", "null", arr([s.baseClass]),
    ...tail(34), json(s),
  ]),
);

// Talentos -> catalog_feats
upsert(
  "catalog_feats",
  ["id", "feat_type", "level", "name_pt", "name_en", "description_pt", "prerequisites", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_COV_FEATS.map((f) => [
    q(id("feat", f.id)), q(f.type), "1", q(f.name), q(f.name), q(f.benefit), q(f.prerequisite), arr([f.type.toLowerCase()]),
    ...tail(27), json(f),
  ]),
);

// Magias -> catalog_spells
upsert(
  "catalog_spells",
  ["id", "name_pt", "name_en", "description_pt", "rank", "is_cantrip", "is_focus", "traditions", "cast_actions", "range", "targets", "duration", "defense", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_COV_SPELLS.map((s) => [
    q(id("spell", s.id)), q(s.name), q(s.name), q(s.description), n(Math.min(...Object.values(s.levels))), "false", "false",
    arr(Object.keys(s.levels)), q(s.castingTime ?? null), q(s.range ?? null), q(s.target ?? null), q(s.duration ?? null), q(s.savingThrow ?? null),
    arr([s.school, ...s.descriptors]), ...tail(52), json(s),
  ]),
);

// Itens Mágicos -> catalog_items
upsert(
  "catalog_items",
  ["id", "name_pt", "name_en", "description_pt", "item_category", "level", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_COV_MAGIC_ITEMS.map((m) => [
    q(id("magic-item", m.id)), q(m.name), q(m.name), q(m.description || m.intro), q("magic-item"), "0", n(gp(m.price)), arr([]),
    ...tail(60), json(m),
  ]),
);

const outPath = "supabase/migrations/202610060001_seed_dnd35_cov_catalog.sql";
writeFileSync(outPath, out.join("\n"), "utf8");
console.log(`Sucesso: ${outPath} gerado (${out.length} linhas).`);
