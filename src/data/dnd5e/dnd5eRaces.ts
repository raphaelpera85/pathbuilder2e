export interface Dnd5eRaceRules {
  id: string;
  name: string;
  sourcePage: number;
  abilityBonuses: string;
  size: "Pequeno" | "Médio";
  speed: number;
  languages: string;
  traits: string[];
}

const r = (id: string, name: string, sourcePage: number, abilityBonuses: string, size: Dnd5eRaceRules["size"], speed: number, languages: string, traits: string[]): Dnd5eRaceRules => ({ id, name, sourcePage, abilityBonuses, size, speed, languages, traits });

export const DND5E_RACE_RULES: Dnd5eRaceRules[] = [
  r("anao", "Anão", 18, "Constituição +2", "Médio", 7.5, "Comum e Anão", ["Visão no escuro", "Resiliência anã", "Proficiência com ferramentas", "Treinamento de combate anão"]),
  r("elfo", "Elfo", 21, "Destreza +2", "Médio", 9, "Comum e Élfico", ["Visão no escuro", "Sentidos aguçados", "Ancestralidade feérica", "Transe"]),
  r("halfling", "Halfling", 26, "Destreza +2", "Pequeno", 7.5, "Comum e Halfling", ["Sortudo", "Bravura", "Agilidade halfling", "Furtividade natural"]),
  r("humano", "Humano", 29, "+1 em todos os atributos", "Médio", 9, "Comum e um idioma adicional", ["Versátil", "Idioma adicional"]),
  r("draconato", "Draconato", 32, "Força +2, Carisma +1", "Médio", 9, "Comum e Dracônico", ["Ancestral dracônico", "Arma de sopro", "Resistência a dano"]),
  r("gnomo", "Gnomo", 35, "Inteligência +2", "Pequeno", 7.5, "Comum e Gnômico", ["Visão no escuro", "Astúcia gnômica"]),
  r("meio_elfo", "Meio-Elfo", 38, "Carisma +2 e +1 em dois outros atributos", "Médio", 9, "Comum, Élfico e um idioma adicional", ["Visão no escuro", "Ancestralidade feérica", "Versatilidade em perícias"]),
  r("meio_orc", "Meio-Orc", 40, "Força +2, Constituição +1", "Médio", 9, "Comum e Orc", ["Visão no escuro", "Ameaçador", "Resistência implacável", "Ataques selvagens"]),
  r("tiefling", "Tiefling", 42, "Carisma +2, Inteligência +1", "Médio", 9, "Comum e Infernal", ["Visão no escuro", "Resistência infernal", "Legado infernal"]),
];

export const getDnd5eRaceRules = (id: string) => DND5E_RACE_RULES.find((item) => item.id === id);
