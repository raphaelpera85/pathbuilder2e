/**
 * Sincroniza os catálogos dos suplementos D&D 3.5 (Champions of Valor e Defensores da Fé)
 * diretamente no Supabase usando a chave de serviço (SUPABASE_SERVICE_ROLE_KEY).
 *
 * Rodar: npx tsx scripts/sync-dnd35-supplements-to-supabase.ts
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

import { DND35_COV_FEATS } from "../src/data/dnd35/dnd35CovFeats";
import { DND35_COV_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35CovPrestige";
import { DND35_COV_SPELLS } from "../src/data/dnd35/dnd35CovSpells";
import { DND35_COV_MAGIC_ITEMS } from "../src/data/dnd35/dnd35CovMagicItems";
import { DND35_COV_SUBSTITUTIONS } from "../src/data/dnd35/dnd35CovSubstitutions";

import { DEFENSORES_FEATS } from "../src/data/dnd35/dnd35DefensoresFeats";
import { DEFENSORES_PRESTIGE_CLASSES } from "../src/data/dnd35/dnd35DefensoresPrestige";
import { DEFENSORES_PRESTIGE_DOMAINS } from "../src/data/dnd35/dnd35DefensoresDomains";
import { DEFENSORES_SPELLS } from "../src/data/dnd35/dnd35DefensoresSpells";

// Carregar variáveis de .env
const envPath = resolve(process.cwd(), ".env");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split(/\r?\n/)) {
    const idx = line.indexOf("=");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {
  // Ignora se não existir .env
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configuradas.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const gp = (s: string | undefined) => (s && /^[\d,]+ gp$/.test(s) ? Number(s.replace(/[ ,gp]/g, "")) : null);

function parseSpellRank(levelStr: string): number {
  const match = levelStr.match(/\b(\d+)\b/);
  return match ? parseInt(match[1], 10) : 1;
}

async function syncCov() {
  console.log("=== Sincronizando Champions of Valor (v35-cov) ===");
  const BOOK = "D&D 3.5 — Champions of Valor";
  const RULESET = "v35-cov";

  // 1. Classes de prestígio
  const classes = DND35_COV_PRESTIGE_CLASSES.map((c) => ({
    id: `dnd35.cov.prestige.${c.id}`,
    name_pt: c.name,
    name_en: c.name,
    description_pt: c.requirements.join(" "),
    hp_per_level: c.hitDie,
    key_attributes: [],
    traits: ["prestige"],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 106,
    system_id: "dnd35",
    data: c,
  }));
  const { error: errClasses } = await supabase.from("catalog_classes").upsert(classes, { onConflict: "id" });
  if (errClasses) throw new Error(`catalog_classes (CoV): ${errClasses.message}`);
  console.log(`✓ catalog_classes: ${classes.length} linhas upserted.`);

  // 2. Talentos
  const feats = DND35_COV_FEATS.map((f) => ({
    id: `dnd35.cov.feat.${f.id}`,
    feat_type: f.type,
    level: 1,
    name_pt: f.name,
    name_en: f.name,
    description_pt: f.benefit,
    prerequisites: f.prerequisite,
    traits: [f.type.toLowerCase()],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 27,
    system_id: "dnd35",
    data: f,
  }));
  const { error: errFeats } = await supabase.from("catalog_feats").upsert(feats, { onConflict: "id" });
  if (errFeats) throw new Error(`catalog_feats (CoV): ${errFeats.message}`);
  console.log(`✓ catalog_feats: ${feats.length} linhas upserted.`);

  // 3. Magias
  const spells = DND35_COV_SPELLS.map((s) => ({
    id: `dnd35.cov.spell.${s.id}`,
    name_pt: s.name,
    name_en: s.name,
    description_pt: s.description,
    rank: Math.min(...Object.values(s.levels)),
    is_cantrip: false,
    is_focus: false,
    traditions: Object.keys(s.levels),
    cast_actions: s.castingTime ?? null,
    range: s.range ?? null,
    targets: s.target ?? null,
    duration: s.duration ?? null,
    defense: s.savingThrow ?? null,
    traits: [s.school, ...s.descriptors],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 52,
    system_id: "dnd35",
    data: s,
  }));
  const { error: errSpells } = await supabase.from("catalog_spells").upsert(spells, { onConflict: "id" });
  if (errSpells) throw new Error(`catalog_spells (CoV): ${errSpells.message}`);
  console.log(`✓ catalog_spells: ${spells.length} linhas upserted.`);

  // 4. Níveis de Substituição + Itens Mágicos -> catalog_items
  const items = [
    ...DND35_COV_SUBSTITUTIONS.map((s) => ({
      id: `dnd35.cov.substitution.${s.id}`,
      name_pt: s.name,
      name_en: s.name,
      description_pt: `${s.flavor} ${s.requirements}`,
      item_category: "substitution",
      level: 1,
      price_gp: null,
      traits: [s.baseClass],
      ruleset: RULESET,
      source_book: BOOK,
      source_page: 34,
      system_id: "dnd35",
      data: s,
    })),
    ...DND35_COV_MAGIC_ITEMS.map((m) => ({
      id: `dnd35.cov.magic-item.${m.id}`,
      name_pt: m.name,
      name_en: m.name,
      description_pt: m.description || m.intro,
      item_category: "magic-item",
      level: 0,
      price_gp: gp(m.price),
      traits: [],
      ruleset: RULESET,
      source_book: BOOK,
      source_page: 60,
      system_id: "dnd35",
      data: m,
    })),
  ];
  const { error: errItems } = await supabase.from("catalog_items").upsert(items, { onConflict: "id" });
  if (errItems) throw new Error(`catalog_items (CoV): ${errItems.message}`);
  console.log(`✓ catalog_items: ${items.length} linhas upserted.`);
}

async function syncDefensores() {
  console.log("=== Sincronizando Defensores da Fé (v35-defensores) ===");
  const BOOK = "D&D 3.5 — Defensores da Fé";
  const RULESET = "v35-defensores";

  // 1. Classes de prestígio
  const classes = DEFENSORES_PRESTIGE_CLASSES.map((c) => ({
    id: `dnd35.defensores.prestige.${c.id}`,
    name_pt: c.name,
    name_en: c.name,
    description_pt: c.requirements.join(" "),
    hp_per_level: c.hitDie,
    key_attributes: [],
    traits: ["prestige"],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 51,
    system_id: "dnd35",
    data: c,
  }));
  const { error: errClasses } = await supabase.from("catalog_classes").upsert(classes, { onConflict: "id" });
  if (errClasses) throw new Error(`catalog_classes (Defensores): ${errClasses.message}`);
  console.log(`✓ catalog_classes: ${classes.length} linhas upserted.`);

  // 2. Talentos
  const feats = DEFENSORES_FEATS.map((f) => ({
    id: `dnd35.defensores.feat.${f.id}`,
    feat_type: f.type,
    level: 1,
    name_pt: f.name,
    name_en: f.name,
    description_pt: f.benefit,
    prerequisites: f.prerequisites.length ? f.prerequisites.join(", ") : null,
    traits: [f.type.toLowerCase()],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 19,
    system_id: "dnd35",
    data: f,
  }));
  const { error: errFeats } = await supabase.from("catalog_feats").upsert(feats, { onConflict: "id" });
  if (errFeats) throw new Error(`catalog_feats (Defensores): ${errFeats.message}`);
  console.log(`✓ catalog_feats: ${feats.length} linhas upserted.`);

  // 3. Magias
  const spells = DEFENSORES_SPELLS.map((s) => ({
    id: `dnd35.defensores.spell.${s.id}`,
    name_pt: s.name,
    name_en: s.name,
    description_pt: s.description,
    rank: parseSpellRank(s.level),
    is_cantrip: false,
    is_focus: false,
    traditions: [s.level],
    cast_actions: s.castingTime ?? null,
    range: s.range ?? null,
    targets: s.target ?? null,
    duration: s.duration ?? null,
    defense: s.savingThrow ?? null,
    traits: [s.school],
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 81,
    system_id: "dnd35",
    data: s,
  }));
  const { error: errSpells } = await supabase.from("catalog_spells").upsert(spells, { onConflict: "id" });
  if (errSpells) throw new Error(`catalog_spells (Defensores): ${errSpells.message}`);
  console.log(`✓ catalog_spells: ${spells.length} linhas upserted.`);

  // 4. Domínios de prestígio -> catalog_items
  const items = DEFENSORES_PRESTIGE_DOMAINS.map((d) => ({
    id: `dnd35.defensores.domain.${d.id}`,
    name_pt: d.name,
    name_en: d.name,
    description_pt: d.grantedPower,
    item_category: "domain",
    level: 1,
    price_gp: null,
    traits: d.deities,
    ruleset: RULESET,
    source_book: BOOK,
    source_page: 77,
    system_id: "dnd35",
    data: d,
  }));
  const { error: errItems } = await supabase.from("catalog_items").upsert(items, { onConflict: "id" });
  if (errItems) throw new Error(`catalog_items (Defensores): ${errItems.message}`);
  console.log(`✓ catalog_items: ${items.length} linhas upserted.`);
}

async function main() {
  console.log(`Iniciando sincronização com Supabase em ${supabaseUrl}...`);
  await syncCov();
  await syncDefensores();
  console.log("=== Sincronização concluída com sucesso! ===");
}

main().catch((err) => {
  console.error("Falha na sincronização:", err);
  process.exit(1);
});
