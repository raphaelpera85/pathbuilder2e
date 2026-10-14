// ============================================================================
// D&D 3.5 — Cityscape: Magias e Invocações Urbanas (Cap. 2, pp. 65-69)
// Suplemento oficial da Wizards of the Coast (158 págs.).
// 8 magias urbanas + 3 invocações de Warlock (Cocoon of Refuse, Thieves' Bane, Devil's Whispers).
// Ruleset "v35-city".
// ============================================================================

export interface Dnd35CitySpell {
  id: string;
  name: string;
  school: string;
  level: string;
  components: string;
  castingTime: string;
  range: string;
  target?: string;
  area?: string;
  effect?: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
}

export const DND35_CITY_SPELLS: Dnd35CitySpell[] = [
  {
    "id": "city-detect-weaponry",
    "name": "Detect Weaponry",
    "school": "Divination",
    "level": "Bard 1, Cleric 1, Ebonmar Infiltrator 1, Hexblade 1, Paladin 1, Sorcerer/Wizard 1",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "area": "Cone-shaped emanation",
    "duration": "Concentration, up to 10 min./level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "You can detect the presence of weapons in a cone emanating out from you in whatever direction you face. A weapon is generally defined as any manufactured weapon. The spell detects improvised weapons (such as bottles or pitchforks) only if the wielder actively intends to use such an item as a weapon. 1st Round: Presence or absence of weapons. 2nd Round: Number of weapons in the area. 3rd Round: Specific locations of weapons and whether any are drawn."
  },
  {
    "id": "city-false-peacebond",
    "name": "False Peacebond",
    "school": "Abjuration",
    "level": "Assassin 2, Blackguard 2, Sorcerer/Wizard 2",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "One weapon",
    "duration": "1 hour/level (D)",
    "savingThrow": "Will negates (harmless, object)",
    "spellResistance": "Yes (harmless, object)",
    "description": "This spell makes a weapon appear to be bound by a peacebond spell or physically sealed with cord or wire. To casual observation and magical detection, the weapon seems firmly locked in its scabbard. However, the wielder can draw the weapon instantly and freely as normal, with no penalty or check required. The visual and magical illusion collapses as soon as the weapon is drawn.\\nMaterial Component: A small piece of red string."
  },
  {
    "id": "city-impeding-stones",
    "name": "Impeding Stones",
    "school": "Transmutation [Earth]",
    "level": "Druid 1, Ranger 1",
    "components": "V, S, DF",
    "castingTime": "1 standard action",
    "range": "Medium (100 ft. + 10 ft./level)",
    "area": "40-ft.-radius spread",
    "duration": "1 round/level (D)",
    "savingThrow": "Reflex partial; see text",
    "spellResistance": "No",
    "description": "You cause cobblestones, pavers, or natural loose stones in the area to shift, roll, and buck wildly beneath feet. Any creature standing in or entering the area must make a Reflex save or fall prone. The area is treated as difficult terrain; movement costs double. Any creature moving through the area must succeed on a DC 10 Balance check each round or fall prone. A creature that fails a Balance check while attempting to cast a spell must make a Concentration check (DC 15 + spell level) or lose the spell."
  },
  {
    "id": "city-leomunds-spacious-carriage",
    "name": "Leomund's Spacious Carriage",
    "school": "Conjuration (Creation)",
    "level": "Bard 4, Sorcerer/Wizard 4",
    "components": "V, S, M",
    "castingTime": "10 minutes",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "effect": "One quasi-real carriage and team of horses",
    "duration": "1 hour/level (D)",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "You conjure a lavish, comfortable, enclosed carriage pulled by a team of two to four quasi-real horses. The carriage comfortably accommodates up to six Medium passengers and their gear. The interior is protected from rain, dust, and wind, maintaining a comfortable ambient temperature. The horses can travel at a speed of 40 feet and do not tire. The carriage and horses have AC 14 and 30 hit points each; if destroyed, they vanish into smoke.\\nMaterial Component: A tiny wooden wheel and a tuft of horse hair."
  },
  {
    "id": "city-peacebond",
    "name": "Peacebond",
    "school": "Transmutation",
    "level": "Cleric 1, Hexblade 1, Paladin 1, Sorcerer/Wizard 1",
    "components": "V, S, F",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One weapon",
    "duration": "10 min./level (D)",
    "savingThrow": "Will negates (object)",
    "spellResistance": "Yes (object)",
    "description": "The targeted weapon glows faintly and becomes locked firmly in its sheath, holster, quiver, or belt. No amount of physical effort can draw it forth before the spell expires or is dispelled. The spell has no effect on weapons currently held in hand. If the bearer of the targeted weapon is attacked, he is immediately entitled to a second save to overcome the effect and draw the weapon, and can repeat this save each round the assault continues.\\nFocus: A small piece of wire or cord wrapped around the sheath."
  },
  {
    "id": "city-secret-weapon",
    "name": "Secret Weapon",
    "school": "Illusion (Glamer)",
    "level": "Assassin 1, Bard 1, Blackguard 1, Cleric 1, Ebonmar Infiltrator 1, Sorcerer/Wizard 1",
    "components": "V, S, M",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "One weapon touched",
    "duration": "10 min./level (D)",
    "savingThrow": "Will negates (harmless, object)",
    "spellResistance": "Yes (harmless, object)",
    "description": "You disguise a weapon so that it appears to be a mundane, harmless personal item of similar size (such as a walking stick, fan, belt buckle, scarf, or quill). Physical inspection reveals the truth only if the inspector succeeds on an Appraise, Search, or Spot check opposed by your Sleight of Hand check (with a +10 bonus granted by this spell). Drawing or transforming the weapon back into its true form is a free action for the bearer.\\nMaterial Component: A drop of invisible ink."
  },
  {
    "id": "city-summon-pest-swarm",
    "name": "Summon Pest Swarm",
    "school": "Conjuration (Summoning)",
    "level": "Cleric 2, Druid 2, Sorcerer/Wizard 2",
    "components": "V, S, M/DF",
    "castingTime": "1 round",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "effect": "One swarm of bats, rats, or spiders",
    "duration": "Concentration + 2 rounds",
    "savingThrow": "None",
    "spellResistance": "No",
    "description": "You summon a swarm of urban pests (bats, rats, or spiders, as you choose) to plague your enemies. The swarm attacks any creature occupying its space, dealing 1d6 points of swarm damage each round and subjecting victims to distraction (Fortitude save against DC 10 + 1/2 caster level + casting ability modifier or be nauseated for 1 round). In addition, rats expose victims to filth fever, and spiders expose victims to spider poison. You can summon the swarm only in areas where such pests normally dwell (such as urban buildings, sewers, alleyways, or ruins).\\nArcane Material Component: A handful of teeth, claws, and mandibles from urban vermin."
  },
  {
    "id": "city-zone-of-peace",
    "name": "Zone of Peace",
    "school": "Transmutation",
    "level": "Cleric 5, Sorcerer/Wizard 5",
    "components": "V, S, F",
    "castingTime": "1 minute",
    "range": "Touch",
    "area": "10-ft./level emanation centered on touched point",
    "duration": "1 hour/level (D)",
    "savingThrow": "Will negates (object)",
    "spellResistance": "Yes (object)",
    "description": "The entire chamber glows with faint, comforting light. This spell works as peacebond, except that every individual within the area must successfully save or have all their weapons remain trapped in their sheaths or holsters for the duration or until they leave the area. You cannot designate exceptions, including yourself. If subjects inside the zone are attacked, they are immediately entitled to a second save to overcome the effect and draw their weapons, repeating the save each round the attack continues.\\nFocus: A silver cord or chain looped in a circle."
  },
  {
    "id": "city-cocoon-of-refuse",
    "name": "Cocoon of Refuse",
    "school": "Invocation [Least; 1st]",
    "level": "Warlock Invocation (Least, 1st)",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One creature",
    "duration": "1 round/level or until escaped",
    "savingThrow": "Reflex negates",
    "spellResistance": "No",
    "description": "You cause loose trash, rotting garbage, old rags, discarded dishes, and street detritus to swirl into a violent vortex that latches onto a single target creature. If the target fails a Reflex save, it is entangled. The subject can escape with a successful DC 20 Strength or Escape Artist check, which can be repeated each round as a standard action. This invocation requires that at least 50% of the surrounding area contain urban trash; it does not function in wilderness environments. Huge or larger creatures are immune."
  },
  {
    "id": "city-thieves-bane",
    "name": "Thieves' Bane",
    "school": "Invocation [Lesser; 3rd]",
    "level": "Warlock Invocation (Lesser, 3rd)",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Touch",
    "target": "One door or portal touched",
    "duration": "1 hour/level (D)",
    "savingThrow": "Reflex half; see text",
    "spellResistance": "No",
    "description": "You enchant an ordinary door or portal with both a hold portal effect and a deadly booby trap. If anyone other than you opens or forces open the ensorcelled portal from the outside by any means (including knock or dispel magic) before the duration expires, the portal explodes violently outward, dealing 5d6 points of damage to all creatures within 20 feet of that side of the door. Creatures standing on the inside are unaffected. Each creature caught in the blast (except the one that directly triggered the trap) can attempt a Reflex save for half damage."
  },
  {
    "id": "city-devils-whispers",
    "name": "Devil's Whispers",
    "school": "Invocation [Greater; 5th; Mind-Affecting, Compulsion]",
    "level": "Warlock Invocation (Greater, 5th)",
    "components": "V, S",
    "castingTime": "1 standard action",
    "range": "Close (25 ft. + 5 ft./2 levels)",
    "target": "One living creature",
    "duration": "1 hour/level or until completed",
    "savingThrow": "Will negates; see text",
    "spellResistance": "Yes",
    "description": "You use a suggestion effect as the spell. Additionally, when the duration ends or the commanded task is completed, the subject must attempt a second Will save with a -5 penalty. If this second save fails, the subject completely forgets that you were the one who suggested the course of action, becoming convinced that it was entirely his own idea. A successful break enchantment spell can remove this delusion, but dispel magic cannot. You can maintain a number of active devil's whispers equal to your Charisma modifier (minimum 1)."
  }
];
