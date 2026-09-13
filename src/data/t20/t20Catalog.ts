export const T20_SOURCE_BOOK = "Tormenta20 — Livro Básico";

export interface T20CatalogEntry {
  id: string;
  name: string;
  sourcePage: number;
  keyAbility?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  ruleSummary?: string;
}

const entry = (id: string, name: string, sourcePage: number): T20CatalogEntry => ({ id, name, sourcePage });
const T20_SKILL_ABILITIES: Record<string, T20CatalogEntry["keyAbility"]> = {
  acrobacia: "dex", adestramento: "cha", atletismo: "str", atuacao: "cha", cavalgar: "dex", conhecimento: "int",
  cura: "wis", diplomacia: "cha", enganacao: "cha", fortitude: "con", furtividade: "dex", guerra: "int",
  iniciativa: "dex", intimidacao: "cha", intuicao: "wis", investigacao: "int", jogatina: "cha", ladinagem: "dex",
  luta: "str", misticismo: "int", nobreza: "int", oficio: "int", percepcao: "wis", pilotagem: "dex",
  pontaria: "dex", reflexos: "dex", religiao: "wis", sobrevivencia: "wis", vontade: "wis",
};
const T20_SKILL_RULES: Record<string, string> = {
  acrobacia: "Equilíbrio (CD 15), escapar de agarrões e reduzir dano de queda; terreno difícil ainda limita o movimento.", adestramento: "Lidar com animais, mudar atitude, ensinar truques e comandar montarias ou parceiros.",
  atletismo: "Escalar (CD 15), nadar (CD 15 + condições) e saltar; corrida e natação exigem testes de Fortitude para manter o fôlego.", atuacao: "Entreter plateia; o resultado define a reação e pode render dinheiro ou melhorar atitudes.",
  cavalgar: "Montar e controlar montaria; testes evitam queda, permitem manobras e controlam a montaria em combate.", conhecimento: "Recordar informação sobre assuntos acadêmicos; CD 10 simples, 20 complexa, 30 mistério ou enigma.",
  cura: "Estabilizar moribundo (CD 15), tratar doenças e venenos e diagnosticar condições; kit concede recursos ao atendimento.", diplomacia: "Mudar atitude, negociar e pedir favores; pedidos simples não exigem teste, perigosos recebem +10 na CD.",
  enganacao: "Blefar, disfarçar, falsificar e plantar intrigas; fintar é ação padrão contra Reflexos em alcance curto.", fortitude: "Resistir a efeitos que afetam saúde e vitalidade, como venenos e doenças; CD vem do efeito.",
  furtividade: "Esconder-se com cobertura/camuflagem e seguir alguém; deslocamento normal impõe -5 e ação chamativa impõe -20.", guerra: "Analisar terreno (CD 20) como ação de movimento ou orientar aliado (CD 20) para melhorar a iniciativa.",
  iniciativa: "Determina a ordem de ação no início de uma cena; desempate usa o maior bônus de Iniciativa.", intimidacao: "Assustar ou coagir; ação padrão contra Vontade deixa abalado, e margem de 10 deixa apavorado por uma rodada.",
  intuicao: "Perceber blefes e pressentir comportamento estranho; pressentimento exige CD 20 e treinamento.", investigacao: "Obter informação em um dia ou procurar área em ação completa; CDs e custos variam conforme o sigilo da pista.",
  jogatina: "Resolver uma noite de apostas com teste: CD 10–40 define se perde, empata ou multiplica a aposta.", ladinagem: "Abrir fechaduras (CD 20–30), ocultar itens, fazer punga e sabotar mecanismos (CD 20–30); kit de ladrão evita -5.",
  luta: "Ataque corpo a corpo contra a Defesa do alvo; também resolve manobras e técnicas de combate.", misticismo: "Detectar e identificar magias, criaturas e itens; CDs 15 + custo/ND e CD 20–30 para itens mágicos.",
  nobreza: "Etiqueta e informação sobre leis, tradições, linhagens e heráldica; perguntas usam CD 10, 20 ou 30.", oficio: "Fabricar, reparar, identificar e obter sustento com um ofício; fabricar usa matéria-prima de um terço do preço.",
  percepcao: "Observar, ouvir e perceber criaturas invisíveis, disfarces e falsificações; ouvir através de porta aumenta a CD em +5.", pilotagem: "Conduzir carroças, barcos ou balões; CD 15 em condições boas, 20 ruins e 25 terríveis.",
  pontaria: "Ataque à distância contra a Defesa do alvo usando armas de arremesso ou disparo.", reflexos: "Evitar efeitos súbitos e de área e resistir a fintas; a CD vem da ameaça ou efeito.",
  religiao: "Identificar criaturas e itens divinos, responder questões sobre deuses e realizar ritos (CD 20).", sobrevivencia: "Acampar (CD 15–30), orientar-se, rastrear e identificar animais; falha pode reduzir o avanço ou fazer o grupo se perder.",
  vontade: "Concentração e resistência a efeitos mentais; também sustenta magia em condições adversas ou após sofrer dano.",
};

export const T20_RACES: T20CatalogEntry[] = ([
  ["humano", "Humano", 19], ["anao", "Anão", 20], ["dahllan", "Dahllan", 21], ["elfo", "Elfo", 22],
  ["goblin", "Goblin", 23], ["lefou", "Lefou", 24], ["minotauro", "Minotauro", 25], ["qareen", "Qareen", 26],
  ["golem", "Golem", 27], ["hynne", "Hynne", 27], ["kliren", "Kliren", 28], ["medusa", "Medusa", 28],
  ["osteon", "Osteon", 29], ["sereia_tritao", "Sereia/Tritão", 29], ["siflide", "Sílfide", 30],
  ["suraggel", "Suraggel", 30], ["trog", "Trog", 31],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const T20_CLASSES: T20CatalogEntry[] = ([
  ["arcanista", "Arcanista", 36], ["barbaro", "Bárbaro", 40], ["bardo", "Bardo", 43], ["bucaneiro", "Bucaneiro", 46],
  ["cacador", "Caçador", 49], ["cavaleiro", "Cavaleiro", 52], ["clerigo", "Clérigo", 56], ["druida", "Druida", 60],
  ["guerreiro", "Guerreiro", 64], ["inventor", "Inventor", 67], ["ladino", "Ladino", 72], ["lutador", "Lutador", 75],
  ["nobre", "Nobre", 78], ["paladino", "Paladino", 81],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export interface T20ClassChoice {
  id: string;
  classId: string;
  label: string;
  minimumLevel: number;
  options: readonly string[];
  count: number;
}

export const T20_CLASS_CHOICES: readonly T20ClassChoice[] = [
  { id: "t20-bardo-schools", classId: "bardo", label: "Escolas de magia do Bardo", minimumLevel: 1, options: ["Abjuração", "Adivinhação", "Convocação", "Encantamento", "Evocação", "Ilusão", "Necromancia", "Transmutação"], count: 3 },
  { id: "t20-cacador-favored-enemy", classId: "cacador", label: "Inimigo favorecido", minimumLevel: 1, options: ["Aberração", "Animal", "Construto", "Espírito", "Fada", "Humanoide", "Monstro", "Morto-vivo", "Planta"], count: 1 },
  { id: "t20-cacador-favored-terrain", classId: "cacador", label: "Terreno favorecido", minimumLevel: 1, options: ["Deserto", "Floresta", "Montanha", "Pântano", "Planície", "Subterrâneo", "Urbano", "Litoral"], count: 1 },
  { id: "t20-cavaleiro-path", classId: "cavaleiro", label: "Caminho do Cavaleiro", minimumLevel: 5, options: ["Bastião", "Montaria"], count: 1 },
  { id: "t20-ladino-specialist", classId: "ladino", label: "Perícias de Especialista", minimumLevel: 1, options: ["Acrobacia", "Adestramento", "Atletismo", "Atuação", "Cavalgar", "Conhecimento", "Cura", "Diplomacia", "Enganação", "Furtividade", "Guerra", "Iniciativa", "Intimidação", "Intuição", "Investigação", "Ladinagem", "Luta", "Misticismo", "Nobreza", "Ofício", "Percepção", "Pilotagem", "Pontaria", "Religião", "Sobrevivência", "Vontade"], count: 2 },
  { id: "t20-paladino-justice-blessing", classId: "paladino", label: "Bênção da Justiça", minimumLevel: 5, options: ["Égide Sagrada", "Montaria Sagrada"], count: 1 },
];

export const T20_ARCANIST_PATHS = [
  { id: "bruxo", name: "Bruxo", sourcePage: 37, ruleSummary: "Canaliza magias através de um foco; atributo-chave Inteligência." },
  { id: "feiticeiro", name: "Feiticeiro", sourcePage: 37, ruleSummary: "Canaliza magia inata; aprende uma magia nova a cada nível ímpar e usa Carisma." },
  { id: "mago", name: "Mago", sourcePage: 37, ruleSummary: "Estuda e memoriza fórmulas arcanas através de um grimório; usa Inteligência." },
] as const;

export const T20_SORCERER_LINEAGES = [
  { id: "draconica", name: "Dracônica", sourcePage: 39, ruleSummary: "Escolhe ácido, eletricidade, fogo ou frio como tipo de dano da linhagem." },
  { id: "feerica", name: "Feérica", sourcePage: 39, ruleSummary: "Concede treinamento em Enganação e uma magia de encantamento ou ilusão." },
  { id: "rubra", name: "Rubra", sourcePage: 39, ruleSummary: "Linhagem corrompida pela Tormenta, com poderes ligados à corrupção aberrante." },
] as const;

export const T20_SKILLS: T20CatalogEntry[] = ([
  ["acrobacia", "Acrobacia", 115], ["adestramento", "Adestramento", 115], ["atletismo", "Atletismo", 115], ["atuacao", "Atuação", 116],
  ["cavalgar", "Cavalgar", 116], ["conhecimento", "Conhecimento", 116], ["cura", "Cura", 117], ["diplomacia", "Diplomacia", 117],
  ["enganacao", "Enganação", 118], ["fortitude", "Fortitude", 119], ["furtividade", "Furtividade", 119], ["guerra", "Guerra", 119],
  ["iniciativa", "Iniciativa", 119], ["intimidacao", "Intimidação", 119], ["intuicao", "Intuição", 119], ["investigacao", "Investigação", 120],
  ["jogatina", "Jogatina", 120], ["ladinagem", "Ladinagem", 120], ["luta", "Luta", 120], ["misticismo", "Misticismo", 121],
  ["nobreza", "Nobreza", 121], ["oficio", "Ofício", 121], ["percepcao", "Percepção", 122], ["pilotagem", "Pilotagem", 122],
  ["pontaria", "Pontaria", 123], ["reflexos", "Reflexos", 123], ["religiao", "Religião", 123], ["sobrevivencia", "Sobrevivência", 123],
  ["vontade", "Vontade", 123],
] as const).map(([id, name, sourcePage]) => ({ ...entry(id, name, sourcePage), keyAbility: T20_SKILL_ABILITIES[id], ruleSummary: T20_SKILL_RULES[id] }));

export const T20_CREATION_STEPS = [
  "conceito", "atributos", "raca", "classe", "origem", "divindade", "pericias", "equipamento", "toques_finais",
] as const;
