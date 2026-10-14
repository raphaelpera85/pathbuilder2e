/**
 * D&D 3.5 — O Livro Completo do Divino (ed. Devir Brasil, 2006/2007), Capítulo 2: Classes de Prestígio (pp. 19-76).
 * Todas as classes de prestígio oficiais catalogadas sob o ruleset 'v35-div'.
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
    id: "div-prestige-contemplativo",
    name: "Contemplativo",
    page: 21,
    hitDie: "d6",
    skillPoints: "2 + modificador de Int",
    classSkills: [
      "Concentração (Con)",
      "Conhecimento (religião) (Int)",
      "Cura (Sab)",
      "Diplomacia (Car)",
      "Identificar Magia (Int)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Sentir Motivação (Sab)",
    ],
    requirements: {
      skills: ["13 graduações em Conhecimento (religião)"],
      feats: [],
      spells: ["Capacidade de conjurar magias divinas de 1º nível"],
      special: [
        "O personagem deve ter mantido um contato direto com sua divindade ou um servo enviado por ela, ou com seres superiores que incorporem os princípios de sua tendência.",
      ],
    },
    levels: [
      { level: 1, bab: "+0", fort: 0, ref: 0, will: 2, special: "Domínio adicional, saúde divina", casterProgression: "+1 nível de classe divina anterior" },
      { level: 2, bab: "+1", fort: 0, ref: 0, will: 3, special: "Mente escorregadia", casterProgression: "+1 nível de classe divina anterior" },
      { level: 3, bab: "+1", fort: 1, ref: 1, will: 3, special: "Integridade divina", casterProgression: "+1 nível de classe divina anterior" },
      { level: 4, bab: "+2", fort: 1, ref: 1, will: 4, special: "—", casterProgression: "+1 nível de classe divina anterior" },
      { level: 5, bab: "+2", fort: 1, ref: 1, will: 4, special: "Corpo divino", casterProgression: "+1 nível de classe divina anterior" },
      { level: 6, bab: "+3", fort: 2, ref: 2, will: 5, special: "Domínio adicional", casterProgression: "+1 nível de classe divina anterior" },
      { level: 7, bab: "+3", fort: 2, ref: 2, will: 5, special: "Alma divina", casterProgression: "+1 nível de classe divina anterior" },
      { level: 8, bab: "+4", fort: 2, ref: 2, will: 6, special: "—", casterProgression: "+1 nível de classe divina anterior" },
      { level: 9, bab: "+4", fort: 3, ref: 3, will: 6, special: "Corpo eterno", casterProgression: "+1 nível de classe divina anterior" },
      { level: 10, bab: "+5", fort: 3, ref: 3, will: 7, special: "União mística", casterProgression: "+1 nível de classe divina anterior" },
    ],
    features: [
      {
        name: "Domínio Adicional",
        text: "Quando seleciona a classe de contemplativo, e novamente no 6º nível, o personagem adquire acesso a um domínio adicional à sua escolha. É possível selecionar qualquer domínio disponível para sua divindade. O personagem recebe o poder concedido do domínio escolhido e é capaz de conjurar as magias indicadas como suas magias de domínio diárias.",
      },
      {
        name: "Saúde Divina (Ext)",
        text: "Um contemplativo é imune a todas as doenças, inclusive de origem mágica, como podridão da múmia e licantropia.",
      },
      {
        name: "Mente Escorregadia (Ext)",
        text: "No 2º nível, adquire a habilidade de ignorar efeitos mágicos capazes de controlá-lo ou forçá-lo a executar uma ação. Quando afetado por encantamento e fracassar no teste de resistência, tem uma segunda chance de resistir 1 rodada depois com a mesma CD.",
      },
      {
        name: "Integridade Divina (Sob)",
        text: "Ao 3º nível, o contemplativo pode curar seus próprios ferimentos. Ele é capaz de recuperar uma quantidade de pontos de vida por dia equivalente ao dobro de seu nível de classe de prestígio, podendo dividir o efeito em várias utilizações diárias.",
      },
      {
        name: "Corpo Divino (Sob)",
        text: "A partir do 5º nível, o contemplativo se torna imune a qualquer tipo de veneno.",
      },
      {
        name: "Alma Divina (Sob)",
        text: "No 7º nível, o contemplativo adquire Resistência à Magia equivalente ao seu nível de classe + 15.",
      },
      {
        name: "Corpo Eterno (Ext)",
        text: "Depois de atingir o 9º nível, não sofre mais penalidades nos atributos físicos devido à idade e não pode ser envelhecido magicamente. Bônus por idade continuam sendo acumulados normalmente.",
      },
      {
        name: "União Mística (Sob)",
        text: "Ao atingir o 10º nível, o contemplativo se torna uma criatura mágica. Passa a ser tratado como um extra-planar (nativo) em vez de humanóide para fins de magias e efeitos mágicos. Além disso, adquire Redução de Dano 10/mágico.",
      },
    ],
    description: "Dedicados a alcançar a comunhão máxima com sua divindade através de meditação profunda e ascese, os contemplativos purificam corpo e mente, tornando-se canais vivos do poder divino no mundo mortal.",
  },
  {
    id: "div-prestige-corruptor",
    name: "Corruptor",
    page: 23,
    hitDie: "d8",
    skillPoints: "4 + modificador de Int",
    classSkills: [
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
      "Sobrevivência (Sab)",
    ],
    requirements: {
      alignment: "Qualquer uma, exceto Bom",
      bab: "+4",
      skills: [],
      feats: [],
      special: [
        "O personagem deve ser um ex-druida, anteriormente capaz de conjurar magias de 3º nível.",
      ],
    },
    levels: [
      { level: 1, bab: "+0", fort: 2, ref: 0, will: 2, special: "Desmatamento, sustento", spellsPerDay: [0, 1] },
      { level: 2, bab: "+1", fort: 3, ref: 0, will: 3, special: "Fogo devastador", spellsPerDay: [1, 2, 0] },
      { level: 3, bab: "+2", fort: 3, ref: 1, will: 3, special: "Forma selvagem de mortos-vivos 1/dia", spellsPerDay: [2, 3, 1, 0] },
      { level: 4, bab: "+3", fort: 4, ref: 1, will: 4, special: "Falar com animais mortos, forma selvagem 2/dia", spellsPerDay: [3, 4, 2, 1, 0] },
      { level: 5, bab: "+3", fort: 4, ref: 1, will: 4, special: "Toque da praga 1/dia, forma selvagem (Grande)", spellsPerDay: [3, 4, 3, 2, 1, 0] },
      { level: 6, bab: "+4", fort: 5, ref: 2, will: 5, special: "Criar animais mortos-vivos, forma selvagem 3/dia", spellsPerDay: [3, 4, 3, 3, 2, 1, 0] },
      { level: 7, bab: "+5", fort: 5, ref: 2, will: 5, special: "Toque da praga 2/dia, forma selvagem (Incorpóreo)", spellsPerDay: [3, 4, 4, 3, 3, 2, 1, 0] },
      { level: 8, bab: "+6", fort: 6, ref: 2, will: 6, special: "Desvincular, forma selvagem 4/dia", spellsPerDay: [3, 4, 4, 4, 3, 3, 2, 1] },
      { level: 9, bab: "+6", fort: 6, ref: 3, will: 6, special: "Toque da praga 3/dia, forma selvagem (Enorme)", spellsPerDay: [3, 4, 4, 4, 4, 3, 3, 2] },
      { level: 10, bab: "+7", fort: 7, ref: 3, will: 7, special: "Peste, forma selvagem 5/dia", spellsPerDay: [3, 4, 4, 4, 4, 4, 3, 3] },
    ],
    features: [
      {
        name: "Desmatamento (SM)",
        text: "Uma vez por dia, o corruptor pode matar toda a vida vegetal que não possua consciência num raio de 6 m por nível de classe de prestígio, como ação de rodada completa. É através do desmatamento que obtém seu suprimento diário de magias.",
      },
      {
        name: "Fogo Devastador (Sob)",
        text: "A partir do 2º nível, como ação padrão, libera uma rajada tórrida de fogo que causa 5d6 pontos de dano a todas as criaturas num raio de 3 m (Reflexos metade, CD 10 + nível da classe + mod Sab) e incendeia objetos inflamáveis.",
      },
      {
        name: "Sustento (Ext)",
        text: "No 1º nível, não precisa mais de água ou comida para sobreviver.",
      },
      {
        name: "Forma Selvagem de Mortos-Vivos (SM)",
        text: "No 3º nível, pode adotar a forma de animais mortos-vivos (esqueleto) com bônus de armadura natural, +2 de Destreza, imunidade a frio e RD 5/concussão. Conforme avança nos níveis, adquire formas Grandes (5º nível), Incorpóreas (7º nível) e Enormes (9º nível), até 5 vezes ao dia no 10º nível.",
      },
      {
        name: "Falar com Animais Mortos (SM)",
        text: "A partir do 4º nível, pode falar com animais mortos 1/dia como se conjurasse falar com os mortos usando seus níveis somados de druida e corruptor.",
      },
      {
        name: "Toque da Praga (Sob)",
        text: "No 5º nível, pode produzir o efeito de contágio 1/dia (2/dia no 7º nível, 3/dia no 9º nível).",
      },
      {
        name: "Criar Animais Mortos-Vivos (SM)",
        text: "No 6º nível, funciona como a magia criar mortos-vivos, mas afeta somente cadáveres de animais, sem componentes materiais, 1/dia.",
      },
      {
        name: "Desvincular (SM)",
        text: "A partir do 8º nível, uma vez por dia pode neutralizar temporariamente o elo entre um animal ou besta mágica (companheiro animal, familiar, montaria) e seu mestre num raio de 12 m (Vontade CD 10 + nível + mod Sab anula).",
      },
      {
        name: "Peste (Sob)",
        text: "No 10º nível, espalha doenças num raio de 6 m afetando todos os alvos selecionados com o efeito de contágio sem necessidade de toque, 1 vez ao dia.",
      },
    ],
    spellList: [
      { level: 0, spells: ["brilho", "detectar venenos", "ler magias", "som fantasma", "virtude", "respeito menor"] },
      { level: 1, spells: ["amaldiçoar água", "destruição de sementes", "névoa obscurecente", "raio do enfraquecimento", "suportar elementos"] },
      { level: 2, spells: ["chama contínua", "escuridão", "esfera de fogo", "esquentar metal", "névoa densa", "torcer madeira"] },
      { level: 3, spells: ["dissipar magia", "envenenamento", "falar com plantas", "murchar", "profanar", "praga de insetos menor"] },
      { level: 4, spells: ["anti-vida", "assassino fantasmagórico", "enferrujar", "tempestade de chamas menor"] },
      { level: 5, spells: ["praga de insetos", "matar", "muralha de fogo", "ondas de fadiga"] },
      { level: 6, spells: ["criar mortos-vivos", "desintegrar", "dissipar magia maior", "muralha de espinhos profana"] },
      { level: 7, spells: ["controlar o clima", "onda de choque de fogo", "terremoto"] },
      { level: 8, spells: ["drenar energia temporária", "evaporação", "praga de gafanhotos"] },
      { level: 9, spells: ["tempestade de vingança", "implosão", "palavra da morte"] },
    ],
    description: "Quando um druida se rebela amargamente contra a natureza, o elo se rompe e alguns abraçam a destruição total da terra, extraindo poder mágico através da aniquilação violenta e desmatamento de florestas verdejantes.",
  },
];
