import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { PickerItem, PickerType } from "../types";

export type CatalogTableName =
  | "catalog_ancestries"
  | "catalog_heritages"
  | "catalog_classes"
  | "catalog_subclasses"
  | "catalog_backgrounds"
  | "catalog_archetypes"
  | "catalog_spells"
  | "catalog_rituals"
  | "catalog_feats"
  | "catalog_items"
  | "catalog_weapons"
  | "catalog_armors"
  | "catalog_shields"
  | "catalog_formulas"
  | "catalog_pets"
  | "catalog_actions"
  | "catalog_conditions"
  | "catalog_buffs";

export const PICKER_TYPE_TO_TABLE: Record<PickerType, CatalogTableName> = {
  ancestry: "catalog_ancestries",
  heritage: "catalog_heritages",
  class: "catalog_classes",
  subclass: "catalog_subclasses",
  background: "catalog_backgrounds",
  archetype: "catalog_archetypes",
  spell: "catalog_spells",
  ritual: "catalog_rituals",
  feat: "catalog_feats",
  item: "catalog_items",
  gear: "catalog_items",
  weapon: "catalog_weapons",
  armor: "catalog_armors",
  shield: "catalog_shields",
  formula: "catalog_formulas",
  pet: "catalog_pets",
  action: "catalog_actions",
  condition: "catalog_conditions",
  buff: "catalog_buffs",
};

export interface CatalogItemRecord {
  id: string;
  name_pt: string;
  name_en?: string | null;
  name_es?: string | null;
  description_pt?: string | null;
  description_en?: string | null;
  description_es?: string | null;
  rarity?: string;
  ruleset?: string;
  source_book?: string | null;
  source_page?: number | null;
  traits?: string[];
  data?: Record<string, any>;
  [key: string]: any;
}

export interface CatalogSyncStatus {
  isConfigured: boolean;
  isOnline: boolean;
  source: "supabase" | "local_cache" | "local_runtime";
  lastSync?: string | null;
  tableCounts?: Partial<Record<PickerType, number>>;
}

const CACHE_PREFIX = "pb2e_catalog_cache_";
const inMemoryCache: Partial<Record<PickerType, PickerItem[]>> = {};

/**
 * Converte um registro do Supabase para o formato compatível com PickerItem da aplicação.
 */
export function normalizeSupabaseRecordToPickerItem(record: CatalogItemRecord, category: PickerType): PickerItem {
  const names = {
    "pt-BR": record.name_pt || record.name || "",
    en: record.name_en || record.name || "",
    es: record.name_es || record.name_pt || record.name || "",
  };

  const summaries = {
    "pt-BR": record.description_pt || record.description || "",
    en: record.description_en || record.description_pt || record.description || "",
    es: record.description_es || record.description_pt || record.description || "",
  };

  const extraData = { ...(record.data || {}) };

  // Normalização de atributos numéricos / campos específicos
  if (record.level !== undefined) extraData.level = record.level;
  if (record.rank !== undefined) extraData.rank = record.rank;
  if (record.hp_base !== undefined) extraData.hp = record.hp_base;
  if (record.hp_per_level !== undefined) extraData.hpPerLevel = record.hp_per_level;
  if (record.speed_feet !== undefined) extraData.speed = record.speed_feet;
  if (record.price !== undefined) extraData.price = record.price;
  if (record.bulk !== undefined) extraData.bulk = record.bulk;
  if (record.damage_dice !== undefined) extraData.damage = record.damage_dice;
  if (record.damage_type !== undefined) extraData.damageType = record.damage_type;
  if (record.ac_bonus !== undefined) extraData.acBonus = record.ac_bonus;
  if (record.prerequisite !== undefined) extraData.prerequisites = record.prerequisite;
  if (record.category !== undefined) extraData.category = record.category;
  if (record.ancestry_id) extraData.ancestryId = record.ancestry_id;
  if (record.class_id) extraData.classId = record.class_id;
  if (record.archetype_id) extraData.archetypeId = record.archetype_id;

  extraData.rarity = record.rarity || "common";
  extraData.ruleset = record.ruleset || "remaster";
  extraData.traits = Array.isArray(record.traits) ? record.traits : [];
  extraData.source = {
    book: record.source_book || undefined,
    page: record.source_page || undefined,
  };
  extraData.names = names;
  extraData.summaries = summaries;
  extraData.id = record.id;

  return {
    id: record.id,
    name: record.name_pt || record.name || record.id,
    type: category,
    data: extraData,
    summary: summaries["pt-BR"] || summaries.en || "",
    category: record.category || category,
    rarity: record.rarity || "common",
  };
}

/**
 * Obtém itens locais da aplicação legado/runtime.
 */
export function getLocalRuntimeItems(category: PickerType): PickerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const legacyApp = (window as any).app;
    if (typeof legacyApp?.getPickerItems === "function") {
      return legacyApp.getPickerItems(category, { includeIncompatible: true }) || [];
    }
  } catch (err) {
    console.warn(`[Catalog] Erro ao carregar itens locais para ${category}:`, err);
  }
  return [];
}

/**
 * Salva itens no cache local (localStorage).
 */
function saveToLocalCache(category: PickerType, items: PickerItem[]): void {
  inMemoryCache[category] = items;
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const cachePayload = {
      timestamp: new Date().toISOString(),
      items,
    };
    window.localStorage.setItem(CACHE_PREFIX + category, JSON.stringify(cachePayload));
  } catch (err) {
    // Pode falhar se quota excedida (ex: 5MB no localStorage)
    console.warn(`[Catalog] Não foi possível gravar cache no localStorage para ${category}:`, err);
  }
}

/**
 * Lê itens do cache local (localStorage ou memória).
 */
function getFromLocalCache(category: PickerType): PickerItem[] | null {
  if (inMemoryCache[category]) return inMemoryCache[category]!;
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const cached = window.localStorage.getItem(CACHE_PREFIX + category);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
        inMemoryCache[category] = parsed.items;
        return parsed.items;
      }
    }
  } catch {
    // Cache inválido
  }
  return null;
}

/**
 * Busca uma categoria inteira do catálogo com prioridade máxima para o Supabase.
 * 1. Sempre tenta Supabase primeiro com paginação (.range) em blocos de 1000 para tabelas grandes.
 * 2. Se falhar ou offline, usa cache local (localStorage/inMemory).
 * 3. Se não houver cache, usa os dados do runtime local (PF2E_DATA / window.app).
 */
export async function fetchCatalogCategory(
  category: PickerType,
  options: { forceRemote?: boolean; limit?: number } = {}
): Promise<{ items: PickerItem[]; source: "supabase" | "local_cache" | "local_runtime" }> {
  const tableName = PICKER_TYPE_TO_TABLE[category];

  // 1. Prioridade absoluta: Supabase remoto
  if (isSupabaseConfigured && supabase && tableName) {
    try {
      let allRecords: CatalogItemRecord[] = [];
      const PAGE_SIZE = 1000;

      if (options.limit && options.limit <= PAGE_SIZE) {
        const { data, error } = await supabase.from(tableName).select("*").limit(options.limit);
        if (!error && Array.isArray(data) && data.length > 0) {
          allRecords = data as CatalogItemRecord[];
        }
      } else {
        let from = 0;
        let fetchMore = true;
        while (fetchMore) {
          const to = from + PAGE_SIZE - 1;
          const { data, error } = await supabase.from(tableName).select("*").range(from, to);
          if (error) {
            console.warn(`[Catalog] Aviso ao buscar registros de ${tableName} [${from}-${to}]:`, error.message);
            break;
          }
          if (Array.isArray(data) && data.length > 0) {
            allRecords.push(...(data as CatalogItemRecord[]));
            if (data.length < PAGE_SIZE || (options.limit && allRecords.length >= options.limit)) {
              fetchMore = false;
            } else {
              from += PAGE_SIZE;
            }
          } else {
            fetchMore = false;
          }
        }
      }

      if (allRecords.length > 0) {
        const normalized = allRecords.map((record) => normalizeSupabaseRecordToPickerItem(record, category));
        saveToLocalCache(category, normalized);
        return { items: normalized, source: "supabase" };
      }
    } catch (err) {
      console.warn(`[Catalog] Falha de rede/Supabase para ${category}, usando fallback local:`, err);
    }
  }

  // Se não estiver forçando busca remota e Supabase estiver indisponível/offline, usa o cache em memória
  if (inMemoryCache[category] && inMemoryCache[category]!.length > 0) {
    return { items: inMemoryCache[category]!, source: "local_cache" };
  }

  // Fallback 1: Local storage cache
  const cached = getFromLocalCache(category);
  if (cached && cached.length > 0) {
    return { items: cached, source: "local_cache" };
  }

  // Fallback 2: Runtime local data (window.app / PF2E_DATA)
  const runtimeItems = getLocalRuntimeItems(category);
  if (runtimeItems.length > 0) {
    inMemoryCache[category] = runtimeItems;
    return { items: runtimeItems, source: "local_runtime" };
  }

  return { items: [], source: "local_runtime" };
}

/**
 * Busca todas as 18 categorias do catálogo em paralelo/lotes no Supabase.
 */
export async function fetchAllCatalogCategories(): Promise<Record<PickerType, PickerItem[]>> {
  const categories: PickerType[] = [
    "ancestry", "heritage", "class", "subclass", "background", "archetype",
    "spell", "ritual", "feat", "item", "weapon", "armor", "shield",
    "formula", "pet", "action", "condition", "buff"
  ];
  const results: Partial<Record<PickerType, PickerItem[]>> = {};

  const BATCH_SIZE = 4;
  for (let i = 0; i < categories.length; i += BATCH_SIZE) {
    const batch = categories.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (cat) => {
        const res = await fetchCatalogCategory(cat);
        results[cat] = res.items;
      })
    );
  }
  return results as Record<PickerType, PickerItem[]>;
}

/**
 * Consulta a contagem exata de linhas de todas as tabelas de catálogo no Supabase.
 */
export async function fetchCatalogTableCounts(): Promise<Record<CatalogTableName, number> | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const tables = Object.values(PICKER_TYPE_TO_TABLE);
  const uniqueTables = [...new Set(tables)];
  const counts: Partial<Record<CatalogTableName, number>> = {};

  await Promise.all(
    uniqueTables.map(async (tableName) => {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select("id", { count: "exact", head: true });
        if (!error && typeof count === "number") {
          counts[tableName] = count;
        }
      } catch {
        // Ignora erro individual
      }
    })
  );

  return counts as Record<CatalogTableName, number>;
}

/**
 * Busca um item específico pelo seu ID relacional no Supabase.
 */
export async function fetchCatalogItemById(
  category: PickerType,
  id: string
): Promise<PickerItem | null> {
  const tableName = PICKER_TYPE_TO_TABLE[category];
  if (isSupabaseConfigured && supabase && tableName) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return normalizeSupabaseRecordToPickerItem(data, category);
      }
    } catch (err) {
      console.warn(`[Catalog] Erro ao buscar item ${id} em ${tableName}:`, err);
    }
  }

  // Busca no cache ou no runtime
  const categoryResult = await fetchCatalogCategory(category);
  return categoryResult.items.find((item) => item.id === id) || null;
}

/**
 * Retorna o status atual de conexão do catálogo com o Supabase.
 */
export function getCatalogSyncStatus(): CatalogSyncStatus {
  return {
    isConfigured: Boolean(isSupabaseConfigured && supabase),
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    source: isSupabaseConfigured ? "supabase" : "local_runtime",
  };
}
