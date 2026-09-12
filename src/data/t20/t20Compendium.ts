export interface T20CompendiumEntry { id: string; name: string; sourcePage: number; category: "arma" | "armadura" | "equipamento" | "magia" | "poder"; summary: string; }

export const T20_EQUIPMENT: T20CompendiumEntry[] = [
  { id: "t20.arma.adaga", name: "Adaga", sourcePage: 142, category: "arma", summary: "1d4, perfuração, leve" },
  { id: "t20.arma.arco_curto", name: "Arco curto", sourcePage: 142, category: "arma", summary: "1d6, perfuração, alcance" },
  { id: "t20.arma.espada_longa", name: "Espada longa", sourcePage: 143, category: "arma", summary: "1d8, corte" },
  { id: "t20.arma.machado_guerra", name: "Machado de guerra", sourcePage: 143, category: "arma", summary: "1d12, corte" },
  { id: "t20.arma.montante", name: "Montante", sourcePage: 143, category: "arma", summary: "2d6, corte, pesada" },
  { id: "t20.armadura.leve", name: "Couro batido", sourcePage: 144, category: "armadura", summary: "Defesa +3, penalidade -1" },
  { id: "t20.armadura.media", name: "Cota de malha", sourcePage: 145, category: "armadura", summary: "Defesa +6, penalidade -2" },
  { id: "t20.armadura.pesada", name: "Armadura completa", sourcePage: 145, category: "armadura", summary: "Defesa +10, penalidade -5" },
  { id: "t20.equipamento.mochila", name: "Mochila de aventureiro", sourcePage: 148, category: "equipamento", summary: "Kit básico de exploração" },
  { id: "t20.equipamento.corda", name: "Corda (15m)", sourcePage: 149, category: "equipamento", summary: "Corda de cânhamo" },
];

export const T20_SPELLS: T20CompendiumEntry[] = [
  { id: "t20.magia.luz", name: "Luz", sourcePage: 194, category: "magia", summary: "1º círculo · essência" },
  { id: "t20.magia.curar_ferimentos", name: "Curar Ferimentos", sourcePage: 186, category: "magia", summary: "1º círculo · cura" },
  { id: "t20.magia.amedrontar", name: "Amedrontar", sourcePage: 178, category: "magia", summary: "1º círculo · medo" },
  { id: "t20.magia.escudo_da_fe", name: "Escudo da Fé", sourcePage: 190, category: "magia", summary: "1º círculo · proteção" },
  { id: "t20.magia.bola_de_fogo", name: "Bola de Fogo", sourcePage: 181, category: "magia", summary: "3º círculo · fogo" },
  { id: "t20.magia.dissipar_magia", name: "Dissipar Magia", sourcePage: 188, category: "magia", summary: "2º círculo · dissipação" },
];

export const T20_POWERS: T20CompendiumEntry[] = [
  { id: "t20.poder.ataque_poderoso", name: "Ataque Poderoso", sourcePage: 124, category: "poder", summary: "Poder geral de combate" },
  { id: "t20.poder.companheiro_animal", name: "Companheiro Animal", sourcePage: 125, category: "poder", summary: "Poder de destino" },
  { id: "t20.poder.especializacao_em_pericia", name: "Especialização em Perícia", sourcePage: 126, category: "poder", summary: "Poder geral de perícia" },
  { id: "t20.poder.foco_em_pericia", name: "Foco em Perícia", sourcePage: 126, category: "poder", summary: "Poder geral de perícia" },
  { id: "t20.poder.iniciativa_aprimorada", name: "Iniciativa Aprimorada", sourcePage: 127, category: "poder", summary: "Poder geral" },
];
