import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadAppAndPrint() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const appCode = readFileSync(resolve(process.cwd(), "js", "app.js"), "utf8");

  const printAreaMock = { innerHTML: "" };
  let printed = false;

  class MockEvent {
    type: string;
    constructor(type: string) { this.type = type; }
  }

  const mockElement = () => ({
    innerHTML: "",
    value: "",
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {}
  });

  const sandbox: any = {
    module: { exports: {} },
    Event: MockEvent,
    CustomEvent: MockEvent,
    window: {
      print: () => { printed = true; },
      localStorage: { getItem: () => "pt-BR", setItem: () => {} },
      dispatchEvent: () => true,
      addEventListener: () => {}
    },
    document: {
      getElementById: (id: string) => {
        if (id === "printSheetArea") return printAreaMock;
        return mockElement();
      },
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    localStorage: { getItem: () => "pt-BR", setItem: () => {} },
    globalThis: {},
    structuredClone
  };

  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; ${appCode};`, sandbox);

  const instance = sandbox.window?.app || sandbox.app || (sandbox.PathbuilderApp ? new sandbox.PathbuilderApp() : null);
  const eng = sandbox.PF2E_ENGINE || sandbox.window?.PF2E_ENGINE || sandbox.module?.exports;

  return {
    app: instance,
    engine: eng,
    printArea: printAreaMock,
    isPrinted: () => printed
  };
}

describe("Ficha Oficial de Personagem Paizo Remaster (Impressão em 4 Páginas)", () => {
  it("deve normalizar a edição da ficha ao carregar documentos antigos ou localizados", () => {
    const { app } = loadAppAndPrint();

    app.loadCharacter({ name: "Ficha Clássica", level: 1, ruleset: "Edição Clássica", abilities: {} });
    expect(app.character.ruleset).toBe("legacy");

    app.loadCharacter({ name: "Ficha Remaster", level: 1, ruleset: "Remaster", abilities: {} });
    expect(app.character.ruleset).toBe("remaster");
  });

  it("deve renderizar a estrutura exata de 4 páginas (.sheet-page)", () => {
    const { app, engine, printArea } = loadAppAndPrint();
    expect(app).toBeDefined();

    app.character = {
      name: "Valeros de Golarion",
      level: 5,
      ancestry: "Humano (Human)",
      heritage: "Humano Versátil",
      background: "Guerreiro Veterano",
      class: "Guerreiro (Fighter)",
      subclass: "Lutador de Escudo",
      abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 },
      weapons: [
        { name: "Espada Longa", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"], category: "Marcial", hands: 1 }
      ],
      spells: [
        { name: "Luz", rank: 0, actions: "◆◆" }
      ],
      inventory: [
        { name: "Cota de Malha", qty: 1, bulk: "2" },
        { name: "Escudo de Aço", qty: 1, bulk: "1" }
      ],
      coins: { gp: 25, sp: 14 }
    };

    app.calc = engine.calculateCharacterStats(app.character);
    app.printOfficialPdf();

    const output = printArea.innerHTML;

    // 1. Deve conter 4 páginas com a classe .sheet-page
    const pageMatches = output.match(/class="sheet-page"/g);
    expect(pageMatches).not.toBeNull();
    expect(pageMatches?.length).toBe(4);

    // 2. Página 1: Cabeçalho, Atributos, Defesas, Golpes e Tabela de Perícias TEML
    expect(output).toContain("PATHFINDER");
    expect(output).toContain("Ficha Oficial de Personagem · Remaster");
    expect(output).toContain("Valeros de Golarion");
    expect(output).toContain("NÍVEL 5");
    expect(output).toContain("FORÇA");
    expect(output).toContain("Valor: 18");
    expect(output).toContain("CLASSE DE ARMADURA");
    expect(output).toContain("PONTOS DE VIDA");
    expect(output).toContain("Espada Longa");
    expect(output).toContain("Tabela de Perícias Oficiais (TEML)");
    expect(output).toContain("Página 1 de 4");

    // 3. Página 2: Talentos, Progressão e Inventário com Carga
    expect(output).toContain("PROGRESSÃO & INVENTÁRIO");
    expect(output).toContain("Árvore de Talentos & Habilidades (1–20)");
    expect(output).toContain("Cota de Malha");
    expect(output).toContain("Capacidade de Carga & Riqueza");
    expect(output).toContain("Página 2 de 4");

    // 4. Página 3: Retrato, Histórico e Ações de Combate
    expect(output).toContain("IDENTIDADE & BIOGRAFIA");
    expect(output).toContain("Retrato do Personagem");
    expect(output).toContain("Ações, Atividades & Reações de Combate");
    expect(output).toContain("Página 3 de 4");

    // 5. Página 4: Grimório, Espaços de Magia por Círculo (1 a 10) e Rituais
    expect(output).toContain("GRIMÓRIO & CONJURAÇÃO");
    expect(output).toContain("Espaços de Magia por Círculo (1–10)");
    expect(output).toContain("1º Círculo");
    expect(output).toContain("10º Círculo");
    expect(output).toContain("Página 4 de 4");
  });
});
