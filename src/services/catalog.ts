import type { PickerItem, PickerType, IRPGSystem, RPGSystemId } from "../types";
import { getSystemSkillItems } from "../data/systemSkills";
import { getSystemRuleItems } from "../data/systemRulesCatalog";
import { getSystemActionItems } from "../data/systemActions";
import { getSystemConditionItems } from "../data/systemConditions";
import systemsSnapshot from "../data/catalog/snapshots/systems.json";
import snapshotManifest from "../data/catalog/snapshots/manifest.json";

/** Snapshot versionado: edite os JSON locais e regenere o índice com `npm run catalog:manifest`. */
const snapshotLoaders = import.meta.glob("../data/catalog/snapshots/*/*/*.json", { import: "default" }) as Record<string, () => Promise<unknown>>;
const snapshotFileCache = new Map<string, Promise<CatalogItemRecord[]>>();

export type CatalogTableName =
  | "catalog_ancestries" | "catalog_heritages" | "catalog_classes" | "catalog_subclasses" | "catalog_backgrounds"
  | "catalog_archetypes" | "catalog_spells" | "catalog_rituals" | "catalog_feats" | "catalog_items"
  | "catalog_weapons" | "catalog_armors" | "catalog_shields" | "catalog_formulas" | "catalog_pets"
  | "catalog_actions" | "catalog_conditions" | "catalog_buffs" | "catalog_skills";

export const PICKER_TYPE_TO_TABLE: Partial<Record<PickerType, CatalogTableName>> = {
  ancestry: "catalog_ancestries", heritage: "catalog_heritages", class: "catalog_classes", subclass: "catalog_subclasses",
  background: "catalog_backgrounds", archetype: "catalog_archetypes", spell: "catalog_spells", ritual: "catalog_rituals",
  feat: "catalog_feats", item: "catalog_items", gear: "catalog_items", weapon: "catalog_weapons", armor: "catalog_armors",
  shield: "catalog_shields", formula: "catalog_formulas", pet: "catalog_pets", action: "catalog_actions",
  condition: "catalog_conditions", buff: "catalog_buffs", skill: "catalog_skills",
};

export interface CatalogItemRecord {
  id: string; system_id?: string | null; name_pt: string; name_en?: string | null; name_es?: string | null;
  description_pt?: string | null; description_en?: string | null; description_es?: string | null;
  rarity?: string | null; ruleset?: string | null; source_book?: string | null; source_page?: number | null;
  traits?: string[] | null; data?: Record<string, unknown> | null; [key: string]: unknown;
}

interface CatalogSystemRecord {
  id: string; name_pt: string; name_en?: string | null; name_es?: string | null; description_pt?: string | null;
  description_en?: string | null; description_es?: string | null; icon?: string | null; badge_color?: string | null;
  default_ruleset?: string | null; supported_rulesets?: string[] | null; active?: boolean | null;
}

interface CatalogSnapshotScope {
  systemId: string;
  ruleset: string;
  categories: Record<string, number>;
}

const catalogSnapshotScopes = snapshotManifest as unknown as CatalogSnapshotScope[];

export type CatalogRuleset = string;
export type CatalogSource = "local_snapshot" | "local_runtime";
export interface CatalogSyncStatus {
  isConfigured: false; isOnline: boolean; source: CatalogSource; lastSync?: string | null;
  tableCounts?: Partial<Record<PickerType, number>>;
}

function toRpgSystem(row: CatalogSystemRecord): IRPGSystem {
  return {
    id: row.id as RPGSystemId,
    name: { "pt-BR": row.name_pt, en: row.name_en || row.name_pt, es: row.name_es || row.name_pt },
    description: { "pt-BR": row.description_pt || "", en: row.description_en || row.description_pt || "", es: row.description_es || row.description_pt || "" },
    icon: row.icon || "⚔️", badgeColor: row.badge_color || "#f97316", defaultRuleset: row.default_ruleset || "standard",
    supportedRulesets: row.supported_rulesets || [row.default_ruleset || "standard"], active: row.active ?? true,
  };
}

export const DEFAULT_RPG_SYSTEMS: IRPGSystem[] = (systemsSnapshot as CatalogSystemRecord[]).map(toRpgSystem);
/** Regras de edição presentes no snapshot; novos pacotes aparecem no filtro sem editar a UI. */
export const CATALOG_RULESETS = [...new Set(
  catalogSnapshotScopes.map(({ ruleset }) => ruleset),
)].sort();
export async function fetchCatalogSystems(): Promise<IRPGSystem[]> { return DEFAULT_RPG_SYSTEMS.filter((system) => system.active); }

/** Converte um registro do snapshot versionado no formato consumido pela UI. */
export function normalizeCatalogRecordToPickerItem(record: CatalogItemRecord, category: PickerType): PickerItem {
  const data: Record<string, unknown> = { ...(record.data || {}) };
  const nestedNames = typeof data.names === "object" && data.names ? data.names as Record<string, unknown> : {};
  const nestedSummaries = typeof data.summaries === "object" && data.summaries ? data.summaries as Record<string, unknown> : {};
  const text = (...values: unknown[]) => values.find((value): value is string => typeof value === "string" && value.trim().length > 0) || "";
  const names = {
    "pt-BR": text(record.name_pt, nestedNames["pt-BR"], data.name, record.name),
    en: text(record.name_en, nestedNames.en, data.name_en, data.nameEn, record.name),
    es: text(record.name_es, nestedNames.es, data.name_es, record.name_es, record.name_pt, record.name),
  };
  const summaries = {
    "pt-BR": text(record.description_pt, nestedSummaries["pt-BR"], data.summary_pt, data.summary, data.description, record.description),
    en: text(record.description_en, nestedSummaries.en, data.summary_en, data.description_en, record.description_pt, data.summary, data.description, record.description),
    es: text(record.description_es, nestedSummaries.es, data.summary_es, data.description_es, record.description_pt, data.summary, data.description, record.description),
  };
  const systemId = record.system_id || "pf2e";
  data.systemId = systemId; data.system_id = systemId;
  const aliases: Record<string, string> = {
    level: "level", rank: "rank", hp_base: "hp", hp_per_level: "hpPerLevel", speed_feet: "speed", price: "price", bulk: "bulk",
    damage_dice: "damage", damage_type: "damageType", range_feet: "rangeFeet", reload: "reload", hands: "hands", weapon_group: "weaponGroup",
    weapon_category: "weaponCategory", ac_bonus: "acBonus", action_cost: "actionCost", action_type: "actionType", has_value: "hasValue",
    condition_group: "conditionGroup", prerequisite: "prerequisites", category: "category", ancestry_id: "ancestryId", class_id: "classId", archetype_id: "archetypeId",
    trained_skills: "trainedSkills",
  };
  for (const [dbKey, itemKey] of Object.entries(aliases)) if (record[dbKey] != null) data[itemKey] = record[dbKey];
  if (record.range_feet != null) data.range = record.range_feet;
  data.rarity = record.rarity || "common"; data.ruleset = record.ruleset || "remaster"; data.traits = Array.isArray(record.traits) ? record.traits : [];
  data.source = { book: record.source_book || undefined, page: record.source_page || undefined };
  data.names = names; data.name = names["pt-BR"]; data.summaries = summaries; data.id = record.id;
  return { id: record.id, name: record.name_pt || String(record.name || record.id), type: category, data, summary: summaries["pt-BR"] || summaries.en || "", category, rarity: record.rarity || "common", system_id: systemId };
}

async function snapshotRowsFor(category: PickerType, systemId = "all", ruleset?: string): Promise<CatalogItemRecord[]> {
  const file = category === "gear" ? "item" : category;
  const scopes = catalogSnapshotScopes.filter((scope) =>
    (systemId === "all" || scope.systemId === systemId)
    && (!ruleset || scope.ruleset === ruleset)
    && (scope.categories[file] ?? 0) > 0,
  );
  const records = await Promise.all(scopes.map(async (scope) => {
    const path = `../data/catalog/snapshots/${scope.systemId}/${scope.ruleset}/${file}.json`;
    const loader = snapshotLoaders[path];
    if (!loader) throw new Error(`Arquivo de catálogo ausente no snapshot: ${path}`);
    let pendingRecords = snapshotFileCache.get(path);
    if (!pendingRecords) {
      pendingRecords = loader().then((value) => Array.isArray(value) ? value as CatalogItemRecord[] : []);
      snapshotFileCache.set(path, pendingRecords);
    }
    return pendingRecords;
  }));
  return records.flat();
}

const CORE_SYSTEM_IDS = ["t20", "dnd5e", "ose"] as const;
function localRuntimeItems(category: PickerType, systemId: string, ruleset: string | undefined, hasSnapshotRecords: boolean): PickerItem[] {
  if (category === "rule") return systemId === "all" ? CORE_SYSTEM_IDS.flatMap((id) => getSystemRuleItems(id, ruleset)) : getSystemRuleItems(systemId, ruleset);
  if (category === "skill" && !hasSnapshotRecords) return getSystemSkillItems(systemId, ruleset);
  if (category === "action" && !hasSnapshotRecords) return getSystemActionItems(systemId, ruleset);
  if (category === "condition" && !hasSnapshotRecords) return getSystemConditionItems(systemId);
  return [];
}

export async function fetchCatalogCategory(category: PickerType, options: { limit?: number; systemId?: string; ruleset?: CatalogRuleset } = {}): Promise<{ items: PickerItem[]; source: CatalogSource }> {
  const systemId = options.systemId ?? "pf2e";
  const records = await snapshotRowsFor(category, systemId, options.ruleset);
  if (records.length) {
    const items = records.map((record) => normalizeCatalogRecordToPickerItem(record, category));
    return { items: options.limit ? items.slice(0, options.limit) : items, source: "local_snapshot" };
  }
  return { items: localRuntimeItems(category, systemId, options.ruleset, false), source: "local_runtime" };
}

export async function fetchAllCatalogCategories(systemId = "pf2e", ruleset?: CatalogRuleset): Promise<Record<PickerType, PickerItem[]>> {
  const categories: PickerType[] = ["ancestry", "heritage", "class", "subclass", "background", "archetype", "skill", "rule", "spell", "ritual", "feat", "item", "weapon", "armor", "shield", "formula", "pet", "action", "condition", "buff"];
  const values = await Promise.all(categories.map((category) => fetchCatalogCategory(category, { systemId, ruleset })));
  return Object.fromEntries(categories.map((category, index) => [category, values[index].items])) as Record<PickerType, PickerItem[]>;
}

export async function fetchCatalogTableCounts(): Promise<Record<CatalogTableName, number>> {
  const counts = {} as Record<CatalogTableName, number>;
  for (const [type, table] of Object.entries(PICKER_TYPE_TO_TABLE) as [PickerType, CatalogTableName][]) {
    if (counts[table] !== undefined) continue;
    const file = type === "gear" ? "item" : type;
    counts[table] = catalogSnapshotScopes.reduce((total, scope) => total + (scope.categories[file] ?? 0), 0);
  }
  return counts;
}

export async function fetchCatalogItemById(category: PickerType, id: string, systemId = "pf2e"): Promise<PickerItem | null> {
  const { items } = await fetchCatalogCategory(category, { systemId });
  return items.find((item) => item.id === id) || null;
}

export function getCatalogSyncStatus(): CatalogSyncStatus {
  return { isConfigured: false, isOnline: typeof navigator === "undefined" ? true : navigator.onLine, source: "local_snapshot" };
}

/** Mantém listas grandes navegáveis sem montar milhares de cartões no DOM. */
export function paginateCatalogItems<T>(items: readonly T[], requestedPage: number, pageSize: number): { items: T[]; page: number; pageCount: number; total: number } {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page, pageCount, total };
}
