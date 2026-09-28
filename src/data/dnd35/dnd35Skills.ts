// ============================================================================
// D&D 3.5 - Catálogo de Perícias (núcleo)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 4 — Perícias, Tabela 4-2: Perícias (página 63). O PDF
// fonte é uma digitalização de imagem sem camada de texto (confirmado via
// pypdf/pymupdf: 0 caracteres extraíveis em todas as páginas). Os dados
// abaixo foram transcritos por leitura visual direta da tabela mestre
// renderizada em alta resolução (400dpi), não por OCR nem por memória.
//
// A tabela lista 34 linhas de perícia, mas "Conhecimento" e "Ofícios" têm
// múltiplos subtipos possíveis; cada subtipo listado na tabela ou citado
// pelas classes já catalogadas ganhou sua própria entrada aqui, totalizando
// 45 perícias distintas.
// ============================================================================

export type Dnd35AbilityKey = "for" | "des" | "con" | "int" | "sab" | "car" | "nenhuma";

export interface Dnd35Skill {
  id: string;
  name: string;
  sourceBook: string;
  sourcePage: number;
  keyAbility: Dnd35AbilityKey;
  usableUntrained: boolean;
  armorCheckPenalty: boolean;
  doubleArmorCheckPenalty?: boolean;
}

export const DND35_SKILLS: Record<string, Dnd35Skill> = {
  "abrir-fechaduras": { id: "abrir-fechaduras", name: "Abrir Fechaduras", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: false, armorCheckPenalty: false },
  acrobacia: { id: "acrobacia", name: "Acrobacia", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: true },
  "adestrar-animais": { id: "adestrar-animais", name: "Adestrar Animais", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: false, armorCheckPenalty: false },
  "arte-da-fuga": { id: "arte-da-fuga", name: "Arte da Fuga", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: true },
  atuacao: { id: "atuacao", name: "Atuação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  avaliacao: { id: "avaliacao", name: "Avaliação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: true, armorCheckPenalty: false },
  blefar: { id: "blefar", name: "Blefar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  cavalgar: { id: "cavalgar", name: "Cavalgar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: false },
  concentracao: { id: "concentracao", name: "Concentração", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "con", usableUntrained: true, armorCheckPenalty: false },
  "conhecimento-arcano": { id: "conhecimento-arcano", name: "Conhecimento (arcano)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-arquitetura-engenharia": { id: "conhecimento-arquitetura-engenharia", name: "Conhecimento (arquitetura e engenharia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-geografia": { id: "conhecimento-geografia", name: "Conhecimento (geografia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-historia": { id: "conhecimento-historia", name: "Conhecimento (história)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-local": { id: "conhecimento-local", name: "Conhecimento (local)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-masmorras": { id: "conhecimento-masmorras", name: "Conhecimento (masmorras)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-natureza": { id: "conhecimento-natureza", name: "Conhecimento (natureza)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-nobreza-realeza": { id: "conhecimento-nobreza-realeza", name: "Conhecimento (nobreza e realeza)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-planos": { id: "conhecimento-planos", name: "Conhecimento (planos)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  "conhecimento-religiao": { id: "conhecimento-religiao", name: "Conhecimento (religião)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  cura: { id: "cura", name: "Cura", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  "decifrar-escrita": { id: "decifrar-escrita", name: "Decifrar Escrita", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  diplomacia: { id: "diplomacia", name: "Diplomacia", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  disfarces: { id: "disfarces", name: "Disfarces", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  equilibrio: { id: "equilibrio", name: "Equilíbrio", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: true },
  escalar: { id: "escalar", name: "Escalar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "for", usableUntrained: true, armorCheckPenalty: true },
  "esconder-se": { id: "esconder-se", name: "Esconder-se", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: true },
  "falar-idioma": { id: "falar-idioma", name: "Falar Idioma", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "nenhuma", usableUntrained: false, armorCheckPenalty: false },
  falsificacao: { id: "falsificacao", name: "Falsificação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: true, armorCheckPenalty: false },
  furtividade: { id: "furtividade", name: "Furtividade", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: true },
  "identificar-magia": { id: "identificar-magia", name: "Identificar Magia", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  intimidacao: { id: "intimidacao", name: "Intimidação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  natacao: { id: "natacao", name: "Natação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "for", usableUntrained: true, armorCheckPenalty: true, doubleArmorCheckPenalty: true },
  observar: { id: "observar", name: "Observar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  "obter-informacao": { id: "obter-informacao", name: "Obter Informação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: true, armorCheckPenalty: false },
  oficios: { id: "oficios", name: "Ofícios", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: true, armorCheckPenalty: false },
  "operar-mecanismo": { id: "operar-mecanismo", name: "Operar Mecanismo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: false, armorCheckPenalty: false },
  ouvir: { id: "ouvir", name: "Ouvir", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  prestidigitacao: { id: "prestidigitacao", name: "Prestidigitação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: false, armorCheckPenalty: true },
  procurar: { id: "procurar", name: "Procurar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "int", usableUntrained: true, armorCheckPenalty: false },
  profissao: { id: "profissao", name: "Profissão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  saltar: { id: "saltar", name: "Saltar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "for", usableUntrained: true, armorCheckPenalty: true },
  "sentir-motivacao": { id: "sentir-motivacao", name: "Sentir Motivação", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  sobrevivencia: { id: "sobrevivencia", name: "Sobrevivência", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "sab", usableUntrained: true, armorCheckPenalty: false },
  "usar-cordas": { id: "usar-cordas", name: "Usar Cordas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "des", usableUntrained: true, armorCheckPenalty: false },
  "usar-instrumento-magico": { id: "usar-instrumento-magico", name: "Usar Instrumento Mágico", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 63, keyAbility: "car", usableUntrained: false, armorCheckPenalty: false },
};

export const DND35_SKILL_IDS = Object.keys(DND35_SKILLS);
