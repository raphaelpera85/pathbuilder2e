// ============================================================================
// D&D 3.5 — Listas restritas de talento adicional (1º nível)
//
// Guerreiro: Tabela 5-1 (p. 90-91), nota de rodapé "1: Um guerreiro pode
// escolher este talento como um de seus talentos adicionais". A lista abaixo
// é a de todos os talentos marcados com ¹ na tabela, nomes como impressos.
//
// Monge: "Talento Adicional" (p. 50): "No 1º nível, um monge pode escolher
// Agarrar Aprimorado ou Ataque Atordoante como um talento adicional. [...] O
// monge não precisa atender aos pré-requisitos necessários para escolher
// nenhum desses talentos adicionais."
// ============================================================================

import { DND35_FEATS } from "./dnd35Feats";

export const DND35_FIGHTER_BONUS_FEAT_NAMES: readonly string[] = [
  // p. 90
  "Acuidade com Arma", "Ataque Desarmado Aprimorado", "Agarrar Aprimorado", "Desviar Objetos", "Apanhar Objetos",
  "Ataque Atordoante", "Ataque Poderoso", "Trespassar", "Trespassar Maior", "Encontrão Aprimorado",
  "Atropelar Aprimorado", "Separar Aprimorado", "Combate Montado", "Arquearia Montada", "Investida Montada",
  "Investida Implacável", "Pisotear", "Combater com Duas Armas", "Bloqueio Ambidestro",
  "Combater com Duas Armas Aprimorado", "Combater com Duas Armas Maior", "Especialização em Combate",
  "Desarme Aprimorado", "Fintar Aprimorado", "Imobilização Aprimorada", "Ataque Giratório", "Esquiva", "Mobilidade",
  "Ataque em Movimento", "Foco em Arma", "Especialização em Arma", "Foco em Arma Maior", "Especialização em Arma Maior",
  "Iniciativa Aprimorada",
  // p. 91
  "Lutar às Cegas", "Rapidez de Recarga", "Reflexos de Combate", "Saque Rápido", "Sucesso Decisivo Aprimorado",
  "Tiro Certeiro", "Tiro Preciso", "Tiro Rápido", "Tiro Longo", "Tiro em Movimento", "Tiro Múltiplo",
  "Tiro Preciso Aprimorado", "Usar Arma Exótica", "Ataque com Escudo Aprimorado",
];

/** No 1º nível, o monge escolhe um destes (p. 50), sem precisar dos pré-requisitos. */
export const DND35_MONK_FIRST_LEVEL_BONUS_FEAT_NAMES: readonly string[] = ["Agarrar Aprimorado", "Ataque Atordoante"];

/**
 * O catálogo usa "Combate com Duas Armas" (título da descrição); a Tabela 5-1
 * imprime "Combater com Duas Armas". Nomes que diferem só na grafia.
 */
const NAME_ALIASES: Record<string, string> = { "Combater com Duas Armas": "Combate com Duas Armas" };

const idsForNames = (names: readonly string[]) => {
  const byName = new Map(Object.values(DND35_FEATS).map((f) => [f.name, f.id]));
  return names.map((n) => byName.get(NAME_ALIASES[n] ?? n)).filter((id): id is string => Boolean(id));
};

/** Ids do catálogo que podem ocupar o talento adicional da classe no 1º nível. */
export function dnd35BonusFeatIds(classId: string): string[] {
  if (classId === "guerreiro") return idsForNames(DND35_FIGHTER_BONUS_FEAT_NAMES);
  if (classId === "monge") return idsForNames(DND35_MONK_FIRST_LEVEL_BONUS_FEAT_NAMES);
  return [];
}

/**
 * Os talentos escolhidos cabem nos espaços? `generalSlots` aceitam qualquer
 * talento; `bonusSlots` só os da lista da classe. Como ninguém tem mais de um
 * espaço adicional no 1º nível, basta que os talentos fora da lista não
 * excedam os espaços gerais.
 */
export function dnd35FeatSlotsProblem(featIds: string[], generalSlots: number, bonusSlots: number, bonusIds: string[]): string | null {
  if (featIds.length > generalSlots + bonusSlots) return `No máximo ${generalSlots + bonusSlots} talento(s).`;
  const outside = featIds.filter((id) => !bonusIds.includes(id)).length;
  if (outside > generalSlots) {
    return `Só ${generalSlots} talento(s) podem vir de fora da lista do talento adicional da classe.`;
  }
  return null;
}
