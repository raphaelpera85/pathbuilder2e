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
  filename?: string;
  downloadUrl?: string;
  viewUrl?: string;
}

export const GITHUB_REPO_URL = "https://github.com/raphaelpera85/pathbuilder2e";
export const GITHUB_LIVROS_FOLDER_URL = "https://github.com/raphaelpera85/pathbuilder2e/tree/main/livros";
export const GITHUB_RAW_BASE_URL = "https://raw.githubusercontent.com/raphaelpera85/pathbuilder2e/main/livros";
export const GITHUB_BLOB_BASE_URL = "https://github.com/raphaelpera85/pathbuilder2e/blob/main/livros";

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
  {
    id: "player-core-pt",
    title: "Livro do Jogador (Player Core)",
    titles: { "pt-BR": "Livro do Jogador", en: "Player Core", es: "Núcleo del jugador" },
    language: "pt-BR",
    pages: 470,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 972,
    verifiedAt: "2026-08-31",
    filename: "Player Core - Livro do Jogador.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Player%20Core%20-%20Livro%20do%20Jogador.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Player%20Core%20-%20Livro%20do%20Jogador.pdf`
  },
  {
    id: "player-core-2-pt",
    title: "Livro do Jogador 2 (Player Core 2)",
    titles: { "pt-BR": "Livro do Jogador 2", en: "Player Core 2", es: "Núcleo del jogador 2" },
    language: "pt-BR",
    pages: 324,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 1126,
    verifiedAt: "2026-08-31",
    filename: "Player Core 2 - Livro do Jogador 2.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Player%20Core%202%20-%20Livro%20do%20Jogador%202.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Player%20Core%202%20-%20Livro%20do%20Jogador%202.pdf`
  },
  {
    id: "secrets-of-magic-pt",
    title: "Segredos da Magia",
    titles: { "pt-BR": "Segredos da Magia", en: "Secrets of Magic", es: "Secretos de la magia" },
    language: "pt-BR",
    pages: 258,
    ruleset: "legacy",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 168,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Segredos da Magia.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Segredos%20da%20Magia.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Segredos%20da%20Magia.pdf`
  },
  {
    id: "guns-gears-pt",
    title: "Pólvora e Engrenagens",
    titles: { "pt-BR": "Pólvora e Engrenagens", en: "Guns & Gears", es: "Pólvora y engranajes" },
    language: "pt-BR",
    pages: 239,
    ruleset: "legacy",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 195,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Pólvora e Engrenagens.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20P%C3%B3lvora%20e%20Engrenagens.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20P%C3%B3lvora%20e%20Engrenagens.pdf`
  },
  {
    id: "book-dead-pt",
    title: "Livro dos Mortos",
    titles: { "pt-BR": "Livro dos Mortos", en: "Book of the Dead", es: "Libro de los muertos" },
    language: "pt-BR",
    pages: 224,
    ruleset: "legacy",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 44,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Livro dos Mortos.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Livro%20dos%20Mortos.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Livro%20dos%20Mortos.pdf`
  },
  {
    id: "dark-archive",
    title: "Dark Archive",
    titles: { "pt-BR": "Arquivo Sombrio", en: "Dark Archive", es: "Archivo oscuro" },
    language: "en",
    pages: 226,
    ruleset: "legacy",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 209,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Dark Archive.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Dark%20Archive.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Dark%20Archive.pdf`
  },
  {
    id: "rage-elements",
    title: "Rage of Elements",
    titles: { "pt-BR": "Fúria dos Elementos", en: "Rage of Elements", es: "Furia de los elementos" },
    language: "en",
    pages: 242,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 299,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Rage of Elements.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Rage%20of%20Elements.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Rage%20of%20Elements.pdf`
  },
  {
    id: "war-immortals",
    title: "Guerra dos Imortais (War of Immortals)",
    titles: { "pt-BR": "Guerra dos Imortais", en: "War of Immortals", es: "Guerra de los inmortais" },
    language: "pt-BR",
    pages: 226,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 181,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - War of Immortals.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20War%20of%20Immortals.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20War%20of%20Immortals.pdf`
  },
  {
    id: "howl-wild",
    title: "Howl of the Wild (errata update)",
    titles: { "pt-BR": "Uivo da Natureza (atualização de errata)", en: "Howl of the Wild (errata update)", es: "Aullido de lo salvaje (actualización de erratas)" },
    language: "en",
    pages: 227,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 122,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Howl of the Wild.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Howl%20of%20the%20Wild.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Howl%20of%20the%20Wild.pdf`
  },
  {
    id: "battlecry",
    title: "Battlecry!",
    titles: { "pt-BR": "Grito de Batalha!", en: "Battlecry!", es: "¡Grito de batalla!" },
    language: "en",
    pages: 226,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 289,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Battlecry!.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Battlecry!.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Battlecry!.pdf`
  },
  {
    id: "core-legacy-pt",
    title: "Pathfinder RPG Livro Básico (edição legada)",
    titles: { "pt-BR": "Livro Básico (edição legada)", en: "Core Rulebook (legacy edition)", es: "Reglamento básico (edición legada)" },
    language: "pt-BR",
    pages: 577,
    ruleset: "legacy",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "pending",
    linkedRecords: 1,
    verifiedAt: "2026-08-31",
    filename: "Pathfinder 2e - Livro Básico.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Pathfinder%202e%20-%20Livro%20B%C3%A1sico.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Pathfinder%202e%20-%20Livro%20B%C3%A1sico.pdf`
  },
  {
    id: "manual-jogador-compilacao-pt",
    title: "Manual do Jogador PF2e (compilação local)",
    titles: { "pt-BR": "Manual do Jogador PF2e (compilação local)", en: "PF2e Player Guide compilation (local)", es: "Compilación de guía del jugador PF2e (local)" },
    language: "pt-BR",
    pages: 58,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "pending",
    linkedRecords: 0,
    verifiedAt: "2026-08-31",
    filename: "Manual do Jogador PF2e.pdf",
    downloadUrl: `${GITHUB_RAW_BASE_URL}/Manual%20do%20Jogador%20PF2e.pdf`,
    viewUrl: `${GITHUB_BLOB_BASE_URL}/Manual%20do%20Jogador%20PF2e.pdf`
  },
];
