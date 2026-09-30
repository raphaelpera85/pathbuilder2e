// ============================================================================
// D&D 3.5 - Tabela 1-1: Modificadores de Habilidade e Magias Adicionais
// Fonte: D&D 3.5 - Livro do Jogador, Capítulo 1, página impressa 8.
// PDF escaneado sem camada de texto; transcrito por leitura visual da tabela
// renderizada em 400dpi. As linhas de magias adicionais são guardadas COMO
// IMPRESSAS; o teste as confere contra a regra d20 (floor((mod-N)/4)+1).
//
// Regras do texto das classes conjuradoras (p.ex. Mago, p. 47): para
// preparar/conjurar uma magia, o valor da habilidade-chave deve ser
// >= 10 + nível da magia; CD = 10 + nível da magia + modificador. As magias
// adicionais valem só para níveis de magia que a classe já conjura e nunca
// para o nível 0. A tabela impressa vai até 44-45 e termina em "etc...".
//
// Nota de impressão: a primeira linha aparece como "1–5" na coluna Valor,
// com a coluna Modificador vazia (tipografia fundida de "1" e "−5"). O
// modificador de todas as linhas usa floor((valor-10)/2), que reproduz as
// demais linhas impressas; o teste confere isso.
// ============================================================================

export const DND35_ABILITY_TABLE_SOURCE = { table: "Tabela 1-1", sourcePage: 8 } as const;

/** Modificador de habilidade (reproduz a coluna Modificador da Tabela 1-1). */
export function dnd35AbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Linhas impressas de magias adicionais, por modificador. Colunas = níveis
 * de magia 1º a 9º (a coluna 0 é sempre "—"). Linhas com modificador <= 0
 * ("—" em todas as colunas, ou "Incapaz de conjurar") não concedem nada.
 */
const PRINTED_BONUS_ROWS: Record<number, string> = {
  1: "1 — — — — — — — —",
  2: "1 1 — — — — — — —",
  3: "1 1 1 — — — — — —",
  4: "1 1 1 1 — — — — —",
  5: "2 1 1 1 1 — — — —",
  6: "2 2 1 1 1 1 — — —",
  7: "2 2 2 1 1 1 1 — —",
  8: "2 2 2 2 1 1 1 1 —",
  9: "3 2 2 2 2 1 1 1 1",
  10: "3 3 2 2 2 2 1 1 1",
  11: "3 3 3 2 2 2 2 1 1",
  12: "3 3 3 3 2 2 2 2 1",
  13: "4 3 3 3 3 2 2 2 2",
  14: "4 4 3 3 3 3 2 2 2",
  15: "4 4 4 3 3 3 3 2 2",
  16: "4 4 4 4 3 3 3 3 2",
  17: "5 4 4 4 4 3 3 3 3",
};

export const DND35_BONUS_SPELLS_BY_MODIFIER: Record<number, number[]> = Object.fromEntries(
  Object.entries(PRINTED_BONUS_ROWS).map(([mod, row]) => [Number(mod), row.split(" ").map((c) => (c === "—" ? 0 : Number(c)))]),
);

/** Maior modificador impresso na tabela (valor 44-45). */
export const DND35_BONUS_TABLE_MAX_MODIFIER = 17;

/**
 * Magias adicionais para um nível de magia (1-9). Nível 0 nunca recebe.
 * Acima do fim da tabela impressa ("etc...") usa a mesma regra da tabela.
 */
export function dnd35BonusSpells(abilityScore: number, spellLevel: number): number {
  if (spellLevel < 1 || spellLevel > 9) return 0;
  const mod = dnd35AbilityModifier(abilityScore);
  if (mod <= 0) return 0;
  if (mod <= DND35_BONUS_TABLE_MAX_MODIFIER) return DND35_BONUS_SPELLS_BY_MODIFIER[mod][spellLevel - 1];
  return mod >= spellLevel ? Math.floor((mod - spellLevel) / 4) + 1 : 0;
}

/** Valor mínimo da habilidade-chave para conjurar um nível de magia. */
export function dnd35MinimumCastingScore(spellLevel: number): number {
  return 10 + spellLevel;
}

export function dnd35SpellSaveDc(spellLevel: number, abilityScore: number): number {
  return 10 + spellLevel + dnd35AbilityModifier(abilityScore);
}
