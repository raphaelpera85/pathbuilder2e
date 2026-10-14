export const DND5E_GGTR_SOURCE_BOOK = "D&D 5e · Guia dos Mestres de Guilda de Ravnica";

export interface Dnd5eGgtrItem {
  id: string;
  name: string;
  englishName: string;
  category: "equipamento" | "arma" | "armadura";
  rarity: "comum" | "incomum" | "raro" | "muito_raro" | "lendario";
  attunement: boolean;
  attunementDetails?: string;
  sourcePage: number;
  description: string;
}

export const DND5E_GGTR_ITEMS: Dnd5eGgtrItem[] = [
  {
    id: "dnd5e.ggtr.item.sinete_de_guilda",
    name: "Sinete de Guilda",
    englishName: "Guild Signet",
    category: "equipamento",
    rarity: "incomum",
    attunement: true,
    attunementDetails: "Requer sintonia por um membro da guilda correspondente",
    sourcePage: 178,
    description: "Este anel ostenta o símbolo de uma das dez guildas de Ravnica e funciona como foco de conjuração para suas magias de guilda. Ele possui 3 cargas e recupera 1d3 cargas diariamente ao amanhecer. Você pode gastar cargas para conjurar certas magias menores da guilda ou ativar efeitos utilitários inerentes ao sindicato."
  },
  {
    id: "dnd5e.ggtr.item.estatueta_de_guilda",
    name: "Estatueta de Guilda",
    englishName: "Guild Keyrune",
    category: "equipamento",
    rarity: "raro",
    attunement: true,
    attunementDetails: "Requer sintonia por um membro da guilda correspondente",
    sourcePage: 177,
    description: "Uma pequena estatueta esculpida em pedra ou metal precioso representando o totem da guilda. Com uma ação, você pode pronunciar a palavra de comando para transformá-la na criatura guardiã da sua guilda (arconte, falcão mecânico, horror, escaravelho gigante, besta, dragão de mizzium, thrull alado, demônio, lobo ou krasis) por até 1 hora, agindo lealmente aos seus comandos."
  },
  {
    id: "dnd5e.ggtr.item.bracadeiras_do_ilusionista",
    name: "Braçadeiras do Ilusionista",
    englishName: "Illusionist's Bracers",
    category: "equipamento",
    rarity: "muito_raro",
    attunement: true,
    attunementDetails: "Requer sintonia por um conjurador",
    sourcePage: 178,
    description: "Poderosas braçadeiras criadas pela Casa Dimir. Sempre que você conjurar um truque em seu turno, pode usar uma ação bônus no mesmo turno para conjurar aquele mesmo truque uma segunda vez."
  },
  {
    id: "dnd5e.ggtr.item.aparato_de_mizzium",
    name: "Aparato de Mizzium",
    englishName: "Mizzium Apparatus",
    category: "equipamento",
    rarity: "incomum",
    attunement: true,
    attunementDetails: "Requer sintonia por um conjurador",
    sourcePage: 179,
    description: "Engenhoca Izzet de tubos e serpentinas de mizzium que se prende às suas costas. Você pode tentar conjurar uma magia da lista de magias da sua classe que você não conheça ou não tenha preparado, gastando um espaço de magia correspondente e realizando um teste de Inteligência (Arcanismo) com CD 10 + dobro do nível da magia. Em sucesso, a magia é conjurada normalmente; em falha, ocorre uma explosão ou efeito caótico imprevisível da tabela."
  },
  {
    id: "dnd5e.ggtr.item.armadura_de_mizzium",
    name: "Armadura de Mizzium",
    englishName: "Mizzium Armor",
    category: "armadura",
    rarity: "incomum",
    attunement: false,
    sourcePage: 179,
    description: "Forjada a partir de uma liga avermelhada e ultrarresistente de mizzium. Enquanto estiver vestindo esta armadura média ou pesada, qualquer acerto crítico contra você torna-se um acerto normal. Além disso, se você for alvo de um efeito mágico que permita salvaguarda de Força ou Constituição para reduzir dano pela metade, você não sofre dano em caso de sucesso."
  },
  {
    id: "dnd5e.ggtr.item.morteiro_de_mizzium",
    name: "Morteiro de Mizzium",
    englishName: "Mizzium Mortar",
    category: "arma",
    rarity: "raro",
    attunement: false,
    sourcePage: 179,
    description: "Um canhão de mão de mizzium acoplado ao antebraço. Com uma ação, você pode disparar um projétil explosivo a até 18 metros que explode em fogo causando 5d4 de dano de fogo (salvaguarda de Destreza CD 15 reduz à metade). Alternativamente, pode sobrecarregar a arma para detonar um cone de 9 metros causando 5d8 de dano de fogo."
  },
  {
    id: "dnd5e.ggtr.item.tinta_marcador_de_humor",
    name: "Tinta Marcador de Humor",
    englishName: "Moodmark Paint",
    category: "equipamento",
    rarity: "comum",
    attunement: false,
    sourcePage: 180,
    description: "Pigmento luminescente especial usado para desenhar tatuagens e runas no rosto ou corpo. O pigmento brilha e muda de cor suavemente de acordo com suas emoções ou concentração, concedendo vantagem em testes de Atuação ou Intimidação durante 8 horas após a aplicação."
  },
  {
    id: "dnd5e.ggtr.item.escudo_do_paria",
    name: "Escudo do Pária",
    englishName: "Pariah's Shield",
    category: "armadura",
    rarity: "raro",
    attunement: true,
    sourcePage: 180,
    description: "Um escudo maciço decorado com o brasão de Boros. Enquanto estiver empunhando este escudo, você ganha +1 de bônus na CA para cada criatura aliada a até 1,5m de você (até o máximo de +3). Além disso, quando um aliado a até 1,5m de você sofre dano, você pode usar sua reação para tomar esse dano em seu lugar."
  },
  {
    id: "dnd5e.ggtr.item.mascara_peregrina",
    name: "Máscara Peregrina",
    englishName: "Peregrine Mask",
    category: "equipamento",
    rarity: "incomum",
    attunement: true,
    sourcePage: 180,
    description: "Uma máscara esculpida no formato da cabeça de um falcão. Enquanto estiver usando esta máscara, você ganha um deslocamento de voo de 18 metros e tem vantagem em todas as rolagens de Iniciativa."
  },
  {
    id: "dnd5e.ggtr.item.piroconvergente",
    name: "Piroconvergente",
    englishName: "Pyroconverger",
    category: "equipamento",
    rarity: "incomum",
    attunement: false,
    sourcePage: 180,
    description: "Um lançador de chamas portátil desenvolvido pela Liga Izzet. Com uma ação, você dispara uma labareda em cone de 3 metros causando 4d6 de dano de fogo a todas as criaturas na área (salvaguarda de Destreza CD 13 reduz à metade). A cada uso subsequente antes de um descanso longo, você deve rolar 1d10; se tirar um número igual ou menor que o total de usos anteriores, o aparelho explode causando 4d6 de dano de fogo ao usuário e quebra."
  },
  {
    id: "dnd5e.ggtr.item.faca_ritual_de_rakdos",
    name: "Faca Ritual de Rakdos",
    englishName: "Rakdos Riteknife",
    category: "arma",
    rarity: "lendario",
    attunement: true,
    sourcePage: 180,
    description: "Uma adaga cruel ornamentada com crânios de prata. Você ganha +1 de bônus nas jogadas de ataque e dano feitas com ela. Sempre que você matar uma criatura com a adaga, ela aprisiona a alma do alvo (até um máximo de 5 almas). Cada alma confere 1d4 de dano necrótico extra aos ataques da faca. Você pode liberar almas aprisionadas com ações especiais para se curar (1d10 por alma) ou aniquilar a mente de um inimigo."
  },
  {
    id: "dnd5e.ggtr.item.bastao_ofuscador_celeste",
    name: "Bordão Ofuscador Celeste",
    englishName: "Skyblinder Staff",
    category: "arma",
    rarity: "incomum",
    attunement: true,
    sourcePage: 181,
    description: "Um bordão mágico esculpido com penas de águia que concede +1 nas jogadas de ataque e dano. Criaturas voadoras têm desvantagem em jogadas de ataque contra você enquanto você empunhar este bordão, e criaturas com deslocamento de voo não podem realizar ataques de oportunidade contra você."
  },
  {
    id: "dnd5e.ggtr.item.forjador_do_sol",
    name: "Forjador do Sol",
    englishName: "Sunforger",
    category: "arma",
    rarity: "raro",
    attunement: true,
    sourcePage: 181,
    description: "Um magnífico martelo de guerra forjado pelos anjos de Boros. Você ganha +2 de bônus em jogadas de ataque e dano. Ele possui a propriedade de arremesso (distância 6/18m) e retorna voando para sua mão imediatamente após o ataque. Com uma reação ao ser atacado ou ver um aliado a até 9m ser atacado, você pode fazer o martelo liberar uma magia protetora armazenada."
  },
  {
    id: "dnd5e.ggtr.item.espada_dos_paruns",
    name: "Espada dos Paruns",
    englishName: "Sword of the Paruns",
    category: "arma",
    rarity: "raro",
    attunement: true,
    sourcePage: 182,
    description: "Uma espada longa mágica +1 que encarna o comando supremo dos fundadores de Ravnica. Como uma ação bônus em seu turno, você pode ordenar que um aliado a até 18 metros que possa ouvi-lo faça imediatamente um ataque com arma ou se mova até metade de seu deslocamento como uma reação."
  },
  {
    id: "dnd5e.ggtr.item.bastao_do_viajante",
    name: "Bordão do Viajante",
    englishName: "Voyager Staff",
    category: "arma",
    rarity: "muito_raro",
    attunement: true,
    attunementDetails: "Requer sintonia por um conjurador",
    sourcePage: 182,
    description: "Um bordão adornado com pedras azuis e runas de teletransporte que concede +1 nas jogadas de ataque e salvaguardas de magia. Ele possui 10 cargas e recupera 1d6 + 4 cargas diariamente. Você pode gastar cargas para conjurar passo nebuloso (2 cargas), piscar (3 cargas), viagem planar (7 cargas) ou teletransporte (7 cargas)."
  }
];
