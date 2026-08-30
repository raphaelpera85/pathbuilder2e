/**
 * PF2E RULES ENGINE - Pathbuilder 2e Local
 * Motor de cálculo de regras, proficiências TEML, CA, PV, Salvaguardas, Perícias, Golpes e Carga.
 */

const PF2E_ENGINE = {
  // Constantes de Proficiência TEML
  PROFICIENCY_VALUES: {
    "Destreinado": 0,
    "Treinado": 2,
    "Especialista": 4,
    "Mestre": 6,
    "Lendário": 8,
    "U": 0,
    "T": 2,
    "E": 4,
    "M": 6,
    "L": 8
  },

  // Calcula o modificador do atributo (ex: 18 -> +4, 8 -> -1)
  getModifier(score) {
    return Math.floor((score - 10) / 2);
  },

  // Retorna o bônus numérico de proficiência TEML (adiciona o nível se treinado ou superior)
  getProficiencyBonus(rank, level) {
    const base = this.PROFICIENCY_VALUES[rank] || 0;
    if (base === 0) return 0;
    return base + (level || 1);
  },

  // Formata modificador com sinal (ex: +4, -1, +0)
  formatMod(num) {
    if (num >= 0) return `+${num}`;
    return `${num}`;
  },

  // Avaliador de expressões de dados (ex: "1d8+3", "2d6+4", "1d12+1d4+2")
  evaluateDiceExpression(formula, options = {}) {
    const isCritical = Boolean(options.isCritical);
    const cleanFormula = String(formula || "1d4").replace(/\s+/g, "");
    
    const diceRegex = /([+-]?\s*\d*)d(\d+)/gi;
    let match;
    const diceRolls = [];
    let diceSum = 0;
    let formulaWithoutDice = cleanFormula;

    while ((match = diceRegex.exec(cleanFormula)) !== null) {
      const fullMatch = match[0];
      const sign = fullMatch.startsWith("-") ? -1 : 1;
      const countStr = match[1].replace(/[+-]/g, "");
      const count = countStr === "" ? 1 : Math.max(1, parseInt(countStr, 10));
      const sides = parseInt(match[2], 10);

      const rolls = [];
      let subTotal = 0;
      for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        subTotal += roll;
      }
      diceRolls.push({ count, sides, rolls, subTotal: subTotal * sign });
      diceSum += subTotal * sign;
    }

    // Remove as partes de dados para extrair modificadores numéricos fixos
    const modParts = cleanFormula.replace(/([+-]?\s*\d*)d(\d+)/gi, "").match(/[+-]?\d+/g) || [];
    const staticModifier = modParts.reduce((acc, val) => acc + parseInt(val, 10), 0);

    const baseTotal = diceSum + staticModifier;
    const finalTotal = isCritical ? baseTotal * 2 : baseTotal;

    const breakdown = diceRolls.map(d => `[${d.rolls.join("+")}]`).join(" + ") + (staticModifier !== 0 ? ` ${this.formatMod(staticModifier)}` : "");

    return {
      formula: cleanFormula,
      diceSum,
      staticModifier,
      baseTotal,
      total: Math.max(0, finalTotal),
      isCritical,
      diceRolls,
      breakdown: isCritical ? `(${breakdown}) × 2 = ${finalTotal}` : `${breakdown} = ${finalTotal}`
    };
  },

  // Analisa condições e benefícios ativos para calcular modificadores mecânicos de regras
  getConditionModifiers(character) {
    const conditions = Array.isArray(character?.conditions) ? character.conditions : [];
    const buffs = Array.isArray(character?.buffs) ? character.buffs : [];

    const getVal = (nameRegex) => {
      const match = conditions.find(c => nameRegex.test(c.name || ""));
      return match ? Math.max(1, Number(match.value) || 1) : 0;
    };

    const hasCondition = (nameRegex) => conditions.some(c => nameRegex.test(c.name || ""));
    const hasBuff = (nameRegex) => buffs.some(b => nameRegex.test(b.name || ""));

    const offGuard = hasCondition(/desprevenido|off-guard|flat-footed/i);
    const frightened = getVal(/amedrontado|frightened/i);
    const sickened = getVal(/enjoado|nauseado|sickened/i);
    const clumsy = getVal(/debilitado|desajeitado|clumsy/i);
    const enfeebled = getVal(/enfraquecido|enfeebled/i);
    const drained = getVal(/drenado|drained/i);
    const stupefied = getVal(/estupefato|estupefacto|stupefied/i);
    const blessed = hasBuff(/abençoado|bless/i);
    const quickened = hasBuff(/acelera[çc][ãa]o|quickened|haste/i);

    // Stacking de Penalidades de Estado (Status Penalties não acumulam entre si: prevalece a maior)
    const generalStatusPenalty = Math.max(frightened, sickened);
    const strStatusPenalty = Math.max(generalStatusPenalty, enfeebled);
    const dexStatusPenalty = Math.max(generalStatusPenalty, clumsy);
    const conStatusPenalty = Math.max(generalStatusPenalty, drained);
    const mentalStatusPenalty = Math.max(generalStatusPenalty, stupefied);

    // Penalidade circunstancial na CA
    const circumstanceAcPenalty = offGuard ? 2 : 0;
    const acPenalty = circumstanceAcPenalty + dexStatusPenalty;

    return {
      offGuard,
      frightened,
      sickened,
      clumsy,
      enfeebled,
      drained,
      stupefied,
      blessed,
      quickened,
      generalStatusPenalty,
      statusPenalty: generalStatusPenalty,
      strStatusPenalty,
      dexStatusPenalty,
      conStatusPenalty,
      mentalStatusPenalty,
      circumstanceAcPenalty,
      acPenalty
    };
  },

  normalizeTradition(value) {
    const normalized = String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return ({
      arcana: "arcane", arcane: "arcane",
      divina: "divine", divine: "divine",
      ocultista: "occult", occult: "occult",
      primal: "primal", primordial: "primal"
    })[normalized] || "";
  },

  getSpellcastingProfile(character) {
    return PF2E_DATA.classes[character?.class]?.spellcasting || null;
  },

  getMaximumSpellRank(character) {
    const level = Math.min(20, Math.max(1, Number(character?.level) || 1));
    return Math.min(10, Math.ceil(level / 2));
  },

  getSpellCompatibility(character, spell) {
    const profile = this.getSpellcastingProfile(character);
    if (!profile) return { state: "incompatible", reason: "no-spellcasting", tradition: "", maximumRank: 0 };

    const selectedTradition = this.normalizeTradition(character?.magicTradition);
    const allowedTraditions = Array.isArray(profile.traditions) ? profile.traditions : [];
    const tradition = profile.traditionMode === "fixed" ? allowedTraditions[0] : selectedTradition;
    const maximumRank = this.getMaximumSpellRank(character);

    if (profile.traditionMode !== "fixed" && !allowedTraditions.includes(tradition)) {
      return { state: "requires-choice", reason: "tradition-required", tradition: "", maximumRank };
    }
    if (Number(spell?.rank || 0) > maximumRank) {
      return { state: "incompatible", reason: "rank-too-high", tradition, maximumRank };
    }
    if (!Array.isArray(spell?.traditions) || !spell.traditions.includes(tradition)) {
      return { state: "incompatible", reason: "tradition-mismatch", tradition, maximumRank };
    }
    return { state: "available", reason: "compatible", tradition, maximumRank };
  },

  // Calcula progressão de espaços de magia por nível e perfil de classe
  getSpellSlots(character) {
    const profile = this.getSpellcastingProfile(character);
    if (!profile) return null;

    const level = Math.min(20, Math.max(1, Number(character?.level) || 1));
    const maxRank = this.getMaximumSpellRank(character);
    const isBounded = profile.preparation === "bounded";

    const cantrips = 5;
    const slots = {};

    if (isBounded) {
      // Conjuradores Limitados (Magus, Convocador): mantêm apenas os 2 ranques mais altos
      if (maxRank === 1) {
        slots[1] = level === 1 ? 1 : 2;
      } else {
        slots[maxRank] = 2;
        slots[maxRank - 1] = 2;
      }
    } else {
      // Conjuradores Padrão (Mago, Clérigo, Druida, Feiticeiro, Bardo, etc.)
      for (let r = 1; r <= maxRank && r <= 9; r++) {
        const levelsAtThisRank = level - (r * 2 - 1);
        if (levelsAtThisRank === 0) slots[r] = 2;
        else if (levelsAtThisRank >= 1) slots[r] = 3;
      }
      if (level >= 19) {
        slots[10] = 1;
      }
    }

    const focusPoints = Math.min(3, Math.max(0, Number(character?.focusPoints !== undefined ? character.focusPoints : 1)));

    return {
      cantrips,
      maxRank,
      slots,
      focusPoints,
      maxFocusPoints: 3,
      isBounded
    };
  },

  // Mapeia nomes de atributos em português para chaves internas
  normalizeAttributeKey(attr) {
    if (!attr) return "str";
    const clean = String(attr).trim().toLowerCase();
    if (clean.startsWith("for") || clean === "str") return "str";
    if (clean.startsWith("des") || clean === "dex") return "dex";
    if (clean.startsWith("con")) return "con";
    if (clean.startsWith("int")) return "int";
    if (clean.startsWith("sab") || clean === "wis") return "wis";
    if (clean.startsWith("car") || clean === "cha") return "cha";
    return "str";
  },

  // Pipeline de Aprimoramentos de Atributos Remaster (Ancestralidade, Antecedente, Classe, Nível 1 Livre, Níveis 5/10/15/20)
  calculateAttributePipeline(character) {
    const scores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const breakdown = {
      base: { ...scores },
      ancestry: {},
      background: {},
      classKey: {},
      level1Free: {},
      level5: {},
      level10: {},
      level15: {},
      level20: {}
    };

    const applyBoost = (targetScores, bucket, attrKey) => {
      const key = this.normalizeAttributeKey(attrKey);
      const current = targetScores[key];
      const delta = current < 18 ? 2 : 1;
      targetScores[key] = current + delta;
      bucket[key] = (bucket[key] || 0) + delta;
    };

    const applyFlaw = (targetScores, bucket, attrKey) => {
      const key = this.normalizeAttributeKey(attrKey);
      targetScores[key] -= 2;
      bucket[key] = (bucket[key] || 0) - 2;
    };

    // 1. Ancestralidade
    const ancestryData = PF2E_DATA.ancestries[character?.ancestry] || {};
    if (character?.ancestryBoostMode === "alternate_remaster") {
      // 2 Boosts Livres
      (character?.ancestryBoosts || ["str", "dex"]).slice(0, 2).forEach(b => applyBoost(scores, breakdown.ancestry, b));
    } else {
      (ancestryData.boosts || []).forEach((b, idx) => {
        if (b === "Livre") {
          const customBoost = Array.isArray(character?.ancestryBoosts) ? character.ancestryBoosts[idx] : character?.ancestryBoost;
          if (customBoost) applyBoost(scores, breakdown.ancestry, customBoost);
        } else {
          applyBoost(scores, breakdown.ancestry, b);
        }
      });
      (ancestryData.flaws || []).forEach(f => applyFlaw(scores, breakdown.ancestry, f));
    }

    // 2. Antecedente (1 atributo da escolha do antecedente + 1 livre)
    const bgBoosts = Array.isArray(character?.backgroundBoosts) ? character.backgroundBoosts : [];
    bgBoosts.slice(0, 2).forEach(b => applyBoost(scores, breakdown.background, b));

    // 3. Atributo Chave da Classe
    const classData = PF2E_DATA.classes[character?.class] || {};
    const keyAttr = character?.classKeyBoost || (classData.keyAbility && classData.keyAbility[0]) || "str";
    applyBoost(scores, breakdown.classKey, keyAttr);

    // 4. Quatro Aprimoramentos Livres do Nível 1
    const l1Boosts = Array.isArray(character?.level1FreeBoosts) ? character.level1FreeBoosts : [];
    l1Boosts.slice(0, 4).forEach(b => applyBoost(scores, breakdown.level1Free, b));

    // 5. Aprimoramentos de Nível (5, 10, 15, 20)
    const level = character?.level || 1;
    const milestoneLevels = [5, 10, 15, 20];
    milestoneLevels.forEach(milestone => {
      if (level >= milestone) {
        const boostsAtMilestone = character?.levelBoosts?.[milestone] || [];
        boostsAtMilestone.slice(0, 4).forEach(b => applyBoost(scores, breakdown[`level${milestone}`], b));
      }
    });

    const mods = {
      str: this.getModifier(scores.str),
      dex: this.getModifier(scores.dex),
      con: this.getModifier(scores.con),
      int: this.getModifier(scores.int),
      wis: this.getModifier(scores.wis),
      cha: this.getModifier(scores.cha)
    };

    return { scores, mods, breakdown };
  },

  // Calcula total de perícias treinadas concedidas pela classe + inteligência + antecedente
  calculateTrainedSkillsCount(character) {
    const classData = PF2E_DATA.classes[character?.class] || {};
    const classBase = classData.trainedSkillsCount || 2;
    const scores = character?.abilities || { int: 10 };
    const intMod = this.getModifier(scores.int);
    const fixedSkills = classData.fixedSkills || [];
    
    const bgName = character?.background || "";
    const bgData = PF2E_DATA.backgrounds.find(b => b.name === bgName);
    const backgroundSkill = bgData?.skill;

    const totalAllowed = classBase + Math.max(0, intMod) + (backgroundSkill ? 1 : 0) + fixedSkills.length;
    const selectedSkills = Object.keys(character?.skills || {}).filter(k => character.skills[k] && character.skills[k] !== "Destreinado");
    const remainingCount = Math.max(0, totalAllowed - selectedSkills.length);

    return {
      totalAllowed,
      classBase,
      intMod,
      backgroundSkill,
      fixedSkills,
      selectedSkills,
      remainingCount
    };
  },

  // Retorna os sentidos especiais do personagem (Ancestralidade + Herança)
  getCharacterSenses(character) {
    const ancestryData = PF2E_DATA.ancestries[character?.ancestry] || {};
    const sensesSet = new Set(ancestryData.senses || []);

    const heritage = String(character?.heritage || "").toLowerCase();
    if (heritage.includes("visão no escuro") || heritage.includes("darkvision") || heritage.includes("nephilim") || heritage.includes("meio-orc")) {
      sensesSet.add("Visão no Escuro");
    } else if (heritage.includes("visão na penumbra") || heritage.includes("low-light") || heritage.includes("meio-elfo")) {
      sensesSet.add("Visão na Penumbra");
    }

    return Array.from(sensesSet);
  },

  // Resolução da Reação de Bloqueio com Escudo (Shield Block)
  calculateShieldBlock(incomingDamage, shield) {
    const hardness = Number(shield?.hardness) || 0;
    const currentHp = Number(shield?.currentHp !== undefined ? shield.currentHp : shield?.maxHp) || 0;
    const maxHp = Number(shield?.maxHp) || 0;
    const bt = Number(shield?.bt !== undefined ? shield.bt : Math.floor(maxHp / 2)) || 0;

    const damageBlocked = Math.min(incomingDamage, hardness);
    const excessDamage = Math.max(0, incomingDamage - hardness);
    const newShieldHp = Math.max(0, currentHp - excessDamage);

    return {
      incomingDamage,
      damageBlocked,
      excessDamage,
      newShieldHp,
      isBroken: newShieldHp <= bt,
      isDestroyed: newShieldHp === 0,
      characterDamage: excessDamage
    };
  },

  // Resolução de Teste de Recuperação para condição Morrendo (Dying)
  calculateDyingRecovery(dyingValue, rollResult, options = {}) {
    const dc = 10 + (dyingValue || 1);
    const doomed = Number(options?.doomed || 0);
    const maxDying = Math.max(1, 4 - doomed);
    const isNat20 = Boolean(options?.isNat20);
    const isNat1 = Boolean(options?.isNat1);

    let outcome = "failure";
    let delta = 1;

    if (isNat20 || rollResult >= dc + 10) {
      outcome = "critical_success";
      delta = -2;
    } else if (rollResult >= dc) {
      outcome = "success";
      delta = -1;
    } else if (isNat1 || rollResult <= dc - 10) {
      outcome = "critical_failure";
      delta = 2;
    } else {
      outcome = "failure";
      delta = 1;
    }

    const newDying = Math.max(0, (dyingValue || 1) + delta);
    const isStabilized = newDying === 0;
    const isDead = newDying >= maxDying;

    return {
      dc,
      roll: rollResult,
      outcome,
      newDying,
      isStabilized,
      isDead,
      maxDying
    };
  },

  // Resolução detalhada de Dano e Crítico com Traços de Armas (Fatal, Deadly, Propulsive, Two-Hand, Agile)
  calculateStrikeDamageDetails(weapon, mods = {}, options = {}) {
    const traits = Array.isArray(weapon?.traits) ? weapon.traits : [];
    const baseDamage = String(weapon?.damage || "1d6").trim();
    const isRanged = traits.some(t => /distância|arco|fogo|ranged/i.test(t));
    const isTwoHanded = Boolean(options?.twoHanded);
    const level = Number(options?.level || 1);

    // Propulsive
    let propulsiveBonus = 0;
    if (traits.some(t => /propulsiv/i.test(t))) {
      const strMod = mods.str || 0;
      propulsiveBonus = strMod > 0 ? Math.floor(strMod / 2) : strMod;
    }

    // Two-Hand
    let activeDice = baseDamage;
    const twoHandTrait = traits.find(t => /duas mãos\s*(d\d+)|two-hand\s*(d\d+)/i.test(t));
    if (isTwoHanded && twoHandTrait) {
      const match = twoHandTrait.match(/d\d+/i);
      if (match) {
        activeDice = `1${match[0]}`;
      }
    }

    // Normal static bonus
    const strBonus = isRanged ? propulsiveBonus : (mods.str || 0);
    const staticMod = strBonus + (weapon?.damageBonus || 0);
    const normalFormula = `${activeDice}${staticMod !== 0 ? this.formatMod(staticMod) : ""}`;

    // Fatal Trait
    const fatalTrait = traits.find(t => /fatal\s*(d\d+)/i.test(t));
    // Deadly Trait
    const deadlyTrait = traits.find(t => /mortal\s*(d\d+)|deadly\s*(d\d+)/i.test(t));

    let critFormula = `(${normalFormula}) * 2`;
    if (fatalTrait) {
      const fDie = fatalTrait.match(/d\d+/i)[0];
      critFormula = `(1${fDie}${staticMod !== 0 ? this.formatMod(staticMod) : ""}) * 2 + 1${fDie}`;
    }

    if (deadlyTrait) {
      const dDie = deadlyTrait.match(/d\d+/i)[0];
      const deadlyDiceCount = level >= 19 ? 3 : (level >= 12 ? 2 : 1);
      critFormula += ` + ${deadlyDiceCount}${dDie}`;
    }

    return {
      baseDamage,
      activeDice,
      normalFormula,
      critFormula,
      traitsApplied: {
        isRanged,
        isTwoHanded,
        propulsiveBonus,
        fatal: Boolean(fatalTrait),
        deadly: Boolean(deadlyTrait)
      }
    };
  },

  // Calcula todos os atributos derivados do personagem
  calculateCharacterStats(character) {
    const level = character.level || 1;
    const conditionMods = this.getConditionModifiers(character);
    
    // 1. Modificadores de Atributo
    const scores = character.abilities || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const mods = {
      str: this.getModifier(scores.str),
      dex: this.getModifier(scores.dex),
      con: this.getModifier(scores.con),
      int: this.getModifier(scores.int),
      wis: this.getModifier(scores.wis),
      cha: this.getModifier(scores.cha)
    };

    // 2. Pontos de Vida (HP)
    const ancestryData = PF2E_DATA.ancestries[character.ancestry] || { hp: 8 };
    const classData = PF2E_DATA.classes[character.class] || { hpPerLevel: 10 };
    const selectionGroups = Array.isArray(ancestryData.selectionGroups) ? ancestryData.selectionGroups : [];
    const resolveAncestryOption = (groupId) => {
      const group = selectionGroups.find(item => item.id === groupId);
      if (!group?.options?.length) return null;
      const selectedId = character.ancestryOptions?.[groupId];
      return group.options.find(option => option.id === selectedId) || group.options[0];
    };
    const sizeOption = resolveAncestryOption("size");
    const heritageOption = resolveAncestryOption("heritage");
    const ancestryHp = sizeOption?.hp ?? ancestryData.hp ?? 8;
    const classHpPerLvl = classData.hpPerLevel || 10;
    const conBonus = mods.con;
    const bonusHp = character.bonusHp || 0;
    const drainedPenalty = conditionMods.drained * level;
    const maxHp = Math.max(1, ancestryHp + (classHpPerLvl + conBonus) * level + bonusHp - drainedPenalty);

    // 3. Carga / Bulk e Moedas
    const coins = character.coins || { pl: 0, pp: 0, gp: 0, sp: 0, cp: 0 };
    const totalCoins = (coins.pl || coins.pp || 0) + (coins.gp || 0) + (coins.sp || 0) + (coins.cp || 0);
    const coinBulk = Math.floor(totalCoins / 1000);

    let inventoryBulk = 0;
    (character.inventory || []).forEach(item => {
      if (typeof item.bulk === "number") {
        inventoryBulk += item.bulk * (item.qty || 1);
      } else if (typeof item.bulk === "string") {
        const parsed = parseFloat(item.bulk);
        if (!isNaN(parsed)) inventoryBulk += parsed * (item.qty || 1);
        else if (item.bulk.toUpperCase() === "L") inventoryBulk += 0.1 * (item.qty || 1);
      }
    });

    const currentBulk = Math.floor(inventoryBulk + coinBulk);
    const maxBulk = 10 + mods.str;
    const encumberedBulk = 5 + mods.str;
    const isEncumbered = currentBulk > encumberedBulk;

    // Se estiver sobrecarregado, aplica Clumsy 1 se não for maior, e penalidade de 10ft de velocidade
    const effectiveClumsyPenalty = isEncumbered ? Math.max(1, conditionMods.dexStatusPenalty) : conditionMods.dexStatusPenalty;
    const encumberedSpeedPenalty = isEncumbered ? -10 : 0;

    // 4. Classe de Armadura (CA)
    const equippedArmor = character.equippedArmor || { name: "Sem Armadura (Trajes)", category: "Sem Armadura", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0 };
    const armorProfRank = character.armorProficiencies?.[equippedArmor.category] || "Treinado";
    const armorProfBonus = this.getProficiencyBonus(armorProfRank, level);
    const effectiveDex = Math.min(mods.dex, equippedArmor.dexCap !== undefined ? equippedArmor.dexCap : 5);
    const shieldBonus = character.shieldRaised ? (character.shieldBonus || 2) : 0;
    const itemAcBonus = equippedArmor.acBonus || 0;
    const acTotal = 10 + itemAcBonus + effectiveDex + armorProfBonus + shieldBonus - conditionMods.circumstanceAcPenalty - effectiveClumsyPenalty;

    // 5. Salvaguardas
    const fortRank = character.savingThrows?.fortitude || classData.savingThrows?.fortitude || "Treinado";
    const reflexRank = character.savingThrows?.reflex || classData.savingThrows?.reflex || "Treinado";
    const willRank = character.savingThrows?.will || classData.savingThrows?.will || "Treinado";

    const saves = {
      fortitude: {
        rank: fortRank,
        prof: this.getProficiencyBonus(fortRank, level),
        mod: mods.con,
        item: character.itemBonuses?.fortitude || 0,
        statusPenalty: conditionMods.conStatusPenalty,
        total: mods.con + this.getProficiencyBonus(fortRank, level) + (character.itemBonuses?.fortitude || 0) - conditionMods.conStatusPenalty
      },
      reflex: {
        rank: reflexRank,
        prof: this.getProficiencyBonus(reflexRank, level),
        mod: mods.dex,
        item: character.itemBonuses?.reflex || 0,
        statusPenalty: effectiveClumsyPenalty,
        total: mods.dex + this.getProficiencyBonus(reflexRank, level) + (character.itemBonuses?.reflex || 0) - effectiveClumsyPenalty
      },
      will: {
        rank: willRank,
        prof: this.getProficiencyBonus(willRank, level),
        mod: mods.wis,
        item: character.itemBonuses?.will || 0,
        statusPenalty: conditionMods.mentalStatusPenalty,
        total: mods.wis + this.getProficiencyBonus(willRank, level) + (character.itemBonuses?.will || 0) - conditionMods.mentalStatusPenalty
      }
    };

    // 6. Percepção & Iniciativa
    const percRank = character.perceptionRank || classData.perception || "Treinado";
    const percProf = this.getProficiencyBonus(percRank, level);
    const perceptionTotal = mods.wis + percProf + (character.itemBonuses?.perception || 0) - conditionMods.mentalStatusPenalty;

    // 7. Perícias
    const skillsCalculated = {};
    const armorPenalty = (equippedArmor.checkPenalty && scores.str < (equippedArmor.strReq || 10)) ? equippedArmor.checkPenalty : 0;

    PF2E_DATA.skills.forEach(sk => {
      const rank = character.skills?.[sk.id] || "Destreinado";
      const profBonus = this.getProficiencyBonus(rank, level);
      const attrMod = mods[sk.ability];
      const itemBonus = character.itemBonuses?.[sk.id] || 0;
      const pen = sk.armorPenalty ? armorPenalty : 0;
      
      let skillStatusPenalty = conditionMods.generalStatusPenalty;
      if (sk.ability === "str") skillStatusPenalty = conditionMods.strStatusPenalty;
      else if (sk.ability === "dex") skillStatusPenalty = effectiveClumsyPenalty;
      else if (sk.ability === "con") skillStatusPenalty = conditionMods.conStatusPenalty;
      else if (["int", "wis", "cha"].includes(sk.ability)) skillStatusPenalty = conditionMods.mentalStatusPenalty;

      skillsCalculated[sk.id] = {
        name: sk.name,
        ability: sk.ability,
        rank: rank,
        profBonus: profBonus,
        attrMod: attrMod,
        itemBonus: itemBonus,
        penalty: pen,
        statusPenalty: skillStatusPenalty,
        total: attrMod + profBonus + itemBonus + pen - skillStatusPenalty
      };
    });

    // Perícias de Lore / Conhecimento
    const loreSkills = character.loreSkills || [];
    const loreCalculated = loreSkills.map(l => {
      const rank = l.rank || "Treinado";
      const prof = this.getProficiencyBonus(rank, level);
      return {
        name: l.name,
        rank: rank,
        total: mods.int + prof - conditionMods.mentalStatusPenalty
      };
    });

    // 8. CD de Classe e CD de Magia
    const keyAttr = (classData.keyAbility && classData.keyAbility[0]) ? classData.keyAbility[0].toLowerCase().slice(0, 3) : "dex";
    const classDcProf = this.getProficiencyBonus(character.classDcRank || "Treinado", level);
    let classDcPenalty = conditionMods.generalStatusPenalty;
    if (keyAttr === "str") classDcPenalty = conditionMods.strStatusPenalty;
    else if (keyAttr === "dex") classDcPenalty = effectiveClumsyPenalty;
    else if (["int", "wis", "cha"].includes(keyAttr)) classDcPenalty = conditionMods.mentalStatusPenalty;

    const classDc = 10 + (mods[keyAttr] || mods.dex) + classDcProf - classDcPenalty;

    // 9. Armas e Golpes
    const strikes = (character.weapons || []).map(w => {
      const isFinesse = (w.traits || []).some(t => t.toLowerCase().includes("finesse") || t.toLowerCase().includes("acurada"));
      const isAgile = (w.traits || []).some(t => t.toLowerCase().includes("ágil") || t.toLowerCase().includes("agile"));
      const isRanged = (w.traits || []).some(t => t.toLowerCase().includes("distância") || t.toLowerCase().includes("arco") || t.toLowerCase().includes("fogo"));
      
      const attackAttr = (isFinesse || isRanged) ? Math.max(mods.str, mods.dex) : mods.str;
      const attackAttrType = (isFinesse || isRanged) && mods.dex >= mods.str ? "dex" : "str";
      const strikeStatusPenalty = attackAttrType === "dex" ? effectiveClumsyPenalty : conditionMods.strStatusPenalty;
      const strikeStatusBonus = conditionMods.blessed ? 1 : 0;

      const weapProfRank = character.weaponProficiencies?.[w.category] || "Treinado";
      const weapProfBonus = this.getProficiencyBonus(weapProfRank, level);
      const itemAttack = w.itemBonus || 0;
      
      const attackTotal = attackAttr + weapProfBonus + itemAttack - strikeStatusPenalty + strikeStatusBonus;
      
      // MAP (Multi Attack Penalty)
      const map1 = attackTotal;
      const map2 = attackTotal - (isAgile ? 4 : 5);
      const map3 = attackTotal - (isAgile ? 8 : 10);

      // Dano
      let damageAttrBonus = isRanged ? 0 : mods.str;
      if (w.traits?.some(t => t.toLowerCase().includes("propulsivo"))) {
        damageAttrBonus = Math.max(0, Math.floor(mods.str / 2));
      }
      const damageEnfeebledPenalty = isRanged ? 0 : conditionMods.enfeebled;
      const netDamageBonus = Math.max(0, damageAttrBonus + (w.damageBonus || 0) - damageEnfeebledPenalty);
      const damageStr = `${w.damage} ${this.formatMod(netDamageBonus)}`;

      const damageDetails = this.calculateStrikeDamageDetails(w, mods, { level });

      return {
        ...w,
        attackTotal,
        map: [map1, map2, map3],
        damageFormatted: damageStr,
        damageDetails
      };
    });

    const rawLandSpeed = (heritageOption?.speed !== undefined ? heritageOption.speed : (ancestryData.speed ?? 25)) + (character.speedBonus || 0) + (equippedArmor.speedPenalty || 0);
    const finalLandSpeed = rawLandSpeed > 0 ? Math.max(5, rawLandSpeed + encumberedSpeedPenalty) : 0;
    const senses = this.getCharacterSenses(character);
    const trainedSkills = this.calculateTrainedSkillsCount(character);

    return {
      level,
      scores,
      mods,
      maxHp,
      currentHp: character.currentHp !== undefined ? character.currentHp : maxHp,
      tempHp: character.tempHp || 0,
      ac: {
        total: acTotal,
        item: itemAcBonus,
        dex: effectiveDex,
        prof: armorProfBonus,
        shield: shieldBonus,
        offGuardPenalty: conditionMods.circumstanceAcPenalty,
        statusPenalty: effectiveClumsyPenalty
      },
      size: sizeOption?.size ?? ancestryData.size ?? character.size ?? "Médio",
      speed: finalLandSpeed,
      movementSpeeds: {
        land: finalLandSpeed,
        swim: heritageOption?.swimSpeed ?? ancestryData.swimSpeed ?? 0,
        climb: heritageOption?.climbSpeed ?? ancestryData.climbSpeed ?? 0
      },
      senses,
      saves,
      perception: {
        rank: percRank,
        total: perceptionTotal
      },
      skills: skillsCalculated,
      loreSkills: loreCalculated,
      trainedSkills,
      classDc,
      bulk: {
        max: maxBulk,
        encumbered: encumberedBulk,
        current: currentBulk,
        total: currentBulk,
        coinBulk,
        coinsBulk: coinBulk,
        isEncumbered
      },
      conditions: conditionMods,
      spellSlots: this.getSpellSlots(character),
      strikes
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PF2E_ENGINE;
}
