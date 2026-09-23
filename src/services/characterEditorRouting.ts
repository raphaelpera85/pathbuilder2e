import type { RPGSystemId } from "../types";
import { getCatalogVersion } from "../data/catalogVersions";

export type CharacterEditorRoute = "pf2e" | "core" | "ose";

const SUPPORTED_SYSTEM_IDS = new Set(["pf2e", "t20", "dnd5e", "ose"]);

function isSupportedSystemId(value: unknown): value is RPGSystemId {
  return typeof value === "string" && SUPPORTED_SYSTEM_IDS.has(value);
}

/** Resolve the editor without allowing a saved system to fall into another system's wizard. */
export function getCharacterEditorRoute(systemId: RPGSystemId | string | undefined): CharacterEditorRoute {
  if (systemId === "ose") return "ose";
  if (systemId === "t20" || systemId === "dnd5e") return "core";
  return "pf2e";
}

export function getPersistedCharacterSystemId(
  rowSystemId: string | undefined,
  data: { system_id?: string; systemId?: string } | null | undefined,
): RPGSystemId {
  if (isSupportedSystemId(rowSystemId)) return rowSystemId;
  if (isSupportedSystemId(data?.system_id)) return data.system_id;
  if (isSupportedSystemId(data?.systemId)) return data.systemId;
  return "pf2e";
}

/**
 * Rebuilds the editor payload from the persisted row and its JSON document.
 * Older characters may have system/ruleset only in the row, while newer ones
 * usually duplicate the metadata inside data. The row is authoritative.
 */
export function hydrateCharacterForEditor<T extends Record<string, unknown>>(
  rowSystemId: string | undefined,
  rowRuleset: string | undefined,
  data: T | null | undefined,
): T & { system_id: RPGSystemId; systemId: RPGSystemId; ruleset?: string } {
  const source = data || ({} as T);
  const systemId = getPersistedCharacterSystemId(rowSystemId, source);
  return {
    ...source,
    system_id: systemId,
    systemId,
    ruleset: (source.ruleset as string | undefined) || rowRuleset,
    catalogVersion: (source.catalogVersion as string | undefined)
      || getCatalogVersion(systemId, (source.ruleset as string | undefined) || rowRuleset),
  };
}
