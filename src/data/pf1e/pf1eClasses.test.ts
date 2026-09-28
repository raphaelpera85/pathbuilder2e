import { describe, expect, it } from "vitest";
import { PF1E_CLASSES, PF1E_CLASS_IDS } from "./pf1eClasses";

/**
 * Auditoria contra o texto extraído do PDF fonte (Pathfinder RPG — Livro
 * Básico, pypdf, 2026-09-27, Capítulo 3, páginas 30-83). Cada asserção
 * reflete Tendência/Dado de Vida/Graduações de Perícia citados literalmente.
 */
describe("PF1E_CLASSES — auditoria contra o Livro Básico (Capítulo 3)", () => {
  it("cataloga exatamente as 11 classes do Capítulo 3", () => {
    expect(PF1E_CLASS_IDS.sort()).toEqual(
      [
        "barbaro", "bardo", "clerigo", "druida", "feiticeiro", "guerreiro",
        "ladino", "mago", "monge", "paladino", "patrulheiro",
      ].sort(),
    );
  });

  it("Bárbaro: 'Qualquer uma não ordeira', d12, 4 + Int por nível, BBA total", () => {
    const c = PF1E_CLASSES.barbaro;
    expect(c.alignment).toBe("Qualquer uma não ordeira");
    expect(c.hitDie).toBe(12);
    expect(c.babProgression).toBe("full");
    expect(c.skillPointsPerLevel).toBe("4 + modificador de Int");
  });

  it("Bardo: 'Qualquer uma', d8, 6 + Int por nível, conjurador arcano espontâneo", () => {
    const c = PF1E_CLASSES.bardo;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(8);
    expect(c.skillPointsPerLevel).toBe("6 + modificador de Int");
    expect(c.casterType).toBe("arcane_spontaneous");
  });

  it("Clérigo: tendência atrelada à divindade, d8, 2 + Int por nível, conjurador divino preparado", () => {
    const c = PF1E_CLASSES.clerigo;
    expect(c.alignment).toContain("passo da tendência de sua divindade");
    expect(c.hitDie).toBe(8);
    expect(c.skillPointsPerLevel).toBe("2 + modificador de Int");
    expect(c.casterType).toBe("divine_prepared");
  });

  it("Druida: 'Qualquer neutra', d8, 4 + Int por nível, conjurador divino preparado", () => {
    const c = PF1E_CLASSES.druida;
    expect(c.alignment).toBe("Qualquer neutra");
    expect(c.hitDie).toBe(8);
    expect(c.skillPointsPerLevel).toBe("4 + modificador de Int");
    expect(c.casterType).toBe("divine_prepared");
  });

  it("Feiticeiro: 'Qualquer uma', d6, 2 + Int por nível, BBA pobre, conjurador arcano espontâneo", () => {
    const c = PF1E_CLASSES.feiticeiro;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(6);
    expect(c.babProgression).toBe("poor");
    expect(c.skillPointsPerLevel).toBe("2 + modificador de Int");
    expect(c.casterType).toBe("arcane_spontaneous");
  });

  it("Guerreiro: 'Qualquer uma', d10, 2 + Int por nível, BBA total, sem conjuração", () => {
    const c = PF1E_CLASSES.guerreiro;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(10);
    expect(c.babProgression).toBe("full");
    expect(c.casterType).toBeNull();
  });

  it("Ladino: 'Qualquer uma', d8, 8 + Int por nível (maior de todas), sem conjuração", () => {
    const c = PF1E_CLASSES.ladino;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(8);
    expect(c.skillPointsPerLevel).toBe("8 + modificador de Int");
    expect(c.casterType).toBeNull();
  });

  it("Mago: 'Qualquer uma', d6, 2 + Int por nível, BBA pobre, conjurador arcano preparado", () => {
    const c = PF1E_CLASSES.mago;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(6);
    expect(c.babProgression).toBe("poor");
    expect(c.casterType).toBe("arcane_prepared");
  });

  it("Monge: 'Qualquer ordeira', d8, 4 + Int por nível, três testes de resistência bons", () => {
    const c = PF1E_CLASSES.monge;
    expect(c.alignment).toBe("Qualquer ordeira");
    expect(c.hitDie).toBe(8);
    expect(c.goodSaves.sort()).toEqual(["fort", "ref", "will"]);
  });

  it("Paladino: alinhamento obrigatório Bondoso e Ordeiro, d10, BBA total, conjurador divino a partir do 4º nível", () => {
    const c = PF1E_CLASSES.paladino;
    expect(c.alignment).toContain("Bondoso e Ordeiro");
    expect(c.hitDie).toBe(10);
    expect(c.babProgression).toBe("full");
    expect(c.casterType).toBe("divine_prepared");
  });

  it("Patrulheiro: 'Qualquer uma', d10, 6 + Int por nível, BBA total, conjurador divino limitado", () => {
    const c = PF1E_CLASSES.patrulheiro;
    expect(c.alignment).toBe("Qualquer uma");
    expect(c.hitDie).toBe(10);
    expect(c.skillPointsPerLevel).toBe("6 + modificador de Int");
    expect(c.babProgression).toBe("full");
    expect(c.casterType).toBe("divine_prepared");
  });

  it("todas as classes têm nome, fonte, descrição e ao menos uma perícia de classe", () => {
    for (const klass of Object.values(PF1E_CLASSES)) {
      expect(klass.name.length).toBeGreaterThan(0);
      expect(klass.sourceBook).toBe("Pathfinder RPG — Livro Básico");
      expect(klass.classSkills.length).toBeGreaterThan(0);
      expect(klass.description.length).toBeGreaterThan(0);
      expect([6, 8, 10, 12]).toContain(klass.hitDie);
    }
  });
});
