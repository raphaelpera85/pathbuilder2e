import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  PICKER_TYPE_TO_TABLE,
  normalizeSupabaseRecordToPickerItem,
  fetchCatalogCategory,
  fetchCatalogItemById,
  getCatalogSyncStatus,
  type CatalogItemRecord,
} from "./catalog";
import type { PickerType } from "../types";

describe("Catalog Service & Supabase Mapping", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
