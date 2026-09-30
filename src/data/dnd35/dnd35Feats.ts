// ============================================================================
// D&D 3.5 - Catálogo de Talentos (núcleo, conjunto curado)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 5 — Talentos (Tabela 5-1, páginas 90-91; descrições
// individuais páginas 89-99). O PDF fonte é uma digitalização de imagem sem
// camada de texto (confirmado via pypdf/pymupdf: 0 caracteres extraíveis em
// todas as páginas). Os dados abaixo foram transcritos por leitura visual
// direta das páginas renderizadas em alta resolução (400dpi), não por OCR
// nem por memória — cada talento cita a página do PDF de onde foi lido.
//
// O Capítulo 5 completo tem ~110 talentos (incluindo criação de itens e
// metamágicos). Este arquivo cataloga um conjunto curado dos talentos mais
// usados/citados por outras classes já catalogadas (Combate com Duas Armas,
// Ataque Poderoso, Especialização em Arma, Iniciativa Aprimorada etc.),
// priorizando cobertura funcional sobre exaustividade total nesta rodada.
// ============================================================================

export type Dnd35FeatType = "geral" | "criacao_item" | "metamagico";

export interface Dnd35Feat {
  id: string;
  name: string;
  type: Dnd35FeatType;
  sourceBook: string;
  sourcePage: number;
  prerequisites: string[];
  benefit: string;
}

export const DND35_FEATS: Record<string, Dnd35Feat> = {
  "acuidade-com-arma": {
    id: "acuidade-com-arma",
    name: "Acuidade com Arma",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 89,
    prerequisites: ["Bônus de ataque +1"],
    benefit: "Quando estiver usando uma arma leve, sabre, chicote ou corrente com cravos apropriados para uma criatura do seu tamanho, pode usar o modificador de Destreza no lugar do modificador de Força nas jogadas de ataque corporal. A penalidade de armadura do escudo (se houver) também se aplica nesta situação.",
  },
  "agarrar-aprimorado": {
    id: "agarrar-aprimorado",
    name: "Agarrar Aprimorado",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 89,
    prerequisites: ["Des 13", "Ataque Desarmado Aprimorado"],
    benefit: "Não provoca um ataque de oportunidade quando realiza o ataque de toque inicial da manobra Agarrar. Recebe +4 de bônus em todos os testes de Agarrar, não importa quem iniciou a manobra.",
  },
  "ataque-desarmado-aprimorado": {
    id: "ataque-desarmado-aprimorado",
    name: "Ataque Desarmado Aprimorado",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 92,
    prerequisites: [],
    benefit: "Considera-se que o personagem está armado quando desarmado — ou seja, oponentes armados não podem realizar ataques de oportunidade quando ele os ataca de mãos vazias. O personagem ainda pode desferir um ataque de oportunidade quando alguém desarmado tentar atacá-lo. Além disso, o personagem é capaz de causar dano letal ou dano por contusão usando seus ataques desarmados.",
  },
  "ataque-atordoante": {
    id: "ataque-atordoante",
    name: "Ataque Atordoante",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 92,
    prerequisites: ["Des 13", "Sab 13", "Ataque Desarmado Aprimorado", "Bônus base de ataque +8"],
    benefit: "O jogador precisa declarar que seu personagem está usando esse talento antes de realizar a jogada de ataque (logo, um fracasso na jogada desperdiçará a tentativa). Um oponente atingido por um ataque desarmado atordoante deve realizar um teste de resistência de Fortitude (CD 10 + metade do nível do atacante + modificador de Sab), além de sofrer o dano normalmente. Caso fracasse, o alvo ficará atordoado durante 1 rodada completa (até o final da próxima ação do personagem). Um personagem atordoado não consegue agir, perde qualquer bônus de Destreza na CA e sofre −2 de penalidade na CA. É possível desferir um ataque atordoante uma vez por dia a cada quatro níveis de personagem (veja Especial, a seguir), mas somente uma vez por rodada. Os constructos, limos, plantas, mortos-vivos, criaturas incorpóreas e criaturas imunes a sucessos decisivos não podem ser atordoadas. Especial: Um monge pode adquirir Ataque Atordoante como um talento adicional no 1º nível, mesmo quando não atender aos pré-requisitos. Quando adquire esse talento, ele conseguirá desferir uma quantidade de ataques atordoantes por dia equivalente ao seu nível de monge e uma vez adicional a cada quatro níveis de qualquer outra classe.",
  },
  "ataque-em-movimento": {
    id: "ataque-em-movimento",
    name: "Ataque em Movimento",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 92,
    prerequisites: ["Des 13", "Esquiva", "Mobilidade", "bônus base de ataque +4"],
    benefit: "Quando o personagem realizar uma ação de ataque regular com uma arma de ataque corporal, ele poderá se mover antes e depois do ataque, desde que a distância total percorrida seja maior que seu deslocamento. Essa movimentação não provoca ataques de oportunidade do defensor, embora ainda provoque ataques de oportunidade de outras criaturas nas áreas ameaçadas. Não é possível utilizar esse talento se estiver usando qualquer tipo de armadura pesada. É necessário se deslocar no mínimo 1,5 m antes e depois do ataque para obter os benefícios deste talento.",
  },
  "ataque-poderoso": {
    id: "ataque-poderoso",
    name: "Ataque Poderoso",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 92,
    prerequisites: ["For 13"],
    benefit: "Durante a ação de ataque do personagem, antes de realizar as jogadas de ataque, é possível subtrair um valor de todas as jogadas de ataque e aplicá-lo a todas as jogadas de dano. Esse valor não pode exceder seu bônus base de ataque. As alterações no ataque e no dano continuam válidas até seu próximo turno, inclusive para ataques de oportunidade.",
  },
  "combate-com-duas-armas": {
    id: "combate-com-duas-armas",
    name: "Combate com Duas Armas",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 93,
    prerequisites: ["Des 15"],
    benefit: "As penalidades para combater com duas armas são reduzidas: a penalidade da mão principal diminui em 2 pontos e a da mão inábil diminui em 6 pontos.",
  },
  esquiva: {
    id: "esquiva",
    name: "Esquiva",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 92,
    prerequisites: [],
    benefit: "Durante seu turno, o personagem escolhe um oponente e recebe +1 de bônus de esquiva na CA contra os ataques desse oponente. Esse bônus é perdido caso o personagem esteja desnorteado, paralisado, inconsciente ou de outra forma incapaz de reagir aos ataques.",
  },
  "especializacao-em-arma": {
    id: "especializacao-em-arma",
    name: "Especialização em Arma",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 94,
    prerequisites: ["Usar a Arma escolhida", "Foco em Arma", "4º nível de guerreiro"],
    benefit: "Escolha um tipo de arma (como machado grande) em que o personagem já tenha o talento Foco em Arma. O personagem causa dano adicional com a arma escolhida (+2 de bônus no dano causado). Especial: o personagem pode adquirir esse talento diversas vezes, cada vez aplicado a uma arma diferente.",
  },
  "especializacao-em-arma-maior": {
    id: "especializacao-em-arma-maior",
    name: "Especialização em Arma Maior",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 95,
    prerequisites: ["Usar a Arma escolhida", "Foco em Arma Maior", "Foco em Arma", "Especialização em Arma", "12º nível de guerreiro"],
    benefit: "O personagem recebe +2 de bônus no dano causado usando a arma escolhida. Este bônus se acumula com quaisquer outros bônus de dano, incluindo o dano adicional de Especialização em Arma.",
  },
  "especializacao-em-combate": {
    id: "especializacao-em-combate",
    name: "Especialização em Combate",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 95,
    prerequisites: ["Int 13"],
    benefit: "Quando usar a ação de ataque ou ataque total em combate corporal, o personagem designa entre -1 e -5 de penalidade nas jogadas de ataque e acrescenta o valor inverso como bônus de esquiva na Classe de Armadura (limitado a +5). Esse valor não pode exceder seu bônus base de ataque.",
  },
  "imobilizacao-aprimorada": {
    id: "imobilizacao-aprimorada",
    name: "Imobilização Aprimorada",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 97,
    prerequisites: ["Int 13", "Especialização em Combate"],
    benefit: "Enquanto estiver desarmado, o personagem não provoca um ataque de oportunidade para imobilizar seus adversários. Também recebe +4 de bônus nos seus testes resistidos de Força para a manobra Imobilização.",
  },
  "iniciativa-aprimorada": {
    id: "iniciativa-aprimorada",
    name: "Iniciativa Aprimorada",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 97,
    prerequisites: [],
    benefit: "O personagem recebe +4 de bônus nos testes de Iniciativa.",
  },
  lideranca: {
    id: "lideranca",
    name: "Liderança",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 97,
    prerequisites: ["6º nível de personagem"],
    benefit: "O personagem é capaz de atrair companheiros leais e seguidores devotados, subordinados que o auxiliarão.",
  },
  investigador: {
    id: "investigador",
    name: "Investigador",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 97,
    prerequisites: [],
    benefit: "O personagem recebe +2 de bônus em todos os testes de Obter Informação e Procurar.",
  },
  prontidao: {
    id: "prontidao",
    name: "Prontidão",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 99,
    prerequisites: [],
    benefit: "O personagem recebe +2 de bônus em todos os testes de Ouvir e Observar.",
  },
  rastrear: {
    id: "rastrear",
    name: "Rastrear",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 99,
    prerequisites: [],
    benefit: "O personagem é capaz de seguir rastros de criaturas e personagens através de diversos tipos de terreno, usando um teste de Sobrevivência.",
  },
  "vontade-de-ferro": {
    id: "vontade-de-ferro",
    name: "Vontade de Ferro",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 90,
    prerequisites: [],
    benefit: "+2 de bônus nos testes de resistência de Vontade.",
  },
  "fortitude-maior": {
    id: "fortitude-maior",
    name: "Fortitude Maior",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 97,
    prerequisites: [],
    benefit: "O personagem recebe +2 de bônus em todos os testes de resistência de Fortitude.",
  },
  vitalidade: {
    id: "vitalidade",
    name: "Vitalidade",
    type: "geral",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 90,
    prerequisites: [],
    benefit: "+3 pontos de vida.",
  },
  "escrever-pergaminho": {
    id: "escrever-pergaminho",
    name: "Escrever Pergaminho",
    type: "criacao_item",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 94,
    prerequisites: ["1º nível de conjurador"],
    benefit: "O personagem pode criar pergaminhos, utilizados por outros conjuradores para lançar as magias armazenadas.",
  },
  "acelerar-magia": {
    id: "acelerar-magia",
    name: "Acelerar Magia",
    type: "metamagico",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 89,
    prerequisites: [],
    benefit: "O personagem pode conjurar magias com a velocidade do pensamento: uma magia acelerada usa a ação livre e ocupa o lugar de uma magia dois níveis superiores.",
  },
  "ampliar-magia": {
    id: "ampliar-magia",
    name: "Ampliar Magia",
    type: "metamagico",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePage: 89,
    prerequisites: [],
    benefit: "O personagem é capaz de aumentar a área de efeito das suas magias (explosão, emanação, linha ou dispersão) em 100%. Uma magia ampliada ocupa o lugar de uma magia três níveis superiores.",
  },
};

export const DND35_FEAT_IDS = Object.keys(DND35_FEATS);
