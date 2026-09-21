import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import {
  CHARACTER_SCHEMA_VERSION,
  buildCharacterExportMetadata,
  deriveCatalogVersion,
  describeExportCompatibility,
  readExportMetadata,
  stripExportMetadata,
  withExportMetadata,
} from "./exportMetadata";
import { validateCharacter } from "./characters";

/** Carrega o catálogo legado no mesmo sandbox usado pelos testes de impressão. */
function loadLegacyCatalog(): any {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const sandbox: any = { window: {}, console };
  createContext(sandbox);
  runInContext(dataCode, sandbox);
  return sandbox.window.PF2E_DATA;
}

describe("metadados de exportação de ficha", () => {
  it("deriva uma versão de catálogo estável que muda com a composição", () => {
    const first = deriveCatalogVersion({ classes: 28, feats: 1919 });
    expect(first).toBe(deriveCatalogVersion({ feats: 1919, classes: 28 }));
    // Mesmo total, composição diferente => versão diferente.
    expect(deriveCatalogVersion({ classes: 27, feats: 1920 })).not.toBe(first);
    expect(deriveCatalogVersion({ classes: 28, feats: 1919, spells: 1 })).not.toBe(first);
  });

  it("a fórmula TypeScript e a do catálogo legado produzem a mesma versão", () => {
    const legacy = loadLegacyCatalog();
    const keys = [
      "ancestries", "heritages", "backgrounds", "classes", "subclasses", "archetypes",
      "feats", "spells", "focusSpells", "rituals", "items", "weapons", "armors",
      "shields", "formulas", "pets", "actions", "conditions", "buffs",
    ];
    expect(typeof legacy.catalogVersion).toBe("string");
    expect(legacy.catalogVersion.startsWith("pf2e-")).toBe(true);

    // Reconstrói a assinatura a partir das contagens reais do próprio catálogo.
    const counts: Record<string, number> = {};
    let total = 0;
    for (const key of keys) {
      const value = legacy[key];
      const count = Array.isArray(value) ? value.length : Object.keys(value ?? {}).length;
      counts[key] = count;
      total += count;
    }
    const signature = keys.map((key) => `${key}:${counts[key]}`).join("|");
    let hash = 0x811c9dc5;
    for (let index = 0; index < signature.length; index += 1) {
      hash ^= signature.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    expect(legacy.catalogVersion).toBe(`pf2e-${total}-${hash.toString(16).padStart(8, "0")}`);
  });

  it("anexa, lê e remove os metadados sem alterar a ficha", () => {
    const sheet = { id: "heroi", name: "Herói", level: 3, weapons: [{ id: "w1" }] };
    const exported = withExportMetadata(sheet, {
      systemId: "pf2e",
      ruleset: "remaster",
      catalogVersion: "pf2e-3466-7ea48ed6",
      now: new Date("2026-09-21T10:00:00.000Z"),
    });

    expect(sheet).not.toHaveProperty("exportMetadata");
    expect(exported.exportMetadata).toEqual({
      schemaVersion: CHARACTER_SCHEMA_VERSION,
      systemId: "pf2e",
      ruleset: "remaster",
      catalogVersion: "pf2e-3466-7ea48ed6",
      exportedAt: "2026-09-21T10:00:00.000Z",
    });
    expect(exported.weapons).toEqual([{ id: "w1" }]);

    expect(readExportMetadata(exported)?.catalogVersion).toBe("pf2e-3466-7ea48ed6");
    expect(readExportMetadata({ name: "Antiga", level: 1 })).toBeNull();
    expect(readExportMetadata("texto")).toBeNull();

    const restored = stripExportMetadata(exported) as Record<string, unknown>;
    expect(restored).not.toHaveProperty("exportMetadata");
    expect(restored.name).toBe("Herói");
  });

  it("a validação da ficha descarta os metadados de transporte", () => {
    const payload = withExportMetadata(
      { id: "heroi", name: "Herói", level: 2 },
      { systemId: "pf2e", ruleset: "remaster", catalogVersion: "pf2e-1-00000000" },
    );
    const character = validateCharacter(payload);
    expect(character).not.toHaveProperty("exportMetadata");
    expect(character.name).toBe("Herói");
  });

  it("descreve incompatibilidades reais e ignora arquivos antigos sem metadados", () => {
    const metadata = buildCharacterExportMetadata({ systemId: "ose", ruleset: "classic" });
    expect(describeExportCompatibility(null, { systemId: "pf2e", ruleset: "remaster" })).toEqual([]);

    const issues = describeExportCompatibility(metadata, { systemId: "pf2e", ruleset: "remaster" });
    expect(issues.map((issue) => issue.kind).sort()).toEqual(["ruleset", "system"]);
    expect(issues.find((issue) => issue.kind === "system")).toMatchObject({ imported: "ose", current: "pf2e" });

    // Mesmo sistema e mesmo ruleset: nenhuma divergência.
    expect(describeExportCompatibility(
      buildCharacterExportMetadata({ systemId: "pf2e", ruleset: "remaster" }),
      { systemId: "pf2e", ruleset: "remaster" },
    )).toEqual([]);

    // Schema de uma versão futura é sinalizado.
    const future = { ...metadata, schemaVersion: "2.0" };
    expect(describeExportCompatibility(future, { systemId: "ose", ruleset: "classic" }))
      .toEqual([{ kind: "schema", imported: "2.0", current: CHARACTER_SCHEMA_VERSION }]);
  });
});
