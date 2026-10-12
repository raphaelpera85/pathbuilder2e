import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Chantre de Guerra (pp. 40-42)", () => {
  const c = P.find((x) => x.id === "cg-chantre-de-guerra")!;
  it("d8, 10 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("habilidades de atuação aparecem nos níveis certos: 1,3,5,7,8,10", () => {
    expect(c.levels.filter((l) => l.special !== "—").map((l) => l.level)).toEqual([1, 3, 5, 7, 8, 10]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Inspirar Tolerância")).toMatch(/9 graduações.*\+2 pontos de vida temporários por nível/);
    expect(f("Inspirar Fascínio")).toMatch(/CD 10 \+ nível de classe do chantre \+ modificador de Carisma/);
    expect(f("Grito de Batalha")).toMatch(/\+4 de bônus de aprimoramento na Força/);
    expect(f("Inspirar Legiões")).toMatch(/\+2 de bônus de competência nas jogadas de dano/);
    expect(c.requirements.bab).toBe("+4");
  });
});
