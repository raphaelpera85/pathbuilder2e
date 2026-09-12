import { DND5E_CLASSES, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS } from "./dnd5e/dnd5eBackgrounds";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { T20_RACE_RULES } from "./t20/t20Races";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";

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
  equipmentIds: string[];
  spellIds: string[];
  featIds: string[];
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
    ? { races: T20_RACES, raceRules: T20_RACE_RULES, classes: T20_CLASSES, classRules: T20_CLASS_RULES, skills: T20_SKILLS, backgrounds: T20_ORIGINS, equipment: T20_EQUIPMENT, spells: T20_SPELLS, feats: T20_POWERS }
    : { races: DND5E_RACES, raceRules: DND5E_RACE_RULES, classes: DND5E_CLASSES, classRules: DND5E_CLASS_RULES, skills: DND5E_SKILLS, backgrounds: DND5E_BACKGROUNDS, equipment: DND5E_EQUIPMENT, spells: DND5E_SPELLS, feats: DND5E_FEATS };
}

export function createInitialCoreCharacter(system: SupportedCoreSystem): MultiSystemCharacter {
  const catalog = getCoreCatalog(system);
  const firstRace = catalog.races[0];
  const firstClass = catalog.classes[0];
  const firstBackground = catalog.backgrounds[0];
  const classRules = catalog.classRules.find((item) => item.id === firstClass.id);
  const backgroundSkills = "skillProficiencies" in firstBackground ? firstBackground.skillProficiencies : firstBackground.trainedSkills;
  const fixedSkills = classRules && "fixedSkills" in classRules ? classRules.fixedSkills : [];
  return {
    id: `char_${system}_${Date.now()}`,
    name: system === "t20" ? "Novo herói de Arton" : "Novo aventureiro",
    system_id: system,
    systemId: system,
    ruleset: system === "t20" ? "padrao" : "standard",
    level: 1,
    raceId: firstRace.id,
    classId: firstClass.id,
    backgroundId: catalog.backgrounds[0].id,
    abilities: { ...DEFAULT_ABILITIES },
    skillProficiencies: Array.from(new Set([...backgroundSkills, ...fixedSkills])),
    equipmentIds: [],
    spellIds: [],
    featIds: [],
    notes: "",
  };
}
