import { describe, expect, it } from "vitest";
import { DND5E_RULES_ENGINE, T20_RULES_ENGINE, getSystemRulesEngine } from "./systemRulesEngine";

describe("system rules engines", () => {
  it("keeps creation steps and rulesets separate", () => {
    expect(T20_RULES_ENGINE.getCreationSteps()).toContain("divindade");
    expect(DND5E_RULES_ENGINE.getCreationSteps()).toContain("antecedente");
    expect(T20_RULES_ENGINE.ruleset).toBe("padrao");
    expect(DND5E_RULES_ENGINE.ruleset).toBe("standard");
  });

  it("rejects a race from another system", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.raceId = "tiefling";
    expect(getSystemRulesEngine("t20").validateCharacter(character)).toContain(
      "raça não pertence ao catálogo do sistema",
    );
  });
});

