import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AccountPortal } from "./AccountPortal";
import { I18nProvider } from "./i18n";

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  subscribeToAuth: vi.fn(),
  listCharacters: vi.fn(),
  saveCharacter: vi.fn(),
}));

vi.mock("./services/auth", () => ({
  getCurrentSession: mocks.getCurrentSession,
  subscribeToAuth: mocks.subscribeToAuth,
  changePassword: vi.fn(),
  deleteAccount: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  signUp: vi.fn(),
  updateUsername: vi.fn(),
}));

vi.mock("./services/characters", () => ({
  deleteCharacter: vi.fn(),
  listCharacters: mocks.listCharacters,
  renameCharacter: vi.fn(),
  saveCharacter: mocks.saveCharacter,
}));

const session = { user: { id: "autosave-user", email: "player@example.test", username: "player" } };

describe("AccountPortal character autosave integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mocks.getCurrentSession.mockResolvedValue(session);
    mocks.subscribeToAuth.mockReturnValue(() => undefined);
    mocks.listCharacters.mockResolvedValue([]);
    mocks.saveCharacter.mockImplementation(async (data: Record<string, unknown>) => ({
      id: "cloud-character",
      character_key: data.id,
      user_id: session.user.id,
      name: data.name,
      level: data.level,
      data,
    }));
  });

  afterEach(() => {
    delete (window as Window & { app?: unknown }).app;
  });

  it("sends the latest complete character snapshot to cloud save after a local change event", async () => {
    const snapshot = {
      id: "pf2e-autosave",
      name: "Sentinela",
      system_id: "pf2e",
      ruleset: "remaster",
      level: 7,
      attributes: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 8 },
      progression: { classFeats: [{ level: 6, featId: "power-attack" }] },
      inventory: [{ id: "sword", quantity: 2, equipped: true }],
      coins: { gp: 42, sp: 3 },
      conditions: [{ id: "frightened", value: 1 }],
      diceHistory: [{ formula: "2d20+7", total: 24, time: "2026-10-10T12:00:00Z" }],
      variantRules: { freeArchetype: true },
      history: [{ savedAt: "2026-10-10T12:00:00Z", level: 7 }],
    };
    (window as Window & { app?: unknown }).app = {
      getCurrentCharacter: () => structuredClone(snapshot),
    };

    render(<I18nProvider><AccountPortal /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(mocks.listCharacters).toHaveBeenCalledWith(session.user));

    act(() => window.dispatchEvent(new Event("pathbuilder:character-changed")));

    await waitFor(() => expect(mocks.saveCharacter).toHaveBeenCalled(), { timeout: 5_000 });
    expect(mocks.saveCharacter).toHaveBeenCalledWith(snapshot, session.user, { expectedUpdatedAt: undefined });
  });
});
