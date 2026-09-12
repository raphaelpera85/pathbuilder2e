export const DND5E_SOURCE_BOOK = "D&D 5e — Livro do Jogador (2014)";

export interface Dnd5eCatalogEntry {
  id: string;
  name: string;
  sourcePage: number;
  keyAbility?: "str" | "dex" | "con" | "int" | "wis" | "cha";
  ruleSummary?: string;
}

export interface Dnd5eToolEntry {
  id: string;
  name: string;
  ruleSummary: string;
  sourcePage: number;
}

export const DND5E_TOOLS: Dnd5eToolEntry[] = [
  { id: "ferramenta_de_artesao", name: "ferramenta de artesão", ruleSummary: "Permite realizar e avaliar trabalho de um ofício escolhido.", sourcePage: 154 },
  { id: "kit_de_disfarce", name: "kit de disfarce", ruleSummary: "Cria disfarces visuais e ajuda a reconhecer disfarces.", sourcePage: 154 },
  { id: "instrumento_musical", name: "instrumento musical", ruleSummary: "Permite tocar o instrumento escolhido e realizar testes relacionados.", sourcePage: 154 },
  { id: "ferramenta_de_falsificacao", name: "ferramenta de falsificação", ruleSummary: "Produz documentos e identifica falsificações.", sourcePage: 154 },
  { id: "ferramentas_de_ladrao", name: "ferramentas de ladrão", ruleSummary: "Usadas para abrir fechaduras e desarmar armadilhas.", sourcePage: 154 },
  { id: "kit_de_jogo", name: "kit de jogo", ruleSummary: "Permite jogar o conjunto escolhido e reconhecer jogadas ou blefes.", sourcePage: 154 },
  { id: "kit_de_herbalismo", name: "kit de herbalismo", ruleSummary: "Identifica plantas e prepara componentes ou antídotos simples.", sourcePage: 154 },
  { id: "ferramentas_de_navegador", name: "ferramentas de navegador", ruleSummary: "Auxiliam a conduzir e reparar embarcações.", sourcePage: 154 },
  { id: "veiculos_terrestres", name: "veículos terrestres", ruleSummary: "Proficiência para conduzir veículos terrestres e lidar com suas rotinas.", sourcePage: 155 },
  { id: "veiculos_aquaticos", name: "veículos aquáticos", ruleSummary: "Proficiência para conduzir veículos aquáticos e navegar.", sourcePage: 155 },
];

const entry = (id: string, name: string, sourcePage: number): Dnd5eCatalogEntry => ({ id, name, sourcePage });
const DND5E_SKILL_ABILITIES: Record<string, Dnd5eCatalogEntry["keyAbility"]> = {
  acrobacia: "dex", adestramento: "wis", arcanismo: "int", atletismo: "str", atuacao: "cha", enganacao: "cha",
  furtividade: "dex", historia: "int", intuicao: "wis", intimidacao: "cha", investigacao: "int", medicina: "wis",
  natureza: "int", percepcao: "wis", persuasao: "cha", prestidigitacao: "dex", religiao: "int", sobrevivencia: "wis",
};
const DND5E_SKILL_RULES: Record<string, string> = {
  acrobacia: "Equilíbrio, manobras e escapar de agarrões.", adestramento: "Acalmar, controlar e interpretar animais.",
  arcanismo: "Recordar conhecimento sobre magias, planos e fenômenos arcanos.", atletismo: "Escalar, saltar, nadar e superar obstáculos físicos.",
  atuacao: "Entreter por música, dança, atuação ou oratória.", enganacao: "Mentir, disfarçar-se e enganar por palavras ou atitudes.",
  furtividade: "Esconder-se e mover-se sem ser percebido.", historia: "Recordar eventos, civilizações, guerras e figuras históricas.",
  intuicao: "Identificar intenções, emoções e possíveis mentiras.", intimidacao: "Influenciar por ameaças, coerção ou demonstração de força.",
  investigacao: "Deduzir pistas, procurar detalhes e interpretar evidências.", medicina: "Diagnosticar doenças, estabilizar feridos e tratar lesões.",
  natureza: "Recordar informações sobre terreno, clima, fauna e flora.", percepcao: "Notar criaturas, objetos, sons e detalhes ocultos.",
  persuasao: "Convencer, negociar, argumentar e conquistar cooperação.", prestidigitacao: "Truques manuais, esconder objetos e furtar sem ser notado.",
  religiao: "Recordar divindades, ritos, símbolos e tradições religiosas.", sobrevivencia: "Rastrear, orientar-se, caçar e lidar com o ambiente natural.",
};

export const DND5E_RACES: Dnd5eCatalogEntry[] = ([
  ["anao", "Anão", 18], ["elfo", "Elfo", 21], ["halfling", "Halfling", 26], ["humano", "Humano", 29],
  ["draconato", "Draconato", 32], ["gnomo", "Gnomo", 35], ["meio_elfo", "Meio-Elfo", 38], ["meio_orc", "Meio-Orc", 40],
  ["tiefling", "Tiefling", 42],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const DND5E_CLASSES: Dnd5eCatalogEntry[] = ([
  ["barbaro", "Bárbaro", 46], ["bardo", "Bardo", 51], ["bruxo", "Bruxo", 56], ["clerigo", "Clérigo", 63],
  ["druida", "Druida", 71], ["feiticeiro", "Feiticeiro", 77], ["guerreiro", "Guerreiro", 83], ["ladino", "Ladino", 89],
  ["mago", "Mago", 94], ["monge", "Monge", 102], ["paladino", "Paladino", 108], ["patrulheiro", "Patrulheiro", 115],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const DND5E_SKILLS: Dnd5eCatalogEntry[] = ([
  ["acrobacia", "Acrobacia", 177], ["adestramento", "Adestramento", 177], ["arcanismo", "Arcanismo", 177], ["atletismo", "Atletismo", 177],
  ["atuacao", "Atuação", 177], ["enganacao", "Enganação", 177], ["furtividade", "Furtividade", 177], ["historia", "História", 177],
  ["intuicao", "Intuição", 177], ["intimidacao", "Intimidação", 177], ["investigacao", "Investigação", 177], ["medicina", "Medicina", 177],
  ["natureza", "Natureza", 177], ["percepcao", "Percepção", 177], ["persuasao", "Persuasão", 177], ["prestidigitacao", "Prestidigitação", 177],
  ["religiao", "Religião", 177], ["sobrevivencia", "Sobrevivência", 177],
] as const).map(([id, name, sourcePage]) => ({ ...entry(id, name, sourcePage), keyAbility: DND5E_SKILL_ABILITIES[id], ruleSummary: DND5E_SKILL_RULES[id] }));

export const DND5E_CREATION_STEPS = [
  "conceito", "raca", "classe", "atributos", "antecedente", "equipamento", "detalhes", "magia",
] as const;
