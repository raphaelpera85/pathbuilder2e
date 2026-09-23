import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OseCharacterCreatorModal, type OseCharacterCreatedData } from "./OseCharacterCreatorModal";
import { OSE_CLASSES } from "../data/ose/oseClasses";
import { OSE_SPELLS } from "../data/ose/oseSpells";
import { isOseClassAvailableForMode } from "../data/ose/oseRules";

/**
 * Fluxo Classic ponta a ponta.
 *
 * O OSE Classic Fantasy tem sete classes, sendo três conjuradoras (Clérigo,
 * Mago e Elfo) e quatro não conjuradoras. Este teste percorre o assistente real
 * até "Concluir e Criar Ficha" e confere a ficha produzida — inclusive os
 * espaços de magia do 1º círculo e a ausência do passo de magias para quem não
 * conjura.
 */
afterEach(cleanup);

function classicCharacter(overrides: Partial<OseCharacterCreatedData> = {}): OseCharacterCreatedData {
  return {
    id: "ose-classic-fluxo",
    name: "Teste Classic",
    system_id: "ose",
    ruleset: "classic",
    raceId: "humano",
    classId: "clerigo",
    level: 1,
    xp: 0,
    alignment: "ordeiro",
    abilities: { str: 12, int: 10, wis: 16, dex: 11, con: 13, cha: 12 },
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

/** Percorre o assistente até o botão de concluir e devolve a ficha criada. */
function runWizardToFinish(initialCharacter: OseCharacterCreatedData): OseCharacterCreatedData {
  const onCharacterCreated = vi.fn();
  render(
    <OseCharacterCreatorModal
      isOpen
      onClose={vi.fn()}
      onCharacterCreated={onCharacterCreated}
      initialCharacter={initialCharacter}
    />,
  );

  let reachedEnd = false;
  for (let index = 0; index < 8; index += 1) {
    const finish = screen.queryByRole("button", { name: /Concluir e Criar/i });
    if (finish) {
      fireEvent.click(finish);
      reachedEnd = true;
      break;
    }
    const advance = screen.queryByRole("button", { name: /Avançar/i });
    if (!advance) break;
    fireEvent.click(advance);
  }

  expect(reachedEnd, "o assistente deveria alcançar o passo final").toBe(true);
  expect(onCharacterCreated, "a ficha deveria ter sido concluída").toHaveBeenCalledTimes(1);
  return onCharacterCreated.mock.calls[0][0] as OseCharacterCreatedData;
}

describe("OSE Classic — fluxo completo de criação", () => {
  it("cria um Clérigo clássico com magias restritas ao 1º círculo", () => {
    const created = runWizardToFinish(classicCharacter());

    expect(created.ruleset).toBe("classic");
    expect(created.classId).toBe("clerigo");
    expect(created.raceId).toBe("humano");
    expect(created.level).toBe(1);
    expect(created.maxHp).toBeGreaterThan(0);
    expect(created.currentHp).toBeLessThanOrEqual(created.maxHp);
    expect(created.goldGp).toBeGreaterThanOrEqual(0);
    // A raça fornece os idiomas nativos; "comum" é o idioma base.
    expect(created.languages.map((language) => language.toLowerCase())).toContain("comum");

    // Um espaço de 1º círculo no nível 1: nenhuma magia de círculo superior.
    const slots = OSE_CLASSES.clerigo.progression[0].spells?.[0] ?? 0;
    expect(created.spellsKnown.length).toBeLessThanOrEqual(slots);
    for (const spellId of created.spellsKnown) {
      const spell = OSE_SPELLS.find((entry) => entry.id === spellId);
      expect(spell, spellId).toBeDefined();
      expect(spell!.circle, spellId).toBe(1);
      expect(spell!.className, spellId).toBe("clerigo");
    }
  });

  it("cria um Elfo clássico (classe racial conjuradora) com magias de Mago", () => {
    const created = runWizardToFinish(classicCharacter({ classId: "elfo_bx", raceId: "elfo", abilities: { str: 10, int: 15, wis: 10, dex: 12, con: 11, cha: 10 } }));

    expect(created.ruleset).toBe("classic");
    expect(created.classId).toBe("elfo_bx");
    // A raça é derivada da classe racial em Classic.
    expect(created.raceId).toBe("elfo");
    for (const spellId of created.spellsKnown) {
      const spell = OSE_SPELLS.find((entry) => entry.id === spellId);
      expect(spell, spellId).toBeDefined();
      expect(spell!.className, spellId).toBe("mago");
      expect(spell!.circle, spellId).toBe(1);
    }
  });

  it("não oferece o passo de magias para um Guerreiro clássico e entrega lista vazia", () => {
    const onCharacterCreated = vi.fn();
    render(
      <OseCharacterCreatorModal
        isOpen
        onClose={vi.fn()}
        onCharacterCreated={onCharacterCreated}
        initialCharacter={classicCharacter({ classId: "guerreiro", abilities: { str: 16, int: 10, wis: 10, dex: 12, con: 13, cha: 10 } })}
      />,
    );

    for (let index = 0; index < 8; index += 1) {
      const finish = screen.queryByRole("button", { name: /Concluir e Criar/i });
      if (finish) {
        fireEvent.click(finish);
        break;
      }
      fireEvent.click(screen.getByRole("button", { name: /Avançar/i }));
    }

    const created = onCharacterCreated.mock.calls[0][0] as OseCharacterCreatedData;
    expect(created.classId).toBe("guerreiro");
    expect(created.spellsKnown).toEqual([]);
    expect(created.preparedSpells).toEqual([]);
    // Não conjurador: o passo 5 não existe, então o fluxo fecha em 4 passos.
    expect(created.ruleset).toBe("classic");
  });

  it("conclui as três classes raciais clássicas", () => {
    const cases: Array<[string, string, Partial<OseCharacterCreatedData>["abilities"]]> = [
      ["anao_bx", "anao", { str: 13, int: 10, wis: 10, dex: 11, con: 14, cha: 10 }],
      ["elfo_bx", "elfo", { str: 10, int: 15, wis: 10, dex: 12, con: 11, cha: 10 }],
      ["halfling_bx", "halfling", { str: 10, int: 10, wis: 10, dex: 15, con: 13, cha: 12 }],
    ];
    for (const [classId, raceId, abilities] of cases) {
      const created = runWizardToFinish(classicCharacter({ classId, raceId, abilities }));
      expect(created.classId, classId).toBe(classId);
      expect(created.raceId, classId).toBe(raceId);
      expect(created.ruleset, classId).toBe("classic");
      cleanup();
    }
  });

  it("preserva o nível de uma ficha clássica racial acima de 1", () => {
    // A tabela raça × classe do Advanced não tem chave para `elfo_bx`; usar
    // aquele limite prendia a classe racial clássica no nível 1.
    const elfAtFive: OseCharacterCreatedData = {
      ...classicCharacter({ classId: "elfo_bx", raceId: "elfo", level: 5, xp: 20000 }),
      maxHp: 20,
      currentHp: 20,
    };
    const created = runWizardToFinish(elfAtFive);

    expect(created.classId).toBe("elfo_bx");
    expect(created.level).toBe(5);
    expect(created.xp).toBe(20000);
  });

  it("mantém a matriz completa das sete classes jogáveis do Classic", () => {
    const classicClasses = Object.values(OSE_CLASSES).filter((entry) => isOseClassAvailableForMode(entry, "classic"));
    expect(classicClasses.map((entry) => entry.id).sort()).toEqual([
      "anao_bx", "clerigo", "elfo_bx", "guerreiro", "halfling_bx", "ladrao", "mago",
    ]);
    for (const entry of classicClasses) {
      const expectedMaxLevel = entry.id === "anao_bx" ? 12 : entry.id === "elfo_bx" ? 10 : entry.id === "halfling_bx" ? 8 : 14;
      expect(entry.progression, entry.id).toHaveLength(expectedMaxLevel);
      expect(entry.progression.map((level) => level.level), entry.id).toEqual(Array.from({ length: expectedMaxLevel }, (_, index) => index + 1));
      expect(entry.features.length, entry.id).toBeGreaterThan(0);
      expect(entry.progression[0].saves, entry.id).toEqual(expect.objectContaining({ death: expect.any(Number), wands: expect.any(Number), paralysis: expect.any(Number), breath: expect.any(Number), spells: expect.any(Number) }));
      if (entry.spellCasting) expect(entry.progression.some((level) => (level.spells?.length ?? 0) > 0), entry.id).toBe(true);
    }
  });
});
