// ============================================================================
// D&D 3.5 — Frostburn: materiais exóticos, aprimoramentos mágicos de veículos,
// veículos e Tabela 4-4 (Cap. 4, pp. 80-83, texto em inglês). Extraído da
// camada de texto do PDF; modificadores de custo conferidos na própria tabela.
// ============================================================================

export interface Dnd35FrostburnMaterial {
  id: string;
  name: string;
  description: string;
  /** Tabela "Type of X Item / Item Cost Modifier" impressa. */
  costModifiers: { item: string; modifier: string }[];
}

export interface Dnd35FrostburnVehicleAugmentation {
  id: string;
  name: string;
  aura: string;
  casterLevel: number;
  requirements: string;
  price: string;
  weight: string;
  description: string;
}

export interface Dnd35FrostburnVehicle {
  id: string;
  name: string;
  /** Linha de estatísticas impressa, até o custo ("Cost 20 gp."). */
  statLine: string;
  description: string;
}

export const DND35_FROSTBURN_MATERIALS_INTRO = "Craftsmen of the frostfell value several exotic materials as much as any precious metal. New materials with which to construct armor and weapons, as well as other items, are described below.";

export const DND35_FROSTBURN_MATERIALS: Dnd35FrostburnMaterial[] = [
  {
    "id": "frostburn-blue-ice",
    "name": "Blue Ice",
    "description": "Found only in the depths of the most ancient glaciers, veins of blue ice are often sought out by glacier dwarves. It appears as dark blue, opaque ice that sparkles in light as if it were coated with a tiny film of gemstones; this is merely a thin layer of frost that forms over its surface when exposed to air. The material is cold and feels identical to regular ice upon casual observation, but blue ice only melts under intense and direct application of heat, similar to iron. Those who mine this material from the ancient glaciers often do so simply by melting away the surrounding ice; this is a dangerous procedure, though, since it can rapidly destabilize the surrounding ice. As a result, only the most gifted miners attempt to mine blue ice. Blue ice can be forged, shaped, and utilized as if it were iron. Blue ice is much lighter than iron, and when forged into a slashing weapon it keeps its edge much longer and is much sharper than an equally forged iron weapon. Slashing weapons made of blue ice have a +1 enhancement bonus on damage. Bludgeoning or piercing weapons can be made of blue ice, but they gain no bonuses to damage. All weapons made of blue ice weigh half as much as normal. Blue ice isn’t just useful to make slashing weapons, though; it can be used to build anything that is normally built of iron. Many dwarven fortresses in the frostfell make heavy use of blue ice for metal components such as nails, tools, door hinges, utensils, and pretty much anything else they can think of; blue ice goblets and mugs are especially popular for export to warmer climates since they keep their contents chilled. A room lined with sheets of blue ice remains at a constant temperature of about freezing, making for an effective way to create refrigerated chambers for food storage. Items made out of blue ice weigh half as much as normal. Blue ice armor is much lighter than normal armor, although it can be uncomfortable to wear for creatures not immune or resistant to cold. Only armor normally fashioned of metal can be made from blue ice. Most blue ice armors are one category lighter than normal for purposes of movement and other limitations, so that medium armor counts as light armor, and heavy armor counts as medium armor. Light armor remains light armor. Spell failure chances for arcane spells remains unchanged, with the exception of spells with the cold descriptor, which can be cast while wearing blue ice armor with no chance of spell failure. Maximum Dexterity bonus is increased by 1, and armor check penalties are lessened by 2. If the creature wearing the armor is not resistant or immune to cold, he takes a –1 penalty on Reflex saving throws and initiative checks from the general numbness caused by the armor. The Cold Endurance feat is enough to prevent this effect. Blue ice has 20 hit points per inch of thickness and hardness 10.",
    "costModifiers": [
      {
        "item": "Light armor",
        "modifier": "+750 gp"
      },
      {
        "item": "Medium armor",
        "modifier": "+3,000 gp"
      },
      {
        "item": "Heavy armor",
        "modifier": "+7,000 gp"
      },
      {
        "item": "Shield",
        "modifier": "+750 gp"
      },
      {
        "item": "Slashing weapon",
        "modifier": "+500 gp"
      },
      {
        "item": "Other items",
        "modifier": "+400 gp/lb."
      }
    ]
  },
  {
    "id": "frostburn-rimefire-ice",
    "name": "Rimefire Ice",
    "description": "This form of ice is found only in icebergs inhabited by rimefire eidolons. These icebergs are approximately 95% normal ice, but the remaining 5% consists of veins of pale blue ice that glows softly, providing illumination equal to that of a torch. Rimefire ice is especially cold to the touch, and any creature that comes in contact with it takes 1 point of cold damage per round of contact. Any amount of resistance or immunity to cold or the Mark of Hleid feat provides complete protection from this cold damage. The most unusual aspect of rimefire ice is that it is approximately as flammable as wood; it does not melt when heat is applied to it. Burning rimefire ice does not deal fire damage, though, even if it is ignited by an open flame. Rather, burning rimefire ice deals cold damage on anything unfortunate enough to get too close. Rimefire ice could make an interesting material to forge weapons out of; rimefire ice has about the same amount of resilience and strength as wood. It cannot be used to make any appreciable armor, but it can be used to create any weapon that is normally made out of wood (or nearly completely of wood, as in the case of a spear or javelin). Rimefire ice weapons glow with blue light, providing illumination to a 20-foot radius. They also deal +1 point of cold damage on each successful hit. Since rimefire is workable as wood, it can be used to build any object that can normally be made of wood. Rimefire ice objects glow blue, provide illumination as a torch, and retain their ability to cause 1 point of cold damage per round of contact to anything touching it. Rimefire ice brought into warmer climates does not melt into water; it melts into thick white clouds of water vapor with great rapidity. Each minute a piece of rimefire ice is exposed to temperatures above 40° F, it takes 1d6 points of damage (this damage overcomes the ice’s hardness and is not halved, as is most energy damage applied to objects). For each additional 10 degrees hotter than this, the ice takes an additional 1d6 points of damage per round. Rimefire ice has 5 hit points per inch of thickness and hardness 3.",
    "costModifiers": [
      {
        "item": "Weapon",
        "modifier": "+750 gp"
      },
      {
        "item": "Other objects",
        "modifier": "+500 gp/lb."
      }
    ]
  },
  {
    "id": "frostburn-stygian-ice",
    "name": "Stygian Ice",
    "description": "This extraplanar ice comes from Stygia, the fifth layer of Hell. Infused with the soulless evil of that realm, along with the magical waters of the river Styx, stygian ice is black and constantly crawls with a thin layer of pale blue mist. Stygian ice is much colder than normal ice, and it melts slowly in nonfreezing environs. The coldness that this ice exudes is magical in nature, and freezes the mind much more rapidly than flesh. Stygian ice deals 1d6 points of cold damage per round of contact. Worse, if a creature takes damage from this supernatural cold, it must make a DC 12 Will saving throw or take 2 points of Wisdom damage as its memories are slowly frozen. If a creature’s Wisdom is reduced to 0, further contact causes Constitution damage. A creature whose Constitution is reduced to 0 by Stygian ice rises as a wraith in 2d4 rounds. Stygian ice is not much harder than normal ice, so it doesn’t make effective armor. Weapons made of Stygian ice are somewhat fragile, and each time they deal damage the wielder must make a DC 15 Reflex save to avoid dealing the same amount of damage on the weapon itself. Stygian ice weapons deal 1d6 points of additional cold damage on a hit; if the creature hit takes cold damage, it must make a DC 12 Will saving throw or take 2 points of Wisdom damage (or Constitution damage, if Wisdom is at 0). This damage applies to the wielder of the weapon as well; a character who wishes to wield a weapon made of Stygian ice is advised to seek out protection from cold damage. Stygian ice has 5 hit points per inch of thickness and hardness 3. Magical fire damage is not halved when applied to stygian ice. An object made of Stygian ice takes 1 point of damage per hour it exists in an environment above 40° F; this damage overcomes the ice’s hardness. As it melts, the ice gives off foul vapors that nauseate anyone within 5 feet who fails a DC 12 Fortitude saving throw.",
    "costModifiers": [
      {
        "item": "Weapon",
        "modifier": "+6,000 gp"
      },
      {
        "item": "Other objects",
        "modifier": "+2,000 gp/lb."
      }
    ]
  }
];

export const DND35_FROSTBURN_VEHICLE_AUGMENTATIONS: Dnd35FrostburnVehicleAugmentation[] = [
  {
    "id": "frostburn-coldfire-keel",
    "name": "Coldfire Keel",
    "aura": "Strong universal",
    "casterLevel": 17,
    "requirements": "Craft Wondrous Item, wish",
    "price": "200,000 gp",
    "weight": "1,000 lb",
    "description": "This item, often forged on the Elemental Planes, enables any vehicle to move across coldfire as if it were on its normal terrain (water, land, or air). The vessel’s speed is unaffected, but rough terrain or conditions slow the vehicle just as it would a land vehicle."
  },
  {
    "id": "frostburn-coldfire-engine",
    "name": "Coldfire Engine",
    "aura": "Strong universal",
    "casterLevel": 17,
    "requirements": "Craft Wondrous Item, animate objects, wish",
    "price": "200,000 gp",
    "weight": "1,000 lb",
    "description": "This item, typically constructed on the Elemental Planes, propels any vehicle at a speed of 80 feet."
  },
  {
    "id": "frostburn-ice-keel",
    "name": "Ice Keel",
    "aura": "Strong transmutation",
    "casterLevel": 17,
    "requirements": "Craft Wondrous Item, thaw, wish",
    "price": "150,000 gp",
    "weight": "1,000 lb",
    "description": "This item, often forged on the Elemental Planes, enables a water or land vehicle to move across ice as if it were on water or land, respectively. The vessel’s speed is unaffected, but rough terrain slows the vehicle just as it would an ice vehicle."
  },
  {
    "id": "frostburn-runners-of-speed",
    "name": "Runners of Speed",
    "aura": "Strong transmutation",
    "casterLevel": 17,
    "requirements": "Craft Wondrous Item, haste, wish",
    "price": "100,000 gp",
    "weight": "1,000 lb",
    "description": "These runners increase the speed of vehicles that travel through snow or ice by 20 feet."
  }
];

export const DND35_FROSTBURN_VEHICLES: Dnd35FrostburnVehicle[] = [
  {
    "id": "frostburn-sled",
    "name": "Sled",
    "statLine": "Large vehicle; Handle Animal +2; Spd drawn (clumsy); Overall hp 40 (hardness 5); Overall AC 4; Ram 3d6; Face 15 ft. by 5 ft.; Height 5 ft.; Crew 1; Weight 300 lb., Cargo 1 ton; Cost 20 gp.",
    "description": "Drawn across ice or snow, the sled is an almost entirely exposed structure. Eight riding dogs can pull the sled over ice or packed snow at a speed of 40 feet, even if it’s fully loaded. Untracked snow slows the speed by one-half, and deep snow cuts it to one-quarter."
  },
  {
    "id": "frostburn-worg-warsled",
    "name": "Worg Warsled",
    "statLine": "Huge vehicle; Handle Animal +2; Spd drawn (poor); Overall hp 100 (hardness 7); Overall AC 3; Ram 6d6; Face 15 ft. by 10 ft.; Height 5 ft.; Crew 1 (plus 3 passengers); Weight 900 lb.; Cargo 700 lb.; Cost 400 gp.",
    "description": "Goblins in snowy climes use their worg allies to pull massive sleds covered with makeshift armor and spikes. The driver and passengers aboard such a warsled gain cover behind a 2-inch barrier of steel and wood (hp 20, hardness 7). Two worgs abreast pull the sled at a speed of 35 feet."
  },
  {
    "id": "frostburn-ice-sled-wagon",
    "name": "Ice Sled-Wagon",
    "statLine": "Huge vehicle; Handle Animal –2; Spd drawn (poor); Overall hp 60 (hardness 5); Overall AC 3; Ram 4d6; Face 15 ft. by 10 ft.; Height 5 ft.; Crew 1; Weight 400 lb., Cargo 2 tons; Cost 35 gp.",
    "description": "A wagon is open-topped, so the driver and any passengers gain no cover. The most common dray creatures for the wagon are two heavy horses, which are strong enough to pull a fully loaded wagon at a speed of 35 feet. However, in frostfell regions, wagons may also be drawn by a single woolly mammoth or four saber-toothed tigers at a speed of 40 feet. An ice sled-wagon can also be equipped with a heavy catapult (adding 2 tons to the wagon’s weight and eliminating the cargo capacity) or a light catapult (adding 1 ton to weight, leaving 1 ton of cargo space for ammunition)."
  },
  {
    "id": "frostburn-sailing-ice-ship",
    "name": "Sailing Ice Ship",
    "statLine": "Colossal vehicle; Profession (sailor) +4; Spd ice wind × 30 ft. (average), snow wind × 20 ft. (poor); Overall AC –3; Section hp 50 (hardness 5); Section AC 3; Rigging 80 hp (hardness 0), AC 1; Ram 12d6; Face 80 ft. by 20 ft.; Height 10 ft. (draft 10 ft.); Crew 20; Cargo 150 tons (Spd wind × 15 ft. if 75 tons or more); Cost 10,000 gp.",
    "description": "A sailing ice ship has runners that allow it to travel across fields of snow as well as sheets of ice. The deck has enough room for two light catapults or ballistae. The ship can be converted from ice to water travel or vice versa with four hours of work by a full crew."
  },
  {
    "id": "frostburn-sailing-ice-warship",
    "name": "Sailing Ice Warship",
    "statLine": "Colossal vehicle; Profession (pilot) +2; Spd ice wind × 15 ft. (average), snow wind × 20 ft. (poor); Overall AC –3; Section hp 100 (hardness 5); Section AC 3; Rigging 80 hp (hardness 0), AC 1; Ram 15d6; Face 100 ft. by 20 ft.; Height 20 ft. (draft 15 ft.); SA Ramming prow; Crew 260 (80 rowers, 160 marines); Cargo 5 tons; Cost 25,000 gp.",
    "description": "Used by the military forces of snow kingdoms or by glacial barbarian raiders, a sailing ice warship can bring devastation and death to vast expanses of ice and snow. An ice warship can accommodate two heavy catapults or four light catapults or ballistae. The ship can be converted from ice to water travel or vice versa with four hours of work by a full crew."
  },
  {
    "id": "frostburn-iceberg",
    "name": "Iceberg",
    "statLine": "Colossal vehicle; Profession (sailor) –20; Spd 5 ft. (nautical clumsy); Overall hp 900 (hardness 8); Overall AC –6; Section hp 50 (hardness 8); Section AC 3; Ram 20d6+1d6 cold; Space 100 ft.; Height 200 ft.; Cargo 1,000 tons; Cost —.",
    "description": "An iceberg is a massive chuck of freshwater ice that has broken free of a glacier and fallen into the sea. These towering behemoths reach as high as 200 feet or more in height above the waterline (with usually another 800 feet or more hidden below the surface). An iceberg moves with the current and is impossible to control without some sort of sail, engine, or other force. For the specific terrain features of an iceberg, see Iceberg Terrain, page 25."
  },
  {
    "id": "frostburn-skyberg",
    "name": "Skyberg",
    "statLine": "Colossal vehicle; Profession (pilot) –20; Spd fly wind × 20 ft. (clumsy); Overall hp 900 (hardness 8); Overall AC –6; Section hp 50 (hardness 8); Section AC 3; Ram 20d6+1d6 cold; Space 100 ft.; Height 200 ft.; Cargo 1,000 tons; Cost —.",
    "description": "A skyberg resembles an iceberg in every way, except that it drifts along on wind currents rather than water currents. Skybergs reach 1,000 or more feet in height. For the specific terrain features of a skyberg, see Skyberg Terrain, page 26."
  },
  {
    "id": "frostburn-coldfire-ship",
    "name": "Coldfire Ship",
    "statLine": "Colossal vehicle; Profession (sailor) +4; Spd ice 80 ft. (good); Overall AC –3; Section hp 50 (hardness 5); Section AC 3; Ram 12d6; Space 80 ft.; Height 20 ft.; Crew 10; Cargo 200 tons; Cost 500,000 gp.",
    "description": "This magic ship has an ice keel and a coldfire engine, enabling it to move through ice at a speed of 80 feet. Planar sails stored belowdecks allow the ship to travel to the Elemental Planes or other frigid plane or layer where ice dominates the landscape (for more information on planar sails, see Chapter 3: Vehicles in the Arms and Equipment Guide). The ship has two ballistae mounted on rotating platforms, each of which can fire one 5d6 lightning bolt per round."
  }
];

/** Tabela 4-4: impedimento de veículos com rodas na neve, por profundidade e tamanho. */
export const DND35_FROSTBURN_SNOW_IMPEDIMENT = {
  rows: [
  {
    "snowDepth": "Up to 6 inches",
    "small": "None",
    "medium": "None",
    "large": "None"
  },
  {
    "snowDepth": "7–12 inches",
    "small": "Minor",
    "medium": "None",
    "large": "None"
  },
  {
    "snowDepth": "13–24 inches",
    "small": "Major",
    "medium": "Minor",
    "large": "None"
  },
  {
    "snowDepth": "25–36 inches",
    "small": "Major",
    "medium": "Major",
    "large": "Minor"
  },
  {
    "snowDepth": "37–60 inches",
    "small": "Total",
    "medium": "Major",
    "large": "Minor"
  },
  {
    "snowDepth": "61+ inches",
    "small": "Total",
    "medium": "Total",
    "large": "Major"
  }
],
  legend: {
    Minor: "The vehicle must pay 2 squares of movement to enter each square of snow.",
    Major: "The vehicle must pay 4 squares of movement to enter each square of snow.",
    Total: "The vehicle can only move 1 square per round, regardless of its normal speed.",
  },
} as const;
