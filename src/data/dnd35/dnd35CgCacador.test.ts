import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Caçador da Floresta Sombria (pp. 22-24)", () => {
  const c = P.find((x) => x.id === "cg-cacador-da-floresta-sombria")!;
  it("d8, 10 níveis, BAB completo, Fort e Ref fortes, Von fraco", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(Math.floor(l.level / 3));
    });
  });
  it("ataque furtivo 3/6/9 e inimigo ancestral +2 a cada três níveis (1,4,7,10)", () => {
    expect(c.levels.filter((l) => l.sneakAttack).map((l) => [l.level, l.sneakAttack])).toEqual([[3, "1d6"], [6, "2d6"], [9, "3d6"]]);
    expect(c.levels.filter((l) => /Inimigo ancestral/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[1, "2"], [4, "4"], [7, "6"], [10, "8"]]);
    expect(c.features.find((f) => f.name.startsWith("Inimigo"))!.text).toMatch(/\(4º, 7º e 10º níveis\).*\+2 em todos os bônus/);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Visão")).toMatch(/9 m.*18 m/);
    expect(f("Amortecer")).toMatch(/CD 20 \+ bônus de melhoria/);
    expect(f("Ataque Mortal")).toMatch(/3 rodadas.*CD 10 \+ nível de classe.*Sabedoria/);
    expect(c.requirements.skills).toHaveLength(6);
    expect(c.classSkills).toHaveLength(15);
  });
});
