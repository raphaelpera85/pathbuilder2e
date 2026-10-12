import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Cavaleiro de Thay (pp. 38-39)", () => {
  const c = P.find((x) => x.id === "cg-cavaleiro-de-thay")!;
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
  it("horrores de Thay sobe de +2/+1 para +4/+2 no 4º nível", () => {
    expect(c.levels[0].special).toContain("+2 medo, +1 feitiços");
    expect(c.levels[3].special).toContain("+4 medo, +2 feitiços");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Favor do Zulkir")).toMatch(/\+2 de bônus de resistência nos testes de Reflexos/);
    expect(f("Defesa Final")).toMatch(/2d10 pontos de vida temporários/);
    expect(f("Campeão do Zulkir")).toMatch(/\+2 de bônus de sorte.*\+4 de bônus moral nos testes de Intimidação/);
    expect(c.requirements.other).toContain("Raça: Humano");
    expect(c.requirements.bab).toBe("+5");
  });
});
