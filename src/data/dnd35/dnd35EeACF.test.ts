import { describe, expect, it } from "vitest";
import { DND35_EE_ACF } from "./dnd35EeACF";

describe("D&D 3.5 — Exemplars of Evil: Características Alternativas de Classe (v35-ee)", () => {
  it("contém exatamente 9 características alternativas de classe catalogadas", () => {
    expect(DND35_EE_ACF).toHaveLength(9);
  });

  it("possui IDs únicos e no formato ee-acf-*", () => {
    const ids = DND35_EE_ACF.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^ee-acf-[a-z0-9-]+$/);
    }
  });

  it("contém as características alternativas de classe chave", () => {
    const names = DND35_EE_ACF.map((a) => a.name);
    expect(names).toContain("Blasphemous Incantation");
    expect(names).toContain("Celestial Slayer");
    expect(names).toContain("Favored of the Fiends");
    expect(names).toContain("Feign Death");
    expect(names).toContain("Invisible Fist");
    expect(names).toContain("Mimic");
    expect(names).toContain("Unholy Fury");
  });

  it("valida requisitos e substituições de Invisible Fist e Unholy Fury", () => {
    const fist = DND35_EE_ACF.find((a) => a.id === "ee-acf-invisible-fist");
    expect(fist).toBeDefined();
    expect(fist?.baseClass).toBe("Monk");
    expect(fist?.level).toBe(2);
    expect(fist?.replaces).toContain("Evasion");

    const fury = DND35_EE_ACF.find((a) => a.id === "ee-acf-unholy-fury");
    expect(fury).toBeDefined();
    expect(fury?.baseClass).toBe("Barbarian");
    expect(fury?.replaces).toBe("Fast movement");
    expect(fury?.specialRequirement).toContain("chaotic evil");
  });
});
