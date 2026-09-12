import { describe, expect, it } from "vitest";
import { T20_CLASSES, T20_CREATION_STEPS, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { DND5E_CLASSES, DND5E_CREATION_STEPS, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";

describe("Catálogos de criação por sistema", () => {
  it("mantém o núcleo de criação T20 separado e rastreável", () => {
    expect(T20_RACES).toHaveLength(17);
    expect(T20_CLASSES).toHaveLength(14);
    expect(T20_SKILLS).toHaveLength(29);
    expect(T20_CLASSES.find((entry) => entry.id === "inventor")?.sourcePage).toBe(67);
    expect(T20_CREATION_STEPS).toContain("origem");
  });

  it("mantém o núcleo de criação D&D 5e clássico separado e rastreável", () => {
    expect(DND5E_RACES).toHaveLength(9);
    expect(DND5E_CLASSES).toHaveLength(12);
    expect(DND5E_SKILLS).toHaveLength(18);
    expect(DND5E_CLASSES.find((entry) => entry.id === "mago")?.sourcePage).toBe(94);
    expect(DND5E_CREATION_STEPS).toContain("antecedente");
  });
});
