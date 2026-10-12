import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotsRoot = join(root, "src", "data", "catalog", "snapshots");
const outputPath = join(root, "src", "data", "knowledge-graph", "graph.json");
const manifest = JSON.parse(await readFile(join(snapshotsRoot, "manifest.json"), "utf8"));
const systems = JSON.parse(await readFile(join(snapshotsRoot, "systems.json"), "utf8"));
const bookInventory = JSON.parse(await readFile(join(root, "src", "data", "knowledge-graph", "book-inventory.json"), "utf8"));

const nodes = new Map();
const edges = new Map();
const addNode = (node) => nodes.set(node.id, node);
const addEdge = (edge) => edges.set(`${edge.from}|${edge.type}|${edge.to}`, edge);
const normalizedBook = (value) => String(value || "Fonte não identificada").trim().replace(/\s+/g, " ");
const pageValue = (value) => Number.isInteger(Number(value)) && Number(value) > 0 ? Number(value) : null;
const rulesetId = (systemId, ruleset) => `ruleset:${systemId}:${ruleset}`;
const bookId = (systemId, ruleset, title) => `book:${systemId}:${ruleset}:${encodeURIComponent(title.toLocaleLowerCase("pt-BR"))}`;
const pageId = (book, page) => `page:${book}:${page}`;
const pagesFrom = (value) => {
  const matches = String(value ?? "").match(/\d+/g)?.map(Number).filter((page) => page > 0) ?? [];
  if (matches.length === 2 && matches[1] >= matches[0] && matches[1] - matches[0] <= 100) {
    return Array.from({ length: matches[1] - matches[0] + 1 }, (_, index) => matches[0] + index);
  }
  return [...new Set(matches)];
};

for (const system of systems) {
  addNode({ id: `system:${system.id}`, type: "system", key: system.id, names: { "pt-BR": system.name_pt, en: system.name_en, es: system.name_es } });
}

for (const sourceBook of bookInventory.books) {
  const sourceBookId = `source-book:${encodeURIComponent(sourceBook.id)}`;
  addNode({
    id: sourceBookId, type: "source_book", key: sourceBook.id, title: sourceBook.title,
    sourcePath: sourceBook.sourcePath, pageCount: sourceBook.pageCount, systemId: sourceBook.systemId,
    systemCandidates: sourceBook.systemCandidates, ruleset: sourceBook.ruleset,
    rulesetEvidence: sourceBook.rulesetEvidence,
    curationStatus: sourceBook.curationStatus, contentIndexStatus: sourceBook.contentIndexStatus,
    pdfReadable: sourceBook.pdfReadable, pairedTextUsable: sourceBook.pairedTextUsable,
  });
  for (const systemId of sourceBook.systemCandidates) {
    if (!systems.some((system) => system.id === systemId)) throw new Error(`Livro aponta para sistema desconhecido: ${sourceBook.id} -> ${systemId}`);
    addEdge({ from: sourceBookId, to: `system:${systemId}`, type: sourceBook.systemId ? "book_of_system" : "candidate_system" });
  }
  if (sourceBook.systemId && sourceBook.ruleset) {
    const scopeId = rulesetId(sourceBook.systemId, sourceBook.ruleset);
    addNode({ id: scopeId, type: "ruleset", key: sourceBook.ruleset, systemId: sourceBook.systemId, names: { "pt-BR": sourceBook.ruleset } });
    addEdge({ from: scopeId, to: `system:${sourceBook.systemId}`, type: "edition_of" });
    addEdge({ from: sourceBookId, to: scopeId, type: "book_in_ruleset" });
  }
}

const stats = {
  records: 0, runtimeRecords: 0, scopedRecords: {}, recordsWithoutBook: 0, recordsWithoutSourcePage: 0,
  recordsWithDescriptionPage: 0, recordsWithoutDescriptionPage: 0, summaryOnlyRecords: 0,
  sourceBooks: bookInventory.books.length,
  sourceBooksWithVerifiedPages: bookInventory.books.filter((book) => book.pdfReadable && Number.isInteger(book.pageCount) && book.pageCount > 0).length,
  sourceBooksContentPending: bookInventory.books.filter((book) => book.contentIndexStatus !== "curated").length,
};
const entityKeys = new Set();
const catalogEntityByRef = new Map();

for (const scope of manifest) {
  const { systemId, ruleset, categories } = scope;
  const scopeId = rulesetId(systemId, ruleset);
  addNode({ id: scopeId, type: "ruleset", key: ruleset, systemId, names: { "pt-BR": ruleset } });
  addEdge({ from: scopeId, to: `system:${systemId}`, type: "edition_of" });

  for (const category of Object.keys(categories).sort()) {
    const filePath = join(snapshotsRoot, systemId, ruleset, `${category}.json`);
    const rows = JSON.parse(await readFile(filePath, "utf8"));
    stats.scopedRecords[`${systemId}/${ruleset}/${category}`] = rows.length;
    for (const row of rows) {
      stats.records += 1;
      const entityId = `entry:${systemId}:${ruleset}:${category}:${encodeURIComponent(String(row.id))}`;
      if (entityKeys.has(entityId)) throw new Error(`ID duplicado no escopo: ${entityId}`);
      entityKeys.add(entityId);
      catalogEntityByRef.set(`${systemId}/${ruleset}/${category}/${row.id}`, entityId);
      const title = normalizedBook(row.source_book);
      const book = bookId(systemId, ruleset, title);
      const sourcePage = pageValue(row.source_page ?? row.sourcePage);
      const data = row.data && typeof row.data === "object" ? row.data : {};
      const descriptionPage = pageValue(data.detailsPage ?? data.details_page ?? row.details_page ?? row.detailsPage);
      const descriptionPageEnd = pageValue(data.detailsPageEnd ?? data.details_page_end ?? row.details_page_end ?? row.detailsPageEnd);
      const names = { "pt-BR": row.name_pt ?? row.name ?? String(row.id), en: row.name_en ?? null, es: row.name_es ?? null };

      const reviewStatus = data.needs_review === true ? "needs_review" : data.summaryOnly === true ? "summary_only" : descriptionPage ? "details_verified" : "catalogued";
      addNode({ id: entityId, type: "entry", key: String(row.id), systemId, ruleset, category, names, sourcePage, descriptionPage, descriptionPageEnd, reviewStatus });
      addEdge({ from: entityId, to: scopeId, type: "available_in" });
      addNode({ id: book, type: "book", key: title, systemId, ruleset, names: { "pt-BR": title } });
      addEdge({ from: entityId, to: book, type: "sourced_from" });
      if (!row.source_book) stats.recordsWithoutBook += 1;
      if (sourcePage) {
        addNode({ id: pageId(book, sourcePage), type: "page", key: String(sourcePage), bookId: book, page: sourcePage });
        addEdge({ from: entityId, to: pageId(book, sourcePage), type: "listed_on" });
      } else stats.recordsWithoutSourcePage += 1;
      if (descriptionPage) {
        addNode({ id: pageId(book, descriptionPage), type: "page", key: String(descriptionPage), bookId: book, page: descriptionPage });
        addEdge({ from: entityId, to: pageId(book, descriptionPage), type: "described_on" });
        stats.recordsWithDescriptionPage += 1;
      } else stats.recordsWithoutDescriptionPage += 1;
      if (data.summaryOnly === true) stats.summaryOnlyRecords += 1;
      if (descriptionPageEnd && descriptionPage) {
        for (let page = descriptionPage + 1; page <= descriptionPageEnd; page += 1) {
          addNode({ id: pageId(book, page), type: "page", key: String(page), bookId: book, page });
          addEdge({ from: entityId, to: pageId(book, page), type: "description_continues_on" });
        }
      }
      const prerequisites = row.prerequisites ?? row.prerequisite ?? data.prerequisites;
      if (prerequisites) addNode({ id: `prerequisite:${entityId}`, type: "prerequisite", key: String(prerequisites), systemId, ruleset });
      if (prerequisites) addEdge({ from: entityId, to: `prerequisite:${entityId}`, type: "requires_text" });
    }
  }
}

// Fontes tipadas de runtime ainda fora dos snapshots também pertencem ao grafo.
// As listas e domínios ficam em registros próprios, sem fundir homônimos.
const [{ DND35_SPELL_LISTS }, { DND35_DOMAINS }, { DND35_CLASSES }] = await Promise.all([
  import("../src/data/dnd35/dnd35SpellLists.ts"),
  import("../src/data/dnd35/dnd35Domains.ts"),
  import("../src/data/dnd35/dnd35Classes.ts"),
]);
const dnd35BookTitle = "D&D 3.5 — Livro do Jogador";
const dnd35Book = bookId("dnd35", "v35", dnd35BookTitle);
addNode({ id: dnd35Book, type: "book", key: dnd35BookTitle, systemId: "dnd35", ruleset: "v35", names: { "pt-BR": dnd35BookTitle } });

for (const [classId, classRecord] of Object.entries(DND35_CLASSES)) {
  const classNode = catalogEntityByRef.get(`dnd35/v35/class/dnd35.class.${classId}`);
  if (!classNode) throw new Error(`Classe D&D 3.5 sem entrada de catálogo: ${classId}`);
  addNode({ id: `class-ref:dnd35:v35:${classId}`, type: "class_reference", key: classId, systemId: "dnd35", ruleset: "v35", names: { "pt-BR": classRecord.name, en: classRecord.nameEn } });
  addEdge({ from: `class-ref:dnd35:v35:${classId}`, to: classNode, type: "catalog_entry_for" });
}

const addRuntimeEntryPages = (entityId, listedPages, descriptionPage, descriptionPageEnd) => {
  const pages = pagesFrom(listedPages);
  for (const page of pages) {
    addNode({ id: pageId(dnd35Book, page), type: "page", key: String(page), bookId: dnd35Book, page });
    addEdge({ from: entityId, to: pageId(dnd35Book, page), type: "listed_on" });
  }
  if (!pages.length) stats.recordsWithoutSourcePage += 1;
  if (descriptionPage) {
    addNode({ id: pageId(dnd35Book, descriptionPage), type: "page", key: String(descriptionPage), bookId: dnd35Book, page: descriptionPage });
    addEdge({ from: entityId, to: pageId(dnd35Book, descriptionPage), type: "described_on" });
    stats.recordsWithDescriptionPage += 1;
  } else stats.recordsWithoutDescriptionPage += 1;
  if (descriptionPageEnd && descriptionPage) {
    for (let page = descriptionPage + 1; page <= descriptionPageEnd; page += 1) {
      addNode({ id: pageId(dnd35Book, page), type: "page", key: String(page), bookId: dnd35Book, page });
      addEdge({ from: entityId, to: pageId(dnd35Book, page), type: "description_continues_on" });
    }
  }
};

for (const list of DND35_SPELL_LISTS) {
  for (const spell of list.entries) {
    stats.runtimeRecords += 1;
    stats.records += 1;
    const entityId = `entry:dnd35:v35:spell-list:${encodeURIComponent(`${list.listId}:${list.spellLevel}:${spell.name}`)}`;
    if (entityKeys.has(entityId)) throw new Error(`ID duplicado em listas de magia D&D 3.5: ${entityId}`);
    entityKeys.add(entityId);
    const detailsPage = pageValue(spell.detailsPage);
    const detailsPageEnd = pageValue(spell.detailsPageEnd);
    const isSummaryOnly = spell.summaryOnly !== false;
    addNode({ id: entityId, type: "entry", key: spell.name, systemId: "dnd35", ruleset: "v35", category: "spell", listId: list.listId, spellLevel: list.spellLevel, classIds: list.classIds, names: { "pt-BR": spell.name }, sourcePage: pagesFrom(list.sourcePage), descriptionPage: detailsPage, descriptionPageEnd: detailsPageEnd, reviewStatus: isSummaryOnly ? "summary_only" : detailsPage ? "details_verified" : "catalogued" });
    addEdge({ from: entityId, to: rulesetId("dnd35", "v35"), type: "available_in" });
    addNode({ id: dnd35Book, type: "book", key: dnd35BookTitle, systemId: "dnd35", ruleset: "v35", names: { "pt-BR": dnd35BookTitle } });
    addEdge({ from: entityId, to: dnd35Book, type: "sourced_from" });
    addRuntimeEntryPages(entityId, list.sourcePage, detailsPage, detailsPageEnd);
    for (const classId of list.classIds) {
      const classRef = `class-ref:dnd35:v35:${classId}`;
      if (!nodes.has(classRef)) throw new Error(`Projeção de magia aponta para classe desconhecida: ${classId}`);
      addEdge({ from: entityId, to: classRef, type: "applies_to_class" });
    }
    if (isSummaryOnly) stats.summaryOnlyRecords += 1;
  }
}
stats.scopedRecords["dnd35/v35/runtime_spell_lists"] = DND35_SPELL_LISTS.reduce((total, list) => total + list.entries.length, 0);

for (const domain of DND35_DOMAINS) {
  const domainId = `domain:dnd35:v35:${domain.id}`;
  const domainPages = pagesFrom(domain.sourcePage);
  addNode({ id: domainId, type: "domain", key: domain.id, systemId: "dnd35", ruleset: "v35", names: { "pt-BR": domain.name }, sourcePage: domainPages });
  addEdge({ from: domainId, to: rulesetId("dnd35", "v35"), type: "available_in" });
  addEdge({ from: domainId, to: dnd35Book, type: "sourced_from" });
  for (const page of domainPages) {
    addNode({ id: pageId(dnd35Book, page), type: "page", key: String(page), bookId: dnd35Book, page });
    addEdge({ from: domainId, to: pageId(dnd35Book, page), type: "listed_on" });
  }
  for (const spell of domain.spells) {
    stats.runtimeRecords += 1;
    stats.records += 1;
    const entityId = `entry:dnd35:v35:domain-spell:${encodeURIComponent(`${domain.id}:${spell.level}:${spell.name}`)}`;
    if (entityKeys.has(entityId)) throw new Error(`ID duplicado em magias de domínio D&D 3.5: ${entityId}`);
    entityKeys.add(entityId);
    const detailsPage = pageValue(spell.detailsPage);
    const detailsPageEnd = pageValue(spell.detailsPageEnd);
    addNode({ id: entityId, type: "entry", key: spell.name, systemId: "dnd35", ruleset: "v35", category: "domain_spell", domainId: domain.id, spellLevel: spell.level, names: { "pt-BR": spell.name }, sourcePage: domainPages, descriptionPage: detailsPage, descriptionPageEnd: detailsPageEnd, reviewStatus: detailsPage ? "details_verified" : "catalogued" });
    addEdge({ from: entityId, to: rulesetId("dnd35", "v35"), type: "available_in" });
    addEdge({ from: entityId, to: dnd35Book, type: "sourced_from" });
    addEdge({ from: entityId, to: domainId, type: "in_domain" });
    addRuntimeEntryPages(entityId, domain.sourcePage, detailsPage, detailsPageEnd);
  }
}
stats.scopedRecords["dnd35/v35/runtime_domains"] = DND35_DOMAINS.length;
stats.scopedRecords["dnd35/v35/runtime_domain_spells"] = DND35_DOMAINS.reduce((total, domain) => total + domain.spells.length, 0);

const graph = {
  schemaVersion: 1,
  provenance: "Compilado dos snapshots versionados e dos registros tipados de magia/domínio D&D 3.5; não usa Graphify nem consulta banco remoto.",
  coverage: stats,
  nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id)),
  edges: [...edges.values()].sort((a, b) => `${a.from}|${a.type}|${a.to}`.localeCompare(`${b.from}|${b.type}|${b.to}`)),
};

const dangling = graph.edges.filter((edge) => !nodes.has(edge.from) || !nodes.has(edge.to));
if (dangling.length) throw new Error(`Grafo contém ${dangling.length} arestas órfãs.`);
const serializedGraph = `${JSON.stringify(graph, null, 2)}\n`;
if (process.argv.includes("--check")) {
  const currentGraph = await readFile(outputPath, "utf8").catch(() => "");
  if (currentGraph !== serializedGraph) {
    console.error("Grafo de conhecimento desatualizado; execute npm run catalog:knowledge-graph.");
    process.exitCode = 1;
  } else console.log("Grafo de conhecimento atualizado e sem referências órfãs.");
} else {
  await writeFile(outputPath, serializedGraph, "utf8");
  console.log(JSON.stringify({ output: relative(root, outputPath).split(sep).join("/"), nodes: graph.nodes.length, edges: graph.edges.length, ...stats }, null, 2));
}
