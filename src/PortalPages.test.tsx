import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { I18nProvider } from "./i18n";
import { formatCatalogValue, PortalPages } from "./PortalPages";
import { pathfinderSources } from "./data/sources";
import type { PickerController, PickerType } from "./types";
import { updateAccountViewState } from "./accountState";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const verifiedAncestry = {
  name: "Anão",
  type: "Ancestralidade",
  data: {
    names: { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    summaries: { "pt-BR": "Resumo", en: "Summary", es: "Resumen" },
    source: { book: "Livro do Jogador", page: 42 },
    ruleset: "remaster" as const,
  },
};

const verifiedHeritage = {
  name: "Reflexo (Reflection)", type: "Herança Versátil",
  data: { names: { "pt-BR": "Reflexo", en: "Reflection", es: "Reflejo" }, summaries: { "pt-BR": "Resumo", en: "Summary", es: "Resumen" }, source: { book: "Dark Archive", page: 119 }, ruleset: "legacy" as const, needs_review: false },
};

const verifiedArchetype = {
  name: "Comandante Multiclasse (Commander Multiclass)", type: "Arquétipo",
  data: { names: { "pt-BR": "Comandante Multiclasse", en: "Commander Multiclass", es: "Comandante multiclase" }, summaries: { "pt-BR": "Resumo", en: "Summary", es: "Resumen" }, source: { book: "Battlecry!", page: 52 }, ruleset: "remaster" as const, needs_review: false },
};

const verifiedSpell = {
  name: "Bola de Fogo (Fireball)", type: "Magia",
  data: { names: { "pt-BR": "Bola de Fogo", en: "Fireball", es: "Bola de fuego" }, summaries: { "pt-BR": "Resumo", en: "Summary", es: "Resumen" }, rank: 3, castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" }, traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] }, source: { book: "Livro do Jogador", page: 319 }, ruleset: "remaster" as const, needs_review: false },
};

const verifiedRitual = {
  name: "Animar Objeto (Animate Object)", type: "Ritual",
  data: { names: { "pt-BR": "Animar Objeto", en: "Animate Object", es: "Animar objeto" }, summaries: { "pt-BR": "Resumo", en: "Summary", es: "Resumen" }, rank: 2, castingTimes: { "pt-BR": "1 dia", en: "1 day", es: "1 día" }, primaryChecks: { "pt-BR": "Arcanismo", en: "Arcana", es: "Arcanos" }, source: { book: "Livro do Jogador", page: 390 }, ruleset: "remaster" as const, needs_review: false },
};

function controller(): PickerController {
  return {
    getPickerItems: (type: PickerType) => type === "ancestry" ? [verifiedAncestry] : type === "heritage" ? [verifiedHeritage] : type === "archetype" ? [verifiedArchetype] : type === "spell" ? [verifiedSpell] : type === "ritual" ? [verifiedRitual] : [],
    applyPickerSelection: vi.fn(), getCurrentCharacter: () => ({ id: "test", name: "Teste", level: 1 }),
    loadCharacter: vi.fn(), createNewCharacter: vi.fn(),
  };
}

describe("PortalPages", () => {
  beforeEach(() => {
    window.location.hash = "#/builder";
    window.app = controller();
    document.body.innerHTML = '<div id="legacy-builder-root"></div><div id="topCharTab"></div><div id="test-root"></div>';
    localStorage.clear();
    updateAccountViewState({ configured: false, authenticated: false, isAdmin: false, username: null });
  });

  it("navega por hash sem desmontar o construtor legado", async () => {
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    window.location.hash = "#/compendium";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Compêndio de criação" })).toBeInTheDocument());
    expect(document.getElementById("legacy-builder-root")).toHaveAttribute("hidden");
    expect(screen.getAllByText("Fonte Remaster").length).toBeGreaterThan(0);
  });

  it("localiza chaves de pré-requisitos estruturados no pt-BR", () => {
    expect(formatCatalogValue({ type: "ability", minimum: 2, skill: "Acrobatics" }, "pt-BR"))
      .toBe("Tipo: atributo, Mínimo: 2, Perícia: Acrobacia");
  });

  it("busca pelos nomes localizados do catálogo", () => {
    localStorage.setItem("pathbuilder.locale", "en");
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Dwarf" } });
    expect(screen.getByRole("heading", { name: "Dwarf" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Wizard" } });
    expect(screen.getByText("No records match the filters.")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Reflection" } });
    expect(screen.getByRole("heading", { name: "Reflection" })).toBeInTheDocument();
    expect(screen.getByText("Pre-Remaster source")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Commander Multiclass" } });
    expect(screen.getByRole("heading", { name: "Commander Multiclass" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "archetype" } });
    expect(screen.getByRole("heading", { name: "Commander Multiclass" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Fireball" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "spell" } });
    expect(screen.getByRole("heading", { name: "Fireball" })).toBeInTheDocument();
    expect(screen.getByText("Rank 3")).toBeInTheDocument();
    expect(screen.getByText("Traditions: Arcane, Primal")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Animate Object" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "ritual" } });
    expect(screen.getByRole("heading", { name: "Animate Object" })).toBeInTheDocument();
    expect(screen.getByText("Primary check: Arcana")).toBeInTheDocument();
  });

  it.each([
    ["pt-BR", "BASE DE CONHECIMENTO PATHBUILDER"],
    ["en", "PATHBUILDER KNOWLEDGE BASE"],
    ["es", "BASE DE CONOCIMIENTO PATHBUILDER"],
  ])("localiza o subtítulo do compêndio em %s", (locale, kicker) => {
    localStorage.setItem("pathbuilder.locale", locale);
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    expect(screen.getByText(kicker)).toBeInTheDocument();
  });

  it("mantém evidências de metadados separadas da catalogação", () => {
    expect(pathfinderSources).toHaveLength(12);
    expect(pathfinderSources.every((source) => source.pageCountStatus === "verified_with_pdfinfo")).toBe(true);
    expect(pathfinderSources.every((source) => source.languageEvidence === "inferred_from_filename")).toBe(true);
    expect(pathfinderSources.find((source) => source.id === "player-core-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 972 });
    expect(pathfinderSources.find((source) => source.id === "player-core-2-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 1126 });
    expect(pathfinderSources.find((source) => source.id === "secrets-of-magic-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 173, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "guns-gears-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 192, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "dark-archive")).toMatchObject({ catalogStatus: "partial", linkedRecords: 219, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "rage-elements")).toMatchObject({ catalogStatus: "partial", linkedRecords: 306, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "book-dead-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 44, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "war-immortals")).toMatchObject({ catalogStatus: "partial", linkedRecords: 189, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "howl-wild")).toMatchObject({ catalogStatus: "partial", linkedRecords: 120, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "battlecry")).toMatchObject({ catalogStatus: "partial", linkedRecords: 289, ruleset: "remaster" });
    expect(pathfinderSources.filter((source) => source.catalogStatus === "partial").every((source) => source.linkedRecords > 0)).toBe(true);
    expect(pathfinderSources.filter((source) => source.catalogStatus === "pending")).toHaveLength(2);
    expect(pathfinderSources.find((source) => source.id === "manual-jogador-compilacao-pt")).toMatchObject({ ruleset: "remaster", catalogStatus: "pending" });
    expect(pathfinderSources.every((source) => source.titles?.["pt-BR"] && source.titles?.en && source.titles?.es)).toBe(true);
  });

  it("oferece privacidade pública e protege a curadoria por papel", async () => {
    window.location.hash = "#/privacy";
    const view = render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    expect(screen.getByRole("heading", { name: "Privacidade e dados" })).toBeInTheDocument();
    window.location.hash = "#/admin";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Acesso administrativo necessário" })).toBeInTheDocument());
    updateAccountViewState({ configured: true, authenticated: true, isAdmin: true, username: "raphaelpera" });
    view.rerender(<I18nProvider><PortalPages /></I18nProvider>);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Curadoria do compêndio" })).toBeInTheDocument());
    expect(screen.getByRole("link", { name: /Curadoria/ })).toBeInTheDocument();
  });

  it("não troca uma sessão persistida pelo evento inicial nulo do Supabase", () => {
    const source = readFileSync(resolve(process.cwd(), "src/PortalPages.tsx"), "utf8");
    expect(source).toContain("let initialSessionResolved = false;");
    expect(source).toContain("if (!initialSessionResolved && !next) {");
    expect(source).toContain("A null event can arrive while Supabase is still hydrating");
  });
});
