import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Cavaleiro Protetor (pp. 36-37)", () => {
  const c = P.find((x) => x.id === "cg-cavaleiro-protetor")!;
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
  it("tática defensiva +2 a +5 (1,4,7,10) e esforço extra +2 a +4 (2,5,8)", () => {
    expect(c.levels.filter((l) => /Tática defensiva/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[1, "2"], [4, "3"], [7, "4"], [10, "5"]]);
    expect(c.levels.filter((l) => /Esforço extra/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[2, "2"], [5, "3"], [8, "4"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Porto Seguro")).toMatch(/\+4 de bônus de moral.*3 m ou menos/);
    expect(f("Retribuição")).toMatch(/10 pontos de dano adicional/);
    expect(c.requirements.bab).toBe("+5");
    expect(c.requirements.feats).toHaveLength(5);
  });
});
