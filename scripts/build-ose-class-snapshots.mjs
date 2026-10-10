import fs from "node:fs";
import path from "node:path";
import { OSE_CLASSES } from "../src/data/ose/oseClasses.ts";
import {
  OSE_BASIC_METHOD_RACE_BY_CLASS,
  OSE_CLASSIC_RACE_BY_CLASS,
  isOseClassAvailableForMode,
} from "../src/data/ose/oseRules.ts";

const root = path.resolve("src/data/catalog/snapshots/ose");
const basicOnlyIds = new Set(Object.keys(OSE_BASIC_METHOD_RACE_BY_CLASS));
const modes = ["advanced", "classic", "basico"];

function rowFor(entry, ruleset) {
  const classicRaceClass = ruleset === "classic" && Object.hasOwn(OSE_CLASSIC_RACE_BY_CLASS, entry.id);
  const traits = [entry.allowedArmor, entry.combatCategory, entry.isRaceClass ? "classe-raça" : "classe avançada"].filter(Boolean);
  const data = { ...entry, system_id: "ose", ruleset };
  return {
    id: `ose.class.${entry.id}${classicRaceClass ? "_classic" : ""}`,
    system_id: "ose",
    name_pt: entry.name,
    name_en: entry.nameEn,
    description_pt: entry.description,
    hp_per_level: Number(entry.hitDie.slice(1)),
    key_attributes: entry.primeRequisites,
    traits,
    rarity: "common",
    ruleset,
    source_book: entry.sourceBook,
    source_page: entry.sourcePage,
    data,
  };
}

for (const ruleset of modes) {
  const entries = Object.values(OSE_CLASSES).filter((entry) => {
    if (!isOseClassAvailableForMode(entry, ruleset)) return false;
    if (ruleset === "basico") return basicOnlyIds.has(entry.id);
    if (ruleset === "classic") return Object.hasOwn(OSE_CLASSIC_RACE_BY_CLASS, entry.id);
    return true;
  });
  const output = path.join(root, ruleset, "class.json");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(entries.map((entry) => rowFor(entry, ruleset)).sort((a, b) => a.id.localeCompare(b.id)), null, 2)}\n`, "utf8");
  console.log(`${ruleset}: ${entries.length} classes -> ${output}`);
}
