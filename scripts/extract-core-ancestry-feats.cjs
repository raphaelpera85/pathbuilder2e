const fs = require("fs");
const path = require("path");

const pc1TxtPath = "D:/Users/rapha/Documents/Projetos/RPG/livros/[ REMASTER ] (2023-12) PF2e \u2013 Livro do Jogador.txt";
const txt = fs.readFileSync(pc1TxtPath, "utf8");

// Map of ancestry section start positions and page mapping
const ancestries = [
  { name: "Anão", en: "Dwarf", es: "Enano", idPrefix: "feat.ancestry.dwarf", page: 44, startPos: 275000, endPos: 300000 },
  { name: "Elfo", en: "Elf", es: "Elfo", idPrefix: "feat.ancestry.elf", page: 48, startPos: 305000, endPos: 335000 },
  { name: "Gnomo", en: "Gnome", es: "Gnomo", idPrefix: "feat.ancestry.gnome", page: 52, startPos: 338000, endPos: 365000 },
  { name: "Goblin", en: "Goblin", es: "Goblin", idPrefix: "feat.ancestry.goblin", page: 56, startPos: 368000, endPos: 395000 },
  { name: "Halfling", en: "Halfling", es: "Mediano", idPrefix: "feat.ancestry.halfling", page: 60, startPos: 398000, endPos: 430000 },
  { name: "Humano", en: "Human", es: "Humano", idPrefix: "feat.ancestry.human", page: 64, startPos: 432000, endPos: 465000 },
  { name: "Leshy", en: "Leshy", es: "Leshy", idPrefix: "feat.ancestry.leshy", page: 68, startPos: 468000, endPos: 495000 },
  { name: "Orc", en: "Orc", es: "Orco", idPrefix: "feat.ancestry.orc", page: 72, startPos: 498000, endPos: 525000 },
  { name: "Cambiante", en: "Changeling", es: "Cambiante", idPrefix: "feat.ancestry.changeling", page: 76, startPos: 528000, endPos: 550000 },
  { name: "Nefilim", en: "Nephilim", es: "Nefilim", idPrefix: "feat.ancestry.nephilim", page: 78, startPos: 552000, endPos: 590000 },
];

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^fo\s+/, "")
    .replace(/^elfo\s+/, "")
    .replace(/^murrun\s+/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// English mapping dictionary for standard PF2e remaster feats
const enNames = {
  // Anão
  "correr_nas_rochas": "Rock Runner",
  "estrategia_da_montanha": "Mountain's Stoutness",
  "saber_enanico": "Dwarven Lore",
  "valentia_enanica": "Dwarven Bravado",
  "familiaridade_com_armas_enanicas": "Dwarven Weapon Familiarity",
  "ferro_desimpedido": "Unburdened Iron",
  "olho_do_pedreiro": "Stonecunning",
  "desafiar_a_escuridao": "Defy the Darkness",
  "reforco_enanico": "Dwarven Reinforcement",
  "rolagem_de_pedregulho": "Boulder Roll",
  "poder_telurico": "Telluric Power",
  "portal_de_pedra": "Stonegate",
  // Elfo
  "semblante_inabalavel": "Unwavering Mien",
  "elfo_abandonado": "Forlorn",
  "elfo_ligeiro": "Nimble Elf",
  "longevidade_ancestral": "Ancestral Longevity",
  "magia_extraterrena": "Otherworldly Magic",
  "saber_elfico": "Elven Lore",
  "familiaridade_com_armas_elficas": "Elven Weapon Familiarity",
  "experiencia_marcial": "Martial Experience",
  "paciencia_eterna": "Ageless Patience",
  "suspeita_ancestral": "Ancestral Suspicion",
  "escalador_de_arvores": "Tree Climber",
  "longevidade_de_especialista": "Expert Longevity",
  "perspicacia_extraterrena": "Otherworldly Acumen",
  "viajante_magico": "Magic's Vessel",
  // Gnomo
  "magia_do_primeiro_mundo": "First World Magic",
  "obsessao_gnomica": "Gnome Obsession",
  "cumplice_animal": "Animal Accomplice",
  "sentir_ilusao": "Illusion Sense",
  "companheiro_das_fadas": "Fey Fellowship",
  "elocucionista_animal": "Animal Elocutionist",
  "familiaridade_com_armas_gnomicas": "Gnome Weapon Familiarity",
  "curiosidade_cautelosa": "Cautious Curiosity",
  "de_volta_para_casa": "Homeward Bound",
  "algazarra": "Empathetic Plea",
  // Goblin
  "muito_sorrateiro": "Very Sneaky",
  "catador_da_cidade": "City Scavenger",
  "cavaleiro_brusco": "Rough Rider",
  "saber_goblinico": "Goblin Lore",
  "familiaridade_com_armas_de_goblin": "Goblin Weapon Familiarity",
  "funileiro_de_sucata": "Junk Tinker",
  "cantar_alto": "Goblin Song",
  "vandalo": "Vandal",
  "corridinha_de_goblin": "Goblin Scurry",
  // Halfling
  "cavaleiro_de_pradaria": "Prairie Rider",
  "distracao_nas_sombras": "Distracting Shadows",
  "halfling_liberto": "Unfettered Halfling",
  "expressoes_idiomaticas": "Cultural Adaptability",
  "pes_firmes": "Surefoot",
  "saber_halfling": "Halfling Lore",
  "familiaridade_com_armas_de_halfling": "Halfling Weapon Familiarity",
  "fundeiro_titanico": "Titan Slinger",
  "halfling_atento": "Watchful Halfling",
  "adaptabilidade_cultural": "Cultural Adaptability",
  "dancar_sob_pernas": "Dance Underfoot",
  "irreprimivel": "Irrepressible",
  "passagem_desimpedida": "Unobstructed Path",
  "sorte_guiada": "Guiding Luck",
  "dancar_e_tombar": "Dance and Tumble",
  "sombras_incessantes": "Ceaseless Shadows",
  "na_propria_sombra": "Shadow Self",
  // Humano
  "ambicao_natural": "Natural Ambition",
  "armamento_nao_convencional": "Unconventional Weaponry",
  "obstinacao_altiva": "Haughty Obstinacy",
  "pericia_natural": "Natural Skill",
  "treinamento_geral": "General Training",
  "discipulo_adaptativo": "Adaptive Adept",
  "improvisador_astuto": "Clever Improviser",
  "perceber_aliados": "Sense Allies",
  "alma_cooperativa": "Cooperative Soul",
  "auxiliar_o_grupo": "Group Aid",
  "multitalentoso": "Multitalented",
  "viajante_calejado": "Hardy Traveler",
  // Leshy
  "sombra_dos_ermos": "Shadow of the Wild",
  "alcance_alongado": "Grasping Reach",
  "disparar_sementes": "Seedpod",
  "fofura_inofensiva": "Harmlessly Cute",
  "impavido": "Undaunted",
  "saber_leshyn": "Leshy Lore",
  "falar_com_parentes": "Speak with Kindred",
  "raizes_ancorantes": "Anchoring Roots",
  "disparar_sementes_espinhosas": "Thorned Seedpod",
  "chamado_do_homem_verde": "Call of the Green Man",
  "florescimento_e_ruina": "Bloom and Doom",
  "rebrotar": "Regrowth",
  // Orc
  "punhos_de_ferro": "Iron Fists",
  "saber_orquico": "Orc Lore",
  "familiaridade_com_armas_orquicas": "Orc Weapon Familiarity",
  "treinador_de_feras": "Beast Trainer",
  "marca_do_dominio": "Mark of Dominion",
  "presas": "Tusks",
  "desafiar_a_morte": "Defy Death",
  "golpes_sangrentos": "Bloody Blows",
  "poderio_atletico": "Athletic Might",
  "ferocidade_imortal": "Undying Ferocity",
  "devorador_de_magias": "Spell Eater",
  // Cambiante
  "donzela_escoriacea": "Slag May",
  "visao_de_estriga": "Hag Eyes",
  "donzela_inocente": "Child of the Snow",
  "chamado": "The Call",
  "donzela_onirica": "Dream May",
  "crianca_das_brumas": "Mist Child",
  "garras_amaldicoadas": "Cursed Claws",
  "donzela_salobra": "Brine May",
  "resistencia_ocultista": "Occult Resistance",
  "garras_de_estriga": "Hag Claws",
  "magia_de_estriga": "Hag Magic",
  "saber_cambiante": "Changeling Lore",
  // Nefilim
  "prole_nefasta": "Grim Spawn",
  "tocado_pela_musa": "Musetouched",
  "angelical": "Angelkin",
  "arauto_da_lei": "Lawbringer",
  "nascido_do_fosso": "Pitborn",
  "prole_infernal": "Hellspawn",
  "aureola": "Halo",
  "herdeiro_de_muitos_planos": "Heir of the Planes",
  "cascos_ligeiros": "Swift Hooves",
  "resistencia_de_nefilim": "Nephilim Resistance",
  "manifestacao_bestial": "Beast Manifestation",
  "sangue_abencoado": "Blessed Blood",
  "olhos_de_nefilim": "Eyes of the Nephilim",
  "suplica_extraplanar": "Planar Plea",
  "saber_nefelinico": "Nephilim Lore",
  "cauda_habilidosa": "Prehensile Tail",
  "magia_celestial": "Celestial Magic",
  "asas_eternas": "Eternal Wings",
  "declaracao_divina": "Divine Proclamation",
  "magia_inferal": "Fiendish Magic"
};

const esNames = {
  "correr_nas_rochas": "Corredor de las rocas",
  "estrategia_da_montanha": "Firmeza de la montaña",
  "saber_enanico": "Saber enano",
  "valentia_enanica": "Bravura enana",
  "familiaridade_com_armas_enanicas": "Familiaridad con armas enanas",
  "ferro_desimpedido": "Hierro sin trabas",
  "olho_do_pedreiro": "Ojo del cantero",
  "desafiar_a_escuridao": "Desafiar la oscuridad",
  "reforco_enanico": "Refuerzo enano",
  "rolagem_de_pedregulho": "Rodar como canto",
  "poder_telurico": "Poder telúrico",
  "portal_de_pedra": "Portal de piedra",
  "semblante_inabalavel": "Semblante inquebrantable",
  "elfo_abandonado": "Desamparado",
  "elfo_ligeiro": "Elfo ágil",
  "longevidade_ancestral": "Longevidad ancestral",
  "magia_extraterrena": "Magia de otro mundo",
  "saber_elfico": "Saber élfico",
  "familiaridade_com_armas_elficas": "Familiaridad con armas élficas",
  "experiencia_marcial": "Experiencia marcial",
  "paciencia_eterna": "Paciencia eterna",
  "suspeita_ancestral": "Sospecha ancestral",
  "escalador_de_arvores": "Trepatrepadores",
  "longevidade_de_especialista": "Longevidad de experto",
  "perspicacia_extraterrena": "Perspicacia de otro mundo",
  "viajante_magico": "Viajero mágico",
  "magia_do_primeiro_mundo": "Magia del Primer Mundo",
  "obsessao_gnomica": "Obsesión gnómica",
  "cumplice_animal": "Cómplice animal",
  "sentir_ilusao": "Sentir ilusión",
  "companheiro_das_fadas": "Compañerismo feérico",
  "elocucionista_animal": "Elocucionista animal",
  "familiaridade_com_armas_gnomicas": "Familiaridad con armas gnómicas",
  "curiosidade_cautelosa": "Curiosidad cautelosa",
  "de_volta_para_casa": "Regreso al hogar",
  "algazarra": "Plegaria empática",
  "muito_sorrateiro": "Muy sigiloso",
  "catador_da_cidade": "Carroñero de ciudad",
  "cavaleiro_brusco": "Jinete rudo",
  "saber_goblinico": "Saber trasgo",
  "familiaridade_com_armas_de_goblin": "Familiaridad con armas de trasgo",
  "funileiro_de_sucata": "Chatarrero",
  "cantar_alto": "Canción de trasgo",
  "vandalo": "Vándalo",
  "corridinha_de_goblin": "Carrera de trasgo",
  "cavaleiro_de_pradaria": "Jinete de la pradera",
  "distracao_nas_sombras": "Distracción en las sombras",
  "halfling_liberto": "Mediano liberado",
  "expressoes_idiomaticas": "Expresiones idiomáticas",
  "pes_firmes": "Pies firmes",
  "saber_halfling": "Saber mediano",
  "familiaridade_com_armas_de_halfling": "Familiaridad con armas de mediano",
  "fundeiro_titanico": "Hondero titánico",
  "halfling_atento": "Mediano vigilante",
  "adaptabilidade_cultural": "Adaptabilidad cultural",
  "dancar_sob_pernas": "Bailar bajo las piernas",
  "irreprimivel": "Irreprimible",
  "passagem_desimpedida": "Paso despejado",
  "sorte_guiada": "Suerte guiada",
  "dancar_e_tombar": "Bailar y rodar",
  "sombras_incessantes": "Sombras incesantes",
  "na_propria_sombra": "En la propia sombra",
  "ambicao_natural": "Ambición natural",
  "armamento_nao_convencional": "Armamento no convencional",
  "obstinacao_altiva": "Obstinación altiva",
  "pericia_natural": "Habilidad natural",
  "treinamento_geral": "Entrenamiento general",
  "discipulo_adaptativo": "Discípulo adaptativo",
  "improvisador_astuto": "Improvisador astuto",
  "perceber_aliados": "Sentir aliados",
  "alma_cooperativa": "Alma cooperativa",
  "auxiliar_o_grupo": "Auxiliar al grupo",
  "multitalentoso": "Multitalentoso",
  "viajante_calejado": "Viajero curtido",
  "sombra_dos_ermos": "Sombra de los yermos",
  "alcance_alongado": "Alcance extendido",
  "disparar_sementes": "Disparar semillas",
  "fofura_inofensiva": "Ternura inofensiva",
  "impavido": "Impávido",
  "saber_leshyn": "Saber leshy",
  "falar_com_parentes": "Hablar con semejantes",
  "raizes_ancorantes": "Raíces ancladas",
  "disparar_sementes_espinhosas": "Disparar semillas espinosas",
  "chamado_do_homem_verde": "Llamada del hombre verde",
  "florescimento_e_ruina": "Floración y ruina",
  "rebrotar": "Rebrote",
  "punhos_de_ferro": "Puños de hierro",
  "saber_orquico": "Saber orco",
  "familiaridade_com_armas_orquicas": "Familiaridad con armas orcas",
  "treinador_de_feras": "Entrenador de bestias",
  "marca_do_dominio": "Marca de dominio",
  "presas": "Colmillos",
  "desafiar_a_morte": "Desafiar a la muerte",
  "golpes_sangrentos": "Golpes sangrientos",
  "poderio_atletico": "Poderío atlético",
  "ferocidade_imortal": "Ferocidad inmortal",
  "devorador_de_magias": "Devorador de magia",
  "donzela_escoriacea": "Doncella escoriácea",
  "visao_de_estriga": "Visión de meiga",
  "donzela_inocente": "Doncella inocente",
  "chamado": "La llamada",
  "donzela_onirica": "Doncella onírica",
  "crianca_das_brumas": "Hijo de las brumas",
  "garras_amaldicoadas": "Garras malditas",
  "donzela_salobra": "Doncella salobre",
  "resistencia_ocultista": "Resistencia ocultista",
  "garras_de_estriga": "Garras de meiga",
  "magia_de_estriga": "Magia de meiga",
  "saber_cambiante": "Saber cambiante",
  "prole_nefasta": "Prole nefasta",
  "tocado_pela_musa": "Tocado por la musa",
  "angelical": "Angelical",
  "arauto_da_lei": "Heraldo de la ley",
  "nascido_do_fosso": "Nacido del foso",
  "prole_infernal": "Prole infernal",
  "aureola": "Aureola",
  "herdeiro_de_muitos_planos": "Heredero de muchos planos",
  "cascos_ligeiros": "Pezuñas veloces",
  "resistencia_de_nefilim": "Resistencia de nefilim",
  "manifestacao_bestial": "Manifestación bestial",
  "sangue_abencoado": "Sangre bendita",
  "olhos_de_nefilim": "Ojos de nefilim",
  "suplica_extraplanar": "Súplica extraplanar",
  "saber_nefelinico": "Saber nefelínico",
  "cauda_habilidosa": "Cola prensil",
  "magia_celestial": "Magia celestial",
  "asas_eternas": "Alas eternas",
  "declaracao_divina": "Declaración divina",
  "magia_inferal": "Magia infernal"
};

function titleCase(str) {
  return str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const extractedFeats = [];
const seenSlugs = new Set();

for (const anc of ancestries) {
  const section = txt.substring(anc.startPos, anc.endPos);
  const featRegex = /([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ\s\-\–\—\(\)\[\]\/]{2,45}?)\s+TALENTO\s+(\d+)/g;
  let match;
  while ((match = featRegex.exec(section)) !== null) {
    let rawName = match[1].replace(/\s+/g, " ").trim();
    rawName = rawName.replace(/^NÍVEL\s+/i, "").replace(/^FO\s+/i, "").replace(/^MURRUN\s+/i, "").replace(/^ELFO\s+/i, "").trim();
    const level = parseInt(match[2]);
    const slug = slugify(rawName);
    if (!slug || slug === "nivel" || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const ptName = titleCase(rawName);
    const enName = enNames[slug] || ptName;
    const esName = esNames[slug] || ptName;
    const id = `${anc.idPrefix}.${slug}`;

    const ptSummary = `Talento de ancestralidade de ${anc.name} (Nível ${level}).`;
    const enSummary = `${anc.en} ancestry feat (Level ${level}).`;
    const esSummary = `Dote de ascendencia de ${anc.es} (Nivel ${level}).`;

    extractedFeats.push({
      id,
      name: `${ptName} (${enName})`,
      names: { "pt-BR": ptName, en: enName, es: esName },
      category: "Ancestralidade",
      level,
      traits: [anc.name, "Ancestralidade"],
      prereq: "Nenhum",
      description: `Talento de ancestralidade de ${anc.name} catalogado do Livro do Jogador (Player Core), página ${anc.page}.`,
      summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
      source: { book: "Livro do Jogador (Player Core)", page: anc.page },
      ruleset: "remaster",
      rarity: "common",
      ancestry: anc.name,
      needs_review: false
    });
  }
}

console.log(`Extracted ${extractedFeats.length} ancestry feats!`);
fs.writeFileSync(path.join(__dirname, "extracted_pc1_ancestry_feats.json"), JSON.stringify(extractedFeats, null, 2), "utf8");
