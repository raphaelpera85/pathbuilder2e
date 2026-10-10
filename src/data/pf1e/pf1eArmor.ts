// Pathfinder 1e — armaduras, escudos e acessórios da Tabela 6-6, p. 150.

export type Pf1eArmorDonningGroup = "light" | "medium" | "heavy" | "battle";

export interface Pf1eArmorRecord {
  id: string;
  name: string;
  category: "light" | "medium" | "heavy";
  costGp: number;
  acBonus: number;
  maxDexBonus: number;
  armorCheckPenalty: number;
  arcaneSpellFailure: number;
  speed9m: number;
  speed6m: number;
  weightKg: number;
  donningGroup: Pf1eArmorDonningGroup;
}

export const PF1E_ARMORS: Pf1eArmorRecord[] = [
  { id: "acolchoada", name: "Acolchoada", category: "light", donningGroup: "light", costGp: 5, acBonus: 1, maxDexBonus: 8, armorCheckPenalty: 0, arcaneSpellFailure: 5, speed9m: 9, speed6m: 6, weightKg: 5 },
  { id: "corselete-de-couro", name: "Corselete de couro", category: "light", donningGroup: "light", costGp: 10, acBonus: 2, maxDexBonus: 6, armorCheckPenalty: 0, arcaneSpellFailure: 10, speed9m: 9, speed6m: 6, weightKg: 7.5 },
  { id: "corselete-de-couro-batido", name: "Corselete de couro batido", category: "light", donningGroup: "light", costGp: 25, acBonus: 3, maxDexBonus: 5, armorCheckPenalty: -1, arcaneSpellFailure: 15, speed9m: 9, speed6m: 6, weightKg: 10 },
  { id: "camisao-de-cota-de-malha", name: "Camisão de cota de malha", category: "light", donningGroup: "light", costGp: 100, acBonus: 4, maxDexBonus: 4, armorCheckPenalty: -2, arcaneSpellFailure: 20, speed9m: 9, speed6m: 6, weightKg: 12.5 },
  { id: "gibao-de-peles", name: "Gibão de peles", category: "medium", donningGroup: "light", costGp: 15, acBonus: 4, maxDexBonus: 4, armorCheckPenalty: -3, arcaneSpellFailure: 20, speed9m: 6, speed6m: 4.5, weightKg: 12.5 },
  { id: "brunea", name: "Brunea", category: "medium", donningGroup: "medium", costGp: 50, acBonus: 5, maxDexBonus: 3, armorCheckPenalty: -4, arcaneSpellFailure: 25, speed9m: 6, speed6m: 4.5, weightKg: 15 },
  { id: "cota-de-malha", name: "Cota de malha", category: "medium", donningGroup: "medium", costGp: 150, acBonus: 6, maxDexBonus: 2, armorCheckPenalty: -5, arcaneSpellFailure: 30, speed9m: 6, speed6m: 4.5, weightKg: 20 },
  { id: "peitoral-de-aco", name: "Peitoral de aço", category: "medium", donningGroup: "medium", costGp: 200, acBonus: 6, maxDexBonus: 3, armorCheckPenalty: -4, arcaneSpellFailure: 25, speed9m: 6, speed6m: 4.5, weightKg: 15 },
  { id: "cota-de-talas", name: "Cota de talas", category: "heavy", donningGroup: "medium", costGp: 200, acBonus: 7, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speed9m: 6, speed6m: 4.5, weightKg: 22.5 },
  { id: "loriga-segmentada", name: "Loriga segmentada", category: "heavy", donningGroup: "medium", costGp: 250, acBonus: 7, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speed9m: 6, speed6m: 4.5, weightKg: 17.5 },
  { id: "meia-armadura", name: "Meia-armadura", category: "heavy", donningGroup: "battle", costGp: 600, acBonus: 8, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speed9m: 6, speed6m: 4.5, weightKg: 25 },
  { id: "armadura-completa", name: "Armadura completa", category: "heavy", donningGroup: "battle", costGp: 1500, acBonus: 9, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speed9m: 6, speed6m: 4.5, weightKg: 25 },
];

export interface Pf1eShieldRecord {
  id: string;
  name: string;
  costGp: number;
  acBonus: number;
  maxDexBonus: number | null;
  armorCheckPenalty: number;
  arcaneSpellFailure: number;
  weightKg: number;
  donningGroup: "shield";
  special?: string;
}

export const PF1E_SHIELDS: Pf1eShieldRecord[] = [
  { id: "broquel", name: "Broquel", donningGroup: "shield", costGp: 5, acBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, weightKg: 2.5 },
  { id: "escudo-de-madeira-leve", name: "Escudo de madeira leve", donningGroup: "shield", costGp: 3, acBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, weightKg: 2.5 },
  { id: "escudo-de-aco-leve", name: "Escudo de aço leve", donningGroup: "shield", costGp: 9, acBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, weightKg: 3 },
  { id: "escudo-de-madeira-pesado", name: "Escudo de madeira pesado", donningGroup: "shield", costGp: 7, acBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, weightKg: 5 },
  { id: "escudo-de-aco-pesado", name: "Escudo de aço pesado", donningGroup: "shield", costGp: 20, acBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, weightKg: 7.5 },
  { id: "escudo-de-corpo", name: "Escudo de corpo", donningGroup: "shield", costGp: 30, acBonus: 4, maxDexBonus: 2, armorCheckPenalty: -10, arcaneSpellFailure: 50, weightKg: 22.5, special: "também pode oferecer cobertura" },
];

export interface Pf1eArmorAccessoryRecord {
  id: string;
  name: string;
  costGp: number;
  costLabel: string;
  weightKg: number;
  special?: string;
}

export const PF1E_ARMOR_ACCESSORIES: Pf1eArmorAccessoryRecord[] = [
  { id: "cravos-para-armadura", name: "Cravos para armadura", costGp: 50, costLabel: "+50 PO", weightKg: 5 },
  { id: "manopla-de-seguranca", name: "Manopla de segurança", costGp: 8, costLabel: "8 PO", weightKg: 2.5, special: "a mão não fica livre para conjurar magias" },
  { id: "cravos-para-escudo", name: "Cravos para escudo", costGp: 10, costLabel: "+10 PO", weightKg: 2.5 },
];
