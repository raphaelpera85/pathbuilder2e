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

  // Runas só são aplicadas quando vinculadas ao equipamento. Itens guardados no
  // inventário continuam sendo apenas itens até que o jogador os associe.
  isRuneCompatible(rune, equipmentType) {
    const token = typeof rune === "string"
      ? rune.toLowerCase()
      : String(rune?.id || rune?.name || rune?.names?.["pt-BR"] || rune?.names?.en || "").toLowerCase();
    const isArmorRune = /armor[_ -]?potency|pot[eê]ncia de armadura|resilient|resiliente/.test(token);
    const isWeaponRune = /weapon[_ -]?potency|pot[eê]ncia de arma|striking|impactante|impacto/.test(token);
    if (!equipmentType || (!isArmorRune && !isWeaponRune)) return true;
    return equipmentType === "armor" ? !isWeaponRune : !isArmorRune;
  },

  getRuneBonuses(item = {}, equipmentType) {
    const attached = [
      ...(Array.isArray(item.runes) ? item.runes : []),
      item.potencyRune,
      item.strikingRune,
      item.armorPotencyRune,
      item.resilientRune
    ].filter(Boolean).filter(rune => this.isRuneCompatible(rune, equipmentType));
    const text = attached.map(rune => {
      if (typeof rune === "string") return rune.toLowerCase();
      return String(rune?.id || rune?.name || rune?.names?.["pt-BR"] || rune?.names?.en || "").toLowerCase();
    }).join(" ");
    const explicitPotency = Number(item.potencyRune || item.armorPotencyRune);
    const potencyTerms = /(?:weapon[_ -]?potency|armor[_ -]?potency|pot[eê]ncia(?: de arma| de armadura)?)/i;
    const potency = Number.isFinite(explicitPotency) && explicitPotency > 0
      ? explicitPotency
      : attached.reduce((max, rune) => {
        const token = typeof rune === "string"
          ? rune
          : String(rune?.id || rune?.name || rune?.names?.["pt-BR"] || rune?.names?.en || "");
        if (!potencyTerms.test(token)) return max;
        const before = token.match(/(?:^|[^0-9])([1-3])[^a-z]*(?:weapon|armor|pot[eê]ncia)/i)?.[1];
        const after = token.match(/(?:weapon[_ -]?potency|armor[_ -]?potency|pot[eê]ncia(?: de arma| de armadura)?)[^0-9]*([1-3])/i)?.[1];
        return Math.max(max, Number(before || after || 0));
      }, 0);
    const hasResilient = Boolean(item.resilientRune) || /resilient|resiliente/.test(text);
    const striking = attached.reduce((max, rune) => {
      const token = typeof rune === "string"
        ? rune.toLowerCase()
        : String(rune?.id || rune?.name || rune?.names?.["pt-BR"] || rune?.names?.en || "").toLowerCase();
      if (!/(striking|impactante|impacto)/i.test(token)) return max;
      if (/major|maior|superior/i.test(token)) return Math.max(max, 3);
      if (/greater/i.test(token)) return Math.max(max, 2);
      return Math.max(max, 1);
    }, 0);
    return { potency, striking, resilient: hasResilient ? 1 : 0 };
  },

  addWeaponRuneDice(formula, extraDice) {
    if (!extraDice || !formula) return formula;
    const match = String(formula).match(/^(\d+)(d\d+)(.*)$/i);
    if (!match) return formula;
    return `${Number(match[1]) + extraDice}${match[2]}${match[3]}`;
  },

  getAutomaticBonusProgression(level, enabled = false) {
    if (!enabled) return { attackPotency: 0, strikingDice: 0, armorPotency: 0, saveResilience: 0, skillPotency: 0 };
    const currentLevel = Math.max(1, Number(level) || 1);
    return {
      attackPotency: currentLevel >= 16 ? 3 : currentLevel >= 10 ? 2 : currentLevel >= 2 ? 1 : 0,
      strikingDice: currentLevel >= 19 ? 3 : currentLevel >= 12 ? 2 : currentLevel >= 4 ? 1 : 0,
      armorPotency: currentLevel >= 18 ? 3 : currentLevel >= 11 ? 2 : currentLevel >= 5 ? 1 : 0,
      saveResilience: currentLevel >= 20 ? 3 : currentLevel >= 14 ? 2 : currentLevel >= 8 ? 1 : 0,
      skillPotency: currentLevel >= 17 ? 3 : currentLevel >= 9 ? 2 : currentLevel >= 3 ? 1 : 0
    };
  },

  // Normaliza companheiros provenientes do catálogo React ou do legado sem
  // inventar CA, PV, percepção ou ataques quando a fonte não os fornece.
  calculateCompanionStats(character, companion = {}) {
    const catalogs = [
      ...(Array.isArray(character?.pets) ? character.pets : []),
      ...(Array.isArray(globalThis?.PF2E_DATA?.pets) ? globalThis.PF2E_DATA.pets : []),
      ...(Array.isArray(globalThis?.pathbuilderCatalogs?.pets) ? globalThis.pathbuilderCatalogs.pets : [])
    ];
    const identity = value => String(value?.id || value?.name || value?.names?.["pt-BR"] || value?.names?.en || value || "").toLocaleLowerCase();
    const source = catalogs.find(candidate => candidate !== companion && identity(candidate) === identity(companion)) || companion;
    const attacks = Array.isArray(source.attacks) ? source.attacks.map(attack => ({
      ...attack,
      bonus: attack.bonus === undefined ? undefined : Number(attack.bonus)
    })) : [];
    return {
      ...source,
      name: companion.name || source.name,
      type: companion.type || source.type,
      hpMax: Number(companion.hpMax ?? source.hpMax ?? source.hp) || undefined,
      hpCurrent: Number(companion.hpCurrent ?? companion.currentHp ?? source.hpCurrent ?? source.hpMax ?? source.hp) || undefined,
      ac: Number(companion.ac ?? source.ac) || undefined,
      perception: companion.perception ?? source.perception,
      speed: companion.speed ?? source.speed,
      attacks,
      supportBenefit: companion.supportBenefit ?? source.supportBenefit,
      specialAbility: companion.specialAbility ?? source.specialAbility
    };
  },

  getAmmunitionStatus(character, weapon = {}) {
    const traits = Array.isArray(weapon.traits) ? weapon.traits : [];
    const weaponText = `${weapon.id || ""} ${weapon.name || ""} ${traits.join(" ")}`.toLowerCase();
    const requiredType = weapon.ammunitionType || (
      /arco|bow/.test(weaponText) ? "arrow" :
        /besta|crossbow/.test(weaponText) ? "bolt" :
          /fogo|firearm|pistol|rifle|mosquete|arcabuz|gun/.test(weaponText) ? "bullet" : null
    );
    const requiresAmmunition = traits.some(trait => /recarga|reload|pente|magazine|muni[cç][aã]o|ammunition/i.test(String(trait))) || Boolean(weapon.requiresAmmunition);
    const ammunition = (character?.inventory || []).filter(item => {
      const text = `${item?.id || ""} ${item?.name || ""} ${(item?.traits || []).join(" ")} ${item?.subCategory || ""}`;
      if (!/ammunition|muni[cç][aã]o|bullet|balas|bolt|virote|sphere|esfera|arrow|flecha/i.test(text)) return false;
      if (!requiredType) return true;
      if (requiredType === "arrow") return /arrow|flecha/i.test(text);
      if (requiredType === "bolt") return /bolt|virote/i.test(text);
      return /bullet|bala|sphere|esfera/i.test(text);
    });
    const quantity = ammunition.reduce((total, item) => total + Math.max(0, Number(item.qty) || 1), 0);
    return {
      requiresAmmunition,
      quantity,
      available: !requiresAmmunition || quantity > 0,
      requiredType,
      reload: weapon.reload ?? traits.find(trait => /recarga|reload/i.test(String(trait)))
    };
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

  resolveCatalogRecord(collection, value) {
    const normalize = (candidate) => String(candidate || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const valueIdentity = value && typeof value === "object"
      ? value.id || value.name || value["pt-BR"] || value.en || value.es
      : value;
    const needle = normalize(valueIdentity);
    return Object.entries(collection || {}).map(([key, record]) => ({ key, record: record || {} })).find(({ key, record }) => {
      return [key, record.id, record.name, ...Object.values(record.names || {})].filter(Boolean).some(candidate => normalize(candidate) === needle);
    })?.record || null;
  },

  getSpellcastingProfile(character) {
    return this.resolveCatalogRecord(PF2E_DATA.classes, character?.class)?.spellcasting || null;
  },

  getMaximumSpellRank(character) {
    const level = Math.min(20, Math.max(1, Number(character?.level) || 1));
    return Math.min(10, Math.ceil(level / 2));
  },

  getSpellCompatibility(character, spell) {
    const profile = this.getSpellcastingProfile(character);
    if (!profile) return { state: "incompatible", reason: "no-spellcasting", tradition: "", maximumRank: 0 };

    // Class-gated and explicitly gated spells must not leak into a generic
    // spell list. Keep rank/tradition checks below, but reuse the prerequisite
    // interpreter for gates independent of the casting tradition.
    const prerequisiteCompatibility = this.getPrerequisiteCompatibility(character, spell);
    if (prerequisiteCompatibility?.state === "incompatible") {
      return { ...prerequisiteCompatibility, tradition: "", maximumRank: this.getMaximumSpellRank(character) };
    }

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

  // Valida pré-requisitos explícitos antes de permitir uma seleção no picker.
  // Regras que não conseguem ser interpretadas com segurança ficam disponíveis
  // para revisão manual, em vez de serem bloqueadas por uma inferência.
  getPrerequisiteCompatibility(character, record) {
    const char = character || {};
    const item = record || {};
    const identityValue = (value) => value && typeof value === "object"
      ? value.id || value.name || value["pt-BR"] || value.en || value.es || ""
      : value;
    const normalize = (value) => String(identityValue(value) || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const level = Math.max(1, Number(char.level) || 1);
    // O nível de um talento é também o nível mínimo para selecioná-lo. Para
    // itens e magias, `level` é o nível do objeto/magia e não deve bloquear a
    // seleção por si só; esses casos usam `requiredLevel` explícito quando
    // existir uma exigência de personagem.
    const isFeatRecord = String(item.id || "").startsWith("feat.") || /^(talento|feat)$/i.test(String(item.type || item.category || ""));
    const isArchetypeRecord = String(item.id || "").startsWith("archetype.");
    const inferredLevel = isArchetypeRecord
      ? (item.level ?? item.dedicationLevel)
      : (isFeatRecord || item.prereq !== undefined || item.prerequisites !== undefined || item.classId || item.classIds?.length || item.ancestryId || item.ancestryIds?.length) ? item.level : undefined;
    const requiredLevel = Number(item.requiredLevel ?? item.minimumLevel ?? inferredLevel);
    if (Number.isInteger(requiredLevel) && level < requiredLevel) {
      return { state: "incompatible", reason: "level-too-low", requiredLevel };
    }
    if (item.requiresDeviant && !(char.deviant || char.hasDeviantAbility || (Array.isArray(char.deviantAbilities) && char.deviantAbilities.length > 0))) {
      return { state: "incompatible", reason: "deviant-required" };
    }

    const resolveCatalogRecord = (collection, value) => {
      const needle = normalize(value);
      return Object.entries(collection || {}).map(([key, record]) => ({ key, record: record || {} })).find(({ key, record }) => {
        const candidates = [key, record.id, record.name, ...Object.values(record.names || {})].filter(Boolean).map(normalize);
        return candidates.includes(needle);
      })?.record;
    };
    const classIds = Array.isArray(item.classIds) && item.classIds.length ? item.classIds : item.classId ? [item.classId] : [];
    if (classIds.length) {
      const selectedClass = resolveCatalogRecord(PF2E_DATA?.classes, char.class);
      if (!selectedClass?.id || !classIds.includes(selectedClass.id)) {
        return { state: "incompatible", reason: "class-mismatch" };
      }
    }
    const ancestryIds = Array.isArray(item.ancestryIds) && item.ancestryIds.length ? item.ancestryIds : item.ancestryId ? [item.ancestryId] : [];
    if (ancestryIds.length) {
      const selectedAncestry = resolveCatalogRecord(PF2E_DATA?.ancestries, char.ancestry);
      if (!selectedAncestry?.id || !ancestryIds.includes(selectedAncestry.id)) return { state: "incompatible", reason: "ancestry-mismatch" };
    }

    const raw = item.prereq ?? item.prerequisites;
    const prerequisites = Array.isArray(raw) ? raw : raw ? [raw] : [];
    if (!prerequisites.length) return { state: "available", reason: "no-prerequisite" };
    const abilities = { forca: "str", strength: "str", destreza: "dex", dexterity: "dex", constituicao: "con", constitution: "con", inteligencia: "int", intelligence: "int", sabedoria: "wis", wisdom: "wis", carisma: "cha", charisma: "cha" };
    const skillAliases = {
      acrobacia: "acrobatics", acrobatics: "acrobatics",
      atletismo: "athletics", athletics: "athletics",
      medicina: "medicine", medicine: "medicine",
      intimidacao: "intimidation", intimidation: "intimidation",
      diplomacia: "diplomacy", diplomacy: "diplomacy",
      enganacao: "deception", deception: "deception",
      dissimulacao: "deception", bluff: "deception",
      furtividade: "stealth", stealth: "stealth",
      ladinagem: "thievery", thievery: "thievery",
      arcana: "arcana", arcanismo: "arcana",
      natureza: "nature", nature: "nature",
      ocultismo: "occultism", occultism: "occultism",
      religiao: "religion", religion: "religion",
      sociedade: "society", society: "society",
      manufatura: "crafting", crafting: "crafting", artesania: "crafting",
      atuacao: "performance", performance: "performance", interpretacion: "performance",
      percepcao: "perception", perception: "perception",
      cavalgar: "nature", riding: "nature", "animal handling": "nature"
    };
    const rankValues = { destreinado: 0, untrained: 0, sin_entrenar: 0, treinado: 2, trained: 2, entrenado: 2, especialista: 4, expert: 4, experto: 4, mestre: 6, master: 6, maestro: 6, lendario: 8, legendary: 8, legendario: 8, u: 0, t: 2, e: 4, m: 6, l: 8 };
    // Fichas importadas podem guardar a chave completa, o ID ou apenas o nome
    // localizado da classe. Reutilize o mesmo resolvedor para não perder as
    // proficiências ao validar pré-requisitos de armas/armaduras.
    const classRecord = resolveCatalogRecord(PF2E_DATA?.classes, char.class) || {};
    const ancestryRecord = resolveCatalogRecord(PF2E_DATA?.ancestries, char.ancestry) || {};
    const heritageRecord = (PF2E_DATA?.heritages || []).find((heritage) => [heritage.id, heritage.name, ...Object.values(heritage.names || {})]
      .filter(Boolean).map(normalize).includes(normalize(char.heritage))) || {};
    const selectedClassText = normalize(char.class);
    const selectedAncestryText = normalize(char.ancestry);
    const selectedFeats = (char.feats || []).concat(char.archetypes || []).map((entry) => normalize(entry?.name || entry));
    const shieldRank = char.shieldProficiency ?? char.shieldsProficiency ?? classRecord.shields?.Geral ?? classRecord.shields?.General;
    const isUndeadCharacter = Boolean(char.isUndead)
      || [ancestryRecord, heritageRecord].some((record) => (record.traits || []).some((trait) => /morto[- ]vivo|undead|muerto viviente|no muerto/.test(normalize(trait))))
      || /skeleton|esqueleto/.test(normalize(ancestryRecord.id || char.ancestry));
    const catalogNames = (collection) => Object.entries(collection || {}).flatMap(([key, value]) => {
      const record = value || {};
      return [key, record.name, ...(Object.values(record.names || {}))].filter(Boolean).map(normalize);
    });
    const classNames = new Set(catalogNames(PF2E_DATA?.classes));
    const ancestryNames = new Set(catalogNames(PF2E_DATA?.ancestries));
    const getSkillRank = (skillName) => {
      const skillKey = skillAliases[normalize(skillName)] || normalize(skillName);
      if (skillKey === "perception") return rankValues[normalize(char.perceptionRank)] ?? (Number(char.perceptionRank) || 0);
      const rawRank = char.skills?.[skillKey] ?? char.skills?.[skillName];
      return rankValues[normalize(rawRank)] ?? (Number(rawRank) || 0);
    };
    let recognized = 0;

    for (const prerequisite of prerequisites) {
      const text = normalize(typeof prerequisite === "string" ? prerequisite : prerequisite?.text || prerequisite?.name);
      if (!text || text === "nenhum" || text === "none") { recognized++; continue; }
      if (/voce esta morto[- ]vivo|you are undead|eres muerto viviente|eres no muerto/.test(text)) {
        recognized++;
        if (!isUndeadCharacter) return { state: "incompatible", reason: "undead-required" };
        continue;
      }
      const levelMatch = text.match(/(?:nivel|level)\s*(\d+)/);
      if (levelMatch) {
        recognized++;
        if (level < Number(levelMatch[1])) return { state: "incompatible", reason: "level-too-low", requiredLevel: Number(levelMatch[1]) };
        continue;
      }
      const abilityMatches = [...text.matchAll(/(forca|strength|destreza|dexterity|constituicao|constitution|inteligencia|intelligence|sabedoria|wisdom|carisma|charisma)\s*\+\s*(\d+)/g)];
      if (abilityMatches.length) {
        recognized++;
        const meetsRequirement = ([_, abilityName, required]) => {
          const key = abilities[abilityName];
          const score = Number(char.abilities?.[key]);
          return Number.isFinite(score) && this.getModifier(score) >= Number(required);
        };
        const meets = text.includes(" ou ") || text.includes(" or ") ? abilityMatches.some(meetsRequirement) : abilityMatches.every(meetsRequirement);
        if (!meets) return { state: "incompatible", reason: "ability-too-low", ability: abilities[abilityMatches[0][1]], required: Number(abilityMatches[0][2]) };
        continue;
      }
      const abilityScoreMatch = text.match(/^(forca|strength|destreza|dexterity|constituicao|constitution|inteligencia|intelligence|sabedoria|wisdom|carisma|charisma)\s+(\d+)$/);
      if (abilityScoreMatch) {
        recognized++;
        const abilityKey = abilities[abilityScoreMatch[1]];
        const actualScore = Number(char.abilities?.[abilityKey]);
        if (!Number.isFinite(actualScore) || actualScore < Number(abilityScoreMatch[2])) return { state: "incompatible", reason: "ability-too-low", ability: abilityKey, requiredScore: Number(abilityScoreMatch[2]) };
        continue;
      }
      const compoundSkillMatch = text.match(/^(treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|in|en)?\s*(.+)$/);
      if (compoundSkillMatch && /\s+(?:e|and|y)\s+/.test(compoundSkillMatch[2])) {
        recognized++;
        const requiredRank = rankValues[compoundSkillMatch[1]] ?? 2;
        const components = compoundSkillMatch[2].split(/\s+(?:e|and|y)\s+/).map((part) => part.trim()).filter(Boolean);
        const meetsComponent = (component) => {
          const componentWithoutRank = component.replace(/^(?:treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|in|en)?\s*/, "").trim();
          const featMatch = componentWithoutRank.match(/^(?:talento|feat|dote)\s+(.+)$/);
          const componentText = featMatch ? featMatch[1].trim() : componentWithoutRank;
          if (featMatch) {
            return selectedFeats.some((feat) => feat.includes(normalize(componentText)));
          }
          if (/(?:arma|weapon|desarmad|unarmed|armadura|armor|escudo|shield)/.test(componentText)) {
            if (/(?:escudo|shield)/.test(componentText) && shieldRank !== undefined) {
              return (rankValues[normalize(shieldRank)] ?? 0) >= requiredRank;
            }
            const targetRank = componentText.includes("marcia") || componentText.includes("martial") ? classRecord.weapons?.Marcial
              : componentText.includes("simples") || componentText.includes("simple") ? classRecord.weapons?.Simples
                : componentText.includes("avancad") || componentText.includes("advanced") ? classRecord.weapons?.Avançada
                  : componentText.includes("desarmad") || componentText.includes("unarmed") ? classRecord.weapons?.Desarmado
                    : componentText.includes("leve") || componentText.includes("light") ? classRecord.armor?.Leve
                      : componentText.includes("media") || componentText.includes("medium") ? classRecord.armor?.Média
                        : componentText.includes("pesad") || componentText.includes("heavy") ? classRecord.armor?.Pesada
                          : undefined;
            // Armas específicas (por exemplo, armas de fogo) ainda não têm
            // proficiência granular no modelo; não bloqueie por inferência.
            if (targetRank === undefined) return true;
            return (rankValues[normalize(targetRank)] ?? 0) >= requiredRank;
          }
          const alternatives = componentText.split(/,|\s+(?:ou|or|o)\s+/).map((skill) => skill.trim()).filter(Boolean);
          const knownSkills = alternatives.filter((skill) => skillAliases[skill] || skillAliases[normalize(skill)]);
          if (!knownSkills.length) return true;
          return knownSkills.some((skill) => getSkillRank(skill) >= requiredRank);
        };
        if (!components.every(meetsComponent)) return { state: "incompatible", reason: "skill-rank-too-low", requiredRank: compoundSkillMatch[1] };
        continue;
      }
      const skillMatch = text.match(/^(treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|in|en)?\s*(.+)$/);
      const isCombatProficiency = skillMatch && /(arma|weapon|desarmad|unarmed|armadura|armor|escudo|shield)/.test(skillMatch[2]);
      if (skillMatch && !isCombatProficiency) {
        recognized++;
        const skillRequirements = skillMatch[2].split(/,|\s+ou\s+|\s+or\s+/).map((skill) => skill.trim()).filter(Boolean);
        const requiredRankText = skillMatch[1];
        const requiredRank = rankValues[requiredRankText] ?? 2;
        const meetsAny = skillRequirements.some((skillName) => {
          const actual = getSkillRank(skillName);
          return actual >= requiredRank;
        });
        if (!meetsAny) return { state: "incompatible", reason: "skill-rank-too-low", skill: skillRequirements[0], requiredRank: requiredRankText };
        continue;
      }
      const standaloneSkill = skillAliases[text];
      if (standaloneSkill) {
        recognized++;
        if (getSkillRank(text) < rankValues.trained) {
          return { state: "incompatible", reason: "skill-rank-too-low", skill: standaloneSkill, requiredRank: "trained" };
        }
        continue;
      }
      if (text.includes("classe ") && !text.includes("talento de classe")) {
        recognized++;
        const classRequirements = text.replace(/^.*classe\s+/, "").split(/\s+ou\s+|\s+or\s+/).map((requirement) => requirement.trim()).filter(Boolean);
        if (classRequirements.length && !classRequirements.some((requirement) => selectedClassText.includes(requirement))) return { state: "incompatible", reason: "class-mismatch" };
        continue;
      }
      if (classNames.has(text)) {
        recognized++;
        if (!selectedClassText.includes(text)) return { state: "incompatible", reason: "class-mismatch" };
        continue;
      }
      if (text.includes("ancestralidade ") || text.includes("ancestry ")) {
        recognized++;
        const ancestryRequirements = text.replace(/^.*(?:ancestralidade|ancestry)\s+/, "").split(/\s+ou\s+|\s+or\s+/).map((requirement) => requirement.trim()).filter(Boolean);
        if (ancestryRequirements.length && !ancestryRequirements.some((requirement) => selectedAncestryText.includes(requirement))) return { state: "incompatible", reason: "ancestry-mismatch" };
        continue;
      }
      if (ancestryNames.has(text)) {
        recognized++;
        if (!selectedAncestryText.includes(text)) return { state: "incompatible", reason: "ancestry-mismatch" };
        continue;
      }
      const proficiencyRequirement = text.match(/^(treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|com|in|en|with|con)\s+(.+)$/);
      const proficiencyTarget = proficiencyRequirement?.[2] || "";
      if (proficiencyRequirement && /(arma|weapon|desarmad|unarmed|armadura|armor|escudo|shield)/.test(proficiencyTarget)) {
        recognized++;
        const requiredRank = rankValues[proficiencyRequirement[1]] ?? 2;
        const targets = proficiencyTarget.split(/\s+ou\s+|\s+or\s+/).map((target) => target.trim());
        const meetsAny = targets.some((target) => {
          const normalizedTarget = target.trim();
          if (/(?:escudo|shield)/.test(normalizedTarget) && shieldRank !== undefined) {
            return (rankValues[normalize(shieldRank)] ?? 0) >= requiredRank;
          }
          const weaponContext = /arma|weapon|desarmad|unarmed|marcia|martial|simple|simples|avancad|advanced/.test(proficiencyTarget);
          const armorContext = /armadura|armor|escudo|shield|leve|light|media|medium|pesad|heavy/.test(proficiencyTarget);
          const targetRank = normalizedTarget.includes("marcia") || normalizedTarget.includes("martial") ? classRecord.weapons?.Marcial
            : normalizedTarget.includes("simples") || normalizedTarget.includes("simple") ? classRecord.weapons?.Simples
              : normalizedTarget.includes("avancad") || normalizedTarget.includes("advanced") ? classRecord.weapons?.Avançada
                : normalizedTarget.includes("desarmad") || normalizedTarget.includes("unarmed") ? classRecord.weapons?.Desarmado
                  : normalizedTarget.includes("leve") || normalizedTarget.includes("light") ? classRecord.armor?.Leve
                    : normalizedTarget.includes("media") || normalizedTarget.includes("medium") ? classRecord.armor?.Média
                      : normalizedTarget.includes("pesad") || normalizedTarget.includes("heavy") ? classRecord.armor?.Pesada
                        : weaponContext && /^(?:marcial|martial|simples|simple|avancada|advanced)$/.test(normalizedTarget) ? classRecord.weapons?.[normalizedTarget.includes("marcial") || normalizedTarget.includes("martial") ? "Marcial" : normalizedTarget.includes("avanc") || normalizedTarget.includes("advanced") ? "Avançada" : "Simples"]
                            : armorContext && /^(?:leve|light|media|medium|pesada|heavy)$/.test(normalizedTarget) ? classRecord.armor?.[normalizedTarget.includes("leve") || normalizedTarget.includes("light") ? "Leve" : normalizedTarget.includes("pesad") || normalizedTarget.includes("heavy") ? "Pesada" : "Média"]
                            : undefined;
          // Fichas legadas podem não carregar proficiência granular; nesse caso
          // não invente uma penalidade nem oculte a opção.
          if (targetRank === undefined) return true;
          return (rankValues[normalize(targetRank)] ?? 0) >= requiredRank;
        });
        if (!meetsAny) return { state: "incompatible", reason: "proficiency-too-low", requiredRank: proficiencyRequirement[1] };
        continue;
      }
      if (text.includes("conjurador") || text.includes("spellcaster")) {
        recognized++;
        if (!this.getSpellcastingProfile(char)) return { state: "incompatible", reason: "spellcasting-required" };
        continue;
      }
      if (text.includes("dedicacao de ") && (text.includes(" ou ") || text.includes(" or "))) {
        recognized++;
        const options = text.split(/\s+(?:ou|or)\s+/).map((option) => option.trim()).filter(Boolean);
        const meetsDedicationOption = (option) => {
          if (option.includes("dedicacao de ")) {
            const requiredDedication = option.replace(/^.*dedicacao de\s+/, "").trim();
            return selectedFeats.some((feat) => feat.includes(requiredDedication));
          }
          if (option.includes("talento ") || option.includes("feat ") || option.includes("dote ")) {
            const requiredFeat = option.replace(/^.*?(?:talento|feat|dote)\s+(?:de classe de [^ ]+\s+)?/, "").trim();
            return selectedFeats.some((feat) => feat.includes(requiredFeat));
          }
          return false;
        };
        if (!options.some(meetsDedicationOption)) return { state: "incompatible", reason: "dedication-required" };
        continue;
      }
      if (text.includes("dedicacao de ") || text.includes("dedication: ")) {
        recognized++;
        const dedication = text.replace(/^.*(?:dedicacao de|dedication:)\s*/, "").trim();
        if (dedication && !selectedFeats.some((feat) => feat.includes(dedication))) return { state: "incompatible", reason: "dedication-required" };
      }
    }
    return { state: "available", reason: recognized ? "prerequisites-met" : "prerequisite-review" };
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

    const configuredFocusMax = character?.focusPointsMax !== undefined
      ? character.focusPointsMax
      : (character?.focusPoints !== undefined || character?.focusPointsCurrent !== undefined ? 1 : 0);
    const maxFocusPoints = Math.min(3, Math.max(0, Number(configuredFocusMax) || 0));
    const configuredFocus = character?.focusPointsCurrent !== undefined ? character.focusPointsCurrent : character?.focusPoints;
    const focusPoints = Math.min(maxFocusPoints, Math.max(0, Number(configuredFocus) || 0));

    return {
      cantrips,
      maxRank,
      slots,
      focusPoints,
      maxFocusPoints,
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
    const ancestryData = this.resolveCatalogRecord(PF2E_DATA.ancestries, character?.ancestry) || {};
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
    const classData = this.resolveCatalogRecord(PF2E_DATA.classes, character?.class) || {};
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
    const classData = this.resolveCatalogRecord(PF2E_DATA.classes, character?.class) || {};
    const classBase = classData.trainedSkillsCount || 2;
    const scores = character?.abilities || { int: 10 };
    const intMod = this.getModifier(scores.int);
    const fixedSkills = classData.fixedSkills || [];
    
    const bgData = this.resolveCatalogRecord(PF2E_DATA.backgrounds, character?.background) || {};
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
    const ancestryData = this.resolveCatalogRecord(PF2E_DATA.ancestries, character?.ancestry) || {};
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
    const safeIncomingDamage = Math.max(0, Number(incomingDamage) || 0);
    const hardness = Number(shield?.hardness) || 0;
    const currentHp = Number(shield?.currentHp !== undefined ? shield.currentHp : shield?.maxHp) || 0;
    const maxHp = Number(shield?.maxHp) || 0;
    const bt = Number(shield?.bt !== undefined ? shield.bt : Math.floor(maxHp / 2)) || 0;

    const damageBlocked = Math.min(safeIncomingDamage, hardness);
    const excessDamage = Math.max(0, safeIncomingDamage - hardness);
    const newShieldHp = Math.max(0, currentHp - excessDamage);

    return {
      incomingDamage: safeIncomingDamage,
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
    const runeBonuses = this.getRuneBonuses(weapon, "weapon");
    const strikingDice = Math.max(runeBonuses.striking, Number(options?.abpStrikingDice) || 0);
    activeDice = this.addWeaponRuneDice(activeDice, strikingDice);

    // Normal static bonus
    const strBonus = isRanged ? propulsiveBonus : (mods.str || 0);
    const staticMod = strBonus + (Number(weapon?.damageBonus) || 0);
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
        deadly: Boolean(deadlyTrait),
        potency: runeBonuses.potency,
        striking: strikingDice
      },
      runeBonuses
    };
  },

  // Retorna os modificadores e penalidades ativas de condições vivas
  getConditionModifiers(characterOrConditions) {
    let raw = characterOrConditions?.conditions ? characterOrConditions.conditions : (characterOrConditions || {});
    const conds = {};
    if (Array.isArray(raw)) {
      raw.forEach(c => {
        if (!c) return;
        const name = (c.name || "").toLowerCase();
        const val = Number(c.value !== undefined ? c.value : 1);
        if (name.includes("amedrontado") || name.includes("frightened")) conds.frightened = val;
        else if (name.includes("enjoado") || name.includes("sickened")) conds.sickened = val;
        else if (name.includes("desajeitado") || name.includes("clumsy")) conds.clumsy = val;
        else if (name.includes("debilitado") || name.includes("enfeebled")) conds.enfeebled = val;
        else if (name.includes("drenado") || name.includes("drained")) conds.drained = val;
        else if (name.includes("estupefato") || name.includes("stupefied")) conds.stupefied = val;
        else if (name.includes("desprevenido") || name.includes("off-guard") || name.includes("offguard")) conds.offGuard = true;
        else if (name.includes("caído") || name.includes("prone")) conds.prone = true;
        else if (name.includes("cego") || name.includes("blinded")) conds.blinded = true;
      });
    } else if (typeof raw === "object") {
      Object.assign(conds, raw);
    }

    const frightened = Number(conds.frightened || 0);
    const sickened = Number(conds.sickened || 0);
    const clumsy = Number(conds.clumsy || 0);
    const enfeebled = Number(conds.enfeebled || 0);
    const drained = Number(conds.drained || 0);
    const stupefied = Number(conds.stupefied || 0);
    const offGuard = Boolean(conds.offGuard || conds.prone || conds.blinded);

    const generalStatusPenalty = Math.max(frightened, sickened);
    const statusPenalty = Math.max(generalStatusPenalty, clumsy, enfeebled, drained, stupefied);
    const dexStatusPenalty = Math.max(generalStatusPenalty, clumsy);
    const strStatusPenalty = Math.max(generalStatusPenalty, enfeebled);
    const conStatusPenalty = Math.max(generalStatusPenalty, drained);
    const mentalStatusPenalty = Math.max(generalStatusPenalty, stupefied);
    const circumstanceAcPenalty = offGuard ? 2 : 0;
    const acPenalty = dexStatusPenalty + circumstanceAcPenalty;

    return {
      frightened,
      sickened,
      clumsy,
      enfeebled,
      drained,
      stupefied,
      offGuard,
      statusPenalty: generalStatusPenalty,
      generalStatusPenalty,
      dexStatusPenalty,
      strStatusPenalty,
      conStatusPenalty,
      mentalStatusPenalty,
      circumstanceAcPenalty,
      acPenalty
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
    const ancestryData = this.resolveCatalogRecord(PF2E_DATA.ancestries, character.ancestry) || { hp: 8 };
    const classData = this.resolveCatalogRecord(PF2E_DATA.classes, character.class) || { hpPerLevel: 10 };
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
    // Fichas antigas podem conter `pl` e fichas novas `pp`; se ambos
    // estiverem presentes, o valor não pode ser perdido pelo operador `||`.
    const totalCoins = (coins.pl || 0) + (coins.pp || 0) + (coins.gp || 0) + (coins.sp || 0) + (coins.cp || 0);
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

    const isAbp = Boolean(character.variantRules?.automaticBonusProgression);
    const abpBonuses = this.getAutomaticBonusProgression(level, isAbp);

    // 4. Classe de Armadura (CA)
    const equippedArmor = character.equippedArmor || { name: "Sem Armadura (Trajes)", category: "Sem Armadura", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0 };
    const armorProfRank = character.armorProficiencies?.[equippedArmor.category] || "Treinado";
    const armorProfBonus = this.getProficiencyBonus(armorProfRank, level);
    const effectiveDex = Math.min(mods.dex, equippedArmor.dexCap !== undefined ? equippedArmor.dexCap : 5);
    const shieldBonus = character.shieldRaised ? (character.shieldBonus || 2) : 0;
    const armorRunes = this.getRuneBonuses(equippedArmor, "armor");
    const itemAcBonus = (Number(equippedArmor.acBonus) || 0) + Math.max(armorRunes.potency, abpBonuses.armorPotency);
    const acTotal = 10 + itemAcBonus + effectiveDex + armorProfBonus + shieldBonus - conditionMods.circumstanceAcPenalty - effectiveClumsyPenalty;

    // 5. Salvaguardas
    const fortRank = character.savingThrows?.fortitude || classData.savingThrows?.fortitude || "Treinado";
    const reflexRank = character.savingThrows?.reflex || classData.savingThrows?.reflex || "Treinado";
    const willRank = character.savingThrows?.will || classData.savingThrows?.will || "Treinado";

    const resilientBonus = Math.max(armorRunes.resilient, abpBonuses.saveResilience);
    const saves = {
      fortitude: {
        rank: fortRank,
        prof: this.getProficiencyBonus(fortRank, level),
        mod: mods.con,
        item: Math.max(Number(character.itemBonuses?.fortitude) || 0, resilientBonus),
        statusPenalty: conditionMods.conStatusPenalty,
        total: mods.con + this.getProficiencyBonus(fortRank, level) + Math.max(Number(character.itemBonuses?.fortitude) || 0, resilientBonus) - conditionMods.conStatusPenalty
      },
      reflex: {
        rank: reflexRank,
        prof: this.getProficiencyBonus(reflexRank, level),
        mod: mods.dex,
        item: Math.max(Number(character.itemBonuses?.reflex) || 0, resilientBonus),
        statusPenalty: effectiveClumsyPenalty,
        total: mods.dex + this.getProficiencyBonus(reflexRank, level) + Math.max(Number(character.itemBonuses?.reflex) || 0, resilientBonus) - effectiveClumsyPenalty
      },
      will: {
        rank: willRank,
        prof: this.getProficiencyBonus(willRank, level),
        mod: mods.wis,
        item: Math.max(Number(character.itemBonuses?.will) || 0, resilientBonus),
        statusPenalty: conditionMods.mentalStatusPenalty,
        total: mods.wis + this.getProficiencyBonus(willRank, level) + Math.max(Number(character.itemBonuses?.will) || 0, resilientBonus) - conditionMods.mentalStatusPenalty
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
      const weaponRunes = this.getRuneBonuses(w, "weapon");
      const ammunition = this.getAmmunitionStatus(character, w);
      const itemAttack = Math.max(Number(w.itemBonus) || 0, weaponRunes.potency, abpBonuses.attackPotency);
      
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
      const netDamageBonus = Math.max(0, damageAttrBonus + (Number(w.damageBonus) || 0) - damageEnfeebledPenalty);
      const damageDetails = this.calculateStrikeDamageDetails(w, mods, { level, abpStrikingDice: abpBonuses.strikingDice });
      const damageStr = `${damageDetails.activeDice} ${this.formatMod(netDamageBonus)}`;

      return {
        ...w,
        attackTotal,
        map: [map1, map2, map3],
        damageFormatted: damageStr,
        damageDetails,
        runeBonuses: weaponRunes,
        ammunition
      };
    });

    const rawLandSpeed = (heritageOption?.speed !== undefined ? heritageOption.speed : (ancestryData.speed ?? 25)) + (character.speedBonus || 0) + (equippedArmor.speedPenalty || 0);
    const finalLandSpeed = rawLandSpeed > 0 ? Math.max(5, rawLandSpeed + encumberedSpeedPenalty) : 0;
    const senses = this.getCharacterSenses(character);
    const trainedSkills = this.calculateTrainedSkillsCount(character);

    // 10. Regras Variantes Oficiais (Automatic Bonus Progression - ABP)
    if (isAbp) {
      // Aplica ABP nos saves e perícias
      Object.keys(skillsCalculated).forEach(sKey => {
        if (skillsCalculated[sKey].rank !== "Destreinado" && skillsCalculated[sKey].rank !== "U") {
          skillsCalculated[sKey].total += abpBonuses.skillPotency;
        }
      });
    }

    const spellcasting = this.calculateSpellcasting(character);
    const readiness = this.validateCharacterReadiness(character);

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
      spellcasting,
      readiness,
      variantRules: character.variantRules || { freeArchetype: false, automaticBonusProgression: false, ancestryParagon: false },
      abpBonuses: {
        ...abpBonuses,
        // Alias legado preservado para fichas/exportadores já existentes.
        savingThrowResilience: abpBonuses.saveResilience
      },
      strikes,
      weaponStrikes: strikes
    };
  },

  // VALIDADOR DE PRONTIDÃO DE FICHA E REGRAS ABC
  validateCharacterReadiness(character) {
    const char = character || {};
    const identityText = (value) => {
      if (value && typeof value === "object") return String(value.id || value.name || value["pt-BR"] || value.en || value.es || "");
      return String(value || "");
    };
    const classText = identityText(char.class);
    const issues = [];
    let passedCount = 0;
    const totalChecks = 8;

    // 1. Ancestralidade
    if (!char.ancestry || char.ancestry === "Não definida" || char.ancestry === "Not set") {
      issues.push({ id: "ancestry", type: "error", message: "Ancestralidade não selecionada", tab: "build", targetId: "ancestryBtn" });
    } else {
      passedCount++;
    }

    // 2. Biografia (Background)
    if (!char.background || char.background === "Não definida" || char.background === "Not set") {
      issues.push({ id: "background", type: "error", message: "Biografia (Background) não selecionada", tab: "build", targetId: "backgroundBtn" });
    } else {
      passedCount++;
    }

    // 3. Classe
    if (!char.class || char.class === "Não definida" || char.class === "Not set") {
      issues.push({ id: "class", type: "error", message: "Classe não selecionada", tab: "build", targetId: "classBtn" });
    } else {
      passedCount++;
    }

    // 4. Subclasse (se aplicável)
    const classData = (typeof PF2E_DATA !== "undefined" && PF2E_DATA.classes) ? this.resolveCatalogRecord(PF2E_DATA.classes, char.class) : null;
    if (classData && classData.subclasses && classData.subclasses.length > 0 && (!char.subclass || char.subclass === "Não definida")) {
      issues.push({ id: "subclass", type: "warning", message: `Especialização / Subclasse de ${classText.split(" ")[0]} pendente`, tab: "build", targetId: "subclassBtn" });
    } else {
      passedCount++;
    }

    // 5. Atributos (Scores)
    const scores = char.abilities || {};
    const allSet = ["str", "dex", "con", "int", "wis", "cha"].every(a => typeof scores[a] === "number" && scores[a] >= 8);
    if (!allSet) {
      issues.push({ id: "abilities", type: "error", message: "Atributos incompletos ou não definidos", tab: "build", targetId: "setAbilitiesBtn" });
    } else {
      passedCount++;
    }

    // 6. Perícias Treinadas
    const skills = char.skills || {};
    const trainedSkills = Object.values(skills).filter(r => r === "Treinado" || r === "Especialista" || r === "Mestre" || r === "Lendário" || r === "T" || r === "E" || r === "M" || r === "L").length;
    const requiredSkills = (classData?.trainedSkillsCount || 3) + Math.max(0, Math.floor(((scores.int || 10) - 10) / 2));
    if (trainedSkills < requiredSkills) {
      issues.push({ id: "skills", type: "warning", message: `Perícias treinadas (${trainedSkills}/${requiredSkills}) abaixo do total permitido`, tab: "build", targetId: "skillTrainingBtn" });
    } else {
      passedCount++;
    }

    // 7. Equipamento e Armas
    if (!char.weapons || char.weapons.length === 0) {
      issues.push({ id: "weapons", type: "tip", message: "Nenhuma arma adicionada ao personagem", tab: "gear", targetId: "weaponsSection" });
    } else {
      passedCount++;
    }

    // 8. Divindade (se Clérigo ou Campeão)
    const isClericOrChampion = classText && (classText.includes("Clérigo") || classText.includes("Campeão") || classText.includes("Cleric") || classText.includes("Champion"));
    if (isClericOrChampion && (!char.deity || char.deity === "Não definida" || char.deity === "Not set")) {
      issues.push({ id: "deity", type: "error", message: "Divindade obrigatória para a classe não escolhida", tab: "details", targetId: "detailsDeityDisplay" });
    } else {
      passedCount++;
    }

    const percentage = Math.round((passedCount / totalChecks) * 100);
    return {
      isReady: issues.filter(i => i.type === "error").length === 0 && percentage >= 75,
      score: percentage,
      passedCount,
      totalChecks,
      issues
    };
  },

  // CÁLCULO DINÂMICO DE SPELLCASTING, SLOTS E CD DE MAGIAS
  calculateSpellcasting(character) {
    const char = character || {};
    const level = char.level || 1;
    const classData = (typeof PF2E_DATA !== "undefined" && PF2E_DATA.classes) ? this.resolveCatalogRecord(PF2E_DATA.classes, char.class) : null;
    const classIdentity = char.class && typeof char.class === "object"
      ? char.class.id || char.class.name || char.class["pt-BR"] || char.class.en || char.class.es
      : char.class;
    const classNames = [classData?.name, classData?.names?.["pt-BR"], classData?.names?.en, classData?.names?.es, classIdentity].filter(Boolean).map(value => String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    const spellData = (typeof PF2E_DATA !== "undefined" && PF2E_DATA.spellcastingByClass)
      ? Object.entries(PF2E_DATA.spellcastingByClass).find(([key]) => classNames.includes(String(key).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || classNames.some(name => String(key).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[0] === name.split(" ")[0]))?.[1]
      : null;

    if (!spellData) {
      return { isSpellcaster: false, tradition: null, keyAbility: null, spellDc: 0, spellAttack: 0, focusPoints: 0, maxFocusPoints: 0, slots: {} };
    }

    const scores = char.abilities || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const keyAttr = spellData.keyAbility || "int";
    const keyMod = this.getModifier(scores[keyAttr] || 10);
    const profRank = char.spellcastingRank || char.spellProficiency || "Treinado";
    const profBonus = this.getProficiencyBonus(profRank, level);
    const itemBonus = char.itemBonuses?.spellAttack || 0;
    const statusBonus = char.conditions?.blessed ? 1 : 0;
    const conditionMods = this.getConditionModifiers(char.conditions || {});

    let mentalPenalty = conditionMods.mentalStatusPenalty;
    if (keyAttr === "str") mentalPenalty = conditionMods.strStatusPenalty;
    else if (keyAttr === "dex") mentalPenalty = conditionMods.dexStatusPenalty;

    const spellDc = 10 + keyMod + profBonus - mentalPenalty;
    const spellAttack = keyMod + profBonus + itemBonus + statusBonus - mentalPenalty;

    const configuredFocusMax = char.focusPointsMax !== undefined
      ? char.focusPointsMax
      : (char.focusPoints !== undefined || char.focusPointsCurrent !== undefined ? 1 : 0);
    const maxFocusPoints = Math.min(3, Math.max(0, Number(configuredFocusMax) || 0));
    const configuredFocus = char.focusPointsCurrent !== undefined ? char.focusPointsCurrent : char.focusPoints;
    const currentFocusPoints = configuredFocus !== undefined
      ? Math.min(Math.max(0, Number(configuredFocus) || 0), maxFocusPoints)
      : maxFocusPoints;

    // Slots por círculo
    const slotsTable = spellData.slotsPerLevel?.[level] || [2];
    const slotsByRank = {};
    const slots = {
      cantrips: spellData.cantrips || 5,
      ranks: {}
    };

    slotsTable.forEach((maxSlots, index) => {
      const rankNum = index + 1;
      slotsByRank[rankNum] = maxSlots;
      const usedSlots = char.usedSpellSlots?.[rankNum] || 0;
      slots.ranks[rankNum] = {
        max: maxSlots,
        used: usedSlots,
        available: Math.max(0, maxSlots - usedSlots)
      };
    });

    const rawTrad = (spellData.tradition || "").toLowerCase();
    const tradition = rawTrad.includes("arc") ? "arcane" : (rawTrad.includes("div") ? "divine" : (rawTrad.includes("oc") ? "occult" : (rawTrad.includes("prim") ? "primal" : spellData.tradition)));

    return {
      hasSpellcasting: true,
      isSpellcaster: true,
      className: char.class,
      tradition,
      traditionName: spellData.traditionName || spellData.tradition,
      type: spellData.type,
      keyAbility: keyAttr,
      keyAttr: keyAttr,
      keyModifier: keyMod,
      rank: profRank,
      profBonus,
      dc: spellDc,
      spellDc,
      attackMod: spellAttack,
      spellAttack,
      focusPoints: currentFocusPoints,
      currentFocusPoints,
      maxFocusPoints,
      cantripsAllowed: spellData.cantrips || 5,
      slotsByRank,
      slots
    };
  },

  // APLICAÇÃO DE KIT INICIAL DE EQUIPAMENTO (1-CLIQUE)
  applyClassStarterKit(character, className) {
    if (!character || typeof PF2E_DATA === "undefined" || !PF2E_DATA.classStarterKits) return character;
    const selectedClass = String(character.class || "").toLowerCase();
    const classKey = String(className || "").split(" (")[0].toLowerCase();
    if (selectedClass && !selectedClass.includes(classKey) && !classKey.includes(selectedClass)) return character;
    const normalizeClass = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const requestedClass = normalizeClass(className);
    const kitKey = Object.keys(PF2E_DATA.classStarterKits).find((key) => {
      const normalizedKey = normalizeClass(key);
      return normalizedKey === requestedClass || normalizedKey.startsWith(`${requestedClass} (`) || normalizedKey.includes(`(${requestedClass})`) || requestedClass.startsWith(`${normalizedKey} (`);
    });
    const kit = kitKey ? PF2E_DATA.classStarterKits[kitKey] : null;
    if (!kit) return character;

    character.weapons = kit.weapons.map(w => ({ ...w, id: `wpn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` }));
    character.equippedArmor = { name: kit.armor, category: kit.armor.includes("Leve") || kit.armor.includes("Couro") ? "Leve" : (kit.armor.includes("Talas") || kit.armor.includes("Malha") || kit.armor.includes("Brunea") ? "Média" : "Sem Armadura") };
    character.inventory = [...(character.inventory || []), ...kit.items.map(it => ({ ...it, id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` }))];
    character.coins = { ...kit.remainingCoins, pl: 0, pp: 0 };

    return character;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PF2E_ENGINE;
}
