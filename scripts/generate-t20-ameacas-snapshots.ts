import fs from "node:fs";
import path from "node:path";
import { T20_AMEACAS_RACE_RULES } from "../src/data/t20/t20AmeacasRaces";
import { T20_AMEACAS_EQUIPMENT } from "../src/data/t20/t20AmeacasEquipment";
import { T20_AMEACAS_SPELLS } from "../src/data/t20/t20AmeacasSpells";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/t20/t20-ameacas");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "t20-ameacas";
const SOURCE_BOOK = "Tormenta20 — Ameaças de Arton";

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

// 1. Ancestry -> ancestry.json (29 races)
const ancestries = T20_AMEACAS_RACE_RULES.map((r) => {
  const boosts: string[] = [];
  const flaws: string[] = [];
  for (const [attr, val] of Object.entries(r.attributeAdjustments)) {
    if (val && val > 0) boosts.push(attr);
    if (val && val < 0) flaws.push(attr);
  }

  const desc = `${r.abilityBonuses}; tamanho ${r.size.toLowerCase()}, deslocamento ${r.speed}m; traços: ${r.traits.join(", ")}.`;

  return {
    id: `t20.ameacas.ancestry.${r.id}`,
    ...names(r.name, desc),
    hp_base: 8,
    size: r.size === "Grande" ? "Large" : r.size === "Pequeno" ? "Small" : "Medium",
    speed_feet: Math.round(r.speed / 1.5) * 5,
    attribute_boosts: boosts,
    attribute_flaw: flaws.length > 0 ? flaws[0] : null,
    languages: [],
    traits: r.traits.map((t) => t.split(":")[0].trim()),
    ...common(r.sourcePage),
    data: {
      attributeAdjustments: r.attributeAdjustments,
      abilityBonuses: r.abilityBonuses,
      size: r.size,
      speedMeters: r.speed,
      traits: r.traits,
      abilityChoices: r.abilityChoices || null,
      skillChoices: r.skillChoices || 0,
      skillOrFeatChoice: r.skillOrFeatChoice || null,
      raceChoices: r.raceChoices || [],
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

// 2. Equipment -> item.json (all 45 items)
const items = T20_AMEACAS_EQUIPMENT.map((eq) => {
  return {
    id: eq.id,
    ...names(eq.name, eq.summary),
    item_category: eq.category === "arma" ? "weapon" : eq.category === "armadura" ? "armor" : "equipment",
    level: 0,
    price_gp: 0,
    bulk: eq.weight ? (eq.weight >= 2 ? String(Math.floor(eq.weight)) : "L") : "—",
    hands: eq.weaponProperties?.includes("duas_maos") ? 2 : 1,
    traits: eq.weaponProperties || [],
    ...common(eq.sourcePage),
    data: {
      ...eq,
      summaries: { "pt-BR": eq.summary },
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

// 3. Spells -> spell.json (8 spells)
const spells = T20_AMEACAS_SPELLS.map((sp) => {
  return {
    id: sp.id,
    ...names(sp.name, sp.summary),
    rank: sp.spellLevel || 1,
    is_cantrip: false,
    is_focus: false,
    traditions: sp.tradition ? [sp.tradition] : [],
    cast_actions: sp.castingTime || "padrao",
    range: sp.range || null,
    targets: sp.target || null,
    duration: sp.duration || null,
    defense: sp.savingThrow || null,
    traits: [sp.school || "universal"],
    ...common(sp.sourcePage),
    data: {
      ...sp,
      summaries: { "pt-BR": sp.summary },
      summaryOrigin: "structured_rules"
    }
  };
});

fs.writeFileSync(
  path.join(outputDir, "spell.json"),
  JSON.stringify(spells, null, 2) + "\n",
  "utf-8"
);
console.log(`spell=${spells.length}`);

console.log("Generated snapshots for t20-ameacas successfully!");
