import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

/**
 * Contrato do round-trip JSON do construtor legado.
 *
 * O arquivo exportado precisa declarar sistema, ruleset e versão do catálogo,
 * e a importação não pode gravar esses metadados dentro da ficha nem deixar de
 * avisar quando o arquivo vem de outro ruleset.
 */
function loadLegacyApp() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const appCode = readFileSync(resolve(process.cwd(), "js", "app.js"), "utf8");

  const elements = new Map<string, any>();
  const alerts: string[] = [];
  const createElement = () => ({
    innerHTML: "",
    innerText: "",
    value: "",
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {},
  });
  const getElement = (id: string) => {
    if (!elements.has(id)) elements.set(id, createElement());
    return elements.get(id);
  };

  class MockEvent {
    type: string;
    constructor(type: string) { this.type = type; }
  }

  const sandbox: any = {
    module: { exports: {} },
    Event: MockEvent,
    CustomEvent: MockEvent,
    alert: (message: string) => { alerts.push(String(message)); },
    console,
    structuredClone,
    window: {
      print: () => {},
      localStorage: { getItem: () => "pt-BR", setItem: () => {}, removeItem: () => {} },
      dispatchEvent: () => true,
      addEventListener: () => {},
    },
    document: {
      getElementById: getElement,
      querySelectorAll: () => [],
      addEventListener: () => {},
    },
    localStorage: { getItem: () => "pt-BR", setItem: () => {}, removeItem: () => {} },
    globalThis: {},
  };

  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; ${appCode};`, sandbox);

  return {
    app: sandbox.window?.app || sandbox.app,
    data: sandbox.window?.PF2E_DATA || sandbox.PF2E_DATA,
    getElement,
    alerts,
  };
}

describe("exportação e importação JSON do construtor legado", () => {
  it("o JSON exportado declara sistema, ruleset e versão do catálogo", () => {
    const { app, data, getElement } = loadLegacyApp();
    app.character = { id: "heroi_json", name: "Herói JSON", level: 4, ruleset: "remaster", abilities: {} };

    app.openExportModal();
    const exported = JSON.parse(getElement("jsonArea").value);

    expect(exported.name).toBe("Herói JSON");
    expect(exported.exportMetadata).toMatchObject({
      schemaVersion: "1.0",
      systemId: "pf2e",
      ruleset: "remaster",
      catalogVersion: data.catalogVersion,
    });
    expect(Date.parse(exported.exportMetadata.exportedAt)).not.toBeNaN();
  });

  it("a importação descarta os metadados e não avisa quando o ruleset coincide", () => {
    const { app, getElement, alerts } = loadLegacyApp();
    app.character = { id: "heroi_json", name: "Herói JSON", level: 4, ruleset: "remaster", abilities: {} };
    app.openExportModal();
    const exported = getElement("jsonArea").value;

    getElement("jsonArea").value = exported;
    app.applyJson();

    expect(app.character).not.toHaveProperty("exportMetadata");
    expect(app.character.name).toBe("Herói JSON");
    expect(alerts.join(" | ")).toContain("importado com sucesso");
    expect(alerts.join(" | ")).not.toContain("Atenção");
  });

  it("a importação avisa quando o arquivo vem de outro ruleset", () => {
    const { app, getElement, alerts } = loadLegacyApp();
    app.character = { id: "heroi_json", name: "Herói JSON", level: 4, ruleset: "remaster", abilities: {} };

    const foreign = {
      id: "heroi_classico",
      name: "Herói Clássico",
      level: 2,
      ruleset: "legacy",
      abilities: {},
      exportMetadata: {
        schemaVersion: "1.0",
        systemId: "pf2e",
        ruleset: "legacy",
        catalogVersion: "pf2e-1-00000000",
        exportedAt: "2026-09-21T10:00:00.000Z",
      },
    };
    getElement("jsonArea").value = JSON.stringify(foreign);
    app.applyJson();

    expect(app.character).not.toHaveProperty("exportMetadata");
    expect(app.character.ruleset).toBe("legacy");
    const message = alerts.join(" | ");
    expect(message).toContain("importado com sucesso");
    expect(message).toContain("Atenção");
    expect(message).toContain("legacy");
  });
});
