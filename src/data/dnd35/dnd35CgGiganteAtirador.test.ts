import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Gigante Atirador (pp. 50-51)", () => {
  const c = P.find((x) => x.id === "cg-gigante-atirador")!;
  it("d10, apenas 3 níveis, BAB completo, Ref forte, Fort/Von fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(3);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.fort);
    });
  });
  it("truque de duas mãos escolhido nos níveis 2 e 3", () => {
    expect(c.levels.filter((l) => /Truque de Duas Mãos/.test(l.special)).map((l) => l.level)).toEqual([2, 3]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Truque de Duas Mãos")).toMatch(/Ataque de Área.*CD 10 \+ bônus de ataque à distância.*Meteoro.*Disparar Sobrecarga.*Ataque Poderoso à Distância/s);
    expect(c.requirements.other).toContain("Especial: criaturas Grandes ou maiores");
    expect(c.requirements.feats).toHaveLength(3);
  });
});
