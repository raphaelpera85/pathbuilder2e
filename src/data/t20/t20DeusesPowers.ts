export const T20_DEUSES_SOURCE_BOOK = "Tormenta20 · Deuses de Arton";

export interface T20GrantedPower {
  id: string;
  name: string;
  deities: string[];
  deityIds: string[];
  prerequisite: string | null;
  description: string;
  sourcePage: number;
}

export const T20_DEUSES_GRANTED_POWERS: T20GrantedPower[] = [
  {
    "id": "t20.deuses.poder.abraco_da_fenix",
    "name": "Abraço da Fênix",
    "deities": [
      "Thyatis"
    ],
    "deityIds": [
      "thyatis"
    ],
    "prerequisite": null,
    "description": "Você se torna imune a fogo. Se fosse sofrer dano mágico de fogo, em vez disso cura PV em quantidade igual à metade desse dano (se já faz isso por outro efeito, cura a quantidade completa).",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.adaga_noturna",
    "name": "Adaga Noturna",
    "deities": [
      "Tenebra"
    ],
    "deityIds": [
      "tenebra"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 1 PM para fazer uma arma de perfuração que esteja usando causar +1d6 pontos de dano de frio até o fim da cena.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.a_ferramenta_certa",
    "name": "A Ferramenta Certa",
    "deities": [
      "Hyninn"
    ],
    "deityIds": [
      "hyninn"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 1 PM para fazer uma ferramenta ou um equipamento de aventura de até T$ 400 aparecer na sua mão ou em um espaço adjacente. O item dura até o fim da cena, ou até deixar sua posse.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.alimentar_se_do_pavor",
    "name": "Alimentar-se do Pavor",
    "deities": [
      "Kallyadranoch",
      "Megalokk"
    ],
    "deityIds": [
      "kallyadranoch",
      "megalokk"
    ],
    "prerequisite": null,
    "description": "Quando uma criatura em alcance curto sob efeito de uma condição de medo morre, você recebe pontos de vida temporários iguais ao dobro do seu ND, que duram até o fim da cena.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.alma_de_mudanca",
    "name": "Alma de Mudança",
    "deities": [
      "Thwor",
      "Valkaria"
    ],
    "deityIds": [
      "thwor",
      "valkaria"
    ],
    "prerequisite": null,
    "description": "No início de cada aventura, você pode trocar uma quantidade de poderes (limitada por sua Sabedoria) por poderes diferentes cujos pré-requisitos cumpra. Você não pode trocar este poder.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.andarilho_carregado",
    "name": "Andarilho Carregado",
    "deities": [
      "Valkaria"
    ],
    "deityIds": [
      "valkaria"
    ],
    "prerequisite": null,
    "description": "Sua mochila de aventureiro não conta no seu limite de itens vestidos e, se estiver vestindo uma dessas mochilas, você pode usar Sabedoria para estabelecer seu limite de carga (em vez de Força). A critério do mestre, este poder pode ser aplicado a outro item equivalente (como uma mochila de carga).",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.armadilha_divina",
    "name": "Armadilha Divina",
    "deities": [
      "Hyninn"
    ],
    "deityIds": [
      "hyninn"
    ],
    "prerequisite": null,
    "description": "Você recebe um poder de Armadilha do caçador (Tormenta20, p. 50) a sua escolha. Por ser criada a partir de energia divina, essa armadilha pode ser preparada em locais sem os materiais propícios.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.armadura_de_ossos",
    "name": "Armadura de Ossos",
    "deities": [
      "Tenebra"
    ],
    "deityIds": [
      "tenebra"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e 2 PM para receber +2 na Defesa e em Intimidação, e redução de corte, frio e trevas 5 até o fim da cena.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.armas_da_destruicao",
    "name": "Armas da Destruição",
    "deities": [
      "Arsenal"
    ],
    "deityIds": [
      "arsenal"
    ],
    "prerequisite": null,
    "description": "Você recebe +1 nas rolagens de dano e no multi- plicador de crítico com armas nas quais é proficiente.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.armas_da_selvageria",
    "name": "Armas da Selvageria",
    "deities": [
      "Megalokk"
    ],
    "deityIds": [
      "megalokk"
    ],
    "prerequisite": null,
    "description": "Para você, armas naturais são armas favoritas de Megalokk. Você recebe +2 em rolagens de dano com elas, pode usar Abençoar Arma (Tormenta20 , p. 57) nelas e, quando usa esse poder ou a magia Armamento da Natureza, pode aplicar seus benefícios a todas as suas armas naturais (sem custo adicional).",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.aventureiro_inquieto",
    "name": "Aventureiro Inquieto",
    "deities": [
      "Valkaria"
    ],
    "deityIds": [
      "valkaria"
    ],
    "prerequisite": null,
    "description": "Uma vez por busca (Tormenta20, p. 278), você pode rolar novamente um teste recém-realizado (mas deve aceitar o novo resultado) e, quando recebe uma recompensa ou um castigo aleatório por uma busca (incluindo rolagens na Tabela 8-1; Tormenta20, p. 328), rola dois dados e escolhe entre os dois resultados.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.baforada_draconica",
    "name": "Baforada Dracônica",
    "deities": [
      "Kallyadranoch"
    ],
    "deityIds": [
      "kallyadranoch"
    ],
    "prerequisite": null,
    "description": "Escolha um elemento entre ácido, eletricidade, fogo, frio, luz ou trevas (uma vez feita, essa escolha não pode ser mudada). Uma vez por rodada, você pode gastar PM (limitados por sua Constituição) para desferir um sopro elemental em uma criatura em alcance curto. Para cada PM que você gastar, o alvo sofre 1d10 pontos de dano do tipo escolhido (Reflexos CD Con reduz à metade). Recarga (movimento).",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.barreira_de_coral",
    "name": "Barreira de Coral",
    "deities": [
      "Oceano"
    ],
    "deityIds": [
      "oceano"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e 3 PM para cobrir seu corpo de coral. Até o fim da cena, você recebe +5 na Defesa e, sempre que sofrer um ataque corpo a corpo, o atacante sofre dano de perfuração igual a 1d6 + sua Constituição. Para cada patamar acima de iniciante, esse dano aumenta em +1d6.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.belo_presente",
    "name": "Belo Presente",
    "deities": [
      "Wynna"
    ],
    "deityIds": [
      "wynna"
    ],
    "prerequisite": null,
    "description": "Uma vez por cena, você pode pedir a Wynna o conhecimento de uma magia que tenha visto sendo lançada nessa aventura e que seja de um círculo a que você tenha acesso. Gaste uma ação padrão e faça um teste de Religião (CD 15 + custo em PM da magia). Se passar, você pode lançar essa magia até o fim do seu próximo turno (pagando seus custos normais). Novos Poderes Concedidos",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.biblioteca_divina",
    "name": "Biblioteca Divina",
    "deities": [
      "Tanna-Toh"
    ],
    "deityIds": [
      "tanna-toh"
    ],
    "prerequisite": null,
    "description": "Você recebe uma perícia treinada. A cada patamar de jogo (Tormenta20, p. 35) acima de iniciante, recebe mais uma perícia treinada.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.cancioneiro_da_esperanca",
    "name": "Cancioneiro da Esperança",
    "deities": [
      "Marah"
    ],
    "deityIds": [
      "marah"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 2 PM para entoar uma canção de superação e paz. Criaturas escolhidas (limitadas por seu Carisma) em alcance curto recebem +2 em testes (exceto testes de ataque) e +3m de deslocamento até o fim da cena. Se uma criatura afetada for executar uma ação hostil, perde esses bônus.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.cerimonialista_divino",
    "name": "Cerimonialista Divino",
    "deities": [
      "Lin-Wu"
    ],
    "deityIds": [
      "lin-wu"
    ],
    "prerequisite": null,
    "description": "Uma vez por dia, você pode gastar 1 hora para executar uma cerimônia tradicional que afeta até 1 + seu Carisma criaturas por 1 dia. Faça um teste de Religião com um bônus igual ao seu Carisma. Para cada 10 pontos do resultado, cada criatura afetada recebe um dado de auxílio. Quando faz um teste de atributo ou perícia (exceto Enganação, Furtividade e Ladinagem), a criatura pode gastar um deles para receber +1d6 de bônus no teste. Para criaturas que gastarem T$ 25 em oferendas no ritual, esse bônus muda para +1d8.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.chamado_monstruoso",
    "name": "Chamado Monstruoso",
    "deities": [
      "Megalokk"
    ],
    "deityIds": [
      "megalokk"
    ],
    "prerequisite": null,
    "description": "Você aprende e pode lançar Conjurar Monstro e pode lançar e sustentar essa magia sem violar suas Obrigações & Restrições. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.companheiro_celeste",
    "name": "Companheiro Celeste",
    "deities": [
      "Lena",
      "Marah"
    ],
    "deityIds": [
      "lena",
      "marah"
    ],
    "prerequisite": null,
    "description": "Você possui um luminar (veja p. 277) que o acompanha como um parceiro iniciante. Se perder esse luminar, você pode receber outro com uma cerimônia que exige 1 dia e T$ 100 em oferendas.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.companheiro_silvestre",
    "name": "Companheiro Silvestre",
    "deities": [
      "Allihanna"
    ],
    "deityIds": [
      "allihanna"
    ],
    "prerequisite": null,
    "description": "Você possui um espírito da natureza que o acompanha como um parceiro perseguidor iniciante. Alternativamente, se você tiver o suplemento Ameaças de Arton, pode receber um bogum inciante (p. 190). Se perder esse parceiro, você pode receber outro com uma cerimônia que exige 1 dia e T$ 100 em oferendas. Tabela 1-2: Novos Poderes Concedidos Divindade Poderes Concedidos Aharadak Corromper Equipamento, Espalhar a Corrupção, Júbilo na Dor, Mediador da Tempestade Allihanna Companheiro Silvestre, Espírito Animal, Estouro da Trobada, O Sol que nos Aquece, Trilha Desimpedida Arsenal Armas da Destruição, Expurgar a Derrota, Ferramentas da Guerra, Vitória a Qualquer Custo Azgher Imolação Sagrada, O Sol que nos Aquece, Proeminência Solar, Resplendor Divino Hyninn A Ferramenta Certa, Armadilha Divina, Dom da Furtividade, O Dobro ou Nada Kallyadranoch Alimentar-se do Pavor, Baforada Dracônica, Poder sem Limites, Temor Arcano, Terror Profundo Khalmyr Dom da Vontade, Jurista Divino, Pilar de Heredrimm, Quebrar Encanto Lena Companheiro Celeste, Curar o Espírito, Magia Piedosa, Transbordar Cura Lin-Wu Cerimonialista Divino, Exaltar Honra, Jurista Divino, Mestre de Si, Saque Celestial Marah Cancioneiro da Esperança, Companheiro Celeste, Discurso Conciliador, Remorso do Belicista Megalokk Alimentar-se do Pavor, Armas da Selvageria, Chamado Monstruoso, Terror Profundo Nimb Magia Caótica, Nimb, O Dobro ou Nada, Só os Loucos Sabem Oceano Barreira de Coral, Égide dos Mares, Golpe Tempestuoso, Mar Revolto, Navegador Sagrado Sszzaas Dom dos Segredos, Magia Venenosa, Manto Ardiloso, Mordida de Víbora Tanna-Toh Biblioteca Divina, Espírito do Conhecimento, Golpe Semântico, Palavra de Poder, Perceber Farsas Tenebra Adaga Noturna, Armadura de Ossos, Passo Sombrio, Toque de Não Vida Thwor Alma de Mudança, O Futuro que Vier Disso, Terror Profundo, Ushultt Thyatis Abraço da Fênix, Imolação Sagrada, Magia Piedosa, Redirecionar Destino Valkaria Alma de Mudança, Andarilho Carregado, Aventureiro Inquieto, Convicção Ambiciosa Wynna Belo Presente, Familiar Elemental, Poder do Vínculo, Sorvo de Mana",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.conviccao_ambiciosa",
    "name": "Convicção Ambiciosa",
    "deities": [
      "Valkaria"
    ],
    "deityIds": [
      "valkaria"
    ],
    "prerequisite": null,
    "description": "Quando luta em desvantagem (um encontro contra o dobro de inimigos que seu grupo, ou com ND maior que o do grupo), você recebe +2 em testes de perícia até o fim da cena. Além disso, se houver um ou mais inimigos de ND igual ou maior que seu nível, você recebe uma ação padrão extra em seu primeiro turno de combate.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.corromper_equipamento",
    "name": "Corromper Equipamento",
    "deities": [
      "Aharadak"
    ],
    "deityIds": [
      "aharadak"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 2 PM para cobrir uma arma, um escudo ou um esotérico que esteja empunhando com carapaça quitinosa. Até o fim da cena, o item recebe os benefícios de matéria vermelha (Tormenta20, p. 167), cumulativo com outros materiais especiais. Se usar este poder em uma arma produzida com Armamento Aberrante, seu custo é reduzido em –1 PM.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.curar_o_espirito",
    "name": "Curar o Espírito",
    "deities": [
      "Lena"
    ],
    "deityIds": [
      "lena"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação completa para inspirar esperança em uma criatura que possa tocar. Faça um teste de Carisma (CD 10). Se você passar, a criatura recupera 1d4+1 PM. Você só pode usar este poder uma vez por dia numa mesma criatura.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.discurso_conciliador",
    "name": "Discurso Conciliador",
    "deities": [
      "Marah"
    ],
    "deityIds": [
      "marah"
    ],
    "prerequisite": null,
    "description": "Quando faz um teste de Diplomacia para mudar atitude, você pode rolar dois dados e usar o melhor resultado ou ambos (como se tivesse usado mudar atitude duas vezes). Se passar em ambos, as mudanças de atitude são cumulativas.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.dom_da_furtividade",
    "name": "Dom da Furtividade",
    "deities": [
      "Hyninn"
    ],
    "deityIds": [
      "hyninn"
    ],
    "prerequisite": null,
    "description": "Você soma sua Sabedoria em Furtividade e, para você, lançar magias é um ato pouco chamativo, o que reduz a penalidade para se esconder após conjurar para –10 (mas você ainda precisa de gestos e palavras).",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.dom_da_vontade",
    "name": "Dom da Vontade",
    "deities": [
      "Khalmyr"
    ],
    "deityIds": [
      "khalmyr"
    ],
    "prerequisite": null,
    "description": "Você recebe +2 em Vontade e, uma vez por cena, quando passa em um teste de Vontade contra um efeito de um inimigo ou de um perigo apresentado pelo mestre, recebe 1d4 PM temporários.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.dom_dos_segredos",
    "name": "Dom dos Segredos",
    "deities": [
      "Sszzaas"
    ],
    "deityIds": [
      "sszzaas"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 2 PM para suplicar a Sszzaas por um segredo místico. Faça um teste de Carisma (CD 10, +2 para cada vez que usou este poder no mesmo dia). Se passar, você aprende e pode lançar uma magia de 1º círculo até o fim da cena (atributo-chave Car ou o seu atributo de conjuração, se houver).",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.egide_dos_mares",
    "name": "Égide dos Mares",
    "deities": [
      "Oceano"
    ],
    "deityIds": [
      "oceano"
    ],
    "prerequisite": null,
    "description": "Você possui um espírito das águas que o acompanha como um parceiro guardião iniciante. Alternativamente, se você tiver o suplemento Ameaças de Arton, pode receber um escudeiro inciante (p. 191). Em ambos os casos, se perder esse parceiro, você pode receber outro com uma cerimônia que exige 1 dia e T$ 100 em oferendas.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.espalhar_a_corrupcao",
    "name": "Espalhar a Corrupção",
    "deities": [
      "Aharadak"
    ],
    "deityIds": [
      "aharadak"
    ],
    "prerequisite": null,
    "description": "Quando chega em uma comunidade, você pode gastar um dia e fazer um teste de Religião (CD 20). Se passar, você planta a semente da corrupção no coração das pessoas em uma área equivalente a uma aldeia, um castelo ou um bairro de uma cidade grande. Por uma semana, ou até você partir do lugar, a categoria de atitude dessas pessoas em relação umas às outras piora em um passo, à medida que o senso moral delas se deteriora e seus piores desejos vêm à tona. Isso pode ser útil para gerar conflitos entre elas, embora caiba a você descobrir exatamente como se aproveitar deles.",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.espirito_animal",
    "name": "Espírito Animal",
    "deities": [
      "Allihanna"
    ],
    "deityIds": [
      "allihanna"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e 2 PM para conjurar um espírito animal que o envolve e luta com você. Até o fim da cena, você não pode ser flanqueado e recebe 10 PV temporários e uma arma natural (dano 1d6, crítico x2, tipo a sua escolha entre corte, impacto ou perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com essa arma. Quando usa este poder, você pode gastar PM adicionais (custo total limitado por sua Sabedoria). Para cada PM adicional, os PV temporários aumentam em +5.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.espirito_do_conhecimento",
    "name": "Espírito do Conhecimento",
    "deities": [
      "Tanna-Toh"
    ],
    "deityIds": [
      "tanna-toh"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 2 PM para invocar uma manifestação do saber em um espaço deso- cupado em alcance curto. Ela é um espírito Minúsculo que tem deslocamento de voo 6m, Força nula, Defesa 15, 1 PV , visão no escuro e falha em qualquer teste oposto. No início de seus turnos, ela pode usar a ação movimentar-se uma vez. Você pode perceber tudo que a manifestação for capaz de perceber e pode lançar magias a partir dela (exceto magias de alcance pessoal com alvo você). A manifestação desaparece quando morre ou no fim da cena.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.estouro_da_trobada",
    "name": "Estouro da Trobada",
    "deities": [
      "Allihanna"
    ],
    "deityIds": [
      "allihanna"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação completa e 2 PM para convocar uma manada de trobos (ou outro animal da região) em um ponto desocupado a sua escolha em alcance curto com duração sustentada. A manada é Enorme e pode passar pelo espaço de outras criaturas. Você pode gastar uma ação de movimento para mover a manada 12m em linha reta. Criaturas pelas quais ela passar sofrem 3d6 pontos de dano de impacto e ficam caídas (Fort CD Sab reduz à metade e evita a condição).",
    "sourcePage": 44
  },
  {
    "id": "t20.deuses.poder.exaltar_honra",
    "name": "Exaltar Honra",
    "deities": [
      "Lin-Wu"
    ],
    "deityIds": [
      "lin-wu"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 2 PM para gerar uma aura de honradez de 9m de raio que dura até o fim da cena. Dentro dessa área, devotos de Lin-Wu e personagens que sigam algum código de conduta (como Código de Honra ou Código do Herói) recebem +5 em Diplomacia e Nobreza, e todas as criaturas na área sofrem –5 em perícias desonradas (Enganação, Furtividade e Ladinagem). Apenas personagens com a habilidade Abençoado ou Devoto Fiel podem escolher este poder.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.expurgar_a_derrota",
    "name": "Expurgar a Derrota",
    "deities": [
      "Arsenal"
    ],
    "deityIds": [
      "arsenal"
    ],
    "prerequisite": null,
    "description": "Se estiver com 0 PM, você pode gastar seus pontos de vida (exceto PV temporários) no lugar de mana, à taxa de 3 PV por 1 PM. Você não pode reduzir seus PV a 0 ou menos dessa forma e não pode usar este poder se estiver sob efeito de ter descumprido suas Obrigações & Restrições. Pontos de vida gastos dessa forma só podem ser recuperados com descanso.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.familiar_elemental",
    "name": "Familiar Elemental",
    "deities": [
      "Wynna"
    ],
    "deityIds": [
      "wynna"
    ],
    "prerequisite": null,
    "description": "Você possui um espírito arcano que o acompanha como um familiar com as habilidades de um adepto iniciante. Alternativamente, se você tiver o suplemento Ameaças de Arton, pode receber um familiar elemental inciante, escolhido entre aquin'ne, t'peel, pakk ou terrier (p. 88). Em ambos os casos, se perder esse parceiro, você pode receber outro com uma cerimônia que exige 1 dia e T$ 100 em oferendas.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.ferramentas_da_guerra",
    "name": "Ferramentas da Guerra",
    "deities": [
      "Arsenal"
    ],
    "deityIds": [
      "arsenal"
    ],
    "prerequisite": null,
    "description": "Uma vez por dia, você pode gastar 1 hora e T$ 10 por item para abençoar uma quantidade de itens limitada por sua Sabedoria. Armas abençoadas dessa forma fornecem +2 em rolagens de dano, e armaduras e escudos fornecem RD 2. Se o usuário de um item abençoado for derrotado em combate, o item é destruído. Os efeitos da bênção duram 1 dia.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.golpe_semantico",
    "name": "Golpe Semântico",
    "deities": [
      "Tanna-Toh"
    ],
    "deityIds": [
      "tanna-toh"
    ],
    "prerequisite": null,
    "description": "Você pode substituir testes de Diplomacia e Intimidação por Conhecimento.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.golpe_tempestuoso",
    "name": "Golpe Tempestuoso",
    "deities": [
      "Oceano"
    ],
    "deityIds": [
      "oceano"
    ],
    "prerequisite": null,
    "description": "Quando acerta um ataque corpo a corpo, você pode gastar 2 PM. Se fizer isso, a criatura é empurrada 3m em uma direção a sua escolha e fica desprevenida por 1 rodada.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.imolacao_sagrada",
    "name": "Imolação Sagrada",
    "deities": [
      "Azgher",
      "Thyatis"
    ],
    "deityIds": [
      "azgher",
      "thyatis"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 1 PM para cobrir seus braços com chamas com duração sustentada. Nesse estado, seus ataques corpo a corpo causam +1d6 pontos de dano de fogo.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.jubilo_na_dor",
    "name": "Júbilo na Dor",
    "deities": [
      "Aharadak"
    ],
    "deityIds": [
      "aharadak"
    ],
    "prerequisite": null,
    "description": "Quando causa ou sofre dano, você recebe redução de dano 1. Esse efeito é cumulativo e limitado por sua Sabedoria e termina se você passar 1 rodada sem causar ou sofrer dano.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.jurista_divino",
    "name": "Jurista Divino",
    "deities": [
      "Khalmyr",
      "Lin-Wu"
    ],
    "deityIds": [
      "khalmyr",
      "lin-wu"
    ],
    "prerequisite": null,
    "description": "Você pode usar Sabedoria para Nobreza (em vez de Inteligência) e pode usar essa perícia no lugar de Diplomacia e Intimidação.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.magia_caotica",
    "name": "Magia Caótica",
    "deities": [
      "Nimb"
    ],
    "deityIds": [
      "nimb"
    ],
    "prerequisite": null,
    "description": "Quando lança uma magia, você pode gastar +2 PM. Se fizer isso, a CD para resistir a essa magia é calculada com 1d20 + seus modificadores, em vez de 10 + seus modificadores.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.magia_piedosa",
    "name": "Magia Piedosa",
    "deities": [
      "Lena",
      "Thyatis"
    ],
    "deityIds": [
      "lena",
      "thyatis"
    ],
    "prerequisite": null,
    "description": "Quando lança uma magia que causa dano, você pode fazer com que ela cause dano não letal.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.magia_venenosa",
    "name": "Magia Venenosa",
    "deities": [
      "Sszzaas"
    ],
    "deityIds": [
      "sszzaas"
    ],
    "prerequisite": null,
    "description": "Suas magias com resistência Fortitude recebem o seguinte aprimoramento. +1 PM: além do normal, criaturas que falharem perdem 1d12 PV por veneno, ou 1d6 se passarem na resistência.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.manto_ardiloso",
    "name": "Manto Ardiloso",
    "deities": [
      "Sszzaas"
    ],
    "deityIds": [
      "sszzaas"
    ],
    "prerequisite": null,
    "description": "Você aprende a magia Disfarce Ilusório (CD Car). Na primeira vez que interage com alguém enquanto está sob efeito dessa magia, você recebe +10 no teste de Diplomacia para mudar a atitude dela. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.mar_revolto",
    "name": "Mar Revolto",
    "deities": [
      "Oceano"
    ],
    "deityIds": [
      "oceano"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 1 PM para gerar uma aura de 6m de raio com duração sustentada. No início de seus turnos, criaturas a sua escolha na área devem passar em um teste de Acrobacia (CD Sab, +5 se a criatura estiver dentro da água) para não cair.",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.mediador_da_tempestade",
    "name": "Mediador da Tempestade",
    "deities": [
      "Aharadak"
    ],
    "deityIds": [
      "aharadak"
    ],
    "prerequisite": null,
    "description": "Você pode se comunicar com lefeu inteligentes (Int –3 ou maior) livremente e recebe +5 em testes de Diplomacia e Intuição com criaturas da Tormenta e devotos de Aharadak.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.mestre_de_si",
    "name": "Mestre de Si",
    "deities": [
      "Lin-Wu"
    ],
    "deityIds": [
      "lin-wu"
    ],
    "prerequisite": null,
    "description": "Você passa automaticamente no primeiro teste de Vontade contra um efeito de um inimigo que fizer a cada cena.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.mordida_de_vibora",
    "name": "Mordida de Víbora",
    "deities": [
      "Sszzaas"
    ],
    "deityIds": [
      "sszzaas"
    ],
    "prerequisite": null,
    "description": "Você recebe uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Suas presas são retráteis e podem armazenar até 2 doses de veneno de contato. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Se acertar, pode inocular uma das doses de veneno no alvo.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.navegador_sagrado",
    "name": "Navegador Sagrado",
    "deities": [
      "Oceano"
    ],
    "deityIds": [
      "oceano"
    ],
    "prerequisite": null,
    "description": "Você pode usar Sabedoria para Pilotagem (em vez de Destreza) e, enquanto estiver em uma embarcação aquática, suas magias divinas custam –2 PM.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.nimb",
    "name": "Nimb",
    "deities": [
      "Nimb"
    ],
    "deityIds": [
      "nimb"
    ],
    "prerequisite": null,
    "description": "Você é Nimb. Ou um filho ou filha dele. Ou uma casca de banana na qual ele escorregou certa vez. Você pode gastar uma ação padrão e 2 PM para gerar uma habilidade única. Para isso, role 1d6 em cada coluna abaixo. e 1d6 Área/Alvo Efeito 1 Criaturas em um cone de 6m. Ficam verdes por 1 dia; sofrem –2 em testes baseados em Carisma. 2 Até 1d3 criaturas em alcance médio. Curam 3d6 PV. 3 Criaturas em um raio de 9m. Em seu próximo teste, rolam 2 dados e você escolhe o resultado. 4 Criaturas em uma esfera com 6m de raio em alcance curto. Perdem 3d6+3 pontos de vida. 5 Criaturas em 1d3 linhas de 15m. Recebem 1d4 PM temporários que duram 1 rodada. 6 Criaturas escolhidas em alcance curto. Podem usar Poder Oculto (Tormenta20, p. 134) até o fim da cena.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.o_dobro_ou_nada",
    "name": "O dobro ou nada",
    "deities": [
      "Hyninn",
      "Nimb"
    ],
    "deityIds": [
      "hyninn",
      "nimb"
    ],
    "prerequisite": null,
    "description": "Quando usa uma habilidade com custo em PM, você pode pagar o dobro desse custo (após aplicar efeitos que alterem o custo) para aumentar a CD da habilidade em +5. Se pelo menos um alvo passar no teste de resistência, você fica alquebrado. Este poder não pode ser usado em magias, incluindo simuladas.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.o_futuro_que_vier_disso",
    "name": "O Futuro que vier disso",
    "deities": [
      "Thwor"
    ],
    "deityIds": [
      "thwor"
    ],
    "prerequisite": null,
    "description": "Quando faz um teste, você pode rolar um dado a sua escolha (d4 a d20) e somar o resultado a esse teste. Quando você faz isso, o mestre recebe um dado do mesmo tipo, que pode gastar para aplicar como penalidade em um de seus testes até o fim da próxima sessão. Você não pode usar este poder novamente na mesma sessão até que o mestre use o dado que recebeu.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.o_sol_que_nos_aquece",
    "name": "O Sol que nos Aquece",
    "deities": [
      "Allihanna",
      "Azgher"
    ],
    "deityIds": [
      "allihanna",
      "azgher"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação padrão e 2 PM para projetar uma aura de luz solar em um raio de 6m. Nessa área, habilidades mágicas de fogo ou luz e relacionadas a plantas (como Controlar Plantas) custam –1 PM (cumulativo com outras reduções) e criaturas com sensibilidade a luz e mortos-vivos ficam vulneráveis.",
    "sourcePage": 43
  },
  {
    "id": "t20.deuses.poder.palavra_de_poder",
    "name": "Palavra de Poder",
    "deities": [
      "Tanna-Toh"
    ],
    "deityIds": [
      "tanna-toh"
    ],
    "prerequisite": null,
    "description": "Você aprende e pode lançar Comando. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.passo_sombrio",
    "name": "Passo Sombrio",
    "deities": [
      "Tenebra"
    ],
    "deityIds": [
      "tenebra"
    ],
    "prerequisite": null,
    "description": "Uma vez por rodada, você pode gastar 2 PM para se teleportar para um espaço desocupado em alcance curto. Se tanto você quanto esse espaço estiverem sob escuridão, o custo deste poder diminui em –1 PM. Você não pode usar este poder se estiver imóvel.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.perceber_farsas",
    "name": "Perceber Farsas",
    "deities": [
      "Tanna-Toh"
    ],
    "deityIds": [
      "tanna-toh"
    ],
    "prerequisite": null,
    "description": "Você recebe +5 em Intuição e se torna imune a efeitos de ilusão.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.pilar_de_heredrimm",
    "name": "Pilar de Heredrimm",
    "deities": [
      "Khalmyr"
    ],
    "deityIds": [
      "khalmyr"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 2 PM para receber +2 na Defesa e redução de dano 5 até o fim da cena ou até encerrar este poder (uma ação livre). Enquanto esse efeito estiver ativo, seu deslocamento é reduzido à metade.",
    "sourcePage": 46
  },
  {
    "id": "t20.deuses.poder.poder_do_vinculo",
    "name": "Poder do Vínculo",
    "deities": [
      "Wynna"
    ],
    "deityIds": [
      "wynna"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e uma quantidade de PM (limitada ao círculo de magias a que tem acesso) para tocar em uma criatura capaz de lançar magias. O custo em PM da próxima magia que ela lançar diminui em um valor igual aos PM que você gastou.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.poder_sem_limites",
    "name": "Poder Sem Limites",
    "deities": [
      "Kallyadranoch"
    ],
    "deityIds": [
      "kallyadranoch"
    ],
    "prerequisite": null,
    "description": "A CD e os limites de PM de suas habilidades (exceto magias e habilidades que as simulem) aumentam em um valor igual ao seu patamar.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.proeminencia_solar",
    "name": "Proeminência Solar",
    "deities": [
      "Azgher"
    ],
    "deityIds": [
      "azgher"
    ],
    "prerequisite": null,
    "description": "Suas magias que causam dano de fogo e que têm um teste de resistência recebem o seguinte aprimo - ramento: +1 PM: criaturas que falhem na resistência ficam em chamas e lentas até apagarem as chamas.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.quebrar_encanto",
    "name": "Quebrar Encanto",
    "deities": [
      "Khalmyr"
    ],
    "deityIds": [
      "khalmyr"
    ],
    "prerequisite": null,
    "description": "Você recebe +2 em testes de ataque para quebrar. Quando usa essa manobra, você pode gastar 2 PM. Se você acertar o ataque, o item e seu portador sofrem o efeito de Dissipar Magia, usando o resultado do teste de quebrar como teste de Misticismo e CD para resistir.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.redirecionar_destino",
    "name": "Redirecionar Destino",
    "deities": [
      "Thyatis"
    ],
    "deityIds": [
      "thyatis"
    ],
    "prerequisite": null,
    "description": "No início de cada dia, role um d20 e anote seu valor. Uma vez por rodada, quando uma criatura em alcance curto faz um teste, você pode gastar 3 PM para substituir o resultado do d20 desse teste pelo último valor anotado para este poder. O resultado do d20 substituído se torna seu novo valor anotado.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.remorso_do_belicista",
    "name": "Remorso do Belicista",
    "deities": [
      "Marah"
    ],
    "deityIds": [
      "marah"
    ],
    "prerequisite": null,
    "description": "Uma vez por rodada, quando sofre dano de um inimigo, você pode gastar 1 PM. Se fizer isso, ele sofre uma penalidade cumulativa de –2 em testes de ataque e rolagens de dano até o fim da cena. Mental.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.resplendor_divino",
    "name": "Resplendor Divino",
    "deities": [
      "Azgher"
    ],
    "deityIds": [
      "azgher"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 2 PM para gerar uma aura de luz solar com 9m de raio que dura até o fim da cena. Além de sofrer os efeitos de exposição à luz, criaturas dentro da aura perdem toda camuflagem por escuridão e efeitos semelhantes (como da cobertura de sombras do aprimoramento da magia Escuridão).",
    "sourcePage": 45
  },
  {
    "id": "t20.deuses.poder.saque_celestial",
    "name": "Saque Celestial",
    "deities": [
      "Lin-Wu"
    ],
    "deityIds": [
      "lin-wu"
    ],
    "prerequisite": null,
    "description": "Você pode gastar 1 PM para sacar ou guardar uma arma como uma ação livre. Se sacar sua arma e fizer um ataque corpo a corpo no mesmo turno, você recebe +2 nesse teste de ataque e seu dano aumenta em dois passos (apenas uma vez contra cada criatura por cena).",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.so_os_loucos_sabem",
    "name": "Só os Loucos Sabem",
    "deities": [
      "Nimb"
    ],
    "deityIds": [
      "nimb"
    ],
    "prerequisite": null,
    "description": "Role duas perícias na Tabela 6-6 (Tormenta20, p. 279). Você se torna treinado nelas (se já for, recebe +3 nessa perícia). No começo de cada dia, você pode gastar 3 PM para rolar novas perícias.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.sorvo_de_mana",
    "name": "Sorvo de Mana",
    "deities": [
      "Wynna"
    ],
    "deityIds": [
      "wynna"
    ],
    "prerequisite": null,
    "description": "Sempre que falhar no teste de resistência contra uma magia de um inimigo, você recupera uma quantidade de PM igual ao círculo dela.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.temor_arcano",
    "name": "Temor Arcano",
    "deities": [
      "Kallyadranoch"
    ],
    "deityIds": [
      "kallyadranoch"
    ],
    "prerequisite": null,
    "description": "Quando um inimigo em alcance médio sob efeito de uma condição de medo falha em um teste de resistência contra uma de suas magias, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena igual ao seu nível, e eles desaparecem no fim da cena.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.terror_profundo",
    "name": "Terror Profundo",
    "deities": [
      "Kallyadranoch",
      "Megalokk",
      "Thwor"
    ],
    "deityIds": [
      "kallyadranoch",
      "megalokk",
      "thwor"
    ],
    "prerequisite": null,
    "description": "Você recebe +2 em Intimidação e na CD de seus efeitos de medo.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.toque_de_nao_vida",
    "name": "Toque de Não Vida",
    "deities": [
      "Tenebra"
    ],
    "deityIds": [
      "tenebra"
    ],
    "prerequisite": null,
    "description": "Você pode gastar uma ação de movimento e 2 PM para fornecer a si mesmo ou a uma criatura adjacente 2d12 PV temporários (que são sempre os primeiros a serem perdidos) e, enquanto os PV temporários durarem, camuflagem leve.",
    "sourcePage": 42
  },
  {
    "id": "t20.deuses.poder.transbordar_cura",
    "name": "Transbordar Cura",
    "deities": [
      "Lena"
    ],
    "deityIds": [
      "lena"
    ],
    "prerequisite": null,
    "description": "Quando você usa um efeito de cura, quaisquer pontos de vida excedentes desse efeito se tornam pontos de vida temporários, até um valor máximo igual ao dobro do nível do alvo.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.trilha_desimpedida",
    "name": "Trilha Desimpedida",
    "deities": [
      "Allihanna"
    ],
    "deityIds": [
      "allihanna"
    ],
    "prerequisite": null,
    "description": "Você aprende e pode lançar a magia Caminhos da Natureza. Se aprender essa magia, o custo dela diminui em –1 PM.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.ushultt",
    "name": "Ushultt",
    "deities": [
      "Thwor"
    ],
    "deityIds": [
      "thwor"
    ],
    "prerequisite": null,
    "description": "Escolha um de seus aliados como seu ushultt. Enquanto estiverem em alcance curto um do outro, vocês recebem +2 em testes de ataque e rolagens de dano (esse bônus aumenta para +3 se o ushultt também for duyshidakk). Você pode trocar seu ushultt uma vez por aventura.",
    "sourcePage": 47
  },
  {
    "id": "t20.deuses.poder.vitoria_a_qualquer_custo",
    "name": "Vitória a qualquer custo",
    "deities": [
      "Arsenal"
    ],
    "deityIds": [
      "arsenal"
    ],
    "prerequisite": null,
    "description": "Quando faz um teste de ataque, de resistência ou de Guerra, você pode gastar 2 PM para rolar novamente esse teste. Você pode fazer isso várias vezes no mesmo teste, mas cada novo uso aumenta o custo em +1 PM. E sta seção descreve diversos equipa - mentos relacionados às divindades de Arton. Embora geralmente sejam usados por devotos, muitos desses itens não exigem uma conexão divina e fre - quentemente são empregados por aventureiros sem nenhuma ligação com os deuses. Equipamento de Aventura Água Benta Concentrada. Criada com os mais puros ingredientes, esta água funciona como água benta (Tormenta20, p. 155), mas causa 4d10 pontos de dano. É fabricada com o mesmo aprimoramento de Abençoar Alimentos, mas seu componente material custa T$ 30. Amuleto de Khalmyr. Este amuleto em formato de balança não é usado apenas por devotos de Khalmyr — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os chatos mais previsíveis o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Sabedoria (CD 10). Se passar, pode escolher 10 para esse teste de perícia (em vez de usar o valor rolado no d20). Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil. Amuleto de Nimb. Este amuleto em formato de dado não é usado apenas por devotos de Nimb — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os crédulos o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Inteligência (CD 10). Se fizer o teste de Inteligência e falhar nele, pode rolar novamente o teste de perícia e usar o melhor resultado. Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil. Apanhador de Sonhos. Muitos artonianos acreditam que ficam mais vulneráveis enquanto estão dormindo — não apenas a ataques físicos, mas também a espíritos inquietos, tentações demoníacas e, é claro, pesadelos. Este item é uma pequena estrutura de madeira, cordões, contas e penas feita por um sacerdote para proteger o descanso de seus fiéis. Se estiver em posso de um apanhador de sonhos, recebe +2 em testes de resistência quando estiver dormindo. Aspersório. Este item parece uma maça, mas sua cabeça é um reservatório de água benta feito de metal perfurado. Você pode gastar uma ação padrão para dispersar uma dose de água benta (normal ou concentrada) em um cone de 4,5m; a CD para resistir à água benta aumenta em +2. Um aspersório pode armazenar até 3 doses de água benta. Carregá-lo exige uma ação completa e o gasto das doses. Cajado de Pastor. Um cajado comprido, com uma extremidade reta e a outra em semicírculo. Usado originalmente para guiar ovelhas, é símbolo de algumas religiões pacíficas e campestres. Se você rezar uma Missa (Tormenta20, p. 58) usando um cajado de pastor, cada participante recebe 5 PV e 1 PM temporários (cumulativos com os efeitos da missa). Cálice Consagrado. Um cálice santificado feito de um material relacionado ao deus (ouro para Azgher, madeira para Allihanna, obsidiana para Tenebra...). Se você for um devoto da divindade, pode usar o cálice para beber uma poção ou para aplicá-la em um aliado. Se fizer isso, o efeito da poção aumenta em +1 dado do mesmo tipo. Para usar o cálice você precisa gastar uma ação de movimento derramando a poção em seu interior, além do tempo necessário para consumi-la ou aplicá-la. A critério do mestre, esse efeito pode não funcionar com devotos de um deus inimigo (por exemplo, Azgher e Tenebra). Colar do Suplicante. Este colar simples possui 10 contas de um material ligado à divindade em questão, como jade para Lin-Wu ou cristal para Wynna. Se você estiver vestindo um colar do suplicante de um deus do qual é devoto, uma vez por dia você pode gastar uma ação de movimento e uma das contas para recuperar 1 PM. Uma vez que as contas sejam gastas, o colar perde seu efeito. Emblema Religioso. Esta chapa fina de cobre maleável é gravada com a imagem de uma figura religiosa importante e vendida ou distribuída para peregrinos e fiéis em igrejas e templos. É um lembrete dos ensinamentos religiosos que até mesmo os devotos mais humildes ou ignorantes recebem. Existem emblemas religiosos específicos para cada",
    "sourcePage": 47
  }
];
