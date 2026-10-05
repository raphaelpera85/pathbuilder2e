// ============================================================================
// D&D 3.5 — Frostburn: equipamento (Cap. 4, pp. 75-79, texto em inglês)
// Tabelas 4-1 (armas exóticas), 4-2 (equipamento) e 4-3 (itens alquímicos) e
// as descrições de cada item, extraídas da camada de texto do PDF.
// Ainda não incluídos: materiais exóticos (gelo azul etc.), veículos e
// aprimoramentos mágicos (pp. 80-83) e a Tabela 4-4.
// ============================================================================

export interface Dnd35FrostburnWeapon {
  id: string;
  name: string;
  group: "One-Handed" | "Two-Handed" | "Ranged";
  cost: string;
  damageSmall: string;
  damageMedium: string;
  critical: string;
  /** "—" para armas sem alcance. */
  rangeIncrement: string;
  /** Nota 3 da tabela: 20 pés sobre chão sólido e liso, 30 pés sobre gelo liso. */
  rangeIncrementSpecialNote: boolean;
  /** Peso para armas Médias (nota 1: Pequena pesa metade, Grande o dobro). */
  weight: string;
  /** Tipo de dano impresso: "and" = ambos, "or" = à escolha do jogador (nota 2). */
  type: string;
  description: string;
}

export interface Dnd35FrostburnGear { id: string; name: string; cost: string; weight: string; description: string }
export interface Dnd35FrostburnAlchemicalItem { id: string; name: string; craftDc: number; cost: string; weight: string; description: string }

export const DND35_FROSTBURN_WEAPONS: Dnd35FrostburnWeapon[] = [
  {
    "id": "frostburn-ice-axe",
    "name": "Ice axe",
    "group": "One-Handed",
    "cost": "10 gp",
    "damageSmall": "1d4",
    "damageMedium": "1d6",
    "critical": "×4",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "5 lb.",
    "type": "Piercing or slashing",
    "description": "More tool than weapon, the ice axe has a sharp metal head that is perpendicular to the shaft and has a spiked handle. It grants a +1 circumstance bonus on Climb checks in mountainous and/or icy terrain, even if you do not possess the Exotic Weapon Proficiency (ice axe) feat. If you do possess this feat, the bonus increases to a +4 circumstance bonus. An ice axe may be used as a martial weapon, but takes a –2 penalty on attack rolls in this case."
  },
  {
    "id": "frostburn-iuak",
    "name": "Iuak",
    "group": "One-Handed",
    "cost": "12 gp",
    "damageSmall": "1d4",
    "damageMedium": "1d6",
    "critical": "19–20/×2",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "4 lb.",
    "type": "Slashing",
    "description": "An iuak is a heavily weighted machete-shaped blade, usually made of bone or stone. While it makes an excellent weapon, its primary purpose is to cut through and destroy ice and other hard materials. If used against an object, an iuak ignores the first 3 points of hardness possessed by the object."
  },
  {
    "id": "frostburn-tigerskull-club",
    "name": "Tigerskull club",
    "group": "One-Handed",
    "cost": "15 gp",
    "damageSmall": "1d6",
    "damageMedium": "1d8",
    "critical": "×4",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "8 lb.",
    "type": "Bludgeoning and piercing",
    "description": "The smilodon’s skull is remarkably sturdy; it would have to be, to absorb the impacts of its terrible bite. Many primitive tribes have capitalized on this fact of nature and use smilodon skulls to fashion tigerskull clubs. A tigerskull club consists of a smilodon’s skull (sans lower jaw) lashed to a short length of wood. The twin sabers of the skull’s upper jaw then function as a highly effective picklike weapon. Disarm and trip attacks made with a tigerskull club gain a +2 circumstance bonus. If you fail to trip your opponent, you may choose to drop your tigerskull club to avoid the retaliatory trip attack."
  },
  {
    "id": "frostburn-goad",
    "name": "Goad",
    "group": "Two-Handed",
    "cost": "8 gp",
    "damageSmall": "1d6",
    "damageMedium": "2d4",
    "critical": "×2",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "10 lb.",
    "type": "Bludgeoning or piercing",
    "description": "A goad is a long, thin wooden pole mounted with a heavy stone or metal weight and a large spike at one end. Primarily intended as a tool to direct the movement of large animals, a goad makes an excellent weapon in a pinch. When you attack with a goad, you must decide if you are attacking with the spike to deal piercing damage or the weight to deal bludgeoning damage. The flexibility of the goad’s shaft absorbs much of the force behind blows made with the bludgeoning head, and all bludgeoning damage dealt by a goad is nonlethal as a result. Piercing damage remains lethal. If you are proficient with its use, the goad grants a +2 circumstance bonus on all Handle Animal checks made against animals of Huge size or larger."
  },
  {
    "id": "frostburn-ritiik",
    "name": "Ritiik",
    "group": "Two-Handed",
    "cost": "5 gp",
    "damageSmall": "1d6",
    "damageMedium": "1d8",
    "critical": "×3",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "6 lb.",
    "type": "Piercing",
    "description": "A ritiik is a spearlike weapon with an additional hooklike blade protruding from the base of the spear head. When you successfully hit a target with a ritiik, you can twist the weapon and hook this blade into the target’s flesh if the target fails a Reflex saving throw (DC 10 + the damage dealt). If you hook the target, you can immediately make a trip attack against the target. If you fail, you can let go of the ritiik to avoid the retaliatory trip attack. The damaged creature can pull the ritiik from its wound if it has two free hands and takes a full-round action to do so, but it deals damage to itself equal to the initial damage the ritiik dealt. A character who succeeds on a DC 15 Heal check can remove a ritiik without further damage."
  },
  {
    "id": "frostburn-sugliin",
    "name": "Sugliin",
    "group": "Two-Handed",
    "cost": "35 gp",
    "damageSmall": "2d6",
    "damageMedium": "2d8",
    "critical": "×2",
    "rangeIncrement": "—",
    "rangeIncrementSpecialNote": false,
    "weight": "20 lb.",
    "type": "Piercing and slashing",
    "description": "The infamous sugliin was created by primitive tribes more to strike terror into the hearts of their enemies rather than to be an effective weapon. This massive polearm consists of several sets of sharpened caribou and/or megaloceros antlers affixed to a long wooden shaft. You attack with the sugliin as if it were a massive axe or scythe, slashing and chopping at the targets with great arcs. This weapon is so unwieldy and heavy that making a single attack with it is a full-round action. Sugliins are favored weapons for low-level characters who want to deal huge amounts of damage and lack the skill to make additional attacks; higher-level characters only rarely use sugliins due to their awkwardness. The Sugliin Mastery feat (see page 50) allows a character to make attacks with this massive weapon normally. A sugliin has reach. You can strike opponents 10 feet away with it, but you can’t use it against an adjacent foe."
  },
  {
    "id": "frostburn-bone-bow",
    "name": "Bone bow",
    "group": "Ranged",
    "cost": "250 gp",
    "damageSmall": "1d8",
    "damageMedium": "1d10",
    "critical": "×3",
    "rangeIncrement": "120 ft.",
    "rangeIncrementSpecialNote": false,
    "weight": "4 lb.",
    "type": "Piercing",
    "description": "This powerful and oversized bow is designed to fire exceptionally large arrows specially made for it. Made of the bones and sinews of huge animals such as woolly mammoths and dire rhinoceroses, these bows were designed by primitive cultures expressly for the hunting of huge creatures that require a lot of damage to take down. A bone bow functions as a composite longbow with regard to applying the user’s Strength bonus to damage done with arrows shot from it. The bow has a long, thick spike protruding from both ends; this spike is used to brace against a solid object (either the ground or an overhanging protrusion or ceiling) to aid in pulling the bow’s string. A character may use a bone bow as a martial weapon, but doing so imparts a –4 penalty on attack rolls, and firing an arrow from the bow requires a fullround action. For purposes of feats such as Weapon Focus and Weapon Specialization, a bone bow is treated as if it were a longbow; thus if you have Weapon Focus (longbow), that feat applies to bone bows as well."
  },
  {
    "id": "frostburn-glot",
    "name": "Glot",
    "group": "Ranged",
    "cost": "1 gp",
    "damageSmall": "1d3",
    "damageMedium": "1d4",
    "critical": "18–20/×2",
    "rangeIncrement": "10 ft.",
    "rangeIncrementSpecialNote": true,
    "weight": "1 lb.",
    "type": "Bludgeoning",
    "description": "The glot is a specially balanced sphere of metal designed to be thrown low to the ground. It then skips and bounces across the ground with little reduction in velocity to strike its target. If the ground between you and your target is solid, flat, and relatively free of obstructions, the glot’s range increment increases to 20 feet. If the ground is also icy, the glot skips even more readily over the frozen ground and its range increment increases to 30 feet. If you use a glot to attack an airborne target, its range increment is always 10 feet. You can make ranged trip attacks with a thrown glot."
  },
  {
    "id": "frostburn-harpoon",
    "name": "Harpoon",
    "group": "Ranged",
    "cost": "15 gp",
    "damageSmall": "1d8",
    "damageMedium": "1d10",
    "critical": "×2",
    "rangeIncrement": "30 ft.",
    "rangeIncrementSpecialNote": false,
    "weight": "10 lb.",
    "type": "Piercing",
    "description": "The harpoon is a broad-bladed spear forged with barbs. The shaft of the harpoon has a trailing rope attached to control harpooned opponents. Though designed for hunting whales and other large sea creatures, the harpoon can be used on dry land. If it deals damage, the harpoon lodges in an opponent who fails a Reflex saving throw (DC 10 + the damage dealt). A harpooned creature moves at only half speed and cannot charge or run. If you control the trailing rope by succeed-ing on an opposed Strength check while holding it, the harpooned creature can move only within the limits that the rope allows (the trailing rope is 30 feet long). If the harpooned creature attempts to cast a spell, it must succeed on a DC 15 Concentration check or lose the spell. The harpooned creature can pull the harpoon from its wound if it has two free hands and takes a full-round action to do so, but it deals damage to itself equal to the initial damage the harpoon dealt. A character who succeeds on a DC 15 Heal check can remove a harpoon without further damage."
  },
  {
    "id": "frostburn-icechucker",
    "name": "Icechucker",
    "group": "Ranged",
    "cost": "150 gp",
    "damageSmall": "1d10",
    "damageMedium": "1d12",
    "critical": "×3",
    "rangeIncrement": "30 ft.",
    "rangeIncrementSpecialNote": false,
    "weight": "12 lb.",
    "type": "Piercing",
    "description": "The icechucker appears to be a large crossbow at a casual glance, larger even than a heavy crossbow. Its launching mechanism is designed to fire large shards of ice (usually icicles) rather than regular crossbow bolts. You draw an icechucker back by pulling on a thick lever on the underside of the weapon. Loading an icechucker is a fullround action that provokes attacks of opportunity. If icicles aren’t handy to load into an icechucker, it can also be used to fire a javelin, dealing the same damage."
  },
  {
    "id": "frostburn-razor-skipdisk",
    "name": "Razor skipdisk",
    "group": "Ranged",
    "cost": "15 gp",
    "damageSmall": "1d4",
    "damageMedium": "1d6",
    "critical": "18–20/×2",
    "rangeIncrement": "10 ft.",
    "rangeIncrementSpecialNote": true,
    "weight": "2 lb.",
    "type": "Slashing",
    "description": "A razor skipdisk is a flat, circular disk of metal with a razor-sharp rim. One surface of the razor skipdisk is slightly convex and smooth, while the other is concave with a small knob protruding from the center. You attack with a razor skipdisk by gripping the knob and then hurling it so the convex surface skips and slides across the ground toward its target. If the ground between you and your target is solid, flat, and relatively free of obstructions, the razor skipdisk’s range increment increases to 20 feet. If the ground is also icy, the razor skipdisk skips even more readily over the frozen ground and its range increment increases to 30 feet. If you use a razor skipdisk to attack an airborne target, its range increment is always 10 feet."
  }
];

export const DND35_FROSTBURN_GEAR: Dnd35FrostburnGear[] = [
  {
    "id": "frostburn-crampons",
    "name": "Crampons",
    "cost": "5 gp",
    "weight": "1 lb.",
    "description": "Crampons consist of a set of metal spikes and hooks that lash on to boots and gauntlets to assist in climbing or walking across icy surfaces. While you wear crampons, you gain a +2 circumstance bonus on any Balance checks made to avoid slipping on an icy surface, and a +2 circumstance bonus on Climb checks. Crampons impose a –10 ft. penalty to speed when not walking on snow or ice."
  },
  {
    "id": "frostburn-fur-clothing",
    "name": "Fur clothing",
    "cost": "8 gp",
    "weight": "10 lb.",
    "description": "Fur clothing consists of thick layers of animal furs designed to be worn over a regular set of clothing or armor. Wearing fur clothing grants a +5 circumstance bonus on Fortitude saving throws against exposure to cold weather. Fur clothing can be worn over a cold weather outfit; in this case the circumstance bonuses granted by each item stack, granting a total +10 circumstance bonus on Fortitude saving throws against exposure to cold weather. Fur clothing is cumbersome to wear. Although the furs do not provide an appreciable armor bonus, they do increase your total armor check penalty for any armor worn by 2 points."
  },
  {
    "id": "frostburn-hut-portable",
    "name": "Hut, portable",
    "cost": "125 gp",
    "weight": "75 lb.",
    "description": "A portable hut consists of a wooden framework that can be quickly assembled into a hut-shaped frame that covers a 10-foot square. The frame’s base consists of several iron spikes that can be driven through holes in the frame to affix the hut frame to the ground; further stability is granted by several rope supports that extend out 15 feet from the hut’s edge. Once the frame is in place, you simply attach the leather and fur wrappings over the outside of the wall and lash them directly to the frame to finish building the hut. A portable hut provides excellent shelter in the wilderness; assembling or disassembling a portable hut only takes 15 minutes of work. A portable hut serves as an improvised shelter (see page 10)."
  },
  {
    "id": "frostburn-skates",
    "name": "Skates",
    "cost": "10 gp",
    "weight": "3 lb.",
    "description": "Skates allow full movement across icy surfaces for anyone with at least 5 ranks of Balance, but cannot be used at all on any other terrain."
  },
  {
    "id": "frostburn-skis-and-poles",
    "name": "Skis and poles",
    "cost": "15 gp",
    "weight": "6 lb.",
    "description": "Skis allow full movement across snow and icy surfaces but cannot be used at all on any other terrain. Downhill speed can be as a run (×4) on slight grades or as a run (×5) on severe grades. It takes a full-round action to don or to remove skis."
  },
  {
    "id": "frostburn-snow-goggles",
    "name": "Snow goggles",
    "cost": "2 gp",
    "weight": "—",
    "description": "These wooden goggles have a thin horizontal slit in the middle. They grant a +2 circumstance bonus on saving throws to resist blinding effects, including snow blindness, extremely bright light, or spells that target vision indirectly (such as sunburst but not blindness). While wearing snow goggles, you incur a –4 circumstance penalty on Spot and Search checks."
  },
  {
    "id": "frostburn-snowshoes",
    "name": "Snowshoes",
    "cost": "15 gp",
    "weight": "8 lb.",
    "description": "These allow the wearer to move across snow and ice with increased speed. Snow of any depth is considered a minor impediment (see page 12). Snowshoes take 1 minute to don and a full-round action to remove."
  },
  {
    "id": "frostburn-winter-fullcloth",
    "name": "Winter fullcloth",
    "cost": "4 gp",
    "weight": "2 lb.",
    "description": "This is a heavily quilted undergarment that is worn underneath regular clothing to protect the wearer against cold. Winter fullcloth is considered part of the cold weather outfit described in the Player’s Handbook. If worn by itself, it grants a +1 circumstance bonus on Fortitude saving throws against exposure to cold weather."
  }
];

export const DND35_FROSTBURN_ALCHEMICAL_ITEMS: Dnd35FrostburnAlchemicalItem[] = [
  {
    "id": "frostburn-armor-insulation",
    "name": "Armor insulation (flask)",
    "craftDc": 25,
    "cost": "50 gp",
    "weight": "2 lb.",
    "description": "This thick red syrupy mixture is applied with a brush to the inner surface of a suit of armor. When the mixture comes in contact with body heat and sweat, it puffs up to trap body heat, insulating the wearer against the effects of cold. For 24 hours after application, the wearer of a suit of armor treated with armor insulation gains a +5 circumstance bonus on Fortitude saving throws against exposure to cold weather."
  },
  {
    "id": "frostburn-freeze-powder",
    "name": "Freeze powder (vial)",
    "craftDc": 25,
    "cost": "100 gp",
    "weight": "1 lb.",
    "description": "Freeze powder looks like salt but is much finer to touch. One vial of freeze powder sprinkled into any liquid is enough to instantly freeze solid 1 cubic foot of liquid. If introduced into a larger body of water or liquid, the powder freezes into a 1-foot diameter ball of ice. Sprinkled on a wet floor, a vial of freeze powder can coat a 10-foot-square area with ice. Freeze powder is dangerous to eat; anyone foolish enough to swallow a vial of freeze powder takes 2d6 points of cold damage as the powder freeze-burns his mouth and throat. A successful DC 15 Fortitude saving throw halves the damage."
  },
  {
    "id": "frostburn-frostbite-salve",
    "name": "Frostbite salve (jar)",
    "craftDc": 20,
    "cost": "50 gp",
    "weight": "1 lb.",
    "description": "This pale yellow cream provides instant relief from frostbite damage. It does not cure frostburn damage (see page 17), but temporarily suppresses up to 2 points of ability score damage caused by frostbite. The salve’s effectiveness lasts for just one hour, after which point the ability score damage suppressed by the salve returns."
  },
  {
    "id": "frostburn-ice-chalk",
    "name": "Ice chalk",
    "craftDc": 15,
    "cost": "20 gp",
    "weight": "—",
    "description": "Ice chalk comes in a variety of colors. These waxy sticks can be used to make temporary marks on any icy surface, similar to how chalk can be used to mark slate or stone."
  },
  {
    "id": "frostburn-melt-powder",
    "name": "Melt powder (vial)",
    "craftDc": 20,
    "cost": "25 gp",
    "weight": "1 lb.",
    "description": "Utilizing some of the same principles as freeze powder, melt powder causes ice it is sprinkled upon to instantly melt. One vial of melt powder is enough to melt 1 cubic foot of ice. Sprinkled on an icy surface of up to 10 square feet, a vial of melt powder makes a 1-inch-deep pool of water that quickly refreezes. Melt powder is bitter tasting, but only harmful to creatures with the cold subtype if it is eaten. Such creatures take 2d6 points of acid damage as the powder desiccates and dissolves their tissues; a successful DC 15 Fortitude save halves the damage."
  },
  {
    "id": "frostburn-polar-skin",
    "name": "Polar skin (flask)",
    "craftDc": 25,
    "cost": "25 gp",
    "weight": "1 lb.",
    "description": "This dull white cream provides limited protection against cold-based damage. Polar skin becomes ineffective once it has absorbed 5 points of cold damage. Regardless of whether it absorbs any damage, polar skin loses its effectiveness 1 hour after application. Polar skin does not stack with magical protection from cold. Magical effects such as resist energy supersede the protection provided by polar skin. Applying polar skin takes 1 minute."
  },
  {
    "id": "frostburn-razor-ice-powder",
    "name": "Razor ice powder (vial)",
    "craftDc": 25,
    "cost": "50 gp",
    "weight": "1 lb.",
    "description": "This granular white powder can be sprinkled over any icy surface; one vial is enough to coat one 5-foot square. The area coated immediately grows hundreds of tiny razor-sharp crystals of ice; these crystals function as if the area had been covered with razor ice (see page 16). Razor ice is difficult to see; a successful DC 20 Survival check reveals the danger, otherwise, a victim won’t realize the true nature of the painful ice until she treads upon it. A creature with the cold subtype can use a standard action to sprinkle a vial of razor ice powder on any single natural weapon it possesses; it grants a +1 enhancement bonus on slashing damage for that natural attack for one hour."
  },
  {
    "id": "frostburn-whale-grease",
    "name": "Whale grease (flask)",
    "craftDc": 25,
    "cost": "75 gp",
    "weight": "2 lb.",
    "description": "Whale grease is a thick clear grease fashioned from a combination of melted whale blubber and various powdered minerals and waxy plants. This foul-smelling stuff must be applied directly to the skin (taking 1 minute to do so) to be effective; once applied, the grease insulates the user from hypothermia, providing complete protection from hypothermia effects for as long as it lasts. Whale grease loses its effectiveness 1 hour after application. It is not water soluble, but can be quickly removed with alcohol. While worn, the pungent odor the grease gives off allows creatures with the scent ability to detect you at double normal range."
  }
];
