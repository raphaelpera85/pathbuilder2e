import { describe, expect, it } from "vitest";
import { DEFENSORES_ARMOR_ABILITIES, DEFENSORES_SPECIFIC_ARMOR, DEFENSORES_SPECIFIC_WEAPONS, DEFENSORES_STAVES, DEFENSORES_WONDROUS_ITEMS } from "./dnd35DefensoresMagicPrices";

describe("Defensores da Fé: tabelas de preços mágicos (p. 23)", () => {
  it("contagens das tabelas 1-7 a 1-11", () => {
    expect(DEFENSORES_ARMOR_ABILITIES).toHaveLength(19);
    expect(DEFENSORES_SPECIFIC_ARMOR).toHaveLength(5);
    expect(DEFENSORES_SPECIFIC_WEAPONS).toHaveLength(4);
    expect(DEFENSORES_STAVES).toHaveLength(1);
    expect(DEFENSORES_WONDROUS_ITEMS).toHaveLength(13);
  });
  it("valores conferidos contra o texto das descrições (p. 23-24)", () => {
    const ab = (n: string) => DEFENSORES_ARMOR_ABILITIES.find((a) => a.name === n)!.bonusModifier;
    expect(ab("Controlar Mortos-vivos")).toBe(4); // "preço de mercado: +4 de bônus"
    expect(ab("Convocação")).toBe(1);
    expect(ab("Etérea, pessoal")).toBe(3);
    expect(ab("Etérea, contato")).toBe(4);
    expect(ab("Glacial")).toBe(3);
    expect(ab("Velocidade")).toBe(3);
    expect(ab("Aquática c/ respirar na água")).toBe(3);
    expect(DEFENSORES_SPECIFIC_ARMOR[0].price).toBe(20960); // texto: "preço de mercado: 20.960 PO"
  });
  it("sem nomes duplicados", () => {
    for (const t of [DEFENSORES_SPECIFIC_ARMOR, DEFENSORES_SPECIFIC_WEAPONS, DEFENSORES_WONDROUS_ITEMS]) expect(new Set(t.map((e) => e.name)).size).toBe(t.length);
  });
});
