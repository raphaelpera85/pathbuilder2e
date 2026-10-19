/**
 * D&D 3.5 — Defensores da Fé (Defenders of the Faith, ed. BR), Capítulo 1
 * "Clérigos e Paladinos", seção "Canalização" (p.16). Transcrição por
 * leitura visual direta de páginas renderizadas em alta resolução
 * (200dpi) — fonte é scan com camada de texto OCR ruidosa, conferida
 * contra a imagem.
 *
 * COBERTURA: os 2 usos nomeados de Canalização de energia positiva/
 * negativa (via teste de Expulsão) descritos no livro: Proteger um
 * Santuário e Selar um Portal. A subseção "Tendências Neutras e
 * Canalização" (regra geral sobre quem pode canalizar qual energia) é
 * incluída como `neutralAlignmentRule` por ser uma regra geral curta,
 * não um "uso" nomeado por si.
 *
 * NÃO CATALOGADO (deliberadamente): a seção seguinte "Intervenção
 * Divina" (p.17) é inteiramente prosa de orientação ao Mestre sobre
 * quando e como uma divindade pode intervir na campanha (sem CDs,
 * tabelas ou nomes de habilidade específicos — mapeia nível de clérigo/
 * paladino a magias invocar criaturas de forma narrativa, não
 * mecânica), não introduz uma entidade de jogo nomeada e catalogável;
 * mesmo padrão de exclusão já aplicado a conteúdo de conselho de
 * Mestre em outros livros (ex.: "Conduzindo um Jogo Épico" do Livro
 * dos Níveis Épicos).
 */
export type DefensoresChannelingUse = {
  id: string;
  name: string;
  page: number;
  description: string;
};

export const DEFENSORES_CHANNELING_USES: DefensoresChannelingUse[] = [
  {
    id: "defensores-channeling-proteger-santuario",
    name: "Proteger um Santuário",
    page: 16,
    description:
      "O Livro do Jogador cita o exemplo de uma porta mágica usada para guardar um local sagrado. A porta somente abrirá caso um clérigo bom consiga canalizar energia positiva suficiente para expulsar um morto-vivo com 3 DV, embora seja destruída se um clérigo maligno realizar um teste de expulsão similar. Esse é um desafio adequado para um clérigo de 1º nível; ele precisará de um resultado 16 ou superior em seu teste de Expulsão. Os lugares mais importantes serão protegidos por defesas melhores, que exigirão resultados mais elevados no teste de Expulsão.",
  },
  {
    id: "defensores-channeling-selar-um-portal",
    name: "Selar um Portal",
    page: 16,
    description:
      "No centro do sagrado templo de Pelor, onde antes ficava o altar, agora profanado, uma coluna de fogo infernal ergue-se do solo e golpeia a cúpula superior. Diversos demônios caminham desde Baator até o Plano Material, atravessando a coluna flamejante, no intuito de propagar sua influência. Jozan, pisando no cadáver de um osyluth, brande seu símbolo sagrado e canaliza a magia de Pelor de volta ao templo abandonado. Enquanto o suor escorre por sua face, a energia positiva atravessa seu corpo, forçando o fechamento do portal extra-planar. Um portal como esse exigiria energia positiva suficiente para afetar um morto-vivo de 10 DV ou mais, dependendo do poder da conexão. Esse é um desafio adequado para um clérigo de 7º nível; ele precisará do resultado 19 ou superior em seu teste de Expulsão. Certamente, um portal até Baator estará rodeado por um efeito similar a profanar, que eleva a dificuldade do teste de Expulsão. Um clérigo que pretenda selar o portal deveria conjurar a magia consagrar (para anular o efeito de profanar), e então realizar a tentativa de expulsão sem penalidades. Um clérigo maligno efetivamente conseguiria ampliar o mesmo portal, elevando a dificuldade do teste de Expulsão do clérigo Bom para selar a passagem. Essa manobra funcionaria de maneira semelhante à habilidade de fortalecer mortos-vivos.",
  },
];

/** Regra geral curta (não é um "uso" nomeado, mas afeta quem pode usar Canalização). */
export const DEFENSORES_NEUTRAL_CHANNELING_RULE =
  "Para os clérigos Neutros, a possibilidade de canalizar energia positiva ou negativa é determinada por outros fatores, como sua divindade (nenhuma classe consegue canalizar os dois tipos de energia). Canalizar energia positiva é uma ação boa, enquanto canalizar energia negativa é uma ação maligna.";
