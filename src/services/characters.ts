import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

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
      : `personagem_${crypto.randomUUID()}`,
    name: candidate.name.trim(),
    level,
  } as CharacterData;
}

export function toCharacterPayload(character: CharacterData, user: User) {
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

function requireClient() {
  if (!supabase) throw new Error("Supabase ainda não foi configurado.");
  return supabase;
}

export async function listCharacters(): Promise<CloudCharacter[]> {
  const { data, error } = await requireClient()
    .from("characters")
    .select("id,user_id,character_key,name,level,ruleset,data,created_at,updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CloudCharacter[];
}

export async function saveCharacter(characterValue: unknown, user: User): Promise<CloudCharacter> {
  const character = validateCharacter(characterValue);
  const payload = toCharacterPayload(character, user);
  const { data, error } = await requireClient()
    .from("characters")
    .upsert(payload, { onConflict: "user_id,character_key" })
    .select("id,user_id,character_key,name,level,ruleset,data,created_at,updated_at")
    .single();
  if (error) throw error;
  return data as CloudCharacter;
}

export async function deleteCharacter(id: string): Promise<void> {
  const { error } = await requireClient().from("characters").delete().eq("id", id);
  if (error) throw error;
}
