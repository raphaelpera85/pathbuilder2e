import { describe, expect, it } from "vitest";
import { CG_FEATS } from "./dnd35CgFeats";

describe("Livro Completo do Guerreiro: Talentos Gerais, 2º lote (pp. 98-99)", () => {
  it("conjunto de talentos é não-vazio e sem duplicatas (total cresce a cada lote)", () => {
    const ids = new Set(CG_FEATS.map((f) => f.id));
    expect(ids.size).toBe(CG_FEATS.length);
    expect(CG_FEATS.length).toBeGreaterThanOrEqual(24);
  });
  it("Combater Engajado: exemplo de Tordek vs ogro/ankheg preservado", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-combater-engajado")!;
    expect(f.benefit).toMatch(/causa 10 pontos de dano e adiciona \+10 de bônus/);
  });
  it("Congelar o Sangue: CD e duração de paralisia corretas", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-congelar-o-sangue")!;
    expect(f.benefit).toMatch(/CD 10 \+ 1\/2 do nível do personagem \+ modificador de Sab/);
    expect(f.benefit).toMatch(/1d4\+1 rodadas/);
  });
  it("Empunhadura Primata: -2 de penalidade, sem alterar esforço", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-empunhadura-primata")!;
    expect(f.benefit).toMatch(/-2 de penalidade nas jogadas de ataque/);
    expect(f.benefit).toMatch(/o esforço necessário para brandir a arma não é alterado/);
  });
  it("Destruição Adicional concede 2 ativações extras, cumulativo", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-destruicao-adicional")!;
    expect(f.benefit).toMatch(/duas ativações diárias adicionais/);
    expect(f.special).toMatch(/cumulativos/);
  });
});
