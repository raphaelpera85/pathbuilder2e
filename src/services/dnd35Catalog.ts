/**
 * Os dados de D&D 3.5 pertencem aos módulos versionados em `src/data/dnd35`.
 * Este adaptador permanece somente para compatibilidade com consumidores
 * antigos; ele nunca consulta nem mescla dados remotos.
 */

export interface Dnd35CatalogLoadResult {
  source: "local";
  /** Nenhuma sobreposição remota é aplicada. */
  applied: Record<string, number>;
}

/** Linha válida: `data` é objeto com `id` igual ao sufixo do id da linha (`dnd35.<tipo>.<id>`). */
export function dnd35RowPayload(row: { id?: unknown; data?: unknown }): { id: string } | null {
  const data = row.data as { id?: unknown } | null;
  if (!data || typeof data !== "object" || typeof data.id !== "string") return null;
  if (typeof row.id !== "string" || !row.id.startsWith("dnd35.") || !row.id.endsWith(`.${data.id}`)) return null;
  return data as { id: string };
}

/** Compatibilidade com a API anterior, agora estritamente local. */
export async function loadDnd35Catalog(_force = false): Promise<Dnd35CatalogLoadResult> {
  return { source: "local", applied: {} };
}
