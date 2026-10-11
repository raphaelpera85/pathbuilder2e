import { PF1E_CLASSES } from "./pf1eClasses";

export interface Pf1eSpellListEntry {
  id: string;
  name: string;
  summary: string;
}

/** Truques de bardo do Livro Básico PF1e, lista de classe da p. 224. */
export const PF1E_BARD_CANTRIPS: Pf1eSpellListEntry[] = [
  { id: "abrir-fechar", name: "Abrir/Fechar", summary: "Abre ou fecha objetos pequenos ou leves." },
  { id: "brilho", name: "Brilho", summary: "Ofusca uma criatura, impondo –1 nas jogadas de ataque." },
  { id: "cancao-de-ninar", name: "Canção de Ninar", summary: "Deixa o alvo sonolento, reduz Percepção em 5 e impõe –2 em testes de Vontade contra sono." },
  { id: "convocar-instrumento", name: "Convocar Instrumento", summary: "Convoca um instrumento musical." },
  { id: "detectar-magia", name: "Detectar Magia", summary: "Detecta magias e itens mágicos a até 18 metros." },
  { id: "emendar", name: "Emendar", summary: "Faz pequenos reparos em um objeto." },
  { id: "globos-de-luz", name: "Globos de Luz", summary: "Cria tochas ou outras luzes." },
  { id: "intuir-direcao", name: "Intuir Direção", summary: "Permite ao personagem saber onde fica o norte." },
  { id: "ler-magias", name: "Ler Magias", summary: "Decifra pergaminhos ou grimórios." },
  { id: "luz", name: "Luz", summary: "Faz um objeto brilhar como uma tocha." },
  { id: "maos-magicas", name: "Mãos Mágicas", summary: "Move telecineticamente um objeto de até 2,5 kg." },
  { id: "mensagem", name: "Mensagem", summary: "Permite uma conversa em voz baixa à distância." },
  { id: "pasmar", name: "Pasmar", summary: "Faz um humanoide com 4 DV ou menos perder sua próxima ação." },
  { id: "prestidigitacao-arcana", name: "Prestidigitação Arcana", summary: "Realiza pequenos truques mágicos." },
  { id: "resistencia", name: "Resistência", summary: "Concede ao alvo +1 em testes de resistência." },
  { id: "som-fantasma", name: "Som Fantasma", summary: "Cria sons ilusórios." },
];

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

/** Truques de druida do Livro Básico PF1e, lista de classe da p. 230. */
export const PF1E_DRUID_CANTRIPS: Pf1eSpellListEntry[] = [
  { id: "brilho", name: "Brilho", summary: "Ofusca uma criatura, impondo –1 nas jogadas de ataque." },
  { id: "criar-agua", name: "Criar Água", summary: "Cria até 8 litros de água pura por nível de conjurador." },
  { id: "detectar-magia", name: "Detectar Magia", summary: "Detecta magias e itens mágicos em um raio de 18 metros." },
  { id: "detectar-venenos", name: "Detectar Venenos", summary: "Detecta venenos em uma criatura ou objeto." },
  { id: "emendar", name: "Emendar", summary: "Faz pequenos reparos em um objeto." },
  { id: "estabilizar", name: "Estabilizar", summary: "Estabiliza uma criatura que esteja morrendo." },
  { id: "intuir-direcao", name: "Intuir Direção", summary: "Permite ao personagem saber onde fica o norte." },
  { id: "ler-magias", name: "Ler Magias", summary: "Decifra pergaminhos ou grimórios." },
  { id: "luz", name: "Luz", summary: "Faz um objeto brilhar como uma tocha." },
  { id: "orientacao", name: "Orientação", summary: "Concede +1 a uma jogada de ataque, teste de resistência ou teste de perícia." },
  { id: "purificar-alimentos", name: "Purificar Alimentos", summary: "Purifica até um cubo de comida ou água de 30 cm por nível de conjurador." },
  { id: "resistencia", name: "Resistência", summary: "Concede ao alvo +1 em testes de resistência." },
  { id: "virtude", name: "Virtude", summary: "Concede ao alvo 1 ponto de vida temporário." },
];

/** Truques de Feiticeiro/Mago do Livro Básico PF1e, lista compartilhada da p. 232. */
export const PF1E_SORCERER_WIZARD_CANTRIPS: Pf1eSpellListEntry[] = [
  { id: "abrir-fechar", name: "Abrir/Fechar", summary: "Abre ou fecha objetos pequenos ou leves." },
  { id: "brilho", name: "Brilho", summary: "Ofusca uma criatura, impondo –1 nas jogadas de ataque." },
  { id: "detectar-magia", name: "Detectar Magia", summary: "Detecta magias e itens mágicos em um raio de 18 metros." },
  { id: "detectar-venenos", name: "Detectar Venenos", summary: "Detecta venenos em uma criatura ou objeto pequeno." },
  { id: "emendar", name: "Emendar", summary: "Faz pequenos reparos em um objeto." },
  { id: "globos-de-luz", name: "Globos de Luz", summary: "Cria tochas ou outras luzes." },
  { id: "jorro-acido", name: "Jorro Ácido", summary: "Uma esfera causa 1d3 pontos de dano por ácido." },
  { id: "ler-magias", name: "Ler Magias", summary: "Decifra pergaminhos ou grimórios." },
  { id: "luz", name: "Luz", summary: "Um objeto brilha como uma tocha." },
  { id: "maos-magicas", name: "Mãos Mágicas", summary: "Move telecineticamente um objeto de até 2,5 kg." },
  { id: "mensagem", name: "Mensagem", summary: "Permite uma conversa sussurrada à distância." },
  { id: "marca-arcana", name: "Marca Arcana", summary: "Inscreve uma runa pessoal visível ou invisível em objeto ou criatura." },
  { id: "pasmar", name: "Pasmar", summary: "Um humanoide com 4 DV ou menos perde sua próxima ação." },
  { id: "prestidigitacao-arcana", name: "Prestidigitação Arcana", summary: "Realiza pequenos truques." },
  { id: "raio-de-gelo", name: "Raio de Gelo", summary: "Um raio causa 1d3 pontos de dano por frio." },
  { id: "resistencia", name: "Resistência", summary: "O alvo recebe +1 em testes de resistência." },
  { id: "romper-morto-vivo", name: "Romper Morto-Vivo", summary: "Causa 1d6 pontos de dano a um morto-vivo." },
  { id: "sangrar", name: "Sangrar", summary: "Faz uma criatura estabilizada continuar morrendo." },
  { id: "som-fantasma", name: "Som Fantasma", summary: "Cria sons ilusórios." },
  { id: "toque-da-fadiga", name: "Toque da Fadiga", summary: "Um ataque de toque deixa o alvo fatigado." },
];

const PF1E_CANTRIP_LISTS = [
  { classId: "bardo", sourcePage: 224, entries: PF1E_BARD_CANTRIPS },
  { classId: "clerigo", sourcePage: 226, entries: PF1E_CLERIC_CANTRIPS },
  { classId: "druida", sourcePage: 230, entries: PF1E_DRUID_CANTRIPS },
  { classIds: ["feiticeiro", "mago"], listId: "feiticeiro_mago", sourcePage: 232, entries: PF1E_SORCERER_WIZARD_CANTRIPS },
] as const;

export function pf1eCoreCantripRows() {
  return PF1E_CANTRIP_LISTS.flatMap((list) => {
    const classIds = "classId" in list ? [list.classId] : list.classIds;
    const spellClasses = classIds.map((classId) => PF1E_CLASSES[classId]);
    return list.entries.map((spell) => ({
    id: `pf1e.crb.spell.${"classId" in list ? list.classId : list.listId}.0.${spell.id}`,
    system_id: "pf1e",
    name_pt: spell.name,
    description_pt: spell.summary,
    rarity: "common",
    ruleset: "legacy_pf1",
    source_book: "Pathfinder RPG — Livro Básico",
    source_page: list.sourcePage,
    traits: [],
    data: {
      category: "magia",
      ...(classIds.length === 1 ? { classId: classIds[0] } : {}),
      classIds,
      spellClasses: { "pt-BR": spellClasses.map((spellClass) => spellClass.name), en: spellClasses.map((spellClass) => spellClass.nameEn) },
      spellLevel: 0,
      level: 0,
      classListPage: list.sourcePage,
      classListPages: Object.fromEntries(classIds.map((classId) => [classId, list.sourcePage])),
      sourcePage: list.sourcePage,
      summaryOnly: true,
    },
  }));
  });
}
