import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";
import { listCharactersSharedWithGM, type CloudCharacter } from "./characters";

export interface CampaignSession {
  id: string;
  title: string;
  date: string;
  summary: string;
  xp?: number;
  loot?: string;
}

export interface Combatant {
  id: string;
  name: string;
  isPlayer: boolean;
  characterKey?: string;
  initiative: number;
  currentHp: number;
  maxHp: number;
  ac: number;
  perception?: number;
  conditions?: string[];
  notes?: string;
}

export interface Campaign {
  id: string;
  gm_id: string;
  gm_email: string;
  title: string;
  description: string;
  schedule?: string;
  system: string;
  character_keys: string[];
  notes: string;
  sessions: CampaignSession[];
  combatants: Combatant[];
  created_at: string;
  updated_at: string;
}

function getLocalCampaignsKey(gmId: string): string {
  return `pf2e_gm_${gmId}_campaigns_v1`;
}

function getLocalCampaigns(gmId: string): Campaign[] {
  try {
    const raw = localStorage.getItem(getLocalCampaignsKey(gmId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCampaigns(gmId: string, items: Campaign[]): void {
  try {
    localStorage.setItem(getLocalCampaignsKey(gmId), JSON.stringify(items));
  } catch (err) {
    console.error("Erro ao salvar campanhas locais:", err);
  }
}

export async function listCampaigns(currentUser?: UserProfile): Promise<Campaign[]> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    return [];
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("gm_id", activeUser.id)
        .order("updated_at", { ascending: false });
      if (!error && data) return data as Campaign[];
    } catch (err) {
      console.warn("Falha ao buscar campanhas no Supabase, usando armazenamento local:", err);
    }
  }

  const items = getLocalCampaigns(activeUser.id);
  return items.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

export async function getCampaign(campaignId: string, currentUser?: UserProfile): Promise<Campaign | null> {
  const campaigns = await listCampaigns(currentUser);
  return campaigns.find((c) => c.id === campaignId) || null;
}

export async function saveCampaign(
  data: Partial<Campaign>,
  currentUser?: UserProfile
): Promise<Campaign> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Você precisa estar conectado como Mestre para gerenciar campanhas.");
  }

  const now = new Date().toISOString();
  const id = data.id || `camp_${crypto?.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`;
  const campaignRecord: Campaign = {
    id,
    gm_id: activeUser.id,
    gm_email: activeUser.email || (data.gm_email ?? ""),
    title: (data.title || "Nova Campanha de RPG").trim(),
    description: (data.description || "").trim(),
    schedule: data.schedule?.trim() || "A combinar",
    system: data.system || "Pathfinder 2e Remaster",
    character_keys: Array.isArray(data.character_keys) ? data.character_keys : [],
    notes: data.notes || "",
    sessions: Array.isArray(data.sessions) ? data.sessions : [],
    combatants: Array.isArray(data.combatants) ? data.combatants : [],
    created_at: data.created_at || now,
    updated_at: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: result, error } = await supabase
        .from("campaigns")
        .upsert(campaignRecord, { onConflict: "id" })
        .select()
        .single();
      if (!error && result) return result as Campaign;
    } catch (err) {
      console.warn("Falha ao salvar no Supabase, usando armazenamento local:", err);
    }
  }

  const existing = getLocalCampaigns(activeUser.id);
  const idx = existing.findIndex((c) => c.id === id);
  if (idx >= 0) {
    existing[idx] = campaignRecord;
  } else {
    existing.unshift(campaignRecord);
  }
  saveLocalCampaigns(activeUser.id, existing);

  return campaignRecord;
}

export async function deleteCampaign(campaignId: string, currentUser?: UserProfile): Promise<void> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Usuário não autenticado.");
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("campaigns").delete().eq("id", campaignId).eq("gm_id", activeUser.id);
    } catch (err) {
      console.warn("Erro ao deletar no Supabase:", err);
    }
  }

  const existing = getLocalCampaigns(activeUser.id);
  const filtered = existing.filter((c) => c.id !== campaignId);
  saveLocalCampaigns(activeUser.id, filtered);
}

export async function addCharacterToCampaign(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<Campaign> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  if (!campaign.character_keys.includes(characterKey)) {
    campaign.character_keys.push(characterKey);
  }
  return await saveCampaign(campaign, currentUser);
}

export async function removeCharacterFromCampaign(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<Campaign> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  campaign.character_keys = campaign.character_keys.filter((k) => k !== characterKey);
  return await saveCampaign(campaign, currentUser);
}

export async function addSessionLog(
  campaignId: string,
  sessionLog: Omit<CampaignSession, "id">,
  currentUser?: UserProfile
): Promise<Campaign> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  const newSession: CampaignSession = {
    ...sessionLog,
    id: `sess_${crypto?.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`,
  };

  campaign.sessions = [newSession, ...(campaign.sessions || [])];
  return await saveCampaign(campaign, currentUser);
}
