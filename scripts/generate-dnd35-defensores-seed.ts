/**
 * Gera supabase/migrations/202610060002_seed_dnd35_defensores_catalog.sql a partir
 * dos dados do suplemento Defensores da Fé (src/data/dnd35/dnd35Defensores*.ts).
 * Usa ruleset 'v35-defensores' para manter isolamento do Livro do Jogador (ruleset 'v35').
 * Rodar: npx tsx scripts/generate-dnd35-defensores-seed.ts
 */
import { writeFileSync } from "node:fs";
import { DEFENSORES_FEATS } from "../src/data/dnd35/dnd35DefensoresFeats";
import { DEFENSORES_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35DefensoresPrestige";
import { DEFENSORES_PRESTIGE_DOMAINS } from "../src/data/dnd35/dnd35DefensoresDomains";
import { DEFENSORES_SPELLS } from "../src/data/dnd35/dnd35DefensoresSpells";

const BOOK = "D&D 3.5 — Defensores da Fé";
const RULESET = "v35-defensores";
const q = (v: string | null | undefined) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? String(v) : "null");
const arr = (v: string[]) => `ARRAY[${v.map(q).join(",")}]::text[]`;
const json = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const id = (kind: string, raw: string) => `dnd35.defensores.${kind}.${raw}`;

const out: string[] = [
  "-- Gerado por scripts/generate-dnd35-defensores-seed.ts (suplemento D&D 3.5 Defensores da Fé).",
  "-- ruleset 'v35-defensores'. Idempotente: ON CONFLICT (id) DO UPDATE. Não editar à mão.",
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
  DEFENSORES_PRESTIGE_CLASSES.map((c) => [
    q(id("prestige", c.id)), q(c.name), q(c.name), q(c.requirements.join(" ")), n(c.hitDie), arr([]), arr(["prestige"]),
    ...tail(51), json(c),
  ]),
);

// Domínios de prestígio -> catalog_items com categoria 'domain'
upsert(
  "catalog_items",
  ["id", "name_pt", "name_en", "description_pt", "item_category", "level", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DEFENSORES_PRESTIGE_DOMAINS.map((d) => [
    q(id("domain", d.id)), q(d.name), q(d.name), q(d.grantedPower), q("domain"), "1", "null", arr(d.deities),
    ...tail(77), json(d),
  ]),
);

// Talentos -> catalog_feats
upsert(
  "catalog_feats",
  ["id", "feat_type", "level", "name_pt", "name_en", "description_pt", "prerequisites", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DEFENSORES_FEATS.map((f) => [
    q(id("feat", f.id)), q(f.type), "1", q(f.name), q(f.name), q(f.benefit),
    q(f.prerequisites.length ? f.prerequisites.join(", ") : null), arr([f.type.toLowerCase()]),
    ...tail(19), json(f),
  ]),
);

// Parseador de rank das magias (ex: "Clr 1", "Clr 3, Drd 2", "Misticismo 6")
function parseSpellRank(levelStr: string): number {
  const match = levelStr.match(/\b(\d+)\b/);
  return match ? parseInt(match[1], 10) : 1;
}

// Magias -> catalog_spells
upsert(
  "catalog_spells",
  ["id", "name_pt", "name_en", "description_pt", "rank", "is_cantrip", "is_focus", "traditions", "cast_actions", "range", "targets", "duration", "defense", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DEFENSORES_SPELLS.map((s) => [
    q(id("spell", s.id)), q(s.name), q(s.name), q(s.description), n(parseSpellRank(s.level)), "false", "false",
    arr([s.level]), q(s.castingTime ?? null), q(s.range ?? null), q(s.target ?? null), q(s.duration ?? null), q(s.savingThrow ?? null),
    arr([s.school]), ...tail(81), json(s),
  ]),
);

const outPath = "supabase/migrations/202610060002_seed_dnd35_defensores_catalog.sql";
writeFileSync(outPath, out.join("\n"), "utf8");
console.log(`Sucesso: ${outPath} gerado (${out.length} linhas).`);
