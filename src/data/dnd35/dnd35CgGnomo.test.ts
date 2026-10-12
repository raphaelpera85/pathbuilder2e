import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Gnomo Matador de Gigantes (pp. 52-53)", () => {
  const c = P.find((x) => x.id === "cg-gnomo-matador-de-gigantes")!;
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
  it("inimigo predileto (gigantes) +2 a +8 nos níveis 1,4,7,10", () => {
    expect(c.levels.filter((l) => /Inimigo predileto/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[1, "2"], [4, "4"], [7, "6"], [10, "8"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Combate Engenhoso")).toMatch(/\+4 de bônus na CA contra gigantes ou \+2 de bônus de esquiva/);
    expect(f("Mobilidade Aprimorada")).toMatch(/\+4 de bônus de esquiva adicional/);
    expect(f("Amortecer Impacto")).toMatch(/CD = dano sofrido/);
    expect(c.requirements.other).toContain("Raça: Gnomo");
  });
});
