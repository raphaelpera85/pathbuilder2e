// ============================================================================
// Old-School Essentials (OSE) - Regras Básicas e Modificadores
// Fonte: Old-School Essentials Livro de Regras / Tomo do Jogador
// ============================================================================

export type OseAbilityName = "str" | "int" | "wis" | "dex" | "con" | "cha";

import { OSE_BEASTS, OSE_SPECIALISTS_RETAINERS, type OseArmor, type OseWeapon } from "./oseEquipment";
import type { OseClass } from "./oseClasses";
import type { OseRace } from "./oseRaces";

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

export function validateOseFollowers(beasts: unknown, retainers: unknown, maxRetainers: number): string[] {
  const errors: string[] = [];
  const beastEntries = Array.isArray(beasts) ? beasts : [];
  const retainerEntries = Array.isArray(retainers) ? retainers : [];
  const beastIds = new Set(OSE_BEASTS.map((entry) => entry.id));
  const retainerIds = new Set(OSE_SPECIALISTS_RETAINERS.map((entry) => entry.id));
  const selectedBeastIds = beastEntries.map((entry) => entry && typeof entry === "object" && "id" in entry ? String(entry.id) : "");
  const selectedRetainerIds = retainerEntries.map((entry) => entry && typeof entry === "object" && "id" in entry ? String(entry.id) : "");
  if (selectedBeastIds.some((id) => !beastIds.has(id))) errors.push("a ficha contém animal ou montaria fora do catálogo OSE");
  if (selectedRetainerIds.some((id) => !retainerIds.has(id))) errors.push("a ficha contém retentor fora do catálogo OSE");
  if (new Set(selectedBeastIds).size !== selectedBeastIds.length) errors.push("animais e montarias não podem ser duplicados");
  if (new Set(selectedRetainerIds).size !== selectedRetainerIds.length) errors.push("retentores não podem ser duplicados");
  if (selectedRetainerIds.length > Math.max(0, Math.trunc(maxRetainers))) errors.push(`a ficha excede o máximo de ${Math.max(0, Math.trunc(maxRetainers))} retentor(es) permitido pelo Carisma`);
  return errors;
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
 *
 * Fonte: Old-School Essentials — Livro de Regras (edição brasileira da RPG
 * Planet), "Tempo, Carga e Movimento", p. 41. O livro apresenta duas opções, e
 * o mesmo sistema deve valer para todo o grupo:
 *
 *   - Opção 1, Carga Simplificada: o peso de armadura, armas e equipamento de
 *     aventura **não** conta para a carga máxima, e a taxa de movimento depende
 *     do tipo de armadura vestida e de estar carregando tesouros.
 *   - Opção 2, Carga Detalhada: o peso de tesouros, moedas, armas e armadura é
 *     somado; a taxa de movimento sai da tabela por faixa de peso.
 *
 * A tabela impressa de Carga Detalhada perdeu as linhas de 600 e de 1.600
 * moedas na paginação, então a confirmação veio da ficha de personagem oficial
 * de 2026 da Necrotic Gnome (campos "Peso total carregado (máx = 1.600 mo)" e
 * "Taxa base de mov. = 36 m, a menos que sobrecarregado"), que traz as quatro
 * faixas: até 400, até 600, até 800 e até 1.600.
 *
 * A carga máxima de qualquer personagem é 1.600 moedas; acima disso ele não se
 * move (p. 41).
 */
export interface OseMovementRate {
  /** metros por turno de exploração (a "taxa base" de 36 m) */
  exploration: number;
  /** metros por rodada de encontro */
  encounter: number;
  /** metros por rodada de corrida; o livro usa a taxa base */
  running: number;
  label: string;
}

export type OseArmorWeightClass = "none" | "light" | "heavy";

/**
 * Classificação das armaduras do catálogo nas três linhas da Carga Simplificada.
 * A Cota de Malha é leve; a Armadura de Placas é pesada (p. 41).
 */
export const OSE_ARMOR_WEIGHT_CLASS_BY_ID: Record<string, OseArmorWeightClass> = {
  sem_armadura: "none",
  couro: "light",
  cota_malha: "light",
  placas: "heavy",
  // O escudo não tem linha própria na tabela (p. 41); fica com a armadura leve
  // para que toda peça do catálogo tenha uma classificação explícita.
  escudo: "light",
};

/**
 * Apenas as armaduras de corpo — as que a tabela da p. 41 realmente classifica.
 * O escudo é excluído para que ele possa ser adicionado ao catálogo sem alterar
 * silenciosamente a carga de um personagem.
 */
export const OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID: Record<string, OseArmorWeightClass> =
  Object.fromEntries(Object.entries(OSE_ARMOR_WEIGHT_CLASS_BY_ID).filter(([id]) => id !== "escudo"));

export interface OseLoadMovementOptions {
  /** "detailed" soma todo o peso em moedas; "simplified" usa armadura + tesouro. */
  mode: "detailed" | "simplified";
  /** Peso total em moedas — considerado apenas no modo detalhado. */
  coinsWeight?: number;
  /** Classe de armadura vestida — considerada apenas no modo simplificado. */
  armorClass?: OseArmorWeightClass;
  /** Se o personagem está carregando uma quantidade considerável de tesouros. */
  carryingTreasure?: boolean;
}

/** Teto de carga de qualquer personagem, em moedas de peso (p. 41). */
export const OSE_MAX_LOAD_COINS = 1600;

/** Faixas da Carga Detalhada (p. 41): teto em moedas → taxa base em metros. */
const OSE_DETAILED_LOAD_TIERS: ReadonlyArray<{ upTo: number; base: number }> = [
  { upTo: 400, base: 36 },
  { upTo: 600, base: 27 },
  { upTo: 800, base: 18 },
  { upTo: OSE_MAX_LOAD_COINS, base: 9 },
];

/** Tabela da Carga Simplificada (p. 41), por armadura vestida e tesouro. */
const OSE_SIMPLIFIED_LOAD_TIERS: Record<OseArmorWeightClass, { withoutTreasure: number; withTreasure: number }> = {
  none: { withoutTreasure: 36, withTreasure: 27 },
  light: { withoutTreasure: 27, withTreasure: 18 },
  heavy: { withoutTreasure: 18, withTreasure: 9 },
};

function oseMovementRate(base: number, label: string): OseMovementRate {
  if (base <= 0) return { exploration: 0, encounter: 0, running: 0, label };
  return { exploration: base, encounter: Math.floor(base / 2), running: base, label };
}

/** Taxa de movimento pela Carga Detalhada: peso total em moedas (p. 41). */
export function getOseMovementByCoinWeight(coinsWeight: number): OseMovementRate {
  const index = OSE_DETAILED_LOAD_TIERS.findIndex((entry) => coinsWeight <= entry.upTo);
  if (index < 0) return oseMovementRate(0, `Acima de ${OSE_MAX_LOAD_COINS} moedas — não pode se mover`);
  const tier = OSE_DETAILED_LOAD_TIERS[index];
  const floor = index === 0 ? 0 : OSE_DETAILED_LOAD_TIERS[index - 1].upTo;
  const range = floor === 0 ? `Até ${tier.upTo}` : `${floor + 1}–${tier.upTo}`;
  return oseMovementRate(tier.base, `Carga detalhada · ${range} moedas`);
}

/** Taxa de movimento pela Carga Simplificada: armadura vestida × tesouro (p. 41). */
export function getOseMovementBySimplifiedLoad(
  armorClass: OseArmorWeightClass = "none",
  carryingTreasure = false,
): OseMovementRate {
  const tier = OSE_SIMPLIFIED_LOAD_TIERS[armorClass];
  const base = carryingTreasure ? tier.withTreasure : tier.withoutTreasure;
  const armorLabel = armorClass === "none" ? "sem armadura" : armorClass === "light" ? "armadura leve" : "armadura pesada";
  return oseMovementRate(base, `Carga simplificada · ${armorLabel}${carryingTreasure ? " · com tesouros" : ""}`);
}

/**
 * Aceita tanto o peso em moedas (modo detalhado, forma usada pelas fichas já
 * gravadas) quanto as opções completas das duas apresentações de carga.
 */
export function getOseMovementByLoad(load: number | OseLoadMovementOptions): OseMovementRate {
  if (typeof load === "number") return getOseMovementByCoinWeight(load);
  if (load.mode === "simplified") return getOseMovementBySimplifiedLoad(load.armorClass, load.carryingTreasure);
  return getOseMovementByCoinWeight(load.coinsWeight ?? 0);
}

/**
 * Alinhamentos do OSE
 */
export type OseAlignment = "ordeiro" | "neutro" | "caotico";

/**
 * Classes humanas que o OSE Classic Fantasy apresenta ao lado das classes
 * raciais. O livro clássico traz sete opções: Clérigo, Anão, Elfo, Guerreiro,
 * Halfling, Mago e Ladrão. As quatro humanas já existem no catálogo com as
 * progressões de 14 níveis do clássico; apenas a regra de disponibilidade não
 * as oferecia.
 */
export const OSE_CLASSIC_CORE_CLASS_IDS = ["clerigo", "guerreiro", "ladrao", "mago"] as const;

/** Em Classic, a classe racial determina a raça da ficha. */
export const OSE_CLASSIC_RACE_BY_CLASS: Record<string, string> = {
  anao_bx: "anao",
  elfo_bx: "elfo",
  halfling_bx: "halfling",
};

/** Classes disponíveis em cada apresentação do núcleo OSE. */
export function isOseClassAvailableForMode(
  oseClass: { id: string; isRaceClass?: boolean },
  mode: "advanced" | "classic",
): boolean {
  if (oseClass.isRaceClass) return mode === "classic";
  if (mode === "advanced") return true;
  return (OSE_CLASSIC_CORE_CLASS_IDS as readonly string[]).includes(oseClass.id);
}

/** A raça só pode escolher classes listadas na própria tabela de progressão racial. */
export function isOseClassAllowedForRace(race: OseRace, selectedClass: OseClass): boolean {
  return Object.prototype.hasOwnProperty.call(race.maxClassLevels, selectedClass.id);
}

/**
 * Retorna quantos espaços de magia a classe possui no nível informado.
 * A progressão guarda uma entrada por círculo: [círculo 1, círculo 2, ...].
 */
export function getOseSpellSlotCount(
  progression: Array<{ level: number; spells?: number[] }>,
  level: number,
  circle = 1,
): number {
  const levelEntry = progression.find((entry) => entry.level === level);
  return Math.max(0, levelEntry?.spells?.[circle - 1] ?? 0);
}

/** Retorna todos os espaços de magia por círculo para a classe/nível informado. */
export function getOseSpellSlotsByCircle(
  progression: Array<{ level: number; spells?: number[] }>,
  level: number,
): number[] {
  const levelEntry = progression.find((entry) => entry.level === level);
  return (levelEntry?.spells || []).map((slots) => Math.max(0, slots));
}

/** Limita uma seleção de magias aos espaços disponíveis por círculo, preservando a ordem da ficha. */
export function limitOseSpellsBySlots(
  spellIds: string[],
  spells: Array<{ id: string; circle: number }>,
  slotsByCircle: number[],
): string[] {
  const counts = new Map<number, number>();
  const catalog = new Map(spells.map((spell) => [spell.id, spell]));
  return spellIds.filter((spellId) => {
    const spell = catalog.get(spellId);
    if (!spell) return false;
    const current = counts.get(spell.circle) || 0;
    const limit = slotsByCircle[spell.circle - 1] || 0;
    if (current >= limit) return false;
    counts.set(spell.circle, current + 1);
    return true;
  });
}

/** Verifica se uma arma respeita as proficiências da classe OSE escolhida. */
export function isOseWeaponAllowedForClass(weapon: OseWeapon, selectedClass: OseClass): boolean {
  if (selectedClass.id === "anao_bx") return !["arco_longo", "espada_duas_maos"].includes(weapon.id);
  if (selectedClass.id === "halfling_bx") return !weapon.isTwoHanded && weapon.id !== "arco_longo";
  if (selectedClass.allowedWeapons === "todas") return true;
  if (selectedClass.allowedWeapons === "sem_corte") return weapon.isBlunt;
  if (selectedClass.allowedWeapons === "adaga_cajado") return ["adaga", "cajado"].includes(weapon.id);
  if (selectedClass.id === "druida") return ["clava", "adaga", "dardo", "cajado", "funda", "lanca"].includes(weapon.id);
  if (selectedClass.id === "acrobata") return ["adaga", "dardo", "cajado", "espada_curta", "funda", "arco_curto"].includes(weapon.id);
  if (selectedClass.id === "bardo") return !weapon.isTwoHanded || ["arco_curto", "arco_longo"].includes(weapon.id);
  return true;
}

/** Verifica se uma armadura ou escudo respeita as proficiências da classe OSE. */
export function isOseArmorAllowedForClass(armor: OseArmor, selectedClass: OseClass): boolean {
  if (armor.isShield) return selectedClass.shieldAllowed;
  if (selectedClass.allowedArmor === "nenhuma") return false;
  if (selectedClass.allowedArmor === "couro") return ["sem_armadura", "couro"].includes(armor.id);
  if (selectedClass.allowedArmor === "couro_e_malha") return ["sem_armadura", "couro", "cota_malha"].includes(armor.id);
  return true;
}

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
 * Perícias Secundárias (tabela d100 opcional)
 *
 * Fonte: Old-School Essentials — **Tomo do Jogador** (Fantasia Avançada),
 * "Habilidades Secundárias (Regra opcional)", p. 25. A citação anterior dizia
 * "Livro de Regras p. 25", mas essa página do Livro de Regras é a progressão
 * de nível do Mago — a tabela veio do Tomo.
 *
 * Divergência declarada: o Tomo imprime "Ferreiro" também na faixa 34–35, que
 * repete a faixa 10–12. Mantemos "Funileiro / Ourives" (tinsmith/goldsmith),
 * que é a leitura coerente com a lista e com a tabela d100 de perícias
 * secundárias do B/X original.
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
