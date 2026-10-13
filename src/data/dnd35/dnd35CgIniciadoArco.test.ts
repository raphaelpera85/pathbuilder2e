import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Iniciado da Ordem do Arco (pp. 58-59)", () => {
  const c = P.find((x) => x.id === "cg-iniciado-da-ordem-do-arco")!;
  it("d8, 10 níveis, BAB completo, Ref/Von fortes, Fort fraco", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
      expect(l.will).toBe(l.ref);
    });
  });
  it("disparo preciso +1d8 a +5d8 nos níveis 1,3,5,7,9", () => {
    expect(c.levels.filter((l) => /Disparo preciso/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)d8/)![1]])).toEqual([[1, "1"], [3, "2"], [5, "3"], [7, "4"], [9, "5"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Precisão Estendida")).toMatch(/18 m/);
    expect(f("Disparo Preciso")).toMatch(/1d8 pontos de dano adicional.*9 metros/);
    expect(c.requirements.bab).toBe("+5");
    expect(c.requirements.feats).toHaveLength(4);
  });
});
