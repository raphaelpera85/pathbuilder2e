import { describe, expect, it } from "vitest";
import { toCharacterPayload, validateCharacter } from "./characters";

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
});
