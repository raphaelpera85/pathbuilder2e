import fs from "node:fs";
import path from "node:path";
import {
  DND5E_COA_ITEMS,
  DND5E_COA_PATRONS,
  DND5E_COA_CORRUPTION,
} from "../src/data/dnd5e/dnd5eCoaData";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd5e/dnd5e-coa");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "dnd5e-coa";
const SOURCE_BOOK = "Chains of Asmodeus (D&D 5e)";

const names = (name: string, englishName: string | null, desc: string | null) => ({
  name_pt: name,
  name_en: englishName,
  name_es: null,
  description_pt: desc,
  description_en: null,
  description_es: null,
});

const common = (page: number, rarity: string = "rare") => ({
  rarity,
  ruleset: RULESET,
  source_book: SOURCE_BOOK,
  source_page: page,
  created_at: now,
  updated_at: now,
  system_id: "dnd5e",
});

// 1. Items -> item.json (28 items/weapons/artifacts)
const items = DND5E_COA_ITEMS.map((item) => {
  return {
    id: item.id,
    ...names(item.name, item.name, item.description),
    category: item.type,
    price_gp: null,
    weight_lb: null,
    traits: [item.rarity, item.type, ...(item.attunement ? ["attunement"] : [])],
    ...common(267, item.rarity),
    data: {
      typeLine: item.typeLine,
      category: item.type,
      rarity: item.rarity,
      requiresAttunement: item.attunement,
      summaries: { "en": item.typeLine },
      summaryOrigin: "structured_rules",
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "item.json"),
  JSON.stringify(items, null, 2) + "\n",
  "utf-8"
);
console.log(`item=${items.length}`);

// 2. Feats / Patrons & Corruption -> feat.json (3 patrons + 4 corruption stages = 7 feats)
const patronFeats = DND5E_COA_PATRONS.map((p) => {
  const perksDesc = p.perks.map((pk) => `**${pk.name}**: ${pk.description}`).join("\n\n");
  const fullDesc = `${p.description}\n\nAlignment: ${p.alignment}\nContacts: ${p.contacts.join(", ")}\n\n${perksDesc}`;

  return {
    id: p.id,
    ...names(p.name, p.name, fullDesc),
    feat_type: "general",
    level: 1,
    prerequisites: `Patrono de Grupo (${p.alignment})`,
    traits: ["group-patron", p.alignment.toLowerCase()],
    ...common(22, "uncommon"),
    data: {
      category: "group-patron",
      alignment: p.alignment,
      contacts: p.contacts,
      perks: p.perks,
      summaries: { "pt-BR": p.description },
      summaryOrigin: "structured_rules",
    },
  };
});

const corruptionFeats = DND5E_COA_CORRUPTION.map((c) => {
  const effectsDesc = c.effects.map((ef) => `- ${ef}`).join("\n");
  const fullDesc = `${c.description}\n\n**Resistência**: ${c.dcText}\n\n**Efeitos Mecânicos**:\n${effectsDesc}`;

  return {
    id: c.id,
    ...names(c.name, c.name, fullDesc),
    feat_type: "general",
    level: c.stage,
    prerequisites: `Estágio ${c.stage} de Corrupção Infernal`,
    traits: ["infernal-corruption", "fiend"],
    ...common(272, "rare"),
    data: {
      category: "infernal-corruption",
      stage: c.stage,
      dcText: c.dcText,
      effects: c.effects,
      summaries: { "pt-BR": c.description },
      summaryOrigin: "structured_rules",
    },
  };
});

const allFeats = [...patronFeats, ...corruptionFeats];

fs.writeFileSync(
  path.join(outputDir, "feat.json"),
  JSON.stringify(allFeats, null, 2) + "\n",
  "utf-8"
);
console.log(`feat=${allFeats.length}`);

const total = items.length + allFeats.length;
console.log(`TOTAL=${total}`);
