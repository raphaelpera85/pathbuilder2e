/**
 * Defensores da Fé (livro 3.0 em português), cap. 1, pp. 22-24: descrições das habilidades especiais de armaduras e escudos
 * (Tabela 1-7, preços em dnd35DefensoresMagicPrices.ts).
 * Lidas da imagem em resolução reduzida; regras 3.0: conferir com o DMG 3.5 antes de usar no criador.
 */
export type DefensoresArmorAbility = {
  name: string;
  casterLevel: string;
  prerequisites: string;
  /** Preço de mercado como impresso (modificador de bônus). */
  marketPrice: string;
  description: string;
};

export const DEFENSORES_ARMOR_ABILITY_TEXTS: DefensoresArmorAbility[] = [
  {
    name: "Absorção",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, restauração",
    marketPrice: "+4 de bônus",
    description:
      "As armaduras e escudos com esse encantamento sempre são pretos e sem brilho e parecem ter uma profundidade impossível de existir. Um conjunto de armadura ou escudo desse tipo absorve ataques que drenam habilidades ou níveis. O item consegue afetar uma quantidade de pontos de dano em habilidades ou níveis a cada dia equivalente ao seu bônus de melhoria. Ele também permite realizar testes de Fortitude contra ataques desse tipo que normalmente não permitem testes de resistência. Um teste bem-sucedido indica que o efeito do dreno foi reduzido à metade. As armaduras ou escudos de absorção não alteram os testes de resistência já permitidos contra os demais ataques.",
  },
  {
    name: "Alada",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, andar no ar",
    marketPrice: "+2 de bônus",
    description:
      "Uma armadura ou escudo com esse encantamento parece forjado com milhares de plumas iridescentes. Essa característica não afeta o peso do item, as penalidades da armadura ou demais estatísticas, mas permite que o usuário voe durante 50 minutos por dia, ininterruptos ou não. Em todos os aspectos, o efeito é idêntico à magia vôo conjurada sobre o portador, com deslocamento de 27 m (ou 18 m para armaduras médias ou pesadas) e capacidade de manobra boa.",
  },
  {
    name: "Antipatia",
    casterLevel: "15º",
    prerequisites: "Criar Armaduras e Armas Mágicas, antipatia",
    marketPrice: "+4 de bônus",
    description:
      "As armaduras ou escudos com esse encantamento têm a habilidade sobrenatural de afetar as criaturas levando em consideração a sua tendência ou seu tipo específico, conforme definido pelo criador (veja a magia antipatia no Livro do Jogador). É possível ativar o item uma vez por dia, usando uma ação padrão. As criaturas do tipo especificado numa área de 18 m devem obter sucesso num teste de resistência de Vontade (CD 24) ou fugirão do portador e não retornarão voluntariamente durante 2 horas. As criaturas afetadas que permanecerem na área sofrem -4 de penalidade de Destreza. A área de efeito se desloca com o usuário do item. Se o portador se mover e aproximar-se de uma criatura que havia fugido anteriormente, ela terá direito a realizar outro teste de resistência.",
  },
  {
    name: "Aquática",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, movimentação livre, respirar na água",
    marketPrice: "+2 de bônus, ou +3 de bônus com respirar na água",
    description:
      "As armaduras e escudos com esse encantamento são polidos e emitem um brilho esverdeado. Um conjunto de armadura ou escudo aquático permite que o usuário se desloque livremente na água sem a necessidade de testes de Natação. As regras de afogamento ainda se aplicam (veja a Regra de Afogamento, pág. 85 do Livro do Mestre), a menos que o item também seja encantado com respirar na água.",
  },
  {
    name: "Cegante",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, cegueira/surdez, luz cegante",
    marketPrice: "+1 de bônus",
    description:
      "As armaduras e escudos com esse encantamento emitem lampejos de luz duas vezes por dia, conforme o desejo do usuário. Todas as criaturas num raio de 6 m, exceto o usuário, precisam obter sucesso num teste de resistência de Reflexos (CD 14) ou ficarão cegas durante 1d4 rodadas.",
  },
  {
    name: "Comando",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, 5 níveis de classes de conjurador",
    marketPrice: "+2 de bônus",
    description:
      "A aparência dessas armaduras e escudos é sempre radiante e limpa, não importa as condições do ambiente ou qualquer tentativa de manchá-las ou obscurecê-las. Cobiçados por líderes militares de todas as facções, esses itens irradiam uma poderosa aura que concede +4 de bônus de competência ao Carisma e +2 de bônus de moral nos testes de resistência de Vontade de qualquer aliado num raio de 9 m. O encantamento também faz o usuário chamar muita atenção, impondo -6 de penalidade nos testes de Esconder-se.",
  },
  {
    name: "Controlar Mortos-Vivos",
    casterLevel: "13º",
    prerequisites: "Criar Armaduras e Armas Mágicas, controlar mortos-vivos",
    marketPrice: "+4 de bônus",
    description:
      "O usuário dessa armadura ou escudo é capaz de controlar até 26 DV de mortos-vivos por dia, similar a magia controlar mortos-vivos. Ele perderá o controle de qualquer morto-vivo sob sua influência ao amanhecer de cada dia. Os itens com esse encantamento parecem ser feitos de ossos; essa característica é apenas decorativa e não tem nenhum outro efeito.",
  },
  {
    name: "Convocação",
    casterLevel: "9º",
    prerequisites: "Criar Armaduras e Armas Mágicas, teletransporte",
    marketPrice: "+1 de bônus",
    description:
      "Esse poderoso encantamento permite que o usuário pronuncie uma palavra de comando e transporte a armadura ou escudo até ele usando uma ação padrão. As armaduras aparecem corretamente vestidas no final da ação; os escudos surgem no braço adequado. Nos demais aspectos, as armaduras ou escudos parecem totalmente normais.",
  },
  {
    name: "Drenar Energia",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, drenar temporário",
    marketPrice: "+2 de bônus",
    description:
      "Uma armadura ou escudo com esse encantamento permite que o usuário absorva níveis dos oponentes com um ataque de toque (para armaduras) ou um encontrão (para escudos). O efeito é idêntico a magia drenar temporário, conjurada por um mago de 7º nível, exceto pela necessidade do ataque de toque. Esses itens sempre têm a imagem de um vampiro ameaçador esculpida na parte frontal.",
  },
  {
    name: "Etérea, pessoal",
    casterLevel: "9º",
    prerequisites: "Criar Armaduras e Armas Mágicas, passeio etéreo",
    marketPrice: "+3 de bônus",
    description:
      "A primeira variação gera um efeito semelhante a magia passeio etéreo, conjurada por um clérigo de 9º nível, mas afeta somente o usuário. As armaduras ou escudos parecem translúcidos e sem substância, exceto no Plano Etéreo, onde lembram os itens comuns.",
  },
  {
    name: "Etérea, contato",
    casterLevel: "11º",
    prerequisites: "Criar Armaduras e Armas Mágicas, forma etérea",
    marketPrice: "+4 de bônus",
    description:
      "A segunda variação gera um efeito semelhante a magia forma etérea, conjurada por um clérigo de 11º nível, afetando o usuário e qualquer criatura em contato com ele. As armaduras ou escudos parecem translúcidos e sem substância, exceto no Plano Etéreo, onde lembram os itens comuns.",
  },
  {
    name: "Feitiço",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, enfeitiçar monstros, enfeitiçar pessoas ou animais",
    marketPrice: "+3 de bônus",
    description:
      "As armaduras e escudos com esse encantamento são projetados para serem funcionais e bonitos. O desenho da armadura aprimora a beleza física de qualquer usuário. Caso um oponente tente golpear o usuário da armadura ou do escudo, ele precisa obter sucesso num teste de resistência contra a magia enfeitiçar adequada (enfeitiçar monstros ou enfeitiçar pessoas ou animais), conforme o tipo de oponente. Se o oponente atingir o usuário em combate corpo a corpo, ele recebe +4 de bônus nesse teste de resistência.",
  },
  {
    name: "Glacial",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, lentidão, raio de gelo",
    marketPrice: "+3 de bônus",
    description:
      "Uma armadura ou escudo com esse encantamento parece forjado de gelo puro. O encantamento gera dois efeitos. Primeiro, ele simula a magia lentidão conjurada por um mago de 5º nível; esse efeito atinge os primeiros cinco oponentes que se aproximarem a 9 m ou menos do usuário. Segundo, o portador é capaz de conjurar um raio de gelo como um mago de 5º nível até cinco vezes por dia. O raio é disparado da parte frontal da armadura ou do escudo.",
  },
  {
    name: "Luminosa",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, luz do dia",
    marketPrice: "+2 de bônus",
    description:
      "Uma armadura ou escudo com esse encantamento concede o brilho equivalente a magia luz do dia durante 30 minutos por dia, divididos ou ininterruptamente. Com apenas um comando, a magia é ativada ou desativada; essa palavra de comando geralmente está gravada no interior da armadura ou do escudo. A menos que estejam ativos, esses itens parecem totalmente normais.",
  },
  {
    name: "Romper Mortos-Vivos",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, romper mortos-vivos",
    marketPrice: "+2 de bônus",
    description:
      "Os usuários dessas armaduras ou escudos são capazes de atacar mortos-vivos quatro vezes por dia com a magia romper mortos-vivos, conjurada por um mago de 5º nível. Esses itens geralmente exibem o símbolo sagrado de uma divindade boa com muita proeminência.",
  },
  {
    name: "Sagrada",
    casterLevel: "8º",
    prerequisites: "Criar Armaduras e Armas Mágicas, Expulsar/Fascinar Mortos-vivos",
    marketPrice: "+2 de bônus",
    description:
      "Uma armadura ou escudo com esse encantamento não terá nenhum efeito a menos que o usuário seja capaz de Expulsar ou Fascinar Mortos-vivos. Nesse caso, o personagem utilizará essa habilidade de classe como se tivesse dois níveis a mais que o normal. Esses itens sempre são forjados para servos de uma divindade específica e apresentam seu símbolo sagrado em destaque.",
  },
  {
    name: "Terror",
    casterLevel: "7º",
    prerequisites: "Criar Armaduras e Armas Mágicas, medo",
    marketPrice: "+2 de bônus",
    description:
      "Uma armadura ou escudo do terror gera uma aura de medo em volta do usuário, semelhante a magia medo conjurada por um mago de 7º nível. Essa aura afeta todos os oponentes num raio de 12 m do portador. Esses itens parecem completamente normais, exceto para os adversários que fracassarem no teste de resistência — nesse caso, o usuário assumirá a forma ilusória dos piores medos do oponente.",
  },
  {
    name: "Velocidade",
    casterLevel: "5º",
    prerequisites: "Criar Armaduras e Armas Mágicas, velocidade",
    marketPrice: "+3 de bônus",
    description:
      "Esse encantamento concede ao usuário +4 de bônus de velocidade na CA e uma ação parcial extra por rodada, similar a magia velocidade. Essas armaduras vibram constantemente, e sua aparência é sempre embaçada.",
  },
];
