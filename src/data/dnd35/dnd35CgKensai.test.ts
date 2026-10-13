import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Kensai (pp. 62-65)", () => {
  const c = P.find((x) => x.id === "cg-kensai")!;
  it("d10, 10 níveis, BAB incomum (não full), Von forte, Fort/Ref fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(10);
    expect(c.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6", "+6", "+7"]);
    c.levels.forEach((l) => {
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("tabela Armas Juramentadas: 10 linhas, custo em XP crescente, bônus +1 a +10", () => {
    const t = c.boundWeaponTable!;
    expect(t).toHaveLength(10);
    expect(t[0]).toEqual({ classLevel: 1, weaponBonus: "+1", xpCost: 40 });
    expect(t[9]).toEqual({ classLevel: 10, weaponBonus: "+10*", xpCost: 40000 });
    for (let i = 1; i < 10; i++) expect(t[i].xpCost).toBeGreaterThan(t[i - 1].xpCost);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Infusão de Poder")).toMatch(/CD 15.*\+8 de bônus de Força/);
    expect(f("Transferência")).toMatch(/CD 10 \+ DV ou nível de classe do alvo/);
    expect(c.requirements.other).toContain("Tendência: Qualquer Leal");
    expect(c.requirements.bab).toBe("+5");
  });
});
