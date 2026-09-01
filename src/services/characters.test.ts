import { describe, expect, it } from "vitest";
import { deleteCharacter, listCharacters, renameCharacter, saveCharacter, toCharacterPayload, validateCharacter } from "./characters";

describe("character cloud contract", () => {
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

  it("rejeita fichas sem nome ou fora dos níveis 1 a 20", () => {
    expect(() => validateCharacter({ id: "x", name: "", level: 1 })).toThrow(/nome/);
    expect(() => validateCharacter({ id: "x", name: "Herói", level: 21 })).toThrow(/1 e 20/);
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

  it("renomeia uma ficha sem perder a configuração persistida", async () => {
    const user = { id: "user-rename" } as never;
    await saveCharacter({ id: "char-rename", name: "Original", level: 3, variantRules: { freeArchetype: true } }, user);
    const renamed = await renameCharacter("char-rename", "  Renomeado  ", user);
    expect(renamed.name).toBe("Renomeado");
    expect(renamed.data.variantRules).toEqual({ freeArchetype: true });
  });
});
