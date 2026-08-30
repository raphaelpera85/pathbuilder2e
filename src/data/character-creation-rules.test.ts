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
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE; sandboxData = PF2E_DATA;`, sandbox);
  return {
    engine: (sandbox as unknown as { sandboxEngine: any }).sandboxEngine,
    data: (sandbox as unknown as { sandboxData: any }).sandboxData
  };
}

describe("Character Creation & Combat Rules (Remaster)", () => {
  const { engine, data } = loadEngine();

  describe("1. Attribute Boosts & Flaws Pipeline", () => {
    it("processes the 4 standard creation steps (Ancestry, Background, Class Key, 4 Free Boosts)", () => {
      const dwarfFighter = {
        ancestry: "Anão", // Boosts: CON, WIS, Free (STR). Flaws: CHA
        ancestryBoosts: ["con", "wis", "str"],
        background: "Acróbata (Acrobat)", // Boosts: DEX, Free (STR)
        backgroundBoosts: ["dex", "str"],
        class: "Guerreiro (Fighter)", // Key: STR
        classKeyBoost: "str",
        level1FreeBoosts: ["str", "dex", "con", "wis"],
        level: 1
      };

      const result = engine.calculateAttributePipeline(dwarfFighter);
      // STR: 10 + 2 (ancestry free) + 2 (bg) + 2 (class key) + 2 (l1 free) = 18 (+4)
      // DEX: 10 + 2 (bg) + 2 (l1 free) = 14 (+2)
      // CON: 10 + 2 (ancestry) + 2 (l1 free) = 14 (+2)
      // INT: 10 (+0)
      // WIS: 10 + 2 (ancestry) + 2 (l1 free) = 14 (+2)
      // CHA: 10 - 2 (ancestry flaw) = 8 (-1)
      expect(result.scores.str).toBe(18);
      expect(result.mods.str).toBe(4);
      expect(result.scores.dex).toBe(14);
      expect(result.mods.dex).toBe(2);
      expect(result.scores.con).toBe(14);
      expect(result.mods.con).toBe(2);
      expect(result.scores.int).toBe(10);
      expect(result.mods.int).toBe(0);
      expect(result.scores.wis).toBe(14);
      expect(result.mods.wis).toBe(2);
      expect(result.scores.cha).toBe(8);
      expect(result.mods.cha).toBe(-1);
    });

    it("applies the Remaster rule where attributes >= 18 increase by 1 point instead of 2 at level milestones", () => {
      const level5Char = {
        ancestry: "Humano",
        ancestryBoostMode: "alternate_remaster",
        ancestryBoosts: ["str", "dex"],
        backgroundBoosts: ["str", "con"],
        class: "Guerreiro (Fighter)",
        classKeyBoost: "str",
        level1FreeBoosts: ["str", "dex", "con", "wis"],
        level: 5,
        levelBoosts: {
          5: ["str", "dex", "con", "wis"]
        }
      };

      const result = engine.calculateAttributePipeline(level5Char);
      // At level 1, STR reaches 10 + 2 + 2 + 2 + 2 = 18.
      // At level 5, boosting STR (which is >= 18) adds +1 point -> 19 (modifier is still +4, next boost at lvl 10 will reach 20 / +5).
      expect(result.scores.str).toBe(19);
      expect(result.mods.str).toBe(4);
      // DEX: 10 + 2 + 2 = 14 at lvl 1 -> 16 (+3) at lvl 5.
      expect(result.scores.dex).toBe(16);
      expect(result.mods.dex).toBe(3);
    });
  });

  describe("2. Trained Skills Count & Senses", () => {
    it("calculates exact trained skills count based on Class Base + INT modifier + Background + Fixed skills", () => {
      const rogue = {
        class: "Ladino (Rogue)", // Base 7 + stealth
        abilities: { str: 10, dex: 18, con: 12, int: 14, wis: 12, cha: 12 }, // INT mod +2
        background: "Acróbata (Acrobat)", // grants acrobatics
        skills: {
          stealth: "Treinado",
          acrobatics: "Treinado",
          athletics: "Treinado",
          thievery: "Treinado",
          deception: "Treinado"
        }
      };

      const summary = engine.calculateTrainedSkillsCount(rogue);
      // Total = 7 (class base) + 2 (INT mod) + 1 (background skill) + 1 (fixed skill: stealth) = 11
      expect(summary.classBase).toBe(7);
      expect(summary.intMod).toBe(2);
      expect(summary.totalAllowed).toBe(11);
      expect(summary.selectedSkills.length).toBe(5);
      expect(summary.remainingCount).toBe(6);
    });

    it("correctly extracts special senses (Darkvision and Low-Light Vision)", () => {
      const dwarf = { ancestry: "Anão" };
      expect(engine.getCharacterSenses(dwarf)).toContain("Visão no Escuro");

      const elf = { ancestry: "Elfo" };
      expect(engine.getCharacterSenses(elf)).toContain("Visão na Penumbra");

      const nephilimHuman = { ancestry: "Humano", heritage: "Nephilim (Infernal)" };
      expect(engine.getCharacterSenses(nephilimHuman)).toContain("Visão no Escuro");
    });
  });

  describe("3. Advanced Weapon Traits & Critical Formulas", () => {
    it("handles Fatal trait (replaces die and adds extra fatal die on critical)", () => {
      const arquebus = {
        name: "Arcabuz",
        damage: "1d8",
        traits: ["Fatal d12", "Concussiva", "Distância"]
      };

      const details = engine.calculateStrikeDamageDetails(arquebus, { str: 0 });
      expect(details.normalFormula).toBe("1d8");
      // Critical replaces with d12 and adds + 1d12 extra
      expect(details.critFormula).toBe("(1d12) * 2 + 1d12");
      expect(details.traitsApplied.fatal).toBe(true);
    });

    it("handles Deadly trait (adds extra dice on critical)", () => {
      const compositeBow = {
        name: "Arco Composto",
        damage: "1d8",
        traits: ["Mortal d10", "Propulsivo", "Distância"]
      };

      const details = engine.calculateStrikeDamageDetails(compositeBow, { str: 4 }, { level: 1 });
      // Propulsive adds half of STR (+2)
      expect(details.normalFormula).toBe("1d8+2");
      expect(details.critFormula).toBe("(1d8+2) * 2 + 1d10");
      expect(details.traitsApplied.deadly).toBe(true);
      expect(details.traitsApplied.propulsiveBonus).toBe(2);
    });

    it("handles Two-Hand trait when wielding with two hands", () => {
      const staff = {
        name: "Bordão",
        damage: "1d4",
        traits: ["Duas Mãos d8"]
      };

      const oneHand = engine.calculateStrikeDamageDetails(staff, { str: 3 }, { twoHanded: false });
      expect(oneHand.normalFormula).toBe("1d4+3");

      const twoHand = engine.calculateStrikeDamageDetails(staff, { str: 3 }, { twoHanded: true });
      expect(twoHand.normalFormula).toBe("1d8+3");
    });
  });

  describe("4. Shield Mechanics & Shield Block Reaction", () => {
    it("absorbs incoming damage up to Hardness and damages both Shield and character with excess", () => {
      const steelShield = {
        name: "Escudo de Aço",
        hardness: 5,
        maxHp: 20,
        currentHp: 20,
        bt: 10
      };

      // Scenario A: Damage <= Hardness (e.g. 4 damage against 5 hardness)
      const resA = engine.calculateShieldBlock(4, steelShield);
      expect(resA.damageBlocked).toBe(4);
      expect(resA.excessDamage).toBe(0);
      expect(resA.characterDamage).toBe(0);
      expect(resA.newShieldHp).toBe(20);
      expect(resA.isBroken).toBe(false);

      // Scenario B: Damage > Hardness (e.g. 12 damage against 5 hardness)
      const resB = engine.calculateShieldBlock(12, steelShield);
      expect(resB.damageBlocked).toBe(5);
      expect(resB.excessDamage).toBe(7);
      expect(resB.characterDamage).toBe(7);
      expect(resB.newShieldHp).toBe(13);
      expect(resB.isBroken).toBe(false);

      // Scenario C: Heavy damage that breaks the shield (e.g. 16 damage against 5 hardness, currentHp = 13)
      const resC = engine.calculateShieldBlock(16, { ...steelShield, currentHp: 13 });
      expect(resC.excessDamage).toBe(11);
      expect(resC.newShieldHp).toBe(2); // 13 - 11 = 2 (<= BT 10 -> Broken)
      expect(resC.isBroken).toBe(true);
      expect(resC.isDestroyed).toBe(false);
    });
  });

  describe("5. Dying & Recovery Check Mechanics", () => {
    it("evaluates recovery check DC and outcomes according to PF2e rules", () => {
      // Dying 1 -> DC = 11
      // Roll 11 (Success) -> reduces dying by 1 -> dying becomes 0 (Stabilized)
      const successRes = engine.calculateDyingRecovery(1, 11);
      expect(successRes.dc).toBe(11);
      expect(successRes.outcome).toBe("success");
      expect(successRes.newDying).toBe(0);
      expect(successRes.isStabilized).toBe(true);
      expect(successRes.isDead).toBe(false);

      // Dying 2 -> DC = 12. Roll 5 (Failure) -> increases dying by 1 -> dying becomes 3
      const failureRes = engine.calculateDyingRecovery(2, 5);
      expect(failureRes.dc).toBe(12);
      expect(failureRes.outcome).toBe("failure");
      expect(failureRes.newDying).toBe(3);
      expect(failureRes.isStabilized).toBe(false);

      // Dying 3 -> DC = 13. Critical Failure (roll 1) -> increases dying by 2 -> dying becomes 5 >= 4 (Dead)
      const critFailRes = engine.calculateDyingRecovery(3, 1, { isNat1: true });
      expect(critFailRes.outcome).toBe("critical_failure");
      expect(critFailRes.newDying).toBe(5);
      expect(critFailRes.isDead).toBe(true);

      // Doomed 1 reduces death threshold to 3
      const doomedRes = engine.calculateDyingRecovery(2, 6, { doomed: 1 });
      expect(doomedRes.maxDying).toBe(3);
      expect(doomedRes.newDying).toBe(3);
      expect(doomedRes.isDead).toBe(true);
    });
  });
});
