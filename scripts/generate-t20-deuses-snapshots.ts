import fs from "node:fs";
import path from "node:path";
import {
  T20_FRADE_CLASS_RULES,
  T20_FRADE_POWERS,
  T20_DEUSES_SOURCE_BOOK
} from "../src/data/t20/t20DeusesClasses";
import { T20_DEUSES_GRANTED_POWERS } from "../src/data/t20/t20DeusesPowers";
import { T20_DEUSES_SPELLS } from "../src/data/t20/t20DeusesSpells";
import { T20_DEUSES_EQUIPMENT } from "../src/data/t20/t20DeusesEquipment";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/t20/t20-deuses");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "t20-deuses";
const SOURCE_BOOK = T20_DEUSES_SOURCE_BOOK;

const names = (name: string, desc: string | null) => ({
  name_pt: name,
  name_en: null,
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
  system_id: "t20",
});

// 1. Class -> class.json (1 class: Frade)
const fradeDesc = `Pontos de vida iniciais: ${T20_FRADE_CLASS_RULES.startingHp}; PV por nível: ${T20_FRADE_CLASS_RULES.hpPerLevel}; PM por nível: ${T20_FRADE_CLASS_RULES.manaPerLevel}. Perícias fixas: ${T20_FRADE_CLASS_RULES.fixedSkills.join(", ")}; escolha ${T20_FRADE_CLASS_RULES.choiceSkillCount} entre: ${T20_FRADE_CLASS_RULES.choiceSkills.join(", ")}. Proficiências: ${T20_FRADE_CLASS_RULES.proficiencies}.`;

const classes = [
  {
    id: `t20.deuses.class.${T20_FRADE_CLASS_RULES.id}`,
    ...names(T20_FRADE_CLASS_RULES.name, fradeDesc),
    hp_per_level: T20_FRADE_CLASS_RULES.hpPerLevel,
    key_attributes: ["sab", "car"],
    perception_rank: "T",
    fortitude_rank: "T",
    reflex_rank: "T",
    will_rank: "E",
    class_dc_stat: "sab",
    traits: ["Religião", "Vontade", "Divino"],
    ...common(T20_FRADE_CLASS_RULES.sourcePage),
    data: {
      ...T20_FRADE_CLASS_RULES,
      category: "classe",
      summaries: { "pt-BR": fradeDesc },
      summaryOrigin: "structured_rules"
    }
  }
];

fs.writeFileSync(
  path.join(outputDir, "class.json"),
  JSON.stringify(classes, null, 2) + "\n",
  "utf-8"
);
console.log(`class=${classes.length}`);

// 2. Feats / Powers -> feat.json (29 class powers + 75 granted powers = 104 feats)
const feats = [
  // Frade class powers (29)
  ...T20_FRADE_POWERS.map((cp) => ({
    id: `t20.deuses.poder.${cp.id}`,
    class_id: "frade",
    ancestry_id: null,
    archetype_id: null,
    feat_type: "class",
    level: 1,
    ...names(cp.name, cp.description),
    prerequisites: cp.prerequisite,
    action_cost: null,
    traits: ["frade", "classe"],
    ...common(39),
    data: {
      id: `t20.deuses.poder.${cp.id}`,
      name: cp.name,
      summary: cp.description,
      category: "poder",
      classIds: ["frade"],
      powerGroup: "classe",
      sourcePage: 39,
      prerequisite: cp.prerequisite,
      summaries: { "pt-BR": cp.description },
      summaryOrigin: "structured_rules"
    }
  })),

  // Granted powers (75)
  ...T20_DEUSES_GRANTED_POWERS.map((gp) => ({
    id: gp.id,
    class_id: null,
    ancestry_id: null,
    archetype_id: null,
    feat_type: "general",
    level: 1,
    ...names(gp.name, gp.description),
    prerequisites: gp.prerequisite,
    action_cost: null,
    traits: ["concedido", ...gp.deityIds],
    ...common(gp.sourcePage),
    data: {
      id: gp.id,
      name: gp.name,
      summary: gp.description,
      category: "poder",
      deities: gp.deities,
      deityIds: gp.deityIds,
      powerGroup: "concedido",
      sourcePage: gp.sourcePage,
      prerequisite: gp.prerequisite,
      summaries: { "pt-BR": gp.description },
      summaryOrigin: "structured_rules"
    }
  }))
];

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(feats, null, 2) + "\n",
  "utf-8"
);
console.log(`feat=${feats.length}`);

// 3. Spells -> spell.json (26 divine spells)
const spells = T20_DEUSES_SPELLS.map((sp) => ({
  id: sp.id,
  ...names(sp.name, sp.summary),
  rank: sp.spellLevel || 1,
  is_cantrip: false,
  is_focus: false,
  traditions: sp.tradition ? [sp.tradition] : ["divina"],
  cast_actions: sp.castingTime || "padrao",
  range: sp.range || null,
  targets: sp.target || null,
  duration: sp.duration || null,
  defense: sp.savingThrow || null,
  traits: [sp.school || "divina"],
  ...common(sp.sourcePage || 14),
  data: {
    ...sp,
    summaries: { "pt-BR": sp.summary },
    summaryOrigin: "structured_rules"
  }
}));

fs.writeFileSync(
  path.join(outputDir, "spell.json"),
  JSON.stringify(spells, null, 2) + "\n",
  "utf-8"
);
console.log(`spell=${spells.length}`);

// 4. Equipment -> item.json (105 items)
const items = T20_DEUSES_EQUIPMENT.map((eq) => {
  let itemCategory = "equipment";
  if (eq.category === "vestuario") itemCategory = "clothing";
  else if (eq.category === "alquimico") itemCategory = "consumable";
  else if (eq.category === "alimentacao") itemCategory = "consumable";
  else if (eq.category === "esoterico") itemCategory = "equipment";
  else if (eq.category === "liturgico") {
    if (eq.itemType === "Arma") itemCategory = "weapon";
    else if (eq.itemType === "Armadura") itemCategory = "armor";
    else itemCategory = "equipment";
  }

  const traits = [];
  if (eq.category) traits.push(eq.category);
  if (eq.subcategory) traits.push(eq.subcategory);
  if (eq.deityId) traits.push(eq.deityId);

  return {
    id: eq.id,
    ...names(eq.name, eq.description),
    item_category: itemCategory,
    level: 0,
    price_gp: 0,
    bulk: eq.spaces ? (eq.spaces >= 2 ? String(Math.floor(eq.spaces)) : "L") : "—",
    hands: 1,
    traits,
    ...common(eq.sourcePage),
    data: {
      ...eq,
      summaries: { "pt-BR": eq.description },
      summaryOrigin: "structured_rules"
    }
  };
});

fs.writeFileSync(
  path.join(outputDir, "item.json"),
  JSON.stringify(items, null, 2) + "\n",
  "utf-8"
);
console.log(`item=${items.length}`);

console.log("Generated snapshots for t20-deuses successfully!");
