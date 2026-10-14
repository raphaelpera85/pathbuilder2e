// ============================================================================
// Testes: D&D 3.5 — Livro Completo do Aventureiro, Capítulo 3 (Talentos)
// Primeiro lote de talentos gerais (pp. 103-113). Cobertura: todos os
// registros têm id único, categoria válida, e os campos textuais citados em
// outras classes de prestígio batem literalmente (Salto Símio, Vôo
// Aprimorado, Natação Aprimorada — já citados como pré-requisitos † em
// dnd35AdvPrestige.ts).
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_ADV_FEATS } from "./dnd35AdvFeats";

describe("D&D 3.5 — Livro Completo do Aventureiro: Talentos (Capítulo 3, primeiro lote)", () => {
  it("todos os talentos têm id único e não vazio", () => {
    const ids = DND35_ADV_FEATS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.length > 0)).toBe(true);
  });

  it("categorias restritas a geral, musica_de_bardo ou selvagem", () => {
    expect(DND35_ADV_FEATS.every((f) => ["geral", "musica_de_bardo", "selvagem"].includes(f.category))).toBe(true);
  });

  it("totaliza 33 talentos (Capítulo 3 completo: gerais A-V + música de bardo + selvagens)", () => {
    expect(DND35_ADV_FEATS).toHaveLength(33);
  });

  it("Salto Símio exige 4 graduações em Escalar e 4 em Saltar, só funciona a 6m do solo em floresta média/densa", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-salto-simio")!;
    expect(f.prerequisites).toEqual(["4 graduações em Escalar", "4 graduações em Saltar"]);
    expect(f.benefit).toMatch(/pelo menos 6 m do solo/);
    expect(f.benefit).toMatch(/florestas médias ou densas/);
  });

  it("Vôo Aprimorado melhora a manobra em uma categoria (desajeitado→ruim→médio→bom→perfeito)", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-voo-aprimorado")!;
    expect(f.prerequisites).toEqual(["Capacidade de vôo (natural, mágico ou através de metamorfose)"]);
    expect(f.benefit).toMatch(/de desajeitado para ruim, de ruim para médio, de médio para bom e de bom para perfeito/);
  });

  it("Natação Aprimorada dobra a velocidade de natação (metade do deslocamento como ação de movimento)", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-natacao-aprimorada")!;
    expect(f.prerequisites).toEqual(["6 graduações em Natação"]);
    expect(f.normal).toMatch(/um quarto de seu deslocamento/);
  });

  it("talentos de música de bardo exigem a característica de classe música de bardo como pré-requisito comum", () => {
    const musicaBardo = DND35_ADV_FEATS.filter((f) => f.category === "musica_de_bardo");
    expect(musicaBardo.length).toBeGreaterThanOrEqual(3);
    expect(musicaBardo.every((f) => f.prerequisites.some((p) => p.toLowerCase().includes("música de bardo")))).toBe(true);
  });

  it("Ladino Asceta permite BBA/multiclasse ladino+monge sem penalidade, mas exige Leal para manter monge", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-ladino-asceta")!;
    expect(f.benefit).toMatch(/deve continuar sendo Leal para conservar suas habilidades de monge/);
  });

  it("Agarrar Selvagem (categoria selvagem) nega bônus a criaturas imunes a ataque furtivo", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-agarrar-selvagem")!;
    expect(f.category).toBe("selvagem");
    expect(f.benefit).toMatch(/As criaturas imunes a ataques furtivos não sofrem o dano adicional/);
  });

  it("todos os talentos selvagens exigem forma selvagem (ou habilidade de classe equivalente) como pré-requisito", () => {
    const selvagens = DND35_ADV_FEATS.filter((f) => f.category === "selvagem");
    expect(selvagens.length).toBeGreaterThanOrEqual(6);
    expect(selvagens.every((f) => f.prerequisites.some((p) => p.toLowerCase().includes("forma selvagem")))).toBe(true);
  });

  it("Visão da Águia reduz a penalidade por distância pela metade (observar e ataques à distância)", () => {
    const f = DND35_ADV_FEATS.find((x) => x.id === "adv-feat-visao-da-aguia")!;
    expect(f.benefit).toMatch(/-1 nos ataques à distância por incremento \(em vez de -2\)/);
    expect(f.benefit).toMatch(/-1 de penalidade nos testes de Observar para cada 6 m de distância \(em vez de -1 a cada 3 m\)/);
  });
});
