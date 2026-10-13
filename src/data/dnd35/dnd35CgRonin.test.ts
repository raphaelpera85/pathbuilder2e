import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Ronin (pp. 86-88)", () => {
  const c = P.find((x) => x.id === "cg-ronin")!;
  it("d10, 10 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("ataque furtivo +1d6/+2d6/+3d6/+4d6 nos níveis 1,4,7,10; talento adicional nos níveis 5,9", () => {
    expect(c.levels.filter((l) => /ataque furtivo/i.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)d6/)![1]])).toEqual([[1, "1"], [4, "2"], [7, "3"], [10, "4"]]);
    expect(c.levels.filter((l) => l.special === "Talento adicional").map((l) => l.level)).toEqual([5, 9]);
  });
  it("exige BBA +6, tendência não Leal, Usar Arma Exótica (espada bastarda)", () => {
    expect(c.requirements.bab).toBe("+6");
    expect(c.requirements.other[0]).toBe("Tendência: Qualquer uma, exceto Leal");
    expect(c.requirements.feats).toEqual(["Usar Arma Exótica (espada bastarda)"]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Infâmia")).toMatch(/-4 de penalidade em todos os testes de perícias baseadas em Carisma/);
    expect(f("Ex-Samurais")).toMatch(/samurai de 13º nível poderia se tornar imediatamente um ronin de 10º nível/);
  });
});
