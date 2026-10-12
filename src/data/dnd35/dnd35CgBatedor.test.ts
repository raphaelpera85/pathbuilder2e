import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Batedor Halfling (pp. 20-22)", () => {
  const b = P.find((c) => c.id === "cg-batedor-halfling")!;
  it("d8, 10 níveis, BAB completo, Fort/Von fracos, Ref forte", () => {
    expect(b.hitDie).toBe(8);
    expect(b.levels).toHaveLength(10);
    b.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("bônus na CA sobe +1 a cada dois níveis: 1,1,2,2,3,3,4,4,5,5", () => {
    expect(b.levels.map((l) => l.acBonus)).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  });
  it("valores do texto", () => {
    const f = (n: string) => b.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Cavalgar Defensivamente")).toMatch(/\+2 de bônus nos testes de resistência de Reflexos e \+4 de bônus de esquiva.*\+6 m de deslocamento/);
    expect(f("Investida")).toMatch(/CD 15/);
    expect(f("Permanecer")).toMatch(/CD 20/);
    expect(f("Saltar")).toMatch(/CD 20/);
    expect(f("Inversão")).toMatch(/CD 25.*90º/);
    expect(b.requirements.skills).toHaveLength(3);
    expect(b.requirements.other).toEqual(["Raça: Halfling"]);
  });
});
