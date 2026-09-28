import { describe, expect, it } from "vitest";
import { DND35_CLASSES, DND35_CLASS_IDS } from "./dnd35Classes";

/**
 * Auditoria contra o conteúdo lido visualmente das páginas renderizadas do
 * PDF fonte (D&D 3.5 — Livro do Jogador, Capítulo 3 — Classes, páginas
 * 21-59). O PDF não possui camada de texto extraível (confirmado via pypdf
 * e pymupdf: 0 caracteres em todas as páginas testadas), por isso os dados
 * foram transcritos por leitura visual direta das páginas renderizadas em
 * alta resolução (400dpi), não por OCR nem por memória.
 */
describe("DND35_CLASSES — auditoria contra o Livro do Jogador (Capítulo 3)", () => {
  it("cataloga todas as 11 classes núcleo do Capítulo 3", () => {
    expect(DND35_CLASS_IDS.sort()).toEqual(
      [
        "barbaro", "bardo", "clerigo", "druida", "feiticeiro", "guerreiro",
        "ladino", "mago", "monge", "paladino", "patrulheiro",
      ].sort(),
    );
  });

  it("Bárbaro (p. 24): d12, BBA boa, Fort boa, tendência não ordeira", () => {
    const c = DND35_CLASSES.barbaro;
    expect(c.sourcePageStart).toBe(24);
    expect(c.hitDie).toBe(12);
    expect(c.babProgression).toBe("boa");
    expect(c.goodSaves).toEqual(["fortitude"]);
    expect(c.alignment).toContain("não ordeira");
  });

  it("Bardo (p. 26): d6, conjurador arcano espontâneo por Carisma, exceto Leal", () => {
    const c = DND35_CLASSES.bardo;
    expect(c.sourcePageStart).toBe(26);
    expect(c.hitDie).toBe(6);
    expect(c.casterType).toBe("arcano_espontaneo");
    expect(c.castingAbility).toBe("car");
    expect(c.alignment).toContain("exceto Leal");
  });

  it("Clérigo (p. 30): d8, conjurador divino preparado por Sabedoria, tendência ligada à divindade", () => {
    const c = DND35_CLASSES.clerigo;
    expect(c.sourcePageStart).toBe(30);
    expect(c.hitDie).toBe(8);
    expect(c.casterType).toBe("divino_preparado");
    expect(c.castingAbility).toBe("sab");
    expect(c.goodSaves).toEqual(["fortitude", "vontade"]);
  });

  it("Druida (p. 33): d8, conjurador divino por Sabedoria, tendência deve conter Neutro", () => {
    const c = DND35_CLASSES.druida;
    expect(c.sourcePageStart).toBe(33);
    expect(c.hitDie).toBe(8);
    expect(c.casterType).toBe("divino_preparado");
    expect(c.alignment).toContain("Neutro");
  });

  it("Feiticeiro (p. 38): d4, arcano espontâneo por Carisma, qualquer tendência", () => {
    const c = DND35_CLASSES.feiticeiro;
    expect(c.sourcePageStart).toBe(38);
    expect(c.hitDie).toBe(4);
    expect(c.casterType).toBe("arcano_espontaneo");
    expect(c.castingAbility).toBe("car");
    expect(c.babProgression).toBe("ruim");
  });

  it("Guerreiro (p. 41): d10, BBA boa, qualquer tendência", () => {
    const c = DND35_CLASSES.guerreiro;
    expect(c.sourcePageStart).toBe(41);
    expect(c.hitDie).toBe(10);
    expect(c.babProgression).toBe("boa");
    expect(c.goodSaves).toEqual(["fortitude"]);
  });

  it("Ladino (p. 43): d6, 8 pontos de perícia por nível, boa Reflexos", () => {
    const c = DND35_CLASSES.ladino;
    expect(c.sourcePageStart).toBe(43);
    expect(c.hitDie).toBe(6);
    expect(c.skillPointsPerLevel).toBe(8);
    expect(c.goodSaves).toEqual(["reflexos"]);
  });

  it("Mago (p. 46): d4, arcano preparado por Inteligência", () => {
    const c = DND35_CLASSES.mago;
    expect(c.sourcePageStart).toBe(46);
    expect(c.hitDie).toBe(4);
    expect(c.casterType).toBe("arcano_preparado");
    expect(c.castingAbility).toBe("int");
  });

  it("Monge (p. 48): d8, sempre Leal, boas Fortitude/Reflexos/Vontade", () => {
    const c = DND35_CLASSES.monge;
    expect(c.sourcePageStart).toBe(48);
    expect(c.hitDie).toBe(8);
    expect(c.goodSaves).toEqual(["fortitude", "reflexos", "vontade"]);
    expect(c.alignment).toContain("Leal");
  });

  it("Paladino (p. 51): d10, Leal e Bom obrigatório, conjurador divino por Sabedoria", () => {
    const c = DND35_CLASSES.paladino;
    expect(c.sourcePageStart).toBe(51);
    expect(c.hitDie).toBe(10);
    expect(c.alignment).toContain("Leal e Bom");
    expect(c.casterType).toBe("divino_preparado");
  });

  it("Patrulheiro (p. 55): d8, BBA boa, boas Fortitude/Reflexos, conjurador divino por Sabedoria", () => {
    const c = DND35_CLASSES.patrulheiro;
    expect(c.sourcePageStart).toBe(55);
    expect(c.hitDie).toBe(8);
    expect(c.babProgression).toBe("boa");
    expect(c.goodSaves).toEqual(["fortitude", "reflexos"]);
    expect(c.casterType).toBe("divino_preparado");
  });

  it("todas as classes têm nome, fonte, página, dado de vida e ao menos uma perícia de classe", () => {
    for (const klass of Object.values(DND35_CLASSES)) {
      expect(klass.name.length).toBeGreaterThan(0);
      expect(klass.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(klass.sourcePageStart).toBeGreaterThan(0);
      expect([4, 6, 8, 10, 12]).toContain(klass.hitDie);
      expect(klass.classSkills.length).toBeGreaterThan(0);
      expect(klass.skillPointsPerLevel).toBeGreaterThan(0);
    }
  });
});
