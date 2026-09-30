import { describe, expect, it } from "vitest";
import { DND35_CLASS_TABLES, DND35_MONK_EXTRAS, dnd35ClassFeaturesUpTo } from "./dnd35ClassFeatures";
import { DND35_CLASSES } from "./dnd35Classes";
import { dnd35BaseAttacks, dnd35BaseSave, formatDnd35BaseAttack } from "./dnd35Progression";

/** Auditoria contra as Tabelas 3-3, 3-11, 3-12 e 3-14 do Livro do Jogador. */
describe("D&D 3.5 — tabelas de classe sem magia", () => {
  it("cada tabela tem 20 níveis e página impressa", () => {
    for (const t of Object.values(DND35_CLASS_TABLES)) {
      expect(t.rows.map((r) => r.level)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
      expect(t.sourcePage).toBeGreaterThan(0);
    }
  });

  // Duas fontes independentes: a tabela da classe e a Tabela 3-1 + progressão
  // declarada em dnd35Classes.ts. Divergência = erro de transcrição em uma delas.
  it("BBA e resistências impressos na tabela da classe coincidem com a Tabela 3-1", () => {
    for (const t of Object.values(DND35_CLASS_TABLES)) {
      const cls = DND35_CLASSES[t.classId];
      for (const row of t.rows) {
        expect(row.baseAttack, `${t.classId} ${row.level}º BBA`).toBe(formatDnd35BaseAttack(dnd35BaseAttacks(cls.babProgression, row.level)));
        expect(row.fortitude, `${t.classId} ${row.level}º Fort`).toBe(dnd35BaseSave(cls.goodSaves, "fortitude", row.level));
        expect(row.reflexos, `${t.classId} ${row.level}º Ref`).toBe(dnd35BaseSave(cls.goodSaves, "reflexos", row.level));
        expect(row.vontade, `${t.classId} ${row.level}º Von`).toBe(dnd35BaseSave(cls.goodSaves, "vontade", row.level));
      }
    }
  });

  it("Bárbaro (p. 25): fúria 1/dia no 1º, 6/dia no 20º; Redução de dano 5/- no 19º", () => {
    const rows = DND35_CLASS_TABLES.barbaro.rows;
    expect(rows[0].special).toContain("fúria 1/dia");
    expect(rows[18].special).toEqual(["Redução de dano 5/-"]);
    expect(rows[19].special).toEqual(["Fúria poderosa", "fúria 6/dia"]);
  });

  it("Guerreiro (p. 42): Talento Adicional nos níveis impressos 1, 2, 4, 6 ... 20", () => {
    const levels = DND35_CLASS_TABLES.guerreiro.rows.filter((r) => r.special.includes("Talento Adicional")).map((r) => r.level);
    expect(levels).toEqual([1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it("Ladino (p. 43): ataque furtivo de +1d6 (1º) a +10d6 (19º) nos níveis ímpares; 14º e 20º sem habilidade", () => {
    const sneak = DND35_CLASS_TABLES.ladino.rows.flatMap((r) => r.special.filter((s) => s.startsWith("Ataque furtivo")).map((s) => [r.level, s]));
    expect(sneak).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((l, i) => [l, `Ataque furtivo +${i + 1}d6`]));
    expect(DND35_CLASS_TABLES.ladino.rows[13].special).toEqual([]);
    expect(DND35_CLASS_TABLES.ladino.rows[19].special).toEqual([]);
  });

  it("Monge (p. 49): rajada -2/-2 no 1º; 2d10 desarmado, +4 CA e +18 m no 20º", () => {
    expect(DND35_MONK_EXTRAS).toHaveLength(20);
    expect(DND35_MONK_EXTRAS[0]).toMatchObject({ flurryAttack: "-2/-2", unarmedDamageMedium: "1d6", acBonus: 0, unarmoredSpeedBonusM: 0 });
    expect(DND35_MONK_EXTRAS[7].flurryAttack).toBe("+5/+5/+0");
    expect(DND35_MONK_EXTRAS[19]).toMatchObject({ flurryAttack: "+15/+15/+15/+10/+5", unarmedDamageMedium: "2d10", acBonus: 4, unarmoredSpeedBonusM: 18 });
  });

  it("rajada de golpes do monge = BBA com -2 nos níveis 1-4, -1 nos 5-8 e sem penalidade a partir do 9º, com ataque extra", () => {
    // Regra do texto da classe; confere a coluna transcrita célula a célula
    // no primeiro ataque.
    for (const extra of DND35_MONK_EXTRAS) {
      const bab = dnd35BaseAttacks("media", extra.level)[0];
      const penalty = extra.level <= 4 ? -2 : extra.level <= 8 ? -1 : 0;
      expect(Number(extra.flurryAttack.split("/")[0]), `nível ${extra.level}`).toBe(bab + penalty);
    }
  });

  it("dnd35ClassFeaturesUpTo acumula as habilidades por nível", () => {
    expect(dnd35ClassFeaturesUpTo("barbaro", 2).map((f) => f.name)).toEqual(["Movimento Rápido", "analfabetismo", "fúria 1/dia", "Esquiva sobrenatural"]);
    expect(dnd35ClassFeaturesUpTo("mago", 1).map((f) => f.name)).toEqual(["Invocar familiar", "escrever pergaminho"]);
    expect(dnd35ClassFeaturesUpTo("classe-inexistente", 1)).toEqual([]);
  });
});
