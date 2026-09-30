import { describe, expect, it } from "vitest";
import { DND35_GEAR, DND35_GEAR_IDS, dnd35GearFixedCostGp } from "./dnd35Gear";

/**
 * Auditoria contra a Tabela 7-8 (Itens e Serviços, páginas 128-129) do Livro do
 * Jogador, lida visualmente nas páginas renderizadas em 400dpi (o PDF fonte
 * não possui camada de texto extraível — confirmado via pypdf/pymupdf).
 * Cobertura das oito seções tabeladas nas duas páginas.
 */
describe("DND35_GEAR — auditoria contra a Tabela 7-8 (p. 128-129)", () => {
  it("cataloga as 8 seções da Tabela 7-8", () => {
    const sections = new Set(Object.values(DND35_GEAR).map((g) => g.section));
    expect(sections).toEqual(new Set([
      "equipamento_aventura",
      "itens_substancias_especiais",
      "instrumentos_e_kits",
      "indumentaria",
      "comida_bebida_hospedagem",
      "montarias_equipamentos",
      "transporte",
      "conjuracao_servicos",
    ]));
  });

  it("cataloga pelo menos 170 itens nas duas páginas", () => {
    expect(DND35_GEAR_IDS.length).toBeGreaterThanOrEqual(170);
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

  it("Montarias (p. 129): coluna Custo sem unidade é preservada como impressa, não vendida por preço inventado", () => {
    expect(DND35_GEAR["cavalo-de-guerra-pesado"].cost).toBe("400");
    expect(DND35_GEAR["sela-exotica-militar"].weightKg).toBe(20);
    expect(dnd35GearFixedCostGp(DND35_GEAR["cavalo-de-guerra-pesado"].cost)).toBeNull();
    expect(DND35_GEAR["armadura-de-montaria-criatura-grande"].note).toContain("custo x4, peso x2");
  });

  it("Transporte (p. 129): Barcaça 3.000 PO e Trenó 20 PO / 150 kg", () => {
    expect(DND35_GEAR.barcaca.cost).toBe("3.000 PO");
    expect(DND35_GEAR.treno.cost).toBe("20 PO");
    expect(DND35_GEAR.treno.weightKg).toBe(150);
  });

  it("dnd35GearFixedCostGp converte PC/PP/PO e rejeita custos variáveis", () => {
    expect(dnd35GearFixedCostGp("5 PP")).toBe(0.5);
    expect(dnd35GearFixedCostGp("2 PC")).toBe(0.02);
    expect(dnd35GearFixedCostGp("30.000 PO")).toBe(30000);
    expect(dnd35GearFixedCostGp("NC x 10 PO")).toBeNull();
    expect(dnd35GearFixedCostGp("3 PP por dia")).toBeNull();
  });

  it("todos os itens têm nome, fonte, página e custo preenchidos", () => {
    for (const item of Object.values(DND35_GEAR)) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect([128, 129]).toContain(item.sourcePage);
      expect(item.cost.length).toBeGreaterThan(0);
    }
  });
});
