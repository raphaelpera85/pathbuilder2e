// ============================================================================
// D&D 3.5 — Champions of Valor (Forgotten Realms): classes de prestígio
// (Cap. 4, pp. 106-127, texto em inglês). Extraído da camada de texto do PDF
// com ordenação por coluna: tabelas de nível, requisitos, perícias de classe e
// características como impressos. Knight of the Weave inclui a Tabela 4-3
// (magias por dia/conhecidas, 6 colunas). Triadic Knight tem 7 níveis.
// Setting: Forgotten Realms (Faerûn).
// ============================================================================

export interface Dnd35CovPrestigeLevel {
  level: number;
  bab: string;
  fort: string;
  ref: string;
  will: string;
  special: string;
  /** Só Triadic Knight: coluna "Spellcasting" ("+1 level of existing divine spellcasting class" ou "—"). */
  advancesSpellcasting?: boolean;
}

export interface Dnd35CovPrestigeClass {
  id: string;
  name: string;
  hitDie: number;
  requirements: string[];
  classSkills: string;
  skillPointsPerLevel: string;
  levels: Dnd35CovPrestigeLevel[];
  classFeaturesText: string;
  /** Knight of the Weave (Tabela 4-3): 10 níveis x 6 níveis de magia, null = "—". */
  spellsPerDayAndKnown?: (number | null)[][];
}

export const DND35_COV_PRESTIGE_CLASSES: Dnd35CovPrestigeClass[] = [
  {
    "id": "cov-knight-of-the-flying-hunt",
    "name": "Knight of the Flying Hunt",
    "hitDie": 10,
    "requirements": [
      "Race: Human or half-moon elf.",
      "Base Attack Bonus: +7.",
      "Skills: Handle Animal 8 ranks, Ride 8 ranks.",
      "Feats: Favored in Guild (Knights of the Flying Hunt), Mounted Combat, Weapon Focus (lance).",
      "Alignment: Lawful good, neutral good, or lawful neutral.",
      "Special: Native or permanent resident of Nimbral.",
      "Special: Membership in the Knights of the Flying Hunt."
    ],
    "classSkills": "Diplomacy, Handle Animal, Intimidate, Jump, Ride, Search, Spot, Swim",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+2",
        "special": "Armor proficiency, flying hunt armor, pegasus mount"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+3",
        "special": "Armored ease (2)"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+3",
        "special": "—"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Bonus feat"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Storm armor"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "—"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Armored ease (4)"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": "+6",
        "ref": "+2",
        "will": "+6",
        "special": "Bonus feat"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": "—"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": "+7",
        "ref": "+3",
        "will": "+7",
        "special": "Greater storm armor"
      }
    ],
    "classFeaturesText": "As a Knight of the Flying Hunt, you become an expert at mounted combat, utilizing a host of skills and maneuvers to defeat your enemies, while at the same time gaining more powerful enhancements to your special glass armor. \n\n Armor Proficiency: You gain proficiency in light, medium, and heavy armor. \n\n Flying Hunt Armor: At 1st level, you are considered a novice, and you receive a suit of flying hunt armor (see page 65) from the Nimbral Lords. This armor is attuned to you and can never be used by another. If this suit of armor is lost or destroyed, the Nimbral Lords will replace it, though you must pay the gp cost normally required to create the armor. \n\n Pegasus Mount: At 1st level, you receive a trained pegasus to serve you in your defense of Nimbral. The mount remains with you until it is slain or dismissed. It requires food and rest, and you are responsible for tending to its needs. When riding this mount, you gain a competence bonus on Ride checks equal to your class level. If the mount dies, you can have it raised from the dead (at the normal cost) or obtain another mount. You can only obtain a replacement after living and meditating among the trained pegasi of the Knights for one week. \n\n Armored Ease (Ex): You learn to adapt your movements to the restrictive nature of armor. Beginning at 2nd level, you can lessen the armor check penalty of any armor with which you are proficient by 2 (minimum 0). At 7th level, this reduction improves to 4 (minimum 0). \n\n Bonus Feat: At 4th level, and again at 8th level, you gain a bonus feat, which must be selected from the following list: Animal Affinity, Greater Weapon Focus (lance), Greater Weapon Specialization (lance), Ride-By Attack, Skill Focus (Ride), Spirited Charge, Trample, Weapon Specialization (lance). You must meet the normal prerequisites in order to select any of these feats. \n\n Storm Armor: At 5th level, you are considered a full Knight and your flying hunt armor is further enhanced by the Nimbral Lords to become storm armor (see page 69). This armor is attuned to you and can never be used by another. If this suit of armor is lost or destroyed, the Nimbral Lords will replace it, though you must pay the gp cost normally required to create the armor. \n\n Greater Storm Armor: At 10th level, you are recognized by the Knights as an excellent and experienced leader. For your loyal service and outstanding performance, the Nimbral Lords bestow another enhancement upon your storm armor, making it greater storm armor. You can choose any one of the following effects and add it to your armor at no charge: arrow deflection (as the shield special ability); fortification (light); magic missile (3/day, CL 7th); mirror image (1/day; CL 10th); spell resistance 13; or water walk (as a ring of water walking). Alternatively, you can choose a different armor special ability (with a price of up to 30,000 gp or a base price modifier of up to +3 bonus) and add it to your armor at only 75% of the normal market price. Either way, this addition requires the normal amount of time required to improve the item, which likely means that you must turn over your storm armor to the Nimbral Lords for a number of days or weeks. If this suit of armor is lost or destroyed, the Lords will replace it, though you must pay the gp cost normally required to create the armor."
  },
  {
    "id": "cov-knight-of-the-weave",
    "name": "Knight of the Weave",
    "hitDie": 8,
    "requirements": [
      "Alignment: Any non-evil.",
      "Base Attack Bonus: +5 or ability to spontaneously cast 3rd-level arcane spells.",
      "Skills: Knowledge (arcana) 1 rank, Knowledge (history) 1 rank, Spellcraft 1 rank.",
      "Oath to the Weave: A knight must swear to defend the Weave at all costs, sacrificing his own life to preserve it if necessary.",
      "Special: Cannot be a Shadow Weave user."
    ],
    "classSkills": "Concentration, Craft, Diplomacy, Intimidate, Knowledge (arcana), Knowledge (history), Profession, Spellcraft, Spot, Use Magic Device",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+0",
        "will": "+2",
        "special": "Detect magic, read magic, spellcasting"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+3",
        "ref": "+0",
        "will": "+3",
        "special": "Armored caster (light)"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": "+3",
        "ref": "+1",
        "will": "+3",
        "special": "—"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Fast metamagic"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "—"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Spellfire (healing)"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "—"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": "+6",
        "ref": "+2",
        "will": "+6",
        "special": "Armored caster (medium)"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": "—"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": "+7",
        "ref": "+3",
        "will": "+7",
        "special": "Spellfire (blasting)"
      }
    ],
    "classFeaturesText": "Knights of the Weave cast arcane spells and learn how to tap into the raw power of the Weave. A knight’s caster level for his spell-like abilities is equal to his class level. \n\n Detect Magic (Sp): At 1st level, you gain the ability to use detect magic at will. \n\n Read Magic (Sp): At 1st level, you gain the ability to use read magic at will. \n\n Spellcasting: Knights of the Weave cast arcane spells like a sorcerer (you use your Charisma score to determine bonus spells per day, save DCs, and so on). Refer to Table 4–3 to determine your spells known and spells per day. You incur the normal arcane spell failure chance for wearing armor (but see Armored Caster, below). Your caster level for your knight spells is equal to your knight class level plus any other arcane caster levels you may have. This class’s spellcasting progression allows you to quickly approach the highest-level spells available to a single-class spellcaster of your character level, but you will always know fewer spells and be able to cast fewer spells per day than a single-class spellcaster. \n\n Armored Caster (Ex): Normally, armor of any type interferes with an arcane spellcaster’s gestures, which can cause his spells to fail (if those spells have somatic components). At 2nd level, you become more attuned to the Weave and can cast your arcane spells while wearing light armor without incurring the normal arcane spell failure chance. If you wear medium or heavy armor or carry a shield, you incur an arcane spell failure chance if the spell has a somatic component. At 8th level and higher, you can cast your arcane spells in light or medium armor without incurring arcane spell failure. Casting in heavy armor or with a shield still incurs the normal arcane spell failure chance. \n\n Fast Metamagic (Ex): At 4th level you become able to channel extra magic into an arcane spell to employ metamagic feats more efficiently. When spontaneously casting an arcane spell (such as a sorcerer spell or a knight spell) with one or more metamagic effects applied to it, you can expend an extra spell slot to cast the spell without increasing its casting time (as normal for applying metamagic to a spontaneously cast spell). The extra spell slot must equal or exceed the spell slot used to cast the metamagic-affected spell, but need not be from the same spellcasting class. For example, if you wanted to apply your Silent Spell metamagic feat to a magic missile spell, you would normally cast the spell as a full-round action. If you expended an extra spell slot of 2nd level or higher, you could cast the silent magic missile as a standard action instead. You could even quicken the magic missile spell, but you would have to expend a 5th-level or higher spell slot. This ability doesn’t let you apply a metamagic effect if you don’t already have the appropriate feat. \n\n Spellfire (Su): While you are not a natural user of spellfire, your connection to the Weave gives you a limited ability to channel raw magical energy as if you were born with this talent. You cannot absorb spells targeted at you, nor can you store spellfire energy for later use, but you can use your own arcane spell energy to heal (or later, to blast). Starting at 6th level, you can convert your available arcane spells (from any class) to healing spellfire. You can convert a single arcane spell slot or prepared arcane spell as a standard action to heal a target by touch, restoring 2 hit points per spell level expended for this purpose. At 10th level, you can also convert your arcane spells into spellfire blasts that deal damage. As a standard action, you can convert a single arcane spell slot or prepared arcane spell into a ranged touch attack (maximum range 400 feet), dealing 1d6 points of spellfire damage per spell level expended, Reflex DC 20 half. Spellfire damage is half fire damage and half raw magical power; creatures with immunity or resistance to fire apply this effect only to half the damage. See page 56 of the FORGOTTEN REALMS Campaign Setting for more details on this ability. \n\n Multiclassing: A paladin who takes levels in Knight of the Weave can still take levels in paladin. KNIGHT OF THE WEAVE SPELL LIST Knights of the Weave choose their spells from the following list. 1st Level—bless, bless weapon, charm person, command, comprehend languages, cure light wounds, divine favor, lesser restoration, mage armor, magic missile, magic weapon, read magic, shield. 2nd Level—arcane lock, bear’s endurance, bull’s strength, cat’s grace, darkvision, delay poison, eagle’s splendor, resist energy, see invisibility, shield other. 3rd Level—arcane sight, cure moderate wounds, Darsson’s potionMag, daylight, dispel magic, fly, forcewardMag, greater magic weapon, phantom steed, remove curse. 4th Level—break enchantment, cure serious wounds, death ward, lesser globe of invulnerability, mark of justice, neutralize poison, restoration. 5th Level—cure critical wounds, dimension door, disrupting weapon, Mordenkainen’s faithful hound, spell resistance, true seeing. 6th Level—banishment, greater dispel magic, teleport.",
    "spellsPerDayAndKnown": [
      [
        2,
        null,
        null,
        null,
        null,
        null
      ],
      [
        2,
        null,
        null,
        null,
        null,
        null
      ],
      [
        3,
        2,
        null,
        null,
        null,
        null
      ],
      [
        3,
        2,
        null,
        null,
        null,
        null
      ],
      [
        4,
        3,
        2,
        null,
        null,
        null
      ],
      [
        4,
        3,
        2,
        2,
        null,
        null
      ],
      [
        4,
        4,
        3,
        2,
        2,
        null
      ],
      [
        4,
        4,
        3,
        3,
        2,
        2
      ],
      [
        4,
        4,
        4,
        3,
        3,
        2
      ],
      [
        4,
        4,
        4,
        3,
        3,
        3
      ]
    ]
  },
  {
    "id": "cov-moonsea-skysentinel",
    "name": "Moonsea Skysentinel",
    "hitDie": 8,
    "requirements": [
      "Base Attack Bonus: +5.",
      "Skills: Handle Animal 8 ranks, Ride 8 ranks.",
      "Feats: Mounted Combat.",
      "Special: Membership in the Knights of the North."
    ],
    "classSkills": "Climb, Craft, Handle Animal, Intimidate, Jump, Knowledge (geography), Ride, Spot",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Dire hawk steed, magical defense +1"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "Shield 1/day"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Spell turning 1/day"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Magical defense +2"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Shield 2/day"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Spell turning 2/day"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Magical defense +3"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": "+6",
        "ref": "+2",
        "will": "+2",
        "special": "Shield 3/day"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": "+6",
        "ref": "+3",
        "will": "+3",
        "special": "Spell turning 3/day"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": "+7",
        "ref": "+3",
        "will": "+3",
        "special": "Magical defense +4"
      }
    ],
    "classFeaturesText": "The Moonsea skysentinel’s class features make you particularly adept at aerial combat and scouting, while at the same time resistant to magical attacks from your hated foes, the Zhentarim skymages. The combination of offensive specialties and defensive protections make you particularly handy at quick strikes against ground-based foes with little risk to yourself. \n\n Dire Hawk Steed: As a Moonsea skysentinel, you gain a trained dire hawk of Large size as your personal mount. The dire hawk serves you loyally, carrying you into combat or fighting at your side. The dire hawk has maximum hit points but is otherwise a normal specimen of its size. See page 122 for this creature’s statistics block. Your dire hawk steed gains 1 HD for every three class levels you gain beyond 1st (increasing to 10 HD at 4th, to 11 HD at 7th, and to 12 HD at 10th). Each time it gains a Hit Die, its natural armor bonus and Strength score each improve by 2 (in addition to the normal improvements gained with added Hit Dice, such as skill points, feats, and ability score improvements). A dire hawk steed can’t be used as an animal companion. \n\n Magical Defense (Ex): Your training in resisting the deadly spells cast by Zhentarim skymages manifests as a bonus on saving throws against spells and spell-like abilities for both you and your mount. This bonus is +1 starting at 1st level, and it increases to +2 at 4th level, +3 at 7th level, and +4 at 10th level. The ability only functions while you are mounted on your dire hawk steed. \n\n Shield (Sp): Upon reaching 2nd level, you gain an innate ability to withstand incoming attacks from your enemies. Once per day you can use a shield effect. Your caster level is equal to your class level. If you are mounted on your dire hawk, the spell affects both you and your mount, but if you dismount your dire hawk loses the benefit. You can use this ability one additional time per day for every three levels gained above 2nd. \n\n Spell Turning (Sp): Starting at 3rd level, you can use a spell turning effect as an immediate action; the duration is 1 round or until expended. If you are mounted on your dire hawk, the spell affects both you and your mount (and you share a common pool of spell levels affected), but if you dismount your dire hawk loses the benefit. You can use this ability once per day at 3rd level, and one additional time per day for every three levels gained above 3rd."
  },
  {
    "id": "cov-triadic-knight",
    "name": "Triadic Knight",
    "hitDie": 10,
    "requirements": [
      "Patron Deity: Ilmater, Torm, and/or Tyr.",
      "Alignment: Lawful good.",
      "Base Attack Bonus: +5.",
      "Feats: Initiate of IlmaterPG, Initiate of Torm (see page 31), or Initiate of TyrPG; plus Endurance.",
      "Skills: Knowledge (local) 4 ranks, Knowledge (religion) 4 ranks, Knowledge (the planes) 2 ranks.",
      "Special: Aura of good class feature."
    ],
    "classSkills": "Concentration, Craft, Diplomacy, Handle Animal, Heal, Knowledge (local, nobility and royalty, the planes, religion), Profession, Ride, Sense Motive",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, special mount",
        "advancesSpellcasting": false
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "Hands of Ilmater",
        "advancesSpellcasting": true
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Shield other",
        "advancesSpellcasting": true
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Eyes of Tyr",
        "advancesSpellcasting": true
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Discern lies, smite evil 1/day",
        "advancesSpellcasting": true
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Heart of Torm",
        "advancesSpellcasting": true
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Shout, threefold smite",
        "advancesSpellcasting": false
      }
    ],
    "classFeaturesText": "The Triadic knight’s class features combine elements of the paladin with defensive abilities that allow him to remain at full fighting strength even when faced with adverse conditions. \n\n Spellcasting: At each new Triadic knight level other than 1st or 7th, you gain new spells per day and an increase in caster level (and spells known, if applicable) as if you had also gained a level in a divine spellcasting class you belonged to before adding the prestige class. You do not, however, gain all the benefits a character of that class would have gained. If you had more than one divine spellcasting class before becoming a Triadic knight, you must decide to which class you add the new level for purposes of determining spells per day, caster level, and spells known. \n\n Aura of Good (Ex): Your Triadic knight levels stack with other class levels that grant this ability for the purpose of determining the power of your aura of good. \n\n Special Mount (Sp): As a Triadic knight, you gain the service of an unusually intelligent, strong, and loyal steed. See the paladin class feature, page 44 of the Player’s Handbook. Levels of Triadic knight stack with other class levels in classes that grant this feature for the purpose of determining the special mount’s abilities. \n\n Hands of Ilmater (Su): At 2nd level and higher, you can no longer become nauseated or sickened. \n\n Shield Other (Sp): Starting at 3rd level, you can use a shield other effect once per day; your caster level is equal to twice your class level. Triadic knights often call this ability “martyr’s embrace.” \n\n Eyes of Tyr (Su): At 4th level and higher, you can no longer become dazzled or blinded (except by physical damage to your eyes). \n\n Discern Lies (Sp): At 5th level, you become able to use a discern lies effect once per day; your caster level is equal to twice your class level. Triadic knights often call this ability “judge’s insight.” \n\n Smite Evil (Su): Beginning at 5th level, you can smite evil once per day. See the paladin class feature, page 44 of the Player’s Handbook. If you already have this ability from another class, your Triadic knight class levels stack with that class’s levels for the purpose of determining the extra damage dealt. For example, a 5th-level paladin/4th-level Triadic knight would deal an extra 9 points of damage with each successful smite evil attempt. Smite evil attempts per day gained from multiple sources stack. \n\n Heart of Torm (Su): At 6th level, you gain immunity to fear. \n\n Shout (Sp): At 7th level, you can use shout once per day; your caster level is equal to twice your class level. Triadic knights often call this ability “lion’s roar.” \n\n Threefold Smite (Su): At 7th level, you can combine three smite evil attempts in a single attack. Doing this costs you three of your daily smite evil attempts; if you don’t have at least three such attempts remaining, you can’t use this ability. Making a threefold smite requires a full-round action and triples the bonus on damage rolls (but not on attack rolls) normally applied with a smite evil attack. For example, a 5th-level paladin/7th-level Triadic knight would deal an extra 36 points of damage (three times his effective smite evil level of 12th)."
  }
];
