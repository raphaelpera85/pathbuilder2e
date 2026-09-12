import type { SupportedCoreSystem } from "./multiSystemCharacter";

export type AbilityGenerationMethod = "roll_4d6_drop_lowest" | "point_buy" | "standard_array";

export const T20_POINT_BUY_COSTS: Record<number, number> = {
  8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3, 14: 4, 15: 6, 16: 8, 17: 11, 18: 14,
};

export const DND5E_POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};

export const DND5E_STANDARD_ARRAY = [15, 14, 13, 12, 10, 8] as const;

export function getPointBuyBudget(system: SupportedCoreSystem): number {
  return system === "t20" ? 20 : 27;
}

export function validatePointBuy(system: SupportedCoreSystem, scores: number[]): { valid: boolean; spent: number; message?: string } {
  const costs = system === "t20" ? T20_POINT_BUY_COSTS : DND5E_POINT_BUY_COSTS;
  if (scores.length !== 6 || scores.some((score) => costs[score] === undefined)) {
    return { valid: false, spent: 0, message: system === "t20" ? "T20 permite valores de 8 a 18 na compra por pontos." : "D&D 5e permite valores de 8 a 15 na compra por pontos." };
  }
  const spent = scores.reduce((total, score) => total + costs[score], 0);
  const budget = getPointBuyBudget(system);
  return spent <= budget ? { valid: true, spent } : { valid: false, spent, message: `A compra por pontos excede o limite de ${budget}.` };
}

export function validateAbilityGeneration(system: SupportedCoreSystem, method: AbilityGenerationMethod | undefined, scores: number[]): string | undefined {
  if (!method) return undefined;
  if (method === "point_buy") return validatePointBuy(system, scores).message;
  if (method === "standard_array") {
    const expected = [...DND5E_STANDARD_ARRAY].sort((a, b) => a - b).join(",");
    const received = [...scores].sort((a, b) => a - b).join(",");
    if (system !== "dnd5e" || received !== expected) return "O array padrão de D&D 5e deve conter exatamente 15, 14, 13, 12, 10 e 8.";
    return undefined;
  }
  if (scores.length !== 6 || scores.some((score) => !Number.isInteger(score) || score < 3 || score > 18)) {
    return "A rolagem 4d6 descartando o menor deve gerar seis valores entre 3 e 18.";
  }
  return undefined;
}

export function roll4d6DropLowest(randomInt: (sides: number) => number = (sides) => Math.floor(Math.random() * sides) + 1): number {
  const dice = [randomInt(6), randomInt(6), randomInt(6), randomInt(6)].sort((a, b) => a - b);
  return dice.slice(1).reduce((total, value) => total + value, 0);
}

export function generateAbilityScores(randomInt?: (sides: number) => number): number[] {
  return Array.from({ length: 6 }, () => roll4d6DropLowest(randomInt));
}

export function rollWithAdvantage(randomInt: (sides: number) => number = (sides) => Math.floor(Math.random() * sides) + 1): number {
  return Math.max(randomInt(20), randomInt(20));
}

export function rollWithDisadvantage(randomInt: (sides: number) => number = (sides) => Math.floor(Math.random() * sides) + 1): number {
  return Math.min(randomInt(20), randomInt(20));
}

export function resolveD20Roll(mode: "normal" | "advantage" | "disadvantage", randomInt?: (sides: number) => number): number {
  if (mode === "advantage") return rollWithAdvantage(randomInt);
  if (mode === "disadvantage") return rollWithDisadvantage(randomInt);
  return (randomInt || ((sides: number) => Math.floor(Math.random() * sides) + 1))(20);
}
