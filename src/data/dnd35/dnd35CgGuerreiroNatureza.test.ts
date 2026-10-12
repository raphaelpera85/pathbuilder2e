import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Guerreiro da Natureza (pp. 54-55)", () => {
  const c = P.find((x) => x.id === "cg-guerreiro-da-natureza")!;
  it("d10, 5 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("conjuração (+1 nível de classe divina) nos níveis pares; armas naturais nos ímpares", () => {
    expect(c.levels.filter((l) => /classe divina anterior/.test(l.special)).map((l) => l.level)).toEqual([2, 4]);
    expect(c.levels.filter((l) => /Armas naturais/.test(l.special)).map((l) => l.level)).toEqual([1, 3, 5]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Armas Naturais")).toMatch(/\+3 pontos de dano adicional.*Fluxo do Rio.*Três vezes por dia/);
    expect(f("Selvagem")).toMatch(/druida 8\/guerreiro da natureza 3.*druida de 11º nível/);
    expect(c.requirements.other).toContain("Tendência: Qualquer Neutro");
  });
});
