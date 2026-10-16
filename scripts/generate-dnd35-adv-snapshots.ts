/**
 * Gera os snapshots do Livro Completo do Aventureiro (D&D 3.5, ed. BR) em
 * src/data/catalog/snapshots/dnd35/v35-adv/class.json a partir de
 * src/data/dnd35/dnd35Adv*.ts. Ruleset 'v35-adv', isolado do Livro do
 * Jogador ('v35') e do Livro Completo do Guerreiro ('v35-cg'). O Git é a
 * fonte do catálogo (sem Supabase).
 * Rodar: npx tsx scripts/generate-dnd35-adv-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CG_ADV_BATEDOR } from "../src/data/dnd35/dnd35AdvBatedor";
import { CG_ADV_LADRAO_ARCANO } from "../src/data/dnd35/dnd35AdvLadraoArcano";
import { CG_ADV_NINJA } from "../src/data/dnd35/dnd35AdvNinja";
import { CG_ADV_PRESTIGE } from "../src/data/dnd35/dnd35AdvPrestige";
import { DND35_ADV_FEATS } from "../src/data/dnd35/dnd35AdvFeats";
import { DND35_ADV_SPELLS } from "../src/data/dnd35/dnd35AdvSpells";
import {
  DND35_ADV_ALCHEMICAL_ITEMS,
  DND35_ADV_CAPSULES,
  DND35_ADV_INSTRUMENTS,
  DND35_ADV_MAGIC_RINGS,
  DND35_ADV_MAGIC_WEAPONS,
  DND35_ADV_SKILL_TOOLS,
  DND35_ADV_WEAPON_CAPSULES,
  DND35_ADV_WEAPONS,
  DND35_ADV_WONDROUS_ITEMS,
} from "../src/data/dnd35/dnd35AdvEquipment";

const BOOK = "D&D 3.5 — Livro Completo do Aventureiro";
const RULESET = "v35-adv";
const STAMP = "2026-10-13T12:00:00.000+00:00";
const common = (page: number) => ({ rarity: "common", ruleset: RULESET, source_book: BOOK, source_page: page, created_at: STAMP, updated_at: STAMP, system_id: "dnd35" });
const names = (name: string, desc: string) => ({ name_pt: name, name_en: null, name_es: null, description_pt: desc, description_en: null, description_es: null });
const base = { key_attributes: [] as string[], perception_rank: "T", fortitude_rank: "T", reflex_rank: "T", will_rank: "T", class_dc_stat: null };

const baseClasses = [CG_ADV_BATEDOR, CG_ADV_LADRAO_ARCANO, CG_ADV_NINJA];

const classes = [
  ...baseClasses.map((c) => ({
    id: `dnd35.adv.class.${c.id}`,
    ...names(c.name, c.description),
    hp_per_level: c.hitDie, ...base, traits: ["base"], ...common(c.page), data: c,
  })),
  ...CG_ADV_PRESTIGE.map((c) => ({
    id: `dnd35.adv.prestige.${c.id}`,
    ...names(c.name, [c.requirements.alignment, ...c.requirements.skills, ...c.requirements.feats, ...c.requirements.special].filter(Boolean).join("; ")),
    hp_per_level: c.hitDie, ...base, traits: ["prestige"], ...common(c.page), data: c,
  })),
];

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "class.json"), `${JSON.stringify(classes, null, 2)}\n`, "utf8");
console.log(`class=${classes.length}`);

const spells = DND35_ADV_SPELLS.map((s) => ({
  id: `dnd35.adv.spell.${s.id}`,
  ...names(s.name, s.description),
  rank: Math.min(...s.classLevels.map((cl) => cl.level)),
  is_cantrip: false,
  is_focus: false,
  traditions: s.classLevels.map((cl) => `${cl.className} ${cl.level}`),
  cast_actions: s.castingTime,
  range: s.range,
  targets: s.target ?? s.area ?? s.effect ?? null,
  duration: s.duration,
  defense: s.savingThrow,
  traits: [s.school],
  ...common(s.page),
  data: s,
}));
writeFileSync(join(dir, "spell.json"), `${JSON.stringify(spells, null, 2)}\n`, "utf8");
console.log(`spell=${spells.length}`);

const feats = DND35_ADV_FEATS.map((f) => ({
  id: `dnd35.adv.feat.${f.id}`,
  ...names(f.name, f.benefit),
  feat_type: f.category === "geral" ? "general" : f.category, level: 1,
  prerequisites: f.prerequisites, ...common(f.page), data: f,
}));
writeFileSync(join(dir, "feat.json"), `${JSON.stringify(feats, null, 2)}\n`, "utf8");
console.log(`feat=${feats.length}`);

const weaponGroupMap: Record<string, string> = { "Leve — Corpo a Corpo": "leve", "Uma Mão — Corpo a Corpo": "uma_mao", "Duas Mãos — Corpo a Corpo": "duas_maos" };
const gpFromCost = (s: string) => { const m = /^(\d+)\s*PO$/.exec(s); return m ? Number(m[1]) : null; };
const weapons = DND35_ADV_WEAPONS.map((w) => ({
  id: `dnd35.adv.weapon.${w.id}`, item_id: null,
  ...names(w.name, w.description),
  weapon_category: "exotica", weapon_group: weaponGroupMap[w.group] ?? "leve",
  damage_dice: w.damageMedium, damage_type: w.type, range_feet: null, reload: null,
  hands: w.group === "Duas Mãos — Corpo a Corpo" ? "2" : "1", bulk: null,
  price_gp: gpFromCost(w.cost), ...common(w.page), data: w,
}));
writeFileSync(join(dir, "weapon.json"), `${JSON.stringify(weapons, null, 2)}\n`, "utf8");
console.log(`weapon=${weapons.length}`);

const items = [
  ...DND35_ADV_ALCHEMICAL_ITEMS.map((item) => ({
    id: `dnd35.adv.item.${item.id}`,
    ...names(item.name, item.description),
    item_category: "alquimico",
    level: 0,
    price_gp: gpFromCost(item.cost),
    bulk: null,
    hands: null,
    traits: ["alquimico"],
    ...common(118),
    data: item,
  })),
  ...DND35_ADV_CAPSULES.map((c) => ({
    id: `dnd35.adv.item.${c.id}`,
    ...names(c.name, c.description),
    item_category: "capsula",
    level: 0,
    price_gp: gpFromCost(c.cost),
    bulk: null,
    hands: null,
    traits: ["capsula"],
    ...common(120),
    data: c,
  })),
  ...DND35_ADV_WEAPON_CAPSULES.map((c) => ({
    id: `dnd35.adv.item.${c.id}`,
    ...names(c.name, c.description),
    item_category: "capsula_para_arma",
    level: 0,
    price_gp: gpFromCost(c.cost),
    bulk: null,
    hands: null,
    traits: ["capsula", "para_arma"],
    ...common(122),
    data: c,
  })),
  ...DND35_ADV_SKILL_TOOLS.map((t) => ({
    id: `dnd35.adv.item.${t.id}`,
    ...names(t.name, t.description),
    item_category: "ferramenta",
    level: 0,
    price_gp: gpFromCost(t.cost),
    bulk: null,
    hands: null,
    traits: ["ferramenta"],
    ...common(122),
    data: t,
  })),
  ...DND35_ADV_INSTRUMENTS.map((i) => ({
    id: `dnd35.adv.item.${i.id}`,
    ...names(i.name, `${i.description} ${i.bardMusicNote}`),
    item_category: "instrumento",
    level: 0,
    price_gp: null,
    bulk: null,
    hands: null,
    traits: ["instrumento", i.category],
    ...common(124),
    data: i,
  })),
  ...DND35_ADV_MAGIC_WEAPONS.map((w) => ({
    id: `dnd35.adv.item.${w.id}`,
    ...names(w.name, `${w.description} (Base: ${w.baseWeapon}; ${w.school}; NC ${w.casterLevel})`),
    item_category: "arma_magica",
    level: 0,
    price_gp: gpFromCost(w.marketPrice),
    bulk: null,
    hands: null,
    traits: ["arma_magica"],
    ...common(127),
    data: w,
  })),
  ...DND35_ADV_MAGIC_RINGS.map((r) => ({
    id: `dnd35.adv.item.${r.id}`,
    ...names(r.name, `${r.description} (${r.school}; NC ${r.casterLevel})`),
    item_category: "anel",
    level: 0,
    price_gp: gpFromCost(r.marketPrice),
    bulk: null,
    hands: null,
    traits: ["anel"],
    ...common(130),
    data: r,
  })),
  ...DND35_ADV_WONDROUS_ITEMS.map((w) => ({
    id: `dnd35.adv.item.${w.id}`,
    ...names(w.name, `${w.description} (${w.school}; NC ${w.casterLevel})`),
    item_category: "maravilhoso",
    level: 0,
    price_gp: gpFromCost(w.marketPrice.replace(/\./g, "")),
    bulk: null,
    hands: null,
    traits: ["maravilhoso", w.tier],
    ...common(132),
    data: w,
  })),
];
writeFileSync(join(dir, "item.json"), `${JSON.stringify(items, null, 2)}\n`, "utf8");
console.log(`item=${items.length}`);


