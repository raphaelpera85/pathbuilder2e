import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Lâmina Arcana (pp. 65-66)", () => {
  const c = P.find((x) => x.id === "cg-lamina-arcana")!;
  it("d8, 10 níveis, BAB completo, Fort/Von fortes, Ref fraco", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(Math.floor(l.level / 3));
    });
  });
  it("ignorar falha arcana 10% a 30% nos níveis ímpares; canalizar magia 3-5/dia nos pares 4,6,8", () => {
    expect(c.levels.filter((l) => /Ignorar falha arcana/.test(l.special)).map((l) => [l.level, l.special.match(/(\d+)%/)![1]])).toEqual([[1, "10"], [3, "15"], [5, "20"], [7, "25"], [9, "30"]]);
    expect(c.levels.filter((l) => /Canalizar magia \d/.test(l.special)).map((l) => [l.level, l.special.match(/(\d)\/dia/)![1]])).toEqual([[4, "3"], [6, "4"], [8, "5"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Ignorar Falha Arcana")).toMatch(/reduzido em 10%.*incrementos de 5%.*até o limite de 30%/);
    expect(c.requirements.bab).toBe("+4");
  });
});

describe("Livro Completo do Guerreiro: Lâmina Invisível (pp. 67-69)", () => {
  const c = P.find((x) => x.id === "cg-lamina-invisivel")!;
  it("d6, 5 níveis, BAB completo, Ref forte, Fort/Von fracos, sem exigência de BBA", () => {
    expect(c.hitDie).toBe(6);
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
    });
    expect(c.requirements.bab).toBe("—");
  });
  it("ataque furtivo +1d6/+2d6/+3d6 nos níveis 1,3,5", () => {
    expect(c.levels.filter((l) => /Ataque furtivo/.test(l.special)).map((l) => [l.level, l.special.match(/\+(\d)d6/)![1]])).toEqual([[1, "1"], [3, "2"], [5, "3"]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Sangramento")).toMatch(/CD 15.*dano cumulativo/);
    expect(f("Defesa Irrestrita")).toMatch(/1 ponto do seu modificador de Inteligência/);
    expect(c.requirements.feats).toHaveLength(3);
  });
});
