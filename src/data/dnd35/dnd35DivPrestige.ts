/**
 * D&D 3.5 — O Livro Completo do Divino (ed. Devir Brasil, 2006/2007), Capítulo 2: Classes de Prestígio (pp. 19-76).
 * Todas as 24 classes de prestígio oficiais catalogadas sob o ruleset 'v35-div'.
 * Transcrição integral conferida contra as páginas originais da edição brasileira.
 */

export type Dnd35DivPrestigeLevel = {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
  casterProgression?: string;
  spellsPerDay?: (number | null)[];
};

export type Dnd35DivPrestigeClass = {
  id: string;
  name: string;
  page: number;
  hitDie: string;
  skillPoints: string;
  classSkills: string[];
  requirements: {
    alignment?: string;
    bab?: string;
    skills: string[];
    feats: string[];
    spells?: string[];
    special: string[];
  };
  levels: Dnd35DivPrestigeLevel[];
  features: { name: string; text: string }[];
  description: string;
  spellList?: { level: number; spells: string[] }[];
};

export const DND35_DIV_PRESTIGE: Dnd35DivPrestigeClass[] = [
  {
    "id": "div-prestige-contemplativo",
    "name": "Contemplativo",
    "page": 21,
    "hitDie": "d6",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "skills": [
        "13 graduações em Conhecimento (religião)"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível"
      ],
      "special": [
        "O personagem deve ter mantido um contato direto com sua divindade ou um servo enviado por ela, ou com seres superiores que incorporem os princípios de sua tendência."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Domínio adicional, saúde divina",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Mente escorregadia",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Integridade divina",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Corpo divino",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Domínio adicional",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Alma divina",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "Corpo eterno",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "União mística",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Domínio Adicional",
        "text": "No 1º e no 6º nível, o contemplativo adquire acesso a um domínio adicional da sua divindade, recebendo o poder concedido e as magias de domínio."
      },
      {
        "name": "Saúde Divina (Ext)",
        "text": "Imunidade a todas as doenças, normais e mágicas."
      },
      {
        "name": "Mente Escorregadia (Ext)",
        "text": "No 2º nível, se falhar em teste contra encantamento, faz uma segunda tentativa na rodada seguinte."
      },
      {
        "name": "Integridade Divina (Sob)",
        "text": "No 3º nível, pode curar seus próprios ferimentos em até duas vezes seu nível de prestígio em PV por dia."
      },
      {
        "name": "Corpo Divino (Sob)",
        "text": "No 5º nível, torna-se imune a venenos de qualquer tipo."
      },
      {
        "name": "Alma Divina (Sob)",
        "text": "No 7º nível, adquire Resistência à Magia igual ao nível de prestígio + 15."
      },
      {
        "name": "Corpo Eterno (Ext)",
        "text": "No 9º nível, não sofre mais penalidades por envelhecimento e não pode ser envelhecido magicamente."
      },
      {
        "name": "União Mística (Sob)",
        "text": "No 10º nível, torna-se extra-planar (nativo) e ganha RD 10/mágico."
      }
    ],
    "description": "Dedicados a alcançar a comunhão máxima com sua divindade através de meditação profunda e ascese, os contemplativos purificam corpo e mente, tornando-se canais vivos do poder divino no mundo mortal."
  },
  {
    "id": "div-prestige-corruptor",
    "name": "Corruptor",
    "page": 23,
    "hitDie": "d8",
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Concentração (Con)",
      "Conhecimento (natureza) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magias (Int)",
      "Natação (For)",
      "Ofícios (Int)",
      "Ouvir (Sab)",
      "Profissão (herborista) (Sab)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Bom",
      "bab": "+4",
      "skills": [],
      "feats": [],
      "special": [
        "O personagem deve ser um ex-druida, anteriormente capaz de conjurar magias de 3º nível."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Desmatamento, sustento",
        "spellsPerDay": [
          0,
          1
        ]
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Fogo devastador",
        "spellsPerDay": [
          1,
          2,
          0
        ]
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Forma selvagem de mortos-vivos 1/dia",
        "spellsPerDay": [
          2,
          3,
          1,
          0
        ]
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Falar com animais mortos, forma selvagem 2/dia",
        "spellsPerDay": [
          3,
          4,
          2,
          1,
          0
        ]
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Toque da praga 1/dia, forma selvagem (Grande)",
        "spellsPerDay": [
          3,
          4,
          3,
          2,
          1,
          0
        ]
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Criar animais mortos-vivos, forma selvagem 3/dia",
        "spellsPerDay": [
          3,
          4,
          3,
          3,
          2,
          1,
          0
        ]
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Toque da praga 2/dia, forma selvagem (Incorpóreo)",
        "spellsPerDay": [
          3,
          4,
          4,
          3,
          3,
          2,
          1,
          0
        ]
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Desvincular, forma selvagem 4/dia",
        "spellsPerDay": [
          3,
          4,
          4,
          4,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Toque da praga 3/dia, forma selvagem (Enorme)",
        "spellsPerDay": [
          3,
          4,
          4,
          4,
          4,
          3,
          3,
          2
        ]
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Peste, forma selvagem 5/dia",
        "spellsPerDay": [
          3,
          4,
          4,
          4,
          4,
          4,
          3,
          3
        ]
      }
    ],
    "features": [
      {
        "name": "Desmatamento (SM)",
        "text": "Mata plantas num raio de 6 m por nível de classe 1/dia para recarregar suas magias diárias."
      },
      {
        "name": "Fogo Devastador (Sob)",
        "text": "No 2º nível, rajada de fogo que causa 5d6 pontos de dano em raio de 3 m (Reflexos metade)."
      },
      {
        "name": "Sustento (Ext)",
        "text": "No 1º nível, não precisa mais de comida ou água para sobreviver."
      },
      {
        "name": "Forma Selvagem de Mortos-Vivos (SM)",
        "text": "Adota a forma esquelética de animais com imunidades de morto-vivo e RD 5/concussão."
      },
      {
        "name": "Falar com Animais Mortos (SM)",
        "text": "No 4º nível, conversa com animais mortos 1/dia como falar com os mortos."
      },
      {
        "name": "Toque da Praga (Sob)",
        "text": "Gera efeito idêntico a contágio por toque."
      },
      {
        "name": "Criar Animais Mortos-Vivos (SM)",
        "text": "No 6º nível, cria esqueletos ou zumbis animais a partir de carcaças."
      },
      {
        "name": "Desvincular (SM)",
        "text": "No 8º nível, rompe o elo de companheiro animal ou familiar de um rival."
      },
      {
        "name": "Peste (Sob)",
        "text": "No 10º nível, propaga contágio em área de 6 m de raio."
      }
    ],
    "spellList": [
      {
        "level": 0,
        "spells": [
          "brilho",
          "detectar venenos",
          "ler magias",
          "som fantasma",
          "virtude",
          "respeito menor"
        ]
      },
      {
        "level": 1,
        "spells": [
          "amaldiçoar água",
          "destruição de sementes",
          "névoa obscurecente",
          "raio do enfraquecimento",
          "suportar elementos"
        ]
      },
      {
        "level": 2,
        "spells": [
          "chama contínua",
          "escuridão",
          "esfera de fogo",
          "esquentar metal",
          "névoa densa",
          "torcer madeira"
        ]
      },
      {
        "level": 3,
        "spells": [
          "dissipar magia",
          "envenenamento",
          "falar com plantas",
          "murchar",
          "profanar",
          "praga de insetos menor"
        ]
      },
      {
        "level": 4,
        "spells": [
          "anti-vida",
          "assassino fantasmagórico",
          "enferrujar",
          "tempestade de chamas menor"
        ]
      },
      {
        "level": 5,
        "spells": [
          "praga de insetos",
          "matar",
          "muralha de fogo",
          "ondas de fadiga"
        ]
      },
      {
        "level": 6,
        "spells": [
          "criar mortos-vivos",
          "desintegrar",
          "dissipar magia maior",
          "muralha de espinhos profana"
        ]
      },
      {
        "level": 7,
        "spells": [
          "controlar o clima",
          "onda de choque de fogo",
          "terremoto"
        ]
      },
      {
        "level": 8,
        "spells": [
          "drenar energia temporária",
          "evaporação",
          "praga de gafanhotos"
        ]
      },
      {
        "level": 9,
        "spells": [
          "tempestade de vingança",
          "implosão",
          "palavra da morte"
        ]
      }
    ],
    "description": "Ex-druidas amargurados que romperam seu pacto com a natureza e agora extraem poder mágico da destruição deliberada e do desmatamento da flora."
  },
  {
    "id": "div-prestige-cruzado-divino",
    "name": "Cruzado Divino",
    "page": 26,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Diplomacia (Car)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Natação (For)",
      "Ofícios (Int)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+7",
      "alignment": "Deve ser idêntica à divindade patrona",
      "skills": [
        "2 graduações em Conhecimento (religião)"
      ],
      "feats": [
        "Foco em Arma (na arma predileta da divindade)"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Aura, domínio escolhido",
        "spellsPerDay": [
          1
        ]
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "—",
        "spellsPerDay": [
          2,
          1
        ]
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Resistência a eletricidade 5",
        "spellsPerDay": [
          3,
          2,
          1
        ]
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Especialização em Arma",
        "spellsPerDay": [
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Resistência a ácido 5",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Visão no escuro",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Resistência a ácido e eletricidade 10",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Auto-perfeição",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          2
        ]
      }
    ],
    "features": [
      {
        "name": "Aura (Ext)",
        "text": "Possui uma poderosa aura de alinhamento igual ao seu nível somado aos níveis de clérigo ou paladino."
      },
      {
        "name": "Domínio Escolhido",
        "text": "Escolhe um domínio da divindade patrona, ganha o poder concedido e conjura exclusivamente as 9 magias desse domínio com base em Carisma."
      },
      {
        "name": "Resistência a Energia (Ext)",
        "text": "Ganha resistência a eletricidade 5 no 3º nível e resistência a ácido 5 no 6º nível. Ambas aumentam para 10 no 9º nível."
      },
      {
        "name": "Especialização em Arma",
        "text": "No 5º nível, recebe Especialização em Arma como talento adicional para a arma predileta de seu deus."
      },
      {
        "name": "Visão no Escuro (Ext)",
        "text": "No 7º nível adquire visão no escuro com alcance de 18 m (ou +9 m se já possuir)."
      },
      {
        "name": "Auto-Perfeição",
        "text": "No 10º nível torna-se extra-planar (nativo) e ganha RD 10/mágico."
      }
    ],
    "description": "Campeões dedicados de corpo e alma a um aspecto singular de sua divindade, canalizando os poderes absolutos de um único domínio através do fervor marcial."
  },
  {
    "id": "div-prestige-devoto-da-guerra",
    "name": "Devoto da Guerra",
    "page": 28,
    "hitDie": "d10",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Cavalgar (Des)",
      "Concentração (Con)",
      "Conhecimento (história) (Int)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Natação (For)",
      "Ofícios (Int)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "8 graduações em Diplomacia",
        "5 graduações em Sentir Motivação"
      ],
      "feats": [
        "Magias em Combate"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de pelo menos um dos seguintes domínios: Destruição, Força, Guerra ou Proteção"
      ],
      "special": [
        "Capacidade de expulsar ou fascinar mortos-vivos"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Domínio adicional, bravura, expulsar ou fascinar mortos-vivos",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Incentivar +2",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Curar ferimentos leves em massa 1/dia",
        "casterProgression": "—"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Aura de medo 1/dia",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Banquete de heróis 1/dia, incentivar +4",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Velocidade 3/dia",
        "casterProgression": "—"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Cura completa em massa 1/dia",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Inimigo implacável, incentivar +6",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Domínio Adicional",
        "text": "Ganha o domínio da Glória (se canalizar energia positiva) ou da Dominação (se canalizar negativa)."
      },
      {
        "name": "Bravura (Ext)",
        "text": "Permite que aliados sob efeito de medo a até 18 m façam novo teste com bônus de moral igual ao seu nível de classe."
      },
      {
        "name": "Incentivar (Ext)",
        "text": "Discurso em ação de rodada completa confere bônus de moral contra feitiços e medo a aliados (+2 no 2º nível, +4 no 6º, +6 no 10º)."
      },
      {
        "name": "Habilidades Similares a Magia",
        "text": "Curar ferimentos leves em massa 1/dia (3º), aura de medo 1/dia (5º), banquete de heróis 1/dia (6º), velocidade 3/dia (7º), cura completa em massa 1/dia (9º)."
      },
      {
        "name": "Inimigo Implacável",
        "text": "No 10º nível projeta uma aura de 30 m permitindo que aliados permaneçam de pé e lutando mesmo abaixo de 0 PV até atingirem -20 PV."
      }
    ],
    "description": "Líderes marciais e capelães de guerra ferozes que marcham na vanguarda do combate, inspirando exércitos inteiros e sustentando seus guerreiros além dos limites mortais."
  },
  {
    "id": "div-prestige-discipulo-do-vacuo",
    "name": "Discípulo do Vácuo",
    "page": 30,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (todos) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer Neutro",
      "skills": [
        "10 graduações em Identificar Magia"
      ],
      "feats": [
        "Elevar Magia",
        "Magia Penetrante"
      ],
      "spells": [
        "Capacidade de conjurar magias arcanas ou divinas de 3º nível"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Sentir o vácuo (sentidos físicos, 1/dia)",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Sentir o vácuo 2/dia",
        "casterProgression": "—"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Momento de clareza (2/dia)",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Sentir o vácuo (sentidos mágicos, 3/dia)",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Alterar o curso, sentir o vácuo 4/dia",
        "casterProgression": "—"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "Momento de clareza (3/dia)",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "Sentir o vácuo (sentidos empáticos, 5/dia)",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Liberar o vácuo",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 11,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Sentir o vácuo 6/dia",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 12,
        "bab": "+6",
        "fort": 4,
        "ref": 4,
        "will": 8,
        "special": "Suprimir o vácuo, momento de clareza 4/dia",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 13,
        "bab": "+6",
        "fort": 4,
        "ref": 4,
        "will": 8,
        "special": "Sentir o vácuo (sentidos mentais, 7/dia), atacar com o vácuo",
        "casterProgression": "—"
      }
    ],
    "features": [
      {
        "name": "Sentir o Vácuo (Sob)",
        "text": "Projeta a consciência sobre qualquer local ou criatura a grandes distâncias (físicos, mágicos no 5º, empáticos no 9º e mentais no 13º)."
      },
      {
        "name": "Momento de Clareza (Sob)",
        "text": "Concede a um aliado tocado temporariamente uma perícia ou talento."
      },
      {
        "name": "Alterar o Curso (Sob)",
        "text": "No 7º nível, adiciona +20 de bônus em uma jogada de ataque, perícia ou teste de habilidade 1/dia."
      },
      {
        "name": "Liberar o Vácuo (Sob)",
        "text": "No 10º nível, permite que um aliado use seu modificador de habilidade mais alto no lugar de qualquer outro."
      },
      {
        "name": "Suprimir o Vácuo (Sob)",
        "text": "No 12º nível, força um inimigo a usar seu modificador de habilidade mais baixo por 5 rodadas."
      },
      {
        "name": "Atacar com o Vácuo (Sob)",
        "text": "No 13º nível, desferir toque que impõe 1d4 níveis negativos a um oponente 1/dia."
      }
    ],
    "description": "Estudiosos profundos do quinto elemento oriental, o Vácuo, que une e transcende todas as coisas materiais, rompendo as barreiras do espaço, do tempo e dos atributos mortais."
  },
  {
    "id": "div-prestige-entropomante",
    "name": "Entropomante",
    "page": 32,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (arcano) (Int)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Identificar Magia (Int)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Bom",
      "skills": [
        "5 graduações em Concentração",
        "5 graduações em Conhecimento (arcano)"
      ],
      "feats": [
        "Aptidão Mágica",
        "Fortitude Maior"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 4º nível"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Fragmento de entropia (3d6)",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Campo entrópico 1/dia",
        "casterProgression": "—"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Campo entrópico (refazer jogada), fragmento (5d6)",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Campo entrópico (sangramento)",
        "casterProgression": "—"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Fragmento de entropia (7d6, atração)",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Controlar esfera da aniquilação",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Fragmento de Entropia (Sob)",
        "text": "Cria um orbe minúsculo de destruição pura que causa dano ignorando dureza (3d6 no 1º, 5d6 no 5º, 7d6 com atração no 9º nível)."
      },
      {
        "name": "Campo Entrópico (Sob)",
        "text": "Anula curas mágicas em área e no 5º nível permite forçar alvos a refazerem jogadas; no 7º impõe dano contínuo de sangramento."
      },
      {
        "name": "Controlar Esfera (Sob)",
        "text": "No 10º nível adquire o domínio e controle seguro de uma lendária esfera da aniquilação."
      }
    ],
    "description": "Cultistas do nada absoluto e da decadência cósmica que canalizam os poderes aterrorizantes da entropia pura e dominam os mistérios das esferas da aniquilação."
  },
  {
    "id": "div-prestige-evangelista",
    "name": "Evangelista",
    "page": 35,
    "hitDie": "d6",
    "skillPoints": "6 + modificador de Int",
    "classSkills": [
      "Arte da Fuga (Des)",
      "Blefar (Car)",
      "Conhecimento (todos) (Int)",
      "Diplomacia (Car)",
      "Disfarces (Car)",
      "Falar Idioma (nenhum)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Ouvir (Sab)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "alignment": "Sujeito às restrições da divindade patrona",
      "skills": [
        "5 graduações em Blefar",
        "5 graduações em Obter Informação",
        "5 graduações em Conhecimento (religião)",
        "6 graduações em Atuação (oratória)",
        "5 graduações em Sentir Motivação"
      ],
      "feats": [
        "Negociador",
        "Persuasivo"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Grande orador (inspirar temor ou esperança)"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Lábia"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Grande orador (incitar os justos)"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Maestria em perícia"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Grande orador (converter os infiéis)"
      }
    ],
    "features": [
      {
        "name": "Grande Orador (Sob)",
        "text": "Usa a força da oratória sagrada acumulando níveis com bardo para inspirar esperança (+4 Vontade) ou temor (-4 Vontade)."
      },
      {
        "name": "Lábia (Ext)",
        "text": "Realiza testes apressados de Diplomacia com penalidade reduzida para apenas -5."
      },
      {
        "name": "Incitar os Justos (Sob)",
        "text": "No 3º nível, envolve a si e aliados com um manto de chamas divinas que causa dano sagrado."
      },
      {
        "name": "Maestria em Perícia",
        "text": "No 4º nível, escolhe perícias para usar mesmo sob pressão ou perigo extremo."
      },
      {
        "name": "Converter os Infiéis (Sob)",
        "text": "No 5º nível, pode converter magicamente a mentalidade e a lealdade de infiéis e oponentes através da pregação."
      }
    ],
    "description": "Pregadores carismáticos e oradores inflamados que convertem massas inteiras através do poder arrebatador de suas palavras e discursos divinamente inspirados."
  },
  {
    "id": "div-prestige-exorcista-sagrado",
    "name": "Exorcista Sagrado",
    "page": 37,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (os planos) (Int)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Identificar Magia (Int)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer Bom",
      "skills": [
        "7 graduações em Conhecimento (os planos)",
        "10 graduações em Conhecimento (religião)"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias divinas de 4º nível"
      ],
      "special": [
        "Capacidade de expulsar mortos-vivos"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Exorcismo, expulsar mortos-vivos",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Detectar o mal, resistência à possessão",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Adversário eleito +1",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Dissipar o mal 1/semana",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Presença consagrada",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Adversário eleito +2",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Dissipar o mal 2/semana",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "Aura sagrada 1/dia",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "Adversário eleito +3",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Dissipar o mal 3/semana",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Exorcismo (Sob)",
        "text": "Expulsa espíritos possessores e entidades demoníacas de corpos ou objetos com um teste de carisma resistido."
      },
      {
        "name": "Resistência à Possessão (Ext)",
        "text": "+4 de bônus contra magias e habilidades de possessão (como possessão espiritual ou recipiente arcano)."
      },
      {
        "name": "Adversário Eleito (Ext)",
        "text": "Bônus cumulativo contra mortos-vivos e extra-planares malignos em testes de Blefar, Sentir Motivação e dano."
      },
      {
        "name": "Presença Consagrada (Sob)",
        "text": "Emite constantemente uma aura de consagração de 6 m de raio."
      }
    ],
    "description": "Especialistas devotos na erradicação de possessões demoníacas, espíritos imundos e assombrações que corrompem os inocentes e o mundo mortal."
  },
  {
    "id": "div-prestige-fanatico-da-chama-negra",
    "name": "Fanático da Chama Negra",
    "page": 40,
    "hitDie": "d6",
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Abrir Fechaduras (Des)",
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Identificar Magias (Int)",
      "Natação (For)",
      "Observar (Sab)",
      "Ofícios (Int)",
      "Ouvir (Sab)",
      "Prestidigitação (Des)",
      "Procurar (Int)",
      "Profissão (Sab)",
      "Saltar (For)",
      "Usar Cordas (Des)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Bom",
      "skills": [
        "8 graduações em Conhecimento (religião)",
        "8 graduações em Esconder-se",
        "8 graduações em Furtividade"
      ],
      "feats": [
        "Usar Arma Exótica (kukri)",
        "Vontade de Ferro"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 2º nível"
      ],
      "special": [
        "Ataque Furtivo com dano de pelo menos +1d6",
        "O personagem deve venerar o deus da ordem e assassinar um inimigo da fé."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 2,
        "will": 2,
        "special": "Ataque mortal, coração fanático",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 3,
        "will": 3,
        "special": "Usar venenos",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 3,
        "will": 3,
        "special": "Ataque furtivo +1d6",
        "casterProgression": "—"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Passo decisivo",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Ataque furtivo +2d6",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Chama sagrada",
        "casterProgression": "—"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 6,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 6,
        "will": 6,
        "special": "Ataque furtivo +3d6",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 7,
        "will": 7,
        "special": "Imolação profana",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Ataque Mortal (Ext)",
        "text": "Capacidade idêntica ao ataque mortal de um assassino (sem a opção de paralisar)."
      },
      {
        "name": "Coração Fanático (Sob)",
        "text": "Imunidade completa a efeitos de medo normais e mágicos."
      },
      {
        "name": "Passo Decisivo (SM)",
        "text": "No 5º nível, pode teleportar-se como porta dimensional 1/dia."
      },
      {
        "name": "Chama Sagrada (Sob)",
        "text": "No 7º nível imbui sua arma corpo a corpo com chamas negras que causam dano flamejante profano."
      },
      {
        "name": "Imolação Profana (Sob)",
        "text": "No 10º nível, alvos mortos por seu ataque mortal ou furtivo são consumidos por fogo profano, impedindo ressurreição normal."
      }
    ],
    "description": "Assassinos santos e implacáveis pertencentes a ordens secretas de divindades do fogo e da morte, executando alvos hereges com precisão fria e chamas profanas."
  },
  {
    "id": "div-prestige-geomante",
    "name": "Geomante",
    "page": 42,
    "hitDie": "d6",
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Concentração (Con)",
      "Conhecimento (arcano) (Int)",
      "Conhecimento (geografia) (Int)",
      "Conhecimento (natureza) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Escalar (For)",
      "Identificar Magias (Int)",
      "Natação (For)",
      "Ofícios (Int)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "skills": [
        "6 graduações em Conhecimento (arcano)",
        "6 graduações em Conhecimento (natureza)"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias arcanas de 2º nível e magias divinas de 2º nível"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Derivação 1, versatilidade em magia 0",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Derivação 1, linhas de lei +1, versatilidade em magia 1",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Derivação 2, versatilidade em magia 2",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Derivação 2, versatilidade em magia 3",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Derivação 3, versatilidade em magia 4",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Derivação 3, linhas de lei +2, versatilidade em magia 5",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Derivação 4, versatilidade em magia 6",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Derivação 4, versatilidade em magia 7",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Derivação 5, versatilidade em magia 8",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Derivação 5, linhas de lei +3, versatilidade em magia 9",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Versatilidade em Magia",
        "text": "Permite mesclar parâmetros arcanos e divinos, lançando magias arcanas sem chance de falha por armadura ou usando Sabedoria para CD arcana."
      },
      {
        "name": "Derivação (Ext)",
        "text": "Adquire mutações físicas graduais que imitam plantas e animais (garras, escamas, asas, faro, camuflagem)."
      },
      {
        "name": "Linhas de Lei",
        "text": "Aumenta o nível de conjurador efetivo ao conjurar magias em seu terreno natal (+1 a +3)."
      }
    ],
    "description": "Mestres da comunhão entre as energias arcanas e divinas através da própria terra, transformando gradualmente seus próprios corpos com os traços das feras e plantas."
  },
  {
    "id": "div-prestige-hospitalario",
    "name": "Hospitalário",
    "page": 45,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Cavalgar (Des)",
      "Concentração (Con)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Mau",
      "bab": "+5",
      "skills": [
        "5 graduações em Cavalgar",
        "5 graduações em Manusear Animais"
      ],
      "feats": [
        "Ataque Poderoso",
        "Foco em Arma",
        "Trespassar"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível"
      ],
      "special": [
        "Habilidade de cura pelas mãos ou expulsar mortos-vivos"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Cura pelas mãos, expulsar mortos-vivos",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Remover doença 1/semana",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Talento adicional",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Remover doença 2/semana",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Talento adicional",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Remover doença 3/semana",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Talento adicional",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Cura pelas Mãos (Sob)",
        "text": "Cura ferimentos com um toque somando seus níveis de paladino e hospitalário."
      },
      {
        "name": "Expulsar Mortos-Vivos (Sob)",
        "text": "Canaliza energia positiva para expulsar mortos-vivos com usos diários próprios."
      },
      {
        "name": "Remover Doença (SM)",
        "text": "Pode conjurar remover doença até 3 vezes por semana no 9º nível."
      },
      {
        "name": "Talentos Adicionais",
        "text": "Recebe talentos adicionais voltados ao combate nos níveis 5, 7 e 10."
      }
    ],
    "description": "Cavaleiros protetores juramentados com votos de misericórdia e defesa dos indefesos, administrando hospitais de campanha e escoltando peregrinos por terras hostis."
  },
  {
    "id": "div-prestige-inquisidor-da-igreja",
    "name": "Inquisidor da Igreja",
    "page": 47,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Blefar (Car)",
      "Concentração (Con)",
      "Conhecimento (arcano) (Int)",
      "Conhecimento (religião) (Int)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Intimidação (Car)",
      "Obter Informação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "alignment": "Leal e Bom ou Leal e Neutro",
      "skills": [
        "3 graduações em Conhecimento (arcano)",
        "5 graduações em Conhecimento (religião)",
        "5 graduações em Sentir Motivação"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias divinas de 2º nível (incluindo zona da verdade)"
      ],
      "special": [
        "Membro devoto da hierarquia de uma igreja autorizada"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Detectar o mal, domínio da Inquisição",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Imunidade a ilusões",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Força da convicção",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Discernir mentiras",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Perfurar ilusões",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "Visão da verdade",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Imunidade a compulsão",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Domínio da Inquisição",
        "text": "Ganha o domínio da Inquisição (+4 de bônus em testes de dissipar magia)."
      },
      {
        "name": "Imunidade a Ilusões (Ext)",
        "text": "No 2º nível torna-se imune a efeitos ilusórios de padrão e fantasma."
      },
      {
        "name": "Força da Convicção (Sob)",
        "text": "+4 de bônus em testes contra magias de controle mental e encantamento."
      },
      {
        "name": "Discernir Mentiras (SM)",
        "text": "No 5º nível pode usar discernir mentiras à vontade."
      },
      {
        "name": "Visão da Verdade (SM)",
        "text": "No 9º nível pode enxergar através de todas as ilusões e metamorfoses."
      },
      {
        "name": "Imunidade a Compulsão (Ext)",
        "text": "No 10º nível é completamente imune a efeitos mágicos de compulsão."
      }
    ],
    "description": "Investigadores e juízes implacáveis encarregados de purgar a heresia, a corrupção infiltrada e as imposturas mágicas que ameaçam a pureza da fé."
  },
  {
    "id": "div-prestige-lamina-reluzente-de-heironeous",
    "name": "Lâmina Reluzente de Heironeous",
    "page": 50,
    "hitDie": "d10",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Leal e Bom",
      "bab": "+7",
      "skills": [
        "7 graduações em Conhecimento (religião)"
      ],
      "feats": [
        "Foco em Arma (espada longa)"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível"
      ],
      "special": [
        "Devoto de Heironeous"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Lâmina da ordem 1/dia",
        "casterProgression": "—"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Lâmina sagrada 1/dia",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Lâmina da ordem 2/dia",
        "casterProgression": "—"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Lâmina sagrada 2/dia",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Lâmina da ordem 3/dia",
        "casterProgression": "—"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Lâmina sagrada 3/dia",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Lâmina da ordem 4/dia",
        "casterProgression": "—"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Lâmina sagrada 4/dia",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Lâmina da ordem 5/dia",
        "casterProgression": "—"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Lâmina sagrada 5/dia",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Lâmina da Ordem (Sob)",
        "text": "Como ação livre imbui sua espada longa com energia leal causando +1d6 de dano contra criaturas caóticas (+2d6 no 9º nível)."
      },
      {
        "name": "Lâmina Sagrada (Sob)",
        "text": "No 2º nível imbui sua arma com energia sagrada radiante causando +1d6 de dano divino contra criaturas malignas (+2d6 no 10º nível)."
      }
    ],
    "description": "Campeões de honra e retidão marcial sagrada que consagram sua espada longa à causa gloriosa da justiça e da virtude de Heironeous."
  },
  {
    "id": "div-prestige-libertador-sagrado",
    "name": "Libertador Sagrado",
    "page": 52,
    "hitDie": "d10",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Disfarces (Car)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Saltar (For)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "alignment": "Caótico e Bom",
      "bab": "+5",
      "skills": [
        "5 graduações em Diplomacia",
        "5 graduações em Sentir Motivação"
      ],
      "feats": [
        "Vontade de Ferro"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Detectar o mal, destruir o mal 1/dia",
        "spellsPerDay": [
          0
        ]
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Graça divina, imunidade a encantamento",
        "spellsPerDay": [
          1
        ]
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Cura pelas mãos",
        "spellsPerDay": [
          1,
          0
        ]
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Companheiro celestial",
        "spellsPerDay": [
          1,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Destruir o mal 2/dia",
        "spellsPerDay": [
          1,
          1,
          0
        ]
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Aura de determinação",
        "spellsPerDay": [
          1,
          1,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "—",
        "spellsPerDay": [
          2,
          1,
          1,
          0
        ]
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "—",
        "spellsPerDay": [
          2,
          1,
          1,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "—",
        "spellsPerDay": [
          2,
          2,
          1,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Destruir o mal 3/dia",
        "spellsPerDay": [
          2,
          2,
          2,
          1
        ]
      }
    ],
    "features": [
      {
        "name": "Destruir o Mal (Sob)",
        "text": "Adiciona o Carisma ao ataque e o nível de classe ao dano contra alvos malignos."
      },
      {
        "name": "Graça Divina (Sob)",
        "text": "Soma o bônus de Carisma em todos os testes de resistência."
      },
      {
        "name": "Companheiro Celestial (Sob)",
        "text": "No 4º nível invoca um companheiro celestial fiel similar à montaria de paladino."
      },
      {
        "name": "Aura de Determinação (Sob)",
        "text": "Concede bônus contra compulsões a si e a aliados a até 3 m."
      }
    ],
    "spellList": [
      {
        "level": 1,
        "spells": [
          "arma abençoada",
          "bênção",
          "curar ferimentos leves",
          "detectar venenos",
          "favor divino",
          "proteção contra o mal",
          "remover medo"
        ]
      },
      {
        "level": 2,
        "spells": [
          "curar ferimentos moderados",
          "força do touro",
          "graça do gato",
          "resistência a energia",
          "retardar envenenamento"
        ]
      },
      {
        "level": 3,
        "spells": [
          "círculo mágico contra o mal",
          "curar ferimentos graves",
          "dissipar magia",
          "oração",
          "remover cegueira/surdez"
        ]
      },
      {
        "level": 4,
        "spells": [
          "arma sagrada",
          "curar ferimentos críticos",
          "liberdade de movimentos",
          "neutralizar venenos"
        ]
      }
    ],
    "description": "Guerreiros sagrados dedicados à liberdade absoluta e à derrubada da tirania, combinando o código generoso do bem com a audácia rebelde do caos."
  },
  {
    "id": "div-prestige-oraculo-divino",
    "name": "Oráculo Divino",
    "page": 55,
    "hitDie": "d6",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Identificar Magia (Int)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "skills": [
        "8 graduações em Conhecimento (religião)"
      ],
      "feats": [
        "Foco em Magia (Adivinhação)"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Domínio do Oráculo, vidência aprimorada",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Esquiva sobrenatural",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "Evasão",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Esquiva sobrenatural aprimorada",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Mente desobstruída",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Domínio do Oráculo",
        "text": "Ganha o domínio do Oráculo conjurando magias de adivinhação com +2 níveis efetivos de conjurador."
      },
      {
        "name": "Vidência Aprimorada (Sob)",
        "text": "+1 de bônus na CD e testes de resistência relacionados a magias de vidência."
      },
      {
        "name": "Esquiva Sobrenatural (Ext)",
        "text": "Retém o bônus de Destreza na CA mesmo surpreso, e no 6º nível não pode ser flanqueado."
      },
      {
        "name": "Mente Desobstruída (Sob)",
        "text": "No 10º nível é protegido contra detecção mental, vidência e efeitos de mente como a magia mente em branco."
      }
    ],
    "description": "Videntes e profetas sagrados que vislumbram as correntes do destino e do futuro através da comunhão constante com a sabedoria cósmica de suas divindades."
  },
  {
    "id": "div-prestige-peregrino-da-ilha-das-brumas",
    "name": "Peregrino da Ilha das Brumas",
    "page": 57,
    "hitDie": "d8",
    "skillPoints": "6 + modificador de Int",
    "classSkills": [
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Natação (For)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Procurar (Int)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Mau",
      "skills": [
        "8 graduações em Sobrevivência",
        "4 graduações em Conhecimento (religião)"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias divinas de 2º nível"
      ],
      "special": [
        "Raça: Elfo ou Meio-Elfo"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 2,
        "will": 2,
        "special": "Domínio adicional (Viagem)",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 3,
        "will": 3,
        "special": "Passo seguro",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 3,
        "will": 3,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Camuflagem",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Domínio adicional (Magia)",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 6,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 6,
        "will": 6,
        "special": "Mimetismo",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 7,
        "will": 7,
        "special": "—",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Domínios Adicionais",
        "text": "Adquire acesso ao domínio da Viagem no 1º nível e da Magia no 7º nível."
      },
      {
        "name": "Passo Seguro (Ext)",
        "text": "Ignora penalidades de terreno difícil em florestas e pântanos."
      },
      {
        "name": "Camuflagem (Ext)",
        "text": "Usa a perícia Esconder-se em qualquer terreno natural mesmo sem cobertura."
      },
      {
        "name": "Mimetismo (Sob)",
        "text": "No 9º nível pode se esconder mesmo sob observação direta em terreno natural."
      }
    ],
    "description": "Batedores e exploradores élficos de elite em busca da lendária e esquecida Ilha das Brumas, combinando furtividade silvestre e magia divina ancestral."
  },
  {
    "id": "div-prestige-perseguidor-consagrado",
    "name": "Perseguidor Consagrado",
    "page": 59,
    "hitDie": "d10",
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Disfarces (Car)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Natação (For)",
      "Obter Informação (Car)",
      "Observar (Sab)",
      "Ofícios (Int)",
      "Ouvir (Sab)",
      "Procurar (Int)",
      "Profissão (Sab)",
      "Saltar (For)",
      "Sentir Motivação (Sab)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer Leal",
      "bab": "+5",
      "skills": [
        "5 graduações em Disfarces",
        "5 graduações em Obter Informação"
      ],
      "feats": [
        "Rastrear"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Presa escolhida, bênção da santidade",
        "spellsPerDay": [
          0
        ]
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "—",
        "spellsPerDay": [
          1
        ]
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Localizar presa",
        "spellsPerDay": [
          1,
          0
        ]
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "—",
        "spellsPerDay": [
          1,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Foco inabalável",
        "spellsPerDay": [
          1,
          1,
          0
        ]
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "—",
        "spellsPerDay": [
          1,
          1,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "—",
        "spellsPerDay": [
          2,
          1,
          1,
          0
        ]
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "—",
        "spellsPerDay": [
          2,
          1,
          1,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "—",
        "spellsPerDay": [
          2,
          2,
          1,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Captura infalível",
        "spellsPerDay": [
          2,
          2,
          2,
          1
        ]
      }
    ],
    "features": [
      {
        "name": "Presa Escolhida (Sob)",
        "text": "Recebe bônus em testes de Sobrevivência, Observar e dano contra um fugitivo designado por sua ordem."
      },
      {
        "name": "Localizar Presa (SM)",
        "text": "No 3º nível pode localizar a presa como a magia localizar criatura."
      },
      {
        "name": "Foco Inabalável (Sob)",
        "text": "No 5º nível adquire imunidade a magias que tentem desviá-lo de sua perseguição."
      }
    ],
    "spellList": [
      {
        "level": 1,
        "spells": [
          "alarme",
          "calmante",
          "detectar caos/mal",
          "passos sem pegadas",
          "visão na penumbra"
        ]
      },
      {
        "level": 2,
        "spells": [
          "imobilizar pessoa",
          "marca da justiça menor",
          "silêncio",
          "zona da verdade"
        ]
      },
      {
        "level": 3,
        "spells": [
          "dissipar magia",
          "localizar criatura",
          "rogar maldição"
        ]
      },
      {
        "level": 4,
        "spells": [
          "âncora dimensional",
          "liberdade de movimentos",
          "vigilância sagrada"
        ]
      }
    ],
    "description": "Caçadores de recompensas eclesiásticos e agentes da lei divina incumbidos de rastrear e recapturar hereges foragidos até os confins da terra."
  },
  {
    "id": "div-prestige-punho-sagrado",
    "name": "Punho Sagrado",
    "page": 61,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Concentração (Con)",
      "Cura (Sab)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Identificar Magia (Int)",
      "Natação (For)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+4",
      "skills": [],
      "feats": [
        "Ataque Desarmado Aprimorado",
        "Esquiva",
        "Mobilidade",
        "Estilo de Combate Desarmado"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 2,
        "will": 0,
        "special": "Dano desarmado, CA de monge",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 3,
        "will": 0,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 3,
        "will": 1,
        "special": "Movimento rápido +3 m",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Chamas sagradas 1/dia",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Movimento rápido +6 m",
        "casterProgression": "—"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 6,
        "will": 2,
        "special": "Chamas sagradas 2/dia",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 6,
        "will": 3,
        "special": "Movimento rápido +9 m",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 7,
        "will": 3,
        "special": "Armadura interior",
        "casterProgression": "—"
      }
    ],
    "features": [
      {
        "name": "Dano Desarmado e CA de Monge",
        "text": "Seus níveis de punho sagrado acumulam-se com os de monge para determinar dano desarmado e bônus na CA."
      },
      {
        "name": "Chamas Sagradas (Sob)",
        "text": "Invoca fogo sagrado em seus golpes desarmados causando dano extra por rodada."
      },
      {
        "name": "Armadura Interior (Sob)",
        "text": "No 10º nível pode canalizar seu poder interior ganhando +4 na CA e RM 25 por 1 rodada/nível."
      }
    ],
    "description": "Monges ascetas e guerreiros desarmados que transformam o próprio corpo em uma arma sagrada pura, repelindo o uso de armas e armaduras de metal."
  },
  {
    "id": "div-prestige-sacerdote-ur",
    "name": "Sacerdote Ur",
    "page": 64,
    "hitDie": "d6",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Blefar (Car)",
      "Concentração (Con)",
      "Conhecimento (arcano) (Int)",
      "Conhecimento (os planos) (Int)",
      "Conhecimento (religião) (Int)",
      "Identificar Magia (Int)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer Mau",
      "skills": [
        "6 graduações em Blefar",
        "5 graduações em Conhecimento (arcano)",
        "5 graduações em Conhecimento (os planos)",
        "8 graduações em Conhecimento (religião)",
        "8 graduações em Identificar Magia"
      ],
      "feats": [
        "Fortitude Maior",
        "Vontade de Ferro"
      ],
      "special": [
        "Não pode adorar nenhuma divindade (rouba magias dos deuses)"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Roubar poder mágico",
        "spellsPerDay": [
          2,
          1
        ]
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "Resistência a magias divinas +2",
        "spellsPerDay": [
          3,
          2,
          1
        ]
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Resistência a magias divinas +4",
        "spellsPerDay": [
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Drenar itens divinos",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "—",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Sugar magia de conjurador",
        "spellsPerDay": [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          2
        ]
      }
    ],
    "features": [
      {
        "name": "Roubar Poder Mágico",
        "text": "Conjura magias da lista de clérigo de 1º a 9º círculo em 10 níveis sem adorar nenhum deus, usurpando energia divina."
      },
      {
        "name": "Resistência a Magias Divinas (Sob)",
        "text": "Bônus sagrado/profano em testes de resistência contra magias divinas."
      },
      {
        "name": "Drenar Itens Divinos (Sob)",
        "text": "No 6º nível pode absorver cargas de itens mágicos divinos para recuperar magias."
      },
      {
        "name": "Sugar Magia de Conjurador (Sob)",
        "text": "No 10º nível pode drenar as magias preparadas ou slots de um conjurador divino tocado."
      }
    ],
    "description": "Hereges sacrílegos e mestres da profanação que desprezam todos os deuses, usurpando e roubando o poder divino diretamente dos céus através da pura força de vontade."
  },
  {
    "id": "div-prestige-saqueador-de-templos-de-olidammara",
    "name": "Saqueador de Templos de Olidammara",
    "page": 66,
    "hitDie": "d6",
    "skillPoints": "6 + modificador de Int",
    "classSkills": [
      "Abrir Fechaduras (Des)",
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Avaliação (Int)",
      "Blefar (Car)",
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Desarmar Dispositivo (Int)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Identificar Magia (Int)",
      "Observar (Sab)",
      "Ofícios (Int)",
      "Ouvir (Sab)",
      "Prestidigitação (Des)",
      "Procurar (Int)",
      "Profissão (Sab)",
      "Saltar (For)",
      "Sentir Motivação (Sab)",
      "Usar Cordas (Des)"
    ],
    "requirements": {
      "alignment": "Qualquer Caótico",
      "bab": "+5",
      "skills": [
        "4 graduações em Abrir Fechaduras",
        "4 graduações em Desarmar Dispositivo",
        "4 graduações em Procurar",
        "8 graduações em Esconder-se",
        "8 graduações em Furtividade"
      ],
      "feats": [
        "Esquiva",
        "Mobilidade"
      ],
      "special": [
        "Devoto de Olidammara"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 2,
        "will": 0,
        "special": "Ataque furtivo +1d6, sentido de armadilhas",
        "spellsPerDay": [
          0
        ]
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 3,
        "will": 0,
        "special": "Sorte de Olidammara",
        "spellsPerDay": [
          1
        ]
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 3,
        "will": 1,
        "special": "Sentido de armadilhas +1",
        "spellsPerDay": [
          1,
          0
        ]
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Ataque furtivo +2d6",
        "spellsPerDay": [
          1,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "—",
        "spellsPerDay": [
          1,
          1,
          0
        ]
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Sentido de armadilhas +2",
        "spellsPerDay": [
          1,
          1,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Ataque furtivo +3d6",
        "spellsPerDay": [
          2,
          1,
          1,
          0
        ]
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 6,
        "will": 2,
        "special": "Esquiva sobrenatural aprimorada",
        "spellsPerDay": [
          2,
          1,
          1,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 6,
        "will": 3,
        "special": "Sentido de armadilhas +3",
        "spellsPerDay": [
          2,
          2,
          1,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 7,
        "will": 3,
        "special": "Ataque furtivo +4d6",
        "spellsPerDay": [
          2,
          2,
          2,
          1
        ]
      }
    ],
    "features": [
      {
        "name": "Ataque Furtivo (Ext)",
        "text": "Dano adicional furtivo cumulativo de até +4d6 no 10º nível."
      },
      {
        "name": "Sorte de Olidammara (Sob)",
        "text": "Pode refazer um teste de resistência ou jogada de ataque 1/dia."
      },
      {
        "name": "Sentido de Armadilhas (Ext)",
        "text": "Bônus nos testes de resistência e CA contra armadilhas de templos e catacumbas."
      }
    ],
    "spellList": [
      {
        "level": 1,
        "spells": [
          "curar ferimentos leves",
          "detectar armadilhas",
          "escuridão",
          "passos sem pegadas",
          "salto"
        ]
      },
      {
        "level": 2,
        "spells": [
          "arrombar",
          "escuridão profunda",
          "invisibilidade",
          "levitação",
          "silêncio"
        ]
      },
      {
        "level": 3,
        "spells": [
          "dissipar magia",
          "localizar objeto",
          "névoa fétida",
          "não-detecção"
        ]
      },
      {
        "level": 4,
        "spells": [
          "liberdade de movimentos",
          "porta dimensional",
          "veneno"
        ]
      }
    ],
    "description": "Ladrões devotos do deus dos trapaceiros especializados em invadir santuários proibidos, desarmar proteções arcanas e pilhar tesouros eclesiásticos."
  },
  {
    "id": "div-prestige-senhor-das-tempestades",
    "name": "Senhor das Tempestades",
    "page": 69,
    "hitDie": "d8",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (natureza) (Int)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Identificar Magia (Int)",
      "Natação (For)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Bom",
      "bab": "+4",
      "skills": [],
      "feats": [
        "Fortitude Maior",
        "Foco em Arma (dardo ou lança)"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 3º nível"
      ],
      "special": [
        "Devoto de Talos (ou deus patrono das tempestades)"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Resistência a eletricidade 5, dardo/lança de choque",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Lança retornante",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Andar nas nuvens",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Resistência a eletricidade 10",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Dardo/lança explosão de choque",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Imunidade a tempestades",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Resistência a eletricidade 15",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Dardo/lança trovão",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Imunidade a eletricidade",
        "casterProgression": "+1 nível de classe divina anterior"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Senhor do clima",
        "casterProgression": "+1 nível de classe divina anterior"
      }
    ],
    "features": [
      {
        "name": "Dardo/Lança de Choque (Sob)",
        "text": "Qualquer dardo ou lança arremessada adquire a propriedade de choque (+1d6 de eletricidade), tornando-se explosão de choque e trovão nos níveis seguintes."
      },
      {
        "name": "Andar nas Nuvens (Sob)",
        "text": "Pode caminhar sobre nuvens, névoa e ar como se fossem terra sólida."
      },
      {
        "name": "Senhor do Clima (SM)",
        "text": "No 10º nível pode invocar tempestades colossais como controlar o clima e tempestade da vingança."
      }
    ],
    "description": "Fanáticos dos trovões e vendavais que comandam o clima selvagem e arremessam lanças de eletricidade crepitante consagradas a Talos."
  },
  {
    "id": "div-prestige-servical-do-arco-iris",
    "name": "Serviçal do Arco-Íris",
    "page": 70,
    "hitDie": "d4",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (arcano) (Int)",
      "Conhecimento (os planos) (Int)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "alignment": "Qualquer uma, exceto Mau",
      "skills": [
        "4 graduações em Conhecimento (arcano)"
      ],
      "feats": [],
      "spells": [
        "Capacidade de conjurar magias arcanas de 3º nível"
      ],
      "special": [
        "Encontrar a cidade secreta dos couatls"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 0,
        "will": 2,
        "special": "Detectar o mal, domínio do Bem",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 0,
        "will": 3,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 1,
        "ref": 1,
        "will": 3,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "Domínio do Ar",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 1,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Asas do arco-íris (vôo 18 m)",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 2,
        "ref": 2,
        "will": 5,
        "special": "Domínio da Lei",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 2,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 3,
        "ref": 3,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 3,
        "ref": 3,
        "will": 7,
        "special": "Conjuração divina irrestrita",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Domínios Concedidos",
        "text": "Ganha os domínios do Bem (1º), Ar (4º) e Lei (7º) adicionados à sua conjuração."
      },
      {
        "name": "Asas do Arco-Íris (Sob)",
        "text": "No 6º nível brota asas de penas multicoloridas que concedem vôo 18 m (bom)."
      },
      {
        "name": "Conjuração Divina Irrestrita",
        "text": "No 10º nível pode aprender e conjurar qualquer magia da lista inteira do clérigo como magia arcana."
      }
    ],
    "description": "Campeões místicos juramentados aos benevolentes couatls da selva tropical, unindo a alta magia arcana ao acesso ilimitado a todos os milagres divinos."
  },
  {
    "id": "div-prestige-servo-radiante-de-pelor",
    "name": "Servo Radiante de Pelor",
    "page": 73,
    "hitDie": "d6",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "alignment": "Neutro e Bom",
      "skills": [
        "5 graduações em Cura",
        "9 graduações em Conhecimento (religião)"
      ],
      "feats": [
        "Expulsão Adicional"
      ],
      "spells": [
        "Capacidade de conjurar magias divinas de 1º nível com acesso ao domínio do Sol"
      ],
      "special": [
        "Devoto de Pelor"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Expulsão aprimorada, domínio da Glória, radiância",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Cura ampliada",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Aura de coragem",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Bênção da cura",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Cura potencializada",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "—",
        "casterProgression": "+1 nível de classe anterior"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Cura maximizada",
        "casterProgression": "+1 nível de classe anterior"
      }
    ],
    "features": [
      {
        "name": "Expulsão Aprimorada",
        "text": "Adiciona o nível de classe aos testes de expulsão de mortos-vivos e ganha o domínio da Glória."
      },
      {
        "name": "Radiância (Sob)",
        "text": "Suas magias de luz iluminam o dobro da área normal."
      },
      {
        "name": "Cura Ampliada/Potencializada/Maximizada",
        "text": "Aplica automaticamente talentos de metamagia às suas magias de cura sem custo de círculos superiores."
      }
    ],
    "description": "A personificação da luz solar acolhedora e purificadora de Pelor, aniquilando hordas de mortos-vivos e realizando curas milagrosas incomparáveis."
  },
  {
    "id": "div-prestige-templario-piedoso",
    "name": "Templário Piedoso",
    "page": 75,
    "hitDie": "d10",
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Natação (For)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "4 graduações em Conhecimento (religião)"
      ],
      "feats": [
        "Foco em Arma (na arma predileta da divindade)",
        "Golpe Verdadeiro"
      ],
      "special": [
        "Devoto de uma divindade patrona"
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Bênção da santidade, golpe destruidor 1/dia",
        "spellsPerDay": [
          0
        ]
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Talento adicional",
        "spellsPerDay": [
          1
        ]
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Evasão",
        "spellsPerDay": [
          1,
          0
        ]
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Golpe destruidor 2/dia",
        "spellsPerDay": [
          1,
          1
        ]
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Talento adicional",
        "spellsPerDay": [
          1,
          1,
          0
        ]
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Redução de dano 1/—",
        "spellsPerDay": [
          1,
          1,
          1
        ]
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Golpe destruidor 3/dia",
        "spellsPerDay": [
          2,
          1,
          1,
          0
        ]
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Talento adicional",
        "spellsPerDay": [
          2,
          1,
          1,
          1
        ]
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Redução de dano 2/—",
        "spellsPerDay": [
          2,
          2,
          1,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Golpe destruidor 4/dia",
        "spellsPerDay": [
          2,
          2,
          2,
          1
        ]
      }
    ],
    "features": [
      {
        "name": "Bênção da Santidade (Sob)",
        "text": "+1 de bônus nos testes de resistência contra magias e habilidades da tendência oposta da sua divindade."
      },
      {
        "name": "Golpe Destruidor (Sob)",
        "text": "Adiciona o Carisma ao ataque e o nível de classe ao dano em armas prediletas."
      },
      {
        "name": "Redução de Dano (Ext)",
        "text": "Ganha RD 1/— no 6º nível e RD 2/— no 9º nível."
      }
    ],
    "spellList": [
      {
        "level": 1,
        "spells": [
          "arma mágica",
          "auxílio divino",
          "bênção",
          "curar ferimentos leves",
          "escudo da fé",
          "favor divino",
          "proteção contra o mal/caos/bem/lei"
        ]
      },
      {
        "level": 2,
        "spells": [
          "arma espiritual",
          "curar ferimentos moderados",
          "força do touro",
          "resistência a energia"
        ]
      },
      {
        "level": 3,
        "spells": [
          "arma mágica maior",
          "curar ferimentos graves",
          "dissipar magia",
          "oração"
        ]
      },
      {
        "level": 4,
        "spells": [
          "curar ferimentos críticos",
          "imunidade a magia",
          "poder divino"
        ]
      }
    ],
    "description": "Guerreiros de elite blindados que juram proteger templos sagrados e locais santos de sua fé até a morte, combinando perícia com armas e bênçãos protetoras."
  }
];
