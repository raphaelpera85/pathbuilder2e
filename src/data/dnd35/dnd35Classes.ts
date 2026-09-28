// ============================================================================
// D&D 3.5 - Catálogo de Classes (núcleo)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 3 — Classes (páginas 21-59). O PDF fonte é uma
// digitalização de imagem sem camada de texto (confirmado via pypdf/pymupdf:
// 0 caracteres extraíveis em todas as páginas). Os dados abaixo foram
// transcritos por leitura visual direta das páginas renderizadas em alta
// resolução (400dpi), não por OCR nem por memória — cada classe cita a
// página do PDF de onde foi lida.
//
// As 11 classes núcleo foram lidas: Bárbaro, Bardo, Clérigo, Druida,
// Feiticeiro, Guerreiro, Ladino, Mago, Monge, Paladino, Patrulheiro
// (Ranger). Progressões nível a nível completas (Tabelas 3-1 a 3-18) não
// foram transcritas nesta rodada — apenas o cabeçalho de cada classe
// (tendência, dado de vida, perícias de classe, pontos de perícia,
// progressão de ataque base resumida como "boa"/"média"/"ruim" e
// testes de resistência bons).
// ============================================================================

export type Dnd35SaveName = "fortitude" | "reflexos" | "vontade";
export type Dnd35BabProgression = "boa" | "media" | "ruim";
export type Dnd35CasterType = "nenhum" | "arcano_preparado" | "arcano_espontaneo" | "divino_preparado";

export interface Dnd35Class {
  id: string;
  name: string;
  nameEn: string;
  sourceBook: string;
  sourcePageStart: number;
  alignment: string;
  hitDie: 4 | 6 | 8 | 10 | 12;
  babProgression: Dnd35BabProgression;
  goodSaves: Dnd35SaveName[];
  skillPointsPerLevel: number; // antes do modificador de Inteligência
  classSkills: string[];
  casterType: Dnd35CasterType;
  castingAbility?: "int" | "sab" | "car";
}

export const DND35_CLASSES: Record<string, Dnd35Class> = {
  barbaro: {
    id: "barbaro",
    name: "Bárbaro",
    nameEn: "Barbarian",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 24,
    alignment: "Qualquer uma não ordeira",
    hitDie: 12,
    babProgression: "boa",
    goodSaves: ["fortitude"],
    skillPointsPerLevel: 4,
    classSkills: [
      "Adestrar Animais", "Arte da Fuga", "Cavalgar", "Escalar", "Intimidação",
      "Natação", "Observar", "Ofícios", "Ouvir", "Saltar", "Sentir Motivação", "Sobrevivência",
    ],
    casterType: "nenhum",
  },
  bardo: {
    id: "bardo",
    name: "Bardo",
    nameEn: "Bard",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 26,
    alignment: "Qualquer uma, exceto Leal",
    hitDie: 6,
    babProgression: "media",
    goodSaves: ["reflexos", "vontade"],
    skillPointsPerLevel: 6,
    classSkills: [
      "Acrobacia", "Arte da Fuga", "Atuação", "Avaliação", "Blefar", "Concentração",
      "Conhecimento (todos, escolhidos individualmente)", "Decifrar Escrita", "Diplomacia",
      "Disfarces", "Equilíbrio", "Escalar", "Esconder-se", "Falar Idioma", "Furtividade",
      "Identificar Magia", "Natação", "Ofícios", "Ouvir", "Prestidigitação", "Profissão",
      "Saltar", "Sentir Motivação", "Usar Instrumento Mágico",
    ],
    casterType: "arcano_espontaneo",
    castingAbility: "car",
  },
  clerigo: {
    id: "clerigo",
    name: "Clérigo",
    nameEn: "Cleric",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 30,
    alignment: "A tendência deve ser idêntica ou 'um passo' afastada da tendência de sua divindade (não pode diferir no eixo Leal-Caótico e no eixo Bem-Mal ao mesmo tempo)",
    hitDie: 8,
    babProgression: "media",
    goodSaves: ["fortitude", "vontade"],
    skillPointsPerLevel: 2,
    classSkills: [
      "Concentração", "Conhecimento (arcano)", "Conhecimento (história)", "Conhecimento (planos)",
      "Conhecimento (religião)", "Cura", "Diplomacia", "Identificar Magia", "Ofícios", "Profissão",
    ],
    casterType: "divino_preparado",
    castingAbility: "sab",
  },
  druida: {
    id: "druida",
    name: "Druida",
    nameEn: "Druid",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 33,
    alignment: "Neutro (deve ter ao menos um componente Neutro: Neutro e Bom, Leal e Neutro, Neutro puro, Caótico e Neutro ou Neutro e Mau)",
    hitDie: 8,
    babProgression: "media",
    goodSaves: ["fortitude", "vontade"],
    skillPointsPerLevel: 4,
    classSkills: [
      "Adestrar Animais", "Cavalgar", "Concentração", "Conhecimento (natureza)", "Cura",
      "Diplomacia", "Identificar Magia", "Natação", "Observar", "Ofícios", "Ouvir",
      "Profissão", "Sobrevivência",
    ],
    casterType: "divino_preparado",
    castingAbility: "sab",
  },
  feiticeiro: {
    id: "feiticeiro",
    name: "Feiticeiro",
    nameEn: "Sorcerer",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 38,
    alignment: "Qualquer uma",
    hitDie: 4,
    babProgression: "ruim",
    goodSaves: ["vontade"],
    skillPointsPerLevel: 2,
    classSkills: ["Blefar", "Concentração", "Conhecimento (arcano)", "Identificar Magia", "Ofícios", "Profissão"],
    casterType: "arcano_espontaneo",
    castingAbility: "car",
  },
  guerreiro: {
    id: "guerreiro",
    name: "Guerreiro",
    nameEn: "Fighter",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 41,
    alignment: "Qualquer uma",
    hitDie: 10,
    babProgression: "boa",
    goodSaves: ["fortitude"],
    skillPointsPerLevel: 2,
    classSkills: ["Adestrar Animais", "Cavalgar", "Escalar", "Intimidação", "Natação", "Ofícios", "Saltar"],
    casterType: "nenhum",
  },
  ladino: {
    id: "ladino",
    name: "Ladino",
    nameEn: "Rogue",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 43,
    alignment: "Qualquer uma",
    hitDie: 6,
    babProgression: "media",
    goodSaves: ["reflexos"],
    skillPointsPerLevel: 8,
    classSkills: [
      "Abrir Fechaduras", "Acrobacia", "Arte da Fuga", "Atuação", "Avaliação", "Blefar",
      "Conhecimento (local)", "Decifrar Escrita", "Diplomacia", "Disfarces", "Equilíbrio",
      "Escalar", "Esconder-se", "Falsificação", "Furtividade", "Intimidação", "Natação",
      "Observar", "Obter Informação", "Ofícios", "Operar Mecanismo", "Ouvir",
      "Prestidigitação", "Procurar", "Profissão", "Saltar", "Sentir Motivação",
      "Usar Cordas", "Usar Instrumento Mágico",
    ],
    casterType: "nenhum",
  },
  mago: {
    id: "mago",
    name: "Mago",
    nameEn: "Wizard",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 46,
    alignment: "Qualquer uma",
    hitDie: 4,
    babProgression: "ruim",
    goodSaves: ["vontade"],
    skillPointsPerLevel: 2,
    classSkills: [
      "Concentração", "Conhecimento (qualquer perícia, escolhida individualmente)",
      "Decifrar Escrita", "Identificar Magia", "Ofícios", "Profissão",
    ],
    casterType: "arcano_preparado",
    castingAbility: "int",
  },
  monge: {
    id: "monge",
    name: "Monge",
    nameEn: "Monk",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 48,
    alignment: "Leal e Bom, Leal e Neutro ou Leal e Mau (sempre Leal)",
    hitDie: 8,
    babProgression: "media",
    goodSaves: ["fortitude", "reflexos", "vontade"],
    skillPointsPerLevel: 4,
    classSkills: [
      "Acrobacia", "Arte da Fuga", "Atuação", "Concentração", "Conhecimento (arcano)",
      "Conhecimento (religião)", "Diplomacia", "Equilíbrio", "Escalar", "Esconder-se",
      "Furtividade", "Natação", "Observar", "Ofícios", "Ouvir", "Profissão", "Saltar",
      "Sentir Motivação",
    ],
    casterType: "nenhum",
  },
  paladino: {
    id: "paladino",
    name: "Paladino",
    nameEn: "Paladin",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 51,
    alignment: "Leal e Bom (perde as habilidades de classe se violar o código de conduta)",
    hitDie: 10,
    babProgression: "boa",
    goodSaves: ["fortitude"],
    skillPointsPerLevel: 2,
    classSkills: [
      "Adestrar Animais", "Cavalgar", "Concentração", "Conhecimento (nobreza e realeza)",
      "Conhecimento (religião)", "Cura", "Diplomacia", "Ofícios", "Profissão", "Sentir Motivação",
    ],
    casterType: "divino_preparado",
    castingAbility: "sab",
  },
  patrulheiro: {
    id: "patrulheiro",
    name: "Patrulheiro",
    nameEn: "Ranger",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 55,
    alignment: "Qualquer uma",
    hitDie: 8,
    babProgression: "boa",
    goodSaves: ["fortitude", "reflexos"],
    skillPointsPerLevel: 6,
    classSkills: [
      "Adestrar Animais", "Cavalgar", "Concentração", "Conhecimento (geografia)",
      "Conhecimento (masmorras)", "Conhecimento (natureza)", "Cura", "Escalar",
      "Esconder-se", "Furtividade", "Natação", "Observar", "Ofícios", "Ouvir",
      "Procurar", "Profissão", "Saltar", "Sobrevivência", "Usar Cordas",
    ],
    casterType: "divino_preparado",
    castingAbility: "sab",
  },
};

export const DND35_CLASS_IDS = Object.keys(DND35_CLASSES);
