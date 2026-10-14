import fs from "node:fs";
import path from "node:path";
import { DND35_EE_FEATS } from "../src/data/dnd35/dnd35EeFeats";
import { DND35_EE_SPELLS } from "../src/data/dnd35/dnd35EeSpells";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd35/v35-ee");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();

// 1. Feats
const featEntries = DND35_EE_FEATS.map((feat) => {
  const traits = [feat.type.toLowerCase()];
  return {
    id: `dnd35.ee.feat.${feat.id}`,
    class_id: null,
    ancestry_id: null,
    archetype_id: null,
    feat_type: feat.type,
    level: 1,
    name_pt: feat.name,
    name_en: feat.name,
    name_es: null,
    description_pt: feat.benefit,
    description_en: null,
    description_es: null,
    prerequisites: feat.prerequisite,
    action_cost: null,
    traits,
    rarity: "common",
    ruleset: "v35-ee",
    source_book: "D&D 3.5 — Exemplars of Evil",
    source_page: 22,
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
    created_at: now,
    updated_at: now,
    system_id: "dnd35",
  };
});

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(featEntries, null, 2) + "\n",
  "utf-8"
);
console.log(`Generated ${featEntries.length} feats in ${path.join(outputDir, "feat.json")}`);

// 2. Spells
const spellEntries = DND35_EE_SPELLS.map((spell) => {
  const minRank = Math.min(...Object.values(spell.levels));
  const traditions = Object.keys(spell.levels);
  const traits = [spell.school, ...(spell.descriptors || [])];
  return {
    id: `dnd35.ee.spell.${spell.id}`,
    name_pt: spell.name,
    name_en: spell.name,
    name_es: null,
    description_pt: spell.description,
    description_en: null,
    description_es: null,
    rank: minRank,
    is_cantrip: false,
    is_focus: false,
    traditions,
    cast_actions: spell.castingTime,
    range: spell.range,
    targets: spell.target,
    duration: spell.duration,
    defense: spell.savingThrow,
    traits,
    rarity: "common",
    ruleset: "v35-ee",
    source_book: "D&D 3.5 — Exemplars of Evil",
    source_page: 27,
    data: {
      id: spell.id,
      name: spell.name,
      range: spell.range,
      levels: spell.levels,
      school: spell.school,
      target: spell.target,
      duration: spell.duration,
      levelLine: spell.levelLine,
      subschool: spell.subschool,
      components: spell.components,
      schoolLine: spell.schoolLine,
      castingTime: spell.castingTime,
      description: spell.description,
      descriptors: spell.descriptors,
      savingThrow: spell.savingThrow,
      spellResistance: spell.spellResistance,
    },
    created_at: now,
    updated_at: now,
    system_id: "dnd35",
  };
});

fs.writeFileSync(
  path.join(outputDir, "spell.json"),
  JSON.stringify(spellEntries, null, 2) + "\n",
  "utf-8"
);
console.log(`Generated ${spellEntries.length} spells in ${path.join(outputDir, "spell.json")}`);
