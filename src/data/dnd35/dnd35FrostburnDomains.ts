// ============================================================================
// D&D 3.5 — Frostburn: domínios de clérigo Cold e Winter (p. 84-85, inglês)
// Texto como impresso. "frostburnSpell": magia nova do livro (marcada com *).
// Fimbulwinter traz o sobrescrito X (custo em XP).
// ============================================================================

export interface Dnd35SupplementDomainSpell {
  level: number;
  name: string;
  summary: string;
  /** Marcada com * no livro: magia nova descrita no capítulo 5. */
  frostburnSpell: boolean;
  /** Sobrescritos de componente impressos (X = custo em XP). */
  flags?: string[];
}

export interface Dnd35SupplementDomain {
  id: string;
  name: string;
  sourceBook: "Frostburn";
  sourcePages: string;
  deities: string[];
  grantedPower: string;
  spells: Dnd35SupplementDomainSpell[];
}

export const DND35_FROSTBURN_DOMAINS: Dnd35SupplementDomain[] = [
  {
    id: "frostburn-cold",
    name: "Cold",
    sourceBook: "Frostburn",
    sourcePages: "84-85",
    deities: ["Auril", "Iborighu", "Levistus", "Telchur", "Thrym", "Ulutiu"],
    grantedPower: "You can turn or destroy fire creatures as a good cleric turns undead. You can also rebuke or command cold creatures as an evil cleric rebukes undead.",
    spells: [
      { level: 1, name: "Chill Touch", summary: "One touch/level deals 1d6 damage and possibly 1 Str damage.", frostburnSpell: false },
      { level: 2, name: "Chill Metal", summary: "Cold metal damages those who touch it.", frostburnSpell: false },
      { level: 3, name: "Sleet Storm", summary: "Hampers vision and movement.", frostburnSpell: false },
      { level: 4, name: "Ice Storm", summary: "Hail deals 5d6 damage in cylinder 40 ft. across.", frostburnSpell: false },
      { level: 5, name: "Wall of Ice", summary: "Ice plane creates wall with 15 hp +1/level, or hemisphere can trap creatures inside.", frostburnSpell: false },
      { level: 6, name: "Cone of Cold", summary: "1d6/level cold damage.", frostburnSpell: false },
      { level: 7, name: "Control Weather", summary: "Changes weather in local area.", frostburnSpell: false },
      { level: 8, name: "Polar Ray", summary: "Ranged touch attack deals 1d6/level cold damage.", frostburnSpell: false },
      { level: 9, name: "Obedient Avalanche", summary: "Snowy avalanche crushes and buries your foes.", frostburnSpell: true },
    ],
  },
  {
    id: "frostburn-winter",
    name: "Winter",
    sourceBook: "Frostburn",
    sourcePages: "85",
    deities: ["Aengrist", "Auril", "Hleid", "Telchur"],
    grantedPower: "During the winter season, you gain a +2 sacred bonus on all Wisdom-based skill checks.",
    spells: [
      { level: 1, name: "Snowsight", summary: "Normal vision in winter weather conditions.", frostburnSpell: true },
      { level: 2, name: "Snow Walk", summary: "Increase your speed and walk effortlessly on top of snow without leaving tracks or scent.", frostburnSpell: true },
      { level: 3, name: "Winter’s Embrace", summary: "Subject takes 1d8 damage/round; can cause fatigue.", frostburnSpell: true },
      { level: 4, name: "Ice Storm", summary: "Hail deals 5d6 damage in cylinder 40 ft. across.", frostburnSpell: false },
      { level: 5, name: "Blizzard", summary: "Temperature drops and powerful blizzard reduces visibility to zero.", frostburnSpell: true },
      { level: 6, name: "Death Hail", summary: "Summons a storm of death hail.", frostburnSpell: true },
      { level: 7, name: "Control Weather", summary: "Changes weather in local area.", frostburnSpell: false },
      { level: 8, name: "Summon Giants (Frost Giants Only)", summary: "Summons outsider giants to fight for you.", frostburnSpell: true },
      { level: 9, name: "Fimbulwinter", summary: "Creates winter weather for miles around you that lasts for months.", frostburnSpell: true, flags: ["X"] },
    ],
  },
];
