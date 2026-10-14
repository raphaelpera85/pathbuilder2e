import { describe, expect, it } from "vitest";
import { DND35_PE_FEATS } from "./dnd35PeFeats";

describe("D&D 3.5 — Punhos e Espadas (v35-pe) — Talentos", () => {
  it("contém exatamente os 31 talentos oficiais do Capítulo 1", () => {
    expect(DND35_PE_FEATS.length).toBe(31);
  });

  it("garante unicidade de identificadores e nomes", () => {
    const ids = new Set(DND35_PE_FEATS.map((f) => f.id));
    const names = new Set(DND35_PE_FEATS.map((f) => f.name));
    expect(ids.size).toBe(31);
    expect(names.size).toBe(31);
  });

  it("valida que todos os talentos possuem página, benefícios e requisitos consistentes", () => {
    for (const feat of DND35_PE_FEATS) {
      expect(feat.page).toBeGreaterThanOrEqual(6);
      expect(feat.page).toBeLessThanOrEqual(10);
      expect(feat.benefit.trim().length).toBeGreaterThan(20);
      expect(feat.prerequisites).toBeDefined();
    }
  });

  it("identifica corretamente os talentos adicionais para guerreiros com asterisco", () => {
    const fighterBonusFeats = DND35_PE_FEATS.filter((f) => f.fighterBonus);
    expect(fighterBonusFeats.length).toBeGreaterThan(10);
    expect(fighterBonusFeats.map((f) => f.name)).toContain("Bloqueio Ambidestro");
    expect(fighterBonusFeats.map((f) => f.name)).toContain("Combater em Dupla");
    expect(fighterBonusFeats.map((f) => f.name)).toContain("Investida Poderosa");
  });

  it("confere os talentos icônicos de monge", () => {
    const zen = DND35_PE_FEATS.find((f) => f.id === "pe-feat-arquearia-zen");
    expect(zen).toBeDefined();
    expect(zen?.benefit).toContain("Sabedoria");

    const mantis = DND35_PE_FEATS.find((f) => f.id === "pe-feat-salto-do-louva-a-deus");
    expect(mantis).toBeDefined();
    expect(mantis?.prerequisites).toContain("7º nível de monge");

    const monkey = DND35_PE_FEATS.find((f) => f.id === "pe-feat-empunhadura-primata");
    expect(monkey).toBeDefined();
    expect(monkey?.special).toContain("diversas vezes");
  });
});
