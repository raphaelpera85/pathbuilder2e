// ============================================================================
// Pathfinder 1e (Legacy/RPG) - Catálogo de Raças (núcleo)
// Fonte: Pathfinder RPG - Livro Básico (pathfinder - rpg - livro - basico.pdf),
// capítulo "Personagens", seção de raças, págs. impressas 21-27.
//
// Texto extraído diretamente do PDF (pypdf) em 2026-09-27, não de memória.
// As sete raças abaixo são as únicas descritas no capítulo de raças do Livro
// Básico: Anão, Elfo, Gnomo, Halfling, Humano, Meio-Elfo e Meio-Orc.
// ============================================================================

export type Pf1eAbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface Pf1eRace {
  id: string;
  name: string;
  nameEn: string;
  sourceBook: string;
  sourcePage: number;
  size: "Pequeno" | "Médio";
  baseSpeed: number; // metros
  statModifiers: Partial<Record<Pf1eAbilityName, number>>;
  /** Verdadeiro quando a raça escolhe livremente +2 em um atributo (Humano, Meio-Elfo, Meio-Orc). */
  freeStatBonus?: boolean;
  languages: string[];
  bonusLanguages: string[];
  traits: string[];
  description: string;
}

export const PF1E_RACES: Record<string, Pf1eRace> = {
  anao: {
    id: "anao",
    name: "Anão",
    nameEn: "Dwarf",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 21,
    size: "Médio",
    baseSpeed: 6,
    statModifiers: { con: 2, wis: 2, cha: -2 },
    languages: ["Comum", "Anão"],
    bonusLanguages: ["Gigante", "Gnomo", "Goblin", "Orc", "Terran", "Subterrâneo"],
    traits: [
      "Devagar e Sempre: deslocamento básico de 6 metros, nunca modificado por armadura ou carga.",
      "Visão no Escuro: enxerga até 18 metros no escuro.",
      "Treinamento Defensivo: bônus de esquiva de +4 na CA contra monstros do subtipo gigante.",
      "Ganância: bônus racial de +2 em Avaliação para determinar o valor de itens não-mágicos com metais ou pedras preciosas.",
      "Ódio: bônus de +1 nas jogadas de ataque contra humanoides dos subtipos orc e goblinoide.",
      "Robusto: bônus racial de +2 nos testes de resistência contra venenos, magias e habilidades similares à magia.",
      "Estabilidade: bônus racial de +4 na Defesa contra Manobras de Combate ao resistir a encontrão ou derrubar em solo firme.",
      "Ligação com Pedras: bônus racial de +2 em Percepção para identificar trabalhos incomuns de alvenaria a até 3 metros.",
      "Familiaridade com Armas: proficiente com machado de batalha, picareta pesada e martelo de guerra; qualquer arma \"anã\" é tratada como marcial.",
    ],
    description: "Raça baixa e robusta, estoica e austera, ferozmente determinada a repelir invasões de orcs e goblins.",
  },
  elfo: {
    id: "elfo",
    name: "Elfo",
    nameEn: "Elf",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 22,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: { dex: 2, int: 2, con: -2 },
    languages: ["Comum", "Élfico"],
    bonusLanguages: ["Celestial", "Dracônico", "Gnoll", "Gnomo", "Orc", "Silvestre"],
    traits: [
      "Visão na Penumbra: enxerga duas vezes mais longe que humanos em condições de penumbra.",
      "Imunidade Élfica: imune a efeitos mágicos de sono; bônus racial de +2 nos testes de resistência contra magias e efeitos de encantamento.",
      "Magia Élfica: bônus racial de +2 nos testes de nível de conjurador para superar resistência à magia e nos testes de Artes Mágicas para identificar itens mágicos.",
      "Sentidos Aguçados: bônus racial de +2 em Percepção.",
      "Familiaridade com Armas: proficiente com arcos longos e curtos (simples ou compostos) e espadas longas e cimitarras; qualquer arma \"élfica\" é tratada como marcial.",
    ],
    description: "Prole longeva do mundo natural, graciosa e frágil, com afinidade natural para a magia.",
  },
  gnomo: {
    id: "gnomo",
    name: "Gnomo",
    nameEn: "Gnome",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 23,
    size: "Pequeno",
    baseSpeed: 6,
    statModifiers: { con: 2, cha: 2, str: -2 },
    languages: ["Comum", "Gnomo", "Silvestre"],
    bonusLanguages: ["Anão", "Dracônico", "Élfico", "Gigante", "Goblin", "Orc"],
    traits: [
      "Tamanho Pequeno: +1 na CA, +1 nas jogadas de ataque, -1 em BMC/DMC, +4 em Furtividade.",
      "Deslocamento Lento: deslocamento básico de 6 metros.",
      "Visão na Penumbra: enxerga duas vezes mais longe que humanos em condições de penumbra.",
      "Treinamento Defensivo: bônus de esquiva de +4 na CA contra monstros do subtipo gigante.",
      "Magia Gnômica: +1 na CD de testes de resistência contra ilusões conjuradas pelo gnomo; com Carisma 11+, ganha falar com os animais, globos de luz, prestidigitação e som fantasma como habilidades similares à magia, 1/dia cada, com CD 10 + nível da magia + modificador de Carisma.",
      "Ódio: bônus de +1 nas jogadas de ataque contra humanoides dos subtipos réptil e goblinoide.",
      "Resistência a Ilusões: bônus racial de +2 nos testes de resistência contra magias e efeitos de ilusão.",
      "Sentidos Aguçados: bônus racial de +2 em Percepção.",
      "Obsessão: bônus racial de +2 em uma perícia de Ofício ou Profissão de sua escolha.",
      "Familiaridade com Armas: qualquer arma \"gnômica\" é tratada como marcial.",
    ],
    description: "Linhagem feérica que se adaptou à cultura dos mortais, mas nunca abandonou totalmente suas raízes fantásticas; imprevisíveis e curiosos.",
  },
  halfling: {
    id: "halfling",
    name: "Halfling",
    nameEn: "Halfling",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 24,
    size: "Pequeno",
    baseSpeed: 6,
    statModifiers: { dex: 2, cha: 2, str: -2 },
    languages: ["Comum", "Halfling"],
    bonusLanguages: ["Anão", "Élfico", "Gnomo", "Goblin"],
    traits: [
      "Tamanho Pequeno: +1 na CA, +1 nas jogadas de ataque, -1 em BMC/DMC, +4 em Furtividade.",
      "Deslocamento Lento: deslocamento básico de 6 metros.",
      "Destemido: bônus racial de +2 nos testes de resistência contra medo, cumulativo com a Sorte dos Halflings.",
      "Sorte dos Halflings: bônus racial de +1 em todos os testes de resistência.",
      "Sentidos Aguçados: bônus racial de +2 em Percepção.",
      "Passo Firme: bônus racial de +2 em Acrobacia e Escalar.",
      "Familiaridade com Armas: qualquer arma \"halfling\" é tratada como marcial.",
    ],
    description: "Otimistas e alegres, compensam a pequena estatura com fanfarronice e curiosidade; oportunistas inveterados.",
  },
  humano: {
    id: "humano",
    name: "Humano",
    nameEn: "Human",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 25,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: {},
    freeStatBonus: true,
    languages: ["Comum"],
    bonusLanguages: ["qualquer idioma, exceto idiomas secretos como o druídico"],
    traits: [
      "Bônus de Atributo: +2 em um valor de atributo à escolha do jogador.",
      "Talento Adicional: humanos escolhem um talento adicional no 1º nível.",
      "Habilidoso: humanos recebem uma graduação em perícia adicional no 1º nível e outra a cada nível seguinte.",
    ],
    description: "Raça dominante do mundo, com motivação excepcional e grande capacidade de evolução; extremamente diversa em cultura e caráter.",
  },
  meio_elfo: {
    id: "meio_elfo",
    name: "Meio-Elfo",
    nameEn: "Half-Elf",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 26,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: {},
    freeStatBonus: true,
    languages: ["Comum", "Élfico"],
    bonusLanguages: ["qualquer idioma, exceto idiomas secretos como o druídico"],
    traits: [
      "Bônus de Atributo: +2 em um valor de atributo à escolha do jogador.",
      "Visão na Penumbra: enxerga duas vezes mais longe que humanos em condições de penumbra.",
      "Adaptabilidade: recebe Foco em Perícia como talento adicional no 1º nível.",
      "Sangue Élfico: considerado elfo e humano para efeitos relacionados à raça.",
      "Imunidade Élfica: imune a efeitos mágicos de sono; bônus racial de +2 nos testes de resistência contra magias e efeitos de encantamento.",
      "Sentidos Aguçados: bônus racial de +2 em Percepção.",
      "Talentos Múltiplos: escolhe duas classes prediletas no 1º nível, ganhando +1 PV ou +1 ponto de perícia ao subir de nível em qualquer uma delas.",
    ],
    description: "Descendem de duas culturas sem herdar plenamente nenhuma; versáteis e adaptáveis por falta de uma nação própria.",
  },
  meio_orc: {
    id: "meio_orc",
    name: "Meio-Orc",
    nameEn: "Half-Orc",
    sourceBook: "Pathfinder RPG — Livro Básico",
    sourcePage: 27,
    size: "Médio",
    baseSpeed: 9,
    statModifiers: {},
    freeStatBonus: true,
    languages: ["Comum", "Orc"],
    bonusLanguages: ["Abissal", "Dracônico", "Gigante", "Gnoll", "Goblin"],
    traits: [
      "Bônus de Atributo: +2 em um valor de atributo à escolha do jogador.",
      "Visão no Escuro: enxerga até 18 metros no escuro.",
      "Intimidador: bônus racial de +2 nos testes de Intimidação.",
      "Sangue Orc: considerado orc e humano para efeitos relacionados à raça.",
      "Ferocidade Orc: 1/dia, ao ser levado a menos de 0 PV sem morrer, luta mais uma rodada como se estivesse incapacitado antes de cair inconsciente e começar a morrer.",
      "Familiaridade com Armas: qualquer arma \"orc\" é tratada como marcial.",
    ],
    description: "Nascidos de perversidade e violência aos olhos das outras raças, amadurecem rápido e se tornam fortes por necessidade de sobrevivência.",
  },
};

export const PF1E_RACE_IDS = Object.keys(PF1E_RACES);
