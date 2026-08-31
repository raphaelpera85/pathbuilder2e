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
  { id: "player-core-pt", title: "Livro do Jogador (Player Core)", language: "pt-BR", pages: 470, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 965, verifiedAt: "2026-08-31" },
  { id: "player-core-2-pt", title: "Livro do Jogador 2 (Player Core 2)", language: "pt-BR", pages: 324, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 1102, verifiedAt: "2026-08-31" },
  { id: "secrets-of-magic-pt", title: "Segredos da Magia", language: "pt-BR", pages: 258, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 173, verifiedAt: "2026-08-31" },
  { id: "guns-gears-pt", title: "Pólvora e Engrenagens", language: "pt-BR", pages: 239, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 192, verifiedAt: "2026-08-31" },
  { id: "book-dead-pt", title: "Livro dos Mortos", language: "pt-BR", pages: 224, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 44, verifiedAt: "2026-08-31" },
  { id: "dark-archive", title: "Dark Archive", language: "en", pages: 226, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 219, verifiedAt: "2026-08-31" },
  { id: "rage-elements", title: "Rage of Elements", language: "en", pages: 242, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 306, verifiedAt: "2026-08-31" },
  { id: "war-immortals", title: "Guerra dos Imortais (War of Immortals)", language: "pt-BR", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 189, verifiedAt: "2026-08-31" },
  { id: "howl-wild", title: "Howl of the Wild (errata update)", language: "en", pages: 227, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 120, verifiedAt: "2026-08-31" },
  { id: "battlecry", title: "Battlecry!", language: "en", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 289, verifiedAt: "2026-08-31" },
  { id: "core-legacy-pt", title: "Pathfinder RPG Livro Básico (edição legada)", language: "pt-BR", pages: 577, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "pending", linkedRecords: 1, verifiedAt: "2026-08-31" },
  { id: "manual-jogador-compilacao-pt", title: "Guia Completo do Jogador PF2e (compilação local)", language: "pt-BR", pages: 58, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "pending", linkedRecords: 0, verifiedAt: "2026-08-31" },
];
