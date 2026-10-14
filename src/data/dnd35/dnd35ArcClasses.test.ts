import { describe, expect, it } from "vitest";
import {
  DND35_ARC_BASE_CLASSES,
  DND35_ARC_BRUXO,
  DND35_ARC_MAGO_GUERRA,
  DND35_ARC_WU_JEN,
} from "./dnd35ArcClasses";

describe("D&D 3.5 — O Livro Completo do Arcano: Classes Básicas", () => {
  it("contém exatamente as 3 classes básicas do Capítulo 1", () => {
    expect(DND35_ARC_BASE_CLASSES).toHaveLength(3);
    const ids = DND35_ARC_BASE_CLASSES.map((c) => c.id);
    expect(ids).toEqual(["arc-bruxo", "arc-mago-da-guerra", "arc-wu-jen"]);
  });

  describe("Bruxo (Warlock)", () => {
    it("possui atributos fundamentais corretos", () => {
      expect(DND35_ARC_BRUXO.name).toBe("Bruxo");
      expect(DND35_ARC_BRUXO.nameEn).toBe("Warlock");
      expect(DND35_ARC_BRUXO.page).toBe(5);
      expect(DND35_ARC_BRUXO.hitDie).toBe("d6");
      expect(DND35_ARC_BRUXO.alignment).toContain("maligna");
      expect(DND35_ARC_BRUXO.alignment).toContain("caótica");
      expect(DND35_ARC_BRUXO.skillPointsPerLevel).toContain("2 + modificador");
    });

    it("possui lista oficial de perícias de classe", () => {
      expect(DND35_ARC_BRUXO.classSkills).toEqual([
        "Blefar (Car)",
        "Concentração (Con)",
        "Conhecimento (arcano) (Int)",
        "Conhecimento (os planos) (Int)",
        "Conhecimento (religião) (Int)",
        "Disfarces (Car)",
        "Identificar Magia (Int)",
        "Intimidar (Car)",
        "Ofícios (Int)",
        "Profissão (Sab)",
        "Saltar (For)",
        "Sentir Motivação (Sab)",
        "Usar Instrumento Mágico (Car)",
      ]);
    });

    it("possui progressão completa de 20 níveis com BBA médio e Vontade boa", () => {
      expect(DND35_ARC_BRUXO.levels).toHaveLength(20);
      expect(DND35_ARC_BRUXO.levels[0].bab).toBe("+0");
      expect(DND35_ARC_BRUXO.levels[19].bab).toBe("+15/+10/+5");
      expect(DND35_ARC_BRUXO.levels[0].will).toBe(2);
      expect(DND35_ARC_BRUXO.levels[19].will).toBe(12);
      expect(DND35_ARC_BRUXO.levels[0].fort).toBe(0);
      expect(DND35_ARC_BRUXO.levels[19].fort).toBe(6);
      expect(DND35_ARC_BRUXO.levels[0].ref).toBe(0);
      expect(DND35_ARC_BRUXO.levels[19].ref).toBe(6);
      expect(DND35_ARC_BRUXO.levels[0].invocationsKnown).toBe(1);
      expect(DND35_ARC_BRUXO.levels[19].invocationsKnown).toBe(12);
    });

    it("possui todas as características-chave descritas", () => {
      const featureNames = DND35_ARC_BRUXO.features.map((f) => f.name);
      expect(featureNames).toContain("Usar Armas e Armaduras");
      expect(featureNames).toContain("Invocações");
      expect(featureNames).toContain("Rajada Mística (SM)");
      expect(featureNames).toContain("Detectar Magia (SM)");
      expect(featureNames).toContain("Redução de Dano (Sob)");
      expect(featureNames).toContain("Burlar Item (Ext)");
      expect(featureNames).toContain("Resistência Demoníaca (Sob)");
      expect(featureNames).toContain("Resistência à Energia (Sob)");
      expect(featureNames).toContain("Infundir Item (Sob)");
    });

    it("possui conjunto inicial humano estruturado", () => {
      expect(DND35_ARC_BRUXO.starterPackage).toBeDefined();
      expect(DND35_ARC_BRUXO.starterPackage?.feat).toBe("Vitalidade");
      expect(DND35_ARC_BRUXO.starterPackage?.bonusFeat).toBe("Tiro Certeiro");
    });
  });

  describe("Mago da Guerra (Warmage)", () => {
    it("possui atributos fundamentais corretos", () => {
      expect(DND35_ARC_MAGO_GUERRA.name).toBe("Mago da Guerra");
      expect(DND35_ARC_MAGO_GUERRA.nameEn).toBe("Warmage");
      expect(DND35_ARC_MAGO_GUERRA.page).toBe(10);
      expect(DND35_ARC_MAGO_GUERRA.hitDie).toBe("d6");
      expect(DND35_ARC_MAGO_GUERRA.alignment).toBe("Qualquer");
    });

    it("possui progressão completa de 20 níveis com BBA ruim e Vontade boa", () => {
      expect(DND35_ARC_MAGO_GUERRA.levels).toHaveLength(20);
      expect(DND35_ARC_MAGO_GUERRA.levels[0].bab).toBe("+0");
      expect(DND35_ARC_MAGO_GUERRA.levels[19].bab).toBe("+10/+5");
      expect(DND35_ARC_MAGO_GUERRA.levels[0].will).toBe(2);
      expect(DND35_ARC_MAGO_GUERRA.levels[19].will).toBe(12);
      expect(DND35_ARC_MAGO_GUERRA.levels[0].fort).toBe(0);
      expect(DND35_ARC_MAGO_GUERRA.levels[19].fort).toBe(6);
    });

    it("possui tabela de magias por dia até 9º círculo", () => {
      expect(DND35_ARC_MAGO_GUERRA.spellsPerDay).toBeDefined();
      expect(DND35_ARC_MAGO_GUERRA.spellsPerDay).toHaveLength(20);
      // Nível 1: 5 de nível 0, 3 de nível 1
      expect(DND35_ARC_MAGO_GUERRA.spellsPerDay?.[0][0]).toBe(5);
      expect(DND35_ARC_MAGO_GUERRA.spellsPerDay?.[0][1]).toBe(3);
      // Nível 20: 5 de 9º nível
      expect(DND35_ARC_MAGO_GUERRA.spellsPerDay?.[19][9]).toBe(5);
    });

    it("possui talentos metamágicos súbitos e armadura", () => {
      const featureNames = DND35_ARC_MAGO_GUERRA.features.map((f) => f.name);
      expect(featureNames).toContain("Mago de Armadura (Ext)");
      expect(featureNames).toContain("Vantagem do Mago da Guerra (Ext)");
      expect(featureNames).toContain("Aprendizado Avançado (Ext)");
      expect(featureNames).toContain("Potencializar Súbito (Ext)");
      expect(featureNames).toContain("Aumentar Súbito (Ext)");
      expect(featureNames).toContain("Ampliar Súbito (Ext)");
      expect(featureNames).toContain("Maximizar Súbito (Ext)");
    });
  });

  describe("Wu Jen (Wu Jen)", () => {
    it("possui atributos fundamentais e restrição de tendência", () => {
      expect(DND35_ARC_WU_JEN.name).toBe("Wu Jen");
      expect(DND35_ARC_WU_JEN.nameEn).toBe("Wu Jen");
      expect(DND35_ARC_WU_JEN.page).toBe(14);
      expect(DND35_ARC_WU_JEN.hitDie).toBe("d4");
      expect(DND35_ARC_WU_JEN.alignment).toBe("Qualquer não leal");
    });

    it("possui progressão completa de 20 níveis com BBA ruim e Vontade boa", () => {
      expect(DND35_ARC_WU_JEN.levels).toHaveLength(20);
      expect(DND35_ARC_WU_JEN.levels[0].bab).toBe("+0");
      expect(DND35_ARC_WU_JEN.levels[19].bab).toBe("+10/+5");
      expect(DND35_ARC_WU_JEN.levels[0].will).toBe(2);
      expect(DND35_ARC_WU_JEN.levels[19].will).toBe(12);
    });

    it("possui tabela de magias por dia idêntica ao Mago", () => {
      expect(DND35_ARC_WU_JEN.spellsPerDay).toBeDefined();
      expect(DND35_ARC_WU_JEN.spellsPerDay).toHaveLength(20);
      // Nível 1: 3 de nível 0, 1 de nível 1
      expect(DND35_ARC_WU_JEN.spellsPerDay?.[0][0]).toBe(3);
      expect(DND35_ARC_WU_JEN.spellsPerDay?.[0][1]).toBe(1);
      // Nível 20: 4 de 9º nível
      expect(DND35_ARC_WU_JEN.spellsPerDay?.[19][9]).toBe(4);
    });

    it("possui características mágicas orientais (espírito vigilante, magia secreta, maestria elemental, tabus)", () => {
      const featureNames = DND35_ARC_WU_JEN.features.map((f) => f.name);
      expect(featureNames).toContain("Magias e Grimórios");
      expect(featureNames).toContain("Espírito Vigilante (Sob)");
      expect(featureNames).toContain("Talento Adicional");
      expect(featureNames).toContain("Magia Secreta (Sob)");
      expect(featureNames).toContain("Maestria Elemental (Ext)");
      expect(featureNames).toContain("Tabus");
    });
  });
});
