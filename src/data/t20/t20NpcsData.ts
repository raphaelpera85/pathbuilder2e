/**
 * Tormenta20 - Guia de NPCs (Jambô Editora, 2023)
 * Dados canônicos extraídos factualmente do suplemento oficial (80 páginas).
 * 
 * Contém:
 * - 22 Itens (armas marciais, exóticas, simples, de fogo, armaduras, acessórios e artefatos lendários)
 * - 1 Magia (Preparação de Batalha, Universal 2)
 * - 26 Poderes / Regras (Truques Mercenários, Poder Concedido, Sumo-Sacerdotes, Parceiros, Melhorias de Kum'shrak e Ajustes de Raça para NPCs)
 */

export const T20_NPCS_SOURCE_BOOK = "Tormenta20 - Guia de NPCs";

export interface T20NpcItem {
  id: string;
  name: string;
  category: "weapon" | "armor" | "equipment" | "accessory" | "artifact";
  itemType: string;
  price: number;
  spaces: number;
  hands?: number;
  damage?: string;
  critical?: string;
  damageType?: string;
  range?: string;
  defenseBonus?: number;
  armorPenalty?: number;
  description: string;
  sourcePage: number;
}

export interface T20NpcSpell {
  id: string;
  name: string;
  circle: number;
  school: string;
  tradition: "universal" | "arcana" | "divina";
  castingTime: string;
  range: string;
  target?: string;
  duration: string;
  cost: number;
  additionalCost?: string;
  description: string;
  enhancements?: string;
  sourcePage: number;
}

export interface T20NpcFeat {
  id: string;
  name: string;
  category: "mercenario" | "concedido" | "sacerdocio" | "parceiro" | "kumshrak" | "ajuste_npc";
  prerequisites: string | null;
  description: string;
  sourcePage: number;
}

export const T20_NPCS_ITEMS: T20NpcItem[] = [
  // --- Armas Mundanas / Exóticas ---
  {
    id: "t20.npcs.item.cajado_de_batalha",
    name: "Cajado de Batalha",
    category: "weapon",
    itemType: "Arma Marcial Dupla",
    price: 10,
    spaces: 2,
    hands: 2,
    damage: "1d8/1d8",
    critical: "x2",
    damageType: "Impacto",
    description: "Um cajado reforçado com chapas de metal nas pontas. Uma arma discreta, usada por andarilhos que não querem levantar suspeitas. O cajado de batalha é uma arma dupla.",
    sourcePage: 17
  },
  {
    id: "t20.npcs.item.balestra",
    name: "Balestra",
    category: "weapon",
    itemType: "Arma Exótica de Disparo",
    price: 150,
    spaces: 2,
    hands: 2,
    damage: "1d12",
    critical: "19",
    damageType: "Perfuração",
    range: "médio",
    description: "A balestra é uma versão mais robusta da besta pesada, que utiliza um sistema de catracas reguláveis para armar seu arco. Esse sistema permite que usuários mais fortes apliquem mais tensão à arma; ao contrário de outras armas de disparo, você aplica sua Força a rolagens de dano com uma balestra. Esta arma é muito pesada e complexa para ser usada sem treinamento especial, por isso é uma arma exótica. Recarregar uma balestra é uma ação padrão.",
    sourcePage: 42
  },
  {
    id: "t20.npcs.item.maca_de_guerra",
    name: "Maça de Guerra",
    category: "weapon",
    itemType: "Arma Exótica de Uma Mão",
    price: 25,
    spaces: 1,
    hands: 1,
    damage: "1d12",
    critical: "x3",
    damageType: "Impacto",
    description: "Uma versão mais perigosa da maça comum, com uma cabeça formada por grandes placas de metal. O peso da maça de guerra torna seu golpe poderoso, mas desajeitado, fazendo com que ela seja uma arma desbalanceada. Além disso, uma maça de guerra é muito pesada e desequilibrada para ser usada sem treinamento especial, por isso é uma arma exótica.",
    sourcePage: 63
  },
  {
    id: "t20.npcs.item.machado_de_lenha",
    name: "Machado de Lenha",
    category: "weapon",
    itemType: "Arma Simples de Uma Mão",
    price: 15,
    spaces: 1,
    hands: 1,
    damage: "1d6",
    critical: "x3",
    damageType: "Corte",
    description: "Uma ferramenta comum. Sua lâmina projetada para cortar madeira rígida é capaz de ignorar 5 pontos de RD de objetos e construtos.",
    sourcePage: 69
  },
  {
    id: "t20.npcs.item.kumshrak",
    name: "Kum'shrak",
    category: "weapon",
    itemType: "Arma Exótica de Uma Mão",
    price: 0,
    spaces: 1,
    hands: 1,
    damage: "1d6",
    critical: "x2",
    damageType: "Impacto",
    description: "Arma ritualística empunhada apenas pelos melhores guerreiros duyshidakk, um kum’shrak é uma arma especial que extrai poder de suas vítimas. Seguindo as leis de Lamnor e do Akzath, por ser empregado como uma ferramenta de “morte” cujo único propósito é pôr “fim” à vida, o kum’shrak está próximo das “trevas”. Um kum’shrak recém-criado é um osso grande que funciona como arma improvisada (–2 em ataques, 1d6 de dano, crítico x2). Quando mata pela primeira vez, torna-se uma clava. Quando mata cinco vítimas, torna-se um machado de batalha. Ao fazer sua décima vítima, recebe uma melhoria à escolha do portador. Depois disso, sempre que dobra o número de mortes (20, 40 etc.), adquire uma nova melhoria, até o máximo de quatro melhorias, tendo acesso exclusivo a: Eviscerador, Necrótico e Peçonhento.",
    sourcePage: 36
  },
  {
    id: "t20.npcs.item.o_artefato_de_cross",
    name: "O Artefato de Cross",
    category: "weapon",
    itemType: "Arma de Fogo Exótica",
    price: 0,
    spaces: 2,
    hands: 2,
    damage: "2d12",
    critical: "19/x3",
    damageType: "Perfuração",
    range: "médio",
    description: "Esta arma única é um item puramente mundano e tecnológico, inventado e forjado pelas mentes geniais e doentias de demônios. Ela é composta por diversos canos de mosquete, que giram por meio de engrenagens quando o usuário puxa uma alavanca. O artefato é pesado e desajeitado, mas quando acionado, dispara todos os seus canos, banhando os alvos com uma chuva de chumbo. Fornece +10 nos testes de ataque e, em caso de acerto, causa +1d12 pontos de dano para cada 2 pontos pelos quais o resultado do ataque passar a Defesa do alvo. Recarregá-lo é uma ação padrão.",
    sourcePage: 48
  },

  // --- Itens Mágicos Específicos & Artefatos de Armas ---
  {
    id: "t20.npcs.item.punhal_escarlate",
    name: "Punhal Escarlate",
    category: "weapon",
    itemType: "Arma Mágica Específica Média",
    price: 41000,
    spaces: 1,
    hands: 1,
    damage: "1d4",
    critical: "19",
    damageType: "Perfuração",
    description: "Criada por Hemera como presente de Kallyadranoch, esta adaga formidável causa +1d6 pontos de dano de essência. Além disso, conta como um orbe cristalino. Os poderes mágicos deste item só funcionam com devotos de Kallyadranoch.",
    sourcePage: 26
  },
  {
    id: "t20.npcs.item.presuntador",
    name: "Presuntador",
    category: "weapon",
    itemType: "Arma Mágica Específica Maior",
    price: 120000,
    spaces: 2,
    hands: 2,
    damage: "3d6",
    critical: "x3",
    damageType: "Corte",
    description: "Feito de mana solidificado e dado a Klunc como recompensa por um ato especialmente heroico, o Presuntador é um machado de guerra aumentado energético magnífico (+4 em testes de ataque, ignora redução de dano por energia). Se o portador ficar inconsciente, o Presuntador continua lutando sozinho, com as mesmas estatísticas que teria se estivesse sendo empunhado. Quando ataca dessa forma, o Presuntador tem Defesa 35, RD 50 e 50 PV.",
    sourcePage: 29
  },
  {
    id: "t20.npcs.item.avir",
    name: "Avir",
    category: "weapon",
    itemType: "Arma Mágica Específica Maior",
    price: 96000,
    spaces: 3,
    hands: 2,
    damage: "3d6",
    critical: "19",
    damageType: "Corte",
    description: "Este montante aumentado macabro maciço formidável tumular foi fabricado a partir do fêmur da irmã de Narsogg. Uma arma única, conta como um cajado arcano. Além dos benefícios desse esotérico, as magias do usuário que causam dano de trevas causam +1 ponto de dano por dado.",
    sourcePage: 55
  },
  {
    id: "t20.npcs.item.baculo_da_fe",
    name: "Báculo da Fé",
    category: "weapon",
    itemType: "Arma Mágica Específica Maior",
    price: 45000,
    spaces: 2,
    hands: 2,
    damage: "1d6/1d6",
    critical: "x2",
    damageType: "Impacto",
    description: "Este bordão banhado a ouro formidável é dedicado a uma divindade específica, que pode ser identificada pelos símbolos em sua empunhadura e extremidades. Quando empunhado por um devoto dessa divindade, causa +1d6 pontos de dano de fogo (para divindades que canalizam energia positiva) ou +1d6 pontos de dano de frio (para divindades que canalizam energia negativa).",
    sourcePage: 69
  },
  {
    id: "t20.npcs.item.lamina_da_luz",
    name: "Lâmina da Luz",
    category: "artifact",
    itemType: "Artefato / Espada Sagrada",
    price: 0,
    spaces: 2,
    hands: 1,
    damage: "3d12",
    critical: "17/x3",
    damageType: "Corte e Luz",
    description: "A espada lendária empunhada por Sir Alenn Toren Greenfeld, Alto Comandante da Ordem da Luz. Forjada em comunhão com o Deus da Justiça Khalmyr, sua lâmina de corte impecável causa 3d12 pontos de dano de corte com margem de ameaça 17/x3, infligindo adicionais 3d12 pontos de dano radiante de luz pura contra forças malignas.",
    sourcePage: 51
  },
  {
    id: "t20.npcs.item.carthalkan",
    name: "Carthalkan, a Lâmina Cristalina",
    category: "artifact",
    itemType: "Artefato / Espada Longa",
    price: 0,
    spaces: 1,
    hands: 1,
    damage: "4d8",
    critical: "17/x3",
    damageType: "Corte",
    description: "Esta espada longa atroz e pungente é feita de um cristal translúcido. Empunhá-la traz uma sensação estranha, pois ela não tem o peso de materiais comuns, como metal ou madeira. Quando brandida por um herdeiro da família Sharpblade, a arma emite uma luz límpida e revela todos os seus poderes: torna-se uma espada longa atroz pungente ameaçadora magnífica, que tem dano base 4d8.",
    sourcePage: 45
  },

  // --- Armaduras e Escudos ---
  {
    id: "t20.npcs.item.armadura_de_cranio_negro",
    name: "Armadura de Crânio Negro",
    category: "artifact",
    itemType: "Artefato / Armadura Completa",
    price: 0,
    spaces: 5,
    defenseBonus: 12,
    armorPenalty: 0,
    description: "Esta armadura foi criada pelos diabretes negociantes a partir das memórias de Ellisa Thorn, ex-membro do Esquadrão do Inferno. Sua aparência é completamente negra e parece sugar a luz, destacando-se contra o céu noturno, com elmo em forma de crânio estilizado. É uma armadura completa fortificada guardiã macabra cujas placas deslizam sozinhas para proteger o usuário. Apesar de seu peso e rigidez, não atrapalha os movimentos: conta como armadura leve com penalidade de armadura 0. Efeito colateral: bombardeia o usuário com memórias de Ellisa Thorn, moldando seu estilo de luta e maneirismos.",
    sourcePage: 9
  },
  {
    id: "t20.npcs.item.armadura_de_khalmyr",
    name: "Armadura de Khalmyr",
    category: "armor",
    itemType: "Armadura Específica Média",
    price: 42000,
    spaces: 0,
    defenseBonus: 11,
    armorPenalty: -4,
    description: "Esta armadura completa sob medida defensora fica armazenada magicamente em uma gargantilha com o símbolo do Deus da Justiça. Enquanto está armazenada dessa forma, a armadura não ocupa nenhum espaço (embora ainda conte como um item vestido) e não impõe nenhuma penalidade ao usuário (como se ele não estivesse de armadura). Ao pronunciar o nome de Khalmyr como ação livre, o usuário veste-a automaticamente; devolvê-la à gargantilha também é uma ação livre.",
    sourcePage: 41
  },
  {
    id: "t20.npcs.item.batina_consagrada",
    name: "Batina Consagrada",
    category: "armor",
    itemType: "Armadura Específica Maior",
    price: 80000,
    spaces: 1,
    defenseBonus: 3,
    armorPenalty: 0,
    description: "Esta armadura acolchoada guardiã refletora é dedicada a uma divindade específica, identificada pelos símbolos bordados em seu peito e mangas. Conta como um manto eclesiástico aprimorado e, se vestida por um devoto da divindade à qual é dedicada, fornece redução de dano 5.",
    sourcePage: 69
  },
  {
    id: "t20.npcs.item.armadura_da_luz",
    name: "Armadura da Luz",
    category: "artifact",
    itemType: "Artefato / Armadura Completa",
    price: 0,
    spaces: 5,
    defenseBonus: 15,
    armorPenalty: -3,
    description: "A lendária armadura de placas completas dourada reluzente de Sir Alenn Toren Greenfeld, abençoada nos altares de Bielefeld sob o patrocínio de Khalmyr. Concede defesa impenetrável, proteção mística contra medo e redução de dano 15.",
    sourcePage: 51
  },

  // --- Acessórios e Artefatos ---
  {
    id: "t20.npcs.item.anel_da_felicidade_de_vallen",
    name: "Anel da Felicidade de Vallen",
    category: "artifact",
    itemType: "Artefato / Anel",
    price: 0,
    spaces: 1,
    description: "Criado pelos diabretes negociantes a partir da felicidade de Vallen Allond. Fornece cura acelerada 10 (somente após um dia de uso) que recupera inclusive perda de vida. Se o usuário for morto enquanto estiver usando o anel e continuar com ele, irá recuperar 1 ponto de vida por dia e ressuscitará ao alcançar PV positivos. Efeito colateral: o usuário é assaltado por visões de Vallen Allond e sente compulsão incontrolável de protegê-lo ou garantir sua felicidade.",
    sourcePage: 9
  },
  {
    id: "t20.npcs.item.braceletes_das_escamas",
    name: "Braceletes das Escamas",
    category: "accessory",
    itemType: "Acessório Médio",
    price: 21000,
    spaces: 1,
    description: "Criados por Acteia, estes braceletes de aço escurecido são entalhados de forma a parecer escamas de dragão. Fornecem redução de dano 5 e contam como uma luva de ferro. Seus poderes mágicos só funcionam com devotos de Kallyadranoch.",
    sourcePage: 26
  },
  {
    id: "t20.npcs.item.face_draconica",
    name: "Face Dracônica",
    category: "accessory",
    itemType: "Acessório Médio",
    price: 25000,
    spaces: 1,
    description: "Esta máscara dourada, semelhante ao rosto estilizado de um dragão, fortalece o poder arcano do usuário. Fruto do poder de Ilítia, fornece +2 na CD para resistir a suas habilidades mágicas (incluindo magias) e conta como um medalhão de prata. Seus poderes só funcionam com devotos de Kallyadranoch.",
    sourcePage: 26
  },
  {
    id: "t20.npcs.item.coroa_de_allihanna",
    name: "Coroa de Allihanna",
    category: "artifact",
    itemType: "Artefato / Coroa",
    price: 0,
    spaces: 1,
    description: "Este artefato sagrado, criado pela própria Deusa da Natureza, tem a aparência de uma coroa entrelaçada de madeira viva e vinhas silvestres. Concede Força +3, Constituição +3 e redução de dano 20.",
    sourcePage: 32
  },
  {
    id: "t20.npcs.item.coroa_imperial",
    name: "Coroa Imperial",
    category: "artifact",
    itemType: "Artefato / Coroa",
    price: 0,
    spaces: 1,
    description: "Símbolo milenar do trono do Reinado, esta coroa foi imbuída pela força de cada um dos Reis-Imperadores que a usou. O usuário recebe +2 em Sabedoria e Carisma (cumulativo com outros itens), aplica seu modificador de Carisma na Defesa e em testes de resistência e recebe imunidade a encantamento. Indestrutível por meios mundanos; só pode ser destruída se roubada e escondida em uma masmorra sem resgate por um ano e um dia.",
    sourcePage: 45
  },
  {
    id: "t20.npcs.item.gemas_eternas",
    name: "Gemas Eternas",
    category: "artifact",
    itemType: "Artefato / Joia",
    price: 0,
    spaces: 1,
    description: "Esta joia é formada por uma correntinha de mitral adornada por safiras, esmeraldas, rubis e diamantes que emitem luz própria com as cores do arco-íris. O usuário recebe +2 em Carisma, +5 na Defesa e 1 ponto de mana extra por nível (após um dia de uso). Conjuradores arcanos recebem +2 na CD para resistir a suas magias.",
    sourcePage: 59
  }
];

export const T20_NPCS_SPELLS: T20NpcSpell[] = [
  {
    id: "t20.npcs.spell.preparacao_de_batalha",
    name: "Preparação de Batalha",
    circle: 2,
    school: "convocacao",
    tradition: "universal",
    castingTime: "padrao",
    range: "toque",
    target: "até dois itens que você possua, entre armas, armaduras e escudos",
    duration: "permanente até ser descarregada",
    cost: 3,
    additionalCost: "penalidade de 1 PM",
    description: "Esta magia é utilizada por clérigos e bardos que não precisam (ou não podem) estar sempre com suas armas ou armaduras. A magia é lançada sobre até dois itens que você possua. A partir daí, em qualquer momento, você pode usar uma ação completa para convocar os itens, que aparecem sobre seu corpo e em suas mãos (conforme apropriado ao item). O efeito é espalhafatoso, sendo praticamente impossível utilizá-lo sem chamar atenção. A magia funciona independentemente da distância dos itens, desde que estejam no mesmo Plano, mas termina se você perder a posse deles.",
    enhancements: "+1 PM: aumenta o número de alvos em dois e o custo adicional em +1 PM.",
    sourcePage: 17
  }
];

export const T20_NPCS_FEATS: T20NpcFeat[] = [
  // --- Truques Mercenários (p. 79) ---
  {
    id: "t20.npcs.feat.armaduras_reforcadas",
    name: "Armaduras Reforçadas",
    category: "mercenario",
    prerequisites: null,
    description: "O mercenário ou membro da companhia mercenária recebe +2 na Defesa.",
    sourcePage: 79
  },
  {
    id: "t20.npcs.feat.armas_envenenadas",
    name: "Armas Envenenadas",
    category: "mercenario",
    prerequisites: null,
    description: "Quando acerta seu primeiro ataque com arma na cena, o mercenário faz com que a vítima perca 1d12 pontos de vida por veneno.",
    sourcePage: 79
  },
  {
    id: "t20.npcs.feat.disciplina_surpreendente",
    name: "Disciplina Surpreendente",
    category: "mercenario",
    prerequisites: null,
    description: "O mercenário recebe +2 em todos os seus testes de resistência.",
    sourcePage: 79
  },
  {
    id: "t20.npcs.feat.laminas_farpadas",
    name: "Lâminas Farpadas",
    category: "mercenario",
    prerequisites: null,
    description: "O multiplicador de crítico dos ataques corpo a corpo do mercenário aumenta em +1.",
    sourcePage: 79
  },
  {
    id: "t20.npcs.feat.po_ardente",
    name: "Pó Ardente",
    category: "mercenario",
    prerequisites: null,
    description: "Uma vez por cena, com uma ação de movimento, o mercenário deixa uma criatura adjacente ofuscada. A vítima pode remover essa condição gastando uma ação padrão para limpar os olhos.",
    sourcePage: 79
  },
  {
    id: "t20.npcs.feat.taticas_de_emboscada",
    name: "Táticas de Emboscada",
    category: "mercenario",
    prerequisites: null,
    description: "Os ataques do mercenário causam +2d6 pontos de dano contra criaturas surpreendidas.",
    sourcePage: 79
  },

  // --- Poder Concedido (p. 17) ---
  {
    id: "t20.npcs.feat.liberdade_irrestrita",
    name: "Liberdade Irrestrita",
    category: "concedido",
    prerequisites: "Devoto de Gwendolynn",
    description: "Você recebe +2 em testes de manobra para evitar ser agarrado e de resistência contra efeitos mentais, de medo, de metamorfose e de movimento. Além disso, se falhar num desses testes, pode rolá-lo novamente. Se ainda assim falhar, no início de cada um de seus turnos pode rolar esse teste novamente, como uma ação livre e com um bônus cumulativo de +2, até se libertar.",
    sourcePage: 17
  },

  // --- Poderes de Sumo-Sacerdotes (p. 32) ---
  {
    id: "t20.npcs.feat.protecao_divina_sumo_sacerdote",
    name: "Proteção Divina (Sumo-Sacerdote)",
    category: "sacerdocio",
    prerequisites: "Sumo-Sacerdote de Divindade Maior",
    description: "O sumo-sacerdote é automaticamente bem-sucedido em testes de resistência contra magias divinas lançadas por devotos de sua própria divindade.",
    sourcePage: 32
  },
  {
    id: "t20.npcs.feat.punicao_divina_sumo_sacerdote",
    name: "Punição Divina (Sumo-Sacerdote)",
    category: "sacerdocio",
    prerequisites: "Sumo-Sacerdote de Divindade Maior",
    description: "Com uma ação padrão, o sumo-sacerdote cancela as magias divinas e os poderes concedidos de um devoto de sua divindade em sua linha de visão (Vontade evita e o devoto não pode mais ser punido por 24 horas). A punição pode ser revertida com uma ação padrão do sumo-sacerdote ou com uma missão sagrada realizada como parte de um rito de expiação.",
    sourcePage: 32
  },

  // --- Parceiros Especiais & Contratações (p. 45, 73) ---
  {
    id: "t20.npcs.feat.parceiro_molosso_deheoni",
    name: "Parceiro: Molosso Deheoni",
    category: "parceiro",
    prerequisites: null,
    description: "O molosso deheoni é um parceiro vigilante especial treinado para farejar traição e combater serpentes e cultistas de Sszzaas. Iniciante: você recebe +1 na Defesa e +2 em testes de Intuição e Percepção (muda para +5 contra seres ofídicos e sszzaazitas). Veterano: uma vez por rodada, você recebe +2d6 em uma rolagem de dano corpo a corpo. Mestre: muda o bônus na Defesa para +2 e, uma vez por rodada, quando faz uma investida, você pode fazer a manobra derrubar como uma ação livre.",
    sourcePage: 45
  },
  {
    id: "t20.npcs.feat.parceiro_brucutu_iniciante",
    name: "Parceiro Contratado: Brucutu Iniciante",
    category: "parceiro",
    prerequisites: null,
    description: "Um brucutu iniciante pode ser contratado por T$ 30 por cena para auxiliá-lo como guarda-costas e combatente auxiliar. Ele acompanha você, contando no limite de parceiros, até que você solicite sua ajuda, momento em que concede seus benefícios de parceiro fortão até o fim da cena.",
    sourcePage: 73
  },
  {
    id: "t20.npcs.feat.parceiro_brucutu_veterano",
    name: "Parceiro Contratado: Brucutu Veterano",
    category: "parceiro",
    prerequisites: null,
    description: "Um brucutu veterano pode ser contratado por T$ 150 por cena para combates de alto risco. Ele acompanha você, contando no limite de parceiros, até que você solicite sua intervenção em batalha, fornecendo robusto auxílio de combate e absorção de golpes até o término da cena.",
    sourcePage: 73
  },

  // --- Melhorias Exclusivas de Kum'shrak (p. 36) ---
  {
    id: "t20.npcs.feat.melhoria_kumshrak_eviscerador",
    name: "Melhoria de Kum'shrak: Eviscerador",
    category: "kumshrak",
    prerequisites: "Kum'shrak com 10 ou mais mortes",
    description: "Uma criatura atingida por um ataque com este kum'shrak fica sangrando (Fortitude CD baseada em Força evita).",
    sourcePage: 36
  },
  {
    id: "t20.npcs.feat.melhoria_kumshrak_necrotico",
    name: "Melhoria de Kum'shrak: Necrótico",
    category: "kumshrak",
    prerequisites: "Kum'shrak com 10 ou mais mortes",
    description: "Uma criatura atingida por um ataque com este kum'shrak fica fraca (Fortitude CD baseada em Força evita).",
    sourcePage: 36
  },
  {
    id: "t20.npcs.feat.melhoria_kumshrak_peconhento",
    name: "Melhoria de Kum'shrak: Peçonhento",
    category: "kumshrak",
    prerequisites: "Kum'shrak com 10 ou mais mortes",
    description: "Uma criatura atingida por um ataque com este kum'shrak perde 1d6 pontos de vida imediatos por veneno acumulativo.",
    sourcePage: 36
  },

  // --- Ajustes de Raça para NPCs (p. 67-68) ---
  {
    id: "t20.npcs.feat.ajuste_npc_anao",
    name: "Ajuste de NPC: Anão",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs anões: Constituição +1, Destreza -1, Fortitude +1, Reflexos -1, +2 PV por ND, recebe Visão no Escuro, muda deslocamento para 6m e arma corpo a corpo para machado anão (+1 em testes de ataque com o machado).",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_dahllan",
    name: "Ajuste de NPC: Dahllan",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs dahllan: Sabedoria +1, Inteligência -1, Percepção +1, Vontade +1, recebe Empatia Selvagem e uma vez por cena pode lançar a magia Controlar Plantas.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_elfo",
    name: "Ajuste de NPC: Elfo",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs elfos: Inteligência +1, Constituição -1, Percepção +2, Fortitude -1, -1 PV por nível/ND, deslocamento +3m.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_goblin",
    name: "Ajuste de NPC: Goblin",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs goblins: Destreza +1, Carisma -1, tamanho Pequeno, Iniciativa +1, Defesa +1, Fortitude +2, Reflexos +1, recebe Visão no Escuro e deslocamento de escalada igual ao deslocamento terrestre.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_hynne",
    name: "Ajuste de NPC: Hynne",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs hynne: Destreza +1, Força -1, tamanho Pequeno, Iniciativa +1, Defesa +1, Reflexos +1, deslocamento -3m, -1 em testes de ataque e dano corpo a corpo, recebe um ataque à distância com funda.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_lefou",
    name: "Ajuste de NPC: Lefou",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs lefou: Carisma -1, recebe +2 em uma perícia ou um poder da Tormenta à escolha do mestre.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_minotauro",
    name: "Ajuste de NPC: Minotauro",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs minotauros: Força +1, Sabedoria -1, Defesa +1, Vontade -1, recebe um ataque de chifres (teste de ataque igual ao ataque corpo a corpo, dano 1d6+Força), +1 em testes de ataque e dano corpo a corpo, recebe Faro e Medo de Altura.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_qareen",
    name: "Ajuste de NPC: Qareen",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs qareen: Carisma +1, Sabedoria -1, Percepção -1, Vontade -1, recebe Tatuagem Mística (uma vez por cena pode lançar uma magia específica de 1º círculo).",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_sereia",
    name: "Ajuste de NPC: Sereia",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs sereias/tritões: deslocamento de natação 12m e pode lançar uma das magias a seguir uma vez por cena: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono.",
    sourcePage: 67
  },
  {
    id: "t20.npcs.feat.ajuste_npc_suraggel",
    name: "Ajuste de NPC: Suraggel",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs suraggel: Sabedoria +1 e pode lançar Luz (aggelus); Destreza +1 e pode lançar Escuridão (sulfure). Ambos são do tipo espírito e recebem Visão no Escuro.",
    sourcePage: 68
  },
  {
    id: "t20.npcs.feat.ajuste_npc_trog",
    name: "Ajuste de NPC: Trog",
    category: "ajuste_npc",
    prerequisites: null,
    description: "Modificador para NPCs trogs: Constituição +1, Inteligência -1, Defesa +1, Fortitude +1, +2 PV por ND, recebe um ataque de mordida (dano 1d6+Força), Sangue Frio e Mau Cheiro.",
    sourcePage: 68
  }
];
