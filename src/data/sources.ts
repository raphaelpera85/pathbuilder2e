export interface PathfinderSource {
  id: string;
  title: string;
  titles?: { "pt-BR": string; en: string; es: string };
  language: "pt-BR" | "en";
  pages: number;
  ruleset: "remaster" | "legacy" | "needs_review";
  pageCountStatus: "verified_with_pdfinfo";
  languageEvidence: "inferred_from_filename";
  catalogStatus: "partial" | "pending";
  linkedRecords: number;
  verifiedAt: string;
}

export function localizeSourceBookName(book: string, locale: "pt-BR" | "en" | "es"): string {
  const normalized = String(book || "").trim().toLocaleLowerCase("pt-BR");
  const labels: Record<string, { "pt-BR": string; en: string; es: string }> = {
    "livro do jogador": { "pt-BR": "Livro do Jogador", en: "Player Core", es: "Núcleo del jugador" },
    "livro do jogador 2": { "pt-BR": "Livro do Jogador 2", en: "Player Core 2", es: "Núcleo del jugador 2" },
    "segredos da magia": { "pt-BR": "Segredos da Magia", en: "Secrets of Magic", es: "Secretos de la magia" },
    "pólvora e engrenagens": { "pt-BR": "Pólvora e Engrenagens", en: "Guns & Gears", es: "Pólvora y engranajes" },
    "livro dos mortos": { "pt-BR": "Livro dos Mortos", en: "Book of the Dead", es: "Libro de los muertos" },
    "dark archive": { "pt-BR": "Arquivo Sombrio", en: "Dark Archive", es: "Archivo oscuro" },
    "rage of elements": { "pt-BR": "Fúria dos Elementos", en: "Rage of Elements", es: "Furia de los elementos" },
    "guerra dos imortais": { "pt-BR": "Guerra dos Imortais", en: "War of Immortals", es: "Guerra de los inmortais" },
    "howl of the wild": { "pt-BR": "Uivo da Natureza", en: "Howl of the Wild", es: "Aullido de lo salvaje" },
    "battlecry!": { "pt-BR": "Grito de Batalha!", en: "Battlecry!", es: "¡Grito de batalla!" },
    "pathfinder rpg livro básico": { "pt-BR": "Livro Básico (edição legada)", en: "Core Rulebook (legacy edition)", es: "Reglamento básico (edición legada)" },
    "manual do jogador pf2e": { "pt-BR": "Manual do Jogador PF2e (compilação local)", en: "PF2e Player Guide compilation (local)", es: "Compilación de guía del jugador PF2e (local)" },
  };
  const match = Object.entries(labels).sort(([a], [b]) => b.length - a.length).find(([key]) => normalized.includes(key));
  return match ? match[1][locale] : book;
}

// Metadados obtidos com pdfinfo nos arquivos locais. Não contém texto editorial.
export const pathfinderSources: PathfinderSource[] = [
  { id: "player-core-pt", title: "Livro do Jogador (Player Core)", titles: { "pt-BR": "Livro do Jogador", en: "Player Core", es: "Núcleo del jugador" }, language: "pt-BR", pages: 470, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 972, verifiedAt: "2026-08-31" },
  { id: "player-core-2-pt", title: "Livro do Jogador 2 (Player Core 2)", titles: { "pt-BR": "Livro do Jogador 2", en: "Player Core 2", es: "Núcleo del jugador 2" }, language: "pt-BR", pages: 324, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 1126, verifiedAt: "2026-08-31" },
  { id: "secrets-of-magic-pt", title: "Segredos da Magia", titles: { "pt-BR": "Segredos da Magia", en: "Secrets of Magic", es: "Secretos de la magia" }, language: "pt-BR", pages: 258, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 173, verifiedAt: "2026-08-31" },
  { id: "guns-gears-pt", title: "Pólvora e Engrenagens", titles: { "pt-BR": "Pólvora e Engrenagens", en: "Guns & Gears", es: "Pólvora y engranajes" }, language: "pt-BR", pages: 239, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 192, verifiedAt: "2026-08-31" },
  { id: "book-dead-pt", title: "Livro dos Mortos", titles: { "pt-BR": "Livro dos Mortos", en: "Book of the Dead", es: "Libro de los muertos" }, language: "pt-BR", pages: 224, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 44, verifiedAt: "2026-08-31" },
  { id: "dark-archive", title: "Dark Archive", titles: { "pt-BR": "Arquivo Sombrio", en: "Dark Archive", es: "Archivo oscuro" }, language: "en", pages: 226, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 219, verifiedAt: "2026-08-31" },
  { id: "rage-elements", title: "Rage of Elements", titles: { "pt-BR": "Fúria dos Elementos", en: "Rage of Elements", es: "Furia de los elementos" }, language: "en", pages: 242, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 306, verifiedAt: "2026-08-31" },
  { id: "war-immortals", title: "Guerra dos Imortais (War of Immortals)", titles: { "pt-BR": "Guerra dos Imortais", en: "War of Immortals", es: "Guerra de los inmortais" }, language: "pt-BR", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 189, verifiedAt: "2026-08-31" },
  { id: "howl-wild", title: "Howl of the Wild (errata update)", titles: { "pt-BR": "Uivo da Natureza (atualização de errata)", en: "Howl of the Wild (errata update)", es: "Aullido de lo salvaje (actualización de erratas)" }, language: "en", pages: 227, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 120, verifiedAt: "2026-08-31" },
  { id: "battlecry", title: "Battlecry!", titles: { "pt-BR": "Grito de Batalha!", en: "Battlecry!", es: "¡Grito de batalla!" }, language: "en", pages: 226, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "partial", linkedRecords: 289, verifiedAt: "2026-08-31" },
  { id: "core-legacy-pt", title: "Pathfinder RPG Livro Básico (edição legada)", titles: { "pt-BR": "Livro Básico (edição legada)", en: "Core Rulebook (legacy edition)", es: "Reglamento básico (edición legada)" }, language: "pt-BR", pages: 577, ruleset: "legacy", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "pending", linkedRecords: 1, verifiedAt: "2026-08-31" },
  { id: "manual-jogador-compilacao-pt", title: "Manual do Jogador PF2e (compilação local)", titles: { "pt-BR": "Manual do Jogador PF2e (compilação local)", en: "PF2e Player Guide compilation (local)", es: "Compilación de guía del jugador PF2e (local)" }, language: "pt-BR", pages: 58, ruleset: "remaster", pageCountStatus: "verified_with_pdfinfo", languageEvidence: "inferred_from_filename", catalogStatus: "pending", linkedRecords: 0, verifiedAt: "2026-08-31" },
];
