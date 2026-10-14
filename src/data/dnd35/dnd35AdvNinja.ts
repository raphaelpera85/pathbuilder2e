/**
 * D&D 3.5 — Livro Completo do Aventureiro (ed. BR), Capítulo 1: Classes
 * Base. Ninja (pp.16-20) — 3ª e última classe base do livro (Batedor,
 * Ladrão Arcano, Ninja). Variante de ladino baseada em "poder chi"
 * (ativações diárias tipo habilidade sobrenatural) e ataque súbito.
 */
export type CgAdvNinjaLevel = {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  acBonus: number;
  special: string;
};

export type CgAdvBaseClass3 = {
  id: string;
  name: string;
  page: number;
  hitDie: string;
  skillPoints: string;
  classSkills: string[];
  startingGold: string;
  levels: CgAdvNinjaLevel[];
  features: { name: string; text: string }[];
  description: string;
};

export const CG_ADV_NINJA: CgAdvBaseClass3 = {
  id: "cgadv-ninja",
  name: "Ninja",
  page: 16,
  hitDie: "d8",
  skillPoints: "6 + modificador de Int",
  classSkills: [
    "Abrir Fechaduras (Des)", "Acrobacia (Des)", "Arte da Fuga (Des)",
    "Blefar (Car)", "Concentração (Con)", "Conhecimento (qualquer) (Sab)",
    "Disfarçar-se (Car)", "Equilíbrio (Des)", "Escalar (For)",
    "Esconder-se (Des)", "Furtividade (Des)", "Identificar Magia (Int)",
    "Observar (Sab)", "Operar Mecanismo (Int)", "Ouvir (Sab)",
    "Prestidigitação (Des)", "Procurar (Int)",
  ],
  startingGold: "4d4 PO",
  levels: [
    { level: 1, bab: "+0", fort: 0, ref: 2, will: 0, acBonus: 0, special: "Poder chi, ataque súbito +1d6, encontrar armadilhas" },
    { level: 2, bab: "+1", fort: 0, ref: 3, will: 0, acBonus: 0, special: "Passo fantasma (invisível)" },
    { level: 3, bab: "+2", fort: 1, ref: 3, will: 1, acBonus: 0, special: "Ataque súbito +2d6, usar venenos" },
    { level: 4, bab: "+3", fort: 1, ref: 4, will: 1, acBonus: 0, special: "Salto maior" },
    { level: 5, bab: "+3", fort: 1, ref: 4, will: 1, acBonus: 1, special: "Ataque súbito +3d6" },
    { level: 6, bab: "+4", fort: 2, ref: 5, will: 2, acBonus: 1, special: "Acrobata +2, esquiva chi" },
    { level: 7, bab: "+5", fort: 2, ref: 5, will: 2, acBonus: 1, special: "Ataque súbito +4d6, escalar acelerado" },
    { level: 8, bab: "+6/+1", fort: 2, ref: 6, will: 2, acBonus: 2, special: "Ataque fantasma" },
    { level: 9, bab: "+6/+1", fort: 3, ref: 6, will: 3, acBonus: 2, special: "Ataque súbito +5d6, usar venenos aprimorados" },
    { level: 10, bab: "+7/+2", fort: 3, ref: 7, will: 3, acBonus: 2, special: "Passo fantasma (etéreo)" },
    { level: 11, bab: "+8/+3", fort: 3, ref: 7, will: 3, acBonus: 2, special: "Ataque súbito +6d6" },
    { level: 12, bab: "+9/+4", fort: 4, ref: 8, will: 4, acBonus: 2, special: "Acrobata +4, evasão" },
    { level: 13, bab: "+9/+4", fort: 4, ref: 8, will: 4, acBonus: 2, special: "Ataque súbito +7d6" },
    { level: 14, bab: "+10/+5", fort: 4, ref: 9, will: 4, acBonus: 2, special: "Mente fantasmagórica" },
    { level: 15, bab: "+11/+6/+1", fort: 5, ref: 9, will: 5, acBonus: 3, special: "Ataque súbito +8d6" },
    { level: 16, bab: "+12/+7/+2", fort: 5, ref: 10, will: 5, acBonus: 3, special: "Visão fantasmagórica" },
    { level: 17, bab: "+12/+7/+2", fort: 5, ref: 10, will: 5, acBonus: 3, special: "Ataque súbito +9d6" },
    { level: 18, bab: "+13/+8/+3", fort: 6, ref: 11, will: 6, acBonus: 3, special: "Acrobata +6, esquiva chi maior" },
    { level: 19, bab: "+14/+9/+4", fort: 6, ref: 11, will: 6, acBonus: 3, special: "Ataque súbito +10d6" },
    { level: 20, bab: "+15/+10/+5", fort: 6, ref: 12, will: 6, acBonus: 4, special: "Caminhada fantasma" },
  ],
  features: [
    { name: "Usar Armas e Armaduras", text: "Um ninja é proficiente com armas simples, kama, nunchaku, sai, shuriken, siangham e espada curta. Ninjas não são proficientes com nenhum tipo de armadura ou escudo." },
    { name: "Bônus na CA (Ext)", text: "Quando não estiver vestindo armadura, nem portando uma carga média ou pesada, um ninja recebe um bônus de esquiva na Classe de Armadura, conforme a Tabela 1-4 (começando em +1 no 5º nível, subindo até +4 no 20º nível). Esse bônus não se aplica se o ninja estiver flanqueado, surpreendido ou incapaz de se beneficiar de seu bônus de Destreza na CA." },
    { name: "Poder Chi (Sob)", text: "Um ninja é capaz de canalizar seu chi para manifestar poderes especiais de furtividade e mobilidade. Ele pode usar seus poderes chi uma quantidade de vezes por dia equivalente à metade de seu nível de classe (mínimo 1) mais seu bônus de Sabedoria (se houver). Os poderes chi só podem ser empregados se o personagem não estiver vestindo armadura, nem portando uma carga média ou pesada. Desde que o total de chi do ninja não esteja esgotado (ou seja, desde que ainda tenha pelo menos uma ativação diária), ele receberá +2 de bônus em seus testes de resistência de Vontade. Os poderes chi do ninja incluem o passo fantasma, a esquiva chi, o ataque fantasma, a esquiva chi maior e a caminhada fantasma." },
    { name: "Ataque Súbito (Ext)", text: "Se um ninja conseguir atingir um oponente incapaz de se defender adequadamente de seu ataque, ele será capaz de golpear seu ponto vital e causar mais dano. Sempre que a vítima não puder se beneficiar de seu bônus de Destreza na CA (existente ou não), o personagem inflige +1d6 pontos de dano adicional com seu ataque. Esse valor aumenta em +1d6 pontos a cada dois níveis subsequentes na classe. O ninja não é capaz de usar o ataque súbito quando estiver flanqueando um oponente, a menos que este não possa se beneficiar de seu bônus de Destreza na CA. Esse dano também se aplica aos ataques à distância contra alvos num raio de 9 m. As criaturas com camuflagem, sem anatomia discernível ou imunes ao dano adicional causado por sucessos decisivos não podem ser alvo de um ataque súbito. O ninja não consegue empregar o ataque súbito para causar dano por contusão. As armas que só causam esse tipo de dano não infligem o dano adicional são utilizadas para desferir um ataque súbito. O dano adicional do ataque súbito se acumula com o dano adicional do ataque furtivo sempre que for possível aplicar as duas habilidades contra o mesmo alvo." },
    { name: "Encontrar Armadilhas (Ext)", text: "Os ninjas são capazes de usar a perícia Procurar para encontrar armadilhas quando a Classe de Dificuldade é superior a 20 e a perícia Operar Mecanismo para desativar armadilhas mágicas. Consulte a habilidade homônima do ladino, no Capítulo 3 do Livro do Jogador." },
    { name: "Passo Fantasma (Sob)", text: "A partir do 2º nível, o ninja é capaz de gastar uma ativação diária de seu poder chi para se tornar invisível durante 1 rodada. O emprego dessa habilidade é uma ação rápida que não provoca ataques de oportunidade. No 10º nível, o ninja consegue se tornar etéreo, em vez de invisível, quando usar o passo fantasma." },
    { name: "Usar Venenos (Ext)", text: "No 3º nível e superiores, o ninja nunca corre o risco de se envenenar acidentalmente enquanto aplica veneno sobre uma arma. A partir do 9º nível, o ninja consegue aplicar veneno sobre uma arma como uma ação de movimento (normalmente, aplicar um veneno é uma ação padrão)." },
    { name: "Salto Maior (Sob)", text: "A partir do 4º nível, o ninja sempre realiza os testes da perícia Saltar como se estivesse correndo e possuísse o talento Corrida, o que lhe permite saltos longos sem tomar distância e com +4 de bônus. Essa habilidade só pode ser usada se o personagem não estiver usando armadura, nem portando uma carga média ou pesada." },
    { name: "Acrobata (Ext)", text: "A partir do 6º nível, o ninja recebe +2 de bônus nos testes de Escalar, Saltar e Acrobacia. Esse bônus aumenta para +4 no 12º nível e +6 no 18º nível." },
    { name: "Esquiva Chi (Sob)", text: "No 6º nível e superiores, o ninja é capaz de gastar uma ativação diária do seu poder chi para evitar ataques dos adversários. Ao ativar essa habilidade, a silhueta do personagem treme e se altera, concedendo-lhe camuflagem (20% de chance de falha) contra todos os ataques durante 1 rodada. O emprego dessa habilidade é uma ação rápida que não provoca ataques de oportunidade. Ver o invisível não surte efeito sobre a camuflagem concedida pela habilidade esquiva chi, mas a visão da verdade anula a chance de falha. Essa camuflagem não se acumula com aquela fornecida por outros efeitos que concedem camuflagem ou deslocamento. No 18º nível, a habilidade esquiva chi concede camuflagem total (50% de chance de falha)." },
    { name: "Escalar Acelerado (Ext)", text: "Um ninja de 7º nível ou superior pode subir ou descer paredes e superfícies inclinadas com grande velocidade. Ele é capaz de escalar usando seu deslocamento terrestre como uma ação de movimento, sem penalidades; no entanto, precisa começar e terminar a rodada numa superfície horizontal (como o solo ou um telhado). Caso o deslocamento não se encerre dessa forma, ele cairá, sofrendo o dano adequado à distância percorrida. O ninja precisa ter uma única mão livre para utilizar essa habilidade. Ela só pode ser empregada se o personagem não estiver usando armadura, nem portando uma carga média ou pesada." },
    { name: "Ataque Fantasma (Sob)", text: "A partir do 8º nível, o ninja é capaz de gastar uma ativação diária do seu poder chi para atingir criaturas incorpóreas ou etéreas como se fossem corpóreas. Ele também consegue empregar essa habilidade para atingir inimigos no Plano Material normalmente enquanto estiver etéreo (por exemplo, quando utilizar a habilidade passo fantasma). Ativar a habilidade ataque fantasma é uma ação de movimento que não provoca ataques de oportunidade. Ela afeta o próximo ataque desferido pelo ninja, desde que seja realizado antes do final do turno subsequente do personagem." },
    { name: "Evasão (Ext)", text: "Um ninja de 12º nível ou superior é capaz de evitar o dano de certos ataques mediante um teste de resistência de Reflexos (consulte a habilidade homônima do monge no Livro do Jogador). A única diferença na evasão do ninja é que ele somente consegue usar essa habilidade se não estiver vestindo uma armadura, nem portando uma carga média ou pesada." },
    { name: "Mente Fantasmagórica (Sob)", text: "No 14º nível, o ninja adquire uma resistência especial às magias da sub-escola videncia. Para detectar ou distinguir um ninja com uma dessas magias, o conjurador deve realizar um teste de conjurador (CD 20 + nível de classe do ninja). No caso de magias de videncia que abrangem uma área (como olho arcano), uma falha no teste indica que a magia funciona, mas o personagem simplesmente não é detectado. As tentativas de videncia cujo alvo específico seja o personagem serão totalmente ineficazes caso o teste fracasse." },
    { name: "Visão Fantasmagórica (Sob)", text: "A partir do 16º nível, o ninja consegue enxergar criaturas etéreas e invisíveis com a mesma facilidade com que observa as criaturas e objetos materiais." },
    { name: "Esquiva Chi Maior (Sob)", text: "No 18º nível, a habilidade esquiva chi do ninja concede camuflagem total (50% de chance de falha)." },
    { name: "Caminhada Fantasma (Sob)", text: "Um ninja de 20º nível pode gastar duas ativações diárias do seu poder chi para ingressar no Plano Etéreo durante períodos maiores de tempo. Essa habilidade funciona como a magia passeio etéreo, com nível de conjurador equivalente ao nível de classe do personagem." },
  ],
  description: "Os ninjas se movem pelas sombras, atacando os incautos e desaparecendo novamente com facilidade. Eles transitam nos locais que os infiltradores não alcançam, combinando seu treinamento para discrição e assassinato com uma mente concentrada. Seu treinamento rigoroso aguça seus espíritos e seus corpos, concedendo-lhes habilidades sobrenaturais de furtividade e transformando-os em fantasmas aos olhos de muitas pessoas. Embora os ninjas não tenham a resistência em combate de personagens marciais como os guerreiros e bárbaros, são ótimos em planejar conflitos para que ocorram em seus próprios termos, surgindo e desaparecendo aparentemente sem esforço. Historicamente, os ninjas são provenientes de clãs de assassinos e guerrilheiros do Japão feudal. Num cenário de fantasia, eles misturam um dom para a furtividade e infiltração com ataques de surpresa devastadores e métodos sobrenaturais para se esquivar de golpes. Embora as capacidades específicas da classe sejam diferentes daquelas atribuídas aos ninjas reais, elas correspondem à sua temível reputação como espiões, assassinos e artistas marciais.",
};
