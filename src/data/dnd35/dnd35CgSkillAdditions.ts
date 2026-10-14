/**
 * Seção "Perícias" do D&D 3.5 — O Livro Completo do Guerreiro (ed. BR),
 * fim do Capítulo 3 (pp.121-122). Complementa (não substitui) as
 * descrições de perícias do Livro do Jogador com usos novos relevantes
 * para combate.
 */
export type CgSkillAddition = {
  id: string;
  skillName: string;
  page: number;
  intro: string;
  entries: { title: string; text: string }[];
};

export const CG_SKILL_ADDITIONS: CgSkillAddition[] = [
  {
    id: "cg-skill-atuacao-mostra-de-armas",
    skillName: "Atuação (Mostra de Armas) (Car)",
    page: 121,
    intro: "O personagem foi treinado para realizar movimentos rápidos e esplendorosos com armas e pode demonstrar sua capacidade de combate como entretenimento. Essa categoria da Atuação abrange qualquer exibição com armas, desde rodopiar uma espada até arremessar adagas e facas. A despeito do nome da perícia, um personagem desarmado é capaz de utilizá-la, demonstrando técnicas de artes marciais incomuns ou lutando contra um oponente imaginário.",
    entries: [
      { title: "Teste", text: "Diferente das outras categorias de Atuação, a familiaridade do personagem com a arma (indicado pelo seu bônus base de ataque) é um fator importante para determinar o sucesso da exibição marcial. Adicione o método do BBA (arredondado para baixo) como um bônus de circunstância no teste de Atuação (mostra de armas) do personagem. O modificador de Carisma ainda afeta a jogada, idêntico a outra categoria de Atuação. Se o personagem não souber usar a arma exibida, sofre -4 de penalidade no teste da perícia." },
      { title: "Ação", text: "Varia. Caso esteja atuando para conseguir dinheiro de uma platéia, o teste de mostra de armas exige 4 horas, divididas em exibições de 20 minutos. Se estiver demonstrando sua capacidade marcial e tentando impressionar a platéia de um confronto de gladiadores (consulte o Capítulo 4), a exibição exige uma ação padrão." },
      { title: "Novas Tentativas", text: "Sim, mas similar às demais categorias de Atuação, cada tentativa subseqüente de um fracasso adiciona +2 na CD do teste de perícia para cada fracasso anterior." },
      { title: "Especial", text: "Os talentos a seguir concedem +2 de bônus nos testes de Atuação (mostra de armas) pertinente: Especialização em Combate, Foco em Arma, Foco em Arma Maior, Saque Rápido, Combater com Duas Armas e Ataque Giratório. Um bardo não pode utilizar Atuação (mostra de armas) com as habilidades de sua música de bardo (inspirar coragem, fascinar, etc.)." },
    ],
  },
  {
    id: "cg-skill-conhecimento-novos-usos",
    skillName: "Conhecimento (Int)",
    page: 122,
    intro: "Diversas categorias de conhecimento são úteis para um personagem combatente. Além dos testes descritos no Livro do Jogador, os seguintes aspectos de Conhecimento também serão úteis.",
    entries: [
      { title: "Arquitetura e Engenharia", text: "Se o personagem estiver em um ponto estratégico para observar a fortaleza do inimigo, um teste de Conhecimento (arquitetura e engenharia) com CD 20 revela um aspecto mais fraco da defesa. A cada 5 pontos na margem de sucesso acima da Classe de Dificuldade, o Mestre poderá fornecer outra sugestão de ataque contra a fortaleza. Se o guerreiro possuir um mapa preciso da fortaleza, ele recebe +5 de bônus de circunstância no teste." },
      { title: "História", text: "Um teste bem-sucedido de Conhecimento (história) com CD 15 revela os parâmetros básicos da organização de um exército específico. Por exemplo, um sucesso indicaria que os bugbear incluem um xamã em cada pelotão de 20 soldados ou que os generais élficos normalmente integram a cavalaria numa investida. Se o personagem estiver em um campo de batalha histórico ou nos arredores, poderá lembrar detalhes sobre combate realizado no local com um teste de Conhecimento (história) com CD 20. Por exemplo, ele saberia que os anões das Montanhas de Latão derrotaram as hordas de orcs provocando uma avalanche nas colinas da esquerda, e que a maioria dos orcs sobreviventes recuou para os túneis de lava em algum lugar adiante." },
      { title: "Local", text: "Um teste bem-sucedido de Conhecimento (local) com CD 10 é suficiente para identificar uma unidade militar ou família de nobres através da heráldica, caso sejam da região do personagem. Para reconhecer os brasões e flâmulas de terras distantes, é necessário um teste de Conhecimento (nobreza e realeza)." },
      { title: "Nobreza e Realeza", text: "Um teste bem-sucedido de Conhecimento (nobreza e realeza) é capaz de fornecer detalhes sobre a heráldica militar de terras distantes. Um teste com CD 25 revela a região do mundo (com exatidão de província ou cidade) que originou o brasão ou flâmula. Um teste com CD 30 indica o nome da unidade militar (ou seu comandante) ou da família de nobres." },
      { title: "Ação", text: "Normalmente, nenhuma. Na maioria dos casos, um teste de Conhecimento não exige uma ação — o personagem conhece a resposta ou não." },
      { title: "Novas Tentativas", text: "Não. O teste representa o conhecimento do personagem, e pensar repetidamente sobre o assunto não garante que ele descobrirá uma resposta que nunca aprendeu." },
      { title: "Sinergia", text: "Não existem bônus de sinergia para os Conhecimentos específicos descritos acima, mas o Livro do Jogador apresenta diversos modificadores que se aplicam às perícias de Conhecimento em geral." },
      { title: "Teste Sem Treinamento", text: "Um teste sem treinamento de Conhecimento é simplesmente um teste de Inteligência. Sem qualquer estudo, o personagem conhecerá apenas a cultura mundana (CD 10 ou inferior)." },
    ],
  },
  {
    id: "cg-skill-prestidigitacao-adaga-oculta",
    skillName: "Prestidigitação (Des)",
    page: 122,
    intro: "Se o personagem ocultar uma adaga na palma da mão, poderá surpreender seu adversário quando revelá-la inesperadamente em combate.",
    entries: [
      { title: "Teste", text: "Essa manobra exige que o personagem empunhe uma adaga, tenha o talento Saque Rápido e não esteja segurando nada na mão inábil. Ele deve enfrentar o mesmo adversário durante 2 rodadas consecutivas, para causar a impressão de que a mão inábil do personagem está vazia. No início da terceira rodada, no turno do atacante, ele deve realizar um teste de Prestidigitação, resistido pelo teste de Observar do oponente. Se obtiver sucesso, o defensor estará surpreendido para o próximo (e primeiro) ataque com a adaga." },
      { title: "Ação", text: "Diferente das demais utilizações da Prestidigitação, essa manobra é uma ação livre, devido ao talento Saque Rápido." },
      { title: "Novas Tentativas", text: "Não. Não importa se o teste de Prestidigitação fracassou ou obteve sucesso, nenhum inimigo cairá no mesmo truque duas vezes em um único combate." },
      { title: "Especial", text: "O talento Mãos Lépidas concede +2 de bônus nos testes de Prestidigitação." },
      { title: "Sinergia", text: "Se o personagem tiver 5 graduações ou mais em Blefar, recebe +2 de bônus de sinergia nos testes de Prestidigitação." },
    ],
  },
];
