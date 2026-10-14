import { describe, expect, it } from "vitest";
import { DND35_DIV_FEATS } from "./dnd35DivFeats";

describe("D&D 3.5 — O Livro Completo do Divino: Talentos", () => {
  it("contém exatamente 42 talentos oficiais no Capítulo 3", () => {
    expect(DND35_DIV_FEATS).toHaveLength(42);
  });

  it("todos os talentos possuem IDs únicos com prefixo div-feat-", () => {
    const ids = DND35_DIV_FEATS.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(42);
    for (const id of ids) {
      expect(id).toMatch(/^div-feat-[a-z0-9-]+$/);
    }
  });

  it("distribuição correta por categoria de talento", () => {
    const categories = DND35_DIV_FEATS.reduce<Record<string, number>>((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {});

    expect(categories.geral).toBe(11);
    expect(categories.divino).toBe(11);
    expect(categories.selvagem).toBe(12);
    expect(categories.metamagico).toBe(4);
    expect(categories.criacao).toBe(1);
    expect(categories.fe).toBe(3);
  });

  it("todos os talentos possuem páginas coerentes (pp. 77–86) e benefícios não vazios", () => {
    for (const f of DND35_DIV_FEATS) {
      expect(f.name).toBeTruthy();
      expect(f.nameEn).toBeTruthy();
      expect(f.page).toBeGreaterThanOrEqual(78);
      expect(f.page).toBeLessThanOrEqual(86);
      expect(f.benefit).toBeTruthy();
      expect(f.benefit.length).toBeGreaterThan(20);
      expect(Array.isArray(f.prerequisites)).toBe(true);
    }
  });

  it("valida talentos emblemáticos de D&D 3.5 do Completo do Divino", () => {
    const metamagiaDivina = DND35_DIV_FEATS.find((f) => f.id === "div-feat-metamagia-divina");
    expect(metamagiaDivina).toBeDefined();
    expect(metamagiaDivina?.category).toBe("divino");
    expect(metamagiaDivina?.prerequisites).toContain("Habilidade de expulsar ou fascinar mortos-vivos");
    expect(metamagiaDivina?.benefit).toContain("tentativas diárias de expulsar/fascinar");

    const boteLeao = DND35_DIV_FEATS.find((f) => f.id === "div-feat-bote-do-leao");
    expect(boteLeao).toBeDefined();
    expect(boteLeao?.category).toBe("selvagem");
    expect(boteLeao?.benefit).toContain("ataque total completo ao final da investida");

    const praticado = DND35_DIV_FEATS.find((f) => f.id === "div-feat-conjurador-experiente");
    expect(praticado).toBeDefined();
    expect(praticado?.category).toBe("geral");
    expect(praticado?.prerequisites).toContain("4 graduações em Identificar Magia");
    expect(praticado?.benefit).toContain("+4");
  });
});
