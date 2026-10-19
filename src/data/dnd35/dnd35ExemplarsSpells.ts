/**
 * D&D 3.5 — Exemplars of Evil (ed. inglês), Capítulo 1 "Great Villains",
 * seção "Villainous Spells" / "Spell Descriptions" (pp.26-29). Mantido
 * em inglês (fonte original). Transcrição por leitura visual direta de
 * páginas renderizadas em alta resolução (180dpi) — fonte é scan sem
 * camada de texto. O livro nota: "With your permission, player
 * characters can acquire and learn these spells, but given their often
 * sinister nature, these spells might not be appropriate for all
 * games" — magias de PERSONAGEM, não exclusivas de NPC.
 *
 * COBERTURA COMPLETA (pp.26-29): 11 magias em ordem alfabética (Alibi
 * → Willing Sacrifice), stat block completo (school/level/components/
 * casting time/range/target/duration/save/SR/description) + material
 * component quando aplicável. Confirmado completo por leitura da p.29,
 * onde a seção termina em "Willing Sacrifice" seguida de "VILLAINOUS
 * ORGANIZATIONS" (prosa de ambientação/campanha, não catalogável, fora
 * de escopo de PC).
 */
export type Dnd35ExemplarsSpell = {
  id: string;
  name: string;
  school: string;
  subschool?: string;
  descriptors: string[];
  levels: Record<string, number>;
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
  materialComponent?: string;
  page: number;
};

export const DND35_EXEMPLARS_SPELLS: Dnd35ExemplarsSpell[] = [
  {
    id: "exemplars-spell-alibi",
    name: "Alibi",
    school: "Illusion",
    subschool: "Phantasm",
    descriptors: ["Mind-Affecting"],
    levels: { assassin: 1, bard: 1, "sorcerer/wizard": 1 },
    components: "V",
    castingTime: "1 swift action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "One living creature",
    duration: "Instantaneous",
    savingThrow: "Will disbelief",
    spellResistance: "Yes",
    description:
      "Your target's expression changes as he suddenly recalls seeing you before. You implant a memory of your presence in a target's mind. The creature recalls speaking with you or interacting with you sometime within the last 24 hours. The phantasm is completely believable and the target's mind adapts to the mental intrusion, filling in any gaps in logic.",
    page: 27,
  },
  {
    id: "exemplars-spell-alliance-undone",
    name: "Alliance Undone",
    school: "Transmutation",
    descriptors: [],
    levels: { cleric: 4, hexblade: 2, "sorcerer/wizard": 4 },
    components: "V, S, M/DF",
    castingTime: "1 standard action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    area: "10-ft./level radius",
    duration: "1 minute",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You chant words of discord and unrest while making a breaking motion with your hands. Those around you fall quiet as suspicion and distrust take root in their hearts. Alliance undone suppresses the benefits gained from alliances, including, but not limited to, the effects of ceremony feats, teamwork benefits, companion spirits, and affiliations.",
    materialComponent: "A severed cord.",
    page: 27,
  },
  {
    id: "exemplars-spell-friendly-fire",
    name: "Friendly Fire",
    school: "Abjuration",
    descriptors: [],
    levels: { druid: 4, "sorcerer/wizard": 4 },
    components: "V",
    castingTime: "1 immediate action or 1 full round; see text",
    range: "Personal",
    target: "You",
    duration: "Instantaneous or 1 round/level; see text",
    savingThrow: "—",
    spellResistance: "—",
    description:
      "With an arcane word, you create a shimmering field of golden light around your body that pulses and wavers before vanishing. Whenever you are the target of a ranged attack or a ranged touch attack, you can cast this spell to deflect the attack toward another target within 30 feet. Use the same attack roll. If the redirected attack hits the new target, resolve it as normal. Otherwise, the attack fails. If you extend the casting time to 1 full round, the duration changes from instantaneous to 1 round per caster level.",
    page: 27,
  },
  {
    id: "exemplars-spell-infallible-servant",
    name: "Infallible Servant",
    school: "Necromancy",
    descriptors: ["Evil"],
    levels: { cleric: 3, druid: 4, "sorcerer/wizard": 3 },
    components: "V, S, M",
    castingTime: "1 minute",
    range: "Touch",
    target: "Creature touched",
    duration: "1 hour/level (D)",
    savingThrow: "Will negates; see text",
    spellResistance: "No",
    description:
      "You rub dung onto your minion's brow, intoning dark words to bind his life to your cause. With a touch, you give a target a powerful motivation to avoid failure. If the target is captured by non-evil creatures or is slain, his body dissolves into foul sludge. It is utterly destroyed and cannot be affected by any spell or effect that restores life (such as true resurrection) or a semblance of life (such as animate dead) short of miracle or wish. When the target dissolves, all creatures within 30 feet must succeed on a Fortitude save against the spell's DC or become nauseated for 1d4 rounds.",
    materialComponent: "Dung from an evil creature.",
    page: 27,
  },
  {
    id: "exemplars-spell-phantasmal-injury",
    name: "Phantasmal Injury",
    school: "Illusion",
    subschool: "Phantasm",
    descriptors: ["Fear", "Mind-Affecting"],
    levels: { bard: 3, "sorcerer/wizard": 3 },
    components: "V, S",
    castingTime: "1 standard action",
    range: "Medium (100 ft. + 10 ft./level)",
    target: "One living creature",
    duration: "1 round/level (D)",
    savingThrow: "Will disbelief",
    spellResistance: "Yes",
    description:
      "You cast out your senses to fill your foe's mind, causing him to believe that he has suffered a mortal wound. You create the sensation in the target's mind that he has been disabled (reduced to 0 hit points), restricting him to a single move action or standard action each turn. If the target takes a standard action (or any kind of strenuous activity), he takes 1 point of damage from phantasmal injury. The target remains conscious unless the damage would actually reduce his hit points below 0. This damage is real and remains after the spell's duration has expired.",
    page: 28,
  },
  {
    id: "exemplars-spell-phantasmal-wasting",
    name: "Phantasmal Wasting",
    school: "Illusion",
    subschool: "Phantasm",
    descriptors: ["Fear", "Mind-Affecting"],
    levels: { bard: 4, druid: 4, "sorcerer/wizard": 5 },
    components: "V, S",
    castingTime: "1 standard action",
    range: "Touch",
    target: "One living creature touched",
    duration: "1 round/level (D)",
    savingThrow: "Will disbelief",
    spellResistance: "Yes",
    description:
      "Your touch infects your foe's senses, leading him to believe that he has grown feeble and ancient. With a touch, you cause a target to believe that he has lost his vitality and vigor. For the duration of the spell, the target takes a −6 penalty to Strength, Dexterity, and Constitution.",
    page: 28,
  },
  {
    id: "exemplars-spell-ring-of-fire",
    name: "Ring of Fire",
    school: "Conjuration",
    subschool: "Creation",
    descriptors: ["Fire"],
    levels: { druid: 9, "sorcerer/wizard": 9 },
    components: "V, S, M",
    castingTime: "1 round",
    range: "Medium (100 ft. + 10 ft./level)",
    effect: "10-ft.-radius area of lava; see text",
    duration: "1 round/2 levels",
    savingThrow: "Reflex partial",
    spellResistance: "No",
    description:
      "You utter deep, rumbling tones as you make arcane gestures over the basalt disc, causing it to glow white hot and evaporate in your hand. When you finish, the ground tears open and hot lava wells up from the depths of the earth. You create an area of lava. All creatures in the area that make successful Reflex saves take 1d6 points of fire damage plus 1 point per caster level. Creatures that fail their saves take 1d6 points of damage per caster level, to a maximum of 20d6 points. Creatures that take at least 1 point of damage from ring of fire take an extra 1d6 points of fire damage each round for 3 rounds. Each round after the first, the area of lava expands by 10 feet, becoming a 20-foot-radius ring on the second round, a 30-foot-radius ring on the third round, and so on. As the ring of fire spreads, all creatures in its area must make new saving throws as described above. When the spell's duration expires, the lava cools rapidly. All creatures in the area at that time are held fast and cannot move until they make a successful Strength check or Escape Artist check against the spell's DC. Breaking free of the lava is a full-round action.",
    materialComponent: "A disc of basalt (5 gp).",
    page: 28,
  },
  {
    id: "exemplars-spell-stiffen",
    name: "Stiffen",
    school: "Necromancy",
    descriptors: [],
    levels: { bard: 3, cleric: 3, "sorcerer/wizard": 4 },
    components: "V, S",
    castingTime: "1 standard action",
    range: "Touch",
    target: "Living creature touched",
    duration: "1 round/level (D)",
    savingThrow: "Fortitude partial; see text",
    spellResistance: "Yes",
    description:
      "As you touch your foe, blue spiderwebs appear on his skin, slowing him down and gradually paralyzing him. Upon touching a target, you set in motion a devastating effect that gradually deadens his nerves. On the first round, the target takes a −4 penalty to his Dexterity and all his movement rates are reduced by 5 feet. If the target can fly, his maneuverability is reduced by one step. On the following round, the target can make a new Fortitude save to halt the spell's progress. If the save fails, the penalty to Dexterity worsens to −8, his movement rates are reduced another 5 feet, and his maneuverability is reduced by another 2 steps. This deterioration continues each round until the target succeeds on his save, at which point his condition no longer worsens, or until the target's Dexterity drops to 0. Targets whose movement rates drop to 0 feet cannot move, and targets whose maneuverability drops below clumsy cannot fly. All penalties vanish when the spell's duration expires. If you extend the spell's casting time to 1 standard action, the enhancement penalties double.",
    page: 28,
  },
  {
    id: "exemplars-spell-touch-of-chaos",
    name: "Touch of Chaos",
    school: "Transmutation",
    descriptors: ["Chaos", "Evil"],
    levels: { "sorcerer/wizard": 5 },
    components: "V, S, M",
    castingTime: "1 standard action",
    range: "Touch",
    target: "Living creature touched",
    duration: "1 round/2 levels",
    savingThrow: "Fortitude negates",
    spellResistance: "Yes",
    description:
      "With a hand dripping with pale violet slime, you touch your foe, causing him to collapse into a pile of shifting tissue. Your touch causes a creature to undergo a terrifying transformation. A target that fails its save collapses into a spongy mass of flesh and sinew and takes 1 point of Wisdom drain. Each round, as a free action, the target can attempt a new Fortitude save to regain its form. If the save fails, the target remains transformed and takes another 1 point of Wisdom drain. A target afflicted with touch of chaos cannot use possessions or cast spells. It takes a −4 penalty to Dexterity, its land speed drops to 10 feet, and it loses all other modes of movement. The target can lash out with tentacles that burst from its flesh, but it attacks the closest creature, whether friend or foe. The attack is made with a −4 penalty and has a 50% miss chance. If a tentacle hits the creature, it deals damage based on the afflicted target's size (Small, 1d3 points; Medium, 1d4 points; and Large, 1d6 points).",
    materialComponent: "Slime from a chaos beast.",
    page: 29,
  },
  {
    id: "exemplars-spell-treacherous-weapon",
    name: "Treacherous Weapon",
    school: "Transmutation",
    descriptors: [],
    levels: { bard: 1, hexblade: 1, "sorcerer/wizard": 1 },
    components: "V, S",
    castingTime: "1 immediate action; see text",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "One creature",
    duration: "1 round",
    savingThrow: "Will negates",
    spellResistance: "Yes",
    description:
      "You make a gesture accompanied by a sharp arcane command, and your foe's weapon gives off a momentary shower of sparks. You can cast this spell on any creature wielding a manufactured weapon. If the target fails its saving throw, the weapon penalizes attack rolls and damage rolls. For every two caster levels beyond 1st, the weapon penalty worsens by 1. Thus, at 3rd level, the weapon takes a −2 penalty; at 5th level, a −3 penalty; at 7th level, a −4 penalty; and at 9th level or higher, a maximum −5 penalty. When this spell is cast on a creature wielding a magic weapon, subtract the weapon's enhancement bonus from the penalty. For example, a 1st-level caster would reduce a +1 longsword to a +0 longsword.",
    page: 29,
  },
  {
    id: "exemplars-spell-willing-sacrifice",
    name: "Willing Sacrifice",
    school: "Necromancy",
    descriptors: ["Evil"],
    levels: { cleric: 3, "sorcerer/wizard": 3 },
    components: "V",
    castingTime: "1 swift action",
    range: "Close (25 ft. + 5 ft./2 levels)",
    target: "One creature",
    duration: "1 round/level",
    savingThrow: "None",
    spellResistance: "No",
    description:
      "You utter a blasphemous phrase, and an ally erupts in pale gray flames. When the fire sputters out, you feel the power of corruption coursing through your veins. You deal 1d10 points of damage to a single evil creature within range that is a willing target. As a result, you gain a profane bonus equal to half the number of points of damage dealt. As a free action, you can use the bonus on attack rolls, damage rolls, saving throws, ability checks, or skill checks. You can use as much or as little of the bonus as you wish, but you must declare the use before the results of the die roll are known. At the end of the spell's duration, any unused bonus points are lost. The effects of multiple willing sacrifice spells are not cumulative; you can benefit from only one spell at a time.",
    page: 29,
  },
];
