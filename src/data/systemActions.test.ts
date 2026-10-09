import { describe, expect, it } from "vitest";
import { getSystemActionItems } from "./systemActions";

describe("system action compendium", () => {
  it.each([
    ["t20", "Tormenta20 — Livro Básico"],
    ["dnd5e", "Livro do Jogador — D&D 5e 2014"],
    ["ose", "Old-School Essentials — Livro de Regras"],
    ["dnd35", "D&D 3.5 — Livro do Jogador"],
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

  it("also exposes OSE Criação Básica actions, isolated from Advanced and Classic", () => {
    const advanced = getSystemActionItems("ose", "advanced");
    const basico = getSystemActionItems("ose", "basico");
    expect(basico).toHaveLength(4);
    expect(basico.every((item) => item.data.ruleset === "basico")).toBe(true);
    expect(basico.some((item) => advanced.some((entry) => entry.id === item.id))).toBe(false);
  });

  it.each([
    ["dnd5e", "standard", 192],
    ["t20", "padrao", 233],
    ["ose", "advanced", 120],
    ["ose", "classic", 120],
  ])("retains the source page for %s/%s actions", (systemId, ruleset, page) => {
    const actions = getSystemActionItems(systemId, ruleset);
    expect(actions.length).toBeGreaterThan(0);
    expect(actions.every((action) => action.data.source.page === page && action.data.sourcePage === page)).toBe(true);
  });
});
