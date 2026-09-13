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

export type Dnd5eToolChoiceGroup = "artisan" | "instrument" | "game";

export const DND5E_TOOLS: Dnd5eToolEntry[] = [
  { id: "ferramenta_de_artesao", name: "ferramenta de artesão", ruleSummary: "Permite realizar e avaliar trabalho de um ofício escolhido.", sourcePage: 154 },
  { id: "ferramentas_de_carpinteiro", name: "ferramentas de carpinteiro", ruleSummary: "Permitem medir, cortar e montar peças de madeira como parte do ofício de carpinteiro.", sourcePage: 154 },
  { id: "ferramentas_de_cartografo", name: "ferramentas de cartógrafo", ruleSummary: "Permitem produzir, interpretar e revisar mapas e cartas geográficas.", sourcePage: 154 },
  { id: "ferramentas_de_costureiro", name: "ferramentas de costureiro", ruleSummary: "Permitem cortar, ajustar e reparar tecidos e vestimentas.", sourcePage: 154 },
  { id: "ferramentas_de_coureiro", name: "ferramentas de coureiro", ruleSummary: "Permitem trabalhar couro para produzir e reparar peças e equipamentos.", sourcePage: 154 },
  { id: "ferramentas_de_entalhador", name: "ferramentas de entalhador", ruleSummary: "Permitem entalhar detalhes refinados em madeira e materiais semelhantes.", sourcePage: 154 },
  { id: "ferramentas_de_ferreiro", name: "ferramentas de ferreiro", ruleSummary: "Permitem forjar, reparar e avaliar objetos de metal.", sourcePage: 154 },
  { id: "ferramentas_de_funileiro", name: "ferramentas de funileiro", ruleSummary: "Permitem construir e reparar mecanismos e recipientes metálicos delicados.", sourcePage: 154 },
  { id: "ferramentas_de_joalheiro", name: "ferramentas de joalheiro", ruleSummary: "Permitem avaliar, lapidar e trabalhar gemas e metais preciosos.", sourcePage: 154 },
  { id: "ferramentas_de_oleiro", name: "ferramentas de oleiro", ruleSummary: "Permitem moldar, decorar e reparar objetos de cerâmica.", sourcePage: 154 },
  { id: "ferramentas_de_pedreiro", name: "ferramentas de pedreiro", ruleSummary: "Permitem construir, reparar e avaliar estruturas de pedra e alvenaria.", sourcePage: 154 },
  { id: "ferramentas_de_pintor", name: "ferramentas de pintor", ruleSummary: "Permitem preparar tintas e produzir ou avaliar pinturas.", sourcePage: 154 },
  { id: "ferramentas_de_sapateiro", name: "ferramentas de sapateiro", ruleSummary: "Permitem fabricar, ajustar e reparar calçados.", sourcePage: 154 },
  { id: "ferramentas_de_vidreiro", name: "ferramentas de vidreiro", ruleSummary: "Permitem moldar, reparar e avaliar objetos de vidro.", sourcePage: 154 },
  { id: "suprimentos_de_alquimista", name: "suprimentos de alquimista", ruleSummary: "Permitem preparar, identificar e manipular substâncias alquímicas.", sourcePage: 154 },
  { id: "suprimentos_de_cervejeiro", name: "suprimentos de cervejeiro", ruleSummary: "Permitem produzir, avaliar e identificar bebidas fermentadas.", sourcePage: 154 },
  { id: "suprimentos_de_caligrafia", name: "suprimentos de caligrafia", ruleSummary: "Permitem escrever, decorar e avaliar textos e documentos caligrafados.", sourcePage: 154 },
  { id: "utensilios_de_cozinheiro", name: "utensílios de cozinheiro", ruleSummary: "Permitem preparar, conservar e avaliar alimentos.", sourcePage: 154 },
  { id: "kit_de_disfarce", name: "kit de disfarce", ruleSummary: "Cria disfarces visuais e ajuda a reconhecer disfarces.", sourcePage: 154 },
  { id: "instrumento_musical", name: "instrumento musical", ruleSummary: "Permite tocar o instrumento escolhido e realizar testes relacionados.", sourcePage: 154 },
  { id: "alaude", name: "alaúde", ruleSummary: "Instrumento musical de cordas; exige proficiência própria.", sourcePage: 154 },
  { id: "flauta", name: "flauta", ruleSummary: "Instrumento musical de sopro; exige proficiência própria.", sourcePage: 154 },
  { id: "flauta_de_pan", name: "flauta de pã", ruleSummary: "Instrumento musical de sopro; exige proficiência própria.", sourcePage: 154 },
  { id: "gaita_de_foles", name: "gaita de foles", ruleSummary: "Instrumento musical de sopro; exige proficiência própria.", sourcePage: 154 },
  { id: "lira", name: "lira", ruleSummary: "Instrumento musical de cordas; exige proficiência própria.", sourcePage: 154 },
  { id: "oboe", name: "oboé", ruleSummary: "Instrumento musical de sopro; exige proficiência própria.", sourcePage: 154 },
  { id: "tambor", name: "tambor", ruleSummary: "Instrumento musical de percussão; exige proficiência própria.", sourcePage: 154 },
  { id: "trombeta", name: "trombeta", ruleSummary: "Instrumento musical de sopro; exige proficiência própria.", sourcePage: 154 },
  { id: "violino", name: "violino", ruleSummary: "Instrumento musical de cordas; exige proficiência própria.", sourcePage: 154 },
  { id: "xilofone", name: "xilofone", ruleSummary: "Instrumento musical de percussão; exige proficiência própria.", sourcePage: 154 },
  { id: "ferramenta_de_falsificacao", name: "ferramenta de falsificação", ruleSummary: "Produz documentos e identifica falsificações.", sourcePage: 154 },
  { id: "ferramentas_de_ladrao", name: "ferramentas de ladrão", ruleSummary: "Usadas para abrir fechaduras e desarmar armadilhas.", sourcePage: 154 },
  { id: "kit_de_jogo", name: "kit de jogo", ruleSummary: "Permite jogar o conjunto escolhido e reconhecer jogadas ou blefes.", sourcePage: 154 },
  { id: "baralho_de_cartas", name: "baralho de cartas", ruleSummary: "Conjunto de jogo usado para cartas; exige proficiência própria.", sourcePage: 154 },
  { id: "conjunto_de_dados", name: "conjunto de dados", ruleSummary: "Conjunto de jogo usado para dados; exige proficiência própria.", sourcePage: 154 },
  { id: "jogo_dos_tres_dragoes", name: "jogo dos três dragões", ruleSummary: "Conjunto de jogo de cartas; exige proficiência própria.", sourcePage: 154 },
  { id: "xadrez_do_dragao", name: "xadrez do dragão", ruleSummary: "Conjunto de jogo de estratégia; exige proficiência própria.", sourcePage: 154 },
  { id: "kit_de_venenos", name: "kit de venenos", ruleSummary: "Permite criar e utilizar venenos e realizar testes relacionados.", sourcePage: 154 },
  { id: "kit_de_herbalismo", name: "kit de herbalismo", ruleSummary: "Identifica plantas e prepara componentes ou antídotos simples.", sourcePage: 154 },
  { id: "ferramentas_de_navegador", name: "ferramentas de navegador", ruleSummary: "Auxiliam a conduzir e reparar embarcações.", sourcePage: 154 },
  { id: "veiculos_terrestres", name: "veículos terrestres", ruleSummary: "Proficiência para conduzir veículos terrestres e lidar com suas rotinas.", sourcePage: 155 },
  { id: "veiculos_aquaticos", name: "veículos aquáticos", ruleSummary: "Proficiência para conduzir veículos aquáticos e navegar.", sourcePage: 155 },
];

/** Variantes específicas exigidas quando um antecedente concede uma categoria à escolha. */
export const DND5E_TOOL_CHOICE_GROUPS: Record<Dnd5eToolChoiceGroup, { genericName: string; toolIds: string[] }> = {
  artisan: {
    genericName: "ferramenta de artesão",
    toolIds: [
      "ferramentas_de_carpinteiro", "ferramentas_de_cartografo", "ferramentas_de_costureiro", "ferramentas_de_coureiro",
      "ferramentas_de_entalhador", "ferramentas_de_ferreiro", "ferramentas_de_funileiro", "ferramentas_de_joalheiro",
      "ferramentas_de_oleiro", "ferramentas_de_pedreiro", "ferramentas_de_pintor", "ferramentas_de_sapateiro",
      "ferramentas_de_vidreiro", "suprimentos_de_alquimista", "suprimentos_de_cervejeiro", "suprimentos_de_caligrafia",
      "utensilios_de_cozinheiro",
    ],
  },
  instrument: {
    genericName: "instrumento musical",
    toolIds: ["alaude", "flauta", "flauta_de_pan", "gaita_de_foles", "lira", "oboe", "tambor", "trombeta", "violino", "xilofone"],
  },
  game: {
    genericName: "kit de jogo",
    toolIds: ["baralho_de_cartas", "conjunto_de_dados", "jogo_dos_tres_dragoes", "xadrez_do_dragao"],
  },
};

export function getDnd5eToolChoiceEntries(group: Dnd5eToolChoiceGroup): Dnd5eToolEntry[] {
  const ids = new Set(DND5E_TOOL_CHOICE_GROUPS[group].toolIds);
  return DND5E_TOOLS.filter((tool) => ids.has(tool.id));
}

const entry = (id: string, name: string, sourcePage: number): Dnd5eCatalogEntry => ({ id, name, sourcePage });
const DND5E_SKILL_ABILITIES: Record<string, Dnd5eCatalogEntry["keyAbility"]> = {
  acrobacia: "dex", adestramento: "wis", arcanismo: "int", atletismo: "str", atuacao: "cha", enganacao: "cha",
  furtividade: "dex", historia: "int", intuicao: "wis", intimidacao: "cha", investigacao: "int", medicina: "wis",
  natureza: "int", percepcao: "wis", persuasao: "cha", prestidigitacao: "dex", religiao: "int", sobrevivencia: "wis",
};
const DND5E_SKILL_RULES: Record<string, string> = {
  acrobacia: "Manter equilíbrio, realizar acrobacias e escapar de agarrões ou restrições.", adestramento: "Acalmar, controlar, conduzir e interpretar as intenções de animais.",
  arcanismo: "Recordar conhecimento sobre magias, itens mágicos, planos e fenômenos arcanos.", atletismo: "Escalar, saltar, nadar e superar obstáculos físicos usando força e impulso.",
  atuacao: "Entreter por música, dança, atuação, oratória ou outra forma de apresentação.", enganacao: "Mentir, disfarçar-se, falsificar e enganar por palavras ou atitudes.",
  furtividade: "Esconder-se e mover-se sem ser percebido; armadura pode impor desvantagem.", historia: "Recordar eventos, civilizações, guerras, figuras históricas e legados culturais.",
  intuicao: "Identificar intenções, emoções, sinceridade e possíveis mentiras de uma criatura.", intimidacao: "Influenciar por ameaças, coerção, hostilidade ou demonstração de força.",
  investigacao: "Deduzir pistas, procurar detalhes, encontrar objetos ocultos e interpretar evidências.", medicina: "Diagnosticar doenças, estabilizar feridos e tratar lesões ou condições físicas.",
  natureza: "Recordar informações sobre terreno, clima, fauna, flora e ciclos naturais.", percepcao: "Notar criaturas, objetos, sons e detalhes ocultos; usada para perceber perigos.",
  persuasao: "Convencer, negociar, argumentar, barganhar e conquistar cooperação de forma diplomática.", prestidigitacao: "Realizar truques manuais, esconder objetos, plantar itens e furtar sem ser notado.",
  religiao: "Recordar divindades, ritos, símbolos, cultos e tradições religiosas.", sobrevivencia: "Rastrear, orientar-se, caçar, procurar alimento e lidar com o ambiente natural.",
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
