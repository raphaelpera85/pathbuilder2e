import { describe, expect, it } from "vitest";
import { DND35_FEATS, DND35_FEAT_IDS } from "./dnd35Feats";

/**
 * Auditoria contra o conteúdo lido visualmente das páginas renderizadas do
 * PDF fonte (D&D 3.5 — Livro do Jogador, Capítulo 5 — Talentos, Tabela 5-1 e
 * descrições individuais, páginas 89-99). O PDF não possui camada de texto
 * extraível (confirmado via pypdf/pymupdf: 0 caracteres em todas as páginas
 * testadas), por isso os dados foram transcritos por leitura visual direta
 * das páginas renderizadas em alta resolução (400dpi), não por OCR nem por
 * memória. Este é um conjunto curado (não o Capítulo 5 completo, que tem
 * ~110 talentos).
 */
describe("DND35_FEATS — auditoria contra o Livro do Jogador (Capítulo 5, conjunto curado)", () => {
  it("cataloga ao menos 20 talentos curados", () => {
    expect(DND35_FEAT_IDS.length).toBeGreaterThanOrEqual(20);
  });

  it("Ataque Poderoso (p. 92): pré-requisito For 13, sem outros requisitos", () => {
    const f = DND35_FEATS["ataque-poderoso"];
    expect(f.sourcePage).toBe(92);
    expect(f.prerequisites).toEqual(["For 13"]);
    expect(f.type).toBe("geral");
  });

  it("Esquiva (p. 92): sem pré-requisitos, bônus de esquiva +1 contra um oponente escolhido", () => {
    const f = DND35_FEATS.esquiva;
    expect(f.sourcePage).toBe(92);
    expect(f.prerequisites).toEqual([]);
    expect(f.benefit).toContain("+1 de bônus de esquiva");
  });

  it("Combate com Duas Armas (p. 93): pré-requisito Des 15", () => {
    const f = DND35_FEATS["combate-com-duas-armas"];
    expect(f.sourcePage).toBe(93);
    expect(f.prerequisites).toEqual(["Des 15"]);
  });

  it("Especialização em Arma (p. 94): exige Foco em Arma e 4º nível de guerreiro", () => {
    const f = DND35_FEATS["especializacao-em-arma"];
    expect(f.sourcePage).toBe(94);
    expect(f.prerequisites).toContain("Foco em Arma");
    expect(f.prerequisites).toContain("4º nível de guerreiro");
  });

  it("Iniciativa Aprimorada (p. 97): sem pré-requisitos, +4 de bônus em Iniciativa", () => {
    const f = DND35_FEATS["iniciativa-aprimorada"];
    expect(f.sourcePage).toBe(97);
    expect(f.prerequisites).toEqual([]);
    expect(f.benefit).toContain("+4 de bônus nos testes de Iniciativa");
  });

  it("Liderança (p. 97): exige 6º nível de personagem", () => {
    const f = DND35_FEATS.lideranca;
    expect(f.prerequisites).toEqual(["6º nível de personagem"]);
  });

  it("classifica corretamente talentos de criação de item e metamágicos", () => {
    expect(DND35_FEATS["escrever-pergaminho"].type).toBe("criacao_item");
    expect(DND35_FEATS["acelerar-magia"].type).toBe("metamagico");
    expect(DND35_FEATS["ampliar-magia"].type).toBe("metamagico");
  });

  it("todos os talentos têm nome, fonte, página e benefício preenchidos", () => {
    for (const feat of Object.values(DND35_FEATS)) {
      expect(feat.name.length).toBeGreaterThan(0);
      expect(feat.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(feat.sourcePage).toBeGreaterThan(0);
      expect(feat.benefit.length).toBeGreaterThan(0);
      expect(["geral", "criacao_item", "metamagico"]).toContain(feat.type);
    }
  });
});
