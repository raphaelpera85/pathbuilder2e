import { describe, expect, it } from "vitest";
import { COR_DRAEGLOTH as D, COR_RACES as R } from "./dnd35CorRaces";

describe("Champions of Ruin: raças (pp. 8-16)", () => {
  it("extaminaar e krinth", () => {
    const e = R.find((r) => r.id === "cor-extaminaar")!;
    const k = R.find((r) => r.id === "cor-krinth")!;
    expect(e.abilityAdjustments).toEqual({ Str: -2, Dex: 2 });
    expect(k.abilityAdjustments).toEqual({ Con: 2, Cha: -2 });
    expect(e.favoredClass).toBe("Rogue");
    expect(k.favoredClass).toBe("Fighter");
    expect(R.every((r) => r.levelAdjustment === 0 && r.speedFt === 30)).toBe(true);
    expect(k.traits.some((t) => /\+4 racial bonus on saving throws against fear/.test(t))).toBe(true);
  });
  it("draegloth: 10 níveis, DV = 1..6d10 e ajuste de nível +4 (ECL 10 com 6 DV)", () => {
    expect(D.levels).toHaveLength(10);
    expect(D.levels.map((l) => l.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(D.levels[9].hitDice).toBe("6d10");
    expect(6 + D.levelAdjustment).toBe(10);
  });
  it("draegloth: BAB = DV (progressão total) e Fort = 2 + DV/2", () => {
    for (const l of D.levels) {
      const hd = Number(l.hitDice.split("d")[0]);
      expect(l.bab, `nível ${l.level}`).toBe(hd);
      expect(l.fort, `nível ${l.level}`).toBe(2 + Math.floor(hd / 2));
    }
  });
  it("draegloth: pontos de perícia só em 1º, 2º, 4º, 6º, 8º, 10º; +2 Str em 6 níveis", () => {
    expect(D.levels.filter((l) => l.skillPoints).map((l) => l.level)).toEqual([1, 2, 4, 6, 8, 10]);
    expect(D.levels.filter((l) => /\+2 Str/.test(l.special))).toHaveLength(6);
    expect(D.levels[8].special).toMatch(/Large size/);
  });
});
