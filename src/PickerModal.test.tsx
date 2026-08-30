import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PickerModal } from "./PickerModal";
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
});
