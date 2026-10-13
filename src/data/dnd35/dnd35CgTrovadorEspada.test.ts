import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Trovador da Espada (pp. 90-91) — última do Cap. 2", () => {
  const c = P.find((x) => x.id === "cg-trovador-espada")!;
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
  it("ganha nível de conjurador arcano nos níveis ímpares (1,3,5,7,9)", () => {
    expect(c.levels.filter((l) => /nível de classe arcana existente/.test(l.special)).map((l) => l.level)).toEqual([1, 3, 5, 7, 9]);
  });
  it("exige raça Elfo/meio-elfo, Foco em Arma (espada longa ou sabre), magia arcana", () => {
    expect(c.requirements.other[0]).toBe("Raça: Elfo ou meio-elfo");
    expect(c.requirements.feats).toContain("Foco em Arma (espada longa ou sabre)");
    expect(c.requirements.bab).toBe("+5");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Canção da Velocidade")).toMatch(/2º nível ou inferior.*No 8º nível, ele poderá acelerar uma única magia de 4º nível ou inferior/);
    expect(f("Canção da Fúria")).toMatch(/-2 de penalidade/);
  });
});
