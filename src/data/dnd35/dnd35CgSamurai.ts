/**
 * O Livro Completo do Guerreiro (D&D 3.5, edição brasileira; scan sem camada de texto), cap. 1, pp. 10-13: Samurai.
 * Tabela 1-4 lida a 400dpi; texto em português como no livro. Só dados (sem UI nem Supabase). Livro 3.5.
 * Erro impresso mantido: no conjunto inicial o talento aparece como "Foco em Arma (espada longa)", mas a arma do samurai é a espada bastarda.
 * "Paladinos e Rangers sem Magias" (p. 13) fica para outro arquivo.
 */
import type { CgBaseClass } from "./dnd35CgClasses";

export const CG_SAMURAI: CgBaseClass = {
  id: "cg-samurai",
  name: "Samurai",
  hitDie: 10,
  alignment: "Qualquer Leal",
  skillPointsFirstLevel: "(2 + modificador de Inteligência) x 4",
  skillPointsPerLevel: "2 + modificador de Inteligência",
  classSkills: ["Cavalgar", "Concentração", "Conhecimento (história)", "Conhecimento (nobreza e realeza)", "Diplomacia", "Intimidação", "Ofícios", "Sentir Motivação"],
  levels: [
    { level: 1, bab: "+1", fort: 2, ref: 0, will: 0, special: "Daisho" },
    { level: 2, bab: "+2", fort: 3, ref: 0, will: 0, special: "Duas espadas em união" },
    { level: 3, bab: "+3", fort: 3, ref: 1, will: 1, special: "Golpe kiai 1/dia" },
    { level: 4, bab: "+4", fort: 4, ref: 1, will: 1, special: "—" },
    { level: 5, bab: "+5", fort: 4, ref: 1, will: 1, special: "Mestre em iaijutsu" },
    { level: 6, bab: "+6/+1", fort: 5, ref: 2, will: 2, special: "Atemorizar" },
    { level: 7, bab: "+7/+2", fort: 5, ref: 2, will: 2, special: "Golpe kiai 2/dia" },
    { level: 8, bab: "+8/+3", fort: 6, ref: 2, will: 2, special: "Iniciativa Aprimorada" },
    { level: 9, bab: "+9/+4", fort: 6, ref: 3, will: 3, special: "—" },
    { level: 10, bab: "+10/+5", fort: 7, ref: 3, will: 3, special: "Atemorizar em massa" },
    { level: 11, bab: "+11/+6/+1", fort: 7, ref: 3, will: 3, special: "Duas espadas em união aprimorada" },
    { level: 12, bab: "+12/+7/+2", fort: 8, ref: 4, will: 4, special: "Golpe kiai 3/dia" },
    { level: 13, bab: "+13/+8/+3", fort: 8, ref: 4, will: 4, special: "—" },
    { level: 14, bab: "+14/+9/+4", fort: 9, ref: 4, will: 4, special: "Atemorizar aprimorado" },
    { level: 15, bab: "+15/+10/+5", fort: 9, ref: 5, will: 5, special: "—" },
    { level: 16, bab: "+16/+11/+6/+1", fort: 10, ref: 5, will: 5, special: "Duas espadas em união maior" },
    { level: 17, bab: "+17/+12/+7/+2", fort: 10, ref: 5, will: 5, special: "Golpe kiai 4/dia" },
    { level: 18, bab: "+18/+13/+8/+3", fort: 11, ref: 6, will: 6, special: "—" },
    { level: 19, bab: "+19/+14/+9/+4", fort: 11, ref: 6, will: 6, special: "—" },
    { level: 20, bab: "+20/+15/+10/+5", fort: 12, ref: 6, will: 6, special: "Presença aterradora" },
  ],
  features: [
    { name: "Usar Armas e Armaduras", text: "Um samurai sabe usar todas as armas simples e comuns, todas as armaduras, mas não escudos." },
    { name: "Daisho (Ext)", text: "Em combate corporal, o samurai prefere a katana (uma espada bastarda obra-prima) e a wakizashi (uma espada curta obra-prima). Muitos samurais adquirem estas lâminas como parte de uma herança, conhecida como daisho. Como o samurai foi treinado para utilizar essas espadas, ele recebe o talento Usar Arma Exótica (espada bastarda) como um talento adicional." },
    { name: "Duas Espadas em União (Ext)", text: "A partir do 2º nível, o samurai aprende a utilizar a katana e a wakizashi em conjunto. Considere que o personagem possui o talento Combater com Duas Armas quando utilizar um daisho, mesmo que não atenda aos pré-requisitos para o talento." },
    { name: "Golpe Kiai (Ext)", text: "A partir do 3º nível, uma vez por dia, o samurai é capaz de emitir um grito durante o combate, que lhe concede mais força e vigor. Quando o samurai ativa o golpe kiai (uma ação livre), seu próximo ataque recebe um bônus equivalente ao seu modificador de Carisma (mínimo +1) nas jogadas de ataque e dano. Conforme o samurai adquire níveis, recebe utilizações diárias adicionais desta habilidade. O personagem não é capaz de ativar essa habilidade mais de uma vez por rodada, não importa a quantidade disponível de utilizações diárias." },
    { name: "Mestre em Iaijutsu (Ext)", text: "No 5º nível, o samurai se torna praticante do iaijutsu, uma técnica de combate que envolve desembainhar uma espada e golpear o adversário em um único movimento fluido. Considere que o personagem possui o talento Saque Rápido, que afeta somente sua katana e wakizashi." },
    { name: "Atemorizar (Ext)", text: "A partir do 6º nível, um samurai é capaz de atemorizar seus oponentes com sua mera presença. Ele recebe +4 de bônus nos testes de Intimidar e pode desmoralizar um adversário (conforme descrito sob a perícia Intimidação no Livro do Jogador)." },
    { name: "Iniciativa Aprimorada (Ext)", text: "No 8º nível, o samurai aprimora suas técnicas em iaijutsu, praticando duelos rituais com outros samurais, e se torna capaz de antecipar o ataque iminente de qualquer adversário. Ele adquire o talento Iniciativa Aprimorada." },
    { name: "Atemorizar em Massa (Ext)", text: "No 10º nível, a postura implacável do samurai é suficiente para atemorizar diversos inimigos. Com um teste de Intimidação, ele é capaz de desmoralizar todos os oponentes num raio de 18 m com uma única ação padrão." },
    { name: "Duas Espadas em União Aprimorada (Ext)", text: "A partir do 11º nível, a habilidade do samurai com a katana e a wakizashi se aprimora. Considere que o personagem possui o talento Combater com Duas Armas Aprimorado quando utilizar um daisho, mesmo que não atenda aos pré-requisitos para o talento." },
    { name: "Atemorizar Aprimorado (Ext)", text: "No 14º nível, simplesmente fitar os olhos resolutos de um samurai é o suficiente para impedir o avanço dos inimigos. Com um teste de Intimidação, ele é capaz de desmoralizar todos os oponentes num raio de 18 m com uma única ação de movimento (não uma ação padrão)." },
    { name: "Duas Espadas em União Maior (Ext)", text: "A partir do 16º nível, combater com a katana e a wakizashi complementa a natureza do samurai. Considere que o personagem possui o talento Combater com Duas Armas Maior quando utilizar um daisho, mesmo que não atenda aos pré-requisitos para o talento." },
    { name: "Presença Aterradora (Ext)", text: "No 20º nível, a bravura, a honra e as habilidades de combate de um samurai se tornaram lendárias. Quando o samurai desembainha sua espada, todos os inimigos num raio de 18 m devem obter sucesso num teste de resistência de Vontade (CD 20 + modificador de Carisma do samurai) ou ficarão apavorados durante 4d6 rodadas (4 DV ou menos) ou abalados durante 4d6 rodadas (entre 5 e 19 DV). As criaturas que tiverem 20 DV ou mais são imunes a este efeito. Qualquer oponente que obtiver sucesso no teste de resistência não será afetado pela presença aterradora do mesmo samurai durante 24 horas." },
    { name: "Ex-Samurai", text: "Um samurai que abandone a tendência Leal ou execute um grave ato de desonra perderá todas as habilidades de classe que dependam do Carisma ou testes de Carisma. Os constrangimentos menores são perdoados, mas uma violação severa do código do bushido acarreta a perda. Os atos capazes de causar a derrocada de um samurai incluem desobedecer uma ordem de um oficial superior ou um senhor feudal, fugir por covardia de uma batalha importante, proferir uma mentira que gere conseqüências, não sustentar a própria integridade e um comportamento extremamente rude. Um samurai em desgraça não pode mais adquirir níveis nesta classe. Ele conseguirá recuperar suas habilidades de classe e poderá avançar novamente como samurai se cumprir uma penitência pela violação do bushido (consulte a magia penitência no Livro do Jogador), assumindo que o senhor feudal lhe conceda uma oportunidade de redenção — alguns senhores feudais exigem um suicídio ritual como a única forma de remover a mácula da desonra." },
    { name: "Multiclasse", text: "Assim como os personagens de outras classes, um samurai pode se tornar multiclasse, mas enfrenta uma restrição especial. Um samurai que adquirir um nível de qualquer outra classe nunca mais poderá adquirir níveis de samurai, embora conserve todas as suas habilidades de classe atuais. O caminho do guerreiro honrado exige obediência constante ao bushido. Em algumas ocasiões, um samurai é capaz de escolher níveis de uma classe de prestígio sem violar esse código. O kensai e o cavaleiro protetor (descritos neste livro) e o anão defensor (descrito no Livro do Mestre) são três exemplos comuns. O Mestre pode permitir outras classes de prestígio para um samurai. Alguns samurais em desgraça adquirem níveis na classe ronin (descrita no Capítulo 2) e são capazes de recuperar algumas de suas características de classe." },
  ],
  starterPackage: {
    label: "Samurai Humano",
    armor: "Cota de talas (+4 CA, -4 de penalidade de armadura, 6 m de deslocamento, 15 kg)",
    weapons: [
      "Espada bastarda (dano: 1d10, dec. 19-20/x 2, 3 kg, uma mão, cortante)",
      "Espada curta (dano: 1d6, dec. 19-20/x 2, 1 kg, leve, perfurante)",
      "Arco curto (dano: 1d6, dec. x 3, incremento de distância 18 m, 1 kg, perfurante)",
    ],
    skillSelection: "3 + modificador de Inteligência",
    skills: [
      { skill: "Cavalgar", ranks: 4, ability: "Des", armorPenalty: "—" },
      { skill: "Conhecimento (história)", ranks: 4, ability: "Int", armorPenalty: "—" },
      { skill: "Conhecimento (nobreza e realeza)", ranks: 4, ability: "Int", armorPenalty: "—" },
      { skill: "Diplomacia", ranks: 4, ability: "Car", armorPenalty: "—" },
      { skill: "Intimidação", ranks: 4, ability: "Car", armorPenalty: "—" },
      { skill: "Ofícios (caligrafia)", ranks: 4, ability: "Int", armorPenalty: "—" },
      { skill: "Sentir Motivação", ranks: 4, ability: "Sab", armorPenalty: "—" },
    ],
    feat: "Foco em Arma (espada longa)",
    humanBonusFeat: "Reflexos de Combate",
    equipment: "Mochila com cantil, um dia de rações de viagem, saco de dormir, saco, pederneira e isqueiro. Lanterna coberta, 1 frasco de óleo.",
    gold: "2d4 x 10 PO",
  },
};
