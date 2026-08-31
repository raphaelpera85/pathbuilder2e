function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function escapeInlineArgument(value) {
  return escapeHtml(JSON.stringify(String(value ?? "")));
}

function mergeCatalogRecords(primary = [], secondary = []) {
  const merged = [];
  const seen = new Set();
  [...primary, ...secondary].forEach((record) => {
    if (!record) return;
    const key = record.id || record.names?.en || record.name;
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(record);
  });
  return merged;
}

function getObjectCatalogRecords(collection = {}) {
  const entries = Object.entries(collection || {});
  const canonical = entries.filter(([, record]) => !String(record?.id || "").includes(".legacy_alias."));
  const aliases = entries.filter(([, record]) => String(record?.id || "").includes(".legacy_alias."));
  const seen = new Set();
  return [...canonical, ...aliases].map(([key, record]) => ({ key, record })).filter(({ key, record }) => {
    const semanticKey = record?.names?.en || record?.id || key;
    if (seen.has(semanticKey)) return false;
    seen.add(semanticKey);
    return true;
  });
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

const UI_TRANSLATIONS = {
  skills: {
    acrobatics: { "pt-BR": "Acrobacias", en: "Acrobatics", es: "Acrobacias" },
    arcana: { "pt-BR": "Arcanismo", en: "Arcana", es: "Arcanos" },
    athletics: { "pt-BR": "Atletismo", en: "Athletics", es: "Atletismo" },
    crafting: { "pt-BR": "Manufatura", en: "Crafting", es: "Artesanía" },
    deception: { "pt-BR": "Enganação", en: "Deception", es: "Engaño" },
    diplomacy: { "pt-BR": "Diplomacia", en: "Diplomacy", es: "Diplomacia" },
    intimidation: { "pt-BR": "Intimidação", en: "Intimidation", es: "Intimidación" },
    medicine: { "pt-BR": "Medicina", en: "Medicine", es: "Medicina" },
    nature: { "pt-BR": "Natureza", en: "Nature", es: "Naturaleza" },
    occultism: { "pt-BR": "Ocultismo", en: "Occultism", es: "Ocultismo" },
    performance: { "pt-BR": "Atuação", en: "Performance", es: "Interpretación" },
    religion: { "pt-BR": "Religião", en: "Religion", es: "Religión" },
    society: { "pt-BR": "Sociedade", en: "Society", es: "Sociedad" },
    stealth: { "pt-BR": "Furtividade", en: "Stealth", es: "Sigilo" },
    survival: { "pt-BR": "Sobrevivência", en: "Survival", es: "Supervivencia" },
    thievery: { "pt-BR": "Ladinagem", en: "Thievery", es: "Hurto" }
  },
  sizes: {
    "Miúdo": { "pt-BR": "Miúdo", en: "Tiny", es: "Diminuto" },
    "Pequeno": { "pt-BR": "Pequeno", en: "Small", es: "Pequeño" },
    "Médio": { "pt-BR": "Médio", en: "Medium", es: "Mediano" },
    "Grande": { "pt-BR": "Grande", en: "Large", es: "Grande" },
    "Enorme": { "pt-BR": "Enorme", en: "Huge", es: "Enorme" },
    "Imenso": { "pt-BR": "Imenso", en: "Gargantuan", es: "Gargantuesco" }
  },
  senses: {
    "Visão Normal": { "pt-BR": "Visão Normal", en: "Normal Vision", es: "Visión Normal" },
    "Visão no Escuro": { "pt-BR": "Visão no Escuro", en: "Darkvision", es: "Visión en la Oscuridad" },
    "Visão na Penumbra": { "pt-BR": "Visão na Penumbra", en: "Low-Light Vision", es: "Visión en la Penumbra" },
    "Visão Maior no Escuro": { "pt-BR": "Visão Maior no Escuro", en: "Greater Darkvision", es: "Visión en la Oscuridad Mayor" }
  },
  classes: {
    "Alquimista": { "pt-BR": "Alquimista", en: "Alchemist", es: "Alquimista" },
    "Bárbaro": { "pt-BR": "Bárbaro", en: "Barbarian", es: "Bárbaro" },
    "Bardo": { "pt-BR": "Bardo", en: "Bard", es: "Bardo" },
    "Campeão": { "pt-BR": "Campeão", en: "Champion", es: "Campeón" },
    "Clérigo": { "pt-BR": "Clérigo", en: "Cleric", es: "Clérigo" },
    "Druida": { "pt-BR": "Druida", en: "Druid", es: "Druida" },
    "Guerreiro": { "pt-BR": "Guerreiro", en: "Fighter", es: "Guerrero" },
    "Armífero": { "pt-BR": "Armífero", en: "Gunslinger", es: "Pistolero" },
    "Inventor": { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" },
    "Investigador": { "pt-BR": "Investigador", en: "Investigator", es: "Investigador" },
    "Cineticista": { "pt-BR": "Cineticista", en: "Kineticist", es: "Cinético" },
    "Magus": { "pt-BR": "Magus", en: "Magus", es: "Magus" },
    "Monge": { "pt-BR": "Monge", en: "Monk", es: "Monje" },
    "Oráculo": { "pt-BR": "Oráculo", en: "Oracle", es: "Oráculo" },
    "Psíquico": { "pt-BR": "Psíquico", en: "Psychic", es: "Psíquico" },
    "Patrulheiro": { "pt-BR": "Patrulheiro", en: "Ranger", es: "Explorador" },
    "Ladino": { "pt-BR": "Ladino", en: "Rogue", es: "Pícaro" },
    "Feiticeiro": { "pt-BR": "Feiticeiro", en: "Sorcerer", es: "Hechicero" },
    "Invocador": { "pt-BR": "Invocador", en: "Summoner", es: "Convocador" },
    "Espadachim": { "pt-BR": "Espadachim", en: "Swashbuckler", es: "Espadachín" },
    "Taumaturgo": { "pt-BR": "Taumaturgo", en: "Thaumaturge", es: "Taumaturgo" },
    "Bruxo": { "pt-BR": "Bruxo", en: "Witch", es: "Brujo" },
    "Mago": { "pt-BR": "Mago", en: "Wizard", es: "Mago" }
  },
  ancestries: {
    "Humano": { "pt-BR": "Humano", en: "Human", es: "Humano" },
    "Elfo": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
    "Anão": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    "Gnomo": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
    "Halfling": { "pt-BR": "Halfling", en: "Halfling", es: "Mediano" },
    "Goblin": { "pt-BR": "Goblin", en: "Goblin", es: "Goblin" },
    "Orc": { "pt-BR": "Orc", en: "Orc", es: "Orco" },
    "Leshy": { "pt-BR": "Leshy", en: "Leshy", es: "Leshys" },
    "Kobold": { "pt-BR": "Kobold", en: "Kobold", es: "Kobold" },
    "Homem-Gato": { "pt-BR": "Homem-Gato", en: "Catfolk", es: "Hombre Gato" },
    "Povo-Rato": { "pt-BR": "Povo-Rato", en: "Ratfolk", es: "Hombre Rata" },
    "Tengu": { "pt-BR": "Tengu", en: "Tengu", es: "Tengu" },
    "Homem-Lagarto": { "pt-BR": "Homem-Lagarto", en: "Lizardfolk", es: "Hombre Lagarto" },
    "Autômato": { "pt-BR": "Autômato", en: "Automaton", es: "Autómata" },
    "Androide": { "pt-BR": "Androide", en: "Android", es: "Androide" },
    "Poppet": { "pt-BR": "Poppet", en: "Poppet", es: "Poppet" },
    "Esqueleto": { "pt-BR": "Esqueleto", en: "Skeleton", es: "Esqueleto" },
    "Sprite": { "pt-BR": "Sprite", en: "Sprite", es: "Sprite" },
    "Fetchling": { "pt-BR": "Fetchling", en: "Fetchling", es: "Fetchling" },
    "Kitsune": { "pt-BR": "Kitsune", en: "Kitsune", es: "Kitsune" },
    "Strix": { "pt-BR": "Strix", en: "Strix", es: "Strix" }
  },
  heritages: {
    "Humano Versátil": { "pt-BR": "Humano Versátil", en: "Versatile Human", es: "Humano Versátil" },
    "Humano Talentoso": { "pt-BR": "Humano Talentoso", en: "Skilled Human", es: "Humano Diestro" },
    "Elfo Silvestre": { "pt-BR": "Elfo Silvestre", en: "Woodland Elf", es: "Elfo Silvano" },
    "Elfo Cavernar": { "pt-BR": "Elfo Cavernar", en: "Cavern Elf", es: "Elfo de las Cavernas" },
    "Elfo Alto": { "pt-BR": "Elfo Alto", en: "Ancient Elf", es: "Elfo Ancestral" },
    "Anão da Rocha Forte": { "pt-BR": "Anão da Rocha Forte", en: "Strong-Blooded Dwarf", es: "Enano de Sangre Fuerte" },
    "Anão Escavador de Rocha": { "pt-BR": "Anão Escavador de Rocha", en: "Rock Dwarf", es: "Enano de las Rocas" },
    "Meio-Elfo": { "pt-BR": "Meio-Elfo", en: "Half-Elf (Aiuvarin)", es: "Medio Elfo (Aiuvarin)" },
    "Meio-Orc": { "pt-BR": "Meio-Orc", en: "Half-Orc (Dromaar)", es: "Medio Orco (Dromaar)" },
    "Aasimar": { "pt-BR": "Aasimar", en: "Aasimar (Holy Nephilim)", es: "Aasimar" },
    "Tiefling": { "pt-BR": "Tiefling", en: "Tiefling (Unholy Nephilim)", es: "Tiflin" },
    "Dhampir": { "pt-BR": "Dhampir", en: "Dhampir", es: "Dampiro" },
    "Changeling": { "pt-BR": "Changeling", en: "Changeling", es: "Cambion" }
  },
  backgrounds: {
    "Guarda da Cidade": { "pt-BR": "Guarda da Cidade", en: "Guard", es: "Guardia" },
    "Guarda": { "pt-BR": "Guarda", en: "Guard", es: "Guardia" },
    "Gladiador": { "pt-BR": "Gladiador", en: "Gladiator", es: "Gladiador" },
    "Nobre": { "pt-BR": "Nobre", en: "Noble", es: "Noble" },
    "Acólito": { "pt-BR": "Acólito", en: "Acolyte", es: "Acólito" },
    "Criminoso": { "pt-BR": "Criminoso", en: "Criminal", es: "Criminal" },
    "Caçador": { "pt-BR": "Caçador", en: "Hunter", es: "Cazador" },
    "Marinheiro": { "pt-BR": "Marinheiro", en: "Sailor", es: "Marinero" },
    "Estudioso": { "pt-BR": "Estudioso", en: "Scholar", es: "Erudito" },
    "Guerreiro": { "pt-BR": "Guerreiro", en: "Warrior", es: "Guerrero" },
    "Artista": { "pt-BR": "Artista", en: "Entertainer", es: "Artista" },
    "Artesão": { "pt-BR": "Artesão", en: "Artisan", es: "Artesano" },
    "Charlatão": { "pt-BR": "Charlatão", en: "Charlatan", es: "Charlatán" },
    "Eremita": { "pt-BR": "Eremita", en: "Hermit", es: "Ermitaño" },
    "Mercador": { "pt-BR": "Mercador", en: "Merchant", es: "Comerciante" },
    "Nômade": { "pt-BR": "Nômade", en: "Nomad", es: "Nómada" },
    "Trabalhador": { "pt-BR": "Trabalhador", en: "Laborer", es: "Obrero" },
    "Emissário": { "pt-BR": "Emissário", en: "Emissary", es: "Emisario" },
    "Detetive": { "pt-BR": "Detetive", en: "Detective", es: "Detective" },
    "Bandido": { "pt-BR": "Bandido", en: "Bandit", es: "Bandido" },
    "Batedor": { "pt-BR": "Batedor", en: "Scout", es: "Explorador" },
    "Herdeiro Nobre": { "pt-BR": "Herdeiro Nobre", en: "Noble Heir", es: "Heredero Noble" },
    "Médico de Campo": { "pt-BR": "Médico de Campo", en: "Field Medic", es: "Médico de Campaña" },
    "Prisioneiro": { "pt-BR": "Prisioneiro", en: "Prisoner", es: "Prisionero" },
    "Garoto de Rua": { "pt-BR": "Garoto de Rua", en: "Street Urchin", es: "Pillo Callejero" }
  },
  weapons: {
    "Espada Longa": { "pt-BR": "Espada Longa", en: "Longsword", es: "Espada Larga" },
    "Espada Curta": { "pt-BR": "Espada Curta", en: "Shortsword", es: "Espada Corta" },
    "Rapieira": { "pt-BR": "Rapieira", en: "Rapier", es: "Estoque" },
    "Adaga": { "pt-BR": "Adaga", en: "Dagger", es: "Daga" },
    "Arco Curto": { "pt-BR": "Arco Curto", en: "Shortbow", es: "Arco Corto" },
    "Arco Longo": { "pt-BR": "Arco Longo", en: "Longbow", es: "Arco Largo" },
    "Machado de Batalha": { "pt-BR": "Machado de Batalha", en: "Battle Axe", es: "Hacha de Batalla" },
    "Montante": { "pt-BR": "Montante", en: "Greatsword", es: "Espadón" },
    "Martelo de Guerra": { "pt-BR": "Martelo de Guerra", en: "Warhammer", es: "Martillo de Guerra" },
    "Maça": { "pt-BR": "Maça", en: "Mace", es: "Maza" },
    "Lança": { "pt-BR": "Lança", en: "Spear", es: "Lanza" },
    "Besta": { "pt-BR": "Besta", en: "Crossbow", es: "Ballesta" },
    "Cimitarra": { "pt-BR": "Cimitarra", en: "Scimitar", es: "Cimitarra" },
    "Bordão": { "pt-BR": "Bordão", en: "Staff", es: "Bastón" },
    "Escudo de Aço": { "pt-BR": "Escudo de Aço", en: "Steel Shield", es: "Escudo de Acero" },
    "Escudo de Madeira": { "pt-BR": "Escudo de Madeira", en: "Wooden Shield", es: "Escudo de Madera" },
    "Broquel": { "pt-BR": "Broquel", en: "Buckler", es: "Broquel" },
    "Desarmado": { "pt-BR": "Desarmado", en: "Unarmed", es: "Desarmado" },
    "Armadura de Couro": { "pt-BR": "Armadura de Couro", en: "Leather Armor", es: "Armadura de Cuero" },
    "Cota de Malha": { "pt-BR": "Cota de Malha", en: "Chain Mail", es: "Cota de Malla" },
    "Armadura Completa": { "pt-BR": "Armadura Completa", en: "Full Plate", es: "Armadura de Placas" },
    "Sem Armadura": { "pt-BR": "Sem Armadura", en: "Unarmored", es: "Sin Armadura" }
  },
  traits: {
    "Ágil": { "pt-BR": "Ágil", en: "Agile", es: "Ágil" },
    "Finesse": { "pt-BR": "Finesse", en: "Finesse", es: "Sutileza" },
    "Versátil P": { "pt-BR": "Versátil P", en: "Versatile P", es: "Versátil P" },
    "Versátil C": { "pt-BR": "Versátil C", en: "Versatile S", es: "Versátil C" },
    "Versátil I": { "pt-BR": "Versátil I", en: "Versatile B", es: "Versátil I" },
    "Desarmado": { "pt-BR": "Desarmado", en: "Unarmed", es: "Desarmado" },
    "Não Letal": { "pt-BR": "Não Letal", en: "Nonlethal", es: "No Letal" },
    "Arremesso": { "pt-BR": "Arremesso", en: "Thrown", es: "Arrojadiza" },
    "Aparar": { "pt-BR": "Aparar", en: "Parry", es: "Parada" },
    "Derrubar": { "pt-BR": "Derrubar", en: "Trip", es: "Derribo" },
    "Desarmar": { "pt-BR": "Desarmar", en: "Disarm", es: "Desarme" },
    "Empurrão": { "pt-BR": "Empurrão", en: "Shove", es: "Empujón" },
    "Alcance": { "pt-BR": "Alcance", en: "Reach", es: "Alcance" },
    "Mãos 1+": { "pt-BR": "Mãos 1+", en: "Hands 1+", es: "Manos 1+" },
    "Duas Mãos": { "pt-BR": "Duas Mãos", en: "Two-Hand", es: "Dos Manos" }
  }
};

/**
 * PATHBUILDER 2E LOCAL - CONTROLADOR DA INTERFACE (MULTI-IDIOMA: PT-BR, EN, ES)
 * Construtor local com árvore de progressão, dados rápidos e ficha própria para impressão.
 */

class PathbuilderApp {
  constructor() {
    this.character = null;
    this.calc = null;
    this.diceHistory = [];
    this.dicePool = [];
    this.diceAnimationTimer = null;
    this.currentPickerType = null;
    this.selectedPickerItem = null;
    this.activeModalTab = "All";
    this.mobileActiveView = "stats";
    if (typeof window !== "undefined") {
      window.addEventListener("pathbuilder:locale-change", () => {
        this.renderAll();
      });
    }
    this.init();
  }

  getLocale() {
    if (typeof localStorage !== "undefined") {
      const loc = localStorage.getItem("pathbuilder.locale") || localStorage.getItem("pathbuilder_locale");
      if (loc === "en" || loc === "es" || loc === "pt-BR") return loc;
    }
    return "pt-BR";
  }

  localizeItemName(rawName, locale = this.getLocale()) {
    if (!rawName || typeof rawName !== "string") return rawName || "";
    if (locale === "pt-BR") {
      const match = rawName.match(/^([^(]+?)\s*\(([^)]+)\)$/);
      if (match) return match[1].trim();
      return rawName;
    }

    const dicts = [
      UI_TRANSLATIONS.classes,
      UI_TRANSLATIONS.ancestries,
      UI_TRANSLATIONS.backgrounds,
      UI_TRANSLATIONS.heritages,
      UI_TRANSLATIONS.weapons
    ];

    for (const dict of dicts) {
      if (dict[rawName]?.[locale]) return dict[rawName][locale];
    }

    for (const dict of dicts) {
      for (const [key, mapping] of Object.entries(dict)) {
        if (rawName.startsWith(key) || rawName.includes(key)) {
          return mapping[locale];
        }
      }
    }

    const match = rawName.match(/^([^(]+?)\s*\(([^)]+)\)$/);
    if (match) {
      const ptPart = match[1].trim();
      const enParts = match[2].split("/").map(s => s.trim());
      if (locale === "en") return enParts[0] || ptPart;
      if (locale === "es") return enParts[1] || enParts[0] || ptPart;
    }

    return rawName;
  }

  localizeTrait(trait, locale = this.getLocale()) {
    if (!trait || typeof trait !== "string") return trait || "";
    return UI_TRANSLATIONS.traits[trait]?.[locale] || trait;
  }

  updateStaticLabels(locale = this.getLocale()) {
    if (typeof document === "undefined" || typeof document.querySelector !== "function") return;
    const isEn = locale === "en";
    const isEs = locale === "es";

    // 1. Plan Toggle Button
    const btnToggle = document.getElementById("btnTogglePlan");
    if (btnToggle) {
      btnToggle.innerText = this.planHidden
        ? (isEn ? "Show Plan" : isEs ? "Mostrar Plan" : "Mostrar Plano")
        : (isEn ? "Hide Plan" : isEs ? "Ocultar Plan" : "Ocultar Plano");
    }

    // 2. Header Row Inputs Labels
    const lvlBoxLabel = document.querySelector(".pb-header-row .stat-input-box:nth-child(2) label");
    if (lvlBoxLabel) lvlBoxLabel.innerText = isEn ? "Level" : isEs ? "Nivel" : "Nível";

    const nameBoxLabel = document.querySelector(".pb-header-row .stat-input-box:nth-child(4) label");
    if (nameBoxLabel) nameBoxLabel.innerText = isEn ? "Character Name" : isEs ? "Nombre del Personaje" : "Nome do Personagem";

    const variantBtn = document.getElementById("variantRulesBtn");
    if (variantBtn) variantBtn.innerHTML = `⚙️ ${isEn ? "Variants" : isEs ? "Variantes" : "Variantes"}`;

    // 3. Mini Bar Ability Labels
    const miniBoxes = document.querySelectorAll(".abilities-summary-bar .mini-box");
    if (miniBoxes && miniBoxes.length >= 6) {
      const lbl0 = miniBoxes[0].querySelector("span:last-child");
      if (lbl0) lbl0.innerText = isEn ? "SIZE" : isEs ? "TAMAÑO" : "TAMANHO";

      const lbl1 = miniBoxes[1].querySelector("span:last-child");
      if (lbl1) lbl1.innerText = isEn ? "SPEED" : isEs ? "VELOC." : "VELOC.";

      const lbl2 = miniBoxes[2].querySelector("span:last-child");
      if (lbl2) lbl2.innerText = isEn ? "STR" : isEs ? "FUE" : "FOR";

      const lbl3 = miniBoxes[3].querySelector("span:last-child");
      if (lbl3) lbl3.innerText = isEn ? "DEX" : isEs ? "DES" : "DES";

      const lbl4 = miniBoxes[4].querySelector("span:last-child");
      if (lbl4) lbl4.innerText = isEn ? "CON" : isEs ? "CON" : "CON";

      const lbl5 = miniBoxes[5].querySelector("span:last-child");
      if (lbl5) lbl5.innerText = isEn ? "INT" : isEs ? "INT" : "INT";
    }

    // 4. Vitals (AC, HP, Saves)
    const acTitle = document.querySelector(".ac-shield-title");
    if (acTitle) acTitle.innerText = isEn ? "AC" : "CA";

    const hpTitle = document.querySelector(".hp-bar-container span:first-child");
    if (hpTitle) hpTitle.innerText = isEn ? "HP" : isEs ? "PG" : "PV";

    const saveRows = document.querySelectorAll(".saves-col-box .save-row-box");
    if (saveRows && saveRows.length >= 3) {
      const s0 = saveRows[0].querySelector(".save-name-label");
      if (s0) s0.innerText = isEn ? "Fortitude" : isEs ? "Fortaleza" : "Fortitude";

      const s1 = saveRows[1].querySelector(".save-name-label");
      if (s1) s1.innerText = isEn ? "Reflex" : isEs ? "Reflejos" : "Reflexos";

      const s2 = saveRows[2].querySelector(".save-name-label");
      if (s2) s2.innerText = isEn ? "Will" : isEs ? "Voluntad" : "Vontade";
    }

    // 5. Sub-stats row
    const heroPointsLabel = document.querySelector(".sub-stats-row .hero-points-box span:first-child");
    if (heroPointsLabel) heroPointsLabel.innerText = isEn ? "Hero Points:" : isEs ? "Puntos Heroicos:" : "Pontos Heroicos:";

    const perceptionLabel = document.querySelector(".sub-stats-row > div:nth-child(3) span:last-child");
    if (perceptionLabel) perceptionLabel.innerText = isEn ? "Perception" : isEs ? "Percepción" : "Percepção";

    const initiativeLabel = document.querySelector(".sub-stats-row > div:nth-child(4) span:last-child");
    if (initiativeLabel) initiativeLabel.innerText = isEn ? "Initiative" : isEs ? "Iniciativa" : "Iniciativa";

    // 6. Skills column header
    const skillsHeader = document.querySelector(".skills-col-header span:first-child");
    if (skillsHeader) skillsHeader.innerText = isEn ? "SKILLS" : isEs ? "HABILIDADES" : "PERÍCIAS";

    // 7. Quick Action Bar Buttons
    const quickButtons = document.querySelectorAll(".quick-actions-bar button");
    if (quickButtons && quickButtons.length >= 7) {
      quickButtons[0].innerText = isEn ? "💤 Rest (8h)" : isEs ? "💤 Descansar (8h)" : "💤 Descansar (8h)";
      quickButtons[1].innerText = isEn ? "🛡️ Shield Block" : isEs ? "🛡️ Bloqueo c/ Escudo" : "🛡️ Bloqueio c/ Escudo";
      quickButtons[2].innerText = isEn ? "🎲 Recovery Check" : isEs ? "🎲 Prueba de Recuperación" : "🎲 Teste de Recuperação";
      quickButtons[3].innerText = isEn ? "➕ Add Condition" : isEs ? "➕ Añadir Condición" : "➕ Adicionar Condição";
      quickButtons[4].innerText = isEn ? "⏱️ End Turn" : isEs ? "⏱️ Fin del Turno" : "⏱️ Fim do Turno";
      quickButtons[5].innerText = isEn ? "✨ Clear Conditions" : isEs ? "✨ Limpiar Condiciones" : "✨ Limpar Condições";
      quickButtons[6].innerText = isEn ? "➕ Add Buff" : isEs ? "➕ Añadir Buff" : "➕ Adicionar Buff";
    }

    // 8. Navigation Tab Buttons
    const tabMap = {
      "tab-button-weapons": isEn ? "Weapons" : isEs ? "Armas" : "Armas",
      "tab-button-defense": isEn ? "Defense" : isEs ? "Defensa" : "Defesa",
      "tab-button-gear": isEn ? "Gear" : isEs ? "Equipo" : "Equipamentos",
      "tab-button-spells": isEn ? "Spells" : isEs ? "Conjuros" : "Magias",
      "tab-button-pets": isEn ? "Pets" : isEs ? "Mascotas" : "Mascotes",
      "tab-button-details": isEn ? "Details" : isEs ? "Detalles" : "Detalhes",
      "tab-button-feats": isEn ? "Feats" : isEs ? "Dotes" : "Talentos",
      "tab-button-actions": isEn ? "Actions" : isEs ? "Acciones" : "Ações",
      "tab-button-formulas": isEn ? "Formulas & Alchemy" : isEs ? "Fórmulas y Alquimia" : "Fórmulas & Alquimia"
    };
    for (const [id, label] of Object.entries(tabMap)) {
      const tabEl = document.getElementById(id);
      if (tabEl) tabEl.innerText = label;
    }

    // 9. Weapons Tab Static Elements
    const weaponProfs = document.querySelectorAll(".weapon-prof-group-item span:last-child");
    if (weaponProfs && weaponProfs.length >= 4) {
      weaponProfs[0].innerText = isEn ? "Simple Weapons" : isEs ? "Armas Simples" : "Armas Simples";
      weaponProfs[1].innerText = isEn ? "Martial Weapons" : isEs ? "Armas Marciales" : "Armas Marciais";
      weaponProfs[2].innerText = isEn ? "Advanced Weapons" : isEs ? "Armas Avanzadas" : "Armas Avançadas";
      weaponProfs[3].innerText = isEn ? "Unarmed Attacks" : isEs ? "Ataques Desarmados" : "Ataques Desarmados";
    }
    const addWeaponBtn = document.querySelector("#tab-weapons button[onclick*=\"openPicker('weapon')\"]");
    if (addWeaponBtn) addWeaponBtn.innerText = isEn ? "➕ Add Weapon" : isEs ? "➕ Añadir Arma" : "➕ Adicionar Arma";

    const printSheetBtn = document.querySelector("#tab-weapons button[onclick*=\"printOfficialPdf\"]");
    if (printSheetBtn) printSheetBtn.innerText = isEn ? "🖨️ Print Sheet" : isEs ? "🖨️ Imprimir Ficha" : "🖨️ Imprimir Ficha";

    // 10. Mobile Nav Buttons
    const btnViewPlan = document.querySelector("#btnViewPlan span:last-child");
    if (btnViewPlan) btnViewPlan.innerText = isEn ? "Plan (Levels)" : isEs ? "Plan (Niveles)" : "Plano (Níveis)";

    const btnViewStats = document.querySelector("#btnViewStats span:last-child");
    if (btnViewStats) btnViewStats.innerText = isEn ? "Sheet & Skills" : isEs ? "Ficha y Habilidades" : "Ficha & Perícias";

    const btnViewContent = document.querySelector("#btnViewContent span:last-child");
    if (btnViewContent) btnViewContent.innerText = isEn ? "Actions & Tabs" : isEs ? "Acciones y Pestañas" : "Ações & Abas";

    // 11. Topbar AI Assistant Button
    const btnAIAssistant = document.getElementById("btnAIAssistantTopbar");
    if (btnAIAssistant) {
      btnAIAssistant.innerHTML = `✨ ${isEn ? "AI Assistant (Free)" : isEs ? "Asistente IA (Gratis)" : "Assistente IA (Grátis)"}`;
    }
  }

  async init() {
    await this.loadInitialCharacter();
  }

  async loadInitialCharacter() {
    if (typeof localStorage !== "undefined") {
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
    }
    this.createNewCharacter();
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
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    this.calc = PF2E_ENGINE.calculateCharacterStats(this.character);

    // 0. Static Labels Update across DOM
    this.updateStaticLabels(locale);

    // 1. Top Bar & Tab
    const topTitle = `${this.character.name} - ${this.localizeItemName(this.character.class, locale)} ${this.character.level}`;
    document.getElementById("topCharTitle").innerText = topTitle;
    document.title = `${this.character.name} | Pathbuilder 2e Local`;
    window.dispatchEvent(new Event("pathbuilder:character-render"));

    // 2. Left Tree Nodes (Dynamic 1-20 Level Plan Tree)
    this.renderPlanTree();

    // 3. Middle Stats Column
    document.getElementById("charName").value = this.character.name || "";
    document.getElementById("charLevel").value = this.character.level || 1;
    document.getElementById("charSize").innerText = UI_TRANSLATIONS.sizes[this.calc.size]?.[locale] || this.calc.size || (isEn ? "Medium" : isEs ? "Mediano" : "Médio");
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
      shieldStatus.innerText = isEn ? "Shield Raised (+2 AC)" : isEs ? "Escudo Alzado (+2 CA)" : "Escudo Erguido (+2 CA)";
      shieldBonus.innerText = isEn ? "Lower" : isEs ? "Bajar" : "Abaixar";
      shieldStatus.style.color = "var(--pb-orange)";
    } else {
      shieldStatus.innerText = isEn ? "No Shield (+0)" : isEs ? "Sin Escudo (+0)" : "Sem Escudo (+0)";
      shieldBonus.innerText = isEn ? "Raise" : isEs ? "Alzar" : "Erguer";
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
    const classDcText = isEn ? "Class DC" : isEs ? "CD de Clase" : "CD de Classe";
    document.getElementById("classDcVal").innerText = `${this.calc.classDc} ${classDcText}`;
    document.getElementById("percVal").innerText = PF2E_ENGINE.formatMod(this.calc.perception.total);
    document.getElementById("initVal").innerText = PF2E_ENGINE.formatMod(this.calc.perception.total);

    // Sentidos Especiais
    const sensesContainer = document.getElementById("sensesBadgeList");
    if (sensesContainer) {
      const senses = this.calc.senses || [];
      if (senses.length > 0) {
        sensesContainer.innerHTML = senses.map(s => {
          const locSense = UI_TRANSLATIONS.senses[s]?.[locale] || s;
          return `<span style="background:rgba(59,130,246,0.15); color:var(--pb-blue); padding:1px 6px; border-radius:4px; border:1px solid rgba(59,130,246,0.3);">👁️ ${escapeHtml(locSense)}</span>`;
        }).join("");
      } else {
        const normVision = isEn ? "Normal Vision" : isEs ? "Visión Normal" : "Visão Normal";
        sensesContainer.innerHTML = `<span style="color:var(--pb-text-dim);">${normVision}</span>`;
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
    this.renderFormulasTab();
    this.renderConditions();

    // 6. Auditoria de Prontidão da Ficha (Readiness Badge)
    const readiness = this.calc.readiness || (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.validateCharacterReadiness ? PF2E_ENGINE.validateCharacterReadiness(this.character) : { score: 100, isReady: true });
    const readinessText = document.getElementById("readinessBadgeText");
    const readinessBtn = document.getElementById("readinessBadgeBtn");
    if (readinessText && readinessBtn) {
      const readyLabel = isEn ? "Ready" : isEs ? "Listo" : "Pronto";
      readinessText.innerText = `${readiness.score}% ${readyLabel}`;
      if (readiness.isReady) {
        readinessBtn.style.background = "rgba(34, 197, 94, 0.15)";
        readinessBtn.style.borderColor = "#22c55e";
        readinessBtn.style.color = "#86efac";
      } else {
        readinessBtn.style.background = "rgba(249, 115, 22, 0.15)";
        readinessBtn.style.borderColor = "var(--pb-orange)";
        readinessBtn.style.color = "#fed7aa";
      }
    }
  }

  // RENDERIZAÇÃO DA COLUNA DE PERÍCIAS (EXATAMENTE COMO NO PATHBUILDER)
  renderSkillsColumn() {
    const list = document.getElementById("skillsColList");
    const badge = document.getElementById("trainedSkillsBadge");
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";
    
    const trainedSummary = this.calc.trainedSkills || PF2E_ENGINE.calculateTrainedSkillsCount(this.character);
    if (badge) {
      badge.innerText = `${trainedSummary.selectedSkills.length} / ${trainedSummary.totalAllowed}`;
      badge.title = isEn
        ? `Trained: ${trainedSummary.selectedSkills.length} of ${trainedSummary.totalAllowed} (Class: ${trainedSummary.classBase} + INT: ${PF2E_ENGINE.formatMod(trainedSummary.intMod)})`
        : isEs
        ? `Entrenadas: ${trainedSummary.selectedSkills.length} de ${trainedSummary.totalAllowed} (Clase: ${trainedSummary.classBase} + INT: ${PF2E_ENGINE.formatMod(trainedSummary.intMod)})`
        : `Treinadas: ${trainedSummary.selectedSkills.length} de ${trainedSummary.totalAllowed} (Classe: ${trainedSummary.classBase} + INT: ${PF2E_ENGINE.formatMod(trainedSummary.intMod)})`;
    }

    let html = "";

    // Perícias Oficiais
    PF2E_DATA.skills.forEach(sk => {
      const calcSk = this.calc.skills[sk.id];
      const rankInitial = (calcSk.rank || "Destreinado")[0].toUpperCase();
      const rankClass = rankInitial.toLowerCase();
      const localizedName = UI_TRANSLATIONS.skills[sk.id]?.[locale] || sk.name;
      html += `
        <div class="skill-item-row" onclick="app.rollCheck(${escapeInlineArgument(`${isEn ? 'Skill' : isEs ? 'Habilidad' : 'Perícia'}: ${localizedName}`)}, ${calcSk.total})" title="${isEn ? 'Click to roll d20 + bonus' : 'Clique para rolar d20 com bônus'}">
          <span class="teml-circle ${rankClass}" onclick="event.stopPropagation(); app.cycleSkillRank(${escapeInlineArgument(sk.id)})" title="${isEn ? 'Toggle Proficiency' : 'Alternar Proficiência'}">${rankInitial}</span>
          <span class="skill-roll-val">${PF2E_ENGINE.formatMod(calcSk.total)}</span>
          <span class="skill-name-text">${escapeHtml(localizedName)}</span>
        </div>
      `;
    });

    // Perícias de Lore (Conhecimento / Saberes)
    const lorePrefix = isEn ? "Lore: " : isEs ? "Saber: " : "Saber: ";
    (this.calc.loreSkills || []).forEach((l, idx) => {
      const rankInitial = (l.rank || "Treinado")[0].toUpperCase();
      const locLoreName = this.localizeItemName(l.name, locale);
      html += `
        <div class="skill-item-row" style="background: rgba(249, 115, 22, 0.05);" onclick="app.rollCheck(${escapeInlineArgument(`${lorePrefix}${locLoreName}`)}, ${l.total})">
          <span class="teml-circle t">${rankInitial}</span>
          <span class="skill-roll-val">${PF2E_ENGINE.formatMod(l.total)}</span>
          <span class="skill-name-text">${lorePrefix}${escapeHtml(locLoreName)}</span>
          <span onclick="event.stopPropagation(); app.removeLoreSkill(${idx})" style="color:var(--pb-text-dim); font-size:10px;">✕</span>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  // ABA DE ARMAS
  renderWeaponsTab() {
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";
    const container = document.getElementById("weaponsList");
    if (!this.calc.strikes || this.calc.strikes.length === 0) {
      container.innerHTML = `<div style="color:var(--pb-text-muted); text-align:center; padding:30px;">${isEn ? "No weapon equipped. Click 'Add Weapon' to choose from the compendium!" : isEs ? "¡Ninguna arma equipada. Haz clic en 'Añadir Arma' para elegir en el compendio!" : "Nenhuma arma equipada. Clique em 'Adicionar Arma' para escolher no compêndio!"}</div>`;
      return;
    }

    const catMap = {
      "Simples": isEn ? "Simple" : isEs ? "Simple" : "Simples",
      "Marcial": isEn ? "Martial" : isEs ? "Marcial" : "Marcial",
      "Avançada": isEn ? "Advanced" : isEs ? "Avanzada" : "Avançada",
      "Desarmado": isEn ? "Unarmed" : isEs ? "Desarmado" : "Desarmado"
    };

    container.innerHTML = this.calc.strikes.map((s, idx) => {
      const locName = this.localizeItemName(s.name, locale);
      const locCategory = catMap[s.category] || s.category;
      const traitsHtml = (s.traits || []).map(t => `<span class="trait-tag">${escapeHtml(this.localizeTrait(t, locale))}</span>`).join('');
      const atkLabel = isEn ? "Attack (MAP):" : isEs ? "Ataque (MAP):" : "Ataque (MAP):";
      const dmgLabel = isEn ? "💥 Damage:" : isEs ? "💥 Daño:" : "💥 Dano:";
      const firstAtk = isEn ? "1st Attack" : isEs ? "1º Ataque" : "1º Ataque";
      const secondAtk = isEn ? "2nd Attack MAP" : isEs ? "2º Ataque MAP" : "2º Ataque MAP";
      const thirdAtk = isEn ? "3rd Attack MAP" : isEs ? "3º Ataque MAP" : "3º Ataque MAP";

      return `
        <div class="strike-card" style="border-left-color: var(--pb-orange); background: var(--pb-bg-panel);">
          <div class="strike-header">
             <div style="font-weight:bold; font-size:14px; color:#fff;">🗡️ ${escapeHtml(locName)} <span style="font-size:11px; color:var(--pb-text-muted);">(${escapeHtml(locCategory)})</span></div>
            <button onclick="app.removeWeapon(${idx})" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer;">🗑️</button>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin: 6px 0;">
            <div class="map-buttons-row">
              <span style="font-size:11px; color:var(--pb-text-muted);">${atkLabel}</span>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${locName} [${firstAtk}]`)}, ${s.map[0]})">${PF2E_ENGINE.formatMod(s.map[0])}</button>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${locName} [${secondAtk}]`)}, ${s.map[1]})">${PF2E_ENGINE.formatMod(s.map[1])}</button>
               <button class="btn-strike-roll" onclick="app.rollStrike(${escapeInlineArgument(`${locName} [${thirdAtk}]`)}, ${s.map[2]})">${PF2E_ENGINE.formatMod(s.map[2])}</button>
            </div>

             <button class="strike-damage-box" onclick="app.rollDamage(${escapeInlineArgument(locName)}, ${escapeInlineArgument(s.damageFormatted)})">
               ${dmgLabel} ${escapeHtml(s.damageFormatted)}
            </button>
          </div>

          <div class="traits-row">${traitsHtml}</div>
        </div>
      `;
    }).join('');
  }

  // ABA DE DEFESA (SCREENSHOT 1)
  renderDefenseTab() {
    const d = document.getElementById("defenseDetails");
    if (!d) return;
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const arm = this.character.equippedArmor || { name: isEn ? "Unarmored" : "Sem Armadura", acBonus: 0, dexCap: 5 };
    const shield = this.character.equippedShield || null;
    const dexMod = this.calc?.attributes?.dex?.mod || 0;
    const effectiveDex = arm.dexCap !== undefined ? Math.min(dexMod, arm.dexCap) : dexMod;
    const profBonus = (this.character.level || 1) + 2;

    const locArmorName = this.localizeItemName(arm.name, locale);
    const locShieldName = shield ? this.localizeItemName(shield.name, locale) : (isEn ? "No Shield" : isEs ? "Sin Escudo" : "Sem Escudo");

    d.innerHTML = `
      <div class="pb-defense-header-bar">
        <div class="pb-defense-profs-row">
          <div class="pb-defense-prof-item"><span class="picker-prof-badge t">T</span> ${isEn ? "Light Armor" : isEs ? "Armadura Ligera" : "Armadura Leve"}</div>
          <div class="pb-defense-prof-item"><span class="picker-prof-badge u">U</span> ${isEn ? "Medium Armor" : isEs ? "Armadura Intermedia" : "Armadura Média"}</div>
          <div class="pb-defense-prof-item"><span class="picker-prof-badge u">U</span> ${isEn ? "Heavy Armor" : isEs ? "Armadura Pesada" : "Armadura Pesada"}</div>
          <div class="pb-defense-prof-item"><span class="picker-prof-badge t">T</span> ${isEn ? "Unarmored" : isEs ? "Sin Armadura" : "Sem Armadura"}</div>
        </div>
        <div class="pb-defense-ac-breakdown">
          <span>${isEn ? "Base" : "Base"} <strong>10</strong></span>
          <span>${isEn ? "Item" : "Item"} <strong>+${arm.acBonus || 0}</strong></span>
          <span>${isEn ? "Dex" : "Des"} <strong>+${effectiveDex}</strong></span>
          <span>${isEn ? "Proficiency" : isEs ? "Competencia" : "Proficiência"} <strong>+${profBonus}</strong></span>
        </div>
        <div class="pb-defense-actions-row">
          <button class="pb-defense-btn" onclick="app.openPicker('armor')">${isEn ? "Stow Additional Armor" : isEs ? "Guardar Armadura Adicional" : "Guardar Armadura Adicional"}</button>
          <button class="pb-defense-btn" onclick="app.openPicker('shield')">${isEn ? "Stow Additional Shield" : isEs ? "Guardar Escudo Adicional" : "Guardar Escudo Adicional"}</button>
          <button class="pb-defense-btn" onclick="app.printOfficialPdf()">${isEn ? "Print" : isEs ? "Imprimir" : "Imprimir"}</button>
        </div>
      </div>

      <!-- EQUIPPED ARMOR CARD -->
      <div class="pb-defense-slot-card">
        <div class="pb-defense-slot-actions">
          <button class="pb-slot-btn" onclick="app.openPicker('armor')">${isEn ? "Change" : isEs ? "Cambiar" : "Trocar"}</button>
          <button class="pb-slot-btn" onclick="alert('${isEn ? "Armor Options" : "Opções de Armadura"}: ' + (app.character.equippedArmor?.name || 'Unarmored'))">${isEn ? "Options" : isEs ? "Opciones" : "Opções"}</button>
          <button class="pb-slot-btn" onclick="alert('${isEn ? "Armor Runes: None etched." : "Runas de Armadura: Nenhuma runa gravada."}')">${isEn ? "Runes" : isEs ? "Runas" : "Runas"}</button>
          <button class="pb-slot-btn" onclick="app.stowArmor()">${isEn ? "Stow" : isEs ? "Guardar" : "Guardar"}</button>
        </div>
        <div class="pb-defense-slot-content">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="picker-prof-badge t">T</span>
            <span style="font-size:15px; color:#ffffff; font-weight:800;">${escapeHtml(locArmorName)}</span>
          </div>
          <div style="color: #94a3b8; font-size:13px;">
            👕 ${isEn ? "Item Bonus" : isEs ? "Bonificador de Objeto" : "Bônus de Item"} +${arm.acBonus || 0}
          </div>
          <div style="color: #94a3b8; font-size:13px;">
            ⬆️ ${isEn ? "Dex Cap" : isEs ? "Límite de Des" : "Limite de Des"} ${arm.dexCap !== undefined ? arm.dexCap : 5}
          </div>
        </div>
      </div>

      <!-- EQUIPPED SHIELD CARD -->
      <div class="pb-defense-slot-card">
        <div class="pb-defense-slot-actions">
          <button class="pb-slot-btn" onclick="app.openPicker('shield')">${isEn ? "Change" : isEs ? "Cambiar" : "Trocar"}</button>
          ${shield ? `<button class="pb-slot-btn" onclick="app.stowShield()">${isEn ? "Stow" : isEs ? "Guardar" : "Guardar"}</button>` : ''}
        </div>
        <div class="pb-defense-slot-content">
          ${shield ? `
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="picker-prof-badge t">T</span>
              <span style="font-size:15px; color:#ffffff; font-weight:800;">${escapeHtml(locShieldName)}</span>
            </div>
            <div style="color: #94a3b8; font-size:13px;">
              🛡️ ${isEn ? "Hardness" : isEs ? "Dureza" : "Dureza"} ${shield.hardness || 3}
            </div>
            <div style="color: #94a3b8; font-size:13px;">
              💚 ${isEn ? "Max HP" : isEs ? "PG Máx" : "PV Máx"} ${shield.maxHp || 12} (${isEn ? "BT" : isEs ? "LCR" : "LQ"} ${shield.bt || 6})
            </div>
            <div style="color: #38bdf8; font-size:13px; font-weight:800;">
              +${shield.acBonus || 2} ${isEn ? "AC (Raise Shield)" : isEs ? "CA (Alzar Escudo)" : "CA (Erguer Escudo)"}
            </div>
          ` : `
            <div style="color: #94a3b8; font-size:14px; font-weight:700;">${isEn ? "No Shield" : isEs ? "Sin Escudo" : "Sem Escudo"}</div>
          `}
        </div>
      </div>
    `;
  }

  stowArmor() {
    this.character.equippedArmor = { name: "Unarmored", acBonus: 0, dexCap: 5 };
    this.renderAll();
  }

  stowShield() {
    this.character.equippedShield = null;
    this.renderAll();
  }

  // ABA DE EQUIPAMENTOS (SCREENSHOT 4)
  renderGearTab() {
    const list = document.getElementById("gearList");
    if (!list) return;
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const inv = this.character.inventory || [];
    const coins = this.character.coins || { pp: 0, gp: 1, sp: 5, cp: 0 };
    
    const totalBulk = this.calc?.bulk?.total ?? 2;
    const encumberedLimit = this.calc?.bulk?.encumbered ?? 5;
    const maxBulk = this.calc?.bulk?.max ?? 10;
    const isEncumbered = this.calc?.bulk?.isEncumbered ?? false;

    const itemsGridHtml = inv.length === 0 ? `
      <div style="grid-column: 1 / -1; color:#64748b; text-align:center; padding: 24px;">${isEn ? "No items in inventory. Click 'Add Gear' to purchase or add gear." : isEs ? "No hay objetos en el inventario. Haz clic en 'Añadir Equipo' para comprar o añadir equipo." : "Nenhum item no inventário. Clique em 'Add Gear' para comprar ou adicionar itens."}</div>
    ` : inv.map((item, idx) => {
      const locItemName = this.localizeItemName(item.name, locale);
      return `
        <div class="pb-gear-item-box">
          <button class="pb-gear-qty-btn" onclick="app.adjustItemQty(${idx}, -1)" title="${isEn ? "Decrease quantity" : "Diminuir quantidade"}">-</button>
          <span class="pb-gear-qty-text">${isEn ? "Qty" : isEs ? "Cant" : "Qtd"} ${item.qty || 1}</span>
          <button class="pb-gear-qty-btn" onclick="app.adjustItemQty(${idx}, 1)" title="${isEn ? "Increase quantity" : "Aumentar quantidade"}>+</button>
          <span class="pb-gear-name-text" title="${escapeHtml(locItemName)}">${escapeHtml(locItemName)}</span>
          <button class="pb-gear-remove-btn" onclick="app.removeInventoryItem(${idx})" title="${isEn ? "Remove item" : "Remover item"}">✕</button>
        </div>
      `;
    }).join('');

    list.innerHTML = `
      <div class="pb-gear-top-bar">
        <div class="pb-gear-coins-pillbox">
          <div class="pb-gear-coin-item" onclick="app.promptEditCoin('pp')" style="cursor:pointer;" title="${isEn ? "Click to edit" : "Clique para editar"}"><span class="coin-dot pp"></span> ${isEn ? "Platinum" : isEs ? "Platino" : "Platina"} ${coins.pp || 0}</div>
          <div class="pb-gear-coin-item" onclick="app.promptEditCoin('gp')" style="cursor:pointer;" title="${isEn ? "Click to edit" : "Clique para editar"}"><span class="coin-dot gp"></span> ${isEn ? "Gold" : isEs ? "Oro" : "Ouro"} ${coins.gp || 0}</div>
          <div class="pb-gear-coin-item" onclick="app.promptEditCoin('sp')" style="cursor:pointer;" title="${isEn ? "Click to edit" : "Clique para editar"}"><span class="coin-dot sp"></span> ${isEn ? "Silver" : isEs ? "Plata" : "Prata"} ${coins.sp || 0}</div>
          <div class="pb-gear-coin-item" onclick="app.promptEditCoin('cp')" style="cursor:pointer;" title="${isEn ? "Click to edit" : "Clique para editar"}"><span class="coin-dot cp"></span> ${isEn ? "Copper" : isEs ? "Cobre" : "Cobre"} ${coins.cp || 0}</div>
        </div>
        <div class="pb-gear-bulk-status">
          ${isEn ? "Total Bulk" : isEs ? "Volumen Total" : "Carga Total"} <strong>${totalBulk}</strong> ${isEncumbered ? `<span style="color:#ef4444; font-weight:900;">${isEn ? "Encumbered" : isEs ? "Sobrecargado" : "Sobrecarregado"}</span>` : (isEn ? "Unencumbered" : isEs ? "Sin Sobrecarga" : "Desimpedido")} (${isEn ? "Enc" : "Sob"}: ${encumberedLimit}; Max: ${maxBulk})
        </div>
        <div class="pb-gear-actions-bar">
          <button class="pb-defense-btn" onclick="app.openPicker('gear')">${isEn ? "Add Gear" : isEs ? "Añadir Equipo" : "Adicionar Item"}</button>
          <button class="pb-defense-btn" onclick="app.addContainerPrompt()">${isEn ? "Add Container" : isEs ? "Añadir Contenedor" : "Adicionar Recipiente"}</button>
          <button class="pb-defense-btn" onclick="app.openPicker('formula')">${isEn ? "Add Formula" : isEs ? "Añadir Fórmula" : "Adicionar Fórmula"}</button>
          <button class="pb-defense-btn" onclick="app.printOfficialPdf()">${isEn ? "Print" : isEs ? "Imprimir" : "Imprimir"}</button>
        </div>
      </div>

      <!-- MAIN INVENTORY SECTION -->
      <div class="pb-inventory-section">
        <div class="pb-inventory-section-title">
          <span>${isEn ? "Main Inventory" : isEs ? "Inventario Principal" : "Inventário Principal"}</span>
        </div>
        <div class="pb-inventory-grid">
          ${itemsGridHtml}
        </div>
      </div>

      <!-- CONTAINERS SECTIONS -->
      <div class="pb-inventory-section">
        <div class="pb-inventory-section-title">
          <span>${isEn ? "Unnamed Container" : isEs ? "Contenedor Sin Nombre" : "Recipiente Sem Nome"}</span>
          <button class="pb-slot-btn" onclick="alert('${isEn ? "Edit Container" : "Editar Recipiente"}')">${isEn ? "Edit" : isEs ? "Editar" : "Editar"}</button>
        </div>
        <div style="font-size:12px; color:#64748b; font-style:italic;">${isEn ? "Empty" : isEs ? "Vacío" : "Vazio"}</div>
      </div>
    `;
  }

  adjustItemQty(idx, delta) {
    if (!this.character.inventory || !this.character.inventory[idx]) return;
    const item = this.character.inventory[idx];
    item.qty = (item.qty || 1) + delta;
    if (item.qty <= 0) {
      this.character.inventory.splice(idx, 1);
    }
    this.renderAll();
  }

  removeInventoryItem(idx) {
    if (this.character.inventory && this.character.inventory[idx]) {
      this.character.inventory.splice(idx, 1);
      this.renderAll();
    }
  }

  promptEditCoin(coinKey) {
    const names = { pp: "Platina (PP)", gp: "Ouro (GP)", sp: "Prata (SP)", cp: "Cobre (CP)" };
    const current = this.character.coins?.[coinKey] || 0;
    const input = prompt(`Definir quantidade de moedas de ${names[coinKey]}:`, current);
    if (input !== null) {
      const val = Math.max(0, parseInt(input, 10) || 0);
      if (!this.character.coins) this.character.coins = { pp: 0, gp: 0, sp: 0, cp: 0 };
      this.character.coins[coinKey] = val;
      this.renderAll();
    }
  }

  addContainerPrompt() {
    const name = prompt("Nome do novo recipiente/container (ex: Mochila de Carga, Coldre):", "Mochila de Aventureiro");
    if (name) {
      if (!this.character.containers) this.character.containers = [];
      this.character.containers.push({ name, items: [] });
      this.renderAll();
    }
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

    const spellcasting = this.calc.spellcasting || (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.calculateSpellcasting ? PF2E_ENGINE.calculateSpellcasting(this.character) : { dc: this.calc.classDc, attackMod: this.calc.classDc - 10, traditionName: "Arcana", maxFocusPoints: 1, currentFocusPoints: 1 });

    const dcEl = document.getElementById("spellDcText");
    const atkEl = document.getElementById("spellAtkText");
    const tradBadge = document.getElementById("spellTraditionBadge");
    const focusDisp = document.getElementById("focusPointsDisplay");

    if (dcEl) dcEl.innerText = spellcasting.dc || this.calc.classDc;
    if (atkEl) atkEl.innerText = PF2E_ENGINE.formatMod(spellcasting.attackMod !== undefined ? spellcasting.attackMod : (this.calc.classDc - 10));
    if (tradBadge) tradBadge.innerText = spellcasting.traditionName || "Arcana";
    if (focusDisp) {
      const maxF = spellcasting.maxFocusPoints || 1;
      const curF = Math.min(maxF, spellcasting.currentFocusPoints !== undefined ? spellcasting.currentFocusPoints : maxF);
      focusDisp.innerText = "●".repeat(curF) + "○".repeat(Math.max(0, maxF - curF));
    }

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
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const pets = this.character.pets || (this.character.id === "Joao_Ranger" ? [{
      name: "Bóreas — O Bode Negro das Montanhas",
      type: isEn ? "Animal Companion • Mountain Ram" : isEs ? "Compañero Animal • Carnero Montés" : "Companheiro Animal • Carneiro Montês",
      hpMax: 18,
      hpCurrent: 18,
      ac: 16,
      speed: "35ft",
      perception: "+5",
      attacks: [{ name: isEn ? "War Horns" : isEs ? "Cornada de Guerra" : "Chifrada de Guerra", bonus: "+6", damage: isEn ? "1d6+3 Bludgeoning [Shove]" : "1d6+3 Impacto [Empurrão]" }],
      supportBenefit: isEn ? "Leaves opponent Off-Guard (-2 AC) against attacks." : "Deixa o oponente Desprevenido (-2 CA) contra as flechas de João.",
      commandAction: isEn ? "Grants 2 actions to move and strike." : "Concede 2 ações para Bóreas se mover e chifrar."
    }] : []);

    const petCardsHtml = pets.length === 0 ? `
      <div style="color:var(--pb-text-muted); text-align:center; padding:30px;">
        <p>${isEn ? "No animal companion or familiar associated." : isEs ? "Ninguna mascota o compañero animal asociado." : "Nenhum mascote ou companheiro animal associado."}</p>
        <button class="btn-pb-action" onclick="app.openAddPetModal()" style="margin-top:10px;">➕ ${isEn ? "Add Companion / Familiar / Mount" : isEs ? "Añadir Compañero / Familiar / Montura" : "Adicionar Companheiro / Familiar / Montaria"}</button>
      </div>
    ` : `
      <div style="margin-bottom:12px; display:flex; justify-content:flex-end;">
        <button class="btn-pb-action" onclick="app.openAddPetModal()">➕ ${isEn ? "Add Another Pet" : isEs ? "Añadir Otra Mascota" : "Adicionar Outro Mascote"}</button>
      </div>
      ${pets.map((pet, idx) => `
        <div class="strike-card" style="border-left-color: var(--pb-orange); background: var(--pb-bg-panel); margin-bottom:12px;">
          <div class="strike-header">
            <div style="font-weight:bold; color:var(--pb-orange); font-size:15px;">🐾 ${escapeHtml(this.localizeItemName(pet.name, locale))}</div>
            <button onclick="app.removePet(${idx})" title="${isEn ? "Remove Pet" : "Remover Mascote"}" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer; font-size:14px;">🗑️</button>
          </div>
          <div style="font-size:11px; color:var(--pb-text-muted); margin-bottom:8px;">${escapeHtml(pet.type || (isEn ? "Companion" : "Companheiro"))}</div>
          <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:6px; margin-bottom:10px;">
            <div class="vital-box">
              <span class="vital-label">${isEn ? "HP" : isEs ? "PG" : "PV"}</span>
              <span class="vital-value" style="color:var(--hp-green);">${escapeHtml(pet.hpCurrent !== undefined ? pet.hpCurrent : pet.hpMax)} / ${escapeHtml(pet.hpMax || 16)}</span>
            </div>
            <div class="vital-box"><span class="vital-label">${isEn ? "AC" : "CA"}</span><span class="vital-value" style="color:#60a5fa;">${escapeHtml(pet.ac || 16)}</span></div>
            <div class="vital-box"><span class="vital-label">${isEn ? "Speed" : isEs ? "Velocidad" : "Velocidade"}</span><span class="vital-value">${escapeHtml(pet.speed || "35ft")}</span></div>
            <div class="vital-box"><span class="vital-label">${isEn ? "Perception" : isEs ? "Percepción" : "Percepção"}</span><span class="vital-value">${escapeHtml(pet.perception || "+5")}</span></div>
          </div>
          <div style="font-size:12px; line-height:1.6;">
            ${(pet.attacks || []).map(atk => `• <strong>${isEn ? "Attack" : isEs ? "Ataque" : "Ataque"} ${escapeHtml(atk.name)}:</strong> ${escapeHtml(atk.bonus)} | <strong>${escapeHtml(atk.damage)}</strong>.<br>`).join('')}
            ${pet.supportBenefit ? `• <strong>${isEn ? "Support Benefit:" : isEs ? "Beneficio de Soporte:" : "Benefício de Suporte:"}</strong> ${escapeHtml(pet.supportBenefit)}<br>` : ''}
            ${pet.commandAction ? `• <strong>${isEn ? "Command Animal [1 Action]:" : isEs ? "Comandar Animal [1 Acción]:" : "Comandar Animal [1 Ação]:"}</strong> ${escapeHtml(pet.commandAction)}` : ''}
          </div>
        </div>
      `).join('')}
    `;

    p.innerHTML = petCardsHtml;
  }

  openAddPetModal() {
    const presets = [
      { name: "Lobo (Wolf)", type: "Companheiro Animal", hpMax: 18, ac: 16, speed: "40ft", perception: "+6", attacks: [{ name: "Mandíbulas", bonus: "+6", damage: "1d8+2 Perfuração [Derrubar]" }], supportBenefit: "Deixa inimigos Desprevenidos (-2 CA).", commandAction: "Concede 2 ações para se mover e morder." },
      { name: "Urso (Bear)", type: "Companheiro Animal", hpMax: 20, ac: 15, speed: "35ft", perception: "+5", attacks: [{ name: "Mandíbulas", bonus: "+6", damage: "1d8+3 Perfuração" }, { name: "Garras", bonus: "+6", damage: "1d6+3 Corte [Ágil]" }], supportBenefit: "Causa +1d8 de dano de corte com seus ataques.", commandAction: "Concede 2 ações para se mover e golpear." },
      { name: "Cavalo de Guerra (Horse)", type: "Montaria / Companheiro Animal", hpMax: 20, ac: 15, speed: "40ft", perception: "+5", attacks: [{ name: "Cascos", bonus: "+6", damage: "1d6+3 Impacto" }], supportBenefit: "+2 de dano de circunstância em ataques montados.", commandAction: "Concede 2 ações para avançar galopando." },
      { name: "Ave de Rapina / Falcão", type: "Companheiro Animal", hpMax: 14, ac: 17, speed: "10ft (Voo 60ft)", perception: "+7", attacks: [{ name: "Garras / Bico", bonus: "+7", damage: "1d6+1 Corte [Finesse]" }], supportBenefit: "Deixa o alvo Deslumbrado (Dazzled).", commandAction: "Mergulha em voo e ataca." },
      { name: "Familiar Místico", type: "Familiar", hpMax: 10, ac: 15, speed: "25ft", perception: "+5", attacks: [], supportBenefit: "Concede habilidades de mestre e entrega magias de toque.", commandAction: "Comanda o familiar a se posicionar ou entregar feitiço." }
    ];
    const choice = prompt(`Escolha o Mascote / Companheiro:\n1. Lobo (Wolf)\n2. Urso (Bear)\n3. Cavalo de Guerra (Horse)\n4. Ave de Rapina (Falcon)\n5. Familiar Místico\n(Digite o número de 1 a 5 ou nome personalizado):`, "1");
    if (!choice) return;
    let selected = presets[parseInt(choice, 10) - 1];
    if (!selected) {
      selected = { name: choice, type: "Mascote Personalizado", hpMax: 16, ac: 15, speed: "30ft", perception: "+5", attacks: [{ name: "Ataque", bonus: "+5", damage: "1d6+2" }], supportBenefit: "Apoio tático em combate.", commandAction: "Comandar criatura." };
    }
    if (!this.character.pets) this.character.pets = [];
    this.character.pets.push(selected);
    this.renderAll();
  }

  removePet(idx) {
    if (this.character.pets) {
      this.character.pets.splice(idx, 1);
      this.renderAll();
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
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    list.innerHTML = feats.length === 0 ? `<div style="color:var(--pb-text-muted); text-align:center; padding:20px;">${isEn ? "No feats selected. Choose feats in the evolution tree or compendium." : isEs ? "No hay dotes seleccionadas. Elige dotes en el árbol de evolución o en el compendio." : "Nenhum talento selecionado. Escolha talentos na árvore de evolução ou no Compêndio."}</div>` : feats.map((f, idx) => {
      const locName = this.localizeItemName(f.name, locale);
      return `
        <div class="strike-card" style="border-left-color: var(--pb-teml-e);">
          <div class="strike-header">
            <span style="font-weight:bold; color:var(--pb-orange);">${escapeHtml(locName)} <span class="trait-tag">${escapeHtml(f.type || f.category || (isEn ? "Feat" : isEs ? "Dote" : "Talento"))}</span></span>
            <button onclick="app.removeFeat(${idx})" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer;">🗑️</button>
          </div>
          <div style="font-size:12px; color:var(--pb-text); margin-top:4px;">${escapeHtml(f.description || "")}</div>
        </div>
      `;
    }).join('');
  }

  // ABA DE AÇÕES
  renderActionsTab() {
    const list = document.getElementById("actionsFullList");
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const defaultActions = [
      { name: isEn ? "Strike" : isEs ? "Golpear (Strike)" : "Golpear (Strike)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Make a melee or ranged attack with your weapon." : "Desfere um ataque corpo a corpo ou à distância com sua arma.", type: isEn ? "Basic" : "Básica" },
      { name: isEn ? "Stride" : isEs ? "Zancada (Stride)" : "Movimentar-se (Stride)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Move up to your Speed." : "Move-se até sua Velocidade em terra.", type: isEn ? "Basic" : "Básica" },
      { name: isEn ? "Step" : isEs ? "Paso (Step)" : "Passo de Ajuste (Step)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Carefully move 5 feet without triggering reactions." : "Move-se 5 pés sem provocar reações como Golpe Reativo.", type: isEn ? "Basic" : "Básica" },
      { name: isEn ? "Raise a Shield" : isEs ? "Alzar Escudo (Raise a Shield)" : "Erguer Escudo (Raise a Shield)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Gain a +2 circumstance bonus to AC until the start of your next turn." : "Concede +2 na CA de circunstância até o início do próximo turno.", type: isEn ? "Basic" : "Básica" },
      { name: isEn ? "Take Cover" : isEs ? "Ponerse a Cubierto (Take Cover)" : "Buscar Cobertura (Take Cover)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Gain or improve cover bonus to AC and Reflex saves." : "Melhora o bônus de cobertura para +2 ou +4 na CA e salvamentos de Reflexos.", type: isEn ? "Basic" : "Básica" },
      { name: isEn ? "Demoralize" : isEs ? "Desmoralizar (Demoralize)" : "Desmoralizar (Demoralize)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Intimidation vs Will to make target Frightened 1." : "Teste de Intimidação vs Vontade para deixar o alvo Aterrorizado 1.", type: isEn ? "Skill" : "Perícia" },
      { name: isEn ? "Trip" : isEs ? "Derribar (Trip)" : "Derrubar (Trip)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Athletics vs Reflex to knock opponent Prone." : "Teste de Atletismo vs Reflexos para derrubar o oponente Caído no chão.", type: isEn ? "Skill" : "Perícia" },
      { name: isEn ? "Grapple" : isEs ? "Agarrar (Grapple)" : "Agarrar (Grapple)", cost: isEn ? "1 Action" : isEs ? "1 Acción" : "1 Ação", desc: isEn ? "Athletics vs Fortitude to immobilize opponent." : "Teste de Atletismo vs Fortitude para imobilizar o oponente.", type: isEn ? "Skill" : "Perícia" },
      { name: isEn ? "Treat Wounds" : isEs ? "Tratar Heridas (Treat Wounds)" : "Tratar Ferimentos (Treat Wounds)", cost: isEn ? "10 Minutes" : isEs ? "10 Minutos" : "10 Minutos", desc: isEn ? "Medicine out of combat to heal HP." : "Medicina fora de combate para curar grandes quantias de PV.", type: isEn ? "Exploration" : "Exploração" }
    ];
    const customActions = (this.character.classFeatures || []).concat(this.character.feats || []).map(a => ({
      name: this.localizeItemName(a.name, locale),
      cost: a.actions ? `${a.actions} ${isEn ? "Action(s)" : "Ação(ões)"}` : (isEn ? "Special" : "Especial"),
      desc: a.description || "",
      type: isEn ? "Class / Feat" : "Classe / Talento"
    }));
    const allActions = defaultActions.concat(customActions);

    list.innerHTML = allActions.map(act => `
      <div class="strike-card" style="border-left-color: var(--pb-orange); margin-bottom:8px;">
        <div class="strike-header">
          <div style="font-weight:bold; color:var(--pb-orange); font-size:13px;">${escapeHtml(act.name)}</div>
          <span class="trait-tag" style="background:#451a03; color:#fdba74; border-color:#78350f;">${escapeHtml(act.cost || (isEn ? "1 Action" : "1 Ação"))}</span>
        </div>
        <div style="font-size:12px; color:var(--pb-text); margin-top:4px;">${escapeHtml(act.desc || "")}</div>
      </div>
    `).join('');
  }

  // ABA DE DETALHES (DETAILS - EXACT PATHBUILDER 2E)
  renderDetailsTab() {
    if (!this.character) return;
    
    // 1. Avatar Preview
    const avatarPreview = document.getElementById("detailsAvatarPreview");
    const clearBtn = document.getElementById("detailsAvatarClearBtn");
    if (avatarPreview) {
      if (this.character.avatar && this.character.avatar.trim()) {
        avatarPreview.innerHTML = `<img src="${this.character.avatar}" class="pb-details-avatar-img" alt="Avatar" />`;
        if (clearBtn) clearBtn.style.display = "flex";
      } else {
        avatarPreview.innerHTML = `
          <svg viewBox="0 0 24 24" width="76" height="76" fill="#9ca3af">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        `;
        if (clearBtn) clearBtn.style.display = "none";
      }
    }

    // 2. Deity Display
    const deityDisplay = document.getElementById("detailsDeityDisplay");
    if (deityDisplay) {
      deityDisplay.textContent = this.character.deity || (this.getLocale() === "en" ? "Not set" : "Não definida");
    }

    // 3. Age & Gender Inputs
    const ageInput = document.getElementById("detailsAgeInput");
    if (ageInput && document.activeElement !== ageInput) {
      ageInput.value = this.character.age !== undefined && this.character.age !== null ? this.character.age : 17;
    }

    const genderInput = document.getElementById("detailsGenderInput");
    if (genderInput && document.activeElement !== genderInput) {
      genderInput.value = this.character.gender || "Masculino";
    }

    // 4. Languages Display
    const langDisplay = document.getElementById("detailsLanguagesDisplay");
    if (langDisplay) {
      const langs = this.character.languages;
      if (Array.isArray(langs) && langs.length > 0) {
        langDisplay.textContent = langs.join(", ");
      } else if (typeof langs === "string" && langs.trim().length > 0) {
        langDisplay.textContent = langs;
      } else {
        langDisplay.textContent = this.getLocale() === "en" ? "None selected" : "Nenhum selecionado";
      }
    }

    // 5. Notes Textarea
    const notesArea = document.getElementById("detailsNotesTextarea");
    if (notesArea && document.activeElement !== notesArea) {
      notesArea.value = this.character.notes || this.character.backstory || "";
    }

    // 6. GM Sync
    const detGmEmail = document.getElementById("detGmEmail");
    const detGmStatus = document.getElementById("detGmStatus");
    if (detGmEmail && document.activeElement !== detGmEmail) {
      detGmEmail.value = this.character.gmEmail || this.character.gm_email || "";
    }
    if (detGmStatus) {
      const email = this.character.gmEmail || this.character.gm_email;
      if (email && email.trim()) {
        detGmStatus.innerHTML = `✓ Vinculado ao Mestre: <strong>${escapeHtml(email.trim())}</strong>`;
      } else {
        detGmStatus.innerText = "Sem mestre vinculado";
      }
    }
  }

  openAvatarModal(defaultTab = 'ai') {
    const overlay = document.getElementById("modalAvatarOverlay");
    if (overlay) {
      overlay.classList.add("active");
      this.switchAvatarTab(defaultTab);
      const promptInput = document.getElementById("aiPortraitPromptInput");
      if (promptInput && (!promptInput.value || promptInput.value.trim() === "")) {
        this.refreshAIPortraitPrompt();
      }
    }
  }

  switchAvatarTab(tabName) {
    const panelAI = document.getElementById("avatarPanelAI");
    const panelManual = document.getElementById("avatarPanelManual");
    const tabBtnAI = document.getElementById("tabBtnAvatarAI");
    const tabBtnManual = document.getElementById("tabBtnAvatarManual");

    if (tabName === 'ai') {
      if (panelAI) panelAI.style.display = "flex";
      if (panelManual) panelManual.style.display = "none";
      if (tabBtnAI) {
        tabBtnAI.style.background = "rgba(249, 115, 22, 0.15)";
        tabBtnAI.style.borderColor = "var(--pb-orange)";
        tabBtnAI.style.color = "#fed7aa";
      }
      if (tabBtnManual) {
        tabBtnManual.style.background = "#0e1626";
        tabBtnManual.style.borderColor = "#1e293b";
        tabBtnManual.style.color = "#94a3b8";
      }
    } else {
      if (panelAI) panelAI.style.display = "none";
      if (panelManual) panelManual.style.display = "flex";
      if (tabBtnAI) {
        tabBtnAI.style.background = "#0e1626";
        tabBtnAI.style.borderColor = "#1e293b";
        tabBtnAI.style.color = "#94a3b8";
      }
      if (tabBtnManual) {
        tabBtnManual.style.background = "rgba(249, 115, 22, 0.15)";
        tabBtnManual.style.borderColor = "var(--pb-orange)";
        tabBtnManual.style.color = "#fed7aa";
      }
    }
  }

  refreshAIPortraitPrompt() {
    if (typeof PF2E_AI_ASSISTANT === "undefined" || !PF2E_AI_ASSISTANT.buildPortraitPrompt) return;
    const styleSelect = document.getElementById("aiPortraitStyleSelect");
    const styleKey = styleSelect ? styleSelect.value : "pf2e_official";
    const extraInput = document.getElementById("aiPortraitExtraDetails");
    const extraDetails = extraInput ? extraInput.value.trim() : "";
    
    const prompt = PF2E_AI_ASSISTANT.buildPortraitPrompt(this.character, styleKey, extraDetails);
    const promptInput = document.getElementById("aiPortraitPromptInput");
    if (promptInput) {
      promptInput.value = prompt;
    }
  }

  generateAIPortrait(customSeed = null) {
    const promptInput = document.getElementById("aiPortraitPromptInput");
    let prompt = promptInput ? promptInput.value.trim() : "";
    if (!prompt) {
      this.refreshAIPortraitPrompt();
      prompt = promptInput ? promptInput.value.trim() : "";
    }

    if (!prompt) {
      alert("Por favor, digite ou gere uma descrição para o retrato.");
      return;
    }

    const resultArea = document.getElementById("aiPortraitResultArea");
    const spinner = document.getElementById("aiPortraitLoadingSpinner");
    const imgContainer = document.getElementById("aiPortraitImageContainer");
    const previewImg = document.getElementById("aiPortraitPreviewImg");
    const btnGenerate = document.getElementById("btnGenerateAIPortrait");
    const btnText = document.getElementById("btnGenerateAIPortraitText");

    if (resultArea) resultArea.style.display = "flex";
    if (spinner) spinner.style.display = "flex";
    if (imgContainer) imgContainer.style.display = "none";
    if (btnGenerate) btnGenerate.style.opacity = "0.7";
    if (btnText) btnText.textContent = "Gerando Imagem...";

    const seed = customSeed !== null ? customSeed : Math.floor(Math.random() * 9999999);
    const portraitUrl = typeof PF2E_AI_ASSISTANT !== "undefined" && PF2E_AI_ASSISTANT.generatePortraitUrl
      ? PF2E_AI_ASSISTANT.generatePortraitUrl(prompt, seed)
      : `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=640&nologo=true&seed=${seed}&model=flux`;

    this.lastGeneratedPortraitUrl = portraitUrl;
    this.lastGeneratedPortraitSeed = seed;

    // Pré-carrega a imagem
    const imgLoader = new Image();
    imgLoader.onload = () => {
      if (previewImg) previewImg.src = portraitUrl;
      if (spinner) spinner.style.display = "none";
      if (imgContainer) imgContainer.style.display = "flex";
      if (btnGenerate) btnGenerate.style.opacity = "1";
      if (btnText) btnText.textContent = "Gerar Novo Retrato com IA";
    };
    imgLoader.onerror = () => {
      if (previewImg) previewImg.src = portraitUrl;
      if (spinner) spinner.style.display = "none";
      if (imgContainer) imgContainer.style.display = "flex";
      if (btnGenerate) btnGenerate.style.opacity = "1";
      if (btnText) btnText.textContent = "Tentar Novamente";
    };
    imgLoader.src = portraitUrl;
  }

  generateAIPortraitVariation() {
    const newSeed = Math.floor(Math.random() * 9999999);
    this.generateAIPortrait(newSeed);
  }

  applyGeneratedPortrait() {
    if (!this.lastGeneratedPortraitUrl || !this.character) return;
    this.character.avatar = this.lastGeneratedPortraitUrl;
    this.saveCharacterLocal(false);
    this.renderDetailsTab();
    const overlay = document.getElementById("modalAvatarOverlay");
    if (overlay) overlay.classList.remove("active");
  }

  downloadGeneratedPortrait() {
    if (!this.lastGeneratedPortraitUrl) return;
    const a = document.createElement("a");
    a.href = this.lastGeneratedPortraitUrl;
    a.target = "_blank";
    const charName = this.character?.name ? this.character.name.toLowerCase().replace(/\s+/g, "_") : "personagem";
    a.download = `${charName}_retrato_pf2e.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  handleAvatarUpload(event) {
    const file = event.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && this.character) {
        this.character.avatar = e.target.result;
        this.saveCharacterLocal(false);
        this.renderDetailsTab();
      }
    };
    reader.readAsDataURL(file);
    const overlay = document.getElementById("modalAvatarOverlay");
    if (overlay) overlay.classList.remove("active");
  }

  setAvatarFromUrl() {
    const input = document.getElementById("avatarUrlInput");
    const url = input ? input.value.trim() : "";
    if (url && this.character) {
      this.character.avatar = url;
      this.saveCharacterLocal(false);
      this.renderDetailsTab();
      const overlay = document.getElementById("modalAvatarOverlay");
      if (overlay) overlay.classList.remove("active");
    }
  }

  clearAvatar() {
    if (!this.character) return;
    this.character.avatar = null;
    this.saveCharacterLocal(false);
    this.renderDetailsTab();
  }

  saveNotes() {
    if (!this.character) return;
    const notesArea = document.getElementById("detailsNotesTextarea");
    if (notesArea) {
      this.character.notes = notesArea.value;
      this.character.backstory = notesArea.value;
    }
    this.saveCharacterLocal(false);
    
    const feedback = document.getElementById("saveNotesFeedback");
    if (feedback) {
      feedback.style.display = "inline";
      setTimeout(() => {
        if (feedback) feedback.style.display = "none";
      }, 2500);
    }
  }

  openDeityModal() {
    const noDeityName = this.getLocale() === "en" ? "Not set" : "Não definida";
    const noDeityDesc = this.getLocale() === "en" ? "No deity" : "Nenhuma divindade";
    const deities = [
      { name: noDeityName, title: noDeityDesc },
      { name: "Abadar", title: "Cidades, Riqueza, Lei, Comércio (LN)" },
      { name: "Arazni", title: "Sobrevivência, Dignidade Reclamada (N)" },
      { name: "Asmodeus", title: "Tirania, Orgulho, Contratos (LM)" },
      { name: "Calistria", title: "Luxúria, Vingança, Truques (CN)" },
      { name: "Cayden Cailean", title: "Liberdade, Bebida, Bravura (CB)" },
      { name: "Desna", title: "Sonhos, Estrelas, Viagens, Sorte (CB)" },
      { name: "Erastil", title: "Família, Caça, Agricultura, Comunidade (LB)" },
      { name: "Gorum", title: "Guerra, Batalha, Força (CN)" },
      { name: "Gozreh", title: "Natureza, Mares, Céu, Tempestades (N)" },
      { name: "Iomedae", title: "Justiça, Honra, Valor, Liderança (LB)" },
      { name: "Irori", title: "Perfeição, Conhecimento, Iluminação (LN)" },
      { name: "Lamashtu", title: "Monstros, Pesadelos, Deformidade (CM)" },
      { name: "Nethys", title: "Magia em todas as suas formas (N)" },
      { name: "Norgorber", title: "Segredos, Venenos, Ganância, Assassinato (NE)" },
      { name: "Pharasma", title: "Destino, Morte, Nascimento, Almas (N)" },
      { name: "Rovagug", title: "Destruição, Ruína, Monstros (CM)" },
      { name: "Sarenrae", title: "Sol, Cura, Redenção, Honestidade (NB)" },
      { name: "Shelyn", title: "Arte, Beleza, Amor, Música (NB)" },
      { name: "Torag", title: "Forja, Proteção, Estratégia, Criação (LB)" },
      { name: "Urgathoa", title: "Mortos-vivos, Glutonaria, Doenças (NM)" },
      { name: "Zon-Kuthon", title: "Trevas, Dor, Perda, Tortura (LM)" }
    ];

    this._deitiesCache = deities;
    this.filterDeityList("");
    const overlay = document.getElementById("modalDeityOverlay");
    if (overlay) overlay.classList.add("active");
  }

  filterDeityList(query) {
    const list = document.getElementById("deitySelectList");
    if (!list) return;
    const q = (query || "").toLowerCase();
    const current = (this.character?.deity || (this.getLocale() === "en" ? "Not set" : "Não definida")).toLowerCase();
    const filtered = (this._deitiesCache || []).filter(d => 
      d.name.toLowerCase().includes(q) || d.title.toLowerCase().includes(q)
    );

    list.innerHTML = filtered.map(d => {
      const isSelected = d.name.toLowerCase() === current;
      return `
        <div class="pb-picker-item-row ${isSelected ? 'selected' : ''}" onclick="app.selectDeity('${escapeHtml(d.name)}')">
          <div>
            <strong style="color: ${isSelected ? 'var(--pb-orange)' : '#fff'}; font-size: 14px;">${escapeHtml(d.name)}</strong>
            <div style="font-size: 11px; color: #94a3b8;">${escapeHtml(d.title)}</div>
          </div>
          ${isSelected ? '<span style="color: var(--pb-orange); font-weight: bold;">✓</span>' : ''}
        </div>
      `;
    }).join('');
  }

  selectDeity(deityName) {
    if (!this.character) return;
    const isNone = deityName === "Not set" || deityName === "Não definida" || deityName === "No definida";
    this.character.deity = isNone ? "" : deityName;
    this.saveCharacterLocal(false);
    this.renderDetailsTab();
    const overlay = document.getElementById("modalDeityOverlay");
    if (overlay) overlay.classList.remove("active");
  }

  setCustomDeity() {
    const input = document.getElementById("customDeityInput");
    const val = input ? input.value.trim() : "";
    if (val && this.character) {
      this.character.deity = val;
      this.saveCharacterLocal(false);
      this.renderDetailsTab();
      const overlay = document.getElementById("modalDeityOverlay");
      if (overlay) overlay.classList.remove("active");
    }
  }

  openLanguagesModal() {
    const standardLangs = [
      "Comum (Common)", "Anão (Dwarven)", "Élfico (Elven)", "Gnomo (Gnomish)",
      "Goblin", "Halfling", "Orc (Orcish)", "Dracônico (Draconic)",
      "Silvestre / Feérico (Sylvan)", "Sombrio (Undercommon)", "Celestial",
      "Infernal", "Abissal (Abyssal)", "Necril", "Aklo", "Aquano (Thalassic)",
      "Ignano (Pyric)", "Petrano (Petran)", "Aurano (Auran)", "Utopiano (Utopian)",
      "Jotun", "Gnoll (Kholo)", "Androide (Androffan)", "Amurrun (Catfolk)", "Ysoki (Ratfolk)"
    ];
    this._languagesCache = standardLangs;
    this.filterLanguagesList("");
    const overlay = document.getElementById("modalLanguagesOverlay");
    if (overlay) overlay.classList.add("active");
  }

  filterLanguagesList(query) {
    const list = document.getElementById("languagesSelectList");
    if (!list) return;
    const q = (query || "").toLowerCase();
    const currentLangs = Array.isArray(this.character?.languages) 
      ? this.character.languages.map(l => l.toLowerCase()) 
      : [];

    const filtered = (this._languagesCache || []).filter(l => l.toLowerCase().includes(q));

    list.innerHTML = filtered.map(l => {
      const isChecked = currentLangs.some(cl => cl.includes(l.toLowerCase().split(' ')[0]));
      return `
        <label class="pb-picker-item-row ${isChecked ? 'selected' : ''}" style="cursor: pointer; padding: 6px 10px;">
          <span style="font-size: 12px; color: ${isChecked ? 'var(--pb-orange)' : '#fff'}; font-weight: ${isChecked ? 'bold' : 'normal'};">${escapeHtml(l)}</span>
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="app.toggleLanguage('${escapeHtml(l)}', this.checked)" style="accent-color: var(--pb-orange);" />
        </label>
      `;
    }).join('');
  }

  toggleLanguage(langName, isChecked) {
    if (!this.character) return;
    if (!Array.isArray(this.character.languages)) {
      this.character.languages = [];
    }
    const shortName = langName.split(' ')[0];
    if (isChecked) {
      if (!this.character.languages.includes(shortName)) {
        this.character.languages.push(shortName);
      }
    } else {
      this.character.languages = this.character.languages.filter(l => l !== shortName && l !== langName);
    }
    this.saveCharacterLocal(false);
    this.filterLanguagesList(document.getElementById("languagesSearchInput")?.value || "");
    this.renderDetailsTab();
  }

  addCustomLanguage() {
    const input = document.getElementById("customLanguageInput");
    const val = input ? input.value.trim() : "";
    if (val && this.character) {
      if (!Array.isArray(this.character.languages)) {
        this.character.languages = [];
      }
      if (!this.character.languages.includes(val)) {
        this.character.languages.push(val);
      }
      this.saveCharacterLocal(false);
      if (input) input.value = "";
      this.filterLanguagesList("");
      this.renderDetailsTab();
    }
  }

  updateField(field, value) {
    if (!this.character) return;
    this.character[field] = value;
    if (field === "gmEmail") {
      this.character.gm_email = value;
    }
    if (field === "notes") {
      this.character.backstory = value;
    }
    this.saveCharacterLocal(false);
    if (field !== "notes" && field !== "age" && field !== "gender") {
      this.renderAll();
    }
  }

  // ABA DE LIVRO DE FÓRMULAS (FORMULA BOOK)
  renderFormulasTab() {
    const list = document.getElementById("formulasFullList");
    if (!list) return;
    const formulas = this.character.formulas || [];
    if (formulas.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:32px; color:var(--pb-text-muted); font-size:13px;">
          <div style="font-size:28px; margin-bottom:8px;">📜</div>
          Nenhuma fórmula cadastrada no seu Livro de Fórmulas.<br>
          Clique em <strong>➕ Adicionar Fórmula</strong> para incluir poções, elixires, bombas ou armadilhas.
        </div>
      `;
      return;
    }

    list.innerHTML = formulas.map((f, idx) => `
      <div class="strike-card" style="border-left-color: #8b5cf6; margin-bottom: 8px;">
        <div class="strike-header">
          <div>
            <span style="font-weight:bold; color:#a78bfa; font-size:13px;">${escapeHtml(f.name)}</span>
            <span class="trait-tag" style="background:#2e1065; color:#c4b5fd; border-color:#5b21b6; margin-left:6px;">${escapeHtml(f.category || "Fórmula")}</span>
            <span class="trait-tag" style="background:#1e1b4b; color:#93c5fd; border-color:#3730a3; margin-left:4px;">Nível ${escapeHtml(f.level || 0)}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${f.craftingDC ? `<span style="font-size:11px; color:var(--pb-text-muted);">CD Manufatura: <strong style="color:var(--pb-orange);">${f.craftingDC}</strong></span>` : ""}
            <button onclick="app.removeFormula(${idx})" title="Remover Fórmula" style="background:none; border:none; color:var(--pb-text-muted); cursor:pointer; font-size:14px;">🗑️</button>
          </div>
        </div>
        <div style="font-size:12px; color:var(--pb-text); margin-top:4px;">${escapeHtml(f.description || "")}</div>
        ${f.traits && f.traits.length > 0 ? `
          <div class="traits-row" style="margin-top:6px;">
            ${f.traits.map(t => `<span class="trait-tag" style="font-size:10px;">${escapeHtml(t)}</span>`).join('')}
          </div>
        ` : ""}
      </div>
    `).join('');
  }

  removeFormula(idx) {
    if (!this.character.formulas) return;
    this.character.formulas.splice(idx, 1);
    this.saveCharacterLocal(false);
    this.renderAll();
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
    const sharedCatalogs = window.pathbuilderCatalogs || {};
    if (type === "ancestry") {
      return getObjectCatalogRecords(PF2E_DATA.ancestries).map(({ key, record }) => ({ name: key, type: "Ancestralidade", data: record }));
    }
    if (type === "class") {
      return getObjectCatalogRecords(PF2E_DATA.classes).map(({ key, record }) => ({ name: key, type: "Classe", data: record }));
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
    if (type === "shield") {
      return (PF2E_DATA.shields || []).map(s => ({ name: s.name, type: "Escudo", data: s }));
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
      return mergeCatalogRecords(sharedCatalogs.feats, PF2E_DATA.feats || this.getFallbackFeatCatalog()).map(f => ({ name: f.name, type: f.type || "Talento", data: f }));
    }
    if (type === "item" || type === "gear") {
      return mergeCatalogRecords(sharedCatalogs.items, PF2E_DATA.items).map(i => ({ name: i.name, type: "Item", data: i }));
    }
    if (type === "pet") {
      return mergeCatalogRecords(sharedCatalogs.pets, PF2E_DATA.pets).map(p => ({ name: p.name, type: "Mascote", data: p }));
    }
    if (type === "action") {
      return mergeCatalogRecords(sharedCatalogs.actions, PF2E_DATA.actions).map(a => ({ name: a.name, type: "Ação", data: a }));
    }
    if (type === "formula") {
      return (PF2E_DATA.formulas || []).map(f => ({ name: f.name, type: f.category || "Fórmula", data: f }));
    }
    if (type === "condition") {
      return (PF2E_DATA.conditions || this.getConditionCatalog()).map(c => ({ name: c.name, type: "Condição", data: c }));
    }
    if (type === "buff") {
      return (PF2E_DATA.buffs || this.getBuffCatalog()).map(b => ({ name: b.name, type: "Benefício", data: b }));
    }
    return PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Geral", data: b }));
  }

  parsePriceToCopper(price) {
    if (!price && price !== 0) return 0;
    if (typeof price === "number") return Math.round(price * 100);
    if (typeof price === "object") {
      const pp = Number(price.pp || price.pl || 0);
      const gp = Number(price.gp || price.po || 0);
      const sp = Number(price.sp || 0);
      const cp = Number(price.cp || price.pc || 0);
      return (pp * 1000) + (gp * 100) + (sp * 10) + cp;
    }
    const str = String(price).toLowerCase().trim();
    if (!str || str === "—" || str === "-" || str === "0") return 0;
    let totalCp = 0;
    let matched = false;

    const plMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:pl|platina|platinum)\b/i);
    if (plMatch) { totalCp += Math.round(parseFloat(plMatch[1]) * 1000); matched = true; }
    const gpMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:gp|po|ouro|gold)\b/i);
    if (gpMatch) { totalCp += Math.round(parseFloat(gpMatch[1]) * 100); matched = true; }
    const spMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:sp|prata|silver)\b/i);
    if (spMatch) { totalCp += Math.round(parseFloat(spMatch[1]) * 10); matched = true; }
    else if (!plMatch && /\b\d+(?:\.\d+)?\s*pp\b/i.test(str)) {
      const ppPt = str.match(/(\d+(?:\.\d+)?)\s*pp\b/i);
      if (ppPt) { totalCp += Math.round(parseFloat(ppPt[1]) * 10); matched = true; }
    }
    const cpMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:cp|pc|cobre|copper)\b/i);
    if (cpMatch) { totalCp += Math.round(parseFloat(cpMatch[1])); matched = true; }

    if (!matched) {
      const num = parseFloat(str.replace(/[^\d.]/g, ""));
      if (!isNaN(num)) totalCp = Math.round(num * 100);
    }
    return totalCp;
  }

  getCharacterTotalCopper() {
    const coins = this.character?.coins || { pp: 0, gp: 0, sp: 0, cp: 0 };
    return ((coins.pp || 0) * 1000) + ((coins.gp || 0) * 100) + ((coins.sp || 0) * 10) + (coins.cp || 0);
  }

  canCharacterAfford(price, qty = 1) {
    const cost = this.parsePriceToCopper(price) * Math.max(1, qty);
    return this.getCharacterTotalCopper() >= cost;
  }

  deductCharacterPrice(price, qty = 1) {
    const cost = this.parsePriceToCopper(price) * Math.max(1, qty);
    let current = this.getCharacterTotalCopper();
    if (current >= cost) {
      current -= cost;
      const pp = Math.floor(current / 1000);
      const rem1 = current % 1000;
      const gp = Math.floor(rem1 / 100);
      const rem2 = rem1 % 100;
      const sp = Math.floor(rem2 / 10);
      const cp = rem2 % 10;
      if (!this.character.coins) this.character.coins = {};
      this.character.coins = { pp, gp, sp, cp };
    }
  }

  applyPickerSelection(type, item, options, deductCoins = false) {
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
    else if (type === "shield") this.character.equippedShield = { ...item.data, currentHp: item.data.maxHp };
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
    } else if (type === "pet") {
      if (!this.character.pets) this.character.pets = [];
      const exists = this.character.pets.some(pet => (item.data.id && pet.id === item.data.id) || pet.name === item.name);
      if (!exists) {
        const pet = { ...item.data, name: item.name };
        if (pet.hp !== undefined && pet.hpMax === undefined) pet.hpMax = pet.hp;
        if (pet.hpMax !== undefined && pet.hpCurrent === undefined) pet.hpCurrent = pet.hpMax;
        this.character.pets.push(pet);
      }
    } else if (type === "formula") {
      if (!this.character.formulas) this.character.formulas = [];
      const exists = this.character.formulas.some(f => (item.data.id && f.id === item.data.id) || f.name === item.name);
      if (!exists) this.character.formulas.push({ ...item.data, name: item.name });
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
      if (!this.character.conditions.some(c => c.id ? c.id === item.data?.id : c.name === item.name)) {
        this.character.conditions.push({ ...item.data, name: item.name, value: item.data?.value ?? 1 });
      }
    } else if (type === "buff") {
      if (!this.character.buffs) this.character.buffs = [];
      const exists = this.character.buffs.some(buff => (item.data.id && buff.id === item.data.id) || buff.name === item.name);
      if (!exists) this.character.buffs.push({ ...item.data, name: item.name });
    } else if (type === "item" || type === "gear") {
      if (!this.character.inventory) this.character.inventory = [];
      this.character.inventory.push({ ...item.data, name: item.name, qty: 1 });
    }

    if (deductCoins && (item.data?.price || item.price)) {
      this.deductCharacterPrice(item.data?.price || item.price);
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
    const sharedCatalogs = window.pathbuilderCatalogs || {};

    if (this.currentPickerType === "ancestry") {
      items = getObjectCatalogRecords(PF2E_DATA.ancestries).map(({ key, record }) => ({ name: key, type: "Ancestralidade", data: record }));
    } else if (this.currentPickerType === "class") {
      items = getObjectCatalogRecords(PF2E_DATA.classes).map(({ key, record }) => ({ name: key, type: "Classe", data: record }));
    } else if (this.currentPickerType === "background") {
      items = PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: "Antecedente", data: b }));
    } else if (this.currentPickerType === "weapon") {
      items = PF2E_DATA.weapons.map(w => ({ name: w.name, type: "Arma", data: w }));
    } else if (this.currentPickerType === "armor") {
      items = PF2E_DATA.armors.map(a => ({ name: a.name, type: "Armadura", data: a }));
    } else if (this.currentPickerType === "shield") {
      items = (PF2E_DATA.shields || []).map(s => ({ name: s.name, type: "Escudo", data: s }));
    } else if (this.currentPickerType === "heritage") {
      const ancestry = PF2E_DATA.ancestries[this.character?.ancestry];
      const heritages = (ancestry?.heritages || []).map(name => ({ name, type: "Herança", data: { name, description: "Herança da ancestralidade selecionada." } }));
      const versatile = (PF2E_DATA.versatileHeritages || []).map(h => ({ name: h.name, type: "Herança Versátil", data: h }));
      items = heritages.concat(versatile);
    } else if (this.currentPickerType === "feat") {
      items = mergeCatalogRecords(sharedCatalogs.feats, PF2E_DATA.feats || this.getFallbackFeatCatalog()).map(f => ({ name: f.name, type: f.type || "Talento", data: f }));
    } else if (this.currentPickerType === "item" || this.currentPickerType === "gear") {
      items = mergeCatalogRecords(sharedCatalogs.items, PF2E_DATA.items).map(i => ({ name: i.name, type: "Item", data: i }));
    } else if (this.currentPickerType === "pet") {
      items = mergeCatalogRecords(sharedCatalogs.pets, PF2E_DATA.pets).map(p => ({ name: p.name, type: "Mascote", data: p }));
    } else if (this.currentPickerType === "action") {
      items = mergeCatalogRecords(sharedCatalogs.actions, PF2E_DATA.actions).map(a => ({ name: a.name, type: "Ação", data: a }));
    } else if (this.currentPickerType === "formula") {
      items = (PF2E_DATA.formulas || []).map(f => ({ name: f.name, type: f.category || "Fórmula", data: f }));
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
    } else if (this.currentPickerType === "shield") {
      this.character.equippedShield = { ...item.data, currentHp: item.data.maxHp };
    } else if (this.currentPickerType === "formula") {
      if (!this.character.formulas) this.character.formulas = [];
      this.character.formulas.push({ ...item.data, name: item.name });
    } else if (this.currentPickerType === "pet") {
      if (!this.character.pets) this.character.pets = [];
      this.character.pets.push({ ...item.data, name: item.name });
    } else if (this.currentPickerType === "action") {
      if (!this.character.actions) this.character.actions = [];
      this.character.actions.push({ ...item.data, name: item.name });
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
    if (typeof PF2E_DATA !== "undefined" && Array.isArray(PF2E_DATA.conditions)) {
      return PF2E_DATA.conditions;
    }
    return [
      { name: "Amedrontado", description: "Penalidade em todos os testes e CDs.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster" },
      { name: "Desprevenido", description: "Penalidade na Classe de Armadura contra ataques.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster" },
      { name: "Enfraquecido", description: "Penalidade em Força e testes relacionados.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster" },
      { name: "Morrendo", description: "Você está à beira da morte.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster" },
      { name: "Ofuscado", description: "Visão prejudicada a longa distância.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster" },
    ];
  }

  getBuffCatalog() {
    if (typeof PF2E_DATA !== "undefined" && Array.isArray(PF2E_DATA.buffs)) {
      return PF2E_DATA.buffs;
    }
    return [
      { name: "Abençoado", description: "Bônus +1 de estado em jogadas de ataque.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 318 }, ruleset: "remaster" },
      { name: "Aceleração", description: "Você recebe uma ação adicional em cada turno.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster" },
      { name: "Ocultado", description: "Ataques contra você têm chance de falha.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster" },
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
    if (typeof window !== "undefined" && window.innerWidth <= 1080) {
      this.switchMobileView("plan");
      return;
    }
    const tree = document.getElementById("planTreeCol");
    const btn = document.getElementById("btnTogglePlan");
    if (!tree) return;
    tree.classList.toggle("collapsed");
    if (btn) {
      btn.innerText = tree.classList.contains("collapsed") ? "Mostrar Plano" : "Ocultar Plano";
    }
  }

  // SELETOR RESPONSIVO DE SEÇÕES (SEM SCROLL HORIZONTAL)
  switchMobileView(view) {
    this.mobileActiveView = view || "stats";
    const btnPlan = document.getElementById("btnViewPlan");
    const btnStats = document.getElementById("btnViewStats");
    const btnContent = document.getElementById("btnViewContent");

    const colPlan = document.getElementById("planTreeCol");
    const colStats = document.getElementById("statsCol");
    const colContent = document.getElementById("contentCol");

    [btnPlan, btnStats, btnContent].forEach(b => b?.classList.remove("active"));

    if (view === "plan") {
      btnPlan?.classList.add("active");
      if (colPlan) { colPlan.classList.remove("mobile-hidden"); colPlan.classList.add("mobile-visible"); }
      if (colStats) { colStats.classList.add("mobile-hidden"); colStats.classList.remove("mobile-visible"); }
      if (colContent) { colContent.classList.add("mobile-hidden"); colContent.classList.remove("mobile-visible"); }
    } else if (view === "content") {
      btnContent?.classList.add("active");
      if (colPlan) { colPlan.classList.add("mobile-hidden"); colPlan.classList.remove("mobile-visible"); }
      if (colStats) { colStats.classList.add("mobile-hidden"); colStats.classList.remove("mobile-visible"); }
      if (colContent) { colContent.classList.remove("mobile-hidden"); colContent.classList.add("mobile-visible"); }
    } else {
      // stats (padrão)
      btnStats?.classList.add("active");
      if (colPlan) { colPlan.classList.add("mobile-hidden"); colPlan.classList.remove("mobile-visible"); }
      if (colStats) { colStats.classList.remove("mobile-hidden"); colStats.classList.add("mobile-visible"); }
      if (colContent) { colContent.classList.add("mobile-hidden"); colContent.classList.remove("mobile-visible"); }
    }
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

  // ROLADOR DE DADOS ANIMADO (PATHBUILDER 2E STYLE)
  toggleDiceRoller(forceState) {
    const drawer = document.getElementById("diceRollerDrawer");
    const backdrop = document.getElementById("diceRollerBackdrop");
    if (!drawer) return;
    const shouldOpen = typeof forceState === "boolean" ? forceState : !drawer.classList.contains("active");
    if (shouldOpen) {
      drawer.classList.add("active");
      drawer.setAttribute("aria-hidden", "false");
      if (backdrop) backdrop.classList.add("active");
    } else {
      drawer.classList.remove("active");
      drawer.setAttribute("aria-hidden", "true");
      if (backdrop) backdrop.classList.remove("active");
    }
  }

  openDiceRoller() {
    this.toggleDiceRoller(true);
  }

  closeDiceRoller() {
    this.toggleDiceRoller(false);
  }

  addDiceToPool(sides) {
    if (!this.freeRollDiceList) this.freeRollDiceList = [];
    
    // Gera rolagem do dado
    if (sides === 100) {
      const tensRoll = Math.floor(Math.random() * 10);
      const unitsRoll = Math.floor(Math.random() * 10);
      const tensVal = tensRoll * 10;
      const totalVal = (tensVal === 0 && unitsRoll === 0) ? 100 : tensVal + unitsRoll;
      this.freeRollDiceList.push({
        id: Math.random().toString(36).substring(2, 8),
        sides: 100,
        tens: tensVal,
        units: unitsRoll,
        value: totalVal,
        rot: Math.floor(Math.random() * 50) - 25
      });
    } else {
      const roll = Math.floor(Math.random() * sides) + 1;
      this.freeRollDiceList.push({
        id: Math.random().toString(36).substring(2, 8),
        sides,
        value: roll,
        rot: Math.floor(Math.random() * 50) - 25
      });
    }

    this.openDiceRoller();
    this.renderFreeRollArena();
  }

  resetDicePool() {
    this.freeRollDiceList = [];
    this.dicePool = [];
    const modInput = document.getElementById("dicePoolMod");
    if (modInput) modInput.value = 0;
    
    const placeholder = document.getElementById("diceArenaPlaceholder");
    const stage = document.getElementById("diceArenaStage");
    const animContainer = document.getElementById("diceAnimContainer");
    const resultTotal = document.getElementById("diceResultTotal");
    const resultBreakdown = document.getElementById("diceResultBreakdown");
    const resultLabel = document.getElementById("diceResultLabel");

    if (animContainer) animContainer.innerHTML = "";
    if (resultTotal) resultTotal.innerText = "0";
    if (resultBreakdown) resultBreakdown.innerText = this.getLocale() === "en" ? "Select dice using the buttons at the top" : "Selecione os dados acima para rolar";
    if (resultLabel) resultLabel.innerText = this.getLocale() === "en" ? "Free Roll" : "Rolagem Livre";
    if (placeholder) placeholder.style.display = "flex";
    if (stage) stage.style.display = "none";
  }

  renderFreeRollArena() {
    const placeholder = document.getElementById("diceArenaPlaceholder");
    const stage = document.getElementById("diceArenaStage");
    const animContainer = document.getElementById("diceAnimContainer");
    const resultLabel = document.getElementById("diceResultLabel");
    const resultTotal = document.getElementById("diceResultTotal");
    const resultBreakdown = document.getElementById("diceResultBreakdown");

    if (placeholder) placeholder.style.display = "none";
    if (stage) stage.style.display = "flex";

    const list = this.freeRollDiceList || [];
    let total = 0;
    list.forEach(d => {
      total += d.value;
    });

    if (resultLabel) resultLabel.innerText = "Free Roll";
    if (resultTotal) resultTotal.innerText = `${total}`;
    
    const lastRoll = list[list.length - 1];
    const formulaStr = lastRoll ? `Último resultado: d${lastRoll.sides} (${lastRoll.value}) · Soma: ${total}` : "";
    if (resultBreakdown) resultBreakdown.innerText = formulaStr || "Select dice using the buttons at the top";

    if (animContainer) {
      // A arena mostra somente o dado da última ação; o total continua acumulado.
      // Isso mantém a leitura 3D clara mesmo após muitas rolagens consecutivas.
      const d = list[list.length - 1];
      const isCrit = d && d.sides === 20 && d.value === 20;
      const isFumble = d && d.sides === 20 && d.value === 1;
      animContainer.innerHTML = d ? `
        <div class="polyhedral-die-wrapper rolling ${isCrit ? 'crit-nat20' : (isFumble ? 'fumble-nat1' : '')}" style="transform: rotate(${d.rot}deg);">
          ${this.getPolyhedralDieSvg(d.sides, d.value, isCrit, isFumble)}
        </div>
      ` : '';
    }

    // Registra no histórico com timestamp (HH:MM:SS)
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const logItemTitle = `${timeStr} Your Free Roll: ${total}`;
    const detailedRolls = lastRoll ? `Último: ${lastRoll.value} d${lastRoll.sides} · Total acumulado: ${total}` : "";

    this.upsertDiceLog("free-roll", logItemTitle, detailedRolls, total, formulaStr, false, false);
  }

  getPolyhedralDieSvg(sides, value, isCrit = false, isFumble = false) {
    const rand = Math.random().toString(36).substring(2, 7);
    const primaryColor = isCrit ? '#fbbf24' : (isFumble ? '#ef4444' : '#f97316');
    const darkColor = isCrit ? '#b45309' : (isFumble ? '#7f1d1d' : '#9a3412');
    const strokeColor = isCrit ? '#fef08a' : (isFumble ? '#fca5a5' : '#fdba74');

    if (sides === 4) {
      return `
        <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="gd4_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${darkColor}"/>
            </linearGradient>
          </defs>
          <polygon points="35,8 65,60 5,60" fill="url(#gd4_${rand})" stroke="${strokeColor}" stroke-width="2"/>
          <polygon points="35,8 5,60 35,44" fill="rgba(255,255,255,0.12)"/>
          <polygon points="35,8 65,60 35,44" fill="rgba(0,0,0,0.18)"/>
          <polygon points="5,60 65,60 35,44" fill="rgba(0,0,0,0.32)"/>
          <text x="35" y="42" class="polyhedral-die-text">${value}</text>
        </svg>
      `;
    }

    if (sides === 6) {
      return `
        <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="gd6_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${darkColor}"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="50" height="50" rx="8" fill="url(#gd6_${rand})" stroke="${strokeColor}" stroke-width="2"/>
          <rect x="14" y="14" width="42" height="42" rx="5" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
          <text x="35" y="37" class="polyhedral-die-text">${value}</text>
        </svg>
      `;
    }

    if (sides === 8) {
      return `
        <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="gd8_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${darkColor}"/>
            </linearGradient>
          </defs>
          <polygon points="35,6 64,35 35,35" fill="url(#gd8_${rand})" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="35,6 6,35 35,35" fill="rgba(255,255,255,0.18)" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="6,35 35,64 35,35" fill="rgba(0,0,0,0.3)" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="64,35 35,64 35,35" fill="rgba(0,0,0,0.45)" stroke="${strokeColor}" stroke-width="1.5"/>
          <text x="35" y="36" class="polyhedral-die-text">${value}</text>
        </svg>
      `;
    }

    if (sides === 10) {
      return `
        <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="gd10_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${darkColor}"/>
            </linearGradient>
          </defs>
          <polygon points="35,6 62,25 35,44 8,25" fill="url(#gd10_${rand})" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="8,25 35,44 35,65 14,50" fill="rgba(0,0,0,0.25)" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="62,25 35,44 35,65 56,50" fill="rgba(0,0,0,0.4)" stroke="${strokeColor}" stroke-width="1.5"/>
          <polygon points="35,6 62,25 35,44" fill="rgba(255,255,255,0.15)"/>
          <text x="35" y="35" class="polyhedral-die-text">${value}</text>
        </svg>
      `;
    }

    if (sides === 12) {
      return `
        <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
          <defs>
            <linearGradient id="gd12_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}"/>
              <stop offset="100%" stop-color="${darkColor}"/>
            </linearGradient>
          </defs>
          <polygon points="35,6 63,24 53,58 17,58 7,24" fill="url(#gd12_${rand})" stroke="${strokeColor}" stroke-width="2"/>
          <polygon points="35,22 50,33 44,50 26,50 20,33" fill="rgba(255,255,255,0.15)" stroke="${strokeColor}" stroke-width="1.2"/>
          <line x1="35" y1="6" x2="35" y2="22" stroke="${strokeColor}" stroke-width="1.2"/>
          <line x1="63" y1="24" x2="50" y2="33" stroke="${strokeColor}" stroke-width="1.2"/>
          <line x1="53" y1="58" x2="44" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
          <line x1="17" y1="58" x2="26" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
          <line x1="7" y1="24" x2="20" y2="33" stroke="${strokeColor}" stroke-width="1.2"/>
          <text x="35" y="38" class="polyhedral-die-text">${value}</text>
        </svg>
      `;
    }

    if (sides === 100) {
      const tensVal = Math.floor(value / 10) * 10;
      const unitsVal = value % 10;
      return `
        <div style="display:flex; gap:6px;">
          <svg class="polyhedral-die-svg" viewBox="0 0 70 70" style="width:55px; height:55px;">
            <polygon points="35,6 62,25 35,44 8,25" fill="${primaryColor}" stroke="${strokeColor}" stroke-width="1.5"/>
            <polygon points="8,25 35,44 35,65 14,50" fill="rgba(0,0,0,0.25)" stroke="${strokeColor}" stroke-width="1.5"/>
            <polygon points="62,25 35,44 35,65 56,50" fill="rgba(0,0,0,0.4)" stroke="${strokeColor}" stroke-width="1.5"/>
            <text x="35" y="35" class="polyhedral-die-text" font-size="14">${tensVal === 100 ? "00" : (tensVal < 10 ? `0${tensVal}` : tensVal)}</text>
          </svg>
          <svg class="polyhedral-die-svg" viewBox="0 0 70 70" style="width:55px; height:55px;">
            <polygon points="35,6 62,25 35,44 8,25" fill="${primaryColor}" stroke="${strokeColor}" stroke-width="1.5"/>
            <polygon points="8,25 35,44 35,65 14,50" fill="rgba(0,0,0,0.25)" stroke="${strokeColor}" stroke-width="1.5"/>
            <polygon points="62,25 35,44 35,65 56,50" fill="rgba(0,0,0,0.4)" stroke="${strokeColor}" stroke-width="1.5"/>
            <text x="35" y="35" class="polyhedral-die-text" font-size="14">${unitsVal}</text>
          </svg>
        </div>
      `;
    }

    // Default: d20 (Icosaedro com sombreamento realista e facetas 3D)
    return `
      <svg class="polyhedral-die-svg" viewBox="0 0 70 70">
        <defs>
          <linearGradient id="gd20_${rand}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}"/>
            <stop offset="100%" stop-color="${darkColor}"/>
          </linearGradient>
        </defs>
        <polygon points="35,6 62,20 62,50 35,64 8,50 8,20" fill="url(#gd20_${rand})" stroke="${strokeColor}" stroke-width="2"/>
        <polygon points="35,22 53,50 17,50" fill="${isCrit ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}" stroke="${strokeColor}" stroke-width="1.5"/>
        <line x1="35" y1="6" x2="35" y2="22" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="62" y1="20" x2="35" y2="22" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="62" y1="20" x2="53" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="62" y1="50" x2="53" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="35" y1="64" x2="53" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="35" y1="64" x2="17" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="8" y1="50" x2="17" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="8" y1="20" x2="17" y2="50" stroke="${strokeColor}" stroke-width="1.2"/>
        <line x1="8" y1="20" x2="35" y2="22" stroke="${strokeColor}" stroke-width="1.2"/>
        <text x="35" y="42" class="polyhedral-die-text">${value}</text>
      </svg>
    `;
  }

  animateDiceRoll({ title, diceList, modifier = 0, total, formula, breakdown, tag = "", isCrit = false, isFumble = false }) {
    this.openDiceRoller();

    const placeholder = document.getElementById("diceArenaPlaceholder");
    const stage = document.getElementById("diceArenaStage");
    const animContainer = document.getElementById("diceAnimContainer");
    const resultLabel = document.getElementById("diceResultLabel");
    const resultTotal = document.getElementById("diceResultTotal");
    const resultBreakdown = document.getElementById("diceResultBreakdown");
    const resultTag = document.getElementById("diceResultTag");

    if (placeholder) placeholder.style.display = "none";
    if (stage) stage.style.display = "flex";

    if (resultLabel) resultLabel.innerText = title;
    if (resultTotal) resultTotal.innerText = "...";
    if (resultBreakdown) resultBreakdown.innerText = formula || breakdown;

    if (resultTag) {
      if (isCrit) {
        resultTag.innerText = "🌟 Sucesso Crítico (Nat 20)!";
        resultTag.className = "dice-result-tag tag-crit";
        resultTag.style.display = "inline-block";
      } else if (isFumble) {
        resultTag.innerText = "💀 Falha Crítica (Nat 1)!";
        resultTag.className = "dice-result-tag tag-fumble";
        resultTag.style.display = "inline-block";
      } else if (tag) {
        resultTag.innerText = tag;
        resultTag.className = "dice-result-tag tag-damage";
        resultTag.style.display = "inline-block";
      } else {
        resultTag.style.display = "none";
      }
    }

    if (animContainer) {
      // Cria os dados animados rolando na arena
      animContainer.innerHTML = diceList.map(d => `
        <div class="polyhedral-die-wrapper rolling ${isCrit ? 'crit-nat20' : (isFumble ? 'fumble-nat1' : '')}">
          ${this.getPolyhedralDieSvg(d.sides, d.value, isCrit, isFumble)}
        </div>
      `).join('');
    }

    // Após 500ms fixa o total calculado
    if (this.diceAnimationTimer) clearTimeout(this.diceAnimationTimer);
    this.diceAnimationTimer = setTimeout(() => {
      if (resultTotal) resultTotal.innerText = total;
      if (resultBreakdown) resultBreakdown.innerText = breakdown;
      this.addDiceLog(title, formula, total, breakdown, isCrit, isFumble);
    }, 500);
  }

  // ROLAGEM DE DADOS RÁPIDA
  rollDice(sides) {
    const roll = Math.floor(Math.random() * sides) + 1;
    const isCrit = sides === 20 && roll === 20;
    const isFumble = sides === 20 && roll === 1;

    this.animateDiceRoll({
      title: `d${sides}`,
      diceList: [{ sides, value: roll }],
      total: roll,
      formula: `1d${sides}`,
      breakdown: `d${sides} (${roll}) = ${roll}`,
      isCrit,
      isFumble
    });
  }

  rollCheck(label, modifier) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;
    const modStr = PF2E_ENGINE.formatMod(modifier);

    this.animateDiceRoll({
      title: label,
      diceList: [{ sides: 20, value: d20 }],
      modifier,
      total,
      formula: `d20 ${modStr}`,
      breakdown: `d20 (${d20}) ${modStr} = ${total}`,
      isCrit,
      isFumble
    });
  }

  rollStrike(label, modifier) {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;
    const modStr = PF2E_ENGINE.formatMod(modifier);

    this.animateDiceRoll({
      title: `Ataque: ${label}`,
      diceList: [{ sides: 20, value: d20 }],
      modifier,
      total,
      formula: `d20 ${modStr}`,
      breakdown: `d20 (${d20}) ${modStr} = ${total}`,
      isCrit,
      isFumble,
      tag: isCrit ? "Dano Dobrado!" : ""
    });
  }

  rollDamage(weaponName, damageFormula) {
    const rolled = PF2E_ENGINE.evaluateDiceExpression(damageFormula);
    const critRolled = PF2E_ENGINE.evaluateDiceExpression(damageFormula, { isCritical: true });
    
    // Extrai os dados individuais para animação visual na arena
    const diceList = [];
    (rolled.diceRolls || []).forEach(dr => {
      (dr.rolls || []).forEach(r => {
        diceList.push({ sides: dr.sides, value: r });
      });
    });
    if (diceList.length === 0) {
      diceList.push({ sides: 6, value: rolled.total });
    }

    this.animateDiceRoll({
      title: `Dano: ${weaponName}`,
      diceList,
      modifier: rolled.staticModifier || 0,
      total: rolled.total,
      formula: damageFormula,
      breakdown: `Rolou [${damageFormula}]: ${rolled.total} (Crítico: ${critRolled.total})`,
      tag: `Crítico: ${critRolled.total}`
    });
  }

  addDiceLog(title, formula, total, breakdown, isCrit = false, isFumble = false) {
    const time = new Date().toLocaleTimeString();
    this.diceHistory.unshift({ title, formula, total, breakdown, time, isCrit, isFumble });
    const content = document.getElementById("diceLogContent");
    if (!content) return;
    content.innerHTML = this.diceHistory.slice(0, 25).map(entry => `
      <div class="dice-history-item" style="${entry.isCrit ? 'border-left-color:#eab308;' : (entry.isFumble ? 'border-left-color:#ef4444;' : '')}">
        <div class="dice-history-info">
          <div class="dice-history-title">${escapeHtml(entry.title)}</div>
          <div class="dice-history-details">${escapeHtml(entry.breakdown || `${entry.formula} = ${entry.total}`)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:16px; font-weight:900; color:${entry.isCrit ? '#eab308' : (entry.isFumble ? '#ef4444' : '#fff')};">${entry.total}</div>
          <div class="dice-history-time">${escapeHtml(entry.time)}</div>
        </div>
      </div>
    `).join('');
  }

  upsertDiceLog(key, title, formula, total, breakdown, isCrit = false, isFumble = false) {
    const existingIndex = this.diceHistory.findIndex(entry => entry.key === key);
    const time = new Date().toLocaleTimeString();
    const entry = { key, title, formula, total, breakdown, time, isCrit, isFumble };
    if (existingIndex >= 0) this.diceHistory.splice(existingIndex, 1);
    this.diceHistory.unshift(entry);
    const content = document.getElementById("diceLogContent");
    if (!content) return;
    content.innerHTML = this.diceHistory.slice(0, 25).map(item => `
      <div class="dice-history-item" style="${item.isCrit ? 'border-left-color:#eab308;' : (item.isFumble ? 'border-left-color:#ef4444;' : '')}">
        <div class="dice-history-info">
          <div class="dice-history-title">${escapeHtml(item.title)}</div>
          <div class="dice-history-details">${escapeHtml(item.breakdown || `${item.formula} = ${item.total}`)}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:16px; font-weight:900; color:${item.isCrit ? '#eab308' : (item.isFumble ? '#ef4444' : '#fff')};">${item.total}</div>
          <div class="dice-history-time">${escapeHtml(item.time)}</div>
        </div>
      </div>
    `).join('');
  }

  clearDiceLog() {
    this.diceHistory = [];
    const content = document.getElementById("diceLogContent");
    if (content) content.innerHTML = `<div class="dice-history-empty">Histórico limpo.</div>`;
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

  // ÍCONES SVG VETORIAIS PARA A ÁRVORE DE PROGRESSÃO
  getTreeIconSvg(type) {
    if (type === "ancestry" || type === "heritage" || type === "ancestry_feat") {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7"/><path d="M9 18h6"/><path d="M12 15a6 6 0 0 0 6-6c0-2-1-3-2-4-1-1-3-1-4 0-1-1-3-1-4 0-1 1-2 2-2 4a6 6 0 0 0 6 6z"/><path d="M7 11c-.5-1-1-2-.5-3 .5-1 2-.5 3 0"/><path d="M17 11c.5-1 1-2 .5-3-.5-1-2-.5-3 0"/></svg>`;
    }
    if (type === "background") {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
    }
    if (type === "class" || type === "class_feat") {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="m13 19 2 2 4-4-2-2"/><path d="m19 13 2 2-4 4-2-2"/><line x1="16" y1="8" x2="20" y2="12"/><line x1="8" y1="16" x2="12" y2="20"/></svg>`;
    }
    if (type === "general_feat") {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    }
    if (type === "skill_feat" || type === "skill_increase" || type === "gear") {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M10 14a3 3 0 0 0 4 0"/></svg>`;
  }

  // RENDERIZAÇÃO DA ÁRVORE DE PROGRESSÃO (ESTILO EXATO PATHBUILDER 2E)
  renderPlanTree() {
    const tree = document.getElementById("planTreeCol");
    if (!tree) return;

    const char = this.character || {};
    const prog = char.progression || {};
    const charLevel = Number(char.level) || 1;
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const tLabels = {
      ancestry: isEn ? "Ancestry" : (isEs ? "Ascendencia" : "Ancestralidade"),
      background: isEn ? "Background" : (isEs ? "Trasfondo" : "Antecedente"),
      class: isEn ? "Class" : (isEs ? "Clase" : "Classe"),
      heritage: isEn ? "Heritage" : (isEs ? "Herencia" : "Herança"),
      generalFeat: isEn ? "General Feat" : (isEs ? "Dote General" : "Talento Geral"),
      ancestryFeat: isEn ? "Ancestry Feat" : (isEs ? "Dote de Ascendencia" : "Talento Ancestral"),
      classFeat: isEn ? "Class Feat" : (isEs ? "Dote de Clase" : "Talento de Classe"),
      skillFeat: isEn ? "Skill Feat" : (isEs ? "Dote de Habilidad" : "Talento de Perícia"),
      skillIncrease: isEn ? "Skill Increase" : (isEs ? "Aumento de Habilidad" : "Aumento de Perícia"),
      setAbilities: isEn ? "Set Abilities" : (isEs ? "Definir Características" : "Definir Atributos"),
      skillTraining: isEn ? "Skill Training" : (isEs ? "Entrenar Habilidades" : "Treinar Perícias"),
      selectStyle: isEn ? "Select Style" : (isEs ? "Seleccionar Estilo" : "Selecionar Estilo"),
      levelPrefix: isEn ? "Level " : (isEs ? "Nivel " : "Nível "),
      unselected: isEn ? "Unselected" : (isEs ? "No Seleccionado" : "Não Selecionado"),
      setAbilitiesBoosts: isEn ? "Set Abilities (+4 Boosts)" : (isEs ? "Aumentos (+4 Características)" : "Aprimoramentos (+4 Atributos)"),
      defaultHuman: isEn ? "Human" : "Humano",
      defaultNoble: isEn ? "Noble (Heraldry)" : (isEs ? "Noble (Heráldica)" : "Nobre (Heráldica)"),
      defaultSwashbuckler: isEn ? "Swashbuckler" : (isEs ? "Espadachín" : "Espadachim"),
      defaultVersatileHuman: isEn ? "Versatile Human" : (isEs ? "Humano Versátil" : "Humano Versátil"),
      defaultFleet: isEn ? "Fleet" : (isEs ? "Pies Ligeros" : "Pés Velozes"),
      defaultAmbition: isEn ? "Natural Ambition" : (isEs ? "Ambición Natural" : "Ambição Natural"),
      defaultGoading: isEn ? "Goading Feint" : "Finta Provocadora",
      defaultParry: isEn ? "Extravagant Parry" : (isEs ? "Parada Extravagante" : "Aparada Extravagante"),
      defaultFencer: isEn ? "Fencer" : (isEs ? "Esgrimista" : "Esgrimista"),
    };

    let html = "";

    // 1. TOPO: PAINEL PRINCIPAL DE ESCOLHAS (ANCESTRY, BACKGROUND, CLASS)
    const locAncestry = this.localizeItemName(char.ancestry || tLabels.defaultHuman, locale);
    const locBackground = this.localizeItemName(char.background || tLabels.defaultNoble, locale);
    const locClass = this.localizeItemName(char.class || tLabels.defaultSwashbuckler, locale);

    html += `
      <div class="pb-tree-group-box">
        <div class="pb-tree-card" onclick="app.openPicker('ancestry')" title="${isEn ? "Click to change Ancestry" : "Clique para alterar Ancestralidade"}">
          <div class="pb-tree-card-icon">${this.getTreeIconSvg('ancestry')}</div>
          <div class="pb-tree-card-content">
            <div class="pb-tree-card-label">${tLabels.ancestry}</div>
            <div class="pb-tree-card-value ${!char.ancestry ? 'unselected' : ''}">${escapeHtml(locAncestry)}</div>
          </div>
        </div>

        <div class="pb-tree-card" onclick="app.openPicker('background')" title="${isEn ? "Click to change Background" : "Clique para alterar Biografia"}">
          <div class="pb-tree-card-icon">${this.getTreeIconSvg('background')}</div>
          <div class="pb-tree-card-content">
            <div class="pb-tree-card-label">${tLabels.background}</div>
            <div class="pb-tree-card-value ${!char.background ? 'unselected' : ''}">${escapeHtml(locBackground)}</div>
          </div>
        </div>

        <div class="pb-tree-card active" onclick="app.openPicker('class')" title="${isEn ? "Click to change Class" : "Clique para alterar Classe"}">
          <div class="pb-tree-card-icon">${this.getTreeIconSvg('class')}</div>
          <div class="pb-tree-card-content">
            <div class="pb-tree-card-label">${tLabels.class}</div>
            <div class="pb-tree-card-value ${!char.class ? 'unselected' : ''}">${escapeHtml(locClass)}</div>
          </div>
        </div>
      </div>
    `;

    // 2. NÍVEIS 1 A 20
    for (let lvl = 1; lvl <= 20; lvl++) {
      html += `<div class="pb-tree-level-title">${tLabels.levelPrefix}${lvl}</div>`;
      html += `<div class="pb-tree-group-box">`;

      if (lvl === 1) {
        // Botões rápidos de configuração no Nível 1
        html += `
          <div class="pb-tree-quick-row">
            <div class="pb-tree-quick-btn" onclick="app.openSetAbilitiesModal(1)" title="${isEn ? "Configure Abilities" : "Configurar Atributos"}">
              ${this.getTreeIconSvg('gear')}
              <span>${tLabels.setAbilities}</span>
            </div>
            <div class="pb-tree-quick-btn" onclick="app.openSkillTrainingModal()" title="${isEn ? "Configure Skill Training" : "Configurar Treinamento de Perícias"}">
              ${this.getTreeIconSvg('gear')}
              <span>${tLabels.skillTraining}</span>
            </div>
          </div>
        `;

        // Heritage
        const rawHeritage = char.heritage || tLabels.defaultVersatileHuman;
        const heritageVal = this.localizeItemName(rawHeritage, locale);
        html += `
          <div class="pb-tree-card" onclick="app.openPicker('heritage')" title="${isEn ? "Choose Heritage" : "Escolher Herança"}">
            <div class="pb-tree-card-icon">${this.getTreeIconSvg('heritage')}</div>
            <div class="pb-tree-card-content">
              <div class="pb-tree-card-label">${tLabels.heritage}</div>
              <div class="pb-tree-card-value">${escapeHtml(heritageVal)}</div>
            </div>
          </div>
        `;

        // General Feat (se humano versátil ou selecionado)
        const rawGeneralFeat = prog["1_general_feat"] || (char.feats?.find(f => f.slotId === "1_general_feat" || f.type?.includes("Geral"))?.name || tLabels.defaultFleet);
        const generalFeatVal = this.localizeItemName(rawGeneralFeat, locale);
        html += `
          <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '1_general_feat', level: 1, filterType: 'Geral' })" title="${isEn ? "Choose General Feat" : "Escolher Talento Geral"}">
            <div class="pb-tree-card-icon">${this.getTreeIconSvg('general_feat')}</div>
            <div class="pb-tree-card-content">
              <div class="pb-tree-card-label">${tLabels.generalFeat}</div>
              <div class="pb-tree-card-value">${escapeHtml(generalFeatVal)}</div>
            </div>
          </div>
        `;

        // Ancestry Feat
        const rawAncestryFeat = prog["1_ancestry_feat"] || (char.feats?.find(f => f.slotId === "1_ancestry_feat" || f.type?.includes("Ancestral"))?.name || tLabels.defaultAmbition);
        const ancestryFeatVal = this.localizeItemName(rawAncestryFeat, locale);
        html += `
          <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '1_ancestry_feat', level: 1, filterType: 'Ancestral' })" title="${isEn ? "Choose Ancestry Feat" : "Escolher Talento Ancestral"}">
            <div class="pb-tree-card-icon">${this.getTreeIconSvg('ancestry_feat')}</div>
            <div class="pb-tree-card-content">
              <div class="pb-tree-card-label">${tLabels.ancestryFeat}</div>
              <div class="pb-tree-card-value">${escapeHtml(ancestryFeatVal)}</div>
            </div>
          </div>
        `;

        // Class Feat (Principal)
        const rawClassFeat1 = prog["1_class_feat"] || (char.feats?.find(f => f.slotId === "1_class_feat" || f.type?.includes("Classe"))?.name || tLabels.defaultGoading);
        const classFeatVal1 = this.localizeItemName(rawClassFeat1, locale);
        html += `
          <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '1_class_feat', level: 1, filterType: 'Classe' })" title="${isEn ? "Choose Class Feat" : "Escolher Talento de Classe"}">
            <div class="pb-tree-card-icon">${this.getTreeIconSvg('class_feat')}</div>
            <div class="pb-tree-card-content">
              <div class="pb-tree-card-label">${tLabels.classFeat}</div>
              <div class="pb-tree-card-value">${escapeHtml(classFeatVal1)}</div>
            </div>
          </div>
        `;

        // Class Feat Secundário / Extra (concedido por Ambição Natural ou Guerreiro)
        const rawClassFeat2 = prog["1_class_feat_extra"] || (char.feats?.find(f => f.slotId === "1_class_feat_extra")?.name || tLabels.defaultParry);
        const classFeatVal2 = this.localizeItemName(rawClassFeat2, locale);
        html += `
          <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '1_class_feat_extra', level: 1, filterType: 'Classe' })" title="${isEn ? "Choose Extra Class Feat" : "Escolher Talento de Classe Extra"}">
            <div class="pb-tree-card-icon">${this.getTreeIconSvg('class_feat')}</div>
            <div class="pb-tree-card-content">
              <div class="pb-tree-card-label">${tLabels.classFeat}</div>
              <div class="pb-tree-card-value">
                <span>${escapeHtml(classFeatVal2)}</span>
                <span class="pb-action-glyph">◆</span>
              </div>
            </div>
          </div>
        `;

        // Subclasse / Estilo de Classe (ex: Swashbuckler's Style, Cleric's Doctrine, etc.)
        const className = this.localizeItemName(char.class || tLabels.defaultSwashbuckler, locale);
        const subclassHeading = isEn ? `${className}'s Style` : `${className} (${isEs ? 'Estilo / Doctrina' : 'Estilo / Doutrina'})`;
        const rawStyle = char.subclass || tLabels.defaultFencer;
        const styleVal = this.localizeItemName(rawStyle, locale);
        html += `
          <div class="pb-tree-section-heading">${escapeHtml(subclassHeading)}</div>
          <div class="pb-tree-card" onclick="app.promptSubclass()" title="${isEn ? "Set Style / Subclass" : "Definir Estilo / Subclasse"}">
            <div class="pb-tree-card-content" style="padding-left: 2px;">
              <div class="pb-tree-card-label">${tLabels.selectStyle}</div>
              <div class="pb-tree-card-value">${escapeHtml(styleVal)}</div>
            </div>
          </div>
        `;
      } else {
        // NÍVEIS 2 A 20
        if ([5, 10, 15, 20].includes(lvl)) {
          html += `
            <div class="pb-tree-quick-row">
              <div class="pb-tree-quick-btn" style="grid-column: span 2;" onclick="app.openSetAbilitiesModal(${lvl})" title="${isEn ? "Ability Boosts" : "Aprimoramento de Atributos"}">
                ${this.getTreeIconSvg('gear')}
                <span>${tLabels.setAbilitiesBoosts}</span>
              </div>
            </div>
          `;
        }

        if (lvl % 2 === 0) {
          const rawVal = prog[`${lvl}_class_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_class_feat`)?.name || tLabels.unselected);
          const val = rawVal === tLabels.unselected ? rawVal : this.localizeItemName(rawVal, locale);
          html += `
            <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '${lvl}_class_feat', level: ${lvl}, filterType: 'Classe' })">
              <div class="pb-tree-card-icon">${this.getTreeIconSvg('class_feat')}</div>
              <div class="pb-tree-card-content">
                <div class="pb-tree-card-label">${tLabels.classFeat}</div>
                <div class="pb-tree-card-value ${val === tLabels.unselected ? 'unselected' : ''}">${escapeHtml(val)}</div>
              </div>
            </div>
          `;
        }

        if (lvl % 2 === 0) {
          const rawVal = prog[`${lvl}_skill_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_skill_feat`)?.name || tLabels.unselected);
          const val = rawVal === tLabels.unselected ? rawVal : this.localizeItemName(rawVal, locale);
          html += `
            <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '${lvl}_skill_feat', level: ${lvl}, filterType: 'Perícia' })">
              <div class="pb-tree-card-icon">${this.getTreeIconSvg('skill_feat')}</div>
              <div class="pb-tree-card-content">
                <div class="pb-tree-card-label">${tLabels.skillFeat}</div>
                <div class="pb-tree-card-value ${val === tLabels.unselected ? 'unselected' : ''}">${escapeHtml(val)}</div>
              </div>
            </div>
          `;
        }

        if ([3, 7, 11, 15, 19].includes(lvl)) {
          const rawVal = prog[`${lvl}_general_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_general_feat`)?.name || tLabels.unselected);
          const val = rawVal === tLabels.unselected ? rawVal : this.localizeItemName(rawVal, locale);
          html += `
            <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '${lvl}_general_feat', level: ${lvl}, filterType: 'Geral' })">
              <div class="pb-tree-card-icon">${this.getTreeIconSvg('general_feat')}</div>
              <div class="pb-tree-card-content">
                <div class="pb-tree-card-label">${tLabels.generalFeat}</div>
                <div class="pb-tree-card-value ${val === tLabels.unselected ? 'unselected' : ''}">${escapeHtml(val)}</div>
              </div>
            </div>
          `;
        }

        if ([5, 9, 13, 17].includes(lvl)) {
          const rawVal = prog[`${lvl}_ancestry_feat`] || (char.feats?.find(f => f.slotId === `${lvl}_ancestry_feat`)?.name || tLabels.unselected);
          const val = rawVal === tLabels.unselected ? rawVal : this.localizeItemName(rawVal, locale);
          html += `
            <div class="pb-tree-card" onclick="app.openPicker('feat', { slotId: '${lvl}_ancestry_feat', level: ${lvl}, filterType: 'Ancestral' })">
              <div class="pb-tree-card-icon">${this.getTreeIconSvg('ancestry_feat')}</div>
              <div class="pb-tree-card-content">
                <div class="pb-tree-card-label">${tLabels.ancestryFeat}</div>
                <div class="pb-tree-card-value ${val === tLabels.unselected ? 'unselected' : ''}">${escapeHtml(val)}</div>
              </div>
            </div>
          `;
        }

        if (lvl >= 3 && lvl % 2 !== 0) {
          const rawVal = prog[`${lvl}_skill_increase`] || tLabels.unselected;
          const val = rawVal === tLabels.unselected ? rawVal : this.localizeItemName(rawVal, locale);
          html += `
            <div class="pb-tree-card" onclick="app.promptSkillIncrease(${lvl})">
              <div class="pb-tree-card-icon">${this.getTreeIconSvg('skill_increase')}</div>
              <div class="pb-tree-card-content">
                <div class="pb-tree-card-label">${tLabels.skillIncrease}</div>
                <div class="pb-tree-card-value ${val === tLabels.unselected ? 'unselected' : ''}">${escapeHtml(val)}</div>
              </div>
            </div>
          `;
        }
      }

      html += `</div>`; // fecha .pb-tree-group-box
    }

    tree.innerHTML = html;
  }

  // MODAL DE ATRIBUTOS (SET STARTING ABILITY BOOSTS - SCREENSHOT 1)
  openSetAbilitiesModal(level = 1) {
    const overlay = document.getElementById("modalSetAbilitiesOverlay");
    const container = document.getElementById("setAbilitiesContent");
    if (!overlay || !container) return;

    if (!this.character.abilities) {
      this.character.abilities = { str: 10, dex: 16, con: 12, int: 12, wis: 12, cha: 16 };
    }
    if (!this.character.abilityBoosts) {
      this.character.abilityBoosts = {
        ancestry: ["dex", "cha"],
        background: ["int", "cha"],
        class: "dex",
        free: ["dex", "con", "wis", "cha"],
        override: false
      };
    }

    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const abilityOptions = [
      { id: "str", name: isEn ? "Strength" : (isEs ? "Fuerza" : "Força"), code: isEn ? "STR" : (isEs ? "FUE" : "FOR") },
      { id: "dex", name: isEn ? "Dexterity" : (isEs ? "Destreza" : "Destreza"), code: isEn ? "DEX" : (isEs ? "DES" : "DES") },
      { id: "con", name: isEn ? "Constitution" : (isEs ? "Constitución" : "Constituição"), code: isEn ? "CON" : (isEs ? "CON" : "CON") },
      { id: "int", name: isEn ? "Intelligence" : (isEs ? "Inteligencia" : "Inteligência"), code: isEn ? "INT" : (isEs ? "INT" : "INT") },
      { id: "wis", name: isEn ? "Wisdom" : (isEs ? "Sabiduría" : "Sabedoria"), code: isEn ? "WIS" : (isEs ? "SAB" : "SAB") },
      { id: "cha", name: isEn ? "Charisma" : (isEs ? "Carisma" : "Carisma"), code: isEn ? "CHA" : (isEs ? "CAR" : "CAR") }
    ];

    const getSelectHtml = (group, idx, selectedVal) => `
      <div class="pb-boost-select-wrap">
        <span class="pb-boost-plus-icon">+</span>
        <select class="pb-boost-select" onchange="app.setAbilityBoostChoice('${group}', ${idx}, this.value)">
          ${abilityOptions.map(opt => `<option value="${opt.id}" ${opt.id === selectedVal ? 'selected' : ''}>${opt.name}</option>`).join('')}
        </select>
      </div>
    `;

    const b = this.character.abilityBoosts;
    const calcMod = (key) => {
      const val = this.character.abilities[key] || 10;
      const mod = Math.floor((val - 10) / 2);
      return (mod >= 0 ? `+${mod}` : `${mod}`);
    };

    const isChecked = (key) => (b.free || []).includes(key);
    const getCode = (key) => abilityOptions.find(o => o.id === key)?.code || key.toUpperCase();

    const tSection = {
      ancestry: isEn ? "Ancestry Boosts" : (isEs ? "Aumentos de Ascendencia" : "Aprimoramentos de Ancestralidade"),
      background: isEn ? "Background Boosts" : (isEs ? "Aumentos de Trasfondo" : "Aprimoramentos de Antecedente"),
      class: isEn ? "Class Boost" : (isEs ? "Aumento de Clase" : "Aprimoramento de Classe"),
      free: isEn ? "Free Boosts" : (isEs ? "Aumentos Libres" : "Aprimoramentos Livres"),
      override: isEn ? "Override character creation ability modifiers" : (isEs ? "Anular modificadores de creación de personaje" : "Substituir modificadores de atributo na criação"),
    };

    const defaultClassAbilityName = abilityOptions.find(o => o.id === (b.class || 'dex'))?.name || (isEn ? 'Dexterity' : 'Destreza');

    container.innerHTML = `
      <!-- Ancestry Boosts -->
      <div class="pb-boost-section-box">
        <h4 class="pb-boost-section-title">${tSection.ancestry}</h4>
        <div class="pb-boost-row">
          ${getSelectHtml('ancestry', 0, b.ancestry?.[0] || 'dex')}
          ${getSelectHtml('ancestry', 1, b.ancestry?.[1] || 'cha')}
        </div>
      </div>

      <!-- Background Boosts -->
      <div class="pb-boost-section-box">
        <h4 class="pb-boost-section-title">${tSection.background}</h4>
        <div class="pb-boost-row">
          ${getSelectHtml('background', 0, b.background?.[0] || 'int')}
          ${getSelectHtml('background', 1, b.background?.[1] || 'cha')}
        </div>
      </div>

      <!-- Class Boost -->
      <div class="pb-boost-section-box">
        <h4 class="pb-boost-section-title">${tSection.class}</h4>
        <div class="pb-boost-row">
          <div class="pb-boost-select-wrap">
            <span class="pb-boost-plus-icon">+</span>
            <span style="font-size:12px; font-weight:700; color:#fff; padding:2px 6px;">${defaultClassAbilityName}</span>
          </div>
        </div>
      </div>

      <!-- Free Boosts -->
      <div class="pb-boost-section-box">
        <h4 class="pb-boost-section-title">${tSection.free}</h4>
        <div class="pb-free-boosts-container">
          <!-- Coluna 1 -->
          <div>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('str') ? 'checked' : ''} onchange="app.toggleFreeBoost('str')">
              <span class="pb-free-boost-label">${getCode('str')}</span>
              <span class="pb-free-boost-mod">${calcMod('str')}</span>
            </label>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('con') ? 'checked' : ''} onchange="app.toggleFreeBoost('con')">
              <span class="pb-free-boost-label">${getCode('con')}</span>
              <span class="pb-free-boost-mod">${calcMod('con')}</span>
            </label>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('wis') ? 'checked' : ''} onchange="app.toggleFreeBoost('wis')">
              <span class="pb-free-boost-label">${getCode('wis')}</span>
              <span class="pb-free-boost-mod">${calcMod('wis')}</span>
            </label>
          </div>

          <!-- Centro: Ícone da Engrenagem com Checkmark -->
          <div class="pb-center-gear-badge">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              <path d="M8.5 12l2.5 2.5 5-5" stroke="#22c55e" stroke-width="2.5"/>
            </svg>
          </div>

          <!-- Coluna 2 -->
          <div>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('dex') ? 'checked' : ''} onchange="app.toggleFreeBoost('dex')">
              <span class="pb-free-boost-label">${getCode('dex')}</span>
              <span class="pb-free-boost-mod">${calcMod('dex')}</span>
            </label>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('int') ? 'checked' : ''} onchange="app.toggleFreeBoost('int')">
              <span class="pb-free-boost-label">${getCode('int')}</span>
              <span class="pb-free-boost-mod">${calcMod('int')}</span>
            </label>
            <label class="pb-free-boost-item">
              <input type="checkbox" ${isChecked('cha') ? 'checked' : ''} onchange="app.toggleFreeBoost('cha')">
              <span class="pb-free-boost-label">${getCode('cha')}</span>
              <span class="pb-free-boost-mod">${calcMod('cha')}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Override Checkbox -->
      <div style="margin-top: 4px;">
        <label style="display:flex; align-items:center; gap:8px; font-size:12px; color:#94a3b8; cursor:pointer;">
          <input type="checkbox" id="chkOverrideAbilities" ${b.override ? 'checked' : ''} onchange="app.toggleOverrideAbilities(this.checked)">
          <span>${tSection.override}</span>
        </label>
      </div>
    `;

    overlay.classList.add("active");
  }

  setAbilityBoostChoice(group, idx, value) {
    if (!this.character.abilityBoosts) {
      this.character.abilityBoosts = { ancestry: ["dex", "cha"], background: ["int", "cha"], class: "dex", free: ["dex", "con", "wis", "cha"] };
    }
    if (!this.character.abilityBoosts[group]) this.character.abilityBoosts[group] = [];
    this.character.abilityBoosts[group][idx] = value;
    this.recalculateAbilitiesFromBoosts();
    this.openSetAbilitiesModal();
  }

  toggleFreeBoost(key) {
    if (!this.character.abilityBoosts) {
      this.character.abilityBoosts = { ancestry: ["dex", "cha"], background: ["int", "cha"], class: "dex", free: [] };
    }
    const free = this.character.abilityBoosts.free || [];
    const idx = free.indexOf(key);
    if (idx >= 0) {
      free.splice(idx, 1);
    } else {
      if (free.length < 4) {
        free.push(key);
      } else {
        free.shift();
        free.push(key);
      }
    }
    this.character.abilityBoosts.free = free;
    this.recalculateAbilitiesFromBoosts();
    this.openSetAbilitiesModal();
  }

  toggleOverrideAbilities(checked) {
    if (!this.character.abilityBoosts) this.character.abilityBoosts = {};
    this.character.abilityBoosts.override = checked;
  }

  recalculateAbilitiesFromBoosts() {
    const base = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const b = this.character.abilityBoosts || { ancestry: ["dex", "cha"], background: ["int", "cha"], class: "dex", free: ["dex", "con", "wis", "cha"] };

    // Apply Ancestry
    (b.ancestry || []).forEach(k => { if (base[k] !== undefined) base[k] += 2; });
    // Apply Background
    (b.background || []).forEach(k => { if (base[k] !== undefined) base[k] += 2; });
    // Apply Class
    if (b.class && base[b.class] !== undefined) base[b.class] += 2;
    // Apply Free
    (b.free || []).forEach(k => { if (base[k] !== undefined) base[k] += 2; });

    this.character.abilities = base;
  }

  saveAbilitiesModal() {
    const overlay = document.getElementById("modalSetAbilitiesOverlay");
    if (overlay) overlay.classList.remove("active");
    this.renderAll();
  }

  // MODAL DE TREINAMENTO DE PERÍCIAS (SKILL TRAINING - SCREENSHOT 2)
  openSkillTrainingModal() {
    const overlay = document.getElementById("modalSkillTrainingOverlay");
    const container = document.getElementById("modalSkillTrainingList");
    const title = document.getElementById("modalRemainingSkillsTitle");
    if (!overlay || !container) return;

    const trainedSummary = this.calc?.trainedSkills || PF2E_ENGINE.calculateTrainedSkillsCount(this.character);
    const remaining = Math.max(0, (trainedSummary.totalAllowed || 4) - (trainedSummary.selectedSkills?.length || 0));
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    if (title) {
      title.innerText = isEn ? `Remaining Skill Selections: ${remaining}` : (isEs ? `Selecciones de Habilidad Restantes: ${remaining}` : `Seleções Restantes de Perícias: ${remaining}`);
    }

    const selectedMap = {};
    (trainedSummary.selectedSkills || []).forEach(s => { selectedMap[s] = true; });

    const lorePrefix = isEn ? "Lore: " : "Saber: ";
    const allSkills = [...PF2E_DATA.skills];
    (this.character.loreSkills || []).forEach(lore => {
      allSkills.push({
        id: lore.id || `lore_${lore.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: `${lorePrefix}${lore.name.replace(/^(Lore|Saber):\s*/i, '')}`,
        attribute: "int",
        isLore: true
      });
    });

    const attrMap = {
      str: isEn ? "Str" : (isEs ? "Fue" : "For"),
      dex: isEn ? "Dex" : (isEs ? "Des" : "Des"),
      con: isEn ? "Con" : (isEs ? "Con" : "Con"),
      int: isEn ? "Int" : (isEs ? "Int" : "Int"),
      wis: isEn ? "Wis" : (isEs ? "Sab" : "Sab"),
      cha: isEn ? "Cha" : (isEs ? "Car" : "Car")
    };

    container.innerHTML = allSkills.map(sk => {
      const calcData = this.calc?.skills?.[sk.id] || { total: 0, rank: "Destreinado", attrBonus: 0, profBonus: 0, itemBonus: 0 };
      const isTrained = selectedMap[sk.id] || (calcData.rank && calcData.rank !== "Destreinado");
      const totalMod = (calcData.total >= 0 ? `+${calcData.total}` : `${calcData.total}`);
      const rawAttr = (sk.attribute || "str").toLowerCase();
      const attrKey = attrMap[rawAttr] || rawAttr.toUpperCase();
      const attrVal = calcData.attrBonus ?? (this.calc?.mods?.[sk.attribute] ?? 0);
      const profVal = isTrained ? (this.calc?.level ? this.calc.level + 2 : 3) : 0;
      const itemVal = calcData.itemBonus ?? 0;

      return `
        <div class="pb-skill-training-row">
          <div class="${isTrained ? 'pb-skill-row-title-trained' : 'pb-skill-row-title-untrained'}">
            ${escapeHtml(sk.name)} ${totalMod}
          </div>
          <div class="pb-skill-row-right">
            <div class="pb-teml-dots-group" onclick="app.toggleSkillTrainingModal('${sk.id}')">
              <span class="pb-teml-dot t ${isTrained ? 'active' : ''}">T</span>
              <span class="pb-teml-dot e">E</span>
              <span class="pb-teml-dot m">M</span>
              <span class="pb-teml-dot l">L</span>
            </div>
            <div class="pb-skill-stat-cols">
              <div class="pb-skill-stat-col">
                <span class="pb-skill-stat-header">${attrKey}</span>
                <span class="pb-skill-stat-num">${attrVal}</span>
              </div>
              <div class="pb-skill-stat-col">
                <span class="pb-skill-stat-header">Prof</span>
                <span class="pb-skill-stat-num">${profVal}</span>
              </div>
              <div class="pb-skill-stat-col">
                <span class="pb-skill-stat-header">Item</span>
                <span class="pb-skill-stat-num">${itemVal}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    overlay.classList.add("active");
  }

  toggleSkillTrainingModal(skillId) {
    this.cycleSkillRank(skillId);
    this.openSkillTrainingModal();
  }

  promptAddLoreSkill() {
    const name = prompt("Nome do Saber / Conhecimento (ex: Warfare, Sailing, Architecture, Heraldry):");
    if (name && name.trim()) {
      if (!this.character.loreSkills) this.character.loreSkills = [];
      const id = `lore_${name.trim().toLowerCase().replace(/\s+/g, '_')}`;
      this.character.loreSkills.push({ id, name: name.trim(), rank: "Treinado" });
      if (!this.character.trainedSkills) this.character.trainedSkills = [];
      this.character.trainedSkills.push(id);
      this.renderAll();
      this.openSkillTrainingModal();
    }
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
    const sub = prompt("Defina o Estilo ou Subclasse do Personagem (ex: Fencer, Thief, Warpriest, Storm, Maestro):", this.character.subclass || "Fencer");
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
    if (window.pathbuilderItemPicker && typeof window.pathbuilderItemPicker.open === "function") {
      window.pathbuilderItemPicker.open();
      return;
    }
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
    if (!character) return;
    this.character = assertSafeCharacterDocument(character);
    this.reconcileSpellcastingProfile();
    this.saveCharacterLocal(false);
    this.renderAll();
  }

  saveCharacterLocal(showAlert = false) {
    try {
      if (typeof localStorage !== "undefined" && this.character) {
        localStorage.setItem("pf2e_current_character", JSON.stringify(this.character));
      }
    } catch (e) {
      console.warn("Erro ao salvar no localStorage:", e);
    }
    if (showAlert && typeof alert !== "undefined") {
      alert(`Personagem '${this.character?.name || "atual"}' salvo neste dispositivo.`);
    }
  }

  createNewCharacter() {
    this.character = {
      id: "char_" + Date.now(),
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
      weapons: [{ name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", damageBonus: 3, traits: ["Versátil P"] }],
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      loreSkills: [{ name: "Saber Militar", rank: "Treinado" }],
      feats: [],
      spells: [],
      rituals: [],
      inventory: [{ name: "Mochila de Aventureiro", qty: 1, bulk: 1 }],
      coins: { pl: 0, gp: 15, sp: 0, cp: 0 }
    };
    this.saveCharacterLocal(false);
    this.renderAll();
    return this.character;
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

  // =========================================================================
  // 1. AUDITORIA DE PRONTIDÃO DA FICHA & REGRAS ABC
  // =========================================================================
  openReadinessModal() {
    this.renderReadinessModal();
    const overlay = document.getElementById("modalReadinessOverlay");
    if (overlay) overlay.classList.add("active");
  }

  renderReadinessModal() {
    const readiness = this.calc?.readiness || (typeof PF2E_ENGINE !== "undefined" && PF2E_ENGINE.validateCharacterReadiness ? PF2E_ENGINE.validateCharacterReadiness(this.character) : { score: 100, isReady: true, issues: [] });
    const scoreEl = document.getElementById("readinessModalScore");
    const barEl = document.getElementById("readinessProgressBar");
    const listEl = document.getElementById("readinessIssuesList");

    if (scoreEl) {
      scoreEl.innerText = `${readiness.score}% ${readiness.isReady ? "Pronto para Jogar" : "Incompleto"}`;
      scoreEl.style.color = readiness.isReady ? "#22c55e" : "#f97316";
    }
    if (barEl) {
      barEl.style.width = `${readiness.score}%`;
      barEl.style.background = readiness.isReady ? "linear-gradient(90deg, #16a34a, #22c55e)" : "linear-gradient(90deg, #ea580c, #f97316)";
    }

    if (!listEl) return;
    if (!readiness.issues || readiness.issues.length === 0) {
      listEl.innerHTML = `
        <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 14px; text-align: center; color: #86efac; font-size: 13px;">
          ✅ <strong>Excelente!</strong> Todas as escolhas obrigatórias de nível 1 foram preenchidas (Ancestralidade, Biografia, Classe, Atributos e Perícias). Sua ficha está pronta para jogar!
        </div>
      `;
      return;
    }

    listEl.innerHTML = readiness.issues.map(iss => {
      const isError = iss.type === "error";
      const isWarning = iss.type === "warning";
      const icon = isError ? "❌" : (isWarning ? "⚠️" : "💡");
      const bgColor = isError ? "rgba(239, 68, 68, 0.08)" : (isWarning ? "rgba(249, 115, 22, 0.08)" : "rgba(59, 130, 246, 0.08)");
      const borderColor = isError ? "rgba(239, 68, 68, 0.3)" : (isWarning ? "rgba(249, 115, 22, 0.3)" : "rgba(59, 130, 246, 0.3)");
      const textColor = isError ? "#fca5a5" : (isWarning ? "#fdba74" : "#93c5fd");

      return `
        <div style="background: ${bgColor}; border: 1px solid ${borderColor}; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>${icon}</span>
            <span style="font-size: 12px; color: ${textColor}; font-weight: 600;">${escapeHtml(iss.message)}</span>
          </div>
          <button type="button" onclick="app.resolveReadinessIssue('${iss.id}', '${iss.tab}', '${iss.targetId}')" style="background: #1e293b; border: 1px solid #3b82f6; color: #93c5fd; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer; white-space: nowrap;">
            Resolver ➔
          </button>
        </div>
      `;
    }).join("");
  }

  resolveReadinessIssue(issueId, tab, targetId) {
    const overlay = document.getElementById("modalReadinessOverlay");
    if (overlay) overlay.classList.remove("active");

    if (issueId === "ancestry") this.openAncestryModal();
    else if (issueId === "background") this.openBackgroundModal();
    else if (issueId === "class") this.openClassModal();
    else if (issueId === "subclass") this.openSubclassModal();
    else if (issueId === "abilities") this.openSetAbilitiesModal();
    else if (issueId === "skills") this.openSkillTrainingModal();
    else if (issueId === "deity") this.openDeityModal();
    else if (issueId === "weapons") {
      this.switchTab("tab-weapons");
      this.openPicker("weapon");
    }
  }

  // =========================================================================
  // 2. PACOTES INICIAIS DE EQUIPAMENTO (CLASS STARTER KITS)
  // =========================================================================
  openStarterKitsModal() {
    this.renderStarterKitsModal();
    const overlay = document.getElementById("modalStarterKitsOverlay");
    if (overlay) overlay.classList.add("active");
  }

  renderStarterKitsModal() {
    const container = document.getElementById("starterKitsListContainer");
    if (!container || typeof PF2E_DATA === "undefined" || !PF2E_DATA.classStarterKits) return;

    const kits = PF2E_DATA.classStarterKits;
    container.innerHTML = Object.keys(kits).map(className => {
      const kit = kits[className];
      const isCurrentClass = this.character?.class && this.character.class.includes(className.split(" ")[0]);

      return `
        <div style="background: ${isCurrentClass ? 'rgba(249, 115, 22, 0.08)' : '#111a2e'}; border: 1px solid ${isCurrentClass ? 'var(--pb-orange)' : '#1e293b'}; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">🎒</span>
              <strong style="font-size: 14px; color: ${isCurrentClass ? 'var(--pb-orange)' : '#ffffff'};">${escapeHtml(kit.name)}</strong>
              ${isCurrentClass ? '<span style="background: rgba(249,115,22,0.2); color: #fed7aa; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">Sua Classe</span>' : ''}
            </div>
            <button type="button" onclick="app.applyStarterKit('${escapeHtml(className)}')" style="background: #16a34a; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 8px rgba(22,163,74,0.3);">
              ⚡ Equipar este Kit
            </button>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; line-height: 1.5;">
            <div>🛡️ <strong>Armadura:</strong> ${escapeHtml(kit.armor)}</div>
            <div>⚔️ <strong>Armas:</strong> ${kit.weapons.map(w => escapeHtml(w.name)).join(", ")}</div>
            <div>📦 <strong>Itens:</strong> ${kit.items.map(it => `${escapeHtml(it.name)} (x${it.qty || 1})`).join(", ")}</div>
            <div>💰 <strong>Moedas Restantes:</strong> ${kit.remainingCoins.gp} PO, ${kit.remainingCoins.sp} PP</div>
          </div>
        </div>
      `;
    }).join("");
  }

  applyStarterKit(className) {
    if (!this.character) return;
    if (confirm(`Deseja equipar o pacote de equipamentos recomendado para ${className}? Suas armas, armadura e moedas serão configuradas automaticamente.`)) {
      PF2E_ENGINE.applyClassStarterKit(this.character, className);
      this.saveCharacterLocal();
      this.renderAll();
      const overlay = document.getElementById("modalStarterKitsOverlay");
      if (overlay) overlay.classList.remove("active");
      alert(`🎒 Kit Inicial equipado com sucesso!`);
    }
  }

  // =========================================================================
  // 3. REGRAS VARIANTES OFICIAIS (FREE ARCHETYPE, ABP, PARAGON)
  // =========================================================================
  openVariantRulesModal() {
    if (!this.character) return;
    if (!this.character.variantRules) {
      this.character.variantRules = { freeArchetype: false, automaticBonusProgression: false, ancestryParagon: false };
    }
    const chkFree = document.getElementById("chkFreeArchetype");
    const chkAbp = document.getElementById("chkABP");
    const chkParagon = document.getElementById("chkAncestryParagon");

    if (chkFree) chkFree.checked = Boolean(this.character.variantRules.freeArchetype);
    if (chkAbp) chkAbp.checked = Boolean(this.character.variantRules.automaticBonusProgression);
    if (chkParagon) chkParagon.checked = Boolean(this.character.variantRules.ancestryParagon);

    const overlay = document.getElementById("modalVariantRulesOverlay");
    if (overlay) overlay.classList.add("active");
  }

  toggleVariantRule(ruleKey, isEnabled) {
    if (!this.character) return;
    if (!this.character.variantRules) {
      this.character.variantRules = { freeArchetype: false, automaticBonusProgression: false, ancestryParagon: false };
    }
    this.character.variantRules[ruleKey] = isEnabled;
    this.saveCharacterLocal();
    this.renderAll();
  }

  // =========================================================================
  // 4. RASTREADOR DE CONDIÇÕES VIVAS COM AJUSTE EM TEMPO REAL
  // =========================================================================
  normalizeConditionList() {
    if (!this.character) return [];
    if (Array.isArray(this.character.conditions)) return this.character.conditions;

    const catalog = typeof PF2E_DATA !== "undefined" && PF2E_DATA.conditionsCatalog ? PF2E_DATA.conditionsCatalog : {};
    const legacy = this.character.conditions || {};
    const converted = Object.entries(legacy)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => ({
        key,
        name: catalog[key]?.name || key,
        value: typeof value === "number" ? value : undefined,
        description: catalog[key]?.description
      }));
    this.character.conditions = converted;
    return converted;
  }

  renderConditions() {
    const container = document.getElementById("activeConditions");
    if (!container) return;
    const locale = this.getLocale();
    const isEn = locale === "en";
    const isEs = locale === "es";

    const conditions = this.normalizeConditionList();
    const catalog = typeof PF2E_DATA !== "undefined" && PF2E_DATA.conditionsCatalog ? PF2E_DATA.conditionsCatalog : {};

    if (conditions.length === 0) {
      container.innerHTML = `<span style="font-size: 11px; color: var(--pb-text-dim);">${isEn ? "No active conditions." : isEs ? "Ninguna condición activa." : "Nenhuma condição ativa."}</span>`;
      return;
    }

    container.innerHTML = conditions.map(condition => {
      const key = condition.key || condition.id || condition.name;
      const meta = catalog[key] || Object.values(catalog).find(item => item.name === condition.name) || { name: condition.name, hasValue: condition.value !== undefined };
      const val = condition.value;
      const displayName = meta.name.split(" ")[0];
      const locName = this.localizeItemName(displayName, locale);
      const safeKey = escapeInlineArgument(key);

      if (meta.hasValue || val !== undefined) {
        return `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;" title="${escapeHtml(meta.description || "")}">
            <span>🩸 ${escapeHtml(locName)} ${val}</span>
            <button type="button" onclick="app.setConditionLevel(${safeKey}, -1)" style="background: none; border: none; color: #fca5a5; cursor: pointer; font-weight: bold; padding: 0 2px;">-</button>
            <button type="button" onclick="app.setConditionLevel(${safeKey}, 1)" style="background: none; border: none; color: #fca5a5; cursor: pointer; font-weight: bold; padding: 0 2px;">+</button>
          </div>
        `;
      }

      return `
        <div style="background: rgba(234, 88, 12, 0.15); border: 1px solid rgba(234, 88, 12, 0.4); color: #fdba74; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;" title="${escapeHtml(meta.description || "")}">
          <span>⚡ ${escapeHtml(locName)}</span>
          <button type="button" onclick="app.setConditionLevel(${safeKey}, 0)" style="background: none; border: none; color: #fdba74; cursor: pointer; font-weight: bold; padding: 0 2px;">✕</button>
        </div>
      `;
    }).join("");
  }

  setConditionLevel(condKey, delta) {
    if (!this.character) return;
    const conditions = this.normalizeConditionList();
    const index = conditions.findIndex(condition => condition.key === condKey || condition.id === condKey || condition.name === condKey);
    const current = index >= 0 ? Number(conditions[index].value) || 1 : 0;

    if (index < 0 && delta > 0) conditions.push({ key: condKey, name: condKey, value: 1 });
    else if (index >= 0 && delta === 0) conditions.splice(index, 1);
    else if (index >= 0) {
      const next = Math.max(0, current + delta);
      if (next === 0) conditions.splice(index, 1);
      else conditions[index].value = next;
    }

    this.saveCharacterLocal();
    this.renderAll();
  }

  clearAllConditions() {
    if (!this.character) return;
    this.character.conditions = [];
    this.saveCharacterLocal();
    this.renderAll();
  }

  tickEndTurnConditions() {
    if (!this.character || !this.character.conditions) return;
    const conditions = this.normalizeConditionList();
    const frightened = conditions.findIndex(condition => /amedrontado|frightened/i.test(condition.name || condition.key || ""));
    if (frightened >= 0) {
      conditions[frightened].value = Math.max(0, (Number(conditions[frightened].value) || 1) - 1);
      if (conditions[frightened].value === 0) conditions.splice(frightened, 1);
    }
    this.saveCharacterLocal();
    this.renderAll();
  }

  // =========================================================================
  // 5. MOTOR DE SPELLCASTING, FOCO E RECUPERAÇÃO DE SLOTS
  // =========================================================================
  adjustFocusPoints(delta) {
    if (!this.character) return;
    const maxFocus = this.calc?.spellcasting?.maxFocusPoints || 1;
    const current = this.character.focusPoints !== undefined ? this.character.focusPoints : maxFocus;
    this.character.focusPoints = Math.max(0, Math.min(maxFocus, current + delta));
    this.saveCharacterLocal();
    this.renderAll();
  }

  restAndRecoverSlots() {
    if (!this.character) return;
    this.character.usedSpellSlots = {};
    this.character.focusPoints = this.calc?.spellcasting?.maxFocusPoints || 1;
    this.saveCharacterLocal();
    this.renderAll();
    alert("💤 Todos os espaços de magia e pontos de foco foram totalmente restaurados!");
  }
}

// Inicializa a aplicação Pathbuilder 2e Local
window.app = new PathbuilderApp();
