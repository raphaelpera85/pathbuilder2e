import { describe, expect, it } from "vitest";
import { DEFENSORES_SPECIFIC_MAGIC_ITEMS as I } from "./dnd35DefensoresSpecificItems";
import { DEFENSORES_SPECIFIC_ARMOR, DEFENSORES_SPECIFIC_WEAPONS, DEFENSORES_STAVES, DEFENSORES_WONDROUS_ITEMS } from "./dnd35DefensoresMagicPrices";

const num = (s: string) => Number(s.replace(/\./g, "").replace(" PO", ""));

describe("Defensores da Fé: itens mágicos específicos (pp. 24-26)", () => {
  it("23 itens: 5 armaduras, 4 armas, 1 bastão, 13 itens maravilhosos", () => {
    expect(I).toHaveLength(23);
    expect(I.filter((i) => i.category === "armadura")).toHaveLength(5);
    expect(I.filter((i) => i.category === "arma")).toHaveLength(4);
    expect(I.filter((i) => i.category === "bastão")).toHaveLength(1);
    expect(I.filter((i) => i.category === "item maravilhoso")).toHaveLength(13);
  });
  it("cada preço bate com a tabela de preços (1-8 a 1-11), por nome sem acentuação de caixa", () => {
    const table = [...DEFENSORES_SPECIFIC_ARMOR, ...DEFENSORES_SPECIFIC_WEAPONS, ...DEFENSORES_STAVES, ...DEFENSORES_WONDROUS_ITEMS];
    const key = (s: string) => s.toLowerCase();
    for (const item of I) {
      const row = table.find((t) => key(t.name) === key(item.name));
      expect(row, item.name).toBeDefined();
      expect(num(item.marketPrice), item.name).toBe(row!.price);
    }
  });
  it("valores críticos", () => {
    const g = (n: string) => I.find((i) => i.name === n)!;
    expect(g("Virote da Demolição").description).toMatch(/3d6 pontos de dano.*Força 25.*Força 29/);
    expect(g("Braço de Nyr").description).toMatch(/\+2 de Força, \+2 de Destreza/);
    expect(g("Elmo da Visão").weight).toBe("1,5 kg");
    expect(g("Armadura do Cavalariço").description).toMatch(/totalizando \+10/);
    expect(g("Marca da Apostasia").casterLevel).toBe("n/d");
  });
});
