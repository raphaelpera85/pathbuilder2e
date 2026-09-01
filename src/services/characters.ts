import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";
import { withRequestTimeout } from "./requestTimeout";

export interface CharacterData extends Record<string, unknown> {
  id: string;
  name: string;
  level: number;
  ruleset?: "remaster" | "legacy" | "both" | "needs_review";
  gmEmail?: string;
  gm_email?: string;
  playerName?: string;
  playerEmail?: string;
  history?: CharacterRevision[];
}

export interface CharacterRevision {
  savedAt: string;
  name: string;
  level: number;
  data: Record<string, unknown>;
}

type RemoteRevisionRow = {
  character_id: string;
  saved_at: string;
  name: string;
  level: number;
  data: Record<string, unknown>;
};

async function hydrateRemoteHistory(
  characters: CloudCharacter[],
  userId: string,
): Promise<CloudCharacter[]> {
  if (!isSupabaseConfigured || !supabase || characters.length === 0) return characters;
  try {
    const { data, error } = await withRequestTimeout(
      supabase
        .from("character_revisions")
        .select("character_id,saved_at,name,level,data")
        .eq("user_id", userId)
        .order("saved_at", { ascending: false }),
      8_000,
      "O histórico remoto demorou para responder.",
    );
    if (error || !data) {
      if (error) console.warn("Supabase character revisions query aviso:", error.message);
      return characters;
    }
    const revisionsByCharacter = new Map<string, CharacterRevision[]>();
    for (const row of data as RemoteRevisionRow[]) {
      const revision: CharacterRevision = {
        savedAt: row.saved_at,
        name: row.name,
        level: Number(row.level),
        data: structuredClone(row.data || {}),
      };
      const list = revisionsByCharacter.get(row.character_id) || [];
      if (list.length < 50) list.push(revision);
      revisionsByCharacter.set(row.character_id, list);
    }
    return characters.map((character) => {
      const remoteHistory = revisionsByCharacter.get(character.id) || [];
      if (!remoteHistory.length) return character;
      const embedded = Array.isArray(character.data?.history) ? character.data.history : [];
      const history = [...remoteHistory, ...embedded]
        .filter((revision, index, list) => list.findIndex((candidate) =>
          candidate.savedAt === revision.savedAt && candidate.name === revision.name,
        ) === index)
        .slice(0, 50);
      return { ...character, data: { ...character.data, history } };
    });
  } catch (err) {
    // A deployment may have characters before applying the optional history
    // migration. The embedded/local history remains the source of truth then.
    console.warn("Supabase character revisions fallback:", err);
    return characters;
  }
}

async function persistRemoteRevision(
  characterRow: CloudCharacter,
  revision: CharacterRevision | undefined,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase || !revision) return;
  const { error } = await withRequestTimeout(
    supabase.from("character_revisions").insert({
      character_id: characterRow.id,
      user_id: characterRow.user_id,
      saved_at: revision.savedAt,
      name: revision.name,
      level: revision.level,
      data: revision.data,
    }),
    8_000,
    "O histórico remoto demorou para responder.",
  );
  if (error) console.warn("Supabase character revision aviso:", error.message);
}

export type CharacterRuleset = "remaster" | "legacy" | "both" | "needs_review";

/** Normaliza valores antigos/localizados antes de enviá-los ao check do banco. */
export function normalizeCharacterRuleset(value: unknown): CharacterRuleset {
  const raw = String(value ?? "").trim().toLocaleLowerCase();
  if (raw === "remaster" || raw.includes("remaster")) return "remaster";
  if (raw === "legacy" || raw.includes("classic") || raw.includes("clássic") || raw.includes("classico")) return "legacy";
  if (raw === "both" || raw.includes("custom") || raw.includes("variant") || raw.includes("variante") || raw.includes("hybrid") || raw.includes("híbrida") || raw.includes("hibrida")) return "both";
  return "needs_review";
}

export interface CloudCharacter {
  id: string;
  user_id: string;
  character_key: string;
  name: string;
  level: number;
  ruleset: "remaster" | "legacy" | "both" | "needs_review";
  gm_email?: string | null;
  player_name?: string | null;
  player_email?: string | null;
  data: CharacterData;
  created_at: string;
  updated_at: string;
}

export function validateCharacter(value: unknown): CharacterData {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("A ficha precisa ser um objeto JSON válido.");
  }
  const visit = (entry: unknown, depth = 0): void => {
    if (!entry || typeof entry !== "object") return;
    if (depth > 12) throw new Error("A ficha contém dados aninhados demais.");
    for (const [key, child] of Object.entries(entry)) {
      if (key === "__proto__" || key === "prototype" || key === "constructor") {
        throw new Error("A ficha contém uma chave não permitida.");
      }
      visit(child, depth + 1);
    }
  };
  visit(value);
  const candidate = value as Partial<CharacterData>;
  if (typeof candidate.name !== "string" || !candidate.name.trim()) {
    throw new Error("A ficha precisa ter um nome.");
  }
  const level = Number(candidate.level);
  if (!Number.isInteger(level) || level < 1 || level > 20) {
    throw new Error("O nível da ficha deve estar entre 1 e 20.");
  }
  const serialized = JSON.stringify(candidate);
  if (serialized.length > 1_000_000) {
    throw new Error("A ficha excede o limite de 1 MB.");
  }
  return {
    ...structuredClone(candidate),
    id: typeof candidate.id === "string" && candidate.id.trim()
      ? candidate.id.trim()
      : `personagem_${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID().slice(0, 8) : Date.now()}`,
    name: candidate.name.trim(),
    level,
    ruleset: normalizeCharacterRuleset(candidate.ruleset),
    gmEmail: typeof candidate.gmEmail === "string" ? candidate.gmEmail.trim() : (typeof candidate.gm_email === "string" ? candidate.gm_email.trim() : undefined),
  } as CharacterData;
}

export function toCharacterPayload(character: CharacterData, user: { id: string; email?: string; username?: string }) {
  const ruleset = normalizeCharacterRuleset(character.ruleset);
  const gmEmail = (typeof character.gmEmail === "string" && character.gmEmail.trim()) ||
                  (typeof character.gm_email === "string" && character.gm_email.trim()) ||
                  null;
  return {
    user_id: user.id,
    character_key: character.id,
    name: character.name,
    level: character.level,
    ruleset,
    gm_email: gmEmail,
    player_email: user.email ?? null,
    player_name: user.username ?? null,
    data: character,
  };
}

/** Mantém um histórico curto de versões sem aninhar históricos anteriores. */
export function buildCharacterRevisionHistory(
  character: CharacterData,
  previous?: CharacterData | null,
  savedAt = new Date().toISOString(),
): CharacterRevision[] {
  const stripHistory = (value: CharacterData): Record<string, unknown> => {
    const snapshot = structuredClone(value) as Record<string, unknown>;
    delete snapshot.history;
    return snapshot;
  };
  const prior = Array.isArray(previous?.history) ? previous.history : [];
  return [
    { savedAt, name: character.name, level: character.level, data: stripHistory(character) },
    ...prior.map((revision) => ({
      ...revision,
      data: structuredClone(revision.data),
    })),
  ].slice(0, 50);
}

function getLocalUserKey(userId: string): string {
  return `pf2e_user_${userId}_characters_v1`;
}

function getLocalCharacters(userId: string): CloudCharacter[] {
  try {
    const raw = localStorage.getItem(getLocalUserKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCharacters(userId: string, items: CloudCharacter[]): void {
  try {
    localStorage.setItem(getLocalUserKey(userId), JSON.stringify(items));
  } catch (err) {
    console.error("Erro ao salvar fichas locais:", err);
  }
}

function cacheLocalCharacter(userId: string, character: CloudCharacter): void {
  const existing = getLocalCharacters(userId);
  const key = character.character_key || character.id;
  const index = existing.findIndex((item) => (item.character_key || item.id) === key);
  if (index >= 0) existing[index] = character;
  else existing.unshift(character);
  saveLocalCharacters(userId, existing);
}

export function mergeCharacterLists(remote: CloudCharacter[], local: CloudCharacter[]): CloudCharacter[] {
  const merged = new Map<string, CloudCharacter>();
  // Em conflito, mantém a versão mais recentemente atualizada. Isso evita
  // que uma alteração local feita durante uma falha de rede seja substituída
  // por uma cópia remota antiga na próxima abertura da Biblioteca.
  for (const item of remote) merged.set(item.character_key || item.id, item);
  for (const item of local) {
    const key = item.character_key || item.id;
    const current = merged.get(key);
    if (!current || new Date(item.updated_at).getTime() > new Date(current.updated_at).getTime()) merged.set(key, item);
  }
  return Array.from(merged.values()).sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function listCharacters(currentUser?: UserProfile): Promise<CloudCharacter[]> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    return [];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await withRequestTimeout(supabase
        .from("characters")
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_email,player_name,data,created_at,updated_at")
        .eq("user_id", activeUser.id)
        .order("updated_at", { ascending: false }), 8_000, "A biblioteca demorou para responder. Usando as fichas salvas neste dispositivo.");
      if (!error && data) {
        const remote = (data ?? []) as CloudCharacter[];
        const hydratedRemote = await hydrateRemoteHistory(remote, activeUser.id);
        return mergeCharacterLists(hydratedRemote, getLocalCharacters(activeUser.id));
      }
      if (error) console.warn("Supabase characters query aviso:", error.message);
    } catch (err) {
      console.warn("Supabase characters fallback para local:", err);
    }
  }

  // Armazenamento local particionado por dono (user_id)
  const items = getLocalCharacters(activeUser.id);
  return items.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

export async function saveCharacter(
  characterValue: unknown,
  userOrSession?: { id: string }
): Promise<CloudCharacter> {
  const character = validateCharacter(characterValue);
  const activeUser = userOrSession || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Você precisa estar conectado para salvar uma ficha na sua conta.");
  }

  const existingList = await listCharacters(activeUser as UserProfile);
  const previous = existingList.find((item) => item.character_key === character.id || item.id === character.id)?.data;
  const savedCharacter = {
    ...character,
    history: buildCharacterRevisionHistory(character, previous),
  } as CharacterData;
  const payload = toCharacterPayload(savedCharacter, activeUser);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await withRequestTimeout(supabase
        .from("characters")
        .upsert(payload, { onConflict: "user_id,character_key" })
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_email,player_name,data,created_at,updated_at")
        .single(), 8_000, "O salvamento remoto demorou para responder. A ficha será mantida neste dispositivo.");
      if (!error && data) {
        // Mantém uma cópia local mesmo após sucesso remoto. Assim uma falha
        // transitória na próxima leitura não transforma uma biblioteca válida
        // em uma tela vazia ou presa em carregamento.
        const saved = data as CloudCharacter;
        cacheLocalCharacter(activeUser.id, saved);
        await persistRemoteRevision(saved, savedCharacter.history?.[0]);
        return saved;
      }
      if (error) console.warn("Supabase upsert aviso:", error.message);
    } catch (err) {
      console.warn("Supabase save fallback para local:", err);
    }
  }

  // Salvar no armazenamento local do usuário
  const existing = getLocalCharacters(activeUser.id);
  const now = new Date().toISOString();
  const index = existing.findIndex((c) => c.character_key === character.id);

  const cloudRecord: CloudCharacter = {
    id: index >= 0 ? existing[index].id : `chr_${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID().slice(0, 8) : Date.now()}`,
    user_id: activeUser.id,
    character_key: character.id,
    name: character.name,
    level: character.level,
    ruleset: normalizeCharacterRuleset(character.ruleset),
    gm_email: payload.gm_email,
    player_email: payload.player_email,
    player_name: payload.player_name,
    data: savedCharacter,
    created_at: index >= 0 ? existing[index].created_at : now,
    updated_at: now,
  };

  if (index >= 0) {
    existing[index] = cloudRecord;
  } else {
    existing.unshift(cloudRecord);
  }

  saveLocalCharacters(activeUser.id, existing);
  return cloudRecord;
}

export async function deleteCharacter(id: string, userOrSession?: { id: string }): Promise<void> {
  const activeUser = userOrSession || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Usuário não autenticado.");
  }

  if (isSupabaseConfigured && supabase) {
    try {
      // A UI pode enviar tanto o id técnico do registro quanto a chave estável
      // da ficha. Remover por ambos evita deixar uma cópia remota órfã.
      const byRowId = await withRequestTimeout(
        supabase.from("characters").delete().eq("id", id).eq("user_id", activeUser.id),
        8_000,
        "A exclusão remota demorou para responder. A ficha será removida deste dispositivo.",
      );
      const byCharacterKey = byRowId.error
        ? byRowId
        : await withRequestTimeout(
          supabase.from("characters").delete().eq("character_key", id).eq("user_id", activeUser.id),
          8_000,
          "A exclusão remota demorou para responder. A ficha será removida deste dispositivo.",
        );
      if (!byRowId.error && !byCharacterKey.error) {
        // Também remove do local por sincronização
        const existing = getLocalCharacters(activeUser.id);
        const filtered = existing.filter((c) => c.id !== id && c.character_key !== id);
        saveLocalCharacters(activeUser.id, filtered);
        return;
      }
      if (byCharacterKey.error) console.warn("Supabase delete aviso:", byCharacterKey.error.message);
    } catch (err) {
      console.warn("Supabase delete fallback para local:", err);
    }
  }

  // Deletar do armazenamento local
  const existing = getLocalCharacters(activeUser.id);
  const filtered = existing.filter((c) => c.id !== id && c.character_key !== id);
  saveLocalCharacters(activeUser.id, filtered);
}

export async function renameCharacter(
  characterKeyOrId: string,
  name: string,
  userOrSession?: { id: string; email?: string; username?: string },
): Promise<CloudCharacter> {
  const nextName = name.trim();
  if (!nextName) throw new Error("O nome do personagem não pode ficar vazio.");
  const activeUser = userOrSession || (await getCurrentSession())?.user;
  if (!activeUser) throw new Error("Você precisa estar conectado.");
  const existingList = await listCharacters(activeUser as any);
  const target = existingList.find((c) => c.character_key === characterKeyOrId || c.id === characterKeyOrId);
  if (!target) throw new Error("Personagem não encontrado.");
  return saveCharacter({ ...target.data, name: nextName }, activeUser);
}

/**
 * Retorna todas as fichas de personagens de jogadores que indicaram o GM através do seu e-mail.
 */
export async function listCharactersSharedWithGM(gmEmail: string): Promise<CloudCharacter[]> {
  if (!gmEmail || !gmEmail.trim()) return [];
  const normalizedEmail = gmEmail.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await withRequestTimeout(supabase
        .from("characters")
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_name,player_email,data,created_at,updated_at")
        .ilike("gm_email", normalizedEmail)
        .order("updated_at", { ascending: false }), 8_000, "A busca das fichas compartilhadas demorou para responder. Exibindo os dados disponíveis neste dispositivo.");
      if (!error && data) return data as CloudCharacter[];
    } catch (err) {
      console.warn("Falha ao buscar personagens vinculados via Supabase, usando armazenamento local:", err);
    }
  }

  // Buscar em todos os usuários salvos no localStorage
  const shared: CloudCharacter[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("pf2e_user_") && key.endsWith("_characters_v1")) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const list: CloudCharacter[] = JSON.parse(raw);
          for (const char of list) {
            const charGMEmail = (char.gm_email || char.data?.gmEmail || char.data?.gm_email || "") as string;
            if (charGMEmail && charGMEmail.trim().toLowerCase() === normalizedEmail) {
              shared.push(char);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Erro ao escanear fichas vinculadas locais:", err);
  }

  return shared.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

/**
 * Vincula uma ficha ao e-mail de um Mestre.
 */
export async function linkCharacterToGM(
  characterKeyOrId: string,
  gmEmail: string,
  userOrSession?: { id: string; email?: string; username?: string }
): Promise<CloudCharacter> {
  const activeUser = userOrSession || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Você precisa estar conectado para vincular sua ficha ao Mestre.");
  }

  const existingList = await listCharacters(activeUser as any);
  const target = existingList.find((c) => c.character_key === characterKeyOrId || c.id === characterKeyOrId);
  if (!target) {
    throw new Error("Personagem não encontrado.");
  }

  const updatedData: CharacterData = {
    ...target.data,
    gmEmail: gmEmail.trim(),
    gm_email: gmEmail.trim(),
    playerName: (activeUser as any).username || target.player_name || "",
    playerEmail: (activeUser as any).email || target.player_email || "",
  };

  return await saveCharacter(updatedData, activeUser);
}

/**
 * Desvincula a ficha do Mestre atual.
 */
export async function unlinkCharacterFromGM(
  characterKeyOrId: string,
  userOrSession?: { id: string }
): Promise<CloudCharacter> {
  const activeUser = userOrSession || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Você precisa estar conectado.");
  }

  const existingList = await listCharacters(activeUser as any);
  const target = existingList.find((c) => c.character_key === characterKeyOrId || c.id === characterKeyOrId);
  if (!target) {
    throw new Error("Personagem não encontrado.");
  }

  const updatedData: CharacterData = {
    ...target.data,
  };
  delete updatedData.gmEmail;
  delete updatedData.gm_email;

  return await saveCharacter(updatedData, activeUser);
}
