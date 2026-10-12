/**
 * Champions of Ruin (D&D 3.5, Forgotten Realms; scan sem camada de texto), cap. 2, pp. 28-40: descrições das magias novas, em ordem
 * alfabética como no livro (inglês). Lidas da imagem em resolução reduzida e não conferidas em zoom palavra a palavra.
 * Feitas até a p. 31 (Mantle of the Slime Lord); Mark of the Unfaithful começa no fim da p. 31 e entra com a p. 32.
 * Os níveis impressos incluem as classes de prestígio ("Initiate of Gruumsh 2", "justice of weald and woe 3"); conferir contra as listas
 * por classe em dnd35CorSpellLists.ts. Só dados (sem UI nem Supabase).
 */
export type CorSpell = {
  id: string;
  name: string;
  school: string;
  level: string;
  components: string;
  castingTime: string;
  range: string;
  /** Linha de Target/Area/Effect como impressa (com o rótulo). */
  target?: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
  materialComponent?: string;
  focus?: string;
  xpCost?: string;
};

const id = (n: string) => `cor-spell-${n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
const sp = (name: string, rest: Omit<CorSpell, "id" | "name">): CorSpell => ({ id: id(name), name, ...rest });

export const COR_SPELLS: CorSpell[] = [
  sp("Air Breathing", {
    school: "Transmutation",
    level: "Cleric 3, druid 3, sorcerer/wizard 3",
    components: "S, M/DF",
    castingTime: "1 standard action",
    range: "Touch",
    target: "Targets: Living creatures touched, up to one/level",
    duration: "2 hours/level; see text",
    savingThrow: "Will negates (harmless)",
    spellResistance: "Yes (harmless)",
    description:
      "The transmuted creatures can breathe air freely. Divide the duration evenly among all the creatures you touch. The spell does not make creatures unable to breathe water. Air breathing dispels and counters water breathing.",
    materialComponent: "A short reed or piece of straw (arcane).",
  }),
  sp("Anathema", {
    school: "Enchantment (Compulsion)",
    level: "Cleric 9, druid 9",
    components: "V, S, F, DF",
    castingTime: "1 round",
    range: "Unlimited",
    target: "Target: One creature of the same faith as the spellcaster",
    duration: "Permanent",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You can permanently break the divine link between your deity and a lower-level cleric, druid, ranger or paladin of your faith, or upon a common worshiper. The spell has no effect on spellcasters of a faith other than your own. You can pronounce an anathema upon any character of your faith, no matter where he is, even if on a different plane. You cannot pronounce an anathema against someone who is already dead. Some deities do not allow an anathema to be pronounced against the innocent or against their chosen, while others grant their high-level clerics free use of this most terrible of divine curses. An individual under anathema can no longer cast divine spells or call upon the power of his god to turn or command undead, heal, harm, smite, shape change, or use any other divine power associated with his character class. An ordinary worshiper placed under anathema is not allowed to take advantage of any of the faith's services, such as healing, naming, marrying, or burial of the dead. Anyone who dies while under anathema is barred from entry into his deity's plane just as though he had never declared allegiance to a god. His soul is condemned to eternally writhe in the Wall of the Faithless. On a more personal level, the anathema spell marks the subject as accursed with regard to others of the faith. They are not allowed to speak to him, look at him, or even acknowledge his existence. The common members of the faith are only aware that the subject is under anathema if so informed by the church hierarchy; however, clerics, paladins, druids and rangers of the faith can automatically detect an anathema effect simply by looking at the subject. The effect is permanent until lifted, either by the original spellcaster, or by a cleric of the same faith, of a higher level than the caster, who casts an atonement spell upon the subject. The subject of an anathema can also remove its effect by changing his divine allegiance (see Changing Deities, page 233 of the Forgotten Realms Campaign Setting).",
    focus: "The subject's name must be inscribed in a book or scroll especially consecrated for this purpose and detailing the crimes (real or imagined) for which the subject is being condemned. The book is not consumed in the process.",
  }),
  sp("Arrowsplit", {
    school: "Conjuration (Creation)",
    level: "Assassin 3, ranger 3, justice of weald and woe 3",
    components: "V, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, causing it to split in mid-flight into 1d4+1 identical masterwork arrows or bolts. All the missiles strike the same target, and you must make a separate attack roll for each missile. The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. The projectile is destroyed even if it misses its target.",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Battle Line", {
    school: "Abjuration",
    level: "Initiate of Gruumsh 2",
    components: "V, S, DF",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Area: Up to two contiguous 5-ft. squares/level, maximum 10 squares (S)",
    duration: "1 round/level",
    savingThrow: "See text",
    spellResistance: "See text",
    description:
      "By means of this spell you draw a visible, unholy \"line in the sand\" that causes a feeling of dread and hesitation in all creatures that cross it. Any creature entering the affected area must make a Will save or become shaken. A creature that successfully saves cannot be affected again by the same spellcaster's battle line spells for 24 hours.",
  }),
  sp("Bedevil", {
    school: "Conjuration (Summoning) [Evil]",
    level: "Blackguard 3, sorcerer/wizard 3",
    components: "V, S, M",
    castingTime: "1 round",
    range: "See text",
    duration: "1 day/level (D)",
    savingThrow: "No",
    spellResistance: "Yes",
    description:
      "You summon a mischievous spirit and send it to bedevil your enemy. The spirit seeks out its assigned victim wherever she might be, as long as she is on the same plane as you when you cast the spell. It then proceeds to irritate and annoy her through a variety of manifestations. The victim of a bedevil spell finds herself constantly seeing movement out of the corner of her eye. Her sleep is frequently interrupted by bed shaking and blanket shifting and the sounds of voices that fade upon waking. When spellcasting, she suffers a variety of minor irritations that threaten to disrupt her spells, and she constantly feels haunted and watched. The result of this bedevilment is that she takes a -1 penalty on all ability checks, skill checks, and Will saving throws and has a 5% chance of arcane spell failure (which stacks with any spell failure chance from armor worn). Detect evil cast upon the subject of this spell reveals the presence of the bedeviling spirit, while protection from evil keeps the spirit from adversely affecting the victim. A dispel evil spell destroys the mischievous spirit, but remove curse or similar magic has no effect on it.",
    materialComponent: "A tiny iron statuette of a devil or imp, plus either a drop of the intended victim's blood or one personal article belonging to the intended victim.",
  }),
  sp("Bloodfreeze Arrow", {
    school: "Transmutation",
    level: "Assassin 4, ranger 4, justice of weald and woe 4",
    components: "V, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous",
    savingThrow: "Fortitude partial; see text",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, transforming its head into blue ice. In addition to taking normal damage from the missile, the target takes 2d6 points of cold damage and is paralyzed. A successful Fortitude save negates the paralysis, and the target can make a new save each round (at the start of the caster's turn).",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Bloodspear", {
    school: "Transmutation",
    level: "Initiate of Gruumsh 3",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Touch",
    target: "Target: Spear touched",
    duration: "1 round/level",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "This spell allows you to channel the fury of Gruumsh into the god's favored weapon—a spear. The weapon's tip begins to drip blood, and the spear acts as if it had the wounding special ability (see Dungeon Master's Guide page 226) for the duration of the spell. The spell is automatically canceled 1 round after the weapon leaves your hand. You cannot have more than one bloodspear in effect at a time. This spell has no effect on a spear that already has the wounding special ability, and it does not work on artifacts.",
  }),
  sp("Brilliant Energy Arrow", {
    school: "Transmutation",
    level: "Assassin 2, ranger 2, justice of weald and woe 2",
    components: "V, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, transforming its head into brilliant energy that gives off light as a torch (20-foot radius). A brilliant energy missile ignores nonliving matter. Armor bonuses to AC (including any enhancement bonuses to that armor) do not count against it because the missile passes through armor. It deals normal damage and has no effect on constructs, undead, and objects. The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. The projectile is destroyed even if it misses its target.",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Control Darkness and Shadow", {
    school: "Transmutation [Darkness, Shadow]",
    level: "Bard 2, sorcerer/wizard 3",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Area: Shadows in one 5-ft. cube/level",
    duration: "Concentration + 1 round/level",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You can affect existing shadows, both natural and magical, by causing them to deepen, lighten, or even move. You can cause one of the following effects at a time, and can switch them once per round as a free action for the duration of the spell. The chosen effect covers the entire area of the spell; multiple effects may not be applied to different areas. The possible effects are described below. Deepen Darkness and Shadow: Normal shadows now grant a +4 bonus on Hide checks and provide concealment to creatures within them. Magical darkness now confers total concealment to anyone within its area. Lighten Darkness and Shadow: Normal shadows are suppressed within the area, making it impossible to hide within them or use abilities such as the shadowdancer's shadow jump ability. Magical darkness no longer provides concealment, and the area can now be illuminated by any light source. Move Shadow: The affected shadow moves as you direct within the area. You can create shadow illusions (as those created by a silent image spell, but without color), reveal hidden creatures by taking their shadow away, cause shadows to follow you within the area of the spell, or otherwise move the shadow as you see fit. You cannot move areas of darkness in this way.",
  }),
  sp("Darkflame Arrow", {
    school: "Evocation",
    level: "Assassin 3, justice of weald and woe 3, ranger 3",
    components: "V, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous; see text",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, engulfing its head in black fire. The arrow deals normal damage and wreathes the target in black flame that deals an extra 2d6 points of damage. The black flames continue to engulf the victim for 2 more rounds, dealing 2d6 points of damage each subsequent round (at the start of your turn), and they cannot be extinguished (although they can be dispelled). The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. Creatures with immunity or resistance to fire take full damage from the black flames. The projectile is destroyed even if it misses its target.",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Doublestrike Arrow", {
    school: "Transmutation",
    level: "Ranger 4, justice of weald and woe 4",
    components: "V, S, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One arrow or bolt",
    duration: "1 round",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "This spell is cast upon a single arrow or crossbow bolt, enabling it to strike two targets instead of one. The character firing the arrow selects the two targets, both of which must be within 30 feet of each other, and makes a separate attack roll against each target (using the same attack bonus). After striking or missing the first target, the arrow swerves and continues on course to the second target. A doublestrike missile cannot hit the same target twice, and it is destroyed even if it misses its intended targets.",
    materialComponent: "Arrow or bolt.",
  }),
  sp("Enrage Animals", {
    school: "Enchantment (Compulsion) [Mind-Affecting]",
    level: "Druid 1, ranger 1",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Targets: Animals within 30 ft. of each other",
    duration: "1 minute/level",
    savingThrow: "Will negates; see text",
    spellResistance: "Yes",
    description:
      "This spell incites and enrages animals, making them hostile and vicious. Only ordinary animals (those with Intelligence scores of 1 or 2) can be affected by this spell. The maximum number of Hit Dice of animals you can affect is equal to 2d4 + your caster level. A dire animal or an animal trained only to attack on order is allowed a saving throw; other animals are not. For example, a ranger could enrage a normal bear or wolf with little trouble, but it's more difficult to drive a trained guard dog into a frenzy so that it attacks its master. The affected creatures attack the nearest creature, including any other creatures affected by this spell.",
  }),
  sp("Locate Node", {
    school: "Divination",
    level: "Cleric 3, druid 2, sorcerer/wizard 2",
    components: "V, S, F/DF",
    castingTime: "1 standard action",
    range: "1 mile/level; see text",
    target: "Area: Circle, centered on you, with a radius of 1 mile/level; see text",
    duration: "1 minute/level",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You sense the direction of any node within range. You can choose to locate the nearest node, the closest node of a particular type, or a specific node you have visited before; in the latter case, the range is 2 miles/level and the area is a circle, centered on you, with a radius of 2 miles/level. The spell is blocked by even a thin sheet of lead, and it cannot detect nodes protected by a node lock spell.",
    focus: "A pebble found in a node (arcane or divine focus).",
  }),
  sp("Love's Lament", {
    school: "Enchantment (Compulsion) [Mind-Affecting]",
    level: "Bard 3",
    components: "V",
    castingTime: "1 standard action",
    range: "60 ft.",
    target: "Effect: Cone-shaped burst",
    duration: "Instantaneous",
    savingThrow: "Will negates",
    spellResistance: "Yes",
    description:
      "With this spell, you create a cone of music that draws upon the sadness, guilt, and despair of those within its area of effect. All creatures in the area take a -4 penalty on Listen checks for 1 round. In addition, those who fail to save against love's lament are reminded of all their lost loves and disappointments in life. The music seizes upon these feelings and magnifies them, so that the victims of the spell take 1d6 points of Wisdom damage and are nauseated for 1d4 rounds.",
  }),
  sp("Mantle of the Slime Lord", {
    school: "Abjuration",
    level: "Initiate of Ghaunadaur 7",
    components: "V, S, DF",
    castingTime: "1 standard action",
    range: "Personal",
    target: "Effect: Nimbus of divine energy",
    duration: "10 minutes/level (D)",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "This spell causes a glossy nimbus of energy to surround you. This barrier looks like a gelatinous layer of thick, dirty water to observers, but it does not hinder you in the least. While the mantle is active, nonintelligent oozes will not attack you unless you attack them. In addition, you gain immunity to poison, sleep effects, paralysis, polymorph, and stunning effects. Lastly, when a critical hit or sneak attack is scored on you, there is a 75% chance that the critical hit or sneak attack is negated and damage is instead rolled normally.",
  }),
  sp("Mark of the Unfaithful", {
    school: "Evocation",
    level: "Cleric 7, druid 7",
    components: "V, S, F",
    castingTime: "1 round",
    range: "Unlimited",
    target: "Target: One creature",
    duration: "Permanent",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "You permanently place a mark upon a character or creature that identifies it as an enemy of the faith. Anyone of your faith who encounters the bearer of a mark of the unfaithful, even if he is disguised, altered, or polymorphed, feels a natural hostility toward that person and gains a +6 circumstance bonus on Sense Motive checks made against the marked creature. This hostility might not induce the viewer to attack, but he certainly will not be inclined to trust or believe anything the marked one says. Clerics, paladins, druids and rangers of the faith can automatically detect the mark simply by looking at the subject. A mark of the unfaithful is permanent until dispelled or removed by a cleric of the same faith, of higher level than the caster, who casts an atonement spell upon the subject.",
    focus: "The subject's name must be inscribed in a book or scroll especially consecrated for this purpose and detailing the crimes (real or imagined) for which the subject is being marked.",
  }),
  sp("Necrotic Skull Bomb", {
    school: "Necromancy",
    level: "Cleric 5, sorcerer/wizard 5",
    components: "V, S, M",
    castingTime: "1 swift action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Area: 20-ft.-radius spread",
    duration: "Instantaneous",
    savingThrow: "Fortitude negates",
    spellResistance: "Yes",
    description:
      "You imbue a humanoid skull with negative energy and hurl it. The skull detonates on impact, releasing the negative energy contained within. All creatures in the spell's area, except for undead, gain 1d4 negative levels (see Energy Drain, page 308 of the Monster Manual, for details about negative levels). Assuming a creature survives the effect of the spell, it regains lost levels after a number of hours equal to your caster level (maximum 15 hours). Usually, negative levels have a chance of draining a creature's levels, but the negative levels from necrotic skull bomb don't last long enough to do so. An undead creature in the spell's area gains 1d4×5 temporary hit points for 1 hour.",
    materialComponent: "A humanoid skull.",
  }),
  sp("Node Door", {
    school: "Conjuration (Teleportation)",
    level: "Druid 3, sorcerer/wizard 3",
    components: "V",
    castingTime: "1 standard action",
    range: "Varies; see text",
    target: "Target: You and touched willing creatures",
    duration: "Instantaneous",
    savingThrow: "None and Will negates (object)",
    spellResistance: "No and Yes (object)",
    description:
      "You instantly transfer yourself from your current node to any other node of the same type that you have visited. You always arrive at the exact spot desired—whether by simply visualizing the area or by describing your destination (for example, \"the Shadow Weave node in the garden at the Temple of Old Night\"). After using this spell, you can't take any other actions until your next turn. If you arrive in a node that is already partially occupied by a newly added object, you arrive in the closest clear space in that node. If the node is completely filled or has been destroyed by any means, you bounce to the next closest node of the same type (determined randomly or by the DM). Each such \"bounce\" deals 2d6 points of damage to you and any who accompany you. You can bring along objects as long as their weight doesn't exceed your maximum load. You can also bring one additional willing Medium or smaller creature (carrying gear or objects up to its maximum load) or its equivalent per three caster levels; a Large creature counts as two Medium creatures, a Huge creature counts as two Large creatures, and so forth. All creatures to be transported must be in contact with one another, and at least one of those creatures must be in contact with you. As with all spells for which the range is personal and the target is you, you need not make a saving throw, nor is spell resistance applicable to you. Only objects held or in use (attended) by another person receive saving throws and spell resistance. Special: You must have the Node Spellcasting feat to cast this spell.",
  }),
  sp("Node Genesis", {
    school: "Conjuration (Creation)",
    level: "Sorcerer/wizard 9",
    components: "V, S, XP",
    castingTime: "1 tenday (8 hours/day)",
    range: "Touch",
    target: "Effect: One Class 1 node with a 10-ft. radius",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "When you cast this spell, the arcane energies reroute local ley lines and telluric currents, precipitating the creation of a Class 1 node (you determine the type when you cast the spell). The new node is centered on and emanates from a point on the ground you touch. The rough boundary of the new node can cross any type of terrain or empty space, and can cross different types of materials. You have some leeway in determining the initial shape of your node's outer boundary—it doesn't have to be a perfect sphere. The newly generated node retains its Class 1 status for one year. Thereafter, its diameter increases at rate of 20 feet per year, until it eventually reaches a diameter equal to 20 feet per the caster level you possessed at the time of casting. When the node's diameter reaches the low end of the range for the next higher class (see Table 5-1 on page 96), its class increases by +1. For example, a Class 1 node becomes Class 2 when its diameter reaches 40 feet, and Class 3 when its diameter reaches 120 feet. Nodes you create with this spell are automatically considered node locked by you. They are otherwise just like natural nodes and subject to destruction in the same ways. Special: You must have the Node Spellcasting feat to cast this spell.",
    xpCost: "5,000 XP.",
  }),
  sp("Node Lock", {
    school: "Abjuration",
    level: "Sorcerer/wizard 2",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Target: One node",
    duration: "Permanent",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "A node lock spell cast upon a node magically \"locks\" it against others who might wish to use its power. You can affect a node whose class is equal to one-half your caster level or less. For any caster except you, a node lock adds +15 to each Spellcraft DC associated with the use of the node's standard powers. In addition, the node cannot be detected by a locate node spell. A successful dispel magic breaks a node lock.",
  }),
  sp("Pocket Cave", {
    school: "Conjuration (Creation)",
    level: "Initiate of Gruumsh 5",
    components: "V, S, DF",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Effect: Extradimensional cave, up to two 10-ft. cubes/level (S)",
    duration: "1 hour/level (D)",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You conjure up an extradimensional cave that has a single entrance on the plane from which the spell was cast. You can only cast this spell on a surface made of rock or some form of earth. The entry point looks like a dark cave entrance that is 4 feet wide and 8 feet high. Only those you designate can enter the cave, and the portal is shut and made invisible behind you when you enter. You can open it again from your side at will. Creatures entering the cave will find themselves in a dark, wet cavern. The place contains enough oxygen to sustain as many creatures as can fit in the area for the duration of the spell. Edible fungus grows along the walls, and condensation drips down one wall into a pool of fresh, clean water that never seems to run dry. External conditions such as weather do not affect the pleasant atmosphere of the cave, and nothing except the designated creatures can pass through the portal in either direction. At the end of the spell's duration, all within the pocket cave return to the spot where they entered the cave or else to the nearest open space, if that spot is occupied.",
  }),
  sp("Ravage", {
    school: "Necromancy [Evil]",
    level: "Cleric 7",
    components: "V, S, DF",
    castingTime: "1 standard action",
    range: "Medium (100 ft. + 10 ft./level)",
    target: "Area: 10-ft.-radius cylinder, 40 ft. high",
    duration: "Instantaneous",
    savingThrow: "Fortitude negates",
    spellResistance: "Yes",
    description:
      "A terrible column of swirling black energy engulfs creatures and rips at their bodies and souls. All living creatures within the spell's area take 1d6 points of vile damage per two caster levels (maximum 10d6). Unlike regular damage, vile damage can only be healed by magic cast within the area of a consecrate or hallow spell.",
  }),
  sp("Remorseless Charm", {
    school: "Enchantment (Compulsion) [Evil, Mind-Affecting]",
    level: "Bard 5, cleric 6, sorcerer/wizard 6",
    components: "V, S, M",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    duration: "See text",
    savingThrow: "Will negates",
    spellResistance: "Yes",
    description:
      "This spell eliminates normal inhibitions and silences the subject's conscience. Under its effects, a good creature might commit acts of extraordinary evil without any feelings of remorse. For instance, a paladin who strives to never destroy a foe that has surrendered might decide that she's better off meting out justice immediately and killing the enemy. This spell affects the target's norms and expectations; for example, once affected, a good-aligned target might be willing to attack his friends when urged to do so through a suggestion. This would not eliminate his need to atone, according to the tenets and punishments prescribed by his faith or law. The compulsion is permanent until broken by a break enchantment spell or similar magic, or until it is removed by the spellcaster.",
    materialComponent: "One piece of masterwork artwork of at least 1,000 gp in value. The artwork must depict acts of debauchery or evil that are titillating and fascinating, not disturbing. The spell is cast upon the artwork, which is then revealed to the subject of the spell, triggering its effects. The enchantment on the artwork lasts for 1 day per spellcaster level, much like a symbol, until it is viewed and its magical effect is triggered.",
  }),
  sp("Scourge of Force", {
    school: "Evocation [Force]",
    level: "Sorcerer/wizard 2",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Effect: One tendril of force plus one additional tendril per three caster levels (maximum four); Targets: One or more targets, no two of which can be more than 30 ft. apart",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "One or more whiplike tendrils of force spring from your hand and lash targets within range. Make a melee touch attack for each tendril using your highest attack bonus. If a tendril hits, it deals 1d8 points of force damage plus 1 point of force damage per two caster levels (maximum 1d8+5). You can lash a target with multiple tendrils.",
  }),
  sp("Serpent Arrow", {
    school: "Transmutation",
    level: "Justice of weald and woe 3, sorcerer/wizard 4",
    components: "V, S, M",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Target: Up to eight projectiles, all of which must be within 10 ft. of each other at the time of casting; see text",
    duration: "Up to 10 min./level; see text",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You transform wooden arrows, darts, or twigs into Tiny vipers (see Monster Manual page 280). These missiles remain rigid and harmless until fired or hurled. They automatically bite any creature they hit, each dealing 1 point of damage plus poison (injury, Fortitude DC 11, initial and secondary damage 1d6 Con). The missiles remain in snake form for the duration of the spell, fighting the creatures they initially struck using their normal attack bonus. If a missile misses its target, or the target originally struck moves out of reach, the snake moves to attack the nearest creature other than you. If a target falls dead and no others are in range, the spell ends even if its duration has not run out. When the spell expires, the vipers melt away, leaving nothing behind.",
    materialComponent: "Up to eight wooden arrows, darts, or straight twigs, plus a scale from any sort of snake.",
  }),
  sp("Shadow Arrow", {
    school: "Necromancy",
    level: "Assassin 4, justice of weald and woe 4, ranger 4",
    components: "V, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, transforming it into pure black shadow. Make a ranged touch attack with the missile instead of a normal ranged attack. Instead of dealing normal damage, a shadow arrow deals 1d6 points of Strength damage. The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. The projectile is destroyed even if it misses its target.",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Shadow Trap", {
    school: "Conjuration (Summoning) [Shadow]",
    level: "Cleric 7, sorcerer/wizard 7",
    components: "V, S, M",
    castingTime: "10 minutes",
    range: "Touch",
    duration: "1 hour/level (D)",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    description:
      "With this spell, you place a magic trap on any object that casts a shadow. If the object is disturbed in any way that causes its shadow to shift (for instance, if it or a nearby light source is moved), a bound greater shadow (see Monster Manual page 221) emerges from the object's shadow to attack the nearest living creature. The shadow can be turned or destroyed as normal; otherwise, it remains for a number of rounds equal to your caster level. If the trapped object resides in a place that has no shadows, the trap does not trigger, although the spell remains in effect.",
    materialComponent: "A sheet of black cloth large enough to drape over the warded object.",
  }),
  sp("Slashing Darkness", {
    school: "Evocation",
    level: "Clr 3",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Medium (100 ft. + 10 ft./level)",
    target: "Effect: Ray",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "A hissing, hurtling ribbon of pure darkness flies from your hand. A creature struck by this ray of darkness takes 1d8 points of damage per two caster levels (maximum 5d8). An undead creature instead heals 1d8 points of damage per two caster levels (maximum 5d8).",
  }),
  sp("Slime Hurl", {
    school: "Conjuration (Creation)",
    level: "Initiate of Ghaunadaur 5",
    components: "V, S, DF",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Effect: Three globs of green slime",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You conjure and hurl three roughly spherical globs of dark green slime. You must succeed on a ranged touch attack to strike a target with a slime glob (roll separately for each glob, using your best ranged attack bonus). Any creature struck by a glob is coated in a patch of green slime (see Dungeon Master's Guide page 76) and begins to experience its effects immediately. You can hit a creature with multiple globs, each of which must be dealt with separately. The conjured green slime does not disappear automatically and must be destroyed in the normal way.",
  }),
  sp("Spellslayer Arrow", {
    school: "Transmutation",
    level: "Assassin 2, justice of weald and woe 2, ranger 2",
    components: "V, S, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "Instantaneous",
    savingThrow: "None",
    spellResistance: "Yes",
    description:
      "This spell is cast upon a masterwork arrow or bolt, transforming it into a glowing missile that destabilizes other forms of magic. In addition to dealing normal damage, a spellslayer arrow deals an extra 1d4 points of damage for each ongoing spell currently in effect on the target. For example, an arrow would deal an extra 3d4 points of damage to a creature under the effects of bull's strength, haste, and mage armor. The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. The projectile is destroyed even if it misses its target.",
    materialComponent: "Masterwork arrow or bolt.",
  }),
  sp("Symphonic Nightmare", {
    school: "Enchantment (Compulsion) [Mind-Affecting]",
    level: "Bard 6",
    components: "V, S, F",
    castingTime: "1 standard action",
    range: "Touch",
    target: "Target: Living creature touched",
    duration: "1 day/level (D)",
    savingThrow: "Will negates",
    spellResistance: "Yes",
    description:
      "A creature targeted by this spell loses the ability to dream during sleep or rest. Rather, in place of dreams, the target's slumbering mind is filled with the sounds of a discordant orchestra. After the victim's first attempt to sleep, he incurs a -2 penalty on all Wisdom-based skill checks. This penalty persists as long as the symphonic nightmare effect maintains its hold on him. This spell affects all creatures that sleep or enter sleeplike trances; creatures without the need to sleep are effectively immune. In addition, the creature's sleep is now haunted. It can no longer gain complete rest from sleeping or resting. The target does not regain hit points or heal ability damage naturally, nor is it able to prepare spells if doing so requires a full night's rest. The creature is, however, now immune to the dream and nightmare spells, as well as to other effects that cause nightmares (such as the night hag's dream haunting ability). The caster can lift the effect of this curse at will, but it is otherwise difficult to remove a symphonic nightmare before its duration expires. A remove curse cast at a higher caster level than the symphonic nightmare spell removes it, as does a successful break enchantment spell. Otherwise, a wish or miracle is required to lift the curse.",
    focus: "A small statue of an opened skull within which is arranged a miniature orchestra. The quality of this component must be extraordinary, giving it a value of at least 1,000 gp.",
  }),
  sp("Tvash-Prull's Bonefiddle", {
    school: "Necromancy",
    level: "Bard 2",
    components: "V, S, M",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Target: One creature that has a skeleton or exoskeleton",
    duration: "Concentration, up to 1 round/level",
    savingThrow: "Fortitude negates",
    spellResistance: "Yes",
    description:
      "You call up a ghostly fiddle bow in the air above the targeted creature. This bow immediately descends into the subject's body and begins to saw back and forth against its skeleton. Although the music produced is eerily beautiful, it causes intense pain and anguish to the victim. In each round of the duration, the victim takes 1d6 points of sonic damage and has a -20 penalty on all Move Silently checks; the sonic damage is considered to be continuous damage for the purposes of disrupting spellcasting. As a standard action, you can move the bonefiddle to another creature in range, but the new target gains a saving throw to resist the spell. If a target ever makes its saving throw, the bonefiddle vanishes and the spell ends. The spell's effects continue even if the target moves so you no longer have line of sight or line of effect to it, but you cannot shift the bonefiddle to a new target unless you have both line of sight and line of effect to the current target and to the intended target.",
    materialComponent: "A miniature silver fiddle worth at least 30 gp.",
  }),
  sp("Undersong", {
    school: "Transmutation",
    level: "Bard 1",
    components: "V",
    castingTime: "1 standard action",
    range: "Personal",
    target: "Target: You",
    duration: "1 minute/level",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "When you cast this spell, a familiar and soothing song wells up in your mind. The song does not distract you from any task at hand—on the contrary, by humming along to the tune you can focus your mind with ease. As long as this spell is in effect, you can use any Perform check in place of a Concentration check. You must decide which skill to use before any check is made.",
  }),
  sp("Unholy Beast", {
    school: "Transmutation [Evil]",
    level: "Druid 4",
    components: "V, S",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "Target: One animal of up to 1 HD/level",
    duration: "1 round/level",
    savingThrow: "Fortitude negates",
    spellResistance: "Yes",
    description:
      "When you cast this spell, the subject creature temporarily transforms into a being of evil, serving you for the duration of the spell. The animal's limbs and face contort, it sprouts tusks and bone spurs through its skin, and its eyes turn completely black. The animal gains a +2 bonus to Strength, Dexterity, and Constitution, and a +2 bonus to natural armor. Furthermore, the damage of its natural attacks increases as if it were one size category larger. An unholy beast serves you as if it were under the influence of a dominate animal spell.",
  }),
  sp("Whip of Thorns", {
    school: "Transmutation",
    level: "Druid 2",
    components: "V, S, M",
    castingTime: "1 standard action",
    range: "Personal",
    target: "Effect: 15-foot-long whip covered with sharp thorns",
    duration: "1 round/level, or until discharged",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "When you cast this spell, a piece of vine grows into a thorn-studded whip capable of savagely ripping your opponent's flesh. You can wield this whip as if you were proficient, and it follows all the rules for a whip except that it deals 1d8+1 points of lethal damage per strike. Any time you strike a Large or smaller opponent successfully with the whip, you can release it and entangle the creature. Doing this ends the spell, but the thorny vine continues to wrap around your enemy until the opponent breaks free with a successful Escape Artist check (DC equal to the save DC of the spell). On a failed check, the creature takes an additional 1d4 points of damage and remains entangled. On a successful check that exceeds the DC by 10 or less, the creature takes the additional damage in the process of freeing itself. A creature can also attempt to burst the vine with a DC 20 Strength check; it takes 1d4 points of damage whether or not the attempt succeeds.",
    materialComponent: "A tiny piece of vine.",
  }),
  sp("Woodwisp Arrow", {
    school: "Transmutation",
    level: "Assassin 1, druid 1, justice of weald and woe 1, ranger 1",
    components: "V, S, M",
    castingTime: "1 swift action",
    range: "Touch",
    target: "Target: One masterwork arrow or bolt",
    duration: "1 min./level (D)",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "This spell is cast upon a masterwork arrow or bolt, enabling the missile to pass through wood as though it was air, negating any cover benefit the target might enjoy because of wooden doors, tables, or stockade walls, or negating the AC modifier for a wooden shield. The spell doesn't grant the spellcaster the ability to see through wooden obstructions, so unless a clairvoyance spell or similar magic is already in effect, the target is treated as having concealment instead of cover. The arrow or bolt must be fired during the same round the spell is cast, or the magic dissipates and is lost. The projectile is destroyed even if it misses its target.",
  }),
];
