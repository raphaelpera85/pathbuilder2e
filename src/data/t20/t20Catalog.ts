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
  acrobacia: "Equilíbrio, cambalhotas e escapar de agarrões.", adestramento: "Lidar com animais, montar e comandar companheiros animais.",
  atletismo: "Escalar, nadar, saltar e realizar feitos de força.", atuacao: "Entreter uma plateia com música, dança, oratória ou interpretação.",
  cavalgar: "Montar e controlar uma montaria em viagem ou combate.", conhecimento: "Recordar informações sobre história, geografia, sociedade e assuntos acadêmicos.",
  cura: "Estabilizar feridos, tratar doenças e identificar condições.", diplomacia: "Negociar, obter ajuda e melhorar a atitude de uma criatura.",
  enganacao: "Mentir, disfarçar intenções e criar falsificações ou distrações.", fortitude: "Resistir a efeitos físicos, venenos, doenças e exaustão.",
  furtividade: "Mover-se sem ser percebido e esconder-se.", guerra: "Conhecer tática, estratégia, exércitos e campos de batalha.",
  iniciativa: "Determinar prontidão para agir quando o conflito começa.", intimidacao: "Ameaçar ou pressionar uma criatura por força de presença.",
  intuicao: "Perceber intenções, emoções e sinais de mentira.", investigacao: "Encontrar pistas, analisar evidências e deduzir informações.",
  jogatina: "Participar de jogos de azar e avaliar probabilidades ou blefes.", ladinagem: "Abrir fechaduras, desarmar armadilhas e manipular mecanismos delicados.",
  luta: "Atacar corpo a corpo e avaliar técnicas marciais.", misticismo: "Reconhecer magia, itens mágicos e fenômenos sobrenaturais.",
  nobreza: "Conhecer linhagens, etiqueta, política e brasões.", oficio: "Executar e avaliar trabalho especializado de um ofício escolhido.",
  percepcao: "Notar criaturas, objetos, sons e detalhes ocultos.", pilotagem: "Conduzir veículos terrestres, aquáticos ou aéreos.",
  pontaria: "Atacar à distância e controlar armas de disparo ou arremesso.", reflexos: "Evitar efeitos rápidos, armadilhas e perigos repentinos.",
  religiao: "Conhecer divindades, dogmas, símbolos e ritos.", sobrevivencia: "Rastrear, orientar-se, obter abrigo e encontrar recursos no ermo.",
  vontade: "Resistir a medo, encantamento, compulsão e outros efeitos mentais.",
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
