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
    deriveStats: (character) => ({
      modifiers: Object.fromEntries(
        Object.entries(character.abilities).map(([ability, score]) => [ability, abilityModifier(score, systemId)]),
      ),
      proficiencyBonus: proficiencyBonus(systemId, character.level),
    }),
    validateCharacter: (character) => {
      const errors: string[] = [];
      const catalog = getCoreCatalog(systemId);
      if (character.system_id !== systemId || character.systemId !== systemId) errors.push("system_id incompatível com o motor selecionado");
      if (character.ruleset !== ruleset) errors.push("ruleset incompatível com o motor selecionado");
      if (!catalog.races.some((entry) => entry.id === character.raceId)) errors.push("raça não pertence ao catálogo do sistema");
      if (!catalog.classes.some((entry) => entry.id === character.classId)) errors.push("classe não pertence ao catálogo do sistema");
      if (!Number.isInteger(character.level) || character.level < 1 || character.level > 20) errors.push("nível deve estar entre 1 e 20");
      for (const [ability, score] of Object.entries(character.abilities)) {
        if (!Number.isInteger(score) || score < 1 || score > 30) errors.push(`${ability} deve estar entre 1 e 30`);
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

