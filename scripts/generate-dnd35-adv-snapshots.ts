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
import { DND35_ADV_ITEMS, DND35_ADV_WEAPONS } from "../src/data/dnd35/dnd35AdvEquipment";
import { DND35_ADV_SPELLS } from "../src/data/dnd35/dnd35AdvSpells";

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

const levelNum = (s: string) => {
  const nums = [...s.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  return nums.length ? Math.min(...nums) : null;
};
const spells = DND35_ADV_SPELLS.map((s) => ({
  id: `dnd35.adv.spell.${s.id}`,
  ...names(s.name, s.description),
  rank: levelNum(s.level),
  is_cantrip: false,
  is_focus: false,
  traditions: [s.level],
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

const items = DND35_ADV_ITEMS.map((item) => ({
  id: `dnd35.adv.item.${item.id}`,
  ...names(item.name, item.description),
  item_category: item.category,
  level: 0,
  price_gp: gpFromCost(item.cost),
  bulk: null,
  hands: null,
  traits: [item.category],
  ...common(118),
  data: item,
}));
writeFileSync(join(dir, "item.json"), `${JSON.stringify(items, null, 2)}\n`, "utf8");
console.log(`item=${items.length}`);


