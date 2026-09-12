// ============================================================================
// Old-School Essentials (OSE) - Catálogo de Equipamentos, Armas e Armaduras
// Fonte: OSE Tomo do Jogador págs. 94-98
// ============================================================================

export interface OseWeapon {
  id: string;
  name: string;
  nameEn: string;
  costGp: number;
  weightCoins: number;
  damage: string;
  isMelee: boolean;
  isMissile: boolean;
  rangeShortMedLong?: [number, number, number]; // metros
  isBlunt: boolean; // Sem corte (permitida para clérigo)
  isTwoHanded: boolean;
  isSlow: boolean;
  qualities: string[];
}

export interface OseArmor {
  id: string;
  name: string;
  nameEn: string;
  costGp: number;
  weightCoins: number;
  dac: number; // Descending Armor Class (Base 9 sem armadura)
  aacBonus: number; // Ascending AC bônus (Base 10 sem armadura)
  isShield?: boolean;
}

export interface OseGearItem {
  id: string;
  name: string;
  nameEn: string;
  costGp: number;
  weightCoins: number;
  description: string;
}

export const OSE_WEAPONS: OseWeapon[] = [
  { id: "machado_batalha", name: "Machado de Batalha", nameEn: "Battle Axe", costGp: 7, weightCoins: 50, damage: "1d8", isMelee: true, isMissile: false, isBlunt: false, isTwoHanded: true, isSlow: true, qualities: ["Corpo a corpo", "Lento", "Duas mãos"] },
  { id: "clava", name: "Clava", nameEn: "Club", costGp: 3, weightCoins: 50, damage: "1d4", isMelee: true, isMissile: false, isBlunt: true, isTwoHanded: false, isSlow: false, qualities: ["Sem corte", "Corpo a corpo"] },
  { id: "besta", name: "Besta", nameEn: "Crossbow", costGp: 30, weightCoins: 50, damage: "1d6", isMelee: false, isMissile: true, rangeShortMedLong: [24, 48, 73], isBlunt: false, isTwoHanded: true, isSlow: true, qualities: ["Míssil", "Recarregar", "Lento", "Duas mãos"] },
  { id: "adaga", name: "Adaga", nameEn: "Dagger", costGp: 3, weightCoins: 10, damage: "1d4", isMelee: true, isMissile: true, rangeShortMedLong: [3, 6, 9], isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Corpo a corpo", "Míssil"] },
  { id: "machadinha", name: "Machado de Mão", nameEn: "Hand Axe", costGp: 4, weightCoins: 30, damage: "1d6", isMelee: true, isMissile: true, rangeShortMedLong: [3, 6, 9], isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Corpo a corpo", "Míssil"] },
  { id: "dardo", name: "Dardo", nameEn: "Dart", costGp: 1, weightCoins: 20, damage: "1d4", isMelee: false, isMissile: true, rangeShortMedLong: [4, 9, 13], isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Míssil"] },
  { id: "lanca_montada", name: "Lança de Cavalaria", nameEn: "Lance", costGp: 5, weightCoins: 120, damage: "1d10", isMelee: true, isMissile: false, isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Carga", "Montada"] },
  { id: "arco_longo", name: "Arco Longo", nameEn: "Long Bow", costGp: 40, weightCoins: 30, damage: "1d6", isMelee: false, isMissile: true, rangeShortMedLong: [21, 42, 64], isBlunt: false, isTwoHanded: true, isSlow: false, qualities: ["Míssil", "Duas mãos"] },
  { id: "maca", name: "Maça", nameEn: "Mace", costGp: 5, weightCoins: 30, damage: "1d6", isMelee: true, isMissile: false, isBlunt: true, isTwoHanded: false, isSlow: false, qualities: ["Sem corte", "Corpo a corpo"] },
  { id: "arco_curto", name: "Arco Curto", nameEn: "Short Bow", costGp: 25, weightCoins: 30, damage: "1d6", isMelee: false, isMissile: true, rangeShortMedLong: [15, 30, 45], isBlunt: false, isTwoHanded: true, isSlow: false, qualities: ["Míssil", "Duas mãos"] },
  { id: "espada_curta", name: "Espada Curta", nameEn: "Short Sword", costGp: 7, weightCoins: 30, damage: "1d6", isMelee: true, isMissile: false, isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Corpo a corpo"] },
  { id: "espada", name: "Espada Longa", nameEn: "Sword", costGp: 10, weightCoins: 60, damage: "1d8", isMelee: true, isMissile: false, isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Corpo a corpo"] },
  { id: "espada_duas_maos", name: "Espada de Duas Mãos", nameEn: "Two-Handed Sword", costGp: 15, weightCoins: 150, damage: "1d10", isMelee: true, isMissile: false, isBlunt: false, isTwoHanded: true, isSlow: true, qualities: ["Corpo a corpo", "Lento", "Duas mãos"] },
  { id: "funda", name: "Funda / Estilingue", nameEn: "Sling", costGp: 2, weightCoins: 20, damage: "1d4", isMelee: false, isMissile: true, rangeShortMedLong: [12, 24, 36], isBlunt: true, isTwoHanded: false, isSlow: false, qualities: ["Sem corte", "Míssil"] },
  { id: "lanca", name: "Lança", nameEn: "Spear", costGp: 4, weightCoins: 30, damage: "1d6", isMelee: true, isMissile: true, rangeShortMedLong: [6, 12, 18], isBlunt: false, isTwoHanded: false, isSlow: false, qualities: ["Corpo a corpo", "Míssil", "Apoiar"] },
  { id: "cajado", name: "Cajado", nameEn: "Staff", costGp: 2, weightCoins: 40, damage: "1d4", isMelee: true, isMissile: false, isBlunt: true, isTwoHanded: true, isSlow: true, qualities: ["Sem corte", "Corpo a corpo", "Lento", "Duas mãos"] },
  { id: "martelo_guerra", name: "Martelo de Guerra", nameEn: "War Hammer", costGp: 5, weightCoins: 30, damage: "1d6", isMelee: true, isMissile: false, isBlunt: true, isTwoHanded: false, isSlow: false, qualities: ["Sem corte", "Corpo a corpo"] },
];

export const OSE_ARMORS: OseArmor[] = [
  { id: "sem_armadura", name: "Sem Armadura", nameEn: "Unarmored", costGp: 0, weightCoins: 0, dac: 9, aacBonus: 0 },
  { id: "couro", name: "Armadura de Couro", nameEn: "Leather Armor", costGp: 20, weightCoins: 200, dac: 7, aacBonus: 2 },
  { id: "cota_malha", name: "Cota de Malha", nameEn: "Chainmail", costGp: 40, weightCoins: 400, dac: 5, aacBonus: 4 },
  { id: "placas", name: "Armadura de Placas", nameEn: "Plate Mail", costGp: 60, weightCoins: 500, dac: 3, aacBonus: 6 },
  { id: "escudo", name: "Escudo", nameEn: "Shield", costGp: 10, weightCoins: 100, dac: 8, aacBonus: 1, isShield: true },
];

export const OSE_GEAR: OseGearItem[] = [
  { id: "mochila", name: "Mochila", nameEn: "Backpack", costGp: 5, weightCoins: 20, description: "Comporta até 400 moedas mantendo as mãos livres." },
  { id: "pe_de_cabra", name: "Pé de Cabra", nameEn: "Crowbar", costGp: 10, weightCoins: 50, description: "Ferro sólido de 60-90cm para forçar portas e baús." },
  { id: "alho", name: "Alho (Cabeça)", nameEn: "Garlic", costGp: 5, weightCoins: 1, description: "Repele vampiros e feras supersticiosas." },
  { id: "gancho", name: "Gancho de Escalada", nameEn: "Grappling Hook", costGp: 25, weightCoins: 40, description: "Gancho de ferro com 3 ou 4 pontas para ancorar cordas." },
  { id: "martelo", name: "Martelo Pequeno", nameEn: "Hammer (Small)", costGp: 2, weightCoins: 10, description: "Usado para pregar estacas de madeira ou pontas de ferro." },
  { id: "simbolo_sagrado", name: "Símbolo Sagrado", nameEn: "Holy Symbol", costGp: 25, weightCoins: 5, description: "Necessário para clérigos e paladinos realizarem milagres e expulsar mortos-vivos." },
  { id: "agua_benta", name: "Água Benta (Frasco)", nameEn: "Holy Water (Vial)", costGp: 25, weightCoins: 10, description: "Causa 1d8 de dano ácido contra mortos-vivos e demônios." },
  { id: "pontas_ferro", name: "Pontas de Ferro (12)", nameEn: "Iron Spikes (12)", costGp: 1, weightCoins: 60, description: "Úteis para travar portas abertas ou fechadas e apoiar escaladas." },
  { id: "lanterna", name: "Lanterna Fechada", nameEn: "Lantern", costGp: 10, weightCoins: 30, description: "Ilumina raio de 9 metros. Um frasco de óleo dura 4 horas." },
  { id: "espelho", name: "Espelho de Mão (Aço)", nameEn: "Mirror (Hand-sized, Steel)", costGp: 5, weightCoins: 5, description: "Útil para olhar cantos ou refletir o olhar de medusas." },
  { id: "oleo", name: "Óleo (1 Frasco)", nameEn: "Oil (1 Flask)", costGp: 2, weightCoins: 10, description: "Combustível de lanterna ou arma arremessável incendiária (1d8)." },
  { id: "vara_3m", name: "Vara de Madeira (3m)", nameEn: "Pole (10ft)", costGp: 1, weightCoins: 40, description: "Vara de 5cm de espessura útil para testar armadilhas e pisos falsos." },
  { id: "racoes_conservadas", name: "Rações Conservadas (7 dias)", nameEn: "Rations (Iron, 7 days)", costGp: 15, weightCoins: 70, description: "Alimento seco que não estraga em masmorras e expedições longas." },
  { id: "racoes_padrao", name: "Rações Padrão (7 dias)", nameEn: "Rations (Standard, 7 days)", costGp: 5, weightCoins: 140, description: "Comida fresca perecível." },
  { id: "corda_15m", name: "Corda de Cânhamo (15m)", nameEn: "Rope (50ft)", costGp: 1, weightCoins: 50, description: "Suporta até três aventureiros com peso normal." },
  { id: "saco_grande", name: "Saco Grande", nameEn: "Sack (Large)", costGp: 2, weightCoins: 5, description: "Comporta até 600 moedas." },
  { id: "saco_pequeno", name: "Saco Pequeno", nameEn: "Sack (Small)", costGp: 1, weightCoins: 1, description: "Comporta até 200 moedas." },
  { id: "estacas_madeira", name: "Estacas de Madeira (3)", nameEn: "Stakes (3)", costGp: 3, weightCoins: 15, description: "Valiosas para imobilizar vampiros no coração." },
  { id: "ferramentas_ladrao", name: "Ferramentas de Ladrão", nameEn: "Thieves' Tools", costGp: 25, weightCoins: 10, description: "Gazuas e palhetas indispensáveis para abrir fechaduras e desarmar armadilhas." },
  { id: "pederneira", name: "Pederneira e Aço", nameEn: "Tinder Box", costGp: 3, weightCoins: 5, description: "Permite acender tochas e fogueiras em 1 rodada." },
  { id: "tochas_6", name: "Tochas (Maço com 6)", nameEn: "Torches (6)", costGp: 1, weightCoins: 120, description: "Cada tocha queima por 1 hora (6 turnos) iluminando 9 metros." },
  { id: "odre", name: "Odre de Água", nameEn: "Waterskin", costGp: 1, weightCoins: 30, description: "Contém 1 litro de água fresca." },
  { id: "flechas_20", name: "Aljava com 20 Flechas", nameEn: "Arrows (20)", costGp: 5, weightCoins: 20, description: "Munição para arco curto ou arco longo." },
  { id: "virotes_30", name: "Estojo com 30 Virotes", nameEn: "Crossbow Bolts (30)", costGp: 10, weightCoins: 30, description: "Munição de besta pesada." },
  { id: "erva_de_lobo", name: "Erva de Lobo (Acônito)", nameEn: "Wolfsbane", costGp: 10, weightCoins: 1, description: "Repele lobisomens e licantropos." },
];

/**
 * Calcula Classe de Armadura (DAC e AAC) do personagem com base na armadura e Destreza
 */
export function calculateOseArmorClass(
  armor: OseArmor | null,
  hasShield: boolean,
  dexMod: number
): { dac: number; aac: number } {
  // DAC: Base 9. Armadura melhora (diminui) a CA. Escudo diminui 1. DEX mod diminui CA.
  // AAC: Base 10. Armadura aumenta AAC. Escudo aumenta 1. DEX mod aumenta CA.
  let baseDac = armor ? armor.dac : 9;
  let baseAac = armor ? 10 + armor.aacBonus : 10;

  if (hasShield) {
    baseDac -= 1;
    baseAac += 1;
  }

  // Modificador de Destreza
  const finalDac = baseDac - dexMod;
  const finalAac = baseAac + dexMod;

  return { dac: finalDac, aac: finalAac };
}
