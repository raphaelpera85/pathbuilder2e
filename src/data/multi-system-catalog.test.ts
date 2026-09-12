import { describe, expect, it } from "vitest";
import { T20_CLASSES, T20_CREATION_STEPS, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { DND5E_CLASSES, DND5E_CREATION_STEPS, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS } from "./dnd5e/dnd5eBackgrounds";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { T20_RACE_RULES } from "./t20/t20Races";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { T20_EQUIPMENT } from "./t20/t20Compendium";

describe("Catálogos de criação por sistema", () => {
  it("mantém o núcleo de criação T20 separado e rastreável", () => {
    expect(T20_RACES).toHaveLength(17);
    expect(T20_CLASSES).toHaveLength(14);
    expect(T20_SKILLS).toHaveLength(29);
    expect(T20_SKILLS.find((entry) => entry.id === "furtividade")?.keyAbility).toBe("dex");
    expect(T20_CLASSES.find((entry) => entry.id === "inventor")?.sourcePage).toBe(67);
    expect(T20_CREATION_STEPS).toContain("origem");
    expect(T20_ORIGINS).toHaveLength(35);
    expect(T20_ORIGINS.find((entry) => entry.id === "soldado")?.sourcePage).toBe(93);
    expect(T20_CLASS_RULES.find((entry) => entry.id === "arcanista")?.manaPerLevel).toBe(6);
    expect(T20_RACE_RULES.find((entry) => entry.id === "anao")?.speed).toBe(6);
    expect(T20_EQUIPMENT.length).toBeGreaterThan(0);
  });

  it("mantém o núcleo de criação D&D 5e clássico separado e rastreável", () => {
    expect(DND5E_RACES).toHaveLength(9);
    expect(DND5E_CLASSES).toHaveLength(12);
    expect(DND5E_SKILLS).toHaveLength(18);
    expect(DND5E_SKILLS.find((entry) => entry.id === "arcanismo")?.keyAbility).toBe("int");
    expect(DND5E_CLASSES.find((entry) => entry.id === "mago")?.sourcePage).toBe(94);
    expect(DND5E_CREATION_STEPS).toContain("antecedente");
    expect(DND5E_BACKGROUNDS).toHaveLength(13);
    expect(DND5E_BACKGROUNDS.find((entry) => entry.id === "acolito")?.sourcePage).toBe(129);
    expect(DND5E_CLASS_RULES.find((entry) => entry.id === "mago")?.hitDie).toBe("d6");
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "tiefling")?.sourcePage).toBe(42);
    expect(DND5E_SPELLS.find((entry) => entry.id === "dnd5e.magia.escudo")?.category).toBe("magia");
  });
});
