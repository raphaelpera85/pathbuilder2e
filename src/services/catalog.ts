import type { PickerItem, PickerType, IRPGSystem, RPGSystemId } from "../types";
import { getSystemSkillItems } from "../data/systemSkills";
import { getSystemRuleItems } from "../data/systemRulesCatalog";
import { getSystemActionItems } from "../data/systemActions";
import { getSystemConditionItems } from "../data/systemConditions";
import systemsSnapshot from "../data/catalog/snapshots/systems.json";

/** Snapshot versionado: `node scripts/export-catalog-snapshot.mjs` o atualiza. */
const snapshotModules = import.meta.glob("../data/catalog/snapshots/*/*/*.json", { eager: true, import: "default" }) as Record<string, CatalogItemRecord[]>;

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
export async function fetchCatalogSystems(): Promise<IRPGSystem[]> { return DEFAULT_RPG_SYSTEMS.filter((system) => system.active); }

/** Converte uma linha do snapshot PostgreSQL no formato consumido pela UI. */
export function normalizeSupabaseRecordToPickerItem(record: CatalogItemRecord, category: PickerType): PickerItem {
  const names = { "pt-BR": record.name_pt || String(record.name || ""), en: record.name_en || String(record.name || ""), es: record.name_es || record.name_pt || String(record.name || "") };
  const summaries = { "pt-BR": record.description_pt || String(record.description || ""), en: record.description_en || record.description_pt || String(record.description || ""), es: record.description_es || record.description_pt || String(record.description || "") };
  const data: Record<string, unknown> = { ...(record.data || {}) };
  const systemId = record.system_id || "pf2e";
  data.systemId = systemId; data.system_id = systemId;
  const aliases: Record<string, string> = {
    level: "level", rank: "rank", hp_base: "hp", hp_per_level: "hpPerLevel", speed_feet: "speed", price: "price", bulk: "bulk",
    damage_dice: "damage", damage_type: "damageType", range_feet: "rangeFeet", reload: "reload", hands: "hands", weapon_group: "weaponGroup",
    weapon_category: "weaponCategory", ac_bonus: "acBonus", action_cost: "actionCost", action_type: "actionType", has_value: "hasValue",
    condition_group: "conditionGroup", prerequisite: "prerequisites", category: "category", ancestry_id: "ancestryId", class_id: "classId", archetype_id: "archetypeId",
  };
  for (const [dbKey, itemKey] of Object.entries(aliases)) if (record[dbKey] != null) data[itemKey] = record[dbKey];
  if (record.range_feet != null) data.range = record.range_feet;
  data.rarity = record.rarity || "common"; data.ruleset = record.ruleset || "remaster"; data.traits = Array.isArray(record.traits) ? record.traits : [];
  data.source = { book: record.source_book || undefined, page: record.source_page || undefined };
  data.names = names; data.name = names["pt-BR"]; data.summaries = summaries; data.id = record.id;
  return { id: record.id, name: record.name_pt || String(record.name || record.id), type: category, data, summary: summaries["pt-BR"] || summaries.en || "", category, rarity: record.rarity || "common", system_id: systemId };
}

function snapshotRowsFor(category: PickerType): CatalogItemRecord[] {
  const file = category === "gear" ? "item" : category;
  return Object.entries(snapshotModules).filter(([path]) => path.endsWith(`/${file}.json`)).flatMap(([, rows]) => Array.isArray(rows) ? rows : []);
}

const CORE_SYSTEM_IDS = ["t20", "dnd5e", "ose"] as const;
function localRuntimeItems(category: PickerType, systemId: string, ruleset?: string): PickerItem[] {
  if (category === "rule") return systemId === "all" ? CORE_SYSTEM_IDS.flatMap((id) => getSystemRuleItems(id, ruleset)) : getSystemRuleItems(systemId, ruleset);
  if (category === "skill" && snapshotRowsFor(category).length === 0) return getSystemSkillItems(systemId, ruleset);
  if (category === "action" && snapshotRowsFor(category).length === 0) return getSystemActionItems(systemId, ruleset);
  if (category === "condition" && snapshotRowsFor(category).length === 0) return getSystemConditionItems(systemId);
  return [];
}

export async function fetchCatalogCategory(category: PickerType, options: { forceRemote?: boolean; limit?: number; systemId?: string; ruleset?: CatalogRuleset } = {}): Promise<{ items: PickerItem[]; source: CatalogSource }> {
  const systemId = options.systemId ?? "pf2e";
  const records = snapshotRowsFor(category).filter((record) => (systemId === "all" || (record.system_id || "pf2e") === systemId) && (!options.ruleset || record.ruleset === options.ruleset));
  if (records.length) {
    const items = records.map((record) => normalizeSupabaseRecordToPickerItem(record, category));
    return { items: options.limit ? items.slice(0, options.limit) : items, source: "local_snapshot" };
  }
  return { items: localRuntimeItems(category, systemId, options.ruleset), source: "local_runtime" };
}

export async function fetchAllCatalogCategories(systemId = "pf2e", ruleset?: CatalogRuleset): Promise<Record<PickerType, PickerItem[]>> {
  const categories: PickerType[] = ["ancestry", "heritage", "class", "subclass", "background", "archetype", "skill", "rule", "spell", "ritual", "feat", "item", "weapon", "armor", "shield", "formula", "pet", "action", "condition", "buff"];
  const values = await Promise.all(categories.map((category) => fetchCatalogCategory(category, { systemId, ruleset })));
  return Object.fromEntries(categories.map((category, index) => [category, values[index].items])) as Record<PickerType, PickerItem[]>;
}

export async function fetchCatalogTableCounts(): Promise<Record<CatalogTableName, number>> {
  const counts = {} as Record<CatalogTableName, number>;
  for (const [type, table] of Object.entries(PICKER_TYPE_TO_TABLE) as [PickerType, CatalogTableName][]) if (counts[table] === undefined) counts[table] = snapshotRowsFor(type).length;
  return counts;
}

export async function fetchCatalogItemById(category: PickerType, id: string, systemId = "pf2e"): Promise<PickerItem | null> {
  const { items } = await fetchCatalogCategory(category, { systemId });
  return items.find((item) => item.id === id) || null;
}

export function getCatalogSyncStatus(): CatalogSyncStatus {
  return { isConfigured: false, isOnline: typeof navigator === "undefined" ? true : navigator.onLine, source: "local_snapshot" };
}
