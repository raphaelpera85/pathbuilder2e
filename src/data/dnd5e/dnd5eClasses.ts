export interface Dnd5eClassRules {
  id: string;
  name: string;
  sourcePage: number;
  hitDie: string;
  primaryAbility: string;
  savingThrows: string[];
  skillChoiceCount: number;
  skillChoices: string[];
  proficiencies: string;
}

const c = (id: string, name: string, sourcePage: number, hitDie: string, primaryAbility: string, savingThrows: string[], skillChoiceCount: number, skillChoices: string[], proficiencies: string): Dnd5eClassRules => ({
  id, name, sourcePage, hitDie, primaryAbility, savingThrows, skillChoiceCount, skillChoices, proficiencies,
});

export const DND5E_CLASS_RULES: Dnd5eClassRules[] = [
  c("barbaro", "Bárbaro", 46, "d12", "Força", ["Força", "Constituição"], 2, ["adestramento", "atletismo", "intimidacao", "natureza", "percepcao", "sobrevivencia"], "Armas simples e marciais; armaduras leves e médias; escudos"),
  c("bardo", "Bardo", 51, "d8", "Carisma", ["Destreza", "Carisma"], 3, ["qualquer"], "Armas simples; bestas de mão, espadas longas, rapieiras e espadas curtas; armaduras leves"),
  c("bruxo", "Bruxo", 56, "d8", "Carisma", ["Sabedoria", "Carisma"], 2, ["arcanismo", "enganacao", "historia", "intimidacao", "investigacao", "natureza", "religiao"], "Armas simples; armaduras leves"),
  c("clerigo", "Clérigo", 63, "d8", "Sabedoria", ["Sabedoria", "Carisma"], 2, ["historia", "intuicao", "medicina", "persuasao", "religiao"], "Armas simples; armaduras leves e médias; escudos"),
  c("druida", "Druida", 71, "d8", "Sabedoria", ["Inteligência", "Sabedoria"], 2, ["arcanismo", "adestramento", "intuicao", "medicina", "natureza", "percepcao", "religiao", "sobrevivencia"], "Escudos e armaduras leves/médias não metálicas"),
  c("feiticeiro", "Feiticeiro", 77, "d6", "Carisma", ["Constituição", "Carisma"], 2, ["arcanismo", "enganacao", "intuicao", "intimidacao", "persuasao", "religiao"], "Nenhuma armadura; armas simples"),
  c("guerreiro", "Guerreiro", 83, "d10", "Força ou Destreza", ["Força", "Constituição"], 2, ["acrobacia", "adestramento", "atletismo", "historia", "intuicao", "intimidacao", "percepcao", "sobrevivencia"], "Todas as armaduras; escudos; armas simples e marciais"),
  c("ladino", "Ladino", 89, "d8", "Destreza", ["Destreza", "Inteligência"], 4, ["acrobacia", "atletismo", "atuacao", "enganacao", "furtividade", "intimidacao", "intuicao", "investigacao", "percepcao", "persuasao", "prestidigitacao"], "Armaduras leves; armas simples e algumas marciais; ferramentas de ladrão"),
  c("mago", "Mago", 94, "d6", "Inteligência", ["Inteligência", "Sabedoria"], 2, ["arcanismo", "historia", "intuicao", "investigacao", "medicina", "religiao"], "Nenhuma armadura; armas simples"),
  c("monge", "Monge", 102, "d8", "Destreza e Sabedoria", ["Força", "Destreza"], 2, ["acrobacia", "atletismo", "historia", "intuicao", "religiao", "furtividade"], "Armas simples e espadas curtas; ferramentas de artesão ou instrumento"),
  c("paladino", "Paladino", 108, "d10", "Força e Carisma", ["Sabedoria", "Carisma"], 2, ["atletismo", "intuicao", "intimidacao", "medicina", "persuasao", "religiao"], "Todas as armaduras; escudos; armas simples e marciais"),
  c("patrulheiro", "Patrulheiro", 115, "d10", "Destreza e Sabedoria", ["Força", "Destreza"], 3, ["adestramento", "atletismo", "furtividade", "investigacao", "natureza", "percepcao", "sobrevivencia"], "Armaduras leves e médias; escudos; armas simples e marciais"),
];

export const getDnd5eClassRules = (id: string) => DND5E_CLASS_RULES.find((item) => item.id === id);
