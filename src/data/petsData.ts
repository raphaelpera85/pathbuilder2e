export interface PetCompanionDefinition {
  id: string;
  name: string;
  type: "animal_companion" | "familiar" | "mount" | "eidolon";
  names?: { "pt-BR": string; en: string; es: string };
  size: string;
  speed: string;
  hp: number;
  ac: number;
  perception: number;
  senses: string;
  attacks: Array<{ name: string; bonus: number; damage: string; traits: string[] }>;
  supportBenefit: string;
  specialAbility?: string;
  description: string;
  source?: { book: string; page?: number };
}

export const PF2E_PETS_CATALOG: PetCompanionDefinition[] = [
  {
    id: "pet.animal.wolf",
    name: "Lobo (Wolf)",
    type: "animal_companion",
    names: { "pt-BR": "Lobo", en: "Wolf", es: "Lobo" },
    size: "Pequeno (Médio em Maduro)",
    speed: "40 pés",
    hp: 18,
    ac: 16,
    perception: 6,
    senses: "Faro (Impreciso) 30 pés, Visão na Penumbra",
    attacks: [
      { name: "Mandíbulas (Jaws)", bonus: 6, damage: "1d8+2 perfuração", traits: ["Finesse", "Derrubar"] }
    ],
    supportBenefit: "Seu lobo rasga os tendões do inimigo. Inimigos atingidos por você ficam Desprevenidos (-2 CA) até o início do seu próximo turno.",
    specialAbility: "Derrubar (Trip): Se o ataque de mandíbulas acertar, pode tentar Derrubar como ação livre.",
    description: "Um predador leal e veloz especializado em flanquear e derrubar presas.",
    source: { book: "Livro do Jogador (Player Core)", page: 212 }
  },
  {
    id: "pet.animal.bear",
    name: "Urso (Bear)",
    type: "animal_companion",
    names: { "pt-BR": "Urso", en: "Bear", es: "Oso" },
    size: "Pequeno (Médio em Maduro)",
    speed: "35 pés",
    hp: 20,
    ac: 15,
    perception: 5,
    senses: "Faro (Impreciso) 30 pés, Visão na Penumbra",
    attacks: [
      { name: "Mandíbulas (Jaws)", bonus: 6, damage: "1d8+3 perfuração", traits: [] },
      { name: "Garras (Claws)", bonus: 6, damage: "1d6+3 corte", traits: ["Ágil"] }
    ],
    supportBenefit: "Seu urso despedaça o oponente. Seus ataques bem-sucedidos causam 1d8 de dano de corte adicional ao alvo adjacente ao urso.",
    specialAbility: "Abraço de Urso: Ao acertar com as duas garras, agarra automaticamente a vítima.",
    description: "Uma fera imponente de força bruta com mordidas e patadas devastadoras.",
    source: { book: "Livro do Jogador (Player Core)", page: 212 }
  },
  {
    id: "pet.animal.horse",
    name: "Cavalo de Guerra (Horse)",
    type: "animal_companion",
    names: { "pt-BR": "Cavalo de Guerra", en: "Warhorse", es: "Caballo de guerra" },
    size: "Grande",
    speed: "40 pés",
    hp: 20,
    ac: 15,
    perception: 5,
    senses: "Visão na Penumbra, Faro 30 pés",
    attacks: [
      { name: "Cascos (Hooves)", bonus: 6, damage: "1d6+3 impacto", traits: [] }
    ],
    supportBenefit: "Seu cavalo adiciona impulso ao seu ataque. Se você se mover pelo menos 10 pés montado antes do Golpe, adiciona +2 de dano de circunstância.",
    specialAbility: "Montaria Confiável: Pode ser montado sem impor penalidades de controle de animal.",
    description: "Uma montaria nobre treinada para investidas em batalha e cargas com lança.",
    source: { book: "Livro do Jogador (Player Core)", page: 213 }
  },
  {
    id: "pet.animal.bird",
    name: "Ave de Rapina (Bird of Prey)",
    type: "animal_companion",
    names: { "pt-BR": "Ave de Rapina / Falcão", en: "Bird of Prey", es: "Ave rapaz" },
    size: "Pequeno",
    speed: "10 pés, Voo 60 pés",
    hp: 14,
    ac: 17,
    perception: 7,
    senses: "Visão na Penumbra",
    attacks: [
      { name: "Garras / Bico (Talons)", bonus: 7, damage: "1d6+1 cortante", traits: ["Ágil", "Finesse"] }
    ],
    supportBenefit: "Sua ave mergulha nos olhos do inimigo. O alvo sofre a condição Deslumbrado (Dazzled) ou Cego temporariamente.",
    specialAbility: "Ataque Aéreo em Voo Rasante: Mergulha em velocidade e sobe sem provocar reações.",
    description: "Um falcão ou coruja ágil com voo rápido e ataques precisos nos pontos vitais.",
    source: { book: "Livro do Jogador (Player Core)", page: 213 }
  },
  {
    id: "pet.animal.boreas",
    name: "Bóreas — O Bode Negro das Montanhas",
    type: "animal_companion",
    names: { "pt-BR": "Bóreas (Bode Negro)", en: "Boreas (Mountain Ram)", es: "Bóreas (Carnero negro)" },
    size: "Médio",
    speed: "35 pés",
    hp: 18,
    ac: 16,
    perception: 6,
    senses: "Visão na Penumbra, Faro 30 pés",
    attacks: [
      { name: "Chifrada de Guerra (Horns)", bonus: 6, damage: "1d6+3 impacto", traits: ["Empurrão"] }
    ],
    supportBenefit: "Seu bode investe violentamente, deixando o oponente Desprevenido (-2 CA) contra seus ataques à distância.",
    specialAbility: "Cabeçada Rompe-Ossos: Se mover 10 pés em linha reta, o dano da chifrada causa 1d8+3 e empurra o alvo por 10 pés.",
    description: "O lendário bode de guerra montês, guardião robusto e montaria de choque.",
    source: { book: "Livro do Jogador (Player Core)", page: 213 }
  },
  {
    id: "pet.familiar.mystic",
    name: "Familiar Místico / Patrono (Familiar)",
    type: "familiar",
    names: { "pt-BR": "Familiar Místico", en: "Mystic Familiar", es: "Familiar místico" },
    size: "Minúsculo",
    speed: "25 pés (ou Voo/Natação 25 pés)",
    hp: 10,
    ac: 15,
    perception: 5,
    senses: "Visão na Penumbra, Elo Empático",
    attacks: [],
    supportBenefit: "Concede 2 habilidades de familiar e 2 habilidades de mestre (como Espaço Extra de Magia, Toque de Magia, Fala e Voo).",
    description: "Um espírito animal ligado à sua essência mágica que entrega magias de toque e vigia os arredores.",
    source: { book: "Livro do Jogador (Player Core)", page: 214 }
  }
];
