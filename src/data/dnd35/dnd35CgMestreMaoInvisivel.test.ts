import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Mestre da Mão Invisível (pp. 77-79)", () => {
  const c = P.find((x) => x.id === "cg-mestre-mao-invisivel")!;
  it("d4, 2+Int, 5 níveis, BAB completo, Von forte, Fort/Ref fracos, sem exigência de BBA", () => {
    expect(c.hitDie).toBe(4);
    expect(c.skillPointsPerLevel).toBe("2 + modificador de Inteligência");
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(2 + Math.floor(l.level / 2));
    });
    expect(c.requirements.bab).toBe("—");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Vôo")).toMatch(/1d6 pontos de dano a cada 3 m \(máximo 20d6\)/);
    expect(f("Lançar aos Céus")).toMatch(/3 m x nível de conjurador/);
    expect(c.requirements.skills).toEqual(["Concentração 8 graduações"]);
  });
});
