/**
 * Gera os snapshots do suplemento Punhos e Espadas (D&D 3.5, ed. BR) em
 * src/data/catalog/snapshots/dnd35/v35-pe/ a partir de
 * src/data/dnd35/dnd35Pe*.ts. Ruleset 'v35-pe'. O Git é a única
 * fonte do catálogo (sem Supabase).
 * Rodar: npx tsx scripts/generate-dnd35-pe-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DND35_PE_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35PePrestige";
import { DND35_PE_FEATS } from "../src/data/dnd35/dnd35PeFeats";
import { DND35_PE_WEAPONS } from "../src/data/dnd35/dnd35PeEquipment";

const BOOK = "D&D 3.5 — Punhos e Espadas";
const RULESET = "v35-pe";
const STAMP = "2026-10-14T12:00:00.000+00:00";
const common = (page: number) => ({
  rarity: "common",
  ruleset: RULESET,
  source_book: BOOK,
  source_page: page,
  created_at: STAMP,
  updated_at: STAMP,
  system_id: "dnd35",
});
const names = (name: string, desc: string) => ({
  name_pt: name,
  name_en: null,
  name_es: null,
  description_pt: desc,
  description_en: null,
  description_es: null,
});
const base = {
  key_attributes: [] as string[],
  perception_rank: "T",
  fortitude_rank: "T",
  reflex_rank: "T",
  will_rank: "T",
  class_dc_stat: null,
};

// 1. Classes de Prestígio -> class.json
const classes = DND35_PE_PRESTIGE_CLASSES.map((c) => ({
  id: `dnd35.pe.prestige.${c.id}`,
  ...names(
    c.name,
    [
      c.requirements.bab ? `BBA ${c.requirements.bab}` : "",
      ...(c.requirements.skills || []),
      ...(c.requirements.feats || []),
      ...(c.requirements.special || []),
    ]
      .filter(Boolean)
      .join("; ")
  ),
  hp_per_level: c.hitDie,
  ...base,
  traits: ["prestige"],
  ...common(c.page),
  data: c,
}));

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "class.json"), `${JSON.stringify(classes, null, 2)}\n`, "utf8");
console.log(`class=${classes.length}`);

// 2. Talentos -> feat.json
const feats = DND35_PE_FEATS.map((f) => ({
  id: `dnd35.pe.feat.${f.id}`,
  ...names(f.name, f.benefit),
  feat_type: f.fighterBonus ? "fighter" : "general",
  level: 1,
  prerequisites: f.prerequisites,
  ...common(f.page),
  data: f,
}));
writeFileSync(join(dir, "feat.json"), `${JSON.stringify(feats, null, 2)}\n`, "utf8");
console.log(`feat=${feats.length}`);

// 3. Armas e Equipamentos -> weapon.json
const weaponGroupMap: Record<string, string> = {
  "Leve — Corpo a Corpo": "leve",
  "Uma Mão — Corpo a Corpo": "uma_mao",
  "Duas Mãos — Corpo a Corpo": "duas_maos",
  "Ataque à Distância": "distancia",
  "Munição": "municao",
};

const gpFromCost = (s: string) => {
  const m = /^(\d+)\s*PO$/.exec(s);
  return m ? Number(m[1]) : null;
};

const weapons = DND35_PE_WEAPONS.map((w) => ({
  id: `dnd35.pe.weapon.${w.id}`,
  item_id: null,
  ...names(w.name, w.description),
  weapon_category: "exotica",
  weapon_group: weaponGroupMap[w.group] ?? "leve",
  damage_dice: w.damageMedium,
  damage_die: w.damageMedium,
  damage_type: w.type.toLowerCase(),
  hands: w.group.includes("Duas Mãos") ? "2" : "1",
  price_gp: gpFromCost(w.cost),
  traits: ["exotica", weaponGroupMap[w.group] ?? "leve"],
  ...common(71),
  data: w,
}));
writeFileSync(join(dir, "weapon.json"), `${JSON.stringify(weapons, null, 2)}\n`, "utf8");
console.log(`weapon=${weapons.length}`);

console.log("Snapshots Punhos e Espadas gerados com sucesso!");
