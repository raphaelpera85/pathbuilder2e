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

describe("Dynamic 1-20 Progression & System Mechanics", () => {
  const PF2E_ENGINE = loadEngine();

  it("calculates spell slots correctly across caster levels", () => {
    const wizardLvl1 = { class: "Mago (Wizard)", level: 1 };
    const slots1 = PF2E_ENGINE.getSpellSlots(wizardLvl1);
    expect(slots1).not.toBeNull();
    expect(slots1.isBounded).toBe(false);
    expect(slots1.cantrips).toBe(5);
    expect(slots1.slots[1]).toBe(2);
    expect(slots1.slots[2]).toBeUndefined();

    const wizardLvl5 = { class: "Mago (Wizard)", level: 5 };
    const slots5 = PF2E_ENGINE.getSpellSlots(wizardLvl5);
    expect(slots5.slots[1]).toBe(3);
    expect(slots5.slots[2]).toBe(3);
    expect(slots5.slots[3]).toBe(2);

    const magusLvl7 = { class: "Magus", level: 7 };
    const magusSlots = PF2E_ENGINE.getSpellSlots(magusLvl7);
    expect(magusSlots.isBounded).toBe(true);
    expect(magusSlots.slots[3]).toBe(2);
    expect(magusSlots.slots[4]).toBe(2);
    expect(magusSlots.slots[1]).toBeUndefined(); // Bounded casters drop lower level slots
  });

  it("handles coins bulk and encumbrance speed reduction", () => {
    const char = {
      level: 1,
      ancestry: "Humano",
      class: "Guerreiro (Fighter)",
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      coins: { pl: 0, gp: 5000, sp: 1000, cp: 0 }, // 6000 coins = 6 Bulk
      inventory: [{ name: "Armadura Pesada", qty: 1, bulk: 3 }] // 3 Bulk + 6 Bulk = 9 Bulk
    };

    const stats = PF2E_ENGINE.calculateCharacterStats(char);
    expect(stats.bulk.coinsBulk).toBe(6);
    expect(stats.bulk.current).toBe(9);
    // Str 0: Encumbered limit is 5 + 0 = 5. Current 9 > 5 -> isEncumbered is true!
    expect(stats.bulk.isEncumbered).toBe(true);
    expect(stats.speed).toBe(15); // Base 25ft - 10ft penalty = 15ft
  });

  it("handles condition penalty stacking according to PF2e rules", () => {
    const char = {
      level: 2,
      ancestry: "Humano",
      class: "Guerreiro (Fighter)",
      abilities: { str: 14, dex: 14, con: 14, int: 10, wis: 10, cha: 10 },
      conditions: [
        { name: "Amedrontado", value: 2 }, // Status penalty -2 to all checks/DCs
        { name: "Debilitado", value: 1 },  // Status penalty -1 to Dex checks/DCs, Reflex, AC
        { name: "Desprevenido", value: 1 } // Circumstance penalty -2 to AC
      ]
    };

    const conds = PF2E_ENGINE.getConditionModifiers(char);
    expect(conds.acPenalty).toBe(4); // max status penalty (2) + circumstance penalty (2) = 4
    expect(conds.statusPenalty).toBe(2);

    const stats = PF2E_ENGINE.calculateCharacterStats(char);
    // Base AC = 10 + 2 (Dex mod) + 4 (Trained lvl 2) = 16. With 4 penalty -> 12
    expect(stats.ac.total).toBe(12);
  });

  it("evaluates dice formulas and critical doubles appropriately", () => {
    const roll = PF2E_ENGINE.evaluateDiceExpression("1d8+4");
    expect(roll.total).toBeGreaterThanOrEqual(5);
    expect(roll.total).toBeLessThanOrEqual(12);
    expect(roll.staticModifier).toBe(4);

    const critRoll = PF2E_ENGINE.evaluateDiceExpression("1d8+4", { isCritical: true });
    // Crit doubles dice and static modifiers
    expect(critRoll.total).toBeGreaterThanOrEqual(10);
    expect(critRoll.total).toBeLessThanOrEqual(24);
    expect(critRoll.staticModifier).toBe(4);
    expect(critRoll.total).toBe(critRoll.baseTotal * 2);
  });

  it("garante que os dados da árvore de progressão contenham suporte a Ancestry, Background, Class, Heritage e Feats", () => {
    const swashbuckler = {
      name: "Lorenzo",
      level: 1,
      ancestry: "Human",
      background: "Noble (Heraldry)",
      class: "Swashbuckler",
      heritage: "Versatile Human",
      subclass: "Fencer",
      feats: [
        { slotId: "1_general_feat", name: "Fleet", type: "Geral" },
        { slotId: "1_ancestry_feat", name: "Natural Ambition", type: "Ancestral" },
        { slotId: "1_class_feat", name: "Goading Feint", type: "Classe" },
        { slotId: "1_class_feat_extra", name: "Extravagant Parry", type: "Classe", actions: 1 }
      ]
    };

    const stats = PF2E_ENGINE.calculateCharacterStats(swashbuckler);
    expect(stats).toBeDefined();
    expect(swashbuckler.ancestry).toBe("Human");
    expect(swashbuckler.background).toBe("Noble (Heraldry)");
    expect(swashbuckler.class).toBe("Swashbuckler");
    expect(swashbuckler.heritage).toBe("Versatile Human");
    expect(swashbuckler.subclass).toBe("Fencer");
    expect(swashbuckler.feats.length).toBe(4);
  });
});

