import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Destruidor (pp. 45-46)", () => {
  const c = P.find((x) => x.id === "cg-destruidor")!;
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
  it("toque da dor 1-3/dia (1,4,7), aura de medo 1-3/dia com alcance 3/6/9 m (2,5,8), corte cruel 1-3/dia (3,6,9)", () => {
    expect(c.levels.filter((l) => /Toque da dor/.test(l.special)).map((l) => l.level)).toEqual([1, 4, 7]);
    expect(c.levels.filter((l) => /Aura de medo/.test(l.special)).map((l) => [l.level, l.special.match(/(\d) m/)![1]])).toEqual([[2, "3"], [5, "6"], [8, "9"]]);
    expect(c.levels.filter((l) => /Corte cruel/.test(l.special)).map((l) => l.level)).toEqual([3, 6, 9]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Toque da Dor")).toMatch(/1d8 pontos de dano \+1 por nível.*1d4 pontos de dano \+1 por nível de destruidor/);
    expect(f("Corte Cruel")).toMatch(/1d4 pontos de dano temporário na Constituição/);
    expect(f("Ilusão")).toMatch(/CD 10 \+ nível da classe destruidor \+ modificador de Carisma/);
    expect(c.requirements.other).toContain("Tendência: Caótico e Mau ou Neutro e Mau");
  });
});
