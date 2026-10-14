import { describe, it, expect } from "vitest";
import {
  DND5E_COA_ITEMS,
  DND5E_COA_PATRONS,
  DND5E_COA_CORRUPTION
} from "./dnd5eCoaData";

describe("Chains of Asmodeus (dnd5e-coa) Data Validation", () => {
  it("should have 28 infernal magic items and artifacts", () => {
    expect(DND5E_COA_ITEMS.length).toBe(28);

    const ids = new Set(DND5E_COA_ITEMS.map((item) => item.id));
    expect(ids.size).toBe(28);

    for (const item of DND5E_COA_ITEMS) {
      expect(item.id).toMatch(/^coa-/);
      expect(item.name.trim().length).toBeGreaterThan(0);
      expect(item.typeLine.trim().length).toBeGreaterThan(0);
      expect(item.description.trim().length).toBeGreaterThan(20);
      expect(["item", "weapon", "armor"]).toContain(item.type);
      expect(["common", "uncommon", "rare", "very rare", "legendary", "artifact"]).toContain(item.rarity);
    }
  });

  it("should contain all 7 supreme Archdevil artifacts", () => {
    const artifactNames = [
      "Accounting and Valuation of All Things",
      "Amulet of the Inferno",
      "Ranseur of Torture",
      "Ruby Rod of Asmodeus",
      "Scourge of Shadow",
      "True-Ice Shards",
      "Wrought-Iron Tower"
    ];

    for (const name of artifactNames) {
      const artifact = DND5E_COA_ITEMS.find((it) => it.name === name);
      expect(artifact).toBeDefined();
      expect(artifact?.rarity).toBe("artifact");
      expect(artifact?.attunement).toBe(true);
    }
  });

  it("should have 3 group patrons with detailed perks", () => {
    expect(DND5E_COA_PATRONS.length).toBe(3);

    const patronNames = DND5E_COA_PATRONS.map((p) => p.name);
    expect(patronNames).toContain("Hellriders of Elturel");
    expect(patronNames).toContain("Conclave of Halruaa");
    expect(patronNames).toContain("Deathstalkers of Bhaal");

    for (const patron of DND5E_COA_PATRONS) {
      expect(patron.id).toMatch(/^coa-patron-/);
      expect(patron.perks.length).toBeGreaterThanOrEqual(2);
      expect(patron.contacts.length).toBeGreaterThan(0);
    }
  });

  it("should have all 4 stages of infernal corruption", () => {
    expect(DND5E_COA_CORRUPTION.length).toBe(4);

    const stages = DND5E_COA_CORRUPTION.map((c) => c.stage);
    expect(stages).toEqual([1, 2, 3, 4]);

    for (const stage of DND5E_COA_CORRUPTION) {
      expect(stage.id).toMatch(/^coa-corruption-stage-/);
      expect(stage.effects.length).toBeGreaterThan(0);
    }
  });
});
