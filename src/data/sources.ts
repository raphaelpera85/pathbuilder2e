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
  driveUrl?: string;
}

export const GITHUB_REPO_URL = "https://github.com/raphaelpera85/pathbuilder2e";
export const GITHUB_LIVROS_FOLDER_URL = "https://github.com/raphaelpera85/pathbuilder2e/tree/main/livros";
export const GITHUB_RAW_BASE_URL = "https://raw.githubusercontent.com/raphaelpera85/pathbuilder2e/main/livros";
export const GITHUB_BLOB_BASE_URL = "https://github.com/raphaelpera85/pathbuilder2e/blob/main/livros";
export const GOOGLE_DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1d15Y0hqio9BbEzY87omM3vQLSH0tLQxg";
export const BLANK_SHEET_DRIVE_URL = "https://drive.google.com/file/d/1dasE2CoEyoUVKNytJ0WNXdnlonZUNLGh/view?usp=drive_link";
export const POSTER_MAP_FOLIO_DRIVE_URL = "https://drive.google.com/file/d/1pnfMKbEWKl3BfE9XwFmN-aRH6mNBpRmT/view?usp=drive_link";

export function localizeSourceBookName(book: string, locale: "pt-BR" | "en" | "es"): string {
  const normalized = String(book || "").trim().toLocaleLowerCase("pt-BR");
  const labels: Record<string, { "pt-BR": string; en: string; es: string }> = {
    "livro do jogador": { "pt-BR": "Livro do Jogador", en: "Player Core", es: "Núcleo del jugador" },
    "livro do jogador 2": { "pt-BR": "Livro do Jogador 2", en: "Player Core 2", es: "Núcleo del jogador 2" },
    "segredos da magia": { "pt-BR": "Segredos da Magia", en: "Secrets of Magic", es: "Secretos de la magia" },
    "pólvora e engrenagens": { "pt-BR": "Pólvora e Engrenagens", en: "Guns & Gears", es: "Pólvora y engranajes" },
    "livro dos mortos": { "pt-BR": "Livro dos Mortos", en: "Book of the Dead", es: "Libro de los muertos" },
    "dark archive": { "pt-BR": "Arquivo Sombrio", en: "Dark Archive", es: "Archivo oscuro" },
    "rage of elements": { "pt-BR": "Fúria dos Elementos", en: "Rage of Elements", es: "Furia de los elementos" },
    "guerra dos imortais": { "pt-BR": "Guerra dos Imortais", en: "War of Immortals", es: "Guerra de los inmortais" },
    "howl of the wild": { "pt-BR": "Uivo da Natureza", en: "Howl of the Wild", es: "Aullido de lo salvaje" },
    "battlecry!": { "pt-BR": "Grito de Batalha!", en: "Battlecry!", es: "¡Grito de batalla!" },
    "pathfinder rpg livro básico": { "pt-BR": "Livro Básico (edição legada)", en: "Core Rulebook (legacy edition)", es: "Reglamento básico (edición legada)" },
    "manual do jogador pf2e": { "pt-BR": "Manual do Jogador PF2e (compilação local)", en: "PF2e Player Guide compilation (local)", es: "Compilación de guía del jogador PF2e (local)" },
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
    filename: "[ REMASTER ] (2023-12) PF2e – Livro do Jogador.pdf",
    downloadUrl: "https://drive.google.com/file/d/16JYQNFQt96ikLtY5A0jaNN5SOIgCF4mM/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/16JYQNFQt96ikLtY5A0jaNN5SOIgCF4mM/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/16JYQNFQt96ikLtY5A0jaNN5SOIgCF4mM/view?usp=drive_link"
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
    filename: "[ REMASTER ] (2024-07) PF2e – Livro do Jogador 2.pdf",
    downloadUrl: "https://drive.google.com/file/d/1gqarSAhXDVfVFuIp6e6XJYT_9m6Ik6Rs/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1gqarSAhXDVfVFuIp6e6XJYT_9m6Ik6Rs/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1gqarSAhXDVfVFuIp6e6XJYT_9m6Ik6Rs/view?usp=drive_link"
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
    filename: "(2021-09) Pathfinder 2e - Segredos da Magia.pdf",
    downloadUrl: "https://drive.google.com/file/d/1HbxDYyIHRAr0_pCVXVPhcYFLeWIBD-ns/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1HbxDYyIHRAr0_pCVXVPhcYFLeWIBD-ns/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1HbxDYyIHRAr0_pCVXVPhcYFLeWIBD-ns/view?usp=drive_link"
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
    filename: "(2021-10) Pathfinder 2e - Pólvora e Engrenagens.pdf",
    downloadUrl: "https://drive.google.com/file/d/1Xtg4QhG2G_0kZZpMP9mZL7CID3O2BI0Y/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1Xtg4QhG2G_0kZZpMP9mZL7CID3O2BI0Y/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1Xtg4QhG2G_0kZZpMP9mZL7CID3O2BI0Y/view?usp=drive_link"
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
    filename: "(2022-04) Pathfinder 2e - Livro dos Mortos.pdf",
    downloadUrl: "https://drive.google.com/file/d/167jp5RamEDp7VWnvwtlULHRqSQoTBSFq/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/167jp5RamEDp7VWnvwtlULHRqSQoTBSFq/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/167jp5RamEDp7VWnvwtlULHRqSQoTBSFq/view?usp=drive_link"
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
    filename: "(2022-07) Pathfinder 2e - Dark Archive.pdf",
    downloadUrl: "https://drive.google.com/file/d/1KAuLmotqtV61BFqEioC7eJk9WlNtaegt/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1KAuLmotqtV61BFqEioC7eJk9WlNtaegt/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1KAuLmotqtV61BFqEioC7eJk9WlNtaegt/view?usp=drive_link"
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
    filename: "(2023-08) Pathfinder 2e - Rage of Elements.pdf",
    downloadUrl: "https://drive.google.com/file/d/1V-wLY_wSDpEEG7Hk1TTzDspXjueiXxbk/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1V-wLY_wSDpEEG7Hk1TTzDspXjueiXxbk/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1V-wLY_wSDpEEG7Hk1TTzDspXjueiXxbk/view?usp=drive_link"
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
    downloadUrl: GOOGLE_DRIVE_FOLDER_URL,
    viewUrl: GOOGLE_DRIVE_FOLDER_URL,
    driveUrl: GOOGLE_DRIVE_FOLDER_URL
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
    filename: "PF2 - Howl of the Wild (updated with errata).pdf",
    downloadUrl: "https://drive.google.com/file/d/1D2J2lFQcYczithH91yJJnPhsYHP31HQv/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1D2J2lFQcYczithH91yJJnPhsYHP31HQv/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1D2J2lFQcYczithH91yJJnPhsYHP31HQv/view?usp=drive_link"
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
    filename: "PF2e - [Paizo] - Battlecry!.pdf",
    downloadUrl: "https://drive.google.com/file/d/1Xh9-Jikg0_Vt4Lmf0aLOXRPy7hOeFvy3/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1Xh9-Jikg0_Vt4Lmf0aLOXRPy7hOeFvy3/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1Xh9-Jikg0_Vt4Lmf0aLOXRPy7hOeFvy3/view?usp=drive_link"
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
    filename: "pathfinder-rpg-livro-basico.pdf",
    downloadUrl: "https://drive.google.com/file/d/1ydoGX2IdyufEIPTxOHueAAAvdErIoJ7l/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1ydoGX2IdyufEIPTxOHueAAAvdErIoJ7l/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1ydoGX2IdyufEIPTxOHueAAAvdErIoJ7l/view?usp=drive_link"
  },
  {
    id: "manual-jogador-compilacao-pt",
    title: "Manual do Jogador PF2e (compilação local)",
    titles: { "pt-BR": "Manual do Jogador PF2e (compilação local)", en: "PF2e Player Guide compilation (local)", es: "Compilación de guía del jogador PF2e (local)" },
    language: "pt-BR",
    pages: 58,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "pending",
    linkedRecords: 0,
    verifiedAt: "2026-08-31",
    filename: "Manual_do_Jogador_PF2e.pdf",
    downloadUrl: "https://drive.google.com/file/d/1ZcGB7EZMBdq18Vuy9iZhFV4GhmKFkMHt/view?usp=drive_link",
    viewUrl: "https://drive.google.com/file/d/1ZcGB7EZMBdq18Vuy9iZhFV4GhmKFkMHt/view?usp=drive_link",
    driveUrl: "https://drive.google.com/file/d/1ZcGB7EZMBdq18Vuy9iZhFV4GhmKFkMHt/view?usp=drive_link"
  },
];

export const additionalDownloadResources: PathfinderSource[] = [
  {
    id: "official-blank-sheet",
    title: "Ficha Oficial de Personagem (em branco)",
    titles: {
      "pt-BR": "Ficha Oficial de Personagem (em branco)",
      en: "Official Blank Character Sheet",
      es: "Ficha Oficial de Personaje (en blanco)"
    },
    language: "pt-BR",
    pages: 4,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 0,
    verifiedAt: "2026-09-04",
    filename: "ficha.pdf",
    downloadUrl: BLANK_SHEET_DRIVE_URL,
    viewUrl: BLANK_SHEET_DRIVE_URL,
    driveUrl: BLANK_SHEET_DRIVE_URL
  },
  {
    id: "poster-map-folio",
    title: "Mapa-Múndi (Poster Map Folio - Inner Sea)",
    titles: {
      "pt-BR": "Mapa-Múndi (Poster Map Folio - Inner Sea)",
      en: "World Map (Poster Map Folio - Inner Sea)",
      es: "Mapa del Mundo (Poster Map Folio - Inner Sea)"
    },
    language: "en",
    pages: 1,
    ruleset: "remaster",
    pageCountStatus: "verified_with_pdfinfo",
    languageEvidence: "inferred_from_filename",
    catalogStatus: "partial",
    linkedRecords: 0,
    verifiedAt: "2026-09-04",
    filename: "pathfinder-rpg-poster-map-folio-inner-sea.pdf",
    downloadUrl: POSTER_MAP_FOLIO_DRIVE_URL,
    viewUrl: POSTER_MAP_FOLIO_DRIVE_URL,
    driveUrl: POSTER_MAP_FOLIO_DRIVE_URL
  }
];

