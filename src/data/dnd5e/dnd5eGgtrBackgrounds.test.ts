import { describe, it, expect } from "vitest";
import { DND5E_GGTR_BACKGROUNDS, DND5E_GGTR_SOURCE_BOOK } from "./dnd5eGgtrBackgrounds";

describe("D&D 5e - Guildmasters' Guide to Ravnica Backgrounds (dnd5e-ggtr)", () => {
  it("contém exatamente os 10 antecedentes de guilda oficiais", () => {
    expect(DND5E_GGTR_BACKGROUNDS).toHaveLength(10);
    expect(DND5E_GGTR_SOURCE_BOOK).toBe("D&D 5e · Guia dos Mestres de Guilda de Ravnica");
  });

  it("valida integridade de dados e mecânicas de cada guilda", () => {
    for (const bg of DND5E_GGTR_BACKGROUNDS) {
      expect(bg.id).toMatch(/^dnd5e\.ggtr\.background\.[a-z_]+$/);
      expect(bg.name.length).toBeGreaterThan(0);
      expect(bg.englishName.length).toBeGreaterThan(0);
      expect(bg.guild.length).toBeGreaterThan(0);
      expect(bg.sourcePage).toBeGreaterThanOrEqual(33);
      expect(bg.sourcePage).toBeLessThanOrEqual(93);
      expect(bg.skillProficiencies).toHaveLength(2);
      expect(bg.featureName.length).toBeGreaterThan(0);
      expect(bg.featureDescription.length).toBeGreaterThan(0);
      expect(bg.startingEquipment.length).toBeGreaterThanOrEqual(4);
      expect(bg.guildSpells.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("verifica listas de magias de guilda de Azorius, Boros, Dimir e Izzet", () => {
    const azorius = DND5E_GGTR_BACKGROUNDS.find((b) => b.id === "dnd5e.ggtr.background.funcionario_de_azorius");
    expect(azorius).toBeDefined();
    const azoriusLvl1 = azorius?.guildSpells.find((s) => s.spellLevel === 1)?.spells;
    expect(azoriusLvl1).toContain("Comando");

    const boros = DND5E_GGTR_BACKGROUNDS.find((b) => b.id === "dnd5e.ggtr.background.legionario_de_boros");
    expect(boros).toBeDefined();
    const borosLvl1 = boros?.guildSpells.find((s) => s.spellLevel === 1)?.spells;
    expect(borosLvl1).toContain("Raio Guiador");

    const dimir = DND5E_GGTR_BACKGROUNDS.find((b) => b.id === "dnd5e.ggtr.background.operativo_de_dimir");
    expect(dimir).toBeDefined();
    const dimirCantrips = dimir?.guildSpells.find((s) => s.spellLevel === 0)?.spells;
    expect(dimirCantrips).toContain("Codificar Pensamentos");

    const izzet = DND5E_GGTR_BACKGROUNDS.find((b) => b.id === "dnd5e.ggtr.background.engenheiro_izzet");
    expect(izzet).toBeDefined();
    const izzetLvl1 = izzet?.guildSpells.find((s) => s.spellLevel === 1)?.spells;
    expect(izzetLvl1).toContain("Raio do Caos");
  });
});
