import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ItemPickerModal, formatItemPrice } from "./ItemPickerModal";
import { I18nProvider } from "./i18n";

describe("ItemPickerModal", () => {
  it("formata preços nos três idiomas sem alterar o valor estruturado", () => {
    const price = { pp: 1, gp: 2, sp: 3, cp: 4 };
    expect(formatItemPrice(price, "pt-BR")).toBe("1 PL 2 PO 3 PP 4 PC");
    expect(formatItemPrice(price, "en")).toBe("1 PP 2 GP 3 SP 4 CP");
    expect(formatItemPrice(price, "es")).toBe("1 PP 2 PO 3 PA 4 PC");
    expect(price).toEqual({ pp: 1, gp: 2, sp: 3, cp: 4 });
  });

  beforeEach(() => {
    delete (window as any).PF2E_ENGINE;
    (window as any).app = {
      character: {
        inventory: [],
      coins: { gp: 20, sp: 10, cp: 50, pp: 0 }
      },
      renderAll: vi.fn(),
      saveCharacterLocal: vi.fn()
    };
    (window as any).PF2E_DATA = {
      itemCompendium: [{
        id: "item.test.dynamic_compendium",
        name: "Equipamento Dinâmico (Dynamic Gear)",
        names: { "pt-BR": "Equipamento Dinâmico", en: "Dynamic Gear", es: "Equipo dinámico" },
        mainCategory: "gear",
        subCategory: "test",
        level: 1,
        price: { gp: 1 },
        bulk: "L",
        traits: [],
        description: "Item carregado do compêndio legado.",
        summaries: { "pt-BR": "Item carregado do compêndio legado.", en: "Item loaded from the legacy compendium.", es: "Objeto cargado del compendio legado." },
      }],
    };
  });

  afterEach(() => {
    cleanup();
    localStorage.removeItem("pathbuilder.locale");
    delete (window as any).PF2E_DATA;
    delete (window as any).PF2E_ENGINE;
  });

  it("exibe itens do compêndio legado junto ao catálogo TypeScript", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => {
      bridge.open();
    });

    expect(screen.getAllByText(/Equipamento Dinâmico/i).length).toBeGreaterThan(0);
  });

  it("não exibe item incompatível com a ficha atual", () => {
    (window as any).PF2E_ENGINE = {
      getPrerequisiteCompatibility: (_character: unknown, record: { id?: string }) =>
        record?.id === "item.test.dynamic_compendium"
          ? { state: "incompatible", reason: "level", requiredLevel: 2 }
          : { state: "available", reason: "available" },
    };
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    expect(screen.queryByText(/Equipamento Dinâmico/i)).toBeNull();
  });

  it("localiza os placeholders do formulário personalizado", () => {
    localStorage.setItem("pathbuilder.locale", "en");
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    fireEvent.click(screen.getByRole("button", { name: /Custom/i }));
    expect(screen.getByPlaceholderText("E.g. Ancestral Amulet")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Notes about magical properties, history, or bonuses...")).toBeInTheDocument();
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

  it("localiza a carteira e o botão de compra em inglês", () => {
    localStorage.setItem("pathbuilder.locale", "en");
    let bridge: any;
    const view = render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    expect(view.container.querySelector(".coin-tag.gp")?.textContent).toContain("20 GP");
    expect(view.container.querySelector(".coin-tag.sp")?.textContent).toContain("10 SP");
    expect(view.container.querySelector(".coin-tag.gp")?.textContent).not.toContain("20 PO");
    expect(screen.getByRole("button", { name: /Buy \(Deduct Coins\)/i })).toBeInTheDocument();
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

  it("usa o bridge central quando o host o expõe", () => {
    const applyPickerSelection = vi.fn();
    (window as any).app.applyPickerSelection = applyPickerSelection;
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Equipamento Dinâmico" } });
    fireEvent.click(screen.getByRole("button", { name: "Equipamento Dinâmico" }));
    fireEvent.click(screen.getByText(/Adicionar grátis/i));
    expect(applyPickerSelection).toHaveBeenCalledWith(
      "item",
      expect.objectContaining({ name: "Equipamento Dinâmico" , data: expect.objectContaining({ qty: 1 }) }),
      undefined,
      false
    );
  });

  it("não habilita compra nem altera o inventário quando faltam moedas", () => {
    (window as any).app.character.coins = { gp: 0, sp: 0, cp: 0, pp: 0 };
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Equipamento Dinâmico" } });
    const buyButton = screen.getByRole("button", { name: /Comprar \(Deduzir Moedas\)/i });
    expect(buyButton).toBeDisabled();
    expect((window as any).app.character.inventory).toHaveLength(0);
  });

  it("preserva identidade, traduções e proveniência ao adicionar item do compêndio", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );
    act(() => bridge.open());
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Equipamento Dinâmico" } });
    fireEvent.click(screen.getByRole("button", { name: "Equipamento Dinâmico" }));
    fireEvent.click(screen.getByRole("button", { name: /Adicionar grátis/i }));

    expect((window as any).app.character.inventory[0]).toMatchObject({
      id: "item.test.dynamic_compendium",
      names: { "pt-BR": "Equipamento Dinâmico", en: "Dynamic Gear", es: "Equipo dinámico" },
      summaries: { en: "Item loaded from the legacy compendium." },
    });
    expect((window as any).app.saveCharacterLocal).toHaveBeenCalledWith(false);
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
    expect(app.character.inventory[0]).toMatchObject({
      id: expect.stringMatching(/^item\.custom\./),
      names: { "pt-BR": "Colar de Rubi Antigo", en: "Colar de Rubi Antigo", es: "Colar de Rubi Antigo" },
      needs_review: true,
      ruleset: "needs_review",
    });
    expect(app.saveCharacterLocal).toHaveBeenCalledWith(false);
  });

  it("expõe o diálogo e as opções do inventário com semântica acessível", () => {
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => bridge.open());

    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "item-picker-title");
    expect(screen.getAllByRole("button", { name: /Equipamento Dinâmico/i }).length).toBeGreaterThan(0);
  });

  it("fecha com Escape e devolve o foco ao elemento que abriu o picker", () => {
    const opener = document.createElement("button");
    opener.type = "button";
    document.body.appendChild(opener);
    opener.focus();
    let bridge: any;
    render(
      <I18nProvider>
        <ItemPickerModal onBridgeReady={(b) => { bridge = b; }} />
      </I18nProvider>
    );

    act(() => bridge.open());
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });
});
