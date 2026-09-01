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
    const rawRank = String(rank ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const rankAliases = {
      u: 0, destreinado: 0, untrained: 0, sin_entrenar: 0,
      t: 2, treinado: 2, trained: 2, entrenado: 2,
      e: 4, especialista: 4, expert: 4, experto: 4,
      m: 6, mestre: 6, master: 6, maestro: 6,
      l: 8, lendario: 8, legendary: 8, legendario: 8,
    };
    const base = rankAliases[rawRank] ?? (Number.isFinite(Number(rank)) ? Number(rank) : 0);
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
    const numericOrUndefined = value => {
      if (value === undefined || value === null || value === "") return undefined;
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : undefined;
    };
    // Fichas antigas podem persistir `attacks: []` antes de o catálogo receber
    // os ataques do companheiro. Nesse caso, use os ataques catalogados; uma
    // lista personalizada não vazia continua tendo prioridade.
    const attacksSource = Array.isArray(companion.attacks) && companion.attacks.length
      ? companion.attacks
      : source.attacks;
    const normalizeAttacks = value => {
      if (Array.isArray(value)) return value;
      if (typeof value !== "string" || !value.trim() || /sem ataque|no attack|sin ataque/i.test(value)) return [];
      return value.split(/,\s*(?=[^,:(]+:\s*)/).map(entry => {
        const match = entry.trim().match(/^([^:]+):\s*([^()]+?)(?:\s*\(([^)]+)\))?$/);
        if (!match) return { name: entry.trim() };
        return {
          name: match[1].trim(),
          damage: match[2].trim(),
          traits: match[3] ? match[3].split(/,\s*/).map(trait => trait.trim()).filter(Boolean) : []
        };
      }).filter(attack => attack.name);
    };
    const attacks = normalizeAttacks(attacksSource).map(attack => ({
      ...attack,
      bonus: numericOrUndefined(attack.bonus)
    }));
    const profiles = Array.isArray(source.profiles) ? source.profiles : [];
    const requestedProfile = Number(companion.profileIndex ?? source.profileIndex ?? 0);
    const profileIndex = profiles.length ? Math.min(profiles.length - 1, Math.max(0, Number.isInteger(requestedProfile) ? requestedProfile : 0)) : undefined;
    const selectedProfile = profileIndex === undefined ? undefined : profiles[profileIndex];
    return {
      ...source,
      name: companion.name || source.name,
      type: companion.type || source.type,
      hpMax: numericOrUndefined(companion.hpMax ?? source.hpMax ?? source.hp),
      hpCurrent: numericOrUndefined(companion.hpCurrent ?? companion.currentHp ?? source.hpCurrent ?? source.hpMax ?? source.hp),
      ac: numericOrUndefined(companion.ac ?? source.ac),
      perception: companion.perception ?? source.perception,
      speed: companion.speed ?? source.speed,
      profileIndex,
      selectedProfile,
      abilityScores: companion.abilityScores ?? selectedProfile?.abilities ?? source.abilityScores,
      abilityModifiers: companion.abilityModifiers ?? selectedProfile?.abilityMods ?? source.abilityModifiers ?? source.abilityMods,
      acBonus: companion.acBonus ?? selectedProfile?.acBonus ?? source.acBonus,
      dexCap: companion.dexCap ?? selectedProfile?.dexCap ?? source.dexCap,
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
    const requiresAmmunition = Boolean(requiredType)
      || traits.some(trait => /recarga|reload|pente|magazine|muni[cç][aã]o|ammunition/i.test(String(trait)))
      || Boolean(weapon.requiresAmmunition)
      || weapon.reload !== undefined && weapon.reload !== null && weapon.reload !== 0;
    const ammunition = (character?.inventory || []).filter(item => {
      const text = `${item?.id || ""} ${item?.name || ""} ${(item?.traits || []).join(" ")} ${item?.subCategory || ""}`;
      if (!/ammunition|muni[cç][aã]o|bullet|balas|bolt|virote|sphere|esfera|arrow|flecha/i.test(text)) return false;
      if (!requiredType) return true;
      if (requiredType === "arrow") return /arrow|flecha/i.test(text);
      if (requiredType === "bolt") return /bolt|virote/i.test(text);
      return /bullet|bala|sphere|esfera/i.test(text);
    });
    const quantity = ammunition.reduce((total, item) => {
      const configuredQuantity = item?.qty === undefined || item?.qty === null || item?.qty === "" ? 1 : Number(item.qty);
      return total + Math.max(0, Number.isFinite(configuredQuantity) ? configuredQuantity : 0);
    }, 0);
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
    if (!needle) return null;
    return Object.entries(collection || {}).map(([key, record]) => ({ key, record: record || {} })).find(({ key, record }) => {
      const candidates = [key, record.id, record.name, ...(record.legacyNames || []), ...Object.values(record.names || {})].filter(Boolean).map(normalize);
      return candidates.some(candidate => {
        if (candidate === needle) return true;
        const stripGender = (str) => str.replace(/\b(brux|feiticeir|ladin|guerreir|mag)[oa]\b/g, "$1").replace(/\b(campe[aã]|campeao)\b/g, "campe");
        if (stripGender(candidate) === stripGender(needle)) return true;
        const needleParen = needle.match(/\(([^)]+)\)/)?.[1]?.trim();
        const candParen = candidate.match(/\(([^)]+)\)/)?.[1]?.trim();
        if (needleParen && candParen && (needleParen === candParen || needleParen.includes(candParen) || candParen.includes(needleParen))) return true;
        return false;
      });
    })?.record || null;
  },

  getSpellcastingProfile(character) {
    return this.resolveCatalogRecord(PF2E_DATA.classes, character?.class)?.spellcasting || null;
  },

  getSelectedPatron(character) {
    const selected = character?.patron || character?.subclass;
    const patron = this.resolveCatalogRecord(PF2E_DATA.subclasses, selected);
    return patron?.classId === "class.witch" && patron?.patron === true ? patron : null;
  },

  getCharacterMagicTradition(character) {
    return this.getSelectedPatron(character)?.tradition || this.normalizeTradition(character?.magicTradition);
  },

  getMaximumSpellRank(character) {
    const level = Math.min(20, Math.max(1, Number(character?.level) || 1));
    return Math.min(10, Math.ceil(level / 2));
  },

  getSpellCompatibility(character, spell) {
    const profile = this.getSpellcastingProfile(character);
    // Class-gated and explicitly gated spells must not leak into a generic
    // spell list. Keep rank/tradition checks below, but reuse the prerequisite
    // interpreter for gates independent of the casting tradition.
    const prerequisiteCompatibility = this.getPrerequisiteCompatibility(character, spell);
    if (prerequisiteCompatibility?.state === "incompatible") {
      return { ...prerequisiteCompatibility, tradition: "", maximumRank: this.getMaximumSpellRank(character) };
    }

    const maximumRank = this.getMaximumSpellRank(character);
    // Magias de foco são concedidas por características de classe, não pela
    // progressão normal de espaços. Uma classe marcial pode ter essa fonte
    // (como o Campeão) sem ganhar acesso ao catálogo de magias comuns.
    const isFocusSpell = spell?.focus === true || /focus spell|magia de foco/i.test(String(spell?.type || spell?.category || ""));
    const hasExplicitClassGate = Boolean(spell?.classId) || (Array.isArray(spell?.classIds) && spell.classIds.length > 0);
    const spellRank = Number(spell?.rank ?? spell?.level ?? 0);
    if (isFocusSpell && !profile && hasExplicitClassGate) {
      if (spellRank > maximumRank) {
        return { state: "incompatible", reason: "rank-too-high", tradition: "", maximumRank };
      }
      return {
        state: "available",
        reason: "focus-compatible",
        tradition: Array.isArray(spell?.traditions) ? spell.traditions[0] || "" : "",
        maximumRank
      };
    }
    if (!profile) return { state: "incompatible", reason: "no-spellcasting", tradition: "", maximumRank: 0 };

    const selectedTradition = this.getCharacterMagicTradition(character);
    const allowedTraditions = Array.isArray(profile.traditions) ? profile.traditions : [];
    const tradition = profile.traditionMode === "fixed" ? allowedTraditions[0] : selectedTradition;

    if (profile.traditionMode !== "fixed" && !allowedTraditions.includes(tradition)) {
      return { state: "requires-choice", reason: "tradition-required", tradition: "", maximumRank };
    }
    // Fichas/importações antigas usam `level` para o círculo da magia;
    // normalizar aqui evita que uma magia de alto nível seja tratada como
    // truque quando passa pelo bridge legado.
    if (spellRank > maximumRank) {
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
    const requiredCause = normalize(item.requiredCause || item.cause);
    if (requiredCause) {
      const selectedCause = normalize(char.subclass || char.cause || "");
      const causeAliases = requiredCause.includes("esplendor") ? ["esplendor", "radiance"]
        : requiredCause.includes("iniquidade") ? ["iniquidade", "iniquity", "tiranos", "desesperadores"]
          : requiredCause.includes("libertacao") ? ["libertacao", "liberdade", "liberation"]
            : requiredCause.includes("justica") ? ["justica", "retribuicao", "justice"]
              : requiredCause.includes("obediencia") ? ["obediencia", "obediência", "obedience"]
                : requiredCause.includes("profanacao") ? ["profanacao", "profano", "desecration"]
                  : requiredCause.includes("redencao") ? ["redencao", "misericordia", "redemption"]
                    : [];
      if (!selectedCause || !causeAliases.some((alias) => selectedCause.includes(normalize(alias)))) {
        return { state: "incompatible", reason: "cause-mismatch", requiredCause };
      }
    }
    const normalizeSanctification = (value) => {
      const normalized = normalize(value);
      if (/(?:profan|unholy|imp[ií]o)/.test(normalized)) return "unholy";
      if (/(?:sagrad|holy|sanctif)/.test(normalized)) return "holy";
      return "";
    };
    const explicitSanctification = normalizeSanctification(char.sanctification || char.sanctificationType);
    const selectedCauseValue = char.subclass || char.cause;
    const selectedCauseRecord = selectedCauseValue
      ? Object.values(PF2E_DATA?.subclasses || {}).find((cause) => {
        const selected = normalize(selectedCauseValue);
        return [cause?.id, cause?.name, ...Object.values(cause?.names || {})]
          .filter(Boolean).some((candidate) => normalize(candidate) === selected);
      })
      : null;
    const selectedSanctification = explicitSanctification || normalizeSanctification(selectedCauseRecord?.sanctification);
    const requiredSanctifications = Array.isArray(item.requiredSanctification)
      ? item.requiredSanctification.map(normalizeSanctification).filter(Boolean)
      : item.requiredSanctification ? [normalizeSanctification(item.requiredSanctification)].filter(Boolean) : [];
    if (requiredSanctifications.length && selectedSanctification && !requiredSanctifications.includes(selectedSanctification)) {
      return { state: "incompatible", reason: "sanctification-mismatch", requiredSanctification: requiredSanctifications };
    }
    const prohibitedSanctification = normalizeSanctification(item.prohibitedSanctification);
    if (prohibitedSanctification && selectedSanctification === prohibitedSanctification) {
      return { state: "incompatible", reason: "sanctification-prohibited", prohibitedSanctification };
    }
    const requiredSubclassValues = Array.isArray(item.requiredSubclass)
      ? item.requiredSubclass
      : item.requiredSubclass ? [item.requiredSubclass] : [];
    if (requiredSubclassValues.length) {
      const expandSubclassAliases = (value) => {
        const record = this.resolveCatalogRecord(PF2E_DATA?.subclasses || [], value);
        return [value, record?.id, record?.name, ...Object.values(record?.names || {})]
          .filter(Boolean)
          .map(normalize);
      };
      const selectedSubclasses = [char.subclass, char.hybridStudy, char.instinct, char.bloodline, char.patron, char.order, char.mystery, char.doctrine, char.apparition, char.eidolon]
        .flatMap(expandSubclassAliases).filter(Boolean);
      const subclassAliases = (value) => {
        const normalized = expandSubclassAliases(value);
        if (normalized.some((alias) => alias.includes("dragao") || alias.includes("dracon") || alias.includes("dragon"))) return ["dragao", "dracon", "draconico", "dragon", "draconic"];
        if (normalized.some((alias) => alias.includes("feérico") || alias.includes("feerico") || alias.includes("fey"))) return ["feerico", "feérico", "fey"];
        return normalized;
      };
      if (!selectedSubclasses.length || !requiredSubclassValues.some((required) => subclassAliases(required).some((alias) => selectedSubclasses.some((selected) => selected.includes(alias))))) {
        return { state: "incompatible", reason: "subclass-mismatch", requiredSubclass: requiredSubclassValues };
      }
    }
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
    if (item.requiresFlight) {
      const flightValues = [char.hasFlight, char.flight, char.flySpeed, char.flightSpeed, char.speeds?.fly, char.movement?.fly]
        .filter((value) => value !== undefined && value !== null);
      const flightKnown = flightValues.length > 0;
      const hasFlight = flightValues.some((value) => value === true || Number(value) > 0 || /voo|fly|flight/i.test(String(value)));
      if (flightKnown && !hasFlight) return { state: "incompatible", reason: "flight-required" };
    }
    if (item.requiresPrehensileTongueOrTail) {
      const anatomyValues = [
        char.hasPrehensileTongue,
        char.prehensileTongue,
        char.hasTail,
        char.tail,
      ].filter((value) => value !== undefined && value !== null);
      const anatomyText = [char.anatomy, ...(Array.isArray(char.anatomyTraits) ? char.anatomyTraits : [])]
        .filter(Boolean).join(" ");
      const hasRequiredAnatomy = anatomyValues.some((value) => value === true || /cauda|tail|lingua preensil|prehensile tongue/i.test(String(value)))
        || /cauda|tail|lingua preensil|prehensile tongue/i.test(anatomyText);
      const tongueKnown = char.hasPrehensileTongue !== undefined || char.prehensileTongue !== undefined;
      const tailKnown = char.hasTail !== undefined || char.tail !== undefined;
      const alternativesExplicitlyAbsent = tongueKnown && tailKnown && !hasRequiredAnatomy;
      if ((Boolean(anatomyText) && !hasRequiredAnatomy) || alternativesExplicitlyAbsent) {
        return { state: "incompatible", reason: "anatomy-required" };
      }
    }
    if (item.requiresShield) {
      const shieldKnown = Object.prototype.hasOwnProperty.call(char, "equippedShield")
        || Object.prototype.hasOwnProperty.call(char, "shieldEquipped")
        || Object.prototype.hasOwnProperty.call(char, "wieldingShield");
      const hasShield = char.equippedShield != null && char.equippedShield !== false
        || char.shieldEquipped === true || char.wieldingShield === true;
      if (shieldKnown && !hasShield) return { state: "incompatible", reason: "shield-required" };
    }
    if (item.requiresMounted) {
      const mountedKnown = Object.prototype.hasOwnProperty.call(char, "mounted")
        || Object.prototype.hasOwnProperty.call(char, "isMounted")
        || Object.prototype.hasOwnProperty.call(char, "mount");
      const isMounted = char.mounted === true || char.isMounted === true || (char.mount != null && char.mount !== false);
      if (mountedKnown && !isMounted) return { state: "incompatible", reason: "mounted-required" };
    }
    if (item.requiresUnarmored) {
      const armorKnown = Object.prototype.hasOwnProperty.call(char, "equippedArmor")
        || Object.prototype.hasOwnProperty.call(char, "armorEquipped");
      const isArmored = char.equippedArmor != null && char.equippedArmor !== false || char.armorEquipped === true;
      if (armorKnown && isArmored) return { state: "incompatible", reason: "unarmored-required" };
    }
    if (item.requiresTwoMeleeWeapons) {
      const weaponsKnown = Array.isArray(char.equippedWeapons);
      if (weaponsKnown) {
        const meleeWeapons = char.equippedWeapons.filter((weapon) => {
          const text = [weapon?.name, weapon?.category, weapon?.weaponType, ...(weapon?.traits || [])]
            .filter(Boolean).join(" ");
          return !/dist[aâ]ncia|ranged|arco|bow|besta|crossbow|firearm|fogo|m[aá]gica de fogo/i.test(text)
            && weapon?.melee !== false;
        });
        if (meleeWeapons.length < 2) return { state: "incompatible", reason: "two-melee-weapons-required" };
      }
    }
    if (item.requiresOneHandOneFree) {
      const freeHandKnown = ["freeHands", "handsFree", "freeHand"].some((key) => Object.prototype.hasOwnProperty.call(char, key));
      const freeHandCount = Number(char.freeHands ?? char.handsFree ?? (char.freeHand === true ? 1 : char.freeHand === false ? 0 : NaN));
      if (freeHandKnown && (!Number.isFinite(freeHandCount) || freeHandCount < 1)) {
        return { state: "incompatible", reason: "one-hand-free-required" };
      }
    }
    if (item.requiresSpellcasting && !this.getSpellcastingProfile(char)) {
      return { state: "incompatible", reason: "spellcasting-required" };
    }
    const familiarAbilityCount = Number(char.familiarAbilityCount ?? char.familiarAbilitiesCount
      ?? (Array.isArray(char.familiarAbilities) ? char.familiarAbilities.length : NaN));
    if (Number.isFinite(item.requiredFamiliarAbilities) && Number.isFinite(familiarAbilityCount)
      && familiarAbilityCount < Number(item.requiredFamiliarAbilities)) {
      return {
        state: "incompatible",
        reason: "familiar-abilities-too-low",
        requiredFamiliarAbilities: Number(item.requiredFamiliarAbilities),
      };
    }

    const requiredEquipmentRaw = item.requiredEquipment ?? item.requiresEquipment;
    const requiredEquipment = Array.isArray(requiredEquipmentRaw)
      ? requiredEquipmentRaw
      : (typeof requiredEquipmentRaw === "string" ? [requiredEquipmentRaw] : []);
    const readEquipmentCollection = (value, seen = new Set()) => {
      const entries = Array.isArray(value)
        ? value
        : value && typeof value === "object" ? Object.values(value) : [];
      const collected = [];
      for (const entry of entries) {
        if (!entry || typeof entry !== "object" || seen.has(entry)) continue;
        seen.add(entry);
        collected.push(entry);
        // Inventário e fichas importadas podem representar recipientes como
        // `items`, `contents` ou um mapa indexado. O conteúdo conta para um
        // pré-requisito mesmo quando está guardado em outro recipiente.
        for (const nested of [entry.items, entry.contents, entry.inventory]) {
          collected.push(...readEquipmentCollection(nested, seen));
        }
      }
      return collected;
    };
    const equipmentStateKnown = [char.inventory, char.containers, char.weapons, char.items, char.equipment, char.equippedWeapons]
      .some((value) => Array.isArray(value) || (value && typeof value === "object"))
      || Object.prototype.hasOwnProperty.call(char, "equippedArmor")
      || Object.prototype.hasOwnProperty.call(char, "equippedShield");
    if (requiredEquipment.length && equipmentStateKnown) {
      const seenEquipment = new Set();
      const possessed = [
        ...readEquipmentCollection(char.inventory, seenEquipment),
        ...readEquipmentCollection(char.containers, seenEquipment),
        ...readEquipmentCollection(char.weapons, seenEquipment),
        ...readEquipmentCollection(char.items, seenEquipment),
        ...readEquipmentCollection(char.equipment, seenEquipment),
        ...readEquipmentCollection(char.equippedWeapons, seenEquipment),
        ...readEquipmentCollection(char.equippedArmor ? [char.equippedArmor] : [], seenEquipment),
        ...readEquipmentCollection(char.equippedShield ? [char.equippedShield] : [], seenEquipment),
      ];
      const possessedKeys = possessed.flatMap((entry) => [entry?.id, entry?.name, ...Object.values(entry?.names || {})]
        .filter(Boolean).map(normalize));
      const catalogIdentityKeys = (requirement) => {
        const direct = normalize(requirement);
        const keys = new Set(direct ? [direct] : []);
        const collections = [PF2E_DATA?.items, PF2E_DATA?.itemCompendium, PF2E_DATA?.weapons, PF2E_DATA?.armors, PF2E_DATA?.shields];
        for (const collection of collections) {
          const records = Array.isArray(collection) ? collection : Object.values(collection || {});
          for (const entry of records) {
            const entryKeys = [entry?.id, entry?.name, ...Object.values(entry?.names || {})].filter(Boolean).map(normalize);
            if (entryKeys.includes(direct)) entryKeys.forEach((key) => keys.add(key));
          }
        }
        return keys;
      };
      const missingEquipment = requiredEquipment.find((requirement) => {
        const requirementKeys = catalogIdentityKeys(requirement);
        return ![...requirementKeys].some((key) => possessedKeys.includes(key));
      });
      if (missingEquipment) {
        return { state: "incompatible", reason: "equipment-required", missingEquipment };
      }
    }

    const resolveCatalogRecord = (collection, value) => {
      const needle = normalize(value);
      return Object.entries(collection || {}).map(([key, record]) => ({ key, record: record || {} })).find(({ key, record }) => {
        const candidates = [key, record.id, record.name, ...(record.legacyNames || []), ...Object.values(record.names || {})].filter(Boolean).map(normalize);
        return candidates.includes(needle);
      })?.record;
    };
    const catalogGateMatches = (collection, selectedValue, allowedValues) => {
      const selected = resolveCatalogRecord(collection, selectedValue);
      const selectedNeedle = normalize(selectedValue);
      return allowedValues.some((allowedValue) => {
        // Fichas importadas frequentemente persistem o ID canônico enquanto
        // o catálogo expõe também uma chave/nome localizado. Igualdade exata
        // de ID ou chave é segura e deve vencer a resolução de aliases.
        if (selectedNeedle && selectedNeedle === normalize(allowedValue)) return true;
        const selectedLabels = [selected?.id, selected?.name, ...(selected?.legacyNames || []), ...Object.values(selected?.names || {})]
          .filter(Boolean).map(normalize);
        if (selectedLabels.includes(normalize(allowedValue))) return true;
        const allowed = resolveCatalogRecord(collection, allowedValue);
        return (selected?.id && allowed?.id === selected.id)
          || (selected?.id && normalize(allowedValue) === normalize(selected.id))
          // Fichas importadas ou catálogos externos podem não ter o registro
          // resolvido ainda. Uma igualdade textual exata é segura; não faça
          // correspondência parcial, pois isso poderia liberar outra opção.
          || (!selected?.id && selectedNeedle && selectedNeedle === normalize(allowedValue));
      });
    };
    const classIds = Array.isArray(item.classIds) && item.classIds.length ? item.classIds : item.classId ? [item.classId] : [];
    const multiclassArchetypeClasses = {
      "archetype.bard_multiclass": "class.bard",
      "archetype.witch_multiclass": "class.witch",
      "archetype.cleric_multiclass": "class.cleric",
      "archetype.druid_multiclass": "class.druid",
      "archetype.fighter_multiclass": "class.fighter",
      "archetype.rogue_multiclass": "class.rogue",
      "archetype.wizard_multiclass": "class.wizard",
      "archetype.ranger_multiclass": "class.ranger",
      "archetype.magus_dedication": "class.magus",
      "archetype.summoner_dedication": "class.summoner",
      "archetype.psychic_dedication": "class.psychic",
      "archetype.thaumaturge_dedication": "class.thaumaturge",
      "archetype.exemplar_multiclass": "class.exemplar",
      "archetype.animist_multiclass": "class.animist",
      "archetype.commander_multiclass": "class.commander",
      "archetype.guardian_multiclass": "class.guardian",
    };
    const archetypeIdentity = item.archetypeId || item.id;
    const isMulticlassDedication = /(?:^|[._-])dedication(?:$|[._-])/i.test(String(item.id || item.name || ""));
    const inferredProhibitedClassId = archetypeIdentity
      && (multiclassArchetypeClasses[archetypeIdentity] && (!item.archetypeId || isMulticlassDedication))
      ? multiclassArchetypeClasses[archetypeIdentity]
      : undefined;
    const prohibitedClassIds = Array.isArray(item.prohibitedClassIds) && item.prohibitedClassIds.length
      ? item.prohibitedClassIds
      : item.prohibitedClassId ? [item.prohibitedClassId]
        : inferredProhibitedClassId ? [inferredProhibitedClassId] : [];
    if (prohibitedClassIds.length && catalogGateMatches(PF2E_DATA?.classes, char.class, prohibitedClassIds)) {
      return { state: "incompatible", reason: "class-prohibited" };
    }
    if (classIds.length) {
      const selectedClassIdentity = normalize(char.class);
      const exactClassIdMatch = selectedClassIdentity && classIds.some((classId) => selectedClassIdentity === normalize(classId));
      if (!exactClassIdMatch && !catalogGateMatches(PF2E_DATA?.classes, char.class, classIds)) {
        return { state: "incompatible", reason: "class-mismatch" };
      }
    }
    const hasDeityField = Object.prototype.hasOwnProperty.call(char, "deity");
    if (item.requiresDeity && hasDeityField && !normalize(char.deity)) {
      return { state: "incompatible", reason: "deity-required" };
    }
    // Registros novos podem exigir escolha explícita. Diferente do gate
    // legado acima, ausência do campo também não libera a opção.
    if (item.requiresSelectedDeity && !normalize(char.deity)) {
      return { state: "incompatible", reason: "deity-required" };
    }
    const requiredDivineFont = normalize(item.requiredDivineFont);
    const hasDivineFontField = Object.prototype.hasOwnProperty.call(char, "divineFont")
      || Object.prototype.hasOwnProperty.call(char, "deityFont");
    const selectedDivineFont = normalize(char.divineFont || char.deityFont);
    if (requiredDivineFont && hasDivineFontField && selectedDivineFont) {
      const fontAliases = requiredDivineFont === "heal" ? ["heal", "healing", "curar", "cura"]
        : requiredDivineFont === "harm" ? ["harm", "harming", "ferir", "dano"] : [requiredDivineFont];
      if (!fontAliases.includes(selectedDivineFont)) {
        return { state: "incompatible", reason: "divine-font-mismatch", requiredDivineFont };
      }
    }
    const hasPatronField = Object.prototype.hasOwnProperty.call(char, "patron");
    if (item.requiresNoPatron && hasPatronField && normalize(char.patron)) {
      return { state: "incompatible", reason: "patron-must-be-absent" };
    }
    if (!classIds.length && item.className) {
      if (!catalogGateMatches(PF2E_DATA?.classes, char.class, [item.className])) {
        return { state: "incompatible", reason: "class-mismatch" };
      }
    }
    const ancestryIds = Array.isArray(item.ancestryIds) && item.ancestryIds.length ? item.ancestryIds : item.ancestryId ? [item.ancestryId] : [];
    if (ancestryIds.length) {
      if (!catalogGateMatches(PF2E_DATA?.ancestries, char.ancestry, ancestryIds)) return { state: "incompatible", reason: "ancestry-mismatch" };
    }
    if (!ancestryIds.length && item.ancestry) {
      if (!catalogGateMatches(PF2E_DATA?.ancestries, char.ancestry, [item.ancestry])) {
        return { state: "incompatible", reason: "ancestry-mismatch" };
      }
    }
    if (item.requiredResearchField && char.researchField !== undefined) {
      const fieldAliases = {
        chirurgeon: ["chirurgeon", "cirurgiao", "cirurgião", "cirurgista"],
        mutagenist: ["mutagenist", "mutagenista"],
        bomber: ["bomber", "bombardeiro", "bombardero"],
      };
      const selectedField = normalize(char.researchField);
      const requiredField = normalize(item.requiredResearchField);
      const aliases = fieldAliases[requiredField] || [requiredField];
      if (selectedField && !aliases.some((alias) => selectedField.includes(normalize(alias)))) {
        return { state: "incompatible", reason: "research-field-mismatch", requiredResearchField: item.requiredResearchField };
      }
    }

    const raw = item.prereq ?? item.prerequisites;
    const prerequisites = Array.isArray(raw) ? raw : raw ? [raw] : [];
    if (!prerequisites.length && item.requiresWeaponProficiency === undefined) return { state: "available", reason: "no-prerequisite" };
    const abilities = { str: "str", dex: "dex", con: "con", int: "int", wis: "wis", cha: "cha", forca: "str", fuerza: "str", strength: "str", destreza: "dex", dexterity: "dex", constituicao: "con", constitucion: "con", constitution: "con", inteligencia: "int", intelligence: "int", sabedoria: "wis", sabiduria: "wis", wisdom: "wis", carisma: "cha", charisma: "cha" };
    const skillAliases = {
      acrobacia: "acrobatics", acrobatics: "acrobatics",
      atletismo: "athletics", athletics: "athletics",
      medicina: "medicine", medicine: "medicine",
      intimidacao: "intimidation", intimidation: "intimidation",
      diplomacia: "diplomacy", diplomacy: "diplomacy",
      enganacao: "deception", deception: "deception",
      dissimulacao: "deception", bluff: "deception",
      furtividade: "stealth", sigilo: "stealth", stealth: "stealth",
      ladinagem: "thievery", thievery: "thievery",
      arcana: "arcana", arcanismo: "arcana",
      natureza: "nature", nature: "nature",
      sobrevivencia: "survival", supervivencia: "survival", survival: "survival",
      ocultismo: "occultism", occultism: "occultism",
      religiao: "religion", religion: "religion",
      sociedade: "society", society: "society",
      saber: "lore", lore: "lore", "saber (guerra)": "lore", "war lore": "lore",
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
    const heritageRecord = [...(PF2E_DATA?.heritages || []), ...(PF2E_DATA?.versatileHeritages || [])].find((heritage) => [heritage.id, heritage.name, ...Object.values(heritage.names || {})]
      .filter(Boolean).map(normalize).includes(normalize(char.heritage))) || {};
    const selectedFeatureRecords = (char.feats || []).concat(char.archetypes || [], char.classFeatures || [], char.actions || []);
    const allFeatureRecords = [...(PF2E_DATA?.feats || []), ...(PF2E_DATA?.actions || []), ...(PF2E_DATA?.archetypes || [])];
    const selectedFeats = selectedFeatureRecords.flatMap((entry) => {
      const resolved = typeof entry === "string" ? allFeatureRecords.find((record) => record.id === entry) : entry;
      return [entry, resolved?.id, resolved?.name, ...Object.values(resolved?.names || {})]
        .filter(Boolean).map(normalize);
    });
    const shieldRank = char.shieldProficiency ?? char.shieldsProficiency ?? classRecord.shields?.Geral ?? classRecord.shields?.General;
    const isUndeadCharacter = Boolean(char.isUndead)
      || [ancestryRecord, heritageRecord].some((record) => (record.traits || []).some((trait) => /morto[- ]vivo|undead|muerto viviente|no muerto/.test(normalize(trait))))
      || /skeleton|esqueleto/.test(normalize(ancestryRecord.id || char.ancestry));
    const catalogNames = (collection) => Object.entries(collection || {}).flatMap(([key, value]) => {
      const record = value || {};
      return [key, record.name, ...(record.legacyNames || []), ...(Object.values(record.names || {}))].filter(Boolean).map(normalize);
    });
    const classNames = new Set(catalogNames(PF2E_DATA?.classes));
    const ancestryNames = new Set(catalogNames(PF2E_DATA?.ancestries));
    const explicitWeaponRank = (category) => {
      const wanted = normalize(category);
      const entry = Object.entries(char.weaponProficiencies || {})
        .find(([key]) => normalize(key) === wanted);
      return entry ? entry[1] : undefined;
    };
    const weaponRank = (category) => explicitWeaponRank(category) ?? classRecord.weapons?.[category];
    if (item.requiredUnarmoredProficiency !== undefined) {
      const requiredRank = rankValues[normalize(item.requiredUnarmoredProficiency)] ?? (Number(item.requiredUnarmoredProficiency) || 2);
      const explicitRanks = Object.entries(char.armorProficiencies || {})
        .filter(([key]) => /sem armadura|unarmored|sin armadura/i.test(key))
        .map(([, value]) => rankValues[normalize(value)] ?? Number(value))
        .filter(Number.isFinite);
      const classRank = rankValues[normalize(classRecord.armor?.["Sem Armadura"])] ?? Number(classRecord.armor?.["Sem Armadura"]);
      const knownRanks = [...explicitRanks, ...(Number.isFinite(classRank) ? [classRank] : [])];
      if (knownRanks.length && Math.max(...knownRanks) < requiredRank) {
        return { state: "incompatible", reason: "unarmored-proficiency-too-low", requiredRank: item.requiredUnarmoredProficiency };
      }
    }
    if (item.requiresWeaponProficiency !== undefined) {
      const requiredWeaponRank = rankValues[normalize(item.requiresWeaponProficiency)] ?? (Number(item.requiresWeaponProficiency) || 2);
      const explicitWeaponRanks = Object.values(char.weaponProficiencies || {}).map((rank) => rankValues[normalize(rank)] ?? Number(rank)).filter(Number.isFinite);
      const classWeaponRanks = Object.values(classRecord.weapons || {}).map((rank) => rankValues[normalize(rank)] ?? Number(rank)).filter(Number.isFinite);
      const knownWeaponRanks = [...explicitWeaponRanks, ...classWeaponRanks];
      if (knownWeaponRanks.length && Math.max(...knownWeaponRanks) < requiredWeaponRank) {
        return { state: "incompatible", reason: "weapon-proficiency-too-low", requiredRank: item.requiresWeaponProficiency };
      }
    }
    const maxClassHpPerLevel = Number(item.maxClassHpPerLevel);
    if (Number.isFinite(maxClassHpPerLevel)) {
      const constitutionScore = Number(char.abilities?.con);
      // Fichas antigas sem atributos completos permanecem revisáveis; quando
      // os dados estão presentes, a opção incompatível deve ser removida.
      if (Number.isFinite(constitutionScore) && Number.isFinite(Number(classRecord.hpPerLevel))) {
        const allowedClassHpPerLevel = maxClassHpPerLevel + this.getModifier(constitutionScore);
        if (Number(classRecord.hpPerLevel) > allowedClassHpPerLevel) {
          return { state: "incompatible", reason: "class-hp-too-high", classHpPerLevel: Number(classRecord.hpPerLevel), maximum: allowedClassHpPerLevel };
        }
      }
    }
    const getSkillRank = (skillName) => {
      const normalizedSkillName = normalize(skillName);
      const skillKey = skillAliases[normalizedSkillName] || normalizedSkillName;
      if (skillKey === "perception") return rankValues[normalize(char.perceptionRank)] ?? (Number(char.perceptionRank) || 0);
      if (skillKey === "lore") {
        const loreNeedle = normalizedSkillName.replace(/^(?:saber|lore)\s*(?:\((.+)\))?$/, "$1").trim();
        const loreEntries = Array.isArray(char.loreSkills) ? char.loreSkills : [];
        const matchingLore = loreEntries.find((entry) => {
          const loreName = normalize(entry?.name || entry?.lore || entry);
          return !loreNeedle || loreName.includes(loreNeedle) || loreNeedle.includes(loreName);
        });
        const rawLoreRank = matchingLore?.rank ?? matchingLore?.proficiency ?? char.skills?.lore;
        return rankValues[normalize(rawLoreRank)] ?? (Number(rawLoreRank) || 0);
      }
      const rawRank = char.skills?.[skillKey] ?? char.skills?.[skillName];
      return rankValues[normalize(rawRank)] ?? (Number(rawRank) || 0);
    };
    let recognized = 0;
    if (item.requiredSkillByTradition) {
      const traditionSkills = { arcane: "arcana", divine: "religion", occult: "occultism", primal: "nature" };
      const tradition = this.getCharacterMagicTradition(char);
      const skill = traditionSkills[tradition];
      if (skill) {
        const requiredRank = rankValues[normalize(item.requiredSkillRank || "trained")] ?? 2;
        recognized = 1;
        if (getSkillRank(skill) < requiredRank) {
          return { state: "incompatible", reason: "tradition-skill-rank-too-low", tradition, skill, requiredRank: item.requiredSkillRank || "trained" };
        }
      }
    }
    for (const prerequisite of prerequisites) {
      if (prerequisite && typeof prerequisite === "object" && prerequisite.type) {
        const structuredType = normalize(prerequisite.type);
        const structuredValues = [
          ...(Array.isArray(prerequisite.ids) ? prerequisite.ids : []),
          ...(Array.isArray(prerequisite.values) ? prerequisite.values : []),
          ...(Array.isArray(prerequisite.options) ? prerequisite.options : []),
          ...(prerequisite.id ? [prerequisite.id] : []),
          ...(prerequisite.name ? [prerequisite.name] : [])
        ].filter(Boolean);
        if (structuredType === "class" || structuredType === "classe") {
          recognized++;
          if (structuredValues.length && !structuredValues.some((value) => catalogGateMatches(PF2E_DATA?.classes, char.class, [value]))) return { state: "incompatible", reason: "class-mismatch" };
          continue;
        }
        if (structuredType === "ancestry" || structuredType === "ancestralidade") {
          recognized++;
          if (structuredValues.length && !structuredValues.some((value) => catalogGateMatches(PF2E_DATA?.ancestries, char.ancestry, [value]))) return { state: "incompatible", reason: "ancestry-mismatch" };
          continue;
        }
        if (structuredType === "level" || structuredType === "nivel") {
          recognized++;
          const minimum = Number(prerequisite.minimum ?? prerequisite.value ?? prerequisite.level);
          if (Number.isFinite(minimum) && level < minimum) return { state: "incompatible", reason: "level-too-low", requiredLevel: minimum };
          continue;
        }
        if (structuredType === "ability" || structuredType === "atributo") {
          const abilityKey = abilities[normalize(prerequisite.ability || prerequisite.attribute || prerequisite.name)];
          const minimum = Number(prerequisite.minimum ?? prerequisite.value ?? prerequisite.score);
          if (abilityKey && Number.isFinite(minimum)) {
            recognized++;
            const actual = Number(char.abilities?.[abilityKey]);
            const modifierMode = prerequisite.mode === "modifier" || prerequisite.modifier !== undefined || prerequisite.minimumModifier !== undefined;
            const threshold = modifierMode ? this.getModifier(actual) : actual;
            const required = Number(prerequisite.minimumModifier ?? prerequisite.modifier ?? minimum);
            if (!Number.isFinite(actual) || threshold < required) return { state: "incompatible", reason: "ability-too-low", ability: abilityKey, required };
          }
          continue;
        }
        if (structuredType === "skill" || structuredType === "pericia") {
          const skillName = prerequisite.skill || prerequisite.name || prerequisite.id;
          const requiredRank = rankValues[normalize(prerequisite.rank ?? prerequisite.minimumRank ?? "trained")] ?? Number(prerequisite.rank ?? prerequisite.minimumRank ?? 2);
          if (skillName) {
            recognized++;
            if (getSkillRank(skillName) < requiredRank) return { state: "incompatible", reason: "skill-rank-too-low", skill: skillName, requiredRank };
          }
          continue;
        }
        if (structuredType === "feat" || structuredType === "talento" || structuredType === "dote") {
          const requiredFeat = normalize(prerequisite.feat || prerequisite.name || prerequisite.id);
          if (requiredFeat) {
            recognized++;
            if (!selectedFeats.some((feat) => feat.includes(requiredFeat))) return { state: "incompatible", reason: "dedication-required" };
          }
          continue;
        }
      }
      const text = normalize(typeof prerequisite === "string" ? prerequisite : prerequisite?.text || prerequisite?.name);
      if (!text || text === "nenhum" || text === "none") { recognized++; continue; }
      if (item.requiredSkillByTradition && /(?:pericia|skill|habilidad).*(?:tradicao|tradition|tradicion).*(?:patrono|patron)/.test(text)) {
        // This phrase is resolved by the structured tradition gate above.
        // Do not let the generic text parser treat it as an unknown skill name.
        recognized++;
        continue;
      }
      if (/voce esta morto[- ]vivo|you are undead|eres muerto viviente|eres no muerto/.test(text)) {
        recognized++;
        if (!isUndeadCharacter) return { state: "incompatible", reason: "undead-required" };
        continue;
      }
      if (/voce nao e uma criatura morta[- ]viva|you are not undead|no eres una criatura muerta viviente|no eres muerto viviente/.test(text)) {
        recognized++;
        if (isUndeadCharacter) return { state: "incompatible", reason: "undead-prohibited" };
        continue;
      }
      const levelMatch = text.match(/(?:nivel|level)\s*(\d+)/);
      if (levelMatch) {
        recognized++;
        if (level < Number(levelMatch[1])) return { state: "incompatible", reason: "level-too-low", requiredLevel: Number(levelMatch[1]) };
        continue;
      }
      const abilityMatches = [...text.matchAll(/(forca|fuerza|strength|destreza|dexterity|constituicao|constitucion|constitution|inteligencia|intelligence|sabedoria|sabiduria|wisdom|carisma|charisma)\s*\+\s*(\d+)/g)];
      if (abilityMatches.length) {
        recognized++;
        const meetsRequirement = ([_, abilityName, required]) => {
          const key = abilities[abilityName];
          const score = Number(char.abilities?.[key]);
          return Number.isFinite(score) && this.getModifier(score) >= Number(required);
        };
        const meets = text.includes(" ou ") || text.includes(" or ") || text.includes(" o ") ? abilityMatches.some(meetsRequirement) : abilityMatches.every(meetsRequirement);
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
          const componentRankMatch = component.match(/^(treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|in|en)?\s*/);
          const componentRequiredRank = componentRankMatch
            ? (rankValues[normalize(componentRankMatch[1])] ?? requiredRank)
            : requiredRank;
          const componentWithoutRank = component.replace(/^(?:treinado|trained|entrenado|especialista|expert|experto|mestre|master|maestro|lendario|legendary|legendario)\s+(?:em|in|en)?\s*/, "").trim();
          const featMatch = componentWithoutRank.match(/^(?:talento|feat|dote)\s+(.+)$/);
          const componentText = featMatch ? featMatch[1].trim() : componentWithoutRank;
          if (featMatch) {
            return selectedFeats.some((feat) => feat.includes(normalize(componentText)));
          }
          if (/(?:arma|weapon|desarmad|unarmed|armadura|armor|escudo|shield)/.test(componentText)) {
            if (/(?:escudo|shield)/.test(componentText) && shieldRank !== undefined) {
              return (rankValues[normalize(shieldRank)] ?? 0) >= componentRequiredRank;
            }
            const targetRank = componentText.includes("marcia") || componentText.includes("martial") ? weaponRank("Marcial")
              : componentText.includes("simples") || componentText.includes("simple") ? weaponRank("Simples")
                : componentText.includes("avancad") || componentText.includes("advanced") ? weaponRank("Avançada")
                  : componentText.includes("desarmad") || componentText.includes("unarmed") ? weaponRank("Desarmado")
                    : componentText.includes("leve") || componentText.includes("light") ? classRecord.armor?.Leve
                      : componentText.includes("media") || componentText.includes("medium") ? classRecord.armor?.Média
                        : componentText.includes("pesad") || componentText.includes("heavy") ? classRecord.armor?.Pesada
                          : undefined;
            // Armas específicas (por exemplo, armas de fogo) ainda não têm
            // proficiência granular no modelo; não bloqueie por inferência.
            if (targetRank === undefined) return true;
            return (rankValues[normalize(targetRank)] ?? 0) >= componentRequiredRank;
          }
          const alternatives = componentText.split(/,|\s+(?:ou|or|o)\s+/).map((skill) => skill.trim()).filter(Boolean);
          const knownSkills = alternatives.filter((skill) => skillAliases[skill] || skillAliases[normalize(skill)]);
          if (!knownSkills.length) return true;
          return knownSkills.some((skill) => getSkillRank(skill) >= componentRequiredRank);
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
        if (classRequirements.length && !classRequirements.some((requirement) => catalogGateMatches(PF2E_DATA?.classes, char.class, [requirement]))) return { state: "incompatible", reason: "class-mismatch" };
        continue;
      }
      if (classNames.has(text)) {
        recognized++;
        if (!catalogGateMatches(PF2E_DATA?.classes, char.class, [text])) return { state: "incompatible", reason: "class-mismatch" };
        continue;
      }
      if (text.includes("ancestralidade ") || text.includes("ancestry ")) {
        recognized++;
        const ancestryRequirements = text.replace(/^.*(?:ancestralidade|ancestry)\s+/, "").split(/\s+ou\s+|\s+or\s+/).map((requirement) => requirement.trim()).filter(Boolean);
        if (ancestryRequirements.length && !ancestryRequirements.some((requirement) => catalogGateMatches(PF2E_DATA?.ancestries, char.ancestry, [requirement]))) return { state: "incompatible", reason: "ancestry-mismatch" };
        continue;
      }
      if (ancestryNames.has(text)) {
        recognized++;
        if (!catalogGateMatches(PF2E_DATA?.ancestries, char.ancestry, [text])) return { state: "incompatible", reason: "ancestry-mismatch" };
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
          const targetRank = normalizedTarget.includes("marcia") || normalizedTarget.includes("martial") ? weaponRank("Marcial")
            : normalizedTarget.includes("simples") || normalizedTarget.includes("simple") ? weaponRank("Simples")
              : normalizedTarget.includes("avancad") || normalizedTarget.includes("advanced") ? weaponRank("Avançada")
                : normalizedTarget.includes("desarmad") || normalizedTarget.includes("unarmed") ? weaponRank("Desarmado")
                  : normalizedTarget.includes("leve") || normalizedTarget.includes("light") ? classRecord.armor?.Leve
                    : normalizedTarget.includes("media") || normalizedTarget.includes("medium") ? classRecord.armor?.Média
                      : normalizedTarget.includes("pesad") || normalizedTarget.includes("heavy") ? classRecord.armor?.Pesada
                            : weaponContext && /^(?:marcial|martial|simples|simple|avancada|advanced)$/.test(normalizedTarget) ? weaponRank(normalizedTarget.includes("marcial") || normalizedTarget.includes("martial") ? "Marcial" : normalizedTarget.includes("avanc") || normalizedTarget.includes("advanced") ? "Avançada" : "Simples")
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
        const dedicationMatch = text.match(/(?:dedicacao de|dedication:)\s+(.+?)(?=\s*;|\s+(?:e|and|y)\s+|$)/);
        const dedication = dedicationMatch?.[1]?.trim() || text.replace(/^.*(?:dedicacao de|dedication:)\s*/, "").trim();
        if (dedication && !selectedFeats.some((feat) => feat.includes(dedication))) return { state: "incompatible", reason: "dedication-required" };
        const remainder = dedicationMatch
          ? text.slice((dedicationMatch.index || 0) + dedicationMatch[0].length).replace(/^\s*(?:;|e|and|y)\s*/, "").trim()
          : "";
        if (remainder) {
          const remainderResult = this.getPrerequisiteCompatibility(character, {
            ...item,
            prereq: undefined,
            prerequisites: [remainder],
          });
          if (remainderResult?.state === "incompatible") return remainderResult;
        }
        continue;
      }
      const prerequisiteFeature = [
        ...(PF2E_DATA?.feats || []).map((feature) => ({ feature, kind: "feat" })),
        ...(PF2E_DATA?.actions || []).map((feature) => ({ feature, kind: "action" })),
      ].find(({ feature }) => [feature?.id, feature?.name, ...Object.values(feature?.names || {})]
        .filter(Boolean).map(normalize).includes(text));
      if (prerequisiteFeature) {
        recognized++;
        const requiredFeature = prerequisiteFeature.feature;
        const identities = new Set([requiredFeature.id, requiredFeature.name, ...Object.values(requiredFeature.names || {})]
          .filter(Boolean).map(normalize));
        const hasPrerequisiteFeature = selectedFeatureRecords.some((entry) => [entry, entry?.id, entry?.name, ...Object.values(entry?.names || {})]
          .filter(Boolean).map(normalize).some((identity) => identities.has(identity)));
        if (!hasPrerequisiteFeature) return {
          state: "incompatible",
          reason: prerequisiteFeature.kind === "action" ? "action-required" : "feat-required",
          requiredFeat: requiredFeature.name || requiredFeature.id,
        };
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
    const heritage = this.resolveHeritageRecord(character);
    const heritageSkills = Array.isArray(heritage?.trainedSkills) ? heritage.trainedSkills : [];

    // Perícias concedidas por herança não consomem escolhas da classe. Se a
    // ficha também as guardar explicitamente, remova-as da contagem de
    // escolhas para evitar dupla contabilização.
    const totalAllowed = classBase + Math.max(0, intMod) + (backgroundSkill ? 1 : 0) + fixedSkills.length;
    const selectedSkills = Object.keys(character?.skills || {}).filter(k => character.skills[k] && character.skills[k] !== "Destreinado" && !heritageSkills.includes(k));
    const remainingCount = Math.max(0, totalAllowed - selectedSkills.length);

    return {
      totalAllowed,
      classBase,
      intMod,
      backgroundSkill,
      heritageSkills,
      fixedSkills,
      selectedSkills,
      remainingCount
    };
  },

  // Retorna os sentidos especiais do personagem (Ancestralidade + Herança)
  resolveHeritageRecord(character) {
    const ancestry = this.resolveCatalogRecord(PF2E_DATA.ancestries, character?.ancestry);
    const identityValue = (value) => value && typeof value === "object"
      ? value.id || value.name || value["pt-BR"] || value.en || value.es || ""
      : value;
    const normalize = (value) => String(identityValue(value) || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const selected = normalize(character?.heritage);
    if (!selected) return null;
    return [...(PF2E_DATA.heritages || []), ...(PF2E_DATA.versatileHeritages || [])].find((heritage) => {
      const names = [heritage.id, heritage.name, ...Object.values(heritage.names || {})].filter(Boolean).map(normalize);
      const hasAncestryGate = Array.isArray(heritage.ancestryIds) || heritage.ancestryId;
      const ancestryMatches = !hasAncestryGate || !ancestry?.id || (heritage.ancestryIds || [heritage.ancestryId]).includes(ancestry.id);
      return ancestryMatches && names.includes(selected);
    }) || null;
  },

  resolveSubclassRecord(character) {
    if (!character) return null;
    const identityValue = (value) => value && typeof value === "object"
      ? value.id || value.name || value["pt-BR"] || value.en || value.es || ""
      : value;
    const normalize = (value) => String(identityValue(value) || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    
    const candidates = [
      character.subclass,
      character.style,
      character.racket,
      character.instinct,
      character.doctrine,
      character.order,
      character.muse,
      character.researchField,
      character.hunterEdge,
      character.way,
      character.innovation,
      character.methodology,
      character.elementalGate,
      character.implement,
      character.consciousMind,
      character.bloodline,
      character.eidolon,
      character.cause,
      character.apparition,
      character.icon,
      character.banner,
      character.guardianDefense
    ].filter(Boolean);

    if (candidates.length === 0) return null;

    const subclasses = PF2E_DATA?.subclasses || [];
    for (const raw of candidates) {
      const target = normalize(raw);
      if (!target) continue;
      const match = subclasses.find((sc) => {
        const scNames = [sc.id, sc.name, sc.causeId, ...Object.values(sc.names || {})].filter(Boolean).map(normalize);
        return scNames.some(nameNorm => nameNorm === target || nameNorm.endsWith(target) || target.endsWith(nameNorm));
      });
      if (match) return match;
    }
    return null;
  },

  getCharacterSenses(character) {
    const ancestryData = this.resolveCatalogRecord(PF2E_DATA.ancestries, character?.ancestry) || {};
    const sensesSet = new Set(ancestryData.senses || []);

    const heritageRecord = this.resolveHeritageRecord(character);
    const heritage = String(character?.heritage || "").toLowerCase();
    if ((heritageRecord?.traits || []).some((trait) => /visão no escuro|darkvision/.test(String(trait).toLowerCase())) || heritage.includes("visão no escuro") || heritage.includes("darkvision") || heritage.includes("nephilim") || heritage.includes("meio-orc")) {
      sensesSet.add("Visão no Escuro");
    } else if (heritage.includes("visão na penumbra") || heritage.includes("low-light") || heritage.includes("meio-elfo")) {
      sensesSet.add("Visão na Penumbra");
    }

    if (typeof this.getEquipmentBonuses === "function") {
      const equip = this.getEquipmentBonuses(character);
      for (const sense of equip.senses || []) {
        if (sense) sensesSet.add(sense);
      }
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
    const dc = Math.max(1, 10 + (dyingValue || 1) - (Number(options?.recoveryDcReduction) || 0));
    const doomed = Number(options?.doomed || 0);
    const maxDying = Math.max(1, (Number(options?.maxDying) || 4) - doomed);
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
  // Extrai e agrega bônus de equipamentos, itens vestidos e investidos no inventário
  getEquipmentBonuses(character) {
    const bonuses = {
      skills: {},
      saves: { fortitude: 0, reflex: 0, will: 0 },
      perception: 0,
      speed: 0,
      hp: 0,
      ac: 0,
      initiative: 0,
      bulkLimit: 0,
      senses: [],
      resistances: []
    };

    const isEquippedOrInvested = (item, forceEquipped = false) => {
      if (!item || typeof item !== "object") return false;
      if (forceEquipped) return true;
      return Boolean(item.equipped || item.worn || item.invested || item.active);
    };

    const processItem = (item, forceEquipped = false) => {
      if (!item || typeof item !== "object") return;
      if (!isEquippedOrInvested(item, forceEquipped)) return;

      // Bônus de item em perícias específicas
      if (item.skill && (item.itemBonus || item.bonus)) {
        const skId = String(item.skill).toLowerCase();
        bonuses.skills[skId] = Math.max(bonuses.skills[skId] || 0, Number(item.itemBonus || item.bonus) || 0);
      }
      if (item.skillBonuses && typeof item.skillBonuses === "object") {
        for (const [sk, val] of Object.entries(item.skillBonuses)) {
          const skId = String(sk).toLowerCase();
          bonuses.skills[skId] = Math.max(bonuses.skills[skId] || 0, Number(val) || 0);
        }
      }
      if (item.skillBonus && typeof item.skillBonus === "object") {
        for (const [sk, val] of Object.entries(item.skillBonus)) {
          const skId = String(sk).toLowerCase();
          bonuses.skills[skId] = Math.max(bonuses.skills[skId] || 0, Number(val) || 0);
        }
      }

      // Bônus de salvaguardas
      if (item.saveBonus !== undefined) {
        if (typeof item.saveBonus === "object") {
          for (const [s, val] of Object.entries(item.saveBonus)) {
            const sKey = String(s).toLowerCase();
            if (bonuses.saves[sKey] !== undefined) bonuses.saves[sKey] = Math.max(bonuses.saves[sKey], Number(val) || 0);
          }
        } else {
          const val = Number(item.saveBonus) || 0;
          bonuses.saves.fortitude = Math.max(bonuses.saves.fortitude, val);
          bonuses.saves.reflex = Math.max(bonuses.saves.reflex, val);
          bonuses.saves.will = Math.max(bonuses.saves.will, val);
        }
      }
      if (item.saveBonuses && typeof item.saveBonuses === "object") {
        for (const [s, val] of Object.entries(item.saveBonuses)) {
          const sKey = String(s).toLowerCase();
          if (bonuses.saves[sKey] !== undefined) bonuses.saves[sKey] = Math.max(bonuses.saves[sKey], Number(val) || 0);
        }
      }

      // Outros bônus de item
      if (item.perceptionBonus || item.perception) {
        bonuses.perception = Math.max(bonuses.perception, Number(item.perceptionBonus || item.perception) || 0);
      }
      if (item.speedBonus || item.speed) {
        bonuses.speed = Math.max(bonuses.speed, Number(item.speedBonus || item.speed) || 0);
      }
      if (item.hpBonus || item.hp) {
        bonuses.hp += Number(item.hpBonus || item.hp) || 0;
      }
      if (item.acBonus && item !== character?.equippedArmor && !item.category && item.type !== "armor") {
        bonuses.ac = Math.max(bonuses.ac, Number(item.acBonus) || 0);
      }
      if (item.bulkLimitBonus) {
        bonuses.bulkLimit += Number(item.bulkLimitBonus) || 0;
      }

      // Sentidos e Resistências
      if (Array.isArray(item.senses)) bonuses.senses.push(...item.senses);
      else if (typeof item.senses === "string") bonuses.senses.push(item.senses);
      if (Array.isArray(item.resistances)) bonuses.resistances.push(...item.resistances);
      else if (typeof item.resistances === "string") bonuses.resistances.push(item.resistances);
    };

    if (character?.equippedArmor) processItem(character.equippedArmor, true);
    if (character?.equippedShield) processItem(character.equippedShield, true);

    const scanList = (list) => {
      if (!Array.isArray(list)) return;
      for (const item of list) {
        processItem(item);
        if (Array.isArray(item.items)) scanList(item.items);
        if (Array.isArray(item.contents)) scanList(item.contents);
      }
    };

    scanList(character?.inventory);
    scanList(character?.containers);
    scanList(character?.equippedItems);
    scanList(character?.wornItems);
    scanList(character?.items);

    return bonuses;
  },

  // Apenas efeitos numéricos explicitamente modelados alteram os cálculos;
  // descrições ainda marcadas como needs_review não são interpretadas por
  // inferência.
  getFeatStatEffects(character) {
    const effects = { bonusHpPerLevel: 0, speedBonus: 0, initiativeBonus: 0, recoveryDcReduction: 0, maxDying: 4, dailyRecoveryMultiplier: 1, bulkLimitBonus: 0, ignoreArmorSpeedPenalty: false, untrainedSkillBonus: false, conditionalSaveBonuses: {}, proficiencyChoices: {} };
    const feats = Array.isArray(character?.feats) ? character.feats : [];
    for (const feat of feats) {
      const id = String(feat?.id || "").toLowerCase();
      const catalogFeat = id && typeof PF2E_DATA !== "undefined"
        ? (PF2E_DATA.feats || []).find((record) => String(record?.id || "").toLowerCase() === id)
        : null;
      const explicitEffects = Array.isArray(feat?.effects)
        ? feat.effects
        : Array.isArray(catalogFeat?.effects) ? catalogFeat.effects : [];
      for (const effect of explicitEffects) {
        const value = Number(effect?.value) || 0;
        if (effect?.type === "max_hp_per_level") effects.bonusHpPerLevel += value;
        else if (effect?.type === "land_speed") effects.speedBonus += value;
        else if (effect?.type === "initiative") effects.initiativeBonus += value;
        else if (effect?.type === "recovery_dc") effects.recoveryDcReduction += Math.max(0, -value);
        else if (effect?.type === "max_dying") effects.maxDying = Math.max(effects.maxDying, value);
        else if (effect?.type === "daily_recovery_multiplier") effects.dailyRecoveryMultiplier = Math.max(effects.dailyRecoveryMultiplier, value);
        else if (effect?.type === "save_bonus" && effect?.target) effects.conditionalSaveBonuses[effect.target] = Math.max(effects.conditionalSaveBonuses[effect.target] || 0, value);
        else if (effect?.type === "bulk_limit") effects.bulkLimitBonus += value;
        else if (effect?.type === "ignore_armor_speed_penalty") effects.ignoreArmorSpeedPenalty = Boolean(value);
        else if (effect?.type === "untrained_skill_bonus") effects.untrainedSkillBonus = true;
        else if (effect?.type === "proficiency_choice" && effect?.target && feat?.selectedStatistic) effects.proficiencyChoices[effect.target] = String(feat.selectedStatistic);
      }
      // Compatibilidade com fichas antigas que salvaram somente o ID do
      // talento antes do campo estruturado existir.
      if (!explicitEffects.length && id === "feat.general.toughness") {
        effects.bonusHpPerLevel += 1;
        effects.recoveryDcReduction += 1;
      } else if (!explicitEffects.length && id === "feat.general.fleet") {
        effects.speedBonus += 5;
      } else if (!explicitEffects.length && id === "feat.general.incredible_initiative") {
        effects.initiativeBonus += 2;
      } else if (!explicitEffects.length && id === "feat.general.diehard") {
        effects.maxDying = Math.max(effects.maxDying, 5);
      } else if (!explicitEffects.length && id === "feat.skill.hefty_hauler") {
        effects.bulkLimitBonus += 2;
      } else if (!explicitEffects.length && id === "feat.ancestry.unburdened_iron") {
        effects.ignoreArmorSpeedPenalty = true;
      } else if (!explicitEffects.length && id === "feat.ancestry.nimble_elf") {
        effects.speedBonus += 5;
      } else if (!explicitEffects.length && id === "feat.general.untrained_improvisation") {
        effects.untrainedSkillBonus = true;
      } else if (!explicitEffects.length && id === "feat.general.canny_acumen" && feat?.selectedStatistic) {
        effects.proficiencyChoices["perception_or_save"] = String(feat.selectedStatistic);
      }
    }
    return effects;
  },

  getConditionalSaveBonus(character, context) {
    const effects = this.getFeatStatEffects(character);
    return Number(effects.conditionalSaveBonuses?.[String(context || "")]) || 0;
  },

  // Calcula todos os atributos derivados do personagem
  calculateCharacterStats(character) {
    const level = character.level || 1;
    const conditionMods = this.getConditionModifiers(character);
    const featEffects = this.getFeatStatEffects(character);
    const equipmentBonuses = this.getEquipmentBonuses(character);
    
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
    const heritageData = this.resolveHeritageRecord(character) || heritageOption || {};
    const subclassData = this.resolveSubclassRecord(character) || {};
    const ancestryHp = sizeOption?.hp ?? ancestryData.hp ?? 8;
    const classHpPerLvl = classData.hpPerLevel || 10;
    const conBonus = mods.con;
    const heritageHpBonus = (heritageData.bonusHpPerLevel || 0) * level;
    const itemHpBonus = equipmentBonuses.hp || 0;
    const bonusHp = (character.bonusHp || 0) + itemHpBonus + heritageHpBonus + featEffects.bonusHpPerLevel * level;
    const drainedPenalty = conditionMods.drained * level;
    const maxHp = Math.max(1, ancestryHp + (classHpPerLvl + conBonus) * level + bonusHp - drainedPenalty);

    // 3. Carga / Bulk e Moedas
    const coins = character.coins || { pl: 0, pp: 0, gp: 0, sp: 0, cp: 0 };
    // Fichas antigas podem conter `pl` e fichas novas `pp`; se ambos
    // estiverem presentes, o valor não pode ser perdido pelo operador `||`.
    const totalCoins = (coins.pl || 0) + (coins.pp || 0) + (coins.gp || 0) + (coins.sp || 0) + (coins.cp || 0);
    const coinBulk = Math.floor(totalCoins / 1000);

    let inventoryBulk = 0;
    const itemQuantity = (item) => {
      if (item?.qty === undefined || item?.qty === null || item?.qty === "") return 1;
      const quantity = Number(item.qty);
      return Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    };
    const bulkEntries = (value, seen = new Set()) => {
      const entries = Array.isArray(value)
        ? value
        : value && typeof value === "object" ? Object.values(value) : [];
      for (const item of entries) {
        if (!item || typeof item !== "object" || seen.has(item)) continue;
        seen.add(item);
        if (typeof item.bulk === "number") {
          inventoryBulk += item.bulk * itemQuantity(item);
        } else if (typeof item.bulk === "string") {
          const parsed = parseFloat(item.bulk);
          if (!isNaN(parsed)) inventoryBulk += parsed * itemQuantity(item);
          else if (item.bulk.toUpperCase() === "L") inventoryBulk += 0.1 * itemQuantity(item);
        }
        for (const nested of [item.items, item.contents, item.inventory]) bulkEntries(nested, seen);
      }
    };
    const bulkSeen = new Set();
    bulkEntries(character.inventory, bulkSeen);
    bulkEntries(character.containers, bulkSeen);

    const currentBulk = Math.floor(inventoryBulk + coinBulk);
    const maxBulk = 10 + mods.str + (featEffects.bulkLimitBonus || 0) + (equipmentBonuses.bulkLimit || 0);
    const encumberedBulk = 5 + mods.str + (featEffects.bulkLimitBonus || 0) + (equipmentBonuses.bulkLimit || 0);
    const isEncumbered = currentBulk > encumberedBulk;

    // Se estiver sobrecarregado, aplica Clumsy 1 se não for maior, e penalidade de 10ft de velocidade
    const effectiveClumsyPenalty = isEncumbered ? Math.max(1, conditionMods.dexStatusPenalty) : conditionMods.dexStatusPenalty;
    const encumberedSpeedPenalty = isEncumbered ? -10 : 0;

    const isAbp = Boolean(character.variantRules?.automaticBonusProgression);
    const abpBonuses = this.getAutomaticBonusProgression(level, isAbp);

    // 4. Classe de Armadura (CA)
    const equippedArmor = character.equippedArmor || { name: "Sem Armadura (Trajes)", category: "Sem Armadura", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0 };
    const isMediumTrainedSubclass = Array.isArray(subclassData.armorProf) && subclassData.armorProf.includes("medium");
    const armorProfRank = character.armorProficiencies?.[equippedArmor.category] || (isMediumTrainedSubclass && (equippedArmor.category === "Média" || equippedArmor.category === "Medium") ? "Treinado" : "Treinado");
    const armorProfBonus = this.getProficiencyBonus(armorProfRank, level);
    const effectiveDex = Math.min(mods.dex, equippedArmor.dexCap !== undefined ? equippedArmor.dexCap : 5);
    const shieldBonus = character.shieldRaised ? (character.shieldBonus || 2) : 0;
    const armorRunes = this.getRuneBonuses(equippedArmor, "armor");
    const itemAcBonus = (Number(equippedArmor.acBonus) || 0) + Math.max(armorRunes.potency, abpBonuses.armorPotency, equipmentBonuses.ac || 0);
    const rageAcPenalty = (character.rageActive || character.buffs?.rage) ? 1 : 0;
    const acTotal = 10 + itemAcBonus + effectiveDex + armorProfBonus + shieldBonus - conditionMods.circumstanceAcPenalty - effectiveClumsyPenalty - rageAcPenalty;

    // 5. Salvaguardas
    const cannyTarget = String(featEffects.proficiencyChoices?.perception_or_save || "").toLowerCase();
    const cannyRank = level >= 17 ? "Mestre" : "Especialista";
    const rankValue = (rank) => this.PROFICIENCY_VALUES[rank] ?? this.PROFICIENCY_VALUES[String(rank || "")] ?? 0;
    const bestRank = (base, bonusTarget) => bonusTarget && rankValue(cannyRank) > rankValue(base) ? cannyRank : base;
    const fortRank = bestRank(character.savingThrows?.fortitude || classData.savingThrows?.fortitude || "Treinado", ["fortitude", "fortaleza"].includes(cannyTarget));
    const reflexRank = bestRank(character.savingThrows?.reflex || classData.savingThrows?.reflex || "Treinado", ["reflexos", "reflex", "reflejos"].includes(cannyTarget));
    const willRank = bestRank(character.savingThrows?.will || classData.savingThrows?.will || "Treinado", ["vontade", "will", "voluntad"].includes(cannyTarget));

    const resilientBonus = Math.max(armorRunes.resilient, abpBonuses.saveResilience);
    const fortItem = Math.max(Number(character.itemBonuses?.fortitude) || 0, equipmentBonuses.saves.fortitude, resilientBonus);
    const reflexItem = Math.max(Number(character.itemBonuses?.reflex) || 0, equipmentBonuses.saves.reflex, resilientBonus);
    const willItem = Math.max(Number(character.itemBonuses?.will) || 0, equipmentBonuses.saves.will, resilientBonus);

    const saves = {
      fortitude: {
        rank: fortRank,
        prof: this.getProficiencyBonus(fortRank, level),
        mod: mods.con,
        item: fortItem,
        statusPenalty: conditionMods.conStatusPenalty,
        total: mods.con + this.getProficiencyBonus(fortRank, level) + fortItem - conditionMods.conStatusPenalty
      },
      reflex: {
        rank: reflexRank,
        prof: this.getProficiencyBonus(reflexRank, level),
        mod: mods.dex,
        item: reflexItem,
        statusPenalty: effectiveClumsyPenalty,
        total: mods.dex + this.getProficiencyBonus(reflexRank, level) + reflexItem - effectiveClumsyPenalty
      },
      will: {
        rank: willRank,
        prof: this.getProficiencyBonus(willRank, level),
        mod: mods.wis,
        item: willItem,
        statusPenalty: conditionMods.mentalStatusPenalty,
        total: mods.wis + this.getProficiencyBonus(willRank, level) + willItem - conditionMods.mentalStatusPenalty
      }
    };

    // 6. Percepção & Iniciativa
    const percRank = bestRank(character.perceptionRank || classData.perception || "Treinado", ["percepção", "percepcao", "perception", "percepción"].includes(cannyTarget));
    const percProf = this.getProficiencyBonus(percRank, level);
    const percItem = Math.max(Number(character.itemBonuses?.perception) || 0, equipmentBonuses.perception);
    const perceptionTotal = mods.wis + percProf + percItem - conditionMods.mentalStatusPenalty;
    const initiativeTotal = perceptionTotal + featEffects.initiativeBonus + equipmentBonuses.initiative;

    // 7. Perícias
    const skillsCalculated = {};
    const armorPenalty = (equippedArmor.checkPenalty && scores.str < (equippedArmor.strReq || 10)) ? equippedArmor.checkPenalty : 0;

    PF2E_DATA.skills.forEach(sk => {
      const subclassTrained = Array.isArray(subclassData.trainedSkills) && subclassData.trainedSkills.includes(sk.id);
      const heritageTrained = Array.isArray(heritageData.trainedSkills) && heritageData.trainedSkills.includes(sk.id);
      const rank = character.skills?.[sk.id] || ((subclassTrained || heritageTrained) ? "Treinado" : "Destreinado");
      const profBonus = this.getProficiencyBonus(rank, level) + (featEffects.untrainedSkillBonus && (rank === "Destreinado" || rank === "U") ? (level >= 7 ? level : Math.floor(level / 2)) : 0);
      const attrMod = mods[sk.ability];
      const itemBonus = Math.max(Number(character.itemBonuses?.[sk.id]) || 0, equipmentBonuses.skills[sk.id] || 0);
      const pen = sk.armorPenalty ? armorPenalty : 0;
      
      let skillStatusPenalty = conditionMods.generalStatusPenalty;
      if (sk.ability === "str") skillStatusPenalty = conditionMods.strStatusPenalty;
      else if (sk.ability === "dex") skillStatusPenalty = effectiveClumsyPenalty;
      else if (sk.ability === "con") skillStatusPenalty = conditionMods.conStatusPenalty;
      else if (["int", "wis", "cha"].includes(sk.ability)) skillStatusPenalty = conditionMods.mentalStatusPenalty;

      // Swashbuckler Panache circumstance bonus (+1 to Acrobatics or style skill)
      const swashStyleSkill = character.swashbucklerStyleSkill || subclassData.styleSkill || "acrobatics";
      const panacheBonus = (character.panacheActive || character.buffs?.panache) && (sk.id === "acrobatics" || sk.id === swashStyleSkill) ? 1 : 0;

      skillsCalculated[sk.id] = {
        name: sk.name,
        ability: sk.ability,
        rank: rank,
        profBonus: profBonus,
        attrMod: attrMod,
        itemBonus: itemBonus,
        circumstanceBonus: panacheBonus,
        penalty: pen,
        statusPenalty: skillStatusPenalty,
        total: attrMod + profBonus + itemBonus + panacheBonus + pen - skillStatusPenalty
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

      // Dano - Suporte para Esquema de Ladrão (Thief Racket) e Fúria (Rage)
      const isThiefRacket = subclassData.id?.includes("thief") || String(character.subclass || character.racket || "").toLowerCase().includes("thief") || String(character.subclass || character.racket || "").toLowerCase().includes("ladrao") || String(character.subclass || character.racket || "").toLowerCase().includes("ladrão");
      let damageAttrBonus = isRanged ? 0 : (isThiefRacket && isFinesse ? mods.dex : mods.str);
      if (isRanged && w.traits?.some(t => t.toLowerCase().includes("propulsivo"))) {
        damageAttrBonus = Math.max(0, Math.floor(mods.str / 2));
      }
      let rageBonusVal = 2;
      if (subclassData.rageDamage) {
        rageBonusVal = level >= 15 ? subclassData.rageDamage.greater : level >= 7 ? subclassData.rageDamage.spec : subclassData.rageDamage.base;
      } else {
        const subName = String(character.subclass || character.instinct || "").toLowerCase();
        if (subName.includes("giant") || subName.includes("gigante")) {
          rageBonusVal = level >= 15 ? 18 : level >= 7 ? 10 : 6;
        } else if (subName.includes("dragon") || subName.includes("drac")) {
          rageBonusVal = level >= 15 ? 16 : level >= 7 ? 8 : 4;
        } else if (subName.includes("spirit") || subName.includes("espirit")) {
          rageBonusVal = level >= 15 ? 13 : level >= 7 ? 7 : 3;
        } else {
          rageBonusVal = level >= 15 ? 12 : level >= 7 ? 5 : 2;
        }
      }
      const rageDamageBonus = (character.rageActive || character.buffs?.rage) && !isRanged ? rageBonusVal : 0;
      const damageEnfeebledPenalty = isRanged ? 0 : conditionMods.enfeebled;
      const netDamageBonus = Math.max(0, damageAttrBonus + (Number(w.damageBonus) || 0) + rageDamageBonus - damageEnfeebledPenalty);
      const isUnarmedStrike = /unarmed|desarmad|punho|fist/i.test(`${w.category || ""} ${w.name || ""}`);
      const strikeWeapon = heritageData.fistDamageDie && isUnarmedStrike
        ? { ...w, damage: heritageData.fistDamageDie }
        : w;
      const damageDetails = this.calculateStrikeDamageDetails(strikeWeapon, mods, { level, abpStrikingDice: abpBonuses.strikingDice });
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

    let rawArmorSpeedPenalty = Number(equippedArmor.speedPenalty) || 0;
    if (rawArmorSpeedPenalty < 0 && scores.str >= (equippedArmor.strReq || 10)) {
      rawArmorSpeedPenalty = Math.min(0, rawArmorSpeedPenalty + 5);
    }
    const armorSpeedPenalty = featEffects.ignoreArmorSpeedPenalty && ["Média", "Pesada", "Pesada (Heavy)", "Média (Medium)", "Medium", "Heavy"].includes(equippedArmor.category) ? 0 : rawArmorSpeedPenalty;
    
    // Status speed bonus (Monk Incredible Movement & Swashbuckler Panache)
    const isMonk = (classData.id === "class.monk" || classData.name === "Monge" || String(character.class || "").toLowerCase().includes("monk") || String(character.class || "").toLowerCase().includes("monge")) && (!equippedArmor.category || equippedArmor.category === "Sem Armadura" || equippedArmor.category === "Trajes");
    const monkSpeedBonus = isMonk && level >= 3 ? (level >= 19 ? 30 : level >= 15 ? 25 : level >= 11 ? 20 : level >= 7 ? 15 : 10) : 0;
    const swashbucklerSpeedBonus = (character.panacheActive || character.buffs?.panache) ? (level >= 3 ? 10 : 5) : 0;
    const statusSpeedBonus = Math.max(monkSpeedBonus, swashbucklerSpeedBonus, conditionMods.speedStatusBonus || 0);

    const rawLandSpeed = (heritageData?.speed !== undefined ? heritageData.speed : (ancestryData.speed ?? 25)) + (heritageData.speedBonus || 0) + Math.max(Number(character.speedBonus) || 0, equipmentBonuses.speed || 0) + featEffects.speedBonus + statusSpeedBonus + armorSpeedPenalty;
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
      tempHp: (character.tempHp || 0) + ((character.rageActive || character.buffs?.rage) ? (level + mods.con) : 0),
      ac: {
        total: acTotal,
        item: itemAcBonus,
        dex: effectiveDex,
        prof: armorProfBonus,
        shield: shieldBonus,
        offGuardPenalty: conditionMods.circumstanceAcPenalty,
        statusPenalty: effectiveClumsyPenalty + rageAcPenalty
      },
      size: heritageData?.size ?? sizeOption?.size ?? ancestryData.size ?? character.size ?? "Médio",
      speed: finalLandSpeed,
      movementSpeeds: {
        land: finalLandSpeed,
        swim: heritageData?.swimSpeed ?? ancestryData.swimSpeed ?? 0,
        climb: heritageData?.climbSpeed ?? ancestryData.climbSpeed ?? 0
      },
      senses,
      resistances: [...(heritageData.resistances || []), ...(ancestryData.resistances || []), ...equipmentBonuses.resistances],
      saves,
      perception: {
        rank: percRank,
        total: perceptionTotal,
        initiativeTotal
      },
      initiative: initiativeTotal,
      featEffects,
      equipmentBonuses,
      skills: skillsCalculated,
      loreSkills: loreCalculated,
      trainedSkills,
      classDc,
      bulk: {
        max: maxBulk,
        maxLimit: maxBulk,
        encumbered: encumberedBulk,
        encumberedLimit: encumberedBulk,
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
    const normalizeReadinessText = (value) => identityText(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const isEmptySelection = (value) => !normalizeReadinessText(value)
      || ["nao definida", "nao definido", "no definida", "no definido", "not set", "none", "ninguno seleccionado", "ninguna seleccionada", "no seleccionado", "no seleccionada"].includes(normalizeReadinessText(value));
    const issues = [];
    let passedCount = 0;
    const totalChecks = 8;

    // 1. Ancestralidade
    if (isEmptySelection(char.ancestry)) {
      issues.push({ id: "ancestry", type: "error", message: "Ancestralidade não selecionada", tab: "build", targetId: "ancestryBtn" });
    } else {
      passedCount++;
    }

    // 2. Biografia (Background)
    if (isEmptySelection(char.background)) {
      issues.push({ id: "background", type: "error", message: "Biografia (Background) não selecionada", tab: "build", targetId: "backgroundBtn" });
    } else {
      passedCount++;
    }

    // 3. Classe
    if (isEmptySelection(char.class)) {
      issues.push({ id: "class", type: "error", message: "Classe não selecionada", tab: "build", targetId: "classBtn" });
    } else {
      passedCount++;
    }

    // 4. Subclasse (se aplicável)
    const classCatalog = (typeof PF2E_DATA !== "undefined" && PF2E_DATA.classes) ? PF2E_DATA.classes : null;
    const classData = classCatalog
      ? (this.resolveCatalogRecord(classCatalog, char.class) || Object.values(classCatalog).find((record) => [record?.id, record?.name, ...(record?.legacyNames || []), ...Object.values(record?.names || {})]
        .filter(Boolean)
        .some((value) => normalizeReadinessText(value) === normalizeReadinessText(char.class))))
      : null;
    if (classData && classData.subclasses && classData.subclasses.length > 0 && isEmptySelection(char.subclass)) {
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
    const heritage = this.resolveHeritageRecord(char);
    const heritageSkills = Array.isArray(heritage?.trainedSkills) ? heritage.trainedSkills : [];
    const heritageTrainedSkills = heritageSkills.filter((skill) => {
      const rank = char.skills?.[skill];
      return !rank || rank === "Destreinado" || rank === "U";
    }).length;
    const effectiveTrainedSkills = trainedSkills + heritageTrainedSkills;
    const requiredSkills = (classData?.trainedSkillsCount || 3) + Math.max(0, Math.floor(((scores.int || 10) - 10) / 2));
    if (effectiveTrainedSkills < requiredSkills) {
      issues.push({ id: "skills", type: "warning", message: `Perícias treinadas (${effectiveTrainedSkills}/${requiredSkills}) abaixo do total permitido`, tab: "build", targetId: "skillTrainingBtn" });
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
    const normalizedClassId = normalizeReadinessText(classData?.id);
    const normalizedClassText = normalizeReadinessText(classText);
    const isClericOrChampion = normalizedClassId === "class.cleric" || normalizedClassId === "class.champion"
      || ["clerigo", "clergigo", "campeao", "cleric", "champion"].some((name) => normalizedClassText.includes(name));
    if (isClericOrChampion && isEmptySelection(char.deity)) {
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
    const standardSpellData = (typeof PF2E_DATA !== "undefined" && PF2E_DATA.spellcastingByClass)
      ? Object.entries(PF2E_DATA.spellcastingByClass).find(([key]) => classNames.includes(String(key).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || classNames.some(name => String(key).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[0] === name.split(" ")[0]))?.[1]
      : this.getSpellcastingProfile(char);
    const spellData = standardSpellData || this.getSpellcastingProfile(char) || classData?.focusSpellcasting || null;
    const focusOnly = !standardSpellData && !this.getSpellcastingProfile(char) && Boolean(classData?.focusSpellcasting);

    if (!spellData) {
      return { isSpellcaster: false, tradition: null, keyAbility: null, spellDc: 0, spellAttack: 0, focusPoints: 0, maxFocusPoints: 0, slots: {} };
    }

    const scores = char.abilities || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const keyAttr = spellData.keyAbility
      ? this.normalizeAttributeKey(spellData.keyAbility)
      : ((classData?.keyAbility && classData.keyAbility[0]) ? this.normalizeAttributeKey(classData.keyAbility[0]) : "int");
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

    const isOracleOrWitch = classNames.some(name => name.includes("orac") || name.includes("brux") || name.includes("witch"));
    const configuredFocusMax = char.focusPointsMax !== undefined
      ? char.focusPointsMax
      : (char.focusPoints !== undefined || char.focusPointsCurrent !== undefined || isOracleOrWitch || standardSpellData?.traditionMode === "subclass-choice" || classData?.focusSpellcasting ? 1 : (spellData.initialFocusPoints || 0));
    const maxFocusPoints = Math.min(3, Math.max(0, Number(configuredFocusMax) || 0));
    const configuredFocus = char.focusPointsCurrent !== undefined ? char.focusPointsCurrent : char.focusPoints;
    const currentFocusPoints = configuredFocus !== undefined
      ? Math.min(Math.max(0, Number(configuredFocus) || 0), maxFocusPoints)
      : maxFocusPoints;

    const spellSlots = this.getSpellSlots(char);
    const slotsByRank = spellSlots?.slots || {};
    const slots = {
      cantrips: focusOnly ? 0 : (spellSlots?.cantrips || 5),
      ranks: {}
    };

    Object.entries(slotsByRank).forEach(([rankNum, maxSlots]) => {
      const usedSlots = char.usedSpellSlots?.[rankNum] || 0;
      slots.ranks[rankNum] = {
        max: maxSlots,
        used: usedSlots,
        available: Math.max(0, maxSlots - usedSlots)
      };
    });

    const rawTrad = (spellData.traditions?.[0] || spellData.tradition || "").toLowerCase();
    const tradition = this.getCharacterMagicTradition(char)
      || (rawTrad.includes("arc") ? "arcane" : (rawTrad.includes("div") ? "divine" : (rawTrad.includes("oc") ? "occult" : (rawTrad.includes("prim") ? "primal" : (spellData.traditions?.[0] || spellData.tradition)))));

    return {
      hasSpellcasting: true,
      isSpellcaster: true,
      className: char.class,
      tradition,
      traditionName: spellData.traditionName || spellData.tradition || tradition,
      type: spellData.type || spellData.preparation,
      focusOnly,
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
      cantripsAllowed: focusOnly ? 0 : (spellSlots?.cantrips || 5),
      slotsByRank,
      slots
    };
  },

  // APLICAÇÃO DE KIT INICIAL DE EQUIPAMENTO (1-CLIQUE)
  applyClassStarterKit(character, className) {
    if (!character || typeof PF2E_DATA === "undefined" || !PF2E_DATA.classStarterKits) return character;
    const normalizeClass = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const resolveClassId = (value) => {
      const normalized = normalizeClass(value);
      if (!normalized) return null;
      return Object.values(PF2E_DATA.classes || {}).find((record) => {
        const names = [record?.id, record?.name, record?.names?.["pt-BR"], record?.names?.en, record?.names?.es]
          .filter(Boolean).map(normalizeClass);
        return names.some((name) => name === normalized || name.includes(normalized) || normalized.includes(name));
      })?.id || null;
    };
    const selectedClass = normalizeClass(character.class);
    const classKey = normalizeClass(String(className || "").split(" (")[0]);
    const selectedClassId = resolveClassId(character.class);
    const requestedClassId = resolveClassId(className);
    if (selectedClassId && requestedClassId && selectedClassId !== requestedClassId) return character;
    if (!selectedClassId && selectedClass && classKey && !selectedClass.includes(classKey) && !classKey.includes(selectedClass)) return character;
    const requestedClass = normalizeClass(className);
    const kitKey = Object.keys(PF2E_DATA.classStarterKits).find((key) => {
      const normalizedKey = normalizeClass(key);
      const keyClassId = resolveClassId(key);
      return (selectedClassId && keyClassId && selectedClassId === keyClassId)
        || (requestedClassId && keyClassId && requestedClassId === keyClassId)
        || normalizedKey === requestedClass
        || normalizedKey.startsWith(`${requestedClass} (`)
        || normalizedKey.includes(`(${requestedClass})`)
        || requestedClass.startsWith(`${normalizedKey} (`);
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
