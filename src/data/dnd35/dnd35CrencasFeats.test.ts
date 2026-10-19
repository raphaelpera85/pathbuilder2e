import { describe, expect, it } from "vitest";
import { DND35_CRENCAS_FEATS } from "./dnd35CrencasFeats";
import {
  DND35_CRENCAS_DOMINIO_REPOUSO,
  DND35_CRENCAS_SPELLS,
} from "./dnd35CrencasDomains";

describe("Forgotten Realms: Crenças e Panteões (Apêndice pp.214-222)", () => {
  it("11 talentos divinos/gerais catalogados", () => {
    expect(DND35_CRENCAS_FEATS).toHaveLength(11);
  });

  it("Força Divina: Car 13, For 13, Ataque Poderoso e bônus de dano", () => {
    const f = DND35_CRENCAS_FEATS.find(
      (x) => x.id === "crencas-feat-forca-divina"
    )!;
    expect(f.category).toBe("divine");
    expect(f.prerequisites).toMatch(/Car 13/);
    expect(f.prerequisites).toMatch(/For 13/);
    expect(f.prerequisites).toMatch(/Ataque Poderoso/);
    expect(f.benefit).toMatch(/modificador de Carisma no dano/);
    expect(f.page).toBe(216);
  });

  it("Vingança Divina: 2d6 de dano de energia sagrada contra mortos-vivos", () => {
    const f = DND35_CRENCAS_FEATS.find(
      (x) => x.id === "crencas-feat-vinganca-divina"
    )!;
    expect(f.category).toBe("divine");
    expect(f.benefit).toMatch(/2d6 de dano de energia sagrada/);
    expect(f.fullDescription).toMatch(/2d6 pontos de energia sagrada/);
  });

  it("Faz-Tudo: 8º nível, permite perícias sem treinamento", () => {
    const f = DND35_CRENCAS_FEATS.find((x) => x.id === "crencas-feat-faz-tudo")!;
    expect(f.prerequisites).toBe("Personagem de 8º nível");
    expect(f.benefit).toMatch(/qualquer perícia/);
  });

  it("Domínio do Repouso: 9 magias, concedido a Jergal, Kelemvor, Osíris, Urogalan", () => {
    expect(DND35_CRENCAS_DOMINIO_REPOUSO.name).toBe("Repouso");
    expect(DND35_CRENCAS_DOMINIO_REPOUSO.deities).toEqual([
      "Jergal",
      "Kelemvor",
      "Osíris",
      "Urogalan",
    ]);
    expect(DND35_CRENCAS_DOMINIO_REPOUSO.spells).toHaveLength(9);
    expect(DND35_CRENCAS_DOMINIO_REPOUSO.spells[5].spellName).toBe(
      "Pós-Vida em Morte"
    );
    expect(DND35_CRENCAS_DOMINIO_REPOUSO.spells[7].spellName).toBe("Certeza");
  });

  it("2 novas magias: Certeza (Repouso 8) e Pós-Vida em Morte (Clr/Repouso/Mago 6)", () => {
    expect(DND35_CRENCAS_SPELLS).toHaveLength(2);

    const certeza = DND35_CRENCAS_SPELLS.find(
      (s) => s.id === "crencas-spell-certeza"
    )!;
    expect(certeza.school).toBe("Abjuração");
    expect(certeza.levels.Repouso).toBe(8);

    const posVida = DND35_CRENCAS_SPELLS.find(
      (s) => s.id === "crencas-spell-pos-vida-em-morte"
    )!;
    expect(posVida.school).toBe("Necromancia");
    expect(posVida.levels.Clérigo).toBe(6);
    expect(posVida.levels["Feiticeiro/Mago"]).toBe(6);
    expect(posVida.materialComponent).toMatch(/Pó de diamante/);
  });
});
