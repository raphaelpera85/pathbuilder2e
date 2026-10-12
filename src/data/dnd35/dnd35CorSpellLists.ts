/**
 * Champions of Ruin (D&D 3.5, Forgotten Realms; scan sem camada de texto), cap. 2, pp. 26-27: "New Spells", listas de magias por classe
 * com o resumo de uma linha de cada magia, como impresso (inglês). Lidas da imagem em resolução reduzida.
 * As descrições completas (pp. 28-40) ainda não foram transcritas. Só dados (sem UI nem Supabase).
 * Marcas impressas: M = componente material, F = foco, X = custo de XP (nas listas aparecem como sobrescrito).
 */
export type CorSpellListEntry = { name: string; summary: string; marks?: string };
export type CorSpellList = { class: "Assassin" | "Bard" | "Blackguard" | "Cleric" | "Druid" | "Ranger" | "Sorcerer/Wizard"; level: number; spells: CorSpellListEntry[] };

const s = (name: string, summary: string, marks?: string): CorSpellListEntry => ({ name, summary, ...(marks ? { marks } : {}) });

const woodwisp = s("Woodwisp Arrow", "Enables a masterwork arrow or bolt to pass through wood.");
const brilliant = s("Brilliant Energy Arrow", "Masterwork arrow or bolt radiates light and ignores armor.");
const spellslayer = s("Spellslayer Arrow", "Masterwork arrow or bolt deals extra damage to a creature with ongoing spells cast upon it.");
const darkflame = s("Darkflame Arrow", "Masterwork arrow or bolt deals normal damage plus 2d6 damage each round for 3 rounds.");
const bloodfreeze = s("Bloodfreeze Arrow", "Masterwork arrow or bolt deals extra 2d6 cold damage and paralyzes target.");
const shadowArrow = s("Shadow Arrow", "Masterwork arrow or bolt deals 1d6 points of Strength damage.");
const remorseless = s("Remorseless Charm", "Suppress the target's alignment, removing all alignment-related inhibitions.", "M");
const markUnfaithful = s("Mark of the Unfaithful", "Mark someone as an enemy of your faith.");
const anathema = s("Anathema", "Break the divine link between your god and lower-ranked members of your faith.");
const enrage = s("Enrage Animals", "Render normal animals hostile and vicious.");
const locateNode = s("Locate Node", "Finds closest node in 1 mile/level radius.");
const airBreathing = s("Air Breathing", "Subjects can breathe air freely.");
const nodeDoor = s("Node Door", "Allows teleportation between any known nodes.");
const controlDark = s("Control Darkness and Shadow", "Manipulate existing areas of darkness and shadow.");
const necroticSkull = s("Necrotic Skull Bomb", "Exploding skull releases negative energy; targets each gain 1d4 negative levels.");
const shadowTrap = s("Shadow Trap", "Bind a greater shadow to an object as its guardian.");

export const COR_SPELL_LISTS: CorSpellList[] = [
  { class: "Assassin", level: 1, spells: [woodwisp] },
  { class: "Assassin", level: 2, spells: [brilliant, spellslayer] },
  { class: "Assassin", level: 3, spells: [s("Arrowsplit", "Transform a masterwork arrow or bolt mid-flight into 1d4+1 masterwork missiles."), darkflame] },
  { class: "Assassin", level: 4, spells: [bloodfreeze, shadowArrow] },
  { class: "Bard", level: 1, spells: [s("Undersong", "Make Perform checks in place of Concentration checks.")] },
  { class: "Bard", level: 2, spells: [controlDark, s("Tvash-Prull's Bonefiddle", "Target takes 1d6 sonic damage/round and -20 penalty on Move Silently checks.")] },
  { class: "Bard", level: 3, spells: [s("Love's Lament", "Creatures in 60-ft. cone take 1d6 Wisdom damage and are nauseated for 1d4 rounds.")] },
  { class: "Bard", level: 5, spells: [remorseless] },
  { class: "Bard", level: 6, spells: [s("Symphonic Nightmare", "Haunting music disrupts target's sleep for 1 day/level.", "F")] },
  { class: "Blackguard", level: 3, spells: [s("Bedevil", "Summon a mischievous spirit to torment your enemy.")] },
  { class: "Cleric", level: 3, spells: [airBreathing, locateNode, s("Slashing Darkness", "Ray deals 1d8/two levels damage and heals undead the same amount.")] },
  { class: "Cleric", level: 5, spells: [necroticSkull] },
  { class: "Cleric", level: 6, spells: [s("Ravage", "A pillar of black, unholy power deals 1d6 vile damage/2 levels (max 10d6)."), remorseless] },
  { class: "Cleric", level: 7, spells: [markUnfaithful, shadowTrap] },
  { class: "Cleric", level: 9, spells: [anathema] },
  { class: "Druid", level: 1, spells: [enrage, woodwisp] },
  { class: "Druid", level: 2, spells: [locateNode, s("Whip of Thorns", "Create a thorny whip that can damage or entangle opponents.")] },
  { class: "Druid", level: 3, spells: [airBreathing, nodeDoor] },
  { class: "Druid", level: 4, spells: [s("Unholy Beast", "Target animal transforms into an unholy minion under your control.")] },
  { class: "Druid", level: 7, spells: [markUnfaithful] },
  { class: "Druid", level: 9, spells: [anathema] },
  { class: "Ranger", level: 1, spells: [enrage, woodwisp] },
  { class: "Ranger", level: 2, spells: [brilliant, spellslayer] },
  { class: "Ranger", level: 3, spells: [s("Arrowsplit", "Transform a masterwork arrow or bolt mid-flight into 2d4 masterwork missiles."), darkflame] },
  { class: "Ranger", level: 4, spells: [bloodfreeze, s("Doublestrike Arrow", "One arrow or bolt strikes two targets within 30 feet of each other."), shadowArrow] },
  {
    class: "Sorcerer/Wizard",
    level: 2,
    spells: [locateNode, s("Node Lock", "Deters others from using a node's powers."), s("Scourge of Force", "Tendrils of force lash foes for 1d8 +1/2 levels damage each.")],
  },
  { class: "Sorcerer/Wizard", level: 3, spells: [airBreathing, controlDark, s("Bedevil", "Summon a mischievous spirit to torment your enemy."), nodeDoor] },
  { class: "Sorcerer/Wizard", level: 4, spells: [s("Serpent Arrow", "Transforms missiles into Tiny vipers.")] },
  { class: "Sorcerer/Wizard", level: 5, spells: [necroticSkull] },
  { class: "Sorcerer/Wizard", level: 6, spells: [remorseless] },
  { class: "Sorcerer/Wizard", level: 7, spells: [shadowTrap] },
  { class: "Sorcerer/Wizard", level: 9, spells: [s("Node Genesis", "Creates a Class 1 node.", "X")] },
];

/** Fim do talento Node Store (p. 26), que continua do fim da p. 25. */
export const COR_NODE_STORE_REST =
  "If you are a spellcaster who does not prepare spells, choose two spells that you know. You can now cast those two spells while in a node to which you are attuned as if you had two extra spell slots per day available. Each such slot can be used only to cast its designated spell; it cannot be used for any other spell (including the other spell designated with this feat). If you leave the node, these extra spell slots become unavailable to you, but you can use them again if you return, provided that you haven't already used them since the last time you rested. You do not need to designate a specific node in which to store your spells when you choose this feat, but you can have spells stored in only one node at a time. You can change the node in which your spells are stored by meditating for 1 hour inside the new node you have selected. Special: You can gain this feat multiple times. Each time you take the feat, it applies to two new spells.";
