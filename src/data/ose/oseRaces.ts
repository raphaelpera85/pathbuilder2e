// ============================================================================
// Old-School Essentials (OSE) - Catálogo de Raças (Fantasia Avançada)
// Fonte: OSE Tomo do Jogador, capítulo de raças, págs. impressas 79-87
//
// Cada raça declara a própria página. A atribuição anterior carimbava todas as
// dez com "p. 78", que é a página da regra opcional de levantamento de
// restrições — nenhuma raça é descrita ali.
//
// Correções de 2026-09-22 (rodada 7), todas conferidas no capítulo de raças:
//  - idiomas, modificadores de atributo e requisitos que faltavam ou divergiam;
//  - tetos de nível por classe errados em seis raças (ex.: Anão ladrão 4 em vez
//    de 9; Meio-Elfo clérigo 12 em vez de 5; Drow ladrão 10 em vez de 11);
//  - idiomas inexistentes ("Gnomo" em vez de "Gnômico") e um idioma inventado
//    no Svirfneblin;
//  - habilidades raciais que não existem no livro (Magia Inata do Drow como
//    "Luz das Fadas", "Poder Mental de Crescimento" do Duergar, "Constituição
//    Vigorosa"/"Presença Intimidadora" do Meio-Orc, "Afinidade com Ilusões" e
//    uma "Resistência Mágica Anã" fixa em +4 do Gnomo, "Resistência Heróica"
//    fixa em +4 do Halfling).
//
// Onde o livro dá um bônus que depende do valor de CON, o texto declara a
// escala em vez de fixar um número.
// ============================================================================

import type { OseAbilityName } from "./oseRules";

export interface OseRace {
  id: string;
  name: string;
  nameEn: string;
  sourceBook?: string;
  sourcePage?: number;
  description: string;
  minRequirements: Partial<Record<OseAbilityName, number>>;
  statModifiers: Partial<Record<OseAbilityName, number>>;
  nativeLanguages: string[];
  traits: string[];
  maxClassLevels: Record<string, number | null>; // null = ilimitado (14)
}

export const OSE_RACES: Record<string, OseRace> = {
  humano: {
    id: "humano",
    name: "Humano",
    nameEn: "Human",
    sourcePage: 86,
    description: "A raça mais flexível: sem habilidades raciais, escolhe qualquer classe e avança sem limite de nível.",
    minRequirements: {},
    statModifiers: {},
    nativeLanguages: ["Alinhamento", "Comum"],
    traits: [
      "Sem Habilidades Raciais: Os humanos não possuem habilidades raciais próprias.",
      "Flexibilidade de Carreira: Pode selecionar qualquer classe.",
      "Avanço Ilimitado: Progride sem limite de nível em qualquer classe.",
    ],
    maxClassLevels: {
      acrobata: 14,
      assassino: 14,
      barbaro: 14,
      bardo: 14,
      clerigo: 14,
      druida: 14,
      guerreiro: 14,
      ilusionista: 14,
      cavaleiro: 14,
      mago: 14,
      paladino: 14,
      ranger: 14,
      ladrao: 14,
    },
  },
  anao: {
    id: "anao",
    name: "Anão",
    nameEn: "Dwarf",
    sourcePage: 81,
    description: "Semi-humanos robustos e barbudos de constituição férrea, com forte resistência à magia.",
    minRequirements: { con: 9 },
    statModifiers: { cha: -1, con: 1 },
    nativeLanguages: ["Alinhamento", "Comum", "Anão", "Gnômico", "Goblin", "Kobold"],
    traits: [
      "Combate: Só pode usar armas pequenas ou de tamanho normal; não pode usar arcos longos nem espadas de duas mãos.",
      "Detectar Truques de Construção: 2 em 6 de detectar novas construções, paredes deslizantes ou passagens inclinadas ao procurar.",
      "Detectar Armadilhas de Sala: 2 em 6 de detectar armadilhas não mágicas ao procurar.",
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
      "Resiliência: Bônus nas jogadas de proteção contra veneno, feitiços e varinhas/bastões/cajados conforme a Constituição — 6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5.",
    ],
    maxClassLevels: {
      assassino: 9,
      clerigo: 8,
      guerreiro: 10,
      ladrao: 9,
    },
  },
  elfo: {
    id: "elfo",
    name: "Elfo",
    nameEn: "Elf",
    sourcePage: 82,
    description: "Semi-humanos esbeltos e feéricos de vida quase imortal, ligados à natureza e à magia.",
    minRequirements: { int: 9 },
    statModifiers: { con: -1, dex: 1 },
    nativeLanguages: ["Alinhamento", "Comum", "Élfico", "Gnoll", "Hobgoblin", "Orc"],
    traits: [
      "Detectar Portas Secretas: 2 em 6 de detectar portas escondidas e secretas ao procurar ativamente.",
      "Imunidade à Paralisia de Carniçais: Não é afetado pela paralisia que os carniçais infligem.",
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
    ],
    maxClassLevels: {
      acrobata: 10,
      assassino: 10,
      clerigo: 7,
      druida: 8,
      guerreiro: 7,
      cavaleiro: 11,
      mago: 11,
      ranger: 11,
      ladrao: 10,
    },
  },
  halfling: {
    id: "halfling",
    name: "Halfling",
    nameEn: "Halfling",
    sourcePage: 85,
    description: "Semi-humanos pequenos e rotundos de pés peludos, amigáveis e de coordenação notável.",
    minRequirements: { con: 9, dex: 9 },
    statModifiers: { dex: 1, str: -1 },
    nativeLanguages: ["Alinhamento", "Comum", "Halfling"],
    traits: [
      "Combate: A armadura precisa ser adaptada ao tamanho pequeno; só pode usar armas adequadas à estatura, e não pode usar arcos longos nem espadas de duas mãos.",
      "Bônus Defensivo: +2 na Classe de Armadura quando atacado por oponentes grandes (maiores que o tamanho humano).",
      "Bônus de Iniciativa (regra opcional): +1 nas jogadas de iniciativa individual.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
      "Bônus de Ataque de Míssil: +1 nas jogadas de ataque com todas as armas de mísseis.",
      "Resiliência: Bônus nas jogadas de proteção contra veneno, feitiços e varinhas/bastões/cajados conforme a Constituição — 6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5.",
    ],
    maxClassLevels: {
      druida: 6,
      guerreiro: 6,
      ladrao: 8,
    },
  },
  drow: {
    id: "drow",
    name: "Drow",
    nameEn: "Drow",
    sourcePage: 79,
    description: "Elfos negros subterrâneos de pele escura e cabelos prateados, quase imortais e ligados à magia.",
    minRequirements: { int: 9 },
    statModifiers: { con: -1, dex: 1 },
    nativeLanguages: ["Alinhamento", "Comum", "Comum Profundo", "Élfico", "Gnômico"],
    traits: [
      "Detectar Portas Secretas: 2 em 6 de detectar portas escondidas e secretas ao procurar ativamente.",
      "Imunidade à Paralisia de Carniçais: Não é completamente afetado pela paralisia que os carniçais infligem.",
      "Infravisão: Enxerga até 27 metros no escuro.",
      "Magia Inata: No 2º nível lança Escuridão (o reverso de Luz) uma vez por dia; no 4º nível, Detectar Magia uma vez por dia.",
      "Sensibilidade à Luz: Sob luz do dia ou luz contínua sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
    ],
    maxClassLevels: {
      acrobata: 10,
      assassino: 10,
      clerigo: 11,
      guerreiro: 7,
      cavaleiro: 9,
      mago: 9,
      ranger: 9,
      ladrao: 11,
    },
  },
  duergar: {
    id: "duergar",
    name: "Duergar",
    nameEn: "Duergar",
    sourcePage: 80,
    description: "Anões cinzentos do subsolo, gananciosos por metais e pedras e desconfiados de outras raças.",
    minRequirements: { con: 9, int: 9 },
    statModifiers: { cha: -1, con: 1 },
    nativeLanguages: ["Alinhamento", "Comum", "Comum Profundo", "Anão", "Gnômico", "Goblin", "Kobold"],
    traits: [
      "Combate: Só pode usar armas de tamanho pequeno ou normal; não pode usar arcos longos nem espadas de duas mãos.",
      "Detectar Truques de Construção: 2 em 6 de detectar novas construções, paredes deslizantes ou passagens inclinadas ao procurar.",
      "Detectar Armadilhas de Sala: 2 em 6 de detectar armadilhas de sala não mágicas ao procurar.",
      "Infravisão: Enxerga até 27 metros no escuro.",
      "Sensibilidade à Luz: Sob luz do dia ou luz contínua sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
      "Resiliência: Bônus nas jogadas de proteção contra paralisia, veneno, feitiços e varinhas/bastões/cajados conforme a Constituição — 6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5.",
      "Furtividade: No subsolo, 3 em 6 de se mover em silêncio.",
    ],
    maxClassLevels: {
      assassino: 9,
      clerigo: 8,
      guerreiro: 9,
      ladrao: 9,
    },
  },
  gnomo: {
    id: "gnomo",
    name: "Gnomo",
    nameEn: "Gnome",
    sourcePage: 83,
    description: "Semi-humanos curtos de nariz comprido, primos dos anões, mineradores e amigos dos animais escavadores.",
    minRequirements: { con: 9, int: 9 },
    statModifiers: {},
    nativeLanguages: ["Alinhamento", "Comum", "Anão", "Gnômico", "Kobold", "Mamíferos Escavadores"],
    traits: [
      "Combate: A armadura precisa ser adaptada ao tamanho pequeno; só pode usar armas adequadas à estatura, e não pode usar arcos longos nem espadas de duas mãos.",
      "Bônus Defensivo: +2 na Classe de Armadura quando atacado por oponentes grandes (maiores que o tamanho humano).",
      "Detectar Truques de Construção: 2 em 6 de detectar novas construções, paredes deslizantes ou passagens inclinadas ao procurar.",
      "Infravisão: Enxerga até 27 metros no escuro.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
      "Resistência Mágica: Bônus nas jogadas de proteção contra feitiços e varinhas/bastões/cajados conforme a Constituição — 6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5.",
      "Falar com Mamíferos Escavadores: Conhece a linguagem secreta de texugos, toupeiras e similares.",
    ],
    maxClassLevels: {
      assassino: 6,
      clerigo: 7,
      guerreiro: 6,
      ilusionista: 7,
      ladrao: 8,
    },
  },
  meio_elfo: {
    id: "meio_elfo",
    name: "Meio-Elfo",
    nameEn: "Half-Elf",
    sourcePage: 84,
    description: "Descendentes raros de elfos e humanos, com a beleza élfica e o físico robusto humano.",
    minRequirements: { cha: 9, con: 9 },
    statModifiers: {},
    nativeLanguages: ["Alinhamento", "Comum", "Élfico"],
    traits: [
      "Detectar Portas Secretas: 2 em 6 de detectar portas escondidas e secretas ao procurar ativamente.",
      "Infravisão: Enxerga até 18 metros no escuro.",
    ],
    maxClassLevels: {
      acrobata: 12,
      assassino: 11,
      bardo: 12,
      clerigo: 5,
      druida: 12,
      guerreiro: 8,
      cavaleiro: 12,
      mago: 8,
      paladino: 12,
      ranger: 8,
      ladrao: 12,
    },
  },
  meio_orc: {
    id: "meio_orc",
    name: "Meio-Orc",
    nameEn: "Half-Orc",
    sourcePage: 86,
    description: "Descendentes raros de orcs e humanos, excluídos das duas culturas e sobreviventes por qualquer meio.",
    minRequirements: {},
    statModifiers: { cha: -2, con: 1, str: 1 },
    nativeLanguages: ["Alinhamento", "Comum", "Orc"],
    traits: [
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Ataque pelas Costas: +4 para acertar e dano dobrado ao atacar por trás um oponente inconsciente.",
      "Combate: Pode usar todos os tipos de armas, armaduras de couro e cota de malha e escudos.",
      "Habilidades de Ladrão: Usa Esconder-se nas Sombras, Mover-se Silenciosamente e Pungar Bolsos.",
      "Lacaios: Lacaios a serviço de um meio-orc têm a lealdade reduzida em 1 (não se aplica a lacaios meio-orcs).",
    ],
    maxClassLevels: {
      acrobata: 8,
      assassino: 8,
      clerigo: 4,
      guerreiro: 10,
      ladrao: 8,
    },
  },
  svirfneblin: {
    id: "svirfneblin",
    name: "Svirfneblin",
    nameEn: "Svirfneblin (Deep Gnome)",
    sourcePage: 87,
    description: "Gnomos das profundezas, atarracados e de pele cinzenta nodosa, ligados à pedra e aos elementais da terra.",
    minRequirements: { con: 9 },
    statModifiers: {},
    nativeLanguages: ["Alinhamento", "Comum", "Comum Profundo", "Gnômico", "Anão", "Kobold", "Elementais da Terra"],
    traits: [
      "Infravisão: Enxerga até 27 metros no escuro.",
      "Camuflagem Rochosa: 2 em 6 de se camuflar em pedras, mesmo sob observação direta.",
      "Detectar Truques de Construção: 2 em 6 de detectar novas construções, paredes deslizantes ou passagens inclinadas ao procurar.",
      "Ouvir Ruídos: 2 em 6 de ouvir ruídos através de portas.",
      "Resistência à Ilusão: +2 em todos os testes de resistência contra ilusões.",
      "Falar com Elementais da Terra: Pode falar com os nativos do plano elemental da terra.",
      "Murmúrios de Pedra: Parado por um turno com o ouvido na pedra, 2 em 6 de sentir portas secretas, gemas ou metais, criaturas vivas ou água/espaços abertos nas proximidades.",
      "Sensibilidade à Luz: Sob luz forte sofre -2 nas jogadas de ataque e -1 na Classe de Armadura.",
    ],
    maxClassLevels: {
      assassino: 8,
      clerigo: 7,
      guerreiro: 6,
      ilusionista: 7,
      ladrao: 8,
    },
  },
};

/**
 * Proveniência por raça. A tabela é explícita para que uma raça nova não herde
 * silenciosamente a página de outra — foi o que aconteceu quando todas as dez
 * apontavam para a p. 78 (regra opcional), e não para a própria descrição.
 */
const OSE_RACE_SOURCES: Record<string, number> = {
  humano: 86,
  anao: 81,
  elfo: 82,
  halfling: 85,
  drow: 79,
  duergar: 80,
  gnomo: 83,
  meio_elfo: 84,
  meio_orc: 86,
  svirfneblin: 87,
};

for (const oseRace of Object.values(OSE_RACES)) {
  const page = OSE_RACE_SOURCES[oseRace.id];
  if (!page) throw new Error(`Raça OSE sem proveniência declarada: ${oseRace.id}`);
  oseRace.sourceBook = "Old-School Essentials — Tomo do Jogador";
  oseRace.sourcePage = page;
}
