import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Cavaleiro do Cálice (pp. 31-33)", () => {
  const c = P.find((x) => x.id === "cg-cavaleiro-do-calice")!;
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
  it("eliminar demônios +1/+2/+3/+4 nos níveis 1,3,6,9; coragem celestial nos níveis 2,5,8", () => {
    expect(c.levels.filter((l) => /Eliminar demônios/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)\//)![1]])).toEqual([[1, "1"], [3, "2"], [6, "3"], [9, "4"]]);
    expect(c.levels.filter((l) => /Coragem celestial/.test(l.special)).map((l) => l.level)).toEqual([2, 5, 8]);
  });
  it("magias por dia: 10 linhas, não diminuem, terminam em 2/2/2/1; lista com 4 círculos", () => {
    const s = c.spellsPerDay!;
    expect(s).toHaveLength(10);
    expect(s[9]).toEqual([2, 2, 2, 1]);
    for (let i = 1; i < 10; i++) s[i].forEach((v, k) => { if (s[i - 1][k] !== null) expect(v! >= s[i - 1][k]!).toBe(true); });
    expect(Object.keys(c.spellList!)).toEqual(["1", "2", "3", "4"]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Censurar")).toMatch(/9 m.*CD 10 \+ nível do cavaleiro do Cálice \+ modificador de Carisma/);
    expect(f("Conjuração")).toMatch(/\+2 ao teste de conjurador.*\+2 na CD/);
    expect(c.requirements.bab).toBe("+8");
    expect(c.requirements.other).toHaveLength(3);
  });
});
