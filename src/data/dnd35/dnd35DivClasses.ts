/**
 * D&D 3.5 — O Livro Completo do Divino (Complete Divine, ed. Devir Brasil, 2006/2007)
 * Capítulo 1: Os Devotos — Classes Básicas (pp. 5–18):
 * - Privilegiado (Favored Soul), pp. 6–10
 * - Shugenja (Shugenja), pp. 10–14
 * - Xamã Espiritual (Spirit Shaman), pp. 14–18
 *
 * Ruleset: "v35-div"
 */

export interface Dnd35DivClassLevel {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
  spellsPerDay?: (number | null)[];
  spellsKnown?: (number | null)[];
  spellsRetrieved?: (number | null)[];
}

export interface Dnd35DivFeature {
  name: string;
  text: string;
}

export interface Dnd35DivStarterSkill {
  skill: string;
  ranks: number;
  ability: string;
  armorPenalty?: string;
}

export interface Dnd35DivStarterPackage {
  label: string;
  armor: string;
  shield?: string;
  weapons: string[];
  skillSelection: string;
  skills: Dnd35DivStarterSkill[];
  feat: string;
  bonusFeat?: string;
  deity?: string;
  spellsKnown?: string[];
  equipment: string;
  gold: string;
}

export interface Dnd35DivBaseClass {
  id: string;
  name: string;
  nameEn: string;
  page: number;
  hitDie: string;
  alignment: string;
  skillPointsFirstLevel: string;
  skillPointsPerLevel: string;
  classSkills: string[];
  startingGold: string;
  levels: Dnd35DivClassLevel[];
  features: Dnd35DivFeature[];
  description: string;
  starterPackage?: Dnd35DivStarterPackage;
}

export const DND35_DIV_PRIVILEGIADO: Dnd35DivBaseClass = {
  id: "div-privilegiado",
  name: "Privilegiado",
  nameEn: "Favored Soul",
  page: 6,
  hitDie: "d8",
  alignment: "Qualquer uma (geralmente idêntica ou a um passo de sua divindade).",
  skillPointsFirstLevel: "(2 + modificador de Int) × 4",
  skillPointsPerLevel: "2 + modificador de Int",
  classSkills: [
    "Concentração (Con)",
    "Conhecimento (arcano) (Int)",
    "Cura (Sab)",
    "Diplomacia (Car)",
    "Identificar Magia (Int)",
    "Ofícios (Int)",
    "Profissão (Sab)",
    "Sentir Motivação (Sab)",
  ],
  startingGold: "5d4 × 10 PO (média 125 PO)",
  levels: [
    { level: 1, bab: "+0", fort: 2, ref: 2, will: 2, special: "—", spellsPerDay: [5, 3], spellsKnown: [4, 3] },
    { level: 2, bab: "+1", fort: 3, ref: 3, will: 3, special: "—", spellsPerDay: [6, 4], spellsKnown: [5, 3] },
    { level: 3, bab: "+2", fort: 3, ref: 3, will: 3, special: "Foco em arma divina", spellsPerDay: [6, 5], spellsKnown: [5, 4] },
    { level: 4, bab: "+3", fort: 4, ref: 4, will: 4, special: "—", spellsPerDay: [6, 6, 3], spellsKnown: [6, 4, 3] },
    { level: 5, bab: "+3", fort: 4, ref: 4, will: 4, special: "Resistência à energia (1º tipo)", spellsPerDay: [6, 6, 4], spellsKnown: [6, 5, 3] },
    { level: 6, bab: "+4", fort: 5, ref: 5, will: 5, special: "—", spellsPerDay: [6, 6, 5, 3], spellsKnown: [7, 5, 4, 2] },
    { level: 7, bab: "+5", fort: 5, ref: 5, will: 5, special: "—", spellsPerDay: [6, 6, 6, 4], spellsKnown: [7, 6, 4, 3] },
    { level: 8, bab: "+6/+1", fort: 6, ref: 6, will: 6, special: "—", spellsPerDay: [6, 6, 6, 5, 3], spellsKnown: [8, 6, 5, 3, 2] },
    { level: 9, bab: "+6/+1", fort: 6, ref: 6, will: 6, special: "—", spellsPerDay: [6, 6, 6, 6, 4], spellsKnown: [8, 6, 5, 4, 3] },
    { level: 10, bab: "+7/+2", fort: 7, ref: 7, will: 7, special: "Resistência à energia (2º tipo)", spellsPerDay: [6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 4, 3, 2] },
    { level: 11, bab: "+8/+3", fort: 7, ref: 7, will: 7, special: "Especialização em arma divina", spellsPerDay: [6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 5, 4, 3] },
    { level: 12, bab: "+9/+4", fort: 8, ref: 8, will: 8, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 5, 4, 3, 2] },
    { level: 13, bab: "+9/+4", fort: 8, ref: 8, will: 8, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 5, 4, 3] },
    { level: 14, bab: "+10/+5", fort: 9, ref: 9, will: 9, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 5, 4, 3, 2] },
    { level: 15, bab: "+11/+6/+1", fort: 9, ref: 9, will: 9, special: "Resistência à energia (3º tipo)", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 5, 4, 3] },
    { level: 16, bab: "+12/+7/+2", fort: 10, ref: 10, will: 10, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 6, 5, 4, 3, 2] },
    { level: 17, bab: "+12/+7/+2", fort: 10, ref: 10, will: 10, special: "Asas", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 6, 5, 4, 3] },
    { level: 18, bab: "+13/+8/+3", fort: 11, ref: 11, will: 11, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 6, 6, 5, 4, 3, 2] },
    { level: 19, bab: "+14/+9/+4", fort: 11, ref: 11, will: 11, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 6, 6, 5, 4, 3] },
    { level: 20, bab: "+15/+10/+5", fort: 12, ref: 12, will: 12, special: "Redução de Dano", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6], spellsKnown: [9, 6, 6, 6, 6, 6, 6, 6, 5, 4] },
  ],
  features: [
    {
      name: "Usar Armas e Armaduras",
      text: "O privilegiado sabe usar todas as armas simples e armaduras leves e médias, além de escudos (exceto escudos de corpo). Ele também sabe usar a arma predileta de sua divindade. Embora não saiba usar armaduras pesadas, elas não interferem com sua capacidade de conjuração.",
    },
    {
      name: "Magias",
      text: "Um privilegiado conjura magias divinas (o mesmo tipo disponível aos clérigos), selecionadas a partir da lista de magias do clérigo. Ele é capaz de conjurar magias sem prepará-las com antecedência, diferente de um clérigo. Para conjurar uma magia, o privilegiado deve ter pontuação em Carisma igual ou superior a 10 + o nível da magia (Car 10 para truques, Car 11 para 1º nível, etc.). A Classe de Dificuldade contra suas magias equivale a 10 + nível da magia + mod de Sabedoria. Suas magias por dia são baseadas em seu nível e modificador de Carisma elevado. Ao contrário do clérigo, a seleção de magias conhecidas do privilegiado é fixa e limitada conforme a Tabela 1-2.",
    },
    {
      name: "Foco em Arma Divina",
      text: "No 3º nível, o privilegiado recebe o talento Foco em Arma como um talento adicional para a arma predileta de sua divindade.",
    },
    {
      name: "Resistência à Energia (Sob)",
      text: "No 5º nível, o privilegiado escolhe um tipo de energia (ácido, frio, eletricidade, fogo ou sônico) e adquire resistência a energia 10 contra aquele tipo. No 10º nível e novamente no 15º nível, ele escolhe um tipo de energia adicional diferente para receber resistência 10.",
    },
    {
      name: "Especialização em Arma Divina",
      text: "No 11º nível, o privilegiado recebe o talento Especialização em Arma como um talento adicional para a arma predileta de sua divindade.",
    },
    {
      name: "Asas (Ext)",
      text: "No 17º nível, o privilegiado desenvolve asas e passa a voar com deslocamento de 18 m (manobrabilidade boa). Um personagem Bom desenvolve asas emplumadas brancas de anjo, enquanto um personagem Maligno desenvolve asas coriáceas de morcego de demônio. Um personagem que não seja Bom nem Maligno pode escolher qual tipo de asas desenvolve.",
    },
    {
      name: "Redução de Dano (Sob)",
      text: "No 20º nível, o privilegiado adquire Redução de Dano. Se for Bom, recebe RD 10/ferro frio. Se for Maligno, recebe RD 10/prata. Se não for Bom nem Maligno, pode escolher entre RD 10/ferro frio ou RD 10/prata.",
    },
  ],
  description:
    "O privilegiado segue a vereda do clérigo, mas consegue canalizar o poder divino com uma facilidade surpreendente. Ele é capaz de executar as mesmas tarefas que os demais conjuradores divinos, mas praticamente sem esforço — para ele, a magia é um dom inato concedido diretamente pelos deuses ou por sua ascendência sagrada.",
  starterPackage: {
    label: "Conjunto Inicial para Privilegiado Humano",
    armor: "Brúnea (+4 CA, −4 de penalidade de armadura, 9 m de deslocamento, 15 kg)",
    shield: "Escudo grande de madeira (+2 CA, −2 de penalidade de armadura, 5 kg)",
    weapons: [
      "Maça pesada (1d8, dec. ×2, 4 kg, uma mão, concussão)",
      "Besta leve (1d8, dec. 19–20/×2, 24 m, 2 kg, perfurante)",
    ],
    skillSelection: "Escolha uma quantidade de graduações igual a 3 + modificador de Inteligência.",
    skills: [
      { skill: "Concentração", ranks: 4, ability: "Con" },
      { skill: "Conhecimento (arcano)", ranks: 4, ability: "Int" },
      { skill: "Diplomacia", ranks: 4, ability: "Car" },
      { skill: "Identificar Magia", ranks: 4, ability: "Int" },
      { skill: "Intimidar", ranks: 2, ability: "Car" },
      { skill: "Observar (oc)", ranks: 2, ability: "Sab" },
      { skill: "Ouvir (oc)", ranks: 2, ability: "Sab" },
      { skill: "Sobrevivência", ranks: 2, ability: "Sab" },
    ],
    feat: "Magias em Combate",
    bonusFeat: "Vitalidade",
    deity: "Pelor",
    spellsKnown: ["0: curar ferimentos mínimos, detectar magia, luz, ler magias", "1º: curar ferimentos leves, bênção, escudo da fé"],
    equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro, caixa com 10 virotes de besta, símbolo sagrado de madeira (disco solar de Pelor), lanterna furta-fogo, 2 frascos de óleo.",
    gold: "2d4 PO",
  },
};

export const DND35_DIV_SHUGENJA: Dnd35DivBaseClass = {
  id: "div-shugenja",
  name: "Shugenja",
  nameEn: "Shugenja",
  page: 10,
  hitDie: "d6",
  alignment: "Qualquer uma (geralmente Leal em culturas estruturadas).",
  skillPointsFirstLevel: "(4 + modificador de Int) × 4",
  skillPointsPerLevel: "4 + modificador de Int",
  classSkills: [
    "Concentração (Con)",
    "Conhecimento (todas as perícias, escolhidas individualmente) (Int)",
    "Cura (Sab)",
    "Diplomacia (Car)",
    "Identificar Magia (Int)",
    "Ofícios (Int)",
    "Profissão (Sab)",
  ],
  startingGold: "3d4 × 10 PO (média 75 PO)",
  levels: [
    { level: 1, bab: "+0", fort: 0, ref: 0, will: 2, special: "Foco elemental, sentir elementos", spellsPerDay: [5, 3], spellsKnown: [5, 2] },
    { level: 2, bab: "+1", fort: 0, ref: 0, will: 3, special: "—", spellsPerDay: [6, 4], spellsKnown: [6, 3] },
    { level: 3, bab: "+1", fort: 1, ref: 1, will: 3, special: "—", spellsPerDay: [6, 5], spellsKnown: [6, 4] },
    { level: 4, bab: "+2", fort: 1, ref: 1, will: 4, special: "—", spellsPerDay: [6, 6, 3], spellsKnown: [7, 4, 2] },
    { level: 5, bab: "+2", fort: 1, ref: 1, will: 4, special: "—", spellsPerDay: [6, 6, 4], spellsKnown: [7, 5, 3] },
    { level: 6, bab: "+3", fort: 2, ref: 2, will: 5, special: "—", spellsPerDay: [6, 6, 5, 3], spellsKnown: [8, 5, 4, 2] },
    { level: 7, bab: "+3", fort: 2, ref: 2, will: 5, special: "—", spellsPerDay: [6, 6, 6, 4], spellsKnown: [8, 6, 4, 3] },
    { level: 8, bab: "+4", fort: 2, ref: 2, will: 6, special: "—", spellsPerDay: [6, 6, 6, 5, 3], spellsKnown: [9, 6, 5, 3, 2] },
    { level: 9, bab: "+4", fort: 3, ref: 3, will: 6, special: "—", spellsPerDay: [6, 6, 6, 6, 4], spellsKnown: [9, 6, 5, 4, 3] },
    { level: 10, bab: "+5", fort: 3, ref: 3, will: 7, special: "—", spellsPerDay: [6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 4, 3, 2] },
    { level: 11, bab: "+5", fort: 3, ref: 3, will: 7, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 5, 4, 3] },
    { level: 12, bab: "+6/+1", fort: 4, ref: 4, will: 8, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 5, 4, 3, 2] },
    { level: 13, bab: "+6/+1", fort: 4, ref: 4, will: 8, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 5, 4, 3] },
    { level: 14, bab: "+7/+2", fort: 4, ref: 4, will: 9, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 5, 4, 3, 2] },
    { level: 15, bab: "+7/+2", fort: 5, ref: 5, will: 9, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 5, 4, 3] },
    { level: 16, bab: "+8/+3", fort: 5, ref: 5, will: 10, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 6, 5, 4, 3, 2] },
    { level: 17, bab: "+8/+3", fort: 5, ref: 5, will: 10, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 6, 5, 4, 3] },
    { level: 18, bab: "+9/+4", fort: 6, ref: 6, will: 11, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 5, 3], spellsKnown: [9, 6, 6, 6, 6, 6, 5, 4, 3, 2] },
    { level: 19, bab: "+9/+4", fort: 6, ref: 6, will: 11, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 4], spellsKnown: [9, 6, 6, 6, 6, 6, 6, 5, 4, 3] },
    { level: 20, bab: "+10/+5", fort: 6, ref: 6, will: 12, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6], spellsKnown: [9, 6, 6, 6, 6, 6, 6, 6, 5, 4] },
  ],
  features: [
    {
      name: "Usar Armas e Armaduras",
      text: "O shugenja sabe usar todas as armas simples e a espada curta (frequentemente empunhando uma wakizashi). Eles não sabem usar qualquer tipo de armadura ou escudo. Em sua cultura é considerado inadequado usar armadura, embora penalidades de armadura não interfiram diretamente com a conjuração de magias.",
    },
    {
      name: "Magias",
      text: "Um shugenja conjura magias divinas a partir da lista de magias do shugenja. Ele conjura espontaneamente sem preparar com antecedência, utilizando suas ofuda (tiras de oração de papel) como foco divino. Para conjurar, necessita de Carisma igual a 10 + nível da magia, e suas CDs são 10 + nível da magia + mod de Carisma.",
    },
    {
      name: "Foco Elemental",
      text: "Todo shugenja possui um elemento predileto: Ar, Fogo, Terra ou Água, determinado por sua ordem religiosa. Pelo menos metade das magias conhecidas em cada nível deve pertencer ao elemento predileto. O shugenja recebe +1 na CD dos testes de resistência contra magias de seu elemento predileto. Como custo da especialização, ele jamais poderá aprender ou conjurar magias do elemento oposto (Ar opõe-se a Terra, e Fogo opõe-se a Água).",
    },
    {
      name: "Sentir Elementos (Sob)",
      text: "Um shugenja é capaz de sentir a presença de seu elemento predileto e distúrbios elementais. Com uma ação padrão e concentração contínua, ele detecta a presença de criaturas e objetos do elemento correspondente em um raio de 9 metros.",
    },
  ],
  description:
    "O shugenja é um sacerdote místico e conjurador divino das terras orientais que sintoniza as energias fundamentais dos quatro elementos clássicos (ar, fogo, terra e água), canalizando-os através de tiras de pergaminho de oração (ofuda) para manifestar a vontade dos espíritos e manter a harmonia do cosmo.",
  starterPackage: {
    label: "Conjunto Inicial para Shugenja Humano",
    armor: "Nenhuma (sem armadura)",
    weapons: [
      "Espada curta / Wakizashi (1d6, dec. 19–20/×2, 1 kg, perfurante)",
      "Besta leve (1d8, dec. 19–20/×2, 24 m, 2 kg, perfurante)",
    ],
    skillSelection: "Escolha uma quantidade de graduações igual a 4 + modificador de Inteligência.",
    skills: [
      { skill: "Concentração", ranks: 4, ability: "Con" },
      { skill: "Conhecimento (arcano)", ranks: 4, ability: "Int" },
      { skill: "Conhecimento (religião)", ranks: 4, ability: "Int" },
      { skill: "Cura", ranks: 4, ability: "Sab" },
      { skill: "Diplomacia", ranks: 4, ability: "Car" },
      { skill: "Identificar Magia", ranks: 4, ability: "Int" },
      { skill: "Observar (oc)", ranks: 2, ability: "Sab" },
      { skill: "Procurar (oc)", ranks: 2, ability: "Int" },
    ],
    feat: "Fortitude Maior",
    bonusFeat: "Prontidão",
    equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro, 3 tochas, 10 virotes de besta, ofuda (pergaminhos de oração).",
    gold: "1d4 PO",
  },
};

export const DND35_DIV_XAMA_ESPIRITUAL: Dnd35DivBaseClass = {
  id: "div-xama-espiritual",
  name: "Xamã Espiritual",
  nameEn: "Spirit Shaman",
  page: 14,
  hitDie: "d8",
  alignment: "Qualquer uma (geralmente com algum componente Neutro, refletindo a neutralidade do mundo espiritual).",
  skillPointsFirstLevel: "(4 + modificador de Int) × 4",
  skillPointsPerLevel: "4 + modificador de Int",
  classSkills: [
    "Concentração (Con)",
    "Conhecimento (geografia) (Int)",
    "Conhecimento (história) (Int)",
    "Conhecimento (natureza) (Int)",
    "Conhecimento (religião) (Int)",
    "Cura (Sab)",
    "Diplomacia (Car)",
    "Identificar Magia (Int)",
    "Natação (For)",
    "Ofícios (Int)",
    "Ouvir (Sab)",
    "Percepção às Cegas (Sab)",
    "Profissão (Sab)",
    "Sobrevivência (Sab)",
  ],
  startingGold: "3d4 × 10 PO (média 75 PO)",
  levels: [
    { level: 1, bab: "+0", fort: 2, ref: 0, will: 2, special: "Castigar espíritos 1d6, detectar espíritos, guia espiritual", spellsPerDay: [3, 2], spellsRetrieved: [3, 1] },
    { level: 2, bab: "+1", fort: 3, ref: 0, will: 3, special: "Bênção dos espíritos", spellsPerDay: [4, 3], spellsRetrieved: [3, 2] },
    { level: 3, bab: "+2", fort: 3, ref: 1, will: 3, special: "Forma de espírito 1/dia", spellsPerDay: [5, 4, 2], spellsRetrieved: [3, 2, 1] },
    { level: 4, bab: "+3", fort: 4, ref: 1, will: 4, special: "—", spellsPerDay: [6, 5, 3], spellsRetrieved: [3, 3, 1] },
    { level: 5, bab: "+3", fort: 4, ref: 1, will: 4, special: "Seguir o guia", spellsPerDay: [6, 6, 4, 2], spellsRetrieved: [3, 3, 1, 1] },
    { level: 6, bab: "+4", fort: 5, ref: 2, will: 5, special: "Guerreiro fantasma", spellsPerDay: [6, 6, 5, 3], spellsRetrieved: [3, 3, 2, 1] },
    { level: 7, bab: "+5", fort: 5, ref: 2, will: 5, special: "Guardião dos espíritos", spellsPerDay: [6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 2, 1, 1] },
    { level: 8, bab: "+6/+1", fort: 6, ref: 2, will: 6, special: "—", spellsPerDay: [6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 2, 2, 1] },
    { level: 9, bab: "+6/+1", fort: 6, ref: 3, will: 6, special: "Forma de espírito 2/dia", spellsPerDay: [6, 6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 3, 2, 1, 1] },
    { level: 10, bab: "+7/+2", fort: 7, ref: 3, will: 7, special: "Guia guardião", spellsPerDay: [6, 6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 3, 2, 2, 1] },
    { level: 11, bab: "+8/+3", fort: 7, ref: 3, will: 7, special: "Reencarnação espontânea", spellsPerDay: [6, 6, 6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 3, 3, 2, 1, 1] },
    { level: 12, bab: "+9/+4", fort: 8, ref: 4, will: 8, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 3, 3, 2, 2, 1] },
    { level: 13, bab: "+9/+4", fort: 8, ref: 4, will: 8, special: "Exorcismo", spellsPerDay: [6, 6, 6, 6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 3, 3, 3, 2, 1, 1] },
    { level: 14, bab: "+10/+5", fort: 9, ref: 4, will: 9, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 3, 3, 3, 2, 2, 1] },
    { level: 15, bab: "+11/+6/+1", fort: 9, ref: 5, will: 9, special: "Forma de espírito 3/dia", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 3, 3, 3, 3, 2, 1, 1] },
    { level: 16, bab: "+12/+7/+2", fort: 10, ref: 5, will: 10, special: "Enfraquecer espíritos", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 3, 3, 3, 3, 2, 2, 1] },
    { level: 17, bab: "+12/+7/+2", fort: 10, ref: 5, will: 10, special: "Viagem espiritual", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 4, 2], spellsRetrieved: [3, 3, 3, 3, 3, 3, 3, 2, 1, 1] },
    { level: 18, bab: "+13/+8/+3", fort: 11, ref: 6, will: 11, special: "—", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 5, 3], spellsRetrieved: [3, 3, 3, 3, 3, 3, 3, 2, 2, 1] },
    { level: 19, bab: "+14/+9/+4", fort: 11, ref: 6, will: 11, special: "Vida dos espíritos", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 4], spellsRetrieved: [3, 3, 3, 3, 3, 3, 3, 3, 2, 1] },
    { level: 20, bab: "+15/+10/+5", fort: 12, ref: 6, will: 12, special: "Forma de espírito 4/dia, fusão espiritual", spellsPerDay: [6, 6, 6, 6, 6, 6, 6, 6, 6, 5], spellsRetrieved: [3, 3, 3, 3, 3, 3, 3, 3, 2, 2] },
  ],
  features: [
    {
      name: "Usar Armas e Armaduras",
      text: "O xamã espiritual sabe usar todas as armas simples e armaduras leves. Ele não sabe usar qualquer tipo de escudo. Ao contrário dos druidas, os xamãs espirituais não possuem restrições materiais quanto ao uso de armaduras de metal.",
    },
    {
      name: "Magias",
      text: "Um xamã espiritual conjura magias divinas a partir da lista de magias do druida. Ele não precisa preparar magias em espaços específicos: todas as manhãs, seu guia espiritual recupera um repertório limitado de magias da lista do druida (conforme a Tabela 1-6). Durante o dia, o xamã pode conjurar qualquer uma dessas magias recuperadas espontaneamente, consumindo seus espaços diários de magia (Tabela 1-5). Para recuperar ou conjurar uma magia, necessita de Sabedoria igual a 10 + nível da magia; a CD dos testes de resistência contra suas magias é 10 + nível da magia + mod de Carisma.",
    },
    {
      name: "Guia Espiritual",
      text: "Todo xamã espiritual possui um guia espiritual do reino incorpóreo que o aconselha e alerta sobre perigos. A presença constante do guia concede ao xamã o talento Prontidão como talento adicional.",
    },
    {
      name: "Castigar Espíritos (Sob)",
      text: "Como ação padrão, o xamã espiritual libera uma onda de energia que inflige 1d6 pontos de dano por nível de classe a todos os espíritos em um raio de 9 metros (Vontade CD 10 + nível + mod Car reduz à metade). Criaturas incorpóreas não recebem chance de falha contra essa energia. Ele pode usar essa habilidade 3 + mod de Carisma vezes por dia.",
    },
    {
      name: "Detectar Espíritos (SM)",
      text: "O xamã espiritual percebe a presença de espíritos nas proximidades à vontade, funcionando de forma idêntica à magia detectar mortos-vivos, mas afetando espíritos e fadas.",
    },
    {
      name: "Bênção dos Espíritos (SM)",
      text: "A partir do 2º nível, o xamã realiza um ritual de 10 minutos para receber proteção contínua (+2 de bônus de armadura e resistência contra espíritos), permanente até ser dissipada.",
    },
    {
      name: "Forma de Espírito (Sob)",
      text: "A partir do 3º nível, 1 vez por dia (aumentando para 2/dia no 9º, 3/dia no 15º e 4/dia no 20º nível), o xamã espiritual pode tornar-se incorpóreo e invisível durante até 1 minuto.",
    },
    {
      name: "Seguir o Guia (Sob)",
      text: "No 5º nível, se o xamã falhar em um teste de resistência contra encantamento, seu guia espiritual lhe concede uma segunda chance imediata de refazer o teste na rodada subsequente.",
    },
    {
      name: "Guerreiro Fantasma (Sob)",
      text: "No 6º nível, qualquer arma empunhada pelo xamã recebe a propriedade toque espectral contra espíritos incorpóreos, e o xamã utiliza sua CA normal contra ataques de toque de criaturas incorpóreas.",
    },
    {
      name: "Guardião dos Espíritos (SM)",
      text: "No 7º nível, 1 vez por dia, o xamã pode executar um ritual para projetar uma aura protetora de 9 metros contra espíritos hostis.",
    },
    {
      name: "Guia Guardião (Sob)",
      text: "No 10º nível, se o xamã espiritual cair inconsciente ou sofrer dominação mental, seu guia espiritual assume o controle temporário de suas faculdades para preservá-lo.",
    },
    {
      name: "Reencarnação Espontânea (Sob)",
      text: "No 11º nível, se for morto, o xamã espiritual pode reencarnar espontaneamente em um novo corpo na rodada seguinte, sem perder níveis.",
    },
    {
      name: "Exorcismo (Sob)",
      text: "No 13º nível, com uma ação de rodada completa, o xamã pode expulsar espíritos ou entidades que estejam possuindo uma criatura (teste de nível + Car contra CD 10 + DV da criatura + Car do monstro).",
    },
    {
      name: "Enfraquecer Espíritos (Sob)",
      text: "No 16º nível, o xamã pode reduzir o dano de castigar espíritos (descartando 3d6 por rodada) para destituir o espírito de sua RD, RM e imunidades incorpóreas.",
    },
    {
      name: "Viagem Espiritual (SM)",
      text: "No 17º nível, o xamã é capaz de ingressar fisicamente no plano dos espíritos (plano etéreo ou astral), similar a viagem planar.",
    },
    {
      name: "Vida dos Espíritos (Sob)",
      text: "No 19º nível, o xamã adquire imunidade completa a atordoamento, veneno, sono e paralisia.",
    },
    {
      name: "Fusão Espiritual (Sob)",
      text: "No 20º nível, o xamã transcende a mortalidade, tornando-se uma criatura do tipo Espírito (nativo), recebendo RD 10/ferro frio.",
    },
  ],
  description:
    "Mestre do mundo invisível, o xamã espiritual segue uma tradição divina orientada aos espíritos da natureza e dos ancestrais. Negociando diariamente através de seu guia espiritual, ele prepara um rol restrito de feitiços druídicos que conjura com liberdade e espontaneidade sem precedentes.",
  starterPackage: {
    label: "Conjunto Inicial para Xamã Espiritual Humano",
    armor: "Gibão de peles (+3 CA, −3 de penalidade de armadura, 9 m de deslocamento, 12 kg)",
    weapons: [
      "Lança curta (1d6, dec. ×2, 6 m, 1,5 kg, perfurante)",
      "Adaga (1d4, dec. 19–20/×2, 3 m, 0,5 kg, perfurante/cortante)",
    ],
    skillSelection: "Escolha uma quantidade de graduações igual a 4 + modificador de Inteligência.",
    skills: [
      { skill: "Concentração", ranks: 4, ability: "Con" },
      { skill: "Conhecimento (natureza)", ranks: 4, ability: "Int" },
      { skill: "Conhecimento (religião)", ranks: 4, ability: "Int" },
      { skill: "Cura", ranks: 4, ability: "Sab" },
      { skill: "Diplomacia", ranks: 4, ability: "Car" },
      { skill: "Identificar Magia", ranks: 4, ability: "Int" },
      { skill: "Ouvir", ranks: 4, ability: "Sab" },
      { skill: "Sobrevivência", ranks: 4, ability: "Sab" },
    ],
    feat: "Iniciativa Aprimorada",
    bonusFeat: "Vitalidade",
    equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro, tocha, fetiche espiritual de osso entalhado.",
    gold: "2d4 PO",
  },
};

export const DND35_DIV_BASE_CLASSES: Dnd35DivBaseClass[] = [
  DND35_DIV_PRIVILEGIADO,
  DND35_DIV_SHUGENJA,
  DND35_DIV_XAMA_ESPIRITUAL,
];
