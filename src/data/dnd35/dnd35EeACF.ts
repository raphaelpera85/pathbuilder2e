// ============================================================================
// D&D 3.5 — Exemplars of Evil: Características Alternativas de Classe (Cap. 1, pp. 20-22)
// Suplemento oficial da Wizards of the Coast (171 págs.).
// 9 características alternativas para Bárbaro, Bardo, Clérigo, Druida, Alma Favorecida,
// Monge, Ranger e Ladino.
// ============================================================================

export interface Dnd35EeAlternativeClassFeature {
  id: string;
  name: string;
  baseClass: string;
  level: number;
  specialRequirement: string | null;
  replaces: string;
  benefit: string;
}

export const DND35_EE_ACF: Dnd35EeAlternativeClassFeature[] = [
  {
    "id": "ee-acf-blasphemous-incantation",
    "name": "Blasphemous Incantation",
    "baseClass": "Cleric",
    "level": 1,
    "specialRequirement": "Must be evil. If alignment changes, you lose access until alignment is restored to evil.",
    "replaces": "Rebuke undead",
    "benefit": "You can call upon your evil master to smite your enemies. All good creatures within 30 feet must succeed on Fortitude saves (DC 10 + 1/2 your caster level + your Cha modifier) or become sickened for a number of rounds equal to your Charisma modifier (minimum 1 round). You can utter a blasphemous incantation a number of times per day equal to 3 + your Cha modifier. If you have 5 or more ranks in Knowledge (religion), the DC increases by 2. Supernatural ability."
  },
  {
    "id": "ee-acf-celestial-slayer",
    "name": "Celestial Slayer",
    "baseClass": "Ranger",
    "level": 1,
    "specialRequirement": "Must be evil.",
    "replaces": "Wild empathy, animal companion, woodland stride",
    "benefit": "You gain spell resistance equal to 10 + your class level against spells and spell-like effects that have the good descriptor. In addition, when you roll to confirm a critical hit against a creature of the good subtype, you gain a +4 competence bonus on the roll."
  },
  {
    "id": "ee-acf-favored-of-the-fiends",
    "name": "Favored of the Fiends",
    "baseClass": "Favored Soul",
    "level": 3,
    "specialRequirement": null,
    "replaces": "Weapon Focus at 3rd level, Weapon Specialization at 12th level",
    "benefit": "Your nails lengthen into ragged claws and your teeth extend into sharp fangs (1d4 claw, 1d6 bite for Medium). Claws are primary natural weapons; bite is secondary natural weapon. Your natural attacks count as evil-aligned for overcoming damage reduction."
  },
  {
    "id": "ee-acf-feign-death",
    "name": "Feign Death",
    "baseClass": "Monk, Ranger, or Rogue",
    "level": 2,
    "specialRequirement": "Level 2 (Monk or Rogue) or Level 9 (Ranger).",
    "replaces": "Evasion (if granted improved evasion later, you gain evasion instead)",
    "benefit": "As an immediate action, you can enter a catatonic state in which you appear to be dead. While feigning death, you cannot see or feel anything, but you retain the ability to smell, hear, and follow what is going on around you. You are immune to mind-affecting effects, poison, sleep, paralysis, stunning, disease, ability drain, negative levels, and death effects. Spells such as status and deathwatch indicate that you are dead. Emerging is a standard action."
  },
  {
    "id": "ee-acf-inspire-hatred",
    "name": "Inspire Hatred",
    "baseClass": "Bard",
    "level": 9,
    "specialRequirement": "12 ranks in Perform.",
    "replaces": "Inspire greatness",
    "benefit": "You evoke hatred in a single living creature within 30 feet (Will DC 10 + 1/2 bard level + Cha modifier negates). The target develops an unreasoning hatred of another creature you indicate, attacking the object of its hate to the exclusion of other opponents. For every three levels beyond 9th, you can target one additional creature."
  },
  {
    "id": "ee-acf-invisible-fist",
    "name": "Invisible Fist",
    "baseClass": "Monk",
    "level": 2,
    "specialRequirement": null,
    "replaces": "Evasion at 2nd level, Improved Evasion at 9th level",
    "benefit": "As an immediate action, you can become invisible for 1 round. You must wait 3 rounds before you can use this ability again. At 9th level, as an immediate action, you can use blink for a number of rounds equal to your Wisdom modifier (minimum 1 round). You must wait 3 rounds before using it again. Supernatural ability."
  },
  {
    "id": "ee-acf-mimic",
    "name": "Mimic",
    "baseClass": "Rogue",
    "level": 1,
    "specialRequirement": "Charisma 12 or higher.",
    "replaces": "Trapfinding (and reductions to trap sense)",
    "benefit": "Once per day, you can use disguise self as a spell-like ability with caster level equal to your class level. At 3rd level and every three levels thereafter, you can reduce your bonus on trap sense by 1 to gain an additional daily use of mimic. You can spend two uses to activate disguise self as a swift action rather than a standard action."
  },
  {
    "id": "ee-acf-spontaneous-affliction",
    "name": "Spontaneous Affliction",
    "baseClass": "Druid",
    "level": 1,
    "specialRequirement": null,
    "replaces": "Spontaneous summon nature's ally",
    "benefit": "You can transform the stored energy of a prepared spell to weaken your enemies. Spending a standard action and sacrificing a prepared spell, all humanoids within 30 feet must succeed on a Fortitude save (DC 10 + 1/2 class level + Cha modifier) or become sickened for a number of rounds equal to the level of the spell sacrificed."
  },
  {
    "id": "ee-acf-unholy-fury",
    "name": "Unholy Fury",
    "baseClass": "Barbarian",
    "level": 1,
    "specialRequirement": "Must be chaotic evil. If alignment changes, reverts to standard rage.",
    "replaces": "Fast movement",
    "benefit": "Once during a rage, you can unleash your unholy fury to smite a nonchaotic evil creature. You add your Charisma bonus to your attack roll and deal an extra 1 point of damage per barbarian level."
  }
];
