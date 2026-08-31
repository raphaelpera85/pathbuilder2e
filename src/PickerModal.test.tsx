import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getWeaponProficiencyRank, PickerModal } from "./PickerModal";
import type { PickerBridge, PickerController } from "./types";
import { I18nProvider } from "./i18n";

const renderPicker = (onBridgeReady: (value: PickerBridge) => void) =>
  render(<I18nProvider><PickerModal onBridgeReady={onBridgeReady} /></I18nProvider>);

const controllerDefaults = {
  getCurrentCharacter: () => ({ id: "test", name: "Teste", level: 1 }),
  loadCharacter: vi.fn(),
  createNewCharacter: vi.fn(),
};

describe("PickerModal", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("resolve a proficiência de arma para classe importada como objeto", () => {
    expect(getWeaponProficiencyRank({ class: { id: "class.fighter", name: "Guerreiro" } }, { data: { category: "Marcial" } })).toBe("E");
  });
  it("abre como diálogo, filtra opções e confirma a seleção", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      getPickerItems: () => [
        { name: "Humano", type: "Ancestralidade", data: { description: "Versátil" } },
        { name: "Anão", type: "Ancestralidade", data: { description: "Resiliente" } },
      ],
      applyPickerSelection,
    } satisfies PickerController;

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("ancestry"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Buscar..."), { target: { value: "anão" } });
    expect(screen.getByRole("option", { name: /Anão/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Humano/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));
    expect(applyPickerSelection).toHaveBeenCalledWith("ancestry", expect.objectContaining({ name: "Anão" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("fecha com Escape", () => {
    window.app = { ...controllerDefaults, getPickerItems: () => [], applyPickerSelection: vi.fn() };
    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("feat"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("não exibe opções incompatíveis com a ficha", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      character: { id: "test", name: "Teste", level: 1 },
      getPickerItems: () => [
        { name: "Opção válida", type: "Talento", data: { id: "feat.valid", category: "Geral" } },
        { name: "Opção incompatível", type: "Talento", data: { id: "feat.invalid", category: "Geral" } },
      ],
      applyPickerSelection,
    } satisfies PickerController;
    (window as any).PF2E_ENGINE = {
      getPrerequisiteCompatibility: (_character: unknown, record: { id?: string }) =>
        record?.id === "feat.invalid"
          ? { state: "incompatible", reason: "level", requiredLevel: 2 }
          : { state: "available", reason: "available" },
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("feat"));

    expect(screen.getByRole("option", { name: /Opção válida/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Opção incompatível/ })).not.toBeInTheDocument();
  });

  it("não exibe magia incompatível com a capacidade de conjuração", () => {
    window.app = {
      ...controllerDefaults,
      character: { id: "test", name: "Teste", level: 1 },
      getPickerItems: () => [
        { name: "Magia disponível", type: "Magia", data: { id: "spell.valid", rank: 1 } },
        { name: "Magia incompatível", type: "Magia", data: { id: "spell.invalid", rank: 1 } },
      ],
      applyPickerSelection: vi.fn(),
    } satisfies PickerController;
    (window as any).PF2E_ENGINE = {
      getSpellCompatibility: (_character: unknown, record: { id?: string }) =>
        record?.id === "spell.invalid"
          ? { state: "incompatible", reason: "no-spellcasting" }
          : { state: "available", reason: "compatible" },
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("spell"));

    expect(screen.getByRole("option", { name: /Magia disponível/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Magia incompatível/ })).not.toBeInTheDocument();
  });

  it("navega na lista com setas e confirma com Enter", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      getPickerItems: () => [
        { name: "Anão", type: "Ancestralidade", data: {} },
        { name: "Humano", type: "Ancestralidade", data: {} },
      ],
      applyPickerSelection,
    };
    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("ancestry"));

    const firstOption = screen.getByRole("option", { name: /Anão/ });
    firstOption.focus();
    fireEvent.keyDown(firstOption, { key: "ArrowDown" });
    const secondOption = screen.getByRole("option", { name: /Humano/ });
    expect(secondOption).toHaveFocus();
    fireEvent.keyDown(secondOption, { key: "Enter" });
    expect(applyPickerSelection).toHaveBeenCalledWith("ancestry", expect.objectContaining({ name: "Humano" }));
  });

  it("busca e exibe o nome localizado sem alterar a identidade canônica", () => {
    localStorage.setItem("pathbuilder.locale", "en");
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      getPickerItems: () => [{ name: "Anão", type: "Ancestralidade", data: { names: { en: "Dwarf" }, summaries: { en: "Resilient ancestry" } } }],
      applyPickerSelection,
    };
    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("ancestry"));
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "Dwarf" } });
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(applyPickerSelection).toHaveBeenCalledWith("ancestry", expect.objectContaining({ name: "Anão" }));
  });

  it("resolve tamanho e herança configuráveis antes de confirmar", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      getPickerItems: () => [{
        name: "Animal Desperto (Awakened Animal)", type: "Ancestralidade", data: {
          names: { "pt-BR": "Animal Desperto" },
          selectionGroups: [
            { id: "size", labelKey: "size", options: [
              { id: "tiny", hp: 6, size: "Miúdo", names: { "pt-BR": "Miúdo — 6 PV" } },
              { id: "large", hp: 10, size: "Grande", names: { "pt-BR": "Grande — 10 PV" } },
            ] },
            { id: "heritage", labelKey: "heritage", options: [
              { id: "running", speed: 30, names: { "pt-BR": "Animal Corredor" } },
              { id: "aquatic", speed: 0, swimSpeed: 30, names: { "pt-BR": "Animal Nadador — Aquático" } },
            ] },
          ],
        },
      }],
      applyPickerSelection,
    };
    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("ancestry"));
    fireEvent.change(screen.getByRole("combobox", { name: "Tamanho" }), { target: { value: "large" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Herança" }), { target: { value: "aquatic" } });
    fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));
    expect(applyPickerSelection).toHaveBeenCalledWith("ancestry", expect.objectContaining({
      name: "Animal Desperto (Awakened Animal)",
      selection: { size: "large", heritage: "aquatic" },
    }));
  });

  it("exibe dados de regra e preserva a identidade canônica de uma magia", () => {
    localStorage.setItem("pathbuilder.locale", "en");
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      getPickerItems: () => [{
        name: "Bola de Fogo (Fireball)", type: "Magia", data: {
          id: "spell.fireball", rank: 3,
          names: { "pt-BR": "Bola de Fogo", en: "Fireball" },
          summaries: { en: "A broad burst of flame." },
          castingTimes: { en: "2 actions" }, traditionNames: { en: ["Arcane", "Primal"] },
          source: { book: "Player Core", page: 319 }, ruleset: "remaster", needs_review: false,
        },
      }],
      applyPickerSelection,
    };
    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("spell"));
    expect(screen.getByText("Rank 3")).toBeInTheDocument();
    expect(screen.getByText("Casting: 2 actions")).toBeInTheDocument();
    expect(screen.getByText("Traditions: Arcane, Primal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(applyPickerSelection).toHaveBeenCalledWith("spell", expect.objectContaining({ name: "Bola de Fogo (Fireball)" }));
  });

  it("renderiza abas de categoria, insígnias de proficiência e botões de economia para armas", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      character: {
        id: "test",
        name: "Guerreiro",
        class: "Guerreiro (Fighter)",
        level: 1,
        coins: { gp: 10, sp: 0, cp: 0, pp: 0 },
      },
      getPickerItems: () => [
        {
          name: "Adze (1d10 S)",
          type: "Arma",
          data: { name: "Adze (1d10 S)", category: "Marcial", damage: "1d10", damageType: "Cortante", price: "2 PO", bulk: 1, traits: ["Sweep"] },
        },
        {
          name: "Air Repeater (1d4 P)",
          type: "Arma",
          data: { name: "Air Repeater (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração", price: "5 PO", bulk: "L", traits: ["Agile"] },
        },
        {
          name: "Backpack Catapult (1d12 B)",
          type: "Arma",
          data: { name: "Backpack Catapult (1d12 B)", category: "Avançada", damage: "1d12", damageType: "Impacto", price: "35 PO", bulk: 4, traits: ["Splash"] },
        },
      ],
      applyPickerSelection,
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("weapon"));

    // Verifica abas de armas
    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Simples" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Marciais" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Avançadas" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Desarmado" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Proficiente" })).toBeInTheDocument();

    // Filtra pela aba Simples
    fireEvent.click(screen.getByRole("button", { name: "Simples" }));
    expect(screen.getByRole("option", { name: /Air Repeater/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Adze/ })).not.toBeInTheDocument();

    // Volta para Todos e seleciona Backpack Catapult (preço 35 PO > 10 PO que o personagem possui)
    fireEvent.click(screen.getByRole("button", { name: "Todos" }));
    fireEvent.click(screen.getByRole("option", { name: /Backpack Catapult/ }));

    // Botão Buy deve estar desabilitado por fundos insuficientes
    const buyBtn = screen.getByRole("button", { name: /Comprar/i });
    expect(buyBtn).toBeDisabled();

    // Botão Give deve estar habilitado
    const giveBtn = screen.getByRole("button", { name: "Adicionar" });
    expect(giveBtn).not.toBeDisabled();
    fireEvent.click(giveBtn);
    expect(applyPickerSelection).toHaveBeenCalledWith("weapon", expect.objectContaining({ name: "Backpack Catapult (1d12 B)" }));
  });

  it("permite comprar arma acessível deduzindo moedas", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      character: {
        id: "test",
        name: "Guerreiro",
        class: "Guerreiro (Fighter)",
        level: 1,
        coins: { gp: 10, sp: 0, cp: 0, pp: 0 },
      },
      getPickerItems: () => [
        {
          name: "Adze (1d10 S)",
          type: "Arma",
          data: { name: "Adze (1d10 S)", category: "Marcial", damage: "1d10", damageType: "Cortante", price: "2 PO", bulk: 1, traits: ["Sweep"] },
        },
      ],
      applyPickerSelection,
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("weapon"));

    const buyBtn = screen.getByRole("button", { name: /Comprar/i });
    expect(buyBtn).not.toBeDisabled();
    fireEvent.click(buyBtn);
    expect(applyPickerSelection).toHaveBeenCalledWith(
      "weapon",
      expect.objectContaining({ name: "Adze (1d10 S)" }),
      undefined,
      true
    );
  });

  it.each([
    ["pt-BR", "Comprar", "Adicionar", "deduzir da carteira"],
    ["en", "Buy", "Give", "deduct from purse"],
    ["es", "Comprar", "Añadir", "deducir de la bolsa"],
  ] as const)("localiza as ações de compra e inclusão em %s", (locale, buyLabel, giveLabel, titleFragment) => {
    localStorage.setItem("pathbuilder.locale", locale);
    window.app = {
      ...controllerDefaults,
      character: { id: "test", name: "Guerreiro", level: 1, coins: { gp: 10, sp: 0, cp: 0, pp: 0 } },
      getPickerItems: () => [{ name: "Adze (1d10 S)", type: "Arma", data: { name: "Adze (1d10 S)", names: { "pt-BR": "Enxó", en: "Adze", es: "Azula" }, category: "Marcial", price: "2 PO" } }],
      applyPickerSelection: vi.fn(),
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("weapon"));

    const buyButton = screen.getByRole("button", { name: new RegExp(buyLabel) });
    expect(buyButton).toHaveAttribute("title", expect.stringContaining(titleFragment));
    expect(screen.getByRole("button", { name: giveLabel })).toBeInTheDocument();
  });

  it("renderiza abas de talentos e permite alternar entre Talentos Gerais, de Perícia e Todos os Talentos", () => {
    const applyPickerSelection = vi.fn();
    window.app = {
      ...controllerDefaults,
      character: {
        id: "test",
        name: "Guerreiro",
        class: "Guerreiro (Fighter)",
        level: 1,
        coins: { gp: 15, sp: 0, cp: 0, pp: 0 },
      },
      getPickerItems: () => [
        {
          name: "Robustez (Toughness)",
          type: "Talento Geral",
          data: { name: "Robustez (Toughness)", category: "Geral", level: 1, traits: ["Geral"] },
        },
        {
          name: "Medicina de Batalha (Battle Medicine)",
          type: "Talento de Perícia",
          data: { name: "Medicina de Batalha (Battle Medicine)", category: "Perícia", level: 1, traits: ["Geral", "Perícia"] },
        },
        {
          name: "Golpe Furioso (Power Attack)",
          type: "Talento de Classe",
          data: { name: "Golpe Furioso (Power Attack)", category: "Classe", level: 1, traits: ["Guerreiro"] },
        },
      ],
      applyPickerSelection,
    };

    let bridge: PickerBridge | undefined;
    renderPicker((value) => { bridge = value; });
    act(() => bridge?.open("feat", { filterType: "Geral" }));

    // Abas de talentos gerais
    expect(screen.getByRole("button", { name: "Talentos Gerais" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Talentos de Perícia" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Todos os Talentos" })).toBeInTheDocument();

    // Inicialmente na aba Geral
    expect(screen.getByRole("option", { name: /Robustez/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Golpe Furioso/ })).not.toBeInTheDocument();

    // Clica em Talentos de Perícia
    fireEvent.click(screen.getByRole("button", { name: "Talentos de Perícia" }));
    expect(screen.getByRole("option", { name: /Medicina de Batalha/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Golpe Furioso/ })).not.toBeInTheDocument();

    // Clica em Todos os Talentos
    fireEvent.click(screen.getByRole("button", { name: "Todos os Talentos" }));
    expect(screen.getByRole("option", { name: /Robustez/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Medicina de Batalha/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Golpe Furioso/ })).toBeInTheDocument();

    // Seleciona e confirma
    fireEvent.click(screen.getByRole("option", { name: /Medicina de Batalha/ }));
    fireEvent.click(screen.getByRole("button", { name: "Aceitar" }));
    expect(applyPickerSelection).toHaveBeenCalledWith("feat", expect.objectContaining({ name: "Medicina de Batalha (Battle Medicine)" }), { filterType: "Geral" });
  });
});
