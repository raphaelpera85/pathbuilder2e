function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function escapeInlineArgument(value) {
  return escapeHtml(JSON.stringify(String(value ?? "")));
}

function assertSafeCharacterDocument(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Ficha inválida.");
  const serialized = JSON.stringify(value);
  if (serialized.length > 1_000_000) throw new Error("A ficha excede o limite de 1 MB.");
  const level = Number(value.level);
  if (!Number.isInteger(level) || level < 1 || level > 20) throw new Error("O nível deve estar entre 1 e 20.");
  if (typeof value.name !== "string" || !value.name.trim() || value.name.length > 120) throw new Error("Nome de personagem inválido.");
  const visit = (entry, depth = 0) => {
    if (depth > 12) throw new Error("A ficha contém dados aninhados demais.");
    if (!entry || typeof entry !== "object") return;
    for (const [key, child] of Object.entries(entry)) {
      if (["__proto__", "prototype", "constructor"].includes(key)) throw new Error("A ficha contém uma chave não permitida.");
      visit(child, depth + 1);
    }
  };
  visit(value);
  return structuredClone(value);
}

/**
 * PATHBUILDER 2E LOCAL - CONTROLADOR DA INTERFACE (PT-BR)
 * Construtor local com árvore de progressão, dados rápidos e ficha própria para impressão.
 */

class PathbuilderApp {
  constructor() {
    this.character = null;
    this.calc = null;
    this.diceHistory = [];
    this.currentPickerType = null;
    this.selectedPickerItem = null;
    this.activeModalTab = "All";
    this.init();
  }

  async init() {
    await this.loadInitialCharacter();
  }

  async loadInitialCharacter() {
    const savedLocal = localStorage.getItem("pf2e_current_character");
    if (savedLocal) {
      try {
        this.character = assertSafeCharacterDocument(JSON.parse(savedLocal));
        this.renderAll();
        return;
      } catch (e) {
        console.warn("Erro ao carregar do localStorage:", e);
      }
    }
    await this.switchCharacter("Lorenzo_LaRosa");
  }

  async switchCharacter(charId) {
    try {
      const resp = await fetch(`characters/${charId}.json`);
      if (resp.ok) {
        this.character = assertSafeCharacterDocument(await resp.json());
      } else {
        this.character = this.getDefaultCharacter(charId);
      }
    } catch (e) {
      this.character = this.getDefaultCharacter(charId);
    }
    this.renderAll();
  }

  getDefaultCharacter(charId) {
    if (charId === "Joao_Ranger") {
      return {
        id: "Joao_Ranger",
        name: "João",
        level: 1,
        ancestry: "Humano",
        heritage: "Humano Versátil (Talento Geral extra)",
        class: "Patrulheiro (Ranger)",
        background: "Batedor Selvagem (Wilderness Scout)",
        subclass: "Vantagem: Precisão (Precision)",
        abilities: { str: 14, dex: 18, con: 14, int: 10, wis: 14, cha: 8 },
        savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
        perceptionRank: "Especialista",
        equippedArmor: { name: "Couro Batido Reforçado", category: "Leve", acBonus: 2, dexCap: 3, bulk: 1 },
        weapons: [
          { name: "Arco Longo Composto", category: "Marcial", damage: "1d8", damageType: "Perfuração", damageBonus: 1, traits: ["Propulsivo", "Mortal d10", "Voleio 30 pés", "Alcance 100 pés"] },
          { name: "Faca de Caça (Kukri)", category: "Marcial", damage: "1d6", damageType: "Cortante", damageBonus: 2, traits: ["Ágil", "Acurada", "Desarmar"] },
          { name: "Chifrada de Bode Montês (Bóreas)", category: "Desarmado", damage: "1d6", damageType: "Impacto", damageBonus: 3, traits: ["Empurrão", "Precisão +1d8"] }
        ],
        skills: { stealth: "Treinado", survival: "Treinado", nature: "Treinado", medicine: "Treinado", athletics: "Treinado", acrobatics: "Treinado" },
        loreSkills: [{ name: "Saber das Terras Ermas", rank: "Treinado" }],
        coins: { gp: 3, sp: 8 }
      };
    }
    return {
      id: "Lorenzo_LaRosa",
      name: "Lorenzo LaRosa",
      level: 1,
      ancestry: "Humano",
      heritage: "Humano Versátil (Talento Geral extra)",
      class: "Espadachim (Swashbuckler)",
      background: "Duelista de Oppara (Dueling Noble)",
      subclass: "Esgrimista (Fencer)",
      abilities: { str: 10, dex: 18, con: 14, int: 10, wis: 12, cha: 16 },
      savingThrows: { fortitude: "Treinado", reflex: "Especialista", will: "Especialista" },
      perceptionRank: "Especialista",
      equippedArmor: { name: "Couro Batido Sob Medida", category: "Leve", acBonus: 1, dexCap: 4, bulk: 1 },
      weapons: [
        { name: "Rapieira da Casa LaRosa", category: "Marcial", damage: "1d6", damageType: "Perfuração", traits: ["Acurada (Finesse)", "Mortal d8", "Desarmar"] },
        { name: "Adaga de Duelo (Main-gauche)", category: "Simples", damage: "1d4", damageType: "Perfuração", traits: ["Ágil", "Acurada", "Aparar (Parry)"] }
      ],
      skills: { acrobatics: "Treinado", deception: "Treinado", diplomacy: "Treinado", intimidation: "Treinado", stealth: "Treinado", society: "Treinado" },
      loreSkills: [{ name: "Saber de Duelo", rank: "Treinado" }, { name: "Saber de Oppara", rank: "Treinado" }],
      coins: { gp: 3, sp: 5 }
    };
  }

  formatMovementSpeeds(calc = this.calc) {
    const movement = calc?.movementSpeeds || { land: calc?.speed || 0, swim: 0, climb: 0 };
    const parts = [`${movement.land}ft.`];
    if (movement.swim > 0) parts.push(`Natação ${movement.swim}ft.`);
    if (movement.climb > 0) parts.push(`Escalada ${movement.climb}ft.`);
    return parts.join(" · ");
  }

  // RENDERIZAÇÃO COMPLETA REATIVA
  renderAll() {
    if (!this.character) return;
    this.calc = PF2E_ENGINE.calculateCharacterStats(this.character);

    // 1. Top Bar & Tab
    const topTitle = `${this.character.name} - ${this.character.class} ${this.character.level}`;
    document.getElementById("topCharTitle").innerText = topTitle;
    document.title = `${this.character.name} | Pathbuilder 2e Local`;
    window.dispatchEvent(new Event("pathbuilder:character-render"));

    // 2. Left Tree Nodes (Dynamic 1-20 Level Plan Tree)
    this.renderPlanTree();

    // 3. Middle Stats Column
    document.getElementById("charName").value = this.character.name || "";
    document.getElementById("charLevel").value = this.character.level || 1;
    document.getElementById("charSize").innerText = this.calc.size || "Médio";
    document.getElementById("charSpeed").innerText = this.formatMovementSpeeds();

    // Modificadores de Atributo (Mini Bar)
    document.getElementById("modStr").innerText = PF2E_ENGINE.formatMod(this.calc.mods.str);
    document.getElementById("modDex").innerText = PF2E_ENGINE.formatMod(this.calc.mods.dex);
    document.getElementById("modCon").innerText = PF2E_ENGINE.formatMod(this.calc.mods.con);
    document.getElementById("modInt").innerText = PF2E_ENGINE.formatMod(this.calc.mods.int);

    // Vitais (AC, HP, Escudo, Saves)
    document.getElementById("acVal").innerText = this.calc.ac.total;
    document.getElementById("hpVal").innerText = `${this.calc.currentHp} / ${this.calc.maxHp}`;
    
    const shieldStatus = document.getElementById("shieldStatusText");
    const shieldBonus = document.getElementById("shieldBonusText");
    if (this.character.shieldRaised) {
      shieldStatus.innerText = "Escudo Erguido (+2 CA)";
      shieldBonus.innerText = "Abaixar";
      shieldStatus.style.color = "var(--pb-orange)";
    } else {
      shieldStatus.innerText = "Sem Escudo (+0)";
      shieldBonus.innerText = "Erguer";
      shieldStatus.style.color = "var(--pb-text-muted)";
    }

    // Salvaguardas
    document.getElementById("fortVal").innerText = PF2E_ENGINE.formatMod(this.calc.saves.fortitude.total);
    document.getElementById("refVal").innerText = PF2E_ENGINE.formatMod(this.calc.saves.reflex.total);
    document.getElementById("willVal").innerText = PF2E_ENGINE.formatMod(this.calc.saves.will.total);

    document.getElementById("fortRankBadge").innerText = (this.calc.saves.fortitude.rank || "T")[0];
    document.getElementById("refRankBadge").innerText = (this.calc.saves.reflex.rank || "E")[0];
    document.getElementById("willRankBadge").innerText = (this.calc.saves.will.rank || "E")[0];

    document.getElementById("fortRankBadge").className = `teml-circle ${(this.calc.saves.fortitude.rank || "T")[0].toLowerCase()}`;
    document.getElementById("refRankBadge").className = `teml-circle ${(this.calc.saves.reflex.rank || "E")[0].toLowerCase()}`;
    document.getElementById("willRankBadge").className = `teml-circle ${(this.calc.saves.will.rank || "E")[0].toLowerCase()}`;

    // CD de Classe, Percepção e Iniciativa
    document.getElementById("classDcVal").innerText = `${this.calc.classDc} CD de Classe`;
    document.getElementById("percVal").innerText = PF2E_ENGINE.formatMod(this.calc.perception.total);
    document.getElementById("initVal").innerText = PF2E_ENGINE.formatMod(this.calc.perception.total);

    // Sentidos Especiais
    const sensesContainer = document.getElementById("sensesBadgeList");
    if (sensesContainer) {
      const senses = this.calc.senses || [];
      if (senses.length > 0) {
        sensesContainer.innerHTML = senses.map(s => `<span style="background:rgba(59,130,246,0.15); color:var(--pb-blue); padding:1px 6px; border-radius:4px; border:1px solid rgba(59,130,246,0.3);">👁️ ${escapeHtml(s)}</span>`).join("");
      } else {
        sensesContainer.innerHTML = `<span style="color:var(--pb-text-dim);">Visão Normal</span>`;
      }
    }

    // 4. Lista de Perícias da Coluna Central
    this.renderSkillsColumn();

    // 5. Abas Principais
    this.renderWeaponsTab();
    this.renderDefenseTab();
    this.renderGearTab();
    this.renderSpellsTab();
    this.renderPetsTab();
    this.renderDetailsTab();
    this.renderFeatsTab();
    this.renderActionsTab();
    this.renderConditions();
  }

  // RENDERIZAÇÃO DA COLUNA DE PERÍCIAS (EXATAMENTE COMO NO PATHBUILDER)
  renderSkillsColumn() {
    const list = document.getElementById("skillsColList");
    const badge = document.getElementById("trainedSkillsBadge");
    
    const trainedSummary = this.calc.trainedSkills || PF2E_ENGINE.calculateTrainedSkillsCount(this.character);
    if (badge) {
      badge.innerText = `${trainedSummary.selectedSkills.length} / ${trainedSummary.totalAllowed}`;
      badge.title = `Treinadas: ${trainedSummary.selectedSkills.length} de ${trainedSummary.totalAllowed} (Classe: ${trainedSummary.classBase} + INT: ${PF2E_ENGINE.formatMod(trainedSummary.intMod)})`;
    }

    let html = "";

    // Perícias Oficiais
    PF2E_DATA.skills.forEach(sk => {
      const calcSk = this.calc.skills[sk.id];
      const rankInitial = (calcSk.rank || "Destreinado")[0].toUpperCase();
      const rankClass = rankInitial.toLowerCase();
      html += `
        <div class="skill-item-row" onclick="app.rollCheck(${escapeInlineArgument(`Perícia: ${sk.name}`)}, ${calcSk.total})" title="Clique para rolar d20 com bônus">
          <span class="teml-circle ${rankClass}" onclick="event.stopPropagation(); app.cycleSkillRank(${escapeInlineArgument(sk.id)})" title="Alternar Proficiência">${rankInitial}</span>
          <span class="skill-roll-val">${PF2E_ENGINE.formatMod(calcSk.total)}</span>
          <span class="skill-name-text">${escapeHtml(sk.name)}</span>
        </div>
      `;
    });

    // Perícias de Lore (Conhecimento)
    (this.calc.loreSkills || []).forEach((l, idx) => {
      const rankInitial = (l.rank || "Treinado")[0].toUpperCase();
      html += `
        <div class="skill-item-row" style="background: rgba(249, 115, 22, 0.05);" onclick="app.rollCheck(${escapeInlineArgument(`Lore: ${l.name}`)}, ${l.total})">
          <span class="teml-circle t">${rankInitial}</span>
          <span class="skill-roll-val">${PF2E_ENGINE.formatMod(l.total)}</span>
          <span class="skill-name-text">Lore: ${escapeHtml(l.name)}</span>
          <span onclick="event.stopPropagation(); app.removeLoreSkill(${idx})" style="color:var(--pb-text-dim); font-size:10px;">✕</span>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  // ABA DE ARMAS
  renderWeaponsTab() {
    const container = document.getElementById("weaponsList");
    if (!this.calc.strikes || this.calc.strikes.length === 0) {
      container.innerHTML = `<div style="color:var(--pb-text-muted); text-align:center; padding:30px;">Nenhuma arma equipada. Clique em 'Adicionar Arma' para escolher no compêndio!</div>`;
      return;
    }

    container.innerHTML = this.calc.strikes.map((s, idx) => {
       const traitsHtml = (s.traits || []).map(t => `<span class="trait-tag">${escapeHtml(t)}</span>`).join('');
      return `
        <div class="strike-card" style="border-left-color: var(--pb-orange); background: var(--pb-bg-panel);">
          <div class="strike-header">
             <div style="font-weight:bold; font-size:14px; color:#fff;">🗡️ ${escapeHtml(s.name)} <span style="font-size:11px; color:var(--pb-text-muted);">(${escapeHtml(s.category)})</span></div>
            <button onclick="app.removeWeapon(${idx})" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer;">🗑️</button>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin: 6px 0;">
            <div class="map-buttons-row">
              <span style="font-size:11px; color:var(--pb-text-muted);">Ataque (MAP):</span>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${s.name} [1º Ataque]`)}, ${s.map[0]})">${PF2E_ENGINE.formatMod(s.map[0])}</button>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${s.name} [2º Ataque MAP]`)}, ${s.map[1]})">${PF2E_ENGINE.formatMod(s.map[1])}</button>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${s.name} [3º Ataque MAP]`)}, ${s.map[2]})">${PF2E_ENGINE.formatMod(s.map[2])}</button>
            </div>

             <button class="strike-damage-box" onclick="app.rollDamage(${escapeInlineArgument(s.name)}, ${escapeInlineArgument(s.damageFormatted)})">
               💥 Dano: ${escapeHtml(s.damageFormatted)}
            </button>
          </div>

          <div class="traits-row">${traitsHtml}</div>
        </div>
      `;
    }).join('');
  }

  // ABA DE DEFESA
  renderDefenseTab() {
    const d = document.getElementById("defenseDetails");
    const arm = this.character.equippedArmor || { name: "Sem Armadura", acBonus: 0, dexCap: 5 };
    d.innerHTML = `
      <div class="strike-card" style="border-left-color: #3b82f6;">
        <div style="font-weight:bold; color:var(--pb-orange); font-size:14px;">🛡️ Armadura Equipada: ${escapeHtml(arm.name)}</div>
        <div style="font-size:12px; margin-top:6px; line-height:1.6;">
          • Bônus de CA do Item: <strong>+${arm.acBonus || 0}</strong><br>
          • Limite Máximo de Destreza: <strong>+${arm.dexCap !== undefined ? arm.dexCap : 5}</strong><br>
          • Penalidade de Teste: <strong>${arm.checkPenalty || 0}</strong><br>
          • Penalidade de Velocidade: <strong>${arm.speedPenalty || 0} pés</strong><br>
          • Força Exigida: <strong>${arm.strReq || 10}</strong>
        </div>
      </div>
    `;
  }

  // ABA DE EQUIPAMENTOS
  renderGearTab() {
    const list = document.getElementById("gearList");
    if (!list) return;
    const inv = this.character.inventory || [];
    const coins = this.character.coins || { pp: 0, gp: 15, sp: 0, cp: 0 };
    
    // Bulk calculated by engine (includes items + coins + encumbered detection)
    const totalBulk = this.calc.bulk.total;
    const encumberedLimit = this.calc.bulk.encumbered;
    const maxBulk = this.calc.bulk.max;
    const isEncumbered = this.calc.bulk.isEncumbered;

    const bulkEl = document.getElementById("gearBulkDisplay");
    if (bulkEl) {
      bulkEl.innerHTML = `${totalBulk} / ${maxBulk} Carga ${isEncumbered ? '<span style="color:#ef4444; font-weight:bold;">(SOBRECARREGADO: -3m vel., Debilitado 1)</span>' : `<span style="color:var(--pb-text-muted);">(Limite s/ penalidade: ${encumberedLimit})</span>`}`;
    }

    const coinsHtml = `
      <div style="background:var(--pb-bg-panel); border:1px solid var(--pb-border); border-radius:6px; padding:10px 14px; margin-bottom:14px;">
        <div style="font-size:12px; font-weight:bold; color:var(--pb-orange); margin-bottom:8px; display:flex; justify-content:space-between;">
          <span>💰 Moedas & Fortuna</span>
          <span style="font-size:11px; color:var(--pb-text-muted);">Carga Moedas: +${this.calc.bulk.coinsBulk} Bulk</span>
        </div>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; text-align:center;">
          <div>
            <label style="font-size:10px; color:#a855f7; display:block; font-weight:bold; margin-bottom:2px;">Platina (PP)</label>
            <input type="number" min="0" value="${coins.pp || 0}" onchange="app.updateCoins('pp', this.value)" style="width:100%; text-align:center; background:#0f172a; border:1px solid var(--pb-border); color:#fff; padding:4px; border-radius:4px;" />
          </div>
          <div>
            <label style="font-size:10px; color:#eab308; display:block; font-weight:bold; margin-bottom:2px;">Ouro (GP)</label>
            <input type="number" min="0" value="${coins.gp || 0}" onchange="app.updateCoins('gp', this.value)" style="width:100%; text-align:center; background:#0f172a; border:1px solid var(--pb-border); color:#fff; padding:4px; border-radius:4px;" />
          </div>
          <div>
            <label style="font-size:10px; color:#cbd5e1; display:block; font-weight:bold; margin-bottom:2px;">Prata (SP)</label>
            <input type="number" min="0" value="${coins.sp || 0}" onchange="app.updateCoins('sp', this.value)" style="width:100%; text-align:center; background:#0f172a; border:1px solid var(--pb-border); color:#fff; padding:4px; border-radius:4px;" />
          </div>
          <div>
            <label style="font-size:10px; color:#b45309; display:block; font-weight:bold; margin-bottom:2px;">Cobre (CP)</label>
            <input type="number" min="0" value="${coins.cp || 0}" onchange="app.updateCoins('cp', this.value)" style="width:100%; text-align:center; background:#0f172a; border:1px solid var(--pb-border); color:#fff; padding:4px; border-radius:4px;" />
          </div>
        </div>
      </div>
    `;

    const itemsHtml = inv.length === 0 ? `<div style="color:var(--pb-text-muted); text-align:center; padding:20px;">Nenhum item na mochila. Clique em '➕ Adicionar Item'.</div>` : inv.map((item, idx) => `
      <div class="save-item" style="background: var(--pb-bg-panel); margin-bottom:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
        <div>📦 <strong>${escapeHtml(item.name)}</strong> <span style="font-size:11px; color:var(--pb-text-muted);">(Qtd: ${escapeHtml(item.qty || 1)}, Carga: ${escapeHtml(item.bulk !== undefined ? item.bulk : 0)})</span></div>
        <button onclick="app.removeInventoryItem(${idx})" title="Remover item" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer; font-size:14px;">🗑️</button>
      </div>
    `).join('');

    list.innerHTML = coinsHtml + itemsHtml;
  }

  getCurrentLocale() {
    const locale = localStorage.getItem("pathbuilder.locale");
    return locale === "en" || locale === "es" ? locale : "pt-BR";
  }

  getTraditionLabel(tradition, locale = this.getCurrentLocale()) {
    const labels = {
      "pt-BR": { arcane: "Arcana", divine: "Divina", occult: "Ocultista", primal: "Primal" },
      en: { arcane: "Arcane", divine: "Divine", occult: "Occult", primal: "Primal" },
      es: { arcane: "Arcana", divine: "Divina", occult: "Ocultista", primal: "Primordial" }
    };
    return labels[locale]?.[tradition] || tradition;
  }

  getSpellCompatibilityMessage(compatibility, locale = this.getCurrentLocale()) {
    const tradition = this.getTraditionLabel(compatibility.tradition, locale);
    const messages = {
      "pt-BR": {
        "compatible": `Compatível com a tradição ${tradition}.`,
        "no-spellcasting": "A classe atual não possui conjuração catalogada.",
        "tradition-required": "Escolha primeiro a tradição concedida pela subclasse.",
        "rank-too-high": `Seu nível permite magias de até ranque ${compatibility.maximumRank}.`,
        "tradition-mismatch": `Esta magia não pertence à tradição ${tradition}.`
      },
      en: {
        "compatible": `Compatible with the ${tradition} tradition.`,
        "no-spellcasting": "The current class has no catalogued spellcasting.",
        "tradition-required": "First choose the tradition granted by the subclass.",
        "rank-too-high": `Your level allows spells up to rank ${compatibility.maximumRank}.`,
        "tradition-mismatch": `This spell does not belong to the ${tradition} tradition.`
      },
      es: {
        "compatible": `Compatible con la tradición ${tradition}.`,
        "no-spellcasting": "La clase actual no tiene lanzamiento de conjuros catalogado.",
        "tradition-required": "Primero elige la tradición concedida por la subclase.",
        "rank-too-high": `Tu nivel permite conjuros de hasta rango ${compatibility.maximumRank}.`,
        "tradition-mismatch": `Este conjuro no pertenece a la tradición ${tradition}.`
      }
    };
    return messages[locale]?.[compatibility.reason] || compatibility.reason;
  }

  reconcileSpellcastingProfile() {
    const profile = PF2E_ENGINE.getSpellcastingProfile(this.character);
    if (!profile) {
      this.character.magicTradition = "";
      return;
    }
    if (profile.traditionMode === "fixed") {
      this.character.magicTradition = profile.traditions[0];
      return;
    }
    const current = PF2E_ENGINE.normalizeTradition(this.character.magicTradition);
    this.character.magicTradition = profile.traditions.includes(current) ? current : "";
  }

  applyClassSelection(item) {
    this.character.class = item.name;
    this.reconcileSpellcastingProfile();
  }

  updateMagicTradition(value) {
    const profile = PF2E_ENGINE.getSpellcastingProfile(this.character);
    const normalized = PF2E_ENGINE.normalizeTradition(value);
    if (profile?.traditionMode !== "fixed" && profile?.traditions?.includes(normalized)) {
      this.character.magicTradition = normalized;
      this.renderAll();
    }
  }

  renderSpellcastingProfile(locale = this.getCurrentLocale()) {
    const target = document.getElementById("spellcastingProfile");
    if (!target) return;
    const profile = PF2E_ENGINE.getSpellcastingProfile(this.character);
    const copy = {
      "pt-BR": { title: "Perfil de conjuração", none: "A classe atual não possui conjuração de magias catalogada.", tradition: "Tradição", choose: "Escolha a tradição da subclasse", fixed: "Tradição fixa da classe", maximum: "Ranque máximo pelo nível", prepared: "Preparada", spontaneous: "Espontânea", bounded: "Limitada" },
      en: { title: "Spellcasting profile", none: "The current class has no catalogued spellcasting.", tradition: "Tradition", choose: "Choose the subclass tradition", fixed: "Class fixed tradition", maximum: "Maximum rank by level", prepared: "Prepared", spontaneous: "Spontaneous", bounded: "Bounded" },
      es: { title: "Perfil de lanzamiento", none: "La clase actual no tiene lanzamiento de conjuros catalogado.", tradition: "Tradición", choose: "Elige la tradición de la subclase", fixed: "Tradición fija de clase", maximum: "Rango máximo por nivel", prepared: "Preparada", spontaneous: "Espontánea", bounded: "Limitada" }
    }[locale];
    if (!profile) {
      target.innerHTML = `<div><strong>${copy.title}</strong><span>${copy.none}</span></div>`;
      return;
    }
    const current = profile.traditionMode === "fixed" ? profile.traditions[0] : PF2E_ENGINE.normalizeTradition(this.character.magicTradition);
    const options = profile.traditions.map(tradition => `<option value="${tradition}"${current === tradition ? " selected" : ""}>${escapeHtml(this.getTraditionLabel(tradition, locale))}</option>`).join("");
    const placeholder = profile.traditionMode === "fixed" ? "" : `<option value=""${current ? "" : " selected"}>${copy.choose}</option>`;
    const disabled = profile.traditionMode === "fixed" ? " disabled" : "";
    const preparation = copy[profile.preparation] || profile.preparation;
    target.innerHTML = `<div><strong>${copy.title}</strong><span>${profile.traditionMode === "fixed" ? copy.fixed : copy.choose} · ${preparation} · ${copy.maximum}: ${PF2E_ENGINE.getMaximumSpellRank(this.character)}</span></div><label><span>${copy.tradition}</span><select onchange="app.updateMagicTradition(this.value)"${disabled}>${placeholder}${options}</select></label>`;
  }

  // ABA DE MAGIAS
  renderSpellsTab() {
    const list = document.getElementById("spellsList");
    const ritualList = document.getElementById("ritualsList");
    const spells = this.character.spells || [];
    const rituals = this.character.rituals || [];
    const locale = this.getCurrentLocale();
    const copy = {
      "pt-BR": { emptySpells: "Nenhuma magia adicionada.", emptyRituals: "Nenhum ritual aprendido.", rank: "Ranque", source: "Fonte" },
      en: { emptySpells: "No spells added.", emptyRituals: "No rituals learned.", rank: "Rank", source: "Source" },
      es: { emptySpells: "No hay conjuros añadidos.", emptyRituals: "No hay rituales aprendidos.", rank: "Rango", source: "Fuente" }
    }[locale];
    document.getElementById("spellDcText").innerText = this.calc.classDc;
    document.getElementById("spellAtkText").innerText = PF2E_ENGINE.formatMod(this.calc.classDc - 10);
    this.renderSpellcastingProfile(locale);

    // Espaços de Magia & Pontos de Foco
    const slotsInfo = PF2E_ENGINE.getSpellSlots(this.character);
    const slotsUsed = this.character.spellSlotsUsed || {};
    const curFocus = this.character.focusPointsCurrent !== undefined ? this.character.focusPointsCurrent : (slotsInfo?.focusPoints || 0);

    let slotsTrackerHtml = "";
    if (slotsInfo && (slotsInfo.hasSpellcasting || slotsInfo.focusPoints > 0)) {
      let ranksHtml = "";
      for (let r = 1; r <= 10; r++) {
        const total = slotsInfo.slots[r] || 0;
        if (total > 0) {
          const used = Math.min(total, slotsUsed[r] || 0);
          const remaining = Math.max(0, total - used);
          ranksHtml += `
            <div style="background:var(--pb-bg-panel); border:1px solid var(--pb-border); border-radius:4px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="font-weight:bold; font-size:12px; color:var(--pb-orange);">${copy.rank} ${r}:</span>
                <span style="font-size:12px; margin-left:4px;">${remaining} / ${total} Disp.</span>
              </div>
              <div style="display:flex; gap:4px;">
                <button type="button" onclick="app.expendSpellSlot(${r})" ${remaining <= 0 ? 'disabled' : ''} style="background:var(--pb-orange); color:#000; font-weight:bold; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:11px;">Gastar</button>
                <button type="button" onclick="app.restoreSpellSlot(${r})" ${used <= 0 ? 'disabled' : ''} style="background:#334155; color:#fff; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:11px;">Restaurar</button>
              </div>
            </div>
          `;
        }
      }

      let focusHtml = "";
      if (slotsInfo && slotsInfo.focusPoints > 0) {
        focusHtml = `
          <div style="background:var(--pb-bg-panel); border:1px solid var(--pb-border); border-radius:4px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-weight:bold; font-size:12px; color:#38bdf8;">Pontos de Foco:</span>
              <span style="font-size:12px; margin-left:4px;">${curFocus} / ${slotsInfo.focusPoints}</span>
            </div>
            <div style="display:flex; gap:4px;">
              <button type="button" onclick="app.useFocusPoint()" ${curFocus <= 0 ? 'disabled' : ''} style="background:#0284c7; color:#fff; font-weight:bold; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:11px;">Usar Foco</button>
              <button type="button" onclick="app.refocusPoint()" ${curFocus >= slotsInfo.focusPoints ? 'disabled' : ''} style="background:#334155; color:#fff; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:11px;">Refocar (+1)</button>
            </div>
          </div>
        `;
      }

      slotsTrackerHtml = `
        <div style="margin-bottom:16px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:12px; color:#fff;">Espaços de Magia (${slotsInfo && slotsInfo.isBounded ? "Magia Limitada" : "Conjurador"})</strong>
            <button type="button" onclick="app.restoreAllSpellSlots()" style="background:none; border:1px solid var(--pb-border); color:var(--pb-orange); padding:2px 8px; border-radius:4px; font-size:11px; cursor:pointer;">⚡ Restaurar Todos os Espaços</button>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
            ${ranksHtml}
            ${focusHtml}
          </div>
        </div>
      `;
    }

    let spellsContent = "";
    if (spells.length === 0) {
      spellsContent = `<div class="spell-empty">${copy.emptySpells}</div>`;
    } else {
      spellsContent = spells.map((sp, idx) => {
        const displayName = sp.names?.[locale] || sp.name;
        const description = sp.summaries?.[locale] || sp.description || "";
        const casting = sp.castingTimes?.[locale] || sp.actions || "";
        const traditions = sp.traditionNames?.[locale]?.join(", ") || sp.traditions?.join(", ") || "";
        const source = sp.source?.book ? `${sp.source.book}${sp.source.page ? ` · p. ${sp.source.page}` : ""}` : "";
        const compatibility = sp.manual ? null : PF2E_ENGINE.getSpellCompatibility(this.character, sp);
        const compatibilityMessage = compatibility && compatibility.state !== "available" ? this.getSpellCompatibilityMessage(compatibility, locale) : "";
        return `
          <article class="strike-card spell-card">
            <div class="strike-header">
              <span><strong>✨ ${escapeHtml(displayName)}</strong> · ${copy.rank} ${escapeHtml(sp.rank ?? sp.level ?? "")}</span>
              <button type="button" onclick="app.removeSpell(${idx})" aria-label="Remover ${escapeHtml(displayName)}">🗑️</button>
            </div>
            <div class="spell-card-meta">${escapeHtml(casting)}${traditions ? ` · ${escapeHtml(traditions)}` : ""}</div>
            ${compatibilityMessage ? `<div class="spell-compatibility-warning">⚠ ${escapeHtml(compatibilityMessage)}</div>` : sp.manual ? `<div class="spell-compatibility-warning review">⚠ ${locale === "pt-BR" ? "Entrada manual ainda não verificada." : locale === "en" ? "Manual entry not yet verified." : "Entrada manual aún no verificada."}</div>` : ""}
            <p>${escapeHtml(description)}</p>
            ${source ? `<small>${copy.source}: ${escapeHtml(source)}</small>` : ""}
          </article>`;
      }).join("");
    }

    list.innerHTML = slotsTrackerHtml + spellsContent;

    if (!ritualList) return;
    ritualList.innerHTML = rituals.length === 0 ? `<div class="spell-empty">${copy.emptyRituals}</div>` : rituals.map((ritual, idx) => {
      const displayName = ritual.names?.[locale] || ritual.name;
      const description = ritual.summaries?.[locale] || ritual.description || "";
      const casting = ritual.castingTimes?.[locale] || "";
      const check = ritual.primaryChecks?.[locale] || "";
      const source = ritual.source?.book ? `${ritual.source.book}${ritual.source.page ? ` · p. ${ritual.source.page}` : ""}` : "";
      return `
        <article class="strike-card ritual-card">
          <div class="strike-header">
            <span><strong>◈ ${escapeHtml(displayName)}</strong> · ${copy.rank} ${escapeHtml(ritual.rank ?? "")}</span>
            <button type="button" onclick="app.removeRitual(${idx})" aria-label="Remover ${escapeHtml(displayName)}">🗑️</button>
          </div>
          <div class="spell-card-meta">${escapeHtml(casting)}${check ? ` · ${escapeHtml(check)}` : ""}</div>
          <p>${escapeHtml(description)}</p>
          ${source ? `<small>${copy.source}: ${escapeHtml(source)}</small>` : ""}
        </article>`;
    }).join("");
  }

  // ABA DE MASCOTES / COMPANHEIRO ANIMAL
  renderPetsTab() {
    const p = document.getElementById("petsContent");
    if (this.character.id === "Joao_Ranger") {
      p.innerHTML = `
        <div class="strike-card" style="border-left-color: var(--pb-orange); background: var(--pb-bg-panel);">
          <div style="font-weight:bold; color:var(--pb-orange); font-size:15px;">🐐 Bóreas — O Bode Negro das Montanhas</div>
          <div style="font-size:11px; color:var(--pb-text-muted); margin-bottom:8px;">Companheiro Animal • Carneiro Montês / Bode de Guerra</div>
          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:6px; margin-bottom:10px;">
            <div class="vital-box"><span class="vital-label">PV</span><span class="vital-value" style="color:var(--hp-green);">16</span></div>
            <div class="vital-box"><span class="vital-label">CA</span><span class="vital-value" style="color:#60a5fa;">16</span></div>
            <div class="vital-box"><span class="vital-label">Velocidade</span><span class="vital-value">35ft</span></div>
            <div class="vital-box"><span class="vital-label">Percepção</span><span class="vital-value">+5</span></div>
          </div>
          <div style="font-size:12px; line-height:1.6;">
            • <strong>Ataque Chifrada:</strong> +6 no acerto | <strong>1d6+3 Impacto</strong> (+1d8 Precisão com Presa Caçada) [Empurrão].<br>
            • <strong>Benefício de Suporte:</strong> Deixa o oponente <strong>Desprevenido (-2 CA)</strong> contra as flechas de João.<br>
            • <strong>Comandar Animal [1 Ação]:</strong> Concede 2 ações para Bóreas se mover e chifrar.
          </div>
        </div>
      `;
    } else {
      p.innerHTML = `<div style="color:var(--pb-text-muted); text-align:center; padding:30px;">Nenhum mascote ou companheiro animal associado.</div>`;
    }
  }

  // ABA DE DETALHES
  renderDetailsTab() {
    document.getElementById("detDeity").value = this.character.deity || "";
    document.getElementById("detAppearance").value = this.character.appearance || "";
    document.getElementById("detBackstory").value = this.character.backstory || "";
  }

  // ABA DE TALENTOS
  renderFeatsTab() {
    const list = document.getElementById("featsFullList");
    const feats = this.character.feats || [];
    list.innerHTML = feats.map((f, idx) => `
      <div class="strike-card" style="border-left-color: var(--pb-teml-e);">
        <div class="strike-header">
          <span style="font-weight:bold; color:var(--pb-orange);">${escapeHtml(f.name)} <span class="trait-tag">${escapeHtml(f.type || "Talento")}</span></span>
          <button onclick="app.removeFeat(${idx})" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer;">🗑️</button>
        </div>
        <div style="font-size:12px; color:var(--pb-text); margin-top:4px;">${escapeHtml(f.description || "")}</div>
      </div>
    `).join('');
  }

  // ABA DE AÇÕES
  renderActionsTab() {
    const list = document.getElementById("actionsFullList");
    const actions = (this.character.classFeatures || []).concat(this.character.feats || []);
    list.innerHTML = actions.map(act => `
      <div class="strike-card" style="border-left-color: var(--pb-orange);">
        <div style="font-weight:bold; color:var(--pb-orange); font-size:13px;">${escapeHtml(act.name)}</div>
        <div style="font-size:12px; color:var(--pb-text); margin-top:4px;">${escapeHtml(act.description || "")}</div>
      </div>
    `).join('');
  }

  renderConditions() {
    const target = document.getElementById("activeConditions");
    if (!target) return;
    const conditions = this.character.conditions || [];
    const buffs = this.character.buffs || [];
    target.innerHTML = conditions.concat(buffs).map((item, idx) => `
      <span class="trait-tag" title="${escapeHtml(item.description || "")}">${escapeHtml(item.name)}${item.value > 1 ? ` ${escapeHtml(item.value)}` : ""}
        <button type="button" onclick="app.removeCondition(${idx}, ${idx >= conditions.length})" style="border:0;background:none;color:inherit;cursor:pointer">×</button>
      </span>
    `).join("");
  }

  removeCondition(index, isBuff) {
    const key = isBuff ? "buffs" : "conditions";
    if (this.character[key]) this.character[key].splice(isBuff ? index - (this.character.conditions || []).length : index, 1);
    this.renderAll();
  }

  // MODAL PICKER DUAL-PANE (SCREENSHOT 3 RECREATION)
  openPicker(type, options) {
    if (!window.pathbuilderPicker) {
      this.pendingPicker = { type, options };
      return;
    }
    window.pathbuilderPicker.open(type, options);
  }

  consumePendingPicker() {
    const pending = this.pendingPicker || null;
    this.pendingPicker = null;
    return pending;
  }

  closePicker() {
    window.pathbuilderPicker?.close();
  }

  getPickerItems(type) {
    if (type === "ancestry") {
      return Object.keys(PF2E_DATA.ancestries).map(k => ({ name: k, type: "Ancestralidade", data: PF2E_DATA.ancestries[k] }));
    }
    if (type === "class") {
      return Object.keys(PF2E_DATA.classes).map(k => ({ name: k, type: "Classe", data: PF2E_DATA.classes[k] }));
    }
    if (type === "background") {
      return PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Antecedente", data: b }));
    }
    if (type === "weapon") {
      return PF2E_DATA.weapons.map(w => ({ name: w.name, type: "Arma", data: w }));
    }
    if (type === "armor") {
      return PF2E_DATA.armors.map(a => ({ name: a.name, type: "Armadura", data: a }));
    }
    if (type === "heritage") {
      const ancestry = PF2E_DATA.ancestries[this.character?.ancestry];
      const heritages = (ancestry?.heritages || []).map(name => ({ name, type: "Herança", data: { name, description: "Herança da ancestralidade selecionada." } }));
      const versatile = (PF2E_DATA.versatileHeritages || []).map(h => ({ name: h.name, type: "Herança Versátil", data: h }));
      return heritages.concat(versatile);
    }
    if (type === "archetype") {
      return (PF2E_DATA.archetypes || []).map(a => ({ name: a.name, type: "Arquétipo", data: a }));
    }
    if (type === "spell") {
      const weights = { available: 0, "requires-choice": 1, incompatible: 2 };
      return (PF2E_DATA.spells || []).map(spell => {
        const compatibility = PF2E_ENGINE.getSpellCompatibility(this.character, spell);
        const selectionMessages = Object.fromEntries(["pt-BR", "en", "es"].map(locale => [locale, this.getSpellCompatibilityMessage(compatibility, locale)]));
        return { name: spell.name, type: "Magia", data: { ...spell, selectionState: compatibility.state, selectionMessages } };
      }).sort((a, b) => (weights[a.data.selectionState] - weights[b.data.selectionState]) || (a.data.rank - b.data.rank) || a.name.localeCompare(b.name));
    }
    if (type === "ritual") {
      return (PF2E_DATA.rituals || []).map(r => ({ name: r.name, type: "Ritual", data: r }));
    }
    if (type === "feat") {
      return (PF2E_DATA.feats || this.getFallbackFeatCatalog()).map(f => ({ name: f.name, type: f.type || "Talento", data: f }));
    }
    if (type === "condition") {
      return (PF2E_DATA.conditions || this.getConditionCatalog()).map(c => ({ name: c.name, type: "Condição", data: c }));
    }
    if (type === "buff") {
      return (PF2E_DATA.buffs || this.getBuffCatalog()).map(b => ({ name: b.name, type: "Benefício", data: b }));
    }
    return PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Geral", data: b }));
  }

  applyPickerSelection(type, item, options) {
    if (!item) return;
    const changesMaximumHp = type === "ancestry" || type === "class";
    const previousMaxHp = this.calc?.maxHp ?? PF2E_ENGINE.calculateCharacterStats(this.character).maxHp;
    const previousCurrentHp = this.character.currentHp ?? previousMaxHp;

    if (!this.character.progression) this.character.progression = {};

    if (type === "ancestry") this.applyAncestrySelection(item);
    else if (type === "class") this.applyClassSelection(item);
    else if (type === "background") this.character.background = item.name;
    else if (type === "weapon") {
      if (!this.character.weapons) this.character.weapons = [];
      this.character.weapons.push({ ...item.data });
    } else if (type === "armor") this.character.equippedArmor = { ...item.data };
    else if (type === "heritage") this.character.heritage = item.name;
    else if (type === "spell") {
      const compatibility = PF2E_ENGINE.getSpellCompatibility(this.character, item.data);
      if (compatibility.state !== "available") {
        alert(this.getSpellCompatibilityMessage(compatibility));
        return;
      }
      if (!this.character.spells) this.character.spells = [];
      const exists = this.character.spells.some(spell => item.data.id ? spell.id === item.data.id : spell.name === item.name);
      if (!exists) this.character.spells.push({ ...item.data, name: item.name, level: item.data.rank ?? item.data.level });
    } else if (type === "ritual") {
      if (!this.character.rituals) this.character.rituals = [];
      const exists = this.character.rituals.some(ritual => item.data.id ? ritual.id === item.data.id : ritual.name === item.name);
      if (!exists) this.character.rituals.push({ ...item.data, name: item.name });
    } else if (type === "feat") {
      if (options?.slotId) {
        this.character.progression[options.slotId] = item.name;
      }
      if (!this.character.feats) this.character.feats = [];
      const featObj = { ...item.data, name: item.name, slotId: options?.slotId, level: options?.level || this.character.level };
      if (options?.slotId) {
        const existingIdx = this.character.feats.findIndex(f => f.slotId === options.slotId);
        if (existingIdx >= 0) this.character.feats[existingIdx] = featObj;
        else this.character.feats.push(featObj);
      } else {
        this.character.feats.push(featObj);
      }
    } else if (type === "condition") {
      if (!this.character.conditions) this.character.conditions = [];
      if (!this.character.conditions.some(c => c.name === item.name)) this.character.conditions.push({ name: item.name, value: 1 });
    } else if (type === "buff") {
      if (!this.character.buffs) this.character.buffs = [];
      this.character.buffs.push({ ...item.data });
    }

    if (changesMaximumHp) this.reconcileCurrentHp(previousMaxHp, previousCurrentHp);

    this.renderAll();
  }

  reconcileCurrentHp(previousMaxHp, previousCurrentHp) {
    const damageTaken = Math.max(0, previousMaxHp - previousCurrentHp);
    const nextMaxHp = PF2E_ENGINE.calculateCharacterStats(this.character).maxHp;
    this.character.currentHp = Math.max(0, nextMaxHp - damageTaken);
  }

  applyAncestrySelection(item) {
    this.character.ancestry = item.name;
    const groups = Array.isArray(item.data?.selectionGroups) ? item.data.selectionGroups : [];
    if (groups.length > 0) {
      const selectedOptions = {};
      const resolve = (group) => {
        const selectedId = item.selection?.[group.id];
        const option = group.options.find(candidate => candidate.id === selectedId) || group.options[0];
        if (option) selectedOptions[group.id] = option.id;
        return option;
      };
      const resolved = Object.fromEntries(groups.map(group => [group.id, resolve(group)]));
      const size = resolved.size;
      const heritage = resolved.heritage;
      this.character.ancestryOptions = selectedOptions;
      this.character.size = size?.size || item.data.size || "Médio";
      this.character.heritage = heritage?.names?.["pt-BR"] || heritage?.id || item.data.heritages?.[0] || "";
      return;
    }
    delete this.character.ancestryOptions;
    this.character.size = item.data?.size || "Médio";
    this.character.heritage = item.data?.heritages?.[0] || "";
  }

  setModalTab(tabName, clickEvent) {
    this.activeModalTab = tabName;
    document.querySelectorAll(".pb-modal-tab-btn").forEach(b => b.classList.remove("active"));
    const target = clickEvent?.currentTarget || (typeof event !== "undefined" ? event.currentTarget : null);
    if (target) target.classList.add("active");
    this.renderModalLeftList();
  }

  filterModalList(query) {
    this.renderModalLeftList(query);
  }

  renderModalLeftList(filterQuery = "") {
    const container = document.getElementById("modalLeftList");
    let items = [];

    if (this.currentPickerType === "ancestry") {
      items = Object.keys(PF2E_DATA.ancestries).map(k => ({ name: k, type: "Ancestralidade", data: PF2E_DATA.ancestries[k] }));
    } else if (this.currentPickerType === "class") {
      items = Object.keys(PF2E_DATA.classes).map(k => ({ name: k, type: "Classe", data: PF2E_DATA.classes[k] }));
    } else if (this.currentPickerType === "background") {
      items = PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Antecedente", data: b }));
    } else if (this.currentPickerType === "weapon") {
      items = PF2E_DATA.weapons.map(w => ({ name: w.name, type: "Arma", data: w }));
    } else if (this.currentPickerType === "armor") {
      items = PF2E_DATA.armors.map(a => ({ name: a.name, type: "Armadura", data: a }));
    } else if (this.currentPickerType === "heritage") {
      const ancestry = PF2E_DATA.ancestries[this.character?.ancestry];
      const heritages = (ancestry?.heritages || []).map(name => ({ name, type: "Herança", data: { name, description: "Herança da ancestralidade selecionada." } }));
      const versatile = (PF2E_DATA.versatileHeritages || []).map(h => ({ name: h.name, type: "Herança Versátil", data: h }));
      items = heritages.concat(versatile);
    } else if (this.currentPickerType === "feat") {
      items = (PF2E_DATA.feats || this.getFallbackFeatCatalog()).map(f => ({ name: f.name, type: f.type || "Talento", data: f }));
    } else if (this.currentPickerType === "condition") {
      items = (PF2E_DATA.conditions || this.getConditionCatalog()).map(c => ({ name: c.name, type: "Condição", data: c }));
    } else if (this.currentPickerType === "buff") {
      items = (PF2E_DATA.buffs || this.getBuffCatalog()).map(b => ({ name: b.name, type: "Benefício", data: b }));
    } else {
      items = PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Geral", data: b }));
    }

    if (filterQuery) {
      items = items.filter(i => i.name.toLowerCase().includes(filterQuery.toLowerCase()));
    }

    container.innerHTML = items.map((item, idx) => `
      <div class="tree-node" style="margin-bottom:3px; padding:4px 6px;" onclick="app.selectPickerItem(${idx})">
        <div class="tree-node-icon" style="width:20px; height:20px; font-size:11px;">📜</div>
        <div class="tree-node-text">
          <div class="tree-node-value" style="font-size:11px;">${escapeHtml(item.name)}</div>
        </div>
      </div>
    `).join('');

    this.currentItemsList = items;
    if (items.length > 0) this.selectPickerItem(0);
  }

  selectPickerItem(idx) {
    const item = this.currentItemsList[idx];
    if (!item) return;
    this.selectedPickerItem = item;

    const detail = document.getElementById("modalRightDetail");
    let contentHtml = `<div style="font-size:16px; font-weight:bold; color:var(--pb-orange);">${escapeHtml(item.name)}</div>`;
    
    if (item.data.description) {
      contentHtml += `<div style="font-size:12px; margin-top:8px; line-height:1.6;">${escapeHtml(item.data.description)}</div>`;
    }
    if (item.data.hp) {
      contentHtml += `<div style="font-size:12px; margin-top:6px; color:var(--pb-text-muted);">PV Base da Ancestralidade: <strong>${escapeHtml(item.data.hp)}</strong> | Velocidade: <strong>${escapeHtml(item.data.speed)} pés</strong></div>`;
    }
    if (item.data.hpPerLevel) {
      contentHtml += `<div style="font-size:12px; margin-top:6px; color:var(--pb-text-muted);">PV por Nível: <strong>${escapeHtml(item.data.hpPerLevel)}</strong> | Atributo-Chave: <strong>${escapeHtml((item.data.keyAbility || []).join(', '))}</strong></div>`;
    }
    if (item.data.damage) {
      contentHtml += `<div style="font-size:12px; margin-top:6px;">Dano: <strong>${escapeHtml(item.data.damage)} ${escapeHtml(item.data.damageType || '')}</strong> | Traços: <strong>${escapeHtml((item.data.traits || []).join(', '))}</strong></div>`;
    }

    const source = item.data.source;
    const sourceText = source?.book ? `${source.book}${source.page ? `, p. ${source.page}` : ""}` : "Fonte ainda não catalogada — requer revisão";
    contentHtml += `<div style="margin-top:auto; font-size:10px; color:var(--pb-text-dim);">${escapeHtml(sourceText)}</div>`;
    detail.innerHTML = contentHtml;
  }

  confirmModalSelection() {
    if (!this.selectedPickerItem) return;
    const item = this.selectedPickerItem;
    const changesMaximumHp = this.currentPickerType === "ancestry" || this.currentPickerType === "class";
    const previousMaxHp = this.calc?.maxHp ?? PF2E_ENGINE.calculateCharacterStats(this.character).maxHp;
    const previousCurrentHp = this.character.currentHp ?? previousMaxHp;

    if (this.currentPickerType === "ancestry") {
      this.applyAncestrySelection(item);
    } else if (this.currentPickerType === "class") {
      this.applyClassSelection(item);
    } else if (this.currentPickerType === "background") {
      this.character.background = item.name;
    } else if (this.currentPickerType === "weapon") {
      if (!this.character.weapons) this.character.weapons = [];
      this.character.weapons.push({ ...item.data });
    } else if (this.currentPickerType === "armor") {
      this.character.equippedArmor = { ...item.data };
    } else if (this.currentPickerType === "heritage") {
      this.character.heritage = item.name;
    } else if (this.currentPickerType === "feat") {
      if (!this.character.feats) this.character.feats = [];
      this.character.feats.push({ ...item.data });
    } else if (this.currentPickerType === "condition") {
      if (!this.character.conditions) this.character.conditions = [];
      if (!this.character.conditions.some(c => c.name === item.name)) this.character.conditions.push({ name: item.name, value: 1 });
    } else if (this.currentPickerType === "buff") {
      if (!this.character.buffs) this.character.buffs = [];
      this.character.buffs.push({ ...item.data });
    }

    if (changesMaximumHp) this.reconcileCurrentHp(previousMaxHp, previousCurrentHp);

    this.closePicker();
    this.renderAll();
  }

  getFallbackFeatCatalog() {
    return [
      { name: "Robustez", type: "Talento Geral", description: "Você ganha pontos de vida adicionais iguais ao seu nível." },
      { name: "Medicina de Batalha", type: "Talento de Perícia", description: "Você pode tratar ferimentos durante o combate." },
      { name: "Aparar em Duelo", type: "Talento de Classe", description: "Erga sua arma para obter bônus circunstancial na CA." },
      { name: "Palavra Mordaz", type: "Talento de Perícia", description: "Desestabilize um alvo com uma provocação inteligente." },
      { name: "Finalizador Sangrento", type: "Talento de Classe", description: "Um finalizador que causa dano persistente quando acerta." },
    ];
  }

  getConditionCatalog() {
    return [
      { name: "Abalado", description: "Penalidade em testes e CDs baseados em Sabedoria." },
      { name: "Amedrontado", description: "Penalidade em todos os testes e CDs." },
      { name: "Desprevenido", description: "Penalidade na Classe de Armadura contra ataques." },
      { name: "Enfraquecido", description: "Penalidade em Força e testes relacionados." },
      { name: "Morrendo", description: "Você está à beira da morte." },
      { name: "Ofuscado", description: "Visão prejudicada a longa distância." },
    ];
  }

  getBuffCatalog() {
    return [
      { name: "Abençoado", description: "Bônus +1 de estado em jogadas de ataque." },
      { name: "Aceleração", description: "Você recebe uma ação adicional em cada turno." },
      { name: "Ocultado", description: "Ataques contra você têm chance de falha." },
    ];
  }

  // DRAWER MENU TOGGLE
  toggleDrawer() {
    document.getElementById("drawerOverlay").classList.toggle("active");
  }

  closeDrawerOnOverlay(e) {
    if (e.target.id === "drawerOverlay") {
      document.getElementById("drawerOverlay").classList.remove("active");
    }
  }

  togglePlanTree() {
    const tree = document.getElementById("planTreeCol");
    const btn = document.getElementById("btnTogglePlan");
    tree.classList.toggle("collapsed");
    btn.innerText = tree.classList.contains("collapsed") ? "Mostrar Plano" : "Ocultar Plano";
  }

  // TABS NAVIGATION
  switchTab(tabId, clickEvent) {
    document.querySelectorAll(".pb-tab-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-panel").forEach(p => {
      p.classList.remove("active");
      p.hidden = true;
    });

    const targetButton = clickEvent?.currentTarget || document.querySelector(`[aria-controls="${tabId}"]`);
    if (targetButton) {
      targetButton.classList.add("active");
      targetButton.setAttribute("aria-selected", "true");
    }
    const target = document.getElementById(tabId);
    if (target) {
      target.classList.add("active");
      target.hidden = false;
    }
  }

  // ROLAGEM DE DADOS
  rollDice(sides) {
    const roll = Math.floor(Math.random() * sides) + 1;
    this.addDiceLog(`d${sides}`, `Rolou: <strong style="color:var(--pb-orange); font-size:14px;">${roll}</strong>`);
  }

  rollCheck(label, modifier) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const natCrit = d20 === 20 ? " 🌟 CRÍTICO NAT 20!" : (d20 === 1 ? " 💀 FALHA CRÍTICA NAT 1!" : "");
    this.addDiceLog(label, `d20 (${d20}) ${PF2E_ENGINE.formatMod(modifier)} = <strong style="font-size:13px;">${total}</strong>${natCrit}`);
  }

  rollStrike(label, modifier) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const natCrit = d20 === 20 ? " 🌟 CRÍTICO (Dano Dobrado!)" : (d20 === 1 ? " 💀 FALHA CRÍTICA" : "");
    this.addDiceLog(`Ataque: ${label}`, `d20 (${d20}) ${PF2E_ENGINE.formatMod(modifier)} = <strong style="font-size:13px;">${total}</strong>${natCrit}`);
  }

  rollDamage(weaponName, damageFormula) {
    const rolled = PF2E_ENGINE.evaluateDiceExpression(damageFormula);
    const critRolled = PF2E_ENGINE.evaluateDiceExpression(damageFormula, { isCritical: true });
    this.addDiceLog(
      `Dano: ${weaponName}`,
      `Rolou [${damageFormula}]: <strong style="color:var(--pb-orange); font-size:13px;">${rolled.total}</strong> (Rolagens: ${rolled.rolls.join("+")}${rolled.staticMod ? ` + ${rolled.staticMod}` : ""}) · <small style="color:var(--pb-text-muted);">Crítico: <strong style="color:#ef4444;">${critRolled.total}</strong></small>`
    );
  }

  addDiceLog(title, resultHtml) {
    const time = new Date().toLocaleTimeString();
    this.diceHistory.unshift({ title, resultHtml, time });
    const content = document.getElementById("diceLogContent");
    if (!content) return;
    content.innerHTML = this.diceHistory.slice(0, 15).map(entry => `
      <div class="dice-result-entry">
        <div>
          <div style="font-weight:bold; color:var(--pb-orange); font-size:10px;">${escapeHtml(entry.title)}</div>
          <div>${entry.resultHtml}</div>
        </div>
        <div style="color:var(--pb-text-muted); font-size:9px;">${escapeHtml(entry.time)}</div>
      </div>
    `).join('');
  }

  clearDiceLog() {
    this.diceHistory = [];
    const content = document.getElementById("diceLogContent");
    if (content) content.innerHTML = `<div style="color:var(--pb-text-muted); font-size:10px; text-align:center;">Histórico limpo.</div>`;
  }

  // HP & ESCUDO
  adjustHpPrompt() {
    const val = prompt("Modificar PV (Ex: -5 para dano, +5 para cura):", "-1");
    if (val !== null) {
      const num = parseInt(val, 10) || 0;
      let cur = this.character.currentHp !== undefined ? this.character.currentHp : this.calc.maxHp;
      cur = Math.max(0, Math.min(this.calc.maxHp, cur + num));
      this.character.currentHp = cur;
      this.renderAll();
    }
  }

  toggleShield() {
    this.character.shieldRaised = !this.character.shieldRaised;
    this.renderAll();
  }

  // REAÇÃO: BLOQUEIO COM ESCUDO (SHIELD BLOCK)
  shieldBlockAction(incomingDamage) {
    const damage = incomingDamage !== undefined ? Number(incomingDamage) : parseInt(prompt("Quanto de dano você está recebendo?", "10"), 10);
    if (isNaN(damage) || damage <= 0) return;

    if (!this.character.equippedShield) {
      this.character.equippedShield = { name: "Escudo de Aço", hardness: 5, maxHp: 20, currentHp: 20, bt: 10 };
    }

    const shield = this.character.equippedShield;
    const res = PF2E_ENGINE.calculateShieldBlock(damage, shield);
    shield.currentHp = res.newShieldHp;

    const msg = `🛡️ <strong>Bloqueio com Escudo:</strong> Dano Recebido: ${damage} | Bloqueado: ${res.damageBlocked} (Dureza: ${shield.hardness}) | Dano no Escudo: ${res.excessDamage} (PV Escudo: ${shield.currentHp}/${shield.maxHp}${res.isBroken ? " - QUEBRADO!" : ""}) | Dano no Personagem: ${res.characterDamage}`;
    this.logDiceRoll(msg);
    
    if (res.characterDamage > 0) {
      const currentHp = this.character.currentHp !== undefined ? this.character.currentHp : this.calc.maxHp;
      this.character.currentHp = Math.max(0, currentHp - res.characterDamage);
    }
    this.renderAll();
  }

  // AÇÃO: TESTE DE RECUPERAÇÃO (RECOVERY CHECK - MORRENDO)
  recoveryCheckAction() {
    const conditions = this.character.conditions || [];
    const dyingIdx = conditions.findIndex(c => /morrendo|dying/i.test(c.name || ""));
    const dyingVal = dyingIdx >= 0 ? Math.max(1, Number(conditions[dyingIdx].value) || 1) : 1;
    const doomedVal = Number(conditions.find(c => /condenado|doomed/i.test(c.name || ""))?.value || 0);

    const roll = Math.floor(Math.random() * 20) + 1;
    const isNat20 = roll === 20;
    const isNat1 = roll === 1;
    const res = PF2E_ENGINE.calculateDyingRecovery(dyingVal, roll, { doomed: doomedVal, isNat20, isNat1 });

    let outcomeText = "";
    if (res.outcome === "critical_success") outcomeText = "🌟 Sucesso Crítico (Reduz Morrendo em 2)";
    else if (res.outcome === "success") outcomeText = "✅ Sucesso (Reduz Morrendo em 1)";
    else if (res.outcome === "critical_failure") outcomeText = "💀 Falha Crítica (Aumenta Morrendo em 2)";
    else outcomeText = "❌ Falha (Aumenta Morrendo em 1)";

    let statusText = `Morrendo ${res.newDying}`;
    if (res.isDead) statusText = "☠️ MORTO (Atingiu Limiar Máximo)";
    else if (res.isStabilized) statusText = "💖 Estabilizado! Ganha condição Ferido +1";

    if (dyingIdx >= 0) {
      if (res.newDying <= 0) {
        conditions.splice(dyingIdx, 1);
        const woundedIdx = conditions.findIndex(c => /ferido|wounded/i.test(c.name || ""));
        if (woundedIdx >= 0) {
          conditions[woundedIdx].value = (Number(conditions[woundedIdx].value) || 1) + 1;
        } else {
          conditions.push({ name: "Ferido", value: 1 });
        }
      } else {
        conditions[dyingIdx].value = res.newDying;
      }
    } else if (res.newDying > 0) {
      conditions.push({ name: "Morrendo", value: res.newDying });
    }

    const logMsg = `🎲 <strong>Teste de Recuperação (DC ${res.dc}):</strong> Rolagem d20: [${roll}] → ${outcomeText} | <strong>Resultado:</strong> ${statusText}`;
    this.logDiceRoll(logMsg);
    this.renderAll();
  }

  cycleSkillRank(skillId) {
    const ranks = ["Destreinado", "Treinado", "Especialista", "Mestre", "Lendário"];
    const cur = this.character.skills[skillId] || "Destreinado";
    const nextIdx = (ranks.indexOf(cur) + 1) % ranks.length;
    this.character.skills[skillId] = ranks[nextIdx];
    this.renderAll();
  }

  restCharacter() {
    this.character.currentHp = this.calc.maxHp;
    this.character.shieldRaised = false;
    this.character.spellSlotsUsed = {};
    const slotsInfo = PF2E_ENGINE.getSpellSlots(this.character);
    this.character.focusPointsCurrent = slotsInfo.focusPoints;
    this.renderAll();
    alert("Descanso de 8 horas concluído! Todos os Pontos de Vida, Espaços de Magia e Foco foram restaurados.");
  }

  // GESTÃO DE EQUIPAMENTOS & MOEDAS
  addInventoryItem() {
    const name = prompt("Nome do Item:");
    if (!name) return;
    const qtyStr = prompt("Quantidade:", "1");
    const qty = Math.max(1, parseInt(qtyStr, 10) || 1);
    const bulkStr = prompt("Carga (Bulk) por item (ex: 1, 0, L ou 0.1):", "1");
    let bulk = 0;
    if (bulkStr?.toUpperCase() === "L") bulk = 0.1;
    else bulk = Math.max(0, parseFloat(bulkStr) || 0);

    if (!this.character.inventory) this.character.inventory = [];
    this.character.inventory.push({ name, qty, bulk });
    this.renderAll();
  }

  removeInventoryItem(idx) {
    if (this.character.inventory && this.character.inventory[idx]) {
      this.character.inventory.splice(idx, 1);
      this.renderAll();
    }
  }

  updateCoins(type, value) {
    if (!this.character.coins) this.character.coins = { pp: 0, gp: 15, sp: 0, cp: 0 };
    this.character.coins[type] = Math.max(0, parseInt(value, 10) || 0);
    this.renderAll();
  }

  // GESTÃO DE ESPAÇOS DE MAGIA E PONTOS DE FOCO
  expendSpellSlot(rank) {
    if (!this.character.spellSlotsUsed) this.character.spellSlotsUsed = {};
    this.character.spellSlotsUsed[rank] = (this.character.spellSlotsUsed[rank] || 0) + 1;
    this.renderAll();
  }

  restoreSpellSlot(rank) {
    if (!this.character.spellSlotsUsed) this.character.spellSlotsUsed = {};
    if (this.character.spellSlotsUsed[rank] > 0) {
      this.character.spellSlotsUsed[rank] -= 1;
      this.renderAll();
    }
  }

  restoreAllSpellSlots() {
    this.character.spellSlotsUsed = {};
    const slotsInfo = PF2E_ENGINE.getSpellSlots(this.character);
    this.character.focusPointsCurrent = slotsInfo.focusPoints;
    this.renderAll();
  }

  useFocusPoint() {
    const slotsInfo = PF2E_ENGINE.getSpellSlots(this.character);
    const cur = this.character.focusPointsCurrent !== undefined ? this.character.focusPointsCurrent : slotsInfo.focusPoints;
    if (cur > 0) {
      this.character.focusPointsCurrent = cur - 1;
      this.renderAll();
    }
  }

  refocusPoint() {
    const slotsInfo = PF2E_ENGINE.getSpellSlots(this.character);
    const cur = this.character.focusPointsCurrent !== undefined ? this.character.focusPointsCurrent : slotsInfo.focusPoints;
    if (cur < slotsInfo.focusPoints) {
      this.character.focusPointsCurrent = cur + 1;
      this.renderAll();
    }
  }

  // ÁRVORE DE PROGRESSÃO DINÂMICA (NÍVEIS 1 A 20)
  renderPlanTree() {
    const tree = document.getElementById("planTreeCol");
    if (!tree) return;

    const char = this.character || {};
    const prog = char.progression || {};
    const charLevel = Number(char.level) || 1;

    const getLevelSlots = (lvl) => {
      if (lvl === 1) {
        return [
          { id: "1_ancestry", type: "ancestry", title: "Ancestralidade", icon: "🧬", value: char.ancestry || "Humano" },
          { id: "1_background", type: "background", title: "Antecedente", icon: "📜", value: char.background || "Batedor" },
          { id: "1_class", type: "class", title: "Classe", icon: "⚔️", value: char.class || "Guerreiro" },
          { id: "1_boosts", type: "boost", title: "Definir Atributos", icon: "⚙️ 4", value: "4 Boosts Nível 1", isTabAction: true },
          { id: "1_heritage", type: "heritage", title: "Herança", icon: "🌳", value: char.heritage || "Humano Versátil" },
          { id: "1_class_feat", type: "feat", title: "Talento de Classe", icon: "⭐", filterType: "Classe", value: prog["1_class_feat"] || (char.feats?.find(f => f.slotId === "1_class_feat" || f.type?.includes("Classe"))?.name || "Não Selecionado") },
          { id: "1_subclass", type: "subclass", title: "Estilo de Classe", icon: "🎭", value: char.subclass || "Padrão" }
        ];
      }
      const slots = [];
      if ([5, 10, 15, 20].includes(lvl)) {
        slots.push({ id: `${lvl}_boosts`, type: "boost", title: "Aprimoramento Atributos", icon: "⚙️ 4", value: `4 Boosts Nível ${lvl}`, isTabAction: true });
      }
      if ([5, 9, 13, 17].includes(lvl)) {
        slots.push({ id: `${lvl}_ancestry_feat`, type: "feat", title: "Talento Ancestral", icon: "🧬", filterType: "Ancestral", value: prog[`${lvl}_ancestry_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_ancestry_feat`)?.name || "Não Selecionado") });
      }
      if (lvl % 2 === 0) {
        slots.push({ id: `${lvl}_class_feat`, type: "feat", title: "Talento de Classe", icon: "⭐", filterType: "Classe", value: prog[`${lvl}_class_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_class_feat`)?.name || "Não Selecionado") });
      }
      if (lvl % 2 === 0) {
        slots.push({ id: `${lvl}_skill_feat`, type: "feat", title: "Talento de Perícia", icon: "🧠", filterType: "Perícia", value: prog[`${lvl}_skill_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_skill_feat`)?.name || "Não Selecionado") });
      }
      if ([3, 7, 11, 15, 19].includes(lvl)) {
        slots.push({ id: `${lvl}_general_feat`, type: "feat", title: "Talento Geral", icon: "🌐", filterType: "Geral", value: prog[`${lvl}_general_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_general_feat`)?.name || "Não Selecionado") });
      }
      if (lvl >= 3 && lvl % 2 !== 0) {
        slots.push({ id: `${lvl}_skill_increase`, type: "skill_increase", title: "Aumento de Perícia", icon: "⚙️", value: prog[`${lvl}_skill_increase`] || "Não Selecionado" });
      }
      return slots;
    };

    let html = "";
    for (let lvl = 1; lvl <= 20; lvl++) {
      const isCurrentLevel = lvl === charLevel;
      const isPastLevel = lvl < charLevel;
      const levelHeaderClass = isCurrentLevel ? "level-header current-level" : "level-header";
      const levelBadge = isCurrentLevel ? ` <span style="font-size:10px; color:var(--pb-orange); font-weight:normal;">(Nível Atual)</span>` : (isPastLevel ? ` <span style="font-size:10px; color:var(--pb-text-muted); font-weight:normal;">✓</span>` : "");
      
      html += `<div class="${levelHeaderClass}">Nível ${lvl}${levelBadge}</div>`;

      const slots = getLevelSlots(lvl);
      slots.forEach(slot => {
        const isSelected = slot.value && slot.value !== "Não Selecionado";
        const valColor = isSelected ? "color:#fff;" : "color:var(--pb-text-muted);";
        let clickAttr = "";

        if (slot.isTabAction) {
          clickAttr = `onclick="app.switchTab('tab-rules')"`;
        } else if (slot.type === "skill_increase") {
          clickAttr = `onclick="app.promptSkillIncrease(${lvl})"`;
        } else if (slot.type === "subclass") {
          clickAttr = `onclick="app.promptSubclass()"`;
        } else if (slot.type === "feat") {
          clickAttr = `onclick="app.openPicker('feat', { slotId: ${escapeInlineArgument(slot.id)}, level: ${lvl}, filterType: ${escapeInlineArgument(slot.filterType || '')} })"`;
        } else {
          clickAttr = `onclick="app.openPicker(${escapeInlineArgument(slot.type)})"`;
        }

        html += `
          <div class="tree-node" ${clickAttr} title="Clique para configurar ${escapeHtml(slot.title)}">
            <div class="tree-node-icon">${escapeHtml(slot.icon)}</div>
            <div class="tree-node-text">
              <div class="tree-node-title">${escapeHtml(slot.title)}</div>
              <div class="tree-node-value" style="${valColor}">${escapeHtml(slot.value)}</div>
            </div>
          </div>
        `;
      });
    }

    tree.innerHTML = html;
  }

  promptSkillIncrease(level) {
    const skillsList = Object.keys(this.calc?.skills || {}).map(k => `${k} (${this.calc.skills[k].name})`).join(", ");
    const skillName = prompt(`Escolha a perícia para aumento no Nível ${level}:\n(${skillsList})`);
    if (skillName) {
      if (!this.character.progression) this.character.progression = {};
      this.character.progression[`${level}_skill_increase`] = skillName;
      const found = PF2E_DATA.skills.find(s => s.name.toLowerCase().includes(skillName.toLowerCase()) || s.id.toLowerCase() === skillName.toLowerCase());
      if (found) {
        this.cycleSkillRank(found.id);
      } else {
        this.renderAll();
      }
    }
  }

  promptSubclass() {
    const sub = prompt("Defina o Estilo ou Subclasse do Personagem:", this.character.subclass || "");
    if (sub !== null) {
      this.character.subclass = sub;
      this.renderAll();
    }
  }

  // CRUD DE CAMPOS
  updateField(f, v) { this.character[f] = v; this.renderAll(); }
  updateLevel(v) { this.character.level = parseInt(v, 10); this.renderAll(); }
  removeWeapon(idx) { this.character.weapons.splice(idx, 1); this.renderAll(); }
  removeInventoryItem(idx) { this.character.inventory.splice(idx, 1); this.renderAll(); }
  removeFeat(idx) { this.character.feats.splice(idx, 1); this.renderAll(); }
  removeSpell(idx) { this.character.spells.splice(idx, 1); this.renderAll(); }
  removeRitual(idx) { this.character.rituals.splice(idx, 1); this.renderAll(); }
  removeLoreSkill(idx) { this.character.loreSkills.splice(idx, 1); this.renderAll(); }

  addInventoryItem() {
    const name = prompt("Nome do Item:");
    if (name) {
      const qty = parseInt(prompt("Quantidade:", "1"), 10) || 1;
      const bulk = prompt("Carga (Ex: 1, 2, L, -):", "1");
      if (!this.character.inventory) this.character.inventory = [];
      this.character.inventory.push({ name, qty, bulk });
      this.renderAll();
    }
  }

  openAddSpellModal() {
    const name = prompt("Nome da Magia:");
    if (name) {
      const lvl = prompt("Nível da Magia (0 para Truque, 1 a 10):", "1");
      const desc = prompt("Descrição:");
      if (!this.character.spells) this.character.spells = [];
      this.character.spells.push({ name, level: lvl, description: desc, manual: true, ruleset: "needs_review", needs_review: true });
      this.renderAll();
    }
  }

  // PERSISTÊNCIA & EXPORTAÇÃO
  getCurrentCharacter() {
    return structuredClone(this.character);
  }

  loadCharacter(character) {
    this.character = assertSafeCharacterDocument(character);
    this.reconcileSpellcastingProfile();
    localStorage.setItem("pf2e_current_character", JSON.stringify(this.character));
    this.renderAll();
  }

  saveCharacterLocal() {
    localStorage.setItem("pf2e_current_character", JSON.stringify(this.character));
    alert(`Personagem '${this.character.name}' salvo neste dispositivo.`);
  }

  createNewCharacter() {
    if (confirm("Criar um novo personagem em branco?")) {
      this.character = {
        id: "Novo_Personagem_" + Date.now(),
        name: "Novo Herói",
        level: 1,
        ancestry: "Humano",
        heritage: "Humano Versátil",
        class: "Guerreiro (Fighter)",
        background: "Guarda da Cidade",
        subclass: "Escudo e Lâmina",
        abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
        savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
        perceptionRank: "Especialista",
        equippedArmor: { name: "Peitoral de Aço", category: "Média", acBonus: 4, dexCap: 1, bulk: 2 },
        weapons: [{ name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] }],
        skills: { athletics: "Treinado", intimidation: "Treinado" },
        loreSkills: [{ name: "Saber Militar", rank: "Treinado" }],
        feats: [],
        spells: [],
        rituals: [],
        inventory: [{ name: "Mochila de Aventureiro", qty: 1, bulk: 1 }],
        coins: { pl: 0, gp: 15, sp: 0, cp: 0 }
      };
      this.renderAll();
    }
  }

  openExportModal() {
    document.getElementById("jsonTitle").innerText = "📤 Exportar JSON";
    document.getElementById("jsonArea").value = JSON.stringify(this.character, null, 2);
    document.getElementById("btnImportAction").style.display = "none";
    document.getElementById("modalJsonOverlay").classList.add("active");
  }

  openImportModal() {
    document.getElementById("jsonTitle").innerText = "📥 Importar JSON";
    document.getElementById("jsonArea").value = "";
    document.getElementById("btnImportAction").style.display = "inline-block";
    document.getElementById("modalJsonOverlay").classList.add("active");
  }

  copyJson() {
    document.getElementById("jsonArea").select();
    document.execCommand("copy");
    alert("JSON copiado!");
  }

  applyJson() {
    try {
      this.character = assertSafeCharacterDocument(JSON.parse(document.getElementById("jsonArea").value));
      document.getElementById("modalJsonOverlay").classList.remove("active");
      this.renderAll();
      alert("Personagem importado com sucesso!");
    } catch (e) {
      alert("Erro ao importar JSON: " + e.message);
    }
  }

  exportMarkdown() {
    let md = `# 🛡️ FICHA DE PATHFINDER 2E — ${this.character.name.toUpperCase()}\n\n`;
    md += `- **Nível:** ${this.character.level} | **Ancestralidade:** ${this.character.ancestry} | **Classe:** ${this.character.class}\n`;
    md += `- **PV:** ${this.calc.currentHp} / ${this.calc.maxHp} | **CA:** ${this.calc.ac.total} | **Velocidade:** ${this.formatMovementSpeeds()}\n\n`;
    if ((this.character.spells || []).length) md += `## Magias\n${this.character.spells.map((spell) => `- ${spell.name} (ranque ${spell.rank ?? spell.level ?? "?"})`).join("\n")}\n\n`;
    if ((this.character.rituals || []).length) md += `## Rituais\n${this.character.rituals.map((ritual) => `- ${ritual.name} (ranque ${ritual.rank ?? "?"})`).join("\n")}\n\n`;
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Ficha_${this.character.name.replace(/\s+/g, '_')}_PF2e.md`;
    a.click();
  }

  // EXPORTAÇÃO E DOWNLOAD DA FICHA OFICIAL PDF EDITÁVEL (ACROFORM)
  async downloadOfficialFillablePdf() {
    try {
      if (typeof PF2E_PDF_FILLER === "undefined") {
        alert("Módulo de PDF Editável não carregado.");
        return;
      }
      
      let response = await fetch("ficha.pdf");
      if (!response.ok) {
        response = await fetch("/ficha.pdf");
      }
      if (!response.ok) {
        throw new Error("Não foi possível carregar o modelo ficha.pdf da raiz da aplicação.");
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const filledPdfBytes = await PF2E_PDF_FILLER.fillOfficialPdf(
        this.character,
        this.calc || PF2E_ENGINE.calculateCharacterStats(this.character),
        arrayBuffer,
        (typeof PDFLib !== "undefined" ? PDFLib : (typeof window !== "undefined" ? window.PDFLib : null))
      );
      
      const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      const safeName = (this.character.name || "Personagem").replace(/[\s\/\\:*?"<>|]+/g, "_");
      a.download = `Ficha_Oficial_Editavel_${safeName}_PF2e.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error("Erro ao gerar PDF editável:", err);
      alert("Erro ao preencher PDF oficial: " + (err.message || err));
    }
  }

  // GERAÇÃO E IMPRESSÃO DA FICHA PERSONALIZADA
  printOfficialPdf() {
    return this.printReferenceSheet();
  }

  printReferenceSheet() {
    const area = document.getElementById("printSheetArea");
    const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    const character = this.character;
    const calc = this.calc;

    const temlDots = (currentRank) => {
      const ranks = ["T", "E", "M", "L"];
      const rankMap = { "Destreinado": "", "Untrained": "", "Treinado": "T", "Trained": "T", "Especialista": "E", "Expert": "E", "Mestre": "M", "Master": "M", "Lendário": "L", "Legendary": "L" };
      const active = rankMap[currentRank] || (ranks.includes(currentRank) ? currentRank : "");
      return `<span class="sheet-teml-pills">` + ranks.map(r => `<span class="sheet-teml-dot ${r === active ? 'active' : ''}">${r}</span>`).join("") + `</span>`;
    };

    const cell = (label, value) => `
      <div class="sheet-cell">
        <span class="sheet-cell-label">${label}</span>
        <span class="sheet-cell-value">${esc(value || '—')}</span>
      </div>
    `;

    const sensesList = PF2E_ENGINE.getCharacterSenses ? PF2E_ENGINE.getCharacterSenses(character).join(", ") : "Visão Normal";
    const sheetLocale = ["en", "es"].includes(localStorage.getItem("pathbuilder.locale")) ? localStorage.getItem("pathbuilder.locale") : "pt-BR";

    // PÁGINA 1: Combate, Atributos, Defesas, Golpes e Perícias
    const p1SkillsHtml = Object.values(calc.skills).map(sk => {
      const ability = sk.ability || sk.abilityKey || "str";
      return `
        <tr>
          <td><strong>${esc(sk.name)}</strong> <span style="font-size:5.5pt; color:#64748b;">(${esc(ability.toUpperCase())})</span></td>
          <td style="text-align:center;">${temlDots(sk.rank)}</td>
          <td style="text-align:center; font-weight:bold; font-size:7.5pt;">${esc(PF2E_ENGINE.formatMod(sk.total))}</td>
          <td style="text-align:center; color:#64748b; font-size:6pt;">${esc(PF2E_ENGINE.formatMod(calc.mods[ability] || 0))}</td>
          <td style="text-align:center; color:#64748b; font-size:6pt;">${esc(sk.itemBonus ? PF2E_ENGINE.formatMod(sk.itemBonus) : '0')}</td>
        </tr>
      `;
    }).join("");

    const p1StrikesHtml = calc.strikes.map(st => `
      <div class="sheet-strike-box">
        <div class="sheet-strike-top">
          <span>⚔️ ${esc(st.name)} <small style="font-size:6pt; color:#64748b;">(${esc(st.category || 'Corpo a Corpo')})</small></span>
          <span>${esc(PF2E_ENGINE.formatMod(st.map[0]))} / ${esc(PF2E_ENGINE.formatMod(st.map[1]))} / ${esc(PF2E_ENGINE.formatMod(st.map[2]))}</span>
        </div>
        <div class="sheet-strike-meta">
          <strong>Dano:</strong> ${esc(st.damageFormatted)} | <strong>Traços:</strong> ${esc((st.traits || []).join(", ") || "Nenhum")}
        </div>
      </div>
    `).join("");

    // PÁGINA 2: Talentos, Recursos & Inventário
    const featProgressionRows = Array.from({ length: 20 }, (_, idx) => {
      const lvl = idx + 1;
      const f = (character.feats || []).find(feat => Number(feat.level) === lvl);
      return `
        <div class="sheet-list-item" style="display:grid; grid-template-columns: 18px 1fr 65px; gap:4px; align-items:center;">
          <span style="font-weight:900; color:#b45309; text-align:center;">${lvl}</span>
          <span style="font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${esc(f?.name || (lvl % 2 === 0 ? 'Talento de Classe' : 'Talento Geral / Perícia'))}</span>
          <span style="font-size:5.5pt; color:#64748b; text-align:right;">${esc(f?.type || 'Característica')}</span>
        </div>
      `;
    }).join("");

    const inventoryRows = (character.inventory || []).map(item => `
      <div class="sheet-list-item" style="display:grid; grid-template-columns: 1fr 30px 30px; gap:4px;">
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${esc(item.name)}</span>
        <span style="text-align:center; color:#64748b;">${esc(item.qty || 1)}</span>
        <span style="text-align:center; font-weight:bold;">${esc(item.bulk || '—')}</span>
      </div>
    `).join("") || `<div class="sheet-list-item" style="color:#94a3b8; font-style:italic;">Mochila de Aventureiro Padrão</div>`;

    // PÁGINA 3: Identidade, Histórico & Ações de Combate
    const actionsHtml = (character.actions || [
      { name: "Golpe (Strike) [◆]", desc: "Ataque corpo a corpo ou à distância com sua arma." },
      { name: "Passo (Step) [◆]", desc: "Mova-se 5 pés sem desencadear reações." },
      { name: "Andar (Stride) [◆]", desc: "Mova-se até o seu deslocamento." },
      { name: "Erguer Escudo (Raise Shield) [◆]", desc: "+2 circunstancial na CA até o início do seu próximo turno." },
      { name: "Bloqueio com Escudo (Shield Block) [↺]", desc: "Reação para absorver dano usando a dureza do escudo." },
      { name: "Desarmar / Derrubar / Agarrar [◆]", desc: "Manobras de Atletismo usando armas compatíveis ou desarmado." }
    ]).map(act => `
      <div class="sheet-list-item">
        <strong>${esc(act.name)}</strong>: <span style="color:#475569;">${esc(act.desc || act.description || '')}</span>
      </div>
    `).join("");

    // PÁGINA 4: Conjurador, Magias & Rituais
    const spellSlotsHtml = Array.from({ length: 10 }, (_, idx) => {
      const rank = idx + 1;
      return `
        <div class="sheet-slot-box">
          <div style="font-size:6pt; font-weight:bold; color:#0f172a;">${rank}º Círculo</div>
          <div style="font-size:7pt; color:#475569; letter-spacing:2px; margin-top:2px;">□ □ □ □</div>
        </div>
      `;
    }).join("");

    const spellsListHtml = (character.spells || []).map(sp => `
      <div class="sheet-list-item" style="display:grid; grid-template-columns: 1fr 45px 50px; gap:4px;">
        <span><strong>✨ ${esc(sp.names?.[sheetLocale] || sp.name)}</strong></span>
        <span style="text-align:center;">${esc(sp.rank ?? sp.level ?? 1)}º Círculo</span>
        <span style="text-align:right; color:#64748b;">${esc(sp.castingTimes?.[sheetLocale] || sp.actions || '◆◆')}</span>
      </div>
    `).join("") || `<div class="sheet-list-item" style="color:#94a3b8; font-style:italic;">Nenhuma magia registrada. Conjurador não-mágico ou sem magias preparadas.</div>`;

    const ritualsListHtml = (character.rituals || []).map(rit => `
      <div class="sheet-list-item">
        <strong>◈ ${esc(rit.names?.[sheetLocale] || rit.name)}</strong> · ${esc(rit.rank ?? 1)}º Círculo (${esc(rit.castingTimes?.[sheetLocale] || '1 dia')})
      </div>
    `).join("") || `<div class="sheet-list-item" style="color:#94a3b8; font-style:italic;">Nenhum ritual catalogado.</div>`;

    area.innerHTML = `
      <!-- PÁGINA 1: COMBATE, ATRIBUTOS, DEFESAS E PERÍCIAS -->
      <div class="sheet-page">
        <header class="sheet-official-header">
          <div class="sheet-logo-block">
            <span class="sheet-logo-title">PATHFINDER</span>
            <span class="sheet-logo-subtitle">Ficha Oficial de Personagem · Remaster</span>
          </div>
          <div style="text-align:right;">
            <span style="font-size:11pt; font-weight:900; color:#0f172a;">NÍVEL ${character.level}</span>
            <div style="font-size:6pt; color:#64748b;">Pontos de Heroísmo: ◇ ◇ ◇</div>
          </div>
        </header>

        <div class="sheet-header-grid">
          ${cell("Nome do Personagem", character.name)}
          ${cell("Ancestralidade & Herança", `${character.ancestry} (${character.heritage || 'Padrão'})`)}
          ${cell("Antecedente (Background)", character.background)}
          ${cell("Classe & Subclasse", `${character.class} (${character.subclass || 'Padrão'})`)}
          ${cell("Tamanho & Espaço", calc.size || 'Médio (5 pés)')}
          ${cell("Velocidade / Deslocamento", this.formatMovementSpeeds(calc))}
          ${cell("Divindade & Filosofia", character.deity || 'Livre')}
          ${cell("Éditos & Princípios", character.edicts || 'Proteger aliados')}
        </div>

        <div class="sheet-abilities-bar">
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">FORÇA</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.str))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.str}</div>
          </div>
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">DESTREZA</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.dex))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.dex}</div>
          </div>
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">CONSTITUIÇÃO</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.con))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.con}</div>
          </div>
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">INTELIGÊNCIA</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.int))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.int}</div>
          </div>
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">SABEDORIA</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.wis))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.wis}</div>
          </div>
          <div class="sheet-ability-card">
            <div class="sheet-ability-name">CARISMA</div>
            <div class="sheet-ability-mod">${esc(PF2E_ENGINE.formatMod(calc.mods.cha))}</div>
            <div class="sheet-ability-score">Score: ${calc.scores.cha}</div>
          </div>
        </div>

        <div class="sheet-main-layout">
          <!-- COLUNA ESQUERDA: Defesas, PV, Escudo, Golpes -->
          <div>
            <div class="sheet-box-title">🛡️ Classe de Armadura & Defesas</div>
            <div class="sheet-defense-row">
              <div class="sheet-big-badge">
                <div class="sheet-badge-val">${calc.ac.total}</div>
                <div class="sheet-badge-sub">CLASSE DE ARMADURA</div>
              </div>
              <div class="sheet-big-badge">
                <div class="sheet-badge-val">${calc.currentHp} / ${calc.maxHp}</div>
                <div class="sheet-badge-sub">PONTOS DE VIDA</div>
              </div>
              <div class="sheet-big-badge">
                <div class="sheet-badge-val">${PF2E_ENGINE.formatMod(calc.perception.total)}</div>
                <div class="sheet-badge-sub">PERCEPÇÃO (${temlDots(calc.perception.rank)})</div>
              </div>
            </div>

            <div style="font-size:6pt; margin-bottom:4px; display:flex; justify-content:space-between; background:#f8fafc; border:1px solid #cbd5e1; padding:2px 4px; border-radius:2px;">
              <span><strong>Sentidos:</strong> ${esc(sensesList)}</span>
              <span><strong>Escudo:</strong> Dureza 5 | PV 20/20 | BT 10</span>
            </div>

            <div class="sheet-box-title">❤️ Salvaguardas & Condições</div>
            <div class="sheet-defense-row">
              <div class="sheet-cell" style="text-align:center;">
                <span class="sheet-cell-label">FORTITUDE (${temlDots(calc.saves.fortitude.rank)})</span>
                <span style="font-size:11pt; font-weight:900;">${PF2E_ENGINE.formatMod(calc.saves.fortitude.total)}</span>
              </div>
              <div class="sheet-cell" style="text-align:center;">
                <span class="sheet-cell-label">REFLEXOS (${temlDots(calc.saves.reflex.rank)})</span>
                <span style="font-size:11pt; font-weight:900;">${PF2E_ENGINE.formatMod(calc.saves.reflex.total)}</span>
              </div>
              <div class="sheet-cell" style="text-align:center;">
                <span class="sheet-cell-label">VONTADE (${temlDots(calc.saves.will.rank)})</span>
                <span style="font-size:11pt; font-weight:900;">${PF2E_ENGINE.formatMod(calc.saves.will.total)}</span>
              </div>
            </div>

            <div style="font-size:6pt; background:#f8fafc; border:1px solid #cbd5e1; padding:2px 4px; border-radius:2px; margin-bottom:4px;">
              <strong>Risco de Morte:</strong> Morrendo [ 1 ] [ 2 ] [ 3 ] [ 4 ] · Ferido [ 1 ] [ 2 ] [ 3 ] · Condenado [ 1 ] [ 2 ] [ 3 ]
            </div>

            <div class="sheet-box-title">⚔️ Golpes & Armas Equipadas</div>
            ${p1StrikesHtml || '<div style="font-size:6pt; color:#94a3b8; font-style:italic;">Nenhuma arma equipada.</div>'}

            <div class="sheet-box-title" style="margin-top:4px;">🎯 CD de Classe & Magia</div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
              ${cell("CD de Classe", `${calc.classDc} (Base 10 + Nível + Prof)`)}
              ${cell("CD de Magia / Ataque", `${calc.classDc} / +${calc.level + 4}`)}
            </div>
          </div>

          <!-- COLUNA DIREITA: Tabela de Perícias Oficiais (16 Perícias + Saberes) -->
          <div>
            <div class="sheet-box-title">📜 Tabela de Perícias Oficiais (TEML)</div>
            <table class="sheet-skills-table">
              <thead>
                <tr>
                  <th>Perícia</th>
                  <th style="text-align:center;">TEML</th>
                  <th style="text-align:center;">Total</th>
                  <th style="text-align:center;">Atr</th>
                  <th style="text-align:center;">Item</th>
                </tr>
              </thead>
              <tbody>
                ${p1SkillsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <footer class="sheet-page-footer">
          <span>Pathfinder 2e Remaster · Página 1 de 4</span>
          <span>Personagem: ${esc(character.name)}</span>
        </footer>
      </div>

      <!-- PÁGINA 2: TALENTOS, RECURSOS E INVENTÁRIO -->
      <div class="sheet-page">
        <header class="sheet-official-header">
          <div class="sheet-logo-block">
            <span class="sheet-logo-title">PROGRESSÃO & INVENTÁRIO</span>
            <span class="sheet-logo-subtitle">Talentos, Habilidades de Classe & Itens</span>
          </div>
          <div style="font-size:8pt; font-weight:bold; color:#0f172a;">${esc(character.name)} · Nível ${character.level}</div>
        </header>

        <div class="sheet-grid-2col">
          <!-- Talentos e Progressão -->
          <div>
            <div class="sheet-box-title">🌟 Árvore de Talentos & Habilidades (1–20)</div>
            ${featProgressionRows}
          </div>

          <!-- Inventário e Carga -->
          <div>
            <div class="sheet-box-title">🎒 Inventário & Mochila de Aventureiro</div>
            <div style="border-bottom:1px solid #0f172a; padding-bottom:2px; margin-bottom:4px; display:grid; grid-template-columns: 1fr 30px 30px; font-weight:bold; font-size:6pt;">
              <span>Item</span>
              <span style="text-align:center;">Qtd</span>
              <span style="text-align:center;">Carga</span>
            </div>
            ${inventoryRows}

            <div class="sheet-box-title" style="margin-top:8px;">⚖️ Capacidade de Carga & Riqueza</div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px; margin-bottom:6px;">
              ${cell("Carga Total / Limite", `${calc.bulk.current} / ${calc.bulk.max} Bulk`)}
              ${cell("Limite de Sobrecarga", `${calc.bulk.encumbered} Bulk`)}
            </div>

            <div class="sheet-box-title">💰 Moedas & Fortuna</div>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:4px; text-align:center;">
              <div class="sheet-cell"><span class="sheet-cell-label">PPl</span><span style="font-weight:bold;">${character.coins?.pp || 0}</span></div>
              <div class="sheet-cell"><span class="sheet-cell-label">PO</span><span style="font-weight:bold; color:#b45309;">${character.coins?.gp || 15}</span></div>
              <div class="sheet-cell"><span class="sheet-cell-label">PP</span><span style="font-weight:bold;">${character.coins?.sp || 0}</span></div>
              <div class="sheet-cell"><span class="sheet-cell-label">PC</span><span style="font-weight:bold;">${character.coins?.cp || 0}</span></div>
            </div>
          </div>
        </div>

        <footer class="sheet-page-footer">
          <span>Pathfinder 2e Remaster · Página 2 de 4</span>
          <span>Personagem: ${esc(character.name)}</span>
        </footer>
      </div>

      <!-- PÁGINA 3: IDENTIDADE, RETRATO, HISTÓRICO E AÇÕES -->
      <div class="sheet-page">
        <header class="sheet-official-header">
          <div class="sheet-logo-block">
            <span class="sheet-logo-title">IDENTIDADE & BIOGRAFIA</span>
            <span class="sheet-logo-subtitle">Retrato, Personalidade, Éditos & Ações de Combate</span>
          </div>
          <div style="font-size:8pt; font-weight:bold; color:#0f172a;">${esc(character.name)}</div>
        </header>

        <div class="sheet-grid-2col">
          <div>
            <div class="sheet-box-title">🎨 Retrato do Personagem</div>
            <div class="sheet-portrait-frame">
              ${character.avatarUrl ? `<img src="${esc(character.avatarUrl)}" style="max-width:100%; max-height:100%; object-fit:contain;">` : '<span style="color:#94a3b8; font-style:italic; font-size:7pt;">Espaço para Retrato / Ilustração</span>'}
            </div>

            <div class="sheet-box-title" style="margin-top:6px;">👤 Aparência Física</div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
              ${cell("Gênero / Pronomes", character.gender || 'Livre')}
              ${cell("Idade", character.age || 'Adulto')}
              ${cell("Altura / Peso", character.height || 'Médio')}
              ${cell("Olhos / Cabelos", character.eyes || 'Castanhos')}
            </div>

            <div class="sheet-box-title" style="margin-top:6px;">🗣️ Idiomas Conhecidos</div>
            <div style="font-size:6.5pt; background:#f8fafc; border:1px solid #cbd5e1; padding:3px; border-radius:2px;">
              ${esc((character.languages || ["Comum"]).join(", "))}
            </div>
          </div>

          <div>
            <div class="sheet-box-title">📖 Origem & Histórico do Personagem</div>
            <div style="font-size:6.5pt; line-height:1.5; background:#f8fafc; border:1px solid #cbd5e1; padding:4px; border-radius:2px; min-height:85px; margin-bottom:6px;">
              ${esc(character.backstory || character.appearance || 'Herói destemido trilhando seu caminho pelas terras de Golarion.')}
            </div>

            <div class="sheet-box-title">⚡ Ações, Atividades & Reações de Combate</div>
            ${actionsHtml}
          </div>
        </div>

        <footer class="sheet-page-footer">
          <span>Pathfinder 2e Remaster · Página 3 de 4</span>
          <span>Personagem: ${esc(character.name)}</span>
        </footer>
      </div>

      <!-- PÁGINA 4: CONJURADOR, MAGIAS, FOCO E RITUAIS -->
      <div class="sheet-page">
        <header class="sheet-official-header">
          <div class="sheet-logo-block">
            <span class="sheet-logo-title">GRIMÓRIO & CONJURAÇÃO</span>
            <span class="sheet-logo-subtitle">Tradições Mágicas, Espaços de Magia, Foco & Rituais</span>
          </div>
          <div style="font-size:8pt; font-weight:bold; color:#0f172a;">${esc(character.name)}</div>
        </header>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:4px; margin-bottom:6px;">
          ${cell("Tradição Mágica", character.magicTradition || 'Divina / Arcana')}
          ${cell("Tipo de Conjuração", character.spellcastingType || 'Preparada')}
          ${cell("Ataque de Magia", `+${calc.level + 4}`)}
          ${cell("CD de Salvaguarda de Magia", `${calc.classDc}`)}
        </div>

        <div class="sheet-box-title">✨ Espaços de Magia por Círculo (Spell Slots 1–10)</div>
        <div class="sheet-slot-grid">
          ${spellSlotsHtml}
        </div>

        <div class="sheet-grid-2col" style="margin-top:6px;">
          <div>
            <div class="sheet-box-title">📜 Magias Preparadas / Repertório</div>
            ${spellsListHtml}
          </div>

          <div>
            <div class="sheet-box-title">🔮 Magias de Foco & Pontos de Foco</div>
            <div style="font-size:6.5pt; background:#f8fafc; border:1px solid #cbd5e1; padding:3px; border-radius:2px; margin-bottom:6px;">
              <strong>Pontos de Foco:</strong> [ ◆ ] [ ◇ ] [ ◇ ] (1/3 disponíveis)
            </div>

            <div class="sheet-box-title">◈ Rituais & Magias Inatas</div>
            ${ritualsListHtml}
          </div>
        </div>

        <footer class="sheet-page-footer">
          <span>Pathfinder 2e Remaster · Página 4 de 4</span>
          <span>Personagem: ${esc(character.name)}</span>
        </footer>
      </div>
    `;
    window.print();
  }

  printLegacySheet() {
    const area = document.getElementById("printSheetArea");
    area.innerHTML = `
      <div style="font-family: 'Cinzel', Georgia, serif; border: 3px solid #000; padding: 20px;">
        <div style="display:flex; justify-content:space-between; border-bottom:2px solid #000; padding-bottom:10px;">
          <div>
            <h1 style="font-size:24px; margin:0;">PATHFINDER 2E — FICHA DE PERSONAGEM</h1>
            <h2 style="font-size:18px; margin:4px 0 0 0; color:#333;">${this.character.name}</h2>
          </div>
          <div style="text-align:right; font-size:12px;">
            <strong>Nível:</strong> ${this.character.level}<br>
            <strong>Ancestralidade:</strong> ${this.character.ancestry} (${this.character.heritage || 'Comum'})<br>
            <strong>Classe:</strong> ${this.character.class} (${this.character.subclass || 'Padrão'})
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:10px; margin:15px 0; text-align:center;">
          <div style="border:1px solid #000; padding:6px;"><strong>FOR</strong><br><span style="font-size:18px;">${this.calc.scores.str}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.str)})</div>
          <div style="border:1px solid #000; padding:6px;"><strong>DES</strong><br><span style="font-size:18px;">${this.calc.scores.dex}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.dex)})</div>
          <div style="border:1px solid #000; padding:6px;"><strong>CON</strong><br><span style="font-size:18px;">${this.calc.scores.con}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.con)})</div>
          <div style="border:1px solid #000; padding:6px;"><strong>INT</strong><br><span style="font-size:18px;">${this.calc.scores.int}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.int)})</div>
          <div style="border:1px solid #000; padding:6px;"><strong>SAB</strong><br><span style="font-size:18px;">${this.calc.scores.wis}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.wis)})</div>
          <div style="border:1px solid #000; padding:6px;"><strong>CAR</strong><br><span style="font-size:18px;">${this.calc.scores.cha}</span><br>(${PF2E_ENGINE.formatMod(this.calc.mods.cha)})</div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px; margin:15px 0;">
          <div style="border:2px solid #000; padding:10px; text-align:center;">
            <strong>CLASSE DE ARMADURA (CA)</strong><br>
            <span style="font-size:26px; font-weight:bold;">${this.calc.ac.total}</span>
          </div>
          <div style="border:2px solid #000; padding:10px; text-align:center;">
            <strong>PONTOS DE VIDA (PV)</strong><br>
            <span style="font-size:26px; font-weight:bold;">${this.calc.currentHp} / ${this.calc.maxHp}</span>
          </div>
          <div style="border:2px solid #000; padding:10px; text-align:center;">
            <strong>VELOCIDADE / PERCEPÇÃO</strong><br>
            <span style="font-size:16px;">${this.formatMovementSpeeds()} | ${PF2E_ENGINE.formatMod(this.calc.perception.total)}</span>
          </div>
        </div>

        <div style="margin:15px 0;">
          <h3 style="border-bottom:1px solid #000;">⚔️ GOLPES & ARSENAL</h3>
          ${this.calc.strikes.map(s => `
            <div style="margin-bottom:6px;">
              <strong>${s.name}</strong> (${s.category}) — Ataque: <strong>${PF2E_ENGINE.formatMod(s.map[0])} / ${PF2E_ENGINE.formatMod(s.map[1])} / ${PF2E_ENGINE.formatMod(s.map[2])}</strong> | Dano: <strong>${s.damageFormatted}</strong> | Traços: <em>${(s.traits || []).join(', ')}</em>
            </div>
          `).join('')}
        </div>

        <div style="margin:15px 0;">
          <h3 style="border-bottom:1px solid #000;">🛡️ SALVAGUARDAS</h3>
          <div><strong>Fortitude:</strong> ${PF2E_ENGINE.formatMod(this.calc.saves.fortitude.total)} (${this.calc.saves.fortitude.rank}) | <strong>Reflexos:</strong> ${PF2E_ENGINE.formatMod(this.calc.saves.reflex.total)} (${this.calc.saves.reflex.rank}) | <strong>Vontade:</strong> ${PF2E_ENGINE.formatMod(this.calc.saves.will.total)} (${this.calc.saves.will.rank})</div>
        </div>
      </div>
    `;
    window.print();
  }

  // =========================================================================
  // CONTROLADOR DO ASSISTENTE DE IA DE CRIAÇÃO DE PERSONAGEM (100% GRATUITO)
  // =========================================================================
  openAIAssistantModal() {
    const overlay = document.getElementById("modalAIAssistantOverlay");
    if (!overlay) return;
    overlay.classList.add("active");
    this.renderAIPresetChips();
    const promptInput = document.getElementById("aiPromptInput");
    if (promptInput) {
      if (!promptInput.value) {
        promptInput.value = "Quero um guerreiro anão tanque com machado de batalha e escudo pesado de aço focado em alta defesa";
      }
      promptInput.focus();
    }
  }

  closeAIAssistantModal() {
    const overlay = document.getElementById("modalAIAssistantOverlay");
    if (overlay) overlay.classList.remove("active");
  }

  renderAIPresetChips() {
    const container = document.getElementById("aiPresetChips");
    if (!container || !window.PF2E_AI_ASSISTANT) return;
    const presets = window.PF2E_AI_ASSISTANT.quickPresets || [];
    container.innerHTML = presets.map((p, idx) => `
      <button onclick="app.selectAIPreset(${idx})" style="background: #1e293b; color: #cbd5e1; border: 1px solid #475569; font-size: 11px; padding: 3px 8px; border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#8b5cf6'; this.style.color='#fff'" onmouseout="this.style.borderColor='#475569'; this.style.color='#cbd5e1'">
        ${p.title}
      </button>
    `).join("");
  }

  selectAIPreset(idx) {
    if (!window.PF2E_AI_ASSISTANT) return;
    const preset = window.PF2E_AI_ASSISTANT.quickPresets[idx];
    if (preset) {
      const promptInput = document.getElementById("aiPromptInput");
      if (promptInput) promptInput.value = preset.prompt;
      this.generateCharacterWithAI();
    }
  }

  pickRandomAIPreset() {
    if (!window.PF2E_AI_ASSISTANT) return;
    const presets = window.PF2E_AI_ASSISTANT.quickPresets;
    const randomIdx = Math.floor(Math.random() * presets.length);
    this.selectAIPreset(randomIdx);
  }

  generateCharacterWithAI() {
    if (!window.PF2E_AI_ASSISTANT) return;
    const promptInput = document.getElementById("aiPromptInput");
    const promptText = promptInput ? promptInput.value.trim() : "";
    if (!promptText) {
      alert("Por favor, digite uma descrição ou escolha um conceito acima para a IA criar o personagem.");
      return;
    }

    // Gera o personagem usando o motor de IA
    const generated = window.PF2E_AI_ASSISTANT.generateCharacter(promptText);
    this.lastAIGeneratedChar = generated;

    // Calcula os atributos e estatísticas para preview
    const calc = PF2E_ENGINE.calculateCharacterStats(generated);

    // Atualiza a visualização no modal
    const resultBox = document.getElementById("aiResultContainer");
    const nameEl = document.getElementById("aiPreviewName");
    const taglineEl = document.getElementById("aiPreviewTagline");
    const roleEl = document.getElementById("aiPreviewRole");
    const detailsEl = document.getElementById("aiPreviewDetails");
    const tacticsEl = document.getElementById("aiPreviewTactics");
    const btnApply = document.getElementById("btnApplyAICharacter");

    if (resultBox && nameEl && detailsEl) {
      nameEl.innerText = generated.name;
      taglineEl.innerText = `${generated.ancestry} (${generated.heritage}) · ${generated.class} (${generated.subclass}) · Nv ${generated.level}`;
      roleEl.innerText = generated.aiNotes?.combatRole || "⚔️ Herói de Aventura";

      detailsEl.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap: 4px; background: rgba(0,0,0,0.25); padding: 6px; border-radius: 4px; margin-bottom: 6px; text-align: center;">
          <div><strong style="color:#f97316;">FOR</strong><br>${calc.scores.str} (${PF2E_ENGINE.formatMod(calc.mods.str)})</div>
          <div><strong style="color:#f97316;">DES</strong><br>${calc.scores.dex} (${PF2E_ENGINE.formatMod(calc.mods.dex)})</div>
          <div><strong style="color:#f97316;">CON</strong><br>${calc.scores.con} (${PF2E_ENGINE.formatMod(calc.mods.con)})</div>
          <div><strong style="color:#f97316;">INT</strong><br>${calc.scores.int} (${PF2E_ENGINE.formatMod(calc.mods.int)})</div>
          <div><strong style="color:#f97316;">SAB</strong><br>${calc.scores.wis} (${PF2E_ENGINE.formatMod(calc.mods.wis)})</div>
          <div><strong style="color:#f97316;">CAR</strong><br>${calc.scores.cha} (${PF2E_ENGINE.formatMod(calc.mods.cha)})</div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>🛡️ <strong>CA:</strong> ${calc.ac.total}</span>
          <span>❤️ <strong>PV:</strong> ${calc.maxHp}</span>
          <span>🏃 <strong>Deslocamento:</strong> ${calc.speed}ft.</span>
          <span>👁️ <strong>Percepção:</strong> ${PF2E_ENGINE.formatMod(calc.perception.total)}</span>
        </div>
        <div>⚔️ <strong>Armas:</strong> ${(generated.weapons || []).map(w => w.name).join(", ")}</div>
        <div>🛡️ <strong>Armadura:</strong> ${generated.equippedArmor?.name || "Roupas de Explorador"} ${generated.shieldRaised ? "(Escudo Equipado)" : ""}</div>
      `;

      if (tacticsEl && generated.aiNotes?.tacticalTip) {
        tacticsEl.innerHTML = `<strong>💡 Dica Tática da IA:</strong> ${generated.aiNotes.tacticalTip}`;
      }

      resultBox.style.display = "block";
      if (btnApply) btnApply.style.display = "inline-block";
    }
  }

  applyCurrentAICharacter() {
    if (!this.lastAIGeneratedChar) return;
    try {
      this.character = assertSafeCharacterDocument(this.lastAIGeneratedChar);
      this.saveCharacterLocal();
      this.renderAll();
      this.closeAIAssistantModal();
      alert(`✨ Personagem "${this.character.name}" criado com sucesso pela IA e carregado no construtor!`);
    } catch (err) {
      alert("Erro ao aplicar personagem gerado: " + err.message);
    }
  }
}

// Inicializa a aplicação Pathbuilder 2e Local
window.app = new PathbuilderApp();

