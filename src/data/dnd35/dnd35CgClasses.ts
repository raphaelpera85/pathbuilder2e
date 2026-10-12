/**
 * O Livro Completo do Guerreiro (D&D 3.5, edição brasileira; scan sem camada de texto), cap. 1 "Classes", pp. 5-7: Duelista.
 * Lido da imagem (tabela e texto a 300dpi); português, como no livro. Só dados (sem UI nem Supabase). Livro 3.5.
 * "Lâmina Maldita" (p. 7 em diante) e as demais classes ainda não foram transcritas.
 * Erro impresso mantido: o sabre do conjunto inicial aparece como "1d16" (o sabre é 1d6 nas regras); mantido como impresso.
 */
export type CgClassLevel = { level: number; bab: string; fort: number; ref: number; will: number; special: string };

export type CgBaseClass = {
  id: string;
  name: string;
  hitDie: number;
  alignment: string;
  skillPointsFirstLevel: string;
  skillPointsPerLevel: string;
  classSkills: string[];
  levels: CgClassLevel[];
  features: { name: string; text: string }[];
  halfElfStarterPackage?: {
    armor: string;
    weapons: string[];
    skillSelection: string;
    skills: { skill: string; ranks: number; ability: string; armorPenalty: string }[];
    feat: string;
    humanBonusFeat: string;
    equipment: string;
    gold: string;
  };
  /** Magias por dia: linha = nível da classe (1..20); coluna = círculo 1º..4º; null = "—"; 0 = só magias adicionais. */
  spellsPerDay?: (number | null)[][];
  /** Magias conhecidas (Tabela 1-3), mesma forma de spellsPerDay. O primeiro valor de cada círculo só vale se o Carisma permitir magias adicionais desse nível (nota 1 impressa). */
  spellsKnown?: (number | null)[][];
  starterPackage?: { label: string; armor: string; weapons: string[]; skillSelection: string; skills: { skill: string; ranks: number; ability: string; armorPenalty: string }[]; feat: string; humanBonusFeat: string; equipment: string; gold: string };
};

export const CG_BASE_CLASSES: CgBaseClass[] = [
  {
    id: "cg-duelista",
    name: "Duelista",
    hitDie: 10,
    alignment: "Qualquer",
    skillPointsFirstLevel: "(4 + modificador de Inteligência) x 4",
    skillPointsPerLevel: "4 + modificador de Inteligência",
    classSkills: ["Acrobacia", "Arte da Fuga", "Blefar", "Diplomacia", "Equilíbrio", "Escalar", "Ofícios", "Profissão", "Saltar", "Sentir Motivação", "Usar Cordas"],
    levels: [
      { level: 1, bab: "+1", fort: 2, ref: 0, will: 0, special: "Acuidade com Arma" },
      { level: 2, bab: "+2", fort: 3, ref: 0, will: 0, special: "Graça +1" },
      { level: 3, bab: "+3", fort: 3, ref: 1, will: 1, special: "Golpe Perspicaz" },
      { level: 4, bab: "+4", fort: 4, ref: 1, will: 1, special: "—" },
      { level: 5, bab: "+5", fort: 4, ref: 1, will: 1, special: "Bônus de esquiva +1" },
      { level: 6, bab: "+6/+1", fort: 5, ref: 2, will: 2, special: "—" },
      { level: 7, bab: "+7/+2", fort: 5, ref: 2, will: 2, special: "Investida acrobática" },
      { level: 8, bab: "+8/+3", fort: 6, ref: 2, will: 2, special: "Flanquear aprimorado" },
      { level: 9, bab: "+9/+4", fort: 6, ref: 3, will: 3, special: "—" },
      { level: 10, bab: "+10/+5", fort: 7, ref: 3, will: 3, special: "Bônus de esquiva +2" },
      { level: 11, bab: "+11/+6/+1", fort: 7, ref: 3, will: 3, special: "Graça +2, sorte" },
      { level: 12, bab: "+12/+7/+2", fort: 8, ref: 4, will: 4, special: "—" },
      { level: 13, bab: "+13/+8/+3", fort: 8, ref: 4, will: 4, special: "Maestria em Acrobacia" },
      { level: 14, bab: "+14/+9/+4", fort: 9, ref: 4, will: 4, special: "Decisivo debilitante" },
      { level: 15, bab: "+15/+10/+5", fort: 9, ref: 5, will: 5, special: "Bônus de esquiva +3" },
      { level: 16, bab: "+16/+11/+6/+1", fort: 10, ref: 5, will: 5, special: "—" },
      { level: 17, bab: "+17/+12/+7/+2", fort: 10, ref: 5, will: 5, special: "Mente escorregadia" },
      { level: 18, bab: "+18/+13/+8/+3", fort: 11, ref: 6, will: 6, special: "—" },
      { level: 19, bab: "+19/+14/+9/+4", fort: 11, ref: 6, will: 6, special: "Decisivo mortífero" },
      { level: 20, bab: "+20/+15/+10/+5", fort: 12, ref: 6, will: 6, special: "Bônus de esquiva +4, graça +3" },
    ],
    features: [
      { name: "Usar Armas e Armaduras", text: "Um duelista sabe usar todas as armas simples e comuns e armaduras leves. Algumas das características de classe do duelista, conforme indicado a seguir, exigem que o personagem não utilize armaduras ou use equipamentos leves." },
      { name: "Acuidade com Arma (Ext)", text: "No 1º nível, o duelista adquire o talento Acuidade com Arma como um talento adicional, mesmo que não atenda aos pré-requisitos." },
      { name: "Graça (Ext)", text: "No 2º nível, o duelista recebe +1 de bônus de competência nos testes de resistência de Reflexos. Esse bônus aumenta para +2 no 11º nível e para +3 no 20º nível. O duelista perderá esse bônus se usar armaduras médias ou pesadas ou transportar uma carga superior a leve." },
      { name: "Golpe Perspicaz (Ext)", text: "A partir do 3º nível, um duelista é capaz de golpear o adversário em pontos estratégicos do corpo e causar um dano maior. Ele adiciona seu bônus de Inteligência (se houver) nas jogadas de dano, além do bônus de Força aplicado normalmente, quando utilizar armas leves ou quaisquer armas beneficiadas pelo talento Acuidade com Arma, como o sabre, o chicote e a corrente com cravos. Os alvos imunes a sucessos decisivos ou ataques furtivos são imunes ao golpe perspicaz do duelista. O duelista não poderá usar essa habilidade se utilizar armaduras médias ou pesadas ou transportar uma carga superior a leve." },
      { name: "Bônus de Esquiva (Ext)", text: "Um duelista foi treinado para concentrar suas defesas em combate contra um único adversário. Durante sua ação, ele poderá selecionar um alvo e receberá +1 de bônus de esquiva na CA contra os ataques corporais daquele oponente. É possível escolher um novo alvo a cada rodada. Este bônus aumenta em +1 a cada 5 níveis depois do 5º (+2 no 10º nível, +3 no 15º nível e +4 no 20º nível). O duelista perderá esse bônus se usar armaduras médias ou pesadas ou transportar uma carga superior a leve. Se o duelista também possuir o talento Esquiva, não é obrigatório selecionar o mesmo alvo para a habilidade e o talento. Caso escolha o mesmo adversário, os bônus se acumulam." },
      { name: "Investida Acrobática (Ext)", text: "Um duelista de 7º nível ou superior é capaz de realizar Investidas em situações incomuns. Ele será capaz de percorrer terrenos difíceis, que normalmente reduziriam seu deslocamento, ou sobre aliados que estejam bloqueando sua trajetória. Essa habilidade lhe permite correr em escadarias, saltar de uma bancada ou superar as mesas de uma taverna com acrobacias. De acordo com a circunstância, ainda será necessário realizar os testes pertinentes (em geral, Saltar e Acrobacia) para percorrer a distância até o alvo." },
      { name: "Flanquear Aprimorado (Ext)", text: "A partir do 8º nível, um duelista que estiver flanqueando um oponente recebe +4 de bônus na jogada de ataque — em vez de +2. Os demais personagens envolvidos na manobra com o duelista não recebem esse bônus aprimorado." },
      { name: "Sorte (Ext)", text: "Muitos duelistas acreditam no ditado \"a sorte sorri para todos\". Uma vez por dia, um duelista de 11º nível ou superior poderá realizar novamente uma jogada de ataque, teste de perícia, teste de habilidade ou teste de resistência fracassado. O personagem deve manter o segundo resultado, mesmo que seja pior que a jogada original." },
      { name: "Maestria em Acrobacia (Ext)", text: "A partir do 13º nível, um duelista se torna muito confiante em suas capacidades acrobáticas e poderá utilizá-las normalmente sob condições adversas. Quando realizar um teste de Saltar ou Acrobacia, o duelista poderá 'escolher 10' mesmo se estiver ameaçado ou distraído por agentes externos." },
      { name: "Decisivo Debilitante (Ext)", text: "Um duelista de 14º nível ou superior que obtiver um sucesso decisivo causará 2 pontos de dano temporário de Força contra a vítima. As criaturas imunes a sucessos decisivos não são afetadas." },
      { name: "Mente Escorregadia (Ext)", text: "Quando o duelista atingir o 17º nível, será mais difícil controlar sua mente. Caso fracasse em um teste de resistência contra uma magia ou efeito de encantamento, poderá realizar novamente o teste na rodada subsequente (mesma CD). O personagem receberá somente uma única tentativa adicional para refazer o teste." },
      { name: "Decisivo Mortífero (Ext)", text: "Um duelista de 19º nível ou superior que obtiver um sucesso decisivo causará 2 pontos de dano temporário de Constituição contra a vítima, além do dano de Força infligido pela habilidade decisivo debilitante. As criaturas imunes a sucessos decisivos não são afetadas." },
    ],
    halfElfStarterPackage: {
      armor: "Corselete de couro (+3 CA, -1 de penalidade de armadura, 9 m de deslocamento, 10 kg)",
      weapons: ["Sabre (dano: 1d16, dec. 18-20/x 2, 1 kg, uma mão, cortante)", "Adaga (dano: 1d4, dec. 19-20/x 2, 0,5 kg, leve, perfurante ou cortante)", "Arco curto (dano: 1d6, dec. x 3, incremento de distância 18 m, 1 kg, perfurante)"],
      skillSelection: "3 + modificador de Inteligência",
      skills: [
        { skill: "Saltar", ranks: 4, ability: "For", armorPenalty: "-1" },
        { skill: "Blefar", ranks: 1, ability: "Car", armorPenalty: "—" },
        { skill: "Escalar", ranks: 4, ability: "For", armorPenalty: "-1" },
        { skill: "Acrobacia", ranks: 4, ability: "Dês", armorPenalty: "-1" },
        { skill: "Diplomacia", ranks: 4, ability: "Car", armorPenalty: "—" },
        { skill: "Usar Cordas", ranks: 4, ability: "Dês", armorPenalty: "—" },
        { skill: "Observar (oc)", ranks: 2, ability: "Sab", armorPenalty: "—" },
        { skill: "Ouvir", ranks: 2, ability: "Sab", armorPenalty: "—" },
      ],
      feat: "Foco em Arma (sabre)",
      humanBonusFeat: "Reflexos de Combate",
      equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro. Lanterna coberta, 3 frascos de óleo. Aljava e 20 flechas.",
      gold: "6d4 x 10 PO",
    },
  },
  {
    id: "cg-lamina-maldita",
    name: "Lâmina Maldita",
    hitDie: 10,
    alignment: "Qualquer, exceto Bom",
    skillPointsFirstLevel: "(2 + modificador de Inteligência) x 4",
    skillPointsPerLevel: "2 + modificador de Inteligência",
    classSkills: ["Blefar", "Cavalgar", "Concentração", "Conhecimento (arcano)", "Diplomacia", "Identificar Magia", "Intimidação", "Ofícios", "Profissão"],
    levels: [
      { level: 1, bab: "+1", fort: 0, ref: 0, will: 2, special: "Maldição da lâmina 1/dia" },
      { level: 2, bab: "+2", fort: 0, ref: 0, will: 3, special: "Resistência arcana" },
      { level: 3, bab: "+3", fort: 1, ref: 1, will: 3, special: "Têmpera" },
      { level: 4, bab: "+4", fort: 1, ref: 1, will: 4, special: "Invocar familiar" },
      { level: 5, bab: "+5", fort: 1, ref: 1, will: 4, special: "Talento adicional, maldição da lâmina 2/dia" },
      { level: 6, bab: "+6/+1", fort: 2, ref: 2, will: 5, special: "—" },
      { level: 7, bab: "+7/+2", fort: 2, ref: 2, will: 5, special: "Maldição da lâmina maior" },
      { level: 8, bab: "+8/+3", fort: 2, ref: 2, will: 6, special: "—" },
      { level: 9, bab: "+9/+4", fort: 3, ref: 3, will: 6, special: "Maldição da lâmina 3/dia" },
      { level: 10, bab: "+10/+5", fort: 3, ref: 3, will: 7, special: "Talento adicional" },
      { level: 11, bab: "+11/+6/+1", fort: 3, ref: 3, will: 7, special: "—" },
      { level: 12, bab: "+12/+7/+2", fort: 4, ref: 4, will: 8, special: "Aura de azar 1/dia" },
      { level: 13, bab: "+13/+8/+3", fort: 4, ref: 4, will: 8, special: "Maldição da lâmina 4/dia" },
      { level: 14, bab: "+14/+9/+4", fort: 4, ref: 4, will: 9, special: "—" },
      { level: 15, bab: "+15/+10/+5", fort: 5, ref: 5, will: 9, special: "Talento adicional" },
      { level: 16, bab: "+16/+11/+6/+1", fort: 5, ref: 5, will: 10, special: "Aura de azar 2/dia" },
      { level: 17, bab: "+17/+12/+7/+2", fort: 5, ref: 5, will: 10, special: "Maldição da lâmina 5/dia" },
      { level: 18, bab: "+18/+13/+8/+3", fort: 6, ref: 6, will: 11, special: "—" },
      { level: 19, bab: "+19/+14/+9/+4", fort: 6, ref: 6, will: 11, special: "Maldição da lâmina atroz" },
      { level: 20, bab: "+20/+15/+10/+5", fort: 6, ref: 6, will: 12, special: "Aura de azar 3/dias, talento adicional" },
    ],
    spellsPerDay: [
      [null, null, null, null], [null, null, null, null], [null, null, null, null],
      [0, null, null, null], [0, null, null, null], [1, null, null, null], [1, null, null, null],
      [1, 0, null, null], [1, 0, null, null], [1, 1, null, null], [1, 1, 0, null],
      [1, 1, 1, null], [1, 1, 1, null], [2, 1, 1, 0], [2, 1, 1, 1],
      [2, 2, 1, 1], [2, 2, 2, 1], [3, 2, 2, 1], [3, 3, 3, 2], [3, 3, 3, 3],
    ],
    spellsKnown: [
      [null, null, null, null], [null, null, null, null], [null, null, null, null],
      [2, null, null, null], [2, null, null, null], [3, null, null, null], [3, null, null, null],
      [4, 2, null, null], [4, 2, null, null], [4, 3, null, null], [4, 3, 2, null],
      [4, 4, 3, null], [4, 4, 3, null], [4, 4, 4, 2], [4, 4, 4, 3],
      [4, 4, 4, 3], [5, 4, 4, 4], [5, 5, 4, 4], [5, 5, 5, 4], [5, 5, 5, 5],
    ],
    features: [
      { name: "Usar Armas e Armaduras", text: "Uma lâmina maldita sabe usar todas as armas simples e comuns, armaduras leves, mas não escudos. Uma vez que os componentes gestuais das magias da classe são simples, o personagem consegue lançar as magias da lista de classe usando armaduras leves, sem sofrer a chance de falha arcana normal. Entretanto, similar a qualquer conjurador arcano, uma lâmina que utilizar uma armadura média ou pesada ou escudos sofre a chance de falha arcana regularmente, se a magia em questão tiver componentes gestuais (e a maioria tem). Uma lâmina maldita multiclasse ainda sofre a chance de falha para as magias arcanas de suas outras classes." },
      { name: "Maldição da Lâmina (Sob)", text: "Uma vez por dia, como uma ação livre, uma lâmina maldita pode rogar uma maldição contra um adversário. O alvo deve estar visível e num raio de 18 m do personagem. A vítima sofre -2 de penalidade nas jogadas de ataque, testes de resistência, testes de habilidades e perícias e dano com armas durante 1 hora. Obter sucesso em um teste de resistência de Vontade (CD 10 + 1/2 do nível de classe + modificador de Carisma da lâmina) anula o efeito. A cada quatro níveis depois do primeiro (5º, 9º, 13º e 17º), a lâmina adquire uma utilização adicional desta habilidade por dia, conforme indicado na Tabela 1-2. Diversas maldições da lâmina não se acumulam, e qualquer criatura que resistir ao efeito não poderá ser afetada novamente pela mesma lâmina maldita durante 24 horas. O personagem somente é capaz de ativar essa habilidade uma vez por rodada, não importa sua quantidade disponível de utilizações diárias. Qualquer efeito que remova ou dissipe maldições elimina a penalidade desta habilidade." },
      { name: "Resistência Arcana (Sob)", text: "A partir do 2º nível, a lâmina maldita adiciona seu bônus de Carisma (mínimo +1) aos seus testes de resistência contra magias e efeitos similares." },
      { name: "Têmpera (Ext)", text: "A partir do 3º nível, a lâmina maldita é capaz de resistir a ataques mágicos e incomuns com sua enorme força de vontade e resiliência. Caso obtenha sucesso num teste de resistência de Fortitude ou Vontade que normalmente reduziria o efeito de uma magia ou habilidade similar, ela anulará por completo os efeitos dessa magia. Somente as magias que possuem a indicação \"Vontade parcial\", \"Fortitude para metade\" ou semelhantes na descrição de seus Testes de Resistência são afetadas por esta habilidade. Uma lâmina inconsciente ou adormecida não adquire os benefícios da têmpera." },
      { name: "Familiar", text: "A partir do 4º nível, uma lâmina maldita pode convocar um familiar. O processo exige 24 horas e o gasto de materiais mágicos no valor de 100 PO. Um familiar é uma besta mágica semelhante a um pequeno animal, mas é extraordinariamente resistente e inteligente. A criatura será um companheiro e servo da lâmina. A lâmina escolhe o tipo de animal que deseja. O poder do familiar aumenta conforme seu mestre adquire níveis de classe. Considere que a lâmina é um feiticeiro de três níveis inferiores para determinar os poderes e habilidades do familiar (consulte Familiares, no Livro do Jogador). Se o familiar morrer, ou se a lâmina decidir dispensá-lo, o personagem deve realizar um teste de resistência de Fortitude (CD 15). Caso fracasse, perderá 200 XP por nível nesta classe; um sucesso reduz essa perda à metade. Porém, a quantidade de pontos de experiência de uma lâmina maldita nunca pode cair abaixo de zero como resultado da morte de um familiar. Um familiar morto ou dispensado não poderá ser substituído durante um período de um ano e um dia. Um familiar morto pode ser ressuscitado, da mesma forma que os personagens, mas não perde um nível ou um ponto de Constituição quando isso acontece. Mesmo que o personagem tenha diversas classes com a característica Familiar, somente poderá obter um familiar simultaneamente." },
      { name: "Magias", text: "A partir do 4º nível, uma lâmina maldita adquire a habilidade de conjurar uma pequena quantidade de magias arcanas da lista de magias da lâmina maldita (descrita no Capítulo 3). Ela é capaz de conjurar suas magias sem prepará-las com antecedência, similar a um feiticeiro (consulte Feiticeiro no Livro do Jogador). Para aprender ou conjurar uma magia, uma lâmina maldita deve ter uma pontuação em Carisma igual ou superior a 10 + o nível da magia (Car 11 para magias de 1º nível, Car 12 para magias de 2º nível, etc.). A Classe de Dificuldade para os testes de resistência contra essas magias equivale a 10 + nível da magia + modificador de Carisma da lâmina. Semelhante aos demais conjuradores, uma lâmina maldita somente é capaz de conjurar uma quantidade limitada de magias de cada nível por dia. Seu limite diário de magias se encontra na Tabela 1-2. As magias adicionais da lâmina são baseadas em um valor elevado de Carisma. Quando a Tabela 1-2 indicar que a lâmina maldita recebe 0 magias de um determinado nível, ela recebe somente as magias adicionais concedidas pelo seu valor de Carisma para aquele nível. A seleção de magias da lâmina é extremamente limitada. Uma lâmina maldita de 1º nível não conhece quaisquer magias, mas adquire uma ou mais magias em determinados níveis, conforme indicado na Tabela 1-3. Diferente das magias por dia, a quantidade de magias conhecidas da lâmina não é afetada pelo seu Carisma; os valores da Tabela 1-3 são fixos. Quando alcançar o 12º nível, e a cada três níveis subseqüentes (15º e 18º), uma lâmina será capaz de aprender uma magia nova em substituição a um efeito antigo do seu repertório. Em resumo, a lâmina \"perde\" a magia antiga e aprende a nova. O nível das magias que estão sendo trocadas deve ser idêntico; o personagem somente conseguirá substituir uma magia dois níveis inferiores ao seu nível máximo disponível. Por exemplo, no 12º nível, uma lâmina poderia substituir uma magia de 1º nível (dois níveis de magia inferiores ao nível máximo disponível ao personagem, que são as magias de 3º nível) por outra magia de 1º nível. No 15º nível, ele poderia trocar uma única magia de 1º nível ou de 2º nível (pois terá acesso a magias de 4º nível) por um efeito diferente do mesmo nível. O personagem somente poderá substituir uma única magia nos níveis indicados, e precisa escolher se realizará a troca no momento em que adquire novas magias conhecidas naquele nível. Até o 3º nível, a lâmina maldita não terá nível de conjurador. A partir do 4º nível, seu nível de conjurador equivale à metade de seu nível de lâmina." },
      { name: "Talentos Adicionais", text: "No 5º nível e a cada cinco níveis subseqüentes (10º, 15º e 20º), uma lâmina maldita recebe um talento adicional, que deve ser selecionado da lista a seguir: Foco em Magia (Encantamento, Necromancia ou Transmutação), Foco em Magia Maior (Encantamento, Necromancia ou Transmutação), Magia Penetrante Maior, Magia Penetrante, Magias em Combate." },
      { name: "Maldição da Lâmina Maior (Sob)", text: "A partir do 7º nível, as penalidades nas jogadas de ataque, testes de resistência, testes de habilidades e perícias e dano com armas provenientes da maldição da lâmina aumentam de -2 para -4." },
      { name: "Aura de Azar (Sob)", text: "A partir do 12º nível, uma vez por dia, uma lâmina maldita é capaz de gerar uma aura maliciosa de azar. Qualquer ataque corporal ou à distância desferido contra a lâmina maldita enquanto a aura permanecer ativa sofre 20% de chance de falha (similar ao efeito de camuflagem). Ativar a aura é uma ação livre e ela continua ativa durante uma quantidade de rodadas equivalente a 3 + bônus de Carisma da lâmina (se houver). No 16º nível, o personagem é capaz de ativar a aura duas vezes por dia; no 20º nível, conseguirá gerar a aura três vezes por dia." },
      { name: "Maldição da Lâmina Atroz (Sob)", text: "A partir do 19º nível, as penalidades nas jogadas de ataque, testes de resistência, testes de habilidades e perícias e dano com armas provenientes da maldição da lâmina aumentam de -4 para -6." },
      { name: "Ex-Lâminas Malditas", text: "Uma lâmina que se torne Boa perderá todas as suas magias e habilidades nesta classe, exceto os talentos com armaduras, armas simples e comuns, e os talentos adicionais. Seu familiar se tornará um animal normal e abandonará a lâmina assim que possível. Ela não conseguirá adquirir níveis adicionais como lâmina maldita." },
    ],
    starterPackage: {
      label: "Lâmina Maldita Humana",
      armor: "Corselete de couro batido (+3 CA, -1 de penalidade de armadura, 9 m de deslocamento, 10 kg)",
      weapons: ["Espada longa (dano: 1d8, dec. 19-20/x 2, 2 kg, uma mão, cortante)"],
      skillSelection: "3 + modificador de Inteligência",
      skills: [
        { skill: "Blefar", ranks: 4, ability: "Car", armorPenalty: "—" },
        { skill: "Cavalgar", ranks: 4, ability: "Des", armorPenalty: "—" },
        { skill: "Conhecimento (arcano)", ranks: 4, ability: "Int", armorPenalty: "—" },
        { skill: "Diplomacia", ranks: 4, ability: "Car", armorPenalty: "—" },
        { skill: "Identificar Magia", ranks: 4, ability: "Int", armorPenalty: "—" },
        { skill: "Intimidação", ranks: 4, ability: "Car", armorPenalty: "—" },
        { skill: "Observar (oc)", ranks: 2, ability: "Sab", armorPenalty: "—" },
        { skill: "Ouvir (oc)", ranks: 2, ability: "Sab", armorPenalty: "—" },
      ],
      feat: "Foco em Arma (espada longa)",
      humanBonusFeat: "Iniciativa Aprimorada",
      equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro. Lanterna coberta, 3 frascos de óleo.",
      gold: "6d4 x 10 PO",
    },
  },
];
