import { describe, expect, it } from "vitest";
import { CG_FEATS } from "./dnd35CgFeats";

describe("Livro Completo do Guerreiro: Talentos Gerais, 4º lote (pp. 103-104)", () => {
  it("conjunto de talentos é não-vazio e sem duplicatas (total cresce a cada lote)", () => {
    const ids = new Set(CG_FEATS.map((f) => f.id));
    expect(ids.size).toBe(CG_FEATS.length);
    expect(CG_FEATS.length).toBeGreaterThanOrEqual(52);
  });
  it("Lutador Astuto: tabela de bônus por tamanho de oponente", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-lutador-astuto")!;
    expect(f.benefit).toMatch(/Colossal \+8, Imensa \+6, Enorme \+4, Grande \+2/);
  });
  it("Resistência Maior: exemplo numérico do bárbaro 13º/16º/19º nível preservado", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-resistencia-maior")!;
    expect(f.benefit).toMatch(/RD 3\/—.*4\/—.*16º nível.*5\/—.*19º nível.*6\/—/s);
  });
  it("Salto do Louva-a-Deus: 1d2 de dano adicional (confirmado a 400dpi, não 1d12)", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-salto-do-louva-a-deus")!;
    expect(f.benefit).toMatch(/1d2 pontos de dano adicional/);
    expect(f.prerequisites).toContain("Ataque Poderoso");
  });
  it("Ligeiro não tem pré-requisitos", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-ligeiro")!;
    expect(f.prerequisites).toBe("—");
  });
});
