import type { PickerItem, PickerType, IRPGSystem, RPGSystemId } from "../types";
import { getSystemSkillItems } from "../data/systemSkills";
import { getSystemRuleItems } from "../data/systemRulesCatalog";
import { getSystemActionItems } from "../data/systemActions";
import { getSystemConditionItems } from "../data/systemConditions";
import { DND35_CLASSES } from "../data/dnd35/dnd35Classes";
import { DND35_SPELL_LISTS } from "../data/dnd35/dnd35SpellLists";
import { OSE_CLASSIC_CORE_CLASS_IDS } from "../data/ose/oseRules";
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
export type CatalogSource = "local_snapshot" | "local_runtime" | "local_mixed";
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
/** Sistemas com conteúdo catalogado, inclusive os que ainda não têm criador ativo. */
export const CATALOG_SYSTEM_IDS = [...new Set(catalogSnapshotScopes.map(({ systemId }) => systemId))].sort();
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
  const explicitNames = {
    en: text(record.name_en, nestedNames.en, data.name_en, data.nameEn),
    es: text(record.name_es, nestedNames.es, data.name_es),
  };
  const explicitSummaries = {
    en: text(record.description_en, nestedSummaries.en, data.summary_en, data.description_en),
    es: text(record.description_es, nestedSummaries.es, data.summary_es, data.description_es),
  };
  data.translationStatus = {
    names: {
      "pt-BR": Boolean(names["pt-BR"]),
      en: Boolean(explicitNames.en) || Boolean(names.en && names.en !== names["pt-BR"]),
      es: Boolean(explicitNames.es) || Boolean(names.es && names.es !== names["pt-BR"]),
    },
    summaries: {
      "pt-BR": Boolean(summaries["pt-BR"]),
      en: Boolean(explicitSummaries.en) || Boolean(summaries.en && summaries.en !== summaries["pt-BR"]),
      es: Boolean(explicitSummaries.es) || Boolean(summaries.es && summaries.es !== summaries["pt-BR"]),
    },
  };
  const systemId = record.system_id || "pf2e";
  data.systemId = systemId; data.system_id = systemId;
  const aliases: Record<string, string> = {
    level: "level", rank: "rank", hp_base: "hp", hp_per_level: "hpPerLevel", speed_feet: "speed", price: "price", bulk: "bulk",
    damage_dice: "damage", damage_type: "damageType", range_feet: "rangeFeet", reload: "reload", hands: "hands", weapon_group: "weaponGroup",
    weapon_category: "weaponCategory", ac_bonus: "acBonus", action_cost: "actionCost", action_type: "actionType", has_value: "hasValue",
    condition_group: "conditionGroup", prerequisite: "prerequisites", category: "category", ancestry_id: "ancestryId", class_id: "classId", archetype_id: "archetypeId",
    trained_skills: "trainedSkills", price_gp: "price",
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
  const usesOseAdvancedBase = (systemId === "all" || systemId === "ose")
    && (ruleset === "basico" || (category === "class" && ruleset === "classic"));
  const scopes = catalogSnapshotScopes.filter((scope) =>
    (systemId === "all" || scope.systemId === systemId)
    && (!ruleset || scope.ruleset === ruleset || (usesOseAdvancedBase && scope.systemId === "ose" && scope.ruleset === "advanced"))
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
  const rows = records.flat();
  if (!ruleset) return systemId === "ose" || systemId === "all" ? collapseIdenticalOseRulesetRows(rows) : rows;
  if (systemId !== "ose" && systemId !== "all") return rows;

  const scopedRows = category === "class" && ruleset === "classic"
    ? rows.filter((record) => record.ruleset === "classic" || (
      record.system_id === "ose" && record.ruleset === "advanced"
      && OSE_CLASSIC_CORE_CLASS_IDS.includes(String(record.data?.id) as typeof OSE_CLASSIC_CORE_CLASS_IDS[number])
    ))
    : ruleset === "basico"
      ? rows.filter((record) => record.system_id === "ose" && (record.ruleset === "advanced" || record.ruleset === "basico"))
      : null;

  if (!scopedRows) return rows;

  return scopedRows.map((record) => record.ruleset === ruleset
    ? record
    : { ...record, ruleset, data: { ...record.data, ruleset } });
}

function stableCatalogValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableCatalogValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, stableCatalogValue(item)]));
  }
  return value;
}

function oseRulesetContentSignature(record: CatalogItemRecord): string {
  const { id: _id, system_id: _systemId, ruleset: _ruleset, created_at: _createdAt, updated_at: _updatedAt, data, ...content } = record;
  const {
    id: _dataId,
    system_id: _dataSystemId,
    ruleset: _dataRuleset,
    availableRulesets: _availableRulesets,
    ...mechanics
  } = data || {};
  return JSON.stringify(stableCatalogValue({ ...content, data: mechanics }));
}

/** Agrupa conteúdo OSE literalmente idêntico no filtro agregado, preservando os modos aplicáveis. */
function collapseIdenticalOseRulesetRows(rows: CatalogItemRecord[]): CatalogItemRecord[] {
  const result: CatalogItemRecord[] = [];
  const indexesBySignature = new Map<string, number>();

  for (const record of rows) {
    if (record.system_id !== "ose") {
      result.push(record);
      continue;
    }

    const signature = oseRulesetContentSignature(record);
    const existingIndex = indexesBySignature.get(signature);
    if (existingIndex === undefined) {
      indexesBySignature.set(signature, result.length);
      const ruleset = String(record.data?.ruleset || record.ruleset);
      result.push({ ...record, data: { ...record.data, availableRulesets: [ruleset] } });
      continue;
    }

    const existing = result[existingIndex];
    const ruleset = String(record.data?.ruleset || record.ruleset);
    const availableRulesets = [...new Set([
      ...(Array.isArray(existing.data?.availableRulesets) ? existing.data.availableRulesets.map(String) : []),
      ruleset,
    ])].sort((left, right) => left.localeCompare(right));
    result[existingIndex] = { ...existing, data: { ...existing.data, availableRulesets } };
  }

  return result;
}

/** Listas do Livro do Jogador já transcritas: não preencher classes/níveis ainda ausentes. */
function dnd35CoreSpellRows(): CatalogItemRecord[] {
  return DND35_SPELL_LISTS.flatMap((list) => list.entries.map((spell) => {
    const sourcePage = Number(list.sourcePage.split("-")[0]);
    const spellClasses = list.classIds.map((classId) => DND35_CLASSES[classId]).filter(Boolean);
    const slug = spell.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return {
      id: `dnd35.phb.spell.${list.listId}.${list.spellLevel}.${slug}`,
      system_id: "dnd35",
      name_pt: spell.name,
      description_pt: spell.summary,
      rarity: "common",
      ruleset: "v35",
      source_book: "D&D 3.5 — Livro do Jogador",
      source_page: sourcePage,
      traits: [],
      data: {
        listId: list.listId,
        classIds: list.classIds,
        classId: list.classIds.length === 1 ? list.classIds[0] : undefined,
        spellClasses: {
          "pt-BR": spellClasses.map((classInfo) => classInfo.name),
          en: spellClasses.map((classInfo) => classInfo.nameEn),
        },
        spellLevel: list.spellLevel,
        level: list.spellLevel,
        school: spell.school,
        spellFlags: spell.flags,
        components: spell.flags.join(", "),
        sourcePageRange: list.sourcePage,
        sourcePage,
      },
    };
  }));
}

const CORE_SYSTEM_IDS = ["t20", "dnd5e", "ose", "pf1e"] as const;
function localRuntimeItems(category: PickerType, systemId: string, ruleset: string | undefined, hasSnapshotRecords: boolean): PickerItem[] {
  if (category === "spell" && (!ruleset || ruleset === "v35") && (systemId === "dnd35" || systemId === "all")) {
    return dnd35CoreSpellRows().map((record) => normalizeCatalogRecordToPickerItem(record, category));
  }
  if (category === "rule") return systemId === "all" ? CORE_SYSTEM_IDS.flatMap((id) => getSystemRuleItems(id, ruleset)) : getSystemRuleItems(systemId, ruleset);
  if (category === "skill" && !hasSnapshotRecords) return getSystemSkillItems(systemId, ruleset);
  if (category === "action" && !hasSnapshotRecords) return getSystemActionItems(systemId, ruleset);
  if (category === "condition" && !hasSnapshotRecords) return getSystemConditionItems(systemId);
  return [];
}

export async function fetchCatalogCategory(category: PickerType, options: { limit?: number; systemId?: string; ruleset?: CatalogRuleset } = {}): Promise<{ items: PickerItem[]; source: CatalogSource }> {
  const systemId = options.systemId ?? "pf2e";
  const records = await snapshotRowsFor(category, systemId, options.ruleset);
  const snapshotItems = records.map((record) => normalizeCatalogRecordToPickerItem(record, category));
  const runtimeItems = localRuntimeItems(category, systemId, options.ruleset, records.length > 0);
  const items = [...snapshotItems, ...runtimeItems];
  const source: CatalogSource = snapshotItems.length && runtimeItems.length
    ? "local_mixed"
    : snapshotItems.length ? "local_snapshot" : "local_runtime";
  return { items: options.limit ? items.slice(0, options.limit) : items, source };
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

export interface CatalogLocalMetrics {
  counts: Record<CatalogTableName, number>;
  verifiedCount: number;
  reviewCount: number;
}

let catalogLocalMetricsPromise: Promise<CatalogLocalMetrics> | undefined;

/** Reutiliza o cálculo porque os snapshots versionados não mudam durante a sessão. */
export function fetchCatalogLocalMetrics(): Promise<CatalogLocalMetrics> {
  if (!catalogLocalMetricsPromise) {
    const pending = calculateCatalogLocalMetrics();
    catalogLocalMetricsPromise = pending;
    void pending.catch(() => {
      if (catalogLocalMetricsPromise === pending) catalogLocalMetricsPromise = undefined;
    });
  }
  return catalogLocalMetricsPromise;
}

async function calculateCatalogLocalMetrics(): Promise<CatalogLocalMetrics> {
  const counts = await fetchCatalogTableCounts();
  counts.catalog_spells += dnd35CoreSpellRows().length;
  const categories = [...new Map(
    Object.entries(PICKER_TYPE_TO_TABLE).map(([category, table]) => [table, category as PickerType]),
  ).values()];
  const rowsByCategory = await Promise.all(categories.map((category) => snapshotRowsFor(category, "all")));
  const reviewCount = rowsByCategory.flat().filter((record) =>
    record.ruleset === "needs_review" || record.data?.needs_review === true,
  ).length;
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  return { counts, verifiedCount: Math.max(0, total - reviewCount), reviewCount };
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
