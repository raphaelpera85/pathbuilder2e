// ============================================================================
// D&D 3.5 — Frostburn: classes de prestígio (Cap. 3, pp. 51-74, texto em inglês)
// Extraído da camada de texto do PDF e conferido: tabelas de nível (BBA, Fort,
// Ref, Vont, Especial; colunas de magias do Disciple of Thrym), requisitos,
// perícias de classe e características como impressos. As legendas de imagem,
// cabeçalhos de página e personagens-exemplo foram descartados.
// Classes de prestígio só entram depois do 1º nível: o criador de 1º nível não as usa.
// ============================================================================

export interface Dnd35PrestigeLevel {
  level: number;
  bab: string;
  fort: string;
  ref: string;
  will: string;
  special: string;
  /** Só Disciple of Thrym: magias por dia, colunas 1º a 5º nível (null = "—"). */
  spellsPerDay?: (number | null)[];
}

export interface Dnd35PrestigeClass {
  id: string;
  name: string;
  hitDie: number;
  /** Uma linha por requisito, como impressa ("Skills: …", "Feats: …"). */
  requirements: string[];
  /** Parágrafo impresso, com a habilidade-chave de cada perícia. */
  classSkills: string;
  skillPointsPerLevel: string;
  levels: Dnd35PrestigeLevel[];
  /** Características da classe, uma por parágrafo (separadas por linha em branco). */
  classFeaturesText: string;
  /** Tabela traz "+1 level of existing class" para magias em todos os níveis. */
  advancesExistingSpellcasting?: boolean;
}

export const DND35_FROSTBURN_PRESTIGE_CLASSES: Dnd35PrestigeClass[] = [
  {
    "id": "frostburn-cloud-anchorite",
    "name": "Cloud Anchorite",
    "hitDie": 8,
    "requirements": [
      "Alignment: Any nonchaotic.",
      "Base Fortitude Save: +5.",
      "Skills: Climb 9 ranks, Jump 9 ranks, Knowledge (religion) 9 ranks, Survival 4 ranks.",
      "Feats: Improved Unarmed Combat, Mountaineer.",
      "Special: The prospective student must live for a week on her own in a wilderness region, during which time she can travel no lower than 12,000 feet in altitude."
    ],
    "classSkills": "The cloud anchorite class skills (and the key ability for each skill) are Balance (Dex), Climb (Str), Concentration (Con) Craft (Int), Escape Artist (Dex), Jump (Str), Knowledge (nature) (Int), Knowledge (religion) (Int), Listen (Wis), Spot (Wis), Survival (Wis), Tumble (Dex), and Use Rope (Dex). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "4 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+2",
        "will": "+0",
        "special": "Climb speed +10 ft., wisdom of the mountain"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+3",
        "ref": "+3",
        "will": "+0",
        "special": "Slow breath"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": "+3",
        "ref": "+3",
        "will": "+1",
        "special": "Climb speed +20 ft., bonus feat"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Resistance to cold 5, fast movement +10 ft."
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Climb speed +30 ft., empty stride"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": "+5",
        "ref": "+5",
        "will": "+2",
        "special": "Improved slow breath, acrobatic charge"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": "+5",
        "ref": "+5",
        "will": "+2",
        "special": "Climb speed +40 ft., bonus feat"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": "+6",
        "ref": "+6",
        "will": "+2",
        "special": "Resistance to cold 10, fast movement +20 ft."
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": "+6",
        "ref": "+6",
        "will": "+3",
        "special": "Climb speed +50 ft., walk on the clouds"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": "+7",
        "ref": "+7",
        "will": "+3",
        "special": "Immortality of the mountain"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Cloud anchorites gain no proficiency with any weapon, armor or shield.\n\n Monk Abilities: A cloud anchorite’s class levels stack with her monk levels for determining her unarmed damage and AC bonus.\n\n Climb Speed (Ex): At 1st level, a cloud anchorite gains a climb speed of 10 feet. She gains a +8 racial bonus on all Climb checks. A cloud anchorite must make a Climb check to climb any wall or slope with a DC of more than 0, but she can always choose to take 10, even if rushed or threatened while climbing. She cannot use the run action while climbing. She retains her Dexterity bonus to Armor Class (if any) while climbing, and opponents get no special bonus on their attacks against her while she is climbing. A cloud anchorite in armor (even light armor) or carrying a medium or heavy load loses this extra speed. As the cloud anchorite gains levels, her climb speed increases. At each odd-numbered level, she gains a +10-foot bonus to her current climb speed. If the cloud anchorite already possesses a climb speed (for example, if she possessed a racial climb speed before becoming a cloud anchorite), these bonuses stack with her current climb speed.\n\n Wisdom of the Mountain (Ex): A cloud anchorite adds her Wisdom modifier on Balance, Climb, and Jump checks made in mountain terrain. In addition, the cloud anchorite can always take 10 on a Balance, Climb, or Jump check, even if circumstances would normally prevent her from doing so.\n\n Slow Breath (Ex): At 2nd level, a cloud anchorite’s breathing slows to a fraction of what it used to be. She can hold her breath twice as long as normal, and gains a +2 bonus on all Fortitude saving throws against inhaled poisons, fatigue caused by high elevation, and altitude sickness. At 6th level, her bonus on these Fortitude saving throws increases to +6.\n\n Bonus Feat: At 3rd level and again at 7th level, a cloud anchorite gains a bonus feat. This feat must be selected from the following list, and she must qualify for any prerequisites the feat to be chosen might require: Acrobatic, Agile, Athletic, Cold Endurance, Endurance, Great Fortitude, Improved Cold Endurance, Self-Sufficient, Skill Focus (in any class skill), or Track.\n\n Resistance to Cold (Su): At 4th level, a cloud anchorite gains resistance to cold 5. This increases to resistance to cold 10 at 8th level.\n\n Fast Movement (Ex): At 4th level, a cloud anchorite gains a +10-foot enhancement bonus to her land speed. A cloud anchorite in armor (even light armor) or carrying a medium or heavy load loses this extra speed. At 8th level, this bonus increases to +20 feet.\n\n Empty Stride (Su): At 5th level, a cloud anchorite’s stride is nearly weightless. She gains a +4 bonus on all Balance checks. More impressively, she can walk on the surface of any material into which she would normally sink, such as powdery snow, thin ice, and even water. She may continue to walk on this surface as long as she makes a DC 15 Concentration check. Normally, the Concentration check for this activity is a standard action, so a cloud anchorite may make one move action per round while using her empty stride ability. If she makes a DC 30 Concentration check, she may concentrate on her Empty Stride ability as a move action instead, allowing her to use it and still take one standard action in a round. She does not trigger traps that use pressure plates while using empty stride, nor is her speed impacted by deep snow.\n\n Acrobatic Charge (Ex): At 6th level, a cloud anchorite gains the ability to charge in situations where others cannot. She may charge over difficult terrain that normally slows movement. This enables her to run down steep rock faces, leap down from an outcropping, or tumble over \n small boulders to get to the target of her charge. Depending on the circumstances, she may still need to make appropriate checks (Jump or Tumble checks in particular) to successfully move over the terrain.\n\n Walk on the Clouds (Su): At 9th level, a cloud anchorite can use her empty stride ability as a free action at all times. Additionally, once per day she may use air walk as a quickened spell-like ability. This effect manifests at a caster level equal to her cloud anchorite level.\n\n Immortality of the Mountain (Su): Upon reaching 10th level, a cloud anchorite has achieved the apotheosis she has sought. She no longer has a maximum age, and will never die of old age. Additionally, she no longer has to make saving throws to avoid altitude sickness or fatigue from thin air, and gains a +2 sacred bonus on all Wisdom checks and all saving throws while in mountain terrain."
  },
  {
    "id": "frostburn-cryokineticist",
    "name": "Cryokineticist",
    "hitDie": 8,
    "requirements": [
      "Alignment: Any lawful.",
      "Skills: Concentration 8 ranks, Craft (alchemy) 1 rank, Knowledge (psionics) 2 ranks.",
      "Powers: Able to manifest the energy emanation power."
    ],
    "classSkills": "The cryokineticist’s class skills (and the key ability for each skill) are Climb (Str), Concentration (Con), Craft (any) (Int), Intimidate (Cha), Jump (Str), Knowledge (psionics), and Psicraft (Int). See Chapter 4 of the Player’s Handbook or Chapter 3 of the Expanded Psionics Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+2",
        "will": "+0",
        "special": "Glacial ray"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+3",
        "ref": "+3",
        "will": "+0",
        "special": "Cold adaptation, frozen fist"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": "+3",
        "ref": "+3",
        "will": "+1",
        "special": "Bolt of cold"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Weapon afrost"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Frostfell creature insight"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": "+5",
        "ref": "+5",
        "will": "+2",
        "special": "Cold walk"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": "+5",
        "ref": "+5",
        "will": "+2",
        "special": "Fear no cold"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": "+6",
        "ref": "+6",
        "will": "+2",
        "special": "Greater weapon afrost"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": "+6",
        "ref": "+6",
        "will": "+3",
        "special": "Wall of ice"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": "+7",
        "ref": "+7",
        "will": "+3",
        "special": "Bone chill"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Cryokineticists gain no proficiency with any weapons, armor, or shields.\n\n Glacial Ray (Ps): A cryokineticist can launch a frigid ray that freezes water and damages living creatures. The ray does 1d12 points of cold damage to any living creature on a successful ranged touch attack (up to 15 feet). The ray also freezes one pint of water per level of cryokineticist.\n\n Cold Adaptation (Ex): At 2nd level, the cryokineticist becomes resistant to cold, gaining a +4 bonus on all saving throws against cold and cold spells and spell-like abilities. In addition, the cryokineticist gains resistance to cold 10.\n\n Frozen Fist (Ps): At 2nd level, the cryokineticist can activate this psi-like ability as a move action. One of the cryokineticist’s clenched fists freezes into a solid block of ice that does him no harm, but causes his unarmed attacks to be treated as armed. A Medium cryokineticist deals 1d6 points of bludgeoning damage and 1d8 points of cold damage instead of any other special damage from the unarmed attack. The bludgeoning damage changes based on size, but the cold damage remains 1d8. This ability lasts a number of rounds equal to the cryokineticist’s class level.\n\n Bolt of Cold (Ps): Beginning at 3rd level, three times per day, the cryokineticist can launch a bolt of psionically manifested cold up to 60 feet at any target in line of sight as a standard action. This psi-like ability is treated as a ranged touch attack and deals 3d6 points of cold damage.\n\n Weapon Afrost (Ps): At 4th level, as a move action, the cryokineticist can cause a melee weapon he wields to become sheathed in a layer of intense cold, granting the weapon the frost special ability (+1d6 points of cold damage on a successful strike). If he lets go of the weapon, the frost dissipates immediately, otherwise it lasts for a number of rounds equal to his cryokineticist class level.\n\n Frostfell Creature Insight (Ex): At 5th level, the cryokineticist gains a +2 insight bonus on attack and damage rolls against all creatures with the cold subtype.\n\n Cold Walk (Ps): Starting at 6th level, the cryokineticist can walk on air that is 32° F or colder (cold, severe cold, extreme cold or unearthly cold temperatures). He moves at his normal speed in all directions, including vertically, but cannot move more than double his speed in a single round. A coldwalker leaves footprints of coldfire in the air that disperse in 2 rounds, but his tread does not deal damage. He must pay 1 power point per round traveled in this fashion.\n\n Fear No Cold (Ex): At 7th level, the cryokineticist is perfectly at home in cold temperatures. He now has a +8 bonus on all saving throws against cold and cold spells and spell-like abilities, and resistance to cold 20. Greater Weapon Afrost (Ps): At 8th level, the cryokineticist’s weapon afrost ability improves, dealing +2d6 points of cold damage on a successful strike. In addition, the cryokineticist can instead choose to apply this ability to his frozen fist (see above), which increases the cold damage of frozen fist from 1d8 to 2d8.\n\n Wall of Ice (Ps): At 9th level, the cryokineticist gains the ability to create walls of ice, as the spell wall of ice. It is a full-round action to use this psi-like ability, and the cryokineticist must expend his psionic focus. The cryokineticist manifests this as a psi-like ability but otherwise it is just as if a 9th-level sorcerer cast the spell wall of ice.\n\n Bone Chill (Ps): At 10th level, the cryokineticist gains the ability to create a massive burst of supernal cold around him, flash-freezing everything in the area. Once per day, the cryokineticist can use this psi-like ability to deal 9d6+21 points of cold damage in a 30-foot-radius burst emanating from himself (Fortitude save DC 15 + Cha modifier for half damage). Any creature failing its Fortitude saving throw against bone chill must succeed on a second Fortitude saving throw at the same DC or die due to the extreme shock of the intense cold."
  },
  {
    "id": "frostburn-disciple-of-thrym",
    "name": "Disciple of Thrym",
    "hitDie": 10,
    "requirements": [
      "Alignment: Any nongood.",
      "Skills: Intimidate 4 ranks, Survival 8 ranks.",
      "Base Attack Bonus: +4.",
      "Feat: Weapon Focus (greataxe).",
      "Special: Cold Endurance feat or cold subtype."
    ],
    "classSkills": "The disciple of Thrym’s class skills (and the key ability for each skill) are Concentration (Con), Craft (Int), Diplomacy (Cha), Knowledge (the planes) (Int), Knowledge (religion) (Int), Profession (Wis), Sense Motive (Wis), Speak Language (none), Spellcraft (Int), and Survival (Wis). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+0",
        "ref": "+0",
        "will": "+2",
        "special": "Detect fire, protection of winter",
        "spellsPerDay": [
          1,
          null,
          null,
          null,
          null
        ]
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+0",
        "ref": "+0",
        "will": "+3",
        "special": "Resistance to fire 5",
        "spellsPerDay": [
          2,
          null,
          null,
          null,
          null
        ]
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+1",
        "ref": "+1",
        "will": "+3",
        "special": "Powerful grip",
        "spellsPerDay": [
          2,
          1,
          null,
          null,
          null
        ]
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+1",
        "ref": "+1",
        "will": "+4",
        "special": "Frost greataxe",
        "spellsPerDay": [
          3,
          2,
          null,
          null,
          null
        ]
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+1",
        "ref": "+1",
        "will": "+4",
        "special": "Agonizing strike 1/day",
        "spellsPerDay": [
          3,
          2,
          1,
          null,
          null
        ]
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+2",
        "ref": "+2",
        "will": "+5",
        "special": "Resistance to fire 10",
        "spellsPerDay": [
          3,
          3,
          2,
          null,
          null
        ]
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+2",
        "ref": "+2",
        "will": "+5",
        "special": "Dispel fire",
        "spellsPerDay": [
          4,
          3,
          2,
          1,
          null
        ]
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": "+2",
        "ref": "+2",
        "will": "+6",
        "special": "Icy greataxe",
        "spellsPerDay": [
          4,
          3,
          3,
          2,
          null
        ]
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": "+3",
        "ref": "+3",
        "will": "+6",
        "special": "Agonizing strike 2/day",
        "spellsPerDay": [
          4,
          4,
          3,
          2,
          1
        ]
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": "+3",
        "ref": "+3",
        "will": "+7",
        "special": "Immunity to Fire",
        "spellsPerDay": [
          4,
          4,
          3,
          3,
          2
        ]
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Disciples of Thrym are proficient with all simple and martial weapons, with all types of armor, and with shields.\n\n Spells per Day: A disciple of Thrym can cast a small number of divine spells. To cast a spell, the disciple must have a Wisdom score of at least 10 + the spell’s level. The disciple of Thrym’s spells are based on Wisdom, and saving throws against these spells have a DC of 10 + spell level + the disciple’s Wisdom modifier. A disciple of Thrym otherwise casts spells as a cleric does, although he cannot swap out prepared spells to spontaneously cast cure or inflict spells. The disciple’s spell list appears at the end of this prestige class description; when he prepares spells, he may select from any of the spells on this list.\n\n Detect Fire (Sp): At 1st level, the disciple of Thrym can detect fire at will as a cleric of a level equal to his class level.\n\n Protection of Winter (Su): At 1st level, the disciple of Thrym gains greater protection based on the local temperature. In cold areas (temperature at or below 40° F), he gains +1 sacred bonus on all saving throws and a +1 bonus to Armor Class. In areas of extreme cold (below –20° F), the sacred bonus is increased to +2 on all saves and AC. Resistance to Fire (Ex): At 2nd level, the disciple of Thrym gains resistance to fire 5. At 6th level, this increases to resistance to fire 10. Powerful Grip (Ex): At 3rd level, the disciple of Thrym gains a damage bonus equal to half his Strength bonus when he attacks with a greataxe. This means he adds 2 times his Strength bonus on his damage rolls instead of 1–1/2 times his Strength bonus when wielding the weapon in two hands. Frost Greataxe (Sp): At 4th level, as a move action, the disciple of Thrym can cause a greataxe he wields to become sheathed in a layer of intense cold, granting the axe the frost special ability (+1d6 points of cold damage on a successful strike). If he lets go of the axe, the frost dissipates immediately; other wise it lasts for a number of rounds equal to his class level.\n\n Agonizing Strike (Su): At 5th level, the disciple of Thrym gains the ability to focus all the anger and hatred in his frozen heart into a single blow once per day. He makes a normal melee attack; if he hits, he deals +1d6 points of cold damage for every two class levels (+2d6 at 5th, +3d6 at 6th, +4d6 at 8th, and +5d6 at 10th level). If the attack misses, the agonizing strike is still used up for the day. At 9th level, the disciple can perform this strike twice per day.\n\n Dispel Fire (Sp): At 7th level, the disciple of Thrym can dispel fire as a cleric of the same level a number of times per day equal to 1 + his Charisma modifier.\n\n Icy Greataxe (Sp): At 8th level, as a move action, the disciple of Thrym can cause a greataxe he wields to become sheathed in a layer of intense cold, granting the axe the icy burst special ability (+1d6 points of cold damage on a successful strike, plus an extra 2d10 points of cold damage on a successful critical). If he lets go of the axe, the frost dissipates immediately, otherwise it lasts for a number of rounds equal to his class level.\n\n Immunity to Fire (Ex): At 10th level, the disciple of Thrym gains immunity to fire, becoming prepared for the burning flames of Surtur that will destroy the multiverse. Disciple of Thrym Spell List Disciples of Thrym choose their spells from the following list: 1st Level: cause fear, corrupt weapon, detect fire*, divine favor, doom, ease of breath*, lesser frostburn*, magic weapon, obscuring mist, protection from good/law, lesser shivering touch*. 2nd Level: blood snow*, bull’s strength, chill metal, conjure ice object*, eagle’s splendor, fog cloud, frost weapon*, zone of glacial cold*. 3rd Level: binding snow*, ice shape*, lesser aura of cold*, meld into ice*, shivering touch*, sleet storm. 4th Level: boreal wind*, glacial globe of invulnerability*, frostburn*, hibernal healing*, summon giants*. 5th Level: dispel fire*, dispel good/law, entomb*, frostbite*, ice storm, stoneskin, wall of ice. *New spell described in Chapter 5."
  },
  {
    "id": "frostburn-frost-mage",
    "name": "Frost Mage",
    "hitDie": 4,
    "requirements": [
      "Feats: Frozen Magic.",
      "Skills: Knowledge (arcana) 8 ranks.",
      "Spells: Able to cast 1st-level arcane spells.",
      "Special: The character must spend 24 hours unprotected in a blizzard."
    ],
    "classSkills": "The frost mage’s class skills (and the key ability for each skill) are Concentration (Con), Craft (alchemy) (Int), Knowledge (all skills, taken individually) (Int), Profession (Wis), Search (Int), and Spellcraft (Int). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+0",
        "ref": "+0",
        "will": "+2",
        "special": "Natural armor increase (+1)"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+0",
        "ref": "+0",
        "will": "+3",
        "special": "Resistance to cold 10"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": "+1",
        "ref": "+1",
        "will": "+3",
        "special": "Gain knowledge"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": "+1",
        "ref": "+1",
        "will": "+4",
        "special": "Natural armor increase (+2), Piercing Cold"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": "+1",
        "ref": "+1",
        "will": "+4",
        "special": "Gain knowledge"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": "+2",
        "ref": "+2",
        "will": "+5",
        "special": ""
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": "+2",
        "ref": "+2",
        "will": "+5",
        "special": "Natural armor increase (+3), Gain knowledge"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": "+2",
        "ref": "+2",
        "will": "+6",
        "special": ""
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": "+3",
        "ref": "+3",
        "will": "+6",
        "special": "Gain knowledge"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": "+3",
        "ref": "+3",
        "will": "+7",
        "special": "Natural armor increase (+4), one with cold"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Frost mages gain no proficiency with any weapons, armor, or shields. Spells per Day/Spells Known: At every level gained in the frost mage class, the character gains new spells per day (and spells known, if applicable) as if he had also gained a level in a spellcasting class he belonged to before adding the prestige class. He does not, however, gain any other benefit a character of that class would have gained (metamagic or item creation bonus feats, hit points beyond those he receives from the prestige class, and so on), except for an increased effective level of spellcasting. If a character has more than one spellcasting class before becoming a frost mage, he must decide to which class he adds the new level for purposes of determining spells per day and spells known.\n\n Natural Armor Increase (Ex): At 1st, 4th, 7th, and 10th level, a frost mage’s body becomes more like the ice he venerates. His skin turns whiter and colder to the touch as the permanent layer of frost grows deeper. This provides an increase to the character’s existing natural armor, as indicated on Table 3–5 (the numbers represent the total increase gained to that point) and he takes no damage from cold environments. In warm temperatures, the frost continually evaporates and replenishes itself, enshrouding the frost mage in a wispy vapor.\n\n Resistance to Cold (Ex): Starting at 2nd level, the frost mage’s icy skin grants him resistance to cold 10.\n\n Gain Knowledge (Ex): Beginning at 3rd level, the frost mage gains knowledge of the spell conjure ice beast I, if he does not already have it. Former wizards get to add this spell to their spellbooks for free, and former sorcerers and bards get to add this spell to their spells known, even if this takes them over their normal limit. For each two levels gained in the prestige class, he gains knowledge of the next higher level in the conjure ice beast spell progression (conjure ice beast II at 5th level, conjure ice beast III at 7th level, and conjure ice beast IV at 9th level). At 7th level, in addition to gaining conjure ice beast III, the frost mage gains animate snow as a spell known. At 9th level, in addition to gaining conjure ice beast IV, the frost mage gains frostfell as a spell known. This class feature does not change the level of the spell. A frost mage still must have a spell slot of the appropriate level to prepare or cast a spell acquired through the gain knowledge ability.\n\n Piercing Cold: At 4th level, the frost mage gains Piercing Cold as a bonus metamagic feat. In addition to the normal benefits of the feat, the frost mage bypasses all resistances and immunities to cold granted by spells and spell-like effects of magic items (for example, a ring of minor energy resistance [cold]).\n\n One with Cold (Ex): At 10th level, the frost mage’s body has become perfectly adapted to cold energy. He gains the cold subtype, granting him immunity to cold. His oneness with cold, however, makes him more susceptible to flame. Just like any other creature with the cold subtype, he gains vulnerability to fire, which means he takes half again as much (+50%) damage as normal from fire, regardless of whether or not a saving throw is allowed, or if the save is a success or a failure.",
    "advancesExistingSpellcasting": true
  },
  {
    "id": "frostburn-frostrager",
    "name": "Frostrager",
    "hitDie": 12,
    "requirements": [
      "Base Attack Bonus: +6.",
      "Skills: Intimidate 4 ranks, Survival 4 ranks.",
      "Feats: Frozen Berserker, Improved Unarmed Strike, Power Attack.",
      "Special: Rage as a class ability.",
      "Special: The character must have been reduced to fewer than 0 hit points by cold damage (either from magical cold attacks or by taking enough damage from exposure to extreme cold environments). Whether or not this trauma is what allows the frostrage to take root in the character’s soul, or if the trauma merely unhinges the character’s mind enough that he decides to become a frostrager, is unknown."
    ],
    "classSkills": "The frostrager’s class skills (and the key ability for each skill) are Climb (Str), Intimidate (Cha), Jump (Str), Listen (Wis), Survival (Wis), and Swim (Str). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Frostrage, freezing blood"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "One-two punch"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Absorb cold"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Improved frostrage"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Rend"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Frostragers gain no proficiency with any weapon, armor, or shields.\n\n Frostrage (Su): While raging, the character grows larger and more massive, and his freezing sweat forms icicles as it streams out of his pores, coating his body in a glittering crust of ice. The frostrager’s actual size category does not change (nor does his space/reach), but he does gain a +4 natural armor bonus to Armor Class from the sheets of ice that form over his body. In addition, a frostrager’s unarmed attacks deal 1d6 points of damage plus 1d4 points of cold damage on a successful hit. If the frostrager is Small, his unarmed attack deals 1d4 points of damage, and if the frostrager is Large, his unarmed attack deals 1d8 points of damage.\n\n Freezing Blood (Su): At 1st level, a frostrager’s blood becomes freezing cold. His wounds instantly freeze over and stop bleeding; he is immune to attacks that cause wounding effects. If reduced to negative hit points, he automatically stabilizes. He still takes 1 point of damage if he takes any actions while at 0 or negative hit points, however.\n\n One-Two Punch (Ex): At 2nd level, while making an unarmed attack, the frostrager may make one extra attack in a round at his highest base attack bonus, but each attack made in that round (the extra one and the normal ones) take a –2 penalty.\n\n Absorb Cold (Su): At 3rd level, while raging, the frostrager not only gains immunity to cold, but it heals him. For every 2 points of cold damage that would have otherwise have been dealt by an attack, the frostrager heals 1 point of damage.\n\n Improved Frostrage (Su): At 4th level while raging, the frostrager’s natural armor bonus increases to +6. His unarmed attacks deal 1d8 points of damage plus 1d6 points of cold damage on a successful hit. If the frostrager is Small, his unarmed attack deals 1d6 points of damage, and if the frostrager is Large, his unarmed attack deals 2d6 points of damage.\n\n Rend (Ex): At 5th level, a frostrager gains the ability to rend a target. In any round that the frostrager hits the same foe with two or more unarmed attacks, he immediately deals an additional 2d8 points of damage (plus 1-1/2 times his Strength bonus), plus an additional 1d6 points of cold damage. If he is Small, his rend deals 2d6 points of damage; if he is Large, his rend deals 3d8 points of damage."
  },
  {
    "id": "frostburn-knight-of-the-iron-glacier",
    "name": "Knight of the Iron Glacier",
    "hitDie": 10,
    "requirements": [
      "Alignment: Lawful good or lawful neutral.",
      "Skills: Handle Animal 5 ranks, Ride 9 ranks, Survival 2 ranks.",
      "Feats: Animal Affinity, Exotic Weapon Proficiency (bastard sword), Mounted Combat, Ride-By Attack.",
      "Special: Before a character is accepted into the Order of the Iron Glacier, she must first prove to the order that her intentions are noble and true. Typically, this means the character must undertake some form of task or quest in a region of the frostfell, such as defending a remote village from an attack by orcs or slaying a white dragon that has been menacing a region. Usually, high-ranking knights will send aspiring knights on a particular quest, but sometimes they waive this requirement for someone they have seen upholding Iron Glacier ideals even though she has not herself approached the order for membership."
    ],
    "classSkills": "The Knight of the Iron Glacier class skills (and the key ability for each skill) are Craft (Wis), Diplomacy (Cha), Handle Animal (Cha), Heal (Wis), Knowledge (geography) (Int), Knowledge (history) (Int), Knowledge (local) (Int), Listen (Wis), Ride (Dex), Sense Motive (Wis), Spot (Wis), and Survival (Wis). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+2",
        "special": "Warmount"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+3",
        "special": "Frostfell awareness +2"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+3",
        "special": ""
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Rally the troops"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Frostfell awareness +4"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": ""
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Oath of wrath"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": "+6",
        "ref": "+2",
        "will": "+6",
        "special": "Frostfell awareness +6"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": ""
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": "+7",
        "ref": "+3",
        "will": "+7",
        "special": "Overwhelming odds"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Knights of the Iron Glacier gain no proficiency with weapons, armor, or shields.\n\n Warmount: Upon becoming a Knight of the Iron Glacier, the character is awarded his own specially bred and trained mount, a war megaloceros. The character is expected to care for, feed, and protect his warmount; when a mission does not require the aid of the warmount, it can be stabled at no cost at any Iron Glacier stronghold.\n\n War Megaloceros: Large animal; HD 7d8+28; hp 59; Init +1; Spd 50 ft.; AC 14, touch 10, flat-footed 13; Base Atk +5; Grp +15; Atk or Full Atk +10 melee (1d8+9, gore); Space/Reach 10 ft./5 ft.; SA improved grab, stampede, toss; SQ combative mount, low-light vision, scent; AL N; SV Fort +10, Ref +8, Will +6; Str 23, Dex 12, Con 19, Int 2, Wis 13, Cha 8.\n\n Skills and Feats: Listen +9, Spot +9; Alertness, Lightning Reflexes, Run.\n\n Combative Mount (Ex): A rider on a war megaloceros gains a +2 circumstance bonus on all Ride checks. A war megaloceros is trained for war.\n\n Skills: A war megaloceros gains a +1 racial bonus on Listen and Spot checks. If the knight has enough paladin levels that he has a paladin’s special mount, the character has the option of dismissing his current special mount and replacing it with a war megaloceros special mount. In this case, the warmount functions identically to the paladin’s special mount except for the improved base statistics given above. The character’s paladin levels and Knight of the Iron Glacier levels stack for purposes of determining what sort of bonus Hit Dice, natural armor adjustments, Strength adjustments, base Intelligence, and special abilities the special mount gains.\n\n Frostfell Awareness (Ex): A Knight of the Iron Glacier trains extensively on how to notice signs of danger in the frostfell, and is quite adept at spotting ambushes and similar danger. Starting at 2nd level, as long as he is in the frostfell, he gains a +2 competence bonus on all Initiative, Listen, and Spot checks. This bonus increases to +4 at 5th level and to +6 at 8th level.\n\n Rally the Troops (Su): At 4th level, the Knight of the Iron Glacier’s ability to inspire allies has become so potent that his words take on a supernatural divine power. Once per day, the knight may speak to a number of listeners equal to his class level plus his Charisma modifier. \n He must speak for at least one minute, after which all listeners are filled with hope and bravery. For the next hour, these creatures gain a +2 morale bonus on attack rolls and Will saving throws, and have immunity to fear (magic or otherwise).\n\n Oath of Wrath (Su): Beginning at 7th level, as a free action, the Knight of the Iron Glacier may select a single opponent within 60 feet and swear an oath to defeat him. For the duration of the encounter, the knight gains a +2 morale bonus on melee attack rolls, weapon damage rolls, saving throws, and skill checks made against the challenged target. This effect ends immediately if the Knight of the Iron Glacier makes an attack or casts a spell targeted at any hostile creature other than the challenged target. Attacks of opportunity and spells cast on allies do not end the effect, nor do area spells such as fireball that catch other creatures in the area (as long as the challenged target is included in the area). The Knight of the Iron Glacier can use oath of wrath once per day. Overwhelming Odds (Ex): A 10th-level Knight of the Iron Glacier has expelled from his mind and soul the very notion of a hopeless battle; no matter how slight, there is always a chance for victory. Whenever the Knight of the Iron Glacier faces an enemy in combat that has 3 or more Hit Dice or levels than he does, the knight’s faith that he shall prevail grants him damage reduction 3/— and a +2 insight bonus to his Armor Class and all saving throws. These benefits apply only against attacks made against the knight from a creature whose levels or Hit Dice exceed the knight’s by 3 or more; if a creature with fewer Hit Dice or levels attacks the knight, he does not receive these benefits."
  },
  {
    "id": "frostburn-primeval",
    "name": "Primeval",
    "hitDie": 10,
    "requirements": [
      "Alignment: Any nonlawful.",
      "Base Attack Bonus: +8.",
      "Skills: Handle Animal 5 ranks, Knowledge (nature) 5 ranks, Survival 5 ranks.",
      "Feats: Endurance, Self-Sufficient, Toughness."
    ],
    "classSkills": "The primeval class skills (and the key ability for each skill) are Climb (Str), Concentration (Con), Handle Animal (Cha), Intimidate (Cha), Jump (Str), Knowledge (nature) (Int), Listen (Wis), Spot (Wis), Survival (Wis), and Swim (Str). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Primeval form 1/day, animal empathy"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "Regression 1, low-light vision"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Feral power"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Primeval form 2/day"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Regression 2, scent"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Feral power 2"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Primeval form 3/day"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": "+6",
        "ref": "+2",
        "will": "+2",
        "special": "Regression 3, fast movement"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": "+6",
        "ref": "+3",
        "will": "+3",
        "special": "Feral power 3"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": "+7",
        "ref": "+3",
        "will": "+3",
        "special": "Primeval form 4/day, primeval shapechanger"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Primevals gain no proficiency with weapons, armor, or shields. (They are proficient with their natural weapons while in primeval form, though.)\n\n Primeval Form (Su): The primary ability of the primeval is the supernatural ability to assume an alternate form. This functions similarly to the druid’s wild shape ability, except the alternate form chosen must be selected when the character takes his first level of primeval and cannot be changed after that. Each time the character changes form with this ability, he assumes the same form. At 1st level, he may change shape into his primeval form once per day. He can use this ability one additional time each day at 4th level, 7th level, and again at 10th level. This ability functions like the polymorph spell, except as noted here. It lasts for 1 minute per primeval level, or until he changes back. Changing form (into either form) is a standard action and doesn’t provoke attacks of opportunity. The primeval does not assume the animal’s physical ability scores. Instead, he adds the animal’s ability score –10 (for even scores) or –11 (for odd scores) to his own ability scores. For example, a primeval with a Strength score of 16 who assumes the form of a dire lion (Strength 25) adds +14 to his normal Strength of 16 to determine his Strength score in his primeval form. Remember, items that enhance the character’s ability scores may be rendered inoperative by his change in form. The primeval loses his ability to speak while in primeval form because he is limited to the sounds that the form can make naturally. The primeval form chosen must be a prehistoric animal of some sort (dinosaur, dire animal, or other creature approved by the DM). The primeval form chosen must have no more than 8 HD and cannot be more than one size category larger than the primeval (so a Small character is limited to Medium animals or smaller, and a Medium character is limited to Large or smaller animals). The primeval form can be from any terrain familiar to the character. Appropriate primeval forms for a frostfell environment from the Monster Manual and this book include the dire lion, dire wolf, dire wolverine, and megaloceros. If the primeval has the wild shape ability from other class levels, he may use wild shape to assume his primeval form. He cannot use his primeval form ability to wild shape, however.\n\n Animal Empathy (Ex): In any form, the primeval can communicate with animals of his chosen primeval form (or related types). For example, a primeval whose primeval form is a dire wolf may communicate with wolves and dire wolves. He gains a +4 bonus on Charisma-based checks against animals of his chosen primeval form and related animals.\n\n Regression (Su): As a primeval gains levels, he begins to physically regress into a more primal, feral version of himself. At 2nd level, the primeval reduces his Intelligence and Charisma scores by 1 point (to a minimum of 3) and gains 1 point of Strength, Dexterity, Constitution, and Wisdom. At 5th level, he repeats his regression, losing an additional point of Intelligence and Charisma, and gaining an additional point to the rest of his ability scores. At 8th level, the primeval regresses again, losing a third point of Intelligence and Charisma but gaining a third point to the rest of his ability scores.\n\n Low-Light Vision (Ex): In any form, the primeval gains low-light vision at 2nd level. He can see twice as far as a human in starlight, moonlight, torchlight, and similar conditions of poor illumination. He retains the ability to distinguish color and detail under these conditions. If the primeval already has racial low-light vision, he can instead see four times as far as a human.\n\n Feral Power (Ex): As the primeval gains levels, his primeval form grows stronger and tougher, as shown below: Primeval Class Level Characteristic 3rd 6th 9th Strength +2 +4 +6 Dexterity +2 +2 +2 Constitution +2 +4 +4 Natural armor +2 +4 +8 These bonuses are not cumulative. For example, a 6th-level primeval whose primeval form is a dire lion has Str 29, Dex 17, Con 21, and a natural armor bonus of +8, instead of Str 25, Dex 15, Con 17, and natural armor +4.\n\n Scent (Ex): At 5th level, the primeval form gains the scent special quality in any form.\n\n Fast Movement (Ex): As he grows closer to his animal spirit, the primeval becomes quicker in his humanoid form. At 8th level, his base land speed improves by 10 feet. This benefit does not apply if the primeval is wearing heavy armor or carrying a heavy load. Primeval Shapechanger (Su): The primeval unites with his animal spirit at 10th level. His type changes to magical beast (shapechanger), which means that he is no longer subject to spells that affect humanoids. In addition, he gains damage reduction 10/ magic in any form. His natural attacks (but not weapon attacks) overcome damage reduction as if they were magic weapons."
  },
  {
    "id": "frostburn-rimefire-witch",
    "name": "Rimefire Witch",
    "hitDie": 6,
    "requirements": [
      "Skills: Concentration 6 ranks, Knowledge (history) 6 ranks, Knowledge (religion) 9 ranks, Spellcraft 6 ranks.",
      "Feats: Iron Will, Mark of Hleid.",
      "Spells: Able to cast 1st-level divine spells.",
      "Patron Deity: Hleid.",
      "Special: Once a character meets all the requirements listed above, she soon has a vivid dream in which she receives a call from a rimefire eidolon. Once she wakes from the dream, she knows the most direct route to the rimefire eidolon’s iceberg, as if she had cast discern location to find it. This call does not force the character to answer, but until she travels to the iceberg and accepts the bond of the rimefire eidolon that dwells within, she cannot take any levels of rimefire witch. The journey to the iceberg should be played out as a minor quest, perhaps with some encounters with Iborighu cultists bent on preventing the rise of a new rimefire witch."
    ],
    "classSkills": "The rimefire witch’s class skills (and the key ability for each skill) are Climb (Str), Concentration (Con), Diplomacy (Cha), Gather Information (Cha), Heal (Wis), Jump (Str), Knowledge (arcana) (Int), Knowledge (history) (Int), Knowledge (religion) (Int), Sense Motive (Wis), Spellcraft (Int), and Swim (Str). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+0",
        "will": "+2",
        "special": "Rimefire bond, detect minion of Iborighu"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+3",
        "ref": "+0",
        "will": "+3",
        "special": ""
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": "+3",
        "ref": "+1",
        "will": "+3",
        "special": "Rimefire bolt (1d6)"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Ice skate"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": ""
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Rimefire bolt (2d6)"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Word of recall"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": "+6",
        "ref": "+2",
        "will": "+6",
        "special": ""
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": "Rimefire bolt (3d6)"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": "+7",
        "ref": "+3",
        "will": "+7",
        "special": "Iceberg, rimefire apotheosis"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Rimefire witches gain proficiency with the trident. The trident is the favored weapon of Hleid, and many rimefire witches choose to wield tridents as well. They gain no other proficiency with weapons, armor, or shields. Spells per Day/Spells Known: When a new rimefire witch level is gained, the character gains new spells per day (and spells known, if applicable) as if she had also gained a level in a spellcasting class she belonged to before adding the prestige class. She does not, however, gain any other benefit a character of that class would have gained (improved chance of controlling or rebuking undead, metamagic or item creation feats, and so on), except for an increased effective level of spellcasting. If a character had more than one spellcasting class before becoming a rimefire witch, she must decide to which class she adds the new level for purposes of determining spells per day and spells known.\n\n Rimefire Bond (Su): A rimefire witch becomes bonded on a deeply spiritual level with the rimefire eidolon that selected her as its guardian. Both the witch and the eidolon are constantly aware of the other’s location and condition, as if both were under the effects of a status spell. This is a permanent effect that cannot be dispelled or destroyed. The bond also shores up the mind and will to live of the witch and her eidolon; both gain a +2 morale bonus on all saving throws against mind-affecting and death effects while the other is alive. A rimefire bond is powerful enough that it even extends across planes. If a rimefire witch or her eidolon is killed, this bond is broken. A surviving rimefire witch loses all her supernatural and spell-like abilities granted by this class (but not her spellcasting ability) until she restores the slain eidolon to life and returns it to its iceberg. A surviving eidolon does not lose any of its abilities, and typically waits for a year before sending out a call for a new guardian. If the slain member of the bond is brought back to life within a year of death, the rimefire bond instantly reforges itself despite any physical distance between the two. If more than a year has passed, the rimefire witch does not regain her powers but within a week she is contacted in her dreams by a new rimefire eidolon; once she travels to its iceberg and accepts its bond of rimefire she immediately regains her lost powers.\n\n Detect Minion of Iborighu (Sp): A rimefire witch possesses the spell-like ability to detect minions of Iborighu at will. This spell-like ability functions like detect evil, except that it detects the presence or absence of devotion to Iborighu in a living creature’s aura and soul. Undetectable alignment can block this ability, as can certain magic items that have similar effects, such as the mantle of hidden faith.\n\n Rimefire Bolt (Su): At 3rd level, a rimefire witch’s bond with her eidolon becomes powerful enough that she can summon and direct a bolt of rimefire, as long as she is currently in the boundaries of a frostfell. Summoning and directing a rimefire bolt is a standard action. Rimefire bolts have a range of 30 feet and attack as ranged touch attacks, dealing damage equal to 1d6 + the witch’s Charisma modifier. Half this damage is cold damage and half is fire damage; for more information on rimefire, see page 17. At 6th level, a rimefire witch deals cold damage equal to 2d6 + her Charisma modifier with her rimefire bolt. At 9th level, a rimefire witch deals cold damage equal to 3d6 + her Charisma modifier with her rimefire bolt.\n\n Ice Skate (Sp): At 4th level, a rimefire witch gains the ability to use ice skate as a spell-like ability. She can use this ability a number of times each day equal to her Charisma modifier (minimum of once per day), at a caster level equal to her rimefire witch level.\n\n Word of Recall (Sp): At 7th level, a rimefire witch gains the ability to use word of recall as a spell-like ability. She can use this ability once per day, and it always recalls her to the chamber of her bonded rimefire eidolon.\n\n Iceberg (Sp): At 10th level, a rimefire witch gains the ability to use iceberg as a spell-like ability. She can use this ability once per day, at a caster level equal to her rimefire witch level.\n\n Rimefire Apotheosis (Su): Upon achieving 10th level, a rimefire witch undergoes a dramatic transformation as the bond with her eidolon physically changes her into a fey creature. Her type immediately changes to fey, and she can no longer be affected by effects that target her old type; she does become susceptible to attacks and effects that harm or aid fey. She gains low-light vision, damage reduction \n /cold iron, and a +2 racial bonus to her Charisma score as her skin and hair become light blue or white in color. Once she undergoes rimefire apotheosis, the death of her bonded eidolon does not cause the loss of her supernatural or spellcasting abilities.",
    "advancesExistingSpellcasting": true
  },
  {
    "id": "frostburn-stormsinger",
    "name": "Stormsinger",
    "hitDie": 6,
    "requirements": [
      "Skills: Concentration 8 ranks, Knowledge (arcana) 8 ranks, Knowledge (geography) 4 ranks, Knowledge (nature) 4 ranks, Perform (sing) 8 ranks, Spellcraft 4 ranks.",
      "Feats: Magical Aptitude, Storm Magic.",
      "Special: The stormsinger must have the bardic music class ability."
    ],
    "classSkills": "The stormsinger’s class skills (and the key ability for each skill) are Climb (Str), Concentration (Con), Craft (Int), Diplomacy (Cha), Jump (Str), Knowledge (arcana) (Int), Knowledge (geography) (Int), Knowledge (nature) (Int), Listen (Wis), Perform (Cha), Profession (Wis), Spellcraft (Int), Spot (Wis), Survival (Wis), and Swim (Str). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "4 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+0",
        "ref": "+2",
        "will": "+2",
        "special": "Bardic music, stormsong (gust of wind)"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+0",
        "ref": "+3",
        "will": "+3",
        "special": "Stormpower"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": "+1",
        "ref": "+3",
        "will": "+3",
        "special": "Stormsong (thunderstrike)"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": "+1",
        "ref": "+4",
        "will": "+4",
        "special": "Resistance to electricity 5"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": "+1",
        "ref": "+4",
        "will": "+4",
        "special": "Stormsong (control winds)"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": "+2",
        "ref": "+5",
        "will": "+5",
        "special": "Resistance to electricity 10"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": "+2",
        "ref": "+5",
        "will": "+5",
        "special": "Stormsong (winter’s ballad)"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": "+2",
        "ref": "+6",
        "will": "+6",
        "special": "Resistance to electricity 15"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": "+3",
        "ref": "+6",
        "will": "+6",
        "special": "Stormsong (great thunderstrike)"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": "+3",
        "ref": "+7",
        "will": "+7",
        "special": "Stormsong (storm of vengeance)"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Stormsingers gain no proficiency with any weapon, armor, or shields. Spells per Day/Spells Known: At each stormsinger level, the character gains new spells per day (and spells known, if applicable) as if she had also gained a level in a spellcasting class she belonged to before adding the prestige class. She does not, however, gain any other benefit a character of that class would have gained (improved chance of controlling or rebuking undead, metamagic or item creation feats, and so on), except for an increased effective level of spellcasting. If a character had more than one spellcasting class before becoming a stormsinger, she must decide to which class she adds the new level for purposes of determining spells per day and spells known.\n\n Bardic Music: A stormsinger’s class level stacks with any levels of bard she has for purposes of determining the number of times per day she may use bardic music. Many of the stormsinger’s high-level abilities require her to use bardic music as well. When a stormsinger uses her bardic music ability to create a stormsong effect (see below), it counts as one (or more) uses of her bardic music for the day.\n\n Stormsong: The stormsinger can use her bardic music ability to create various storm-related effects in addition to the normal uses of bardic music. Additionally, the stormsinger can detect the approach of a natural storm 24 hours in advance of it reaching the character’s current location.\n\n Gust of Wind (Sp): A stormsinger of 1st level or higher with 9 or more ranks in Perform (sing) can use bardic music to generate a gust of wind, as the spell of the same name. Her caster level is equal to her ranks in Perform (sing), with a maximum caster level of 20th.\n\n Thunderstrike (Su): At 3rd level, a stormsinger with 11 or more ranks in Perform (sing) can use bardic music to unleash a deadly thunderbolt. The bolt can be targeted at any one creature within 60 feet, and the stormsinger must make a successful ranged touch attack to hit the target. If she hits, the stormsinger then makes a Perform (sing) check; the result indicates how much electricity damage the thunderbolt deals. A Reflex save (DC 10 + stormsinger’s class level + Cha modifier) halves the damage. If the creature fails its Reflex save, it must make a Fortitude save (same DC) or be deafened for a number of rounds equal to the damage dealt.\n\n Control Winds (Sp): At 5th level, a stormsinger with 13 or more ranks in Perform (sing) can use bardic music to cast control winds. This functions like the spell of the same name, except that the duration of the effect is concentration plus 3 rounds, and the save DC is 10 + the stormsinger’s class level + Charisma modifier. The stormsinger’s caster level is equal to her ranks in Perform (sing), with a maximum caster level of 20th.\n\n Winter’s Ballad (Su): At 7th level, a stormsinger with 15 or more ranks in Perform (sing) can use bardic music to cast control weather. This functions like the spell of the same name, except that the duration of the effect is concentration plus 1d6 hours. The stormsinger’s caster level is equal to her ranks in Perform (sing), with a maximum caster level of 20th.\n\n Great Thunderstrike (Su): At 9th level, a stormsinger with 17 or more ranks in Perform (sing) can use bardic music to unleash a terrible stroke of lightning, followed by a deafening clap of thunder. The great thunderstrike affects a line 60 feet long from the stormsinger. The stormsinger makes a Perform (sing) check; the result indicates how much electricity damage the great thunderstrike deals. A Reflex save (DC 10 + stormsinger’s class level + Cha modifier) halves the damage. If a creature fails its Reflex save, it must make a Fortitude save (same DC) or take an additional 2d6 points of sonic damage and be permanently deafened. The great thunderstrike is very strenuous, and uses up two of the stormsinger’s bardic music uses for the day.\n\n Storm of Vengeance (Sp): At 10th level, a stormsinger with 18 or more ranks in Perform (sing) can use bardic music to cause a storm of vengeance, as the spell of the same name (DC 10 + stormsinger’s class level + Cha modifier). Her caster level is equal to her ranks in Perform (sing), with a maximum caster level of 25th. This potent ability is quite exhausting to use; each time it is activated, the stormsinger uses four of her bardic music uses for the day.\n\n Stormpower (Ex): At 2nd level, a stormsinger gains a +2 bonus on Perform (sing) checks made to use her stormsong powers and adds a +2 bonus to her caster level with stormsong powers when the temperature is cold or colder (40° F or lower) or when she is in a storm. For information on storms, see Table 3–24: Wind Effects, page 95 of the Dungeon Master’s Guide.\n\n Resistance to Electricity (Ex): At 4th level, a stormsinger gains resistance to electricity 5. This increases to resistance to electricity 10 at 6th level, and resistance to electricity 15 at 8th level.",
    "advancesExistingSpellcasting": true
  },
  {
    "id": "frostburn-winterhaunt-of-iborighu",
    "name": "Winterhaunt of Iborighu",
    "hitDie": 8,
    "requirements": [
      "Alignment: Chaotic neutral, chaotic evil, or neutral evil.",
      "Skills: Concentration 8 ranks, Knowledge (arcana) 5 ranks, Knowledge (religion) 8 ranks.",
      "Feats: Chosen of Iborighu, Craft Wondrous Item, Piercing Cold.",
      "Spells: Able to cast 1st-level divine spells.",
      "Patron Deity: Iborighu.",
      "Special: The character must successfully create an iceheart. This can be either a minor iceheart or a major iceheart; most prospective cultists opt to create a minor iceheart, naturally. The iceheart, once created, serves as the winterhaunt’s badge of office in the cult; if it is lost or destroyed, he must replace it with a new one within a week. Failure to do so results in the loss of all spellcasting and supernatural abilities granted by this prestige class. Regaining these abilities is possible only if the winterhaunt gains a new iceheart and then receives an atonement spell."
    ],
    "classSkills": "The winterhaunt of Iborighu’s class skills (and the key ability for each skill) are Concentration (Con), Craft (Int), Intimidate (Cha), Knowledge (arcana) (Int), Knowledge (religion) (Int), Profession (Wis), and Spellcraft (Int). See Chapter 4 of the Player’s Handbook for skill descriptions.",
    "skillPointsPerLevel": "2 + Int modifier",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+0",
        "will": "+2",
        "special": "Cloak of winter’s chill"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": "+3",
        "ref": "+0",
        "will": "+3",
        "special": "Resistance to cold 5"
      },
      {
        "level": 3,
        "bab": "+1",
        "fort": "+3",
        "ref": "+1",
        "will": "+3",
        "special": "Frozen skin"
      },
      {
        "level": 4,
        "bab": "+2",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Coldstrike +1d6"
      },
      {
        "level": 5,
        "bab": "+2",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Resistance to cold 10"
      },
      {
        "level": 6,
        "bab": "+3",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Constant Piercing Cold"
      },
      {
        "level": 7,
        "bab": "+3",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Cold subtype"
      },
      {
        "level": 8,
        "bab": "+4",
        "fort": "+6",
        "ref": "+2",
        "will": "+6",
        "special": "Coldstrike +2d6"
      },
      {
        "level": 9,
        "bab": "+4",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": "Summon the entombed"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": "+7",
        "ref": "+3",
        "will": "+7",
        "special": "Wintry apotheosis"
      }
    ],
    "classFeaturesText": "Weapon and Armor Proficiency: Winterhaunts of Iborighu gain proficiency with all simple weapons, as well as proficiency with the scythe (the favored weapon of Iborighu). Winterhaunts are proficient with light armor, but not shields. Spells per Day/Spells Known: When a new winterhaunt level is gained, the character gains new spells per day (and spells known, if applicable) as if he had also gained a level in a spellcasting class she belonged to before adding the prestige class. He does not, however, gain any other benefit a character of that class would have gained (improved chance of controlling or rebuking undead, metamagic or item creation feats, and so on), except for an increased effective level of spellcasting. If a character had more than one spellcasting class before becoming a winterhaunt, he must decide to which class he adds the new level for purposes of determining spells per day and spells known.\n\n Cloak of Winter’s Chill (Su): As a free action, a winterhaunt can shroud himself in a sphere of cold a number of times per day equal to 3 + his Charisma modifier. This cloak of winter’s chill lasts for a number of rounds equal to the winterhaunt’s class level + his Charisma modifier. While cloaked in winter’s chill, the winterhaunt gleams with a frosty radiance that is both alluring and terrifying. He gains a +2 profane bonus on Will saving throws and all Charisma-based checks, including all Charisma-based skills and rebuke or command undead checks.\n\n Resistance to Cold (Ex): A winterhaunt gains resistance to cold 5 at 2nd level. This increases to resistance to cold 10 at 5th level. This resistance to cold granted to this ability stacks with a character’s natural cold resistance, if any.\n\n Frozen Skin (Su): At 3rd level, the winterhaunt’s skin becomes as hard (and cold) as frozen flesh, while retaining its flexibility. His skin appears to be coated with a fine layer of frost, and flecks of snow seem to float from his flesh at times. He gains a +2 natural armor bonus to his Armor Class, which increases to +4 while he is cloaked in his winter’s chill ability.\n\n Coldstrike (Su): Starting at 4th level, every time a winter haunt deals cold damage with a spell, spell-like ability, or supernatural ability (including an uldra’s icy touch or a white dragon’s breath weapon), he deals an additional 1d6 points of cold damage. Magic weapons that deal cold damage (such as frost weapons) do not trigger this additional cold damage, since the source of the cold damage is the weapon itself, not the winterhaunt. The winterhaunt’s coldstrike damage increases to +2d6 points of cold damage at 8th level. When his cloak of winter’s chill is active, he adds an additional 1d6 points of damage with his coldstrike ability (to a total of +2d6 at 4th level and +3d6 at 8th level).\n\n Constant Piercing Cold (Su): At 6th level, all spells with the cold descriptor cast by the winterhaunt are automatically enhanced by the Piercing Cold feat, with no change to the spell’s actual level.\n\n Cold Subtype (Ex): At 7th level, the winterhaunt gains the cold subtype. He gains immunity to cold, but also has a vulnerability to fire, which means he takes half again as much (+50%) damage as normal from fire, regardless of whether or not a saving throw is allowed, or if the save is a success or a failure.\n\n Summon the Entombed (Sp): At 9th level, a winterhaunt gains the spell-like ability to summon one of the entombed to do his bidding. Treat this as a summon monster IX spell, except that \n the winterhaunt can only summon entombed with it. The caster level of this ability is equal to the winterhaunt’s class level plus his Charisma modifier. The winterhaunt may use this spell-like ability once per day. For more information on entombed, see page 128.\n\n Wintry Apotheosis (Su): At 10th level, the winterhaunt undergoes a powerful and unholy transformation as his flesh and bones become consumed by the frozen wrath of Iborighu, only to be replaced by snowy flesh and icy bones. The winterhaunt has become a powerful supernatural servant of Iborighu. Once this apotheosis takes place, the winterhaunt’s type changes to elemental, and he gains the evil subtype. As a being composed of living, profane ice and snow, he is immune to poison, sleep effects, paralysis, and stunning. He is also not subject to extra damage from critical hits or flanking. The winter haunt cannot be raised, reincarnated or resurrected (though a limited wish, wish, miracle, or true resurrection spell can restore life). The winterhaunt also gains dark vision out to 60 feet. The winterhaunt’s natural weapons, as well as any weapons he wields, are treated as evil-aligned for the purpose of overcoming damage reduction.",
    "advancesExistingSpellcasting": true
  }
];
