export interface Dnd5eRaceRules {
  id: string;
  name: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  size: "Pequeno" | "Médio";
  speed: number;
  languages: string;
  traits: string[];
  abilityChoices?: { count: number; amount: number; exclude?: string[] };
  languageChoices?: number;
  skillChoices?: number;
}

const r = (id: string, name: string, sourcePage: number, abilityBonuses: string, attributeAdjustments: Dnd5eRaceRules["attributeAdjustments"], size: Dnd5eRaceRules["size"], speed: number, languages: string, traits: string[], abilityChoices?: Dnd5eRaceRules["abilityChoices"], languageChoices?: number, skillChoices?: number): Dnd5eRaceRules => ({ id, name, sourcePage, abilityBonuses, attributeAdjustments, size, speed, languages, traits, abilityChoices, languageChoices, skillChoices });

export const DND5E_RACE_RULES: Dnd5eRaceRules[] = [
  r("anao", "Anão", 18, "Constituição +2", { con: 2 }, "Médio", 7.5, "Comum e Anão", ["Visão no escuro", "Resiliência anã", "Proficiência com ferramentas", "Treinamento de combate anão"]),
  r("elfo", "Elfo", 21, "Destreza +2", { dex: 2 }, "Médio", 9, "Comum e Élfico", ["Visão no escuro", "Sentidos aguçados", "Ancestralidade feérica", "Transe"]),
  r("halfling", "Halfling", 26, "Destreza +2", { dex: 2 }, "Pequeno", 7.5, "Comum e Halfling", ["Sortudo", "Bravura", "Agilidade halfling", "Furtividade natural"]),
  r("humano", "Humano", 29, "+1 em todos os atributos", { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 }, "Médio", 9, "Comum e um idioma adicional", ["Versátil", "Idioma adicional"], undefined, 1),
  r("draconato", "Draconato", 32, "Força +2, Carisma +1", { str: 2, cha: 1 }, "Médio", 9, "Comum e Dracônico", ["Ancestral dracônico", "Arma de sopro", "Resistência a dano"]),
  r("gnomo", "Gnomo", 35, "Inteligência +2", { int: 2 }, "Pequeno", 7.5, "Comum e Gnômico", ["Visão no escuro", "Astúcia gnômica"]),
  r("meio_elfo", "Meio-Elfo", 38, "Carisma +2 e +1 em dois outros atributos", { cha: 2 }, "Médio", 9, "Comum, Élfico e um idioma adicional", ["Visão no escuro", "Ancestralidade feérica", "Versatilidade em perícias"], { count: 2, amount: 1, exclude: ["cha"] }, 1, 2),
  r("meio_orc", "Meio-Orc", 40, "Força +2, Constituição +1", { str: 2, con: 1 }, "Médio", 9, "Comum e Orc", ["Visão no escuro", "Ameaçador", "Resistência implacável", "Ataques selvagens"]),
  r("tiefling", "Tiefling", 42, "Carisma +2, Inteligência +1", { cha: 2, int: 1 }, "Médio", 9, "Comum e Infernal", ["Visão no escuro", "Resistência infernal", "Legado infernal"]),
];

export const getDnd5eRaceRules = (id: string) => DND5E_RACE_RULES.find((item) => item.id === id);
