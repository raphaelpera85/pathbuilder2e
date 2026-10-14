export interface CoaItemData {
  id: string;
  name: string;
  type: 'item' | 'weapon' | 'armor';
  typeLine: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary' | 'artifact';
  attunement: boolean;
  description: string;
}

export interface CoaPatronData {
  id: string;
  name: string;
  alignment: string;
  perks: { name: string; description: string }[];
  contacts: string[];
  description: string;
}

export interface CoaCorruptionStageData {
  id: string;
  stage: number;
  name: string;
  dcText: string;
  description: string;
  effects: string[];
}

export const DND5E_COA_ITEMS: CoaItemData[] = [
  {
    "id": "coa-amulet-of-appearance",
    "name": "Amulet of Appearance",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "Your armor, weapons, and other equipment always\n\nshine as if just polished. Even if you’re wounded,\n\nyour wounds do not appear to others. You’re\n\nimmune to the frightened and poisoned conditions,\n\nas these would otherwise ruin your elegant appear -\n\nance. However, whenever you would otherwise have\n\nbeen affected by one of these conditions, a random\n\nnon-evil Humanoid on the Material Plane whom you\n\nhave previously met gets the condition instead. You\n\nknow this."
  },
  {
    "id": "coa-amulet-of-betrayal",
    "name": "Amulet of Betrayal",
    "type": "item",
    "typeLine": "Wondrous item, very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "You can use a bonus action to move one of the fol-\n\nlowing conditions from yourself to an ally within 60\n\nfeet of you: blinded, deafened, frightened, poisoned,\n\nstunned, exhaustion. When transferring exhaustion,\n\nmove all your exhaustion levels. If the chosen ally is\n\nimmune to a transferred condition, the transfer fails."
  },
  {
    "id": "coa-amulet-of-duplicity",
    "name": "Amulet of Duplicity",
    "type": "item",
    "typeLine": "Wondrous item, very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "When you die, you’re transported to an extradimen-\n\nsional space where you’re stabilized at 0 hit points\n\nand kept in that state. The amulet creates a perfect\n\ncopy of your corpse and places it where you were\n\njust before you died, but without any of your worn or\n\ncarried items. After 24 hours, you regain 1 hit point\n\nand are returned to the location of your near-death.\n\nEverything about you is the same, except that your\n\nfacial features are entirely different from before.\n\nOnly a Wish spell can restore your true identity.\n\nUntil then, you have disadvantage on any Charisma\n\n(Persuasion) checks to attempt to reveal who you\n\nreally are.\n\nCurse. An Identify spell or similar reveals only\n\nthat the amulet can prevent death. Once you attune\n\nto the amulet, you can’t describe its ability to any\n\nother creature, and if unattuned, you immediately\n\nforget what the amulet does. A Remove Curse spell\n\nreveals the details of the curse but does not remove\n\nit from the amulet."
  },
  {
    "id": "coa-bracers-of-asmodeus",
    "name": "Bracers of Asmodeus",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "You have a +2 bonus to AC while wearing these\n\nbracers, if you do not wear armor or use a shield at\n\nthe same time.\n\nCurse. While attuned to the bracers, you become\n\nobsessed with plotting, scheming, and manipula-\n\ntion. You always barter for better deals, often using\n\nsecrets or leveraging other offers in the process. If\n\nyou ever decline an opportunity to better yourself\n\nfinancially at another’s expense, you immediately\n\ntake 3d10 necrotic damage. Only the Remove Curse\n\nspell allows you to end attunement to this item.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-canian-fork",
    "name": "Canian Fork",
    "type": "weapon",
    "typeLine": "Weapon (trident), rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "You have a +3 bonus to attack and damage rolls\n\nmade with this magic weapon. In addition, you can\n\nmake one additional attack with it as a bonus action\n\non each of your turns.\n\nCurse. You’re unwilling to part with this weapon\n\nwhile attuned to it. You’re also vulnerable to radiant\n\ndamage and each time you receive magical healing,\n\nyou must make a DC 15 Constitution saving throw.\n\nOn a failed save, the healing has no effect. Only the\n\nRemove Curse spell allows you to end attunement to\n\nthis item.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-condensed-order",
    "name": "Condensed Order",
    "type": "item",
    "typeLine": "Wondrous item, uncommon",
    "rarity": "uncommon",
    "attunement": false,
    "description": "Condensed Order is a silvery powder that can be\n\nextracted from those of a lawful persuasion. Devils\n\nbound for the warfronts of Avernus take flasks and\n\nsnuff boxes of the stuff to fortify themselves against\n\nexposure to the raw chaos of demons. Taking\n\nthe substance requires an action and makes you\n\nimmune to the flesh warping feature of demonic\n\nichor. It also gives you advantage on saving throws\n\nagainst any effect from a demonic source. These\n\nbenefits last for 8 hours."
  },
  {
    "id": "coa-demonbone-polearm",
    "name": "Demonbone Polearm",
    "type": "weapon",
    "typeLine": "Weapon (polearm), very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "You have a +2 bonus to attack and damage rolls\n\nmade with this magic weapon. In addition, when\n\nyou’re damaged by a creature in reach, you may use\n\nyour reaction to make one melee attack against it\n\nwith this weapon.\n\nCurse. You’re unwilling to part with this weapon\n\nwhile attuned to it. While attuned, you have disad -\n\nvantage on attack rolls with weapons other than\n\nthis one.\n\nWhenever a hostile creature damages you, you\n\nmust succeed on a DC 15 Wisdom saving throw or\n\ngo berserk. While berserk, you must use your action\n\non each of your turns to attack the creature near-\n\nest to you with the weapon. If you can make extra\n\nattacks as part of the Attack action, you use those\n\nextra attacks, moving to attack the next nearest\n\ncreature after you fell your current target. If you have\n\nmultiple possible targets, you attack one at random.\n\nYou’re berserk until you start your turn with no crea-\n\ntures within 60 feet of you that you can see or hear.\n\nAlternatively, an ally can use an action to make a DC\n\n15 Charisma (Persuasion) check and if successful,\n\nyou’re no longer berserk. Only the Remove Curse\n\nspell allows you to end attunement to this item.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-gauntlets-of-rage",
    "name": "Gauntlets of Rage",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement by a bard, sorcerer, warlock, or wizard)",
    "rarity": "rare",
    "attunement": true,
    "description": "You gain the power of never-ending fury. After you\n\nmake a melee weapon attack, you automatically\n\nenter a special fury for 1 minute. While furious, you\n\ncan’t cast spells, can’t verbally communicate, and\n\nare immune to the charmed and frightened condi -\n\ntions. Each time you deal damage, you regain 2d8\n\nhit points and may immediately remove a condition\n\nyou currently suffer from or end this fury. Addition -\n\nally, while in this fury, you may spend a spell slot\n\nbefore you make a melee attack. Doing so causes\n\nthe attack to deal an extra 3 (1d6) necrotic damage\n\nper level of spell slot expended, if the attack hits.\n\nOnce used you may not use this fury again until you\n\nfinish a short or long rest."
  },
  {
    "id": "coa-infernal-amulet",
    "name": "Infernal Amulet",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "While wearing this amulet, you can use it as a\n\nspellcasting focus for your spells, and it grants a +2\n\nbonus to your spell save DC and spell attack bonus.\n\nCurse. You’re unwilling to part with this amulet\n\nwhile attuned to it and you wear it always. While\n\nwearing the amulet you have disadvantage on\n\nStrength saving throws and Strength checks. Only\n\nthe Remove Curse spell allows you to remove the\n\nitem and end attunement.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-infernal-plate-armor",
    "name": "Infernal Plate Armor",
    "type": "armor",
    "typeLine": "Armor (plate), very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "While wearing this armor, you gain a +2 bonus to AC.\n\nCurse. Once you wear this armor, and are attuned\n\nto it, you can’t remove it. Only the Remove Curse\n\nspell allows you to end the attunement and finally\n\ndoff it. While wearing the armor, you’re vulnerable\n\nto the following damage types: force, lightning, psy -\n\nchic, radiant, and thunder.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-knife-of-stolen-resistance",
    "name": "Knife of Stolen Resistance",
    "type": "weapon",
    "typeLine": "Weapon (dagger), rare",
    "rarity": "rare",
    "attunement": false,
    "description": "Using an action, you carve a single infernal rune\n\ninto the flesh of an unconscious Beast, Celestial,\n\nDragon, Fey, or Giant with this knife. Over the next\n\n10 minutes the creature dies an agonizing death\n\nthat can’t be prevented short of the Wish spell. If\n\nthe creature has any resistances or immunities,\n\nyou gain those resistances and immunities until\n\nthe creature dies or a Wish spell is used to save the\n\ncreature. The knife’s power can’t be used again until\n\nyou finish a long rest."
  },
  {
    "id": "coa-ring-of-collecting",
    "name": "Ring of Collecting",
    "type": "item",
    "typeLine": "Ring, very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "While wearing this ring you can use it to cast the\n\nLeomund’s Tiny Hut spell as an action. Once this\n\nproperty is used, it can’t be used again until the\n\nnext dawn. Additionally, as a bonus action, you can\n\nuse the ring to disintegrate any nonmagical piece\n\nof art (drawing, painting, or sculpture) within 60\n\nfeet that is no larger than Medium-sized. That art\n\nnow appears inside the tiny hut, for you to appreci-\n\nate whenever you desire. If you try to remove this\n\nart from the tiny hut, it vanishes forever. You can\n\nsteadily improve this space, but only be denying\n\nsuch beauty to the rest of the world. For every\n\n1,000 gp of art acquired, the tiny hut increases in\n\nsize by adding another foot to its radius and lasts\n\none additional hour."
  },
  {
    "id": "coa-ring-of-the-copycat",
    "name": "Ring of the Copycat",
    "type": "item",
    "typeLine": "Ring, legendary (requires attunement)",
    "rarity": "legendary",
    "attunement": true,
    "description": "You gain the ability to channel energy from allies\n\nto cast spells, even if you normally can’t. When\n\nan ally within 60 feet of you casts a spell that you\n\nnormally can’t cast and that requires 10 gp or fewer\n\nin material components, you may use a reaction to\n\ncast that spell. When cast in this way, the spell is\n\ncast using your ally’s spellcasting ability, spell save\n\nJULIAN CALLE\n\nDC, and spell attack bonus, as needed. You decide\n\nthis cloned spell’s target, as specified in the spell’s\n\ndescription, and the spell originates from you. After\n\nyou use this ability, your ally can’t cast this spell\n\nagain until they finish a long rest."
  },
  {
    "id": "coa-ring-of-treachery",
    "name": "Ring of Treachery",
    "type": "item",
    "typeLine": "Ring, very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "This ring has 3 charges. While wearing this ring,\n\nwhen you’re damaged, you may use a reaction to\n\nexpend a charge and transfer that damage to a ran-\n\ndom creature (which could include an ally) within\n\n60 feet. All charges are restored when you finish a\n\nlong rest."
  },
  {
    "id": "coa-sage-s-mirror",
    "name": "Sage's Mirror",
    "type": "item",
    "typeLine": "Wondrous item, rare",
    "rarity": "rare",
    "attunement": false,
    "description": "This item has 3 charges and regains all charges at\n\ndusk. You can use an action and expend 1 of the\n\nmirror’s charges to cast one of the following spells:\n\n• Find the Path\n\n• Legend Lore\n\nWith each use, it is apparent that the information\n\ngleaned from the mirror comes from a chamber in\n\nthe Nine Hells where sages and scholars are tor-\n\ntured for the answers to each question."
  },
  {
    "id": "coa-skull-of-selfish-knowledge",
    "name": "Skull of Selfish Knowledge",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "You may use an action to make the magical skull\n\ndevour a nonmagical book, map, or scroll. Once\n\ndevoured the learning is forever available to you, but\n\nyou can never write the information down or com-\n\nmunicate it to others. It is for you alone."
  },
  {
    "id": "coa-soul-coins",
    "name": "Soul Coins",
    "type": "item",
    "typeLine": "Wondrous item, uncommon",
    "rarity": "uncommon",
    "attunement": false,
    "description": "Soul Coins are about 5 inches across and about\n\nan inch thick, minted from infernal iron. Each coin\n\nweighs one-third of a pound and is inscribed with\n\nInfernal writing and a spell that magically binds a\n\nsingle soul to the coin. Because each Soul Coin has\n\na unique soul trapped within it, each has a story. A\n\ncreature might have been imprisoned as a result\n\nof defaulting on a deal, while another might be the\n\nvictim of a night hag’s curse.\n\nCarrying Soul Coins. To hold a Soul Coin is to\n\nfeel the soul bound within it—overcome with rage or\n\nfraught with despair.\n\nAn evil creature can carry as many Soul Coins as\n\nit wishes (up to its maximum weight allowance). A\n\nnon-evil creature can carry a number of Soul Coins\n\nequal to or less than its Constitution modifier with -\n\nout penalty. A non-evil creature carrying a number\n\nPowerful infernal items are found\n\nin dangerous places across all\n\nlayers of the Nine Hells.\n\nof Soul Coins greater than its Constitution modifier\n\nhas disadvantage on its attack rolls, ability checks,\n\nand saving throws.\n\nUsing a Soul Coin. A Soul Coin has 3 charges.\n\nA creature carrying the coin can use its action to\n\nexpend 1 charge from a Soul Coin and use it to do\n\none of the following:\n\nDrain Life. You siphon away some of the soul’s\n\nessence and gain 1d10 temporary hit points.\n\nQuery. You telepathically ask the soul a question\n\nand receive a brief telepathic response, which\n\nyou can understand. The soul knows only what it\n\nknew in life, but it must answer you truthfully and\n\nto the best of its ability. The answer is no more\n\nthan a sentence or two and might be cryptic.\n\nFreeing a Soul. Casting a spell that removes a\n\ncurse on a Soul Coin frees the soul trapped within\n\nit, as does expending all of the coin’s charges. The\n\ncoin itself rusts from within and is destroyed once\n\nthe soul is released. A freed soul travels to the realm\n\nof the god it served, or the outer plane most closely\n\ntied to its alignment (DM’s choice). The souls of law-\n\nful evil creatures released from Soul Coins typically\n\nemerge from the River Styx as lemure devils.\n\nA soul can also be freed by destroying the coin\n\nthat contains it. A Soul Coin has AC 19, 1 hit point\n\nfor each charge it has remaining, and immunity to\n\nall damage except that which is dealt by an infernal\n\nwarship’s furnace.\n\nFreeing a soul from a Soul Coin is considered a\n\ngood act, even if the soul belongs to an evil creature.\n\nHellish Currency. Soul Coins are a currency of\n\nthe Nine Hells and are highly valued by devils. The\n\ncoins are used among the infernal hierarchy to bar -\n\nter for favors, bribe the unwilling, and reward the\n\nfaithful for services rendered.\n\nSoul Coins are created by Mammon and his\n\ngreater devils on Minauros, the third layer of the\n\nNine Hells, in a vast chamber where the captured\n\nsouls of evil mortals are bound into the coins. These\n\ncoins are then distributed throughout the Nine Hells\n\nto be used for goods and services, infernal deals,\n\ndark bargains, and bribes."
  },
  {
    "id": "coa-stygian-spear",
    "name": "Stygian Spear",
    "type": "weapon",
    "typeLine": "Weapon (spear or javelin), very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "You have a +2 bonus to attack and damage rolls\n\nmade with this magic weapon. When you throw it,\n\nit deals one extra die of damage on a hit. After you\n\nthrow it and it hits or misses, it flies back to your\n\nhand immediately.\n\nCurse. You’re unwilling to part with this weapon\n\nwhile attuned to it. In addition, you have disadvan-\n\ntage on attack rolls made with weapons other than\n\nthis one.\n\nWhenever you roll a 1 on an attack roll using this\n\nweapon, your target changes to your closest ally.\n\nIf there are multiple allies, randomly determine\n\nwhich is the target. Make a new attack roll with\n\nadvantage against your ally. If the attack hits, in\n\naddition to the standard damage you deal an extra\n\n2d6 poison damage. Only the Remove Curse spell\n\nallows you to end attunement to this item.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-sword-of-retribution",
    "name": "Sword of Retribution",
    "type": "weapon",
    "typeLine": "Weapon (sword), very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "You gain a +3 bonus to attack and damage rolls\n\nmade with this sword. Hit points lost to this weap -\n\non’s damage can be regained only through a short\n\nor long rest, rather than by regeneration, magic, or\n\nany other means.\n\nCurse. You’re unwilling to part with this weapon\n\nwhile attuned to it. While attuned to this weapon,\n\nyou also have disadvantage on attack rolls made\n\nwith weapons other than this one.\n\nThe vengeful spirit possessing the sword shares its\n\nhistory and lust for vengeance with the wielder. After\n\neach successful long rest, you experience nightmares\n\nof the spirit’s past, culminating in its death. When\n\nyou wake, you must make a DC 11 Constitution sav-\n\ning throw. On a failed save, you only gain the benefits\n\nof a short rest. Only the Remove Curse spell allows\n\nyou to end attunement to this item.\n\nCorrupting. This item corrupts. See the “Infernal\n\nItem Corruption” section."
  },
  {
    "id": "coa-vial-of-greed",
    "name": "Vial of Greed",
    "type": "item",
    "typeLine": "Wondrous item, rare (requires attunement)",
    "rarity": "rare",
    "attunement": true,
    "description": "This small glass vial can stockpile resources for\n\nuse in the future. Once stored, resources last for 1\n\ncentury before vanishing. As an action you make the\n\nvial store any number of the following resources,\n\nwhich are magically consumed and converted into a\n\nviolet-colored liquid:\n\n• Up to 31 days of food and/or drink. The flavors are\n\nlost, instead becoming tasteless.\n\n• Up to 7 days of alcohol. The flavors are lost,\n\ninstead becoming tasteless.\n\n• Up to 5 magic scrolls that affect a single crea-\n\nture. The target of the spell is you, and if the spell\n\nrequires concentration, you can concentrate.\n\n• Up to 5 magic potions. No more than 2 duplicate\n\npotions can be stored at a time.\n\nYou may have more than one kind of resource in\n\nthe vial, up to the limits expressed above. You can\n\nuse a bonus action to consume one day of food (or\n\nalcohol) or activate one scroll or magic potion. If\n\nactivating a magic scroll, the effects of that scroll\n\nmust end before you can activate another scroll from\n\nthe Vial of Greed."
  },
  {
    "id": "coa-weapon-of-agonizing-paralysis",
    "name": "Weapon of Agonizing Paralysis",
    "type": "weapon",
    "typeLine": "Weapon (any melee), very rare (requires attunement)",
    "rarity": "very rare",
    "attunement": true,
    "description": "You have a +3 bonus to attack and damage rolls\n\nmade with this magic weapon. When this weapon\n\nreduces a creature to 0 hit points, the creature\n\ndoesn’t die. Instead, infernal runes appear as if\n\ncarved into their flesh and they’re healed to 1 hit\n\npoint. They now have the paralyzed condition until\n\nthe condition is removed by a Lesser Restoration\n\nspell or similar magic. When the condition is\n\nremoved, the runes disappear. At the start of each of\n\ntheir turns while they’re paralyzed, the creature suf -\n\nfers immense pain and gains a level of exhaustion."
  },
  {
    "id": "coa-accounting-and-valuation-of-all-things",
    "name": "Accounting and Valuation of All Things",
    "type": "item",
    "typeLine": "Wondrous item, artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "The Accounting and Valuation of All Things is bound\n\nin gold leaf, with pages of silver and text of blood.\n\nThis is a magic tome that functions as a spell -\n\nbook and arcane focus. You have a +3 bonus to\n\nyour spell attack and spell save DC.\n\nRandom Properties. The Accounting and Val-\n\nuation of All Things has the following random\n\nproperties:\n\n• 1 major beneficial property\n\n• 1 major detrimental property\n\nThe Soul Trade. One section of the book is dedi-\n\ncated to negotiating and valuing mortal souls. When\n\nthe book is opened within 10 feet of a creature with\n\na soul, that creature must make a DC 22 Wisdom\n\nsaving throw. On a failed save, the tome analyzes\n\ntheir greatest desires and calculates exactly what\n\nthey would need to give up their soul. That informa-\n\ntion is then displayed within the tome, such that the\n\nuser can offer a trade to acquire a soul. Creatures\n\nthat succeed on the saving throw simply show up\n\nas a question mark in the book’s pages and are\n\nimmune to further valuations.\n\nMammon’s Tax. When the Accounting and\n\nValuation of All Things is used as a spellbook, it\n\nmaintains a unique ability to forcibly acquire souls.\n\nAny creature killed by a spell transcribed within\n\nthe book has their soul ripped from their body and\n\nsent to Minauros. This process renders the subject\n\nimmune to all forms of resurrection aside from\n\nTrue Resurrection. In payment for their soul, Mam-\n\nmon drops gold equal to (20 x CR) or (2 x Level) on\n\ntheir corpse.\n\nNegotiation Tactics. The tome is capable of provid-\n\ning some assistance to all negotiations, not just those\n\nmade for souls. You gain a passive +5 to Charisma\n\n(Persuasion) checks made to barter. Additionally, as\n\nan action, you can surrender your consciousness to\n\nthe tome, allowing it to take over. For 1 minute, the\n\nAccounting and Valuation of All Things speaks for\n\nyou, using a +12 Charisma (Persuasion) skill and\n\ngaining advantage on your rolls. Using the book in\n\nthis manner has a corrupting influence, and each\n\nuse compels you to become increasingly greedy,\n\nvain, and evil—much like its original owner, Mam -\n\nmon. When the duration ends, if your alignment is\n\nnon-evil, you suffer 6d6 necrotic damage.\n\nTranscribed Spells. The spellbook section of the\n\nAccounting and Valuation of All Things comes with\n\nsome spells already recorded. For each spell level,\n\nroll (1d4–1). The DM will determine the necessary\n\nspells of each level that already exist within the\n\ntome. If you copy spells from the tome to your own\n\nspellbook, the cost in gold is doubled. On the oppo-\n\nsite end, copying spells from your spellbook to the\n\ntome only costs half the gold it normally would.\n\nDestroying the Tome. Destroying the Accounting\n\nand Valuation of All Things can be done in two ways.\n\nThe first option is a simple bribe to Mammon to have\n\nhim destroy the tome. An offering of 99,999 gp must\n\nbe made, at midnight, by opening the book and plac -\n\ning the gold inside. If Mammon accepts the offering,\n\nthe gold melts around the book, then both vanish.\n\nThe second route, in case Mammon is unavailable\n\nor unwilling, is to incinerate the book. To accom-\n\nplish this task, a pot of platinum (valued at no less\n\nthan 99,999 gp) must be melted, enough to fully\n\nsubmerge the book. Once the platinum is prepared,\n\ndropping the tome into the molten solution melts the\n\ntome. The process completely destroys the tome, as\n\nwell as the platinum."
  },
  {
    "id": "coa-amulet-of-the-inferno",
    "name": "Amulet of the Inferno",
    "type": "item",
    "typeLine": "Wondrous item, artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "When Fierna was born, petitioners and devils from\n\nall over came to celebrate her birth. Many brought\n\ngifts and treasures, including a powerful infernal\n\nwarlock. Recognizing the strength and inner fire of\n\nFierna, the warlock gifted her with the Amulet of the\n\nInferno, and it has been around her neck ever since.\n\nThe Amulet of the Inferno is a magic necklace\n\nthat grants a +3 bonus to spell save DC and spell\n\nattack bonus.\n\nRandom Properties. The Amulet of the Inferno\n\nhas the following random properties:\n\n• 3 major beneficial properties\n\n• 2 major detrimental properties\n\nInfernal Fire. While worn, the amulet augments\n\nany magical flames created by you, transforming\n\nnormal fire into Hellfire. Hellfire ignores resistances\n\nand immunities to fire damage and deals double\n\ndamage to creatures vulnerable to either fire or\n\nnecrotic damage. It is also capable of melting stone,\n\nas well as igniting flammable objects.\n\nRaging Inferno. While attuned to the Amulet of\n\nthe Inferno, you may use a bonus action to cast Fire\n\nBolt or Produce Flame. The cantrips scale based on\n\nyour total character level and use Intelligence as a\n\nspellcasting modifier if you’re normally incapable of\n\ncasting spells.\n\nEverburning. The Amulet of the Inferno grants\n\nresistance to cold damage and the ability to breathe\n\nunderwater. Any magical flames you conjure are\n\nsimilarly augmented: they can be used underwater,\n\ncan’t be extinguished through any means, and can\n\nexude any temperature. While the casting of a fire\n\nspell can still be interrupted with Counterspell,\n\nonce the spell has been cast, any lingering flames\n\ncan’t be removed.\n\nDestroying the Amulet. The only creature capa-\n\nble of destroying the amulet is the warlock that cre -\n\nated it. Nobody living knows the warlock’s identity,\n\nmaking destroying the amulet almost impossible."
  },
  {
    "id": "coa-ranseur-of-torture",
    "name": "Ranseur of Torture",
    "type": "weapon",
    "typeLine": "Weapon (pike), artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "Forged of infernal iron and Hellfire through the help\n\nof Dispater, the Ranseur of Torture has been Belial’s\n\nweapon of choice since he first became an archdevil.\n\nIt is so directly tied to him that one of his worshipped\n\nsymbols is a two-pronged fork. The weapon never\n\nleaves his side, and he is a master at wielding it.\n\nThe Ranseur of Torture is a magic pike. You have\n\na +3 bonus to attack and damage rolls made with\n\nthis weapon, and it does 2d10 piercing damage\n\ninstead of its regular damage. When you hit a good\n\naligned creature with it, that creature takes an extra\n\n1d10 necrotic damage.\n\nRandom Properties. The Ranseur of Torture has\n\nthe following random properties:\n\n• 1 minor beneficial property\n\n• 1 major beneficial property\n\n• 1 minor detrimental property\n\nWounding. Damage dealt by the Ranseur of\n\nTorture is particularly dangerous, as it can only be\n\nrestored through magical means. Resting, food, and\n\nmedicine won’t restore hit points removed by the\n\npike. If the damage goes untreated for 7 days, the\n\nmissing hit points are permanently removed, and\n\ncan be recovered only through casting a Regenerate\n\nor Wish spell on the victim.\n\nExecution. If a creature with less than its full hit\n\npoints is hit by this pike, the Ranseur of Torture\n\ndeals 1d10 additional piercing damage. If a creature\n\nis killed by the pike, their soul is sent to Phlegethos\n\nand can be restored only through casting a Wish\n\nspell on the victim.\n\nStaggered. Each time a creature takes damage\n\nfrom the Ranseur of Torture, they must make a\n\nConstitution save, with a DC equaling the damage\n\nthey took. On a failed save, their movement speed\n\nis reduced by 5 feet until the end of their next turn.\n\nThis penalty stacks, though movement speed can’t\n\nbe reduced below 0.\n\nAmulet of the\n\nInferno\n\nAARON SIMS\n\nRanseur of\n\nTorture\n\nInterrupting. Spellcasters damaged by the Ran-\n\nseur of Torture have disadvantage on Constitution\n\nchecks made to maintain concentration until the\n\ndamage is healed. If a creature is concentrating on a\n\nspell when damaged by the ranseur, their concentra-\n\ntion is immediately ended.\n\nDestroying the Ranseur. Only through the writ-\n\nten consent of both Dispater and Belial can the\n\nRanseur of Torture be destroyed. If either or both\n\nof the archdevils are dead, then the new arch-\n\ndevil to take their mantle must give permission\n\nin their stead. The two writs must be wrapped\n\naround each of the prongs of the weapon, then the\n\nweapon must be tossed into the Pit of Flame. If\n\nperformed successfully, the Hellfire briefly burns\n\na different hue."
  },
  {
    "id": "coa-ruby-rod-of-asmodeus",
    "name": "Ruby Rod of Asmodeus",
    "type": "item",
    "typeLine": "Rod, artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "Asmodeus’s Ruby Rod is said to have been con-\n\nstructed from a shard of pure evil, a ruby soaked in\n\nthe blood of the innocents, the drool from a draconic\n\ndeity, and the tears of 777 angels. It is a magic rod\n\nthat functions as a morningstar and you have a +2\n\nbonus to attack and damage rolls made with it. All\n\ndamage dealt with it is converted to necrotic, and\n\nwhen you hit a good aligned creature, that creature\n\ntakes an extra 2d12 necrotic damage.\n\nThe Ruby Rod of Asmodeus has 66 charges and\n\nregains 6d6 charges each nightfall. Asmodeus is\n\nalways capable of perceiving through the rod and\n\nknows the exact location of any creature attuned\n\nto it. If a creature uses the special abilities of the\n\nrod without Asmodeus’s permission, they take\n\n2d12 necrotic damage each use, doubled if they’re\n\ngood aligned. This damage ignores resistances\n\nand immunities, and if it kills the user, Asmodeus\n\npermanently claims their soul.\n\nRandom Properties. The Ruby Rod of Asmodeus\n\nhas the following random properties:\n\n• 1 minor beneficial property\n\n• 1 major beneficial property\n\n• 2 major detrimental properties\n\nAsmodeus is immune to the detrimental proper -\n\nties of the weapon.\n\nBow to the King. You may use an action to\n\nexpend 33 charges to use the rod to force all\n\ncreatures within a 150-foot-radius to bow to you.\n\nA creature must succeed on a DC 21 Charisma\n\nsaving throw or be forced to kneel for up to 1 hour.\n\nCreatures immune to the charmed condition have\n\nadvantage on their save. Each time a kneeling\n\ncreature takes damage, they may repeat the save,\n\nending the effect on a success. The effect also ends\n\nearly for kneeling creatures if they’re touched by\n\nthe Ruby Rod.\n\nAARON SIMS\n\nAcid, Cold, and Lightning. At a cost of 9 charges\n\neach use, you may use an action to trigger one of the\n\nfollowing effects:\n\n• You project acid in a 60-foot line that is 5 feet\n\nwide. Each creature in that line must make a DC\n\n18 Dexterity saving throw, taking 12d8 acid dam-\n\nage on a failed save, or half as much damage on a\n\nsuccessful one.\n\n• You project an icy blast in a 60-foot cone. Each\n\ncreature in that area must make a DC 19 Constitu -\n\ntion saving throw, taking 12d8 cold damage on a\n\nfailed save, or half as much damage on a success -\n\nful one.\n\n• You shoot lightning in a 90-foot line that is 5 feet\n\nwide. Each creature in that line must make a DC\n\n19 Dexterity saving throw, taking 12d10 lightning\n\ndamage on a failed save, or half as much damage\n\non a successful one.\n\nReactions. As a reaction to suffering a detrimen -\n\ntal effect, you may cast Lesser Restoration (expend-\n\ning 3 charges) or Greater Restoration (expending\n\n12 charges.)\n\nAdditionally, if you’re the sole target of a spell,\n\nyou may use a reaction to attempt to use the rod to\n\nabsorb the spell and cancel its effect. You roll\n\nScourge of\n\nShadow\n\nRuby Rod of\n\nAsmodeus\n\n1d20 + 2, and if the result is higher than the spell\n\nlevel + 10, the spell is absorbed into the rod. The rod\n\nregains charges equal to the spell level it absorbed.\n\nIf the absorbed charges go over the maximum of 66\n\ncharges, it overloads, dealing 1d6 necrotic damage\n\nper charge to you and expending all charges.\n\nDestroying the Rod. While Asmodeus lives, the\n\nRuby Rod of Asmodeus can’t be destroyed, and\n\nif attempted it simply returns to Asmodeus. If he\n\nwere defeated, the rod could be destroyed by bring-\n\ning it to the Abyss from whence it was created, then\n\nperforming a ritual known only to Asmodeus."
  },
  {
    "id": "coa-scourge-of-shadow",
    "name": "Scourge of Shadow",
    "type": "weapon",
    "typeLine": "Weapon (whip), artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "Said to be a gift to Glasya from Asmodeus, the\n\nScourge of Shadow is a multi-headed whip con-\n\nstructed from infernal iron. The scourge is nigh-in -\n\ndestructible, and Glasya carries it with her wherever\n\nshe goes. When she wields the whip in battle, it\n\nshrouds her in an aura of shadow.\n\nThe Scourge of Shadow is a magic whip. You\n\nhave a +3 bonus to attack and damage rolls made\n\nwith this weapon, and it does 3d4 slashing damage\n\ninstead of its regular damage. When you hit a good\n\naligned creature with it, that creatures takes an\n\nextra 4d4 necrotic damage.\n\nWhenever an unattuned creature attacks with\n\nthe weapon, it deals 2d4 necrotic damage, ignoring\n\nresistances and immunities, to them, but otherwise\n\nfunctions normally.\n\nRandom Properties. The Scourge of Shadow has\n\nthe following random properties:\n\n• 2 minor beneficial properties\n\n• 1 major beneficial property\n\n• 2 minor detrimental properties\n\n• 1 major detrimental property\n\nKeen. The whip scores a critical on a roll of 18,\n\n19, or 20. When it scores a critical, its damage\n\ndice are upgraded to 3d6 instead of 3d4 for the\n\nduration of the attack. If attacking a good aligned\n\ncreature, or attacking with the weapon unattuned,\n\nthe necrotic damage dice are also increased to a d6\n\ninstead of a d4.\n\nFast Reflexes. While attuned to the Scourge of\n\nShadow, you gain advantage on initiative rolls, and\n\nyou add your Charisma and Dexterity modifiers to\n\nthe roll. You may use either your Strength, Dexter-\n\nity, or Charisma modifier for the attack and dam-\n\nage rolls (the same modifier must be used for both\n\nattack and damage).\n\nVeil of Shadow. You’re protected by a field of\n\nshadow that makes you resistant to radiant and\n\nnecrotic damage. While in dim light or darkness you\n\ngain blindsight out to 60 feet and Dexterity (Stealth)\n\nchecks are made with advantage.\n\nDestroying the Scourge. Though the process is\n\nknown only to Glasya and Asmodeus, the Scourge\n\nof Shadow can be destroyed. It must be taken to the\n\nPit of Fire in Phlegethos. The scourge, along with\n\nthe body of an archdevil, must be thrown into the\n\nHellfire together. As they hit the flames, a spell of\n\nDarkness must be cast at 9th level on the scourge.\n\nIf each part of the ritual is performed correctly, the\n\nwhip disintegrates within the Hellfire."
  },
  {
    "id": "coa-true-ice-shards",
    "name": "True-Ice Shards",
    "type": "weapon",
    "typeLine": "Weapons (rapier and dagger), artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "Crafted from the very glacier in which he was\n\nimprisoned, the True-Ice Shards are a rapier and\n\nparrying dagger (main gauche) pair used by Levis -\n\ntus. They exemplify his time spent in the glacier,\n\naugmenting telepathy, divination, and defense. Due\n\nto his control over ice, Levistus can conjure the\n\nTrue-Ice Shards from anywhere, including if they\n\nwere destroyed.\n\nYou gain a +3 bonus to attack and damage rolls\n\nmade with the magical rapier and it does 1d8 cold\n\ndamage instead of its regular damage. When using\n\nthe magic dagger, you gain a +3 bonus to your AC,\n\nas long as it is used as your offhand weapon, and it\n\ndoes 1d6 cold damage instead of its regular damage.\n\nBecause Levistus conjures the True-Ice Shards\n\nat will, he often rewards a copy of the artifact to his\n\nmost loyal followers. The copies are identical to the\n\noriginal with one exception: Levistus can destroy or\n\nretrieve a copy at any time.\n\nRandom Properties. The True-Ice Shards have\n\nthe following random properties:\n\n• 2 major beneficial properties\n\n• 2 minor detrimental properties\n\n• 1 major detrimental property\n\nSub-Zero. Cold damage dealt with the shards\n\nignores resistances and immunities. Creatures vul -\n\nnerable to cold damage take triple damage from the\n\nTrue-Ice Shards, rather than double.\n\nAfter you damage a creature with the shards,\n\nyou may use a bonus action to force the creature\n\nto make a DC 22 Constitution saving throw. On\n\na failed save, the creature that took the damage\n\nbecomes vulnerable to cold damage for 24 hours.\n\nOnce you use this feature, you may not use it again\n\nuntil after you have finished a long rest.\n\nThe Best Defense. As a reaction to being\n\nattacked, you use the rapier to increase your\n\ndefense, adding +3 to your AC until the end of your\n\nnext turn. If you attack with the rapier before the\n\nend of your next turn, you do not have its +3 bonus\n\nto attack and damage rolls.\n\nMental Command. While attuned to the True-Ice\n\nShards, you can use an action to cast the Detect\n\nThoughts spell (save DC 20), targeting any creature\n\nyou have previously met. If the targeted creature\n\nis on a different plane of existence, the spell fails.\n\nAs long as you maintain concentration, you can\n\nuse a bonus action to send a telepathic message to\n\nthe focused creature. It can reply—using a bonus\n\naction to do so—as long as the focus and concentra-\n\ntion continue.\n\nOmniscient. You can use the True-Ice Shards to\n\ncast a variety of divination spells. Locate Animals or\n\nPlants, Locate Creature, and Locate Object may be\n\ncast at will, and don’t have a maximum range. Other\n\nlimitations of the spells still apply, and they can’t\n\ndetect subjects on other planes of existence.\n\nAdditionally, you may cast Scrying (with a spell\n\nsave DC of 20) and Find the Path. Once either spell\n\nis cast, you must finish a long rest before casting\n\neither of them again.\n\nDestroying the Shards. While Levistus still\n\nlives, destroying the True-Ice Shards serves little\n\npurpose, as he is capable of recreating them at\n\nwill. That aside, the shards can be destroyed when\n\nsubjected to a sufficient source of heat. A few such\n\nsources include the inside of an active volcano, a\n\ncontinuous source of Hellfire, or a powerful fire\n\nspell cast at 9th level."
  },
  {
    "id": "coa-wrought-iron-tower",
    "name": "Wrought-Iron Tower",
    "type": "weapon",
    "typeLine": "Weapon (warhammer), artifact (requires attunement)",
    "rarity": "artifact",
    "attunement": true,
    "description": "Constructed from the same materials as his tower,\n\nDispater’s Wrought-Iron Tower is a powerful\n\nweapon that marks his rule over Dis. It embodies\n\nhis ideals, representing defense, authority, and\n\npower. Its construction changes hourly, similar to\n\nthe tower, appearing as either iron, steel, lead, or\n\nadamantine.\n\nThe Wrought-Iron Tower is a magic staff that func -\n\ntions as a warhammer and you have a +3 bonus to\n\nattack and damage rolls made with it. If a creature\n\nis vulnerable to a certain type of damage, all dam -\n\nage dealt with the staff is converted to that damage\n\ntype. When you hit a good aligned creature with it,\n\nthat creature takes an extra 3d6 fire damage.\n\nWrought-\n\nIron Tower\n\nAARON SIMS SERGEY MUSIN\n\nWhile holding the staff, you can control and\n\nnavigate through the Iron Tower in Dis. While the\n\nstaff is on the layer of Dis, Dispater knows the exact\n\nlocation of it, and is capable of teleporting to within\n\n30 feet of it at will.\n\nRandom Properties. The Wrought-Iron Tower\n\nhas the following random properties:\n\n• 2 minor beneficial properties.\n\nThe Best Offense. While attuned to the staff, you\n\nhave a +2 bonus to AC and a +2 bonus to all saving\n\nthrows.\n\nAdditionally, the staff has 10 charges. When you\n\nmake an attack, you may spend 1 or more charges.\n\nFor each charge spent, you deal an additional 2 fire\n\ndamage on a successful attack. Charges are still\n\nconsumed if the attack misses. The staff regains all\n\ncharges each day at dawn.\n\nAfter dealing damage with the staff, you may use\n\na bonus action and expend 1 charge to replace the\n\ndamage dealt with your total AC instead.\n\nRulership. The Wrought-Iron Tower also functions\n\nas a Rod of Rulership, with an increased save DC\n\nof 18. This property costs 3 charges to use, though\n\na creature that successfully saves against one of its\n\nuses is immune to future uses for 24 hours.\n\nSlag. You can cast Searing Smite at 6th level on\n\nyourself, expending 1 charge. Instead of doing fire\n\ndamage, you may have Searing Smite inflict acid\n\ndamage. The spell requires no concentration and\n\nlasts for 1 minute.\n\nDestroying the Staff. The Wrought-Iron Tower\n\ncan only be destroyed inside the Iron Tower on Dis.\n\nLocated somewhere within the tower is the forge\n\nthat Dispater used to create the staff. An attuned\n\ncreature must place the staff into the forge fires,\n\nthen cast Dispel Evil and Good and touch the staff.\n\nThey then take 20d10 fire damage, which ignores\n\nresistance and immunities. If the attuned creature\n\nsurvives the fire damage, the staff is destroyed."
  }
];

export const DND5E_COA_PATRONS: CoaPatronData[] = [
  {
    "id": "coa-patron-hellriders-of-elturel",
    "name": "Hellriders of Elturel",
    "alignment": "Good",
    "contacts": [
      "Ramius Dangremond"
    ],
    "description": "Cavaleiros sagrados devotados a salvar almas e resgatar celestiais aprisionados nas profundezas dos Nove Infernos.",
    "perks": [
      {
        "name": "Hellrider's Blessing",
        "description": "The Hellriders know better than most the evils found in the Nine Hells and would never send anyone there without protection. After spending the entirety of a long rest in the Nine Hells, you gain the benefit of a Greater Restoration spell."
      },
      {
        "name": "Celestial Cavalry",
        "description": "While much of the journey through the Nine Hells follows the River Styx, it is likely that you will occasionally leave on excursions or scouting missions. While you remain in the Nine Hells, you may cast the Phantom Steed spell at will, as a ritual."
      },
      {
        "name": "Hellrider's Salvation",
        "description": "You're taught a ritual to help save missing Celestials. The ritual requires 1 minute to complete and targets all Celestials within 100 feet. Once the ritual is complete, if the Celestial is willing, they're transported to a location on the Material Plane of their choosing."
      }
    ]
  },
  {
    "id": "coa-patron-conclave-of-halruaa",
    "name": "Conclave of Halruaa",
    "alignment": "Neutral",
    "contacts": [
      "Zythan Avhoste"
    ],
    "description": "Uma sociedade secreta de arquimagos de Halruaa dedicada a conter abusos mágicos e recuperar segredos infernais.",
    "perks": [
      {
        "name": "Arcane Communication",
        "description": "The Conclave gives you a Sending Stone and a Halruaan Ethereal Vessel. The Sending Stone communicates directly with your contact. The Halruaan Ethereal Vessel is a transparent container (up to 12 cubic feet) that can be recalled from the Ethereal Plane with an action to store or exchange items across planes."
      },
      {
        "name": "Arcane Quartermasters",
        "description": "The Conclave grants preferred access to rare spell scrolls (especially Divination up to 5th level), crystal balls, gems of seeing, and brooms of flying, and buys excess spellbooks and scrolls recovered from Hell."
      }
    ]
  },
  {
    "id": "coa-patron-deathstalkers-of-bhaal",
    "name": "Deathstalkers of Bhaal",
    "alignment": "Evil",
    "contacts": [
      "Sarevok Anchev"
    ],
    "description": "Cultistas fanáticos do Senhor do Assassinato que buscam colher almas valiosas e Soul Coins no inferno.",
    "perks": [
      {
        "name": "Death Token",
        "description": "Each party member receives a Token of Bhaal. The first time you fail a death saving throw that does not kill you outright, the token transports you and any fallen allies within 30 feet to an empty demiplane chamber, healing each 10 hit points before returning to the battlefield at the start of your turn. Single use (turns to dust)."
      },
      {
        "name": "Deathstalker's Blessing",
        "description": "You have advantage on attack rolls against any creature that hasn't taken a turn in combat yet. In addition, any creature that hasn't taken a turn in combat has disadvantage on saving throws against your spells. Applies while in the Nine Hells."
      },
      {
        "name": "Soul Coin Market",
        "description": "Provides access to the Soul Coin market and black market bartering with devils and deathstalkers."
      }
    ]
  }
];

export const DND5E_COA_CORRUPTION: CoaCorruptionStageData[] = [
  {
    "id": "coa-corruption-stage-1",
    "stage": 1,
    "name": "Infernal Corruption: Stage One (Beginnings)",
    "dcText": "DC 10 Wisdom saving throw (Tieflings have advantage)",
    "description": "Uma vez que o personagem se sintoniza com um item amaldiçoado ou artefato infernal, o processo de corrupção se inicia a cada descanso longo.",
    "effects": [
      "A cada descanso longo concluído, faça um teste de resistência de Sabedoria DC 10 (Tieflings têm vantagem).",
      "Em um sucesso, o personagem não sofre efeitos, mas a DC aumenta em +1 para o próximo teste.",
      "Em uma falha, avança para o Estágio 2, a menos que Dispel Evil and Good seja conjurado antes do próximo descanso longo.",
      "Quebrar a sintonização interrompe os testes e reseta a DC, mas apenas se o personagem ainda estiver no Estágio 1."
    ]
  },
  {
    "id": "coa-corruption-stage-2",
    "stage": 2,
    "name": "Infernal Corruption: Stage Two (Sufferings)",
    "dcText": "DC acumulativa de Sabedoria",
    "description": "O personagem entra em sofrimento agudo, com ilusões de perseguição e pesadelos infernais.",
    "effects": [
      "O personagem torna-se delirante, enxergando conspirações inexistentes contra si.",
      "Sussurros e visões terríveis a cada descanso.",
      "Ao concluir um descanso longo, sofre 6 (1d12) de dano necrótico que ignora resistências e imunidades e não pode ser curado até que Remove Curse ou Dispel Evil and Good seja conjurado.",
      "Apenas magias como Divine Word, Heal, Mass Heal, True Polymorph, True Resurrection ou Wish podem remover a corrupção neste estágio."
    ]
  },
  {
    "id": "coa-corruption-stage-3",
    "stage": 3,
    "name": "Infernal Corruption: Stage Three (Departings & Mutations)",
    "dcText": "Inerente (transformação física diabólica)",
    "description": "A vontade do personagem foi quebrada e seu corpo começa a mutar para a forma de um diabo (1d10 na tabela de deformidades).",
    "effects": [
      "O personagem torna-se estéril e é detectado como Corruptor (Fiend) por magias como Detect Evil and Good.",
      "Rola 1d10 na tabela de mutações físicas: 1) Garras alongadas; 2) Asas de couro vestigiais; 3) Chifres diabólicos; 4) Pele queimada/carbonizada; 5) Olho leitoso e olho amarelo; 6) Cauda esquelética; 7) Pele calcificada em osso; 8) Cascos fendidos; 9) Espinhos no lugar do cabelo; 10) Dentes serrilhados pontiagudos.",
      "A cada descanso curto ou longo, teste de Sabedoria DC 10 (com desvantagem se tiver cometido um ato maligno recente). Falha avança para o Estágio 4."
    ]
  },
  {
    "id": "coa-corruption-stage-4",
    "stage": 4,
    "name": "Infernal Corruption: Stage Four (Finalities & Damnation)",
    "dcText": "Irreversível sem Wish ou Contrato Infernal",
    "description": "A alma foi completamente reclamada pelo inferno e o personagem transforma-se plenamente em um servo de Asmodeus.",
    "effects": [
      "A tendência do personagem muda permanentemente para Leal e Mau (Lawful Evil).",
      "O personagem fica vinculado ao Código dos Diabos: deve honrar qualquer pacto assinado e colher almas a serviço de Asmodeus.",
      "A forma física transmuta-se para a de um diabo escolhido pelo Mestre.",
      "As únicas curas possíveis são a magia Wish (além do escopo padrão da magia) ou a assinatura de um contrato com o próprio Asmodeus para reaver a alma."
    ]
  }
];
