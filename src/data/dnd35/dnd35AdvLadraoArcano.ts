/**
 * D&D 3.5 — Livro Completo do Aventureiro (ed. BR), Capítulo 1: Classes
 * Base. Ladrão Arcano (pp.10-16) — 2ª das 3 classes novas do livro
 * (Batedor, Ladrão Arcano, Ninja). Ladino "gish" com furto de magias,
 * conjurador espontâneo limitado baseado em Carisma.
 */
export type CgAdvSpellLevels = { l1: number | string; l2: number | string; l3: number | string; l4: number | string };

export type CgAdvLadraoArcanoLevel = {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
  dailySpells: CgAdvSpellLevels;
  knownSpells: CgAdvSpellLevels;
};

export type CgAdvBaseClass2 = {
  id: string;
  name: string;
  page: number;
  hitDie: string;
  skillPoints: string;
  classSkills: string[];
  startingGold: string;
  levels: CgAdvLadraoArcanoLevel[];
  features: { name: string; text: string }[];
  spellcasting: string;
  description: string;
};

const E = "—";

export const CG_ADV_LADRAO_ARCANO: CgAdvBaseClass2 = {
  id: "cgadv-ladrao-arcano",
  name: "Ladrão Arcano",
  page: 10,
  hitDie: "d6",
  skillPoints: "8 + modificador de Int",
  classSkills: [
    "Acrobacia (Des)", "Arte da Fuga (Des)", "Atuação (Car)", "Blefar (Car)",
    "Cavalgar (Des)", "Conhecimento (arcanismo) (Int)", "Conhecimento (masmorras) (Int)",
    "Conhecimento (geografia) (Int)", "Conhecimento (nobreza e realeza) (Int)",
    "Disfarçar-se (Car)", "Equilíbrio (Des)", "Escalar (For)", "Esconder-se (Des)",
    "Falsificação (Int)", "Furtividade (Des)", "Identificar Magia (Int)",
    "Natação (For)", "Ofícios (Int)", "Operar Mecanismo (Des)", "Observar (Sab)",
    "Ouvir (Sab)", "Procurar (Int)", "Saltar (For)", "Sentir Motivação (Sab)",
    "Usar Cordas (Des)", "Usar Pergaminho Arcano (Car)",
  ],
  startingGold: "3d4x10 PO",
  levels: [
    { level: 1, bab: "+0", fort: 0, ref: 0, will: 2, special: "Ataque furtivo +1d6, roubar magia (0 ou 1º), encontrar armadilhas", dailySpells: { l1: E, l2: E, l3: E, l4: E }, knownSpells: { l1: E, l2: E, l3: E, l4: E } },
    { level: 2, bab: "+1", fort: 0, ref: 0, will: 3, special: "Detectar magia, graça arcana +1, roubar efeito mágico", dailySpells: { l1: E, l2: E, l3: E, l4: E }, knownSpells: { l1: E, l2: E, l3: E, l4: E } },
    { level: 3, bab: "+2", fort: 1, ref: 1, will: 3, special: "Roubar resistência a energia 10", dailySpells: { l1: E, l2: E, l3: E, l4: E }, knownSpells: { l1: E, l2: E, l3: E, l4: E } },
    { level: 4, bab: "+3", fort: 1, ref: 1, will: 4, special: "Roubar magia (2º)", dailySpells: { l1: 0, l2: E, l3: E, l4: E }, knownSpells: { l1: "2¹", l2: E, l3: E, l4: E } },
    { level: 5, bab: "+3", fort: 1, ref: 1, will: 4, special: "Ataque furtivo +2d6, roubar habilidade similar a magia", dailySpells: { l1: 0, l2: E, l3: E, l4: E }, knownSpells: { l1: 2, l2: E, l3: E, l4: E } },
    { level: 6, bab: "+4", fort: 2, ref: 2, will: 5, special: "Roubar magia (3º)", dailySpells: { l1: 1, l2: E, l3: E, l4: E }, knownSpells: { l1: 3, l2: E, l3: E, l4: E } },
    { level: 7, bab: "+5", fort: 2, ref: 2, will: 5, special: "Absorver magia", dailySpells: { l1: 1, l2: E, l3: E, l4: E }, knownSpells: { l1: 3, l2: E, l3: E, l4: E } },
    { level: 8, bab: "+6/+1", fort: 2, ref: 2, will: 6, special: "Roubar magia (4º)", dailySpells: { l1: 1, l2: 0, l3: E, l4: E }, knownSpells: { l1: 4, l2: "2¹", l3: E, l4: E } },
    { level: 9, bab: "+6/+1", fort: 3, ref: 3, will: 6, special: "Visão arcana, ataque furtivo +3d6", dailySpells: { l1: 1, l2: 0, l3: E, l4: E }, knownSpells: { l1: 4, l2: 2, l3: E, l4: E } },
    { level: 10, bab: "+7/+2", fort: 3, ref: 3, will: 7, special: "Roubar magia (5º)", dailySpells: { l1: 1, l2: 1, l3: 0, l4: E }, knownSpells: { l1: 4, l2: 3, l3: E, l4: E } },
    { level: 11, bab: "+8/+3", fort: 3, ref: 3, will: 7, special: "Graça arcana +2, roubar resistência a energia 20", dailySpells: { l1: 1, l2: 1, l3: 1, l4: E }, knownSpells: { l1: 4, l2: 3, l3: "2¹", l4: E } },
    { level: 12, bab: "+9/+4", fort: 4, ref: 4, will: 8, special: "Roubar magia (6º)", dailySpells: { l1: 1, l2: 1, l3: 1, l4: E }, knownSpells: { l1: 4, l2: 4, l3: 3, l4: E } },
    { level: 13, bab: "+9/+4", fort: 4, ref: 4, will: 8, special: "Descobrir magias, ataque furtivo +4d6", dailySpells: { l1: 1, l2: 1, l3: 1, l4: 0 }, knownSpells: { l1: 4, l2: 4, l3: 3, l4: E } },
    { level: 14, bab: "+10/+5", fort: 4, ref: 4, will: 9, special: "Roubar magia (7º)", dailySpells: { l1: 2, l2: 1, l3: 1, l4: 0 }, knownSpells: { l1: 4, l2: 4, l3: 4, l4: "2¹" } },
    { level: 15, bab: "+11/+6/+1", fort: 5, ref: 5, will: 9, special: "Roubar Resistência à Magia", dailySpells: { l1: 2, l2: 1, l3: 1, l4: 1 }, knownSpells: { l1: 4, l2: 4, l3: 4, l4: 3 } },
    { level: 16, bab: "+12/+7/+2", fort: 5, ref: 5, will: 10, special: "Roubar magia (8º)", dailySpells: { l1: 2, l2: 2, l3: 1, l4: 1 }, knownSpells: { l1: 4, l2: 4, l3: 4, l4: 3 } },
    { level: 17, bab: "+12/+7/+2", fort: 5, ref: 5, will: 10, special: "Ataque furtivo +5d6", dailySpells: { l1: 2, l2: 2, l3: 2, l4: 1 }, knownSpells: { l1: 5, l2: 4, l3: 4, l4: 4 } },
    { level: 18, bab: "+13/+8/+3", fort: 6, ref: 6, will: 11, special: "Roubar magia (9º)", dailySpells: { l1: 2, l2: 2, l3: 2, l4: 1 }, knownSpells: { l1: 5, l2: 5, l3: 4, l4: 4 } },
    { level: 19, bab: "+14/+9/+4", fort: 6, ref: 6, will: 11, special: "Roubar resistência a energia 30", dailySpells: { l1: 3, l2: 3, l3: 2, l4: 2 }, knownSpells: { l1: 5, l2: 5, l3: 5, l4: 4 } },
    { level: 20, bab: "+15/+10/+5", fort: 6, ref: 6, will: 12, special: "Absorver magia (conjuração imediata), graça arcana +3", dailySpells: { l1: 3, l2: 3, l3: 3, l4: 2 }, knownSpells: { l1: 5, l2: 5, l3: 5, l4: 5 } },
  ],
  features: [
    { name: "Usar Armas e Armaduras", text: "Os ladrões arcanos sabem usar todas as armas simples, a espada curta, o florete, o chicote e o cutelo. Eles sabem usar armaduras leves, mas sua falha arcana os impede de conjurar magias de ladrão arcano enquanto estiverem vestindo armaduras médias ou pesadas, ou portando um escudo." },
    { name: "Ataque Furtivo (Ext)", text: "Idêntico à habilidade homônima do ladino: +1d6 de dano adicional (crescendo para +2d6 no 5º, +3d6 no 9º, +4d6 no 13º e +5d6 no 17º) contra qualquer alvo privado do seu bônus de Destreza na CA ou flanqueado pelo ladrão arcano." },
    { name: "Roubar Magia (Sob)", text: "A principal habilidade do ladrão arcano. Como uma ação padrão que provoca ataque de oportunidade, o ladrão arcano pode tocar uma criatura (teste de ataque corpo a corpo de toque) e roubar temporariamente uma magia da mente dela, desde que a vítima tenha uma magia preparada (ou disponível, no caso de conjuradores espontâneos) de nível igual ou inferior ao máximo permitido pelo nível de classe do ladrão arcano (conforme a Tabela 1-2: 0º/1º no 1º nível, 2º no 4º, 3º no 6º, 4º no 8º, 5º no 10º, 6º no 12º, 7º no 14º, 8º no 16º, 9º no 18º). A vítima tem direito a um teste de resistência de Vontade (CD 10 + nível da magia roubada + modificador de Carisma do ladrão arcano) para evitar o roubo. Se obtiver sucesso, a magia roubada substitui a habilidade de conjurar magias normal do ladrão arcano até ser usada ou expirar (1 minuto por nível de classe do ladrão arcano)." },
    { name: "Encontrar Armadilhas (Ext)", text: "Um ladrão arcano usa Procurar para localizar armadilhas, exatamente como um ladino." },
    { name: "Detectar Magia (SM)", text: "A partir do 2º nível, o ladrão arcano pode usar detectar magia como habilidade sobrenatural à vontade." },
    { name: "Graça Arcana (Sob)", text: "A partir do 2º nível, o ladrão arcano recebe +1 de bônus de resistência nos testes de resistência contra magias e efeitos mágicos. Esse bônus aumenta para +2 no 11º nível e +3 no 20º nível." },
    { name: "Roubar Efeito Mágico (Sob)", text: "A partir do 2º nível, o ladrão arcano é capaz de usar sua habilidade de roubar magia para roubar temporariamente um efeito mágico contínuo (como uma magia) de uma criatura, suprimindo-o nela e concedendo o efeito ao ladrão arcano por 1 minuto." },
    { name: "Roubar Resistência a Energia (Sob)", text: "A partir do 3º nível, o ladrão arcano pode usar sua habilidade de roubar magia para usurpar resistência a energia 10 de uma criatura que a possua, por 1 minuto. Esse valor aumenta para 20 no 11º nível e 30 no 19º nível. Os efeitos não são cumulativos, a menos que aplicados a tipos de energia diferentes." },
    { name: "Roubar Habilidade Similar a Magia (Sob)", text: "No 5º nível, o ladrão arcano é capaz de roubar temporariamente uma habilidade similar a magia de uma criatura, até atingi-la com os pontos de contato suficientes para extrair uma das habilidades similares a magia dela, por 1 minuto." },
    { name: "Absorver Magia (Sob)", text: "A partir do 7º nível, o ladrão arcano obtém sucesso no teste de resistência contra uma magia direcionada contra ele, podendo então tentar absorver essa energia para usar posteriormente. Essa habilidade só funciona contra magias que tenham um componente de energia específico, e seu efeito ou magias de área. Se o ladrão arcano conseguir absorver uma magia (1d20 ≤ nível de conjurador do ladrão arcano), o sucesso significa que ele conseguirá utilizar essa energia para conjurá-la mais tarde (até utilizá-la ou perdê-la, o que ocorrer primeiro) como se fosse uma de suas próprias magias conhecidas. No 20º nível, o ladrão arcano consegue empregar a energia mágica absorvida como uma conjuração imediata." },
    { name: "Visão Arcana (SM)", text: "No 9º nível, o ladrão arcano adquire a capacidade de usar a magia visão arcana como ação livre até 13 vezes por dia (uma vez por nível de personagem acima do 8º), sem modificador de Carisma extra." },
    { name: "Descobrir Magias", text: "No 13º nível ou superior, o ladrão arcano aprende a descobrir magias desconhecidas com mais facilidade, recebendo um bônus de competência nos testes aplicáveis." },
    { name: "Roubar Resistência à Magia (Sob)", text: "No 15º nível, o ladrão arcano é capaz de roubar temporariamente a resistência à magia de uma criatura por toda a duração padrão de sua habilidade de roubar magia." },
  ],
  spellcasting: "A partir do 4º nível, o ladrão arcano adquire a habilidade de conjurar uma pequena quantidade de magias arcanas, extraídas de um subconjunto da lista de feiticeiro/mago (somente as escolas de abjuração, adivinhação, encantamento, ilusão e transmutação; nenhuma outra magia de feiticeiro/mago pertence à lista de classe do ladrão arcano). Ele conjura qualquer magia que conheça sem prepará-la com antecedência, da mesma forma que um feiticeiro. Para aprender ou conjurar uma magia, um ladrão arcano deve ter uma pontuação em Carisma igual ou superior a 10 + o nível da magia; a Classe de Dificuldade dos testes de resistência contra essas magias equivale a 10 + nível da magia + modificador de Carisma. O limite diário de magias e o número de magias conhecidas por nível seguem as Tabelas 1-2 e 1-3; o número de magias conhecidas é fixo (o Carisma não concede magias conhecidas extras, apenas magias diárias adicionais). A cada três níveis a partir do 12º (15º, 18º), o ladrão arcano pode trocar uma magia conhecida por outra de nível igual ou inferior.",
  description: "Habilidoso o bastante para abrir uma fechadura mágica ou roubar a memória de uma magia direto da mente de um mago, o ladrão arcano combina a furtividade e a versatilidade do ladino com um toque de magia roubada. Diferente de um ladino comum, o ladrão arcano não confia apenas em seus próprios recursos: ele aprende a 'pegar emprestadas' habilidades mágicas de outras criaturas, tocando-as e absorvendo temporariamente seus poderes arcanos. Um ladrão arcano bem-sucedido combina perícias clássicas de ladino com um conjunto crescente de talentos sobrenaturais de roubo mágico, tornando-se uma ameaça imprevisível tanto para guerreiros quanto para magos.",
};
