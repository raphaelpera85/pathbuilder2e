import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Cavaleiro do Dragão Púrpura (pp. 34-35)", () => {
  const c = P.find((x) => x.id === "cg-cavaleiro-do-dragao-purpura")!;
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
  it("inspirar coragem 1/dia no 2º e 2/dia no 4º", () => {
    expect(c.levels.filter((l) => /inspirar coragem/i.test(l.special)).map((l) => [l.level, l.special.match(/\((\d)\/dia\)/)![1]])).toEqual([[2, "1"], [4, "2"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Escudo Heróico")).toMatch(/\+4 de bônus de circunstância/);
    expect(f("Brado")).toMatch(/Três vezes por dia.*\+1 de bônus de moral.*18 m/);
    expect(f("Medo")).toMatch(/CD 10 \+ nível de classe do cavaleiro \+ modificador de Carisma/);
    expect(f("Defesa Final")).toMatch(/2d10 pontos de vida temporários/);
    expect(c.requirements.bab).toBe("+5");
    expect(c.requirements.feats).toEqual(["Combate Montado", "Negociador"]);
  });
});
