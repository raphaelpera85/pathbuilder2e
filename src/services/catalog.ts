import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { PickerItem, PickerType, IRPGSystem, RPGSystemId } from "../types";
import { getSystemSkillItems } from "../data/systemSkills";
import { getSystemRuleItems } from "../data/systemRulesCatalog";
import { getSystemActionItems } from "../data/systemActions";
import { getSystemConditionItems } from "../data/systemConditions";

export const DEFAULT_RPG_SYSTEMS: IRPGSystem[] = [
  {
    id: "pf2e",
    name: {
      "pt-BR": "Pathfinder 2e",
      en: "Pathfinder 2e",
      es: "Pathfinder 2e",
    },
    description: {
      "pt-BR": "Sistema oficial Remaster e Legado, com 28 classes, talentos, magias e regras completas.",
      en: "Official Remaster and Legacy rules, 28 classes, feats, spells, and full mechanics.",
      es: "Sistema oficial Remaster y Legacy, 28 clases, dotes, conjuros y mecánicas completas.",
    },
    icon: "⚔️",
    badgeColor: "#f97316",
    defaultRuleset: "remaster",
    supportedRulesets: ["remaster", "legacy"],
    active: true,
  },
  {
    id: "dnd5e",
    name: {
      "pt-BR": "D&D 5e",
      en: "D&D 5e",
      es: "D&D 5e",
    },
    description: {
      "pt-BR": "Dungeons & Dragons 5ª Edição clássica (Livro do Jogador 2014).",
      en: "Dungeons & Dragons 5th Edition classic (2014 Player's Handbook).",
      es: "Dungeons & Dragons 5ª Edición clásica (Manual del Jugador 2014).",
    },
    icon: "🐉",
    badgeColor: "#ef4444",
    defaultRuleset: "standard",
    supportedRulesets: ["standard"],
    active: true,
  },
  {
    id: "t20",
    name: {
      "pt-BR": "Tormenta 20",
      en: "Tormenta 20",
      es: "Tormenta 20",
    },
    description: {
      "pt-BR": "O maior RPG brasileiro no mundo de Arton, Edição Jogo do Ano.",
      en: "The premier Brazilian RPG set in the world of Arton, Game of the Year Edition.",
      es: "El principal juego de rol brasileño en Arton, Edición Juego del Año.",
    },
    icon: "🛡️",
    badgeColor: "#3b82f6",
    defaultRuleset: "padrao",
    supportedRulesets: ["padrao"],
    active: true,
  },
  {
    id: "ose",
    name: {
      "pt-BR": "Old-School Essentials",
      en: "Old-School Essentials",
      es: "Old-School Essentials",
    },
    description: {
      "pt-BR": "RPG clássico e retroclone B/X com opções de Fantasia Avançada (16 classes, 10 raças e regras do núcleo).",
      en: "Classic adventure RPG and B/X retroclone with Advanced Fantasy options (16 classes, 10 races, and core rules).",
      es: "Juego de rol de aventuras clásico y retroclon B/X con reglas de Fantasía Avanzada.",
    },
    icon: "🎲",
    badgeColor: "#d97706",
    defaultRuleset: "advanced",
    supportedRulesets: ["advanced", "classic"],
    active: true,
  },
];

export async function fetchCatalogSystems(): Promise<IRPGSystem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("catalog_systems")
        .select("*")
        .eq("active", true)
        .order("id");
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id as RPGSystemId,
          name: {
            "pt-BR": row.name_pt,
            en: row.name_en || row.name_pt,
            es: row.name_es || row.name_pt,
          },
          description: {
            "pt-BR": row.description_pt,
            en: row.description_en || row.description_pt,
            es: row.description_es || row.description_pt,
          },
          icon: row.icon || "⚔️",
          badgeColor: row.badge_color || "#f97316",
          defaultRuleset: row.default_ruleset || "remaster",
          supportedRulesets: row.supported_rulesets || ["remaster"],
          active: row.active ?? true,
        }));
      }
    } catch (err) {
      console.warn("[Catalog] Falha ao consultar catalog_systems, usando lista padrão:", err);
    }
  }
  return DEFAULT_RPG_SYSTEMS;
}

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
  | "catalog_buffs"
  | "catalog_skills";

export const PICKER_TYPE_TO_TABLE: Partial<Record<PickerType, CatalogTableName>> = {
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
  skill: "catalog_skills",
};

export interface CatalogItemRecord {
  id: string;
  system_id?: string;
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

export type CatalogRuleset = "remaster" | "legacy" | "standard" | "padrao" | "advanced" | "classic";

export interface CatalogSyncStatus {
  isConfigured: boolean;
  isOnline: boolean;
  source: "supabase" | "local_cache" | "local_runtime";
  lastSync?: string | null;
  tableCounts?: Partial<Record<PickerType, number>>;
}

const inMemoryCache: Record<string, Partial<Record<PickerType, PickerItem[]>>> = {};

function getCacheScope(systemId = "pf2e", ruleset?: CatalogRuleset): string {
  return `${systemId}_${ruleset || "all"}`;
}

const CORE_SYSTEM_IDS = ["t20", "dnd5e", "ose"] as const;

function getCoreFallbackItems(category: PickerType, ruleset?: CatalogRuleset): PickerItem[] {
  if (category === "rule") return CORE_SYSTEM_IDS.flatMap((systemId) => getSystemRuleItems(systemId, ruleset));
  if (category === "skill") return CORE_SYSTEM_IDS.flatMap((systemId) => getSystemSkillItems(systemId, ruleset));
  if (category === "action") return CORE_SYSTEM_IDS.flatMap((systemId) => getSystemActionItems(systemId, ruleset));
  if (category === "condition") return getSystemConditionItems("dnd5e");
  return [];
}

function getLocalCacheKey(category: PickerType, systemId = "pf2e", ruleset?: CatalogRuleset): string {
  return `pb2e_catalog_cache_${getCacheScope(systemId, ruleset)}_${category}`;
}

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
  const systemId = record.system_id || "pf2e";
  extraData.systemId = systemId;
  extraData.system_id = systemId;

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
  if (record.range_feet !== undefined) {
    extraData.range = record.range_feet;
    extraData.rangeFeet = record.range_feet;
  }
  if (record.reload !== undefined) extraData.reload = record.reload;
  if (record.hands !== undefined) extraData.hands = record.hands;
  if (record.weapon_group !== undefined) extraData.weaponGroup = record.weapon_group;
  if (record.weapon_category !== undefined) extraData.weaponCategory = record.weapon_category;
  if (record.ac_bonus !== undefined) extraData.acBonus = record.ac_bonus;
  if (record.action_cost !== undefined) extraData.actionCost = record.action_cost;
  if (record.action_type !== undefined) extraData.actionType = record.action_type;
  if (record.has_value !== undefined) extraData.hasValue = record.has_value;
  if (record.condition_group !== undefined) extraData.conditionGroup = record.condition_group;
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
  extraData.name = names["pt-BR"];
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
    system_id: systemId,
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
function saveToLocalCache(category: PickerType, items: PickerItem[], systemId = "pf2e", ruleset?: CatalogRuleset): void {
  const cacheScope = getCacheScope(systemId, ruleset);
  if (!inMemoryCache[cacheScope]) inMemoryCache[cacheScope] = {};
  inMemoryCache[cacheScope][category] = items;
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const cachePayload = {
      timestamp: new Date().toISOString(),
      systemId,
      ruleset,
      items,
    };
    window.localStorage.setItem(getLocalCacheKey(category, systemId, ruleset), JSON.stringify(cachePayload));
  } catch (err) {
    // Pode falhar se quota excedida (ex: 5MB no localStorage)
    console.warn(`[Catalog] Não foi possível gravar cache no localStorage para ${category} (${systemId}):`, err);
  }
}

/**
 * Lê itens do cache local (localStorage ou memória).
 */
function getFromLocalCache(category: PickerType, systemId = "pf2e", ruleset?: CatalogRuleset): PickerItem[] | null {
  const cacheScope = getCacheScope(systemId, ruleset);
  if (inMemoryCache[cacheScope]?.[category]) return inMemoryCache[cacheScope]![category]!;
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const cached = window.localStorage.getItem(getLocalCacheKey(category, systemId, ruleset));
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
        if (!inMemoryCache[cacheScope]) inMemoryCache[cacheScope] = {};
        inMemoryCache[cacheScope][category] = parsed.items;
        return parsed.items;
      }
    }
  } catch {
    // Cache inválido
  }
  return null;
}

async function fetchRemoteCatalogPage(
  tableName: CatalogTableName,
  systemId: string,
  from: number,
  to: number,
  limit?: number,
  ruleset?: CatalogRuleset,
): Promise<{ data: CatalogItemRecord[] | null; error: any }> {
  const baseQuery = supabase!.from(tableName).select("*");
  const systemQuery = systemId && systemId !== "all" ? baseQuery.eq("system_id", systemId) : baseQuery;
  const filteredQuery = ruleset ? systemQuery.eq("ruleset", ruleset) : systemQuery;
  const result = limit !== undefined
    ? await filteredQuery.limit(limit)
    : await filteredQuery.range(from, to);

  // Older deployments predate the multi-system migration. Keep PF2e usable
  // while those deployments are being migrated, without hiding other errors.
  if (result.error && systemId === "pf2e" && /system_id.*does not exist/i.test(result.error.message || "")) {
      const legacyQuery = supabase!.from(tableName).select("*");
    const legacyResult = limit !== undefined
      ? await legacyQuery.limit(limit)
      : await legacyQuery.range(from, to);
    return legacyResult as { data: CatalogItemRecord[] | null; error: any };
  }

  return result as { data: CatalogItemRecord[] | null; error: any };
}

/**
 * Busca uma categoria inteira do catálogo com prioridade máxima para o Supabase.
 * 1. Sempre tenta Supabase primeiro com paginação (.range) em blocos de 1000 para tabelas grandes filtrando por system_id.
 * 2. Se falhar ou offline, usa cache local (localStorage/inMemory).
 * 3. Se não houver cache e for pf2e, usa os dados do runtime local (PF2E_DATA / window.app).
 */
export async function fetchCatalogCategory(
  category: PickerType,
  options: { forceRemote?: boolean; limit?: number; systemId?: string; ruleset?: CatalogRuleset } = {}
): Promise<{ items: PickerItem[]; source: "supabase" | "local_cache" | "local_runtime" }> {
  const systemId = options.systemId ?? "pf2e";
  if (category === "rule") {
    return { items: systemId === "all" ? getCoreFallbackItems(category, options.ruleset) : getSystemRuleItems(systemId, options.ruleset), source: "local_runtime" };
  }
  const tableName = PICKER_TYPE_TO_TABLE[category];

  // 1. Prioridade absoluta: Supabase remoto
  if (isSupabaseConfigured && supabase && tableName) {
    try {
      let allRecords: CatalogItemRecord[] = [];
      const PAGE_SIZE = 1000;

      if (options.limit && options.limit <= PAGE_SIZE) {
        const { data, error } = await fetchRemoteCatalogPage(tableName, systemId, 0, options.limit - 1, options.limit, options.ruleset);
        if (!error && Array.isArray(data) && data.length > 0) {
          allRecords = data as CatalogItemRecord[];
        }
      } else {
        let from = 0;
        let fetchMore = true;
        while (fetchMore) {
          const to = from + PAGE_SIZE - 1;
          const { data, error } = await fetchRemoteCatalogPage(tableName, systemId, from, to, undefined, options.ruleset);
          if (error) {
            console.warn(`[Catalog] Aviso ao buscar registros de ${tableName} [${from}-${to}] (${systemId}):`, error.message);
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
        saveToLocalCache(category, normalized, systemId, options.ruleset);
        return { items: normalized, source: "supabase" };
      }
    } catch (err) {
      console.warn(`[Catalog] Falha de rede/Supabase para ${category} (${systemId}), usando fallback local:`, err);
    }
  }

  // Se não estiver forçando busca remota e Supabase estiver indisponível/offline, usa o cache em memória
  const cacheScope = getCacheScope(systemId, options.ruleset);
  if (inMemoryCache[cacheScope]?.[category] && inMemoryCache[cacheScope]![category]!.length > 0) {
    return { items: inMemoryCache[cacheScope]![category]!, source: "local_cache" };
  }

  // Fallback 1: Local storage cache
  const cached = getFromLocalCache(category, systemId, options.ruleset);
  if (cached && cached.length > 0) {
    return { items: cached, source: "local_cache" };
  }

  // Fallback 2: Runtime local data (window.app / PF2E_DATA) - apenas para pf2e
  if (systemId === "pf2e") {
    const runtimeItems = getLocalRuntimeItems(category);
    if (runtimeItems.length > 0) {
      if (!inMemoryCache[cacheScope]) inMemoryCache[cacheScope] = {};
      inMemoryCache[cacheScope][category] = runtimeItems;
      return { items: runtimeItems, source: "local_runtime" };
    }
  }

  // Categorias core mantêm um fallback local idempotente até que a migration
  // correspondente esteja aplicada no projeto Supabase. Quando ela existir,
  // o bloco remoto acima sempre terá precedência e a origem será "supabase".
  if (systemId === "all" && ["skill", "action", "condition"].includes(category)) {
    return { items: getCoreFallbackItems(category, options.ruleset), source: "local_runtime" };
  }
  if (category === "skill" && systemId !== "pf2e") {
    return { items: getSystemSkillItems(systemId, options.ruleset), source: "local_runtime" };
  }
  if (category === "action" && systemId !== "pf2e") {
    return { items: getSystemActionItems(systemId, options.ruleset), source: "local_runtime" };
  }
  if (category === "condition" && systemId !== "pf2e") {
    return { items: getSystemConditionItems(systemId), source: "local_runtime" };
  }

  return { items: [], source: "local_runtime" };
}

/**
 * Busca todas as 18 categorias do catálogo em paralelo/lotes no Supabase.
 */
export async function fetchAllCatalogCategories(systemId = "pf2e", ruleset?: CatalogRuleset): Promise<Record<PickerType, PickerItem[]>> {
  const categories: PickerType[] = [
    "ancestry", "heritage", "class", "subclass", "background", "archetype",
    "skill", "rule", "spell", "ritual", "feat", "item", "weapon", "armor", "shield",
    "formula", "pet", "action", "condition", "buff"
  ];
  const results: Partial<Record<PickerType, PickerItem[]>> = {};

  const BATCH_SIZE = 4;
  for (let i = 0; i < categories.length; i += BATCH_SIZE) {
    const batch = categories.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (cat) => {
          const res = await fetchCatalogCategory(cat, { systemId, ruleset });
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
  const client = supabase;
  const tables = Object.values(PICKER_TYPE_TO_TABLE).filter(Boolean) as CatalogTableName[];
  const uniqueTables = [...new Set(tables)];
  const counts: Partial<Record<CatalogTableName, number>> = {};

  await Promise.all(
    uniqueTables.map(async (tableName) => {
      try {
        const { count, error } = await client
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
  id: string,
  systemId = "pf2e"
): Promise<PickerItem | null> {
  const tableName = PICKER_TYPE_TO_TABLE[category];
  if (isSupabaseConfigured && supabase && tableName) {
    try {
      let query = supabase.from(tableName).select("*").eq("id", id);
      let { data, error } = await query.eq("system_id", systemId).maybeSingle();
      if (error && systemId === "pf2e" && /system_id.*does not exist/i.test(error.message || "")) {
        ({ data, error } = await supabase.from(tableName).select("*").eq("id", id).maybeSingle());
      }

      if (!error && data) {
        return normalizeSupabaseRecordToPickerItem(data, category);
      }
    } catch (err) {
      console.warn(`[Catalog] Erro ao buscar item ${id} em ${tableName}:`, err);
    }
  }

  // Busca no cache ou no runtime
  const categoryResult = await fetchCatalogCategory(category, { systemId });
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
