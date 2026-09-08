import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getItemImageAlt, getItemImageUrl, getItemVisualKey } from "./itemVisuals";

describe("item visuals", () => {
  it.each([
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
    ["Mochila de Aventureiro", "adventurers-pack"],
    ["Kit de Primeiros Socorros", "healers-first-aid-kit"],
    ["Ferramentas de Ladrão", "thieves-tools"],
    ["Botas Élficas", "elven-boots"],
    ["Poção de Cura Menor", "minor-healing-potion"],
    ["Poção de Cura Inferior", "lesser-healing-potion"],
    ["Mochila", "backpack"],
    ["Lâmina Escuda-Magia", "spellguard-blade"],
    ["Broquel Deslumbrante", "dazzling-buckler"],
    ["Coldre Imaculado", "immaculate-holster"],
    ["Mira de Amplificação", "amplifying-scope"],
    ["Mira de Delineamento", "delineating-scope"],
    ["Mira da Verdade", "scope-of-truth"],
    ["Mira de Visão no Escuro", "darkvision-scope"],
    ["Dallah de Faydhaan", "faydhaans-dallah"],
    ["Poção de Polvo", "octopus-potion"],
    ["Sopro da Praga", "blight-breath"],
    ["Azul de Sairazul", "sairazul-blue"],
    ["Sal Vital", "vital-salt"],
    ["Frasco da Fonte Imortal", "immortal-wellspring-vial"],
    ["Elixir da Vida (Menor)", "minor-elixir-life"],
    ["Elixir da Vida (Inferior)", "lesser-elixir-life"],
    ["Antipeste (Inferior)", "lesser-antiplague"],
    ["Antídoto Menor", "minor-antidote"],
    ["Fogo Alquímico (Inferior)", "lesser-alchemists-fire"],
    ["Frasco de Ácido (Inferior)", "lesser-acid-flask"],
    ["Vial de Frio (Inferior)", "lesser-frost-vial"],
    ["Relâmpago Engarrafado (Inferior)", "lesser-bottled-lightning"],
    ["Bala de Cola", "glue-bullet"],
    ["Bala da Erosão", "erosion-bullet"],
    ["Bala Feérica", "faerie-bullet"],
    ["Cartucho Confiável", "reliable-cartridge"],
    ["Bomba de Cola Menor", "minor-glue-bomb"],
    ["Bomba de Esmorecimento Menor", "minor-weakening-bomb"],
    ["Carga Fantasma Menor", "minor-ghost-charge"],
    ["Pedra Detonante Menor", "minor-detonating-stone"],
    ["Cota do Marinheiro", "sailors-cota"],
    ["Couraça da Carnificina", "carnage-cuirass"],
    ["Armadura Profana", "unholy-armor"],
    ["Placas de Dragão", "dragon-scales"],
    ["10 Balas", "bullets"],
    ["Manto Aéreo", "adventurer-pack"],
    ["Lança Peixe-Leão", "spear"],
    ["Sopro da Praga", "blight-breath"],
    ["Bastão de Metal", "staff"],
    ["Runa de Potência de Armadura +1", "rune"],
  ])("classifies %s as %s", (name, key) => expect(getItemVisualKey({ name })).toBe(key));

  it("uses the complete localized display name in alt text", () => {
    expect(getItemImageAlt("Mochila de Aventureiro", { name: "Mochila de Aventureiro" })).toBe("Ilustração de Mochila de Aventureiro");
  });

  it("associa todos os itens catalogados a uma família e asset local existente", () => {
    const items = JSON.parse(readFileSync(resolve(process.cwd(), "scripts/catalog_data/catalog_items.json"), "utf8")) as Array<Record<string, unknown>>;
    for (const item of items) {
      const name = String(item.name_pt || item.name_en || "");
      const data = {
        id: String(item.id || ""),
        name,
        names: { "pt-BR": name, en: String(item.name_en || "") },
        description: String(item.description_pt || ""),
        category: String(item.category || ""),
        traits: Array.isArray(item.traits) ? item.traits as string[] : [],
      };
      const key = getItemVisualKey(data);
      const url = getItemImageUrl(data);
      expect(key, name).not.toBe("generic");
      expect(url, name).toMatch(new RegExp(`^/item-images/item-${key}\\.png$`));
      expect(existsSync(resolve(process.cwd(), "public", "item-images", `item-${key}.png`)), name).toBe(true);
    }
  });
});
