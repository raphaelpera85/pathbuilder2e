/**
 * Metadados de exportação/importação de fichas.
 *
 * Uma ficha exportada só pode ser reimportada com segurança se o arquivo
 * declarar de qual sistema, ruleset e catálogo ele veio. Estes dados são
 * metadados de transporte: nunca entram no documento persistido (ver
 * `validateCharacter`), mas ficam disponíveis para o importador avisar sobre
 * incompatibilidades em vez de fingir compatibilidade.
 */

export const CHARACTER_SCHEMA_VERSION = "1.0";

export interface CharacterExportMetadata {
  schemaVersion: string;
  systemId: string;
  ruleset: string;
  catalogVersion: string;
  exportedAt: string;
}

export interface ExportMetadataInput {
  systemId?: string;
  ruleset?: string;
  catalogVersion?: string;
  now?: Date;
}

export interface ExportCompatibilityIssue {
  kind: "system" | "ruleset" | "schema";
  imported: string;
  current: string;
}

function fnv1a(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/**
 * Deriva uma versão estável do catálogo a partir das contagens reais por
 * categoria. Duas composições diferentes com o mesmo total continuam gerando
 * versões distintas, e a versão muda sozinha quando o acervo é regenerado.
 * A mesma fórmula é usada em `js/pf2e_data.js` (`PF2E_DATA.catalogVersion`);
 * o teste de contrato garante que as duas implementações concordam.
 */
export function deriveCatalogVersion(counts: Record<string, number>, label = "catalog"): string {
  const keys = Object.keys(counts).sort();
  const total = keys.reduce((sum, key) => sum + (Number(counts[key]) || 0), 0);
  const signature = keys.map((key) => `${key}:${Number(counts[key]) || 0}`).join("|");
  return `${label}-${total}-${fnv1a(signature)}`;
}

export function buildCharacterExportMetadata(input: ExportMetadataInput = {}): CharacterExportMetadata {
  return {
    schemaVersion: CHARACTER_SCHEMA_VERSION,
    systemId: input.systemId || "pf2e",
    ruleset: input.ruleset || "needs_review",
    catalogVersion: input.catalogVersion || "unknown",
    exportedAt: (input.now || new Date()).toISOString(),
  };
}

/** Anexa os metadados sem alterar o documento original nem o histórico. */
export function withExportMetadata<T extends Record<string, unknown>>(
  document: T,
  input: ExportMetadataInput = {},
): T & { exportMetadata: CharacterExportMetadata } {
  return {
    ...structuredClone(document),
    exportMetadata: buildCharacterExportMetadata(input),
  };
}

export function readExportMetadata(payload: unknown): CharacterExportMetadata | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const candidate = (payload as Record<string, unknown>).exportMetadata;
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return null;
  const meta = candidate as Record<string, unknown>;
  const asString = (value: unknown, fallback: string) =>
    typeof value === "string" && value.trim() ? value.trim() : fallback;
  return {
    schemaVersion: asString(meta.schemaVersion, "unknown"),
    systemId: asString(meta.systemId, "unknown"),
    ruleset: asString(meta.ruleset, "unknown"),
    catalogVersion: asString(meta.catalogVersion, "unknown"),
    exportedAt: asString(meta.exportedAt, "unknown"),
  };
}

/** Remove os metadados de transporte para que não virem dados da ficha. */
export function stripExportMetadata<T>(payload: T): T {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return payload;
  const clone = structuredClone(payload) as Record<string, unknown>;
  delete clone.exportMetadata;
  return clone as T;
}

/**
 * Compara a origem do arquivo com a ficha atual. Retorna apenas divergências
 * verificáveis; ausência de metadados (arquivos antigos) não é divergência.
 */
export function describeExportCompatibility(
  metadata: CharacterExportMetadata | null,
  current: { systemId?: string; ruleset?: string },
): ExportCompatibilityIssue[] {
  if (!metadata) return [];
  const issues: ExportCompatibilityIssue[] = [];
  if (metadata.schemaVersion !== "unknown" && metadata.schemaVersion !== CHARACTER_SCHEMA_VERSION) {
    issues.push({ kind: "schema", imported: metadata.schemaVersion, current: CHARACTER_SCHEMA_VERSION });
  }
  if (current.systemId && metadata.systemId !== "unknown" && metadata.systemId !== current.systemId) {
    issues.push({ kind: "system", imported: metadata.systemId, current: current.systemId });
  }
  if (current.ruleset && metadata.ruleset !== "unknown" && metadata.ruleset !== current.ruleset) {
    issues.push({ kind: "ruleset", imported: metadata.ruleset, current: current.ruleset });
  }
  return issues;
}
