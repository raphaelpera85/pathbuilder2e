import { describe, expect, it } from "vitest";
import {
  DND35_BONUS_SPELLS_BY_MODIFIER, DND35_BONUS_TABLE_MAX_MODIFIER,
  dnd35AbilityModifier, dnd35BonusSpells, dnd35MinimumCastingScore, dnd35SpellSaveDc,
} from "./dnd35AbilityScores";
import { dnd35CharacterSpells, formatDnd35CharacterSpells } from "./dnd35Spellcasting";

/** Auditoria contra a Tabela 1-1 (p. 8). */
describe("D&D 3.5 — Tabela 1-1 (p. 8)", () => {
  it("modificadores impressos: 2-3 → -4, 10-11 → 0, 18-19 → +4, 44-45 → +17", () => {
    expect([2, 3].map(dnd35AbilityModifier)).toEqual([-4, -4]);
    expect([10, 11].map(dnd35AbilityModifier)).toEqual([0, 0]);
    expect([18, 19].map(dnd35AbilityModifier)).toEqual([4, 4]);
    expect([44, 45].map(dnd35AbilityModifier)).toEqual([17, 17]);
    expect(dnd35AbilityModifier(1)).toBe(-5);
  });

  it("tabela impressa cobre os modificadores +1 a +17 com 9 colunas", () => {
    expect(Object.keys(DND35_BONUS_SPELLS_BY_MODIFIER).map(Number)).toEqual(Array.from({ length: 17 }, (_, i) => i + 1));
    expect(Object.values(DND35_BONUS_SPELLS_BY_MODIFIER).every((r) => r.length === 9)).toBe(true);
    expect(DND35_BONUS_TABLE_MAX_MODIFIER).toBe(17);
  });

  // Conferência da transcrição: todas as 153 células contra a regra d20.
  it("todas as células impressas = floor((mod - nível)/4) + 1 quando mod >= nível", () => {
    for (const [mod, row] of Object.entries(DND35_BONUS_SPELLS_BY_MODIFIER)) {
      row.forEach((value, i) => {
        const lvl = i + 1;
        const m = Number(mod);
        expect(value, `mod ${m} nível ${lvl}`).toBe(m >= lvl ? Math.floor((m - lvl) / 4) + 1 : 0);
      });
    }
  });

  it("linhas impressas conferidas: 20-21 (+5) = 2 1 1 1 1; 44-45 (+17) = 5 4 4 4 4 3 3 3 3", () => {
    expect(DND35_BONUS_SPELLS_BY_MODIFIER[5].slice(0, 5)).toEqual([2, 1, 1, 1, 1]);
    expect(DND35_BONUS_SPELLS_BY_MODIFIER[17]).toEqual([5, 4, 4, 4, 4, 3, 3, 3, 3]);
  });

  it("nível 0 nunca recebe magia adicional; valores <= 11 não recebem nenhuma", () => {
    expect(dnd35BonusSpells(45, 0)).toBe(0);
    expect(dnd35BonusSpells(11, 1)).toBe(0);
    expect(dnd35BonusSpells(12, 1)).toBe(1);
  });

  it("acima da tabela impressa ('etc...') segue a mesma regra", () => {
    expect(dnd35BonusSpells(46, 1)).toBe(5); // mod +18
    expect(dnd35BonusSpells(46, 9)).toBe(3);
  });

  it("mínimo para conjurar e CD (texto das classes, p.ex. Mago p. 47)", () => {
    expect(dnd35MinimumCastingScore(0)).toBe(10);
    expect(dnd35MinimumCastingScore(1)).toBe(11);
    expect(dnd35SpellSaveDc(1, 16)).toBe(14);
  });
});

describe("D&D 3.5 — magias do personagem (classe + atributo)", () => {
  it("Mago 1º nível com Int 16: 0: 3, 1º: 1 + 1 atributo = 2", () => {
    const spells = dnd35CharacterSpells("mago", 1, 16);
    expect(spells).toEqual([
      { spellLevel: 0, castable: true, base: 3, domain: 0, bonus: 0, perDay: 3 },
      { spellLevel: 1, castable: true, base: 1, domain: 0, bonus: 1, perDay: 2 },
    ]);
  });

  it("Mago com Int 10 não conjura 1º nível (mínimo 11)", () => {
    const spells = dnd35CharacterSpells("mago", 1, 10);
    expect(spells[1]).toMatchObject({ castable: false, perDay: 0 });
    expect(formatDnd35CharacterSpells(spells, "Int")).toBe("0: 3 · 1º: — (Int mínima 11)");
  });

  it("Clérigo 1º com Sab 15: 1º nível = 1 + 1 domínio + 1 atributo", () => {
    const spells = dnd35CharacterSpells("clerigo", 1, 15);
    expect(spells[1]).toMatchObject({ base: 1, domain: 1, bonus: 1, perDay: 3 });
    expect(formatDnd35CharacterSpells(spells, "Sab")).toBe("0: 3 · 1º: 3 (1 + 1 domínio + 1 atributo)");
  });

  it("Paladino 4º: '0' impresso só vale com Sab alta", () => {
    expect(dnd35CharacterSpells("paladino", 4, 11)[0]).toMatchObject({ perDay: 0 });
    expect(dnd35CharacterSpells("paladino", 4, 12)[0]).toMatchObject({ perDay: 1 });
    expect(dnd35CharacterSpells("paladino", 1, 18)).toEqual([]);
  });

  it("Bardo 2º: magia conhecida '2*' de 1º nível só com Car que conceda magia adicional", () => {
    expect(dnd35CharacterSpells("bardo", 2, 11)[1]).toMatchObject({ known: 0, perDay: 0 });
    expect(dnd35CharacterSpells("bardo", 2, 12)[1]).toMatchObject({ known: 2, perDay: 1 });
  });

  it("Feiticeiro 1º com Car 14: 0: 5 conhece 4 · 1º: 3+1=4 conhece 2", () => {
    expect(formatDnd35CharacterSpells(dnd35CharacterSpells("feiticeiro", 1, 14), "Car"))
      .toBe("0: 5, conhece 4 · 1º: 4 (3 + 1 atributo), conhece 2");
  });

  it("classe sem magia retorna vazio", () => {
    expect(dnd35CharacterSpells("guerreiro", 20, 30)).toEqual([]);
  });
});
