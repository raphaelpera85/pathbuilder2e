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
  shieldMaxHp?: number;
  shieldHardness?: number;
  shieldBt?: number;
  shieldRaised?: boolean;
  shieldBonus?: number;
  wounded?: number;
  conditions?: string[];
  resistances?: string[];
  defenseNotes?: string;
  senses?: string[] | string;
  traits?: string[];
  armorProficiencies?: Record<string, string>;
  weaponProficiencies?: Record<string, string>;
  classDcRank?: string;
  classDcAbility?: string;
  savingThrows?: Record<string, string>;
  perceptionRank?: string;
  specialMovements?: string;
  skills?: Record<string, string>;
  loreSkills?: Array<{ name: string; rank?: string }>;
  itemBonuses?: Record<string, number>;
  weapons?: any[];
  strikes?: any[];
  feats?: any;
  progression?: Record<string, any>;
  classFeatures?: string[];
  actions?: Array<{ name: string; actions?: string | number; source?: string; description?: string }>;
  reactions?: Array<{ name: string; trigger?: string; effect?: string; description?: string }>;
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
  spellcastingAbility?: string;
  spellAttackRank?: string;
  spellDcRank?: string;
  spells?: Array<{ name: string; rank?: number; actions?: string }>;
  cantrips?: Array<{ name: string; actions?: string }>;
  innateSpells?: Array<{ name: string; freq?: string; actions?: string }>;
  focusSpells?: Array<{ name: string; actions?: string; rank?: number }>;
  focusPoints?: number;
  focusSpellRank?: number;
  spellSlotsUsed?: Record<number, number>;
}

export async function fillCharacterPdfForm(
  character: CharacterDocument,
  pdfTemplateBytes: Uint8Array | ArrayBuffer
): Promise<Uint8Array> {
  const engine = typeof PF2E_ENGINE !== "undefined" ? PF2E_ENGINE : (globalThis as any).PF2E_ENGINE;
  const level = Number(character.level || 1);

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

  const setProfChecks = (prefix: string, rank: string | undefined) => {
    const r = String(rank || "").toLowerCase();
    const isTrained = r.includes("treinado") || r.includes("trained") || r.includes("especialista") || r.includes("expert") || r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary");
    const isExpert = r.includes("especialista") || r.includes("expert") || r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary");
    const isMaster = r.includes("mestre") || r.includes("master") || r.includes("lendário") || r.includes("legendary");
    const isLegendary = r.includes("lendário") || r.includes("legendary");

    setChk(`${prefix} TRAINED`, isTrained);
    setChk(`${prefix} EXPERT`, isExpert);
    setChk(`${prefix} MASTER`, isMaster);
    setChk(`${prefix} LEGENDARY`, isLegendary);

    // Tratamento de erros de digitação históricos da Paizo em ficha.pdf
    if (prefix === "ATHLETICS") {
      setChk("ATHELETICS TRAINED", isTrained);
      setChk("ATHELETICS EXPERT", isExpert);
      setChk("ATHELETICS MASTER", isMaster);
      setChk("ATHELETICS LEGENDARY", isLegendary);
    }
    if (prefix === "MEDICINE") {
      setChk("MEDECINE TRAINED", isTrained);
    }
    if (prefix === "MARTIAL WEAPONS") {
      setChk("MARTIAL WEAPONS LEGEANDARY", isLegendary);
    }
  };

  // ----------------------------------------------------
  // 1. CABEÇALHO & INFORMAÇÕES BÁSICAS
  // ----------------------------------------------------
  setTxt("Character Name", character.name || "Sem Nome");
  setTxt("Player Name", character.playerName || "");
  setTxt("Ancestry", character.ancestry || "");
  const traitsStr = Array.isArray(character.traits) ? character.traits.join(", ") : "";
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

  // ----------------------------------------------------
  // 2. ATRIBUTOS
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // 3. CLASSE DE ARMADURA, PONTOS DE VIDA & DEFESAS
  // ----------------------------------------------------
  const equippedArmor = calc.equippedArmor || { name: "Roupas de Explorador", category: "Sem Armadura", acBonus: 0 };
  setTxt("AC", calc.ac || 10);
  setTxt("AC CALCULATION 1 DEXTERITY", formatMod(mods.dex));
  const armorRank = character.armorProficiencies?.[equippedArmor.category] || "Treinado";
  const armorProfBonus = getProfBonus(armorRank, level);
  setTxt("AC CALCULATION 2 PROFICIENCY", armorProfBonus);
  setTxt("AC CALCULATION 3 ITEM", equippedArmor.acBonus || 0);

  // Escudo
  const shieldBonus = character.shieldRaised ? (character.shieldBonus || 2) : 0;
  setTxt("SHIELD", shieldBonus);
  const shieldHardness = character.shieldHardness !== undefined ? character.shieldHardness : (calc.equippedShield?.hardness || "");
  setTxt("Hardness Max HP", String(shieldHardness));
  const shieldMaxHp = character.shieldMaxHp !== undefined ? character.shieldMaxHp : (calc.equippedShield?.maxHp || character.shieldHp || "");
  const shieldBt = character.shieldBt !== undefined ? character.shieldBt : (calc.equippedShield?.bt || (Number(shieldMaxHp) ? Math.floor(Number(shieldMaxHp) / 2) : ""));
  setTxt("BT", String(shieldBt));

  // Proficiências de Armadura
  setProfChecks("UNARMORED", character.armorProficiencies?.["Sem Armadura"] || character.armorProficiencies?.unarmored || "Treinado");
  setProfChecks("LIGHT", character.armorProficiencies?.["Leve"] || character.armorProficiencies?.light || "Destreinado");
  setProfChecks("MEDIUM", character.armorProficiencies?.["Média"] || character.armorProficiencies?.medium || "Destreinado");
  setProfChecks("HEAVY", character.armorProficiencies?.["Pesada"] || character.armorProficiencies?.heavy || "Destreinado");

  // Pontos de Vida
  setTxt("MAX HP", calc.maxHp || 10);
  setTxt("MAXIMUM HIT POINTS", calc.maxHp || 10);
  setTxt("HP", character.currentHp !== undefined ? character.currentHp : calc.maxHp);
  setTxt("Current HP", character.currentHp !== undefined ? character.currentHp : calc.maxHp);
  setTxt("Temporary HP", character.tempHp || 0);
  setTxt("WOUNDED", character.wounded || 0);
  setTxt("CONDITIONS", Array.isArray(character.conditions) ? character.conditions.join(", ") : "");
  const charResistances = (Array.isArray(character.resistances) && character.resistances.length > 0)
    ? character.resistances
    : (Array.isArray(calc.resistances) ? calc.resistances : []);
  setTxt("RESISTANCE AND IMMUNITIES", charResistances.map((r: any) => typeof r === "object" ? `${r.type || r.name} ${r.value || ""}`.trim() : String(r)).join(", "));
  if (character.defenseNotes) {
    setTxt("DEFENSE NOTES", character.defenseNotes);
  }

  // ----------------------------------------------------
  // 4. SALVAGUARDAS (FORTITUDE, REFLEXOS, VONTADE)
  // ----------------------------------------------------
  const saves = calc.saves;
  setTxt("FORTITUDE", formatMod(saves.fortitude.total));
  setTxt("FORTITUDE ITEM", saves.fortitude.item || 0);
  setProfChecks("FORTITUDE", saves.fortitude.rank);

  setTxt("REFLEX", formatMod(saves.reflex.total));
  setProfChecks("REFLEX", saves.reflex.rank);

  setTxt("WILL", formatMod(saves.will.total));
  setTxt("WILL ITEM", saves.will.item || 0);
  setProfChecks("WILL", saves.will.rank);

  // ----------------------------------------------------
  // 5. PERCEPÇÃO, SENTIDOS & DESLOCAMENTO
  // ----------------------------------------------------
  setTxt("PERCEPTION", formatMod(calc.perception.total));
  setTxt("PERCEPTION WISDOM", formatMod(mods.wis));
  const percProf = getProfBonus(character.perceptionRank || "Treinado", level);
  setTxt("PERCEPTION PROFICIENCY", percProf);
  setTxt("PERCEPTION ITEM", character.itemBonuses?.perception || 0);
  setProfChecks("PERCEPTION", character.perceptionRank || "Treinado");

  const sensesList = Array.isArray(character.senses)
    ? character.senses.join(", ")
    : (character.senses || (calc.senses ? (Array.isArray(calc.senses) ? calc.senses.join(", ") : String(calc.senses)) : ""));
  setTxt("SENSES AND NOTES", sensesList);

  setTxt("SPEED", `${calc.speed || 25} pés`);
  setTxt("SPECIAL MOVEMENT", character.specialMovements || "");

  // ----------------------------------------------------
  // 6. CD DE CLASSE & PROFICIÊNCIAS DE ARMAS
  // ----------------------------------------------------
  const classDcObj = calc.classDcObj || (calc.classDc ? { total: calc.classDc, key: mods.str, prof: getProfBonus("Treinado", level), item: 0 } : null);
  const classDcTotal = classDcObj?.total || calc.classDc || (10 + mods.str + getProfBonus("Treinado", level));
  setTxt("CLASS DC", classDcTotal);
  setTxt("CLASS DC KEY", formatMod(classDcObj?.key !== undefined ? classDcObj.key : mods.str));
  setTxt("CLASS DC PROFICIENCY", classDcObj?.prof !== undefined ? classDcObj.prof : getProfBonus("Treinado", level));
  setTxt("CLASS DC ITEM", classDcObj?.item || 0);
  const classDcRank = character.classDcRank || "Treinado";
  setProfChecks("CLASS DC", classDcRank);

  // Proficiências de Armas
  const weaponProfs = character.weaponProficiencies || (calc.weaponProficiencies || {});
  setProfChecks("UNARMED", weaponProfs["Desarmado"] || weaponProfs.unarmed || "Treinado");
  setProfChecks("SIMPLE WEAPONS", weaponProfs["Simples"] || weaponProfs.simple || "Treinado");
  setProfChecks("MARTIAL WEAPONS", weaponProfs["Marcial"] || weaponProfs.martial || "Destreinado");
  setProfChecks("ADVANCED WEAPON", weaponProfs["Avançada"] || weaponProfs.advanced || "Destreinado");
  setProfChecks("OTHER WEAPONS", weaponProfs["Outras"] || weaponProfs.other || "Destreinado");

  // ----------------------------------------------------
  // 7. PERÍCIAS (16) & LORES
  // ----------------------------------------------------
  const skillsMap: Record<string, { name: string; attrKey: keyof typeof mods }> = {
    acrobatics: { name: "ACROBATICS", attrKey: "dex" },
    arcana: { name: "ARCANA", attrKey: "int" },
    athletics: { name: "ATHLETICS", attrKey: "str" },
    crafting: { name: "CRAFTING", attrKey: "int" },
    deception: { name: "DECEPTION", attrKey: "cha" },
    diplomacy: { name: "DIPLOMACY", attrKey: "cha" },
    intimidation: { name: "INTIMIDATION", attrKey: "cha" },
    medicine: { name: "MEDICINE", attrKey: "wis" },
    nature: { name: "NATURE", attrKey: "wis" },
    occultism: { name: "OCCULTISM", attrKey: "int" },
    performance: { name: "PERFORMANCE", attrKey: "cha" },
    religion: { name: "RELIGION", attrKey: "wis" },
    society: { name: "SOCIETY", attrKey: "int" },
    stealth: { name: "STEALTH", attrKey: "dex" },
    survival: { name: "SURVIVAL", attrKey: "wis" },
    thievery: { name: "THIEVERY", attrKey: "dex" }
  };

  for (const [skKey, meta] of Object.entries(skillsMap)) {
    const sk = calc.skills?.[skKey] || { total: 0, rank: "Destreinado", profBonus: 0, itemBonus: 0 };
    setTxt(meta.name, formatMod(sk.total));
    setTxt(`${meta.name} PROFICIENCY`, sk.profBonus || 0);
    setTxt(`${meta.name} ITEM`, sk.itemBonus || 0);
    const attrMod = mods[meta.attrKey];
    if (meta.attrKey === "str") setTxt(`${meta.name} STRENGTH`, formatMod(attrMod));
    if (meta.attrKey === "dex") setTxt(`${meta.name} DEXTERITY`, formatMod(attrMod));
    if (meta.attrKey === "int") setTxt(`${meta.name} INTELLIGENCE`, formatMod(attrMod));
    if (meta.attrKey === "wis") setTxt(`${meta.name} WISDOM`, formatMod(attrMod));
    if (meta.attrKey === "cha") setTxt(`${meta.name} CHARISMA`, formatMod(attrMod));
    setProfChecks(meta.name, sk.rank);
  }

  // Lores
  const loreSkills = character.loreSkills || [];
  if (loreSkills[0]) {
    setTxt("LORE CATAGORY 1", loreSkills[0].name || "Saber");
    setTxt("LORE CATEGORY 1", loreSkills[0].name || "Saber");
    const l1Prof = getProfBonus(loreSkills[0].rank || "Treinado", level);
    setTxt("LORE1", formatMod(mods.int + l1Prof));
    setTxt("LORE 1 INTELLIGENCE", formatMod(mods.int));
    setTxt("LORE 1 PFOCIENCY", l1Prof);
    setTxt("LORE 1 PROFICIENCY", l1Prof);
    setProfChecks("LORE1", loreSkills[0].rank || "Treinado");
  }
  if (loreSkills[1]) {
    setTxt("LORE CATEGORY 2", loreSkills[1].name || "Saber");
    const l2Prof = getProfBonus(loreSkills[1].rank || "Treinado", level);
    setTxt("LORE2", formatMod(mods.int + l2Prof));
    setTxt("LORE CATEGORY 2 ITENLLIGENCE", formatMod(mods.int));
    setTxt("LORE 2 INTELLIGENCE", formatMod(mods.int));
    setTxt("LORE 2 PROFICIENCY", l2Prof);
    setProfChecks("LORE2", loreSkills[1].rank || "Treinado");
  }

  // ----------------------------------------------------
  // 8. GOLPES & ATAQUES (MELEE & RANGED) COM CAIXAS B/P/S
  // ----------------------------------------------------
  const strikes = (calc.strikes && calc.strikes.length) ? calc.strikes : (character.weapons || []);
  const meleeStrikes = strikes.filter((s: any) => !s.isRanged);
  const rangedStrikes = strikes.filter((s: any) => s.isRanged);

  const applyDamageTypeChecks = (dt: string | undefined, suffix: string) => {
    const t = String(dt || "").toLowerCase();
    if (t.includes("impacto") || t.includes("bludgeoning") || t.includes("esmagamento") || t.includes("b")) {
      setChk(`B${suffix}`, true);
    }
    if (t.includes("perfuração") || t.includes("piercing") || t.includes("perfurante") || t.includes("p")) {
      setChk(`P${suffix}`, true);
    }
    if (t.includes("cortante") || t.includes("slashing") || t.includes("corte") || t.includes("s")) {
      setChk(`S${suffix}`, true);
    }
  };

  meleeStrikes.slice(0, 3).forEach((st: any, idx: number) => {
    const n = idx + 1;
    const totalAtk = st.totalAttack !== undefined ? st.totalAttack : (st.attackBonus || 0);
    setTxt(`MELEE STRIKE ${n}`, st.name);
    setTxt(`MELEE STRIKE ${n} ATTACK BONUS`, formatMod(totalAtk));
    setTxt(`MELEE STRIKE ${n} STRENGTH`, formatMod(mods.str));
    setTxt(`MELEE STRIKE ${n} PROFICIENCY`, getProfBonus(st.rank || "Treinado", level));
    setTxt(`MELEE STRIKE ${n} ITEM BONUS`, st.itemBonus || 0);
    setTxt(`MELEE STRIKE ${n} ITEM`, st.itemBonus || 0);
    setTxt(`MELEE STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType || ""}`.trim());
    setTxt(`MELEE STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
    applyDamageTypeChecks(st.damageType, n === 1 ? "" : `_${n}`);
  });

  rangedStrikes.slice(0, 2).forEach((st: any, idx: number) => {
    const n = idx + 4;
    const totalAtk = st.totalAttack !== undefined ? st.totalAttack : (st.attackBonus || 0);
    setTxt(`RANGED STRIKE ${n}`, st.name);
    setTxt(`RANGED STRIKE ${n} ATTACK BONUS`, formatMod(totalAtk));
    setTxt(`RANGED STRIKE ${n} DEXTERITY`, formatMod(mods.dex));
    setTxt(`RANGED STRIKE ${n} PROFICIENCY`, getProfBonus(st.rank || "Treinado", level));
    setTxt(`RANGED STRIKE ${n} ITEM BONUS`, st.itemBonus || 0);
    setTxt(`RANGED STRIKE ${n} ITEM`, st.itemBonus || 0);
    setTxt(`RANGED STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType || ""}`.trim());
    setTxt(`RANGED STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
    applyDamageTypeChecks(st.damageType, `_${n}`);
  });

  // ----------------------------------------------------
  // 9. TALENTOS & PROGRESSÃO (PÁGINA 2)
  // ----------------------------------------------------
  // Coleta talentos de todas as origens possíveis (objeto, array ou progression)
  const rawFeats = character.feats;
  const progression = character.progression || {};

  let ancestryFeatsList: string[] = [];
  let classFeatsList: Array<{ name: string; level?: number; notes?: string; traits?: string }> = [];
  let skillFeatsList: Array<{ name: string; level?: number; notes?: string; traits?: string }> = [];
  let generalFeatsList: string[] = [];
  let backgroundSkillFeat = "";

  if (rawFeats && !Array.isArray(rawFeats) && typeof rawFeats === "object") {
    if (Array.isArray(rawFeats.ancestry)) ancestryFeatsList.push(...rawFeats.ancestry);
    if (rawFeats.background) backgroundSkillFeat = String(rawFeats.background);
    if (Array.isArray(rawFeats.class)) {
      rawFeats.class.forEach((cf: any, i: number) => classFeatsList.push({ name: typeof cf === "string" ? cf : cf.name, level: (i + 1) }));
    }
    if (Array.isArray(rawFeats.skill)) {
      rawFeats.skill.forEach((sf: any, i: number) => skillFeatsList.push({ name: typeof sf === "string" ? sf : sf.name, level: (i + 2) }));
    }
    if (Array.isArray(rawFeats.general)) generalFeatsList.push(...rawFeats.general);
  } else if (Array.isArray(rawFeats)) {
    rawFeats.forEach((f: any) => {
      const name = typeof f === "string" ? f : f.name;
      const slotId = String(f.slotId || "");
      const typeStr = String(f.type || "").toLowerCase();
      const itemLevel = f.level || 1;
      const notes = f.source?.book ? `${f.source.book}${f.source.page ? ` p.${f.source.page}` : ""}` : "";
      const traits = Array.isArray(f.traits) ? f.traits.join(", ") : "";

      if (slotId.includes("ancestry_feat") || typeStr.includes("ancestral") || typeStr.includes("ancestry")) {
        ancestryFeatsList.push(name);
      } else if (slotId.includes("skill_feat") || typeStr.includes("perícia") || typeStr.includes("skill")) {
        skillFeatsList.push({ name, level: itemLevel, notes, traits });
      } else if (slotId.includes("general_feat") || typeStr.includes("geral") || typeStr.includes("general")) {
        generalFeatsList.push(name);
      } else {
        classFeatsList.push({ name, level: itemLevel, notes, traits });
      }
    });
  }

  // Complementa com o dicionário de progressão de níveis se disponível
  Object.entries(progression).forEach(([slot, val]) => {
    if (!val || typeof val !== "string") return;
    if (slot.includes("ancestry_feat") && !ancestryFeatsList.includes(val)) {
      ancestryFeatsList.push(val);
    } else if ((slot.includes("class_feat") || slot.includes("archetype")) && !classFeatsList.some(f => f.name === val)) {
      classFeatsList.push({ name: val });
    } else if (slot.includes("skill_feat") && !skillFeatsList.some(f => f.name === val)) {
      skillFeatsList.push({ name: val });
    } else if (slot.includes("general_feat") && !generalFeatsList.includes(val)) {
      generalFeatsList.push(val);
    }
  });

  const ancestryAndHeritageAbilities = [
    character.ancestry ? `Ancestralidade: ${character.ancestry}` : "",
    character.heritage ? `Herança: ${character.heritage}` : "",
    sensesList ? `Sentidos: ${sensesList}` : "",
    character.specialMovements ? `Movimento: ${character.specialMovements}` : "",
    generalFeatsList.length ? `Talentos Gerais: ${generalFeatsList.join(", ")}` : ""
  ].filter(Boolean).join("\n");
  setTxt("ANCESTRY & HERITAGE ABILITIES", ancestryAndHeritageAbilities);
  setTxt("ANCESTRY FEAT", ancestryFeatsList.join(", "));
  setTxt("BACKGROUND SKILL FEAT", backgroundSkillFeat || (progression["background_feat"] || ""));

  const classFeatures = Array.isArray(character.classFeatures) && character.classFeatures.length
    ? character.classFeatures
    : Object.entries(progression).filter(([k]) => k.includes("class_feature")).map(([, v]) => String(v));
  setTxt("CLASS FEATS & FEATURES", classFeatures.join("\n"));

  // Preenche linhas numeradas de Talentos de Classe (1-20)
  classFeatsList.slice(0, 20).forEach((f, idx) => {
    const lvl = idx + 1;
    setTxt(`CLASS FEAT ${lvl}-1`, f.name);
    if (f.notes) setTxt(`CLASS FEAT ${lvl}-2`, f.notes);
    if (f.traits) setTxt(`CLASS FEAT ${lvl}-3`, f.traits);
  });

  // Preenche linhas numeradas de Talentos de Perícia (2-20)
  skillFeatsList.slice(0, 20).forEach((f, idx) => {
    const lvl = idx + 2;
    setTxt(`SKILL FEAT ${lvl}-1`, f.name);
    if (f.notes) setTxt(`SKILL FEAT ${lvl}-2`, f.notes);
    if (f.traits) setTxt(`SKILL FEAT ${lvl}-3`, f.traits);
  });

  // ----------------------------------------------------
  // 10. AÇÕES ESPECIAIS & REAÇÕES (PÁGINA 1 E 2)
  // ----------------------------------------------------
  const actionsList = character.actions || [];
  actionsList.slice(0, 10).forEach((act, idx) => {
    const n = idx + 1;
    setTxt(`ACTION NAME ${n}`, act.name);
    setTxt(`ACTIONS COUNT ${n}`, String(act.actions || "◆"));
    setTxt(`ACTION SOURCE ${n}`, act.source || act.description || "");
  });

  const reactionsList = character.reactions || [];
  reactionsList.slice(0, 5).forEach((react, idx) => {
    const n = idx + 1;
    setTxt(`REACTION NAME ${n}`, react.name);
    setTxt(`REACTIONS TRIGGER ${n}`, react.trigger || "");
    setTxt(`REACTIONS EFFECTS ${n}`, react.effect || react.description || "");
  });

  // ----------------------------------------------------
  // 11. INVENTÁRIO, CARGA & MOEDAS (PÁGINA 3)
  // ----------------------------------------------------
  const inventory = Array.isArray(character.inventory) ? character.inventory : [];
  const wornItems = inventory.filter(i => !i.isHeld && !i.isConsumable);
  const heldItems = inventory.filter(i => i.isHeld);
  const consumableItems = inventory.filter(i => i.isConsumable);

  wornItems.slice(0, 19).forEach((item, idx) => {
    const n = idx + 1;
    setTxt(`WORN ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`);
    setTxt(`WORN BULK ${n}`, String(item.bulk || "—"));
  });
  heldItems.slice(0, 11).forEach((item, idx) => {
    const n = idx + 1;
    const text = `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`;
    if (n === 1) setTxt("HELD1", text);
    setTxt(`HELD ${n}`, text);
    setTxt(`HELD BULK ${n}`, String(item.bulk || "—"));
  });
  consumableItems.slice(0, 11).forEach((item, idx) => {
    const n = idx + 1;
    setTxt(`CONSUMABLES ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${item.name}`);
    setTxt(`CONSUMABLES BULK ${n}`, String(item.bulk || "—"));
  });

  setTxt("BULK TOTAL", String(calc.bulk?.current || 0));

  const coins = character.coins || { cp: 0, sp: 0, gp: 15, pp: 0 };
  setTxt("COPPER", String(coins.cp || 0));
  setTxt("SILVER", String(coins.sp || 0));
  setTxt("GOLD", String(coins.gp || 0));
  setTxt("PLATINUM", String(coins.pp || 0));

  // ----------------------------------------------------
  // 12. IDENTIDADE, BIOGRAFIA & APARÊNCIA (PÁGINA 3)
  // ----------------------------------------------------
  setTxt("AGE", String(character.age || ""));
  setTxt("GENDER & PRONOUNS", [character.gender, character.pronouns].filter(Boolean).join(" / "));
  setTxt("HEIGHT", String(character.height || ""));
  setTxt("WEIGHT", String(character.weight || ""));
  setTxt("ETHNICITY", String(character.ethnicity || ""));
  setTxt("NATIONALITY", String(character.nationality || ""));
  setTxt("Appearance", character.appearance || "");
  setTxt("Notes", character.backstory || character.biography || "");
  setTxt("Edicts", character.edicts || "");
  setTxt("Anathema", character.anathema || "");

  // ----------------------------------------------------
  // 13. GRIMÓRIO, MAGIAS, TRUQUES & CONJURAÇÃO (PÁGINA 4)
  // ----------------------------------------------------
  const tradition = character.magicalTradition || "Arcana";
  setTxt("Magical Tradition", tradition);
  const tradNorm = tradition.toLowerCase();
  setChk("ARCANE", tradNorm.includes("arcan"));
  setChk("DIVINE", tradNorm.includes("divin"));
  setChk("OCCULT", tradNorm.includes("ocult") || tradNorm.includes("occult"));
  setChk("PRIMAL", tradNorm.includes("primal") || tradNorm.includes("primordial"));

  // Ataque Mágico & CD de Magia
  const spellKeyMod = mods[((character.spellcastingAbility || "int").slice(0, 3).toLowerCase() as keyof typeof mods)] || mods.int;
  const spellAttackRank = character.spellAttackRank || "Treinado";
  const spellAttackProf = getProfBonus(spellAttackRank, level);
  const spellAttackTotal = spellKeyMod + spellAttackProf;
  setTxt("SPELL ATTACK", formatMod(spellAttackTotal));
  setTxt("SPELL ATTACK KEY", formatMod(spellKeyMod));
  setTxt("SPELL ATTACK PROFICIENCY", spellAttackProf);
  setProfChecks("SPELL ATTACK", spellAttackRank);

  const spellDcRank = character.spellDcRank || "Treinado";
  const spellDcProf = getProfBonus(spellDcRank, level);
  const spellDcTotal = 10 + spellKeyMod + spellDcProf;
  setTxt("SPELL SAVE DC", spellDcTotal);
  setTxt("SPELL SAVE DC KEY", formatMod(spellKeyMod));
  setTxt("SPELL SAVE DC PROFICIENCY", spellDcProf);
  setProfChecks("SPELL SAVE DC", spellDcRank);

  // Espaços por dia
  const spellSlots = (engine && typeof engine.getSpellSlots === "function")
    ? engine.getSpellSlots(character as any)
    : null;
  const slotsObj = (spellSlots && spellSlots.slots) ? spellSlots.slots : {};
  for (let r = 1; r <= 10; r++) {
    const slotsCount = slotsObj[r] || 0;
    if (slotsCount > 0) {
      setTxt(`SPELLS PER DAY ${r}`, String(slotsCount));
      setTxt(`SPELLS REMAINING ${r}`, String(slotsCount));
    }
  }

  // Separação de Truques (Rank 0) vs Magias de Nível (Rank 1 a 10)
  const allSpells = Array.isArray(character.spells) ? character.spells : [];
  const cantrips = allSpells.filter(sp => Number(sp.rank) === 0).concat(character.cantrips || []);
  const leveledSpells = allSpells.filter(sp => Number(sp.rank) > 0);

  // Preenche Truques nos campos dedicados
  const cantripHeightenedRank = Math.ceil(level / 2);
  setTxt("CANTRIPS RANK", String(cantripHeightenedRank));
  cantrips.slice(0, 18).forEach((c, idx) => {
    const n = idx + 1;
    setTxt(`CANTRIP NAME ${n}`, c.name);
    setTxt(`CANTRIP ${n} ACTIONS`, c.actions || "◆◆");
    setChk(`CANTRIP ${n} PREPARED`, true);
  });

  // Preenche Magias de Nível
  leveledSpells.slice(0, 35).forEach((sp, idx) => {
    const n = idx + 1;
    setTxt(`SPELL ${n}`, sp.name);
    setTxt(`SPELL RANK ${n}`, String(sp.rank || 1));
    setTxt(`SPELL ACTION ${n}`, sp.actions || "◆◆");
    setChk(`SPELL PREPARED ${n}`, true);
  });

  // Magias Inatas
  const innateSpells = Array.isArray(character.innateSpells) ? character.innateSpells : [];
  innateSpells.slice(0, 6).forEach((insp, idx) => {
    const n = idx + 1;
    setTxt(`INNATE SPELL ${n}`, insp.name);
    setTxt(`INNATE FREQ ${n}`, insp.freq || "1/dia");
    setTxt(`INNATE SPELL ACTION ${n}`, insp.actions || "◆◆");
  });

  // Magias de Foco & Pontos de Foco
  const focusSpells = Array.isArray(character.focusSpells) ? character.focusSpells : [];
  focusSpells.slice(0, 8).forEach((fsp, idx) => {
    const n = idx + 1;
    setTxt(`FOCUS SPELL ${n}`, fsp.name);
    setTxt(`FOCUS SPELL ACTIONS ${n}`, fsp.actions || "◆");
  });
  setTxt("FOCUS SPELL RANK", String(character.focusSpellRank || cantripHeightenedRank));
  const focusPoints = Number(character.focusPoints || (focusSpells.length ? Math.min(3, focusSpells.length) : 1));
  setChk("FP1", focusPoints >= 1);
  setChk("FP 1", focusPoints >= 1);
  setChk("FP2", focusPoints >= 2);
  setChk("FP 2", focusPoints >= 2);
  setChk("FP 3", focusPoints >= 3);

  return await pdfDoc.save();
}
