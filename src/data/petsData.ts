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
  grantedAbilities?: string[];
  requiredFamiliarAbilities?: number;
  requiresSpellcasting?: boolean;
  description: string;
  summaries?: { "pt-BR": string; en: string; es: string };
  source?: { book: string; page?: number };
  sourceApproximate?: boolean;
  needs_review?: boolean;
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
    summaries: { "pt-BR": "Companheiro veloz que ajuda a flanquear e derrubar inimigos.", en: "Fast companion that helps flank and trip enemies.", es: "Compañero veloz que ayuda a flanquear y derribar enemigos." },
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
    summaries: { "pt-BR": "Companheiro resistente com mordida e garras poderosas.", en: "Durable companion with powerful jaws and claws.", es: "Compañero resistente con poderosas mordidas y garras." },
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
    summaries: { "pt-BR": "Montaria veloz para investidas e combate montado.", en: "Fast mount for charges and mounted combat.", es: "Montura veloz para cargas y combate montado." },
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
    summaries: { "pt-BR": "Companheiro voador ágil para reconhecimento e ataques precisos.", en: "Agile flying companion for scouting and precise attacks.", es: "Compañero volador ágil para explorar y atacar con precisión." },
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
    summaries: { "pt-BR": "Bode robusto que investe e empurra inimigos.", en: "Tough mountain ram that charges and shoves enemies.", es: "Carnero montés resistente que carga y empuja enemigos." },
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
    summaries: { "pt-BR": "Familiar mágico que amplia habilidades e entrega magias de toque.", en: "Magical familiar that expands abilities and delivers touch spells.", es: "Familiar mágico que amplía habilidades y entrega conjuros de toque." },
    source: { book: "Livro do Jogador (Player Core)", page: 214 }
  },
  {
    id: "pet.familiar.specific.doll",
    name: "Boneco (Doll)",
    type: "familiar",
    names: { "pt-BR": "Boneco", en: "Doll", es: "Muñeco" },
    size: "Minúsculo", speed: "25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão na Penumbra", attacks: [],
    supportBenefit: "Familiar específico constructo.",
    specialAbility: "Inflamável: adquire fraqueza a fogo igual ao seu nível; uma habilidade de familiar pode remover essa fraqueza por um dia.",
    grantedAbilities: ["constructo"], requiredFamiliarAbilities: 1,
    description: "Familiar constructo de madeira e vime.",
    summaries: { "pt-BR": "Boneco familiar constructo, simples e modificável.", en: "A simple, endlessly modifiable construct familiar.", es: "Familiar constructo sencillo y modificable." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 170 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.imp",
    name: "Diabrete (Imp)",
    type: "familiar",
    names: { "pt-BR": "Diabrete", en: "Imp", es: "Diablillo" },
    size: "Minúsculo", speed: "25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão no Escuro", attacks: [],
    supportBenefit: "Familiar específico ínfero profano.",
    specialAbility: "Invisibilidade de Diabrete (divina inata, uma vez por hora) e Tentação Infernal (uma vez por dia).",
    grantedAbilities: ["destreza manual", "fala", "resistência (veneno)", "perito (Dissimulação)", "telepatia de toque", "visão no escuro", "voador"], requiredFamiliarAbilities: 7,
    description: "Familiar ínfero que oferece barganhas e poderes de enganação.",
    summaries: { "pt-BR": "Familiar ínfero com invisibilidade e tentação sobrenatural.", en: "An infernal familiar with invisibility and supernatural temptation.", es: "Familiar infernal con invisibilidad y tentación sobrenatural." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 170 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.fey_dragonet",
    name: "Dragonete Feérico (Fey Dragonet)",
    type: "familiar",
    names: { "pt-BR": "Dragonete Feérico", en: "Fey Dragonet", es: "Dragoncito feérico" },
    size: "Minúsculo", speed: "25 pés, Voo 25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão no Escuro", attacks: [],
    supportBenefit: "Familiar específico dragão.",
    specialAbility: "Sopro Eufórico: cone de 3 metros, uma vez por hora, com salvamento de Fortitude.",
    grantedAbilities: ["destreza manual", "fala", "telepatia de toque", "visão no escuro", "voador"], requiredFamiliarAbilities: 5,
    description: "Pequeno dragão travesso aliado de personagens benevolentes ou impulsivos.",
    summaries: { "pt-BR": "Pequeno dragão feérico com sopro eufórico.", en: "A mischievous fairy dragon with an euphoric breath.", es: "Pequeño dragón feérico con aliento eufórico." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 171 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.wyrd_eon",
    name: "Eônico da Wyrd (Wyrd Eon)",
    type: "familiar",
    names: { "pt-BR": "Eônico da Wyrd", en: "Wyrd Eon", es: "Eónico de la Wyrd" },
    size: "Minúsculo", speed: "Voo 25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão na Penumbra", attacks: [],
    supportBenefit: "Familiar específico constructo.",
    specialAbility: "Reservatório de Eônico da Wyrd; Incapaz de Andar; Cristalino (fraqueza a sônico igual ao nível).",
    grantedAbilities: ["constructo", "voador"], requiredFamiliarAbilities: 3,
    description: "Enxame flutuante de pedras preciosas que concede o poder de sua pedra interna.",
    summaries: { "pt-BR": "Enxame cristalino voador que armazena uma pedra eônica.", en: "A flying crystal swarm that stores an aeonic stone.", es: "Enjambre cristalino volador que almacena una piedra eónica." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 171 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.gosmagia",
    name: "Gosmagia (Gosmagia)",
    type: "familiar",
    names: { "pt-BR": "Gosmagia", en: "Gosmagia", es: "Gosmagia" },
    size: "Minúsculo", speed: "25 pés", hp: 5, ac: 10, perception: 5,
    senses: "Faro Mágico 30 pés", attacks: [],
    supportBenefit: "Familiar específico limo.",
    specialAbility: "Faro Mágico; Defesa de Limo; Rejuvenescimento de Gosma.",
    grantedAbilities: ["escalador", "visão no escuro", "vigoroso"], requiredFamiliarAbilities: 4, requiresSpellcasting: true,
    description: "Limo colorido formado por essências de conjurações.",
    summaries: { "pt-BR": "Familiar limo leal que fareja magia.", en: "A loyal slime familiar that senses magic.", es: "Familiar limo leal que detecta magia." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 172 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.homunculus",
    name: "Homúnculo (Homunculus)",
    type: "familiar",
    names: { "pt-BR": "Homúnculo", en: "Homunculus", es: "Homúnculo" },
    size: "Minúsculo", speed: "25 pés, Voo 25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão no Escuro", attacks: [],
    supportBenefit: "Familiar específico constructo.",
    specialAbility: "Carregador; Vínculo Sanguíneo: elo telepático com o criador a 450 metros.",
    grantedAbilities: ["constructo", "destreza manual", "reservatório de veneno", "visão no escuro"], requiredFamiliarAbilities: 6,
    description: "Pequeno constructo servidor criado com uma gota de sangue do mestre.",
    summaries: { "pt-BR": "Constructo servidor com vínculo telepático sanguíneo.", en: "A construct servant with a telepathic blood bond.", es: "Constructo servidor con vínculo telepático de sangre." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 171 }, sourceApproximate: true, needs_review: true
  },
  {
    id: "pet.familiar.specific.fox",
    name: "Raposafídia (Foxhedron)",
    type: "familiar",
    names: { "pt-BR": "Raposafídia", en: "Foxhedron", es: "Zorrafidia" },
    size: "Minúsculo", speed: "25 pés", hp: 5, ac: 15, perception: 5,
    senses: "Visão no Escuro", attacks: [],
    supportBenefit: "Familiar específico besta.",
    specialAbility: "Linguista Erudito: fala e entende todos os idiomas conhecidos pelo mestre e um idioma comum adicional.",
    grantedAbilities: ["escalador", "fala", "perito", "segunda opinião", "visão no escuro"], requiredFamiliarAbilities: 5,
    description: "Raposa mágica reservada, tímida e apaixonada por conhecimento.",
    summaries: { "pt-BR": "Raposa mágica erudita com fala e perícia ampliadas.", en: "A scholarly magical fox with speech and expanded expertise.", es: "Zorra mágica erudita con habla y pericia ampliadas." },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 172 }, sourceApproximate: true, needs_review: true
  }
];
