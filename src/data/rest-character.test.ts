import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

const loadEngine = () => {
  const dataCode = read("js/pf2e_data.js");
  const engineCode = read("js/pf2e_engine.js");
  const fn = new Function(`${dataCode};\n${engineCode};\nreturn { PF2E_DATA, PF2E_ENGINE };`);
  return fn();
};

const loadRestCharacter = (engine: any) => {
  const app = read("js/app.js");
  const start = app.indexOf("restCharacter() {");
  const end = app.indexOf("\n  updateCoins", start);
  if (start < 0 || end < 0) throw new Error("restCharacter implementation not found");
  return new Function("PF2E_ENGINE", `return function ${app.slice(start, end)}`)(engine);
};

describe("PF2e 8-Hour Rest & Daily Preparations Mechanics", () => {
  const { PF2E_ENGINE } = loadEngine();
  const restCharacterFn = loadRestCharacter(PF2E_ENGINE);

  it("recupera PV baseado no modificador de Con x nível e limpa tempHp", () => {
    const context: any = {
      character: {
        level: 3,
        abilities: { con: 14 }, // Con mod +2
        currentHp: 10,
        tempHp: 5,
        conditions: [],
        shieldRaised: true,
        spellSlotsUsed: { 1: 2 },
        focusPointsCurrent: 0
      },
      calc: {
        maxHp: 38,
        featEffects: {}
      },
      saveCharacterLocal: vi.fn(),
      renderAll: vi.fn(),
      getLocale: () => "pt-BR"
    };

    restCharacterFn.call(context);

    // Natural recovery: Con mod 2 * lvl 3 = 6 HP recovered -> 10 + 6 = 16
    expect(context.character.currentHp).toBe(16);
    expect(context.character.tempHp).toBe(0);
    expect(context.character.shieldRaised).toBe(false);
    expect(context.character.spellSlotsUsed).toEqual({});
    expect(context.saveCharacterLocal).toHaveBeenCalledWith(false);
    expect(context.renderAll).toHaveBeenCalled();
  });

  it("remove Fatigado, decrementa Condenado/Drenado e remove Ferido quando curado ao máximo", () => {
    const context: any = {
      character: {
        level: 4,
        abilities: { con: 18 }, // Con mod +4 -> recovery 16 HP
        currentHp: 30,
        tempHp: 10,
        wounded: 2,
        conditions: [
          { name: "Fatigado" },
          { name: "Condenado", value: 2 },
          { name: "Drenado", value: 1 },
          { name: "Amedrontado", value: 1 },
          { name: "Ferido", value: 2 }
        ],
        shieldRaised: true,
        spellSlotsUsed: {}
      },
      calc: {
        maxHp: 40, // 30 + 16 = 46 -> capped at 40 (cheio!)
        featEffects: {}
      },
      saveCharacterLocal: vi.fn(),
      renderAll: vi.fn(),
      getLocale: () => "en"
    };

    restCharacterFn.call(context);

    expect(context.character.currentHp).toBe(40);
    expect(context.character.tempHp).toBe(0);
    // Como atingiu PV máximo, Wounded é removido
    expect(context.character.wounded).toBe(0);

    // Fatigado removido
    const condNames = context.character.conditions.map((c: any) => c.name || c.id);
    expect(condNames).not.toContain("Fatigado");
    expect(condNames).not.toContain("Ferido");

    // Condenado decrementado de 2 para 1
    const doomed = context.character.conditions.find((c: any) => (c.name || c.id).includes("Condenado"));
    expect(doomed).toBeDefined();
    expect(doomed.value).toBe(1);

    // Drenado decrementado de 1 para 0 (removido!)
    const drained = context.character.conditions.find((c: any) => (c.name || c.id).includes("Drenado"));
    expect(drained).toBeUndefined();

    // Amedrontado preservado
    const frightened = context.character.conditions.find((c: any) => (c.name || c.id).includes("Amedrontado"));
    expect(frightened).toBeDefined();
  });

  it("mantém Ferido caso o descanso não cure o personagem até o PV máximo", () => {
    const context: any = {
      character: {
        level: 1,
        abilities: { con: 10 }, // Con mod 0 -> min 1 * 1 = 1 HP
        currentHp: 2,
        tempHp: 0,
        wounded: 1,
        conditions: [
          { name: "Ferido", value: 1 }
        ]
      },
      calc: {
        maxHp: 20, // 2 + 1 = 3 < 20
        featEffects: {}
      },
      saveCharacterLocal: vi.fn(),
      renderAll: vi.fn(),
      getLocale: () => "es"
    };

    restCharacterFn.call(context);

    expect(context.character.currentHp).toBe(3);
    expect(context.character.wounded).toBe(1);
    expect(context.character.conditions.some((c: any) => (c.name || c.id).includes("Ferido"))).toBe(true);
  });
});
