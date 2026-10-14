// ============================================================================
// D&D 3.5 — Exemplars of Evil: Magias de Vilões (Cap. 1, pp. 27-30)
// Suplemento oficial da Wizards of the Coast (171 págs.).
// 11 magias para Assassino, Bardo, Clérigo, Druida, Lâmina Maldita, Feiticeiro e Mago.
// ============================================================================

export interface Dnd35EeSpell {
  id: string;
  name: string;
  school: string;
  subschool: string | null;
  descriptors: string[];
  schoolLine: string;
  levels: Record<string, number>;
  levelLine: string;
  components: string;
  castingTime: string;
  range: string;
  target: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
}

export const DND35_EE_SPELLS: Dnd35EeSpell[] = [
  {
    "id": "ee-alibi",
    "name": "Alibi",
    "school": "Illusion",
    "subschool": "Phantasm",
    "descriptors": [
      "Mind-Affecting"
    ],
    "schoolLine": "Illusion (Phantasm) [Mind-Affecting]",
    "levels": {
      "assassin": 1,
      "bard": 1,
      "sorcerer": 1,
      "wizard": 1
    },
    "levelLine": "Assassin 1, bard 1, sorcerer/wizard 1",
    "components": "V",
    "castingTime": "1 swift action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One living creature",
    "duration": "Instantaneous",
    "savingThrow": "Will disbelief",
    "spellResistance": "Yes",
    "description": "You implant a memory of your presence in a target's mind. The creature recalls speaking with you or interacting with you sometime within the last 24 hours. The phantasm is completely believable and the target's mind adapts to the mental intrusion, filling in any gaps in logic."
  },
  {
    "id": "ee-alliance-undone",
    "name": "Alliance Undone",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 4,
      "hexblade": 2,
      "sorcerer": 4,
      "wizard": 4
    },
    "levelLine": "Cleric 4, hexblade 2, sorcerer/wizard 4",
    "components": "V, S, M/DF",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "10-ft./level radius area",
    "duration": "1 minute",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "Alliance undone suppresses the benefits gained from alliances, including, but not limited to, the effects of ceremony feats, teamwork benefits, companion spirits, and affiliations. Material Component: A severed cord."
  },
  {
    "id": "ee-friendly-fire",
    "name": "Friendly Fire",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "druid": 4,
      "sorcerer": 4,
      "wizard": 4
    },
    "levelLine": "Druid 4, sorcerer/wizard 4",
    "components": "V",
    "castingTime": "1 immediate action or 1 full round; see text",
    "range": "Personal",
    "target": "You",
    "duration": "Instantaneous or 1 round/level; see text",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "Whenever you are the target of a ranged attack or a ranged touch attack, you can cast this spell to deflect the attack toward another target within 30 feet. Use the same attack roll. If the redirected attack hits the new target, resolve it as normal. Otherwise, the attack fails. If you extend the casting time to 1 full round, the duration changes from instantaneous to 1 round per caster level."
  },
  {
    "id": "ee-infallible-servant",
    "name": "Infallible Servant",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Evil"
    ],
    "schoolLine": "Necromancy [Evil]",
    "levels": {
      "cleric": 3,
      "druid": 4,
      "sorcerer": 3,
      "wizard": 3
    },
    "levelLine": "Cleric 3, druid 4, sorcerer/wizard 3",
    "components": "V, S, M",
    "castingTime": "1 minute",
    "range": "Touch",
    "target": "Creature touched",
    "duration": "1 hour/level (D)",
    "savingThrow": "Will negates; see text",
    "spellResistance": "No",
    "description": "With a touch, you give a target a powerful motivation to avoid failure. If the target is captured by non-evil creatures or is slain, his body dissolves into foul sludge. The target is utterly destroyed and cannot be affected by any spell or effect that restores life (such as true resurrection) or a semblance of life short of miracle or wish. When the target dissolves, all creatures within 30 feet must succeed on a Fortitude save against the spell's DC or become nauseated for 1d4 rounds. Material Component: Dung from an evil creature."
  },
  {
    "id": "ee-phantasmal-injury",
    "name": "Phantasmal Injury",
    "school": "Illusion",
    "subschool": "Phantasm",
    "descriptors": [
      "Fear",
      "Mind-Affecting"
    ],
    "schoolLine": "Illusion (Phantasm) [Fear, Mind-Affecting]",
    "levels": {
      "bard": 3,
      "sorcerer": 3,
      "wizard": 3
    },
    "levelLine": "Bard 3, sorcerer/wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One living creature",
    "duration": "1 round/level (D)",
    "savingThrow": "Will disbelief, then Fortitude partial; see text",
    "spellResistance": "Yes",
    "description": "You cause the subject to believe he has sustained a terrible and debilitating injury. The subject must make an initial Will save to disbelieve the phantasm. If the save fails, the subject believes he is disabled and can take only a single move action or standard action each round (strenuous activity causes 1 point of damage). In addition, each round the subject takes 1d4 points of nonlethal damage. A successful Fortitude save halves the duration of the effect."
  },
  {
    "id": "ee-phantasmal-wasting",
    "name": "Phantasmal Wasting",
    "school": "Illusion",
    "subschool": "Phantasm",
    "descriptors": [
      "Fear",
      "Mind-Affecting"
    ],
    "schoolLine": "Illusion (Phantasm) [Fear, Mind-Affecting]",
    "levels": {
      "bard": 4,
      "druid": 4,
      "sorcerer": 5,
      "wizard": 5
    },
    "levelLine": "Bard 4, druid 4, sorcerer/wizard 5",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "Living creature touched",
    "duration": "1 round/level",
    "savingThrow": "Will disbelief, then Fortitude partial; see text",
    "spellResistance": "Yes",
    "description": "You touch a creature, causing it to believe it has aged severely and rapidly. If the target fails its initial Will disbelief save, it believes its body is withered and takes 1d6 points of Strength damage and 1d6 points of Dexterity damage. A successful Fortitude save halves this ability damage."
  },
  {
    "id": "ee-ring-of-fire",
    "name": "Ring of Fire",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Fire"
    ],
    "schoolLine": "Conjuration (Creation) [Fire]",
    "levels": {
      "druid": 9,
      "sorcerer": 9,
      "wizard": 9
    },
    "levelLine": "Druid 9, sorcerer/wizard 9",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "target": "Ring-shaped area of lava up to 30-ft. radius, 10 ft. high",
    "duration": "1 round/level",
    "savingThrow": "Reflex partial; see text",
    "spellResistance": "No",
    "description": "You create a ring of molten lava that erupts from the ground. Any creature in the area when the spell is cast takes 10d6 points of fire damage (Reflex half). Any creature attempting to cross the ring of lava takes 20d6 points of fire damage. The intense heat of the lava damages all creatures within 30 feet, dealing 2d6 points of fire damage per round. Material Component: A piece of volcanic rock and a pinch of sulfur."
  },
  {
    "id": "ee-stiffen",
    "name": "Stiffen",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Necromancy",
    "levels": {
      "bard": 3,
      "cleric": 3,
      "sorcerer": 4,
      "wizard": 4
    },
    "levelLine": "Bard 3, cleric 3, sorcerer/wizard 4",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "Creature touched",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "description": "With a touch, you cause the target's muscles and joints to stiffen and lock. The subject takes a –1d6 penalty to Dexterity and its land speed is reduced by 10 feet. If the target possesses a fly speed, its maneuverability drops by one category."
  },
  {
    "id": "ee-touch-of-chaos",
    "name": "Touch of Chaos",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [
      "Chaos",
      "Evil"
    ],
    "schoolLine": "Transmutation [Chaos, Evil]",
    "levels": {
      "sorcerer": 5,
      "wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "Living creature touched",
    "duration": "1 round/2 levels",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "description": "Your touch causes a creature to collapse into a spongy mass of shifting tissue, taking 1 point of Wisdom drain each round the form is maintained. The target is unable to hold items, cast spells, or use standard extraordinary or supernatural abilities. Each round as a free action, the target can attempt a new Fortitude save to regain its normal form. Material Component: Violet slime."
  },
  {
    "id": "ee-treacherous-weapon",
    "name": "Treacherous Weapon",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "bard": 1,
      "hexblade": 1,
      "sorcerer": 1,
      "wizard": 1
    },
    "levelLine": "Bard 1, hexblade 1, sorcerer/wizard 1",
    "components": "V, S",
    "castingTime": "1 immediate action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One manufactured weapon",
    "duration": "1 round",
    "savingThrow": "Will negates (object)",
    "spellResistance": "Yes (object)",
    "description": "You cause an opponent's weapon to twist and turn in his grip. On the wielder's next attack with that weapon, he takes a –4 penalty on the attack roll and damage roll. If the attack roll is an unmodified 1, the weapon strikes the wielder instead, dealing normal damage."
  },
  {
    "id": "ee-willing-sacrifice",
    "name": "Willing Sacrifice",
    "school": "Necromancy",
    "subschool": null,
    "descriptors": [
      "Evil"
    ],
    "schoolLine": "Necromancy [Evil]",
    "levels": {
      "cleric": 3,
      "sorcerer": 3,
      "wizard": 3
    },
    "levelLine": "Cleric 3, sorcerer/wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "Willing living creature touched",
    "duration": "1 round/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "You draw life force from a willing minion or ally to empower yourself. The subject takes 1d10 points of damage + 1 point per caster level (maximum 1d10+15). You gain a profane bonus on attack rolls, saves, and Armor Class equal to +1 per 5 points of damage dealt (minimum +1, maximum +4) for the duration of the spell."
  }
];
