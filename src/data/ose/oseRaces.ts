// ============================================================================
// Old-School Essentials (OSE) - Catálogo de Raças (Advanced Fantasy)
// Fonte: OSE Tomo do Jogador págs. 78-88
// ============================================================================

import type { OseAbilityName } from "./oseRules";

export interface OseRace {
  id: string;
  name: string;
  nameEn: string;
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
    description: "A mais numerosa e versátil das raças de aventureiros. Sem restrições de classe e com progressão irrestrita até o 14º nível.",
    minRequirements: {},
    statModifiers: {},
    nativeLanguages: ["Comum", "Alinhamento"],
    traits: [
      "Versatilidade Ilimitada: Pode escolher qualquer classe de aventureiro.",
      "Avanço Completo: Progride até o nível máximo (14º nível) em todas as classes.",
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
    description: "Semi-humanos robustos e barbudos, de constituição férrea, mestres da pedra e armas pesadas.",
    minRequirements: { con: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum", "Alinhamento", "Anão", "Gnomo", "Goblin", "Kobold"],
    traits: [
      "Detectar Armadilhas de Pedra e Construções: Chance de 2 em 6 de detectar fossos, blocos móveis e alvenaria recente.",
      "Infravisão: Enxerga no escuro absoluto até 18 metros.",
      "Resistência Robusta: Ganha bônus substancial em testes de resistência contra Veneno, Varinhas, Paralisia e Magias.",
      "Armas Grandes: Devido à baixa estatura, não pode empunhar espadas de duas mãos ou arcos longos.",
    ],
    maxClassLevels: {
      assassino: 4,
      clerigo: 8,
      guerreiro: 10,
      ladrao: 4,
    },
  },
  elfo: {
    id: "elfo",
    name: "Elfo",
    nameEn: "Elf",
    description: "Semi-humanos esbeltos e feéricos de vida quase imortal, graciosos em combate e mestres arcanos.",
    minRequirements: { int: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum", "Alinhamento", "Élfico", "Gnoll", "Hobgoblin", "Orc"],
    traits: [
      "Detectar Portas Secretas: Chance de 2 em 6 de detectar portas secretas procurando ativamente, ou 1 em 6 passando perto.",
      "Infravisão: Enxerga no escuro absoluto até 18 metros.",
      "Imunidade a Carniçal: Totalmente imune à paralisia sobrenatural causada por carniçais.",
      "Sentidos Feéricos: Ouve ruídos com facilidade redobrada (2 em 6).",
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
    description: "Pequenos e rotundos com pés peludos, famosos pela pontaria fantástica, furtividade e sorte lendária.",
    minRequirements: { dex: 9, con: 9 },
    statModifiers: { str: -1, dex: 1 },
    nativeLanguages: ["Comum", "Alinhamento", "Halfling"],
    traits: [
      "Pontaria com Mísseis: +1 em todas as jogadas de ataque à distância.",
      "Defesa contra Gigantes: Ganha +2 de CA (ou -2 DAC) quando atacado por criaturas maiores que humanos.",
      "Furtividade Excepcional: 90% de chance de se esconder em áreas selvagens e 2 em 6 em masmorras.",
      "Resistência Heróica: Bônus de +4 em jogadas de proteção contra Morte, Varinhas, Paralisia e Magias.",
      "Restrição de Tamanho: Não pode usar armas de duas mãos ou arcos longos.",
    ],
    maxClassLevels: {
      druida: 6,
      guerreiro: 6,
      ranger: 6,
      ladrao: 8,
    },
  },
  drow: {
    id: "drow",
    name: "Drow",
    nameEn: "Drow",
    description: "Elfos negros subterrâneos de cabelos prateados e olhos afiados, hábeis na teia de sombras e venenos.",
    minRequirements: { int: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum Profundo", "Élfico", "Gnoll", "Goblin"],
    traits: [
      "Infravisão Superior: Enxerga até 27 metros no escuro.",
      "Detectar Portas Secretas: 2 em 6 ao procurar, 1 em 6 passando perto.",
      "Magia Inata Drow: Capaz de conjurar Luz das Fadas e Escuridão 1x por dia.",
      "Sensibilidade à Luz: Sob luz do dia ou tochas muito brilhantes, sofre -1 de penalidade em ataques.",
    ],
    maxClassLevels: {
      acrobata: 10,
      assassino: 10,
      clerigo: 11,
      cavaleiro: 9,
      mago: 9,
      ranger: 9,
      ladrao: 10,
    },
  },
  duergar: {
    id: "duergar",
    name: "Duergar",
    nameEn: "Duergar",
    description: "Anões cinzentos das profundezas, mestres em emboscadas subterrâneas, poderes mentais e furtividade mineral.",
    minRequirements: { con: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum Profundo", "Anão", "Gnomo", "Goblin", "Kobold"],
    traits: [
      "Infravisão das Profundezas: Enxerga até 27 metros no escuro.",
      "Furtividade Subterrânea: Chance de 4 em 6 de se mover em silêncio e emboscar no subterrâneo.",
      "Poder Mental de Crescimento: 1x por dia pode aumentar de tamanho, dobrando o dano de armas corpo a corpo.",
      "Sensibilidade à Luz: Sob luz direta do sol sofre -1 em ataques e testes.",
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
    description: "Curiosos e inventivos semi-humanos de nariz comprido, primos dos anões e dotados de afinidade com ilusões.",
    minRequirements: { con: 9, int: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum", "Alinhamento", "Gnomo", "Anão", "Kobold"],
    traits: [
      "Infravisão: Enxerga até 27 metros no escuro.",
      "Afinidade com Ilusões: Vantagem e bônus de proteção contra magias de ilusão.",
      "Detectar Truques de Construção: Chance de 2 em 6 de perceber desníveis e mecanismos de pedra.",
      "Resistência Mágica Anã: Bônus de +4 em salvamentos de varinhas e magias.",
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
    description: "União da beleza feérica élfica com a determinação humana. Carismáticos e com ampla variedade de carreiras.",
    minRequirements: { con: 9, cha: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum", "Alinhamento", "Élfico"],
    traits: [
      "Infravisão: Enxerga até 18 metros na escuridão.",
      "Detectar Portas Secretas: 2 em 6 ao inspecionar ativamente.",
      "Versatilidade de Carreira: Acesso a classes nobres como Cavaleiro, Paladino e Bardo.",
    ],
    maxClassLevels: {
      acrobata: 12,
      bardo: 12,
      clerigo: 12,
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
    description: "Herdeiros da fúria e musculatura orc, formidáveis guerreiros e assassinos temidos.",
    minRequirements: {},
    statModifiers: { str: 1, con: 1, cha: -2 },
    nativeLanguages: ["Comum", "Alinhamento", "Orc"],
    traits: [
      "Infravisão: Enxerga até 18 metros no escuro.",
      "Constituição Vigorosa: Bônus nato de +1 em Força e Constituição.",
      "Presença Intimidadora: Penalidade de -2 em Carisma com povos da superfície.",
    ],
    maxClassLevels: {
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
    description: "Gnomos das profundezas, atarracados e de pele cinzenta, peritos em camuflagem e engenhos subterrâneos.",
    minRequirements: { con: 9 },
    statModifiers: {},
    nativeLanguages: ["Comum Profundo", "Gnomo", "Anão", "Kobold"],
    traits: [
      "Camuflagem Rochosa: 2 em 6 de se camuflar em pedras mesmo sob observação direta.",
      "Infravisão Profunda: Enxerga até 27 metros no escuro.",
      "Resistência de Pedra: Bônus de +4 em todos os testes de proteção contra veneno e magia.",
      "Ilusões Naturais: Conhece truques arcanos de distorção de imagem.",
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
