import { describe, expect, it } from "vitest";
import { getSystemActionItems } from "./systemActions";

describe("system action compendium", () => {
  it.each([
    ["t20", "Tormenta20 — Livro Básico"],
    ["dnd5e", "Livro do Jogador — D&D 5e 2014"],
    ["ose", "Old-School Essentials — Livro de Regras"],
  ])("keeps %s actions isolated and sourced", (systemId, sourceBook) => {
    const actions = getSystemActionItems(systemId);
    expect(actions.length).toBeGreaterThan(0);
    expect(new Set(actions.map((action) => action.id)).size).toBe(actions.length);
    expect(actions.every((action) => action.type === "action" && action.category === "action" && action.system_id === systemId)).toBe(true);
    expect(actions.every((action) => action.data.sourceBook === sourceBook)).toBe(true);
  });

  it("does not make PF2e receive core-system actions", () => {
    expect(getSystemActionItems("pf2e")).toHaveLength(0);
  });

  it("keeps OSE Advanced and Classic actions separated", () => {
    const advanced = getSystemActionItems("ose", "advanced");
    const classic = getSystemActionItems("ose", "classic");
    expect(advanced).toHaveLength(4);
    expect(classic).toHaveLength(4);
    expect(advanced.every((item) => item.data.ruleset === "advanced")).toBe(true);
    expect(classic.every((item) => item.data.ruleset === "classic")).toBe(true);
    expect(classic.some((item) => advanced.some((entry) => entry.id === item.id))).toBe(false);
  });
});
