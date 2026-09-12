import { DND5E_CLASSES, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";

export type SupportedCoreSystem = "t20" | "dnd5e";
export type CoreAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type CoreAbilities = Record<CoreAbility, number>;

export interface MultiSystemCharacter {
  id: string;
  name: string;
  system_id: SupportedCoreSystem;
  systemId: SupportedCoreSystem;
  ruleset: "padrao" | "standard";
  level: number;
  raceId: string;
  classId: string;
  backgroundId?: string;
  abilities: CoreAbilities;
  skillProficiencies: string[];
  notes: string;
}

const DEFAULT_ABILITIES: CoreAbilities = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export function abilityModifier(score: number, system: SupportedCoreSystem = "dnd5e"): number {
  if (system === "t20") {
    if (score === 1) return -5;
    if (score <= 3) return -4;
    if (score <= 5) return -3;
    if (score <= 7) return -2;
    if (score <= 9) return -1;
    return Math.floor((score - 10) / 2);
  }
  return Math.floor((score - 10) / 2);
}

export function proficiencyBonus(system: SupportedCoreSystem, level: number): number {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  // T20 trained checks add level + 2. D&D 5e uses its proficiency table.
  return system === "t20" ? safeLevel + 2 : 2 + Math.floor((safeLevel - 1) / 4);
}

export function getCoreCatalog(system: SupportedCoreSystem) {
  return system === "t20"
    ? { races: T20_RACES, classes: T20_CLASSES, skills: T20_SKILLS }
    : { races: DND5E_RACES, classes: DND5E_CLASSES, skills: DND5E_SKILLS };
}

export function createInitialCoreCharacter(system: SupportedCoreSystem): MultiSystemCharacter {
  const catalog = getCoreCatalog(system);
  const firstRace = catalog.races[0];
  const firstClass = catalog.classes[0];
  return {
    id: `char_${system}_${Date.now()}`,
    name: system === "t20" ? "Novo herói de Arton" : "Novo aventureiro",
    system_id: system,
    systemId: system,
    ruleset: system === "t20" ? "padrao" : "standard",
    level: 1,
    raceId: firstRace.id,
    classId: firstClass.id,
    abilities: { ...DEFAULT_ABILITIES },
    skillProficiencies: [],
    notes: "",
  };
}
