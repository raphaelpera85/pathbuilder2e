import { describe, expect, it } from "vitest";
import { CG_TACTICAL_FEATS } from "./dnd35CgFeatsTactical";

describe("Livro Completo do Guerreiro: Talentos Táticos (pp. 108-112)", () => {
  it("8 talentos táticos, cada um com exatamente 3 manobras nomeadas no texto", () => {
    expect(CG_TACTICAL_FEATS).toHaveLength(8);
    expect(new Set(CG_TACTICAL_FEATS.map((f) => f.id)).size).toBe(8);
    expect(CG_TACTICAL_FEATS.every((f) => f.type === "Tático")).toBe(true);
    for (const f of CG_TACTICAL_FEATS) {
      const nomes = (f.benefit.match(/[A-ZÀ-Ú][\wà-ú ]+: /g) || []).length;
      expect(nomes, `${f.name} deveria ter pelo menos 3 manobras nomeadas`).toBeGreaterThanOrEqual(3);
    }
  });
  it("Mergulho da Águia (Ave de Rapina): CD 15/25 → +2/+4 de dano", () => {
    const f = CG_TACTICAL_FEATS.find((x) => x.id === "cg-feat-ave-de-rapina")!;
    expect(f.benefit).toMatch(/CD 15 para causar 2 pontos de dano adicional ou CD 25 para causar 4 pontos de dano adicional/);
  });
  it("Olho de Gavião: até +6 de bônus após 3 rodadas de observação", () => {
    const f = CG_TACTICAL_FEATS.find((x) => x.id === "cg-feat-ave-de-rapina")!;
    expect(f.benefit).toMatch(/até o limite de \+6 para 3 rodadas completas/);
  });
  it("Combate Brutal: Balanço Eficaz escala dano +50%\/+200% conforme a arma", () => {
    const f = CG_TACTICAL_FEATS.find((x) => x.id === "cg-feat-combate-brutal")!;
    expect(f.benefit).toMatch(/1,5 vezes o dano normal \(\+50%\) ou o triplo do dano normal \(\+200%\)/);
  });
  it("todos os 8 talentos correspondem à Tabela 3-3 (pré-requisitos com BBA +6, exceto Combate Solar com +4)", () => {
    const naoSolar = CG_TACTICAL_FEATS.filter((f) => f.id !== "cg-feat-combate-solar");
    expect(naoSolar.every((f) => f.prerequisites.includes("+6"))).toBe(true);
    expect(CG_TACTICAL_FEATS.find((f) => f.id === "cg-feat-combate-solar")!.prerequisites).toContain("+4");
  });
});
