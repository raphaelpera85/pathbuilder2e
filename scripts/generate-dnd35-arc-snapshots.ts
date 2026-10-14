/**
 * Gera os snapshots do Livro Completo do Arcano (D&D 3.5, ed. BR) em
 * src/data/catalog/snapshots/dnd35/v35-arc/class.json a partir de
 * src/data/dnd35/dnd35Arc*.ts. Ruleset 'v35-arc', isolado dos demais rulesets.
 * Rodar: npx tsx scripts/generate-dnd35-arc-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DND35_ARC_BASE_CLASSES } from "../src/data/dnd35/dnd35ArcClasses";
import { DND35_ARC_FEATS } from "../src/data/dnd35/dnd35ArcFeats";

const BOOK = "D&D 3.5 — O Livro Completo do Arcano";
const RULESET = "v35-arc";
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

const classes = DND35_ARC_BASE_CLASSES.map((c) => ({
  id: `dnd35.arc.class.${c.id}`,
  ...names(c.name, c.description),
  hp_per_level: c.hitDie,
  ...base,
  traits: ["base"],
  ...common(c.page),
  data: c,
}));

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "class.json"), `${JSON.stringify(classes, null, 2)}\n`, "utf8");
console.log(`class=${classes.length}`);

const feats = DND35_ARC_FEATS.map((f) => ({
  id: `dnd35.arc.feat.${f.id}`,
  ...names(f.name, f.benefit),
  feat_type: f.category === "geral" ? "general" : f.category,
  level: 1,
  prerequisites: f.prerequisites,
  ...common(f.page),
  data: f,
}));
writeFileSync(join(dir, "feat.json"), `${JSON.stringify(feats, null, 2)}\n`, "utf8");
console.log(`feat=${feats.length}`);

