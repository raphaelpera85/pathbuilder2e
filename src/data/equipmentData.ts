export interface ItemDefinition {
  id: string;
  name: string;
  names?: { "pt-BR": string; en: string; es: string };
  mainCategory: "gear" | "consumables" | "magic_items";
  subCategory: string;
  level: number;
  price: { gp?: number; sp?: number; cp?: number; pp?: number };
  bulk: string; // "1", "2", "L", "-"
  traits: string[];
  hands?: string;
  description: string;
  summaries?: { "pt-BR": string; en: string; es: string };
  source?: { book: string; page?: number };
  ruleset?: "remaster" | "legacy" | "needs_review";
  rarity?: "common" | "uncommon" | "rare" | "unique";
}

export const PF2E_ITEMS_CATALOG: ItemDefinition[] = [
  // ==========================================
  // 1. GEAR (EQUIPAMENTOS DE AVENTURA & FERRAMENTAS)
  // ==========================================
  {
    id: "item.gear.adventurers_pack",
    name: "Mochila de Aventureiro (Adventurer's Pack)",
    names: { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" },
    mainCategory: "gear",
    subCategory: "adventuring",
    level: 0,
    price: { sp: 15 },
    bulk: "1",
    traits: [],
    description: "Contém: 1 mochila, 1 saco de dormir, 10 pedaços de giz, 1 pederneira e aço, 50 pés de corda de cânhamo, 2 semanas de rações, 1 sabão, 5 tochas e 1 cantil.",
    summaries: {
      "pt-BR": "Kit essencial com mochila, saco de dormir, corda, tochas e rações.",
      en: "Essential kit containing backpack, bedroll, rope, torches, and rations.",
      es: "Kit esencial con mochila, saco de dormir, cuerda, antorchas y raciones."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 287 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.backpack",
    name: "Mochila (Backpack)",
    names: { "pt-BR": "Mochila", en: "Backpack", es: "Mochila" },
    mainCategory: "gear",
    subCategory: "adventuring",
    level: 0,
    price: { sp: 1 },
    bulk: "-",
    traits: [],
    description: "Uma mochila resistente que comporta até 4 volumes de carga. Os primeiros 2 volumes guardados nela não contam para o limite de carga do personagem.",
    summaries: {
      "pt-BR": "Armazena até 4 Bulk; os primeiros 2 Bulk guardados não pesam.",
      en: "Holds up to 4 Bulk; first 2 Bulk stored do not count against your limit.",
      es: "Guarda hasta 4 de Carga; los 2 primeros no cuentan para tu límite."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 287 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.rope",
    name: "Corda de Cânhamo - 15m (Rope)",
    names: { "pt-BR": "Corda (15 metros)", en: "Rope (50 feet)", es: "Cuerda (15 metros)" },
    mainCategory: "gear",
    subCategory: "adventuring",
    level: 0,
    price: { sp: 5 },
    bulk: "1",
    traits: [],
    description: "Uma corda resistente de 15 metros (50 pés) capaz de suportar até 4 aventureiros simultâneos.",
    summaries: {
      "pt-BR": "Corda de escalada de 15 metros.",
      en: "50-foot durable climbing hemp rope.",
      es: "Cuerda resistente para escalada de 15 metros."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 288 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.torch",
    name: "Tocha (Torch)",
    names: { "pt-BR": "Tocha", en: "Torch", es: "Antorcha" },
    mainCategory: "gear",
    subCategory: "adventuring",
    level: 0,
    price: { cp: 1 },
    bulk: "L",
    traits: [],
    hands: "1",
    description: "Ilumina com luz plena em um raio de 20 pés e luz fraca por mais 20 pés por 1 hora. Pode ser usada como arma improvisada de 1d4 de dano de fogo.",
    summaries: {
      "pt-BR": "Emite luz brilhante em 20 pés por 1 hora.",
      en: "Emits bright light in 20-foot radius for 1 hour.",
      es: "Emite luz brillante en radio de 20 pies durante 1 hora."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 288 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.healers_toolkit",
    name: "Kit de Primeiros Socorros (Healer's Toolkit)",
    names: { "pt-BR": "Kit de Primeiros Socorros", en: "Healer's Toolkit", es: "Herramientas de sanador" },
    mainCategory: "gear",
    subCategory: "toolkits",
    level: 0,
    price: { gp: 5 },
    bulk: "1",
    traits: [],
    description: "Contém ataduras, bálsamos, agulhas e antissépticos necessários para testes de Medicina (Tratar Ferimentos, Estabilizar e Tratar Doença/Veneno).",
    summaries: {
      "pt-BR": "Necessário para aplicar a perícia Medicina e Tratar Ferimentos.",
      en: "Required for Medicine checks including Treat Wounds and Battle Medicine.",
      es: "Necesario para aplicar la habilidad de Medicina y Tratar heridas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 289 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.thieves_toolkit",
    name: "Ferramentas de Ladrão (Thieves' Toolkit)",
    names: { "pt-BR": "Ferramentas de Ladrão", en: "Thieves' Toolkit", es: "Herramientas de ladrón" },
    mainCategory: "gear",
    subCategory: "toolkits",
    level: 0,
    price: { gp: 3 },
    bulk: "L",
    traits: [],
    description: "Gazúas, arames e tesouras de precisão necessárias para arrombar fechaduras e desarmar armadilhas com Ladinagem.",
    summaries: {
      "pt-BR": "Necessário para arrombar fechaduras e desativar armadilhas.",
      en: "Required for Pick a Lock and Disable a Device with Thievery.",
      es: "Necesario para forzar cerraduras e inutilizar dispositivos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 289 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.alchemists_toolkit",
    name: "Kit de Alquimista (Alchemist's Toolkit)",
    names: { "pt-BR": "Kit de Alquimista", en: "Alchemist's Toolkit", es: "Herramientas de alquimista" },
    mainCategory: "gear",
    subCategory: "toolkits",
    level: 0,
    price: { gp: 3 },
    bulk: "1",
    traits: [],
    description: "Tubos de ensaio, almofariz, queimadores e retortas necessárias para criar itens alquímicos e preparar infusões diárias.",
    summaries: {
      "pt-BR": "Necessário para Manufatura Alquímica e itens infundidos.",
      en: "Required for Alchemical Crafting and daily infused preparations.",
      es: "Necesario para Artesanía Alquímica y preparaciones infundidas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 289 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.arrows",
    name: "Aljava com 20 Flechas (Arrows)",
    names: { "pt-BR": "Flechas (20)", en: "Arrows (20)", es: "Flechas (20)" },
    mainCategory: "gear",
    subCategory: "ammunition",
    level: 0,
    price: { sp: 1 },
    bulk: "L",
    traits: [],
    description: "Aljava de madeira e couro com 20 flechas para arcos curtos e arcos longos.",
    summaries: {
      "pt-BR": "Munição padrão para arcos (20 unidades).",
      en: "Standard ammunition for shortbows and longbows (20 count).",
      es: "Munición estándar para arcos (20 unidades)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 289 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.gear.bolts",
    name: "Aljava com 20 Virotes (Crossbow Bolts)",
    names: { "pt-BR": "Virotes de Besta (20)", en: "Crossbow Bolts (20)", es: "Virotes de ballesta (20)" },
    mainCategory: "gear",
    subCategory: "ammunition",
    level: 0,
    price: { sp: 1 },
    bulk: "L",
    traits: [],
    description: "Estojo com 20 virotes de aço para bestas simples e pesadas.",
    summaries: {
      "pt-BR": "Munição padrão para bestas (20 unidades).",
      en: "Standard ammunition for crossbows (20 count).",
      es: "Munición estándar para ballestas (20 unidades)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 289 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 2. CONSUMABLES (POÇÕES, ELIXIRES, PERGAMINHOS)
  // ==========================================
  {
    id: "item.consumable.minor_healing_potion",
    name: "Poção de Cura Menor (Minor Healing Potion)",
    names: { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" },
    mainCategory: "consumables",
    subCategory: "potions",
    level: 1,
    price: { gp: 4 },
    bulk: "L",
    traits: ["Consumível", "Cura", "Mágico", "Necromancia", "Poção"],
    description: "Ao beber ou administrar este frasco de elixir rubro, a criatura recupera imediatamente 1d8 Pontos de Vida.",
    summaries: {
      "pt-BR": "Restaura 1d8 Pontos de Vida imediatamente ao ser consumida.",
      en: "Restores 1d8 Hit Points immediately when drunk.",
      es: "Restaura 1d8 Puntos de Golpe inmediatamente al beberla."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 295 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.lesser_healing_potion",
    name: "Poção de Cura Inferior (Lesser Healing Potion)",
    names: { "pt-BR": "Poção de Cura Inferior", en: "Lesser Healing Potion", es: "Poción de curación inferior" },
    mainCategory: "consumables",
    subCategory: "potions",
    level: 3,
    price: { gp: 12 },
    bulk: "L",
    traits: ["Consumível", "Cura", "Mágico", "Necromancia", "Poção"],
    description: "Ao beber esta poção, o usuário recupera imediatamente 2d8+5 Pontos de Vida.",
    summaries: {
      "pt-BR": "Restaura 2d8+5 Pontos de Vida imediatamente.",
      en: "Restores 2d8+5 Hit Points immediately when drunk.",
      es: "Restaura 2d8+5 Puntos de Golpe inmediatamente al beberla."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 295 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.moderate_healing_potion",
    name: "Poção de Cura Moderada (Moderate Healing Potion)",
    names: { "pt-BR": "Poção de Cura Moderada", en: "Moderate Healing Potion", es: "Poción de curación moderada" },
    mainCategory: "consumables",
    subCategory: "potions",
    level: 6,
    price: { gp: 50 },
    bulk: "L",
    traits: ["Consumível", "Cura", "Mágico", "Necromancia", "Poção"],
    description: "Ao beber esta poção, o usuário recupera imediatamente 3d8+10 Pontos de Vida.",
    summaries: {
      "pt-BR": "Restaura 3d8+10 Pontos de Vida imediatamente.",
      en: "Restores 3d8+10 Hit Points immediately when drunk.",
      es: "Restaura 3d8+10 Puntos de Golpe inmediatamente al beberla."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 295 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.minor_elixir_of_life",
    name: "Elixir da Vida Menor (Minor Elixir of Life)",
    names: { "pt-BR": "Elixir da Vida Menor", en: "Minor Elixir of Life", es: "Elixir de vida menor" },
    mainCategory: "consumables",
    subCategory: "elixirs",
    level: 1,
    price: { gp: 3 },
    bulk: "L",
    traits: ["Alquímico", "Consumível", "Cura", "Elixir"],
    description: "Restaura 1d6 Pontos de Vida e concede um bônus de item de +1 em testes de salvamento contra venenos e doenças por 10 minutos.",
    summaries: {
      "pt-BR": "Restaura 1d6 PV e concede +1 em salvamentos contra venenos e doenças.",
      en: "Restores 1d6 HP and grants +1 item bonus vs poisons and diseases.",
      es: "Restaura 1d6 PG y otorga +1 contra venenos y enfermedades."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 296 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.alchemists_fire_lesser",
    name: "Fogo Alquímico Menor (Lesser Alchemist's Fire)",
    names: { "pt-BR": "Fogo Alquímico Menor", en: "Lesser Alchemist's Fire", es: "Fuego de alquimista menor" },
    mainCategory: "consumables",
    subCategory: "bombs",
    level: 1,
    price: { gp: 3 },
    bulk: "L",
    traits: ["Alquímico", "Bomba", "Consumível", "Fogo", "Impacto"],
    description: "Causa 1d8 de dano de fogo, 1 de dano de fogo persistente e 1 de dano de fogo por dispersão (splash).",
    summaries: {
      "pt-BR": "Bomba de arremesso: 1d8 fogo + 1 fogo persistente + 1 dispersão.",
      en: "Thrown bomb: 1d8 fire + 1 persistent fire + 1 splash fire.",
      es: "Bomba arrojadiza: 1d8 fuego + 1 fuego persistente + 1 dispersión."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 297 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.scroll_rank_1",
    name: "Pergaminho de Magia (1º Ranque)",
    names: { "pt-BR": "Pergaminho de 1º Ranque", en: "Scroll (1st Rank)", es: "Pergamino (1er Rango)" },
    mainCategory: "consumables",
    subCategory: "scrolls",
    level: 1,
    price: { gp: 4 },
    bulk: "L",
    traits: ["Consumível", "Mágico", "Pergaminho"],
    description: "Um pergaminho contendo uma magia inscrita de 1º ranque que pode ser ativada por um conjurador da tradição correspondente.",
    summaries: {
      "pt-BR": "Permite conjurar uma magia de 1º ranque sem gastar espaço diário.",
      en: "Allows casting a 1st-rank spell without expending a spell slot.",
      es: "Permite lanzar un conjuro de 1er rango sin gastar espacio de conjuro."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 298 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.consumable.scroll_rank_2",
    name: "Pergaminho de Magia (2º Ranque)",
    names: { "pt-BR": "Pergaminho de 2º Ranque", en: "Scroll (2nd Rank)", es: "Pergamino (2º Rango)" },
    mainCategory: "consumables",
    subCategory: "scrolls",
    level: 3,
    price: { gp: 12 },
    bulk: "L",
    traits: ["Consumível", "Mágico", "Pergaminho"],
    description: "Um pergaminho contendo uma magia inscrita de 2º ranque que pode ser ativada por um conjurador.",
    summaries: {
      "pt-BR": "Permite conjurar uma magia de 2º ranque.",
      en: "Allows casting a 2nd-rank spell.",
      es: "Permite lanzar un conjuro de 2º rango."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 298 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 3. MAGIC ITEMS (VESTÍVEIS, VARINHAS, RUNAS)
  // ==========================================
  {
    id: "item.magic.boots_of_elvenkind",
    name: "Botas Élficas (Boots of Elvenkind)",
    names: { "pt-BR": "Botas Élficas", en: "Boots of Elvenkind", es: "Botas de los elfos" },
    mainCategory: "magic_items",
    subCategory: "worn",
    level: 7,
    price: { gp: 250 },
    bulk: "L",
    traits: ["Investido", "Mágico", "Vestível"],
    description: "Estas botas elegantes amortecem seus passos. Concedem um bônus de item de +1 em testes de Acrobacia e ativam Passo Élfico 1x por dia.",
    summaries: {
      "pt-BR": "+1 em Acrobacia e concede a ação Passo Élfico para ignorar terreno difícil.",
      en: "+1 item bonus to Acrobatics and 1/day Elven Step action.",
      es: "+1 a Acrobacias y 1/día Paso Élfico para ignorar terreno difícil."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 300 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.cloak_of_elvenkind",
    name: "Capa Élfica (Cloak of Elvenkind)",
    names: { "pt-BR": "Capa Élfica", en: "Cloak of Elvenkind", es: "Capa de los elfos" },
    mainCategory: "magic_items",
    subCategory: "worn",
    level: 7,
    price: { gp: 250 },
    bulk: "L",
    traits: ["Ilusão", "Investido", "Mágico", "Vestível"],
    description: "Muda de cor para se camuflar com o ambiente. Concede bônus de item de +1 em testes de Furtividade e ação para ficar Invisível 1x ao dia.",
    summaries: {
      "pt-BR": "+1 em Furtividade e concede invisibilidade temporária 1x por dia.",
      en: "+1 item bonus to Stealth and 1/day Invisibility activation.",
      es: "+1 a Sigilo y activación de Invisibilidad 1/día."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 301 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.bracers_of_armor_1",
    name: "Braçadeiras de Armadura I (Bracers of Armor I)",
    names: { "pt-BR": "Braçadeiras de Armadura I", en: "Bracers of Armor I", es: "Brazales de armadura I" },
    mainCategory: "magic_items",
    subCategory: "worn",
    level: 8,
    price: { gp: 450 },
    bulk: "L",
    traits: ["Investido", "Mágico", "Vestível"],
    description: "Cria um campo de proteção de força que concede bônus de item de +1 na CA e +1 nas salvagens, sem limite de Destreza.",
    summaries: {
      "pt-BR": "+1 de bônus de item na CA para personagens sem armadura.",
      en: "+1 item bonus to AC and saving throws without Dex cap.",
      es: "+1 a la CA y salvaciones para personajes sin armadura."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 301 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.wand_rank_1",
    name: "Varinha Mágica (1º Ranque)",
    names: { "pt-BR": "Varinha de 1º Ranque", en: "Wand (1st Rank)", es: "Varita (1er Rango)" },
    mainCategory: "magic_items",
    subCategory: "wands",
    level: 3,
    price: { gp: 60 },
    bulk: "L",
    traits: ["Mágico", "Varinha"],
    description: "Uma varinha esculpida que permite conjurar uma magia vinculada de 1º ranque uma vez por dia (e arriscar sobrecarga para um 2º uso).",
    summaries: {
      "pt-BR": "Conjura uma magia de 1º ranque 1 vez ao dia de forma recarregável.",
      en: "Casts a 1st-rank spell 1/day reliably.",
      es: "Lanza un conjuro de 1er rango 1 vez al día recargable."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 305 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.weapon_potency_1",
    name: "Runa de Potência de Arma +1 (Weapon Potency +1)",
    names: { "pt-BR": "Runa de Potência de Arma +1", en: "+1 Weapon Potency", es: "Potencia de arma +1" },
    mainCategory: "magic_items",
    subCategory: "runes",
    level: 2,
    price: { gp: 35 },
    bulk: "-",
    traits: ["Mágico", "Runa"],
    description: "Inscrita em uma arma, concede bônus de item de +1 nas rolagens de ataque e permite gravar 1 runa de propriedade.",
    summaries: {
      "pt-BR": "+1 de bônus de item no ataque com a arma vinculada.",
      en: "+1 item bonus to attack rolls with the etched weapon.",
      es: "+1 a las tiradas de ataque con el arma grabada."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 308 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.striking_rune",
    name: "Runa de Impacto (Striking Rune)",
    names: { "pt-BR": "Runa de Impacto", en: "Striking Rune", es: "Runa de impacto" },
    mainCategory: "magic_items",
    subCategory: "runes",
    level: 4,
    price: { gp: 65 },
    bulk: "-",
    traits: ["Mágico", "Runa"],
    description: "Inscrita em uma arma, aumenta os dados de dano da arma de um dado para dois dados (ex: 1d8 torna-se 2d8).",
    summaries: {
      "pt-BR": "Dobra os dados de dano de arma (ex: 1d8 passa para 2d8).",
      en: "Increases weapon damage dice from 1 to 2 (e.g. 1d8 becomes 2d8).",
      es: "Duplica los dados de daño del arma (ej: 1d8 pasa a 2d8)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 308 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.armor_potency_1",
    name: "Runa de Potência de Armadura +1 (Armor Potency +1)",
    names: { "pt-BR": "Runa de Potência de Armadura +1", en: "+1 Armor Potency", es: "Potencia de armadura +1" },
    mainCategory: "magic_items",
    subCategory: "runes",
    level: 5,
    price: { gp: 160 },
    bulk: "-",
    traits: ["Mágico", "Runa"],
    description: "Inscrita em uma armadura, concede um bônus de item de +1 na Classe de Armadura.",
    summaries: {
      "pt-BR": "+1 de bônus de item na CA da armadura.",
      en: "+1 item bonus to AC for the etched armor.",
      es: "+1 a la CA de la armadura grabada."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 308 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "item.magic.resilient_rune",
    name: "Runa Resiliente (Resilient Rune)",
    names: { "pt-BR": "Runa Resiliente", en: "Resilient Rune", es: "Runa resiliente" },
    mainCategory: "magic_items",
    subCategory: "runes",
    level: 8,
    price: { gp: 340 },
    bulk: "-",
    traits: ["Mágico", "Runa"],
    description: "Inscrita em uma armadura com runa de potência, concede um bônus de item de +1 em todas as salvaguardas (Fortitude, Reflexos e Vontade).",
    summaries: {
      "pt-BR": "+1 em todas as salvaguardas (Fortitude, Reflexos e Vontade).",
      en: "+1 item bonus to Fortitude, Reflex, and Will saving throws.",
      es: "+1 a todas las salvaciones (Fortaleza, Reflejos y Voluntad)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 309 },
    ruleset: "remaster",
    rarity: "common"
  }
];
