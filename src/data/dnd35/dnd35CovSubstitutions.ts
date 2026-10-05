// ============================================================================
// D&D 3.5 — Champions of Valor (Forgotten Realms): níveis de substituição
// (Cap. 2, pp. 34-52, texto em inglês). Cada entrada substitui características
// de um nível da classe-base (paladino, monge, etc.) e exige ordem/divindade.
// Extraído da camada de texto do PDF por coluna; legendas de ilustração
// (blocos só em itálico) removidas. Tabelas conferidas: os níveis de cada
// tabela batem com os níveis citados nos requisitos (exceto Shooting Star, que
// tem 5 linhas: 3, 4, 8, 11 e 14, como impresso).
// Valores como impressos, incluindo dois que parecem erratas do livro:
// Fangshields Barbarian 7º BAB "+11/+6/+1" e Purple Staff 9º BAB "+6/+11".
// Setting: Forgotten Realms (Faerûn).
// ============================================================================

export interface Dnd35CovSubstitutionLevel {
  level: number;
  /** Bônus base de ataque como impresso (pode ter ataques iterativos: "+6/+1"). */
  bab: string;
  fort: string;
  ref: string;
  will: string;
  special: string;
}

export interface Dnd35CovSubstitution {
  id: string;
  name: string;
  baseClass: "Barbarian" | "Druid" | "Fighter" | "Monk" | "Paladin" | "Ranger" | "Cleric" | "Wizard";
  hitDie: number;
  flavor: string;
  /** Frase de requisitos impressa (inclui os níveis em que a substituição é permitida). */
  requirements: string;
  classSkills: string;
  skillPointsPerLevel: string;
  levels: Dnd35CovSubstitutionLevel[];
  featuresText: string;
}

export const DND35_COV_SUBSTITUTIONS: Dnd35CovSubstitution[] = [
  {
    "id": "cov-sub-berronar-valkyrie-paladin",
    "name": "Berronar Valkyrie",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "Berronar’s Valkyries are female dwarf paladins of the goddess Berronar Truesilver. They study tactics and charge into battle to save male dwarf warriors. Their special powers help them look after their allies and punish oathbreakers.",
    "requirements": "To take a Berronar Valkyrie paladin substitution level, a character must be a female dwarf, have Berronar as her patron deity, and be about to take her 3rd, 4th, or 6th level of paladin.",
    "classSkills": "Berronar Valkyrie paladin substitution levels have the class skills of the standard paladin.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Everbright blessing"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Valiant rescue"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Binding oath, touch of fatigue"
      }
    ],
    "featuresText": "All of the following are features of the Berronar Valkyrie substitution levels.\n\nEverbright Blessing (Su): Starting at 3rd level, a Valkyrie’s armor, shield, and primary weapon are treated as if they had the everbright special ability; they shine like polished silver, they are immune to acid and rust attacks, and the armor provides her with resistance to acid 5. This ability only applies to the items the Valkyrie is wearing; if the items are removed or dropped, they lose this property until she picks them up again. This benefit replaces the divine health class feature gained by a standard paladin at 3rd level.\n\nValiant Rescue (Ex): Starting at 4th level, a Valkyrie gains a special ability to charge into harm’s way to protect an ally. A Valkyrie can charge into melee with a creature that threatens one of her allies and still make a full attack with a single melee weapon rather than a single attack. During this charge she acts as if she had the Mobility feat; if she is mounted, this bonus also applies to her mount. A Valkyrie can use this ability a number of times per day equal to 3 + her Charisma modifier. This benefit replaces the turn undead class feature gained by a standard paladin at 4th level.\n\nBinding Oath (Su): At 6th level, a Valkyrie gains the ability to magically link two willing individuals making an oath (or a legal agreement). This link has two effects. First, it informs both parties and the Valkyrie instantly if the oath is broken in any way. Second, the individual who breaks the oath is fatigued for one day per paladin level of the Valkyrie at the time of the oath-binding. A Valkyrie can bind an oath once per week as a full-round action. For every three paladin levels gained thereafter, the Valkyrie can use this ability one extra time per week (2/week at 9th level, 3/week at 12th level, and so forth). This benefit replaces the remove disease class feature gained by a standard paladin at 6th level. A Berronar Valkyrie who selects this substitution level never gains the remove disease ability.\n\nTouch of Fatigue (Sp): Beginning at 6th level, a Valkyrie can use touch of fatigue at will. This ability is normally used to admonish those about to stray from their promises or to punish those guilty of minor infractions. The save DC against this spell-like ability is 10 + the Valkyrie’s Charisma modifier.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-broken-one-monk",
    "name": "Broken One",
    "baseClass": "Monk",
    "hitDie": 8,
    "flavor": "These kind and enduring monks dedicated to Ilmater are focused on defending the faithful and temples of the Broken God while acting as agents of punishment against those who would cruelly harm others. They combine the skills of healer and hunter in the service of their deity. They often assist other servants of the Triad when injustices against the innocent have occurred.",
    "requirements": "To take a Broken One substitution level, a character must have Ilmater as her patron deity and be about to take her 3rd, 6th, or 7th level of monk.",
    "classSkills": "Broken One substitution levels have the class skills of the standard monk class plus Heal and Survival.",
    "levels": [
      {
        "level": 3,
        "bab": "+2",
        "fort": "+3",
        "ref": "+3",
        "will": "+3",
        "special": "Lay on hands"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": "+5",
        "ref": "+5",
        "will": "+5",
        "special": "Tenacious tracker, slow fall 30 ft."
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": "+5",
        "ref": "+5",
        "will": "+5",
        "special": "Locate creature"
      }
    ],
    "featuresText": "All of the following are features of the Broken One substitution levels.\n\nLay on Hands (Su): At 3rd level, a Broken One can gain the ability to heal wounds with her touch (see the paladin class feature, page 44 of the Player’s Handbook). If the character has a Charisma score of 11 or lower, she can heal a number of points of damage each day equal to her monk class level. This benefit replaces the still mind class feature gained by a standard monk.\n\nTenacious Tracker (Su): Beginning at 6th level, a Broken One gains the ability to follow the trail of those cruel enough to torture and maim others. She receives Track as a bonus feat. She gains a +10 competence bonus on Survival checks made to track those with Loviatar as a patron deity. Furthermore, whenever she physically touches the flesh of one who has been injured within the previous hour by someone who has Loviatar as his patron deity, she receives a clear mental image of that person’s true appearance. This benefit replaces the bonus feat gained by a standard monk at 6th level.\n\nSlow Fall (Ex): A Broken One’s slow fall ability is identical to a standard monk’s ability at 6th level.\n\nLocate Creature (Sp): Starting at 7th level, a Broken One can use locate creature once per day, but only when attempting to find a creature that has Loviatar as a patron deity. Her caster level is equal to her class level. This benefit replaces the wholeness of body class feature gained by a standard monk at 7th level.",
    "skillPointsPerLevel": "4 + Int modifier"
  },
  {
    "id": "cov-sub-claw-of-the-sun-and-the-ankh-paladin",
    "name": "Claw of the Sun and the Ankh",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "The first Mulhorandi order of paladins to worship a god other than Osiris, the Claw of the Sun and the Ankh serves Horus-Re. Its fearless and fanatical soldiers are dedicated to energetically pursing the evil minions of Set, relentlessly destroying them and their foul plans whenever they are found.",
    "requirements": "To take a Claw of the Sun and The Ankh substitution level, a character must have Horus-Re as his patron deity and be about to take his 1st, 6th, or 12th level of paladin.",
    "classSkills": "Claw of the Sun and the Ankh substitution levels have the class skills of the standard paladin class.",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, bird of prey, detect evil"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Smite minions of Set"
      },
      {
        "level": 12,
        "bab": "+12/+7/+2",
        "fort": "+8",
        "ref": "+4",
        "will": "+4",
        "special": "Horus-Re’s glory"
      }
    ],
    "featuresText": "All of the following are features of the Claw of the Sun and the Ankh substitution levels.\n\nBird of Prey (Su): Beginning at 1st level, once per day a Claw of the Sun and the Ankh can pay homage to his god by taking on aspects of a hawk. His hands turn into claws that deal 1d4 points of damage; the attacks deal extra damage equal to one-half his paladin level to evil creatures. These attacks are considered magic, good-aligned weapons for the purpose of overcoming damage reduction. The paladin is considered to be proficient with these natural weapons while using this form. This transformation lasts for a number of rounds equal to 3 + his Charisma modifier. At 5th level, and every five levels thereafter, a Claw of the Sun and the Ankh can use this ability one extra time per day. This benefit replaces the smite evil class feature gained by a standard paladin. A Claw of the Sun and the Ankh never gains any smite evil attacks at later levels.\n\nSmite Minions of Set (Su): A Claw of the Sun and the Ankh is tasked with eliminating members of the church of Set. Starting at 6th level he can use a melee attack to attempt to smite a creature that has Set as its patron deity. This otherwise functions as the paladin’s normal smite evil class feature. A Claw of the Sun and the Ankh can use this smite attack once per day, plus one extra time per day for every three levels gained beyond 6th. This benefit replaces the standard paladin’s remove disease class feature. A Claw of the Sun and the Ankh who selects this substitution level never gains the remove disease ability.\n\nHorus-Re’s Glory (Su): Starting at 12th level, a Claw’s armor shines brightly (as the daylight spell). This illumination can be suppressed or resumed at will with a standard action. This benefit replaces the 3rd-level spell slot gained by a standard paladin at 12th level. From this point forward, a Claw of the Sun and the Ankh who selects this substitution level can prepare one less 3rd-level paladin spell than normal.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-crescent-moon-knight-paladin",
    "name": "Crescent Moon Knight",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "These unusual paladins of the Order of the Crescent Moon serve either Clangeddin Silverbeard or Selûne. The order was founded by an alliance between humans and dwarves to defeat marauding lycanthropes; now, the descendants of the founders teach old family skills and pass heirlooms to the next generation of defenders.",
    "requirements": "To take a Crescent Moon Knight paladin substitution level, a character must have Clangeddin Silverbeard or Selûne as his patron deity, be related to or a close friend of one of the founding families, and be about to take his 4th, 6th, or 10th level of paladin.",
    "classSkills": "Crescent Moon Knight paladin substitution levels have the class skills of the standard paladin plus Knowledge (local Impiltur).",
    "levels": [
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Favored enemy lycanthropes +2"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Remove disease, cure lycanthropy"
      },
      {
        "level": 10,
        "bab": "+10/+5",
        "fort": "+7",
        "ref": "+3",
        "will": "+3",
        "special": "Battlesong"
      }
    ],
    "featuresText": "All of the following are features of the Crescent Moon Knight substitution levels.\n\nFavored Enemy (Ex): At 4th level, a Knight gains lycanthropes as a favored enemy, just as if he were a 1st-level ranger. Unlike standard ranger favored enemies, which are organized by monster type, the Knight’s favored enemy bonuses apply to all lycanthropes regardless of type (for example, the bonuses apply against a human werewolf and a hill giant dire wereboar). This benefit replaces the turn undead class feature gained by a standard paladin at 4th level.\n\nCure Lycanthropy (Su): Starting at 6th level, a Knight becomes versed in the methods of curing lycanthropy. A Knight counts as a 12th-level cleric for the purpose of curing lycanthropy within 3 days of a lycanthrope’s attack. A Knight can use his remove disease spell-like ability as if it were break enchantment or remove curse to cure a lycanthrope on the nights of the full moon.\n\nBattlesong (Su): Once per day starting at 10th level, a Knight can begin an inspiring battle song as a standard action. This song functions like a bard’s inspire courage ability, using the Knight’s paladin level minus 4 as his bard level. For example, a 10th-level paladin who selects this substitution level would receive a +1 morale bonus on the relevant rolls, while an 18th-level paladin would receive a +3 morale bonus. A Knight need not have any ranks in Perform to use this class feature. This benefit replaces the 2nd-level spell slot gained by a standard paladin at 10th level. From this point forward, a Crescent Moon Knight who selects this substitution level can prepare one less 2nd-level paladin spell than normal.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-darksong-knight-fighter",
    "name": "Darksong Knight",
    "baseClass": "Fighter",
    "hitDie": 8,
    "flavor": "The Darksong Knights are elite soldiers of Eilistraee who further her many causes and hunt the yochlol, the demonic servants of the Spider Queen. They develop an intricate, dancelike style of swordplay and special powers to defeat their demonic enemies.",
    "requirements": "To take a Darksong Knight substitution level, a character must have Eilistraee as her patron deity and be about to take her 2nd, 6th, or 8th level of fighter.",
    "classSkills": "Darksong Knight substitution levels have the class skills of the standard fighter class plus Perform (dance).",
    "levels": [
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "Bonus feat, dancing feint"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Bonus feat, favored enemy yochlols +2"
      },
      {
        "level": 8,
        "bab": "+8/+3",
        "fort": "+6",
        "ref": "+2",
        "will": "+2",
        "special": "Bonus feat, combat dancing"
      }
    ],
    "featuresText": "All of the following are features of the Darksong Knight substitution levels.\n\nBonus Feat: A Darksong Knight’s choice of bonus feats is identical to a standard fighter’s bonus feats.\n\nDancing Feint (Ex): Starting at 2nd level, a Darksong Knight can use her Perform (dance) skill to feint in combat as if it were the Bluff skill.\n\nFavored Enemy (Ex): At 4th level, a Darksong Knight gains yochlols as a favored enemy, just as if she were a 1st-level ranger. Unlike standard ranger favored enemies, which are classified by monster type, the Knight’s favored enemy bonuses apply only to yochlols, not all kinds of demons.\n\nCombat Dancing (Ex): At 8th level, a Darksong Knight with at least 5 ranks in Perform (dance) gains a +2 dodge bonus against attacks of opportunity. If she uses Spring Attack, she gains a +2 circumstance bonus on the attack roll made as part of the maneuver.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-dukar-wizard",
    "name": "Dukar",
    "baseClass": "Wizard",
    "hitDie": 4,
    "flavor": "These wizards of a dwindling order protect the tenuous peace under the Sea of Fallen Stars, working quietly and secretly to achieve their goals and rebuild their numbers. Many of their powers stem from living coral implanted under the skin of their hands.",
    "requirements": "To take a Dukar substitution level, a character must be about to take his 5th, 10th, or 15th level of wizard. The first time a character takes a Dukar substitution level, he must undergo a secret Dukar ritual that implants the living coral under the skin of his palms (see Dukar hand coral, page 63). The coral does not interfere with using his hands in any way. If the Dukar somehow loses this coral, he loses his coral-related powers, but if he is implanted again he immediately regains his full abilities.",
    "classSkills": "Dukar substitution levels have the class skills of the standard wizard class plus Swim.",
    "levels": [
      {
        "level": 5,
        "bab": "+2",
        "fort": "+1",
        "ref": "+1",
        "will": "+4",
        "special": "Coral claw, bonus spells"
      },
      {
        "level": 10,
        "bab": "+5",
        "fort": "+3",
        "ref": "+3",
        "will": "+7",
        "special": "Coral power, bonus spells"
      },
      {
        "level": 15,
        "bab": "+7/+2",
        "fort": "+5",
        "ref": "+5",
        "will": "+9",
        "special": "Coral power, bonus spells"
      }
    ],
    "featuresText": "All of the following are features of the Dukar substitution levels.\n\nBonus Spells (Ex): There are four Dukar orders, each with two associated schools of magic. Upon taking his first Dukar substitution level, a Dukar chooses one order and can never change it thereafter (similar to choosing a wizard specialty school). Each time a Dukar substitution level is taken, a Dukar adds two spells to his spell book; these must be from one or both of his order’s associated schools of magic (either one from each or both from the same). A specialist wizard Dukar is not restricted to choosing these bonus spells from his school of specialization, but he cannot use them to acquire spells from his prohibited school (therefore, choosing an order that studies one of your prohibited schools is normally a bad choice). The orders are as follows. Order Color Schools of Magic Jhimar* Red Enchantment, evocation Kupav Blue Aburation, transmutation Maalirn Green Conjuration, divination Numos White Illusion, necromancy * The order of Jhimar was destroyed centuries ago and its knowledge and traditions are lost. This class feature replaces the standard wizard’s ability to add two spells to his spellbook each time he gains a wizard level.\n\nCoral Claw (Ex): At 5th level, a Dukar can extend the coral under his skin to form sharp spikes on his hand, giving him a claw attack that deals 1d4 points of damage. The Dukar is automatically proficient in the coral weapon and can extend or retract the coral as a swift action. This benefit replaces the bonus feat normally gained by a 5th-level wizard.\n\nCoral Power: At 10th and 15th level, a Dukar learns how to use his implanted coral in different ways. Each time this ability is gained, a Dukar chooses one ability from the following choices. Each ability can be taken twice, with increasing effect.\n\nAcid (Ex): A Dukar adds 1d4 points of acid damage to all claw attacks (including those made with his coral claw; see above). The acid quickly decays and cannot be stored for later use. A Dukar and his gear are not harmed by his own coral’s acid. This ability functions automatically, though a Dukar can suspend or resume this ability as a free action. If a Dukar selects the ability a second time, the acid damage increases to 1d8 points.\n\nArmor (Ex): Three times per day as a standard action, a Dukar can make his coral extend hard growths across his skin, giving him a +1 enhancement bonus to his natural armor bonus to AC. These growths crumble to dust after 10 minutes. If a Dukar selects this ability a second time, the enhancement bonus to his natural armor increases to +2.\n\nColor Spray (Sp): A Dukar’s coral gains the ability to glow intensely in confusing patterns. At will as a standard action, a Dukar can use this light as a color spray effect. Using this ability requires the Dukar to have one hand free, uncovered, and able to make gestures. The save DC of this ability is Intelligence-based. If a Dukar takes this ability a second time, the save DC of this ability increases by 2.\n\nWound Transfer (Su): A Dukar’s coral develops the ability to transfer life energy by touch from him to another creature, healing its wounds at the expense of his own health. Each use of this ability heals the target of 1d6 points of damage and deals a like amount of damage to the Dukar. If a Dukar chooses this ability a second time, he heals the target of 2d6 points of damage and takes a like amount of damage per use. This ability can never provide a target more hit points than its full normal total +10. Any hit points gained beyond its normal maximum are treated as temporary hit points that last for up to 1 hour. This benefit replaces the bonus feat normally gained by a 10thor 15th-level wizard.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-eternal-order-paladin",
    "name": "Eternal Order",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "The primary duty of the Knights of the Eternal Order—Kelemvor’s main order of paladins—is to hunt and destroy powerful undead. They develop powerful undead-fighting powers by sacrificing other paladin abilities.",
    "requirements": "To take an Eternal Order substitution level, a character must have Kelemvor as her patron deity and be about to take her 1st, 3rd, or 6th level of paladin.",
    "classSkills": "Eternal Order substitution levels have the class skills of the standard paladin class.",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, detect evil, corpsestrike 1/day, undead knowledge"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Aura of courage, eternal vigor, undead knowledge"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Greater turning, undead knowledge"
      }
    ],
    "featuresText": "All of the following are features of the Eternal Order substitution levels.\n\nCorpsestrike (Su): An Eternal Order paladin can, as a swift action, surround her weapon with a visible gray aura of holy power that sheds light equal to a candle. Any weapon so affected can ignore any damage reduction (other than DR #/epic) possessed by an undead creature, regardless of its source. This aura lasts for a number of minutes equal to the paladin’s class level. This benefit replaces the standard paladin’s smite evil class feature. Any time an Eternal Order paladin would later gain an extra smite evil attempt (such as at 5th level), she can instead use this ability one extra time per day.\n\nUndead Knowledge (Ex): Each time an Eternal Order substitution level is taken, the character gains a cumulative +2 competence bonus on Knowledge (religion) checks concerning undead.\n\nEternal Vigor (Ex): Beginning at 3rd level, an Eternal Order paladin can ignore the effects of negative levels bestowed upon her by an undead creature. This benefit replaces the standard paladin’s divine health class feature.\n\nGreater Turning (Su): At 6th level, an Eternal Order paladin gains the ability to perform a greater turning once per day in place of a regular turning, just as if she had access to the Sun domain. This benefit replaces the standard paladin’s remove disease class feature normally gained at 6th level. At any level where a standard paladin gains an extra daily use of remove disease, an Eternal Order paladin instead gains another daily use of her greater turning ability.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-fangshields-barbarian",
    "name": "Fangshields Barbarian",
    "baseClass": "Barbarian",
    "hitDie": 12,
    "flavor": "Barbarians of the Fangshields have few worries about traps, because they spend most of their time in their home territory rather than crawling through dungeons. They train their bodies to their physical peak so they can be the shock troops of the organization, relying on their speed and strength to decimate enemy creatures quickly. Other monsters can fight in formation against massed enemies, but the Fangshields barbarians are skilled at charging opposing monsters and battering them with a few powerful hits.",
    "requirements": "To take a Fangshields barbarian substitution level, a character must be a nonhumanoid creature about to take his 3rd, 5th, or 7th level of barbarian.",
    "classSkills": "Fangshields barbarian substitution levels have the class skills of the standard barbarian class.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Fast charge (+10 ft.)"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Awesome charge"
      },
      {
        "level": 7,
        "bab": "+11/+6/+1",
        "fort": "+7",
        "ref": "+3",
        "will": "+3",
        "special": "Raging vigor"
      }
    ],
    "featuresText": "All of the following are features of the Fangshields barbarian substitution levels.\n\nFast Charge (Ex): At 3rd level, a Fangshields barbarian gains a 10-foot enhancement bonus to his speed when he charges. This applies to any type of movement the barbarian uses. This benefit replaces the trap sense class feature gained by a standard barbarian at 3rd level. At any level where a standard barbarian gains a bonus to trap sense (6th, 9th, 12th, 15th, and 18th), a Fangshields barbarian instead increases the enhancement bonus to his charge speed by 10 feet.\n\nAwesome Charge (Ex): At 5th level, a charging Fangshields barbarian in a rage can make an attack at the end of the charge as if he had the Awesome Blow feat (see page 303 of the Monster Manual), even if he does not have the normal prerequisites for that feat. (Normally, Awesome Blow requires a standard action; this is a specific exception to that rule.) This benefit replaces the improved uncanny dodge class feature gained by a standard barbarian at 5th level.\n\nRaging Vigor (Ex): At 7th level, a Fangshields barbarian gains the ability to direct his force of will inward, causing his injured body to heal itself. As a standard action, he can spend one of his daily uses of rage to heal damage equal to twice his Hit Dice. He can even use this ability if he is already raging. This benefit replaces the standard barbarian’s damage reduction gained at 7th level. Instead, the Fangshields barbarian gains damage reduction 1/— at 10th level, and his damage reduction is treated as 1 point lower than normal from that point forward.",
    "skillPointsPerLevel": "4 + Int modifier"
  },
  {
    "id": "cov-sub-fangshields-druid",
    "name": "Fangshields Druid",
    "baseClass": "Druid",
    "hitDie": 8,
    "flavor": "Druids of the Fangshields are the healers and nurturers of the group, acting on behalf of their more monstrous allies who cannot interact with “civilized” humanoids without causing fear and panic.",
    "requirements": "To take a Fangshields druid substitution level, a character must be a nonhumanoid creature about to take her 4th, 5th, or 7th level of druid.",
    "classSkills": "Fangshields druid substitution levels have the class skills of the standard druid class.",
    "levels": [
      {
        "level": 4,
        "bab": "+3",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Spontaneous curing"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Wild shape hands"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Wild shape (humanoid)"
      }
    ],
    "featuresText": "All of the following are features of the Fangshields druid substitution levels.\n\nSpontaneous Curing (Su): At 4th level, a Fangshields druid can spontaneously convert prepared druid spells of 1st level or higher into cure light wounds spells, just as a cleric can. Unlike a cleric, she cannot convert her prepared spells into any cure spell, just cure light wounds, nor can she apply metamagic feats to these spontaneously cast spells. This benefit replaces the resist nature’s lure class ability gained by a standard druid at 4th level.\n\nWild Shape Hands (Su): At 5th level, a Fangshields druid can use her wild shape ability to create simple dexterous hands if she doesn’t have them already. For example, a giant eagle, lammasu, or unicorn could use wild shape to change her feet, paws, or hooves into hands that work as well as human hands. These hands lose any natural attacks they previously possessed, but otherwise still function like their original shape (a unicorn could walk or run at normal speed on her hoof-hands, for example). She can make this change whenever she uses her wild shape, even when she assumes another form. For example, a unicorn druid could take the form of a wolf with functional paw-hands. This benefit is in addition to the standard druid’s wild shape ability. Wild Shape (Humanoid) (Su): At 7th level, a Fangshields druid can use her wild shape ability to assume a Medium humanoid form. The humanoid form can resemble a human, dwarf, elf, or other Medium humanoid as the druid desires and has the appropriate racial traits for that race (according to the polymorph spell). This ability is typically used by a druid to interact with humanoid settlements without drawing too much attention to herself. However, the humanoid form retains some of a Fangshields druid’s original monstrous appearance, much like how a lycanthrope in hybrid form has humanoid and animal features, resulting in a –4 penalty on Disguise checks made to pass as a humanoid. The hybrid form can speak as well as a true humanoid, though the change of form does not give the druid knowledge of that form’s language (a druid in the form of an elf wouldn’t automatically know how to speak Elven, but could use her elf-mouth to speak any languages she did know).\n\nExample: A giant eagle could wild shape into a humanlike humanoid, but she would resemble an eagle–human hybrid (much like an avoral guardinal); a treant taking the form of an elf hybrid would look like a tall elf with barklike skin and leaves in her hair (much like a dryad). This benefit replaces the third use of wild shape per day gained by a standard druid at 8th level. From this point forward, a Fangshields druid has one less daily use of wild shape than normal.",
    "skillPointsPerLevel": "4 + Int modifier"
  },
  {
    "id": "cov-sub-fangshields-ranger",
    "name": "Fangshields Ranger",
    "baseClass": "Ranger",
    "hitDie": 8,
    "flavor": "Rangers of the Fangshields use their skills to patrol the wildlands, as well as to spy on and hunt evil creatures. However, some of the standard ranger class features are useless to creatures that lack hands to use manufactured weapons. Fangshields rangers learn other abilities to take advantage of their nonhumanoid anatomy, helping them become dangerous leaders of beasts and animals.",
    "requirements": "To take a Fangshields ranger substitution level, a character must be a nonhumanoid creature about to take his 2nd, 4th, or 5th level of ranger.",
    "classSkills": "Fangshields ranger substitution levels have the class skills of the standard ranger class plus Diplomacy.",
    "levels": [
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+3",
        "will": "+0",
        "special": "Combat style"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Animal companion"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Lion and the Unicorn"
      }
    ],
    "featuresText": "All of the following are features of the Fangshields ranger substitution levels.\n\nCombat Style (Ex): Often lacking hands, Fangshields rangers have a third option for their combat style: natural attacks. If a ranger selects this combat style, at 2nd level he gains Multiattack (if he has more than one kind of natural attack) or Improved Natural Attack (if he has only one kind of natural attack) as a bonus feat. At 6th level, a ranger with this combat style gains Weapon Focus for any one of his natural attack types. At 11th level, a ranger with this combat option gains Weapon Focus for a second of his natural weapons, or Greater Weapon Focus for his natural weapon if he has only one kind. A Fangshields ranger need not meet any of the normal prerequisites for these bonus feats.\n\nAnimal Companion (Ex): A Fangshields ranger uses the normal ranger animal companion rules, but because he is beastlike himself, he has a stronger bond with the animal. The ranger’s effective druid level is treated as one-half his ranger level +2.\n\nLion and the Unicorn (Ex): At 5th level, a Fangshields ranger chooses an affinity for Nobanion or Lurue, even if he already has a patron deity (this doesn’t cause a religious conflict). If he chooses Nobanion, he gets a +1 sacred bonus to AC during the day; if he chooses Lurue, he gets a +1 sacred bonus to AC during the night. He gets the benefit of this ability whether or not he is outside or knows the time of day. This ability doesn’t apply on a plane other than the Material Plane. This benefit replaces the second favored enemy class feature gained by a standard ranger at 5th level.",
    "skillPointsPerLevel": "6 + Int modifier"
  },
  {
    "id": "cov-sub-golden-cup-paladin",
    "name": "Golden Cup",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "Paladins who are members of the Order of the Golden Cup serve Ilmater and have dedicated themselves to healing the sick and weak and protecting the innocent. Peaceful counterparts to the Companions of the Noble Heart (see page 100), they don’t shy away from combating evil, but they allow their companions to actively hunt it down while they focus on protecting those who can’t protect themselves.",
    "requirements": "To take a Golden Cup substitution level, a character must have Ilmater as her patron deity and be about to take her 3rd, 4th, or 10th level of paladin.",
    "classSkills": "Golden Cup substitution levels have the class skills of the standard paladin class.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Defend the weak"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Shield other"
      },
      {
        "level": 10,
        "bab": "+10/+5",
        "fort": "+7",
        "ref": "+3",
        "will": "+3",
        "special": "Expanded healing"
      }
    ],
    "featuresText": "All of the following are features of the Golden Cup substitution levels.\n\nDefend the Weak (Ex): Starting at 3rd level, a Golden Cup paladin can protect nearby allies in combat. If she uses Combat Expertise, fights defensively, or uses the total defense action, she can grant the dodge bonus to AC from these actions to any single creature standing adjacent to her in addition to herself. This benefit replaces the standard paladin’s aura of courage class feature.\n\nShield Other (Sp): Beginning at 4th level, a Golden Cup paladin can use shield other as a spell-like ability. She needs no focus for this ability, but she must be able to touch the character. She can use this ability a number of times per day equal to her Charisma bonus (minimum 1/day), though she can’t affect more than one target simultaneously (a second use ends the duration of any previous use). Her caster level is equal to her paladin level. This benefit replaces the standard paladin’s turn undead class feature.\n\nExpanded Healing (Su): Beginning at 10th level, a Golden Cup paladin can treat her paladin level as three higher than normal for the purpose of determining the maximum amount of healing she can bestow with her lay on hands ability per day. She can also treat her caster level as three higher than normal for the purpose of any conjuration (healing) spell she casts. This benefit replaces the third daily use of the smite evil ability gained by a standard paladin at 10th level. From this point forward, she has one less daily use of smite evil than normal.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-golden-lion-paladin",
    "name": "Golden Lion",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "The Order of the Golden Lion serves Torm and was created specifically to serve the Penance of Duty accepted by those of his faith. Members of the order are a varied bunch but united in their devotion and strength of purpose. They develop special powers to defend good temples, defeat Faerûnian evils, and repair damage to the Weave.",
    "requirements": "To take a Golden Lion paladin substitution level, a character must have Torm as her patron deity, maintain the appearance of her armor and helm in accordance with the standards of the order, and be about to take her 1st, 4th, or 6th level of paladin. Furthermore, as part of an ongoing atonement for their church’s hostilities toward other good churches in the years preceding the Time of Troubles, the Golden Lions pledge to help rebuild and defend these churches. Once per month each Golden Lion must perform a quest for or spend a day defending a good temple of another faith. The Golden Lion must follow orders from this temple as if they came from her own temple, but can disregard any order that conflicts with her own faith or that would certainly result in her death (the good faiths involved understand the boundaries of the Penance of Duty and won’t ask for things they wouldn’t ask of their own champions of the faith).",
    "classSkills": "Golden Lion substitution levels have the class skills of the standard paladin class.",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, detect magic, smite evil 1/day"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Enemy of strife"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Restore the Weave"
      }
    ],
    "featuresText": "All of the following are features of the Golden Lion substitution levels.\n\nDetect Magic (Sp): A Golden Lion can use a detect magic effect at will. Her caster level is equal to her paladin level. This benefit replaces the standard paladin’s detect evil ability.\n\nEnemy of Strife (Su): Golden Lions are tasked with eliminating the Zhentarim and the churches of Bane and Cyric. Beginning at 4th level, any smite evil attack used against a member of one of these groups (or a creature created or conjured by a member of one of these groups) automatically ignores any miss chance from concealment and overcomes damage reduction as if it were made with a good-aligned weapon. This benefit replaces the standard paladin’s ability to turn undead.\n\nRestore the Weave (Sp): At 6th level, once per day a Golden Lion can repair a 5-foot cube of dead magic or wild magic area, returning it to its normal function. This ability only works if the paladin stands in an area of normal Weave that is adjacent to the damaged area (in other words, it cannot create an “island” of normal Weave within a damaged area). Slowly but surely, the Golden Lions can repair large problem areas. This spell-like ability is the equivalent of a 3rd-level spell. This benefit replaces the remove disease class feature gained by a standard paladin at 6th level. At any level where a standard paladin gains an extra daily use of remove disease, a Golden Lion can instead gain another daily use of her restore the Weave ability.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-holy-judge-paladin",
    "name": "Holy Judge",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "This group of Tyr-worshiping paladins is focused primarily on its god’s lawful aspects. The Holy Judges hunt and punish criminals and lawbreakers, and they have a fervent hatred for devils, which they see as a terrible perversion of a lawful society.",
    "requirements": "To take a Holy Judge substitution level, a character must have Tyr as her patron deity and be about to take her 1st, 4th, or 6th level of paladin.",
    "classSkills": "Holy Judge substitution levels have the class skills of the standard paladin class plus Knowledge (the planes).",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, detect evil, favored enemy devils +2"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Censure devil"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Zone of truth 1/week"
      }
    ],
    "featuresText": "All of the following are features of the Holy Judge substitution levels.\n\nFavored Enemy (Ex): At 1st level, a Holy Judge gains devils as a favored enemy, just as if he were a 1st-level ranger. Unlike standard ranger favored enemies, which are classified by monster type, a Holy Judge’s favored enemy bonuses apply only to devils, not all kinds of evil outsiders. At 5th level, and every five levels thereafter, the bonus granted by the Holy Judge’s favored enemy class feature improves by 2. This increase has no effect on any other favored enemies the Holy Judge might have. This benefit replaces the standard paladin’s smite evil class feature.\n\nCensure Devil (Su): A Holy Judge on his home plane can utter words of censuring that can daze a devil within 30 feet. The devil must succeed on a Will save (DC 10 + 1/2 paladin level + Cha modifier) or be dazed for 1 round. A Holy Judge can use this ability a number of times per day equal to three + his Charisma modifier.\n\nZone of Truth (Sp): A Holy Judge can use a zone of truth effect once per week, using his paladin level as his caster level. This benefit replaces the standard paladin remove disease class feature. If the Holy Judge would later gain an extra weekly use of remove disease, he instead gains an extra weekly use of zone of truth.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-lion-legionnaire-paladin",
    "name": "Lion Legionnaire",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "The mighty wemic paladins of Nobanion are called the Legion of Lions; they are small in number but great in their bravery. Unlike most of Lord Firemane’s wemic followers, they travel outside the Shaar in search of evil, and partly because of their efforts Nobanion’s faith has attracted humanoid followers. Though most Lion Legionnaires are wemics, a small number are humanoids, and at least one lammasu is a member of this elite group. Rather than traditional paladin abilities, they develop powers relating to Nobanion’s strengths and tactics.",
    "requirements": "To take a Lion Legionnaire substitution level, a character must have Nobanion as his patron deity and be about to take his 3rd, 4th, or 5th level of paladin.",
    "classSkills": "Lion Legionnaire substitution levels have the class skills of the standard paladin class plus Knowledge (nature).",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Firemane aura"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Wild fighting"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Smite evil 2/day, flying lion"
      }
    ],
    "featuresText": "All of the following are features of the Lion Legionnaire substitution levels.\n\nFiremane Aura (Su): Once per day a Lion Legionnaire can create an aura of holy flame around his body. As this ability activates, the paladin’s hair or mane (if any) momentarily turns into a brilliant golden flame. Any evil creature striking a Lion Legionnaire with a natural weapon, or a melee weapon that is not a reach weapon, takes damage equal to the Legionnaire’s paladin level. Half of this damage is fire damage, but the other half results directly from divine power and is therefore not subject to being reduced by resistance to fire. This aura lasts for 1 minute. This benefit replaces the standard paladin’s aura of courage class feature.\n\nWild Fighting (Su): Lion Legionnaires develop a fighting style that gives them extra attacks at the cost of accuracy. As a free action, a Lion Legionnaire can enter a state of wild fighting for 1 round. During this round, a Legionnaire can make one extra attack with any one melee weapon (including natural weapons), but all attacks made during the round (including the extra attack) take a –2 penalty. A Lion Legionnaire must use a full attack action to benefit from wild fighting. A Lion Legionnaire can use this ability a number of times per day equal to three + his Charisma modifier. This benefit replaces the turn undead class feature gained by a standard paladin at 4th level.\n\nFlying Lion (Su): At 5th level, a Lion Legionnaire gains the ability to grow eagle’s wings, as Nobanion himself sometimes does in battle. Once per day as a full-round action, the Legionnaire grows feathered wings appropriate to the size of his body. The wings remain for up to 10 minutes per paladin level, though he can dismiss them as a free action. He can fly with the wings at his normal land speed, with poor maneuverability. Nonleonine creatures who use this ability temporarily gain a lionlike appearance while it is used (catlike eyes, a thick mane of hair, and larger teeth). This benefit replaces the special mount class feature gained by a standard paladin at 5th level (Nobanion’s wemic paladins have no need for a quadruped mount to carry them into battle).",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-mystic-fire-knight-paladin",
    "name": "Mystic Fire Knight",
    "baseClass": "Paladin",
    "hitDie": 8,
    "flavor": "The Knights of the Mystic Fire serve Mystra by guarding her temples and questing for lost magical troves. They develop increased ability to use magic, counter hostile magic, and defeat enemy spellcasters.",
    "requirements": "To take a Mystic Fire Knight substitution level, a character must have Mystra as her patron deity and be about to take her 4th, 5th, or 6th level of paladin.",
    "classSkills": "Mystic Fire Knight substitution levels have the class skills of the standard paladin plus Knowledge (arcana) and Spellcraft.",
    "levels": [
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Bonus spell, improved spellcasting"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": "+5",
        "ref": "+1",
        "will": "+1",
        "special": "Smite evil 2/day, special mount"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Spellshatter"
      }
    ],
    "featuresText": "All of the following are features of the Mystic Fire Knight substitution levels.\n\nBonus Spell (Su): At 4th level, a Mystic Fire Knight gains a bonus 1st-level paladin spell slot as if from a high Wisdom score. At 8th level, she gains a bonus 2nd-level paladin spell slot, at 11th level she gains a bonus 3rd-level paladin spell slot, and at 14th level she gains a bonus 4th-level paladin spell slot. This benefit replaces the turn undead class feature gained by a standard paladin at 4th level.\n\nImproved Spellcasting (Ex): When casting paladin spells, a Mystic Fire Knight can treat her caster level as equal to one-half her paladin level +2. If she also has arcane spellcasting ability from another class, she can add her caster level from that class to this value to determine her paladin caster level.\n\nSmite Evil (Su): In addition to the normal effect, when a Mystic Fire Knight of 5th level or higher hits a creature with her smite evil attack, that creature finds it temporarily difficult to cast spells or use spell completion or spell trigger items. For 1 round, any attempt to complete one of these actions requires a successful Concentration check (DC 10 + paladin’s level + Cha modifier + spell level); failure means that the action fails. If a spell was being cast, the spell or spell slot is lost; if a magic item was being activated, the attempt merely fails. Multiple smite evil hits on the same creature don’t have a cumulative effect. This class feature augments, but does not replace, the standard paladin’s smite evil class feature.\n\nSpellshatter (Su): Once per day starting at 6th level, a Mystic Fire Knight can choose to deliver a targeted greater dispel magic effect with a melee attack. The decision to use this ability must be made before the attack is rolled; if the attack misses, the effect is wasted. If the attack hits, treat this as if the Mystic Fire Knight had cast a targeted greater dispel magic on the creature struck, using her paladin level (plus any arcane caster level she might have from another class) as her caster level, up to a maximum of +20. This benefit replaces the standard paladin’s remove disease class feature. If the Mystic Fire Knight would later gain an extra weekly use of remove disease, she instead gains an extra daily use of spellshatter.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-noble-heart-paladin",
    "name": "Noble Heart",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "The Companions of the Noble Heart are aggressive knights in the service of Ilmater who have dedicated themselves to eliminating the evil of those who are known to enjoy the torturing and suffering of others. In particular, they oppose members of the church of Loviatar and destroy them and their temples whenever possible. When servants of the other members of the Triad crusade against Loviatar’s servants, Noble Heart knights often join with them.",
    "requirements": "To take a Noble Heart substitution level, a character must have Ilmater as her patron deity and be about to take her 3rd, 4th, or 6th level of paladin.",
    "classSkills": "Noble Heart substitution levels have the class skills of the standard paladin class plus Survival.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Aura of courage, tenacious tracker"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Sunder the sadistic"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Delay poison 1/week"
      }
    ],
    "featuresText": "All of the following are features of the Noble Heart substitution levels.\n\nTenacious Tracker (Su): Beginning at 3rd level, a Noble Heart paladin gains the ability to follow the trail of those cruel enough to torture and maim others. She receives Track as a bonus feat. She gains a +10 competence bonus on Survival checks made to track those who have Loviatar as a patron deity. Furthermore, whenever she physically touches the flesh of one who has been injured within the previous hour by someone who has Loviatar as his patron deity, she receives a clear mental image of that person’s true appearance. This benefit replaces the standard paladin’s divine health class feature.\n\nSunder the Sadistic (Su): At 4th level, a Noble Heart paladin gains the ability to reduce to rubble objects and structures dedicated to evil. Whenever she attacks an object owned by a character who has Loviatar as a patron deity, or an object that is part of a temple or other structure dedicated to Loviatar, she can ignore the object’s hardness. She can also use her smite evil class ability against such objects as if they were evil creatures. This benefit replaces the standard paladin’s ability to turn undead.\n\nDelay Poison (Sp): The enemies of the Noble Heart paladin frequently employ poison in their efforts to spread evil and cruelty. Starting at 6th level, a Noble Heart paladin can use a delay poison effect once per week using her paladin level as her caster level. This benefit replaces the remove disease class feature gained by a standard paladin. If she would later gain extra weekly uses of remove disease, the Noble Heart paladin instead gains extra weekly uses of delay poison.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-phoenix-disciple-monk",
    "name": "Phoenix Disciple",
    "baseClass": "Monk",
    "hitDie": 8,
    "flavor": "The Disciples of the Phoenix are unusual lawful good Kossuthan monks. They are extremely disciplined and take some of their beliefs to painful extremes. Obsessed with the power of fire to purify, they have developed strange monk abilities based on that concept.",
    "requirements": "To take a Phoenix Disciple substitution level, a character must be lawful good, have Kossuth as his patron deity, and be about to take his 1st, 3rd, or 12th level of monk.",
    "classSkills": "Phoenix Disciple substitution levels have the class skills of the standard monk class.",
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": "+2",
        "ref": "+2",
        "will": "+2",
        "special": "Flurry of blows, purifying flame, unarmed strike"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": "+3",
        "ref": "+3",
        "will": "+3",
        "special": "Resistance to fire"
      },
      {
        "level": 12,
        "bab": "+9/+4",
        "fort": "+8",
        "ref": "+8",
        "will": "+8",
        "special": "Fire stride, slow fall 60 ft."
      }
    ],
    "featuresText": "All of the following are features of the Phoenix Disciple substitution levels.\n\nPurifying Flame (Su): A Phoenix Disciple can transform his ki into purifying fire. Once per round, a Phoenix Disciple can add 1d6 points of fire damage to any unarmed strike. The decision to use this ability must be made before the attack is rolled; if the attack misses, the power is wasted. A Phoenix Disciple can use this ability a number of times per day equal to his monk level. This benefit replaces the bonus feat gained by a standard 1st-level monk.\n\nResistance to Fire (Ex): At 3rd level, a Phoenix Disciple develops a minor tolerance for fire. He gains resistance to fire 5. This benefit replaces the still mind class feature gained by a standard monk at 3rd level.\n\nFire Stride (Sp): At 12th level, a Phoenix Disciple gains the ability to use a fire stride effect (see page 69 of the FORGOTTEN REALMS Campaign Setting) once per day, using his monk level as his caster level. This benefit replaces the abundant step class feature gained by a standard monk at 12th level.",
    "skillPointsPerLevel": "4 + Int modifier"
  },
  {
    "id": "cov-sub-purple-staff-cleric",
    "name": "Purple Staff",
    "baseClass": "Cleric",
    "hitDie": 8,
    "flavor": "The Followers of the Purple Staff are a group of divine spellcasters trying to create a benign theocracy in the eastern part of the Dragon Coast. These clerics carry a great deal of political power within the borders of the so-called “Holy Realm” and use their magic to aid the citizens of their new land.",
    "requirements": "To take a Purple Staff substitution level, a character must have Chauntea, Helm, Lathander, Nobanion, Selûne, or Sune as his patron deity and be about to take his 4th, 6th, or 9th level of cleric.",
    "classSkills": "Purple Staff substitution levels have the class skills of the standard cleric class.",
    "levels": [
      {
        "level": 4,
        "bab": "+3",
        "fort": "+4",
        "ref": "+1",
        "will": "+4",
        "special": "Spontaneous faith healing"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": "+5",
        "ref": "+2",
        "will": "+5",
        "special": "Imbue with spell ability"
      },
      {
        "level": 9,
        "bab": "+6/+11",
        "fort": "+6",
        "ref": "+3",
        "will": "+6",
        "special": "Turn invader"
      }
    ],
    "featuresText": "All of the following are features of the Purple Staff substitution levels.\n\nSpontaneous Faith Healing (Su): At 4th level, a Purple Staff cleric gains the ability to spontaneously convert prepared cleric spells of 1st level or higher to cast faith healingMag in the same way she can convert them to cure spells. Armed with this power, a Purple Staff cleric is easily able to deal with even the most severe injuries that common folk might suffer. This class feature replaces the 2nd-level spell slot gained by a standard cleric at 4th level. From this point forward, a Purple Staff cleric has one less 2nd-level spell slot than normal.\n\nImbue with Spell Ability (Sp): At 6th level, a Purple Staff cleric can use an imbue with spell ability effect to imbue a creature with a single 0or 1st-level spell she has prepared. She can use this ability a number of times per day equal to one-half her class level. With this power, an adventuring Purple Staff cleric can leave nonspellcaster lieutenants in town to act on her behalf in emergencies or to spread out her spells to help defend a larger area (though she is not limited to these purposes, of course). This class feature replaces the 3rd-level spell slot gained by a standard cleric at 6th level. From this point forward, a Purple Staff cleric has one less 3rd-level spell slot than normal.\n\nTurn Invader (Su): At 9th level, a Purple Staff cleric is so devoted to protecting his homeland that he can use his ability to turn undead to frighten enemies of the Holy Realm. When standing within the borders of his country, he can turn hostile monsters or enemies of the Holy Realm as a good-aligned cleric turns undead. He cannot destroy such creatures outright using this ability.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-red-falcon-paladin",
    "name": "Red Falcon",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "Members of the Order of the Red Falcon serve the Red Knight and have earned fame in Tethyr for their heroics. They have a reputation for being excellent military tacticians, and even their followers are a cut above the norm.",
    "requirements": "To take a Red Falcon substitution level, a character must have the Red Knight as her patron deity and be about to take her 2nd, 4th, or 6th level of paladin.",
    "classSkills": "Red Falcon substitution levels have the class skills of the standard paladin class plus Knowledge (history).",
    "levels": [
      {
        "level": 2,
        "bab": "+2",
        "fort": "+3",
        "ref": "+0",
        "will": "+0",
        "special": "Brilliant strategy, lay on hands, military knowledge"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Expanded spell list, military knowledge, turn undead"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Military knowledge, remove disease 1/week, spontaneous extend spell, trained militia"
      }
    ],
    "featuresText": "All of the following are features of the Red Falcon substitution levels.\n\nBrilliant Strategy (Ex): At 2nd level and higher, a Red Falcon can draw upon her instinct for battle to give her an amazing ability to predict the imminent actions of her enemies and her best options for taking advantage of those actions. Activating this ability is an immediate action; it grants her an insight bonus to AC equal to her Charisma bonus (if any) for 1 round. A Red Falcon can use this ability a number of times per day equal to one-half her class level. This benefit replaces the standard paladin’s divine grace class feature.\n\nExpanded Spell List: At 4th level, a Red Falcon adds augury (2nd level), deathwatch (1st level), and status (2nd level) to her paladin spell list.\n\nMilitary Knowledge (Ex): Each time a Red Falcon substitution level is taken, the character gains a cumulative +2 competence bonus on Knowledge checks concerning military history or strategy.\n\nTurn Undead (Su): A Red Falcon is not as skilled at turning undead as a normal paladin. She can only use this ability a number of times per day equal to her Charisma modifier.\n\nSpontaneous Extend Spell (Su): At 6th level, once per day a Red Falcon can cast one of her spells as if she had prepared it with the Extend Spell feat. Doing this does not require a higher-level slot or increase the casting time for the spell. This class feature replaces the 1st-level spell slot normally gained at 6th level. From this point forward, a Red Falcon has one less 1st-level paladin spell slot than normal.\n\nTrained Militia: At 6th level, due to her leadership and skill at war, all cohorts and followers of the Red Falcon are treated as if they had Martial Weapon Proficiency in a single weapon of the Red Falcon’s choice. This benefit remains as long as the cohorts and followers remain in her service and as long as she meets with them at least once a month to refresh their training. If more than a month goes by without such a meeting, the cohorts and followers lose this proficiency until she has the opportunity to train them again. A Red Falcon can grant different weapon proficiencies to different cohorts and followers (they don’t all have to gain longsword proficiency, for example).",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-ruby-rose-knight-paladin",
    "name": "Ruby Rose Knight",
    "baseClass": "Paladin",
    "hitDie": 8,
    "flavor": "Members of Sune’s order of paladins, the Sisters and Brothers of the Ruby Rose, are known for their charm, beauty, and aversion to ugliness and evil. They use the power of love to destroy evil and hideous things, and they draw strength from their many romances.",
    "requirements": "To take a Ruby Rose Knight substitution level, a character must have Sune as her patron and be about to take her 3rd, 6th, or 12th level of paladin.",
    "classSkills": "Ruby Rose Knight substitution levels have the class skills of the standard paladin class plus Bluff and Perform (dance, oratory, sing, and string instruments).",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Aura of courage, enduring personality, expanded spell list"
      },
      {
        "level": 6,
        "bab": "+6/+1",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Heroism 1/week"
      },
      {
        "level": 12,
        "bab": "+12/+7/+2",
        "fort": "+8",
        "ref": "+4",
        "will": "+4",
        "special": "Heroic rapture"
      }
    ],
    "featuresText": "All of the following are features of the Ruby Rose Knight substitution levels.\n\nEnduring Personality (Su): A 3rd-level Ruby Rose Knight is immune to any effect that would deal Charisma damage or Charisma drain. This benefit replaces the standard paladin’s divine health class feature.\n\nExpanded Spell List: At 3rd level, a Ruby Rose Knight adds love bite (see page 56) to her paladin spell list (even though she can’t actually cast the spell herself until at least 4th level).\n\nHeroism (Sp): At 6th level, a Ruby Rose Knight can use a heroism effect once per week, using her class level as her caster level. She can’t use this spell-like ability on herself, only on another creature. This benefit replaces the remove disease class feature gained by a standard paladin. If she would later gain extra weekly uses of remove disease, a Ruby Rose Knight instead gains extra weekly uses of heroism.\n\nHeroic Rapture (Su): At 12th level, once per day a Ruby Rose Knight can spend a full-round action embracing another creature to grant it great bravery. The affected creature gains a +4 morale bonus on attack rolls, saves, and skill checks, immunity to fear effects, and a number of temporary hit points equal to the Ruby Rose Knight’s paladin level. The effect lasts for 1 minute. This benefit replaces the 3rd-level spell slot gained by a standard paladin at 12th level. From this point on, a Ruby Rose Knight has one less 3rd-level spell slot than normal.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-shadow-sword-ranger",
    "name": "Shadow Sword",
    "baseClass": "Ranger",
    "hitDie": 8,
    "flavor": "Rangers of the Knights of the Shadow Sword patrol Myth Drannor and attempt to rid it of the evils living there. They use their stealth and spell-power to aid the fighters of their order.",
    "requirements": "To take a Shadow Sword substitution level, a character must have Shaundakul as his patron and be about to take his 3rd, 6th, or 8th level of ranger.",
    "classSkills": "Shadow Sword substitution levels have the class skills of the standard ranger class plus Knowledge (history).",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+3",
        "will": "+1",
        "special": "Walk in silence"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+5",
        "will": "+1",
        "special": "Bane weapon"
      },
      {
        "level": 8,
        "bab": "+8/+3",
        "fort": "+6",
        "ref": "+6",
        "will": "+2",
        "special": "Portal analysis"
      }
    ],
    "featuresText": "All of the following are features of the Shadow Sword substitution levels.\n\nWalk in Silence (Su): At 3rd level, a Shadow Sword gains the ability to move with amazing silence, receiving a +5 circumstance bonus on Move Silently checks for 1 round. The ranger activates this ability with a swift action and can use it a number of times per day equal to one-half his ranger level. This ability only functions if the ranger is wearing light or no armor and carrying no more than a light load. This benefit replaces the Endurance bonus feat gained by a standard ranger at 3rd level.\n\nBane Weapon (Su): At 6th level, a Shadow Sword learns how to temporarily turn any weapon he wields into a bane weapon (see page 224 of the Dungeon Master’s Guide). Activating this ability requires a full-round action, at which point the ranger must choose the type (and subtype, if appropriate) of creature against which the bane special ability will apply. This choice must match a creature type (and subtype) of one of the ranger’s favored enemies. The effect lasts for a number of rounds equal to one-half the ranger’s class level, and can be used a number of times per day equal to one + his Wisdom modifier (minimum 1/day). The bane ability only functions while the weapon is in the ranger’s hands. The ranger can have no more than one weapon affected by this class feature at any time, nor can any weapon benefit from more than one application of this class feature (in either case, a second use immediately ends any previous effect). This benefit replaces the improved combat style class feature normally gained at 6th level. If a Shadow Sword ranger later gains combat style mastery, he instead gains improved combat style.\n\nPortal Analysis (Su): At 8th level, a Shadow Sword gains the ability to sense portals and manipulate them in strange ways. He automatically detects any portal within 10 feet and can thereafter study any portal within 10 feet as if using analyze portal (see page 66 of the FORGOTTEN REALMS Campaign Setting). If he is able to activate the portal, once per day the Shadow Sword can enter it as if using the portal well spell (see page 56). This benefit replaces the swift tracker class feature gained by a standard ranger at 8th level.",
    "skillPointsPerLevel": "6 + Int modifier"
  },
  {
    "id": "cov-sub-shooting-star-ranger",
    "name": "Shooting Star",
    "baseClass": "Ranger",
    "hitDie": 8,
    "flavor": "Rangers of the Order of the Shooting Star (see Knights of the Mystic Fire, page 102) serve Mystra by scouting, spying, and dealing with fiends and monstrosities created by magical experimentation.",
    "requirements": "To take a Shooting Star substitution level, a character must have Mystra as her patron deity and be about to take her 3rd, 4th, or 8th level of ranger.",
    "classSkills": "Shooting Star substitution levels have the class skills of the standard ranger class plus Knowledge (arcana) and Spellcraft.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+3",
        "will": "+1",
        "special": "Weavespeak"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+4",
        "will": "+1",
        "special": "Bonus spells, improved spellcasting"
      },
      {
        "level": 8,
        "bab": "+8/+3",
        "fort": "+6",
        "ref": "+6",
        "will": "+2",
        "special": "Bonus spells, expanded spell list"
      },
      {
        "level": 11,
        "bab": "+11/+6/+1",
        "fort": "+7",
        "ref": "+7",
        "will": "+3",
        "special": "Bonus spells"
      },
      {
        "level": 14,
        "bab": "+14/+9/+4",
        "fort": "+9",
        "ref": "+9",
        "will": "+4",
        "special": "Bonus spells"
      }
    ],
    "featuresText": "All of the following are features of the Shooting Star ranger substitution levels.\n\nWeavespeak (Sp): Because the members of this order need to report their findings over long distances, starting at 3rd level a Shooting Star develops the power to use the Weave itself to transmit short messages. Once per day the character can transmit a message of twenty-five words or less to the nearest cleric, paladin, or ranger of Mystra (the Shooting Star can’t choose the recipient). This ability only functions where the Weave is active, and it cannot jump planar boundaries; the ranger knows if either condition would prevent the message from reaching its target. It is otherwise the equivalent of a sending spell. This benefit replaces the Endurance bonus feat gained by a standard ranger at 3rd level.\n\nBonus Spells (Su): At 4th level, a Shooting Star gains a bonus 1st-level ranger spell slot as if from a high Wisdom score. At 8th level she gains a bonus 2nd-level ranger spell slot, at 11th level she gains a bonus 3rd-level ranger spell slot, and at 14th level she gains a bonus 4th-level ranger spell slot. This benefit replaces the animal companion class feature gained by a standard ranger at 4th level.\n\nImproved Spellcasting (Ex): When casting ranger spells, a Shooting Star can treat her caster level as equal to one-half her ranger level +2. If she also has arcane spellcasting ability from another class, she can add her caster level from that class to this value to determine her caster level.\n\nExpanded Spell List: At 8th level, a Shooting Star adds see invisibility (2nd level) and word of recall (4th level) to her ranger spell list. This replaces the standard ranger’s swift tracker class feature.",
    "skillPointsPerLevel": "6 + Int modifier"
  },
  {
    "id": "cov-sub-vigilant-eye-of-helm-paladin",
    "name": "Vigilant Eye of Helm",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "This paladin order of Helm is growing rapidly and impressing the common folk with its members’ humility and self-sacrifice. The Vigilant Eyes of Helm defend the innocent from threats and develop special ways of recognizing danger and protecting others.",
    "requirements": "To take a Vigilant Eye substitution level, a character must have Helm as her patron deity and be about to take her 1st, 3rd, or 4th level of paladin.",
    "classSkills": "Vigilant Eye substitution levels have the class skills of the standard paladin class.",
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": "+2",
        "ref": "+0",
        "will": "+0",
        "special": "Aura of good, expanded spell list, know greatest enemy, smite evil 1/day"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Aura of courage, vigilant aid"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Awesome smite"
      }
    ],
    "featuresText": "All of the following are features of the Vigilant Eye substitution levels.\n\nKnow Greatest Enemy (Su): A Vigilant Eye automatically knows which enemy in her presence is the most powerful (in game terms, which enemy has the highest CR). This benefit applies only to enemies that she can see that are within 60 feet of her. She does not need to use an action to know this, and this sense updates automatically if current foes leave or die or if new opponents arrive. She doesn’t know why the most powerful enemy is such (for example, she wouldn’t know that the most powerful orc in a patrol was a 3rd-level barbarian), just that it is so. She doesn’t know exactly how tough this enemy is, but does know if that enemy is significantly more powerful than her (in game terms, if its CR is 4 or more above her effective character level). This benefit replaces the standard paladin’s detect evil class feature.\n\nExpanded Spell List: A Vigilant Eye adds see invisibility (2nd level) to her paladin spell list.\n\nVigilant Aid (Su): Starting at 3rd level, when a Vigilant Eye uses the aid another special attack in melee combat to give an ally a bonus to his AC, she only has to spend a move action rather than a standard action. She can use more than one aid another special attack in a single round, but no ally can be aided more than once per round in this fashion. This benefit replaces the standard paladin’s divine health class feature.\n\nAwesome Smite (Su): At 4th level, a Vigilant Eye gains the ability to repel enemies with powerful holy power. As a standard action, she can spend a daily smite evil attempt and strike an evil creature as if she had the Awesome Blow feat (see page 303 of the Monster Manual), even if she does not have the normal prerequisites for that feat. Note that the paladin doesn’t also gain the normal benefit of smite evil. She is treated as if one size category larger than normal for determining which creatures she can affect with this ability. If she accidentally uses this ability against a creature that isn’t evil, she deals normal damage but the Awesome Blow effect is not triggered, and it still counts as one of her daily uses of smite evil. This benefit replaces the standard paladin’s turn undead class feature.",
    "skillPointsPerLevel": "2 + Int modifier"
  },
  {
    "id": "cov-sub-wary-swordknight-paladin",
    "name": "Wary Swordknight",
    "baseClass": "Paladin",
    "hitDie": 10,
    "flavor": "Members of Arvoreen’s Marchers kept halfling villages safe during Tethyr’s Interregnum; the Wary Swordknights are the paladins of the order, and are known for their martial prowess and vigilant nature.",
    "requirements": "To take a Wary Swordknight substitution level, a character must be a halfling, have Arvoreen as her patron deity, and be about to take her 3rd, 4th, or 6th level of paladin.",
    "classSkills": "Wary Swordknight substitution levels have the class skills of the standard paladin plus Listen and Spot.",
    "levels": [
      {
        "level": 3,
        "bab": "+3",
        "fort": "+3",
        "ref": "+1",
        "will": "+1",
        "special": "Divine health, tougher than small"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": "+4",
        "ref": "+1",
        "will": "+1",
        "special": "Uncanny dodge"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": "+5",
        "ref": "+2",
        "will": "+2",
        "special": "Haste (self) 1/day"
      }
    ],
    "featuresText": "All of the following are features of the Wary Swordknight substitution levels.\n\nTougher than Small (Ex): When a Wary Swordknight is subject to a size modifier or special size modifier for an opposed check (such as during grapple checks, bull rush attempts, and trip attempts), she is treated as one size larger if doing so is advantageous to her. A Wary Swordknight is also considered to be one size larger when determining whether a creature’s special attacks based on size (such as improved grab or swallow whole) can affect her. The benefits of this class feature stack with effects that change her size category. This benefit replaces the standard paladin’s aura of courage class feature.\n\nUncanny Dodge (Ex): At 4th level, a Swordknight gains uncanny dodge (as the barbarian class feature of the same name). This benefit replaces the standard paladin’s turn undead class feature.\n\nHaste (Sp): At 6th level, a Swordknight becomes able to use a haste effect on herself once per day. Her caster level for this ability is equal to one-half her paladin level. This benefit replaces the 1st-level spell slot gained at 6th level, as well as the remove disease class feature normally gained at 6th level. From this point forward, a Wary Swordknight has one less weekly use of remove disease than normal. Spells In a world of magic such as Faerûn, the right spell at the right time is sometimes the difference between life and death. Some of the spells described here are only available to characters who have the proper initiate feat (as indicated in the Level entry of the spell description); some provide extra abilities when prepared by a spellcaster; and others are more effective for sorcerers than members of other classes.",
    "skillPointsPerLevel": "4 + Int modifier"
  }
];
