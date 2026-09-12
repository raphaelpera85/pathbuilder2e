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
  startingEquipment?: string[];
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

const DND5E_STARTING_EQUIPMENT: Record<string, string[]> = {
  barbaro: ["Machado grande ou arma marcial corpo a corpo", "Duas machadinhas", "Pacote de explorador", "Quatro azagaias"],
  bardo: ["Rapieira, espada longa ou arma simples", "Instrumento musical", "Armadura de couro", "Pacote de diplomata"],
  bruxo: ["Besta leve e 20 virotes ou arma simples", "Bolsa de componentes ou foco arcano", "Pacote de estudioso", "Armadura de couro"],
  clerigo: ["Maça ou martelo de guerra", "Cota de escamas, couro ou peitoral", "Escudo", "Símbolo sagrado", "Pacote de sacerdote"],
  druida: ["Escudo de madeira", "Cimitarra ou arma simples", "Armadura de couro", "Pacote de explorador"],
  feiticeiro: ["Besta leve e 20 virotes ou arma simples", "Bolsa de componentes ou foco arcano", "Pacote de explorador"],
  guerreiro: ["Cota de malha ou armadura de couro + arco longo", "Arma marcial + escudo ou duas armas marciais", "Besta leve e 20 virotes ou duas machadinhas", "Pacote de aventureiro"],
  ladino: ["Rapieira ou espada curta", "Arco curto e 20 flechas ou espada curta", "Ferramentas de ladrão", "Armadura de couro", "Pacote de ladrão"],
  mago: ["Bastão ou adaga", "Bolsa de componentes ou foco arcano", "Livro de magias", "Pacote de estudioso"],
  monge: ["Espada curta ou arma simples", "Pacote de explorador", "Dez dardos"],
  paladino: ["Arma marcial + escudo ou duas armas marciais", "Cinco azagaias ou arma corpo a corpo simples", "Cota de malha", "Símbolo sagrado", "Pacote de sacerdote"],
  patrulheiro: ["Cota de escamas ou armadura de couro", "Duas espadas curtas ou duas armas simples", "Pacote de explorador", "Arco longo e 20 flechas ou duas machadinhas"],
};
DND5E_CLASS_RULES.forEach((classRule) => { classRule.startingEquipment = DND5E_STARTING_EQUIPMENT[classRule.id] || []; });

export const getDnd5eClassRules = (id: string) => DND5E_CLASS_RULES.find((item) => item.id === id);
