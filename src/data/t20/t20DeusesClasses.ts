export const T20_DEUSES_SOURCE_BOOK = "Tormenta20 — Deuses de Arton";

export interface T20ClassRules {
  id: string;
  name: string;
  sourcePage: number;
  startingHp: number;
  hpPerLevel: number;
  manaPerLevel: number;
  fixedSkills: string[];
  choiceSkillCount: number;
  choiceSkills: string[];
  proficiencies: string;
  startingEquipment: string[];
  progression?: Record<string, string[]>;
}

export interface T20ClassPower {
  id: string;
  name: string;
  type: string;
  prerequisite: string | null;
  description: string;
}

export const T20_FRADE_CLASS_RULES: T20ClassRules = {
  "id": "frade",
  "name": "Frade",
  "sourcePage": 38,
  "startingHp": 12,
  "hpPerLevel": 3,
  "manaPerLevel": 6,
  "fixedSkills": [
    "religiao",
    "vontade"
  ],
  "choiceSkillCount": 4,
  "choiceSkills": [
    "adestramento",
    "atuacao",
    "conhecimento",
    "cura",
    "diplomacia",
    "fortitude",
    "guerra",
    "iniciativa",
    "intimidacao",
    "intuicao",
    "investigacao",
    "misticismo",
    "oficio",
    "percepcao",
    "nobreza"
  ],
  "proficiencies": "Nenhuma",
  "startingEquipment": [
    "Símbolo sagrado",
    "Manto de frade",
    "Versiculário",
    "Mochila de aventureiro"
  ],
  "progression": {
    "1": [
      "Devoto Fiel",
      "Erudição",
      "Magias (1º círculo)"
    ],
    "2": [
      "Poder de Frade",
      "Versiculário"
    ],
    "3": [
      "Poder de Frade"
    ],
    "4": [
      "Poder de Frade"
    ],
    "5": [
      "Dádiva da Fé",
      "Magias (2º círculo)",
      "Poder de Frade"
    ],
    "6": [
      "Poder de Frade"
    ],
    "7": [
      "Poder de Frade"
    ],
    "8": [
      "Poder de Frade"
    ],
    "9": [
      "Magias (3º círculo)",
      "Poder de Frade"
    ],
    "10": [
      "Poder de Frade"
    ],
    "11": [
      "Poder de Frade"
    ],
    "12": [
      "Poder de Frade"
    ],
    "13": [
      "Magias (4º círculo)",
      "Poder de Frade"
    ],
    "14": [
      "Poder de Frade"
    ],
    "15": [
      "Poder de Frade"
    ],
    "16": [
      "Poder de Frade"
    ],
    "17": [
      "Magias (5º círculo)",
      "Poder de Frade"
    ],
    "18": [
      "Poder de Frade"
    ],
    "19": [
      "Poder de Frade"
    ],
    "20": [
      "Solo Santificado",
      "Poder de Frade"
    ]
  }
};

export const T20_FRADE_POWERS: T20ClassPower[] = [
  {
    "id": "acelerar_sacrario",
    "name": "Acelerar Sacrário",
    "type": "sacrario",
    "prerequisite": "5º nível de frade",
    "description": "Quando cria um sacrário, você pode gastar +2 PM para criá-lo como uma ação de movimento (em vez de uma ação padrão)."
  },
  {
    "id": "ampliar_sacrario",
    "name": "Ampliar Sacrário",
    "type": "sacrario",
    "prerequisite": "10º nível de frade",
    "description": "Você pode criar sacrários em alcance médio e eles passam a ocupar uma esfera de 6m de raio."
  },
  {
    "id": "aumento_de_atributo",
    "name": "Aumento de Atributo",
    "type": "geral",
    "prerequisite": null,
    "description": "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    "id": "autoridade_eclesiastica",
    "name": "Autoridade Eclesiástica",
    "type": "divino",
    "prerequisite": "5º nível de frade, devoto de um deus maior",
    "description": "Você possui uma posição formal em uma igreja reconhecida pelos outros membros de sua fé. Os efeitos deste poder variam de acordo com sua divindade."
  },
  {
    "id": "bencao_fortalecedora",
    "name": "Bênção Fortalecedora",
    "type": "magia",
    "prerequisite": "Bênção",
    "description": "Quando você lança Bênção, os aliados abençoados recebem uma quantidade de PV temporários igual a 5 vezes o bônus em testes de ataque fornecido pela magia. Esses PV temporários duram enquanto a magia durar."
  },
  {
    "id": "canto_monastico",
    "name": "Canto Monástico",
    "type": "suporte",
    "prerequisite": "treinado em Atuação",
    "description": "Você pode gastar uma ação padrão e 1 PM para entoar um cântico religioso. Faça um teste de Atuação para ajudar. Seus aliados em alcance curto recebem um bônus igual ao bônus de ajuda em um teste de perícia feito até o fim da cena ou na CD para resistir a uma de suas habilidades usada até o fim da cena."
  },
  {
    "id": "comunhao_vital",
    "name": "Comunhão Vital",
    "type": "cura",
    "prerequisite": null,
    "description": "Quando lança uma magia que cure uma criatura, você pode pagar +2 PM para que outra criatura em alcance curto (incluindo você mesmo) recupere uma quantidade de pontos de vida igual à metade dos PV da cura original."
  },
  {
    "id": "conhecimento_magico",
    "name": "Conhecimento Mágico",
    "type": "magia",
    "prerequisite": null,
    "description": "Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser."
  },
  {
    "id": "copista",
    "name": "Copista",
    "type": "oficio",
    "prerequisite": "treinado em Ofício (escriba)",
    "description": "Você pode criar pergaminhos, como se tivesse o poder Escrever Pergaminho. Se tiver ambos, pode fabricar o dobro de pergaminhos ao mesmo tempo (pagando o custo de matéria-prima de ambos)."
  },
  {
    "id": "cozinheiro_da_abadia",
    "name": "Cozinheiro da Abadia",
    "type": "oficio",
    "prerequisite": "treinado em Ofício (cozinheiro)",
    "description": "Quando prepara um prato especial, você pode combinar os efeitos de dois pratos. Você faz apenas um teste de Ofício, mas paga o custo de ambos."
  },
  {
    "id": "estudante_diligente",
    "name": "Estudante Diligente",
    "type": "pericia",
    "prerequisite": null,
    "description": "No começo do dia você pode escolher uma perícia em que não seja treinado. Se fizer isso, até o fim do dia você sofre uma penalidade de -2 PM, mas pode fazer testes da perícia escolhida como se fosse treinado nela."
  },
  {
    "id": "fe_e_razao",
    "name": "Fé e Razão",
    "type": "magia",
    "prerequisite": null,
    "description": "Quando usa uma habilidade de frade, você pode gastar uma quantidade de PM limitada por sua Inteligência. Se fizer isso, a CD dessa habilidade aumenta em +1 por PM gasto."
  },
  {
    "id": "mago_branco",
    "name": "Mago Branco",
    "type": "cura",
    "prerequisite": "3º nível de frade",
    "description": "Suas magias de cura de luz custam -1 PM e curam +1 PV por dado de cura."
  },
  {
    "id": "memorizar_liturgia",
    "name": "Memorizar Liturgia",
    "type": "magia",
    "prerequisite": "Copista, 8º nível de frade",
    "description": "Uma vez por dia, você pode gastar 1 hora de estudo e um número de pergaminhos que contenham magias divinas igual ou menor que sua Inteligência. Até o fim do dia, você pode lançar as magias contidas nesses pergaminhos como se as conhecesse ou, se já conhecia a magia, soma sua Inteligência no limite de PM para lançá-la."
  },
  {
    "id": "oficio_do_mosteiro",
    "name": "Ofício do Mosteiro",
    "type": "oficio",
    "prerequisite": "treinado em Ofício (artesão)",
    "description": "Você pode fabricar itens de vestuário com Ofício (artesão) e pode usar essa perícia para fabricar itens com uma melhoria."
  },
  {
    "id": "psicografia",
    "name": "Psicografia",
    "type": "oficio",
    "prerequisite": "Copista, 5º nível de frade",
    "description": "Seus textos recebem inspiração divina. Você pode fabricar pergaminhos de qualquer magia divina (mesmo uma que não conheça) de quaisquer círculos a que tenha acesso. A CD para fabricar um desses pergaminhos aumenta em +5."
  },
  {
    "id": "sacrario_da_erudicao",
    "name": "Sacrário da Erudição",
    "type": "sacrario",
    "prerequisite": null,
    "description": "Quando lançam magias a partir de pergaminhos, você e seus aliados dentro do sacrário recebem +1 PM para gastar em aprimoramentos (mesmo que não conheçam a magia)."
  },
  {
    "id": "sacrario_da_misericordia",
    "name": "Sacrário da Misericórdia",
    "type": "sacrario",
    "prerequisite": "5º nível de frade",
    "description": "No início dos seus turnos, cada criatura a sua escolha dentro do sacrário recupera uma quantidade de PV igual a 5 + sua Sabedoria. Este sacrário tem duração sustentada."
  },
  {
    "id": "sacrario_da_resiliencia",
    "name": "Sacrário da Resiliência",
    "type": "sacrario",
    "prerequisite": "5º nível de frade",
    "description": "Você e seus aliados dentro do sacrário recebem +2 em testes de resistência e na Defesa. Quando cria este sacrário, você pode gastar mais PM para fortalecer seu efeito; para cada 2 PM adicionais gastos, o bônus concedido pelo sacrário aumenta em +1 (bônus máximo limitado pelo círculo máximo de magias que você pode lançar)."
  },
  {
    "id": "sacrario_da_solenidade",
    "name": "Sacrário da Solenidade",
    "type": "sacrario",
    "prerequisite": null,
    "description": "Criaturas dentro da área ficam sob condição terrível para lançar magias e sofrem -2 na Defesa. Quando cria este sacrário você pode gastar mais PM para fortalecer seu efeito; para cada 2 PM adicionais gastos, a penalidade causada pelo sacrário aumenta em 1 (penalidade máxima limitada pelo círculo máximo de magias que você pode lançar)."
  },
  {
    "id": "sacrario_da_verdade",
    "name": "Sacrário da Verdade",
    "type": "sacrario",
    "prerequisite": null,
    "description": "Sempre que uma criatura na área passa em um teste de Acrobacia, Enganação, Furtividade ou Ladinagem, ou acerta um ataque contra uma criatura sob efeito de uma ou mais condições, ela sofre 2d6 pontos de dano psíquico por círculo de magia a que você tem acesso."
  },
  {
    "id": "sacrario_das_sombras",
    "name": "Sacrário das Sombras",
    "type": "sacrario",
    "prerequisite": null,
    "description": "A área do sacrário é coberta por sombras; criaturas dentro dela recebem camuflagem leve e, se forem mortos-vivos, também recebem +2 na Defesa e em testes de perícia."
  },
  {
    "id": "sacrario_do_compartilhamento",
    "name": "Sacrário do Compartilhamento",
    "type": "sacrario",
    "prerequisite": "7º nível de frade",
    "description": "Este sacrário tem duração sustentada. Quando lança uma magia de 1º ou 2º círculo que tenha apenas você como alvo, se estiver em alcance curto deste sacrário você pode gastar 2 PM para que um aliado dentro dele receba o efeito básico dessa magia."
  },
  {
    "id": "sacrario_do_ocaso",
    "name": "Sacrário do Ocaso",
    "type": "sacrario",
    "prerequisite": null,
    "description": "Este sacrário é criado com 60 pontos de ocaso. No início de seus turnos, o sacrário perde 1d10 pontos de ocaso, e cada criatura dentro dele perde esse valor em PV. A perda de PV aumenta em +1d10 para cada círculo de magia que você possa lançar além do 1º. Quando cria o sacrário, você pode gastar mais PM para fortalecer seu efeito; para cada PM adicional gasto, o sacrário é criado com +20 pontos de ocaso. O sacrário desaparece quando seus pontos de ocaso terminam."
  },
  {
    "id": "sermao_da_celeridade",
    "name": "Sermão da Celeridade",
    "type": "suporte",
    "prerequisite": "8º nível de frade",
    "description": "Uma vez por rodada, você pode gastar 5 PM para fazer um aliado em alcance curto ganhar uma ação padrão adicional no próximo turno dele. Você só pode usar esta habilidade uma vez por cena em cada aliado."
  },
  {
    "id": "sermao_da_egide",
    "name": "Sermão da Égide",
    "type": "suporte",
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 3 PM para orar por proteção para uma criatura em alcance curto. Até o seu próximo turno, quando essa criatura sofrer dano, ela pode gastar essa proteção para reduzir esse dano à metade."
  },
  {
    "id": "teologia_aplicada",
    "name": "Teologia Aplicada",
    "type": "pericia",
    "prerequisite": null,
    "description": "Escolha duas perícias. Quando faz um teste de uma dessas perícias (exceto testes de ataque), você pode gastar 1 PM para rolar novamente esse teste, usando Religião. Você pode escolher este poder outras vezes para perícias diferentes."
  },
  {
    "id": "transferir_sacrario",
    "name": "Transferir Sacrário",
    "type": "sacrario",
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e 1 PM para transferir um de seus sacrários no alcance em que você pode criá-lo para outro ponto no mesmo alcance."
  },
  {
    "id": "zelador_dos_vinhedos",
    "name": "Zelador dos Vinhedos",
    "type": "oficio",
    "prerequisite": "treinado em Ofício (cozinheiro)",
    "description": "Você pode usar Ofício (cozinheiro) para preparar poções de magias que você conheça e cujo alvo seja 1 criatura. As poções tomam a forma de bebidas e seguem as regras desses itens, exceto que ingeri-las é uma ação padrão."
  }
];
