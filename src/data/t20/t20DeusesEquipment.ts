export const T20_DEUSES_SOURCE_BOOK = "Tormenta20 · Deuses de Arton";

export interface T20DeusesItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  itemType?: string;
  deity?: string;
  deityId?: string;
  cost: string;
  spaces: number;
  sourcePage: number;
  description: string;
}

export const T20_DEUSES_EQUIPMENT: T20DeusesItem[] = [
  {
    "id": "t20.deuses.item.agua_benta_concentrada",
    "name": "Água benta concentrada",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 60",
    "spaces": 0.5,
    "sourcePage": 48,
    "description": "Criada com os mais puros ingredientes, esta água funciona como água benta (Tormenta20, p. 155), mas causa 4d10 pontos de dano. É fabricada com o mesmo aprimoramento de Abençoar Alimentos, mas seu componente material custa T$ 30."
  },
  {
    "id": "t20.deuses.item.amuleto_de_khalmyr",
    "name": "Amuleto de Khalmyr",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 30",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Este amuleto em formato de balança não é usado apenas por devotos de Khalmyr — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os chatos mais previsíveis o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Sabedoria (CD 10). Se passar, pode escolher 10 para esse teste de perícia (em vez de usar o valor rolado no d20). Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil."
  },
  {
    "id": "t20.deuses.item.amuleto_de_nimb",
    "name": "Amuleto de Nimb",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 30",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Este amuleto em formato de dado não é usado apenas por devotos de Nimb — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os crédulos o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Inteligência (CD 10). Se fizer o teste de Inteligência e falhar nele, pode rolar novamente o teste de perícia e usar o melhor resultado. Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil."
  },
  {
    "id": "t20.deuses.item.apanhador_de_sonhos",
    "name": "Apanhador de sonhos",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 40",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Muitos artonianos acreditam que ficam mais vulneráveis enquanto estão dormindo — não apenas a ataques físicos, mas também a espíritos inquietos, tentações demoníacas e, é claro, pesadelos. Este item é uma pequena estrutura de madeira, cordões, contas e penas feita por um sacerdote para proteger o descanso de seus fiéis. Se estiver em posso de um apanhador de sonhos, recebe +2 em testes de resistência quando estiver dormindo."
  },
  {
    "id": "t20.deuses.item.aspersorio",
    "name": "Aspersório",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 50",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Este item parece uma maça, mas sua cabeça é um reservatório de água benta feito de metal perfurado. Você pode gastar uma ação padrão para dispersar uma dose de água benta (normal ou concentrada) em um cone de 4,5m; a CD para resistir à água benta aumenta em +2. Um aspersório pode armazenar até 3 doses de água benta."
  },
  {
    "id": "t20.deuses.item.cajado_de_pastor",
    "name": "Cajado de pastor",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 12",
    "spaces": 2.0,
    "sourcePage": 48,
    "description": "Um cajado comprido, com uma extremidade reta e a outra em semicírculo. Usado originalmente para guiar ovelhas, é símbolo de algumas religiões pacíficas e campestres. Se você rezar uma Missa (Tormenta20, p. 58) usando um cajado de pastor, cada participante recebe 5 PV e 1 PM temporários (cumulativos com os efeitos da missa)."
  },
  {
    "id": "t20.deuses.item.calice_consagrado",
    "name": "Cálice consagrado",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 300",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Um cálice santificado feito de um material relacionado ao deus (ouro para Azgher, madeira para Allihanna, obsidiana para Tenebra...). Se você for um devoto da divindade, pode usar o cálice para beber uma poção ou para aplicá-la em um aliado. Se fizer isso, o efeito da poção aumenta em +1 dado do mesmo tipo. Para usar o cálice você precisa gastar uma ação de movimento derramando a poção em seu interior, além do tempo necessário para consumi-la ou aplicá-la. A critério do mestre, esse efeito pode não funcionar com devotos de um deus inimigo (por exemplo, Azgher e Tenebra)."
  },
  {
    "id": "t20.deuses.item.colar_do_suplicante",
    "name": "Colar do suplicante",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Este colar simples possui 10 contas de um material ligado à divindade em questão, como jade para"
  },
  {
    "id": "t20.deuses.item.emblema_religioso",
    "name": "Emblema religioso",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 30",
    "spaces": 1.0,
    "sourcePage": 48,
    "description": "Esta chapa fina de cobre maleável é gravada com a imagem de uma figura religiosa importante e vendida ou distribuída para peregrinos e fiéis em igrejas e templos."
  },
  {
    "id": "t20.deuses.item.ferula",
    "name": "Férula",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Um cajado luxuoso (feito de madeira de boa qualidade ou de um metal precioso) com um símbolo sagrado no topo. Usado em procissões, na leitura de textos sagrados e na administração de sacramentos. O efeito de sua habilidade Canalizar Energia aumenta em +1d6. Uma férula pode ser usada como arma, com as estatísticas de uma maça. Panfleto de Aforismos. Às vezes as religiões artonianas contam com tomos de fácil leitura, sem conteúdo pesado — apenas citações motivadoras, conselhos simples, dicas de exercícios de respiração e pequenos excertos que ajudam o fiel a relaxar."
  },
  {
    "id": "t20.deuses.item.panfleto_de_aforismos",
    "name": "Panfleto de aforismos",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 60",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Às vezes as religiões artonianas contam com tomos de fácil leitura, sem conteúdo pesado — apenas citações motivadoras, conselhos simples, dicas de exercícios de respiração e pequenos excertos que ajudam o fiel a relaxar."
  },
  {
    "id": "t20.deuses.item.patua",
    "name": "Patuá",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 50",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Vários deuses artonianos ensinam seus devotos a fazer pequenos sacos contendo ervas, substâncias sagradas, pedaços de pergaminhos com orações e outros objetos minúsculos. Esses saquinhos são vestidos como amuletos, pendurados no pescoço, e protegem o devoto de todos os males. Se tiver uma devoção, você recebe redução de dano 2/mundano e resistência a magia +1."
  },
  {
    "id": "t20.deuses.item.texto_sagrado",
    "name": "Texto sagrado",
    "category": "equipamento",
    "subcategory": "Equipamento de Aventura",
    "cost": "T$ 60",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Todas as religiões de Arton têm um ou mais textos sagrados — escrituras, pará bolas, relatos históricos ou até mesmo diagramas que contêm os maiores valores da divindade e oferecem alento a seus fiéis em momentos de necessidade."
  },
  {
    "id": "t20.deuses.item.trombeta_do_cruzado",
    "name": "Trombeta do cruzado",
    "category": "ferramenta",
    "subcategory": "Ferramentas",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Esta trombeta santificada infunde energia divina nas criaturas que você convoca. Se estiver empunhando esta trombeta quando usa um poder concedido ou uma magia divina que convoca capangas (como Servos do Dragão ou Conjurar Mortos-vivos), o custo da habilidade é reduzido em –1 PM e os capangas convocados recebem +2 em rolagens de dano."
  },
  {
    "id": "t20.deuses.item.anel_eclesiastico",
    "name": "Anel eclesiástico",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 50",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Este anel é um símbolo da autoridade de um sacerdote. Pessoas comuns tendem a se impressionar com estes anéis, até mesmo se ajoelhando para beijá-los na mão de seus portadores. Se for um clérigo ou frade e estiver vestindo um anel eclesiástico, você recebe +1 em"
  },
  {
    "id": "t20.deuses.item.carcaca_do_predador_primal",
    "name": "Carcaça do predador primal",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 150",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Esta carcaça de um animal ou monstro é trabalhada na forma de uma capa ou manto. Quando adquire a forma de uma criatura selvagem (como pelo poder Forma Selvagem ou pela magia Metamorfose ), o bônus na Defesa concedido pela forma aumenta em +1."
  },
  {
    "id": "t20.deuses.item.garras_do_predador_primal",
    "name": "Garras do predador primal",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 300",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Estas garras de um animal ou monstro são trabalhadas na forma de um colar ou um par de braceletes. Quando adquire a forma de uma criatura selvagem (como pelo poder Forma Selvagem ou pela magia Metamorfose), você recebe +1 nas rolagens de dano com armas naturais."
  },
  {
    "id": "t20.deuses.item.habito_monastico",
    "name": "Hábito monástico",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 30",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Uma vestimenta simples, em geral de tecido cru, amarrada com um cinto de corda."
  },
  {
    "id": "t20.deuses.item.habito_sacerdotal",
    "name": "Hábito sacerdotal",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 30",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Para o sacerdote que dedica sua vida à fé, mas não de forma tão extrema quanto os monges, uma roupa mais atraente e confortável. A aparência desta batina varia muito de acordo com a religião do devoto, mas ela sempre concede +2 em testes de perícias baseadas em"
  },
  {
    "id": "t20.deuses.item.manto_de_alto_sacerdote",
    "name": "Manto de alto sacerdote",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Um manto longo com mangas, que cobre todo o corpo. Esta batina é ricamente adornada, feita de tecidos finos de alta qualidade, e tem mais em comum com as vestimentas de um nobre do que com o hábito de um frade. Se você possuir o poder Autoridade Eclesiástica, recebe +1 PM por patamar acima de iniciante (somente após um dia de uso)."
  },
  {
    "id": "t20.deuses.item.penas_do_predador_primal",
    "name": "Penas do predador primal",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 49,
    "description": "Estas penas de um animal ou monstro são costuradas como uma capa ou um capuz. Quando adquire a forma de uma criatura selvagem (como pelo poder Forma Selvagem ou pela magia Metamorfose), enquanto estiver nessa forma você recebe +2 em Atletismo e seu deslocamento aumenta em +3m."
  },
  {
    "id": "t20.deuses.item.piercing_de_umbigo",
    "name": "Piercing de umbigo",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 50",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Piercing de umbigo T$ 50 1 Sandálias T$ 9 1 Tonsura T$ 3 — Túnica do Virtuoso T$ 25 1 Esotéricos Afiador solar T$ 100 1 Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkari"
  },
  {
    "id": "t20.deuses.item.sandalias",
    "name": "Sandálias",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 9",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Sandálias T$ 9 1 Tonsura T$ 3 — Túnica do Virtuoso T$ 25 1 Esotéricos Afiador solar T$ 100 1 Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento"
  },
  {
    "id": "t20.deuses.item.tonsura",
    "name": "Tonsura",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Tonsura T$ 3 — Túnica do Virtuoso T$ 25 1 Esotéricos Afiador solar T$ 100 1 Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$"
  },
  {
    "id": "t20.deuses.item.tunica_do_virtuoso",
    "name": "Túnica do Virtuoso",
    "category": "vestuario",
    "subcategory": "Vestuário",
    "cost": "T$ 25",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Túnica do Virtuoso T$ 25 1 Esotéricos Afiador solar T$ 100 1 Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia"
  },
  {
    "id": "t20.deuses.item.afiador_solar",
    "name": "Afiador solar",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Afiador solar T$ 100 1 Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 —"
  },
  {
    "id": "t20.deuses.item.baculo_da_retribuicao",
    "name": "Báculo da retribuição",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 200",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Báculo da retribuição T$ 200 1 Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerai"
  },
  {
    "id": "t20.deuses.item.contas_de_oracao",
    "name": "Contas de oração",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 500",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Contas de oração T$ 500 1 Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.estola",
    "name": "Estola",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 150",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Estola T$ 150 1 Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.frasco_purificador",
    "name": "Frasco purificador",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Frasco purificador T$ 100 1 Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.medalhao_afiado",
    "name": "Medalhão afiado",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 900",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Medalhão afiado T$ 900 1 Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.ostensorio_santificado",
    "name": "Ostensório santificado",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 750",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Ostensório santificado T$ 750 1 Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.rede_de_almas",
    "name": "Rede de almas",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 600",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Rede de almas T$ 600 1 Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.turibulo_ungido",
    "name": "Turíbulo ungido",
    "category": "esoterico",
    "subcategory": "Esotéricos",
    "cost": "T$ 100",
    "spaces": 1.0,
    "sourcePage": 50,
    "description": "Turíbulo ungido T$ 100 1 Item Preço Espaços Item Preço Espaços Alquímicos — Preparados Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.granada_redentora",
    "name": "Granada redentora",
    "category": "alquimico",
    "subcategory": "Alquímicos — Preparados",
    "cost": "T$ 60",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Granada redentora T$ 60 0,5 Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.santa_granada_de_mao",
    "name": "Santa granada de mão",
    "category": "alquimico",
    "subcategory": "Alquímicos — Preparados",
    "cost": "T$ 150",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Santa granada de mão T$ 150 0,5 Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.incenso",
    "name": "Incenso",
    "category": "alquimico",
    "subcategory": "Alquímicos — Preparados",
    "cost": "T$ 12",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Incenso T$ 12 0,5 Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.lucidilico",
    "name": "Lucidílico",
    "category": "alquimico",
    "subcategory": "Alquímicos — Preparados",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Lucidílico T$ 30 0,5 Alquímicos — Catalisadores Água benta T$ 10 0,5 Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.agua_benta",
    "name": "Água benta",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 10",
    "spaces": 0.5,
    "sourcePage": 48,
    "description": "Criada com os mais puros ingredientes, esta água funciona como água benta (Tormenta20, p. 155), mas causa 4d10 pontos de dano. É fabricada com o mesmo aprimoramento de Abençoar Alimentos, mas seu componente material custa T$ 30."
  },
  {
    "id": "t20.deuses.item.favo_de_mel",
    "name": "Favo de mel",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Favo de mel T$ 30 0,5 Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.fitilho_consagrado",
    "name": "Fitilho consagrado",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Fitilho consagrado T$ 30 0,5 Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.flor_de_orlyn",
    "name": "Flor de orlyn",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Flor de orlyn T$ 30 0,5 Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.lantejoula",
    "name": "Lantejoula",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Lantejoula T$ 30 0,5 Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.frasco_de_luz",
    "name": "Frasco de luz",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Frasco de luz T$ 30 0,5 Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.pena_de_anjo",
    "name": "Pena de anjo",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Pena de anjo T$ 30 0,5 Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.pedra_de_sombras",
    "name": "Pedra de sombras",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 30",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Pedra de sombras T$ 30 0,5 Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.vela_eclesiastica",
    "name": "Vela eclesiástica",
    "category": "alquimico",
    "subcategory": "Alquímicos — Catalisadores",
    "cost": "T$ 60",
    "spaces": 0.5,
    "sourcePage": 50,
    "description": "Vela eclesiástica T$ 60 0,5 Alimentação Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.abraco_da_noite",
    "name": "Abraço da noite",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Abraço da noite T$ 3 — Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.assado_de_entranhas",
    "name": "Assado de entranhas",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 2",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Assado de entranhas T$ 2 — Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.bencao_dos_mares",
    "name": "Bênção dos mares",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 4",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Bênção dos mares T$ 4 — Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.bolinho_de_jade",
    "name": "Bolinho de jade",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 4",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Bolinho de jade T$ 4 — Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.bombas_de_saber",
    "name": "Bombas de saber",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 4",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Bombas de saber T$ 4 — Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.caldo_de_lena",
    "name": "Caldo de Lena",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Caldo de Lena T$ 3 — Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.coragem_de_sangue",
    "name": "Coragem de sangue",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 4",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Coragem de sangue T$ 4 — Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.deleite_magico",
    "name": "Deleite mágico",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 18",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Deleite mágico T$ 18 — Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.frescor_de_nimb",
    "name": "Frescor de Nimb",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 1",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Frescor de Nimb T$ 1 — Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.joia_do_deserto",
    "name": "Joia do deserto",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 5",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Joia do deserto T$ 5 — Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.justos_de_khalmyr",
    "name": "Justos de Khalmyr",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 2",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Justos de Khalmyr T$ 2 — Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.justos_virtuosos",
    "name": "Justos virtuosos",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 6",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Justos virtuosos T$ 6 — Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.manjar_da_paz",
    "name": "Manjar da paz",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 7",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Manjar da paz T$ 7 — Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.ouro_de_dragao",
    "name": "Ouro de dragão",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 6",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Ouro de dragão T$ 6 — Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.ovos_de_raposa",
    "name": "Ovos de raposa",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Ovos de raposa T$ 3 — Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.pao_de_thwor",
    "name": "Pão de Thwor",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 1",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Pão de Thwor T$ 1 — Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.presente_da_terra",
    "name": "Presente da terra",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Presente da terra T$ 3 — Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.renascer_gentil",
    "name": "Renascer gentil",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 30",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Renascer gentil T$ 30 — Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.sufle_rubro",
    "name": "Suflê rubro",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 3",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Suflê rubro T$ 3 — Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.tesouro_de_valkaria",
    "name": "Tesouro de Valkaria",
    "category": "alimentacao",
    "subcategory": "Alimentação",
    "cost": "T$ 2",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Tesouro de Valkaria T$ 2 — Serviços Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.casamento_por_pessoa",
    "name": "Casamento (por pessoa)",
    "category": "servico",
    "subcategory": "Serviços",
    "cost": "T$ 150",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Casamento (por pessoa) T$ 150 — Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.cerimonia_religiosa",
    "name": "Cerimônia religiosa",
    "category": "servico",
    "subcategory": "Serviços",
    "cost": "T$ 20",
    "spaces": 0,
    "sourcePage": 50,
    "description": "Cerimônia religiosa T$ 20 — Sacramento T$ 50 — Tabela 1-3: Itens Gerais"
  },
  {
    "id": "t20.deuses.item.sacramento",
    "name": "Sacramento",
    "category": "servico",
    "subcategory": "Serviços",
    "cost": "T$ 50",
    "spaces": 0,
    "sourcePage": 49,
    "description": "O efeito de sua habilidade Canalizar Energia aumenta em +1d6. Uma férula pode ser usada como arma, com as estatísticas de uma maça. Panfleto de Aforismos. Às vezes as religiões artonianas contam com tomos de fácil leitura, sem conteúdo pesado — apenas citações motivadoras, conselhos simples, dicas de exercícios de respiração e pequenos excertos que ajudam o fiel a relaxar."
  },
  {
    "id": "t20.deuses.liturgico.cilicio_vivo",
    "name": "Cilício Vivo",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Aharadak",
    "deityId": "aharadak",
    "cost": "T$ 37.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Esta cinta de couro possui anzóis enferrujados e afiados. Para usar o cilício vivo, você deve amarrá-lo em sua coxa ou braço (ele conta como um item vestido), de forma a cravar os anzóis em sua carne. O cilício então bebe de seu sangue, adquirindo uma consistência úmida e pulsante. Isso reduz seus PV máximos em 1 por nível. Porém, a dor constante o mantém vigilante, fornecendo um bônus de +1 em todos os seus testes (cumulativo com outros bônus de itens). Se você for um devoto de Aharadak, o bônus aumenta para +2. Se for um devoto de Aharadak de patamar campeão ou superior, o cilício vivo também aumenta seus PM máximos em +1 por nível. Acessório maior, preço T$ 37.000."
  },
  {
    "id": "t20.deuses.liturgico.coracao_corrompido",
    "name": "Coração Corrompido",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Aharadak",
    "deityId": "aharadak",
    "cost": "T$ 45.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Este pequeno baú de madeira esconde um coração cinzento e ressequido. Se um devoto de Aharadak matar uma criatura inteligente e derramar um pouco do sangue dela no coração, ele volta à “vida”, ficando vermelho e pulsante. Enquanto o coração corrompido estiver vivo, qualquer dano ou condição causado ao devoto será absorvido pelo item. O coração pode absorver até 100 pontos de dano e três condições. Quando isso acontecer, volta ao seu estado “morto”... até um novo sacrifício ser feito. O devoto não precisa estar em posse do coração para o efeito funcionar, apenas saber onde ele está. Isso significa que o devoto pode deixar o item escondido, mas, claro, quanto mais longe ele estiver, mais difícil será “revivê-lo” se necessário. Acessório maior, T$ 45.000."
  },
  {
    "id": "t20.deuses.liturgico.coroa_de_flores",
    "name": "Coroa de Flores",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Allihanna",
    "deityId": "allihanna",
    "cost": "T$ 9.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Este adereço é feito com ramos verdejantes e flores brancas, rosas, amarelas e lilases e, abençoado pela magia da natureza, permanece sempre vistoso. Se você for um devoto de Allihanna e vestir a coroa de flores, recebe +1 em Sabedoria (apenas após 1 dia de uso) e suas magias com efeitos numéricos variáveis recebem um bônus de +1 por dado (por exemplo, Curar Ferimentos lançada para curar 4d8+4 PV irá curar 4d8+8 PV). Acessório menor, preço T$ 9.000."
  },
  {
    "id": "t20.deuses.liturgico.cajado_das_matas",
    "name": "Cajado das Matas",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Allihanna",
    "deityId": "allihanna",
    "cost": "T$ 27.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Este bordão é feito com galhos retorcidos e trançados com couro. Se você for devoto de Allihanna, ele se torna um bordão formidável e, enquanto você estiver ao ar livre e pisando sobre terra, fornece +2 na Defesa (cumulativo com outros bônus de itens). Se for um devoto de patamar campeão ou superior, a arma se torna um bordão magnífico. Arma específica menor, preço T$ 27.000."
  },
  {
    "id": "t20.deuses.liturgico.tapecaria_da_guerra",
    "name": "Tapeçaria da Guerra",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Arsenal",
    "deityId": "arsenal",
    "cost": "T$ 35.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Esta tapeçaria velha e manchada de sangue mostra um campo de batalha, com imagens representando terreno, tropas e objetivos. Analisar a tapeçaria aguça a sua percepção estratégica — ela funciona como uma ferramenta aprimorada, fornecendo +2 em Guerra. Se você for um devoto de Arsenal, estiver em combate e gastar uma ação completa para analisar a tapeçaria, a magia do item se revela, com as imagens se movendo para representar a batalha na qual você está. Como parte da ação completa, você faz um teste de Guerra (CD 20). Se você passar, o bônus em Guerra se estende para todos os testes de perícia, seus e de seus aliados em alcance curto, até o fim da cena. Se passar por 20 ou mais (ou seja, se somar 40 ou mais no teste de Guerra), você e seus aliados em alcance curto recebem uma ação padrão adicional, cada um em seu próximo turno (apenas uma vez por cena). Analisar a tapeçaria requer as duas mãos. Acessório maior, preço T$ 35.000."
  },
  {
    "id": "t20.deuses.liturgico.machado_da_bravura",
    "name": "Machado da Bravura",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Arsenal",
    "deityId": "arsenal",
    "cost": "T$ 25.000",
    "spaces": 1,
    "sourcePage": 55,
    "description": "Este machado de batalha certeiro e cruel tem cabo de madeira marrom escura com um reforço de metal nas laterais e lâmina única, feita de aço com muitos entalhes representando batalhas e monstros. Itens Litúrgicos Se você for um devoto de Arsenal, ele se torna um machado de batalha certeiro cruel formidável. Sempre que você fizer uma investida, recebe 1 PM temporário cumulativo. Você pode ganhar um número máximo de PM temporários por dia igual a sua Sabedoria. Arma específica menor, preço T$ 25.000."
  },
  {
    "id": "t20.deuses.liturgico.alfange_dourado",
    "name": "Alfange Dourado",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Azgher",
    "deityId": "azgher",
    "cost": "T$ 36.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "A lâmina deste alfange maciço é feita de ouro alquimicamente tratado para ser duro como aço. Isso o torna muito pesado (–2 em testes de ataque), mas muda seu dano base para 2d6. Se você for um devoto de Azgher, pode gastar uma ação completa para entoar palavras sagradas e encostar ouro (itens ou tibares) na lâmina do alfange dourado. Se fizer isso, o ouro derrete e a arma brilha com energia mágica. Até o fim do dia, o alfange dourado perde sua penalidade em testes de ataque e recebe um bônus em testes de ataque e rolagens de dano de acordo com o sacrifício: bônus de +2 para T$ 10, +3 para T$ 100, +4 para T$ 500 e +5 para T$ 1.000. Arma específica média, preço T$ 36.000."
  },
  {
    "id": "t20.deuses.liturgico.cimitarra_solar",
    "name": "Cimitarra Solar",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Azgher",
    "deityId": "azgher",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Esta cimitarra pungente tem cabo de marfim e lâmina de aço reluzente. Quando reflete a luz do sol, o aço tem um brilho dourado. Se você for um devoto de Azgher, a arma se torna uma cimitarra pungente flamejante formidável. Sob a luz do sol, a cimitarra reluz mais forte, com um brilho dourado, e aumenta o dano da bola de fogo que dispara (pelo encanto flamejante) para 12d6. Se você for de patamar campeão ou superior, a arma se torna uma cimitarra precisa flamejante magnífica. Arma específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.adaga_sorrateira",
    "name": "Adaga Sorrateira",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Hyninn",
    "deityId": "hyninn",
    "cost": "T$ 22.500",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Esta adaga é feita do que parece ser metal enferrujado. Se você for um devoto de Hyninn, ela se torna uma adaga formidável. Além disso, na primeira vez em que você passar em um teste de Enganação ou Furtividade em cada cena, você recebe +5 em um teste ou rolagem a sua escolha até o fim da cena (cumulativo com outros bônus de itens). Se você for de patamar campeão ou superior, a arma se torna uma adaga magnífica. Arma específica menor, preço T$ 22.500."
  },
  {
    "id": "t20.deuses.liturgico.cubo_armadilha",
    "name": "Cubo Armadilha",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Hyninn",
    "deityId": "hyninn",
    "cost": "T$ 25.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Este pequeno cubo de metal possui diversos botões em sua superfície, mas se você apertá-los nada acontece… Exceto se você for um devoto de Hyninn. Um devoto da Trapaça pode gastar uma ação padrão para apertar os botões e escolher um espaço desocupado em alcance curto. O cubo então flutua até esse espaço e desaparece, ficando invisível e intangível. O primeiro inimigo que entrar nesse espaço é atingido por diversas serras e lâminas que surgem do nada, sofrendo 10d8 pontos de dano de corte (Ref CD Int reduz à metade). Para cada dado de dano que rolar um resultado mínimo ou máximo (ou seja, “1” ou “8”), role 1d8 extra, repetindo o processo a cada resultado mínimo ou máximo. O cubo então reaparece e flutua para seu dono (se ele estiver até alcance longo) ou fica parado no chão (se ele estiver mais longe do que isso). Uma criatura que veja o cubo armadilha sendo ativado pode simplesmente evitar o espaço para onde ele foi, de modo que este item funciona melhor quando usado com preparação. Além disso, uma criatura que procure por armadilhas tem direito a um teste de Investigação (CD 30 + Int do usuário). Se passar, percebe a forma etérea do cubo e pode passar por ele sem ativá-lo (embora não consiga desarmá-lo ou pegá-lo). Se passar e for devota de Hyninn, o cubo reaparece e flutua para ela, adotando-a como nova dona! Acessório médio, preço T$ 25.000."
  },
  {
    "id": "t20.deuses.liturgico.lanca_da_dominacao",
    "name": "Lança da Dominação",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Kallyadranoch",
    "deityId": "kallyadranoch",
    "cost": "T$ 45.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Esta lança maciça é feita de uma única haste de metal cinza escuro, e tem um tênue brilho alaranjado. Se você for um devoto de Kallyadranoch, torna-se uma lança maciça que fornece +1 em testes de ataque e rolagens de dano e, a cada acerto, causa +1d10 pontos de dano de ácido, eletricidade, fogo ou frio (a escolha do usuário a cada golpe). Cada vez que você sobe de nível enquanto estiver com a lança, os bônus que ela fornece em ataque e dano aumentam em +1 (até um máximo de +6). Entretanto, a cada mês que você passar separado da lança da dominação, os bônus dela diminuem em –1 (até um mínimo de +1). Arma específica média, preço T$ 45.000."
  },
  {
    "id": "t20.deuses.liturgico.ossos_draconicos",
    "name": "Ossos Dracônicos",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Kallyadranoch",
    "deityId": "kallyadranoch",
    "cost": "T$ 90.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Este item possui a forma de um acessório — como um colar, máscara, colete ou par de brincos — feito de ossos especialmente densos e duros. Qualquer um que toque nos ossos dracônicos sente que eles emanam uma tênue energia — calor, frio, estática ou outra, conforme a natureza do dragão a partir do qual foram feitos. A energia é desconfortável, mas não a ponto de causar dano ou impor qualquer penalidade. Se forem vestidos, os ossos dracônicos fornecem +4 em Intimidação e –2 em Diplomacia. Se forem vestidos por um devoto de Kallyadranoch, emprestam o poder armazenado neles, fornecendo também +2 em Força, +2 em Carisma e +2 na CD de todas as habilidades do devoto. Acessório maior, preço T$ 90.000."
  },
  {
    "id": "t20.deuses.liturgico.espada_monastica",
    "name": "Espada Monástica",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Khalmyr",
    "deityId": "khalmyr",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta espada longa certeira possui lâmina de aço reluzente e cabo de ouro com orações ao Deus da Justiça inscritas. Se você for um devoto de Khalmyr e estiver empunhando a espada monástica, pode gastar uma ação de movimento para ler um dos versículos inscritos nela e fazer um teste de Religião (CD 20). Se passar, a arma se torna formidável. Se passar por 10 ou mais, ela gera o efeito básico de Oração. Se passar por 20 ou mais, a arma se torna magnífica. Estes efeitos duram até o fim da cena. Arma específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.armadura_do_julgamento",
    "name": "Armadura do Julgamento",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Khalmyr",
    "deityId": "khalmyr",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta armadura completa polida reforçada é feita de aço reluzente quase tão reflexivo quanto um espelho. Se você for um devoto de Khalmyr, ela se torna uma armadura completa polida reforçada defensora. Sempre que uma criatura atacá-lo, você pode gastar 2 PM para fazê-la ver seus pecados refletidos na armadura. A criatura fica pasma por 1 rodada (apenas uma vez por cena) e frustrada (Von CD Sab reduz para apenas frustra da). Note que a penalidade em testes mentais imposta pela frustração pode tornar mais fácil convencer a criatura a abandonar a luta através de Diplomacia ou outros efeitos que exijam testes de Vontade — um caminho digno para devotos do Deus da Justiça que queiram julgar seus inimigos em vez de apenas exe cutá-los sumariamente! Se você for um devoto de patamar campeão ou superior, a armadura se torna uma armadura completa polida reforçada guardiã. Armadura específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.caldeirao_da_vida",
    "name": "Caldeirão da Vida",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Lena",
    "deityId": "lena",
    "cost": "T$ 25.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta grande panela de ferro é abençoada com o poder de Lena, e permite preparar refeições únicas. Para isso, você precisa gastar 1 hora, T$ 5 e fazer um teste de Ofício (cozinheiro) contra CD 15. Se você passar, faz comida suficiente para até 5 criaturas Médias ou Pequenas (uma criatura Minúscula come o equivalente à metade de uma criatura Média, uma criatura Grande ou Enorme come o dobro e uma criatura Colossal come o quádruplo). Todos que se alimentarem dela recebem +2 nos testes de resistência por um dia e, se forem devotos de Lena, recebem também 10 PV temporários. Também é possível preparar um prato especial no caldeirão. Nesse caso, faça um único teste de Ofício (cozinheiro) com a CD do prato especial +5 e some o custo da comida do caldeirão ao do prato especial. Se você passar, os benefícios do prato se acumulam com os da comida do caldeirão. Acessório médio, preço T$ 25.000."
  },
  {
    "id": "t20.deuses.liturgico.alabarda_da_coragem",
    "name": "Alabarda da Coragem",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Lin-Wu",
    "deityId": "lin-wu",
    "cost": "T$ 36.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta alabarda certeira precisa possui fitas decorativas que dançam como a cauda de um dragão quando ela é usada em batalha. Se você for um devoto de Lin-Wu, ela se torna uma alabarda certeira precisa formidável que fornece +5 em Iniciativa. Sempre que você for o primeiro a agir em um combate, recebe 2 PM temporários por nível, que duram até o fim da cena. Arma específica média, preço T$ 36.000."
  },
  {
    "id": "t20.deuses.liturgico.katana_da_determinacao",
    "name": "Katana da Determinação",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Lin-Wu",
    "deityId": "lin-wu",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta katana precisa e pungente é feita de aço tamuraniano e tem cabo coberto de tiras de couro trançadas. A lâmina tem coloração avermelhada, sinal de Lin-Wu para que seus devotos nunca se esqueçam da tragédia que se abateu sobre seu povo. Se você for um devoto de Lin-Wu, a arma se torna uma katana precisa pungente formidável que ignora a imunidade a acertos críticos de lefeu. Sempre que você derrotar um lefeu com a katana, cura 2d8+2 PV e recebe +2 nas rolagens de dano (cumulativo com esse efeito e de outros itens) até o fim da cena. Se você for um devoto de patamar campeão ou superior, ela se torna uma katana precisa pungente magnífica. Arma específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.instrumento_da_alegria",
    "name": "Instrumento da Alegria",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Marah",
    "deityId": "marah",
    "cost": "T$ 10.500",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Um instrumento musical comum, como um bandolim, flauta ou tambor, aprimorado (+1 em Atuação). Se você for treinado em Atuação e estiver empunhando o instrumento da alegria, pode gastar uma ação padrão e 1 PM para tocar uma música envolvente, que fornece +2 em testes de perícia para você e seus aliados em alcance médio até o fim da cena (cumulativo com outros bônus de itens). Se você for devoto de Marah e usar um poder de Música, pode ativar o efeito do item com uma ação livre. Acessório médio, preço T$ 10.500."
  },
  {
    "id": "t20.deuses.liturgico.veu_diafano",
    "name": "Véu Diáfano",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Marah",
    "deityId": "marah",
    "cost": "T$ 13.500",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Esta roupa leve e semitransparente conta como uma veste de seda aprimorada. Se você for um devoto de Marah, o véu diáfano torna sua aparência misteriosa e sedutora, fornecendo +1 em Carisma (apenas após 1 dia de uso) e +2 na Defesa (cumulativo com outros bônus de itens). Acessório médio, preço T$ 13.500."
  },
  {
    "id": "t20.deuses.liturgico.colar_de_presas",
    "name": "Colar de Presas",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Megalokk",
    "deityId": "megalokk",
    "cost": "T$ 21.000",
    "spaces": 1,
    "sourcePage": 57,
    "description": "Este adereço é feito com dentes e garras de monstros unidos por tendões. Se for vestido, fornece +2 em Intimidação, mas impõe –2 em Diplomacia. Mais do que isso, carrega em seu âmago o instinto brutal das feras e, se você for um devoto de Megalokk, fornece também +2 em testes de ataque e rolagens de dano com armas naturais. Acessório médio, preço T$ 21.000."
  },
  {
    "id": "t20.deuses.liturgico.maca_monstruosa",
    "name": "Maça Monstruosa",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Megalokk",
    "deityId": "megalokk",
    "cost": "T$ 27.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Esta maça atroz é feita de rocha vulcânica pontiaguda e afiada. Se você for um devoto de Megalokk, ela se torna uma arma formidável e seu dano aumenta em dois passos. Se você for de patamar campeão ou superior, seu dano aumenta em mais dois passos (para um total de quatro). Arma específica menor, preço T$ 27.000. Alguma Coisa de Nimb... Uma frigideira. Um salame. Uma pluma de avestruz prateada. Todos esses objetos, e quaisquer ou tros, podem ser itens litúrgicos de Nimb. Esse itens só aparecem para devotos do Caos e sempre em momentos inesperados. O devoto sabe instintivamente que a adaga na bota do guarda, a espiga de milho caída no campo ou a panela do cozinheiro goblin é um item sagrado de seu deus. Nas mãos de um devoto de Nimb, o item funciona como uma arma corpo a corpo simples de uma mão formidável veloz. Independente da forma do item, causa 3d8 pontos de dano (se neces sário, role 1d3 para cada ataque, sendo 1 = corte, 2 = impacto e 3 = perfuração), com crítico x2. Quando faz um ataque com o item litúrgico, você pode gastar 1 PM. Se fizer isso e acertar, para cada resultado ímpar que rolar em um dado de dano, rola um dado extra de dano do mesmo tipo, repetindo o processo a cada resultado ímpar. Arma específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.jarro_das_profundezas",
    "name": "Jarro das Profundezas",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Oceano",
    "deityId": "oceano",
    "cost": "T$ 9.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Este vaso de madrepérola é coberto de imagens de animais marítimos. Se você for um devoto do Oceano e estiver empunhando o jarro das profundezas, pode gastar uma ação padrão e PM para gerar alguns efeitos. Por 1 PM, cria 2 litros de água salgada. Essa água não pode ser bebida pela maioria dos seres, mas serve para cumprir suas Obrigações & Restrições de se manter em contato com o mar. Também por 1 PM, dispara uma onda de água que se derrama em um cone de 6m à sua frente e derruba quaisquer criaturas na área (Ref CD Sab evita). Por fim, por 2 PM você invoca um elemental da água que atua como um parceiro destruidor (dano de frio) ou guardião veterano até o fim da cena. Acessório menor, preço T$ 9.000."
  },
  {
    "id": "t20.deuses.liturgico.tridente_aquoso",
    "name": "Tridente Aquoso",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Oceano",
    "deityId": "oceano",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Este tridente pungente é feito de coral azulado, e suas três pontas emanam uma tênue névoa gelada. Se você for um devoto do Oceano, ele se torna um tridente pungente congelante formidável. Se o tridente aquoso for mergulhado em água (exige uma ação de movimento e um reservatório de água grande o suficiente, como uma tina, cocho, banheira, rio…), torna-se magnífico até o fim da cena. Arma específica média, preço T$ 54.000."
  },
  {
    "id": "t20.deuses.liturgico.adaga_ofidica",
    "name": "Adaga Ofídica",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Sszzaas",
    "deityId": "sszzaas",
    "cost": "T$ 36.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Esta adaga cruel é feita da presa de uma serpente gigantesca. Possui um compartimento oco no cabo com veneno (peçonha concentrada) que é magica mente reposto a cada golpe. Se você for um devoto de Sszzaas, ela se torna uma adaga cruel formidável que ignora qualquer resistência ou imunidade a veneno de uma criatura atingida. Se você for de patamar campeão ou superior, o veneno vira peçonha potente. Arma específica média, preço T$ 36.000."
  },
  {
    "id": "t20.deuses.liturgico.bordao_sabichao",
    "name": "Bordão Sabichão",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Tanna-Toh",
    "deityId": "tanna-toh",
    "cost": "T$ 72.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Este bordão maciço é feito de metal e cravejado de gemas, todas da mesma cor (cada cajado individual tem sua cor). Se você for um devoto de Tanna-Toh, ele se torna um bordão maciço formidável piedoso . Além disso, sempre que você faz um teste de perícia, pode gastar 2 PM. Nesse caso, o item sussurra um conselho ou lembrete, permitindo que você some sua Sabedoria ao teste. Arma específica maior, preço T$ 72.000."
  },
  {
    "id": "t20.deuses.liturgico.escrivaninha_consagrada",
    "name": "Escrivaninha Consagrada",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Tanna-Toh",
    "deityId": "tanna-toh",
    "cost": "T$ 9.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Esta caixa de madeira repleta de dobradiças possui o símbolo de Tanna-Toh pintado na tampa. Ela pode ser aberta e desdobrada para virar uma escrivaninha portátil, útil para aventureiros que querem ter um espaço para ler e escrever mesmo nos ermos. Se você for um devoto da Deusa do Conhecimento e usar a escrivaninha consagrada para estudar por 1 hora, dobra seu bônus de treinamento em uma perícia baseada em Int ou Sab a sua escolha por 1 dia. Além disso, caso possa fabricar pergaminhos, uma vez por aventura recebe 1d3 pergaminhos que poderia ter criado. Considere que você escreveu esses pergaminhos durante seu tempo livre. A escrivaninha consagrada ocupa 2 espaços. Acessório menor, preço T$ 9.000."
  },
  {
    "id": "t20.deuses.liturgico.vestido_noturno",
    "name": "Vestido Noturno",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Tenebra",
    "deityId": "tenebra",
    "cost": "T$ 21.000",
    "spaces": 1,
    "sourcePage": 58,
    "description": "Este vestido negro possui pequenos diamantes costurados em seu tecido, que cintilam como as estrelas do céu noturno. Conta como uma veste de seda aprimorada cravejada de gemas, fornecendo +2 em Enganação e Reflexos. Se você for um devoto de Tenebra e vestir este item, pode gastar uma ação padrão e 5 PM para ficar invisível até o fim da cena (recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques). Esse efeito termina se você fizer uma ação hostil direta contra uma criatura (para mais detalhes, veja a magia Invisibilidade). Acessório médio, preço T$ 21.000."
  },
  {
    "id": "t20.deuses.liturgico.machado_lamnoriano",
    "name": "Machado Lamnoriano",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Thwor",
    "deityId": "thwor",
    "cost": "T$ 22.500",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Este machado de guerra atroz possui cabo feito da madeira de árvores milenares, que nascem apenas no continente sul, e lâmina de aço regado pelo sangue dos incontáveis massacres que já ocorreram nessa terra bestial. Se você for um devoto de Thwor, ele se torna um machado de guerra atroz formidável. Sempre que você entrar em fúria, o machado lamnoriano se retorce e cresce, energizado pela sua raiva, e seu dano aumenta em um passo. Se você for de patamar campeão ou superior, o dano aumenta em mais um passo (dois passos ao todo). Arma específica menor, preço T$ 22.500."
  },
  {
    "id": "t20.deuses.liturgico.espada_imaculada",
    "name": "Espada Imaculada",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Thyatis",
    "deityId": "thyatis",
    "cost": "T$ 45.000",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Esta espada longa precisa tem cabo de aço tingido de vermelho vivo, com asas de pássaro servindo de guarda-mão. Se você for um devoto de Thyatis, ela se torna uma espada longa precisa formidável e você pode gastar 2 PM para fazer a lâmina dela se tornar plasma vermelho até o fim da cena. Nesse estado, o bônus de ataque da espada muda para +4 e seu dano aumenta em dois passos, muda para fogo não letal e ignora 20 pontos de redução de dano. Arma específica média, preço T$ 45.000."
  },
  {
    "id": "t20.deuses.liturgico.pira_postera",
    "name": "Pira Póstera",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Thyatis",
    "deityId": "thyatis",
    "cost": "T$ 15.000",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Esta pequena bacia de cerâmica negra possui linhas rajadas vermelhas. Se você for um devoto de Thyatis e estiver em posse da pira póstera, recebe +1 em Sabedoria (apenas após 1 dia de posse). Além disso, uma vez por dia pode enchê-la de água e olhar dentro dela para ter visões de possíveis perigos futuros. Uma vez até o fim do dia, quando faz um teste de Iniciativa, Percepção ou de resistência, você pode rolar novamente esse teste. Acessório médio, preço T$ 15.000."
  },
  {
    "id": "t20.deuses.liturgico.botas_inquietas",
    "name": "Botas Inquietas",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Valkaria",
    "deityId": "valkaria",
    "cost": "T$ 15.000",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Esse par de botas reforçadas é bastante surrado, com marcas dos diversos terrenos pelos quais já passou: carrapichos de florestas, manchas das águas escuras de pântanos, pequenos rasgos das pedras afiadas de montanhas… Se você for um devoto de Valkaria e vestir as botas inquietas, sente um grande desejo de viajar e desbravar o mundo — e a disposição para tal empreitada! Você recebe +1 em Constituição (apenas após 1 dia de uso) e +5 em testes de Fortitude para marcha forçada. Além disso, sempre que realizar uma investida durante um combate, recebe 1 PM temporário cumulativo (até um máximo de 3 PM por patamar por dia). Acessório médio, preço T$ 15.000."
  },
  {
    "id": "t20.deuses.liturgico.mangual_aventureiro",
    "name": "Mangual Aventureiro",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Valkaria",
    "deityId": "valkaria",
    "cost": "T$ 40.000",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Este mangual certeiro e cruel tem o cabo e a cabeça feitos de aço, interligados por uma corrente folheada a ouro. Se você for um devoto de Valkaria, ele se torna um mangual dançarino formidável. Se você estiver lutando em um lugar no qual nunca esteve antes, o dano do mangual aventureiro aumenta em dois passos. Arma específica média, preço T$ 40.000."
  },
  {
    "id": "t20.deuses.liturgico.argolas_misticas",
    "name": "Argolas Místicas",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Wynna",
    "deityId": "wynna",
    "cost": "T$ 25.500",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Esta peculiar peça de vestuário consiste de tiras de couro cru conectadas por pequenas argolas metálicas. O conjunto é costurado, tratado com óleos alquímicos e abençoado por louvores a Wynna. Teria sido criada por arcanistas élficos da antiga Lenórienn inspirados por visões da própria Deusa da Magia, que usaria uma indumentária parecida. Seja qual for sua origem, as argolas místicas geram um efeito espantoso. Quando um devoto de Wynna lança uma magia, a energia flui pelas tiras (que funcionam como canais) em direção às argolas (que funcionam como um tipo de ímã místico), acumulando-se nelas. Normalmente, quando um arcanista conjura um feitiço, quantidades residuais da mana canalizada se dissipam na natureza. As argolas impedem isso, potencializando o esforço do conjurador. Em termos de regras, se você estiver vestindo as argolas místicas, for um devoto de Wynna e lançar uma magia, recebe +2 PM para gastar em aprimoramentos. Esses PM podem ultrapassar o limite de gasto de mana do devoto. As argolas podem ser usadas sobre outras roupas (respeitando-se o limite de quatro itens vestidos), mas sabe-se de pelo menos uma famosa arquimaga élfica que vestia apenas elas. Na época, ninguém acreditava quando a elfa explicava a função da peça, mas talvez ela estivesse falando a verdade o tempo inteiro. Acessório médio, preço T$ 25.500."
  },
  {
    "id": "t20.deuses.liturgico.varinha_da_generosidade",
    "name": "Varinha da Generosidade",
    "category": "liturgico",
    "itemType": "Acessório",
    "deity": "Wynna",
    "deityId": "wynna",
    "cost": "T$ 30.000",
    "spaces": 1,
    "sourcePage": 59,
    "description": "Esta varinha arcana poderosa de madeira Tollon tem várias runas que emanam um brilho púrpura quando encontram a luz da lua. Se você for um devoto de Wynna, a varinha gera um campo de força que fornece redução de dano 5. Além disso, sempre que você lança uma magia, a mana usada na conjuração flui através da varinha para um aliado em alcance curto a sua escolha. Esse aliado recebe 1 PM temporário por círculo da magia lançada (limitado pelo total de PM gastos na magia). Cada aliado só pode receber mana de uma varinha da generosidade uma vez por dia. Acessório médio, preço T$ 30.000."
  },
  {
    "id": "t20.deuses.liturgico.alguma_coisa_de_nimb",
    "name": "Alguma Coisa de Nimb",
    "category": "liturgico",
    "itemType": "Arma",
    "deity": "Nimb",
    "deityId": "nimb",
    "cost": "T$ 54.000",
    "spaces": 1,
    "sourcePage": 56,
    "description": "Uma frigideira. Um salame. Uma pluma de avestruz prateada. Todos esses objetos, e quaisquer ou tros, podem ser itens litúrgicos de Nimb. Esse itens só aparecem para devotos do Caos e sempre em momentos inesperados. O devoto sabe instintivamente que a adaga na bota do guarda, a espiga de milho caída no campo ou a panela do cozinheiro goblin é um item sagrado de seu deus. Nas mãos de um devoto de Nimb, o item funciona como uma arma corpo a corpo simples de uma mão formidável veloz. Independente da forma do item, causa 3d8 pontos de dano (se neces sário, role 1d3 para cada ataque, sendo 1 = corte, 2 = impacto e 3 = perfuração), com crítico x2. Quando faz um ataque com o item litúrgico, você pode gastar 1 PM. Se fizer isso e acertar, para cada resultado ímpar que rolar em um dado de dano, rola um dado extra de dano do mesmo tipo, repetindo o processo a cada resultado ímpar. Arma específica média, preço T$ 54.000. Jarro das Profundezas Oceano Este vaso de madrepérola é coberto de imagens de animais marítimos. Se você for um devoto do Oceano e estiver empunhando o jarro das profundezas, pode gastar uma ação padrão e PM para gerar alguns efeitos. Por"
  }
];
