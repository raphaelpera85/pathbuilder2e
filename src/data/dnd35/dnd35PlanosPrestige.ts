/**
 * D&D 3.5 — Manual dos Planos (ed. BR), Capítulo 3 "Personagens e
 * Magia", seção "Classes de Prestígio" (pp.25+). Transcrição por
 * leitura visual direta de páginas renderizadas em alta resolução
 * (180dpi) — fonte é scan sem camada de texto.
 *
 * COBERTURA COMPLETA (pp.25-31): as 4 classes de prestígio do capítulo
 * completas: "Arrombador de Portais", "Campeão Planar", "Emissário
 * Divino" (incluindo subseção "Emissários Divinos Caídos") e
 * "Viajante Planar". Confirmado completo por leitura da p.31, onde a
 * seção termina e "MAGIA NOS PLANOS" começa — regras gerais sobre como
 * magias existentes (asterisco = magias novas deste capítulo, "(E)" =
 * magias de energia que afetam o Plano Etéreo) interagem com
 * características planares, não introduz novas classes.
 *
 * Nota: a seção "Criaturas como Raças" (p.23-24) NÃO introduz raças
 * novas — é apenas uma tabela de Ajuste de Nível (Aasimar/Bariaur/
 * Canolote/Githyanki/Githzerai/Spinagon/Tiefling/Uridezu) referenciando
 * stat blocks completos no Capítulo 9 "Monstros" deste livro —
 * catalogação de raça própria fica pendente de cruzar com esse
 * capítulo, não codificada aqui para não inventar dados ausentes.
 */
export type Dnd35PlanosPrestigeLevel = {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
};

export type Dnd35PlanosPrestigeClass = {
  id: string;
  name: string;
  hitDie: string;
  prerequisites: string;
  classSkills: string;
  skillPoints: string;
  progression: Dnd35PlanosPrestigeLevel[];
  classFeatures: { title: string; text: string }[];
  page: number;
};

export const DND35_PLANOS_PRESTIGE: Dnd35PlanosPrestigeClass[] = [
  {
    id: "planos-prestige-arrombador-de-portais",
    name: "Arrombador de Portais",
    hitDie: "d6",
    prerequisites:
      "Bônus Base de Ataque: +4. Tendência: Qualquer exceto Leal. Perícias: 4 graduações em Conhecimento (planos), 8 graduações em Usar Instrumento Mágico. Especial: Para qualificar-se à classe arrombador de portais, o personagem deve ter visitado dois dos planos de existência além do seu plano natal.",
    classSkills:
      "Abrir Fechaduras (Des), Acrobacia (Des), Alquimia (Int), Arte da Fuga (Des), Atuação (Car), Avaliação (Int), Blefar (Car), Conhecimento (escolhidos separadamente) (Int), Decifrar Escrita (Int), Diplomacia (Car), Disfarces (Car), Equilíbrio (Des), Escalar (For), Esconder-se (Des), Falar Idiomas (Nenhuma), Falsificação (Int), Furtividade (Des), Intimidar (Car), Leitura Labial (Int), Mensagens Secretas (Sab), Observar (Sab), Obter Informação (Car), Ofícios (Int), Operar Mecanismo (Int), Ouvir (Sab), Procurar (Int), Profissão (Sab), Punga (Des), Saltar (For), Senso de Direção (Sab), Sentir Motivação (Sab), Usar Cordas (Des), Usar Instrumento Mágico (Car).",
    skillPoints: "8 + modificador de Inteligência",
    progression: [
      { level: 1, bab: "+0", fort: 0, ref: 2, will: 2, special: "Analisar portal, idioma adicional" },
      { level: 2, bab: "+1", fort: 0, ref: 3, will: 3, special: "Compreensão" },
      { level: 3, bab: "+2", fort: 1, ref: 3, will: 3, special: "Abrir portal" },
      { level: 4, bab: "+3", fort: 1, ref: 4, will: 4, special: "Amortecimento de magia de invocação, idioma adicional" },
      { level: 5, bab: "+3", fort: 1, ref: 4, will: 4, special: "Persuasão" },
      { level: 6, bab: "+4", fort: 2, ref: 5, will: 5, special: "Sobrevivência Planar" },
      { level: 7, bab: "+5", fort: 2, ref: 5, will: 5, special: "Idioma adicional, redução de dano 5/+1" },
      { level: 8, bab: "+6", fort: 2, ref: 6, will: 6, special: "Confundir portal" },
      { level: 9, bab: "+6", fort: 3, ref: 6, will: 6, special: "Viagem planar" },
      { level: 10, bab: "+7", fort: 3, ref: 7, will: 7, special: "Idioma adicional, amortecimento planar" },
    ],
    classFeatures: [
      {
        title: "Usar Armas e Armaduras",
        text: "Os arrombadores de portais sabem usar todas as armas simples e armaduras leves (mas não escudos).",
      },
      {
        title: "Analisar Portal (SM)",
        text: "Um arrombador de portais adquire a habilidade de analisar portal como uma magia similar à magia. Ele pode ativar a habilidade uma vez por dia a cada nível de arrombador de portais. Esta habilidade funciona como a magia conjurada por um feiticeiro de mesmo nível do personagem.",
      },
      {
        title: "Idioma Adicional",
        text: "Um arrombador de portais adquire um idioma adicional comumente utilizado em outros planos. Estes idiomas incluem Abissal, Aquan, Auran, Celestial, Ígnea, Infernal e Terran. O Mestre pode expandir esta lista para adequá-la à cosmologia da campanha. Os idiomas adicionais são adquiridos no 4º, 7º e 10º níveis.",
      },
      {
        title: "Compreensão",
        text: "Ao atingir o 2º nível, um arrombador de portais entende os conflitos básicos de forças e energias e pode utilizar esta compreensão instintiva para auxiliar determinadas perícias. O arrombador adquire +2 de bônus nos testes de Decifrar Escrita e Usar Instrumento Mágico. O arrombador também recebe +2 de bônus de intuição para procurar ou desarmar armadilhas mágicas.",
      },
      {
        title: "Abrir Portal (Sob)",
        text: "No 3º nível, a compreensão das forças planares do arrombador de portais estende-se ao funcionamento de portais mágicos, de forma que ele consegue forçá-los a abrir sem a magia, chave ou instrumento correto. O arrombador realiza um teste de Abrir Fechaduras usando seu modificador de Inteligência no lugar do modificador de Destreza. As CDs de portais normalmente são: Portal (CD 20); Portal com chave típica (CD 25); Portal selado pela magia selar portal (CD 20 + nível do conjurador); Portal criado por uma divindade (CD 50). Abrir um portal exige uma rodada completa de trabalho e um teste bem-sucedido. O portal permanece aberto durante 1d4+1 rodadas.",
      },
      {
        title: "Amortecimento de Magia de Invocação (Sob)",
        text: "Arrombadores de portais frequentemente irritam demônios e diabos, inibindo sua habilidade de convocar reforços. Três vezes por dia, um arrombador de portais de 4º nível ou superior pode criar um campo amortecedor que se estende por 30 m em todas as direções. As magias e habilidades similares à invocação e convocação são suprimidas nesta área, embora criaturas invocadas fora do campo amortecedor possam ingressar normalmente na área. O campo amortecedor permanece ativo durante 10 rodadas. As criaturas convocadas ou invocadas antes do arrombador de portais criar o amortecedor não são afetadas.",
      },
      {
        title: "Persuasão (Sob)",
        text: "Um arrombador de portais de 5º nível ou superior pode lidar com uma grande variedade de criaturas e personagens, recebendo +2 de bônus de intuição nos testes de Blefar, Diplomacia, Obter Informação, Intimidar e Sentir Motivação.",
      },
      {
        title: "Sobrevivência Planar (Ext)",
        text: "No 6º nível, um arrombador de portais adquire sintonia com a natureza dos planos que visita e torna-se pessoalmente imune aos seus efeitos naturais. Qualquer efeito que seria neutralizado pela magia prevenir efeitos planares também é negado pela habilidade sobrevivência planar. O arrombador de portais torna-se imune aos fogos \"normais\" do Plano Elemental do Fogo, mas as formas de ataque baseadas em fogo e áreas excepcionalmente chamejantes ainda o afetam. Como esta habilidade é extraordinária e o resultado da sintonia com o plano em particular, o arrombador de portais permanece vulnerável ao mesmo tipo de ataque em outros planos onde esta forma de ataque não seja parte da ordem natural. O fogo de outros planos, incluindo o Plano Material, ainda afeta normalmente.",
      },
      {
        title: "Redução de Dano",
        text: "Um arrombador de portais de 7º nível ou superior adquire Redução de Dano 5/+1. Isto significa que o personagem ignora (regenerando instantaneamente) os primeiros 5 pontos de dano de qualquer ataque, a menos que seja infligido por uma arma com bônus de melhoria +1 ou superior, magias ou uma forma de energia (fogo, frio, etc.). Esta habilidade não se acumula com outras habilidades de Redução de Dano.",
      },
      {
        title: "Confundir Portal (SM)",
        text: "No 8º nível, o arrombador de portais adquire a habilidade de confundir um portal (como a magia confundir portal conjurada por um feiticeiro de nível igual ao do arrombador). Esta habilidade pode ser usada três vezes por dia.",
      },
      {
        title: "Viagem Planar (SM)",
        text: "No 9º nível, um arrombador de portais pode deslocar-se de um plano a outro uma vez por dia, usando uma habilidade similar à magia, idêntico aos efeitos da magia viagem planar conjurada por um feiticeiro de 15º nível.",
      },
      {
        title: "Amortecimento Planar (SM)",
        text: "Um arrombador de portais pode emitir um campo que neutraliza magias e habilidades similares que acessem outros planos num raio de 9 m. As magias e habilidades similares existentes não são afetadas; um arrombador de portais não pode eliminar a projeção astral de um inimigo simplesmente aproximando-se dele. Mas as magias conjuradas após a emissão de um campo de amortecimento planar são afetadas: um oponente num raio de 9 m não poderia escapar do arrombador de portais com a magia porta dimensional, por exemplo, ou conseguir reforços com uma magia invocar criaturas. O arrombador de portais pode ativar o amortecimento planar três vezes por dia. Cada utilização permanece ativa durante 10 rodadas. A habilidade amortecimento planar de um arrombador de portais afeta as seguintes magias e habilidades similares à magia: arca secreta de Leomund, banimento, círculo de teletransporte, comunhão, contato extraplanar, desvanecimento, expulsão, forma etérea, labirinto, manifestar, manifestar em massa, mansão magnífica de Mordenkainen, mensagem interplanar, passeio etéreo, piscar, porta dimensional, portal, projeção astral, teletransporte, teletransporte exato, troca da corda, turbilhão da realidade, viagem planar. Além disso, magias de invocação e convocação só podem atingir criaturas do mesmo plano e as magias da subescola da Sombra só funcionam no Plano das Sombras. Os efeitos de banimento de blasfêmia, ditado, palavra sagrada e palavra do caos são neutralizados, embora as magias funcionem normalmente.",
      },
    ],
    page: 25,
  },
  {
    id: "planos-prestige-campeao-planar",
    name: "Campeão Planar",
    hitDie: "d10",
    prerequisites:
      "Bônus Base de Ataque: +6. Talentos: Especialização em Arma. Perícias: 4 graduações em Conhecimento (os planos). Especial: O campeão planar deve ter visitado pelo menos dois planos além de seu plano natal para adotar esta classe de prestígio. O personagem não precisa ter sido o responsável pelas viagens.",
    classSkills:
      "Adestrar Animais (Car), Cavalgar (Des), Conhecimento (os planos) (Int), Escalar (For), Esconder-se (Des), Falar Idiomas (Nenhuma), Furtividade (Des), Intimidar (Car), Natação (For), Observar (Sab), Ofícios (Int), Ouvir (Sab), Procurar (Int), Profissão (Sab), Saltar (For), Senso de Direção (Sab), Sobrevivência (Sab), Usar Cordas (Des).",
    skillPoints: "4 + modificador de Inteligência",
    progression: [
      { level: 1, bab: "+1", fort: 2, ref: 2, will: 0, special: "Plano predileto" },
      { level: 2, bab: "+2", fort: 3, ref: 3, will: 0, special: "Ver o invisível" },
      { level: 3, bab: "+3", fort: 3, ref: 3, will: 1, special: "Ataque etéreo" },
      { level: 4, bab: "+4", fort: 4, ref: 4, will: 1, special: "Sobrevivência planar" },
      { level: 5, bab: "+5", fort: 4, ref: 4, will: 1, special: "Plano predileto" },
      { level: 6, bab: "+6", fort: 5, ref: 5, will: 2, special: "Passeio etéreo" },
      { level: 7, bab: "+7", fort: 5, ref: 5, will: 2, special: "Rasgar portal" },
      { level: 8, bab: "+8", fort: 6, ref: 6, will: 2, special: "Desarmar portal" },
      { level: 9, bab: "+9", fort: 6, ref: 6, will: 3, special: "Redução de dano 20/+1" },
      { level: 10, bab: "+10", fort: 7, ref: 7, will: 3, special: "Plano predileto" },
    ],
    classFeatures: [
      {
        title: "Usar Armas e Armaduras",
        text: "Os campeões planares sabem usar todas as armas simples e comuns, todos os tipos de armaduras e escudos.",
      },
      {
        title: "Plano Predileto",
        text: "O campeão planar estudou profundamente os nativos do seu plano. Ele recebe +1 de bônus em testes de Blefar, Ouvir, Sentir Motivação, Observar e Sobrevivência ao utilizar estas perícias contra nativos de seu plano predileto. Da mesma forma, o campeão planar recebe o mesmo bônus em jogadas de dano com armas contra criaturas nativas do seu plano predileto. O campeão planar só recebe o bônus de dano com armas de ataque à distância se o alvo estiver a até 9 m. O bônus de dano não se aplica a criaturas imunes a sucessos decisivos. O campeão planar escolhe um único plano predileto, mas criaturas idênticas e originárias de outros planos não são afetadas. Por exemplo, se um campeão planar escolhe os Nove Infernos como seu plano predileto, ele receberá o bônus contra os diabos nativos deste plano, mas não contra os diabos do plano adjacente, Aqueronte. Os estudos do campeão planar também o auxiliam em situações alheias ao combate. O campeão planar recebe +1 de bônus nos testes de Diplomacia e Obter Informação para interagir com os nativos do seu plano predileto. Os testes de Senso de Direção recebem +1 de bônus se forem executados no plano predileto. O campeão planar adquire um segundo plano predileto ao atingir o 5º nível e um terceiro ao chegar ao 10º. Quando escolhe um novo plano predileto, os bônus dos planos anteriores aumentam em +1. Por exemplo, um campeão planar de 5º nível pode escolher Aqueronte como seu novo plano predileto, recebendo +1 de bônus contra nativos deste plano, e seu bônus contra os nativos dos Nove Infernos aumenta para +2. O campeão planar não pode escolher seu plano nativo como plano predileto. Os bônus desta habilidade são cumulativos com o inimigo predileto do ranger. Um ranger/campeão planar com inimigo predileto (diabos) e plano predileto (Nove Infernos) adiciona os bônus ao combater os diabos nativos dos Noves Infernos.",
      },
      {
        title: "Ver o Invisível (SM)",
        text: "Ao atingir o 2º nível, o campeão planar tem a habilidade de ver o invisível sem limite diário, como a magia conjurada por um feiticeiro de 5º nível. Esta habilidade permite que ele veja (mas não que afete) criaturas etéreas.",
      },
      {
        title: "Ataque Etéreo (Sob)",
        text: "Um campeão planar de 3º nível ou superior pode transformar sua arma num efeito de força material, permitindo que ataque a criaturas do Plano Etéreo. O campeão planar inicia e conclui esta habilidade como uma ação livre, mas deve utilizá-la numa arma para a qual possui Especialização em Arma. Se o campeão planar portar uma arma mágica, esta habilidade também elimina a chance de fracasso de 50% ao atacar um inimigo incorpóreo.",
      },
      {
        title: "Sobrevivência Planar (Ext)",
        text: "No 4º nível, o campeão planar adquire sintonia com a natureza dos planos que visita e torna-se pessoalmente imune aos seus efeitos naturais. Qualquer efeito que seria neutralizado pela magia prevenir efeitos planares também é negado pela habilidade sobrevivência planar. O campeão planar torna-se imune aos fogos \"normais\" do Plano Elemental do Fogo, mas as formas de ataque baseadas em fogo e áreas excepcionalmente chamejantes ainda o afetam. Como esta habilidade extraordinária é o resultado da sintonia com um plano em particular, o campeão planar permanece vulnerável ao mesmo tipo de ataque em outros planos onde esta forma de ataque não seja parte da ordem natural. O fogo de outros planos, incluindo o Plano Material, ainda afeta normalmente.",
      },
      {
        title: "Passeio Etéreo (SM)",
        text: "Um campeão planar de 6º nível ou superior pode adentrar o Plano Etéreo três vezes por dia. Isso funciona como a magia passeio etéreo conjurada por um feiticeiro de 13º nível.",
      },
      {
        title: "Rasgar Portal (SM)",
        text: "Uma vez por dia, um campeão planar de 7º nível ou superior pode rasgar um portal através do Plano Astral para outro plano de existência. Cavando um buraco no teto do plano em que esteja, o campeão planar pode abrir um portal para o Plano Astral ou qualquer outro plano já tenha visitado. Assim como a magia viagem planar, o campeão planar não tem controle sobre seu destino exato em qualquer plano para o qual abre o portal. O portal surge como um buraco irregular no espaço adjacente ao campeão planar e continua ativo durante 1d4+1 rodadas antes de se fechar.",
      },
      {
        title: "Desarmar Portal (SM)",
        text: "Uma vez por dia, o campeão planar de 8º nível ou superior tem a habilidade de selar uma porta ou portal dimensional cortando sua conexão com seu destino. Ele conseguirá fazê-lo se obtiver sucesso num teste de conjurador (CD 5 + nível do conjurador da porta ou portal). A magia portal é destruída como se fosse dissipada, enquanto os portais naturais são neutralizados durante 1d6 dias.",
      },
      {
        title: "Redução de Dano",
        text: "Ao atingir o 9º nível, um campeão planar adquire Redução de Dano 20/+1. Isto significa que o personagem ignora (regenerando instantaneamente) os primeiros 20 pontos de dano de qualquer ataque, a menos que seja infligido por uma arma com bônus de melhoria +1 ou superior, magias ou uma forma de energia (fogo, frio, etc.). Esta habilidade não se acumula com outras habilidades de Redução de Dano.",
      },
    ],
    page: 26,
  },
  {
    id: "planos-prestige-emissario-divino",
    name: "Emissário Divino",
    hitDie: "d8",
    prerequisites:
      "Bônus Base de Ataque: +4. Perícias: 7 graduações em Conhecimento (religião). Magias: Ser capaz de conjurar magias divinas de 2º nível. Especial: O emissário divino deve ter feito contato pacífico com sua divindade ou com seus agentes diretos (às vezes outros emissários divinos agindo em nome da deidade). Além disso, um emissário divino em potencial deve ter completado uma tarefa específica designada por sua divindade para tornar-se efetivamente um emissário. Uma vez que a tarefa seja cumprida, o personagem pode tornar-se emissário divino a qualquer momento. Após um personagem embarcar nesta trilha (como emissário divino de 1º nível), um emissário divino não pode colocar-se a serviço de outra divindade.",
    classSkills:
      "Concentração (Con), Conhecimento (religião) (Int), Cura (Sab), Diplomacia (Car), Disfarces (Car), Identificar Magia (Int), Intimidação (Car), Observar (Sab), Obter Informação (Car), Ofícios (Int), Profissão (Sab), Sentir Motivação (Sab), Usar Instrumento Mágico (Car). Consulte o Capítulo 4: Perícias, no Livro do Jogador, para obter as descrições das perícias.",
    skillPoints: "4 + modificador de Inteligência",
    progression: [
      { level: 1, bab: "+0", fort: 0, ref: 0, will: 2, special: "Concessão de domínio" },
      { level: 2, bab: "+1", fort: 0, ref: 0, will: 3, special: "Contato" },
      { level: 3, bab: "+2", fort: 1, ref: 1, will: 3, special: "Aura ameaçadora, presente divino" },
      { level: 4, bab: "+3", fort: 1, ref: 1, will: 4, special: "Aparência alterada" },
      { level: 5, bab: "+3", fort: 1, ref: 1, will: 4, special: "Comunhão, viagem planar ao plano da divindade" },
      { level: 6, bab: "+4", fort: 2, ref: 2, will: 5, special: "Presente divino" },
      { level: 7, bab: "+5", fort: 2, ref: 2, will: 5, special: "Viagem planar a qualquer plano" },
      { level: 8, bab: "+6", fort: 3, ref: 3, will: 6, special: "Audiência, mudança de tendência" },
      { level: 9, bab: "+6", fort: 3, ref: 3, will: 6, special: "União mística, presente divino" },
      { level: 10, bab: "+7", fort: 3, ref: 3, will: 7, special: "Portal" },
    ],
    classFeatures: [
      {
        title: "Usar Armas e Armaduras",
        text: "Os emissários divinos sabem usar todas as armas simples e todos os tipos de armaduras. Além disso, o emissário divino aprende a usar a arma preferida de sua divindade, se ainda não souber.",
      },
      {
        title: "Concessão de Domínio",
        text: "Um emissário divino adquire acesso a um domínio adicional e ao poder concedido pertinente, escolhendo entre os domínios de sua divindade. Os emissários divinos que já foram clérigos essencialmente adquirem um terceiro domínio e podem preparar suas magias de domínio de cada nível usando a lista de magias do novo domínio. Não importa sua antiga classe, os emissários divinos obtêm o poder concedido pelo domínio que escolherem. Nos casos em que a habilidade concedida permite expulsar ou destruir, utilize a soma dos níveis de clérigo e emissário divino do personagem para determinar o efeito da habilidade.",
      },
      {
        title: "Contato (Sob)",
        text: "Um emissário divino de 2º nível ou superior pode ser contatado mentalmente por sua divindade ou seus emissários, geralmente para a transmissão de conhecimentos específicos ou ordens. Este contato só funciona unilateralmente, e o emissário divino não pode iniciar um contato, questionar as ordens ou pedir explicações. A natureza do contato depende da divindade: Sonhos, visões fantasmagóricas e iluminações são algumas possibilidades. O contato da divindade raramente interrompe as ações normais do emissário divino.",
      },
      {
        title: "Conjuração",
        text: "Um emissário divino continua avançando em sua habilidade de conjurar magias divinas, desenvolvendo-a junto com as habilidades de sua divindade. Portanto, quando o personagem atinge o 2º, 4º, 6º e 8º níveis, ele adquire mais magias diárias (e magias conhecidas, quando aplicável), como se estivesse avançando um nível na sua classe de conjurador anterior. Entretanto, ele não recebe qualquer outro benefício daquela classe (Expulsar/Fascinar mortos-vivos, talentos metamágicos ou de criação de itens, etc.). Essencialmente, isso significa que o nível de emissário divino é somado ao nível de outra classe capaz de conjurar magias do personagem e, depois disso, sua quantidade de magias diárias, suas magias conhecidas e seu nível de conjurador são determinados. Se um personagem possuía mais de uma classe de conjurador antes de se tornar o emissário divino, ele deve escolher qual classe será afetada para determinar suas magias por quando adquirir um novo nível na classe de prestígio.",
      },
      {
        title: "Aura Ameaçadora (Ext)",
        text: "No 3º nível, um emissário divino adquire a habilidade de gerar uma aura invisível e intangível de ameaça que enfraqueça criaturas hostis num raio de 6 m. Qualquer oponente que atacar o emissário divino deve obter sucesso em um teste de resistência de Vontade (CD = nível de personagem do emissário divino). Se fracassar, sofrerá −2 de penalidade de moral nas jogadas de ataque, testes e testes de resistência durante um dia inteiro ou até conseguirem infligir dano ao emissário divino que gerou a aura. Uma criatura que obteve sucesso no teste de resistência inicial ou que infligiu dano ao emissário divino ficará imune à aura daquele emissário durante 24 horas.",
      },
      {
        title: "Presente Divino",
        text: "No 3º, 6º e 9º níveis, a divindade concede um presente ao emissário divino. A natureza do presente varia, mas geralmente é a habilidade de utilizar uma magia de um dos domínios do emissário divino similar à magia. A divindade oferece uma magia de nível igual ao do personagem ou inferior. Em outras palavras, um presente divino de nível 3º, 6º ou 9º transforma uma de suas magias de domínio de 1º, 2º ou 3º nível numa magia similar à magia. O emissário divino pode usar esta habilidade uma vez por dia. A habilidade similar funciona como a magia conjurada por um clérigo de nível equivalente ao nível de personagem do emissário divino.",
      },
      {
        title: "Aparência Alterada (Ext)",
        text: "No 4º nível, um emissário divino começa a exibir modificações físicas proeminentes de acordo com os desejos de sua divindade. Para deidades de tendência boa, isso geralmente inclui a forma de pele, cabelos ou olhos dourados. Os emissários divinos de deuses malignos podem desenvolver chifres, galhadas ou uma cauda pontiaguda. As deidades neutras podem infundir um tom acobreado ou prateado de pele, e as divindades da natureza podem causar uma palidez esverdeada e conceder cabelos semelhantes à madeira. Os poderes elementais alteram a aparência de seus emissários dando a suas peles uma textura semelhante ao elemento envolvido. Todas estas alterações são permanentes, embora possam ser ocultadas por disfarces ou magias.",
      },
      {
        title: "Comunhão (SM)",
        text: "Um emissário divino de 5º nível ou superior pode ativar esta habilidade similar à magia (idêntica à magia de mesmo nome) uma vez por semana. Ela funciona como a magia conjurada pelo clérigo de nível equivalente ao nível do personagem do emissário divino.",
      },
      {
        title: "Viagem Planar ao Plano da Divindade (SM)",
        text: "Um emissário divino de 5º nível ou superior pode viajar ao plano natal de sua divindade uma vez por dia, e desta para o seu próprio plano natal. Esta habilidade similar à magia funciona como a magia conjurada por um clérigo de nível equivalente ao nível de personagem do emissário divino.",
      },
      {
        title: "Viagem Planar a Qualquer Plano (SM)",
        text: "Ao atingir o 7º nível, um emissário divino pode viajar a qualquer plano de existência, usando a magia homônima uma vez por dia. Esta habilidade similar à magia funciona como a magia conjurada por um clérigo de nível equivalente ao nível de personagem do emissário divino.",
      },
      {
        title: "Audiência (SM)",
        text: "Um emissário divino de 8º nível ou superior pode requisitar uma audiência com sua divindade duas vezes por ano, o que funciona como a magia comunhão com o dobro da duração e permitindo um número de perguntas equivalente ao dobro do nível do personagem do emissário divino.",
      },
      {
        title: "Mudança de Tendência",
        text: "Se um emissário divino não possui a mesma tendência que sua divindade, sua tendência altera-se para a tendência do deus assim que o personagem atinge o 8º nível.",
      },
      {
        title: "União Mística",
        text: "No 9º nível, o emissário divino torna-se uma criatura mágica. Ela passa a ser considerada um extraplanar do mesmo plano que a divindade, e não mais humanoide. Ela deixa de ser afetada por enfeitiçar pessoas, por exemplo. Além disso, o emissário divino adquire Redução de Dano 20/+1. Essa Redução de Dano não se acumula com outras formas de RD. Apesar de sua condição de extra-planar, um emissário divino ainda pode ser revivido ou ressuscitado.",
      },
      {
        title: "Portal (SM)",
        text: "Um emissário divino de 10º nível pode ativar esta habilidade similar à magia (idêntica à magia homônima), embora somente alcance o plano natal da divindade patrona) uma vez por dia. Esta habilidade similar à magia funciona como a magia conjurada por um clérigo de nível equivalente ao nível de personagem do emissário divino.",
      },
      {
        title: "Emissários Divinos Caídos (regra especial)",
        text: "Nem todos os que seguem uma divindade alcançam os objetivos de seu patrono. É possível ser expulso (ou renunciar) ao serviço de uma divindade. Os efeitos de tornar-se um emissário divino caído são os seguintes: o personagem perde todas as habilidades de comunhão, portal e audiência; o antigo emissário divino conserva suas propriedades de união mística, aparência alterada e quaisquer presentes divinos; dependendo das circunstâncias do desligamento, o emissário divino pode ou não ser caçado por emissários da divindade em questão; a classe emissário divino fica indisponível ao personagem; nenhuma outra divindade apoiará um ex-emissário divino; o emissário divino pode ser reempossado pela divindade somente após completar alguma grande missão determinada pelo Mestre. Geralmente, a divindade torna todo o processo ainda mais difícil, apenas para testar a devoção do emissário divino caído.",
      },
    ],
    page: 28,
  },
  {
    id: "planos-prestige-viajante-planar",
    name: "Viajante Planar",
    hitDie: "d4",
    prerequisites:
      "Talentos: Criar Item Maravilhoso. Perícias: 10 graduações em Concentração, 4 graduações em Conhecimento (planos), 10 graduações em Identificar Magia. Especial: Deve ter visitado um Plano Interior ou Exterior antes de adquirir esta classe de prestígio.",
    classSkills:
      "Alquimia (Int), Atuação (Car), Cavalgar (Des), Concentração (Con), Conhecimento (escolhidos separadamente) (Int), Diplomacia (Car), Espionar (Int), Falar Idiomas (Nenhuma), Identificar Magias (Int), Intimidar (Car), Natação (For), Obter Informação (Car), Oficios (Int), Procurar (Int), Profissão (Sab), Senso de Direção (Sab). Consulte o Capítulo 4: Perícias, no Livro do Jogador, para obter as descrições das perícias.",
    skillPoints: "4 + modificador de Inteligência",
    progression: [
      { level: 1, bab: "+0", fort: 2, ref: 0, will: 0, special: "Viagem planar 1/dia" },
      { level: 2, bab: "+1", fort: 3, ref: 0, will: 0, special: "Analisar portal" },
      { level: 3, bab: "+1", fort: 3, ref: 1, will: 1, special: "Sobrevivência planar" },
      { level: 4, bab: "+2", fort: 4, ref: 1, will: 1, special: "Estabilidade morfológica" },
      { level: 5, bab: "+2", fort: 4, ref: 1, will: 1, special: "Conceder sobrevivência planar" },
      { level: 6, bab: "+3", fort: 5, ref: 2, will: 2, special: "Controlar fluxo planar" },
      { level: 7, bab: "+3", fort: 5, ref: 2, will: 2, special: "Telepatia" },
      { level: 8, bab: "+4", fort: 6, ref: 2, will: 2, special: "Viagem planar ilimitada" },
      { level: 9, bab: "+4", fort: 6, ref: 3, will: 3, special: "Trocar Área Planar" },
      { level: 10, bab: "+5", fort: 7, ref: 3, will: 3, special: "Semente do semiplano" },
    ],
    classFeatures: [
      {
        title: "Usar Armas e Armaduras",
        text: "Os viajantes planares não sabem usar qualquer tipo de arma ou armadura adicional.",
      },
      {
        title: "Viagem Planar (SM)",
        text: "Um viajante planar tem a habilidade de usar viagem planar (como a magia conjurada por um feiticeiro com seu nível de personagem) uma vez por dia. No 8º nível, o viajante pode utilizar esta habilidade sem limite diário.",
      },
      {
        title: "Conjuração",
        text: "Um viajante planar nunca abandona seu treinamento mágico, desenvolvendo-o junto com suas habilidades planares. Portanto, quando o personagem atinge o 2º, 4º, 6º e 8º níveis, ele adquire mais magias diárias (e magias conhecidas, quando aplicável), como se estivesse avançando um nível na sua classe de conjurador anterior. Entretanto, ele não recebe qualquer outro benefício daquela classe (Expulsar/Fascinar mortos-vivos, talentos metamágicos ou de criação de itens, etc.). Essencialmente, isso significa que o nível de viajante planar é somado ao nível de outra classe capaz de conjurar magias do personagem e, depois disso, sua quantidade de magias diárias, suas magias conhecidas e seu nível de conjurador são determinados. Se um personagem possuía mais de uma classe de conjurador antes de se tornar um viajante planar, ele deve escolher qual classe será afetada para determinar suas magias por dia quando adquirir um novo nível na classe de prestígio.",
      },
      {
        title: "Analisar Portal (SM)",
        text: "No 2º nível, um viajante planar adquire a habilidade de analisar portal como uma habilidade similar à magia. Ele pode fazer isso uma vez por dia a cada nível de viajante planar. Esta habilidade funciona como a magia conjurada por um feiticeiro de nível equivalente ao maior nível de conjurador do viajante.",
      },
      {
        title: "Sobrevivência Planar (Ext)",
        text: "No 3º nível e superiores, um viajante planar adquire sintonia com a natureza dos planos que visita e torna-se pessoalmente imune aos seus efeitos naturais. Qualquer efeito que seria neutralizado pela magia prevenir efeitos planares também é negado pela habilidade sobrevivência planar. O viajante planar torna-se imune aos fogos \"normais\" do Plano Elemental do Fogo, mas as formas de ataques baseadas em fogo e áreas excepcionalmente chamejantes ainda o afetam. Como esta habilidade extraordinária é o resultado da sintonia com um plano em particular, o viajante planar permanece vulnerável ao mesmo tipo de ataque em outros planos onde esta forma de ataque não seja parte da ordem natural. O fogo de outros planos, incluindo o Plano Material, ainda afeta normalmente.",
      },
      {
        title: "Estabilidade Morfológica (Ext)",
        text: "No 4º nível, um viajante planar adquire a habilidade de impor sua vontade nos arredores de forma limitada. Em planos com a característica mutável (como o Limbo na cosmologia de D&D) ou morfologia mágica (como o Plano das Sombras), o terreno se estabiliza em torno do viajante. Ele afeta automaticamente o terreno em um raio de 9 m por nível do viajante. Esta área se move junto com o personagem e centraliza-se nele. As estruturas permanentes no plano não são afetadas e o terreno ainda pode ser modificado por atividades normais.",
      },
      {
        title: "Conceder Sobrevivência Planar (Sob)",
        text: "Um viajante planar de 5º nível ou superior pode compartilhar sua habilidade de sobrevivência planar através do toque com uma quantidade de criaturas equivalente ao nível de prestígio. Uma vez concedida, a habilidade permanece ativa durante 24 horas. Caso seus companheiros viajem para um plano diferente do plano atual do personagem, a proteção desaparece imediatamente.",
      },
      {
        title: "Controlar Fluxo Planar (Sob)",
        text: "No 6º nível, um viajante planar adquire uma compreensão instintiva de como as criaturas interagem com o plano onde estão, e pode explorar pequenas mudanças nas barreiras entre planos. O nível de conjurador do viajante planar é considerado quatro vezes superior para conjurar as magias âncora dimensional e expulsão.",
      },
      {
        title: "Telepatia (Sob)",
        text: "Um viajante planar de 7º nível ou superior é capaz de se comunicar por telepatia com qualquer criatura num raio de 30 metros que possua um idioma.",
      },
      {
        title: "Trocar Área Planar (SM)",
        text: "No 9º nível, um viajante planar adquire a habilidade de mover seções da paisagem de um plano para outro. Uma área esférica com raio de até 30 m no nível de viajante planar, centralizada no personagem, pode ser deslocada desta forma. Quaisquer indivíduos podem realizar um teste de resistência de Vontade (CD 20) para anular completamente o deslocamento. Assim como a magia viagem planar, é impossível ter controle completo do local de destino. Quando o fragmento é transportado para o plano de destino, as características do novo plano permanecem ativas durante 1d4 rodadas. Por exemplo, uma parte do Plano Elemental do Fogo trazida ao Plano Material queimará brevemente (1d4 rodadas) antes de se dissipar. Por ser uma troca, uma área igual do plano de destino surge no plano de origem. Quando por uma troca, uma área igual do plano de origem aplica suas características à nova área em 1d4 rodadas. As áreas trocadas voltam aos seus planos originais em uma quantidade de dias equivalente a 10 + nível do viajante planar.",
      },
      {
        title: "Semente do Semiplano",
        text: "A semente do semiplano é um pequeno bolsão dimensional que cresce quando o viajante planar alcança o 10º nível. Esse bolsão geralmente é utilizado como base de operações. Um viajante planar só pode possuir um semiplano de cada vez, e não pode construir um novo a menos que todos os portais para o antigo sejam destruídos. O viajante planar deve possuir uma joia perfeita com valor de pelo menos 1.000 PO e trabalhar para o semiplano durante 100 dias consecutivos, 8 horas por dia. Ao completar o trabalho, a semente se converte num minúsculo semiplano esférico, com 30 cm de raio. Ele cresce rapidamente, adquirindo 30 cm de raio por dia até o máximo de 3 m x maior nível de conjurador do viajante. Após alcançar este tamanho, o semiplano continua crescendo mais lentamente, adquirindo 60 cm de raio por ano. Caso sua criação falhe, o semiplano deixa de crescer. O semiplano do viajante planar tem as seguintes características: tempo normal, alterável e magia normal. No momento da criação, o viajante planar pode determinar qualquer característica de gravidade, elemento ou tendência que deseje, e pode escolher se o plano é finito ou auto-contido. Embora o plano não seja mutável, o viajante tem controle total sobre a paisagem no momento da criação, portanto pode decidir se será uma terra deserta, montanhosa e amedrontadora, ou uma floresta bucólica. O terreno determinado no momento da criação estende-se conforme o semiplano cresce. Não seja possível colocar cumes agudos numa esfera de 30 cm, penhascos e picos aparecem conforme o semiplano cresce. O semiplano que cresce a partir da semente é vazio, forma que a construção da semente e do viajante planar deve providenciar as construções necessárias. Ele tem um único portal como entrada, e o viajante pode controlar o acesso à passagem. Os semiplanos são frequentemente utilizados como refúgios, laboratórios de pesquisa e prisões para determinadas bestas.",
      },
    ],
    page: 30,
  },
];
