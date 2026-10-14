import fs from "node:fs";
import path from "node:path";
import { DND5E_SCAG_SPELLS, DND5E_SCAG_SOURCE_BOOK } from "../src/data/dnd5e/dnd5eScagSpells";
import { DND5E_SCAG_SUBCLASSES } from "../src/data/dnd5e/dnd5eScagSubclasses";
import { DND5E_SCAG_BACKGROUNDS } from "../src/data/dnd5e/dnd5eScagBackgrounds";
import { DND5E_SCAG_RACES } from "../src/data/dnd5e/dnd5eScagRaces";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd5e/dnd5e-scag");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "dnd5e-scag";
const SOURCE_BOOK = DND5E_SCAG_SOURCE_BOOK;

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

// 1. Spells -> spell.json (4 cantrips)
const spells = DND5E_SCAG_SPELLS.map((sp) => ({
  id: sp.id,
  ...names(sp.name, null, sp.description),
  rank: sp.level,
  is_cantrip: sp.level === 0,
  is_focus: false,
  traditions: [],
  cast_actions: sp.castingTime,
  range: sp.range,
  targets: null,
  duration: sp.duration,
  defense: sp.savingThrow || null,
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
    savingThrow: sp.savingThrow || null,
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

// 2. Subclasses -> subclass.json (11 subclasses)
const subclasses = DND5E_SCAG_SUBCLASSES.map((sub) => ({
  id: sub.id,
  class_id: `dnd5e.${sub.classId}`,
  subclass_type: "subclass",
  ...names(sub.name, sub.englishName, sub.description),
  traits: sub.restriction ? [sub.restriction] : [],
  ...common(sub.sourcePage),
  data: {
    featureLevel: sub.featureLevel,
    features: sub.features,
    restriction: sub.restriction || null,
    summaries: { "pt-BR": sub.description },
    summaryOrigin: "structured_rules"
  }
}));

fs.writeFileSync(
  path.join(outputDir, "subclass.json"),
  JSON.stringify(subclasses, null, 2) + "\n",
  "utf-8"
);
console.log(`subclass=${subclasses.length}`);

// 3. Backgrounds -> background.json (12 backgrounds)
const backgrounds = DND5E_SCAG_BACKGROUNDS.map((bg) => {
  const summary = `Perícias: ${bg.skillProficiencies.join(", ")}. Idiomas à escolha: ${bg.languageChoices}. Característica: ${bg.featureName}. Equipamento inicial: ${bg.startingEquipment.join(", ")}.`;

  return {
    id: bg.id,
    ...names(bg.name, bg.englishName, summary),
    attribute_boosts: [],
    trained_skills: bg.skillProficiencies,
    granted_feat: null,
    traits: [],
    ...common(bg.sourcePage),
    data: {
      kind: "background",
      skillProficiencies: bg.skillProficiencies,
      toolProficiencies: bg.toolProficiencies,
      toolChoiceGroups: [],
      languageChoices: bg.languageChoices,
      feature: bg.featureName,
      featureDescription: bg.featureDescription,
      startingEquipment: bg.startingEquipment,
      summaries: { "pt-BR": summary },
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

// 4. Ancestries / Subraces -> ancestry.json (4 subraces)
const ancestries = DND5E_SCAG_RACES.map((r) => {
  const boosts: string[] = [];
  for (const [attr, val] of Object.entries(r.attributeAdjustments)) {
    if (val && val > 0) boosts.push(attr);
  }

  const desc = `${r.abilityBonuses}; tamanho ${r.size}, deslocamento ${r.speed}m; traços: ${r.traits.map(t => t.split(":")[0]).join(", ")}.`;

  return {
    id: r.id,
    ...names(r.name, r.englishName, desc),
    hp_base: 8,
    size: r.size === "Pequeno" ? "Small" : "Medium",
    speed_feet: Math.round(r.speed / 1.5) * 5,
    attribute_boosts: boosts,
    attribute_flaw: null,
    languages: r.languages.split(",").map(s => s.trim()),
    traits: r.traits.map(t => t.split(":")[0].trim()),
    ...common(r.sourcePage),
    data: {
      attributeAdjustments: r.attributeAdjustments,
      abilityBonuses: r.abilityBonuses,
      size: r.size,
      speedMeters: r.speed,
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

console.log("Generated snapshots for dnd5e-scag successfully!");
