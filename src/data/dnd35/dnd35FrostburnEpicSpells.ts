/**
 * D&D 3.5 — Frostburn (ed. inglês), Capítulo 5 "Magic of the Frostfell",
 * seção "Epic Spells" (p.106-107). Extração direta da camada de texto do
 * PDF (livro em inglês, sem necessidade de OCR visual). Nomes/campos
 * mantidos em inglês (fonte original), traduzindo apenas o header.
 *
 * COBERTURA COMPLETA: as 5 magias épicas do capítulo (Animus Blast,
 * Animus Blizzard, Coldfire Blast, Dire Winter, Ice Age) — confirmado
 * contra o índice do livro (p.3, "Epic Spells . . . 106") e o fim da
 * seção na p.107 seguida de "Psionics" (p.108).
 */
export type Dnd35FrostburnEpicSpell = {
  id: string;
  name: string;
  school: string;
  descriptors: string[];
  spellcraftDC: number;
  components: string;
  castingTime: string;
  range: string;
  area: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  toDevelop: string;
  seedsAndFactors: string;
  description: string;
  materialComponent?: string;
  xpCost?: string;
  page: number;
};

export const DND35_FROSTBURN_EPIC_SPELLS: Dnd35FrostburnEpicSpell[] = [
  {
    id: "frostburn-epic-spell-animus-blast",
    name: "Animus Blast",
    school: "Evocation",
    descriptors: ["Cold"],
    spellcraftDC: 50,
    components: "V, S",
    castingTime: "1 standard action",
    range: "300 ft.",
    area: "20-ft.-radius hemisphere burst",
    duration: "Instantaneous",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    toDevelop: "450,000 gp; 9 days; 18,000 XP",
    seedsAndFactors:
      "Seeds: energy (DC 19), animate dead (DC 23). Factors: set undead type to skeleton (–12 DC), 1-action casting time (+20 DC).",
    description:
      "When this spell is cast, you can engulf your enemies in a coldball that deals 10d6 points of cold damage to each one. Up to twenty of those victims that perish as a result of the blast are then instantly animated as Medium skeletons. These skeletons serve you indefinitely. You cannot exceed the normal limit for controlling undead through use of this spell, but other means that allow you to exceed the normal limit for controlled undead work just as well with undead created with animus blast.",
    page: 106,
  },
  {
    id: "frostburn-epic-spell-animus-blizzard",
    name: "Animus Blizzard",
    school: "Evocation",
    descriptors: ["Cold"],
    spellcraftDC: 78,
    components: "V, S",
    castingTime: "1 minute",
    range: "300 ft.",
    area: "20-ft.-radius hemisphere burst",
    duration: "Instantaneous",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    toDevelop: "702,000 gp; 15 days; 28,080 XP",
    seedsAndFactors:
      "Seeds: energy (DC 19), animate dead (DC 23). Factors: increase damage to 20d6 (+40 DC), set undead type to wight (–4 DC).",
    description:
      "When this spell is cast, you can engulf your enemies in an unusually powerful burst of cold that deals 20d6 points of cold damage to each one. Up to five victims that perish as a result of the blast are then instantly animated as wights. These five wights serve you indefinitely. You cannot exceed the normal limit for controlling undead through use of this spell, but other means that allow you to exceed the normal limit for controlled undead work just as well with undead created with animus blizzard.",
    page: 106,
  },
  {
    id: "frostburn-epic-spell-coldfire-blast",
    name: "Coldfire Blast",
    school: "Evocation",
    descriptors: ["Cold"],
    spellcraftDC: 93,
    components: "V, S, Coldfire",
    castingTime: "1 standard action",
    range: "300 ft.",
    area: "40-ft.-radius hemisphere burst",
    duration: "Instantaneous",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    toDevelop: "837,000 gp; 17 days; 33,480 XP",
    seedsAndFactors:
      "Seed: energy (emanate 2d6 cold in 10-ft. radius) (DC 19). Factor: 1-action casting time (+20 DC), increase area by 100% (+4 DC), increase damage to 40d6 (+60 DC), coldfire component (–10 DC).",
    description:
      "You blast all creatures in the spell's area with unusually intense cold, dealing 40d6 points of frostburn damage to each one.",
    materialComponent: "10 ounces of coldfire.",
    page: 106,
  },
  {
    id: "frostburn-epic-spell-dire-winter",
    name: "Dire Winter",
    school: "Evocation",
    descriptors: ["Cold"],
    spellcraftDC: 319,
    components: "V, S, XP",
    castingTime: "1 minute",
    range: "1,000 ft.",
    area: "1,000-ft.-radius emanation",
    duration: "20 hours",
    savingThrow: "None",
    spellResistance: "No",
    toDevelop: "2,871,000 gp; 58 days; 114,840 XP",
    seedsAndFactors:
      "Seed: energy (emanate 2d6 cold in 10-ft. radius) (DC 19). Factor: 100 times increase in base area (+400 DC). Mitigating factor: burn 10,000 XP (–100 DC).",
    description:
      "You summon winter. The creature or object you target emanates bitter cold to a radius of 1,000 feet for 20 hours. The emanated cold deals 2d6 points of cold damage per round against unprotected creatures (the target is susceptible if not magically protected or otherwise resistant to the energy). The intense cold freezes water out of the air, causing constant snowfall and wind. The snow and wind produce a blizzard effect within the area.",
    xpCost: "10,000 XP",
    page: 106,
  },
  {
    id: "frostburn-epic-spell-ice-age",
    name: "Ice Age",
    school: "Transmutation",
    descriptors: ["Cold"],
    spellcraftDC: 323,
    components: "V, S",
    castingTime: "1 minute",
    range: "0 ft.",
    area: "20-mile-radius emanation",
    duration: "Permanent",
    savingThrow: "None",
    spellResistance: "No",
    toDevelop: "2,907,000 gp; 59 days; 116,280 XP",
    seedsAndFactors:
      "Seed: transform (DC 21). Factor: change target to area (+2 DC), 100 times increase in base area (+400 DC). Mitigating factor: burn 10,000 XP (–100 DC).",
    description:
      "You summon an ice age. A massive glacier fills a 20-mile-radius area, covering the surface (land, water, and so forth). The temperature drops by 100 degrees (or to 0° F, whichever results in the lower temperature). All water in the air instantly freezes, creating a blizzard that lasts until ice age is dispelled. This can only be done with a superb dispelling spell (see page 87 of the Epic Level Handbook).",
    xpCost: "10,000 XP",
    page: 107,
  },
];
