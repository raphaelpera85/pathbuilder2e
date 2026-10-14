import { describe, it, expect } from "vitest";
import { DND5E_GGTR_RACES, DND5E_GGTR_SOURCE_BOOK } from "./dnd5eGgtrRaces";

describe("D&D 5e - Guildmasters' Guide to Ravnica Races (dnd5e-ggtr)", () => {
  it("contém exatamente 6 raças oficiais de Ravnica", () => {
    expect(DND5E_GGTR_RACES).toHaveLength(6);
    expect(DND5E_GGTR_SOURCE_BOOK).toBe("D&D 5e · Guia dos Mestres de Guilda de Ravnica");
  });

  it("valida integridade de dados e mecânicas das raças", () => {
    for (const race of DND5E_GGTR_RACES) {
      expect(race.id).toMatch(/^dnd5e\.ggtr\.ancestry\.[a-z_]+$/);
      expect(race.name.length).toBeGreaterThan(0);
      expect(race.englishName.length).toBeGreaterThan(0);
      expect(race.sourcePage).toBeGreaterThanOrEqual(15);
      expect(race.sourcePage).toBeLessThanOrEqual(22);
      expect(race.speed).toBeGreaterThan(0);
      expect(race.traits.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifica traços específicos de Centauro, Loxodonte, Minotauro e Vedalken", () => {
    const centaur = DND5E_GGTR_RACES.find((r) => r.id === "dnd5e.ggtr.ancestry.centauro");
    expect(centaur).toBeDefined();
    expect(centaur?.speed).toBe(12);
    expect(centaur?.attributeAdjustments).toEqual({ str: 2, wis: 1 });

    const loxodon = DND5E_GGTR_RACES.find((r) => r.id === "dnd5e.ggtr.ancestry.loxodonte");
    expect(loxodon).toBeDefined();
    expect(loxodon?.attributeAdjustments).toEqual({ con: 2, wis: 1 });

    const minotaur = DND5E_GGTR_RACES.find((r) => r.id === "dnd5e.ggtr.ancestry.minotauro_ravnica");
    expect(minotaur).toBeDefined();
    expect(minotaur?.attributeAdjustments).toEqual({ str: 2, con: 1 });

    const vedalken = DND5E_GGTR_RACES.find((r) => r.id === "dnd5e.ggtr.ancestry.vedalken");
    expect(vedalken).toBeDefined();
    expect(vedalken?.attributeAdjustments).toEqual({ int: 2, wis: 1 });
  });
});
