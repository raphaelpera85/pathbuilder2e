/**
 * Gera os snapshots de D&D — Livro dos Níveis Épicos (Epic Level Handbook,
 * ed. BR) em src/data/catalog/snapshots/dnd35/v35-epic/{feat,spell}.json a
 * partir de src/data/dnd35/dnd35Epic{Feats,Spells}.ts. Ruleset 'v35-epic',
 * isolado de todos os demais rulesets de D&D 3.5. Capítulo 1 (Talentos
 * Épicos) 100% transcrito (154 talentos). Capítulo 2 (Magias Épicas) em
 * andamento — ver cabeçalho de dnd35EpicSpells.ts para o gap conhecido.
 * O Git é a fonte do catálogo (sem Supabase).
 * Rodar: npx tsx scripts/generate-dnd35-epic-snapshots.ts && npm run catalog:manifest
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DND35_EPIC_FEATS } from "../src/data/dnd35/dnd35EpicFeats";
import { DND35_EPIC_SPELLS } from "../src/data/dnd35/dnd35EpicSpells";
import { DND35_EPIC_ITEMS } from "../src/data/dnd35/dnd35EpicItems";

const BOOK = "D&D — Livro dos Níveis Épicos";
const RULESET = "v35-epic";
const STAMP = "2026-10-16T14:00:00.000+00:00";
const common = (page: number) => ({ rarity: "common", ruleset: RULESET, source_book: BOOK, source_page: page, created_at: STAMP, updated_at: STAMP, system_id: "dnd35" });
const names = (name: string, desc: string) => ({ name_pt: name, name_en: null, name_es: null, description_pt: desc, description_en: null, description_es: null });

const dir = join(process.cwd(), "src", "data", "catalog", "snapshots", "dnd35", RULESET);
mkdirSync(dir, { recursive: true });

const featTypeMap: Record<string, string> = { epico: "epic", metamagico_epico: "epic_metamagic", divino_epico: "epic_divine", selvagem_epico: "epic_wild", criacao_item_epico: "epic_item_creation" };
const feats = DND35_EPIC_FEATS.map((f) => ({
  id: `dnd35.epic.feat.${f.id}`,
  ...names(f.name, f.benefit),
  feat_type: featTypeMap[f.category] ?? "epic", level: 21,
  prerequisites: f.prerequisites, ...common(f.page), data: f,
}));
writeFileSync(join(dir, "feat.json"), `${JSON.stringify(feats, null, 2)}\n`, "utf8");

const spells = DND35_EPIC_SPELLS.map((s) => ({
  id: `dnd35.epic.epic-spell.${s.id}`,
  ...names(s.name, s.description),
  rank: 10, is_cantrip: false, is_focus: false, traditions: ["epic"],
  cast_actions: s.castingTime, range: s.range, targets: s.target ?? s.area ?? s.effect ?? null, duration: s.duration, defense: s.savingThrow, traits: [s.school, "epic"],
  ...common(s.page), data: s,
}));
writeFileSync(join(dir, "spell.json"), `${JSON.stringify(spells, null, 2)}\n`, "utf8");

const items = DND35_EPIC_ITEMS.map((i) => ({
  id: `dnd35.epic.magic-item.${i.id}`,
  ...names(i.name, i.description),
  item_category: "magic-item", level: 0,
  price_gp: i.marketPrice ? Number(i.marketPrice.replace(/[^0-9]/g, "")) || null : null,
  bulk: null, hands: null, traits: [i.category],
  ...common(i.page), data: i,
}));
writeFileSync(join(dir, "item.json"), `${JSON.stringify(items, null, 2)}\n`, "utf8");

console.log(`feat=${feats.length} spell=${spells.length} item=${items.length}`);
