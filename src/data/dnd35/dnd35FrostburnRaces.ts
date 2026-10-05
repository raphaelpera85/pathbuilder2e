// ============================================================================
// D&D 3.5 — Frostburn: raças jogáveis novas (Cap. 2, pp. 36-41, texto em inglês)
// Extraído da camada de texto do PDF. Traços, números e tabelas de idade/altura
// como impressos (distâncias em pés, como no livro). Suplemento do 3.5.
// ============================================================================

export type Dnd35SupplementAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface Dnd35SupplementRace {
  id: string;
  name: string;
  sourceBook: "Frostburn";
  sourcePages: string;
  abilityModifiers: Partial<Record<Dnd35SupplementAbility, number>>;
  size: "Small" | "Medium";
  baseLandSpeedFeet: number;
  levelAdjustment: number;
  favoredClass: string;
  automaticLanguages: string[];
  /** null = "All" (qualquer idioma permitido). */
  bonusLanguages: string[] | null;
  /** Traços como impressos, na ordem do livro. */
  traits: { name: string; text: string }[];
  /** Perícias que viram de classe para a raça (traços impressos). */
  classSkills: string[];
  /** Tabela 2-2 (idade inicial), 2-3 (efeitos da idade) e 2-4 (altura e peso). */
  age: {
    adulthoodYears: number;
    startingAge: { barbarianRogueSorcerer: string; bardFighterPaladinRanger: string; clericDruidMonkWizard: string };
    middleAge: number; old: number; venerable: number; maxAgeModifier: string;
  };
  height: { male: { base: string; modifier: string; weight: string; weightModifier: string }; female: { base: string; modifier: string; weight: string; weightModifier: string } };
}

export const DND35_FROSTBURN_RACES: Dnd35SupplementRace[] = [
  {
    id: "frostburn-neanderthal",
    name: "Neanderthal",
    sourceBook: "Frostburn",
    sourcePages: "36-38",
    abilityModifiers: { str: 2, con: 2, dex: -2, int: -2 },
    size: "Medium",
    baseLandSpeedFeet: 30,
    levelAdjustment: 0,
    favoredClass: "Barbarian",
    automaticLanguages: ["Common"],
    bonusLanguages: ["Dwarven", "Giant", "Orc"],
    classSkills: [],
    traits: [
      { name: "Ability adjustments", text: "+2 Strength, +2 Constitution, –2 Dexterity, –2 Intelligence. Neanderthals are strong and hardy, but are hampered by slow intellects and reflexes." },
      { name: "Medium", text: "As Medium creatures, neanderthals have no special bonuses or penalties due to their size." },
      { name: "Speed", text: "Neanderthal base land speed is 30 feet." },
      { name: "Primitive Weapon Mastery (Ex)", text: "Neanderthals have a +1 racial bonus on attack rolls made with the following weapons: bolas, club, dart, greatclub, goad, harpoon, iuak, javelin, longspear, quarterstaff, ritiik, shortbow, shortspear, sling, spear, sugliin, throwing axe, and tiger skull club." },
      { name: "Skill bonus", text: "+2 racial bonus on Listen, Spot, and Survival checks. Neanderthals have excellent senses and know how to get along in the wild with ease." },
      { name: "Climate Tolerant (Ex)", text: "Neanderthals suffer little harm from environmental extremes of heat or cold. They do not have to make Fortitude saves in extreme environments between –20° and 140° F (severe cold to severe heat). This ability does not provide any protection from fire or cold damage. This ability counts as if a neanderthal had the Cold Endurance feat for purposes of fulfilling prerequisites for other feats or prestige classes." },
      { name: "Human Blood", text: "For all effects related to race, a neanderthal is considered a human. Neanderthals are just as vulnerable to special effects that affect humans as humans are, and they can use magic items that are only usable by humans." },
      { name: "Illiteracy", text: "Neanderthals do not automatically know how to read and write. A neanderthal must spend 2 skill points to gain the ability to read and write all languages he is able to speak. He does not automatically gain this skill when taking a nonbarbarian character class, with the exception of the wizard class." },
      { name: "Languages", text: "Automatic Languages: Common. Bonus Languages: Dwarven, Giant, and Orc." },
      { name: "Favored Class", text: "Barbarian. A multiclass neanderthal’s barbarian class does not count when determining whether he takes an experience point penalty for multiclassing." },
    ],
    age: {
      adulthoodYears: 14,
      startingAge: { barbarianRogueSorcerer: "+1d4", bardFighterPaladinRanger: "+1d6", clericDruidMonkWizard: "+3d6" },
      middleAge: 35, old: 50, venerable: 65, maxAgeModifier: "+2d10 years",
    },
    height: {
      male: { base: "6'6\"", modifier: "+2d8", weight: "200 lb.", weightModifier: "× (2d4) lb." },
      female: { base: "6'0\"", modifier: "+2d8", weight: "150 lb.", weightModifier: "× (2d4) lb." },
    },
  },
  {
    id: "frostburn-uldra",
    name: "Uldra",
    sourceBook: "Frostburn",
    sourcePages: "38-40",
    abilityModifiers: { str: -2, con: 2, wis: 2 },
    size: "Small",
    baseLandSpeedFeet: 20,
    levelAdjustment: 1,
    favoredClass: "Druid",
    automaticLanguages: ["Common", "Sylvan"],
    bonusLanguages: null,
    classSkills: ["Knowledge (nature)", "Speak Language"],
    traits: [
      { name: "Ability adjustments", text: "–2 Strength, +2 Constitution, +2 Wisdom. An uldra’s small size is more than compensated for by his vigor and faith in his convictions." },
      { name: "Small", text: "As a Small creature, an uldra gains a +1 size bonus to Armor Class, a +1 size bonus on attack rolls, and a +4 size bonus on Hide checks, but he uses smaller weapons than humans use, and his lifting and carrying limits are three-quarters of those of a Medium character." },
      { name: "Speed", text: "An uldra’s base land speed is 20 feet." },
      { name: "Darkvision", text: "Uldras can see in the dark up to 120 feet. Darkvision is black and white only, but it is otherwise like normal sight, and uldras can function just fine with no light at all." },
      { name: "Low-Light Vision", text: "An uldra can see twice as far as a human in starlight, moonlight, torchlight, and similar conditions of poor illumination. He retains the ability to distinguish color and detail under these conditions." },
      { name: "Nature Scholar (Ex)", text: "The Knowledge (nature) skill is always a class skill for uldras, and they gain a +2 racial bonus on all Knowledge (nature) checks." },
      { name: "Cold Resistance (Ex)", text: "Uldras are completely at home in freezing environments, and they suffer no harm from being in a cold environment. The uldra’s equipment is likewise protected. Against attacks that cause cold damage, an uldra possesses resistance to cold 5." },
      { name: "Frosty Touch (Su)", text: "Uldras are supernaturally cold, and as a free action they can infuse their hands with cold energy. While their hands are frosty, their unarmed attacks do an additional 1 point of cold damage. Any melee weapon an uldra wields is infused with cold and does an additional 1 point of cold damage on a successful hit as long as the uldra continues to hold the weapon. This additional damage does not stack with a magic weapon’s ability to deal cold damage (if any)." },
      { name: "Spell-Like Abilities", text: "3/day—ray of frost; 1/day—speak with animals, touch of fatigue. These abilities are as the spells cast by a druid or wizard (save DC 10 + spell level) of a level equal to the uldra’s Hit Dice. The DCs are Wisdom-based." },
      { name: "Fey Blood", text: "Uldras are fey, and as such they are not subject to spells that specifically target humanoids, such as charm person or hold person. Likewise, effects that affect fey affect uldras as well. They possess no particular weakness against cold iron, although they find it uncomfortable to the touch, similar to the sensation of holding a rotting fish in your hand." },
      { name: "Languages", text: "Automatic Languages: Common and Sylvan. Bonus Languages: All. Uldras are gifted linguists, and the Speak Language skill is always a class skill for them." },
      { name: "Favored Class", text: "Druid. A multiclass uldra’s druid class does not count when determining whether he takes an experience point penalty for multiclassing." },
      { name: "Level Adjustment", text: "+1." },
    ],
    age: {
      adulthoodYears: 100,
      startingAge: { barbarianRogueSorcerer: "+3d6", bardFighterPaladinRanger: "+5d6", clericDruidMonkWizard: "+8d6" },
      middleAge: 175, old: 263, venerable: 350, maxAgeModifier: "+5d% years",
    },
    height: {
      male: { base: "2'4\"", modifier: "+2d4", weight: "25 lb.", weightModifier: "× (1d4) lb." },
      female: { base: "2'2\"", modifier: "+2d4", weight: "20 lb.", weightModifier: "× (1d4) lb." },
    },
  },
];
