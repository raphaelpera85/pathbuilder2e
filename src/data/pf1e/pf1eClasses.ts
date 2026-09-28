// ============================================================================
// Pathfinder 1e (Legacy/RPG) - Catálogo de Classes (núcleo)
// Fonte: Pathfinder RPG - Livro Básico (pathfinder - rpg - livro - basico.pdf),
// Capítulo 3 (Classes), texto extraído via pypdf em 2026-09-27.
//
// As 11 classes abaixo são todas as descritas no Capítulo 3 do Livro Básico:
// Bárbaro, Bardo, Clérigo, Druida, Feiticeiro, Guerreiro, Ladino, Mago,
// Monge, Paladino e Patrulheiro.
// ============================================================================

export type Pf1eSaveName = "fort" | "ref" | "will";

export interface Pf1eClass {
  id: string;
  name: string;
  nameEn: string;
  sourceBook: string;
  sourcePageStart: number;
  alignment: string;
  hitDie: 6 | 8 | 10 | 12;
  /** BBA por nível: "full" = +1/nível, "medium" = 3/4 por nível, "poor" = 1/2 por nível. */
  babProgression: "full" | "medium" | "poor";
  /** Testes de resistência "bons" (progressão rápida) desta classe. */
  goodSaves: Pf1eSaveName[];
  skillPointsPerLevel: string; // ex.: "2 + modificador de Int"
  classSkills: string[];
  casterType?: "arcane_prepared" | "arcane_spontaneous" | "divine_prepared" | null;
  description: string;
}

export const PF1E_CLASSES: Record<string, Pf1eClass> = {
  barbaro: {
    id: "barbaro",
    name: "Bárbaro",
    nameEn: "Barbarian",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 30,
    alignment: "Qualquer uma não ordeira",
    hitDie: 12,
    babProgression: "full",
    goodSaves: ["fort"],
    skillPointsPerLevel: "4 + modificador de Int",
    classSkills: [
      "Acrobacia (Des)", "Adestrar Animais (Car)", "Cavalgar (Des)",
      "Conhecimento (natureza) (Int)", "Escalar (For)", "Intimidação (Car)",
      "Natação (For)", "Ofícios (Int)", "Percepção (Sab)", "Sobrevivência (Sab)",
    ],
    casterType: null,
    description: "Guerreiro selvagem movido pela fúria da batalha; combatente exímio com fortitude para enfrentar inimigos superiores.",
  },
  bardo: {
    id: "bardo",
    name: "Bardo",
    nameEn: "Bard",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 34,
    alignment: "Qualquer uma",
    hitDie: 8,
    babProgression: "medium",
    goodSaves: ["ref", "will"],
    skillPointsPerLevel: "6 + modificador de Int",
    classSkills: [
      "Acrobacia (Des)", "Apresentação (Car)", "Arte da Fuga (Des)", "Artes Mágicas (Int)",
      "Avaliação (Int)", "Blefar (Car)", "Conhecimento (todos) (Int)", "Diplomacia (Car)",
      "Disfarce (Car)", "Escalar (For)", "Furtividade (Des)", "Intimidação (Car)",
      "Linguística (Int)", "Ofícios (Int)", "Percepção (Sab)", "Prestidigitação (Des)",
      "Profissão (Sab)", "Sentir Motivação (Sab)", "Usar Instrumento Mágico (Car)",
    ],
    casterType: "arcane_spontaneous",
    description: "Aventureiro versátil que combina perícia, talento e magia arcana espontânea para confundir inimigos e inspirar aliados.",
  },
  clerigo: {
    id: "clerigo",
    name: "Clérigo",
    nameEn: "Cleric",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 37,
    alignment: "Deve estar a um passo da tendência de sua divindade",
    hitDie: 8,
    babProgression: "medium",
    goodSaves: ["fort", "will"],
    skillPointsPerLevel: "2 + modificador de Int",
    classSkills: [
      "Artes Mágicas (Int)", "Avaliação (Int)", "Conhecimento (arcano) (Int)",
      "Conhecimento (história) (Int)", "Conhecimento (nobreza) (Int)",
      "Conhecimento (planos) (Int)", "Conhecimento (religião) (Int)", "Cura (Sab)",
      "Diplomacia (Car)", "Linguística (Int)", "Ofícios (Int)", "Profissão (Sab)",
      "Sentir Motivação (Sab)",
    ],
    casterType: "divine_prepared",
    description: "Servo devoto de uma divindade que canaliza poder divino em cura, proteção e combate ao mal (ou ao bem).",
  },
  druida: {
    id: "druida",
    name: "Druida",
    nameEn: "Druid",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 49,
    alignment: "Qualquer neutra",
    hitDie: 8,
    babProgression: "medium",
    goodSaves: ["fort", "will"],
    skillPointsPerLevel: "4 + modificador de Int",
    classSkills: [
      "Adestrar Animais (Car)", "Artes Mágicas (Int)", "Cavalgar (Des)",
      "Conhecimento (geografia) (Int)", "Conhecimento (natureza) (Int)", "Cura (Sab)",
      "Escalar (For)", "Natação (For)", "Ofícios (Int)", "Percepção (Sab)",
      "Profissão (Sab)", "Sobrevivência (Sab)", "Voo (Des)",
    ],
    casterType: "divine_prepared",
    description: "Guardiã do equilíbrio natural, aliada de feras, capaz de mudar de forma e canalizar o poder bruto da natureza.",
  },
  feiticeiro: {
    id: "feiticeiro",
    name: "Feiticeiro",
    nameEn: "Sorcerer",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 57,
    alignment: "Qualquer uma",
    hitDie: 6,
    babProgression: "poor",
    goodSaves: ["will"],
    skillPointsPerLevel: "2 + modificador de Int",
    classSkills: [
      "Artes Mágicas (Int)", "Avaliação (Int)", "Blefar (Car)",
      "Conhecimento (arcano) (Int)", "Intimidação (Car)", "Ofícios (Int)",
      "Profissão (Sab)", "Usar Instrumento Mágico (Car)", "Voo (Des)",
    ],
    casterType: "arcane_spontaneous",
    description: "Conjurador que carrega magia no próprio sangue (uma linhagem), lançando magias arcanas de forma espontânea e poderosa.",
  },
  guerreiro: {
    id: "guerreiro",
    name: "Guerreiro",
    nameEn: "Fighter",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 62,
    alignment: "Qualquer uma",
    hitDie: 10,
    babProgression: "full",
    goodSaves: ["fort"],
    skillPointsPerLevel: "2 + modificador de Int",
    classSkills: [
      "Adestrar Animais (Car)", "Cavalgar (Des)", "Conhecimento (engenharia) (Int)",
      "Conhecimento (exploração) (Int)", "Escalar (For)", "Intimidação (Car)",
      "Natação (For)", "Ofícios (Int)", "Profissão (Sab)", "Sobrevivência (Sab)",
    ],
    casterType: null,
    description: "Mestre das armas e armaduras, campeão marcial sem igual em proezas de batalha e domínio tático do campo de combate.",
  },
  ladino: {
    id: "ladino",
    name: "Ladino",
    nameEn: "Rogue",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 64,
    alignment: "Qualquer uma",
    hitDie: 8,
    babProgression: "medium",
    goodSaves: ["ref"],
    skillPointsPerLevel: "8 + modificador de Int",
    classSkills: [
      "Acrobacia (Des)", "Apresentação (Car)", "Arte da Fuga (Des)", "Avaliação (Int)",
      "Blefar (Car)", "Conhecimento (exploração) (Int)", "Conhecimento (local) (Int)",
      "Diplomacia (Car)", "Disfarce (Car)", "Escalar (For)", "Furtividade (Des)",
      "Intimidação (Car)", "Linguística (Int)", "Natação (For)", "Ofícios (Int)",
      "Operar Mecanismo (Int)", "Percepção (Sab)", "Prestidigitação (Des)",
      "Profissão (Int)", "Sentir Motivação (Sab)", "Usar Instrumento Mágico (Car)",
    ],
    casterType: null,
    description: "Especialista versátil em superar obstáculos: armadilhas, fechaduras, perigos mágicos e adversários, com ataque furtivo devastador.",
  },
  mago: {
    id: "mago",
    name: "Mago",
    nameEn: "Wizard",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 70,
    alignment: "Qualquer uma",
    hitDie: 6,
    babProgression: "poor",
    goodSaves: ["will"],
    skillPointsPerLevel: "2 + modificador de Int",
    classSkills: [
      "Artes Mágicas (Int)", "Conhecimento (todos) (Int)", "Linguística (Int)",
      "Ofícios (Int)", "Profissão (Sab)", "Usar Instrumento Mágico (Int)",
    ],
    casterType: "arcane_prepared",
    description: "Estudioso da magia arcana que domina uma escola de conjuração através de anos de pesquisa em grimórios e pergaminhos.",
  },
  monge: {
    id: "monge",
    name: "Monge",
    nameEn: "Monk",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 73,
    alignment: "Qualquer ordeira",
    hitDie: 8,
    babProgression: "medium",
    goodSaves: ["fort", "ref", "will"],
    skillPointsPerLevel: "4 + modificador de Int",
    classSkills: [
      "Acrobacia (Des)", "Apresentação (Car)", "Arte da Fuga (Des)", "Cavalgar (Des)",
      "Conhecimento (história) (Int)", "Conhecimento (religião) (Int)", "Escalar (For)",
      "Furtividade (Des)", "Intimidação (Car)", "Natação (For)", "Ofícios (Int)",
      "Percepção (Sab)", "Profissão (Sab)", "Sentir Motivação (Sab)",
    ],
    casterType: null,
    description: "Guerreiro-asceta que treina corpo e mente até tornar o próprio corpo uma arma, combinando disciplina marcial e espiritual.",
  },
  paladino: {
    id: "paladino",
    name: "Paladino",
    nameEn: "Paladin",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 76,
    alignment: "Bondoso e Ordeiro (obrigatório)",
    hitDie: 10,
    babProgression: "full",
    goodSaves: ["fort", "will"],
    skillPointsPerLevel: "2 + modificador de Int",
    classSkills: [
      "Adestrar Animais (Car)", "Artes Mágicas (Int)", "Cavalgar (Des)",
      "Conhecimento (nobreza) (Int)", "Conhecimento (religião) (Int)", "Cura (Sab)",
      "Diplomacia (Car)", "Ofícios (Int)", "Profissão (Sab)", "Sentir Motivação (Sab)",
    ],
    casterType: "divine_prepared",
    description: "Campeão sagrado dedicado à batalha contra o mal, com bênçãos divinas de cura, proteção e punição.",
  },
  patrulheiro: {
    id: "patrulheiro",
    name: "Patrulheiro",
    nameEn: "Ranger",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePageStart: 79,
    alignment: "Qualquer uma",
    hitDie: 10,
    babProgression: "full",
    goodSaves: ["fort", "ref"],
    skillPointsPerLevel: "6 + modificador de Int",
    classSkills: [
      "Adestrar Animais (Car)", "Artes Mágicas (Int)", "Cavalgar (Des)",
      "Conhecimento (geografia) (Int)", "Conhecimento (natureza) (Int)", "Escalar (For)",
      "Furtividade (Des)", "Natação (For)", "Ofícios (Int)", "Percepção (Sab)",
      "Profissão (Sab)", "Sobrevivência (Sab)",
    ],
    casterType: "divine_prepared",
    description: "Caçador e batedor especializado contra inimigos e terrenos específicos, combinando combate marcial com magia divina limitada.",
  },
};

export const PF1E_CLASS_IDS = Object.keys(PF1E_CLASSES);
