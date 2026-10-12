/**
 * Champions of Ruin (D&D 3.5, Forgotten Realms; scan sem camada de texto), cap. 2, pp. 37-39: magias épicas (regras do Epic Level Handbook).
 * Lidas da imagem em resolução reduzida; cabeçalhos numéricos conferidos em recortes a 380dpi quando possível. Inglês, como no livro.
 * Só dados (sem UI nem Supabase). Livro 3.5: não misturar com 5E.
 * Invariantes impressas usadas nos testes: custo em PO = CD de Spellcraft × 9.000 (ou × 7.000 nas duas magias de CD baixa), XP = PO / 25.
 */
export type CorEpicSpell = {
  id: string;
  name: string;
  school: string;
  spellcraftDC: number;
  components: string;
  castingTime: string;
  range: string;
  target?: string;
  area?: string;
  effect?: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  developmentGp: number;
  developmentDays: number;
  developmentXp: number;
  seeds: { name: string; dc: number }[];
  /** Fatores e fatores atenuantes como impressos (texto livre). */
  factors: string;
  description: string;
  materialComponent?: string;
};

export const COR_EPIC_SPELLS: CorEpicSpell[] = [
  {
    id: "cor-epic-aumvors-fragmented-phylactery",
    name: "Aumvor's fragmented phylactery",
    school: "Transmutation",
    spellcraftDC: 30,
    components: "V, S",
    castingTime: "1 minute",
    range: "Touch",
    target: "One or more objects, including the caster's phylactery",
    duration: "Permanent",
    savingThrow: "None",
    spellResistance: "No",
    developmentGp: 210000,
    developmentDays: 5,
    developmentXp: 8400,
    seeds: [{ name: "transform", dc: 21 }, { name: "ward", dc: 14 }],
    factors: "Mitigating factors: field specialization (-5).",
    description:
      "This spell can only be cast by a lich. It either separates the lich's phylactery into multiple objects or expands the phylactery to include multiple objects, as determined by the spellcaster. The number of such objects can be no greater than the caster's modifier for its spellcasting ability (Charisma for a sorcerer, Intelligence for a wizard). Thereafter, destroying the lich's phylactery requires the destruction of the whole set of objects that comprise the phylactery. As long as at least one such object of the set exists, the caster cannot be permanently killed. This spell can be cast repeatedly on a phylactery or part thereof. Each time it is cast, the number of objects that comprise the lich's phylactery can be increased by an amount equal to the caster's modifier for its spellcasting ability.",
  },
  {
    id: "cor-epic-aumvors-soulshatter",
    name: "Aumvor's soulshatter",
    school: "Necromancy",
    spellcraftDC: 51,
    components: "V, S",
    castingTime: "1 minute",
    range: "300 ft.",
    target: "One living creature",
    duration: "Instantaneous",
    savingThrow: "Fortitude partial",
    spellResistance: "Yes",
    developmentGp: 357000,
    developmentDays: 8,
    developmentXp: 14280,
    seeds: [{ name: "slay", dc: 25 }, { name: "animate dead", dc: 23 }],
    factors: "Factors: creating a ghost (+8). Mitigating factors: seed within specialist school (-5).",
    description:
      "For any one living creature within range, you separate soul from its body. The target is entitled to a DC 51 Fortitude save to survive the attack. If the save is successful, the creature instead takes 3d6+20 points of damage. If the save is failed, the subject's soul is dead and passes on to the afterlife, but the body remains alive. After the successful casting of this spell, the body of the creature can then be possessed (as by a magic jar spell) or dominated (as by a dominate person spell) without resistance (automatic saving throw failure). The body retains the physical characteristics (Strength, Dexterity, Constitution, skills based on those abilities, and extraordinary abilities) of the departed soul but otherwise reflects the abilities and skills of the possessor or dominator. If not possessed or dominated, the body lies dormant—alive, but lacking an animating force. The soul can be returned to the body by means of a raise dead or resurrection spell at any time. The passage of time has no effect on the success of either spell, assuming the body is still alive.",
  },
  {
    id: "cor-epic-bonfire-of-insanity",
    name: "Bonfire of insanity (ritual)",
    school: "Necromancy [Chaotic, Evil, Vile]",
    spellcraftDC: 217,
    components: "V, S, M",
    castingTime: "10 minutes",
    range: "1-mile radius",
    duration: "Instantaneous",
    savingThrow: "Fortitude negates; see text",
    spellResistance: "Yes",
    developmentGp: 1953000,
    developmentDays: 39,
    developmentXp: 78120,
    seeds: [{ name: "animate dead", dc: 23 }, { name: "slay", dc: 25 }],
    // O livro imprime "(-2)" (leitura da imagem); com +2 a soma das CDs fecha em 217, e com -2 não. Mantido como +2.
    factors: "Factors: area effect (+15) to 20-ft. radius (+2), increased 800% (+32), additional 160 HD (+160). Mitigating factors: increase casting time (-20), ghouls (-10), uncontrolled undead (-10).",
    description:
      "A bonfire is built of human bones and burned during a rainstorm while this spell is cast. The smoke from the fire rises up and mingles with the rain clouds, filling them with vile power. As the tainted water rains down and soaks the ground, up to sixty corpses within range rise up as ghouls. Even skeletal remains are affected. The corpses receive no saving throw against the spell's effects, not even if they are buried in consecrated ground. Humanoids (including the spellcasters) of up to 80 HD that are touched by the vile rain must make a Fortitude saving throw or be afflicted with a magical disease that turns them into flesh-starved ghouls within 24 hours. The disease is resistant to all forms of magical healing less powerful than a heal spell. The total Hit Dice worth of undead created from this spell, both from corpses and living creatures, is 180. The spell does not grant the spellcaster any ability to control the undead created by the spell. These undead can be commanded, rebuked, or turned normally.",
    materialComponent: "A bonfire, at least 10 feet in diameter, made out of the remains of at least twenty humanoids. These remains are destroyed by the fire and are unaffected by the vile rain.",
  },
  {
    id: "cor-epic-cataract-of-fire",
    name: "Cataract of fire",
    school: "Evocation [Fire]",
    spellcraftDC: 204,
    components: "V, S, M",
    castingTime: "1 minute",
    range: "0 ft.",
    area: "300-ft.-radius cylinder, 2,000 ft. tall; see text",
    duration: "Instantaneous",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    developmentGp: 1836000,
    developmentDays: 37,
    developmentXp: 73440,
    seeds: [{ name: "energy", dc: 19 }, { name: "destroy", dc: 29 }],
    factors: "Factors: increased damage die (+40), increased damage (+70), cylinder (+2), increase area (+18), maximized (+28). Mitigating factor: personal (-2).",
    description:
      "This spell is similar to the flame strike spell, in that a pillar of magical fire descends upon the target. The difference is the size and destructive power of the spell, and its magical source. A cataract of fire delivers 500 points of damage, equally divided between elemental fire and raw magical energy, to everything within a 300-foot radius centered on the spellcaster, 250 points of damage to everything outside the 300-foot radius but within a 600-foot radius, and 100 points of damage to everything else out to a quarter-mile. The pillar reaches well into the clouds and can be used to harm flying creatures. The nature of the spell grants the spellcaster immunity to the magical damage but not the fire damage. A successful Reflex saving throw halves the damage. The magical energy affects even magical matter, energy fields, and force effects that are normally only affected by a disintegrate spell, such as Bigby's forceful hand, wall of force, globe of invulnerability, and antimagic field. Such effects are automatically destroyed.",
    materialComponent: "A bronze gong, which is struck when the spell is complete. The gong is consumed in the resulting conflagration.",
  },
  {
    id: "cor-epic-diluvial-torrent",
    name: "Diluvial torrent",
    school: "Evocation [Water]",
    spellcraftDC: 204,
    components: "V, S, M",
    castingTime: "1 minute",
    range: "0 ft.",
    area: "20-ft.-radius cylinder of water, 100 ft. tall, drops from a height of 200 ft.; see text",
    duration: "Instantaneous",
    savingThrow: "Reflex half",
    spellResistance: "Yes",
    developmentGp: 1836000,
    developmentDays: 37,
    developmentXp: 73440,
    seeds: [{ name: "energy", dc: 19 }, { name: "destroy", dc: 29 }],
    factors: "Factors: increased damage die (+40), increased damage (+70), cylinder (+2), increase area (+18), maximized (+28). Mitigating factor: personal (-2).",
    description:
      "This spell is similar to the cataract of fire spell, except that a cylinder of magical water drops upon the target area. A diluvial torrent delivers 500 points of damage, equally divided between physical damage and damage from raw magical energy, to everything within a 100-foot radius centered on the spellcaster, 250 points of damage to everything outside the 100-foot radius but within a 300-foot radius, and 100 points of damage to everything else out to 750 feet. The nature of the spell grants the spellcaster immunity to the magical damage but not the physical damage. A successful Reflex saving throw halves the damage. At the DM's discretion, creatures surviving the initial impact of 628,000 cubic feet of water might also be subject to drowning and/or being swept away by the resulting flood.",
    materialComponent: "A silver gong, which is struck when the spell is complete. The gong is consumed in the resulting torrent.",
  },
  {
    id: "cor-epic-horrendous-dessication",
    name: "Horrendous dessication",
    school: "Necromancy",
    spellcraftDC: 118,
    components: "V, S, M",
    castingTime: "1 minute",
    range: "Personal",
    area: "300-ft.-radius/level centered on the spellcaster",
    duration: "Instantaneous",
    savingThrow: "Fortitude half",
    spellResistance: "Yes",
    developmentGp: 1062000,
    developmentDays: 22,
    developmentXp: 42480,
    seeds: [{ name: "transport", dc: 27 }],
    factors: "Factors: interplanar (+4), unwilling target (+4), area effect (+2), increase area (+16), area level dependent (+25), damage/volume level dependent (+25), augment minor magic item x10 (+40). Mitigating factor: loss of limb (-25).",
    description:
      "This spell causes everything within the area to become desiccated—withering plants, mummifying flesh, drying up pools and ponds, and turning lush land to dust. Any living thing, not including the spellcaster, within the area takes 40 points of dessication damage per spellcaster level. The spell also absorbs 1,000 pounds (120 gallons) of water per caster level from any standing or moving body of water. Casting this spell permanently withers one of the spellcaster's limbs.",
    materialComponent: "One application of dust of dryness.",
  },
  {
    id: "cor-epic-necromantic-singularity",
    name: "Necromantic singularity",
    school: "Necromancy [Death]",
    spellcraftDC: 119,
    components: "V, S, M",
    castingTime: "1 minute",
    range: "300 ft.",
    area: "1-mile radius",
    duration: "Instantaneous",
    savingThrow: "No",
    spellResistance: "Yes",
    developmentGp: 1071000,
    developmentDays: 22,
    developmentXp: 42840,
    seeds: [{ name: "slay", dc: 25 }],
    factors: "Factors: increase HD (+96), target to area (+10), area radius (+2), increase area (+36). Mitigating factor: destroy minor artifact (-50).",
    description:
      "This powerful spell brings into being a short-lived conduit between the Material Plane, the magical Weave, and the Negative Energy Plane, allowing undiluted negative energy to spew into the world. The energy instantly slays up to 1,000 HD worth of living creatures. The spell kills creatures one at a time, in order of proximity to the singularity, until all 1,000 HD are accounted for.",
    materialComponent: "A sphere of annihilation. The sphere is destroyed by the spell.",
  },
];
