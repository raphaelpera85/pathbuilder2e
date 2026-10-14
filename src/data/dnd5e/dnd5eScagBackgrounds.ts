export const DND5E_SCAG_SOURCE_BOOK = "D&D 5e · Guia de Aventureiros da Costa da Espada";

export interface Dnd5eScagBackground {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languageChoices: number;
  featureName: string;
  featureDescription: string;
  startingEquipment: string[];
}

export const DND5E_SCAG_BACKGROUNDS: Dnd5eScagBackground[] = [
  {
    id: "dnd5e.scag.background.vigia_da_cidade",
    name: "Vigia da Cidade",
    englishName: "City Watch",
    sourcePage: 145,
    skillProficiencies: ["atletismo", "intuicao"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Olhos da Vigia",
    featureDescription: "Sua experiência em policiar comunidades lhe concede facilidade para localizar postos da guarda e delegacias locais. Outros membros das forças da ordem o reconhecem como alguém da mesma profissão e cooperam em assuntos de interesse mútuo.",
    startingEquipment: [
      "Uniforme da guarda da cidade",
      "Trombeta para soar alarme",
      "Par de algemas",
      "Conjunto de roupas comuns",
      "Algibeira com 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.artesao_do_cla",
    name: "Artesão do Clã",
    englishName: "Clan Crafter",
    sourcePage: 145,
    skillProficiencies: ["historia", "intuicao"],
    toolProficiencies: ["ferramentas_de_artesao"],
    languageChoices: 1,
    featureName: "Hospitalidade dos Clãs",
    featureDescription: "O respeito pelo ofício de sua corporação ou clã lhe concede abrigo gratuito em fortalezas anãs e oficinas de artífices. Mestres artesãos compartilham recursos de bancada e forja com você mediante cordialidade e respeito mútuo.",
    startingEquipment: [
      "Conjunto de ferramentas de artesão",
      "Cinzel de ferro",
      "Símbolo ou sinete do clã",
      "Conjunto de roupas de viajante",
      "Algibeira com 5 po e uma gema de 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.academico_recluso",
    name: "Acadêmico Recluso",
    englishName: "Cloistered Scholar",
    sourcePage: 146,
    skillProficiencies: ["historia", "arcanismo"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Biblioteca Reclusa",
    featureDescription: "Seu histórico em abadias e monastérios de estudo como Forte da Vela lhe concede livre acesso a arquivos, bibliotecas e salas de pergaminhos protegidas onde acadêmicos convencionais encontram portas fechadas.",
    startingEquipment: [
      "Conjunto de roupas comuns",
      "Frasco de tinta",
      "Pena de escrever",
      "Folhas de pergaminho",
      "Pequeno livro de notas de estudo",
      "Algibeira com 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.cortesao",
    name: "Cortesão",
    englishName: "Courtier",
    sourcePage: 147,
    skillProficiencies: ["intuicao", "persuasao"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Acesso à Corte",
    featureDescription: "Seu domínio das sutilezas do protocolo nobre e das redes de fofocas palacianas permite que você transite livremente por antecâmaras reais, conseguindo audiências com nobres influentes e magistrados de Faerûn.",
    startingEquipment: [
      "Conjunto de roupas finas",
      "Carta de apresentação de um nobre aliado",
      "Algibeira com 5 po"
    ]
  },
  {
    id: "dnd5e.scag.background.agente_da_faccao",
    name: "Agente da Facção",
    englishName: "Faction Agent",
    sourcePage: 147,
    skillProficiencies: ["intuicao", "investigacao"],
    toolProficiencies: [],
    languageChoices: 2,
    featureName: "Abrigo da Facção",
    featureDescription: "Como membro jurado de uma grande organização (como os Harpistas, a Ordem da Manopla, o Enclave Esmeralda, a Aliança dos Lordes ou os Zhentarim), você possui aliados dispostos a lhe fornecer esconderijo seguro, suprimentos e mensagens secretas.",
    startingEquipment: [
      "Distintivo ou símbolo secreto da facção",
      "Cópia de texto em código cifrado",
      "Conjunto de roupas comuns",
      "Algibeira com 15 po"
    ]
  },
  {
    id: "dnd5e.scag.background.viajante_distante",
    name: "Viajante Distante",
    englishName: "Far Traveler",
    sourcePage: 148,
    skillProficiencies: ["intuicao", "percepcao"],
    toolProficiencies: ["instrumento_musical"],
    languageChoices: 1,
    featureName: "Todos os Olhos em Você",
    featureDescription: "Seu sotaque exótico, maneirismos e aparência incomum despertam fascínio e curiosidade onde quer que você viaje ao longo da Costa da Espada, abrindo portas de curiosos e patronos interessados em suas histórias.",
    startingEquipment: [
      "Conjunto de roupas de viajante exóticas",
      "Instrumento musical de sua terra natal",
      "Pequeno mapa estilizado de sua região",
      "Pequena joia no valor de 10 po",
      "Algibeira com 5 po"
    ]
  },
  {
    id: "dnd5e.scag.background.herdeiro",
    name: "Herdeiro",
    englishName: "Inheritor",
    sourcePage: 150,
    skillProficiencies: ["sobrevivencia", "historia"],
    toolProficiencies: ["ferramentas_de_jogo"],
    languageChoices: 1,
    featureName: "Herança Notável",
    featureDescription: "Você é guardião de um legado familiar ou arcano singular — um documento selado, um anel misterioso ou um artefato ancestral — cuja natureza atrai o interesse de sábios, perseguidores ou patronos ao longo de sua jornada.",
    startingEquipment: [
      "A herança confiada a você",
      "Conjunto de roupas de viajante",
      "Conjunto de ferramentas de jogo",
      "Algibeira com 15 po"
    ]
  },
  {
    id: "dnd5e.scag.background.cavaleiro_da_ordem",
    name: "Cavaleiro da Ordem",
    englishName: "Knight of the Order",
    sourcePage: 151,
    skillProficiencies: ["persuasao", "religiao"],
    toolProficiencies: ["ferramentas_de_jogo"],
    languageChoices: 1,
    featureName: "Hospitalidade dos Cavaleiros",
    featureDescription: "Seus votos com uma ordem cavalheiresca reconhecida (como a Ordem do Coração Prateado ou Cavaleiros de Tyr) garantem a você e seus companheiros comida e abrigo em estalagens amigáveis, mosteiros e capelas fortificadas.",
    startingEquipment: [
      "Conjunto de roupas de viajante",
      "Símbolo ou insígnia da ordem de cavalaria",
      "Estandarte pessoal ou flâmula",
      "Algibeira com 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.mercenario_veterano",
    name: "Mercenário Veterano",
    englishName: "Mercenary Veteran",
    sourcePage: 152,
    skillProficiencies: ["atletismo", "persuasao"],
    toolProficiencies: ["ferramentas_de_jogo", "veiculos_terrestres"],
    languageChoices: 0,
    featureName: "Vida Mercenária",
    featureDescription: "Você conhece o modo de operação de tropas mercenárias como os Punhos Flamejantes ou os Escudos Negros. Você sabe como encontrar contratos de armas em tavernas de guarnição e é aceito em acampamentos e fortes militares.",
    startingEquipment: [
      "Uniforme de sua antiga companhia mercenária",
      "Insígnia de patente militar",
      "Conjunto de dados de osso ou baralho de cartas",
      "Conjunto de roupas comuns",
      "Algibeira com 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.cacador_de_recompensas_urbano",
    name: "Caçador de Recompensas Urbano",
    englishName: "Urban Bounty Hunter",
    sourcePage: 153,
    skillProficiencies: ["furtividade", "intuicao"],
    toolProficiencies: ["ferramentas_de_ladrao", "ferramentas_de_jogo"],
    languageChoices: 0,
    featureName: "Ouvido no Chão",
    featureDescription: "Você possui informantes e contatos nas vielas, tavernas e docas de grandes cidades. Você sabe a quem pagar para obter notícias rápidas sobre fugitivos e o paradeiro de figuras procuradas pela lei.",
    startingEquipment: [
      "Conjunto de roupas urbanas escuras e práticas",
      "Ferramentas de ladrão",
      "Algibeira com 20 po"
    ]
  },
  {
    id: "dnd5e.scag.background.membro_da_tribo_uthgardt",
    name: "Membro da Tribo Uthgardt",
    englishName: "Uthgardt Tribe Member",
    sourcePage: 153,
    skillProficiencies: ["atletismo", "sobrevivencia"],
    toolProficiencies: ["instrumento_musical"],
    languageChoices: 1,
    featureName: "Herança da Tribo",
    featureDescription: "Você preserva as lendas, os montes fúnebres sagrados e os costumes ancestrais dos bárbaros Uthgardt. Você é acolhido por membros de tribos amistosas e encontra caça e rotas seguras nos ermos do Norte.",
    startingEquipment: [
      "Conjunto de ferramentas de caça",
      "Roupas de peles de inverno",
      "Pequeno totem de seu animal ancestral",
      "Algibeira com 10 po"
    ]
  },
  {
    id: "dnd5e.scag.background.nobre_de_aguas_profundas",
    name: "Nobre de Águas Profundas",
    englishName: "Waterdhavian Noble",
    sourcePage: 154,
    skillProficiencies: ["historia", "persuasao"],
    toolProficiencies: ["ferramentas_de_jogo"],
    languageChoices: 1,
    featureName: "Graça de Águas Profundas",
    featureDescription: "Como descendente de uma das famílias patrícias da Cidade dos Esplendores, seu nome carrega peso e respeito no tribunal dos Lordes Mascarados, permitindo crédito ilimitado em estalagens e acesso à alta sociedade de Faerûn.",
    startingEquipment: [
      "Conjunto de roupas finas",
      "Anel de sinete com o brasão familiar",
      "Pergaminho com a árvore genealógica da casa nobre",
      "Algibeira com 20 po"
    ]
  }
];
