import fs from "node:fs";
import path from "node:path";
import { DND5E_MTOF_RACES, DND5E_MTOF_FEATS, DND5E_MTOF_SOURCE_BOOK } from "../src/data/dnd5e/dnd5eMtofRaces";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd5e/dnd5e-mtof");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "dnd5e-mtof";
const SOURCE_BOOK = DND5E_MTOF_SOURCE_BOOK;

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

// 1. Ancestries / Subraces -> ancestry.json (15 subraces)
const ancestries = DND5E_MTOF_RACES.map((r) => {
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

// 2. Feats -> feat.json (1 racial feat)
const feats = DND5E_MTOF_FEATS.map((f) => ({
  id: f.id,
  class_id: null,
  ancestry_id: "dnd5e.mtof.ancestry.svirfneblin",
  archetype_id: null,
  feat_type: "ancestry",
  level: 4,
  ...names(f.name, f.englishName, f.description),
  prerequisites: [f.prerequisite],
  action_cost: null,
  traits: ["Gnomo", "Svirfneblin", "Magia"],
  ...common(f.sourcePage),
  data: {
    id: f.id,
    name: f.name,
    prerequisite: f.prerequisite,
    spells: f.spells,
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

console.log("Generated snapshots for dnd5e-mtof successfully!");
