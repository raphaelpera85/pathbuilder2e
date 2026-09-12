import {
  abilityModifier,
  createInitialCoreCharacter,
  getCoreCatalog,
  proficiencyBonus,
  type MultiSystemCharacter,
  type SupportedCoreSystem,
} from "./multiSystemCharacter";
import { DND5E_CREATION_STEPS } from "./dnd5e/dnd5eCatalog";
import { T20_CREATION_STEPS } from "./t20/t20Catalog";

export interface SystemRulesEngine {
  systemId: SupportedCoreSystem;
  ruleset: "padrao" | "standard";
  createDefaultCharacter(): MultiSystemCharacter;
  deriveStats(character: MultiSystemCharacter): {
    modifiers: Record<string, number>;
    proficiencyBonus: number;
    hpMax: number;
    manaMax: number;
    defense: number;
    initiative: number;
    skillBonuses: Record<string, number>;
  };
  validateCharacter(character: MultiSystemCharacter): string[];
  getCreationSteps(): readonly string[];
}

function buildEngine(systemId: SupportedCoreSystem): SystemRulesEngine {
  const ruleset = systemId === "t20" ? "padrao" : "standard";
  return {
    systemId,
    ruleset,
    createDefaultCharacter: () => createInitialCoreCharacter(systemId),
    deriveStats: (character) => {
      const catalog = getCoreCatalog(systemId);
      const modifiers = Object.fromEntries(
        Object.entries(character.abilities).map(([ability, score]) => [ability, abilityModifier(score, systemId)]),
      );
      const classRules = catalog.classRules.find((entry) => entry.id === character.classId);
      const con = modifiers.con || 0;
      const dex = modifiers.dex || 0;
      const hpMax = systemId === "t20" && classRules && "startingHp" in classRules
        ? Math.max(1, classRules.startingHp + con + Math.max(0, character.level - 1) * Math.max(1, classRules.hpPerLevel + con))
        : classRules && "hitDie" in classRules
          ? Math.max(1, Number(classRules.hitDie.slice(1)) + character.level * con)
          : Math.max(1, 8 + character.level * con);
      const manaMax = systemId === "t20" && classRules && "manaPerLevel" in classRules
        ? classRules.manaPerLevel * character.level
        : 0;
      const trained = new Set(character.skillProficiencies || []);
      const skillBonuses = Object.fromEntries(catalog.skills.map((skill) => [skill.id, (modifiers[skill.keyAbility || "int"] || 0) + (trained.has(skill.id) ? proficiencyBonus(systemId, character.level) : 0)]));
      return {
        modifiers,
        proficiencyBonus: proficiencyBonus(systemId, character.level),
        hpMax,
        manaMax,
        defense: 10 + dex,
        initiative: dex,
        skillBonuses,
      };
    },
    validateCharacter: (character) => {
      const errors: string[] = [];
      const catalog = getCoreCatalog(systemId);
      if (character.system_id !== systemId || character.systemId !== systemId) errors.push("system_id incompatível com o motor selecionado");
      if (character.ruleset !== ruleset) errors.push("ruleset incompatível com o motor selecionado");
      if (!catalog.races.some((entry) => entry.id === character.raceId)) errors.push("raça não pertence ao catálogo do sistema");
      if (!catalog.classes.some((entry) => entry.id === character.classId)) errors.push("classe não pertence ao catálogo do sistema");
      if (!catalog.backgrounds.some((entry) => entry.id === character.backgroundId)) errors.push("origem/antecedente não pertence ao catálogo do sistema");
      if (!Number.isInteger(character.level) || character.level < 1 || character.level > 20) errors.push("nível deve estar entre 1 e 20");
      for (const [ability, score] of Object.entries(character.abilities)) {
        if (!Number.isInteger(score) || score < 1 || score > 30) errors.push(`${ability} deve estar entre 1 e 30`);
      }
      const selectedClass = catalog.classRules.find((entry) => entry.id === character.classId);
      const selectedBackground = catalog.backgrounds.find((entry) => entry.id === character.backgroundId);
      const trained = new Set(character.skillProficiencies || []);
      const requiredBackgroundSkills = selectedBackground && ("skillProficiencies" in selectedBackground ? selectedBackground.skillProficiencies : selectedBackground.trainedSkills);
      for (const skill of requiredBackgroundSkills || []) if (!trained.has(skill)) errors.push("a perícia do antecedente/origem deve permanecer treinada");
      if (selectedClass && "fixedSkills" in selectedClass) {
        for (const skill of selectedClass.fixedSkills) if (!trained.has(skill)) errors.push("a perícia obrigatória da classe deve permanecer treinada");
        const max = new Set([...selectedClass.fixedSkills, ...(requiredBackgroundSkills || [])]).size + selectedClass.choiceSkillCount;
        if (trained.size > max) errors.push(`a classe permite no máximo ${max} perícias treinadas nesta etapa`);
      } else if (selectedClass && "skillChoiceCount" in selectedClass) {
        const minimum = new Set(requiredBackgroundSkills || []).size;
        if (trained.size > minimum + selectedClass.skillChoiceCount) errors.push(`a classe permite no máximo ${minimum + selectedClass.skillChoiceCount} perícias de classe além do antecedente`);
      }
      return errors;
    },
    getCreationSteps: () => systemId === "t20" ? T20_CREATION_STEPS : DND5E_CREATION_STEPS,
  };
}

export const T20_RULES_ENGINE = buildEngine("t20");
export const DND5E_RULES_ENGINE = buildEngine("dnd5e");

export function getSystemRulesEngine(systemId: SupportedCoreSystem): SystemRulesEngine {
  return systemId === "t20" ? T20_RULES_ENGINE : DND5E_RULES_ENGINE;
}
