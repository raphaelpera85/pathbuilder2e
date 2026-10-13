import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Mestre Bêbado (pp. 75-76)", () => {
  const c = P.find((x) => x.id === "cg-mestre-bebado")!;
  it("d8, 10 níveis, BAB incomum (não full), Fort/Ref fortes, Von fraco", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    expect(c.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6", "+6", "+7"]);
    c.levels.forEach((l) => {
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(Math.floor(l.level / 3));
    });
  });
  it("exige bônus base de ataque DESARMADO, não BBA normal", () => {
    expect(c.requirements.bab).toBe("+4 (bônus base de ataque desarmado)");
  });
  it("bônus na CA +1 no 4º, +2 no 9º; dano improvisado 1d4→1d8→1d12", () => {
    expect(c.levels.find((l) => l.level === 4)!.special).toMatch(/Bônus na CA \+1/);
    expect(c.levels.find((l) => l.level === 9)!.special).toMatch(/Bônus na CA \+2/);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Investida Espiralada")).toMatch(/CD 10 \+ nível de classe do mestre bêbado \+ modificador de Sabedoria/);
    expect(f("Sopro de Fogo")).toMatch(/3d12 pontos de dano de fogo num cone de 6 metros/);
    expect(f("Improvisar Armas Superior")).toMatch(/1d12 pontos de dano adicional/);
  });
});
