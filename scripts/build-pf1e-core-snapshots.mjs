import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PF1E_CLASSES } from "../src/data/pf1e/pf1eClasses.ts";
import { PF1E_RACES } from "../src/data/pf1e/pf1eRaces.ts";
import { PF1E_SKILLS } from "../src/data/pf1e/pf1eSkills.ts";
import { PF1E_AMMUNITION, PF1E_WEAPON_GROUPS } from "../src/data/pf1e/pf1eWeapons.ts";
import { PF1E_ARMORS, PF1E_ARMOR_ACCESSORIES, PF1E_SHIELDS } from "../src/data/pf1e/pf1eArmor.ts";
import { PF1E_EQUIPMENT } from "../src/data/pf1e/pf1eEquipment.ts";

const outputDirectory = resolve("src/data/catalog/snapshots/pf1e/legacy_pf1");
const sourceBook = "Pathfinder RPG — Livro Básico";
const scope = { system_id: "pf1e", ruleset: "legacy_pf1", rarity: "common" };
const armorSizeAdjustments = {
  table: "6-8",
  sourcePage: 153,
  humanoid: {
    "miúdo-ou-menor": { cost: 0.5, weight: 0.1 },
    pequeno: { cost: 1, weight: 0.5 },
    médio: { cost: 1, weight: 1 },
    grande: { cost: 2, weight: 2 },
    enorme: { cost: 4, weight: 5 },
    imenso: { cost: 8, weight: 8 },
    colossal: { cost: 16, weight: 12 },
  },
  nonHumanoid: {
    "miúdo-ou-menor": { cost: 1, weight: 0.1 },
    pequeno: { cost: 2, weight: 0.5 },
    médio: { cost: 2, weight: 1 },
    grande: { cost: 4, weight: 2 },
    enorme: { cost: 8, weight: 5 },
    imenso: { cost: 16, weight: 8 },
    colossal: { cost: 32, weight: 12 },
  },
  tinyOrSmallerArmorBonusMultiplier: 0.5,
};
const statNames = { str: "For", dex: "Des", con: "Con", int: "Int", wis: "Sab", cha: "Car" };
const saveNames = { fort: "Fortitude", ref: "Reflexos", will: "Vontade" };

const ancestries = Object.values(PF1E_RACES).map((race) => {
  const modifiers = Object.entries(race.statModifiers)
    .map(([ability, value]) => `${statNames[ability]} ${value > 0 ? "+" : ""}${value}`);
  const description = [
    race.description,
    `Tamanho ${race.size.toLowerCase()}, deslocamento ${race.baseSpeed} m.`,
    modifiers.length ? `Atributos: ${modifiers.join(", ")}.` : "",
    race.freeStatBonus ? "Escolhe livremente um bônus racial de +2 em atributo." : "",
    `Idiomas: ${[...race.languages, ...race.bonusLanguages].join(", ")}.`,
  ].filter(Boolean).join(" ");

  return {
    id: `pf1e.ancestry.${race.id}`,
    ...scope,
    name_pt: race.name,
    name_en: race.nameEn,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    size: race.size,
    source_book: race.sourceBook || sourceBook,
    source_page: race.sourcePage,
    traits: race.traits,
    data: {
      ...race,
      names: { "pt-BR": race.name, en: race.nameEn },
      summaries: { "pt-BR": description },
      baseSpeedMeters: race.baseSpeed,
      ruleset: "legacy_pf1",
    },
  };
});

const classes = Object.values(PF1E_CLASSES).map((klass) => {
  const description = [
    `Dado de Vida d${klass.hitDie}.`,
    `Bônus base de ataque: ${klass.babProgression}.`,
    `Testes de resistência bons: ${klass.goodSaves.map((save) => saveNames[save]).join(", ") || "nenhum"}.`,
    `Pontos de perícia por nível: ${klass.skillPointsPerLevel}.`,
    `Riqueza inicial: ${klass.startingWealth.diceCount}d${klass.startingWealth.dieSides} × ${klass.startingWealth.multiplierGp} PO (valor médio ${klass.startingWealth.averageGp} PO).`,
    `Perícias de classe: ${klass.classSkills.join(", ")}.`,
    klass.description,
  ].join(" ");

  return {
    id: `pf1e.class.${klass.id}`,
    ...scope,
    name_pt: klass.name,
    name_en: klass.nameEn,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    hp_per_level: klass.hitDie,
    source_book: klass.sourceBook || sourceBook,
    source_page: klass.sourcePageStart,
    traits: [],
    data: {
      ...klass,
      names: { "pt-BR": klass.name, en: klass.nameEn },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const skills = Object.values(PF1E_SKILLS).map((skill) => {
  const description = [
    `Habilidade-chave: ${skill.keyAbility.toUpperCase()}.`,
    skill.trainedOnly ? "Exige treinamento." : "Pode ser usada sem treinamento.",
    skill.armorCheckPenalty ? "Aplica penalidade de armadura." : "Não aplica penalidade de armadura.",
    skill.description,
  ].join(" ");

  return {
    id: `pf1e.skill.${skill.id}`,
    ...scope,
    name_pt: skill.name,
    name_en: skill.nameEn,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    key_ability: skill.keyAbility,
    skill_type: "skill",
    source_book: skill.sourceBook || sourceBook,
    source_page: skill.sourcePage,
    traits: [],
    data: {
      ...skill,
      names: { "pt-BR": skill.name, en: skill.nameEn },
      summaries: { "pt-BR": description },
      skillAbility: skill.keyAbility,
      usableUntrained: !skill.trainedOnly,
      ruleset: "legacy_pf1",
    },
  };
});

const weapons = PF1E_WEAPON_GROUPS.flatMap((group) => group.records.map((weapon, index) => {
  const [name, damageSmall, damageMedium, critical, damageType, weightKg, priceGp, priceLabel, rangeMeters, special] = weapon;
  const slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const description = `${group.proficiency === "simple" ? "Simples" : group.proficiency === "martial" ? "Marciais" : "Exóticas"} — ${group.group}. Dano (Pequeno/Médio): ${damageSmall}/${damageMedium}; crítico ${critical}; tipo ${damageType}; ${special}.`;
  return {
    id: `pf1e.weapon.${slug}`,
    ...scope,
    name_pt: name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    weapon_category: group.proficiency,
    weapon_group: group.group,
    damage_dice: damageMedium,
    damage_type: damageType,
    hands: group.grip === "two_hands" ? 2 : group.grip === "unarmed" || group.grip === "light" || group.grip === "one_hand" ? 1 : null,
    price_gp: priceGp,
    traits: [group.proficiency, group.grip],
    source_book: sourceBook,
    source_page: group.sourcePage,
    data: {
      proficiency: group.proficiency,
      weaponGroup: group.group,
      grip: group.grip,
      damageSmall,
      damageMedium,
      critical,
      damageType,
      weightKg,
      priceLabel,
      rangeMeters,
      special,
      table: "6-4",
      summaryOnly: true,
      names: { "pt-BR": name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
      sourceIndex: index,
    },
  };
}));

const ammunitionItems = PF1E_AMMUNITION.map((ammunition) => {
  const description = `Munição para ${ammunition.forWeapon}. Quantidade: ${ammunition.quantity}; custo: ${ammunition.costLabel}.${ammunition.notes ? ` ${ammunition.notes}` : ""}`;
  return {
    id: `pf1e.item.${ammunition.id}`,
    ...scope,
    name_pt: ammunition.name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    item_category: "munição",
    price_gp: ammunition.costGp,
    traits: ["munição"],
    source_book: sourceBook,
    source_page: ammunition.sourcePage,
    data: {
      quantity: ammunition.quantity,
      costLabel: ammunition.costLabel,
      weightKg: ammunition.weightKg,
      compatibleWeapon: ammunition.forWeapon,
      table: "6-4",
      summaryOnly: true,
      names: { "pt-BR": ammunition.name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const armors = PF1E_ARMORS.map((armor) => {
  const categoryName = armor.category === "light" ? "leve" : armor.category === "medium" ? "média" : "pesada";
  const donningTimes = {
    light: { don: "1 minuto", donQuick: "5 rodadas", remove: "1 minuto" },
    medium: { don: "4 minutos", donQuick: "1 minuto", remove: "1 minuto" },
    battle: { don: "4 minutos", donQuick: "4 minutos", remove: "1d4+1 minutos" },
  }[armor.donningGroup];
  const description = `Armadura ${categoryName}. Bônus de armadura +${armor.acBonus}; bônus máximo de Destreza +${armor.maxDexBonus}; penalidade de armadura ${armor.armorCheckPenalty}; falha de magia arcana ${armor.arcaneSpellFailure}%; deslocamento ${armor.speed9m} m (base 9 m) ou ${armor.speed6m} m (base 6 m); peso ${armor.weightKg} kg.`;
  return {
    id: `pf1e.armor.${armor.id}`,
    ...scope,
    name_pt: armor.name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    armor_category: categoryName,
    ac_bonus: armor.acBonus,
    dex_cap: armor.maxDexBonus,
    check_penalty: armor.armorCheckPenalty,
    price_gp: armor.costGp,
    traits: [armor.category],
    source_book: sourceBook,
    source_page: 150,
    data: {
      maxDexBonus: armor.maxDexBonus,
      armorCheckPenalty: armor.armorCheckPenalty,
      arcaneSpellFailure: armor.arcaneSpellFailure,
      speed9m: armor.speed9m,
      speed6m: armor.speed6m,
      weightKg: armor.weightKg,
      donningGroup: armor.donningGroup,
      donningTimes,
      assistedDonningRule: "Com auxílio, reduza o tempo à metade; um ajudante pode auxiliar dois personagens adjacentes e personagens não podem ajudar um ao outro.",
      sizeAdjustments: armorSizeAdjustments,
      table: "6-6",
      donningTable: "6-7",
      donningSourcePage: 153,
      summaryOnly: true,
      names: { "pt-BR": armor.name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const shields = PF1E_SHIELDS.map((shield) => {
  const donningTimes = { don: "1 ação de movimento", donQuick: null, remove: "1 ação de movimento" };
  const description = `Escudo. Bônus de escudo +${shield.acBonus}; penalidade de armadura ${shield.armorCheckPenalty}; falha de magia arcana ${shield.arcaneSpellFailure}%; peso ${shield.weightKg} kg.${shield.maxDexBonus == null ? "" : ` Bônus máximo de Destreza +${shield.maxDexBonus}.`}${shield.special ? ` ${shield.special}.` : ""}`;
  return {
    id: `pf1e.shield.${shield.id}`,
    ...scope,
    name_pt: shield.name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    ac_bonus: shield.acBonus,
    price_gp: shield.costGp,
    traits: ["escudo"],
    source_book: sourceBook,
    source_page: 150,
    data: {
      acBonus: shield.acBonus,
      maxDexBonus: shield.maxDexBonus,
      armorCheckPenalty: shield.armorCheckPenalty,
      arcaneSpellFailure: shield.arcaneSpellFailure,
      weightKg: shield.weightKg,
      donningGroup: shield.donningGroup,
      donningTimes,
      donningSourcePage: 153,
      sizeAdjustments: armorSizeAdjustments,
      special: shield.special,
      table: "6-6",
      donningTable: "6-7",
      summaryOnly: true,
      names: { "pt-BR": shield.name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const accessories = PF1E_ARMOR_ACCESSORIES.map((accessory) => {
  const description = `Acessório de armadura ou escudo. Custo ${accessory.costLabel}; peso ${accessory.weightKg} kg.${accessory.special ? ` ${accessory.special}.` : ""}`;
  return {
    id: `pf1e.item.${accessory.id}`,
    ...scope,
    name_pt: accessory.name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    item_category: "acessório de armadura",
    price_gp: accessory.costGp,
    traits: ["acessório", "armadura"],
    source_book: sourceBook,
    source_page: 150,
    data: {
      costLabel: accessory.costLabel,
      weightKg: accessory.weightKg,
      special: accessory.special,
      table: "6-6",
      summaryOnly: true,
      names: { "pt-BR": accessory.name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const generalEquipment = PF1E_EQUIPMENT.map((item) => {
  const tablePage = item.sourcePage ?? 158;
  const table = item.table ?? "6-9";
  const description = `${item.category[0].toUpperCase()}${item.category.slice(1)}. Custo ${item.costLabel}; peso ${item.weightKg == null ? "não informado na tabela" : `${item.weightKg} kg`}.${item.unit ? ` Unidade: ${item.unit}.` : ""}${item.mechanicsSummary ? ` ${item.mechanicsSummary}` : ""}`;
  return {
    id: `pf1e.item.${item.id}`,
    ...scope,
    name_pt: item.name,
    name_en: null,
    name_es: null,
    description_pt: description,
    description_en: null,
    description_es: null,
    item_category: item.category,
    price_gp: item.costGp,
    traits: [item.category],
    source_book: sourceBook,
    source_page: item.detailsPage ?? tablePage,
    data: {
      costLabel: item.costLabel,
      priceGp: item.costGp,
      weightKg: item.weightKg,
      unit: item.unit,
      costFormula: item.costFormula,
      costMultiplier: item.costMultiplier,
      weightMultiplier: item.weightMultiplier,
      table,
      tableSection: item.category,
      tablePage,
      detailsPage: item.detailsPage,
      mechanicsSummary: item.mechanicsSummary,
      summaryOnly: true,
      names: { "pt-BR": item.name },
      summaries: { "pt-BR": description },
      ruleset: "legacy_pf1",
    },
  };
});

const items = [...ammunitionItems, ...accessories, ...generalEquipment];

await mkdir(outputDirectory, { recursive: true });
for (const [category, records] of Object.entries({ ancestry: ancestries, class: classes, skill: skills, weapon: weapons, armor: armors, shield: shields, item: items })) {
  await writeFile(resolve(outputDirectory, `${category}.json`), `${JSON.stringify(records, null, 2)}\n`);
  console.log(`PF1e ${category}: ${records.length} registros`);
}
