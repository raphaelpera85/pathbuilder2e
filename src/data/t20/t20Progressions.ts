export interface T20ClassProgression {
  classId: string;
  sourcePage: number;
  levelOneFeatures: string[];
  powerLevels: number[];
  attributeIncreaseLevels: number[];
  notes: string;
  featuresByLevel: Record<number, string[]>;
}

const allPowerLevels = Array.from({ length: 19 }, (_, index) => index + 2);
const p = (classId: string, sourcePage: number, levelOneFeatures: string[], notes = "Poder de classe no 2º nível e a cada nível seguinte."): T20ClassProgression => ({
  classId, sourcePage, levelOneFeatures, powerLevels: allPowerLevels, attributeIncreaseLevels: [], notes,
  featuresByLevel: Object.fromEntries([1, ...allPowerLevels].map((level) => [level, level === 1 ? levelOneFeatures : ["Poder de classe"]])),
});

export const T20_CLASS_PROGRESSIONS: T20ClassProgression[] = [
  p("arcanista", 36, ["Caminho do Arcanista", "Conhecimento Mágico", "Magias"], "Poder de Arcanista no 2º nível e a cada nível seguinte."),
  p("barbaro", 40, ["Fúria", "Instinto Selvagem"], "Poder de Bárbaro no 2º nível e a cada nível seguinte."),
  p("bardo", 43, ["Apenas um Bardo", "Inspiração"], "Poder de Bardo no 2º nível e a cada nível seguinte."),
  p("bucaneiro", 46, ["Audácia", "Insolência"], "Poder de Bucaneiro no 2º nível e a cada nível seguinte."),
  p("cacador", 49, ["Marca da Presa", "Rastreador"], "Poder de Caçador no 2º nível e a cada nível seguinte."),
  p("cavaleiro", 52, ["Código de Honra", "Postura de Combate"], "Poder de Cavaleiro no 2º nível e a cada nível seguinte."),
  p("clerigo", 56, ["Prece", "Devoto"], "Poder de Clérigo no 2º nível e a cada nível seguinte."),
  p("druida", 60, ["Devoto", "Empatia Selvagem"], "Poder de Druida no 2º nível e a cada nível seguinte."),
  p("guerreiro", 64, ["Ataque Especial", "Durão"], "Poder de Guerreiro no 2º nível e a cada nível seguinte."),
  p("inventor", 67, ["Engenhosidade", "Protótipo"], "Poder de Inventor no 2º nível e a cada nível seguinte."),
  p("ladino", 72, ["Ataque Furtivo", "Especialista"], "Poder de Ladino no 2º nível e a cada nível seguinte."),
  p("lutador", 75, ["Briga", "Golpe Relâmpago"], "Poder de Lutador no 2º nível e a cada nível seguinte."),
  p("nobre", 78, ["Autoconfiança", "Espólio", "Orgulho"], "Poder de Nobre no 2º nível e a cada nível seguinte."),
  p("paladino", 81, ["Abençoado", "Código do Herói", "Golpe Divino"], "Poder de Paladino no 2º nível e a cada nível seguinte."),
];

export const getT20ClassProgression = (classId: string) => T20_CLASS_PROGRESSIONS.find((item) => item.classId === classId);
