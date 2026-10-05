/**
 * Catálogo D&D 3.5 vindo do Supabase (system_id = 'dnd35', ruleset 'v35').
 * Cada linha guarda o objeto original no campo `data` (ver
 * scripts/generate-dnd35-seed.ts). Os dados em src/data/dnd35 continuam como
 * reserva offline; o que vem do banco é mesclado por id sobre eles, de modo
 * que uma correção feita no banco vale para todos os consumidores.
 * Só linhas com system_id 'dnd35' são lidas: nunca mistura outras edições.
 */
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { DND35_RACES } from "../data/dnd35/dnd35Races";
import { DND35_CLASSES } from "../data/dnd35/dnd35Classes";
import { DND35_SKILLS } from "../data/dnd35/dnd35Skills";
import { DND35_WEAPONS, DND35_ARMORS } from "../data/dnd35/dnd35Equipment";
import { DND35_GEAR } from "../data/dnd35/dnd35Gear";

type Target = Record<string, { id: string }>;

const SOURCES: { table: string; target: Target }[] = [
  { table: "catalog_ancestries", target: DND35_RACES as Target },
  { table: "catalog_classes", target: DND35_CLASSES as Target },
  { table: "catalog_skills", target: DND35_SKILLS as Target },
  { table: "catalog_weapons", target: DND35_WEAPONS as Target },
  { table: "catalog_armors", target: DND35_ARMORS as Target },
  { table: "catalog_items", target: DND35_GEAR as Target },
];

export interface Dnd35CatalogLoadResult {
  source: "supabase" | "local";
  /** Registros do banco aplicados, por tabela. */
  applied: Record<string, number>;
}

let pending: Promise<Dnd35CatalogLoadResult> | null = null;

/** Linha válida: `data` é objeto com `id` igual ao sufixo do id da linha (`dnd35.<tipo>.<id>`). */
export function dnd35RowPayload(row: { id?: unknown; data?: unknown }): { id: string } | null {
  const data = row.data as { id?: unknown } | null;
  if (!data || typeof data !== "object" || typeof data.id !== "string") return null;
  if (typeof row.id !== "string" || !row.id.startsWith("dnd35.") || !row.id.endsWith(`.${data.id}`)) return null;
  return data as { id: string };
}

/** Carrega uma vez por sessão; falhas de rede mantêm os dados locais. */
export function loadDnd35Catalog(force = false): Promise<Dnd35CatalogLoadResult> {
  if (pending && !force) return pending;
  pending = (async () => {
    const applied: Record<string, number> = {};
    if (!isSupabaseConfigured || !supabase) return { source: "local", applied };
    try {
      for (const { table, target } of SOURCES) {
        const { data, error } = await supabase.from(table).select("id,data").eq("system_id", "dnd35").eq("ruleset", "v35").limit(1000);
        if (error || !Array.isArray(data)) continue;
        let count = 0;
        for (const row of data) {
          const payload = dnd35RowPayload(row);
          if (!payload) continue;
          target[payload.id] = { ...target[payload.id], ...payload };
          count += 1;
        }
        applied[table] = count;
      }
    } catch (err) {
      console.warn("[D&D 3.5] Falha ao carregar o catálogo do Supabase; usando dados locais:", err);
      return { source: "local", applied };
    }
    return { source: Object.keys(applied).length ? "supabase" : "local", applied };
  })();
  return pending;
}
