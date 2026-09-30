// ============================================================================
// D&D 3.5 - Riqueza inicial por classe
// Fonte: D&D 3.5 - Livro do Jogador, Capítulo 7 — Equipamento, Tabela 7-1:
// Quantidade Inicial de Recursos (página impressa 111). PDF escaneado sem
// camada de texto; transcrito por leitura visual da página renderizada em
// 450dpi. O texto da página também permite ao Mestre usar o valor médio
// fixo em vez de rolar.
//
// Atenção: o Monge é impresso como "5d4 (12 PO, 5 PP)" — SEM o "x 10" das
// demais classes. Preservado como impresso.
// ============================================================================

export interface Dnd35StartingWealth {
  classId: string;
  dice: number; // quantidade de d4
  multiplier: 1 | 10;
  averageGp: number;
  sourcePage: number;
}

const row = (classId: string, dice: number, multiplier: 1 | 10, averageGp: number): Dnd35StartingWealth =>
  ({ classId, dice, multiplier, averageGp, sourcePage: 111 });

export const DND35_STARTING_WEALTH: Record<string, Dnd35StartingWealth> = {
  barbaro: row("barbaro", 4, 10, 100),
  bardo: row("bardo", 4, 10, 100),
  clerigo: row("clerigo", 5, 10, 125),
  druida: row("druida", 2, 10, 50),
  guerreiro: row("guerreiro", 6, 10, 150),
  monge: row("monge", 5, 1, 12.5),
  paladino: row("paladino", 6, 10, 150),
  patrulheiro: row("patrulheiro", 6, 10, 150),
  ladino: row("ladino", 5, 10, 125),
  feiticeiro: row("feiticeiro", 3, 10, 75),
  mago: row("mago", 3, 10, 75),
};

/** Expressão impressa, p.ex. "4d4 x 10" ou "5d4" (Monge). */
export function formatDnd35StartingWealth(w: Dnd35StartingWealth): string {
  return w.multiplier === 10 ? `${w.dice}d4 x 10` : `${w.dice}d4`;
}

/** Rola a riqueza inicial; `rng` retorna [0,1) (injetável para testes). */
export function rollDnd35StartingWealth(w: Dnd35StartingWealth, rng: () => number = Math.random): number {
  let total = 0;
  for (let i = 0; i < w.dice; i += 1) total += Math.floor(rng() * 4) + 1;
  return total * w.multiplier;
}
