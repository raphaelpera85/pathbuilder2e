import { describe, expect, it } from "vitest";
import { importExternalCharacter } from "./characterImport";
import { withExportMetadata } from "./exportMetadata";

describe("importExternalCharacter", () => {
  it("rejeita JSON malformatado ou payload que não seja objeto", () => {
    expect(() => importExternalCharacter("invalido {]")).toThrow("JSON válido");
    expect(() => importExternalCharacter(null)).toThrow("objeto JSON");
    expect(() => importExternalCharacter(["array"])).toThrow("objeto JSON");
  });

  it("importa ficha do mesmo sistema sem avisos de incompatibilidade", () => {
    const raw = withExportMetadata(
      {
        name: "Valeros",
        level: 5,
        system_id: "pf2e",
        ruleset: "remaster",
        class: "Fighter",
        featIds: ["power-attack", "sudden-charge"],
      },
      {
        systemId: "pf2e",
        ruleset: "remaster",
        catalogVersion: "pf2e-test",
      },
    );

    const { character, report } = importExternalCharacter(raw);

    expect(report.valid).toBe(true);
    expect(report.isCrossSystem).toBe(false);
    expect(report.warnings).toHaveLength(0);
    expect(report.systemId).toBe("pf2e");
    expect(report.targetSystemId).toBe("pf2e");
    expect(report.characterName).toBe("Valeros");
    expect(report.level).toBe(5);

    expect(character.name).toBe("Valeros");
    expect(character.level).toBe(5);
    expect(character.system_id).toBe("pf2e");
    expect(character.id).toMatch(/^import_/);
    expect(character).not.toHaveProperty("exportMetadata");
  });

  it("gera relatório explícito de aviso quando há importação cross-system sem fingir conversão mágica", () => {
    const raw = withExportMetadata(
      {
        name: "Mordenkainen",
        level: 9,
        system_id: "dnd35",
        ruleset: "v35",
        classId: "mago",
        spellIds: ["0:Luz", "1:Mísseis Mágicos"],
        featIds: ["escrever-pergaminho"],
      },
      {
        systemId: "dnd35",
        ruleset: "v35",
        catalogVersion: "v35-test",
      },
    );

    // Importar forcando para t20
    const { character, report } = importExternalCharacter(raw, "t20");

    expect(report.valid).toBe(true);
    expect(report.isCrossSystem).toBe(true);
    expect(report.systemId).toBe("dnd35");
    expect(report.targetSystemId).toBe("t20");
    expect(report.warnings.length).toBeGreaterThan(0);
    expect(report.warnings[0]).toContain("não são convertidos automaticamente");

    // Confere que o relatório anotou status 'warning' para campos de catálogo de outro sistema
    const spellLog = report.conversionLog.find((item) => item.field === "spellIds");
    expect(spellLog?.status).toBe("warning");

    // A ficha resultante deve ter o sistema destino
    expect(character.system_id).toBe("t20");
    expect(character.name).toBe("Mordenkainen");
    expect(character.id).toMatch(/^import_/);
  });

  it("limpa histórico e dados de GM na importação", () => {
    const raw = {
      name: "Guerreiro Antigo",
      level: 1,
      system_id: "dnd5e",
      ruleset: "standard",
      history: [{ name: "v1", level: 1 }],
      gmEmail: "antigo@mestre.com",
      created_at: "2025-01-01T00:00:00Z",
    };

    const { character } = importExternalCharacter(raw);
    expect(character.history).toBeUndefined();
    expect((character as any).gmEmail).toBeUndefined();
    expect((character as any).created_at).toBeUndefined();
  });
});
