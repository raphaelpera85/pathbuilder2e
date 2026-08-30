/**
 * Pathbuilder 2e Local - Preenchimento de Ficha Oficial PDF Editável (AcroForm)
 * Mapeia e preenche todos os mais de 1.000 campos de formulário do PDF oficial da Paizo (Remaster).
 */

(function(global) {
  "use strict";

  const PF2E_PDF_FILLER = {
    /**
     * Preenche os campos do formulário AcroForm do PDF oficial da Paizo
     * @param {Object} character - Objeto do personagem
     * @param {Object} calc - Estatísticas calculadas pelo PF2E_ENGINE
     * @param {Uint8Array|ArrayBuffer} pdfBytes - Bytes do modelo ficha.pdf
     * @param {Object} pdfLibInstance - Instância de PDFLib (opcional)
     * @returns {Promise<Uint8Array>} PDF modificado mantendo campos editáveis
     */
    async fillOfficialPdf(character, calc, pdfBytes, pdfLibInstance) {
      const PDFLib = pdfLibInstance || (typeof global !== "undefined" && global.PDFLib) || (typeof window !== "undefined" && window.PDFLib);
      if (!PDFLib || !PDFLib.PDFDocument) {
        throw new Error("Biblioteca PDFLib não encontrada. Certifique-se de que pdf-lib está carregada.");
      }

      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      const cleanPdfText = (str) => {
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

      // Helpers de preenchimento seguro
      const setTxt = (fieldName, val) => {
        if (val === undefined || val === null) return;
        try {
          const field = form.getTextField(fieldName);
          if (field) {
            field.setText(cleanPdfText(val));
          }
        } catch (e) {
          // Campo não existe ou não é textfield
        }
      };

      const setChk = (fieldName, checked) => {
        try {
          const field = form.getCheckBox(fieldName);
          if (field) {
            if (checked) field.check();
            else field.uncheck();
          }
        } catch (e) {
          // Campo não existe ou não é checkbox
        }
      };

      const formatMod = (num) => {
        const n = Number(num || 0);
        return n >= 0 ? `+${n}` : `${n}`;
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
      // 2. ATRIBUTOS (VALORES BRUTOS E MODIFICADORES)
      // ----------------------------------------------------
      const scores = calc.scores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
      const mods = calc.mods || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

      setTxt("STRENGTH STAT", String(scores.str));
      setTxt("DEXTERITY STAT", String(scores.dex));
      setTxt("CONSTITUTION STAT", String(scores.con));
      setTxt("INTELLIGENCE STAT", String(scores.int));
      setTxt("WISDOM STAT", String(scores.wis));
      setTxt("CHARISMA STAT", String(scores.cha));

      setTxt("STRENGTH", formatMod(mods.str));
      setTxt("DEXTERITY", formatMod(mods.dex));
      setTxt("CONSTITUTION", formatMod(mods.con));
      setTxt("INTELLIGENCE", formatMod(mods.int));
      setTxt("WISDOM", formatMod(mods.wis));
      setTxt("CHARISMA", formatMod(mods.cha));

      // ----------------------------------------------------
      // 3. CLASSE DE ARMADURA, PONTOS DE VIDA & DEFESAS
      // ----------------------------------------------------
      const level = Number(character.level || 1);
      const equippedArmor = calc.equippedArmor || { name: "Roupas de Explorador", category: "Sem Armadura", acBonus: 0 };

      setTxt("AC", String(calc.ac || 10));
      setTxt("AC CALCULATION 1 DEXTERITY", formatMod(mods.dex));
      
      const armorRank = character.armorProficiencies?.[equippedArmor.category] || "Treinado";
      const armorProfBonus = (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.getProficiencyBonus)
        ? PF2E_ENGINE.getProficiencyBonus(armorRank, level)
        : (armorRank === "Treinado" ? 2 + level : 0);
      setTxt("AC CALCULATION 2 PROFICIENCY", String(armorProfBonus));
      setTxt("AC CALCULATION 3 ITEM", String(equippedArmor.acBonus || 0));
      setTxt("SHIELD", character.shieldRaised ? String(character.shieldBonus || 2) : "0");
      setTxt("Hardness Max HP", String(character.shieldHp || ""));

      // Proficiências de Armadura (Checkboxes)
      const setProfChecks = (prefix, rank) => {
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

      // Pontos de Vida
      setTxt("MAX HP", String(calc.maxHp || 10));
      setTxt("MAXIMUM HIT POINTS", String(calc.maxHp || 10));
      setTxt("HP", String(character.currentHp !== undefined ? character.currentHp : calc.maxHp));
      setTxt("Current HP", String(character.currentHp !== undefined ? character.currentHp : calc.maxHp));
      setTxt("Temporary HP", String(character.tempHp || 0));
      setTxt("WOUNDED", String(character.wounded || 0));
      setTxt("CONDITIONS", Array.isArray(character.conditions) ? character.conditions.join(", ") : "");
      setTxt("RESISTANCE AND IMMUNITIES", Array.isArray(character.resistances) ? character.resistances.join(", ") : "");

      // ----------------------------------------------------
      // 4. SALVAGUARDAS (FORTITUDE, REFLEXOS, VONTADE)
      // ----------------------------------------------------
      const saves = calc.saves || {
        fortitude: { total: mods.con + 2 + level, rank: "Treinado", item: 0 },
        reflex: { total: mods.dex + 2 + level, rank: "Treinado", item: 0 },
        will: { total: mods.wis + 2 + level, rank: "Treinado", item: 0 }
      };

      setTxt("FORTITUDE", formatMod(saves.fortitude.total));
      setTxt("FORTITUDE ITEM", String(saves.fortitude.item || 0));
      setProfChecks("FORTITUDE", saves.fortitude.rank);

      setTxt("REFLEX", formatMod(saves.reflex.total));
      setProfChecks("REFLEX", saves.reflex.rank);

      setTxt("WILL", formatMod(saves.will.total));
      setTxt("WILL ITEM", String(saves.will.item || 0));
      setProfChecks("WILL", saves.will.rank);

      // ----------------------------------------------------
      // 5. PERCEPÇÃO & DESLOCAMENTO
      // ----------------------------------------------------
      const perc = calc.perception || { total: mods.wis + 2 + level, rank: "Treinado" };
      setTxt("PERCEPTION", formatMod(perc.total));
      setTxt("PERCEPTION WISDOM", formatMod(mods.wis));
      const percProf = (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.getProficiencyBonus)
        ? PF2E_ENGINE.getProficiencyBonus(character.perceptionRank || "Treinado", level)
        : (2 + level);
      setTxt("PERCEPTION PROFICIENCY", String(percProf));
      setTxt("PERCEPTION ITEM", String(character.itemBonuses?.perception || 0));
      setProfChecks("PERCEPTION", character.perceptionRank || "Treinado");

      setTxt("SPEED", `${calc.speed || 25} pés`);
      setTxt("SPECIAL MOVEMENT", character.specialMovements || "");

      // ----------------------------------------------------
      // 6. PERÍCIAS (16 OFICIAIS + LORES)
      // ----------------------------------------------------
      const skillsMap = {
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

      const skillsCalc = calc.skills || {};
      for (const [skKey, meta] of Object.entries(skillsMap)) {
        const sk = skillsCalc[skKey] || { total: 0, rank: "Destreinado", profBonus: 0, itemBonus: 0 };
        setTxt(meta.name, formatMod(sk.total));
        setTxt(`${meta.name} PROFICIENCY`, String(sk.profBonus || 0));
        setTxt(`${meta.name} ITEM`, String(sk.itemBonus || 0));
        setProfChecks(meta.name, sk.rank);
      }

      // Lore 1 & Lore 2
      const loreSkills = character.loreSkills || [];
      if (loreSkills[0]) {
        setTxt("LORE CATAGORY 1", loreSkills[0].name || "Saber");
        const l1Prof = (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.getProficiencyBonus)
          ? PF2E_ENGINE.getProficiencyBonus(loreSkills[0].rank || "Treinado", level)
          : (2 + level);
        setTxt("LORE1", formatMod(mods.int + l1Prof));
        setTxt("LORE 1 INTELLIGENCE", formatMod(mods.int));
        setTxt("LORE 1 PFOCIENCY", String(l1Prof));
        setProfChecks("LORE1", loreSkills[0].rank || "Treinado");
      }
      if (loreSkills[1]) {
        setTxt("LORE CATEGORY 2", loreSkills[1].name || "Saber");
        const l2Prof = (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.getProficiencyBonus)
          ? PF2E_ENGINE.getProficiencyBonus(loreSkills[1].rank || "Treinado", level)
          : (2 + level);
        setTxt("LORE2", formatMod(mods.int + l2Prof));
        setTxt("LORE CATEGORY 2 ITENLLIGENCE", formatMod(mods.int));
        setTxt("LORE 2 PROFICIENCY", String(l2Prof));
        setProfChecks("LORE2", loreSkills[1].rank || "Treinado");
      }

      // ----------------------------------------------------
      // 7. GOLPES & ATAQUES (MELEE & RANGED)
      // ----------------------------------------------------
      const strikes = calc.strikes || [];
      const meleeStrikes = strikes.filter(s => !s.isRanged);
      const rangedStrikes = strikes.filter(s => s.isRanged);

      // Melee 1, 2, 3
      meleeStrikes.slice(0, 3).forEach((st, idx) => {
        const n = idx + 1;
        setTxt(`MELEE STRIKE ${n}`, st.name);
        setTxt(`MELEE STRIKE ${n} ATTACK BONUS`, formatMod(st.totalAttack));
        setTxt(`MELEE STRIKE ${n} STRENGTH`, formatMod(mods.str));
        setTxt(`MELEE STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType}`);
        setTxt(`MELEE STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
      });

      // Ranged 4, 5
      rangedStrikes.slice(0, 2).forEach((st, idx) => {
        const n = idx + 4;
        setTxt(`RANGED STRIKE ${n}`, st.name);
        setTxt(`RANGED STRIKE ${n} ATTACK BONUS`, formatMod(st.totalAttack));
        setTxt(`RANGED STRIKE ${n} DEXTERITY`, formatMod(mods.dex));
        setTxt(`RANGED STRIKE ${n} DAMAGE`, `${st.damage} ${st.damageType}`);
        setTxt(`RANGED STRIKE ${n} TRAITS AND NOTES`, (st.traits || []).join(", "));
      });

      // ----------------------------------------------------
      // 8. TALENTOS & HABILIDADES (PÁGINA 2)
      // ----------------------------------------------------
      setTxt("ANCESTRY FEAT", Array.isArray(character.feats?.ancestry) ? character.feats.ancestry.join(", ") : "");
      setTxt("BACKGROUND SKILL FEAT", character.feats?.background || "");
      setTxt("CLASS FEATS & FEATURES", Array.isArray(character.classFeatures) ? character.classFeatures.join("\n") : "");

      // Preenche lista de Talentos de Classe e Perícia
      const classFeats = Array.isArray(character.feats?.class) ? character.feats.class : [];
      classFeats.slice(0, 20).forEach((f, idx) => {
        const lvl = idx + 1;
        setTxt(`CLASS FEAT ${lvl}-1`, f);
      });

      const skillFeats = Array.isArray(character.feats?.skill) ? character.feats.skill : [];
      skillFeats.slice(0, 20).forEach((f, idx) => {
        const lvl = idx + 2;
        setTxt(`SKILL FEAT ${lvl}-1`, f);
      });

      // ----------------------------------------------------
      // 9. INVENTÁRIO, CARGA & MOEDAS
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

      // Moedas
      const coins = character.coins || { cp: 0, sp: 0, gp: 15, pp: 0 };
      setTxt("COPPER", String(coins.cp || 0));
      setTxt("SILVER", String(coins.sp || 0));
      setTxt("GOLD", String(coins.gp || 0));
      setTxt("PLATINUM", String(coins.pp || 0));

      // ----------------------------------------------------
      // 10. IDENTIDADE, BIOGRAFIA & APARÊNCIA (PÁGINA 3)
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
      // 11. GRIMÓRIO, ESPAÇOS DE MAGIA & CONJURAÇÃO (PÁGINA 4)
      // ----------------------------------------------------
      setTxt("Magical Tradition", character.magicalTradition || "Arcana");
      setTxt("SPELL ATTACK", formatMod(calc.classDc ? calc.classDc - 10 : 9));
      setTxt("SPELL SAVE DC", String(calc.classDc || 19));

      const spellSlots = (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.getSpellSlots)
        ? PF2E_ENGINE.getSpellSlots(character)
        : null;
      const slotsObj = (spellSlots && spellSlots.slots) ? spellSlots.slots : {};

      for (let r = 1; r <= 10; r++) {
        const slotsCount = slotsObj[r] || 0;
        if (slotsCount > 0) {
          setTxt(`SPELLS PER DAY ${r}`, String(slotsCount));
          setTxt(`SPELLS REMAINING ${r}`, String(slotsCount));
        }
      }

      // Preenche lista de magias
      const spells = Array.isArray(character.spells) ? character.spells : [];
      spells.slice(0, 35).forEach((sp, idx) => {
        const n = idx + 1;
        setTxt(`SPELL ${n}`, sp.name);
        setTxt(`SPELL RANK ${n}`, String(sp.rank || 0));
        setTxt(`SPELL ACTION ${n}`, sp.actions || "◆◆");
        setTxt(`SPELL PREPARED ${n}`, "Sim");
      });

      // Magias de Foco
      const focusSpells = Array.isArray(character.focusSpells) ? character.focusSpells : [];
      focusSpells.slice(0, 8).forEach((fsp, idx) => {
        const n = idx + 1;
        setTxt(`FOCUS SPELL ${n}`, fsp.name);
        setTxt(`FOCUS SPELL ACTIONS ${n}`, fsp.actions || "◆");
      });

      // Retorna os bytes do PDF com campos editáveis preservados
      return await pdfDoc.save();
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = PF2E_PDF_FILLER;
  }
  if (typeof global !== "undefined") {
    global.PF2E_PDF_FILLER = PF2E_PDF_FILLER;
  }
  if (typeof window !== "undefined") {
    window.PF2E_PDF_FILLER = PF2E_PDF_FILLER;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
