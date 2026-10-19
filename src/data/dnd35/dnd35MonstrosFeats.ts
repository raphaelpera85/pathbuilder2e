/**
 * D&D 3.5 — Livro dos Monstros (ed. BR), Capítulo 6 "Perícias e
 * Talentos para Monstros" (pp.304-306). Transcrição por leitura visual
 * direta e verificação com OCR em alta resolução do scan oficial.
 *
 * COBERTURA COMPLETA (pp.304-306):
 * - 1 perícia expandida: "Controlar Forma (Sab)" (para personagens com licantropia contraída)
 * - 13 talentos gerais/monstruosos:
 *   1. Acelerar Habilidade Similar à Magia [Geral]
 *   2. Arma Natural Aprimorada [Geral]
 *   3. Armadura Natural Aprimorada [Geral]
 *   4. Arrebatar [Geral]
 *   5. Ataques Múltiplos [Geral]
 *   6. Combater com Múltiplas Armas [Geral]
 *   7. Fabricar Constructo [Geral]
 *   8. Foco em Habilidade [Geral]
 *   9. Golpe Avassalador [Geral, Guerreiro]
 *   10. Inversão [Geral]
 *   11. Investida Aérea [Geral]
 *   12. Pairar [Geral]
 *   13. Potencializar Habilidade Similar à Magia [Geral]
 */

export type Dnd35MonstrosFeat = {
  id: string;
  name: string;
  category: "general" | "fighter_bonus";
  prerequisites: string;
  benefit: string;
  fullDescription: string;
  normal?: string;
  special?: string;
  page: number;
};

export type Dnd35MonstrosSkillTask = {
  task: string;
  dc: number;
};

export type Dnd35MonstrosSkill = {
  id: string;
  name: string;
  keyAbility: "Sabedoria";
  trainedOnly: boolean;
  armorCheckPenalty: boolean;
  description: string;
  tasks: Dnd35MonstrosSkillTask[];
  page: number;
};

export const DND35_MONSTROS_SKILL_CONTROLAR_FORMA: Dnd35MonstrosSkill = {
  id: "monstros-skill-controlar-forma",
  name: "Controlar Forma",
  keyAbility: "Sabedoria",
  trainedOnly: false,
  armorCheckPenalty: false,
  description:
    "Qualquer personagem que tenha contraído a licantropia e esteja ciente dessa condição pode selecionar Controlar Forma como uma perícia de classe (um licantropo amaldiçoado que desconheça sua condição pode realizar testes sem graduações). Esta perícia determinará o grau de controle voluntário que o licantropo amaldiçoado terá sobre suas transformações. Os licantropos naturais não precisam adquirir esta perícia, já que possuem controle total sobre suas habilidades de metamorfose.",
  tasks: [
    {
      task: "Evitar uma mudança involuntária (ao anoitecer na lua cheia ou ao perder cada 25% do total de PV)",
      dc: 99,
    },
    {
      task: "Voltar à forma original (durante a lua cheia)",
      dc: 25,
    },
    {
      task: "Voltar à forma original (sem lua cheia)",
      dc: 20,
    },
    {
      task: "Assumir a forma híbrida",
      dc: 15,
    },
    {
      task: "Assumir voluntariamente a forma animal (durante a lua cheia)",
      dc: 15,
    },
    {
      task: "Assumir voluntariamente a forma animal (sem lua cheia)",
      dc: 20,
    },
  ],
  page: 304,
};

export const DND35_MONSTROS_FEATS: Dnd35MonstrosFeat[] = [
  {
    id: "monstros-feat-acelerar-habilidade-similar-a-magia",
    name: "Acelerar Habilidade Similar à Magia",
    category: "general",
    prerequisites: "Habilidade similar à magia com 10º nível de conjurador ou superior",
    benefit:
      "A criatura é capaz de usar a habilidade similar à magia escolhida com seu efeito acelerado até 3 vezes por dia como uma ação livre que não provoca ataques de oportunidade.",
    fullDescription:
      "A criatura pode usar habilidades similares à magia com apenas um pensamento. Escolha uma das habilidades similares à magia da criatura que atenda aos pré-requisitos. A criatura será capaz de usar a habilidade similar à magia escolhida com seu efeito acelerado até 3/dia (ou menos, quando a habilidade original somente puder ser ativada 1/dia ou 2/dia). Usar uma habilidade similar à magia acelerada é uma ação livre que não provoca ataques de oportunidade. A criatura pode realizar qualquer outra ação — até acionar outra habilidade similar à magia — durante a mesma rodada em que utiliza a habilidade acelerada. Apenas uma habilidade similar à magia acelerada pode ser ativada a cada rodada. Esse talento somente pode ser aplicado a uma habilidade similar à magia de nível igual ou inferior à metade do seu nível de conjurador efetivo (arredondado para baixo) menos 4.",
    special:
      "A criatura pode adquirir esse talento diversas vezes. Seus efeitos não são cumulativos. Sempre que escolher esse talento, ele se aplica a uma habilidade diferente.",
    page: 304,
  },
  {
    id: "monstros-feat-arma-natural-aprimorada",
    name: "Arma Natural Aprimorada",
    category: "general",
    prerequisites: "Arma natural, bônus base de ataque +4",
    benefit:
      "O dano causado com a arma natural selecionada aumenta em uma categoria de tamanho.",
    fullDescription:
      "As armas naturais da criatura são mais perigosas que o normal para seu tipo e tamanho. Escolha uma das armas naturais da criatura. O dano causado com essa arma aumenta, como se a criatura pertencesse a uma categoria de tamanho superior, nessa sequência: 1d2, 1d3, 1d4, 1d6, 1d8, 2d6, 2d8, 3d6, 4d6, 6d6, 8d6, 12d6. Uma arma que cause 1d10 pontos de dano obedecerá à seguinte progressão: 1d10, 2d8, 3d8, 4d8, 6d8, 8d8, 12d8.",
    page: 304,
  },
  {
    id: "monstros-feat-armadura-natural-aprimorada",
    name: "Armadura Natural Aprimorada",
    category: "general",
    prerequisites: "Armadura natural, Con 13",
    benefit: "O bônus de armadura natural da criatura aumenta em +1.",
    fullDescription:
      "A armadura natural da criatura é mais espessa e resistente que o normal para sua espécie. O bônus de armadura natural da criatura aumenta em +1.",
    special:
      "A criatura pode adquirir esse talento diversas vezes. Seus efeitos se acumulam. Sempre que escolher esse talento, sua armadura natural aumenta em 1 ponto.",
    page: 304,
  },
  {
    id: "monstros-feat-arrebatado",
    name: "Arrebatar",
    category: "general",
    prerequisites: "Tamanho Enorme ou superior",
    benefit:
      "A criatura é capaz de agarrar oponentes menores e prendê-los com sua boca ou garras, causando dano automático ou arremessando-os.",
    fullDescription:
      "Quando atingir um oponente com sua garra ou mordida, a criatura pode iniciar a manobra Agarrar imediatamente, similar à habilidade especial Agarrar Aprimorado. Caso prenda um adversário de três ou mais categorias de tamanho inferiores, ele sofrerá automaticamente o dano da arma natural utilizada (mordida ou garra) a cada rodada. Uma criatura arrebatada pela boca da criatura não pode realizar testes de resistência contra seu sopro (se houver). A criatura é capaz de soltar a vítima aprisionada como uma ação livre ou usar uma ação padrão para arremessá-la numa direção específica. Uma criatura arremessada percorre 1d6 x 3 m e sofre 1d6 pontos de dano a cada 3 m de distância percorridos. Se o monstro arremessar a vítima enquanto estiver voando, ela sofrerá este dano ou o dano da queda — o que for maior.",
    page: 304,
  },
  {
    id: "monstros-feat-ataques-multiplos",
    name: "Ataques Múltiplos",
    category: "general",
    prerequisites: "Três ou mais armas naturais",
    benefit:
      "Os ataques secundários da criatura, usando suas armas naturais, sofrem apenas −2 de penalidade.",
    fullDescription:
      "A criatura é capaz de utilizar todas suas armas naturais ao mesmo tempo. Os ataques secundários da criatura, usando suas armas naturais, sofrem apenas −2 de penalidade.",
    normal:
      "Sem esse talento, os ataques secundários da criatura com suas armas naturais sofrem −5 de penalidade.",
    page: 304,
  },
  {
    id: "monstros-feat-combater-com-multiplas-armas",
    name: "Combater com Múltiplas Armas",
    category: "general",
    prerequisites: "Des 13, três ou mais braços",
    benefit:
      "As penalidades para combater com armas múltiplas são reduzidas em 2 pontos para a arma primária e 6 pontos para as outras armas secundárias.",
    fullDescription:
      "Uma criatura que tenha três ou mais braços será capaz de combater utilizando uma arma em cada mão. A criatura poderá desferir um ataque adicional por rodada para cada arma extra. As penalidades para combater com armas múltiplas são reduzidas em 2 pontos para a arma primária e 6 pontos para as outras armas secundárias.",
    normal:
      "Sem esse talento, a criatura sofre −6 de penalidade nas jogadas de ataque de sua arma primária (mão hábil) e −10 de penalidade nas jogadas de ataque de suas armas secundárias (mãos inábeis).",
    special:
      "Esse talento substitui Combater com Duas Armas para criaturas com diversos braços.",
    page: 305,
  },
  {
    id: "monstros-feat-fabricar-constructo",
    name: "Fabricar Constructo",
    category: "general",
    prerequisites: "Criar Armas e Armaduras Mágicas, Criar Item Maravilhoso",
    benefit:
      "A criatura é capaz de fabricar e consertar golens e outros autômatos mágicos que obedecem às suas ordens.",
    fullDescription:
      "A criatura pode fabricar qualquer constructo caso atenda a todos os pré-requisitos. Encantar um constructo exige um dia de trabalho para cada 1.000 PO do preço de mercado. Para encantar um constructo, é preciso gastar 1/25 do seu preço base em XP e consumir matéria-prima equivalente à metade do preço total (consulte as descrições de Golem, Homúnculo e Guardião Protetor para obter maiores detalhes). A criatura também pode consertar um constructo que esteja danificado. Um dia de trabalho elimina até 20 pontos de dano e cada ponto recuperado custa 50 PO. Um constructo recém-criado possui a média de PV dos seus Dados de Vida.",
    page: 305,
  },
  {
    id: "monstros-feat-foco-em-habilidade",
    name: "Foco em Habilidade",
    category: "general",
    prerequisites: "Ataque especial",
    benefit:
      "Acrescente +2 na CD de todos os testes de resistência contra o ataque especial selecionado.",
    fullDescription:
      "Escolha um dos ataques especiais da criatura. Este ataque será mais poderoso que o normal. Acrescente +2 na CD de todos os testes de resistência contra o ataque selecionado.",
    special:
      "A criatura pode adquirir esse talento diversas vezes. Seus efeitos não são cumulativos. Sempre que escolher esse talento, ele se aplica a um ataque especial diferente.",
    page: 305,
  },
  {
    id: "monstros-feat-golpe-avassalador",
    name: "Golpe Avassalador",
    category: "fighter_bonus",
    prerequisites:
      "For 25, Ataque Poderoso, Encontrão Aprimorado, tamanho Grande ou maior",
    benefit:
      "Subtrai 4 da jogada de ataque corporal para arremessar um oponente corpóreo menor a 3 metros (Reflexos CD = dano sofrido para resistir).",
    fullDescription:
      "Esta criatura é capaz de desferir golpes que arremessam seus oponentes menores para longe. Usando uma ação padrão, a criatura é capaz de subtrair 4 pontos da sua jogada de ataque corporal para executar um golpe avassalador. Caso atinja um oponente corpóreo de tamanho inferior com esse ataque, a vítima deve obter sucesso em um teste de resistência de Reflexos (CD = dano causado) ou será arremessada a 3 m na direção que a criatura escolher e ficará caída naquele quadrado. O atacante somente pode arremessar a vítima em linha reta e ela não pode aterrissar num quadrado que esteja mais próximo do atacante do que sua localização original. Se um obstáculo interromper a trajetória do arremesso, o obstáculo e a vítima sofrem 1d6 pontos de dano e ela ficará caída no espaço adjacente à obstrução.",
    page: 305,
  },
  {
    id: "monstros-feat-inversao",
    name: "Inversão",
    category: "general",
    prerequisites: "Deslocamento de vôo",
    benefit:
      "Uma vez por rodada, uma criatura em pleno vôo pode mudar de direção rapidamente virando até 180 graus (consome 3 m de deslocamento).",
    fullDescription:
      "A criatura pode mudar de direção rapidamente durante o vôo. Uma vez por rodada, uma criatura em pleno vôo é capaz de alterar sua direção rapidamente. Este talento lhe permite virar 180º em qualquer direção, independente de sua capacidade de manobra, além das demais curvas permitidas normalmente. É impossível ganhar altitude durante a rodada em que a inversão foi realizada, mas é possível mergulhar. A mudança de direção consome 3 m do deslocamento de vôo da criatura durante a rodada em que for executada.",
    page: 305,
  },
  {
    id: "monstros-feat-investida-aerea",
    name: "Investida Aérea",
    category: "general",
    prerequisites: "Deslocamento de vôo",
    benefit:
      "A criatura é capaz de realizar uma ação padrão a qualquer momento durante uma ação de movimento de vôo.",
    fullDescription:
      "A criatura é capaz de atacar em pleno vôo. Quando estiver voando, a criatura poderá realizar uma ação de movimento (inclusive mergulhar) e uma ação padrão a qualquer momento durante esse deslocamento, e então terminar seu movimento. É impossível realizar a ação de movimento dobrado durante uma investida aérea.",
    normal:
      "Sem esse talento, a criatura deverá usar sua ação padrão antes ou depois do movimento, nunca durante.",
    page: 306,
  },
  {
    id: "monstros-feat-pairar",
    name: "Pairar",
    category: "general",
    prerequisites: "Deslocamento de vôo",
    benefit:
      "A criatura é capaz de interromper o vôo e ficar pairando no lugar usando uma ação de movimento, além de gerar nuvem de poeira se for Grande ou maior.",
    fullDescription:
      "Com esse talento é possível pairar durante o vôo. Enquanto estiver voando, a criatura é capaz de interromper seu deslocamento e usar uma ação de movimento para ficar pairando no mesmo lugar. Ela poderá voar controlando a sua própria altitude, subindo ou descendo com metade do seu deslocamento, independente de sua capacidade de manobra. Quando começar seu turno pairando, a criatura poderá se manter no lugar durante todo o turno para executar uma ação de rodada completa. Se uma criatura Grande ou maior pairar a 6 m ou menos do solo sobre terra/areia, as batidas de suas asas criam uma nuvem hemisférica com raio de 18 m que apaga chamas mundanas e confere camuflagem.",
    normal:
      "Sem este talento, a criatura precisa se manter em movimento durante o vôo, a menos que tenha capacidade de manobra perfeita.",
    page: 306,
  },
  {
    id: "monstros-feat-potencializar-habilidade-similar-a-magia",
    name: "Potencializar Habilidade Similar à Magia",
    category: "general",
    prerequisites: "Habilidade similar à magia com 6º nível de conjurador ou superior",
    benefit:
      "A criatura pode usar a habilidade similar à magia com seus efeitos numéricos e variáveis aumentados em 50% até 3 vezes por dia.",
    fullDescription:
      "Com esse talento, a criatura pode usar uma habilidade similar à magia para gerar efeitos mais poderosos. Escolha uma das habilidades similares à magia da criatura que atenda aos pré-requisitos. A criatura será capaz de usar a habilidade similar à magia escolhida com seu efeito potencializado até 3/dia (ou menos, quando a habilidade original somente puder ser ativada 1/dia ou 2/dia). Todos os efeitos variáveis e numéricos de uma habilidade similar à magia potencializada são aumentados em 50%. Esse talento somente pode ser aplicado a uma habilidade similar à magia de nível igual ou inferior à metade do seu nível de conjurador efetivo (arredondado para baixo) menos 2.",
    special:
      "A criatura pode adquirir esse talento diversas vezes. Seus efeitos não são cumulativos. Sempre que escolher esse talento, ele se aplica a uma habilidade diferente.",
    page: 306,
  },
];
