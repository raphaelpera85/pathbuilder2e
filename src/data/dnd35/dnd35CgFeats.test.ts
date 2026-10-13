import { describe, expect, it } from "vitest";
import { CG_FEATS } from "./dnd35CgFeats";

describe("Livro Completo do Guerreiro: Talentos Gerais, 1º lote (pp. 92-97)", () => {
  it("15 talentos deste lote presentes no catálogo total, todos únicos e do tipo Geral", () => {
    const lote1 = CG_FEATS.filter((f) => f.page <= 97);
    expect(lote1).toHaveLength(15);
    const ids = new Set(CG_FEATS.map((f) => f.id));
    expect(ids.size).toBe(CG_FEATS.length);
    expect(lote1.every((f) => f.type === "Geral")).toBe(true);
  });
  it("Abraço da Terra: pré-requisitos e dano de imobilização corretos", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-abraco-da-terra")!;
    expect(f.prerequisites).toBe("For 15, Agarrar Aprimorado ou habilidade similar, Ataque Desarmado Aprimorado");
    expect(f.benefit).toMatch(/1d12 pontos de dano adicional a cada rodada/);
  });
  it("Chute Giratório: exemplo numérico de Ember preservado", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-chute-giratorio")!;
    expect(f.benefit).toMatch(/bônus base de ataque \+11\/\+6\/\+1/);
  });
  it("Bloqueio Ambidestro Aprimorado/Maior escalam +2→+4 e +3→+6", () => {
    const aprim = CG_FEATS.find((x) => x.id === "cg-feat-bloqueio-ambidestro-aprimorado")!;
    const maior = CG_FEATS.find((x) => x.id === "cg-feat-bloqueio-ambidestro-maior")!;
    expect(aprim.benefit).toMatch(/\+2 de bônus de escudo na CA.*\+4/);
    expect(maior.benefit).toMatch(/\+3 de bônus de escudo na CA.*\+6/);
  });
  it("Brado Kiai Aprimorado exige Brado Kiai e BBA +9, dobra a duração do medo", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-brado-kiai-aprimorado")!;
    expect(f.prerequisites).toContain("Brado Kiai");
    expect(f.benefit).toMatch(/2d6 rodadas/);
  });
});
