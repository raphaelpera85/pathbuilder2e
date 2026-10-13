import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Senhor das Rochas (pp. 88-90)", () => {
  const c = P.find((x) => x.id === "cg-senhor-rochas")!;
  it("d8, 10 níveis, BAB completo, Fort forte, Ref/Von fracos, raça Anão", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
    expect(c.requirements.other[0]).toBe("Raça: Anão");
  });
  it("poder rochoso a cada nível a partir do 2º (9 escolhas: 2,3,4,5,6,7,8,9,10)", () => {
    expect(c.levels.filter((l) => /Poder rochoso/.test(l.special)).map((l) => l.level)).toEqual([2, 4, 6, 8, 10]);
  });
  it("12 opções de poder rochoso descritas em um único bloco de texto", () => {
    const t = c.features.find((f) => f.name === "Poder Rochoso")!.text;
    for (const nome of ["Abraço da Terra", "Mágica da Terra", "Vigor da Terra", "Força da Terra", "Poder da Terra", "Sombras da Terra", "Gravidade", "Pele Rochosa", "Invocar Elemental da Terra", "Moldar Rochas", "Mesclar-se às Rochas", "Conto das Rochas", "Terremoto"]) {
      expect(t).toContain(nome);
    }
  });
  it("valores do texto", () => {
    expect(c.features.find((f) => f.name.startsWith("Sangue Terreno"))!.text).toMatch(/1d8 \+ nível de classe do senhor das rochas/);
    expect(c.requirements.bab).toBe("+5");
  });
});
