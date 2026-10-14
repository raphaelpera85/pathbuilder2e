import fs from "node:fs";
import path from "node:path";
import {
  DND5E_POTA_RACES,
  DND5E_POTA_SPELLS,
  DND5E_POTA_ITEMS,
  DND5E_POTA_SOURCE_BOOK,
} from "../src/data/dnd5e/dnd5ePotaData";

const outputDir = path.resolve(process.cwd(), "src/data/catalog/snapshots/dnd5e/dnd5e-pota");
fs.mkdirSync(outputDir, { recursive: true });

const now = new Date().toISOString();
const RULESET = "dnd5e-pota";
const SOURCE_BOOK = DND5E_POTA_SOURCE_BOOK;

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

// 1. Ancestries -> ancestry.json (5 races: Base + 4 Subraces)
const ancestries = DND5E_POTA_RACES.map((r) => {
  const desc = `${r.abilityBonuses}; tamanho ${r.size}, deslocamento ${r.speed}m${r.swimSpeed ? ` (natação ${r.swimSpeed}m)` : ""}; traços: ${r.traits.map((t) => t.split(":")[0]).join(", ")}.`;

  return {
    id: r.id,
    ...names(r.name, r.englishName, desc),
    hp_base: 8,
    size: "Medium",
    speed_feet: Math.round(r.speed / 1.5) * 5,
    attribute_boosts: [],
    attribute_flaw: null,
    languages: ["Comum", "Primordial"],
    traits: r.traits.map((t) => t.split(":")[0].trim()),
    ...common(r.sourcePage),
    data: {
      abilityBonuses: r.abilityBonuses,
      size: r.size,
      speedMeters: r.speed,
      swimSpeedMeters: r.swimSpeed,
      traits: r.traits,
      summaries: { "pt-BR": desc },
      summaryOrigin: "structured_rules",
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "ancestry.json"),
  JSON.stringify(ancestries, null, 2) + "\n",
  "utf-8"
);
console.log(`ancestry=${ancestries.length}`);

// 2. Spells -> spell.json (43 spells)
const spells = DND5E_POTA_SPELLS.map((s) => {
  const desc = s.higherLevels ? `${s.description}\n\n${s.higherLevels}` : s.description;

  return {
    id: s.id,
    ...names(s.name, s.englishName, desc),
    level: s.level,
    school: s.school,
    casting_time: s.castingTime,
    range: s.range,
    components: s.components,
    duration: s.duration,
    traits: [s.school],
    ...common(s.sourcePage),
    data: {
      level: s.level,
      school: s.school,
      castingTime: s.castingTime,
      range: s.range,
      components: s.components,
      duration: s.duration,
      classIds: s.classIds,
      higherLevels: s.higherLevels,
      summary: s.summary,
      summaries: { "pt-BR": s.summary },
      summaryOrigin: "structured_rules",
    },
  };
});

fs.writeFileSync(
  path.join(outputDir, "spell.json"),
  JSON.stringify(spells, null, 2) + "\n",
  "utf-8"
);
console.log(`spell=${spells.length}`);

// 3. Items -> item.json (16 items/weapons)
const items = DND5E_POTA_ITEMS.map((item) => {
  return {
    id: item.id,
    ...names(item.name, item.englishName, item.description),
    category: item.category,
    price_gp: null,
    weight_lb: null,
    traits: [item.rarity, item.category],
    rarity: item.rarity,
    ruleset: RULESET,
    source_book: SOURCE_BOOK,
    source_page: item.sourcePage,
    created_at: now,
    updated_at: now,
    system_id: "dnd5e",
    data: {
      category: item.category,
      rarity: item.rarity,
      requiresAttunement: item.requiresAttunement,
      attunementDetails: item.attunementDetails,
      weaponType: item.weaponType,
      damage: item.damage,
      damageType: item.damageType,
      mechanicsSummary: item.mechanicsSummary,
      summaries: { "pt-BR": item.mechanicsSummary },
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

const total = ancestries.length + spells.length + items.length;
console.log(`TOTAL=${total}`);
