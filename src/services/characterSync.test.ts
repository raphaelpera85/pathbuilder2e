import { beforeEach, describe, expect, it } from "vitest";
import {
  backoffDelayMs,
  duePendingSaves,
  forgetCloudRevision,
  listPendingSaves,
  markPendingSaveAttempt,
  mergeCharacterDocuments,
  migrateLegacyPendingSave,
  pendingSaveCount,
  readKnownRemoteUpdatedAt,
  rememberCloudRevision,
  removePendingSave,
  syncClock,
  upsertPendingSave,
} from "./characterSync";

function snapshot(id: string, extra: Record<string, unknown> = {}) {
  return { id, name: `Herói ${id}`, level: 1, ...extra } as never;
}

describe("fila offline de fichas", () => {
  beforeEach(() => {
    localStorage.clear();
    syncClock.now = () => Date.now();
  });

  it("guarda um snapshot por personagem sem sobrescrever outra ficha pendente", () => {
    const user = "user-queue";
    upsertPendingSave(user, { characterKey: "char-a", snapshot: snapshot("char-a", { level: 2 }) });
    upsertPendingSave(user, { characterKey: "char-b", snapshot: snapshot("char-b", { level: 3 }) });

    const entries = listPendingSaves(user);
    expect(entries).toHaveLength(2);
    expect(pendingSaveCount(user)).toBe(2);

    // Uma alteração nova no mesmo personagem substitui apenas aquele snapshot.
    upsertPendingSave(user, { characterKey: "char-a", snapshot: snapshot("char-a", { level: 5 }) });
    const updated = listPendingSaves(user).find((entry) => entry.characterKey === "char-a");
    expect((updated?.snapshot as { level: number }).level).toBe(5);
    expect(pendingSaveCount(user)).toBe(2);

    removePendingSave(user, "char-a");
    expect(listPendingSaves(user).map((entry) => entry.characterKey)).toEqual(["char-b"]);
  });

  it("cresce o backoff por tentativa e só libera a nova tentativa na janela", () => {
    expect(backoffDelayMs(0)).toBe(1_000);
    expect(backoffDelayMs(1)).toBe(2_000);
    expect(backoffDelayMs(2)).toBe(4_000);
    expect(backoffDelayMs(5)).toBe(30_000);
    expect(backoffDelayMs(9)).toBe(30_000);

    const user = "user-backoff";
    let now = 1_000_000;
    syncClock.now = () => now;
    upsertPendingSave(user, { characterKey: "char-a", snapshot: snapshot("char-a") });

    // Sem tentativa registrada, a pendência já vence.
    expect(duePendingSaves(user)).toHaveLength(1);

    markPendingSaveAttempt(user, "char-a", 1, now);
    expect(duePendingSaves(user)).toHaveLength(0);

    now += 1_999;
    expect(duePendingSaves(user)).toHaveLength(0);
    now += 1;
    expect(duePendingSaves(user)).toHaveLength(1);
  });

  it("reinicia o backoff quando chega uma alteração nova do construtor", () => {
    const user = "user-reset";
    upsertPendingSave(user, { characterKey: "char-a", snapshot: snapshot("char-a") });
    markPendingSaveAttempt(user, "char-a", 3, 5_000);
    expect(listPendingSaves(user)[0]).toMatchObject({ attempt: 3, lastAttemptAt: 5_000 });

    upsertPendingSave(user, { characterKey: "char-a", snapshot: snapshot("char-a", { level: 4 }) });
    expect(listPendingSaves(user)[0]).toMatchObject({ attempt: 0, lastAttemptAt: 0 });
  });

  it("migra a fila antiga de um único snapshot por conta", () => {
    const user = "user-legacy";
    localStorage.setItem(`pf2e_pending_cloud_save_${user}`, JSON.stringify(snapshot("char-legacy", { level: 7 })));

    const migrated = migrateLegacyPendingSave(user);
    expect(migrated?.characterKey).toBe("char-legacy");
    expect((migrated?.snapshot as { level: number }).level).toBe(7);
    expect(localStorage.getItem(`pf2e_pending_cloud_save_${user}`)).toBeNull();
    expect(pendingSaveCount(user)).toBe(1);
  });

  it("ignora a fila quando o armazenamento está corrompido", () => {
    const user = "user-corrupt";
    localStorage.setItem(`pf2e_pending_cloud_saves_v2_${user}`, "{ não é json }");
    expect(listPendingSaves(user)).toEqual([]);
    localStorage.setItem(`pf2e_pending_cloud_saves_v2_${user}`, JSON.stringify({ key: { semSnapshot: true } }));
    expect(listPendingSaves(user)).toEqual([]);
  });

  it("registra a revisão conhecida da nuvem mesmo após recarregar a página", () => {
    const user = "user-revision";
    rememberCloudRevision(user, {
      character_key: "char-a",
      id: "row-a",
      name: "Herói",
      level: 3,
      updated_at: "2026-09-15T10:00:00.000Z",
      data: { id: "char-a", name: "Herói", level: 3, weapons: [{ id: "w1", name: "Espada" }] },
    });

    expect(readKnownRemoteUpdatedAt(user, "char-a")).toBe("2026-09-15T10:00:00.000Z");
    forgetCloudRevision(user, "char-a");
    expect(readKnownRemoteUpdatedAt(user, "char-a")).toBeUndefined();
  });
});

describe("merge semântico de fichas", () => {
  it("une coleções adicionadas em dispositivos diferentes sem perder nada", () => {
    const local = {
      id: "char-1",
      name: "Herói",
      level: 2,
      weapons: [{ id: "w-sword", name: "Espada Longa" }],
      inventory: [{ id: "i-rope", name: "Corda" }],
    };
    const remote = {
      id: "char-1",
      name: "Herói",
      level: 2,
      weapons: [{ id: "w-bow", name: "Arco Longo" }],
      inventory: [{ id: "i-rope", name: "Corda" }],
    };

    const result = mergeCharacterDocuments(local, remote);
    const weapons = result.document.weapons as Array<{ id: string }>;
    expect(weapons.map((weapon) => weapon.id).sort()).toEqual(["w-bow", "w-sword"]);
    expect(result.strategy).toBe("union");
    expect(result.preservedRemoteCollections).toContain("weapons");
  });

  it("aceita a alteração remota quando o campo não foi tocado localmente", () => {
    const base = { id: "char-1", name: "Herói", level: 3, note: "antiga" };
    const local = { id: "char-1", name: "Herói", level: 3, note: "antiga" };
    const remote = { id: "char-1", name: "Herói", level: 4, note: "antiga" };

    const result = mergeCharacterDocuments(local, remote, base);
    expect(result.strategy).toBe("three-way");
    expect(result.document.level).toBe(4);
    expect(result.conflicts).toEqual([]);
  });

  it("mantém a sessão ativa e registra conflito quando os dois lados mudaram", () => {
    const base = { id: "char-1", name: "Herói", level: 3, deityName: "Nenhuma" };
    const local = { id: "char-1", name: "Herói", level: 4, deityName: "Nenhuma" };
    const remote = { id: "char-1", name: "Herói", level: 5, deityName: "Sarenrae" };

    const result = mergeCharacterDocuments(local, remote, base);
    expect(result.document.level).toBe(4);
    expect(result.conflicts.map((conflict) => conflict.path)).toContain("level");
    expect(result.conflicts.find((conflict) => conflict.path === "level")?.remoteValue).toBe(5);
  });

  it("preserva itens adicionados apenas na nuvem e registra o conflito de duplicidade", () => {
    const base = {
      id: "char-1",
      name: "Herói",
      level: 1,
      feats: [{ id: "f-a", name: "Talento A" }],
    };
    const local = {
      id: "char-1",
      name: "Herói",
      level: 1,
      feats: [{ id: "f-a", name: "Talento A" }, { id: "f-b", name: "Talento B local" }],
    };
    const remote = {
      id: "char-1",
      name: "Herói",
      level: 1,
      feats: [{ id: "f-a", name: "Talento A" }, { id: "f-b", name: "Talento B remoto" }],
    };

    const result = mergeCharacterDocuments(local, remote, base);
    const feats = result.document.feats as Array<{ id: string; name: string }>;
    expect(feats).toHaveLength(2);
    expect(feats.find((feat) => feat.id === "f-b")?.name).toBe("Talento B local");
    expect(result.conflicts.some((conflict) => conflict.path.includes("f-b") && conflict.resolution === "preserved-both")).toBe(true);
  });

  it("aceita a exclusão remota de um item que não foi alterado localmente", () => {
    const base = { id: "char-1", name: "Herói", level: 1, items: [{ id: "i-a" }, { id: "i-b" }] };
    const local = { id: "char-1", name: "Herói", level: 1, items: [{ id: "i-a" }, { id: "i-b" }] };
    const remote = { id: "char-1", name: "Herói", level: 1, items: [{ id: "i-b" }] };

    const result = mergeCharacterDocuments(local, remote, base);
    expect((result.document.items as Array<{ id: string }>).map((item) => item.id)).toEqual(["i-b"]);
  });

  it("não descarta histórico de versões de nenhum dispositivo e limita a 50", () => {
    const day = (offset: number) => new Date(Date.UTC(2026, 8, 1) + offset * 86_400_000).toISOString();
    const local = {
      id: "char-1",
      name: "Herói",
      level: 1,
      history: Array.from({ length: 40 }, (_, index) => ({
        savedAt: day(index),
        name: "Local",
        level: 1,
        data: { index },
      })),
    };
    const remote = {
      id: "char-1",
      name: "Herói",
      level: 1,
      history: Array.from({ length: 40 }, (_, index) => ({
        savedAt: day(index + 30),
        name: "Remoto",
        level: 1,
        data: { index },
      })),
    };

    const result = mergeCharacterDocuments(local, remote);
    const history = result.document.history as Array<{ savedAt: string }>;
    expect(history).toHaveLength(50);
    // Versões remotas mais recentes entram no topo; nenhuma das duas séries
    // é descartada por compartilhar o mesmo nome.
    expect(history[0].savedAt).toBe(day(69));
    expect(history.some((entry) => entry.savedAt === day(0))).toBe(false);
  });

  it("resolve conflitos de nível aninhado em objetos", () => {
    const base = { id: "char-1", name: "Herói", level: 1, abilities: { str: 10, dex: 12 } };
    const local = { id: "char-1", name: "Herói", level: 1, abilities: { str: 14, dex: 12 } };
    const remote = { id: "char-1", name: "Herói", level: 1, abilities: { str: 10, dex: 16 } };

    const result = mergeCharacterDocuments(local, remote, base);
    expect(result.document.abilities).toEqual({ str: 14, dex: 16 });
    expect(result.conflicts).toEqual([]);
  });

  it("una rolagens de dados dos dois dispositivos sem duplicar entradas iguais", () => {
    const entry = { formula: "1d20", total: 12, time: "10:00" };
    const local = { id: "char-1", name: "Herói", level: 1, diceHistory: [entry] };
    const remote = { id: "char-1", name: "Herói", level: 1, diceHistory: [entry, { formula: "1d6", total: 4, time: "10:05" }] };

    const result = mergeCharacterDocuments(local, remote);
    expect(result.document.diceHistory).toHaveLength(2);
  });
});
