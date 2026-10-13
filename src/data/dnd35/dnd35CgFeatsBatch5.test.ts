import { describe, expect, it } from "vitest";
import { CG_FEATS } from "./dnd35CgFeats";

describe("Livro Completo do Guerreiro: fim dos Talentos Gerais + início dos Divinos (pp. 105-106)", () => {
  it("conjunto de talentos é não-vazio e sem duplicatas (total cresce a cada lote)", () => {
    const ids = new Set(CG_FEATS.map((f) => f.id));
    expect(ids.size).toBe(CG_FEATS.length);
    expect(CG_FEATS.length).toBeGreaterThanOrEqual(65);
  });
  it("Vitalidade Aprimorada encerra os 59 Talentos Gerais (pp.92-105)", () => {
    const gerais = CG_FEATS.filter((f) => f.type === "Geral");
    expect(gerais).toHaveLength(59);
    expect(gerais[gerais.length - 1].id).toBe("cg-feat-vitalidade-aprimorada");
  });
  it("6 Talentos Divinos transcritos (pp.106), todos exigem Expulsar/Fascinar Mortos-vivos", () => {
    const divinos = CG_FEATS.filter((f) => f.type === "Divino");
    expect(divinos).toHaveLength(6);
    expect(divinos.every((f) => f.prerequisites.includes("Expulsar/Fascinar Mortos"))).toBe(true);
  });
  it("Resistência Divina exige Purificação Divina; Força Divina adiciona Carisma ao dano", () => {
    const resistencia = CG_FEATS.find((x) => x.id === "cg-feat-resistencia-divina")!;
    const forca = CG_FEATS.find((x) => x.id === "cg-feat-forca-divina")!;
    expect(resistencia.prerequisites).toContain("Purificação Divina");
    expect(forca.benefit).toMatch(/adiciona seu bônus de Carisma a todas as suas jogadas de dano/);
  });
  it("Toque do Enfraquecimento: -6 de Força durante 1 minuto, sem acúmulo", () => {
    const f = CG_FEATS.find((x) => x.id === "cg-feat-toque-do-enfraquecimento")!;
    expect(f.benefit).toMatch(/-6 de penalidade na Força da vítima durante 1 minuto/);
    expect(f.benefit).toMatch(/não se acumulam/);
  });
});
