import { describe, expect, it } from "vitest";
import {
  DND35_BAB_BY_LEVEL, DND35_SAVE_BY_LEVEL, DND35_CHARACTER_LEVELS,
  dnd35BaseAttacks, dnd35BaseSave, formatDnd35BaseAttack,
} from "./dnd35Progression";

/** Auditoria contra as Tabelas 3-1 e 3-2 (p. 22). */
describe("D&D 3.5 — Tabela 3-1 (p. 22)", () => {
  it("tem 20 níveis em todas as colunas", () => {
    for (const col of [...Object.values(DND35_BAB_BY_LEVEL), ...Object.values(DND35_SAVE_BY_LEVEL)]) {
      expect(col).toHaveLength(20);
    }
  });

  // Conferência cruzada: os valores impressos seguem as progressões padrão
  // do d20. Um erro de transcrição em qualquer célula quebra este teste.
  it("transcrição coincide com as fórmulas da progressão em todas as 100 células", () => {
    for (let level = 1; level <= 20; level += 1) {
      const i = level - 1;
      expect(DND35_BAB_BY_LEVEL.boa[i]).toBe(level);
      expect(DND35_BAB_BY_LEVEL.media[i]).toBe(Math.floor((3 * level) / 4));
      expect(DND35_BAB_BY_LEVEL.ruim[i]).toBe(Math.floor(level / 2));
      expect(DND35_SAVE_BY_LEVEL.bom[i]).toBe(2 + Math.floor(level / 2));
      expect(DND35_SAVE_BY_LEVEL.ruim[i]).toBe(Math.floor(level / 3));
    }
  });

  it("ataques múltiplos como impressos: 16º boa +16/+11/+6/+1; 20º média +15/+10/+5; 12º ruim +6/+1", () => {
    expect(formatDnd35BaseAttack(dnd35BaseAttacks("boa", 16))).toBe("+16/+11/+6/+1");
    expect(formatDnd35BaseAttack(dnd35BaseAttacks("media", 20))).toBe("+15/+10/+5");
    expect(formatDnd35BaseAttack(dnd35BaseAttacks("ruim", 12))).toBe("+6/+1");
    expect(formatDnd35BaseAttack(dnd35BaseAttacks("ruim", 1))).toBe("+0");
  });

  it("resistência base no 1º nível: boa +2, ruim +0", () => {
    expect(dnd35BaseSave(["fortitude"], "fortitude", 1)).toBe(2);
    expect(dnd35BaseSave(["fortitude"], "reflexos", 1)).toBe(0);
  });
});

describe("D&D 3.5 — Tabela 3-2 (p. 22)", () => {
  it("XP e graduações máximas conferem com linhas impressas", () => {
    const row = (l: number) => DND35_CHARACTER_LEVELS[l - 1];
    expect(row(1)).toMatchObject({ xp: 0, maxClassSkillRanks: 4, maxCrossClassSkillRanks: 2 });
    expect(row(2)).toMatchObject({ xp: 1000, maxClassSkillRanks: 5, maxCrossClassSkillRanks: 2.5 });
    expect(row(10)).toMatchObject({ xp: 45000, maxClassSkillRanks: 13, maxCrossClassSkillRanks: 6.5 });
    expect(row(20)).toMatchObject({ xp: 190000, maxClassSkillRanks: 23, maxCrossClassSkillRanks: 11.5 });
  });

  it("XP necessária = nível x (nível-1) x 500 (confere a coluna inteira)", () => {
    for (const r of DND35_CHARACTER_LEVELS) expect(r.xp).toBe(r.level * (r.level - 1) * 500);
  });

  it("talentos nos níveis 1,3,6,9,12,15,18 e aumentos de habilidade nos 4,8,12,16,20", () => {
    expect(DND35_CHARACTER_LEVELS.filter((r) => r.gainsFeat).map((r) => r.level)).toEqual([1, 3, 6, 9, 12, 15, 18]);
    expect(DND35_CHARACTER_LEVELS.filter((r) => r.gainsAbilityIncrease).map((r) => r.level)).toEqual([4, 8, 12, 16, 20]);
  });
});
