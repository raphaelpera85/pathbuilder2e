// ============================================================================
// D&D 3.5 — Frostburn: novos talentos (Cap. 2, pp. 45-50, texto original em inglês)
// Extraído da camada de texto do PDF (não por OCR) e conferido contra a
// Tabela 2-7. Nomes, pré-requisitos e benefícios como impressos; hifenização
// de fim de linha removida. Suplemento do 3.5: não usar em 5e nem em 3.0.
// ============================================================================

export interface Dnd35SupplementFeat {
  id: string;
  name: string;
  /** Tipo impresso entre colchetes: General, Metamagic, Item Creation. */
  type: "General" | "Metamagic" | "Item Creation";
  /** Pré-requisitos como impressos, sem o ponto final; null quando "—". */
  prerequisite: string | null;
  summary: string;
  benefit: string;
  normal?: string;
  special?: string;
}

export const DND35_FROSTBURN_FEATS: Dnd35SupplementFeat[] = [
  {
    "id": "frostburn-altitude-adaptation",
    "name": "Altitude Adaptation",
    "type": "General",
    "prerequisite": "Base Fortitude save bonus +2",
    "summary": "Your body adapts quickly to changes in altitude, preventing you from suffering as much from altitude sickness.",
    "benefit": "You gain a +4 bonus on all Fortitude saving throws to avoid the effects of altitude. Additionally, when you determine what effect the altitude has on you, you apply the effect for the next lower category of altitude than the category you are actually in. After you spend a week at a specific altitude, you become acclimated to that altitude and all lower altitudes, and no longer have to make Fortitude saving throws for each 6-hour period to avoid altitude sickness. If you travel to a lower altitude and remain there for a week, you lose your acclimation to the higher altitude and must reacclimatize, although you always retain the other benefits granted by this feat.",
    "special": "This feat grants a +2 bonus on all Survival checks made in high altitude (above 5,000 feet) areas."
  },
  {
    "id": "frostburn-arctic-priest",
    "name": "Arctic Priest",
    "type": "General",
    "prerequisite": "Access to Cold or Winter cleric domain",
    "summary": "You can swap out prepared spells to cast spells to aid in exploring and surviving in frostfell areas.",
    "benefit": "You can channel stored spell energy into spells that aid in exploring and surviving in the frostfell, even if you did not prepare these spells ahead of time. You can “lose” any prepared spell that is not a domain spell in order to cast any of the spells that appear on the list below, as long as the spell to be cast is of an equal or lower level to the one you lose. Spells you can spontaneously cast when using this feat include: control weather, create food and water, endure elements, heroes’ feast, hibernate, protection from energy, and resist energy."
  },
  {
    "id": "frostburn-beckon-the-frozen",
    "name": "Beckon the Frozen",
    "type": "General",
    "prerequisite": "Augment Summoning, Spell Focus (conjuration)",
    "summary": "Creatures you summon are infused with cold energy and have the cold subtype.",
    "benefit": "When you summon a creature or creatures using any summon spell, you can opt to summon a version of the creature from an extraplanar frostfell. If you do so, the summoned creature gains the cold subtype, and its natural attacks deal an additional 1d6 points of cold damage. Creatures with the fire subtype can never be enhanced with the cold subtype in this manner."
  },
  {
    "id": "frostburn-chosen-of-iborighu",
    "name": "Chosen of Iborighu",
    "type": "General",
    "prerequisite": "Patron deity must be Iborighu",
    "summary": "Your skin has a noticeable blue tint and your left eye is pale blue (your right eye is some other color); these features iden-tify you as an ally to the church of Iborighu and grant you supernatural qualities.",
    "benefit": "Your left eye radiates faint evocation magic if it is viewed with a detect magic spell, and faint evil if viewed with a detect evil spell. Cleric is now a favored class for you; the cleric class does not count when determining whether you take an experi-ence point penalty for multiclassing. Once per day, you can cause one creature within 30 feet that meets your gaze to become overwhelmed with a wave of super-natural cold. The target can resist the effects of this attack with a successful Fortitude save (DC 10 + 1/2 your character level + your Charisma modifier), otherwise it causes cold damage equal to your Charisma modifier + 3 (minimum 1 point of damage) and causes the victim to become fatigued. If you use this attack against someone who is fatigued, they instead become exhausted. Using this supernatural ability is a standard action that does not provoke attacks of opportunity.",
    "special": "If you ever lose favor with Iborighu, or change your patron deity to another deity, you lose all benefits of this feat but your unusual skin color and eye color remain. You do not gain a replacement feat. If you later return to Iborighu’s faithful and receive an atonement spell, you regain the benefits of the feat."
  },
  {
    "id": "frostburn-cold-endurance",
    "name": "Cold Endurance",
    "type": "General",
    "prerequisite": "Base Fortitude save bonus +2",
    "summary": "Either because of growing up in a frostfell or training your body and mind to ignore the biting effect of cold, you can exist with ease in low-temperature environments.",
    "benefit": "You can exist comfortably in conditions between 0° F and 90° F without having to make Fortitude saves (as described in Cold Dangers, page 8). You also gain a +2 bonus on saving throws against cold effects. Cold Endurance doesn’t provide any level of resistance to cold damage."
  },
  {
    "id": "frostburn-cold-focus",
    "name": "Cold Focus",
    "type": "General",
    "prerequisite": null,
    "summary": "Your cold spells are more potent than normal.",
    "benefit": "Add +1 to the DC for all saving throws against spells you cast with the cold descriptor. This bonus stacks with similar bonuses, such as those granted by Spell Focus and Greater Spell Focus."
  },
  {
    "id": "frostburn-cold-spell-specialization",
    "name": "Cold Spell Specialization",
    "type": "General",
    "prerequisite": "Con 13, Snowcasting, Frozen Magic",
    "summary": "You do additional damage with cold spells.",
    "benefit": "In cold areas (temperature at or below 40° F), you gain a +1 bonus per die to any dice rolled to determine damage caused by cold spells you cast. For example, if an 11th-level wizard with this feat casts a cone of cold in a cold area, the spell does 11d6+11 points of damage. In areas of extreme cold (below–20° F), the damage bonus increases to +2 per die."
  },
  {
    "id": "frostburn-craft-skull-talisman",
    "name": "Craft Skull Talisman",
    "type": "Item Creation",
    "prerequisite": "Caster level 6th",
    "summary": "You can create skull talismans, which carry spells within themselves (for more information on skull talismans, see page 112).",
    "benefit": "You can create a skull talisman of any spell you know and that targets one or more creatures. Crafting a skull talisman takes one day. When you create a skull talisman, you set the caster level. The caster level must be sufficient to cast the spell in question and no higher than your own level. The base price of a skull talisman is its spell level × its caster level × 100 gp. To craft the talisman, you must spend 1/25 of this base price in XP and use up raw materials (mostly com-prised of the rare metallic inks needed to inscribe the runes of power on the skull) costing one-half this base price. When you create a skull talisman, you make any choices that you would normally make when casting the spell. Who-ever destroys the skull is the target of the spell. Any skull talisman that stores a spell with a costly mate-rial component or a XP cost also carries a commensurate cost. In addition to the costs derived from the base price, you must expend the material component or pay the XP when creating the skull talisman. The skull to be used to create a skull talisman must be from a creature of at least Small size. A Small creature’s skull can store a spell of up to 3rd level. A Medium creature’s skull can store a spell of up to 6th level. A Large creature’s skull can store a spell of up to 9th level. The art of crafting skull talismans was perfected by neanderthal druids, but any spellcaster can learn the art of making these devices. Many view the act of creating or using a skull talis-man as a distasteful activity, but neither in and of itself is it an evil act."
  },
  {
    "id": "frostburn-faith-in-the-frost",
    "name": "Faith in the Frost",
    "type": "General",
    "prerequisite": "Ability to turn or rebuke creatures, access to Cold or Winter cleric domain",
    "summary": "You channel frozen energies from your deity when you turn or rebuke creatures.",
    "benefit": "When you successfully turn or rebuke a crea-ture, it takes cold damage equal to your Charisma modifier as blasts of ice and cold energy tear through its body."
  },
  {
    "id": "frostburn-frostfell-prodigy",
    "name": "Frostfell Prodigy",
    "type": "General",
    "prerequisite": "Con 13, Snowcasting, Frozen Magic, Cold Focus",
    "summary": "You gain additional bonus spells in cold regions.",
    "benefit": "In cold areas (temperature at or below 40° F), the ability score used to determine how many bonus spells you may prepare or cast is treated as if it were 2 higher than its actual score. If you enter an area with a warmer tem-perature and remain in this area for longer than 1 minute, the bonus spells granted by this feat are lost until you can regain them. In areas of extreme cold (below –20° F), the ability score is treated as if it were 4 higher than its actual score for purposes of determining how many bonus spells you can prepare or cast."
  },
  {
    "id": "frostburn-frozen-berserker",
    "name": "Frozen Berserker",
    "type": "General",
    "prerequisite": "Ability to rage",
    "summary": "When you enter your barbarian rage, your body becomes infused with cold energy.",
    "benefit": "As long as you are under the effects of a barbarian rage, you gain the cold subtype. You gain immunity to cold, but have vulnerability to fire, which means you take half again as much (+50%) damage as normal from fire, regard-less of whether a saving throw is allowed, or if the save is a success or failure."
  },
  {
    "id": "frostburn-frozen-magic",
    "name": "Frozen Magic",
    "type": "General",
    "prerequisite": "Con 13, Snowcasting",
    "summary": "Your cold spells are more powerful when you cast them in a cold region.",
    "benefit": "In cold areas (temperature at or below 40° F), spells with the cold descriptor cast by you manifest at caster level +1. In areas of extreme cold (below –20° F), cold spells cast by you manifest at caster level +2."
  },
  {
    "id": "frostburn-frozen-wild-shape",
    "name": "Frozen Wild Shape",
    "type": "General",
    "prerequisite": "Base Fortitude save bonus +6, wild shape ability",
    "summary": "You can assume the form of magical beasts with the cold subtype.",
    "benefit": "You may use your wild shape ability to assume the form of any magical beast with the cold subtype. Your new form must still fall within the size limitations of your wild shape ability. As with the standard wild shape ability, you do not gain any of the extraordinary special qualities or any supernatural abilities possessed by the new form, with the exception of the cold subtype. This subtype grants you immunity to cold but vulnerability to fire, which means you take half again as much (+50%) damage as normal from fire while in a frozen wild shape, regardless of whether a saving throw is allowed, or if the save is a success or failure. Possible cold magical beasts from the Monster Manual include cryohydras (Huge wild shape required), frost worms (Huge wild shape required), and winter wolves. Possible cold magical beasts from Monster Manual II include frost salamanders. Possible cold magical beasts from this book include bran-tas (Large wild shape required), ice toads (Large wild shape required), urskans (Large wild shape required), and tlalusks (Huge wild shape required)."
  },
  {
    "id": "frostburn-greater-cold-focus",
    "name": "Greater Cold Focus",
    "type": "General",
    "prerequisite": "Cold Focus",
    "summary": "Your cold spells are now even more potent than before.",
    "benefit": "Add +1 to the DC for all saving throws against spells with the cold descriptor. This bonus stacks with simi-lar bonuses, such as those from Cold Focus, Spell Focus, and Greater Spell Focus."
  },
  {
    "id": "frostburn-icy-calling",
    "name": "Icy Calling",
    "type": "General",
    "prerequisite": "Con 13, Snowcasting",
    "summary": "Your summon spells work better in the frostfell if you summon native creatures.",
    "benefit": "In cold areas (temperature at or below 40° F), creatures native to cold environments and creatures with the cold subtype summoned by you are more powerful and agile than normal. The summoned creatures gain a +4 enhancement bonus to Strength and Dexterity for the dura-tion of the spell that summoned them. In areas of extreme cold (below –20° F), any summoned creature affected by this feat has maximum hit points when summoned."
  },
  {
    "id": "frostburn-ice-harmonics",
    "name": "Ice Harmonics",
    "type": "General",
    "prerequisite": "Bardic music ability, Perform (sing) 6 ranks",
    "summary": "You can use your voice to shatter ice.",
    "benefit": "By expending one of your daily uses of bardic music, you can cause any unattended nonmagical ice object or portion of ice to explode violently. The target must be within 30 feet, and you must be able to sing in order to shatter the ice. Any creature located in the 5-foot square in which you target with this ability takes piercing damage equal to 2d6 + your Charisma modifier. Creatures made of ice that you specifically target with this effect take double damage."
  },
  {
    "id": "frostburn-improved-cold-endurance",
    "name": "Improved Cold Endurance",
    "type": "General",
    "prerequisite": "Base Fortitude save bonus +6, Cold Endurance",
    "summary": "Your training and natural hardiness have improved your natural resistance to cold temperatures.",
    "benefit": "You gain resistance to cold 5. If you already have resistance to cold, it increases by 5 (maximum resistance to cold 15).",
    "special": "You can gain this feat multiple times; its effects stack. You cannot have more than resistance to cold 15 as a result of taking this feat."
  },
  {
    "id": "frostburn-improved-frosty-touch",
    "name": "Improved Frosty Touch",
    "type": "General",
    "prerequisite": "Uldra",
    "summary": "Your frosty touch causes more cold damage.",
    "benefit": "Your frosty touch ability now deals 2 points of cold damage.",
    "normal": "Your frosty touch ability deals 1 point of cold damage."
  },
  {
    "id": "frostburn-mark-of-hleid",
    "name": "Mark of Hleid",
    "type": "General",
    "prerequisite": "Your patron deity must be Hleid",
    "summary": "You bear a birthmark in the shape of the holy symbol of Hleid (a ragged white triangle with a vortex of blue flame in its center) somewhere on your body; this mark identifies you as an ally of the church of Hleid and grants you supernatural qualities.",
    "benefit": "The actual birthmark itself radiates faint abjura-tion magic if it is viewed with a detect magic spell, and faint good if viewed with a detect good spell. You are immune to the frost touch special attack of a rimefire eidolon. Additionally, you can handle rimefire ice barehanded without taking any cold damage. Cleric is now a favored class for you; the cleric class does not count when determining whether you take an experi-ence point penalty for multiclassing. You gain a +2 sacred bonus to your Armor Class against evil-aligned creatures with the cold subtype.",
    "special": "If you ever lose favor with Hleid, or change your patron deity to another deity, the mark of Hleid fades and you lose all benefits of this feat. You do not gain a replace-ment feat. If you later return to Hleid’s faithful and receive an atonement spell, the mark reappears and you regain the benefits of the feat."
  },
  {
    "id": "frostburn-mountaineer",
    "name": "Mountaineer",
    "type": "General",
    "prerequisite": null,
    "summary": "You are a particularly gifted explorer and mountain climber.",
    "benefit": "You get a +2 bonus on all Climb and Survival checks."
  },
  {
    "id": "frostburn-piercing-cold",
    "name": "Piercing Cold",
    "type": "Metamagic",
    "prerequisite": null,
    "summary": "Your cold spells are so cold that they can damage creatures normally resistant or immune to cold.",
    "benefit": "You can only apply this metamagic feat to spells with the cold descriptor. Piercing cold spells are so horribly cold that they are capable of damaging creatures normally unharmed by or resistant to cold. Piercing cold spells com-pletely ignore any resistance to cold a creature possesses, bypassing this resistance and dealing damage to the target as if it did not possess any resistance to cold at all. They are still entitled to whatever other defenses the attack allows (such as saving throws and spell resistance). Creatures normally immune to cold can be damaged by piercing cold spells as well. Piercing cold spells deal half damage to these creatures (or one-quarter on a successful saving throw). For example, Mialee casts a piercing cold cone of cold at a night hag, a creature normally immune to cold. She makes her level check to penetrate the night hag’s spell resistance, but the night hag makes her Reflex save against the spell. Mialee rolls the dice, and her cone of cold deals 42 points of cold damage; since the night hag made her save, the damage is halved to 21 points. This damage is then halved again (since the night hag is normally immune to cold), and 10 points of cold damage are actually dealt to the night hag, who is both shocked and enraged at this unexpected turn of events. Creatures with the cold subtype can tell that a piercing cold spell is colder than normal, but they remain undam-aged by the attack. Creatures with the fire subtype who are damaged by a piercing cold spell take double normal damage instead of the usual +50%. A piercing cold spell uses up a spell slot one level higher than the spell’s actual level."
  },
  {
    "id": "frostburn-primeval-wild-shape",
    "name": "Primeval Wild Shape",
    "type": "General",
    "prerequisite": "Wild shape ability",
    "summary": "Your wild shape forms are stronger than normal.",
    "benefit": "When you assume a wild shape form, you can opt to cause the shape assumed to be a primeval form of the creature that existed in the ancient past during a vast ice age. Doing so grants the new form a +2 racial bonus to Strength, a +2 bonus to its natural armor, and resistance to cold 10. A primeval wild shape has a much shorter duration than normal, since the enhanced qualities of the new shape drain your supernatural energies much more quickly. A primeval wild shape has a duration of 1 round per druid level (or per level of the class that granted you the wild shape ability) instead of the normal 1 hour per druid level."
  },
  {
    "id": "frostburn-primitive-caster",
    "name": "Primitive Caster",
    "type": "General",
    "prerequisite": null,
    "summary": "You use screeches, wild gesticulations, and extra material components to give your spells additional power.",
    "benefit": "This feat only functions when you cast a spell that does not already have a verbal, somatic, or material component. For each component you voluntarily add, you increase the effective caster level of the spell by +1. You can only add a component that’s not already present in the spell. For example, you can’t add a somatic component to a gaseous form spell, because it already has one. You could add a verbal component, however. The verbal component you add consists of animalistic shouts, screams, and growls. The DC of Listen checks to hear you cast a spell is –5 (before modifying for distance). The somatic component is also more complex, so you must have two hands free to add a somatic component with this feat. The extra material component you add with this feat must be a rare plant found in the frostfell, which requires a successful DC 15 Profession (herbalist) check to locate. This feat originally appeared in Races of Faerûn."
  },
  {
    "id": "frostburn-sea-legs",
    "name": "Sea Legs",
    "type": "General",
    "prerequisite": null,
    "summary": "You are accustomed to the rolling motion on board a ship, and can use this motion to your advantage.",
    "benefit": "As long as you are on board a ship, you get a +2 bonus on all Balance and Tumble checks, and a +1 bonus on Initiative checks."
  },
  {
    "id": "frostburn-smite-fiery-foe",
    "name": "Smite Fiery Foe",
    "type": "General",
    "prerequisite": "Smite ability",
    "summary": "You can smite creatures with the fire subtype.",
    "benefit": "Once per day, you may attempt to smite a creature with the fire subtype with a normal melee attack. When you activate this ability, your attack becomes infused with cold energy. You add your Charisma modifier to your attack roll and deal 1 extra point of cold damage per character level. If you smite a creature that does not have the fire subtype, the blast of cold does not manifest and the smite attempt is used up for that day. Remember that creatures with the fire subtype take half again as much (+50%) damage as normal from cold, includ-ing the additional damage dealt by this ability. You may swap out any daily uses of a smite ability gained by a character class or cleric domain to smite fiery foes instead."
  },
  {
    "id": "frostburn-snowcasting",
    "name": "Snowcasting",
    "type": "General",
    "prerequisite": "Con 13",
    "summary": "You add ice or snow to your spell’s components to make them more powerful.",
    "benefit": "If you add a handful of snow or ice as an addi-tional material component to a spell when you cast it, the spell gains the cold descriptor. This does not actually change the nature of the spell you cast; a fireball cast with this feat still deals fire damage, but since it also carries the cold descriptor, it can be augmented by a number of feats listed in this chapter, such as Cold Focus and Frozen Magic. If you add a handful of snow or ice as an additional mate-rial component to a spell when you cast it and that spell already has the cold descriptor, you increase the effective level of the spell being cast by +1. Adding this additional material component requires you to spend a move action immediately before the spell is cast to gather fresh snow or ice from the surrounding environment. This snow or ice can be magically created by a conjuration spell, but no other ice manifested by a spell will do. You may take no other action between gathering the snow or ice and casting the spell."
  },
  {
    "id": "frostburn-snowrunner",
    "name": "Snowrunner",
    "type": "General",
    "prerequisite": "Woodland stride ability",
    "summary": "You are particularly adept at moving through snow and over ice.",
    "benefit": "You can move through loose snow at full speed, as if you were moving across open terrain. You are also skilled at moving across open ice, and gain a +5 competence bonus on Balance checks to avoid slipping when you move across icy surfaces."
  },
  {
    "id": "frostburn-snowflake-wardance",
    "name": "Snowflake Wardance",
    "type": "General",
    "prerequisite": "Bardic music ability, Perform (dance) 6 ranks",
    "summary": "You have mastered the snowflake wardance, a mystical style of fighting with slashing weapons that allows you to leap and almost seem to float haphazardly across the battlefield like a whirling, razor-edged snowflake.",
    "benefit": "By expending one of your daily uses of bardic music, you may perform a deadly style of combat known as the snowflake wardance. Activating a snowflake wardance is a free action, and once activated, you add your Charisma modifier to your attack rolls with any slashing melee weapon you wield in one hand. This bonus to hit stacks with any bonuses you get from a high Strength score (or Dexterity score, if you are using Weapon Finesse). You cannot use this feat if you are carrying a shield, wearing medium or heavy armor, or carrying a medium or heavy load. A snowflake wardance lasts for a number of rounds equal to your ranks in Perform (dance). Performing a snowflake wardance is physically tiresome—when the snowflake war-dance ends, you become fatigued for the next 10 minutes."
  },
  {
    "id": "frostburn-storm-magic",
    "name": "Storm Magic",
    "type": "General",
    "prerequisite": null,
    "summary": "You gain a boost in spellcasting power during storms.",
    "benefit": "All spells you cast while you are affected by a storm (either natural or magical) manifest at +1 caster level. For more information on storms, see page 94 of the Dungeon Master’s Guide."
  },
  {
    "id": "frostburn-sugliin-mastery",
    "name": "Sugliin Mastery",
    "type": "General",
    "prerequisite": "Base attack bonus +5, Exotic Weapon Proficiency (sugliin)",
    "summary": "You are a master at fighting with the massive sugliin.",
    "benefit": "You can attack with a sugliin as if it were a normal weapon, either making a single attack as a standard action or a full attack as a full-round action.",
    "normal": "Making a single attack with a sugliin is always a full-round action."
  },
  {
    "id": "frostburn-winters-champion",
    "name": "Winter’s Champion",
    "type": "General",
    "prerequisite": "Paladin level 1st",
    "summary": "Your paladin spell list is enhanced.",
    "benefit": "When you gain this feat, you may add the 1st-, 2nd-, 3rd-, and 4th-level spells granted by the Cold and Winter domains as paladin spells of the same levels. You do not gain the ability to cast spells of these domains of 5th level or higher, nor do you gain the granted powers of the domains.",
    "special": "If you have any levels of cleric, these additional domains are not available to your cleric levels, since they are technically paladin spells in this case."
  },
  {
    "id": "frostburn-winters-mount",
    "name": "Winter’s Mount",
    "type": "General",
    "prerequisite": "Special mount ability",
    "summary": "Your special mount is native to the frostfell.",
    "benefit": "Your special mount gains the cold subtype. It gains immunity to cold, but has vulnerability to fire, which means it takes half again as much (+50%) damage as normal from fire, regardless of whether a saving throw is allowed, or if the save is a success or failure. Your special mount is also hardier than a nonfrostfell version; it gains a +2 racial bonus to Constitution."
  }
];

export const DND35_FROSTBURN_SOURCE = { book: "Frostburn", pages: "45-50" } as const;
