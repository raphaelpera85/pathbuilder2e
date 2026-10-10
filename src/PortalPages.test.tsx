import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { I18nProvider } from "./i18n";
import { formatCatalogValue, PortalPages } from "./PortalPages";
import { pathfinderSources } from "./data/sources";
import { googleDrivePdfs } from "./data/googleDrivePdfs";
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
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    expect(screen.getAllByText("Fonte verificada").length).toBeGreaterThan(0);
  }, 40_000);

  it("restaura o título do construtor ao voltar do portal", async () => {
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    window.location.hash = "#/compendium";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    await waitFor(() => expect(document.title).toBe("Compêndio | Pathbuilder 2e Local"));
    window.location.hash = "#/builder";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    await waitFor(() => expect(document.title).toBe("Pathbuilder 2e Local — Construtor de Personagens PF2e"));
  });

  it("localiza chaves de pré-requisitos estruturados no pt-BR", () => {
    expect(formatCatalogValue({ type: "ability", minimum: 2, skill: "Acrobatics" }, "pt-BR"))
      .toBe("Tipo: atributo, Mínimo: 2, Perícia: Acrobacia");
  });

  it("busca pelos nomes localizados do catálogo", async () => {
    localStorage.setItem("pathbuilder.locale", "en");
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Dwarf" } });
    const systemFilter = document.querySelector<HTMLSelectElement>(".catalog-filters-collapsible select");
    expect(systemFilter).not.toBeNull();
    fireEvent.change(systemFilter!, { target: { value: "pf2e" } });
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument(), { timeout: 20_000 });
    await waitFor(() => expect(screen.getAllByRole("heading", { name: "Dwarf" })).toHaveLength(1), { timeout: 10_000 });
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "no-such-catalog-entry" } });
    await waitFor(() => expect(screen.getByText("No records match the filters.")).toBeInTheDocument());
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Reflection" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Reflection" })).toBeInTheDocument(), { timeout: 10_000 });
    expect(screen.getByText("Pre-Remaster source")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Commander Multiclass" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Commander Multiclass" })).toBeInTheDocument(), { timeout: 10_000 });
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "archetype" } });
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument(), { timeout: 10_000 });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Commander Multiclass" })).toBeInTheDocument(), { timeout: 10_000 });
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Fireball" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "spell" } });
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument(), { timeout: 10_000 });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Fireball" })).toBeInTheDocument(), { timeout: 10_000 });
    expect(screen.getByText("Rank 3")).toBeInTheDocument();
    expect(screen.getByText("Player Core · p. 319")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Search the compendium" }), { target: { value: "Animate Object" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Filter category" }), { target: { value: "ritual" } });
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument(), { timeout: 10_000 });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Animate Object" })).toBeInTheDocument(), { timeout: 10_000 });
    expect(screen.getByText("Rank 2")).toBeInTheDocument();
    expect(screen.getByText("Player Core · p. 390")).toBeInTheDocument();
  }, 90_000);

  it("sinaliza quando o Compêndio exibe fallback PT-BR em inglês", async () => {
    localStorage.setItem("pathbuilder.locale", "en");
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });

    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "dnd35" } });
    fireEvent.change(filters[1], { target: { value: "weapon" } });
    await waitFor(() => expect(screen.getAllByText("Translation pending").length).toBeGreaterThan(0), { timeout: 20_000 });
    expect(screen.getAllByRole("heading", { name: "Adaga" }).length).toBeGreaterThan(0);
  }, 45_000);

  it("mostra no Compêndio as classes de magias D&D 5e registradas por ID no snapshot", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "dnd5e" } });
    fireEvent.change(filters[1], { target: { value: "spell" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Ataque Certeiro" } });

    const card = await screen.findByRole("button", { name: /Ataque Certeiro, Classe: Bardo/ }, { timeout: 20_000 });
    expect(card).toHaveTextContent("Livro do Jogador · p. 221");
    fireEvent.click(card);
    expect(await screen.findByRole("dialog")).toHaveTextContent("Bardo");
  }, 45_000);

  it("exibe listas transcritas de magia D&D 3.5 com classe, nível, fonte e ruleset corretos", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "dnd35" } });
    fireEvent.change(filters[1], { target: { value: "spell" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Augúrio" } });

    const card = await screen.findByRole("button", { name: /^Augúrio, Classe: Clérigo, Nível 2, Modos: D&D 3\.5$/ }, { timeout: 20_000 });
    expect(card).toHaveTextContent("Classe: Clérigo");
    expect(card).toHaveTextContent("Nível 2");
    fireEvent.click(card);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Edição 3.5");
    expect(dialog).toHaveTextContent("Clérigo");
    expect(dialog).toHaveTextContent("Material, Foco");
    expect(dialog).toHaveTextContent("Livro do Jogador · p. 184");
  }, 45_000);

  it("exibe dados estruturados da origem T20 no detalhe do catálogo", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });

    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "t20" } });
    fireEvent.change(filters[1], { target: { value: "background" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Acólito" } });

    const originCard = await screen.findByRole("button", { name: /^Acólito, Modos: Tormenta20 padrão$/ }, { timeout: 20_000 });
    fireEvent.click(originCard);
    const dialog = await screen.findByRole("dialog");

    expect(dialog).toHaveTextContent("Perícias treinadas");
    expect(dialog).toHaveTextContent("Cura, Religião, Vontade");
    expect(dialog).toHaveTextContent("Benefícios");
    expect(dialog).toHaveTextContent("Medicina, Membro da Igreja, Vontade de Ferro");
    expect(dialog).toHaveTextContent("Itens iniciais (PT-BR)");
    expect(dialog).toHaveTextContent("símbolo sagrado, traje de sacerdote");
    expect(dialog).not.toHaveTextContent("Especificações & Efeitos");
  }, 45_000);

  it("exibe resumos mecânicos e a tabela de familiares PF1e no detalhe do catálogo", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "pf1e" } });
    fireEvent.change(filters[1], { target: { value: "feat" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Familiar Aprimorado" } });

    const card = await screen.findByRole("button", { name: /^Familiar Aprimorado, Modos:/ }, { timeout: 20_000 });
    fireEvent.click(card);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("As dez opções, tendências e níveis mínimos de conjurador arcano estão na tabela abaixo.");
    const table = within(dialog).getByRole("table", { name: "Opções de Familiar Aprimorado" });
    expect(within(table).getAllByRole("row")).toHaveLength(11);
    expect(table).toHaveTextContent("Falcão Celestial");
    expect(table).toHaveTextContent("Homúnculo");
    expect(table).toHaveTextContent("O mestre deve criar o homúnculo primeiro.");
    expect(table).toHaveTextContent("Quasit");
  }, 45_000);

  it("retorna o foco ao card que abriu o detalhe do compêndio", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 15_000 });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Anão" } });
    const systemFilter = document.querySelector<HTMLSelectElement>(".catalog-filters-collapsible select");
    expect(systemFilter).not.toBeNull();
    fireEvent.change(systemFilter!, { target: { value: "pf2e" } });
    await waitFor(() => expect(screen.getAllByRole("button", { name: /^Anão, Modos:/ })).toHaveLength(1));
    const card = screen.getByRole("button", { name: /^Anão, Modos:/ });
    card.focus();
    fireEvent.keyDown(card, { key: "Enter" });
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Fechar" }));
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(card);
  }, 40_000);

  it("exibe classes PF1e no Compêndio mesmo sem construtor ativo", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");

    expect(Array.from(filters[0].options).some((option) => option.value === "pf1e")).toBe(true);
    fireEvent.change(filters[0], { target: { value: "pf1e" } });
    fireEvent.change(filters[1], { target: { value: "class" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Bárbaro" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Bárbaro" })).toBeInTheDocument(), { timeout: 15_000 });
    expect(document.querySelector('[data-catalog-entry="pf1e.class.barbaro"]')).toHaveTextContent("Livro Básico · p. 30");
  }, 40_000);

  it("identifica a fonte PF1e como verificada, sem classificá-la como Remaster", async () => {
    window.location.hash = "#/compendium";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    await waitFor(() => expect(document.querySelector(".catalog-card")).not.toBeNull(), { timeout: 20_000 });
    const filters = document.querySelectorAll<HTMLSelectElement>(".catalog-filters-collapsible select");
    fireEvent.change(filters[0], { target: { value: "pf1e" } });
    fireEvent.change(filters[1], { target: { value: "feat" } });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar no compêndio" }), { target: { value: "Corrida" } });
    const card = await screen.findByRole("button", { name: /^Corrida, Modos:/ }, { timeout: 15_000 });
    expect(within(card).getByText("Fonte verificada")).toBeInTheDocument();
    expect(within(card).queryByText(/Remaster/)).not.toBeInTheDocument();
  }, 40_000);

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
    expect(pathfinderSources).toHaveLength(13);
    expect(pathfinderSources.every((source) => source.pageCountStatus === "verified_with_pdfinfo")).toBe(true);
    expect(pathfinderSources.every((source) => source.languageEvidence === "inferred_from_filename")).toBe(true);
    expect(pathfinderSources.find((source) => source.id === "player-core-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 972 });
    expect(pathfinderSources.find((source) => source.id === "player-core-2-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 1126 });
    expect(pathfinderSources.find((source) => source.id === "secrets-of-magic-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 168, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "guns-gears-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 195, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "dark-archive")).toMatchObject({ catalogStatus: "partial", linkedRecords: 209, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "rage-elements")).toMatchObject({ catalogStatus: "partial", linkedRecords: 299, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "book-dead-pt")).toMatchObject({ catalogStatus: "partial", linkedRecords: 44, ruleset: "legacy" });
    expect(pathfinderSources.find((source) => source.id === "war-immortals")).toMatchObject({ catalogStatus: "partial", linkedRecords: 181, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "howl-wild")).toMatchObject({ catalogStatus: "partial", linkedRecords: 122, ruleset: "remaster" });
    expect(pathfinderSources.find((source) => source.id === "battlecry")).toMatchObject({ catalogStatus: "partial", linkedRecords: 289, ruleset: "remaster" });
    expect(pathfinderSources.filter((source) => source.catalogStatus === "partial").every((source) => source.linkedRecords > 0)).toBe(true);
    expect(pathfinderSources.filter((source) => source.catalogStatus === "pending")).toHaveLength(3);
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

  it("renderiza a seção de download dos livros com links diretos do google drive", async () => {
    window.location.hash = "#/downloads";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });
    expect(screen.getByRole("heading", { level: 1, name: "Download dos Livros e Suplementos" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Repositório GitHub/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Pasta \/livros/i })).not.toBeInTheDocument();

    const blankSheetDownload = screen.getByRole("link", { name: /Baixar PDF direto: Ficha Oficial de Personagem/i });
    expect(blankSheetDownload).toHaveAttribute("href", "https://drive.google.com/file/d/1dasE2CoEyoUVKNytJ0WNXdnlonZUNLGh/view?usp=drive_link");

    const mapFolioDownload = screen.getByRole("link", { name: /Baixar PDF direto: Mapa-Múndi/i });
    expect(mapFolioDownload).toHaveAttribute("href", "https://drive.google.com/file/d/1pnfMKbEWKl3BfE9XwFmN-aRH6mNBpRmT/view?usp=drive_link");

    const playerCoreDownload = screen.getByRole("link", { name: "Baixar PDF direto: Livro do Jogador" });
    expect(playerCoreDownload).toHaveAttribute("href", "https://drive.google.com/file/d/16JYQNFQt96ikLtY5A0jaNN5SOIgCF4mM/view?usp=drive_link");

    const battlecryDownload = screen.getByRole("link", { name: /Baixar PDF direto: Grito de Batalha!/i });
    expect(battlecryDownload).toHaveAttribute("href", "https://drive.google.com/file/d/1Xh9-Jikg0_Vt4Lmf0aLOXRPy7hOeFvy3/view?usp=drive_link");

    // Confirms "Ver no GitHub" button is not rendered on cards
    expect(screen.queryByRole("link", { name: /Ver no GitHub/i })).not.toBeInTheDocument();

    // Test search filter
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar livro por título ou idioma..." }), { target: { value: "Battlecry" } });
    expect(screen.getByRole("heading", { level: 3, name: "Grito de Batalha!" })).toBeInTheDocument();

    // Confirms blank sheet featured card and print link are rendered
    const printLinks = screen.getAllByRole("link", { name: /Imprimir/i });
    expect(printLinks.some((link) => link.getAttribute("href") === "./ficha.pdf")).toBe(true);
  }, 15_000);

  it("inclui os livros T20, D&D 5e e OSE na página de downloads com selo de sistema", async () => {
    window.location.hash = "#/downloads";
    render(<I18nProvider><PortalPages /></I18nProvider>, { container: document.getElementById("test-root")! });

    // O acervo multi-sistema deixou de existir apenas nos dados.
    expect(screen.getByRole("heading", { level: 3, name: "Tormenta 20 (Livro Básico)" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "D&D 5e - Curse of Strahd" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "OSE Advanced Fantasy - Tomo do Jogador" })).toBeInTheDocument();

    // Selos de sistema convivem com o selo de ruleset sem repetir "PF2e" nos outros sistemas.
    expect(screen.getAllByText("Tormenta20").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Old-School Essentials").length).toBeGreaterThan(0);
    // O ruleset exibido é o do próprio sistema, não "Remaster".
    expect(screen.getAllByText("Padrão (2014)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Padrão").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Avançado").length).toBeGreaterThan(0);

    // O filtro por sistema restringe a grade ao sistema escolhido.
    fireEvent.change(screen.getByLabelText("Sistema"), { target: { value: "t20" } });
    expect(screen.getByRole("heading", { level: 3, name: "Tormenta 20 (Livro Básico)" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "D&D 5e - Curse of Strahd" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3, name: "Livro do Jogador" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Sistema"), { target: { value: "pf2e" } });
    expect(screen.queryByRole("heading", { level: 3, name: "Tormenta 20 (Livro Básico)" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Baixar PDF direto: Livro do Jogador" })).toBeInTheDocument();
  }, 15_000);

  it("não repete nomes no índice de PDFs do Google Drive", () => {
    const names = googleDrivePdfs.map((pdf) => pdf.name.trim().toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("não troca uma sessão persistida pelo evento inicial nulo do Supabase", () => {
    const source = readFileSync(resolve(process.cwd(), "src/PortalPages.tsx"), "utf8");
    expect(source).toContain("let initialSessionResolved = false;");
    expect(source).toContain("if (!initialSessionResolved && !next) {");
    expect(source).toContain("A null event can arrive while Supabase is still hydrating");
  });
});
