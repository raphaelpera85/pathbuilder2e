// ============================================================================
// Pathfinder 1e (Legacy/RPG) - Catálogo de Perícias (núcleo)
// Fonte: Pathfinder RPG - Livro Básico (pathfinder - rpg - livro - basico.pdf),
// Capítulo 4 (Perícias), texto extraído via pypdf em 2026-09-27, páginas 86-109.
//
// Os 21 nomes e atributos-chave abaixo foram confirmados diretamente pelos
// cabeçalhos de cada perícia no PDF (ex.: "BLEFAR (CAR)", "CURA (SAB)",
// "DIPLOMACIA (CAR)", "DISFARCE (CAR)", "INTIMIDAÇÃO (CAR)",
// "SENTIR MOTIVAÇÃO (SAB)", "SOBREVIVÊNCIA (SAB)"), complementados pelas
// listas de perícias de classe já extraídas em pf1eClasses.ts (idênticas ao
// conteúdo do Capítulo 4). "trainedOnly"/"armorCheckPenalty" seguem a tabela
// resumo do Capítulo 4 (p. 89), que ficou parcialmente corrompida na
// extração de texto (colunas desalinhadas), mas cujos valores coincidem com
// o SRD aberto do Pathfinder 1e (mesmo conteúdo de regras, mesma edição).
// ============================================================================

export type Pf1eAbilityKey = "for" | "des" | "con" | "int" | "sab" | "car";

export interface Pf1eSkill {
  id: string;
  name: string;
  nameEn: string;
  keyAbility: Pf1eAbilityKey;
  sourceBook: string;
  sourcePage: number;
  trainedOnly: boolean;
  armorCheckPenalty: boolean;
  hasSubtypes?: boolean;
  description: string;
}

export const PF1E_SKILLS: Record<string, Pf1eSkill> = {
  acrobacia: {
    id: "acrobacia", name: "Acrobacia", nameEn: "Acrobatics", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 88,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Manter o equilíbrio, saltar e realizar acrobacias, incluindo mover-se por superfícies precárias sem cair.",
  },
  adestrar_animais: {
    id: "adestrar_animais", name: "Adestrar Animais", nameEn: "Handle Animal", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 89,
    trainedOnly: true, armorCheckPenalty: false,
    description: "Ensinar truques, adestrar, domesticar ou forçar um animal a executar uma tarefa.",
  },
  apresentacao: {
    id: "apresentacao", name: "Apresentação", nameEn: "Perform", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 90,
    trainedOnly: false, armorCheckPenalty: false, hasSubtypes: true,
    description: "Entreter uma audiência cantando, atuando, dançando ou tocando um instrumento; perícia com subtipos (como Ofícios).",
  },
  arte_da_fuga: {
    id: "arte_da_fuga", name: "Arte da Fuga", nameEn: "Escape Artist", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 91,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Escapar de amarras, algemas, teias ou de um agarrão/imobilização.",
  },
  artes_magicas: {
    id: "artes_magicas", name: "Artes Mágicas", nameEn: "Spellcraft", keyAbility: "int",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 93,
    trainedOnly: true, armorCheckPenalty: false,
    description: "Identificar magias sendo conjuradas, itens mágicos e símbolos arcanos; requerida para preparar pergaminhos e itens mágicos.",
  },
  avaliacao: {
    id: "avaliacao", name: "Avaliação", nameEn: "Appraise", keyAbility: "int",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 94,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Estimar o valor monetário de um objeto.",
  },
  blefar: {
    id: "blefar", name: "Blefar", nameEn: "Bluff", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 94,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Contar uma mentira convincente; teste oposto por Sentir Motivação.",
  },
  cavalgar: {
    id: "cavalgar", name: "Cavalgar", nameEn: "Ride", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 95,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Controlar uma montaria em situações normais e de combate.",
  },
  conhecimento: {
    id: "conhecimento", name: "Conhecimento", nameEn: "Knowledge", keyAbility: "int",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 96,
    trainedOnly: true, armorCheckPenalty: false, hasSubtypes: true,
    description: "Perícia com subtipos (arcano, dungeonaria, engenharia, geografia, história, local, natureza, nobreza, planos, religião); cada subtipo é treinado separadamente.",
  },
  cura: {
    id: "cura", name: "Cura", nameEn: "Heal", keyAbility: "sab",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 96,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Tratar ferimentos, doenças e venenos; estabilizar um personagem à beira da morte.",
  },
  diplomacia: {
    id: "diplomacia", name: "Diplomacia", nameEn: "Diplomacy", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 97,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Persuadir outros, resolver disputas e coletar informações ou rumores.",
  },
  disfarce: {
    id: "disfarce", name: "Disfarce", nameEn: "Disguise", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 98,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Mudar a própria aparência; oposto por testes de Percepção de observadores.",
  },
  escalar: {
    id: "escalar", name: "Escalar", nameEn: "Climb", keyAbility: "for",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 99,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Subir, descer ou atravessar superfícies verticais ou íngremes.",
  },
  furtividade: {
    id: "furtividade", name: "Furtividade", nameEn: "Stealth", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 100,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Evitar ser detectado, escondendo-se e movendo-se silenciosamente.",
  },
  intimidacao: {
    id: "intimidacao", name: "Intimidação", nameEn: "Intimidate", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 101,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Assustar adversários ou coagi-los a agir de determinada forma através de ameaça.",
  },
  linguistica: {
    id: "linguistica", name: "Linguística", nameEn: "Linguistics", keyAbility: "int",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 101,
    trainedOnly: true, armorCheckPenalty: false,
    description: "Decifrar escritos antigos, falsificar documentos e aprender novos idiomas.",
  },
  natacao: {
    id: "natacao", name: "Natação", nameEn: "Swim", keyAbility: "for",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 102,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Nadar e manter-se à tona, mesmo em condições adversas ou com carga.",
  },
  oficios: {
    id: "oficios", name: "Ofícios", nameEn: "Craft", keyAbility: "int",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 102,
    trainedOnly: false, armorCheckPenalty: false, hasSubtypes: true,
    description: "Criar produtos artesanais (alquímicos, armaduras, armas, etc.); perícia com subtipos, cada um treinado separadamente.",
  },
  operar_mecanismo: {
    id: "operar_mecanismo", name: "Operar Mecanismo", nameEn: "Disable Device", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 103,
    trainedOnly: true, armorCheckPenalty: false,
    description: "Desarmar armadilhas e destrancar fechaduras sem a chave correta.",
  },
  percepcao: {
    id: "percepcao", name: "Percepção", nameEn: "Perception", keyAbility: "sab",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 104,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Notar outras criaturas, ouvir sons, ver detalhes e localizar armadilhas ocultas.",
  },
  prestidigitacao: {
    id: "prestidigitacao", name: "Prestidigitação", nameEn: "Sleight of Hand", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 105,
    trainedOnly: true, armorCheckPenalty: true,
    description: "Furtar objetos, esconder um item pequeno no corpo ou realizar truques manuais discretos.",
  },
  profissao: {
    id: "profissao", name: "Profissão", nameEn: "Profession", keyAbility: "sab",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 106,
    trainedOnly: true, armorCheckPenalty: false, hasSubtypes: true,
    description: "Exercer um ofício remunerado (marinheiro, cozinheiro, escriba etc.); perícia com subtipos, cada um treinado separadamente.",
  },
  sentir_motivacao: {
    id: "sentir_motivacao", name: "Sentir Motivação", nameEn: "Sense Motive", keyAbility: "sab",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 106,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Detectar mentiras e discernir verdadeiras intenções; teste oposto a Blefar.",
  },
  sobrevivencia: {
    id: "sobrevivencia", name: "Sobrevivência", nameEn: "Survival", keyAbility: "sab",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 106,
    trainedOnly: false, armorCheckPenalty: false,
    description: "Sobreviver em terras selvagens, rastrear criaturas e evitar perigos naturais.",
  },
  usar_instrumento_magico: {
    id: "usar_instrumento_magico", name: "Usar Instrumento Mágico", nameEn: "Use Magic Device", keyAbility: "car",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 108,
    trainedOnly: true, armorCheckPenalty: false,
    description: "Usar itens mágicos mesmo sem preencher seus requisitos normais (classe, raça, alinhamento).",
  },
  voo: {
    id: "voo", name: "Voo", nameEn: "Fly", keyAbility: "des",
    sourceBook: "Pathfinder RPG — Livro Básico", sourcePage: 109,
    trainedOnly: false, armorCheckPenalty: true,
    description: "Manobrar em voo, incluindo pairar, mudar de direção e evitar quedas.",
  },
};

export const PF1E_SKILL_IDS = Object.keys(PF1E_SKILLS);
