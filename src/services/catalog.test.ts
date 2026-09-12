import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  PICKER_TYPE_TO_TABLE,
  normalizeSupabaseRecordToPickerItem,
  fetchCatalogCategory,
  fetchCatalogItemById,
  getCatalogSyncStatus,
  DEFAULT_RPG_SYSTEMS,
  type CatalogItemRecord,
} from "./catalog";
import type { PickerType } from "../types";

describe("Catalog Service & Supabase Mapping", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("não anuncia rulesets ainda não implementados no núcleo", () => {
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "dnd5e")?.supportedRulesets).toEqual(["standard"]);
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "t20")?.supportedRulesets).toEqual(["padrao"]);
  });

  it("mapeia todas as categorias para suas respectivas tabelas relacionais do Supabase", () => {
    const requiredCategories: PickerType[] = [
      "ancestry",
      "heritage",
      "class",
      "subclass",
      "background",
      "archetype",
      "spell",
      "ritual",
      "feat",
      "item",
      "weapon",
      "armor",
      "shield",
      "formula",
      "pet",
      "action",
      "condition",
      "buff",
    ];

    for (const cat of requiredCategories) {
      expect(PICKER_TYPE_TO_TABLE[cat]).toBeDefined();
      expect(PICKER_TYPE_TO_TABLE[cat]).toMatch(/^catalog_/);
    }
  });

  it("normaliza corretamente um registro do Supabase para o formato PickerItem", () => {
    const mockRecord: CatalogItemRecord = {
      id: "feat.toughness",
      name_pt: "Robustez",
      name_en: "Toughness",
      name_es: "Dureza",
      description_pt: "Ganha +1 PV por nível.",
      description_en: "Gain +1 HP per level.",
      description_es: "Gana +1 PG por nivel.",
      category: "Geral",
      level: 1,
      traits: ["Geral"],
      rarity: "common",
      ruleset: "remaster",
      source_book: "Livro do Jogador",
      source_page: 256,
      data: {
        effects: [{ type: "max_hp_per_level", value: 1 }],
        mechanics: { failure: "fica atordoado 1", heightened: "+1d6" },
      },
    };

    const item = normalizeSupabaseRecordToPickerItem(mockRecord, "feat");

    expect(item.id).toBe("feat.toughness");
    expect(item.name).toBe("Robustez");
    expect(item.data.names["pt-BR"]).toBe("Robustez");
    expect(item.data.names["en"]).toBe("Toughness");
    expect(item.data.names["es"]).toBe("Dureza");
    expect(item.data.summaries["pt-BR"]).toBe("Ganha +1 PV por nível.");
    expect(item.data.level).toBe(1);
    expect(item.data.source.book).toBe("Livro do Jogador");
    expect(item.data.source.page).toBe(256);
    expect(item.data.traits).toEqual(["Geral"]);
    expect(item.data.mechanics).toEqual({ failure: "fica atordoado 1", heightened: "+1d6" });
  });

  it("preserva os campos estruturados de armas ao normalizar o catálogo remoto", () => {
    const weapon = normalizeSupabaseRecordToPickerItem({
      id: "weapon.longbow",
      name_pt: "Arco Longo",
      name_en: "Longbow",
      name_es: "Arco largo",
      damage_dice: "1d8",
      damage_type: "Perfuração (P)",
      range_feet: 100,
      reload: 0,
      hands: "2",
      weapon_group: "Arco",
      weapon_category: "Marcial",
      traits: ["Mortal d10", "Voleio 30 pés"],
      source_book: "Livro do Jogador",
      source_page: 280,
    }, "weapon");

    expect(weapon.data).toMatchObject({
      damage: "1d8",
      damageType: "Perfuração (P)",
      range: 100,
      rangeFeet: 100,
      reload: 0,
      hands: "2",
      weaponGroup: "Arco",
      weaponCategory: "Marcial",
    });
  });

  it("retorna o status do catálogo indicando se o Supabase está configurado", () => {
    const status = getCatalogSyncStatus();
    expect(status).toHaveProperty("isConfigured");
    expect(status).toHaveProperty("isOnline");
    expect(status).toHaveProperty("source");
  });

  it("faz fallback para runtime local quando chamado em ambiente de teste ou offline", async () => {
    const res = await fetchCatalogCategory("ancestry");
    expect(res).toBeDefined();
    expect(Array.isArray(res.items)).toBe(true);
    expect(["supabase", "local_cache", "local_runtime"]).toContain(res.source);
  });
});
