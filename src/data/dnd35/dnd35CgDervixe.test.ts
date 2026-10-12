import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Dervixe (pp. 43-44)", () => {
  const c = P.find((x) => x.id === "cg-dervixe")!;
  it("d10, 10 níveis, BAB completo, Fort fraco, Ref/Von fortes", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
      expect(l.will).toBe(l.ref);
    });
  });
  it("bônus CA sobe +1,+2,+3 a cada 4-5 níveis e dança dervixe 1-5/dia nos ímpares", () => {
    expect(c.levels.map((l) => l.acBonus)).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3]);
    const uses = c.levels.filter((l) => /dança dervixe \d\/dia/i.test(l.special)).map((l) => [l.level, l.special.match(/(\d)\/dia/i)![1]]);
    expect(uses).toEqual([[1, "1"], [3, "2"], [5, "3"], [7, "4"], [9, "5"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Dança Dervixe")).toMatch(/\+1 no 1º nível e aumenta em \+1 a cada dois níveis \(3º, 5º, 7º e 9º níveis\)/);
    expect(f("Aparar Complexo")).toMatch(/\+4 de bônus na CA/);
    expect(f("Reação Aprimorada")).toMatch(/\+2 de bônus nas jogadas de Iniciativa/);
    expect(c.requirements.bab).toBe("+5");
    expect(c.requirements.feats).toHaveLength(4);
  });
});
