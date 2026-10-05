// ============================================================================
// D&D 3.5 (pasta "D&D 3.5") — Defensores da Fé (edição brasileira): domínios de
// prestígio (Cap. 4, pp. 77-80), em português. Texto lido da imagem das
// páginas (OCR ruidoso só como apoio). Cada domínio: divindades, poder
// concedido e 9 magias com a descrição de uma linha. "novo" = marcada com †
// (magia nova descrita no livro). Aviso de versão: livro de 2000 (regras 3.0).
// Misticismo: nas magias 7 e 8 o jogador escolhe uma das duas conforme a
// tendência ("Blasfêmia/Palavra Sagrada", "Aura Sagrada/Aura Profana").
// Os deuses citados são do panteão padrão do PHB (Boccob, Pelor, Kord...).
// Pendente: magias novas de clérigo/paladino/druida/ranger (pp. 76-77, 81-92).
// ============================================================================

export interface DefensoresDomainSpell {
  level: number;
  name: string;
  description: string;
  novo?: true;
}

export interface DefensoresPrestigeDomain {
  id: string;
  name: string;
  deities: string[];
  grantedPower: string;
  spells: DefensoresDomainSpell[];
}

const s = (level: number, name: string, description: string, novo = false): DefensoresDomainSpell => (novo ? { level, name, description, novo: true } : { level, name, description });

export const DEFENSORES_PRESTIGE_DOMAINS: DefensoresPrestigeDomain[] = [
  {
    id: "defensores-dominio-adivinhacao",
    name: "Adivinhação",
    deities: ["Boccob", "Obad-Hai", "Pelor", "Vecna"],
    grantedPower: "Suas magias de Adivinhação recebem +2 no nível de conjurador.",
    spells: [
      s(1, "Identificação", "Determina uma habilidade de um item mágico."),
      s(2, "Augúrio", "Descobre se uma ação será boa ou ruim."),
      s(3, "Adivinhação", "Oferece conselhos úteis sobre as ações propostas."),
      s(4, "Observação", "Espiona um alvo à distância."),
      s(5, "Comunhão", "Divindade responde uma pergunta por nível (sim ou não)."),
      s(6, "Lendas e Histórias", "Descubra histórias sobre uma pessoa, local ou objeto."),
      s(7, "Observação Aprimorada", "Como observação, só que mais rápido e com duração maior."),
      s(8, "Discernir Localização", "Descobre o local exato de uma criatura ou objeto."),
      s(9, "Sexto Sentido", "\"Sexto sentido\" lhe avisa sobre um perigo iminente."),
    ],
  },
  {
    id: "defensores-dominio-comunidade",
    name: "Comunidade",
    deities: ["Corellon Larethian", "Garl Glittergold", "Pelor", "St. Cuthbert", "Yondalla"],
    grantedPower: "Você pode conjurar acalmar emoções uma vez por dia, como uma habilidade similar a magia, e ainda recebe +2 de bônus em qualquer teste de Diplomacia.",
    spells: [
      s(1, "Benção", "Os aliados recebem +1 para ataques e testes de resistência contra medo."),
      s(2, "Proteger Outro", "Você sofre metade do dano dirigido ao alvo."),
      s(3, "Oração", "Os aliados recebem +1 em várias jogadas e os inimigos sofrem -1."),
      s(4, "Condição", "Monitora a condição e a posição dos aliados."),
      s(5, "Ligação Telepática de Rary", "Ligação que permite aos aliados se comunicarem."),
      s(6, "Banquete de Heróis", "Produz comida para 1 criatura/nível, cura e abençoa."),
      s(7, "Refúgio", "Altera um item para que transporte seu usuário até você."),
      s(8, "Cura Completa em Massa", "Como cura completa, mas para vários alvos."),
      s(9, "Milagre", "Pede a intervenção de uma divindade."),
    ],
  },
  {
    id: "defensores-dominio-criacao",
    name: "Criação",
    deities: ["Corellon Larethian", "Garl Glittergold", "Moradin", "Obad-Hai", "Pelor", "Vecna", "Yondalla"],
    grantedPower: "Suas magias de Conjuração [criação] recebem +2 no nível de conjurador.",
    spells: [
      s(1, "Criar Água", "Cria 8 litros/nível de água pura."),
      s(2, "Imagem Menor", "Cria ilusões visuais e sonoras."),
      s(3, "Criar Alimentos", "Alimenta três humanos (ou um cavalo)/nível."),
      s(4, "Criar Itens Efêmeros", "Cria um objeto de tecido ou madeira."),
      s(5, "Criar Itens Temporários", "Como criar itens efêmeros, mas também pedra e metal."),
      s(6, "Banquete de Heróis", "Produz comida para 1 criatura/nível, cura e abençoa."),
      s(7, "Imagem Permanente", "Inclui visão, som e cheiro."),
      s(8, "Criar Itens Permanentes", "Como criar itens temporários, mas permanente.", true),
      s(9, "Gênese", "Cria um semi-plano limitado.", true),
    ],
  },
  {
    id: "defensores-dominio-dominacao",
    name: "Dominação",
    deities: ["Gruumsh", "Hextor", "St. Cuthbert", "Wee Jas"],
    grantedPower: "Você recebe o talento Foco em Magia (Encantamento).",
    spells: [
      s(1, "Comando", "Um alvo obedece a uma palavra de comando durante 1 rodada."),
      s(2, "Cativar", "Cativa todos num raio de 30 m + 3 m/nível."),
      s(3, "Sugestão", "Força o alvo a seguir um curso de ação."),
      s(4, "Dominar Pessoas", "Controla um humanóide telepaticamente."),
      s(5, "Comando Aprimorado", "Como comando, mas afeta um alvo/nível."),
      s(6, "Tarefa/Missão", "Como missão menor, mas afeta qualquer criatura."),
      s(7, "Sugestionar Multidões", "Como sugestão, mas um alvo/nível."),
      s(8, "Dominação Verdadeira", "Como dominar pessoas, mas aplica -4 de penalidade no teste.", true),
      s(9, "Escravo Monstruoso", "Como dominar pessoas, mas com efeito permanente e afeta qualquer criatura.", true),
    ],
  },
  {
    id: "defensores-dominio-exorcismo",
    name: "Exorcismo",
    deities: ["Corellon Larethian", "Heironeous", "Kord", "Moradin", "Pelor"],
    grantedPower:
      "Você adquire a habilidade sobrenatural de expulsar espíritos de corpos possuídos. O jogador realiza um teste de Carisma (1d20 + modificador de Carisma) e consulta a tabela 8-16, pág. 140 do Livro do Jogador, mas soma seu nível na classe de prestígio, seu nível de clérigo (se houver), mais seu nível de paladino -2 (se houver). Se o resultado obtido na tabela igualar ou superar os DVs da criatura invasora, ela será obrigada a abandonar o corpo. Caso o espírito pertença a um mago usando recipiente arcano, ele voltará ao recipiente. Caso seja um fantasma, a criatura se tornará etérea e flutuará. Em qualquer caso, a mesma vítima não poderá ser possuída pelo espírito durante um dia inteiro.",
    spells: [
      s(1, "Proteção Contra o Mal", "+2 na CA e testes de resistência, impede controle mental, isola elementais e seres extra-planares."),
      s(2, "Círculo Mágico Contra o Mal", "Como proteção contra o mal, mas com 3 m de raio e 10 min/nível."),
      s(3, "Remover Maldição", "Liberta objeto ou pessoa de qualquer maldição."),
      s(4, "Expulsão", "Força uma criatura a retornar para seu plano nativo."),
      s(5, "Dissipar o Mal", "+4 de bônus contra ataques de criaturas malignas."),
      s(6, "Banimento", "Expulsa 2 DV/nível de criaturas extra-planares."),
      s(7, "Palavra Sagrada", "Mata, paralisa, cega ou ensurdece alvos neutros ou maus."),
      s(8, "Aura Sagrada", "+4 na CA, +4 de testes de resistência e RM 25 contra magias malignas."),
      s(9, "Desatar", "Destrói magias de aprisionamento num raio de 60 m.", true),
    ],
  },
  {
    id: "defensores-dominio-gloria",
    name: "Glória",
    deities: ["Heironeous", "Pelor"],
    grantedPower: "+2 de bônus nos testes para Expulsar mortos-vivos e +1d6 no teste para calcular o dano de expulsão.",
    spells: [
      s(1, "Romper Mortos-vivos", "Causa 1d6 pontos de dano a um morto-vivo."),
      s(2, "Arma Mágica", "Uma arma recebe +1 de bônus."),
      s(3, "Luz Cegante", "Um raio causa 1d8 de dano/2 níveis, ou mais contra mortos-vivos."),
      s(4, "Destruição Sagrada", "Causa dano e cega criaturas malignas."),
      s(5, "Espada Sagrada", "Arma se torna +5 e causa dano dobrado contra seres malignos."),
      s(6, "Raio de Glória", "Um raio causa dano de energia positiva, em especial contra criaturas malignas e mortos-vivos.", true),
      s(7, "Raio de Sol", "Luz cega e causa 3d6 pontos de dano."),
      s(8, "Coroa da Glória", "O alvo recebe +4 Car e cativa os alvos.", true),
      s(9, "Portal", "Conecta dois planos para viagens ou invocação."),
    ],
  },
  {
    id: "defensores-dominio-inquisicao",
    name: "Inquisição",
    deities: ["Heironeous", "Moradin", "St. Cuthbert"],
    grantedPower: "+4 de bônus em qualquer teste de dissipar.",
    spells: [
      s(1, "Detectar o Mal", "Revela criaturas, magias ou objetos malignos."),
      s(2, "Zona da Verdade", "Os alvos na área não podem mentir."),
      s(3, "Detectar Pensamentos", "Permite captar pensamentos superficiais."),
      s(4, "Discernir Mentiras", "Revela mentiras deliberadas."),
      s(5, "Visão da Verdade", "Mostra todas as coisas em sua forma verdadeira."),
      s(6, "Proibição", "Impede que criaturas de outra tendência entrem na área."),
      s(7, "Ditado", "Mata, paralisa, deixa lento ou ensurdece alvos neutros ou caóticos."),
      s(8, "Aura Sagrada", "+4 na CA, +4 de testes de resistência e RM 25 contra magias malignas."),
      s(9, "Aprisionar a Alma", "Aprisiona o alvo dentro de uma gema."),
    ],
  },
  {
    id: "defensores-dominio-insanidade",
    name: "Insanidade",
    deities: ["Boccob", "Erythnul", "Vecna"],
    grantedPower:
      "Você adquire um \"valor de Insanidade\" equivalente a metade do seu nível de classe (some os níveis de clérigo ao nível na classe de prestígio). Para conjurar magias, determinar suas magias adicionais e CD de resistência, adicione esse valor à sua Sabedoria e utilize o resultado como Sabedoria efetiva. Para todos os demais propósitos, como testes de perícias e testes de resistência, subtraia esse valor da sua Sabedoria e use o resultado como Sabedoria efetiva. Isso significa que é muito difícil resistir às suas magias, mas em geral você não prestará nenhuma atenção ao seu ambiente e agirá com imprudência — ou mesmo com imprevisibilidade. Uma vez por dia, você poderá enxergar e agir com a clareza da insanidade genuína. Utilize seu valor de insanidade como um bônus numa única jogada que envolva Sabedoria, como um teste de Ouvir ou um teste de resistência de Vontade. É necessário declarar o uso do poder antes da jogada.",
    spells: [
      s(1, "Ação Aleatória", "Uma criatura age aleatoriamente durante uma rodada."),
      s(2, "Toque da Loucura", "Uma criatura fica pasma durante uma rodada/nível.", true),
      s(3, "Fúria", "+4 For, +4 Cons, +2 de bônus de moral em testes de resistência de Vontade.", true),
      s(4, "Confusão", "Obriga o alvo a agir de modo estranho durante uma rodada/nível."),
      s(5, "Raios de Malevolência", "Um raio/rodada pasma durante 1d3 rodadas.", true),
      s(6, "Assassino Fantasmagórico", "Ilusão temerária mata o alvo ou causa 3d6 pontos de dano."),
      s(7, "Insanidade", "O alvo sofre confusão contínua."),
      s(8, "Grito Enlouquecedor", "Alvo sofre -4 na CA, não pode usar escudos e seus testes de Reflexo exigem um resultado 20.", true),
      s(9, "Encarnação Fantasmagórica", "Como assassino fantasmagórico, mas afeta todos num raio de 9 m."),
    ],
  },
  {
    id: "defensores-dominio-invocacao",
    name: "Invocação",
    deities: ["Todos"],
    grantedPower: "Suas magias invocar criaturas consideram o dobro do seu nível de conjurador para determinar o alcance e a duração (mas não a quantidade de criaturas).",
    spells: [
      s(1, "Invocar Criaturas I", "Invoca um extra-planar para auxiliar o conjurador."),
      s(2, "Invocar Criaturas II", "Invoca um extra-planar para auxiliar o conjurador."),
      s(3, "Invocar Criaturas III", "Invoca um extra-planar para auxiliar o conjurador."),
      s(4, "Aliado Extra-planar Menor", "Negocia serviços com um ser extra-planar de 8 DV."),
      s(5, "Invocar Criaturas V", "Invoca um extra-planar para auxiliar o conjurador."),
      s(6, "Aliado Extra-planar", "Como aliado extra-planar menor, mas com até 16 DV."),
      s(7, "Invocar Criaturas VII", "Invoca um extra-planar para auxiliar o conjurador."),
      s(8, "Aliado Extra-planar Aprimorado", "Como aliado extra-planar menor, mas com até 24 DV."),
      s(9, "Portal", "Conecta dois planos para viagens ou invocação."),
    ],
  },
  {
    id: "defensores-dominio-mente",
    name: "Mente",
    deities: ["Boccob", "Vecna", "Wee Jas"],
    grantedPower: "+2 de bônus em testes de Blefar, Diplomacia, Mensagens Secretas, Leitura Labial e Sentir Motivação. +2 de bônus em testes de Vontade contra magias e efeitos de encantamento.",
    spells: [
      s(1, "Compreensão de Linguagens", "Entenda todos os idiomas falados e escritos."),
      s(2, "Detectar Pensamentos", "Permite captar pensamentos superficiais."),
      s(3, "Laço Telepático Menor", "Ligação telepática com um alvo num raio de 9 m, durante 10 min/nível.", true),
      s(4, "Discernir Mentiras", "Revela mentiras deliberadas."),
      s(5, "Ligação Telepática de Rary", "Ligação que permite aos aliados se comunicarem."),
      s(6, "Examinar Pensamentos", "Revela as memórias do alvo, uma pergunta/rodada.", true),
      s(7, "Aracnídeo Mental", "Vasculha os pensamentos de até oito criaturas.", true),
      s(8, "Limpar a Mente", "O alvo se torna imune a magias mentais/emocionais e observação."),
      s(9, "Encarnação Fantasmagórica", "Como assassino fantasmagórico, mas afeta todos num raio de 9 m."),
    ],
  },
  {
    id: "defensores-dominio-mestre-das-feras",
    name: "Mestre das Feras",
    deities: ["Ehlonna", "Obad-Hai"],
    grantedPower: "Você pode lançar falar com animais uma vez por nível a cada dia, com efeitos idênticos à magia. Esta é uma habilidade sobrenatural.",
    spells: [
      s(1, "Cativar Animais", "Adquire companheiros animais permanentes."),
      s(2, "Máscara Bestial", "Os animais e as bestas consideram o conjurador um semelhante.", true),
      s(3, "Transe Animal", "Fascina 2d6 DV de animais."),
      s(4, "Coração de Urso", "Um aliado/nível recebe +4 de Força e +1d4/nível pontos de vida.", true),
      s(5, "Ampliar Animais", "Um animal/dois níveis dobra de tamanho e DV."),
      s(6, "Invocar Aliado da Natureza III", "Invoca animais para auxiliar o conjurador."),
      s(7, "Forma Animal", "Um aliado/nível sofre metamorfose para o animal escolhido."),
      s(8, "Invocar Aliado da Natureza IV", "Invoca animais para auxiliar o conjurador."),
      s(9, "Alterar Forma", "Transforma você em qualquer criatura; pode mudar de forma uma vez por rodada."),
    ],
  },
  {
    id: "defensores-dominio-misticismo",
    name: "Misticismo",
    deities: ["Qualquer deus Bom ou Mau"],
    grantedPower: "Você aplica o seu modificador de Carisma (caso seja positivo) como bônus em todos os testes de resistência. Caso já tenha essa habilidade (paladinos, por exemplo), você adiciona +1 de bônus.",
    spells: [
      s(1, "Auxílio Divino", "Você recebe +1 de bônus/três níveis para ataques e dano."),
      s(2, "Arma Espiritual", "Arma mágica ataca sozinha."),
      s(3, "Aspecto da Divindade Menor", "O personagem se torna mais parecido com a forma de seu deus.", true),
      s(4, "Arma da Divindade", "+1 no ataque e dano com a arma do deus, além de uma habilidade especial.", true),
      s(5, "Força dos Justos", "Seu tamanho aumenta e você recebe +4 de Força."),
      s(6, "Aspecto da Divindade", "Como aspecto menor, mas você adquire qualidades celestiais ou abissais.", true),
      s(7, "Blasfêmia/Palavra Sagrada", "Mata, paralisa, enfraquece, ensurdece ou confunde criaturas boas/malignas."),
      s(8, "Aura Sagrada/Aura Profana", "+4 na CA, +4 de testes de resistência e RM 25 contra magias malignas/bondosas."),
      s(9, "Aspecto da Divindade Maior", "Como aspecto menor, mas adquire asas, valores de habilidade aprimorados, diversas resistências e imunidades.", true),
    ],
  },
  {
    id: "defensores-dominio-pestilencia",
    name: "Pestilência",
    deities: ["Erythnul", "Hextor", "Nerull", "Wee Jas"],
    grantedPower: "Imunidade aos efeitos de quaisquer doenças, embora os clérigos que tenham esse poder ainda possam transmitir doenças contagiosas.",
    spells: [
      s(1, "Desespero", "Um alvo sofre -2 para ataques, dano, testes de resistência e testes."),
      s(2, "Invocar Criaturas II", "Invoca 1d3 ratos atrozes abissais para auxiliar o conjurador."),
      s(3, "Praga", "Infecta um alvo com a doença escolhida."),
      s(4, "Envenenamento", "Toque causa 1d10 pontos de dano de Cons, que se repete após 1 min."),
      s(5, "Praga dos Ratos", "Convoca uma horda de ratos pestilentos.", true),
      s(6, "Maldição da Licantropia", "Causa licantropia temporária ao alvo.", true),
      s(7, "Flagelo", "Inflige uma doença que só pode ser curada magicamente, um alvo/nível.", true),
      s(8, "Criar Mortos-vivos Aprimorados", "Transforma um cadáver em múmia."),
      s(9, "Bando de Otyughs", "Cria 3d4 otyughs ou 1d3+1 otyughs Enormes.", true),
    ],
  },
  {
    id: "defensores-dominio-velocidade",
    name: "Velocidade",
    deities: ["Fharlanghn", "Olidammara"],
    grantedPower: "+2 de bônus de aprimoramento na Destreza, +2 de bônus de aprimoramento na Iniciativa, +3 m de deslocamento, mas apenas se utilizar armaduras leves. Essas são habilidades sobrenaturais.",
    spells: [
      s(1, "Nublar", "Os ataques têm 20% de chance de falhar."),
      s(2, "Agilidade Felina", "O alvo recebe 1d4+1 Des durante 1 hora/nível."),
      s(3, "Andar no Ar", "O alvo caminha no ar como se fosse sólido (sobe num ângulo de 45°)."),
      s(4, "Velocidade", "Ação parcial adicional e +4 na CA."),
      s(5, "Caminhar em Árvores", "Passe através de uma árvore para outra."),
      s(6, "Caminhar no Vento", "Você e seus aliados se transformam em vapores e viajam rápido."),
      s(7, "Velocidade em Massa", "Como velocidade, mas afeta 1 alvo/nível."),
      s(8, "Piscar", "Você desaparece e reaparece aleatoriamente durante 1 rodada/nível."),
      s(9, "Parar o Tempo", "Você age livremente durante 1d4+1 rodadas."),
    ],
  },
];
