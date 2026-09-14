import { describe, expect, it } from "vitest";
import { getSystemConditionItems } from "./systemConditions";

describe("system condition compendium", () => {
  it("exposes D&D 5e conditions with their own ruleset and provenance", () => {
    const conditions = getSystemConditionItems("dnd5e");
    expect(conditions).toHaveLength(15);
    expect(new Set(conditions.map((condition) => condition.id)).size).toBe(15);
    expect(conditions.every((condition) => condition.category === "condition" && condition.system_id === "dnd5e" && condition.data.ruleset === "standard")).toBe(true);
    expect(conditions.find((condition) => condition.name === "Amedrontado")?.summary).toContain("desvantagem");
  });

  it("does not import D&D conditions into other systems", () => {
    expect(getSystemConditionItems("t20")).toHaveLength(0);
    expect(getSystemConditionItems("ose")).toHaveLength(0);
  });
});
