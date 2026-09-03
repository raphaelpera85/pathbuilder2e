import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { getTranslationCoverage, I18nProvider, LocaleSwitcher, translate } from "./i18n";

describe("i18n", () => {
  beforeEach(() => localStorage.clear());

  it("traduz as chaves essenciais nos três idiomas", () => {
    expect(translate("pt-BR", "newCharacter")).toBe("Novo personagem");
    expect(translate("en", "newCharacter")).toBe("New character");
    expect(translate("es", "newCharacter")).toBe("Nuevo personaje");
    expect(translate("pt-BR", "charactersLoadFailed")).toContain("carregar");
    expect(translate("en", "charactersLoadFailed")).toContain("load");
    expect(translate("es", "charactersLoadFailed")).toContain("cargar");
  });

  it("mantém o mesmo conjunto de chaves em pt-BR, inglês e espanhol", () => {
    const coverage = getTranslationCoverage();
    expect(coverage["pt-BR"]).toEqual({ missing: [], extra: [] });
    expect(coverage.en).toEqual({ missing: [], extra: [] });
    expect(coverage.es).toEqual({ missing: [], extra: [] });
  });

  it("não reutiliza português silenciosamente quando uma chave de locale faltar", () => {
    expect(translate("en", "__missing_translation__" as never)).toBe("__missing_translation__");
    expect(translate("es", "__missing_translation__" as never)).toBe("__missing_translation__");
  });

  it("persiste o idioma e atualiza o atributo lang", () => {
    render(<I18nProvider><LocaleSwitcher /></I18nProvider>);
    fireEvent.change(screen.getByLabelText("Idioma"), { target: { value: "en" } });
    expect(localStorage.getItem("pathbuilder.locale")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByLabelText("Language")).toHaveValue("en");
    const switcher = screen.getByTitle("Language");
    expect(within(switcher).getAllByRole("button")).toHaveLength(3);
    expect(within(switcher).getAllByRole("button").filter((button) => button.classList.contains("active"))).toHaveLength(1);

    // O botão de espanhol troca diretamente para espanhol
    fireEvent.click(within(switcher).getByRole("button", { name: "Español (España)" }));
    expect(localStorage.getItem("pathbuilder.locale")).toBe("es");
    expect(document.documentElement.lang).toBe("es");
    expect(within(screen.getByTitle("Idioma")).getAllByRole("button").filter((button) => button.classList.contains("active"))).toHaveLength(1);

    // O botão de português troca diretamente para português
    fireEvent.click(within(screen.getByTitle("Idioma")).getByRole("button", { name: "Português (Brasil)" }));
    expect(localStorage.getItem("pathbuilder.locale")).toBe("pt-BR");
    expect(document.documentElement.lang).toBe("pt-BR");
  });
});
