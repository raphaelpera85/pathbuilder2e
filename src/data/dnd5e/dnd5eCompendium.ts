export interface Dnd5eCompendiumEntry { id: string; name: string; sourcePage: number; category: "arma" | "armadura" | "equipamento" | "magia" | "talento"; summary: string; }

export const DND5E_EQUIPMENT: Dnd5eCompendiumEntry[] = [
  { id: "dnd5e.arma.adaga", name: "Adaga", sourcePage: 149, category: "arma", summary: "1d4 perfurante · acuidade · leve" },
  { id: "dnd5e.arma.arco_curto", name: "Arco curto", sourcePage: 149, category: "arma", summary: "1d6 perfurante · munição · duas mãos" },
  { id: "dnd5e.arma.espada_longa", name: "Espada longa", sourcePage: 149, category: "arma", summary: "1d8 cortante · versátil" },
  { id: "dnd5e.arma.machado_de_batalha", name: "Machado de batalha", sourcePage: 149, category: "arma", summary: "1d8 cortante · versátil" },
  { id: "dnd5e.arma.espada_grande", name: "Espada grande", sourcePage: 149, category: "arma", summary: "2d6 cortante · pesada · duas mãos" },
  { id: "dnd5e.armadura.couro", name: "Armadura de couro", sourcePage: 145, category: "armadura", summary: "CA 11 + Des" },
  { id: "dnd5e.armadura.cota_de_malha", name: "Cota de malha", sourcePage: 145, category: "armadura", summary: "CA 16 · For 13 · desvantagem Furtividade" },
  { id: "dnd5e.armadura.escudo", name: "Escudo", sourcePage: 146, category: "armadura", summary: "+2 CA" },
  { id: "dnd5e.equipamento.mochila", name: "Mochila", sourcePage: 153, category: "equipamento", summary: "Kit de exploração" },
  { id: "dnd5e.equipamento.corda", name: "Corda de cânhamo (15m)", sourcePage: 153, category: "equipamento", summary: "Corda resistente" },
];

export const DND5E_SPELLS: Dnd5eCompendiumEntry[] = [
  { id: "dnd5e.magia.luz", name: "Luz", sourcePage: 255, category: "magia", summary: "truque · evocação" },
  { id: "dnd5e.magia.maos_flamejantes", name: "Mãos Flamejantes", sourcePage: 257, category: "magia", summary: "1º nível · evocação" },
  { id: "dnd5e.magia.curar_ferimentos", name: "Curar Ferimentos", sourcePage: 229, category: "magia", summary: "1º nível · evocação" },
  { id: "dnd5e.magia.misseis_magicos", name: "Mísseis Mágicos", sourcePage: 259, category: "magia", summary: "1º nível · evocação" },
  { id: "dnd5e.magia.escudo", name: "Escudo", sourcePage: 245, category: "magia", summary: "1º nível · abjuração · reação · +5 CA" },
  { id: "dnd5e.magia.bola_de_fogo", name: "Bola de Fogo", sourcePage: 241, category: "magia", summary: "3º nível · evocação" },
];

export const DND5E_FEATS: Dnd5eCompendiumEntry[] = [
  { id: "dnd5e.talento.alerta", name: "Alerta", sourcePage: 165, category: "talento", summary: "+5 iniciativa; não pode ser surpreso" },
  { id: "dnd5e.talento.atacante_de_duas_armas", name: "Atacante de Duas Armas", sourcePage: 165, category: "talento", summary: "Combate com duas armas" },
  { id: "dnd5e.talento.mestre_de_armas", name: "Mestre de Armas", sourcePage: 167, category: "talento", summary: "Proficiência com armas" },
  { id: "dnd5e.talento.resiliente", name: "Resiliente", sourcePage: 168, category: "talento", summary: "Aumento de atributo e salvamento" },
];
