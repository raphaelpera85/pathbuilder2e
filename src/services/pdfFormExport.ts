import { PDFDocument } from "pdf-lib";

declare const PF2E_ENGINE: any;

export interface CharacterDocument {
  id?: string;
  name?: string;
  playerName?: string;
  ancestry?: string;
  heritage?: string;
  background?: string;
  class?: string;
  subclass?: string;
  level?: number;
  size?: string;
  deity?: string;
  alignment?: string;
  languages?: string[];
  xp?: number;
  heroPoints?: number;
  currentHp?: number;
  tempHp?: number;
  shieldHp?: number;
  shieldRaised?: boolean;
  shieldBonus?: number;
  wounded?: number;
  conditions?: string[];
  resistances?: string[];
  armorProficiencies?: Record<string, string>;
  savingThrows?: Record<string, string>;
  perceptionRank?: string;
  specialMovements?: string;
  skills?: Record<string, string>;
  loreSkills?: Array<{ name: string; rank?: string }>;
  itemBonuses?: Record<string, number>;
  weapons?: any[];
  feats?: {
    ancestry?: string[];
    background?: string;
    class?: string[];
    skill?: string[];
    general?: string[];
  };
  classFeatures?: string[];
  inventory?: Array<{ name: string; qty?: number; bulk?: string | number; isHeld?: boolean; isConsumable?: boolean }>;
  coins?: { cp?: number; sp?: number; gp?: number; pp?: number };
  age?: string | number;
  gender?: string;
  pronouns?: string;
  height?: string;
  weight?: string;
  ethnicity?: string;
  nationality?: string;
  appearance?: string;
  backstory?: string;
  biography?: string;
  edicts?: string;
  anathema?: string;
  magicalTradition?: string;
  spells?: Array<{ name: string; rank?: number; actions?: string }>;
  focusSpells?: Array<{ name: string; actions?: string }>;
  spellSlotsUsed?: Record<number, number>;
}

export async function fillCharacterPdfForm(
  character: CharacterDocument,
  pdfTemplateBytes: Uint8Array | ArrayBuffer
): Promise<Uint8Array> {
  const engine = typeof PF2E_ENGINE !== "undefined" ? PF2E_ENGINE : (globalThis as any).PF2E_ENGINE;
  
  const getProfBonus = (rank: string | undefined, lvl: number): number => {
    if (engine && typeof engine.getProficiencyBonus === "function") {
      return engine.getProficiencyBonus(rank, lvl);
    }
    const r = String(rank || "").toLowerCase();
    if (r.includes("lendário") || r.includes("legendary")) return lvl + 8;
    if (r.includes("mestre") || r.includes("master")) return lvl + 6;
    if (r.includes("especialista") || r.includes("expert")) return lvl + 4;
    if (r.includes("treinado") || r.includes("trained")) return lvl + 2;
    return 0;
  };

  const calc = engine && typeof engine.calculateCharacterStats === "function"
    ? engine.calculateCharacterStats(character as any)
    : {
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        mods: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
        ac: 10,
        maxHp: 10,
        speed: 25,
        saves: {
          fortitude: { total: 0, rank: "Treinado", item: 0 },
          reflex: { total: 0, rank: "Treinado", item: 0 },
          will: { total: 0, rank: "Treinado", item: 0 }
        },
        perception: { total: 0, rank: "Treinado" },
        skills: {},
        strikes: []
      };

  // Utiliza o módulo PF2E_PDF_FILLER ou implementação nativa pdf-lib
  const pdfDoc = await PDFDocument.load(pdfTemplateBytes);
  const form = pdfDoc.getForm();

  const cleanPdfText = (str: string | number | undefined | null) => {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/◆◆◆/g, "[3 Acoes]")
      .replace(/◆◆/g, "[2 Acoes]")
      .replace(/◆/g, "[1 Acao]")
      .replace(/↺/g, "[Reacao]")
      .replace(/◇/g, "[Livre]")
      .replace(/·/g, "-")
      .replace(/[^\x00-\x7F\xA0-\xFF]/g, "");
  };

  const setTxt = (fieldName: string, val: string | number | undefined | null) => {
    if (val === undefined || val === null) return;
    try {
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(cleanPdfText(val));
      }
    } catch {
      // Campo não existe ou não é textfield
    }
  };

  const setChk = (fieldName: string, checked: boolean) => {
    try {
      const field = form.getCheckBox(fieldName);
      if (field) {
        if (checked) field.check();
        else field.uncheck();
      }
    } catch {
      // Campo não existe ou não é checkbox
    }
  };

  const formatMod = (num: number | undefined | null) => {
    const n = Number(num || 0);
    return n >= 0 ? `+${n}` : `${n}`;
  };

  // 1. Cabeçalho
  setTxt("Character Name", character.name || "Sem Nome");
  setTxt("Player Name", character.playerName || "");
  setTxt("Ancestry", character.ancestry || "");
  const traitsStr = Array.isArray((character as any).traits) ? (character as any).traits.join(", ") : "";
  const heritageTraits = [character.heritage, traitsStr].filter(Boolean).join(" · ");
  setTxt("Heritage and Traits", heritageTraits);
  setTxt("Background", character.background || "");
  const fullClass = [character.class, character.subclass].filter(Boolean).join(" - ");
  setTxt("Class", fullClass);
  setTxt("LEVEL", String(character.level || 1));
  setTxt("Size", character.size || "Médio");
  setTxt("Deity or Philosophy", character.deity || "");
  setTxt("Attitude", character.alignment || "Neutro");
  setTxt("LANGUAGES", Array.isArray(character.languages) ? character.languages.join(", ") : "Comum");
  setTxt("EXPERIENCE POINTS", String(character.xp || 0));

  const heroPoints = Number(character.heroPoints || 1);
  setChk("HERO POINT 1", heroPoints >= 1);
  setChk("HERO POINT 2", heroPoints >= 2);
  setChk("HERO POINT 3", heroPoints >= 3);

  // 2. Atributos
  const scores = calc.scores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const mods = calc.mods || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  setTxt("STRENGTH STAT", scores.str);
  setTxt("DEXTERITY STAT", scores.dex);
  setTxt("CONSTITUTION STAT", scores.con);
  setTxt("INTELLIGENCE STAT", scores.int);
  setTxt("WISDOM STAT", scores.wis);
  setTxt("CHARISMA STAT", scores.cha);

  setTxt("STRENGTH", formatMod(mods.str));
  setTxt("DEXTERITY", formatMod(mods.dex));
  setTxt("CONSTITUTION", formatMod(mods.con));
  setTxt("INTELLIGENCE", formatMod(mods.int));
  setTxt("WISDOM", formatMod(mods.wis));
  setTxt("CHARISMA", formatMod(mods.cha));

  // 3. CA, HP, Defesas
  const level = Number(character.level || 1);
  const equippedArmor = calc.equippedArmor || { name: "Roupas de Explorador", category: "Sem Armadura", acBonus: 0 };
  setTxt("AC", calc.ac || 10);
  setTxt("AC CALCULATION 1 DEXTERITY", formatMod(mods.dex));
  const armorRank = character.armorProficiencies?.[equippedArmor.category] || "Treinado";
  const armorProfBonus = getProfBonus(armorRank, level);
  setTxt("AC CALCULATION 2 PROFICIENCY", armorProfBonus);
  setTxt("AC CALCULATION 3 ITEM", equippedArmor.acBonus || 0);
  setTxt("SHIELD", character.shieldRaised ? (character.shieldBonus || 2) : 0);

  const setProfChecks = (prefix: string, rank: string | undefined) => {
    const r = String(rank || "").toLowerCase();
    setChk(`${prefix} TRAINED`, r.includes("treinado") || r.includes("trained") || r.includes("especialista") || r.includes("expert") || r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary"));
    setChk(`${prefix} EXPERT`, r.includes("especialista") || r.includes("expert") || r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary"));
    setChk(`${prefix} MASTER`, r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary"));
    setChk(`${prefix} LEGENDARY`, r.includes("lendário") || r.includes("legendary"));
  };

  setProfChecks("UNARMORED", character.armorProficiencies?.["Sem Armadura"] || "Treinado");
  setProfChecks("LIGHT", character.armorProficiencies?.["Leve"] || "Destreinado");
  setProfChecks("MEDIUM", character.armorProficiencies?.["Média"] || "Destreinado");
  setProfChecks("HEAVY", character.armorProficiencies?.["Pesada"] || "Destreinado");

  setTxt("MAX HP", calc.maxHp || 10);
  setTxt("MAXIMUM HIT POINTS", calc.maxHp || 10);
  setTxt("HP", character.currentHp !== undefined ? character.currentHp : calc.maxHp);
  setTxt("Current HP", character.currentHp !== undefined ? character.currentHp : calc.maxHp);
  setTxt("Temporary HP", character.tempHp || 0);
  setTxt("WOUNDED", character.wounded || 0);
  setTxt("CONDITIONS", Array.isArray(character.conditions) ? character.conditions.join(", ") : "");
  setTxt("RESISTANCE AND IMMUNITIES", Array.isArray(character.resistances) ? character.resistances.join(", ") : "");

  // 4. Salvaguardas
  const saves = calc.saves;
  setTxt("FORTITUDE", formatMod(saves.fortitude.total));
  setTxt("FORTITUDE ITEM", saves.fortitude.item || 0);
  setProfChecks("FORTITUDE", saves.fortitude.rank);

  setTxt("REFLEX", formatMod(saves.reflex.total));
  setProfChecks("REFLEX", saves.reflex.rank);

  setTxt("WILL", formatMod(saves.will.total));
  setTxt("WILL ITEM", saves.will.item || 0);
  setProfChecks("WILL", saves.will.rank);

  // 5. Percepção & Deslocamento
  setTxt("PERCEPTION", formatMod(calc.perception.total));
  setTxt("PERCEPTION WISDOM", formatMod(mods.wis));
  const percProf = getProfBonus(character.perceptionRank || "Treinado", level);
  setTxt("PERCEPTION PROFICIENCY", percProf);
  setTxt("PERCEPTION ITEM", character.itemBonuses?.perception || 0);
  setProfChecks("PERCEPTION", character.perceptionRank || "Treinado");

  setTxt("SPEED", `${calc.speed || 25} pés`);
  setTxt("SPECIAL MOVEMENT", character.specialMovements || "");

  // 6. Perícias (16)
  const skillsMap: Record<string, { name: string; attr: string }> = {
    acrobatics: { name: "ACROBATICS", attr: "DEXTERITY" },
    arcana: { name: "ARCANA", attr: "INTELLIGENCE" },
    athletics: { name: "ATHLETICS", attr: "STRENGTH" },
    crafting: { name: "CRAFTING", attr: "INTELLIGENCE" },
    deception: { name: "DECEPTION", attr: "CHARISMA" },
    diplomacy: { name: "DIPLOMACY", attr: "CHARISMA" },
    intimidation: { name: "INTIMIDATION", attr: "CHARISMA" },
    medicine: { name: "MEDICINE", attr: "WISDOM" },
    nature: { name: "NATURE", attr: "WISDOM" },
    occultism: { name: "OCCULTISM", attr: "INTELLIGENCE" },
    performance: { name: "PERFORMANCE", attr: "CHARISMA" },
    religion: { name: "RELIGION", attr: "WISDOM" },
    society: { name: "SOCIETY", attr: "INTELLIGENCE" },
    stealth: { name: "STEALTH", attr: "DEXTERITY" },
    survival: { name: "SURVIVAL", attr: "WISDOM" },
    thievery: { name: "THIEVERY", attr: "DEXTERITY" }
  };

  for (const [skKey, meta] of Object.entries(skillsMap)) {
    const sk = calc.skills[skKey] || { total: 0, rank: "Destreinado", profBonus: 0, itemBonus: 0 };
    setTxt(meta.name, formatMod(sk.total));
    setTxt(`${meta.name} PROFICIENCY`, sk.profBonus || 0);
    setTxt(`${meta.name} ITEM`, sk.itemBonus || 0);
    setProfChecks(meta.name, sk.rank);
  }

  // Lores
  const loreSkills = character.loreSkills || [];
  if (loreSkills[0]) {
    setTxt("LORE CATAGORY 1", loreSkills[0].name || "Saber");
    const l1Prof = getProfBonus(loreSkills[0].rank || "Treinado", level);
    setTxt("LORE1", formatMod(mods.int + l1Prof));
    setTxt("LORE 1 INTELLIGENCE", formatMod(mods.int));
    setTxt("LORE 1 PFOCIENCY", l1Prof);
    setProfChecks("LORE1", loreSkills[0].rank || "Treinado");
  }
  if (loreSkills[1]) {
    setTxt("LORE CATEGORY 2", loreSkills[1].name || "Saber");
    const l2Prof = getProfBonus(loreSkills[1].rank || "Treinado", level);
    setTxt("LORE2", formatMod(mods.int + l2Prof));
    setTxt("LORE CATEGORY 2 ITENLLIGENCE", formatMod(mods.int));
    setTxt("LORE 2 PROFICIENCY", l2Prof);
    setProfChecks("LORE2", loreSkills[1].rank || "Treinado");
  }

  // 7. Golpes
  const strikes = calc.strikes || [];
  const meleeStrikes = strikes.filter((s: any) => !s.isRanged);
  const rangedStrikes = strikes.filter((s: any) => s.isRanged);

  meleeStrikes.slice(0, 3).forEach((st: any, idx: number) => {
    const n = idx + 1;
    setTxt(`MELEE STRIKE ${n}`, st.name);
    setTxt(`MELEE STRIKE ${n} ATTACK BONUS`, formatMod(st.totalAttack));
    setTxt(`MELEE STRIKE ${n} STRENGTH`, formatMod(mods.str));
    setTxt(`MELEE STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType}`);
    setTxt(`MELEE STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
  });

  rangedStrikes.slice(0, 2).forEach((st: any, idx: number) => {
    const n = idx + 4;
    setTxt(`RANGED STRIKE ${n}`, st.name);
    setTxt(`RANGED STRIKE ${n} ATTACK BONUS`, formatMod(st.totalAttack));
    setTxt(`RANGED STRIKE ${n} DEXTERITY`, formatMod(mods.dex));
    setTxt(`RANGED STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType}`);
    setTxt(`RANGED STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
  });

  // 8. Talentos
  setTxt("ANCESTRY FEAT", Array.isArray(character.feats?.ancestry) ? character.feats.ancestry.join(", ") : "");
  setTxt("BACKGROUND SKILL FEAT", character.feats?.background || "");
  setTxt("CLASS FEATS & FEATURES", Array.isArray(character.classFeatures) ? character.classFeatures.join("\n") : "");

  (character.feats?.class || []).slice(0, 20).forEach((f: string, idx: number) => {
    setTxt(`CLASS FEAT ${idx + 1}-1`, f);
  });
  (character.feats?.skill || []).slice(0, 20).forEach((f: string, idx: number) => {
    setTxt(`SKILL FEAT ${idx + 2}-1`, f);
  });

  // 9. Inventário & Moedas
  const inventory = Array.isArray(character.inventory) ? character.inventory : [];
  const wornItems = inventory.filter(i => !i.isHeld && !i.isConsumable);
  const heldItems = inventory.filter(i => i.isHeld);
  const consumableItems = inventory.filter(i => i.isConsumable);

  wornItems.slice(0, 19).forEach((item, idx) => {
    const n = idx + 1;
    setTxt(`WORN ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`);
    setTxt(`WORN BULK ${n}`, item.bulk || "—");
  });
  heldItems.slice(0, 11).forEach((item, idx) => {
    const n = idx + 1;
    const text = `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`;
    if (n === 1) setTxt("HELD1", text);
    setTxt(`HELD ${n}`, text);
    setTxt(`HELD BULK ${n}`, item.bulk || "—");
  });
  consumableItems.slice(0, 11).forEach((item, idx) => {
    const n = idx + 1;
    setTxt(`CONSUMABLES ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`);
    setTxt(`CONSUMABLES BULK ${n}`, item.bulk || "—");
  });

  setTxt("BULK TOTAL", calc.bulk?.current || 0);

  const coins = character.coins || { cp: 0, sp: 0, gp: 15, pp: 0 };
  setTxt("COPPER", coins.cp || 0);
  setTxt("SILVER", coins.sp || 0);
  setTxt("GOLD", coins.gp || 0);
  setTxt("PLATINUM", coins.pp || 0);

  // 10. Identidade & Biografia
  setTxt("AGE", character.age || "");
  setTxt("GENDER & PRONOUNS", [character.gender, character.pronouns].filter(Boolean).join(" / "));
  setTxt("HEIGHT", character.height || "");
  setTxt("WEIGHT", character.weight || "");
  setTxt("ETHNICITY", character.ethnicity || "");
  setTxt("NATIONALITY", character.nationality || "");
  setTxt("Appearance", character.appearance || "");
  setTxt("Notes", character.backstory || character.biography || "");
  setTxt("Edicts", character.edicts || "");
  setTxt("Anathema", character.anathema || "");

  // 11. Grimório & Magias
  setTxt("Magical Tradition", character.magicalTradition || "Arcana");
  setTxt("SPELL ATTACK", formatMod(calc.classDc ? calc.classDc - 10 : 9));
  setTxt("SPELL SAVE DC", calc.classDc || 19);

  const spellSlots = (engine && typeof engine.getSpellSlots === "function")
    ? engine.getSpellSlots(character as any)
    : null;
  const slotsObj = (spellSlots && spellSlots.slots) ? spellSlots.slots : {};
  for (let r = 1; r <= 10; r++) {
    const slotsCount = slotsObj[r] || 0;
    if (slotsCount > 0) {
      setTxt(`SPELLS PER DAY ${r}`, slotsCount);
      setTxt(`SPELLS REMAINING ${r}`, slotsCount);
    }
  }

  (character.spells || []).slice(0, 35).forEach((sp, idx) => {
    const n = idx + 1;
    setTxt(`SPELL ${n}`, sp.name);
    setTxt(`SPELL RANK ${n}`, sp.rank || 0);
    setTxt(`SPELL ACTION ${n}`, sp.actions || "◆◆");
    setTxt(`SPELL PREPARED ${n}`, "Sim");
  });

  (character.focusSpells || []).slice(0, 8).forEach((fsp, idx) => {
    const n = idx + 1;
    setTxt(`FOCUS SPELL ${n}`, fsp.name);
    setTxt(`FOCUS SPELL ACTIONS ${n}`, fsp.actions || "◆");
  });

  return await pdfDoc.save();
}
