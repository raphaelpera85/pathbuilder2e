/**
 * D&D 3.5 — Livro Completo do Aventureiro (ed. BR), Capítulo 1: Classes
 * Base. Batedor (pp.5-9) — primeira das 3 classes novas do livro
 * (Batedor, Ladrão Arcano, Ninja).
 */
export type CgAdvClassLevel = {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
};

export type CgAdvBaseClass = {
  id: string;
  name: string;
  page: number;
  hitDie: string;
  skillPoints: string;
  classSkills: string[];
  startingGold: string;
  levels: CgAdvClassLevel[];
  features: { name: string; text: string }[];
  description: string;
};

export const CG_ADV_BATEDOR: CgAdvBaseClass = {
  id: "cgadv-batedor",
  name: "Batedor",
  page: 5,
  hitDie: "d8",
  skillPoints: "6 + modificador de Int",
  classSkills: [
    "Acrobacia (Des)", "Arte da Fuga (Des)", "Cavalgar (Des)",
    "Conhecimento (geografia) (Int)", "Conhecimento (masmorras) (Int)",
    "Conhecimento (natureza) (Int)", "Equilíbrio (Des)", "Escalar (For)",
    "Esconder-se (Des)", "Falar Idioma (n/a)", "Furtividade (Des)",
    "Natação (For)", "Ofícios (Int)", "Operar Mecanismo (Des)",
    "Observar (Sab)", "Ouvir (Sab)", "Procurar (Int)", "Saltar (For)",
    "Sentir Motivação (Sab)", "Sobrevivência (Sab)", "Usar Cordas (Des)",
  ],
  startingGold: "5d4x10 PO",
  levels: [
    { level: 1, bab: "+0", fort: 0, ref: 2, will: 0, special: "Escaramuça (+1d6), encontrar armadilhas" },
    { level: 2, bab: "+1", fort: 0, ref: 3, will: 0, special: "Fortitude em combate +1, esquiva sobrenatural" },
    { level: 3, bab: "+2", fort: 1, ref: 3, will: 1, special: "Movimento rápido +3 m, escaramuça (+1d6, +1 CA), rastro invisível" },
    { level: 4, bab: "+3", fort: 1, ref: 4, will: 1, special: "Talento adicional" },
    { level: 5, bab: "+3", fort: 1, ref: 4, will: 1, special: "Evasão, escaramuça (+2d6, +1 CA)" },
    { level: 6, bab: "+4", fort: 2, ref: 5, will: 2, special: "Passo impecável" },
    { level: 7, bab: "+5", fort: 2, ref: 5, will: 2, special: "Escaramuça (+2d6, +2 CA)" },
    { level: 8, bab: "+6/+1", fort: 2, ref: 6, will: 2, special: "Camuflagem, talento adicional" },
    { level: 9, bab: "+6/+1", fort: 3, ref: 6, will: 3, special: "Escaramuça (+3d6, +2 CA)" },
    { level: 10, bab: "+7/+2", fort: 3, ref: 7, will: 3, special: "Sentido cego 9 m" },
    { level: 11, bab: "+8/+3", fort: 3, ref: 7, will: 3, special: "Fortitude em combate +2, movimento rápido +6 m, escaramuça (+3d6, +3 CA)" },
    { level: 12, bab: "+9/+4", fort: 4, ref: 8, will: 4, special: "Talento adicional" },
    { level: 13, bab: "+9/+4", fort: 4, ref: 8, will: 4, special: "Escaramuça (+4d6, +3 CA)" },
    { level: 14, bab: "+10/+5", fort: 4, ref: 9, will: 4, special: "Mimetismo" },
    { level: 15, bab: "+11/+6/+1", fort: 5, ref: 9, will: 5, special: "Escaramuça (+4d6, +4 CA)" },
    { level: 16, bab: "+12/+7/+2", fort: 5, ref: 10, will: 5, special: "Talento adicional" },
    { level: 17, bab: "+12/+7/+2", fort: 5, ref: 10, will: 5, special: "Escaramuça (+5d6, +4 CA)" },
    { level: 18, bab: "+13/+8/+3", fort: 6, ref: 11, will: 6, special: "Movimento livre" },
    { level: 19, bab: "+14/+9/+4", fort: 6, ref: 11, will: 6, special: "Escaramuça (+5d6, +5 CA)" },
    { level: 20, bab: "+15/+10/+5", fort: 6, ref: 12, will: 6, special: "Fortitude em combate +3, percepção às cegas 9 m, talento adicional" },
  ],
  features: [
    { name: "Usar Armas e Armaduras", text: "Os batedores sabem usar todas as armas simples, a machadinha, o machado de arremesso, a espada curta e o cutelo. Eles sabem usar armaduras leves, mas não escudos." },
    { name: "Escaramuça (Ext)", text: "Um batedor confia em sua mobilidade para infligir dano adicional e aproveitar suas defesas. Ele inflige dano adicional (+1d6 no 1º nível, crescendo conforme a Tabela 1-1 até +5d6 no 19º nível) com ataques corpo a corpo e à distância contra qualquer alvo com o qual tenha se movimentado pelo menos 3 m de sua localização inicial no início do turno. O dano adicional desta característica somente se aplica contra criaturas vivas com anatomia discernível: têm imunidade a esse bônus de dano as construções, mortos-vivos, limos, criaturas incorpóreas e criaturas imunes a acertos críticos. O batedor não é capaz de usar essa habilidade se estiver carregando uma carga média ou pesada, ou vestindo uma armadura média ou pesada. Além disso, a partir do 3º nível a escaramuça concede ao batedor um bônus de esquiva na Classe de Armadura enquanto estiver se movimentando, conforme indicado pela tabela de progressão (começando em +1 CA, subindo até +5 CA no 19º nível). O batedor perde esse benefício nas mesmas condições (armadura média/pesada ou carga média/pesada). Esse bônus de esquiva é cumulativo com o bônus de esquiva proveniente de outra classe, se possuir multiclasse." },
    { name: "Encontrar Armadilhas (Ext)", text: "Um batedor desempenha a função de localizar armadilhas usando sua perícia Procurar, exatamente como um ladino. Consulte a habilidade homônima no Livro do Jogador." },
    { name: "Fortitude em Combate (Ext)", text: "A partir do 2º nível, o batedor recebe +1 de bônus de resistência nos testes de resistência de Fortitude e nas jogadas de iniciativa. Esse bônus aumenta para +2 no 11º nível e +3 no 20º nível. Os personagens com bônus de iniciativa superior ou proveniente de outra fonte não acumulam com esse benefício." },
    { name: "Esquiva Sobrenatural (Ext)", text: "A partir do 2º nível, o batedor não pode ser pego desprevenido em uma ameaça por invisibilidade, a menos que seja contorcionista ou tenha ao menos 4 graduações em Acrobacia. Consulte a habilidade homônima do Livro do Jogador." },
    { name: "Movimento Rápido (Ext)", text: "A partir do 3º nível, o batedor recebe +3 m de bônus de melhoria no seu deslocamento, dentre a 3 m no primeiro ganho e mais 3 m no 11º nível, na proporção de que o batedor não esteja usando uma armadura média ou pesada, ou portando uma carga média ou pesada. Consulte a habilidade homônima no Livro do Jogador." },
    { name: "Rastro Invisível (Ext)", text: "No 3º nível e acima, o batedor é capaz de encobrir sua trilha (vestígios de passagem) à metade de seu deslocamento normal, ou com seu deslocamento normal fazendo um teste de Sobrevivência com -5 de penalidade. Consulte a habilidade homônima no Livro do Jogador." },
    { name: "Talento Adicional", text: "Nos níveis 4, 8, 12, 16 e 20, o batedor recebe um talento adicional, escolhido entre os talentos de luta homônima às normas de pré-requisitos." },
    { name: "Evasão (Ext)", text: "A partir do 5º nível, se o batedor estiver sujeito a um efeito de magia que normalmente permite um teste de resistência de Reflexos para reduzir o dano pela metade, ele não sofre qualquer dano com um resultado bem-sucedido. Consulte a habilidade homônima no Livro do Jogador." },
    { name: "Passo Impecável (Ext)", text: "A partir do 6º nível, o batedor é capaz de deslocar-se através de qualquer terreno (vegetação tóxica, detritos ou terrenos similares) sem sofrer dano normal nem se tornar vulnerável." },
    { name: "Camuflagem (Ext)", text: "No 8º nível, o batedor é capaz de usar a perícia Esconder-se em qualquer terreno natural, mesmo quando o terreno não forneça cobertura ou camuflagem normalmente." },
    { name: "Sentido Cego (Ext)", text: "No 10º nível, o batedor adquire sentido cego com raio de 9 m. Essa habilidade funciona conforme a descrição do Livro dos Monstros." },
    { name: "Mimetismo (Ext)", text: "A partir do 14º nível, um batedor é capaz de usar a perícia Esconder-se em terrenos naturais, mesmo enquanto estiver sendo observado. Consulte a habilidade homônima do ranger no Livro do Jogador. Ele perde esse benefício se estiver vestindo uma armadura média ou pesada, ou portando uma carga média ou pesada." },
    { name: "Movimento Livre (Ext)", text: "No 18º nível ou superior, o batedor consegue escapar de amarras, restrições ou mesmo dos efeitos de magias de confinamento com facilidade. Essa habilidade duplica os efeitos da magia movimentação livre, mas estará sempre ativa. Ele perde esse benefício se estiver usando uma armadura média ou superior ou portando uma carga média ou pesada." },
    { name: "Percepção às Cegas (Ext)", text: "Um batedor de 20º nível adquire a habilidade percepção às cegas com raio de 9 m. Seus sentidos se tornam aguçados o bastante para permitir que ele manobre e lute normalmente mesmo na escuridão total. A invisibilidade, a escuridão e a maioria dos tipos de camuflagem são irrelevantes, embora o personagem precise de uma linha de efeito até a criatura ou objeto para discerni-lo." },
  ],
  description: "Qualquer força armada em movimento, seja um exército ou um grupo de aventureiros, precisa de informações sobre o que existe adiante e o que ficou para trás e mais importante, tempo para se preparar para o combate. Um batedor pode transpor terrenos difíceis com excelente deslocamento, e se especializar em avistar o inimigo antes que o oponente detecte sua presença. Seja numa masmorra ou em campo aberto, o batedor só é percebido quando deseja. O batedor é um especialista em terrenos agrestes, superando até mesmo a habilidade do ranger para transpor terrenos difíceis e liderar um grupo de companheiros através das florestas. O batedor também é excelente nas masmorras, e pode encontrar e desarmar armadilhas com a mesma eficiência de um ladino. Conforme progride em níveis, os sentidos do batedor tornam-se incrivelmente aguçados, e com o tempo lhe permitem atuar sem dificuldades mesmo sob a escuridão total.",
};
