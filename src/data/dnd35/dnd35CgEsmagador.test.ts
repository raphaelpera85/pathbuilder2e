import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Esmagador (pp. 47-48)", () => {
  const c = P.find((x) => x.id === "cg-esmagador")!;
  it("d10, 5 níveis, BAB completo, Fort/Ref fortes, Von fraco", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(l.fort);
    });
    expect(c.levels.map((l) => l.will)).toEqual([0, 1, 1, 1, 1]);
  });
  it("lutador eficaz +1/+2 nos níveis 2/4", () => {
    expect(c.levels.filter((l) => /Lutador eficaz/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)/)![1]])).toEqual([[2, "1"], [4, "2"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Nocautear")).toMatch(/CD 10 \+ nível de classe do esmagador \+ modificador de Sabedoria.*1d3 rodadas/);
    expect(f("Agarrar Devastador")).toMatch(/terceira rodada ou morrerá sufocada/);
    expect(c.requirements.bab).toBe("+5");
  });
});
