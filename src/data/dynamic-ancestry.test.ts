import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";

function calculate(ancestryOptions: Record<string, string>) {
  const data = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engine = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: { result?: Record<string, unknown> } = {};
  createContext(sandbox);
  const character = {
    name: "Teste", level: 1, ancestry: "Animal Desperto (Awakened Animal)", class: "Guerreiro (Fighter)",
    ancestryOptions, abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  };
  runInContext(`${data};${engine};globalThis.result=PF2E_ENGINE.calculateCharacterStats(${JSON.stringify(character)});`, sandbox);
  return sandbox.result as { maxHp: number; size: string; speed: number; movementSpeeds: { land: number; swim: number; climb: number } };
}

describe("ancestralidade com configuração dinâmica", () => {
  it("calcula um animal Grande e aquático sem substituir deslocamento zero pelo padrão", () => {
    const result = calculate({ size: "large", heritage: "swimming_aquatic" });
    expect(result).toMatchObject({ maxHp: 20, size: "Grande", speed: 0, movementSpeeds: { land: 0, swim: 30, climb: 0 } });
  });

  it("ignora identificadores importados inválidos e usa opções catalogadas seguras", () => {
    const result = calculate({ size: "colossal", heritage: "teleport" });
    expect(result).toMatchObject({ maxHp: 16, size: "Miúdo", speed: 20, movementSpeeds: { land: 20, swim: 0, climb: 20 } });
  });
});
