// ============================================================================
// Old-School Essentials (OSE) - Catálogo de Classes (Advanced & Classic)
// Fonte: OSE Tomo do Jogador págs. 28-77
// ============================================================================

import type { OseAbilityName, OseSavingThrows } from "./oseRules";

export type OseCombatCategory = "marcial" | "semimarcial" | "nao_marcial";

export interface OseClassProgression {
  level: number;
  xp: number;
  hd: string;
  thac0: number;
  aacBonus: number; // Attack bonus no sistema de CA Ascendente
  saves: OseSavingThrows;
  spells?: number[]; // [nível 1, nível 2, nível 3, ...]
}

export interface OseClassThiefSkills {
  esi: number; // Escalar Superfícies Íngremes
  et: number;  // Encontrar Armadilhas
  ob: number;  // Operar Mecanismos
  es: number;  // Esconder nas Sombras
  ms: number;  // Mover Silenciosamente
  af: number;  // Abrir Fechaduras
  pb: number;  // Pungar Bolsos
  orSkill?: number; // Ouvir Ruídos (X em 6)
}

export interface OseClassAcrobatSkills {
  ssi: number; // Subir Superfícies Íngremes
  qu: number;  // Queda (% de redução de dano)
  es: number;  // Esconder nas Sombras
  ms: number;  // Mover Silenciosamente
  ccb: number; // Caminhada na Corda Bamba
  salto?: string;
  evasao?: string;
}

export interface OseClass {
  id: string;
  name: string;
  nameEn: string;
  sourceBook?: string;
  sourcePage?: number;
  isRaceClass?: boolean; // True para classes B/X onde a raça é a própria classe
  description: string;
  primeRequisites: OseAbilityName[];
  minRequirements: Partial<Record<OseAbilityName, number>>;
  hitDie: "d4" | "d6" | "d8";
  allowedArmor: "nenhuma" | "couro" | "couro_e_malha" | "todas";
  shieldAllowed: boolean;
  allowedWeapons: "adaga_cajado" | "sem_corte" | "restrita" | "todas";
  allowedWeaponsDesc: string;
  combatCategory: OseCombatCategory;
  spellCasting?: {
    type: "divina" | "arcana" | "druidica" | "ilusionista";
    spellListName: string;
    startLevel: number;
  };
  features: string[];
  progression: OseClassProgression[];
  thiefSkills?: Record<number, OseClassThiefSkills>;
  acrobatSkills?: Record<number, OseClassAcrobatSkills>;
}

export const OSE_CLASSES: Record<string, OseClass> = {
  guerreiro: {
    id: "guerreiro",
    name: "Guerreiro",
    nameEn: "Fighter",
    description: "Mestres do combate corpo a corpo e à distância, treinados para resistir e liderar forças em campo aberto.",
    primeRequisites: ["str"],
    minRequirements: {},
    hitDie: "d8",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode empunhar qualquer arma de combate.",
    combatCategory: "marcial",
    features: [
      "Treinamento Bélico Total: Pode vestir qualquer armadura, usar escudo e todas as armas.",
      "Fortaleza (9º nível): Pode construir um castelo fortificado e liderar homens-de-armas mercenários.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 2, xp: 2000, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 3, xp: 4000, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 4, xp: 8000, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 5, xp: 16000, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 6, xp: 32000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 7, xp: 64000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 8, xp: 120000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 9, xp: 240000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 10, xp: 360000, hd: "9d8+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 11, xp: 480000, hd: "9d8+4", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 12, xp: 600000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 13, xp: 720000, hd: "9d8+8", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
      { level: 14, xp: 840000, hd: "9d8+10", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
    ],
  },
  clerigo: {
    id: "clerigo",
    name: "Clérigo",
    nameEn: "Cleric",
    description: "Campeões da fé e servos dos deuses, combinando habilidade marcial com milagres e cura sagrada.",
    primeRequisites: ["wis"],
    minRequirements: {},
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "sem_corte",
    allowedWeaponsDesc: "Apenas armas contundentes sem corte (maça, clava, martelo de guerra, cajado, funda).",
    combatCategory: "semimarcial",
    spellCasting: {
      type: "divina",
      spellListName: "clerigo",
      startLevel: 1, // OSE Advanced permite 1 magia no nível 1
    },
    features: [
      "Expulsar Mortos-Vivos: Pode afastar ou destruir esqueletos, zumbis, ghouls e vampiros com seu símbolo sagrado.",
      "Magias Divinas: Ora diretamente para sua divindade para receber milagres diários.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [1] },
      { level: 2, xp: 1500, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2] },
      { level: 3, xp: 3000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2, 1] },
      { level: 4, xp: 6000, hd: "4d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2, 2] },
      { level: 5, xp: 12000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [2, 2, 1] },
      // Tomo do Jogador p. 37. O 6º nível trazia [2,2,2] (sem o 4º círculo) e o
      // 7º trazia [3,2,2,1], deslocando os círculos a partir daí.
      { level: 6, xp: 25000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [2, 2, 1, 1] },
      { level: 7, xp: 50000, hd: "7d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [2, 2, 2, 1, 1] },
      { level: 8, xp: 100000, hd: "8d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [3, 3, 2, 2, 1] },
      { level: 9, xp: 200000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [3, 3, 3, 2, 2] },
      { level: 10, xp: 300000, hd: "9d6+1", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [4, 4, 3, 3, 2] },
      { level: 11, xp: 400000, hd: "9d6+2", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [4, 4, 4, 3, 3] },
      { level: 12, xp: 500000, hd: "9d6+3", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [5, 5, 4, 4, 3] },
      { level: 13, xp: 600000, hd: "9d6+4", thac0: 12, aacBonus: 7, saves: { death: 3, wands: 5, paralysis: 7, breath: 8, spells: 7 }, spells: [5, 5, 5, 4, 4] },
      { level: 14, xp: 700000, hd: "9d6+5", thac0: 12, aacBonus: 7, saves: { death: 3, wands: 5, paralysis: 7, breath: 8, spells: 7 }, spells: [6, 5, 5, 5, 4] },
    ],
  },
  ladrao: {
    id: "ladrao",
    name: "Ladrão",
    nameEn: "Thief",
    description: "Especialistas em infiltração, arrombamento, furto, ataque furtivo e desarmar armadilhas mortais.",
    primeRequisites: ["dex"],
    minRequirements: {},
    hitDie: "d4",
    allowedArmor: "couro",
    shieldAllowed: false,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "semimarcial",
    features: [
      "Ataque Furtivo: Se atacar pelas costas sem ser detectado, recebe +4 no ataque e causa dano x2.",
      "Perícias de Ladrão: Rola d% para Escalar (ESI), Encontrar Armadilhas (ET), Operar Mecanismos (OB), Esconder-se (ES), Mover em Silêncio (MS), Abrir Fechaduras (AF) e Pungar (PB).",
      "Ler Pergaminhos (4º nível): Chance de 80% de ler pergaminhos arcanos.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 2, xp: 1200, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 3, xp: 2400, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 4, xp: 4800, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 5, xp: 9600, hd: "5d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 6, xp: 20000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 7, xp: 40000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 8, xp: 80000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 9, xp: 160000, hd: "9d4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 10, xp: 280000, hd: "9d4+2", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 11, xp: 400000, hd: "9d4+4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 12, xp: 520000, hd: "9d4+6", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 13, xp: 640000, hd: "9d4+8", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
      { level: 14, xp: 760000, hd: "9d4+10", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
    ],
    thiefSkills: {
      1: { esi: 87, et: 10, ob: 10, es: 10, ms: 20, af: 15, pb: 20, orSkill: 2 },
      2: { esi: 88, et: 15, ob: 15, es: 15, ms: 25, af: 20, pb: 25, orSkill: 2 },
      3: { esi: 89, et: 20, ob: 20, es: 20, ms: 30, af: 25, pb: 30, orSkill: 3 },
      4: { esi: 90, et: 25, ob: 25, es: 25, ms: 35, af: 31, pb: 35, orSkill: 3 },
      5: { esi: 91, et: 30, ob: 30, es: 30, ms: 40, af: 37, pb: 40, orSkill: 3 },
      6: { esi: 92, et: 40, ob: 37, es: 36, ms: 45, af: 43, pb: 45, orSkill: 4 },
      7: { esi: 93, et: 50, ob: 44, es: 45, ms: 55, af: 50, pb: 55, orSkill: 4 },
      8: { esi: 94, et: 60, ob: 52, es: 55, ms: 65, af: 56, pb: 65, orSkill: 4 },
      9: { esi: 95, et: 70, ob: 60, es: 65, ms: 75, af: 62, pb: 75, orSkill: 5 },
      10: { esi: 96, et: 80, ob: 68, es: 75, ms: 85, af: 68, pb: 85, orSkill: 5 },
      11: { esi: 97, et: 90, ob: 75, es: 85, ms: 95, af: 74, pb: 95, orSkill: 5 },
      12: { esi: 98, et: 95, ob: 83, es: 90, ms: 96, af: 80, pb: 105, orSkill: 5 },
      13: { esi: 99, et: 97, ob: 90, es: 95, ms: 98, af: 85, pb: 115, orSkill: 6 },
      14: { esi: 99, et: 99, ob: 97, es: 99, ms: 99, af: 90, pb: 125, orSkill: 6 },
    },
  },
  mago: {
    id: "mago",
    name: "Mago",
    nameEn: "Magic-User",
    description: "Estudiosos dos mistérios arcanos capazes de alterar a realidade, o tempo e o espaço através de fórmulas inscritas em seus grimórios.",
    primeRequisites: ["int"],
    minRequirements: {},
    hitDie: "d4",
    allowedArmor: "nenhuma",
    shieldAllowed: false,
    allowedWeapons: "adaga_cajado",
    allowedWeaponsDesc: "Apenas adaga e cajado.",
    combatCategory: "nao_marcial",
    spellCasting: {
      type: "arcana",
      spellListName: "mago",
      startLevel: 1,
    },
    features: [
      "Grimório de Feitiços: Começa com Ler Magia e uma magia de 1º círculo de sua escolha.",
      "Pesquisa Mágica (9º nível): Pode construir uma torre mágica e pesquisar novos feitiços ou criar itens mágicos.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [1] },
      { level: 2, xp: 2500, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2] },
      { level: 3, xp: 5000, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 1] },
      { level: 4, xp: 10000, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 2] },
      { level: 5, xp: 20000, hd: "5d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 2, 1] },
      { level: 6, xp: 40000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [2, 2, 2] },
      { level: 7, xp: 80000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 2, 2, 1] },
      { level: 8, xp: 150000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 2, 2] },
      { level: 9, xp: 300000, hd: "9d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 3, 2, 1] },
      { level: 10, xp: 450000, hd: "9d4+1", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 3, 3, 2] },
      { level: 11, xp: 600000, hd: "9d4+2", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 3, 3, 3, 2, 1] },
      { level: 12, xp: 750000, hd: "9d4+3", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 3, 3, 3, 2] },
      { level: 13, xp: 900000, hd: "9d4+4", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 4, 3, 3, 3] },
      { level: 14, xp: 1050000, hd: "9d4+5", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 4, 4, 3, 3] },
    ],
  },
  acrobata: {
    id: "acrobata",
    name: "Acrobata",
    nameEn: "Acrobat",
    description: "Artistas ágeis e ginastas furtivos, hábeis em saltos acrobáticos, equilíbrio em cordas e evasão de quedas.",
    primeRequisites: ["dex"],
    minRequirements: {},
    hitDie: "d4",
    allowedArmor: "couro",
    shieldAllowed: false,
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Adaga, dardo, cajado, espada curta, estilingue, arco curto.",
    combatCategory: "semimarcial",
    features: [
      "Queda com Evasão: Reduz substancialmente danos de quedas altas.",
      "Caminhada na Corda Bamba: Anda sobre cordas e vigas em velocidade sem perder o equilíbrio.",
      "Salto Acrobático: Salta grandes distâncias sobre obstáculos e oponentes.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 2, xp: 1200, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 3, xp: 2400, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 4, xp: 4800, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 5, xp: 9600, hd: "5d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 6, xp: 20000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 7, xp: 40000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 8, xp: 80000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 9, xp: 160000, hd: "9d4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 10, xp: 280000, hd: "9d4+2", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 11, xp: 400000, hd: "9d4+4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 12, xp: 520000, hd: "9d4+6", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 13, xp: 640000, hd: "9d4+8", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
      { level: 14, xp: 760000, hd: "9d4+10", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
    ],
    acrobatSkills: {
      1: { ssi: 87, qu: 25, es: 10, ms: 20, ccb: 60 },
      2: { ssi: 88, qu: 25, es: 15, ms: 25, ccb: 65 },
      3: { ssi: 89, qu: 25, es: 20, ms: 30, ccb: 70 },
      4: { ssi: 90, qu: 33, es: 25, ms: 35, ccb: 75 },
      5: { ssi: 91, qu: 33, es: 30, ms: 40, ccb: 80 },
      6: { ssi: 92, qu: 33, es: 33, ms: 43, ccb: 85 },
      7: { ssi: 93, qu: 33, es: 36, ms: 46, ccb: 90 },
      8: { ssi: 94, qu: 50, es: 40, ms: 50, ccb: 95 },
      9: { ssi: 95, qu: 50, es: 43, ms: 53, ccb: 99 },
      10: { ssi: 96, qu: 50, es: 46, ms: 56, ccb: 99 },
      11: { ssi: 97, qu: 50, es: 50, ms: 60, ccb: 99 },
      12: { ssi: 98, qu: 66, es: 53, ms: 63, ccb: 99 },
      13: { ssi: 99, qu: 66, es: 56, ms: 66, ccb: 99 },
      14: { ssi: 99, qu: 75, es: 60, ms: 70, ccb: 99 },
    },
  },
  assassino: {
    id: "assassino",
    name: "Assassino",
    nameEn: "Assassin",
    description: "Peritos em morte silenciosa, disfarce impecável e fabricação de venenos letais.",
    // Tomo do Jogador p. 30: "Requisitos: Nenhum; Requisito principal: DES".
    primeRequisites: ["dex"],
    minRequirements: {},
    hitDie: "d4",
    allowedArmor: "couro",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "semimarcial",
    features: [
      "Golpe Assassino: Ataque surpresa por trás que pode matar instantaneamente ou infligir dano quadruplicado.",
      "Disfarce Especialista: Capaz de se passar por qualquer pessoa de outra raça ou classe.",
      "Fabricação e Aplicação de Venenos: Treinado para manusear toxinas sem risco de autoenvenenamento.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 2, xp: 1500, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 3, xp: 3000, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 4, xp: 6000, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 5, xp: 12000, hd: "5d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 6, xp: 25000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 7, xp: 50000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 8, xp: 100000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 9, xp: 200000, hd: "9d4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 10, xp: 300000, hd: "9d4+2", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 11, xp: 425000, hd: "9d4+4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 12, xp: 575000, hd: "9d4+6", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 } },
      { level: 13, xp: 750000, hd: "9d4+8", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
      { level: 14, xp: 1000000, hd: "9d4+10", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 } },
    ],
  },
  barbaro: {
    id: "barbaro",
    name: "Bárbaro",
    nameEn: "Barbarian",
    description: "Guerreiros impetuosos das estepes e montanhas, com constituição formidável e intuição selvagem.",
    // Tomo do Jogador p. 32: "Requisitos: Mínimo FOR 9; Requisito principal: FOR".
    primeRequisites: ["str"],
    minRequirements: { str: 9 },
    hitDie: "d8",
    allowedArmor: "couro_e_malha",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "marcial",
    features: [
      "Vigor Selvagem: Ganha PV adicional e recupera pontos de vida mais rápido durante o descanso.",
      "Esquiva Sobrenatural: Surpresa reduzida (apenas 1 em 6 de ser emboscado).",
      "Perícias da Selva: Rola para Rastrear, Subir Penhascos e Evitar Perigos Naturais.",
    ],
    progression: [
      // Tomo do Jogador p. 33. As resistências do 4º ao 9º nível traziam o
      // Ataque de Sopro um ponto acima do livro (14 em vez de 13).
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 13, paralysis: 12, breath: 15, spells: 16 } },
      { level: 2, xp: 2500, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 13, paralysis: 12, breath: 15, spells: 16 } },
      { level: 3, xp: 5000, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 13, paralysis: 12, breath: 15, spells: 16 } },
      { level: 4, xp: 10000, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 11, paralysis: 10, breath: 13, spells: 13 } },
      { level: 5, xp: 18500, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 11, paralysis: 10, breath: 13, spells: 13 } },
      { level: 6, xp: 37000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 11, paralysis: 10, breath: 13, spells: 13 } },
      { level: 7, xp: 85000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 9, paralysis: 8, breath: 10, spells: 10 } },
      { level: 8, xp: 140000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 9, paralysis: 8, breath: 10, spells: 10 } },
      { level: 9, xp: 270000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 9, paralysis: 8, breath: 10, spells: 10 } },
      { level: 10, xp: 400000, hd: "9d8+3", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 7, paralysis: 6, breath: 8, spells: 7 } },
      { level: 11, xp: 530000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 7, paralysis: 6, breath: 8, spells: 7 } },
      { level: 12, xp: 660000, hd: "9d8+9", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 7, paralysis: 6, breath: 8, spells: 7 } },
      { level: 13, xp: 790000, hd: "9d8+12", thac0: 10, aacBonus: 9, saves: { death: 3, wands: 5, paralysis: 4, breath: 5, spells: 5 } },
      { level: 14, xp: 920000, hd: "9d8+15", thac0: 10, aacBonus: 9, saves: { death: 3, wands: 5, paralysis: 4, breath: 5, spells: 5 } },
    ],
  },
  bardo: {
    id: "bardo",
    name: "Bardo",
    nameEn: "Bard",
    description: "Trovadores e poetas aventureiros, conhecedores de lendas antigas, canções mágicas e feitiços arcanos.",
    // Tomo do Jogador p. 34: "Requisitos: Mínimo DES 9, Mínimo INT 9; Requisito principal: CAR".
    primeRequisites: ["cha"],
    minRequirements: { dex: 9, int: 9 },
    hitDie: "d6",
    allowedArmor: "couro_e_malha",
    shieldAllowed: false,
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Armas de uma mão, dardos, estilingues e arcos.",
    combatCategory: "semimarcial",
    spellCasting: {
      type: "arcana",
      spellListName: "mago",
      startLevel: 2,
    },
    features: [
      "Canção de Fascinação: Canção capaz de acalmar feras e encantar ouvintes.",
      "Conhecimento de Lendas: Chance de identificar a história e poderes de itens lendários.",
      "Feitiços Arcanos: Conhece e conjura magias de mago a partir do 2º nível.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 2, xp: 2000, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [1] },
      { level: 3, xp: 4000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2] },
      { level: 4, xp: 8000, hd: "4d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 1] },
      { level: 5, xp: 16000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 }, spells: [2, 2] },
      { level: 6, xp: 32000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 }, spells: [2, 2, 1] },
      { level: 7, xp: 64000, hd: "7d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 }, spells: [3, 2, 2] },
      { level: 8, xp: 120000, hd: "8d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 }, spells: [3, 3, 2, 1] },
      { level: 9, xp: 240000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 }, spells: [3, 3, 3, 2] },
      { level: 10, xp: 360000, hd: "9d6+2", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 }, spells: [3, 3, 3, 3] },
      { level: 11, xp: 480000, hd: "9d6+4", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 }, spells: [3, 3, 3, 3, 1] },
      { level: 12, xp: 600000, hd: "9d6+6", thac0: 14, aacBonus: 5, saves: { death: 10, wands: 11, paralysis: 9, breath: 12, spells: 10 }, spells: [3, 3, 3, 3, 2] },
      { level: 13, xp: 720000, hd: "9d6+8", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 }, spells: [3, 3, 3, 3, 3] },
      { level: 14, xp: 840000, hd: "9d6+10", thac0: 12, aacBonus: 7, saves: { death: 8, wands: 9, paralysis: 7, breath: 10, spells: 8 }, spells: [4, 4, 3, 3, 3] },
    ],
  },
  druida: {
    id: "druida",
    name: "Druida",
    nameEn: "Druid",
    description: "Guardiões dos bosques sagrados e forças primordiais, mestres do clima, flora e transmutação animal.",
    // Tomo do Jogador p. 40: "Requisitos: Nenhum; Requisito principal: SAB".
    primeRequisites: ["wis"],
    minRequirements: {},
    hitDie: "d6",
    allowedArmor: "couro",
    shieldAllowed: true, // Escudo de madeira apenas
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Clava, adaga, dardo, cajado, funda, lança (sem metais nas armaduras/escudos).",
    combatCategory: "semimarcial",
    spellCasting: {
      type: "druidica",
      spellListName: "druida",
      startLevel: 1,
    },
    features: [
      "Magias da Natureza: Conjura magias de druida desde o 1º nível.",
      "Identificar Plantas e Animais: Identifica espécies puras e água potável com precisão.",
      "Forma Selvagem (8º nível): Pode transformar-se em animais terrestres, aves e répteis 3x ao dia.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [1] },
      { level: 2, xp: 2000, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2] },
      { level: 3, xp: 4000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2, 1] },
      // Tomo do Jogador p. 41. Os XP do 4º ao 8º nível estavam deslocados (o 4º
      // era 8.000 em vez de 7.500 e o 8º era 120.000 em vez de 60.000).
      { level: 4, xp: 7500, hd: "4d6", thac0: 19, aacBonus: 0, saves: { death: 11, wands: 12, paralysis: 14, breath: 16, spells: 15 }, spells: [2, 2] },
      { level: 5, xp: 12500, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [2, 2, 1, 1] },
      { level: 6, xp: 20000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [2, 2, 2, 1, 1] },
      { level: 7, xp: 35000, hd: "7d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [3, 3, 2, 2, 1] },
      { level: 8, xp: 60000, hd: "8d6", thac0: 17, aacBonus: 2, saves: { death: 9, wands: 10, paralysis: 12, breath: 14, spells: 12 }, spells: [3, 3, 3, 2, 2] },
      { level: 9, xp: 90000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [4, 4, 3, 3, 2] },
      { level: 10, xp: 125000, hd: "9d6+1", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [4, 4, 4, 3, 3] },
      { level: 11, xp: 200000, hd: "9d6+2", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [5, 5, 4, 4, 3] },
      { level: 12, xp: 300000, hd: "9d6+3", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 9, breath: 11, spells: 9 }, spells: [5, 5, 5, 4, 4] },
      { level: 13, xp: 750000, hd: "9d6+4", thac0: 12, aacBonus: 7, saves: { death: 3, wands: 5, paralysis: 7, breath: 8, spells: 7 }, spells: [6, 5, 5, 5, 4] },
      { level: 14, xp: 1500000, hd: "9d6+5", thac0: 12, aacBonus: 7, saves: { death: 3, wands: 5, paralysis: 7, breath: 8, spells: 7 }, spells: [6, 6, 5, 5, 5] },
    ],
  },
  paladino: {
    id: "paladino",
    name: "Paladino",
    nameEn: "Paladin",
    description: "Cavaleiros sagrados devotados à ordem e à justiça divina, protegidos por auras benevolentes e cura sagrada.",
    // Tomo do Jogador p. 68: "Requisitos: Mínimo CAR 9; Requisito principal: FOR e SAB".
    primeRequisites: ["str", "wis"],
    minRequirements: { cha: 9 },
    hitDie: "d8",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "marcial",
    features: [
      "Imposição de Mãos: Cura 2 PV por nível do paladino 1x por dia.",
      "Aura Sagrada: Bônus de +2 em todas as jogadas de resistência.",
      "Detectar o Mal: Capaz de sentir intenções malignas a até 18 metros.",
      "Expulsar Mortos-Vivos (2º nível): Afasta mortos-vivos com autoridade divina.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 2, xp: 2750, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 3, xp: 5500, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 4, xp: 12000, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 9, paralysis: 10, breath: 11, spells: 12 } },
      { level: 5, xp: 24000, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 9, paralysis: 10, breath: 11, spells: 12 } },
      { level: 6, xp: 45000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 8, wands: 9, paralysis: 10, breath: 11, spells: 12 } },
      { level: 7, xp: 95000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 8, xp: 175000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 9, xp: 350000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 }, spells: [1] },
      { level: 10, xp: 500000, hd: "9d8+2", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 5, paralysis: 6, breath: 6, spells: 8 }, spells: [2] },
      { level: 11, xp: 650000, hd: "9d8+4", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 5, paralysis: 6, breath: 6, spells: 8 }, spells: [2, 1] },
      { level: 12, xp: 800000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 4, wands: 5, paralysis: 6, breath: 6, spells: 8 }, spells: [2, 2] },
      { level: 13, xp: 950000, hd: "9d8+8", thac0: 10, aacBonus: 9, saves: { death: 2, wands: 3, paralysis: 4, breath: 3, spells: 6 }, spells: [2, 2, 1] },
      { level: 14, xp: 1100000, hd: "9d8+10", thac0: 10, aacBonus: 9, saves: { death: 2, wands: 3, paralysis: 4, breath: 3, spells: 6 }, spells: [3, 2, 1] },
    ],
  },
  ranger: {
    id: "ranger",
    name: "Ranger",
    nameEn: "Ranger",
    description: "Rastreadores solitários das fronteiras selvagens, letais com arco e espadas, defensores contra monstruosidades.",
    // Tomo do Jogador p. 70: "Requisitos: Mínimo CON 9, Mínimo SAB 9; Requisito principal: FOR".
    primeRequisites: ["str"],
    minRequirements: { con: 9, wis: 9 },
    hitDie: "d8",
    allowedArmor: "couro_e_malha",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "marcial",
    features: [
      "Rastreamento Superior: 90% de chance de seguir rastros em terras selvagens e masmorras.",
      "Furtividade Natural: Pode se esconder nas sombras e mover-se silenciosamente na natureza.",
      "Dano contra Gigantes: Causa +1 de dano por nível contra humanoides gigantescos e ogros.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 2, xp: 2250, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 3, xp: 4500, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 4, xp: 10000, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 5, xp: 20000, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 6, xp: 40000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 7, xp: 90000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 8, xp: 150000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 9, xp: 300000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 10, xp: 425000, hd: "9d8+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 11, xp: 550000, hd: "9d8+4", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 12, xp: 675000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 13, xp: 800000, hd: "9d8+8", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
      { level: 14, xp: 925000, hd: "9d8+10", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
    ],
  },
  ilusionista: {
    id: "ilusionista",
    name: "Ilusionista",
    nameEn: "Illusionist",
    description: "Mestres dos truques óticos, névoas cintilantes, miragens vivas e ilusões capazes de enganar mente e sentidos.",
    // Tomo do Jogador p. 62: "Requisitos: Mínimo DES 9; Requisito principal: INT".
    primeRequisites: ["int"],
    minRequirements: { dex: 9 },
    hitDie: "d4",
    allowedArmor: "nenhuma",
    shieldAllowed: false,
    allowedWeapons: "adaga_cajado",
    allowedWeaponsDesc: "Apenas adaga e cajado.",
    combatCategory: "nao_marcial",
    spellCasting: {
      type: "ilusionista",
      spellListName: "ilusionista",
      startLevel: 1,
    },
    features: [
      "Grimório de Ilusões: Conhece feitiços visuais e hipnóticos exclusivos de sua ordem.",
      "Mente Astuta: Resistência aprimorada contra feitiços de ilusão e confusão.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [1] },
      { level: 2, xp: 2500, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2] },
      { level: 3, xp: 5000, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 1] },
      { level: 4, xp: 10000, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 2] },
      { level: 5, xp: 20000, hd: "5d4", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 }, spells: [2, 2, 1] },
      { level: 6, xp: 40000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [2, 2, 2] },
      { level: 7, xp: 80000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 2, 2, 1] },
      { level: 8, xp: 150000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 2, 2] },
      { level: 9, xp: 300000, hd: "9d4", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 3, 2, 1] },
      { level: 10, xp: 450000, hd: "9d4+1", thac0: 17, aacBonus: 2, saves: { death: 11, wands: 12, paralysis: 11, breath: 14, spells: 12 }, spells: [3, 3, 3, 3, 2] },
      { level: 11, xp: 600000, hd: "9d4+2", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 3, 3, 3, 2, 1] },
      { level: 12, xp: 750000, hd: "9d4+3", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 3, 3, 3, 2] },
      { level: 13, xp: 900000, hd: "9d4+4", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 4, 3, 3, 3] },
      { level: 14, xp: 1050000, hd: "9d4+5", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 8, breath: 11, spells: 8 }, spells: [4, 4, 4, 4, 3, 3] },
    ],
  },
  cavaleiro: {
    id: "cavaleiro",
    name: "Cavaleiro",
    nameEn: "Knight",
    description: "Membros da nobreza e ordens cavalheirescas juramentadas, especialistas em combate montado e honra bélica.",
    // Tomo do Jogador p. 64: "Requisitos: Mínimo CON 9, Mínimo DES 9; Requisito principal: FOR".
    primeRequisites: ["str"],
    minRequirements: { con: 9, dex: 9 },
    hitDie: "d8",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "marcial",
    features: [
      "Combate Montado Formidável: Bônus de +1 em ataques a cavalo e investida devastadora.",
      "Hospitalidade Feudal: Direito a abrigo e boas-vindas em castelos e ordens nobres.",
      "Código de Honra: Obriga-se à lealdade, proteção dos desamparados e combate leal.",
    ],
    // Tomo do Jogador p. 65. A progressão anterior era a do Guerreiro copiada:
    // XP e DV do 5º nível em diante não eram os do Cavaleiro (eram mais generosos).
    progression: [
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 2, xp: 2500, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 3, xp: 5000, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 14, breath: 15, spells: 16 } },
      { level: 4, xp: 10000, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 5, xp: 18500, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 6, xp: 37000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 12, breath: 13, spells: 14 } },
      { level: 7, xp: 85000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 8, xp: 140000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 9, xp: 270000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 10, breath: 10, spells: 12 } },
      { level: 10, xp: 400000, hd: "9d8+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 11, xp: 530000, hd: "9d8+4", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 12, xp: 660000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 10 } },
      { level: 13, xp: 790000, hd: "9d8+8", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
      { level: 14, xp: 920000, hd: "9d8+10", thac0: 10, aacBonus: 9, saves: { death: 4, wands: 5, paralysis: 6, breath: 5, spells: 8 } },
    ],
  },
  // Classes Clássicas B/X onde a Raça é a Classe:
  anao_bx: {
    id: "anao_bx",
    name: "Anão (Classe Clássica)",
    nameEn: "Dwarf (Classic)",
    isRaceClass: true,
    description: "Classe de aventureiro anão no estilo B/X tradicional. Combina grande resistência, vida de guerreiro e habilidades em alvenaria.",
    primeRequisites: ["str"],
    minRequirements: { con: 9 },
    hitDie: "d8",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Todas as armas (exceto arcos longos e espadas de duas mãos).",
    combatCategory: "marcial",
    features: [
      "Robustez Mineral: Saves defensivos excepcionais contra Magia e Veneno.",
      "Detectar Construções: 2 em 6 ao inspecionar alvenaria e mecanismos.",
      "Infravisão: 18m no escuro total.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d8", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 2, xp: 2200, hd: "2d8", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 3, xp: 4400, hd: "3d8", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 4, xp: 8800, hd: "4d8", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 5, xp: 17000, hd: "5d8", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 6, xp: 35000, hd: "6d8", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 7, xp: 70000, hd: "7d8", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 8, xp: 140000, hd: "8d8", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 9, xp: 270000, hd: "9d8", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 10, xp: 400000, hd: "9d8+3", thac0: 12, aacBonus: 7, saves: { death: 2, wands: 3, paralysis: 4, breath: 4, spells: 6 } },
      { level: 11, xp: 530000, hd: "9d8+6", thac0: 12, aacBonus: 7, saves: { death: 2, wands: 3, paralysis: 4, breath: 4, spells: 6 } },
      { level: 12, xp: 660000, hd: "9d8+9", thac0: 12, aacBonus: 7, saves: { death: 2, wands: 3, paralysis: 4, breath: 4, spells: 6 } },
    ],
  },
  elfo_bx: {
    id: "elfo_bx",
    name: "Elfo (Classe Clássica)",
    nameEn: "Elf (Classic)",
    isRaceClass: true,
    description: "Classe de aventureiro elfo B/X tradicional. Guerreiro e mago simultaneamente, empunhando armaduras pesadas e lançando feitiços arcanos.",
    primeRequisites: ["str", "int"],
    minRequirements: { int: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode empunhar qualquer arma.",
    combatCategory: "marcial",
    spellCasting: {
      type: "arcana",
      spellListName: "mago",
      startLevel: 1,
    },
    features: [
      "Guerreiro-Mago: Lança feitiços mesmo vestindo cota de malha ou placas!",
      "Imunidade a Carniçal: Imune à paralisia sobrenatural.",
      "Detectar Portas Secretas: 2 em 6 ao procurar, 1 em 6 ao passar perto.",
      "Infravisão: 18 metros.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 }, spells: [1] },
      { level: 2, xp: 4000, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 }, spells: [2] },
      { level: 3, xp: 8000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 }, spells: [2, 1] },
      { level: 4, xp: 16000, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2, 2] },
      { level: 5, xp: 32000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2, 2, 1] },
      { level: 6, xp: 64000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2, 2, 2] },
      { level: 7, xp: 120000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [3, 2, 2, 1] },
      { level: 8, xp: 250000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [3, 3, 2, 2] },
      { level: 9, xp: 400000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [3, 3, 3, 2, 1] },
      { level: 10, xp: 600000, hd: "9d6+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 8 }, spells: [3, 3, 3, 3, 2] },
    ],
  },
  halfling_bx: {
    id: "halfling_bx",
    name: "Halfling (Classe Clássica)",
    nameEn: "Halfling (Classic)",
    isRaceClass: true,
    description: "Classe de aventureiro halfling B/X tradicional. Pontaria incrível com pedras e arcos, furtividade natural e bônus defensivos.",
    primeRequisites: ["dex", "str"],
    minRequirements: { dex: 9, con: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Todas as armas proporcionais (sem armas de duas mãos ou arcos longos).",
    combatCategory: "marcial",
    features: [
      "Pontaria com Mísseis: +1 em ataques à distância.",
      "Defesa contra Gigantes: +2 na CA contra criaturas grandes.",
      "Furtividade e Ocultação: 90% em áreas naturais, 2 em 6 em masmorras.",
      "Saves Lendários de Halfling: Os melhores saves do jogo.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 2, xp: 2000, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 3, xp: 4000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 4, xp: 8000, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 5, xp: 16000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 6, xp: 32000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 7, xp: 64000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 8, xp: 120000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
    ],
  },
  // Seis classes semi-humanas do Tomo do Jogador (método Básico/Especialista,
  // pp. 28-77) que ainda faltavam: Drow, Duergar, Gnomo, Meio-Elfo, Meio-Orc e
  // Svirfneblin. Cada uma tem sua própria tabela de progressão nessas páginas,
  // distinta da tabela raça × classe usada no método Avançado (que já existe
  // em oseRaces.ts para as mesmas seis raças).
  drow_bx: {
    id: "drow_bx",
    name: "Drow (Classe Clássica)",
    nameEn: "Drow (Classic)",
    isRaceClass: true,
    description: "Elfos negros subterrâneos, guerreiros talentosos que rezam por magia divina através de suas estranhas divindades e possuem forte resistência mágica.",
    // Tomo do Jogador p. 38: "Requisitos: Mínimo INT 9; Requisito principal: FOR e SAB".
    primeRequisites: ["str", "wis"],
    minRequirements: { int: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "semimarcial",
    spellCasting: {
      type: "divina",
      spellListName: "clerigo",
      startLevel: 1,
    },
    features: [
      "Magia Divina: Ora para sua divindade; no 1º nível só pode rezar por Luz (o reverso de Escuridão), a partir do 2º nível pode escolher qualquer magia da lista de Clérigo, e a partir do 3º nível também pode rezar pela magia Teia do Mago.",
      "Detectar Portas Secretas: 2 em 6 ao procurar ativamente.",
      "Imunidade à Paralisia de Carniçais: Não é completamente afetado pela paralisia que os carniçais infligem.",
      "Afinidade de Aranha: Fala a linguagem secreta das aranhas e ganha +1 nas rolagens de reação ao encontrar aranhas.",
      "Sensibilidade à Luz: Sob luz do dia ou luz contínua sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
      "Depois de atingir o 9º nível: Pode estabelecer uma fortaleza ou templo subterrâneo, atraindo 5d6 × 10 drows não conjuradores de 1º-2º nível.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 12 }, spells: [1] },
      { level: 2, xp: 4000, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 12 }, spells: [2] },
      { level: 3, xp: 8000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 12 }, spells: [2, 1] },
      { level: 4, xp: 16000, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 10 }, spells: [2, 2] },
      { level: 5, xp: 32000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 10 }, spells: [2, 2, 1] },
      { level: 6, xp: 64000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 10 }, spells: [2, 2, 2, 1] },
      { level: 7, xp: 120000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 8 }, spells: [3, 3, 2, 2, 1] },
      { level: 8, xp: 250000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 8 }, spells: [3, 3, 3, 2, 2] },
      { level: 9, xp: 400000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 8 }, spells: [4, 4, 3, 3, 2] },
      { level: 10, xp: 600000, hd: "9d6+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 6 }, spells: [4, 4, 4, 3, 3] },
    ],
  },
  duergar_bx: {
    id: "duergar_bx",
    name: "Duergar (Classe Clássica)",
    nameEn: "Duergar (Classic)",
    isRaceClass: true,
    description: "Anões cinzentos do subsolo, resistentes à magia e capazes de ativar poderes mentais de crescimento, invisibilidade, encolhimento e calor.",
    // Tomo do Jogador p. 44: "Requisitos: Mínimo CON 9, Mínimo INT 9; Requisito principal: FOR".
    primeRequisites: ["str"],
    minRequirements: { con: 9, int: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Apenas armas de tamanho pequeno ou normal; sem arco longo nem espada de duas mãos.",
    combatCategory: "semimarcial",
    features: [
      "Poderes Mentais: Uma vez por dia por nível, ativa Crescimento, Invisibilidade, Encolhimento ou Calor; requer uma rodada de concentração sem se mover, atacar ou agir.",
      "Detectar Truques de Construção e Armadilhas de Sala: 2 em 6 cada, ao procurar.",
      "Furtividade: 3 em 6 de se mover silenciosamente no subsolo.",
      "Sensibilidade à Luz: Sob luz do dia ou luz contínua sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
      "Depois de atingir o 9º nível: Pode criar uma fortaleza subterrânea que atrai duergars do próprio clã como seguidores.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 2, xp: 2800, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 3, xp: 5600, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 13, spells: 12 } },
      { level: 4, xp: 11200, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 5, xp: 23000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 6, xp: 46000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 10, spells: 10 } },
      { level: 7, xp: 100000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 8, xp: 200000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 9, xp: 300000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 7, spells: 8 } },
      { level: 10, xp: 400000, hd: "9d6+3", thac0: 12, aacBonus: 7, saves: { death: 2, wands: 3, paralysis: 4, breath: 4, spells: 6 } },
    ],
  },
  gnomo_bx: {
    id: "gnomo_bx",
    name: "Gnomo (Classe Clássica)",
    nameEn: "Gnome (Classic)",
    isRaceClass: true,
    description: "Semi-humanos mineradores e amantes de maquinário, lançam feitiços arcanos da mesma lista dos ilusionistas e escavam com talento.",
    // Tomo do Jogador p. 52: "Requisitos: Mínimo CON 9; Requisito principal: DES e INT".
    primeRequisites: ["dex", "int"],
    minRequirements: { con: 9 },
    hitDie: "d4",
    allowedArmor: "couro",
    shieldAllowed: true,
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Qualquer arma adequada ao tamanho pequeno; sem arco longo nem espada de duas mãos.",
    combatCategory: "nao_marcial",
    spellCasting: {
      type: "ilusionista",
      spellListName: "ilusionista",
      startLevel: 1,
    },
    features: [
      "Magia Arcana: Livro de feitiços com a mesma lista de magias dos ilusionistas (p. 130); pesquisa mágica de qualquer nível e criação de itens mágicos a partir do 8º nível.",
      "Bônus Defensivo: +2 na Classe de Armadura quando atacado por oponentes grandes.",
      "Detectar Truques de Construção: 2 em 6 ao procurar.",
      "Se Escondendo: 90% de sucesso na cobertura da floresta; 2 em 6 em masmorras, exigindo ficar imóvel.",
      "Fale com Mamíferos Escavadores: Conhece a linguagem secreta de texugos, toupeiras e similares.",
      "Depois de atingir o 8º nível: Pode criar uma fortaleza subterrânea que atrai mamíferos escavadores amigáveis num raio de 5 milhas.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d4", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 }, spells: [1] },
      { level: 2, xp: 3000, hd: "2d4", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 }, spells: [2] },
      { level: 3, xp: 6000, hd: "3d4", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 }, spells: [2, 1] },
      { level: 4, xp: 12000, hd: "4d4", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 }, spells: [2, 2] },
      { level: 5, xp: 30000, hd: "5d4", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 }, spells: [2, 2, 1] },
      { level: 6, xp: 60000, hd: "6d4", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 }, spells: [2, 2, 2] },
      { level: 7, xp: 120000, hd: "7d4", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 }, spells: [3, 2, 2, 1] },
      { level: 8, xp: 240000, hd: "8d4", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 }, spells: [3, 3, 2, 2] },
    ],
  },
  meio_elfo_bx: {
    id: "meio_elfo_bx",
    name: "Meio-Elfo (Classe Clássica)",
    nameEn: "Half-Elf (Classic)",
    isRaceClass: true,
    description: "Descendentes de elfos e humanos, lutadores habilidosos que ganham feitiços arcanos da lista de usuários de magia a partir do 2º nível.",
    // Tomo do Jogador p. 54: "Requisitos: Mínimo CAR 9, Mínimo CON 9; Requisito principal: INT e FOR".
    primeRequisites: ["int", "str"],
    minRequirements: { cha: 9, con: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "semimarcial",
    spellCasting: {
      type: "arcana",
      spellListName: "mago",
      startLevel: 2,
    },
    features: [
      "Magia Arcana Tardia: Só ganha a capacidade de lançar feitiços arcanos a partir do 2º nível, com a lista de magias do usuário de magia (p. 131).",
      "Detectar Portas Secretas: 2 em 6 ao procurar ativamente.",
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Depois de atingir o 9º nível: Pode construir uma Fortaleza Humana (Baronato) ou uma Fortaleza Élfica, atraindo elfos ou súditos humanos como seguidores.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 } },
      { level: 2, xp: 2500, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 }, spells: [1] },
      { level: 3, xp: 5000, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 12, wands: 13, paralysis: 13, breath: 15, spells: 15 }, spells: [2] },
      { level: 4, xp: 10000, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2] },
      { level: 5, xp: 20000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2, 1] },
      { level: 6, xp: 40000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 10, wands: 11, paralysis: 11, breath: 13, spells: 12 }, spells: [2, 2] },
      { level: 7, xp: 80000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [2, 2] },
      { level: 8, xp: 150000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [2, 2, 1] },
      { level: 9, xp: 300000, hd: "9d6", thac0: 14, aacBonus: 5, saves: { death: 8, wands: 9, paralysis: 9, breath: 10, spells: 10 }, spells: [3, 2, 1] },
      { level: 10, xp: 450000, hd: "9d6+2", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 8 }, spells: [3, 2, 2] },
      { level: 11, xp: 600000, hd: "9d6+4", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 8 }, spells: [3, 2, 2, 1] },
      { level: 12, xp: 750000, hd: "9d6+6", thac0: 12, aacBonus: 7, saves: { death: 6, wands: 7, paralysis: 8, breath: 8, spells: 8 }, spells: [3, 3, 2, 1] },
    ],
  },
  meio_orc_bx: {
    id: "meio_orc_bx",
    name: "Meio-Orc (Classe Clássica)",
    nameEn: "Half-Orc (Classic)",
    isRaceClass: true,
    description: "Descendentes de orcs e humanos excluídos de ambas as culturas, formidáveis atacantes pelas costas com alguma habilidade de ladrão.",
    // Tomo do Jogador p. 60: "Requisitos: Nenhum; Requisito principal: DES e FOR".
    primeRequisites: ["dex", "str"],
    minRequirements: {},
    hitDie: "d6",
    allowedArmor: "couro_e_malha",
    shieldAllowed: true,
    allowedWeapons: "todas",
    allowedWeaponsDesc: "Pode usar qualquer arma de combate.",
    combatCategory: "semimarcial",
    features: [
      "Ataque pelas Costas: +4 para acertar e dano dobrado ao atacar um oponente inconsciente por trás.",
      "Habilidades de Ladrão: Usa Esconder-se nas Sombras, Mover-se Silenciosamente e Pungar Bolsos, com chance de sucesso própria por nível.",
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Lacaios: Lacaios a serviço de um meio-orc têm a lealdade reduzida em 1 (exceto lacaios meio-orcs).",
      "Depois de atingir o 8º nível: Pode estabelecer uma fortaleza de bandidos, atraindo 2d6 aprendizes (guerreiros de 1º nível, ladrões ou meio-orcs).",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 2, xp: 1800, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 3, xp: 3600, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 4, xp: 7000, hd: "4d6", thac0: 19, aacBonus: 0, saves: { death: 13, wands: 14, paralysis: 13, breath: 16, spells: 15 } },
      { level: 5, xp: 14000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 6, xp: 28000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 7, xp: 60000, hd: "7d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
      { level: 8, xp: 120000, hd: "8d6", thac0: 17, aacBonus: 2, saves: { death: 12, wands: 13, paralysis: 11, breath: 14, spells: 13 } },
    ],
    // Tabela própria (ES/MS/PB) da p. 61; ESI/ET/OB/AF não são habilidades do
    // meio-orc no livro, mantidas em 0 (nenhuma chance) em vez de omitidas,
    // porque a interface exige o objeto completo por nível.
    thiefSkills: {
      1: { esi: 0, et: 0, ob: 0, es: 10, ms: 20, af: 0, pb: 20 },
      2: { esi: 0, et: 0, ob: 0, es: 15, ms: 25, af: 0, pb: 25 },
      3: { esi: 0, et: 0, ob: 0, es: 20, ms: 30, af: 0, pb: 30 },
      4: { esi: 0, et: 0, ob: 0, es: 25, ms: 35, af: 0, pb: 35 },
      5: { esi: 0, et: 0, ob: 0, es: 30, ms: 40, af: 0, pb: 40 },
      6: { esi: 0, et: 0, ob: 0, es: 36, ms: 45, af: 0, pb: 45 },
      7: { esi: 0, et: 0, ob: 0, es: 45, ms: 55, af: 0, pb: 55 },
      8: { esi: 0, et: 0, ob: 0, es: 55, ms: 65, af: 0, pb: 65 },
    },
  },
  svirfneblin_bx: {
    id: "svirfneblin_bx",
    name: "Svirfneblin (Classe Clássica)",
    nameEn: "Svirfneblin (Classic)",
    isRaceClass: true,
    description: "Gnomos das profundezas, escavadores habilidosos ligados à pedra e aos elementais da terra, sem lançar feitiços.",
    // Tomo do Jogador p. 72: "Requisitos: Mínimo CON 9; Requisito principal: FOR".
    primeRequisites: ["str"],
    minRequirements: { con: 9 },
    hitDie: "d6",
    allowedArmor: "todas",
    shieldAllowed: true,
    allowedWeapons: "restrita",
    allowedWeaponsDesc: "Qualquer arma adequada ao tamanho pequeno; sem arco longo nem espada de duas mãos.",
    combatCategory: "semimarcial",
    features: [
      "Misture-se em Pedra: 4 em 6 de passar despercebido em ambiente de pedra sombrio (2 em 6 se bem iluminado), permanecendo imóvel e em silêncio.",
      "Bônus Defensivo: +2 na Classe de Armadura quando atacado por oponentes grandes.",
      "Detectar Truques de Construção: 2 em 6 ao procurar.",
      "Resistência à Ilusão: +2 em todos os testes de resistência contra ilusões.",
      "Fale com Elementais da Terra e Murmúrios de Pedra: Comunica-se com elementais da terra e, parado por um turno com o ouvido na pedra, tem 2 em 6 de sentir portas secretas, gemas, criaturas vivas ou água próximas.",
      "Sensibilidade à Luz: Sob luz forte sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
      "Depois de atingir o 8º nível: Pode construir uma fortaleza subterrânea; 1d3 elementais da terra de 16 DV vivem nas rochas ao redor e protegem os svirfneblins.",
    ],
    progression: [
      { level: 1, xp: 0, hd: "1d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 } },
      { level: 2, xp: 2400, hd: "2d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 } },
      { level: 3, xp: 4800, hd: "3d6", thac0: 19, aacBonus: 0, saves: { death: 8, wands: 9, paralysis: 10, breath: 14, spells: 11 } },
      { level: 4, xp: 10000, hd: "4d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 } },
      { level: 5, xp: 20000, hd: "5d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 } },
      { level: 6, xp: 40000, hd: "6d6", thac0: 17, aacBonus: 2, saves: { death: 6, wands: 7, paralysis: 8, breath: 11, spells: 9 } },
      { level: 7, xp: 80000, hd: "7d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 9, spells: 7 } },
      { level: 8, xp: 160000, hd: "8d6", thac0: 14, aacBonus: 5, saves: { death: 4, wands: 5, paralysis: 6, breath: 9, spells: 7 } },
    ],
  },
};

/**
 * Proveniência por classe.
 *
 * A atribuição anterior carimbava **todas** as 16 classes com
 * "Tomo do Jogador p. 28", o que estava errado em 15 delas: a p. 28 do Tomo é a
 * descrição do Acrobata. Além disso, as quatro classes humanas do clássico não
 * estão no Tomo — elas estão no Livro de Regras (Clérigo p. 16, Guerreiro p. 18,
 * Ladrão p. 20, Mago p. 22), que é outro livro.
 *
 * As páginas abaixo são as impressas, onde ficam a descrição e a tabela de
 * progressão de cada classe.
 */
const OSE_CLASS_SOURCES: Record<string, { book: string; page: number }> = {
  // Livro de Regras — as quatro classes humanas do clássico
  clerigo: { book: "Old-School Essentials — Livro de Regras", page: 16 },
  guerreiro: { book: "Old-School Essentials — Livro de Regras", page: 18 },
  ladrao: { book: "Old-School Essentials — Livro de Regras", page: 20 },
  mago: { book: "Old-School Essentials — Livro de Regras", page: 22 },
  // Tomo do Jogador — classes avançadas e classes raciais
  acrobata: { book: "Old-School Essentials — Tomo do Jogador", page: 28 },
  assassino: { book: "Old-School Essentials — Tomo do Jogador", page: 30 },
  barbaro: { book: "Old-School Essentials — Tomo do Jogador", page: 32 },
  bardo: { book: "Old-School Essentials — Tomo do Jogador", page: 34 },
  druida: { book: "Old-School Essentials — Tomo do Jogador", page: 40 },
  anao_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 46 },
  elfo_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 48 },
  halfling_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 56 },
  ilusionista: { book: "Old-School Essentials — Tomo do Jogador", page: 62 },
  cavaleiro: { book: "Old-School Essentials — Tomo do Jogador", page: 64 },
  paladino: { book: "Old-School Essentials — Tomo do Jogador", page: 68 },
  ranger: { book: "Old-School Essentials — Tomo do Jogador", page: 70 },
  // Seis classes semi-humanas do método Básico/Especialista (adicionadas em
  // 2026-09-27), intercaladas no mesmo capítulo de classes.
  drow_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 38 },
  duergar_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 44 },
  gnomo_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 52 },
  meio_elfo_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 54 },
  meio_orc_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 60 },
  svirfneblin_bx: { book: "Old-School Essentials — Tomo do Jogador", page: 72 },
};

for (const oseClass of Object.values(OSE_CLASSES)) {
  const source = OSE_CLASS_SOURCES[oseClass.id];
  if (!source) throw new Error(`Classe OSE sem proveniência declarada: ${oseClass.id}`);
  oseClass.sourceBook = source.book;
  oseClass.sourcePage = source.page;
}
