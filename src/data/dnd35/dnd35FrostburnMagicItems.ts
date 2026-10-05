// ============================================================================
// D&D 3.5 — Frostburn: itens mágicos (Cap. 5, pp. 109-112, texto em inglês)
// Extraído da camada de texto do PDF. A linha final de cada item foi separada
// em aura, nível de conjurador, pré-requisitos de criação, preço, custo e peso,
// como impressos. Variantes ficam com "family" (figurinas e anéis). Skull
// Talisman é uma descrição geral, sem linha de aura. Textos de poderes
// psiônicos que invadem a diagramação foram removidos.
// ============================================================================

export interface Dnd35SupplementMagicItem {
  id: string;
  name: string;
  /** "Minor Artifact" para o Crystal Tear. */
  category?: string;
  family?: string;
  /** Ex.: "Moderate transmutation", "Strong (no school)". */
  aura?: string;
  casterLevel?: number;
  /** Talentos de criação e magias exigidas, como impressos. */
  requirements?: string;
  price?: string;
  cost?: string;
  weight?: string;
  description: string;
}

export const DND35_FROSTBURN_MAGIC_ITEMS: Dnd35SupplementMagicItem[] = [
  {
    "id": "frostburn-crystal-tear-minor-artifact",
    "name": "Crystal Tear",
    "category": "Minor Artifact",
    "aura": "Strong enchantment",
    "casterLevel": 20,
    "weight": "4 lb",
    "description": "Legends hold that when Iborighu smote down Hleid and cast her fractured body into the polar sea, she cried for the loss to the uldra race. As her body arced over the polar world to the sea, these tears fell to the ground and became frozen, and some of Hleid’s divine power and emotion became frozen along with them and became crystal tears. A crystal tear looks like a large tear made of ice with flashes of light sparkling in its depths. These are potent minor artifacts; their presence constantly exudes a strong emotional magical effect (as a 20th-level caster) in an emanation with a 15-foot radius. As a free action, the holder of the tear can choose to produce either crushing despair or good hope. Once an effect is chosen, it operates until the holder changes it. The tear continues to emanate the last emotion the holder chose if the holder puts down the tear. The holder can decide as a free action what creatures in the area are affected. Living creatures in the emanation can attempt a DC 16 Will save to avoid the emanation’s effects. Those who fail suffer whatever effect the tear is currently producing, for as long as they remain within the radius of the emanation and for 1 minute after leaving. Those who successfully save cannot be affected by the tear’s current emanation for 1 minute (but must save again if the holder changes the effect). The holder of the tear finds that his own emotions are completely “drowned out” by the presence of the tear; this effectively keeps the user from experiencing any emotions at all (incurring a –2 penalty on all Charismabased skill checks), but also has the fortunate side effect of rendering him completely immune to mind-affecting spells and abilities. Overlapping emanations from multiple crystal tears do not stack if they generate identical emotions. Crystal tears do not melt if brought to warmer climates or if exposed to heat or flame; they always retain a cool temperature regardless of their environs. Despite this, the owner of a crystal tear can cause the tear to melt into liquid by targeting it with a spell that is of at least 5th level and carries the fire descriptor. The spell cast is absorbed completely by the tear, which then melts immediately and evaporates in 2d4 rounds. If the melted tear is imbibed before it evaporates, it grants a +4 inherent bonus to one of the drinker’s ability scores. The exact score to which the bonus is applied is determined randomly, although it does not apply to a score that already possesses an inherent bonus. If all the drinker’s scores already possess an inherent bonus, the +4 inherent bonus applies to the score with the lowest bonus."
  },
  {
    "id": "frostburn-frostfell-figurine-of-wondrous-power",
    "name": "Frostfell Figurine of Wondrous Power",
    "description": "Each of the several kinds of frostfell figurines of wondrous power appears to be a miniature statuette of a creature an inch or so high. When the figurine is tossed down and the correct command word spoken, it becomes a living creature of normal size. The creature obeys and serves its owner. The creature understands Common but does not speak. If a frostfell figurine of wondrous power is broken or destroyed in its statuette form, it is forever ruined. All magic is lost, its power departed. If slain in animal form, the figurine simply reverts to a statuette that can be used again at a later time. Frostfell figurines of wondrous power differ from the standard figurines of wondrous power in that they are always quite cold to the touch. A character who carries a frostfell figurine of wondrous power gains resistance to cold 10 as long as it is in figurine form."
  },
  {
    "id": "frostburn-basalt-glyptodon",
    "name": "Basalt Glyptodon",
    "family": "Frostfell Figurine of Wondrous Power",
    "aura": "Moderate transmutation",
    "casterLevel": 11,
    "requirements": "Craft Wondrous Item, animate objects, stoneskin",
    "price": "32,000 gp",
    "description": "When animated, a basalt glyptodon acts in all ways like a normal glyptodon under the command of its possessor. Unlike a normal glyptodon, a basalt glyptodon has damage reduction 5/—. The item can be used once per week for up to 6 hours per use. When 6 hours have passed or when the command word is spoken, a basalt glyptodon once again becomes a tiny statuette."
  },
  {
    "id": "frostburn-coral-zeuglodon",
    "name": "Coral Zeuglodon",
    "family": "Frostfell Figurine of Wondrous Power",
    "aura": "Moderate transmutation",
    "casterLevel": 11,
    "requirements": "Craft Wondrous Item, animate objects",
    "price": "42,000 gp",
    "description": "A coral zeuglodon can only be animated in any body of water large enough to hold the actual creature; it must be thrown into the water and the command word spoken immediately for it to animate. If the command word is not spoken, the coral zeuglodon sinks to the bottom. A coral zeuglodon remains brightly colored when animated, and acts in all ways like a normal zeuglodon under the command of its possessor, except that it has a swim speed of 120 feet. The item can be used up to twice per week for up to 4 hours per use. When a coral zeuglodon returns to figurine form, it magically reappears in the hand of its owner, despite any physical distance between the two. If the owner is dead or on another plane, a coral zeuglodon instead sinks to the bottom of the sea when it returns to figurine form."
  },
  {
    "id": "frostburn-diamond-ice-toad",
    "name": "Diamond Ice Toad",
    "family": "Frostfell Figurine of Wondrous Power",
    "aura": "Moderate transmutation",
    "casterLevel": 11,
    "requirements": "Craft Wondrous Item, animate objects, blur",
    "price": "33,000 gp",
    "description": "A diamond ice toad acts as a normal ice toad when animated, except that it remains transparent and crystalline in appearance. It remains under the command of its possessor, and gains the benefits of concealment (20% miss chance) due to its transparent nature. It can be activated up to two times per week for 1 hour per use."
  },
  {
    "id": "frostburn-iron-megaloceros",
    "name": "Iron Megaloceros",
    "family": "Frostfell Figurine of Wondrous Power",
    "aura": "Moderate transmutation",
    "casterLevel": 11,
    "requirements": "Craft Wondrous Item, Craft Construct, animate objects",
    "price": "27,000 gp",
    "description": "When animated, an iron megaloceros acts in all ways like a normal megaloceros under the command of its possessor, except that it is a construct made of iron. It possesses damage reduction 5/adamantine, and has immunity to poison, sleep effects, paralysis, stunning, disease, death effects, necromancy effects, mind-affecting effects (charms, compulsions, phantasms, patterns, and morale effects), and any effect that requires a Fortitude save unless it also works on objects or is harmless. It is not subject to extra damage from critical hits, nonlethal damage, ability damage, ability drain, fatigue, exhaustion, or energy drain. It cannot heal damage, but can be repaired. An iron megaloceros has darkvision 60 ft. and low-light vision. It has no Constitution score, but it does have 10-sided Hit Dice and 30 bonus hit points, granting it 63 hit points total. It can be affected normally by rust attacks, such as that of a rust monster or a rusting grasp spell. It functions in all other ways like a standard megaloceros. The item can be used up to twice a week for up to 6 hours per use."
  },
  {
    "id": "frostburn-malachite-smilodon",
    "name": "Malachite Smilodon",
    "family": "Frostfell Figurine of Wondrous Power",
    "aura": "Moderate transmutation",
    "casterLevel": 11,
    "requirements": "Craft Wondrous Item, animate objects, keen edge",
    "price": "36,000 gp",
    "description": "When animated, a malachite smilodon acts in all ways like a normal smilodon under the command of its possessor, except that its fangs are exceptionally sharp. They threaten a critical hit on a roll of 17–20, and do ×3 damage on a successful critical hit. The item may be used once per day for up to 2 hours. If slain in animal form, a malachite smilodon cannot be brought back from statuette form for one full week."
  },
  {
    "id": "frostburn-gloves-of-the-uldra-savant",
    "name": "Gloves of the Uldra Savant",
    "aura": "Faint evocation and transmutation",
    "casterLevel": 5,
    "requirements": "Craft Wondrous Item, frost weapon, ray of frost",
    "price": "12,700 gp",
    "weight": "2 lb",
    "description": "Gloves of the uldra savant are made of a pale blue metal and are adorned with light blue runes. The plates that make up the gauntlets always seem to be caked with frost and ice. The wearer of gloves of the uldra savant can create a ray of frost at will as a standard action. Three times per day, the user may imbue any melee weapon held in her hand with the frost special ability as a standard action; this causes the weapon to do an additional 1d6 points of cold damage on a successful hit. The weapon retains this quality for 5 rounds."
  },
  {
    "id": "frostburn-iceheart-minor",
    "name": "Iceheart, Minor",
    "aura": "Faint evocation",
    "casterLevel": 5,
    "requirements": "Craft Wondrous Item, fog cloud, ray of frost, sleet storm, creator must be an uldra or a winterhaunt of Iborighu",
    "price": "24,000 gp",
    "weight": "1 lb",
    "description": "This fist-sized lump of magical ice has been infused with the storms and bitter cold of winter. On command, a minor iceheart can produce the following effects: • Ray of frost (at will) • Fog cloud (3/day) • Sleet storm (3/day)"
  },
  {
    "id": "frostburn-iceheart-major",
    "name": "Iceheart, Major",
    "aura": "Strong transmutation",
    "casterLevel": 15,
    "requirements": "Craft Wondrous Item, cone of cold, fimbulwinter, fog cloud, ice storm, polar ray, ray of frost, sleet storm, creator must be an uldra or a winterhaunt of Iborighu",
    "price": "140,000 gp",
    "weight": "1 lb",
    "description": "A major iceheart looks similar to a minor iceheart, except that it is constantly surrounded by a swirling vortex of snow and ice to a radius of 1 foot. Creatures holding a major iceheart take 1d4+1 points of cold damage per round as the powerful magic of the device leeches heat from the body. On command, a major iceheart can be used to produce the following effects: • Ray of frost (at will) • Cone of cold (3/day) • Fog cloud (3/day) • Ice storm (3/day) • Sleet storm (3/day) • Polar ray (1/day) • Fimbulwinter (1/day, see below) A major iceheart’s most awesome power is the ability to create a fimbulwinter once per day. A major iceheart casts this spell automatically each day at sunset, unless it has already been used that day to create a fimbulwinter. Thus, the mere presence of a major iceheart generates a 15-mile-radius zone of eternal winter; the majority of frostfell regions that appear in temperate or tropical climates are the result of the introduction of a major iceheart into the region."
  },
  {
    "id": "frostburn-icicle-rod",
    "name": "Icicle Rod",
    "aura": "Strong evocation (cold)",
    "casterLevel": 15,
    "requirements": "Craft Rod, Craft Magic Arms and Armor, Maximize Spell, entomb, ice storm, resist elements",
    "price": "120,000 gp",
    "description": "An icicle rod looks like nothing more than a 3-foot-long icicle. The rod remains cold to the touch at all times but never melts. While it is held, the wielder gains resistance to cold 10. It may be wielded in melee as a +1 frost short sword. Three times per day the wielder may fire a small icicle from the rod as a standard action. This icicle has a maximum range of 1,000 feet, and attacks made with it are resolved as ranged touch attacks that do 2d4 points of cold damage on a hit. Once it hits, the icicle quickly begins to spread frost and ice over the target, doing an additional 2d4 points of cold damage each round for a total of five additional rounds after the initial hit. An icicle rod can also produce these additional effects: • Entomb (1/day) • Maximized ice storm (1/day)"
  },
  {
    "id": "frostburn-instant-igloo",
    "name": "Instant Igloo",
    "aura": "Faint evocation",
    "casterLevel": 7,
    "requirements": "Craft Wondrous Item, Widen Spell, Leomund’s tiny igloo",
    "price": "11,000 gp",
    "description": "An instant igloo looks like an unremarkable snowball, except that it does not melt in high temperatures. If hurled to the ground at any point within 20 feet, it transforms into a large igloo. The igloo is identical to that created by the spell Leomund’s tiny igloo, except that the igloo created has a 10-foot radius and can contain up to 2 Large, 8 Medium, 32 Small, or 128 Tiny or smaller creatures. The igloo lasts for 16 hours before transforming back into its snowball form, at which point it cannot be used again for another 8 hours."
  },
  {
    "id": "frostburn-mantle-of-hidden-faith",
    "name": "Mantle of Hidden Faith",
    "aura": "Faint abjuration",
    "casterLevel": 3,
    "requirements": "Craft Wondrous Item, undetectable alignment",
    "price": "15,000 gp",
    "description": "This plain gray mantle shields your faith, alignment, and patron deity from magical detection as long as it is worn. It does not provide any bonuses to skill checks used to disguise or lie about your faith and beliefs."
  },
  {
    "id": "frostburn-pick-of-iceparting",
    "name": "Pick of Iceparting",
    "aura": "Medium evocation",
    "casterLevel": 8,
    "requirements": "Craft Magic Arms and Armor, crack ice, summon monster I",
    "price": "30,000 gp",
    "cost": "14,600 gp + 1,168 XP",
    "weight": "6 lb",
    "description": "This +2 cold bane heavy pick can score critical hits against creatures of the cold subtype normally immune to critical hits. Once per day, a pick of iceparting can be swung at an icy surface (such as a glacial wall, the surface of a frozen lake, or an iceberg) as a standard action. Three tiny fractures radiate out from the point you struck toward any three points within 50 feet; these three points can be chosen by you but must be connected to the initial impact point by a solid sheet of ice. When the cracks reach their targets, they cause the ice located there to explode violently. Any creature within 5 feet of this explosion takes 3d6 points of piercing damage (Reflex DC 14 half)."
  },
  {
    "id": "frostburn-ring-of-the-icy-soul",
    "name": "Ring of the Icy Soul",
    "aura": "Medium transmutation",
    "casterLevel": 9,
    "requirements": "Forge Ring, mantle of the icy soul",
    "price": "100,000 gp",
    "description": "This ring seems to be made of ice, but never melts in even the hottest temperature. As long as this ring is worn, you gain the cold subtype. You gain immunity to cold, but have vulnerability to fire. You take half again as much (+50%) damage as normal from fire, regardless of whether a saving throw is allowed, or if the save is a success or a failure."
  },
  {
    "id": "frostburn-ring-of-floating",
    "name": "Ring of Floating",
    "family": "Ring of the Icy Soul",
    "aura": "Faint transmutation",
    "casterLevel": 1,
    "requirements": "Forge Ring, float",
    "price": "2,000 gp",
    "description": "This clear crystal ring seems slightly cold when worn. As long as this ring is worn, you float upon any liquid or similar surface, and cannot swim below the surface. If you are underwater when you put this ring on, you rise toward the surface at a speed of 30 feet."
  },
  {
    "id": "frostburn-ring-of-the-white-wyrm",
    "name": "Ring of the White Wyrm",
    "family": "Ring of the Icy Soul",
    "aura": "Strong transmutation",
    "casterLevel": 13,
    "requirements": "Forge Ring, polymorph, protection from elements, wall of ice, solid fog, spider climb, creator must be a dragon or half-dragon",
    "price": "64,000 gp",
    "description": "A ring of the white wyrm is fashioned from the tooth of a great wyrm white dragon. The ring can produce the following effects on command: • Icewalking (at will): As spider climb, but the surfaces the wearer climbs must be icy. • Freezing fog (2/day): As solid fog, but the effect also causes a rime of slippery ice to form on any surface the fog touches, creating the effect of a grease spell. The wearer of the ring is immune to the grease effect because of the icewalking power the ring imparts. • Wall of ice (1/day) In addition, the wearer gains the ability to speak and understand the Draconic language as long as the ring is worn, and the ring grants the wearer resistance to cold 10. The primary function of the ring, however, is to infuse the wearer with the energy and power of a dragon. Once per day, the wearer may call upon the ring to transform herself into a half-dragon. This is a full-round action that provokes attacks of opportunity, and the transformation lasts for 1 hour. While transformed, the wearer gains the following benefits: • +4 natural armor bonus to AC. • Bite and claw attacks as a half-dragon of the same size as the wearer. • Breath weapon usable once per transformation (30-ft. cone, 3d6 cold damage, Reflex DC 16 half). • Immunity to cold. • +8 Strength, +2 Constitution, +2 Intelligence, +2 Charisma. These bonuses are considered racial bonuses and stack with other racial bonuses the wearer may have. The ring’s transformation power also changes the wearer’s appearance into a draconic form. The wearer’s general shape and size does not change, although her equipment is altered in shape so it can still be utilized. Unlike polymorph, the user’s equipment does not merge with the new form; it remains in place and fully functional while the user is in half-dragon form. Dragons and half-dragons cannot benefit from the effects of the ring’s transformation powers, although they can utilize the ring’s other abilities. Rumors abound that other rings exist that are keyed to different dragons, granting different powers."
  },
  {
    "id": "frostburn-rod-of-piercing-cold",
    "name": "Rod of Piercing Cold",
    "aura": "Strong (no school)",
    "casterLevel": 17,
    "requirements": "Craft Rod, Piercing Cold",
    "price": "21,430 gp (lesser), 29,300 gp (normal), 42,800 gp (greater)",
    "cost": "10,500 gp + 840 XP (lesser), 14,500 gp + 1,160 XP (normal), 21,400 gp + 1,700 XP (greater)",
    "description": "This short rod appears to be made entirely out of ice, and comes to a needle-sharp point at one end. It can be used as a +2 frost dagger in combat. Up to three times per day, the owner of a rod of piercing cold can enhance one spell cast with the Piercing Cold metamagic feat, with no alteration to the spell’s effective level. This rod is a metamagic rod; a caster may only use one metamagic rod on a spell at a time. Normal rods of piercing cold can be used with spells of 6th level or lower. Lesser rods of piercing cold can be used with spells of 3rd level or lower, while greater rods of piercing cold can be used with spells of 9th level or lower."
  },
  {
    "id": "frostburn-simulacrum-elixir",
    "name": "Simulacrum Elixir",
    "aura": "Strong illusion (shadow)",
    "casterLevel": 13,
    "requirements": "Craft Wondrous Item, simulacrum",
    "price": "21,000 gp",
    "description": "This small vial of clear fluid contains a potent magical charge. When the contents are poured over a body part (which can be as small as a fingernail clipping or a single hair), the liquid quickly grows in volume and transforms into a simulacrum of the creature from which the body part came. The simulacrum functions as the spell of the same name, and remains under the absolute command of the person who created it. The simulacrum to be created cannot be a duplicate of a creature with more than 26 HD or levels, and its likeness to the original creature is crude at best. A vial of simulacrum elixir contains enough fluid to create one simulacrum."
  },
  {
    "id": "frostburn-skull-talisman",
    "name": "Skull Talisman",
    "description": "The craft of creating skull talismans was originally pioneered by the primitive races that live in the frostfell. Potions tend to freeze in the cruel temperatures of the frostfell, so the skull talisman was invented to provide a replacement. A skull talisman can be used only once. The size of the creature’s skull used in creation of the talisman determines the maximum level of spell that can be stored in it. A Small skull can store a spell of up to 3rd level. A Medium Skull can store a spell of up to 6th level. A Large skull can store a spell of up to 9th level. Only spells that target one or more creatures can be stored in a skull talisman. Physical Description: A skull talisman appears as the runecovered skull of a creature of at least Small size; usually talismans are made of animal skulls, but particularly savage tribes and cruel individuals enjoy making them from their slain enemies. A Small skull talisman has AC 7, 5 hit points, hardness 2, and a break DC of 20. A Medium skull talisman has AC 5, 10 hit points, hardness 5, and a break DC of 25. A Large skull talisman has AC 4, 25 hit points, hardness 10, and a break DC of 30. A skull talisman carried by a creature has the same effective AC as the creature carrying it. A creature that controls possession of a skull talisman can automatically break it with one hand by taking a standard action to do so; the AC and break DCs listed above are for those who try to strike or break an unattended skull talisman or a skull talisman held by another creature. Identifying Skull Talismans: A skull talisman is covered with mystical runes and magic symbols; the exact spell stored in a skull talisman can be determined with a successful Spellcraft check (DC 20 + spell level); a read magic spell identifies the stored spell automatically. Activation: A skull talisman produces its effect when it is purposefully destroyed by crushing it, either by smashing it with a weapon or crushing it in one hand. The stored spell affects the person who destroyed it. If you have a skull talisman in your uncontested possession, you can automatically destroy it by crushing it with your hand, foot, or body. This is a standard action that provokes attacks of opportunity. If you do not have a skull talisman in your possession, you can destroy it by dealing enough damage to it. In order to gain the effects of a spell stored in a skull talisman, the skull must be within 5 feet of you when it is broken; otherwise, the stored spell dissipates harmlessly. Skull talismans are like spells cast upon the one who destroys the talisman. The character destroying the skull talisman doesn’t get to make any decisions about the effect—the creator of the talisman has already done so. The destroyer is both the effective target and the caster of the effect (though the skull talisman indicates the caster level, the destroyer still controls the effect). Skull Talisman Descriptions: Because skull talismans are simply spells stored in a magically prepared skull, refer to the appropriate spell description for all pertinent details. The caster level for a standard skull talisman is the minimum caster level needed to cast the spell."
  },
  {
    "id": "frostburn-staff-of-the-iceberg",
    "name": "Staff of the Iceberg",
    "aura": "Strong evocation (cold)",
    "casterLevel": 17,
    "requirements": "Craft Staff, Craft Magic Arms and Armor; entomb, ice castle, ice ship, iceberg, snow walk",
    "price": "138,000 gp",
    "description": "This staff looks like a jagged lance of solid ice topped with a tangled mass of ice crystals. It allows the use of the following spells: • Snow walk (1 charge) • Entomb (2 charges) • Ice ship (2 charges) • Ice castle (3 charges) • Iceberg (5 charges) The staff may be used as a weapon, functioning as a +2 icy burst quarterstaff (only one end of the staff bears this magic). It also allows its wielder to move across icy surfaces without fear of slipping or falling. These two abilities continue to function after all the charges are expended."
  },
  {
    "id": "frostburn-staff-of-winter",
    "name": "Staff of Winter",
    "aura": "Strong conjuration",
    "casterLevel": 13,
    "requirements": "Craft Staff, boreal wind, obscuring snow, whiteout, winter’s embrace",
    "price": "58,000 gp",
    "description": "This staff is made of bleached white wood; the end is a large crystalline snowflake. It allows the use of the following spells: • Boreal wind (1 charge) • Obscuring snow (1 charge) • Winter’s embrace (1 charge) • Whiteout (2 charges)"
  },
  {
    "id": "frostburn-vial-of-icy-sheets",
    "name": "Vial of Icy Sheets",
    "aura": "Faint conjuration",
    "casterLevel": 1,
    "requirements": "Craft Wondrous Item, ice slick",
    "price": "2,000 gp",
    "weight": "1 lb",
    "description": "The vial of icy sheets contains a clear fluid that creates a region of slippery ice when its contents are poured upon the ground (a standard action). The fluid spreads from the point of origin to a radius of 10 feet, coating the ground with a thin sheet of slippery ice. All creatures caught in this area must make a DC 11 Reflex save or slip and fall. Those that successfully save can move at half speed across the surface. Those that remain in the area must make a new saving throw each round to avoid falling and to be able to move. Alternatively, the vial’s contents can be poured upon an object. This encases the object with slippery ice, and if the object is carried or wielded, its wielder must make a DC 11 Reflex save to avoid dropping the item. A new saving throw must be made each round the item is grasped. Icy sheets last for 5 rounds before they evaporate away into nothingness. A vial of icy sheets automatically replenishes its supply of liquid once every day. If the contents of a vial of icy sheets are swallowed, the ice coats the mouth, throat, and stomach of the poor fool who drank it. This causes 6d6 points of cold damage (Fortitude DC 20 half)."
  }
];
