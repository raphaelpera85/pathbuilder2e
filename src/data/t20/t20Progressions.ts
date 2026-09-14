export interface T20ClassProgression {
  classId: string;
  sourcePage: number;
  levelOneFeatures: string[];
  powerLevels: number[];
  attributeIncreaseLevels: number[];
  notes: string;
  featuresByLevel: Record<number, string[]>;
}

const levels = Array.from({ length: 20 }, (_, index) => index + 1);

function progression(classId: string, sourcePage: number, rows: Record<number, string[]>, notes: string): T20ClassProgression {
  const featuresByLevel = Object.fromEntries(levels.map((level) => [level, rows[level] || []])) as Record<number, string[]>;
  const powerLevels = levels.filter((level) => featuresByLevel[level].some((feature) => /^Poder de /.test(feature)));
  return { classId, sourcePage, levelOneFeatures: featuresByLevel[1], powerLevels, attributeIncreaseLevels: [], notes, featuresByLevel };
}

const power = (className: string) => `Poder de ${className}`;

// Tabelas 1-4 a 1-17 do Tormenta20 — Livro Básico, pp. 37–82.
export const T20_CLASS_PROGRESSIONS: T20ClassProgression[] = [
  progression("arcanista", 37, {
    1: ["Caminho do Arcanista", "Magias (1º círculo)"],
    2: [power("Arcanista")], 3: [power("Arcanista")], 4: [power("Arcanista")], 5: ["Magias (2º círculo)", power("Arcanista")],
    6: [power("Arcanista")], 7: [power("Arcanista")], 8: [power("Arcanista")], 9: ["Magias (3º círculo)", power("Arcanista")],
    10: [power("Arcanista")], 11: [power("Arcanista")], 12: [power("Arcanista")], 13: ["Magias (4º círculo)", power("Arcanista")],
    14: [power("Arcanista")], 15: [power("Arcanista")], 16: [power("Arcanista")], 17: ["Magias (5º círculo)", power("Arcanista")],
    18: [power("Arcanista")], 19: [power("Arcanista")], 20: ["Alta Arcana", power("Arcanista")],
  }, "Poder de Arcanista no 2º nível e a cada nível seguinte; o círculo de magia aumenta nos níveis 5, 9, 13 e 17."),
  progression("barbaro", 41, {
    1: ["Fúria +2"], 2: [power("Bárbaro")], 3: ["Instinto Selvagem +1", power("Bárbaro")], 4: [power("Bárbaro")], 5: [power("Bárbaro"), "Resistência a Dano 2"],
    6: ["Fúria +3", power("Bárbaro")], 7: [power("Bárbaro")], 8: [power("Bárbaro"), "Resistência a Dano 4"], 9: ["Instinto Selvagem +2", power("Bárbaro")], 10: [power("Bárbaro")],
    11: ["Fúria +4", power("Bárbaro"), "Resistência a Dano 6"], 12: [power("Bárbaro")], 13: [power("Bárbaro")], 14: [power("Bárbaro"), "Resistência a Dano 8"],
    15: ["Instinto Selvagem +3", power("Bárbaro")], 16: ["Fúria +5", power("Bárbaro")], 17: [power("Bárbaro"), "Resistência a Dano 10"], 18: [power("Bárbaro")], 19: [power("Bárbaro")], 20: ["Fúria Titânica", power("Bárbaro")],
  }, "Poder de Bárbaro no 2º nível e a cada nível seguinte."),
  progression("bardo", 45, {
    1: ["Inspiração +1", "Magias (1º círculo)"], 2: [power("Bardo"), "Eclético"], 3: [power("Bardo")], 4: [power("Bardo")], 5: ["Inspiração +2", power("Bardo")],
    6: ["Magias (2º círculo)", power("Bardo")], 7: [power("Bardo")], 8: [power("Bardo")], 9: ["Inspiração +3", power("Bardo")], 10: ["Magias (3º círculo)", power("Bardo")],
    11: [power("Bardo")], 12: [power("Bardo")], 13: ["Inspiração +4", power("Bardo")], 14: ["Magias (4º círculo)", power("Bardo")], 15: [power("Bardo")], 16: [power("Bardo")],
    17: ["Inspiração +5", power("Bardo")], 18: [power("Bardo")], 19: [power("Bardo")], 20: ["Artista Completo", power("Bardo")],
  }, "Poder de Bardo no 2º nível e a cada nível seguinte; magias de 2º, 3º e 4º círculo nos níveis 6, 10 e 14."),
  progression("bucaneiro", 47, {
    1: ["Audácia", "Insolência"], 2: ["Evasão", power("Bucaneiro")], 3: ["Esquiva Sagaz +1", power("Bucaneiro")], 4: [power("Bucaneiro")], 5: ["Panache", power("Bucaneiro")],
    6: [power("Bucaneiro")], 7: ["Esquiva Sagaz +2", power("Bucaneiro")], 8: [power("Bucaneiro")], 9: [power("Bucaneiro")], 10: ["Evasão Aprimorada", power("Bucaneiro")],
    11: ["Esquiva Sagaz +3", power("Bucaneiro")], 12: [power("Bucaneiro")], 13: [power("Bucaneiro")], 14: [power("Bucaneiro")], 15: ["Esquiva Sagaz +4", power("Bucaneiro")],
    16: [power("Bucaneiro")], 17: [power("Bucaneiro")], 18: [power("Bucaneiro")], 19: ["Esquiva Sagaz +5", power("Bucaneiro")], 20: [power("Bucaneiro"), "Sorte de Nimb"],
  }, "Poder de Bucaneiro no 2º nível e a cada nível seguinte."),
  progression("cacador", 50, {
    1: ["Marca da Presa +1d4", "Rastreador"], 2: [power("Caçador")], 3: ["Explorador", power("Caçador")], 4: [power("Caçador")], 5: ["Caminho do Explorador", "Marca da Presa +1d8", power("Caçador")],
    6: [power("Caçador")], 7: ["Explorador", power("Caçador")], 8: [power("Caçador")], 9: ["Marca da Presa +1d12", power("Caçador")], 10: [power("Caçador")],
    11: ["Explorador", power("Caçador")], 12: [power("Caçador")], 13: ["Marca da Presa +2d8", power("Caçador")], 14: [power("Caçador")], 15: ["Explorador", power("Caçador")],
    16: [power("Caçador")], 17: ["Marca da Presa +2d10", power("Caçador")], 18: [power("Caçador")], 19: ["Explorador", power("Caçador")], 20: ["Mestre Caçador", power("Caçador")],
  }, "Poder de Caçador no 2º nível e a cada nível seguinte."),
  progression("cavaleiro", 53, {
    1: ["Baluarte +2", "Código de Honra"], 2: ["Duelo", power("Cavaleiro")], 3: [power("Cavaleiro")], 4: [power("Cavaleiro")], 5: ["Caminho do Cavaleiro", "Baluarte +4", power("Cavaleiro")],
    6: [power("Cavaleiro")], 7: ["Baluarte (aliados adjacentes)", power("Cavaleiro")], 8: [power("Cavaleiro")], 9: ["Baluarte +6", power("Cavaleiro")], 10: [power("Cavaleiro")],
    11: [power("Cavaleiro"), "Resoluto"], 12: [power("Cavaleiro")], 13: ["Baluarte +8", power("Cavaleiro")], 14: [power("Cavaleiro")], 15: ["Baluarte (aliados em alcance curto)", power("Cavaleiro")],
    16: [power("Cavaleiro")], 17: ["Baluarte +10", power("Cavaleiro")], 18: [power("Cavaleiro")], 19: [power("Cavaleiro")], 20: ["Bravura Final", power("Cavaleiro")],
  }, "Poder de Cavaleiro no 2º nível e a cada nível seguinte."),
  progression("clerigo", 57, {
    1: ["Devoto", "Magias (1º círculo)"], 2: [power("Clérigo")], 3: [power("Clérigo")], 4: [power("Clérigo")], 5: ["Magias (2º círculo)", power("Clérigo")],
    6: [power("Clérigo")], 7: [power("Clérigo")], 8: [power("Clérigo")], 9: ["Magias (3º círculo)", power("Clérigo")], 10: [power("Clérigo")],
    11: [power("Clérigo")], 12: [power("Clérigo")], 13: ["Magias (4º círculo)", power("Clérigo")], 14: [power("Clérigo")], 15: [power("Clérigo")], 16: [power("Clérigo")],
    17: ["Magias (5º círculo)", power("Clérigo")], 18: [power("Clérigo")], 19: [power("Clérigo")], 20: ["Mão da Divindade", power("Clérigo")],
  }, "Poder de Clérigo no 2º nível e a cada nível seguinte; magias de 2º a 5º círculo nos níveis 5, 9, 13 e 17."),
  progression("druida", 61, {
    1: ["Devoto", "Empatia Selvagem", "Magias (1º círculo)"], 2: ["Caminho dos Ermos", power("Druida")], 3: [power("Druida")], 4: [power("Druida")], 5: [power("Druida")],
    6: ["Magias (2º círculo)", power("Druida")], 7: [power("Druida")], 8: [power("Druida")], 9: [power("Druida")], 10: ["Magias (3º círculo)", power("Druida")],
    11: [power("Druida")], 12: [power("Druida")], 13: [power("Druida")], 14: ["Magias (4º círculo)", power("Druida")], 15: [power("Druida")],
    16: [power("Druida")], 17: [power("Druida")], 18: [power("Druida")], 19: [power("Druida")], 20: ["Força da Natureza", power("Druida")],
  }, "Poder de Druida no 2º nível e a cada nível seguinte."),
  progression("guerreiro", 65, {
    1: ["Ataque Especial +4"], 2: [power("Guerreiro")], 3: ["Durão", power("Guerreiro")], 4: [power("Guerreiro")], 5: ["Ataque Especial +8", power("Guerreiro")],
    6: ["Ataque Extra", power("Guerreiro")], 7: [power("Guerreiro")], 8: [power("Guerreiro")], 9: ["Ataque Especial +12", power("Guerreiro")], 10: [power("Guerreiro")],
    11: [power("Guerreiro")], 12: [power("Guerreiro")], 13: ["Ataque Especial +16", power("Guerreiro")], 14: [power("Guerreiro")], 15: [power("Guerreiro")], 16: [power("Guerreiro")],
    17: ["Ataque Especial +20", power("Guerreiro")], 18: [power("Guerreiro")], 19: [power("Guerreiro")], 20: ["Campeão", power("Guerreiro")],
  }, "Poder de Guerreiro no 2º nível e a cada nível seguinte."),
  progression("inventor", 68, {
    1: ["Engenhosidade", "Protótipo"], 2: ["Fabricar Item Superior (1 modificação)", power("Inventor")], 3: ["Comerciante", power("Inventor")], 4: ["Fabricar Item Superior (2 modificações)", power("Inventor")],
    5: [power("Inventor")], 6: ["Fabricar Item Superior (3 modificações)", power("Inventor")], 7: ["Encontrar Fraqueza", power("Inventor")], 8: ["Fabricar Item Superior (4 modificações)", power("Inventor")],
    9: ["Fabricar Item Mágico (menor)", power("Inventor")], 10: ["Fabricar Item Superior (5 modificações)", power("Inventor")], 11: ["Olho do Dragão", power("Inventor")], 12: ["Fabricar Item Superior (6 modificações)", power("Inventor")],
    13: ["Fabricar Item Mágico (médio)", power("Inventor")], 14: [power("Inventor")], 15: [power("Inventor")], 16: [power("Inventor")], 17: ["Fabricar Item Mágico (maior)", power("Inventor")],
    18: [power("Inventor")], 19: [power("Inventor")], 20: ["Obra-Prima", power("Inventor")],
  }, "Poder de Inventor no 2º nível e a cada nível seguinte."),
  progression("ladino", 73, {
    1: ["Ataque Furtivo +1d6", "Especialista"], 2: ["Evasão", power("Ladino")], 3: ["Ataque Furtivo +2d6", power("Ladino")], 4: ["Esquiva Sobrenatural", power("Ladino")],
    5: ["Ataque Furtivo +3d6", power("Ladino")], 6: [power("Ladino")], 7: ["Ataque Furtivo +4d6", power("Ladino")], 8: ["Olhos nas Costas", power("Ladino")],
    9: ["Ataque Furtivo +5d6", power("Ladino")], 10: ["Evasão Aprimorada", power("Ladino")], 11: ["Ataque Furtivo +6d6", power("Ladino")], 12: [power("Ladino")],
    13: ["Ataque Furtivo +7d6", power("Ladino")], 14: [power("Ladino")], 15: ["Ataque Furtivo +8d6", power("Ladino")], 16: [power("Ladino")],
    17: ["Ataque Furtivo +9d6", power("Ladino")], 18: [power("Ladino")], 19: ["Ataque Furtivo +10d6", power("Ladino")], 20: ["A Pessoa Certa para o Trabalho", power("Ladino")],
  }, "Poder de Ladino no 2º nível e a cada nível seguinte."),
  progression("lutador", 76, {
    1: ["Briga (1d6)", "Golpe Relâmpago"], 2: [power("Lutador")], 3: ["Casca Grossa (Con)", power("Lutador")], 4: [power("Lutador")], 5: ["Briga (1d8)", "Golpe Cruel", power("Lutador")],
    6: [power("Lutador")], 7: ["Casca Grossa (Con+1)", power("Lutador")], 8: [power("Lutador")], 9: ["Briga (1d10)", "Golpe Violento", power("Lutador")], 10: [power("Lutador")],
    11: ["Casca Grossa (Con+2)", power("Lutador")], 12: [power("Lutador")], 13: ["Briga (2d6)", power("Lutador")], 14: [power("Lutador")], 15: ["Casca Grossa (Con+3)", power("Lutador")],
    16: [power("Lutador")], 17: ["Briga (2d8)", power("Lutador")], 18: [power("Lutador")], 19: ["Casca Grossa (Con+4)", power("Lutador")], 20: ["Dono da Rua (2d10)", power("Lutador")],
  }, "Poder de Lutador no 2º nível e a cada nível seguinte."),
  progression("nobre", 79, {
    1: ["Autoconfiança", "Espólio", "Orgulho"], 2: [power("Nobre"), "Riqueza"], 3: ["Gritar Ordens", power("Nobre")], 4: [power("Nobre")], 5: [power("Nobre")], 6: [power("Nobre")], 7: [power("Nobre")], 8: [power("Nobre")], 9: [power("Nobre")], 10: [power("Nobre")],
    11: [power("Nobre")], 12: [power("Nobre")], 13: [power("Nobre")], 14: [power("Nobre")], 15: [power("Nobre")], 16: [power("Nobre")], 17: [power("Nobre")], 18: [power("Nobre")], 19: [power("Nobre")], 20: ["Realeza", power("Nobre")],
  }, "Poder de Nobre no 2º nível e a cada nível seguinte."),
  progression("paladino", 82, {
    1: ["Abençoado", "Código do Herói", "Golpe Divino (+1d8)"], 2: ["Cura pelas Mãos (1d8+1 PV)", power("Paladino")], 3: ["Aura Sagrada", power("Paladino")], 4: [power("Paladino")],
    5: ["Bênção da Justiça", "Golpe Divino (+2d8)", power("Paladino")], 6: ["Cura pelas Mãos (2d8+2 PV)", power("Paladino")], 7: [power("Paladino")], 8: [power("Paladino")],
    9: ["Golpe Divino (+3d8)", power("Paladino")], 10: ["Cura pelas Mãos (3d8+3 PV)", power("Paladino")], 11: [power("Paladino")], 12: [power("Paladino")],
    13: ["Golpe Divino (+4d8)", power("Paladino")], 14: ["Cura pelas Mãos (4d8+4 PV)", power("Paladino")], 15: [power("Paladino")], 16: [power("Paladino")],
    17: ["Golpe Divino (+5d8)", power("Paladino")], 18: ["Cura pelas Mãos (5d8+5 PV)", power("Paladino")], 19: [power("Paladino")], 20: [power("Paladino"), "Vingador Sagrado"],
  }, "Poder de Paladino no 2º nível e a cada nível seguinte."),
];

export const getT20ClassProgression = (classId: string) => T20_CLASS_PROGRESSIONS.find((item) => item.classId === classId);
