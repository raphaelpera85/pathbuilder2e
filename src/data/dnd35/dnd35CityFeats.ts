// ============================================================================
// D&D 3.5 — Cityscape: Talentos Urbanos (Cap. 2, pp. 60-64)
// Suplemento oficial da Wizards of the Coast (158 págs.).
// 14 talentos novos: Gerais, Metamágicos e Táticos (Roofwalker, Roof-Jumper).
// Ruleset "v35-city".
// ============================================================================

export interface Dnd35CityFeat {
  id: string;
  name: string;
  type: string;
  prerequisite: string | null;
  summary: string;
  benefit: string;
  normal?: string;
  special?: string;
}

export const DND35_CITY_FEATS: Dnd35CityFeat[] = [
  {
    "id": "city-efficient-defender",
    "name": "Efficient Defender",
    "type": "General",
    "prerequisite": "Heavy armor proficiency",
    "summary": "You have learned to use new techniques and modifications to your armor to increase its protective ability.",
    "benefit": "When you wear light or medium armor, you gain 1 more point of armor bonus to your AC than that armor normally provides. For example, a suit of studded leather would have a +4 armor bonus rather than +3. However, because you make use of modifications and materials that are unusual or unique, this benefit applies only to light and medium armor with which you are intimately familiar. Typically, this includes only armor you have personally owned and worn for at least 30 days. You cannot claim the benefit of this feat on newly acquired armor, nor on armor you lend to or borrow from someone else.",
    "special": "A fighter may select Efficient Defender as one of his fighter bonus feats."
  },
  {
    "id": "city-extra-contacts",
    "name": "Extra Contacts",
    "type": "General",
    "prerequisite": "Cha 11",
    "summary": "You make connections and alliances easily.",
    "benefit": "Your maximum number of contacts increases by four.",
    "normal": "Without this feat, a character is normally limited to a number of contacts equal to his Charisma modifier (minimum 1).",
    "special": "You can take the Extra Contacts feat multiple times. Its effects stack. Each time you take the feat, you add another four to your maximum number of contacts."
  },
  {
    "id": "city-favored",
    "name": "Favored",
    "type": "General",
    "prerequisite": "Membership in a guild, church, or other organization",
    "summary": "You are an active and valued member of your guild, church, or other organization.",
    "benefit": "Select one of your organization's associated skills. As long as you remain a member of that organization, you gain a +2 competence bonus on checks involving that skill. In addition, that skill is always considered a class skill for you, regardless of which class you take levels in. You are also entitled to call upon the services of your organization once per month at a reduced cost or free of charge, as detailed in Chapter 3.",
    "special": "You can take this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new organization of which you are a member."
  },
  {
    "id": "city-primary-contact",
    "name": "Primary Contact",
    "type": "General",
    "prerequisite": "Favored",
    "summary": "Your rapport with one of your contacts is stronger than your relationship with the rest.",
    "benefit": "When you gain this feat, select one of your existing contacts to be named your primary contact. Choose one skill associated with the organization to which your contact belongs. You gain 1 bonus rank in that skill (even if doing so would put you above your normal maximum rank). As long as you maintain a good relationship with your primary contact, you can call upon that contact for specialized help once per week.",
    "special": "This feat cannot be taken more than once. If the primary contact associated with this feat dies or is otherwise removed from the campaign, the DM can, at his discretion, either replace that contact with a new contact from the same organization or allow you to name one of your existing contacts as your new primary contact."
  },
  {
    "id": "city-special-dispensation",
    "name": "Special Dispensation",
    "type": "General",
    "prerequisite": "Favored",
    "summary": "You have been given leave to carry even banned armor, weapons, and equipment in a given area.",
    "benefit": "Due in part to your standing within your organization, you have received special dispensation from the authorities to wear or carry whatever equipment you deem necessary, regardless of local armor and weapons laws. This feat is often represented in the game by a badge, signet ring, writ, or other symbol of office or authority. In areas where you enjoy special dispensation, you cannot be arrested or fined simply for openly carrying weapons or wearing armor that is otherwise illegal or restricted.",
    "special": "This feat can be taken multiple times. Each time you take the feat, its effects apply to a new culture, geographic region, kingdom, or nation (whichever is appropriate)."
  },
  {
    "id": "city-strong-stomach",
    "name": "Strong Stomach",
    "type": "General",
    "prerequisite": "Con 13, Endurance",
    "summary": "You have greater resilience to illness and foul odors than most people.",
    "benefit": "You reduce the effects of sickening and nausea by one step. You cannot become nauseated. If you are exposed to an effect or condition that would normally make you nauseated, you become sickened instead. If an effect or condition would normally sicken you, that effect is negated."
  },
  {
    "id": "city-swift-tumbler",
    "name": "Swift Tumbler",
    "type": "General",
    "prerequisite": "Tumble 7 ranks",
    "summary": "You can flip, twist, and roll with great speed.",
    "benefit": "When tumbling, you move at a speed equal to half your base speed + 10 feet.",
    "normal": "Without this feat, characters move at half speed when tumbling."
  },
  {
    "id": "city-urban-tracking",
    "name": "Urban Tracking",
    "type": "General",
    "prerequisite": null,
    "summary": "You can track down the location of missing persons or wanted individuals within communities.",
    "benefit": "To find an individual's trail or to follow a trail for 1 hour requires a Gather Information check. You must make another Gather Information check every hour you search, as well as each time the trail becomes difficult to follow. The DC of the check depends on the size of the community: Thorp/Hamlet/Village DC 10, Small/Large Town DC 15, Small/Large City DC 20, Metropolis DC 25. Modifiers apply based on whether the quarry is in hiding (+5), every 24 hours elapsed (+1), or conditions of search.",
    "normal": "A character without this feat can use Gather Information to find out information about a specific individual, but each check takes 1d4+1 hours and does not allow the character to follow a trail across town."
  },
  {
    "id": "city-city-magic",
    "name": "City Magic",
    "type": "Metamagic",
    "prerequisite": null,
    "summary": "You can channel the energy of the urban environment into your offensive spells.",
    "benefit": "You can modify a spell that deals damage to draw upon the ambient energy of a city. When you cast a sculpted spell in an urban environment, half of the damage it deals is converted into 'city damage' which is not subject to energy resistance or immunity (similar to divine damage from flame strike). The other half remains its normal damage type. If cast outside an urban environment, this feat has no effect. A city-magic spell uses a spell slot of the spell's normal level."
  },
  {
    "id": "city-deceptive-spell",
    "name": "Deceptive Spell",
    "type": "Metamagic",
    "prerequisite": null,
    "summary": "You can cast spells that seem to come from somewhere other than where they should.",
    "benefit": "A deceptive spell appears to come from any direction you choose. For instance, a magic missile might shoot from a nearby doorway rather than from your own finger, or a lightning bolt might emerge from the floor. You cannot use this feat to gain a bonus to hit or bypass concealment, but observers must succeed on a DC 20 Spot check to determine that you were the true caster. A deceptive spell uses a spell slot one level higher than the spell's actual level."
  },
  {
    "id": "city-invisible-spell",
    "name": "Invisible Spell",
    "type": "Metamagic",
    "prerequisite": "Any metamagic feat",
    "summary": "You can make your spell effects invisible.",
    "benefit": "You can modify any spell that has a visible manifestation to make the manifestation completely invisible. For example, an invisible fireball still explodes with fiery heat and sound, but the burst cannot be seen. An invisible wall of force is indistinguishable from its normal version, but an invisible wall of fire is unseen (though heat can still be felt). A creature cannot make a Spot check to see an invisible spell manifestation. An invisible spell uses a spell slot of the spell's normal level."
  },
  {
    "id": "city-sculpt-spell",
    "name": "Sculpt Spell",
    "type": "Metamagic",
    "prerequisite": "Any metamagic feat",
    "summary": "You can alter the area of your spells.",
    "benefit": "You can modify an area spell by changing the area's shape to either a cylinder (10-foot radius, 30 feet high), a 40-foot cone, four 10-foot cubes, a ball (20-foot-radius spread), or a 120-foot line. A sculpted spell works normally in all respects except for its shape. A sculpted spell uses a spell slot one level higher than the spell's actual level."
  },
  {
    "id": "city-roofwalker",
    "name": "Roofwalker",
    "type": "Tactical",
    "prerequisite": "Balance 5 ranks, Jump 5 ranks, Dodge, Mobility",
    "summary": "You are adept at moving and fighting on rooftops and ledges.",
    "benefit": "The Roofwalker feat enables the use of three tactical maneuvers:\\nFleet of Feet: You can walk across a precarious surface (such as a rooftop, ledge, or tightrope) more quickly than normal. You can move at your full speed without taking a -5 penalty on your Balance check.\\nGraceful Drop: When deliberately dropping from a ledge or roof, you reduce the effective distance fallen by 10 feet. If you also make a Jump check (DC 15), you reduce the distance fallen by another 10 feet (total 20 feet).\\nMaster of the Roof: You gain a +1 dodge bonus to Armor Class against opponents who are at a lower elevation than you on an inclined roof or ledge."
  },
  {
    "id": "city-roof-jumper",
    "name": "Roof-Jumper",
    "type": "Tactical",
    "prerequisite": "Balance 5 ranks, Jump 5 ranks, Dodge, Mobility, Roofwalker",
    "summary": "You leap fearlessly between roofs and deliver crushing attacks from above.",
    "benefit": "The Roof-Jumper feat enables the use of three tactical maneuvers:\\nDeath from Above: If you deliberately leap down to attack a foe beneath you from at least 20 feet above, your attack deals an extra 1d6 points of damage for every 10 feet fallen (maximum +5d6), and the target must make a Fortitude save (DC 10 + 1/2 your character level + your Str modifier) or be knocked prone.\\nLeap of the Heavens: You can leap across gaps without requiring a running start, treating all standing jump DCs as if you made a running start.\\nUrban Agility: When you fall or jump onto a soft surface or into a crowd, you can make a DC 15 Tumble check as a free action to take half damage from the fall and avoid falling prone."
  }
];
