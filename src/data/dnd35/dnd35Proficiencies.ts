// ============================================================================
// D&D 3.5 — Usar Armas e Armaduras por classe (Capítulo 3)
// Fonte: parágrafo "Usar Armas e Armaduras" de cada classe, Livro do Jogador,
// transcrito literalmente (`printed`) por leitura visual em 330dpi:
// Bárbaro p. 25 · Bardo p. 28 · Clérigo p. 32 · Druida p. 35 · Feiticeiro
// p. 40 · Guerreiro p. 42 · Ladino p. 44 · Mago p. 47 · Monge p. 49-50 ·
// Paladino p. 53 · Ranger p. 56.
//
// Nomes que não correspondem exatamente a uma arma da Tabela 7-5 ficam em
// `unresolvedWeapons` em vez de serem adivinhados: o Bardo cita "bastão"
// (a tabela tem "Porrete", não "Bastão") e o Druida cita "foice" (a tabela
// tem "Foice Curta" e "Foice longa").
// ============================================================================

import { DND35_ARMORS, DND35_WEAPONS } from "./dnd35Equipment";

export type Dnd35ArmorCategory = "leve" | "media" | "pesada";

export interface Dnd35ClassProficiencies {
  printed: string;
  sourcePage: string;
  simpleWeapons: boolean;
  martialWeapons: boolean;
  /** Armas específicas (ids da Tabela 7-5) além das categorias acima. */
  weaponIds: string[];
  /** Nomes impressos sem arma correspondente exata na Tabela 7-5. */
  unresolvedWeapons: string[];
  armor: Dnd35ArmorCategory[];
  /** Escudos: nenhum, todos exceto o de corpo, ou todos incluindo o de corpo. */
  shields: "nenhum" | "exceto_corpo" | "todos";
  /** Restrições adicionais impressas (não bloqueiam a escolha de talentos). */
  restrictions?: string;
}

export const DND35_CLASS_PROFICIENCIES: Record<string, Dnd35ClassProficiencies> = {
  barbaro: {
    printed: "Um bárbaro sabe usar todas as armas simples e comuns, armaduras leves, armaduras médias e escudos (exceto escudo de corpo).",
    sourcePage: "25", simpleWeapons: true, martialWeapons: true, weaponIds: [], unresolvedWeapons: [],
    armor: ["leve", "media"], shields: "exceto_corpo",
  },
  bardo: {
    printed: "Um bardo sabe usar todas as armas simples, além da espada longa, sabre, bastão, espada curta, arco curto e chicote. Os bardos sabem usar armaduras leves e escudos (exceto escudo de corpo).",
    sourcePage: "28", simpleWeapons: true, martialWeapons: false,
    weaponIds: ["espada-longa", "sabre", "espada-curta", "arco-curto", "chicote"], unresolvedWeapons: ["bastão"],
    armor: ["leve"], shields: "exceto_corpo",
  },
  clerigo: {
    printed: "Um clérigo sabe usar todas as armas simples, todos os tipos de armadura (leves, médias e pesadas) e escudos (exceto escudo de corpo).",
    sourcePage: "32", simpleWeapons: true, martialWeapons: false, weaponIds: [], unresolvedWeapons: [],
    armor: ["leve", "media", "pesada"], shields: "exceto_corpo",
  },
  druida: {
    printed: "Um druida sabe usar as seguintes armas: adaga, bordão, cimitarra, clava, dardo, foice, funda, lança e lança curta. [...] Eles sabem usar armaduras leves e médias, mas são proibidos de usar armaduras de metal, portanto suas escolhas são limitadas a armaduras acolchoadas, corseletes de couro e gibões de peles. [...] Eles sabem usar escudos (exceto escudo de corpo), mas só empunham as variedades de madeira.",
    sourcePage: "35", simpleWeapons: false, martialWeapons: false,
    weaponIds: ["adaga", "bordao", "cimitarra", "clava", "dardo", "funda", "lanca", "lanca-curta"], unresolvedWeapons: ["foice"],
    armor: ["leve", "media"], shields: "exceto_corpo",
    restrictions: "Proibido usar armaduras de metal (acolchoada, couro, gibão de peles) e escudos que não sejam de madeira; violar impede conjurar por 24 horas.",
  },
  feiticeiro: {
    printed: "O feiticeiro sabe usar todas as armas simples. Ele não sabe usar nenhum tipo de armadura ou escudos.",
    sourcePage: "40", simpleWeapons: true, martialWeapons: false, weaponIds: [], unresolvedWeapons: [],
    armor: [], shields: "nenhum",
  },
  guerreiro: {
    printed: "Um guerreiro sabe usar todas as armas simples e comuns, armaduras (leves, médias e pesadas) e escudos (incluindo escudos de corpo).",
    sourcePage: "42", simpleWeapons: true, martialWeapons: true, weaponIds: [], unresolvedWeapons: [],
    armor: ["leve", "media", "pesada"], shields: "todos",
  },
  ladino: {
    printed: "Os ladinos sabem usar todas as armas simples, além da besta de mão, sabre, arco curto e espada curta. Eles também sabem usar armaduras leves, mas não escudos.",
    sourcePage: "44", simpleWeapons: true, martialWeapons: false,
    weaponIds: ["besta-de-mao", "sabre", "arco-curto", "espada-curta"], unresolvedWeapons: [],
    armor: ["leve"], shields: "nenhum",
  },
  mago: {
    printed: "Os magos sabem usar as seguintes armas: clava, adaga, besta pesada, besta leve e bordão, mas não sabem usar nenhum tipo de armadura ou escudos.",
    sourcePage: "47", simpleWeapons: false, martialWeapons: false,
    weaponIds: ["clava", "adaga", "besta-pesada", "besta-leve", "bordao"], unresolvedWeapons: [],
    armor: [], shields: "nenhum",
  },
  monge: {
    printed: "As armas que o monge sabe usar são: clava, besta (leve ou pesada), adaga, machadinha, azagaia, kama, nunchaku, bordão, sai, shuriken, siangham e funda. [...] Os monges não sabem usar nenhuma armadura ou escudo",
    sourcePage: "49-50", simpleWeapons: false, martialWeapons: false,
    weaponIds: ["clava", "besta-leve", "besta-pesada", "adaga", "machadinha", "azagaia", "kama", "nunchaku", "bordao", "sai", "shuriken", "siangham", "funda"],
    unresolvedWeapons: [], armor: [], shields: "nenhum",
  },
  paladino: {
    printed: "Um paladino sabe usar todas as armas simples e comuns, todos os tipos de armaduras (leves, médias e pesadas) e escudos (exceto escudo de corpo).",
    sourcePage: "53", simpleWeapons: true, martialWeapons: true, weaponIds: [], unresolvedWeapons: [],
    armor: ["leve", "media", "pesada"], shields: "exceto_corpo",
  },
  patrulheiro: {
    printed: "Um ranger sabe usar todas as armas simples e comuns, armaduras leves e escudos (exceto escudo de corpo).",
    sourcePage: "56", simpleWeapons: true, martialWeapons: true, weaponIds: [], unresolvedWeapons: [],
    armor: ["leve"], shields: "exceto_corpo",
  },
};

/** A classe sabe usar esta arma (id da Tabela 7-5)? */
export function dnd35ClassKnowsWeapon(classId: string, weaponId: string): boolean {
  const prof = DND35_CLASS_PROFICIENCIES[classId];
  const weapon = DND35_WEAPONS[weaponId];
  if (!prof || !weapon) return false;
  if (prof.weaponIds.includes(weaponId)) return true;
  if (weapon.category === "simples") return prof.simpleWeapons;
  if (weapon.category === "comum") return prof.martialWeapons;
  return false;
}

/** A classe sabe usar esta armadura ou escudo (id da Tabela 7-6)? */
export function dnd35ClassKnowsArmor(classId: string, armorId: string): boolean {
  const prof = DND35_CLASS_PROFICIENCIES[classId];
  const armor = DND35_ARMORS[armorId];
  if (!prof || !armor) return false;
  if (armor.category === "escudo") {
    if (prof.shields === "nenhum") return false;
    return armorId !== "escudo-de-corpo" || prof.shields === "todos";
  }
  return prof.armor.includes(armor.category as Dnd35ArmorCategory);
}

/**
 * Para pré-requisitos de talento: proficiências "Usar Arma Simples",
 * "Usar Armadura (leve/média/pesada)", "Usar Escudo" e "Usar Escudo de Corpo"
 * concedidas pela classe. `null` = depende de arma específica (não decidível).
 */
export function dnd35ClassGrantsProficiencyFeat(classId: string, featName: string): boolean | null {
  const prof = DND35_CLASS_PROFICIENCIES[classId];
  if (!prof) return false;
  switch (featName) {
    case "Usar Arma Simples": return prof.simpleWeapons;
    case "Usar Armadura (leve)": return prof.armor.includes("leve");
    case "Usar Armadura (média)": return prof.armor.includes("media");
    case "Usar Armadura (pesada)": return prof.armor.includes("pesada");
    case "Usar Escudo": return prof.shields !== "nenhum";
    case "Usar Escudo de Corpo": return prof.shields === "todos";
    default: return null;
  }
}
