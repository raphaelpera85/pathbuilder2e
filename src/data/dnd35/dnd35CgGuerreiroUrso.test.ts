import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Guerreiro Urso (pp. 57-58)", () => {
  const c = P.find((x) => x.id === "cg-guerreiro-urso")!;
  it("d12, 10 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(12);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("formas de urso nos níveis 1 (negro), 5 (marrom), 10 (atroz); faro no 3º; fúria +1/dia no 7º", () => {
    expect(c.levels[0].special).toContain("negro");
    expect(c.levels[4].special).toContain("marrom");
    expect(c.levels[9].special).toContain("atroz");
    expect(c.levels[2].special).toBe("Faro");
    expect(c.levels[6].special).toContain("Fúria +1/dia");
  });
  it("bônus de atributo por forma no texto", () => {
    const f = c.features.find((x) => x.name.startsWith("Forma de Urso"))!.text;
    expect(f).toMatch(/negro.*\+8 de bônus de Força, \+2 de Destreza e \+4 de Constituição/);
    expect(f).toMatch(/marrom.*\+16 de bônus de Força, \+2 de Destreza e \+8 de Constituição/);
    expect(f).toMatch(/atroz.*\+20 de bônus de Força, \+2 de Destreza e \+8 de Constituição/);
    expect(c.requirements.bab).toBe("+7");
  });
});
