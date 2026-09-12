import { describe, expect, it } from "vitest";
import {
  DND5E_STANDARD_ARRAY,
  generateAbilityScores,
  resolveD20Roll,
  validatePointBuy,
} from "./coreCharacterRules";

describe("core character creation rules", () => {
  it("validates T20 and D&D 5e point-buy budgets independently", () => {
    expect(validatePointBuy("t20", [10, 10, 10, 10, 10, 10])).toMatchObject({ valid: true, spent: 0 });
    expect(validatePointBuy("t20", [18, 18, 10, 10, 10, 10]).valid).toBe(false);
    expect(validatePointBuy("dnd5e", [15, 15, 15, 9, 8, 8]).valid).toBe(false);
    expect(validatePointBuy("dnd5e", [15, 14, 13, 12, 10, 8]).valid).toBe(true);
    expect(DND5E_STANDARD_ARRAY).toEqual([15, 14, 13, 12, 10, 8]);
  });

  it("supports deterministic 4d6 and advantage/disadvantage tests", () => {
    const fixed = () => 6;
    expect(generateAbilityScores(fixed)).toEqual([18, 18, 18, 18, 18, 18]);
    const sequence = [2, 18];
    expect(resolveD20Roll("advantage", () => sequence.shift() || 1)).toBe(18);
    const disadvantage = [2, 18];
    expect(resolveD20Roll("disadvantage", () => disadvantage.shift() || 1)).toBe(2);
  });
});
