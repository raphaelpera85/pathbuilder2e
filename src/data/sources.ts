export interface PathfinderSource {
  id: string;
  title: string;
  language: "pt-BR" | "en";
  pages: number;
  ruleset: "remaster" | "legacy" | "needs_review";
  pageCountStatus: "verified_with_pdfinfo";
  languageEvidence: "inferred_from_filename";
  catalogStatus: "partial" | "pending";
  linkedRecords: number;
  verifiedAt: string;
}

// Metadados obtidos com pdfinfo nos arquivos locais. Não contém texto editorial.
export const pathfinderSources: PathfinderSource[] = [
  { id: "player-core-pt", title: "Livro do Jogador (Player Core)", language: "pt-BR", pages: 470, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 28, verifiedAt: "2026-08-28" },
  { id: "player-core-2-pt", title: "Livro do Jogador 2 (Player Core 2)", language: "pt-BR", pages: 324, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 19, verifiedAt: "2026-08-28" },
  { id: "secrets-of-magic-pt", title: "Segredos da Magia", language: "pt-BR", pages: 258, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 20, verifiedAt: "2026-08-28" },
  { id: "guns-gears-pt", title: "Pólvora e Engrenagens", language: "pt-BR", pages: 239, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 3, verifiedAt: "2026-08-28" },
  { id: "book-dead-pt", title: "Livro dos Mortos", language: "pt-BR", pages: 224, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 10, verifiedAt: "2026-08-28" },
  { id: "dark-archive", title: "Dark Archive", language: "en", pages: 226, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 3, verifiedAt: "2026-08-28" },
  { id: "rage-elements", title: "Rage of Elements", language: "en", pages: 242, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 13, verifiedAt: "2026-08-28" },
  { id: "war-immortals", title: "Guerra dos Imortais (War of Immortals)", language: "pt-BR", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 9, verifiedAt: "2026-08-28" },
  { id: "howl-wild", title: "Howl of the Wild (errata update)", language: "en", pages: 227, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 6, verifiedAt: "2026-08-28" },
  { id: "battlecry", title: "Battlecry!", language: "en", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 26, verifiedAt: "2026-08-28" },
];
