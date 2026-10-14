import fs from "node:fs";
import path from "node:path";
import { DND35_CITY_FEATS } from "../src/data/dnd35/dnd35CityFeats";
import { DND35_CITY_SPELLS } from "../src/data/dnd35/dnd35CitySpells";
import { DND35_CITY_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35CityPrestige";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd35/v35-city");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "v35-city";
const SOURCE_BOOK = "D&D 3.5 — Cityscape";

const names = (name: string, desc: string | null) => ({
  name_pt: name,
  name_en: name,
  name_es: null,
  description_pt: desc,
  description_en: null,
  description_es: null,
});

const common = (page: number) => ({
  rarity: "common",
  ruleset: RULESET,
  source_book: SOURCE_BOOK,
  source_page: page,
  created_at: now,
  updated_at: now,
  system_id: "dnd35",
});

// 1. Classes de Prestígio -> class.json
const base = {
  key_attributes: [] as string[],
  perception_rank: "T",
  fortitude_rank: "T",
  reflex_rank: "T",
  will_rank: "T",
  class_dc_stat: null,
};

const classes = DND35_CITY_PRESTIGE_CLASSES.map((c) => ({
  id: `dnd35.city.prestige.${c.id}`,
  ...names(
    c.name,
    [
      c.requirements.bab ? `BBA ${c.requirements.bab}` : "",
      ...(c.requirements.skills || []),
      ...(c.requirements.feats || []),
      ...(c.requirements.special || []),
    ]
      .filter(Boolean)
      .join("; ")
  ),
  hp_per_level: c.hitDie,
  ...base,
  traits: ["prestige"],
  ...common(c.page),
  data: c,
}));

fs.writeFileSync(
  path.join(outputDir, "class.json"),
  JSON.stringify(classes, null, 2) + "\n",
  "utf-8"
);
console.log(`class=${classes.length}`);

// 2. Feats -> feat.json
const featEntries = DND35_CITY_FEATS.map((feat) => {
  const traits = [feat.type.toLowerCase()];
  return {
    id: `dnd35.city.feat.${feat.id}`,
    class_id: null,
    ancestry_id: null,
    archetype_id: null,
    feat_type: feat.type.toLowerCase(),
    level: 1,
    ...names(feat.name, feat.benefit),
    prerequisites: feat.prerequisite,
    action_cost: null,
    traits,
    ...common(60),
    data: {
      id: feat.id,
      name: feat.name,
      type: feat.type,
      benefit: feat.benefit,
      summary: feat.summary,
      prerequisite: feat.prerequisite,
      normal: feat.normal,
      special: feat.special,
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(featEntries, null, 2) + "\n",
  "utf-8"
);
console.log(`feat=${featEntries.length}`);

// 3. Spells & Invocations -> spell.json
const spellEntries = DND35_CITY_SPELLS.map((spell) => {
  return {
    id: `dnd35.city.spell.${spell.id}`,
    ...names(spell.name, spell.description),
    rank: 1,
    is_cantrip: false,
    is_focus: false,
    traditions: [spell.school],
    cast_actions: spell.castingTime,
    range: spell.range,
    targets: spell.target || null,
    duration: spell.duration,
    defense: spell.savingThrow,
    traits: [spell.school],
    ...common(65),
    data: spell,
  };
});

fs.writeFileSync(
  path.join(outputDir, "spell.json"),
  JSON.stringify(spellEntries, null, 2) + "\n",
  "utf-8"
);
console.log(`spell=${spellEntries.length}`);

console.log("Snapshots Cityscape (v35-city) gerados com sucesso!");
