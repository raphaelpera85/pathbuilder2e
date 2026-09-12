import fs from "node:fs";
import path from "node:path";
import { OSE_CLASSES } from "../src/data/ose/oseClasses.ts";
import { OSE_RACES } from "../src/data/ose/oseRaces.ts";
import { OSE_SPELLS } from "../src/data/ose/oseSpells.ts";
import { OSE_WEAPONS, OSE_ARMORS, OSE_GEAR } from "../src/data/ose/oseEquipment.ts";

const root = path.resolve(".");
const output = path.join(root, "supabase/migrations/202609120018_seed_ose_core_catalog.sql");
const sourceBook = "Old-School Essentials — Tomo do Jogador";
const ruleset = "advanced";

const quote = (value) => "'" + String(value ?? "").replace(/'/g, "''") + "'";
const sql = (value) => {
  if (value === undefined || value === null) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (Array.isArray(value) || typeof value === "object") return quote(JSON.stringify(value)) + "::jsonb";
  return quote(value);
};
const textArray = (values = []) => "ARRAY[" + values.map(quote).join(",") + "]::text[]";
const conflict = (columns) => "on conflict (id) do update set " + columns.map((column) => column + "=excluded." + column).join(",") + ",updated_at=now();";

const classRows = Object.values(OSE_CLASSES).map((entry) => {
  const hitDie = Number(String(entry.hitDie).replace("d", "")) || 6;
  const traits = [entry.allowedArmor, entry.combatCategory, entry.isRaceClass ? "classe-raça" : "classe avançada"].filter(Boolean);
  return "(" + [
    sql("ose.class." + entry.id), sql(entry.name), sql(entry.nameEn), sql(entry.description), sql(entry.description),
    hitDie, textArray(entry.primeRequisites), textArray(traits), sql(ruleset), sql(sourceBook), 28, sql(entry), sql("ose"),
  ].join(",") + ")";
});

const ancestryRows = Object.values(OSE_RACES).map((entry) => {
  const boosts = Object.entries(entry.statModifiers || {}).map(([ability, value]) => ability + " " + (value > 0 ? "+" : "") + value);
  return "(" + [
    sql("ose.race." + entry.id), sql(entry.name), sql(entry.nameEn), sql(entry.description), sql(entry.description),
    8, sql("Medium"), 120, textArray(boosts), "NULL", textArray(entry.nativeLanguages), textArray(entry.traits),
    sql(ruleset), sql(sourceBook), 78, sql(entry), sql("ose"),
  ].join(",") + ")";
});

const itemRows = [
  ...OSE_WEAPONS.map((entry) => "(" + [sql("ose.weapon." + entry.id), sql(entry.name), sql("weapon"), sql(ruleset), sql(sourceBook), 94, sql({ ...entry, system_id: "ose" }), sql("ose")].join(",") + ")"),
  ...OSE_ARMORS.map((entry) => "(" + [sql("ose.armor." + entry.id), sql(entry.name), sql("worn"), sql(ruleset), sql(sourceBook), 96, sql({ ...entry, system_id: "ose" }), sql("ose")].join(",") + ")"),
  ...OSE_GEAR.map((entry) => "(" + [sql("ose.gear." + entry.id), sql(entry.name), sql("gear"), sql(ruleset), sql(sourceBook), 97, sql({ ...entry, system_id: "ose" }), sql("ose")].join(",") + ")"),
];

const spellRows = OSE_SPELLS.map((entry) => "(" + [
  sql("ose.spell." + entry.id), sql(entry.name), sql(entry.circle), "FALSE", "FALSE", sql(ruleset), sql(sourceBook), 128,
  sql({ ...entry, system_id: "ose" }), sql("ose"),
].join(",") + ")");

const migration = "-- Seed idempotente do catálogo OSE local. OSE não usa talentos separados;\\n" +
  "-- progressões e habilidades permanecem estruturadas no campo data das classes.\\n" +
  "insert into public.catalog_classes\\n(id,name_pt,name_en,description_pt,description_en,hp_per_level,key_attributes,traits,ruleset,source_book,source_page,data,system_id) values\\n" +
  classRows.join(",\\n") + "\\n" + conflict(["name_pt","name_en","description_pt","description_en","hp_per_level","key_attributes","traits","ruleset","source_book","source_page","data","system_id"]) + "\\n\\n" +
  "insert into public.catalog_ancestries\\n(id,name_pt,name_en,description_pt,description_en,hp_base,size,speed_feet,attribute_boosts,attribute_flaw,languages,traits,ruleset,source_book,source_page,data,system_id) values\\n" +
  ancestryRows.join(",\\n") + "\\n" + conflict(["name_pt","name_en","description_pt","description_en","hp_base","size","speed_feet","attribute_boosts","attribute_flaw","languages","traits","ruleset","source_book","source_page","data","system_id"]) + "\\n\\n" +
  "insert into public.catalog_items\\n(id,name_pt,item_category,ruleset,source_book,source_page,data,system_id) values\\n" +
  itemRows.join(",\\n") + "\\n" + conflict(["name_pt","item_category","ruleset","source_book","source_page","data","system_id"]) + "\\n\\n" +
  "insert into public.catalog_spells\\n(id,name_pt,rank,is_cantrip,is_focus,ruleset,source_book,source_page,data,system_id) values\\n" +
  spellRows.join(",\\n") + "\\n" + conflict(["name_pt","rank","is_cantrip","is_focus","ruleset","source_book","source_page","data","system_id"]) + "\\n";

fs.writeFileSync(output, migration.replaceAll("\\n", "\n"), "utf8");
console.log(JSON.stringify({ output, classes: classRows.length, ancestries: ancestryRows.length, items: itemRows.length, spells: spellRows.length }, null, 2));
