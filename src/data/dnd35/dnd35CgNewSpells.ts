/**
 * Novas magias do D&D 3.5 — O Livro Completo do Guerreiro (ed. BR),
 * seção "Descrição das Novas Magias" (pp.117-118). Ameaça Fantasma,
 * Cão da Ruína, Fúria Valente, Lâmina Amaldiçoada, Manto da Bravura,
 * Manto da Bravura Maior e Rugido do Leão são magias inteiramente novas;
 * Aumentar Familiar já existe no Livro do Jogador mas o livro a inclui
 * com stat block completo por ser adicionada à lista da Lâmina Maldita.
 */
export type CgNewSpell = {
  id: string;
  name: string;
  page: number;
  school: string;
  level: string;
  components: string;
  castingTime: string;
  range: string;
  target?: string;
  area?: string;
  effect?: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
};

export const CG_NEW_SPELLS: CgNewSpell[] = [
  {
    id: "cg-spell-ameaca-fantasma",
    name: "Ameaça Fantasma",
    page: 117,
    school: "Ilusão (Fantasma) [Ação Mental]",
    level: "Brd 1, Lâmina Maldita 1",
    components: "V, G",
    castingTime: "1 ação",
    range: "Curto (7,5 m +1,5 m/2 níveis)",
    target: "Uma criatura",
    duration: "1 rodada/nível",
    savingThrow: "Vontade anula",
    spellResistance: "Sim",
    description: "O conjurador gera uma sensação na mente do alvo, e ele pensa que está sendo ameaçado por mais inimigos do que está realmente enfrentando. Embora o alvo não enxergue qualquer inimigo adicional (e, portanto, não desperdice ataques contra ele fantasmas), ele será considerado flanqueado, mesmo que não esteja ameaçado por outras criaturas adjacentes. Nenhuma advertência ou argumentação dos aliados poderá reverter os efeitos dessa magia — apenas um teste de resistência bem-sucedido no momento da conjuração podem ajudar a vítima.",
  },
  {
    id: "cg-spell-aumentar-familiar",
    name: "Aumentar Familiar",
    page: 117,
    school: "Transmutação",
    level: "Fet/Mag 2, Lâmina Maldita 1",
    components: "V, G",
    castingTime: "1 ação",
    range: "Curto (7,5 m +1,5 m/2 níveis)",
    target: "O familiar do conjurador",
    duration: "Concentração +1 rodada/nível",
    savingThrow: "Fortitude anula (inofensiva)",
    spellResistance: "Sim (inofensiva)",
    description: "Essa magia concede +4 de bônus de melhoria na Força, Destreza e Constituição, Redução de Dano 5/magia e +2 de bônus de resistência nos testes de resistência do familiar do personagem.",
  },
  {
    id: "cg-spell-cao-da-ruina",
    name: "Cão da Ruína",
    page: 117,
    school: "Ilusão (Sombra)",
    level: "Lâmina Maldita 3",
    components: "V, G",
    castingTime: "1 rodada",
    range: "Curto (7,5 m +1,5 m/2 níveis)",
    effect: "Cachorro de sombras",
    duration: "1 minuto/nível (D) ou até ser destruído",
    savingThrow: "Nenhum",
    spellResistance: "Não",
    description: "O conjurador modela a essência do Plano das Sombras para criar um companheiro canídeo poderoso, que o servirá lealmente enquanto a magia permanecer ativa. O cão da ruína possui as estatísticas do lobo atroz (descrito no Livro dos Monstros), com os seguintes ajustes: ele adiciona o bônus de Carisma do conjurador como um bônus de deflexão na CA, possui o total de pontos de vida do conjurador no momento da criação, e utiliza o bônus base de ataque do conjurador (aplicando +7 de bônus de Força e -1 de penalidade de tamanho). É possível comandar um cão da ruína como se fosse um animal treinado e sob os efeitos de todos os truques descritos na perícia Adestrar Animais (veja o Livro do Jogador). Se os pontos de vida de um cão da ruína forem reduzidos a 0 ou menos, ele será destruído. O cão da ruína é considerado uma besta mágica para determinar os efeitos de certas magias, mas também pode ser dissipado. Somente um cão da ruína pode ser criado simultaneamente pelo mesmo conjurador. Caso ele lance uma segunda magia cão da ruína, a primeira criatura será automaticamente dissipada.",
  },
  {
    id: "cg-spell-furia-valente",
    name: "Fúria Valente",
    page: 117,
    school: "Transmutação",
    level: "Coragem 5",
    components: "V, G, FD",
    castingTime: "1 ação",
    range: "Curto (7,5 m +1,5 m/2 níveis)",
    target: "Uma criatura viva",
    duration: "1 rodada/nível",
    savingThrow: "Vontade anula (inofensiva)",
    spellResistance: "Sim (inofensiva)",
    description: "A criatura afetada recebe +4 de bônus de moral na Força e Constituição, e +2 de bônus de moral nos testes de resistência de Vontade. Além disso, quando realizar um ataque total, a criatura poderá desferir um ataque adicional com qualquer arma que estiver usando. O ataque usa o bônus de ataque mais elevado, além dos modificadores apropriados. Esse efeito não se acumula com efeitos similares, como o ataque extra da magia velocidade, nem fornece uma ação extra, logo o personagem não é capaz de lançar uma segunda magia ou realizar uma ação adicional na rodada.",
  },
  {
    id: "cg-spell-lamina-amaldicoada",
    name: "Lâmina Amaldiçoada",
    page: 117,
    school: "Necromancia",
    level: "Assassino 4, Lâmina Maldita 4",
    components: "V",
    castingTime: "1 ação",
    range: "Toque",
    target: "Uma arma branca",
    duration: "1 minuto/nível",
    savingThrow: "Nenhum",
    spellResistance: "Não",
    description: "A arma visada por esta magia causa ferimentos que não podem ser curados normalmente. Qualquer dano infligido pela arma (exceto o dano de habilidades especiais, como flamejante, sagrado, sangramento, etc.) não poderá ser recuperado de nenhuma forma, até que a vítima seja alvo da magia remover maldição ou qualquer efeito que neutralize uma maldição. Se a criatura perecer devido aos ferimentos de uma lâmina amaldiçoada, ela não poderá ser revivida a menos que uma magia remover maldição (ou similar) seja conjurada sobre o corpo, ou seus aliados utilizem ressurreição verdadeira.",
  },
  {
    id: "cg-spell-manto-da-bravura",
    name: "Manto da Bravura",
    page: 118,
    school: "Abjuração [Ação Mental]",
    level: "Clr 3, Coragem 3, Pal 2",
    components: "V, G",
    castingTime: "1 ação",
    range: "18 m",
    area: "Emanação de 18 m de raio centrada no conjurador",
    duration: "10 minutos/nível",
    savingThrow: "Vontade anula (inofensiva)",
    spellResistance: "Sim (inofensiva)",
    description: "Todos os aliados na área afetada, inclusive o conjurador, recebem um bônus de moral nos testes de resistência contra efeitos de medo, equivalente ao nível do conjurador (máximo +10 no 10º nível).",
  },
  {
    id: "cg-spell-manto-da-bravura-maior",
    name: "Manto da Bravura Maior",
    page: 118,
    school: "Abjuração [Ação Mental]",
    level: "Coragem 9",
    components: "V, G",
    castingTime: "1 ação",
    range: "1,5 km, veja o texto",
    area: "Emanação de 1,5 km de raio centrada no conjurador",
    duration: "1 hora/nível",
    savingThrow: "Vontade anula (inofensiva)",
    spellResistance: "Sim (inofensiva)",
    description: "Similar ao manto da bravura, mas todos os aliados na área afetada, inclusive o conjurador, são imunes a efeitos de medo e recebem +2 de bônus de moral nas jogadas de ataque. Os aliados que não tiverem uma linha de visão direta com o conjurador não são afetados.",
  },
  {
    id: "cg-spell-rugido-do-leao",
    name: "Rugido do Leão",
    page: 118,
    school: "Evocação [Sônica]",
    level: "Coragem 8",
    components: "V, G, FD",
    castingTime: "1 ação",
    range: "36 m",
    area: "Emanação de 36 m de raio centrada no conjurador",
    duration: "Instantânea ou 1 minuto/nível",
    savingThrow: "Fortitude parcial ou Vontade anula (inofensiva); veja o texto",
    spellResistance: "Sim ou Sim (inofensiva); veja o texto",
    description: "O conjurador emite um rugido titânico que causa 1d8 pontos de dano sônico a cada 2 níveis de conjurador em todas as criaturas na área afetada, que ficarão atordoadas durante 1 rodada. Um teste de resistência de Fortitude reduz o dano à metade e anula o efeito de atordoamento. Além disso, todos os aliados na área afetada recebem +1 de bônus de moral nas jogadas de ataque e nos testes de resistência contra efeitos de medo, e pontos de vida temporários equivalentes a 1d8 +1 por nível de conjurador (máximo 1d8+20 no 20º nível).",
  },
];
