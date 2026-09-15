import { beforeEach, describe, expect, it, vi } from "vitest";

const remote = vi.hoisted(() => new Map<string, Record<string, unknown>>());
const state = vi.hoisted(() => ({ failUpsert: true, upsertCalls: 0 }));

vi.mock("../lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    from(table: string) {
      if (table !== "campaigns") throw new Error(`Tabela inesperada: ${table}`);
      return {
        upsert(record: Record<string, unknown>) {
          state.upsertCalls += 1;
          return {
            select() {
              return {
                single: () => state.failUpsert
                  ? Promise.reject(new Error("offline"))
                  : (remote.set(String(record.id), record), Promise.resolve({ data: record, error: null })),
              };
            },
          };
        },
        select() {
          return {
            eq() { return this; },
            order: () => Promise.resolve({ data: Array.from(remote.values()), error: null }),
          };
        },
      };
    },
  },
}));

import { getPendingCampaignCount, listCampaignsWithStatus, saveCampaignWithStatus, syncClock } from "./campaigns";

describe("fila de sincronização de campanhas", () => {
  const gm = { id: "gm-queue", email: "gm@example.com", username: "Mestre", role: "user" as const };
  let now = 1_000_000;

  beforeEach(() => {
    localStorage.clear();
    remote.clear();
    state.failUpsert = true;
    state.upsertCalls = 0;
    now = 1_000_000;
    syncClock.now = () => now;
  });

  it("preserva uma campanha offline, respeita o backoff e só a remove da fila após confirmação remota", async () => {
    const first = await saveCampaignWithStatus({ title: "Mesa offline" }, gm);

    expect(first.source).toBe("local");
    expect(first.error).toContain("não foi sincronizada");
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toContain("Mesa offline");
    expect(getPendingCampaignCount(gm.id)).toBe(1);

    // O backoff inicial (30s) ainda não passou: o flush não repete a tentativa.
    const skipped = await listCampaignsWithStatus(gm);
    expect(state.upsertCalls).toBe(1);
    expect(skipped.source).toBe("supabase");
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toContain("Mesa offline");

    // Passa a janela de backoff e a campanha sincroniza, saindo da fila.
    now += 60_000;
    state.failUpsert = false;
    const synced = await listCampaignsWithStatus(gm);

    expect(synced.source).toBe("supabase");
    expect(synced.error).toBeUndefined();
    expect(synced.data[0].title).toBe("Mesa offline");
    expect(remote.size).toBe(1);
    expect(state.upsertCalls).toBe(2);
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toBeNull();
    expect(getPendingCampaignCount(gm.id)).toBe(0);
  });

  it("mantém na fila uma campanha que continua falhando e amplia o backoff a cada tentativa", async () => {
    await saveCampaignWithStatus({ title: "Mesa instável" }, gm);
    expect(state.upsertCalls).toBe(1);

    // Passa o backoff de 30s: a tentativa 2 falha e é registrada com atraso maior.
    now += 60_000;
    await listCampaignsWithStatus(gm);
    expect(state.upsertCalls).toBe(2);
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toContain("Mesa instável");

    // Imediatamente após a falha, o backoff agora de 60s impede nova tentativa.
    await listCampaignsWithStatus(gm);
    expect(state.upsertCalls).toBe(2);
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toContain("Mesa instável");
  });
});