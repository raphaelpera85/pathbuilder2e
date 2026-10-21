import type { CharacterData } from "./characters";
import { normalizeCharacterRuleset } from "./characters";
import { readExportMetadata, stripExportMetadata } from "./exportMetadata";

export interface ConversionReportItem {
  field: string;
  originalValue: unknown;
  importedValue: unknown;
  status: "matched" | "normalized" | "warning" | "omitted";
  message?: string;
}

export interface CharacterConversionReport {
  valid: boolean;
  systemId: string;
  targetSystemId: string;
  isCrossSystem: boolean;
  ruleset: string;
  sourceCatalogVersion: string;
  characterName: string;
  level: number;
  warnings: string[];
  conversionLog: ConversionReportItem[];
}

export interface ImportCharacterResult {
  character: CharacterData;
  report: CharacterConversionReport;
}

/**
 * Importa um payload JSON de personagem externo e produz um relatório de conversão
 * explícito, sem fingir compatibilidade automática entre sistemas diferentes.
 */
export function importExternalCharacter(
  rawPayload: unknown,
  forcedTargetSystemId?: string,
): ImportCharacterResult {
  let parsed: Record<string, unknown>;

  if (typeof rawPayload === "string") {
    try {
      parsed = JSON.parse(rawPayload);
    } catch {
      throw new Error("O conteúdo fornecido não é um JSON válido.");
    }
  } else if (rawPayload && typeof rawPayload === "object" && !Array.isArray(rawPayload)) {
    parsed = structuredClone(rawPayload) as Record<string, unknown>;
  } else {
    throw new Error("O payload do personagem precisa ser um objeto JSON.");
  }

  // 1. Ler e extrair metadados de transporte de exportação
  const exportMeta = readExportMetadata(parsed);
  const cleanDoc = stripExportMetadata(parsed) as Record<string, unknown>;

  // 2. Extrair sistema e ruleset de origem
  const detectedSystemId = String(
    exportMeta?.systemId ||
    cleanDoc.system_id ||
    cleanDoc.systemId ||
    "pf2e",
  ).trim().toLowerCase();

  const detectedRuleset = normalizeCharacterRuleset(
    exportMeta?.ruleset ||
    cleanDoc.ruleset,
  );

  const targetSystemId = (forcedTargetSystemId || detectedSystemId).trim().toLowerCase();
  const isCrossSystem = detectedSystemId !== targetSystemId;

  const charName = typeof cleanDoc.name === "string" && cleanDoc.name.trim()
    ? cleanDoc.name.trim()
    : "Personagem Importado";

  const charLevel = Number(cleanDoc.level);
  const normalizedLevel = Number.isInteger(charLevel) && charLevel >= 1 && charLevel <= 20
    ? charLevel
    : 1;

  const warnings: string[] = [];
  const conversionLog: ConversionReportItem[] = [];

  conversionLog.push({
    field: "name",
    originalValue: cleanDoc.name,
    importedValue: charName,
    status: cleanDoc.name ? "matched" : "normalized",
  });

  conversionLog.push({
    field: "level",
    originalValue: cleanDoc.level,
    importedValue: normalizedLevel,
    status: cleanDoc.level === normalizedLevel ? "matched" : "normalized",
  });

  conversionLog.push({
    field: "ruleset",
    originalValue: cleanDoc.ruleset,
    importedValue: detectedRuleset,
    status: cleanDoc.ruleset === detectedRuleset ? "matched" : "normalized",
  });

  // 3. Checagem explícita de incompatibilidade de sistemas
  if (isCrossSystem) {
    const alertMsg = `Atenção: A ficha foi exportada para o sistema "${detectedSystemId}", mas o destino selecionado é "${targetSystemId}". Mecânicas, classes, talentos e magias de sistemas distintos não são convertidos automaticamente.`;
    warnings.push(alertMsg);
    conversionLog.push({
      field: "system_id",
      originalValue: detectedSystemId,
      importedValue: targetSystemId,
      status: "warning",
      message: alertMsg,
    });
  } else {
    conversionLog.push({
      field: "system_id",
      originalValue: detectedSystemId,
      importedValue: targetSystemId,
      status: "matched",
    });
  }

  // 4. Limpeza de identidade para evitar conflito com fichas existentes
  const newId = `import_${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID().slice(0, 12) : `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`}`;
  delete cleanDoc.history;
  delete cleanDoc.gmEmail;
  delete cleanDoc.gm_email;
  delete cleanDoc.createdAt;
  delete cleanDoc.updatedAt;
  delete cleanDoc.created_at;
  delete cleanDoc.updated_at;

  // 5. Verificação de coleções de dados de jogo (classes, raças, talentos, magias, itens)
  const inspectCollection = (key: string, label: string) => {
    if (key in cleanDoc) {
      const val = cleanDoc[key];
      if (Array.isArray(val)) {
        if (isCrossSystem && val.length > 0) {
          const warn = `${label} (${val.length} entrada(s)): IDs pertencem ao sistema original "${detectedSystemId}" e podem não existir no catálogo de "${targetSystemId}".`;
          warnings.push(warn);
          conversionLog.push({
            field: key,
            originalValue: val,
            importedValue: val,
            status: "warning",
            message: warn,
          });
        } else {
          conversionLog.push({
            field: key,
            originalValue: val,
            importedValue: val,
            status: "matched",
          });
        }
      } else if (typeof val === "string" && val.trim()) {
        if (isCrossSystem) {
          const warn = `${label} ("${val}"): Referência ao catálogo de "${detectedSystemId}".`;
          warnings.push(warn);
          conversionLog.push({
            field: key,
            originalValue: val,
            importedValue: val,
            status: "warning",
            message: warn,
          });
        } else {
          conversionLog.push({
            field: key,
            originalValue: val,
            importedValue: val,
            status: "matched",
          });
        }
      }
    }
  };

  inspectCollection("raceId", "Raça");
  inspectCollection("ancestry", "Ancestralidade");
  inspectCollection("classId", "Classe");
  inspectCollection("class", "Classe");
  inspectCollection("backgroundId", "Antecedente");
  inspectCollection("featIds", "Talentos");
  inspectCollection("spellIds", "Magias");
  inspectCollection("equipmentIds", "Equipamento");
  inspectCollection("weaponIds", "Armas");
  inspectCollection("armorIds", "Armaduras");
  inspectCollection("gearIds", "Itens de Aventura");

  // 6. Construir documento final normalizado
  const importedCharacter: CharacterData = {
    ...cleanDoc,
    id: newId,
    name: charName,
    level: normalizedLevel,
    system_id: targetSystemId,
    systemId: targetSystemId,
    ruleset: detectedRuleset,
  } as CharacterData;

  const report: CharacterConversionReport = {
    valid: true,
    systemId: detectedSystemId,
    targetSystemId,
    isCrossSystem,
    ruleset: detectedRuleset,
    sourceCatalogVersion: exportMeta?.catalogVersion || "unknown",
    characterName: charName,
    level: normalizedLevel,
    warnings,
    conversionLog,
  };

  return {
    character: importedCharacter,
    report,
  };
}
