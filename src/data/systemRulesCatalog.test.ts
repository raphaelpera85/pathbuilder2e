import { describe, expect, it } from "vitest";
import { getSystemRuleItems } from "./systemRulesCatalog";

describe("system rules compendium", () => {
  it.each([
    ["pf2e", "remaster"],
    ["t20", "padrao"],
    ["dnd5e", "standard"],
    ["ose", "advanced"],
  ])("keeps creation rules isolated for %s", (systemId, ruleset) => {
    const rules = getSystemRuleItems(systemId);
    expect(rules.length).toBeGreaterThan(0);
    expect(new Set(rules.map((rule) => rule.id)).size).toBe(rules.length);
    expect(rules.every((rule) => rule.type === "rule" && rule.category === "rule" && rule.system_id === systemId)).toBe(true);
    expect(rules.some((rule) => rule.data.ruleset === ruleset && rule.data.ruleKind === "creation")).toBe(true);
  });

  it("exposes D&D advantage without inventing it for OSE", () => {
    expect(getSystemRuleItems("dnd5e").find((rule) => rule.data.ruleKind === "advantage")).toMatchObject({ data: { ruleset: "standard" } });
    expect(getSystemRuleItems("ose").some((rule) => rule.data.ruleKind === "advantage")).toBe(false);
  });

  it("filters OSE rules by ruleset", () => {
    expect(getSystemRuleItems("ose", "advanced").every((item) => item.data.ruleset === "advanced")).toBe(true);
    expect(getSystemRuleItems("ose", "classic").every((item) => item.data.ruleset === "classic")).toBe(true);
  });
});
