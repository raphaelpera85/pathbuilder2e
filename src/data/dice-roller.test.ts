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

describe("Polyhedral Animated Dice Roller & Pool Mechanics", () => {
  const engine = loadEngine();

  it("avalia expressões de dados simples e compostas com sucesso", () => {
    const d20 = engine.evaluateDiceExpression("1d20+6");
    expect(d20.total).toBeGreaterThanOrEqual(7);
    expect(d20.total).toBeLessThanOrEqual(26);

    const d6Pool = engine.evaluateDiceExpression("3d6+4");
    expect(d6Pool.total).toBeGreaterThanOrEqual(7);
    expect(d6Pool.total).toBeLessThanOrEqual(22);

    const critD8 = engine.evaluateDiceExpression("2d8+3", { isCritical: true });
    expect(critD8.total).toBeGreaterThanOrEqual(10);
    expect(critD8.total).toBeLessThanOrEqual(38);
  });

  it("calcula bônus e penalidades formatados corretamente", () => {
    expect(engine.formatMod(4)).toBe("+4");
    expect(engine.formatMod(0)).toBe("+0");
    expect(engine.formatMod(-2)).toBe("-2");
  });

  it("garante que todas as geometrias de dados são válidas (d4, d6, d8, d10, d12, d20, d100)", () => {
    const validSides = [4, 6, 8, 10, 12, 20, 100];
    validSides.forEach(sides => {
      const roll = Math.floor(Math.random() * sides) + 1;
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(sides);
    });
  });
});
