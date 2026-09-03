/**
 * Pathbuilder 2e Local - Preenchimento de Ficha Oficial PDF Editável (AcroForm)
 * Mapeia e preenche todos os mais de 1.000 campos de formulário do PDF oficial da Paizo (Remaster).
 */

(function(global) {
  "use strict";

  const PDF_SIZES = {
    "Minúsculo": { "pt-BR": "Minúsculo", en: "Tiny", es: "Diminuto" },
    "Pequeno": { "pt-BR": "Pequeno", en: "Small", es: "Pequeño" },
    "Médio": { "pt-BR": "Médio", en: "Medium", es: "Mediano" },
    "Grande": { "pt-BR": "Grande", en: "Large", es: "Grande" },
    "Enorme": { "pt-BR": "Enorme", en: "Huge", es: "Enorme" },
    "Imenso": { "pt-BR": "Imenso", en: "Gargantuan", es: "Gargantuesco" },
    "Medium": { "pt-BR": "Médio", en: "Medium", es: "Mediano" },
    "Small": { "pt-BR": "Pequeno", en: "Small", es: "Pequeño" },
    "Large": { "pt-BR": "Grande", en: "Large", es: "Grande" },
    "Tiny": { "pt-BR": "Minúsculo", en: "Tiny", es: "Diminuto" },
    "Huge": { "pt-BR": "Enorme", en: "Huge", es: "Enorme" },
    "Gargantuan": { "pt-BR": "Imenso", en: "Gargantuan", es: "Gargantuesco" }
  };

  const PDF_ALIGNMENTS = {
    "Ordeiro e Bom": { "pt-BR": "Ordeiro e Bom", en: "Lawful Good", es: "Legal Bueno" },
    "Neutro e Bom": { "pt-BR": "Neutro e Bom", en: "Neutral Good", es: "Neutral Bueno" },
    "Caótico e Bom": { "pt-BR": "Caótico e Bom", en: "Chaotic Good", es: "Caótico Bueno" },
    "Ordeiro e Neutro": { "pt-BR": "Ordeiro e Neutro", en: "Lawful Neutral", es: "Legal Neutral" },
    "Neutro": { "pt-BR": "Neutro", en: "Neutral", es: "Neutral" },
    "Neutral": { "pt-BR": "Neutro", en: "Neutral", es: "Neutral" },
    "Caótico e Neutro": { "pt-BR": "Caótico e Neutro", en: "Chaotic Neutral", es: "Caótico Neutral" },
    "Ordeiro e Mau": { "pt-BR": "Ordeiro e Mau", en: "Lawful Evil", es: "Legal Maligno" },
    "Neutro e Mau": { "pt-BR": "Neutro e Mau", en: "Neutral Evil", es: "Neutral Maligno" },
    "Caótico e Mau": { "pt-BR": "Caótico e Mau", en: "Chaotic Evil", es: "Caótico Maligno" }
  };

  const PDF_TRAITS_DICT = {
    "acuidade": { "pt-BR": "Acuidade", en: "Finesse", es: "Sutileza" },
    "finesse": { "pt-BR": "Acuidade", en: "Finesse", es: "Sutileza" },
    "ágil": { "pt-BR": "Ágil", en: "Agile", es: "Ágil" },
    "agile": { "pt-BR": "Ágil", en: "Agile", es: "Ágil" },
    "não-letal": { "pt-BR": "Não-Letal", en: "Nonlethal", es: "No Letal" },
    "nao-letal": { "pt-BR": "Não-Letal", en: "Nonlethal", es: "No Letal" },
    "nonlethal": { "pt-BR": "Não-Letal", en: "Nonlethal", es: "No Letal" },
    "arremesso 3m": { "pt-BR": "Arremesso 3m", en: "Thrown 10 ft.", es: "Arrojadiza 3m" },
    "arremesso": { "pt-BR": "Arremesso", en: "Thrown", es: "Arrojadiza" },
    "thrown": { "pt-BR": "Arremesso", en: "Thrown", es: "Arrojadiza" },
    "versátil c": { "pt-BR": "Versátil C", en: "Versatile S", es: "Versátil C" },
    "versatil c": { "pt-BR": "Versátil C", en: "Versatile S", es: "Versátil C" },
    "versatile s": { "pt-BR": "Versátil C", en: "Versatile S", es: "Versátil C" },
    "versátil p": { "pt-BR": "Versátil P", en: "Versatile P", es: "Versátil P" },
    "versatil p": { "pt-BR": "Versátil P", en: "Versatile P", es: "Versátil P" },
    "versatile p": { "pt-BR": "Versátil P", en: "Versatile P", es: "Versátil P" },
    "versátil i": { "pt-BR": "Versátil I", en: "Versatile B", es: "Versátil C" },
    "versatil i": { "pt-BR": "Versátil I", en: "Versatile B", es: "Versátil C" },
    "versatile b": { "pt-BR": "Versátil I", en: "Versatile B", es: "Versátil C" },
    "aparar": { "pt-BR": "Aparar", en: "Parry", es: "Parada" },
    "parry": { "pt-BR": "Aparar", en: "Parry", es: "Parada" },
    "desarmado": { "pt-BR": "Desarmado", en: "Unarmed", es: "Desarmado" },
    "unarmed": { "pt-BR": "Desarmado", en: "Unarmed", es: "Desarmado" },
    "alcance": { "pt-BR": "Alcance", en: "Reach", es: "Alcance" },
    "reach": { "pt-BR": "Alcance", en: "Reach", es: "Alcance" },
    "florescer": { "pt-BR": "Florescer", en: "Flourish", es: "Floritura" },
    "flourish": { "pt-BR": "Florescer", en: "Flourish", es: "Floritura" },
    "abertura": { "pt-BR": "Abertura", en: "Open", es: "Apertura" },
    "open": { "pt-BR": "Abertura", en: "Open", es: "Apertura" },
    "geral": { "pt-BR": "Geral", en: "General", es: "General" },
    "general": { "pt-BR": "Geral", en: "General", es: "General" },
    "perícia": { "pt-BR": "Perícia", en: "Skill", es: "Habilidad" },
    "pericia": { "pt-BR": "Perícia", en: "Skill", es: "Habilidad" },
    "skill": { "pt-BR": "Perícia", en: "Skill", es: "Habilidad" },
    "humano": { "pt-BR": "Humano", en: "Human", es: "Humano" },
    "human": { "pt-BR": "Humano", en: "Human", es: "Humano" },
    "humanoide": { "pt-BR": "Humanoide", en: "Humanoid", es: "Humanoide" },
    "humanoid": { "pt-BR": "Humanoide", en: "Humanoid", es: "Humanoide" },
    "anão": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    "dwarf": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    "elfo": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
    "elf": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
    "gnomo": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
    "gnome": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
    "goblin": { "pt-BR": "Goblin", en: "Goblin", es: "Goblin" }
  };

  const PDF_CATALOG_DICT = {
    // Classes
    "Guerreiro": { "pt-BR": "Guerreiro", en: "Fighter", es: "Guerrero" },
    "Fighter": { "pt-BR": "Guerreiro", en: "Fighter", es: "Guerrero" },
    "Ladino": { "pt-BR": "Ladino", en: "Rogue", es: "Pícaro" },
    "Rogue": { "pt-BR": "Ladino", en: "Rogue", es: "Pícaro" },
    "Clérigo": { "pt-BR": "Clérigo", en: "Cleric", es: "Clérigo" },
    "Cleric": { "pt-BR": "Clérigo", en: "Cleric", es: "Clérigo" },
    "Mago": { "pt-BR": "Mago", en: "Wizard", es: "Mago" },
    "Wizard": { "pt-BR": "Mago", en: "Wizard", es: "Mago" },
    "Bárbaro": { "pt-BR": "Bárbaro", en: "Barbarian", es: "Bárbaro" },
    "Barbarian": { "pt-BR": "Bárbaro", en: "Barbarian", es: "Bárbaro" },
    "Bardo": { "pt-BR": "Bardo", en: "Bard", es: "Bardo" },
    "Bard": { "pt-BR": "Bardo", en: "Bard", es: "Bardo" },
    "Campeão": { "pt-BR": "Campeão", en: "Champion", es: "Campeón" },
    "Champion": { "pt-BR": "Campeão", en: "Champion", es: "Campeón" },
    "Druida": { "pt-BR": "Druida", en: "Druid", es: "Druida" },
    "Druid": { "pt-BR": "Druida", en: "Druid", es: "Druida" },
    "Monge": { "pt-BR": "Monge", en: "Monk", es: "Monje" },
    "Monk": { "pt-BR": "Monge", en: "Monk", es: "Monje" },
    "Patrulheiro": { "pt-BR": "Patrulheiro", en: "Ranger", es: "Ranger" },
    "Ranger": { "pt-BR": "Patrulheiro", en: "Ranger", es: "Ranger" },
    "Feiticeiro": { "pt-BR": "Feiticeiro", en: "Sorcerer", es: "Hechicero" },
    "Sorcerer": { "pt-BR": "Feiticeiro", en: "Sorcerer", es: "Hechicero" },
    "Alquimista": { "pt-BR": "Alquimista", en: "Alchemist", es: "Alquimista" },
    "Alchemist": { "pt-BR": "Alquimista", en: "Alchemist", es: "Alquimista" },
    "Espadachim": { "pt-BR": "Espadachim", en: "Swashbuckler", es: "Espadachín" },
    "Swashbuckler": { "pt-BR": "Espadachim", en: "Swashbuckler", es: "Espadachín" },
    "Bruxo": { "pt-BR": "Bruxa", en: "Witch", es: "Bruja" },
    "Bruxa": { "pt-BR": "Bruxa", en: "Witch", es: "Bruja" },
    "Witch": { "pt-BR": "Bruxa", en: "Witch", es: "Bruja" },
    "Investigador": { "pt-BR": "Investigador", en: "Investigator", es: "Investigador" },
    "Investigator": { "pt-BR": "Investigador", en: "Investigator", es: "Investigador" },
    "Oráculo": { "pt-BR": "Oráculo", en: "Oracle", es: "Oráculo" },
    "Oracle": { "pt-BR": "Oráculo", en: "Oracle", es: "Oráculo" },
    "Cineticista": { "pt-BR": "Cineticista", en: "Kineticist", es: "Cinético" },
    "Kineticist": { "pt-BR": "Cineticista", en: "Kineticist", es: "Cinético" },
    "Magus": { "pt-BR": "Magus", en: "Magus", es: "Magus" },
    "Invocador": { "pt-BR": "Invocador", en: "Summoner", es: "Convocador" },
    "Summoner": { "pt-BR": "Invocador", en: "Summoner", es: "Convocador" },
    "Pistoleiro": { "pt-BR": "Pistoleiro", en: "Gunslinger", es: "Pistolero" },
    "Gunslinger": { "pt-BR": "Pistoleiro", en: "Gunslinger", es: "Pistolero" },
    "Inventor": { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" },
    "Psíquico": { "pt-BR": "Psíquico", en: "Psychic", es: "Psíquico" },
    "Taumaturgo": { "pt-BR": "Taumaturgo", en: "Thaumaturge", es: "Taumaturgo" },
    "Animista": { "pt-BR": "Animista", en: "Animist", es: "Animista" },
    "Comandante": { "pt-BR": "Comandante", en: "Commander", es: "Comandante" },
    "Guardião": { "pt-BR": "Guardião", en: "Guardian", es: "Guardián" },

    // Subclasses / Rackets / Doctrines
    "Esquema de Ladrão": { "pt-BR": "Esquema de Ladrão", en: "Thief Racket", es: "Pícaro Ladrón" },
    "Thief": { "pt-BR": "Esquema de Ladrão", en: "Thief Racket", es: "Pícaro Ladrón" },
    "Sacerdote Guerreiro": { "pt-BR": "Sacerdote Guerreiro", en: "Warpriest", es: "Sacerdote Guerrero" },
    "Warpriest": { "pt-BR": "Sacerdote Guerreiro", en: "Warpriest", es: "Sacerdote Guerrero" },

    // Ancestries
    "Humano": { "pt-BR": "Humano", en: "Human", es: "Humano" },
    "Human": { "pt-BR": "Humano", en: "Human", es: "Humano" },
    "Anão": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    "Dwarf": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
    "Elfo": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
    "Elf": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
    "Gnomo": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
    "Gnome": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
    "Goblin": { "pt-BR": "Goblin", en: "Goblin", es: "Goblin" },
    "Halfling": { "pt-BR": "Halfling", en: "Halfling", es: "Mediano" },
    "Leshy": { "pt-BR": "Leshy", en: "Leshy", es: "Leshy" },
    "Orc": { "pt-BR": "Orc", en: "Orc", es: "Orco" },

    // Heritages
    "Humano Versátil": { "pt-BR": "Humano Versátil", en: "Versatile Human", es: "Humano Versátil" },
    "Versatile Human": { "pt-BR": "Humano Versátil", en: "Versatile Human", es: "Humano Versátil" },
    "Humano Habilidoso": { "pt-BR": "Humano Habilidoso", en: "Skilled Human", es: "Humano Diestro" },
    "Skilled Human": { "pt-BR": "Humano Habilidoso", en: "Skilled Human", es: "Humano Diestro" },
    "Elfo Ancestral": { "pt-BR": "Elfo Ancestral", en: "Ancient Elf", es: "Elfo Ancestral" },
    "Ancient Elf": { "pt-BR": "Elfo Ancestral", en: "Ancient Elf", es: "Elfo Ancestral" },
    "Anão da Forja": { "pt-BR": "Anão da Forja", en: "Forge Dwarf", es: "Enano de la Forja" },
    "Forge Dwarf": { "pt-BR": "Anão da Forja", en: "Forge Dwarf", es: "Enano de la Forja" },
    "Anão Couro-de-Pedra": { "pt-BR": "Anão Couro-de-Pedra", en: "Strong-Blooded Dwarf", es: "Enano de Sangre Fuerte" },
    "Strong-Blooded Dwarf": { "pt-BR": "Anão Couro-de-Pedra", en: "Strong-Blooded Dwarf", es: "Enano de Sangre Fuerte" },
    "Gnomo Feérico": { "pt-BR": "Gnomo Feérico", en: "Fey Gnome", es: "Gnomo Feérico" },
    "Fey Gnome": { "pt-BR": "Gnomo Feérico", en: "Fey Gnome", es: "Gnomo Feérico" },
    "Gnomo do Poço de Vigor": { "pt-BR": "Gnomo do Poço de Vigor", en: "Wellspring Gnome", es: "Gnomo de Fuente Vital" },
    "Wellspring Gnome": { "pt-BR": "Gnomo do Poço de Vigor", en: "Wellspring Gnome", es: "Gnomo de Fuente Vital" },
    "Orc Cicatrizado": { "pt-BR": "Orc Cicatrizado", en: "Hold-Scarred Orc", es: "Orco Curtido" },
    "Hold-Scarred Orc": { "pt-BR": "Orc Cicatrizado", en: "Hold-Scarred Orc", es: "Orco Curtido" },
    "Goblin Dente-de-Navalha": { "pt-BR": "Goblin Dente-de-Navalha", en: "Razortooth Goblin", es: "Goblin de Dientes Afilados" },
    "Razortooth Goblin": { "pt-BR": "Goblin Dente-de-Navalha", en: "Razortooth Goblin", es: "Goblin de Dientes Afilados" },

    // Backgrounds
    "Guarda": { "pt-BR": "Guarda", en: "Guard", es: "Guardia" },
    "Guard": { "pt-BR": "Guarda", en: "Guard", es: "Guardia" },
    "Nobre": { "pt-BR": "Nobre", en: "Noble", es: "Noble" },
    "Noble": { "pt-BR": "Nobre", en: "Noble", es: "Noble" },
    "Acólito": { "pt-BR": "Acólito", en: "Acolyte", es: "Acólito" },
    "Acolyte": { "pt-BR": "Acólito", en: "Acolyte", es: "Acólito" },
    "Criminoso": { "pt-BR": "Criminoso", en: "Criminal", es: "Criminal" },
    "Criminal": { "pt-BR": "Criminoso", en: "Criminal", es: "Criminal" },
    "Guerreiro (Antecedente)": { "pt-BR": "Guerreiro", en: "Warrior", es: "Guerrero" },
    "Warrior": { "pt-BR": "Guerreiro", en: "Warrior", es: "Guerrero" },
    "Fazendeiro": { "pt-BR": "Fazendeiro", en: "Farmhand", es: "Granjero" },
    "Farmhand": { "pt-BR": "Fazendeiro", en: "Farmhand", es: "Granjero" },

    // Weapons & Attacks
    "Punho": { "pt-BR": "Punho", en: "Fist", es: "Puño" },
    "Fist": { "pt-BR": "Punho", en: "Fist", es: "Puño" },
    "Mandíbulas": { "pt-BR": "Mandíbulas", en: "Jaws", es: "Mandíbulas" },
    "Jaws": { "pt-BR": "Mandíbulas", en: "Jaws", es: "Mandíbulas" },
    "Adaga": { "pt-BR": "Adaga", en: "Dagger", es: "Daga" },
    "Dagger": { "pt-BR": "Adaga", en: "Dagger", es: "Daga" },
    "Espada Longa": { "pt-BR": "Espada Longa", en: "Longsword", es: "Espada Larga" },
    "Longsword": { "pt-BR": "Espada Longa", en: "Longsword", es: "Espada Larga" },
    "Espada Curta": { "pt-BR": "Espada Curta", en: "Shortsword", es: "Espada Corta" },
    "Shortsword": { "pt-BR": "Espada Curta", en: "Shortsword", es: "Espada Corta" },
    "Rapieira": { "pt-BR": "Rapieira", en: "Rapier", es: "Estoque" },
    "Rapier": { "pt-BR": "Rapieira", en: "Rapier", es: "Estoque" },
    "Arco Curto": { "pt-BR": "Arco Curto", en: "Shortbow", es: "Arco Corto" },
    "Shortbow": { "pt-BR": "Arco Curto", en: "Shortbow", es: "Arco Corto" },
    "Arco Longo": { "pt-BR": "Arco Longo", en: "Longbow", es: "Arco Largo" },
    "Longbow": { "pt-BR": "Arco Longo", en: "Longbow", es: "Arco Largo" },
    "Machado de Batalha": { "pt-BR": "Machado de Batalha", en: "Battle Axe", es: "Hacha de Batalla" },
    "Battle Axe": { "pt-BR": "Machado de Batalha", en: "Battle Axe", es: "Hacha de Batalla" },
    "Montante": { "pt-BR": "Montante", en: "Greatsword", es: "Espadón" },
    "Greatsword": { "pt-BR": "Montante", en: "Greatsword", es: "Espadón" },
    "Martelo de Guerra": { "pt-BR": "Martelo de Guerra", en: "Warhammer", es: "Martillo de Guerra" },
    "Warhammer": { "pt-BR": "Martelo de Guerra", en: "Warhammer", es: "Martillo de Guerra" },
    "Bordão": { "pt-BR": "Bordão", en: "Staff", es: "Bastón" },
    "Staff": { "pt-BR": "Bordão", en: "Staff", es: "Bastón" },

    // Feats
    "Duro de Matar": { "pt-BR": "Duro de Matar", en: "Diehard", es: "Duro de Matar" },
    "Diehard": { "pt-BR": "Duro de Matar", en: "Diehard", es: "Duro de Matar" },
    "Pés Velozes": { "pt-BR": "Pés Velozes", en: "Fleet", es: "Pies Ligeros" },
    "Fleet": { "pt-BR": "Pés Velozes", en: "Fleet", es: "Pies Ligeros" },
    "Tenacidade": { "pt-BR": "Tenacidade", en: "Toughness", es: "Dureza" },
    "Robustez": { "pt-BR": "Tenacidade", en: "Toughness", es: "Dureza" },
    "Toughness": { "pt-BR": "Tenacidade", en: "Toughness", es: "Dureza" },
    "Iniciativa Incrível": { "pt-BR": "Iniciativa Incrível", en: "Incredible Initiative", es: "Iniciativa Increíble" },
    "Incredible Initiative": { "pt-BR": "Iniciativa Incrível", en: "Incredible Initiative", es: "Iniciativa Increíble" },
    "Investida Repentina": { "pt-BR": "Investida Repentina", en: "Sudden Charge", es: "Carga Repentina" },
    "Sudden Charge": { "pt-BR": "Investida Repentina", en: "Sudden Charge", es: "Carga Repentina" },
    "Golpe Duplo": { "pt-BR": "Golpe Duplo", en: "Double Slice", es: "Tajo Doble" },
    "Double Slice": { "pt-BR": "Golpe Duplo", en: "Double Slice", es: "Tajo Doble" },
    "Ataque de Oportunidade": { "pt-BR": "Ataque de Oportunidade", en: "Attack of Opportunity", es: "Ataque de Oportunidad" },
    "Attack of Opportunity": { "pt-BR": "Ataque de Oportunidade", en: "Attack of Opportunity", es: "Ataque de Oportunidad" },
    "Ambição Natural": { "pt-BR": "Ambição Natural", en: "Natural Ambition", es: "Ambición Natural" },
    "Natural Ambition": { "pt-BR": "Ambição Natural", en: "Natural Ambition", es: "Ambición Natural" },
    "Treinamento Versátil": { "pt-BR": "Treinamento Versátil", en: "General Training", es: "Entrenamiento General" },
    "General Training": { "pt-BR": "Treinamento Versátil", en: "General Training", es: "Entrenamiento General" },

    // Senses
    "Visão no Escuro": { "pt-BR": "Visão no Escuro", en: "Darkvision", es: "Visión en la Oscuridad" },
    "Darkvision": { "pt-BR": "Visão no Escuro", en: "Darkvision", es: "Visión en la Oscuridad" },
    "Visão na Penumbra": { "pt-BR": "Visão na Penumbra", en: "Low-Light Vision", es: "Visión en la Penumbra" },
    "Low-Light Vision": { "pt-BR": "Visão na Penumbra", en: "Low-Light Vision", es: "Visión en la Penumbra" },
    // Equipment & Adventuring Items
    "Adventurer's Pack": { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" },
    "Mochila de Aventureiro": { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" },
    "Dueling Cape": { "pt-BR": "Capa de Duelo", en: "Dueling Cape", es: "Capa de duelo" },
    "Capa de Duelo": { "pt-BR": "Capa de Duelo", en: "Dueling Cape", es: "Capa de duelo" },
    "Disguise Kit": { "pt-BR": "Kit de Disfarce", en: "Disguise Kit", es: "Kit de disfraces" },
    "Kit de Disfarce": { "pt-BR": "Kit de Disfarce", en: "Disguise Kit", es: "Kit de disfraces" },
    "Bedroll": { "pt-BR": "Saco de Dormir", en: "Bedroll", es: "Saco de dormir" },
    "Saco de Dormir": { "pt-BR": "Saco de Dormir", en: "Bedroll", es: "Saco de dormir" },
    "Rations (1 week)": { "pt-BR": "Rações (1 semana)", en: "Rations (1 week)", es: "Raciones (1 semana)" },
    "Rações (1 semana)": { "pt-BR": "Rações (1 semana)", en: "Rations (1 week)", es: "Raciones (1 semana)" },
    "Rations": { "pt-BR": "Rações", en: "Rations", es: "Raciones" },
    "Rações": { "pt-BR": "Rações", en: "Rations", es: "Raciones" },
    "Rope (50 ft)": { "pt-BR": "Corda de Cânhamo (15m)", en: "Rope (50 ft)", es: "Cuerda (15 metros)" },
    "Rope (50 feet)": { "pt-BR": "Corda de Cânhamo (15m)", en: "Rope (50 ft)", es: "Cuerda (15 metros)" },
    "Corda (15 metros)": { "pt-BR": "Corda de Cânhamo (15m)", en: "Rope (50 ft)", es: "Cuerda (15 metros)" },
    "Corda de Cânhamo (50 pés)": { "pt-BR": "Corda de Cânhamo (15m)", en: "Rope (50 ft)", es: "Cuerda (15 metros)" },
    "Corda de Cânhamo - 15m (Rope)": { "pt-BR": "Corda de Cânhamo (15m)", en: "Rope (50 ft)", es: "Cuerda (15 metros)" },
    "Healer's Toolkit": { "pt-BR": "Kit de Primeiros Socorros", en: "Healer's Toolkit", es: "Herramientas de sanador" },
    "Kit de Primeiros Socorros": { "pt-BR": "Kit de Primeiros Socorros", en: "Healer's Toolkit", es: "Herramientas de sanador" },
    "Kit de Curandeiro": { "pt-BR": "Kit de Primeiros Socorros", en: "Healer's Toolkit", es: "Herramientas de sanador" },
    "Thieves' Tools": { "pt-BR": "Ferramentas de Ladrão", en: "Thieves' Tools", es: "Herramientas de ladrón" },
    "Thieves' Toolkit": { "pt-BR": "Ferramentas de Ladrão", en: "Thieves' Tools", es: "Herramientas de ladrón" },
    "Ferramentas de Ladrão": { "pt-BR": "Ferramentas de Ladrão", en: "Thieves' Tools", es: "Herramientas de ladrón" },
    "Air Bladder": { "pt-BR": "Bexiga de Ar", en: "Air Bladder", es: "Vejiga de aire" },
    "Bexiga de Ar": { "pt-BR": "Bexiga de Ar", en: "Air Bladder", es: "Vejiga de aire" },
    "Alchemist's Lab": { "pt-BR": "Laboratório de Alquimista", en: "Alchemist's Lab", es: "Laboratorio de alquimista" },
    "Laboratório de Alquimista": { "pt-BR": "Laboratório de Alquimista", en: "Alchemist's Lab", es: "Laboratorio de alquimista" },
    "Alchemist's Toolkit": { "pt-BR": "Kit de Alquimista", en: "Alchemist's Toolkit", es: "Kit de alquimista" },
    "Kit de Alquimista": { "pt-BR": "Kit de Alquimista", en: "Alchemist's Toolkit", es: "Kit de alquimista" },
    "Animal Blind": { "pt-BR": "Abrigo de Observação Animal", en: "Animal Blind", es: "Escondite para animales" },
    "Animal Call": { "pt-BR": "Chamado de Animal", en: "Animal Call", es: "Llamador de animales" },
    "Armored Skirt": { "pt-BR": "Saia Blindada", en: "Armored Skirt", es: "Falda blindada" },
    "Artisan's Toolkit": { "pt-BR": "Kit de Artesão", en: "Artisan's Toolkit", es: "Kit de artesano" },
    "Traje de Respiração Atmosférica": { "pt-BR": "Traje de Respiração Atmosférica", en: "Atmospheric Breathing Suit", es: "Traje de respiración atmosférica" },
    "Atmospheric Breathing Suit": { "pt-BR": "Traje de Respiração Atmosférica", en: "Atmospheric Breathing Suit", es: "Traje de respiración atmosférica" },
    "Backpack": { "pt-BR": "Mochila", en: "Backpack", es: "Mochila" },
    "Mochila": { "pt-BR": "Mochila", en: "Backpack", es: "Mochila" },
    "Bandolier": { "pt-BR": "Cartucheira", en: "Bandolier", es: "Bandolera" },
    "Belt Pouch": { "pt-BR": "Bolsa de Cinto", en: "Belt Pouch", es: "Bolsa de cinturón" },
    "Caltrops": { "pt-BR": "Estrepes", en: "Caltrops", es: "Abrojos" },
    "Candle": { "pt-BR": "Vela", en: "Candle", es: "Vela" },
    "Chalk (10 pieces)": { "pt-BR": "Giz (10 pedaços)", en: "Chalk (10 pieces)", es: "Tiza (10 piezas)" },
    "Chalk": { "pt-BR": "Giz", en: "Chalk", es: "Tiza" },
    "Climbing Kit": { "pt-BR": "Kit de Escalada", en: "Climbing Kit", es: "Kit de escalada" },
    "Compass": { "pt-BR": "Bússola", en: "Compass", es: "Brújula" },
    "Crowbar": { "pt-BR": "Pé de Cabra", en: "Crowbar", es: "Palanca" },
    "Fishing Tackle": { "pt-BR": "Equipamento de Pesca", en: "Fishing Tackle", es: "Equipo de pesca" },
    "Flint and Steel": { "pt-BR": "Pederneira e Isqueiro", en: "Flint and Steel", es: "Pedernal y acero" },
    "Pederneira e Isqueiro": { "pt-BR": "Pederneira e Isqueiro", en: "Flint and Steel", es: "Pedernal y acero" },
    "Grappling Hook": { "pt-BR": "Gancho de Escalada", en: "Grappling Hook", es: "Garfio de escalada" },
    "Lantern (Bullseye)": { "pt-BR": "Lanterna de Foco", en: "Lantern (Bullseye)", es: "Linterna de foco" },
    "Lantern (Hooded)": { "pt-BR": "Lanterna Furta-Fogo", en: "Lantern (Hooded)", es: "Linterna con capucha" },
    "Lock (Simple)": { "pt-BR": "Cadeado Simples", en: "Lock (Simple)", es: "Cerradura simple" },
    "Lock (Average)": { "pt-BR": "Fechadura Média", en: "Lock (Average)", es: "Cerradura media" },
    "Magnifying Glass": { "pt-BR": "Lupa", en: "Magnifying Glass", es: "Lupa" },
    "Manacles (Simple)": { "pt-BR": "Algemas Simples", en: "Manacles (Simple)", es: "Grilletes simples" },
    "Mirror": { "pt-BR": "Espelho", en: "Mirror", es: "Espejo" },
    "Oil (1 pint)": { "pt-BR": "Óleo (1 caneca)", en: "Oil (1 pint)", es: "Aceite (1 pinta)" },
    "Piton": { "pt-BR": "Píton", en: "Piton", es: "Pitón" },
    "Religious Symbol (Wooden)": { "pt-BR": "Símbolo Religioso (Madeira)", en: "Religious Symbol (Wooden)", es: "Símbolo religioso (madera)" },
    "Religious Symbol (Silver)": { "pt-BR": "Símbolo Religioso (Prata)", en: "Religious Symbol (Silver)", es: "Símbolo religioso (plata)" },
    "Sack": { "pt-BR": "Saco", en: "Sack", es: "Saco" },
    "Scroll Case": { "pt-BR": "Estojo de Pergaminho", en: "Scroll Case", es: "Estuche de pergaminos" },
    "Signal Whistle": { "pt-BR": "Apito de Sinal", en: "Signal Whistle", es: "Silbato de señales" },
    "Soap": { "pt-BR": "Sabão", en: "Soap", es: "Jabón" },
    "Spyglass": { "pt-BR": "Luneta", en: "Spyglass", es: "Catalejo" },
    "Ten-foot Pole": { "pt-BR": "Vara de 3 Metros", en: "Ten-foot Pole", es: "Vara de 3 metros" },
    "Torch": { "pt-BR": "Tocha", en: "Torch", es: "Antorcha" },
    "Waterskin": { "pt-BR": "Odre", en: "Waterskin", es: "Odre" },
    "Writing Set": { "pt-BR": "Material de Escrita", en: "Writing Set", es: "Útiles de escritura" },
    "Elixir of Life (Minor)": { "pt-BR": "Elixir da Vida (Menor)", en: "Elixir of Life (Minor)", es: "Elixir de la vida (menor)" },
    "Elixir of Life (Lesser)": { "pt-BR": "Elixir da Vida (Inferior)", en: "Elixir of Life (Lesser)", es: "Elixir de la vida (inferior)" },
    "Healing Potion (Minor)": { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" },
    "Minor Healing Potion": { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" },
    "Poção de Cura Menor": { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" },
    "Healing Potion (Lesser)": { "pt-BR": "Poção de Cura Inferior", en: "Lesser Healing Potion", es: "Poción de curación inferior" },
    "Lesser Healing Potion": { "pt-BR": "Poção de Cura Inferior", en: "Lesser Healing Potion", es: "Poción de curación inferior" },
    "Poção de Cura Inferior": { "pt-BR": "Poção de Cura Inferior", en: "Lesser Healing Potion", es: "Poción de curación inferior" },
    "Alchemist's Fire (Lesser)": { "pt-BR": "Fogo Alquímico (Inferior)", en: "Alchemist's Fire (Lesser)", es: "Fuego alquímico (inferior)" },
    "Acid Flask (Lesser)": { "pt-BR": "Frasco de Ácido (Inferior)", en: "Acid Flask (Lesser)", es: "Frasco de ácido (inferior)" },
    "Frost Vial (Lesser)": { "pt-BR": "Frasco de Gelo (Inferior)", en: "Frost Vial (Lesser)", es: "Vial de escarcha (inferior)" },
    "Bottled Lightning (Lesser)": { "pt-BR": "Relâmpago Engarrafado (Inferior)", en: "Bottled Lightning (Lesser)", es: "Rayo embotellado (inferior)" },
    "Tanglefoot Bag (Lesser)": { "pt-BR": "Bolsa Enredadora (Inferior)", en: "Tanglefoot Bag (Lesser)", es: "Bolsa enredadora (inferior)" },
    "Antidote (Lesser)": { "pt-BR": "Antídoto (Inferior)", en: "Antidote (Lesser)", es: "Antídoto (inferior)" },
    "Antiplague (Lesser)": { "pt-BR": "Antipraga (Inferior)", en: "Antiplague (Lesser)", es: "Antipeste (inferior)" },
    "Smokestick (Lesser)": { "pt-BR": "Bastão de Fumaça (Inferior)", en: "Smokestick (Lesser)", es: "Bastón de humo (inferior)" },
    "Sunrod": { "pt-BR": "Bastão Solar", en: "Sunrod", es: "Bastón solar" },
    "Tindertwig": { "pt-BR": "Graveto Incendiário", en: "Tindertwig", es: "Ramita incendiaria" },
    "Spacious Pouch (Bag of Holding)": { "pt-BR": "Bolsa Espaçosa (Bolsa de Carga)", en: "Spacious Pouch (Bag of Holding)", es: "Bolsa espaciosa (bolsa de contención)" },
    "Boots of Elvenkind": { "pt-BR": "Botas Élficas", en: "Boots of Elvenkind", es: "Botas élficas" },
    "Botas Élficas": { "pt-BR": "Botas Élficas", en: "Boots of Elvenkind", es: "Botas élficas" },
    "Cloak of Elvenkind": { "pt-BR": "Manto Élfico", en: "Cloak of Elvenkind", es: "Capa élfica" },
    "Manto Élfico": { "pt-BR": "Manto Élfico", en: "Cloak of Elvenkind", es: "Capa élfica" },
    "Goggles of Night": { "pt-BR": "Óculos da Noite", en: "Goggles of Night", es: "Gafas de la noche" },
    "Óculos da Noite": { "pt-BR": "Óculos da Noite", en: "Goggles of Night", es: "Gafas de la noche" },
    "Wand of Heal (1st-Rank)": { "pt-BR": "Varinha de Curar (1º Ranque)", en: "Wand of Heal (1st-Rank)", es: "Varita de curar (rango 1)" },
    "Staff of Fire": { "pt-BR": "Cajado do Fogo", en: "Staff of Fire", es: "Bastón de fuego" }
  };

  const PDF_DAMAGE_TYPES_DICT = {
    "perfurante": { "pt-BR": "Perfurante", en: "Piercing", es: "Perforante" },
    "piercing": { "pt-BR": "Perfurante", en: "Piercing", es: "Perforante" },
    "cortante": { "pt-BR": "Cortante", en: "Slashing", es: "Cortante" },
    "slashing": { "pt-BR": "Cortante", en: "Slashing", es: "Cortante" },
    "impacto": { "pt-BR": "Impacto", en: "Bludgeoning", es: "Contundente" },
    "bludgeoning": { "pt-BR": "Impacto", en: "Bludgeoning", es: "Contundente" }
  };

  function cleanWeaponName(name, locale) {
    if (!name) return "";
    let clean = String(name).replace(/\s*\([^)]*\d+d\d+[^)]*\)/g, "").trim();
    if (clean.includes("/")) {
      const parts = clean.split("/").map(s => s.trim());
      if (locale === "pt-BR") clean = parts[1] || parts[0];
      else clean = parts[0];
    }
    return clean;
  }

  function localizeCatalogItem(rawName, locale) {
    if (!rawName) return "";
    const trimmed = String(rawName).trim();
    if (PDF_CATALOG_DICT[trimmed] && PDF_CATALOG_DICT[trimmed][locale]) {
      return PDF_CATALOG_DICT[trimmed][locale];
    }
    const cleanKey = trimmed.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    for (const [key, map] of Object.entries(PDF_CATALOG_DICT)) {
      const kNorm = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      if (kNorm === cleanKey && map[locale]) return map[locale];
    }
    const data = typeof PF2E_DATA !== "undefined" ? PF2E_DATA : (global.PF2E_DATA);
    if (data) {
      if (data.COMPENDIUM_TRANSLATIONS) {
        for (const [id, trans] of Object.entries(data.COMPENDIUM_TRANSLATIONS)) {
          if (!Array.isArray(trans)) continue;
          const [pt, en, es] = trans;
          for (const candidate of [id, pt, en, es]) {
            if (!candidate) continue;
            if (candidate === trimmed) {
              if (locale === "pt-BR") return pt || trimmed;
              if (locale === "en") return en || trimmed;
              if (locale === "es") return es || trimmed;
            }
            const cNorm = String(candidate).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
            if (cNorm === cleanKey) {
              if (locale === "pt-BR") return pt || trimmed;
              if (locale === "en") return en || trimmed;
              if (locale === "es") return es || trimmed;
            }
          }
        }
      }

      const collections = [
        data.heritages,
        data.feats,
        data.actions,
        data.ancestries,
        data.classes,
        data.backgrounds,
        data.spells,
        data.weapons,
        data.items,
        data.itemCompendium,
        data.armors,
        data.shields,
        data.pets
      ];
      for (const col of collections) {
        if (!col) continue;
        const found = (Array.isArray(col) ? col : Object.values(col)).find((entry) => {
          if (!entry) return false;
          if (entry.id === trimmed || entry.name === trimmed) return true;
          if (entry.names && Object.values(entry.names).includes(trimmed)) return true;
          const eNorm = String(entry.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
          return eNorm === cleanKey;
        });
        if (found) {
          if (found.names && found.names[locale]) return found.names[locale];
          if (locale === "pt-BR" && found.name) return found.name;
          if (found.en && locale === "en") return found.en;
          if (found.es && locale === "es") return found.es;
        }
      }
    }
    return trimmed;
  }

  function localizeTrait(trait, locale) {
    if (!trait) return "";
    const trimmed = String(trait).trim();
    const lower = trimmed.toLowerCase();
    if (PDF_TRAITS_DICT[lower] && PDF_TRAITS_DICT[lower][locale]) return PDF_TRAITS_DICT[lower][locale];
    const cleanKey = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    for (const [key, map] of Object.entries(PDF_TRAITS_DICT)) {
      const kNorm = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      if (kNorm === cleanKey && map[locale]) return map[locale];
    }
    return trimmed;
  }

  function localizeDamageType(dt, locale) {
    if (!dt) return "";
    const lower = String(dt).toLowerCase().trim();
    return PDF_DAMAGE_TYPES_DICT[lower] && PDF_DAMAGE_TYPES_DICT[lower][locale] ? PDF_DAMAGE_TYPES_DICT[lower][locale] : dt;
  }

  function localizeSense(sense, locale) {
    if (!sense) return "";
    return localizeCatalogItem(sense, locale);
  }

  function getLocalizedFeatDetails(featNameOrId, locale) {
    const locName = localizeCatalogItem(featNameOrId, locale);
    let cleanName = locName;
    const matchParentheses = locName.match(/^([^(]+?)\s*\(([^)]+)\)$/);
    if (matchParentheses) {
      if (locale === "pt-BR") cleanName = matchParentheses[1].trim();
      else if (locale === "en") cleanName = matchParentheses[2].trim();
      else cleanName = matchParentheses[1].trim();
    }
    let notes = "";
    let traits = "";
    let description = "";

    const data = typeof PF2E_DATA !== "undefined" ? PF2E_DATA : (global.PF2E_DATA);
    if (data && data.feats && Array.isArray(data.feats)) {
      const cleanKey = String(featNameOrId || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
      const found = data.feats.find((f) => {
        if (!f) return false;
        if (f.id === featNameOrId || f.name === featNameOrId) return true;
        if (f.names && Object.values(f.names).includes(featNameOrId)) return true;
        const fNorm = String(f.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
        return fNorm === cleanKey;
      });
      if (found) {
        if (found.source && found.source.book) {
          notes = `${found.source.book}${found.source.page ? ` p.${found.source.page}` : ""}`;
        }
        if (Array.isArray(found.traits)) {
          traits = found.traits.map((t) => localizeTrait(t, locale)).join(", ");
        }
        description = (found.summaries && found.summaries[locale]) || found.description || "";
      }
    }

    return { name: cleanName, notes, traits, description };
  }

  const PF2E_PDF_FILLER = {
    /**
     * Preenche os campos do formulário AcroForm do PDF oficial da Paizo
     * @param {Object} character - Objeto do personagem
     * @param {Object} calc - Estatísticas calculadas pelo PF2E_ENGINE
     * @param {Uint8Array|ArrayBuffer} pdfBytes - Bytes do modelo ficha.pdf
     * @param {Object} pdfLibInstance - Instância de PDFLib (opcional)
     * @param {string} [localeArg] - Idioma ("pt-BR" | "en" | "es")
     * @returns {Promise<Uint8Array>} PDF modificado mantendo campos editáveis
     */
    async fillOfficialPdf(character, calc, pdfBytes, pdfLibInstance, localeArg) {
      const PDFLib = pdfLibInstance || (typeof global !== "undefined" && global.PDFLib) || (typeof window !== "undefined" && window.PDFLib);
      if (!PDFLib || !PDFLib.PDFDocument) {
        throw new Error("Biblioteca PDFLib não encontrada. Certifique-se de que pdf-lib está carregada.");
      }

      const locale = localeArg || character.locale || (typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("pathbuilder.locale")) || "pt-BR";
      const isEn = locale === "en";
      const isEs = locale === "es";

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

      const level = Number(character.level || 1);
      const getProfBonus = (rank, lvl) => {
        const r = String(rank || "").toLowerCase();
        if (r.includes("lendário") || r.includes("legendary")) return lvl + 8;
        if (r.includes("mestre") || r.includes("master")) return lvl + 6;
        if (r.includes("especialista") || r.includes("expert")) return lvl + 4;
        if (r.includes("treinado") || r.includes("trained")) return lvl + 2;
        return 0;
      };

      const setProfChecks = (prefix, rank) => {
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
      setTxt("Character Name", character.name || (isEn ? "Unnamed" : (isEs ? "Sin Nombre" : "Sem Nome")));
      setTxt("Player Name", character.playerName || "");
      const locAncestry = localizeCatalogItem(character.ancestry, locale);
      setTxt("Ancestry", locAncestry);
      const locHeritage = localizeCatalogItem(character.heritage, locale);
      const locTraits = (character.traits || []).map(t => localizeTrait(t, locale));
      const heritageTraits = [locHeritage, ...locTraits].filter(Boolean).join(" · ");
      setTxt("Heritage and Traits", heritageTraits);
      const locBackground = localizeCatalogItem(character.background, locale);
      setTxt("Background", locBackground);
      const locClass = localizeCatalogItem(character.class, locale);
      const locSubclass = localizeCatalogItem(character.subclass, locale);
      const fullClass = [locClass, locSubclass].filter(Boolean).join(" - ");
      setTxt("Class", fullClass);
      setTxt("LEVEL", String(character.level || 1));
      const rawSize = character.size || "Médio";
      const locSize = PDF_SIZES[rawSize] && PDF_SIZES[rawSize][locale] ? PDF_SIZES[rawSize][locale] : rawSize;
      setTxt("Size", locSize);
      setTxt("Deity or Philosophy", character.deity || "");
      const rawAlignment = character.alignment || "Neutro";
      const locAlignment = PDF_ALIGNMENTS[rawAlignment] && PDF_ALIGNMENTS[rawAlignment][locale] ? PDF_ALIGNMENTS[rawAlignment][locale] : rawAlignment;
      setTxt("Attitude", locAlignment);
      setTxt("LANGUAGES", Array.isArray(character.languages) ? character.languages.join(", ") : (isEn ? "Common" : (isEs ? "Común" : "Comum")));
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
      const acTotal = typeof calc.ac === "object" ? (calc.ac.total !== undefined ? calc.ac.total : 10) : (calc.ac || 10);
      setTxt("AC", acTotal);
      setTxt("AC CALCULATION 1 DEXTERITY", formatMod(calc.ac && calc.ac.dex !== undefined ? calc.ac.dex : mods.dex));
      const armorRank = (character.armorProficiencies && character.armorProficiencies[equippedArmor.category]) || "Treinado";
      const armorProfBonus = (calc.ac && calc.ac.prof !== undefined) ? calc.ac.prof : getProfBonus(armorRank, level);
      setTxt("AC CALCULATION 2 PROFICIENCY", armorProfBonus);
      setTxt("AC CALCULATION 3 ITEM", (calc.ac && calc.ac.item !== undefined) ? calc.ac.item : (equippedArmor.acBonus || 0));

      // Escudo
      const shieldBonus = (calc.ac && calc.ac.shield !== undefined) ? calc.ac.shield : (character.shieldRaised ? (character.shieldBonus || 2) : 0);
      setTxt("SHIELD", shieldBonus);
      const shieldHardness = character.shieldHardness !== undefined ? character.shieldHardness : (calc.equippedShield && calc.equippedShield.hardness ? calc.equippedShield.hardness : "");
      setTxt("Hardness Max HP", String(shieldHardness));
      const shieldMaxHp = character.shieldMaxHp !== undefined ? character.shieldMaxHp : (calc.equippedShield && calc.equippedShield.maxHp ? calc.equippedShield.maxHp : (character.shieldHp || ""));
      const shieldBt = character.shieldBt !== undefined ? character.shieldBt : (calc.equippedShield && calc.equippedShield.bt ? calc.equippedShield.bt : (Number(shieldMaxHp) ? Math.floor(Number(shieldMaxHp) / 2) : ""));
      setTxt("BT", String(shieldBt));

      // Proficiências de Armadura
      setProfChecks("UNARMORED", (character.armorProficiencies && (character.armorProficiencies["Sem Armadura"] || character.armorProficiencies.unarmored)) || "Treinado");
      setProfChecks("LIGHT", (character.armorProficiencies && (character.armorProficiencies["Leve"] || character.armorProficiencies.light)) || "Destreinado");
      setProfChecks("MEDIUM", (character.armorProficiencies && (character.armorProficiencies["Média"] || character.armorProficiencies.medium)) || "Destreinado");
      setProfChecks("HEAVY", (character.armorProficiencies && (character.armorProficiencies["Pesada"] || character.armorProficiencies.heavy)) || "Destreinado");

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
      setTxt("RESISTANCE AND IMMUNITIES", charResistances.map((r) => typeof r === "object" ? `${localizeCatalogItem(r.type || r.name, locale)} ${r.value || ""}`.trim() : localizeCatalogItem(String(r), locale)).join(", "));
      if (character.defenseNotes) {
        setTxt("DEFENSE NOTES", character.defenseNotes);
      }

      // ----------------------------------------------------
      // 4. SALVAGUARDAS (FORTITUDE, REFLEXOS, VONTADE)
      // ----------------------------------------------------
      const saves = calc.saves;
      // Fortitude: Con + Prof + Item
      setTxt("FORTITUDE", formatMod(saves.fortitude.total));
      setTxt("CONSTITUTION", formatMod(mods.con));
      setTxt("PROFICIENCY", saves.fortitude.prof !== undefined ? saves.fortitude.prof : getProfBonus(saves.fortitude.rank, level));
      setTxt("FORTITUDE ITEM", saves.fortitude.item || 0);
      setProfChecks("FORTITUDE", saves.fortitude.rank);

      // Reflexos: Dex + Prof + Item
      setTxt("REFLEX", formatMod(saves.reflex.total));
      setTxt("DEXTERITY", formatMod(mods.dex));
      setTxt("PROFICIENCY2", saves.reflex.prof !== undefined ? saves.reflex.prof : getProfBonus(saves.reflex.rank, level));
      setTxt("ITEM2", saves.reflex.item || 0);
      setProfChecks("REFLEX", saves.reflex.rank);

      // Vontade: Wis + Prof + Item
      setTxt("WILL", formatMod(saves.will.total));
      setTxt("WISDOM", formatMod(mods.wis));
      setTxt("PROFICIENCY3", saves.will.prof !== undefined ? saves.will.prof : getProfBonus(saves.will.rank, level));
      setTxt("WILL ITEM", saves.will.item || 0);
      setProfChecks("WILL", saves.will.rank);

      // ----------------------------------------------------
      // 5. PERCEPÇÃO, SENTIDOS & DESLOCAMENTO
      // ----------------------------------------------------
      const percRank = character.perceptionRank || (calc.perception && calc.perception.rank) || "Treinado";
      setTxt("PERCEPTION", formatMod((calc.perception && calc.perception.total) !== undefined ? calc.perception.total : (mods.wis + getProfBonus(percRank, level))));
      setTxt("PERCEPTION WISDOM", formatMod(mods.wis));
      const percProf = (calc.perception && calc.perception.prof) !== undefined ? calc.perception.prof : getProfBonus(percRank, level);
      setTxt("PERCEPTION PROFICIENCY", percProf);
      setTxt("PERCEPTION ITEM", (calc.perception && calc.perception.item) || (character.itemBonuses && character.itemBonuses.perception) || 0);
      setProfChecks("PERCEPTION", percRank);

      const sensesList = (Array.isArray(character.senses)
        ? character.senses
        : (character.senses ? [String(character.senses)] : (calc.senses || [])))
        .map(s => localizeSense(String(s), locale))
        .join(", ");
      setTxt("SENSES AND NOTES", sensesList);

      setTxt("SPEED", `${calc.speed || 25} ${isEn ? "ft" : (isEs ? "pies" : "pés")}`);
      setTxt("SPECIAL MOVEMENT", character.specialMovements || "");

      // ----------------------------------------------------
      // 6. CD DE CLASSE & PROFICIÊNCIAS DE ARMAS
      // ----------------------------------------------------
      const keyAttr = (calc.keyAttribute || character.keyAbility || "dex").slice(0, 3).toLowerCase();
      const defaultKeyMod = mods[keyAttr] !== undefined ? mods[keyAttr] : mods.dex;
      const classDcObj = calc.classDcObj || (calc.classDc ? { total: calc.classDc, key: defaultKeyMod, prof: getProfBonus("Treinado", level), item: 0 } : null);
      const classDcTotal = (classDcObj && classDcObj.total) || calc.classDc || (10 + defaultKeyMod + getProfBonus("Treinado", level));
      setTxt("CLASS DC", classDcTotal);
      setTxt("CLASS DC KEY", formatMod(classDcObj && classDcObj.key !== undefined ? classDcObj.key : defaultKeyMod));
      setTxt("CLASS DC PROFICIENCY", classDcObj && classDcObj.prof !== undefined ? classDcObj.prof : getProfBonus("Treinado", level));
      setTxt("CLASS DC ITEM", (classDcObj && classDcObj.item) || 0);
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
      const skillsMap = {
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
        const sk = (calc.skills && calc.skills[skKey]) || { total: 0, rank: "Destreinado", profBonus: 0, itemBonus: 0, penalty: 0 };
        setTxt(meta.name, formatMod(sk.total));
        setTxt(`${meta.name} PROFICIENCY`, sk.profBonus || 0);
        setTxt(`${meta.name} ITEM`, sk.itemBonus || 0);
        if (sk.penalty) {
          setTxt(`${meta.name} ARMOR`, String(Math.abs(sk.penalty)));
        }
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
        const locLoreName = localizeCatalogItem(loreSkills[0].name, locale) || (isEn ? "Lore" : (isEs ? "Saber" : "Saber"));
        setTxt("LORE CATAGORY 1", locLoreName);
        setTxt("LORE CATEGORY 1", locLoreName);
        const l1Prof = getProfBonus(loreSkills[0].rank || "Treinado", level);
        setTxt("LORE1", formatMod(mods.int + l1Prof));
        setTxt("LORE 1 INTELLIGENCE", formatMod(mods.int));
        setTxt("LORE 1 PFOCIENCY", l1Prof);
        setTxt("LORE 1 PROFICIENCY", l1Prof);
        setProfChecks("LORE1", loreSkills[0].rank || "Treinado");
      }
      if (loreSkills[1]) {
        const locLoreName2 = localizeCatalogItem(loreSkills[1].name, locale) || (isEn ? "Lore" : (isEs ? "Saber" : "Saber"));
        setTxt("LORE CATEGORY 2", locLoreName2);
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
      const meleeStrikes = strikes.filter((s) => !s.isRanged);
      const rangedStrikes = strikes.filter((s) => s.isRanged);

      const applyDamageTypeChecks = (dt, suffix) => {
        const t = String(dt || "").toLowerCase();
        if (t.includes("impacto") || t.includes("bludgeoning") || t.includes("contundente") || t.includes("esmagamento") || t === "b") {
          setChk(`B${suffix}`, true);
        }
        if (t.includes("perfuração") || t.includes("piercing") || t.includes("perfurante") || t === "p") {
          setChk(`P${suffix}`, true);
        }
        if (t.includes("cortante") || t.includes("slashing") || t.includes("corte") || t === "s") {
          setChk(`S${suffix}`, true);
        }
      };

      meleeStrikes.slice(0, 3).forEach((st, idx) => {
        const n = idx + 1;
        const totalAtk = st.attackTotal !== undefined ? st.attackTotal : (st.totalAttack !== undefined ? st.totalAttack : (st.attackBonus || 0));
        const locStrikeName = cleanWeaponName(st.name, locale);
        const locTraitsStr = (st.traits || []).map((t) => localizeTrait(t, locale)).join(", ");
        const isFinesse = (st.traits || []).some((t) => /finesse|acurada|acuidade/i.test(t));
        const strikeAttrMod = (isFinesse && mods.dex >= mods.str) ? mods.dex : mods.str;
        const locDamageType = localizeDamageType(st.damageType, locale);
        const dmgFormatted = (st.damageFormatted || st.damage || "1d6").trim();
        const fullDamageStr = locDamageType && !dmgFormatted.toLowerCase().includes(locDamageType.toLowerCase())
          ? `${dmgFormatted} ${locDamageType}`
          : dmgFormatted;

        setTxt(`MELEE STRIKE ${n}`, locStrikeName);
        setTxt(`MELEE STRIKE ${n} ATTACK BONUS`, formatMod(totalAtk));
        setTxt(`MELEE STRIKE ${n} STRENGTH`, formatMod(strikeAttrMod));
        setTxt(`MELEE STRIKE ${n} PROFICIENCY`, getProfBonus(st.rank || "Treinado", level));
        setTxt(`MELEE STRIKE ${n} ITEM BONUS`, st.itemBonus || 0);
        setTxt(`MELEE STRIKE ${n} ITEM`, st.itemBonus || 0);
        setTxt(`MELEE STRIKE ${n} DAMAGE`, fullDamageStr);
        setTxt(`MELEE STRIKE ${n} TRAITS AND NOTES`, locTraitsStr);
        applyDamageTypeChecks(st.damageType, n === 1 ? "" : `_${n}`);
      });

      rangedStrikes.slice(0, 2).forEach((st, idx) => {
        const n = idx + 4;
        const totalAtk = st.attackTotal !== undefined ? st.attackTotal : (st.totalAttack !== undefined ? st.totalAttack : (st.attackBonus || 0));
        const locStrikeName = cleanWeaponName(st.name, locale);
        const locTraitsStr = (st.traits || []).map((t) => localizeTrait(t, locale)).join(", ");
        const locDamageType = localizeDamageType(st.damageType, locale);
        const dmgFormatted = (st.damageFormatted || st.damage || "1d6").trim();
        const fullDamageStr = locDamageType && !dmgFormatted.toLowerCase().includes(locDamageType.toLowerCase())
          ? `${dmgFormatted} ${locDamageType}`
          : dmgFormatted;

        setTxt(`RANGED STRIKE ${n}`, locStrikeName);
        setTxt(`RANGED STRIKE ${n} ATTACK BONUS`, formatMod(totalAtk));
        setTxt(`RANGED STRIKE ${n} DEXTERITY`, formatMod(mods.dex));
        setTxt(`RANGED STRIKE ${n} PROFICIENCY`, getProfBonus(st.rank || "Treinado", level));
        setTxt(`RANGED STRIKE ${n} ITEM BONUS`, st.itemBonus || 0);
        setTxt(`RANGED STRIKE ${n} ITEM`, st.itemBonus || 0);
        setTxt(`RANGED STRIKE ${n} DAMAGE`, fullDamageStr);
        setTxt(`RANGED STRIKE ${n} TRAITS AND NOTES`, locTraitsStr);
        applyDamageTypeChecks(st.damageType, `_${n}`);
      });

      // ----------------------------------------------------
      // 9. TALENTOS & PROGRESSÃO (PÁGINA 2)
      // ----------------------------------------------------
      const rawFeats = character.feats;
      const progression = character.progression || {};

      let ancestryFeatsList = [];
      let classFeatsList = [];
      let skillFeatsList = [];
      let generalFeatsList = [];
      let backgroundSkillFeat = "";

      if (rawFeats && !Array.isArray(rawFeats) && typeof rawFeats === "object") {
        if (Array.isArray(rawFeats.ancestry)) ancestryFeatsList.push(...rawFeats.ancestry);
        if (rawFeats.background) backgroundSkillFeat = String(rawFeats.background);
        if (Array.isArray(rawFeats.class)) {
          rawFeats.class.forEach((cf, i) => classFeatsList.push({ name: typeof cf === "string" ? cf : cf.name, level: (i + 1) }));
        }
        if (Array.isArray(rawFeats.skill)) {
          rawFeats.skill.forEach((sf, i) => skillFeatsList.push({ name: typeof sf === "string" ? sf : sf.name, level: (i + 2) }));
        }
        if (Array.isArray(rawFeats.general)) generalFeatsList.push(...rawFeats.general);
      } else if (Array.isArray(rawFeats)) {
        rawFeats.forEach((f) => {
          const name = typeof f === "string" ? f : f.name;
          const slotId = String(f.slotId || "");
          const typeStr = String(f.type || "").toLowerCase();
          const notes = f.source && f.source.book ? `${f.source.book}${f.source.page ? ` p.${f.source.page}` : ""}` : "";
          const traits = Array.isArray(f.traits) ? f.traits.join(", ") : "";

          if (slotId.includes("ancestry_feat") || typeStr.includes("ancestral") || typeStr.includes("ancestry")) {
            ancestryFeatsList.push(name);
          } else if (slotId.includes("skill_feat") || typeStr.includes("perícia") || typeStr.includes("skill")) {
            skillFeatsList.push({ name, level: f.level, notes, traits });
          } else if (slotId.includes("general_feat") || typeStr.includes("geral") || typeStr.includes("general")) {
            generalFeatsList.push(name);
          } else {
            classFeatsList.push({ name, level: f.level, notes, traits });
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

      // Resolve background feat if omitted
      if (!backgroundSkillFeat && character.background) {
        const data = typeof PF2E_DATA !== "undefined" ? PF2E_DATA : (globalThis && globalThis.PF2E_DATA);
        const bgList = (data && data.backgrounds) || [];
        const bgEntry = bgList.find(b => b.name === character.background || b.id === character.background || (b.names && Object.values(b.names).includes(character.background)));
        if (bgEntry && bgEntry.feat) backgroundSkillFeat = bgEntry.feat;
      }

      const tLabels = {
        ancestry: isEn ? "Ancestry" : (isEs ? "Ascendencia" : "Ancestralidade"),
        heritage: isEn ? "Heritage" : (isEs ? "Herencia" : "Herança"),
        senses: isEn ? "Senses" : (isEs ? "Sentidos" : "Sentidos"),
        movement: isEn ? "Movement" : (isEs ? "Movimiento" : "Movimento"),
        generalFeats: isEn ? "General Feats" : (isEs ? "Dotes Generales" : "Talentos Gerais"),
      };

      const locGeneralFeatsStr = generalFeatsList.map(f => localizeCatalogItem(f, locale)).join(", ");
      const ancestryAndHeritageAbilities = [
        locAncestry ? `${tLabels.ancestry}: ${locAncestry}` : "",
        locHeritage ? `${tLabels.heritage}: ${locHeritage}` : "",
        sensesList ? `${tLabels.senses}: ${sensesList}` : "",
        character.specialMovements ? `${tLabels.movement}: ${character.specialMovements}` : "",
        generalFeatsList.length ? `${tLabels.generalFeats}: ${locGeneralFeatsStr}` : ""
      ].filter(Boolean).join("\n");
      setTxt("ANCESTRY & HERITAGE ABILITIES", ancestryAndHeritageAbilities);
      setTxt("ANCESTRY FEAT", ancestryFeatsList.map(f => localizeCatalogItem(f, locale)).join(", "));
      const bgFeatDetails = getLocalizedFeatDetails(backgroundSkillFeat || (progression["background_feat"] || ""), locale);
      setTxt("BACKGROUND SKILL FEAT", bgFeatDetails.name);

      const classFeatures = Array.isArray(character.classFeatures) && character.classFeatures.length
        ? character.classFeatures.map(f => typeof f === "string" ? f : f.name)
        : Object.entries(progression).filter(([k]) => k.includes("class_feature")).map(([, v]) => String(v));

      let lvl1ClassFeats = [];
      let higherClassFeats = [];

      if (level === 1) {
        // No nível 1, nenhum talento de classe vai para a linha CLASS FEAT 1-1 (que é do nível 2)
        lvl1ClassFeats = classFeatsList;
        higherClassFeats = [];
      } else {
        // A partir do nível 2, os talentos de classe preenchem as linhas numeradas (1-1 é nível 2, 2-1 é nível 4, etc.)
        lvl1ClassFeats = [];
        higherClassFeats = classFeatsList;
      }

      const allLvl1Features = [
        ...classFeatures.map(f => localizeCatalogItem(f, locale)),
        ...lvl1ClassFeats.map(f => {
          const d = getLocalizedFeatDetails(f.name, locale);
          return `${d.name}${d.notes ? ` (${d.notes})` : ""}`;
        })
      ];
      setTxt("CLASS FEATS & FEATURES", allLvl1Features.join("\n"));

      // Higher level class feats:
      higherClassFeats.forEach((f, idx) => {
        const slotIdx = idx + 1;
        if (slotIdx >= 1 && slotIdx <= 10) {
          const details = getLocalizedFeatDetails(f.name, locale);
          setTxt(`CLASS FEAT ${slotIdx}-1`, details.name);
          setTxt(`CLASS FEAT ${slotIdx}-2`, details.notes || f.notes || details.description || "");
          setTxt(`CLASS FEAT ${slotIdx}-3`, details.traits || f.traits || "");
        }
      });

      // Preenche linhas numeradas de Talentos de Perícia (2-20)
      skillFeatsList.slice(0, 20).forEach((f, idx) => {
        const lvl = idx + 2;
        const details = getLocalizedFeatDetails(f.name, locale);
        setTxt(`SKILL FEAT ${lvl}-1`, details.name);
        setTxt(`SKILL FEAT ${lvl}-2`, details.notes || f.notes || details.description || "");
        setTxt(`SKILL FEAT ${lvl}-3`, details.traits || f.traits || "");
      });

      // ----------------------------------------------------
      // 10. AÇÕES ESPECIAIS & REAÇÕES (PÁGINA 1 E 2)
      // ----------------------------------------------------
      // Limpa campos padrão do PDF para não vazar texto de exemplo da Paizo
      for (let i = 1; i <= 4; i++) {
        setTxt(`ACTION NAME ${i}`, "");
        setTxt(`ACTIONS COUNT ${i}`, "");
        setTxt(`ACTION SOURCE ${i}`, "");
        setTxt(`ACTIONS SOURCE ${i}`, "");
        setTxt(`TRAIT(S)${i}`, "");
        setTxt(`EFFECTS ${i}-1`, "");
      }
      for (let i = 1; i <= 4; i++) {
        setTxt(`REACTION NAME ${i}`, "");
        setTxt(`REACTIONS TRIGGER ${i}-1`, "");
        setTxt(`REACTIONS TRIGGER ${i}-2`, "");
        setTxt(`REACTIONS EFFECTS ${i}-1`, "");
        setTxt(`REACTIONS SOURCE ${i}`, "");
        setTxt(`REACTIONS PAGE ${i}`, "");
        setTxt(`REACTIONS TRAITS ${i}`, "");
      }

      const actionsList = character.actions || [];
      actionsList.slice(0, 4).forEach((act, idx) => {
        const n = idx + 1;
        const locActName = localizeCatalogItem(act.name, locale);
        setTxt(`ACTION NAME ${n}`, locActName);
        setTxt(`ACTIONS COUNT ${n}`, String(act.actions || "◆"));
        setTxt(`ACTION SOURCE ${n}`, act.source || "");
        setTxt(`ACTIONS SOURCE ${n}`, act.source || "");
        const traits = Array.isArray(act.traits)
          ? act.traits.map(t => localizeTrait(t, locale)).join(", ")
          : (act.traits ? localizeTrait(String(act.traits), locale) : "");
        setTxt(`TRAIT(S)${n}`, traits);
        setTxt(`EFFECTS ${n}-1`, act.description || act.effect || "");
      });

      const reactionsList = character.reactions || [];
      reactionsList.slice(0, 4).forEach((react, idx) => {
        const n = idx + 1;
        const locReactName = localizeCatalogItem(react.name, locale);
        setTxt(`REACTION NAME ${n}`, locReactName);
        setTxt(`REACTIONS TRIGGER ${n}-1`, react.trigger || "");
        setTxt(`REACTIONS EFFECTS ${n}-1`, react.effect || react.description || "");
        setTxt(`REACTIONS SOURCE ${n}`, react.source || "");
        const traits = Array.isArray(react.traits)
          ? react.traits.map(t => localizeTrait(t, locale)).join(", ")
          : (react.traits ? localizeTrait(String(react.traits), locale) : "");
        setTxt(`REACTIONS TRAITS ${n}`, traits);
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
        const locItemName = localizeCatalogItem(item.name, locale);
        setTxt(`WORN ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${locItemName}`);
        setTxt(`WORN BULK ${n}`, String(item.bulk || "—"));
      });
      heldItems.slice(0, 11).forEach((item, idx) => {
        const n = idx + 1;
        const locItemName = localizeCatalogItem(item.name, locale);
        const text = `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${locItemName}`;
        if (n === 1) setTxt("HELD1", text);
        setTxt(`HELD ${n}`, text);
        setTxt(`HELD BULK ${n}`, String(item.bulk || "—"));
      });
      consumableItems.slice(0, 11).forEach((item, idx) => {
        const n = idx + 1;
        const locItemName = localizeCatalogItem(item.name, locale);
        setTxt(`CONSUMABLES ${n}`, `${item.qty && item.qty > 1 ? item.qty + 'x ' : ''}${locItemName}`);
        setTxt(`CONSUMABLES BULK ${n}`, String(item.bulk || "—"));
      });

      setTxt("BULK TOTAL", String(calc.bulk && calc.bulk.current ? calc.bulk.current : 0));

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
      // Limpa campos padrão de magia para não vazar em personagens não conjuradores
      setTxt("Magical Tradition", "");
      setChk("ARCANE", false);
      setChk("DIVINE", false);
      setChk("OCCULT", false);
      setChk("PRIMAL", false);
      setTxt("SPELL ATTACK", "");
      setTxt("SPELL ATTACK KEY", "");
      setTxt("SPELL ATTACK PROFICIENCY", "");
      setTxt("SPELL SAVE DC", "");
      setTxt("SPELL SAVE DC KEY", "");
      setTxt("SPELL SAVE DC PROFICIENCY", "");
      setChk("FP1", false);
      setChk("FP 1", false);
      setChk("FP2", false);
      setChk("FP 2", false);
      setChk("FP 3", false);

      const allSpells = Array.isArray(character.spells) ? character.spells : [];
      const cantrips = allSpells.filter(sp => Number(sp.rank) === 0).concat(character.cantrips || []);
      const leveledSpells = allSpells.filter(sp => Number(sp.rank) > 0);
      const innateSpells = Array.isArray(character.innateSpells) ? character.innateSpells : [];
      const focusSpells = Array.isArray(character.focusSpells) ? character.focusSpells : [];

      const casterClasses = ["mago", "wizard", "clérigo", "clerigo", "cleric", "druida", "druid", "bardo", "bard", "feiticeiro", "sorcerer", "oráculo", "oraculo", "oracle", "bruxa", "witch", "psíquico", "psiquico", "psychic", "magus", "conjurador", "summoner", "animista", "animist", "exemplar"];
      const charClassLower = String(character.class || "").toLowerCase();
      const isCasterClass = casterClasses.some(c => charClassLower.includes(c));
      const hasSpells = cantrips.length > 0 || leveledSpells.length > 0 || innateSpells.length > 0 || focusSpells.length > 0;
      const isSpellcaster = Boolean(character.magicalTradition) || isCasterClass || hasSpells;

      if (isSpellcaster) {
        const tradition = character.magicalTradition || (isCasterClass ? "Arcana" : "");
        if (tradition) {
          setTxt("Magical Tradition", tradition);
          const tradNorm = tradition.toLowerCase();
          setChk("ARCANE", tradNorm.includes("arcan"));
          setChk("DIVINE", tradNorm.includes("divin"));
          setChk("OCCULT", tradNorm.includes("ocult") || tradNorm.includes("occult"));
          setChk("PRIMAL", tradNorm.includes("primal") || tradNorm.includes("primordial"));
        }

        // Ataque Mágico & CD de Magia
        const abilityKey = (character.spellcastingAbility || "int").slice(0, 3).toLowerCase();
        const spellKeyMod = mods[abilityKey] !== undefined ? mods[abilityKey] : mods.int;
        const spellAttackRank = character.spellAttackRank || (isCasterClass ? "Treinado" : "Destreinado");
        const spellAttackProf = getProfBonus(spellAttackRank, level);
        const spellAttackTotal = spellKeyMod + spellAttackProf;
        if (spellAttackRank !== "Destreinado" || isCasterClass) {
          setTxt("SPELL ATTACK", formatMod(spellAttackTotal));
          setTxt("SPELL ATTACK KEY", formatMod(spellKeyMod));
          setTxt("SPELL ATTACK PROFICIENCY", spellAttackProf);
          setProfChecks("SPELL ATTACK", spellAttackRank);
        }

        const spellDcRank = character.spellDcRank || (isCasterClass ? "Treinado" : "Destreinado");
        const spellDcProf = getProfBonus(spellDcRank, level);
        const spellDcTotal = 10 + spellKeyMod + spellDcProf;
        if (spellDcRank !== "Destreinado" || isCasterClass) {
          setTxt("SPELL SAVE DC", spellDcTotal);
          setTxt("SPELL SAVE DC KEY", formatMod(spellKeyMod));
          setTxt("SPELL SAVE DC PROFICIENCY", spellDcProf);
          setProfChecks("SPELL SAVE DC", spellDcRank);
        }

        // Espaços por dia
        const engine = typeof PF2E_ENGINE !== "undefined" ? PF2E_ENGINE : (globalThis && globalThis.PF2E_ENGINE);
        const spellSlots = (engine && typeof engine.getSpellSlots === "function")
          ? engine.getSpellSlots(character)
          : null;
        const slotsObj = (spellSlots && spellSlots.slots) ? spellSlots.slots : {};
        for (let r = 1; r <= 10; r++) {
          const slotsCount = slotsObj[r] || 0;
          if (slotsCount > 0) {
            setTxt(`SPELLS PER DAY ${r}`, String(slotsCount));
            setTxt(`SPELLS REMAINING ${r}`, String(slotsCount));
          }
        }

        // Preenche Truques nos campos dedicados
        const cantripHeightenedRank = Math.ceil(level / 2);
        if (cantrips.length > 0) {
          setTxt("CANTRIPS RANK", String(cantripHeightenedRank));
          cantrips.slice(0, 18).forEach((c, idx) => {
            const n = idx + 1;
            const locSpellName = localizeCatalogItem(c.name, locale);
            setTxt(`CANTRIP NAME ${n}`, locSpellName);
            setTxt(`CANTRIP ${n} ACTIONS`, c.actions || "◆◆");
            setChk(`CANTRIP ${n} PREPARED`, true);
          });
        }

        // Preenche Magias de Nível
        leveledSpells.slice(0, 35).forEach((sp, idx) => {
          const n = idx + 1;
          const locSpellName = localizeCatalogItem(sp.name, locale);
          setTxt(`SPELL ${n}`, locSpellName);
          setTxt(`SPELL RANK ${n}`, String(sp.rank || 1));
          setTxt(`SPELL ACTION ${n}`, sp.actions || "◆◆");
          setChk(`SPELL PREPARED ${n}`, true);
        });

        // Magias Inatas
        innateSpells.slice(0, 6).forEach((insp, idx) => {
          const n = idx + 1;
          const locSpellName = localizeCatalogItem(insp.name, locale);
          setTxt(`INNATE SPELL ${n}`, locSpellName);
          setTxt(`INNATE FREQ ${n}`, insp.freq || (isEn ? "1/day" : (isEs ? "1/día" : "1/dia")));
          setTxt(`INNATE SPELL ACTION ${n}`, insp.actions || "◆◆");
        });

        // Magias de Foco & Pontos de Foco
        focusSpells.slice(0, 8).forEach((fsp, idx) => {
          const n = idx + 1;
          const locSpellName = localizeCatalogItem(fsp.name, locale);
          setTxt(`FOCUS SPELL ${n}`, locSpellName);
          setTxt(`FOCUS SPELL ACTIONS ${n}`, fsp.actions || "◆");
        });
        if (focusSpells.length > 0 || Number(character.focusPoints) > 0) {
          const cantripHeightenedRank = Math.ceil(level / 2);
          setTxt("FOCUS SPELL RANK", String(character.focusSpellRank || cantripHeightenedRank));
          const focusPoints = Number(character.focusPoints || Math.min(3, focusSpells.length));
          setChk("FP1", focusPoints >= 1);
          setChk("FP 1", focusPoints >= 1);
          setChk("FP2", focusPoints >= 2);
          setChk("FP 2", focusPoints >= 2);
          setChk("FP 3", focusPoints >= 3);
        }
      }

      return await pdfDoc.save();
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = PF2E_PDF_FILLER;
    module.exports.PF2E_PDF_FILLER = PF2E_PDF_FILLER;
  } else {
    global.PF2E_PDF_FILLER = PF2E_PDF_FILLER;
  }
})(typeof window !== "undefined" ? window : globalThis);
