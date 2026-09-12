export interface T20ClassRules {
  id: string;
  name: string;
  sourcePage: number;
  startingHp: number;
  hpPerLevel: number;
  manaPerLevel: number;
  fixedSkills: string[];
  choiceSkillCount: number;
  choiceSkills: string[];
  proficiencies: string;
}

const c = (id: string, name: string, sourcePage: number, startingHp: number, hpPerLevel: number, manaPerLevel: number, fixedSkills: string[], choiceSkillCount: number, choiceSkills: string[], proficiencies: string): T20ClassRules => ({
  id, name, sourcePage, startingHp, hpPerLevel, manaPerLevel, fixedSkills, choiceSkillCount, choiceSkills, proficiencies,
});

export const T20_CLASS_RULES: T20ClassRules[] = [
  c("arcanista", "Arcanista", 36, 8, 2, 6, ["misticismo", "vontade"], 1, ["conhecimento", "iniciativa", "oficio", "percepcao"], "Nenhuma"),
  c("barbaro", "Bárbaro", 40, 24, 6, 3, ["fortitude", "luta"], 4, ["adestramento", "atletismo", "cavalgar", "iniciativa", "intimidacao", "oficio", "percepcao", "pontaria", "sobrevivencia", "vontade"], "Armas marciais e escudos"),
  c("bardo", "Bardo", 43, 12, 3, 4, ["atuacao", "reflexos"], 6, ["acrobacia", "cavalgar", "conhecimento", "diplomacia", "enganacao", "furtividade", "iniciativa", "intuicao", "investigacao", "jogatina", "ladinagem", "luta", "misticismo", "nobreza", "percepcao", "pontaria", "religiao", "vontade"], "Armas marciais"),
  c("bucaneiro", "Bucaneiro", 46, 16, 4, 3, ["reflexos"], 4, ["acrobacia", "atletismo", "atuacao", "enganacao", "fortitude", "furtividade", "iniciativa", "intimidacao", "jogatina", "luta", "oficio", "percepcao", "pilotagem", "pontaria"], "Armas marciais"),
  c("cacador", "Caçador", 49, 16, 4, 4, ["sobrevivencia"], 6, ["adestramento", "atletismo", "cavalgar", "cura", "fortitude", "furtividade", "iniciativa", "investigacao", "luta", "oficio", "percepcao", "pontaria", "reflexos"], "Armas marciais e escudos"),
  c("cavaleiro", "Cavaleiro", 52, 20, 5, 3, ["fortitude", "luta"], 2, ["adestramento", "atletismo", "cavalgar", "diplomacia", "guerra", "iniciativa", "intimidacao", "nobreza", "percepcao", "vontade"], "Armas marciais, armaduras pesadas e escudos"),
  c("clerigo", "Clérigo", 56, 16, 4, 5, ["religiao", "vontade"], 2, ["conhecimento", "cura", "diplomacia", "fortitude", "iniciativa", "intuicao", "luta", "misticismo", "nobreza", "oficio", "percepcao"], "Armaduras pesadas e escudos"),
  c("druida", "Druida", 60, 16, 4, 4, ["sobrevivencia", "vontade"], 4, ["adestramento", "atletismo", "cavalgar", "conhecimento", "cura", "fortitude", "iniciativa", "intuicao", "luta", "misticismo", "oficio", "percepcao", "religiao"], "Escudos"),
  c("guerreiro", "Guerreiro", 64, 20, 5, 3, ["fortitude"], 2, ["adestramento", "atletismo", "cavalgar", "guerra", "iniciativa", "intimidacao", "luta", "oficio", "percepcao", "pontaria", "reflexos"], "Armas marciais, armaduras pesadas e escudos"),
  c("inventor", "Inventor", 67, 12, 3, 4, ["oficio", "vontade"], 4, ["conhecimento", "cura", "diplomacia", "fortitude", "iniciativa", "investigacao", "luta", "misticismo", "oficio", "pilotagem", "pontaria", "percepcao"], "Nenhuma"),
  c("ladino", "Ladino", 72, 12, 3, 4, ["ladinagem", "reflexos"], 8, ["acrobacia", "atletismo", "atuacao", "cavalgar", "conhecimento", "diplomacia", "enganacao", "furtividade", "iniciativa", "intimidacao", "intuicao", "investigacao", "jogatina", "luta", "oficio", "percepcao", "pilotagem", "pontaria"], "Nenhuma"),
  c("lutador", "Lutador", 75, 20, 5, 3, ["fortitude", "luta"], 4, ["acrobacia", "adestramento", "atletismo", "enganacao", "furtividade", "iniciativa", "intimidacao", "oficio", "percepcao", "pontaria", "reflexos"], "Nenhuma"),
  c("nobre", "Nobre", 78, 16, 4, 4, ["vontade"], 4, ["adestramento", "atuacao", "cavalgar", "conhecimento", "diplomacia", "enganacao", "fortitude", "guerra", "iniciativa", "intimidacao", "intuicao", "investigacao", "jogatina", "luta", "nobreza", "oficio", "percepcao", "pontaria"], "Armas marciais, armaduras pesadas e escudos"),
  c("paladino", "Paladino", 81, 20, 5, 3, ["luta", "vontade"], 2, ["adestramento", "atletismo", "cavalgar", "cura", "diplomacia", "fortitude", "guerra", "iniciativa", "intuicao", "nobreza", "percepcao", "religiao"], "Armas marciais, armaduras pesadas e escudos"),
];

export const getT20ClassRules = (id: string) => T20_CLASS_RULES.find((item) => item.id === id);
