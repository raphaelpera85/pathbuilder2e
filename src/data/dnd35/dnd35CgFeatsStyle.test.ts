import { describe, expect, it } from "vitest";
import { CG_STYLE_FEATS } from "./dnd35CgFeatsStyle";

describe("Livro Completo do Guerreiro: Talentos de Estilo de Armas (pp. 112-113)", () => {
  it("10 talentos de estilo, todos únicos, tipo Estilo; 9 dos 10 exigem Combater com Duas Armas (exceto Três Montanhas, que usa a mesma arma duas vezes)", () => {
    expect(CG_STYLE_FEATS).toHaveLength(10);
    expect(new Set(CG_STYLE_FEATS.map((f) => f.id)).size).toBe(10);
    expect(CG_STYLE_FEATS.every((f) => f.type === "Estilo")).toBe(true);
    const comDuasArmas = CG_STYLE_FEATS.filter((f) => f.prerequisites.includes("Combater com Duas Armas"));
    expect(comDuasArmas).toHaveLength(9);
    expect(CG_STYLE_FEATS.find((f) => f.id === "cg-feat-tres-montanhas")!.prerequisites).not.toContain("Combater com Duas Armas");
  });
  it("Presa do Urso: sequência de Agarrar sem ataque de toque inicial, penalidade -4", () => {
    const f = CG_STYLE_FEATS.find((x) => x.id === "cg-feat-presa-do-urso")!;
    expect(f.benefit).toMatch(/Não é necessário o ataque de toque inicial/);
    expect(f.benefit).toMatch(/penalidade normal de -4 para atacar na manobra Agarrar/);
  });
  it("Três talentos de CD de Fortitude usam a mesma fórmula (10 + 1\\/2 nível + mod. de Força)", () => {
    const comCD = CG_STYLE_FEATS.filter((f) => f.benefit.includes("CD 10 + 1/2 do nível do personagem + modificador de Força"));
    expect(comCD.map((f) => f.id).sort()).toEqual(["cg-feat-bigorna-do-trovao", "cg-feat-lamina-do-martelo", "cg-feat-tres-montanhas"]);
  });
  it("Rede e Tridente: ataque combinado em uma única ação de rodada completa", () => {
    const f = CG_STYLE_FEATS.find((x) => x.id === "cg-feat-rede-e-tridente")!;
    expect(f.benefit).toMatch(/ação de rodada completa/);
    expect(f.benefit).toMatch(/passo de ajuste de 1,5 m/);
  });
});
