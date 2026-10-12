/**
 * Champions of Ruin (D&D 3.5, Forgotten Realms, scan sem camada de texto), cap. 1 "Races", pp. 8-16: draegloth (classe de monstro),
 * extaminaar e krinth. Lidos da imagem em resolução reduzida (draegloth: tabela a 300dpi); não conferidos em zoom palavra a palavra.
 * Só dados (sem UI nem Supabase). Livro 3.5: não misturar com 5E.
 */
export type CorRace = {
  id: string;
  name: string;
  abilityAdjustments: Record<string, number>;
  size: "Medium";
  speedFt: number;
  levelAdjustment: number;
  favoredClass: string;
  automaticLanguages: string[];
  bonusLanguages: string[];
  traits: string[];
};

export const COR_RACES: CorRace[] = [
  {
    id: "cor-extaminaar",
    name: "Extaminaar",
    abilityAdjustments: { Str: -2, Dex: 2 },
    size: "Medium",
    speedFt: 30,
    levelAdjustment: 0,
    favoredClass: "Rogue",
    automaticLanguages: ["Common", "Turmic", "Yuan-ti"],
    bonusLanguages: ["Abyssal", "Chondathan", "Draconic"],
    traits: [
      "Low-Light Vision: can see twice as far as a human in starlight, moonlight, torchlight, and similar conditions of poor illumination; retains the ability to distinguish color and detail under these conditions.",
      "+2 racial bonus on Fortitude saves versus poison.",
      "+4 racial bonus on Swim checks.",
      "+2 racial bonus on Escape Artist checks.",
      "Spell-Like Abilities: at will—speak with animals (snakes only); 3/day—charm animal (snakes only).",
    ],
  },
  {
    id: "cor-krinth",
    name: "Krinth",
    abilityAdjustments: { Con: 2, Cha: -2 },
    size: "Medium",
    speedFt: 30,
    levelAdjustment: 0,
    favoredClass: "Fighter",
    automaticLanguages: ["Common", "Netherese"],
    bonusLanguages: ["Abyssal", "Chondathan", "Damaran", "Undercommon"],
    traits: [
      "Darkvision out to 60 feet.",
      "+1 racial bonus on all Will saves.",
      "+1 bonus on all saving throws against spells and spell-like abilities with the shadow descriptor.",
      "+2 racial bonus on Hide checks in shadowy conditions.",
      "+4 racial bonus on saving throws against fear.",
      "Krinth cannot become shaken, and they ignore the effects of the shaken condition; they can still become frightened or panicked.",
    ],
  },
];

export type CorDraeglothLevel = {
  level: number;
  hitDice: string;
  bab: number;
  fort: number;
  ref: number;
  will: number;
  skillPoints: string;
  cr: number;
  special: string;
};

/** Tabela 1-1: classe de monstro draegloth (as colunas Skill Points só aparecem em 1º, 2º, 4º, 6º, 8º e 10º, como impresso). */
export const COR_DRAEGLOTH: {
  id: string;
  name: string;
  levelAdjustment: number;
  baseSpeedFt: number;
  darkvisionFt: number;
  favoredClass: string;
  automaticLanguages: string[];
  bonusLanguages: string[];
  racialTraits: string[];
  classSkills: string[];
  levels: CorDraeglothLevel[];
} = {
  id: "cor-draegloth",
  name: "Draegloth",
  levelAdjustment: 4,
  baseSpeedFt: 30,
  darkvisionFt: 60,
  favoredClass: "Cleric",
  automaticLanguages: ["Abyssal", "Elven", "Undercommon"],
  bonusLanguages: ["Aquan", "Common", "Draconic", "Drow Sign Language", "Gnome", "Goblin", "Kuo-toan"],
  racialTraits: [
    "+2 Constitution.",
    "Immune to sleep-inducing spells and effects.",
    "+2 racial bonus on saving throws against enchantment spells or effects.",
    "Level Adjustment +4: with its 6 Hit Dice, the draegloth has an ECL of 10.",
  ],
  classSkills: ["Climb", "Concentration", "Craft", "Hide", "Jump", "Knowledge (arcana)", "Knowledge (the planes)", "Knowledge (religion)", "Listen", "Move Silently", "Search", "Spellcraft", "Spot", "Survival"],
  levels: [
    { level: 1, hitDice: "1d10", bab: 1, fort: 2, ref: 2, will: 2, skillPoints: "(8 + Int mod) × 4", cr: 1, special: "Feat, 2 claws 1d4, resistances (acid 5, cold 5, electricity 5, fire 5), dancing lights 1/day" },
    { level: 2, hitDice: "2d10", bab: 2, fort: 3, ref: 3, will: 3, skillPoints: "8 + Int mod", cr: 2, special: "+2 Str, +1 natural armor, faerie fire 1/day, darkness 1/day" },
    { level: 3, hitDice: "2d10", bab: 2, fort: 3, ref: 3, will: 3, skillPoints: "", cr: 2, special: "+2 Dex, darkness 2/day, bite 1d6" },
    { level: 4, hitDice: "3d10", bab: 3, fort: 3, ref: 3, will: 3, skillPoints: "8 + Int mod", cr: 3, special: "+2 Str, +2 Int, desecrate 1/day" },
    { level: 5, hitDice: "3d10", bab: 3, fort: 3, ref: 3, will: 3, skillPoints: "", cr: 3, special: "+2 Con, resistances (acid 10, cold 10, electricity 10, fire 10), immunity to poison" },
    { level: 6, hitDice: "4d10", bab: 4, fort: 4, ref: 4, will: 4, skillPoints: "8 + Int mod", cr: 3, special: "+2 Str, darkness 3/day" },
    { level: 7, hitDice: "4d10", bab: 4, fort: 4, ref: 4, will: 4, skillPoints: "", cr: 4, special: "+2 Str, +3 natural armor, unholy blight 1/day, 2 claws 1d6" },
    { level: 8, hitDice: "5d10", bab: 5, fort: 4, ref: 4, will: 4, skillPoints: "8 + Int mod", cr: 4, special: "+2 Dex, darkness 4/day" },
    { level: 9, hitDice: "5d10", bab: 5, fort: 4, ref: 4, will: 4, skillPoints: "", cr: 5, special: "+2 Str, Large size, 10-ft. reach, bite 1d8" },
    { level: 10, hitDice: "6d10", bab: 6, fort: 5, ref: 5, will: 5, skillPoints: "8 + Int mod", cr: 5, special: "+2 Str, +5 natural armor, resistances (acid 20, cold 20, electricity 20, fire 20)" },
  ],
};
