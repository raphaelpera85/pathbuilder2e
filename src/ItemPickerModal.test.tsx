import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ItemPickerModal } from "./ItemPickerModal";
import { I18nProvider } from "./i18n";

describe("ItemPickerModal", () => {
  beforeEach(() => {
    (window as any).app = {
      character: {
        inventory: [],
        coins: { gp: 20, sp: 10, cp: 50, pp: 0 }
      },
      renderAll: vi.fn()
    };
  });

  afterEach(() => {
    cleanup();
  });

  it("abre o modal quando pathbuilderItemPicker.open() é chamado e exibe as abas principais", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    // Modal começa fechado
    expect(screen.queryByRole("dialog")).toBeNull();

    // Abre o modal
    act(() => {
      bridge.open();
    });

    // Deve exibir o diálogo e abas
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText(/Equipamentos/i)).toBeTruthy();
    expect(screen.getByText(/Consumíveis/i)).toBeTruthy();
    expect(screen.getByText(/Itens Mágicos/i)).toBeTruthy();
    expect(screen.getByText(/Personalizado/i)).toBeTruthy();
  });

  it("permite alternar para a aba de consumíveis e pesquisar poções", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => {
      bridge.open();
    });

    // Clica na aba de consumíveis
    const consumablesTab = screen.getByText(/Consumíveis/i);
    fireEvent.click(consumablesTab);

    // Verifica se encontra a Poção de Cura Menor
    expect(screen.getAllByText(/Poção de Cura Menor/i).length).toBeGreaterThan(0);
  });

  it("exibe prata e platina com as abreviações corretas", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => {
      bridge.open();
    });

    expect(screen.getAllByText("15 PP").length).toBeGreaterThan(0);
    expect(screen.queryByText("15 PL")).toBeNull();
  });

  it("adiciona item ao inventário e deduz moedas ao clicar em Comprar", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => {
      bridge.open();
    });

    // Clica no botão Comprar (Deduzir Moedas)
    const buyButtons = screen.getAllByText(/Comprar \(Deduzir Moedas\)/i);
    fireEvent.click(buyButtons[0]);

    // Deve ter adicionado item ao inventário
    const app = (window as any).app;
    expect(app.character.inventory.length).toBe(1);
    expect(app.renderAll).toHaveBeenCalled();
  });

  it("permite criar e cadastrar um item personalizado", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => {
      bridge.open();
    });

    // Clica na aba Personalizado
    const customTab = screen.getByText(/Personalizado/i);
    fireEvent.click(customTab);

    // Preenche os campos do formulário
    const nameInput = screen.getByPlaceholderText(/Ex: Amuleto dos Ancestrais/i);
    fireEvent.change(nameInput, { target: { value: "Colar de Rubi Antigo" } });

    const submitBtn = screen.getByText(/➕ Adicionar ao Inventário/i);
    fireEvent.click(submitBtn);

    const app = (window as any).app;
    expect(app.character.inventory.some((i: any) => i.name === "Colar de Rubi Antigo")).toBe(true);
  });
});
