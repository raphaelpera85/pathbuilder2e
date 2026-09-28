import { describe, expect, it } from "vitest";
import {
  OSE_CLASSIC_CORE_CLASS_IDS,
  OSE_CLASSIC_RACE_BY_CLASS,
  OSE_BASIC_METHOD_RACE_BY_CLASS,
  isOseClassAllowedForRace,
  isOseClassAvailableForMode,
} from "./oseRules";
import { OSE_CLASSES } from "./oseClasses";
import { OSE_RACES } from "./oseRaces";

/**
 * Matriz por classe do núcleo OSE.
 *
 * O livro Classic Fantasy apresenta sete opções — Clérigo, Anão, Elfo,
 * Guerreiro, Halfling, Mago e Ladrão — enquanto o Advanced Fantasy separa raça
 * de classe. As progressões do catálogo já trazem os limites do clássico
 * (Anão 12, Elfo 10, Halfling 8; humanas 14), então a disponibilidade precisa
 * refletir a mesma divisão.
 */
describe("OSE — disponibilidade de classes por apresentação", () => {
  const classes = Object.values(OSE_CLASSES);

  it("Classic oferece exatamente as sete opções do livro", () => {
    const classic = classes.filter((entry) => isOseClassAvailableForMode(entry, "classic")).map((entry) => entry.id).sort();
    expect(classic).toEqual(["anao_bx", "clerigo", "elfo_bx", "guerreiro", "halfling_bx", "ladrao", "mago"]);
  });

  it("Classic não oferece nenhuma classe exclusiva do Advanced", () => {
    const advancedOnly = ["acrobata", "assassino", "barbaro", "bardo", "druida", "paladino", "ranger", "ilusionista", "cavaleiro"];
    for (const id of advancedOnly) {
      expect(isOseClassAvailableForMode(OSE_CLASSES[id], "classic"), id).toBe(false);
      expect(isOseClassAvailableForMode(OSE_CLASSES[id], "advanced"), id).toBe(true);
    }
  });

  it("Advanced não reaproveita as classes raciais", () => {
    for (const id of Object.keys(OSE_CLASSIC_RACE_BY_CLASS)) {
      expect(isOseClassAvailableForMode(OSE_CLASSES[id], "advanced"), id).toBe(false);
      expect(isOseClassAvailableForMode(OSE_CLASSES[id], "classic"), id).toBe(true);
    }
  });

  it("as quatro classes humanas do Classic mantêm a progressão de 14 níveis", () => {
    for (const id of OSE_CLASSIC_CORE_CLASS_IDS) {
      const entry = OSE_CLASSES[id];
      expect(entry, id).toBeDefined();
      expect(entry.isRaceClass, id).not.toBe(true);
      expect(entry.progression.at(-1)?.level, id).toBe(14);
    }
  });

  it("os limites de nível das classes raciais batem com o clássico", () => {
    const caps: Record<string, number> = { anao_bx: 12, elfo_bx: 10, halfling_bx: 8 };
    for (const [id, cap] of Object.entries(caps)) {
      const entry = OSE_CLASSES[id];
      expect(entry.isRaceClass, id).toBe(true);
      expect(entry.progression.length, id).toBe(cap);
      expect(entry.progression.at(-1)?.level, id).toBe(cap);
    }
  });

  it("toda classe racial clássica tem mapeamento para uma raça existente", () => {
    const classicRacialClasses = classes
      .filter((entry) => entry.isRaceClass && isOseClassAvailableForMode(entry, "classic"))
      .map((entry) => entry.id)
      .sort();
    // Sem mapeamento a ficha cairia silenciosamente em "humano".
    expect(Object.keys(OSE_CLASSIC_RACE_BY_CLASS).sort()).toEqual(classicRacialClasses);
    const mappedRaces = Object.values(OSE_CLASSIC_RACE_BY_CLASS);
    expect(new Set(mappedRaces).size).toBe(mappedRaces.length);
    for (const raceId of mappedRaces) {
      expect(OSE_RACES[raceId], raceId).toBeDefined();
    }
  });

  it("as classes humanas clássicas são acessíveis a qualquer raça em Advanced", () => {
    const human = OSE_RACES.humano;
    for (const id of OSE_CLASSIC_CORE_CLASS_IDS) {
      expect(isOseClassAvailableForMode(OSE_CLASSES[id], "advanced"), id).toBe(true);
      expect(isOseClassAllowedForRace(human, OSE_CLASSES[id]), id).toBe(true);
    }
  });

  it("a tabela raça × classe só traz tetos válidos (número positivo ou null)", () => {
    // `null` documenta "ilimitado" e a chave ausente significa "não permitido".
    // Um valor 0, negativo ou acima da progressão da classe quebraria o teto
    // exibido no assistente.
    const problems: string[] = [];
    const classCaps = new Map(classes.map((entry) => [entry.id, entry.progression.at(-1)?.level ?? 0]));
    for (const [raceId, race] of Object.entries(OSE_RACES)) {
      for (const [classId, cap] of Object.entries(race.maxClassLevels)) {
        if (cap === null) continue;
        const classCap = classCaps.get(classId);
        if (classCap === undefined) {
          problems.push(`${raceId}.${classId}: classe inexistente no catálogo`);
          continue;
        }
        if (!Number.isInteger(cap) || cap < 1 || cap > classCap) {
          problems.push(`${raceId}.${classId}: teto ${cap} fora de 1..${classCap}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("Criação Básica oferece as classes do Advanced Fantasy, com as seis semi-humanas fixando a própria raça", () => {
    const basicoIds = classes.filter((entry) => isOseClassAvailableForMode(entry, "basico")).map((entry) => entry.id).sort();
    // A Criação Básica usa o catálogo Advanced Fantasy (13 classes + as 6
    // semi-humanas do próprio livro); as classes raciais exclusivas do outro
    // livro, Classic Fantasy (anao_bx, elfo_bx, halfling_bx, com tabelas de
    // progressão próprias e mais curtas), não pertencem a este método.
    const expectedIds = Object.keys(OSE_CLASSES).filter((id) => !Object.keys(OSE_CLASSIC_RACE_BY_CLASS).includes(id)).sort();
    expect(basicoIds).toEqual(expectedIds);
    for (const [classId, raceId] of Object.entries(OSE_BASIC_METHOD_RACE_BY_CLASS)) {
      expect(OSE_RACES[raceId], classId).toBeDefined();
    }
    // Advanced e Classic continuam sem as seis classes semi-humanas da
    // Criação Básica: elas não aparecem em nenhum dos dois outros filtros.
    for (const classId of Object.keys(OSE_BASIC_METHOD_RACE_BY_CLASS)) {
      expect(isOseClassAvailableForMode(OSE_CLASSES[classId], "advanced"), classId).toBe(false);
      expect(isOseClassAvailableForMode(OSE_CLASSES[classId], "classic"), classId).toBe(false);
    }
  });
});
