import { T20CompendiumEntry } from "./t20Compendium";

export const T20_AMEACAS_EQUIPMENT: T20CompendiumEntry[] = [
  // ─── Armas Simples ─────────────────────────────────────────────────────────
  {
    id: "t20.ameacas.arma.porrete",
    name: "Porrete",
    sourcePage: 394,
    category: "arma",
    summary: "1d6 impacto · crítico x2 · leve",
    attackAbility: "str",
    damage: "1d6 impacto",
    critical: "x2",
    weight: 1,
    cost: "T$ 2",
    weaponProperties: ["leve", "simples"]
  },
  {
    id: "t20.ameacas.arma.zarabatana",
    name: "Zarabatana",
    sourcePage: 394,
    category: "arma",
    summary: "1d3 perfuração · alcance curto · crítico x2",
    attackAbility: "dex",
    damage: "1d3 perfuração",
    critical: "x2",
    range: "curto",
    weight: 1,
    cost: "T$ 5",
    weaponProperties: ["disparo", "simples"]
  },

  // ─── Armas Marciais ────────────────────────────────────────────────────────
  {
    id: "t20.ameacas.arma.neko_te",
    name: "Neko-te",
    sourcePage: 394,
    category: "arma",
    summary: "1d4 corte · crítico 19 · leve",
    attackAbility: "dex",
    damage: "1d4 corte",
    critical: "19",
    weight: 1,
    cost: "T$ 10",
    weaponProperties: ["leve", "marcial", "agil"]
  },
  {
    id: "t20.ameacas.arma.gladio",
    name: "Gládio",
    sourcePage: 394,
    category: "arma",
    summary: "1d6 perfuração · crítico 19/x3 · uma mão",
    attackAbility: "str",
    damage: "1d6 perfuração",
    critical: "19/x3",
    weight: 1,
    cost: "T$ 12",
    weaponProperties: ["uma_mao", "marcial"]
  },
  {
    id: "t20.ameacas.arma.tetsubo",
    name: "Tetsubo",
    sourcePage: 394,
    category: "arma",
    summary: "1d10 impacto · crítico x2 · duas mãos",
    attackAbility: "str",
    damage: "1d10 impacto",
    critical: "x2",
    weight: 2,
    cost: "T$ 20",
    weaponProperties: ["duas_maos", "marcial"]
  },

  // ─── Armas de Fogo ─────────────────────────────────────────────────────────
  {
    id: "t20.ameacas.arma.traque",
    name: "Traque",
    sourcePage: 394,
    category: "arma",
    summary: "2d6 perfuração · crítico 19/x3 · alcance curto · leve",
    attackAbility: "dex",
    damage: "2d6 perfuração",
    critical: "19/x3",
    range: "curto",
    weight: 1,
    cost: "T$ 75",
    ammunitionType: "bala",
    weaponProperties: ["fogo", "leve"]
  },
  {
    id: "t20.ameacas.arma.arcabuz",
    name: "Arcabuz",
    sourcePage: 394,
    category: "arma",
    summary: "2d10 perfuração · crítico 19/x3 · alcance médio · duas mãos",
    attackAbility: "dex",
    damage: "2d10 perfuração",
    critical: "19/x3",
    range: "medio",
    weight: 2,
    cost: "T$ 800",
    ammunitionType: "bala",
    weaponProperties: ["fogo", "duas_maos"]
  },
  {
    id: "t20.ameacas.arma.bacamarte",
    name: "Bacamarte",
    sourcePage: 394,
    category: "arma",
    summary: "4d6 perfuração · crítico 19/x3 · alcance especial · cone de 4,5m",
    attackAbility: "dex",
    damage: "4d6 perfuração",
    critical: "19/x3",
    range: "especial",
    weight: 2,
    cost: "T$ 450",
    ammunitionType: "bala",
    weaponProperties: ["fogo", "duas_maos", "area"]
  },

  // ─── Armas Exóticas ────────────────────────────────────────────────────────
  {
    id: "t20.ameacas.arma.acoite_finntroll",
    name: "Açoite Finntroll",
    sourcePage: 394,
    category: "arma",
    summary: "1d8 corte · crítico x2 · uma mão · flexível e venenosa",
    attackAbility: "dex",
    damage: "1d8 corte",
    critical: "x2",
    weight: 1,
    cost: "T$ 30",
    weaponProperties: ["exotica", "uma_mao", "desarmar"]
  },
  {
    id: "t20.ameacas.arma.espada_vespa",
    name: "Espada Vespa",
    sourcePage: 394,
    category: "arma",
    summary: "2d4 corte ou perfuração · crítico 18 · uma mão",
    attackAbility: "dex",
    damage: "2d4 corte/perfuração",
    critical: "18",
    weight: 1,
    cost: "T$ 75",
    weaponProperties: ["exotica", "uma_mao", "agil"]
  },
  {
    id: "t20.ameacas.arma.pistola_punhal",
    name: "Pistola-Punhal",
    sourcePage: 394,
    category: "arma",
    summary: "1d6 perfuração (corpo a corpo) ou 2d6 perfuração (tiro curto) · crítico 19/x3",
    attackAbility: "dex",
    damage: "1d6/2d6 perfuração",
    critical: "19/x3",
    range: "curto",
    weight: 1,
    cost: "T$ 300",
    ammunitionType: "bala",
    weaponProperties: ["exotica", "fogo", "acoplada"]
  },
  {
    id: "t20.ameacas.arma.mordida_do_diabo",
    name: "Mordida do Diabo",
    sourcePage: 394,
    category: "arma",
    summary: "1d4 perfuração · crítico x2 · armadilha de punho",
    attackAbility: "str",
    damage: "1d4 perfuração",
    critical: "x2",
    weight: 1,
    cost: "T$ 30",
    weaponProperties: ["exotica", "uma_mao", "agarrar"]
  },
  {
    id: "t20.ameacas.arma.presa_de_serpente",
    name: "Presa de Serpente",
    sourcePage: 394,
    category: "arma",
    summary: "1d8 corte · crítico 17 · lâmina serpentina ágil",
    attackAbility: "dex",
    damage: "1d8 corte",
    critical: "17",
    weight: 1,
    cost: "T$ 1.000",
    weaponProperties: ["exotica", "uma_mao", "agil"]
  },
  {
    id: "t20.ameacas.arma.lanca_de_fogo",
    name: "Lança de Fogo",
    sourcePage: 394,
    category: "arma",
    summary: "1d8 perfuração (haste) mais disparo de fogo 2d6 em cone · duas mãos",
    attackAbility: "str",
    damage: "1d8 perfuração",
    critical: "x2",
    weight: 2,
    cost: "T$ 1.000",
    weaponProperties: ["exotica", "duas_maos", "fogo", "haste"]
  },
  {
    id: "t20.ameacas.arma.shuriken",
    name: "Shuriken",
    sourcePage: 394,
    category: "arma",
    summary: "1d4 perfuração · crítico x2 · alcance curto · arremesso rápido",
    attackAbility: "dex",
    damage: "1d4 perfuração",
    critical: "x2",
    range: "curto",
    weight: 0.5,
    cost: "T$ 1",
    weaponProperties: ["exotica", "arremesso", "leve"]
  },
  {
    id: "t20.ameacas.arma.arpao",
    name: "Arpão",
    sourcePage: 394,
    category: "arma",
    summary: "1d10 perfuração · crítico x3 · alcance curto · prende o alvo",
    attackAbility: "str",
    damage: "1d10 perfuração",
    critical: "x3",
    range: "curto",
    weight: 1,
    cost: "T$ 30",
    weaponProperties: ["exotica", "uma_mao", "arremesso"]
  },

  // ─── Novas Armaduras e Escudos ─────────────────────────────────────────────
  {
    id: "t20.ameacas.armadura.armadura_ossos",
    name: "Armadura de Ossos",
    sourcePage: 395,
    category: "armadura",
    summary: "Defesa +3 · penalidade -2 · leve · estrutura de ossos reforçada",
    armorBonus: 3,
    armorPenalty: -2,
    weight: 2,
    cost: "T$ 120",
    armorMaterial: "non_metal",
    armorWeightClass: "light"
  },
  {
    id: "t20.ameacas.armadura.veste_teia_aranha",
    name: "Veste de Teia de Aranha",
    sourcePage: 395,
    category: "armadura",
    summary: "Defesa +4 · penalidade 0 · leve · tecida com seda de aranha gigante",
    armorBonus: 4,
    armorPenalty: 0,
    weight: 2,
    cost: "T$ 3.000",
    armorMaterial: "non_metal",
    armorWeightClass: "light"
  },
  {
    id: "t20.ameacas.armadura.armadura_quitina",
    name: "Armadura de Quitina",
    sourcePage: 395,
    category: "armadura",
    summary: "Defesa +7 · penalidade -3 · pesada · placas de carapaça de insetos gigantes",
    armorBonus: 7,
    armorPenalty: -3,
    weight: 5,
    cost: "T$ 350",
    armorMaterial: "non_metal",
    armorWeightClass: "heavy"
  },
  {
    id: "t20.ameacas.escudo.escudo_couro",
    name: "Escudo de Couro",
    sourcePage: 395,
    category: "armadura",
    summary: "Defesa +1 · penalidade -1 · escudo leve de couro espesso e madeira",
    armorBonus: 1,
    shieldBonus: 1,
    armorPenalty: -1,
    weight: 1,
    cost: "T$ 3",
    armorMaterial: "non_metal"
  },

  // ─── Novos Itens Gerais e Esotéricos ───────────────────────────────────────
  {
    id: "t20.ameacas.equipamento.caixa_voz",
    name: "Caixa de Voz",
    sourcePage: 398,
    category: "equipamento",
    summary: "Aparelho acústico mecânico que reproduz sons e vozes gravadas",
    weight: 1,
    cost: "T$ 50"
  },
  {
    id: "t20.ameacas.equipamento.corda_teia",
    name: "Corda de Teia",
    sourcePage: 398,
    category: "equipamento",
    summary: "Corda extremamente resistente de teia de aranha monstruosa (15m)",
    weight: 1,
    cost: "T$ 100"
  },
  {
    id: "t20.ameacas.equipamento.dente_wisphago",
    name: "Dente de Wisphago",
    sourcePage: 398,
    category: "equipamento",
    summary: "Presa fóssil que brilha suavemente e canaliza energias místicas",
    weight: 1,
    cost: "T$ 100"
  },
  {
    id: "t20.ameacas.equipamento.ankh_solar",
    name: "Ankh Solar",
    sourcePage: 398,
    category: "equipamento",
    summary: "Item esotérico que concede +1 PM temporário para magias de luz ou cura",
    weight: 1,
    cost: "T$ 450"
  },
  {
    id: "t20.ameacas.equipamento.tomo_guerra",
    name: "Tomo de Guerra",
    sourcePage: 398,
    category: "equipamento",
    summary: "Item esotérico que concede +1 em testes de ataque e rolagens de dano de magias com armas",
    weight: 1,
    cost: "T$ 300"
  },
  {
    id: "t20.ameacas.equipamento.tomo_rancor",
    name: "Tomo do Rancor",
    sourcePage: 398,
    category: "equipamento",
    summary: "Item esotérico que amplifica magias de dano contra inimigos que feriram o conjurador",
    weight: 1,
    cost: "T$ 750"
  },
  {
    id: "t20.ameacas.equipamento.peconha_irritante",
    name: "Peçonha Irritante",
    sourcePage: 398,
    category: "equipamento",
    summary: "Veneno de contato/ferimento que deixa o alvo vulnerável e desconcentrado",
    weight: 0.5,
    cost: "T$ 10"
  },
  {
    id: "t20.ameacas.equipamento.veneno_batraquio",
    name: "Veneno Batráquio",
    sourcePage: 398,
    category: "equipamento",
    summary: "Peçonha extraída de anfíbios monstruosos que causa náusea e perda de PV",
    weight: 0.5,
    cost: "T$ 30"
  },
  {
    id: "t20.ameacas.equipamento.garra_feroz",
    name: "Garra Feroz",
    sourcePage: 398,
    category: "equipamento",
    summary: "Vestuário ornamental que fornece +1 em testes de Atletismo e Intimidação",
    weight: 1,
    cost: "T$ 60"
  },
  {
    id: "t20.ameacas.equipamento.manto_mantor",
    name: "Manto do Mantor",
    sourcePage: 398,
    category: "equipamento",
    summary: "Capa feita com asas de mantor que concede camuflagem e bônus em Furtividade",
    weight: 1,
    cost: "T$ 450"
  },
  {
    id: "t20.ameacas.equipamento.manto_pesado",
    name: "Manto Pesado",
    sourcePage: 398,
    category: "equipamento",
    summary: "Vestimenta rústica e grossa que protege contra intempéries e frio",
    weight: 1,
    cost: "T$ 10"
  },
  {
    id: "t20.ameacas.equipamento.sombreiro",
    name: "Sombreiro",
    sourcePage: 398,
    category: "equipamento",
    summary: "Chapéu de abas largas que mitiga sensibilidade à luz e protege do calor",
    weight: 1,
    cost: "T$ 10"
  },
  {
    id: "t20.ameacas.equipamento.traje_selako",
    name: "Traje Selako",
    sourcePage: 398,
    category: "equipamento",
    summary: "Vestimenta aquática que reduz arrasto na água e fornece +2 em testes de Natação",
    weight: 1,
    cost: "T$ 90"
  },
  {
    id: "t20.ameacas.equipamento.gorlogg_ensopado",
    name: "Gorlogg Ensopado",
    sourcePage: 398,
    category: "equipamento",
    summary: "Alimentação gourmet que aumenta a recuperação de PV e PM em +1 por nível no descanso",
    weight: 1,
    cost: "T$ 10"
  },
  {
    id: "t20.ameacas.equipamento.omelete_monstruosa",
    name: "Omelete Monstruosa",
    sourcePage: 398,
    category: "equipamento",
    summary: "Alimentação vigorosa que concede +2 em rolagens de dano por um dia",
    weight: 1,
    cost: "T$ 15"
  },
  {
    id: "t20.ameacas.equipamento.sashimi_kraken",
    name: "Sashimi de Kraken",
    sourcePage: 398,
    category: "equipamento",
    summary: "Iguaria de Tamu-ra que concede +2 em Diplomacia e 5 PM temporários por um dia",
    weight: 1,
    cost: "T$ 50"
  },

  // ─── Animais e Montarias ───────────────────────────────────────────────────
  {
    id: "t20.ameacas.equipamento.bulette",
    name: "Bulette",
    sourcePage: 399,
    category: "equipamento",
    summary: "Montaria pesada e agressiva adequada para desertos e montanhas",
    weight: 0,
    cost: "T$ 1.000"
  },
  {
    id: "t20.ameacas.equipamento.capivara",
    name: "Capivara",
    sourcePage: 399,
    category: "equipamento",
    summary: "Montaria ágil e dócil para personagens Pequenos e Minúsculos",
    weight: 0,
    cost: "T$ 50"
  },
  {
    id: "t20.ameacas.equipamento.corcel_deserto",
    name: "Corcel do Deserto",
    sourcePage: 399,
    category: "equipamento",
    summary: "Cavalo insetoide adaptado à Grande Savana e ao Deserto da Perdição",
    weight: 0,
    cost: "T$ 200"
  },
  {
    id: "t20.ameacas.equipamento.dromedario",
    name: "Dromedário",
    sourcePage: 399,
    category: "equipamento",
    summary: "Animal de carga e montaria robusto para ambientes áridos",
    weight: 0,
    cost: "T$ 100"
  },
  {
    id: "t20.ameacas.equipamento.elefante",
    name: "Elefante",
    sourcePage: 399,
    category: "equipamento",
    summary: "Montaria colossal e animal de trabalho de força monumental",
    weight: 0,
    cost: "T$ 500"
  },
  {
    id: "t20.ameacas.equipamento.hiena",
    name: "Hiena",
    sourcePage: 399,
    category: "equipamento",
    summary: "Parceiro caçador feroz ou montaria para personagens Pequenos",
    weight: 0,
    cost: "T$ 50"
  },
  {
    id: "t20.ameacas.equipamento.leao",
    name: "Leão",
    sourcePage: 399,
    category: "equipamento",
    summary: "Montaria nobre e formidável de combate para guerreiros audazes",
    weight: 0,
    cost: "T$ 500"
  },
  {
    id: "t20.ameacas.equipamento.rinoceronte",
    name: "Rinoceronte",
    sourcePage: 399,
    category: "equipamento",
    summary: "Montaria blindada com marrada devastadora",
    weight: 0,
    cost: "T$ 800"
  },
  {
    id: "t20.ameacas.equipamento.urso_pardo",
    name: "Urso Pardo",
    sourcePage: 399,
    category: "equipamento",
    summary: "Predador poderoso usado como montaria de guarda e combate",
    weight: 0,
    cost: "T$ 400"
  },

  // ─── Novos Materiais Especiais ─────────────────────────────────────────────
  {
    id: "t20.ameacas.material.casco_monstro",
    name: "Casco de Monstro",
    sourcePage: 400,
    category: "equipamento",
    summary: "Material especial que fornece resistência física e aumenta dureza de equipamentos",
    weight: 0,
    cost: "+T$ 750 / +T$ 6.000"
  },
  {
    id: "t20.ameacas.material.lanajuste",
    name: "Lanajuste",
    sourcePage: 400,
    category: "equipamento",
    summary: "Tecido aquático e cortante; em cimitarras cria a lendária Espada de Coral",
    weight: 0,
    cost: "+T$ 600 / +T$ 1.500"
  },
  {
    id: "t20.ameacas.material.prata",
    name: "Prata",
    sourcePage: 400,
    category: "equipamento",
    summary: "Revestimento que causa +2 de dano e RD 5/10 contra espíritos e mortos-vivos",
    weight: 0,
    cost: "+T$ 600 / +T$ 1.500 / +T$ 3.000"
  },
  {
    id: "t20.ameacas.material.quitina_razza",
    name: "Quitina Razza",
    sourcePage: 400,
    category: "equipamento",
    summary: "Quitina lendária de razza'kham que explode dados de dano no resultado máximo e amplia Percepção e Defesa",
    weight: 0,
    cost: "Especial"
  }
];

export const getT20AmeacasEquipment = (id: string) => T20_AMEACAS_EQUIPMENT.find((item) => item.id === id);
