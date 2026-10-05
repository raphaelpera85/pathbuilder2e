/**
 * Gera supabase/migrations/202610030002_seed_dnd35_catalog.sql a partir dos
 * dados D&D 3.5 já transcritos do Livro do Jogador (src/data/dnd35). O app
 * lê o catálogo do Supabase; os arquivos TS continuam como origem versionada
 * e como reserva offline. Rodar: npx tsx scripts/generate-dnd35-seed.ts
 */
import { writeFileSync } from "node:fs";
import { DND35_RACES } from "../src/data/dnd35/dnd35Races";
import { DND35_CLASSES } from "../src/data/dnd35/dnd35Classes";
import { DND35_SKILLS } from "../src/data/dnd35/dnd35Skills";
import { DND35_WEAPONS, DND35_ARMORS } from "../src/data/dnd35/dnd35Equipment";
import { DND35_GEAR, dnd35GearFixedCostGp } from "../src/data/dnd35/dnd35Gear";
import { DND35_FEAT_OPTIONS } from "../src/data/dnd35/dnd35FeatTable";

const BOOK = "D&D 3.5 — Livro do Jogador";
const q = (v: string | null | undefined) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? String(v) : "null");
const arr = (v: string[]) => `ARRAY[${v.map(q).join(",")}]::text[]`;
const json = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const id = (kind: string, raw: string) => `dnd35.${kind}.${raw}`;

const out: string[] = [
  "-- Gerado por scripts/generate-dnd35-seed.ts a partir de src/data/dnd35 (Livro do Jogador D&D 3.5).",
  "-- Idempotente: ON CONFLICT (id) DO UPDATE. Não editar à mão; regenerar o script.",
  "",
];

function upsert(table: string, cols: string[], rows: string[][]) {
  if (!rows.length) return;
  const update = cols.filter((c) => c !== "id").map((c) => `${c} = excluded.${c}`).join(", ");
  out.push(`insert into public.${table} (${cols.join(",")}) values`);
  out.push(rows.map((r) => `(${r.join(",")})`).join(",\n"));
  out.push(`on conflict (id) do update set ${update}, updated_at = now();`, "");
}
const common = (page: number | null | undefined) => [q(BOOK), n(page), q("v35"), q("dnd35")];

// Raças -> catalog_ancestries (velocidade impressa em metros; 3 m = 10 pés).
upsert("catalog_ancestries",
  ["id", "name_pt", "name_en", "description_pt", "size", "speed_feet", "languages", "traits", "source_book", "source_page", "ruleset", "system_id", "data"],
  Object.values(DND35_RACES).map((r) => [
    q(id("ancestry", r.id)), q(r.name), q(r.nameEn), q(r.traits.join(" ")), q(r.size),
    n(Math.round((r.baseSpeed * 10) / 3)), arr(r.languages), arr([]),
    ...common(r.sourcePageStart), json(r),
  ]),
);

// Classes -> catalog_classes
upsert("catalog_classes",
  ["id", "name_pt", "name_en", "description_pt", "hp_per_level", "key_attributes", "traits", "source_book", "source_page", "ruleset", "system_id", "data"],
  Object.values(DND35_CLASSES).map((c) => [
    q(id("class", c.id)), q(c.name), q(c.nameEn), q(`Tendência: ${c.alignment}`), n(c.hitDie),
    arr(c.castingAbility ? [c.castingAbility] : []), arr([c.casterType]),
    ...common(c.sourcePageStart), json(c),
  ]),
);

// Perícias -> catalog_skills
upsert("catalog_skills",
  ["id", "system_id", "name_pt", "key_ability", "skill_type", "ruleset", "source_book", "source_page", "data"],
  Object.values(DND35_SKILLS).map((s) => [
    q(id("skill", s.id)), q("dnd35"), q(s.name), q(s.keyAbility), q("skill"), q("v35"), q(BOOK), n(s.sourcePage), json(s),
  ]),
);

// Talentos -> catalog_feats (109 linhas da Tabela 5-1)
upsert("catalog_feats",
  ["id", "feat_type", "level", "name_pt", "description_pt", "prerequisites", "traits", "source_book", "source_page", "ruleset", "system_id", "data"],
  DND35_FEAT_OPTIONS.map((f) => [
    q(id("feat", f.id)), q(f.section), "1", q(f.name), q(f.full?.benefit ?? f.summary),
    q(f.prerequisites === "—" ? null : f.prerequisites), arr(f.notes.map((x) => `nota-${x}`)),
    q(BOOK), n(f.full?.sourcePage ?? (f.section === "comum" ? 90 : 91)), q("v35"), q("dnd35"), json(f),
  ]),
);

// Armas -> catalog_weapons
upsert("catalog_weapons",
  ["id", "name_pt", "weapon_category", "damage_dice", "damage_type", "hands", "price_gp", "source_book", "source_page", "ruleset", "system_id", "data"],
  Object.values(DND35_WEAPONS).map((w) => [
    q(id("weapon", w.id)), q(w.name), q(w.category), q(w.damageMedium), q(w.damageType),
    q(w.handedness), n(w.costGp), q(BOOK), n(w.sourcePage), q("v35"), q("dnd35"), json(w),
  ]),
);

// Armaduras e escudos -> catalog_armors
upsert("catalog_armors",
  ["id", "name_pt", "armor_category", "ac_bonus", "dex_cap", "check_penalty", "price_gp", "source_book", "source_page", "ruleset", "system_id", "data"],
  Object.values(DND35_ARMORS).map((a) => [
    q(id("armor", a.id)), q(a.name), q(a.category), n(a.armorBonus), n(a.maxDexBonus), n(a.armorCheckPenalty), n(a.costGp),
    q(BOOK), n(a.sourcePage), q("v35"), q("dnd35"), json(a),
  ]),
);

// Equipamento (Tabela 7-8) -> catalog_items; preço só quando impresso com unidade.
upsert("catalog_items",
  ["id", "name_pt", "item_category", "price_gp", "source_book", "source_page", "ruleset", "system_id", "data"],
  Object.values(DND35_GEAR).map((g) => [
    q(id("item", g.id)), q(g.name), q(g.section), n(dnd35GearFixedCostGp(g.cost)), q(BOOK), n(g.sourcePage), q("v35"), q("dnd35"), json(g),
  ]),
);

const target = "supabase/migrations/202610030002_seed_dnd35_catalog.sql";
writeFileSync(target, out.join("\n"), "utf8");
console.log(`escrito ${target} (${out.join("\n").length} caracteres)`);
