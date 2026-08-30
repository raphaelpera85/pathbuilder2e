/**
 * PF2E_AI_ASSISTANT - ASSISTENTE DE IA ESPECIALISTA EM PATHFINDER 2E REMASTER (100% GRATUITO)
 * 
 * Gera personagens completos, otimizados e balanceados a partir de prompts em linguagem natural,
 * conceitos de RPG ou botões rápidos. Funciona 100% no navegador sem exigir chaves de API.
 */

(function(global) {
  "use strict";

  const PF2E_AI_ASSISTANT = {
    // Banco de Conceitos Rápidos Populares
    quickPresets: [
      {
        title: "🛡️ Anão Guardião Bastião",
        prompt: "Quero um guerreiro anão tanque muito resistente com machado de batalha e escudo pesado de aço, focado em alta defesa e proteção dos aliados."
      },
      {
        title: "⚡ Centauro Animista dos Espíritos",
        prompt: "Crie um animista centauro sábio curandeiro que canaliza aparições ancestrais de tempestade e cura mágica."
      },
      {
        title: "🗡️ Ladino Esqueleto Sombrio",
        prompt: "Faça um ladino assassino esqueleto muito furtivo e ágil com duas adagas envenenadas e ataque furtivo nas sombras."
      },
      {
        title: "✨ Exemplar Radiante Mítico",
        prompt: "Quero um exemplar semidivino com a centelha da lâmina radiante, focado em combate glorioso e feitos heroicos transcendentais."
      },
      {
        title: "📯 Comandante Tático da Vanguarda",
        prompt: "Crie um comandante humano genial com estandarte militar e espada longa, especialista em liderar e coordenar ataques de esquadrão."
      },
      {
        title: "🐂 Minotauro Bárbaro Furioso",
        prompt: "Quero um minotauro bárbaro gigante do instinto animal com clava pesada de duas mãos e chifres brutais de impacto."
      },
      {
        title: "🔥 Feiticeiro Dracônico de Fogo",
        prompt: "Faça um gnomo feiticeiro carismático com linhagem dracônica vermelha, focado em bolas de fogo, sopro flamejante e magia espontânea."
      },
      {
        title: "🥋 Monge Animal Desperto",
        prompt: "Crie um animal desperto monge ágil com postura do tigre e rajada de golpes velozes no combate desarmado."
      },
      {
        title: "🧪 Goblin Alquimista Piromaníaco",
        prompt: "Quero um alquimista goblin bombardeiro caótico com bombas de fogo alquímico e venenos rápidos."
      },
      {
        title: "🌿 Cineticista dos Elementos",
        prompt: "Crie um cineticista humano que controla água e madeira para curar e desferir jatos de energia elemental pura."
      }
    ],

    // Mapeamento semântico de palavras-chave para Classes do PF2E
    classKeywords: {
      "Exemplar (Exemplar)": ["exemplar", "semidivino", "divino", "ikon", "transcendencia", "centelha", "mítico", "herói divino"],
      "Animista (Animist)": ["animista", "animist", "espírito", "espiritual", "aparição", "aparições", "xamã", "mediun"],
      "Comandante (Commander)": ["comandante", "commander", "tático", "estrategista", "lider", "liderança", "estandarte", "ordens"],
      "Guardião (Guardian)": ["guardião", "guardian", "muralha", "interceptar", "provocar", "protetor de escudo", "bastião"],
      "Guerreiro (Fighter)": ["guerreiro", "fighter", "espadachim pesado", "soldado", "mestre de armas", "gladiador", "marcial"],
      "Bárbaro (Barbarian)": ["bárbaro", "barbaro", "barbarian", "fúria", "furioso", "berserker", "instinto"],
      "Ladino (Rogue)": ["ladino", "rogue", "assassino", "furtivo", "ladrão", "espião", "emboscada", "veneno"],
      "Mago (Wizard)": ["mago", "wizard", "arcano", "grimório", "estudioso", "magia preparada", "escola de magia"],
      "Feiticeiro (Sorcerer)": ["feiticeiro", "sorcerer", "linhagem", "dracônico", "magia no sangue", "espontâneo"],
      "Clérigo (Cleric)": ["clérigo", "clerigo", "cleric", "sacerdote", "deus", "divino", "cura divina", "canalização"],
      "Druida (Druid)": ["druida", "druid", "natureza", "primal", "forma selvagem", "selvagem", "planta", "animais"],
      "Bardo (Bard)": ["bardo", "bard", "músico", "inspiração", "orador", "poeta", "compositor", "oculto"],
      "Patrulheiro (Ranger)": ["patrulheiro", "ranger", "arqueiro", "caçador", "rastreador", "presa", "arco"],
      "Campeão (Champion)": ["campeão", "campeao", "champion", "paladino", "sagrado", "redentor", "defensor sagrado"],
      "Monge (Monk)": ["monge", "monk", "marcial", "desarmado", "postura", "rajada de golpes", "artes marciais", "chi"],
      "Alquimista (Alchemist)": ["alquimista", "alchemist", "bomba", "poções", "elixir", "fórmula", "fogo alquímico"],
      "Magus": ["magus", "espada mágica", "ataque mágico", "spellstrike", "lâmina arcana"],
      "Convocador (Summoner)": ["convocador", "summoner", "eidolon", "companheiro mágico", "manifestação"],
      "Investigador (Investigator)": ["investigador", "investigator", "detetive", "dedução", "pista"],
      "Espadachim (Swashbuckler)": ["espadachim", "swashbuckler", "duelista", "panache", "estilo", "acrobático"],
      "Bruxo (Witch)": ["bruxo", "bruxa", "witch", "familiar", "patrono", "maldição", "caldeirão"],
      "Cineticista (Kineticist)": ["cineticista", "kineticist", "elemental", "fogo", "água", "terra", "madeira", "metal", "ar"],
      "Psíquico (Psychic)": ["psíquico", "psiquico", "psychic", "mente", "psiônico", "telecinese"],
      "Taumaturgo (Thaumaturge)": ["taumaturgo", "thaumaturge", "esotérico", "implemento", "antiguidade", "fraqueza"]
    },

    // Mapeamento semântico de palavras-chave para Ancestralidades
    ancestryKeywords: {
      "Anão (Dwarf)": ["anão", "anao", "dwarf", "forja", "pedra", "subterrâneo", "montanha"],
      "Elfo (Elf)": ["elfo", "elf", "élfico", "agilidade ancestral", "floresta antiga"],
      "Humano": ["humano", "human", "versátil", "adaptável", "imperial"],
      "Gnomo (Gnome)": ["gnomo", "gnome", "fadas", "curioso", "ilusão"],
      "Goblin": ["goblin", "piromaníaco", "fogo", "maluco", "mordida", "engenhocas"],
      "Halfling": ["halfling", "pequenino", "sortudo", "corajoso", "hobb"],
      "Orc": ["orc", "ferocidade", "resistência brutal", "brutal"],
      "Leshy": ["leshy", "planta", "semente", "cabaça", "espírito vegetal"],
      "Centauro (Centaur)": ["centauro", "centaur", "cavalo", "quadrúpede", "planícies"],
      "Minotauro (Minotaur)": ["minotauro", "minotaur", "chifres", "touro", "labirinto"],
      "Esqueleto (Skeleton)": ["esqueleto", "skeleton", "morto-vivo", "ossos", "tumba", "reanimado"],
      "Animal Desperto (Awakened Animal)": ["animal desperto", "animal", "lobo", "urso", "felino", "fera consciente", "pássaro"],
      "Tritão / Sereia (Merfolk)": ["tritão", "sereia", "merfolk", "aquático", "oceano", "marítimo", "cauda"],
      "Athamaru (Povo-Peixe)": ["athamaru", "peixe", "guelras", "coral"],
      "Surki (Povo-Inseto)": ["surki", "inseto", "carapaça", "subterrâneo profundo"],
      "Catfolk (Amurrun / Povo-Gato)": ["povo-gato", "catfolk", "amurrun", "felino", "gato"],
      "Ratfolk (Ysoki / Povo-Rato)": ["povo-rato", "ratfolk", "ysoki", "roedor"],
      "Kobold": ["kobold", "pequeno réptil", "escama dracônica"],
      "Lizardfolk (Iruxi / Homem-Lagarto)": ["homem-lagarto", "lizardfolk", "iruxi", "réptil"],
      "Kitsune": ["kitsune", "raposa", "metamorfo raposino"],
      "Tengu": ["tengu", "corvo", "homem-pássaro"],
      "Tripkee": ["tripkee", "sapo", "anfíbio", "grippli"],
      "Autômato (Automaton)": ["autômato", "automato", "automaton", "constructo", "robô", "mecânico"],
      "Andróide (Android)": ["andróide", "androide", "android", "cibernético", "circuitos"],
      "Gnoll (Kholo)": ["gnoll", "kholo", "hiena"],
      "Hobgoblin": ["hobgoblin", "disciplina militar"]
    },

    // Identificador Inteligente de Intenção
    parsePrompt(prompt) {
      const text = (prompt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // 1. Detecta Classe
      let detectedClass = null;
      for (const [clsName, kwList] of Object.entries(this.classKeywords)) {
        if (kwList.some(kw => text.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
          detectedClass = clsName;
          break;
        }
      }
      if (!detectedClass) {
        if (text.includes("tanque") || text.includes("defesa") || text.includes("escudo")) detectedClass = "Guardião (Guardian)";
        else if (text.includes("magia") || text.includes("feitico") || text.includes("conjurador")) detectedClass = "Feiticeiro (Sorcerer)";
        else if (text.includes("furtivo") || text.includes("assassino")) detectedClass = "Ladino (Rogue)";
        else detectedClass = "Guerreiro (Fighter)";
      }

      // 2. Detecta Ancestralidade
      let detectedAncestry = null;
      for (const [ancName, kwList] of Object.entries(this.ancestryKeywords)) {
        if (kwList.some(kw => text.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
          detectedAncestry = ancName;
          break;
        }
      }
      if (!detectedAncestry) {
        if (text.includes("pesado") || text.includes("forja")) detectedAncestry = "Anão (Dwarf)";
        else if (text.includes("agil") || text.includes("rapido")) detectedAncestry = "Elfo (Elf)";
        else if (text.includes("espiritual") || text.includes("fera")) detectedAncestry = "Centauro (Centaur)";
        else detectedAncestry = "Humano";
      }

      return { detectedClass, detectedAncestry, rawText: text };
    },

    // Geração Completa do Personagem
    generateCharacter(userPrompt) {
      const data = typeof PF2E_DATA !== "undefined" ? PF2E_DATA : (globalThis.PF2E_DATA || (typeof window !== "undefined" ? window.PF2E_DATA : {}));
      const { detectedClass, detectedAncestry, rawText } = this.parsePrompt(userPrompt);
      const classData = data?.classes?.[detectedClass] || data?.classes?.["Guerreiro (Fighter)"] || {};
      const ancestryData = data?.ancestries?.[detectedAncestry] || data?.ancestries?.["Humano"] || {};

      // 1. Escolha de Herança adequada
      const heritages = ancestryData.heritages || ["Herança Padrão"];
      let chosenHeritage = heritages[0];
      if (rawText.includes("escudo") || rawText.includes("resistencia") || rawText.includes("armadura")) {
        const defensiveH = heritages.find(h => h.includes("Encouraçado") || h.includes("Couro") || h.includes("Robusto") || h.includes("Dureza"));
        if (defensiveH) chosenHeritage = defensiveH;
      }

      // 2. Escolha de Subclasse da Classe
      const subclasses = classData.subclasses || ["Especialização Padrão"];
      let chosenSubclass = subclasses[0];
      if (rawText.includes("escudo") || rawText.includes("defesa")) {
        const defSub = subclasses.find(s => s.includes("Escudo") || s.includes("Bastião") || s.includes("Defesa") || s.includes("Sparkling"));
        if (defSub) chosenSubclass = defSub;
      } else if (rawText.includes("ataque") || rawText.includes("fogo") || rawText.includes("dano") || rawText.includes("ofensiv")) {
        const offSub = subclasses.find(s => s.includes("Vanguarda") || s.includes("Chamas") || s.includes("Ofensiv") || s.includes("Dragão") || s.includes("Lâmina"));
        if (offSub) chosenSubclass = offSub;
      }

      // 3. Escolha do Antecedente
      const backgrounds = data?.backgrounds || [];
      let chosenBackground = backgrounds[0]?.name || "Guarda da Cidade (Guard)";
      if (detectedClass.includes("Guardião") || detectedClass.includes("Guerreiro")) {
        chosenBackground = "Guarda da Cidade (Guard)";
      } else if (detectedClass.includes("Animista") || detectedClass.includes("Clérigo") || detectedClass.includes("Druida")) {
        chosenBackground = "Eremita (Hermit)";
      } else if (detectedClass.includes("Ladino") || detectedClass.includes("Espadachim")) {
        chosenBackground = "Criminoso (Criminal)";
      } else if (detectedClass.includes("Mago") || detectedClass.includes("Alquimista")) {
        chosenBackground = "Estudante da Academia (Scholar)";
      } else if (detectedClass.includes("Comandante")) {
        chosenBackground = "Herdeiro Nobre (Noble)";
      } else if (detectedClass.includes("Exemplar")) {
        chosenBackground = "Gladiador (Gladiator)";
      }

      // 4. Distribuição Inteligente de Atributos (Pipeline Remaster)
      // Definimos o atributo primário da classe em 18 (+4), secundário em 14/16 (+2/+3), Con em 14 (+2)
      const primaryAttr = classData.keyAbility?.[0] || "Força";
      const isSpellcasterWis = ["Animista (Animist)", "Clérigo (Cleric)", "Druida (Druid)"].some(c => detectedClass.includes(c));
      const isSpellcasterInt = ["Mago (Wizard)", "Alquimista (Alchemist)", "Bruxo (Witch)", "Comandante (Commander)"].some(c => detectedClass.includes(c));
      const isSpellcasterCha = ["Feiticeiro (Sorcerer)", "Bardo (Bard)", "Oráculo (Oracle)", "Taumaturgo (Thaumaturge)"].some(c => detectedClass.includes(c));
      const isFinesse = ["Ladino (Rogue)", "Espadachim (Swashbuckler)", "Pistoleiro (Gunslinger)"].some(c => detectedClass.includes(c));

      let scores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

      if (primaryAttr === "Força" || detectedClass.includes("Guardião") || detectedClass.includes("Bárbaro") || detectedClass.includes("Guerreiro")) {
        scores = { str: 18, dex: 12, con: 14, int: 10, wis: 12, cha: 10 };
      } else if (isFinesse || primaryAttr === "Destreza") {
        scores = { str: 12, dex: 18, con: 14, int: 12, wis: 10, cha: 12 };
      } else if (isSpellcasterWis) {
        scores = { str: 10, dex: 14, con: 14, int: 10, wis: 18, cha: 12 };
      } else if (isSpellcasterInt) {
        scores = { str: 10, dex: 14, con: 14, int: 18, wis: 12, cha: 10 };
      } else if (isSpellcasterCha) {
        scores = { str: 10, dex: 14, con: 14, int: 10, wis: 12, cha: 18 };
      } else {
        scores = { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 10 };
      }

      // 5. Armadura e Escudo Recomendados
      let equippedArmor = { name: "Roupas de Explorador", category: "Sem Armadura", acBonus: 0, dexCap: 5, bulk: 0 };
      const armorProf = classData.armor || {};
      let shieldRaised = false;

      if (armorProf["Pesada"] === "Especialista" || armorProf["Pesada"] === "Treinado" || detectedClass.includes("Guardião") || detectedClass.includes("Campeão")) {
        equippedArmor = { name: "Armadura de Placas Completa", category: "Pesada", acBonus: 6, dexCap: 0, bulk: 4, checkPenalty: -3, speedPenalty: -10 };
        shieldRaised = true;
      } else if (armorProf["Média"] === "Treinado" || armorProf["Média"] === "Especialista") {
        equippedArmor = { name: "Cota de Malha Reforçada", category: "Média", acBonus: 4, dexCap: 1, bulk: 2, checkPenalty: -2, speedPenalty: -5 };
        if (rawText.includes("escudo") || detectedClass.includes("Guerreiro") || detectedClass.includes("Guardião")) shieldRaised = true;
      } else if (armorProf["Leve"] === "Treinado") {
        equippedArmor = { name: "Couro Batido Reforçado", category: "Leve", acBonus: 2, dexCap: 3, bulk: 1 };
      }

      // 6. Armas Recomendadas
      let weapons = [];
      if (detectedClass.includes("Guardião") || detectedClass.includes("Guerreiro") || rawText.includes("machado")) {
        weapons.push({ name: "Machado de Batalha de Aço", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Varredura"] });
        weapons.push({ name: "Escudo de Aço Pesado (Hardness 5, HP 20)", category: "Escudo", damage: "1d4", damageType: "Impacto", traits: ["Aparar"] });
      } else if (detectedClass.includes("Exemplar")) {
        weapons.push({ name: "Lança Radiante Divina", category: "Marcial", damage: "1d8", damageType: "Perfuração", traits: ["Alcance", "Sagrado", "Mortal d10"] });
      } else if (detectedClass.includes("Comandante")) {
        weapons.push({ name: "Espada Longa de Comando", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] });
        weapons.push({ name: "Estandarte Tático de Batalha", category: "Item", damage: "-", damageType: "-", traits: ["Aura de Moral"] });
      } else if (detectedClass.includes("Animista") || detectedClass.includes("Clérigo") || detectedClass.includes("Druida")) {
        weapons.push({ name: "Bordão Espiritual Entalhado", category: "Simples", damage: "1d6", damageType: "Impacto", traits: ["Duas Mãos d8"] });
      } else if (isFinesse || detectedClass.includes("Ladino")) {
        weapons.push({ name: "Adaga Envenenada Furtiva", category: "Simples", damage: "1d4", damageType: "Perfuração", traits: ["Ágil", "Acurada", "Arremesso 10 pés"] });
        weapons.push({ name: "Rapieira Precisa", category: "Marcial", damage: "1d6", damageType: "Perfuração", traits: ["Acurada", "Mortal d8", "Desarmar"] });
      } else {
        weapons.push({ name: "Espada Curta da Guarda", category: "Simples", damage: "1d6", damageType: "Perfuração", traits: ["Ágil", "Acurada", "Versátil C"] });
      }

      // 7. Perícias Treinadas
      const skills = {
        athletics: "Destreinado", acrobatics: "Destreinado", stealth: "Destreinado", thievery: "Destreinado",
        arcana: "Destreinado", nature: "Destreinado", occultism: "Destreinado", religion: "Destreinado",
        society: "Destreinado", diplomacy: "Destreinado", deception: "Destreinado", intimidation: "Destreinado",
        medicine: "Destreinado", survival: "Destreinado", crafting: "Destreinado", performance: "Destreinado"
      };

      if (scores.str >= 14) skills.athletics = "Treinado";
      if (scores.dex >= 14) { skills.acrobatics = "Treinado"; skills.stealth = "Treinado"; }
      if (scores.wis >= 14) { skills.medicine = "Treinado"; skills.perception = "Treinado"; skills.survival = "Treinado"; }
      if (scores.int >= 14) { skills.arcana = "Treinado"; skills.crafting = "Treinado"; skills.society = "Treinado"; }
      if (scores.cha >= 14) { skills.diplomacy = "Treinado"; skills.intimidation = "Treinado"; skills.deception = "Treinado"; }

      // Garante perícias fixas da classe
      if (classData.fixedSkills) {
        classData.fixedSkills.forEach(sk => { if (skills[sk]) skills[sk] = "Treinado"; });
      }

      // 8. Nome e Descrição de Conceito
      const randomNames = ["Valerius", "Thorgar", "Lyra", "Kaelen", "Morgrim", "Selene", "Brant", "Aeloria", "Drakon", "Elowen", "Grommash", "Zenobia"];
      const charName = `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${detectedAncestry.split(" ")[0]}`;

      const generatedDoc = {
        id: `char_${Date.now()}`,
        name: charName,
        level: 1,
        ancestry: detectedAncestry,
        heritage: chosenHeritage,
        class: detectedClass,
        subclass: chosenSubclass,
        background: chosenBackground,
        shieldRaised: shieldRaised,
        abilities: scores,
        savingThrows: classData.savingThrows || { fortitude: "Treinado", reflex: "Treinado", will: "Treinado" },
        perceptionRank: classData.perception || "Treinado",
        equippedArmor: equippedArmor,
        weapons: weapons,
        skills: skills,
        loreSkills: [
          { name: `Saber de ${chosenBackground.split(" ")[0]}`, rank: "Treinado" },
          { name: "Saber de Batalha", rank: "Treinado" }
        ],
        coins: { gp: 8, sp: 5, cp: 0 },
        aiNotes: {
          conceptPitch: `Personagem gerado por IA especialista para o conceito: "${userPrompt.slice(0, 100)}..."`,
          combatRole: detectedClass.includes("Guardião") || detectedClass.includes("Guerreiro") ? "🛡️ Tanque de Vanguarda" : (isSpellcasterWis || isSpellcasterInt || isSpellcasterCha ? "✨ Conjurador e Suporte" : "⚔️ Dano e Especialista de Perícias"),
          tacticalTip: `Utilize sua chave de atributo (${primaryAttr} ${scores[primaryAttr.slice(0,3).toLowerCase()] || 18}) para garantir acertos críticos e proteger o grupo.`
        }
      };

      return generatedDoc;
    }
  };

  const target = typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this);
  target.PF2E_AI_ASSISTANT = PF2E_AI_ASSISTANT;
  if (typeof window !== "undefined") window.PF2E_AI_ASSISTANT = PF2E_AI_ASSISTANT;
  if (typeof global !== "undefined") global.PF2E_AI_ASSISTANT = PF2E_AI_ASSISTANT;
})(typeof globalThis !== "undefined" ? globalThis : (typeof window !== "undefined" ? window : this));
