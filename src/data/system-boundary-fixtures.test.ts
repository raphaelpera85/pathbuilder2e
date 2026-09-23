import { describe, expect, it } from "vitest";
import { getCoreCatalog, type MultiSystemCharacter } from "./multiSystemCharacter";
import { DND5E_RULES_ENGINE, T20_RULES_ENGINE } from "./systemRulesEngine";
import { OSE_CLASSES } from "./ose/oseClasses";
import { isOseClassAvailableForMode } from "./ose/oseRules";

const finiteDerivedFields = [
  "proficiencyBonus", "hpMax", "manaMax", "defense", "initiative", "carryingWeight", "speed",
] as const;

function expectFiniteDerivation(engine: typeof T20_RULES_ENGINE, character: MultiSystemCharacter, label: string) {
  const derived = engine.deriveStats(character);
  for (const field of finiteDerivedFields) {
    expect(Number.isFinite(derived[field]), `${label}: ${field}`).toBe(true);
  }
  expect(derived.experiencePoints, label).toBeGreaterThanOrEqual(0);
  expect(derived.experienceForLevel, label).toBeGreaterThanOrEqual(0);
}

describe("fixtures de níveis de fronteira por sistema", () => {
  it.each([
    ["t20", T20_RULES_ENGINE],
    ["dnd5e", DND5E_RULES_ENGINE],
  ] as const)("deriva nível 1 e teto para todas as classes e raças de %s", (system, engine) => {
    const catalog = getCoreCatalog(system);
    for (const classRule of catalog.classRules) {
      const levelOne = { ...engine.createDefaultCharacter(), classId: classRule.id, level: 1 };
      expectFiniteDerivation(engine, levelOne, `${system}/${classRule.id}/nível-1`);

      const maximum = { ...levelOne, level: 20, experiencePoints: 999999 };
      expectFiniteDerivation(engine, maximum, `${system}/${classRule.id}/nível-20`);
    }
    for (const raceRule of catalog.raceRules) {
      const character = { ...engine.createDefaultCharacter(), raceId: raceRule.id, level: 1 };
      expectFiniteDerivation(engine, character, `${system}/${raceRule.id}/raça`);
    }

    const caster = catalog.classRules.find((entry) => entry.spellcasting);
    if (caster) {
      const character = { ...engine.createDefaultCharacter(), classId: caster.id, level: 1 };
      const derived = engine.deriveStats(character);
      expect(Object.values(derived.spellSlots).some((slots) => slots > 0), `${system}/${caster.id}/primeiro-espaço`).toBe(true);
    }
  });

  it("deriva nível 1 e teto correto para cada classe jogável do OSE", () => {
    for (const mode of ["advanced", "classic"] as const) {
      const classes = Object.values(OSE_CLASSES).filter((entry) => isOseClassAvailableForMode(entry, mode));
      for (const entry of classes) {
        const first = entry.progression[0];
        const last = entry.progression[entry.progression.length - 1];
        expect(first.level, `${mode}/${entry.id}`).toBe(1);
        expect(last.level, `${mode}/${entry.id}`).toBeGreaterThanOrEqual(1);
        expect(Number.isFinite(first.thac0), `${mode}/${entry.id}/thac0`).toBe(true);
        expect(Number.isFinite(last.aacBonus), `${mode}/${entry.id}/aac`).toBe(true);
        if (entry.spellCasting) {
          expect(entry.progression.some((level) => (level.spells?.length || 0) > 0), `${mode}/${entry.id}/magias`).toBe(true);
        }
      }
    }
  });
});
