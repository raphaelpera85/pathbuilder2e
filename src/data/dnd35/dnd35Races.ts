// ============================================================================
// D&D 3.5 - Catálogo de Raças (núcleo)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português). O PDF fonte é uma digitalização de imagem sem camada de texto
// (confirmado via pypdf/pymupdf: 0 caracteres extraíveis em todas as
// páginas). Os dados abaixo foram transcritos por leitura visual direta das
// páginas renderizadas em alta resolução (400dpi), não por OCR nem por
// memória — cada raça cita a página do PDF de onde foi lida.
//
// Todas as 7 raças núcleo do Capítulo 2 foram lidas nesta sessão: Anão, Elfo,
// Gnomo (páginas 13-17), Humano (página 13), Meio-Elfo (página 17) e
// Meio-Orc (página 19). O capítulo de raças está completo; próximo passo é
// o Capítulo 3 (Classes).
// ============================================================================

export type Dnd35AbilityName = "for" | "des" | "con" | "int" | "sab" | "car";

export interface Dnd35Race {
  id: string;
  name: string;
  nameEn: string;
  sourceBook: string;
  sourcePageStart: number;
  size: "Pequeno" | "Médio";
  baseSpeed: number; // metros
  statModifiers: Partial<Record<Dnd35AbilityName, number>>;
  languages: string[];
  bonusLanguages: string[];
  favoredClass: string;
  traits: string[];
  description: string;
}

export const DND35_RACES: Record<string, Dnd35Race> = {
  anao: {
    id: "anao",
    name: "Anão",
    nameEn: "Dwarf",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 13,
    size: "Médio",
    baseSpeed: 6,
    statModifiers: { con: 2, car: -2 },
    languages: ["Comum", "Anão"],
    bonusLanguages: ["Gnomo", "Gigante", "Goblin", "Orc", "Terran"],
    favoredClass: "Guerreiro",
    traits: [
      "Tamanho Médio: sem penalidade ou bônus em relação ao tamanho.",
      "Deslocamento básico de 6 metros, mas nunca é reduzido por armadura média ou pesada, nem por carga média ou pesada (ao contrário de outras raças).",
      "Visão no Escuro: enxergam até 18 metros no escuro.",
      "Estabilidade: +4 de bônus em testes de habilidade realizados para resistir a ser encontrão ou imobilizado quando estiver com os pés firmes no chão (mas não quando estiver escalando, voando, cavalgando ou em qualquer situação sem contato firme com o solo).",
      "+2 de bônus racial nos testes de resistência contra veneno: são fortes e resistentes a toxinas.",
      "+2 de bônus racial nos testes de resistência contra magias e efeitos similares à magia.",
      "+1 de bônus racial nas jogadas de ataque contra goblinoides (goblins, hobgoblins e bugbears).",
      "+4 de bônus de esquiva na CA contra monstros do tipo gigante (como ogros, trolls e gigantes das colinas); esse bônus é perdido quando o personagem perde seu bônus de Destreza à CA.",
      "+2 de bônus racial nos testes de Avaliação relacionados a objetos de metal ou pedra.",
      "+2 de bônus racial nos testes de Ofícios relacionados a objetos de metal ou pedra.",
      "Ligação com Pedras: +2 de bônus racial em testes de Procurar para identificar trabalhos incomuns de alvenaria (paredes deslizantes, armadilhas, construções recentes, superfícies rochosas instáveis etc.); podem tentar esse teste mesmo sem procurar ativamente.",
      "Familiaridade com Armas: consideram o machado de guerra anão e o urgrosh anão como armas marciais (não exóticas).",
      "Idiomas Básicos: Comum e Anão. Idiomas adicionais: Gigante, Gnomo, Goblin, Orc, Terran e Subterrâneo.",
      "Classe Predileta: Guerreiro.",
    ],
    description: "Famosos por sua eficiência militar, resistência a castigos físicos e mágicos, conhecimento sobre segredos da terra, trabalho árduo e capacidade de beber cerveja. Vivem em reinos escavados no interior das montanhas.",
  },
  elfo: {
    id: "elfo",
    name: "Elfo",
    nameEn: "Elf",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 14,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: { des: 2, con: -2 },
    languages: ["Comum", "Élfico"],
    bonusLanguages: ["Draconiano", "Gnoll", "Gnomo", "Goblin", "Orc", "Silvestre"],
    favoredClass: "Mago",
    traits: [
      "+2 de Destreza, -2 de Constituição: os elfos são graciosos, mas frágeis.",
      "Tamanho Médio: como criaturas Médias, os elfos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.",
      "O deslocamento básico dos elfos equivale a 9 metros.",
      "Imunidade a magias e efeitos de sono e +2 de bônus racial nos testes de resistência contra magias ou efeitos similares do Encantamento.",
      "Visão na Penumbra: os elfos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir cores e detalhes.",
      "Usar Armas: os elfos recebem o talento Usar Arma Comum para espada longa, sabre, arco longo (inclusive arco composto) e arco curto (inclusive arco curto composto) como um talento adicional.",
      "+2 de bônus racial nos testes de Ouvir, Procurar e Observar. Um elfo que passar a 1,5 metro de uma porta secreta ou escondida pode realizar um teste de Procurar como se estivesse procurando ativamente.",
      "Idiomas Básicos: Comum e Élfico. Idiomas Adicionais: Draconiano, Gnoll, Gnomo, Goblin, Orc e Silvestre.",
      "Classe Predileta: Mago.",
    ],
    description: "Caminham livremente nas terras dos humanos, famosos pela poesia, dança, música, cultura e artes mágicas. Valorizam a liberdade e tendem fortemente aos aspectos mais amenos do Caos.",
  },
  gnomo: {
    id: "gnomo",
    name: "Gnomo",
    nameEn: "Gnome",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 16,
    size: "Pequeno",
    baseSpeed: 6,
    statModifiers: { con: 2, for: -2 },
    languages: ["Comum", "Gnomo"],
    bonusLanguages: ["Draconiano", "Anão", "Élfico", "Gigante", "Goblin", "Orc"],
    favoredClass: "Bardo",
    traits: [
      "+2 de Constituição, -2 de Força: assim como os anões, os gnomos são resistentes, mas sua estatura não permite que sejam tão fortes quanto os humanoides maiores.",
      "Tamanho Pequeno: como criaturas Pequenas, os gnomos recebem +1 de bônus de tamanho na Classe de Armadura, +1 de bônus de tamanho nas jogadas de ataque e +4 de bônus de tamanho nos testes de Esconder-se, mas precisam usar armas menores que as de humanos e sua capacidade de levantar e carregar peso equivale a três quartos da carga máxima das criaturas Médias.",
      "O deslocamento básico dos gnomos equivale a 6 metros.",
      "Visão na Penumbra: os gnomos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir cores e detalhes.",
      "Familiaridade com Armas: os gnomos consideram o martelo gnomo com gancho como uma arma comum, em vez de uma arma exótica.",
      "+2 de bônus racial nos testes de resistência contra ilusões: os gnomos estão familiarizados com ilusões de todos os tipos.",
      "+1 de bônus na Classe de Dificuldade dos testes de resistência contra as ilusões conjuradas por um gnomo. A familiaridade da raça com esses efeitos torna as ilusões da raça mais difíceis de serem evitadas. Esse modificador se acumula com efeitos similares, como o talento Foco em Magia.",
      "+1 de bônus racial nas jogadas de ataque contra kobolds e goblinoides (goblins, hobgoblins e bugbears): os gnomos enfrentam essas criaturas com frequência e criaram técnicas especiais para combatê-las.",
      "+4 de bônus de esquiva na CA contra monstros do tipo gigante (como ogros, trolls e gigantes das colinas); esse bônus é perdido quando o personagem perde seu bônus de Destreza à CA — durante uma rodada surpresa, por exemplo — também perderá esse bônus de esquiva.",
      "+2 de bônus racial nos testes de Ouvir: os gnomos possuem a audição aguçada.",
      "+2 de bônus racial nos testes de Ofícios (alquimia): o olfato sensível do gnomo permite que ele acompanhe os processos alquímicos através do cheiro.",
      "Idiomas Básicos: Comum e Gnomo. Idiomas Adicionais: Draconiano, Anão, Élfico, Gigante, Goblin e Orc. Os gnomos negociam com os elfos e os anões com mais frequência do que essas raças tratam entre si, e também aprendem os idiomas de seus inimigos (kobolds, gigantes, goblins e orcs). Além disso, conseguem se comunicar com mamíferos terrestres (uma toupeira, uma raposa, um coelho e animais similares).",
      "Habilidades Similares à Magia: 1/dia — falar com animais (somente mamíferos terrestres, 1 minuto de duração). Um gnomo com Carisma 10, no mínimo, também possui as seguintes habilidades similares à magia: 1/dia — globos de luz, som fantasma, prestidigitação. Nível de conjurador: 1º nível; teste de resistência CD 10 + modificador de Carisma + nível da magia.",
      "Classe Predileta: Bardo.",
    ],
    description: "Bem-vindos em todos os lugares como técnicos, alquimistas e inventores. Curiosos e apreciadores de brincadeiras, jogos e truques; dedicam empenho às artes práticas como Ofícios.",
  },
  halfling: {
    id: "halfling",
    name: "Halfling",
    nameEn: "Halfling",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 20,
    size: "Pequeno",
    baseSpeed: 6,
    statModifiers: { des: 2, for: -2 },
    languages: ["Comum", "Halfling"],
    bonusLanguages: ["Anão", "Élfico", "Gnomo", "Goblin", "Orc"],
    favoredClass: "Ladino",
    traits: [
      "+2 de Destreza, -2 de Força: os halflings são rápidos, ágeis e habilidosos com armas à distância, mas são pequenos e mais fracos do que os outros humanoides.",
      "Tamanho Pequeno: como criaturas Pequenas, os halflings recebem +1 de bônus de tamanho na Classe de Armadura, +1 de bônus de tamanho nas jogadas de ataque e +4 de bônus de tamanho nos testes de Esconder-se, mas precisam usar armas menores que as dos humanos e sua capacidade de levantar e carregar peso equivale a três quartos da carga máxima das criaturas Médias.",
      "O deslocamento básico dos halflings equivale a 6 metros.",
      "+2 de bônus racial nos testes de Escalar, Saltar e Furtividade: os halflings são ágeis, atléticos e estáveis.",
      "+2 de bônus racial em todos os testes de resistência: os halflings têm uma habilidade surpreendente para escapar de situações difíceis.",
      "+2 de bônus de moral nos testes de resistência contra medo. Esse modificador se acumula com o bônus aplicado aos testes de resistência dos halflings.",
      "+1 de bônus racial nas jogadas de ataque com armas de arremesso e fundas: arremessar pedras é um passe universal entre halflings e eles desenvolveram uma pontaria excelente.",
      "+2 de bônus nos testes de Ouvir: os halflings possuem a audição aguçada.",
      "Idiomas Básicos: Comum e Halfling. Idiomas Adicionais: Anão, Élfico, Gnomo, Goblin e Orc. Os halflings aprendem os idiomas de seus aliados e inimigos.",
      "Classe Favorecida: Ladino. A classe ladino de um halfling é desconsiderada para determinar as penalidades de XP devido a multiclasse (consulte Experiência para Personagens Multiclasse, pág. 60). Os halflings dependem da sua furtividade, perspicácia e habilidades para sobreviver, portanto a carreira de ladino é uma profissão natural para a raça.",
    ],
    description: "Espertos, competentes e oportunistas. Encontram seu espaço em qualquer lugar. Muitas vezes, são viajantes e peregrinos, e os nativos os observam com desconfiança e curiosidade.",
  },
  humano: {
    id: "humano",
    name: "Humano",
    nameEn: "Human",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 13,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: {},
    languages: ["Comum"],
    bonusLanguages: [],
    favoredClass: "Qualquer uma",
    traits: [
      "Tamanho Médio: como criaturas Médias, os humanos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.",
      "O deslocamento básico dos humanos equivale a 9 metros.",
      "Os humanos recebem um talento adicional no 1º nível, pois são rápidos para dominar tarefas especializadas e suas habilidades são muito variadas. Consulte o Capítulo 5: Talentos.",
      "Os humanos recebem 4 pontos adicionais de perícia no 1º nível, mais 1 ponto adicional de perícia a cada nível de experiência, pois são versáteis e competentes. Os pontos de perícia adicionais do 1º nível são adicionados ao resultado final, mas não são multiplicados. Consulte o Capítulo 4: Perícias.",
      "Idiomas Básicos: Comum. Idiomas adicionais: Qualquer um (exceto linguagens secretas, como o Druídico). Consulte as descrições das outras raças para obter os idiomas comuns ou a perícia Falar Idioma (pág.76) para uma lista completa. Os humanos se misturam com muitos tipos de criaturas e são capazes de aprender qualquer idioma existente em sua região.",
      "Classe Predileta: Qualquer uma. A classe de nível mais elevado de um humano multiclasse é desconsiderada para determinar as penalidades de XP devido a multiclasse (consulte Experiência para Personagens Multiclasse, pág. 60).",
    ],
    description: "Adaptáveis e ambiciosos, os humanos ostentam um nível de mudança social muito rápido. Não seguem nenhuma tendência em particular, nem mesmo a neutralidade; entre eles, é possível encontrar os melhores e os piores indivíduos do mundo.",
  },
  "meio-elfo": {
    id: "meio-elfo",
    name: "Meio-Elfo",
    nameEn: "Half-Elf",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 17,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: {},
    languages: ["Comum", "Élfico"],
    bonusLanguages: ["Qualquer uma"],
    favoredClass: "Qualquer uma",
    traits: [
      "Tamanho Médio: como criaturas Médias, os meio-elfos não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.",
      "O deslocamento básico dos meio-elfos equivale a 9 metros.",
      "Imunidade à magias e efeitos de sono e +2 de bônus racial nos testes de resistência contra magias ou efeitos similares de Encantamento.",
      "Visão na Penumbra: os meio-elfos enxergam duas vezes mais longe que os seres humanos sob a luz das estrelas, da lua, de tochas ou outras condições de iluminação precária. Nessas situações, eles ainda conseguem distinguir cores e detalhes.",
      "+1 de bônus racial nos testes de Ouvir, Procurar e Observar. Um meio-elfo não possui a habilidade de localizar portas secretas devido à herança élfica, embora seus sentidos sejam mais aguçados dos que os sentidos humanos.",
      "+2 de bônus racial nos testes de Diplomacia e Obter Informação, graças à sua habilidade de se relacionar bem com as pessoas.",
      "Sangue Élfico: para todas as habilidades especiais e efeitos, um meio-elfo é considerado um elfo. Por exemplo, os meio-elfos são vulneráveis aos efeitos especiais que afetam somente os elfos, assim como seus ancestrais, e podem usar itens mágicos que apenas os elfos ou os elfos-cambiantes seriam capazes (consulte o Livro dos Monstros para obter mais informações sobre os elfos e o Livro do Mestre para informações sobre itens mágicos).",
      "Idiomas Básicos: Comum e Élfico. Idiomas Adicionais: Qualquer um (exceto idiomas secretos, como o Druídico). Os meio-elfos possuem toda a versatilidade e a amplitude de experiência (mesmo que superficial) dos seres humanos.",
      "Classe Predileta: Qualquer uma. A classe de nível mais elevado de um meio-elfo multiclasse é desconsiderada para determinar as penalidades de XP devido a multiclasse (consulte Experiência para Personagens Multiclasse, pág. 60).",
    ],
    description: "Filhos de um casamento entre humano e elfo, ultrapassam rapidamente seus amigos de infância, adquirindo um corpo adulto embora seja culturalmente uma criança segundo os padrões élficos. Em geral, se adaptam à sociedade humana, embora outros descubram suas identidades exatamente nessa diferença.",
  },
  "meio-orc": {
    id: "meio-orc",
    name: "Meio-Orc",
    nameEn: "Half-Orc",
    sourceBook: "D&D 3.5 — Livro do Jogador",
    sourcePageStart: 19,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: { for: 2, int: -2, car: -2 },
    languages: ["Comum", "Orc"],
    bonusLanguages: ["Draconiano", "Gigante", "Gnoll", "Goblin", "Abissal"],
    favoredClass: "Bárbaro",
    traits: [
      "+2 de Força, -2 de Inteligência, -2 de Carisma: os meio-orcs são fortes, mas sua ascendência os torna criaturas simplórias e rudes.",
      "Tamanho Médio: como criaturas Médias, os meio-orcs não sofrem nenhuma penalidade ou recebem qualquer bônus em relação ao tamanho.",
      "O deslocamento básico dos meio-orcs equivale a 9 metros.",
      "Visão no Escuro: os meio-orcs (e os orcs) conseguem enxergar até 18 metros no escuro. A visão no escuro permite enxergar imagens em preto e branco, mas é idêntica à visão normal em todos os demais aspectos e pode ser utilizada mesmo na escuridão completa.",
      "Sangue Orc: para todas as habilidades especiais e efeitos, um meio-orc é considerado um orc. Por exemplo, os meio-orcs são vulneráveis aos efeitos especiais que afetam somente os orcs, assim como seus ancestrais, e podem usar itens mágicos que apenas os orcs capazes (consulte o Livro dos Monstros para obter mais informações sobre os orcs e o Livro do Mestre para informações sobre itens mágicos).",
      "Idiomas Básicos: Comum e Orc. Idiomas Adicionais: Draconiano, Gigante, Gnoll, Goblin e Abissal. Os meio-orcs inteligentes (que são raros) podem conhecer os idiomas de seus aliados ou inimigos.",
      "Classe Favorecida: Bárbaro. A classe de nível mais elevado de um meio-orc é desconsiderada para determinar as penalidades de XP devido a multiclasse (consulte Experiência para Personagens Multiclasse, pág. 60). A ferocidade inunda as veias de um meio-orc.",
    ],
    description: "Nascidos de um equilíbrio instável entre tribos bárbaras de humanos e orcs, os meio-orcs vivem entre culturas que se aniquilam durante épocas de guerra e negociam em tempos de paz. Muitos abandonam sua terra natal e viajam para as terras civilizadas, levando consigo a tenacidade, a coragem e a habilidade de combate desenvolvidas nas regiões agrestes do mundo.",
  },
};

export const DND35_RACE_IDS = Object.keys(DND35_RACES);
