import fs from "node:fs";
import path from "node:path";
import {
  T20_SO_AVENTURAS_ITEMS,
  T20_SO_AVENTURAS_FEATS,
  T20_SO_AVENTURAS_SOURCE_BOOK
} from "../src/data/t20/t20SoAventurasData";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/t20/t20-so-aventuras");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "t20-so-aventuras";
const SOURCE_BOOK = T20_SO_AVENTURAS_SOURCE_BOOK;

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

// 1. Items -> item.json (7 items: weapons, armors, artifacts)
const items = T20_SO_AVENTURAS_ITEMS.map((item) => {
  let itemCategory = "equipment";
  if (item.category === "weapon") itemCategory = "weapon";
  else if (item.category === "armor") itemCategory = "armor";
  else if (item.category === "artifact") {
    if (item.itemType.toLowerCase().includes("armadura")) itemCategory = "armor";
    else if (item.itemType.toLowerCase().includes("espada") || item.itemType.toLowerCase().includes("arma")) itemCategory = "weapon";
    else itemCategory = "equipment";
  }

  const traits = ["t20", "so-aventuras", item.category];
  if (item.itemType) traits.push(item.itemType.toLowerCase());

  return {
    id: item.id,
    ...names(item.name, item.description),
    item_category: itemCategory,
    level: 0,
    price_gp: item.price,
    bulk: item.spaces ? (item.spaces >= 2 ? String(Math.floor(item.spaces)) : "L") : "—",
    hands: item.hands || 1,
    traits,
    ...common(item.sourcePage),
    data: {
      ...item,
      summaries: { "pt-BR": item.description },
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

// 2. Feats / Powers / Wedding Rites -> feat.json (32 feats)
const feats = T20_SO_AVENTURAS_FEATS.map((f) => ({
  id: f.id,
  class_id: null,
  ancestry_id: null,
  archetype_id: null,
  feat_type: "general",
  level: 1,
  ...names(f.name, f.description),
  prerequisites: f.prerequisites,
  action_cost: null,
  traits: ["t20", "so-aventuras", f.category],
  ...common(f.sourcePage),
  data: {
    ...f,
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

console.log(`Total generated for t20-so-aventuras: ${items.length + feats.length} records.`);
