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

describe("P1: Validador de Prontidão da Ficha & Regras ABC (Readiness Engine)", () => {
  const engine = loadEngine();

  it("deve identificar ficha recém-criada como incompleta com score baixo", () => {
    const blankChar = {
      name: "Incompleto",
      level: 1,
      ancestry: "",
      background: "",
      class: "",
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      skills: {},
      weapons: []
    };

    const readiness = engine.validateCharacterReadiness(blankChar);
    expect(readiness.isReady).toBe(false);
    expect(readiness.score).toBeLessThan(50);
    expect(readiness.issues.length).toBeGreaterThan(0);
    
    // Checa se pendências essenciais foram reportadas
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("ancestry");
    expect(issueIds).toContain("background");
    expect(issueIds).toContain("class");
  });

  it("deve auditar subclasse obrigatória para Campeão e Clérigo", () => {
    const clericWithoutDeity = {
      name: "Clérigo Sem Fé",
      level: 1,
      ancestry: "Humano",
      background: "Acólito",
      class: "Clérigo (Cleric)",
      subclass: "",
      deity: "",
      abilities: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
      skills: { religion: "Treinado" },
      weapons: [{ name: "Maça" }]
    };

    const readiness = engine.validateCharacterReadiness(clericWithoutDeity);
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("deity");
  });

  it("deve validar personagem 100% completo com 100% de prontidão", () => {
    const completeChar = {
      name: "Valeros Guerreiro",
      level: 1,
      ancestry: "Humano",
      background: "Guarda da Cidade",
      class: "Guerreiro (Fighter)",
      subclass: "Vanguarda",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", acrobatics: "Treinado", warfare: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Espada Longa", category: "Marcial" }]
    };

    const readiness = engine.validateCharacterReadiness(completeChar);
    expect(readiness.isReady).toBe(true);
    expect(readiness.score).toBe(100);
    expect(readiness.issues.length).toBe(0);
  });
});
