import { describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  callback: null as ((payload: { eventType: string; new: unknown; old: unknown }) => void) | null,
  config: null as Record<string, unknown> | null,
  removed: null as unknown,
}));

vi.mock("../lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    channel: () => ({
      on(_event: string, config: Record<string, unknown>, callback: typeof state.callback) {
        state.config = config;
        state.callback = callback;
        return this;
      },
      subscribe: () => ({}),
    }),
    removeChannel: (channel: unknown) => { state.removed = channel; },
  },
}));

import { subscribeToCampaign } from "./campaigns";

describe("Realtime de campanhas", () => {
  it("assina somente a campanha solicitada e encaminha o evento", () => {
    const onUpdate = vi.fn();
    const cleanup = subscribeToCampaign("campaign-42", onUpdate);

    expect(state.config).toMatchObject({
      event: "*",
      schema: "public",
      table: "campaigns",
      filter: "id=eq.campaign-42",
    });

    const channel = state.removed;
    state.callback?.({ eventType: "UPDATE", new: { id: "campaign-42", title: "Atualizada" }, old: { id: "campaign-42" } });
    expect(onUpdate).toHaveBeenCalledWith({
      eventType: "UPDATE",
      newRecord: { id: "campaign-42", title: "Atualizada" },
      oldRecord: { id: "campaign-42" },
    });

    cleanup();
    expect(state.removed).not.toBe(channel);
    expect(state.removed).toBeTruthy();
  });
});
