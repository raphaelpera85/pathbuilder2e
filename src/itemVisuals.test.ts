import { describe, expect, it } from "vitest";
import { getItemImageAlt, getItemVisualKey } from "./itemVisuals";

describe("item visuals", () => {
  it.each([
    ["Poção de Cura Menor", "potion"],
    ["Bomba de Fogo Alquímico", "bomb"],
    ["Runa de Potência", "rune"],
    ["Virote", "ammunition"],
    ["Veneno de Beladona", "poison"],
    ["Livro de Rituais", "book"],
    ["Anel da Proteção", "jewelry"],
    ["Armadura de Placas Mágica", "armor"],
    ["Escudo do Guardião", "shield"],
    ["Cajado do Inverno", "staff"],
    ["Besta de Ver-Espírito", "crossbow"],
    ["Arco Cabeça-Partida", "bow"],
    ["Chicote de Lula Gigante", "whip"],
    ["Machado Entalhador", "axe"],
    ["Mochila de Aventureiro", "adventurer-pack"],
    ["10 Balas", "bullets"],
  ])("classifies %s as %s", (name, key) => expect(getItemVisualKey({ name })).toBe(key));

  it("uses the complete localized display name in alt text", () => {
    expect(getItemImageAlt("Mochila de Aventureiro", { name: "Mochila de Aventureiro" })).toBe("Ilustração de Mochila de Aventureiro");
  });
});
