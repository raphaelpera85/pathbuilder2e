/**
 * Familiares Guardiões do D&D 3.5 — O Livro Completo do Guerreiro (ed. BR),
 * Capítulo 3, seção "Familiares Guardiões" (pp.119-121). Constructos
 * inteiramente novos que substituem o familiar comum de conjuradores
 * arcanos marciais, obtidos via o talento Familiar Aprimorado.
 */
export type CgGuardianFamiliar = {
  id: string;
  name: string;
  page: number;
  conjurerLevelRequired: number;
  type: string;
  hitDice: string;
  initiative: string;
  speed: string;
  ac: string;
  baseAttackGrapple: string;
  attack: string;
  fullAttack: string;
  spaceReach: string;
  specialAttacks: string;
  specialQualities: string;
  saves: string;
  abilities: string;
  environment: string;
  organization: string;
  challengeRating: string;
  treasure: string;
  alignment: string;
  advancement: string;
  description: string;
  combat: string;
  construction: string;
};

export const CG_GUARDIAN_FAMILIARS: CgGuardianFamiliar[] = [
  {
    id: "cg-guardiao-cintilante",
    name: "Guardião Cintilante",
    page: 119,
    conjurerLevelRequired: 7,
    type: "Constructo (Miúdo)",
    hitDice: "2d10 (11 PV)",
    initiative: "+2",
    speed: "6 m (4 quadrados), vôo 6 m (bom)",
    ac: "18 (+2 tamanho, +2 Des, +4 natural), toque 14, surpresa 16",
    baseAttackGrapple: "+1/-8",
    attack: "Corpo a corpo: garras +2 (1d2-1) ou à distância: centelhas +5 (2d6 de eletricidade)",
    fullAttack: "Corpo a corpo: garras +3 (1d2-1) ou à distância: centelhas +5 (2d6 de eletricidade)",
    spaceReach: "75 cm/60 cm",
    specialAttacks: "—",
    specialQualities: "Constructo, Redução de Dano 5/—, visão no escuro 18 m, cura acelerada 1, encontrar o mestre, visão na penumbra",
    saves: "Fort +0, Ref +2, Von +0",
    abilities: "For 8, Des 14, Con —, Int —, Sab 10, Car 1",
    environment: "Qualquer",
    organization: "Solitário",
    challengeRating: "3",
    treasure: "Nenhum",
    alignment: "Sempre Neutro",
    advancement: "3-4 DV (Miúdo); 5-6 DV (Pequeno)",
    description: "Essa criatura parece uma ave de rapina de brinquedo, de coloração acobreada. Ela possui asas obviamente mecânicas e um bico que emite um brilho estranho. Os guardiões cintilantes são pássaros mecânicos que disparam centelhas contra qualquer criatura que ameaçar seu mestre. São a variedade mais comum de familiares guardiões — normalmente sobrevoam seus mestres, disparando centelhas contra os inimigos. Quando não estão executando uma tarefa específica, esses guardiões sobrevoam os arredores, preparados para defender seus senhores com as faíscas de seus bicos. Um guardião cintilante tem quase o tamanho de uma andorinha ou mocho (uma coruja pequena) e pesa cerca de 5 kg.",
    combat: "Os guardiões cintilantes reconhecem que são ineficazes no combate corporal. Portanto, permanecem afastados do alcance dos oponentes, disparando centelhas enquanto os sobrevoam. Centelhas (Sob): as centelhas do guardião têm um incremento de distância de 30 m. Encontrar o Mestre (Sob): não importa a distância, enquanto estiverem no mesmo plano de existência, o guardião é capaz de localizar seu mestre.",
    construction: "Um guardião cintilante é construído com madeira, couro e cobre. Os materiais custam 2.000 PO. O mestre pode fabricar o corpo ou contratar um artesão para fazê-lo. A fabricação exige um teste de Profissão (engenharia) com CD 16. Depois que a criatura estiver pronta, o guardião será animado por meio de um extenso ritual que exige uma oficina especialmente preparada, similar ao laboratório de alquimista, que custa 500 PO para ser montado. Se o mestre estiver fabricando pessoalmente o guardião, a construção e o ritual podem ser realizados simultaneamente. É possível criar um guardião cintilante com mais de 2 DV, mas cada DV adicional acrescenta 1.000 PO ao preço de mercado e o custo aumenta em 5.000 PO para fabricar um guardião Médio, modificando o preço final apropriadamente. Nível de Conjurador: 7º; Pré-requisitos: Fabricar Constructo (descrito no Livro dos Monstros), relâmpago, localizar criatura, criar itens efêmeros; preço de mercado: 10.000 PO; custo para criar: 7.000 PO + 400 XP.",
  },
  {
    id: "cg-guardiao-de-manopla",
    name: "Guardião de Manopla",
    page: 120,
    conjurerLevelRequired: 9,
    type: "Constructo (Pequeno)",
    hitDice: "4d10+10 (32 PV)",
    initiative: "+1",
    speed: "6 m (4 quadrados)",
    ac: "19 (+1 tamanho, +1 Des, +7 natural), toque 12, surpresa 18",
    baseAttackGrapple: "+3/+4",
    attack: "Corpo a corpo: pancada +9 (1d6+5)",
    fullAttack: "Corpo a corpo: 2 pancadas +9 (1d6+5)",
    spaceReach: "1,5 m/1,5 m",
    specialAttacks: "—",
    specialQualities: "Constructo, Redução de Dano 5/—, visão no escuro 18 m, cura acelerada 1, encontrar o mestre, visão na penumbra, armazenar magia",
    saves: "Fort +1, Ref +1, Von +1",
    abilities: "For 20, Des 12, Con —, Int —, Sab 10, Car 1",
    environment: "Qualquer",
    organization: "Solitário",
    challengeRating: "4",
    treasure: "Nenhum",
    alignment: "Sempre Neutro",
    advancement: "5-8 DV (Pequeno); 9-12 DV (Médio)",
    description: "Esse constructo achatado possui um tórax em forma de barril e pernas relativamente finas. Seus antebraços são pistões maciços que terminam em manoplas imensas e pontiagudas. Os guardiões de manopla são criados por magos e feiticeiros para serem guarda-costas implacáveis e assustadores. Eles executam sua função com bastante eficácia, golpeando qualquer criatura que se intrometer com seu mestre. Os guardiões de manopla são capazes de executar planos e estratégias detalhadas, atuarem como sentinelas e realizar tarefas similares. A menos que receba ordens diferentes, o guardião concentrará seus golpes nos atacantes diretos do seu mestre. Um guardião cintilante (manopla) tem quase 1,20 m de altura e pesa mais de 100 kg.",
    combat: "Os guardiões de manopla não são muito sutis. Eles simplesmente se aproximam de seus inimigos e tentam esmagá-los com seus punhos imensos. Encontrar o Mestre (Sob): não importa a distância, enquanto estiverem no mesmo plano de existência, o guardião é capaz de localizar seu mestre. Armazenar Magia (SM): um guardião da manopla é capaz de armazenar uma única magia de 2º nível ou inferior que seja conjurada sobre ele por outra criatura. Ele utilizará essa magia quando o mestre ordenar ou quando uma situação pré-determinada ocorrer. Assim que a magia for liberada, o guardião poderá armazenar outro efeito (ou a mesma magia).",
    construction: "Um guardião de manopla é construído com pedra, latão e aço. Os materiais custam 3.000 PO. O mestre pode fabricar o corpo ou contratar um artesão para fazê-lo. A fabricação exige um teste de Profissão (engenharia) com CD 16. Depois que a criatura estiver pronta, o guardião será animado por meio de um extenso ritual que exige uma oficina especialmente preparada, similar ao laboratório de alquimista, que custa 500 PO para ser montado. Se o mestre estiver fabricando pessoalmente o guardião, a construção e o ritual podem ser realizados simultaneamente. É possível criar um guardião de manopla com mais de 4 DV, mas cada DV adicional acrescenta 2.000 PO ao preço de mercado e o custo aumenta em 10.000 PO para fabricar um guardião Médio, modificando o preço final apropriadamente. Nível de Conjurador: 9º; Pré-requisitos: Fabricar Constructo (descrito no Livro dos Monstros), compor, localizar criatura, moldar rochas; preço de mercado: 20.000 PO; custo para criar: 11.500 PO + 800 XP.",
  },
  {
    id: "cg-guardiao-laminado",
    name: "Guardião Laminado",
    page: 121,
    conjurerLevelRequired: 11,
    type: "Constructo (Médio)",
    hitDice: "8d10+20 (64 PV)",
    initiative: "+0",
    speed: "6 m (4 quadrados)",
    ac: "20 (+10 natural), toque 10, surpresa 20",
    baseAttackGrapple: "+6/+13",
    attack: "Corpo a corpo: garra +13 (1d6+7)",
    fullAttack: "Corpo a corpo: 2 garras +13 (1d6+7)",
    spaceReach: "1,5 m/1,5 m",
    specialAttacks: "—",
    specialQualities: "Constructo, Redução de Dano 5/—, visão no escuro 18 m, cura acelerada 1, encontrar o mestre, visão na penumbra, armazenar magia",
    saves: "Fort +2, Ref +2, Von +2",
    abilities: "For 24, Des 10, Con —, Int —, Sab 10, Car 1",
    environment: "Qualquer",
    organization: "Solitário",
    challengeRating: "6",
    treasure: "Nenhum",
    alignment: "Sempre Neutro",
    advancement: "9-13 DV (Médio); 14-24 DV (Grande)",
    description: "Esse constructo humanoide de metal tem um corpo recoberto de farpas. Ele possui lâminas giratórias no lugar das mãos. Durante a sua criação, os guardiões laminados são vinculados eternamente a seus mestres como familiares. Diferente da assistência geral que a maioria dos familiares fornece, os guardiões laminados existem apenas para lutar em favor de seus criadores. Os guardiões laminados são capazes de executar tarefas complexas relacionadas ao combate. Quando não estão executando uma tarefa específica para seus mestres, esses guardiões permanecem adjacentes ao criador, preparados para defender seus senhores contra qualquer atacante. Um guardião laminado tem quase 1,80 m de altura e pesa mais de 200 kg.",
    combat: "Os guardiões laminados são combatentes incansáveis, que golpeiam seus inimigos com as lâminas giratórias dos braços e raramente se afastam dos mestres. Proteger (Ext): um guardião laminado se movimenta rapidamente para defender seu mestre, bloqueando golpes e atrapalhando os inimigos. Todos os ataques desferidos contra o personagem adjacente ao guardião sofrem -2 de penalidade. Encontrar o Mestre (Sob): não importa a distância, enquanto estiverem no mesmo plano de existência, o guardião é capaz de localizar seu mestre. Armazenar Magia (SM): um guardião laminado é capaz de armazenar uma única magia de 3º nível ou inferior que seja conjurada sobre ele por outra criatura. Ele utilizará essa magia quando o mestre ordenar ou quando uma situação pré-determinada ocorrer. Assim que a magia for liberada, o guardião poderá armazenar outro efeito (ou a mesma magia).",
    construction: "Um guardião laminado é construído com madeira, prata, pedra e aço. Os materiais custam 4.000 PO. O mestre pode fabricar o corpo ou contratar um artesão para fazê-lo. A fabricação exige um teste de Profissão (engenharia) com CD 16. Depois que a criatura estiver pronta, o guardião será animado por meio de um extenso ritual que exige uma oficina especialmente preparada, similar ao laboratório de alquimista, que custa 500 PO para ser montado. Se o mestre estiver fabricando pessoalmente o guardião, a construção e o ritual podem ser realizados simultaneamente. É possível criar um guardião laminado com mais de 8 DV, mas cada DV adicional acrescenta 3.000 PO ao preço de mercado e o custo aumenta em 15.000 PO para fabricar um guardião Grande, modificando o preço final apropriadamente. Nível de Conjurador: 11º; Pré-requisitos: Fabricar Constructo (descrito no Livro dos Monstros), compor, localizar criatura, transformação de Tenser; preço de mercado: 30.000 PO; custo para criar: 18.000 PO + 1.200 XP.",
  },
];
