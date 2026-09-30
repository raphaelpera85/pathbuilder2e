// ============================================================================
// D&D 3.5 - Progressões por nível
// Fonte: D&D 3.5 - Livro do Jogador, Capítulo 3, página impressa 22:
//   Tabela 3-1: Bônus Base de Resistência e Bônus Base de Ataque
//   Tabela 3-2: Benefícios e Experiência Conforme o Nível
// PDF escaneado sem camada de texto; transcrito por leitura visual da página
// renderizada em 450dpi. Os valores da Tabela 3-1, XP, talentos e aumentos
// de habilidade são armazenados COMO IMPRESSOS (não derivados de fórmula); as
// graduações máximas de perícia (nível+3 e metade disso) são calculadas e o
// teste as confere contra valores impressos de várias linhas.
// Na Tabela 3-2 a tipografia imprime meios pontos como "21/2" = 2½.
// ============================================================================

import type { Dnd35BabProgression, Dnd35SaveName } from "./dnd35Classes";

const SOURCE_PAGE = 22;

/** Tabela 3-1, índice 0 = 1º nível. Só o primeiro ataque (as iterações extras são BBA-5, -10, -15). */
export const DND35_BAB_BY_LEVEL: Record<Dnd35BabProgression, readonly number[]> = {
  boa: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  media: [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15],
  ruim: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],
};

/** Tabela 3-1: bônus base de resistência (Bom / Ruim). */
export const DND35_SAVE_BY_LEVEL: Record<"bom" | "ruim", readonly number[]> = {
  bom: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12],
  ruim: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6],
};

export interface Dnd35CharacterLevelRow {
  level: number;
  xp: number;
  maxClassSkillRanks: number;
  maxCrossClassSkillRanks: number; // 2.5 = impresso "21/2"
  gainsFeat: boolean;
  gainsAbilityIncrease: boolean;
  sourcePage: number;
}

const XP = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000];
const FEAT_LEVELS = new Set([1, 3, 6, 9, 12, 15, 18]);
const ABILITY_LEVELS = new Set([4, 8, 12, 16, 20]);

/** Tabela 3-2. */
export const DND35_CHARACTER_LEVELS: readonly Dnd35CharacterLevelRow[] = XP.map((xp, i) => ({
  level: i + 1,
  xp,
  maxClassSkillRanks: i + 4,
  maxCrossClassSkillRanks: (i + 4) / 2,
  gainsFeat: FEAT_LEVELS.has(i + 1),
  gainsAbilityIncrease: ABILITY_LEVELS.has(i + 1),
  sourcePage: SOURCE_PAGE,
}));

const clampLevel = (level: number) => Math.min(20, Math.max(1, Math.floor(level)));

/** Todos os ataques do bônus base, p.ex. 16 com BBA boa → [16, 11, 6, 1]. */
export function dnd35BaseAttacks(progression: Dnd35BabProgression, level: number): number[] {
  const first = DND35_BAB_BY_LEVEL[progression][clampLevel(level) - 1];
  const attacks = [first];
  for (let next = first - 5; next >= 1 && attacks.length < 4; next -= 5) attacks.push(next);
  return attacks;
}

export function formatDnd35BaseAttack(attacks: number[]): string {
  return attacks.map((a) => `+${a}`).join("/");
}

export function dnd35BaseSave(goodSaves: readonly Dnd35SaveName[], save: Dnd35SaveName, level: number): number {
  return DND35_SAVE_BY_LEVEL[goodSaves.includes(save) ? "bom" : "ruim"][clampLevel(level) - 1];
}
