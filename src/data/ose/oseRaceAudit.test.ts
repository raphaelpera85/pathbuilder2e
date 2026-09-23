import { describe, expect, it } from "vitest";
import { OSE_RACES } from "./oseRaces";
import { OSE_CLASSES } from "./oseClasses";
import type { OseAbilityName } from "./oseRules";

/**
 * Auditoria do catálogo de raças contra o **Tomo do Jogador**, capítulo de
 * raças (páginas impressas 79–87).
 *
 * A auditoria de 2026-09-22 (rodada 7) encontrou 38 divergências nas dez raças:
 *  - todas apontavam para a p. 78, que é a regra opcional de levantamento de
 *    restrições — nenhuma raça é descrita ali;
 *  - idiomas faltando ou inexistentes ("Gnomo" em vez de "Gnômico", um idioma
 *    inventado no Svirfneblin);
 *  - modificadores de atributo ausentes em cinco raças;
 *  - tetos de nível por classe errados em seis raças;
 *  - habilidades raciais que não existem no livro (a "Magia Inata" do Drow como
 *    "Luz das Fadas", o "Poder Mental de Crescimento" do Duergar,
 *    "Constituição Vigorosa"/"Presença Intimidadora" do Meio-Orc, "Afinidade com
 *    Ilusões" e "Resistência Mágica Anã" fixa em +4 do Gnomo, "Resistência
 *    Heróica" fixa em +4 do Halfling).
 */
type RaceAudit = {
  page: number;
  min: Partial<Record<OseAbilityName, number>>;
  mods: Partial<Record<OseAbilityName, number>>;
  langs: string[];
  caps: Record<string, number | null>;
  /** trechos obrigatórios das habilidades */
  traits: string[];
  /** trechos que NÃO podem aparecer (conteúdo inventado) */
  forbidden?: string[];
};

const BOOK: Record<string, RaceAudit> = {
  humano: {
    page: 86, min: {}, mods: {}, langs: ["Alinhamento", "Comum"], caps: {},
    traits: ["não possuem habilidades raciais", "qualquer classe", "sem limite de nível"],
  },
  anao: {
    page: 81,
    min: { con: 9 }, mods: { cha: -1, con: 1 },
    langs: ["Alinhamento", "Comum", "Anão", "Gnômico", "Goblin", "Kobold"],
    caps: { assassino: 9, clerigo: 8, guerreiro: 10, ladrao: 9 },
    traits: ["2 em 6", "18 metros", "Resiliência", "7–10: +2", "18: +5"],
  },
  elfo: {
    page: 82,
    min: { int: 9 }, mods: { con: -1, dex: 1 },
    langs: ["Alinhamento", "Comum", "Élfico", "Gnoll", "Hobgoblin", "Orc"],
    caps: { acrobata: 10, assassino: 10, clerigo: 7, druida: 8, guerreiro: 7, cavaleiro: 11, mago: 11, ranger: 11, ladrao: 10 },
    traits: ["Carniçais", "18 metros", "2 em 6"],
  },
  halfling: {
    page: 85,
    min: { con: 9, dex: 9 }, mods: { dex: 1, str: -1 },
    langs: ["Alinhamento", "Comum", "Halfling"],
    caps: { druida: 6, guerreiro: 6, ladrao: 8 },
    traits: ["+2 na Classe de Armadura", "+1 nas jogadas de ataque com todas as armas de mísseis", "Resiliência", "7–10: +2"],
    // O livro não dá ao halfling um bônus fixo de +4 nas resistências.
    forbidden: ["+4 em jogadas de proteção", "Resistência Heróica"],
  },
  drow: {
    page: 79,
    min: { int: 9 }, mods: { con: -1, dex: 1 },
    langs: ["Alinhamento", "Comum", "Comum Profundo", "Élfico", "Gnômico"],
    caps: { acrobata: 10, assassino: 10, clerigo: 11, guerreiro: 7, cavaleiro: 9, mago: 9, ranger: 9, ladrao: 11 },
    traits: ["27 metros", "2º nível", "Escuridão", "4º nível", "Detectar Magia", "-2 nas jogadas de ataque", "-1 na Classe de Armadura", "Carniçais"],
    // O livro não menciona Luz das Fadas para o drow.
    forbidden: ["Luz das Fadas"],
  },
  duergar: {
    page: 80,
    min: { con: 9, int: 9 }, mods: { cha: -1, con: 1 },
    langs: ["Alinhamento", "Comum", "Comum Profundo", "Anão", "Gnômico", "Goblin", "Kobold"],
    caps: { assassino: 9, clerigo: 8, guerreiro: 9, ladrao: 9 },
    traits: ["27 metros", "3 em 6", "-2 nas jogadas de ataque", "-1 na Classe de Armadura", "paralisia", "18: +5"],
    // Não existe "poder mental de crescimento" nem furtividade 4 em 6 no livro.
    forbidden: ["Poder Mental", "4 em 6"],
  },
  gnomo: {
    page: 83,
    min: { con: 9, int: 9 }, mods: {},
    langs: ["Alinhamento", "Comum", "Anão", "Gnômico", "Kobold", "Mamíferos Escavadores"],
    caps: { assassino: 6, clerigo: 7, guerreiro: 6, ilusionista: 7, ladrao: 8 },
    traits: ["+2 na Classe de Armadura", "27 metros", "Mamíferos Escavadores", "feitiços e varinhas", "18: +5"],
    // "Nenhum" modificador de habilidade; nada de afinidade com ilusões nem +4 fixo.
    forbidden: ["Afinidade com Ilusões", "+4 em salvamentos"],
  },
  meio_elfo: {
    page: 84,
    min: { cha: 9, con: 9 }, mods: {},
    langs: ["Alinhamento", "Comum", "Élfico"],
    caps: { acrobata: 12, assassino: 11, bardo: 12, clerigo: 5, druida: 12, guerreiro: 8, cavaleiro: 12, mago: 8, paladino: 12, ranger: 8, ladrao: 12 },
    traits: ["18 metros", "2 em 6"],
  },
  meio_orc: {
    page: 86, min: {}, mods: { cha: -2, con: 1, str: 1 },
    langs: ["Alinhamento", "Comum", "Orc"],
    caps: { acrobata: 8, assassino: 8, clerigo: 4, guerreiro: 10, ladrao: 8 },
    traits: ["18 metros", "Ataque pelas Costas", "lealdade reduzida em 1"],
    forbidden: ["Constituição Vigorosa", "Presença Intimidadora"],
  },
  svirfneblin: {
    page: 87,
    min: { con: 9 }, mods: {},
    langs: ["Alinhamento", "Comum", "Comum Profundo", "Gnômico", "Anão", "Kobold", "Elementais da Terra"],
    caps: { assassino: 8, clerigo: 7, guerreiro: 6, ilusionista: 7, ladrao: 8 },
    traits: ["27 metros", "2 em 6", "Resistência à Ilusão", "+2", "Elementais da Terra", "Murmúrios de Pedra"],
    forbidden: ["Ilusões Naturais", "+4 em todos os testes"],
  },
};

const sorted = (value: Record<string, unknown>) => Object.fromEntries(
  Object.entries(value).sort(([a], [b]) => a.localeCompare(b)),
);
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

describe("OSE — auditoria do catálogo de raças contra o Tomo do Jogador", () => {
  it("declara a proveniência correta por raça, e não uma página única", () => {
    const pages = new Set(Object.values(OSE_RACES).map((race) => race.sourcePage));
    expect(pages.size).toBeGreaterThan(5);
    expect(pages.has(78)).toBe(false);
  });

  it("toda raça do catálogo tem auditoria declarada", () => {
    for (const id of Object.keys(OSE_RACES)) {
      expect(BOOK[id], `raça sem auditoria: ${id}`).toBeDefined();
    }
    for (const id of Object.keys(BOOK)) {
      expect(OSE_RACES[id], `auditoria para raça inexistente: ${id}`).toBeDefined();
    }
  });

  for (const [id, expected] of Object.entries(BOOK)) {
    describe(`${id} (Tomo p. ${expected.page})`, () => {
      it("proveniência, requisitos, modificadores de atributo e idiomas", () => {
        const race = OSE_RACES[id];
        expect(race.sourceBook).toBe("Old-School Essentials — Tomo do Jogador");
        expect(race.sourcePage).toBe(expected.page);
        expect(race.minRequirements).toEqual(expected.min);
        expect(race.statModifiers).toEqual(expected.mods);
        expect([...race.nativeLanguages].map(normalize).sort())
          .toEqual([...expected.langs].map(normalize).sort());
      });

      it("tetos de nível por classe são exatamente os do livro", () => {
        if (Object.keys(expected.caps).length === 0) return;
        expect(sorted(OSE_RACES[id].maxClassLevels)).toEqual(sorted(expected.caps));
      });

      it("os tetos só citam classes existentes no catálogo", () => {
        for (const classId of Object.keys(OSE_RACES[id].maxClassLevels)) {
          expect(OSE_CLASSES[classId], `${id} cita classe inexistente: ${classId}`).toBeDefined();
        }
      });

      it("as habilidades descrevem o que o livro diz, e nada que ele não diz", () => {
        const traits = OSE_RACES[id].traits.join(" | ");
        for (const needle of expected.traits) {
          expect(normalize(traits), `${id} deveria citar "${needle}"`).toContain(normalize(needle));
        }
        for (const needle of expected.forbidden ?? []) {
          expect(normalize(traits), `${id} não deveria citar "${needle}"`).not.toContain(normalize(needle));
        }
      });
    });
  }
});
