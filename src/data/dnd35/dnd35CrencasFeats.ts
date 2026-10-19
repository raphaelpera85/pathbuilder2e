/**
 * D&D 3.0 — Forgotten Realms: Crenças e Panteões (ed. BR), Apêndice
 * "Descrição dos Talentos" (pp.214-217). Transcrição por leitura visual
 * direta e verificação com OCR em alta resolução do scan oficial.
 *
 * NOTA DE VERSÃO: Este livro pertence à linha 3.0 de Forgotten Realms,
 * com mecânicas de expulsão divina e talentos que foram precursores de
 * regras do Livro Completo do Divino (v35-div).
 *
 * COBERTURA COMPLETA (pp.214-217): 11 talentos:
 * 1. Acelerar Expulsão [Especial]
 * 2. Elevar Expulsão [Especial]
 * 3. Especialização Superior [Geral]
 * 4. Faz-Tudo [Geral]
 * 5. Força Divina [Divino]
 * 6. Ignorar Componentes [Metamágico]
 * 7. Magia Licantrópica [Geral]
 * 8. Magia de Alcance [Metamágico]
 * 9. Magia Sagrada [Metamágico]
 * 10. Potencializar Expulsão [Especial]
 * 11. Vingança Divina [Divino]
 */

export type Dnd35CrencasFeat = {
  id: string;
  name: string;
  category: "general" | "special" | "divine" | "metamagic";
  prerequisites: string;
  benefit: string;
  fullDescription: string;
  page: number;
};

export const DND35_CRENCAS_FEATS: Dnd35CrencasFeat[] = [
  {
    id: "crencas-feat-acelerar-expulsao",
    name: "Acelerar Expulsão",
    category: "special",
    prerequisites:
      "Habilidade de expulsar ou fascinar mortos-vivos, Car 13, Expulsão Adicional",
    benefit:
      "O personagem pode expulsar ou fascinar mortos-vivos como uma ação livre, sofrendo −4 de penalidade no teste de expulsão e no dano.",
    fullDescription:
      "O personagem consegue expulsar ou fascinar com um simples pensamento. O personagem pode expulsar ou fascinar mortos-vivos como uma ação livre, mas sofre −4 de penalidade nas jogadas de teste de expulsão e de dano. O personagem ainda consegue realizar apenas uma tentativa de expulsão por rodada. A utilização deste talento será possível apenas durante a tentativa de expulsão ou fascínio. Sua utilização em conjunto a outro talento divino não é válida.",
    page: 216,
  },
  {
    id: "crencas-feat-elevar-expulsao",
    name: "Elevar Expulsão",
    category: "special",
    prerequisites: "Car 13, Expulsão Adicional",
    benefit:
      "Adiciona até o nível de clérigo no teste de expulsão, subtraindo o mesmo valor da jogada de dano de expulsão.",
    fullDescription:
      "O personagem pode afetar mais mortos-vivos poderosos com suas tentativas de expulsão ou fascínio. Quando o personagem expulsar ou fascinar mortos-vivos, pode escolher um número até o nível de seu clérigo. Adicione o valor no seu teste de expulsão, subtraindo-o de sua jogada de dano. Se o personagem não for um clérigo, pode escolher um valor de até seu nível efetivo de clérigo.",
    page: 216,
  },
  {
    id: "crencas-feat-especializacao-superior",
    name: "Especialização Superior",
    category: "general",
    prerequisites: "Int 13, Especialista, bônus base de ataque +6",
    benefit:
      "Elimina o limite de +5 do talento Especialista, permitindo subtrair do ataque e somar à CA qualquer valor até o bônus base de ataque.",
    fullDescription:
      "O personagem dominou a arte da defesa em combate. Quando o personagem usar o talento Especialista para aprimorar sua Classe de Armadura, o número subtraído de seu ataque e somado à sua CA pode ser qualquer valor até seu bônus base de ataque. Esse talento elimina o valor máximo de +5 do talento Especialista.",
    page: 216,
  },
  {
    id: "crencas-feat-faz-tudo",
    name: "Faz-Tudo",
    category: "general",
    prerequisites: "Personagem de 8º nível",
    benefit:
      "O personagem pode utilizar qualquer perícia sem treinamento, até mesmo as que normalmente exigem treino.",
    fullDescription:
      "O personagem adquire conhecimento razoável até das perícias mais obscuras. O personagem pode utilizar qualquer perícia, até mesmo as que normalmente exigem treino.",
    page: 216,
  },
  {
    id: "crencas-feat-forca-divina",
    name: "Força Divina",
    category: "divine",
    prerequisites:
      "Habilidade de expulsar ou fascinar mortos-vivos, Car 13, For 13, Ataque Poderoso",
    benefit:
      "Gasta uma tentativa de expulsão para somar o modificador de Carisma no dano das armas por rodadas iguais ao bônus de Carisma.",
    fullDescription:
      "O personagem canaliza a energia divina para aumentar seu dano em combate. Seu personagem gasta uma de suas tentativas de expulsar mortos-vivos para adicionar o seu modificador de Carisma no dano da sua arma por um número de rodadas igual ao seu modificador de Carisma. Essa é uma habilidade sobrenatural.",
    page: 216,
  },
  {
    id: "crencas-feat-ignorar-componentes",
    name: "Ignorar Componentes",
    category: "metamagic",
    prerequisites: "Qualquer outro talento metamágico",
    benefit:
      "Conjura magias sem componentes materiais cujo custo seja de 1 PO ou inferior sem aumentar o nível da magia.",
    fullDescription:
      "O personagem pode conjurar magias sem componentes materiais. A magia conjurada com Ignorar Componentes não precisa de componentes materiais. Magias sem componentes materiais não são afetadas. Magias com componentes materiais com custo acima de 1 PO não são afetadas. A magia conjurada com esse talento ocupa espaço de uma magia de mesmo nível.",
    page: 216,
  },
  {
    id: "crencas-feat-magia-licantropica",
    name: "Magia Licantrópica",
    category: "general",
    prerequisites:
      "Licantropo, talento Controlar Forma Aprimorado ou Controlar Forma 8 graduações",
    benefit:
      "Conjura magias com componentes gestuais e verbais normalmente enquanto na forma animal da licantropia.",
    fullDescription:
      "O personagem consegue conjurar magias enquanto na forma animal. O personagem conjura magias com componentes verbais e gestuais normalmente enquanto na forma licantrópica animal (substituindo latidos/uivos e gestos de patas pelos componentes). É capaz de utilizar componentes materiais e focos que consiga segurar na forma animal.",
    page: 216,
  },
  {
    id: "crencas-feat-magia-de-alcance",
    name: "Magia de Alcance",
    category: "metamagic",
    prerequisites: "Nenhum",
    benefit:
      "Transforma uma magia de toque em raio com alcance de 9 metros (ataque de toque à distância), ocupando espaço 2 níveis superior.",
    fullDescription:
      "O personagem consegue conjurar magias de toque sem tocar o alvo da magia. O personagem pode conjurar uma magia que normalmente possui alcance de toque em qualquer alvo a até 9 m. A magia se torna um raio e o personagem deve obter sucesso em um ataque de toque à distância para atingir o oponente. Uma magia de alcance usa espaço de dois níveis acima da magia normal.",
    page: 216,
  },
  {
    id: "crencas-feat-magia-sagrada",
    name: "Magia Sagrada",
    category: "metamagic",
    prerequisites: "Conjurador divino",
    benefit:
      "Metade do dano de uma magia de dano é alimentado por poder divino puro, não sujeito a resistências a elementos. Ocupa espaço 2 níveis superior.",
    fullDescription:
      "Suas magias de dano são carregadas de poderes divinos. Metade do dano causado por qualquer magia sagrada é alimentada diretamente pelas entidades divinas, portanto não será afetada por efeitos como suportar elementos ou proteções similares. Uma magia sagrada ocupa o espaço de uma magia dois níveis superiores ao padrão. Somente conjuradores divinos podem selecionar esse talento.",
    page: 216,
  },
  {
    id: "crencas-feat-potencializar-expulsao",
    name: "Potencializar Expulsão",
    category: "special",
    prerequisites:
      "Habilidade de expulsar ou fascinar mortos-vivos, Car 13, Expulsão Adicional",
    benefit:
      "Sofre −2 de penalidade no teste de expulsão para somar +2d6 na jogada de dano de expulsão de mortos-vivos.",
    fullDescription:
      "O personagem é capaz de expulsar ou fascinar mais mortos-vivos com uma única tentativa de expulsão. Seu personagem consegue expulsar ou fascinar mais mortos-vivos do que o normal, mas tem mais dificuldade em atingir mortos-vivos com maior número de Dados de Vida. Se o personagem sofrer −2 de penalidade no teste de expulsão, ele pode adicionar 2d6 para a jogada de dano.",
    page: 217,
  },
  {
    id: "crencas-feat-vinganca-divina",
    name: "Vingança Divina",
    category: "divine",
    prerequisites: "Habilidade de expulsar mortos-vivos, Expulsão Adicional",
    benefit:
      "Gasta uma tentativa de expulsão para adicionar 2d6 de dano de energia sagrada nos ataques corpo a corpo contra mortos-vivos até o final da próxima ação.",
    fullDescription:
      "O personagem canaliza energia divina para causar dano adicional em combates contra mortos-vivos. Seu personagem gasta uma de suas tentativas de expulsar mortos-vivos para adicionar 2d6 pontos de energia sagrada em todas as jogadas de dano com ataques corpo a corpo com armas contra mortos-vivos até o final de sua próxima ação. Essa é uma habilidade sobrenatural.",
    page: 217,
  },
];
