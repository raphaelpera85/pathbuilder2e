/**
 * Seção "Descrições Expandidas de Perícias" do D&D 3.5 — O Livro Completo
 * do Aventureiro (ed. BR), Capítulo 3 "Perícias e Talentos" (pp.95-??).
 * Complementa (não substitui) as descrições de perícias do Livro do
 * Jogador com usos novos. Transcrição por leitura visual direta de
 * páginas renderizadas em alta resolução (150-200dpi) — fonte é scan
 * sem camada de texto.
 *
 * COBERTURA COMPLETA (pp.96-103): 18 perícias com usos expandidos
 * nomeados: Abrir Fechaduras, Acrobacia, Adestrar Animais (completo, 17
 * truques/regras), Arte da Fuga, Avaliação, Cura, Decifrar Escrita,
 * Diplomacia (Pechinchar), Equilíbrio, Escalar, Esconder-se,
 * Falsificação, Natação, Ofícios (Criação Rápida + regras de Ofícios-
 * Venenos), Operar Mecanismo, Sentir Motivação, Sobrevivência, Usar
 * Cordas. Confirmado completo por leitura da p.103: a seção "Perícias"
 * termina com Sobrevivência/Usar Cordas, imediatamente seguida da
 * seção "TALENTOS" (novo capítulo de conteúdo, catalogado em arquivo
 * separado). Gap documentado: "Mediar" (Diplomacia, pp.99-100) tem a
 * frase de transição entre páginas cortada no recorte — não codificado
 * para não arriscar invenção na junção do texto. Nota: a p.101 também
 * traz a Tabela 3-1 "CDs para Ofícios (Venenos)" com 29 venenos
 * nomeados (CD criar/resistir, dano inicial/secundário) — avaliada como
 * possível catálogo futuro separado (itens/substâncias, fora do escopo
 * de "perícia nomeada" desta seção), não codificada aqui.
 */
export type AdvSkillAddition = {
  id: string;
  skillName: string;
  page: number;
  intro: string;
  entries: { title: string; text: string }[];
};

export const ADV_SKILL_ADDITIONS: AdvSkillAddition[] = [
  {
    id: "adv-skill-abrir-fechaduras",
    skillName: "Abrir Fechaduras (Des)",
    page: 97,
    intro:
      "É possível acelerar a tentativa de Abrir Fechaduras, reduzindo o tempo necessário para o procedimento.",
    entries: [
      {
        title: "Destrancar Acelerado",
        text: "O personagem é capaz de abrir uma fechadura mais rapidamente que o normal. Para reduzir o tempo necessário para abrir uma fechadura a uma ação de movimento, acrescente 20 à CD. Por exemplo, uma fechadura que geralmente exige um teste com CD 25 e uma ação de rodada completa exige um teste com CD 45 para ser aberta com uma ação de movimento.",
      },
    ],
  },
  {
    id: "adv-skill-acrobacia",
    skillName: "Acrobacia (Des; penalidade de armadura)",
    page: 97,
    intro:
      "O personagem é capaz de cair de alturas significativas sem sofrer dano, ser mais rápido do que o normal ao realizar acrobacias enquanto corre.",
    entries: [
      {
        title: "Erguer-se Livremente",
        text: "Com um teste de Acrobacia (CD 35), o personagem pode se levantar do chão estando caído sem usar sua ação de movimento (em vez de usar a ação livre de levantar-se padrão). Esse uso da perícia provoca ataques de oportunidade normalmente.",
      },
      {
        title: "Ignorar Dano de Queda",
        text: "Para cada 10 pontos do resultado do teste de Acrobacia acima do necessário para determinar o dano de queda, considere a queda 3 m mais curta para determinar o dano. Por exemplo, um resultado 15-29 considera a queda 3 m mais curta, entre 30-44 seis metros mais curta, e assim por diante.",
      },
      {
        title: "Corrida Acrobática",
        text: "É possível tentar percorrer espaços de oposição aceitando -20 de penalidade no teste de Acrobacia.",
      },
    ],
  },
  {
    id: "adv-skill-adestrar-animais",
    skillName: "Adestrar Animais (Car)",
    page: 97,
    intro:
      "Além dos truques encontrados no Livro do Jogador, existem outros truques que podem ser ensinados a um animal mediante um teste bem-sucedido de Adestrar Animais (as CDs estão indicadas junto a cada truque).",
    entries: [
      {
        title: "Auxiliar Ataque (CD 20)",
        text: "O animal auxilia o ataque do personagem ou de outra criatura como ação padrão. O jogador deve designar quem receberá a ajuda e o oponente específico que o animal deverá ajudar a atacar antes de aplicar esse truque.",
      },
      {
        title: "Auxiliar Defesa (CD 20)",
        text: "O animal auxilia a defesa do personagem ou de outra criatura como ação padrão. O jogador deve designar quem receberá o auxílio e qual o oponente específico que a reação tentará, fornecendo um bônus à CA do receptor contra o próximo ataque do oponente selecionado. Ele deve conhecer o truque defender antes de aprender esse truque.",
      },
      {
        title: "Auxiliar a Rastrear (CD 20)",
        text: "O animal auxilia as tentativas de rastrear do personagem. É necessário que ele esteja presente enquanto seu mestre tenta rastrear uma criatura; caso o animal obtenha sucesso num teste de Sobrevivência (CD 10), ele recebe +2 de bônus de circunstância em seu teste de Sobrevivência para rastrear. Ele precisa da habilidade faro e conhecer o truque rastrear antes de aprender esse truque.",
      },
      {
        title: "Imobilizar (CD 20)",
        text: "O animal inicia uma manobra de Agarrar e tenta imobilizar um inimigo designado com suas patas, garras ou dentes. Um animal com a habilidade Agarrar Aprimorado utilizará a tentativa; caso contrário, imobilizar provocará ataque de oportunidade. Ele deve conhecer o truque atacar antes de aprender esse truque.",
      },
      {
        title: "Casa (CD 20)",
        text: "O animal retorna ao local onde foi treinado para executar esse truque, viajando o quanto for necessário.",
      },
      {
        title: "Caçar (CD 15)",
        text: "O animal tenta caçar e procurar alimento para o personagem utilizando sua perícia Sobrevivência. Consulte o Livro do Jogador para mais detalhes sobre como utilizar Sobrevivência para caçar e procurar alimento. Embora qualquer animal saiba automaticamente como caçar e procurar comida para si, esse truque permite que ele retorne com o alimento, em vez de apenas devorar o que encontrar.",
      },
      {
        title: "Capacidade de Aprendizado",
        text: "A maioria das criaturas com Inteligência inferior a 3 consegue aprender três truques para cada ponto de Inteligência. Animais treinados e montarias especiais consomem mais truques como parte do meio de Truques Adicionais. Os Mestres são incentivados a criar e introduzir estábulos especiais ou treinadores que se especializem na produção de animais com seleções exclusivas de truques.",
      },
      {
        title: "Truques Adicionais — Pré-requisitos",
        text: "Animal ou besta mágica com Int 1 ou 2, deve possuir pelo menos 1 truque.",
      },
      {
        title: "Truques Adicionais — Benefício",
        text: "A criatura consegue aprender mais truques do que o normal.",
      },
      {
        title: "Truques Adicionais — Normal",
        text: "Sem esse talento, os animais e as bestas mágicas podem aprender no máximo três truques por ponto de Inteligência.",
      },
      {
        title: "Truques Adicionais — Especial",
        text: "Esse talento pode ser escolhido diversas vezes. A cada ocasião, a criatura pode aprender até três novos truques.",
      },
      {
        title: "Seguir (CD 20)",
        text: "O animal segue um alvo designado, fazendo o possível para não ser detectado, até que o alvo esteja ferido ou descansando, e então ataca. O animal deve conhecer o truque atacar antes de aprender esse truque.",
      },
      {
        title: "Roubar (CD 20)",
        text: "O animal agarra um objeto em posse de criatura designada, arrebata-o e carrega até o personagem. Se diversos objetos estiverem disponíveis, o animal escolherá aleatoriamente. Ele deve conhecer o truque buscar (consulte o Livro do Jogador) antes de aprender esse truque.",
      },
      {
        title: "Subjugar (CD 20)",
        text: "O animal ataca um alvo designado com -4 de penalidade infligindo dano por contusão. O animal interrompe a manobra quando a criatura fica inconsciente. Ele deve conhecer o truque atacar antes de aprender esse truque.",
      },
      {
        title: "Alertar (CD 20)",
        text: "O animal reage à aproximação de outras criaturas, mesmo que qualquer comando seja proferido, não importa se ele enxerga, escuta ou detecta o intruso através do faro. O tipo exato de avisos (silvos, rugidos, grasnidos, latidos) varia de acordo com o tipo de animal e o mestre escolhido no treinamento, e não poderá ser modificado posteriormente. Se o treinamento não parar depois desse alerta, ele poderá ser ensinado a alertar criaturas específicas (como os aliados do treinador). O animal deve conhecer o truque guardar (consulte o Livro do Jogador) antes de aprender esse truque.",
      },
      {
        title: "Ensinar uma Tarefa Geral para um Animal",
        text: "As tarefas descritas abaixo expandem aquelas apresentadas no Livro do Jogador. Para ser treinado para uma tarefa específica, o animal precisa de Inteligência 2 ou superior.",
      },
      {
        title: "Combate Avançado (CD 20)",
        text: "Um animal treinado para o combate avançado conhece os truques auxiliar a rastrear, atacar, imobilizar, ficar e subjugar. Ensinar um animal a combater dessa forma exige cinco semanas. Também é possível \"melhorar\" um animal treinado para combater gastando duas semanas e obtendo sucesso num teste de Adestrar Animais (CD 20). A nova tarefa geral e os truques envolvidos substituem completamente os antigos.",
      },
      {
        title: "Guarda e Defesa (CD 20)",
        text: "Um animal treinado para guardar e defender conhece os truques defender, recuar, guardar, imobilizar, subjugar e alertar. Ensinar um animal a defender exige três semanas. Também é possível \"melhorar\" um animal treinado para guardar gastando três semanas e obtendo sucesso num teste de Adestrar Animais (CD 20). A nova tarefa geral e os truques envolvidos substituem completamente os antigos.",
      },
      {
        title: "Roubo (CD 20)",
        text: "Um animal treinado para roubar conhece os truques buscar, seguir, casa, roubar e atacar. Ensinar um animal a roubar exige três semanas.",
      },
    ],
  },
  {
    id: "adv-skill-arte-da-fuga",
    skillName: "Arte da Fuga (Des)",
    page: 98,
    intro:
      "O personagem consegue se libertar dos efeitos de magias de confinamento, amarras ou constrições muito rapidamente que o normal, mas é necessário aceitar voluntariamente uma penalidade na sua perícia.",
    entries: [
      {
        title: "Fuga Rápida",
        text: "O teste de Arte da Fuga acelerado aumenta a CD em 10. Escapar de amarras, algemas ou outras formas de aprisionamento (exceto a manobra Agarrar) para alcançar esse resultado exige 5 rodadas de esforço. Escapar de uma manobra Agarrar ou Imobilização usando essa opção exige uma ação padrão. Escapar das magias animar cordas, comandar plantas ou constrição com essa opção exige uma ação padrão. Escapar de uma manobra de constrição exige uma ação de movimento, e esguivar-se por um espaço apertado requer a metade do tempo normal (a critério do Mestre, mínimo de 5 rodadas).",
      },
    ],
  },
  {
    id: "adv-skill-avaliacao",
    skillName: "Avaliação (Int)",
    page: 98,
    intro:
      "Seja realizando um roubo audacioso ou um ato impetuoso de espionagem, os aventureiros nem sempre têm tempo de estudar cuidadosamente o valor do espólio em potencial. Os personagens são capazes de empregar a perícia Avaliação para realizar uma estimativa rápida, mas imprecisa, do valor de um item.",
    entries: [
      {
        title: "Teste",
        text: "O personagem consegue avaliar um item rapidamente, mas a CD é mais alta. Um fracasso significa que ele não conseguirá estimar o valor do item. Exemplos de CD por categoria de item: Comum (mercadorias comerciais como especiarias, alimentos, matérias-primas, itens mundanos, gado) CD 15; Raro (roupas finas, metais preciosos em estado bruto, gemas, obras de arte) CD 20; Exótico (gemas incomuns com colorações estranhas, raras na região, tamanho ou pureza excepcional) CD 25; Exclusivo (obras-primas da arte, jóias reais, coroas e outros adornos) CD 30+.",
      },
      { title: "Ação", text: "Avaliar um item rapidamente exige 1 rodada." },
      {
        title: "Novas Tentativas",
        text: "O personagem pode tentar avaliar um item normalmente (o que exige 1 minuto), mas não poderá avaliar o item rapidamente outra vez. Sempre é possível avaliar um item normalmente, não importa se a avaliação rápida foi obtida com sucesso ou não.",
      },
      {
        title: "Especial",
        text: "O talento Avaliar Item Mágico permite que o personagem utilize Avaliação para determinar as propriedades mágicas de um item; consulte a descrição do talento no Capítulo 3.",
      },
    ],
  },
  {
    id: "adv-skill-cura",
    skillName: "Cura (Sab)",
    page: 98,
    intro:
      "O personagem é capaz de usar a perícia Cura para determinar o que ou quem eliminou uma criatura falecida. A dificuldade dessa tarefa depende da natureza da morte, conforme indicado na tabela abaixo.",
    entries: [
      {
        title: "Causa da Morte — CDs",
        text: "Ferimentos físicos CD 0; Ambiental (fogo, asfixia, etc.) CD 5; Magia com efeitos visíveis CD 10; Envenenamento CD 15; Magia sem efeitos visíveis CD 20.",
      },
      {
        title: "Ação",
        text: "Cada dia transcorrido entre a morte da criatura e a hora do exame aumenta a CD do teste de Cura para determinar a causa da morte em 5 pontos. Realizar um teste de Cura para determinar a causa de uma morte exige 10 minutos.",
      },
      { title: "Novas Tentativas", text: "Sim, mas são precisos 10 minutos para cada tentativa." },
    ],
  },
  {
    id: "adv-skill-decifrar-escrita",
    skillName: "Decifrar Escrita (Int)",
    page: 99,
    intro:
      "É possível usar a perícia Decifrar Escrita para criar um código particular. Esse sistema de cifras permite que o personagem (ou qualquer um com a chave apropriada) registre informações sem correr o risco de que elas sejam lidas por outras pessoas. Qualquer código criado com esse código é exclusivo somente pode ser lido pelo personagem ou qualquer que disponha da informação de como decodificá-lo. Outros personagens com graduações na perícia Decifrar Escrita podem tentar entender o código. A CD será 10 + o modificador total de perícia do personagem no momento em que a cifra foi criada (na prática, o jogador \"escolhe 10\" num teste de perícia para criar a cifra, e tenta explicá-la precisa realizar um teste de Decifrar Escrita, resistido pelo resultado do jogador).",
    entries: [
      {
        title: "Ação",
        text: "A criação de uma cifra exige uma semana de trabalho ininterrupto. A primeira tentativa de decifrar uma cifra criada dessa maneira exige um dia de trabalho ininterrupto, e as novas tentativas subsequentes gastam uma semana cada.",
      },
      {
        title: "Novas Tentativas",
        text: "É possível tentar decifrar uma cifra particular mais de uma vez, mas é preciso gastar mais tempo a cada tentativa. Cada tentativa depois da primeira exige o dobro de tempo da tentativa anterior, sempre exigindo pelo menos uma semana de trabalho ininterrupto. A primeira tentativa de decifrar um código exige apenas um dia de dedicação.",
      },
    ],
  },
  {
    id: "adv-skill-diplomacia-pechinchar",
    skillName: "Diplomacia (Car)",
    page: 99,
    intro:
      "É possível pechinchar com um vendedor ou mediar discussões entre grupos, encontrando uma solução para assuntos diplomáticos que sejam legais ou que a situação exija.",
    entries: [
      {
        title: "Pechinchar",
        text: "O personagem consegue utilizar a Diplomacia para barganhar por mercadorias ou serviços, incluindo a natureza pessoal. Ao discutir a venda de um produto ou serviço, é possível tentar abaixar o preço com um teste de Diplomacia da mesma atitude do PdM (consulte Influenciando Atitudes de PdMs no Livro do Jogador). Se conseguir tornar um vendedor indiferente prestativo (a maioria dos vendedores começa indiferente), o preço de venda fica reduzido em 10% abaixo do normal. Acrescente o modificador de Diplomacia do vendedor à CD necessária para alcançar esse resultado. Por exemplo, para abaixar a atitude de um vendedor indiferente com +3 de modificador para +33 no teste de Diplomacia, é preciso um resultado igual a 33 (probabilidade básica 30 +3 modificador de Diplomacia do vendedor). O personagem pode piorar a atitude do vendedor, o vendedor se recusa a vender qualquer coisa naquele momento. O Mestre é o árbitro final em qualquer troca comercial e deve exercer o seu próprio bom senso para decidir se o uso abusivo dessa opção faz com que o jogo se tornar tedioso demais.",
      },
      { title: "Ação", text: "Pechinchar exige pelo menos 1 minuto inteiro, como qualquer teste de Diplomacia." },
      { title: "Novas Tentativas", text: "Não é possível realizar outro teste de Diplomacia para pechinchar." },
    ],
  },
  {
    id: "adv-skill-equilibrio",
    skillName: "Equilíbrio (Des)",
    page: 100,
    intro:
      "O personagem é capaz de correr por superfícies estreitas ou de resistir a manobras de derrubar.",
    entries: [
      {
        title: "Resistir a Derrubar",
        text: "Caso possua 10 ou mais graduações em Equilíbrio, o personagem poderá realizar um teste de Força ou de Destreza (veja a tentativa de derrubá-lo). Para isso, ele aceita -10 de penalidade no teste de Equilíbrio. Caso obtenha sucesso, ele não será derrubado. Quando obtiver sucesso nesse teste, o personagem não poderá resistir a derrubar o oponente.",
      },
      {
        title: "Equilíbrio ao Correr",
        text: "O personagem pode tentar correr através de uma superfície estreita aceitando -20 de penalidade no teste de Equilíbrio.",
      },
    ],
  },
  {
    id: "adv-skill-escalar",
    skillName: "Escalar (For; penalidade de armadura)",
    page: 100,
    intro:
      "Escaladores habilidosos conseguem subir muito mais rápido que os outros ou até mesmo lutar na defensiva enquanto ascendem.",
    entries: [
      {
        title: "Escalada Rápida",
        text: "O personagem consegue escalar mais rapidamente que o normal. Aceitando -20 de penalidade no teste de Escalar, ele pode se mover com seu deslocamento normal (em vez de um quarto do deslocamento).",
      },
      {
        title: "Escalar em Combate",
        text: "O personagem é capaz de se mover com liberdade suficiente para evitar golpes enquanto escala. Aceitando -20 de penalidade no teste de Escalar, ele conservará seu bônus de Destreza na CA enquanto estiver escalando.",
      },
    ],
  },
  {
    id: "adv-skill-esconder-se",
    skillName: "Esconder-se (Des)",
    page: 100,
    intro:
      "O personagem é capaz de se mesclar à multidão, deslizar por áreas de cobertura ou camuflagem para manter-se escondido, esconder-se até um inimigo ou seguir um alvo.",
    entries: [
      {
        title: "Mesclar-se à Multidão",
        text: "O personagem é capaz de empregar a perícia Esconder-se para desaparecer em meio às pessoas, mas isso somente é ocultará de alguém que esteja vasculhando a área à sua procura. Ele permanece visível para todos os indivíduos ao seu redor, e caso eles sejam hostis, provavelmente o denunciarão.",
      },
      {
        title: "Mover-se entre Áreas de Cobertura",
        text: "Caso já esteja se escondendo (graças a cobertura ou camuflagem) e possua pelo menos 5 graduações em Esconder-se, o personagem pode tentar se deslocar sem se revelar por uma área que não ofereça cobertura ou camuflagem. Para cada 5 graduações em Esconder-se, o personagem pode se mover 1,5 m no espaço aberto por pedaço cruzar entre os esconderijos, havendo -5 de penalidade no teste. Esse percurso mais a metade do seu deslocamento, também sofrerá a penalidade normal pelos testes de Esconder-se com movimentação acelerada (-10 para caminhar acima do deslocamento normal, e -5 se mover entre a metade e o total do deslocamento).",
      },
      {
        title: "Seguir ao Alvo",
        text: "O personagem é capaz de seguir alguém enquanto se mantém despercebido. Se ficar pelo menos 18 m do seu alvo, ele precisa obter sucesso no teste de Esconder-se (resistido pelo teste de Observar do alvo) a cada 10 minutos. A uma distância de menos de 18 m, é necessário um teste de Esconder-se por rodada. Ações extraordinárias do personagem (como conjurar uma magia ou atacar) podem prejudicar a tentativa, mesmo se ele não fracassar no teste. Seguir alguém ainda exige cobertura e camuflagem, como em qualquer teste de Esconder-se.",
      },
    ],
  },
  {
    id: "adv-skill-falsificacao",
    skillName: "Falsificação (Int)",
    page: 101,
    intro:
      "Documentos oficiais podem representar uma maneira excelente de comprometer a identidade de personagem e reforçar seus argumentos. Com documentos falsificados adequadamente — criados com o uso normal da perícia Falsificação e resistidos pelo teste de Falsificação do observador (ou um teste de Inteligência para personagens sem graduação nessa perícia) — é possível conseguir certos bônus especiais de jogo.",
    entries: [
      {
        title: "Documentos Oficiais",
        text: "A critério do Mestre, é possível forjar documentos que concedem +2 de bônus de circunstância em testes de Falsificação, Diplomacia ou Intimidação. Esses credenciais falsas tornam-se, de fato, as ferramentas perfeitas para a tarefa e fornecem bônus similares àqueles das ferramentas (obras-primas) relacionadas a outras perícias. Ao contrário de outros bônus, eles somente se aplicam quando o personagem apresentar os documentos e a criatura com a qual ele estiver interagindo não perceber a falsificação. Caso ele apresente documentos que forem detectados como falsos, o teste realizado para utilizá-los fracassa automaticamente. O Mestre também tem a liberdade de decidir que essa situação trará outras repercussões.",
      },
    ],
  },
  {
    id: "adv-skill-natacao",
    skillName: "Natação (For; penalidade de armadura)",
    page: 101,
    intro: "O personagem consegue nadar mais rapidamente que o normal.",
    entries: [
      {
        title: "Natação Acelerada",
        text: "O personagem pode tentar nadar mais rápido que o normal. Aceitando -10 de penalidade no teste de Natação, ele pode nadar com seu deslocamento total como uma ação de rodada completa (em vez de metade do deslocamento) ou com metade do deslocamento em uma ação de movimento (em vez de um quarto).",
      },
    ],
  },
  {
    id: "adv-skill-oficios",
    skillName: "Ofícios (Int)",
    page: 102,
    intro:
      "Aumentando voluntariamente a dificuldade da tarefa à sua frente, o personagem consegue criar itens mais rapidamente que o normal. Essa opção acrescenta +10 ou mais à CD normal e é usada para personagens de qualquer nível, desde que estejam dispostos a aceitar as penalidades apropriadas. A delicada arte de aumentar sua perícia em venenos eficazes com paciência e cuidado (sem mencionar discrição, nos lugares onde eles são proibidos). Criar venenos com a perícia Ofícios (veneficio) segue as regras do Livro do Jogador para todas as perícias de Ofícios, com as seguintes exceções.",
    entries: [
      {
        title: "Criação Rápida",
        text: "O personagem é capaz de aumentar voluntariamente a CD de criação de um item em qualquer múltiplo de 10. CD: +10 ou mais na CD. Essa tática permite que ele crie item mais rapidamente (já que usará multiplicada essa CD alta para determinar o andamento do trabalho ao realizar o teste). O jogador decide quantos múltiplos de 10 antes de realizar o teste.",
      },
      {
        title: "Ofícios (Venenos) — Preço",
        text: "O custo das matérias-primas do acesso aos ingredientes ativos — seja isso a substância ou a planta que forneça a toxina. Se forem encontradas facilmente, as matérias-primas custam cerca do preço de mercado, ou de um terço. Caso contrário, as matérias-primas custam pelo menos três quartos do preço de mercado — supondo que elas estejam à venda.",
      },
      {
        title: "Ofícios (Venenos) — Quantidade",
        text: "Para determinar quanto veneno o personagem será capaz de produzir em uma semana, realize um teste de Ofícios (veneficio) ao fim da semana. Se obtiver sucesso, multiplique o resultado do teste de CD pelo custo do veneno. Esse é o valor em PO de veneno criado naquela semana. Quando o total em PO produzido for igual ou superior ao preço de mercado de uma dose do veneno, essa dose estará terminada (muitas vezes, será possível criar mais de uma dose por semana, dependendo do resultado do teste com o preço de mercado do veneno). Se fracassar no teste com uma margem igual ou superior a 4, o veneno não fará progressos nessa semana. Se fracassar no teste com uma margem igual ou superior a 5, metade das matérias-primas serão arruinadas e terão que ser adquiridas novamente.",
      },
    ],
  },
  {
    id: "adv-skill-operar-mecanismo",
    skillName: "Operar Mecanismo (Int)",
    page: 102,
    intro:
      "O personagem é capaz de reduzir o tempo necessário para desarmar um mecanismo ou para acrescentar um dispositivo de neutralização a uma armadilha já existente.",
    entries: [
      {
        title: "Superar Armadilha",
        text: "O personagem é capaz de incorporar um dispositivo de neutralização que lhe permite evitar os efeitos de uma armadilha se ela for encontrada novamente mais tarde. Esse procedimento impõe -10 de penalidade no teste de Operar Mecanismo. Caso obtenha sucesso, ele não poderá apenas superar a armadilha (como se a dificuldade tivesse sido superada por 10 ou mais — consulte o Livro do Jogador) mas também acrescentará um dispositivo de neutralização que permite que o personagem e seus companheiros evitem ativá-la mais tarde. Por exemplo, é possível inserir uma cunha que bloqueia as engrenagens de uma armadilha mecânica, ou encontrar uma trilha estreita entre as placas de pressão que disparam dardos envenenados.",
      },
      {
        title: "Desarmar Acelerado",
        text: "O personagem consegue desarmar um mecanismo mais rapidamente que o normal. Para reduzir o tempo necessário para desarmar qualquer dispositivo a uma ação de rodada completa, acrescente +20 à CD. Por exemplo, uma armadilha que normalmente exigiria uma CD 20 e 2d4 rodadas para ser desarmada poderia ser neutralizada em 1 rodada obtendo-se sucesso num teste com CD 40.",
      },
    ],
  },
  {
    id: "adv-skill-sentir-motivacao",
    skillName: "Sentir Motivação (Sab)",
    page: 102,
    intro:
      "O personagem é capaz de avaliar a capacidade de combate de um oponente, identificando inimigos particularmente perigosos ou vulneráveis.",
    entries: [
      {
        title: "Avaliar Oponente",
        text: "Como uma ação padrão, o personagem é capaz de empregar Sentir Motivação para determinar o desafio representado por um adversário, de acordo com seu nível ou ND do oponente. O teste deve ser realizado após o personagem ter visível o alvo a um número de 9 m. Caso tenha visto o oponente em combate, o personagem recebe +2 de bônus de circunstância nesse teste. A precisão dessa avaliação depende do valor pelo qual o teste de Sentir Motivação superar o teste de Blefar do oponente. Caso obtenha sucesso, o personagem receberá as seguintes informações: ND do oponente inferior ao do personagem em 4 ou menos — resultado \"Uma galinha morta\"; ND do oponente inferior ao do personagem em 1, 2 ou 3 — resultado \"Fácil\"; ND do oponente igual ao do personagem — resultado \"Uma luta justa\"; ND do oponente maior ao do personagem mais 1, 2 ou 3 — resultado \"Um desafio considerável\"; ND do oponente supera o ND do personagem em 4 ou mais — resultado \"Uma grave ameaça\".",
      },
      {
        title: "Avaliar Oponente — Sucesso Grande",
        text: "Um sucesso na avaliação revela que seu oponente pertence a uma das duas categorias adjacentes (por exemplo, \"Fácil\" ou \"Uma luta justa\"). Se o resultado do teste de Blefar do personagem superar o resultado do teste de Sentir Motivação por 10 ou mais, o Mestre pode restringir o resultado a uma categoria.",
      },
      {
        title: "Especial",
        text: "O talento Intuição em Combate (consulte a descrição adiante) concede +4 de bônus nos testes de Sentir Motivação realizados para avaliar oponentes.",
      },
      {
        title: "Avaliar Oponente — Vulnerável",
        text: "Permite que o personagem restrinja o resultado de suas percepções a somente uma categoria, além de executar essa tarefa como uma ação livre. Um adversário particularmente vulnerável à estratégia típica de combate do personagem (por exemplo, um vampiro enfrentando um clérigo de nível elevado) é rejeitado como pertencendo a uma categoria inferior; outro que seja especialmente resistente (por exemplo, um golem diante de um ladino muito dependente de ataques furtivos) é percebido como pertencendo a uma categoria superior de desafio.",
      },
      { title: "Novas Tentativas", text: "O personagem é capaz de usar essa perícia num oponente diferente a cada rodada." },
    ],
  },
  {
    id: "adv-skill-sobrevivencia",
    skillName: "Sobrevivência (Sab)",
    page: 103,
    intro:
      "O personagem é capaz de erguer rastros de poeira em áreas selvagens, ampliando seu movimento de viagem e o de seus aliados.",
    entries: [
      {
        title: "Queimar o Chão",
        text: "Ao viajar em condições precárias ou terreno difícil, o personagem pode realizar um teste de Sobrevivência para acelerar o progresso do grupo. Com um resultado igual ou superior a 15, o movimento de deslocamento para viagem aumenta em 1/4, até o máximo de x1 (consulte a Tabela 9-5: Terreno e Movimento de Viagem no Livro do Jogador). Por exemplo, é possível aumentar o ritmo de viagem fechada de x1/4 para x1/2 com um resultado de viagem normal. Com um resultado igual ou superior a 25, o modificador de deslocamento pode ser ampliado em 1/2 (e portanto seria fechada pela selva de x3/4 do ritmo normal). Em ambos os casos, se aplica o máximo de x1 — o que significa que dessa forma é possível igualar, mas não exceder, o movimento de referência. O personagem que esteja guiando um grupo de até quatro indivíduos (incluindo ele mesmo) sem penalidade. Contudo, para cada três pessoas a mais (arredondadas para cima) no grupo, aplique -2 de penalidade à tentativa de queimar o chão. Assim, um grupo de cinco a sete pessoas (o personagem e entre quatro e seis indivíduos) sofreria -2 de penalidade, enquanto outro com entre oito e dez pessoas sofreria -4, e assim por diante. Essa habilidade se aplica apenas ao movimento de viagem em longas distâncias, e não surte efeito sobre movimento tático.",
      },
    ],
  },
  {
    id: "adv-skill-usar-cordas",
    skillName: "Usar Cordas (Des)",
    page: 103,
    intro: "O personagem consegue dar nós mais rapidamente que o normal.",
    entries: [
      {
        title: "Dar Nós com Rapidez",
        text: "O personagem é capaz de dar nós comum e especial ou amarrar uma corda em torno de si mesmo mais rapidamente que o normal. Aceitando -10 de penalidade no seu teste de Usar Cordas, ele consegue realizar qualquer uma dessas tarefas como uma ação de movimento (em vez de uma ação de rodada completa).",
      },
    ],
  },
];
