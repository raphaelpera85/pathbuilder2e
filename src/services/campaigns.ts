import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";
import { listCharactersSharedWithGM, type CloudCharacter } from "./characters";
import { withRequestTimeout } from "./requestTimeout";

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

export type CampaignSyncSource = "supabase" | "local" | "none";

export interface CampaignSyncResult<T> {
  data: T;
  source: CampaignSyncSource;
  error?: string;
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

function getPendingCampaignsKey(gmId: string): string {
  return `pf2e_gm_${gmId}_pending_campaigns_v1`;
}

function getPendingCampaigns(gmId: string): Campaign[] {
  try {
    const raw = localStorage.getItem(getPendingCampaignsKey(gmId));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is Campaign => Boolean(item && typeof item === "object" && typeof item.id === "string")) : [];
  } catch {
    return [];
  }
}

function savePendingCampaigns(gmId: string, items: Campaign[]): void {
  try {
    if (items.length) localStorage.setItem(getPendingCampaignsKey(gmId), JSON.stringify(items));
    else localStorage.removeItem(getPendingCampaignsKey(gmId));
  } catch (err) {
    console.warn("Não foi possível guardar a fila pendente de campanhas:", err);
  }
}

function queuePendingCampaign(gmId: string, campaign: Campaign): void {
  const pending = getPendingCampaigns(gmId).filter((item) => item.id !== campaign.id);
  savePendingCampaigns(gmId, [campaign, ...pending]);
}

async function flushPendingCampaigns(activeUser: UserProfile): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const pending = getPendingCampaigns(activeUser.id);
  if (!pending.length) return;
  const remaining: Campaign[] = [];
  for (const campaign of pending) {
    try {
      const { data, error } = await withRequestTimeout(supabase
        .from("campaigns")
        .upsert({ ...campaign, gm_id: activeUser.id }, { onConflict: "id" })
        .select()
        .single(), 8_000, "A sincronização da campanha pendente demorou para responder.");
      if (error || !data) remaining.push(campaign);
    } catch {
      remaining.push(campaign);
    }
  }
  savePendingCampaigns(activeUser.id, remaining);
}

function normalizeCampaignSystem(value: string | undefined): string {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("custom") || normalized.includes("variant") || normalized.includes("variante")) return "custom";
  if (normalized.includes("classic") || normalized.includes("clássico") || normalized.includes("classico")) return "classic";
  return "remaster";
}

function createCampaignId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function mergeCampaignLists(remote: Campaign[], local: Campaign[]): Campaign[] {
  const merged = new Map<string, Campaign>();
  for (const campaign of remote) merged.set(campaign.id, campaign);
  for (const campaign of local) if (!merged.has(campaign.id)) merged.set(campaign.id, campaign);
  return Array.from(merged.values()).sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function listCampaignsWithStatus(currentUser?: UserProfile): Promise<CampaignSyncResult<Campaign[]>> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    return { data: [], source: "none" };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await flushPendingCampaigns(activeUser);
      const { data, error } = await withRequestTimeout(supabase
        .from("campaigns")
        .select("*")
        .eq("gm_id", activeUser.id)
        .order("updated_at", { ascending: false }), 8_000, "As campanhas demoraram para responder. Exibindo os dados disponíveis neste dispositivo.");
      if (!error && data) {
        const merged = mergeCampaignLists(data as Campaign[], getLocalCampaigns(activeUser.id));
        saveLocalCampaigns(activeUser.id, merged);
        return { data: merged, source: "supabase" };
      }
      if (error) {
        return { data: mergeCampaignLists([], getLocalCampaigns(activeUser.id)), source: "local", error: "Não foi possível sincronizar as campanhas com a nuvem." };
      }
    } catch (err) {
      console.warn("Falha ao buscar campanhas no Supabase, usando armazenamento local:", err);
      return { data: mergeCampaignLists([], getLocalCampaigns(activeUser.id)), source: "local", error: "Não foi possível sincronizar as campanhas com a nuvem." };
    }
  }

  return { data: mergeCampaignLists([], getLocalCampaigns(activeUser.id)), source: "local" };
}

export async function listCampaigns(currentUser?: UserProfile): Promise<Campaign[]> {
  return (await listCampaignsWithStatus(currentUser)).data;
}

export async function getCampaign(campaignId: string, currentUser?: UserProfile): Promise<Campaign | null> {
  const campaigns = await listCampaigns(currentUser);
  return campaigns.find((c) => c.id === campaignId) || null;
}

export async function saveCampaign(
  data: Partial<Campaign>,
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await saveCampaignWithStatus(data, currentUser)).data;
}

export async function saveCampaignWithStatus(
  data: Partial<Campaign>,
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Você precisa estar conectado como Mestre para gerenciar campanhas.");
  }

  const now = new Date().toISOString();
  const id = data.id || createCampaignId();
  const campaignRecord: Campaign = {
    id,
    gm_id: activeUser.id,
    gm_email: activeUser.email || (data.gm_email ?? ""),
    title: (data.title || "Nova Campanha de RPG").trim(),
    description: (data.description || "").trim(),
    schedule: data.schedule?.trim() || "A combinar",
    system: normalizeCampaignSystem(data.system),
    character_keys: Array.isArray(data.character_keys) ? data.character_keys : [],
    notes: data.notes || "",
    sessions: Array.isArray(data.sessions) ? data.sessions : [],
    combatants: Array.isArray(data.combatants) ? data.combatants : [],
    created_at: data.created_at || now,
    updated_at: now,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: result, error } = await withRequestTimeout(supabase
        .from("campaigns")
        .upsert(campaignRecord, { onConflict: "id" })
        .select()
        .single(), 8_000, "O salvamento da campanha demorou para responder. A campanha será mantida neste dispositivo.");
      if (!error && result) {
        const saved = result as Campaign;
        const existing = getLocalCampaigns(activeUser.id).filter((campaign) => campaign.id !== saved.id);
        saveLocalCampaigns(activeUser.id, [saved, ...existing]);
        savePendingCampaigns(activeUser.id, getPendingCampaigns(activeUser.id).filter((campaign) => campaign.id !== saved.id));
        return { data: saved, source: "supabase" };
      }
    } catch (err) {
      console.warn("Falha ao salvar no Supabase, campanha adicionada à fila de sincronização:", err);
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
  if (isSupabaseConfigured && supabase) queuePendingCampaign(activeUser.id, campaignRecord);

  return {
    data: campaignRecord,
    source: "local",
    error: isSupabaseConfigured && supabase
      ? "A campanha foi salva neste dispositivo, mas não foi sincronizada com a nuvem."
      : undefined,
  };
}

export async function deleteCampaignWithStatus(campaignId: string, currentUser?: UserProfile): Promise<CampaignSyncResult<null>> {
  const activeUser = currentUser || (await getCurrentSession())?.user;
  if (!activeUser) {
    throw new Error("Usuário não autenticado.");
  }

  let cloudError = false;
  let cloudDeleted = false;
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await withRequestTimeout(
        supabase.from("campaigns").delete().eq("id", campaignId).eq("gm_id", activeUser.id),
        8_000,
        "A exclusão da campanha demorou para responder. A campanha será removida deste dispositivo.",
      );
      cloudError = Boolean(error);
      cloudDeleted = !cloudError;
    } catch (err) {
      console.warn("Erro ao deletar no Supabase:", err);
      cloudError = true;
    }
  }

  const existing = getLocalCampaigns(activeUser.id);
  const filtered = existing.filter((c) => c.id !== campaignId);
  saveLocalCampaigns(activeUser.id, filtered);
  return { data: null, source: cloudDeleted ? "supabase" : "local", error: cloudError ? "A campanha foi excluída neste dispositivo, mas a nuvem não foi atualizada." : undefined };
}

export async function deleteCampaign(campaignId: string, currentUser?: UserProfile): Promise<void> {
  await deleteCampaignWithStatus(campaignId, currentUser);
}

export async function addCharacterToCampaignWithStatus(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  if (!campaign.character_keys.includes(characterKey)) {
    campaign.character_keys.push(characterKey);
  }
  return await saveCampaignWithStatus(campaign, currentUser);
}

export async function addCharacterToCampaign(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await addCharacterToCampaignWithStatus(campaignId, characterKey, currentUser)).data;
}

export async function removeCharacterFromCampaignWithStatus(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  campaign.character_keys = campaign.character_keys.filter((k) => k !== characterKey);
  return await saveCampaignWithStatus(campaign, currentUser);
}

export async function removeCharacterFromCampaign(
  campaignId: string,
  characterKey: string,
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await removeCharacterFromCampaignWithStatus(campaignId, characterKey, currentUser)).data;
}

export async function addSessionLogWithStatus(
  campaignId: string,
  sessionLog: Omit<CampaignSession, "id">,
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  const newSession: CampaignSession = {
    ...sessionLog,
    id: `sess_${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID().slice(0, 8) : Date.now()}`,
  };

  campaign.sessions = [newSession, ...(campaign.sessions || [])];
  return await saveCampaignWithStatus(campaign, currentUser);
}

export async function addSessionLog(
  campaignId: string,
  sessionLog: Omit<CampaignSession, "id">,
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await addSessionLogWithStatus(campaignId, sessionLog, currentUser)).data;
}

// SINCRONIZAÇÃO EM TEMPO REAL VIA SUPABASE REALTIME
export function subscribeToCampaign(
  campaignId: string,
  onUpdate: (payload: { eventType: string; newRecord: any; oldRecord: any }) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }
  const channel = supabase
    .channel(`realtime:campaign:${campaignId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "campaigns",
        filter: `id=eq.${campaignId}`,
      },
      (payload) => {
        onUpdate({
          eventType: payload.eventType,
          newRecord: payload.new,
          oldRecord: payload.old,
        });
      }
    )
    .subscribe();

  return () => {
    supabase?.removeChannel(channel);
  };
}

// RASTREADOR TÁTICO: ATUALIZAR COMBATENTE E INICIATIVA
export async function updateCombatantWithStatus(
  campaignId: string,
  combatantUpdate: Partial<Combatant> & { id: string },
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  const combatants = campaign.combatants || [];
  const idx = combatants.findIndex((c) => c.id === combatantUpdate.id);
  if (idx >= 0) {
    combatants[idx] = { ...combatants[idx], ...combatantUpdate };
  } else {
    combatants.push(combatantUpdate as Combatant);
  }
  campaign.combatants = combatants;
  return await saveCampaignWithStatus(campaign, currentUser);
}

export async function updateCombatant(
  campaignId: string,
  combatantUpdate: Partial<Combatant> & { id: string },
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await updateCombatantWithStatus(campaignId, combatantUpdate, currentUser)).data;
}

export async function sortInitiativeWithStatus(
  campaignId: string,
  currentUser?: UserProfile
): Promise<CampaignSyncResult<Campaign>> {
  const campaign = await getCampaign(campaignId, currentUser);
  if (!campaign) throw new Error("Campanha não encontrada.");

  campaign.combatants = (campaign.combatants || []).sort((a, b) => (b.initiative || 0) - (a.initiative || 0));
  return await saveCampaignWithStatus(campaign, currentUser);
}

export async function sortInitiative(
  campaignId: string,
  currentUser?: UserProfile
): Promise<Campaign> {
  return (await sortInitiativeWithStatus(campaignId, currentUser)).data;
}
