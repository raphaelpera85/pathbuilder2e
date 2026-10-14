import { describe, expect, it } from "vitest";
import {
  DND35_DIV_BASE_CLASSES,
  DND35_DIV_PRIVILEGIADO,
  DND35_DIV_SHUGENJA,
  DND35_DIV_XAMA_ESPIRITUAL,
} from "./dnd35DivClasses";

describe("D&D 3.5 — O Livro Completo do Divino: Classes Básicas", () => {
  it("contém exatamente as 3 classes básicas do Capítulo 1", () => {
    expect(DND35_DIV_BASE_CLASSES).toHaveLength(3);
    const ids = DND35_DIV_BASE_CLASSES.map((c) => c.id);
    expect(ids).toEqual(["div-privilegiado", "div-shugenja", "div-xama-espiritual"]);
  });

  describe("Privilegiado (Favored Soul)", () => {
    it("possui atributos fundamentais corretos", () => {
      expect(DND35_DIV_PRIVILEGIADO.name).toBe("Privilegiado");
      expect(DND35_DIV_PRIVILEGIADO.nameEn).toBe("Favored Soul");
      expect(DND35_DIV_PRIVILEGIADO.page).toBe(6);
      expect(DND35_DIV_PRIVILEGIADO.hitDie).toBe("d8");
      expect(DND35_DIV_PRIVILEGIADO.skillPointsPerLevel).toContain("2 + modificador");
    });

    it("possui lista oficial de perícias de classe", () => {
      expect(DND35_DIV_PRIVILEGIADO.classSkills).toEqual([
        "Concentração (Con)",
        "Conhecimento (arcano) (Int)",
        "Cura (Sab)",
        "Diplomacia (Car)",
        "Identificar Magia (Int)",
        "Ofícios (Int)",
        "Profissão (Sab)",
        "Sentir Motivação (Sab)",
      ]);
    });

    it("possui todos os três testes de resistência bons (Fort, Ref e Vontade 2 a 12)", () => {
      expect(DND35_DIV_PRIVILEGIADO.levels).toHaveLength(20);
      expect(DND35_DIV_PRIVILEGIADO.levels[0].fort).toBe(2);
      expect(DND35_DIV_PRIVILEGIADO.levels[0].ref).toBe(2);
      expect(DND35_DIV_PRIVILEGIADO.levels[0].will).toBe(2);
      expect(DND35_DIV_PRIVILEGIADO.levels[19].fort).toBe(12);
      expect(DND35_DIV_PRIVILEGIADO.levels[19].ref).toBe(12);
      expect(DND35_DIV_PRIVILEGIADO.levels[19].will).toBe(12);
      expect(DND35_DIV_PRIVILEGIADO.levels[0].bab).toBe("+0");
      expect(DND35_DIV_PRIVILEGIADO.levels[19].bab).toBe("+15/+10/+5");
    });

    it("possui progressão completa de magias diárias e magias conhecidas até 9º nível", () => {
      expect(DND35_DIV_PRIVILEGIADO.levels[0].spellsPerDay).toEqual([5, 3]);
      expect(DND35_DIV_PRIVILEGIADO.levels[0].spellsKnown).toEqual([4, 3]);
      expect(DND35_DIV_PRIVILEGIADO.levels[19].spellsPerDay).toEqual([6, 6, 6, 6, 6, 6, 6, 6, 6, 6]);
      expect(DND35_DIV_PRIVILEGIADO.levels[19].spellsKnown).toEqual([9, 6, 6, 6, 6, 6, 6, 6, 5, 4]);
    });

    it("possui características exclusivas como Asas e Redução de Dano", () => {
      const featNames = DND35_DIV_PRIVILEGIADO.features.map((f) => f.name);
      expect(featNames).toContain("Foco em Arma Divina");
      expect(featNames).toContain("Resistência à Energia (Sob)");
      expect(featNames).toContain("Especialização em Arma Divina");
      expect(featNames).toContain("Asas (Ext)");
      expect(featNames).toContain("Redução de Dano (Sob)");
    });
  });

  describe("Shugenja (Shugenja)", () => {
    it("possui atributos fundamentais corretos", () => {
      expect(DND35_DIV_SHUGENJA.name).toBe("Shugenja");
      expect(DND35_DIV_SHUGENJA.nameEn).toBe("Shugenja");
      expect(DND35_DIV_SHUGENJA.page).toBe(10);
      expect(DND35_DIV_SHUGENJA.hitDie).toBe("d6");
      expect(DND35_DIV_SHUGENJA.skillPointsPerLevel).toContain("4 + modificador");
    });

    it("possui BBA ruim (+10 aos 20) e apenas Vontade boa (2 a 12)", () => {
      expect(DND35_DIV_SHUGENJA.levels).toHaveLength(20);
      expect(DND35_DIV_SHUGENJA.levels[0].bab).toBe("+0");
      expect(DND35_DIV_SHUGENJA.levels[19].bab).toBe("+10/+5");
      expect(DND35_DIV_SHUGENJA.levels[0].fort).toBe(0);
      expect(DND35_DIV_SHUGENJA.levels[19].fort).toBe(6);
      expect(DND35_DIV_SHUGENJA.levels[0].ref).toBe(0);
      expect(DND35_DIV_SHUGENJA.levels[19].ref).toBe(6);
      expect(DND35_DIV_SHUGENJA.levels[0].will).toBe(2);
      expect(DND35_DIV_SHUGENJA.levels[19].will).toBe(12);
    });

    it("possui foco elemental e sentir elementos", () => {
      const featNames = DND35_DIV_SHUGENJA.features.map((f) => f.name);
      expect(featNames).toContain("Foco Elemental");
      expect(featNames).toContain("Sentir Elementos (Sob)");
    });
  });

  describe("Xamã Espiritual (Spirit Shaman)", () => {
    it("possui atributos fundamentais corretos", () => {
      expect(DND35_DIV_XAMA_ESPIRITUAL.name).toBe("Xamã Espiritual");
      expect(DND35_DIV_XAMA_ESPIRITUAL.nameEn).toBe("Spirit Shaman");
      expect(DND35_DIV_XAMA_ESPIRITUAL.page).toBe(14);
      expect(DND35_DIV_XAMA_ESPIRITUAL.hitDie).toBe("d8");
      expect(DND35_DIV_XAMA_ESPIRITUAL.skillPointsPerLevel).toContain("4 + modificador");
    });

    it("possui BBA médio (+15 aos 20) com Fort e Vontade boas (2 a 12) e Reflexos ruim (0 a 6)", () => {
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels).toHaveLength(20);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[0].bab).toBe("+0");
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[19].bab).toBe("+15/+10/+5");
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[0].fort).toBe(2);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[19].fort).toBe(12);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[0].ref).toBe(0);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[19].ref).toBe(6);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[0].will).toBe(2);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[19].will).toBe(12);
    });

    it("possui tabela de magias recuperadas diárias estruturada", () => {
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[0].spellsRetrieved).toEqual([3, 1]);
      expect(DND35_DIV_XAMA_ESPIRITUAL.levels[19].spellsRetrieved).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 2, 2]);
    });

    it("possui progressão completa de habilidades espirituais exclusivas", () => {
      const featNames = DND35_DIV_XAMA_ESPIRITUAL.features.map((f) => f.name);
      expect(featNames).toContain("Castigar Espíritos (Sob)");
      expect(featNames).toContain("Detectar Espíritos (SM)");
      expect(featNames).toContain("Bênção dos Espíritos (SM)");
      expect(featNames).toContain("Forma de Espírito (Sob)");
      expect(featNames).toContain("Seguir o Guia (Sob)");
      expect(featNames).toContain("Guerreiro Fantasma (Sob)");
      expect(featNames).toContain("Guardião dos Espíritos (SM)");
      expect(featNames).toContain("Guia Guardião (Sob)");
      expect(featNames).toContain("Reencarnação Espontânea (Sob)");
      expect(featNames).toContain("Exorcismo (Sob)");
      expect(featNames).toContain("Enfraquecer Espíritos (Sob)");
      expect(featNames).toContain("Viagem Espiritual (SM)");
      expect(featNames).toContain("Vida dos Espíritos (Sob)");
      expect(featNames).toContain("Fusão Espiritual (Sob)");
    });
  });
});
