import fs from "node:fs";
import path from "node:path";
import { T20_ATLAS_ORIGINS, T20_ATLAS_ORIGINS_SOURCE_BOOK } from "../src/data/t20/t20AtlasOrigins";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/t20/t20-atlas");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "t20-atlas";

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
  source_book: T20_ATLAS_ORIGINS_SOURCE_BOOK,
  source_page: page,
  created_at: now,
  updated_at: now,
  system_id: "t20",
});

// Regional Origins -> background.json (66 origins)
const backgrounds = T20_ATLAS_ORIGINS.map((origin) => {
  const summary = `Região: ${origin.region}; Benefício: ${origin.benefit}; Itens: ${origin.items}.`;
  
  // trait from region slug
  const regionSlug = origin.region
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return {
    id: `t20.atlas.background.${origin.id}`,
    ...names(origin.name, summary),
    attribute_boosts: [],
    trained_skills: origin.trainedSkills,
    granted_feat: null,
    traits: ["origem_regional", regionSlug],
    ...common(origin.sourcePage),
    data: {
      kind: "origem_regional",
      region: origin.region,
      benefit: origin.benefit,
      items: origin.items,
      trainedSkills: origin.trainedSkills,
      flavorText: origin.description,
      summaries: {
        "pt-BR": summary,
      },
      summaryOrigin: "structured_rules",
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "background.json"),
  JSON.stringify(backgrounds, null, 2) + "\n",
  "utf-8"
);
console.log(`background=${backgrounds.length}`);
