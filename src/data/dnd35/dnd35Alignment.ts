// ============================================================================
// D&D 3.5 — Tendências e restrições de tendência
// Nomes das nove tendências como impressos na Tabela 3-7: Deuses (p. 32).
// Restrições por classe conforme o campo "Tendência" de cada classe no
// Capítulo 3 (já transcrito em dnd35Classes.ts). Regra do clérigo (p. 31,
// "Tendência"): "A tendência do clérigo deve ser idêntica ou 'um passo'
// afastada da tendência de sua divindade (ou seja, ela pode diferir um passo
// no eixo Leal-Caótico ou no eixo Bem-Mal, mas não em ambos). A única exceção
// envolve os clérigos de St. Cuthbert (uma divindade Leal e Neutra), que devem
// escolher as tendências Leal e Bom ou Leal e Neutro. Um clérigo não pode ser
// 'Neutro autêntico', a menos que sua divindade também seja Neutra."
// ============================================================================

export interface Dnd35Alignment {
  id: string;
  name: string;
  /** Eixo Leal(+1) / Neutro(0) / Caótico(-1). */
  law: -1 | 0 | 1;
  /** Eixo Bom(+1) / Neutro(0) / Mau(-1). */
  good: -1 | 0 | 1;
}

export const DND35_ALIGNMENTS: Dnd35Alignment[] = [
  { id: "LB", name: "Leal e Bom", law: 1, good: 1 },
  { id: "NB", name: "Neutro e Bom", law: 0, good: 1 },
  { id: "CB", name: "Caótico e Bom", law: -1, good: 1 },
  { id: "LN", name: "Leal e Neutro", law: 1, good: 0 },
  { id: "N", name: "Neutro", law: 0, good: 0 },
  { id: "CN", name: "Caótico e Neutro", law: -1, good: 0 },
  { id: "LM", name: "Leal e Mau", law: 1, good: -1 },
  { id: "NM", name: "Neutro e Mau", law: 0, good: -1 },
  { id: "CM", name: "Caótico e Mau", law: -1, good: -1 },
];

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Converte texto de tendência (fichas antigas guardavam texto livre) na
 * tendência correspondente, ou null se não reconhecer. Aceita os nomes
 * impressos, siglas e "Neutro autêntico"/"Neutro puro".
 */
export function dnd35ParseAlignment(text: string): Dnd35Alignment | null {
  const t = norm(text).trim();
  const byId = DND35_ALIGNMENTS.find((a) => a.id.toLowerCase() === t);
  if (byId) return byId;
  const words = t.split(/[^a-z]+/).filter(Boolean);
  const has = (w: string) => words.includes(w);
  const law = has("leal") ? 1 : has("caotico") ? -1 : 0;
  const good = has("bom") || has("boa") ? 1 : has("mau") || has("ma") || has("maligno") ? -1 : 0;
  if (law === 0 && good === 0 && !has("neutro") && !has("neutra")) return null;
  return DND35_ALIGNMENTS.find((a) => a.law === law && a.good === good) ?? null;
}

/** Tendências permitidas por classe (Capítulo 3). */
export function dnd35AlignmentAllowedForClass(classId: string, alignment: Dnd35Alignment): boolean {
  switch (classId) {
    case "barbaro":
    case "bardo":
      return alignment.law !== 1;
    case "druida":
      return alignment.law === 0 || alignment.good === 0;
    case "monge":
      return alignment.law === 1;
    case "paladino":
      return alignment.id === "LB";
    default:
      return true;
  }
}

/** Regra do clérigo (p. 31) em relação à tendência da divindade. */
export function dnd35ClericAlignmentAllowed(deityId: string, deityAlignmentName: string, alignment: Dnd35Alignment): boolean {
  if (deityId === "st-cuthbert") return alignment.id === "LB" || alignment.id === "LN";
  const deity = dnd35ParseAlignment(deityAlignmentName);
  if (!deity) return false;
  if (alignment.id === "N" && deity.id !== "N") return false;
  const dLaw = Math.abs(alignment.law - deity.law);
  const dGood = Math.abs(alignment.good - deity.good);
  return dLaw + dGood <= 1;
}
