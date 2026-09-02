import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { ThemeProvider, ThemeSwitcher, getInitialTheme, applyThemeToDOM } from "./theme";
import { I18nProvider } from "./i18n";

describe("Theme System", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";
    if (document.body) {
      document.body.className = "";
    }
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("retorna 'dark' por padrão se não houver tema salvo no localStorage", () => {
    expect(getInitialTheme()).toBe("dark");
  });

  it("recupera 'light' do localStorage se estiver salvo", () => {
    localStorage.setItem("pathbuilder_theme", "light");
    expect(getInitialTheme()).toBe("light");
  });

  it("aplica atributos corretos no DOM com applyThemeToDOM", () => {
    applyThemeToDOM("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.classList.contains("theme-light")).toBe(true);
    expect(document.body.classList.contains("theme-light")).toBe(true);

    applyThemeToDOM("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
    expect(document.body.classList.contains("theme-dark")).toBe(true);
  });

  it("permite alternar entre tema escuro e claro com o ThemeSwitcher", () => {
    render(
      <ThemeProvider>
        <I18nProvider>
          <ThemeSwitcher />
        </I18nProvider>
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button");
    expect(toggleBtn).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    act(() => {
      fireEvent.click(toggleBtn);
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("pathbuilder_theme")).toBe("light");

    act(() => {
      fireEvent.click(toggleBtn);
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("pathbuilder_theme")).toBe("dark");
  });
});
