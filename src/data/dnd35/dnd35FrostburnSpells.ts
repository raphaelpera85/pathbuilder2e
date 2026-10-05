// ============================================================================
// D&D 3.5 — Frostburn: magias e poderes psiônicos (Cap. 5, pp. 88-112, inglês)
// Extraído da camada de texto do PDF. Os níveis de cada magia foram conferidos
// contra as listas por classe das pp. 83-86 (124 entradas, 0 divergências).
// Campos como impressos. "levels": classe (minúsculas, sem espaços) -> nível;
// domínios (Cold, Winter) aparecem como "cold" e "winter".
// Ainda não incluídas: as 5 magias épicas (Animus Blast, Animus Blizzard,
// Coldfire Blast, Dire Winter, Ice Age) e os itens mágicos (pp. 100+).
// ============================================================================

export interface Dnd35SupplementSpell {
  id: string;
  name: string;
  school: string;
  subschool: string | null;
  descriptors: string[];
  /** Linha de escola impressa, ex.: "Conjuration (Creation) [Cold]". */
  schoolLine: string;
  levels: Record<string, number>;
  levelLine: string;
  components?: string;
  castingTime?: string;
  range?: string;
  /** Rótulo impresso do alvo: Target, Targets, Area, Effect ou "Area or Target". */
  targetLabel?: string;
  target?: string;
  duration?: string;
  savingThrow?: string;
  spellResistance?: string;
  description: string;
}

export interface Dnd35SupplementPower {
  id: string;
  name: string;
  discipline: string;
  schoolLine: string;
  levels: Record<string, number>;
  levelLine: string;
  display: string;
  manifestingTime: string;
  range: string;
  targetLabel: string;
  target: string;
  duration: string;
  savingThrow: string;
  powerResistance: string;
  powerPoints: number;
  description: string;
}

export const DND35_FROSTBURN_SPELLS: Dnd35SupplementSpell[] = [
  {
    "id": "frostburn-algid-enhancement",
    "name": "Algid Enhancement",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 6
    },
    "levelLine": "Cleric 6",
    "components": "V, S, Coldfire",
    "castingTime": "1 round",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "24 hours",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "One cold creature/level",
    "description": "You energize cold creatures with a surge of coldfire. Creatures with the cold subtype affected by this spell gain a +1 deflection bonus to AC, +1d8 temporary hit points, a +1 enhancement bonus on attack rolls, and a +2 bonus on saving throws against fire effects. Each of these enhancements increases by +1 for every three caster levels. So a 12th-level caster grants a +5 deflection bonus to AC, an extra 1d8+4 temporary hit points, a +5 enhancement bonus on attack rolls, and a +6 resistance bonus on saving throws against fire effects. This spell has no effect on creatures not of the cold subtype.\n Coldfire Component: One ounce of coldfire."
  },
  {
    "id": "frostburn-animate-snow",
    "name": "Animate Snow",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "druid": 6
    },
    "levelLine": "Druid 6",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Up to a 20-ft. cube of snow",
    "description": "You imbue a mass of fallen snow with mobility and a semblance of life. The snow to be animated may be natural or magically created. Snow animated by this spell is treated as an animated object. You can animate four Large animated objects, two Huge animated objects, or one Gargantuan animated object. For details, see the Animated Object entry, page 13 of the Monster Manual. The animated snow can assume any basic shape you wish, and it attacks as directed by your vocal commands. Animated snow objects possess the Blind and Trample special attacks as detailed in the Monster Manual entry for animated objects. In addition, they have the cold subtype, and do an additional 1d6 points of cold damage on a successful hit. Animated snow objects take 1d6 points of damage each round if they exist in a place with temperatures above freezing.\n Material Component: Meltwater from a glacier."
  },
  {
    "id": "frostburn-anticold-sphere",
    "name": "Anticold Sphere",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "sorcerer/wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "10 ft.",
    "duration": "10 min./level (D)",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "10-ft.-radius emanation, centered on you",
    "description": "You bring into being a mobile, spherical energy field that protects against cold. All creatures within the area of the spell are granted immunity to cold. In addition, the sphere prevents the entrance of any creature with the cold subtype. The effect hedges out such creatures in the area when it is cast. This spell may be used only defensively, not aggressively. Forcing an abjuration barrier against creatures that the spell keeps at bay collapses the barrier (see Abjuration, page 172 of the Player’s Handbook)."
  },
  {
    "id": "frostburn-arctic-haze",
    "name": "Arctic Haze",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 3,
      "sorcerer/wizard": 3
    },
    "levelLine": "Druid 3, sorcerer/wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "10 min./level",
    "savingThrow": "Fortitude half",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Fog spreads in a 30-ft. radius, 20 ft. high",
    "description": "A bank of fog composed entirely of tiny, razor-sharp ice shards billows out from the targeted point. The fog obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker can’t use sight to locate the target). In addition, the sharp ice particles tear the skin of those moving through the area, causing 4 points of damage per round, half of which is cold damage. A strong wind (21+ mph) disperses the fog in 4 rounds; a severe wind (31+ mph) disperses the fog in 1 round. Dispersing the fog in this manner, however, causes damage to those within its area as the icy shards whip past. A strong wind causes 4 points of damage per round (half cold); a severe wind causes 8 points of damage (half cold)."
  },
  {
    "id": "frostburn-aura-of-cold-greater",
    "name": "Aura of Cold, Greater",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 7,
      "druid": 7
    },
    "levelLine": "Cleric 7, druid 7",
    "range": "10 ft.",
    "targetLabel": "Area",
    "target": "10-ft.-radius spherical emanation, centered on you",
    "description": "This spell functions exactly like lesser aura of cold, except it deals 2d6 points of cold damage to all creatures within 10 feet."
  },
  {
    "id": "frostburn-aura-of-cold-lesser",
    "name": "Aura of Cold, Lesser",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 3,
      "druid": 3,
      "paladin": 4,
      "ranger": 4
    },
    "levelLine": "Cleric 3, druid 3, paladin 4, ranger 4",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "5 ft.",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "5-ft.-radius spherical emanation, centered on you",
    "description": "You are covered in a thin layer of white frost and frigid cold emanates from your body, dealing 1d6 points of cold damage at the start of your round to each creature within 5 feet."
  },
  {
    "id": "frostburn-binding-snow",
    "name": "Binding Snow",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 3,
      "druid": 3,
      "paladin": 3,
      "ranger": 3
    },
    "levelLine": "Cleric 3, druid 3, paladin 3, ranger 3",
    "components": "V, S, DF, Frostfell",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 hour/level (D)",
    "savingThrow": "Reflex negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "One 10-ft. square/level",
    "description": "This spell must be cast on a snow field. That snow field instantly freezes, impeding movement through the area. A creature caught within the area can move only at half its normal speed. By making a DC 20 Strength check or a DC 25 Escape Artist check, the creature can move at its normal speed for that round. A creature that succeeds on a Reflex save is not impeded."
  },
  {
    "id": "frostburn-blizzard",
    "name": "Blizzard",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "druid": 5,
      "winter": 5
    },
    "levelLine": "Druid 5, Winter 5",
    "components": "V, S",
    "castingTime": "1 round",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude partial",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "100 ft.-radius/level spread",
    "description": "Immediately upon completion of this spell, the temperature drops to below freezing and a powerful blizzard erupts in the area. Visibility is reduced to zero, making Spot, Search, and Listen checks and all ranged attacks impossible. Unprotected flames are automatically extinguished and protected flames have a 75% chance of being doused. Creatures unprotected from the cold must make a Fortitude save or take 1d6 points of nonlethal cold damage. One foot of new snow falls each round. Movement within the area is impeded, depending on the creature’s size and depth of snow (for movement in a snow field, see page 12)."
  },
  {
    "id": "frostburn-blood-snow",
    "name": "Blood Snow",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 2, druid 2, sorcerer/ wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "20-ft. square of snow/level",
    "description": "You must cast this spell on a snow field. You corrupt an area of fallen snow, imbuing it with negative energy. Each round, a creature in contact with blood snow must succeed on a Fortitude save or take 1d2 points of Constitution drain. In addition, anyone failing a saving throw is nauseated for the duration of the spell."
  },
  {
    "id": "frostburn-bone-chill",
    "name": "Bone Chill",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Necromancy",
    "levels": {
      "sorcerer/wizard": 2
    },
    "levelLine": "Sorcerer/wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Ray",
    "description": "A ray of burning cold erupts from your fingertips. Corporeal undead struck by the ray are covered in a layer of ice, rendering the subject immobile as if held. Each round on its turn, the subject may attempt a new saving throw to break free of the ice. (This is a full-round action that does not provoke attacks of opportunity.)\n Material Component: A small piece of bone and a 1-inch cube of ice."
  },
  {
    "id": "frostburn-boreal-wind",
    "name": "Boreal Wind",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "bard": 5,
      "cleric": 5,
      "druid": 4,
      "sorcerer/wizard": 5
    },
    "levelLine": "Bard 5, cleric 5, druid 4, sorcerer/ wizard 5",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "1 round + 1 round/2 levels",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Effect",
    "target": "Gust of wind (20 ft. wide, 20 ft. high) emanating out from you to the extreme of the range",
    "description": "You create a strong blast of arctic air that originates from your fingertips and moves in the direction you are facing. As a stronger form of gust of wind, this boreal wind automatically extinguishes candles, torches, and similar protected or unprotected flames, including lanterns. Large fires (such as bonfires, a blacksmith’s coals, or even a house fire) have a 50% chance to be extinguished by the boreal wind. Forest or grassland fires are too large to be extinguished by this spell. All creatures caught in the area take 1d4 points of cold damage per caster level (maximum 15d4). A successful Fortitude saving throw negates the gust’s effects. Those that fail the save are pushed away from the caster a distance of 3 feet per caster level. Creatures that remain in the area past the first round must make an additional saving throw each round. A boreal wind can do anything a sudden blast of wind would be expected to do. It can create a stinging spray of sand or dust, overturn tents and blow down small huts, scuttle a small boat, and blow gases or vapors to the edge of the range. The wind can change direction if you actively direct it (a move action for you); otherwise, it merely blows in the same direction."
  },
  {
    "id": "frostburn-brumal-stiffening",
    "name": "Brumal Stiffening",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Cleric 2, druid 2, sorcerer/ wizard 2",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Reflex negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One weapon",
    "description": "The targeted weapon becomes brittle, reducing its hardness by 5 for the duration of the spell, thereby increasing Brumal stiffening the effectiveness of sunder attempts against the weapon. In addition, rolling a 1 on an attack with the targeted weapon causes it to take damage equivalent to the amount it would have dealt on a successful hit."
  },
  {
    "id": "frostburn-call-avalanche",
    "name": "Call Avalanche",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "druid": 5
    },
    "levelLine": "Druid 5",
    "components": "V, S",
    "castingTime": "1 round",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "Reflex half; see text",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10 ft.-radius/level spread",
    "description": "This spell may only be cast outside. Immediately upon completion of the spell, an avalanche of ice and snow falls out of the sky, dealing 8d6 points of crushing damage and potentially burying Large or smaller creatures within the area. Creatures making their Reflex saving throws take half damage and are not buried. Those that fail their saves are buried and take an additional 1d6 points of nonlethal damage per minute while still buried. If such a creature falls unconscious while buried, it must make a DC 15 Constitution check. If that check fails, it takes 1d6 points of lethal damage each minute thereafter until freed or dead. The ice and snow remains until melted by natural or unnatural means. A rapid melting of the ice and snow could cause a flash flood (see Freezing and Thawing, page 10). A 9th-level caster buries Large or smaller creatures. At 12th level, the maximum size of a creature increases to Huge. At 15th, Gargantuan creatures are also buried, and at 18th level, a creature of up to Colossal size is buried by the snow."
  },
  {
    "id": "frostburn-column-of-ice",
    "name": "Column of Ice",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 3,
      "sorcerer/wizard": 4
    },
    "levelLine": "Druid 3, sorcerer/wizard 4",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Permanent",
    "savingThrow": "Reflex negates",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One column of ice, 10-ft. radius and 5 ft./level in height",
    "description": "A column of ice rises from the ground, lifting any object or creature (including you) standing in the area into the air. Creatures making a Reflex saving throw can choose to avoid the column. Moving or fighting atop the ice column requires a DC 10 Balance check. Those who fail fall prone and must immediately succeed on a DC 12 Reflex saving throw or slip off the column, taking commensurate falling damage. Creatures atop the column as it rises may be smashed against the ceiling or other overhead obstructions, which deals 4d6 points of damage. Magical Ice Column: 10 feet thick; hardness 16; hp 160; break DC 90; Climb DC 30. Arcane Material Component: A 2-inch rod of ice."
  },
  {
    "id": "frostburn-cometstrike",
    "name": "Cometstrike",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 9
    },
    "levelLine": "Druid 9",
    "components": "V, DF",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "3 rounds",
    "savingThrow": "Reflex partial",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Three different creatures or objects",
    "description": "This spell may only be cast in an outdoor area; it fails if cast indoors or underground. When you cast this spell, you cause three frozen comets to strike down upon any three different creatures or objects in range. You must make a ranged touch attack to hit each target. Each target struck takes 3d6 points of bludgeoning damage and 1d4 points of cold damage per level (maximum 10d4), and is stunned for one round. A successful Reflex save negates the bludgeoning damage and the stunning effects, but not the cold damage. Each round the spell persists, another three frozen comets rain down upon the original three targets; as a standard action you can select new targets for one, two, or all three comets."
  },
  {
    "id": "frostburn-conjure-ice-beast-i",
    "name": "Conjure Ice Beast I",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 1,
      "druid": 1,
      "ranger": 1
    },
    "levelLine": "Cleric 1, druid 1, ranger 1",
    "components": "V, S, DF",
    "castingTime": "1 round",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One conjured ice creature",
    "description": "This spell creates a creature constructed from magical ice. It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions. The spell conjures one of the creatures from the 1st-level list of either the summon monster table or the summon nature’s ally table (pages 287–288 of the Player’s Handbook). The conjured creature cannot have the fire subtype. You choose which kind of creature to conjure, and you can change that choice each time you cast the spell. The conjured creature is a construct made of magical ice, gaining the ice beast template (see page 138). In all other ways, conjure ice beast I functions like summon monster I."
  },
  {
    "id": "frostburn-conjure-ice-beast-ii",
    "name": "Conjure Ice Beast II",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "ranger": 2
    },
    "levelLine": "Cleric 2, druid 2, ranger 2",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 2nd-level list or two creatures of the same kind from the 1st-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-iii",
    "name": "Conjure Ice Beast III",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 3,
      "druid": 3,
      "ranger": 3
    },
    "levelLine": "Cleric 3, druid 3, ranger 3",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 3rd-level list, two creatures of the same kind from the 2nd-level list, or four creatures of the same kind from the 1st-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-iv",
    "name": "Conjure Ice Beast IV",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 4,
      "druid": 4,
      "ranger": 4
    },
    "levelLine": "Cleric 4, druid 4, ranger 4",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 4th-level list, two creatures of the same kind from the 3rd-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-v",
    "name": "Conjure Ice Beast V",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 5,
      "druid": 5
    },
    "levelLine": "Cleric 5, druid 5",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 5th-level list, two creatures of the same kind from the 4th-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-vi",
    "name": "Conjure Ice Beast VI",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 6,
      "druid": 6
    },
    "levelLine": "Cleric 6, druid 6",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 6th-level list, two creatures of the same kind from the 5th-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-vii",
    "name": "Conjure Ice Beast VII",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 7,
      "druid": 7
    },
    "levelLine": "Cleric 7, druid 7",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 7th-level list, two creatures of the same kind from the 6th-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-viii",
    "name": "Conjure Ice Beast VIII",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 8,
      "druid": 8
    },
    "levelLine": "Cleric 8, druid 8",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 8th-level list, two creatures of the same kind from the 7th-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-beast-ix",
    "name": "Conjure Ice Beast IX",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 9,
      "druid": 9
    },
    "levelLine": "Cleric 9, druid 9",
    "targetLabel": "Effect",
    "target": "One or more conjured ice creatures, no two of which can be more than 30 ft. apart",
    "description": "This spell functions like conjure ice beast I, except that you can conjure one creature from the 9th-level list, two creatures of the same kind from the 8th-level list, or four creatures of the same kind from a lower-level list."
  },
  {
    "id": "frostburn-conjure-ice-object",
    "name": "Conjure Ice Object",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2
    },
    "levelLine": "Cleric 2, druid 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "1 min./level",
    "savingThrow": "None (harmless)",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One object of up to 5 lb./level",
    "description": "You conjure into being a block of transparent ice in the shape of any object you have seen at least once before, up to the weight limit (to a maximum of 50 pounds at 10th level). Any object with moving parts does not function (for example, a crossbow). You must succeed on an appropriate Craft check to make a complex item."
  },
  {
    "id": "frostburn-control-snow-and-ice",
    "name": "Control Snow and Ice",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 3
    },
    "levelLine": "Cleric 3",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "10 min./level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Ice and snow in a volume of 10 ft./level by 10 ft./level by 2 ft./level (S)",
    "description": "Depending on the version you choose, the control snow and ice spell raises or lowers ice or snow. Lower Snow and Ice: This causes snow and ice to sink away to a minimum depth of 1 inch. The depth can be lowered by up to 2 feet per caster level. The snow and ice is lowered within a squarish depression whose sides are up to 10 feet long per caster level. In extremely large and deep snow and ice fields, such as a glacier, the spell creates a crevasse that sweeps creatures downward (without dealing damage), rendering them unable to leave by normal movement for the duration of the spell. They can climb out of a crevasse, as normal with a DC 18 Climb check. When cast on ice elementals and other ice-based creatures, this spell acts as a slow spell. The spell has no effect on other creatures. Raise Snow and Ice: This causes snow and ice to rise in height, just as the lower snow and ice version causes it to lower. Creatures and objects on top of the snow or ice are raised along with the top level of snow. For either version, the character may reduce one horizontal dimension by half and double the other horizontal dimension."
  },
  {
    "id": "frostburn-control-temperature",
    "name": "Control Temperature",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold",
      "Fire"
    ],
    "schoolLine": "Transmutation [Cold, Fire]",
    "levels": {
      "druid": 3,
      "sorcerer/wizard": 3
    },
    "levelLine": "Druid 3, sorcerer/wizard 3",
    "components": "V, S, M/DF",
    "castingTime": "1 round",
    "range": "20 ft./level",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "20 cu. ft./level emanation, centered on you",
    "description": "You imbue an area with cold or fire energy, reducing or raising the temperature by one temperature band per five caster levels. Effects of the new temperature on creatures and the environment are incurred immediately (see Cold Dangers, page 8 of this book, and Heat Dangers, page 303 of the Dungeon Master’s Guide). Arcane Material Component: A drop of mercury."
  },
  {
    "id": "frostburn-crack-ice",
    "name": "Crack Ice",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Force"
    ],
    "schoolLine": "Evocation [Force]",
    "levels": {
      "sorcerer/wizard": 3
    },
    "levelLine": "Sorcerer/wizard 3",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half (see text)",
    "spellResistance": "Yes (creature only)",
    "targetLabel": "Area or Target",
    "target": "10-ft.-radius/level spread; or one ice creature",
    "description": "You create a sudden explosive burst that shatters ice bridges, breaks up river ice, opens frozen ponds, or damages an icy creature. The ice broken covers a 10-foot radius per caster level, and a 1-foot depth per level. Ice thicker than the spell’s depth is cracked and weakened, but not broken all the way through. Weakened ice is treated as one category thinner than it really is (see Table 1–2, page 11). Creatures dropped from a bridge, through lake or river ice, or off a glacier or iceberg take normal falling and cold water damage. Creatures on a glacier will have a crevasse open under them equal to the depth of the spell. Targeted against an ice creature of any weight (such as an ice golem, winterspawn, or entombed), crack ice deals 1d6 points of damage per caster level (maximum 10d6), with a Fortitude save for half damage.\n Material Component: A hammer carved from salt crystal (50 gp)."
  },
  {
    "id": "frostburn-crunchy-snow",
    "name": "Crunchy Snow",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "druid": 1,
      "ranger": 1
    },
    "levelLine": "Druid 1, ranger 1",
    "components": "V, S, Frostfell",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "One 20-ft.-by-20-ft. square of snow/level",
    "description": "An area of fallen snow designated by you becomes hard and crumbly, generating a loud crunch when stepped upon. Creatures take a –20 penalty on Move Silently checks when traveling through crunchy snow."
  },
  {
    "id": "frostburn-death-hail",
    "name": "Death Hail",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold",
      "Death"
    ],
    "schoolLine": "Conjuration (Creation) [Cold, Death]",
    "levels": {
      "druid": 6,
      "winter": 6
    },
    "levelLine": "Druid 6, Winter 6",
    "components": "V, S, DF",
    "castingTime": "1 round",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude half",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Cylinder (40-ft radius, 20 ft. high)",
    "description": "You call into being an intense storm of death hail in the area you designate. Creatures in the area must succeed on a Fortitude save or take 1d2 points of Strength and Constitution damage."
  },
  {
    "id": "frostburn-defile-snow-and-ice",
    "name": "Defile Snow and Ice",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold",
      "Evil"
    ],
    "schoolLine": "Evocation [Cold, Evil]",
    "levels": {
      "cleric": 3
    },
    "levelLine": "Cleric 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./ level)",
    "duration": "1 min./level",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "10 ft./level radius spread",
    "description": "You imbue an area of ice or fallen snow with negative energy, granting all undead within the area a +4 profane bonus against turning attempts. In addition, all cold creatures gain spell resistance 15 against fire effects."
  },
  {
    "id": "frostburn-detect-fire",
    "name": "Detect Fire",
    "school": "Divination",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Divination [Cold]",
    "levels": {
      "cleric": 1
    },
    "levelLine": "Cleric 1",
    "description": "This spell functions like detect evil (see page 218 of the Player’s Handbook), except that it detects heat energy from normal fire, fire spells, fire magic items, clerics of fire deities, and all living beings other than those with the cold subtype. You are vulnerable to an overwhelming heat aura if you have the cold subtype. Living beings without the fire subtype are detected with a heat aura strength of faint only, regardless of level or Hit Dice."
  },
  {
    "id": "frostburn-dispel-cold",
    "name": "Dispel Cold",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Fire"
    ],
    "schoolLine": "Abjuration [Fire]",
    "levels": {
      "cleric": 5
    },
    "levelLine": "Cleric 5",
    "description": "This spell functions like dispel evil (see page 222 of the Player’s Handbook), except that you are surrounded by constant, blue-white cold energy, and the spell affects cold creatures and spells rather than evil ones."
  },
  {
    "id": "frostburn-dispel-fire",
    "name": "Dispel Fire",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Abjuration [Cold]",
    "levels": {
      "cleric": 5
    },
    "levelLine": "Cleric 5",
    "description": "This spell functions like dispel evil (see page 222 of the Player’s Handbook), except that you are surrounded by constant red, orange, and yellow flames, and the spell affects fire creatures and spells rather than evil ones."
  },
  {
    "id": "frostburn-ease-of-breath",
    "name": "Ease of Breath",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 1,
      "druid": 1,
      "ranger": 1
    },
    "levelLine": "Cleric 1, druid 1, ranger 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "You grant the target the ability to survive in thin air, conferring a +20 inherent bonus on Fortitude saves to resist altitude sickness as well as saving throws to resist becoming fatigued due to altitude or thin air."
  },
  {
    "id": "frostburn-entomb",
    "name": "Entomb",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "druid": 6,
      "sorcerer/wizard": 6
    },
    "levelLine": "Druid 6, sorcerer/wizard 6",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous and 1 round/ level; see text",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "One creature/level, no two of which can be more than 30 ft. apart",
    "description": "An entomb spell traps living creatures in a block of ice, suffocating them. The spell entraps the targets with a thick layer of ice from head to toe. Those that make a successful Fortitude saving throw can shake off the ice immediately, though they still take 6d6 points of cold damage. If the creature fails its saving throw, it is held within the ice and immediately begins to suffocate per the drowning rules (see page 304 of the Dungeon Master’s Guide). In addition, the creature takes 2d12 points of cold damage and 1 point of Constitution damage per round from contact with the ice. Other than attempting to escape, creatures entombed can perform actions that only require mental or verbal activity. Escaping from the ice block requires a DC 20 Strength check or the application of 20 points of fire damage.\n Material Component: A clear gemstone with a minimum value of 500 gp."
  },
  {
    "id": "frostburn-evergreen",
    "name": "Evergreen",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Fire"
    ],
    "schoolLine": "Transmutation [Fire]",
    "levels": {
      "druid": 2
    },
    "levelLine": "Druid 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 hour/level and instantaneous; see text",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft. radius",
    "description": "You imbue a 10-foot-radius area of plant life with magical heat, instantly healing 1d8 points of damage +1 point per caster level (maximum +10), and granting immunity to cold for the duration of the spell. Evergreen affects natural plants as well as creatures with the plant subtype."
  },
  {
    "id": "frostburn-fimbulwinter",
    "name": "Fimbulwinter",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 9,
      "druid": 8,
      "sorcerer/wizard": 8,
      "winter": 9
    },
    "levelLine": "Cleric 9, druid 8, sorcerer/ wizard 8, Winter 9",
    "components": "V, S, XP",
    "castingTime": "10 minutes (see text)",
    "range": "1 mile/level",
    "duration": "4d12 weeks",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "1 mile/level radius, centered on you",
    "description": "You change the weather to a state of permanent winter, or strengthen winter conditions already present. It takes 10 minutes to cast the spell and an additional 10 minutes for the effects to manifest themselves. The current, natural weather conditions are determined by the DM. You then choose what wintry conditions you want to manifest; the strength of the winter depends on the existing climate and season of the area. Season Possible Weather Spring Frequent snowfall, nightly frost Summer Light snow, hailstorms, cold rain, cloudy Autumn Frequent snowfall, frost Winter Frigid cold, blizzard, and constant snowfall Daily wind and snowfall during a fimbulwinter are determined using the table below. Add +8 to the roll when cast during winter, +4 in spring or autumn, –2 in summer, +2 for a cold climate, –2 for temperate climate, and –6 for hot climate. Roll separately for wind and snow. The snow and wind shown are the maximum possible for the day; at your option, there can be less wind or snow. Fimbulwinter d20 Roll Amount of Snowfall Amount of Wind 0 or less 1d12 inches of snowfall melt Weak (0–10 mph) 1–5 No new snow Weak (0–10 mph) 6–10 1d4–1 inches snow Moderate (11+ mph) 11–15 1d8 inches snow or 1 inch hail Moderate (11+ mph) 16–20 1d12 inches snow Strong (21+ mph) 21–25 2d12+4 inches snow Strong (21+ mph) 26+ 1d6+1 feet of snow Very strong (31+ mph) You control the general tendencies of the weather, such as the direction and intensity of the wind. When you select a certain weather condition to occur, the weather assumes that condition 10 minutes later (changing gradually, not abruptly). The weather continues as you left it for the duration, or until you use a standard action to designate a new kind of weather (which fully manifests itself 10 minutes later). XP Cost: 100 XP."
  },
  {
    "id": "frostburn-flash-freeze",
    "name": "Flash-Freeze",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Earth",
      "Cold"
    ],
    "schoolLine": "Transmutation [Earth, Cold]",
    "levels": {
      "druid": 2
    },
    "levelLine": "Druid 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft. square/level",
    "description": "All earth, stone, and water in the spell’s area is drained of heat. Earth, mud, and stone become everfrost and water freezes. You affect a 10-foot-square area to a depth of 1 foot. Magical, enchanted, dressed, or worked stone cannot be affected. Earth, stone, or water creatures are not affected. This spell can be used to create small icebergs in large bodies of water. These icebergs float, but are extremely slippery and unstable, requiring a DC 15 Balance check per round to stay on the iceberg. Icebergs may be propelled through the water by the current, paddling, or other means."
  },
  {
    "id": "frostburn-flesh-to-ice",
    "name": "Flesh to Ice",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "sorcerer/wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "The subject, along with all its carried gear, turns into a mindless, inert ice sculpture. If the sculpture resulting from this spell is broken, melted, or damaged, the subject (if ever returned to its original state) has similar damage or deformities. The creature is not dead, but it does not seem to be alive either when viewed with spells such as deathwatch. Only creatures made of flesh are affected by this spell.\n Material Component: Water and a drop of blood."
  },
  {
    "id": "frostburn-float",
    "name": "Float",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "sorcerer/wizard": 1
    },
    "levelLine": "Sorcerer/wizard 1",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "1 min./level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One Large or smaller creature or object",
    "description": "The target gains buoyancy and can float on water for the duration of the spell. It cannot swim below the surface of the water. Creatures that must breathe water can still do so, but cannot swim under the surface. If the target is underwater at the time this spell is cast, it rises toward the surface at a speed of 30 feet.\n Material Component: An ice cube dropped into water."
  },
  {
    "id": "frostburn-fortify-cold-creatures",
    "name": "Fortify Cold Creatures",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 1
    },
    "levelLine": "Cleric 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "One creature/level, no two of which can be more than 30 ft. apart",
    "description": "Creatures with the cold subtype gain a +1 sacred bonus on all attack rolls and on saving throws against fire effects."
  },
  {
    "id": "frostburn-freeze-armor",
    "name": "Freeze Armor",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 4,
      "druid": 4
    },
    "levelLine": "Cleric 4, druid 4",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude partial; see text",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Metal equipment of one creature/level",
    "description": "Freeze armor locks suits of metal armor and equipment into a layer of ice and extreme cold, immobilizing and damaging the armor’s wearers. Unattended, nonmagical metal gets no saving throw. Enchanted metal is allowed a saving throw against the spell. An item in a creature’s possession uses the creature’s saving throw (unless its own is higher). A creature wearing metal armor that fails its save is frozen in place. The spell locks the armor’s joints and seams in inches of solid ice. The frozen creature takes the damage listed below. In addition, it suffers a –6 penalty on attack rolls, a –8 penalty to effective Dexterity, and can’t move. A frozen character who attempts to cast a spell must make a Concentration check (DC 15 + level of spell being cast) or lose the spell. A creature wearing metal armor that makes its save takes half the damage listed below. A creature not wearing metal armor that fails its save takes the damage listed below if its armor is affected or if it is holding, touching, wearing, or carrying metal weighing one-fifth of its weight. The creature takes minimum damage (1, 2, 3, or 4 points; see the table) each round if it is not wearing metal armor or the metal that it is carrying weighs less than one-fifth of the creature’s weight. A creature not wearing or carrying metal less than one-fifth of its weight that makes its save is entirely unaffected by freeze armor. Freeze Armor Damage Round Temperature Cold Damage 1 Cold 1d6 points 2 Icy 2d6 points 3–5 Freezing 3d6 points 6+ Lethal 4d6 points Any heat intense enough to damage the creature negates cold damage from the spell (and vice versa) on a point-for-point basis. For example, if the damage from a freeze armor spell indicates 5 points of cold damage and the creature plunges through a wall of fire in the same round and takes 8 points of fire damage, it winds up taking no cold damage and only 3 points of fire damage."
  },
  {
    "id": "frostburn-freezing-glance",
    "name": "Freezing Glance",
    "school": "Enchantment",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Enchantment [Cold]",
    "levels": {
      "sorcerer/wizard": 6
    },
    "levelLine": "Sorcerer/wizard 6",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level; see text",
    "savingThrow": "Will negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One living creature",
    "description": "Your eyes become wintry tombs that destroy the spark of life in those who you meet your stare. Each round you may target a single living creature. It must make a Will saving throw or be frozen in place. Frozen creatures cannot move, attack, cast spells, or defend themselves; they are considered immobile, losing shield and Dexterity bonuses to Armor Class and taking a further –4 penalty to Armor Class. Frozen creatures are entitled to an additional saving throw if attacked, but this provides no immunity to the gaze. A creature that has been immobilizing with a freezing glance, then restored to motion after an attack, can still be the target of the same freezing glance in a later round. Though the gaze attack ends rather quickly, frozen creatures remain immobile for 1 minute per level. In some cases, this can cause serious damage through exposure to the elements."
  },
  {
    "id": "frostburn-frost-weapon",
    "name": "Frost Weapon",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Cleric 2, druid 2, sorcerer/ wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 round/level",
    "savingThrow": "Will negates (harmless, object)",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Weapon touched",
    "description": "You imbue a weapon with icy cold, granting it a power similar to the frost special ability. A frost weapon deals an extra 1d6 points of cold damage on a successful hit. If cast on a bow, crossbow, or sling, the spell bestows the cold energy upon the weapon’s ammunition. This ability stacks with the frost special ability, but not with itself.\n Material Component: A drop of water."
  },
  {
    "id": "frostburn-frostbite",
    "name": "Frostbite",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 5
    },
    "levelLine": "Cleric 5",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature/2 levels, no two of which can be more than 30 ft. apart",
    "description": "You chill the air and create a layer of frost on the skin of target creatures. The targets are entitled to a Fortitude save; those who fail take 6d6 points of cold damage and 2d6 points of Dexterity damage. Creatures dropping to 0 Dexterity are frozen in a layer of ice, shivering and unable to attack, move, or defend."
  },
  {
    "id": "frostburn-frostburn",
    "name": "Frostburn",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 4
    },
    "levelLine": "Cleric 4",
    "description": "This spell functions like lesser frostburn, except that it deals 3d12 points of frostburn damage +1 point per caster level (maximum +20)."
  },
  {
    "id": "frostburn-frostburn-lesser",
    "name": "Frostburn, Lesser",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 2
    },
    "levelLine": "Cleric 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "When laying your hand upon a creature, you channel cold energy that deals 1d12 points of frostburn damage +1 point per caster level (maximum +5). When cast upon a cold subtype creature, this spell heals a like amount of damage, rather than harming it."
  },
  {
    "id": "frostburn-frostburn-mass",
    "name": "Frostburn, Mass",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 6
    },
    "levelLine": "Cleric 6",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature/level, no two of which can be more than 30 ft. apart",
    "description": "Cold energy spreads out in all directions from the point of origin, dealing 3d12 points of frostburn damage +1 point per caster level (maximum +20) to nearby enemies. Like other frostburn spells, mass frostburn cures cold subtype creatures in its area rather than damaging them."
  },
  {
    "id": "frostburn-frostfell",
    "name": "Frostfell",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "druid": 8,
      "sorcerer/wizard": 9
    },
    "levelLine": "Druid 8, sorcerer/wizard 9",
    "components": "V, S, M/DF",
    "castingTime": "1 round",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 hour/level",
    "savingThrow": "Fortitude partial; see text",
    "spellResistance": "See text",
    "targetLabel": "Area",
    "target": "20-ft. cube/level",
    "description": "The area you designate becomes a frigid and icy environment, immediately dropping the temperature by 3 temperature bands. For example, if the temperature is moderate, it drops to extreme cold (see page 9). If the new temperature is below the cold band, all water is turned to ice and all earth and stone becomes everfrost to a depth of 10 feet per caster level. Air within the area freezes, resulting in a heavy snowstorm lasting for the duration of the spell. Snow accumulates only if the ground temperature is below the moderate band. Living creatures caught within the area when the spell is cast instantly turn to ice (as per the flesh to ice spell). If a creature successfully saves, frostfell deals 1d6 points of frostburn damage per caster level (maximum 20d6). Creatures entering the area after the spell has been cast do not take this damage; however, all creatures in the area are subject to the normal effects of cold, snow, and ice for the duration of the spell. Objects in the area, including those held by creatures, are instantly covered in a thin layer of frost, making them slippery. When a creature uses a frosted item (a weapon, lockpicks, a potion, and so on), it must succeed on a DC 10 Dexterity check or it drops the item before it can be used. Cold spells cast within the area gain a +1 caster level. Multiple frostfells may be cast in the same area to increase the effects (dropping the temperature by an additional 3 bands). The temperature band cannot be dropped below unearthly cold, no matter how many times frostfell has been cast. Arcane Material Component: A pinch of dust and a few drops of water."
  },
  {
    "id": "frostburn-frostfell-slide",
    "name": "Frostfell Slide",
    "school": "Conjuration",
    "subschool": "Teleportation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Teleportation) [Cold]",
    "levels": {
      "druid": 4,
      "ranger": 4
    },
    "levelLine": "Druid 4, ranger 4",
    "components": "V, S, DF, Frostfell",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "1 hour/level or until expended; see text",
    "targetLabel": "Target",
    "target": "You",
    "description": "You gain the ability to instantly teleport from one area of slush, snow, or ice to any other area of slush, snow, or ice up to the distance indicated on the table below. Transport distance is based upon the substance touched at the point of departure, not at the point of arrival. You may wait to travel in this manner up to the duration of the spell, holding the charge, but immediately upon arriving at the destination point, the spell ends. Type of Area Transport Distance Slush 1,000 feet Snow 2,000 feet Ice 3,000 feet"
  },
  {
    "id": "frostburn-gelid-blood",
    "name": "Gelid Blood",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "sorcerer/wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude partial",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "Cold energy surges through the target’s body, congealing the blood in the creature’s extremities. This effect causes a –4 penalty on attacks, Armor Class, and all Strengthand Dexterity-related checks, and anyone casting a spell with a somatic component has a 50% chance of spell failure for the duration of the spell. If the target makes its Fortitude save, the creature only takes a –2 penalty on attacks, Armor Class, and all Strengthand Dexterity-related checks and has only a 25% chance of spell failure for spells with a somatic component.\n Material Component: A pinch of flour."
  },
  {
    "id": "frostburn-glacial-globe-of-invulnerability",
    "name": "Glacial Globe of Invulnerability",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Abjuration [Cold]",
    "levels": {
      "cleric": 4,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 4, sorcerer/wizard 3",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "10 ft.",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft.-radius spherical emanation, centered on you",
    "description": "A frosty sphere of cold energy surrounds you and excludes all spells and spell-like abilities with the fire descriptor of 3rd level or lower. This spell functions like globe of invulnerability, except that it affects only fire spells. In addition, the frosty opaqueness of the globe grants concealment (20% miss chance) to those within the area against attacks from outside. Likewise, targets outside the globe gain concealment against attacks from those within the spell’s area. Arcane Material Component: A tiny sphere of ice that shatters at the expiration of the spell."
  },
  {
    "id": "frostburn-glacial-ward-greater",
    "name": "Glacial Ward, Greater",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Abjuration [Cold]",
    "levels": {
      "sorcerer/wizard": 7
    },
    "levelLine": "Sorcerer/wizard 7",
    "components": "V, S, M, Coldfire",
    "castingTime": "1 standard action",
    "range": "10 ft.",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft.-radius spherical emanation, centered on you",
    "description": "A 10-foot-radius globe of swirling coldfire surrounds you, granting you and anyone inside the globe spell resistance 25 against all fire spells and spell-like effects. In addition, any creature using a fire-based supernatural ability on a target inside the globe (such as a breath weapon) must also make a caster level check to affect the target. The globe does not offer protection against natural heat and fire, including immersion in lava.\n Material Component: A pinch of sulfur.\n Coldfire Component: One ounce of coldfire."
  },
  {
    "id": "frostburn-glacial-ward",
    "name": "Glacial Ward",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Abjuration [Cold]",
    "levels": {
      "sorcerer/wizard": 4
    },
    "levelLine": "Sorcerer/wizard 4",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 min./level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "A faint, shimmering reddish energy encases the subject’s body, granting spell resistance 18 against fire spells and spell-like abilities. In addition, any creature using a fire-based supernatural ability on the subject (such as a breath weapon) must succeed on a DC 18 level check (1d20 + level or HD) to affect a creature warded by this spell.\n Material Component: A pinch of sulfur."
  },
  {
    "id": "frostburn-glacier",
    "name": "Glacier",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 8
    },
    "levelLine": "Druid 8",
    "components": "V, S, DF",
    "castingTime": "1 round",
    "range": "Close (25 ft. + 5 ft./2 levels); see text",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One 20-ft. cube/2 levels",
    "description": "When you cast this spell, you bring into existence 20-foot cubes of animated glacial ice (one per two caster levels, to a maximum of ten glaciers at 20th level), which need not appear adjacent to one another, but must be placed on a horizontal surface. Glaciers placed in the air or on nonhorizontal surfaces do not appear, but are deducted from the number of glaciers the caster may conjure. The glaciers remain stationary unless commanded, attacking any creatures within 5 feet with a +15 slam attack that deals 2d8+4 points of damage, plus 3d6 points of cold damage. As a standard action, you may command any number of glaciers to move at a speed of 10 feet. You cannot command any glacier to move more than 100 feet away from you, and if you move more than 100 feet from any glacier, that glacier remains stationary, attacking any creatures in its area (but it can be commanded again if you move with in 100 feet). A glacier has 20 hit points per caster level and a hardness of 0. Creatures can hit the glacier automatically. Fire, including a fireball spell and red dragon breath, can melt a glacier, and it deals full damage to the ice (instead of the normal half damage taken by objects). Suddenly melting a glacier creates a great cloud of steamy fog that lasts for 10 minutes."
  },
  {
    "id": "frostburn-glaze-lock",
    "name": "Glaze Lock",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "sorcerer/wizard": 1
    },
    "levelLine": "Sorcerer/wizard 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "10 min./level; see text",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Lock touched",
    "description": "You jam a locking mechanism with ice, raising its Open Lock DC by 10 and the lock’s hardness by 5. Fire attacks against the lock deal double damage. In cold or lower temperature bands, this spell lasts 1 hour per level."
  },
  {
    "id": "frostburn-heartfreeze",
    "name": "Heartfreeze",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "sorcerer/wizard": 6
    },
    "levelLine": "Sorcerer/wizard 6",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude partial",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "You encase the heart of the target creature in a block of ice. The target becomes immediately exhausted and dies in 1d3+2 rounds. The subject is entitled to a Fortitude saving throw to survive the attack. If the target succeeds on the save, it instead takes 5d8 points of cold damage and is not exhausted. (The target might die from damage even if it succeeds on the saving throw.) A character attempting to save the victim of a heartfreeze spell must use a healing spell or effect on the victim as well as succeed on a DC 26 caster level check, otherwise the victim will succumb to the heartfreeze and die. A creature immune to critical hits and sneak attacks is unaffected by heartfreeze.\n Material Component: A strip of dried humanoid sinew."
  },
  {
    "id": "frostburn-heat-leech",
    "name": "Heat Leech",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "sorcerer/wizard": 2
    },
    "levelLine": "Sorcerer/wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates; see text",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "You plant a tiny sphere of intense cold in the body of a living creature. On each round on your turn (including the round during which you cast the spell), the target must succeed on a Fortitude saving throw or take 1d8 points of cold damage.\n Material Component: A leech and a pinch of snow."
  },
  {
    "id": "frostburn-hibernal-healing",
    "name": "Hibernal Healing",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 5,
      "druid": 4
    },
    "levelLine": "Cleric 5, druid 4",
    "components": "V, S, Frostfell",
    "castingTime": "1 round",
    "range": "Personal",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "You",
    "description": "You absorb slush, snow, and ice, channeling the cold energy stored within to cure 10 points of damage per caster level, to a maximum of 150 points at 15th level. The spell melts all slush, snow, and ice within 10 feet of the caster."
  },
  {
    "id": "frostburn-hibernate",
    "name": "Hibernate",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Necromancy",
    "levels": {
      "cleric": 5,
      "druid": 5
    },
    "levelLine": "Cleric 5, druid 5",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 week/level (D)",
    "savingThrow": "Will negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One living creature",
    "description": "You put a creature into a state of suspended animation, slowing its life functions to almost imperceptible levels and allowing a creature to survive for weeks without food or water. This suspension of life functions automatically stabilizes a dying creature, and it can save starving or dehydrated creatures from death. Creatures affected by a hibernate spell have a slower metabolism, healing wounds at a rate of just 1 hit point per level per week. If the target is unwilling, it is entitled a Will saving throw. A successful saving throw negates the effect of the spell; a failure allows the target an additional saving throw whenever it takes damage, when it is splashed with water or other liquids, or when 24 hours pass, whichever comes first."
  },
  {
    "id": "frostburn-ice-assassin",
    "name": "Ice Assassin",
    "school": "Illusion",
    "subschool": "Shadow",
    "descriptors": [],
    "schoolLine": "Illusion (Shadow)",
    "levels": {
      "sorcerer/wizard": 9
    },
    "levelLine": "Sorcerer/wizard 9",
    "components": "V, S, M, XP",
    "castingTime": "8 hours",
    "range": "Touch",
    "duration": "Instantaneous",
    "savingThrow": "None; see text",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One duplicate creature",
    "description": "The ice assassin spell is in many ways an improved version of simulacrum. Developed by powerful frost mages who have more than their fair share of enemies to fight, an ice assassin is an effective way to destroy an enemy without putting yourself at risk. An ice assassin spell creates a living, breathing creature that is a near-perfect duplicate of an existing creature. The duplicate is formed entirely out of ice, but once the spell is in effect, it appears as an exact duplicate to all but its source, who always sees the ice assassin as an animated ice statue of himself. The ice assassin possesses all the skills, abilities, and memories possessed by the original, but its personality is warped and twisted by an all-consuming need to slay the original. It also constantly uses locate creature on its duplicate at a caster level equal to your own. If its quarry is outside the range of this effect, the ice assassin must rely on its own cleverness or advice from you to track the original. The ice assassin has the cold subtype. Creatures familiar with the original might detect the ruse with a successful Spot check. You must make a Disguise check (gaining a +10 circumstance bonus from the power of the spell) when you cast the spell to determine how good the likeness is. The ice assassin is under your absolute command. You possess a telepathic link to the ice assassin, and when you concentrate, you receive a clear image of the area surrounding the ice assassin as if you were scrying it. Further, you can have any spell you cast on yourself affect the ice assassin as well; this includes spells with a target of “You” only. These benefits persist as long as you and the ice assassin remain within a mile of each other. If the ice assassin travels beyond this range, it continues to function and seek out its nemesis, but you have no direct control over it. An ice assassin has no ability to become more powerful; it cannot increase its level or abilities. Damage caused to the ice assassin can be repaired only via a complex process requiring 1 day, 100 gp per hit point, and a fully equipped laboratory. If the ice assassin is reduced to 0 hit points by any damage except for fire damage, it explodes into a burst of icy shrapnel in a 20-foot radius that causes 1d6 points of cold damage for every two caster levels you possess; a successful Reflex saving throw halves the damage. An ice assassin slain by fire damage simply melts into a pool of water.\n Material Component: This spell is cast over the ice statue of the creature to be duplicated. Some portion of the creature to be duplicated (hair, nail, and so on) must be placed inside the ice statue as it is constructed. In addition, the spell requires powdered diamond worth 20,000 gp. XP Cost: 5,000."
  },
  {
    "id": "frostburn-ice-castle",
    "name": "Ice Castle",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "sorcerer/wizard": 7
    },
    "levelLine": "Sorcerer/wizard 7",
    "components": "V, S, F",
    "castingTime": "10 minutes",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "24 hours",
    "savingThrow": "No",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Fortress of ice and snow",
    "description": "You create a huge castle of ice and snow, fully formed with walls, towers, gates, and battlements and magical wards. The castle includes a single main gate and a sally port, a drawbridge, a 30-foot diameter central tower made of blue ice (see page 80), and one additional tower per 6 levels of the caster. The size of the castle is determined by the location of the towers, which enclose an open courtyard. The maximum perimeter of the structure is 20 feet per caster level. In addition, you can place any or all of the following three magical effects in the castle. 1. Icicle spells in two areas (typically in the gatehouse and in the central tower). Saving Throw: See text. Spell Resistance: No. 2. Ice slick spells triggered an intruder steps on the tower stairs. Saving Throw: See text. Spell Resistance: No. 3. Obscuring snow in any corridors or rooms, obscuring all sight, including darkvision, beyond 5 feet. A creature within 5 feet has concealment (attacks have a 20% miss chance). Creatures father away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target). Saving Throw: None. Spell Resistance: No. The castle can be created around living creatures, and in this case it rises up from the earth and snow around them. It cannot be “dropped” onto creatures as an offensive spell. The caster may choose to be lifted onto the roof of the central tower by centering the spell on himself. If the castle is summoned on relatively level ground, a moat of icy water 20 feet wide surrounds the castle. If summoned on sharply sloping ground, an icy crevasse 20 feet wide and 50 feet deep surrounds the castle. The castle melts slowly whenever the temperature rises above freezing; an ice castle takes 1d6 points of damage each round in a place with temperatures above freezing. When struck by fire spells, the castle is damaged normally. The castle has 200 hit points per 5-foot section and a hardness of 0. The central tower is made of blue ice which has 300 hit points per 5-foot section and a hardness of 10 Creatures can hit the castle automatically. Fire, including a fireball spell and red dragon breath, can melt the ice castle, and it deals full damage to the structure (instead of the normal half damage taken by objects). Suddenly melting an ice castle creates a great cloud of steamy fog that lasts for 10 minutes. Arcane Focus: A piece of blue ice carved to resemble the desired castle worth 2,000 gp."
  },
  {
    "id": "frostburn-ice-darts",
    "name": "Ice Darts",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "bard": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Bard 2, sorcerer/wizard 2",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One or more ice darts",
    "description": "A sharp, transparent icicle shoots from your fingertip. You may fire one dart, plus one additional dart for every two levels beyond 3rd (to a maximum of five darts at 11th level). Each dart requires a ranged touch attack to hit and deals 2d4 points of damage, half of which is cold damage."
  },
  {
    "id": "frostburn-ice-rift",
    "name": "Ice Rift",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "cleric": 6,
      "druid": 6,
      "sorcerer/wizard": 6
    },
    "levelLine": "Cleric 6, druid 6, sorcerer/ wizard 6",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "1 round",
    "savingThrow": "See text",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "40-ft.-radius spread (S)",
    "description": "When you cast ice rift, an intense but highly localized tremor rips through the ice. The shock knocks creatures down, collapses structures, opens cracks in the ice, and more. The effect lasts for 1 round, during which time creatures on the ice can’t move or attack. A spellcaster on the ice must make a Concentration check (DC 20 + spell level) or lose any spell he or she tries to cast. The ice rift affects all terrain, vegetation, structures, and creatures in the area. The specific effect of an ice rift spell depends on the nature of the terrain where it is cast. Ice or Snow Cave, Cavern, or Tunnel: The spell collapses the roof, dealing 8d6 points of bludgeoning damage to any creature caught under the cave-in (Reflex DC 15 half) and burying that creature in snow. An ice rift cast on the roof of a very large ice or snow cavern could also endanger those outside the actual area but below the falling debris. Edge of a Glacier: Ice rift causes a glacier’s edge to crumble, creating a landslide that travels horizontally as far as it fell vertically. An ice rift cast at the top of a 100-foot glacier would sweep debris 100 feet outward from the base of the glacier. Any creature in the path takes 8d6 points of bludgeoning damage (Reflex DC 15 half) and is pinned beneath rubble (see below). Open Glacier: Each creature standing in the area must make a DC 15 Reflex save or fall down. Fissures open in the ice, and every creature on the ice has a 25% chance to fall into one (Reflex DC 20 to avoid a fissure). At the end of the spell, all fissures grind shut, killing any creatures still trapped within. Frozen Water: Fissures open in the ice, and every creature on the ice has a 25% chance to fall into the freezing water (Reflex DC 20 to avoid a fissure). Characters who fall into a fissure are immediately subject to hypothermia and take 2d6 points of cold damage from the frigid water. At the end of the spell, all rents in the ice grind shut, sealing any creatures in the icy water beneath (for additional rules on characters in cold water, see Hypothermia, page 10). Arcane Material Component: A bit of earth and a pinch of snow."
  },
  {
    "id": "frostburn-ice-shape",
    "name": "Ice Shape",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "cleric": 3,
      "druid": 3,
      "sorcerer/wizard": 5
    },
    "levelLine": "Cleric 3, druid 3, sorcerer/ wizard 5",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Ice touched, up to 10 cu. ft. + 1 cu. ft./level",
    "description": "You can form an existing piece of ice into any shape that suits your purpose. For example, you can make an ice weapon, a special trapdoor, or a crude idol. Ice shape also permits you to reshape an ice door to make an exit where one didn’t exist or to seal a door shut. While it’s possible to make crude coffers, doors, and so forth with ice shape, fine detail isn’t possible. There is a 30% chance that any shape including moving parts simply doesn’t work. Arcane Material Component: Slush, which must be spread into roughly the desired shape of the ice object and then touched to the ice while the verbal component is uttered."
  },
  {
    "id": "frostburn-ice-shield",
    "name": "Ice Shield",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "druid": 5,
      "sorcerer/wizard": 4
    },
    "levelLine": "Druid 5, sorcerer/wizard 4",
    "components": "V, S, M, Coldfire",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 min./level",
    "savingThrow": "Will negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "The warded creature gains resistance to blows, cuts, stabs, and slashes. The subject gains damage reduction 15/—. The spell prevents a total of 10 points of damage per caster level (maximum 150 points). While protected by the spell, the creature also has vulnerability to fire and takes half again as much (+50%) damage as normal from the effect, regardless of whether a saving throw is allowed, or if the save is a success or failure. The duration increases to 10 minutes per level when in a frostfell environment.\n Material Component: A pinch of sleet.\n Coldfire Component: Five ounces of coldfire."
  },
  {
    "id": "frostburn-ice-ship",
    "name": "Ice Ship",
    "school": "Conjuration",
    "subschool": null,
    "descriptors": [
      "Creation"
    ],
    "schoolLine": "Conjuration [Creation]",
    "levels": {
      "sorcerer/wizard": 4
    },
    "levelLine": "Sorcerer/wizard 4",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. +5 ft./2 levels)",
    "duration": "1 hour/level (D)",
    "targetLabel": "Effect",
    "target": "Creates ship of ice",
    "description": "You create a ship made of ice. The vessel can take one of two forms, depending on your needs at the time. The form is chosen when the spell is cast and cannot be changed. Ice Runner: This tiny, narrow ship appears with a set of stone runners that carry the ship at speeds of up to 80 mph over any level ice, such as a lake, river, or ocean pack ice. It can carry one Medium creature per caster level, and it cannot move against the prevailing winds (though it can move at right angles to the wind). Large creatures cannot fit on an ice runner. This form has 40 hit points and a hardness of 3. Ice Galleon: This sailing vessel can move against the wind at a steady pace of 5 mph, or with the wind at 10 mph. It carries three Medium creatures per caster level, or one Large creature per level. This form has 60 hit points and a hardness of 5. If the ship is created in an area of temperature above freezing, it immediately begins to melt, taking 1d12 points of damage per hour. Both forms begin to melt or crack slowly during the last hour of the spell regardless of temperature, and disappear into puddles or splinters of ice at the end of the spell’s duration.\n Material Component: A small glass model of a ship worth at least 200 gp."
  },
  {
    "id": "frostburn-ice-skate",
    "name": "Ice Skate",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "druid": 1,
      "ranger": 1
    },
    "levelLine": "Druid 1, ranger 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "10 min./level (D)",
    "savingThrow": "Fortitude negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "You allow a creature to skate across any icy surface, either level or inclined, increasing its base land speed by 60 feet. (This adjustment is treated as an enhancement bonus.) No Balance checks are required for this movement (even during combat on ice) unless the recipient attempts exceptional maneuvers, such as jumping a crevasse or gliding up a frozen waterfall, or takes damage—even then, the recipient gains a +4 enhancement bonus on its Balance check."
  },
  {
    "id": "frostburn-ice-slick",
    "name": "Ice Slick",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cleric": 1
    },
    "levelLine": "Cleric 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level (D)",
    "savingThrow": "See text",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "One 20-ft. square",
    "description": "An ice slick spell covers a solid surface with a layer of slippery ice. Any creature entering the area or caught in it when the spell is cast must make a successful Balance check or slip, skid, and fall. Those that succeed on the skill check can move at half speed across the surface, or can skate or glide normally. However, those that remain in the area must each make a new skill check every round to avoid falling and be able to move. The DM should adjust skill checks by circumstance. For example, a creature charging down a hill that is suddenly iced has little chance to avoid the effect, but its ability to exit the affected area is almost assured (whether it wants to or not)."
  },
  {
    "id": "frostburn-ice-to-flesh",
    "name": "Ice to Flesh",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "sorcerer/wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude negates (object); see text",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One frozen creature or a cylinder of ice from 1 ft. to 3 ft. in diameter and up to 10 ft. long",
    "description": "This spell restores a frozen creature to its normal state, restoring life and goods. The creature must make a DC 15 Fortitude save to survive the process. Any frozen creature, regardless of size, can be restored. The spell also can convert a mass of ice into a fleshy substance. Such flesh is inert and lacking a vital life force unless a life force or magical energy is available. (For example, an ordinary ice sculpture would become a corpse.) You can affect an object that fits within a cylinder from 1 foot to 3 feet in diameter and up to 10 feet long or a cylinder of up to those dimensions in a larger mass of ice.\n Material Component: A cube of ice and a drop of blood."
  },
  {
    "id": "frostburn-ice-web",
    "name": "Ice Web",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "sorcerer/wizard": 4
    },
    "levelLine": "Sorcerer/wizard 4",
    "components": "V, S, Coldfire",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "10 min./level (D)",
    "savingThrow": "Reflex negates; see text",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Webs of coldfire in a 20-ft.- radius spread",
    "description": "Ice web creates a many-layered mass of strong, frigid strands of pure coldfire. These masses must be anchored to two or more solid and diametrically opposed points—floor and ceiling, opposite walls, or the like—or else the ice web collapses upon itself and disappears. Creatures caught within the ice web become entangled in the strands. Attacking a creature in an ice web won’t cause you to become entangled. Any creature moving into or through the spell’s area takes 1d6 points of frostburn damage per round. In addition, anyone in the effect’s area when the spell is cast must make a Reflex save. If this save succeeds, the creature is entangled, but not prevented from moving, though moving is more difficult than normal (see below). If the save fails, the creature is entangled and can’t move from its space, but can break loose by spending 1 round and making a DC 20 Strength check or a DC 25 Escape Artist check. Once loose (either by making the initial Reflex save or a later Strength check or Escape Artist check), a creature remains entangled, but may move through the ice web very slowly. Each round devoted to moving allows the creature to make a new Strength check or Escape Artist check. The creature moves 5 feet for each full 5 points by which the check result exceeds 10. If you have at least 5 feet of ice web between you and an opponent, it provides cover. If you have at least 20 feet of ice web between you, it provides total cover. The strands of an ice web are immune to damage from cold. Any fire—a torch, burning oil, a flaming sword, and so forth—can melt 5 square feet of coldfire strands in 1 round. Ice web can be made permanent with a permanency spell. A permanent ice web that is damaged (but not destroyed) regrows in 10 minutes. Creatures with the cold subtype may pass unimpeded and unharmed through an ice web.\n Coldfire Component: Two ounces of coldfire."
  },
  {
    "id": "frostburn-iceberg",
    "name": "Iceberg",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "sorcerer/wizard": 9
    },
    "levelLine": "Sorcerer/wizard 9",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "None or Reflex half; see text",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "60-foot radius",
    "description": "Iceberg is a brutal and direct spell. When cast, the spell creates a single large block of ice that drops from the sky onto a spot you select. The iceberg then shatters if it encounters a solid surface. Elephant-sized blocks of ice scatter in all directions, affecting nearby creatures based on how far they are from the center of the area. Within 20 Feet of the Center Point: Any creature or object directly beneath the iceberg takes 20d6 points of crushing damage (no save) and is buried in snow (see page 90). Between 20 Feet and 40 Feet of the Center Point: Creatures and objects in the middle section of the area also take 20d6 points of crushing damage, but are entitled to a Reflex save for half damage. They are buried in snow (see page 90). Between 40 Feet and 60 Feet of the Center Point: Creatures in the outer-most section may be struck by flying debris for 10d6 points of damage. They are entitled to a Reflex save for half damage, and are not buried regardless of whether the saving throw is successful or not."
  },
  {
    "id": "frostburn-icicle",
    "name": "Icicle",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Abjuration [Cold]",
    "levels": {
      "sorcerer/wizard": 2
    },
    "levelLine": "Sorcerer/wizard 2",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Until discharged (D)",
    "savingThrow": "See text",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "One 10-ft. square section of ceiling or doorframe",
    "description": "You create icicles on a ceiling, doorway, or similar overhang. The icicles fall when a creature walks beneath them, dealing 4d6 points of piercing damage. Anyone directly under the area takes this damage with no saving throw. Others within 5 feet of the icicles take half damage, or none if they succeed on a Reflex saving throw. The caster and any characters you choose can walk under the icicles or through the doorway without triggering the ice attack. Likewise, you can remove the icicles whenever desired. Others can remove them with a successful dispel magic or 10 points of fire damage. However, an unsuccessful attempt to dispel or melt the icicles automatically triggers the attack."
  },
  {
    "id": "frostburn-ivory-flesh",
    "name": "Ivory Flesh",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "bard": 1,
      "druid": 1,
      "ranger": 1
    },
    "levelLine": "Bard 1, druid 1, ranger 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 hour/level",
    "savingThrow": "Will negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "The subject’s flesh and all his equipment turn white, granting him a +5 circumstance bonus on Hide checks in heavy snow or ice areas. In any nonwhite-hued area (including ebony ice), ivory flesh instead incurs a –5 penalty on Hide checks."
  },
  {
    "id": "frostburn-leomunds-tiny-igloo",
    "name": "Leomund’s Tiny Igloo",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "sorcerer/wizard": 2
    },
    "levelLine": "Sorcerer/wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "5 ft.",
    "duration": "2 hours/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "5-ft.-radius sphere, with 1-in.- thick wall/level centered on your location",
    "description": "You create a small domed snow house with a single entrance passage. Up to one Large or three Medium or twelve Small creatures can fit into the igloo with you; they can freely pass into and out of the hut without harming it. The temperature inside the igloo is magically warm, at exactly 50° F, and the walls do not melt. The igloo has two features that help arctic survival: a sleeping platform and a lamp. The snow sleeping platform takes advantage of the warm air trapped below the low roof, generated by body heat and a stone lamp. The magical smokeless lamp provides heat for comfort and for cooking. The igloo also provides protection against the elements, such as wind, snow, and hail. The igloo withstands any wind of less than hurricane force, but a hurricane (75+ mph wind speed) or greater force destroys it. The loose-packed snow of the igloo has a hardness of 0, and 3 hp per inch of thickness.\n Material Component: A small dollop of seal fat or caribou fat."
  },
  {
    "id": "frostburn-mantle-of-the-icy-soul",
    "name": "Mantle of the Icy Soul",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 6,
      "druid": 5
    },
    "levelLine": "Cleric 6, druid 5",
    "components": "V, S, M, XP",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "Instantaneous",
    "savingThrow": "Will negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Area",
    "target": "Creature touched",
    "description": "Mantle of the icy soul permanently adds the cold subtype to the targeted creature. The skin, hair, and scales of the creature subtly change color to take on an icy blue tint, and its breath does not frost in cold temperatures. The recipient of a mantle of the icy soul gains immunity to cold, but has vulnerability to fire, which means that it takes half again as much damage (+50%) as normal from fire regardless of whether a saving throw is allowed, or if it is a success or a failure. There is no change to the creature’s Challenge Rating or effective character level. The effects of this spell can be removed by a limited wish or wish.\n Material Component: A handful of ice or snow that must be pressed to the target’s body. XP Cost: 2,000."
  },
  {
    "id": "frostburn-meld-into-ice",
    "name": "Meld into Ice",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 3,
      "druid": 3
    },
    "levelLine": "Cleric 3, druid 3",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "10 min./level",
    "targetLabel": "Target",
    "target": "You",
    "description": "Meld into ice enables you to meld your body and possessions into a single block of ice. The ice must be large enough to accommodate your body in all three dimensions. When the casting is complete, you and not more than 100 pounds of nonliving gear merge with the ice. If either condition is violated, the spell fails and is wasted. While in the ice, you remain in contact, however tenuous, with the face of the ice through which you melded. You remain aware of the passage of time and can cast spells on yourself while hiding in the ice. Nothing that goes on outside the ice can be seen, but you can still hear what happens around you. Minor physical damage to the ice does not harm you, but its partial destruction (to the extent that you no longer fit within it) expels you and deals you 5d6 points of damage. The ice’s complete destruction (by damage or thawing) expels you and slays you instantly unless you make a DC 18 Fortitude save. Any time before the duration expires, you can step out of the ice through the surface that you entered. If the spell’s duration expires or the effect is dispelled before you voluntarily exit the stone, you are violently expelled and take 5d6 points of damage. The following spells harm you if cast upon the ice that you are occupying: Ice to flesh expels you and deals you 5d6 points of damage. Ice shape deals you 3d6 points of damage but does not expel you. Thaw expels you and then slays you instantly unless you make a DC 18 Fortitude save, in which case you are merely expelled. Finally, pass through ice expels you without damage."
  },
  {
    "id": "frostburn-mindfrost",
    "name": "Mindfrost",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "sorcerer/wizard": 4
    },
    "levelLine": "Sorcerer/wizard 4",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "This spell freezes the mental pathways of living creatures, dealing 5d6 points of cold damage and 1d4 points of Intelligence damage.\n Material Component: A small stone covered in frost."
  },
  {
    "id": "frostburn-move-snow-and-ice",
    "name": "Move Snow and Ice",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold",
      "Ice"
    ],
    "schoolLine": "Transmutation [Cold, Ice]",
    "levels": {
      "druid": 6,
      "sorcerer/wizard": 6
    },
    "levelLine": "Druid 6, sorcerer/wizard 6",
    "components": "V, S, M",
    "castingTime": "See text",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Snow or ice in an area up to 750 ft. square and up to 10 ft. deep (S)",
    "description": "This spell moves snow and ice. The area to be affected determines the casting time. For every 150-foot square (up to 10 feet deep), casting takes 10 minutes. The maximum area, 750 feet by 750 feet, takes 4 hours and 10 minutes to move. This spell does not violently break the surface of snow or ice. Instead, it creates wavelike crests and troughs, with glacierlike fluidity until the desired result is achieved. Trees, structures, rock formations, and such are mostly unaffected except for changes in elevation and relative topography. The spell cannot be used for tunnel-ing and is generally too slow to trap or bury creatures. Its primary use is for digging or adjusting terrain contours before a battle. This spell has no effect on ice creatures.\n Material Component: A mixture of snow and ice in a small bag, and an iron blade."
  },
  {
    "id": "frostburn-numbing-sphere",
    "name": "Numbing Sphere",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "druid": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Druid 2, sorcerer/wizard 2",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "Reflex negates",
    "spellResistance": "Yes",
    "targetLabel": "Effect",
    "target": "5-ft.-diameter sphere",
    "description": "A sphere of intense cold energy rolls in whichever direction you point and damages those it strikes. It moves 30 feet per round. As part of this movement, it can ascend or jump up to 30 feet to strike a target. If it enters a space with a creature, it stops moving for the round and deals 1d6 points of cold damage as well as 1d4 points of Dexterity damage to that creature, though a successful Reflex save negates both the cold damage and Dexterity damage. A numbing sphere rolls over barriers less than 4 feet tall, such as furniture and low walls. It instantly freezes water it encounters in 5-foot-cube sections, creating chunks of ice in large bodies of water. The sphere moves as long as you actively direct it (a move action for you); otherwise, it merely remains at rest. The sphere can be destroyed by attacks directed against it. It has 10 hit points and damage reduction 5/–. The surface of the sphere has a spongy, yielding consistency and so does not cause damage except by extreme cold. It cannot push aside unwilling creatures or batter down large obstacles. A numbing sphere winks out if it exceeds the spell’s range. Arcane Material Component: A bit of sponge and a drop of water."
  },
  {
    "id": "frostburn-obedient-avalanche",
    "name": "Obedient Avalanche",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "cold": 9
    },
    "levelLine": "Cold 9",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "Reflex half; see text",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "20-ft.-radius av a lanche of snow, centered anywhere within range; see text",
    "description": "Obedient Avalanche Half impact and full cold damage (Reflex negates) If save fails, +13 bull rush away from center Light snow 1d8 / 2 caster levels plus 1d6 cold / 2 caster levels If save fails, creature is buried. + Heavy snow One square equals 5 feet You summon an avalanche of snow out of a rift in midair, burying your foes and sending them to a frosty death. The obedient avalanche affects creatures differently, depending on where they are in relation to the avalanche. Within 20 Feet of the Center Point: Creatures take 1d8 points of damage per two caster levels (maximum 10d8) and an additional 1d6 points of cold damage per two caster levels. Creatures who fail their saves are also buried (as described in Avalanches, page 90 of the Dungeon Master’s Guide). All squares within 20 feet of the center point are covered in heavy snow (see page 94 of the Dungeon Master’s Guide), which persists as long as ordinary snow would. Between 20 Feet and 40 Feet of the Center Point: Creatures take half as much damage from the impact of the avalanche as the creatures nearer the center point took (Reflex save negates). Creatures who fail their saves must also resist the force of the snow moving past them as if they were being bull rushed. The snow has a +13 bonus (+5 for effective Strength of 20 and +8 for effectively being Huge) on the bull rush check, and it pushes characters away from the center point of the spell. All squares in the 20-foot to 40-foot ring are covered in light snow, which persists as long as ordinary snow would. Terrain and Structures: The avalanche uproots small trees and other vegetation automatically, and it leaves a trail of light rubble (as described on page 91 of the Dungeon Master’s Guide) even after the snow melts. Structures struck by an obedient avalanche take 1d610 points of damage. The obedient avalanche extinguishes all flames, whether normal or magical, it touches."
  },
  {
    "id": "frostburn-obscuring-snow",
    "name": "Obscuring Snow",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Air",
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Air, Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Cleric 2, druid 2, sorcerer/ wizard 2",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "30 ft.",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Cloud spreads in 30-ft.-radius from you, 30 ft. high",
    "description": "A swirling snow vapor arises around you, and follows you from that point on. The snow obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target). A strong wind (21+ mph) disperses the snow in 4 rounds. A very strong wind (31+ mph) disperses the snow in 1 round. A fireball, flame strike, or similar spell burns away the snow in the explosive or fiery spell’s area. A wall of fire burns away the snow in the area into which it deals damage. This spell does not function underwater. Creatures with snowsight are immune to the effects of this spell."
  },
  {
    "id": "frostburn-pass-through-ice",
    "name": "Pass through Ice",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 5,
      "druid": 5
    },
    "levelLine": "Cleric 5, druid 5",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 round/level (D)",
    "savingThrow": "Yes (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "The transmuted creature is able to pass through ice or snow as easily as water, but not through stone or frozen mud. The creature moves at a speed of 15 feet and can rise or sink into ice at a rate of 5 feet per round. When a pass through ice spell ends, the affected creature is ejected out to the nearest ice surface. If someone dispels pass through ice or you dismiss it while a creature is still in the ice, the creatures may be trapped in the ice unless they can reach the nearest surface within a single round of movement. Creatures trapped act as if caught in an entomb spell."
  },
  {
    "id": "frostburn-raise-ice-forest",
    "name": "Raise Ice Forest",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 7
    },
    "levelLine": "Druid 7",
    "components": "V, S, DF, Frostfell",
    "castingTime": "1 round",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "Permanent",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "20-ft. square of snow/level",
    "description": "Immediately after casting this spell, ice trees erupt from frostfell regions within the spell’s area. The ice trees resemble any type of tree designated by the caster (deciduous, evergreen, oak, or others). Trees have 5-foot-diameter trunks and rise to a height of 15 feet. Three trees appear in each Snow wave 20-foot-square frostfell region in the area. Ice Tree: 5 feet thick; hardness 8; hp 80; break DC 45; Climb DC 20."
  },
  {
    "id": "frostburn-shivering-touch",
    "name": "Shivering Touch",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 3,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 3, sorcerer/wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "On a successful melee touch attack, you instantly suck the heat from the target’s body, rendering it numb. The target takes 3d6 points of Dexterity damage. Creatures with the cold subtype are immune to the effects of shivering touch."
  },
  {
    "id": "frostburn-shivering-touch-lesser",
    "name": "Shivering Touch, Lesser",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 1,
      "sorcerer/wizard": 1
    },
    "levelLine": "Cleric 1, sorcerer/wizard 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "Your successful melee touch attack delivers a bitter chill to the target, causing it to shiver uncontrollably for the duration of the spell. Shivering characters take 1d6 points of Dexterity damage. Creatures with the cold subtype are immune to the effects of lesser shivering touch."
  },
  {
    "id": "frostburn-snow-walk",
    "name": "Snow Walk",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "druid": 2,
      "ranger": 2,
      "winter": 2
    },
    "levelLine": "Druid 2, ranger 2, Winter 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "10 min./level",
    "savingThrow": "Will negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Targets",
    "target": "One creature/level touched",
    "description": "The subjects can walk on top of snow rather than through it, avoiding the usual movement penalties and leaving neither footprints nor scent. Tracking the subject is impossible by nonmagical means, and the gliding along the surface of the snow adds 10 feet to the target creature’s land speed. (This adjustment is treated as an enhancement bonus.)"
  },
  {
    "id": "frostburn-snow-wave",
    "name": "Snow Wave",
    "school": "Conjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration [Cold]",
    "levels": {
      "druid": 6
    },
    "levelLine": "Druid 6",
    "components": "V, S",
    "castingTime": "1 round",
    "range": "30 ft.",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half and Reflex negates; see text",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "Cone-shaped burst",
    "description": "You create a wave of snow that knocks creatures in its path prone and deals 4d6 points of crushing damage plus 1d6 points of cold damage to targets caught in the cone. Any creature making a Fortitude saving throw takes only half the cold damage from a snow wave; however, it still takes the full crushing damage. In addition, anyone in the area must make a Reflex save or be knocked prone."
  },
  {
    "id": "frostburn-snowdrift",
    "name": "Snowdrift",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "druid": 1,
      "sorcerer/wizard": 1
    },
    "levelLine": "Druid 1, sorcerer/ wizard 1",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Snow touched, up to 10 cu. ft. +1 cu. ft./level",
    "description": "You can form existing snow into any shape that suits your purpose. For example, you can make a snowbank for concealment, sculpt a snow statue or idol, open a tunnel in deep snow, or simply cover a set of tracks. Snowdrift also permits you to raise snowy barriers around a door or house to prevent vision in or out, or to clog a chimney with snow. Snow cannot be made into weapons with this spell, and snowdrift does not affect solid ice in any form. Arcane Material Component: A pinch of white flour."
  },
  {
    "id": "frostburn-snowsight",
    "name": "Snowsight",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "druid": 1,
      "ranger": 1,
      "winter": 1
    },
    "levelLine": "Druid 1, ranger 1, Winter 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "The subject gains the ability to see to the normal limits of its vision even in whiteout conditions, and ignores all penalties due to snow glare and snow blindness. Snowsight is no better than normal vision. During daylight, this usually means the subject can see to the horizon; at night, vision is restricted to ambient light or darkvision as appropriate for the subject creature. Snowsight does not grant creatures the ability to see in darkness."
  },
  {
    "id": "frostburn-snowsong",
    "name": "Snowsong",
    "school": "Enchantment",
    "subschool": "Compulsion",
    "descriptors": [
      "Mind-Affecting"
    ],
    "schoolLine": "Enchantment (Compulsion) [Mind-Affecting]",
    "levels": {
      "bard": 6
    },
    "levelLine": "Bard 6",
    "components": "V",
    "castingTime": "1 standard action",
    "range": "30 ft.",
    "duration": "10 min./level",
    "savingThrow": "Will negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "30-ft. radius centered on you",
    "description": "Snowsong fills the area with a soft snowfall that melts and evaporates on contact with anything solid. When you cast the spell, you must designate all creatures in the area as either allies or enemies. While the snow falls, allies in the area hear a soft, lilting song that bolsters their spirits and confidence. At the same time, as the snow strikes their bodies, it melts and washes away scars, wounds, and filth. Allies under the effect of the snow gain a +4 morale bonus to Charisma and attack rolls, and a +4 insight bonus to Armor Class. In addition, the snow imparts fast healing 1 and resistance to cold 15 to all affected allies. All melee attacks made by allies in the snowsong deal an additional 1d6 points of cold damage. Enemies in the area of a snowsong have a much different experience. To them, the snow is bitterly cold and leaves scabs and angry welts when it lands their skin. They perceive the music as a discordant jangle of crashes, scrapes, and howls. As long as they remain in the area, they suffer a 20% chance of spell failure (for both divine and arcane spells) when casting any spells with a verbal component. Enemies can resist the effects of a snowsong with a successful Will saving throw. These benefits remain in place as long as the spell persists and as long as the target remains in the spell’s area. If a creature leaves the spell’s area, all effects end for that creature until it returns to the snowsong’s area."
  },
  {
    "id": "frostburn-summon-giants",
    "name": "Summon Giants",
    "school": "Conjuration",
    "subschool": "Summoning",
    "descriptors": [],
    "schoolLine": "Conjuration (Summoning)",
    "levels": {
      "cleric": 8,
      "winter": 8
    },
    "levelLine": "Cleric 8, Winter 8",
    "components": "V, S, F/DF",
    "castingTime": "1 full round",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One or more summoned creatures",
    "description": "You summon one or more giants that attack your enemies. They appear where you designate and act immediately, on your turn. The giants attack your opponents to the best of their ability. If you speak Giant, you can direct the giants not to attack, to attack particular enemies, or to perform other actions. Summoned giants act normally on the last round of the spell and disappear at the end of their turn. Choose a giant kind from the table below. Type Number Align Hill giants, fiendish 3 CE Stone giants, celestial 2 N or fiendish Frost giant, fiendish 1 CE Fire giant, fiendish 1 LE Focus: A lock of hair from a giant of the desired kind."
  },
  {
    "id": "frostburn-suppress-flame",
    "name": "Suppress Flame",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Transmutation [Cold]",
    "levels": {
      "sorcerer/wizard": 6
    },
    "levelLine": "Sorcerer/wizard 6",
    "components": "V, S, Coldfire",
    "castingTime": "1 round",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 hour/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft. cube/level (S)",
    "description": "You imbue an area with a combination of cold and negative energies that suppresses flame. Illumination emitted by fire (torches, continual flame, and so on) is reduced by half. For example, a hooded lantern within the area of a suppress flame spell clearly illuminates a 15-foot radius (instead of a 30-foot radius) and provides shadowy illumination in a 30-foot radius (instead of a 60-foot radius). In addition, all damage caused by fire, including all fire spells and spell-like effects, is reduced to 1 point per die. So, a fireball cast by a 10th-level wizard would deal 10 points of fire damage to those who fail their Reflex save or 5 points of fire damage to those who make their Reflex save, rather than 10d6 points of fire damage or half that amount, respectively, outside the confines of a suppress flame spell. A caster can make a caster level check (DC 10 + the suppress flame’s caster level) to cause normal amounts of damage from fire spells. A new caster level check must be made for each spell cast.\n Coldfire Component: Ten ounces of coldfire."
  },
  {
    "id": "frostburn-thaw",
    "name": "Thaw",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Earth",
      "Fire"
    ],
    "schoolLine": "Transmutation [Earth, Fire]",
    "levels": {
      "druid": 2
    },
    "levelLine": "Druid 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "10-ft. cube/level",
    "description": "All everfrost, slush, snow, mud, and ice in the spell’s area are filled with heat. Ice and snow become slush, slush becomes everfrost, and everfrost becomes bog (see page 88 of the Dungeon Master’s Guide, for information on bogs)."
  },
  {
    "id": "frostburn-thin-air",
    "name": "Thin Air",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 2, druid 2, sorcerer/ wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 min./level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "No",
    "targetLabel": "Area",
    "target": "30-ft.-radius emanation",
    "description": "This spell thins the oxygen in the area, causing creatures caught therein to suffer the effects of extreme altitude sickness. Subjects failing their saves take 1 point of damage to all ability scores because of altitude sickness (see page 90 of the Dungeon Masters Guide). Characters acclimated to high altitude receive a +4 competence bonus on their saving throws. Creatures that do not breathe are immune to the effects of the spell."
  },
  {
    "id": "frostburn-wall-of-coldfire",
    "name": "Wall of Coldfire",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "druid": 5,
      "sorcerer/wizard": 4
    },
    "levelLine": "Druid 5, sorcerer/wizard 4",
    "components": "V, S, Coldfire",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Concentration + 1 round/ level",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Effect",
    "target": "Opaque sheet of coldfire up to 20 ft. long/level or a ring of coldfire with a radius of up to 5 ft. per two levels; either form 20 ft. high",
    "description": "An immobile, opaque curtain of frosty coldfire springs into existence. One side of the wall, selected by you, sends forth waves of cold, dealing 2d4 points of cold damage to creatures within 10 feet and 1d4 points of cold damage to those past 10 feet but within 20 feet. The wall deals this damage when it appears and on your turn each round to all creatures in the area. In addition, the wall deals 2d6 points of frostburn damage +1 point of frostburn damage per caster level (maximum +20) to any creature passing through it. If you evoke the wall so that it appears where creatures are, each creature takes damage as if passing through the wall. The opaqueness of the coldfire grants concealment (20% miss chance) against attacks made from the opposite side of the wall. If any 5-foot length of wall takes 20 points of fire damage or more in 1 round, that length goes out. (Do not divide fire damage by 4, as for normal objects.) Wall of coldfire can be made permanent with a permanency spell. A permanent wall of coldfire that is extinguished by fire damage becomes inactive for 10 minutes, then reforms at normal strength.\n Coldfire Component: Three ounces of coldfire."
  },
  {
    "id": "frostburn-waves-of-cold",
    "name": "Waves of Cold",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Necromancy [Cold]",
    "levels": {
      "sorcerer/wizard": 6
    },
    "levelLine": "Sorcerer/wizard 6",
    "components": "V, S, Coldfire",
    "castingTime": "1 standard action",
    "range": "60 ft.",
    "duration": "1 round/level",
    "savingThrow": "Will negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "Cone-shaped burst",
    "description": "Waves of frigid energy render all creatures with the fire subtype in the spell’s area shaken for the duration of the spell. Any creature with the cold subtype caught in the area of this spell loses its immunity to cold for the duration of the spell. Whether or not a creature makes its saving throw, it becomes immune to further castings of this spell for 24 hours.\n Coldfire Component: Two ounces of coldfire."
  },
  {
    "id": "frostburn-whiteout",
    "name": "Whiteout",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration (Creation) [Cold]",
    "levels": {
      "druid": 7
    },
    "levelLine": "Druid 7",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Long (400 ft. + 40 ft./level)",
    "duration": "1 hour/level",
    "savingThrow": "None (see text)",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "Cloud centered on target spreads 120 ft. and is 20 ft. high",
    "description": "A swirling snow and a strong wind arise around you or a creature you designate, and follows you or the creature from that point on. Characters in whiteout conditions take a –2 penalty to AC, lose any Dexterity bonus to AC, move at half speed, and take a –4 penalty on Dexterity-based skill checks, as well as Search, Spot, and any other checks that rely on vision. The character also gains total concealment (50% miss chance). These effects end when the character leaves the area of whiteout. Whiteout conditions stack with wind and snowfall. Visibility is 5 feet. In addition, any creature trying to move within the effects of this spell must make a Survival check (DC 10 + caster level) every move action or wander lost inside the whiteout. A creature that fails can’t leave the area, but can move around within it. Groups of creatures roped or otherwise physically held together can use the lead creature’s Survival check and stay together. A new check can be made once per minute."
  },
  {
    "id": "frostburn-winters-embrace",
    "name": "Winter’s Embrace",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Evocation [Cold]",
    "levels": {
      "cleric": 4,
      "druid": 3,
      "winter": 3
    },
    "levelLine": "Cleric 4, druid 3, Winter 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Area",
    "target": "One creature",
    "description": "Winter’s embrace covers the victim with sheets of ice and lumps of snow. If the subject succeeds on its Fortitude save, the ice and snow instantly slough from its body, causing a mere 1d4 points of cold damage and ending the effect. If the subject fails its saving throw, the ice and snow cling tenaciously to its body and cause 1d8 points of cold damage each round. On the subject’s action each round, it can attempt a new Fortitude saving throw to avoid taking damage that round. If a creature takes damage twice from a single casting of winter’s embrace, it becomes fatigued. The fourth time a creature takes damage from the same spell, it becomes exhausted."
  },
  {
    "id": "frostburn-zone-of-glacial-cold",
    "name": "Zone of Glacial Cold",
    "school": "Conjuration",
    "subschool": null,
    "descriptors": [
      "Cold"
    ],
    "schoolLine": "Conjuration [Cold]",
    "levels": {
      "druid": 2,
      "ranger": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Druid 2, ranger 2, sorcerer/ wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude half",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "20-ft. radius",
    "description": "You create a zone of icy cold within the spell’s area, dealing 1d6 points of cold damage per round. Arcane Material Component: A snowball."
  }
];

export const DND35_FROSTBURN_POWERS: Dnd35SupplementPower[] = [
  {
    "id": "frostburn-energy-emanation",
    "name": "Energy Emanation",
    "discipline": "Psychokinesis",
    "schoolLine": "Psychokinesis [see text]",
    "levels": {
      "psion/wilder": 2,
      "psychicwarrior": 2
    },
    "levelLine": "Psion/wilder 2, psychic warrior 2",
    "display": "Visual",
    "manifestingTime": "1 standard action",
    "range": "5 ft.",
    "targetLabel": "Target",
    "target": "5-ft.-radius emanation, centered on you",
    "duration": "1 round/level",
    "savingThrow": "Fortitude half",
    "powerResistance": "Yes",
    "powerPoints": 3,
    "description": "You expel concentrated energy from your body, dealing 1d6 points of energy damage to all creatures within the area every round. Creatures in the area must make a new Fortitude save each round. The energy is the type you choose: cold, electricity, fire, or sonic. Once chosen, you emanate the same energy type for the power’s duration. Cold: This energy type deals +1 point of damage per die. Electricity: This energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance. Fire: This energy type deals +1 point of damage per die. Sonic: This energy type deals –1 point of damage per die and ignores an object’s hardness. This power’s subtype is the same as the type of energy you manifest. Augment: For every 3 additional power points you spend, this power’s damage increases by one die (d6). For each extra die of damage, this power’s save DC increases by 1."
  },
  {
    "id": "frostburn-energy-flash",
    "name": "Energy Flash",
    "discipline": "Psychokinesis",
    "schoolLine": "Psychokinesis [see text]",
    "levels": {
      "psion/wilder": 4
    },
    "levelLine": "Psion/wilder 4",
    "display": "Visual",
    "manifestingTime": "1 standard action",
    "range": "Touch",
    "targetLabel": "Target",
    "target": "Touched creature, or up to 1 cu. ft. of water/level",
    "duration": "Instantaneous",
    "savingThrow": "Fortitude half",
    "powerResistance": "Yes",
    "powerPoints": 7,
    "description": "On a successful touch attack, you deal 7d6 points of damage to the creature touched, doing either cold, electricity, fire, or sonic damage. In addition to the energy damage, on a failed Fortitude save (the same save that determines full or half damage), a target is dazed for 1 round. Cold: This energy type deals +1 point of damage per die. Electricity: This energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance. Fire: This energy type deals +1 point of damage per die. Sonic: This energy type deals –1 point of damage per die and ignores an object’s hardness. This power’s subtype is the same as the type of energy you manifest. Augment: For every additional power point you spend, this power’s damage increases by one die (d6). For each extra two dice of damage, this power’s save DC increases by 1."
  },
  {
    "id": "frostburn-energy-nullification-field",
    "name": "Energy Nullification Field",
    "discipline": "Psychokinesis",
    "schoolLine": "Psychokinesis [see text]",
    "levels": {
      "kineticist": 5
    },
    "levelLine": "Kineticist 5",
    "display": "Visual and auditory",
    "manifestingTime": "1 standard action",
    "range": "10 ft.",
    "targetLabel": "Area",
    "target": "10-ft.-radius emanation, centered on you",
    "duration": "10 min./level (D)",
    "savingThrow": "None",
    "powerResistance": "See text",
    "powerPoints": 9,
    "description": "An invisible field of energy surrounds you. This power functions like null psionics field, but applies only to powers with the energy descriptor you choose when you first manifest this power: cold, electricity, fire, or sonic."
  },
  {
    "id": "frostburn-mind-over-energy",
    "name": "Mind over Energy",
    "discipline": "Psychometabolism",
    "schoolLine": "Psychometabolism",
    "levels": {
      "psion/wilder": 6,
      "psychicwarrior": 6
    },
    "levelLine": "Psion/wilder 6, psychic warrior 6",
    "display": "Visual",
    "manifestingTime": "1 standard action",
    "range": "Personal",
    "targetLabel": "Target",
    "target": "You",
    "duration": "1 round/level",
    "savingThrow": "None",
    "powerResistance": "No",
    "powerPoints": 11,
    "description": "You mentally reinforce your living tissue with pure psionic will, gaining immunity to the energy type you choose for the duration of the power: cold, electricity, fire, or sonic."
  },
  {
    "id": "frostburn-slow-breathing",
    "name": "Slow Breathing",
    "discipline": "Psychometabolism",
    "schoolLine": "Psychometabolism",
    "levels": {
      "psion/wilder": 1,
      "psychicwarrior": 1
    },
    "levelLine": "Psion/wilder 1, psychic warrior 1",
    "display": "Visual",
    "manifestingTime": "1 standard action",
    "range": "Personal",
    "targetLabel": "Target",
    "target": "You",
    "duration": "1 hour/level",
    "savingThrow": "None (harmless)",
    "powerResistance": "No (harmless)",
    "powerPoints": 1,
    "description": "You reduce the need for oxygen in your body, increasing your ability to become acclimated to the thin air of high altitude. You gain a +4 competence bonus on saving throws against altitude sickness (see page 90 of the Dungeon Master’s Guide). Augmentation: For every additional power point you spend, the competence bonus increases by 2."
  }
];
