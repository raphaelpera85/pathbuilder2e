export const DND5E_STRIXHAVEN_SOURCE_BOOK = "D&D 5e · Strixhaven: Currículo do Caos";

export interface Dnd5eStrixhavenRace {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  size: "Pequeno ou Médio";
  speed: number;
  flySpeed: number;
  languages: string;
  traits: string[];
}

export interface Dnd5eStrixhavenBackground {
  id: string;
  name: string;
  englishName: string;
  college: "Lorehold" | "Prismari" | "Quandrix" | "Silverquill" | "Witherbloom";
  sourcePage: number;
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languages: string;
  equipment: string;
  featureName: string;
  featureDescription: string;
  bonusSpells: Record<number, string[]>;
}

export interface Dnd5eStrixhavenFeat {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  prerequisite: string | null;
  description: string;
  benefits: string[];
}

export interface Dnd5eStrixhavenSpell {
  id: string;
  name: string;
  englishName: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  classIds: string[];
  description: string;
  summary: string;
  sourcePage: number;
  higherLevels?: string;
}

export interface Dnd5eStrixhavenItem {
  id: string;
  name: string;
  englishName: string;
  type: "item" | "arma" | "armadura";
  rarity: "Comum" | "Incomum" | "Raro" | "Muito Raro" | "Lendário";
  attunement: boolean;
  cost: string;
  description: string;
  sourcePage: number;
}

// ─── 1. Ancestralidade: Corujoculado (Owlin) ──────────────────────────────────
export const DND5E_STRIXHAVEN_RACES: Dnd5eStrixhavenRace[] = [
  {
    id: "dnd5e.strixhaven.ancestry.owlin",
    name: "Corujoculado",
    englishName: "Owlin",
    sourcePage: 29,
    abilityBonuses: "+2 em um atributo e +1 em outro (ou +1 em três atributos)",
    attributeAdjustments: {},
    size: "Pequeno ou Médio",
    speed: 9,
    flySpeed: 9,
    languages: "Comum e mais 1 idioma à sua escolha",
    traits: [
      "Tipo de Criatura: Humanoide.",
      "Tamanho Flexível: Você escolhe se é de tamanho Médio ou Pequeno ao criar o personagem.",
      "Voo Silencioso: Graças às suas asas, você tem deslocamento de voo igual ao seu deslocamento de caminhada (9 metros). Você não pode voar se estiver vestindo armadura média ou pesada.",
      "Visão no Escuro Superior: Você enxerga na penumbra a até 36 metros como se fosse luz plena e na escuridão como penumbra.",
      "Penas Silenciosas: Suas penas não emitem som ao se mover ou voar. Você tem proficiência na perícia Furtividade."
    ]
  }
];

// ─── 2. Antecedentes das 5 Faculdades ──────────────────────────────────────────
export const DND5E_STRIXHAVEN_BACKGROUNDS: Dnd5eStrixhavenBackground[] = [
  {
    id: "dnd5e.strixhaven.background.lorehold",
    name: "Estudante de Lorehold",
    englishName: "Lorehold Student",
    college: "Lorehold",
    sourcePage: 31,
    skillProficiencies: ["História", "Religião"],
    languages: "Dois idiomas à sua escolha",
    equipment: "Um vidro de tinta preta, uma pena de escrever, um martelo de geólogo, um uniforme escolar e uma algibeira com 15 po",
    featureName: "Iniciado de Lorehold",
    featureDescription: "Você ganha o talento Iniciado de Strixhaven (Lorehold). Se você tiver a característica Conjuração ou Magia de Pacto, as magias da tabela de Magias de Lorehold são adicionadas à lista da sua classe.",
    bonusSpells: {
      1: ["Compreender Idiomas", "Santuário"],
      2: ["Conhecimento Emprestado", "Locomover-se sem Pegadas"],
      3: ["Falar com os Mortos", "Espíritos Guardiões"],
      4: ["Olho Arcano", "Guardião da Fé"],
      5: ["Coluna de Chamas", "Lendas e Histórias"]
    }
  },
  {
    id: "dnd5e.strixhaven.background.prismari",
    name: "Estudante de Prismari",
    englishName: "Prismari Student",
    college: "Prismari",
    sourcePage: 32,
    skillProficiencies: ["Acrobacia", "Atuação"],
    toolProficiencies: ["Um instrumento musical ou ferramentas de artesão à escolha"],
    languages: "Um idioma à sua escolha",
    equipment: "Um vidro de tinta azul, uma pena de escrever, um instrumento musical ou ferramentas de artesão, um uniforme escolar e uma algibeira com 15 po",
    featureName: "Iniciado de Prismari",
    featureDescription: "Você ganha o talento Iniciado de Strixhaven (Prismari). Se você tiver Conjuração ou Magia de Pacto, as magias de Prismari entram na lista de magias da sua classe.",
    bonusSpells: {
      1: ["Orbe Cromático", "Onda Trovejante"],
      2: ["Esfera Flamejante", "Passada Cinética"],
      3: ["Velocidade", "Caminhar sobre as Águas"],
      4: ["Libertar", "Tempestade de Gelo"],
      5: ["Cone de Frio", "Golpe de Vento Forte"]
    }
  },
  {
    id: "dnd5e.strixhaven.background.quandrix",
    name: "Estudante de Quandrix",
    englishName: "Quandrix Student",
    college: "Quandrix",
    sourcePage: 33,
    skillProficiencies: ["Arcanismo", "Natureza"],
    toolProficiencies: ["Ferramentas de artesão à escolha"],
    languages: "Um idioma à sua escolha",
    equipment: "Um vidro de tinta verde, uma pena de escrever, um pequeno ábaco, um uniforme escolar e uma algibeira com 15 po",
    featureName: "Iniciado de Quandrix",
    featureDescription: "Você ganha o talento Iniciado de Strixhaven (Quandrix). Se tiver Conjuração ou Magia de Pacto, as magias de Quandrix são adicionadas à sua lista de magias de classe.",
    bonusSpells: {
      1: ["Fogo das Fadas", "Riso Histérico de Tasha"],
      2: ["Aumentar/Reduzir", "Dobra de Vórtice"],
      3: ["Aura de Vitalidade", "Ampliar Plantas"],
      4: ["Controlar a Água", "Tentáculos Negros de Evard"],
      5: ["Círculo de Teletransporte", "Passo das Árvores"]
    }
  },
  {
    id: "dnd5e.strixhaven.background.silverquill",
    name: "Estudante de Silverquill",
    englishName: "Silverquill Student",
    college: "Silverquill",
    sourcePage: 34,
    skillProficiencies: ["Intimidação", "Persuasão"],
    languages: "Dois idiomas à sua escolha",
    equipment: "Um vidro de tinta preta, uma pena de escrever, um livro de poesia, um uniforme escolar e uma algibeira com 15 po",
    featureName: "Iniciado de Silverquill",
    featureDescription: "Você ganha o talento Iniciado de Strixhaven (Silverquill). Suas listas de magias de classe recebem a lista de magias expandidas de Silverquill.",
    bonusSpells: {
      1: ["Sussurros Dissonantes", "Farpas Prateadas"],
      2: ["Acalmar Emoções", "Escuridão"],
      3: ["Sinal de Esperança", "Luz do Dia"],
      4: ["Compulsão", "Confusão"],
      5: ["Dominar Pessoa", "Vínculo Telepático de Rary"]
    }
  },
  {
    id: "dnd5e.strixhaven.background.witherbloom",
    name: "Estudante de Witherbloom",
    englishName: "Witherbloom Student",
    college: "Witherbloom",
    sourcePage: 35,
    skillProficiencies: ["Natureza", "Sobrevivência"],
    toolProficiencies: ["Kit de herbalismo"],
    languages: "Um idioma à sua escolha",
    equipment: "Um vidro de tinta preta, uma pena, um livro de botânica, caldeirão de ferro, kit de herbalismo, uniforme escolar e algibeira com 15 po",
    featureName: "Iniciado de Witherbloom",
    featureDescription: "Você ganha o talento Iniciado de Strixhaven (Witherbloom). Suas listas de magias de classe recebem a lista de magias expandidas de Witherbloom.",
    bonusSpells: {
      1: ["Curar Ferimentos", "Infligir Ferimentos"],
      2: ["Restauração Menor", "Fenecer e Florescer"],
      3: ["Reviver", "Toque Vampírico"],
      4: ["Assolar", "Proteção contra a Morte"],
      5: ["Casulo Antivida", "Restauração Maior"]
    }
  }
];

// ─── 3. Talentos Oficiais ──────────────────────────────────────────────────────
export const DND5E_STRIXHAVEN_FEATS: Dnd5eStrixhavenFeat[] = [
  {
    id: "dnd5e.strixhaven.feat.iniciado_de_strixhaven",
    name: "Iniciado de Strixhaven",
    englishName: "Strixhaven Initiate",
    sourcePage: 36,
    prerequisite: null,
    description: "Você estudou teoria mágica na Universidade de Strixhaven e aprendeu truques e magias fundamentais da sua faculdade escolhida.",
    benefits: [
      "Escolha uma das cinco faculdades de Strixhaven: Lorehold, Prismari, Quandrix, Silverquill ou Witherbloom.",
      "Você aprende dois truques e uma magia de 1º nível correspondentes à faculdade escolhida.",
      "Você pode conjurar a magia de 1º nível escolhida sem gastar um espaço de magia uma vez por descanso longo, além de poder conjurá-la usando quaisquer espaços de magia que possua.",
      "Sua habilidade de conjuração para as magias deste talento pode ser Inteligência, Sabedoria ou Carisma (escolha ao obter o talento)."
    ]
  },
  {
    id: "dnd5e.strixhaven.feat.mascote_de_strixhaven",
    name: "Mascote de Strixhaven",
    englishName: "Strixhaven Mascot",
    sourcePage: 36,
    prerequisite: "4º nível, talento Iniciado de Strixhaven",
    description: "Você aprendeu a invocar um mascote animado ou vivo da sua faculdade de Strixhaven para auxiliá-lo em tarefas acadêmicas e combate.",
    benefits: [
      "Você pode conjurar a magia Encontrar Familiar como um ritual. Seu familiar assume a forma do mascote da sua faculdade (Estátua Espiritual, Elementar de Arte, Mascote Fractal, Tinteiro Inkling ou Praga de Pântano).",
      "Ao realizar a ação de Ataque no seu turno, você pode renunciar a um dos seus ataques para permitir que o familiar mascote realize um ataque próprio usando a reação dele.",
      "Se o familiar mascote estiver a até 18 metros de você, você pode usar uma ação para se teletransportar magicamente, trocando de lugar com ele. Pode usar esta troca uma vez por descanso longo (ou gastando um espaço de magia de 2º nível ou superior)."
    ]
  }
];

// ─── 4. Magias de Strixhaven ──────────────────────────────────────────────────
export const DND5E_STRIXHAVEN_SPELLS: Dnd5eStrixhavenSpell[] = [
  {
    id: "dnd5e.strixhaven.spell.silvery_barbs",
    name: "Farpas Prateadas",
    englishName: "Silvery Barbs",
    level: 1,
    school: "Encantamento",
    castingTime: "1 reação (quando criatura a 18m tem sucesso em ataque, teste de habilidade ou salvaguarda)",
    range: "18 metros (60 pés)",
    components: "V",
    duration: "Instantânea",
    classIds: ["bard", "sorcerer", "wizard"],
    description: "Você distrai magicamente a criatura desencadeadora e transforma a incerteza momentânea dela em encorajamento para outro aliado. A criatura desencadeadora deve rolar novamente o d20 e usar o menor resultado. Você pode então escolher uma criatura diferente que possa ver a até 18 metros (incluindo você mesmo); a criatura escolhida tem vantagem na próxima jogada de ataque, teste de habilidade ou salvaguarda que fizer dentro de 1 minuto.",
    summary: "Reação que força o alvo a rolar novamente um teste bem-sucedido e concede vantagem ao próximo teste de um aliado.",
    sourcePage: 37
  },
  {
    id: "dnd5e.strixhaven.spell.borrowed_knowledge",
    name: "Conhecimento Emprestado",
    englishName: "Borrowed Knowledge",
    level: 2,
    school: "Adivinhação",
    castingTime: "1 ação",
    range: "Pessoal",
    components: "V, S, M (um livro valendo ao menos 25 po)",
    duration: "1 hora",
    classIds: ["bard", "cleric", "warlock", "wizard"],
    description: "Você canaliza o conhecimento dos espíritos do passado para enriquecer sua mente. Escolha uma perícia na qual você não possua proficiência. Pela duração da magia, você passa a ter proficiência na perícia escolhida. A magia termina antecipadamente se você a conjurar de novo.",
    summary: "Garante proficiência temporária em qualquer perícia à sua escolha por 1 hora.",
    sourcePage: 37
  },
  {
    id: "dnd5e.strixhaven.spell.kinetic_jaunt",
    name: "Passada Cinética",
    englishName: "Kinetic Jaunt",
    level: 2,
    school: "Transmutação",
    castingTime: "1 ação bônus",
    range: "Pessoal",
    components: "S",
    duration: "Concentração, até 1 minuto",
    classIds: ["artificer", "bard", "sorcerer", "wizard"],
    description: "Você capacita magicamente seus passos com uma cadência fluida e dançante. Pela duração, seu deslocamento de caminhada aumenta em 3 metros, você não provoca ataques de oportunidade e pode se mover através do espaço de outras criaturas sem que isso conte como terreno difícil. Se terminar seu turno no espaço de outra criatura, é empurrado para o último espaço livre e sofre 1d8 de dano de força.",
    summary: "Ação bônus que concede +3m de deslocamento, nega ataques de oportunidade e permite atravessar criaturas.",
    sourcePage: 37
  },
  {
    id: "dnd5e.strixhaven.spell.vortex_warp",
    name: "Dobra de Vórtice",
    englishName: "Vortex Warp",
    level: 2,
    school: "Conjuração",
    castingTime: "1 ação",
    range: "27 metros (90 pés)",
    components: "V, S",
    duration: "Instantânea",
    classIds: ["artificer", "sorcerer", "wizard"],
    description: "Você distorce o tecido do espaço ao redor de outra criatura que possa ver dentro do alcance. O alvo deve ter sucesso em uma salvaguarda de Constituição (ele pode escolher falhar voluntariamente), ou é teletransportado para um espaço desocupado à sua escolha visível dentro do alcance. O espaço de destino deve estar sobre uma superfície ou líquido capaz de sustentá-lo.",
    summary: "Teletransporta uma criatura voluntária ou forçada para um espaço livre a até 27 metros.",
    sourcePage: 38,
    higherLevels: "Ao conjurar com espaço de 3º nível ou superior, o alcance da magia aumenta em 9 metros (30 pés) para cada nível acima do 2º."
  },
  {
    id: "dnd5e.strixhaven.spell.wither_and_bloom",
    name: "Fenecer e Florescer",
    englishName: "Wither and Bloom",
    level: 2,
    school: "Necromancia",
    castingTime: "1 ação",
    range: "18 metros (60 pés)",
    components: "V, S, M (uma vinha murcha amarrada em laço)",
    duration: "Instantânea",
    classIds: ["druid", "sorcerer", "wizard"],
    description: "Você evoca a morte e a vida simultaneamente em uma esfera de 3 metros de raio a partir de um ponto no alcance. Criaturas à sua escolha na área devem fazer uma salvaguarda de Constituição, sofrendo 2d6 de dano necrótico se falharem, ou metade desse dano em caso de sucesso. Vegetação não mágica na área murcha instantaneamente. Além disso, uma criatura à sua escolha na área pode gastar e rolar um de seus Dados de Vida não gastos para recuperar pontos de vida iguais ao resultado rolado mais seu modificador de habilidade de conjuração.",
    summary: "Esfera que causa 2d6 necrótico a inimigos e permite a um aliado gastar Dado de Vida para cura imediata.",
    sourcePage: 38,
    higherLevels: "Ao conjurar com espaço de 3º nível ou superior, o dano aumenta em 1d6 e a criatura pode gastar um Dado de Vida adicional para cura para cada nível acima do 2º."
  }
];

// ─── 5. Itens Mágicos de Strixhaven ───────────────────────────────────────────
export const DND5E_STRIXHAVEN_ITEMS: Dnd5eStrixhavenItem[] = [
  {
    id: "dnd5e.strixhaven.item.garrafa_de_cafe_sem_fim",
    name: "Garrafa de Café Sem Fim",
    englishName: "Bottle of Boundless Coffee",
    type: "item",
    rarity: "Comum",
    attunement: false,
    cost: "100 po",
    description: "Esta garrafa metálica contém um café delicioso e quentinho que nunca esfria. Cada vez que você bebe, role um d20; se rolar 1, ela se recusa a dispensar café pela próxima hora. Se o café for despejado no chão ou fora da boca, desaparece no ar instantaneamente.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.flamula_de_strixhaven",
    name: "Flâmula de Strixhaven",
    englishName: "Strixhaven Pennant",
    type: "item",
    rarity: "Comum",
    attunement: false,
    cost: "100 po",
    description: "Bandeeirola mágica trazendo o brasão da universidade ou de uma de suas faculdades. Enquanto você a empunhar com uma mão, ela tremula com orgulho mesmo sem vento, emitindo faíscas inofensivas de luz luminosa.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.mascote_de_pelucia",
    name: "Mascote de Pelúcia de Strixhaven",
    englishName: "Cuddly Strixhaven Mascot",
    type: "item",
    rarity: "Comum",
    attunement: false,
    cost: "100 po",
    description: "Representando um dos mascotes das faculdades, este brinquedo macio se fixa ao braço ou ombro como ação. Quando você fizer uma salvaguarda para evitar ou encerrar a condição amedrontado em si mesmo, tem vantagem na rolagem se a pelúcia estiver consigo.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.cartilha_de_lorehold",
    name: "Cartilha de Lorehold",
    englishName: "Lorehold Primer",
    type: "item",
    rarity: "Incomum",
    attunement: true,
    cost: "300 po",
    description: "Tomo encadernado em couro com runas de Lorehold. Possui 3 cargas e recupera 1d3 ao amanhecer. Você pode gastar cargas para adicionar 1d4 em testes de História ou Religião. Além disso, pode conjurar Compreender Idiomas gastando 1 carga.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.cartilha_de_prismari",
    name: "Cartilha de Prismari",
    englishName: "Prismari Primer",
    type: "item",
    rarity: "Incomum",
    attunement: true,
    cost: "300 po",
    description: "Tomo de pergaminho iridescente com anotações artísticas. Possui 3 cargas (recupera 1d3 ao amanhecer). Permite adicionar 1d4 em testes de Acrobacia ou Atuação, ou conjurar Raio de Fogo ou Toque Chocante como ação usando as cargas.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.cartilha_de_quandrix",
    name: "Cartilha de Quandrix",
    englishName: "Quandrix Primer",
    type: "item",
    rarity: "Incomum",
    attunement: true,
    cost: "300 po",
    description: "Grimório com fórmulas fractais e diagramas geométricos. Possui 3 cargas. Permite adicionar 1d4 em testes de Arcanismo ou Natureza, ou conjurar Orientação gastando 1 carga.",
    sourcePage: 38
  },
  {
    id: "dnd5e.strixhaven.item.cartilha_de_silverquill",
    name: "Cartilha de Silverquill",
    englishName: "Silverquill Primer",
    type: "item",
    rarity: "Incomum",
    attunement: true,
    cost: "300 po",
    description: "Volume encadernado em prata elegante com tratados de oratória. Possui 3 cargas. Permite adicionar 1d4 em testes de Intimidação ou Persuasão, ou conjurar Zombaria Viciosa gastando 1 carga.",
    sourcePage: 39
  },
  {
    id: "dnd5e.strixhaven.item.cartilha_de_witherbloom",
    name: "Cartilha de Witherbloom",
    englishName: "Witherbloom Primer",
    type: "item",
    rarity: "Incomum",
    attunement: true,
    cost: "300 po",
    description: "Tomo com folhas preservadas de pântano e couro escuro. Possui 3 cargas. Permite adicionar 1d4 em testes de Natureza ou Sobrevivência, ou conjurar Poupar os Moribundos gastando 1 carga.",
    sourcePage: 39
  }
];
