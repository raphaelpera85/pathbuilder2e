import { describe, expect, it } from "vitest";
import {
  abilityModifier,
  createInitialCoreCharacter,
  getCoreCatalog,
  proficiencyBonus,
} from "./multiSystemCharacter";

describe("core system character models", () => {
  it("creates isolated T20 and D&D 5e payloads from their own catalogs", () => {
    const t20 = createInitialCoreCharacter("t20");
    const dnd5e = createInitialCoreCharacter("dnd5e");

    expect(t20.system_id).toBe("t20");
    expect(dnd5e.system_id).toBe("dnd5e");
    expect(t20.raceId).toBe(getCoreCatalog("t20").races[0].id);
    expect(dnd5e.classId).toBe(getCoreCatalog("dnd5e").classes[0].id);
    expect(t20.ruleset).not.toBe(dnd5e.ruleset);
  });

  it("calculates shared d20 fundamentals without mixing catalogs", () => {
    expect(abilityModifier(9)).toBe(-1);
    expect(abilityModifier(2, "t20")).toBe(-4);
    expect(abilityModifier(18, "t20")).toBe(4);
    expect(proficiencyBonus("t20", 1)).toBe(3);
    expect(proficiencyBonus("dnd5e", 5)).toBe(3);
  });
});
