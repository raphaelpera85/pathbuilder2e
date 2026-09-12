import { describe, expect, it } from "vitest";
import { normalizeCharacterRuleset } from "./characters";

describe("character ruleset normalization", () => {
  it("preserves the edition identifiers for each supported system", () => {
    expect(normalizeCharacterRuleset("standard")).toBe("standard");
    expect(normalizeCharacterRuleset("padrao")).toBe("padrao");
    expect(normalizeCharacterRuleset("jogo_do_ano")).toBe("jogo_do_ano");
    expect(normalizeCharacterRuleset("advanced")).toBe("advanced");
    expect(normalizeCharacterRuleset("classic")).toBe("classic");
  });
});

