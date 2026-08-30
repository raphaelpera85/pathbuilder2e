import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";

export interface CharacterData extends Record<string, unknown> {
  id: string;
  name: string;
  level: number;
  ruleset?: "remaster" | "legacy" | "both" | "needs_review";
}

export interface CloudCharacter {
  id: string;
  user_id: string;
  character_key: string;
  name: string;
  level: number;
  ruleset: "remaster" | "legacy" | "both" | "needs_review";
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
  } as CharacterData;
}

export function toCharacterPayload(character: CharacterData, user: { id: string }) {
  const ruleset = character.ruleset ?? "needs_review";
  return {
    user_id: user.id,
    character_key: character.id,
    name: character.name,
    level: character.level,
    ruleset,
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
    const { data, error } = await supabase
      .from("characters")
      .select("id,user_id,character_key,name,level,ruleset,data,created_at,updated_at")
      .eq("user_id", activeUser.id)
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as CloudCharacter[];
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
    const { data, error } = await supabase
      .from("characters")
      .upsert(payload, { onConflict: "user_id,character_key" })
      .select("id,user_id,character_key,name,level,ruleset,data,created_at,updated_at")
      .single();
    if (error) throw error;
    return data as CloudCharacter;
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
    const { error } = await supabase.from("characters").delete().eq("id", id).eq("user_id", activeUser.id);
    if (error) throw error;
    return;
  }

  // Deletar do armazenamento local
  const existing = getLocalCharacters(activeUser.id);
  const filtered = existing.filter((c) => c.id !== id && c.character_key !== id);
  saveLocalCharacters(activeUser.id, filtered);
}
