export interface Dnd5eSubrace {
  id: string;
  raceId: string;
  name: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  traits: string[];
}

export interface Dnd5eSubclass {
  id: string;
  classId: string;
  name: string;
  sourcePage: number;
  featureLevel: number;
  summary: string;
}

const subrace = (
  id: string,
  raceId: string,
  name: string,
  sourcePage: number,
  abilityBonuses: string,
  attributeAdjustments: Dnd5eSubrace["attributeAdjustments"],
  traits: string[],
): Dnd5eSubrace => ({ id, raceId, name, sourcePage, abilityBonuses, attributeAdjustments, traits });

/** Sub-raças do Livro do Jogador 2014; não inclui variantes de suplementos. */
export const DND5E_SUBRACES: Dnd5eSubrace[] = [
  subrace("anao_colina", "anao", "Anão da Colina", 20, "Sabedoria +1", { wis: 1 }, ["Tenacidade anã", "Proficiência com armadura anã"]),
  subrace("anao_montanha", "anao", "Anão da Montanha", 20, "Força +2", { str: 2 }, ["Treinamento com armadura anã"]),
  subrace("elfo_alto", "elfo", "Alto Elfo", 23, "Inteligência +1", { int: 1 }, ["Truque de mago", "Idioma adicional", "Treinamento com armas élficas"]),
  subrace("elfo_floresta", "elfo", "Elfo da Floresta", 24, "Sabedoria +1", { wis: 1 }, ["Máscara da natureza", "Treinamento com armas élficas"]),
  subrace("elfo_drow", "elfo", "Drow", 24, "Carisma +1", { cha: 1 }, ["Sensibilidade à luz solar", "Magia drow", "Treinamento com armas drow"]),
  subrace("halfling_pes_leves", "halfling", "Halfling Pés-Leves", 28, "Carisma +1", { cha: 1 }, ["Furtividade natural"]),
  subrace("halfling_resistente", "halfling", "Halfling Robusto", 28, "Constituição +1", { con: 1 }, ["Resiliência robusta"]),
  subrace("gnomo_floresta", "gnomo", "Gnomo da Floresta", 36, "Destreza +1", { dex: 1 }, ["Ilusionista nato", "Falar com bestas pequenas"]),
  subrace("gnomo_pedra", "gnomo", "Gnomo das Rochas", 37, "Constituição +1", { con: 1 }, ["Conhecimento de artífice", "Engenho"]),
];

const DND5E_SUBCLASS_LEVELS: Record<string, number> = {
  barbaro: 3, bardo: 3, bruxo: 1, clerigo: 1, druida: 2, feiticeiro: 1,
  guerreiro: 3, ladino: 3, mago: 2, monge: 3, paladino: 3, patrulheiro: 3,
};

const subclass = (id: string, classId: string, name: string, sourcePage: number, summary: string): Dnd5eSubclass => ({
  id, classId, name, sourcePage, featureLevel: DND5E_SUBCLASS_LEVELS[classId] || 3, summary,
});

/** Arquétipos/subclasses escolhidos no Livro do Jogador 2014. */
export const DND5E_SUBCLASSES: Dnd5eSubclass[] = [
  subclass("barbaro_berserker", "barbaro", "Caminho do Berserker", 49, "Fúria frenética e presença intimidante."),
  subclass("barbaro_totem", "barbaro", "Caminho do Guerreiro Totêmico", 50, "Espírito totêmico e comunhão com a natureza."),
  subclass("bardo_conhecimento", "bardo", "Colégio do Conhecimento", 54, "Perícias adicionais e palavras cortantes."),
  subclass("bardo_valor", "bardo", "Colégio do Valor", 55, "Treinamento marcial e inspiração em combate."),
  subclass("clerigo_conhecimento", "clerigo", "Domínio do Conhecimento", 59, "Sabedoria, línguas e domínio de informações."),
  subclass("clerigo_vida", "clerigo", "Domínio da Vida", 60, "Cura ampliada e proteção da vida."),
  subclass("clerigo_luz", "clerigo", "Domínio da Luz", 61, "Luz divina e fogo radiante."),
  subclass("clerigo_natureza", "clerigo", "Domínio da Natureza", 62, "Ligação com a natureza e seus ciclos."),
  subclass("clerigo_tempestade", "clerigo", "Domínio da Tempestade", 62, "Trovão, relâmpago e fúria da tormenta."),
  subclass("clerigo_trapaca", "clerigo", "Domínio da Trapaça", 63, "Ilusão, duplicidade e mobilidade."),
  subclass("clerigo_guerra", "clerigo", "Domínio da Guerra", 63, "Poder marcial e bênçãos de batalha."),
  subclass("druida_terra", "druida", "Círculo da Terra", 68, "Magia natural e recuperação de espaços."),
  subclass("druida_lua", "druida", "Círculo da Lua", 69, "Formas selvagens de combate."),
  subclass("guerreiro_campeao", "guerreiro", "Arquétipo do Campeão", 85, "Aprimoramento marcial simples e crítico."),
  subclass("guerreiro_mestre_batalha", "guerreiro", "Mestre da Batalha", 86, "Manobras e dados de superioridade."),
  subclass("guerreiro_cavaleiro_arcano", "guerreiro", "Cavaleiro Arcano", 87, "Combate marcial combinado com magia."),
  subclass("monge_mao_aberta", "monge", "Tradição da Mão Aberta", 101, "Técnicas de combate desarmado."),
  subclass("monge_sombra", "monge", "Tradição das Sombras", 102, "Furtividade e manipulação das sombras."),
  subclass("monge_quatro_elementos", "monge", "Tradição dos Quatro Elementos", 103, "Disciplina elemental e pontos de chi."),
  subclass("paladino_devocao", "paladino", "Juramento de Devoção", 113, "Honra, disciplina e proteção da luz."),
  subclass("paladino_anciaos", "paladino", "Juramento dos Anciões", 114, "Vida, esperança e defesa da natureza."),
  subclass("paladino_vinganca", "paladino", "Juramento de Vingança", 116, "Perseguição implacável aos inimigos jurados."),
  subclass("patrulheiro_cacador", "patrulheiro", "Arquétipo do Caçador", 119, "Táticas para enfrentar ameaças escolhidas."),
  subclass("patrulheiro_mestre_feras", "patrulheiro", "Mestre das Feras", 121, "Companheiro animal e combate coordenado."),
  subclass("ladino_ladrao", "ladino", "Arquétipo do Ladrão", 92, "Agilidade, furtividade e uso rápido de itens."),
  subclass("ladino_assassino", "ladino", "Arquétipo do Assassino", 93, "Disfarce, veneno e ataques surpresa."),
  subclass("ladino_trapaceiro_arcano", "ladino", "Trapaceiro Arcano", 94, "Truques arcanos para ampliar a astúcia."),
  subclass("bruxo_arque_fada", "bruxo", "Arquifada", 109, "Poderes feéricos e encanto sobrenatural."),
  subclass("bruxo_infernal", "bruxo", "Infernal", 109, "Poderes concedidos por um patrono infernal."),
  subclass("bruxo_grande_antigo", "bruxo", "Grande Antigo", 110, "Conhecimento proibido e influência psíquica."),
  subclass("feiticeiro_linhagem_draconica", "feiticeiro", "Linhagem Dracônica", 102, "Magia inata de ancestralidade dracônica."),
  subclass("feiticeiro_magia_selvagem", "feiticeiro", "Magia Selvagem", 103, "Surtos imprevisíveis de magia bruta."),
  subclass("mago_abjuracao", "mago", "Escola de Abjuração", 115, "Proteções, selos e defesa arcana."),
  subclass("mago_conjuracao", "mago", "Escola de Conjuração", 116, "Criação e transporte por magia."),
  subclass("mago_adivinhacao", "mago", "Escola de Adivinhação", 117, "Visões e manipulação do acaso."),
  subclass("mago_encantamento", "mago", "Escola de Encantamento", 117, "Influência sobre mentes e emoções."),
  subclass("mago_evocacao", "mago", "Escola de Evocação", 118, "Explosões e controle de energia."),
  subclass("mago_ilusao", "mago", "Escola de Ilusão", 118, "Imagens, sons e enganos mágicos."),
  subclass("mago_necromancia", "mago", "Escola de Necromancia", 119, "Energia vital, morte e não-morte."),
  subclass("mago_transmutacao", "mago", "Escola de Transmutação", 119, "Alteração da matéria e do corpo."),
];

export const getDnd5eSubraces = (raceId: string) => DND5E_SUBRACES.filter((item) => item.raceId === raceId);
export const getDnd5eSubclasses = (classId: string) => DND5E_SUBCLASSES.filter((item) => item.classId === classId);
