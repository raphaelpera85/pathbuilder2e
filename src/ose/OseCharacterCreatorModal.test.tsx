import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OseCharacterCreatorModal, type OseCharacterCreatedData } from "./OseCharacterCreatorModal";
import { OSE_CLASSES } from "../data/ose/oseClasses";
import { isOseClassAvailableForMode } from "../data/ose/oseRules";

/**
 * Verificação de DOM do fluxo Classic.
 *
 * O OSE Classic Fantasy tem sete classes (Clérigo, Anão, Elfo, Guerreiro,
 * Halfling, Mago e Ladrão). A matriz de dados cobre a regra; este teste
 * confirma que a interface realmente oferece essas sete — inclusive ao
 * reabrir uma ficha clássica existente.
 */
const CLASSIC_NAMES = [
  "Anão (Classe Clássica)",
  "Clérigo",
  "Elfo (Classe Clássica)",
  "Guerreiro",
  "Halfling (Classe Clássica)",
  "Ladrão",
  "Mago",
];
const ADVANCED_ONLY_NAMES = ["Acrobata", "Assassino", "Bárbaro", "Bardo", "Druida", "Paladino", "Ranger", "Ilusionista", "Cavaleiro"];

// O setup de testes não registra auto-cleanup: sem isso o DOM de um teste
// vaza para o próximo e as consultas encontram modais antigos.
afterEach(cleanup);

function classicCharacter(overrides: Partial<OseCharacterCreatedData> = {}): OseCharacterCreatedData {
  return {
    id: "ose-classic-teste",
    name: "Clérigo de Karameikos",
    system_id: "ose",
    ruleset: "classic",
    raceId: "humano",
    classId: "clerigo",
    level: 1,
    xp: 0,
    alignment: "ordeiro",
    abilities: { str: 12, int: 10, wis: 15, dex: 11, con: 13, cha: 9 },
    maxHp: 6,
    currentHp: 6,
    goldGp: 110,
    languages: ["comum"],
    weapons: [],
    armors: [],
    gear: [],
    spellsKnown: [],
    preparedSpells: [],
    ...overrides,
  };
}

/** Renderiza e avança do passo 1 (atributos) para o passo 2 (raça & classe). */
function openClassStep(initialCharacter?: OseCharacterCreatedData) {
  render(
    <OseCharacterCreatorModal
      isOpen
      onClose={vi.fn()}
      onCharacterCreated={vi.fn()}
      initialCharacter={initialCharacter}
    />,
  );
  // O modal é montado em portal no document.body, então a consulta é global;
  // o afterEach(cleanup) garante que apenas este teste contribua para o DOM.
  const advance = screen.getAllByRole("button").find((button) => /Avançar/i.test(button.textContent || ""));
  expect(advance, "botão Avançar do passo 1").toBeDefined();
  fireEvent.click(advance!);
}

const bodyText = () => document.body.textContent || "";

describe("Assistente OSE — passo de classe", () => {
  it("reabre uma ficha clássica oferecendo as sete classes e nenhuma do Advanced", () => {
    openClassStep(classicCharacter());
    const body = bodyText();

    for (const name of CLASSIC_NAMES) {
      expect(body, name).toContain(name);
    }
    for (const name of ADVANCED_ONLY_NAMES) {
      expect(body, name).not.toContain(name);
    }
  });

  it("no modo Advanced lista as classes separadas e esconde as raciais", () => {
    openClassStep();
    const body = bodyText();

    expect(body).toContain("Bárbaro");
    expect(body).not.toContain("Anão (Classe Clássica)");
  });

  it("mantém a classe racial clássica persistida ao reabrir a ficha", () => {
    openClassStep(classicCharacter({ classId: "anao_bx", raceId: "anao", name: "Anão da Forja" }));
    const body = bodyText();

    expect(body).toContain("Anão (Classe Clássica)");
    expect(body).toMatch(/An[ãa]o/);
    expect(OSE_CLASSES.anao_bx.isRaceClass).toBe(true);
  });

  it("exibe os modificadores derivados de requisito principal e Carisma", () => {
    openClassStep(classicCharacter({ abilities: { str: 16, int: 10, wis: 15, dex: 11, con: 13, cha: 16 } }));
    const body = bodyText();
    expect(body).toContain("XP: +5%");
    expect(body).toContain("Reações: +1");
    expect(body).toContain("Lacaios: 6");
    expect(body).toContain("Lealdade 9");
  });

  it("não cria uma etapa vazia de magia antes do nível inicial de conjuração", () => {
    openClassStep(classicCharacter({ ruleset: "advanced", classId: "bardo", raceId: "humano" }));
    expect(bodyText()).not.toContain("Grimório Inicial de Magias");
  });

  it("a matriz de disponibilidade e a contagem do catálogo concordam", () => {
    const classicIds = Object.values(OSE_CLASSES)
      .filter((entry) => isOseClassAvailableForMode(entry, "classic"))
      .map((entry) => entry.id);
    const advancedIds = Object.values(OSE_CLASSES)
      .filter((entry) => isOseClassAvailableForMode(entry, "advanced"))
      .map((entry) => entry.id);

    expect(classicIds).toHaveLength(7);
    // As quatro classes humanas pertencem às duas apresentações; as demais
    // são exclusivas de uma delas.
    const shared = classicIds.filter((id) => advancedIds.includes(id)).sort();
    expect(shared).toEqual(["clerigo", "guerreiro", "ladrao", "mago"]);
    expect(new Set([...classicIds, ...advancedIds]).size).toBe(Object.keys(OSE_CLASSES).length);
  });
});
