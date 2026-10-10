import { describe, expect, it } from "vitest";
import { getSystemRuleItems } from "./systemRulesCatalog";

describe("system rules compendium", () => {
  it.each([
    ["pf2e", "remaster"],
    ["t20", "padrao"],
    ["dnd5e", "standard"],
    ["ose", "advanced"],
    ["dnd35", "v35"],
    ["pf1e", "legacy_pf1"],
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
    expect(getSystemRuleItems("ose", "basico").every((item) => item.data.ruleset === "basico")).toBe(true);
    expect(getSystemRuleItems("ose", "basico").some((item) => item.data.ruleKind === "creation")).toBe(true);
  });

  it("exposes Pathfinder 1e wealth, exchange, weight, and resale rules from page 140", () => {
    const rules = getSystemRuleItems("pf1e", "legacy_pf1");
    expect(rules).toHaveLength(3);
    expect(rules.find((rule) => rule.id === "pf1e.rule.currency.legacy_pf1")).toMatchObject({
      summary: expect.stringContaining("10 PC = 1 PP"),
      data: { ruleset: "legacy_pf1", source: { book: "Pathfinder RPG — Livro Básico", page: 140 } },
    });
    expect(rules.find((rule) => rule.id === "pf1e.rule.treasure-selling.legacy_pf1")?.summary).toContain("metade do preço");
  });
});
