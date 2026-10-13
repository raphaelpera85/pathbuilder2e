import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Olho de Gruumsh (pp. 84-86)", () => {
  const c = P.find((x) => x.id === "cg-olho-gruumsh")!;
  it("d12, 10 níveis, BAB completo, Fort forte, Ref fraco, Von intermediário", () => {
    expect(c.hitDie).toBe(12);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
    });
    expect(c.levels.map((l) => l.will)).toEqual([0, 0, 1, 1, 2, 2, 2, 2, 3, 3]);
  });
  it("mutilação ritual +1/+2/+3 nos níveis 3,6,9; saliva cegante 2/4/dia nos níveis 4,7", () => {
    expect(c.levels.filter((l) => /Mutilação ritual/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[3, "1"], [6, "2"], [9, "3"]]);
    expect(c.levels.filter((l) => /Saliva cegante/.test(l.special)).map((l) => [l.level, l.special.match(/(\d)\/dia/)![1]])).toEqual([[4, "2"], [7, "4"]]);
  });
  it("exige raça Orc ou meio-orc, tendência não Boa, BBA +6", () => {
    expect(c.requirements.bab).toBe("+6");
    expect(c.requirements.other[0]).toBe("Raça: Orc ou meio-orc");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Saliva Cegante")).toMatch(/CD 10 \+ nível do olho de Gruumsh \+ bônus de Constituição/);
    expect(f("Brandir às Cegas")).toMatch(/\+4 de bônus adicional em seu valor de Força.*-4 de penalidade na CA/);
  });
});
