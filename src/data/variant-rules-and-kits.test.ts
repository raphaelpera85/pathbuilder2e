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
  runInContext(`${dataCode}; ${engineCode}; sandboxData = PF2E_DATA; sandboxEngine = PF2E_ENGINE;`, sandbox);
  return { engine: sandbox.sandboxEngine, data: sandbox.sandboxData };
}

describe("P3, P4, P5, P6: Regras Variantes, Starter Kits, Condições Vivas e Heranças Versáteis", () => {
  const { engine, data } = loadEngine();

  // P3: Regras Variantes (Automatic Bonus Progression)
  it("deve aplicar Automatic Bonus Progression (ABP) nas estatísticas de personagem de nível 10", () => {
    const charLevel10 = {
      name: "Guerreiro ABP",
      level: 10,
      ancestry: "Humano",
      class: "Guerreiro (Fighter)",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      savingThrows: { fortitude: "Mestre", reflex: "Especialista", will: "Especialista" },
      equippedArmor: { name: "Brunea", category: "Média", acBonus: 4, dexCap: 1, bulk: 2 },
      weapons: [{ name: "Espada Larga", category: "Marcial", damage: "1d12", damageType: "Cortante" }],
      skills: { athletics: "Mestre" },
      variantRules: { automaticBonusProgression: true }
    };

    const stats = engine.calculateCharacterStats(charLevel10);
    // No nível 10, ABP concede +2 ataque, +1 salvaguardas (+1 devotamento), +2 perícias
    expect(stats.abpBonuses).toBeDefined();
    expect(stats.abpBonuses.attackPotency).toBe(2);
    expect(stats.abpBonuses.savingThrowResilience).toBe(1);
    expect(stats.abpBonuses.skillPotency).toBe(2);
    
    // O ataque da arma recebe o bônus de ABP
    const swordStrike = stats.weaponStrikes.find((w: any) => w.name === "Espada Larga");
    expect(swordStrike.attackTotal).toBeGreaterThan(10);
  });

  // P4: Pacotes Iniciais de Equipamento por Classe (Class Starter Kits)
  it("deve equipar kit inicial de Guerreiro com armas, armadura e moedas restantes corretas", () => {
    const char = {
      name: "Novo Guerreiro",
      level: 1,
      class: "Guerreiro (Fighter)",
      weapons: [],
      inventory: [],
      coins: { gp: 15, sp: 0, cp: 0 }
    };

    engine.applyClassStarterKit(char, "Guerreiro (Fighter)");
    expect(char.equippedArmor.name).toBe(data.classStarterKits["Guerreiro (Fighter)"].armor);
    expect(char.weapons.length).toBeGreaterThanOrEqual(1);
    expect(char.weapons.some((w: any) => w.name === "Espada Longa (Longsword)")).toBe(true);
    expect(char.inventory.length).toBeGreaterThan(0);
    expect(char.coins.gp).toBe(data.classStarterKits["Guerreiro (Fighter)"].remainingCoins.gp);
  });

  // P5: Rastreador de Condições Vivas (Live Conditions Tracker)
  it("deve aplicar penalidades de Condições Vivas (Amedrontado, Desajeitado, Desprevenido) em CA e Ataques", () => {
    const normalChar = {
      name: "Guerreiro Saudável",
      level: 1,
      class: "Guerreiro (Fighter)",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 10, cha: 10 },
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      equippedArmor: { name: "Peitoral", category: "Média", acBonus: 4, dexCap: 1 },
      weapons: [{ name: "Espada Longa", category: "Marcial", damage: "1d8" }],
      conditions: {}
    };

    const normalStats = engine.calculateCharacterStats(normalChar);
    const baseAc = normalStats.ac.total;

    // Aplica Amedrontado 2 e Desprevenido (Off-Guard)
    const debuffedChar = {
      ...normalChar,
      conditions: { frightened: 2, offGuard: true }
    };

    const debuffedStats = engine.calculateCharacterStats(debuffedChar);
    // Off-guard dá -2 de circunstância na CA, Amedrontado 2 dá -2 de status em todos os testes, salvaguardas e CA
    expect(debuffedStats.ac.total).toBe(baseAc - 4);
    expect(debuffedStats.saves.fortitude.total).toBe(normalStats.saves.fortitude.total - 2);
    expect(debuffedStats.weaponStrikes[0].attackTotal).toBe(normalStats.weaponStrikes[0].attackTotal - 2);
  });

  // P6: Heranças Versáteis Híbridas (Versatile Heritages)
  it("deve carregar catálogo completo de heranças versáteis com sentidos e traços", () => {
    expect(data.versatileHeritagesCatalog).toBeDefined();
    expect(data.versatileHeritagesCatalog["Aasimar"]).toBeDefined();
    expect(data.versatileHeritagesCatalog["Tiefling"]).toBeDefined();
    expect(data.versatileHeritagesCatalog["Dhampir"]).toBeDefined();
    expect(data.versatileHeritagesCatalog["Duskwalker"]).toBeDefined();

    expect(data.versatileHeritagesCatalog["Aasimar"].traits).toContain("Celestial");
    expect(data.versatileHeritagesCatalog["Aasimar"].senses).toContain("Visão na Penumbra (Low-Light Vision)");
    expect(data.versatileHeritagesCatalog["Tiefling"].traits).toContain("Demônio");
    expect(data.versatileHeritagesCatalog["Tiefling"].senses).toContain("Visão no Escuro (Darkvision)");
  });
});
