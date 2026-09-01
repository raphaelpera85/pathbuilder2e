import { describe, expect, it } from "vitest";
import { buildCharacterRevisionHistory, deleteCharacter, listCharacters, mergeCharacterLists, normalizeCharacterRuleset, renameCharacter, saveCharacter, toCharacterPayload, validateCharacter } from "./characters";

describe("character cloud contract", () => {
  it.each([
    ["Pathfinder 2e Remaster", "remaster"],
    ["Pathfinder 2e Clássico", "legacy"],
    ["Variant / Hybrid Rules", "both"],
    ["desconhecido", "needs_review"],
  ])("normaliza regraset localizado %s", (value, expected) => {
    expect(normalizeCharacterRuleset(value)).toBe(expected);
  });

  it("mantém a cópia mais recente ao mesclar nuvem e dispositivo", () => {
    const base = { id: "row-1", user_id: "user-1", character_key: "char-1", name: "Herói", level: 1, ruleset: "remaster" as const, data: { id: "char-1", name: "Herói", level: 1 }, created_at: "2026-01-01T00:00:00.000Z" };
    const remote = { ...base, updated_at: "2026-01-01T00:00:00.000Z" };
    const local = { ...base, updated_at: "2026-01-02T00:00:00.000Z", data: { ...base.data, name: "Herói atualizado" } };
    expect(mergeCharacterLists([remote], [local])[0].data.name).toBe("Herói atualizado");
  });

  it("preserva a cópia local quando a nuvem não informa uma data válida", () => {
    const remote = { id: "row-2", user_id: "user-2", character_key: "char-2", name: "Remota", level: 1, ruleset: "remaster" as const, data: { id: "char-2", name: "Remota", level: 1 }, created_at: "2026-01-01T00:00:00.000Z", updated_at: "invalid" };
    const local = { ...remote, name: "Local atualizada", data: { ...remote.data, name: "Local atualizada" }, updated_at: "2026-01-02T00:00:00.000Z" };
    expect(mergeCharacterLists([remote], [local])[0].data.name).toBe("Local atualizada");
  });

  it("preserva campos desconhecidos da ficha PF2e", () => {
    const character = validateCharacter({
      id: "Lorenzo_LaRosa",
      name: " Lorenzo LaRosa ",
      level: 1,
      weapons: [{ name: "Rapieira" }],
      customRule: { enabled: true },
    });
    expect(character.name).toBe("Lorenzo LaRosa");
    expect(character.weapons).toEqual([{ name: "Rapieira" }]);
    expect(character.customRule).toEqual({ enabled: true });
  });

  it("envia configuração integral e histórico de rolagens no payload da conta", () => {
    const character = validateCharacter({
      id: "heroi-configurado",
      name: "Herói Configurado",
      level: 5,
      variantRules: { freeArchetype: true, automaticBonusProgression: false },
      diceHistory: [{ formula: "2d20+7", total: 19, time: "12:00:00" }],
      pets: [{ id: "pet.wolf", name: "Lobo" }],
    });
    const payload = toCharacterPayload(character, { id: "user-config" });
    expect(payload.data).toMatchObject({
      variantRules: { freeArchetype: true },
      diceHistory: [{ formula: "2d20+7", total: 19 }],
      pets: [{ id: "pet.wolf" }],
    });
  });

  it("mantém até 50 versões da ficha sem aninhar o próprio histórico", () => {
    const previous = validateCharacter({
      id: "historico",
      name: "Versão anterior",
      level: 1,
      history: Array.from({ length: 50 }, (_, index) => ({ savedAt: `2026-01-${String(index + 1).padStart(2, "0")}`, name: "Antiga", level: 1, data: { index } })),
    });
    const current = validateCharacter({ id: "historico", name: "Versão atual", level: 2, notes: "configuração integral" });
    const history = buildCharacterRevisionHistory(current, previous, "2026-09-01T00:00:00.000Z");
    expect(history).toHaveLength(50);
    expect(history[0]).toMatchObject({ savedAt: "2026-09-01T00:00:00.000Z", name: "Versão atual", level: 2 });
    expect(history[0].data).not.toHaveProperty("history");
  });

  it("rejeita fichas sem nome ou fora dos níveis 1 a 20", () => {
    expect(() => validateCharacter({ id: "x", name: "", level: 1 })).toThrow(/nome/);
    expect(() => validateCharacter({ id: "x", name: "Herói", level: 21 })).toThrow(/1 e 20/);
  });

  it("rejeita chaves perigosas e profundidade excessiva antes de persistir", () => {
    const polluted = JSON.parse('{"id":"x","name":"Herói","level":1,"__proto__":{"polluted":true}}');
    expect(() => validateCharacter(polluted)).toThrow(/chave não permitida/);
    let nested: Record<string, unknown> = {};
    for (let index = 0; index < 14; index += 1) nested = { child: nested };
    expect(() => validateCharacter({ id: "x", name: "Herói", level: 1, nested })).toThrow(/aninhados demais/);
  });

  it("cria payload isolado pelo usuário e marca regras incertas", () => {
    const user = { id: "user-123" } as never;
    const character = validateCharacter({ id: "heroi", name: "Herói", level: 2 });
    expect(toCharacterPayload(character, user)).toMatchObject({
      user_id: "user-123",
      character_key: "heroi",
      ruleset: "needs_review",
    });
  });

  it("exclui fichas locais tanto pela chave estável quanto pelo id do registro", async () => {
    const user = { id: "user-delete" } as never;
    const first = await saveCharacter({ id: "char-key", name: "Por chave", level: 1 }, user);
    const second = await saveCharacter({ id: "char-other", name: "Por id", level: 1 }, user);

    await deleteCharacter(first.character_key, user);
    await deleteCharacter(second.id, user);

    expect(await listCharacters(user)).toEqual([]);
  });

  it("ignora armazenamento local corrompido sem travar a Biblioteca", async () => {
    localStorage.setItem("pf2e_user_user-corrupt_characters_v1", JSON.stringify({ invalid: true }));
    expect(await listCharacters({ id: "user-corrupt" } as never)).toEqual([]);
    localStorage.setItem("pf2e_user_user-corrupt_characters_v1", JSON.stringify([{ invalid: true }, { user_id: "other-user", character_key: "other", name: "Outra conta", level: 1, data: { id: "other", name: "Outra conta", level: 1 } }, { user_id: "user-corrupt", character_key: "partial" }, { user_id: "user-corrupt", character_key: "ok", name: "Ok", level: 1, data: { id: "ok", name: "Ok", level: 1 } }]));
    expect((await listCharacters({ id: "user-corrupt" } as never))).toHaveLength(1);
  });

  it("migra uma ficha local antiga válida sem user_id dentro da chave particionada", async () => {
    localStorage.setItem("pf2e_user_user-legacy_characters_v1", JSON.stringify([{
      character_key: "legacy-sheet", name: "Ficha antiga", level: 2,
      data: { id: "legacy-sheet", name: "Ficha antiga", level: 2 },
    }]));
    const listed = await listCharacters({ id: "user-legacy" } as never);
    expect(listed).toHaveLength(1);
    expect(listed[0].user_id).toBe("user-legacy");
  });

  it("renomeia uma ficha sem perder a configuração persistida", async () => {
    const user = { id: "user-rename" } as never;
    await saveCharacter({ id: "char-rename", name: "Original", level: 3, variantRules: { freeArchetype: true } }, user);
    const renamed = await renameCharacter("char-rename", "  Renomeado  ", user);
    expect(renamed.name).toBe("Renomeado");
    expect(renamed.data.variantRules).toEqual({ freeArchetype: true });
  });

  it("acumula versões quando a mesma ficha é salva novamente", async () => {
    const user = { id: "user-history-save" } as never;
    await saveCharacter({ id: "char-history-save", name: "Inicial", level: 1 }, user);
    const saved = await saveCharacter({ id: "char-history-save", name: "Atualizada", level: 2, notes: "mudança" }, user);
    const history = saved.data.history as Array<{ name: string; level: number }>;
    expect(history.length).toBe(2);
    expect(history[0]).toMatchObject({ name: "Atualizada", level: 2 });
    expect(history[1]).toMatchObject({ name: "Inicial", level: 1 });
  });
});
