import type { CharacterData, CloudCharacter } from "./characters";

/**
 * Fila offline e resolução de conflitos da sincronização de fichas.
 *
 * O módulo concentra a parte determinística do autosave (fila por personagem,
 * backoff, revisão conhecida da nuvem e merge semântico) para que a mesma
 * regra seja exercitada por testes com relógio injetável, sem depender de
 * React, de rede ou de um Supabase real. O `AccountPortal` apenas reage ao
 * resultado.
 */

/** Relógio injetável: os testes substituem `now` para provar janelas de backoff. */
export const syncClock = { now: (): number => Date.now() };

const QUEUE_PREFIX = "pf2e_pending_cloud_saves_v2_";
/** Chave antiga (uma única ficha por conta); lida apenas para migração. */
const LEGACY_QUEUE_PREFIX = "pf2e_pending_cloud_save_";
const REVISION_PREFIX = "pf2e_cloud_revision_";

export interface PendingCloudSave {
  characterKey: string;
  snapshot: CharacterData;
  queuedAt: string;
  attempt: number;
  lastAttemptAt: number;
  baseUpdatedAt?: string;
}

export interface RememberedRevision {
  userId: string;
  characterKey: string;
  updatedAt: string;
  name: string;
  level: number;
  data: Record<string, unknown>;
}

export interface CharacterMergeConflict {
  path: string;
  resolution: "local" | "remote" | "union" | "preserved-both";
  localValue?: unknown;
  remoteValue?: unknown;
}

export interface CharacterMergeResult {
  document: Record<string, unknown>;
  conflicts: CharacterMergeConflict[];
  strategy: "three-way" | "union";
  preservedRemoteCollections: string[];
}

/** Coleções com identidade estável (id/nome) que podem ser unidas sem perda. */
const COLLECTION_KEYS = new Set([
  "weapons",
  "armors",
  "armour",
  "shields",
  "items",
  "inventory",
  "equipment",
  "containers",
  "formulas",
  "spells",
  "cantrips",
  "focusSpells",
  "innateSpells",
  "ritualSpells",
  "rituals",
  "feats",
  "classFeats",
  "ancestryFeats",
  "heritageFeats",
  "skillFeats",
  "generalFeats",
  "archetypeFeats",
  "pets",
  "companions",
  "eidolons",
  "actions",
  "conditions",
  "buffs",
  "loreSkills",
  "skillIncreases",
  "notes",
  "archetypes",
  "attackBonuses",
]);

/** Coleções que apenas crescem; nunca são aparadas pelo merge. */
const HISTORY_KEY = "history";
const DICE_HISTORY_KEY = "diceHistory";
const HISTORY_LIMIT = 50;
const DICE_HISTORY_LIMIT = 100;

function queueKey(userId: string): string {
  return `${QUEUE_PREFIX}${userId}`;
}

function legacyQueueKey(userId: string): string {
  return `${LEGACY_QUEUE_PREFIX}${userId}`;
}

function revisionKey(userId: string): string {
  return `${REVISION_PREFIX}${userId}`;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Armazenamento indisponível: a fila em memória e o retry imediato
    // continuam funcionando enquanto a aba estiver aberta.
  }
}

export function backoffDelayMs(attempt: number): number {
  const safeAttempt = Number.isFinite(attempt) ? Math.max(0, Math.floor(attempt)) : 0;
  return Math.min(30_000, 1_000 * 2 ** Math.min(safeAttempt, 5));
}

function isPendingEntry(value: unknown): value is PendingCloudSave {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<PendingCloudSave>;
  return typeof entry.characterKey === "string"
    && entry.characterKey.trim().length > 0
    && Boolean(entry.snapshot)
    && typeof entry.snapshot === "object";
}

export function readPendingSaves(userId: string): Record<string, PendingCloudSave> {
  const raw = readJson<Record<string, unknown>>(queueKey(userId), {});
  const entries: Record<string, PendingCloudSave> = {};
  for (const [key, value] of Object.entries(raw || {})) {
    if (!isPendingEntry(value)) continue;
    entries[key] = {
      characterKey: value.characterKey,
      snapshot: value.snapshot,
      queuedAt: typeof value.queuedAt === "string" ? value.queuedAt : new Date(syncClock.now()).toISOString(),
      attempt: Number.isFinite(value.attempt) ? Number(value.attempt) : 0,
      lastAttemptAt: Number.isFinite(value.lastAttemptAt) ? Number(value.lastAttemptAt) : 0,
      baseUpdatedAt: typeof value.baseUpdatedAt === "string" ? value.baseUpdatedAt : undefined,
    };
  }
  return entries;
}

function writePendingSaves(userId: string, entries: Record<string, PendingCloudSave>): void {
  if (Object.keys(entries).length === 0) {
    try {
      localStorage.removeItem(queueKey(userId));
    } catch {
      // ignore
    }
    return;
  }
  writeJson(queueKey(userId), entries);
}

export function listPendingSaves(userId: string): PendingCloudSave[] {
  return Object.values(readPendingSaves(userId));
}

export function pendingSaveCount(userId: string): number {
  return listPendingSaves(userId).length;
}

export function isPendingSaveDue(entry: PendingCloudSave, now = syncClock.now()): boolean {
  if (!entry.lastAttemptAt) return true;
  return now - entry.lastAttemptAt >= backoffDelayMs(entry.attempt);
}

export function duePendingSaves(userId: string, now = syncClock.now()): PendingCloudSave[] {
  return listPendingSaves(userId).filter((entry) => isPendingSaveDue(entry, now));
}

export function upsertPendingSave(
  userId: string,
  input: { characterKey: string; snapshot: CharacterData; baseUpdatedAt?: string },
): PendingCloudSave {
  const entries = readPendingSaves(userId);
  const previous = entries[input.characterKey];
  const entry: PendingCloudSave = {
    characterKey: input.characterKey,
    snapshot: input.snapshot,
    queuedAt: new Date(syncClock.now()).toISOString(),
    // Uma alteração nova reinicia o backoff: ela ainda não foi tentada.
    attempt: 0,
    lastAttemptAt: 0,
    baseUpdatedAt: input.baseUpdatedAt ?? previous?.baseUpdatedAt,
  };
  entries[input.characterKey] = entry;
  writePendingSaves(userId, entries);
  return entry;
}

export function markPendingSaveAttempt(
  userId: string,
  characterKey: string,
  attempt: number,
  at = syncClock.now(),
): PendingCloudSave | null {
  const entries = readPendingSaves(userId);
  const current = entries[characterKey];
  if (!current) return null;
  const next: PendingCloudSave = { ...current, attempt, lastAttemptAt: at };
  entries[characterKey] = next;
  writePendingSaves(userId, entries);
  return next;
}

export function removePendingSave(userId: string, characterKey: string): void {
  const entries = readPendingSaves(userId);
  if (!(characterKey in entries)) return;
  delete entries[characterKey];
  writePendingSaves(userId, entries);
}

/**
 * A fila anterior guardava um único snapshot por conta. Ao encontrar esse
 * formato, ele é movido para a fila por personagem em vez de ser descartado.
 */
export function migrateLegacyPendingSave(userId: string): PendingCloudSave | null {
  const raw = readJson<Record<string, unknown> | null>(legacyQueueKey(userId), null);
  if (!raw || typeof raw !== "object") return null;
  const snapshot = raw as CharacterData;
  const characterKey = typeof snapshot.id === "string" && snapshot.id.trim()
    ? snapshot.id.trim()
    : `legacy_${userId}`;
  const entry = upsertPendingSave(userId, { characterKey, snapshot });
  try {
    localStorage.removeItem(legacyQueueKey(userId));
  } catch {
    // ignore
  }
  return entry;
}

// ---------------------------------------------------------------------------
// Revisão conhecida da nuvem (base para o merge de três vias)
// ---------------------------------------------------------------------------

/** Base completa por sessão: evita gravar documentos grandes no localStorage. */
const revisionCache = new Map<string, RememberedRevision>();

function revisionCacheKey(userId: string, characterKey: string): string {
  return `${userId}::${characterKey}`;
}

function readRevisionIndex(userId: string): Record<string, string> {
  return readJson<Record<string, string>>(revisionKey(userId), {});
}

/** Registra a última versão conhecida da nuvem para detectar conflito depois. */
export function rememberCloudRevision(
  userId: string,
  character: Pick<CloudCharacter, "character_key" | "updated_at" | "name" | "level" | "data"> & { id?: string },
): void {
  const characterKey = character.character_key || character.id || "";
  if (!userId || !characterKey) return;
  const updatedAt = typeof character.updated_at === "string" ? character.updated_at : "";
  const data = (character.data || {}) as Record<string, unknown>;
  revisionCache.set(revisionCacheKey(userId, characterKey), {
    userId,
    characterKey,
    updatedAt,
    name: typeof character.name === "string" ? character.name : "",
    level: Number(character.level) || 1,
    data: structuredClone(data),
  });
  if (!updatedAt) return;
  const index = readRevisionIndex(userId);
  if (index[characterKey] === updatedAt) return;
  index[characterKey] = updatedAt;
  writeJson(revisionKey(userId), index);
}

export function readCloudRevision(userId: string, characterKey: string): RememberedRevision | null {
  return revisionCache.get(revisionCacheKey(userId, characterKey)) || null;
}

/** Última data de atualização remota conhecida, mesmo após recarregar a página. */
export function readKnownRemoteUpdatedAt(userId: string, characterKey: string): string | undefined {
  const cached = readCloudRevision(userId, characterKey);
  if (cached?.updatedAt) return cached.updatedAt;
  const index = readRevisionIndex(userId);
  return index[characterKey] || undefined;
}

export function forgetCloudRevision(userId: string, characterKey: string): void {
  revisionCache.delete(revisionCacheKey(userId, characterKey));
  const index = readRevisionIndex(userId);
  if (characterKey in index) {
    delete index[characterKey];
    writeJson(revisionKey(userId), index);
  }
}

// ---------------------------------------------------------------------------
// Merge semântico
// ---------------------------------------------------------------------------

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, child]) => child !== undefined)
    .sort(([a], [b]) => a.localeCompare(b));
  return `{${entries.map(([key, child]) => `${JSON.stringify(key)}:${stableStringify(child)}`).join(",")}}`;
}

function deepEqual(left: unknown, right: unknown): boolean {
  return stableStringify(left) === stableStringify(right);
}

function entryIdentity(entry: unknown): string {
  if (isPlainObject(entry)) {
    for (const field of ["id", "key", "slug", "name"]) {
      const value = entry[field];
      if (typeof value === "string" && value.trim()) {
        return `${field}:${value.trim().toLocaleLowerCase()}`;
      }
      if (typeof value === "number" && Number.isFinite(value)) {
        return `${field}:${value}`;
      }
    }
  }
  return `value:${stableStringify(entry)}`;
}

function indexByEntryIdentity(list: unknown[]): Map<string, { entry: unknown; index: number }> {
  const indexed = new Map<string, { entry: unknown; index: number }>();
  list.forEach((entry, index) => {
    const identity = entryIdentity(entry);
    if (!indexed.has(identity)) indexed.set(identity, { entry, index });
  });
  return indexed;
}

function mergeHistoryLists(local: unknown[], remote: unknown[], limit: number): unknown[] {
  // Históricos são identificados pela data do snapshot: duas entradas com o
  // mesmo nome em datas diferentes são versões distintas, não duplicatas.
  const identityOf = (entry: unknown): string => {
    if (isPlainObject(entry)) {
      const savedAt = entry.savedAt;
      if (typeof savedAt === "string" && savedAt.trim()) return `savedAt:${savedAt}`;
      const time = entry.time;
      if (typeof time === "string" && time.trim()) {
        return `time:${time}:${stableStringify({ formula: entry.formula, total: entry.total })}`;
      }
    }
    return `value:${stableStringify(entry)}`;
  };
  const merged: unknown[] = [];
  const seen = new Set<string>();
  for (const entry of [...local, ...remote]) {
    const identity = identityOf(entry);
    if (seen.has(identity)) continue;
    seen.add(identity);
    merged.push(entry);
  }
  // Ordena do mais recente para o mais antigo quando a data está disponível;
  // entradas sem data preservam a ordem de chegada.
  return merged
    .map((entry, index) => ({ entry, index, at: Date.parse(String((entry as any)?.savedAt ?? (entry as any)?.time ?? "")) }))
    .sort((a, b) => {
      const left = Number.isFinite(a.at) ? a.at : -1;
      const right = Number.isFinite(b.at) ? b.at : -1;
      if (left === right) return a.index - b.index;
      return right - left;
    })
    .slice(0, limit)
    .map((item) => item.entry);
}

function mergeCollections(
  path: string,
  local: unknown[],
  remote: unknown[],
  base: unknown[] | undefined,
  conflicts: CharacterMergeConflict[],
  preservedRemoteCollections: Set<string>,
): unknown[] {
  if (path === HISTORY_KEY || path === DICE_HISTORY_KEY) {
    const limit = path === HISTORY_KEY ? HISTORY_LIMIT : DICE_HISTORY_LIMIT;
    return mergeHistoryLists(local, remote, limit);
  }
  const localIndex = indexByEntryIdentity(local);
  const remoteIndex = indexByEntryIdentity(remote);
  const baseIndex = base ? indexByEntryIdentity(base) : null;
  const result: unknown[] = [];
  const used = new Set<string>();

  const push = (identity: string, entry: unknown) => {
    if (used.has(identity)) return;
    used.add(identity);
    result.push(entry);
  };

  // 1. Ordem estável a partir da base (ou do local quando não há base).
  for (const reference of base || local) {
    const identity = entryIdentity(reference);
    const inLocal = localIndex.get(identity);
    const inRemote = remoteIndex.get(identity);
    if (!inLocal && !inRemote) continue;
    if (inLocal && inRemote) {
      const localUnchanged = !baseIndex || deepEqual(inLocal.entry, baseIndex.get(identity)?.entry);
      const remoteUnchanged = !baseIndex || deepEqual(inRemote.entry, baseIndex.get(identity)?.entry);
      if (localUnchanged && !remoteUnchanged) {
        push(identity, inRemote.entry);
      } else if (!localUnchanged && !remoteUnchanged && !deepEqual(inLocal.entry, inRemote.entry)) {
        conflicts.push({ path: `${path}[${identity}]`, resolution: "preserved-both", localValue: inLocal.entry, remoteValue: inRemote.entry });
        preservedRemoteCollections.add(path);
        push(identity, inLocal.entry);
      } else {
        push(identity, inLocal.entry);
      }
      continue;
    }
    if (inLocal && baseIndex?.has(identity) && !inRemote) {
      // Removido remotamente: aceita a remoção apenas se o item não foi
      // alterado localmente; caso contrário preserva e registra o conflito.
      used.add(identity);
      if (deepEqual(inLocal.entry, baseIndex.get(identity)?.entry)) continue;
      conflicts.push({ path: `${path}[${identity}]`, resolution: "local", localValue: inLocal.entry });
      push(identity, inLocal.entry);
      continue;
    }
    if (inRemote && baseIndex?.has(identity) && !inLocal) {
      used.add(identity);
      if (deepEqual(inRemote.entry, baseIndex.get(identity)?.entry)) continue;
      conflicts.push({ path: `${path}[${identity}]`, resolution: "remote", remoteValue: inRemote.entry });
      push(identity, inRemote.entry);
      continue;
    }
    push(identity, (inLocal || inRemote)!.entry);
  }

  // 2. Inclusões locais que não existiam na base.
  for (const [identity, item] of localIndex) {
    if (used.has(identity)) continue;
    if (remoteIndex.has(identity)) {
      const remoteEntry = remoteIndex.get(identity)!.entry;
      if (!deepEqual(item.entry, remoteEntry)) {
        conflicts.push({ path: `${path}[${identity}]`, resolution: "preserved-both", localValue: item.entry, remoteValue: remoteEntry });
        preservedRemoteCollections.add(path);
      }
      push(identity, item.entry);
      continue;
    }
    push(identity, item.entry);
  }

  // 3. Inclusões remotas que este dispositivo ainda não conhecia: preservadas.
  for (const [identity, item] of remoteIndex) {
    if (used.has(identity)) continue;
    preservedRemoteCollections.add(path);
    push(identity, item.entry);
  }

  return result;
}

function mergeObjects(
  path: string,
  local: Record<string, unknown>,
  remote: Record<string, unknown>,
  base: Record<string, unknown> | undefined,
  conflicts: CharacterMergeConflict[],
  preservedRemoteCollections: Set<string>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const keys = new Set([...Object.keys(local), ...Object.keys(remote)]);
  if (base) for (const key of Object.keys(base)) keys.add(key);

  for (const key of keys) {
    const childPath = path ? `${path}.${key}` : key;
    const hasLocal = Object.prototype.hasOwnProperty.call(local, key);
    const hasRemote = Object.prototype.hasOwnProperty.call(remote, key);
    const hasBase = Boolean(base && Object.prototype.hasOwnProperty.call(base, key));
    const localValue = local[key];
    const remoteValue = remote[key];
    const baseValue = base ? base[key] : undefined;

    if (!hasLocal && !hasRemote) continue;

    if (!hasLocal) {
      if (!hasBase) {
        preservedRemoteCollections.add(childPath);
        result[key] = remoteValue;
        continue;
      }
      if (deepEqual(remoteValue, baseValue)) {
        // Excluído localmente e inalterado na nuvem: a exclusão prevalece.
        continue;
      }
      conflicts.push({ path: childPath, resolution: "remote", remoteValue });
      preservedRemoteCollections.add(childPath);
      result[key] = remoteValue;
      continue;
    }

    if (!hasRemote) {
      if (!hasBase) {
        result[key] = localValue;
        continue;
      }
      if (deepEqual(localValue, baseValue)) {
        // Excluído na nuvem e inalterado localmente: aceita a exclusão remota.
        continue;
      }
      conflicts.push({ path: childPath, resolution: "local", localValue });
      result[key] = localValue;
      continue;
    }

    if (isPlainObject(localValue) && isPlainObject(remoteValue)) {
      result[key] = mergeObjects(
        childPath,
        localValue,
        remoteValue,
        isPlainObject(baseValue) ? baseValue : undefined,
        conflicts,
        preservedRemoteCollections,
      );
      continue;
    }

    if (Array.isArray(localValue) && Array.isArray(remoteValue)) {
      result[key] = mergeCollections(
        childPath,
        localValue,
        remoteValue,
        Array.isArray(baseValue) ? baseValue : undefined,
        conflicts,
        preservedRemoteCollections,
      );
      continue;
    }

    if (deepEqual(localValue, remoteValue)) {
      result[key] = localValue;
      continue;
    }

    const localUnchanged = hasBase && deepEqual(localValue, baseValue);
    const remoteUnchanged = hasBase && deepEqual(remoteValue, baseValue);
    if (localUnchanged && !remoteUnchanged) {
      result[key] = remoteValue;
      continue;
    }
    if (remoteUnchanged && !localUnchanged) {
      result[key] = localValue;
      continue;
    }
    // Conflito real (ou ausência de base): a sessão ativa prevalece, mas o
    // valor remoto fica registrado para restauração pelo histórico.
    conflicts.push({ path: childPath, resolution: "local", localValue, remoteValue });
    result[key] = localValue;
  }

  return result;
}

/**
 * Merge semântico entre a ficha local e a versão da nuvem.
 *
 * - Com `base` (última revisão conhecida deste dispositivo), faz merge de três
 *   vias: alterações remotas não tocadas localmente são aceitas, alterações
 *   simultâneas ficam registradas como conflito e a sessão ativa prevalece.
 * - Sem `base`, coleções são unidas por identidade (nada do outro dispositivo
 *   é descartado), escalares divergentes ficam registrados como conflito e a
 *   sessão ativa prevalece.
 */
export function mergeCharacterDocuments(
  local: Record<string, unknown>,
  remote: Record<string, unknown>,
  base?: Record<string, unknown>,
): CharacterMergeResult {
  const conflicts: CharacterMergeConflict[] = [];
  const preservedRemoteCollections = new Set<string>();
  const document = mergeObjects(
    "",
    structuredClone(local),
    structuredClone(remote),
    base ? structuredClone(base) : undefined,
    conflicts,
    preservedRemoteCollections,
  );
  return {
    document,
    conflicts,
    strategy: base ? "three-way" : "union",
    preservedRemoteCollections: Array.from(preservedRemoteCollections).sort(),
  };
}

/** Indica se o merge preservou algo que existia apenas na nuvem. */
export function mergePreservedRemoteData(result: CharacterMergeResult): boolean {
  return result.preservedRemoteCollections.length > 0
    || result.conflicts.some((conflict) => conflict.resolution !== "local");
}
