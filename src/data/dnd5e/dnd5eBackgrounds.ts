export const DND5E_BACKGROUND_SOURCE_BOOK = "D&D 5e — Livro do Jogador (2014)";

export interface Dnd5eBackground {
  id: string;
  name: string;
  sourcePage: number;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languageChoices: number;
  feature: string;
  startingEquipment: string[];
}

const background = (id: string, name: string, sourcePage: number, skills: string[], tools: string[], languageChoices: number, feature: string, startingEquipment: string[]): Dnd5eBackground => ({ id, name, sourcePage, skillProficiencies: skills, toolProficiencies: tools, languageChoices, feature, startingEquipment });

export const DND5E_BACKGROUNDS: Dnd5eBackground[] = [
  background("acolito", "Acólito", 129, ["intuicao", "religiao"], [], 2, "Abrigo dos Fiéis", ["símbolo sagrado", "livro de preces", "incenso", "vestimentas", "15 po"]),
  background("artesao_de_guilda", "Artesão de Guilda", 130, ["intuicao", "persuasao"], ["ferramenta de artesão"], 1, "Associados da Guilda", ["ferramenta de artesão", "carta de apresentação", "roupas de viajante", "15 po"]),
  background("artista", "Artista", 134, ["acrobacia", "atuacao"], ["kit de disfarce", "instrumento musical"], 0, "Pela Demanda Popular", ["instrumento musical", "favor de admirador", "traje", "15 po"]),
  background("charlatao", "Charlatão", 129, ["enganacao", "prestidigitacao"], ["kit de disfarce", "ferramenta de falsificacao"], 0, "Identidade Falsa", ["roupas finas", "kit de disfarce", "ferramenta de falsificação", "15 po"]),
  background("criminoso", "Criminoso", 139, ["enganacao", "furtividade"], ["ferramentas de ladrao", "kit de jogo"], 0, "Contato Criminal", ["pé de cabra", "roupas escuras", "15 po"]),
  background("eremita", "Eremita", 141, ["medicina", "religiao"], ["kit de herbalismo"], 1, "Descoberta", ["estojo de pergaminhos", "cobertor", "roupas comuns", "kit de herbalismo", "5 po"]),
  background("heroi_do_povo", "Herói do Povo", 143, ["adestramento", "sobrevivencia"], ["ferramenta de artesão", "veículos terrestres"], 0, "Hospitalidade Rústica", ["ferramenta de artesão", "pá", "panela de ferro", "roupas comuns", "10 po"]),
  background("marinheiro", "Marinheiro", 146, ["atletismo", "percepcao"], ["ferramentas de navegador", "veículos aquáticos"], 0, "Passagem de Navio", ["malagueta", "15 metros de corda de cânhamo", "roupas comuns", "10 po"]),
  background("nobre", "Nobre", 147, ["historia", "persuasao"], ["kit de jogo"], 1, "Posição de Privilégio", ["roupas finas", "anel de sinete", "pergaminho de linhagem", "25 po"]),
  background("orfao", "Órfão", 150, ["furtividade", "prestidigitacao"], ["ferramentas de ladrao"], 0, "Segredos da Cidade", ["faca pequena", "mapa da cidade", "animal de estimação", "roupas comuns", "10 po"]),
  background("forasteiro", "Forasteiro", 148, ["atletismo", "sobrevivencia"], ["instrumento musical"], 1, "Andarilho", ["bastão", "armadilha", "troféu de animal", "roupas de viajante", "10 po"]),
  background("sabio", "Sábio", 152, ["arcanismo", "historia"], [], 2, "Pesquisador", ["tinta", "pena", "carta de estudioso", "roupas comuns", "10 po"]),
  background("soldado", "Soldado", 153, ["atletismo", "intimidacao"], ["kit de jogo", "veículos terrestres"], 0, "Patente Militar", ["insígnia", "troféu de inimigo", "jogo de dados", "roupas comuns", "10 po"]),
];

