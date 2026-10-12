import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Cavaleiro (pp. 29-31)", () => {
  const c = P.find((x) => x.id === "cg-cavaleiro")!;
  it("d10, 10 níveis, BAB completo, Fort/Von fortes, Ref fraco", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(Math.floor(l.level / 3));
    });
  });
  it("investida mortífera 1-5/dia nos níveis 2,4,6,8,10; bônus montado lança +1,+2,+3 e espada +1,+2,+3", () => {
    const im = c.levels.filter((l) => /[Ii]nvestida (mortífera|suprema)/.test(l.special)).map((l) => [l.level, Number(l.special.match(/(\d)\/dia/)![1])]);
    expect(im).toEqual([[2, 1], [4, 2], [6, 3], [8, 4], [10, 5]]);
    expect(c.levels.filter((l) => /lança\)/.test(l.special)).map((l) => l.level)).toEqual([1, 5, 9]);
    expect(c.levels.filter((l) => /espada\)/.test(l.special)).map((l) => l.level)).toEqual([2, 6, 10]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Investida Mortífera")).toMatch(/triplo do dano.*quadruplicado/);
    expect(f("Investida Suprema")).toMatch(/quádruplo do dano.*quíntuplo com uma lança/);
    expect(f("Cavalgada")).toMatch(/CD 20.*2d6 pontos de dano/);
    expect(c.requirements.bab).toBe("+8");
    expect(c.requirements.other).toEqual(["Tendência: qualquer Leal"]);
    expect(c.requirements.feats).toHaveLength(4);
  });
});
