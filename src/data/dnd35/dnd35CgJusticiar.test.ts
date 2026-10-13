import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Justiciar (pp. 59-61)", () => {
  const c = P.find((x) => x.id === "cg-justiciar")!;
  it("d10, 10 níveis, BAB completo, Von forte, Fort/Ref fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("exaurir +1d6 a +4d6 nos níveis 1,4,7,10; manha urbana +2 a +6 nos níveis 3,6,9", () => {
    expect(c.levels.filter((l) => /[Ee]xaurir \+\d/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)d6/)![1]])).toEqual([[1, "1"], [4, "2"], [7, "3"], [10, "4"]]);
    expect(c.levels.filter((l) => /Manha urbana/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[3, "2"], [6, "4"], [9, "6"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Algemar") && c.features.find((x) => x.name === "Algemar (Ext)")!.text).toMatch(/CD 23 para cordas e correntes, CD 26 para algemas e CD 28 para algemas obra-prima/);
    expect(f("Intuição")).toMatch(/1,5 km.*CD do teste equivale a 15 \+ DV do réu/);
    expect(c.requirements.other).toEqual(["Tendência: Qualquer Leal"]);
    expect(c.requirements.bab).toBe("+6");
  });
});
