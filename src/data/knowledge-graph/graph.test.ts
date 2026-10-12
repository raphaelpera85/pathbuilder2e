import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type GraphNode = {
  id: string;
  type: string;
  key?: string;
  systemId?: string;
  ruleset?: string;
  category?: string;
  listId?: string;
  domainId?: string;
  classIds?: string[];
  spellLevel?: number;
  sourcePage?: number[];
  descriptionPage?: number;
  bookId?: string;
  page?: number;
  reviewStatus?: string;
  sourcePath?: string;
  pageCount?: number;
  curationStatus?: string;
  contentIndexStatus?: string;
  rulesetEvidence?: string | null;
  systemCandidates?: string[];
};

const graph = JSON.parse(await readFile(join(process.cwd(), "src", "data", "knowledge-graph", "graph.json"), "utf8")) as {
  nodes: GraphNode[];
  edges: Array<{ from: string; to: string; type: string }>;
  coverage: {
    records: number; runtimeRecords: number; summaryOnlyRecords: number; recordsWithoutDescriptionPage: number;
    sourceBooks: number; sourceBooksWithVerifiedPages: number; sourceBooksContentPending: number;
  };
};
const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
const edges = new Set(graph.edges.map((edge) => `${edge.from}|${edge.type}|${edge.to}`));

describe("grafo de conhecimento versionado", () => {
  it("não contém arestas órfãs", () => {
    expect(graph.edges.filter((edge) => !nodes.has(edge.from) || !nodes.has(edge.to))).toEqual([]);
  });

  it("inclui as magias tipadas de classe e domínio D&D 3.5 sem fundi-las", () => {
    const classEntry = graph.nodes.find((node) => node.type === "entry" && node.systemId === "dnd35"
      && node.category === "spell" && node.listId === "bardo" && node.spellLevel === 4 && node.key === "Lendas e Histórias");
    const domainEntry = graph.nodes.find((node) => node.type === "entry" && node.systemId === "dnd35"
      && node.category === "domain_spell" && node.domainId === "conhecimento" && node.spellLevel === 7 && node.key === "Lendas e Histórias");

    expect(classEntry).toMatchObject({ ruleset: "v35", descriptionPage: 252, reviewStatus: "details_verified" });
    expect(domainEntry).toMatchObject({ ruleset: "v35", descriptionPage: 252, reviewStatus: "details_verified" });
    expect(classEntry?.id).not.toBe(domainEntry?.id);
    expect(edges.has(`${domainEntry?.id}|in_domain|domain:dnd35:v35:conhecimento`)).toBe(true);
  });

  it("conecta cinco registros de lista (oito projeções de classe) da p. 252", () => {
    const page = graph.nodes.find((node) => node.type === "page" && node.page === 252 && node.bookId?.includes("dnd35"));
    const p252Entries = graph.nodes.filter((node) => node.type === "entry" && node.systemId === "dnd35"
      && node.category === "spell" && node.descriptionPage === 252);
    expect(p252Entries).toHaveLength(5);
    expect(p252Entries.reduce((total, entry) => total + (entry.classIds?.length ?? 0), 0)).toBe(8);
    expect(page).toBeDefined();
    for (const entry of p252Entries) {
      expect(edges.has(`${entry.id}|described_on|${page?.id}`)).toBe(true);
    }
  });

  it("expõe lacunas restantes em vez de declarar cobertura total", () => {
    expect(graph.coverage).toMatchObject({ records: 8139, runtimeRecords: 1217 });
    expect(graph.coverage.summaryOnlyRecords).toBeGreaterThan(469);
    expect(graph.coverage.recordsWithoutDescriptionPage).toBeGreaterThan(0);
    expect(graph.nodes.find((node) => node.systemId === "dnd35" && node.category === "spell"
      && node.listId === "bardo" && node.key === "Abrir/Fechar"))
      .toMatchObject({ reviewStatus: "summary_only" });
  });

  it("indexa as fontes PDF de livros sem alegar curadoria do conteúdo ainda pendente", () => {
    const books = graph.nodes.filter((node) => node.type === "source_book");
    expect(graph.coverage).toMatchObject({ sourceBooks: 98, sourceBooksWithVerifiedPages: 98, sourceBooksContentPending: 98 });
    expect(books).toHaveLength(98);
    expect(books.every((book) => book.pageCount && book.pageCount > 0 && book.sourcePath)).toBe(true);
    expect(books.every((book) => book.curationStatus === "inventory_only" && book.contentIndexStatus === "pending_manual_review")).toBe(true);
    expect(books.every((book) => !/\/Mapas\//i.test(book.sourcePath ?? ""))).toBe(true);
    expect(books.every((book) => book.systemId)).toBe(true);
    expect(books.filter((book) => book.systemId === "dnd35").every((book) => book.ruleset === "v35")).toBe(true);
    expect(books.every((book) => book.systemId || book.systemCandidates?.length)).toBe(true);
    for (const book of books) {
      const bookEdges = graph.edges.filter((edge) => edge.from === book.id);
      expect(bookEdges.some((edge) => edge.type === "book_of_system" || edge.type === "candidate_system"), book.sourcePath).toBe(true);
    }
    const ancestryGuide = books.find((book) => book.sourcePath === "Pathfinder/Livros/LIVRO - Pathfinder - Guia de Ancestralidades - Vários autores.pdf");
    expect(ancestryGuide).toMatchObject({ systemId: "pf2e", ruleset: "legacy", rulesetEvidence: "cover_page" });
    expect(edges.has(`${ancestryGuide?.id}|book_in_ruleset|ruleset:pf2e:legacy`)).toBe(true);
  });
});
