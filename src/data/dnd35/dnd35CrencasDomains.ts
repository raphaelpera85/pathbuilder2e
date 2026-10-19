/**
 * D&D 3.0 — Forgotten Realms: Crenças e Panteões (ed. BR), Apêndice
 * "Domínio do Repouso" e "Novas Magias" (p.222).
 */

export type Dnd35CrencasDomain = {
  id: string;
  name: string;
  deities: string[];
  grantedPower: string;
  spells: Array<{ level: number; spellName: string }>;
  page: number;
};

export const DND35_CRENCAS_DOMINIO_REPOUSO: Dnd35CrencasDomain = {
  id: "crencas-domain-repouso",
  name: "Repouso",
  deities: ["Jergal", "Kelemvor", "Osíris", "Urogalan"],
  grantedPower:
    "Toque da Morte (Sob): Uma vez por dia, ao desferir com sucesso um ataque de toque corpo a corpo contra uma criatura viva, role 1d6 por nível de clérigo. Se o total igualar ou superar os pontos de vida atuais da vítima, ela morre.",
  spells: [
    { level: 1, spellName: "Visão da Morte" },
    { level: 2, spellName: "Descanso Tranqüilo" },
    { level: 3, spellName: "Falar com os Mortos" },
    { level: 4, spellName: "Proteção Contra a Morte" },
    { level: 5, spellName: "Matar" },
    { level: 6, spellName: "Pós-Vida em Morte" },
    { level: 7, spellName: "Destruição" },
    { level: 8, spellName: "Certeza" },
    { level: 9, spellName: "Grito da Banshee" },
  ],
  page: 222,
};

export type Dnd35CrencasSpell = {
  id: string;
  name: string;
  school: string;
  levels: Record<string, number>;
  castingTime: string;
  range: string;
  targetOrArea: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  components: string;
  materialComponent?: string;
  description: string;
  page: number;
};

export const DND35_CRENCAS_SPELLS: Dnd35CrencasSpell[] = [
  {
    id: "crencas-spell-certeza",
    name: "Certeza",
    school: "Abjuração",
    levels: { Repouso: 8 },
    castingTime: "1 rodada",
    range: "Pessoal",
    targetOrArea: "Você",
    duration: "1 minuto / 2 níveis",
    savingThrow: "Nenhum",
    spellResistance: "Não",
    components: "V, G, M",
    materialComponent: "Ungüento feito de xarope de pêssego e canela em pau.",
    description:
      "Esta magia permite que o conjurador proteja a si mesmo contra algum tipo de condição extrema natural (como ser imerso em óleo fervente ou ser enterrado sob uma avalanche) que certamente o mataria. O conjurador não se protege contra magias ou ataques diretos de criaturas. Enquanto durar a magia, o conjurador não sofre dano daquela condição específica, embora seus itens não sejam protegidos.",
    page: 222,
  },
  {
    id: "crencas-spell-pos-vida-em-morte",
    name: "Pós-Vida em Morte",
    school: "Necromancia",
    levels: { Clérigo: 6, Repouso: 6, "Feiticeiro/Mago": 6 },
    castingTime: "1 ação padrão",
    range: "Médio (30 m + 3 m/nível)",
    targetOrArea: "Vários mortos-vivos em explosão com raio de 15 m",
    duration: "Instantânea",
    savingThrow: "Vontade anula",
    spellResistance: "Sim",
    components: "V, G, M, FD",
    materialComponent: "Pó de diamante no valor mínimo de 500 PO.",
    description:
      "Pós-vida em morte destrói a força vital dos mortos-vivos, matando-os instantaneamente. A magia mata 1d4 DV de mortos-vivos por nível de conjurador. Criaturas com menos DV são afetadas primeiro; em caso de empate, as mais próximas do ponto de origem são afetadas primeiro.",
    page: 222,
  },
];
