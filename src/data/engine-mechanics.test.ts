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

  it("calcula proficiência com ranks dos três idiomas e abreviações", () => {
    expect(engine.getProficiencyBonus("Treinado", 1)).toBe(3);
    expect(engine.getProficiencyBonus("Entrenado", 1)).toBe(3);
    expect(engine.getProficiencyBonus("expert", 5)).toBe(9);
    expect(engine.getProficiencyBonus("Mestre", 10)).toBe(16);
    expect(engine.getProficiencyBonus("L", 20)).toBe(28);
    expect(engine.getProficiencyBonus("Destreinado", 20)).toBe(0);
  });

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

  it("aplica efeitos numéricos confirmados de talentos nas estatísticas corretas", () => {
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 5,
      feats: [
        { id: "feat.general.toughness" },
        { id: "feat.general.fleet" },
        { id: "feat.general.incredible_initiative" },
        { id: "feat.general.diehard" }
      ]
    });
    expect(stats.maxHp).toBe(8 + (10 + 2) * 5 + 5);
    expect(stats.speed).toBe(30);
    expect(stats.initiative).toBe(stats.perception.total + 2);
    expect(stats.featEffects).toMatchObject({ bonusHpPerLevel: 1, speedBonus: 5, initiativeBonus: 2, maxDying: 5 });
    expect(engine.calculateDyingRecovery(3, 13, { recoveryDcReduction: 1, maxDying: 5 }).dc).toBe(12);
  });

  it("mantém bônus condicionais de salvamento separados do cálculo geral", () => {
    const character = { feats: [{ id: "feat.general.fast_recovery" }, { id: "feat.general.breath_control" }] };
    expect(engine.getConditionalSaveBonus(character, "poison_disease")).toBe(2);
    expect(engine.getConditionalSaveBonus(character, "inhaled_poison_suffocation")).toBe(1);
    expect(engine.getConditionalSaveBonus(character, "fire")).toBe(0);
    expect(engine.getFeatStatEffects({ feats: [{ id: "feat.general.fast_recovery" }] }).dailyRecoveryMultiplier).toBe(2);
  });

  it("aplica carga, velocidade, armadura e improvisação destreinada", () => {
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 7,
      ancestry: "Elfo",
      feats: [
        { id: "feat.skill.hefty_hauler" },
        { id: "feat.ancestry.unburdened_iron" },
        { id: "feat.ancestry.nimble_elf" },
        { id: "feat.general.untrained_improvisation" }
      ],
      equippedArmor: { name: "Armadura", category: "Pesada", acBonus: 5, dexCap: 0, speedPenalty: -10, bulk: 4 },
      skills: { stealth: "Destreinado" }
    });
    expect(stats.bulk.max).toBe(15);
    expect(stats.bulk.encumbered).toBe(10);
    expect(stats.speed).toBe(35);
    expect(stats.skills.stealth.total).toBe(9);
  });

  it("aplica Percepção Astuta ao salvamento ou à percepção escolhidos", () => {
    const fortitude = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 1,
      feats: [{ id: "feat.general.canny_acumen", selectedStatistic: "Fortitude" }]
    });
    const perception = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 1,
      feats: [{ id: "feat.general.canny_acumen", selectedStatistic: "Percepção" }]
    });
    const reflexosEspanhol = engine.calculateCharacterStats({
      ...baseCharacter,
      level: 1,
      feats: [{ id: "feat.general.canny_acumen", selectedStatistic: "Reflejos" }]
    });
    expect(fortitude.saves.fortitude.rank).toBe("Especialista");
    expect(perception.perception.rank).toBe("Especialista");
    expect(reflexosEspanhol.saves.reflex.rank).toBe("Especialista");
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

  it("aplica os efeitos estruturados da herança de Jotunnato", () => {
    const stats = engine.calculateCharacterStats({
      level: 1,
      ancestry: "Jotunnato",
      heritage: "Jotunnato Guerreiro",
      class: "Guerreiro",
      abilities: { str: 18, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
      skills: {},
      weapons: [{ name: "Punho", category: "Desarmado", damage: "1d4", traits: [] }],
      inventory: [],
    });
    expect(stats.size).toBe("Grande");
    expect(stats.strikes[0].damageDetails.activeDice).toBe("1d6");
    expect(engine.calculateTrainedSkillsCount({ level: 1, ancestry: "Jotunnato", heritage: "Jotunnato Guardião", class: "Guerreiro", abilities: { int: 10 }, skills: {} }).heritageSkills).toEqual(["survival"]);
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

  it("preserva zero em PV atuais, CA e bônus de ataque de companheiros", () => {
    const companion = engine.calculateCompanionStats({}, {
      id: "pet.custom.zero",
      name: "Companheiro ferido",
      type: "animal_companion",
      hpMax: 10,
      hpCurrent: 0,
      ac: 0,
      attacks: [{ name: "Golpe", bonus: 0, damage: "1d4", traits: [] }]
    });
    expect(companion.hpMax).toBe(10);
    expect(companion.hpCurrent).toBe(0);
    expect(companion.ac).toBe(0);
    expect(companion.attacks[0].bonus).toBe(0);
  });

  it("recupera ataques catalogados quando uma ficha antiga os persistiu vazios", () => {
    const companion = engine.calculateCompanionStats({ pets: [{
      id: "pet.catalogado",
      attacks: [{ name: "Mordida", bonus: 6, damage: "1d6", traits: [] }]
    }] }, {
      id: "pet.catalogado",
      attacks: []
    });
    expect(companion.attacks).toHaveLength(1);
    expect(companion.attacks[0].name).toBe("Mordida");
  });

  it("converte ataques textuais de companheiros do catálogo em ataques editáveis", () => {
    const companion = engine.calculateCompanionStats({}, {
      id: "pet.textual",
      attacks: "Garras: 1d6 cortante (Ágil), Mordida: 1d8 perfuração"
    });
    expect(companion.attacks).toEqual([
      { name: "Garras", damage: "1d6 cortante", traits: ["Ágil"], bonus: undefined },
      { name: "Mordida", damage: "1d8 perfuração", traits: [], bonus: undefined }
    ]);
  });

  it("preserva os modificadores de atributo dos companheiros sem tratá-los como valores-base", () => {
    const companion = engine.calculateCompanionStats({}, {
      id: "pet.with-modifiers",
      abilityMods: { str: 2, dex: 3, con: 1 }
    });
    expect(companion.abilityModifiers).toEqual({ str: 2, dex: 3, con: 1 });
    expect(companion.abilityScores).toBeUndefined();
  });

  it("aplica a matriz de eidolon selecionada sem sobrescrever PV ou ataques editados", () => {
    const catalogPet = {
      id: "pet.eidolon.dragon",
      profiles: [
        { name: "Dragão Saqueador", abilities: { str: 18, dex: 14 }, acBonus: 2, dexCap: 3 },
        { name: "Dragão Astuto", abilities: { str: 12, dex: 18 }, acBonus: 1, dexCap: 4 }
      ],
      hp: 20,
      attacks: [{ name: "Garra", bonus: 7, damage: "1d6" }]
    };
    const companion = engine.calculateCompanionStats({ pets: [catalogPet] }, {
      id: "pet.eidolon.dragon", profileIndex: 1, hpCurrent: 3,
      attacks: [{ name: "Garra personalizada", bonus: 0, damage: "1d4" }]
    });
    expect(companion.selectedProfile.name).toBe("Dragão Astuto");
    expect(companion.abilityScores).toEqual({ str: 12, dex: 18 });
    expect(companion.acBonus).toBe(1);
    expect(companion.hpCurrent).toBe(3);
    expect(companion.attacks[0].name).toBe("Garra personalizada");
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
    expect(engine.getAmmunitionStatus({ inventory: [{ id: "item.guns_gears.ten_bullets", qty: 0 }] }, { name: "Pistola", reload: 1 })).toMatchObject({
      requiresAmmunition: true,
      quantity: 0,
      available: false,
    });
    expect(engine.getAmmunitionStatus({ inventory: [] }, { name: "Arco", reload: 0 })).toMatchObject({
      requiresAmmunition: true,
      quantity: 0,
      available: false,
    });
    expect(engine.getAmmunitionStatus({ inventory: [{ id: "item.ammunition.arrows", qty: 12 }] }, { name: "Arco", reload: 0 }).available).toBe(true);
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

  it("does not count zero-quantity inventory entries toward Bulk", () => {
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      coins: { gp: 0, sp: 0, cp: 0, pl: 0 },
      inventory: [{ name: "Carga removida", qty: 0, bulk: 10 }],
    });
    expect(stats.bulk.current).toBe(0);
  });

  it("includes nested container contents in Bulk without double-counting shared entries", () => {
    const nestedItem = { name: "Ferramentas", qty: 2, bulk: 2 };
    const container = { name: "Baú", qty: 1, bulk: 1, items: [nestedItem] };
    const stats = engine.calculateCharacterStats({
      ...baseCharacter,
      coins: { gp: 0, sp: 0, cp: 0, pl: 0 },
      inventory: [nestedItem],
      containers: [container],
    });
    expect(stats.bulk.current).toBe(5);
  });

  it("normalizes negative shield-block damage to zero", () => {
    const result = engine.calculateShieldBlock(-20, { hardness: 5, maxHp: 20, currentHp: 20, bt: 10 });
    expect(result.incomingDamage).toBe(0);
    expect(result.damageBlocked).toBe(0);
    expect(result.excessDamage).toBe(0);
    expect(result.newShieldHp).toBe(20);
    expect(result.characterDamage).toBe(0);
  });

  it("calculates armor speed penalty based on strength requirement and feats", () => {
    // Breastplate: speedPenalty: -5, strReq: 14
    const breastplate = { name: "Breastplate", category: "Média", speedPenalty: -5, strReq: 14 };
    
    // Insufficient strength (Str 10 < 14) -> -5 penalty
    const lowStrChar = {
      ...baseCharacter,
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      equippedArmor: breastplate
    };
    const lowStrStats = engine.calculateCharacterStats(lowStrChar);
    expect(lowStrStats.speed).toBe(20); // 25 base - 5 armor

    // Sufficient strength (Str 14 >= 14) -> penalty reduced by 5 to 0
    const highStrChar = {
      ...baseCharacter,
      abilities: { str: 14, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      equippedArmor: breastplate
    };
    const highStrStats = engine.calculateCharacterStats(highStrChar);
    expect(highStrStats.speed).toBe(25); // 25 base + 0 armor

    // Full Plate: speedPenalty: -10, strReq: 18
    const fullPlate = { name: "Full Plate", category: "Pesada", speedPenalty: -10, strReq: 18 };
    const plateChar = {
      ...baseCharacter,
      abilities: { str: 18, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      equippedArmor: fullPlate
    };
    const plateStats = engine.calculateCharacterStats(plateChar);
    expect(plateStats.speed).toBe(20); // 25 base - 5 armor (reduced from -10 by 5)

    // With Unburdened Iron feat -> ignores heavy/medium armor speed penalty completely
    const unburdenedChar = {
      ...baseCharacter,
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      equippedArmor: fullPlate,
      feats: [{ id: "feat.ancestry.unburdened_iron" }]
    };
    const unburdenedStats = engine.calculateCharacterStats(unburdenedChar);
    expect(unburdenedStats.speed).toBe(25); // 25 base - 0 armor
  });

  it("scales Canny Acumen to Expert at lower levels and Master at level 17+", () => {
    // Canny Acumen choosing Will save
    const cannyWillLvl1 = {
      ...baseCharacter,
      level: 1,
      class: "Guerreiro (Fighter)", // Fighter will save base is Trained
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      feats: [{ id: "feat.general.canny_acumen", selectedStatistic: "vontade" }]
    };
    const statsLvl1 = engine.calculateCharacterStats(cannyWillLvl1);
    expect(statsLvl1.saves.will.rank).toBe("Especialista");
    expect(statsLvl1.saves.will.prof).toBe(1 + 4); // level 1 + Expert (4) = 5

    const cannyWillLvl17 = {
      ...cannyWillLvl1,
      level: 17
    };
    const statsLvl17 = engine.calculateCharacterStats(cannyWillLvl17);
    expect(statsLvl17.saves.will.rank).toBe("Mestre");
    expect(statsLvl17.saves.will.prof).toBe(17 + 6); // level 17 + Master (6) = 23

    // Canny Acumen choosing Perception
    const cannyPercLvl17 = {
      ...baseCharacter,
      level: 17,
      perceptionRank: "Treinado",
      feats: [{ id: "feat.general.canny_acumen", selectedStatistic: "percepção" }]
    };
    const statsPerc17 = engine.calculateCharacterStats(cannyPercLvl17);
    expect(statsPerc17.perception.rank).toBe("Mestre");
  });

  it("resolves Witch patron magic tradition and focus pool initialization", () => {
    const witchWilding = {
      name: "Bruxa",
      class: "Bruxa (Witch)",
      level: 3,
      patron: "subclass.class.witch.patron_wilding_steward",
      subclass: "subclass.class.witch.patron_wilding_steward"
    };
    const stats = engine.calculateCharacterStats(witchWilding);
    expect(stats.spellcasting.isSpellcaster).toBe(true);
    expect(stats.spellcasting.tradition).toBe("primal");
    expect(stats.spellcasting.maxFocusPoints).toBe(1);
    expect(stats.spellcasting.focusPoints).toBe(1);
  });
});
