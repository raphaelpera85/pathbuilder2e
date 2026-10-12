/**
 * Defensores da Fé (livro 3.0 em português), cap. 1, pp. 24-26: descrições de armaduras, armas, bastão e itens maravilhosos específicos
 * (preços também na Tabela 1-8 a 1-11, dnd35DefensoresMagicPrices.ts). Lidas da imagem em resolução reduzida; regras 3.0:
 * conferir com o DMG 3.5 antes de usar no criador. Valores como impressos ("—" = sem peso; "n/d" = não disponível).
 */
export type DefensoresMagicItem = {
  name: string;
  category: "armadura" | "arma" | "bastão" | "item maravilhoso";
  casterLevel: string;
  prerequisites: string;
  marketPrice: string;
  weight?: string;
  description: string;
};

const CAM = "Criar Armaduras e Armas Mágicas";
const CIM = "Criar Item Maravilhoso";

export const DEFENSORES_SPECIFIC_MAGIC_ITEMS: DefensoresMagicItem[] = [
  {
    name: "Armadura Azul das Montanhas da Névoa Cristalina",
    category: "armadura",
    casterLevel: "9º",
    prerequisites: `${CAM}, resistência a elementos`,
    marketPrice: "20.960 PO",
    description:
      "Quando for encontrada pela primeira vez, aparentemente essa armadura estará ajustada para anões. De longe, seu material lembrará as escamas de um dragão azul. Na verdade, ela é uma brunea (obra prima) adornada para simular esse material raro. Ela concede +3 de bônus de melhoria na Classe de Armadura (além dos +4 de bônus comum, totalizando +7) e o usuário adquire resistência à eletricidade 15.",
  },
  {
    name: "Armadura do Cavalariço",
    category: "armadura",
    casterLevel: "6º",
    prerequisites: CAM,
    marketPrice: "10.670 PO",
    description:
      "Esse item é uma armadura de batalha primorosamente forjada para combatentes montados. Ela fornece +2 de bônus de melhoria na Classe de Armadura (somados aos +8 de bônus da armadura, totalizando +10), +1 de bônus de competência em todos os testes de Cavalgar do cavaleiro; além disso, concede +2 de bônus de aprimoramento na Destreza e +3 m adicionais no deslocamento da montaria (um bônus de competência).",
  },
  {
    name: "Armadura do Dragão Vermelho",
    category: "armadura",
    casterLevel: "9º",
    prerequisites: `${CAM}, resistência a elementos`,
    marketPrice: "35.200 PO",
    description:
      "Apesar de sua aparência, essa armadura não é feita com escamas de dragão vermelho. Ela é uma brunea (obra prima) com placas esmaltadas em vermelho vivo. Ela concede +3 de bônus de melhoria na Classe de Armadura (além dos +4 de bônus comum, totalizando +7) e o usuário adquire resistência a fogo 15.",
  },
  {
    name: "Aventail Dourado",
    category: "armadura",
    casterLevel: "5º",
    prerequisites: `${CAM}, Alquimia, escudo arcano`,
    marketPrice: "22.200 PO",
    description:
      "Esse item é uma benção para os trabalhadores de forjas. Ele parece um aventail de couro comum, mas emite um estranho brilho metálico quando exposto diretamente à luz. O aventail concede +2 de bônus de deflexão na Classe de Armadura do usuário. Um gnomo que o utilizar adquire redução de dano 5/+1 e +2 de bônus em todos os testes de resistência contra fogo e calor.",
  },
  {
    name: "Cota de Talas da Estabilidade",
    category: "armadura",
    casterLevel: "7º",
    prerequisites: `${CAM}, resistência`,
    marketPrice: "5.845 PO",
    description:
      "Essa armadura é idêntica a uma cota de talas normal, exceto quando usada por personagens Neutros. Nesse caso, o usuário será preenchido por um sentimento de calma e confiança; a armadura será uma cota de talas +2 que também concede +2 de bônus de resistência a todos os testes de resistência.",
  },
  {
    name: "Aguilhão do Domínio",
    category: "arma",
    casterLevel: "5º",
    prerequisites: `${CAM}, falar com animais`,
    marketPrice: "20.980 PO",
    weight: "4 kg",
    description:
      "Esse bastão de ferro tem 90 cm e permite ao portador falar com animais sem limite diário enquanto o empunhar. Se o personagem estiver montado e usando esse item, sua montaria recebe +2 de bônus de moral em todos os testes de resistência. O aguilhão do domínio também serve como uma maça pesada +1, mas apenas se o usuário estiver montado.",
  },
  {
    name: "Bastão de Batalha",
    category: "arma",
    casterLevel: "9º",
    prerequisites: `${CAM}, vento sussurrante`,
    marketPrice: "35.712 PO",
    weight: "4 kg",
    description:
      "Esse bastão de adamante tem 90 cm e serve como uma maça pesada +1. Ele concede +2 de bônus de moral nos testes de resistência contra efeitos de medo a todos os aliados num raio de 9 m e permite que o usuário entregue mensagens a qualquer conhecido num raio de 15 km, similar a magia vento sussurrante.",
  },
  {
    name: "Flecha da Visão Longínqua",
    category: "arma",
    casterLevel: "5º",
    prerequisites: `${CAM}; clariaudiência/clarividência`,
    marketPrice: "3.507 PO",
    weight: "—",
    description:
      "Os rangers, batedores, espiões e muitos elfos adoram essas flechas. Usando do uma ação de rodada completa para se concentrar, o usuário será capaz de enxergar os acontecimentos nos arredores da flecha, semelhante a magia clarividência. Cinco minutos depois de disparada contra um alvo e ativada, a flecha será reduzida a cinzas. Além disso, ela é uma flecha +1 em todos os demais aspectos.",
  },
  {
    name: "Virote da Demolição",
    category: "arma",
    casterLevel: "9º",
    prerequisites: `${CAM}, força do touro, telecinésia`,
    marketPrice: "3.157 PO",
    weight: "½ kg",
    description:
      "Esse é um virote de besta (obra prima) muito pesado e de ponta romba. Devido ao seu tamanho e peso, ele somente pode ser disparado com uma besta pesada. Caso atinja um alvo vivo, causará 3d6 pontos de dano e o alvo sofrerá a manobra Encontrão (considere que o virote é Grande, tem Força 25 e recebe +2 de bônus na manobra). Caso atinja um objeto inanimado, irá ignorar os primeiros 5 pontos de dureza do objeto e causará 3d6 pontos de dano. Se atingir uma porta, o virote tentará arrombá-la como se fosse um personagem com Força 29. O virote é destruído depois de atingir qualquer alvo.",
  },
  {
    name: "Bastão da Autoridade",
    category: "bastão",
    casterLevel: "9º",
    prerequisites: "Criar Bastão, comando",
    marketPrice: "20.576 PO",
    weight: "3 kg",
    description:
      "Esses itens têm várias utilidades, são protegidos com zelo e presenteados apenas àqueles com cargos ou autoridade permanentes na igreja ou àqueles em missões vitais. O usuário consegue canalizar energia positiva ou negativa como se pertencesse a quatro níveis superiores ao seu — um efeito muito útil para Expulsar/Fascinar Mortos-vivos ou abrir portas trancadas por fechaduras divinas. Além disso, três vezes por dia o portador é capaz de conjurar a magia comando como um clérigo de 9º nível.",
  },
  {
    name: "Amuleto da Memória",
    category: "item maravilhoso",
    casterLevel: "6º",
    prerequisites: CIM,
    marketPrice: "36.000 PO",
    weight: "—",
    description:
      "Uma vez por dia, o usuário desse amuleto é capaz de recuperar até seis níveis de magias divinas já conjuradas. É possível recuperar somente as magias preparadas e conjuradas no mesmo dia.",
  },
  {
    name: "Amuleto do Portal",
    category: "item maravilhoso",
    casterLevel: "9º",
    prerequisites: `${CIM}, viagem planar`,
    marketPrice: "64.000 PO",
    weight: "—",
    description:
      "Esse amuleto permite que o usuário retorne ao seu plano natal. O portador não tem controle sobre o local onde aterrissará. Se o personagem já estiver em seu plano natal, o amuleto é inútil.",
  },
  {
    name: "Bacia da Contemplação",
    category: "item maravilhoso",
    casterLevel: "6º",
    prerequisites: CIM,
    marketPrice: "44.800 PO",
    weight: "1 kg",
    description: "Essa bacia concede 100% de chance de obter uma resposta correta a qualquer personagem que conjure adivinhação usando-a.",
  },
  {
    name: "Bainha Sagrada",
    category: "item maravilhoso",
    casterLevel: "4º",
    prerequisites: `${CIM}, abençoar arma`,
    marketPrice: "6.400 PO",
    weight: "½ kg",
    description:
      "A aparência dessa bainha varia muito. Quando for encontrado, há 25% de chances de ser uma capa para machado e 50% de chances de ser uma bainha para alguma espada. No entanto, o usuário descobrirá que uma bainha sagrada é capaz de se adaptar a qualquer adaga, espada ou machado encaixado nela, inclusive sofrendo alterações para comportar armas duplas. Esse item manterá qualquer arma limpa e afiada. Além disso, o usuário pode embainhar sua arma, pronunciar a palavra de comando e conjurar abençoar arma sobre ela três vezes por dia.",
  },
  {
    name: "Braceletes do Aprisionamento",
    category: "item maravilhoso",
    casterLevel: "3º",
    prerequisites: `${CIM}, tornar inteiro`,
    marketPrice: "10.800 PO",
    weight: "½ kg",
    description:
      "Esses itens não são muito diferentes das outras braçadeiras mágicas. Com apenas um comando, os braceletes se juntam violentamente e permanecem atados até que outra palavra de comando seja pronunciada. Para se libertar dos braceletes do aprisionamento, considere-os com Força 30; a CD para o teste de Arte da Fuga é 35.",
  },
  {
    name: "Braço de Nyr",
    category: "item maravilhoso",
    casterLevel: "6º",
    prerequisites: `${CIM}, animar objetos, escudo arcano`,
    marketPrice: "12.800 PO",
    weight: "—",
    description:
      "Esse braço artificial é feito de mitral e pode repor o braço perdido de um personagem Bom. Ele não funcionará com personagens Neutros. Qualquer personagem Mau que tente atar o braço sofrerá 1d4 pontos de dano temporário na Destreza. Quando usado como substituto, o braço concede +2 de Força, +2 de Destreza e +2 de bônus de deflexão na Classe de Armadura. Em geral, 70% desses itens serão braços esquerdos e 30% serão braços direitos, mas existem rumores de exemplares raros que se adaptam ao usuário.",
  },
  {
    name: "Elmo da Visão",
    category: "item maravilhoso",
    casterLevel: "9º",
    prerequisites: `${CAM}, visão da verdade`,
    marketPrice: "91.600 PO",
    weight: "1,5 kg",
    description:
      "Esse elmo de metal parece inútil externamente, pois encobre os olhos do usuário. Porém, qualquer criatura que vestir o elmo será capaz de enxergar com perfeição. O elmo concede ao usuário os efeitos da magia visão da verdade e +1 de bônus intuitivo na Classe de Armadura.",
  },
  {
    name: "Espelho da Revelação",
    category: "item maravilhoso",
    casterLevel: "10º",
    prerequisites: `${CIM}, dissipar magia`,
    marketPrice: "48.000 PO",
    weight: "250 g",
    description:
      "Caso um extra-planar maligno seja refletido por esse espelho pequeno e octogonal, o item dissipará quaisquer magias ou efeitos de ilusão que ocultem a verdadeira natureza da criatura. Esse efeito é idêntico a dissipar magia conjurada por um clérigo de 10º nível. Caso o extra-planar esteja alerta ou tente desviar seu olhar do reflexo no espelho, considere a ação como um ataque visual (consulte a pág. 72 do Livro do Mestre).",
  },
  {
    name: "Manto da Floresta",
    category: "item maravilhoso",
    casterLevel: "9º",
    prerequisites: `${CIM}, caminhar em árvores`,
    marketPrice: "39.392 PO",
    weight: "1 kg",
    description:
      "Esse item élfico é um manto verde com ornamentos em couro marrom. Quando é vestido por um elfo, ele concede +4 de bônus de competência em testes de Equilíbrio e Escalar e permite o uso da magia caminhar em árvores três vezes por dia.",
  },
  {
    name: "Marca da Apostasia",
    category: "item maravilhoso",
    casterLevel: "n/d",
    prerequisites: "n/d",
    marketPrice: "38.880 PO",
    weight: "½ kg",
    description:
      "Muitas vezes, as divindades malignas marcam um indivíduo como um dos seus servos. Uma marca da apostasia pode ser feita com qualquer material, mas geralmente utiliza a mesma matéria prima da arma predileta do deus. Ela é um símbolo grande, de aproximadamente 20 cm, e gera vários efeitos: por um lado, é instantaneamente reconhecida por qualquer um como uma marca do mal; por outro, aumenta a habilidade de Fascinar Mortos-vivos do personagem, concedendo-lhe o talento Elevar Expulsão e permitindo que conjure a magia medo três vezes por dia como um mago de 10º nível. É impossível criar uma marca da apostasia: ela é um \"presente\".",
  },
  {
    name: "Máscara da Morte",
    category: "item maravilhoso",
    casterLevel: "5º",
    prerequisites: `${CIM}, compreensão de linguagens, falar com mortos`,
    marketPrice: "23.400 PO",
    weight: "—",
    description:
      "Essa máscara horripilante recobre completamente o rosto do usuário, tornando-o semelhante à face de um cadáver em decomposição. Enquanto usá-la, o personagem será capaz de falar com os mortos, independente do idioma, três vezes por dia.",
  },
  {
    name: "Símbolo Sagrado Maior",
    category: "item maravilhoso",
    casterLevel: "4º",
    prerequisites: `${CIM}, Expulsar/Fascinar Mortos-vivos como clérigo de 4º nível, participação de uma criatura celestial, abissal ou extra-planar a serviço da divindade pertinente`,
    marketPrice: "5.040 PO",
    weight: "½ kg",
    description:
      "Forjado com metais e gemas preciosas, esse item foi imbuído de poder divino por um servo da divindade pertinente. Um símbolo sagrado maior concede ao seu portador o talento Potencializar Expulsão, que pode ser utilizado sem limite diário.",
  },
  {
    name: "Tapa-olho Negro",
    category: "item maravilhoso",
    casterLevel: "6º",
    prerequisites: CIM,
    marketPrice: "8.800 PO",
    weight: "—",
    description:
      "Essa venda de couro preto não gera nenhum efeito extraordinário, exceto àqueles com sangue orc na veias. Qualquer orc ou meio-orc que usar esse tapa-olho sobre uma órbita ocular vazia ou um olho cego adquire +2 de bônus de competência em ataques a distância e testes de resistência contra ilusões.",
  },
];
