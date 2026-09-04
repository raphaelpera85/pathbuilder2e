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

  it("garante regras de tema claro para o popup da conta em account.css", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const accountCss = fs.readFileSync(path.resolve(__dirname, "account.css"), "utf-8");

    expect(accountCss).toContain('[data-theme="light"] .account-panel');
    expect(accountCss).toContain('[data-theme="light"] .account-header');
    expect(accountCss).toContain('[data-theme="light"] .cloud-character');
    expect(accountCss).toContain('[data-theme="light"] .account-trigger');
  });

  it("garante contraste de cor para títulos de armas e proximidade do dano com ataques", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const styleCss = fs.readFileSync(path.resolve(__dirname, "../css/style.css"), "utf-8");
    const appJs = fs.readFileSync(path.resolve(__dirname, "../js/app.js"), "utf-8");

    // Título legível no tema claro
    expect(styleCss).toContain('[data-theme="light"] .strike-title');
    expect(styleCss).toContain('[data-theme="light"] .strike-item-name');
    expect(appJs).toContain('class="strike-title" style="font-weight:bold; font-size:14px; color:var(--pb-text);"');

    // Dano próximo aos botões de MAP em vez de isolado no canto
    expect(appJs).toContain('class="strike-actions-row" style="display:flex; justify-content:flex-start; align-items:center; flex-wrap:wrap; gap:12px;');
    expect(appJs).not.toContain('style="font-weight:bold; font-size:14px; color:#fff;"');
  });

  it("garante regras de tema claro para cards de personagens da biblioteca em portal.css", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const portalCss = fs.readFileSync(path.resolve(__dirname, "portal.css"), "utf-8");

    expect(portalCss).toContain('[data-theme="light"] .char-library-card');
    expect(portalCss).toContain('[data-theme="light"] .char-card-header h3');
    expect(portalCss).toContain('[data-theme="light"] .char-level-badge');
    expect(portalCss).toContain('[data-theme="light"] .btn-card-open');
    expect(portalCss).toContain('[data-theme="light"] .char-card-stats strong');
  });

  it("garante regras de tema claro para cards de livros, buscas, filtros e badges em portal.css", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const portalCss = fs.readFileSync(path.resolve(__dirname, "portal.css"), "utf-8");

    expect(portalCss).toContain('[data-theme="light"] .book-download-card');
    expect(portalCss).toContain('[data-theme="light"] .downloads-search-input');
    expect(portalCss).toContain('[data-theme="light"] .downloads-filter-select');
    expect(portalCss).toContain('[data-theme="light"] .book-card-title-group h3');
    expect(portalCss).toContain('[data-theme="light"] .ruleset-badge.remaster');
    expect(portalCss).toContain('[data-theme="light"] .btn-download-primary');
  });

  it("garante regras de tema claro para o hub de campanhas em campaigns.css", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const campaignsCss = fs.readFileSync(path.resolve(__dirname, "campaigns.css"), "utf-8");

    expect(campaignsCss).toContain('[data-theme="light"] .campaigns-sidebar');
    expect(campaignsCss).toContain('[data-theme="light"] .camp-nav-item');
    expect(campaignsCss).toContain('[data-theme="light"] .party-member-card');
    expect(campaignsCss).toContain('[data-theme="light"] .camp-title-row h2');
  });
});

