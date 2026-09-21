import { describe, expect, it } from "vitest";
import {
  getCoreCatalog,
  isT20PowerPrerequisiteSatisfied,
  T20_DEITIES,
  T20_DRUID_DEITY_IDS,
  T20_PALADIN_DEITY_IDS,
} from "./multiSystemCharacter";
import type { MultiSystemCharacter } from "./multiSystemCharacter";

/**
 * Pré-requisitos de poder do Tormenta 20.
 *
 * Duas classes de defeito são cobertas:
 *  1. cláusula impossível de satisfazer — o poder desaparece do construtor sem
 *     nenhum erro visível ao usuário;
 *  2. cláusula com "e" tratada como texto livre, liberando quem não atende
 *     todas as perícias exigidas.
 */
const catalog = getCoreCatalog("t20");

type T20PowerEntry = {
  id: string;
  name: string;
  prerequisite: string;
  powerGroup?: string;
  classIds?: string[];
  deityIds?: string[];
};

const ALL_CLASS_IDS = [
  "arcanista", "barbaro", "bardo", "bucaneiro", "cacador", "cavaleiro", "clerigo", "druida",
  "guerreiro", "inventor", "ladino", "lutador", "nobre", "paladino",
];
const ARCANIST_PATHS = ["bruxo", "feiticeiro", "mago"] as const;
const REPEATABLE_FEAT_IDS = catalog.feats
  .filter((feat) => "repeatable" in feat && feat.repeatable)
  .map((feat) => feat.id);

function t20Character(overrides: Partial<MultiSystemCharacter> = {}): MultiSystemCharacter {
  const character = {
    id: "test",
    name: "Teste",
    system_id: "t20",
    systemId: "t20",
    ruleset: "padrao",
    level: 1,
    raceId: catalog.races[0].id,
    classId: "guerreiro",
    abilities: { str: 16, dex: 16, con: 16, int: 16, wis: 16, cha: 16 },
    skillProficiencies: [],
    equipmentIds: [],
    spellIds: [],
    featIds: [],
    notes: "",
  } as MultiSystemCharacter;
  return Object.assign(character, overrides);
}

/**
 * Personagem que atende a tudo que é verificável dentro do escopo informado —
 * o teto do sistema para uma classe, divindade e caminho de arcanista.
 */
function maximalCharacter(classId: string, deity?: string, arcanistPath?: string): MultiSystemCharacter {
  return t20Character({
    level: 20,
    classId,
    // Atributos no teto: os ajustes raciais somam por cima destes valores.
    abilities: { str: 20, dex: 20, con: 20, int: 20, wis: 20, cha: 20 },
    skillProficiencies: catalog.skills.map((skill) => skill.id),
    featIds: catalog.feats.map((feat) => feat.id),
    // Poderes marcados como repetíveis podem ser escolhidos mais de uma vez.
    featQuantities: Object.fromEntries(REPEATABLE_FEAT_IDS.map((id) => [id, 4])),
    deity,
    t20ArcanistPath: arcanistPath as MultiSystemCharacter["t20ArcanistPath"],
  });
}

function t20PowersWithPrerequisite(): T20PowerEntry[] {
  return catalog.feats.filter(
    (feat) => "prerequisite" in feat && typeof feat.prerequisite === "string" && feat.prerequisite.length > 0,
  ) as T20PowerEntry[];
}

/** Divindades legais para a combinação poder + classe, e não todas as divindades. */
function legalDeities(power: T20PowerEntry, classId: string): Array<string | undefined> {
  if (power.deityIds?.length) return power.deityIds;
  if (classId === "paladino") return [...T20_PALADIN_DEITY_IDS];
  if (classId === "druida") return [...T20_DRUID_DEITY_IDS];
  return T20_DEITIES.map((deity) => deity.id);
}

describe("T20 — pré-requisitos de poder", () => {
  it("Finta Aprimorada exige treinamento em Enganação E em Luta", () => {
    // Tormenta 20, p. 134: "Pré-requisitos: treinado em Enganação e Luta."
    const prerequisite = "Treinado em Enganação e Luta";
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ skillProficiencies: [] }), prerequisite)).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ skillProficiencies: ["luta"] }), prerequisite)).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ skillProficiencies: ["enganacao"] }), prerequisite)).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ skillProficiencies: ["luta", "enganacao"] }), prerequisite)).toBe(true);
  });

  it("nenhum pré-requisito do catálogo é impossível de satisfazer", () => {
    const powers = t20PowersWithPrerequisite();
    expect(powers.length).toBeGreaterThan(100);

    const unreachable = powers
      .filter((power) => {
        const classes = power.classIds?.length ? power.classIds : ALL_CLASS_IDS;
        return !classes.some((classId) => {
          if (!ALL_CLASS_IDS.includes(classId)) return false;
          const paths: Array<string | undefined> = classId === "arcanista" ? [...ARCANIST_PATHS] : [undefined];
          return paths.some((path) => legalDeities(power, classId)
            .some((deity) => isT20PowerPrerequisiteSatisfied(maximalCharacter(classId, deity, path), power.prerequisite)));
        });
      })
      .map((power) => `${power.id}: ${power.prerequisite}`);

    // Um poder cujo pré-requisito nunca é satisfeito some do seletor de poderes.
    expect(unreachable).toEqual([]);
  });

  it("mantém permissivas as cláusulas ambíguas, sem bloquear poderes válidos", () => {
    // "Foco em Perícia" depende de uma perícia escolhida fora do pré-requisito e
    // "Foco em Arma" da arma escolhida: não há como decidir só pelo texto.
    const bare = t20Character({ skillProficiencies: [] });
    expect(isT20PowerPrerequisiteSatisfied(bare, "Treinado na perícia escolhida")).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(bare, "Proficiência com a arma")).toBe(true);
  });

  it("aceita 'Proficiência com Ofício (alquimia)' por meio do alias de perícia", () => {
    const alquimista = t20Character({ skillProficiencies: ["oficio"] });
    expect(isT20PowerPrerequisiteSatisfied(alquimista, "Treinado em Ofício (alquimia)")).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ skillProficiencies: [] }), "Treinado em Ofício (alquimia)")).toBe(false);
  });

  it("resolve as alternativas de 'ou' sem exigir ambas", () => {
    const atirador = t20Character({ featIds: ["t20.poder.estilo_de_disparo"] });
    const arremessador = t20Character({ featIds: ["t20.poder.estilo_de_arremesso"] });
    const prerequisite = "Estilo de Disparo ou Estilo de Arremesso";

    expect(isT20PowerPrerequisiteSatisfied(atirador, prerequisite)).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(arremessador, prerequisite)).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(t20Character(), prerequisite)).toBe(false);
  });

  it("as exigências de nível e atributo continuam bloqueando", () => {
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ level: 11 }), "nível 12")).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ level: 12 }), "nível 12")).toBe(true);

    const forte = t20Character({ abilities: { str: 20, dex: 8, con: 20, int: 20, wis: 20, cha: 20 } });
    expect(isT20PowerPrerequisiteSatisfied(forte, "For 20")).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(forte, "Des 20")).toBe(false);
    // Uma exigência de atributo em outra cláusula não é perdoada pela primeira.
    expect(isT20PowerPrerequisiteSatisfied(forte, "For 20; Des 20")).toBe(false);
  });

  it("as cláusulas separadas por ponto e vírgula são cumulativas", () => {
    const treinado = t20Character({ level: 8, skillProficiencies: ["luta"] });
    expect(isT20PowerPrerequisiteSatisfied(treinado, "Des 15; Treinado em Luta")).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(treinado, "Des 15; Treinado em Cavalgar")).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(treinado, "Treinado em Cavalgar; Treinado em Luta")).toBe(false);
  });

  it("exige devoção compatível para os poderes que restringem divindade", () => {
    // Tormenta 20, p. 88: "Pré-requisito: devoto de uma divindade (exceto Lena e Marah)."
    const prerequisite = "Devoto de uma divindade (exceto Lena e Marah)";
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ deity: "khalmyr" }), prerequisite)).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ deity: "lena" }), prerequisite)).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character({ deity: "marah" }), prerequisite)).toBe(false);
    expect(isT20PowerPrerequisiteSatisfied(t20Character(), prerequisite)).toBe(false);
  });
});
