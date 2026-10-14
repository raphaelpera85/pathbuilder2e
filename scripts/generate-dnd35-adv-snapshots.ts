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
