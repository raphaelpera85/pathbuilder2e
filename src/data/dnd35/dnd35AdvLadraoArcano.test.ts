import { describe, expect, it } from "vitest";
import { CG_ADV_LADRAO_ARCANO } from "./dnd35AdvLadraoArcano";

describe("Livro Completo do Aventureiro: Ladrão Arcano (Cap. 1, pp. 10-16)", () => {
  it("20 níveis, d6, 8+Int pontos de perícia, 3/4 BBA (progressão de ladino)", () => {
    expect(CG_ADV_LADRAO_ARCANO.levels).toHaveLength(20);
    expect(CG_ADV_LADRAO_ARCANO.hitDie).toBe("d6");
    expect(CG_ADV_LADRAO_ARCANO.levels[19].bab).toBe("+15/+10/+5");
  });
  it("ataque furtivo cresce +1d6 por 4 níveis (1º, 5º, 9º, 13º, 17º) até +5d6", () => {
    const comAtaque = CG_ADV_LADRAO_ARCANO.levels.filter((l) => /ataque furtivo/i.test(l.special)).map((l) => l.level);
    expect(comAtaque).toEqual([1, 5, 9, 13, 17]);
    expect(CG_ADV_LADRAO_ARCANO.levels[16].special).toMatch(/\+5d6/);
  });
  it("roubar magia sobe de nível máximo a cada 2 níveis pares, atingindo 9º círculo no 18º nível", () => {
    const niveisMagia = CG_ADV_LADRAO_ARCANO.levels.filter((l) => /roubar magia \(/i.test(l.special)).map((l) => l.level);
    expect(niveisMagia).toEqual([1, 4, 6, 8, 10, 12, 14, 16, 18]);
    expect(CG_ADV_LADRAO_ARCANO.levels[17].special).toMatch(/roubar magia \(9º\)/i);
  });
  it("conjuração só começa no 4º nível (magias diárias/conhecidas vazias antes disso)", () => {
    for (const l of CG_ADV_LADRAO_ARCANO.levels.slice(0, 3)) {
      expect(l.dailySpells.l1).toBe("—");
      expect(l.knownSpells.l1).toBe("—");
    }
    expect(CG_ADV_LADRAO_ARCANO.levels[3].dailySpells.l1).toBe(0);
    expect(CG_ADV_LADRAO_ARCANO.levels[3].knownSpells.l1).toBe("2¹");
  });
  it("no 20º nível: 5 magias conhecidas em cada um dos 4 círculos, 3/3/3/2 diárias", () => {
    const l20 = CG_ADV_LADRAO_ARCANO.levels[19];
    expect(l20.knownSpells).toEqual({ l1: 5, l2: 5, l3: 5, l4: 5 });
    expect(l20.dailySpells).toEqual({ l1: 3, l2: 3, l3: 3, l4: 2 });
  });
  it("graça arcana cresce +1 (2º), +2 (11º), +3 (20º); roubar resistência a energia 10→20→30", () => {
    expect(CG_ADV_LADRAO_ARCANO.levels[1].special).toMatch(/graça arcana \+1/i);
    expect(CG_ADV_LADRAO_ARCANO.levels[10].special).toMatch(/graça arcana \+2/i);
    expect(CG_ADV_LADRAO_ARCANO.levels[19].special).toMatch(/graça arcana \+3/i);
    expect(CG_ADV_LADRAO_ARCANO.levels[2].special).toMatch(/resistência a energia 10/i);
    expect(CG_ADV_LADRAO_ARCANO.levels[10].special).toMatch(/resistência a energia 20/i);
    expect(CG_ADV_LADRAO_ARCANO.levels[18].special).toMatch(/resistência a energia 30/i);
  });
  it("só conjura das escolas abjuração/adivinhação/encantamento/ilusão/transmutação, baseado em Carisma", () => {
    expect(CG_ADV_LADRAO_ARCANO.spellcasting).toMatch(/abjuração, adivinhação, encantamento, ilusão e transmutação/);
    expect(CG_ADV_LADRAO_ARCANO.spellcasting).toMatch(/Carisma/);
  });
});
