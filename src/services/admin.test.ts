import { describe, it, expect, beforeEach, vi } from "vitest";
import { recordAppAccess, getAdminDashboardMetrics } from "./admin";

describe("Admin & Access Analytics Service", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("registra acessos e incrementa o contador local e diário", async () => {
    const before = await getAdminDashboardMetrics();
    expect(before.totalAccesses).toBe(0);

    await recordAppAccess("builder");
    await recordAppAccess("compendium");
    await recordAppAccess("admin");

    const after = await getAdminDashboardMetrics();
    expect(after.totalAccesses).toBe(3);
    expect(after.accessesToday).toBe(3);
    expect(after.recentAccesses.length).toBe(3);
    expect(after.recentAccesses[0].route).toBe("admin");
    expect(after.recentAccesses[1].route).toBe("compendium");
    expect(after.recentAccesses[2].route).toBe("builder");
  });

  it("consolida contas e personagens salvos localmente ou no Supabase", async () => {
    // Simula contas e personagens locais
    const mockUsers = {
      "usr-1": { username: "MestreAdmin", email: "admin@rpg.com", role: "admin" },
      "usr-2": { username: "Jogador1", email: "p1@rpg.com", role: "user" },
    };
    localStorage.setItem("pb2e_local_users_db", JSON.stringify(mockUsers));

    const mockCharacters = [
      { id: "c1", name: "Valeros", ruleset: "remaster", level: 5 },
      { id: "c2", name: "Kyra", ruleset: "remaster", level: 3 },
      { id: "c3", name: "Ezren", ruleset: "legacy", level: 7 },
    ];
    localStorage.setItem("pb2e_cloud_characters_v1", JSON.stringify(mockCharacters));

    const metrics = await getAdminDashboardMetrics();
    expect(metrics.registeredAccounts).toBe(2);
    expect(metrics.charactersCreated).toBe(3);
    expect(metrics.characterRulesetDistribution.remaster).toBe(2);
    expect(metrics.characterRulesetDistribution.legacy).toBe(1);
    expect(metrics.adminUsers).toBe(1);
    expect(metrics.usersList.length).toBe(2);
  });

  it("mantém no máximo 150 registros de logs recentes para não estourar storage", async () => {
    for (let i = 0; i < 160; i++) {
      await recordAppAccess(`page-${i}`);
    }

    const metrics = await getAdminDashboardMetrics();
    expect(metrics.totalAccesses).toBe(160);
    expect(metrics.recentAccesses.length).toBe(150);
  });
});
