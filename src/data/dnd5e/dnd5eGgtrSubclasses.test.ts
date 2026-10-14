import { describe, it, expect } from "vitest";
import { DND5E_GGTR_SUBCLASSES, DND5E_GGTR_SOURCE_BOOK } from "./dnd5eGgtrSubclasses";

describe("D&D 5e - Guildmasters' Guide to Ravnica Subclasses (dnd5e-ggtr)", () => {
  it("contém as 2 subclasses oficiais (Domínio da Ordem e Círculo dos Esporos)", () => {
    expect(DND5E_GGTR_SUBCLASSES).toHaveLength(2);
    expect(DND5E_GGTR_SOURCE_BOOK).toBe("D&D 5e · Guia dos Mestres de Guilda de Ravnica");
  });

  it("valida integridade de dados e mecânicas das subclasses", () => {
    for (const sub of DND5E_GGTR_SUBCLASSES) {
      expect(sub.id).toMatch(/^dnd5e\.ggtr\.subclass\.[a-z_]+$/);
      expect(sub.name.length).toBeGreaterThan(0);
      expect(sub.englishName.length).toBeGreaterThan(0);
      expect(sub.sourcePage).toBeGreaterThanOrEqual(25);
      expect(sub.sourcePage).toBeLessThanOrEqual(28);
      expect(sub.features.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("verifica características do Clérigo do Domínio da Ordem", () => {
    const order = DND5E_GGTR_SUBCLASSES.find((s) => s.id === "dnd5e.ggtr.subclass.clerigo_dominio_da_ordem");
    expect(order).toBeDefined();
    expect(order?.classId).toBe("clerigo");
    expect(order?.featureLevel).toBe(1);
    const names = order?.features.map((f) => f.name);
    expect(names).toContain("Magias do Domínio da Ordem");
    expect(names).toContain("Proficiências Bônus");
    expect(names).toContain("Voz da Autoridade");
    expect(names).toContain("Canalizar Divindade: Demanda da Ordem");
    expect(names).toContain("Encarnação da Lei");
    expect(names).toContain("Golpe Divino");
    expect(names).toContain("Ira da Ordem");
  });

  it("verifica características do Druida do Círculo dos Esporos", () => {
    const spores = DND5E_GGTR_SUBCLASSES.find((s) => s.id === "dnd5e.ggtr.subclass.druida_circulo_dos_esporos");
    expect(spores).toBeDefined();
    expect(spores?.classId).toBe("druida");
    expect(spores?.featureLevel).toBe(2);
    const names = spores?.features.map((f) => f.name);
    expect(names).toContain("Magias do Círculo");
    expect(names).toContain("Halo de Esporos");
    expect(names).toContain("Entidade Simbiótica");
    expect(names).toContain("Infestação Fúngica");
    expect(names).toContain("Disseminar Esporos");
    expect(names).toContain("Corpo Fúngico");
  });
});
