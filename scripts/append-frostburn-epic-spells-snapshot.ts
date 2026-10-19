import { readFileSync, writeFileSync } from "node:fs";
import { DND35_FROSTBURN_EPIC_SPELLS } from "../src/data/dnd35/dnd35FrostburnEpicSpells";

const path = "src/data/catalog/snapshots/dnd35/v35-frostburn/spell.json";
const arr = JSON.parse(readFileSync(path, "utf8")).filter(
  (x: any) => !String(x.id).startsWith("dnd35.frostburn.epic-spell."),
);
const existingIds = new Set(arr.map((x: any) => x.id));
const now = new Date().toISOString();

const newEntries = DND35_FROSTBURN_EPIC_SPELLS.map((s) => {
  const id = `dnd35.frostburn.epic-spell.${s.id.replace("frostburn-epic-spell-", "")}`;
  return {
    id,
    name_pt: s.name,
    name_en: s.name,
    name_es: null,
    description_pt: s.description,
    description_en: null,
    description_es: null,
    rank: 10,
    is_cantrip: false,
    is_focus: false,
    traditions: [],
    cast_actions: s.castingTime,
    range: s.range,
    targets: s.area,
    duration: s.duration,
    defense: s.savingThrow,
    traits: ["epic", s.school, ...s.descriptors],
    rarity: "legendary",
    ruleset: "v35-frostburn",
    source_book: "D&D 3.5 — Frostburn",
    source_page: s.page,
    data: s,
    created_at: now,
    updated_at: now,
    system_id: "dnd35",
  };
});

let added = 0;
for (const e of newEntries) {
  if (!existingIds.has(e.id)) {
    arr.push(e);
    added++;
  }
}

writeFileSync(path, JSON.stringify(arr, null, 2) + "\n", "utf8");
console.log(`added=${added} total=${arr.length}`);
