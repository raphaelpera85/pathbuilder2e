import { T20RaceRules } from "./t20Races";

const r = (
  id: string,
  name: string,
  sourcePage: number,
  abilityBonuses: string,
  attributeAdjustments: T20RaceRules["attributeAdjustments"],
  size: T20RaceRules["size"],
  speed: number,
  traits: string[],
  abilityChoices?: T20RaceRules["abilityChoices"],
  skillChoices?: number,
  skillOrFeatChoice?: T20RaceRules["skillOrFeatChoice"],
  raceChoices?: T20RaceRules["raceChoices"]
): T20RaceRules => ({
  id,
  name,
  sourcePage,
  abilityBonuses,
  attributeAdjustments,
  size,
  speed,
  traits,
  abilityChoices,
  skillChoices,
  skillOrFeatChoice,
  raceChoices
});

export const T20_AMEACAS_RACE_RULES: T20RaceRules[] = [
  r("bugbear", "Bugbear", 79, "Força +2, Destreza +1, Carisma -1", { str: 2, dex: 1, cha: -1 }, "Médio", 9, [
    "Empunhadura Poderosa: ao usar arma de tamanho maior, penalidade diminui para -2 (ou 0 se receber novamente)",
    "Saborear Pavor: pode usar Força para Intimidação; se criatura em alcance curto estiver abalada ou apavorada, recebe bônus no ataque igual à penalidade",
    "Sentidos de Predador: faro e visão no escuro"
  ]),
  r("centauro", "Centauro", 105, "Sabedoria +2, Força +1, Inteligência -1", { wis: 2, str: 1, int: -1 }, "Grande", 12, [
    "Avantajado: tamanho Grande e deslocamento 12m",
    "Cascos: arma natural (1d8, x2, impacto); com ação agredir, gasta 1 PM para ataque extra com cascos",
    "Ginete Natural: considerado montado para investidas e armas; pode escolher Carga de Cavalaria sem pré-requisitos; não se beneficia de montaria",
    "Medo de Altura: abalado se adjacente a queda de 3m ou mais"
  ]),
  r("ceratops", "Ceratops", 265, "Constituição +2, Força +1, Destreza -1, Inteligência -1", { con: 2, str: 1, dex: -1, int: -1 }, "Grande", 9, [
    "Chifres: arma natural (1d8, x2, perfuração); com ação agredir, gasta 1 PM para ataque extra com chifres",
    "Papel Tribal: treinado em Cura, Intimidação, Ofício ou Sobrevivência",
    "Paquidérmico: tamanho Grande, +1 na Defesa, pode usar Força para Intimidação",
    "Medo de Altura: abalado se adjacente a queda de 3m ou mais"
  ], undefined, 1),
  r("elfo_do_mar", "Elfo-do-Mar", 316, "Destreza +2, Constituição +1, Inteligência -1", { dex: 2, con: 1, int: -1 }, "Médio", 9, [
    "Arsenal do Oceano: proficiência e +2 em ataque com arpão, rede e tridente; pode considerá-las armas leves se receber novamente",
    "Cria das Águas: deslocamento natação igual ao terrestre, visão na penumbra; na água recebe percepção às cegas, +2 Defesa, Furtividade e Sobrevivência",
    "Dependência de Água: se passar mais de 1 dia sem contato com água, não recupera PM em descanso"
  ]),
  r("finntroll", "Finntroll", 339, "Inteligência +2, Constituição +1, Força -1", { int: 2, con: 1, str: -1 }, "Médio", 9, [
    "Corpo Vegetal: tipo monstro, natureza vegetal e visão no escuro",
    "Presença Arcana: +2 em Misticismo e resistência a magia +2",
    "Regeneração Vegetal: 1/rodada gasta 1 PM para curar 5 PV (exceto dano de ácido ou fogo)",
    "Intolerância a Luz: sensibilidade a luz; sob luz do sol não ativa Regeneração Vegetal"
  ]),
  r("gnoll", "Gnoll", 115, "Constituição +2, Sabedoria +1, Inteligência -1", { con: 2, wis: 1, int: -1 }, "Médio", 9, [
    "Faro: olfato apurado; não fica desprevenido e camuflagem total causa só 20% de falha contra inimigos em alcance curto não vistos",
    "Mordida: arma natural (1d6, x2, perfuração); com ação agredir, gasta 1 PM para ataque extra com mordida",
    "Oportunista: +2 em dano contra criaturas que sofreram dano de outros desde o último turno",
    "Rendição: recebe 1d4 PM temporários quando inimigo se rende; fica alquebrado se continuar lutando com 1/4 PV ou menos"
  ]),
  r("golem_desperto", "Golem Desperto (Novas Opções)", 134, "Força +1, Carisma -1 (cumulativo com Chassi e Tamanho)", { str: 1, cha: -1 }, "Médio", 6, [
    "Chassi Expandido: escolha material entre Barro, Bronze, Carne, Espelhos, Ferro, Gelo Eterno, Pedra ou Sucata",
    "Criatura Artificial: tipo construto, visão no escuro, imunidade a cansaço, efeitos metabólicos e veneno; inerte 8h por dia",
    "Fonte de Energia: escolha Alquímica, Elemental, Sagrada ou Vapor",
    "Propósito de Criação: sem origem, recebe um poder geral a sua escolha",
    "Tamanho Variável: Pequeno (+1 Des), Médio, ou Grande (-1 Des)"
  ], undefined, undefined, "general", [
    { id: "golem-chassi", label: "Material de Chassi", options: ["Barro (+2 Con)", "Bronze (+1 dois atributos)", "Carne (+2 Con, +1 For, -1 Car)", "Espelhos (+2 Car, +1 Sab, -1 Con)", "Ferro (+1 For, +1 Con, +2 Defesa)", "Gelo Eterno (+2 Con, imune frio, RD fogo 10)", "Pedra (+2 Con, RD corte/fogo/perfuração 5)", "Sucata (+1 For, +1 Con)"], count: 1 },
    { id: "golem-tamanho", label: "Categoria de Tamanho", options: ["Pequeno (+1 Destreza)", "Médio", "Grande (-1 Destreza)"], count: 1 }
  ]),
  r("harpia", "Harpia", 201, "Destreza +2, Carisma +1, Inteligência -1", { dex: 2, cha: 1, int: -1 }, "Médio", 9, [
    "Asas de Abutre: pairar a 1,5m do chão com deslocamento 12m (ignora terreno difícil, imune a dano de queda); gasta 1 PM/rodada para voar com deslocamento 12m",
    "Cria de Masmorra: tipo monstro, visão no escuro e +2 em Intimidação e Sobrevivência",
    "Grito Aterrorizante: ação padrão e 1 PM para deixar criaturas em alcance curto abaladas (Von CD Car evita)",
    "Pés Rapinantes: pés usados como mãos ou 2 armas naturais de garras (1d6, x2, corte); 1 PM ataque extra"
  ]),
  r("hobgoblin", "Hobgoblin", 84, "Constituição +2, Destreza +1, Carisma -1", { con: 2, dex: 1, cha: -1 }, "Médio", 9, [
    "Arte da Guerra: treinado em Guerra e proficiência em armas marciais (+2 dano se receber novamente)",
    "Metalurgia Hobgoblin: +2 em Ofício (armeiro), fabrica armas e armaduras superiores com 1 melhoria ou gasta apenas 1/4 do preço",
    "Táticas de Guerrilha: visão no escuro e +2 em Furtividade"
  ]),
  r("kallyanach", "Kallyanach", 151, "+2 em um atributo a sua escolha ou +1 em dois atributos a sua escolha", {}, "Médio", 9, [
    "Herança Dracônica: tipo monstro, redução de dano 5 contra ácido, eletricidade, fogo, frio, luz ou trevas",
    "Bênção de Kallyadranoch: escolha dois poderes (Armamento, Asas Dracônicas, Escamas Elementais, Prática Arcana, Sentidos Dracônicos, Sopro de Dragão)"
  ], { count: 2, amount: 1 }, undefined, undefined, [
    { id: "kallyanach-bencaos", label: "Bênçãos de Kallyadranoch", options: ["Armamento Kallyanach", "Asas Dracônicas", "Escamas Elementais", "Prática Arcana", "Sentidos Dracônicos", "Sopro de Dragão"], count: 2 }
  ]),
  r("kaijin", "Kaijin", 157, "Força +2, Constituição +1, Carisma -2", { str: 2, con: 1, cha: -2 }, "Médio", 9, [
    "Couraça Rubra: redução de dano 2; conta como poder da Tormenta sem perda de Carisma",
    "Cria da Tormenta: tipo monstro, +5 contra efeitos da Tormenta e lefeu; imune a efeitos da Tormenta que não afetam lefou",
    "Disforme: itens não mágicos exigem adaptação (+50% do preço, 1 dia); conta como poder da Tormenta sem perda de Carisma",
    "Terror Vivo: Força para Intimidação; recebe um poder da Tormenta a sua escolha sem perda de Carisma"
  ], undefined, undefined, "tormenta"),
  r("kappa", "Kappa", 158, "Destreza +2, Constituição +1, Carisma -1", { dex: 2, con: 1, cha: -1 }, "Médio", 9, [
    "Alma da Água: tipo espírito, natação igual ao deslocamento terrestre",
    "Carapaça Kappa: não pode ser flanqueado, cobertura leve submerso/caído; soma Con na Defesa até o nível sem armadura pesada (+2 se já somar)",
    "Cura das Águas: lança Curar Ferimentos (Sabedoria, custo diminui em -1 PM se aprender novamente)",
    "Tigela D’água: falha por 5+ em evitar agarrar/derrubar/empurrar derrama água e fica enjoado até reabastecer (ação padrão)"
  ]),
  r("kobolds", "Kobolds (Bando)", 183, "Destreza +2, Força -1", { dex: 2, str: -1 }, "Médio", 9, [
    "Ajuntamento Escamoso: criatura Média de dois braços; conta como Pequeno para espaços; rola 2 dados contra efeito de alvo único que não causa dano; vulnerabilidade a área",
    "Praga Monstruosa: tipo monstro, visão no escuro e +2 em Sobrevivência",
    "Sensibilidade a Luz: ofuscado sob luz do sol",
    "Talentos do Bando: escolha dois poderes entre Amontoados, Armadilha Terrível e outros"
  ], undefined, undefined, undefined, [
    { id: "kobolds-talentos", label: "Talentos do Bando", options: ["Amontoados (conta como Grande para espaço e manobras)", "Armadilha Terrível (magia de 1º círculo como armadilha)"], count: 2 }
  ]),
  r("mashin", "Mashin", 160, "+1 em dois atributos a sua escolha", {}, "Médio", 9, [
    "Chassi Mashin: +1 em dois atributos, treinado em duas perícias (pode trocar uma por maravilha mecânica), sempre Médio",
    "Maravilha Mecânica: poderes modulares avançados (Adaptação Elemental, Arma Acoplada, Arma Elemental, Auxílio de Mira)",
    "Criatura Artificial: tipo construto, visão no escuro, imunidades padrão de construto"
  ], { count: 2, amount: 1 }, 2, undefined, [
    { id: "mashin-maravilha", label: "Maravilha Mecânica", options: ["Adaptação Elemental", "Arma Acoplada", "Arma Elemental", "Auxílio de Mira"], count: 1 }
  ]),
  r("meio_orc", "Meio-Orc", 31, "Força +2, +1 em outro atributo (exceto Carisma)", { str: 2 }, "Médio", 9, [
    "Adaptável: +2 em Intimidação e treinado em uma perícia a sua escolha",
    "Criatura das Profundezas: visão no escuro e +2 em Percepção e Sobrevivência no subterrâneo",
    "Sangue Orc: +1 em dano com armas corpo a corpo e de arremesso; considerado orc"
  ], { count: 1, amount: 1, exclude: ["cha"] }, 1),
  r("minauro", "Minauro", 175, "Força +1, +1 em dois atributos", { str: 1 }, "Médio", 9, [
    "Faro: olfato apurado; não fica desprevenido e camuflagem total causa 20% falha em alcance curto",
    "Mente Aberta: +2 em Diplomacia e Investigação",
    "Plurivalente: recebe um poder geral a sua escolha"
  ], { count: 2, amount: 1 }, undefined, "general"),
  r("moreau", "Moreau", 303, "Variável por herança animal (+1 em atributo fixo e +1 em dois atributos a escolha)", {}, "Médio", 9, [
    "Herança Animal: escolha uma das 12 heranças de Moreania (Coruja, Hiena, Raposa, Serpente, Búfalo, Coelho, Crocodilo, Gato, Leão, Lobo, Morcego ou Urso)",
    "Sangue Humano: considerado humano para quaisquer fins"
  ], { count: 2, amount: 1 }, undefined, undefined, [
    {
      id: "moreau-heranca",
      label: "Herança Animal de Moreania",
      options: [
        "Coruja (+1 Sab; Espreitador, Garras, Sapiência)",
        "Hiena (+1 Sab; Destemor, Faro, Mordida)",
        "Raposa (+1 Int; Agarra-me Se Puderes, Esperteza Vulpina, Faro)",
        "Serpente (+1 Int; Arborícola, Constritor, Instintos Traiçoeiros)",
        "Búfalo (+1 For; Chifres, Faro, Marrada Impressionante)",
        "Coelho (+1 Des; Patas Ligeiras, Pé de Coelho, Senso de Preservação)",
        "Crocodilo (+1 Con; Mordida Poderosa, Predador Aquático, Surto Reptiliano)",
        "Gato (+1 Car; As Muitas Vidas de um Gato, Garras, Sentidos Felinos)",
        "Leão (+1 For; Mordida, Rugido Imponente, Sentidos da Realeza)",
        "Lobo (+1 Car; Faro, Mordida, Táticas de Matilha)",
        "Morcego (+1 Des; Asas, Criatura da Noite, Ecolocalização)",
        "Urso (+1 Con; Abraço de Urso [Grande], Faro, Mordida)"
      ],
      count: 1
    }
  ]),
  r("nagah", "Nagah", 333, "Macho: For +1, Des +1, Con +1 / Fêmea: Int +1, Sab +1, Car +1", {}, "Médio", 9, [
    "Cauda: arma natural (1d6, x2, impacto); com ação agredir, gasta 1 PM para ataque extra com cauda",
    "Inocência Dissimulada: +2 em Enganação; gasta 2 PM para substituir perícia baseada em Int, Sab ou Car por Enganação",
    "Presentes de Sszzaas: visão na penumbra, +1 na Defesa e resistência a veneno +5",
    "Fraquezas Ofídicas: +1 ponto de dano por dado de dano de frio; -5 contra Músicas de bardo"
  ], undefined, undefined, undefined, [
    { id: "nagah-genero", label: "Gênero do Nagah", options: ["Macho (Força +1, Destreza +1, Constituição +1)", "Fêmea (Inteligência +1, Sabedoria +1, Carisma +1)"], count: 1 }
  ]),
  r("nezumi", "Nezumi", 162, "Constituição +2, Destreza +1, Inteligência -1", { con: 2, dex: 1, int: -1 }, "Pequeno", 9, [
    "Empunhadura Poderosa: reduz para -2 a penalidade ao usar arma feita para tamanho maior (ou 0 se receber novamente)",
    "Pequeno, Mas Não Metade: tamanho Pequeno com deslocamento 9m, resistência a medo +5 contra criaturas maiores, +2 Intimidação",
    "Roedor: arma natural de mordida (1d6, x2, corte); 1 PM ataque extra; no crítico avaria armadura ou aumenta multiplicador",
    "Sentidos Murídeos: faro e visão na penumbra"
  ]),
  r("ogro", "Ogro", 40, "Força +3, Constituição +2, Inteligência -1, Carisma -1", { str: 3, con: 2, int: -1, cha: -1 }, "Grande", 9, [
    "Quanto Maior o Tamanho…: humanoide gigante, tamanho Grande, visão na penumbra",
    "…Maior a Porrada!: ao acertar ataque corpo a corpo, gasta 1 PM para causar +1d8 de dano",
    "Camada de Ingenuidade: -5 em Intuição e Vontade"
  ]),
  r("orc", "Orc", 33, "Força +2, Constituição +1, Inteligência -1", { str: 2, con: 1, int: -1 }, "Médio", 9, [
    "Feroz: +2 em dano com armas corpo a corpo e de arremesso (+4 até fim do próximo turno se sofrer dano)",
    "Habitante das Cavernas: visão no escuro, +2 em Percepção e Sobrevivência no subterrâneo; sensibilidade a luz",
    "Vigor Brutal: +2 em Fortitude e soma Força no total de pontos de vida"
  ]),
  r("pteros", "Pteros", 267, "Sabedoria +2, Destreza +1, Inteligência -1", { wis: 2, dex: 1, int: -1 }, "Médio", 9, [
    "Ligação Natural: ligação mental com criatura inteligente em alcance longo",
    "Mãos Rudimentares: não empunha itens normais sem adaptação prévia (+50% custo)",
    "Pés Rapinantes: duas garras (1d6 cada, x2, corte); 1 PM ataque extra",
    "Senhor dos Céus: pairar a 1,5m (9m); gasta 1 PM/rodada para voar 12m"
  ]),
  r("soterrado", "Soterrado (Variante Osteon)", 354, "+2 em três atributos diferentes (exceto Constituição), Constituição -2", { con: -2 }, "Médio", 9, [
    "Abraço Gélido: +2 em testes para agarrar; ataques desarmados e armas naturais causam +2 dano de frio",
    "Esquife de Gelo: redução de corte e perfuração 5 e redução de frio 10; sofre +1 dano por dado de dano de fogo",
    "Natureza Esquelética: tipo morto-vivo, imunidades e descanso de osteon"
  ], { count: 3, amount: 2, exclude: ["con"] }),
  r("tabrachi", "Tabrachi", 37, "Constituição +2, Força +1, Carisma -1", { con: 2, str: 1, cha: -1 }, "Médio", 9, [
    "Batráquio: visão na penumbra e deslocamento de natação igual ao terrestre",
    "Linguarudo: língua natural de alcance 3m (1d4, x2, impacto); versátil (+2 desarmar/derrubar); 1 PM ataque extra",
    "Saltador: +10 em testes de Atletismo para saltar"
  ]),
  r("tengu", "Tengu", 164, "Destreza +2, Inteligência +1", { dex: 2, int: 1 }, "Médio", 9, [
    "Asas Desorientadoras: benefícios de Finta Aprimorada; se já possuir esse poder, bônus em Enganação para finta aumenta para +5",
    "Caminhante do Céu: pairar a 1,5m (9m); gasta 1 PM/rodada para voar 12m (ocupa espaço de criatura maior)",
    "Espírito Corvino: tipo espírito, visão no escuro e +2 em Percepção"
  ]),
  r("trog_anao", "Trog Anão (Variante)", 39, "Constituição +4, Força +2, Destreza -1, Inteligência -2", { con: 4, str: 2, dex: -1, int: -2 }, "Médio", 6, [
    "Quase Anão: tipo monstro, visão no escuro, +1 PV por nível; deslocamento 6m não reduzido por armadura ou sobrecarga",
    "Mordida: arma natural (1d6, x2, perfuração); 1 PM ataque extra",
    "Sangue Frio: +1 ponto de dano adicional por dado de dano de frio",
    "Sobrevivente: rola dois dados em testes de resistência e usa o melhor resultado"
  ]),
  r("velocis", "Velocis", 268, "Destreza +2, Sabedoria +1, Inteligência -1", { dex: 2, wis: 1, int: -1 }, "Médio", 12, [
    "Através de Espinheiros: redução de corte e perfuração 2; sem redução de deslocamento por terreno difícil natural",
    "Sentidos Selvagens: +2 em Sobrevivência, visão na penumbra e faro",
    "Velocista da Planície: deslocamento 12m; pode usar Destreza em Atletismo; rola dois dados para correr ou saltar"
  ]),
  r("voracis", "Voracis", 270, "Destreza +2, Constituição +1, Inteligência -1", { dex: 2, con: 1, int: -1 }, "Médio", 9, [
    "Garras: duas armas naturais de garras (1d6 cada, x2, corte); 1 PM ataque extra",
    "Rainha da Selva: deslocamento de escalada 9m, +2 em Atletismo, +1 PV por nível ao descansar",
    "Sentidos Selvagens: +2 em Sobrevivência, visão na penumbra e faro"
  ]),
  r("yidishan", "Yidishan", 300, "+1 em três atributos diferentes (exceto Carisma), Carisma -2", { cha: -2 }, "Médio", 9, [
    "Híbrido Mecânico: tipo construto, visão no escuro, imunidade a cansaço, efeitos metabólicos e veneno; inerte 8h por dia",
    "Natureza Orgânica: treinado em uma perícia ou recebe um poder geral a sua escolha",
    "Peças Metálicas: +2 na Defesa, mas impõe penalidade de armadura de -2"
  ], { count: 3, amount: 1, exclude: ["cha"] }, 1, "general")
];

export const getT20AmeacasRaceRules = (id: string) => T20_AMEACAS_RACE_RULES.find((item) => item.id === id);
