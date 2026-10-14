import { describe, expect, it } from "vitest";
import { DND35_ARC_FEATS } from "./dnd35ArcFeats";

describe("D&D 3.5 — O Livro Completo do Arcano: Talentos (Capítulo 3)", () => {
  it("contém exatamente os 63 talentos oficiais de O Livro Completo do Arcano", () => {
    expect(DND35_ARC_FEATS).toHaveLength(63);
  });

  it("distribui corretamente os talentos nas 3 categorias oficiais", () => {
    const gerais = DND35_ARC_FEATS.filter((f) => f.category === "geral");
    const draconicos = DND35_ARC_FEATS.filter((f) => f.category === "draconico");
    const metamagicos = DND35_ARC_FEATS.filter((f) => f.category === "metamagico");

    expect(gerais).toHaveLength(28);
    expect(draconicos).toHaveLength(9);
    expect(metamagicos).toHaveLength(26);
  });

  it("possui identificadores únicos com prefixo 'arc-feat-'", () => {
    const ids = DND35_ARC_FEATS.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(63);
    for (const id of ids) {
      expect(id).toMatch(/^arc-feat-[a-z0-9-]+$/);
    }
  });

  it("garante integridade de todos os campos estruturais em cada talento", () => {
    for (const feat of DND35_ARC_FEATS) {
      expect(feat.name.trim().length).toBeGreaterThan(0);
      expect(feat.nameEn.trim().length).toBeGreaterThan(0);
      expect(feat.benefit.trim().length).toBeGreaterThan(20);
      expect(Array.isArray(feat.prerequisites)).toBe(true);
      expect(feat.page).toBeGreaterThanOrEqual(73);
      expect(feat.page).toBeLessThanOrEqual(86);
    }
  });

  it("contém os talentos metamágicos súbitos concedidos ao Mago da Guerra", () => {
    const pot = DND35_ARC_FEATS.find((f) => f.name === "Potencializar Súbito");
    const aum = DND35_ARC_FEATS.find((f) => f.name === "Ampliar Magia Súbito");
    const max = DND35_ARC_FEATS.find((f) => f.name === "Maximizar Súbito");
    const est = DND35_ARC_FEATS.find((f) => f.name === "Estender Súbito");
    const ace = DND35_ARC_FEATS.find((f) => f.name === "Acelerar Súbito");
    const sil = DND35_ARC_FEATS.find((f) => f.name === "Silenciar Súbito");

    expect(pot).toBeDefined();
    expect(aum).toBeDefined();
    expect(max).toBeDefined();
    expect(est).toBeDefined();
    expect(ace).toBeDefined();
    expect(sil).toBeDefined();

    expect(pot?.benefit).toContain("50%");
    expect(max?.benefit).toContain("maximizar");
  });

  it("contém talentos dracônicos exclusivos para feiticeiros", () => {
    const ancestral = DND35_ARC_FEATS.find((f) => f.name === "Ancestral Dracônico");
    expect(ancestral).toBeDefined();
    expect(ancestral?.prerequisites).toContain("1º nível de feiticeiro");

    const garras = DND35_ARC_FEATS.find((f) => f.name === "Garras Dracônicas");
    const sopro = DND35_ARC_FEATS.find((f) => f.name === "Sopro Dracônico");
    const voo = DND35_ARC_FEATS.find((f) => f.name === "Voo Dracônico");

    expect(garras).toBeDefined();
    expect(sopro).toBeDefined();
    expect(voo).toBeDefined();
  });

  it("contém talentos que aprimoram as novas classes básicas", () => {
    const extraInv = DND35_ARC_FEATS.find((f) => f.name === "Invocação Adicional");
    expect(extraInv).toBeDefined();
    expect(extraInv?.prerequisites).toContain("Capacidade de utilizar invocações menores");

    const extraEdge = DND35_ARC_FEATS.find((f) => f.name === "Vantagem Adicional");
    expect(extraEdge).toBeDefined();
    expect(extraEdge?.prerequisites).toContain("1º nível de mago da guerra");

    const extraSec = DND35_ARC_FEATS.find((f) => f.name === "Magia Secreta Adicional");
    expect(extraSec).toBeDefined();
    expect(extraSec?.prerequisites).toContain("Habilidade de classe magia secreta");
  });

  it("contém talentos clássicos como Matador de Magos, Magia Persistente e Conjurador Experiente", () => {
    const matador = DND35_ARC_FEATS.find((f) => f.name === "Matador de Magos");
    expect(matador).toBeDefined();
    expect(matador?.benefit).toContain("não são capazes de conjurar magias na defensiva");

    const persistente = DND35_ARC_FEATS.find((f) => f.name === "Magia Persistente");
    expect(persistente).toBeDefined();
    expect(persistente?.benefit).toContain("24 horas");

    const experiente = DND35_ARC_FEATS.find((f) => f.name === "Conjurador Experiente");
    expect(experiente).toBeDefined();
    expect(experiente?.benefit).toContain("+4");
  });
});
