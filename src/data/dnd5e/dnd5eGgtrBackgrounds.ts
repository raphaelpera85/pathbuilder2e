export const DND5E_GGTR_SOURCE_BOOK = "D&D 5e · Guia dos Mestres de Guilda de Ravnica";

export interface Dnd5eGuildSpellEntry {
  spellLevel: number;
  spells: string[];
}

export interface Dnd5eGgtrBackground {
  id: string;
  name: string;
  englishName: string;
  guild: string;
  sourcePage: number;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languageChoices: number;
  featureName: string;
  featureDescription: string;
  startingEquipment: string[];
  guildSpells: Dnd5eGuildSpellEntry[];
}

export const DND5E_GGTR_BACKGROUNDS: Dnd5eGgtrBackground[] = [
  {
    id: "dnd5e.ggtr.background.funcionario_de_azorius",
    name: "Funcionário de Azorius",
    englishName: "Azorius Functionary",
    guild: "Senado Azorius",
    sourcePage: 33,
    skillProficiencies: ["intuicao", "intimidacao"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Autoridade Legal",
    featureDescription: "Você tem a autoridade para aplicar as leis de Ravnica. Os cidadãos comuns reconhecem seu distintivo oficial e status, cedendo passagem e cooperando em investigações legítimas.",
    startingEquipment: [
      "Insígnia de Azorius",
      "Pergaminho de decreto de lei",
      "Frasco de tinta azul",
      "Caneta-tinteiro",
      "Conjunto de roupas finas",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Amizade", "Mensagem"] },
      { spellLevel: 1, spells: ["Comando", "Golpe Constritor"] },
      { spellLevel: 2, spells: ["Tranca Arcana", "Acalmar Emoções", "Imobilizar Pessoa"] },
      { spellLevel: 3, spells: ["Clarividência", "Contramágica"] },
      { spellLevel: 4, spells: ["Compulsão", "Adivinhação"] },
      { spellLevel: 5, spells: ["Dominar Pessoa"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.legionario_de_boros",
    name: "Legionário de Boros",
    englishName: "Boros Legionnaire",
    guild: "Legião Boros",
    sourcePage: 40,
    skillProficiencies: ["atletismo", "intimidacao"],
    toolProficiencies: ["jogos"],
    languageChoices: 1,
    featureName: "Posto na Legião",
    featureDescription: "Você possui patente e reconhecimento dentro da Legião Boros, permitindo requisitar armas simples e suprimentos temporários, além de ter abrigo e acesso garantidos em qualquer guarnição Boros em Ravnica.",
    startingEquipment: [
      "Insígnia de Boros",
      "Pena da asa de um anjo",
      "Pedaço esfarrapado de estandarte militar",
      "Conjunto de roupas comuns",
      "Algibeira com 2 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Raio de Fogo", "Chama Sagrada"] },
      { spellLevel: 1, spells: ["Raio Guiador", "Heroísmo"] },
      { spellLevel: 2, spells: ["Auxílio", "Raio Ardente"] },
      { spellLevel: 3, spells: ["Farol de Esperança", "Golpe Cegante", "Manto do Cruzado"] },
      { spellLevel: 4, spells: ["Proteção contra a Morte", "Escudo de Fogo"] },
      { spellLevel: 5, spells: ["Coluna de Chamas"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.operativo_de_dimir",
    name: "Operativo de Dimir",
    englishName: "Dimir Operative",
    guild: "Casa Dimir",
    sourcePage: 46,
    skillProficiencies: ["enganacao", "furtividade"],
    toolProficiencies: ["kit_de_disfarce"],
    languageChoices: 1,
    featureName: "Falsa Identidade",
    featureDescription: "Você mantém uma identidade secreta completa em uma guilda secundária com registros legítimos e contatos, permitindo circular infiltrado sem levantar suspeitas.",
    startingEquipment: [
      "Insígnia de Dimir",
      "Três facas pequenas",
      "Conjunto de roupas escuras comuns",
      "Kit de disfarce",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Codificar Pensamentos", "Mãos Mágicas"] },
      { spellLevel: 1, spells: ["Disfarçar-se", "Sono"] },
      { spellLevel: 2, spells: ["Detectar Pensamentos", "Passos sem Pegadas"] },
      { spellLevel: 3, spells: ["Forma Gasosa", "Mesclar-se às Rochas", "Dificultar Detecção"] },
      { spellLevel: 4, spells: ["Olho Arcano", "Movimentação Livre"] },
      { spellLevel: 5, spells: ["Modificar Memória"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.agente_golgari",
    name: "Agente Golgari",
    englishName: "Golgari Agent",
    guild: "Enxame Golgari",
    sourcePage: 53,
    skillProficiencies: ["adestrar_animais", "natureza"],
    toolProficiencies: ["kit_de_venenos"],
    languageChoices: 1,
    featureName: "Caminhos Subterrâneos",
    featureDescription: "Você conhece os túneis ocultos, esgotos e catacumbas da cidade subterrânea de Ravnica, permitindo viajar entre dois pontos na metrópole sem ser rastreado ou reduzindo o tempo de viagem pela metade.",
    startingEquipment: [
      "Insígnia de Golgari",
      "Kit de venenos",
      "Conjunto de roupas comuns",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Luzes Dançantes", "Poupar os Moribundos"] },
      { spellLevel: 1, spells: ["Constrição", "Raio de Doença"] },
      { spellLevel: 2, spells: ["Escuridão", "Raio do Enfraquecimento", "Patas de Aranha"] },
      { spellLevel: 3, spells: ["Animar Mortos", "Crescimento Vegetal"] },
      { spellLevel: 4, spells: ["Inseto Gigante", "Tentáculos Negros de Evard"] },
      { spellLevel: 5, spells: ["Névoa Mortal", "Praga de Insetos"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.anarca_gruul",
    name: "Anarca Gruul",
    englishName: "Gruul Anarch",
    guild: "Clãs Gruul",
    sourcePage: 60,
    skillProficiencies: ["adestrar_animais", "sobrevivencia"],
    toolProficiencies: ["instrumento_musical_ou_herbalismo"],
    languageChoices: 1,
    featureName: "Hospitalidade nos Escombros",
    featureDescription: "Você e seus companheiros encontram hospitalidade, abrigo e comida nos acampamentos dos clãs Gruul nos escombros e áreas selvagens de Ravnica, contanto que não demonstrem fraqueza ou arrogância da civilização.",
    startingEquipment: [
      "Insígnia de Gruul",
      "Dente ou garra de monstro",
      "Conjunto de roupas de viajante",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Raio de Fogo", "Produzir Chama"] },
      { spellLevel: 1, spells: ["Duelo Compelido", "Falar com Animais", "Onda Trovejante"] },
      { spellLevel: 2, spells: ["Sentido Bestial", "Despedaçar"] },
      { spellLevel: 3, spells: ["Conjurar Animais"] },
      { spellLevel: 4, spells: ["Pele de Pedra"] },
      { spellLevel: 5, spells: ["Onda Destrutiva"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.engenheiro_izzet",
    name: "Engenheiro Izzet",
    englishName: "Izzet Engineer",
    guild: "Liga Izzet",
    sourcePage: 66,
    skillProficiencies: ["arcanismo", "investigacao"],
    toolProficiencies: ["ferramentas_de_artesao"],
    languageChoices: 1,
    featureName: "Infraestrutura Urbana",
    featureDescription: "Você compreende a rede arquitetônica e conduítes de vapor e eletricidade de Ravnica, conseguindo deduzir a planta de prédios, rotas de fuga através de tubulações e fragilidades estruturais.",
    startingEquipment: [
      "Insígnia de Izzet",
      "Ferramentas de artesão",
      "Restos de experimento explodido",
      "Martelo",
      "Roldana e corda",
      "Conjunto de roupas comuns",
      "Algibeira com 5 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Produzir Chama", "Golpe Chocante"] },
      { spellLevel: 1, spells: ["Raio do Caos", "Criar ou Destruir Água", "Servo Invisível"] },
      { spellLevel: 2, spells: ["Esquentar Metal", "Truque de Corda"] },
      { spellLevel: 3, spells: ["Convocar Relâmpagos", "Arma Elemental", "Glifo de Vigilância"] },
      { spellLevel: 4, spells: ["Conjurar Elementais Menores", "Adivinhação", "Esfera Resiliente de Otiluke"] },
      { spellLevel: 5, spells: ["Animar Objetos", "Conjurar Elemental"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.representante_de_orzhov",
    name: "Representante de Orzhov",
    englishName: "Orzhov Representative",
    guild: "Sindicato Orzhov",
    sourcePage: 72,
    skillProficiencies: ["intimidacao", "religiao"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Influência e Dívidas",
    featureDescription: "Você pode exercer pressão e cobrar favores de devedores e inferiores hierárquicos em Ravnica, obtendo transporte, mensageiros rápidos ou limpeza discreta de cenas embaraçosas.",
    startingEquipment: [
      "Insígnia de Orzhov",
      "Corrente de dez moedas de ouro",
      "Vestes formais",
      "Conjunto de roupas finas",
      "Algibeira com 1 pl (10 po)"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Amizade", "Orientação"] },
      { spellLevel: 1, spells: ["Comando", "Escrita Ilusória"] },
      { spellLevel: 2, spells: ["Cativar", "Raio do Enfraquecimento", "Zona da Verdade"] },
      { spellLevel: 3, spells: ["Rogar Maldição", "Falar com os Mortos", "Guardiões Espirituais"] },
      { spellLevel: 4, spells: ["Deterioração", "Proteção contra a Morte", "Baú Secreto de Leomund"] },
      { spellLevel: 5, spells: ["Missão"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.cultista_de_rakdos",
    name: "Cultista de Rakdos",
    englishName: "Cultist of Rakdos",
    guild: "Culto de Rakdos",
    sourcePage: 79,
    skillProficiencies: ["acrobacia", "atuacao"],
    toolProficiencies: ["instrumento_musical"],
    languageChoices: 1,
    featureName: "Reputação Aterrorizante",
    featureDescription: "Cidadãos comuns de Ravnica temem a violência circense do Culto de Rakdos. Civis e pequenos criminosos cooperam ou saem do seu caminho para não despertar seus impulsos sádicos ou espetáculos macabros.",
    startingEquipment: [
      "Insígnia de Rakdos",
      "Instrumento musical",
      "Fantasia teatral",
      "Lanterna furta-fogo",
      "3 metros de corrente com espinhos",
      "Pederneira",
      "10 tochas",
      "Conjunto de roupas comuns",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Raio de Fogo", "Zombaria Viciosa"] },
      { spellLevel: 1, spells: ["Mãos Flamejantes", "Sussurros Dissonantes", "Repreensão Infernal"] },
      { spellLevel: 2, spells: ["Coroa da Loucura", "Cativar", "Esfera Flamejante"] },
      { spellLevel: 3, spells: ["Medo", "Velocidade"] },
      { spellLevel: 4, spells: ["Confusão", "Muralha de Fogo"] },
      { spellLevel: 5, spells: ["Dominar Pessoa"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.iniciado_selesnya",
    name: "Iniciado Selesnya",
    englishName: "Selesnya Initiate",
    guild: "Conclave Selesnya",
    sourcePage: 86,
    skillProficiencies: ["natureza", "persuasao"],
    toolProficiencies: ["ferramentas_de_artesao_ou_instrumento"],
    languageChoices: 1,
    featureName: "Abrigo do Conclave",
    featureDescription: "Você e seus aliados encontram abrigo, sustento e curas básicas em qualquer jardim, templo ou enclave Selesnya em Ravnica, desde que mantenham a harmonia e respeito comunitário.",
    startingEquipment: [
      "Insígnia de Selesnya",
      "Kit de curandeiro",
      "Vestes de iniciado",
      "Conjunto de roupas comuns",
      "Algibeira com 5 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Artifício Druídico", "Amizade"] },
      { spellLevel: 1, spells: ["Amizade Animal", "Enfeitiçar Pessoa"] },
      { spellLevel: 2, spells: ["Auxílio", "Mensageiro Animal", "Acalmar Emoções"] },
      { spellLevel: 3, spells: ["Crescimento Vegetal", "Falar com Plantas"] },
      { spellLevel: 4, spells: ["Aura de Vida", "Conjurar Elementais Menores"] },
      { spellLevel: 5, spells: ["Despertar", "Comunhão com a Natureza"] }
    ]
  },
  {
    id: "dnd5e.ggtr.background.cientista_simic",
    name: "Cientista Simic",
    englishName: "Simic Scientist",
    guild: "Combine Simic",
    sourcePage: 93,
    skillProficiencies: ["arcanismo", "medicina"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Recursos do Clado",
    featureDescription: "Como pesquisador de um clado Simic, você tem acesso livre aos zonots, laboratórios e câmaras de bioengenharia da guilda, podendo requisitar assistência de outros biomantes e materiais orgânicos para seus estudos.",
    startingEquipment: [
      "Insígnia de Simic",
      "Conjunto de roupas de plebeu",
      "Caderno de notas de pesquisa",
      "Caneta-tinteiro e frasco de tinta de lula",
      "Frasco de ácido",
      "Frascos com amostras biológicas",
      "Algibeira com 10 po"
    ],
    guildSpells: [
      { spellLevel: 0, spells: ["Espirro Ácido", "Artifício Druídico"] },
      { spellLevel: 1, spells: ["Recuo Acelerado", "Salto"] },
      { spellLevel: 2, spells: ["Alterar-se", "Aprimorar Habilidade", "Aumentar/Reduzir"] },
      { spellLevel: 3, spells: ["Forma Gasosa", "Respirar na Água", "Caminhar na Água"] },
      { spellLevel: 4, spells: ["Movimentação Livre", "Metamorfose"] },
      { spellLevel: 5, spells: ["Criação"] }
    ]
  }
];
