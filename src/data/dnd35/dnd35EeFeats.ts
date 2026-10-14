// ============================================================================
// D&D 3.5 — Exemplars of Evil: Talentos de Vilões (Cap. 1, pp. 22-26)
// Suplemento oficial da Wizards of the Coast (171 págs.).
// 16 talentos novos + Evil Brand re-impresso como requisito/referência (total 17).
// Inclui talentos Gerais, Vis (Vile) e de Cerimônia (Ceremony).
// ============================================================================

export interface Dnd35EeFeat {
  id: string;
  name: string;
  type: string;
  prerequisite: string | null;
  summary: string;
  benefit: string;
  normal?: string;
  special?: string;
}

export const DND35_EE_FEATS: Dnd35EeFeat[] = [
  {
    "id": "ee-beloved-of-demons",
    "name": "Beloved of Demons",
    "type": "Vile",
    "prerequisite": "Evil, caster level 6th, Knowledge (the planes) 6 ranks, Evil Brand, Power Attack",
    "summary": "The tanar'ri reward you with unholy vitality whenever you defeat their enemies.",
    "benefit": "Whenever you strike a lawful or good creature and reduce it to the dying or dead condition, you gain a number of temporary hit points equal to 1/2 your class level. Temporary hit points gained from this feat disappear after 1 minute. As an immediate action, you can sacrifice up to 5 temporary hit points to gain damage reduction 5/good for 1 round."
  },
  {
    "id": "ee-blessing-of-the-godless",
    "name": "Blessing of the Godless",
    "type": "Ceremony, Vile",
    "prerequisite": "Evil, Knowledge (religion) 6 ranks",
    "summary": "You invoke the dreadful power of darkness and evil to fill your allies with terrible power.",
    "benefit": "You gain access to ceremonies based on your ranks in Knowledge (religion). Each ceremony allows you to provide up to five allies with malevolent energy. Each rite takes 6 minutes to perform, and requires unholy water and the dung of an evil creature. Each participant stands at one of five points, forming a pentagram with you in the center. The effects of each ceremony last for 24 hours unless otherwise noted.\nDark Pact (6 ranks): You create a pool of reserve hit points equal to your class level × the number of participants. Henceforth, all participants can draw a number of hit points equal to their class level from this pool as an immediate action to recover lost hit points. When the pool is depleted, the effects of the ritual end.\nAnoint the Wicked (9 ranks): Each participant gains a +4 morale bonus on checks made to oppose Intimidate checks and on saving throws against spells and spell-like effects that have the fear descriptor.\nShield of the Godless (12 ranks): Each participant gains a +4 morale bonus on saving throws against divine spells and damage reduction 5/— against smite attacks made against them. In addition, if any participant is affected by a divine spell, all participants within 60 feet gain a +2 morale bonus on attack rolls and damage rolls for 1 round."
  },
  {
    "id": "ee-divine-denial",
    "name": "Divine Denial",
    "type": "General",
    "prerequisite": "Knowledge (religion) 9 ranks, Iron Will",
    "summary": "You harden your will against the power of the deities.",
    "benefit": "Whenever you are the target of a divine spell, you gain a +2 bonus on saving throws to resist the spell. If the spell does not allow a saving throw, you can make a Will save against the spell's DC as if it allowed a save. If you succeed, you negate the effect of the spell."
  },
  {
    "id": "ee-embody-energy",
    "name": "Embody Energy",
    "type": "General",
    "prerequisite": "Energy Substitution, Spell Focus (conjuration)",
    "summary": "You can sacrifice prepared spells to shroud your body in a particular type of energy.",
    "benefit": "You can sacrifice a spell that has an energy descriptor that matches the energy type you selected for the Energy Substitution feat to wreath your body with that energy type. The effect lasts for 1 round per level of the spell sacrificed. While this feat is active, your melee attacks and melee touch attacks deal an extra 1d6 points of damage of that energy type, and you gain resistance equal to 5 × the spell level against that energy type."
  },
  {
    "id": "ee-evasive-maneuvers",
    "name": "Evasive Maneuvers",
    "type": "General",
    "prerequisite": "Caster level 11th, evasion, Cunning Evasion, Spell Focus (illusion), ability to cast invisibility",
    "summary": "When subjected to an attack that allows a Reflex save for half damage, you can disappear.",
    "benefit": "Whenever you use your evasion ability, you can cast invisibility as an immediate action."
  },
  {
    "id": "ee-evil-brand",
    "name": "Evil Brand",
    "type": "Vile",
    "prerequisite": null,
    "summary": "You are physically marked by evil powers, gaining influence over other evil creatures.",
    "benefit": "You gain a +2 bonus on Diplomacy and Intimidate checks made against evil creatures. The mark can be placed anywhere on your body, but it is typically placed where it can be seen.",
    "special": "This feat is required for several other vile feats."
  },
  {
    "id": "ee-fell-conspiracy",
    "name": "Fell Conspiracy",
    "type": "Ceremony",
    "prerequisite": "Wis 13, Knowledge (religion) 4 ranks",
    "summary": "You can forge a telepathic bond between willing allies through dark ritual.",
    "benefit": "You gain access to dark ceremonies that bind you and up to five allies into a sinister network. Performing the rite requires 10 minutes and obsidian dust worth 25 gp per participant. Participants can communicate telepathically with one another out to a distance of 100 feet, and so long as at least one participant is not flat-footed, none of them are considered flat-footed."
  },
  {
    "id": "ee-generous-sacrifice",
    "name": "Generous Sacrifice",
    "type": "General",
    "prerequisite": "Evil, Con 15",
    "summary": "You can absorb negative levels to spare your master or an ally.",
    "benefit": "As an immediate action, whenever a willing or allied creature within 30 feet of you would gain one or more negative levels, you can absorb them instead. You take the negative levels as if you were the original target."
  },
  {
    "id": "ee-gruesome-finish",
    "name": "Gruesome Finish",
    "type": "General",
    "prerequisite": "Base attack bonus +6",
    "summary": "You can finish off a disabled foe with such savagery that other opponents are shaken.",
    "benefit": "Whenever you make an attack that reduces a foe to 0 or fewer hit points, you can use your remaining attacks in the round to brutally dismember or execute that foe. When you do, all enemies within 30 feet who can see you must succeed on a Will save (DC 10 + 1/2 your character level + your Cha modifier) or become shaken for 1 round."
  },
  {
    "id": "ee-hellsworn",
    "name": "Hellsworn",
    "type": "Vile",
    "prerequisite": "Evil, Knowledge (the planes) 9 ranks, Evil Brand, Weapon Focus",
    "summary": "You have sworn your allegiance to the Nine Hells of Baator, gaining infernal power.",
    "benefit": "You gain the extraplanar subtype. Your native plane is now the Nine Hells of Baator, and you select one of two infernal gifts:\nHell's Fury: Once per round, as a free action, you designate a target. Your weapon attacks against that target with your Weapon Focus weapon deal an extra 1d6 points of unholy damage.\nBrimstone Caress: When casting spells with the evil descriptor, your caster level increases by 1. Once per encounter, increase the save DC of any spell you cast by 1 (and half of its damage is unholy).",
    "special": "If you are slain, your soul is dragged to the Nine Hells of Baator. You cannot be restored to life by any means short of miracle or wish."
  },
  {
    "id": "ee-maiming-strike",
    "name": "Maiming Strike",
    "type": "General",
    "prerequisite": "Evil, sneak attack +2d6",
    "summary": "You can sacrifice sneak attack dice to disfigure and weaken a victim's presence.",
    "benefit": "Whenever you make a successful sneak attack, you can choose to forego 2d6 points of sneak attack damage to deal 1 point of Charisma damage to the target."
  },
  {
    "id": "ee-mask-of-gentility",
    "name": "Mask of Gentility",
    "type": "General",
    "prerequisite": "Cha 15, Bluff 9 ranks, Disguise 9 ranks",
    "summary": "You excel at masking your malicious intent behind a facade of courtesy and refinement.",
    "benefit": "Whenever someone uses Sense Motive to assess your motives or get a hunch about you, the DC is 30 (instead of the normal DC 20). In addition, you gain a +4 bonus on saving throws against divination spells that attempt to read your alignment, thoughts, or emotions."
  },
  {
    "id": "ee-proteus",
    "name": "Proteus",
    "type": "General",
    "prerequisite": "Caster level 10th, Spell Focus (illusion)",
    "summary": "You can spontaneously alter your illusion disguises.",
    "benefit": "You can sacrifice a prepared spell to cast any lower-level illusion (glamer) spell. In addition, you can cast a prepared illusion (glamer) spell as an immediate action by sacrificing another spell of the same level."
  },
  {
    "id": "ee-slippery-skin",
    "name": "Slippery Skin",
    "type": "General",
    "prerequisite": "Escape Artist 9 ranks, Combat Reflexes",
    "summary": "You can use your agility and flexibility to elude grappling attempts.",
    "benefit": "If a creature makes a touch attack against you to initiate a grapple, you can sacrifice one of your attacks of opportunity as an immediate action to make an Escape Artist check. You use the check result in place of your touch AC."
  },
  {
    "id": "ee-strength-of-conviction",
    "name": "Strength of Conviction",
    "type": "General",
    "prerequisite": "Smite evil or smite good",
    "summary": "You can channel divine fury against any foe regardless of alignment.",
    "benefit": "Each day, you can sacrifice one use of smite evil or smite good to smite a single target regardless of its alignment. You deal extra damage equal to your class level, though you gain no bonus on the attack roll."
  },
  {
    "id": "ee-twist-the-knife",
    "name": "Twist the Knife",
    "type": "General",
    "prerequisite": "Sneak attack +2d6, Improved Critical (melee weapon)",
    "summary": "You can forego extra critical hit damage to inflict agonizing penalties on your victim.",
    "benefit": "Whenever you confirm a critical hit with a melee weapon for which you have Improved Critical, you can forego the extra damage to wrack the target with pain instead. For a number of rounds equal to the weapon's critical multiplier, the target takes a –3 penalty on attack rolls, weapon damage rolls, saving throws, ability checks, and skill checks."
  },
  {
    "id": "ee-uncanny-forethought",
    "name": "Uncanny Forethought",
    "type": "General",
    "prerequisite": "Int 17, Spell Mastery",
    "summary": "You cunningly reserve spell slots to cast Spell Mastery spells or known spells on the fly.",
    "benefit": "When preparing spells, you can reserve a number of spell slots equal to your Intelligence modifier. As a standard action, you can use one of these reserved slots to cast a spell chosen with Spell Mastery (the slot must be equal to or greater than the spell's level). Alternatively, as a full-round action, you can use a reserved slot to cast any spell you know at a –2 penalty to caster level."
  }
];
