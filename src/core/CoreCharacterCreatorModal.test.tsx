import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CoreCharacterCreatorModal } from "./CoreCharacterCreatorModal";
import { DND5E_RULES_ENGINE } from "../data/systemRulesEngine";
import { DND5E_PALADIN_OATH_SPELLS } from "../data/dnd5e/dnd5eOptions";
import { getCoreCatalog, type MultiSystemCharacter } from "../data/multiSystemCharacter";

afterEach(cleanup);

describe("construtor core por sistema", () => {
  it.each([
    ["t20", "Tormenta20"],
    ["dnd5e", "D&D 5e 2014"],
  ] as const)("exibe a revisão final e cria uma ficha %s válida", (system, label) => {
    const onCharacterCreated = vi.fn();
    render(<CoreCharacterCreatorModal isOpen system={system} onClose={vi.fn()} onCharacterCreated={onCharacterCreated} />);

    expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0);
    expect(screen.getByRole("navigation", { name: "Progresso da criação" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Resumo da ficha" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeVisible();
    expect(screen.getByText("Revisão final da ficha")).not.toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /Revisão final/ }));
    expect(screen.getByText("Revisão final da ficha")).toBeVisible();
    expect(screen.getByText(/Todas as validações obrigatórias/)).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: /Criar ficha/i }));
    expect(onCharacterCreated).toHaveBeenCalledTimes(1);
    expect(onCharacterCreated.mock.calls[0][0]).toMatchObject({ system_id: system, systemId: system });
  });

  it("exibe somente a etapa ativa e usa a navegação para avançar entre etapas", () => {
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={vi.fn()} />);
    const attributesStep = screen.getByRole("button", { name: /Atributos/ });
    expect(screen.getByLabelText("Nome")).toBeVisible();
    expect(screen.queryByRole("group", { name: "Atributos" })).not.toBeInTheDocument();
    fireEvent.click(attributesStep);
    expect(attributesStep).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("group", { name: "Atributos" })).toBeVisible();
    expect(screen.getByLabelText("Nome")).not.toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Próximo →" }));
    expect(screen.getByRole("button", { name: /Perícias/ })).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("group", { name: "Perícias treinadas" })).toBeVisible();
  });

  it("reinicia o fluxo na identidade ao reabrir o construtor", () => {
    const onClose = vi.fn();
    const { rerender } = render(<CoreCharacterCreatorModal isOpen system="t20" onClose={onClose} onCharacterCreated={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Equipamento, magias e poderes/ }));
    expect(screen.getByRole("button", { name: /Equipamento, magias e poderes/ })).toHaveAttribute("aria-current", "step");

    rerender(<CoreCharacterCreatorModal isOpen={false} system="t20" onClose={onClose} onCharacterCreated={vi.fn()} />);
    rerender(<CoreCharacterCreatorModal isOpen system="t20" onClose={onClose} onCharacterCreated={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Identidade e escolhas/ })).toHaveAttribute("aria-current", "step");
    expect(screen.getByLabelText("Nome")).toBeVisible();
  });

  it("abre uma ficha T20 legada mesmo quando faltam listas adicionadas em versões recentes", () => {
    const legacy = getCoreCatalog("t20");
    const character = {
      id: "t20-legacy",
      system_id: "t20",
      systemId: "t20",
      ruleset: "padrao",
      name: "Tormenta antiga",
      level: 3,
      classId: "guerreiro",
      raceId: "humano",
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
    } as unknown as MultiSystemCharacter;
    expect(legacy.classes.some((entry) => entry.id === character.classId)).toBe(true);
    expect(() => render(<CoreCharacterCreatorModal isOpen system="t20" onClose={vi.fn()} onCharacterCreated={vi.fn()} initialCharacter={character} />)).not.toThrow();
    fireEvent.click(screen.getByRole("button", { name: /Revisão final/ }));
    expect(screen.getByText("Revisão final da ficha")).toBeVisible();
    expect(screen.getByDisplayValue("Tormenta antiga")).toBeInTheDocument();
  });

  it("mostra a quantidade progressiva de escolhas de Metamagia no construtor D&D 5e", () => {
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Classe"), { target: { value: "feiticeiro" } });
    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "3" } });
    expect(screen.getByText("Metamagia (0/2)")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "10" } });
    expect(screen.getByText("Metamagia (0/3)")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "17" } });
    expect(screen.getByText("Metamagia (0/4)")).toBeInTheDocument();
  });

  it("inclui e prepara automaticamente as magias do juramento do Paladino", () => {
    const onCharacterCreated = vi.fn();
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "paladino";
    character.level = 5;
    character.subclassId = "paladino_devocao";
    character.abilities = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
    character.classChoices = { "paladin-fighting-style": ["Defesa"] };
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={onCharacterCreated} initialCharacter={character} />);

    fireEvent.click(screen.getByRole("button", { name: /Salvar alterações/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(onCharacterCreated).toHaveBeenCalledTimes(1);
    const savedCharacter = onCharacterCreated.mock.calls[0][0];
    expect(savedCharacter.classId).toBe("paladino");
    expect(savedCharacter.level).toBe(5);
    expect(savedCharacter.abilities.cha).toBe(8);
    expect(savedCharacter.preparedSpellIds).toHaveLength(4);
    expect(DND5E_RULES_ENGINE.deriveStats(savedCharacter)).toMatchObject({ spellcastingAbility: "cha" });
    expect(DND5E_RULES_ENGINE.validateCharacter(savedCharacter).filter((message) => message.includes("preparar no máximo"))).toEqual([]);
    const catalog = getCoreCatalog("dnd5e");
    const grantedNames = [...DND5E_PALADIN_OATH_SPELLS.paladino_devocao[3], ...DND5E_PALADIN_OATH_SPELLS.paladino_devocao[5]];
    const grantedIds = catalog.spells.filter((spell) => grantedNames.includes(spell.name)).map((spell) => spell.id);
    expect(savedCharacter.spellIds).toEqual(expect.arrayContaining(grantedIds));
    expect(savedCharacter.preparedSpellIds).toEqual(expect.arrayContaining(grantedIds));
  });

  it("oferece as magias expandidas do Patrono sem concedê-las automaticamente", () => {
    const onCharacterCreated = vi.fn();
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "bruxo";
    character.level = 1;
    character.subclassId = "bruxo_infernal";
    character.abilities = { str: 8, dex: 14, con: 13, int: 12, wis: 10, cha: 15 };
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={onCharacterCreated} initialCharacter={character} />);

    fireEvent.click(screen.getByRole("button", { name: /Equipamento, magias e talentos/ }));
    const expandedSpellOption = screen.getByRole("option", { name: /Mãos Flamejantes/ });
    expect((expandedSpellOption as HTMLOptionElement).selected).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /Salvar alterações/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    expect(onCharacterCreated).toHaveBeenCalledTimes(1);
    const savedCharacter = onCharacterCreated.mock.calls[0][0];
    const expandedSpellId = getCoreCatalog("dnd5e").spells.find((spell) => spell.name === "Mãos Flamejantes")!.id;
    expect(savedCharacter.spellIds).not.toContain(expandedSpellId);
    expect(savedCharacter.preparedSpellIds).not.toContain(expandedSpellId);
  });

  it("permite editar o nível da condição Exausto", () => {
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={vi.fn()} />);

    fireEvent.click(screen.getByLabelText("Exausto"));
    const exhaustionLevel = screen.getByLabelText("Nível de Exausto");
    fireEvent.change(exhaustionLevel, { target: { value: "4" } });
    expect(exhaustionLevel).toHaveValue(4);
    const duration = screen.getByLabelText("Duração de Exausto em rodadas");
    fireEvent.change(duration, { target: { value: "3" } });
    expect(duration).toHaveValue(3);
    const source = screen.getByLabelText("Origem de Exausto");
    fireEvent.change(source, { target: { value: "Armadilha" } });
    expect(source).toHaveValue("Armadilha");
  });
});
