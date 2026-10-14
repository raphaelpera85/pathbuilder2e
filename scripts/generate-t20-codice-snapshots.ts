import fs from "node:fs";
import path from "node:path";
import {
  T20_CODICE_POWERS,
  T20_CODICE_SOURCE_BOOK,
} from "../src/data/t20/t20CodicePowers";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/t20/t20-codice");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "t20-codice";
const SOURCE_BOOK = T20_CODICE_SOURCE_BOOK;

const CLASS_CATEGORIES: Record<string, string> = {
  Treinador: "treinador",
  Arcanista: "arcanista",
  Bárbaro: "barbaro",
  Bardo: "bardo",
  Bucaneiro: "bucaneiro",
  Caçador: "cacador",
  Cavaleiro: "cavaleiro",
  Clérigo: "clerigo",
  Druida: "druida",
  Frade: "frade",
  Guerreiro: "guerreiro",
  Inventor: "inventor",
  Ladino: "ladino",
  Lutador: "lutador",
  Nobre: "nobre",
  Paladino: "paladino",
};

const feats = T20_CODICE_POWERS.map((p) => {
  const classId = CLASS_CATEGORIES[p.category] || null;
  const isClass = classId !== null;

  return {
    id: p.id,
    class_id: classId,
    ancestry_id: null,
    archetype_id: null,
    feat_type: isClass ? "class" : "general",
    level: 1,
    name_pt: p.name,
    name_en: null,
    name_es: null,
    description_pt: p.description,
    description_en: null,
    description_es: null,
    prerequisites: p.prerequisites,
    action_cost: null,
    traits: [p.category.toLowerCase(), isClass ? "classe" : "geral"],
    rarity: "common",
    ruleset: RULESET,
    source_book: SOURCE_BOOK,
    source_page: 22,
    created_at: now,
    updated_at: now,
    system_id: "t20",
    data: {
      id: p.id,
      name: p.name,
      summary: p.summary,
      category: "poder",
      classIds: classId ? [classId] : [],
      powerGroup: p.category,
      sourcePage: 22,
      prerequisite: p.prerequisites,
      summaries: {
        "pt-BR": p.summary,
      },
      summaryOrigin: "structured_rules",
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(feats, null, 2) + "\n",
  "utf-8"
);

console.log(`feat=${feats.length}`);
console.log(`TOTAL=${feats.length}`);
