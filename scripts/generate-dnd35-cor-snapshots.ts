/**
 * Gera os snapshots versionados do suplemento D&D 3.5 Champions of Ruin em
 * src/data/catalog/snapshots/dnd35/v35-cor/ a partir de src/data/dnd35/dnd35Cor*.ts.
 * Ruleset 'v35-cor', isolado do Livro do Jogador ('v35'). O Git é a fonte do catálogo (sem Supabase).
 * Rodar: npx tsx scripts/generate-dnd35-cor-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { COR_RACES, COR_DRAEGLOTH } from "../src/data/dnd35/dnd35CorRaces";
import { COR_FEATS } from "../src/data/dnd35/dnd35CorFeats";
import { COR_SPELLS } from "../src/data/dnd35/dnd35CorSpells";
import { COR_EPIC_SPELLS } from "../src/data/dnd35/dnd35CorEpicSpells";
import { COR_MAGIC_ITEMS } from "../src/data/dnd35/dnd35CorMagicItems";
import { COR_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35CorPrestige";

const BOOK = "D&D 3.5 — Champions of Ruin";
const RULESET = "v35-cor";
const STAMP = "2026-10-12T12:00:00.000+00:00";
const id = (kind: string, raw: string) => `dnd35.cor.${kind}.${raw}`;
const gp = (s: string | undefined) => (s && /^[\d,]+ gp$/.test(s) ? Number(s.replace(/[ ,gp]/g, "")) : null);
const common = (page: number | null) => ({ rarity: "common", ruleset: RULESET, source_book: BOOK, source_page: page, created_at: STAMP, updated_at: STAMP, system_id: "dnd35" });
const names = (name: string, desc: string) => ({ name_pt: name, name_en: name, name_es: null, description_pt: desc, description_en: null, description_es: null });
const levelNum = (s: string) => {
  const nums = [...s.matchAll(/(\d+)\s*(?:,|$)/g)].map((m) => Number(m[1]));
  return nums.length ? Math.min(...nums) : null;
};

const ancestry = [
  ...COR_RACES.map((r) => ({ id: id("ancestry", r.id), ...names(r.name, r.traits.join(" ")), hp_base: 8, size: r.size, speed_feet: r.speedFt, attribute_boosts: [], attribute_flaw: null, languages: r.automaticLanguages, traits: [] as string[], ...common(12), data: r })),
  { id: id("ancestry", COR_DRAEGLOTH.id), ...names(COR_DRAEGLOTH.name, COR_DRAEGLOTH.racialTraits.join(" ")), hp_base: 8, size: "Medium", speed_feet: COR_DRAEGLOTH.baseSpeedFt, attribute_boosts: [], attribute_flaw: null, languages: COR_DRAEGLOTH.automaticLanguages, traits: ["monster-class"], ...common(10), data: COR_DRAEGLOTH },
];

const classes = COR_PRESTIGE_CLASSES.map((c) => ({
  id: id("prestige", c.id),
  ...names(c.name, [c.requirements.alignment, ...c.requirements.skills, ...c.requirements.feats, ...c.requirements.special].filter(Boolean).join("; ")),
  hp_per_level: c.hitDie, key_attributes: [] as string[], perception_rank: "T", fortitude_rank: "T", reflex_rank: "T", will_rank: "T", class_dc_stat: null,
  traits: ["prestige"], ...common(44), data: c,
}));

const feats = COR_FEATS.map((f) => ({
  id: id("feat", f.id), class_id: null, ancestry_id: null, archetype_id: null, feat_type: f.type, level: 1,
  ...names(f.name, f.benefit), prerequisites: f.prerequisites, action_cost: null, traits: [f.type.toLowerCase()], ...common(17), data: f,
}));

const spells = [
  ...COR_SPELLS.map((s) => ({
    id: id("spell", s.id), ...names(s.name, s.description), rank: levelNum(s.level), is_cantrip: false, is_focus: false, traditions: [s.level],
    cast_actions: s.castingTime, range: s.range, targets: s.target ?? null, duration: s.duration, defense: s.savingThrow, traits: [s.school], ...common(28), data: s,
  })),
  ...COR_EPIC_SPELLS.map((s) => ({
    id: id("epic-spell", s.id), ...names(s.name, s.description), rank: 10, is_cantrip: false, is_focus: false, traditions: ["epic"],
    cast_actions: s.castingTime, range: s.range, targets: s.target ?? s.area ?? null, duration: s.duration, defense: s.savingThrow, traits: [s.school, "epic"], ...common(37), data: s,
  })),
];

const items = COR_MAGIC_ITEMS.map((m) => ({
  id: id("magic-item", m.id), ...names(m.name, m.effect), item_category: "magic-item", level: 0, price_gp: gp(m.price), bulk: null, hands: null, traits: [m.category], ...common(40), data: m,
}));

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
const files = { ancestry, class: classes, feat: feats, spell: spells, item: items };
for (const [category, rows] of Object.entries(files)) writeFileSync(join(dir, `${category}.json`), `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(Object.entries(files).map(([k, v]) => `${k}=${v.length}`).join(" "));
