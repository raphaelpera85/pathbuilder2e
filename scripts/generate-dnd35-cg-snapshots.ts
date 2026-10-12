/**
 * Gera os snapshots do Livro Completo do Guerreiro (D&D 3.5, ed. BR) em
 * src/data/catalog/snapshots/dnd35/v35-cg/class.json a partir de src/data/dnd35/dnd35Cg*.ts.
 * Ruleset 'v35-cg', isolado do Livro do Jogador ('v35'). O Git é a fonte do catálogo (sem Supabase).
 * Rodar: npx tsx scripts/generate-dnd35-cg-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CG_BASE_CLASSES } from "../src/data/dnd35/dnd35CgClasses";
import { CG_SAMURAI } from "../src/data/dnd35/dnd35CgSamurai";
import { CG_CLASS_VARIANTS } from "../src/data/dnd35/dnd35CgVariants";
import { CG_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35CgPrestige";

const BOOK = "D&D 3.5 — O Livro Completo do Guerreiro";
const RULESET = "v35-cg";
const STAMP = "2026-10-12T12:00:00.000+00:00";
const pages: Record<string, number> = { "cg-duelista": 5, "cg-lamina-maldita": 7, "cg-samurai": 10, "cg-paladino-opcional": 13, "cg-ranger-opcional": 13 };
const common = (page: number) => ({ rarity: "common", ruleset: RULESET, source_book: BOOK, source_page: page, created_at: STAMP, updated_at: STAMP, system_id: "dnd35" });
const names = (name: string, desc: string) => ({ name_pt: name, name_en: null, name_es: null, description_pt: desc, description_en: null, description_es: null });
const base = { key_attributes: [] as string[], perception_rank: "T", fortitude_rank: "T", reflex_rank: "T", will_rank: "T", class_dc_stat: null };

const classes = [
  ...[...CG_BASE_CLASSES, CG_SAMURAI].map((c) => ({
    id: `dnd35.cg.class.${c.id}`,
    ...names(c.name, `Tendência: ${c.alignment}. Dado de Vida d${c.hitDie}. Perícias de classe: ${c.classSkills.join(", ")}.`),
    hp_per_level: c.hitDie, ...base, traits: ["base"], ...common(pages[c.id]), data: c,
  })),
  ...CG_PRESTIGE_CLASSES.map((c) => ({
    id: `dnd35.cg.prestige.${c.id}`,
    ...names(c.name, [`BBA ${c.requirements.bab}`, ...c.requirements.skills, ...c.requirements.feats, ...c.requirements.other].join("; ")),
    hp_per_level: c.hitDie, ...base, traits: ["prestige"], ...common(c.page), data: c,
  })),
  ...CG_CLASS_VARIANTS.map((v) => ({
    id: `dnd35.cg.class.${v.id}`,
    ...names(v.name, `${v.intro} ${v.changes.map((c) => `${c.name}: ${c.text}`).join(" ")}`),
    hp_per_level: v.baseClass === "Paladino" ? 10 : 8, ...base, traits: ["variant", v.baseClass.toLowerCase()], ...common(pages[v.id]), data: v,
  })),
];

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "class.json"), `${JSON.stringify(classes, null, 2)}\n`, "utf8");
console.log(`class=${classes.length}`);
