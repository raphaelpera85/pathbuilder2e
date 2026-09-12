export interface T20RaceRules {
  id: string;
  name: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  size: "Pequeno" | "Médio" | "Minúsculo";
  speed: number;
  traits: string[];
}

const r = (id: string, name: string, sourcePage: number, abilityBonuses: string, attributeAdjustments: T20RaceRules["attributeAdjustments"], size: T20RaceRules["size"], speed: number, traits: string[]): T20RaceRules => ({ id, name, sourcePage, abilityBonuses, attributeAdjustments, size, speed, traits });

export const T20_RACE_RULES: T20RaceRules[] = [
  r("humano", "Humano", 19, "+2 em três atributos diferentes", {}, "Médio", 9, ["Versátil: treinado em duas perícias ou uma perícia e um poder geral"]),
  r("anao", "Anão", 20, "Constituição +4, Sabedoria +2, Destreza -2", { con: 4, wis: 2, dex: -2 }, "Médio", 6, ["Visão no escuro", "Devagar e Sempre", "Duro como Pedra", "Tradição de Heredrimm"]),
  r("dahllan", "Dahllan", 21, "Sabedoria +4, Destreza +2, Inteligência -2", { wis: 4, dex: 2, int: -2 }, "Médio", 9, ["Amiga das Plantas", "Armadura de Allihanna", "Empatia Selvagem"]),
  r("elfo", "Elfo", 22, "Inteligência +4, Destreza +2, Constituição -2", { int: 4, dex: 2, con: -2 }, "Médio", 12, ["Graça de Glórienn", "Herança Feérica", "Visão na penumbra", "Sentidos Élficos"]),
  r("goblin", "Goblin", 23, "Destreza +4, Inteligência +2, Carisma -2", { dex: 4, int: 2, cha: -2 }, "Pequeno", 9, ["Visão no escuro", "Deslocamento de escalada", "Peste Esguia", "Rato das Ruas"]),
  r("lefou", "Lefou", 24, "+2 em três atributos diferentes (exceto Carisma), Carisma -2", { cha: -2 }, "Médio", 9, ["Criatura da Tormenta", "Deformidade: bônus em duas perícias ou poder da Tormenta"]),
  r("minotauro", "Minotauro", 25, "Força +4, Constituição +2, Sabedoria -2", { str: 4, con: 2, wis: -2 }, "Médio", 9, ["Chifres", "Couro Rígido", "Faro", "Medo de Altura"]),
  r("qareen", "Qareen", 26, "Carisma +4, Inteligência +2, Sabedoria -2", { cha: 4, int: 2, wis: -2 }, "Médio", 9, ["Desejos", "Resistência Elemental", "Tatuagem Mística"]),
  r("golem", "Golem", 27, "Força +4, Constituição +2, Carisma -2", { str: 4, con: 2, cha: -2 }, "Médio", 6, ["Canalizar Reparos", "Chassi", "Criatura Artificial", "Visão no escuro"]),
  r("hynne", "Hynne", 27, "Destreza +4, Carisma +2, Força -2", { dex: 4, cha: 2, str: -2 }, "Pequeno", 6, ["Arremessador", "Pequeno e Rechonchudo", "Sorte Salvadora"]),
  r("kliren", "Kliren", 28, "Inteligência +4, Carisma +2, Força -2", { int: 4, cha: 2, str: -2 }, "Médio", 9, ["Híbrido", "Lógica Gnômica", "Engenhoqueiro"]),
  r("medusa", "Medusa", 28, "Destreza +4, Sabedoria +2, Carisma -2", { dex: 4, wis: 2, cha: -2 }, "Médio", 9, ["Cria de Megalokk", "Natureza Venenosa", "Olhar Atordoante"]),
  r("osteon", "Osteon", 29, "+2 em três atributos diferentes (exceto Constituição), Constituição -2", { con: -2 }, "Médio", 9, ["Armadura Óssea", "Memória Póstuma", "Natureza Esquelética"]),
  r("sereia_tritao", "Sereia/Tritão", 29, "+2 em três atributos diferentes", {}, "Médio", 9, ["Canção dos Mares", "Mestre do Tridente", "Transformação Anfíbia"]),
  r("siflide", "Sílfide", 30, "Carisma +4, Destreza +2, Força -4", { cha: 4, dex: 2, str: -4 }, "Minúsculo", 9, ["Asas de Borboleta", "Resistência Feérica", "Pequenina e Travessa"]),
  r("suraggel", "Suraggel", 30, "+2 em três atributos diferentes", {}, "Médio", 9, ["Herança Divina", "Luz Sagrada (Aggelus) ou Sombras Profanas (Sulfure)"]),
  r("trog", "Trog", 31, "Constituição +4, Força +2, Inteligência -2", { con: 4, str: 2, int: -2 }, "Médio", 9, ["Mau Cheiro", "Mordida", "Resistência a veneno"]),
];

export const getT20RaceRules = (id: string) => T20_RACE_RULES.find((item) => item.id === id);
