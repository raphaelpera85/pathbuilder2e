import { describe, expect, it } from "vitest";
import { getCoreCompendiumEntries } from "./coreCompendium";

describe("core compendium systems", () => {
  it("keeps T20, D&D 5e and OSE entries explicitly separated", () => {
    const entries = getCoreCompendiumEntries();
    const systems = new Set(entries.map((entry) => entry.data?.system_id));

    expect(systems).toEqual(new Set(["t20", "dnd5e", "ose"]));
    expect(entries.filter((entry) => entry.data?.system_id === "t20").length).toBeGreaterThan(200);
    expect(entries.filter((entry) => entry.data?.system_id === "dnd5e").length).toBeGreaterThan(100);
    expect(entries.filter((entry) => entry.data?.system_id === "ose").length).toBeGreaterThan(100);
  });

  it("preserves the system ruleset and source book for filtering", () => {
    const entries = getCoreCompendiumEntries();
    const t20 = entries.find((entry) => entry.data?.system_id === "t20");
    const dnd = entries.find((entry) => entry.data?.system_id === "dnd5e");
    const ose = entries.find((entry) => entry.data?.system_id === "ose");

    expect(t20?.data?.ruleset).toBe("padrao");
    expect(t20?.data?.source?.book).toContain("Tormenta20");
    expect(dnd?.data?.ruleset).toBe("standard");
    expect(dnd?.data?.source?.book).toContain("D&D 5e");
    expect(ose?.data?.ruleset).toBe("advanced");
    expect(ose?.data?.source?.book).toContain("Old-School Essentials");
  });

  it("mantém IDs únicos e proveniência mínima em todos os sistemas", () => {
    const entries = getCoreCompendiumEntries();
    expect(new Set(entries.map((entry) => entry.data?.id)).size).toBe(entries.length);
    expect(entries.every((entry) => {
      const data = entry.data || {};
      return ["t20", "dnd5e", "ose"].includes(String(data.system_id))
        && Boolean(data.ruleset)
        && Boolean(data.source?.book)
        && Number.isInteger(data.source?.page)
        && Number(data.source?.page) > 0;
    })).toBe(true);
  });
});
