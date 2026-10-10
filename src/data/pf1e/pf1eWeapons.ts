// Pathfinder 1e — armas e munições da Tabela 6-4 do Livro Básico, pp. 142-143.
// Dados preservam dano Pequeno/Médio, crítico, alcance, peso, custo e propriedades.

export type Pf1eWeaponProficiency = "simple" | "martial" | "exotic";
export type Pf1eWeaponGroup = {
  proficiency: Pf1eWeaponProficiency;
  group: string;
  grip: "unarmed" | "light" | "one_hand" | "two_hands" | "ranged";
  sourcePage: 142 | 143;
  records: Array<[
    name: string,
    damageSmall: string,
    damageMedium: string,
    critical: string,
    damageType: "P" | "Ct" | "Cc" | "P ou Ct" | "Cc e P" | "Cc ou P" | "—",
    weightKg: number | null,
    costGp: number | null,
    costLabel: string,
    rangeMeters: number | null,
    special: string,
  ]>;
};

export const PF1E_WEAPON_GROUPS: Pf1eWeaponGroup[] = [
  {
    proficiency: "simple", group: "Ataques desarmados", grip: "unarmed", sourcePage: 142,
    records: [
      ["Golpe desarmado", "1d2", "1d3", "x2", "Cc", null, null, "—", null, "não letal"],
      ["Manopla", "1d2", "1d3", "x2", "Cc", 0.5, 2, "2 PO", null, "—"],
    ],
  },
  {
    proficiency: "simple", group: "Armas simples leves", grip: "light", sourcePage: 142,
    records: [
      ["Adaga", "1d3", "1d4", "19-20/x2", "P ou Ct", 0.5, 2, "2 PO", 3, "—"],
      ["Adaga de soco", "1d3", "1d4", "x3", "P", 0.5, 2, "2 PO", null, "—"],
      ["Foice", "1d4", "1d6", "x2", "Ct", 1, 6, "6 PO", null, "derrubar"],
      ["Maça leve", "1d4", "1d6", "x2", "Cc", 2, 5, "5 PO", null, "—"],
      ["Manopla com cravos", "1d3", "1d4", "x2", "P", 0.5, 5, "5 PO", null, "—"],
    ],
  },
  {
    proficiency: "simple", group: "Armas simples de uma mão", grip: "one_hand", sourcePage: 142,
    records: [
      ["Clava", "1d4", "1d6", "x2", "Cc", 1.5, null, "—", 3, "—"],
      ["Lança curta", "1d4", "1d6", "x2", "P", 1.5, 1, "1 PO", 6, "—"],
      ["Maça pesada", "1d6", "1d8", "x2", "Cc", 4, 12, "12 PO", null, "—"],
      ["Maça-estrela", "1d6", "1d8", "x2", "Cc e P", 3, 8, "8 PO", null, "—"],
    ],
  },
  {
    proficiency: "simple", group: "Armas simples de duas mãos", grip: "two_hands", sourcePage: 142,
    records: [
      ["Bordão", "1d4/1d4", "1d6/1d6", "x2", "Cc", 2, null, "—", null, "dupla, monge"],
      ["Lança", "1d6", "1d8", "x3", "P", 3, 2, "2 PO", 6, "escorar"],
      ["Lança longa", "1d6", "1d8", "x3", "P", 4.5, 5, "5 PO", null, "alcance, escorar"],
    ],
  },
  {
    proficiency: "simple", group: "Armas simples à distância", grip: "ranged", sourcePage: 142,
    records: [
      ["Azagaia", "1d4", "1d6", "x2", "P", 1, 1, "1 PO", 9, "—"],
      ["Besta leve", "1d6", "1d8", "19-20/x2", "P", 2, 35, "35 PO", 24, "recarga: ação de movimento"],
      ["Besta pesada", "1d8", "1d10", "19-20/x2", "P", 4, 50, "50 PO", 36, "recarga: ação padrão"],
      ["Dardo", "1d3", "1d4", "x2", "P", 0.25, 0.5, "5 PP", 6, "—"],
      ["Funda", "1d3", "1d4", "x2", "Cc", null, null, "—", 15, "—"],
      ["Zarabatana", "1", "1d2", "x2", "P", 0.5, 2, "2 PO", 6, "—"],
    ],
  },
  {
    proficiency: "martial", group: "Armas marciais leves", grip: "light", sourcePage: 142,
    records: [
      ["Armadura com cravos", "1d4", "1d6", "x2", "P", null, null, "especial", null, "—"],
      ["Escudo leve com cravos", "1d3", "1d4", "x2", "P", null, null, "especial", null, "—"],
      ["Escudo leve", "1d2", "1d3", "x2", "Cc", null, null, "especial", null, "—"],
      ["Espada curta", "1d4", "1d6", "19-20/x2", "P", 1, 10, "10 PO", null, "—"],
      ["Faca estrela", "1d3", "1d4", "x3", "P", 1.5, 24, "24 PO", 6, "—"],
      ["Kukri", "1d3", "1d4", "18-20/x2", "Ct", 1, 8, "8 PO", null, "—"],
      ["Machadinha", "1d4", "1d6", "x3", "Ct", 1.5, 6, "6 PO", null, "—"],
      ["Machado de arremesso", "1d4", "1d6", "x2", "Ct", 1, 8, "8 PO", 3, "—"],
      ["Martelo leve", "1d3", "1d4", "x2", "Cc", 1, 1, "1 PO", 6, "—"],
      ["Picareta leve", "1d3", "1d4", "x4", "P", 1.5, 4, "4 PO", null, "—"],
      ["Porrete", "1d4", "1d6", "x2", "Cc", 1, 1, "1 PO", null, "não letal"],
    ],
  },
  {
    proficiency: "martial", group: "Armas marciais de uma mão", grip: "one_hand", sourcePage: 142,
    records: [
      ["Cimitarra", "1d4", "1d6", "18-20/x2", "Ct", 2, 15, "15 PO", null, "—"],
      ["Escudo pesado", "1d3", "1d4", "x2", "Cc", null, null, "especial", null, "—"],
      ["Escudo pesado com cravos", "1d4", "1d6", "x2", "P", null, null, "especial", null, "—"],
      ["Espada longa", "1d6", "1d8", "19-20/x2", "Ct", 2, 15, "15 PO", null, "—"],
      ["Machado de batalha", "1d6", "1d8", "x3", "Ct", 3, 10, "10 PO", null, "—"],
      ["Mangual", "1d6", "1d8", "x2", "Cc", 2.5, 8, "8 PO", null, "desarmar, derrubar"],
      ["Martelo de guerra", "1d6", "1d8", "x3", "Cc", 2.5, 12, "12 PO", null, "—"],
      ["Picareta pesada", "1d4", "1d6", "x4", "P", 3, 8, "8 PO", null, "—"],
      ["Rapieira", "1d4", "1d6", "18-20/x2", "P", 1, 20, "20 PO", null, "—"],
      ["Tridente", "1d6", "1d8", "x2", "P", 2, 15, "15 PO", 3, "escorar"],
    ],
  },
  {
    proficiency: "martial", group: "Armas marciais de duas mãos", grip: "two_hands", sourcePage: 143,
    records: [
      ["Alabarda", "1d8", "1d10", "x3", "P ou Ct", 6, 10, "10 PO", null, "escorar, derrubar"],
      ["Clava grande", "1d8", "1d10", "x2", "Cc", 4, 5, "5 PO", null, "—"],
      ["Espada grande", "1d10", "2d6", "19-20/x2", "Ct", 4, 50, "50 PO", null, "—"],
      ["Falcione", "1d6", "2d4", "18-20/x2", "Ct", 4, 75, "75 PO", null, "—"],
      ["Glaive", "1d8", "1d10", "x3", "Ct", 5, 8, "8 PO", null, "alcance"],
      ["Guisarme", "1d6", "2d4", "x3", "Ct", 6, 9, "9 PO", null, "alcance, derrubar"],
      ["Lança de cavalaria", "1d6", "1d8", "x3", "P", 5, 10, "10 PO", null, "alcance"],
      ["Machado grande", "1d10", "1d12", "x3", "Ct", 6, 20, "20 PO", null, "—"],
      ["Mangual pesado", "1d8", "1d10", "19-20/x2", "Cc", 5, 15, "15 PO", null, "desarmar, derrubar"],
      ["Ranseur", "1d6", "2d4", "x3", "P", 6, 10, "10 PO", null, "desarmar, alcance"],
      ["Segadeira", "1d6", "2d4", "x4", "P ou Ct", 5, 18, "18 PO", null, "derrubar"],
    ],
  },
  {
    proficiency: "martial", group: "Armas marciais à distância", grip: "ranged", sourcePage: 143,
    records: [
      ["Arco longo", "1d6", "1d8", "x3", "P", 1.5, 75, "75 PO", 30, "—"],
      ["Arco longo composto", "1d6", "1d8", "x3", "P", 1.5, 100, "100 PO", 33, "—"],
      ["Arco curto", "1d4", "1d6", "x3", "P", 1, 30, "30 PO", 18, "—"],
      ["Arco curto composto", "1d4", "1d6", "x3", "P", 1, 75, "75 PO", 21, "—"],
    ],
  },
  {
    proficiency: "exotic", group: "Armas exóticas leves", grip: "light", sourcePage: 143,
    records: [
      ["Kama", "1d4", "1d6", "x2", "Ct", 1, 2, "2 PO", null, "monge, derrubar"],
      ["Nunchaku", "1d3", "1d4", "x2", "Cc", 1, 2, "2 PO", null, "desarmar, monge"],
      ["Sai", "1d3", "1d4", "x2", "Cc", 0.5, 1, "1 PO", null, "desarmar, monge"],
      ["Siangham", "1d4", "1d6", "x2", "P", 0.5, 3, "3 PO", null, "monge"],
    ],
  },
  {
    proficiency: "exotic", group: "Armas exóticas de uma mão", grip: "one_hand", sourcePage: 143,
    records: [
      ["Chicote", "1d2", "1d3", "x2", "Ct", 1, 1, "1 PO", null, "desarmar, não letal, alcance, derrubar"],
      ["Espada bastarda", "1d8", "1d10", "19-20/x2", "Ct", 3, 35, "35 PO", null, "—"],
      ["Machado de guerra anão", "1d8", "1d10", "x3", "Ct", 4, 30, "30 PO", null, "—"],
    ],
  },
  {
    proficiency: "exotic", group: "Armas exóticas de duas mãos", grip: "two_hands", sourcePage: 143,
    records: [
      ["Corrente com cravos", "1d6", "2d4", "x2", "P", 5, 25, "25 PO", null, "desarmar, derrubar"],
      ["Espada de duas lâminas", "1d6/1d6", "1d8/1d8", "19-20/x2", "Ct", 5, 100, "100 PO", null, "dupla"],
      ["Lâmina curvada élfica", "1d8", "1d10", "18-20/x2", "Ct", 3.5, 80, "80 PO", null, "—"],
      ["Machado duplo orc", "1d6/1d6", "1d8/1d8", "x3", "Ct", 7.5, 60, "60 PO", null, "dupla"],
      ["Mangual atroz", "1d6/1d6", "1d8/1d8", "x2", "Cc", 5, 90, "90 PO", null, "desarmar, dupla, derrubar"],
      ["Martelo com gancho gnômico", "1d6/1d4", "1d8/1d6", "x3/x4", "Cc ou P", 3, 20, "20 PO", null, "dupla, derrubar"],
      ["Urgrosh anão", "1d6/1d4", "1d8/1d6", "x3", "P ou Ct", 6, 50, "50 PO", null, "escorar, dupla"],
    ],
  },
  {
    proficiency: "exotic", group: "Armas exóticas à distância", grip: "ranged", sourcePage: 143,
    records: [
      ["Besta leve de repetição", "1d6", "1d8", "19-20/x2", "P", 3, 250, "250 PO", 24, "recarga: ação de movimento"],
      ["Besta pesada de repetição", "1d8", "1d10", "19-20/x2", "P", 6, 400, "400 PO", 36, "recarga: ação padrão"],
      ["Besta de mão", "1d3", "1d4", "19-20/x2", "P", 1, 100, "100 PO", 9, "recarga: ação padrão"],
      ["Boleadeira", "1d3", "1d4", "x2", "Cc", 1, 5, "5 PO", 3, "não letal, derrubar"],
      ["Cajado-funda halfling", "1d6", "1d8", "x3", "Cc", 1.5, 20, "20 PO", 24, "—"],
      ["Rede", "—", "—", "—", "—", 3, 20, "20 PO", 3, "enredar"],
      ["Shuriken", "1", "1d2", "x2", "P", 0.25, 0.2, "1 PO (5)", 3, "monge, arremessável"],
    ],
  },
];

export interface Pf1eAmmunition {
  id: string;
  name: string;
  quantity: number;
  costGp: number;
  costLabel: string;
  weightKg: number | null;
  sourcePage: 142 | 143;
  forWeapon: string;
  notes?: string;
}

// Duplicatas da tabela (flechas para quatro arcos e balas para duas fundas)
// são consolidadas, preservando os tipos de arma compatíveis no registro.
export const PF1E_AMMUNITION: Pf1eAmmunition[] = [
  { id: "virotes-besta-leve-10", name: "Virotes de besta leve (10)", quantity: 10, costGp: 1, costLabel: "1 PO", weightKg: 0.5, sourcePage: 142, forWeapon: "Besta leve" },
  { id: "virotes-besta-pesada-10", name: "Virotes de besta pesada (10)", quantity: 10, costGp: 1, costLabel: "1 PO", weightKg: 0.5, sourcePage: 142, forWeapon: "Besta pesada" },
  { id: "balas-de-funda-10", name: "Balas de funda (10)", quantity: 10, costGp: 0.1, costLabel: "1 PP", weightKg: 2.5, sourcePage: 142, forWeapon: "Funda e cajado-funda halfling" },
  { id: "dardos-zarabatana-10", name: "Dardos para zarabatana (10)", quantity: 10, costGp: 0.5, costLabel: "5 PP", weightKg: null, sourcePage: 142, forWeapon: "Zarabatana" },
  { id: "flechas-20", name: "Flechas (20)", quantity: 20, costGp: 1, costLabel: "1 PO", weightKg: 1.5, sourcePage: 143, forWeapon: "Arcos curto, longo e compostos" },
  { id: "virotes-besta-leve-repeticao-5", name: "Virotes para besta leve de repetição (5)", quantity: 5, costGp: 1, costLabel: "1 PO", weightKg: 0.5, sourcePage: 143, forWeapon: "Besta leve de repetição" },
  { id: "virotes-besta-pesada-repeticao-5", name: "Virotes para besta pesada de repetição (5)", quantity: 5, costGp: 1, costLabel: "1 PO", weightKg: 0.5, sourcePage: 143, forWeapon: "Besta pesada de repetição" },
  { id: "virotes-besta-de-mao-10", name: "Virotes de besta de mão (10)", quantity: 10, costGp: 1, costLabel: "1 PO", weightKg: 0.5, sourcePage: 143, forWeapon: "Besta de mão" },
];
