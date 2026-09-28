import { describe, expect, it } from "vitest";
import { DND35_RACES, DND35_RACE_IDS } from "./dnd35Races";

/**
 * Auditoria contra o conteúdo lido visualmente das páginas renderizadas do
 * PDF fonte (D&D 3.5 — Livro do Jogador, Capítulo 2 — Raças, páginas 13-20).
 * O PDF não possui camada de texto extraível (confirmado via pypdf e
 * pymupdf: 0 caracteres em todas as páginas testadas), por isso os dados
 * foram transcritos por leitura visual direta das páginas renderizadas em
 * alta resolução (400dpi), não por OCR nem por memória.
 */
describe("DND35_RACES — auditoria contra o Livro do Jogador (Capítulo 2)", () => {
  it("cataloga todas as 7 raças núcleo do Capítulo 2", () => {
    expect(DND35_RACE_IDS.sort()).toEqual(
      ["anao", "elfo", "gnomo", "halfling", "humano", "meio-elfo", "meio-orc"].sort(),
    );
  });

  it("Anão (p. 13): +2 Con, -2 Car; Médio; deslocamento 6m; Classe Predileta Guerreiro", () => {
    const r = DND35_RACES.anao;
    expect(r.sourcePageStart).toBe(13);
    expect(r.statModifiers).toEqual({ con: 2, car: -2 });
    expect(r.size).toBe("Médio");
    expect(r.baseSpeed).toBe(6);
    expect(r.favoredClass).toBe("Guerreiro");
    expect(r.traits.some((t) => t.includes("Estabilidade"))).toBe(true);
    expect(r.traits.some((t) => t.includes("Ligação com Pedras"))).toBe(true);
  });

  it("Elfo (p. 14): +2 Des, -2 Con; Médio; deslocamento 9m; imune a sono; Classe Predileta Mago", () => {
    const r = DND35_RACES.elfo;
    expect(r.sourcePageStart).toBe(14);
    expect(r.statModifiers).toEqual({ des: 2, con: -2 });
    expect(r.size).toBe("Médio");
    expect(r.baseSpeed).toBe(9);
    expect(r.favoredClass).toBe("Mago");
    expect(r.traits.some((t) => t.includes("Imunidade a magias e efeitos de sono"))).toBe(true);
    expect(r.traits.some((t) => t.includes("Usar Arma Comum"))).toBe(true);
  });

  it("Gnomo (p. 16): +2 Con, -2 For; Pequeno; deslocamento 6m; Classe Predileta Bardo", () => {
    const r = DND35_RACES.gnomo;
    expect(r.sourcePageStart).toBe(16);
    expect(r.statModifiers).toEqual({ con: 2, for: -2 });
    expect(r.size).toBe("Pequeno");
    expect(r.baseSpeed).toBe(6);
    expect(r.favoredClass).toBe("Bardo");
    expect(r.traits.some((t) => t.includes("Habilidades Similares à Magia"))).toBe(true);
  });

  it("Halfling (p. 20): +2 Des, -2 For; Pequeno; deslocamento 6m; Classe Favorecida Ladino", () => {
    const r = DND35_RACES.halfling;
    expect(r.sourcePageStart).toBe(20);
    expect(r.statModifiers).toEqual({ des: 2, for: -2 });
    expect(r.size).toBe("Pequeno");
    expect(r.baseSpeed).toBe(6);
    expect(r.favoredClass).toBe("Ladino");
    expect(r.traits.some((t) => t.includes("bônus de moral nos testes de resistência contra medo"))).toBe(true);
  });

  it("Humano (p. 13): sem modificadores; Médio; deslocamento 9m; talento e perícias extras no 1º nível", () => {
    const r = DND35_RACES.humano;
    expect(r.sourcePageStart).toBe(13);
    expect(r.statModifiers).toEqual({});
    expect(r.size).toBe("Médio");
    expect(r.baseSpeed).toBe(9);
    expect(r.traits.some((t) => t.includes("talento adicional no 1º nível"))).toBe(true);
    expect(r.traits.some((t) => t.includes("4 pontos adicionais de perícia"))).toBe(true);
  });

  it("Meio-Elfo (p. 17): sem modificadores; Médio; deslocamento 9m; Sangue Élfico", () => {
    const r = DND35_RACES["meio-elfo"];
    expect(r.sourcePageStart).toBe(17);
    expect(r.statModifiers).toEqual({});
    expect(r.size).toBe("Médio");
    expect(r.baseSpeed).toBe(9);
    expect(r.traits.some((t) => t.includes("Sangue Élfico"))).toBe(true);
    expect(r.traits.some((t) => t.includes("Diplomacia e Obter Informação"))).toBe(true);
  });

  it("Meio-Orc (p. 19): +2 For, -2 Int, -2 Car; Médio; deslocamento 9m; Classe Favorecida Bárbaro", () => {
    const r = DND35_RACES["meio-orc"];
    expect(r.sourcePageStart).toBe(19);
    expect(r.statModifiers).toEqual({ for: 2, int: -2, car: -2 });
    expect(r.size).toBe("Médio");
    expect(r.baseSpeed).toBe(9);
    expect(r.favoredClass).toBe("Bárbaro");
    expect(r.traits.some((t) => t.includes("Sangue Orc"))).toBe(true);
  });

  it("todas as raças têm nome, fonte, página, idiomas e ao menos um traço", () => {
    for (const race of Object.values(DND35_RACES)) {
      expect(race.name.length).toBeGreaterThan(0);
      expect(race.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(race.sourcePageStart).toBeGreaterThan(0);
      expect(race.languages.length).toBeGreaterThan(0);
      expect(race.traits.length).toBeGreaterThan(0);
      expect(race.favoredClass.length).toBeGreaterThan(0);
    }
  });
});
