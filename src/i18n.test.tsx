import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { I18nProvider, LocaleSwitcher, translate } from "./i18n";

describe("i18n", () => {
  beforeEach(() => localStorage.clear());

  it("traduz as chaves essenciais nos três idiomas", () => {
    expect(translate("pt-BR", "newCharacter")).toBe("Novo personagem");
    expect(translate("en", "newCharacter")).toBe("New character");
    expect(translate("es", "newCharacter")).toBe("Nuevo personaje");
  });

  it("persiste o idioma e atualiza o atributo lang", () => {
    render(<I18nProvider><LocaleSwitcher /></I18nProvider>);
    fireEvent.change(screen.getByLabelText("Idioma"), { target: { value: "en" } });
    expect(localStorage.getItem("pathbuilder.locale")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByLabelText("Language")).toHaveValue("en");
  });
});
