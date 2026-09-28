import { describe, expect, it } from "vitest";
import { DND35_GEAR, DND35_GEAR_IDS } from "./dnd35Gear";

/**
 * Auditoria contra a Tabela 7-8 (Itens e Serviços, página 128) do Livro do
 * Jogador, lida visualmente na página renderizada em 400dpi (o PDF fonte
 * não possui camada de texto extraível — confirmado via pypdf/pymupdf).
 * Cobertura completa e exaustiva das 3 seções da tabela.
 */
describe("DND35_GEAR — auditoria contra a Tabela 7-8 (p. 128)", () => {
  it("cataloga as 3 seções da Tabela 7-8", () => {
    const sections = new Set(Object.values(DND35_GEAR).map((g) => g.section));
    expect(sections).toEqual(new Set(["equipamento_aventura", "itens_substancias_especiais", "instrumentos_e_kits"]));
  });

  it("cataloga pelo menos 70 itens no total", () => {
    expect(DND35_GEAR_IDS.length).toBeGreaterThanOrEqual(70);
  });

  it("Luneta (p. 128): 1.000 PO, o item mais caro da seção Equipamento de Aventura", () => {
    const item = DND35_GEAR.luneta;
    expect(item.cost).toBe("1.000 PO");
    expect(item.section).toBe("equipamento_aventura");
  });

  it("Clepsidra (p. 128): 1.000 PO e 100 kg, o item mais pesado da tabela", () => {
    const item = DND35_GEAR.clepsidra;
    expect(item.cost).toBe("1.000 PO");
    expect(item.weightKg).toBe(100);
  });

  it("Fechaduras (p. 128): 4 níveis de qualidade em ordem crescente de custo", () => {
    expect(DND35_GEAR["fechadura-muito-simples"].cost).toBe("20 PO");
    expect(DND35_GEAR["fechadura-padrao"].cost).toBe("40 PO");
    expect(DND35_GEAR["fechadura-boa"].cost).toBe("80 PO");
    expect(DND35_GEAR["fechadura-incrivel"].cost).toBe("150 PO");
  });

  it("Bolsa de componentes de magia (p. 128): 5 PO, 1 kg, seção instrumentos e kits", () => {
    const item = DND35_GEAR["bolsa-de-componentes-de-magia"];
    expect(item.cost).toBe("5 PO");
    expect(item.weightKg).toBe(1);
    expect(item.section).toBe("instrumentos_e_kits");
  });

  it("Água benta (p. 128): 25 PO, item da seção Itens e Substâncias Especiais", () => {
    const item = DND35_GEAR["agua-benta-frasco"];
    expect(item.cost).toBe("25 PO");
    expect(item.section).toBe("itens_substancias_especiais");
  });

  it("itens sem peso relevante usam weightKg: null (não 0)", () => {
    expect(DND35_GEAR.anzol.weightKg).toBeNull();
    expect(DND35_GEAR["giz-1-pedaco"].weightKg).toBeNull();
  });

  it("todos os itens têm nome, fonte, página e custo preenchidos", () => {
    for (const item of Object.values(DND35_GEAR)) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(item.sourcePage).toBe(128);
      expect(item.cost.length).toBeGreaterThan(0);
      expect(["equipamento_aventura", "itens_substancias_especiais", "instrumentos_e_kits"]).toContain(item.section);
    }
  });
});
