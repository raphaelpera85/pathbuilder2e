import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Caçador Sombrio (pp. 27-29)", () => {
  const c = P.find((x) => x.id === "cg-cacador-sombrio")!;
  it("d8, 5 níveis, BAB completo, Fort/Von fracos, Ref forte", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Visão")).toMatch(/2º nível, com alcance de 9 m.*4º nível.*mais 9 m/);
    expect(f("Matiz")).toMatch(/\+10 de bônus de circunstância/);
    expect(f("Ataque Mortal")).toMatch(/CD 10 \+ nível de classe do caçador sombrio \+ modificador de Inteligência.*1d6 rodadas/);
    expect(c.levels.filter((l) => l.sneakAttack)).toHaveLength(1);
    expect(c.requirements.skills).toHaveLength(4);
    expect(c.requirements.feats).toEqual(["Lutar às Cegas", "Rastrear"]);
  });
});
