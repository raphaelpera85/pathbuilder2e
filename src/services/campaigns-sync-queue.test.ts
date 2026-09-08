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

import { listCampaignsWithStatus, saveCampaignWithStatus } from "./campaigns";

describe("fila de sincronização de campanhas", () => {
  const gm = { id: "gm-queue", email: "gm@example.com", username: "Mestre", role: "user" as const };

  beforeEach(() => {
    localStorage.clear();
    remote.clear();
    state.failUpsert = true;
    state.upsertCalls = 0;
  });

  it("preserva uma campanha offline e a remove da fila só após confirmação remota", async () => {
    const first = await saveCampaignWithStatus({ title: "Mesa offline" }, gm);

    expect(first.source).toBe("local");
    expect(first.error).toContain("não foi sincronizada");
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toContain("Mesa offline");

    state.failUpsert = false;
    const synced = await listCampaignsWithStatus(gm);

    expect(synced.source).toBe("supabase");
    expect(synced.error).toBeUndefined();
    expect(synced.data[0].title).toBe("Mesa offline");
    expect(remote.size).toBe(1);
    expect(state.upsertCalls).toBe(2);
    expect(localStorage.getItem("pf2e_gm_gm-queue_pending_campaigns_v1")).toBeNull();
  });
});
