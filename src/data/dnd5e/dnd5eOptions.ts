export interface Dnd5eSubrace {
  id: string;
  raceId: string;
  name: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  traits: string[];
  subraceChoices?: Dnd5eSubraceChoice[];
}

export interface Dnd5eSubraceChoice {
  id: string;
  label: string;
  options: string[];
  count: number;
}

export interface Dnd5eSubclass {
  id: string;
  classId: string;
  name: string;
  sourcePage: number;
  featureLevel: number;
  summary: string;
  features: Dnd5eSubclassFeature[];
  choices: Dnd5eSubclassChoice[];
}

export interface Dnd5eSubclassFeature {
  level: number;
  name: string;
  summary: string;
}

export interface Dnd5eSubclassChoice {
  id: string;
  label: string;
  options: string[];
  count: number;
  minimumLevel?: number;
  grantsSkillProficiencies?: boolean;
  grantsLanguages?: boolean;
  grantsSpells?: boolean;
}

export interface Dnd5eClassChoice {
  id: string;
  classId: string;
  label: string;
  minimumLevel: number;
  options: string[];
  count: number;
}

const subrace = (
  id: string,
  raceId: string,
  name: string,
  sourcePage: number,
  abilityBonuses: string,
  attributeAdjustments: Dnd5eSubrace["attributeAdjustments"],
  traits: string[],
  subraceChoices?: Dnd5eSubraceChoice[],
): Dnd5eSubrace => ({ id, raceId, name, sourcePage, abilityBonuses, attributeAdjustments, traits, subraceChoices });

/** Sub-raças do Livro do Jogador 2014; não inclui variantes de suplementos. */
export const DND5E_SUBRACES: Dnd5eSubrace[] = [
  subrace("anao_colina", "anao", "Anão da Colina", 20, "Sabedoria +1", { wis: 1 }, ["Tenacidade anã", "Proficiência com armadura anã"]),
  subrace("anao_montanha", "anao", "Anão da Montanha", 20, "Força +2", { str: 2 }, ["Treinamento com armadura anã"]),
  subrace("elfo_alto", "elfo", "Alto Elfo", 23, "Inteligência +1", { int: 1 }, ["Truque de mago", "Idioma adicional", "Treinamento com armas élficas"], [
    { id: "high-elf-cantrip", label: "Truque de mago", options: ["Amigos", "Consertar", "Ilusão menor", "Luz", "Mãos mágicas", "Mensagem", "Prestidigitação", "Raio de gelo", "Rajada de fogo", "Toque chocante"], count: 1 },
    { id: "high-elf-language", label: "Idioma adicional do Alto Elfo", options: ["Anão", "Dracônico", "Gigante", "Gnômico", "Goblin", "Halfling", "Infernal", "Orc", "Primordial", "Silvestre"], count: 1 },
  ]),
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

type Dnd5eSubclassBase = Omit<Dnd5eSubclass, "features" | "choices">;

const subclass = (id: string, classId: string, name: string, sourcePage: number, summary: string): Dnd5eSubclassBase => ({
  id, classId, name, sourcePage, featureLevel: DND5E_SUBCLASS_LEVELS[classId] || 3, summary,
});

/** Arquétipos/subclasses escolhidos no Livro do Jogador 2014. */
const DND5E_SUBCLASSES_BASE: Dnd5eSubclassBase[] = [
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

const sf = (level: number, name: string, summary: string): Dnd5eSubclassFeature => ({ level, name, summary });

/** Características centrais das subclasses do Livro do Jogador 2014. */
const DND5E_SUBCLASS_FEATURES: Record<string, Dnd5eSubclassFeature[]> = {
  barbaro_berserker: [sf(3, "Frenesi", "Pode entrar em frenesi para fazer um ataque corpo a corpo como ação bônus, sofrendo exaustão ao terminar."), sf(6, "Fúria Insensata", "Não pode ser amedrontado ou enfeitiçado enquanto em fúria."), sf(10, "Presença Intimidante", "Pode amedrontar uma criatura com uma ação usando Carisma."), sf(14, "Retaliação", "Quando sofre dano de uma criatura adjacente, pode usar reação para fazer um ataque contra ela.")],
  barbaro_totem: [sf(3, "Espírito Totêmico", "Escolhe um espírito animal que altera os benefícios da Fúria."), sf(6, "Aspecto da Fera", "Recebe um benefício espiritual de acordo com o animal escolhido."), sf(10, "Andarilho Espiritual", "Pode lançar Comunhão com a Natureza como ritual."), sf(14, "Sintonia Totêmica", "Recebe o benefício adicional do espírito totêmico escolhido.")],
  bardo_conhecimento: [sf(3, "Proficiências Bônus", "Ganha proficiência em três perícias à sua escolha."), sf(3, "Palavras Cortantes", "Usa reação e Inspiração para reduzir uma jogada de ataque, teste ou dano de uma criatura que possa ouvir."), sf(6, "Segredos Mágicos Adicionais", "Aprende duas magias de qualquer classe."), sf(14, "Perícia Inigualável", "Adiciona o dado de Inspiração de Bardo a um teste de habilidade.")],
  bardo_valor: [sf(3, "Proficiências Bônus", "Ganha proficiência com armaduras médias, escudos e armas marciais."), sf(3, "Inspiração de Combate", "O dado de Inspiração pode ser usado para aumentar dano ou CA em combate."), sf(6, "Ataque Extra", "Pode atacar duas vezes ao realizar a ação Atacar."), sf(14, "Magia de Batalha", "Pode fazer um ataque com arma como ação bônus após lançar uma magia de bardo.")],
  clerigo_conhecimento: [sf(1, "Bênçãos do Conhecimento", "Aprende idiomas e recebe proficiência e especialização em perícias de conhecimento."), sf(2, "Conhecimento das Eras", "Pode usar Canalizar Divindade para obter proficiência temporária em uma perícia ou ferramenta."), sf(6, "Ler Pensamentos", "Lê pensamentos de uma criatura e pode comandá-la após usar Canalizar Divindade."), sf(8, "Conjuração Potente", "Adiciona o modificador de Sabedoria ao dano de truques de clérigo."), sf(17, "Visões do Passado", "Observa visões ligadas a um objeto ou local usando Canalizar Divindade.")],
  clerigo_vida: [sf(1, "Proficiência Bônus", "Ganha proficiência com armadura pesada."), sf(1, "Discípulo da Vida", "Magias de cura restauram pontos de vida adicionais."), sf(2, "Preservar a Vida", "Usa Canalizar Divindade para restaurar pontos de vida de criaturas próximas."), sf(6, "Curandeiro Abençoado", "Magias de cura lançadas em outros também curam você."), sf(8, "Golpe Divino", "Adiciona dano radiante a um ataque uma vez por turno."), sf(17, "Cura Suprema", "Maximiza os dados de cura de suas magias de clérigo.")],
  clerigo_luz: [sf(1, "Truque Adicional", "Aprende o truque Luz."), sf(1, "Fulgor de Proteção", "Usa reação para impor desvantagem a um ataque contra uma criatura próxima."), sf(2, "Clarão do Amanhecer", "Usa Canalizar Divindade para dissipar escuridão e causar dano radiante."), sf(6, "Fulgor Aprimorado", "Pode usar Fulgor de Proteção contra ataques a criaturas próximas."), sf(8, "Conjuração Potente", "Adiciona o modificador de Sabedoria ao dano de truques de clérigo."), sf(17, "Coroa de Luz", "Emite luz que impõe desvantagem a inimigos contra suas magias de fogo ou radiante.")],
  clerigo_natureza: [sf(1, "Acólito da Natureza", "Aprende um truque de druida e ganha proficiência em uma perícia de natureza."), sf(2, "Encantar Animais e Plantas", "Usa Canalizar Divindade para enfeitiçar bestas e plantas."), sf(6, "Amortecer Elementos", "Usa reação para conceder resistência a dano elemental."), sf(8, "Golpe Divino", "Adiciona dano de frio, fogo ou elétrico a um ataque uma vez por turno."), sf(17, "Mestre da Natureza", "Comanda bestas e plantas enfeitiçadas e pode afetar várias criaturas.")],
  clerigo_tempestade: [sf(1, "Proficiências Bônus", "Ganha proficiência com armas marciais e armaduras pesadas."), sf(1, "Fúria da Tormenta", "Usa reação para causar dano elétrico ou trovejante a um atacante."), sf(2, "Fúria Destrutiva", "Maximiza dano elétrico ou trovejante causado por Canalizar Divindade."), sf(6, "Golpe de Trovão", "Empurra uma criatura Grande ou menor quando causa dano elétrico."), sf(8, "Golpe Divino", "Adiciona dano trovejante a um ataque uma vez por turno."), sf(17, "Nascido da Tormenta", "Ganha deslocamento de voo enquanto não estiver no subsolo ou dentro de casa.")],
  clerigo_trapaca: [sf(1, "Bênção do Trapaceiro", "Concede vantagem em testes de Destreza (Furtividade) a uma criatura."), sf(2, "Invocar Duplicidade", "Cria uma ilusão duplicada que concede vantagem em ataques contra criaturas próximas."), sf(6, "Transpor", "Pode se teleportar para o espaço da duplicidade ou trocar de lugar com ela."), sf(8, "Golpe Divino", "Adiciona dano de veneno a um ataque uma vez por turno."), sf(17, "Manto da Sombra", "Fica invisível por um turno como ação.")],
  clerigo_guerra: [sf(1, "Proficiências Bônus", "Ganha proficiência com armas marciais e armaduras pesadas."), sf(1, "Sacerdote da Guerra", "Pode fazer um ataque com arma como ação bônus um número de vezes por descanso."), sf(2, "Golpe Guiado", "Usa Canalizar Divindade para receber bônus em uma jogada de ataque."), sf(6, "Bênção do Deus da Guerra", "Concede bônus em uma jogada de ataque de outra criatura usando reação."), sf(8, "Golpe Divino", "Adiciona dano radiante a um ataque uma vez por turno."), sf(17, "Avatar da Batalha", "Ganha resistência a dano de concussão, cortante e perfurante não mágico.")],
  druida_terra: [sf(2, "Truque Bônus", "Aprende um truque de druida adicional."), sf(2, "Recuperação Natural", "Recupera espaços de magia durante um descanso curto uma vez por dia."), sf(3, "Magias do Círculo", "Recebe magias adicionais conforme o terreno natural escolhido."), sf(6, "Passo da Terra", "Move-se por terreno difícil não mágico sem custo adicional e atravessa vegetação sem penalidade."), sf(10, "Proteção da Natureza", "Fica imune a veneno, doenças, encantamento e amedrontamento de elementais e fadas."), sf(14, "Santuário da Natureza", "Bestas e plantas percebem sua presença e podem evitar atacá-lo.")],
  druida_lua: [sf(2, "Forma Selvagem de Combate", "Usa Forma Selvagem como ação bônus e transforma espaços de magia em pontos de vida."), sf(6, "Golpes Primais", "Ataques em Forma Selvagem contam como mágicos."), sf(10, "Forma Elemental", "Gasta dois usos de Forma Selvagem para assumir a forma de um elemental."), sf(14, "Mil Formas", "Pode lançar Alterar-se à vontade.")],
  guerreiro_campeao: [sf(3, "Crítico Aprimorado", "Seus ataques causam acerto crítico com resultado 19 ou 20."), sf(7, "Atleta Notável", "Adiciona metade do bônus de proficiência a testes de Força, Destreza e saltos."), sf(10, "Estilo de Luta Adicional", "Escolhe um segundo estilo de luta."), sf(15, "Crítico Superior", "Seus ataques causam acerto crítico com resultado 18, 19 ou 20."), sf(18, "Sobrevivente", "Recupera pontos de vida ao início do turno quando estiver abaixo da metade do máximo.")],
  guerreiro_mestre_batalha: [sf(3, "Superioridade em Combate", "Aprende manobras e recebe dados de superioridade para aprimorar ataques e defesas."), sf(7, "Conhecer o Inimigo", "Estuda capacidades de uma criatura comparando estatísticas em combate."), sf(7, "Aluno da Guerra", "Ganha proficiência com uma ferramenta de artesão à escolha."), sf(15, "Implacável", "Recupera um dado de superioridade quando rola iniciativa sem nenhum restante.")],
  guerreiro_cavaleiro_arcano: [sf(3, "Conjuração", "Aprende magias da lista de mago e usa Inteligência como atributo de conjuração."), sf(3, "Vínculo com Arma", "Não pode ser desarmado e pode invocar uma arma vinculada."), sf(7, "Magia de Guerra", "Pode fazer um ataque com arma como ação bônus após lançar um truque."), sf(10, "Golpe Místico", "Quando acerta uma criatura com arma, ela tem desvantagem no próximo salvamento contra sua magia."), sf(15, "Investida Arcana", "Pode se teleportar até 9 metros após usar Surto de Ação."), sf(18, "Magia de Guerra Aprimorada", "Pode fazer um ataque com arma como ação bônus após lançar qualquer magia.")],
  monge_mao_aberta: [sf(3, "Técnica da Mão Aberta", "A Rajada de Golpes pode derrubar, empurrar ou impedir reações do alvo."), sf(6, "Integridade Corporal", "Recupera pontos de vida como ação."), sf(11, "Tranquilidade", "Pode lançar Santuário sobre si após um descanso longo."), sf(17, "Palma Vibrante", "Implanta vibrações letais que podem atordoar ou derrubar uma criatura.")],
  monge_sombra: [sf(3, "Artes das Sombras", "Pode gastar ki para lançar magias de escuridão, silêncio e visão no escuro."), sf(6, "Passo das Sombras", "Teleporta-se entre áreas de penumbra ou escuridão e ganha vantagem no próximo ataque."), sf(11, "Manto de Sombras", "Fica invisível em penumbra ou escuridão como ação."), sf(17, "Oportunista", "Usa reação para fazer um ataque corpo a corpo contra uma criatura que foi atingida por outra.")],
  monge_quatro_elementos: [sf(3, "Discípulo dos Elementos", "Aprende disciplinas elementais que consomem pontos de ki."), sf(6, "Disciplina Elemental", "Aprende uma disciplina elemental adicional."), sf(11, "Disciplina Elemental Aprimorada", "Aprende uma disciplina elemental adicional."), sf(17, "Disciplina Elemental Superior", "Aprende uma disciplina elemental adicional.")],
  paladino_devocao: [sf(3, "Canalizar Divindade", "Usa sua energia sagrada para emitir uma arma sagrada ou expulsar mortos-vivos."), sf(7, "Aura de Devoção", "Você e aliados próximos não podem ser enfeitiçados."), sf(15, "Pureza de Espírito", "Fica sempre sob o efeito de Proteção contra o Bem e o Mal."), sf(18, "Aura Aprimorada", "O alcance das suas auras aumenta para 9 metros."), sf(20, "Santo Nimbo", "Emite luz, causa dano radiante e ganha resistência a dano de conjuradores inimigos.")],
  paladino_anciaos: [sf(3, "Canalizar Divindade", "Usa sua energia sagrada para enredar inimigos ou expulsar seres sobrenaturais."), sf(7, "Aura de Proteção", "Você e aliados próximos recebem resistência a dano de magias."), sf(15, "Sentinela Imortal", "Não sofre as penalidades de idade e não pode ser envelhecido magicamente."), sf(18, "Aura Aprimorada", "O alcance das suas auras aumenta para 9 metros."), sf(20, "Campeão Ancião", "Assume uma forma poderosa com regeneração e magias adicionais.")],
  paladino_vinganca: [sf(3, "Canalizar Divindade", "Usa sua energia sagrada para abjurar inimigos ou receber vantagem contra um alvo jurado."), sf(7, "Vingador Incansável", "Seu deslocamento aumenta ao realizar um ataque de oportunidade."), sf(15, "Alma de Vingança", "Pode fazer um ataque corpo a corpo como reação contra um alvo que salvou contra sua magia de juramento."), sf(18, "Aura Aprimorada", "O alcance das suas auras aumenta para 9 metros."), sf(20, "Anjo Vingador", "Assume uma forma alada e amedrontadora contra seus inimigos jurados.")],
  patrulheiro_cacador: [sf(3, "Presa do Caçador", "Escolhe uma técnica para causar dano ou controlar inimigos específicos."), sf(7, "Táticas Defensivas", "Escolhe uma reação defensiva contra ataques ou efeitos de criaturas que enfrenta."), sf(11, "Ataque Múltiplo", "Escolhe uma técnica para atingir vários inimigos ou melhorar um ataque."), sf(15, "Defesa Superior do Caçador", "Escolhe uma resposta defensiva poderosa contra um ataque ou efeito.")],
  patrulheiro_mestre_feras: [sf(3, "Companheiro do Patrulheiro", "Obtém um companheiro animal que age sob seu comando e usa seu bônus de proficiência."), sf(7, "Treinamento Excepcional", "Pode usar ação bônus para comandar o companheiro a realizar ações adicionais."), sf(11, "Fúria Bestial", "O companheiro pode realizar dois ataques quando recebe o comando de Ataque."), sf(15, "Compartilhar Magias", "Magias lançadas em si também afetam o companheiro dentro do alcance.")],
  ladino_ladrao: [sf(3, "Mãos Rápidas", "Usa Ação Ardilosa para usar ferramentas, abrir fechaduras ou manipular objetos."), sf(3, "Andarilho Supremo", "Escalar não custa movimento extra e saltos têm distância aumentada."), sf(9, "Furtividade Suprema", "Pode fazer testes de Furtividade mesmo quando se move em velocidade normal."), sf(13, "Usar Item Mágico", "Ignora requisitos de classe, raça e nível para usar itens mágicos."), sf(17, "Reflexos de Ladrão", "Realiza dois turnos no primeiro turno de cada combate.")],
  ladino_assassino: [sf(3, "Proficiência Bônus", "Ganha proficiência com kit de disfarce e kit de venenos."), sf(3, "Assassinato", "Tem vantagem contra criaturas que ainda não agiram e acertos contra criaturas surpresas são críticos."), sf(9, "Infiltração", "Cria identidades falsas para assumir uma persona confiável."), sf(13, "Impostor", "Imita perfeitamente voz, escrita e comportamento observados."), sf(17, "Golpe Mortal", "Um alvo surpreso deve passar em salvamento de Constituição ou sofre dano dobrado.")],
  ladino_trapaceiro_arcano: [sf(3, "Conjuração", "Aprende magias da lista de mago e usa Inteligência como atributo de conjuração."), sf(3, "Mão de Mago Malandra", "Pode tornar a Mão Mágica invisível e usá-la para furtar ou distrair em combate."), sf(9, "Emboscada Mágica", "Criaturas têm desvantagem no salvamento contra sua magia quando você está escondido."), sf(13, "Trapaceiro Versátil", "Pode obter vantagem em um ataque usando sua Mão Mágica para distrair o alvo."), sf(17, "Ladrão de Magias", "Rouba uma magia de uma criatura e pode usá-la uma vez antes de um descanso longo.")],
  bruxo_arque_fada: [sf(1, "Presença Feérica", "Pode enfeitiçar ou amedrontar criaturas próximas usando sua ação."), sf(6, "Fuga Nebulosa", "Fica invisível e se teleporta como reação ao sofrer dano."), sf(10, "Defesas Sedutoras", "Fica imune a ser enfeitiçado e pode redirecionar o encanto de volta ao agressor."), sf(14, "Delírio Sombrio", "Enfeitiça ou amedronta uma criatura por um minuto.")],
  bruxo_infernal: [sf(1, "Bênção do Senhor Sombrio", "Ao reduzir uma criatura hostil a 0 PV, ganha pontos de vida temporários."), sf(6, "Sorte Sombria", "Adiciona um d10 a um teste de habilidade ou salvamento uma vez por descanso."), sf(10, "Resiliência Infernal", "Escolhe um tipo de dano e ganha resistência a ele até trocar após um descanso."), sf(14, "Lançar no Inferno", "Ao acertar uma criatura, envia-a para um plano infernal e causa dano psíquico ao retornar.")],
  bruxo_grande_antigo: [sf(1, "Mente Desperta", "Pode se comunicar telepaticamente com uma criatura próxima."), sf(6, "Proteção Entrópica", "Impõe desvantagem a um ataque contra você e ganha vantagem no próximo ataque se ele errar."), sf(10, "Escudo do Pensamento", "Seus pensamentos não podem ser lidos e você recebe resistência a dano psíquico."), sf(14, "Criar Servo", "Implanta um parasita psíquico em uma criatura incapacitada para controlá-la temporariamente.")],
  feiticeiro_linhagem_draconica: [sf(1, "Ancestral Dracônico", "Escolhe uma ancestralidade, aprende seu idioma e causa dano adicional do tipo associado."), sf(6, "Resiliência Dracônica", "Aumenta seus pontos de vida máximos e sua CA sem armadura."), sf(14, "Asas de Dragão", "Cria asas e recebe deslocamento de voo, sem poder usá-las com armadura."), sf(18, "Presença Dracônica", "Amedronta ou enfeitiça criaturas próximas usando pontos de feitiçaria.")],
  feiticeiro_magia_selvagem: [sf(1, "Surto de Magia Selvagem", "Após lançar uma magia, pode rolar na tabela de surto conforme autorização do Mestre."), sf(1, "Marés do Caos", "Ganha vantagem em um ataque, teste ou salvamento e pode provocar um surto depois."), sf(6, "Distorcer a Sorte", "Usa reação para adicionar ou subtrair 1d4 de uma jogada próxima."), sf(14, "Caos Controlado", "Escolhe o resultado do dado de surto rolado duas vezes."), sf(18, "Bombardeio de Magia", "Rola novamente dados de dano de uma magia e pode causar dano a si mesmo para aumentar o efeito.")],
  mago_abjuracao: [sf(2, "Erudito da Abjuração", "Custa menos tempo e dinheiro aprender magias de abjuração."), sf(2, "Salvaguarda Arcana", "Cria uma proteção com pontos de vida temporários ao lançar uma magia de abjuração."), sf(6, "Projetar Salvaguarda", "Usa reação para transferir dano de uma criatura próxima para sua Salvaguarda Arcana."), sf(10, "Abjuração Aprimorada", "Adiciona bônus de proficiência a testes de habilidade feitos como parte de uma magia de abjuração."), sf(14, "Resistência à Magia", "Tem vantagem em salvamentos contra magias e resistência ao dano de magias.")],
  mago_conjuracao: [sf(2, "Erudito da Conjuração", "Custa menos tempo e dinheiro aprender magias de conjuração."), sf(2, "Conjuração Menor", "Cria objetos inanimados pequenos temporariamente."), sf(6, "Transposição Benigna", "Teleporta-se ou troca de lugar com uma criatura próxima."), sf(10, "Conjuração Concentrada", "Não perde concentração por sofrer dano enquanto conjura uma magia de conjuração."), sf(14, "Mestre Conjurador", "Criaturas convocadas têm mais pontos de vida e dano.")],
  mago_adivinhacao: [sf(2, "Erudito da Adivinhação", "Custa menos tempo e dinheiro aprender magias de adivinhação."), sf(2, "Presságio", "Rola dois d20 após um descanso longo para substituir jogadas futuras."), sf(6, "Especialista em Adivinhação", "Recupera um espaço de magia ao lançar uma magia de adivinhação."), sf(10, "O Terceiro Olho", "Recebe uma percepção especial temporária, como visão verdadeira ou visão no escuro."), sf(14, "Presságio Maior", "Rola três d20 com Presságio em vez de dois.")],
  mago_encantamento: [sf(2, "Erudito do Encantamento", "Custa menos tempo e dinheiro aprender magias de encantamento."), sf(2, "Olhar Hipnótico", "Enfeitiça uma criatura próxima até o fim do próximo turno."), sf(6, "Encanto Instintivo", "Redireciona um ataque contra você para uma criatura próxima."), sf(10, "Dividir Encantamento", "Uma magia de encantamento de alvo único pode afetar duas criaturas."), sf(14, "Alterar Memórias", "Pode apagar ou modificar a memória de uma criatura enfeitiçada.")],
  mago_evocacao: [sf(2, "Erudito da Evocação", "Custa menos tempo e dinheiro aprender magias de evocação."), sf(2, "Magias Potentes", "Aliados passam automaticamente em salvamentos contra seus truques de evocação e sofrem metade do dano em falha."), sf(6, "Truque Potente", "Truques de evocação causam metade do dano mesmo em uma falha no ataque ou salvamento."), sf(10, "Evocação Potencializada", "Adiciona modificador de Inteligência a uma jogada de dano de evocação."), sf(14, "Sobrecarga", "Causa dano máximo em uma magia de 1º a 5º nível, sofrendo dano necrótico se usar novamente.")],
  mago_ilusao: [sf(2, "Erudito da Ilusão", "Custa menos tempo e dinheiro aprender magias de ilusão."), sf(2, "Ilusão Menor Aprimorada", "Aprende Ilusão Menor e pode criar imagem e som com o truque."), sf(6, "Ilusões Maleáveis", "Altera a natureza de uma ilusão enquanto ela permanece ativa."), sf(10, "Eu Ilusório", "Cria uma duplicata ilusória para fazer um ataque errar como reação."), sf(14, "Realidade Ilusória", "Torna um elemento de uma ilusão real por um minuto.")],
  mago_necromancia: [sf(2, "Erudito da Necromancia", "Custa menos tempo e dinheiro aprender magias de necromancia."), sf(2, "Colheita Sombria", "Recupera pontos de vida quando uma magia mata uma ou mais criaturas."), sf(6, "Escravos Mortos-Vivos", "Cria mortos-vivos mais resistentes e recebe mais controle sobre eles."), sf(10, "Acostumado à Não-Morte", "Ganha resistência a dano necrótico e seu máximo de pontos de vida não pode ser reduzido."), sf(14, "Comandar Mortos-Vivos", "Pode subjugar uma criatura morta-viva sob seu controle.")],
  mago_transmutacao: [sf(2, "Erudito da Transmutação", "Custa menos tempo e dinheiro aprender magias de transmutação."), sf(2, "Alquimia Menor", "Transforma materiais em outros materiais temporariamente."), sf(6, "Pedra do Transmutador", "Cria uma pedra que concede um benefício de transmutação a quem a carrega."), sf(10, "Metamorfo", "Pode lançar Alterar-se à vontade e não precisa de componentes materiais."), sf(14, "Mestre Transmutador", "Pode destruir a Pedra do Transmutador para realizar uma grande transmutação.")],
};

const DND5E_SUBCLASS_CHOICES: Record<string, Dnd5eSubclassChoice[]> = {
  bardo_conhecimento: [
    { id: "lore-bonus-skills", label: "Proficiências bônus do Colégio do Conhecimento", options: ["Acrobacia", "Adestramento", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intuição", "Intimidação", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"], count: 3, minimumLevel: 3, grantsSkillProficiencies: true },
  ],
  clerigo_conhecimento: [
    { id: "knowledge-blessings-skills", label: "Perícias das Bênçãos do Conhecimento", options: ["Arcanismo", "História", "Natureza", "Religião"], count: 2, minimumLevel: 1, grantsSkillProficiencies: true },
    { id: "knowledge-blessings-languages", label: "Idiomas das Bênçãos do Conhecimento", options: ["Anão", "Celestial", "Dracônico", "Élfico", "Gigante", "Gnômico", "Goblin", "Halfling", "Infernal", "Orc", "Primordial", "Silvestre", "Subcomum"], count: 2, minimumLevel: 1, grantsLanguages: true },
  ],
  clerigo_natureza: [
    { id: "nature-acolyte-skill", label: "Perícia do Acólito da Natureza", options: ["Adestramento", "Natureza", "Sobrevivência"], count: 1, minimumLevel: 1, grantsSkillProficiencies: true },
    { id: "nature-acolyte-cantrip", label: "Truque do Acólito da Natureza", options: ["Globos de Luz", "Luz"], count: 1, minimumLevel: 1, grantsSpells: true },
  ],
  barbaro_totem: [
    { id: "totem-spirit", label: "Espírito Totêmico", options: ["Urso", "Águia", "Lobo"], count: 1, minimumLevel: 3 },
    { id: "totem-aspect", label: "Aspecto da Fera", options: ["Urso", "Águia", "Lobo"], count: 1, minimumLevel: 6 },
    { id: "totem-attunement", label: "Sintonia Totêmica", options: ["Urso", "Águia", "Lobo"], count: 1, minimumLevel: 14 },
  ],
  druida_terra: [{ id: "land-terrain", label: "Terreno do Círculo da Terra", options: ["Ártico", "Costa", "Deserto", "Floresta", "Montanha", "Pântano", "Planalto", "Subterrâneo"], count: 1, minimumLevel: 2 }],
  guerreiro_mestre_batalha: [
    { id: "battle-master-maneuvers", label: "Manobras (3º nível)", options: ["Aparar", "Ataque de Precisão", "Ataque de Provocação", "Ataque Desarmante", "Ataque Distrativo", "Ataque Estonteante", "Ataque de Finta", "Ataque de Empurrão", "Ataque de Investida", "Ataque de Manobra", "Ataque de Reunir", "Ataque de Varredura", "Contra-ataque", "Golpe do Comandante"], count: 3, minimumLevel: 3 },
    { id: "battle-master-maneuvers-7", label: "Manobras adicionais (7º nível)", options: ["Aparar", "Ataque de Precisão", "Ataque de Provocação", "Ataque Desarmante", "Ataque Distrativo", "Ataque Estonteante", "Ataque de Finta", "Ataque de Empurrão", "Ataque de Investida", "Ataque de Manobra", "Ataque de Reunir", "Ataque de Varredura", "Contra-ataque", "Golpe do Comandante"], count: 2, minimumLevel: 7 },
    { id: "battle-master-maneuvers-15", label: "Manobra adicional (15º nível)", options: ["Aparar", "Ataque de Precisão", "Ataque de Provocação", "Ataque Desarmante", "Ataque Distrativo", "Ataque Estonteante", "Ataque de Finta", "Ataque de Empurrão", "Ataque de Investida", "Ataque de Manobra", "Ataque de Reunir", "Ataque de Varredura", "Contra-ataque", "Golpe do Comandante"], count: 1, minimumLevel: 15 },
  ],
  monge_quatro_elementos: [
    { id: "elemental-disciplines", label: "Disciplina Elemental (3º nível)", options: ["Abraço dos Ventos", "Caminho dos Quatro Elementos", "Chamas da Fênix", "Defesa da Montanha Eterna", "Golpe de Cinzas", "Moldar o Rio Corrente", "Punho dos Quatro Trovões", "Rastro da Serpente de Fogo", "Rio de Chamas", "Varredura de Cinzas"], count: 1, minimumLevel: 3 },
    { id: "elemental-disciplines-6", label: "Disciplina Elemental (6º nível)", options: ["Abraço dos Ventos", "Caminho dos Quatro Elementos", "Chamas da Fênix", "Defesa da Montanha Eterna", "Golpe de Cinzas", "Moldar o Rio Corrente", "Punho dos Quatro Trovões", "Rastro da Serpente de Fogo", "Rio de Chamas", "Varredura de Cinzas"], count: 1, minimumLevel: 6 },
    { id: "elemental-disciplines-11", label: "Disciplina Elemental (11º nível)", options: ["Abraço dos Ventos", "Caminho dos Quatro Elementos", "Chamas da Fênix", "Defesa da Montanha Eterna", "Golpe de Cinzas", "Moldar o Rio Corrente", "Punho dos Quatro Trovões", "Rastro da Serpente de Fogo", "Rio de Chamas", "Varredura de Cinzas"], count: 1, minimumLevel: 11 },
    { id: "elemental-disciplines-17", label: "Disciplina Elemental (17º nível)", options: ["Abraço dos Ventos", "Caminho dos Quatro Elementos", "Chamas da Fênix", "Defesa da Montanha Eterna", "Golpe de Cinzas", "Moldar o Rio Corrente", "Punho dos Quatro Trovões", "Rastro da Serpente de Fogo", "Rio de Chamas", "Varredura de Cinzas"], count: 1, minimumLevel: 17 },
  ],
  feiticeiro_linhagem_draconica: [{ id: "draconic-ancestry", label: "Ancestralidade Dracônica", options: ["Azul", "Branco", "Bronze", "Cobre", "Latão", "Negro", "Ouro", "Prata", "Verde", "Vermelho"], count: 1, minimumLevel: 1 }],
  feiticeiro_magia_selvagem: [{ id: "wild-magic-surge", label: "Surto de Magia Selvagem", options: ["Usar tabela do Livro do Jogador"], count: 1, minimumLevel: 1 }],
  patrulheiro_cacador: [
    { id: "hunter-prey", label: "Presa do Caçador", options: ["Matador de Gigantes", "Matador de Colossos", "Destruidor de Hordas"], count: 1, minimumLevel: 3 },
    { id: "hunter-defensive-tactics", label: "Táticas Defensivas", options: ["Escapar da Horda", "Defesa Multiataque", "Vontade de Aço"], count: 1, minimumLevel: 7 },
    { id: "hunter-multiattack", label: "Ataque Múltiplo", options: ["Saraivada", "Ataque de Redemoinho"], count: 1, minimumLevel: 11 },
    { id: "hunter-superior-defense", label: "Defesa Superior do Caçador", options: ["Evasão", "Resistência contra Ataques Mágicos", "Resistência ao Ataque"], count: 1, minimumLevel: 15 },
  ],
  patrulheiro_mestre_feras: [{ id: "beast-companion", label: "Tipo de companheiro animal", options: ["Javali", "Lobo", "Pantera", "Urso", "Texugo", "Aranha", "Águia", "Cavalo"], count: 1, minimumLevel: 3 }],
};

/** Escolhas de classe do Livro do Jogador 2014 que alteram a ficha. */
export const DND5E_CLASS_CHOICES: Dnd5eClassChoice[] = [
  { id: "fighter-fighting-style", classId: "guerreiro", label: "Estilo de Luta", minimumLevel: 1, options: ["Arquearia", "Defesa", "Duelos", "Luta com Armas Grandes", "Luta com Duas Armas", "Proteção"], count: 1 },
  { id: "paladin-fighting-style", classId: "paladino", label: "Estilo de Luta", minimumLevel: 2, options: ["Defesa", "Duelos", "Luta com Armas Grandes", "Luta com Duas Armas"], count: 1 },
  { id: "ranger-fighting-style", classId: "patrulheiro", label: "Estilo de Luta", minimumLevel: 2, options: ["Arquearia", "Defesa", "Duelos", "Luta com Duas Armas"], count: 1 },
  { id: "sorcerer-metamagic", classId: "feiticeiro", label: "Metamagia", minimumLevel: 3, options: ["Magia Acelerada", "Magia Cuidadosa", "Magia Distante", "Magia Elevada", "Magia Estendida", "Magia Potencializada", "Magia Sutil", "Magia Transmutada"], count: 2 },
  { id: "warlock-pact-boon", classId: "bruxo", label: "Dádiva do Pacto", minimumLevel: 3, options: ["Pacto da Corrente", "Pacto da Lâmina", "Pacto do Tomo"], count: 1 },
];

export const DND5E_SUBCLASSES: Dnd5eSubclass[] = DND5E_SUBCLASSES_BASE.map((item) => ({
  ...item,
  features: DND5E_SUBCLASS_FEATURES[item.id] || [],
  choices: DND5E_SUBCLASS_CHOICES[item.id] || [],
}));

export const getDnd5eSubraces = (raceId: string) => DND5E_SUBRACES.filter((item) => item.raceId === raceId);
export const getDnd5eSubclasses = (classId: string) => DND5E_SUBCLASSES.filter((item) => item.classId === classId);
