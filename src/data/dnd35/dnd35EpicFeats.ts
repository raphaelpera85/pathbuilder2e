// ============================================================================
// D&D 3.5 — Livro dos Níveis Épicos (Epic Level Handbook, ed. BR), Capítulo 1:
// Personagens, Perícias e Talentos, seção "Descrição dos Talentos Épicos"
// (pp. 48+). Transcrição por leitura visual direta de páginas renderizadas
// em alta resolução (170dpi) — fonte é scan sem camada de texto.
//
// COBERTURA PARCIAL (lote 1, ordem alfabética A-At): este livro tem a
// Tabela 1-36 com ~150 talentos épicos nomeados (pp. 42-44 impressas); as
// descrições completas de benefício ficam na seção separada que começa na
// p.48. Este arquivo cobre apenas os primeiros 9 talentos com descrição
// completa lidos nesta sessão. GAP CONHECIDO: a Tabela 1-36 lista
// "Armadura de Pele", "Arquearia em Combate", "Ataque Atordoante
// Aprimorado" e "Ataque chi Aprimorado"/"Ataque Vorpal" entre "Aprimorar
// Magia" e "Ataque Cortante" (ordem alfabética), mas suas descrições não
// foram localizadas nas páginas 48-50 impressas lidas até agora — não
// inventar o conteúdo; retomar a busca (podem estar em outra página por
// quebra de coluna/layout) antes de declarar o capítulo completo.
// ============================================================================

export type Dnd35EpicFeatCategory = "epico" | "metamagico_epico" | "divino_epico" | "selvagem_epico" | "criacao_item_epico";

export interface Dnd35EpicFeat {
  id: string;
  name: string;
  category: Dnd35EpicFeatCategory;
  page: number;
  prerequisites: string[];
  benefit: string;
  normal?: string;
  special?: string;
}

export const DND35_EPIC_FEATS: Dnd35EpicFeat[] = [
  {
    id: "epic-feat-acelerar-magia-automatica",
    name: "Acelerar Magia Automática",
    category: "epico",
    page: 48,
    prerequisites: ["Acelerar Magia", "Identificar Magia 30 graduações", "habilidade para conjurar magias arcanas ou divinas de 9º nível"],
    benefit: "O personagem consegue conjurar todas as magias de nível 0, 1º, 2º e 3º níveis como magias aceleradas sem alterar a magia para um nível superior. O limite normal para a quantidade de magias aceleradas que o personagem é capaz de conjurar a cada rodada ainda se aplica. As magias com tempo de conjuração maior do que uma rodada completa não podem ser aceleradas. Esse talento não aumenta o tempo de execução das magias que normalmente exigem uma ação de rodada completa quando são alteradas por talentos metamágicos (incluindo as magias de feiticeiro e as magias conjuradas espontaneamente, como as magias de cura de um clérigo).",
    special: "O personagem pode adquirir esse talento diversas vezes. Sempre que escolher esse talento, as magias dos próximos três níveis mais baixos poderão ser aceleradas sem o ajuste de nível. Portanto, um mago que escolha esse talento duas vezes será capaz de acelerar as magias dos níveis 0 até 6 sem qualquer ajuste de nível para esses efeitos metamágicos.",
  },
  {
    id: "epic-feat-acesso-espontaneo-a-dominio",
    name: "Acesso Espontâneo a Domínio",
    category: "epico",
    page: 48,
    prerequisites: ["Sab 25", "Identificar Magia 30 graduações", "habilidade de conjurar magias divinas de 9º nível"],
    benefit: "O personagem pode converter espontaneamente qualquer magia de clérigo preparada (exceto magia de domínio) em magias do mesmo nível do domínio escolhido, da mesma forma que canaliza energia para converter magias preparadas em efeitos de cura.",
    special: "O personagem pode adquirir esse talento diversas vezes. Seus efeitos não são cumulativos. Sempre que escolher esse talento, ele se aplica a um domínio diferente.",
  },
  {
    id: "epic-feat-alpinista-lendario",
    name: "Alpinista Lendário",
    category: "epico",
    page: 49,
    prerequisites: ["Des 21", "Equilíbrio 12 graduações", "Escalar 24 graduações"],
    benefit: "O personagem pode ignorar qualquer penalidade existente de escalada acelerada ou rápida.",
    normal: "Sem esse talento, o personagem sofre -5 de penalidade nos testes de Escalar quando tentar percorrer seu deslocamento total durante uma escalada ou -20 de penalidade quando tentar percorrer o dobro do seu deslocamento total na mesma rodada.",
  },
  {
    id: "epic-feat-alquimia-superior",
    name: "Alquimia Superior",
    category: "epico",
    page: 49,
    prerequisites: ["Int 21+", "Alquimia 24 graduações"],
    benefit: "O personagem é capaz de criar itens e substâncias alquímicas mais poderosas que o normal. Sempre que criar um item alquímico ou substância, o personagem pode torná-lo mais poderoso que o normal, adicionando +20 na CD de criação e multiplicando o preço de mercado por 5. Se o item ou substância causar dano, duplique a quantidade de dano. Se o item ou substância não causar dano, duplique a duração do seu efeito. Se o item ou substância não causar dano e não tiver uma duração especificada (ou uma duração instantânea), duplique as dimensões da área afetada. Se o item ou substância não se encaixa em nenhuma dessas categorias, ele não pode ser aprimorado.",
  },
  {
    id: "epic-feat-aprimorar-magia",
    name: "Aprimorar Magia",
    category: "metamagico_epico",
    page: 49,
    prerequisites: ["Maximizar Magia"],
    benefit: "O personagem aumenta o limite de dano causado pelas suas magias. O dano das magias do personagem aumenta em 10 dados (para as magias em que o número de dados de dano equivale ao nível do conjurador, como bola de fogo) ou em 5 dados (quando o número de dados de dano equivale à metade do nível de conjurador, como luz cegante). Uma magia aprimorada ocupa o lugar de uma magia quatro níveis superiores. Por exemplo, uma bola de fogo aprimorada causaria 20d6 pontos de dano (em vez de 10d6). A magia luz cegante aprimorada inflige 10d8 pontos de dano (em vez de 5d8). Esse talento não afeta as magias que não calculam a quantidade de dados de dano conforme o nível ou metade do nível do conjurador, mesmo que o efeito da magia esteja essencialmente relacionado com o nível do personagem. Portanto, ele não afeta misseis mágicos (mesmo que o nível do personagem indique quantos projéteis são disparados), a flecha ácida de Melf (mesmo que o nível do conjurador determine durante quantas rodadas o ácido causará dano) ou criar chamas (mesmo que o conjurador some seu nível ao dano base de 1d4).",
    normal: "Sem esse talento, o personagem utiliza a quantidade de dados de dano indicada na descrição da magia.",
    special: "O personagem pode adquirir esse talento diversas vezes. Sempre que escolher esse talento, o dano máximo da magia aumenta em 10 ou 5 dados, conforme adequado à magia. Uma magia aprimorada duas vezes ocupa o lugar de uma magia de oito níveis superiores (então uma bola de fogo duas vezes aprimorada seria um efeito de 11º nível), e assim por diante.",
  },
  {
    id: "epic-feat-ataque-cortante",
    name: "Ataque Cortante",
    category: "epico",
    page: 50,
    prerequisites: ["For 23", "Sab 23", "Sucesso Decisivo Aprimorado (ataque desarmado)", "Ataque chi +2"],
    benefit: "O ataque desarmado do personagem é considerado uma arma afiada (margem de ameaça 19-20 para obter sucessos decisivos). A critério do personagem, qualquer ataque desarmado pode causar dano de concussão, mas perderá a afiada. Essa habilidade não se acumula com características similares (por exemplo, se outro efeito já concede a afiada ao ataque desarmado do personagem).",
  },
  {
    id: "epic-feat-ataque-da-ordem",
    name: "Ataque da Ordem",
    category: "epico",
    page: 50,
    prerequisites: ["Sab 19", "Ataque Desarmado Aprimorado", "Ataque Atordoante", "tendência Leal"],
    benefit: "O ataque desarmado do personagem é considerado uma arma ordeira (+2d6 pontos de dano contra criaturas Caóticas). Essa habilidade não se acumula com habilidades similares (por exemplo, se outro efeito já concede a habilidade ordeira ao ataque desarmado do personagem).",
  },
  {
    id: "epic-feat-ataque-de-oportunidade-furtivo",
    name: "Ataque de Oportunidade Furtivo",
    category: "epico",
    page: 50,
    prerequisites: ["Ataque Furtivo +8d6", "habilidade de classe oportunismo"],
    benefit: "Qualquer ataque de oportunidade que o personagem desferir será considerado um ataque furtivo.",
  },
  {
    id: "epic-feat-ataque-de-oportunidade-magico",
    name: "Ataque de Oportunidade Mágico",
    category: "epico",
    page: 50,
    prerequisites: ["Magias em Combate", "Reflexos em Combate", "Acelerar Magia", "Identificar Magia 25 graduações"],
    benefit: "Sempre que o personagem puder desferir um ataque de oportunidade, ele poderá conjurar e atacar com uma magia de toque em substituição ao ataque de oportunidade regular. A magia pode ser utilizada como se fosse conjurada normalmente.",
    normal: "Sem esse talento, o personagem só é capaz de realizar um ataque regular como ataque de oportunidade.",
  },
  {
    id: "epic-feat-ataque-despedacador",
    name: "Ataque Despedaçador",
    category: "epico",
    page: 50,
    prerequisites: ["Foco em Arma Épico (ataque desarmado)", "Foco em Arma (ataque desarmado)", "Concentração 25 graduações", "ataque chi +3"],
    benefit: "Quando o personagem estiver usando um ataque desarmado para quebrar um objeto com uma pressão repentina (e vez do dano normal), ele poderá realizar um teste de Concentração no lugar do teste de Força. A CD para quebrar não é afetada. O Ataque Despedaçador exige uma ação de rodada completa que provoca ataques de oportunidade. O personagem não pode usar esse talento para escapar de amarras (a menos que esteja preso de uma forma que permita desferir ataques desarmados).",
  },
];
