import { PF1E_CLASSES } from "./pf1eClasses";

export interface Pf1eSpellListEntry {
  id: string;
  name: string;
  summary: string;
}

/** Truques de clérigo do Livro Básico PF1e, lista de classe da p. 226. */
export const PF1E_CLERIC_CANTRIPS: Pf1eSpellListEntry[] = [
  { id: "criar-agua", name: "Criar Água", summary: "Cria até 8 litros de água pura por nível de conjurador." },
  { id: "detectar-magia", name: "Detectar Magia", summary: "Revela a presença, quantidade, força, localização e, com teste de Conhecimento (arcano), escola de auras mágicas conforme o tempo de concentração." },
  { id: "detectar-venenos", name: "Detectar Venenos", summary: "Detecta venenos em uma criatura ou objeto." },
  { id: "emendar", name: "Emendar", summary: "Faz pequenos reparos em um objeto." },
  { id: "estabilizar", name: "Estabilizar", summary: "Estabiliza uma criatura que esteja morrendo." },
  { id: "ler-magias", name: "Ler Magias", summary: "Decifra pergaminhos ou grimórios." },
  { id: "luz", name: "Luz", summary: "Faz um objeto brilhar como uma tocha." },
  { id: "orientacao", name: "Orientação", summary: "Concede +1 a uma jogada de ataque, teste de resistência ou teste de perícia." },
  { id: "purificar-alimentos", name: "Purificar Alimentos", summary: "Purifica um cubo de comida ou água de 30 cm por nível de conjurador." },
  { id: "resistencia", name: "Resistência", summary: "Concede ao alvo +1 em testes de resistência." },
  { id: "sangrar", name: "Sangrar", summary: "Faz uma criatura estabilizada voltar a morrer." },
  { id: "virtude", name: "Virtude", summary: "Concede ao alvo 1 ponto de vida temporário." },
];

export function pf1eClericCantripRows() {
  const cleric = PF1E_CLASSES.clerigo;
  return PF1E_CLERIC_CANTRIPS.map((spell) => ({
    id: `pf1e.crb.spell.clerigo.0.${spell.id}`,
    system_id: "pf1e",
    name_pt: spell.name,
    description_pt: spell.summary,
    rarity: "common",
    ruleset: "legacy_pf1",
    source_book: "Pathfinder RPG — Livro Básico",
    source_page: 226,
    traits: [],
    data: {
      category: "magia",
      classId: cleric.id,
      classIds: [cleric.id],
      spellClasses: { "pt-BR": [cleric.name], en: [cleric.nameEn] },
      spellLevel: 0,
      level: 0,
      classListPage: 226,
      sourcePage: 226,
      summaryOnly: true,
    },
  }));
}
