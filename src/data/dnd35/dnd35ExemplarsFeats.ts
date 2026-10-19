/**
 * D&D 3.5 — Exemplars of Evil (ed. inglês), Capítulo 1 "Great Villains",
 * seção "Feat Descriptions" (pp.22-26), Table 1-1: Villainous Feats.
 * Transcrição por leitura visual direta de páginas renderizadas em alta
 * resolução (180dpi) — fonte é scan sem camada de texto.
 *
 * Mantido em inglês (fonte original), nomes/campos traduzidos apenas no
 * header. Estes são talentos de PERSONAGEM (não exclusivos de NPC
 * vilão) — o livro recomenda cautela ao Mestre antes de revelá-los aos
 * jogadores, mas são mecanicamente válidos para PCs.
 *
 * COBERTURA COMPLETA (pp.23-26): 17 talentos da Tabela 1-1 (General:
 * 12, Ceremony: 2, Vile: 3 — "Blessing of the Godless" aparece em
 * Ceremony E Vile no livro original, contado uma vez como "ceremony",
 * totalizando 17 linhas de tabela em 16 entradas únicas), todos com
 * `fullDescription` completo. "Feats from Other Sources" (p.25,
 * sidebar com 17 talentos reimpressos/citados de outros suplementos —
 * Able Learner, Arcane Strike, Battlecaster Offense, Black Lore of
 * Moil, Clinging Breath, Divine Vigor, Elemental Adept, Energy
 * Substitution, Lifebond, Magic Sensitive, Maximize Breath, Monkey
 * Grip, Oversized Two-Weapon Fighting, Quicken Breath, Rapid
 * Metamagic, Telling Blow, Verminfriend) deliberadamente NÃO
 * catalogado aqui — são talentos ORIGINADOS em outros livros (PHB2,
 * Complete Arcane, etc.), citados apenas como referência cruzada
 * atrelada a personagens-exemplo deste livro; catalogá-los aqui
 * duplicaria/fragmentaria a fonte correta de verdade por livro.
 */
export type Dnd35ExemplarsFeat = {
  id: string;
  name: string;
  category: "general" | "ceremony" | "vile";
  prerequisites: string;
  benefit: string;
  fullDescription: string;
  special?: string;
  page: number;
};

export const DND35_EXEMPLARS_FEATS: Dnd35ExemplarsFeat[] = [
  {
    id: "exemplars-feat-divine-denial",
    name: "Divine Denial",
    category: "general",
    prerequisites: "Knowledge (religion) 9 ranks, Iron Will",
    benefit: "+2 to saves against divine spells",
    fullDescription:
      "You harden your will against the power of the deities. Whenever you are the target of a divine spell, you get a +2 bonus on saving throws to resist the spell. If the spell does not allow a saving throw, you can make a Will save as if it allowed a save. If you succeed, you negate the effect of the spell.",
    page: 23,
  },
  {
    id: "exemplars-feat-embody-energy",
    name: "Embody Energy",
    category: "general",
    prerequisites: "Energy Substitution, Spell Focus (conjuration)",
    benefit: "Wreathe your body with damaging energy",
    fullDescription:
      "You can sacrifice prepared spells to shroud your body in a particular type of energy. You can sacrifice a spell that has an energy descriptor that matches the energy type you selected for Energy Substitution. By doing so, you wreathe your body with the energy for 1 round per level of the spell sacrificed. You are immune to the energy generated, and your natural attacks and attacks made with weapons deal an extra 1d6 points of damage of the appropriate type. Creatures that attempt to grapple you or that successfully attack you with a natural weapon or an unarmed strike take 1d6 points of damage for each hit or round of sustained contact.",
    special: "You can select this feat multiple times. Each time, it applies to a new type of energy that you have selected for the Energy Substitution feat.",
    page: 23,
  },
  {
    id: "exemplars-feat-evasive-maneuvers",
    name: "Evasive Maneuvers",
    category: "general",
    prerequisites: "Caster level 11th, evasive, Cunning Evasion, Spell Focus (illusion), ability to cast invisibility",
    benefit: "When using evasion, you can cast invisibility as an immediate action",
    fullDescription:
      "You can vanish into the confusion created by area spells. Once per encounter, if you are caught in an area attack whose damage you completely avoid due to evasion or improved evasion, you can cast a prepared or known invisibility spell as an immediate action.",
    page: 23,
  },
  {
    id: "exemplars-feat-generous-sacrifice",
    name: "Generous Sacrifice",
    category: "general",
    prerequisites: "Evil, Con 15",
    benefit: "Donate negative levels to a willing target",
    fullDescription:
      "You can relieve your afflictions by donating them to an ally. Whenever you gain one or more negative levels, you can transfer some or all of them to a willing creature that you touch.",
    page: 23,
  },
  {
    id: "exemplars-feat-gruesome-finish",
    name: "Gruesome Finish",
    category: "general",
    prerequisites: "Base attack bonus +6",
    benefit: "Give up remaining attacks to make a disabled foe die instead",
    fullDescription:
      "You deliver a terrifying blow to finish off a victim and strike fear into the hearts of your enemies. Whenever you make a full attack and reduce an opponent to 0 or fewer hit points, you can give up any remaining attacks you have in the round to force the target to make a Fortitude save (DC 10 + 1/2 your level + Cha modifier). If the target fails the save, he dies instead of becoming disabled, and all creatures within 30 feet must succeed on Will saves against the same DC or become sickened for 1 round.",
    special: "You can use this feat only if you have still one or more attacks left in a round after reducing your target to 0 or fewer hit points.",
    page: 23,
  },
  {
    id: "exemplars-feat-maiming-strike",
    name: "Maiming Strike",
    category: "general",
    prerequisites: "Evil, sneak attack +2d6",
    benefit: "Sacrifice 2d6 sneak attack damage to deal 1 Cha damage",
    fullDescription:
      "You can make dreadful attacks that disfigure your opponents. Whenever you make a successful sneak attack on a target creature, you can reduce your extra damage and deal Charisma damage instead. For every 2 dice of extra damage that you sacrifice, your attack deals 1 point of Charisma damage.",
    page: 23,
  },
  {
    id: "exemplars-feat-mask-of-gentility",
    name: "Mask of Gentility",
    category: "general",
    prerequisites: "Cha 15, Bluff 9 ranks, Disguise 9 ranks",
    benefit: "Defeat divination attempts and make it harder to discern your motives",
    fullDescription:
      "You cunningly hide your true motives and nature behind a facade of camaraderie and gentility. If you are subjected to a divination spell that normally would reveal your alignment, your alignment registers as neutral. In addition, if someone tries to use the Sense Motive skill to get a hunch about your purpose or nature, she must succeed on a DC 30 check to obtain an accurate impression.",
    special: "Getting a hunch normally requires a DC 20 Sense Motive check.",
    page: 23,
  },
  {
    id: "exemplars-feat-proteus",
    name: "Proteus",
    category: "general",
    prerequisites: "Caster level 10th, Spell Focus (illusion)",
    benefit: "Exchange a prepared spell for an illusion (glamer) spell",
    fullDescription:
      "You are a master of masking your features behind a myriad of disguises. You can sacrifice a prepared spell to cast any lower-level illusion (glamer) spell. In addition, you can cast a prepared illusion (glamer) spell as an immediate action by sacrificing another spell of the same level.",
    page: 26,
  },
  {
    id: "exemplars-feat-slippery-skin",
    name: "Slippery Skin",
    category: "general",
    prerequisites: "Escape Artist 9 ranks, Combat Reflexes",
    benefit: "Substitute Escape Artist check result for touch AC",
    fullDescription:
      "You can expertly avoid the grasp of your enemies. If a creature makes a touch attack against you to initiate a grapple, you can sacrifice one of your attacks of opportunity as an immediate action to make an Escape Artist check. You must use the check result in place of your touch Armor Class, even if the result is lower.",
    page: 26,
  },
  {
    id: "exemplars-feat-strength-of-conviction",
    name: "Strength of Conviction",
    category: "general",
    prerequisites: "Smite evil or good",
    benefit: "Swap smite evil or good for smite",
    fullDescription:
      "You can channel the fury of your deity against a foe. Each day, you can sacrifice one use of smite evil or smite good to smite a single target regardless of his alignment. You gain no additional bonus on the attack roll, but if you hit the target, you deal a number of extra points of damage equal to your class level.",
    page: 26,
  },
  {
    id: "exemplars-feat-twist-the-knife",
    name: "Twist the Knife",
    category: "general",
    prerequisites: "Sneak attack +2d6, Improved Critical (melee weapon)",
    benefit: "Forego critical damage to impose a penalty on foe's attacks, damage, saves, and checks",
    fullDescription:
      "You can make a vicious attack that leaves your victim gasping in pain. Whenever you confirm a critical hit while wielding a melee weapon for which you have the Improved Critical feat, you can forego the extra damage and wrack the target with pain instead. For a number of rounds equal to the weapon's critical multiplier, the target takes a −3 penalty on attack rolls, weapon damage rolls, saving throws, ability checks, and skill checks.",
    page: 26,
  },
  {
    id: "exemplars-feat-uncanny-forethought",
    name: "Uncanny Forethought",
    category: "general",
    prerequisites: "Int 17, Spell Mastery",
    benefit: "Reserve slots to cast Spell Mastery spells",
    fullDescription:
      "You cunningly prepare your spells for any exigency. When preparing your daily allotment of spells, you can reserve a number of spell slots equal to your Intelligence modifier. As a standard action, you can use one of these slots to cast a spell that you selected for the Spell Mastery feat. The level of the slot used must be equal to or greater than the level of the spell you intend to cast. Alternatively, as a full-round action, you can use a reserved slot to cast any spell that you know. The spell is resolved as normal, but for the purpose of the spell, your caster level is reduced by two.",
    page: 26,
  },
  {
    id: "exemplars-feat-blessing-of-the-godless",
    name: "Blessing of the Godless",
    category: "ceremony",
    prerequisites: "Evil, Knowledge (religion) 6 ranks",
    benefit:
      "Gain access to ceremonies based on your ranks in Knowledge (religion). Each ceremony allows you to provide up to five allies with malevolent energy. Each rite takes 6 minutes to perform, and requires unholy water and the dung of an evil creature. Each participant stands at one of five points, forming a pentagram with you in the center. The effects of each ceremony last for 24 hours unless otherwise noted.",
    fullDescription:
      "Dark Pact (6 ranks): You spew the hateful words of true wickedness, investing the malevolence of the Lower Planes in the gathering. You create a pool of reserve hit points equal to your class level × the number of participants. Henceforth, all participants can draw a number of hit points equal to their class level from this pool as an immediate action. These reserve hit points can only be used to recover lost hit points, so any drawn in excess of the character's maximum hit point total are wasted. When the pool is depleted, the effects of the ritual end. Anoint the Wicked (9 ranks): Your filthy words imbue your allies with an incredible sense of purpose, enough to quench any misgivings. Each participant gains a +4 morale bonus on checks made to oppose Intimidate checks and on saving throws against spells and spell-like effects that have the fear descriptor. Shield of the Godless (12 ranks): In a sharp voice, you speak the reversed names of thirteen good deities, denying their existence and imbuing your allies with wards of unbelief. Each participant gains a +4 morale bonus on saving throws against divine spells. The participants also gain damage reduction 5/— against smite attacks made against them. In addition, if any participant is affected by a divine spell, all participants within 60 feet gain a +2 morale bonus on attack rolls and damage rolls for 1 round.",
    page: 24,
  },
  {
    id: "exemplars-feat-fell-conspiracy",
    name: "Fell Conspiracy",
    category: "ceremony",
    prerequisites: "Wis 13, Knowledge (religion) 4 ranks",
    benefit: "Forge a link that enables easy communication",
    fullDescription:
      "You gain access to ceremonies based on your ranks in Knowledge (religion). These ceremonies forge a link between participants who work toward a common cause. During each ceremony, all participants huddle together and speak in hushed tones, conveying the dark purpose of the conspiracy. Each ceremony takes 20 minutes, and its effects last for 24 hours. Common Cause (4 ranks): You confide in each ally, whispering your plans into his ear. Once you have finished, you nick each other's ears with a blade (no damage). Henceforth, each participant can cast the message spell at will at your caster level. This ceremony requires a masterwork dagger. Conspiratorial Bond (8 ranks): You concoct a paste of potent herbs and apply it to the eyes and ears of all participants, including yourself. While doing so, you intone a resonating, rhythmic incantation. All participants gain a +2 bonus on Listen checks and Spot checks for every other participant in range. In addition, all participants within 100 feet can communicate telepathically. This ceremony requires rare herbs worth 50 gp. Inviolate Link (12 ranks): Using a concoction of blood and hair from each participant mixed with rare herbs and diamond dust, you paint an eye onto the forehead of each ally. As long as they remain within 100 feet of you, none of you can be caught flat-footed unless all of you are, and none of you can be flanked unless all of you are. This ceremony requires a bit of blood and hair from each participant, rare herbs worth 50 gp, and diamond dust worth 100 gp.",
    page: 24,
  },
  {
    id: "exemplars-feat-evil-brand",
    name: "Evil Brand",
    category: "vile",
    prerequisites: "—",
    benefit: "Gain +2 bonus on Diplomacy and Intimidate checks made against evil creatures",
    fullDescription:
      "You are physically marked forever as the servant of an evil power greater than yourself. The symbol is unquestionable in its perversity, depicting a depravity so unthinkable that all who see it know beyond a doubt that you serve an evil patron. Evil creatures automatically recognize the symbol now emblazoned upon you as a sign of your utter depravity and your discipleship to a powerful creature of evil, although the brand does not necessarily reveal your patron's identity. You gain a +2 circumstance bonus on Diplomacy and Intimidate checks made against evil creatures.",
    page: 24,
  },
  {
    id: "exemplars-feat-beloved-of-demons",
    name: "Beloved of Demons",
    category: "vile",
    prerequisites: "Evil, caster level 6th, Knowledge (the planes) 6 ranks, Evil Brand, Power Attack",
    benefit: "Slay good or lawful creature and gain temporary hit points",
    fullDescription:
      "The tanar'ri reward you with unholy vitality whenever you defeat their enemies. Whenever you strike a lawful or good creature and reduce it to the dying or dead condition, you gain a number of temporary hit points equal to 1/2 your class level. Temporary hit points gained from this feat disappear after 1 minute. As an immediate action, you can sacrifice up to 5 temporary hit points to gain damage reduction 5/good for 1 round.",
    page: 23,
  },
  {
    id: "exemplars-feat-hellsworn",
    name: "Hellsworn",
    category: "vile",
    prerequisites: "Evil, Knowledge (the planes) 9 ranks, Evil Brand, Weapon Focus",
    benefit: "Gain extraplanar subtype and one infernal ability",
    fullDescription:
      "You have made a pact with a foul devil from the Nine Hells. In exchange, you can channel the power of that dreadful plane. You gain the extraplanar subtype. Your native plane is now the Nine Hells of Baator, and you can select one of the following infernal gifts: Hell's Fury: Once per round, as a free action, you can designate a single target that you can see. Your melee attacks and ranged attacks against that target—if made with a weapon for which you have the Weapon Focus feat—deal an extra 1d6 points of unholy damage. Brimstone Caress: When casting spells or spell-like effects that have the evil descriptor, your caster level increases by 1. Once per encounter, you can increase the save DC of a spell you cast by 1. If the spell deals damage, half the damage dealt is unholy.",
    special: "If you are slain, your soul is dragged to the Nine Hells of Baator. You cannot be restored to life short of a miracle or wish spell.",
    page: 24,
  },
];
