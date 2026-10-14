import { describe, it, expect } from "vitest";
import { T20_DEUSES_SPELLS } from "./t20DeusesSpells";

describe("T20 Deuses de Arton - Divine Spells", () => {
  it("should contain exactly 26 divine spells", () => {
    expect(T20_DEUSES_SPELLS.length).toBe(26);
  });

  it("should have valid unique IDs and complete metadata for all spells", () => {
    const ids = T20_DEUSES_SPELLS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(26);

    for (const spell of T20_DEUSES_SPELLS) {
      expect(spell.id).toMatch(/^t20\.deuses\.magia\.[a-z0-9_]+$/);
      expect(spell.name.trim().length).toBeGreaterThan(0);
      expect(spell.spellLevel).toBeGreaterThanOrEqual(1);
      expect(spell.spellLevel).toBeLessThanOrEqual(5);
      expect(spell.tradition).toBe("divina");
      expect(spell.school.length).toBeGreaterThan(0);
      expect(spell.castingTime.length).toBeGreaterThan(0);
      expect(spell.range.length).toBeGreaterThan(0);
      expect(spell.duration.length).toBeGreaterThan(0);
      expect(spell.summary.trim().length).toBeGreaterThan(20);
    }
  });

  it("should include iconic deity-specific spells", () => {
    const armaDeJade = T20_DEUSES_SPELLS.find((s) => s.name === "Arma de Jade");
    expect(armaDeJade).toBeDefined();
    expect(armaDeJade?.school).toBe("transmutacao");
    expect(armaDeJade?.summary).toContain("Lin-Wu");

    const couraçaAllihanna = T20_DEUSES_SPELLS.find((s) => s.name === "Couraça de Allihanna");
    expect(couraçaAllihanna).toBeDefined();
    expect(couraçaAllihanna?.spellLevel).toBe(2);

    const bofetadaNimb = T20_DEUSES_SPELLS.find((s) => s.name === "Bofetada de Nimb");
    expect(bofetadaNimb).toBeDefined();

    const sirocoAzgher = T20_DEUSES_SPELLS.find((s) => s.name === "Siroco de Azgher");
    expect(sirocoAzgher).toBeDefined();
  });
});
