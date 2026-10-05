// ============================================================================
// D&D 3.5 — Champions of Valor (Forgotten Realms): magias (Cap. 2, pp. 52-60)
// Extraído da camada de texto do PDF com ordenação por coluna. Campos como
// impressos; quando o livro abrevia ("functions like ..."), só os campos
// impressos existem. "levels": classe, domínio ou ordem (kebab-case) -> nível;
// "sanctified" = magias consagradas. O nome "Dawnshroud" corrige a quebra de
// kerning do PDF ("Dawn shroud"). Setting: Forgotten Realms (Faerûn).
// ============================================================================

export interface Dnd35CovSpell {
  id: string;
  name: string;
  school: string;
  subschool: string | null;
  descriptors: string[];
  schoolLine: string;
  levels: Record<string, number>;
  levelLine: string;
  components?: string;
  castingTime?: string;
  range?: string;
  targetLabel?: string;
  target?: string;
  duration?: string;
  savingThrow?: string;
  spellResistance?: string;
  /** Texto do componente de sacrifício das magias consagradas. */
  sacrificeComponent?: string;
  description: string;
}

export const DND35_COV_SPELLS: Dnd35CovSpell[] = [
  {
    "id": "cov-animate-with-the-spirit",
    "name": "Animate With the Spirit",
    "school": "Conjuration",
    "subschool": "Summoning",
    "descriptors": [
      "Good"
    ],
    "schoolLine": "Conjuration (Summoning) [Good]",
    "levels": {
      "sanctified": 4
    },
    "levelLine": "Sanctified 4",
    "components": "V, S, DF, sacrifice",
    "castingTime": "10 minutes",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "10 minutes/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "One corpse with HD equal to or less than your caster level",
    "sacrificeComponent": "1d3 points of Strength drain.",
    "description": "By casting this spell, you request your deity to send you the spirit of a good-aligned outsider (of 6 HD or less) of the deity’s choice to inhabit a corpse within range, which becomes animated by the spirit. If you serve no particular deity, the spell is a general plea answered by a creature sharing your philosophical alignment. If you know an individual creature’s name, you can request that individual by speaking the name during the spell (though you might get a different creature anyway). The Hit Dice of the corpse to be animated (not counting class levels) cannot exceed your caster level. The possessed body attacks your opponents to the best of its ability. If you can communicate with the possessing spirit, you can direct it not to attack, to attack particular enemies, or to perform other actions. While the body is inhabited by the spirit, it is treated as if were still alive but possessed. It uses the outsider’s Intelligence, Wisdom, Charisma, base attack bonus, base save bonuses, alignment, mental abilities, and any class levels it might have. The body regains the Strength, Dexterity, Constitution, hit points, and innate abilities of the creature the corpse represented when it was alive. For example, a sahuagin’s body breathes water and a troll’s body regenerates. The spirit can’t choose to activate the host body’s extraordinary or supernatural abilities, and the host body’s spells and spell-like abilities do not stay with the body. The spirit remains within the body until the spell is dismissed, the duration ends, or the host body is slain, at which point it returns to its original body with no ill effects. A celestial fortress makes an ideal refuge for great heroes Sacrifice Component: 1d3 points of Strength drain."
  },
  {
    "id": "cov-benign-projection",
    "name": "Benign Projection",
    "school": "Illusion",
    "subschool": "Shadow",
    "descriptors": [],
    "schoolLine": "Illusion (Shadow)",
    "levels": {
      "sanctified": 6
    },
    "levelLine": "Sanctified 6",
    "components": "V, S, DF, sacrifice",
    "range": "See text",
    "sacrificeComponent": "1d2 points of Strength damage.",
    "description": "This spell functions like project image, except as noted above and as follows. You can create an image of your entire body or just your face, and you can cause it to shed light as a candle at will. It can only mimic your actions and speech (you cannot direct it to perform other actions). The image can cast spells only from the schools of abjuration, divination, and conjuration (healing). Sacrifice Component: 1d2 points of Strength damage."
  },
  {
    "id": "cov-celestial-fortress",
    "name": "Celestial Fortress",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [],
    "schoolLine": "Conjuration (Creation)",
    "levels": {
      "sanctified": 4
    },
    "levelLine": "Sanctified 4",
    "components": "V, S, DF, sacrifice",
    "sacrificeComponent": "1d2 points of Constitution damage.",
    "description": "This spell functions like Leomund’s secure shelter, except as noted above and as follows. The structure is a simple flat-roofed fort rather than a cottage. It has a sturdy door and a fireplace but no windows; access to the roof is through a ladder and a sturdy hatch. The fortress resonates with the power of your deity’s home plane, and it is protected by consecrate and magic circle against evil. The fortress’s appearance reflects your deity and deity’s realm. For example, Mystra’s forts created by this spell look like high-fantasy castles, those of Mulhorandi deities look native to their land, those of dwarven deities look very dwarflike, and so on. Sacrifice Component: 1d2 points of Constitution damage."
  },
  {
    "id": "cov-convert-wand",
    "name": "Convert Wand",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 5
    },
    "levelLine": "Cleric 5",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 minute/level",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Wand touched",
    "description": "This spell temporarily transforms a magic wand of any type into a healing wand with the same number of charges remaining. At the end of the spell’s duration, the wand’s original properties are restored, and any charges that were drained remain so. The spell level of the wand determines how powerful a healing instrument the wand becomes: Spell Level New Wand Type 1st Wand of cure light wounds 2nd Wand of cure moderate wounds 3rd Wand of cure serious wounds 4th Wand of cure critical wounds For example, a 10th-level cleric can transform a wand of lightning bolt (3rd-level spell) into a wand of cure serious wounds for 10 minutes."
  },
  {
    "id": "cov-create-lantern-archon",
    "name": "Create Lantern Archon",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Good",
      "Light"
    ],
    "schoolLine": "Conjuration (Creation) [Good, Light]",
    "levels": {
      "sanctified": 3
    },
    "levelLine": "Sanctified 3",
    "components": "V, S, DF, sacrifice",
    "castingTime": "1 hour",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One lantern archon",
    "sacrificeComponent": "1d2 points of Constitution drain.",
    "description": "You sacrifice a small part of your own life force to create a new lantern archon (see page 16 of the Monster Manual) in the service of your patron. The lantern archon is not under your control but is friendly to you. It willingly performs one nonhazardous task of your choice taking up to 1 hour without requiring any payment. Alternatively, you can request that it perform a hazardous or longer task, but in this case payment is required—see lesser planar ally, page 261 of the Player’s Handbook, for details on tasks and payment. Upon completion of the task, the lantern archon is magically transported to your deity’s home plane. Sacrifice Component: 1d2 points of Constitution drain."
  },
  {
    "id": "cov-dawnshroud",
    "name": "Dawnshroud",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Light"
    ],
    "schoolLine": "Evocation [Light]",
    "levels": {
      "cleric": 5,
      "druid": 5
    },
    "levelLine": "Cleric 5, druid 5",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "10 minutes/level (D)",
    "savingThrow": "Will half; see text",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Willing creature touched",
    "description": "You cause the target to glow with the rosy light of the dawn. In addition to acting as a daylight spell, the light is harmful to oozes and undead. When the spell is cast, and at the beginning of each of your turns thereafter, such creatures take 1d6 points of damage if within the bright light of the spell (out to 60 feet) or 1 point of damage per round if within the shadowy illumination of the spell (more than 60 feet, out to 120 feet). If the subject is touched by such a creature using a touch attack, or if it hits the subject with a natural weapon or unarmed strike, it takes 1d6 points of damage + 1 point per caster level (maximum 1d6+15), with a Will saving throw for half damage. If you cast this spell on yourself, you can suppress or restore this light as a free action once each round. This spell was created by clerics of the church of Lathander, but they do not try to restrict its use to only those of their faith."
  },
  {
    "id": "cov-disk-of-solar-vengeance",
    "name": "Disk of Solar Vengeance",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Fire"
    ],
    "schoolLine": "Evocation [Fire]",
    "levels": {
      "initiate-of-horus-re": 1
    },
    "levelLine": "Initiate of Horus-Re 1",
    "components": "V, S, DF",
    "castingTime": "1 swift action",
    "range": "Personal",
    "duration": "1 round/level or until discharged (D)",
    "targetLabel": "Target",
    "target": "You",
    "description": "This spell creates a disk of sunlike flames behind your head. The flames give you resistance to cold 5. In addition, if any creature strikes you with a natural attack, an unarmed strike, or a melee weapon that is not a reach weapon, it takes 1d6 points of fire damage +1 point per caster level (maximum +5) after dealing its normal damage to you. This instantly discharges the spell. If the attacker has spell resistance, it applies to this effect. Creatures wielding reach weapons, such as longspears, trigger this effect but are not subject to this damage if they attack you. You can also use the spell to attack as if it were a touch spell (a successful hit discharges the spell)."
  },
  {
    "id": "cov-dispel-silence",
    "name": "Dispel Silence",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "initiate-of-milil": 2
    },
    "levelLine": "Initiate of Milil 2",
    "components": "S, DF",
    "castingTime": "1 immediate action",
    "targetLabel": "Target or Area",
    "target": "One silence effect",
    "description": "This spell functions like dispel magic, except as noted above and that it only works against effects that create an area of silence (silence, Khelben’s suspended silence, and so on). While you have this spell prepared, you gain a +2 competence bonus on Listen checks."
  },
  {
    "id": "cov-eilistraees-moonfire",
    "name": "Eilistraee’s Moonfire",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Light"
    ],
    "schoolLine": "Evocation [Light]",
    "levels": {
      "initiate-of-eilistraee": 1
    },
    "levelLine": "Initiate of Eilistraee 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 minute/level or until discharged; see text",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "Creature touched",
    "description": "You surround your hand or some other part of your body with light resembling moonlight. You can change the intensity from a faint glow equivalent to a candle to a clear, bright light equivalent to a torch. It varies in color as you desire, whether blue-white, soft green, white, or silver. You can use this moonfire as a melee touch attack that deals 2d6 points of cold damage +1 point per caster level (maximum +5). Whether or not the attack hits, the spell effect is discharged. You can cause the moonlight to leave your body and move about as a single light similar to dancing lights. Once it leaves your body, the effect’s duration is 1 minute per level, and the effect can no longer be used to attack."
  },
  {
    "id": "cov-favor-of-tymora",
    "name": "Favor of Tymora",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "initiate-of-tymora": 2
    },
    "levelLine": "Initiate of Tymora 2",
    "components": "V, S, F",
    "castingTime": "1 immediate action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/3 levels",
    "savingThrow": "Will negates (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "This spell creates a glistening aura of golden magical energy around the target creature. The creature gains a +2 luck bonus to AC. Focus: A gold piece."
  },
  {
    "id": "cov-faith-healing-wand",
    "name": "Faith Healing Wand",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 3
    },
    "levelLine": "Cleric 3",
    "description": "This spell functions like convert wand (see page 53), except you always transform the wand into a wand of faith healingMag, no matter what spell the wand normally contains."
  },
  {
    "id": "cov-fleeting-fortune",
    "name": "Fleeting Fortune",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "initiate-of-tymora": 1
    },
    "levelLine": "Initiate of Tymora 1",
    "components": "V, S, DF",
    "castingTime": "1 immediate action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round or until discharged",
    "savingThrow": "Yes (harmless)",
    "spellResistance": "Yes (harmless)",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "You imbue the subject with a bit of Tymora’s luck, granting her a +5 luck bonus on a single skill check of her choice. Activating the luck bonus requires no action but must be declared before the skill check is rolled."
  },
  {
    "id": "cov-golden-dragonmail",
    "name": "Golden Dragonmail",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [],
    "schoolLine": "Conjuration (Creation)",
    "levels": {
      "sorcerer/wizard": 3
    },
    "levelLine": "Sorcerer/wizard 3",
    "components": "V, S, F",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "1 hour/level (D); see text",
    "targetLabel": "Effect",
    "target": "One suit of magic armor",
    "description": "You create a suit of shining golden full plate around your body. The armor is etched with a dragonscale pattern, an image of a gold dragon, or Torm’s holy symbol (your choice when you cast the spell). It is treated as +1 mithral full plate for all purposes (including arcane spell failure chance), and you are treated as proficient with this armor. Removing or destroying the armor dismisses the spell. This spell has no effect if you are already wearing armor. Torm the True is served by gold and silver dragons, and some of these dragons are the founders of ancient sorcerer bloodlines among the younger races. If you are a sorcerer, the armor also gives you resistance to fire 10. Focus: A gold coin and a piece of mithral in the shape of a dragonscale."
  },
  {
    "id": "cov-holy-fire-shield",
    "name": "Holy Fire Shield",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold or Fire",
      "Good"
    ],
    "schoolLine": "Evocation [Cold or Fire; Good]",
    "levels": {
      "sanctified": 4
    },
    "levelLine": "Sanctified 4",
    "components": "V, S, sacrifice",
    "sacrificeComponent": "1d3 points of Strength damage.",
    "description": "This spell functions like fire shield, except half the damage from the spell is fire (or cold) and the remainder is divine energy, similar to a flame strike spell. If you create a warm shield, the flames are a beautiful golden-red. If you create a chill shield, the flames are a soothing blue-white. Sacrifice Component: 1d3 points of Strength damage."
  },
  {
    "id": "cov-horrible-taste",
    "name": "Horrible Taste",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "druid": 1,
      "initiate-of-the-holy-realm": 1,
      "ranger": 1
    },
    "levelLine": "Druid 1, initiate of the Holy Realm 1, ranger 1",
    "components": "V, S",
    "castingTime": "1 immediate action",
    "range": "Personal",
    "duration": "1 turn/level",
    "targetLabel": "Target",
    "target": "You",
    "description": "Drawing upon the talents of some creatures of the insect world, you change your flesh to make it unpalatable to other creatures. Any creature that hits you with a bite attack becomes nauseated until the end of your next turn unless it succeeds on a Fortitude save. Creatures immune to poison are unaffected by this spell."
  },
  {
    "id": "cov-invisibility-swift",
    "name": "Invisibility, Swift",
    "school": "Illusion",
    "subschool": "Glamer",
    "descriptors": [],
    "schoolLine": "Illusion (Glamer)",
    "levels": {
      "assassin": 2,
      "bard": 2,
      "initiate-of-baravar-cloakshadow": 1
    },
    "levelLine": "Assassin 2, bard 2, initiate of Baravar Cloakshadow 1",
    "components": "V",
    "castingTime": "1 swift action",
    "range": "Personal",
    "duration": "1 round",
    "targetLabel": "Target",
    "target": "You",
    "description": "This spell functions like invisibility except as noted above."
  },
  {
    "id": "cov-lionheart",
    "name": "Lionheart",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "initiate-of-the-holy-realm": 2,
      "initiate-of-nobanion": 2
    },
    "levelLine": "Initiate of the Holy Realm 2, initiate of Nobanion 2",
    "castingTime": "1 immediate action",
    "duration": "1 minute",
    "description": "This spell originated in Nobanion’s faith. It functions like remove fear except as noted above."
  },
  {
    "id": "cov-love-bite",
    "name": "Love Bite",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Force"
    ],
    "schoolLine": "Evocation [Force]",
    "levels": {
      "initiate-of-the-holy-realm": 1
    },
    "levelLine": "Initiate of the Holy Realm 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous; see text",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature",
    "description": "This spell originated in Sune’s faith. You determine at the time of casting what effect it takes. Fleeting Kiss: The target feels the sensation of a brief, tender kiss on a visible part of her body or on her mouth if her body is completely covered. This effect is often used as a signal. Love Bite: The target takes 1 point of damage. In either case, if you are holding the charge on a touch spell of 2nd level or lower when you cast love bite, this spell also delivers the touch spell to the target as if you had touched it directly (normal saving throws and spell resistance for the touch spell applies, if applicable). You must make a melee touch attack as normal with a +2 bonus. This form of the spell always attacks from your direction and cannot flank targets as a creature can. Using this spell to deliver a held charge is an exception to the normal rule that casting another spell while holding a charge dissipates the held spell."
  },
  {
    "id": "cov-portal-well",
    "name": "Portal Well",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "bard": 2,
      "cleric": 2,
      "druid": 2,
      "sorcerer/wizard": 2
    },
    "levelLine": "Bard 2, cleric 2, druid 2, sorcerer/wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "duration": "1 round/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Target",
    "target": "Active portal touched",
    "description": "When you step into a portal affected by this spell, you can wait for a short time within an extradimensional space between the portal’s entrance and exit. This spell only works on a portal you are able to activate; for example, if you are an elf and the target portal doesn’t work for elves, you can’t use this spell on the portal. The extradimensional space created by this spell is similar to that created by a rope trick spell but can only hold you and your gear (up to your maximum heavy load). When the spell ends, you exit the portal at either your point of entry or the portal’s destination. While within this extradimensional space, you can see the origin and destination locations, though the images are blurry (much like viewing the Material Plane from the Ethereal Plane). Dispel magic or gate seal traps you within the extradimensional space for as long as the portal is negated or sealed (as would surrounding both ends with a dead magic area). Mordenkainen’s disjunction or some other effect that destroys a portal outright forcibly ejects you from one random end of the portal and deals 5d6 points of damage to you. This spell originated in Shaundakul’s church and is hard to find elsewhere. Arcane Material Component: A silver wire tied in a knot."
  },
  {
    "id": "cov-rend-shadow-weave",
    "name": "Rend Shadow Weave",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "cleric": 3,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 3, sorcerer/wizard 3",
    "components": "V, S, M",
    "castingTime": "1 minute",
    "range": "Close (25 ft. plus 5 ft./2 levels)",
    "duration": "Instantaneous",
    "savingThrow": "None",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One 10-ft.-cube area of the Shadow Weave",
    "description": "You damage the Shadow Weave, creating an area of dead magic that only affects the Shadow Weave rather than the Weave. While you have this spell prepared, you get a +2 competence bonus on caster level checks to dispel Shadow Weave effects. Material Component: A moonstone worth at least 50 gp."
  },
  {
    "id": "cov-runic-marker",
    "name": "Runic Marker",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [
      "Earth"
    ],
    "schoolLine": "Conjuration (Creation) [Earth]",
    "levels": {
      "cleric": 4
    },
    "levelLine": "Cleric 4",
    "components": "V, S, M",
    "castingTime": "10 minutes",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "Permanent",
    "savingThrow": "See text",
    "spellResistance": "No",
    "targetLabel": "Effect",
    "target": "One stone pillar",
    "description": "You create a slender stone pillar 2 feet in diameter and 6 feet tall. It can be square, cylindrical, hexagonal, natural-looking, or any similar shape. It must be solid and complete (without hollow spaces or secret compartments). When you create the runic marker, you can also have a message of up to twenty-five words inscribed upon it. The runic marker also bears a glyph of warding (blast glyph only). In addition to the normal trigger conditions available for a glyph of warding, you can set it to activate if the pillar ever takes damage from a magical effect. When the glyph of warding effect activates, the runic marker is destroyed, leaving nothing behind. An elf wizard protects himself with silver dragonmail Material Component: One vial of holy water."
  },
  {
    "id": "cov-shard-blessing-aura",
    "name": "Shard Blessing Aura",
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
    "range": "Personal",
    "duration": "1 round/level",
    "targetLabel": "Target",
    "target": "You",
    "description": "This spell creates an aura of shimmering blue-white light similar to moonlight that fills your space and moves with you. The aura sheds light equal to a candle. This aura functions like a lesser globe of invulnerability. If you are a sorcerer and Selûne is your patron, the aura also grants you the benefit of protection from evil. The spell is named for the Shards, planetar servants of Selûne drawn from the ranks of her greatest priestesses. Because some shards return to Faerûn to visit their mortal lovers, supernatural bloodlines (usually aasimar, but not always) with ties to Selûne exist in some parts of the world. Material Component: A moonstone or other polished white stone."
  },
  {
    "id": "cov-silver-dragonmail",
    "name": "Silver Dragonmail",
    "school": "Conjuration",
    "subschool": "Creation",
    "descriptors": [],
    "schoolLine": "Conjuration (Creation)",
    "levels": {
      "sorcerer/wizard": 2
    },
    "levelLine": "Sorcerer/wizard 2",
    "components": "V, S, F",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "1 hour/level (D); see text",
    "targetLabel": "Effect",
    "target": "One suit of magic armor",
    "description": "You create a shining silver breastplate around your body. The armor is etched with a dragonscale pattern, an image of a silver dragon, or Torm’s holy symbol (your choice when you cast the spell). It is treated as +1 mithral breastplate for all purposes (including arcane spell failure chance), and you are treated as proficient with this armor. Removing or destroying the armor dismisses the spell. This spell has no effect if you are already wearing armor. Torm the True is served by gold and silver dragons, and some of these dragons are the founders of ancient sorcerer bloodlines among the younger races. If you are a sorcerer, the armor also gives you resistance to cold 5. Focus: A silver piece and a piece of mithral in the shape of a dragonscale."
  },
  {
    "id": "cov-skin-of-the-steel-dragon",
    "name": "Skin of the Steel Dragon",
    "school": "Abjuration",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Abjuration",
    "levels": {
      "sorcerer/wizard": 5
    },
    "levelLine": "Sorcerer/wizard 5",
    "components": "V, S, M",
    "description": "Cas ting Time: 1 immediate action Range: Personal Target: You Duration: 1 round/3 levels This spell grants you spell resistance equal to 10 + your caster level. If you are a sorcerer, this spell also grants you a +5 resistance bonus on saving throws against poison. Some of Mystra’s servants are steel dragons, shapeshifting creatures who love living among humanoids. Some sorcerers claim their magic comes from a long-ago dragon ancestor, one of the first steel dragons to serve Mystra in Faerûn. Material Component: A piece of steel in the shape of a seven-pointed star or a steel holy symbol of Mystra’s faith."
  },
  {
    "id": "cov-spellsong",
    "name": "Spellsong",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "initiate-of-eilistraee": 6
    },
    "levelLine": "Initiate of Eilistraee 6",
    "components": "V, S, DF",
    "castingTime": "1 round",
    "range": "Personal",
    "duration": "Instantaneous",
    "targetLabel": "Target",
    "target": "You",
    "description": "When you cast this spell, you immediately prepare one spell of 4th level or lower in this spell’s slot. The spell must be a spell you could normally prepare in that slot (for example, you could not prepare a wizard spell or a domain spell). The spell works like any spell prepared in the normal manner, including requiring the normal components. Like a bard spell, casting spellsong always requires a verbal component, and you cannot use Silent Spell or similar effects to cast the spell without a verbal component."
  },
  {
    "id": "cov-spellsong-lesser",
    "name": "Spellsong, Lesser",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "initiate-of-eilistraee": 3
    },
    "levelLine": "Initiate of Eilistraee 3",
    "description": "This spell functions like spellsong, except you can use it only to prepare one spell of 1st level or lower in this spell’s slot."
  },
  {
    "id": "cov-spiderbind",
    "name": "Spiderbind",
    "school": "Transmutation",
    "subschool": null,
    "descriptors": [],
    "schoolLine": "Transmutation",
    "levels": {
      "cleric": 3
    },
    "levelLine": "Cleric 3",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/level",
    "savingThrow": "Fortitude negates",
    "spellResistance": "Yes",
    "targetLabel": "Targets",
    "target": "One spider or spiderlike creature/level, no two of which can be more than 30 ft. apart",
    "description": "An affected creature moves and attacks at a drastically reduced rate, as the slow spell. It can only take a single move action or standard action each turn, but not both (nor can it take full-round actions). Additionally, it takes a –1 penalty on attack rolls, AC, and Reflex saves. A slowed creature moves at half its normal speed (round down to the next 5-foot increment), which affects the creature’s jumping distance as normal for decreased speed. In addition, any attack by the creature that would normally include poison (such as a spider’s bite) does not do so, but all other effects associated with that attack apply. For example, if an aranea subject to spiderbind cast a touch spell and then bit a creature, the attack would deal normal bite damage and trigger the touch spell, but the bite would not inject poison. While you have this spell prepared, you get a +2 circumstance bonus on saving throws against poison. Clerics of Eilistraee created this spell to help battle the many spiderlike creatures that serve Lolth. Araneas, bebiliths, chitinesMag, choldrithsMag, driders, ettercaps, myrlocharsMag, phase spiders, retrievers, and yochlols are sufficiently spiderlike to be affected by this spell. For a more complete list of creatures that qualify as spiderkind, see page 30 of Underdark."
  },
  {
    "id": "cov-stars-of-arvandor",
    "name": "Stars of Arvandor",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Force",
      "Good"
    ],
    "schoolLine": "Evocation [Force, Good]",
    "levels": {
      "cleric": 4,
      "druid": 4,
      "ranger": 4,
      "sorcerer/wizard": 3
    },
    "levelLine": "Cleric 4, druid 4, ranger 4, sorcerer/wizard 3",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 minute/level (D)",
    "savingThrow": "None",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "See text",
    "description": "You create one twinkling star per level (maximum ten stars). These minute starbursts orbit your head like ioun stones. As a swift action, you can launch one star at a target you designate within range. Alternatively, as a standard action, you can launch up to three stars at one or more targets within range. You can only launch stars once per round. You must make a ranged touch attack for each star. Against non-evil targets, each star deals 1d8 points of nonlethal damage; evil targets take 1d8 points of lethal damage instead."
  },
  {
    "id": "cov-stars-of-mystra",
    "name": "Stars of Mystra",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Force",
      "Good"
    ],
    "schoolLine": "Evocation [Force, Good]",
    "levels": {
      "cleric": 4
    },
    "levelLine": "Cleric 4",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 minute/level (D)",
    "savingThrow": "Will negates",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "See text",
    "description": "You create one twinkling star per three levels (maximum five stars). These minute starbursts orbit your head like ioun stones. Beginning on the turn you cast the spell, you can launch one star as a swift action at a target you designate within range. You must make a ranged touch attack for each star. Each time an evil creature is hit by a star, it must make a saving throw or lose a prepared spell or spell slot as if the creature had used it to cast a spell. The level of the lost spell is 4th (or the highest spell level lower than 4th in which the caster has at least one remaining prepared spell or spell slot). If the target prepares spells, determine the specific lost spell randomly. If the creature has spellcasting ability from more than one class (such as a 4th-level cleric/4th-level ranger), determine the affected spellcasting class randomly. The stars have no effect on nonspellcasters."
  },
  {
    "id": "cov-stars-of-sel-ne",
    "name": "Stars of Selûne",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Cold",
      "Force"
    ],
    "schoolLine": "Evocation [Cold, Force]",
    "levels": {
      "cleric": 4
    },
    "levelLine": "Cleric 4",
    "savingThrow": "None",
    "description": "This spell functions like stars of Mystra, except as noted above and as follows. Each star deals 1d8 points of force damage and 1d8 points of cold damage to the target."
  },
  {
    "id": "cov-stormvoice",
    "name": "Stormvoice",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Sonic"
    ],
    "schoolLine": "Evocation [Sonic]",
    "levels": {
      "initiate-of-horus-re": 2
    },
    "levelLine": "Initiate of Horus-Re 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Personal",
    "duration": "1 minute/level (D) or until discharged",
    "targetLabel": "Target",
    "target": "You",
    "description": "Your voice is amplified greatly. Subtract 10 from the DC of Listen checks made to hear you talking (even whispering). You also gain a +2 competence bonus on Intimidate checks. While this spell is active, you can use a swift action to create a 15-foot-long cone-shaped burst of intense sound with a shout. Every creature in the area takes 1d8 points of sonic damage and must succeed on a Fortitude save to avoid being stunned for 1 round. Doing this discharges the spell. Creatures that cannot hear are not stunned but are still damaged."
  },
  {
    "id": "cov-thunderstroke",
    "name": "Thunderstroke",
    "school": "Evocation",
    "subschool": null,
    "descriptors": [
      "Electricity"
    ],
    "schoolLine": "Evocation [Electricity]",
    "levels": {
      "initiate-of-anhur": 2
    },
    "levelLine": "Initiate of Anhur 2",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "duration": "Instantaneous",
    "savingThrow": "Reflex half",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One creature or object",
    "description": "You call down a bolt of electricity, which unerringly strikes the target and deals 1d6 points of electricity damage per caster level (maximum 5d6). A small rumble of thunder accompanies the bolt, which is as loud as a battle (Listen DC –10 to hear it)."
  },
  {
    "id": "cov-vision-of-punishment",
    "name": "Vision of Punishment",
    "school": "Divination",
    "subschool": null,
    "descriptors": [
      "Mind-Affecting"
    ],
    "schoolLine": "Divination [Mind-Affecting]",
    "levels": {
      "sanctified": 1
    },
    "levelLine": "Sanctified 1",
    "components": "V, DF, sacrifice",
    "castingTime": "1 swift action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "duration": "1 round/3 levels",
    "savingThrow": "Will partial",
    "spellResistance": "Yes",
    "targetLabel": "Target",
    "target": "One evil living creature",
    "sacrificeComponent": "1d2 points of Strength damage.",
    "description": "You give the target a vision of what awaits it in the afterlife. Since most evil creatures go to an evil plane where they take the form of a lowly and much-tortured petitioner (barring special arrangements with evil gods or fiends that grant them higher status in the afterlife), this is usually a gut-wrenching vision. The target is nauseated; if it makes its saving throw, it is instead sickened (see page 301 of the Dungeon Master’s Guide for definitions of these conditions. Sacrifice Component: 1d2 points of Strength damage."
  }
];
