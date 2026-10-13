import { describe, expect, it } from "vitest";
import { CG_FEATS } from "./dnd35CgFeats";

describe("Livro Completo do Guerreiro: Talentos Gerais, 3º lote (pp. 100-102)", () => {
  it("conjunto de talentos é não-vazio e sem duplicatas (total cresce a cada lote)", () => {
    const ids = new Set(CG_FEATS.map((f) => f.id));
    expect(ids.size).toBe(CG_FEATS.length);
    expect(CG_FEATS.length).toBeGreaterThanOrEqual(39);
  });
  it("Golpe Arcano: exemplo numérico de Yarren preservado", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-golpe-arcano")!;
    expect(f.benefit).toMatch(/BBA\+11/);
    expect(f.benefit).toMatch(/\+4 de bônus nas jogadas de ataque e inflige 4d4 pontos de dano adicional/);
  });
  it("Golpe Arterial: sangramento cumulativo e CD de estancar", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-golpe-arterial")!;
    expect(f.benefit).toMatch(/dois golpes arteriais causariam a perda de 2 pontos de vida adicionais/);
    expect(f.benefit).toMatch(/CD 15/);
  });
  it("Familiar Aprimorado: 7 familiares com requisitos distintos", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-familiar-aprimorado")!;
    for (const nome of ["Krenshar", "Worg", "Cão Teleportador", "Cão Infernal", "Hipogrifo", "Uivante", "Lobo das Estepes"]) {
      expect(f.prerequisites).toContain(nome);
    }
  });
  it("Fúria Adicional e Fúria Prolongada são cumulativos e podem ser repetidos", () => {
    const adicional = CG_FEATS.find((x) => x.id === "cg-feat-furia-adicional")!;
    const prolongada = CG_FEATS.find((x) => x.id === "cg-feat-furia-prolongada")!;
    expect(adicional.special).toMatch(/cumulativos/);
    expect(prolongada.benefit).toMatch(/5 rodadas adicionais/);
  });
});
