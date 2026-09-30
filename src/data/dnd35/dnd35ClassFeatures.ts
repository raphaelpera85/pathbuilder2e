// ============================================================================
// D&D 3.5 - Tabelas de classe nível a nível (classes sem magia)
// Fonte: D&D 3.5 - Livro do Jogador, Capítulo 3 (páginas impressas):
//   Tabela 3-3: O Bárbaro (p. 25)   Tabela 3-11: O Guerreiro (p. 42)
//   Tabela 3-12: O Ladino (p. 43)   Tabela 3-14: O Monge (p. 49)
//   Conjuradores: 3-4 Bardo (p. 27), 3-6 Clérigo (p. 31), 3-8 Druida (p. 35),
//   3-9 Feiticeiro (p. 38), 3-13 Mago (p. 46), 3-16 Paladino (p. 52),
//   3-17 Ranger/Patrulheiro (p. 56).
// PDF escaneado sem camada de texto; transcrito por leitura visual das
// tabelas renderizadas em 400dpi. As colunas de BBA e resistências foram
// digitadas a partir das tabelas das classes (independentes da Tabela 3-1)
// e compartilhadas entre classes onde a impressão é idêntica (BBA do Bárbaro
// = do Guerreiro; Ladino = Monge). O teste confere essas colunas contra a
// Tabela 3-1 e contra a progressão declarada em dnd35Classes.ts.
// Coluna "Especial" transcrita literalmente ("—" = nenhuma); a do Guerreiro
// é gerada (níveis 1 e pares) e o teste fixa a lista de níveis impressa.
// As colunas "Magias por dia"/"Magias conhecidas" estão em dnd35Spellcasting.ts.
// ============================================================================

export interface Dnd35ClassLevelRow {
  level: number;
  baseAttack: string; // como impresso, p.ex. "+16/+11/+6/+1"
  fortitude: number;
  reflexos: number;
  vontade: number;
  special: string[];
}

export interface Dnd35MonkExtras {
  level: number;
  flurryAttack: string; // Bônus de Ataque da Rajada de Golpes
  unarmedDamageMedium: string; // monge Médio (Tabela 3-15 cobre Pequeno/Grande)
  acBonus: number;
  unarmoredSpeedBonusM: number;
}

export interface Dnd35ClassTable {
  classId: string;
  table: string;
  sourcePage: number;
  rows: Dnd35ClassLevelRow[];
}

const BAB_GOOD = ["+1", "+2", "+3", "+4", "+5", "+6/+1", "+7/+2", "+8/+3", "+9/+4", "+10/+5", "+11/+6/+1", "+12/+7/+2", "+13/+8/+3", "+14/+9/+4", "+15/+10/+5", "+16/+11/+6/+1", "+17/+12/+7/+2", "+18/+13/+8/+3", "+19/+14/+9/+4", "+20/+15/+10/+5"];
const BAB_MEDIUM = ["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6/+1", "+6/+1", "+7/+2", "+8/+3", "+9/+4", "+9/+4", "+10/+5", "+11/+6/+1", "+12/+7/+2", "+12/+7/+2", "+13/+8/+3", "+14/+9/+4", "+15/+10/+5"];
const BAB_POOR = ["+0", "+1", "+1", "+2", "+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6/+1", "+6/+1", "+7/+2", "+7/+2", "+8/+3", "+8/+3", "+9/+4", "+9/+4", "+10/+5"];
const GOOD = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12];
const POOR = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6];

function build(bab: string[], fort: number[], ref: number[], will: number[], special: string[][]): Dnd35ClassLevelRow[] {
  return special.map((s, i) => ({ level: i + 1, baseAttack: bab[i], fortitude: fort[i], reflexos: ref[i], vontade: will[i], special: s }));
}

const NONE: string[] = [];

export const DND35_CLASS_TABLES: Record<string, Dnd35ClassTable> = {
  barbaro: {
    classId: "barbaro", table: "Tabela 3-3", sourcePage: 25,
    rows: build(BAB_GOOD, GOOD, POOR, POOR, [
      ["Movimento Rápido", "analfabetismo", "fúria 1/dia"],
      ["Esquiva sobrenatural"],
      ["Sentir armadilhas +1"],
      ["Fúria 2/dia"],
      ["Esquiva sobrenatural aprimorada"],
      ["Sentir armadilhas +2"],
      ["Redução de dano 1/-"],
      ["Fúria 3/dia"],
      ["Sentir armadilhas +3"],
      ["Redução de dano 2/-"],
      ["Fúria maior"],
      ["Fúria 4/dia", "sentir armadilhas +4"],
      ["Redução de dano 3/-"],
      ["Vontade inabalável"],
      ["Sentir armadilhas +5"],
      ["Redução de dano 4/-", "fúria 5/dia"],
      ["Fúria incansável"],
      ["Sentir armadilhas +6"],
      ["Redução de dano 5/-"],
      ["Fúria poderosa", "fúria 6/dia"],
    ]),
  },
  guerreiro: {
    classId: "guerreiro", table: "Tabela 3-11", sourcePage: 42,
    rows: build(BAB_GOOD, GOOD, POOR, POOR, Array.from({ length: 20 }, (_, i) =>
      (i + 1 === 1 || (i + 1) % 2 === 0) ? ["Talento Adicional"] : NONE)),
  },
  ladino: {
    classId: "ladino", table: "Tabela 3-12", sourcePage: 43,
    rows: build(BAB_MEDIUM, POOR, GOOD, POOR, [
      ["Ataque furtivo +1d6", "encontrar armadilhas"],
      ["Evasão"],
      ["Ataque furtivo +2d6", "sentir armadilhas +1"],
      ["Esquiva sobrenatural"],
      ["Ataque furtivo +3d6"],
      ["Sentir armadilhas +2"],
      ["Ataque furtivo +4d6"],
      ["Esquiva sobrenatural aprimorada"],
      ["Ataque furtivo +5d6", "sentir armadilhas +3"],
      ["Habilidade especial"],
      ["Ataque furtivo +6d6"],
      ["Sentir armadilhas +4"],
      ["Ataque furtivo +7d6", "habilidade especial"],
      NONE,
      ["Ataque furtivo +8d6", "sentir armadilhas +5"],
      ["Habilidade Especial"],
      ["Ataque furtivo +9d6"],
      ["Sentir armadilhas +6"],
      ["Ataque furtivo +10d6", "habilidade especial"],
      NONE,
    ]),
  },
  monge: {
    classId: "monge", table: "Tabela 3-14", sourcePage: 49,
    rows: build(BAB_MEDIUM, GOOD, GOOD, GOOD, [
      ["Talento adicional", "rajada de golpes", "ataque desarmado"],
      ["Talento adicional", "evasão"],
      ["Mente tranqüila"],
      ["Ataque chi (mágico)", "queda suave 6 m"],
      ["Pureza corporal"],
      ["Talento adicional", "queda suave 9 m"],
      ["Integridade corporal"],
      ["Queda suave 12 m"],
      ["Evasão aprimorada"],
      ["Ataque chi (ordem)", "queda suave 15 m"],
      ["Corpo de diamante", "rajada maior"],
      ["Passo etéreo", "queda suave 18m"],
      ["Alma de diamante"],
      ["Queda suave 21 m"],
      ["Mão vibrante"],
      ["Ataque chi (adamante)", "queda suave 24 m"],
      ["Corpo atemporal", "idiomas do sol e da lua"],
      ["Queda suave 27 m"],
      ["Corpo vazio"],
      ["Auto-perfeição", "queda suave qualquer distância"],
    ]),
  },
  bardo: {
    classId: "bardo", table: "Tabela 3-4", sourcePage: 27,
    rows: build(BAB_MEDIUM, POOR, GOOD, GOOD, [
      ["Música de bardo", "conhecimento de bardo", "música de proteção", "fascinar", "inspirar coragem +1"],
      NONE,
      ["Inspirar competência"],
      NONE, NONE,
      ["Sugestão"],
      NONE,
      ["Inspirar coragem +2"],
      ["Inspirar grandeza"],
      NONE, NONE,
      ["Melodia da libertação"],
      NONE,
      ["Inspirar coragem +3"],
      ["Inspirar heroísmo"],
      NONE, NONE,
      ["sugestão em massa"],
      NONE,
      ["Inspirar coragem +4"],
    ]),
  },
  clerigo: {
    classId: "clerigo", table: "Tabela 3-6", sourcePage: 31,
    rows: build(BAB_MEDIUM, GOOD, POOR, GOOD, [
      ["Expulsar ou fascinar mortos-vivos"],
      ...Array.from({ length: 19 }, () => NONE),
    ]),
  },
  druida: {
    classId: "druida", table: "Tabela 3-8", sourcePage: 35,
    rows: build(BAB_MEDIUM, GOOD, POOR, GOOD, [
      ["Companheiro animal", "senso da natureza", "empatia com a natureza"],
      ["Caminho da Floresta"],
      ["Rastro Invisível"],
      ["Resistir à tentação da natureza"],
      ["Forma selvagem (1/dia)"],
      ["Forma selvagem (2/dia)"],
      ["Forma selvagem (3/dia)"],
      ["Forma selvagem (Grande)"],
      ["Imunidade a venenos"],
      ["Forma selvagem (4/dia)"],
      ["Forma selvagem (Miúda)"],
      ["Forma selvagem (plantas)"],
      ["Mil faces"],
      ["Forma selvagem (5/dia)"],
      ["Corpo atemporal", "forma selvagem (Enorme)"],
      ["Forma selvagem (elemental 1/dia)"],
      NONE,
      ["Forma selvagem (6/dia, elemental 2/dia)"],
      NONE,
      ["Forma selvagem (elemental 3/dia, elemental Enorme)"],
    ]),
  },
  feiticeiro: {
    classId: "feiticeiro", table: "Tabela 3-9", sourcePage: 38,
    rows: build(BAB_POOR, POOR, POOR, GOOD, [["Invocar familiar"], ...Array.from({ length: 19 }, () => NONE)]),
  },
  mago: {
    classId: "mago", table: "Tabela 3-13", sourcePage: 46,
    rows: build(BAB_POOR, POOR, POOR, GOOD, Array.from({ length: 20 }, (_, i) =>
      i === 0 ? ["Invocar familiar", "escrever pergaminho"] : (i + 1) % 5 === 0 ? ["Talento adicional"] : NONE)),
  },
  paladino: {
    classId: "paladino", table: "Tabela 3-16", sourcePage: 52,
    rows: build(BAB_GOOD, GOOD, POOR, POOR, [
      ["Aura do bem", "detectar o mal", "destruir o mal 1/dia"],
      ["Graça divina", "cura pelas mãos"],
      ["Aura de coragem", "saúde divina"],
      ["Expulsar mortos-vivos"],
      ["Destruir o mal 2/dia", "montaria especial"],
      ["Remover doença 1/semana"],
      NONE, NONE,
      ["Remover doença 2/semana"],
      ["Destruir o mal 3/dia"],
      NONE,
      ["Remover doença 3/semana"],
      NONE, NONE,
      ["Remover doença 4/semana", "destruir o mal 4/dia"],
      NONE, NONE,
      ["Remover doença 5/semana"],
      NONE,
      ["Destruir o mal 5/dia"],
    ]),
  },
  patrulheiro: {
    classId: "patrulheiro", table: "Tabela 3-17 (O Ranger)", sourcePage: 56,
    rows: build(BAB_GOOD, GOOD, GOOD, POOR, [
      ["1º inimigo predileto", "rastrear", "empatia com a natureza"],
      ["Estilo de Combate"],
      ["Tolerância"],
      ["Companheiro animal"],
      ["2º inimigo predileto"],
      ["Estilo de Combate Aprimorado"],
      ["Caminho da floresta"],
      ["Rastreador Eficaz"],
      ["Evasão"],
      ["3º inimigo predileto"],
      ["Domínio do Estilo de Combate"],
      NONE,
      ["Camuflagem"],
      NONE,
      ["4º inimigo predileto"],
      NONE,
      ["Mimetismo"],
      NONE, NONE,
      ["5º inimigo predileto"],
    ]),
  },
};

/** Colunas extras da Tabela 3-14 (p. 49). Dano desarmado para monge Médio. */
export const DND35_MONK_EXTRAS: readonly Dnd35MonkExtras[] = [
  ["-2/-2", "1d6", 0, 0], ["-1/-1", "1d6", 0, 0], ["+0/+0", "1d6", 0, 3], ["+1/+1", "1d8", 0, 3],
  ["+2/+2", "1d8", 1, 3], ["+3/+3", "1d8", 1, 6], ["+4/+4", "1d8", 1, 6], ["+5/+5/+0", "1d10", 1, 6],
  ["+6/+6/+1", "1d10", 1, 9], ["+7/+7/+2", "1d10", 2, 9], ["+8/+8/+8/+3", "1d10", 2, 9], ["+9/+9/+9/+4", "2d6", 2, 12],
  ["+9/+9/+9/+4", "2d6", 2, 12], ["+10/+10/+10/+5", "2d6", 2, 12], ["+11/+11/+11/+6/+1", "2d6", 3, 15], ["+12/+12/+12/+7/+2", "2d8", 3, 15],
  ["+12/+12/+12/+7/+2", "2d8", 3, 15], ["+13/+13/+13/+8/+3", "2d8", 3, 18], ["+14/+14/+14/+9/+4", "2d8", 3, 18], ["+15/+15/+15/+10/+5", "2d10", 4, 18],
].map(([flurryAttack, unarmedDamageMedium, acBonus, unarmoredSpeedBonusM], i) => ({
  level: i + 1,
  flurryAttack: flurryAttack as string,
  unarmedDamageMedium: unarmedDamageMedium as string,
  acBonus: acBonus as number,
  unarmoredSpeedBonusM: unarmoredSpeedBonusM as number,
}));

/** Habilidades especiais obtidas até o nível informado (inclusive). */
export function dnd35ClassFeaturesUpTo(classId: string, level: number): { level: number; name: string }[] {
  const table = DND35_CLASS_TABLES[classId];
  if (!table) return [];
  return table.rows
    .filter((row) => row.level <= level)
    .flatMap((row) => row.special.map((name) => ({ level: row.level, name })));
}
