// ============================================================================
// Old-School Essentials (OSE) - Regras Básicas e Modificadores
// Fonte: Old-School Essentials Livro de Regras / Tomo do Jogador
// ============================================================================

export type OseAbilityName = "str" | "int" | "wis" | "dex" | "con" | "cha";

export interface OseAbilityScore {
  score: number;
  modifier: number;
}

export interface OseAbilityModifiers {
  str: { melee: number; openDoors: number }; // openDoors: chance X em 6
  int: { spokenLanguages: number; literacy: "analfabeto" | "basico" | "alfabetizado" };
  wis: { magicSaves: number };
  dex: { ac: number; missile: number; initiative: number };
  con: { hp: number };
  cha: { npcReactions: number; maxRetainers: number; retainerLoyalty: number };
}

/**
 * Retorna o modificador padrão B/X para valores de 3 a 18
 */
export function getOseStandardModifier(score: number): number {
  if (score <= 3) return -3;
  if (score <= 5) return -2;
  if (score <= 8) return -1;
  if (score <= 12) return 0;
  if (score <= 15) return 1;
  if (score <= 17) return 2;
  return 3;
}

/**
 * Modificadores detalhados de Força (FOR)
 */
export function getOseStrModifiers(score: number): { melee: number; openDoors: number } {
  const mod = getOseStandardModifier(score);
  let openDoors = 2; // 2 em 6 (9-12)
  if (score <= 8) openDoors = 1;
  else if (score >= 18) openDoors = 5;
  else if (score >= 16) openDoors = 4;
  else if (score >= 13) openDoors = 3;
  return { melee: mod, openDoors };
}

/**
 * Modificadores detalhados de Inteligência (INT)
 */
export function getOseIntModifiers(score: number): {
  bonusLanguages: number;
  literacy: "analfabeto" | "basico" | "alfabetizado";
} {
  if (score <= 3) return { bonusLanguages: 0, literacy: "analfabeto" };
  if (score <= 5) return { bonusLanguages: 0, literacy: "analfabeto" };
  if (score <= 8) return { bonusLanguages: 0, literacy: "basico" };
  if (score <= 12) return { bonusLanguages: 0, literacy: "alfabetizado" };
  if (score <= 15) return { bonusLanguages: 1, literacy: "alfabetizado" };
  if (score <= 17) return { bonusLanguages: 2, literacy: "alfabetizado" };
  return { bonusLanguages: 3, literacy: "alfabetizado" };
}

/**
 * Modificadores detalhados de Destreza (DES)
 */
export function getOseDexModifiers(score: number): {
  acMod: number; // No DAC diminui a CA, no AAC aumenta a CA
  missile: number;
  initiative: number;
} {
  const mod = getOseStandardModifier(score);
  let initiative = 0;
  if (score <= 3) initiative = -2;
  else if (score <= 8) initiative = -1;
  else if (score >= 18) initiative = 2;
  else if (score >= 13) initiative = 1;
  return { acMod: mod, missile: mod, initiative };
}

/**
 * Modificadores detalhados de Carisma (CAR)
 */
export function getOseChaModifiers(score: number): {
  npcReactions: number;
  maxRetainers: number;
  retainerLoyalty: number;
} {
  if (score <= 3) return { npcReactions: -2, maxRetainers: 1, retainerLoyalty: 4 };
  if (score <= 5) return { npcReactions: -1, maxRetainers: 2, retainerLoyalty: 5 };
  if (score <= 8) return { npcReactions: -1, maxRetainers: 3, retainerLoyalty: 6 };
  if (score <= 12) return { npcReactions: 0, maxRetainers: 4, retainerLoyalty: 7 };
  if (score <= 15) return { npcReactions: 1, maxRetainers: 5, retainerLoyalty: 8 };
  if (score <= 17) return { npcReactions: 1, maxRetainers: 6, retainerLoyalty: 9 };
  return { npcReactions: 2, maxRetainers: 7, retainerLoyalty: 10 };
}

/**
 * Modificador de XP pelo Requisito Principal
 */
export function getOsePrimeRequisiteXpMod(score: number): number {
  if (score <= 5) return -0.2; // -20%
  if (score <= 8) return -0.1; // -10%
  if (score <= 12) return 0.0; // 0%
  if (score <= 15) return 0.05; // +5%
  return 0.1; // +10%
}

/**
 * Cálculo de Movimento e Sobrecarga em moedas (Coins)
 */
export interface OseMovementRate {
  exploration: number; // metros por turno (ex: 36m)
  encounter: number; // metros por rodada (ex: 12m)
  running: number; // metros correndo (ex: 36m)
  label: string;
}

export function getOseMovementByLoad(coinsWeight: number): OseMovementRate {
  if (coinsWeight <= 400) {
    return { exploration: 36, encounter: 12, running: 36, label: "Não sobrecarregado (36m/12m)" };
  }
  if (coinsWeight <= 800) {
    return { exploration: 27, encounter: 9, running: 27, label: "Carga leve (27m/9m)" };
  }
  if (coinsWeight <= 1200) {
    return { exploration: 18, encounter: 6, running: 18, label: "Carga média (18m/6m)" };
  }
  if (coinsWeight <= 1600) {
    return { exploration: 9, encounter: 3, running: 9, label: "Carga pesada (9m/3m)" };
  }
  return { exploration: 0, encounter: 0, running: 0, label: "Totalmente sobrecarregado (imóvel)" };
}

/**
 * Alinhamentos do OSE
 */
export type OseAlignment = "ordeiro" | "neutro" | "caotico";

export const OSE_ALIGNMENTS: Record<OseAlignment, { name: string; nameEn: string; desc: string }> = {
  ordeiro: {
    name: "Ordeiro",
    nameEn: "Lawful",
    desc: "Acredita na verdade, justiça, honra e no bem comum. Procura preservar a ordem social.",
  },
  neutro: {
    name: "Neutro",
    nameEn: "Neutral",
    desc: "Acredita no equilíbrio cósmico e no pragmatismo. Dá valor à própria sobrevivência e à de aliados.",
  },
  caotico: {
    name: "Caótico",
    nameEn: "Chaotic",
    desc: "Acredita no acaso, na força e no autointeresse. Despreza leis, regras impostas e fraqueza.",
  },
};

/**
 * Categorias de Jogadas de Proteção (Saving Throws)
 */
export interface OseSavingThrows {
  death: number; // D: Morte ou Veneno
  wands: number; // W: Varinhas
  paralysis: number; // P: Paralisia ou Petrificação
  breath: number; // B: Ataques de Sopro
  spells: number; // S: Magias, Cajados ou Bastões
}

/**
 * Perícias Secundárias (Tabela d100 Opcional, Livro de Regras p. 25)
 */
export interface OseSecondarySkill {
  range: [number, number];
  name: string;
  category: string;
}

export const OSE_SECONDARY_SKILLS: OseSecondarySkill[] = [
  { range: [1, 3], name: "Treinador de Animais", category: "Animais" },
  { range: [4, 5], name: "Armeiro", category: "Metalurgia" },
  { range: [6, 9], name: "Padeiro", category: "Alimentos" },
  { range: [10, 12], name: "Ferreiro", category: "Metalurgia" },
  { range: [13, 13], name: "Encadernador", category: "Erudição" },
  { range: [14, 16], name: "Arqueiro / Flecheiro", category: "Armas" },
  { range: [17, 20], name: "Cervejeiro", category: "Alimentos" },
  { range: [21, 23], name: "Açougueiro", category: "Alimentos" },
  { range: [24, 26], name: "Carpinteiro", category: "Construção" },
  { range: [27, 28], name: "Mercador", category: "Comércio" },
  { range: [29, 33], name: "Tanoeiro (Barris)", category: "Artesanato" },
  { range: [34, 35], name: "Funileiro / Ourives", category: "Metalurgia" },
  { range: [36, 46], name: "Agricultor", category: "Campo" },
  { range: [47, 50], name: "Pescador", category: "Campo" },
  { range: [51, 54], name: "Peleiro", category: "Artesanato" },
  { range: [55, 55], name: "Soprador de Vidro", category: "Artesanato" },
  { range: [56, 59], name: "Caçador / Mateiro", category: "Campo" },
  { range: [60, 62], name: "Lapidário / Joalheiro", category: "Artesanato" },
  { range: [63, 66], name: "Lorimer (Selaria)", category: "Artesanato" },
  { range: [67, 67], name: "Cartógrafo", category: "Erudição" },
  { range: [68, 69], name: "Pedreiro", category: "Construção" },
  { range: [70, 73], name: "Mineiro", category: "Extração" },
  { range: [74, 76], name: "Oleiro", category: "Artesanato" },
  { range: [77, 78], name: "Cordoeiro / Laçador", category: "Artesanato" },
  { range: [79, 81], name: "Marinheiro", category: "Náutica" },
  { range: [82, 84], name: "Armador (Navios)", category: "Náutica" },
  { range: [85, 87], name: "Alfaiate", category: "Artesanato" },
  { range: [88, 90], name: "Curtidor", category: "Artesanato" },
  { range: [91, 93], name: "Telhador / Carpinteiro", category: "Construção" },
  { range: [94, 96], name: "Lenhador", category: "Campo" },
  { range: [97, 98], name: "Vinicultor", category: "Alimentos" },
  { range: [99, 100], name: "Especialista Múltiplo (Duas Perícias)", category: "Especial" },
];

export function getOseSecondarySkillByRoll(roll: number): string {
  const clamped = Math.max(1, Math.min(100, roll));
  const found = OSE_SECONDARY_SKILLS.find((s) => clamped >= s.range[0] && clamped <= s.range[1]);
  return found ? found.name : "Aventureiro";
}

/**
 * Idiomas Comuns Adicionais para alta Inteligência
 */
export const OSE_ADDITIONAL_LANGUAGES = [
  "Doppelgänger",
  "Dragão",
  "Anão",
  "Élfico",
  "Gárgula",
  "Gnoll",
  "Gnomo",
  "Goblin",
  "Halfling",
  "Harpia",
  "Hobgoblin",
  "Kobold",
  "Homem-Lagarto",
  "Medusa",
  "Minotauro",
  "Ogro",
  "Orc",
  "Pixie",
  "Comum Profundo",
];
