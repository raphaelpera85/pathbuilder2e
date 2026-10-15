/**
 * Tormenta20 - Só Aventuras (Jambô Editora, 2022)
 * Dados canônicos extraídos factualmente do suplemento oficial (163 páginas).
 * 
 * Contém:
 * - 7 Itens (armas marciais, exóticas, armaduras pesadas/médias e artefatos de Arton)
 * - 29 Poderes / Parceiros / Regras e Ritos Matrimoniais do Panteão
 */

export const T20_SO_AVENTURAS_SOURCE_BOOK = "T20 - Só Aventuras";

export interface T20SoAventurasItem {
  id: string;
  name: string;
  category: "weapon" | "armor" | "equipment" | "artifact";
  itemType: string;
  price: number;
  spaces: number;
  hands?: number;
  damage?: string;
  critical?: string;
  damageType?: string;
  defenseBonus?: number;
  armorPenalty?: number;
  description: string;
  sourcePage: number;
}

export interface T20SoAventurasFeat {
  id: string;
  name: string;
  category: "parceiro" | "tatica" | "sobrenatural" | "matrimonio";
  prerequisites: string | null;
  description: string;
  sourcePage: number;
}

export const T20_SO_AVENTURAS_ITEMS: T20SoAventurasItem[] = [
  // --- Armas ---
  {
    id: "t20.sa.item.gladio",
    name: "Gládio",
    category: "weapon",
    itemType: "Arma Marcial de Uma Mão",
    price: 12,
    spaces: 1,
    hands: 1,
    damage: "1d6",
    critical: "19/x3",
    damageType: "Perfuração",
    description: "Uma espada de lâmina curta, mas pesada, e sem guarda. O gládio tem uma ponta muito afiada, capaz de infligir ferimentos precisos e letais. É uma das armas padrão dos legionários do Império de Tauron.",
    sourcePage: 51
  },
  {
    id: "t20.sa.item.presa_de_serpente",
    name: "Presa de Serpente",
    category: "weapon",
    itemType: "Arma Exótica de Uma Mão",
    price: 1000,
    spaces: 1,
    hands: 1,
    damage: "1d8",
    critical: "17",
    damageType: "Corte",
    description: "Esta arma é uma espada feita de obsidiana — um tipo de vidro vulcânico negro, formado quando a lava esfria rapidamente. A obsidiana pode ser trabalhada para ficar mais afiada que o aço, mas é mais frágil. Como o material é encontrado perto de vulcões, as dragoas caçadoras acreditam que ele é uma dádiva da Divina Serpente — por isso o nome da arma. Seu gume extremamente afiado causa ferimentos terríveis; em um acerto crítico, o dano da arma aumenta em um passo (antes de ser multiplicado). Uma presa de serpente não pode receber a modificação material especial. Devido a sua fragilidade, exige treinamento especial para ser empunhada sem quebrar, sendo classificada como arma exótica.",
    sourcePage: 147
  },

  // --- Artefatos e Relíquias ---
  {
    id: "t20.sa.item.calice_dos_contos",
    name: "O Cálice dos Contos",
    category: "artifact",
    itemType: "Artefato Inteligente",
    price: 0,
    spaces: 1,
    description: "Um cálice simples feito de bronze, outrora usado pelos clérigos de Azgher para garantir o respeito às tradições de hospitalidade. Profanado por Tenebra, carrega a marca de sua bênção e maldição, ocultando sua natureza mágica. Aqueles que contam uma história e bebem dele aprisionam uma parte de sua alma no objeto. Quem o segura pode ordenar ao cálice que apague todas as histórias contidas; com isso, toda pessoa aprisionada perde 3d6 PV por nível de personagem (Vontade CD Sab evita). Se alguém morrer com sua história presa no cálice, pode ser reanimado como zumbi para servir ao portador, conforme a magia Servo Morto-vivo.",
    sourcePage: 41
  },
  {
    id: "t20.sa.item.mesa_dos_santos_solares",
    name: "A Mesa dos Santos Solares",
    category: "artifact",
    itemType: "Artefato Inteligente",
    price: 0,
    spaces: 1,
    description: "Pequena mesa de ébano inteligente que cresce com um comando verbal e torna-se uma ampla mesa de jantar redonda para até doze pessoas. Uma vez por dia, cria uma refeição sob efeito da magia Abençoar Alimentos, lendo mentes e materializando o prato favorito de cada comensal. Profanada por Tenebra, a mesa consome a essência de quem a utiliza por mais de dez dias seguidos: exige teste de Fortitude CD 30 sob pena de enjoar permanentemente ao ver, comer ou cheirar sua comida favorita, e testes subsequentes de Vontade CD 10 para evitar perda permanente de 1 ponto de Sabedoria a cada nova refeição.",
    sourcePage: 44
  },
  {
    id: "t20.sa.item.espada_de_sir_gorboduc",
    name: "A Espada de Sir Gorboduc",
    category: "artifact",
    itemType: "Arma Mágica Lendária",
    price: 0,
    spaces: 1,
    hands: 1,
    damage: "1d8",
    critical: "19",
    damageType: "Corte",
    description: "Espada mágica sagrada bondosa pertencente aos heróis do povo de Prado Verde. Trata-se de uma relíquia consagrada com consciência moral e inteligência inerente: se apropriada por roubo ou empunhada por indivíduos sem a bênção da comunidade e sem virtude heroica comprovada, torna-se completamente inerte e inútil em combate até ser devolvida aos seus guardiões legítimos.",
    sourcePage: 33
  },

  // --- Armaduras e Equipamentos Especiais ---
  {
    id: "t20.sa.item.couraca_do_comando",
    name: "Couraça do Comando",
    category: "armor",
    itemType: "Armadura Média",
    price: 3000,
    spaces: 2,
    defenseBonus: 5,
    armorPenalty: -4,
    description: "Couraça de bronze e aço reforçado gravada com os símbolos da legião de Tauron. O usuário recebe +2 em testes de Guerra e Intimidação. Além disso, aliados sob o comando do usuário em alcance médio recebem +1 em testes de perícia durante combates táticos.",
    sourcePage: 51
  },
  {
    id: "t20.sa.item.armadura_de_ferro_trobo",
    name: "Armadura de Ferro para Montaria / Construto",
    category: "armor",
    itemType: "Armadura Pesada Especial",
    price: 500,
    spaces: 3,
    defenseBonus: 6,
    armorPenalty: -4,
    description: "Conjunto maciço de placas de ferro forjadas especificamente para vestir montarias robustas (como trobos) ou construtos mecânicos de apoio (como Tuk-tuk). Fornece excelente proteção em choque direto e cerco.",
    sourcePage: 35
  }
];

export const T20_SO_AVENTURAS_FEATS: T20SoAventurasFeat[] = [
  // --- Parceiros ---
  {
    id: "t20.sa.poder.parceiro_capita_joldan",
    name: "Parceiro: Capitã Joldan",
    category: "parceiro",
    prerequisites: "Confiança e aliança com a Capitã Joldan",
    description: "A Capitã Joldan atua como um parceiro mestre náutico. Enquanto estiver a bordo ou atuando dentro de embarcações, ela fornece um bônus de +2 em testes de ataque e na margem de ameaça de seus ataques, além de +3m de deslocamento em convés e passadiços.",
    sourcePage: 146
  },
  {
    id: "t20.sa.poder.parceiro_kalyadrix",
    name: "Parceiro: Kalyadrix",
    category: "parceiro",
    prerequisites: "Respeito das dragoas caçadoras de Galrasia",
    description: "Kalyadrix, princesa guerreira dracônica, conta como uma parceira Mestre marcial e de sobrevivência. Ela fornece aos aventureiros +4 em testes de Percepção e Sobrevivência e +2 na margem de ameaça de ataques corpo a corpo.",
    sourcePage: 147
  },
  {
    id: "t20.sa.poder.parceiro_lislah_ceu_negro",
    name: "Parceira: Lislah Céu Negro",
    category: "parceiro",
    prerequisites: "Hospitalidade no Cemitério dos Colonos",
    description: "Lislah atua como parceira iniciante curandeira devota de Tenebra. Uma vez por rodada, o personagem pode gastar uma ação livre para solicitar que Lislah cure um alvo em alcance curto, recuperando 1d6+1 PV sem custo. Lislah não conta no limite máximo de parceiros do personagem.",
    sourcePage: 51
  },
  {
    id: "t20.sa.poder.parceiros_vulneraveis_noivos",
    name: "Parceiros Vulneráveis: Noivos de Tollon",
    category: "parceiro",
    prerequisites: "Missão de escolta de Bryann e Yrene",
    description: "Regra especial de acompanhantes civis: não fornecem bônus de combate e devem ser defendidos ativamente. Cada personagem de nível 4 pode proteger apenas um dos noivos por vez. Quando o protetor sofre dano, rola 1d4; com resultado 1, o noivo fica ferido (ou morre caso já esteja ferido). Podem receber efeitos de cura para remover a condição ferido.",
    sourcePage: 50
  },

  // --- Táticas e Habilidades Especiais ---
  {
    id: "t20.sa.poder.falange_tauron",
    name: "Falange Legionária de Tauron",
    category: "tatica",
    prerequisites: "Treinamento legionário, uso de escudo",
    description: "Como uma ação de movimento, se estiver usando um escudo e adjacente a um aliado que também possua esta habilidade, você pode formar uma falange com ele. Enquanto estiverem adjacentes um ao outro, todos os participantes da falange recebem +2 na Defesa e em testes de resistência.",
    sourcePage: 51
  },
  {
    id: "t20.sa.poder.lider_de_falange",
    name: "Líder de Falange",
    category: "tatica",
    prerequisites: "Habilidade Falange Legionária, Guerra 1º nível",
    description: "Enquanto estiver participando ativamente de uma falange e coordenando seus companheiros de linha, todos os integrantes da falange recebem +2 em jogadas de ataque corpo a corpo.",
    sourcePage: 51
  },
  {
    id: "t20.sa.poder.parede_de_escudos",
    name: "Parede de Escudos",
    category: "tatica",
    prerequisites: "Habilidade Falange Legionária",
    description: "Uma vez por rodada, como reação, quando um inimigo se move para ficar adjacente a qualquer personagem integrante da falange da qual você faz parte, você pode realizar um ataque corpo a corpo imediato contra esse inimigo ou ordenar que um dos participantes da formação o faça.",
    sourcePage: 51
  },
  {
    id: "t20.sa.poder.loba_em_pele_de_cordeiro",
    name: "Loba em Pele de Cordeiro",
    category: "sobrenatural",
    prerequisites: "Maldição vampírica inicial de Tenebra",
    description: "Como uma reação que consome 2 PM, a aparência angelical mesclada aos encantamentos vampíricos desestabiliza a determinação de ex-aliados. A primeira vez que cada criatura tenta executar uma ação hostil contra você, deve realizar um teste de Vontade (CD 30). Se falhar, perde a ação completamente.",
    sourcePage: 146
  },
  {
    id: "t20.sa.poder.predadora_noturna_tenebra",
    name: "Predadora Noturna de Tenebra",
    category: "sobrenatural",
    prerequisites: "Bênção sombria de Tenebra",
    description: "Enquanto estiver sob penumbra ou escuridão, recebe +10 em testes de Furtividade. Além disso, ao acertar um ataque com sua mordida desarmada, recupera uma quantidade de pontos de vida igual à metade do dano total infligido.",
    sourcePage: 147
  },

  // --- Ritos de Matrimônio das Divindades do Panteão ---
  {
    id: "t20.sa.rito.aharadak",
    name: "Rito de Matrimônio: Aharadak",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Aharadak",
    description: "Versão deturpada e aberrante dos ritos matrimoniais artonianos que interpreta metáforas ao pé da letra. A promessa de 'tornar-se um só' funde carnes e mentes em cerimônias de comunhão lefeu.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.allihanna",
    name: "Rito de Matrimônio: Allihanna",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Allihanna",
    description: "Cerimônia realizada ao ar livre debaixo de galhos de azevinho longe de povoados. Noivos juram lealdade mútua e proteção à natureza, interpretando augúrios trazidos pelos animais selvagens que testemunham o voto.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.arsenal",
    name: "Rito de Matrimônio: Arsenal",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Arsenal",
    description: "União marcial objetiva e desprovida de sentimentalismo supérfluo: noivos declaram-se aliados táticos para superar desafios e conquistar vitórias conjuntas, partindo diretamente para a campanha.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.azgher",
    name: "Rito de Matrimônio: Azgher",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Azgher",
    description: "Celebrado sob a luz direta do dia. Os noivos entram com rostos velados, derretem alianças de ouro em oferenda ao Deus-Sol e revelam a face exclusivamente para o cônjuge, exaltando a beleza sagrada.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.hyninn",
    name: "Rito de Matrimônio: Hyninn",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Hyninn",
    description: "Cada nubente deve bolar e executar com sucesso uma trapaça ou peça engenhosa contra o outro. Cumprido o desafio, o sacerdote consagra ambos como iguais e parceiros de crime vitalícios.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.kallyadranoch",
    name: "Rito de Matrimônio: Kallyadranoch",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Kallyadranoch",
    description: "Rito rápido, prático e hierárquico voltado a perpetuar linhagens de poder draconiano e gerar soldados devotos para as hostes do Deus dos Dragões.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.keenn",
    name: "Rito de Matrimônio: Keenn",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Keenn",
    description: "Cerimônia belicosa em que os noivos prestam continência e selam um pacto de sangue e ferro como camaradas de pelotão prontos para a batalha total.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.khalmyr",
    name: "Rito de Matrimônio: Khalmyr",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Khalmyr",
    description: "Procedimento formal, solene e estritamente contratual similar a um registro civil. O clérigo realiza um minucioso interrogatório para assegurar a clareza jurídica e o consentimento de todos os termos.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.lena",
    name: "Rito de Matrimônio: Lena",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Lena",
    description: "Festa festiva com cantigas e bênçãos celebrada sob a lua cheia. Marca a maturidade dos cônjuges e inclui votos sagrados de procriação ou adoção compassiva de crianças desamparadas.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.lin_wu",
    name: "Rito de Matrimônio: Lin-Wu",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Lin-Wu",
    description: "Celebração tamuraniana tradicional com arranjos florais, música refinada e profundo respeito às dinastias ancestrais, com juramentos solenes de honra, lealdade e dever familiar.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.marah",
    name: "Rito de Matrimônio: Marah",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Marah",
    description: "Explosão de alegria, banquete e dança com troca de coroas de flores. A igreja de Marah celebra o amor livre e pacífico, consagrando também uniões poliamorosas entre múltiplos participantes.",
    sourcePage: 48
  },
  {
    id: "t20.sa.rito.megalokk",
    name: "Rito de Matrimônio: Megalokk",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Megalokk",
    description: "Rito primal repleto de danças frenéticas e selvagens onde os noivos se declaram parceiros de caça e selam o vínculo banhando-se no sangue fresco de uma fera abatida.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.nimb",
    name: "Rito de Matrimônio: Nimb",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Nimb",
    description: "Ritual caótico para atrair boa sorte aos amantes. Regras e votos são inventados na hora pelos noivos; qualquer discordância é resolvida no dado pelo sacerdote de Nimb.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.oceano",
    name: "Rito de Matrimônio: Oceano",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Oceano",
    description: "Entre piratas e marinheiros, noivos juram lealdade mútua como um capitão a seu navio, lavam o rosto com água salgada, repartem seus tesouros igualmente e bebem rum ao som de canções navais.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.ragnar",
    name: "Rito de Matrimônio: Ragnar",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Ragnar",
    description: "Sem casamento institucionalizado: sacerdotes goblinoides abençoam concubinatos e acordos de chefes guerreiros para zelar pelas vidas que um dia pertencerão à Morte.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.sszzaas",
    name: "Rito de Matrimônio: Sszzaas",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Sszzaas",
    description: "Farsa conspiratória executada por sacerdotes disfarçados como outros clérigos. O rito é concebido para profanar a confiança alheia e arquitetar intrigas, adultérios e chantagens pós-matrimônio.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.tanna_toh",
    name: "Rito de Matrimônio: Tanna-Toh",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Tanna-Toh",
    description: "Conduzido à luz de velas. Os cônjuges juram verdade irrestrita, elaboram questionários detalhados um ao outro e trocam respostas públicas completas para celebrar a comunhão do saber mútuo.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.tauron",
    name: "Rito de Matrimônio: Tauron",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Tauron",
    description: "Cerimônia austera em que o sacerdote minotauro designa quem é o forte (que jura proteção) e quem é o fraco (que jura servir). O cônjuge designado como fraco possui o direito sagrado de desafiar o forte para combate e inverter os papéis em caso de vitória.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.tenebra",
    name: "Rito de Matrimônio: Tenebra",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Tenebra",
    description: "Cerimônia noturna com cálices de vinho e troca de alianças na mão esquerda e direita, recitando os votos solenes da sombra perante Tenebra, celebrando um afeto eterno que se estende além do túmulo.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.thyatis",
    name: "Rito de Matrimônio: Thyatis",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Thyatis",
    description: "Animado com pirotecnia mágica e profecia sacerdotal. Se o augúrio for benéfico, os noivos queimam juntos um objeto marcante do passado para renascer como um só; se for desfavorável, o rito é adiado para um novo recomeço.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.thwor",
    name: "Rito de Matrimônio: Thwor",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Thwor",
    description: "Celebração duyshidakk coletiva com combates amistosos e música, afirmando a continuidade no Akzath e a integração ao povo contra a estagnação.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.valkaria",
    name: "Rito de Matrimônio: Valkaria",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Valkaria",
    description: "Apesar do tabu, desafiar a deusa da ambição casando-se é tido como grande façanha heroica. Os noivos trocam troféus de aventura, juram desbravar o mundo juntos e renovam a conquista mútua a cada novo dia.",
    sourcePage: 49
  },
  {
    id: "t20.sa.rito.wynna",
    name: "Rito de Matrimônio: Wynna",
    category: "matrimonio",
    prerequisites: "Sacerdote ou devoto de Wynna",
    description: "Celebrado entre conjuradores arcanos onde os parceiros assumem mutuamente o papel de mestre e aprendiz, ensinando um ao outro uma magia nova e declarando que o amor é a maior das magias.",
    sourcePage: 49
  }
];
