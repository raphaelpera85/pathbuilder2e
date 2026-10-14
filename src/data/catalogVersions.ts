/**
 * Identidade do catálogo usado para criar uma ficha.
 *
 * A versão é deliberadamente explícita e estável: ela viaja com o documento
 * salvo e permite rejeitar uma ficha de outro catálogo antes de persistir
 * alterações incompatíveis. Fichas antigas sem este campo continuam válidas.
 */
export const CURRENT_CATALOG_VERSIONS: Record<string, Record<string, string>> = {
  t20: {
    padrao: "t20-padrao-2026.09",
    "t20-ameacas": "t20-ameacas-2026.10",
    "t20-atlas": "t20-atlas-2026.10",
    "t20-deuses": "t20-deuses-2026.10",
    jogo_do_ano: "t20-jogo-do-ano-2026.09",
    needs_review: "t20-review-2026.09",
  },
  dnd5e: {
    standard: "dnd5e-standard-2026.09",
    "dnd5e-scag": "dnd5e-scag-2026.10",
    "dnd5e-ggtr": "dnd5e-ggtr-2026.10",
    "dnd5e-mtof": "dnd5e-mtof-2026.10",
    "dnd5e-strixhaven": "dnd5e-strixhaven-2026.10",
    "dnd5e-pota": "dnd5e-pota-2026.10",
    "2024": "dnd5e-2024-2026.09",
    needs_review: "dnd5e-review-2026.09",
  },
  ose: {
    advanced: "ose-advanced-2026.09",
    classic: "ose-classic-2026.09",
    basico: "ose-basico-2026.09",
    needs_review: "ose-review-2026.09",
  },
  dnd35: {
    v35: "dnd35-v35-2026.09",
    needs_review: "dnd35-review-2026.09",
  },
};

export function getCatalogVersion(systemId: string | undefined, ruleset: string | undefined): string | undefined {
  if (!systemId || !ruleset) return undefined;
  return CURRENT_CATALOG_VERSIONS[systemId]?.[ruleset];
}

/** Ausência é compatibilidade retroativa; uma versão declarada deve coincidir. */
export function isCatalogVersionCompatible(
  version: unknown,
  systemId: string | undefined,
  ruleset: string | undefined,
): boolean {
  if (typeof version !== "string" || !version.trim()) return true;
  const expected = getCatalogVersion(systemId, ruleset);
  return !expected || version === expected;
}
