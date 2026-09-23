import { describe, expect, it } from "vitest";
import { getCharacterEditorRoute, getPersistedCharacterSystemId, hydrateCharacterForEditor } from "./characterEditorRouting";

describe("character editor routing", () => {
  it.each([
    ["pf2e", "pf2e"],
    ["t20", "core"],
    ["dnd5e", "core"],
    ["ose", "ose"],
  ])("routes %s to its own editor", (systemId, expectedRoute) => {
    expect(getCharacterEditorRoute(systemId)).toBe(expectedRoute);
  });

  it("does not let missing system metadata accidentally open a core editor", () => {
    expect(getPersistedCharacterSystemId(undefined, {})).toBe("pf2e");
    expect(getCharacterEditorRoute(getPersistedCharacterSystemId(undefined, {}))).toBe("pf2e");
  });

  it("prioritizes the persisted row system over stale payload metadata", () => {
    expect(getPersistedCharacterSystemId("ose", { system_id: "dnd5e", systemId: "dnd5e" })).toBe("ose");
  });

  it("falls back to valid payload metadata when a legacy row has no usable system id", () => {
    expect(getPersistedCharacterSystemId(undefined, { system_id: "t20" })).toBe("t20");
    expect(getPersistedCharacterSystemId("unknown", { systemId: "dnd5e" })).toBe("dnd5e");
  });

  it.each([
    ["pf2e", "remaster"],
    ["t20", "padrao"],
    ["dnd5e", "standard"],
    ["ose", "advanced"],
    ["ose", "classic"],
  ])("hydrates %s with row metadata before opening its editor", (systemId, ruleset) => {
    const hydrated = hydrateCharacterForEditor(systemId, ruleset, {
      id: "character-1",
      name: "Ficha editável",
      systemId: "stale-system",
      ruleset: undefined,
    });

    expect(hydrated.system_id).toBe(systemId);
    expect(hydrated.systemId).toBe(systemId);
    expect(hydrated.ruleset).toBe(ruleset);
    expect(hydrated.id).toBe("character-1");
    if (systemId === "t20" || systemId === "dnd5e" || systemId === "ose") {
      expect(hydrated.catalogVersion).toMatch(new RegExp(`^${systemId}-`));
    }
  });

  it("preserves an explicit catalog version from the saved document", () => {
    const hydrated = hydrateCharacterForEditor("ose", "classic", {
      id: "old-classic",
      name: "Ficha antiga",
      catalogVersion: "ose-classic-2025.12",
    });
    expect(hydrated.catalogVersion).toBe("ose-classic-2025.12");
  });
});
