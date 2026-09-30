// ============================================================================
// D&D 3.5 - Magias por dia e magias conhecidas (Capítulo 3)
// Fonte: D&D 3.5 - Livro do Jogador (páginas impressas):
//   Tabela 3-4  O Bardo — magias por dia (p. 27)
//   Tabela 3-5  Magias Conhecidas do Bardo (p. 28)
//   Tabela 3-6  O Clérigo (p. 31) — "N+1": +1 = magia de domínio
//   Tabela 3-8  O Druida (p. 35)
//   Tabela 3-9  O Feiticeiro (p. 38)
//   Tabela 3-10 Magias Conhecidas do Feiticeiro (p. 40)
//   Tabela 3-13 O Mago (p. 46)
//   Tabela 3-16 O Paladino (p. 52) — magias de 1º a 4º nível
//   Tabela 3-17 O Ranger (p. 56) — magias de 1º a 4º nível
// PDF escaneado; transcrito por leitura visual em 330-380dpi. Cada linha
// abaixo é a linha impressa, coluna a coluna, a partir do nível de magia
// indicado em `firstSpellLevel`:
//   "—" = não conjura esse nível;
//   "0" = só as magias adicionais por atributo alto (texto das classes);
//   "2*" (conhecidas do Bardo) = só se o Carisma conceder magia adicional
//         desse nível (nota da Tabela 3-5);
//   "N+1" (Clérigo) = N magias + 1 de domínio (nota da Tabela 3-6).
// ============================================================================

import { dnd35BonusSpells, dnd35MinimumCastingScore } from "./dnd35AbilityScores";

export type Dnd35SpellCell = null | { base: number; bonusDomain?: number; requiresHighAbility?: boolean };

export interface Dnd35SpellTable {
  classId: string;
  table: string;
  sourcePage: number;
  kind: "porDia" | "conhecidas";
  firstSpellLevel: 0 | 1;
  /** rows[nível-1][coluna] — coluna 0 corresponde a firstSpellLevel. */
  rows: Dnd35SpellCell[][];
}

function parseCell(raw: string): Dnd35SpellCell {
  if (raw === "—") return null;
  const star = raw.endsWith("*");
  const text = star ? raw.slice(0, -1) : raw;
  const [base, bonus] = text.split("+").map(Number);
  if (!Number.isInteger(base) || (bonus !== undefined && !Number.isInteger(bonus))) {
    throw new Error(`Célula de magia inválida: ${raw}`);
  }
  return { base, ...(bonus !== undefined ? { bonusDomain: bonus } : {}), ...(star ? { requiresHighAbility: true } : {}) };
}

function table(meta: Omit<Dnd35SpellTable, "rows">, lines: string[]): Dnd35SpellTable {
  return { ...meta, rows: lines.map((line) => line.trim().split(/\s+/).map(parseCell)) };
}

export const DND35_SPELL_TABLES: Record<string, Dnd35SpellTable[]> = {
  bardo: [
    table({ classId: "bardo", table: "Tabela 3-4", sourcePage: 27, kind: "porDia", firstSpellLevel: 0 }, [
      "2 — — — — — —", "3 0 — — — — —", "3 1 — — — — —", "3 2 0 — — — —", "3 3 1 — — — —",
      "3 3 2 — — — —", "3 3 2 0 — — —", "3 3 3 1 — — —", "3 3 3 2 — — —", "3 3 3 2 0 — —",
      "3 3 3 3 1 — —", "3 3 3 3 2 — —", "3 3 3 3 2 0 —", "4 3 3 3 3 1 —", "4 4 3 3 3 2 —",
      "4 4 4 3 3 2 0", "4 4 4 4 3 3 1", "4 4 4 4 4 3 2", "4 4 4 4 4 4 3", "4 4 4 4 4 4 4",
    ]),
    table({ classId: "bardo", table: "Tabela 3-5", sourcePage: 28, kind: "conhecidas", firstSpellLevel: 0 }, [
      "4 — — — — — —", "5 2* — — — — —", "6 3 — — — — —", "6 3 2* — — — —", "6 4 3 — — — —",
      "6 4 3 — — — —", "6 4 4 2* — — —", "6 4 4 3 — — —", "6 4 4 3 — — —", "6 4 4 4 2* — —",
      "6 4 4 4 3 — —", "6 4 4 4 3 — —", "6 4 4 4 4 2* —", "6 4 4 4 4 3 —", "6 4 4 4 4 3 —",
      "6 5 4 4 4 4 2*", "6 5 5 4 4 4 3", "6 5 5 5 4 4 3", "6 5 5 5 5 4 4", "6 5 5 5 5 5 4",
    ]),
  ],
  clerigo: [
    table({ classId: "clerigo", table: "Tabela 3-6", sourcePage: 31, kind: "porDia", firstSpellLevel: 0 }, [
      "3 1+1 — — — — — — — —", "4 2+1 — — — — — — — —", "4 2+1 1+1 — — — — — — —",
      "5 3+1 2+1 — — — — — — —", "5 3+1 2+1 1+1 — — — — — —", "5 3+1 3+1 2+1 — — — — — —",
      "6 4+1 3+1 2+1 1+1 — — — — —", "6 4+1 3+1 3+1 2+1 — — — — —", "6 4+1 4+1 3+1 2+1 1+1 — — — —",
      "6 4+1 4+1 3+1 3+1 2+1 — — — —", "6 5+1 4+1 4+1 3+1 2+1 1+1 — — —", "6 5+1 4+1 4+1 3+1 3+1 2+1 — — —",
      "6 5+1 5+1 4+1 4+1 3+1 2+1 1+1 — —", "6 5+1 5+1 4+1 4+1 3+1 3+1 2+1 — —", "6 5+1 5+1 5+1 4+1 4+1 3+1 2+1 1+1 —",
      "6 5+1 5+1 5+1 4+1 4+1 3+1 3+1 2+1 —", "6 5+1 5+1 5+1 5+1 4+1 4+1 3+1 2+1 1+1", "6 5+1 5+1 5+1 5+1 4+1 4+1 3+1 3+1 2+1",
      "6 5+1 5+1 5+1 5+1 5+1 4+1 4+1 3+1 3+1", "6 5+1 5+1 5+1 5+1 5+1 4+1 4+1 4+1 4+1",
    ]),
  ],
  druida: [
    table({ classId: "druida", table: "Tabela 3-8", sourcePage: 35, kind: "porDia", firstSpellLevel: 0 }, [
      "3 1 — — — — — — — —", "4 2 — — — — — — — —", "4 2 1 — — — — — — —", "5 3 2 — — — — — — —",
      "5 3 2 1 — — — — — —", "5 3 3 2 — — — — — —", "6 4 3 2 1 — — — — —", "6 4 3 3 2 — — — — —",
      "6 4 4 3 2 1 — — — —", "6 4 4 3 3 2 — — — —", "6 5 4 4 3 2 1 — — —", "6 5 4 4 3 3 2 — — —",
      "6 5 5 4 4 3 2 1 — —", "6 5 5 4 4 3 3 2 — —", "6 5 5 5 4 4 3 2 1 —", "6 5 5 5 4 4 3 3 2 —",
      "6 5 5 5 5 4 4 3 2 1", "6 5 5 5 5 4 4 3 3 2", "6 5 5 5 5 5 4 4 3 3", "6 5 5 5 5 5 4 4 4 4",
    ]),
  ],
  feiticeiro: [
    table({ classId: "feiticeiro", table: "Tabela 3-9", sourcePage: 38, kind: "porDia", firstSpellLevel: 0 }, [
      "5 3 — — — — — — — —", "6 4 — — — — — — — —", "6 5 — — — — — — — —", "6 6 3 — — — — — — —",
      "6 6 4 — — — — — — —", "6 6 5 3 — — — — — —", "6 6 6 4 — — — — — —", "6 6 6 5 3 — — — — —",
      "6 6 6 6 4 — — — — —", "6 6 6 6 5 3 — — — —", "6 6 6 6 6 4 — — — —", "6 6 6 6 6 5 3 — — —",
      "6 6 6 6 6 6 4 — — —", "6 6 6 6 6 6 5 3 — —", "6 6 6 6 6 6 6 4 — —", "6 6 6 6 6 6 6 5 3 —",
      "6 6 6 6 6 6 6 6 4 —", "6 6 6 6 6 6 6 6 5 3", "6 6 6 6 6 6 6 6 6 4", "6 6 6 6 6 6 6 6 6 6",
    ]),
    table({ classId: "feiticeiro", table: "Tabela 3-10", sourcePage: 40, kind: "conhecidas", firstSpellLevel: 0 }, [
      "4 2 — — — — — — — —", "5 2 — — — — — — — —", "5 3 — — — — — — — —", "6 3 1 — — — — — — —",
      "6 4 2 — — — — — — —", "7 4 2 1 — — — — — —", "7 5 3 2 — — — — — —", "8 5 3 2 1 — — — — —",
      "8 5 4 3 2 — — — — —", "9 5 4 3 2 1 — — — —", "9 5 5 4 3 2 — — — —", "9 5 5 4 3 2 1 — — —",
      "9 5 5 4 4 3 2 — — —", "9 5 5 4 4 3 2 1 — —", "9 5 5 4 4 4 3 2 — —", "9 5 5 4 4 4 3 2 1 —",
      "9 5 5 4 4 4 3 3 2 —", "9 5 5 4 4 4 3 3 2 1", "9 5 5 4 4 4 3 3 3 2", "9 5 5 4 4 4 3 3 3 3",
    ]),
  ],
  mago: [
    table({ classId: "mago", table: "Tabela 3-13", sourcePage: 46, kind: "porDia", firstSpellLevel: 0 }, [
      "3 1 — — — — — — — —", "4 2 — — — — — — — —", "4 2 1 — — — — — — —", "4 3 2 — — — — — — —",
      "4 3 2 1 — — — — — —", "4 3 3 2 — — — — — —", "4 4 3 2 1 — — — — —", "4 4 3 3 2 — — — — —",
      "4 4 4 3 2 1 — — — —", "4 4 4 3 3 2 — — — —", "4 4 4 4 3 2 1 — — —", "4 4 4 4 3 3 2 — — —",
      "4 4 4 4 4 3 2 1 — —", "4 4 4 4 4 3 3 2 — —", "4 4 4 4 4 4 3 2 1 —", "4 4 4 4 4 4 3 3 2 —",
      "4 4 4 4 4 4 4 3 2 1", "4 4 4 4 4 4 4 3 3 2", "4 4 4 4 4 4 4 4 3 3", "4 4 4 4 4 4 4 4 4 4",
    ]),
  ],
  paladino: [
    table({ classId: "paladino", table: "Tabela 3-16", sourcePage: 52, kind: "porDia", firstSpellLevel: 1 }, [
      "— — — —", "— — — —", "— — — —", "0 — — —", "0 — — —", "1 — — —", "1 — — —", "1 0 — —",
      "1 0 — —", "1 1 — —", "1 1 0 —", "1 1 1 —", "1 1 1 —", "2 1 1 0", "2 1 1 1", "2 2 1 1",
      "2 2 2 1", "3 2 2 1", "3 3 3 2", "3 3 3 3",
    ]),
  ],
  patrulheiro: [
    table({ classId: "patrulheiro", table: "Tabela 3-17 (O Ranger)", sourcePage: 56, kind: "porDia", firstSpellLevel: 1 }, [
      "— — — —", "— — — —", "— — — —", "0 — — —", "0 — — —", "1 — — —", "1 — — —", "1 0 — —",
      "1 0 — —", "1 1 — —", "1 1 0 —", "1 1 1 —", "1 1 1 —", "2 1 1 0", "2 1 1 1", "2 2 1 1",
      "2 2 2 1", "3 2 2 1", "3 3 3 2", "3 3 3 3",
    ]),
  ],
};

/** Resumo legível de uma linha, p.ex. "0: 3 · 1: 1+1 domínio". Ignora "—". */
export function formatDnd35SpellRow(t: Dnd35SpellTable, level: number): string {
  const row = t.rows[level - 1] ?? [];
  const parts = row.flatMap((cell, col) => {
    if (!cell) return [];
    const spellLevel = t.firstSpellLevel + col;
    const domain = cell.bonusDomain ? `+${cell.bonusDomain} domínio` : "";
    const star = cell.requiresHighAbility ? " (só com Carisma alto)" : "";
    return [`${spellLevel}º: ${cell.base}${domain}${star}`.replace("0º:", "0:")];
  });
  return parts.join(" · ");
}

export interface Dnd35CharacterSpellLevel {
  spellLevel: number;
  /** Habilidade-chave >= 10 + nível da magia (texto das classes). */
  castable: boolean;
  base: number;
  domain: number;
  bonus: number; // Tabela 1-1
  perDay: number; // 0 se não puder conjurar
  known?: number; // só Bardo/Feiticeiro
}

/**
 * Combina a tabela de magias da classe com a habilidade-chave:
 * - níveis "—" da classe são omitidos;
 * - abaixo de 10 + nível da magia, o nível não pode ser conjurado;
 * - magias adicionais (Tabela 1-1) só em níveis 1-9 que a classe conjura;
 * - "2*" em magias conhecidas do Bardo só conta se houver magia adicional
 *   desse nível (nota da Tabela 3-5).
 */
export function dnd35CharacterSpells(classId: string, level: number, abilityScore: number): Dnd35CharacterSpellLevel[] {
  const tables = DND35_SPELL_TABLES[classId];
  const perDayTable = tables?.find((t) => t.kind === "porDia");
  if (!perDayTable) return [];
  const knownTable = tables.find((t) => t.kind === "conhecidas");
  const row = perDayTable.rows[Math.min(20, Math.max(1, level)) - 1];
  const result: Dnd35CharacterSpellLevel[] = [];
  row.forEach((cell, col) => {
    if (!cell) return;
    const spellLevel = perDayTable.firstSpellLevel + col;
    const castable = abilityScore >= dnd35MinimumCastingScore(spellLevel);
    const bonus = dnd35BonusSpells(abilityScore, spellLevel);
    const domain = cell.bonusDomain ?? 0;
    const entry: Dnd35CharacterSpellLevel = {
      spellLevel, castable, base: cell.base, domain, bonus,
      perDay: castable ? cell.base + domain + bonus : 0,
    };
    if (knownTable) {
      const knownCell = knownTable.rows[Math.min(20, Math.max(1, level)) - 1][spellLevel - knownTable.firstSpellLevel];
      entry.known = !knownCell || !castable ? 0 : knownCell.requiresHighAbility && bonus === 0 ? 0 : knownCell.base;
    }
    result.push(entry);
  });
  return result;
}

/** Resumo legível, p.ex. "0: 3 · 1º: 3 (1 + 1 domínio + 1 atributo)". */
export function formatDnd35CharacterSpells(levels: Dnd35CharacterSpellLevel[], abilityLabel: string): string {
  return levels.map((l) => {
    const name = l.spellLevel === 0 ? "0" : `${l.spellLevel}º`;
    if (!l.castable) return `${name}: — (${abilityLabel} mínima ${dnd35MinimumCastingScore(l.spellLevel)})`;
    const extras = [l.domain ? `${l.domain} domínio` : "", l.bonus ? `${l.bonus} atributo` : ""].filter(Boolean);
    const breakdown = extras.length ? ` (${[String(l.base), ...extras].join(" + ")})` : "";
    const known = l.known !== undefined ? `, conhece ${l.known}` : "";
    return `${name}: ${l.perDay}${breakdown}${known}`;
  }).join(" · ");
}
