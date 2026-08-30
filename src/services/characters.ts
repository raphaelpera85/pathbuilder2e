import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";

export interface CharacterData extends Record<string, unknown> {
  id: string;
  name: string;
  level: number;
  ruleset?: "remaster" | "legacy" | "both" | "needs_review";
  gmEmail?: string;
  gm_email?: string;
  playerName?: string;
  playerEmail?: string;
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
      : `personagem_${crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`,
    name: candidate.name.trim(),
    level,
    gmEmail: typeof candidate.gmEmail === "string" ? candidate.gmEmail.trim() : (typeof candidate.gm_email === "string" ? candidate.gm_email.trim() : undefined),
  } as CharacterData;
}

export function toCharacterPayload(character: CharacterData, user: { id: string; email?: string; username?: string }) {
  const ruleset = character.ruleset ?? "needs_review";
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

export async function listCharacters(currentUser?: UserProfile): Promise<CloudCharacter[]> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    return [];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("characters")
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_email,player_name,data,created_at,updated_at")
        .eq("user_id", activeUser.id)
        .order("updated_at", { ascending: false });
      if (!error && data) return (data ?? []) as CloudCharacter[];
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

  const payload = toCharacterPayload(character, activeUser);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("characters")
        .upsert(payload, { onConflict: "user_id,character_key" })
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_email,player_name,data,created_at,updated_at")
        .single();
      if (!error && data) return data as CloudCharacter;
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
    id: index >= 0 ? existing[index].id : `chr_${crypto?.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`,
    user_id: activeUser.id,
    character_key: character.id,
    name: character.name,
    level: character.level,
    ruleset: (character.ruleset as any) || "remaster",
    gm_email: payload.gm_email,
    player_email: payload.player_email,
    player_name: payload.player_name,
    data: character,
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
      const { error } = await supabase.from("characters").delete().eq("id", id).eq("user_id", activeUser.id);
      if (!error) {
        // Também remove do local por sincronização
        const existing = getLocalCharacters(activeUser.id);
        const filtered = existing.filter((c) => c.id !== id && c.character_key !== id);
        saveLocalCharacters(activeUser.id, filtered);
        return;
      }
    } catch (err) {
      console.warn("Supabase delete fallback para local:", err);
    }
  }

  // Deletar do armazenamento local
  const existing = getLocalCharacters(activeUser.id);
  const filtered = existing.filter((c) => c.id !== id && c.character_key !== id);
  saveLocalCharacters(activeUser.id, filtered);
}

/**
 * Retorna todas as fichas de personagens de jogadores que indicaram o GM através do seu e-mail.
 */
export async function listCharactersSharedWithGM(gmEmail: string): Promise<CloudCharacter[]> {
  if (!gmEmail || !gmEmail.trim()) return [];
  const normalizedEmail = gmEmail.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("characters")
        .select("id,user_id,character_key,name,level,ruleset,gm_email,player_name,player_email,data,created_at,updated_at")
        .ilike("gm_email", normalizedEmail)
        .order("updated_at", { ascending: false });
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
