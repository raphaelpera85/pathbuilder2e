export const DND5E_SCAG_SOURCE_BOOK = "D&D 5e · Guia de Aventureiros da Costa da Espada";

export interface Dnd5eSubclassFeature {
  level: number;
  name: string;
  description: string;
}

export interface Dnd5eScagSubclass {
  id: string;
  classId: string;
  name: string;
  englishName: string;
  featureLevel: number;
  sourcePage: number;
  restriction?: string;
  description: string;
  features: Dnd5eSubclassFeature[];
}

export const DND5E_SCAG_SUBCLASSES: Dnd5eScagSubclass[] = [
  {
    id: "dnd5e.scag.subclass.barbaro_furioso_da_batalha",
    classId: "barbaro",
    name: "Caminho do Furioso da Batalha",
    englishName: "Path of the Battlerager",
    featureLevel: 3,
    sourcePage: 121,
    restriction: "Apenas anões",
    description: "Conhecidos como Kuldjargh em anão, furiosos da batalha vestem armaduras volumosas cobertas de espinhos pontiagudos e se atiram de cabeça no combate corpo a corpo.",
    features: [
      {
        level: 3,
        name: "Armadura com Espinhos",
        description: "Você ganha a habilidade de usar armadura com espinhos como uma arma. Quando estiver em fúria usando armadura com espinhos, pode usar uma ação bônus para fazer um ataque corpo a corpo contra um alvo a até 1,5m causando 1d4 de dano perfurante. Além disso, ao agarrar uma criatura com sucesso, causa 3 de dano perfurante a ela."
      },
      {
        level: 6,
        name: "Entrega Imprudente",
        description: "Quando você usar Ataque Imprudente durante a fúria, também ganha pontos de vida temporários iguais ao seu modificador de Constituição (mínimo de 1). Eles desaparecem quando a fúria termina."
      },
      {
        level: 10,
        name: "Investida com Espinhos",
        description: "Quando estiver em fúria, você pode usar a ação Disparada como uma ação bônus."
      },
      {
        level: 14,
        name: "Retribuição Farpada",
        description: "Quando uma criatura a até 1,5m de você acerta um ataque corpo a corpo contra você enquanto estiver vestindo sua armadura com espinhos e em fúria, ela sofre 3 de dano perfurante."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.clerigo_dominio_do_arcano",
    classId: "clerigo",
    name: "Domínio do Arcano",
    englishName: "Arcana Domain",
    featureLevel: 1,
    sourcePage: 125,
    description: "A magia é uma energia que permeia o cosmos, dominada por deuses arcanos como Mystra e Azuth. Clérigos do Arcano unem a devoção aos mistérios divinos ao controle prático da Teia arcana.",
    features: [
      {
        level: 1,
        name: "Iniciado Arcano",
        description: "Você ganha proficiência na perícia Arcanismo e aprende dois truques à sua escolha da lista de magias de Mago. Para você, esses truques contam como truques de clérigo."
      },
      {
        level: 2,
        name: "Canalizar Divindade: Banimento Arcano",
        description: "Você pode usar seu Canalizar Divindade para esconjurar criaturas extraplanares. Como uma ação, apresenta seu símbolo sagrado: cada celestial, corruptor, elemental ou aberração a até 9m deve ter sucesso em um TR de Sabedoria ou é expulso por 1 minuto ou até sofrer dano."
      },
      {
        level: 6,
        name: "Destruidor de Magia",
        description: "Quando você conjura uma magia de cura de 1º círculo ou maior em um aliado, você também pode encerrar uma magia de nível igual ou menor ao espaço de magia gasto que esteja afetando aquele aliado."
      },
      {
        level: 8,
        name: "Conjuração Potencializada",
        description: "Você adiciona seu modificador de Sabedoria ao dano que você causa com qualquer truque de clérigo."
      },
      {
        level: 17,
        name: "Mestre Arcano",
        description: "Você escolhe quatro magias da lista de mago: uma de 6º círculo, uma de 7º círculo, uma de 8º círculo e uma de 9º círculo. Você as adiciona à sua lista de magias de domínio preparadas."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.guerreiro_cavaleiro_dragao_purpura",
    classId: "guerreiro",
    name: "Cavaleiro Dragão Púrpura",
    englishName: "Purple Dragon Knight",
    featureLevel: 3,
    sourcePage: 128,
    restriction: "Cavaleiros de Cormyr",
    description: "Cavaleiros Dragão Púrpura (ou Estandartes) são líderes heroicos dedicados a proteger a civilização, inspirando seus companheiros com bravura inabalável nos campos de batalha de Faerûn.",
    features: [
      {
        level: 3,
        name: "Brado da União",
        description: "Quando você usa sua característica Retomar o Fôlego, até três aliados à sua escolha a até 18m de você recuperam pontos de vida iguais ao seu nível de guerreiro, desde que possam ver ou ouvir você."
      },
      {
        level: 7,
        name: "Enviado Real",
        description: "Você ganha proficiência na perícia Persuasão. Se já for proficiente nela, você dobra seu bônus de proficiência para testes que a utilizem. Você também aprende um idioma adicional."
      },
      {
        level: 10,
        name: "Surto Inspirador",
        description: "Quando você usa seu Surto de Ação, pode escolher um aliado a até 18m. Essa criatura pode usar sua reação para fazer um ataque corpo a corpo ou à distância com uma arma."
      },
      {
        level: 15,
        name: "Bastião",
        description: "Quando você usar sua característica Indomável para rolar novamente um teste de resistência de Inteligência, Sabedoria ou Carisma e não falhar, pode escolher um aliado a até 18m que tenha falhado no mesmo efeito; aquele aliado pode rolar novamente o teste."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.monge_caminho_da_morte_longa",
    classId: "monge",
    name: "Caminho da Morte Longa",
    englishName: "Way of the Long Death",
    featureLevel: 3,
    sourcePage: 130,
    description: "Monges do Caminho da Morte Longa são obcecados pelos momentos finais da vida e pela mecânica da morte, capturando a energia vital dos moribundos para estender a sua própria resiliência.",
    features: [
      {
        level: 3,
        name: "Toque da Morte",
        description: "Quando você reduz uma criatura a até 1,5m a 0 PV, você ganha pontos de vida temporários iguais ao seu modificador de Sabedoria + seu nível de monge (mínimo de 1)."
      },
      {
        level: 6,
        name: "Hora da Colheita",
        description: "Como uma ação, você pode exibir a presença da morte. Cada criatura a até 9m de você que possa ver você precisa ter sucesso em um TR de Sabedoria ou ficará amedrontada até o final do seu próximo turno."
      },
      {
        level: 11,
        name: "Maestria da Morte",
        description: "Quando você for reduzido a 0 pontos de vida, você pode gastar 1 ponto de ki (sem usar ação) para, em vez disso, ficar com 1 ponto de vida."
      },
      {
        level: 17,
        name: "Toque da Morte Longa",
        description: "Como uma ação, você toca uma criatura e gasta de 1 a 10 pontos de ki. O alvo precisa ter sucesso em um TR de Constituição ou sofre 2d10 de dano necrótico por ponto de ki gasto (metade no sucesso)."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.monge_caminho_da_alma_do_sol",
    classId: "monge",
    name: "Caminho da Alma do Sol",
    englishName: "Way of the Sun Soul",
    featureLevel: 3,
    sourcePage: 131,
    description: "Monges da Alma do Sol aprendem a canalizar a própria luz interior de seu espírito divino, disparando rajadas abrasadoras de luz solar e criando casulos luminosos de proteção radiante.",
    features: [
      {
        level: 3,
        name: "Projétil Solar Radiante",
        description: "Você pode disparar projéteis de energia radiante. Trata-se de um ataque à distância com magia com alcance de 9m. O dano é radiante e o dado é igual ao dado de dano de suas Artes Marciais. Você pode gastar 1 ki para fazer dois ataques com ação bônus."
      },
      {
        level: 6,
        name: "Ataque Semicircular Doloroso",
        description: "Imediatamente após realizar a ação de Ataque no seu turno, você pode gastar 2 pontos de ki para conjurar Mãos Flamejantes como uma ação bônus (podendo gastar ki adicional para aumentar o círculo)."
      },
      {
        level: 11,
        name: "Explosão Solar Dolorosa",
        description: "Como uma ação, você cria uma orbe luminosa em até 45m que explode em uma esfera de 6m de raio. Cada criatura deve passar em TR de Constituição ou sofre 2d6 de dano radiante (+2d6 para cada ponto de ki adicional até 3)."
      },
      {
        level: 17,
        name: "Escudo do Sol",
        description: "Você emana uma aura luminosa contínua de 9m de luz plena. Quando uma criatura acertar você com um ataque corpo a corpo, você pode usar sua reação para causar dano radiante a ela igual a 5 + seu modificador de Sabedoria."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.paladino_juramento_da_coroa",
    classId: "paladino",
    name: "Juramento da Coroa",
    englishName: "Oath of the Crown",
    featureLevel: 3,
    sourcePage: 132,
    description: "O Juramento da Coroa é a lealdade incondicional aos ideais da civilização, às leis de uma nação e ao trono justo de seu soberano, colocando o dever acima de ambições individuais.",
    features: [
      {
        level: 3,
        name: "Dogmas da Coroa",
        description: "Lei, Lealdade, Coragem e Responsabilidade orientam cada ato do paladino da coroa diante do povo e dos inimigos da ordem."
      },
      {
        level: 3,
        name: "Canalizar Divindade: Desafio do Campeão",
        description: "Como uma ação bônus, você desafia cada criatura hostil à sua escolha a até 9m. Cada criatura deve ter sucesso em um TR de Sabedoria ou não poderá se afastar voluntariamente a mais de 9m de você."
      },
      {
        level: 3,
        name: "Canalizar Divindade: Maré de Reviravolta",
        description: "Como uma ação bônus, você concede cura a cada aliado a até 9m que possa ouvir você e tenha metade ou menos de seus PV máximos, curando 1d6 + modificador de Carisma."
      },
      {
        level: 7,
        name: "Fidelidade Divina",
        description: "Quando uma criatura a até 1,5m de você sofrer dano, você pode usar sua reação para absorver magicamente todo o dano em vez da criatura."
      },
      {
        level: 15,
        name: "Espírito Inquebrável",
        description: "Você tem vantagem em testes de resistência contra ficar paralisado ou atordoado."
      },
      {
        level: 20,
        name: "Campeão Exaltado",
        description: "Por 1 hora (1x/descanso longo), você ganha resistência a dano de concussão, perfuração e corte de armas não mágicas; aliados a até 9m ganham vantagem em salvaguardas contra a morte e você e aliados ganham vantagem em TRs de Sabedoria."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.ladino_manipulador",
    classId: "ladino",
    name: "Manipulador",
    englishName: "Mastermind",
    featureLevel: 3,
    sourcePage: 135,
    description: "Manipuladores operam na sombra dos segredos e da política, coordenando espiões, orquestrando artimanhas e decifrando intuitivamente os pontos fracos de rivais e cortesãos.",
    features: [
      {
        level: 3,
        name: "Mestre da Intriga",
        description: "Você ganha proficiência com kit de disfarce, kit de falsificação e um conjunto de jogos à sua escolha. Também aprende dois idiomas e pode imitar sotaques com perfeição após 1 minuto de escuta."
      },
      {
        level: 3,
        name: "Mestre Tático",
        description: "Você pode usar a ação Ajudar como uma ação bônus. Além disso, quando usar Ajudar para orientar um aliado em um ataque, o alcance do aliado alvo aumenta para 9 metros."
      },
      {
        level: 9,
        name: "Manipulador Intuitivo",
        description: "Se passar pelo menos 1 minuto observando uma criatura fora de combate, descobre se ela é seu igual, superior ou inferior em Inteligência, Sabedoria, Carisma ou nível de classe."
      },
      {
        level: 13,
        name: "Falsas Cores",
        description: "Você pode manobrar uma criatura para receber o ataque destinado a você: ao ser alvo de um ataque enquanto outra criatura fornecer cobertura, pode usar sua reação para direcionar o ataque contra essa criatura."
      },
      {
        level: 17,
        name: "Alma Trapaceira",
        description: "Seus pensamentos não podem ser lidos por telepatia ou outras magias sem sua permissão. Testes para discernir se você mente sempre indicam que você diz a verdade, e você é imune a magias que forçam a dizer a verdade."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.ladino_espadachim",
    classId: "ladino",
    name: "Espadachim",
    englishName: "Swashbuckler",
    featureLevel: 3,
    sourcePage: 135,
    description: "Espadachins colocam elegância, carisma e audácia veloz no centro da esgrima, desarmando inimigos com acrobacias refinadas e duelando individualmente com letalidade cirúrgica.",
    features: [
      {
        level: 3,
        name: "Passo Elegante",
        description: "Durante seu turno, se você fizer um ataque corpo a corpo contra uma criatura, essa criatura não pode fazer ataques de oportunidade contra você no resto daquele turno."
      },
      {
        level: 3,
        name: "Audácia Devassa",
        description: "Você adiciona seu modificador de Carisma às suas rolagens de Iniciativa. Você também não precisa de vantagem para desferir Ataque Furtivo se estiver a até 1,5m do alvo, desde que nenhuma outra criatura esteja a 1,5m de você e você não tenha desvantagem."
      },
      {
        level: 9,
        name: "Penachar",
        description: "Como uma ação, faça um teste de Atuação resistido por Intuição de uma criatura a até 18m. No combate, ela sofre desvantagem em ataques contra qualquer alvo que não seja você. Fora de combate, fica enfeitiçada por 1 minuto."
      },
      {
        level: 13,
        name: "Manobra Elegante",
        description: "Você pode usar uma ação bônus para ganhar vantagem no próximo teste de Atletismo ou Acrobacia que fizer no mesmo turno."
      },
      {
        level: 17,
        name: "Mestre Duelista",
        description: "Se você errar uma rolagem de ataque, pode rolar novamente com vantagem (1x por descanso curto ou longo)."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.feiticeiro_feiticaria_da_tempestade",
    classId: "feiticeiro",
    name: "Feitiçaria da Tempestade",
    englishName: "Storm Sorcery",
    featureLevel: 1,
    sourcePage: 137,
    description: "Sua magia inata descende do poder furioso dos ventos, trovões e tempestades que varrem os mares e montanhas, permitindo pairar sobre correntes de ar com velocidade sobrenatural.",
    features: [
      {
        level: 1,
        name: "Orador do Vento",
        description: "Você aprende a falar, ler e escrever o idioma Primordial (incluindo os dialetos Aquan, Auran, Ignan e Terran)."
      },
      {
        level: 1,
        name: "Magia Tempestuosa",
        description: "Sempre que conjurar uma magia de 1º círculo ou maior, você pode usar uma ação bônus para voar até 3 metros antes ou depois de conjurá-la, sem provocar ataques de oportunidade."
      },
      {
        level: 6,
        name: "Coração da Tempestade",
        description: "Você ganha resistência a dano elétrico e dano trovejante. Ao conjurar magia de relâmpago ou trovão, criaturas à sua escolha a até 3m sofrem dano elétrico ou trovejante igual a metade do seu nível de feiticeiro."
      },
      {
        level: 6,
        name: "Guia da Tempestade",
        description: "Você pode controlar o clima ao seu redor: como ação, pode parar a chuva em um raio de 6m ou redirecionar a direção dos ventos ao seu redor."
      },
      {
        level: 14,
        name: "Fúria da Tempestade",
        description: "Ao ser atingido por um ataque corpo a corpo, você pode usar sua reação para causar dano elétrico ao atacante igual ao seu nível de feiticeiro; ele também deve passar em TR de Força ou é empurrado 6m."
      },
      {
        level: 18,
        name: "Alma do Vento",
        description: "Você ganha imunidade a dano elétrico e trovejante, além de deslocamento de voo de 18m. Você também pode reduzir a velocidade de voo para conceder deslocamento de voo a até 3x Carisma aliados."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.bruxo_o_eterno",
    classId: "bruxo",
    name: "O Eterno",
    englishName: "The Undying",
    featureLevel: 1,
    sourcePage: 139,
    description: "Seu patrono triunfou sobre a mortalidade através de magia ancestral — seja um lorde múmia, um arquilich como Larloch ou Vecna, ou os elfos imperecíveis da Corte sem Morte.",
    features: [
      {
        level: 1,
        name: "Aos Portões da Morte",
        description: "Você aprende o truque Poupar os Moribundos (conta como truque de bruxo). Você tem vantagem em testes de resistência contra doenças. Mortos-vivos precisam passar em TR de Sabedoria para atacar você diretamente."
      },
      {
        level: 6,
        name: "Desafiar a Morte",
        description: "Você recupera pontos de vida iguais a 1d8 + modificador de Constituição quando tiver sucesso em uma salvaguarda contra a morte ou ao estabilizar uma criatura com Poupar os Moribundos (1x por descanso longo)."
      },
      {
        level: 10,
        name: "Natureza Imortal",
        description: "Você pode prender a respiração indefinidamente e não precisa de comida, água ou sono (embora ainda precise de descanso para aliviar exaustão). Você envelhece apenas 1 ano para cada 10 anos vividos."
      },
      {
        level: 14,
        name: "Vida Indestrutível",
        description: "Em seu turno, você pode usar uma ação bônus para recuperar 1d8 + nível de bruxo pontos de vida. Além disso, se você recolocar um membro cortado em seu corpo enquanto usa esta característica, o membro se reconecta instantaneamente."
      }
    ]
  },
  {
    id: "dnd5e.scag.subclass.mago_laminas_cantantes",
    classId: "mago",
    name: "Lâminas Cantantes",
    englishName: "Bladesinging",
    featureLevel: 2,
    sourcePage: 141,
    restriction: "Apenas elfos e meio-elfos",
    description: "Lâminas Cantantes são elfos guerreiros-magos que praticam uma forma tradicional e elegante de esgrima fundamentada em harmonia arcana e mobilidade sobrenatural.",
    features: [
      {
        level: 2,
        name: "Treinamento na Guerra e na Canção",
        description: "Você ganha proficiência com armaduras leves e com uma arma corpo a corpo de uma mão à sua escolha. Também ganha proficiência na perícia Atuação."
      },
      {
        level: 2,
        name: "Canção da Lâmina",
        description: "Com uma ação bônus, você ativa a Canção da Lâmina por 1 minuto: soma Inteligência à sua CA, deslocamento aumenta em +3m, ganha vantagem em Acrobacia e adiciona Inteligência em testes de concentração de magia."
      },
      {
        level: 6,
        name: "Ataque Extra",
        description: "Você pode atacar duas vezes em vez de uma sempre que realizar a ação de Ataque no seu turno. Além disso, você pode conjurar um dos seus truques no lugar de um desses ataques."
      },
      {
        level: 10,
        name: "Canção de Defesa",
        description: "Ao sofrer dano enquanto sua Canção da Lâmina estiver ativa, você pode usar sua reação e gastar um espaço de magia para reduzir o dano sofrido em 5 vezes o círculo do espaço gasto."
      },
      {
        level: 14,
        name: "Canção de Vitória",
        description: "Você adiciona seu modificador de Inteligência (mínimo de 1) às rolagens de dano de seus ataques corpo a corpo com arma enquanto sua Canção da Lâmina estiver ativa."
      }
    ]
  }
];
