export const DND5E_SCAG_SOURCE_BOOK = "D&D 5e · Guia de Aventureiros da Costa da Espada";

export interface Dnd5eScagRace {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  size: "Pequeno" | "Médio";
  speed: number;
  languages: string;
  traits: string[];
}

export const DND5E_SCAG_RACES: Dnd5eScagRace[] = [
  {
    id: "dnd5e.scag.ancestry.duergar",
    name: "Anão Cinzento (Duergar)",
    englishName: "Gray Dwarf (Duergar)",
    sourcePage: 104,
    abilityBonuses: "+2 Constituição, +1 Força",
    attributeAdjustments: { con: 2, str: 1 },
    size: "Médio",
    speed: 7.5,
    languages: "Comum, Anão, Subcomum",
    traits: [
      "Visão no Escuro Superior: 36 metros de visão no escuro.",
      "Resiliência Duergar: Vantagem em testes de resistência contra ilusões, paralisia e veneno.",
      "Magia Duergar: Pode conjurar Aumentar/Reduzir (nível 3) e Invisibilidade (nível 5) em si mesmo sem gastar espaço de magia.",
      "Sensibilidade à Luz Solar: Desvantagem em testes de ataque e testes de Percepção baseados em visão na luz solar direta."
    ]
  },
  {
    id: "dnd5e.scag.ancestry.svirfneblin",
    name: "Gnomo das Profundezas (Svirfneblin)",
    englishName: "Deep Gnome (Svirfneblin)",
    sourcePage: 115,
    abilityBonuses: "+2 Inteligência, +1 Destreza",
    attributeAdjustments: { int: 2, dex: 1 },
    size: "Pequeno",
    speed: 7.5,
    languages: "Comum, Gnômico, Subcomum",
    traits: [
      "Visão no Escuro Superior: 36 metros de visão no escuro.",
      "Camuflagem na Pedra: Vantagem em testes de Destreza (Furtividade) para se esconder em terreno rochoso.",
      "Esperteza Gnômica: Vantagem em testes de resistência de Inteligência, Sabedoria e Carisma contra magia."
    ]
  },
  {
    id: "dnd5e.scag.ancestry.halfling_fantasma",
    name: "Halfling Fantasma",
    englishName: "Ghostwise Halfling",
    sourcePage: 110,
    abilityBonuses: "+2 Destreza, +1 Sabedoria",
    attributeAdjustments: { dex: 2, wis: 1 },
    size: "Pequeno",
    speed: 7.5,
    languages: "Comum, Halfling",
    traits: [
      "Fala Silenciosa: Pode se comunicar telepaticamente com qualquer criatura a até 9 metros que conheça pelo menos um idioma.",
      "Sortudo: Pode rolar novamente 1 em ataque, teste de atributo ou salvaguarda.",
      "Corajoso: Vantagem em testes de resistência contra ficar amedrontado.",
      "Agilidade Halfling: Pode se mover através do espaço de criaturas de tamanho maior que o seu."
    ]
  },
  {
    id: "dnd5e.scag.ancestry.tiefling_alado",
    name: "Tiefling Alado",
    englishName: "Winged Tiefling",
    sourcePage: 118,
    abilityBonuses: "+2 Carisma, +1 Inteligência",
    attributeAdjustments: { cha: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Asas: Possui asas de morcego que concedem deslocamento de voo de 9m quando não estiver usando armadura pesada.",
      "Visão no Escuro: 18 metros de visão no escuro.",
      "Resistência Infernal: Resistência a dano de fogo."
    ]
  }
];
