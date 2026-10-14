import fs from "node:fs";
import path from "node:path";
import {
  DND5E_STRIXHAVEN_RACES,
  DND5E_STRIXHAVEN_BACKGROUNDS,
  DND5E_STRIXHAVEN_FEATS,
  DND5E_STRIXHAVEN_SPELLS,
  DND5E_STRIXHAVEN_ITEMS,
  DND5E_STRIXHAVEN_SOURCE_BOOK
} from "../src/data/dnd5e/dnd5eStrixhavenData";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd5e/dnd5e-strixhaven");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "dnd5e-strixhaven";
const SOURCE_BOOK = DND5E_STRIXHAVEN_SOURCE_BOOK;

const names = (name: string, englishName: string | null, desc: string | null) => ({
  name_pt: name,
  name_en: englishName,
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
  system_id: "dnd5e",
});

// 1. Ancestries -> ancestry.json (1 race: Owlin)
const ancestries = DND5E_STRIXHAVEN_RACES.map((r) => {
  const desc = `${r.abilityBonuses}; tamanho ${r.size}, deslocamento ${r.speed}m (voo ${r.flySpeed}m); traços: ${r.traits.map(t => t.split(":")[0]).join(", ")}.`;

  return {
    id: r.id,
    ...names(r.name, r.englishName, desc),
    hp_base: 8,
    size: "Medium",
    speed_feet: Math.round(r.speed / 1.5) * 5,
    attribute_boosts: [],
    attribute_flaw: null,
    languages: ["Comum", "Mais 1 idioma à escolha"],
    traits: r.traits.map(t => t.split(":")[0].trim()),
    ...common(r.sourcePage),
    data: {
      abilityBonuses: r.abilityBonuses,
      size: r.size,
      speedMeters: r.speed,
      flySpeedMeters: r.flySpeed,
      traits: r.traits,
      summaries: { "pt-BR": desc },
      summaryOrigin: "structured_rules"
    }
  };
});

fs.writeFileSync(
  path.join(outputDir, "ancestry.json"),
  JSON.stringify(ancestries, null, 2) + "\n",
  "utf-8"
);
console.log(`ancestry=${ancestries.length}`);

// 2. Backgrounds -> background.json (5 backgrounds)
const backgrounds = DND5E_STRIXHAVEN_BACKGROUNDS.map((bg) => {
  const desc = `Faculdade: ${bg.college}. Perícias: ${bg.skillProficiencies.join(", ")}. Equipamento: ${bg.equipment}. Característica: ${bg.featureName}.`;

  return {
    id: bg.id,
    ...names(bg.name, bg.englishName, desc),
    attribute_boosts: [],
    skills: bg.skillProficiencies,
    lore_options: [],
    traits: ["Strixhaven", bg.college],
    ...common(bg.sourcePage),
    data: {
      college: bg.college,
      skills: bg.skillProficiencies,
      tools: bg.toolProficiencies || [],
      languages: bg.languages,
      equipment: bg.equipment,
      featureName: bg.featureName,
      featureDescription: bg.featureDescription,
      bonusSpells: bg.bonusSpells,
      summaries: { "pt-BR": desc },
      summaryOrigin: "structured_rules"
    }
  };
});

fs.writeFileSync(
  path.join(outputDir, "background.json"),
  JSON.stringify(backgrounds, null, 2) + "\n",
  "utf-8"
);
console.log(`background=${backgrounds.length}`);

// 3. Feats -> feat.json (2 feats)
const feats = DND5E_STRIXHAVEN_FEATS.map((f) => ({
  id: f.id,
  class_id: null,
  ancestry_id: null,
  archetype_id: null,
  feat_type: "general",
  level: f.prerequisite ? 4 : 1,
  ...names(f.name, f.englishName, f.description),
  prerequisites: f.prerequisite ? [f.prerequisite] : null,
  action_cost: null,
  traits: ["Strixhaven"],
  ...common(f.sourcePage),
  data: {
    id: f.id,
    name: f.name,
    prerequisite: f.prerequisite,
    benefits: f.benefits,
    summary: f.description,
    category: "talento",
    summaries: { "pt-BR": f.description },
    summaryOrigin: "structured_rules"
  }
}));

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(feats, null, 2) + "\n",
  "utf-8"
);
console.log(`feat=${feats.length}`);

// 4. Spells -> spell.json (5 spells)
const spells = DND5E_STRIXHAVEN_SPELLS.map((sp) => ({
  id: sp.id,
  ...names(sp.name, sp.englishName, sp.description),
  rank: sp.level,
  is_cantrip: sp.level === 0,
  is_focus: false,
  traditions: [],
  cast_actions: sp.castingTime,
  range: sp.range,
  targets: null,
  duration: sp.duration,
  defense: null,
  traits: [sp.school],
  ...common(sp.sourcePage),
  data: {
    id: sp.id,
    name: sp.name,
    range: sp.range,
    summary: sp.summary,
    category: "magia",
    classIds: sp.classIds,
    spellLevel: sp.level,
    school: sp.school,
    castingTime: sp.castingTime,
    components: sp.components,
    duration: sp.duration,
    higherLevels: sp.higherLevels || null,
    sourcePage: sp.sourcePage,
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

// 5. Items -> item.json (8 magic items)
const items = DND5E_STRIXHAVEN_ITEMS.map((it) => ({
  id: it.id,
  ...names(it.name, it.englishName, it.description),
  item_type: it.type,
  price_gp: parseInt(it.cost.replace(/[^\d]/g, ""), 10) || 100,
  weight_lb: 1,
  traits: ["Strixhaven", it.rarity],
  ...common(it.sourcePage),
  rarity: it.rarity === "Comum" ? "common" : "uncommon",
  data: {
    id: it.id,
    name: it.name,
    type: it.type,
    rarity: it.rarity,
    attunement: it.attunement,
    cost: it.cost,
    description: it.description,
    sourcePage: it.sourcePage,
    summaries: { "pt-BR": it.description },
    summaryOrigin: "structured_rules"
  }
}));

fs.writeFileSync(
  path.join(outputDir, "item.json"),
  JSON.stringify(items, null, 2) + "\n",
  "utf-8"
);
console.log(`item=${items.length}`);

console.log("Generated snapshots for dnd5e-strixhaven successfully!");
