import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE;`, sandbox);
  return sandbox.sandboxEngine;
}

describe("P2: Motor de Grimório & Spellcasting Automático (Spellcasting Engine)", () => {
  const engine = loadEngine();

  it("deve calcular CD de magia e ataque mágico para Mago (Arcano / INT)", () => {
    const wizardChar = {
      name: "Ezren",
      level: 1,
      class: "Mago (Wizard)",
      abilities: { str: 10, dex: 12, con: 12, int: 18, wis: 14, cha: 10 },
      spellProficiency: "Treinado", // Base +2 + lvl 1 = +3 + INT 4 = +7 Atk, CD 17
    };

    const spellcasting = engine.calculateSpellcasting(wizardChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("arcane");
    expect(spellcasting.keyAttr).toBe("int");
    expect(spellcasting.dc).toBe(17); // 10 + 4(int) + 3(trained+lvl)
    expect(spellcasting.attackMod).toBe(7); // 4(int) + 3(trained+lvl)
    expect(spellcasting.slotsByRank[1]).toBe(2); // Nv 1 Mago tem 2 slots de 1º círculo
    expect(spellcasting.cantripsAllowed).toBe(5);
  });

  it("deve calcular CD de magia e tradição Divina para Clérigo (SAB)", () => {
    const clericChar = {
      name: "Kyra",
      level: 3,
      class: "Clérigo (Cleric)",
      abilities: { str: 14, dex: 10, con: 14, int: 10, wis: 18, cha: 14 },
      spellProficiency: "Treinado", // +2 + 3 = +5 + SAB 4 = +9 Atk, CD 19
    };

    const spellcasting = engine.calculateSpellcasting(clericChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("divine");
    expect(spellcasting.keyAttr).toBe("wis");
    expect(spellcasting.dc).toBe(19); // 10 + 4 + 5
    expect(spellcasting.attackMod).toBe(9);
    expect(spellcasting.slotsByRank[1]).toBe(3);
    expect(spellcasting.slotsByRank[2]).toBe(2);
  });

  it("deve gerenciar e calcular Pontos de Foco corretamente", () => {
    const bardChar = {
      name: "Lem",
      level: 1,
      class: "Bardo (Bard)",
      abilities: { str: 10, dex: 14, con: 12, int: 12, wis: 10, cha: 18 },
      focusPoints: 1
    };

    const spellcasting = engine.calculateSpellcasting(bardChar);
    expect(spellcasting.maxFocusPoints).toBe(1);
    expect(spellcasting.currentFocusPoints).toBe(1);
  });
});
