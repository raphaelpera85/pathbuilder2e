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
