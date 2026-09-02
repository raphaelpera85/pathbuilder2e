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

describe("Foundry VTT Actor PF2e Export", () => {
  const { engine } = loadEngine();

  it("exports a character to official Foundry VTT pf2e actor structure", () => {
    const character = {
      name: "Valeros",
      level: 1,
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro (Fighter)",
      background: "Guarda da Cidade",
      gender: "Masculino",
      age: 25,
      deity: "Gorum",
      notes: "Guerreiro destemido.",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      perceptionRank: "Especialista",
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      weapons: [
        { name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] }
      ],
      feats: [
        { name: "Golpe Poderoso", type: "Talento de Classe", level: 1, description: "Desfere um ataque devastador." }
      ],
      spells: []
    };

    const actor = engine.exportFoundryVttActor(character);

    expect(actor.name).toBe("Valeros");
    expect(actor.type).toBe("character");
    expect(actor.system.details.level.value).toBe(1);
    expect(actor.system.details.ancestry.name).toBe("Humano");
    expect(actor.system.details.class.name).toBe("Guerreiro (Fighter)");
    expect(actor.system.details.deity.name).toBe("Gorum");
    expect(actor.system.abilities.str.value).toBe(18);
    expect(actor.system.abilities.str.mod).toBe(4);
    expect(actor.system.attributes.ac.value).toBeGreaterThanOrEqual(10);
    expect(actor.system.saves.fortitude.rank).toBe(2); // Especialista = 2
    expect(actor.system.saves.will.rank).toBe(1); // Treinado = 1
    expect(actor.system.skills.athletics.rank).toBe(1);
    expect(actor.items.length).toBe(2); // 1 weapon + 1 feat
    expect(actor.items[0].type).toBe("weapon");
    expect(actor.items[0].name).toBe("Espada Longa");
    expect(actor.items[1].type).toBe("feat");
    expect(actor.items[1].name).toBe("Golpe Poderoso");
  });
});
