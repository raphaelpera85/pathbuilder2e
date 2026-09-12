export const DND5E_SOURCE_BOOK = "D&D 5e — Livro do Jogador (2014)";

export interface Dnd5eCatalogEntry {
  id: string;
  name: string;
  sourcePage: number;
}

const entry = (id: string, name: string, sourcePage: number): Dnd5eCatalogEntry => ({ id, name, sourcePage });

export const DND5E_RACES: Dnd5eCatalogEntry[] = ([
  ["anao", "Anão", 18], ["elfo", "Elfo", 21], ["halfling", "Halfling", 26], ["humano", "Humano", 29],
  ["draconato", "Draconato", 32], ["gnomo", "Gnomo", 35], ["meio_elfo", "Meio-Elfo", 38], ["meio_orc", "Meio-Orc", 40],
  ["tiefling", "Tiefling", 42],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const DND5E_CLASSES: Dnd5eCatalogEntry[] = ([
  ["barbaro", "Bárbaro", 46], ["bardo", "Bardo", 51], ["bruxo", "Bruxo", 56], ["clerigo", "Clérigo", 63],
  ["druida", "Druida", 71], ["feiticeiro", "Feiticeiro", 77], ["guerreiro", "Guerreiro", 83], ["ladino", "Ladino", 89],
  ["mago", "Mago", 94], ["monge", "Monge", 102], ["paladino", "Paladino", 108], ["patrulheiro", "Patrulheiro", 115],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const DND5E_SKILLS: Dnd5eCatalogEntry[] = ([
  ["acrobacia", "Acrobacia", 177], ["adestramento", "Adestramento", 177], ["arcanismo", "Arcanismo", 177], ["atletismo", "Atletismo", 177],
  ["atuacao", "Atuação", 177], ["enganacao", "Enganação", 177], ["furtividade", "Furtividade", 177], ["historia", "História", 177],
  ["intuicao", "Intuição", 177], ["intimidacao", "Intimidação", 177], ["investigacao", "Investigação", 177], ["medicina", "Medicina", 177],
  ["natureza", "Natureza", 177], ["percepcao", "Percepção", 177], ["persuasao", "Persuasão", 177], ["prestidigitacao", "Prestidigitação", 177],
  ["religiao", "Religião", 177], ["sobrevivencia", "Sobrevivência", 177],
] as const).map(([id, name, sourcePage]) => entry(id, name, sourcePage));

export const DND5E_CREATION_STEPS = [
  "conceito", "raca", "classe", "atributos", "antecedente", "equipamento", "detalhes", "magia",
] as const;
