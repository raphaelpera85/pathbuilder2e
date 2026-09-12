export interface Dnd5eClassProgression {
  classId: string;
  sourcePage: number;
  subclassLevel: number;
  abilityScoreIncreaseLevels: number[];
  spellcaster: boolean;
  spellcastingLevel?: number;
  levelOneFeatures: string[];
  featuresByLevel: Record<number, string[]>;
}

const p = (classId: string, sourcePage: number, subclassLevel: number, abilityScoreIncreaseLevels: number[], spellcaster: boolean, levelOneFeatures: string[]): Dnd5eClassProgression => {
  const spellcastingLevel = spellcaster ? (["paladino", "patrulheiro"].includes(classId) ? 2 : 1) : undefined;
  const featuresByLevel: Record<number, string[]> = { 1: levelOneFeatures };
  if (spellcastingLevel) featuresByLevel[spellcastingLevel] = [...(featuresByLevel[spellcastingLevel] || []), "Conjuração"];
  if (subclassLevel <= 20) featuresByLevel[subclassLevel] = [...(featuresByLevel[subclassLevel] || []), "Escolha de subclasse"];
  for (const level of abilityScoreIncreaseLevels) featuresByLevel[level] = [...(featuresByLevel[level] || []), "Aumento de Atributo ou Talento"];
  return { classId, sourcePage, subclassLevel, abilityScoreIncreaseLevels, spellcaster, spellcastingLevel, levelOneFeatures, featuresByLevel };
};

export const DND5E_CLASS_PROGRESSIONS: Dnd5eClassProgression[] = [
  p("barbaro", 46, 3, [4, 8, 12, 16, 19], false, ["Fúria", "Defesa sem Armadura"]),
  p("bardo", 51, 3, [4, 8, 12, 16, 19], true, ["Conjuração", "Inspiração de Bardo"]),
  p("bruxo", 56, 1, [4, 8, 12, 16, 19], true, ["Patrono Sobrenatural", "Conjuração"]),
  p("clerigo", 63, 1, [4, 8, 12, 16, 19], true, ["Conjuração", "Domínio Divino"]),
  p("druida", 71, 2, [4, 8, 12, 16, 19], true, ["Druídico", "Conjuração"]),
  p("feiticeiro", 77, 1, [4, 8, 12, 16, 19], true, ["Conjuração", "Origem Feiticeira"]),
  p("guerreiro", 83, 3, [4, 6, 8, 12, 14, 16, 19], false, ["Estilo de Luta", "Retomar o Fôlego"]),
  p("ladino", 89, 3, [4, 8, 10, 12, 16, 19], false, ["Especialização", "Ataque Furtivo", "Gíria de Ladrão"]),
  p("mago", 94, 2, [4, 8, 12, 16, 19], true, ["Conjuração", "Recuperação Arcana"]),
  p("monge", 102, 3, [4, 8, 12, 16, 19], false, ["Defesa sem Armadura", "Artes Marciais"]),
  p("paladino", 108, 3, [4, 8, 12, 16, 19], true, ["Sentido Divino", "Imposição das Mãos"]),
  p("patrulheiro", 115, 3, [4, 8, 12, 16, 19], true, ["Inimigo Favorito", "Explorador Natural"]),
];

/** Nomes das características da tabela de classe do Livro do Jogador 2014.
 * Os efeitos detalhados continuam sendo uma camada posterior; manter os níveis
 * explícitos aqui evita que o construtor apresente um marcador genérico. */
const DND5E_CLASS_FEATURES: Record<string, Record<number, string[]>> = {
  barbaro: {
    1: ["Fúria", "Defesa sem Armadura"], 2: ["Ataque Descuidado", "Sentido de Perigo"], 3: ["Caminho Primitivo"],
    5: ["Ataque Extra", "Movimento Rápido"], 6: ["Característica do Caminho"], 7: ["Instinto Feral"], 9: ["Crítico Brutal (1 dado)"],
    10: ["Característica do Caminho"], 11: ["Fúria Incansável"], 13: ["Crítico Brutal (2 dados)"], 14: ["Característica do Caminho"],
    15: ["Fúria Persistente"], 17: ["Crítico Brutal (3 dados)"], 18: ["Força Indomável"], 20: ["Campeão Primitivo"],
  },
  bardo: {
    1: ["Conjuração", "Inspiração de Bardo (d6)"], 2: ["Versatilidade", "Canção de Descanso (d6)"], 3: ["Especialização", "Colégio de Bardo"],
    5: ["Inspiração de Bardo (d8)", "Fonte de Inspiração"], 6: ["Contracanto", "Característica do Colégio"], 9: ["Canção de Descanso (d8)"],
    10: ["Especialização", "Inspiração de Bardo (d10)", "Segredos Mágicos"], 13: ["Canção de Descanso (d10)"],
    14: ["Segredos Mágicos", "Característica do Colégio"], 15: ["Inspiração de Bardo (d12)"], 17: ["Canção de Descanso (d12)"],
    18: ["Segredos Mágicos"], 20: ["Inspiração Superior"],
  },
  bruxo: {
    1: ["Patrono Sobrenatural", "Conjuração"], 2: ["Invocações Místicas"], 3: ["Dádiva do Pacto"],
    5: ["Invocação Mística"], 6: ["Característica do Patrono"], 7: ["Invocação Mística"], 8: ["Invocação Mística"],
    9: ["Invocação Mística"], 10: ["Característica do Patrono"], 11: ["Arcana Mística (6º nível)"],
    12: ["Invocação Mística"], 13: ["Arcana Mística (7º nível)"], 14: ["Característica do Patrono"],
    15: ["Arcana Mística (8º nível)"], 17: ["Arcana Mística (9º nível)"], 18: ["Invocação Mística"], 20: ["Mestre das Dádivas"],
  },
  clerigo: {
    1: ["Conjuração", "Domínio Divino"], 2: ["Canalizar Divindade (1 uso)", "Característica do Domínio"],
    5: ["Destruir Mortos-Vivos (ND 1/2)"], 6: ["Canalizar Divindade (2 usos)", "Característica do Domínio"],
    8: ["Destruir Mortos-Vivos (ND 1)", "Característica do Domínio"], 10: ["Intervenção Divina"],
    11: ["Destruir Mortos-Vivos (ND 2)"], 14: ["Destruir Mortos-Vivos (ND 3)"], 17: ["Destruir Mortos-Vivos (ND 4)", "Característica do Domínio"],
    18: ["Canalizar Divindade (3 usos)"], 20: ["Intervenção Divina Aprimorada"],
  },
  druida: {
    1: ["Druídico", "Conjuração"], 2: ["Forma Selvagem", "Círculo Druídico"], 4: ["Aprimoramento da Forma Selvagem"],
    6: ["Característica do Círculo"], 8: ["Aprimoramento da Forma Selvagem"], 10: ["Característica do Círculo"],
    14: ["Mil Formas"], 18: ["Corpo Atemporal", "Conjuração de Fera"], 20: ["Arquidruida"],
  },
  feiticeiro: {
    1: ["Conjuração", "Origem da Feitiçaria"], 2: ["Fonte de Magia"], 3: ["Metamagia"], 6: ["Característica da Origem"],
    10: ["Metamagia"], 14: ["Característica da Origem"], 17: ["Metamagia"], 18: ["Característica da Origem"], 20: ["Restauração Feiticeira"],
  },
  guerreiro: {
    1: ["Estilo de Luta", "Retomar o Fôlego"], 2: ["Surto de Ação (1 uso)"], 3: ["Arquétipo Marcial"],
    5: ["Ataque Extra"], 6: ["Aumento de Atributo"], 7: ["Característica do Arquétipo"], 8: ["Aumento de Atributo"],
    9: ["Indomável (1 uso)"], 10: ["Característica do Arquétipo"], 11: ["Ataque Extra (2)"], 13: ["Indomável (2 usos)"],
    14: ["Aumento de Atributo"], 15: ["Característica do Arquétipo"], 17: ["Surto de Ação (2 usos)", "Indomável (3 usos)"],
    18: ["Característica do Arquétipo"], 20: ["Ataque Extra (3)"],
  },
  ladino: {
    1: ["Especialização", "Ataque Furtivo", "Gíria de Ladrão"], 2: ["Ação Ardilosa"], 3: ["Arquétipo de Ladino"],
    5: ["Esquiva Sobrenatural"], 6: ["Especialização"], 7: ["Evasão"], 9: ["Característica do Arquétipo"],
    11: ["Talento Confiável"], 13: ["Característica do Arquétipo"], 14: ["Sentido Cego"], 15: ["Mente Escorregadia"],
    17: ["Característica do Arquétipo"], 18: ["Elusivo"], 20: ["Golpe de Sorte"],
  },
  mago: {
    1: ["Conjuração", "Recuperação Arcana"], 2: ["Tradição Arcana"], 4: ["Aumento de Atributo"], 6: ["Característica da Tradição Arcana"],
    10: ["Característica da Tradição Arcana"], 14: ["Característica da Tradição Arcana"], 18: ["Maestria de Magia"], 20: ["Magias de Assinatura"],
  },
  monge: {
    1: ["Defesa sem Armadura", "Artes Marciais"], 2: ["Ki", "Movimento sem Armadura"], 3: ["Tradição Monástica", "Defletir Projéteis"],
    4: ["Queda Lenta"], 5: ["Ataque Extra", "Golpe Atordoante"], 6: ["Golpes de Ki", "Característica da Tradição"],
    7: ["Evasão", "Mente Serena"], 10: ["Pureza do Corpo"], 11: ["Característica da Tradição"],
    13: ["Língua do Sol e da Lua"], 14: ["Alma de Diamante"], 17: ["Característica da Tradição"], 18: ["Corpo Vazio"], 20: ["Perfeição Pessoal"],
  },
  paladino: {
    1: ["Sentido Divino", "Imposição das Mãos"], 2: ["Estilo de Luta", "Conjuração", "Destruição Divina"], 3: ["Saúde Divina", "Juramento Sagrado"],
    5: ["Ataque Extra"], 6: ["Aura de Proteção"], 7: ["Característica do Juramento"], 8: ["Aprimoramento da Aura"],
    10: ["Aura de Coragem"], 11: ["Destruição Divina Aprimorada"], 14: ["Toque Purificador"], 15: ["Característica do Juramento"],
    18: ["Alcance da Aura Aprimorado"], 20: ["Característica do Juramento"],
  },
  patrulheiro: {
    1: ["Inimigo Favorito", "Explorador Natural"], 2: ["Estilo de Luta", "Conjuração"], 3: ["Consciência Primitiva", "Arquétipo de Patrulheiro"],
    5: ["Ataque Extra"], 7: ["Característica do Arquétipo"], 8: ["Passo da Terra"], 10: ["Esconder-se à Vista"],
    11: ["Característica do Arquétipo"], 14: ["Desaparecer"], 15: ["Característica do Arquétipo"], 18: ["Sentidos Selvagens"], 20: ["Matador de Inimigos"],
  },
};

for (const progression of DND5E_CLASS_PROGRESSIONS) {
  for (const [level, features] of Object.entries(DND5E_CLASS_FEATURES[progression.classId] || {})) {
    const levelNumber = Number(level);
    progression.featuresByLevel[levelNumber] = Array.from(new Set([...(progression.featuresByLevel[levelNumber] || []), ...features]));
  }
}

export const getDnd5eClassProgression = (classId: string) => DND5E_CLASS_PROGRESSIONS.find((item) => item.classId === classId);
