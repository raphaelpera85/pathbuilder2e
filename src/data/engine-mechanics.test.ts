import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE;`, sandbox);
  return (sandbox as unknown as { sandboxEngine: any }).sandboxEngine;
}

describe("PF2E_ENGINE Mechanics & Calculations", () => {
  const engine = loadEngine();

  const baseCharacter = {
    name: "Herói de Teste",
    level: 1,
    ancestry: "Humano",
    class: "Guerreiro (Fighter)",
    abilities: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
    savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
    equippedArmor: { name: "Peitoral", category: "Média", acBonus: 4, dexCap: 1, bulk: 2 },
    weapons: [
      { name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] },
      { name: "Arco Curto", category: "Marcial", damage: "1d6", damageType: "Perfuração", traits: ["Distância", "Ágil"] }
    ],
    skills: { athletics: "Treinado", acrobatics: "Treinado", stealth: "Destreinado" },
    coins: { gp: 10, sp: 50, cp: 100 },
    inventory: [{ name: "Corda", qty: 1, bulk: 1 }, { name: "Tochas", qty: 5, bulk: "L" }]
  };

  it("calculates base attributes, AC, HP and Saves correctly", () => {
    const stats = engine.calculateCharacterStats(baseCharacter);
    expect(stats.mods.str).toBe(3); // (16 - 10) / 2
    expect(stats.mods.dex).toBe(2); // (14 - 10) / 2
    // AC = 10 + 4 (armor) + 1 (effectiveDex capped at 1) + (2 (Trained) + 1 (level)) = 18
    expect(stats.ac.total).toBe(18);
    // HP = 8 (Human) + (10 (Fighter) + 2 (Con mod)) * 1 = 20
    expect(stats.maxHp).toBe(20);
    // Fortitude = 2 (Con) + (4 (Expert) + 1 (level)) = 7
    expect(stats.saves.fortitude.total).toBe(7);
  });

  it("resolve classe e ancestralidade por nome curto ao calcular PV", () => {
    const stats = engine.calculateCharacterStats({
      level: 1,
      ancestry: "Human",
      class: "Barbarian",
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    });
    expect(stats.maxHp).toBe(20); // 8 de ancestralidade + 12 de classe.
  });

  it("resolve classe e ancestralidade importadas como objetos por ID", () => {
    const stats = engine.calculateCharacterStats({
      level: 1,
      ancestry: { id: "ancestry.human", name: "Humano" },
      class: { id: "class.barbarian", name: "Bárbaro" },
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    });
    expect(stats.maxHp).toBe(20); // Humano 8 + Bárbaro 12.
  });

  it("preserva a perícia concedida pelo antecedente localizado", () => {
    const stats = engine.calculateTrainedSkillsCount({
      level: 1,
      class: "Fighter",
      background: "Artisan",
      abilities: { int: 10 },
      skills: {},
    });
    expect(stats.backgroundSkill).toBeTruthy();
    expect(stats.totalAllowed).toBeGreaterThan(2);
  });

  it("applies Off-Guard (Desprevenido) -2 circumstance penalty to AC", () => {
    const charWithOffGuard = {
      ...baseCharacter,
      conditions: [{ name: "Desprevenido", value: 1 }]
    };
    const stats = engine.calculateCharacterStats(charWithOffGuard);
    expect(stats.ac.total).toBe(16); // 18 - 2
    expect(stats.conditions.offGuard).toBe(true);
    expect(stats.ac.offGuardPenalty).toBe(2);
  });

  it("applies Frightened (Amedrontado) status penalty across checks and DCs", () => {
    const charWithFrightened = {
      ...baseCharacter,
      conditions: [{ name: "Amedrontado", value: 2 }]
    };
    const stats = engine.calculateCharacterStats(charWithFrightened);
    // AC is reduced by status penalty 2
    expect(stats.ac.total).toBe(16); // 18 - 2
    // Fortitude save reduced by 2
    expect(stats.saves.fortitude.total).toBe(5);
    // Reflex save reduced by 2
    expect(stats.saves.reflex.total).toBe(5);
    // Athletics check reduced by 2
    expect(stats.skills.athletics.total).toBe(4); // 3 (Str) + 3 (Trained+1) - 2 (Frightened)
    // Melee attack: 3 (Str) + 3 (Trained+1) - 2 (Frightened) = 4
    expect(stats.strikes[0].attackTotal).toBe(4);
  });

  it("applies Drained condition: reduces Con saves and lowers Max HP by level * value", () => {
    const charDrained = {
      ...baseCharacter,
      level: 4,
      conditions: [{ name: "Drenado", value: 2 }]
    };
    const stats = engine.calculateCharacterStats(charDrained);
    // Base HP at level 4 = 8 + (10 + 2) * 4 = 56
    // Drained penalty = 2 * 4 = 8 HP
    // Max HP = 56 - 8 = 48
    expect(stats.maxHp).toBe(48);
    expect(stats.conditions.drained).toBe(2);
  });

  it("evaluates dice expressions and critical hit doubling", () => {
    const roll = engine.evaluateDiceExpression("1d8 + 3");
    expect(roll.formula).toBe("1d8+3");
    expect(roll.staticModifier).toBe(3);
    expect(roll.total).toBeGreaterThanOrEqual(4); // 1 + 3
    expect(roll.total).toBeLessThanOrEqual(11); // 8 + 3

    const critRoll = engine.evaluateDiceExpression("1d8 + 3", { isCritical: true });
    expect(critRoll.isCritical).toBe(true);
    expect(critRoll.total).toBe(critRoll.baseTotal * 2);
  });

  it("normalizes imported string damage bonuses before building formulas", () => {
    const details = engine.calculateStrikeDamageDetails(
      { damage: "1d8", damageBonus: "1", traits: [] },
      { str: 3 },
    );
    expect(details.normalFormula).toBe("1d8+4");
  });

  it("applies only attached weapon and armor runes", () => {
    const weapon = {
      damage: "1d8",
      category: "Marcial",
      traits: [],
      runes: ["item.magic.weapon_potency_1", "item.magic.striking_rune"]
    };
    const details = engine.calculateStrikeDamageDetails(weapon, { str: 3 });
    expect(details.activeDice).toBe("2d8");
    expect(details.normalFormula).toBe("2d8+3");
    expect(details.runeBonuses).toEqual({ potency: 1, striking: 1, resilient: 0 });

    const greater = engine.calculateStrikeDamageDetails({
      damage: "1d8",
      runes: ["item.compendium.2_weapon_potency_rune", "item.compendium.greater_striking_rune"]
    }, { str: 3 });
    expect(greater.activeDice).toBe("3d8");
    expect(greater.runeBonuses).toMatchObject({ potency: 2, striking: 2 });

    const unetched = engine.calculateStrikeDamageDetails({ damage: "1d8", runes: [] }, { str: 3 });
    expect(unetched.activeDice).toBe("1d8");
    expect(unetched.normalFormula).toBe("1d8+3");
    expect(engine.isRuneCompatible("item.compendium.1_armor_potency_rune", "weapon")).toBe(false);
    expect(engine.isRuneCompatible("item.compendium.striking_rune", "armor")).toBe(false);
  });

  it("applies armor potency to AC and resilient to all saves", () => {
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      equippedArmor: {
        ...baseCharacter.equippedArmor,
        runes: ["item.magic.armor_potency_1", "item.magic.resilient_rune"]
      }
    });
    expect(stats.ac.total).toBe(19);
    expect(stats.saves.fortitude.item).toBe(1);
    expect(stats.saves.reflex.item).toBe(1);
    expect(stats.saves.will.item).toBe(1);
  });

  it("normalizes companion data without inventing missing combat values", () => {
    const companion = engine.calculateCompanionStats({}, {
      id: "pet.custom",
      name: "Companheiro sem estatísticas",
      type: "animal_companion"
    });
    expect(companion.hpMax).toBeUndefined();
    expect(companion.ac).toBeUndefined();
    expect(companion.attacks).toEqual([]);
  });

  it("reports ammunition availability for reload weapons", () => {
    const weapon = { traits: ["Recarga 1"], reload: 1 };
    expect(engine.getAmmunitionStatus({ inventory: [] }, weapon)).toMatchObject({
      requiresAmmunition: true,
      quantity: 0,
      available: false,
      reload: 1
    });
    expect(engine.getAmmunitionStatus({ inventory: [{ id: "item.ammunition.bolts", qty: 20 }] }, weapon).available).toBe(true);
    const firearm = { name: "Pistola", traits: ["Recarga 1", "Fogo"] };
    expect(engine.getAmmunitionStatus({ inventory: [{ id: "item.ammunition.bolts", qty: 20 }] }, firearm)).toMatchObject({ requiredType: "bullet", available: false });
    expect(engine.getAmmunitionStatus({ inventory: [{ id: "item.guns_gears.ten_bullets", qty: 10 }] }, firearm).available).toBe(true);
  });

  it("applies ABP potency, striking, armor and resilience once", () => {
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 12,
      variantRules: { automaticBonusProgression: true },
      weapons: [{ ...baseCharacter.weapons[0], damage: "1d8" }],
      equippedArmor: { ...baseCharacter.equippedArmor }
    });
    expect(stats.abpBonuses).toMatchObject({ attackPotency: 2, strikingDice: 2, armorPotency: 2, saveResilience: 1 });
    expect(stats.strikes[0].attackTotal).toBe(3 + 14 + 2);
    expect(stats.strikes[0].damageDetails.activeDice).toBe("3d8");
    expect(stats.ac.item).toBe(6);
    expect(stats.saves.fortitude.item).toBe(1);
  });

  it("computes spell slots for standard full casters vs bounded casters", () => {
    const wizardChar = {
      name: "Mago",
      class: "Mago (Wizard)",
      level: 5
    };
    const wizardSlots = engine.getSpellSlots(wizardChar);
    expect(wizardSlots).not.toBeNull();
    expect(wizardSlots?.maxRank).toBe(3);
    expect(wizardSlots?.slots[1]).toBe(3);
    expect(wizardSlots?.slots[2]).toBe(3);
    expect(wizardSlots?.slots[3]).toBe(2);

    const magusChar = {
      name: "Magus",
      class: "Magus",
      level: 5
    };
    const magusSlots = engine.getSpellSlots(magusChar);
    expect(magusSlots?.isBounded).toBe(true);
    expect(magusSlots?.slots[3]).toBe(2);
    expect(magusSlots?.slots[2]).toBe(2);
    expect(magusSlots?.slots[1]).toBeUndefined(); // Bounded drops lower ranks
  });

  it("calculates coin weight in inventory bulk", () => {
    const charWithCoins = {
      ...baseCharacter,
      coins: { gp: 2500, sp: 0, cp: 0, pl: 0 }, // 2500 coins = 2 Bulk
      inventory: [{ name: "Armadura Pesada", qty: 1, bulk: 4 }]
    };
    const stats = engine.calculateCharacterStats(charWithCoins);
    // Inventory bulk = 4, Coin bulk = 2 -> Current Bulk = 6
    expect(stats.bulk.current).toBe(6);
    expect(stats.bulk.max).toBe(13); // 10 + 3 Str
    expect(stats.bulk.encumbered).toBe(8); // 5 + 3 Str
    expect(stats.bulk.isEncumbered).toBe(false);
  });

  it("normalizes negative shield-block damage to zero", () => {
    const result = engine.calculateShieldBlock(-20, { hardness: 5, maxHp: 20, currentHp: 20, bt: 10 });
    expect(result.incomingDamage).toBe(0);
    expect(result.damageBlocked).toBe(0);
    expect(result.excessDamage).toBe(0);
    expect(result.newShieldHp).toBe(20);
    expect(result.characterDamage).toBe(0);
  });

  it("soma platina legada e platina remaster quando a ficha contém os dois aliases", () => {
    const stats = engine.calculateCharacterStats({
      level: 1,
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      coins: { pl: 1000, pp: 1000, gp: 0, sp: 0, cp: 0 },
      inventory: [],
    });
    expect(stats.bulk.coinsBulk).toBe(2);
  });
});
