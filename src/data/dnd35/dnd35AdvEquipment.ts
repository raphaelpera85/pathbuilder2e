// ============================================================================
// D&D 3.5 — Livro Completo do Aventureiro (ed. BR), Capítulo 4: Ferramentas
// e Equipamentos, seção "Novas Armas" (pp. 115-117, Tabela 4-1: Armas).
// Transcrição por leitura visual direta de páginas renderizadas em alta
// resolução (200dpi) — fonte é scan sem camada de texto. 5 armas exóticas
// completas (todas as da Tabela 4-1). Itens Alquímicos (p.118+) e demais
// seções do Capítulo 4 (armaduras, ferramentas de ladrão, itens mágicos)
// ainda não catalogados.
// ============================================================================

export type Dnd35AdvWeaponGroup = "Leve — Corpo a Corpo" | "Uma Mão — Corpo a Corpo" | "Duas Mãos — Corpo a Corpo";

export interface Dnd35AdvWeapon {
  id: string;
  name: string;
  group: Dnd35AdvWeaponGroup;
  cost: string;
  damageSmall: string;
  damageMedium: string;
  critical: string;
  /** "—" para armas sem alcance. */
  rangeIncrement: string;
  /** Peso para criaturas Médias (nota 1: Pequena pesa metade, Grande o dobro). */
  weight: string;
  type: string;
  description: string;
}

export const DND35_ADV_WEAPONS: Dnd35AdvWeapon[] = [
  {
    id: "adv-weapon-adaga-dentada",
    name: "Adaga Dentada",
    group: "Leve — Corpo a Corpo",
    cost: "35 PO",
    damageSmall: "1d3",
    damageMedium: "1d4",
    critical: "19-20/×2",
    rangeIncrement: "—",
    weight: "0,5 kg",
    type: "Perfurante",
    description: "As adagas dentadas, como o próprio nome indica, se parecem com uma adaga normal com a lâmina coberta por longos dentes. Seu desenho as torna mais difíceis de serem empunhadas corretamente do que as normais, mas permitem que os indivíduos que sabem utilizá-las infljam mais dano com um ataque corretamente posicionado. Se possuir 5 ou mais graduações em Prestidigitação e utilizar uma adaga dentada, o personagem recebe +2 de bônus nas jogadas de dano realizadas torcendo essa arma na ferida. Esse bônus também se aplica (e portanto é duplicado) nos sucessos decisivos.",
  },
  {
    id: "adv-weapon-gladio",
    name: "Gládio",
    group: "Leve — Corpo a Corpo",
    cost: "75 PO",
    damageSmall: "1d4",
    damageMedium: "1d6",
    critical: "19-20/×2",
    rangeIncrement: "—",
    weight: "1,5 kg",
    type: "Perfurante",
    description: "Os gládios possuem lâminas e guardas mais largas que as espadas curtas normais. Essa característica as torna mais difíceis de empunhar em combate, mas seu desenho permite que os indivíduos que conhecem a técnica as utilizem para se defender melhor quando lutam com cautela. Se souber usar um gládio e lutar na defensiva ou empregar a manobra de combate defesa total, o personagem recebe +1 de bônus na CA pelo restante da rodada além do bônus normal da manobra (+2 por lutar na defensiva ou +4 para defesa total). Esse bônus também se aplica se ele souber usar a arma, possuir o talento Especialização em Combate e transferir pelo menos 2 pontos do seu bônus de ataque para a CA numa determinada rodada. Devido a esse benefício por lutar na defensiva, o gládio é uma arma secundária muito popular. Os personagens que sabem usar o gládio podem tratá-lo como se fosse uma espada curta para utilizar os seguintes talentos: Foco em Arma Maior, Especialização em Arma Maior, Sucesso Decisivo Aprimorado, Foco em Arma e Especialização em Arma.",
  },
  {
    id: "adv-weapon-sabre-rapido",
    name: "Sabre Rápido",
    group: "Uma Mão — Corpo a Corpo",
    cost: "75 PO",
    damageSmall: "1d4",
    damageMedium: "1d6",
    critical: "18-20/×2",
    rangeIncrement: "—",
    weight: "1,5 kg",
    type: "Perfurante",
    description: "Os sabres rápidos são mais longos e delgados que o normal, com lâminas de curvatura especial e pomos cuidadosamente balanceados. Esse desenho torna sua utilização mais difícil que a de um sabre comum, mas permite que os indivíduos que conhecem a técnica a utilizem para desarmar os oponentes mais facilmente e para fintar em combate com mais eficiência. A maioria dos sabres rápidos é de qualidade (obra-prima) ou superior. Caso saiba usar o sabre rápido, o personagem recebe +2 de bônus nas jogadas de ataque resistidas para desarmar um inimigo (incluindo a jogada para evitar ser desarmado se fracassar na tentativa). Ele também recebe +2 de bônus de circunstância nos testes de Blefar para fintar em combate. O personagem pode empregar o talento Acuidade com Arma (consulte o Livro do Jogador) para aplicar seu modificador de Destreza em vez do modificador de Força às jogadas de ataque com um sabre rápido de tamanho apropriado. Não é possível empunhar essa arma com as duas mãos para aplicar 1,5 vezes o bônus de Força ao dano. Os personagens que sabem usar o sabre rápido podem tratá-lo como se fosse um sabre para utilizar os seguintes talentos: Foco em Arma Maior, Especialização em Arma Maior, Sucesso Decisivo Aprimorado, Foco em Arma e Especialização em Arma. Também é possível atacar com um sabre rápido mesmo estando montado a cavalo, sem precisar do talento Combate Montado.",
  },
  {
    id: "adv-weapon-bordao-longo",
    name: "Bordão Longo",
    group: "Duas Mãos — Corpo a Corpo",
    cost: "15 PO",
    damageSmall: "1d4/1d4",
    damageMedium: "1d6/1d6",
    critical: "×2",
    rangeIncrement: "—",
    weight: "3 kg",
    type: "Concussão",
    description: "Apenas uma das extremidades do bordão longo é afiada o suficiente para ser usada em combate como arma dupla. Uma criatura empunhando um bordão longo em uma das mãos não consegue utilizá-lo como uma arma dupla — apenas uma extremidade pode ser empregada em cada rodada. O bordão longo é uma arma especial para monges. Essa característica permite que um monge empunhando essa arma tenha acesso à opção especial de ataque (consulte a descrição da habilidade rajada de golpes no Livro do Jogador). Os personagens que sabem usar o bordão longo podem tratá-lo como se fosse um bordão para utilizar os seguintes talentos: Foco em Arma Maior, Especialização em Arma Maior, Sucesso Decisivo Aprimorado, Foco em Arma e Especialização em Arma.",
  },
  {
    id: "adv-weapon-machado-longo",
    name: "Machado Longo",
    group: "Duas Mãos — Corpo a Corpo",
    cost: "35 PO",
    damageSmall: "1d10",
    damageMedium: "1d12",
    critical: "×3",
    rangeIncrement: "—",
    weight: "7,5 kg",
    type: "Cortante",
    description: "Um machado longo se parece com um machado grande com o cabo mais elaborado. Essa característica torna seu manejo desajeitado para aqueles que não sabem como usá-lo, mas os que conhecem a técnica são capazes de utilizar seu comprimento adicional para atacar inimigos a mais de 1,5 m de distância, desde que estejam dispostos a abrir mão da precisão em favor de infligir dano adicional. Caso o personagem saiba usar o machado longo, ele pode tratá-lo como uma arma de haste sempre que utilizar o talento Ataque Poderoso para transferir 3 pontos ou mais do seu bônus de ataque para o dano. Ao utilizar o machado longo dessa forma, ele consegue atingir oponentes a 3 m de distância, mas não é capaz de usá-lo contra inimigos adjacentes. Como o efeito do talento Ataque Poderoso continua durante todo o turno, o personagem precisa empunhar o machado longo como uma arma normal ou de haste até o início de seu próximo turno após tomar essa decisão. Não é possível utilizá-la como arma normal e de haste na mesma rodada. Os personagens que sabem usar o machado longo podem tratá-lo como se fosse um machado grande para utilizar os seguintes talentos: Foco em Arma Maior, Especialização em Arma Maior, Sucesso Decisivo Aprimorado, Foco em Arma e Especialização em Arma.",
  },
];

export interface Dnd35AdvItem {
  id: string;
  name: string;
  category: "alquimico" | "capsula" | "ferramenta";
  cost: string;
  weight: string;
  craftDc?: number;
  duration?: string;
  description: string;
}

export const DND35_ADV_ITEMS: Dnd35AdvItem[] = [
  // Tabela 4-2: Itens Alquímicos (pp. 118-120)
  {
    id: "adv-item-apertofirme",
    name: "Apertofirme",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 minuto",
    description: "Essa pasta branca e grossa, ao ser aplicada às mãos e aos pés, fortalece e dá firmeza, tornando mais fácil escalar. Apertofirme fornece +1 de bônus alquímico nos testes de Escalar durante 1 minuto. Uma dose é suficiente para cobrir as mãos e os pés de uma criatura Média. Aplicar a substância é uma ação padrão que provoca ataques de oportunidade.",
  },
  {
    id: "adv-item-balsamo-de-cura",
    name: "Bálsamo de Cura",
    category: "alquimico",
    cost: "10 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 minuto",
    description: "Esse bálsamo suave, de cheiro adocicado, permite que um curandeiro alivie os efeitos de ferimentos, doenças e venenos. O bálsamo de cura fornece +1 de bônus alquímico nos testes de Cura para ajudar a criatura afetada. Seus efeitos duram 1 minuto. Uma dose é suficiente para cobrir uma criatura Média. Aplicar é uma ação padrão que provoca ataques de oportunidade.",
  },
  {
    id: "adv-item-bebida-natural",
    name: "Bebida Natural",
    category: "alquimico",
    cost: "30 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "12 horas",
    description: "Essa poção é um líquido turvo e pungente. Ao ser consumida, provoca alterações sutis no odor do usuário: animais respondem bem e o consideram menos ameaçador e mais digno de confiança. Ingerir um frasco fornece +1 de bônus alquímico nos testes de Adestrar Animais e Empatia com a Natureza durante 12 horas.",
  },
  {
    id: "adv-item-creme-da-camuflagem",
    name: "Creme da Camuflagem",
    category: "alquimico",
    cost: "25 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 hora",
    description: "Esse creme cinza-claro embota a cor da pele, pelos, escamas e cabelos, permitindo que o usuário se misture melhor à paisagem e às sombras. Fornece +1 de bônus alquímico nos testes de Esconder-se durante 1 hora. Não concede camuflagem ou capacidade de esconder-se sem cobertura.",
  },
  {
    id: "adv-item-fedegato",
    name: "Fedegato",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "10 minutos",
    description: "Uma dose desse composto aspergida sobre o rastro confunde temporariamente o olfato de rastreadores: quem utilizar faro para rastreá-lo deve passar num teste de Sobrevivência (CD 15) ou perderá o rastro. Para reencontrar o rastro com Rastrear, a CD aumenta em +2. O odor permanece ativo por 10 minutos.",
  },
  {
    id: "adv-item-gel-sabao",
    name: "Gel-Sabão",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 hora",
    description: "Gel cinza-esverdeado aplicado na pele, roupas ou armadura. Torna a superfície escorregadia e difícil de agarrar, concedendo +2 de bônus alquímico nos testes de Arte da Fuga durante 1 hora.",
  },
  {
    id: "adv-item-graxa-de-engrenagem",
    name: "Graxa de Engrenagem",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 minuto",
    description: "Óleo espesso e avermelhado que afrouxa as engrenagens de fechaduras mecânicas mundanas. Fornece +1 de bônus alquímico nos testes de Abrir Fechaduras contra a tranca afetada durante 1 minuto. Não tem efeito sobre trancas mágicas.",
  },
  {
    id: "adv-item-oleo-de-vistalonga",
    name: "Óleo de Vistalonga",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 minuto",
    description: "Aplicado sobre os olhos, esse óleo translúcido aguça a visão por um breve período, concedendo +1 de bônus alquímico nos testes de Observar durante 1 minuto. Aplicar é uma ação padrão que provoca ataques de oportunidade.",
  },
  {
    id: "adv-item-passomacio",
    name: "Passomacio",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 hora",
    description: "Pó fino e acinzentado que abafa os sons quando aplicado à sola dos pés ou calçados. Fornece +1 de bônus alquímico nos testes de Furtividade durante 1 hora.",
  },
  {
    id: "adv-item-pelota-luminosa",
    name: "Pelota Luminosa",
    category: "alquimico",
    cost: "30 PO",
    weight: "—",
    craftDc: 25,
    duration: "1 rodada + 1 rodada",
    description: "Objeto pequeno e quebradiço que pode ser lançado como arma de arremesso (incremento de distância 3 m). Ao colidir contra superfície dura, explode num clarão: criaturas a até 3 m devem obter sucesso em Fortitude (CD 15) ou ficam cegas por 1 rodada e ofuscadas na rodada seguinte.",
  },
  {
    id: "adv-item-po-de-ouvidobom",
    name: "Pó de Ouvidobom",
    category: "alquimico",
    cost: "20 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 minuto",
    description: "Pó branco e seco que aguça a audição quando aplicado às orelhas. Concede +1 de bônus alquímico nos testes de Ouvir durante 1 minuto.",
  },
  {
    id: "adv-item-unguento-da-aguia",
    name: "Ungüento da Águia",
    category: "alquimico",
    cost: "25 PO",
    weight: "0,5 kg",
    craftDc: 25,
    duration: "2 minutos / 10 minutos",
    description: "Gel espesso e ácido que aguça temporariamente a visão: concede +2 de bônus alquímico nos testes de Procurar e Observar durante 2 minutos. Após esse período, arde nos olhos infligindo -2 de penalidade nos mesmos testes por 10 minutos (pode ser lavada com água limpa em 1 rodada).",
  },
  {
    id: "adv-item-vela-do-foco",
    name: "Vela do Foco",
    category: "alquimico",
    cost: "30 PO",
    weight: "0,5 kg",
    craftDc: 20,
    duration: "1 hora",
    description: "Grande círio verde que queima durante 1 hora emanando aroma refrescante e agreste. Personagens a até 6 m de uma vela do foco acesa recebem +1 de bônus de circunstância nos testes de Avaliação, Decifrar Escrita, Falsificação e Procurar.",
  },

  // Tabela 4-3: Cápsulas Alquímicas e Instrumentos (pp. 120-122)
  {
    id: "adv-item-dente-alquimico",
    name: "Dente Alquímico",
    category: "capsula",
    cost: "30 PO",
    weight: "—",
    craftDc: 25,
    description: "Dente postiço oco e disfarçado para comportar uma cápsula alquímica ou dose de veneno. Exige teste de Procurar (CD 25) para ser detectado. Romper a cápsula armazenada é uma ação rápida.",
  },
  {
    id: "adv-item-porta-capsulas",
    name: "Porta-Cápsulas",
    category: "capsula",
    cost: "5 PO",
    weight: "—",
    description: "Fino cordão elástico enrolado ao redor de um dente segurando um pequeno anel de metal com uma cápsula alquímica. Romper a cápsula armazenada na boca é uma ação rápida.",
  },
  {
    id: "adv-item-capsula-de-antitoxina",
    name: "Cápsula de Antitoxina",
    category: "capsula",
    cost: "15 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 minuto",
    description: "Armazena dose concentrada de antitoxina suave. Ao ser ingerida, concede +1 de bônus alquímico nos testes de Fortitude contra venenos durante 1 minuto.",
  },
  {
    id: "adv-item-capsula-da-estabilidade",
    name: "Cápsula da Estabilidade",
    category: "capsula",
    cost: "15 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 rodada",
    description: "Líquido espesso que amplia temporariamente o senso de equilíbrio. O usuário recebe +4 de bônus alquímico nos testes de Equilíbrio durante 1 rodada.",
  },
  {
    id: "adv-item-capsula-de-forca",
    name: "Cápsula de Força",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 25,
    duration: "2 rodadas",
    description: "Líquido avermelhado que amplia a força física: concede +1 de bônus alquímico nas jogadas de dano com armas corpo a corpo e testes de Força por 2 rodadas. Em seguida, o usuário fica fatigado (ou exausto se já estiver fatigado).",
  },
  {
    id: "adv-item-capsula-do-salto",
    name: "Cápsula do Salto",
    category: "capsula",
    cost: "15 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 rodada",
    description: "Líquido acinzentado que permite executar saltos mais vigorosos: concede +4 de bônus alquímico nos testes de Saltar durante 1 rodada.",
  },
  {
    id: "adv-item-capsula-da-velocidade",
    name: "Cápsula da Velocidade",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 25,
    duration: "2 rodadas",
    description: "Líquido azulado que acelera o passo do usuário: aumenta o deslocamento base em +1,5 m durante 2 rodadas. Em seguida, o usuário fica fatigado (ou exausto se já estiver fatigado).",
  },
  {
    id: "adv-item-capsula-do-vigor",
    name: "Cápsula do Vigor",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 25,
    duration: "1 rodada",
    description: "Líquido de cor clara que permite ignorar dores e restrições da condição zonzo na rodada em que é ingerida (ação rápida), permitindo realizar uma ação de movimento e uma ação padrão completas.",
  },

  // Tabela 4-4: Cápsulas Alquímicas para Armas (pp. 122-123)
  {
    id: "adv-item-retentor-de-capsulas",
    name: "Retentor de Cápsulas",
    category: "ferramenta",
    cost: "100 PO",
    weight: "0,5 kg",
    description: "Dispositivo acoplado a uma arma corpo a corpo ou de arremesso que comporta uma cápsula alquímica para armas. Ativar a cápsula para cobrir a lâmina/cabeça da arma é uma ação rápida.",
  },
  {
    id: "adv-item-capsula-anti-fantasma",
    name: "Cápsula Anti-fantasma",
    category: "capsula",
    cost: "100 PO",
    weight: "—",
    craftDc: 30,
    duration: "3 rodadas",
    description: "Reveste uma arma com óleo que permite ignorar a chance de falha normal de 50% contra criaturas incorpóreas (como na propriedade toque espectral) durante 3 rodadas.",
  },
  {
    id: "adv-item-capsula-de-chamas-instantaneas",
    name: "Cápsula de Chamas Instantâneas",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 rodada",
    description: "Reveste a arma em combustão temporária segura para o portador: inflige +1d6 pontos de dano por fogo em cada ataque bem-sucedido durante 1 rodada.",
  },
  {
    id: "adv-item-capsula-de-faiscas-instantaneas",
    name: "Cápsula de Faíscas Instantâneas",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 rodada",
    description: "Reveste a arma com óleo elétrico crepitante: inflige +1d6 pontos de dano por eletricidade em cada ataque bem-sucedido durante 1 rodada.",
  },
  {
    id: "adv-item-capsula-de-gelo-instantaneo",
    name: "Cápsula de Gelo Instantâneo",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 20,
    duration: "1 rodada",
    description: "Reveste a arma em camada fria perigosa: inflige +1d6 pontos de dano por frio em cada ataque bem-sucedido durante 1 rodada.",
  },
  {
    id: "adv-item-capsula-de-prata-instantanea",
    name: "Cápsula de Prata Instantânea",
    category: "capsula",
    cost: "25 PO",
    weight: "—",
    craftDc: 25,
    duration: "3 rodadas",
    description: "Reveste a arma com fino líquido prateado: a arma inflige dano como se fosse feita de prata (incluindo -1 de penalidade no dano) durante 3 rodadas.",
  },

  // Tabela 4-5: Ferramentas e Kits de Perícia (pp. 124-125)
  {
    id: "adv-item-cone-de-audicao",
    name: "Cone de Audição",
    category: "ferramenta",
    cost: "20 PO",
    weight: "0,5 kg",
    description: "Cone de latão ou madeira projetado para ser encostado em portas ou paredes. Concede +2 de bônus de circunstância nos testes de Ouvir através de portas ou superfícies sólidas.",
  },
  {
    id: "adv-item-ferramentas-de-ladrao-longo-alcance",
    name: "Ferramentas de Ladrão de Longo Alcance",
    category: "ferramenta",
    cost: "30 PO",
    weight: "1,5 kg",
    description: "Conjunto de hastes extensíveis e espelhos angulares que permite ao ladino abrir fechaduras e desarmar dispositivos a até 1,5 m de distância (evitando armadilhas de toque imediato). Aplica -2 de penalidade no teste.",
  },
  {
    id: "adv-item-ferramentas-de-ladrao-longo-alcance-obra-prima",
    name: "Ferramentas de Ladrão de Longo Alcance (Obra-prima)",
    category: "ferramenta",
    cost: "150 PO",
    weight: "1,5 kg",
    description: "Versão de manufatura excepcional das ferramentas de longo alcance. Permite operar dispositivos e trancas a 1,5 m de distância sem qualquer penalidade.",
  },
  {
    id: "adv-item-kit-de-camuflagem",
    name: "Kit de Camuflagem",
    category: "ferramenta",
    cost: "40 PO",
    weight: "2,5 kg",
    description: "Bolsa com maquiagens, tinturas e tecidos coloridos que concede +2 de bônus de circunstância nos testes de Esconder-se após 1 minuto de preparação. Contém material suficiente para 10 usos.",
  },
  {
    id: "adv-item-kit-de-falsificacao",
    name: "Kit de Falsificação",
    category: "ferramenta",
    cost: "40 PO",
    weight: "1,5 kg",
    description: "Estojo com papéis de vários tipos, penas, ceras para selo, tintas de cores variadas e modelos de brasões nobres. Concede +2 de bônus de circunstância nos testes de Falsificação. 10 usos.",
  },
  {
    id: "adv-item-kit-de-adestramento-de-animais",
    name: "Kit de Adestramento de Animais",
    category: "ferramenta",
    cost: "75 PO",
    weight: "2,5 kg",
    description: "Chicotes acolchoados, apitos de alta frequência, guloseimas e arreios especiais que concedem +2 de bônus de circunstância nos testes de Adestrar Animais.",
  },
  {
    id: "adv-item-sela-obra-prima-montaria",
    name: "Sela (Obra-prima) de Montaria",
    category: "ferramenta",
    cost: "60 PO",
    weight: "12,5 kg",
    description: "Sela refinada e confortável ajustada ao tipo de montaria. Concede +1 de bônus de circunstância nos testes de Cavalgar.",
  },
  {
    id: "adv-item-sela-obra-prima-militar",
    name: "Sela (Obra-prima) Militar",
    category: "ferramenta",
    cost: "80 PO",
    weight: "15 kg",
    description: "Sela militar com apoios para pernas e torso de excelente manufatura. Concede +1 de bônus de circunstância em testes de Cavalgar, cumulativo com o bônus de +2 da sela militar para permanecer sobre a sela (+3 no total).",
  },
  {
    id: "adv-item-vara-de-equilibrio",
    name: "Vara de Equilíbrio",
    category: "ferramenta",
    cost: "10 PO",
    weight: "4 kg",
    description: "Vara comprida e flexível de 3 metros que concede +2 de bônus de circunstância nos testes de Equilíbrio, desde que haja espaço livre de pelo menos 1,5 m de cada lado do personagem.",
  },
];

