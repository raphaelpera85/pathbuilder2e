// ============================================================================
// Testes: D&D - Livro dos Níveis Épicos, Capítulo 1, Descrição dos Talentos
// Épicos (lote 1, pp.48-50). Cobertura: só dados verificados por leitura
// visual direta das páginas reais — nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_EPIC_FEATS } from "./dnd35EpicFeats";

describe("D&D — Livro dos Níveis Épicos: Talentos Épicos (lote 1, A-At)", () => {
  it("totaliza 10 talentos com IDs únicos e benefício não vazio", () => {
    expect(DND35_EPIC_FEATS).toHaveLength(10);
    const ids = DND35_EPIC_FEATS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of DND35_EPIC_FEATS) {
      expect(f.name.length).toBeGreaterThan(0);
      expect(f.benefit.length).toBeGreaterThan(10);
      expect(f.page).toBeGreaterThanOrEqual(48);
    }
  });

  it("Aprimorar Magia é metamágico e pode ser escolhido múltiplas vezes, acumulando +10/+5 dados", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-aprimorar-magia")!;
    expect(s.category).toBe("metamagico_epico");
    expect(s.prerequisites).toEqual(["Maximizar Magia"]);
    expect(s.benefit).toMatch(/aumenta em 10 dados.*ou em 5 dados/);
    expect(s.special).toMatch(/pode adquirir esse talento diversas vezes/);
  });

  it("Acelerar Magia Automática exige Acelerar Magia + Identificar Magia 30 graduações + conjuração de 9º nível", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-acelerar-magia-automatica")!;
    expect(s.prerequisites).toEqual(["Acelerar Magia", "Identificar Magia 30 graduações", "habilidade para conjurar magias arcanas ou divinas de 9º nível"]);
  });

  it("Ataque Cortante e Ataque da Ordem concedem propriedades distintas ao ataque desarmado (afiada vs. ordeira)", () => {
    const cortante = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-cortante")!;
    const ordem = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-da-ordem")!;
    expect(cortante.benefit).toMatch(/margem de ameaça 19-20/);
    expect(ordem.benefit).toMatch(/\+2d6 pontos de dano contra criaturas Caóticas/);
    expect(ordem.prerequisites).toContain("tendência Leal");
  });

  it("Ataque de Oportunidade Mágico e Ataque de Oportunidade Furtivo modificam o ataque de oportunidade de formas diferentes", () => {
    const magico = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-de-oportunidade-magico")!;
    const furtivo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-de-oportunidade-furtivo")!;
    expect(magico.benefit).toMatch(/conjurar e atacar com uma magia de toque em substituição ao ataque de oportunidade regular/);
    expect(furtivo.prerequisites).toContain("Ataque Furtivo +8d6");
  });

  it("Alquimia Superior exige Int 21+ e Alquimia 24 graduações, +20 CD e x5 preço", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-alquimia-superior")!;
    expect(s.prerequisites).toEqual(["Int 21+", "Alquimia 24 graduações"]);
    expect(s.benefit).toMatch(/adicionando \+20 na CD de criação e multiplicando o preço de mercado por 5/);
  });
});
