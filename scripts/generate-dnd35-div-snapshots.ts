/**
 * Gera os snapshots do Livro Completo do Divino (D&D 3.5, ed. BR) em
 * src/data/catalog/snapshots/dnd35/v35-div/{class,feat,spell}.json a partir de
 * src/data/dnd35/dnd35Div*.ts. Ruleset 'v35-div', isolado dos demais rulesets.
 * Rodar: npx tsx scripts/generate-dnd35-div-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DND35_DIV_BASE_CLASSES } from "../src/data/dnd35/dnd35DivClasses";
import { DND35_DIV_FEATS } from "../src/data/dnd35/dnd35DivFeats";
import { DND35_DIV_PRESTIGE } from "../src/data/dnd35/dnd35DivPrestige";
import { DND35_DIV_SPELLS } from "../src/data/dnd35/dnd35DivSpells";

const BOOK = "D&D 3.5 — O Livro Completo do Divino";
const RULESET = "v35-div";
const STAMP = "2026-10-14T12:00:00.000+00:00";
const common = (page: number) => ({
  rarity: "common",
  ruleset: RULESET,
  source_book: BOOK,
  source_page: page,
  created_at: STAMP,
  updated_at: STAMP,
  system_id: "dnd35",
});
const names = (name: string, desc: string) => ({
  name_pt: name,
  name_en: null,
  name_es: null,
  description_pt: desc,
  description_en: null,
  description_es: null,
});
const base = {
  key_attributes: [] as string[],
  perception_rank: "T",
  fortitude_rank: "T",
  reflex_rank: "T",
  will_rank: "T",
  class_dc_stat: null,
};

const baseClasses = DND35_DIV_BASE_CLASSES.map((c) => ({
  id: `dnd35.div.class.${c.id}`,
  ...names(c.name, c.description),
  hp_per_level: c.hitDie,
  ...base,
  traits: ["base"],
  ...common(c.page),
  data: c,
}));

const prestigeClasses = DND35_DIV_PRESTIGE.map((c) => {
  const reqDesc = [
    c.requirements.alignment,
    c.requirements.bab ? `BBA ${c.requirements.bab}` : "",
    ...c.requirements.skills,
    ...c.requirements.feats,
    ...(c.requirements.spells ?? []),
    ...c.requirements.special,
  ]
    .filter(Boolean)
    .join("; ");
  return {
    id: `dnd35.div.prestige.${c.id}`,
    ...names(c.name, `${c.description} Requisitos: ${reqDesc}`),
    hp_per_level: c.hitDie,
    ...base,
    traits: ["prestige"],
    ...common(c.page),
    data: c,
  };
});

const classes = [...baseClasses, ...prestigeClasses];

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "class.json"), `${JSON.stringify(classes, null, 2)}\n`, "utf8");
console.log(`class=${classes.length}`);

const feats = DND35_DIV_FEATS.map((f) => ({
  id: `dnd35.div.feat.${f.id}`,
  ...names(f.name, f.benefit),
  feat_type: f.category === "geral" ? "general" : f.category,
  level: 1,
  prerequisites: f.prerequisites,
  ...common(f.page),
  data: f,
}));
writeFileSync(join(dir, "feat.json"), `${JSON.stringify(feats, null, 2)}\n`, "utf8");
console.log(`feat=${feats.length}`);

const levelNum = (s: string) => {
  const nums = [...s.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  return nums.length ? Math.min(...nums) : null;
};
const spells = DND35_DIV_SPELLS.map((s) => ({
  id: `dnd35.div.spell.${s.id}`,
  ...names(s.name, s.description),
  rank: levelNum(s.level),
  is_cantrip: s.level.toLowerCase().includes(" 0") || s.level.toLowerCase().includes("truque"),
  is_focus: false,
  traditions: [s.level],
  cast_actions: s.castingTime,
  range: s.range,
  targets: s.target ?? s.area ?? s.effect ?? null,
  duration: s.duration,
  defense: s.savingThrow,
  traits: [s.school],
  ...common(s.page),
  data: s,
}));
writeFileSync(join(dir, "spell.json"), `${JSON.stringify(spells, null, 2)}\n`, "utf8");
console.log(`spell=${spells.length}`);
