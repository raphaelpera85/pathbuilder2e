/**
 * Gera supabase/migrations/202610040001_seed_dnd35_frostburn_catalog.sql a partir
 * dos dados do suplemento Frostburn (src/data/dnd35/dnd35Frostburn*.ts).
 * Usa ruleset 'v35-frostburn' para NÃO ser lido pelo carregador do Livro do
 * Jogador (ruleset 'v35'), que mescla linhas por id em estruturas próprias.
 * Rodar: npx tsx scripts/generate-dnd35-frostburn-seed.ts
 */
import { writeFileSync } from "node:fs";
import { DND35_FROSTBURN_FEATS } from "../src/data/dnd35/dnd35FrostburnFeats";
import { DND35_FROSTBURN_RACES } from "../src/data/dnd35/dnd35FrostburnRaces";
import { DND35_FROSTBURN_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35FrostburnPrestige";
import { DND35_FROSTBURN_WEAPONS, DND35_FROSTBURN_GEAR, DND35_FROSTBURN_ALCHEMICAL_ITEMS } from "../src/data/dnd35/dnd35FrostburnEquipment";
import { DND35_FROSTBURN_SPELLS, DND35_FROSTBURN_POWERS } from "../src/data/dnd35/dnd35FrostburnSpells";
import { DND35_FROSTBURN_DOMAINS } from "../src/data/dnd35/dnd35FrostburnDomains";
import { DND35_FROSTBURN_MAGIC_ITEMS } from "../src/data/dnd35/dnd35FrostburnMagicItems";
import { DND35_FROSTBURN_MATERIALS, DND35_FROSTBURN_VEHICLE_AUGMENTATIONS, DND35_FROSTBURN_VEHICLES } from "../src/data/dnd35/dnd35FrostburnMaterials";

const BOOK = "D&D 3.5 — Frostburn";
const RULESET = "v35-frostburn";
const q = (v: string | null | undefined) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? String(v) : "null");
const arr = (v: string[]) => `ARRAY[${v.map(q).join(",")}]::text[]`;
const json = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const id = (kind: string, raw: string) => `dnd35.frostburn.${kind}.${raw}`;
/** "58,000 gp" -> 58000; qualquer outra forma (várias faixas, "—") -> null. */
const gp = (s: string | undefined) => (s && /^[\d,]+ gp$/.test(s) ? Number(s.replace(/[ ,gp]/g, "")) : null);

const out: string[] = [
  "-- Gerado por scripts/generate-dnd35-frostburn-seed.ts (suplemento D&D 3.5 Frostburn).",
  "-- ruleset 'v35-frostburn'. Idempotente: ON CONFLICT (id) DO UPDATE. Não editar à mão.",
  "",
];
function upsert(table: string, cols: string[], rows: string[][]) {
  if (!rows.length) return;
  const update = cols.filter((c) => c !== "id").map((c) => `${c} = excluded.${c}`).join(", ");
  out.push(`insert into public.${table} (${cols.join(",")}) values`);
  out.push(rows.map((r) => `(${r.join(",")})`).join(",\n"));
  out.push(`on conflict (id) do update set ${update}, updated_at = now();`, "");
}
const tail = (page: string | number | null) => [q(RULESET), q(BOOK), n(typeof page === "string" ? parseInt(page, 10) : page), q("dnd35")];

upsert("catalog_ancestries",
  ["id", "name_pt", "name_en", "description_pt", "size", "speed_feet", "languages", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_FROSTBURN_RACES.map((r) => [
    q(id("ancestry", r.id)), q(r.name), q(r.name), q(r.traits.map((t) => `${t.name}: ${t.text}`).join(" ")), q(r.size),
    n(r.baseLandSpeedFeet), arr(r.automaticLanguages), arr([]), ...tail(r.sourcePages), json(r),
  ]));

upsert("catalog_classes",
  ["id", "name_pt", "name_en", "description_pt", "hp_per_level", "key_attributes", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_FROSTBURN_PRESTIGE_CLASSES.map((c) => [
    q(id("class", c.id)), q(c.name), q(c.name), q(c.requirements.join(" ")), n(c.hitDie), arr([]), arr(["prestige"]),
    ...tail(52), json(c),
  ]));

upsert("catalog_feats",
  ["id", "feat_type", "level", "name_pt", "name_en", "description_pt", "prerequisites", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_FROSTBURN_FEATS.map((f) => [
    q(id("feat", f.id)), q(f.type), "1", q(f.name), q(f.name), q(f.benefit), q(f.prerequisite), arr([]), ...tail(45), json(f),
  ]));

upsert("catalog_weapons",
  ["id", "name_pt", "name_en", "description_pt", "weapon_category", "damage_dice", "damage_type", "hands", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_FROSTBURN_WEAPONS.map((w) => [
    q(id("weapon", w.id)), q(w.name), q(w.name), q(w.description), q("exotic"), q(w.damageMedium), q(w.type),
    q(w.group === "Two-Handed" ? "2" : "1"), n(gp(w.cost)), arr([w.group]), ...tail(76), json(w),
  ]));

type ItemRow = { id: string; name: string; category: string; price: number | null; description: string; page: number; data: unknown };
const items: ItemRow[] = [
  ...DND35_FROSTBURN_GEAR.map((g) => ({ id: id("gear", g.id), name: g.name, category: "gear", price: gp(g.cost), description: g.description, page: 78, data: g })),
  ...DND35_FROSTBURN_ALCHEMICAL_ITEMS.map((a) => ({ id: id("alchemical", a.id), name: a.name, category: "alchemical", price: gp(a.cost), description: a.description, page: 78, data: a })),
  ...DND35_FROSTBURN_MAGIC_ITEMS.map((m) => ({ id: id("magic-item", m.id), name: m.name, category: "magic-item", price: gp(m.price), description: m.description, page: 109, data: m })),
  ...DND35_FROSTBURN_MATERIALS.map((m) => ({ id: id("material", m.id), name: m.name, category: "material", price: null, description: m.description, page: 80, data: m })),
  ...DND35_FROSTBURN_VEHICLE_AUGMENTATIONS.map((a) => ({ id: id("vehicle-augmentation", a.id), name: a.name, category: "vehicle-augmentation", price: gp(a.price), description: a.description, page: 81, data: a })),
  ...DND35_FROSTBURN_VEHICLES.map((v) => ({ id: id("vehicle", v.id), name: v.name, category: "vehicle", price: gp(v.statLine.match(/Cost ([\d,]+ gp)/)?.[1]), description: `${v.statLine} ${v.description}`, page: 81, data: v })),
];
upsert("catalog_items",
  ["id", "name_pt", "name_en", "description_pt", "item_category", "level", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  items.map((i) => [q(i.id), q(i.name), q(i.name), q(i.description), q(i.category), "0", n(i.price), arr([]), ...tail(i.page), json(i.data)]));

upsert("catalog_spells",
  ["id", "name_pt", "name_en", "description_pt", "rank", "is_cantrip", "is_focus", "traditions", "cast_actions", "range", "targets", "duration", "defense", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  [
    ...DND35_FROSTBURN_SPELLS.map((s) => [
      q(id("spell", s.id)), q(s.name), q(s.name), q(s.description), n(Math.min(...Object.values(s.levels))), "false", "false",
      arr(Object.keys(s.levels)), q(s.castingTime ?? null), q(s.range ?? null), q(s.target ?? null), q(s.duration ?? null), q(s.savingThrow ?? null),
      arr([s.school, ...s.descriptors]), ...tail(88), json(s),
    ]),
    ...DND35_FROSTBURN_POWERS.map((p) => [
      q(id("power", p.id)), q(p.name), q(p.name), q(p.description), n(Math.min(...Object.values(p.levels))), "false", "false",
      arr(Object.keys(p.levels)), q(p.manifestingTime), q(p.range), q(p.target), q(p.duration), q(p.savingThrow),
      arr(["power", p.discipline]), ...tail(108), json(p),
    ]),
  ]);

// Domínios: catalog_feats não serve; guardados como classes de tipo "domain" não existem. Ficam em
// catalog_items com categoria "domain" para manter tudo consultável por system_id + ruleset.
upsert("catalog_items",
  ["id", "name_pt", "name_en", "description_pt", "item_category", "level", "price_gp", "traits", "ruleset", "source_book", "source_page", "system_id", "data"],
  DND35_FROSTBURN_DOMAINS.map((d) => [q(id("domain", d.id)), q(d.name), q(d.name), q(d.grantedPower), q("domain"), "0", "null", arr([]), ...tail(84), json(d)]));

const file = "supabase/migrations/202610040001_seed_dnd35_frostburn_catalog.sql";
writeFileSync(file, out.join("\n") + "\n", "utf8");
console.log(`escrito ${file} (${out.join("\n").length} caracteres)`);
