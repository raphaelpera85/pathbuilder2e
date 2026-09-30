import { describe, expect, it } from "vitest";
import { DND35_SPELL_TABLES, formatDnd35SpellRow, type Dnd35SpellTable } from "./dnd35Spellcasting";
import { DND35_CLASS_TABLES } from "./dnd35ClassFeatures";
import { DND35_CLASSES } from "./dnd35Classes";

const get = (classId: string, kind: Dnd35SpellTable["kind"]) =>
  DND35_SPELL_TABLES[classId].find((t) => t.kind === kind)!;
const base = (t: Dnd35SpellTable) => t.rows.map((r) => r.map((c) => (c ? c.base : null)));

describe("D&D 3.5 — magias por dia/conhecidas (Capítulo 3)", () => {
  it("toda classe conjuradora de dnd35Classes tem tabela de magias por dia; não-conjuradoras não têm", () => {
    for (const cls of Object.values(DND35_CLASSES)) {
      expect(Boolean(DND35_SPELL_TABLES[cls.id]), cls.id).toBe(cls.casterType !== "nenhum");
    }
  });

  it("cada tabela tem 20 linhas com o mesmo número de colunas", () => {
    for (const t of Object.values(DND35_SPELL_TABLES).flat()) {
      expect(t.rows, t.table).toHaveLength(20);
      const width = t.rows[0].length;
      expect(t.rows.every((r) => r.length === width), t.table).toBe(true);
      expect(width).toBe(t.firstSpellLevel === 1 ? 4 : t.classId === "bardo" ? 7 : 10);
    }
  });

  it("nenhuma coluna diminui ao subir de nível e um nível de magia nunca some", () => {
    for (const t of Object.values(DND35_SPELL_TABLES).flat()) {
      for (let lvl = 1; lvl < 20; lvl += 1) {
        t.rows[lvl].forEach((cell, col) => {
          const prev = t.rows[lvl - 1][col];
          if (prev) {
            expect(cell, `${t.table} nível ${lvl + 1} col ${col}`).not.toBeNull();
            expect(cell!.base).toBeGreaterThanOrEqual(prev.base);
          }
        });
      }
    }
  });

  // Duas transcrições independentes (páginas diferentes) de progressões que
  // no 3.5 são idênticas: um erro em qualquer uma quebra o teste.
  it("Clérigo (p. 31, sem o +1 de domínio) = Druida (p. 35) em todas as 200 células", () => {
    expect(base(get("clerigo", "porDia"))).toEqual(base(get("druida", "porDia")));
  });

  it("Paladino (p. 52) = Ranger (p. 56) em todas as 80 células", () => {
    expect(base(get("paladino", "porDia"))).toEqual(base(get("patrulheiro", "porDia")));
  });

  it("Clérigo: +1 de domínio em todo nível de magia 1-9 conjurado, nunca no nível 0", () => {
    for (const row of get("clerigo", "porDia").rows) {
      expect(row[0]?.bonusDomain).toBeUndefined();
      row.slice(1).forEach((cell) => { if (cell) expect(cell.bonusDomain).toBe(1); });
    }
  });

  it("novos níveis de magia: Mago a cada nível ímpar, Feiticeiro a cada nível par (9º nível no 17º e 18º)", () => {
    const firstLevelFor = (t: Dnd35SpellTable, col: number) => t.rows.findIndex((r) => r[col]) + 1;
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => firstLevelFor(get("mago", "porDia"), c))).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17]);
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => firstLevelFor(get("feiticeiro", "porDia"), c))).toEqual([1, 4, 6, 8, 10, 12, 14, 16, 18]);
  });

  it("magias conhecidas do Feiticeiro só existem para níveis que ele já conjura", () => {
    const perDay = get("feiticeiro", "porDia");
    const known = get("feiticeiro", "conhecidas");
    known.rows.forEach((row, i) => row.forEach((cell, col) => {
      expect(Boolean(cell), `nível ${i + 1} col ${col}`).toBe(Boolean(perDay.rows[i][col]));
    }));
  });

  it("células impressas: Bardo 1º '2 —'; Bardo conhece '2*' no 2º; Feiticeiro 20º conhece 9 truques; Paladino 4º '0'", () => {
    expect(get("bardo", "porDia").rows[0].slice(0, 2)).toEqual([{ base: 2 }, null]);
    expect(get("bardo", "conhecidas").rows[1][1]).toEqual({ base: 2, requiresHighAbility: true });
    expect(get("feiticeiro", "conhecidas").rows[19][0]).toEqual({ base: 9 });
    expect(get("paladino", "porDia").rows[3][0]).toEqual({ base: 0 });
  });

  it("formatDnd35SpellRow resume uma linha impressa", () => {
    expect(formatDnd35SpellRow(get("clerigo", "porDia"), 1)).toBe("0: 3 · 1º: 1+1 domínio");
    expect(formatDnd35SpellRow(get("bardo", "conhecidas"), 2)).toBe("0: 5 · 1º: 2 (só com Carisma alto)");
    expect(formatDnd35SpellRow(get("paladino", "porDia"), 1)).toBe("");
  });
});

describe("D&D 3.5 — habilidades das classes conjuradoras", () => {
  it("as 11 classes núcleo têm tabela nível a nível", () => {
    expect(Object.keys(DND35_CLASS_TABLES).sort()).toEqual(Object.keys(DND35_CLASSES).sort());
  });

  it("habilidades impressas: Mago talento adicional 5/10/15/20; Druida forma selvagem no 5º; Paladino destruir o mal 5/dia no 20º", () => {
    expect(DND35_CLASS_TABLES.mago.rows.filter((r) => r.special.includes("Talento adicional")).map((r) => r.level)).toEqual([5, 10, 15, 20]);
    expect(DND35_CLASS_TABLES.druida.rows[4].special).toEqual(["Forma selvagem (1/dia)"]);
    expect(DND35_CLASS_TABLES.paladino.rows[19].special).toEqual(["Destruir o mal 5/dia"]);
    expect(DND35_CLASS_TABLES.patrulheiro.rows[0].special).toContain("rastrear");
  });
});
