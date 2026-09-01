/**
 * COMPÊNDIO PATHFINDER 2E (REMASTER & SUPLEMENTOS), com metadados trilíngues.
 * A cobertura é incremental e cada registro não confirmado permanece marcado
 * como needs_review até receber fonte e página verificáveis.
 */

const PF2E_DATA = {
  // ==========================================
  // 1. TODAS AS ANCESTRALIDADES (RAÇAS)
  // ==========================================
  ancestries: {
    "Humano": {
      hp: 8,
      size: "Médio",
      speed: 25,
      senses: [],
      boosts: ["Livre", "Livre"],
      flaws: [],
      languages: ["Comum", "1 idioma adicional"],
      description: "Adaptáveis, ambiciosos e diversos, os humanos prosperam em todos os cantos de Golarion.",
      heritages: ["Humano Versátil (Talento Geral extra)", "Humano Habilidoso (Perícia extra)", "Meio-Elfo (Aelfin)", "Meio-Orc (Dromaar)", "Humano Herdeiro do Inverno"]
    },
    "Anão": {
      hp: 10,
      size: "Médio",
      speed: 20,
      senses: ["Visão no Escuro"],
      boosts: ["Constituição", "Sabedoria", "Livre"],
      flaws: ["Carisma"],
      languages: ["Comum", "Anão"],
      description: "Robustos, resolutos e honrados, conhecidos por sua habilidade em cantaria, metalurgia e bravura subterrânea.",
      heritages: ["Anão Forjado em Rocha", "Anão Couro-de-Pedra", "Anão Mente Forte", "Anão da Forja", "Anão da Tumba"]
    },
    "Elfo": {
      hp: 6,
      size: "Médio",
      speed: 30,
      senses: ["Visão na Penumbra"],
      boosts: ["Destreza", "Inteligência", "Livre"],
      flaws: ["Constituição"],
      languages: ["Comum", "Élfico"],
      description: "Ágeis, elegantes e longevos, possuidores de profunda afinidade com magia e a natureza.",
      heritages: ["Elfo da Floresta Antiga", "Elfo do Ártico", "Elfo da Caverna", "Elfo Vidente", "Elfo Nômade dos Sussurros"]
    },
    "Gnomo": {
      hp: 8,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Constituição", "Carisma", "Livre"],
      flaws: ["Força"],
      languages: ["Comum", "Gnomo", "Silvestre"],
      description: "Criaturas vibrantes e curiosas de origem feérica, movidos pela busca de novas experiências para evitar o Branqueamento.",
      heritages: ["Gnomo Camaleão", "Gnomo Feérico", "Gnomo Sensitivo", "Gnomo do Umbral", "Gnomo Poço de Vigor"]
    },
    "Goblin": {
      hp: 6,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Destreza", "Carisma", "Livre"],
      flaws: ["Sabedoria"],
      languages: ["Comum", "Goblin"],
      description: "Engenhosos, resilientes e apaixonados por fogo e canções caóticas, com dentes afiados e coragem surpreendente.",
      heritages: ["Goblin Cabeça-Dura", "Goblin Carbonizado (Resistência a Fogo)", "Goblin Irritadiço", "Goblin Dente-de-Navalha", "Goblin Macaco"]
    },
    "Halfling": {
      hp: 6,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Destreza", "Sabedoria", "Livre"],
      flaws: ["Força"],
      languages: ["Comum", "Halfling"],
      description: "Otimistas, afortunados e leais, dotados de uma furtividade natural e determinação inabalável.",
      heritages: ["Halfling Pés-Leves", "Halfling Destemido", "Halfling Esguio", "Halfling Nômade da Colina", "Halfling Abençoado pela Sorte"]
    },
    "Leshy": {
      hp: 8,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Constituição", "Sabedoria", "Livre"],
      flaws: ["Inteligência"],
      languages: ["Comum", "Silvestre"],
      description: "Espíritos da natureza imbuídos em corpos vegetais vivos criados por magia druídica.",
      heritages: ["Leshy Folhoso", "Leshy Frutífero", "Leshy Espinhoso", "Leshy Fúngico", "Leshy da Flor de Lótus"]
    },
    "Orc": {
      hp: 10,
      size: "Médio",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Força", "Livre"],
      flaws: [],
      languages: ["Comum", "Orc"],
      description: "Guerreiros poderosos que valorizam força de vontade, resistência férrea e sobrevivência a qualquer custo.",
      heritages: ["Orc dos Ermos", "Orc Couro-de-Batalha", "Orc da Chuva Profunda", "Orc Cicatrizado", "Orc Presa-de-Ferro"]
    },
    "Catfolk (Amurrun / Povo-Gato)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Destreza", "Carisma", "Livre"],
      flaws: ["Sabedoria"],
      languages: ["Comum", "Amurrun"],
      description: "Humanoides felinos curiosos, ágeis e gregários que viajam em busca de segredos e maravilhas.",
      heritages: ["Povo-Gato Caçador", "Povo-Gato Garra-Flexível", "Povo-Gato Nove-Vidas", "Povo-Gato da Selva"]
    },
    "Ratfolk (Ysoki / Povo-Rato)": {
      hp: 6,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Destreza", "Inteligência", "Livre"],
      flaws: ["Força"],
      languages: ["Comum", "Ysoki"],
      description: "Criaturas engenhosas que vivem em comunidades unidas e guardam bugigangas úteis em bochechas expansíveis.",
      heritages: ["Povo-Rato das Profundezas", "Povo-Rato da Tempestade", "Povo-Rato Bochecha Longa", "Povo-Rato dos Túneis"]
    },
    "Kobold": {
      hp: 6,
      size: "Pequeno",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Destreza", "Carisma", "Livre"],
      flaws: ["Constituição"],
      languages: ["Comum", "Dracônico"],
      description: "Pequenos humanoides reptilianos que compartilham o sangue orgulhoso e o sopro elemental dos dragões.",
      heritages: ["Kobold Escama-Dracônica", "Kobold Venenoso", "Kobold Cavernoso", "Kobold Tece-Feitiço"]
    },
    "Lizardfolk (Iruxi / Homem-Lagarto)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Força", "Sabedoria", "Livre"],
      flaws: ["Inteligência"],
      languages: ["Comum", "Iruxi"],
      description: "Répteis antigos e contemplativos profundamente sintonizados com os ciclos naturais e pântanos.",
      heritages: ["Iruxi dos Penhascos", "Iruxi Aquático", "Iruxi Couro-de-Placas", "Iruxi Caçador Noturno"]
    },
    "Kitsune": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Carisma", "Livre"],
      flaws: [],
      languages: ["Comum", "Silvestre"],
      description: "Humanoides metamorfos raposinos ligados ao plano espiritual, mestres da ilusão e charme.",
      heritages: ["Kitsune Celestial", "Kitsune da Terra", "Kitsune Espiritual", "Kitsune Fogo-Fátuo"]
    },
    "Tengu": {
      hp: 6,
      size: "Médio",
      speed: 25,
      boosts: ["Destreza", "Livre"],
      flaws: [],
      languages: ["Comum", "Tengu"],
      description: "Humanoides corvídeos conhecidos pelo domínio de espadas, curiosidade brilhante e sorte dos ventos.",
      heritages: ["Tengu Bico-de-Navalha", "Tengu Olho-da-Tempestade", "Tengu Asa-Céu", "Tengu da Montanha"]
    },
    "Tripkee": {
      hp: 6,
      size: "Pequeno",
      speed: 25,
      boosts: ["Destreza", "Sabedoria", "Livre"],
      flaws: ["Força"],
      languages: ["Comum", "Tripkee"],
      description: "Humanoides anfíbios pequenos e prudentes, hábeis em escalar e em proteger suas comunidades arborícolas.",
      heritages: ["Tripkee Peletóxica", "Tripkee Ribeirinho", "Tripkee Línguaveloz", "Tripkee Dedoaderente", "Tripkee Peledura", "Tripkee Flutuante"]
    },
    "Azarketi": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Constituição", "Carisma", "Livre"],
      flaws: ["Sabedoria"],
      languages: ["Comum", "Aquano"],
      description: "Humanoides anfíbios herdeiros dos mares e do antigo império subaquático de Azlant.",
      heritages: ["Azarketi dos Mares Profundos", "Azarketi Fluvial", "Azarketi Escamado", "Azarketi Névoa"]
    },
    "Autômato (Automaton)": {
      hp: 10,
      size: "Médio",
      speed: 25,
      boosts: ["Força", "Livre"],
      flaws: [],
      languages: ["Comum", "Utopiano"],
      description: "Constructos conscientes forjados na era de Jistka, alimentados por almas imortais e núcleos de energia viva.",
      heritages: ["Autômato Blindado", "Autômato de Caça Veloz", "Autômato do Núcleo Brilhante", "Autômato Guerreiro"]
    },
    "Andróide (Android)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Destreza", "Inteligência", "Livre"],
      flaws: ["Carisma"],
      languages: ["Comum", "Androide"],
      description: "Seres biotecnológicos criados em naves ancestrais caídas, com circuitos brilhantes e mentes lógicas.",
      heritages: ["Andróide Artesão", "Andróide Caçador", "Andróide Sombra", "Andróide Guerreiro"]
    },
    "Gnoll (Kholo)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Força", "Inteligência", "Livre"],
      flaws: ["Sabedoria"],
      languages: ["Comum", "Gnoll"],
      description: "Hienídeos astutos e pragmáticos do deserto que valorizam lealdade ao bando e engenhosidade tática.",
      heritages: ["Kholo Mandíbula de Ferro", "Kholo dos Desfiladeiros", "Kholo Fantasma"]
    },
    "Fetchling (Kayal / Tenebroso)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      boosts: ["Destreza", "Livre"],
      flaws: [],
      languages: ["Comum", "Sombrio"],
      description: "Descendentes de humanos presos no Plano das Sombras que se adaptaram à penumbra e à magia da noite.",
      heritages: ["Kayal das Sombras Profundas", "Kayal Furtivo", "Kayal Sem Rosto"]
    },
    "Hobgoblin": {
      hp: 8,
      size: "Médio",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Constituição", "Inteligência", "Livre"],
      flaws: ["Sabedoria"],
      languages: ["Comum", "Goblin"],
      description: "Guerreiros disciplinados e calculistas que encaram a vida e a guerra com rigor marcial absoluto.",
      heritages: ["Hobgoblin Couro de Ferro", "Hobgoblin Fumegante", "Hobgoblin Vanguarda"]
    },
    "Esqueleto (Skeleton)": {
      hp: 6,
      size: "Médio",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Destreza", "Carisma", "Livre"],
      flaws: ["Inteligência"],
      languages: ["Comum", "Necril"],
      description: "Restos mortais reanimados dotados de consciência própria, imunidade a efeitos vitais e afinidade com o Vazio.",
      heritages: ["Esqueleto Encouraçado", "Esqueleto Compacto", "Esqueleto Monstruoso", "Esqueleto da Tumba"]
    },
    "Centauro (Centaur)": {
      hp: 10,
      size: "Grande",
      speed: 30,
      senses: ["Visão na Penumbra"],
      boosts: ["Força", "Sabedoria", "Livre"],
      flaws: ["Destreza"],
      languages: ["Comum", "Centauro", "Élfico"],
      description: "Seres nobres com tronco humanoide e corpo inferior quadrúpede de cavalo, velozes guardiões das planícies e florestas.",
      heritages: ["Centauro dos Bosques", "Centauro Corredor da Estepe", "Centauro Couro-de-Ferro", "Centauro Místico"]
    },
    "Minotauro (Minotaur)": {
      hp: 10,
      size: "Grande",
      speed: 25,
      senses: ["Visão no Escuro"],
      boosts: ["Força", "Constituição", "Livre"],
      flaws: ["Carisma"],
      languages: ["Comum", "Labiríntico"],
      description: "Humanoides taurinos maciços de força hercúlea e senso de orientação espacial infalível em masmorras e labirintos.",
      heritages: ["Minotauro Labiríntico", "Minotauro Chifres-de-Aço", "Minotauro das Montanhas", "Minotauro Espiritual"]
    },
    "Animal Desperto (Awakened Animal)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Livre", "Livre"],
      flaws: [],
      languages: ["Comum", "Silvestre"],
      description: "Feras e criaturas outrora selvagens que foram tocadas por magia primal ou celestial e ganharam consciência e fala.",
      heritages: ["Animal Ágil", "Animal Voador", "Animal Nadador", "Animal Robusto", "Animal Predador"]
    },
    "Tritão / Sereia (Merfolk)": {
      hp: 8,
      size: "Médio",
      speed: 20,
      swimSpeed: 30,
      senses: ["Visão na Penumbra"],
      boosts: ["Constituição", "Carisma", "Livre"],
      flaws: ["Destreza"],
      languages: ["Comum", "Aquano"],
      description: "Povo dos oceanos com caudas de peixe ou pernas mutáveis, governantes de cidades de coral e guardiões marítimos.",
      heritages: ["Tritão das Fendas Profundas", "Tritão do Recife Coralino", "Tritão Bípede da Maré"]
    },
    "Athamaru (Povo-Peixe)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      swimSpeed: 25,
      senses: ["Visão na Penumbra"],
      boosts: ["Força", "Sabedoria", "Livre"],
      flaws: ["Carisma"],
      languages: ["Comum", "Talican"],
      description: "Humanoides anfíbios com guelras e barbatanas que cultivam laços simbióticos com a fauna marinha.",
      heritages: ["Athamaru Caçador Coral", "Athamaru Barbatanas Rápidas", "Athamaru Abissal"]
    },
    "Surki (Povo-Inseto)": {
      hp: 8,
      size: "Médio",
      speed: 25,
      climbSpeed: 15,
      senses: ["Visão no Escuro"],
      boosts: ["Constituição", "Inteligência", "Livre"],
      flaws: ["Carisma"],
      languages: ["Comum", "Surki", "Petrano"],
      description: "Humanoides insectóides adaptados à vida subterrânea que consomem minerais mágicos para fortalecer suas carapaças.",
      heritages: ["Surki Carapaça Diamantina", "Surki Ferrão Ácido", "Surki Antenas Psíquicas"]
    }
  },

  // ==========================================
  // 2. HERANÇAS VERSÁTEIS (APLICÁVEIS A QUALQUER RAÇA)
  // ==========================================
  versatileHeritages: [
    { name: "Nephilim (Celestial / Aasimar)", description: "Tocado por energias celestiais, anjos ou arcontes. Concede visão no escuro e traço sagrado." },
    { name: "Nephilim (Infernal / Tiefling)", description: "Descendente de diabos, demônios ou daemons. Concede resistência a fogo e visão no escuro." },
    { name: "Dhampir (Meio-Vampiro)", description: "Filho do beijo da morte com cura negativa e presas drenadoras de vida." },
    { name: "Changeling (Cambionte / Filho de Bruxa)", description: "Filho de uma Bruxa com garras cortantes e olhos de cores diferentes." },
    { name: "Duskwalker (Caminhante do Crepúsculo)", description: "Reencarnado pelo tribunal de Pharasma com afinidade espiritual contra mortos-vivos." },
    { name: "Dracano (Dragonblood)", description: "Descendente de um dragão, com traços físicos ou magia inata ligados à sua genealogia dracônica." },
    { name: "Ifrit (Toque do Fogo)", description: "Sangue dos gênios de fogo com resistência a calor e chamas mágicas." },
    { name: "Oread (Toque da Terra)", description: "Sangue dos gênios da terra com pele de rocha e afinidade mineral." },
    { name: "Sylph (Toque do Vento)", description: "Sangue dos gênios do ar com passos velozes e controle de brisas." },
    { name: "Undine (Toque da Água)", description: "Sangue dos gênios da água com capacidade natural de nado e respiração aquática." },
    { name: "Ardande (Toque da Madeira)", description: "Sangue dos gênios da madeira com harmonia vegetal e cura regenerativa floral." },
    { name: "Talos (Toque do Metal)", description: "Sangue dos gênios do metal com pele condutiva e afinidade magnética com ferro e aço." },
    { name: "Fantasma (Ghost)", description: "Espírito incorpóreo ligado ao plano material por uma tarefa inacabada." },
    { name: "Ghoul (Carniçal)", description: "Amaldiçoado pela fome necrótica insaciável e garras paralisantes." },
    { name: "Múmia (Mummy)", description: "Preservado por óleos sagrados e maldições ancestrais que cobrem seu corpo enfaixado." },
    { name: "Vampiro (Vampire)", description: "Predador noturno aristocrático movido pela sede de sangue e hipnose." },
    { name: "Zumbi (Zombie)", description: "Cadáver reanimado com carne resiliente e vigor implacável que ignora a dor." },
    { name: "Beastkin (Toque Bestial / Teriantropo)", description: "Carrega a bênção ou maldição de uma besta interior (lobo, urso, falcão)." }
  ],

  // ==========================================
  // 3. TODAS AS 23 CLASSES DO PATHFINDER 2E
  // ==========================================
  classes: {
    "Alquimista (Alchemist)": {
      hpPerLevel: 8,
      keyAbility: ["Inteligência"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["crafting"],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado", "Bombas": "Treinado" },
      classDc: "Treinado",
      description: "Mestres de compostos químicos, bombas voláteis, elixires curativos e mutagênicos que alteram a forma física.",
      subclasses: ["Bombardeiro (Bomber)", "Cirurgião (Chirurgeon)", "Mutacionista (Mutagenist)", "Toxicologista (Toxicologist)"]
    },
    "Bárbaro (Barbarian)": {
      hpPerLevel: 12,
      keyAbility: ["Força"],
      perception: "Especialista",
      trainedSkillsCount: 3,
      fixedSkills: ["athletics"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Guerreiros furiosos que canalizam emoções primitivas em força avassaladora e resistências titânicas.",
      subclasses: ["Instinto Animal", "Instinto Dracônico", "Instinto dos Gigantes", "Instinto Espiritual", "Instinto da Fúria Elemental"]
    },
    "Bardo (Bard)": {
      hpPerLevel: 8,
      keyAbility: ["Carisma"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["occultism", "performance"],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Conjuradores ocultos que tecem melodias mágicas, manipulam o destino e inspiram seus aliados com maestria.",
      subclasses: ["Musa da Erudição (Enigma)", "Musa da Coragem (Maestro)", "Musa da Lâmina (Warrior)", "Musa da Polifonia (Polymath)"]
    },
    "Bruxo (Witch)": {
      hpPerLevel: 6,
      keyAbility: ["Inteligência"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: [],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Conjuradores ligados a patronos enigmáticos através de um familiar místico vivo.",
      subclasses: [
        "Guardião da Fé Irrefreável (Faith's Flamekeeper / Guardián de la Fe Inquebrantable)",
        "Sentinela dos Ermos (Wilding Steward / Guardián de las Tierras Salvajes)",
        "O Inscrito (The Inscribed One / El Inscrito)",
        "O Ressentimento (The Resentment / El Resentimiento)",
        "O Tecelão de Destinos (Spinner of Threads / Tejedor de Destinos)",
        "O Silêncio Invernal (Silence in Snow / Silencio Invernal)",
        "A Sombra Inconstelada (Starless Shadow / Sombra sin Estrellas)"
      ]
    },
    "Campeão (Champion / Paladino)": {
      hpPerLevel: 10,
      keyAbility: ["Força", "Destreza"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["religion"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Treinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Emissários blindados de divindades e causas nobres com auras de proteção sagrada ou profana.",
      subclasses: ["Paladino (Retribuição)", "Redentor (Misericórdia)", "Libertador (Liberdade)", "Profano (Tiranos/Desesperadores)"]
    },
    "Cineticista (Kineticist)": {
      hpPerLevel: 8,
      keyAbility: ["Constituição"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: ["nature"],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Mestres que dobram os elementos puros (Fogo, Água, Terra, Ar, Madeira, Metal) com seu próprio corpo.",
      subclasses: ["Elemento do Fogo", "Elemento da Água", "Elemento da Terra", "Elemento do Ar", "Elemento da Madeira", "Elemento do Metal", "Portão Duplo"]
    },
    "Clérigo (Cleric)": {
      hpPerLevel: 8,
      keyAbility: ["Sabedoria"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["religion"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Arma da Divindade": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Devotos sagrados que canalizam curas milagrosas e punições divinas de seus deuses patronos.",
      subclasses: ["Doutrina de Conjurador Enclausurado (Cloistered)", "Doutrina de Clérigo de Guerra (Warpriest)"]
    },
    "Convocador (Summoner)": {
      hpPerLevel: 10,
      keyAbility: ["Carisma"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: [],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Conjuradores que compartilham vida e ações com uma manifestação viva chamada Eidolon.",
      subclasses: ["Eidolon Dragão", "Eidolon Fera", "Eidolon Anjo", "Eidolon Demônio", "Eidolon Fantasma", "Eidolon Elemental"]
    },
    "Druida (Druid)": {
      hpPerLevel: 8,
      keyAbility: ["Sabedoria"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["nature"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Guardiões da ordem primordial com magias da natureza, metamorfose de animais e companheiros selvagens.",
      subclasses: ["Ordem dos Animais", "Ordem das Folhas", "Ordem das Tempestades", "Ordem dos Metamorfos (Wild)", "Ordem das Ondas"]
    },
    "Espadachim (Swashbuckler)": {
      hpPerLevel: 10,
      keyAbility: ["Destreza"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["acrobatics"],
      savingThrows: { fortitude: "Treinado", reflex: "Especialista", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Duelistas ágeis e dramáticos que ganham Garbo (Panache) através de acrobacias e finalizadores letais.",
      subclasses: ["Esgrimista (Fencer)", "Mordaz (Wit)", "Fanfarrão (Braggart)", "Audaz (Battledancer)", "Ginasta (Gymnast)"]
    },
    "Feiticeiro (Sorcerer)": {
      hpPerLevel: 6,
      keyAbility: ["Carisma"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: [],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Nascidos com magia viva em suas veias herdada de dragões, fadas, anjos ou entidades cósmicas.",
      subclasses: ["Linhagem Dracônica", "Linhagem Feérica", "Linhagem Angélica", "Linhagem Demoníaca", "Linhagem Aberrante", "Linhagem Elemental", "Linhagem Imperial"]
    },
    "Guerreiro (Fighter)": {
      hpPerLevel: 10,
      keyAbility: ["Força", "Destreza"],
      perception: "Especialista",
      trainedSkillsCount: 3,
      fixedSkills: ["acrobatics"],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Treinado" },
      weapons: { "Simples": "Especialista", "Marcial": "Especialista", "Avançada": "Treinado", "Desarmado": "Especialista" },
      classDc: "Treinado",
      description: "O ápice da perícia marcial e precisão com armas, iniciando já como Especialista em combate.",
      subclasses: ["Estilo de Arma Dupla", "Estilo de Escudo e Lâmina", "Estilo de Arma de Duas Mãos", "Estilo Arqueiro", "Estilo Mão Livre"]
    },
    "Inquisidor / Investigador (Investigator)": {
      hpPerLevel: 8,
      keyAbility: ["Inteligência"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["society"],
      savingThrows: { fortitude: "Treinado", reflex: "Especialista", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Detetives analíticos que usam Estratagema do Perito (Devise a Stratagem) para antecipar seus ataques.",
      subclasses: ["Metodologia Alquímica", "Metodologia Forense", "Metodologia Interrogatória", "Metodologia Empírica"]
    },
    "Inventor": {
      hpPerLevel: 8,
      keyAbility: ["Inteligência"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: ["crafting"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Gênios da mecânica que constroem inovações lendárias (Armadura, Arma ou Companheiro Constructo).",
      subclasses: ["Inovação de Armadura", "Inovação de Arma", "Inovação de Companheiro Constructo"]
    },
    "Ladino (Rogue)": {
      hpPerLevel: 8,
      keyAbility: ["Destreza", "Força", "Carisma", "Inteligência", "Sabedoria"],
      perception: "Especialista",
      trainedSkillsCount: 7,
      fixedSkills: ["stealth"],
      savingThrows: { fortitude: "Treinado", reflex: "Especialista", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Especialistas em emboscadas, perícias abundantes e Ataques Furtivos letais contra alvos desprevenidos.",
      subclasses: ["Trapaceiro (Scoundrel)", "Ladrão Furtivo (Thief)", "Bruto (Ruffian)", "Mestre da Mente (Mastermind)", "Eldritch Trickster"]
    },
    "Mago (Wizard)": {
      hpPerLevel: 6,
      keyAbility: ["Inteligência"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["arcana"],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Estudiosos supremos das leis do arcano, preparando feitiços complexos em seus grimórios antigos.",
      subclasses: [
        "Escola da Ars Grammatica (School of Ars Grammatica / Escuela de Ars Grammatica)",
        "Escola da Forma Proteana (School of the Protean Form / Escuela de la Forma Proteica)",
        "Escola dos Limiares (School of the Boundary / Escuela de los Límites)",
        "Escola da Magia Bélica (School of Battle Magic / Escuela de Magia Bélica)",
        "Escola da Magia Cívica (School of Civic Magic / Escuela de Magia Cívica)",
        "Escola do Mentalismo (School of Mentalism / Escuela del Mentalismo)",
        "Escola da Teoria Mágica Unificada (School of Unified Magical Theory / Escuela de Teoría Mágica Unificada)"
      ]
    },
    "Magus": {
      hpPerLevel: 8,
      keyAbility: ["Força", "Destreza"],
      perception: "Treinado",
      trainedSkillsCount: 2,
      fixedSkills: ["arcana"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Guerreiros arcanos que canalizam feitiços devastadores através de lâminas em Ataques Mágicos (Spellstrike).",
      subclasses: ["Árvore Retorcida (Twisting Tree / Árbol retorcido)", "Ferro Inexorável (Inexorable Iron / Hierro inexorable)", "Sombra Jocosa (Laughing Shadow / Sombra jocosa)", "Targe Cintilante (Sparkling Targe / Broquel centelleante)", "Vão Estrelado (Starlit Span / Vano estelar)"]
    },
    "Monge (Monk)": {
      hpPerLevel: 10,
      keyAbility: ["Força", "Destreza"],
      perception: "Treinado",
      trainedSkillsCount: 4,
      fixedSkills: [],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Especialista" },
      armor: { "Sem Armadura": "Especialista", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Artistas marciais com corpos temperados como aço, Rajadas de Golpes e posturas místicas.",
      subclasses: ["Postura do Dragão", "Postura do Tigre", "Postura do Grou", "Postura da Montanha", "Postura do Lobo", "Postura dos Ventos"]
    },
    "Oráculo (Oracle)": {
      hpPerLevel: 8,
      keyAbility: ["Carisma"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: ["religion"],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Tocados por mistérios cósmicos avassaladores e amaldiçoados com poderes divinos incontroláveis.",
      subclasses: ["Mistério dos Ancestrais (Ancestors / Antepasados)", "Mistério da Batalha (Battle / Batalla)", "Mistério dos Ossos (Bones / Huesos)", "Mistério das Chamas (Flames / Llamas)", "Mistério dos Cosmos (Cosmos / Cosmos)", "Mistério do Saber (Lore / Saber)", "Mistério das Tempestades (Tempest / Tempestad)", "Mistério da Vida (Life / Vida)"]
    },
    "Patrulheiro (Ranger)": {
      hpPerLevel: 10,
      keyAbility: ["Destreza", "Força"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["nature", "survival"],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Rastreadores mestres das terras ermas que designam Caçar Presa e abatem alvos com extrema precisão.",
      subclasses: ["Vantagem: Precisão (Precision)", "Vantagem: Rajada (Flurry)", "Vantagem: Desencorajar (Outwit)"]
    },
    "Pistoleiro (Gunslinger)": {
      hpPerLevel: 8,
      keyAbility: ["Destreza"],
      perception: "Especialista",
      trainedSkillsCount: 3,
      fixedSkills: ["crafting"],
      savingThrows: { fortitude: "Especialista", reflex: "Especialista", will: "Treinado" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Armas de Fogo e Bestas": "Especialista", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Mestres do tiro rápido com pólvora, recargas táticas acrobáticas e críticos devastadores.",
      subclasses: ["Caminho do Pistoleiro (Pistolero)", "Caminho do Franco-Atirador (Sniper)", "Caminho da Vanguarda (Vanguard)", "Caminho do Andarilho (Drifter)"]
    },
    "Psíquico (Psychic)": {
      hpPerLevel: 6,
      keyAbility: ["Inteligência", "Carisma"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: ["occultism"],
      savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Conjuradores mentais ocultos que sobrecarregam truques psíquicos com pura força de pensamento.",
      subclasses: ["Mente Distante (Telecinese)", "Mente Infinita", "Mente Calosa", "Mente Tangível"]
    },
    "Taumaturgo (Thaumaturge)": {
      hpPerLevel: 8,
      keyAbility: ["Carisma"],
      perception: "Especialista",
      trainedSkillsCount: 3,
      fixedSkills: ["arcana", "nature", "occultism", "religion"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Caçadores do sobrenatural que descobrem e exploram a fraqueza mística exata de cada criatura.",
      subclasses: ["Implemento: Amuleto", "Implemento: Cálice", "Implemento: Lanterna", "Implemento: Espelho", "Implemento: Arma", "Implemento: Livro"]
    },
    "Exemplar (Exemplar)": {
      hpPerLevel: 10,
      keyAbility: ["Força", "Destreza"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["religion"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Guerreiros semidivinos que abrigam centelhas de divindade em seus corpos, armas e trajes, liberando transcendências gloriosas.",
      subclasses: ["Centelha da Lâmina Radiante (Gleaming Blade)", "Centelha da Cicatriz da Montanha (Mountain's Scar)", "Centelha da Coroa Solar (Radiant Halo)", "Centelha da Fera Celestial (Celestial Beast)"]
    },
    "Animista (Animist)": {
      hpPerLevel: 8,
      keyAbility: ["Sabedoria"],
      perception: "Especialista",
      trainedSkillsCount: 3,
      fixedSkills: ["religion"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Destreinado", "Média": "Destreinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Conjuradores divinos e espirituais que se sintonizam com aparições ancestrais e canalizam espíritos diretamente em seus corpos.",
      subclasses: ["Aparição: Vanguarda da Batalha (Vanguard)", "Aparição: Guardião dos Ermos (Steward)", "Aparição: Testemunha dos Tempos (Witness)", "Aparição: Vidente das Almas (Seer)", "Aparição: Folião dos Bosques (Reveler)"]
    },
    "Comandante (Commander)": {
      hpPerLevel: 8,
      keyAbility: ["Inteligência"],
      perception: "Especialista",
      trainedSkillsCount: 4,
      fixedSkills: ["society", "warfare"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Mestres de estratégia e táticas de esquadrão que lideram aliados com ordens de batalha e estandartes inspiradores.",
      subclasses: ["Táticas de Vanguarda Ofensiva", "Táticas de Defesa Coordenada", "Táticas de Flanqueio e Manobra Rápida"]
    },
    "Guardião (Guardian)": {
      hpPerLevel: 12,
      keyAbility: ["Força", "Constituição"],
      perception: "Treinado",
      trainedSkillsCount: 3,
      fixedSkills: ["athletics"],
      savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
      armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Especialista", "Pesada": "Especialista" },
      weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
      classDc: "Treinado",
      description: "Muralhas humanas impenetráveis especialistas em armaduras pesadas e escudos, capazes de interceptar ataques contra companheiros.",
      subclasses: ["Bastião Inquebrável", "Vanguarda de Resgate", "Protetor Devoto de Escudo"]
    }
  },

  // ==========================================
  // 4. ANTECEDENTES (BACKGROUNDS)
  // ==========================================
  backgrounds: [
    { name: "Acróbata (Acrobat)", ability: ["Destreza", "Força"], skill: "acrobatics", feat: "Acrobata Felino" },
    { name: "Artesão (Artisan)", ability: ["Inteligência", "Força"], skill: "crafting", feat: "Manufatura Especializada" },
    { name: "Artista (Artist)", ability: ["Carisma", "Destreza"], skill: "crafting", feat: "Manufatura Especializada" },
    { name: "Batedor Selvagem (Wilderness Scout)", ability: ["Destreza", "Sabedoria"], skill: "survival", feat: "Rastreio Experiente" },
    { name: "Caçador (Hunter)", ability: ["Destreza", "Sabedoria"], skill: "survival", feat: "Olhos de Águia" },
    { name: "Charlatão (Charlatan)", ability: ["Carisma", "Inteligência"], skill: "deception", feat: "Mentiroso Charmoso" },
    { name: "Cozinheiro (Cook)", ability: ["Constituição", "Inteligência"], skill: "survival", feat: "Forrageador" },
    { name: "Criminoso (Criminal)", ability: ["Destreza", "Inteligência"], skill: "thievery", feat: "Pernas Rápidas" },
    { name: "Curandeiro de Campo (Field Medic)", ability: ["Constituição", "Sabedoria"], skill: "medicine", feat: "Medicina de Batalha" },
    { name: "Detetive (Detective)", ability: ["Inteligência", "Sabedoria"], skill: "society", feat: "Leitura de Pista" },
    { name: "Duelista de Oppara (Dueling Noble)", ability: ["Destreza", "Carisma"], skill: "deception", feat: "Palavra Mordaz (Bon Mot)" },
    { name: "Emissário (Emissary)", ability: ["Carisma", "Inteligência"], skill: "diplomacy", feat: "Etiqueta da Corte" },
    { name: "Eremita (Hermit)", ability: ["Constituição", "Sabedoria"], skill: "nature", feat: "Solidão Focada" },
    { name: "Escudeiro (Squire)", ability: ["Força", "Constituição"], skill: "athletics", feat: "Mover Armadura" },
    { name: "Estudante da Academia (Scholar)", ability: ["Inteligência", "Sabedoria"], skill: "arcana", feat: "Identificação Rápida" },
    { name: "Gladiador (Gladiator)", ability: ["Força", "Carisma"], skill: "performance", feat: "Espetáculo Sangrento" },
    { name: "Guarda da Cidade (Guard)", ability: ["Força", "Carisma"], skill: "intimidation", feat: "Olhar Rápido" },
    { name: "Herdeiro Nobre (Noble)", ability: ["Carisma", "Inteligência"], skill: "society", feat: "Etiqueta Nobre" },
    { name: "Marinheiro (Sailor)", ability: ["Força", "Destreza"], skill: "athletics", feat: "Equilíbrio no Convés" },
    { name: "Mercador (Merchant)", ability: ["Carisma", "Inteligência"], skill: "diplomacy", feat: "Negociador de Barganhas" },
    { name: "Mineiro (Miner)", ability: ["Força", "Constituição"], skill: "athletics", feat: "Resistência a Desabamento" },
    { name: "Nômade (Nomad)", ability: ["Constituição", "Sabedoria"], skill: "survival", feat: "Sentido Climático" },
    { name: "Prisioneiro (Prisoner)", ability: ["Força", "Constituição"], skill: "athletics", feat: "Escapar com Vigor" },
    { name: "Trabalhador Braçal (Laborer)", ability: ["Força", "Constituição"], skill: "athletics", feat: "Músculo Rústico" },
    { name: "Taverneiro (Barkeeper)", ability: ["Constituição", "Carisma"], skill: "diplomacy", feat: "Ouvido Atento" }
  ],

  // ==========================================
  // 5. ARQUÉTIPOS E DEDICAÇÕES OFICIAIS
  // ==========================================
  archetypes: [
    { name: "Acrobata (Acrobat)", category: "Geral", description: "Mestre da agilidade, saltos acrobáticos e esquivas acrobáticas automáticas.", prereq: "Treinado em Acrobacia" },
    { name: "Arqueiro (Archer)", category: "Marcial", description: "Especialista supremo no uso de arcos, tiros rápidos e disparos críticos penetrantes.", prereq: "Treinado em Armas Marciais" },
    { name: "Duelista (Duelist)", category: "Marcial", description: "Combatente gracioso com arma de uma mão, aparadas rápidas e réplicas letais.", prereq: "Treinado em Armas Simples ou Marciais" },
    { name: "Marechal (Marshal)", category: "Liderança", description: "Líder inspirador com auras de comando tático que fortalecem o ataque e moral dos aliados.", prereq: "Treinado em Diplomacia ou Intimidação e Armas Marciais" },
    { name: "Médico de Batalha (Medic)", category: "Suporte", description: "Socorrista lendário capaz de tratar ferimentos sob fogo e restaurar HP em combate intenso.", prereq: "Especialista em Medicina e talento Medicina de Batalha" },
    { name: "Cavaleiro (Cavalier)", category: "Montaria", description: "Mestre do combate montado, lealdade a juramentos e cargas devastadoras com lança.", prereq: "Treinado em Natureza ou Cavalgar" },
    { name: "Sentinela (Sentinel)", category: "Defensivo", description: "Especialista em blindagem pesada e técnicas avançadas de armadura.", prereq: "Treinado em Armaduras Leves ou Médias" },
    { name: "Lutador (Wrestler)", category: "Desarmado", description: "Mestre de agarrões, chaves de braço e arremessos corporais brutais.", prereq: "Treinado em Atletismo e Ataques Desarmados" },
    { name: "Mestre de Rituais (Ritualist)", category: "Mágico", description: "Conjurador de rituais ocultos e cerimoniais de alto nível sem gastar espaços de magia diários.", prereq: "Especialista em Arcana, Natureza, Ocultismo ou Religião" },
    { name: "Espião Noturno (Shadowdancer)", category: "Sombra", description: "Manipulador de sombras capaz de se teletransportar na escuridão e conjurar ilusões de penumbra.", prereq: "Mestre em Furtividade e Especialista em Acrobacia" },
    { name: "Dedicação: Alquimista", category: "Multiclasse", description: "Acesso a infusões alquímicas, fórmulas e bombas mágicas diárias.", prereq: "Inteligência +2" },
    { name: "Dedicação: Bárbaro", category: "Multiclasse", description: "Acesso à Fúria bárbara e talentos de instinto violento.", prereq: "Força +2, Constituição +2" },
    { name: "Dedicação: Bardo", category: "Multiclasse", description: "Acesso a magias ocultas e composições de inspiração artística.", prereq: "Carisma +2" },
    { name: "Dedicação: Campeão", category: "Multiclasse", description: "Acesso a armaduras pesadas e reações defensivas sagradas/profanas.", prereq: "Força +2, Carisma +2" },
    { name: "Dedicação: Clérigo", category: "Multiclasse", description: "Acesso a conjuração divina e fontes de cura/dano do seu deus.", prereq: "Sabedoria +2" },
    { name: "Dedicação: Druida", category: "Multiclasse", description: "Acesso à magia primal da natureza e formas selvagens.", prereq: "Sabedoria +2" },
    { name: "Dedicação: Guerreiro", category: "Multiclasse", description: "Acesso a maestria marcial e manobras avançadas de combate.", prereq: "Força +2 ou Destreza +2" },
    { name: "Dedicação: Ladino", category: "Multiclasse", description: "Acesso a Ataque Furtivo e perícias bônus aprimoradas.", prereq: "Destreza +2" },
    { name: "Dedicação: Mago", category: "Multiclasse", description: "Acesso ao grimório e conjuração arcana preparada.", prereq: "Inteligência +2" },
    { name: "Dedicação: Magus", category: "Multiclasse", description: "Acesso ao Ataque Mágico (Spellstrike) e magias de canalização.", prereq: "Força +2 ou Destreza +2, Inteligência +2" },
    { name: "Dedicação: Monge", category: "Multiclasse", description: "Acesso a ataques desarmados aprimorados e posturas marciais.", prereq: "Força +2, Destreza +2" },
    { name: "Dedicação: Oráculo", category: "Multiclasse", description: "Acesso a mistérios cósmicos e feitiços de revelação.", prereq: "Carisma +2" },
    { name: "Dedicação: Patrulheiro", category: "Multiclasse", description: "Acesso a Caçar Presa e bônus de rastreamento.", prereq: "Destreza +2 ou Sabedoria +2" },
    { name: "Dedicação: Feiticeiro", category: "Multiclasse", description: "Acesso a magias espontâneas da sua linhagem de sangue.", prereq: "Carisma +2" },
    { name: "Dedicação: Convocador", category: "Multiclasse", description: "Acesso a um Eidolon companheiro espiritual ligado à sua essência.", prereq: "Carisma +2" },
    { name: "Dedicação: Espadachim", category: "Multiclasse", description: "Acesso a Panache e finalizadores estilosos acrobáticos.", prereq: "Destreza +2, Carisma +2" },
    { name: "Dedicação: Bruxo", category: "Multiclasse", description: "Acesso a um Familiar patrono e magias de patronagem.", prereq: "Inteligência +2" },
    { name: "Dedicação: Cineticista", category: "Multiclasse", description: "Acesso a Portões Cinéticos elementais e jatos de energia.", prereq: "Constituição +2" },
    { name: "Dedicação: Psíquico", category: "Multiclasse", description: "Acesso a truques psiônicos sobrecarregados.", prereq: "Inteligência +2 ou Carisma +2" },
    { name: "Dedicação: Taumaturgo", category: "Multiclasse", description: "Acesso a Implementos e Exploração de Fraquezas.", prereq: "Carisma +2" },
    { name: "Dedicação: Exemplar", category: "Multiclasse", description: "Acesso a Centelhas divinas e Ikons sagrados.", prereq: "Força +2 ou Destreza +2" },
    { name: "Dedicação: Animista", category: "Multiclasse", description: "Acesso a Aparições e receptáculo espiritual.", prereq: "Sabedoria +2" }
  ],
  spells: [],
  rituals: [],

  // ==========================================
  // 4.1 AÇÕES OFICIAIS & ATIVIDADES (ACTIONS)
  // ==========================================
  actions: [
    { id: "action.strike", name: "Golpear (Strike)", actionType: "one-action", category: "Ações Básicas", traits: ["Ataque"], description: "Você ataca com uma arma que está empunhando ou com um ataque desarmado.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.stride", name: "Andar (Stride)", actionType: "one-action", category: "Ações Básicas", traits: ["Movimento"], description: "Você se move a uma distância de até o seu deslocamento terrestre.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.step", name: "Dar um Passo (Step)", actionType: "one-action", category: "Ações Básicas", traits: ["Movimento"], description: "Você se move cuidadosamente 1,5 metro sem acionar reações baseadas em movimento (como Ataque de Oportunidade).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.raise_shield", name: "Erguer Escudo (Raise a Shield)", actionType: "one-action", category: "Ações Básicas", description: "Você posiciona seu escudo para se proteger, recebendo o bônus de circunstância na CA até o início do seu próximo turno.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.take_cover", name: "Pegar Cobertura (Take Cover)", actionType: "one-action", category: "Ações Básicas", description: "Você se abaixa ou se esconde atrás de um obstáculo, melhorando sua cobertura para padrão (+2 CA) ou maior (+4 CA).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.interact", name: "Interagir (Interact)", actionType: "one-action", category: "Ações Básicas", traits: ["Manipular"], description: "Você saca uma arma, guarda um item, abre uma porta ou pega um objeto do chão.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 419 }, ruleset: "remaster", rarity: "common" },
    { id: "action.escape", name: "Escapar (Escape)", actionType: "one-action", category: "Ações Básicas", traits: ["Ataque"], description: "Você tenta se libertar de um efeito que o imobilizou, agarrou ou restringiu com Atletismo, Acrobacia ou Ataque Desarmado.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 418 }, ruleset: "remaster", rarity: "common" },
    { id: "action.leap", name: "Saltar (Leap)", actionType: "one-action", category: "Ações Básicas", traits: ["Movimento"], description: "Você dá um salto curto horizontal de até 3m ou vertical de até 0,9m.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 418 }, ruleset: "remaster", rarity: "common" },
    { id: "action.trip", name: "Derrubar (Trip)", actionType: "one-action", category: "Manobras de Combate", traits: ["Ataque"], prereq: "Atletismo", description: "Faça um teste de Atletismo contra a CD de Reflexos do alvo para deixá-lo Caído.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 236 }, ruleset: "remaster", rarity: "common" },
    { id: "action.grapple", name: "Agarrar (Grapple)", actionType: "one-action", category: "Manobras de Combate", traits: ["Ataque"], prereq: "Atletismo", description: "Faça um teste de Atletismo contra a CD de Fortitude do alvo para deixá-lo Agarrado ou Restringido.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 235 }, ruleset: "remaster", rarity: "common" },
    { id: "action.shove", name: "Empurrar (Shove)", actionType: "one-action", category: "Manobras de Combate", traits: ["Ataque"], prereq: "Atletismo", description: "Faça um teste de Atletismo contra a CD de Fortitude do alvo para empurrá-lo 1,5m ou mais para longe.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 236 }, ruleset: "remaster", rarity: "common" },
    { id: "action.disarm", name: "Desarmar (Disarm)", actionType: "one-action", category: "Manobras de Combate", traits: ["Ataque"], prereq: "Atletismo", description: "Faça um teste de Atletismo contra a CD de Reflexos do alvo para afrouxar a empunhadura dele ou derrubar a arma.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 235 }, ruleset: "remaster", rarity: "common" },
    { id: "action.feint", name: "Fintar (Feint)", actionType: "one-action", category: "Perícias em Combate", prereq: "Enganação", description: "Faça um teste de Enganação contra a CD de Percepção do alvo para deixá-lo Desprevenido contra seu próximo ataque.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 239 }, ruleset: "remaster", rarity: "common" },
    { id: "action.demoralize", name: "Desmoralizar (Demoralize)", actionType: "one-action", category: "Perícias em Combate", traits: ["Auditivo", "Concentração", "Emoção", "Mental"], prereq: "Intimidação", description: "Faça um teste de Intimidação contra a CD de Vontade do alvo para deixá-lo Amedrontado 1 (ou 2 no crítico).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 241 }, ruleset: "remaster", rarity: "common" },
    { id: "action.treat_wounds", name: "Tratar Ferimentos (Treat Wounds)", actionType: "activity", category: "Medicina", prereq: "Medicina, Kit de Curandeiro", description: "Gaste 10 minutos tratando uma criatura ferida. No sucesso, restaura 2d8 PV (CD 15) ou mais em CDs superiores.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 242 }, ruleset: "remaster", rarity: "common" },
    { id: "action.battle_medicine", name: "Medicina de Batalha (Battle Medicine)", actionType: "one-action", category: "Medicina", traits: ["Cura", "Manipular"], prereq: "Talento Medicina de Batalha", description: "Em combate, use Tratar Ferimentos instantaneamente em 1 ação para restaurar PV de um aliado adjacente.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 254 }, ruleset: "remaster", rarity: "common" },
    { id: "action.recall_knowledge", name: "Recordar Conhecimento (Recall Knowledge)", actionType: "one-action", category: "Conhecimento", traits: ["Concentração"], description: "Faça um teste de perícia correspondente (Arcanismo, Natureza, Ocultismo, Religião, Sociedade ou Saber) para identificar fraquezas ou segredos.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 231 }, ruleset: "remaster", rarity: "common" },
    { id: "action.seek", name: "Procurar (Seek)", actionType: "one-action", category: "Percepção", traits: ["Concentração", "Segredo"], description: "Faça um teste de Percepção contra a CD de Furtividade de criaturas ou para localizar armadilhas e portas ocultas.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 420 }, ruleset: "remaster", rarity: "common" },
    { id: "action.hide", name: "Esconder-se (Hide)", actionType: "one-action", category: "Furtividade", traits: ["Segredo"], prereq: "Furtividade", description: "Faça um teste de Furtividade contra a CD de Percepção dos observadores para se tornar Oculto.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 244 }, ruleset: "remaster", rarity: "common" },
    { id: "action.sneak", name: "Esgueirar-se (Sneak)", actionType: "one-action", category: "Furtividade", traits: ["Movimento", "Segredo"], prereq: "Furtividade", description: "Mova-se a até metade do seu deslocamento permanecendo Indetectado.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 245 }, ruleset: "remaster", rarity: "common" },
    { id: "action.avoid_notice", name: "Evitar Atenção (Avoid Notice)", actionType: "activity", category: "Exploração", traits: ["Exploração"], description: "Atividade de exploração onde você se move com cautela furtiva e rola Furtividade para iniciativa.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 438 }, ruleset: "remaster", rarity: "common" },
    { id: "action.defend", name: "Defender (Defend)", actionType: "activity", category: "Exploração", traits: ["Exploração"], description: "Atividade de exploração onde você caminha com escudo erguido, iniciando o combate com bônus de CA.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 438 }, ruleset: "remaster", rarity: "common" },
    { id: "action.detect_magic", name: "Detectar Magia (Detect Magic)", actionType: "activity", category: "Exploração", traits: ["Exploração"], description: "Atividade de exploração onde você conjura continuamente Detectar Magia ao avançar pela masmorra.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 438 }, ruleset: "remaster", rarity: "common" },
    { id: "action.scout", name: "Batedor (Scout)", actionType: "activity", category: "Exploração", traits: ["Exploração"], description: "Atividade de exploração onde você antecipa perigos, concedendo +1 de bônus na iniciativa de todos os aliados.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 438 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 4.2 COMPANHEIROS ANIMAIS & MASCOTES (PETS)
  // ==========================================
  pets: [
    { id: "pet.wolf", name: "Lobo (Wolf Companion)", category: "Companheiro Animal", size: "Pequeno ou Médio", speed: "40 pés", hp: 6, abilityMods: { str: 2, dex: 3, con: 2, int: -4, wis: 1, cha: 0 }, attacks: "Mandíbulas: 1d8 perfuração (Ágil, Derrubar)", support: "Seus ataques causam dano contínuo de sangramento nos alvos do lobo.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.bear", name: "Urso (Bear Companion)", category: "Companheiro Animal", size: "Pequeno ou Médio", speed: "35 pés", hp: 8, abilityMods: { str: 3, dex: 2, con: 2, int: -4, wis: 1, cha: 0 }, attacks: "Garras: 1d8 cortante (Ágil), Mandíbulas: 1d8 perfuração", support: "Ameaça brutal do urso adiciona dano extra de corte em seus ataques corporais.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.horse", name: "Cavalo (Horse Companion / Mount)", category: "Companheiro Animal", size: "Grande", speed: "40 pés", hp: 8, abilityMods: { str: 3, dex: 1, con: 2, int: -4, wis: 1, cha: 0 }, attacks: "Cascos: 1d6 impacto (Ágil)", support: "Concede impulso de carga e bônus de dano de impacto em ataques montados.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.bird", name: "Pássaro / Coruja (Bird Companion)", category: "Companheiro Animal", size: "Pequeno", speed: "10 pés, Voo 60 pés", hp: 4, abilityMods: { str: 2, dex: 3, con: 1, int: -4, wis: 2, cha: 0 }, attacks: "Garras: 1d6 cortante (Ágil, Acabamento)", support: "Mergulho aéreo distrai oponentes deixando-os Deslumbrados e sangrando.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.big_cat", name: "Gato Grande / Pantera (Big Cat)", category: "Companheiro Animal", size: "Pequeno ou Médio", speed: "35 pés", hp: 6, abilityMods: { str: 2, dex: 3, con: 2, int: -4, wis: 1, cha: 0 }, attacks: "Garras: 1d6 cortante (Ágil), Mordida: 1d8 perfuração", support: "Bote furtivo que deixa oponentes Desprevenidos contra seus golpes.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.dromaeosaur", name: "Dromaeossauro (Dromaeosaur Companion)", category: "Companheiro Animal", size: "Pequeno", speed: "50 pés", hp: 6, abilityMods: { str: 2, dex: 3, con: 2, int: -4, wis: 1, cha: 0 }, attacks: "Garras: 1d8 cortante (Ágil, Flanquear)", support: "Velocidade relâmpago que cerca o inimigo para manobras de flanqueamento.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 207 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.badger", name: "Texugo (Badger Companion)", category: "Companheiro Animal", size: "Pequeno", speed: "25 pés, Escavação 10 pés", hp: 8, abilityMods: { str: 3, dex: 1, con: 3, int: -4, wis: 1, cha: 0 }, attacks: "Garras: 1d8 cortante (Ágil)", support: "Fúria do texugo força o oponente a sofrer dano contínuo.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 206 }, ruleset: "remaster", rarity: "common" },
    { id: "pet.familiar", name: "Familiar Arcano / Místico (Familiar)", category: "Familiar", size: "Minúsculo", speed: "25 pés", hp: 5, abilityMods: { str: -4, dex: 3, con: 0, int: 0, wis: 2, cha: 0 }, attacks: "Sem ataque próprio", support: "Concede habilidades de familiar (Espaço extra de magia, Canalizar Foco, Toque à Distância).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 212 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 4.3 FÓRMULAS DE MANUFATURA (FORMULAS)
  // ==========================================
  formulas: [
    { id: "formula.elixir_of_life_minor", name: "Fórmula: Elixir da Vida Menor", category: "Elixires", level: 1, price: "1 PO", craftDc: 15, batch: 4, description: "Fórmula alquímica para produzir Elixir da Vida Menor (recupera 1d6 PV).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 286 }, ruleset: "remaster", rarity: "common" },
    { id: "formula.healing_potion_minor", name: "Fórmula: Poção de Cura Menor", category: "Poções", level: 1, price: "2 PO", craftDc: 15, batch: 4, description: "Fórmula mágica para fabricar Poção de Cura Menor (recupera 1d8 PV).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 286 }, ruleset: "remaster", rarity: "common" },
    { id: "formula.alchemists_fire_lesser", name: "Fórmula: Fogo Alquímico Menor", category: "Bombas", level: 1, price: "1 PO", craftDc: 15, batch: 4, description: "Fórmula para destilar frascos de Fogo Alquímico Menor (1d8 fogo + 1 contínuo).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 287 }, ruleset: "remaster", rarity: "common" },
    { id: "formula.antidote_lesser", name: "Fórmula: Antídoto Menor", category: "Elixires", level: 1, price: "1 PO", craftDc: 15, batch: 4, description: "Fórmula para compor Antídoto Menor (+2 contra venenos).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 288 }, ruleset: "remaster", rarity: "common" },
    { id: "formula.smokestick_lesser", name: "Fórmula: Bastão de Fumaça Menor", category: "Ferramentas", level: 1, price: "1 PO", craftDc: 15, batch: 4, description: "Fórmula para manufaturar Bastão de Fumaça Menor.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 289 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 5. PERÍCIAS OFICIAIS (SKILLS)
  // ==========================================
  skills: [
    { id: "acrobatics", name: "Acrobacias", ability: "dex", armorPenalty: true, description: "Equilíbrio, Passar Cambalhota e escapar de manobras." },
    { id: "arcana", name: "Arcanismo", ability: "int", armorPenalty: false, description: "Conhecimento sobre magia arcana, dragões e constructos." },
    { id: "athletics", name: "Atletismo", ability: "str", armorPenalty: true, description: "Agarrar, Derrubar, Desarmar, Nadar, Escalar e Saltar." },
    { id: "crafting", name: "Manufatura", ability: "int", armorPenalty: false, description: "Criar, consertar itens e identificar compostos alquímicos." },
    { id: "deception", name: "Enganação", ability: "cha", armorPenalty: false, description: "Fintar em combate, mentir, disfarces e criar distrações." },
    { id: "diplomacy", name: "Diplomacia", ability: "cha", armorPenalty: false, description: "Persuadir, reunir informações e fazer Palavra Mordaz (Bon Mot)." },
    { id: "intimidation", name: "Intimidação", ability: "cha", armorPenalty: false, description: "Desmoralizar inimigos em combate e coagir testemunhas." },
    { id: "medicine", name: "Medicina", ability: "wis", armorPenalty: false, description: "Tratar Ferimentos em repouso e Medicina de Batalha em combate." },
    { id: "nature", name: "Natureza", ability: "wis", armorPenalty: false, description: "Conhecimento de animais, plantas, clima e magia primal." },
    { id: "occultism", name: "Ocultismo", ability: "int", armorPenalty: false, description: "Segredos cósmicos, aberrações e magia oculta." },
    { id: "performance", name: "Atuação", ability: "cha", armorPenalty: false, description: "Canto, dança, oratória teatral e efeitos de Bardo." },
    { id: "religion", name: "Religião", ability: "wis", armorPenalty: false, description: "Divindades, mortos-vivos, demônios, anjos e magia divina." },
    { id: "society", name: "Sociedade", ability: "int", armorPenalty: false, description: "História das nações, nobreza, etiquetas e leis locais." },
    { id: "stealth", name: "Furtividade", ability: "dex", armorPenalty: true, description: "Esconder-se nas sombras e emboscar adversários." },
    { id: "survival", name: "Sobrevivência", ability: "wis", armorPenalty: false, description: "Rastrear presas, caçar alimento e navegar em ermos." },
    { id: "thievery", name: "Ladinagem", ability: "dex", armorPenalty: true, description: "Desarmar armadilhas, abrir fechaduras e bater carteiras." }
  ],

  // ==========================================
  // 6. ARMAS OFICIAIS (WEAPONS COMPENDIUM)
  // ==========================================
  // ==========================================
  // 6. ARMAS OFICIAIS (WEAPONS COMPENDIUM)
  // ==========================================
  weapons: [
    { name: "Adze (1d10 S)", category: "Marcial", damage: "1d10", damageType: "Cortante (S)", level: 0, price: "2 PO", bulk: 1, traits: ["Contundente", "Varredura"] },
    { name: "Air Repeater (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "5 PO", bulk: "L", traits: ["Ágil", "Alcance 30 pés", "Pente 6"] },
    { name: "Aklys (1d6 B)", category: "Avançada", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "5 PP", bulk: "L", traits: ["Amarrada", "Derrubar", "Arremesso 20 pés"] },
    { name: "Alchemical Bomb (Special)", category: "Marcial", damage: "Especial", damageType: "Elemental/Ácido", level: 0, price: "3 PO", bulk: "L", traits: ["Bomba", "Consumível", "Espalhar", "Arremesso 20 pés"] },
    { name: "Alchemical Crossbow (1d8 P)", category: "Marcial", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "25 PO", bulk: 2, traits: ["Recarga 1", "Alcance 120 pés"] },
    { name: "Arbalest (1d10 P)", category: "Simples", damage: "1d10", damageType: "Perfuração (P)", level: 0, price: "8 PO", bulk: 2, traits: ["Apunhaladora", "Recarga 2", "Alcance 120 pés"] },
    { name: "Arcabuz / Arquebus (1d8 P)", category: "Marcial", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "10 PO", bulk: 2, traits: ["Concussiva", "Fatal d12", "Recarga 1", "Alcance 150 pés", "Voleio 30 pés"] },
    { name: "Asp Coil (1d6 S)", category: "Avançada", damage: "1d6", damageType: "Cortante (S)", level: 0, price: "3 PO", bulk: 1, traits: ["Desarmar", "Acurada", "Alcance", "Versátil P"] },
    { name: "Atlatl (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "1 PO", bulk: 1, traits: ["Propulsivo", "Alcance 50 pés"] },
    { name: "Axe Musket - Melee (1d8 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 1, price: "14 PO", bulk: 2, traits: ["Combinação", "Varredura", "Versátil P"] },
    { name: "Axe Musket - Ranged (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 1, price: "14 PO", bulk: 2, traits: ["Combinação", "Concussiva", "Fatal d10", "Alcance 60 pés"] },
    { name: "Backpack Ballista (1d12 P)", category: "Marcial", damage: "1d12", damageType: "Perfuração (P)", level: 1, price: "30 PO", bulk: 3, traits: ["Apunhaladora", "Recarga 2", "Alcance 120 pés"] },
    { name: "Backpack Catapult (1d12 B)", category: "Avançada", damage: "1d12", damageType: "Impacto (B)", level: 1, price: "35 PO", bulk: 4, traits: ["Alcance 100 pés", "Espalhar", "Recarga 2"] },
    { name: "Bastard Sword / Espada Bastarda (1d8/1d12 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 0, price: "4 PO", bulk: 1, traits: ["Duas Mãos d12"] },
    { name: "Battle Axe / Machado de Guerra (1d8 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 0, price: "1 PO", bulk: 1, traits: ["Varredura"] },
    { name: "Blowgun / Zarabatana (1d1 P)", category: "Simples", damage: "1d1", damageType: "Perfuração (P)", level: 0, price: "2 PP", bulk: "L", traits: ["Ágil", "Invisível", "Alcance 20 pés"] },
    { name: "Bo Staff / Bastão Bo (1d8 B)", category: "Marcial", damage: "1d8", damageType: "Impacto (B)", level: 0, price: "2 PP", bulk: 2, traits: ["Aparar", "Alcance", "Derrubar", "Monge"] },
    { name: "Broadsword / Espada Larga (1d8 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 0, price: "2 PO", bulk: 1, traits: ["Versátil P"] },
    { name: "Club / Clava (1d6 B)", category: "Simples", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "0 PO", bulk: 1, traits: ["Arremesso 10 pés"] },
    { name: "Crossbow / Besta (1d8 P)", category: "Simples", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "3 PO", bulk: 1, traits: ["Recarga 1", "Alcance 120 pés"] },
    { name: "Dagger / Adaga (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração/Cortante", level: 0, price: "2 PP", bulk: "L", traits: ["Ágil", "Acurada", "Arremesso 10 pés", "Versátil C"] },
    { name: "Dart / Dardo (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "1 PC", bulk: "L", traits: ["Ágil", "Arremesso 20 pés"] },
    { name: "Dueling Pistol / Pistola de Duelo (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "12 PO", bulk: 1, traits: ["Concussiva", "Fatal d10", "Recarga 1", "Alcance 60 pés"] },
    { name: "Falchion / Fauchard (1d10 S)", category: "Marcial", damage: "1d10", damageType: "Cortante (S)", level: 0, price: "3 PO", bulk: 2, traits: ["Contundente", "Varredura"] },
    { name: "Flail / Mangual (1d6 B)", category: "Marcial", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "1 PO", bulk: 1, traits: ["Desarmar", "Derrubar", "Varredura"] },
    { name: "Gauntlet / Manopla (1d4 B)", category: "Simples", damage: "1d4", damageType: "Impacto (B)", level: 0, price: "2 PP", bulk: "L", traits: ["Ágil", "Livre-Mão"] },
    { name: "Glaive / Glaive (1d8 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 0, price: "1 PO", bulk: 2, traits: ["Contundente", "Mortal d8", "Alcance"] },
    { name: "Greataxe / Machado Grande (1d12 S)", category: "Marcial", damage: "1d12", damageType: "Cortante (S)", level: 0, price: "2 PO", bulk: 2, traits: ["Varredura"] },
    { name: "Greatclub / Clava Grande (1d10 B)", category: "Marcial", damage: "1d10", damageType: "Impacto (B)", level: 0, price: "1 PO", bulk: 2, traits: ["Empurrão", "Duas Mãos"] },
    { name: "Greatsword / Espadão (1d12 S)", category: "Marcial", damage: "1d12", damageType: "Cortante (S)", level: 0, price: "2 PO", bulk: 2, traits: ["Versátil P"] },
    { name: "Halberd / Alabarda (1d10 P)", category: "Marcial", damage: "1d10", damageType: "Perfuração (P)", level: 0, price: "2 PO", bulk: 2, traits: ["Alcance", "Versátil C"] },
    { name: "Hand Crossbow / Besta de Mão (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "3 PO", bulk: "L", traits: ["Recarga 1", "Alcance 60 pés"] },
    { name: "Heavy Crossbow / Besta Pesada (1d10 P)", category: "Simples", damage: "1d10", damageType: "Perfuração (P)", level: 0, price: "4 PO", bulk: 2, traits: ["Recarga 2", "Alcance 120 pés"] },
    { name: "Javelin / Dardo Arremesso (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "1 PP", bulk: "L", traits: ["Arremesso 30 pés"] },
    { name: "Katar / Adaga de Punho (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "3 PP", bulk: "L", traits: ["Ágil", "Mortal d6", "Monge"] },
    { name: "Kukri / Kukri (1d6 S)", category: "Marcial", damage: "1d6", damageType: "Cortante (S)", level: 0, price: "6 PP", bulk: "L", traits: ["Ágil", "Acurada", "Derrubar"] },
    { name: "Lance / Lança de Justa (1d8 P)", category: "Marcial", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "1 PO", bulk: 2, traits: ["Investida de Justa d10", "Alcance"] },
    { name: "Longbow / Arco Longo (1d8 P)", category: "Marcial", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "6 PO", bulk: 2, traits: ["Mortal d10", "Alcance 100 pés", "Voleio 30 pés"] },
    { name: "Longsword / Espada Longa (1d8 S)", category: "Marcial", damage: "1d8", damageType: "Cortante (S)", level: 0, price: "1 PO", bulk: 1, traits: ["Versátil P"] },
    { name: "Main-gauche / Adaga de Duelo (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "5 PP", bulk: "L", traits: ["Ágil", "Acurada", "Aparar", "Desarmar", "Versátil C"] },
    { name: "Maul / Malho (1d12 B)", category: "Marcial", damage: "1d12", damageType: "Impacto (B)", level: 0, price: "3 PO", bulk: 2, traits: ["Empurrão"] },
    { name: "Morningstar / Maça-Estrela (1d6 B)", category: "Marcial", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "1 PO", bulk: 1, traits: ["Versátil P"] },
    { name: "Nunchaku / Nunchaku (1d6 B)", category: "Avançada", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "2 PP", bulk: "L", traits: ["Aparar", "Acurada", "Desarmar", "Monge"] },
    { name: "Orc Knuckle Dagger (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "7 PP", bulk: "L", traits: ["Ágil", "Acurada", "Desarmar"] },
    { name: "Pick / Picareta (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "7 PP", bulk: 1, traits: ["Fatal d10"] },
    { name: "Punching Dagger (1d4 P)", category: "Simples", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "2 PP", bulk: "L", traits: ["Ágil", "Acurada"] },
    { name: "Rapier / Rapieira (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "2 PO", bulk: 1, traits: ["Acurada", "Mortal d8", "Desarmar"] },
    { name: "Scimitar / Cimitarra (1d6 S)", category: "Marcial", damage: "1d6", damageType: "Cortante (S)", level: 0, price: "1 PO", bulk: 1, traits: ["Contundente", "Acurada", "Varredura"] },
    { name: "Scythe / Foice Grande (1d10 S)", category: "Marcial", damage: "1d10", damageType: "Cortante (S)", level: 0, price: "2 PO", bulk: 2, traits: ["Mortal d10", "Derrubar"] },
    { name: "Shield Boss / Umbo de Escudo (1d6 B)", category: "Marcial", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "5 PP", bulk: "-", traits: ["Acoplada"] },
    { name: "Shield Spikes / Pontas de Escudo (1d6 P)", category: "Marcial", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "5 PP", bulk: "-", traits: ["Acoplada"] },
    { name: "Shortbow / Arco Curto (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "3 PO", bulk: 1, traits: ["Mortal d10", "Alcance 60 pés"] },
    { name: "Shortsword / Espada Curta (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração/Cortante", level: 0, price: "9 PP", bulk: "L", traits: ["Ágil", "Acurada", "Versátil C"] },
    { name: "Shuriken / Shuriken (1d4 P)", category: "Marcial", damage: "1d4", damageType: "Perfuração (P)", level: 0, price: "1 PC", bulk: "-", traits: ["Ágil", "Arremesso 20 pés", "Monge", "Recarga 0"] },
    { name: "Sickle / Foice Curta (1d4 S)", category: "Simples", damage: "1d4", damageType: "Cortante (S)", level: 0, price: "2 PP", bulk: "L", traits: ["Ágil", "Acurada", "Derrubar"] },
    { name: "Sling / Funda (1d6 B)", category: "Simples", damage: "1d6", damageType: "Impacto (B)", level: 0, price: "0 PO", bulk: "L", traits: ["Propulsivo", "Recarga 1", "Alcance 50 pés"] },
    { name: "Spear / Lança Curta (1d6 P)", category: "Simples", damage: "1d6", damageType: "Perfuração (P)", level: 0, price: "1 PP", bulk: 1, traits: ["Arremesso 20 pés"] },
    { name: "Staff / Bordão (1d4/1d8 B)", category: "Simples", damage: "1d4", damageType: "Impacto (B)", level: 0, price: "0 PO", bulk: 1, traits: ["Duas Mãos d8"] },
    { name: "Trident / Tridente (1d8 P)", category: "Marcial", damage: "1d8", damageType: "Perfuração (P)", level: 0, price: "1 PO", bulk: 1, traits: ["Arremesso 20 pés"] },
    { name: "Warhammer / Martelo de Guerra (1d8 B)", category: "Marcial", damage: "1d8", damageType: "Impacto (B)", level: 0, price: "1 PO", bulk: 1, traits: ["Empurrão"] },
    { name: "Whip / Chicote (1d4 S)", category: "Marcial", damage: "1d4", damageType: "Cortante (S)", level: 0, price: "1 PP", bulk: 1, traits: ["Desarmar", "Acurada", "Não-Letal", "Alcance", "Derrubar"] },
    { name: "Desarmado / Punhos (Fist)", category: "Desarmado", damage: "1d4", damageType: "Impacto (B)", level: 0, price: "0 PO", bulk: "-", traits: ["Ágil", "Acurada", "Livre-Mão", "Não-Letal"] }
  ],

  // ==========================================
  // 7. ARMADURAS OFICIAIS (ARMORS COMPENDIUM)
  // ==========================================
  armors: [
    { name: "Armored Cloak", category: "Leve", level: 0, price: "15 SP", acBonus: 1, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 10, bulk: "L", traits: ["Confortável"], description: "Manto reforçado com placas flexíveis que concede proteção básica sem chamar atenção." },
    { name: "Armored Coat", category: "Média", level: 0, price: "2 GP", acBonus: 2, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 12, bulk: 2, traits: ["Confortável"], description: "Casaco pesado forrado com couro rígido e placas de metal internas." },
    { name: "Automaton Chassis", category: "Média", level: 0, price: "3 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 14, bulk: 2, description: "Chassi reforçado construído para constructos e guerreiros ancestrais." },
    { name: "Bakuwa Bony Plates", category: "Média", level: 0, price: "4 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 14, bulk: 2, description: "Armadura talhada em placas ósseas densas de criaturas colossais." },
    { name: "Breastplate", category: "Média", level: 0, price: "8 GP", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 14, bulk: 2, description: "Peitoral de aço fundido cobrindo o torso com proteção sólida contra perfuração e corte." },
    { name: "Buckle Armor", category: "Leve", level: 0, price: "4 GP", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 1, description: "Armadura ajustável com fivelas de bronze polido permitindo mobilidade total." },
    { name: "Ceramic Plate", category: "Média", level: 0, price: "5 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 14, bulk: 2, description: "Placas de cerâmica endurecida resistentes a choques e calor." },
    { name: "Chain Mail", category: "Média", level: 0, price: "6 GP", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 16, bulk: 2, traits: ["Flexível", "Ruidosa"], description: "Cota de malha completa de elos entrelaçados oferecendo ampla proteção corporal." },
    { name: "Chain Shirt", category: "Leve", level: 0, price: "5 GP", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, bulk: 1, traits: ["Flexível", "Ruidosa"], description: "Camisa de malha de aço leve usada sob roupas comuns ou sobre túnicas." },
    { name: "Conrasu Reinforced Exoskeleton", category: "Média", level: 0, price: "3 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 12, bulk: 2, description: "Estrutura externa vegetal viva entrelaçada com cerne de madeira mística." },
    { name: "Coral Armor", category: "Média", level: 0, price: "5 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: 0, strReq: 14, bulk: 2, description: "Armadura forjada com coral calcificado das profundezas oceânicas." },
    { name: "Coral Plate", category: "Pesada", level: 0, price: "15 GP", acBonus: 5, dexCap: 1, checkPenalty: -3, speedPenalty: -10, strReq: 16, bulk: 3, description: "Placas maciças de coral recifal que bloqueiam impactos intensos." },
    { name: "Explorer's Clothing", category: "Sem Armadura", level: 0, price: "1 SP", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 0, traits: ["Confortável"], description: "Roupas reforçadas para viagens, capazes de acomodar runas mágicas fundamentais e de propriedade." },
    { name: "Full Plate", category: "Pesada", level: 0, price: "30 GP", acBonus: 6, dexCap: 0, checkPenalty: -3, speedPenalty: -10, strReq: 18, bulk: 4, traits: ["Bastião", "Inflexível"], description: "Armadura completa de placas articuladas que recobre todo o corpo do cavaleiro." },
    { name: "Half Plate", category: "Pesada", level: 0, price: "18 GP", acBonus: 5, dexCap: 1, checkPenalty: -3, speedPenalty: -10, strReq: 16, bulk: 3, description: "Meia-armadura de placas sobre cota de malha para guerreiros de linha de frente." },
    { name: "Hide Armor", category: "Média", level: 0, price: "2 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: -5, strReq: 12, bulk: 2, description: "Armadura confeccionada com couros espessos de bestas selvagens tratadas." },
    { name: "Leather Armor", category: "Leve", level: 0, price: "2 GP", acBonus: 1, dexCap: 4, checkPenalty: -1, speedPenalty: 0, strReq: 10, bulk: 1, description: "Armadura de couro curtido flexível e silenciosa para aventureiros ágeis." },
    { name: "Padded Armor", category: "Leve", level: 0, price: "2 SP", acBonus: 1, dexCap: 3, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: "L", traits: ["Confortável"], description: "Armadura acolchoada com camadas espessas de tecido e lã resistente." },
    { name: "Scale Mail", category: "Média", level: 0, price: "4 GP", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: -5, strReq: 14, bulk: 2, description: "Armadura de escamas de aço sobrepostas costuradas em couro grosso." },
    { name: "Splint Mail", category: "Pesada", level: 0, price: "13 GP", acBonus: 5, dexCap: 1, checkPenalty: -3, speedPenalty: -10, strReq: 16, bulk: 3, description: "Tiras verticais de aço rebitadas sobre forro de couro e malha." },
    { name: "Studded Leather", category: "Leve", level: 0, price: "3 GP", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, bulk: 1, description: "Couro reforçado com cravos e rebites metálicos para retenção de corte." },
    { name: "Unarmored", category: "Sem Armadura", level: 0, price: "0 GP", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 0, description: "Defesa natural sem armadura equipada." }
  ],

  // ==========================================
  // 7.1 ESCUDOS OFICIAIS (SHIELDS COMPENDIUM)
  // ==========================================
  shields: [
    { name: "Buckler", level: 0, price: "1 GP", acBonus: 1, hardness: 3, maxHp: 6, bt: 3, speedPenalty: 0, bulk: "L", traits: ["Livre-Mão"], description: "Broquel leve preso ao antebraço que deixa a mão livre para manusear itens ou magias." },
    { name: "Caster's Targe", level: 0, price: "3 GP", acBonus: 1, hardness: 3, maxHp: 8, bt: 4, speedPenalty: 0, bulk: 1, description: "Targa talhada para conjuradores canalizarem símbolos divinos ou focos arcanos." },
    { name: "Dart Shield", level: 0, price: "2 GP", acBonus: 1, hardness: 3, maxHp: 8, bt: 4, speedPenalty: 0, bulk: 1, description: "Escudo equipado com compartimento interno para sacar dardos rapidamente." },
    { name: "Gauntlet Buckler", level: 0, price: "2 GP", acBonus: 1, hardness: 3, maxHp: 6, bt: 3, speedPenalty: 0, bulk: "L", description: "Broquel integrado diretamente na manopla do combatente." },
    { name: "Harnessed Shield", level: 0, price: "5 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 2, description: "Escudo com arreios reforçados de combate para absorver colisões brutas." },
    { name: "Heavy Rondache", level: 0, price: "4 GP", acBonus: 2, hardness: 5, maxHp: 16, bt: 8, speedPenalty: 0, bulk: 1, description: "Rondache espesso de aço com bordas recurvadas para desviar lâminas." },
    { name: "Hide Shield", level: 0, price: "2 GP", acBonus: 2, hardness: 3, maxHp: 12, bt: 6, speedPenalty: 0, bulk: 1, description: "Escudo de couro endurecido esticado sobre armação de madeira." },
    { name: "Klar", level: 0, price: "2 GP", acBonus: 1, hardness: 3, maxHp: 8, bt: 4, speedPenalty: 0, bulk: 1, traits: ["Arma Integrada"], description: "Escudo tradicional Shoanti com lâmina ou crânio fóssil para aparar e contra-atacar." },
    { name: "Meteor Shield", level: 0, price: "6 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 2, description: "Escudo forjado em minério de ferro estelar com alta resistência ao impacto." },
    { name: "Razor Disc", level: 0, price: "3 GP", acBonus: 1, hardness: 3, maxHp: 8, bt: 4, speedPenalty: 0, bulk: 1, traits: ["Cortante"], description: "Disco circular leve de lâminas polidas nas bordas." },
    { name: "Salvo Shield", level: 0, price: "5 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 2, description: "Escudo balístico com fresta de observação e suporte para armas de disparo." },
    { name: "Steel Shield", level: 0, price: "2 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 1, description: "Escudo clássico de aço forjado com alta capacidade de bloqueio." },
    { name: "Swordstealer Shield", level: 0, price: "4 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 1, description: "Escudo com dentes metálicos na borda capazes de prender e desarmar espadas inimigas." },
    { name: "Tower Shield", level: 0, price: "10 GP", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: -5, bulk: 4, description: "Escudo maciço que permite a ação Pegar Cobertura para conceder +4 na CA contra ataques à distância." },
    { name: "Wooden Shield", level: 0, price: "1 GP", acBonus: 2, hardness: 3, maxHp: 12, bt: 6, speedPenalty: 0, bulk: 1, description: "Escudo acessível e leve de tábuas de carvalho reforçadas com aros de ferro." },
    { name: "Sturdy Shield (Minor)", level: 4, price: "100 GP", acBonus: 2, hardness: 8, maxHp: 64, bt: 32, speedPenalty: 0, bulk: 1, traits: ["Mágico"], description: "Escudo mágico reforçado especialmente projetado para suportar incontáveis Bloqueios com Escudo." }
  ],

  // ==========================================
  // 7.2 EQUIPAMENTOS & ITENS GERAIS (GEAR COMPENDIUM)
  // ==========================================
  items: [
    { name: "Adventurer's Pack", category: "Gear", subcategory: "Adventuring", level: 0, price: "15 SP", bulk: 1, description: "Mochila contendo saco de dormir, 10 giz, pederneira e isqueiro, corda de 15m, 2 semanas de rações, sabão, 5 tochas e odre." },
    { name: "Air Bladder", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 SP", bulk: "L", description: "Bolsa estanque de couro que armazena ar suficiente para respirar debaixo d'água por alguns minutos." },
    { name: "Alchemist's Lab", category: "Gear", subcategory: "Misc", level: 0, price: "5 GP", bulk: 6, description: "Laboratório alquímico completo com retortas, destiladores e reagentes para fabricação de itens alquímicos." },
    { name: "Alchemist's Lab (Expanded)", category: "Gear", subcategory: "Misc", level: 3, price: "55 GP", bulk: 6, description: "Laboratório alquímico expandido que concede +1 de bônus de item em testes de Criação alquímica." },
    { name: "Alchemist's Toolkit", category: "Gear", subcategory: "Misc", level: 0, price: "3 GP", bulk: 1, description: "Kit portátil de ferramentas e frascos alquímicos necessários para criar elixires e bombas em campo." },
    { name: "Animal Blind", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: 1, description: "Esconderijo portátil camuflado para observar e caçar feras selvagens." },
    { name: "Animal Call", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: "L", description: "Apito especializado que reproduz o chamado de pássaros e animais de caça." },
    { name: "Armored Skirt", category: "Gear", subcategory: "Weapon Attachments", level: 0, price: "2 GP", bulk: 1, description: "Saia de placas acoplável a armaduras leves ou médias aumentando o bônus de CA em +1." },
    { name: "Artisan's Toolkit", category: "Gear", subcategory: "Misc", level: 0, price: "4 GP", bulk: 1, description: "Conjunto de ferramentas para ferraria, carpintaria, cantaria ou costura." },
    { name: "Artisan's Toolkit (Sterling)", category: "Gear", subcategory: "Misc", level: 3, price: "50 GP", bulk: 1, description: "Ferramentas de alta precisão que concedem +1 de bônus de item em testes de Manufatura." },
    { name: "Atmospheric Breathing Suit", category: "Gear", subcategory: "Adventuring", level: 3, price: "25 GP", bulk: 2, description: "Traje vedado com filtro mágico para respirar em ambientes com fumaça, gases ou no vácuo." },
    { name: "Backpack", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 SP", bulk: 0, description: "Mochila de couro resistente. Armazena até 4 de Carga, ignorando os primeiros 2 de Carga dos itens guardados nela." },
    { name: "Bandolier", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 SP", bulk: "L", description: "Cartucheira tiracolo para armazenar até 8 itens de Carga Leve com acesso rápido." },
    { name: "Bedroll", category: "Gear", subcategory: "Adventuring", level: 0, price: "2 CP", bulk: "L", description: "Saco de dormir acolchoado para descanso confortável ao ar livre." },
    { name: "Belt Pouch", category: "Gear", subcategory: "Adventuring", level: 0, price: "4 CP", bulk: "L", description: "Pequena bolsa de cinto para moedas, pedras preciosas ou poções." },
    { name: "Caltrops", category: "Gear", subcategory: "Adventuring", level: 0, price: "3 SP", bulk: "L", description: "Estrepes de quatro pontas de ferro espalhados no chão para atrasar perseguidores." },
    { name: "Candle", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "-", description: "Vela de cera que ilumina um raio de 3m por 8 horas." },
    { name: "Chalk (10 pieces)", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "-", description: "10 pedaços de giz coloridos para marcar masmorras e paredes." },
    { name: "Climbing Kit", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: 1, description: "Pítons, martelo, crampons e mosquetões para escaladas íngremes." },
    { name: "Compass", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 GP", bulk: "-", description: "Bússola magnética de bronze que concede +1 de bônus em testes de Sobrevivência para orientar-se." },
    { name: "Crowbar", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: "L", description: "Pé de cabra de ferro fundido para forçar portas e abrir baús trancados." },
    { name: "Disguise Kit", category: "Gear", subcategory: "Misc", level: 0, price: "2 GP", bulk: "L", description: "Maquiagens, perucas, próteses e tecidos para criar disfarces convincentes com Enganação." },
    { name: "Dueling Cape", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: "L", description: "Capa pesada enrolada no braço usada em duelos para fintar ou aparar golpes (+1 CA)." },
    { name: "Fishing Tackle", category: "Gear", subcategory: "Adventuring", level: 0, price: "8 SP", bulk: "L", description: "Varas, anzóis e redes para pesca de subsistência." },
    { name: "Flint and Steel", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 CP", bulk: "-", description: "Pederneira e isqueiro de aço para acender fogueiras e tochas." },
    { name: "Grappling Hook", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 SP", bulk: "L", description: "Gancho de ferro de 4 garras para amarrar em cordas e escalar muros." },
    { name: "Healer's Toolkit", category: "Gear", subcategory: "Misc", level: 0, price: "5 GP", bulk: 1, description: "Bandagens, unguentos, tesouras e talas para Primeiros Socorros e Tratar Ferimentos." },
    { name: "Lantern (Bullseye)", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 GP", bulk: 1, description: "Lanterna de foco concentrado projetando um cone de luz brilhante de 18m." },
    { name: "Lantern (Hooded)", category: "Gear", subcategory: "Adventuring", level: 0, price: "7 SP", bulk: "L", description: "Lanterna furta-fogo com abas móveis para regular a intensidade da luz." },
    { name: "Lock (Simple)", category: "Gear", subcategory: "Misc", level: 0, price: "2 GP", bulk: "-", description: "Cadeado comum de ferro com chave (CD 20 para arrombar)." },
    { name: "Lock (Average)", category: "Gear", subcategory: "Misc", level: 1, price: "10 GP", bulk: "-", description: "Fechadura sólida de aço temperado com mecanismo de 4 pinos (CD 25)." },
    { name: "Magnifying Glass", category: "Gear", subcategory: "Misc", level: 3, price: "40 GP", bulk: "-", description: "Lente de aumento para examinar pistas minuciosas (+1 em Percepção e Manufatura)." },
    { name: "Manacles (Simple)", category: "Gear", subcategory: "Misc", level: 0, price: "3 GP", bulk: "L", description: "Algemas de ferro forjado para imobilizar prisioneiros." },
    { name: "Mirror", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 GP", bulk: "-", description: "Pequeno espelho de vidro polido para espiar esquinas sem se expor." },
    { name: "Oil (1 pint)", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "-", description: "Óleo combustível para lanternas (queima por 6 horas) ou arremessável." },
    { name: "Piton", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "-", description: "Píton de aço com olhal para fixação de cordas na rocha." },
    { name: "Rations (1 week)", category: "Gear", subcategory: "Adventuring", level: 0, price: "4 SP", bulk: "L", description: "Rações de viagem não perecíveis (carne seca, nozes, queijo duro e biscoito)." },
    { name: "Religious Symbol (Wooden)", category: "Gear", subcategory: "Misc", level: 0, price: "1 SP", bulk: "L", description: "Símbolo sagrado entalhado em madeira para foco divino de clérigos e campeões." },
    { name: "Religious Symbol (Silver)", category: "Gear", subcategory: "Misc", level: 0, price: "2 GP", bulk: "L", description: "Símbolo sagrado trabalhado em prata maciça finamente polida." },
    { name: "Rope (50 ft)", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 SP", bulk: "L", description: "Corda de cânhamo trançado de 15 metros com carga de ruptura de 450 kg." },
    { name: "Sack", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "L", description: "Saco de juta para carregar até 8 de Carga de itens diversos." },
    { name: "Scroll Case", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 CP", bulk: "L", description: "Tubo cilíndrico de couro encerado para proteger pergaminhos contra água e poeira." },
    { name: "Signal Whistle", category: "Gear", subcategory: "Adventuring", level: 0, price: "8 CP", bulk: "-", description: "Apito agudo audível a mais de 800 metros em terreno aberto." },
    { name: "Soap", category: "Gear", subcategory: "Adventuring", level: 0, price: "2 CP", bulk: "-", description: "Barra de sabão perfumado para higiene pessoal em viagens." },
    { name: "Spyglass", category: "Gear", subcategory: "Adventuring", level: 4, price: "80 GP", bulk: "L", description: "Luneta de latão e lentes polidas que aproxima objetos distantes em até 10 vezes." },
    { name: "Ten-foot Pole", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: 1, description: "Vara de madeira rígida de 3 metros para testar pisos e desarmar armadilhas." },
    { name: "Thieves' Tools", category: "Gear", subcategory: "Misc", level: 0, price: "3 GP", bulk: "L", description: "Gazuas, arames e alavancas para arrombar fechaduras e desativar armadilhas." },
    { name: "Thieves' Tools (Infiltrator)", category: "Gear", subcategory: "Misc", level: 3, price: "50 GP", bulk: "L", description: "Ferramentas de arrombamento de alta liga metálica (+1 de bônus de item em Ladinagem)." },
    { name: "Torch", category: "Gear", subcategory: "Adventuring", level: 0, price: "1 CP", bulk: "L", description: "Tocha de madeira com estopa embebida em piche que queima por 1 hora (luz em 6m)." },
    { name: "Waterskin", category: "Gear", subcategory: "Adventuring", level: 0, price: "5 CP", bulk: "L", description: "Odre de couro com capacidade para 1 litro de água fresca." },
    { name: "Writing Set", category: "Gear", subcategory: "Misc", level: 0, price: "1 GP", bulk: "L", description: "Pena, tinta nanquim, pergaminhos e cera para selagem de cartas." },

    // CONSUMÍVEIS (CONSUMABLES)
    { name: "Elixir of Life (Minor)", category: "Consumables", subcategory: "Elixires", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Elixir", "Cura"], description: "Ao beber, recupera 1d6 Pontos de Vida e concede +1 de bônus de item em testes de fortitude contra venenos e doenças por 1 hora." },
    { name: "Elixir of Life (Lesser)", category: "Consumables", subcategory: "Elixires", level: 5, price: "12 GP", bulk: "L", traits: ["Alquímico", "Elixir", "Cura"], description: "Ao beber, recupera 3d6+6 Pontos de Vida e concede +1 de bônus de item em testes contra venenos e doenças." },
    { name: "Healing Potion (Minor)", category: "Consumables", subcategory: "Poções", level: 1, price: "4 GP", bulk: "L", traits: ["Mágico", "Poção", "Cura"], description: "Poção mágica efervescente de coloração rubi que cura instantaneamente 1d8 Pontos de Vida." },
    { name: "Healing Potion (Lesser)", category: "Consumables", subcategory: "Poções", level: 3, price: "12 GP", bulk: "L", traits: ["Mágico", "Poção", "Cura"], description: "Poção mágica potente que cura instantaneamente 2d8+5 Pontos de Vida." },
    { name: "Alchemist's Fire (Lesser)", category: "Consumables", subcategory: "Bombas", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Bomba", "Fogo"], description: "Frasco volátil que causa 1d8 de dano de fogo no impacto, 1 de dano de fogo contínuo e 1 de dano de fogo em respingo." },
    { name: "Acid Flask (Lesser)", category: "Consumables", subcategory: "Bombas", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Bomba", "Ácido"], description: "Causa 1 de dano de ácido, 1d6 de dano de ácido contínuo e 1 de dano de ácido em respingo." },
    { name: "Frost Vial (Lesser)", category: "Consumables", subcategory: "Bombas", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Bomba", "Frio"], description: "Causa 1d6 de dano de frio, 1 de respingo e aplica penalidade de -3m no deslocamento da vítima." },
    { name: "Bottled Lightning (Lesser)", category: "Consumables", subcategory: "Bombas", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Bomba", "Eletricidade"], description: "Causa 1d6 de dano elétrico, 1 de respingo e deixa o alvo Desprevenido até o início do seu próximo turno." },
    { name: "Tanglefoot Bag (Lesser)", category: "Consumables", subcategory: "Bombas", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Bomba"], description: "Bolsa de resina expansiva que gruda nas pernas do alvo, reduzindo a velocidade em 3m ou imobilizando no acerto crítico." },
    { name: "Antidote (Lesser)", category: "Consumables", subcategory: "Elixires", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Elixir"], description: "Concede +2 de bônus de item em testes de salvaguarda contra venenos por 6 horas." },
    { name: "Antiplague (Lesser)", category: "Consumables", subcategory: "Elixires", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Elixir"], description: "Concede +2 de bônus de item em testes de salvaguarda contra doenças por 24 horas." },
    { name: "Smokestick (Lesser)", category: "Consumables", subcategory: "Alquímico", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico"], description: "Cria uma nuvem de fumaça espessa de 1,5m que concede Ocultação a criaturas dentro dela por 1 minuto." },
    { name: "Sunrod", category: "Consumables", subcategory: "Alquímico", level: 1, price: "3 GP", bulk: "L", traits: ["Alquímico", "Luz"], description: "Bastão alquímico que brilha com luz solar viva de 6m por 6 horas após ser quebrado." },
    { name: "Tindertwig", category: "Consumables", subcategory: "Alquímico", level: 1, price: "2 SP", bulk: "-", traits: ["Alquímico"], description: "Fósforo alquímico de ignição instantânea que acende tochas em 1 única ação." },

    // RUNAS FUNDAMENTAIS E DE PROPRIEDADE (RUNES)
    { name: "+1 Weapon Potency Rune", category: "Runes", subcategory: "Fundamentais", level: 2, price: "35 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental mágica que concede +1 de bônus de item em jogadas de ataque com a arma gravada.", source: { book: "Guia do Mestre (GM Core)", page: 242 }, ruleset: "remaster", rarity: "common" },
    { name: "+2 Weapon Potency Rune", category: "Runes", subcategory: "Fundamentais", level: 10, price: "935 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental mágica que concede +2 de bônus de item em jogadas de ataque com a arma gravada.", source: { book: "Guia do Mestre (GM Core)", page: 242 }, ruleset: "remaster", rarity: "common" },
    { name: "+3 Weapon Potency Rune", category: "Runes", subcategory: "Fundamentais", level: 16, price: "8935 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental mágica que concede +3 de bônus de item em jogadas de ataque com a arma gravada.", source: { book: "Guia do Mestre (GM Core)", page: 242 }, ruleset: "remaster", rarity: "common" },
    { name: "Striking Rune", category: "Runes", subcategory: "Fundamentais", level: 4, price: "65 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental que adiciona 1 dado extra de dano da arma ao acertar (2 dados no total).", source: { book: "Guia do Mestre (GM Core)", page: 243 }, ruleset: "remaster", rarity: "common" },
    { name: "Greater Striking Rune", category: "Runes", subcategory: "Fundamentais", level: 12, price: "1065 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental que adiciona 2 dados extras de dano da arma ao acertar (3 dados no total).", source: { book: "Guia do Mestre (GM Core)", page: 243 }, ruleset: "remaster", rarity: "common" },
    { name: "Major Striking Rune", category: "Runes", subcategory: "Fundamentais", level: 19, price: "31065 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental lendária que adiciona 3 dados extras de dano da arma ao acertar (4 dados no total).", source: { book: "Guia do Mestre (GM Core)", page: 243 }, ruleset: "remaster", rarity: "common" },
    { name: "+1 Armor Potency Rune", category: "Runes", subcategory: "Fundamentais", level: 5, price: "160 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental que concede +1 de bônus de item na CA da armadura ou traje de explorador.", source: { book: "Guia do Mestre (GM Core)", page: 242 }, ruleset: "remaster", rarity: "common" },
    { name: "Resilient Rune", category: "Runes", subcategory: "Fundamentais", level: 8, price: "340 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Runa fundamental de armadura que concede +1 de bônus de item em todas as salvaguardas (Fortitude, Reflexos, Vontade).", source: { book: "Guia do Mestre (GM Core)", page: 243 }, ruleset: "remaster", rarity: "common" },
    { name: "Flaming Property Rune", category: "Runes", subcategory: "Propriedade", level: 8, price: "500 GP", bulk: "-", traits: ["Mágico", "Fogo", "Runa"], description: "Adiciona 1d6 de dano de fogo adicional e 1d10 de dano contínuo de fogo no acerto crítico.", source: { book: "Guia do Mestre (GM Core)", page: 244 }, ruleset: "remaster", rarity: "common" },
    { name: "Frost Property Rune", category: "Runes", subcategory: "Propriedade", level: 8, price: "500 GP", bulk: "-", traits: ["Mágico", "Frio", "Runa"], description: "Adiciona 1d6 de dano de frio adicional e deixa o alvo Lento 1 no acerto crítico.", source: { book: "Guia do Mestre (GM Core)", page: 244 }, ruleset: "remaster", rarity: "common" },
    { name: "Shocking Property Rune", category: "Runes", subcategory: "Propriedade", level: 8, price: "500 GP", bulk: "-", traits: ["Mágico", "Eletricidade", "Runa"], description: "Adiciona 1d6 de dano elétrico adicional e propaga 1d4 de dano elétrico em criaturas adjacentes no crítico.", source: { book: "Guia do Mestre (GM Core)", page: 245 }, ruleset: "remaster", rarity: "common" },
    { name: "Returning Property Rune", category: "Runes", subcategory: "Propriedade", level: 3, price: "55 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "Quando você arremessa a arma gravada, ela retorna imediatamente à sua mão logo após o ataque.", source: { book: "Guia do Mestre (GM Core)", page: 245 }, ruleset: "remaster", rarity: "common" },
    { name: "Ghost Touch Property Rune", category: "Runes", subcategory: "Propriedade", level: 4, price: "75 GP", bulk: "-", traits: ["Mágico", "Runa"], description: "A arma atinge criaturas incorpóreas com eficácia total, ignorando resistências a dano físico.", source: { book: "Guia do Mestre (GM Core)", page: 244 }, ruleset: "remaster", rarity: "common" },

    // ITENS MÁGICOS LENDÁRIOS E EQUIPAMENTOS EXPANDIDOS (MAGIC ITEMS)
    { name: "Spacious Pouch (Bag of Holding)", category: "Gear", subcategory: "Itens Mágicos", level: 4, price: "75 GP", bulk: 1, traits: ["Extradimensional", "Mágico"], description: "Bolsa mágica dimensional capaz de carregar até 25 de Carga enquanto pesa apenas 1 de Carga.", source: { book: "Guia do Mestre (GM Core)", page: 254 }, ruleset: "remaster", rarity: "common" },
    { name: "Boots of Elvenkind", category: "Gear", subcategory: "Vestíveis", level: 7, price: "340 GP", bulk: "L", traits: ["Investimento", "Mágico"], description: "Botas leves que concedem +1 de bônus de item em testes de Furtividade e permitem ignorar terreno difícil suave.", source: { book: "Guia do Mestre (GM Core)", page: 257 }, ruleset: "remaster", rarity: "uncommon" },
    { name: "Cloak of Elvenkind", category: "Gear", subcategory: "Vestíveis", level: 7, price: "360 GP", bulk: "L", traits: ["Investimento", "Ilusão", "Mágico"], description: "Manto cambiante que concede +1 de bônus em Furtividade e permite conjurar Invisibilidade 1 vez por dia.", source: { book: "Guia do Mestre (GM Core)", page: 259 }, ruleset: "remaster", rarity: "uncommon" },
    { name: "Goggles of Night", category: "Gear", subcategory: "Vestíveis", level: 5, price: "150 GP", bulk: "L", traits: ["Investimento", "Mágico"], description: "Óculos de lentes de quartzo escurecido que concedem Visão no Escuro contínua ao usuário investido.", source: { book: "Guia do Mestre (GM Core)", page: 262 }, ruleset: "remaster", rarity: "uncommon" },
    { name: "Wand of Heal (1st-Rank)", category: "Gear", subcategory: "Varinhas", level: 3, price: "60 GP", bulk: "L", traits: ["Mágico", "Varinha"], description: "Varinha entalhada em freixo que permite conjurar a magia Curar de 1º ranque uma vez ao dia (ou arriscar sobrecarga).", source: { book: "Guia do Mestre (GM Core)", page: 290 }, ruleset: "remaster", rarity: "common" },
    { name: "Staff of Fire", category: "Gear", subcategory: "Cajados", level: 4, price: "90 GP", bulk: 1, traits: ["Investimento", "Mágico", "Cajado"], description: "Cajado mágico forjado em madeira carbonizada com cargas diárias para conjurar Raio de Fogo e Mãos Flamejantes.", source: { book: "Guia do Mestre (GM Core)", page: 292 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 7.3 CONDIÇÕES OFICIAIS (CONDITIONS COMPENDIUM)
  // ==========================================
  conditions: [
    { name: "Amedrontado (Frightened)", category: "Condições", description: "Penalidade de estado em todos os testes e CDs baseados em perícias, ataques e salvamentos.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster", rarity: "common" },
    { name: "Desprevenido (Off-Guard)", category: "Condições", description: "Você sofre uma penalidade de circunstância de -2 na sua Classe de Armadura.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster", rarity: "common" },
    { name: "Enfraquecido (Enfeebled)", category: "Condições", description: "Penalidade de estado em testes baseados em Força, jogadas de ataque corpo a corpo e dano corpo a corpo.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster", rarity: "common" },
    { name: "Desajeitado (Clumsy)", category: "Condições", description: "Penalidade de estado em testes baseados em Destreza, salvamentos de Reflexos, CA e ataques à distância.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Drenado (Drained)", category: "Condições", description: "Penalidade de estado em testes baseados em Constituição e perde PV máximos iguais ao seu nível vezes o valor de drenado.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Estupefato (Stupefied)", category: "Condições", description: "Penalidade de estado em testes baseados em atributos mentais e teste simples CD 5 + valor para conjurar magias.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 445 }, ruleset: "remaster", rarity: "common" },
    { name: "Agarrado (Grabbed)", category: "Condições", description: "Você está Imobilizado e Desprevenido. Ao tentar uma ação de Manipular, deve passar em um teste simples CD 5.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster", rarity: "common" },
    { name: "Caído (Prone)", category: "Condições", description: "Você está deitado no chão, Desprevenido e sofre -2 de penalidade de circunstância em jogadas de ataque.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Cego (Blinded)", category: "Condições", description: "Você não enxerga. Fica Desprevenido, sofre penalidade de -4 em Percepção e todas as outras criaturas são Indetectadas para você.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Confuso (Confused)", category: "Condições", description: "Você não consegue distinguir aliados de inimigos. Em seu turno, ataca a criatura mais próxima ou ataca a si mesmo.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Condenado (Doomed)", category: "Condições", description: "O limiar de morrer do seu personagem é reduzido pelo valor de condenado (ex: Condenado 1 faz morrer com 3 pontos).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Fatigado (Fatigued)", category: "Condições", description: "Você sofre penalidade de estado de -1 na CA e salvamentos, e não pode usar atividades de exploração exigentes.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 442 }, ruleset: "remaster", rarity: "common" },
    { name: "Imobilizado (Immobilized)", category: "Condições", description: "Você não pode usar nenhuma ação com o traço Movimento.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster", rarity: "common" },
    { name: "Inconsciente (Unconscious)", category: "Condições", description: "Você está dormindo ou à beira da morte. Fica Desprevenido, Caído, Cego e sofre -4 de penalidade na CA.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster", rarity: "common" },
    { name: "Lento / Desacelerado (Slowed)", category: "Condições", description: "Você recupera menos ações no início do seu turno (3 - valor de desacelerado).", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Morrendo (Dying)", category: "Condições", description: "Você está Inconsciente e à beira da morte. Faça testes de recuperação a cada rodada.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster", rarity: "common" },
    { name: "Ofuscado (Dazzled)", category: "Condições", description: "Sua visão está prejudicada. Todas as outras criaturas e objetos ficam Ocultos para você.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Paralisado (Paralyzed)", category: "Condições", description: "Você está congelado no lugar. Fica Desprevenido e não pode agir, exceto ações puramente mentais.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Petrificado (Petrified)", category: "Condições", description: "Seu corpo foi transformado em pedra sólida. Você é inconsciente e imune a muitos efeitos.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Quebrado (Broken)", category: "Condições", description: "O item sofreu dano além do seu Limiar de Quebra (BT) e não pode conceder bônus nem ser usado normalmente.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Restringido (Restrained)", category: "Condições", description: "Você está amarrado ou preso firmemente. Fica Imobilizado e Desprevenido, e não pode usar ações com o traço Ataque ou Manipular exceto Escapar.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Dano Contínuo (Persistent Damage)", category: "Condições", description: "Você sofre dano automático no final de cada um dos seus turnos até passar em um teste simples CD 15 de recuperação.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 7.4 BENEFÍCIOS OFICIAIS (BUFFS COMPENDIUM)
  // ==========================================
  buffs: [
    { name: "Abençoado (Blessed)", category: "Benefícios", description: "Bônus +1 de estado em jogadas de ataque e salvamentos contra medo.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 318 }, ruleset: "remaster", rarity: "common" },
    { name: "Aceleração (Quickened)", category: "Benefícios", description: "Você recebe uma ação adicional no início de cada um dos seus turnos para Golpear ou Andar.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 444 }, ruleset: "remaster", rarity: "common" },
    { name: "Ocultado (Concealed)", category: "Benefícios", description: "Ataques e efeitos direcionados a você exigem um teste simples CD 5 do atacante.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 441 }, ruleset: "remaster", rarity: "common" },
    { name: "Invisível (Invisible)", category: "Benefícios", description: "Você não pode ser visto diretamente e é Indetectado para criaturas que apenas dependem da visão.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 443 }, ruleset: "remaster", rarity: "common" },
    { name: "Escudo Erguido (Shield Raised)", category: "Benefícios", description: "Bônus de circunstância na CA concedido pelo escudo até o início do seu próximo turno.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 274 }, ruleset: "remaster", rarity: "common" },
    { name: "Coragem Inspiradora (Courageous Anthem)", category: "Benefícios", description: "Composição de bardo que concede +1 de estado em jogadas de ataque, dano e salvamentos contra medo a todos os aliados.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 98 }, ruleset: "remaster", rarity: "common" },
    { name: "Defesa Inspiradora (Rallying Anthem)", category: "Benefícios", description: "Composição de bardo que concede +1 de estado na CA e em salvamentos a todos os aliados em alcance.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 99 }, ruleset: "remaster", rarity: "common" },
    { name: "Orientação (Guidance)", category: "Benefícios", description: "Bênção rápida que concede +1 de bônus de estado em uma jogada de ataque, teste de perícia ou salvamento antes do início do seu próximo turno.", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 334 }, ruleset: "remaster", rarity: "common" },
    { name: "Postura do Dragão (Dragon Stance)", category: "Benefícios", description: "Postura marcial de monge que concede ataques desarmados de Cauda de Dragão (1d10 impacto, Traseiro).", source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 144 }, ruleset: "remaster", rarity: "common" },
    { name: "Postura do Tigre (Tiger Stance)", category: "Benefícios", description: "Postura marcial de monge que concede Garras de Tigre (1d8 cortante, Ágil, Acurada, Sangramento 1d4 no crítico).", source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 145 }, ruleset: "remaster", rarity: "common" },
    { name: "Postura da Montanha (Mountain Stance)", category: "Benefícios", description: "Postura marcial firme de monge que concede +4 de bônus de item na CA (+0 Dex cap) e Golpes de Queda de Montanha.", source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 145 }, ruleset: "remaster", rarity: "common" },
    { name: "Postura da Garça (Crane Stance)", category: "Benefícios", description: "Postura de monge que concede +1 de circunstância na CA, reduz penalidade de salto e concede Asas de Garça (1d6 impacto, Ágil, Acurada).", source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 144 }, ruleset: "remaster", rarity: "common" }
  ],

  // ==========================================
  // 8. GUIA DE REGRAS E BOOSTER DE ATRIBUTOS (PF2E REMASTER)
  // ==========================================
  rulesGuide: {
    steps: [
      { step: 1, title: "1. Atributos Base", desc: "Todos os atributos começam com valor 10 (+0)." },
      { step: 2, title: "2. Ancestralidade", desc: "Aplique os aprimoramentos (+2) e penalidades (-2) da sua raça escolhida." },
      { step: 3, title: "3. Antecedente", desc: "Ganhe 2 aprimoramentos (+2): 1 em um dos atributos indicados pela profissão e 1 Livre." },
      { step: 4, title: "4. Classe", desc: "Ganhe +2 no Atributo Chave da sua classe escolhida." },
      { step: 5, title: "5. Quatro Aprimoramentos Livres", desc: "Escolha 4 atributos diferentes para ganhar +2 cada no 1º nível." }
    ],
    temlTable: [
      { rank: "Destreinado (U)", bonus: "+0", desc: "Sem treino formal. Apenas aplica modificador de atributo." },
      { rank: "Treinado (T)", bonus: "Nível + 2", desc: "Competência sólida básica." },
      { rank: "Especialista (E)", bonus: "Nível + 4", desc: "Habilidade notável e acima da média." },
      { rank: "Mestre (M)", bonus: "Nível + 6", desc: "Maestria técnica excepcional." },
      { rank: "Lendário (L)", bonus: "Nível + 8", desc: "O ápice absoluto do potencial humano e mágico." }
    ]
  }
};

// Proveniência conferida no sumário e nas páginas editoriais do Player Core local.
// Os resumos abaixo são texto original do portal; não reproduzem parágrafos do livro.
const PLAYER_CORE_SOURCE = "Livro do Jogador (Player Core, Remaster)";
const PLAYER_CORE_SPELLS = [
  {
    id: "spell.soothe", name: "Abrandar (Soothe)", rank: 1, page: 314, actionType: "two-actions",
    traditions: ["occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Ocultista"], en: ["Occult"], es: ["Ocultista"] },
    names: { "pt-BR": "Abrandar", en: "Soothe", es: "Calmar heridas" },
    summaries: { "pt-BR": "Cura uma criatura voluntária e fortalece temporariamente suas defesas contra efeitos mentais.", en: "Heals a willing creature and temporarily strengthens its defenses against mental effects.", es: "Cura a una criatura voluntaria y fortalece temporalmente sus defensas contra efectos mentales." }
  },
  {
    id: "spell.scatter_scree", name: "Agredir com Detritos (Scatter Scree)", rank: 1, page: 314, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Agredir com Detritos", en: "Scatter Scree", es: "Dispersar escombros" },
    summaries: { "pt-BR": "Projeta pedras em um cone curto, causando dano contundente e podendo empurrar criaturas.", en: "Projects stones in a short cone, dealing bludgeoning damage and potentially pushing creatures.", es: "Proyecta piedras en un cono corto, causa daño contundente y puede empujar criaturas." }
  },
  {
    id: "spell.alarm", name: "Alarme (Alarm)", rank: 1, page: 314, actionType: "activity",
    traditions: ["arcane", "divine", "occult", "primal"], castingTimes: { "pt-BR": "10 minutos", en: "10 minutes", es: "10 minutos" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista", "Primal"], en: ["Arcane", "Divine", "Occult", "Primal"], es: ["Arcana", "Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Alarme", en: "Alarm", es: "Alarma" },
    summaries: { "pt-BR": "Protege uma área e avisa quando uma criatura entra sem atender à senha definida.", en: "Wards an area and warns when a creature enters without satisfying the chosen password.", es: "Protege un área y avisa cuando una criatura entra sin cumplir la contraseña elegida." }
  },
  {
    id: "spell.force_barrage", name: "Barragem de Força (Force Barrage)", rank: 1, page: 318, actionType: "variable",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "1 a 3 ações", en: "1 to 3 actions", es: "1 a 3 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Barragem de Força", en: "Force Barrage", es: "Andanada de fuerza" },
    summaries: { "pt-BR": "Dispara projéteis de força que acertam automaticamente; mais ações produzem mais fragmentos.", en: "Fires force projectiles that hit automatically; spending more actions produces more shards.", es: "Dispara proyectiles de fuerza que impactan automáticamente; más acciones producen más fragmentos." }
  },
  {
    id: "spell.bless", name: "Bênção (Bless)", rank: 1, page: 319, actionType: "two-actions",
    traditions: ["divine", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista"], en: ["Divine", "Occult"], es: ["Divina", "Ocultista"] },
    names: { "pt-BR": "Bênção", en: "Bless", es: "Bendición" },
    summaries: { "pt-BR": "Cria uma aura que concede bônus de estado nos ataques de você e de aliados próximos.", en: "Creates an aura that grants a status bonus to your attacks and those of nearby allies.", es: "Crea un aura que concede una bonificación de estado a tus ataques y a los de aliados cercanos." }
  },
  {
    id: "spell.fireball", name: "Bola de Fogo (Fireball)", rank: 3, page: 319, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Bola de Fogo", en: "Fireball", es: "Bola de fuego" },
    summaries: { "pt-BR": "Detona uma explosão de fogo a longa distância que causa dano em uma área ampla.", en: "Detonates a long-range burst of fire that deals damage across a broad area.", es: "Detona una explosión de fuego a larga distancia que causa daño en un área amplia." }
  },
  {
    id: "spell.air_bubble", name: "Bolha de Ar (Air Bubble)", rank: 1, page: 319, actionType: "reaction",
    traditions: ["arcane", "divine", "primal"], castingTimes: { "pt-BR": "Reação", en: "Reaction", es: "Reacción" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Primal"], en: ["Arcane", "Divine", "Primal"], es: ["Arcana", "Divina", "Primordial"] },
    names: { "pt-BR": "Bolha de Ar", en: "Air Bubble", es: "Burbuja de aire" },
    summaries: { "pt-BR": "Reage quando uma criatura não consegue respirar, envolvendo sua cabeça em ar puro por pouco tempo.", en: "Reacts when a creature cannot breathe, surrounding its head with clean air for a short time.", es: "Reacciona cuando una criatura no puede respirar y rodea su cabeza con aire puro por un breve período." }
  },
  {
    id: "spell.tailwind", name: "Bons Ventos (Tailwind)", rank: 1, page: 320, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Bons Ventos", en: "Tailwind", es: "Viento favorable" },
    summaries: { "pt-BR": "Um vento favorável aumenta temporariamente seu deslocamento terrestre.", en: "A favorable wind temporarily increases your land Speed.", es: "Un viento favorable aumenta temporalmente tu Velocidad terrestre." }
  },
  {
    id: "spell.calm", name: "Acalmar (Calm)", rank: 2, page: 315, actionType: "two-actions",
    traditions: ["divine", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista"], en: ["Divine", "Occult"], es: ["Divina", "Ocultista"] },
    names: { "pt-BR": "Acalmar", en: "Calm", es: "Calmar" },
    summaries: { "pt-BR": "Suprime impulsos violentos em uma área, dependendo do resultado do salvamento de Vontade.", en: "Suppresses violent impulses in an area, depending on the target's Will save.", es: "Suprime impulsos violentos en un área, según la salvación de Voluntad del objetivo." }
  },
  {
    id: "spell.vitality_lash", name: "Açoite de Vitalidade (Vitality Lash)", rank: 1, page: 315, actionType: "two-actions",
    traditions: ["divine", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Primal"], en: ["Divine", "Primal"], es: ["Divina", "Primordial"] },
    names: { "pt-BR": "Açoite de Vitalidade", en: "Vitality Lash", es: "Latigazo de vitalidad" },
    summaries: { "pt-BR": "Ataca uma criatura morta-viva ou com cura reversa com energia vital e um salvamento de Fortitude.", en: "Strikes an undead or negatively healed creature with vitality energy and a Fortitude save.", es: "Ataca a una criatura muerta viviente o con curación inversa con energía vital y una salvación de Fortaleza." }
  },
  {
    id: "spell.acid_grip", name: "Aperto Ácido (Acid Grip)", rank: 2, page: 316, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Aperto Ácido", en: "Acid Grip", es: "Agarre ácido" },
    summaries: { "pt-BR": "Uma garra mágica causa dano de ácido e pode mover o alvo conforme o salvamento de Reflexos.", en: "A magical claw deals acid damage and can move the target based on its Reflex save.", es: "Una garra mágica causa daño de ácido y puede mover al objetivo según su salvación de Reflejos." }
  },
  {
    id: "spell.electric_arc", name: "Arco Elétrico (Electric Arc)", rank: 1, page: 316, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Arco Elétrico", en: "Electric Arc", es: "Arco eléctrico" },
    summaries: { "pt-BR": "Um arco de eletricidade atinge uma ou duas criaturas com um salvamento básico de Reflexos.", en: "An arc of electricity strikes one or two creatures with a basic Reflex save.", es: "Un arco de electricidad golpea a una o dos criaturas con una salvación básica de Reflejos." }
  },
  {
    id: "spell.mystic_armor", name: "Armadura Mística (Mystic Armor)", rank: 1, page: 317, actionType: "two-actions",
    traditions: ["arcane", "divine", "occult", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista", "Primal"], en: ["Arcane", "Divine", "Occult", "Primal"], es: ["Arcana", "Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Armadura Mística", en: "Mystic Armor", es: "Armadura mística" },
    summaries: { "pt-BR": "Uma proteção mágica concede bônus de item na CA e define um limite de Destreza até suas próximas preparações diárias.", en: "Magical protection grants an item bonus to AC and sets a Dexterity cap until your next daily preparations.", es: "Una protección mágica otorga un bonificador de objeto a la CA y establece un límite de Destreza hasta tus próximas preparaciones diarias." }
  },
  {
    id: "spell.spiritual_armament", name: "Armamento Espiritual (Spiritual Armament)", rank: 2, page: 317, actionType: "two-actions",
    traditions: ["divine", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista"], en: ["Divine", "Occult"], es: ["Divina", "Ocultista"] },
    names: { "pt-BR": "Armamento Espiritual", en: "Spiritual Armament", es: "Armamento espiritual" },
    summaries: { "pt-BR": "Cria um eco fantasmagórico de uma arma para atacar uma criatura e repetir o ataque ao Sustentar a magia.", en: "Creates a ghostly echo of a weapon to attack a creature and repeat the attack when Sustained.", es: "Crea un eco fantasmal de un arma para atacar a una criatura y repetir el ataque al Mantener el conjuro." }
  },
  {
    id: "spell.knock", name: "Arrombar (Knock)", rank: 2, page: 317, actionType: "two-actions",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Arrombar", en: "Knock", es: "Abrir" },
    summaries: { "pt-BR": "Facilita abrir uma porta, fechadura ou recipiente e pode neutralizar Trancar.", en: "Makes a door, lock, or container easier to open and can counteract Lock.", es: "Facilita abrir una puerta, cerradura o recipiente y puede neutralizar Cerrar." }
  },
  {
    id: "spell.augury", name: "Augúrio (Augury)", rank: 2, page: 318, actionType: "activity",
    traditions: ["divine", "occult"], castingTimes: { "pt-BR": "10 minutos", en: "10 minutes", es: "10 minutos" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista"], en: ["Divine", "Occult"], es: ["Divina", "Ocultista"] },
    names: { "pt-BR": "Augúrio", en: "Augury", es: "Augurio" },
    summaries: { "pt-BR": "Oferece ao Mestre um presságio vago sobre os resultados de um curso de ação nos próximos minutos.", en: "Asks the GM for a vague omen about the results of a course of action in the near future.", es: "Pide al GM un presagio vago sobre los resultados de un curso de acción en un futuro cercano." }
  },
  {
    id: "spell.caustic_blast", name: "Bolha Cáustica (Caustic Blast)", rank: 1, page: 319, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Bolha Cáustica", en: "Caustic Blast", es: "Explosión cáustica" },
    summaries: { "pt-BR": "Uma bolha de ácido explode em uma área pequena e exige um salvamento básico de Reflexos.", en: "A bubble of acid bursts in a small area and requires a basic Reflex save.", es: "Una burbuja de ácido estalla en un área pequeña y requiere una salvación básica de Reflejos." }
  },
  {
    id: "spell.blur", name: "Borrar (Blur)", rank: 2, page: 321, actionType: "two-actions",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Borrar", en: "Blur", es: "Desenfoque" },
    summaries: { "pt-BR": "Distorce a silhueta de uma criatura, concedendo a condição ocultado por um curto período.", en: "Distorts a creature's silhouette, granting it the concealed condition for a short time.", es: "Distorsiona la silueta de una criatura y le concede la condición oculto durante un breve tiempo." }
  },
  {
    id: "spell.comfortable_cabin", name: "Cabana Confortável (Cozy Cabin)", rank: 3, page: 321, actionType: "activity",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "1 minuto", en: "1 minute", es: "1 minuto" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Cabana Confortável", en: "Cozy Cabin", es: "Cabaña acogedora" },
    summaries: { "pt-BR": "Molda uma cabana temporária de madeira que abriga criaturas e as protege de clima hostil.", en: "Shapes a temporary wooden cabin that shelters creatures from hostile weather.", es: "Moldea una cabaña temporal de madera que protege a las criaturas del clima hostil." }
  },
  {
    id: "spell.speaking_corpse", name: "Cadáver Falante (Talking Corpse)", rank: 4, page: 321, actionType: "activity",
    traditions: ["divine", "occult"], castingTimes: { "pt-BR": "10 minutos", en: "10 minutes", es: "10 minutos" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista"], en: ["Divine", "Occult"], es: ["Divina", "Ocultista"] },
    names: { "pt-BR": "Cadáver Falante", en: "Talking Corpse", es: "Cadáver parlante" },
    summaries: { "pt-BR": "Concede ao cadáver um semblante de vida para responder a três perguntas.", en: "Gives a corpse a semblance of life so it can answer three questions.", es: "Da al cadáver una apariencia de vida para que responda tres preguntas." }
  },
  {
    id: "spell.walk_on_water", name: "Caminhar na Água (Water Walk)", rank: 2, page: 321, actionType: "two-actions",
    traditions: ["arcane", "divine", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Primal"], en: ["Arcane", "Divine", "Primal"], es: ["Arcana", "Divina", "Primordial"] },
    names: { "pt-BR": "Caminhar na Água", en: "Water Walk", es: "Caminar sobre el agua" },
    summaries: { "pt-BR": "Permite que uma criatura caminhe sobre a superfície da água e de outros líquidos.", en: "Allows a creature to walk across the surface of water and other liquids.", es: "Permite que una criatura camine sobre la superficie del agua y otros líquidos." }
  },
  {
    id: "spell.natures_path", name: "Caminho da Natureza (Nature's Pathway)", rank: 5, page: 322, actionType: "activity",
    traditions: ["primal"], castingTimes: { "pt-BR": "1 minuto", en: "1 minute", es: "1 minuto" },
    traditionNames: { "pt-BR": ["Primal"], en: ["Primal"], es: ["Primordial"] },
    names: { "pt-BR": "Caminho da Natureza", en: "Nature's Pathway", es: "Sendero de la naturaleza" },
    summaries: { "pt-BR": "Teleporta você de uma árvore viva para outra árvore adequada dentro do alcance.", en: "Teleports you from one living tree to another suitable tree within range.", es: "Te teletransporta de un árbol vivo a otro árbol adecuado dentro del alcance." }
  },
  {
    id: "spell.life_field", name: "Campo de Vida (Life-Boosting Field)", rank: 6, page: 322, actionType: "two-actions",
    traditions: ["divine", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Primal"], en: ["Divine", "Primal"], es: ["Divina", "Primordial"] },
    names: { "pt-BR": "Campo de Vida", en: "Life-Boosting Field", es: "Campo de vida" },
    summaries: { "pt-BR": "Cria uma área sustentada que cura criaturas vivas e causa dano vital a mortos-vivos.", en: "Creates a Sustained area that heals living creatures and deals vitality damage to undead.", es: "Crea un área mantenida que cura a criaturas vivas y causa daño de vitalidad a muertos vivientes." }
  },
  {
    id: "spell.ant_burden", name: "Carga de Formiga (Ant Haul)", rank: 1, page: 322, actionType: "two-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Carga de Formiga", en: "Ant Haul", es: "Carga de hormiga" },
    summaries: { "pt-BR": "Reforça o corpo do alvo para que ele consiga transportar muito mais carga durante várias horas.", en: "Reinforces the target's body so it can carry much more Bulk for several hours.", es: "Refuerza el cuerpo del objetivo para que pueda transportar mucha más Carga durante varias horas." }
  },
  {
    id: "spell.captivate", name: "Cativar (Captivate)", rank: 1, page: 323, actionType: "two-actions",
    traditions: ["arcane", "occult", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista", "Primal"], en: ["Arcane", "Occult", "Primal"], es: ["Arcana", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Cativar", en: "Captivate", es: "Cautivar" },
    summaries: { "pt-BR": "Uma magia sutil altera a atitude do alvo conforme o resultado do salvamento de Vontade.", en: "A subtle spell alters the target's attitude depending on the result of its Will save.", es: "Un conjuro sutil altera la actitud del objetivo según el resultado de su salvación de Voluntad." }
  },
  {
    id: "spell.blindness", name: "Cegueira (Blindness)", rank: 3, page: 323, actionType: "two-actions",
    traditions: ["arcane", "divine", "occult", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista", "Primal"], en: ["Arcane", "Divine", "Occult", "Primal"], es: ["Arcana", "Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Cegueira", en: "Blindness", es: "Ceguera" },
    summaries: { "pt-BR": "Cega o alvo por um período determinado pelo resultado do salvamento de Fortitude.", en: "Blinds the target for a duration determined by the result of its Fortitude save.", es: "Ciega al objetivo durante un tiempo determinado por el resultado de su salvación de Fortaleza." }
  },
  {
    id: "spell.illusory_scene", name: "Cena Ilusória (Illusory Scene)", rank: 5, page: 323, actionType: "activity",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "10 minutos", en: "10 minutes", es: "10 minutos" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Cena Ilusória", en: "Illusory Scene", es: "Escena ilusoria" },
    summaries: { "pt-BR": "Cria uma cena imaginária com criaturas e objetos que parecem reais aos sentidos.", en: "Creates an imaginary scene with creatures and objects that appear real to the senses.", es: "Crea una escena imaginaria con criaturas y objetos que parecen reales a los sentidos." }
  },
  {
    id: "spell.clear_mind", name: "Clarear Mente (Clear Mind)", rank: 2, page: 324, actionType: "two-actions",
    traditions: ["divine", "occult", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista", "Primal"], en: ["Divine", "Occult", "Primal"], es: ["Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Clarear Mente", en: "Clear Mind", es: "Mente clara" },
    summaries: { "pt-BR": "Tenta neutralizar ou suprimir certos efeitos mentais e condições que afetam o alvo.", en: "Attempts to counteract or suppress certain mental effects and conditions affecting the target.", es: "Intenta neutralizar o suprimir ciertos efectos mentales y condiciones que afectan al objetivo." }
  },
  {
    id: "spell.clairaudience", name: "Clariaudiência (Clairaudience)", rank: 3, page: 324, actionType: "activity",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "1 minuto", en: "1 minute", es: "1 minuto" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Clariaudiência", en: "Clairaudience", es: "Clariaudiencia" },
    summaries: { "pt-BR": "Cria uma orelha invisível e flutuante por meio da qual você pode ouvir à distância.", en: "Creates an invisible floating ear through which you can hear at a distance.", es: "Crea un oído flotante invisible a través del cual puedes escuchar a distancia." }
  },
  {
    id: "spell.clairvoyance", name: "Clarividência (Clairvoyance)", rank: 4, page: 325, actionType: "activity",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "1 minuto", en: "1 minute", es: "1 minuto" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Clarividência", en: "Clairvoyance", es: "Clarividencia" },
    summaries: { "pt-BR": "Cria um olho invisível e flutuante que permite enxergar à distância.", en: "Creates an invisible floating eye that lets you see at a distance.", es: "Crea un ojo flotante invisible que te permite ver a distancia." }
  },
  {
    id: "spell.command", name: "Comando (Command)", rank: 1, page: 325, actionType: "two-actions",
    traditions: ["arcane", "divine", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista"], en: ["Arcane", "Divine", "Occult"], es: ["Arcana", "Divina", "Ocultista"] },
    names: { "pt-BR": "Comando", en: "Command", es: "Orden" },
    summaries: { "pt-BR": "Emite uma ordem difícil de ignorar; o alvo obedece conforme o resultado do salvamento de Vontade.", en: "Issues a difficult-to-ignore command; the target obeys based on its Will save.", es: "Emite una orden difícil de ignorar; el objetivo obedece según su salvación de Voluntad." }
  },
  {
    id: "spell.share_life", name: "Compartilhar Vida (Share Life)", rank: 2, page: 325, actionType: "two-actions",
    traditions: ["divine"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina"], en: ["Divine"], es: ["Divina"] },
    names: { "pt-BR": "Compartilhar Vida", en: "Share Life", es: "Compartir vida" },
    summaries: { "pt-BR": "Vincula temporariamente sua essência vital à do alvo, dividindo o dano sofrido por ambos.", en: "Temporarily links your life essence to the target's, dividing damage suffered between you.", es: "Vincula temporalmente tu esencia vital a la del objetivo y divide entre ambos el daño sufrido." }
  },
  {
    id: "spell.compel_undead", name: "Compelir Morto-Vivo (Command Undead)", rank: 3, page: 325, actionType: "two-actions",
    traditions: ["arcane", "divine", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista"], en: ["Arcane", "Divine", "Occult"], es: ["Arcana", "Divina", "Ocultista"] },
    names: { "pt-BR": "Compelir Morto-Vivo", en: "Command Undead", es: "Comandar muerto viviente" },
    summaries: { "pt-BR": "Assume o controle de um morto-vivo sem mente, que recebe o traço lacaio durante a duração.", en: "Takes control of a mindless undead creature, which gains the minion trait for the duration.", es: "Toma el control de un muerto viviente sin mente, que obtiene el rasgo esbirro durante la duración." }
  },
  {
    id: "spell.status", name: "Condição (Status)", rank: 2, page: 325, actionType: "two-actions",
    traditions: ["divine", "occult", "primal"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Divina", "Ocultista", "Primal"], en: ["Divine", "Occult", "Primal"], es: ["Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Condição", en: "Status", es: "Estado" },
    summaries: { "pt-BR": "Mantém você consciente da direção, distância e condições que afetam uma criatura protegida viva.", en: "Keeps you aware of the direction, distance, and conditions affecting a living protected creature.", es: "Te mantiene consciente de la dirección, distancia y condiciones que afectan a una criatura viva protegida." }
  },
  {
    id: "spell.confusion", name: "Confusão (Confusion)", rank: 4, page: 325, actionType: "two-actions",
    traditions: ["arcane", "occult"], castingTimes: { "pt-BR": "2 ações", en: "2 actions", es: "2 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Ocultista"], en: ["Arcane", "Occult"], es: ["Arcana", "Ocultista"] },
    names: { "pt-BR": "Confusão", en: "Confusion", es: "Confusión" },
    summaries: { "pt-BR": "Enche a mente do alvo com impulsos estranhos, fazendo-o agir de maneira aleatória conforme o salvamento de Vontade.", en: "Fills the target's mind with strange impulses, causing erratic behavior based on its Will save.", es: "Llena la mente del objetivo de impulsos extraños y provoca un comportamiento errático según su salvación de Voluntad." }
  },
  {
    id: "spell.contingency", name: "Contingência (Contingency)", rank: 7, page: 326, actionType: "activity",
    traditions: ["arcane"], castingTimes: { "pt-BR": "10 minutos", en: "10 minutes", es: "10 minutos" },
    traditionNames: { "pt-BR": ["Arcana"], en: ["Arcane"], es: ["Arcana"] },
    names: { "pt-BR": "Contingência", en: "Contingency", es: "Contingencia" },
    summaries: { "pt-BR": "Prepara uma magia auxiliar para ser conjurada automaticamente quando um acionamento definido ocorrer.", en: "Prepares a spell to be cast automatically when a chosen trigger occurs.", es: "Prepara un conjuro para lanzarlo automáticamente cuando ocurra un desencadenante elegido." }
  },
  {
    id: "spell.summon_animal", name: "Convocar Animal (Summon Animal)", rank: 1, page: 326, actionType: "three-actions",
    traditions: ["arcane", "primal"], castingTimes: { "pt-BR": "3 ações", en: "3 actions", es: "3 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Primal"], en: ["Arcane", "Primal"], es: ["Arcana", "Primordial"] },
    names: { "pt-BR": "Convocar Animal", en: "Summon Animal", es: "Convocar animal" },
    summaries: { "pt-BR": "Conjura uma criatura com o traço animal para lutar por você durante a duração sustentada.", en: "Summons an animal creature to fight for you for the Sustained duration.", es: "Convoca una criatura animal para luchar por ti durante la duración mantenida." }
  },
  {
    id: "spell.summon_celestial", name: "Convocar Celestial (Summon Celestial)", rank: 5, page: 326, actionType: "three-actions",
    traditions: ["divine"], castingTimes: { "pt-BR": "3 ações", en: "3 actions", es: "3 acciones" },
    traditionNames: { "pt-BR": ["Divina"], en: ["Divine"], es: ["Divina"] },
    names: { "pt-BR": "Convocar Celestial", en: "Summon Celestial", es: "Convocar celestial" },
    summaries: { "pt-BR": "Conjura uma criatura celestial de nível apropriado para lutar por você durante a duração sustentada.", en: "Summons an appropriately leveled celestial creature to fight for you while Sustained.", es: "Convoca una criatura celestial del nivel apropiado para luchar por ti mientras se mantiene." }
  },
  {
    id: "spell.summon_construct", name: "Convocar Constructo (Summon Construct)", rank: 1, page: 326, actionType: "three-actions",
    traditions: ["arcane"], castingTimes: { "pt-BR": "3 ações", en: "3 actions", es: "3 acciones" },
    traditionNames: { "pt-BR": ["Arcana"], en: ["Arcane"], es: ["Arcana"] },
    names: { "pt-BR": "Convocar Constructo", en: "Summon Construct", es: "Convocar constructo" },
    summaries: { "pt-BR": "Conjura um constructo de nível apropriado para lutar por você durante a duração sustentada.", en: "Summons an appropriately leveled construct to fight for you while Sustained.", es: "Convoca un constructo del nivel apropiado para luchar por ti mientras se mantiene." }
  },
  {
    id: "spell.summon_dragon", name: "Convocar Dragão (Summon Dragon)", rank: 5, page: 326, actionType: "three-actions",
    traditions: ["arcane", "divine", "occult", "primal"], castingTimes: { "pt-BR": "3 ações", en: "3 actions", es: "3 acciones" },
    traditionNames: { "pt-BR": ["Arcana", "Divina", "Ocultista", "Primal"], en: ["Arcane", "Divine", "Occult", "Primal"], es: ["Arcana", "Divina", "Ocultista", "Primordial"] },
    names: { "pt-BR": "Convocar Dragão", en: "Summon Dragon", es: "Convocar dragón" },
    summaries: { "pt-BR": "Conjura um dragão de nível apropriado para lutar por você durante a duração sustentada.", en: "Summons an appropriately leveled dragon to fight for you while Sustained.", es: "Convoca un dragón del nivel apropiado para luchar por ti mientras se mantiene." }
  }
];
PLAYER_CORE_SPELLS.forEach((record) => PF2E_DATA.spells.push({
  ...record, level: record.rank, description: record.summaries["pt-BR"], rarity: "common",
  source: { book: PLAYER_CORE_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false
}));

const PLAYER_CORE_RITUALS = [
  {
    id: "ritual.animate_object", name: "Animar Objeto (Animate Object)", rank: 2, page: 390, rarity: "uncommon",
    castingTimes: { "pt-BR": "1 dia", en: "1 day", es: "1 día" },
    primaryChecks: { "pt-BR": "Arcanismo (especialista)", en: "Arcana (expert)", es: "Arcanos (experto)" },
    names: { "pt-BR": "Animar Objeto", en: "Animate Object", es: "Animar objeto" },
    summaries: { "pt-BR": "Transforma um objeto em uma criatura animada; um resultado superior pode permitir controlá-la como lacaio.", en: "Transforms an object into an animated creature; a superior result can allow it to be controlled as a minion.", es: "Transforma un objeto en una criatura animada; un resultado superior puede permitir controlarla como esbirro." }
  },
  {
    id: "ritual.rune_trap", name: "Armadilha Rúnica (Rune Trap)", rank: 3, page: 390, rarity: "uncommon",
    castingTimes: { "pt-BR": "1 hora", en: "1 hour", es: "1 hora" },
    primaryChecks: { "pt-BR": "Arcanismo, Natureza, Ocultismo ou Religião (especialista)", en: "Arcana, Nature, Occultism, or Religion (expert)", es: "Arcanos, Naturaleza, Ocultismo o Religión (experto)" },
    names: { "pt-BR": "Armadilha Rúnica", en: "Rune Trap", es: "Trampa rúnica" },
    summaries: { "pt-BR": "Vincula uma magia hostil a uma runa ativada por senha, acionamento ou aproximação.", en: "Binds a hostile spell to a rune activated by a password, trigger, or approach.", es: "Vincula un conjuro hostil a una runa activada por contraseña, desencadenante o aproximación." }
  },
  {
    id: "ritual.call_spirit", name: "Chamar Espírito (Call Spirit)", rank: 5, page: 391, rarity: "uncommon",
    castingTimes: { "pt-BR": "1 hora", en: "1 hour", es: "1 hora" },
    primaryChecks: { "pt-BR": "Ocultismo ou Religião (especialista)", en: "Occultism or Religion (expert)", es: "Ocultismo o Religión (experto)" },
    names: { "pt-BR": "Chamar Espírito", en: "Call Spirit", es: "Llamar espíritu" },
    summaries: { "pt-BR": "Chama pelo nome um espírito do além para uma conversa breve, usando uma conexão pessoal com ele.", en: "Calls a named spirit from the afterlife for a brief conversation using a personal connection to it.", es: "Llama por su nombre a un espíritu del más allá para una conversación breve usando una conexión personal." }
  },
  {
    id: "ritual.consecrate", name: "Consagrar (Consecrate)", rank: 2, page: 392, rarity: "uncommon",
    castingTimes: { "pt-BR": "3 dias", en: "3 days", es: "3 días" },
    primaryChecks: { "pt-BR": "Religião", en: "Religion", es: "Religión" },
    names: { "pt-BR": "Consagrar", en: "Consecrate", es: "Consagrar" },
    summaries: { "pt-BR": "Dedica um local a uma divindade, favorecendo seus adoradores e dificultando a ação de criaturas anátema.", en: "Dedicates a site to a deity, favoring worshippers and hindering creatures that are anathema to that deity.", es: "Dedica un lugar a una deidad, favorece a sus fieles y dificulta la acción de criaturas anatema." }
  }
];
PLAYER_CORE_RITUALS.forEach((record) => PF2E_DATA.rituals.push({
  ...record, description: record.summaries["pt-BR"],
  source: { book: PLAYER_CORE_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false
}));

const PLAYER_CORE_CATALOG = {
  ancestries: {
    "Anão": { id: "ancestry.dwarf", page: 42, names: { "pt-BR": "Anão", en: "Dwarf", es: "Enano" }, summaries: { "pt-BR": "Ancestralidade resistente, com 10 PV e forte tradição comunitária.", en: "A resilient ancestry with 10 HP and strong community traditions.", es: "Una ascendencia resistente, con 10 PG y fuertes tradiciones comunitarias." } },
    "Elfo": { id: "ancestry.elf", page: 46, names: { "pt-BR": "Elfo", en: "Elf", es: "Elfo" }, summaries: { "pt-BR": "Ancestralidade ágil e longeva, adaptável a muitos estudos e ambientes.", en: "An agile, long-lived ancestry adaptable to many studies and environments.", es: "Una ascendencia ágil y longeva, adaptable a muchos estudios y ambientes." } },
    "Gnomo": { id: "ancestry.gnome", page: 50, names: { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" }, summaries: { "pt-BR": "Ancestralidade pequena ligada à curiosidade, magia e experiências intensas.", en: "A Small ancestry tied to curiosity, magic, and vivid experiences.", es: "Una ascendencia Pequeña vinculada a la curiosidad, la magia y experiencias intensas." } },
    "Goblin": { id: "ancestry.goblin", page: 54, names: { "pt-BR": "Goblin", en: "Goblin", es: "Goblin" }, summaries: { "pt-BR": "Ancestralidade pequena, inventiva e enérgica, com grande variedade cultural.", en: "A Small, inventive, energetic ancestry with broad cultural variety.", es: "Una ascendencia Pequeña, inventiva y enérgica, con gran variedad cultural." } },
    "Halfling": { id: "ancestry.halfling", page: 58, names: { "pt-BR": "Halfling", en: "Halfling", es: "Mediano" }, summaries: { "pt-BR": "Ancestralidade pequena, observadora e corajosa, conhecida por sua sorte.", en: "A Small, observant, courageous ancestry known for good fortune.", es: "Una ascendencia Pequeña, observadora y valiente, conocida por su fortuna." } },
    "Humano": { id: "ancestry.human", page: 62, names: { "pt-BR": "Humano", en: "Human", es: "Humano" }, summaries: { "pt-BR": "Ancestralidade versátil, com escolhas flexíveis de atributos e talentos.", en: "A versatile ancestry with flexible attribute and feat choices.", es: "Una ascendencia versátil, con elecciones flexibles de atributos y dotes." } },
    "Leshy": { id: "ancestry.leshy", page: 66, names: { "pt-BR": "Leshy", en: "Leshy", es: "Leshy" }, summaries: { "pt-BR": "Espírito da natureza em um corpo vegetal, com formas e heranças variadas.", en: "A nature spirit inhabiting a plant body, with varied forms and heritages.", es: "Un espíritu de la naturaleza en un cuerpo vegetal, con formas y herencias variadas." } },
    "Orc": { id: "ancestry.orc", page: 70, names: { "pt-BR": "Orc", en: "Orc", es: "Orco" }, summaries: { "pt-BR": "Ancestralidade vigorosa e tenaz, moldada por sobrevivência e comunidade.", en: "A vigorous, tenacious ancestry shaped by survival and community.", es: "Una ascendencia vigorosa y tenaz, moldeada por la supervivencia y la comunidad." } }
  },
  classes: {
    "Bardo (Bard)": { id: "class.bard", page: 94, names: { "pt-BR": "Bardo", en: "Bard", es: "Bardo" }, summaries: { "pt-BR": "Conjurador carismático que inspira aliados por meio de composições.", en: "A charismatic spellcaster who inspires allies through compositions.", es: "Un lanzador carismático que inspira a sus aliados mediante composiciones." } },
    "Bruxo (Witch)": { id: "class.witch", page: 178, names: { "pt-BR": "Bruxo", en: "Witch", es: "Bruja" }, summaries: { "pt-BR": "Conjurador ligado a um patrono misterioso e acompanhado por um familiar.", en: "A spellcaster bound to a mysterious patron and accompanied by a familiar.", es: "Un lanzador ligado a un patrón misterioso y acompañado por un familiar." } },
    "Clérigo (Cleric)": { id: "class.cleric", page: 108, names: { "pt-BR": "Clérigo", en: "Cleric", es: "Clérigo" }, summaries: { "pt-BR": "Conjurador divino cuja doutrina e divindade definem capacidades centrais.", en: "A divine spellcaster whose doctrine and deity define core capabilities.", es: "Un lanzador divino cuya doctrina y deidad definen capacidades centrales." } },
    "Druida (Druid)": { id: "class.druid", page: 122, names: { "pt-BR": "Druida", en: "Druid", es: "Druida" }, summaries: { "pt-BR": "Conjurador primal vinculado à natureza e a uma ordem druídica.", en: "A primal spellcaster tied to nature and a druidic order.", es: "Un lanzador primal vinculado a la naturaleza y a una orden druídica." } },
    "Guerreiro (Fighter)": { id: "class.fighter", page: 136, names: { "pt-BR": "Guerreiro", en: "Fighter", es: "Guerrero" }, summaries: { "pt-BR": "Combatente especializado em armas, precisão e domínio tático.", en: "A combatant specialized in weapons, accuracy, and tactical mastery.", es: "Un combatiente especializado en armas, precisión y dominio táctico." } },
    "Ladino (Rogue)": { id: "class.rogue", page: 164, names: { "pt-BR": "Ladino", en: "Rogue", es: "Pícaro" }, summaries: { "pt-BR": "Especialista versátil que combina perícias, mobilidade e ataques oportunos.", en: "A versatile expert combining skills, mobility, and opportunistic attacks.", es: "Un experto versátil que combina habilidades, movilidad y ataques oportunos." } },
    "Mago (Wizard)": { id: "class.wizard", page: 192, names: { "pt-BR": "Mago", en: "Wizard", es: "Mago" }, summaries: { "pt-BR": "Conjurador arcano estudioso que prepara magias em seu grimório.", en: "A scholarly arcane spellcaster who prepares spells from a spellbook.", es: "Un lanzador arcano estudioso que prepara conjuros desde su grimorio." } },
    "Patrulheiro (Ranger)": { id: "class.ranger", page: 152, names: { "pt-BR": "Patrulheiro", en: "Ranger", es: "Explorador" }, summaries: { "pt-BR": "Caçador marcial que persegue uma presa e domina ambientes selvagens.", en: "A martial hunter who pursues chosen prey and masters the wilds.", es: "Un cazador marcial que persigue a su presa y domina los entornos salvajes." } }
  },
  backgrounds: {
    "Acróbata (Acrobat)": { id: "background.acrobat", page: 88, names: { "pt-BR": "Acróbata", en: "Acrobat", es: "Acróbata" }, summaries: { "pt-BR": "Você treinou acrobacias, equilíbrio e saltos espetaculares para encantar multidões ou superar obstáculos perigosos.", en: "You practiced acrobatics, balance, and spectacular jumps to delight crowds or overcome dangerous obstacles.", es: "Entrenaste acrobacias, equilibrio y saltos espectaculares para deleitar a las multitudes o superar obstáculos peligrosos." } },
    "Artesão (Artisan)": { id: "background.artisan", page: 88, names: { "pt-BR": "Artesão", en: "Artisan", es: "Artesano" }, summaries: { "pt-BR": "Como aprendiz de uma oficina ou guilda, você aprendeu a forjar, talhar ou tecer artigos úteis e obras de qualidade com ferramentas manuais.", en: "As an apprentice in a workshop or guild, you learned to forge, carve, or weave useful goods and quality craftwork with hand tools.", es: "Como aprendiz en un taller o gremio, aprendiste a forjar, tallar o tejer bienes útiles y obras de calidad con herramientas manuales." } },
    "Artista (Artist)": { id: "background.artist", page: 88, names: { "pt-BR": "Artista", en: "Artist", es: "Artista" }, summaries: { "pt-BR": "Você expressa sua visão criativa por meio de pintura, escultura, poesia ou música, criando obras que movem corações e mentes.", en: "You express your creative vision through painting, sculpture, poetry, or music, making works that move hearts and minds.", es: "Expresas tu visión creativa a través de la pintura, escultura, poesía o música, creando obras que conmueven corazones y mentes." } },
    "Batedor Selvagem (Wilderness Scout)": { id: "background.wilderness_scout", page: 90, names: { "pt-BR": "Batedor Selvagem", en: "Wilderness Scout", es: "Explorador de avanzada" }, summaries: { "pt-BR": "Você guiou caravanas e exércitos por terras inexploradas, reconhecendo perigos naturais e emboscadas antes de todos.", en: "You guided caravans and armies through uncharted lands, spotting natural hazards and ambushes before anyone else.", es: "Guiaste caravanas y ejércitos por tierras inexploradas, detectando peligros naturales y emboscadas antes que nadie." } },
    "Caçador (Hunter)": { id: "background.hunter", page: 89, names: { "pt-BR": "Caçador", en: "Hunter", es: "Cazador" }, summaries: { "pt-BR": "Você perseguiu presas em florestas e montanhas, aprendendo o comportamento da fauna e as técnicas de emboscada e abate.", en: "You tracked prey through forests and mountains, learning animal behavior and ambush and harvesting techniques.", es: "Rastreaste presas por bosques y montañas, aprendiendo el comportamiento animal y las técnicas de emboscada y aprovechamiento." } },
    "Charlatão (Charlatan)": { id: "background.charlatan", page: 88, names: { "pt-BR": "Charlatão", en: "Charlatan", es: "Charlatán" }, summaries: { "pt-BR": "Você viajou vendendo elixires falsos, falsas promessas e esquemas astutos, escapando sempre antes que a farsa fosse descoberta.", en: "You learned to charm, tell convincing falsehoods, and sell dubious wonders while staying one step ahead of the law.", es: "Viajaste vendiendo elixires falsos, promesas vanas y astutas estafas, escapando siempre antes de que se descubriera la farsa." } },
    "Cozinheiro (Cook)": { id: "background.cook", page: 88, names: { "pt-BR": "Cozinheiro", en: "Cook", es: "Cocinero" }, summaries: { "pt-BR": "Em tavernas barulhentas, navios ou acampamentos de campanha, você alimentou bocas famintas e aprendeu a identificar ingredientes raros e especiarias.", en: "In bustling taverns, ships, or military camps, you fed hungry mouths and learned to identify rare ingredients and spices.", es: "En tabernas concurridas, barcos o campamentos militares, alimentaste a bocas hambrientas y aprendiste a identificar ingredientes y especias raros." } },
    "Criminoso (Criminal)": { id: "background.criminal", page: 88, names: { "pt-BR": "Criminoso", en: "Criminal", es: "Criminal" }, summaries: { "pt-BR": "Você sobreviveu nos becos escuros praticando arrombamento, furto ou contrabando, sempre atento à ronda da guarda urbana.", en: "You survived in dark alleys practicing burglary, theft, or smuggling, always wary of the city guard patrols.", es: "Sobreviviste en callejones oscuros practicando robos, hurtos o contrabando, siempre atento a las patrullas de la guardia urbana." } },
    "Curandeiro de Campo (Field Medic)": { id: "background.field_medic", page: 89, names: { "pt-BR": "Curandeiro de Campo", en: "Field Medic", es: "Médico de campo" }, summaries: { "pt-BR": "Em meio ao caos do combate, você estancou sangramentos, estabilizou soldados caídos e tratou ferimentos graves sob fogo cerrado.", en: "Amid the chaos of battle, you stopped bleeding, stabilized fallen soldiers, and treated severe wounds under heavy fire.", es: "En medio del caos del combate, detuviste hemorragias, estabilizaste soldados caídos y trataste heridas graves bajo fuego intenso." } },
    "Detetive (Detective)": { id: "background.detective", page: 89, names: { "pt-BR": "Detetive", en: "Detective", es: "Detective" }, summaries: { "pt-BR": "Você investigou mistérios urbanos, interrogou suspeitos e desvendou tramas criminosas conectando pequenas pistas esquecidas.", en: "You investigated urban mysteries, interrogated suspects, and uncovered criminal plots by linking subtle forgotten clues.", es: "Investigaste misterios urbanos, interrogaste sospechosos y desentrañaste tramas criminales uniendo pequeñas pistas olvidadas." } },
    "Duelista de Oppara (Dueling Noble)": { id: "background.dueling_noble", page: 89, names: { "pt-BR": "Duelista de Oppara", en: "Dueling Noble", es: "Noble duelista" }, summaries: { "pt-BR": "Treinado nos salões e academias de duelo de Taldor, você combina esgrima refinada e insultos afiados para desestabilizar rivais.", en: "Trained in the dueling salons and academies of Taldor, you combine refined swordplay with sharp wit to unbalance rivals.", es: "Entrenado en los salones y academias de duelo de Taldor, combinas esgrima refinada y agudos insultos para desestabilizar rivales." } },
    "Emissário (Emissary)": { id: "background.emissary", page: 89, names: { "pt-BR": "Emissário", en: "Emissary", es: "Emisario" }, summaries: { "pt-BR": "Você atuou como porta-voz, diplomata ou mensageiro entre governantes e facções, negociando tratados e acordos delicados.", en: "You served as a spokesperson, diplomat, or messenger between rulers and factions, brokering delicate treaties and pacts.", es: "Actuaste como portavoz, diplomático o mensajero entre gobernantes y facciones, negociando tratados y acuerdos delicados." } },
    "Eremita (Hermit)": { id: "background.hermit", page: 89, names: { "pt-BR": "Eremita", en: "Hermit", es: "Eremita" }, summaries: { "pt-BR": "Isolado em cavernas, picos ou ermos distantes, você dedicou anos à contemplação e à comunhão com segredos esquecidos do mundo.", en: "Isolated in caves, peaks, or remote wilderness, you spent years in contemplation and communion with forgotten secrets of the world.", es: "Aislado en cuevas, cumbres o páramos remotos, dedicaste años a la contemplación y a la comunión con secretos olvidados del mundo." } },
    "Escudeiro (Squire)": { id: "background.squire", page: 91, names: { "pt-BR": "Escudeiro", en: "Squire", es: "Escudero" }, summaries: { "pt-BR": "A serviço de um cavaleiro ou campeão, você cuidou de armas, armaduras pesadas e montarias, aprendendo o código marcial e a disciplina das armas.", en: "Serving a knight or champion, you tended to weapons, heavy armor, and steeds, learning the martial code and weapons discipline.", es: "Al servicio de un caballero o campeón, cuidaste armas, armaduras pesadas y monturas, aprendiendo el código marcial y la disciplina bélica." } },
    "Estudante da Academia (Scholar)": { id: "background.scholar", page: 90, names: { "pt-BR": "Estudante da Academia", en: "Scholar", es: "Erudito" }, summaries: { "pt-BR": "Você passou noites imerso em arquivos e bibliotecas, dominando teorias arcanas, históricas ou naturais com rigor acadêmico.", en: "You spent countless nights in archives and libraries, mastering arcane, historical, or natural theories with academic rigor.", es: "Pasaste noches inmerso en archivos y bibliotecas, dominando teorías arcanas, históricas o naturales con rigor académico." } },
    "Gladiador (Gladiator)": { id: "background.gladiator", page: 89, names: { "pt-BR": "Gladiador", en: "Gladiator", es: "Gladiador" }, summaries: { "pt-BR": "Nas arenas e fossos de combate, você lutou pela sobrevivência e pela aclamação do público, aprendendo a transformar a violência em espetáculo.", en: "In arenas and fighting pits, you fought for survival and the crowd's cheers, turning martial combat into grand theatrical showmanship.", es: "En arenas y fosos de combate, luchaste por la supervivencia y el aplauso del público, convirtiendo el combate en un gran espectáculo." } },
    "Guarda da Cidade (Guard)": { id: "background.guard", page: 89, names: { "pt-BR": "Guarda da Cidade", en: "Guard", es: "Guardia" }, summaries: { "pt-BR": "Você patrulhou portões, muralhas e ruas, fazendo cumprir as leis locais, dispersando tumultos e intimidando malfeitores.", en: "You patrolled gates, walls, and streets, enforcing local laws, dispersing brawls, and staring down wrongdoers.", es: "Patrullaste puertas, murallas y calles, haciendo cumplir las leyes locales, disolviendo tumultos e intimidando a maleantes." } },
    "Herdeiro Nobre (Noble)": { id: "background.noble", page: 90, names: { "pt-BR": "Herdeiro Nobre", en: "Noble", es: "Noble" }, summaries: { "pt-BR": "Criado no privilégio de uma linhagem nobre, você aprendeu política palaciana, genealogia aristocrática e as expectativas do poder.", en: "Raised in the privilege of a noble lineage, you learned courtly politics, aristocratic heraldry, and the obligations of power.", es: "Criado en el privilegio de un linaje noble, aprendiste política cortesana, heráldica aristocrática y las obligaciones del poder." } },
    "Marinheiro (Sailor)": { id: "background.sailor", page: 90, names: { "pt-BR": "Marinheiro", en: "Sailor", es: "Marinero" }, summaries: { "pt-BR": "Você içou velas em mares tempestuosos, manejou cordames e ancoradouros e conhece o ritmo imprevisível das marés.", en: "You hoisted sails in stormy seas, handled rigging and anchorages, and know the unpredictable rhythm of the open waters.", es: "Izaste velas en mares tempestuosos, manejaste cabos y anclas, y conoces el ritmo impredecible de las aguas abiertas." } },
    "Mercador (Merchant)": { id: "background.merchant", page: 90, names: { "pt-BR": "Mercador", en: "Merchant", es: "Mercader" }, summaries: { "pt-BR": "Você comprou e vendeu mercadorias em feiras e bazares, avaliando preços justos, lucros e rotas comerciais lucrativas.", en: "You bought and sold goods at fairs and bazaars, evaluating fair prices, margins, and profitable trade routes.", es: "Compraste y vendiste mercancías en ferias y bazares, evaluando precios justos, márgenes y rutas comerciales rentables." } },
    "Mineiro (Miner)": { id: "background.miner", page: 90, names: { "pt-BR": "Mineiro", en: "Miner", es: "Minero" }, summaries: { "pt-BR": "Você escavou túneis profundos com picareta em busca de minérios preciosos, acostumando-se ao confinamento e aos perigos da rocha.", en: "You excavated deep tunnels with pickaxe seeking precious ores, getting accustomed to close quarters and underground cave-in hazards.", es: "Excavaste túneles profundos con pico en busca de minerales preciosos, acostumbrándote al confinamiento y a los peligros de la roca." } },
    "Nômade (Nomad)": { id: "background.nomad", page: 90, names: { "pt-BR": "Nômade", en: "Nomad", es: "Nómada" }, summaries: { "pt-BR": "Sua tribo ou família viajou constantemente por estepes e desertos, ensinando a você como se orientar pelo sol e pelas estrelas.", en: "Your tribe or clan traveled constantly across steppes and deserts, teaching you how to navigate by sun, stars, and weather.", es: "Tu tribu o clan viajó constantemente por estepas y desiertos, enseñándote a orientarte por el sol, las estrellas y el clima." } },
    "Prisioneiro (Prisoner)": { id: "background.prisoner", page: 90, names: { "pt-BR": "Prisioneiro", en: "Prisoner", es: "Prisionero" }, summaries: { "pt-BR": "Trancafiado em masmorras ou colônias penais, você desenvolveu rijeza física e astúcia para resistir ao cárcere e reconquistar a liberdade.", en: "Locked in dungeons or penal colonies, you built physical toughness and cunning to survive imprisonment and reclaim freedom.", es: "Encerrado en mazmorras o colonias penales, desarrollaste dureza física y astucia para sobrevivir al encierro y recuperar la libertad." } },
    "Trabalhador Braçal (Laborer)": { id: "background.laborer", page: 89, names: { "pt-BR": "Trabalhador Braçal", en: "Laborer", es: "Trabajador manual" }, summaries: { "pt-BR": "Você realizou trabalhos pesados na construção de muralhas, estivagem de cais ou corte de lenha, forjando uma constituição musculosa e incansável.", en: "You performed hard physical labor building walls, loading docks, or felling timber, forging a muscular and tireless constitution.", es: "Realizaste trabajo físico pesado construyendo murallas, cargando muelles o talando árboles, forjando una constitución musculosa e incansable." } },
    "Taverneiro (Barkeeper)": { id: "background.barkeeper", page: 88, names: { "pt-BR": "Taverneiro", en: "Barkeeper", es: "Tabernero" }, summaries: { "pt-BR": "Servindo canecas atrás do balcão, você ouviu fofocas de viajantes, acalmou brigas bêbadas e desenvolveu um excelente senso de diplomacia prática.", en: "Pouring ales behind the bar, you listened to traveler gossip, calmed drunken brawls, and honed practical diplomacy.", es: "Sirviendo jarras tras la barra, escuchaste cotilleos de viajeros, calmaste peleas de borrachos y afilaste una diplomacia práctica." } }
  }
};

[
  ...Object.values(PF2E_DATA.ancestries),
  ...(PF2E_DATA.versatileHeritages || []),
  ...Object.values(PF2E_DATA.classes),
  ...(PF2E_DATA.backgrounds || []),
  ...(PF2E_DATA.skills || []),
  ...(PF2E_DATA.weapons || []),
  ...(PF2E_DATA.armors || [])
].forEach((record) => {
  if (!record.ruleset) record.ruleset = "needs_review";
  if (typeof record.needs_review !== "boolean") record.needs_review = true;
});

Object.entries(PLAYER_CORE_CATALOG.ancestries).forEach(([name, record]) => {
  if (PF2E_DATA.ancestries[name]) Object.assign(PF2E_DATA.ancestries[name], record, { source: { book: PLAYER_CORE_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false });
});
Object.entries(PLAYER_CORE_CATALOG.classes).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: PLAYER_CORE_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false });
});
if (PLAYER_CORE_CATALOG.backgrounds) {
  Object.entries(PLAYER_CORE_CATALOG.backgrounds).forEach(([name, record]) => {
    const bg = PF2E_DATA.backgrounds.find((b) => b.name === name || b.name.startsWith(name) || name.startsWith(b.name));
    if (bg) {
      Object.assign(bg, record, {
        description: record.summaries?.["pt-BR"] || bg.description,
        source: { book: PLAYER_CORE_SOURCE, page: record.page },
        ruleset: "remaster",
        needs_review: false
      });
    }
  });
}

// Páginas conferidas onde cada seção realmente começa no Player Core 2 local.
// O sumário da edição brasileira contém divergências nas classes e heranças.
const PLAYER_CORE_2_SOURCE = "Livro do Jogador 2 (Player Core 2, Remaster)";
const PLAYER_CORE_2_CATALOG = {
  ancestries: {
    "Catfolk (Amurrun / Povo-Gato)": { id: "ancestry.catfolk", page: 8, names: { "pt-BR": "Amurrun", en: "Catfolk", es: "Pueblo felino" }, summaries: { "pt-BR": "Ancestralidade felina, curiosa e ágil, com forte vínculo comunitário.", en: "A curious, agile feline ancestry with strong community bonds.", es: "Una ascendencia felina, curiosa y ágil, con fuertes lazos comunitarios." } },
    "Hobgoblin": { id: "ancestry.hobgoblin", page: 12, names: { "pt-BR": "Hobgoblin", en: "Hobgoblin", es: "Hobgoblin" }, summaries: { "pt-BR": "Ancestralidade disciplinada e resistente, marcada por organização e pragmatismo.", en: "A disciplined, resilient ancestry shaped by organization and pragmatism.", es: "Una ascendencia disciplinada y resistente, marcada por la organización y el pragmatismo." } },
    "Lizardfolk (Iruxi / Homem-Lagarto)": { id: "ancestry.lizardfolk", page: 16, names: { "pt-BR": "Iruxi", en: "Lizardfolk", es: "Pueblo lagarto" }, summaries: { "pt-BR": "Ancestralidade reptiliana de tradições antigas e grande capacidade de sobrevivência.", en: "A reptilian ancestry with ancient traditions and strong survival instincts.", es: "Una ascendencia reptiliana de tradiciones antiguas y gran capacidad de supervivencia." } },
    "Gnoll (Kholo)": { id: "ancestry.kholo", page: 20, names: { "pt-BR": "Kholo", en: "Kholo", es: "Kholo" }, summaries: { "pt-BR": "Ancestralidade de aspecto hienídeo, pragmática e dedicada à comunidade e aos ancestrais.", en: "A hyena-like, pragmatic ancestry devoted to community and ancestors.", es: "Una ascendencia de aspecto hiena, pragmática y dedicada a la comunidad y los ancestros." } },
    "Kobold": { id: "ancestry.kobold", page: 24, names: { "pt-BR": "Kobold", en: "Kobold", es: "Kobold" }, summaries: { "pt-BR": "Ancestralidade reptiliana pequena, engenhosa e influenciada por fontes poderosas de magia.", en: "A Small, ingenious reptilian ancestry influenced by powerful sources of magic.", es: "Una ascendencia reptiliana Pequeña e ingeniosa, influida por poderosas fuentes de magia." } },
    "Tengu": { id: "ancestry.tengu", page: 28, names: { "pt-BR": "Tengu", en: "Tengu", es: "Tengu" }, summaries: { "pt-BR": "Ancestralidade aviária sociável, inventiva e conhecida por sua afinidade com lâminas.", en: "A sociable, inventive avian ancestry known for an affinity with blades.", es: "Una ascendencia aviar sociable e inventiva, conocida por su afinidad con las hojas." } },
    "Tripkee": { id: "ancestry.tripkee", page: 32, names: { "pt-BR": "Tripkee", en: "Tripkee", es: "Tripkee" }, summaries: { "pt-BR": "Ancestralidade anfíbia pequena, paciente e naturalmente apta a escalar.", en: "A Small, patient amphibian ancestry naturally suited to climbing.", es: "Una ascendencia anfibia Pequeña, paciente y naturalmente hábil para trepar." } },
    "Ratfolk (Ysoki / Povo-Rato)": { id: "ancestry.ratfolk", page: 36, names: { "pt-BR": "Ysoki", en: "Ratfolk", es: "Pueblo rata" }, summaries: { "pt-BR": "Ancestralidade ratoide pequena, diligente, adaptável e voltada à vida comunitária.", en: "A Small, diligent, adaptable rat-like ancestry centered on community life.", es: "Una ascendencia Pequeña de aspecto rata, diligente, adaptable y comunitaria." } }
  },
  versatileHeritages: {
    "Duskwalker (Caminhante do Crepúsculo)": { id: "heritage.duskwalker", page: 42, names: { "pt-BR": "Crepusculante", en: "Duskwalker", es: "Caminante del ocaso" }, summaries: { "pt-BR": "Alma reencarnada ligada aos psicopompos e ao ciclo das almas.", en: "A reincarnated soul tied to psychopomps and the cycle of souls.", es: "Un alma reencarnada ligada a los psicopompos y al ciclo de las almas." } },
    "Dhampir (Meio-Vampiro)": { id: "heritage.dhampir", page: 44, names: { "pt-BR": "Dampiro", en: "Dhampir", es: "Dhampiro" }, summaries: { "pt-BR": "Herança versátil mortal conectada à influência vampírica.", en: "A mortal versatile heritage connected to vampiric influence.", es: "Una herencia versátil mortal conectada con la influencia vampírica." } },
    "Dracano (Dragonblood)": { id: "heritage.dragonblood", page: 46, names: { "pt-BR": "Dracano", en: "Dragonblood", es: "Sangre de dragón" }, summaries: { "pt-BR": "Herança versátil de descendência dracônica, com traços físicos ou magia inata.", en: "A versatile heritage of draconic descent, with physical traits or innate magic.", es: "Una herencia versátil de ascendencia dracónica, con rasgos físicos o magia innata." } }
  },
  classes: {
    "Alquimista (Alchemist)": { id: "class.alchemist", page: 56, names: { "pt-BR": "Alquimista", en: "Alchemist", es: "Alquimista" }, summaries: { "pt-BR": "Especialista em criar e usar itens alquímicos adaptados a cada desafio.", en: "An expert at creating and using alchemical items tailored to each challenge.", es: "Un experto en crear y usar objetos alquímicos adaptados a cada desafío." } },
    "Bárbaro (Barbarian)": { id: "class.barbarian", page: 70, names: { "pt-BR": "Bárbaro", en: "Barbarian", es: "Bárbaro" }, summaries: { "pt-BR": "Combatente resistente que transforma a fúria em poder marcial.", en: "A resilient combatant who turns rage into martial power.", es: "Un combatiente resistente que convierte la furia en poder marcial." } },
    "Campeão (Champion / Paladino)": { id: "class.champion", page: 86, names: { "pt-BR": "Campeão", en: "Champion", es: "Campeón" }, summaries: { "pt-BR": "Guerreiro devoto cuja causa divina orienta defesa, reação e conduta.", en: "A devoted warrior whose divine cause guides defense, reaction, and conduct.", es: "Un guerrero devoto cuya causa divina guía su defensa, reacción y conducta." } },
    "Espadachim (Swashbuckler)": { id: "class.swashbuckler", page: 100, names: { "pt-BR": "Espadachim", en: "Swashbuckler", es: "Espadachín" }, summaries: { "pt-BR": "Combatente móvel que conquista garbo com ações ousadas e finalizadores.", en: "A mobile combatant who gains panache through daring actions and finishers.", es: "Un combatiente móvil que gana garbo con acciones audaces y remates." } },
    "Feiticeiro (Sorcerer)": { id: "class.sorcerer", page: 112, names: { "pt-BR": "Feiticeiro", en: "Sorcerer", es: "Hechicero" }, summaries: { "pt-BR": "Conjurador espontâneo cuja linhagem determina sua tradição e poderes.", en: "A spontaneous spellcaster whose bloodline determines tradition and powers.", es: "Un lanzador espontáneo cuyo linaje determina su tradición y poderes." } },
    "Inquisidor / Investigador (Investigator)": { id: "class.investigator", page: 126, names: { "pt-BR": "Investigador", en: "Investigator", es: "Investigador" }, summaries: { "pt-BR": "Especialista analítico que transforma pistas e planejamento em vantagem.", en: "An analytical expert who turns clues and planning into an advantage.", es: "Un experto analítico que convierte pistas y planificación en ventaja." } },
    "Monge (Monk)": { id: "class.monk", page: 140, names: { "pt-BR": "Monge", en: "Monk", es: "Monje" }, summaries: { "pt-BR": "Combatente ágil que domina posturas, golpes desarmados e disciplina corporal.", en: "An agile combatant mastering stances, unarmed strikes, and bodily discipline.", es: "Un combatiente ágil que domina posturas, golpes desarmados y disciplina corporal." } },
    "Oráculo (Oracle)": { id: "class.oracle", page: 154, names: { "pt-BR": "Oráculo", en: "Oracle", es: "Oráculo" }, summaries: { "pt-BR": "Conjurador divino que equilibra revelações poderosas e uma maldição crescente.", en: "A divine spellcaster balancing powerful revelations with a growing curse.", es: "Un lanzador divino que equilibra revelaciones poderosas y una maldición creciente." } }
  }
};

Object.entries(PLAYER_CORE_2_CATALOG.ancestries).forEach(([name, record]) => {
  if (PF2E_DATA.ancestries[name]) Object.assign(PF2E_DATA.ancestries[name], record, { source: { book: PLAYER_CORE_2_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false });
});
Object.entries(PLAYER_CORE_2_CATALOG.versatileHeritages).forEach(([name, record]) => {
  const heritage = PF2E_DATA.versatileHeritages.find((item) => item.name === name);
  if (heritage) Object.assign(heritage, record, { source: { book: PLAYER_CORE_2_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false });
});
Object.entries(PLAYER_CORE_2_CATALOG.classes).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: PLAYER_CORE_2_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false });
});

// Player Core 2, biografias raras (pp. 52–53). A mecânica estruturada abaixo
// preserva os efeitos transcritos do PDF local; a referência ainda fica em
// revisão porque a página individual precisa ser conferida contra a edição.
const PLAYER_CORE_2_RARE_BACKGROUNDS = [
  ["blessed", "Abençoado", "Blessed", "Bendecido", 52, ["Sabedoria", "Carisma"], "religion", "Saber da Divindade", "Orientação", "Sua bênção divina oferece intuição e proteção em situações difíceis.", "A divine blessing gives you intuition and protection in difficult situations.", "Una bendición divina te da intuición y protección en situaciones difíciles."],
  ["cursed", "Amaldiçoado", "Cursed", "Maldito", 52, ["Inteligência", "Carisma"], "occultism", "Saber de Maldições", "Sinal de Proteção", "Uma maldição pessoal ou hereditária ensinou você a resistir a efeitos mágicos nocivos.", "A personal or inherited curse taught you to resist harmful magical effects.", "Una maldición personal o hereditaria te enseñó a resistir efectos mágicos dañinos."],
  ["amnesiac", "Amnésico", "Amnesiac", "Amnésico", 52, ["Livre", "Livre", "Livre"], "—", "—", "—", "Seu passado é um mistério, e pistas inesperadas guiam sua descoberta.", "Your past is a mystery, and unexpected clues guide your discovery.", "Tu pasado es un misterio, y pistas inesperadas guían tu descubrimiento."],
  ["haunted", "Assombrado", "Haunted", "Embrujado", 52, ["Sabedoria", "Carisma"], "occultism", "Saber da Entidade", "—", "Uma entidade acompanha você desde a infância e influencia sua vida de formas sutis.", "An entity has followed you since childhood and subtly influences your life.", "Una entidad te acompaña desde la infancia e influye sutilmente en tu vida."],
  ["wild_child", "Criança Selvagem", "Wild Child", "Niño salvaje", 52, ["Força", "Destreza", "Constituição"], "nature", "Saber de Animais", "Forrageador", "Você cresceu na natureza entre animais, desenvolvendo instintos e uma conexão mística com eles.", "You grew up in the wild among animals, developing instincts and a mystical connection to them.", "Creciste en la naturaleza entre animales, desarrollando instintos y una conexión mística con ellos."],
  ["fae_bound", "Ligado às Fadas", "Feybound", "Vinculado a las hadas", 53, ["Destreza", "Carisma"], "nature", "Saber de Fadas", "Fortúnio das Fadas", "Um pacto com as fadas concedeu poderes e um anátema que ainda orienta sua vida.", "A pact with the fey granted powers and an anathema that still shapes your life.", "Un pacto con las hadas te concedió poderes y un anatema que aún moldea tu vida."],
  ["royalty", "Realeza", "Royalty", "Realeza", 53, ["Inteligência", "Carisma"], "society", "Saber da Corte", "Gracejos da Corte", "Você pertence a uma família real e conhece as responsabilidades e privilégios do poder.", "You belong to a royal family and know the responsibilities and privileges of power.", "Perteneces a una familia real y conoces las responsabilidades y privilegios del poder."],
  ["returned", "Retornado", "Returned", "Retornado", 53, ["Constituição", "Sabedoria"], "religion", "Saber do Ossário", "Duro de Matar", "Você morreu e voltou com uma ligação incomum com a vida e a morte.", "You died and returned with an unusual connection to life and death.", "Moriste y regresaste con una conexión inusual con la vida y la muerte."]
].map(([id, pt, en, es, page, ability, skill, lore, feat, ptSummary, enSummary, esSummary]) => ({
  id: `background.player_core_2.rare.${id}`,
  name: `${pt} (${en})`,
  page,
  ability,
  skill,
  lore,
  feat,
  rarity: "rare",
  names: { "pt-BR": pt, en, es },
  summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  description: ptSummary,
  source: { book: PLAYER_CORE_2_SOURCE, page },
  sourceApproximate: true,
  ruleset: "remaster",
  needs_review: true
}));
const PLAYER_CORE_2_RARE_BACKGROUND_MECHANICS = {
  blessed: {
    "pt-BR": { abilityBoostRules: ["Sabedoria", "Livre"], trainedSkills: ["Saber (divindade ou determinação do Mestre)"], specialActions: ["Orientação como magia divina inata à vontade, ou benefício semelhante determinado pelo Mestre"] },
    en: { abilityBoostRules: ["Wisdom", "Free"], trainedSkills: ["Lore (deity or GM-determined)"], specialActions: ["Guidance as a divine innate cantrip at will, or a similar GM-determined benefit"] },
    es: { abilityBoostRules: ["Sabiduría", "Libre"], trainedSkills: ["Saber (deidad o determinado por el DJ)"], specialActions: ["Guía como truco innato divino a voluntad, o beneficio similar determinado por el DJ"] }
  },
  cursed: {
    "pt-BR": { abilityBoostRules: ["Inteligência", "Livre"], trainedSkills: ["Ocultismo", "Saber (Maldições)"], specialActions: ["Sinal de Proteção: reação, uma vez por minuto; +2 no salvamento acionador, ou +3 se o efeito for uma maldição"] },
    en: { abilityBoostRules: ["Intelligence", "Free"], trainedSkills: ["Occultism", "Curse Lore"], specialActions: ["Protective Sign: reaction, once per minute; +2 to the triggering save, or +3 if the effect is a curse"] },
    es: { abilityBoostRules: ["Inteligencia", "Libre"], trainedSkills: ["Ocultismo", "Saber de maldiciones"], specialActions: ["Señal protectora: reacción, una vez por minuto; +2 a la salvación desencadenante, o +3 si el efecto es una maldición"] }
  },
  amnesiac: {
    "pt-BR": { abilityBoostRules: ["Livre", "Livre", "Livre (determinado pelo Mestre a partir das pistas)"], specialRules: ["Você e o Mestre definem detalhes notáveis do passado ou pertences do personagem como pistas iniciais"] },
    en: { abilityBoostRules: ["Free", "Free", "Free (determined by the GM from the clues)"], specialRules: ["You and the GM define notable details about the character's past or possessions as initial clues"] },
    es: { abilityBoostRules: ["Libre", "Libre", "Libre (determinado por el DJ a partir de las pistas)"], specialRules: ["Tú y el DJ definís detalles notables del pasado o pertenencias del personaje como pistas iniciales"] }
  },
  haunted: {
    "pt-BR": { abilityBoostRules: ["Sabedoria", "Livre"], trainedSkills: ["Ocultismo", "Uma perícia adicional conhecida pela entidade (Mestre)", "Saber (Entidade)"], specialRules: ["A entidade pode Auxiliar em testes de sua perícia; aceitar e falhar causa Assustado 2 (Assustado 4 em falha crítica). O valor inicial não pode ser reduzido nem impedido"] },
    en: { abilityBoostRules: ["Wisdom", "Free"], trainedSkills: ["Occultism", "One additional skill known by the entity (GM)", "Lore (Entity)"], specialRules: ["The entity can Aid checks with its skill; accepting and failing makes you frightened 2 (frightened 4 on a critical failure). The initial value can't be reduced or prevented"] },
    es: { abilityBoostRules: ["Sabiduría", "Libre"], trainedSkills: ["Ocultismo", "Una habilidad adicional conocida por la entidad (DJ)", "Saber (Entidad)"], specialRules: ["La entidad puede Ayudar en pruebas de su habilidad; aceptar y fallar te deja asustado 2 (asustado 4 con fallo crítico). El valor inicial no puede reducirse ni impedirse"] }
  },
  wild_child: {
    "pt-BR": { abilityBoostRules: ["Força, Destreza ou Constituição"], trainedSkills: ["Natureza", "Sobrevivência"], senses: ["Visão na penumbra (ou visão no escuro)", "Faro impreciso 9 metros"], grants: ["Forrageador"] },
    en: { abilityBoostRules: ["Strength, Dexterity, or Constitution"], trainedSkills: ["Nature", "Survival"], senses: ["Low-light vision (or darkvision)", "Imprecise scent 30 feet"], grants: ["Forager"] },
    es: { abilityBoostRules: ["Fuerza, Destreza o Constitución"], trainedSkills: ["Naturaleza", "Supervivencia"], senses: ["Visión en penumbra (o visión en la oscuridad)", "Olfato impreciso 9 metros"], grants: ["Recolector"] }
  },
  fae_bound: {
    "pt-BR": { abilityBoostRules: ["Destreza", "Livre"], trainedSkills: ["Saber (Fadas)"], specialActions: ["Fortúnio das Fadas: ação livre, uma vez por dia; role um teste de perícia duas vezes e use o melhor resultado"], specialRules: ["Anátema definido com o Mestre; violá-lo remove Fortúnio das Fadas até um ritual bem-sucedido de expiação usando Natureza"] },
    en: { abilityBoostRules: ["Dexterity", "Free"], trainedSkills: ["Fey Lore"], specialActions: ["Fey Fortune: free action, once per day; roll a skill check twice and use the better result"], specialRules: ["Anathema is defined with the GM; violating it removes Fey Fortune until a successful Nature-based atonement ritual"] },
    es: { abilityBoostRules: ["Destreza", "Libre"], trainedSkills: ["Saber feérico"], specialActions: ["Fortuna feérica: acción gratuita, una vez al día; tira una prueba de habilidad dos veces y usa el mejor resultado"], specialRules: ["El anatema se define con el DJ; violarlo elimina Fortuna feérica hasta un ritual exitoso de expiación usando Naturaleza"] }
  },
  royalty: {
    "pt-BR": { abilityBoostRules: ["Inteligência", "Livre"], trainedSkills: ["Sociedade"], grants: ["Gracejos da Corte"], specialRules: ["Pode influenciar plebeus no território da família e nobres em qualquer lugar"] },
    en: { abilityBoostRules: ["Intelligence", "Free"], trainedSkills: ["Society"], grants: ["Courtly Graces"], specialRules: ["You can influence commoners in your family's territory and nobles anywhere"] },
    es: { abilityBoostRules: ["Inteligencia", "Libre"], trainedSkills: ["Sociedad"], grants: ["Galantería cortesana"], specialRules: ["Puedes influir en plebeyos dentro del territorio de tu familia y en nobles en cualquier lugar"] }
  },
  returned: {
    "pt-BR": { abilityBoostRules: ["Constituição", "Livre"], trainedSkills: ["Saber (Ossário)"], grants: ["Duro de Matar", "Saber Adicional (Ossário)"] },
    en: { abilityBoostRules: ["Constitution", "Free"], trainedSkills: ["Boneyard Lore"], grants: ["Diehard", "Additional Lore (Boneyard)"] },
    es: { abilityBoostRules: ["Constitución", "Libre"], trainedSkills: ["Saber del Ossario"], grants: ["Duro de matar", "Saber adicional (Osario)"] }
  }
};
for (const record of PLAYER_CORE_2_RARE_BACKGROUNDS) {
  const slug = String(record.id).split(".").pop();
  if (slug && PLAYER_CORE_2_RARE_BACKGROUND_MECHANICS[slug]) record.mechanics = PLAYER_CORE_2_RARE_BACKGROUND_MECHANICS[slug];
}
for (const record of PLAYER_CORE_2_RARE_BACKGROUNDS) {
  if (!(PF2E_DATA.backgrounds || []).some((candidate) => candidate.id === record.id)) PF2E_DATA.backgrounds.push(record);
}

// Player Core 2, biografias comuns (pp. 50–51). A seção e os títulos foram
// conferidos no PDF local; a mecânica individual permanece marcada para revisão
// até a transcrição completa dos blocos de cada biografia.
const PLAYER_CORE_2_COMMON_BACKGROUNDS = [
  ["ward", "Tutelado", "Ward", "Protegido", 50, ["Constituição", "Carisma"], "performance", "Saber de Genealogia", "Performance Fascinante"],
  ["driver", "Condutor", "Driver", "Conductor", 50, ["Força", "Destreza"], "acrobatics", "Saber de Pilotagem", "Certeza"],
  ["barber", "Barbeiro", "Barber", "Barbero", 50, ["Destreza", "Sabedoria"], "medicine", "Saber de Cirurgia", "Cirurgia Arriscada"],
  ["accountant", "Contador", "Accountant", "Contable", 50, ["Inteligência", "Sabedoria"], "society", "Saber de Contabilidade", "Subitizar"],
  ["scavenger", "Catador", "Scavenger", "Recogedor", 50, ["Inteligência", "Sabedoria"], "society", "Saber do Assentamento", "Forrageador"],
  ["servant", "Criado", "Servant", "Sirviente", 50, ["Destreza", "Carisma"], "society", "Saber de Trabalho", "Leitura Labial"],
  ["tax_collector", "Coletor de Impostos", "Tax Collector", "Recaudador de impuestos", 50, ["Força", "Carisma"], "intimidation", "Saber do Assentamento", "Coerção Rápida"],
  ["squire", "Escudeiro", "Squire", "Escudero", 51, ["Força", "Constituição"], "society", "Saber de Heráldica ou Guerra", "Assistente de Armadura"],
  ["forerunner", "Precursor", "Forerunner", "Precursor", 51, ["Constituição", "Sabedoria"], "nature", "Saber de Planícies", "Cavaleiro Expresso"],
  ["refugee", "Refugiado", "Refugee", "Refugiado", 51, ["Constituição", "Sabedoria"], "society", "Saber do Assentamento de Origem", "Manha das Ruas"],
  ["insurgent", "Insurgente", "Insurgent", "Insurgente", 51, ["Força", "Sabedoria"], "deception", "Saber de Guerra", "Distração Prolongada"],
  ["hedge_wizard", "Mandingueiro", "Hedge Wizard", "Mago de seto", 51, ["Inteligência", "Sabedoria"], "occultism", "Saber de Herbalismo", "Magia das Raízes"],
  ["messenger", "Mensageiro", "Messenger", "Mensajero", 51, ["Destreza", "Inteligência"], "society", "Saber da Cidade de Origem", "Olhar Conteúdo"],
  ["pilgrim", "Peregrino", "Pilgrim", "Peregrino", 51, ["Sabedoria", "Carisma"], "religion", "Saber da Divindade Patrona", "Amuleto do Peregrino"]
].map(([id, pt, en, es, page, ability, skill, lore, feat]) => ({
  id: `background.player_core_2.common.${id}`,
  name: `${pt} (${en})`,
  page,
  ability,
  skill,
  lore,
  feat,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Biografia comum do Player Core 2 (p. ${page}); efeito mecânico completo pendente de revisão.`,
    en: `Common Player Core 2 background (p. ${page}); full mechanical text pending review.`,
    es: `Trasfondo común de Player Core 2 (p. ${page}); texto mecánico completo pendiente de revisión.`
  },
  description: `Biografia comum do Player Core 2: ${pt}.`,
  rarity: "common",
  source: { book: PLAYER_CORE_2_SOURCE, page },
  sourceApproximate: true,
  ruleset: "remaster",
  needs_review: true
}));
for (const record of PLAYER_CORE_2_COMMON_BACKGROUNDS) {
  // Edições diferentes podem compartilhar o mesmo nome; IDs e fontes
  // distintos devem continuar disponíveis no compêndio.
  const duplicate = (PF2E_DATA.backgrounds || []).some((candidate) => candidate.id === record.id);
  if (!duplicate) PF2E_DATA.backgrounds.push(record);
}

// Player Core 2, pp. 240–255: índice de magias. Os blocos abaixo preservam
// ranque, tradições e a página da seção enquanto os efeitos individuais são
// revisados no texto integral. Não substitua uma magia já catalogada por uma
// cópia provisória: a guarda por nome mantém a identidade rica existente.
const PLAYER_CORE_2_SPELL_INDEX = [
  ["ansias_de_carnical", "Ânsias de Carníçal", "Carnivore's Craving", "Ansias de carnívoro", 2, 240, ["divine", "occult"]],
  ["arma_do_julgamento", "Arma do Julgamento", "Weapon of Judgment", "Arma del juicio", 9, 240, ["divine"]],
  ["arvore_protetora", "Árvore Protetora", "Protective Tree", "Árbol protector", 1, 241, ["primal"]],
  ["bolha_na_pele", "Bolha na Pele", "Skin Bubble", "Burbuja en la piel", 5, 241, ["arcane", "occult", "primal"]],
  ["aspecto_triplo", "Aspecto Triplo", "Triple Form", "Aspecto triple", 3, 241, ["occult", "primal"]],
  ["cancao_espiritual", "Canção Espiritual", "Spiritual Song", "Canción espiritual", 8, 241, ["divine", "occult"]],
  ["ataque_animado", "Ataque Animado", "Animated Assault", "Asalto animado", 2, 241, ["arcane", "occult"]],
  ["cascata_sagrada", "Cascata Sagrada", "Sacred Cascade", "Cascada sagrada", 4, 241, ["divine"]],
  ["confinamento", "Confinamento", "Detainment", "Confinamiento", 4, 242, ["arcane", "divine", "occult"]],
  ["cobertor_de_estrelas", "Cobertor de Estrelas", "Blanket of Stars", "Manta de estrellas", 6, 242, ["occult", "primal"]],
  ["conselho_onirico", "Conselho Onírico", "Dream Council", "Consejo onírico", 8, 242, ["arcane", "occult"]],
  ["cofre_imaginario", "Cofre Imaginário", "Imaginary Vault", "Bóveda imaginaria", 5, 242, ["arcane", "occult"]],
  ["convocar_servo_menor", "Convocar Servo Menor", "Summon Lesser Servitor", "Convocar sirviente menor", 1, 242, ["divine"]],
  ["cone_gelido", "Cone Gélido", "Chilling Cone", "Cono gélido", 1, 242, ["arcane", "primal"]],
  ["crescimentos_macabros", "Crescimentos Macabros", "Macabre Growths", "Crecimientos macabros", 5, 243, ["arcane", "primal"]],
  ["cores_desconcertantes", "Cores Desconcertantes", "Dazzling Colors", "Colores desconcertantes", 8, 243, ["arcane", "occult"]],
  ["dama_vampirica", "Dama Vampírica", "Vampiric Maiden", "Dama vampírica", 4, 243, ["arcane", "divine", "occult"]],
  ["deja_vu", "Déjà Vu", "Déjà Vu", "Déjà vu", 1, 243, ["arcane", "occult"]],
  ["desmontar", "Desmontar", "Disassemble", "Desmontar", 2, 244, ["arcane", "primal"]],
  ["despertar_esqueletos", "Despertar Esqueletos", "Awaken Skeletons", "Despertar esqueletos", 3, 244, ["arcane", "divine", "occult"]],
  ["drenar_cores", "Drenar Cores", "Drain Color", "Drenar colores", 4, 244, ["occult"]],
  ["embotar_ambicao", "Embotar Ambição", "Dull Ambition", "Embotar ambición", 4, 244, ["arcane", "divine", "occult"]],
  ["encolher_item", "Encolher Item", "Shrink Item", "Encoger objeto", 3, 244, ["arcane"]],
  ["epidemia_espiritual", "Epidemia Espiritual", "Spiritual Epidemic", "Epidemia espiritual", 8, 244, ["divine", "occult"]],
  ["esmorecimento_subito", "Esmorecimento Súbito", "Sudden Blight", "Decaimiento repentino", 2, 245, ["divine", "primal"]],
  ["exigencia_telepatica", "Exigência Telepática", "Telepathic Demand", "Exigencia telepática", 9, 245, ["arcane", "occult"]],
  ["fingir_de_morto", "Fingir de Morto", "Feign Death", "Fingir la muerte", 5, 245, ["arcane", "divine", "occult"]],
  ["forma_sagrada", "Forma Sagrada", "Holy Form", "Forma sagrada", 6, 245, ["divine"]],
  ["fosso_de_lama", "Fosso de Lama", "Mud Pit", "Foso de lodo", 1, 246, ["arcane", "primal"]],
  ["furor_cegante", "Furor Cegante", "Blinding Fury", "Furia cegadora", 6, 246, ["divine", "occult", "primal"]],
  ["geometria_estranha", "Geometria Estranha", "Strange Geometry", "Geometría extraña", 5, 246, ["occult"]],
  ["gravar_mensagem", "Gravar Mensagem", "Record Message", "Grabar mensaje", 1, 246, ["occult"]],
  ["impulso_caridoso", "Impulso Caridoso", "Charitable Urge", "Impulso caritativo", 2, 246, ["arcane", "divine", "occult"]],
  ["insultos_abrasadores", "Insultos Abrasadores", "Scorching Insults", "Insultos abrasadores", 2, 247, ["occult"]],
  ["infestacao_fungica", "Infestação Fúngica", "Fungal Infestation", "Infestación fúngica", 2, 247, ["primal"]],
  ["inimizade_da_natureza", "Inimizade da Natureza", "Nature's Enmity", "Enemistad de la naturaleza", 9, 247, ["primal"]],
  ["invisibilidade_compartilhada", "Invisibilidade Compartilhada", "Shared Invisibility", "Invisibilidad compartida", 3, 247, ["arcane", "occult"]],
  ["item_invisivel", "Item Invisível", "Invisible Item", "Objeto invisible", 1, 247, ["arcane", "occult"]],
  ["jaula_verdejante", "Jaula Verdejante", "Verdant Cage", "Jaula verdosa", 7, 248, ["arcane", "primal"]],
  ["lodo_corrosivo", "Lodo Corrosivo", "Corrosive Mud", "Lodo corrosivo", 5, 248, ["arcane", "primal"]],
  ["lanterna_do_ceifador", "Lanterna do Ceifador", "Reaper's Lantern", "Linterna del segador", 2, 248, ["divine", "occult", "primal"]],
  ["ler_objeto", "Ler Objeto", "Read Object", "Leer objeto", 1, 248, ["occult"]],
  ["maldicao_bestial", "Maldição Bestial", "Bestial Curse", "Maldición bestial", 4, 248, ["arcane", "occult", "primal"]],
  ["maldicao_do_tempo_perdido", "Maldição do Tempo Perdido", "Curse of Lost Time", "Maldición del tiempo perdido", 3, 249, ["arcane", "occult", "primal"]],
  ["mansao_resplandecente", "Mansão Resplandecente", "Resplendent Mansion", "Mansión resplandeciente", 9, 249, ["arcane", "occult"]],
  ["manada_primal", "Manada Primal", "Primal Herd", "Manada primordial", 10, 249, ["primal"]],
  ["manto_de_cores", "Manto de Cores", "Cloak of Colors", "Manto de colores", 5, 249, ["arcane", "occult"]],
  ["muralha_de_carne", "Muralha de Carne", "Wall of Flesh", "Muro de carne", 5, 249, ["divine", "occult", "primal"]],
  ["olhos_incontaveis", "Olhos Incontáveis", "Countless Eyes", "Ojos incontables", 4, 250, ["arcane", "occult", "primal"]],
  ["onda_destruidora", "Onda Destruidora", "Destructive Wave", "Onda destructiva", 3, 251, ["arcane", "primal"]],
  ["orientacao_do_andarilho", "Orientação do Andarilho", "Wayfinder's Guidance", "Guía del caminante", 3, 251, ["divine", "occult"]],
  ["poco_gravitacional", "Poço Gravitacional", "Gravitational Well", "Pozo gravitacional", 3, 251, ["arcane", "occult"]],
  ["passos_plumbeos", "Passos Plúmbeos", "Leaden Steps", "Pasos de plomo", 1, 251, ["arcane", "primal"]],
  ["presente_prestativo", "Presente Prestativo", "Helpful Gift", "Regalo servicial", 1, 251, ["arcane", "divine", "occult"]],
  ["rebater_magia", "Rebater Magia", "Reflect Spell", "Rebotar conjuro", 7, 251, ["arcane", "divine", "occult"]],
  ["pele_de_camaleao", "Pele de Camaleão", "Chameleon Skin", "Piel de camaleón", 5, 251, ["primal"]],
  ["rosto_do_familiar", "Rosto do Familiar", "Familiar's Face", "Rostro del familiar", 3, 251, ["arcane", "divine", "occult", "primal"]],
  ["sinestesia", "Sinestesia", "Synesthesia", "Sinestesia", 5, 252, ["occult"]],
  ["sacrificio_final", "Sacrifício Final", "Final Sacrifice", "Sacrificio final", 2, 252, ["arcane", "divine", "occult", "primal"]],
  ["salvaguarda_cintilante", "Salvaguarda Cintilante", "Glittering Safeguard", "Salvaguarda centelleante", 6, 252, ["divine", "occult", "primal"]],
  ["schadenfreude", "Schadenfreude", "Schadenfreude", "Schadenfreude", 1, 252, ["arcane", "occult"]],
  ["selar_destino", "Selar Destino", "Seal Fate", "Sellar el destino", 4, 252, ["arcane", "divine", "occult"]],
  ["sentir_espiritos", "Sentir Espíritos", "Sense Spirits", "Sentir espíritus", 2, 252, ["divine", "occult"]],
  ["solo_consagrado", "Solo Consagrado", "Consecrated Ground", "Suelo consagrado", 3, 253, ["divine"]],
  ["sussurros_eversivos", "Sussurros Eversivos", "Eversive Whispers", "Susurros eversivos", 4, 253, ["divine", "occult"]],
  ["teia", "Teia", "Web", "Telaraña", 2, 253, ["arcane", "primal"]],
  ["tempestade_de_gelo", "Tempestade de Gelo", "Ice Storm", "Tormenta de hielo", 4, 254, ["arcane", "primal"]],
  ["tempestade_de_relampagos", "Tempestade de Relâmpagos", "Lightning Storm", "Tormenta de relámpagos", 5, 254, ["primal"]],
  ["tesouro_fantasmagorico", "Tesouro Fantasmagórico", "Ghostly Treasure", "Tesoro fantasmagórico", 2, 254, ["arcane", "occult"]],
  ["tragedia_fantasmagorica", "Tragédia Fantasmagórica", "Ghostly Tragedy", "Tragedia fantasmagórica", 4, 254, ["divine", "occult"]],
  ["transporte_mistico", "Transporte Místico", "Mystic Transport", "Transporte místico", 1, 254, ["arcane", "occult"]],
  ["transposicao_coletiva", "Transposição Coletiva", "Collective Transposition", "Transposición colectiva", 6, 255, ["arcane", "occult"]],
  ["visao_animal", "Visão Animal", "Animal Vision", "Visión animal", 3, 255, ["primal"]],
  ["vapores_nocivos", "Vapores Nocivos", "Noxious Vapors", "Vapores nocivos", 1, 255, ["arcane", "primal"]],
  ["visoes_de_perigo", "Visões de Perigo", "Visions of Danger", "Visiones de peligro", 7, 255, ["occult"]],
  ["vomitar_enxame", "Vomitar Enxame", "Swarm Vomit", "Vomitar enjambre", 2, 255, ["arcane", "occult", "primal"]]
];
const normalizeSpellIndexName = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
for (const [slug, pt, en, es, rank, page, traditions] of PLAYER_CORE_2_SPELL_INDEX) {
  const alreadyExists = (PF2E_DATA.spells || []).some((spell) => [spell.name, ...Object.values(spell.names || {})].some((name) => normalizeSpellIndexName(name) === normalizeSpellIndexName(pt)));
  if (alreadyExists) continue;
  PF2E_DATA.spells.push({
    id: `spell.player_core_2.${slug}`,
    name: `${pt} (${en})`,
    rank,
    traditions,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Magia do Player Core 2 (p. ${page}); efeito mecânico completo pendente de revisão.`,
      en: `Player Core 2 spell (p. ${page}); full mechanical text pending review.`,
      es: `Conjuro del Player Core 2 (p. ${page}); texto mecánico completo pendiente de revisión.`
    },
    source: { book: PLAYER_CORE_2_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true
  });
}

// Segredos da Magia é uma fonte oficial pré-Remaster. Registros vinculados a ela
// são confirmados como legacy, e não confundidos com opções ainda não revisadas.
const SECRETS_OF_MAGIC_SOURCE = "Segredos da Magia (pré-Remaster)";
const SECRETS_OF_MAGIC_CLASSES = {
  "Convocador (Summoner)": { id: "class.summoner", page: 34, names: { "pt-BR": "Convocador", en: "Summoner", es: "Convocador" }, summaries: { "pt-BR": "Conjurador ligado a um eidolon com o qual compartilha ações e força vital.", en: "A spellcaster bound to an eidolon with whom they share actions and life force.", es: "Un lanzador ligado a un eidolon con el que comparte acciones y fuerza vital." } },
  "Magus": { id: "class.magus", page: 58, names: { "pt-BR": "Magus", en: "Magus", es: "Magus" }, summaries: { "pt-BR": "Combatente arcano que combina golpes físicos e magias por meio do Golpe de Magia.", en: "An arcane combatant who combines physical strikes and spells through Spellstrike.", es: "Un combatiente arcano que combina ataques físicos y conjuros mediante Golpe de conjuro." } }
};

const SECRETS_OF_MAGIC_BACKGROUNDS = [
  { id: "background.astrologer", name: "Astrólogo (Astrologer)", page: 28, ability: ["Inteligência", "Sabedoria"], skill: "occultism", lore: "Saber de Astrologia", feat: "Identificar Estranhezas", rarity: "common", names: { "pt-BR": "Astrólogo", en: "Astrologer", es: "Astrólogo" }, summaries: { "pt-BR": "Você estudou os movimentos celestes para interpretar sinais e orientar caminhos.", en: "You studied celestial movements to interpret signs and guide your path.", es: "Estudiaste los movimientos celestes para interpretar señales y orientar tu camino." } },
  { id: "background.occult_librarian", name: "Bibliotecário Ocultista (Occult Librarian)", page: 28, ability: ["Inteligência", "Sabedoria"], skill: "occultism", lore: "Saber Acadêmico", feat: "Instruído em Segredos", rarity: "common", names: { "pt-BR": "Bibliotecário Ocultista", en: "Occult Librarian", es: "Bibliotecario ocultista" }, summaries: { "pt-BR": "O estudo de compêndios raros treinou você nos mistérios do ocultismo.", en: "Studying rare compendiums trained you in the mysteries of occultism.", es: "El estudio de compendios raros te formó en los misterios del ocultismo." } },
  { id: "background.eidolon_contact", name: "Contato de Eidolon (Eidolon Contact)", page: 28, ability: ["Constituição", "Carisma"], skill: "magical tradition", lore: "Saber da criatura do eidolon", feat: "Conhecimento Duvidoso", rarity: "common", names: { "pt-BR": "Contato de Eidolon", en: "Eidolon Contact", es: "Contacto de eidolon" }, summaries: { "pt-BR": "Um encontro com um eidolon deixou lembranças e conhecimentos mágicos duradouros.", en: "An encounter with an eidolon left lasting memories and magical knowledge.", es: "Un encuentro con un eidolon dejó recuerdos y conocimientos mágicos duraderos." } },
  { id: "background.magical_misfit", name: "Desajustado Mágico (Magical Misfit)", page: 28, ability: ["Inteligência", "Destreza"], skill: "arcana", lore: "Saber de Submundo", feat: "Enganar Item Mágico", rarity: "common", names: { "pt-BR": "Desajustado Mágico", en: "Magical Misfit", es: "Inadaptado mágico" }, summaries: { "pt-BR": "Você aprendeu a usar magia para provocar confusão e escapar das consequências.", en: "You learned to use magic to cause trouble and escape the consequences.", es: "Aprendiste a usar la magia para causar problemas y escapar de las consecuencias." } },
  { id: "background.academy_dropout", name: "Desistente da Academia (Academy Dropout)", page: 29, ability: ["Inteligência", "Carisma"], skill: "arcana", lore: "Saber Acadêmico", feat: "Conhecimento Duvidoso", rarity: "common", names: { "pt-BR": "Desistente da Academia", en: "Academy Dropout", es: "Desertor de la academia" }, summaries: { "pt-BR": "Sua passagem interrompida por uma academia mágica ainda molda sua vida.", en: "Your interrupted time at a magical academy still shapes your life.", es: "Tu paso interrumpido por una academia mágica aún moldea tu vida." } },
  { id: "background.plant_whisperer", name: "Encantador de Plantas (Plant Whisperer)", page: 29, ability: ["Sabedoria", "Carisma"], skill: "nature", lore: "Saber de Plantas", feat: "Medicina Natural", rarity: "common", names: { "pt-BR": "Encantador de Plantas", en: "Plant Whisperer", es: "Encantador de plantas" }, summaries: { "pt-BR": "Sua afinidade excepcional com plantas beira o sobrenatural.", en: "Your exceptional affinity with plants borders on the supernatural.", es: "Tu afinidad excepcional con las plantas roza lo sobrenatural." } },
  { id: "background.magic_student", name: "Estudante de Magia (Magic Student)", page: 29, ability: ["Inteligência", "Sabedoria"], skill: "magical tradition", lore: "Saber Acadêmico", feat: "Reconhecer Magia", rarity: "common", names: { "pt-BR": "Estudante de Magia", en: "Magic Student", es: "Estudiante de magia" }, summaries: { "pt-BR": "Você concilia aventuras com os estudos formais de uma tradição mágica.", en: "You balance adventuring with formal study of a magical tradition.", es: "Compaginas las aventuras con el estudio formal de una tradición mágica." } },
  { id: "background.false_medium", name: "Falso Médium (False Medium)", page: 29, ability: ["Inteligência", "Carisma"], skill: "occultism", lore: "Saber de Vidência", feat: "Adoração Enganosa", rarity: "common", names: { "pt-BR": "Falso Médium", en: "False Medium", es: "Falso médium" }, summaries: { "pt-BR": "Técnicas de leitura fria e ocultismo sustentaram suas sessões fraudulentas.", en: "Cold-reading techniques and occult lore supported your fraudulent séances.", es: "Técnicas de lectura en frío y ocultismo sostuvieron tus sesiones fraudulentas." } },
  { id: "background.magical_merchant", name: "Mercador Mágico (Magical Merchant)", page: 29, ability: ["Inteligência", "Sabedoria"], skill: "crafting", lore: "Saber de Mercadores", feat: "Avaliação do Artesão", rarity: "common", names: { "pt-BR": "Mercador Mágico", en: "Magical Merchant", es: "Mercader mágico" }, summaries: { "pt-BR": "O comércio de itens mágicos ensinou você a avaliar mercadorias raras.", en: "Trading magic items taught you how to appraise rare merchandise.", es: "El comercio de objetos mágicos te enseñó a valorar mercancías raras." } },
  { id: "background.street_preacher", name: "Pregador das Ruas (Street Preacher)", page: 29, ability: ["Sabedoria", "Carisma"], skill: "religion", lore: "Saber da Divindade", feat: "Conhecimento Duvidoso", rarity: "common", names: { "pt-BR": "Pregador das Ruas", en: "Street Preacher", es: "Predicador callejero" }, summaries: { "pt-BR": "Você levou a palavra de sua divindade diretamente às ruas e estradas.", en: "You carried your deity's word directly to streets and roads.", es: "Llevaste la palabra de tu deidad directamente a calles y caminos." } },
  { id: "background.musical_prodigy", name: "Prodígio Musical (Musical Prodigy)", page: 29, ability: ["Destreza", "Carisma"], skill: "performance", lore: "Saber de Música", feat: "Artista Virtuoso", rarity: "common", names: { "pt-BR": "Prodígio Musical", en: "Musical Prodigy", es: "Prodigio musical" }, summaries: { "pt-BR": "Seu talento musical extraordinário surgiu muito antes da vida de aventureiro.", en: "Your extraordinary musical talent appeared long before your adventuring life.", es: "Tu extraordinario talento musical apareció mucho antes de tu vida aventurera." } },
  { id: "background.genie_blessed", name: "Abençoado por Gênio (Genie-Blessed)", page: 30, ability: ["Carisma"], skill: "diplomacy", lore: "Saber de Gênios", feat: "Desejo de Sorte", rarity: "rare", names: { "pt-BR": "Abençoado por Gênio", en: "Genie-Blessed", es: "Bendecido por un genio" }, summaries: { "pt-BR": "A bênção de um gênio poderoso concedeu a você uma sorte mágica incomum.", en: "A powerful genie's blessing granted you unusual magical luck.", es: "La bendición de un genio poderoso te concedió una suerte mágica inusual." } },
  { id: "background.anti_magical", name: "Anti-Mágico (Anti-Magical)", page: 30, ability: ["Constituição", "Sabedoria"], skill: "nonmagical lore", lore: "Saber não mágico", feat: "Interferência Antimágica", rarity: "rare", names: { "pt-BR": "Anti-Mágico", en: "Anti-Magical", es: "Antimágico" }, summaries: { "pt-BR": "A magia se comporta de forma instável ao seu redor, inclusive quando deveria ajudar.", en: "Magic behaves unpredictably around you, even when it should help.", es: "La magia se comporta de forma inestable a tu alrededor, incluso cuando debería ayudarte." } },
  { id: "background.song_of_the_deep", name: "Canção das Profundezas (Song of the Deep)", page: 30, ability: ["Força", "Constituição", "Carisma"], skill: "athletics", lore: "Saber de Oceanos", feat: "Respirar na Água", rarity: "rare", names: { "pt-BR": "Canção das Profundezas", en: "Song of the Deep", es: "Canción de las profundidades" }, summaries: { "pt-BR": "Um resgate sobrenatural no mar deixou você capaz de respirar sob a água.", en: "A supernatural rescue at sea left you able to breathe underwater.", es: "Un rescate sobrenatural en el mar te dejó capaz de respirar bajo el agua." } },
  { id: "background.chosen_one", name: "Escolhido (Chosen One)", page: 30, ability: ["Força", "Carisma"], skill: "prophecy-related", lore: "Saber de Vidência", feat: "Peão da Profecia", rarity: "rare", names: { "pt-BR": "Escolhido", en: "Chosen One", es: "Elegido" }, summaries: { "pt-BR": "Seu nascimento cumpriu uma profecia que ainda pressiona suas decisões.", en: "Your birth fulfilled a prophecy that still weighs on your decisions.", es: "Tu nacimiento cumplió una profecía que aún pesa sobre tus decisiones." } },
  { id: "background.magical_experiment", name: "Experimento Mágico (Magical Experiment)", page: 31, ability: ["Constituição"], skill: "occultism", lore: "Saber Acadêmico", feat: "Alteração Experimental", rarity: "rare", names: { "pt-BR": "Experimento Mágico", en: "Magical Experiment", es: "Experimento mágico" }, summaries: { "pt-BR": "Experimentos alteraram permanentemente seu corpo e deixaram uma habilidade incomum.", en: "Experiments permanently altered your body and left an unusual ability.", es: "Experimentos alteraron tu cuerpo para siempre y dejaron una capacidad inusual." } },
  { id: "background.time_traveler", name: "Viajante do Tempo (Time Traveler)", page: 31, ability: ["Destreza", "Inteligência"], skill: "three lore skills", lore: "Três Saberes do seu tempo", feat: "Dobrar o Tempo", rarity: "rare", names: { "pt-BR": "Viajante do Tempo", en: "Time Traveler", es: "Viajero del tiempo" }, summaries: { "pt-BR": "Você chegou de outra época e carrega conhecimentos que não pertencem ao presente.", en: "You arrived from another era and carry knowledge that does not belong to the present.", es: "Llegaste de otra época y llevas conocimientos que no pertenecen al presente." } },
  { id: "background.seer_of_the_dead", name: "Vidente dos Mortos (Seer of the Dead)", page: 31, ability: ["Constituição", "Sabedoria"], skill: "religion", lore: "Saber de Mortos-Vivos", feat: "Sentir Espíritos", rarity: "rare", names: { "pt-BR": "Vidente dos Mortos", en: "Seer of the Dead", es: "Vidente de los muertos" }, summaries: { "pt-BR": "Você percebe e conversa com espíritos que já partiram do mundo dos vivos.", en: "You perceive and speak with spirits that have left the world of the living.", es: "Percibes y hablas con espíritus que abandonaron el mundo de los vivos." } }
];

Object.entries(SECRETS_OF_MAGIC_CLASSES).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: SECRETS_OF_MAGIC_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});
SECRETS_OF_MAGIC_BACKGROUNDS.forEach((record) => {
  PF2E_DATA.backgrounds.push({ ...record, source: { book: SECRETS_OF_MAGIC_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});

const GUNS_GEARS_SOURCE = "Pólvora e Engrenagens (pré-Remaster)";
const GUNS_GEARS_CATALOG = {
  ancestries: {
    "Autômato (Automaton)": { id: "ancestry.automaton", page: 36, names: { "pt-BR": "Autômato", en: "Automaton", es: "Autómata" }, summaries: { "pt-BR": "Constructo consciente criado no antigo Império Jistka e sustentado por uma alma viva.", en: "A sentient construct created in the ancient Jistka Imperium and sustained by a living soul.", es: "Un constructo consciente creado en el antiguo Imperio Jistka y sostenido por un alma viva." } }
  },
  classes: {
    "Inventor": { id: "class.inventor", page: 14, names: { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" }, summaries: { "pt-BR": "Especialista em Manufatura que combate usando uma inovação única e continuamente aprimorada.", en: "A Crafting expert who fights with a unique innovation that is continually improved.", es: "Un experto en Artesanía que combate con una innovación única y mejorada continuamente." } },
    "Pistoleiro (Gunslinger)": { id: "class.gunslinger", page: 104, names: { "pt-BR": "Pistoleiro", en: "Gunslinger", es: "Pistolero" }, summaries: { "pt-BR": "Combatente de precisão especializado em armas de fogo, bestas, recarga e posicionamento.", en: "A precision combatant specializing in firearms, crossbows, reloading, and positioning.", es: "Un combatiente de precisión especializado en armas de fuego, ballestas, recarga y posicionamiento." } }
  }
};

const GUNS_GEARS_BACKGROUNDS = [
  ["anti_technology_activist", "Ativista Anti-Tecnologia", "Anti-Technology Activist", "Activista antitecnología", ["Constituição", "Carisma"], "intimidation", "Saber (Guildas)", "Coagir Grupo", 45],
  ["decoder", "Decodificador", "Decoder", "Descifrador", ["Sabedoria", "Carisma"], "society", "Saber (Criptografia)", "Olhar Atento", 45],
  ["gear_disciple", "Discípulo da Engrenagem", "Gear Disciple", "Discípulo de los engranajes", ["Sabedoria", "Carisma"], "crafting", "Saber (Divindade)", "Reparo Rápido", 45],
  ["medicinal_engineer", "Engenheiro Medicinal", "Medicinal Engineer", "Ingeniero medicinal", ["Sabedoria", "Carisma"], "medicine", "Saber (Engenharia)", "Cirurgia Arriscada", 45],
  ["toy_maker", "Fabricante de Brinquedos", "Toy Maker", "Fabricante de juguetes", ["Inteligência", "Carisma"], "crafting", "Saber (Mercantilismo)", "Especialidade de Manufatura", 46],
  ["gear_warrior", "Guerreiro Engrenário", "Gear Warrior", "Guerrero de engranajes", ["Inteligência", "Carisma"], "crafting", "Saber (Gladiatorial)", "Profissional Experiente", 46],
  ["printer", "Impressor", "Printer", "Impresor", ["Inteligência", "Carisma"], "society", "Saber (Quirografia)", "Poliglota", 46],
  ["watched_thief", "Ladrão Vigiado", "Watched Thief", "Ladrón vigilado", ["Destreza", "Sabedoria"], "thievery", "Saber (Submundo)", "Punga", 46],
  ["mechanic", "Mecânico", "Mechanic", "Mecánico", ["Força", "Inteligência"], "crafting", "Saber (Engenharia)", "Reparo Rápido", 46],
  ["driver", "Motorista", "Driver", "Conductor", ["Força", "Destreza"], "acrobatics", "Saber (Pilotagem)", "Certeza para Saber (Pilotagem)", 46],
  ["gear_researcher", "Pesquisador das Engrenagens", "Gear Researcher", "Investigador de engranajes", ["Destreza", "Inteligência"], "society", "Saber (Engenharia)", "Subitizar", 46],
  ["saboteur", "Sabotador", "Saboteur", "Saboteador", ["Força", "Destreza"], "thievery", "Saber (Engenharia)", "Malabarismo Dissimulado", 46],
  ["scrapper", "Sucateiro", "Scrapper", "Chatarrero", ["Força", "Sabedoria"], "athletics", "Saber (Terreno)", "Carregador Robusto", 46]
].map(([id, pt, en, es, ability, skill, lore, feat, page]) => ({
  id: `background.guns_gears.${id}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Antecedente de Pólvora e Engrenagens ligado a ${String(lore).replace(/^Saber \((.*)\)$/, "Saber de $1")}; o texto mecânico detalhado deve ser conferido na fonte.`,
    en: `Guns & Gears background trained in ${skill} and a related lore; confirm the full mechanical text in the source.`,
    es: `Trasfondo de Guns & Gears entrenado en ${skill} y un saber relacionado; confirma el texto mecánico completo en la fuente.`
  },
  ability,
  skill,
  lore,
  feat,
  description: `Antecedente de Pólvora e Engrenagens: ${pt}.`,
  source: { book: GUNS_GEARS_SOURCE, page },
  ruleset: "legacy",
  needs_review: true
}));
const GUNS_GEARS_RARE_BACKGROUNDS = [
  ["technology_dependent", "Dependente de Tecnologia", "Technology Dependent", "Dependiente de la tecnología", ["Constituição", "Inteligência"], "crafting", "medicine", "Medicina de Batalha", 47,
    "Seu corpo não tolera mais magia de cura e você depende de dispositivos e engenhosidade.", "Your body no longer tolerates magical healing, so you rely on devices and ingenuity.", "Tu cuerpo ya no tolera la curación mágica, así que dependes de dispositivos e ingenio."],
  ["discarded_duplicate", "Duplicata Descartada", "Discarded Duplicate", "Duplicado descartado", ["Livre", "Livre", "Livre"], "society", "identity lore", "—", 47,
    "Você foi criado para substituir alguém importante e agora explora um mundo que o deixou para trás.", "You were created to replace someone important and now explore a world that left you behind.", "Fuiste creado para reemplazar a alguien importante y ahora exploras un mundo que te dejó atrás."],
  ["saved_by_gears", "Salvo pelas Engrenagens", "Saved by Gears", "Salvado por los engranajes", ["Força", "Inteligência"], "crafting", "—", "—", 48,
    "Uma prótese mecânica substitui parte do seu corpo e exige manutenção regular.", "A mechanical prosthesis replaces part of your body and requires regular maintenance.", "Una prótesis mecánica reemplaza parte de tu cuerpo y requiere mantenimiento regular."],
  ["mechanical_symbiosis", "Simbiose Mecânica", "Mechanical Symbiosis", "Simbiosis mecánica", ["Sabedoria", "Carisma"], "arcana", "entity lore", "—", 48,
    "Uma entidade vive em um objeto maquinal preso ao seu corpo e às suas decisões.", "An entity lives within a mechanical object attached to your body and choices.", "Una entidad vive en un objeto mecánico unido a tu cuerpo y tus decisiones."],
  ["desired_life", "Vida Desejada", "Desired Life", "Vida deseada", ["Constituição", "Carisma"], "diplomacy", "—", "—", 48,
    "Você foi um constructo ou boneco inanimado que ganhou vida por causa de um desejo profundo.", "You were once an inanimate construct or doll who gained life through a profound wish.", "Antes eras un constructo o muñeco inanimado que cobró vida por un deseo profundo."]
].map(([id, pt, en, es, ability, skill, lore, feat, page, ptSummary, enSummary, esSummary]) => ({
  id: `background.guns_gears.rare.${id}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  ability,
  skill,
  lore,
  feat,
  description: ptSummary,
  source: { book: GUNS_GEARS_SOURCE, page },
  ruleset: "legacy",
  rarity: "rare",
  rareSelection: true,
  needs_review: true
}));
GUNS_GEARS_RARE_BACKGROUNDS.forEach((record) => PF2E_DATA.backgrounds.push(record));
GUNS_GEARS_BACKGROUNDS.forEach((record) => PF2E_DATA.backgrounds.push(record));

Object.entries(GUNS_GEARS_CATALOG.ancestries).forEach(([name, record]) => {
  if (PF2E_DATA.ancestries[name]) Object.assign(PF2E_DATA.ancestries[name], record, { source: { book: GUNS_GEARS_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});
Object.entries(GUNS_GEARS_CATALOG.classes).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: GUNS_GEARS_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});

const GUNS_GEARS_ARCHETYPES = [
  ["archetype.inventor_multiclass", "Inventor Multiclasse", "Inventor", "Inventor", 49, ["Inteligência 14"], "Dedicação multiclasse que concede uma inovação e treinamento em Manufatura para resolver problemas com engenhosidade.", "A multiclass dedication that grants an innovation and Crafting training to solve problems with ingenuity.", "Una dedicación multiclase que concede una innovación y entrenamiento en Artesanía para resolver problemas con ingenio."],
  ["archetype.overwatch", "Vigilância", "Overwatch", "Vigilancia", 50, ["Especialista em Percepção"], "Arquétipo de observação que transforma percepção do campo de batalha em coordenação e apoio aos aliados.", "An observation archetype that turns battlefield awareness into coordination and support for allies.", "Un arquetipo de observación que convierte la percepción del campo de batalla en coordinación y apoyo a los aliados."],
  ["archetype.sterling_dynamo", "Dínamo Esterlino", "Sterling Dynamo", "Dínamo esterlino", 52, [], "Arquétipo de prótese mecânica de combate, com um dínamo personalizável que amplia as opções de combate corpo a corpo.", "A combat prosthesis archetype with a customizable dynamo that expands melee options.", "Un arquetipo de prótesis de combate con un dínamo personalizable que amplía las opciones cuerpo a cuerpo."],
  ["archetype.trapsmith", "Armadilheiro", "Trapsmith", "Armero de trampas", 54, ["Dedicação de Snarecrafter ou talento de classe de patrulheiro Especialista em Arapuca"], "Arquétipo que incorpora engrenagens e vapor à fabricação de arapucas especializadas.", "An archetype that incorporates gears and steam into the creation of specialized snares.", "Un arquetipo que incorpora engranajes y vapor a la fabricación de trampas especializadas."],
  ["archetype.trick_driver", "Condutor Audaz", "Trick Driver", "Conductor temerario", 55, [], "Arquétipo de condução que transforma veículos em ferramentas agressivas de mobilidade e combate.", "A driving archetype that turns vehicles into aggressive tools for mobility and combat.", "Un arquetipo de conducción que convierte los vehículos en herramientas agresivas de movilidad y combate."],
  ["archetype.vehicle_mechanic", "Mecânico de Veículos", "Vehicle Mechanic", "Mecánico de vehículos", 56, ["Inteligência +2", "Treinado em Manufatura"], "Arquétipo de manutenção e aprimoramento de veículos, com foco em construção, pilotagem e reparos.", "An archetype focused on maintaining and improving vehicles through construction, piloting, and repairs.", "Un arquetipo centrado en mantener y mejorar vehículos mediante construcción, pilotaje y reparaciones."],
  ["archetype.gunslinger_multiclass", "Pistoleiro Multiclasse", "Gunslinger Multiclass", "Pistolero multiclase", 127, ["Destreza 14"], "Dedicação que concede treinamento em bestas e armas de fogo e acesso a talentos de pistoleiro.", "A dedication that grants training with crossbows and firearms and access to gunslinger feats.", "Una dedicación que concede competencia con ballestas y armas de fuego y acceso a dotes de pistolero."],
  ["archetype.artillerist", "Artilheiro", "Artillerist", "Artillero", 128, ["Treinado em armas marciais"], "Arquetipo de artilharia para ataques poderosos com armas de cerco e pólvora.", "An artillery archetype for powerful attacks with siege weapons and gunpowder.", "Un arquetipo de artillería para ataques potentes con armas de asedio y pólvora."],
  ["archetype.beast_gunner", "Atirador Bestial", "Beast Gunner", "Artillero bestial", 130, ["Especialista em armas de fogo e treinado em Arcanismo ou Manufatura"], "Arquetipo mágico que combina armas bestiais, magia e treinamento em armas de fogo.", "A magical archetype combining beast guns, magic, and firearm training.", "Un arquetipo mágico que combina armas bestiales, magia y entrenamiento con armas de fuego."],
  ["archetype.bullet_dancer", "Dançarino da Bala", "Bullet Dancer", "Bailarín de la bala", 132, ["Especialista em defesa sem armadura e treinado em armas simples"], "Arquetipo marcial que usa armas de fogo com movimentos e posturas de artes marciais.", "A martial archetype that uses firearms through martial-arts movement and stances.", "Un arquetipo marcial que usa armas de fuego mediante movimientos y posturas de artes marciales."],
  ["archetype.demolitionist", "Demolidor", "Demolitionist", "Demoledor", 133, ["Treinado em Manufatura"], "Especialista em explosivos que prepara e posiciona bombas para romper estruturas.", "An explosives specialist who prepares and places bombs to breach structures.", "Un especialista en explosivos que prepara y coloca bombas para derribar estructuras."],
  ["archetype.fireworks_technician", "Técnico de Fogos de Artifício", "Firework Technician", "Técnico de fuegos artificiales", 134, ["Treinado em Manufatura"], "Arquetipo de manufatura que transforma pólvora, metais e papel em espetáculos e efeitos táticos.", "A Crafting archetype that turns powder, metal, and paper into spectacles and tactical effects.", "Un arquetipo de Artesanía que convierte pólvora, metal y papel en espectáculos y efectos tácticos."],
  ["archetype.pistol_phenom", "Fenômeno da Pistola", "Pistol Phenom", "Fenómeno de la pistola", 136, ["Treinado em Dissimulação e treinado em Performance"], "Arquetipo de pistoleiro performático que combina fintas, estilo e armas de fogo de uma mão.", "A performative gunslinger archetype combining feints, style, and one-handed firearms.", "Un arquetipo de pistolero performático que combina fintas, estilo y armas de fuego de una mano."],
  ["archetype.dueling_pair", "Dupla de Precisão", "Sniping Duo", "Dúo de francotiradores", 138, ["Treinado em Furtividade e em arcos ou armas de fogo"], "Arquetipo de cooperação entre atirador e observador para coordenar tiros e abrir brechas.", "A cooperative archetype for a shooter and spotter who coordinate attacks and openings.", "Un arquetipo cooperativo para un tirador y un observador que coordinan ataques y oportunidades."]
];
for (const [id, pt, en, es, page, prerequisites, ptSummary, enSummary, esSummary] of GUNS_GEARS_ARCHETYPES) {
  if (!(PF2E_DATA.archetypes || []).some((candidate) => candidate.id === id)) PF2E_DATA.archetypes.push({
    id, name: `${pt} (${en})`, subtype: "standard", dedicationLevel: 2, level: 2, prerequisites,
    names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    source: { book: GUNS_GEARS_SOURCE, page }, ruleset: "legacy", needs_review: false
  });
}

const DARK_ARCHIVE_SOURCE = "Dark Archive (pré-Remaster)";
const DARK_ARCHIVE_CLASSES = {
  "Psíquico (Psychic)": { id: "class.psychic", page: 8, names: { "pt-BR": "Psíquico", en: "Psychic", es: "Psíquico" }, summaries: { "pt-BR": "Conjurador ocultista que manifesta magia mental por meio de psi cantrips e amplificações.", en: "An occult spellcaster who manifests mental magic through psi cantrips and amps.", es: "Un lanzador ocultista que manifiesta magia mental mediante trucos psi y amplificaciones." } },
  "Taumaturgo (Thaumaturge)": { id: "class.thaumaturge", page: 30, names: { "pt-BR": "Taumaturgo", en: "Thaumaturge", es: "Taumaturgo" }, summaries: { "pt-BR": "Especialista carismático que explora fraquezas usando esoterismo e implementos místicos.", en: "A charismatic expert who exploits weaknesses using esoterica and mystic implements.", es: "Un experto carismático que explota debilidades mediante esoterismo e implementos místicos." } }
};

Object.entries(DARK_ARCHIVE_CLASSES).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: DARK_ARCHIVE_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});
PF2E_DATA.versatileHeritages.push({
  id: "heritage.reflection", name: "Reflexo (Reflection)", page: 119, rarity: "rare",
  description: "Duplicata independente criada por espelhos, clonagem ou magia de transformação.",
  names: { "pt-BR": "Reflexo", en: "Reflection", es: "Reflejo" },
  summaries: { "pt-BR": "Herança versátil rara para uma duplicata que busca construir identidade própria.", en: "A rare versatile heritage for a duplicate seeking to build an identity of their own.", es: "Una herencia versátil rara para un duplicado que busca construir una identidad propia." },
  source: { book: DARK_ARCHIVE_SOURCE, page: 119 }, ruleset: "legacy", needs_review: false
});

// Rage of Elements declara compatibilidade integral com Player Core, GM Core e
// Monster Core; por isso suas opções são classificadas como Remaster.
const RAGE_ELEMENTS_SOURCE = "Rage of Elements (Remaster)";
if (PF2E_DATA.classes["Cineticista (Kineticist)"]) {
  Object.assign(PF2E_DATA.classes["Cineticista (Kineticist)"], {
    id: "class.kineticist", page: 12,
    names: { "pt-BR": "Cineticista", en: "Kineticist", es: "Cinético" },
    summaries: { "pt-BR": "Canalizador de um portal cinético que molda impulsos dos seis elementos.", en: "A channeler of a kinetic gate who shapes impulses from the six elements.", es: "Un canalizador de un portal cinético que moldea impulsos de los seis elementos." },
    source: { book: RAGE_ELEMENTS_SOURCE, page: 12 }, ruleset: "remaster", needs_review: false
  });
}

[
  { id: "heritage.ardande", name: "Ardande (Wood Geniekin)", page: 46, rarity: "uncommon", names: { "pt-BR": "Ardande", en: "Ardande", es: "Ardande" }, summaries: { "pt-BR": "Herança versátil geniekin ligada à vitalidade e flexibilidade da madeira elemental.", en: "A geniekin versatile heritage tied to the vitality and flexibility of elemental wood.", es: "Una herencia versátil geniekin ligada a la vitalidad y flexibilidad de la madera elemental." } },
  { id: "heritage.talos", name: "Talos (Metal Geniekin)", page: 50, rarity: "uncommon", names: { "pt-BR": "Talos", en: "Talos", es: "Talos" }, summaries: { "pt-BR": "Herança versátil geniekin conectada ao potencial e à transformação do metal elemental.", en: "A geniekin versatile heritage connected to the potential and transformation of elemental metal.", es: "Una herencia versátil geniekin conectada con el potencial y la transformación del metal elemental." } }
].forEach((record) => PF2E_DATA.versatileHeritages.push({ ...record, description: record.summaries["pt-BR"], source: { book: RAGE_ELEMENTS_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false }));

const RAGE_ELEMENTS_BACKGROUNDS = [
  { id: "background.alloysmith", name: "Ferreiro de Ligas (Alloysmith)", page: 44, ability: ["Força", "Inteligência"], skill: "crafting", lore: "Saber do Plano do Metal", feat: "Manufatura Especializada (Ferraria)", rarity: "common", names: { "pt-BR": "Ferreiro de Ligas", en: "Alloysmith", es: "Forjador de aleaciones" }, summaries: { "pt-BR": "Você estudou metais, ligas e processos para trabalhar na fronteira da ferraria.", en: "You studied metals, alloys, and processes to work at the cutting edge of smithing.", es: "Estudiaste metales, aleaciones y procesos para trabajar en la vanguardia de la forja." } },
  { id: "background.crystal_healer", name: "Curandeiro de Cristais (Crystal Healer)", page: 44, ability: ["Sabedoria", "Carisma"], skill: "nature", lore: "Saber do Plano da Terra", feat: "Medicina Natural", rarity: "common", names: { "pt-BR": "Curandeiro de Cristais", en: "Crystal Healer", es: "Sanador de cristales" }, summaries: { "pt-BR": "Você emprega formações minerais como instrumentos naturais de cuidado e cura.", en: "You use mineral formations as natural tools for care and healing.", es: "Empleas formaciones minerales como herramientas naturales de cuidado y curación." } },
  { id: "background.deep_sea_diver", name: "Mergulhador de Águas Profundas (Deep-Sea Diver)", page: 44, ability: ["Força", "Sabedoria"], skill: "athletics", lore: "Saber do Plano da Água", feat: "Saqueador Subaquático", rarity: "common", names: { "pt-BR": "Mergulhador de Águas Profundas", en: "Deep-Sea Diver", es: "Buceador de aguas profundas" }, summaries: { "pt-BR": "Seu fascínio pelos oceanos levou você a explorar profundezas e seus segredos.", en: "Your fascination with oceans led you to explore the depths and their secrets.", es: "Tu fascinación por los océanos te llevó a explorar las profundidades y sus secretos." } },
  { id: "background.dendrologist", name: "Dendrologista (Dendrologist)", page: 44, ability: ["Inteligência", "Sabedoria"], skill: "survival", lore: "Saber do Plano da Madeira", feat: "Especialidade de Terreno (Florestas)", rarity: "common", names: { "pt-BR": "Dendrologista", en: "Dendrologist", es: "Dendrólogo" }, summaries: { "pt-BR": "O estudo de árvores e florestas conduz suas viagens por novos ambientes.", en: "The study of trees and forests guides your travels through new environments.", es: "El estudio de árboles y bosques guía tus viajes por nuevos entornos." } },
  { id: "background.fire_warden", name: "Guardião Contra Incêndios (Fire Warden)", page: 44, ability: ["Força", "Constituição"], skill: "athletics", lore: "Saber do Plano do Fogo", feat: "Controle de Respiração", rarity: "common", names: { "pt-BR": "Guardião Contra Incêndios", en: "Fire Warden", es: "Guardián contra incendios" }, summaries: { "pt-BR": "Você combateu incêndios e aprendeu a atravessar fumaça para salvar vidas.", en: "You fought fires and learned to move through smoke to save lives.", es: "Combatiste incendios y aprendiste a atravesar el humo para salvar vidas." } },
  { id: "background.sky_rider", name: "Cavaleiro dos Céus (Sky Rider)", page: 44, ability: ["Destreza", "Sabedoria"], skill: "acrobatics", lore: "Saber do Plano do Ar", feat: "Queda Felina", rarity: "common", names: { "pt-BR": "Cavaleiro dos Céus", en: "Sky Rider", es: "Jinete de los cielos" }, summaries: { "pt-BR": "Planadores e voo assistido alimentaram sua busca pela liberdade dos céus.", en: "Gliders and assisted flight fueled your pursuit of freedom in the skies.", es: "Los planeadores y el vuelo asistido alimentaron tu búsqueda de libertad en los cielos." } },
  { id: "background.concordance_researcher", name: "Pesquisador da Concordância (Concordance Researcher)", page: 44, ability: ["Inteligência", "Sabedoria"], skill: "elemental plane lore", lore: "Quatro Saberes de Planos Elementais", feat: "Pesquisa Planar", rarity: "uncommon", names: { "pt-BR": "Pesquisador da Concordância", en: "Concordance Researcher", es: "Investigador de la Concordancia" }, summaries: { "pt-BR": "A Concordância treinou você para pesquisar fenômenos e desequilíbrios planares.", en: "The Concordance trained you to research planar phenomena and imbalances.", es: "La Concordancia te formó para investigar fenómenos y desequilibrios planares." } },
  { id: "background.concordance_scout", name: "Batedor da Concordância (Concordance Scout)", page: 44, ability: ["Constituição", "Carisma"], skill: "diplomacy", lore: "Saber de um Plano Elemental", feat: "Camarada", rarity: "uncommon", names: { "pt-BR": "Batedor da Concordância", en: "Concordance Scout", es: "Explorador de la Concordancia" }, summaries: { "pt-BR": "Você localiza rumores de rupturas planares e retorna antes que o perigo aumente.", en: "You track rumors of planar breaches and return before the danger escalates.", es: "Rastreas rumores de brechas planares y regresas antes de que aumente el peligro." } },
  { id: "background.elementally_infused", name: "Infundido Elementalmente (Elementally Infused)", page: 45, ability: ["Constituição", "Carisma"], skill: "elemental plane lore", lore: "Saber do Plano Elemental escolhido", feat: "Truque Elemental Inato", rarity: "rare", names: { "pt-BR": "Infundido Elementalmente", en: "Elementally Infused", es: "Imbuido elementalmente" }, summaries: { "pt-BR": "Uma descarga planar deixou essência elemental concentrada dentro de você.", en: "A planar surge left concentrated elemental essence within you.", es: "Una descarga planar dejó esencia elemental concentrada en tu interior." } },
  { id: "background.planar_migrant", name: "Migrante Planar (Planar Migrant)", page: 45, ability: ["Destreza", "Constituição"], skill: "athletics", lore: "Saber de um Plano Elemental", feat: "Carregador Robusto e Planejador Precavido", rarity: "rare", names: { "pt-BR": "Migrante Planar", en: "Planar Migrant", es: "Migrante planar" }, summaries: { "pt-BR": "Você nasceu em um plano elemental e busca um lugar no Universo ou um caminho de volta.", en: "You were born on an elemental plane and seek a place in the Universe or a way back.", es: "Naciste en un plano elemental y buscas un lugar en el Universo o un camino de regreso." } }
];
RAGE_ELEMENTS_BACKGROUNDS.forEach((record) => PF2E_DATA.backgrounds.push({ ...record, source: { book: RAGE_ELEMENTS_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false }));

// Rage of Elements, capítulo Air Spells (pp. 70–73). Nomes, ranques,
// tradições e páginas conferidos no PDF local; efeitos completos em revisão.
const RAGE_ELEMENTS_AIR_SPELLS = [
  ["airlift", "Transporte Aéreo", "Airlift", "Transporte aéreo", 4, ["arcane", "primal"], 70, "Uma rajada de vento ergue criaturas e objetos e os conduz até um destino próximo."],
  ["blastback", "Rebote Explosivo", "Blastback", "Rebote explosivo", 3, ["arcane"], 70, "Uma onda de choque amortece sua queda e repele criaturas próximas."],
  ["cleanse_air", "Purificar Ar", "Cleanse Air", "Purificar aire", 2, ["arcane", "divine", "primal"], 70, "Purifica o ar de venenos inalados, poluição e contaminantes semelhantes."],
  ["cloud_dragons_cloak", "Manto do Dragão das Nuvens", "Cloud Dragon's Cloak", "Manto del dragón de nubes", 3, ["arcane", "primal"], 70, "Uma névoa envolve um alvo e o torna oculto contra ataques à distância."],
  ["deep_breath", "Respiração Profunda", "Deep Breath", "Respiración profunda", 1, ["arcane", "primal"], 70, "Permite prender a respiração por mais tempo, sem criar ar respirável."],
  ["gentle_breeze", "Brisa Suave", "Gentle Breeze", "Brisa suave", 2, ["divine", "occult", "primal"], 70, "Uma brisa restauradora ajuda criaturas vivas a descansar e resistir a aflições."],
  ["phantom_orchestra", "Orquestra Fantasma", "Phantom Orchestra", "Orquesta fantasmal", 6, ["arcane", "occult", "primal"], 71, "Uma orquestra invisível de sons capturados cria explosões sucessivas de dano sônico."],
  ["pressure_zone", "Zona de Pressão", "Pressure Zone", "Zona de presión", 5, ["arcane", "primal"], 71, "Uma queda de pressão torna a área difícil e dificulta a respiração."],
  ["propulsive_breeze", "Brisa Propulsora", "Propulsive Breeze", "Brisa propulsora", 2, ["arcane", "primal"], 71, "Um vento nas costas impulsiona um aliado ao final de seu movimento."],
  ["shock_to_the_system", "Choque no Sistema", "Shock to the System", "Choque al sistema", 7, ["divine", "occult", "primal"], 71, "Relâmpagos revitalizam ou reanimam um alvo e o deixam supercarregado."],
  ["slashing_gust", "Rajada Cortante", "Slashing Gust", "Ráfaga cortante", 1, ["arcane", "primal"], 71, "Lâminas de ar atingem uma ou duas criaturas com dano cortante."],
  ["stifling_stillness", "Imobilidade Sufocante", "Stifling Stillness", "Quietud sofocante", 4, ["arcane", "primal"], 71, "O ar imóvel torna a área difícil e força criaturas a lutar para respirar."],
  ["tempest_cloak", "Manto da Tempestade", "Tempest Cloak", "Manto de tormenta", 3, ["arcane", "primal"], 72, "Ventos ferozes protegem uma criatura contra ataques físicos à distância e efeitos auditivos."],
  ["vacuum", "Vácuo", "Vacuum", "Vacío", 7, ["arcane", "primal"], 72, "Você suga o ar da área, forçando criaturas a prender a respiração."],
  ["voice_on_the_breeze", "Voz na Brisa", "Voice on the Breeze", "Voz en la brisa", 2, ["arcane", "occult", "primal"], 73, "Uma mensagem sussurrada viaja pelo vento até um ponto familiar."],
  ["wisdom_of_the_winds", "Sabedoria dos Ventos", "Wisdom of the Winds", "Sabiduría de los vientos", 5, ["arcane", "divine", "occult", "primal"], 73, "Espíritos do ar oferecem orientação por meio de ventos, sinais ou conselhos."],
  ["zephyr_slip", "Deslize do Zéfiro", "Zephyr Slip", "Desliz del céfiro", 4, ["arcane", "primal"], 73, "Uma corrente de ar afasta você de uma criatura que se aproxima."]
];
for (const [slug, pt, en, es, rank, traditions, page, summary] of RAGE_ELEMENTS_AIR_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.air.${slug}`,
    name: `${pt} (${en})`, rank, traditions, actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements air spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de aire de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

const RAGE_ELEMENTS_EARTH_SPELLS = [
  ["burrow_ward", "Proteção contra Escavação", "Burrow Ward", "Salvaguarda excavadora", 2, 94, "Solidifica a terra ao redor de você e dificulta a passagem de criaturas escavadoras."],
  ["exploding_earth", "Terra Explosiva", "Exploding Earth", "Tierra explosiva", 2, 94, "Arremessa uma esfera compacta de terra e pedra que explode ao atingir o alvo."],
  ["cave_fangs", "Presas da Caverna", "Cave Fangs", "Colmillos de caverna", 3, 94, "Formações afiadas de pedra surgem do chão e do teto, ferindo criaturas na área."],
  ["glass_form", "Forma de Vidro", "Glass Form", "Forma de vidrio", 4, 94, "Concede ao alvo propriedades de vidro transparente, resistência e proteção contra sangramento."],
  ["engrave_memory", "Gravar Memória", "Engrave Memory", "Grabar memoria", 5, 94, "Armazena até dez minutos de lembranças em uma pedra, que pode ser acessada por uma palavra-chave."],
  ["glass_shield", "Escudo de Vidro", "Glass Shield", "Escudo de vidrio", 1, 94, "Cria uma camada de vidro que protege você e fere quem a quebra de perto."],
  ["grasping_earth", "Terra Agarradora", "Grasping Earth", "Tierra apresadora", 4, 95, "Protrusões de rocha e solo agarram e enterram criaturas na área."],
  ["heaving_earth", "Terra Ondulante", "Heaving Earth", "Tierra ondulante", 7, 95, "Uma onda atravessa o solo, sacode criaturas e explode em terra e pedras no alvo."],
  ["instant_pottery", "Cerâmica Instantânea", "Instant Pottery", "Cerámica instantánea", 1, 95, "Molda material da terra em objetos simples de cerâmica temporária."],
  ["interposing_earth", "Terra Interposta", "Interposing Earth", "Tierra interpuesta", 1, 95, "Ergue uma barreira de terra para oferecer cobertura contra um ataque ou efeito de área."],
  ["pave_ground", "Aplainar Solo", "Pave Ground", "Allanar terreno", 2, 95, "Nivela o solo e remove terreno difícil não mágico feito de terra, entulho ou areia."],
  ["rubble_step", "Passo de Entulho", "Rubble Step", "Paso de escombros", 2, 96, "Deixa um rastro de entulho que transforma os espaços abandonados em terreno difícil."],
  ["sand_form", "Forma de Areia", "Sand Form", "Forma de arena", 3, 96, "Concede ao alvo aspectos de areia, resistência a certos danos e proteção contra sangramento."],
  ["sliding_blocks", "Blocos Deslizantes", "Sliding Blocks", "Bloques deslizantes", 4, 96, "Conjura cubos de pedra que podem levitar e ser movidos para criar cobertura e obstáculos."]
];
for (const [slug, pt, en, es, rank, page, summary] of RAGE_ELEMENTS_EARTH_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.earth.${slug}`,
    name: `${pt} (${en})`, rank, traditions: ["arcane", "primal"], actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements earth spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de tierra de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

const RAGE_ELEMENTS_FIRE_SPELLS = [
  ["blazing_armory", "Arsenal Flamejante", "Blazing Armory", "Arsenal llameante", 2, 118, ["arcane", "divine", "primal"], "Materializa uma arma flamejante simples ou marcial nas mãos de uma criatura disposta."],
  ["cauterize_wounds", "Cauterizar Ferimentos", "Cauterize Wounds", "Cauterizar heridas", 2, 118, ["arcane", "divine", "primal"], "Sela ferimentos sangrando com fogo e ajuda o alvo a se recuperar do sangramento persistente."],
  ["cinder_swarm", "Enxame de Brasas", "Cinder Swarm", "Enjambre de brasas", 4, 118, ["arcane", "primal"], "Um enxame de criaturas flamejantes envolve o alvo e seus inimigos, causando dano e desorientação."],
  ["dehydrate", "Desidratar", "Dehydrate", "Deshidratar", 1, 119, ["arcane", "primal"], "Extrai umidade de criaturas na área, causando dano de fogo persistente e enfraquecendo-as."],
  ["eat_fire", "Comer Fogo", "Eat Fire", "Comer fuego", 1, 119, ["arcane", "occult", "primal"], "Consome fogo para ganhar resistência temporária e poder expelir fumaça."],
  ["falsify_heat", "Falsificar Calor", "Falsify Heat", "Falsificar calor", 2, 119, ["arcane", "primal"], "Altera a temperatura aparente de criaturas ou objetos para enganar sentidos e ilusões térmicas."],
  ["fires_pathway", "Caminho do Fogo", "Fire's Pathway", "Camino del fuego", 5, 119, ["arcane", "primal"], "Permite entrar em um fogo grande e sair instantaneamente por outro fogo dentro do alcance."],
  ["fireproof", "À Prova de Fogo", "Fireproof", "Resistente al fuego", 2, 119, ["arcane", "divine", "primal"], "Protege um objeto contra calor, fogo e efeitos que tenham o traço fogo."],
  ["flame_dancer", "Dançarino das Chamas", "Flame Dancer", "Danzante de llamas", 5, 120, ["arcane", "occult", "primal"], "Envolve uma criatura em chamas e fortalece seus ataques desarmados e sua presença intimidante."],
  ["flames_of_ego", "Chamas do Ego", "Flames of Ego", "Llamas del ego", 5, 120, ["arcane", "occult", "primal"], "Chamas fascinantes tornam o alvo arrogante e descuidado diante de sua própria imagem."],
  ["heatvision", "Visão Térmica", "Heatvision", "Visión térmica", 3, 120, ["arcane", "divine", "occult", "primal"], "Permite perceber energia térmica e detectar criaturas quentes através de fumaça ou escuridão."],
  ["illuminate", "Iluminar", "Illuminate", "Iluminar", 1, 120, ["arcane", "divine", "occult", "primal"], "Acende fontes de luz não mágicas que usam fogo na área."],
  ["phoenix_ward", "Proteção da Fênix", "Phoenix Ward", "Protección del fénix", 4, 120, ["divine", "primal"], "Um escudo de fogo absorve dano letal, cura você e então desaparece em uma explosão de luz."]
];
for (const [slug, pt, en, es, rank, page, traditions, summary] of RAGE_ELEMENTS_FIRE_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.fire.${slug}`,
    name: `${pt} (${en})`, rank, traditions, actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements fire spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de fuego de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

const RAGE_ELEMENTS_METAL_SPELLS = [
  ["beheading_buzz_saw", "Serra Zumbidora Decapitante", "Beheading Buzz Saw", "Sierra decapitadora", 7, 142, ["arcane"], "Uma serra de metal fundido atravessa uma linha, causando dano cortante e sangramento."],
  ["conductive_weapon", "Arma Condutiva", "Conductive Weapon", "Arma conductora", 1, 142, ["arcane", "primal"], "Carrega uma arma de metal com eletricidade, transformando-a em uma arma chocante."],
  ["detect_metal", "Detectar Metal", "Detect Metal", "Detectar metal", 1, 142, ["arcane", "divine", "occult", "primal"], "Sintoniza você a campos magnéticos e revela a presença de objetos e depósitos metálicos."],
  ["clad_in_metal", "Revestir com Metal", "Clad in Metal", "Revestir de metal", 2, 142, ["arcane", "divine", "primal"], "Troca temporariamente a superfície de um objeto metálico por um metal precioso adequado."],
  ["ferrous_form", "Forma Ferrosa", "Ferrous Form", "Forma ferrosa", 8, 142, ["arcane", "primal"], "Transforma seu corpo em ferro flexível, concedendo resistência física e imunidades."],
  ["field_of_razors", "Campo de Lâminas", "Field of Razors", "Campo de navajas", 6, 143, ["arcane", "primal"], "Transforma metal em uma área de fios e lâminas que pune o movimento."],
  ["fold_metal", "Dobrando Metal", "Fold Metal", "Doblar metal", 1, 143, ["arcane"], "Dobra um objeto metálico em uma esfera lisa até que a magia termine ou seja desfeita."],
  ["magnetic_dominion", "Domínio Magnético", "Magnetic Dominion", "Dominio magnético", 9, 143, ["arcane", "primal"], "Controla criaturas e objetos metálicos na área por meio dos campos magnéticos."],
  ["mantle_of_the_melting_heart", "Manto do Coração Derretido", "Mantle of the Melting Heart", "Manto del corazón fundido", 5, 143, ["arcane", "primal"], "Reveste seu corpo em metal líquido e escolhe poderes defensivos ou ofensivos."],
  ["mercurial_stride", "Passo Mercurial", "Mercurial Stride", "Paso mercurial", 4, 144, ["arcane", "occult"], "Assume uma forma de mercúrio e atravessa espaços de criaturas durante seu movimento."],
  ["needle_darts", "Dardos de Agulha", "Needle Darts", "Dardos de aguja", 1, 144, ["arcane", "divine", "occult", "primal"], "Molda agulhas de metal e as lança contra um alvo, podendo causar sangramento."],
  ["noxious_metals", "Metais Nocivos", "Noxious Metals", "Metales nocivos", 3, 145, ["arcane", "primal"], "Libera vapores metálicos tóxicos que deixam criaturas doentes e causam dano de veneno."],
  ["rust_cloud", "Nuvem de Ferrugem", "Rust Cloud", "Nube de óxido", 4, 145, ["arcane", "primal"], "Uma nuvem corrosiva enferruja metal e ameaça criaturas e objetos na área."],
  ["shielded_arm", "Braço Protegido", "Shielded Arm", "Brazo protegido", 1, 145, ["arcane", "divine", "primal"], "Cria um escudo metálico no braço para bloquear um ataque ou efeito iminente."],
  ["wall_of_metal", "Muralha de Metal", "Wall of Metal", "Muro de metal", 6, 146, ["arcane", "primal"], "Ergue uma muralha metálica resistente que permanece até ser destruída ou a magia terminar."]
];
for (const [slug, pt, en, es, rank, page, traditions, summary] of RAGE_ELEMENTS_METAL_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.metal.${slug}`,
    name: `${pt} (${en})`, rank, traditions, actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements metal spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de metal de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

const RAGE_ELEMENTS_WATER_SPELLS = [
  ["brine_dragon_bile", "Bile de Dragão de Salmoura", "Brine Dragon Bile", "Bilis de dragón de salmuera", 2, 172, ["arcane", "primal"], "Fere uma criatura que acabou de sofrer um ataque cortante ou perfurante, causando dano persistente de ácido."],
  ["buoyant_bubbles", "Bolhas Flutuantes", "Buoyant Bubbles", "Burbujas flotantes", 1, 172, ["arcane", "primal"], "Reveste uma criatura com bolhas que a fazem flutuar e impedem que afunde."],
  ["coral_scourge", "Flagelo de Coral", "Coral Scourge", "Azote de coral", 3, 172, ["arcane", "primal"], "Faz coral crescer sobre uma criatura, deixando-a desajeitada e restringindo seu movimento."],
  ["dancing_fountain", "Fonte Dançante", "Dancing Fountain", "Fuente danzante", 7, 172, ["arcane", "primal"], "Cria uma fonte que pode mover criaturas, obscurecer a área ou causar dano em uma explosão."],
  ["dive_and_breach", "Mergulho e Emergência", "Dive and Breach", "Inmersión y salida", 3, 172, ["arcane", "primal"], "Teletransporta você entre superfícies como um mergulho, causando dano nas áreas de entrada e saída."],
  ["draw_moisture", "Extrair Umidade", "Draw Moisture", "Extraer humedad", 1, 173, ["arcane", "divine", "primal"], "Extrai água de um objeto para secá-lo ou obter uma pequena quantidade de água potável."],
  ["freezing_rain", "Chuva Congelante", "Freezing Rain", "Lluvia congelante", 5, 173, ["arcane", "primal"], "Cria chuva que torna a área difícil e pode congelar para causar dano de frio e lentidão."],
  ["frost_pillar", "Pilar de Gelo", "Frost Pillar", "Pilar de escarcha", 6, 173, ["arcane", "primal"], "Aprisiona uma criatura em um pilar de gelo resistente até que ele seja destruído ou a magia termine."],
  ["grasp_of_the_deep", "Aperto das Profundezas", "Grasp of the Deep", "Agarre de las profundidades", 4, 173, ["arcane", "primal"], "Esmaga e desorienta uma criatura com a pressão fantasmagórica do mar profundo, podendo agarrá-la."],
  ["hungry_depths", "Profundezas Famintas", "Hungry Depths", "Profundidades hambrientas", 7, 173, ["arcane", "primal"], "Abre um vórtice de água corrompida que causa dano e se move pela área enquanto é sustentado."],
  ["misty_memory", "Memória Nebulosa", "Misty Memory", "Memoria brumosa", 4, 173, ["arcane", "divine", "primal"], "Revela em uma névoa cenas silenciosas que aconteceram perto de uma massa de água nas últimas 24 horas."],
  ["personal_ocean", "Oceano Pessoal", "Personal Ocean", "Océano personal", 6, 174, ["arcane", "primal"], "Envolve você em uma bolha de água que permite respirar e nadar, mas limita ataques e magias de fogo."],
  ["pillar_of_water", "Pilar de Água", "Pillar of Water", "Pilar de agua", 3, 174, ["arcane", "primal"], "Cria um cilindro de água no qual criaturas podem nadar ou caminhar com dificuldade."],
  ["rousing_splash", "Respingar Revigorante", "Rousing Splash", "Salpicadura estimulante", 1, 174, ["divine", "primal"], "Concede pontos de vida temporários e ajuda uma criatura a se recuperar de dano persistente de ácido ou fogo."],
  ["scrying_ripples", "Ondulações de Vidência", "Scrying Ripples", "Ondulaciones adivinatorias", 3, 175, ["arcane", "divine", "occult", "primal"], "Permite observar e ouvir através de águas correntes próximas, mudando o ponto observado enquanto sustenta."],
  ["waterproof", "Impermeabilizar", "Waterproof", "Impermeabilizar", 2, 175, ["arcane", "primal"], "Impede que um objeto absorva água e concede proteção contra efeitos de água e ácido."],
  ["whirlpool", "Redemoinho", "Whirlpool", "Remolino", 8, 175, ["arcane", "primal"], "Cria um grande vórtice que causa dano, torna a área difícil e puxa criaturas para o centro." ]
];
for (const [slug, pt, en, es, rank, page, traditions, summary] of RAGE_ELEMENTS_WATER_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.water.${slug}`,
    name: `${pt} (${en})`, rank, traditions, actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements water spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de agua de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

const RAGE_ELEMENTS_WOOD_SPELLS = [
  ["arrow_salvo", "Salva de Flechas", "Arrow Salvo", "Salva de flechas", 6, 196, ["arcane", "primal"], "Conjura um arco de madeira imenso que dispara uma salva de flechas contra inimigos próximos."],
  ["entwined_roots", "Raízes Entrelaçadas", "Entwined Roots", "Raíces entrelazadas", 5, 196, ["arcane", "primal"], "Protege criaturas vivas com raízes flexíveis que concedem resistência e capturam munição que falha."],
  ["flourishing_flora", "Flora Florescente", "Flourishing Flora", "Flora floreciente", 1, 196, ["arcane", "primal"], "Faz plantas crescerem rapidamente em uma área, causando dano e efeitos variados conforme a planta escolhida."],
  ["helpful_wood_spirits", "Espíritos de Madeira Prestativos", "Helpful Wood Spirits", "Espíritus de madera serviciales", 2, 196, ["arcane", "primal"], "Invoca espíritos de madeira que realizam tarefas, distraem inimigos, criam terreno difícil ou procuram na área."],
  ["life_draining_roots", "Raízes Drenadoras de Vida", "Life-Draining Roots", "Raíces drenadoras de vida", 4, 196, ["arcane", "primal"], "Lança raízes perfurantes em uma linha, causando dano e concedendo vida temporária por criaturas vivas atingidas."],
  ["lignify", "Lignificar", "Lignify", "Lignificar", 6, 197, ["arcane", "primal"], "Transforma lentamente a carne de uma criatura em madeira, aplicando lentidão até uma petrificação de madeira."],
  ["lotus_walk", "Caminho de Lótus", "Lotus Walk", "Paso de loto", 3, 197, ["arcane", "divine", "primal"], "Faz flores aquáticas surgirem sob seus pés para caminhar sobre água e outros líquidos."],
  ["mantle_of_the_unwavering_heart", "Manto do Coração Inabalável", "Mantle of the Unwavering Heart", "Manto del corazón inquebrantable", 5, 197, ["arcane", "primal"], "Envolve você em madeira viva e permite escolher entre vitalidade, perfume debilitante, grande estatura ou vontade resistente."],
  ["pollen_pods", "Vagens de Pólen", "Pollen Pods", "Vainas de polen", 7, 197, ["arcane", "primal"], "Cultiva bulbos de madeira sensíveis ao movimento que liberam pólen venenoso quando ativados."],
  ["rigid_form", "Forma Rígida", "Rigid Form", "Forma rígida", 4, 197, ["arcane", "primal"], "Usa a rigidez da madeira para tentar neutralizar efeitos de polimorfia nocivos que tenham você como alvo."],
  ["root_reading", "Leitura de Raízes", "Root Reading", "Lectura de raíces", 1, 198, ["arcane", "primal"], "Percebe criaturas ocultas e rastros recentes ao enviar seus sentidos pelos sistemas de raízes da vegetação."],
  ["splinter_volley", "Rajada de Estilhaços", "Splinter Volley", "Descarga de astillas", 2, 198, ["arcane", "primal"], "Dispara estilhaços contra um ou dois alvos, causando dano perfurante e sangramento persistente."],
  ["take_root", "Criar Raízes", "Take Root", "Echar raíces", 1, 198, ["arcane", "primal"], "Cria raízes que reforçam a postura ou a pegada de uma criatura, protegendo-a contra empurrões, desarmes e quedas."],
  ["timber", "Tronco", "Timber", "Tronco", 1, 198, ["arcane", "primal"], "Cria uma pequena árvore que cai em uma linha, causando dano contundente e podendo deixar criaturas ofuscadas."],
  ["verdant_sprout", "Broto Verdejante", "Verdant Sprout", "Brote verdante", 1, 199, ["primal"], "Planta uma semente que cresce em uma planta resistente, fornecendo cobertura, terreno difícil e alimento."],
  ["wall_of_shrubs", "Muralha de Arbustos", "Wall of Shrubs", "Muro de arbustos", 1, 199, ["arcane", "primal"], "Faz uma linha ou anel de arbustos surgir do chão para conceder cobertura na área."],
  ["weave_wood", "Trançar Madeira", "Weave Wood", "Tejer madera", 1, 199, ["arcane", "primal"], "Transforma madeira, juncos ou fibras vegetais em vários objetos mundanos de madeira trançada."],
  ["wooden_double", "Duplo de Madeira", "Wooden Double", "Doble de madera", 3, 199, ["arcane", "occult", "primal"], "Cria um duplicado de madeira que recebe um golpe crítico no seu lugar e deixa você dar um passo."],
  ["wooden_fists", "Punhos de Madeira", "Wooden Fists", "Puños de madera", 1, 199, ["arcane", "primal"], "Transforma seus punhos em troncos, concedendo ataques contundentes com alcance e melhorias em níveis elevados."]
];
for (const [slug, pt, en, es, rank, page, traditions, summary] of RAGE_ELEMENTS_WOOD_SPELLS) {
  PF2E_DATA.spells.push({
    id: `spell.rage_elements.wood.${slug}`,
    name: `${pt} (${en})`, rank, traditions, actionType: "varies",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: `Rage of Elements wood spell: ${en}. Full mechanical text pending review.`,
      es: `Conjuro de madera de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    },
    description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

PF2E_DATA.spells.push(
  {
    id: "spell.rage_elements.wood.arms_of_nature", name: "Braços da Natureza (Arms of Nature)", rank: 1, focus: true,
    traditions: ["divine"], actionType: "two-actions", names: { "pt-BR": "Braços da Natureza", en: "Arms of Nature", es: "Brazos de la naturaleza" },
    summaries: { "pt-BR": "Extrai uma arma de madeira de um objeto ou planta, com aprimoramentos conforme o nível.", en: "Draws a wooden weapon from an object or plant, with upgrades at higher ranks.", es: "Extrae un arma de madera de un objeto o planta, con mejoras en rangos superiores." },
    description: "Cria uma arma de foco de madeira; texto mecânico completo pendente de revisão.", source: { book: RAGE_ELEMENTS_SOURCE, page: 199 }, ruleset: "remaster", needs_review: true
  },
  {
    id: "spell.rage_elements.wood.wood_walk", name: "Caminhar pela Madeira (Wood Walk)", rank: 4, focus: true,
    traditions: ["divine"], actionType: "two-actions", names: { "pt-BR": "Caminhar pela Madeira", en: "Wood Walk", es: "Caminar por la madera" },
    summaries: { "pt-BR": "Permite mover-se por plantas vivas e árvores próximas, inclusive em diferentes direções.", en: "Lets you move along living plants and nearby trees, including in different directions.", es: "Te permite moverte por plantas vivas y árboles cercanos, incluso en distintas direcciones." },
    description: "Movimento de foco pelo domínio da Madeira; texto mecânico completo pendente de revisão.", source: { book: RAGE_ELEMENTS_SOURCE, page: 199 }, ruleset: "remaster", needs_review: true
  }
);
PF2E_DATA.rituals.push({
  id: "ritual.rage_elements.bountiful_oasis", name: "Oásis Abundante (Bountiful Oasis)", rank: 5, rarity: "uncommon", traditions: ["primal"],
  castingTimes: { "pt-BR": "1 dia", en: "1 day", es: "1 día" },
  names: { "pt-BR": "Oásis Abundante", en: "Bountiful Oasis", es: "Oasis abundante" },
  summaries: { "pt-BR": "Redireciona água subterrânea para criar uma fonte ou oásis que sustenta uma pequena comunidade.", en: "Redirects underground water to create a spring or oasis capable of supporting a small community.", es: "Redirige agua subterránea para crear un manantial u oasis capaz de sostener una pequeña comunidad." },
  description: "Ritual de água com resultados dependentes do teste de Natureza; texto completo pendente de revisão.", source: { book: RAGE_ELEMENTS_SOURCE, page: 175 }, ruleset: "remaster", needs_review: true
});

const RAGE_ELEMENTS_WOOD_ITEMS = [
  ["animal_nip", "Mordida Animal", "Animal Nip", "Cebo animal", 4, 200, "Consumível alquímico que atrai animais com um forte aroma e pode fasciná-los."],
  ["blooming_lotus_seed_pod", "Vagem de Sementes de Lótus Florescente", "Blooming Lotus Seed Pod", "Vaina de semillas de loto floreciente", 7, 200, "Vagem consumível que cria plataformas flutuantes ou uma flor que favorece o descanso."],
  ["broadleaf_shield", "Escudo de Folha Larga", "Broadleaf Shield", "Escudo de hoja ancha", 6, 200, "Escudo de madeira viva que muda com as estações e oferece resistências variáveis."],
  ["captivating_rosebud", "Botão de Rosa Cativante", "Captivating Rosebud", "Capullo de rosa cautivador", 3, 200, "Consumível perfumado que brota em roseiras capazes de distrair ou fascinar criaturas."],
  ["carver_cutter", "Machado Entalhador", "Carver-Cutter", "Hacha talladora", 11, 201, "Machado de batalha mágico com cinzel oculto e bônus para trabalhos em madeira."],
  ["glowing_lantern_fruit", "Fruto Lanterna Brilhante", "Glowing Lantern Fruit", "Fruta linterna brillante", 1, 201, "Fruto consumível que ilumina como uma lanterna ou fornece calor de fogueira quando plantado."],
  ["kizidhars_shield", "Escudo de Kizidhar", "Kizidhar's Shield", "Escudo de Kizidhar", 11, 202, "Escudo de madeira mágica que se repara e pode proteger um acampamento com espinhos."],
  ["purifying_spoon", "Colher Purificadora", "Purifying Spoon", "Cuchara purificadora", 1, 202, "Colher mágica que purifica comida e bebida em quantidades proporcionais ao seu tipo."],
  ["rooting", "Enraizamento", "Rooting", "Enraizamiento", 7, 202, "Runa de madeira vegetal que imobiliza e deixa desajeitado um alvo após um acerto crítico."],
  ["sandalwood_fan", "Leque de Sândalo", "Sandalwood Fan", "Abanico de sándalo", 12, 202, "Leque mágico que facilita viagens planares e permite falar com plantas."],
  ["splintering_spear", "Lança Estilhaçante", "Splintering Spear", "Lanza astilladora", 13, 202, "Lança de madeira crepuscular que causa sangramento e pode se despedaçar em uma explosão de estilhaços."],
  ["tailors_boll", "Bola do Alfaiate", "Tailor's Boll", "Bola del sastre", 3, 203, "Consumível de fibras que tece roupas não mágicas sob medida rapidamente."],
  ["tales_in_timber", "Contos na Madeira", "Tales in Timber", "Historias en madera", 10, 202, "Armadura de madeira entalhada que concede conhecimento de Natureza e disfarces especiais."],
  ["therapeutic_snap_peas", "Ervilhas Estalantes Terapêuticas", "Therapeutic Snap Peas", "Guisantes terapéuticos", 8, 202, "Consumível vegetal que libera uma bolsa de cura e pode criar uma trepadeira para escalada."],
  ["thorn_triad", "Tríade de Espinhos", "Thorn Triad", "Tríada de espinas", 4, 203, "Spellheart de madeira que conjura madeira e fortalece ataques ou defesas após uma magia vegetal."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_WOOD_ITEMS) {
  PF2E_DATA.items.push({
    id: `item.rage_elements.wood.${slug}`, name: `${pt} (${en})`, level, category: "magical",
    names: { "pt-BR": pt, en, es }, summaries: {
      "pt-BR": summary,
      en: `Rage of Elements wood item: ${en}. Full mechanical text pending review.`,
      es: `Objeto de madera de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true
  });
}
const RAGE_ELEMENTS_WATER_ITEMS = [
  ["aboutface_figurehead", "Figura de Proa Meia-Volta", "Aboutface Figurehead", "Mascarón de proa media vuelta", 10, 176, "Figura de proa mágica que permite virar um navio em seu próprio eixo."],
  ["anglerfish_lantern", "Lanterna Peixe-Pescador", "Anglerfish Lantern", "Linterna de rape", 5, 176, "Lanterna que brilha debaixo d'água e pode fascinar criaturas ou virar uma esfera submersível."],
  ["brine_dragon_scale", "Escama de Dragão de Salmoura", "Brine Dragon Scale", "Escama de dragón de salmuera", 8, 176, "Talismã que libera água salgada cáustica contra uma criatura atingida por ação de concentração."],
  ["conch_of_otherworldly_seas", "Concha dos Mares de Outro Mundo", "Conch of Otherworldly Seas", "Caracola de mares sobrenaturales", 12, 176, "Concha musical que facilita viagens ao Plano da Água e permite falar com Thalassic."],
  ["faydhaans_dallah", "Dallah de Faydhaan", "Faydhaan's Dallah", "Dallah de Faydhaan", 14, 177, "Jarra mágica que prepara café e concede respiração aquática ou transforma a bebida em poção comum."],
  ["kraken_figurehead", "Figura de Proa Kraken", "Kraken Figurehead", "Mascarón de proa kraken", 10, 177, "Figura de proa que invoca tentáculos espectrais para atrapalhar e prender navios inimigos."],
  ["lionfish_spear", "Lança Peixe-Leão", "Lionfish Spear", "Lanza pez león", 11, 177, "Lança mágica de combate aquático que aplica veneno de peixe-leão uma vez por dia."],
  ["octopus_potion", "Poção de Polvo", "Octopus Potion", "Poción de pulpo", 6, 178, "Poção que faz braços de polvo surgirem do corpo para agarrar inimigos."],
  ["sharkskin_robe", "Robe de Pele de Tubarão", "Sharkskin Robe", "Túnica de piel de tiburón", 12, 178, "Roupa investida que concede deslocamento de natação e adapta ataques ao combate subaquático."],
  ["shell_of_easy_breathing", "Concha da Respiração Fácil", "Shell of Easy Breathing", "Concha de respiración fácil", 5, 178, "Concha mágica que permite respirar debaixo d'água após mergulhar o rosto em sua água."],
  ["sticky_algae_bomb", "Bomba de Algas Pegajosas", "Sticky Algae Bomb", "Bomba de algas pegajosas", 1, 178, "Bomba alquímica de água que funciona normalmente debaixo d'água e deixa um rastro visível."],
  ["underwater", "Subaquática", "Underwater", "Subacuática", 3, 178, "Runa de arma que remove penalidades e restrições de ataques realizados na água."],
  ["veiled_figurehead", "Figura de Proa Velada", "Veiled Figurehead", "Mascarón de proa velado", 7, 179, "Figura de proa ilusória que altera a aparência do navio e de sua tripulação."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_WATER_ITEMS) {
  PF2E_DATA.items.push({
    id: `item.rage_elements.water.${slug}`, name: `${pt} (${en})`, level, category: "magical",
    names: { "pt-BR": pt, en, es }, summaries: {
      "pt-BR": summary,
      en: `Rage of Elements water item: ${en}. Full mechanical text pending review.`,
      es: `Objeto de agua de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
    }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true
  });
}
PF2E_DATA.rituals.push({
  id: "ritual.rage_elements.sky_signs", name: "Sinais no Céu (Sky Signs)", rank: 6, rarity: "uncommon", traditions: ["primal"],
  castingTimes: { "pt-BR": "1 dia", en: "1 day", es: "1 día" },
  names: { "pt-BR": "Sinais no Céu", en: "Sky Signs", es: "Señales en el cielo" },
  summaries: { "pt-BR": "Exibe uma mensagem simples no céu usando nuvens, auroras ou outro fenômeno atmosférico.", en: "Displays a simple message across the sky using clouds, auroras, or another atmospheric phenomenon.", es: "Muestra un mensaje sencillo en el cielo usando nubes, auroras u otro fenómeno atmosférico." },
  description: "Ritual de ilusão aérea; resultados dependem do teste de Natureza, com texto completo pendente de revisão.", source: { book: RAGE_ELEMENTS_SOURCE, page: 73 }, ruleset: "remaster", needs_review: true
});
const RAGE_ELEMENTS_AIR_ITEMS = [
  ["aerial_cloak", "Manto Aéreo", "Aerial Cloak", "Capa aérea", 3, 74, "Manto leve que ajuda em saltos, equilíbrio, voo e quedas."],
  ["atmospheric_staff", "Bastão Atmosférico", "Atmospheric Staff", "Bastón atmosférico", 4, 74, "Bastão mágico com magias de ar, gravidade, voo e clima."],
  ["blight_breath", "Sopro da Praga", "Blight Breath", "Aliento de plaga", 12, 74, "Sopro engarrafado que protege contra veneno e libera uma nuvem nociva."],
  ["extra_lung", "Pulmão Extra", "Extra Lung", "Pulmón adicional", 8, 74, "Bexiga de ar que permite respirar por várias rodadas e expelir venenos inalados."],
  ["fan_of_soothing_winds", "Leque dos Ventos Calmantes", "Fan of Soothing Winds", "Abanico de vientos calmantes", 11, 74, "Leque que conjura curas em cones por meio de contas que se renovam diariamente."],
  ["floating_tent", "Tenda Flutuante", "Floating Tent", "Tienda flotante", 1, 75, "Tenda equilibrada para dormir em ambientes planares sem gravidade."],
  ["frost_breath", "Sopro Gélido", "Frost Breath", "Aliento de escarcha", 7, 75, "Sopro engarrafado que concede resistência a frio e cobre uma área com gelo."],
  ["jaathooms_scarf", "Cachecol de Jaathoom", "Jaathoom's Scarf", "Bufanda de Jaathoom", 10, 75, "Cachecol investido que concede bônus de Performance e pode causar invisibilidade ou empurrar inimigos."],
  ["nimbus_breath", "Sopro de Nimbo", "Nimbus Breath", "Aliento de nimbo", 8, 75, "Sopro engarrafado que concede resistência elétrica, voo e um jato de vento."],
  ["spiral_chimes", "Sinos Espirais", "Spiral Chimes", "Campanas espirales", 13, 76, "Sinos mágicos que auxiliam viagens planares, preveem o clima e revelam invisibilidade."],
  ["spun_cloud", "Nuvem Fiada", "Spun Cloud", "Nube hilada", 2, 76, "Nuvem engarrafada que se expande e cria efeitos variados conforme sua cor."],
  ["storm_breath", "Sopro de Tempestade", "Storm Breath", "Aliento de tormenta", 9, 76, "Sopro engarrafado que concede resistências e libera um raio elétrico."],
  ["wisp_chain", "Cota de Fios de Ar", "Wisp Chain", "Cota de hilos de aire", 9, 76, "Armadura de correntes de vento que pode ensurdecer criaturas próximas e lançar lâminas de ar."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_AIR_ITEMS) {
  PF2E_DATA.items.push({ id: `item.rage_elements.air.${slug}`, name: `${pt} (${en})`, level, category: "magical", names: { "pt-BR": pt, en, es }, summaries: {
    "pt-BR": summary, en: `Rage of Elements air item: ${en}. Full mechanical text pending review.`, es: `Objeto de aire de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
  }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true });
}
const RAGE_ELEMENTS_EARTH_ITEMS = [
  ["aeon_stone", "Pedra Aeon", "Aeon Stone", "Piedra aeon", 3, 98, "Pedra investida que orbita a cabeça e oferece poderes de percepção, mente ou resistência."],
  ["drought_powder", "Pó da Seca", "Drought Powder", "Polvo de sequía", 11, 98, "Pó consumível que mantém você seco, reduz água e afeta criaturas aquáticas."],
  ["exuviae_powder", "Pó de Exúvia", "Exuviae Powder", "Polvo de exuvias", 14, 98, "Pó alquímico que prolonga a retenção de ar e cria uma carapaça protetora contra petrificação."],
  ["fossil_fragment", "Fragmento Fóssil", "Fossil Fragment", "Fragmento fósil", 7, 98, "Fragmento mágico que se transforma temporariamente em um esqueleto fóssil obediente."],
  ["jabalis_dice", "Dados de Jabali", "Jabali's Dice", "Dados de Jabali", 12, 99, "Dados de pedra que concedem sorte e invocam efeitos de um shuyookh quando lançados."],
  ["limestone_shield", "Escudo de Calcário", "Limestone Shield", "Escudo de piedra caliza", 7, 99, "Escudo torre que se expande em uma muralha e bloqueia efeitos elementais."],
  ["robe_of_stone", "Robe de Pedra", "Robe of Stone", "Túnica de piedra", 11, 100, "Veste investida que concede sentido sísmico, língua Petran e transformação elemental de terra."],
  ["sairazul_blue", "Azul de Sairazul", "Sairazul Blue", "Azul de Sairazul", 10, 100, "Poção rara que protege contra veneno e energia void e cura quando você cai a zero PV."],
  ["sandcastle", "Castelo de Areia", "Sandcastle", "Castillo de arena", 11, 100, "Estrutura mágica que se transforma em um castelo de areia construído sob comando."],
  ["singing_stone", "Pedra Cantante", "Singing Stone", "Piedra cantante", 13, 100, "Pedra musical que facilita viagens planares e permite falar ou enxergar através de pedra."],
  ["stalagmite_seed", "Semente de Estalagmite", "Stalagmite Seed", "Semilla de estalagmita", 7, 100, "Semente consumível que ergue estalagmites danosas e cria terreno difícil."],
  ["vital_earth", "Terra Vital", "Vital Earth", "Tierra vital", 9, 100, "Pó consumível que dispensa ar e água por um dia e facilita cuidados médicos."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_EARTH_ITEMS) {
  PF2E_DATA.items.push({ id: `item.rage_elements.earth.${slug}`, name: `${pt} (${en})`, level, category: "magical", names: { "pt-BR": pt, en, es }, summaries: {
    "pt-BR": summary, en: `Rage of Elements earth item: ${en}. Full mechanical text pending review.`, es: `Objeto de tierra de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
  }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true });
}
const RAGE_ELEMENTS_FIRE_ITEMS = [
  ["ash_gown", "Vestido de Cinzas", "Ash Gown", "Vestido de ceniza", 7, 122, "Roupa investida que concede resistência a fogo e pode envolver você em chamas durante um movimento."],
  ["bloodburn_censer", "Turíbulo Queima-Sangue", "Bloodburn Censer", "Incensario quema sangre", 13, 122, "Turíbulo que libera fumaça capaz de causar dano de fogo ou veneno e enfraquecer criaturas."],
  ["brazier_of_harmony", "Braseiro da Harmonia", "Brazier of Harmony", "Brasero de armonía", 5, 122, "Turíbulo que cria uma aura de paz e acalma criaturas que respiram sua fumaça."],
  ["candle_of_inflamed_passions", "Vela das Paixões Inflamadas", "Candle of Inflamed Passions", "Vela de pasiones inflamadas", 3, 122, "Consumível que intensifica emoções e impõe penalidade contra efeitos emocionais."],
  ["everburning_coal", "Carvão Inextinguível", "Everburning Coal", "Carbón inextinguible", 12, 123, "Carvão mágico que protege contra frio, serve como chave planar e cria uma muralha de brasas."],
  ["globe_of_shrouds", "Globo de Mortalhas", "Globe of Shrouds", "Globo de mortajas", 8, 123, "Turíbulo que oculta aliados e revela inimigos invisíveis em uma área de fumaça."],
  ["lambent_perfume", "Perfume Lampejante", "Lambent Perfume", "Perfume lambente", 6, 123, "Turíbulo restaurador que ajuda criaturas a superar condições de doença e aflições."],
  ["obsidian_edge", "Lâmina de Obsidiana", "Obsidian Edge", "Filo de obsidiana", 6, 123, "Gun sword mágica de obsidiana que causa fogo e pode explodir em estilhaços."],
  ["rhyton_of_the_radiant_ifrit", "Ríton do Ifrit Radiante", "Rhyton of the Radiant Ifrit", "Ritón del ifrit radiante", 14, 124, "Recipiente mágico que fornece bebidas e pode conjurar um comando poderoso contra inimigos."],
  ["scalding_gauntlets", "Manoplas Escaldantes", "Scalding Gauntlets", "Guanteletes hirvientes", 11, 124, "Manoplas de combate que queimam e deixam doentes criaturas agarradas."],
  ["smoke_veil", "Véu de Fumaça", "Smoke Veil", "Velo de humo", 3, 124, "Adorno investido que facilita disfarces e transforma uma Demoralização em ação visual."],
  ["sparkshade_parasol", "Sombrinha Fagulhante", "Sparkshade Parasol", "Parasol de chispas", 11, 124, "Sombrinha que protege contra calor e fogo e pode devolver chamas em uma linha."],
  ["thawing_candle", "Vela do Degelo", "Thawing Candle", "Vela del deshielo", 8, 125, "Consumível que concede resistência a frio e ajuda a encerrar dano persistente de frio."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_FIRE_ITEMS) {
  PF2E_DATA.items.push({ id: `item.rage_elements.fire.${slug}`, name: `${pt} (${en})`, level, category: "magical", names: { "pt-BR": pt, en, es }, summaries: {
    "pt-BR": summary, en: `Rage of Elements fire item: ${en}. Full mechanical text pending review.`, es: `Objeto de fuego de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
  }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true });
}
const RAGE_ELEMENTS_METAL_ITEMS = [
  ["curious_teardrop", "Gota Curiosa", "Curious Teardrop", "Gota curiosa", 16, 146, "Item inteligente de metal líquido que oferece magia, telepatia e proteção contra efeitos emocionais."],
  ["ferrofluid_urchin", "Ouriço Ferrofluido", "Ferrofluid Urchin", "Erizo ferrofluido", 7, 146, "Talismã consumível que se fixa a armadura metálica e concede resistência ao dano físico recebido."],
  ["malleable", "Maleável", "Malleable", "Maleable", 9, 146, "Runa de armadura que permite reconfigurar sua composição e especialização quando ativada."],
  ["morphing_weapon", "Arma Mutável", "Morphing Weapon", "Arma cambiante", 7, 146, "Arma metálica mágica que muda de forma e oferece benefícios diferentes durante o ataque."],
  ["resonant_guitar", "Guitarra Ressonante", "Resonant Guitar", "Guitarra resonante", 12, 147, "Instrumento metálico virtuoso que facilita viagens planares e pode proteger aliados com som."],
  ["rustbringer", "Portador de Ferrugem", "Rustbringer", "Portaóxido", 10, 147, "Mangual corrosivo que é especialmente perigoso contra armas e criaturas metálicas."],
  ["silver_snake_cane", "Bengala Serpente de Prata", "Silver Snake Cane", "Bastón serpiente de plata", 6, 147, "Bengala mágica que armazena veneno ou elixir e pode virar uma espada-cajado ou víbora."],
  ["spellsap_grenade", "Granada Drena-Feitiço", "Spellsap Grenade", "Granada drenaconjuros", 12, 147, "Bomba alquímica que causa dano e pode fazer um conjurador perder uma magia ou espaço."],
  ["spiny_lodestone", "Pedra-Ímã Espinhosa", "Spiny Lodestone", "Piedra imán espinosa", 4, 147, "Spellheart metálico que conjura magias e concede resistência ou dano adicional conforme o uso."],
  ["staff_of_metal", "Bastão de Metal", "Staff of Metal", "Bastón de metal", 6, 147, "Bastão mágico com magias de magnetismo, metal, ferrugem e proteção."],
  ["zuhras_gloves", "Luvas de Zuhra", "Zuhra's Gloves", "Guantes de Zuhra", 13, 148, "Luvas investidas que protegem contra desarme e canalizam ataques ou muralhas de metal."]
];
for (const [slug, pt, en, es, level, page, summary] of RAGE_ELEMENTS_METAL_ITEMS) {
  PF2E_DATA.items.push({ id: `item.rage_elements.metal.${slug}`, name: `${pt} (${en})`, level, category: "magical", names: { "pt-BR": pt, en, es }, summaries: {
    "pt-BR": summary, en: `Rage of Elements metal item: ${en}. Full mechanical text pending review.`, es: `Objeto de metal de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
  }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true });
}
const RAGE_ELEMENTS_DOMAIN_FOCUS = [
  ["earth.practice_makes_perfect", "A Prática Leva à Perfeição", "Practice Makes Perfect", "La práctica hace al maestro", 1, 97, "toil", "Concede um bônus a um teste de perícia treinada que falhou."],
  ["earth.tireless_worker", "Trabalhador Incansável", "Tireless Worker", "Trabajador incansable", 4, 97, "toil", "Suprime temporariamente condições como desajeitado, sobrecarregado, enfraquecido ou fatigado."],
  ["metal.serrate", "Serrar", "Serrate", "Serrar", 1, 145, "metal", "Adiciona lâminas a uma arma metálica, causando dano cortante adicional até seu próximo turno."],
  ["metal.repel_metal", "Repelir Metal", "Repel Metal", "Repeler metal", 4, 145, "metal", "Protege contra um Golpe metálico e pode devolvê-lo ao atacante se errar."]
];
for (const [id, pt, en, es, rank, page, domain, summary] of RAGE_ELEMENTS_DOMAIN_FOCUS) {
  PF2E_DATA.spells.push({ id: `spell.rage_elements.${id}`, name: `${pt} (${en})`, rank, focus: true, domain, traditions: ["divine"], actionType: "varies", names: { "pt-BR": pt, en, es }, summaries: {
    "pt-BR": summary, en: `Rage of Elements ${domain} domain focus spell: ${en}. Full mechanical text pending review.`, es: `Conjuro de foco del dominio ${domain} de Rage of Elements: ${es}. El texto mecánico completo queda pendiente de revisión.`
  }, description: summary, source: { book: RAGE_ELEMENTS_SOURCE, page }, ruleset: "remaster", needs_review: true });
}

const BOOK_DEAD_SOURCE = "Livro dos Mortos (pré-Remaster)";
PF2E_DATA.ancestries["Esqueleto (Skeleton)"] = {
  id: "ancestry.skeleton", hp: 6, size: "Médio", speed: 25,
  traits: ["Morto-vivo"],
  senses: ["Visão no Escuro"],
  boosts: ["Destreza", "Carisma", "Livre"], flaws: ["Inteligência"],
  languages: ["Comum", "Necril"], rarity: "rare",
  description: "Morto-vivo esquelético inteligente que preserva vontade, ideais e fragmentos da vida anterior.",
  heritages: ["Esqueleto-Bucha", "Esqueleto Compacto", "Esqueleto Monstruoso", "Esqueleto Robusto"],
  names: { "pt-BR": "Esqueleto", en: "Skeleton", es: "Esqueleto" },
  summaries: { "pt-BR": "Ancestralidade rara morta-viva com 6 PV, visão no escuro e necessidade de coletar ossos.", en: "A rare undead ancestry with 6 HP, darkvision, and a need to collect bones.", es: "Una ascendencia rara no muerta con 6 PG, visión en la oscuridad y necesidad de recoger huesos." },
  source: { book: BOOK_DEAD_SOURCE, page: 48 }, ruleset: "legacy", needs_review: false
};

const BOOK_DEAD_BACKGROUNDS = [
  { id: "background.necromancer_apprentice", name: "Aprendiz de Necromante (Necromancer Apprentice)", page: 16, ability: ["Constituição", "Inteligência"], skill: "arcana", lore: "Saber de Necromancia", feat: "Identificação Rápida", rarity: "common", names: { "pt-BR": "Aprendiz de Necromante", en: "Necromancer Apprentice", es: "Aprendiz de nigromante" }, summaries: { "pt-BR": "Um aprendizado perigoso ensinou você a reconhecer rapidamente ameaças mágicas.", en: "A dangerous apprenticeship taught you to identify magical threats quickly.", es: "Un aprendizaje peligroso te enseñó a identificar rápidamente amenazas mágicas." } },
  { id: "background.haunted_citizen", name: "Cidadão Assombrado (Haunted Citizen)", page: 16, ability: ["Sabedoria", "Carisma"], skill: "diplomacy", lore: "Saber da Cidade Natal", feat: "Sem Motivo para Alarde", rarity: "common", names: { "pt-BR": "Cidadão Assombrado", en: "Haunted Citizen", es: "Ciudadano atormentado" }, summaries: { "pt-BR": "Crescer cercado por mortos-vivos transformou cautela e negociação em habilidades diárias.", en: "Growing up around undead made caution and negotiation everyday skills.", es: "Crecer rodeado de no muertos convirtió la cautela y la negociación en habilidades cotidianas." } },
  { id: "background.pyre_tender", name: "Cuidador de Piras (Pyre Tender)", page: 16, ability: ["Destreza", "Inteligência"], skill: "crafting", lore: "Saber de Funerais", feat: "Manufatura Alquímica", rarity: "common", names: { "pt-BR": "Cuidador de Piras", en: "Pyre Tender", es: "Cuidador de piras" }, summaries: { "pt-BR": "Você domina piras funerárias, combustíveis e técnicas para impedir o retorno dos mortos.", en: "You master funeral pyres, fuels, and techniques that keep the dead from returning.", es: "Dominas las piras funerarias, combustibles y técnicas que impiden el regreso de los muertos." } },
  { id: "background.healer_undead", name: "Curandeiro (Healer)", page: 16, ability: ["Constituição", "Sabedoria"], skill: "medicine", lore: "Saber de Herbalismo", feat: "Inoculação", rarity: "common", names: { "pt-BR": "Curandeiro", en: "Healer", es: "Sanador" }, summaries: { "pt-BR": "Sua prática comunitária de cura também preparou você para assombrações e possessões.", en: "Your community healing practice also prepared you for hauntings and possessions.", es: "Tu práctica comunitaria de sanación también te preparó para apariciones y posesiones." } },
  { id: "background.grave_robber", name: "Ladrão de Tumbas (Grave Robber)", page: 16, ability: ["Força", "Destreza"], skill: "stealth", lore: "Saber de Submundo", feat: "Contrabandista Experiente", rarity: "common", names: { "pt-BR": "Ladrão de Tumbas", en: "Grave Robber", es: "Ladrón de tumbas" }, summaries: { "pt-BR": "Você conhece tumbas, cadáveres valiosos e maneiras discretas de retirar o saque.", en: "You know tombs, valuable corpses, and discreet ways to remove the spoils.", es: "Conoces tumbas, cadáveres valiosos y formas discretas de retirar el botín." } },
  { id: "background.night_watch", name: "Patrulha Noturna (Night Watch)", page: 16, ability: ["Força", "Carisma"], skill: "intimidation", lore: "Saber de Leis ou da Cidade Natal", feat: "Coerção Rápida", rarity: "common", names: { "pt-BR": "Patrulha Noturna", en: "Night Watch", es: "Guardia nocturna" }, summaries: { "pt-BR": "Anos de vigília ensinaram você a encarar ameaças que surgem depois do anoitecer.", en: "Years on watch taught you to face threats that emerge after nightfall.", es: "Años de vigilancia te enseñaron a afrontar amenazas que surgen después del anochecer." } },
  { id: "background.undead_hunter_heir", name: "Herdeiro de Caçadores de Mortos (Undead Hunter Heir)", page: 16, ability: ["Força", "Inteligência"], skill: "athletics", lore: "Saber de Mortos-Vivos", feat: "Disrupção de Morto-Vivo Inata", rarity: "rare", names: { "pt-BR": "Herdeiro de Caçadores de Mortos", en: "Undead Hunter Heir", es: "Heredero de cazadores de muertos" }, summaries: { "pt-BR": "Uma linhagem de caçadores transmitiu a você responsabilidade e poder contra mortos-vivos.", en: "A lineage of hunters passed responsibility and power against undead to you.", es: "Un linaje de cazadores te transmitió responsabilidad y poder contra los no muertos." } },
  { id: "background.willing_host", name: "Hospedeiro Voluntário (Willing Host)", page: 17, ability: ["Sabedoria", "Carisma"], skill: "spirit lore", lore: "Saber de Espíritos", feat: "Hospedar Espírito", rarity: "rare", names: { "pt-BR": "Hospedeiro Voluntário", en: "Willing Host", es: "Anfitrión voluntario" }, summaries: { "pt-BR": "Você negocia com espíritos e permite que compartilhem seu corpo em troca de auxílio.", en: "You bargain with spirits and let them share your body in exchange for aid.", es: "Negocias con espíritus y permites que compartan tu cuerpo a cambio de ayuda." } },
  { id: "background.tombborn", name: "Nascido da Tumba (Tombborn)", page: 17, ability: ["Destreza", "Constituição"], skill: "undead lore", lore: "Saber de Mortos-Vivos", feat: "Rancor Final", rarity: "rare", names: { "pt-BR": "Nascido da Tumba", en: "Tombborn", es: "Nacido de la tumba" }, summaries: { "pt-BR": "Concebido em um lugar marcado pela morte, você se torna perigoso ao cair.", en: "Conceived in a death-stained place, you become dangerous when brought down.", es: "Concebido en un lugar marcado por la muerte, te vuelves peligroso al caer." } }
];
BOOK_DEAD_BACKGROUNDS.forEach((record) => PF2E_DATA.backgrounds.push({ ...record, source: { book: BOOK_DEAD_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false }));

const WAR_IMMORTALS_SOURCE = "Guerra dos Imortais (Remaster)";
PF2E_DATA.classes["Animista (Animist)"] = {
  id: "class.animist", hpPerLevel: 8, keyAbility: ["Sabedoria"],
  perception: "Treinado",
  savingThrows: { fortitude: "Treinado", reflex: "Treinado", will: "Especialista" },
  armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
  weapons: { "Simples": "Treinado", "Marcial": "Destreinado", "Desarmado": "Treinado" },
  classDc: "Treinado", spells: "Treinado", traditions: ["Divina"],
  description: "Conjurador preparado que serve de ponte entre o mundo material e aparições espirituais.",
  subclasses: ["Liturgista", "Médium", "Xamã"],
  names: { "pt-BR": "Animista", en: "Animist", es: "Animista" },
  summaries: { "pt-BR": "Conjurador de Sabedoria que se sintoniza com aparições e combina magia divina preparada com repertórios espirituais.", en: "A Wisdom spellcaster who attunes to apparitions and combines prepared divine magic with spiritual repertoires.", es: "Un lanzador de Sabiduría que se vincula con apariciones y combina magia divina preparada con repertorios espirituales." },
  source: { book: WAR_IMMORTALS_SOURCE, page: 10 }, ruleset: "remaster", needs_review: false
};

PF2E_DATA.classes["Exemplar"] = {
  id: "class.exemplar", hpPerLevel: 10, keyAbility: ["Força", "Destreza"], rarity: "rare",
  perception: "Treinado",
  savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
  armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Destreinado" },
  weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
  classDc: "Treinado",
  description: "Herói raro cuja centelha divina fortalece ícones ligados à sua lenda pessoal.",
  subclasses: ["Ícones e epítetos"],
  names: { "pt-BR": "Exemplar", en: "Exemplar", es: "Ejemplar" },
  summaries: { "pt-BR": "Combatente raro que desloca uma centelha divina entre ícones para alternar efeitos de imanência e transcendência.", en: "A rare martial hero who shifts a divine spark among ikons to alternate immanence and transcendence effects.", es: "Un héroe marcial raro que desplaza una chispa divina entre iconos para alternar efectos de inmanencia y trascendencia." },
  source: { book: WAR_IMMORTALS_SOURCE, page: 28 }, ruleset: "remaster", needs_review: false
};

const WAR_IMMORTALS_ARCHETYPES = [
  {
    id: "archetype.animist_multiclass", name: "Animista Multiclasse (Animist Multiclass)", page: 56,
    subtype: "multiclass", dedicationLevel: 2,
    names: { "pt-BR": "Animista Multiclasse", en: "Animist Multiclass", es: "Animista multiclase" },
    summaries: { "pt-BR": "Dedicação para personagens que começam a se sintonizar com aparições e a magia espiritual do animista.", en: "A dedication for characters beginning to attune to apparitions and the animist's spiritual magic.", es: "Una dedicación para personajes que comienzan a vincularse con apariciones y la magia espiritual del animista." }
  },
  {
    id: "archetype.exemplar_multiclass", name: "Exemplar Multiclasse (Exemplar Multiclass)", page: 57,
    subtype: "multiclass", dedicationLevel: 2, rarity: "rare",
    names: { "pt-BR": "Exemplar Multiclasse", en: "Exemplar Multiclass", es: "Ejemplar multiclase" },
    summaries: { "pt-BR": "Dedicação rara para um herói que manifesta uma centelha divina e passa a vinculá-la a um ícone.", en: "A rare dedication for a hero who manifests a divine spark and begins binding it to an ikon.", es: "Una dedicación rara para un héroe que manifiesta una chispa divina y comienza a vincularla a un icono." }
  },
  {
    id: "archetype.avenger", name: "Vingador (Avenger)", page: 58,
    subtype: "class", dedicationLevel: 2, classId: "class.rogue", requiresDeity: true, prerequisites: ["Ladino", "Divindade e arma favorita compatíveis"],
    names: { "pt-BR": "Vingador", en: "Avenger", es: "Vengador" },
    summaries: { "pt-BR": "Arquétipo de classe de ladino que caça inimigos de sua divindade e combate com a arma favorita dela.", en: "A rogue class archetype that hunts the enemies of a deity and fights with that deity's favored weapon.", es: "Un arquetipo de clase de pícaro que caza a los enemigos de una deidad y combate con su arma predilecta." }
  },
  {
    id: "archetype.bloodrager", name: "Furioso de Sangue (Bloodrager)", page: 60,
    subtype: "class", dedicationLevel: 2, prerequisites: ["Bárbaro"],
    names: { "pt-BR": "Furioso de Sangue", en: "Bloodrager", es: "Furioso de sangre" },
    summaries: { "pt-BR": "Arquétipo de classe de bárbaro que mistura fúria e magia extraída do sangue de criaturas mágicas.", en: "A barbarian class archetype that combines rage with magic drawn from the blood of magical creatures.", es: "Un arquetipo de clase de bárbaro que combina furia con magia extraída de la sangre de criaturas mágicas." }
  },
  {
    id: "archetype.seneschal", name: "Senescal (Seneschal)", page: 62,
    subtype: "class", dedicationLevel: 2, rarity: "rare", classId: "class.witch", requiresNoPatron: true, prerequisites: ["Bruxa que perdeu seu patrono"],
    names: { "pt-BR": "Senescal", en: "Seneschal", es: "Senescal" },
    summaries: { "pt-BR": "Arquétipo raro de classe para uma bruxa sem patrono que assume a custódia de poder oculto remanescente.", en: "A rare witch class archetype for a witch without a patron who becomes the steward of lingering occult power.", es: "Un arquetipo raro de clase de bruja sin patrón que se convierte en custodio de un poder oculto remanente." }
  },
  {
    id: "archetype.vindicator", name: "Vindicador (Vindicator)", page: 64,
    subtype: "class", dedicationLevel: 2, classId: "class.ranger", requiresDeity: true, prerequisites: ["Patrulheiro", "Divindade compatível"],
    names: { "pt-BR": "Vindicador", en: "Vindicator", es: "Vindicador" },
    summaries: { "pt-BR": "Arquétipo de classe de patrulheiro que persegue alvos em nome de uma divindade e desenvolve magia divina.", en: "A ranger class archetype that pursues targets in a deity's name and develops divine magic.", es: "Un arquetipo de clase de explorador que persigue objetivos en nombre de una deidad y desarrolla magia divina." }
  },
  {
    id: "archetype.warrior_of_legend", name: "Guerreiro da Lenda (Warrior of Legend)", page: 66,
    subtype: "class", dedicationLevel: 2, rarity: "uncommon", prerequisites: ["Guerreiro"],
    names: { "pt-BR": "Guerreiro da Lenda", en: "Warrior of Legend", es: "Guerrero de leyenda" },
    summaries: { "pt-BR": "Arquétipo incomum de classe de guerreiro marcado por uma bênção heroica acompanhada de uma fraqueza física.", en: "An uncommon fighter class archetype marked by a heroic blessing accompanied by a physical weakness.", es: "Un arquetipo poco común de clase de guerrero marcado por una bendición heroica acompañada de una debilidad física." }
  }
];
WAR_IMMORTALS_ARCHETYPES.forEach((record) => PF2E_DATA.archetypes.push({
  ...record, description: record.summaries["pt-BR"],
  source: { book: WAR_IMMORTALS_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false
}));

const HOWL_WILD_SOURCE = "Howl of the Wild (Remaster, atualização de errata)";
const HOWL_WILD_ANCESTRIES = {
  "Athamaru": {
    id: "ancestry.athamaru", hp: 8, size: "Médio", speed: 20, swimSpeed: 25,
    senses: ["Visão na Penumbra"],
    boosts: ["Força", "Sabedoria", "Livre"], flaws: ["Inteligência"],
    languages: ["Comum", "Talássico"], rarity: "uncommon",
    heritages: ["Athamaru Coralino", "Athamaru Esperançoso", "Athamaru Caleidoscópico", "Athamaru Espinhoso"],
    names: { "pt-BR": "Athamaru", en: "Athamaru", es: "Athamaru" },
    summaries: { "pt-BR": "Povo anfíbio comunitário, adaptado aos recifes e à vida subaquática.", en: "A communal amphibious people adapted to reefs and undersea life.", es: "Un pueblo anfibio comunitario adaptado a los arrecifes y la vida submarina." },
    page: 16
  },
  "Animal Desperto (Awakened Animal)": {
    id: "ancestry.awakened_animal",
    senses: ["Visão na Penumbra"],
    boosts: ["Constituição", "Sabedoria", "Livre"], flaws: ["Inteligência"],
    languages: ["Comum"], rarity: "rare",
    heritages: ["Animal Escalador", "Animal Voador", "Animal Corredor", "Animal Nadador"],
    names: { "pt-BR": "Animal Desperto", en: "Awakened Animal", es: "Animal despierto" },
    summaries: { "pt-BR": "Animal raro que recebeu consciência plena; tamanho, PV e deslocamentos dependem de sua forma escolhida.", en: "A rare animal granted full sapience; its size, HP, and Speeds depend on its chosen form.", es: "Un animal raro que recibió plena conciencia; su tamaño, PG y velocidades dependen de la forma elegida." },
    selectionGroups: [
      {
        id: "size", labelKey: "size", options: [
          { id: "tiny", size: "Miúdo", hp: 6, names: { "pt-BR": "Miúdo — 6 PV", en: "Tiny — 6 HP", es: "Diminuto — 6 PG" } },
          { id: "small", size: "Pequeno", hp: 6, names: { "pt-BR": "Pequeno — 6 PV", en: "Small — 6 HP", es: "Pequeño — 6 PG" } },
          { id: "medium", size: "Médio", hp: 8, names: { "pt-BR": "Médio — 8 PV", en: "Medium — 8 HP", es: "Mediano — 8 PG" } },
          { id: "large", size: "Grande", hp: 10, names: { "pt-BR": "Grande — 10 PV", en: "Large — 10 HP", es: "Grande — 10 PG" } }
        ]
      },
      {
        id: "heritage", labelKey: "heritage", options: [
          { id: "climbing", speed: 20, climbSpeed: 20, names: { "pt-BR": "Animal Escalador", en: "Climbing Animal", es: "Animal trepador" } },
          { id: "flying", speed: 20, names: { "pt-BR": "Animal Voador", en: "Flying Animal", es: "Animal volador" } },
          { id: "running", speed: 30, names: { "pt-BR": "Animal Corredor", en: "Running Animal", es: "Animal corredor" } },
          { id: "swimming_aquatic", speed: 0, swimSpeed: 30, traits: ["Aquático"], names: { "pt-BR": "Animal Nadador — Aquático", en: "Swimming Animal — Aquatic", es: "Animal nadador — Acuático" } },
          { id: "swimming_water_dwelling", speed: 20, swimSpeed: 20, names: { "pt-BR": "Animal Nadador — Semiaquático", en: "Swimming Animal — Water-dwelling", es: "Animal nadador — Semiacuático" } }
        ]
      }
    ],
    page: 22
  },
  "Centauro (Centaur)": {
    id: "ancestry.centaur", hp: 8, size: "Grande", speed: 30,
    senses: ["Visão na Penumbra"],
    boosts: ["Força", "Sabedoria", "Livre"], flaws: ["Carisma"],
    languages: ["Comum", "Feérico"], rarity: "uncommon",
    heritages: ["Centauro Orador Nascente", "Centauro Vento-Veloz", "Centauro Casco de Ferro", "Centauro Malhado", "Centauro Passo de Pônei", "Centauro Coração Robusto"],
    names: { "pt-BR": "Centauro", en: "Centaur", es: "Centauro" },
    summaries: { "pt-BR": "Nômade Grande, veloz e robusto, ligado à proteção da comunidade e da natureza.", en: "A Large, swift, and sturdy nomad devoted to community and the natural world.", es: "Un nómada Grande, veloz y robusto dedicado a su comunidad y al mundo natural." },
    page: 28
  },
  "Povo-Sereia (Merfolk)": {
    id: "ancestry.merfolk", hp: 8, size: "Médio", speed: 5, swimSpeed: 25,
    senses: ["Visão na Penumbra"],
    boosts: ["Destreza", "Carisma", "Livre"], flaws: ["Constituição"],
    languages: ["Comum", "Talássico"], rarity: "uncommon",
    heritages: ["Povo-Sereia Abissal", "Povo-Sereia Carcharodonte", "Povo-Sereia Pelágico", "Povo-Sereia de Recife", "Povo-Sereia Agulhão"],
    names: { "pt-BR": "Povo-Sereia", en: "Merfolk", es: "Sirénido" },
    summaries: { "pt-BR": "Povo anfíbio dos oceanos que combina graça aquática, canto e magia das águas.", en: "An amphibious ocean people combining aquatic grace, song, and water magic.", es: "Un pueblo oceánico anfibio que combina gracia acuática, canto y magia del agua." },
    page: 34
  },
  "Minotauro (Minotaur)": {
    id: "ancestry.minotaur", hp: 10, size: "Grande", speed: 25,
    senses: ["Visão no Escuro"],
    boosts: ["Força", "Constituição", "Livre"], flaws: ["Carisma"],
    languages: ["Comum", "Jotun"], rarity: "uncommon",
    heritages: ["Minotauro Touro Fantasma", "Minotauro da Caverna Glacial", "Minotauro Chifre Pequeno", "Minotauro Errante", "Minotauro Alma de Laje", "Minotauro Espreitador"],
    names: { "pt-BR": "Minotauro", en: "Minotaur", es: "Minotauro" },
    summaries: { "pt-BR": "Construtor e explorador Grande, resistente e dotado de chifres naturais.", en: "A Large, resilient builder and explorer armed with natural horns.", es: "Un constructor y explorador Grande y resistente, armado con cuernos naturales." },
    page: 40
  },
  "Surki": {
    id: "ancestry.surki", hp: 8, size: "Médio", speed: 25,
    senses: ["Visão no Escuro"],
    boosts: ["Constituição", "Livre"], flaws: [],
    languages: ["Comum", "Surki"], rarity: "rare",
    heritages: ["Surki Rompedor", "Surki Élitro", "Surki Carapaça Dura", "Surki Lanterna"],
    names: { "pt-BR": "Surki", en: "Surki", es: "Surki" },
    summaries: { "pt-BR": "Povo insetoide raro que absorve magia ambiental e desenvolve adaptações metamórficas.", en: "A rare insectile people who absorb ambient magic and develop metamorphic adaptations.", es: "Un pueblo insectoide raro que absorbe magia ambiental y desarrolla adaptaciones metamórficas." },
    page: 46
  }
};
Object.entries(HOWL_WILD_ANCESTRIES).forEach(([name, record]) => {
  PF2E_DATA.ancestries[name] = {
    ...record,
    description: record.summaries["pt-BR"],
    source: { book: HOWL_WILD_SOURCE, page: record.page },
    ruleset: "remaster",
    needs_review: false
  };
});

const BATTLECRY_SOURCE = "Battlecry! (Remaster)";
const BATTLECRY_ARCHETYPES = [
  {
    id: "archetype.commander_multiclass", name: "Comandante Multiclasse (Commander Multiclass)", page: 52,
    subtype: "multiclass", dedicationLevel: 2, prerequisites: ["Inteligência +2"],
    names: { "pt-BR": "Comandante Multiclasse", en: "Commander Multiclass", es: "Comandante multiclase" },
    summaries: { "pt-BR": "Dedicação para um estrategista que organiza táticas em um fólio e coordena aliados por meio de seu estandarte.", en: "A dedication for a strategist who organizes tactics in a folio and coordinates allies through a banner.", es: "Una dedicación para un estratega que organiza tácticas en un folio y coordina aliados mediante su estandarte." }
  },
  {
    id: "archetype.guardian_multiclass", name: "Guardião Multiclasse (Guardian Multiclass)", page: 53,
    subtype: "multiclass", dedicationLevel: 2, prerequisites: ["Força +2", "Constituição +2"],
    names: { "pt-BR": "Guardião Multiclasse", en: "Guardian Multiclass", es: "Guardián multiclase" },
    summaries: { "pt-BR": "Dedicação para um defensor resistente que amplia seu treinamento em armaduras e aprende a provocar adversários.", en: "A dedication for a resilient defender who expands armor training and learns to taunt enemies.", es: "Una dedicación para un defensor resistente que amplía su entrenamiento con armaduras y aprende a provocar adversarios." }
  },
  {
    id: "archetype.aldori_duelist", name: "Duelista Aldori (Aldori Duelist)", page: 54,
    subtype: "standard", dedicationLevel: 2, rarity: "uncommon", prerequisites: ["Treinado em armas marciais"],
    names: { "pt-BR": "Duelista Aldori", en: "Aldori Duelist", es: "Duelista Aldori" },
    summaries: { "pt-BR": "Tradição incomum de esgrima que desenvolve domínio técnico da espada de duelo Aldori.", en: "An uncommon sword-fighting tradition centered on technical mastery of the Aldori dueling sword.", es: "Una tradición de esgrima poco común centrada en el dominio técnico de la espada de duelo Aldori." }
  },
  {
    id: "archetype.crossbow_infiltrator", name: "Infiltrador de Besta (Crossbow Infiltrator)", page: 56,
    subtype: "standard", dedicationLevel: 2, prerequisites: ["Treinado em Furtividade"],
    names: { "pt-BR": "Infiltrador de Besta", en: "Crossbow Infiltrator", es: "Infiltrador de ballesta" },
    summaries: { "pt-BR": "Especialista furtivo que oculta bestas adaptadas e ataca com precisão durante infiltrações.", en: "A stealth specialist who conceals adapted crossbows and strikes precisely during infiltrations.", es: "Un especialista furtivo que oculta ballestas adaptadas y ataca con precisión durante infiltraciones." }
  },
  {
    id: "archetype.field_propagandist", name: "Propagandista de Campo (Field Propagandist)", page: 58,
    subtype: "standard", dedicationLevel: 2, rarity: "uncommon", prerequisites: ["Carisma +2", "Treinado em Diplomacia e Dissimulação"],
    names: { "pt-BR": "Propagandista de Campo", en: "Field Propagandist", es: "Propagandista de campo" },
    summaries: { "pt-BR": "Orador incomum que molda moral, influência e percepção pública em meio a conflitos.", en: "An uncommon orator who shapes morale, influence, and public perception amid conflict.", es: "Un orador poco común que moldea la moral, la influencia y la percepción pública durante los conflictos." }
  },
  {
    id: "archetype.guerrilla", name: "Guerrilheiro (Guerrilla)", page: 60,
    subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": "Guerrilheiro", en: "Guerrilla", es: "Guerrillero" },
    summaries: { "pt-BR": "Combatente irregular que usa terreno, mobilidade e ataques oportunos contra forças superiores.", en: "An irregular combatant who uses terrain, mobility, and opportunistic attacks against superior forces.", es: "Un combatiente irregular que usa el terreno, la movilidad y ataques oportunistas contra fuerzas superiores." }
  },
  {
    id: "archetype.iridian_choirmaster", name: "Mestre de Coro Iridiano (Iridian Choirmaster)", page: 62,
    subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": "Mestre de Coro Iridiano", en: "Iridian Choirmaster", es: "Maestro de coro iridiano" },
    summaries: { "pt-BR": "Líder musical que sincroniza vozes para sustentar aliados e transformar uma unidade em um coro disciplinado.", en: "A musical leader who synchronizes voices to support allies and turn a unit into a disciplined choir.", es: "Un líder musical que sincroniza voces para apoyar aliados y convertir una unidad en un coro disciplinado." }
  },
  {
    id: "archetype.munitions_master", name: "Mestre de Munições (Munitions Master)", page: 64,
    subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": "Mestre de Munições", en: "Munitions Master", es: "Maestro de municiones" },
    summaries: { "pt-BR": "Especialista de campo que prepara, adapta e distribui munições para responder às necessidades do combate.", en: "A field specialist who prepares, adapts, and distributes ammunition to meet combat needs.", es: "Un especialista de campo que prepara, adapta y distribuye municiones para responder a las necesidades del combate." }
  },
  {
    id: "archetype.necrologist", name: "Necrologista (Necrologist)", page: 66,
    subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": "Necrologista", en: "Necrologist", es: "Necrologista" },
    summaries: { "pt-BR": "Estudioso militar da morte que interpreta baixas, restos e fenômenos necromânticos em zonas de guerra.", en: "A military scholar of death who interprets casualties, remains, and necromantic phenomena in war zones.", es: "Un estudioso militar de la muerte que interpreta bajas, restos y fenómenos necrománticos en zonas de guerra." }
  },
  {
    id: "archetype.war_mage", name: "Mago de Guerra (War Mage)", page: 68,
    subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": "Mago de Guerra", en: "War Mage", es: "Mago de guerra" },
    summaries: { "pt-BR": "Conjurador treinado para aplicar magia sob pressão e cooperar com formações militares.", en: "A spellcaster trained to apply magic under pressure and operate with military formations.", es: "Un lanzador entrenado para aplicar magia bajo presión y colaborar con formaciones militares." }
  }
];
BATTLECRY_ARCHETYPES.forEach((record) => PF2E_DATA.archetypes.push({
  ...record, description: record.summaries["pt-BR"],
  source: { book: BATTLECRY_SOURCE, page: record.page }, ruleset: "remaster", needs_review: false
}));

PF2E_DATA.ancestries["Jotunnato (Jotunborn)"] = {
  id: "ancestry.jotunborn", hp: 10, size: "Grande", speed: 25,
  boosts: ["Força", "Sabedoria", "Livre"], flaws: ["Carisma"],
  languages: ["Comum", "Jotun"], rarity: "rare",
  heritages: ["Jotunnato Guardião", "Jotunnato Salta-Planos", "Jotunnato Sábio", "Jotunnato Guerreiro", "Jotunnato Tecelão"],
  description: "Descendente raro de titãs, criado para proteger lugares e fronteiras planares.",
  names: { "pt-BR": "Jotunnato", en: "Jotunborn", es: "Nacido jotun" },
  summaries: { "pt-BR": "Ancestralidade rara Grande com vigor de titã, tecelagem iivlar e conexão com fronteiras planares.", en: "A rare Large ancestry with titan strength, iivlar weaving, and a connection to planar boundaries.", es: "Una ascendencia rara Grande con fuerza de titán, tejido iivlar y conexión con fronteras planares." },
  source: { book: BATTLECRY_SOURCE, page: 10 }, ruleset: "remaster", needs_review: false
};

PF2E_DATA.classes["Comandante (Commander)"] = {
  id: "class.commander", hpPerLevel: 8, keyAbility: ["Inteligência"],
  perception: "Especialista",
  savingThrows: { fortitude: "Treinado", reflex: "Especialista", will: "Especialista" },
  armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Treinado" },
  weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
  classDc: "Treinado", subclasses: [],
  description: "Estrategista marcial que coordena aliados com táticas, sinais e comandos de campo.",
  names: { "pt-BR": "Comandante", en: "Commander", es: "Comandante" },
  summaries: { "pt-BR": "Especialista de Inteligência que lê o campo de batalha e amplia o potencial do grupo com táticas coordenadas.", en: "An Intelligence expert who reads the battlefield and raises the party's potential through coordinated tactics.", es: "Un experto de Inteligencia que lee el campo de batalla y potencia al grupo mediante tácticas coordinadas." },
  source: { book: BATTLECRY_SOURCE, page: 20 }, ruleset: "remaster", needs_review: false
};

PF2E_DATA.classes["Guardião (Guardian)"] = {
  id: "class.guardian", hpPerLevel: 12, keyAbility: ["Força"],
  perception: "Treinado",
  savingThrows: { fortitude: "Especialista", reflex: "Treinado", will: "Especialista" },
  armor: { "Sem Armadura": "Treinado", "Leve": "Treinado", "Média": "Treinado", "Pesada": "Treinado" },
  weapons: { "Simples": "Treinado", "Marcial": "Treinado", "Desarmado": "Treinado" },
  classDc: "Treinado", subclasses: [],
  description: "Defensor blindado que atrai ameaças, absorve golpes e protege aliados vulneráveis.",
  names: { "pt-BR": "Guardião", en: "Guardian", es: "Guardián" },
  summaries: { "pt-BR": "Defensor de Força com 12 PV por nível, domínio de todas as armaduras e recursos para manter ataques longe dos aliados.", en: "A Strength defender with 12 HP per level, training in all armor, and tools that keep attacks away from allies.", es: "Un defensor de Fuerza con 12 PG por nivel, dominio de todas las armaduras y recursos para alejar ataques de sus aliados." },
  source: { book: BATTLECRY_SOURCE, page: 36 }, ruleset: "remaster", needs_review: false
};

const BATTLECRY_BACKGROUNDS = [
  { id: "background.battle_mechanic", name: "Mecânico de Batalha (Battle Mechanic)", page: 16, ability: ["Inteligência", "Sabedoria"], skill: "crafting", lore: "Saber de Veículos", feat: "Reparo Rápido", rarity: "common", names: { "pt-BR": "Mecânico de Batalha", en: "Battle Mechanic", es: "Mecánico de batalla" }, summaries: { "pt-BR": "Você mantém veículos terrestres, aéreos e marítimos operando sob pressão.", en: "You keep land, air, and sea vehicles operating under pressure.", es: "Mantienes vehículos terrestres, aéreos y marítimos funcionando bajo presión." } },
  { id: "background.combat_carpenter", name: "Carpinteiro de Combate (Combat Carpenter)", page: 16, ability: ["Destreza", "Inteligência"], skill: "crafting", lore: "Saber de Engenharia", feat: "Manufatura Especializada", rarity: "common", names: { "pt-BR": "Carpinteiro de Combate", en: "Combat Carpenter", es: "Carpintero de combate" }, summaries: { "pt-BR": "Experiência com madeira permite reforçar construções e localizar seus pontos fracos.", en: "Your experience with wood lets you reinforce structures and find their weak points.", es: "Tu experiencia con madera te permite reforzar estructuras y localizar sus puntos débiles." } },
  { id: "background.combat_chaplain", name: "Capelão de Combate (Combat Chaplain)", page: 16, ability: ["Sabedoria", "Carisma"], skill: "religion", lore: "Saber da Divindade", feat: "Reconhecer Magia", rarity: "common", names: { "pt-BR": "Capelão de Combate", en: "Combat Chaplain", es: "Capellán de combate" }, summaries: { "pt-BR": "Você oferece apoio espiritual, mediação e ritos às tropas e suas famílias.", en: "You provide troops and their families with spiritual support, mediation, and rites.", es: "Ofreces apoyo espiritual, mediación y ritos a las tropas y sus familias." } },
  { id: "background.conscript", name: "Conscrito (Conscript)", page: 16, ability: ["Força", "Constituição"], skill: "society", lore: "Saber de Guerra", feat: "Conhecimento Duvidoso", rarity: "common", names: { "pt-BR": "Conscrito", en: "Conscript", es: "Recluta" }, summaries: { "pt-BR": "O serviço obrigatório ensinou a você estratégia suficiente para sobreviver ao campo de batalha.", en: "Mandatory service taught you enough strategy to survive the battlefield.", es: "El servicio obligatorio te enseñó suficiente estrategia para sobrevivir al campo de batalla." } },
  { id: "background.plague_doctor", name: "Médico da Peste (Plague Doctor)", page: 17, ability: ["Constituição", "Sabedoria"], skill: "medicine", lore: "Saber de Herbalismo", feat: "Inoculação", rarity: "common", names: { "pt-BR": "Médico da Peste", en: "Plague Doctor", es: "Médico de la peste" }, summaries: { "pt-BR": "Você combate doenças que se espalham entre cercos, fome e mortes em massa.", en: "You fight diseases that spread through sieges, famine, and mass casualties.", es: "Combates enfermedades que se propagan entre asedios, hambre y muertes masivas." } },
  { id: "background.quartermaster", name: "Intendente (Quartermaster)", page: 17, ability: ["Inteligência", "Carisma"], skill: "intimidation", lore: "Saber Jurídico", feat: "Olhar Intimidante", rarity: "common", names: { "pt-BR": "Intendente", en: "Quartermaster", es: "Intendente" }, summaries: { "pt-BR": "Logística e disciplina permitem manter tropas abastecidas e controlar recursos escassos.", en: "Logistics and discipline let you keep troops supplied and control scarce resources.", es: "La logística y la disciplina te permiten abastecer tropas y controlar recursos escasos." } },
  { id: "background.report_runner", name: "Estafeta de Guerra (Report Runner)", page: 17, ability: ["Força", "Sabedoria"], skill: "nature", lore: "Saber de Estábulos", feat: "Cavaleiro Expresso", rarity: "common", names: { "pt-BR": "Estafeta de Guerra", en: "Report Runner", es: "Correo de guerra" }, summaries: { "pt-BR": "Você transporta relatórios urgentes por longas distâncias e conhece bem montarias.", en: "You carry urgent reports across long distances and know mounts well.", es: "Transportas informes urgentes a largas distancias y conoces bien las monturas." } },
  { id: "background.veteran", name: "Veterano (Veteran)", page: 17, ability: ["Constituição", "Sabedoria"], skill: "athletics", lore: "Saber de Guerra", feat: "Auxiliar com Armadura", rarity: "common", names: { "pt-BR": "Veterano", en: "Veteran", es: "Veterano" }, summaries: { "pt-BR": "Muitas batalhas deram a você resistência, experiência e poucas ilusões sobre a guerra.", en: "Many battles left you resilient, experienced, and under no illusions about war.", es: "Muchas batallas te dejaron resistente, experimentado y sin ilusiones sobre la guerra." } },
  { id: "background.war_orphan", name: "Órfão de Guerra (War Orphan)", page: 17, ability: ["Destreza", "Constituição"], skill: "thievery", lore: "Saber do Submundo", feat: "Truque Sujo", rarity: "common", names: { "pt-BR": "Órfão de Guerra", en: "War Orphan", es: "Huérfano de guerra" }, summaries: { "pt-BR": "Sobreviver fora da lei após perder sua família deixou habilidades que você nunca esqueceu.", en: "Surviving outside the law after losing your family left skills you never forgot.", es: "Sobrevivir fuera de la ley tras perder a tu familia te dejó habilidades que nunca olvidaste." } },
  { id: "background.aeronaut", name: "Aeronauta (Aeronaut)", page: 17, ability: ["Força", "Destreza"], skill: "athletics", lore: "Saber de Pilotagem", feat: "Garantia (Pilotagem)", rarity: "uncommon", names: { "pt-BR": "Aeronauta", en: "Aeronaut", es: "Aeronauta" }, summaries: { "pt-BR": "Você domina balões, dirigíveis e outras máquinas voadoras de exploração e guerra.", en: "You master balloons, dirigibles, and other flying machines used in exploration and war.", es: "Dominas globos, dirigibles y otras máquinas voladoras de exploración y guerra." } },
  { id: "background.arcane_revolutionary", name: "Revolucionário Arcano (Arcane Revolutionary)", page: 17, ability: ["Destreza", "Inteligência"], skill: "arcana", lore: "Saber do Assentamento Libertado", feat: "Identificação Rápida", rarity: "uncommon", names: { "pt-BR": "Revolucionário Arcano", en: "Arcane Revolutionary", es: "Revolucionario arcano" }, summaries: { "pt-BR": "Magia e sabotagem ajudaram sua comunidade a enfrentar governantes opressores.", en: "Magic and sabotage helped your community resist oppressive rulers.", es: "La magia y el sabotaje ayudaron a tu comunidad a resistir gobernantes opresores." } },
  { id: "background.battlefield_scrounger", name: "Catador do Campo de Batalha (Battlefield Scrounger)", page: 17, ability: ["Força", "Inteligência"], skill: "crafting", lore: "Saber de Guerra", feat: "Improvisar Ferramenta", rarity: "uncommon", names: { "pt-BR": "Catador do Campo de Batalha", en: "Battlefield Scrounger", es: "Rebuscador del campo de batalla" }, summaries: { "pt-BR": "Você transforma restos de exércitos derrotados em ferramentas e itens aproveitáveis.", en: "You turn the remains of defeated armies into useful tools and items.", es: "Transformas los restos de ejércitos derrotados en herramientas y objetos útiles." } },
  { id: "background.martial_musician", name: "Músico Marcial (Martial Musician)", page: 17, ability: ["Destreza", "Carisma"], skill: "performance", lore: "Saber de Guerra", feat: "Performance Impressionante", rarity: "uncommon", names: { "pt-BR": "Músico Marcial", en: "Martial Musician", es: "Músico marcial" }, summaries: { "pt-BR": "Ritmos e sinais musicais permitem orientar tropas e sustentar seu avanço.", en: "Rhythm and musical signals let you direct troops and sustain their advance.", es: "El ritmo y las señales musicales te permiten dirigir tropas y sostener su avance." } }
];
BATTLECRY_BACKGROUNDS.forEach((record) => PF2E_DATA.backgrounds.push({
  ...record,
  source: { book: BATTLECRY_SOURCE, page: record.page },
  ruleset: "remaster",
  needs_review: false
}));

// Perfis de conjuração derivados das seções de classe dos livros já vinculados.
// Classes com tradição definida por patrono, linhagem ou eidolon exigem uma escolha na ficha.
const CLASS_SPELLCASTING_PROFILES = {
  "Bardo (Bard)": { traditionMode: "fixed", traditions: ["occult"], preparation: "spontaneous" },
  "Bruxo (Witch)": { traditionMode: "subclass-choice", traditions: ["arcane", "divine", "occult", "primal"], preparation: "prepared" },
  "Clérigo (Cleric)": { traditionMode: "fixed", traditions: ["divine"], preparation: "prepared" },
  "Convocador (Summoner)": { traditionMode: "subclass-choice", traditions: ["arcane", "divine", "occult", "primal"], preparation: "bounded" },
  "Druida (Druid)": { traditionMode: "fixed", traditions: ["primal"], preparation: "prepared" },
  "Feiticeiro (Sorcerer)": { traditionMode: "subclass-choice", traditions: ["arcane", "divine", "occult", "primal"], preparation: "spontaneous" },
  "Mago (Wizard)": { traditionMode: "fixed", traditions: ["arcane"], preparation: "prepared" },
  "Magus": { traditionMode: "fixed", traditions: ["arcane"], preparation: "bounded" },
  "Oráculo (Oracle)": { traditionMode: "fixed", traditions: ["divine"], preparation: "spontaneous" },
  "Psíquico (Psychic)": { traditionMode: "fixed", traditions: ["occult"], preparation: "spontaneous" },
  "Animista (Animist)": { traditionMode: "fixed", traditions: ["divine"], preparation: "prepared" }
};
Object.entries(CLASS_SPELLCASTING_PROFILES).forEach(([className, profile]) => {
  const classRecord = PF2E_DATA.classes[className];
  if (classRecord) classRecord.spellcasting = { ...profile, source: classRecord.source };
});

// Aliases e pontes de compatibilidade para expansões de livros
if (PF2E_DATA.classes["Exemplar"] && !PF2E_DATA.classes["Exemplar (Exemplar)"]) {
  PF2E_DATA.classes["Exemplar (Exemplar)"] = {
    ...PF2E_DATA.classes["Exemplar"],
    legacyAlias: true
  };
}
if (PF2E_DATA.ancestries["Povo-Sereia (Merfolk)"] && !PF2E_DATA.ancestries["Tritão / Sereia (Merfolk)"]) {
  PF2E_DATA.ancestries["Tritão / Sereia (Merfolk)"] = PF2E_DATA.ancestries["Povo-Sereia (Merfolk)"];
}
if (PF2E_DATA.ancestries["Surki"] && !PF2E_DATA.ancestries["Surki (Povo-Inseto)"]) {
  PF2E_DATA.ancestries["Surki (Povo-Inseto)"] = PF2E_DATA.ancestries["Surki"];
}
// Catálogo Oficial Expandido de Talentos (Feats)
PF2E_DATA.feats = [
// ==========================================
  // 1. TALENTOS GERAIS (GENERAL FEATS)
  // ==========================================
  {
    id: "feat.general.toughness",
    name: "Robustez (Toughness)",
    names: { "pt-BR": "Robustez", en: "Toughness", es: "Dureza" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você ganha PVs adicionais iguais ao seu nível e o valor da CD de testes de recuperação para a condição Morrendo é reduzido em 1.",
    summaries: {
      "pt-BR": "Ganha +1 PV por nível e reduz em 1 a CD de salvamento contra a morte.",
      en: "Gain +1 Max HP per level and reduce death recovery DC by 1.",
      es: "Gana +1 PG por nivel y reduce en 1 la CD de recuperación de muerte."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.fleet",
    name: "Movimento Rápido (Fleet)",
    names: { "pt-BR": "Movimento Rápido", en: "Fleet", es: "Pies veloces" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Sua Velocidade base em terra aumenta em +5 pés (1,5 metro).",
    summaries: {
      "pt-BR": "Aumenta seu deslocamento em terra em +5 pés.",
      en: "Increases your land Speed by +5 feet.",
      es: "Aumenta tu velocidad terrestre en +5 pies."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.incredible_initiative",
    name: "Iniciativa Incrível (Incredible Initiative)",
    names: { "pt-BR": "Iniciativa Incrível", en: "Incredible Initiative", es: "Iniciativa increíble" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você reage e se posiciona instantaneamente ao perigo, ganhando um bônus de circunstância de +2 em suas rolagens de iniciativa.",
    summaries: {
      "pt-BR": "+2 de bônus de circunstância em testes de iniciativa.",
      en: "+2 circumstance bonus to initiative rolls.",
      es: "+2 de bonificador por circunstancia a tiradas de iniciativa."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.diehard",
    name: "Duro de Matar (Diehard)",
    names: { "pt-BR": "Duro de Matar", en: "Diehard", es: "Difícil de matar" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Seu corpo se recusa a sucumbir facilmente. Você só morre ao atingir a condição Morrendo 5 (em vez de Morrendo 4).",
    summaries: {
      "pt-BR": "Você morre apenas em Morrendo 5 em vez de Morrendo 4.",
      en: "You die from the Dying condition at Dying 5 instead of Dying 4.",
      es: "Solo mueres al alcanzar la condición Moribundo 5."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.fast_recovery",
    name: "Recuperação Rápida (Fast Recovery)",
    names: { "pt-BR": "Recuperação Rápida", en: "Fast Recovery", es: "Recuperación rápida" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Constituição +2",
    description: "Você recupera o dobro de PV durante o descanso diário e tem bônus de +2 contra venenos e doenças.",
    summaries: {
      "pt-BR": "Recupera o dobro de PV descansando e ganha +2 em testes contra doenças e venenos.",
      en: "Recover twice HP during daily rest; +2 vs poisons and diseases.",
      es: "Recuperas el doble de PG al descansar; +2 contra venenos y enfermedades."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.shield_block",
    name: "Bloqueio com Escudo (Shield Block)",
    names: { "pt-BR": "Bloqueio com Escudo", en: "Shield Block", es: "Bloqueo con escudo" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    actions: "reaction",
    prereq: "Treinado com Escudos",
    description: "Gatilho: Você tem seu escudo erguido e sofre dano de um ataque físico. Efeito: Você e seu escudo sofrem o dano reduzido pela Dureza (Hardness) do escudo.",
    summaries: {
      "pt-BR": "[Reação] Absorve dano físico até a Dureza do escudo ao sofrer um ataque.",
      en: "[Reaction] Prevent physical damage up to shield's Hardness.",
      es: "[Reacción] Previene daño físico hasta la Dureza del escudo al ser atacado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.weapon_proficiency",
    name: "Treinamento com Armas Gerais (Weapon Proficiency)",
    names: { "pt-BR": "Treinamento com Armas", en: "Weapon Proficiency", es: "Competencia con armas" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você se torna Treinado em todas as armas simples ou marciais de acordo com a progressão da sua classe.",
    summaries: {
      "pt-BR": "Torna-se Treinado em armas marciais ou simples adicionais.",
      en: "Become Trained in simple or martial weapons.",
      es: "Te vuelves Entrenado en armas simples o marciales."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.armor_proficiency",
    name: "Treinamento com Armaduras Gerais (Armor Proficiency)",
    names: { "pt-BR": "Treinamento com Armaduras", en: "Armor Proficiency", es: "Competencia con armaduras" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você se torna Treinado na categoria de armadura seguinte (Leve, Média ou Pesada).",
    summaries: {
      "pt-BR": "Torna-se Treinado no próximo escalão de armaduras.",
      en: "Become Trained in the next armor category tier.",
      es: "Te vuelves Entrenado en la siguiente categoría de armaduras."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.canny_acumen",
    name: "Percepção Astuta (Canny Acumen)",
    names: { "pt-BR": "Percepção Astuta", en: "Canny Acumen", es: "Agudeza perspicaz" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Escolha Percepção, Fortitude, Reflexos ou Vontade. Sua proficiência nessa estatística se torna Especialista no nível 1 e Mestre no nível 17.",
    summaries: {
      "pt-BR": "Torna-se Especialista em uma salvaguarda ou Percepção (Mestre no nv 17).",
      en: "Become Expert in a save or Perception (Master at lvl 17).",
      es: "Te vuelves Experto en una salvación o Percepción (Maestro a nv 17)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.adopted_ancestry",
    name: "Ancestralidade Adotada (Adopted Ancestry)",
    names: { "pt-BR": "Ancestralidade Adotada", en: "Adopted Ancestry", es: "Ascendencia adoptada" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você foi criado por membros de outra ancestralidade. Você pode selecionar talentos ancestrais da ancestralidade adotada.",
    summaries: {
      "pt-BR": "Permite escolher talentos da ancestralidade na qual foi criado.",
      en: "Select ancestry feats from your adopted ancestry.",
      es: "Te permite elegir dotes de tu ascendencia adoptiva."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.ancestral_paragon",
    name: "Paragão Ancestral (Ancestral Paragon)",
    names: { "pt-BR": "Paragão Ancestral", en: "Ancestral Paragon", es: "Paragón ancestral" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você canaliza o legado completo de seu povo, ganhando 1 talento ancestral de 1º nível adicional.",
    summaries: {
      "pt-BR": "Ganha 1 talento ancestral adicional de 1º nível.",
      en: "Gain an additional 1st-level ancestry feat.",
      es: "Ganas una dote de ascendencia de nivel 1 adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.breath_control",
    name: "Controle da Respiração (Breath Control)",
    names: { "pt-BR": "Controle da Respiração", en: "Breath Control", es: "Control de la respiración" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você consegue prender o fôlego 25 vezes mais tempo que o normal e ganha +1 em salvamentos contra venenos inalados e sufocamento.",
    summaries: {
      "pt-BR": "Prende o fôlego 25x mais tempo e +1 contra sufocamento e gás.",
      en: "Hold breath 25x longer; +1 circumstance bonus vs inhaled poisons.",
      es: "Aguantas la respiración 25 veces más tiempo y +1 contra asfixia."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.feather_step",
    name: "Passo de Pluma (Feather Step)",
    names: { "pt-BR": "Passo de Pluma", en: "Feather Step", es: "Paso ligero" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Destreza +2",
    description: "Você pode dar Passo de Ajuste (Step) em terrenos difíceis sem ser impedido pelo piso instável.",
    summaries: {
      "pt-BR": "Permite dar Passo de Ajuste em terrenos difíceis.",
      en: "Step into difficult terrain without impediment.",
      es: "Te permite dar un Paso en terreno difícil."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.ride",
    name: "Montaria (Ride)",
    names: { "pt-BR": "Montaria", en: "Ride", es: "Montar" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você comanda montarias e animais de sela sem precisar fazer testes de Natureza em situações de combate rotineiras.",
    summaries: {
      "pt-BR": "Comanda animais de montaria sem testes em situações usuais.",
      en: "Automatically succeed at routine Command an Animal mounted checks.",
      es: "Monta y dirige criaturas sin tiradas de dificultad en combate común."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.untrained_improvisation",
    name: "Improvisação Destreinada (Untrained Improvisation)",
    names: { "pt-BR": "Improvisação Destreinada", en: "Untrained Improvisation", es: "Improvisación no entrenada" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você adiciona metade do seu nível como bônus de proficiência em todas as perícias destreinadas (nível completo a partir do nível 7).",
    summaries: {
      "pt-BR": "Adiciona metade do nível (ou nível total no nv 7) a testes destreinados.",
      en: "Add half your level (full level at 7th) to untrained skill checks.",
      es: "Suma la mitad de tu nivel a habilidades no entrenadas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.prescient_planner",
    name: "Planejador Clarividente (Prescient Planner)",
    names: { "pt-BR": "Planejador Clarividente", en: "Prescient Planner", es: "Planificador presciente" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você antecipa suas necessidades e pode gastar 1 minuto para 'lembrar' que comprou um item comum de preço acessível na última cidade.",
    summaries: {
      "pt-BR": "Gasta 1 minuto para produzir um item comum essencial da mochila.",
      en: "Spend 1 minute to produce an essential mundane item you prepared.",
      es: "Saca un objeto común esencial de tu mochila como si lo hubieras previsto."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.prescient_consumable",
    name: "Consumível Clarividente (Prescient Consumable)",
    names: { "pt-BR": "Consumível Clarividente", en: "Prescient Consumable", es: "Consumible presciente" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Planejador Clarividente",
    description: "Seu Planejador Clarividente agora pode ser usado para obter poções, elixires, pergaminhos ou outros itens consumíveis comuns.",
    summaries: {
      "pt-BR": "Permite usar Planejador Clarividente para poções e pergaminhos.",
      en: "Use Prescient Planner to produce consumable items and scrolls.",
      es: "Permite usar Planificador presciente para pociones y pergaminos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.incredible_scout",
    name: "Batedor Incrível (Incredible Scout)",
    names: { "pt-BR": "Batedor Incrível", en: "Incredible Scout", es: "Explorador increíble" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Mestre em Percepção",
    description: "Ao liderar o grupo em Exploração como Batedor (Scout), o bônus de iniciativa concedido aos seus aliados aumenta para +2.",
    summaries: {
      "pt-BR": "Aumenta o bônus de iniciativa de Batedor para +2 a todos os aliados.",
      en: "Increases Scout exploration initiative bonus to +2 for all allies.",
      es: "Aumenta el bonificador de iniciativa de Explorador a +2 para aliados."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.true_perception",
    name: "Sentidos Aguçados / Percepção Verdadeira (True Perception)",
    names: { "pt-BR": "Sentidos Aguçados", en: "True Perception", es: "Percepción verdadera" },
    category: "Geral",
    level: 19,
    traits: ["Geral"],
    prereq: "Lendário em Percepção",
    description: "Seus sentidos enxergam a realidade como ela é sob o efeito contínuo de Visão da Verdade (True Seeing) de 6º nível.",
    summaries: {
      "pt-BR": "Ganha visão da verdade contínua contra ilusões e transfigurações.",
      en: "Gain constant 6th-rank true seeing to pierce illusions and morphs.",
      es: "Ganas visión verdadera constante contra ilusiones y polimorfias."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 258 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.expeditious_search",
    name: "Busca Rápida (Expeditious Search)",
    names: { "pt-BR": "Busca Rápida", en: "Expeditious Search", es: "Búsqueda rápida" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Mestre em Percepção",
    description: "Você vasculha salas e corredores na metade do tempo usual durante o modo de Exploração.",
    summaries: {
      "pt-BR": "Vasculha áreas na metade do tempo padrão.",
      en: "Search areas in half the standard exploration time.",
      es: "Registra habitaciones y áreas en la mitad del tiempo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 258 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 2. TALENTOS DE PERÍCIA (SKILL FEATS)
  // ==========================================
  // --- Acrobacia ---
  {
    id: "feat.skill.cat_fall",
    name: "Queda Felina (Cat Fall)",
    names: { "pt-BR": "Queda Felina", en: "Cat Fall", es: "Caída de gato" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Acrobacia",
    description: "Você aterrissa com perfeição e trata quedas como se fossem 10 pés mais curtas (25 pés se Especialista, 50 pés se Mestre, e sem dano em qualquer altura se Lendário).",
    summaries: {
      "pt-BR": "Reduz ou anula totalmente dano sofrido por quedas.",
      en: "Treat falls as shorter; take no damage from any fall at Legendary rank.",
      es: "Reduce o anula totalmente el daño por caídas según tu competencia."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.steady_balance",
    name: "Equilíbrio Firme (Steady Balance)",
    names: { "pt-BR": "Equilíbrio Firme", en: "Steady Balance", es: "Equilibrio firme" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Acrobacia",
    description: "Você mantém o equilíbrio em superfícies estreitas e escorregadias; sucessos ao Equilibrar contam como Sucesso Crítico.",
    summaries: {
      "pt-BR": "Facilita equilibrar-se em cordas e beirais sem cair.",
      en: "Improves balance checks on narrow or slippery surfaces.",
      es: "Mejora las pruebas para mantener el equilibrio en salientes estrechos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.nimble_crawl",
    name: "Rastejo Ágil (Nimble Crawl)",
    names: { "pt-BR": "Rastejo Ágil", en: "Nimble Crawl", es: "Reptar ágil" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Acrobacia",
    description: "Você rasteja na metade de sua Velocidade em terra (ou Velocidade total se for Mestre) e pode dar Passo de Ajuste rastejando.",
    summaries: {
      "pt-BR": "Rasteja com grande velocidade e sem atrair ataques.",
      en: "Crawl at half (or full) speed and Step while prone.",
      es: "Reptas mucho más rápido y puedes dar Pasos estando derribado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.kip_up",
    name: "Levantar de Salto (Kip Up)",
    names: { "pt-BR": "Levantar de Salto", en: "Kip Up", es: "Salto de recuperación" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    actions: "free",
    prereq: "Mestre em Acrobacia",
    description: "[Ação Livre] Você fica de pé instantaneamente a partir da posição Caído sem gastar ações e sem provocar reações como Golpe Reativo.",
    summaries: {
      "pt-BR": "[Ação Livre] Levanta-se do chão sem gastar ações e sem provocar reações.",
      en: "[Free Action] Stand up from prone instantly without triggering reactions.",
      es: "[Acción Gratuita] Ponte de pie al instante sin provocar reacciones."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.graceful_leaper",
    name: "Saltador Gracioso (Graceful Leaper)",
    names: { "pt-BR": "Saltador Gracioso", en: "Graceful Leaper", es: "Saltador grácil" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Acrobacia",
    description: "Você pode rolar testes de Acrobacia no lugar de Atletismo para Salto em Altura e Salto em Distância.",
    summaries: {
      "pt-BR": "Usa Acrobacia para saltar em vez de Atletismo.",
      en: "Use Acrobatics instead of Athletics when jumping.",
      es: "Usa Acrobacias en lugar de Atletismo para saltar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Atletismo ---
  {
    id: "feat.skill.combat_climber",
    name: "Escalador de Combate (Combat Climber)",
    names: { "pt-BR": "Escalador de Combate", en: "Combat Climber", es: "Escalador de combate" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você não fica Desprevenido ao escalar e precisa de apenas uma mão livre para escalar superfícies.",
    summaries: {
      "pt-BR": "Escala com apenas uma mão e não fica Desprevenido.",
      en: "Climb with one hand free without being off-guard.",
      es: "Escala con una mano libre y sin quedar desprevenido."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.hefty_hauler",
    name: "Carregador Robusto (Hefty Hauler)",
    names: { "pt-BR": "Carregador Robusto", en: "Hefty Hauler", es: "Portador fornido" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Seus limites de Carga Máxima e de Sobrecarga aumentam em +2 Bulk.",
    summaries: {
      "pt-BR": "Aumenta o limite de Carga e Sobrecarga em +2 Bulk.",
      en: "Increases your Bulk carrying limits by 2.",
      es: "Aumenta tus límites de volumen y sobrecarga en +2 Bulk."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.powerful_leap",
    name: "Salto Poderoso (Powerful Leap)",
    names: { "pt-BR": "Salto Poderoso", en: "Powerful Leap", es: "Salto poderoso" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Quando você Salta (Leap), a distância horizontal do seu salto aumenta em +5 pés e você pode pular 5 pés mais alto verticalmente.",
    summaries: {
      "pt-BR": "Aumenta o alcance horizontal e vertical de todos os seus saltos.",
      en: "Increases horizontal and vertical Leap distance by +5 ft.",
      es: "Aumenta la distancia horizontal y vertical de tus saltos en +5 pies."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_jump",
    name: "Salto Rápido (Quick Jump)",
    names: { "pt-BR": "Salto Rápido", en: "Quick Jump", es: "Salto rápido" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Atletismo",
    description: "Você pode realizar Salto em Altura ou Salto em Distância como uma ação única em vez de gastar 2 ações para pegar impulso.",
    summaries: {
      "pt-BR": "[1 Ação] Executa saltos longos e altos com 1 ação sem precisar de impulso prévio.",
      en: "[1 Action] High Jump or Long Jump as a single action without stride prep.",
      es: "[1 Acción] Realiza Salto de altura o longitud con 1 sola acción."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.titan_wrestler",
    name: "Lutador de Titãs (Titan Wrestler)",
    names: { "pt-BR": "Lutador de Titãs", en: "Titan Wrestler", es: "Luchador de titanes" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você pode Agarrar, Empurrar ou Derrubar criaturas até dois tamanhos maiores que você (três tamanhos se for Lendário).",
    summaries: {
      "pt-BR": "Permite agarrar e derrubar criaturas muito maiores que você.",
      en: "Disarm, Grapple, Shove, or Trip creatures up to two sizes larger.",
      es: "Agarra y derriba criaturas hasta dos tamaños mayores que tú."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.underwater_marauder",
    name: "Espreitador Subaquático (Underwater Marauder)",
    names: { "pt-BR": "Espreitador Subaquático", en: "Underwater Marauder", es: "Merodeador subacuático" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você não fica Desprevenido sob a água e não sofre penalidades em ataques corpo a corpo subaquáticos com armas de concussão ou corte.",
    summaries: {
      "pt-BR": "Luta debaixo d'água sem penalidades de ataque ou CA.",
      en: "Fight underwater without being off-guard or suffering melee penalties.",
      es: "Combate bajo el agua sin penalizaciones cuerpo a cuerpo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.cloud_jump",
    name: "Salto nas Nuvens (Cloud Jump)",
    names: { "pt-BR": "Salto nas Nuvens", en: "Cloud Jump", es: "Salto en las nubes" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia"],
    prereq: "Lendário em Atletismo",
    description: "A distância do seu Salto em Distância é multiplicada por três e a CD de saltos em altura é reduzida dramaticamente.",
    summaries: {
      "pt-BR": "Multiplica seus saltos em distância por 3 alcançando alturas absurdas.",
      en: "Triple the distance of Long Jumps and leap immense heights.",
      es: "Multiplica la distancia de tus saltos largos por tres."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Manufatura (Crafting) ---
  {
    id: "feat.skill.alchemical_crafting",
    name: "Manufatura Alquímica (Alchemical Crafting)",
    names: { "pt-BR": "Manufatura Alquímica", en: "Alchemical Crafting", es: "Artesanía alquímica" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você pode Manufaturar itens alquímicos como bombas, elixires, antídotos e venenos conhecendo suas fórmulas.",
    summaries: {
      "pt-BR": "Permite criar itens e elixires alquímicos.",
      en: "Allows crafting of alchemical items and formulas.",
      es: "Permite fabricar objetos alquímicos y elixires."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_repair",
    name: "Reparo Rápido (Quick Repair)",
    names: { "pt-BR": "Reparo Rápido", en: "Quick Repair", es: "Reparación rápida" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você repara itens danificados em 1 minuto em vez de 10 minutos (3 ações se Mestre, 1 ação se Lendário).",
    summaries: {
      "pt-BR": "Conserta escudos e armas em apenas 1 minuto (ou 1 ação no nv 15).",
      en: "Repair damaged items in 1 minute (or 1 action at Legendary).",
      es: "Repara escudos y armas en 1 minuto (o 1 acción a nv 15)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.magical_crafting",
    name: "Manufatura Mágica (Magical Crafting)",
    names: { "pt-BR": "Manufatura Mágica", en: "Magical Crafting", es: "Artesanía mágica" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Manufatura",
    description: "Você aprende as técnicas arcanas e rituais necessários para criar itens mágicos, poções, pergaminhos e armas encantadas.",
    summaries: {
      "pt-BR": "Permite fabricar itens mágicos, runas, poções e varinhas.",
      en: "Allows crafting of magic items, runes, potions, and wands.",
      es: "Permite fabricar objetos mágicos, runas, pociones y varitas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.snare_crafting",
    name: "Manufatura de Armadilhas (Snare Crafting)",
    names: { "pt-BR": "Manufatura de Armadilhas", en: "Snare Crafting", es: "Artesanía de trampas" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você pode criar armadilhas táticas e arapucas usando a perícia Manufatura.",
    summaries: {
      "pt-BR": "Permite construir armadilhas táticas de caça e emboscada.",
      en: "Allows crafting snares and tactical traps.",
      es: "Permite fabricar trampas y lazos tácticos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.inventor",
    name: "Inventor (Inventor)",
    names: { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Manufatura",
    description: "Você pode criar fórmulas para novos itens ou itens raros mesmo sem ter um exemplo prévio para copiar.",
    summaries: {
      "pt-BR": "Cria fórmulas originais de itens sem precisar comprá-las.",
      en: "Create formulas for items from scratch during downtime.",
      es: "Crea fórmulas de objetos desde cero durante el tiempo libre."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Medicina ---
  {
    id: "feat.skill.battle_medicine",
    name: "Medicina de Batalha (Battle Medicine)",
    names: { "pt-BR": "Medicina de Batalha", en: "Battle Medicine", es: "Medicina de batalla" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Cura", "Manipulação"],
    actions: 1,
    prereq: "Treinado em Medicina",
    description: "Você remenda rapidamente ferimentos de um aliado durante o combate. Faça um teste de Medicina para Tratar Ferimentos como uma ação única, restaurando PV imediatamente uma vez por dia por criatura.",
    summaries: {
      "pt-BR": "[1 Ação] Restaura PV de um aliado adjacente usando Medicina em pleno combate.",
      en: "[1 Action] Restore ally HP in combat using Medicine skill.",
      es: "[1 Acción] Cura los PG de un aliado en combate usando Medicina."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 247 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.continual_recovery",
    name: "Recuperação Contínua (Continual Recovery)",
    names: { "pt-BR": "Recuperação Contínua", en: "Continual Recovery", es: "Recuperación continua" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Medicina",
    description: "Você reduz o tempo de espera para Tratar Ferimentos de 1 hora para apenas 10 minutos por criatura.",
    summaries: {
      "pt-BR": "Permite Tratar Ferimentos a cada 10 minutos em vez de 1 hora.",
      en: "Treat Wounds cooldown reduced from 1 hour to 10 minutes.",
      es: "Reduce el tiempo de espera de Tratar heridas a 10 minutos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.ward_medic",
    name: "Tratamento de Emergência Múltiplo (Ward Medic)",
    names: { "pt-BR": "Tratamento de Emergência Múltiplo", en: "Ward Medic", es: "Médico de guardia" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Medicina",
    description: "Você pode Tratar Ferimentos em até 2 pacientes simultaneamente (4 se Mestre, 8 se Lendário).",
    summaries: {
      "pt-BR": "Trata ferimentos de 2 ou mais criaturas ao mesmo tempo.",
      en: "Treat Wounds on 2+ targets simultaneously.",
      es: "Trata heridas a 2 o más criaturas a la vez."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.treat_condition",
    name: "Tratar Condição (Treat Condition)",
    names: { "pt-BR": "Tratar Condição", en: "Treat Condition", es: "Tratar condición" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Medicina",
    description: "Você reduz a gravidade de condições debilitantes como Apanhado, Enfeitiçado, Fadigado ou Envenenado com um teste rápido de Medicina.",
    summaries: {
      "pt-BR": "Reduz valores de condições negativas como Enjoado ou Amedrontado.",
      en: "Reduce the value of a condition affecting an ally.",
      es: "Reduce el valor de una condición perjudicial en un aliado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.risky_surgery",
    name: "Cirurgia Arriscada (Risky Surgery)",
    names: { "pt-BR": "Cirurgia Arriscada", en: "Risky Surgery", es: "Cirugía arriesgada" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Medicina",
    description: "Você causa 1d8 de dano cortante ao paciente antes de Tratar Ferimentos para ganhar +2 de bônus e transformar um Sucesso em Sucesso Crítico.",
    summaries: {
      "pt-BR": "Causa 1d8 de dano no paciente em troca de bônus +2 e cura crítica.",
      en: "Deal 1d8 damage to patient for +2 bonus and auto-crit on success.",
      es: "Inflige 1d8 daño para ganar +2 y convertir éxito en crítico al curar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Intimidação ---
  {
    id: "feat.skill.intimidating_glare",
    name: "Olhar Intimidador (Intimidating Glare)",
    names: { "pt-BR": "Olhar Intimidador", en: "Intimidating Glare", es: "Mirada intimidatoria" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Visual"],
    prereq: "Treinado em Intimidação",
    description: "Você pode Desmoralizar um inimigo com um mero olhar ameaçador sem precisar falar sua língua e sem o traço auditivo.",
    summaries: {
      "pt-BR": "Permite Desmoralizar sem falar e sem penalidade de idioma.",
      en: "Demoralize with a visual glare, removing auditory and language requirements.",
      es: "Desmoraliza con la mirada sin necesidad de hablar el mismo idioma."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_coercion",
    name: "Coerção Rápida (Quick Coercion)",
    names: { "pt-BR": "Coerção Rápida", en: "Quick Coercion", es: "Coacción rápida" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Intimidação",
    description: "Você pode Coagir um alvo com ameaças imediatas em apenas alguns segundos ou 1 rodada em vez de minutos.",
    summaries: {
      "pt-BR": "Coage alvos em segundos durante diálogos tensos.",
      en: "Coerce a target in rounds instead of minutes.",
      es: "Coacciona objetivos en segundos durante una conversación."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.battle_cry",
    name: "Grito de Batalha (Battle Cry)",
    names: { "pt-BR": "Grito de Batalha", en: "Battle Cry", es: "Grito de batalla" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    actions: "free",
    prereq: "Mestre em Intimidação",
    description: "Ao rolar iniciativa no início do combate, você pode imediatamente usar Desmoralizar como uma ação livre contra um adversário visível.",
    summaries: {
      "pt-BR": "[Ação Livre] Usa Desmoralizar imediatamente ao rolar iniciativa.",
      en: "[Free Action] Demoralize as a free action when rolling initiative.",
      es: "[Acción Gratuita] Desmoraliza gratis al tirar iniciativa."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.scare_to_death",
    name: "Assustar até a Morte (Scare to Death)",
    names: { "pt-BR": "Assustar até a Morte", en: "Scare to Death", es: "Matar del susto" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia", "Morte", "Medo", "Mental"],
    actions: 1,
    prereq: "Lendário em Intimidação",
    description: "Você apavora tanto uma criatura que o coração dela pode parar. Sucesso Crítico: o alvo morre instantaneamente (se CD de Fortitude falhar) ou fica Aterrorizado 2.",
    summaries: {
      "pt-BR": "[1 Ação] Intimidação letal que pode matar o alvo de medo em acerto crítico.",
      en: "[1 Action] Lethal intimidation that can kill a target with fright on a critical success.",
      es: "[1 Acción] Intimidación letal que puede matar a un enemigo de puro miedo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Diplomacia ---
  {
    id: "feat.skill.bon_mot",
    name: "Palavra Mordaz (Bon Mot)",
    names: { "pt-BR": "Palavra Mordaz", en: "Bon Mot", es: "Palabra mordaz" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Auditivo", "Concentração", "Emocional", "Linguístico", "Mental"],
    actions: 1,
    prereq: "Treinado em Diplomacia",
    description: "Você destrói a compostura de um adversário com uma tirada espirituosa ou insulto refinado. Teste de Diplomacia vs CD de Vontade: sucesso impõe -2 de penalidade de status na Percepção e salvamentos de Vontade por 1 minuto.",
    summaries: {
      "pt-BR": "[1 Ação] Diplomacia vs Vontade para impor -2 em Percepção e salvamentos de Vontade.",
      en: "[1 Action] Diplomacy vs Will DC to impose -2 on Perception and Will saves.",
      es: "[1 Acción] Diplomacia vs CD de Voluntad para imponer -2 en Percepción y Voluntad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.group_impression",
    name: "Impressão em Grupo (Group Impression)",
    names: { "pt-BR": "Impressão em Grupo", en: "Group Impression", es: "Impresión en grupo" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Diplomacia",
    description: "Ao Causar Boa Impressão, você pode afetar até 2 alvos ao mesmo tempo (4 se for Especialista, 10 se Mestre, 25 se Lendário).",
    summaries: {
      "pt-BR": "Melhora a atitude de múltiplos interlocutores simultaneamente.",
      en: "Make an Impression on multiple targets at once.",
      es: "Causa buena impresión a varios objetivos al mismo tiempo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.shameless_request",
    name: "Pedido Descarado (Shameless Request)",
    names: { "pt-BR": "Pedido Descarado", en: "Shameless Request", es: "Petición descarada" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Diplomacia",
    description: "Você pede favores absurdos e reduz a penalidade de pedidos escandalosos para apenas -2 na CD de Diplomacia.",
    summaries: {
      "pt-BR": "Reduz drasticamente a dificuldade de pedir favores quase impossíveis.",
      en: "Reduce penalties when making outrageous diplomatic requests.",
      es: "Reduce penalizaciones al pedir favores casi imposibles."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Furtividade & Ladinagem ---
  {
    id: "feat.skill.terrain_stalker",
    name: "Espreitador do Terreno (Terrain Stalker)",
    names: { "pt-BR": "Espreitador do Terreno", en: "Terrain Stalker", es: "Acechador del terreno" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Furtividade",
    description: "Escolha escombros, neve ou vegetação rasteira. Você se esgueira por esse terreno sem precisar rolar testes para passar despercebido.",
    summaries: {
      "pt-BR": "Esgueira-se em silêncio absoluto no tipo de terreno escolhido.",
      en: "Sneak automatically through chosen terrain without checks.",
      es: "Te mueves en sigilo automático en el terreno elegido."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.swift_sneak",
    name: "Furtividade Rápida (Swift Sneak)",
    names: { "pt-BR": "Furtividade Rápida", en: "Swift Sneak", es: "Sigilo rápido" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Furtividade",
    description: "Você pode se Esgueirar (Sneak) usando sua Velocidade total em terra em vez de metade do deslocamento.",
    summaries: {
      "pt-BR": "Permite esgueirar-se em silêncio com deslocamento total.",
      en: "Sneak at your full land Speed instead of half Speed.",
      es: "Te mueves en sigilo a tu velocidad completa."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.legendary_sneak",
    name: "Furtividade Lendária (Legendary Sneak)",
    names: { "pt-BR": "Furtividade Lendária", en: "Legendary Sneak", es: "Sigilo legendario" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia"],
    prereq: "Lendário em Furtividade",
    description: "Você pode se esconder e se esgueirar em plena vista e sem cobertura ou camuflagem.",
    summaries: {
      "pt-BR": "Esconde-se e esgueira-se sem precisar de cobertura ou sombra.",
      en: "Hide and Sneak even in plain sight without cover.",
      es: "Ocultarse y moverse en sigilo a plena vista sin cobertura."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.pickpocket",
    name: "Bater Carteira (Pickpocket)",
    names: { "pt-BR": "Bater Carteira", en: "Pickpocket", es: "Carterista" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Ladinagem",
    description: "Você pode Furtar objetos guardados de uma criatura que esteja atenta sem sofrer a penalidade usual de -5.",
    summaries: {
      "pt-BR": "Furta objetos pequenos sem penalidade mesmo sob atenção.",
      en: "Steal closely guarded objects without the standard -5 penalty.",
      es: "Roba objetos vigilados sin la penalización usual de -5."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_unlock",
    name: "Destrancar Rápido (Quick Unlock)",
    names: { "pt-BR": "Destrancar Rápido", en: "Quick Unlock", es: "Abrir rápido" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Especialista em Ladinagem",
    description: "Você Arromba Fechaduras com apenas 1 ação em vez de gastar 2 ações completas.",
    summaries: {
      "pt-BR": "[1 Ação] Arromba fechaduras em combate como 1 ação rápida.",
      en: "[1 Action] Pick locks as a single action instead of 2.",
      es: "[1 Acción] Fuerza cerraduras con 1 sola acción en combate."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Conhecimento & Mágica ---
  {
    id: "feat.skill.additional_lore",
    name: "Conhecimento Adicional (Additional Lore)",
    names: { "pt-BR": "Conhecimento Adicional", en: "Additional Lore", es: "Saber adicional" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Nenhum",
    description: "Você se torna Treinado em um Saber (Lore) de sua escolha. Essa perícia escala automaticamente para Especialista no nv 3, Mestre no nv 7 e Lendário no nv 15.",
    summaries: {
      "pt-BR": "Ganha um subcampo de Saber que sobe de nível automaticamente até Lendário.",
      en: "Gain a Lore subcategory that automatically scales up to Legendary rank.",
      es: "Ganas un Saber que escala automáticamente hasta rango Legendario."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.trick_magic_item",
    name: "Trucar Item Mágico (Trick Magic Item)",
    names: { "pt-BR": "Trucar Item Mágico", en: "Trick Magic Item", es: "Trucar objeto mágico" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Arcana, Natureza, Ocultismo ou Religião",
    description: "Você emula a tradição mágica necessária para ativar varinhas, pergaminhos e itens mágicos que normalmente não poderia usar.",
    summaries: {
      "pt-BR": "Ativa itens mágicos, cajados e pergaminhos de qualquer tradição.",
      en: "Emulate magic traditions to activate wands, scrolls, and staves.",
      es: "Emula tradiciones para activar varitas y pergaminos que no dominas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 253 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.assurance",
    name: "Garantia de Perícia (Assurance)",
    names: { "pt-BR": "Garantia de Perícia", en: "Assurance", es: "Garantía de habilidad" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Fortuna"],
    prereq: "Treinado na perícia escolhida",
    description: "Escolha uma perícia na qual seja treinado. Você pode optar por obter 10 + seu bônus de proficiência sem rolar o d20 e ignorando penalidades.",
    summaries: {
      "pt-BR": "Garante resultado 10 + proficiência sem rolar o d20 e sem penalidades.",
      en: "Take a fixed result of 10 + proficiency bonus, ignoring penalties.",
      es: "Obtén un resultado fijo de 10 + competencia ignorando penalizadores."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 253 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 3. TALENTOS ANCESTRAIS (ANCESTRY FEATS)
  // ==========================================
  // --- Humano ---
  {
    id: "feat.ancestry.natural_ambition",
    name: "Ambição Natural (Natural Ambition)",
    names: { "pt-BR": "Ambição Natural", en: "Natural Ambition", es: "Ambición natural" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha um talento de classe de 1º nível adicional.",
    summaries: {
      "pt-BR": "Concede 1 talento de classe de nível 1 adicional.",
      en: "Gain an additional 1st-level class feat.",
      es: "Ganas una dote de clase de nivel 1 adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.general_training",
    name: "Treinamento Versátil (General Training)",
    names: { "pt-BR": "Treinamento Versátil", en: "General Training", es: "Entrenamiento general" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha um talento geral de 1º nível de sua escolha.",
    summaries: {
      "pt-BR": "Concede 1 talento geral de 1º nível à sua escolha.",
      en: "Gain a 1st-level general feat of your choice.",
      es: "Ganas una dote general de nivel 1 a tu elección."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.clever_improviser",
    name: "Improvisador Esperto (Clever Improviser)",
    names: { "pt-BR": "Improvisador Esperto", en: "Clever Improviser", es: "Improvisador astuto" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 5,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha o talento Improvisação Destreinada e pode tentar testes de perícias treinadas mesmo sem ser treinado nelas.",
    summaries: {
      "pt-BR": "Tenta ações restritas a treinados mesmo sem treino.",
      en: "Attempt trained actions with untrained skills.",
      es: "Intenta acciones que requieren entrenamiento en cualquier habilidad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 45 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.unconventional_weaponry",
    name: "Armamento Incomum (Unconventional Weaponry)",
    names: { "pt-BR": "Armamento Incomum", en: "Unconventional Weaponry", es: "Armamento poco convencional" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Escolha uma arma incomum de 1º nível ou arma com traço ancestral. Ela passa a contar como arma simples para você.",
    summaries: {
      "pt-BR": "Adquire proficiência com uma arma exótica ou incomum.",
      en: "Gain proficiency with an uncommon or ancestral weapon.",
      es: "Ganas competencia con un arma exótica o infrecuente."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Anão ---
  {
    id: "feat.ancestry.stonecunning",
    name: "Sabedoria das Rochas (Stonecunning)",
    names: { "pt-BR": "Sabedoria das Rochas", en: "Stonecunning", es: "Conocimiento de la piedra" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você ganha +2 de bônus em Percepção para notar alvenaria incomum, passagens secretas e armadilhas de pedra.",
    summaries: {
      "pt-BR": "Bônus para detectar armadilhas e passagens secretas em pedra.",
      en: "Bonus to notice unusual stonework, hazards, and stone mechanisms.",
      es: "Bonificador para detectar trampas y pasadizos de piedra."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.unburdened_iron",
    name: "Ferro Desembaraçado (Unburdened Iron)",
    names: { "pt-BR": "Ferro Desembaraçado", en: "Unburdened Iron", es: "Hierro sin carga" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você ignora a penalidade de redução de Velocidade imposta por armaduras médias e pesadas.",
    summaries: {
      "pt-BR": "Ignora penalidade de deslocamento de armaduras pesadas.",
      en: "Ignore Speed penalties from medium or heavy armor.",
      es: "Ignora penalizaciones de velocidad por armaduras pesadas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.dwarven_weapon_familiarity",
    name: "Familiaridade com Armas Anãs (Dwarven Weapon Familiarity)",
    names: { "pt-BR": "Familiaridade com Armas Anãs", en: "Dwarven Weapon Familiarity", es: "Familiaridad con armas enanas" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você é treinado com machados de batalha, picaretas e martelos de guerra, e trata armas anãs marciais como simples.",
    summaries: {
      "pt-BR": "Treinado com machados de guerra e martelos anões.",
      en: "Trained in battle axes, picks, and warhammers.",
      es: "Entrenado en hachas de batalla y martillos de guerra enanos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Elfo ---
  {
    id: "feat.ancestry.nimble_elf",
    name: "Elfo Ágil (Nimble Elf)",
    names: { "pt-BR": "Elfo Ágil", en: "Nimble Elf", es: "Elfo ágil" },
    category: "Ancestralidade",
    ancestry: "Elfo",
    level: 1,
    traits: ["Elfo"],
    prereq: "Ancestralidade Élfica",
    description: "Seus passos são rápidos e leves. Sua Velocidade em terra aumenta em +5 pés.",
    summaries: {
      "pt-BR": "+5 pés de deslocamento base em terra.",
      en: "Increases your land Speed by +5 feet.",
      es: "+5 pies a tu velocidad terrestre."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.elven_weapon_familiarity",
    name: "Familiaridade com Armas Élficas (Elven Weapon Familiarity)",
    names: { "pt-BR": "Familiaridade com Armas Élficas", en: "Elven Weapon Familiarity", es: "Familiaridad con armas élficas" },
    category: "Ancestralidade",
    ancestry: "Elfo",
    level: 1,
    traits: ["Elfo"],
    prereq: "Ancestralidade Élfica",
    description: "Você é treinado com arcos longos, arcos curtos, floretes e espadas curtas, e trata armas marciais élficas como simples.",
    summaries: {
      "pt-BR": "Treinado com arcos, floretes e espadas élficas.",
      en: "Trained in longbows, composite bows, and elven rapiers.",
      es: "Entrenado en arcos largos, estoques y espadas élficas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Goblin & Halfling & Orc ---
  {
    id: "feat.ancestry.burn_it",
    name: "Queime Tudo! (Burn It!)",
    names: { "pt-BR": "Queime Tudo!", en: "Burn It!", es: "¡A quemarlo!" },
    category: "Ancestralidade",
    ancestry: "Goblin",
    level: 1,
    traits: ["Goblin"],
    prereq: "Ancestralidade Goblin",
    description: "Seus feitiços, bombas e ataques de fogo causam +1 de dano de fogo adicional por dado de dano.",
    summaries: {
      "pt-BR": "Adiciona bônus de dano a magias, bombas e ataques de fogo.",
      en: "Gain bonus damage on all fire spells, bombs, and attacks.",
      es: "Añade daño adicional a todos los ataques y conjuros de fuego."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.halfling_luck",
    name: "Sorte dos Halflings (Halfling Luck)",
    names: { "pt-BR": "Sorte dos Halflings", en: "Halfling Luck", es: "Suerte de los medianos" },
    category: "Ancestralidade",
    ancestry: "Halfling",
    level: 1,
    traits: ["Halfling", "Fortuna"],
    actions: "free",
    prereq: "Ancestralidade Halfling",
    description: "Gatilho: Você falha em um teste de perícia ou salvaguarda. Efeito: Você rerrola o teste e fica com o segundo resultado (uma vez por dia).",
    summaries: {
      "pt-BR": "[Ação Livre] Rerrola uma falha em teste ou salvaguarda 1x por dia.",
      en: "[Free Action] Reroll a failed skill check or saving throw once per day.",
      es: "[Acción Gratuita] Vuelve a tirar un fallo en habilidad o salvación 1x al día."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.orc_ferocity",
    name: "Ferocidade Orc (Orc Ferocity)",
    names: { "pt-BR": "Ferocidade Orc", en: "Orc Ferocity", es: "Ferocidad orca" },
    category: "Ancestralidade",
    ancestry: "Orc",
    level: 1,
    traits: ["Orc"],
    actions: "reaction",
    prereq: "Ancestralidade Orc",
    description: "Gatilho: Você seria reduzido a 0 PV. Efeito: Você permanece consciente com 1 PV em vez de cair inconsciente e ganha a condição Ferido 1.",
    summaries: {
      "pt-BR": "[Reação] Evita cair inconsciente e sobrevive com 1 PV.",
      en: "[Reaction] Stay standing with 1 HP instead of dropping to 0 HP.",
      es: "[Reacción] Sobrevive con 1 PG en vez de caer inconsciente."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 4. TALENTOS DE CLASSE (CLASS FEATS)
  // ==========================================
  // --- Guerreiro (Fighter) ---
  {
    id: "feat.class.power_attack",
    name: "Golpe Furioso (Vicious Swing / Power Attack)",
    names: { "pt-BR": "Golpe Furioso", en: "Vicious Swing", es: "Golpe feroz" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Classe Guerreiro",
    description: "Você desfere um ataque corpo a corpo com força avassaladora gastando 2 ações, adicionando um dado de dano de arma extra ao acertar.",
    summaries: {
      "pt-BR": "[2 Ações] Ataque com arma corpo a corpo que causa +1 dado de dano adicional.",
      en: "[2 Actions] Make a melee Strike that deals an extra weapon damage die.",
      es: "[2 Acciones] Ataque cuerpo a cuerpo con +1 dado de daño de arma adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.sudden_charge",
    name: "Carga Repentina (Sudden Charge)",
    names: { "pt-BR": "Carga Repentina", en: "Sudden Charge", es: "Carga súbita" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish", "Aberto"],
    actions: 2,
    prereq: "Classe Guerreiro ou Bárbaro",
    description: "Com 2 ações, você dá duas passadas completas em direção ao inimigo e desfere um Golpe corpo a corpo ao final da investida.",
    summaries: {
      "pt-BR": "[2 Ações] Anda 2 vezes e desfere um ataque corpo a corpo no final.",
      en: "[2 Actions] Stride twice and make a melee Strike at the end.",
      es: "[2 Acciones] Realiza dos zancadas y asesta un ataque cuerpo a cuerpo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.dueling_parry",
    name: "Aparar em Duelo (Dueling Parry)",
    names: { "pt-BR": "Aparar em Duelo", en: "Dueling Parry", es: "Parada en duelo" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro"],
    actions: 1,
    prereq: "Empunhando 1 arma de 1 mão e outra mão livre",
    description: "Com 1 ação, você posiciona sua arma de duelo de forma defensiva, recebendo +2 de bônus de circunstância na CA até o início do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Concede +2 de CA de circunstância com a mão livre.",
      en: "[1 Action] Gain a +2 circumstance bonus to AC with a one-handed weapon.",
      es: "[1 Acción] Concede +2 de bonificador por circunstancia a la CA."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 143 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.reactive_strike",
    name: "Golpe Reativo (Reactive Strike)",
    names: { "pt-BR": "Golpe Reativo", en: "Reactive Strike", es: "Golpe reactivo" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro"],
    actions: "reaction",
    prereq: "Classe Guerreiro",
    description: "Gatilho: Um inimigo no seu alcance realiza uma ação de movimento ou manipular. Efeito: Você desfere um Golpe corpo a corpo de reação contra ele.",
    summaries: {
      "pt-BR": "[Reação] Ataca inimigos que se movimentam ou realizam ações no seu alcance.",
      en: "[Reaction] Make a melee Strike against a creature using a move or manipulate action.",
      es: "[Reacción] Ataca a enemigos que se mueven o manipulan en tu alcance."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 141 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.double_slice",
    name: "Corte Duplo (Double Slice)",
    names: { "pt-BR": "Corte Duplo", en: "Double Slice", es: "Tajo doble" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Empunhando duas armas corpo a corpo",
    description: "Você desfere dois ataques com ambas as armas ao mesmo tempo no mesmo bônus de ataque sem penalidade de ataques múltiplos para o segundo.",
    summaries: {
      "pt-BR": "[2 Ações] Ataca com 2 armas ao mesmo tempo sem penalidade de múltiplos ataques.",
      en: "[2 Actions] Strike with two melee weapons simultaneously without MAP penalty.",
      es: "[2 Acciones] Ataca con dos armas a la vez sin penalizador de ataques múltiples."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.knockdown",
    name: "Derrubar com Golpe (Knockdown)",
    names: { "pt-BR": "Derrubar com Golpe", en: "Knockdown", es: "Derribar" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 4,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Classe Guerreiro",
    description: "Você desfere um Golpe corpo a corpo e, ao acertar, tenta imediatamente uma manobra de Derrubar (Trip) como ação livre.",
    summaries: {
      "pt-BR": "[2 Ações] Ataca e derruba o oponente se acertar o golpe.",
      en: "[2 Actions] Make a Strike and attempt a free Trip check if it hits.",
      es: "[2 Acciones] Ataca y derriba al enemigo si el golpe tiene éxito."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 144 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Ladino (Rogue) ---
  {
    id: "feat.class.nimble_dodge",
    name: "Esquiva Ágil (Nimble Dodge)",
    names: { "pt-BR": "Esquiva Ágil", en: "Nimble Dodge", es: "Esquiva ágil" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino"],
    actions: "reaction",
    prereq: "Classe Ladino ou Espadachim",
    description: "Gatilho: Uma criatura ataca você. Efeito: Você ganha +2 de circunstância na CA contra o ataque desencadeador.",
    summaries: {
      "pt-BR": "[Reação] Concede +2 de CA de circunstância contra um ataque recebido.",
      en: "[Reaction] Gain a +2 circumstance bonus to AC against a triggering attack.",
      es: "[Reacción] Concede +2 por circunstancia a la CA contra el ataque."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.trap_finder",
    name: "Localizador de Armadilhas (Trap Finder)",
    names: { "pt-BR": "Localizador de Armadilhas", en: "Trap Finder", es: "Buscador de trampas" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino"],
    prereq: "Classe Ladino",
    description: "Você ganha +1 em Percepção para notar armadilhas e na CA e salvamentos contra perigos mecânicos e mágicos.",
    summaries: {
      "pt-BR": "+1 para notar e desativar armadilhas e salvamentos contra perigos.",
      en: "+1 to spot and disarm traps, and to saves against hazards.",
      es: "+1 para detectar y desactivar trampas y salvaciones contra peligros."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.youre_next",
    name: "Você é o Próximo! (You're Next)",
    names: { "pt-BR": "Você é o Próximo!", en: "You're Next", es: "¡Tú eres el siguiente!" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino", "Emocional", "Medo", "Mental"],
    actions: "reaction",
    prereq: "Treinado em Intimidação",
    description: "Gatilho: Você reduz um inimigo a 0 PV. Efeito: Você usa Desmoralizar imediatamente como reação contra outro inimigo visível com +2 de bônus.",
    summaries: {
      "pt-BR": "[Reação] Desmoraliza um inimigo com +2 após nocautear outro.",
      en: "[Reaction] Demoralize an enemy with a +2 bonus after downing a foe.",
      es: "[Reacción] Desmoraliza a un enemigo tras derribar a otro."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Mago (Wizard) & Conjuradores ---
  {
    id: "feat.class.reach_spell",
    name: "Estender Magia (Reach Spell)",
    names: { "pt-BR": "Estender Magia", en: "Reach Spell", es: "Alargar conjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Concentração", "Manipulação", "Metamágica"],
    actions: 1,
    prereq: "Conjurador de Magias",
    description: "Se a próxima ação for lançar uma magia com alcance em toque ou distância, você aumenta o alcance em +30 pés.",
    summaries: {
      "pt-BR": "[1 Ação] Aumenta o alcance da próxima magia em +30 pés.",
      en: "[1 Action] Increases range of next spell by 30 feet.",
      es: "[1 Acción] Aumenta el alcance del próximo conjuro en 30 pies."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 204 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.widen_spell",
    name: "Ampliar Magia (Widen Spell)",
    names: { "pt-BR": "Ampliar Magia", en: "Widen Spell", es: "Ensanchar conjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Concentração", "Manipulação", "Metamágica"],
    actions: 1,
    prereq: "Conjurador de Magias",
    description: "Se sua próxima magia possuir uma área em explosão, cone ou linha, você aumenta a área em +5 a +10 pés.",
    summaries: {
      "pt-BR": "[1 Ação] Aumenta o raio de explosão ou cone da próxima magia.",
      en: "[1 Action] Increases the burst, cone, or line area of next spell.",
      es: "[1 Acción] Aumenta el área de efecto del próximo conjuro."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 204 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.counterspell",
    name: "Contramagia (Counterspell)",
    names: { "pt-BR": "Contramagia", en: "Counterspell", es: "Contraconjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Mago"],
    actions: "reaction",
    prereq: "Classe Mago ou Feiticeiro",
    description: "Gatilho: Uma criatura lança uma magia que você preparou ou conhece. Efeito: Você gasta um espaço de magia para anular o feitiço inimigo.",
    summaries: {
      "pt-BR": "[Reação] Anula a magia de um inimigo gastando seu próprio feitiço.",
      en: "[Reaction] Counter an enemy spell using your prepared slot.",
      es: "[Reacción] Anula el conjuro de un enemigo gastando tu propio espacio."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 205 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Patrulheiro (Ranger) ---
  {
    id: "feat.class.hunted_shot",
    name: "Tiro do Caçador (Hunted Shot)",
    names: { "pt-BR": "Tiro do Caçador", en: "Hunted Shot", es: "Disparo cazador" },
    category: "Classe",
    className: "Patrulheiro (Ranger)",
    level: 1,
    traits: ["Flourish", "Patrulheiro"],
    actions: 1,
    prereq: "Classe Patrulheiro",
    description: "Com 1 ação, você dispara dois tiros consecutivos com seu arco contra sua Presa Caçada.",
    summaries: {
      "pt-BR": "[1 Ação] Dispara 2 flechas consecutivas contra sua Presa Caçada.",
      en: "[1 Action] Make two ranged Strikes against your Hunted Prey.",
      es: "[1 Acción] Realiza dos disparos seguidos contra tu Presa Cazada."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 156 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.twin_takedown",
    name: "Derrubada Dupla (Twin Takedown)",
    names: { "pt-BR": "Derrubada Dupla", en: "Twin Takedown", es: "Derribo gemelo" },
    category: "Classe",
    className: "Patrulheiro (Ranger)",
    level: 1,
    traits: ["Flourish", "Patrulheiro"],
    actions: 1,
    prereq: "Empunhando duas armas corpo a corpo",
    description: "Com 1 ação, você desfere dois ataques com ambas as armas contra sua Presa Caçada.",
    summaries: {
      "pt-BR": "[1 Ação] Ataca com as duas armas corpo a corpo na mesma ação.",
      en: "[1 Action] Make two melee Strikes using two weapons on your Prey.",
      es: "[1 Acción] Ataca con ambas armas cuerpo a cuerpo en la misma ação."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 156 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Espadachim (Swashbuckler) ---
  {
    id: "feat.class.bleeding_finisher",
    name: "Finalizador Sangrento (Bleeding Finisher)",
    names: { "pt-BR": "Finalizador Sangrento", en: "Bleeding Finisher", es: "Remate sangriento" },
    category: "Classe",
    className: "Espadachim (Swashbuckler)",
    level: 2,
    traits: ["Espadachim", "Finalizador"],
    actions: 1,
    prereq: "Classe Espadachim",
    description: "Você realiza um ataque finalizador estilizado que impõe dano de sangramento persistente igual a seus dados de Dano Preciso.",
    summaries: {
      "pt-BR": "[1 Ação Finalizadora] Causa dano de sangramento persistente contínuo.",
      en: "[1 Action Finisher] Deals persistent bleed damage equal to precision dice.",
      es: "[1 Acción Remate] Inflige daño por sangrado persistente continuo."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 110 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 5. TALENTOS DE ARQUÉTIPO (ARCHETYPE FEATS)
  // ==========================================
  {
    id: "feat.archetype.fighter_dedication",
    name: "Dedicação de Guerreiro (Fighter Dedication)",
    names: { "pt-BR": "Dedicação de Guerreiro", en: "Fighter Dedication", es: "Dedicación de guerrero" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação"],
    prereq: "Força +2 ou Destreza +2",
    description: "Você ganha treinamento com armas simples e marciais e passa a ter acesso aos talentos de Guerreiro através do arquétipo.",
    summaries: {
      "pt-BR": "Torna-se Treinado em armas marciais e abre progressão de Guerreiro.",
      en: "Gain training in martial weapons and unlock Fighter feats.",
      es: "Gana competencia en armas marciales y desbloquea dotes de Guerrero."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 220 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.archetype.wizard_dedication",
    name: "Dedicação de Mago (Wizard Dedication)",
    names: { "pt-BR": "Dedicação de Mago", en: "Wizard Dedication", es: "Dedicación de mago" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação"],
    prereq: "Inteligência +2",
    description: "Você ganha um grimório arcano e aprende a conjurar truques de magia (cantrips) arcanos.",
    summaries: {
      "pt-BR": "Aprende truques arcanos e abre progressão de conjuração de Mago.",
      en: "Gain arcane spellbook, cantrips, and unlock Wizard feats.",
      es: "Ganas libro de conjuros, trucos arcanos y dotes de Mago."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 222 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.archetype.medic_dedication",
    name: "Dedicação de Médico (Medic Dedication)",
    names: { "pt-BR": "Dedicação de Médico", en: "Medic Dedication", es: "Dedicación de médico" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação", "Perícia"],
    prereq: "Treinado em Medicina e Medicina de Batalha",
    description: "Você se torna Especialista em Medicina e aumenta o valor de cura de Medicina de Batalha em +5 PV (ou +10 PV se Mestre).",
    summaries: {
      "pt-BR": "Aumenta a cura de Medicina de Batalha e sobe Medicina para Especialista.",
      en: "Become Expert in Medicine and increase Battle Medicine healing by +5/+10.",
      es: "Sube a Experto en Medicina y aumenta la curación en combate."
    },
    source: { book: "Guia de Personagens Avançados (APG / PC2)", page: 180 },
    ruleset: "remaster",
    rarity: "uncommon"
  },
  {
    id: "feat.archetype.doctors_visitation",
    name: "Visita do Médico (Doctor's Visitation)",
    names: { "pt-BR": "Visita do Médico", en: "Doctor's Visitation", es: "Visita del médico" },
    category: "Arquétipo",
    level: 4,
    traits: ["Arquétipo", "Flourish", "Perícia"],
    actions: 1,
    prereq: "Dedicação de Médico",
    description: "[1 Ação] Você dá uma Passada (Stride) até um aliado ferido e usa Medicina de Batalha ou Tratar Condição nele na mesma ação.",
    summaries: {
      "pt-BR": "[1 Ação] Move-se e aplica Medicina de Batalha no mesmo movimento.",
      en: "[1 Action] Stride and administer Battle Medicine in a single action.",
      es: "[1 Acción] Desplázate y cura a un aliado en una sola acción."
    },
    source: { book: "Guia de Personagens Avançados (APG / PC2)", page: 180 },
    ruleset: "remaster",
    rarity: "uncommon"
  }
];

// Livro do Jogador, pp. 216–224: dedicações multiclasse básicas.
// A classe de origem é proibida para a própria dedicação; isso é diferente
// dos talentos normais de classe, que exigem uma classe específica.
const PLAYER_CORE_MULTICLASS_DEDICATIONS = [
  ["bard", "Bardo", "Bard", "Bardo", "Carisma +2", 216, "Carisma"],
  ["witch", "Bruxo", "Witch", "Bruja", "Inteligência +2", 217, "Inteligência"],
  ["cleric", "Clérigo", "Cleric", "Clérigo", "Sabedoria +2", 220, "Sabedoria"],
  ["druid", "Druida", "Druid", "Druida", "Sabedoria +2", 220, "Sabedoria"],
  ["fighter", "Guerreiro", "Fighter", "Guerrero", "Força +2 ou Destreza +2", 221, "Força +2 ou Destreza +2"],
  ["rogue", "Ladino", "Rogue", "Pícaro", "Destreza +2", 222, "Destreza"],
  ["wizard", "Mago", "Wizard", "Mago", "Inteligência +2", 223, "Inteligência"],
  ["ranger", "Patrulheiro", "Ranger", "Explorador", "Destreza +2", 224, "Destreza"],
];
for (const [slug, pt, en, es, prerequisite, page, keyAbility] of PLAYER_CORE_MULTICLASS_DEDICATIONS) {
  const id = `feat.archetype.${slug}_multiclass.dedication`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `Dedicação de ${pt} (${en} Dedication)`,
    names: { "pt-BR": `Dedicação de ${pt}`, en: `${en} Dedication`, es: `Dedicación de ${es}` },
    summaries: {
      "pt-BR": `Você se dedica ao arquétipo multiclasse de ${pt}; requisito: ${prerequisite}.`,
      en: `You dedicate yourself to the ${en} multiclass archetype; prerequisite: ${prerequisite}.`,
      es: `Te dedicas al arquetipo multiclase de ${es}; requisito: ${prerequisite}.`,
    },
    description: `Dedicação multiclasse de ${pt}. A classe ${pt} não pode escolher sua própria dedicação.`,
    category: "Arquétipo",
    type: "Talento",
    level: 2,
    archetypeId: `archetype.${slug}_multiclass`,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    prohibitedClassId: `class.${slug}`,
    keyAbility,
    traits: ["Arquétipo", "Dedicação", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: true,
    rarity: "common",
  });
}

// Livro do Jogador, p. 216: progressão do arquétipo multiclasse de Bardo.
const PLAYER_CORE_BARD_MULTICLASS_FEATS = [
  ["basic_bard_spellcasting", "Conjuração Básica de Bardo", "Basic Bard Spellcasting", "Conjuración básica de bardo", 4, ["Dedicação de Bardo"]],
  ["basic_muses_whispers", "Sussurros da Musa Básicos", "Basic Muse Whispers", "Susurros básicos de la musa", 4, ["Dedicação de Bardo"]],
  ["advanced_muses_whispers", "Sussurros da Musa Avançados", "Advanced Muse Whispers", "Susurros avanzados de la musa", 6, ["Sussurros da Musa Básicos"]],
  ["counter_performance", "Contraperformance", "Counter Performance", "Contraperformance", 6, ["Dedicação de Bardo"]],
  ["anthemic_performance", "Performance Antêmica", "Anthemic Performance", "Interpretación antémica", 8, ["Dedicação de Bardo"]],
  ["occult_breadth", "Amplitude Ocultista", "Occult Breadth", "Amplitud ocultista", 8, ["Conjuração Básica de Bardo"]],
  ["bard_expert_spellcasting", "Conjuração Especialista de Bardo", "Expert Bard Spellcasting", "Conjuración experta de bardo", 12, ["Conjuração Básica de Bardo", "Mestre em Ocultismo"]],
  ["bard_master_spellcasting", "Conjuração Mestre de Bardo", "Master Bard Spellcasting", "Conjuración maestra de bardo", 18, ["Conjuração Especialista de Bardo", "Lendário em Ocultismo"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_BARD_MULTICLASS_FEATS) {
  const id = `feat.archetype.bard_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Bardo, nível ${level}.`,
      en: `Bard multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Bardo, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Bardo.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.bard_multiclass",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: 216 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 217–218: progressão do arquétipo multiclasse de Bruxo.
const PLAYER_CORE_WITCH_MULTICLASS_FEATS = [
  ["basic_witchcraft", "Bruxaria Básica", "Basic Witchcraft", "Brujería básica", 4, ["Dedicação de Bruxo"]],
  ["basic_witch_spellcasting", "Conjuração Básica de Bruxo", "Basic Witch Spellcasting", "Conjuración básica de bruja", 4, ["Dedicação de Bruxo"]],
  ["advanced_witchcraft", "Bruxaria Avançada", "Advanced Witchcraft", "Brujería avanzada", 6, ["Bruxaria Básica"]],
  ["witch_expert_spellcasting", "Conjuração Especialista de Bruxo", "Expert Witch Spellcasting", "Conjuración experta de bruja", 12, ["Conjuração Básica de Bruxo", "Mestre na perícia associada à tradição do patrono"]],
  ["witch_master_spellcasting", "Conjuração Mestre de Bruxo", "Master Witch Spellcasting", "Conjuración maestra de bruja", 18, ["Conjuração Especialista de Bruxo", "Lendário na perícia associada à tradição do patrono"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_WITCH_MULTICLASS_FEATS) {
  const id = `feat.archetype.witch_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Bruxo, nível ${level}.`,
      en: `Witch multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Bruja, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Bruxo.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.witch_multiclass",
    requiredSkillByTradition: true,
    requiredSkillRank: level >= 18 ? "legendary" : "master",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 218 : 217 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 218–219: progressão do arquétipo multiclasse de Clérigo.
const PLAYER_CORE_CLERIC_MULTICLASS_FEATS = [
  ["basic_cleric_spellcasting", "Conjuração Básica de Clérigo", "Basic Cleric Spellcasting", "Conjuración básica de clérigo", 4, ["Dedicação de Clérigo"]],
  ["basic_cleric_dogma", "Dogma Básico", "Basic Dogma", "Dogma básico", 4, ["Dedicação de Clérigo"]],
  ["advanced_cleric_dogma", "Dogma Avançado", "Advanced Dogma", "Dogma avanzado", 6, ["Dogma Básico"]],
  ["divine_breadth", "Amplitude Divina", "Divine Breadth", "Amplitud divina", 8, ["Conjuração Básica de Clérigo"]],
  ["cleric_expert_spellcasting", "Conjuração Especialista de Clérigo", "Expert Cleric Spellcasting", "Conjuración experta de clérigo", 12, ["Conjuração Básica de Clérigo", "Mestre em Religião"]],
  ["cleric_master_spellcasting", "Conjuração Mestre de Clérigo", "Master Cleric Spellcasting", "Conjuración maestra de clérigo", 18, ["Conjuração Especialista de Clérigo", "Lendário em Religião"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_CLERIC_MULTICLASS_FEATS) {
  const id = `feat.archetype.cleric_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Clérigo, nível ${level}.`,
      en: `Cleric multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Clérigo, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Clérigo.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.cleric_multiclass",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 219 : 218 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 219–220: progressão do arquétipo multiclasse de Druida.
const PLAYER_CORE_DRUID_MULTICLASS_FEATS = [
  ["basic_druid_spellcasting", "Conjuração Básica de Druida", "Basic Druid Spellcasting", "Conjuración básica de druida", 4, ["Dedicação de Druida"]],
  ["order_magic", "Magia de Ordem", "Order Magic", "Magia de orden", 4, ["Dedicação de Druida"]],
  ["basic_wildness", "Selvageria Básica", "Basic Wilding", "Ferocidad básica", 4, ["Dedicação de Druida"]],
  ["advanced_wildness", "Selvageria Avançada", "Advanced Wilding", "Ferocidad avanzada", 6, ["Selvageria Básica"]],
  ["primal_breadth", "Amplitude Primal", "Primal Breadth", "Amplitud primordial", 8, ["Conjuração Básica de Druida"]],
  ["druid_expert_spellcasting", "Conjuração Especialista de Druida", "Expert Druid Spellcasting", "Conjuración experta de druida", 12, ["Conjuração Básica de Druida", "Mestre em Natureza"]],
  ["druid_master_spellcasting", "Conjuração Mestre de Druida", "Master Druid Spellcasting", "Conjuración maestra de druida", 18, ["Conjuração Especialista de Druida", "Lendário em Natureza"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_DRUID_MULTICLASS_FEATS) {
  const id = `feat.archetype.druid_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Druida, nível ${level}.`,
      en: `Druid multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Druida, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Druida.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.druid_multiclass",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 220 : 219 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 220–221: progressão do arquétipo multiclasse de Guerreiro.
const PLAYER_CORE_FIGHTER_MULTICLASS_FEATS = [
  ["basic_fighter_maneuver", "Manobra Básica", "Basic Fighter Maneuver", "Maniobra básica de guerrero", 4, ["Dedicação de Guerreiro"]],
  ["fighter_resiliency", "Resiliência de Guerreiro", "Fighter Resiliency", "Resiliencia de guerrero", 4, ["Dedicação de Guerreiro"]],
  ["reactive_striker", "Golpeador Reativo", "Reactive Striker", "Atacante reactivo", 4, ["Dedicação de Guerreiro"]],
  ["advanced_fighter_maneuver", "Manobra Avançada", "Advanced Fighter Maneuver", "Maniobra avanzada de guerrero", 6, ["Manobra Básica"]],
  ["diverse_weapon_expertise", "Especialista em Armas Diversas", "Diverse Weapon Expertise", "Pericia en armas diversas", 12, ["Dedicação de Guerreiro", "Especialista em algum tipo de arma ou ataque desarmado"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_FIGHTER_MULTICLASS_FEATS) {
  const id = `feat.archetype.fighter_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Guerreiro, nível ${level}.`,
      en: `Fighter multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Guerrero, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Guerreiro.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.fighter_multiclass",
    prerequisites,
    prereq: prerequisites,
    maxClassHpPerLevel: slug === "fighter_resiliency" ? 8 : undefined,
    requiresWeaponProficiency: slug === "diverse_weapon_expertise" ? "especialista" : undefined,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 221 : 220 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 221–222: progressão do arquétipo multiclasse de Ladino.
const PLAYER_CORE_ROGUE_MULTICLASS_FEATS = [
  ["sneak_attacker", "Atacante Furtivo", "Sneak Attacker", "Atacante furtivo", 4, ["Dedicação de Ladino"]],
  ["basic_rogue_trickery", "Trapaça Básica", "Basic Rogue Trickery", "Engaño básico de pícaro", 4, ["Dedicação de Ladino"]],
  ["advanced_rogue_trickery", "Trapaça Avançada", "Advanced Rogue Trickery", "Engaño avanzado de pícaro", 6, ["Trapaça Básica"]],
  ["skill_mastery", "Maestria em Perícia", "Skill Mastery", "Maestría en habilidad", 8, ["Dedicação de Ladino", "Treinado em pelo menos uma perícia e especialista em pelo menos uma perícia"]],
  ["uncanny_dodge", "Esquiva Excepcional", "Uncanny Dodge", "Esquiva excepcional", 10, ["Dedicação de Ladino"]],
  ["evasion", "Evasividade", "Evasion", "Evasión", 12, ["Dedicação de Ladino", "Especialista em salvamentos de Reflexos"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_ROGUE_MULTICLASS_FEATS) {
  const id = `feat.archetype.rogue_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Ladino, nível ${level}.`,
      en: `Rogue multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Pícaro, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Ladino.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.rogue_multiclass",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 10 ? 222 : 221 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 222–223: progressão do arquétipo multiclasse de Mago.
const PLAYER_CORE_WIZARD_MULTICLASS_FEATS = [
  ["basic_arcana", "Arcana Básica", "Basic Arcana", "Arcanismo básico", 4, ["Dedicação de Mago"]],
  ["basic_wizard_spellcasting", "Conjuração Básica de Mago", "Basic Wizard Spellcasting", "Conjuración básica de mago", 4, ["Dedicação de Mago"]],
  ["arcane_school_magic", "Magia de Escola Arcana", "Arcane School Magic", "Magia de escuela arcana", 4, ["Dedicação de Mago"]],
  ["advanced_arcana", "Arcanismo Avançado", "Advanced Arcana", "Arcanismo avanzado", 6, ["Arcana Básica"]],
  ["arcane_breadth", "Amplitude Arcana", "Arcane Breadth", "Amplitud arcana", 8, ["Conjuração Básica de Mago"]],
  ["wizard_expert_spellcasting", "Conjuração Especialista de Mago", "Expert Wizard Spellcasting", "Conjuración experta de mago", 12, ["Conjuração Básica de Mago", "Mestre em Arcanismo"]],
  ["wizard_master_spellcasting", "Conjuração Mestre de Mago", "Master Wizard Spellcasting", "Conjuración maestra de mago", 18, ["Conjuração Especialista de Mago", "Lendário em Arcanismo"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_WIZARD_MULTICLASS_FEATS) {
  const id = `feat.archetype.wizard_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Mago, nível ${level}.`,
      en: `Wizard multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Mago, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Mago.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.wizard_multiclass",
    prerequisites,
    prereq: prerequisites,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 223 : 222 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 223–224: progressão do arquétipo multiclasse de Patrulheiro.
const PLAYER_CORE_RANGER_MULTICLASS_FEATS = [
  ["ranger_resiliency", "Resiliência de Patrulheiro", "Ranger Resiliency", "Resiliencia de explorador", 4, ["Dedicação de Patrulheiro"]],
  ["basic_hunters_trick", "Truque de Caçador Básico", "Basic Hunter's Trick", "Truco básico del cazador", 4, ["Dedicação de Patrulheiro"]],
  ["advanced_hunters_trick", "Truque de Caçador Avançado", "Advanced Hunter's Trick", "Truco avanzado del cazador", 6, ["Truque de Caçador Básico"]],
  ["master_observer", "Mestre Observador", "Master Observer", "Maestro observador", 12, ["Dedicação de Patrulheiro", "Especialista em Percepção"]],
];
for (const [slug, pt, en, es, level, prerequisites] of PLAYER_CORE_RANGER_MULTICLASS_FEATS) {
  const id = `feat.archetype.ranger_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Patrulheiro, nível ${level}.`,
      en: `Ranger multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Explorador, nivel ${level}.`,
    },
    description: `Você recebe os benefícios de ${pt.toLowerCase()} conforme o arquétipo de Patrulheiro.`,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.ranger_multiclass",
    prerequisites,
    prereq: prerequisites,
    maxClassHpPerLevel: slug === "ranger_resiliency" ? 8 : undefined,
    traits: ["Arquétipo", "Multiclasse"],
    source: { book: PLAYER_CORE_SOURCE, page: level >= 12 ? 224 : 223 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 249–250: primeiros talentos de perícia do catálogo.
const PLAYER_CORE_SKILL_FEATS = [
  ["acrobatics", "stable_balance", "Equilíbrio Estável", "Steady Balance", "Equilibrio estable", 1, "Treinado em Acrobatismo", 249],
  ["acrobatics", "quick_squeeze", "Espremer-se Rápido", "Quick Squeeze", "Escurrirse rápido", 1, "Treinado em Acrobatismo", 249],
  ["acrobatics", "cat_fall", "Queda do Gato", "Cat Fall", "Caída de gato", 1, "Treinado em Acrobatismo", 249],
  ["acrobatics", "quick_crawl", "Rastejo Ligeiro", "Quick Crawl", "Gateo rápido", 2, "Especialista em Acrobatismo", 249],
  ["acrobatics", "kip_up", "Levantar Rápido", "Kip Up", "Levantarse rápido", 7, "Mestre em Acrobatismo", 249],
  ["arcana", "arcane_sense", "Sentido Arcano", "Arcane Sense", "Sentido arcano", 1, "Treinado em Arcanismo", 249],
  ["arcana", "unified_theory", "Teoria Unificada", "Unified Theory", "Teoría unificada", 15, "Lendário em Arcanismo", 249],
  ["athletics", "hefty_hauler", "Carregador Robusto", "Hefty Hauler", "Cargador robusto", 1, "Treinado em Atletismo", 249],
  ["athletics", "combat_climber", "Escalador de Combate", "Combat Climber", "Escalador de combate", 1, "Treinado em Atletismo", 249],
  ["athletics", "titan_wrestler", "Lutador Titânico", "Titan Wrestler", "Luchador titánico", 1, "Treinado em Atletismo", 249],
  ["athletics", "quick_jump", "Salto Rápido", "Quick Jump", "Salto rápido", 1, "Treinado em Atletismo", 249],
  ["athletics", "underwater_marauder", "Saqueador Subaquático", "Underwater Marauder", "Saqueador subacuático", 1, "Treinado em Atletismo", 249],
  ["athletics", "kip_up_athletics", "Erguer-se Rápido", "Kip Up", "Levantarse rápido", 1, "Especialista em Atletismo", 249],
  ["athletics", "powerful_leap", "Salto Poderoso", "Powerful Leap", "Salto poderoso", 1, "Especialista em Atletismo", 249],
  ["athletics", "quick_climb", "Escalada Rápida", "Quick Climb", "Escalada rápida", 2, "Mestre em Atletismo", 249],
  ["athletics", "quick_swim", "Natação Rápida", "Quick Swim", "Nado rápido", 2, "Mestre em Atletismo", 249],
  ["athletics", "wall_jump", "Salto na Parede", "Wall Jump", "Salto en la pared", 7, "Mestre em Atletismo", 250],
  ["athletics", "cloud_jump", "Salto nas Nuvens", "Cloud Jump", "Salto en las nubes", 15, "Lendário em Atletismo", 250],
];
const PLAYER_CORE_SKILL_NAMES = {
  acrobatics: { "pt-BR": "Acrobatismo", en: "Acrobatics", es: "Acrobacias" },
  arcana: { "pt-BR": "Arcanismo", en: "Arcana", es: "Arcanismo" },
  athletics: { "pt-BR": "Atletismo", en: "Athletics", es: "Atletismo" },
  diplomacy: { "pt-BR": "Diplomacia", en: "Diplomacy", es: "Diplomacia" },
  deception: { "pt-BR": "Dissimulação", en: "Deception", es: "Engaño" },
  stealth: { "pt-BR": "Furtividade", en: "Stealth", es: "Sigilo" },
  intimidation: { "pt-BR": "Intimidação", en: "Intimidation", es: "Intimidación" },
  thievery: { "pt-BR": "Ladroagem", en: "Thievery", es: "Juego de manos" },
  crafting: { "pt-BR": "Manufatura", en: "Crafting", es: "Artesanía" },
  medicine: { "pt-BR": "Medicina", en: "Medicine", es: "Medicina" },
  nature: { "pt-BR": "Natureza", en: "Nature", es: "Naturaleza" },
  occultism: { "pt-BR": "Ocultismo", en: "Occultism", es: "Ocultismo" },
  performance: { "pt-BR": "Performance", en: "Performance", es: "Interpretación" },
  religion: { "pt-BR": "Religião", en: "Religion", es: "Religión" },
  survival: { "pt-BR": "Sobrevivência", en: "Survival", es: "Supervivencia" },
  society: { "pt-BR": "Sociedade", en: "Society", es: "Sociedad" },
  lore: { "pt-BR": "Saber", en: "Lore", es: "Saber" },
};
for (const [skill, slug, pt, en, es, level, prerequisite, page] of PLAYER_CORE_SKILL_FEATS) {
  const id = `feat.skill.${skill}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const skillNames = PLAYER_CORE_SKILL_NAMES[skill];
  const skillName = skillNames["pt-BR"];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ${skillName}, nível ${level}, que exige ${prerequisite.toLowerCase()}.`,
      en: `${skillNames.en} skill feat, level ${level}; requires ${prerequisite}.`,
      es: `Dote de ${skillNames.es}, nivel ${level}; requiere ${prerequisite}.`,
    },
    description: `Talento de perícia de ${skillName}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 250–252: talentos de Diplomacia, Dissimulação e Furtividade.
const PLAYER_CORE_SOCIAL_STEALTH_FEATS = [
  ["diplomacy", "hobnobber", "Camarada", "Hobnobber", "Camarada", 1, "Treinado em Diplomacia", 250],
  ["diplomacy", "group_impression", "Impressionar Grupo", "Group Impression", "Impresión grupal", 1, "Treinado em Diplomacia", 250],
  ["diplomacy", "bargain_hunter", "Pechinchador", "Bargain Hunter", "Cazador de gangas", 1, "Treinado em Diplomacia", 250],
  ["diplomacy", "no_cause_for_alarm", "Sem Motivo para Alarde", "No Cause for Alarm", "Sin motivo de alarma", 1, "Treinado em Diplomacia", 250],
  ["diplomacy", "glad_hand", "Cumprimento Caloroso", "Glad-Hand", "Saludo cordial", 1, "Especialista em Diplomacia", 250],
  ["diplomacy", "shameless_request", "Pedido Descarado", "Shameless Request", "Petición descarada", 1, "Mestre em Diplomacia", 250],
  ["diplomacy", "legendary_negotiation", "Negociação Lendária", "Legendary Negotiation", "Negociación legendaria", 15, "Lendário em Diplomacia", 250],
  ["deception", "lengthy_diversion", "Distração Prolongada", "Lengthy Diversion", "Distracción prolongada", 1, "Treinado em Dissimulação", 251],
  ["deception", "lie_to_me", "Mente na Minha Cara", "Lie to Me", "Miente en mi cara", 1, "Treinado em Dissimulação", 251],
  ["deception", "charming_liar", "Mentiroso Charmoso", "Charming Liar", "Mentiroso encantador", 1, "Treinado em Dissimulação", 251],
  ["deception", "confabulator", "Confabulador", "Confabulator", "Confabulador", 1, "Especialista em Dissimulação", 251],
  ["deception", "quick_disguise", "Disfarce Rápido", "Quick Disguise", "Disfraz rápido", 1, "Especialista em Dissimulação", 251],
  ["deception", "slippery_secrets", "Segredos Escorregadios", "Slippery Secrets", "Secretos escurridizos", 7, "Mestre em Dissimulação", 251],
  ["stealth", "experienced_smuggler", "Contrabandista Experiente", "Experienced Smuggler", "Contrabandista experimentado", 1, "Treinado em Furtividade", 251],
  ["stealth", "terrain_stalker", "Espreitador de Terreno", "Terrain Stalker", "Acechador del terreno", 1, "Treinado em Furtividade", 251],
  ["stealth", "quiet_allies", "Furtividade Coletiva", "Quiet Allies", "Aliados silenciosos", 2, "Especialista em Furtividade", 251],
  ["stealth", "foil_senses", "Enganar Sentidos", "Foil Senses", "Frustrar sentidos", 7, "Mestre em Furtividade", 252],
  ["stealth", "swift_sneak", "Rápido e Sorrateiro", "Swift Sneak", "Sigilo veloz", 7, "Mestre em Furtividade", 252],
  ["stealth", "legendary_sneak", "Sorrateiro Lendário", "Legendary Sneak", "Sigilo legendario", 15, "Lendário em Furtividade", 252],
];
for (const [skill, slug, pt, en, es, level, prerequisite, page] of PLAYER_CORE_SOCIAL_STEALTH_FEATS) {
  const id = `feat.skill.${skill}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const skillNames = PLAYER_CORE_SKILL_NAMES[skill];
  const skillName = skillNames["pt-BR"];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ${skillName}, nível ${level}, que exige ${prerequisite.toLowerCase()}.`,
      en: `${skillNames.en} skill feat, level ${level}; requires ${prerequisite}.`,
      es: `Dote de ${skillNames.es}, nivel ${level}; requiere ${prerequisite}.`,
    },
    description: `Talento de perícia de ${skillName}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 252–254: talentos de Intimidação, Ladroagem e Manufatura.
const PLAYER_CORE_CRAFTING_INTIMIDATION_THIEVERY_FEATS = [
  ["intimidation", "group_coercion", "Coagir Grupo", "Group Coercion", "Coerción grupal", 1, "Treinado em Intimidação", 252],
  ["intimidation", "quick_coercion", "Coerção Rápida", "Quick Coercion", "Coerción rápida", 1, "Treinado em Intimidação", 252],
  ["intimidation", "intimidating_glare", "Olhar Intimidante", "Intimidating Glare", "Mirada intimidante", 1, "Treinado em Intimidação", 252],
  ["intimidation", "lasting_coercion", "Coerção Duradoura", "Lasting Coercion", "Coerción duradera", 1, "Especialista em Intimidação", 252],
  ["intimidation", "intimidating_strike", "Força Intimidante", "Intimidating Strike", "Golpe intimidante", 1, "Força +3 e especialista em Intimidação", 252],
  ["intimidation", "battle_cry", "Grito de Guerra", "Battle Cry", "Grito de guerra", 1, "Mestre em Intimidação", 252],
  ["intimidation", "terrified_retreat", "Retirada Aterrorizada", "Terrified Retreat", "Retirada aterrorizada", 1, "Mestre em Intimidação", 252],
  ["intimidation", "scare_to_death", "Susto Fatal", "Scare to Death", "Asustar hasta la muerte", 15, "Lendário em Intimidação", 252],
  ["thievery", "subtle_theft", "Furto Sutil", "Subtle Theft", "Hurto sutil", 1, "Treinado em Ladroagem", 252],
  ["thievery", "pickpocket", "Punga", "Pickpocket", "Carterista", 1, "Treinado em Ladroagem", 252],
  ["thievery", "cautious_disarmament", "Desativação Cautelosa", "Cautious Disarmament", "Desactivación cautelosa", 1, "Especialista em Ladroagem", 252],
  ["thievery", "quick_unlock", "Destrancar Rápido", "Quick Unlock", "Desbloqueo rápido", 1, "Mestre em Ladroagem", 252],
  ["thievery", "legendary_thief", "Ladrão Lendário", "Legendary Thief", "Ladrón legendario", 15, "Lendário em Ladroagem e Punga", 252],
  ["crafting", "quick_repair", "Reparo Rápido", "Quick Repair", "Reparación rápida", 1, "Treinado em Manufatura", 253],
  ["crafting", "specialty_crafting", "Especialidade de Manufatura", "Specialty Crafting", "Especialidad de artesanía", 1, "Treinado em Manufatura", 253],
  ["crafting", "alchemical_crafting", "Manufatura Alquímica", "Alchemical Crafting", "Artesanía alquímica", 1, "Treinado em Manufatura", 253],
  ["crafting", "assurance_crafting", "Manufatura Coletiva", "Crafter's Appraisal", "Artesanía colectiva", 2, "Especialista em Manufatura", 253],
  ["crafting", "inventor", "Inventor", "Inventor", "Inventor", 1, "Especialista em Manufatura", 253],
  ["crafting", "magical_crafting", "Manufatura Mágica", "Magical Crafting", "Artesanía mágica", 2, "Especialista em Manufatura", 253],
  ["crafting", "impeccable_crafting", "Manufatura Impecável", "Impeccable Crafting", "Artesanía impecable", 7, "Mestre em Manufatura e Especialidade de Manufatura", 253],
  ["crafting", "universal_crafting", "Manufatura Universal", "Universal Crafting", "Artesanía universal", 15, "Lendário em Manufatura", 253],
];
for (const [skill, slug, pt, en, es, level, prerequisite, page] of PLAYER_CORE_CRAFTING_INTIMIDATION_THIEVERY_FEATS) {
  const id = `feat.skill.${skill}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const skillNames = PLAYER_CORE_SKILL_NAMES[skill];
  const skillName = skillNames["pt-BR"];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ${skillName}, nível ${level}, que exige ${prerequisite.toLowerCase()}.`,
      en: `${skillNames.en} skill feat, level ${level}; requires ${prerequisite}.`,
      es: `Dote de ${skillNames.es}, nivel ${level}; requiere ${prerequisite}.`,
    },
    description: `Talento de perícia de ${skillName}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 253–255: talentos de Medicina, Natureza e Ocultismo.
const PLAYER_CORE_MEDICINE_NATURE_OCCULTISM_FEATS = [
  ["medicine", "battle_medicine", "Medicina de Combate", "Battle Medicine", "Medicina de combate", 1, "Treinado em Medicina", 253],
  ["medicine", "ward_medic", "Médico de Enfermaria", "Ward Medic", "Médico de enfermería", 1, "Treinado em Medicina", 253],
  ["medicine", "continual_recovery", "Recuperação Contínua", "Continual Recovery", "Recuperación continua", 2, "Especialista em Medicina", 253],
  ["medicine", "robust_recovery", "Recuperação Robusta", "Robust Recovery", "Recuperación robusta", 2, "Especialista em Medicina", 253],
  ["medicine", "atypical_treatment", "Tratamento Atípico", "Atypical Treatment", "Tratamiento atípico", 2, "Especialista em Medicina", 253],
  ["medicine", "advanced_first_aid", "Primeiros Socorros Avançados", "Advanced First Aid", "Primeros auxilios avanzados", 7, "Mestre em Medicina", 253],
  ["medicine", "legendary_medic", "Médico Lendário", "Legendary Medic", "Médico legendario", 15, "Lendário em Medicina", 253],
  ["nature", "natural_medicine", "Medicina Natural", "Natural Medicine", "Medicina natural", 1, "Treinado em Natureza", 254],
  ["nature", "train_animal", "Treinar Animal", "Train Animal", "Entrenar animal", 1, "Treinado em Natureza", 254],
  ["nature", "animal_companion", "Vínculo com Animal", "Animal Companion", "Vínculo animal", 1, "Treinado em Natureza", 254],
  ["occultism", "oddity_identification", "Identificar Estranhezas", "Oddity Identification", "Identificar rarezas", 1, "Treinado em Ocultismo", 255],
  ["occultism", "schooled_in_secrets", "Instruído em Segredos", "Schooled in Secrets", "Instruido en secretos", 1, "Treinado em Ocultismo", 255],
  ["occultism", "recognize_spell", "Reconhecer Magia", "Recognize Spell", "Reconocer conjuro", 1, "Treinado em Ocultismo", 255],
];
for (const [skill, slug, pt, en, es, level, prerequisite, page] of PLAYER_CORE_MEDICINE_NATURE_OCCULTISM_FEATS) {
  const id = `feat.skill.${skill}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const skillNames = PLAYER_CORE_SKILL_NAMES[skill];
  const skillName = skillNames["pt-BR"];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ${skillName}, nível ${level}, que exige ${prerequisite.toLowerCase()}.`,
      en: `${skillNames.en} skill feat, level ${level}; requires ${prerequisite}.`,
      es: `Dote de ${skillNames.es}, nivel ${level}; requiere ${prerequisite}.`,
    },
    description: `Talento de perícia de ${skillName}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, pp. 255–256: talentos de Performance, Religião,
// Sobrevivência e Sociedade.
const PLAYER_CORE_PERFORMANCE_RELIGION_SURVIVAL_SOCIETY_FEATS = [
  ["performance", "virtuosic_performer", "Artista Virtuoso", "Virtuosic Performer", "Artista virtuoso", 1, "Treinado em Performance", 255],
  ["performance", "fascinating_performance", "Performance Fascinante", "Fascinating Performance", "Interpretación fascinante", 1, "Treinado em Performance", 255],
  ["performance", "impressive_performance", "Performance Impressionante", "Impressive Performance", "Interpretación impresionante", 1, "Treinado em Performance", 255],
  ["performance", "legendary_performer", "Artista Lendário", "Legendary Performer", "Artista legendario", 15, "Lendário em Performance e Artista Virtuoso", 255],
  ["religion", "student_of_the_canon", "Estudante do Cânone", "Student of the Canon", "Estudiante del canon", 1, "Treinado em Religião", 255],
  ["religion", "divine_guidance", "Orientação Divina", "Divine Guidance", "Guía divina", 1, "Treinado em Religião", 255],
  ["religion", "legendary_religion", "Religião Lendária", "Legendary Religion", "Religión legendaria", 15, "Lendário em Religião", 255],
  ["survival", "experienced_tracker", "Rastreador Experiente", "Experienced Tracker", "Rastreador experimentado", 1, "Treinado em Sobrevivência", 256],
  ["survival", "terrain_specialist", "Especialidade em Terreno", "Terrain Expertise", "Especialidad en terreno", 1, "Treinado em Sobrevivência", 256],
  ["survival", "forager", "Forrageador", "Forager", "Recolector", 1, "Treinado em Sobrevivência", 256],
  ["survival", "legendary_survivalist", "Sobrevivente Lendário", "Legendary Survivalist", "Superviviente legendario", 15, "Lendário em Sobrevivência", 256],
  ["survival", "planar_survival", "Sobrevivência Planar", "Planar Survival", "Supervivencia planar", 7, "Mestre em Sobrevivência", 256],
  ["survival", "feral_crafting", "Manufatura Feral", "Feral Crafting", "Artesanía feral", 1, "Treinado em Sobrevivência", 256],
  ["society", "courtly_graces", "Gracejos da Corte", "Courtly Graces", "Modales cortesanos", 1, "Treinado em Sociedade", 257],
  ["society", "read_lips", "Ler Lábios", "Read Lips", "Leer labios", 1, "Treinado em Sociedade", 257],
  ["society", "sign_language", "Língua de Sinais", "Sign Language", "Lengua de signos", 1, "Treinado em Sociedade", 257],
  ["society", "streetwise", "Manha das Ruas", "Streetwise", "Sabiduría callejera", 1, "Treinado em Sociedade", 257],
  ["society", "multilingual", "Poliglota", "Multilingual", "Políglota", 1, "Treinado em Sociedade", 257],
  ["society", "legendary_codebreaker", "Decodificador Lendário", "Legendary Codebreaker", "Descifrador legendario", 15, "Lendário em Sociedade", 257],
  ["society", "legendary_linguist", "Linguista Lendário", "Legendary Linguist", "Lingüista legendario", 15, "Lendário em Sociedade", 257],
];
for (const [skill, slug, pt, en, es, level, prerequisite, page] of PLAYER_CORE_PERFORMANCE_RELIGION_SURVIVAL_SOCIETY_FEATS) {
  const id = `feat.skill.${skill}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const skillNames = PLAYER_CORE_SKILL_NAMES[skill];
  const skillName = skillNames["pt-BR"];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ${skillName}, nível ${level}, que exige ${prerequisite.toLowerCase()}.`,
      en: `${skillNames.en} skill feat, level ${level}; requires ${prerequisite}.`,
      es: `Dote de ${skillNames.es}, nivel ${level}; requiere ${prerequisite}.`,
    },
    description: `Talento de perícia de ${skillName}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prerequisite],
    prereq: [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Livro do Jogador, p. 256: talentos gerais de Saber.
const PLAYER_CORE_LORE_FEATS = [
  ["experienced_professional", "Profissional Experiente", "Experienced Professional", "Profesional experimentado", 1, "Treinado em um Saber"],
  ["additional_lore", "Saber Adicional", "Additional Lore", "Saber adicional", 1, "—"],
  ["unmistakable_lore", "Saber Inconfundível", "Unmistakable Lore", "Saber inconfundible", 2, "Especialista em um Saber"],
  ["legendary_professional", "Profissional Lendário", "Legendary Professional", "Profesional legendario", 15, "Lendário em um Saber"],
];
for (const [slug, pt, en, es, level, prerequisite] of PLAYER_CORE_LORE_FEATS) {
  const id = `feat.skill.lore.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de Saber, nível ${level}${prerequisite !== "—" ? `, que exige ${prerequisite.toLowerCase()}` : ""}.`,
      en: `Lore skill feat, level ${level}${prerequisite !== "—" ? `; requires ${prerequisite}` : ""}.`,
      es: `Dote de Saber, nivel ${level}${prerequisite !== "—" ? `; requiere ${prerequisite}` : ""}.`,
    },
    description: "Talento de perícia de Saber.",
    category: "Perícia",
    type: "Talento",
    level,
    skill: "lore",
    prerequisites: prerequisite === "—" ? [] : [prerequisite],
    prereq: prerequisite === "—" ? [] : [prerequisite],
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_SOURCE, page: 256 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Catálogo Oficial Expandido de Equipamentos & Itens. Preserve o catálogo
// amplo antes da camada compacta legada substituí-lo, para que a normalização
// trilíngue possa ser feita sem perda de dados.
const EXPANDED_ITEM_COMPENDIUM = PF2E_DATA.items;
PF2E_DATA.items = [
  { id: "item.gear.adventurers_pack", name: "Mochila de Aventureiro (Adventurer's Pack)", names: { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" }, mainCategory: "gear", subCategory: "adventuring", level: 0, price: { sp: 15 }, bulk: "1", traits: [], description: "Kit essencial com mochila, saco de dormir, corda, tochas e rações.", source: { book: "Livro do Jogador (Player Core)", page: 287 } },
  { id: "item.gear.backpack", name: "Mochila (Backpack)", names: { "pt-BR": "Mochila", en: "Backpack", es: "Mochila" }, mainCategory: "gear", subCategory: "adventuring", level: 0, price: { sp: 1 }, bulk: "-", traits: [], description: "Armazena até 4 Bulk; os primeiros 2 Bulk guardados não pesam.", source: { book: "Livro do Jogador (Player Core)", page: 287 } },
  { id: "item.gear.healers_toolkit", name: "Kit de Primeiros Socorros (Healer's Toolkit)", names: { "pt-BR": "Kit de Primeiros Socorros", en: "Healer's Toolkit", es: "Herramientas de sanador" }, mainCategory: "gear", subCategory: "toolkits", level: 0, price: { gp: 5 }, bulk: "1", traits: [], description: "Necessário para aplicar a perícia Medicina e Tratar Ferimentos.", source: { book: "Livro do Jogador (Player Core)", page: 289 } },
  { id: "item.gear.thieves_toolkit", name: "Ferramentas de Ladrão (Thieves' Toolkit)", names: { "pt-BR": "Ferramentas de Ladrão", en: "Thieves' Toolkit", es: "Herramientas de ladrón" }, mainCategory: "gear", subCategory: "toolkits", level: 0, price: { gp: 3 }, bulk: "L", traits: [], description: "Necessário para arrombar fechaduras e desativar armadilhas com Ladinagem.", source: { book: "Livro do Jogador (Player Core)", page: 289 } },
  { id: "item.consumable.minor_healing_potion", name: "Poção de Cura Menor (Minor Healing Potion)", names: { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" }, mainCategory: "consumables", subCategory: "potions", level: 1, price: { gp: 4 }, bulk: "L", traits: ["Consumível", "Cura", "Mágico", "Poção"], description: "Restaura 1d8 Pontos de Vida imediatamente ao ser consumida.", source: { book: "Livro do Jogador (Player Core)", page: 295 } },
  { id: "item.consumable.lesser_healing_potion", name: "Poção de Cura Inferior (Lesser Healing Potion)", names: { "pt-BR": "Poção de Cura Inferior", en: "Lesser Healing Potion", es: "Poción de curación inferior" }, mainCategory: "consumables", subCategory: "potions", level: 3, price: { gp: 12 }, bulk: "L", traits: ["Consumível", "Cura", "Mágico", "Poção"], description: "Restaura 2d8+5 Pontos de Vida imediatamente.", source: { book: "Livro do Jogador (Player Core)", page: 295 } },
  { id: "item.magic.boots_of_elvenkind", name: "Botas Élficas (Boots of Elvenkind)", names: { "pt-BR": "Botas Élficas", en: "Boots of Elvenkind", es: "Botas de los elfos" }, mainCategory: "magic_items", subCategory: "worn", level: 7, price: { gp: 250 }, bulk: "L", traits: ["Investido", "Mágico", "Vestível"], description: "+1 em Acrobacia e concede a ação Passo Élfico para ignorar terreno difícil.", source: { book: "Livro do Jogador (Player Core)", page: 300 } },
  { id: "item.magic.weapon_potency_1", name: "Runa de Potência de Arma +1 (Weapon Potency +1)", names: { "pt-BR": "Runa de Potência de Arma +1", en: "+1 Weapon Potency", es: "Potencia de arma +1" }, mainCategory: "magic_items", subCategory: "runes", level: 2, price: { gp: 35 }, bulk: "-", traits: ["Mágico", "Runa"], description: "+1 de bônus de item no ataque com a arma vinculada.", source: { book: "Livro do Jogador (Player Core)", page: 308 } }
];
PF2E_DATA.itemCompendium = EXPANDED_ITEM_COMPENDIUM;

// O compêndio expandido legado não tinha o contrato dos catálogos novos.
// Normalize-o antes de expô-lo ao picker para que o CRUD possa persistir cada
// item com identidade estável. Como estes registros não foram ligados a uma
// página do corpus local, eles permanecem explicitamente em revisão.
const compendiumItemSlugs = new Map();
PF2E_DATA.itemCompendium = (PF2E_DATA.itemCompendium || []).map((record, index) => {
  const label = String(record.name || `Item ${index + 1}`).trim();
  const baseSlug = label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || `item_${index + 1}`;
  const occurrence = (compendiumItemSlugs.get(baseSlug) || 0) + 1;
  compendiumItemSlugs.set(baseSlug, occurrence);
  const slug = occurrence === 1 ? baseSlug : `${baseSlug}_${occurrence}`;
  const description = String(record.description || `${label} compendium entry.`).trim();
  return {
    ...record,
    id: record.id || `item.compendium.${slug}`,
    name: label,
    names: record.names || { "pt-BR": label, en: label, es: label },
    summaries: record.summaries || { "pt-BR": description, en: description, es: description },
    ruleset: record.ruleset || "needs_review",
    needs_review: record.needs_review !== false,
  };
});

// Player Core 2, p. 295: a Bola de Fumaça é um item consumível utilizável,
// além da fórmula já listada na tabela de manufatura.
if (!(PF2E_DATA.itemCompendium || []).some((record) => record.id === "item.pc2.smoke_ball")) {
  PF2E_DATA.itemCompendium.push({
    id: "item.pc2.smoke_ball",
    name: "Bola de Fumaça (Smoke Ball)",
    names: { "pt-BR": "Bola de Fumaça", en: "Smoke Ball", es: "Bola de humo" },
    summaries: {
      "pt-BR": "Item alquímico que libera uma nuvem de fumaça para ocultar uma área.",
      en: "An alchemical item that releases a cloud of smoke to conceal an area.",
      es: "Objeto alquímico que libera una nube de humo para ocultar un área."
    },
    description: "Item alquímico consumível que cria uma nuvem de fumaça espessa, concedendo ocultação na área.",
    mainCategory: "consumables",
    subCategory: "alchemical",
    level: 1,
    price: { gp: 3 },
    bulk: "L",
    traits: ["Alquímico", "Consumível"],
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 295 },
    ruleset: "remaster",
    needs_review: true,
  });
}

// Player Core 2, pp. 301–302: munições mágicas que podem ser adicionadas ao
// inventário e consumidas por armas compatíveis.
const playerCore2MagicalAmmunition = [
  ["horned_arrow", "Flecha de Galhada", "Horned Arrow", "Flecha de astas", 2, 7, "arrow", "Ao atingir, galhadas luminosas prendem o alvo em uma superfície após um salvamento de Reflexos.", "On a hit, luminous antlers pin the target to a surface after a Reflex save.", "Al impactar, unas astas luminosas fijan al objetivo a una superficie tras una salvación de Reflejos."],
  ["storm_arrow", "Flecha de Tempestade", "Storm Arrow", "Flecha de tormenta", 9, 130, "arrow", "Ao atingir, causa 3d12 de dano de eletricidade e exige um salvamento de Reflexos.", "On a hit, it deals 3d12 electricity damage and requires a Reflex save.", "Al impactar, causa 3d12 de daño eléctrico y requiere una salvación de Reflejos."],
  ["viper_arrow", "Flecha de Víbora", "Viper Arrow", "Flecha de víbora", 4, 17, "arrow", "Ao atingir, transforma-se em uma víbora convocada que afeta o alvo com seu veneno.", "On a hit, it transforms into a summoned viper whose poison affects the target.", "Al impactar, se transforma en una víbora convocada cuyo veneno afecta al objetivo."],
  ["sleep_arrow", "Flecha do Sono", "Sleep Arrow", "Flecha del sueño", 3, 10, "arrow", "Não causa dano; uma criatura viva atingida faz um salvamento de Vontade ou fica letárgica e lenta.", "It deals no damage; a living creature hit must make a Will save or become lethargic and slowed.", "No causa daño; una criatura viva impactada debe hacer una salvación de Voluntad o queda aletargada y ralentizada."],
  ["frightening_ammunition", "Munição Aterrorizante", "Frightening Ammunition", "Munición aterrorizante", 6, 50, "any", "Ao ferir, enche a mente do alvo com visões terríveis e pode deixá-lo assustado.", "On a hit, it fills the target's mind with terrifying visions and can make it frightened.", "Al herir, llena la mente del objetivo de visiones aterradoras y puede asustarlo."],
  ["freezing_ammunition", "Munição Congelante", "Freezing Ammunition", "Munición congelante", 5, 25, "any", "Ao atingir, exige um salvamento de Fortitude ou deixa o alvo lento pelo frio intenso.", "On a hit, it requires a Fortitude save or slows the target from intense cold.", "Al impactar, requiere una salvación de Fortaleza o ralentiza al objetivo por el frío intenso."],
  ["corrosive_ammunition", "Munição Corrosiva", "Corrosive Ammunition", "Munición corrosiva", 7, 70, "any", "Ao atingir, causa 1d8 de dano de ácido persistente que ignora a Dureza da armadura.", "On a hit, it deals 1d8 persistent acid damage that ignores armor Hardness.", "Al impactar, causa 1d8 de daño de ácido persistente que ignora la Dureza de la armadura."],
  ["disintegration_bolt", "Virote de Desintegração", "Disintegration Bolt", "Virote de desintegración", 15, 1300, "bolt", "Ao atingir, afeta o alvo como a magia desintegrar após um salvamento de Fortitude.", "On a hit, it affects the target like the disintegrate spell after a Fortitude save.", "Al impactar, afecta al objetivo como el conjuro desintegrar tras una salvación de Fortaleza."]
];
for (const [slug, pt, en, es, level, price, ammunitionType, ptSummary, enSummary, esSummary] of playerCore2MagicalAmmunition) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "ammunition", subCategory: "magical", ammunitionType, level, price: { gp: price }, bulk: "-",
    traits: ["Consumível", "Mágico", "Munição"], source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: ["horned_arrow", "storm_arrow", "viper_arrow", "sleep_arrow"].includes(slug) ? 301 : 302 },
    ruleset: "remaster", needs_review: true,
  });
}

// Player Core 2, p. 304: consumíveis de poção que também devem aparecer no
// inventário, e não apenas na tabela de tesouros.
const playerCore2Consumables = [
  ["urgent_escape_potion", "Poção de Fuga Urgente", "Urgent Escape Potion", "Poción de fuga urgente", 1, 3, "Ao beber, fica fugindo por 1 minuto, recebe +12 metros nas Velocidades e Anda imediatamente.", "When consumed, you flee for 1 minute, gain a +12-meter status bonus to Speeds, and immediately Stride.", "Al beberla, huyes durante 1 minuto, obtienes +12 metros a las Velocidades y Avanzas inmediatamente."],
  ["retaliation_potion_minimum", "Poção da Retaliação Mínima", "Retaliation Potion (Minimum)", "Poción de represalia mínima", 1, 4, "Por 1 minuto, uma aura causa 1 de dano de ácido, eletricidade, fogo ou frio a quem tocar você.", "For 1 minute, an aura deals 1 acid, electricity, fire, or cold damage to creatures that touch you.", "Durante 1 minuto, una aura causa 1 de daño de ácido, electricidad, fuego o frío a quienes te toquen."],
  ["ration_tonic", "Tônico de Ração", "Ration Tonic", "Tónico de ración", 1, 3, "Ao beber, você fica magicamente alimentado com o equivalente a um dia de comida e água.", "When consumed, you become magically nourished with the equivalent of one day's food and water.", "Al beberlo, quedas alimentado mágicamente con el equivalente a un día de comida y agua."]
];
for (const [slug, pt, en, es, level, price, ptSummary, enSummary, esSummary] of playerCore2Consumables) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "consumables", subCategory: "potions", level, price: { gp: price }, bulk: "L",
    traits: ["Consumível", "Mágico", "Poção"], source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 304 },
    ruleset: "remaster", needs_review: true,
  });
}

// Player Core 2, pp. 295–296 e 303: ferramentas/óleos consumíveis faltantes
// no compêndio de itens utilizáveis.
const playerCore2AlchemicalTools = [
  ["snake_oil", "Óleo de Cobra", "Snake Oil", "Aceite de serpiente", 1, 2, 295, "Disfarça temporariamente o cheiro e a aparência de um objeto para dificultar sua identificação.", "Temporarily masks an object's smell and appearance to make identification harder.", "Oculta temporalmente el olor y la apariencia de un objeto para dificultar su identificación."],
  ["ghost_ink", "Tinta Fantasma", "Ghost Ink", "Tinta fantasmal", 1, 3, 296, "Tinta alquímica que fica invisível até ser revelada por um método apropriado.", "Alchemical ink that remains invisible until revealed by an appropriate method.", "Tinta alquímica que permanece invisible hasta que un método apropiado la revela."],
  ["mystic_shield_paste", "Pasta de Escudo Místico", "Mystic Armor Paste", "Pasta de escudo místico", 2, 4, 303, "Reforça temporariamente uma armadura ou escudo contra um tipo de energia escolhido.", "Temporarily reinforces armor or a shield against a chosen energy type.", "Refuerza temporalmente una armadura o escudo contra un tipo de energía elegido."],
  ["revelation_oil", "Óleo da Revelação", "Oil of Revelation", "Aceite de revelación", 5, 25, 303, "Revela marcas, escritas e propriedades ocultas em uma superfície tratada.", "Reveals hidden marks, writing, and properties on a treated surface.", "Revela marcas, escrituras y propiedades ocultas en una superficie tratada."],
  ["cunning_salve", "Unguento Ardiloso", "Cunning Salve", "Ungüento astuto", 4, 25, 303, "Unguento mágico que melhora temporariamente uma tentativa de Enganação ou disfarce.", "A magic salve that temporarily improves a Deception or disguise attempt.", "Un ungüento mágico que mejora temporalmente una prueba de Engaño o disfraz."]
];
for (const [slug, pt, en, es, level, price, page, ptSummary, enSummary, esSummary] of playerCore2AlchemicalTools) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "consumables", subCategory: "alchemical_tools", level, price: { gp: price }, bulk: "L",
    traits: ["Alquímico", "Consumível"], source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page },
    ruleset: "remaster", needs_review: true,
  });
}

// Player Core 2, pp. 286–298: primeiras entradas da tabela de tesouros que
// também podem ser compradas, armazenadas e usadas pelo personagem.
const playerCore2TreasureTableItems = [
  ["minor_antidote", "Antídoto Menor", "Lesser Antidote", "Antídoto menor", "elixirs", 1, 3, 286, "Elixir alquímico que auxilia contra venenos; consulte a descrição completa para o teste e a duração.", "Alchemical elixir that assists against poisons; see the full entry for the check and duration.", "Elixir alquímico que ayuda contra venenos; consulta la entrada completa para la prueba y duración."],
  ["minor_antiplague", "Antipeste Menor", "Lesser Antiplague", "Antipeste menor", "elixirs", 1, 3, 286, "Elixir alquímico usado contra doenças; o efeito completo permanece marcado para revisão.", "Alchemical elixir used against diseases; the full effect remains flagged for review.", "Elixir alquímico usado contra enfermedades; el efecto completo queda marcado para revisión."],
  ["alarm_snare", "Arapuca de Alarme", "Alarm Snare", "Trampa de alarma", "snares", 1, 3, 298, "Arapuca que emite um alerta quando uma criatura entra na área preparada.", "A snare that emits an alert when a creature enters the prepared area.", "Una trampa que emite una alerta cuando una criatura entra en el área preparada."],
  ["spike_snare", "Arapuca de Espinho", "Spike Snare", "Trampa de púas", "snares", 1, 3, 298, "Arapuca que fere e pode impedir o movimento de uma criatura que a aciona.", "A snare that injures and can impede a creature that triggers it.", "Una trampa que hiere y puede impedir el movimiento de una criatura que la activa."],
  ["caltrop_snare", "Arapuca de Estrepes", "Caltrop Snare", "Trampa de abrojos", "snares", 1, 3, 298, "Arapuca que espalha estrepes e dificulta o deslocamento na área preparada.", "A snare that scatters caltrops and hinders movement in the prepared area.", "Una trampa que dispersa abrojos y dificulta el movimiento en el área preparada."],
  ["arsenic", "Arsênico", "Arsenic", "Arsénico", "poisons", 1, 3, 291, "Veneno ingerido; CD, dano e efeitos detalhados devem ser conferidos na entrada do livro.", "Ingested poison; DC, damage, and detailed effects must be checked against the book entry.", "Veneno ingerido; la CD, el daño y los efectos detallados deben verificarse en la entrada del libro."],
  ["bright_rod", "Bastão Brilhante", "Bright Rod", "Bastón brillante", "alchemical_tools", 1, 3, 295, "Ferramenta alquímica que fornece iluminação intensa por sua duração.", "An alchemical tool that provides bright illumination for its duration.", "Herramienta alquímica que proporciona iluminación intensa durante su duración."],
  ["silver_lotion", "Loção de Prata", "Silver Lotion", "Loción de plata", "alchemical_tools", 2, 6, 295, "Loção alquímica aplicada a uma criatura ou objeto para interagir com efeitos de prata.", "An alchemical lotion applied to a creature or object to interact with silver effects.", "Loción alquímica aplicada a una criatura u objeto para interactuar con efectos de plata."],
  ["belladonna", "Beladona", "Belladonna", "Belladona", "poisons", 2, 5, 291, "Veneno ingerido de nível 2; a progressão e os efeitos completos permanecem para conferência.", "A level 2 ingested poison; progression and full effects remain to be verified.", "Veneno ingerido de nivel 2; la progresión y los efectos completos quedan para verificación."],
  ["hunters_bane", "Ruína do Caçador", "Hunter's Bane", "Ruina del cazador", "talismans", 2, 6, 305, "Talismã consumível que auxilia contra uma criatura escolhida como presa.", "A consumable talisman that assists against a creature chosen as prey.", "Talismán consumible que ayuda contra una criatura elegida como presa."],
  ["minor_glue_bomb", "Bomba de Cola Menor", "Lesser Glue Bomb", "Bomba de pegamento menor", "bombs", 1, 3, 283, "Bomba alquímica que deixa uma área ou alvo pegajoso; CD e duração devem ser conferidas no livro.", "Alchemical bomb that makes an area or target sticky; check the book for DC and duration.", "Bomba alquímica que vuelve pegajosa un área o criatura; verifica CD y duración en el libro."],
  ["minor_weakening_bomb", "Bomba de Esmorecimento Menor", "Lesser Numbing Bomb", "Bomba de debilitamiento menor", "bombs", 1, 3, 283, "Bomba alquímica que enfraquece temporariamente o alvo atingido.", "Alchemical bomb that temporarily weakens the struck target.", "Bomba alquímica que debilita temporalmente al objetivo alcanzado."],
  ["minor_ghost_charge", "Carga Fantasma Menor", "Lesser Ghost Charge", "Carga fantasmal menor", "bombs", 1, 3, 284, "Bomba alquímica com efeito especialmente útil contra criaturas incorpóreas.", "Alchemical bomb with an effect especially useful against incorporeal creatures.", "Bomba alquímica con un efecto especialmente útil contra criaturas incorpóreas."],
  ["forensic_dye", "Corante Forense", "Forensic Dye", "Tinte forense", "alchemical_tools", 1, 3, 295, "Ferramenta alquímica que ajuda a marcar ou revelar evidências durante uma investigação.", "Alchemical tool that helps mark or reveal evidence during an investigation.", "Herramienta alquímica que ayuda a marcar o revelar pruebas durante una investigación."],
  ["minor_life_elixir", "Elixir da Vida Mínimo", "Minor Elixir of Life", "Elixir de vida mínimo", "elixirs", 1, 3, 287, "Elixir que restaura uma pequena quantidade de Pontos de Vida quando consumido.", "Elixir that restores a small amount of Hit Points when consumed.", "Elixir que restaura una pequeña cantidad de Puntos de Golpe al consumirse."],
  ["minor_gender_transition_elixir", "Elixir de Transição de Gênero Menor", "Lesser Gender-Transition Elixir", "Elixir menor de transición de género", "elixirs", 1, 1, 287, "Elixir que altera temporariamente características sexuais conforme a descrição da entrada.", "Elixir that temporarily changes sex characteristics as described in the entry.", "Elixir que cambia temporalmente características sexuales según la descripción."],
  ["minor_cheetah_elixir", "Elixir do Guepardo Menor", "Lesser Cheetah's Elixir", "Elixir menor del guepardo", "elixirs", 1, 3, 287, "Elixir que melhora temporariamente deslocamento e mobilidade.", "Elixir that temporarily improves Speed and mobility.", "Elixir que mejora temporalmente la Velocidad y la movilidad."],
  ["minor_eagle_eye_elixir", "Elixir do Olho de Águia Menor", "Lesser Eagle-Eye Elixir", "Elixir menor del ojo de águila", "elixirs", 1, 4, 288, "Elixir que melhora temporariamente a percepção visual e ataques à distância.", "Elixir that temporarily improves visual perception and ranged attacks.", "Elixir que mejora temporalmente la percepción visual y los ataques a distancia."],
  ["minor_alchemical_fire", "Fogo Alquímico Menor", "Lesser Alchemist's Fire", "Fuego alquímico menor", "bombs", 1, 3, 284, "Bomba alquímica que causa dano de fogo e pode iniciar combustão persistente.", "Alchemical bomb that deals fire damage and can start persistent combustion.", "Bomba alquímica que causa daño de fuego y puede iniciar combustión persistente."],
  ["minor_frost_vial", "Frasco Congelante Menor", "Lesser Frost Vial", "Vial de escarcha menor", "bombs", 1, 3, 285, "Bomba alquímica que causa dano de frio e deixa o alvo vulnerável ao gelo.", "Alchemical bomb that deals cold damage and leaves the target vulnerable to ice.", "Bomba alquímica que causa daño de frío y deja al objetivo vulnerable al hielo."],
  ["minor_acid_flask", "Frasco de Ácido Menor", "Lesser Acid Flask", "Frasco de ácido menor", "bombs", 1, 3, 285, "Bomba alquímica que causa dano de ácido, incluindo possível dano persistente.", "Alchemical bomb that deals acid damage, including possible persistent damage.", "Bomba alquímica que causa daño de ácido, incluido posible daño persistente."],
  ["minor_bestial_mutagen", "Mutagênico Bestial Menor", "Lesser Bestial Mutagen", "Mutágeno bestial menor", "mutagens", 1, 4, 289, "Mutagênico que altera temporariamente o corpo e oferece benefícios e penalidades conforme a entrada.", "Mutagen that temporarily alters the body with benefits and drawbacks described in the entry.", "Mutágeno que altera temporalmente el cuerpo con beneficios y penalizaciones descritos en la entrada."],
  ["minor_silver_lingua_mutagen", "Mutagênico de Língua de Prata Menor", "Lesser Silver Tongue Mutagen", "Mutágeno menor de lengua de plata", "mutagens", 1, 4, 289, "Mutagênico que melhora temporariamente a comunicação e habilidades sociais.", "Mutagen that temporarily improves communication and social skills.", "Mutágeno que mejora temporalmente la comunicación y las habilidades sociales."],
  ["minor_mercury_mutagen", "Mutagênico de Mercúrio Menor", "Lesser Mercury Mutagen", "Mutágeno menor de mercurio", "mutagens", 1, 4, 290, "Mutagênico que altera temporariamente reflexos e mobilidade, com efeitos colaterais.", "Mutagen that temporarily changes reflexes and mobility, with drawbacks.", "Mutágeno que cambia temporalmente reflejos y movilidad, con efectos secundarios."],
  ["minor_unstoppable_mutagen", "Mutagênico do Irrefreável Menor", "Lesser Juggernaut Mutagen", "Mutágeno menor del imparable", "mutagens", 1, 4, 290, "Mutagênico que reforça o corpo contra certos efeitos, com penalidades conforme a entrada.", "Mutagen that reinforces the body against certain effects, with entry-specific drawbacks.", "Mutágeno que refuerza el cuerpo contra ciertos efectos, con penalizaciones propias de la entrada."],
  ["minor_serene_mutagen", "Mutagênico Sereno Menor", "Lesser Serene Mutagen", "Mutágeno sereno menor", "mutagens", 1, 4, 290, "Mutagênico que estabiliza a mente e modifica temporariamente respostas emocionais.", "Mutagen that steadies the mind and temporarily changes emotional responses.", "Mutágeno que estabiliza la mente y cambia temporalmente las respuestas emocionales."],
  ["minor_detonating_stone", "Pedra Detonante Menor", "Lesser Detonating Stone", "Piedra detonante menor", "bombs", 1, 3, 285, "Bomba alquímica que causa uma detonação de impacto na área atingida.", "Alchemical bomb that causes an impact detonation in the affected area.", "Bomba alquímica que provoca una detonación de impacto en el área afectada."],
  ["minor_bottled_lightning", "Relâmpago Engarrafado Menor", "Lesser Bottled Lightning", "Relámpago embotellado menor", "bombs", 1, 3, 285, "Bomba alquímica elétrica que pode deixar o alvo desprevenido por um breve período.", "Electrical alchemical bomb that can leave the target off-guard briefly.", "Bomba alquímica eléctrica que puede dejar desprevenido al objetivo brevemente."],
  ["giant_centipede_venom", "Veneno de Centopeia Gigante", "Giant Centipede Venom", "Veneno de ciempiés gigante", "poisons", 1, 4, 294, "Veneno aplicado; CD, dano e progressão devem ser conferidos na entrada do livro.", "Applied poison; check the book entry for DC, damage, and progression.", "Veneno aplicado; verifica la entrada para CD, daño y progresión."],
  ["dead_weight_snare", "Arapuca de Peso Morto", "Deadweight Snare", "Trampa de peso muerto", "snares", 2, 6, 299, "Arapuca que aumenta o peso do alvo e dificulta seu deslocamento quando acionada.", "A snare that increases the target's weight and hinders movement when triggered.", "Trampa que aumenta el peso del objetivo y dificulta su movimiento al activarse."],
  ["signaling_snare", "Arapuca Sinalizadora", "Signaling Snare", "Trampa señalizadora", "snares", 2, 5, 300, "Arapuca que produz um sinal audível ou visual quando uma criatura entra na área preparada.", "A snare that produces an audible or visual signal when a creature enters the prepared area.", "Trampa que produce una señal audible o visual cuando una criatura entra en el área preparada."],
  ["marking_snare", "Arapuca de Marcar", "Marking Snare", "Trampa marcadora", "snares", 2, 3, 299, "Arapuca que marca a criatura atingida para facilitar seu rastreamento.", "A snare that marks the struck creature to make tracking it easier.", "Trampa que marca a la criatura alcanzada para facilitar su rastreo."],
  ["hindering_snare", "Arapuca Impeditiva", "Hindering Snare", "Trampa impeditiva", "snares", 2, 3, 300, "Arapuca que impõe uma penalidade de movimento ou cria uma obstrução ao ser acionada.", "A snare that penalizes movement or creates an obstruction when triggered.", "Trampa que penaliza el movimiento o crea una obstrucción al activarse."]
  , ["lethargy_poison", "Veneno de Letargia", "Lethargy Poison", "Veneno de letargo", "poisons", 2, 7, 292, "Veneno aplicado que provoca letargia; estágios e efeitos completos permanecem marcados para revisão.", "Applied poison that causes lethargy; full stages and effects remain flagged for review.", "Veneno aplicado que causa letargo; las etapas y efectos completos quedan marcados para revisión."]
  , ["black_adder_venom", "Veneno de Víbora Negra", "Black Adder Venom", "Veneno de víbora negra", "poisons", 2, 6, 292, "Veneno aplicado de víbora negra; estágios e efeitos completos permanecem marcados para revisão.", "Applied black adder venom; full stages and effects remain flagged for review.", "Veneno aplicado de víbora negra; las etapas y efectos completos quedan marcados para revisión."]
  , ["cytillesh_oil", "Óleo de Cytillesh", "Cytillesh Oil", "Aceite de cytillesh", "poisons", 3, 10, 292, "Óleo venenoso aplicado; CD, dano e progressão devem ser conferidos na entrada do livro.", "Applied poisonous oil; check the book entry for DC, damage, and progression.", "Aceite venenoso aplicado; verifica la entrada para CD, daño y progresión."]
  , ["grave_root", "Raiz do Túmulo", "Grave Root", "Raíz de tumba", "poisons", 3, 10, 293, "Veneno de ferimento que confunde a mente; a progressão completa permanece marcada para revisão.", "Wound poison that befuddles the mind; full progression remains flagged for review.", "Veneno de herida que confunde la mente; la progresión completa queda marcada para revisión."]
  , ["spider_venom", "Veneno de Aranha", "Spider Venom", "Veneno de araña", "poisons", 5, 25, 294, "Veneno aplicado de aranha; CD, dano e progressão devem ser conferidos na entrada do livro.", "Applied spider venom; check the book entry for DC, damage, and progression.", "Veneno aplicado de araña; verifica la entrada para CD, daño y progresión."]
  , ["giant_scorpion_venom", "Veneno de Escorpião Gigante", "Giant Scorpion Venom", "Veneno de escorpión gigante", "poisons", 6, 40, 292, "Veneno aplicado de escorpião gigante; CD, dano e progressão devem ser conferidos na entrada do livro.", "Applied giant scorpion venom; check the book entry for DC, damage, and progression.", "Veneno aplicado de escorpión gigante; verifica la entrada para CD, daño y progresión."]
  , ["rooting_toxin", "Toxina de Enraizamento", "Rooting Toxin", "Toxina de enraizamiento", "poisons", 7, 55, 293, "Veneno de contato que reduz deslocamento e coordenação; a progressão completa permanece marcada para revisão.", "Contact poison that reduces Speed and coordination; full progression remains flagged for review.", "Veneno de contacto que reduce la Velocidad y coordinación; la progresión completa queda marcada para revisión."]
  , ["nettleseed_residue", "Resíduo de Urtiga", "Nettleweed Residue", "Residuo de ortiga", "poisons", 8, 75, 293, "Veneno de contato que causa dano persistente; CD e estágios devem ser conferidos no livro.", "Contact poison that deals persistent damage; check the book for DC and stages.", "Veneno de contacto que causa daño persistente; verifica CD y etapas en el libro."]
  , ["wyvern_poison", "Veneno de Wyvern", "Wyvern Poison", "Veneno de wyvern", "poisons", 8, 80, 294, "Veneno aplicado de wyvern; CD, dano e progressão devem ser conferidos na entrada do livro.", "Applied wyvern poison; check the book entry for DC, damage, and progression.", "Veneno aplicado de wyvern; verifica la entrada para CD, daño y progresión."]
  , ["weakening_powder", "Pó Debilitante", "Weakening Powder", "Polvo debilitante", "poisons", 9, 110, 292, "Veneno ingerido que pode deixar a vítima fatigada ou paralisada; estágios completos permanecem marcados para revisão.", "Ingested poison that can leave a victim fatigued or paralyzed; full stages remain flagged for review.", "Veneno ingerido que puede dejar fatigada o paralizada a la víctima; las etapas completas quedan marcadas para revisión."]
  , ["spider_root", "Raiz de Aranha", "Spider Root", "Raíz de araña", "poisons", 9, 110, 292, "Veneno de contato que deixa a vítima desajeitada; estágios completos permanecem marcados para revisão.", "Contact poison that makes the victim clumsy; full stages remain flagged for review.", "Veneno de contacto que vuelve torpe a la víctima; las etapas completas quedan marcadas para revisión."]
  , ["aconite", "Acônito", "Aconite", "Acónito", "poisons", 10, 155, 291, "Veneno ingerido de acônito; CD, dano e progressão devem ser conferidos na entrada do livro.", "Ingested aconite poison; check the book entry for DC, damage, and progression.", "Veneno ingerido de acónito; verifica la entrada para CD, daño y progresión."]
  , ["draining_shadow", "Sombra Desgastante", "Draining Shadow", "Sombra agotadora", "poisons", 10, 160, 293, "Veneno aplicado com dano e efeito enfraquecido; estágios completos permanecem marcados para revisão.", "Applied poison with damage and a weakening effect; full stages remain flagged for review.", "Veneno aplicado con daño y efecto debilitante; las etapas completas quedan marcadas para revisión."]
  , ["black_lotus_extract", "Extrato de Lótus Negra", "Black Lotus Extract", "Extracto de loto negro", "poisons", 19, 6500, 292, "Veneno virulento de contato; CD, dano e progressão devem ser conferidos na entrada do livro.", "Virulent contact poison; check the book entry for DC, damage, and progression.", "Veneno de contacto virulento; verifica la entrada para CD, daño y progresión."]
  , ["death_takings", "Lágrimas da Morte", "Tears of Death", "Lágrimas de la muerte", "poisons", 20, 12000, 292, "Veneno virulento de contato; CD, dano e progressão devem ser conferidos na entrada do livro.", "Virulent contact poison; check the book entry for DC, damage, and progression.", "Veneno de contacto virulento; verifica la entrada para CD, daño y progresión."]
  , ["cave_worm_venom", "Veneno de Vorme da Caverna", "Cave Worm Venom", "Veneno de gusano de caverna", "poisons", 12, 500, 294, "Veneno aplicado que enfraquece a vítima; a progressão completa permanece marcada para revisão.", "Applied poison that weakens the victim; full progression remains flagged for review.", "Veneno aplicado que debilita a la víctima; la progresión completa queda marcada para revisión."]
  , ["torpor_wine", "Vinho de Torpor", "Torpor Wine", "Vino de sopor", "poisons", 12, 325, 294, "Veneno ingerido com efeito de sono; CD, dano e progressão devem ser conferidos no livro.", "Ingested poison with a sleep effect; check the book for DC, damage, and progression.", "Veneno ingerido con efecto de sueño; verifica el libro para CD, daño y progresión."]
  , ["hemlock", "Cicuta", "Hemlock", "Cicuta", "poisons", 17, 2250, 292, "Veneno ingerido de alta letalidade; CD, dano e progressão devem ser conferidos na entrada do livro.", "Highly lethal ingested poison; check the book entry for DC, damage, and progression.", "Veneno ingerido de alta letalidad; verifica la entrada para CD, daño y progresión."]
  , ["death_cap_powder", "Pó de Chapéu-da-Morte", "Death Cap Powder", "Polvo de sombrerillo de la muerte", "poisons", 13, 450, 292, "Veneno ingerido de cogumelo; estágios e efeitos completos permanecem marcados para revisão.", "Ingested mushroom poison; full stages and effects remain flagged for review.", "Veneno ingerido de hongo; las etapas y efectos completos quedan marcados para revisión."]
  , ["kings_sleep", "Sono do Rei", "King's Sleep", "Sueño del rey", "poisons", 18, 4000, 293, "Veneno ingerido virulento de longa duração; CD, dano e progressão devem ser conferidos no livro.", "Long-duration virulent ingested poison; check the book for DC, damage, and progression.", "Veneno ingerido virulento de larga duración; verifica el libro para CD, daño y progresión."]
  , ["cerulean_scourge", "Flagelo Cerúleo", "Cerulean Scourge", "Flagelo cerúleo", "poisons", 16, 1450, 292, "Veneno de ferimento que causa dano intenso; estágios completos permanecem marcados para revisão.", "Wound poison that deals intense damage; full stages remain flagged for review.", "Veneno de herida que causa daño intenso; las etapas completas quedan marcadas para revisión."]
  , ["sulfur_vapors", "Vapores de Enxofre", "Sulfur Vapors", "Vapores de azufre", "poisons", 16, 1500, 294, "Veneno inalado que enfraquece e pode desacelerar a vítima; efeitos completos permanecem marcados para revisão.", "Inhaled poison that weakens and can slow a victim; full effects remain flagged for review.", "Veneno inhalado que debilita y puede ralentizar a la víctima; los efectos completos quedan marcados para revisión."]
  , ["fogged_mind_mist", "Bruma de Mente Enevoada", "Fogged Mind Mist", "Bruma de mente nublada", "poisons", 15, 1000, 291, "Veneno inalado que prejudica faculdades mentais; CD, dano e progressão devem ser conferidos no livro.", "Inhaled poison that impairs mental faculties; check the book for DC, damage, and progression.", "Veneno inhalado que perjudica las facultades mentales; verifica el libro para CD, daño y progresión."]
  , ["fear_flower_nectar", "Néctar de Flor do Medo", "Fearflower Nectar", "Néctar de flor del miedo", "poisons", 4, 16, 292, "Veneno de ferimento que causa pânico e dano; estágios completos permanecem marcados para revisão.", "Wound poison that causes panic and damage; full stages remain flagged for review.", "Veneno de herida que causa pánico y daño; las etapas completas quedan marcadas para revisión."]
  , ["inert_leg", "Perna Inerte", "Inert Leg", "Pierna inerte", "poisons", 4, 15, 292, "Veneno de ferimento que deixa as extremidades dormentes e reduz deslocamento; estágios permanecem para revisão.", "Wound poison that numbs the extremities and reduces Speed; stages remain flagged for review.", "Veneno de herida que adormece las extremidades y reduce la Velocidad; las etapas quedan para revisión."]
  , ["pragardent_resin", "Resina de Pragardente", "Pragardent Resin", "Resina de pragardente", "poisons", 11, 225, 293, "Veneno de contato que causa dano persistente; CD e progressão devem ser conferidos na entrada do livro.", "Contact poison that deals persistent damage; check the book entry for DC and progression.", "Veneno de contacto que causa daño persistente; verifica la entrada para CD y progresión."]
];
for (const [slug, pt, en, es, subCategory, level, price, page, ptSummary, enSummary, esSummary] of playerCore2TreasureTableItems) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "consumables", subCategory, level, price: { gp: price }, bulk: "L",
    traits: ["Consumível"], source: { book: PLAYER_CORE_2_SOURCE, page },
    ruleset: "remaster", needs_review: true,
  });
}

// Player Core 2, pp. 307 e 311: itens permanentes da tabela de tesouros.
const playerCore2PermanentTreasureItems = [
  ["predictable_silver_coin", "Moeda de Prata Previsível", "Predictable Silver Coin", "Moneda de plata predecible", "held", 1, 3, 307, "Moeda mágica cujo resultado previsível pode ser útil em uma decisão ou aposta.", "A magic coin with a predictable result that can help with a decision or wager.", "Moneda mágica con un resultado predecible que puede ayudar en una decisión o apuesta."],
  ["lesser_articulated_wire", "Fio Articulado Menor", "Lesser Articulated Wire", "Alambre articulado menor", "held", 3, 45, 307, "Fio mágico flexível usado para manipular, prender ou alcançar objetos a distância curta.", "Flexible magic wire used to manipulate, secure, or reach objects at short range.", "Alambre mágico flexible para manipular, asegurar o alcanzar objetos a corta distancia."],
  ["alchemists_goggles", "Óculos de Alquimista", "Alchemist's Goggles", "Gafas de alquimista", "worn", 4, 100, 311, "Óculos investidos que auxiliam a identificar e trabalhar com substâncias alquímicas.", "Invested goggles that assist with identifying and working with alchemical substances.", "Gafas investidas que ayudan a identificar y trabajar con sustancias alquímicas."]
  , ["predictive_veil", "Véu Prognóstico", "Predictive Veil", "Velo pronóstico", "worn", 10, 1000, 311, "Véu focado que concede bônus em Religião e pode alimentar uma magia de revelação uma vez por dia; requer um oráculo.", "Focused veil that grants a Religion bonus and can fuel a revelation spell once per day; requires an oracle.", "Velo enfocado que concede un bonificador a Religión y puede alimentar un conjuro de revelación una vez al día; requiere un oráculo."]
  , ["greater_predictive_veil", "Véu Prognóstico Maior", "Greater Predictive Veil", "Velo pronóstico mayor", "worn", 18, 21000, 311, "Versão maior do Véu Prognóstico, com bônus aprimorado e ativação adicional; requer um oráculo.", "Greater version of the Predictive Veil with an improved bonus and additional activation; requires an oracle.", "Versión mayor del Velo pronóstico, con bonificador mejorado y activación adicional; requiere un oráculo."]
  , ["blood_pendant", "Pingente Sanguíneo", "Blood Pendant", "Colgante sanguíneo", "worn", 10, 1000, 311, "Pingente focado associado a uma linhagem de feiticeiro; concede bônus às perícias de linhagem e pode gerar um Ponto de Foco uma vez por dia.", "Focused pendant tied to a sorcerer bloodline; grants a bonus to bloodline skills and can generate a Focus Point once per day.", "Colgante enfocado vinculado a una línea de sangre de hechicero; concede un bonificador a las habilidades de linaje y puede generar 1 Punto de Foco una vez al día."]
  , ["greater_blood_pendant", "Pingente Sanguíneo Maior", "Greater Blood Pendant", "Colgante sanguíneo mayor", "worn", 17, 13000, 311, "Versão maior do Pingente Sanguíneo, com bônus aprimorado; requer um feiticeiro da linhagem associada.", "Greater version of the Blood Pendant with an improved bonus; requires a sorcerer of the associated bloodline.", "Versión mayor del Colgante sanguíneo, con bonificador mejorado; requiere un hechicero del linaje asociado."]
  , ["smiling_devil_disguise", "Disfarce do Diabo Sorridente", "Smiling Devil Disguise", "Disfraz del diablo sonriente", "worn", 5, 700, 310, "Disfarce mágico equipado que concede capacidades infernais e pode emitir um grito medonho; efeitos completos permanecem para revisão.", "Worn magical disguise that grants infernal abilities and can unleash a dreadful scream; full effects remain under review.", "Disfraz mágico equipado que concede capacidades infernales y puede emitir un grito aterrador; los efectos completos quedan en revisión."]
  , ["greater_smiling_devil_disguise", "Disfarce do Diabo Sorridente Maior", "Greater Smiling Devil Disguise", "Disfraz del diablo sonriente mayor", "worn", 15, 35000, 310, "Versão maior do Disfarce do Diabo Sorridente, com poderes infernais aprimorados; efeitos completos permanecem para revisão.", "Greater version of the Smiling Devil Disguise with improved infernal powers; full effects remain under review.", "Versión mayor del Disfraz del diablo sonriente con poderes infernales mejorados; los efectos completos quedan en revisión."]
  , ["manto_of_rage", "Manto do Amoque", "Manto of Rage", "Manto del frenesí", "worn", 12, 2000, 310, "Manto investido que concede ataques desarmados e aprimora runas durante a Fúria; efeitos completos permanecem para revisão.", "Invested cloak that grants unarmed attacks and improves runes while raging; full effects remain under review.", "Manto investido que concede ataques desarmados y mejora runas durante la Furia; los efectos completos quedan en revisión."]
  , ["greater_manto_of_rage", "Manto do Amoque Maior", "Greater Manto of Rage", "Manto del frenesí mayor", "worn", 19, 40000, 310, "Versão maior do Manto do Amoque, com runas e ataques aprimorados durante a Fúria; efeitos completos permanecem para revisão.", "Greater version of the Manto of Rage with improved runes and attacks while raging; full effects remain under review.", "Versión mayor del Manto del frenesí, con runas y ataques mejorados durante la Furia; los efectos completos quedan en revisión."]
];
for (const [slug, pt, en, es, subCategory, level, price, page, ptSummary, enSummary, esSummary] of playerCore2PermanentTreasureItems) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "magic_items", subCategory, level, price: { gp: price }, bulk: "L",
    traits: ["Mágico"], source: { book: PLAYER_CORE_2_SOURCE, page },
    prerequisites: slug.includes("predictive_veil") ? ["Oráculo"] : slug.includes("blood_pendant") ? ["Feiticeiro"] : undefined,
    ruleset: "remaster", needs_review: true,
  });
}

// Player Core 2, pp. 286–288: elixires da tabela de tesouros.
const playerCore2TreasureElixirs = [
  ["minor_bottled_catharsis", "Catarse Engarrafada Mínima", "Minor Bottled Catharsis", "Catarsis embotellada mínima", 1, 5, 286, "Elixir que ajuda a encerrar uma condição emocional ou mental conforme a entrada do livro.", "Elixir that helps end an emotional or mental condition as described in the entry.", "Elixir que ayuda a terminar una condición emocional o mental según la entrada."],
  ["lesser_comprehension_elixir", "Elixir da Compreensão Menor", "Lesser Comprehension Elixir", "Elixir menor de comprensión", 2, 7, 286, "Elixir que melhora temporariamente a compreensão de idiomas e comunicação.", "Elixir that temporarily improves language comprehension and communication.", "Elixir que mejora temporalmente la comprensión de idiomas y la comunicación."],
  ["lesser_darkvision_elixir", "Elixir de Visão no Escuro Menor", "Lesser Darkvision Elixir", "Elixir menor de visión en la oscuridad", 2, 6, 287, "Elixir que concede visão no escuro por sua duração.", "Elixir that grants darkvision for its duration.", "Elixir que concede visión en la oscuridad durante su duración."],
  ["cats_eye_elixir", "Elixir do Olho de Gato", "Cat's Eye Elixir", "Elixir del ojo de gato", 2, 7, 286, "Elixir que aguça a visão e auxilia em situações de pouca luz.", "Elixir that sharpens sight and helps in low-light situations.", "Elixir que agudiza la vista y ayuda en situaciones de poca luz."],
  ["lesser_bravery_mix", "Mistura do Bravo Menor", "Lesser Bravo's Brew", "Mezcla menor del bravo", 2, 7, 286, "Elixir que fortalece temporariamente a coragem contra medo e efeitos semelhantes.", "Elixir that temporarily bolsters courage against fear and similar effects.", "Elixir que refuerza temporalmente el valor contra miedo y efectos similares."],
  ["minimal_vigor_serum", "Soro Revigorante Mínimo", "Minimal Revitalizing Serum", "Suero revitalizante mínimo", 1, 5, 288, "Elixir que restaura vigor e concede recuperação limitada conforme a descrição completa.", "Elixir that restores vigor and provides limited recovery as described in the full entry.", "Elixir que restaura vigor y proporciona recuperación limitada según la descripción completa."],
  ["lesser_bomber_eye_elixir", "Elixir do Olho de Bombardeiro Menor", "Lesser Bomber's Eye Elixir", "Elixir menor del ojo del bombardero", 4, 14, 288, "Elixir que melhora temporariamente a percepção e o uso de bombas alquímicas.", "Elixir that temporarily improves perception and the use of alchemical bombs.", "Elixir que mejora temporalmente la percepción y el uso de bombas alquímicas."],
  ["lesser_stone_fist_elixir", "Elixir do Punho de Pedra", "Lesser Stone Fist Elixir", "Elixir menor del puño de piedra", 4, 13, 288, "Elixir que endurece os golpes desarmados e altera temporariamente o corpo.", "Elixir that hardens unarmed blows and temporarily alters the body.", "Elixir que endurece los golpes desarmados y altera temporalmente el cuerpo."],
  ["moderate_darkvision_elixir", "Elixir de Visão no Escuro Moderado", "Moderate Darkvision Elixir", "Elixir moderado de visión en la oscuridad", 4, 11, 287, "Elixir que concede visão no escuro aprimorada por sua duração.", "Elixir that grants improved darkvision for its duration.", "Elixir que concede visión en la oscuridad mejorada durante su duración."],
  ["lesser_winter_warg_elixir", "Elixir de Warg Invernal Menor", "Lesser Winter Warg Elixir", "Elixir menor de huargo invernal", 4, 15, 288, "Elixir que concede resistência e capacidades associadas ao frio por sua duração.", "Elixir that grants cold-related resistance and abilities for its duration.", "Elixir que concede resistencia y capacidades relacionadas con el frío durante su duración."],
  ["lesser_life_elixir", "Elixir da Vida Menor", "Lesser Elixir of Life", "Elixir de vida menor", 5, 30, 288, "Elixir que restaura uma quantidade significativa de Pontos de Vida quando consumido.", "Elixir that restores a significant amount of Hit Points when consumed.", "Elixir que restaura una cantidad importante de Puntos de Golpe al consumirse."],
  ["lesser_sea_touch_elixir", "Elixir do Toque do Mar Menor", "Lesser Sea Touch Elixir", "Elixir menor del toque del mar", 5, 22, 288, "Elixir que concede capacidades aquáticas temporárias conforme a descrição da entrada.", "Elixir that grants temporary aquatic capabilities as described in the entry.", "Elixir que concede capacidades acuáticas temporales según la descripción."]
];
for (const [slug, pt, en, es, level, price, page, ptSummary, enSummary, esSummary] of playerCore2TreasureElixirs) {
  const id = `item.pc2.${slug}`;
  if ((PF2E_DATA.itemCompendium || []).some((record) => record.id === id)) continue;
  PF2E_DATA.itemCompendium.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    mainCategory: "consumables", subCategory: "elixirs", level, price: { gp: price }, bulk: "L",
    traits: ["Alquímico", "Consumível", "Elixir"], source: { book: PLAYER_CORE_2_SOURCE, page },
    ruleset: "remaster", needs_review: true,
  });
}

// Itens mágicos específicos confirmados na p. 282 do Player Core 2 local.
const playerCore2MagicItems = [
  ["item.pc2.infiltrators_accessory", "Acessório do Infiltrador", "Infiltrator's Accessory", "Accesorio del infiltrador", 5, 150, "Bengala-espada +1 impactante que pode ocultar magicamente sua lâmina.", "A striking +1 sword cane that can magically conceal its blade.", "Una espada-bastón +1 impactante que puede ocultar mágicamente su hoja."],
  ["item.pc2.spirit_sensing_crossbow", "Besta de Ver-Espírito", "Spirit-Seeking Crossbow", "Ballesta buscadora de espíritus", 8, 450, "Besta +1 impactante com toque fantasma que enxerga e dispara através do Plano Etéreo.", "A striking +1 ghost-touch crossbow that senses and fires through the Ethereal Plane.", "Una ballesta +1 impactante de toque fantasmal que percibe y dispara a través del Plano Etéreo."],
  ["item.pc2.chalice_of_justice", "Cálice da Justiça", "Chalice of Justice", "Cáliz de la justicia", 14, 4500, "Espada longa sagrada +2 impactante maior que pode recuperar Pontos de Vida e punir criaturas profanas.", "A greater striking +2 holy longsword that can restore Hit Points and punish unholy creatures.", "Una espada larga sagrada +2 impactante mayor que puede restaurar Puntos de Golpe y castigar criaturas impías."],
  ["item.pc2.fourfold_cut", "Cortação Quádruplo", "Fourfold Cut", "Corte cuádruple", 12, 1700, "Cortacão +2 impactante com uma runa elemental selecionável por vez.", "A striking +2 cutter with one selectable elemental property rune at a time.", "Un cortacorte +2 impactante con una runa de propiedad elemental seleccionable a la vez."],
  ["item.pc2.spellguard_blade", "Lâmina Escuda-Magia", "Spellguard Blade", "Hoja escudamagia", 7, 320, "Adaga de aparagem +1 impactante que aplica seu bônus de CA também contra magias.", "A striking +1 parrying dagger that applies its AC bonus against spells as well.", "Una daga de parada +1 impactante que aplica su bonificador de CA también contra conjuros."]
].map(([id, pt, en, es, level, gp, ptSummary, enSummary, esSummary]) => ({
  id,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  mainCategory: "magic_items",
  subCategory: "specific_gear",
  level,
  price: { gp },
  bulk: "L",
  traits: ["Mágico"],
  description: ptSummary,
  source: { book: PLAYER_CORE_2_SOURCE, page: 282 },
  ruleset: "remaster",
  rarity: "uncommon",
  needs_review: false
}));
for (const item of playerCore2MagicItems) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

// Armaduras e escudos mágicos confirmados no miolo do Player Core 2 (pp. 280–281).
const playerCore2ArmorAndShieldItems = [
  ["item.pc2.sailors_cota", "Cota do Marinheiro", "Sailor's Cota", "Cota del marinero", 5, 180, "Armadura de talas +1 que concede bônus para Escalar e Nadar e aumenta o deslocamento nessas atividades.", "A +1 splint armor that improves Athletics checks and movement for Climb and Swim.", "Una armadura de láminas +1 que mejora Atletismo y el movimiento al Trepar y Nadar.", "armor", 280],
  ["item.pc2.butcher_leather", "Couro de Carniceiro", "Butcher Leather", "Cuero de carnicero", 6, 220, "Gibão de peles +1 que protege contra maldições e torna o usuário imune ao fedor de carniçais.", "A +1 hide armor that protects against curses and grants immunity to ghoul stench.", "Una armadura de pieles +1 que protege contra maldiciones y otorga inmunidad al hedor de los gules.", "armor", 280],
  ["item.pc2.carnage_cuirass", "Couraça da Carnificina", "Carnage Cuirass", "Coraza de la carnicería", 9, 700, "Gibão de peles +1 resiliente que reduz sua penalidade de armadura e amplia o dano da Investida Súbita.", "A resilient +1 hide armor that reduces its armor penalty and adds damage to Sudden Charge Strikes.", "Una armadura de pieles +1 resistente que reduce su penalización y añade daño a los Golpes de Carga súbita.", "armor", 280],
  ["item.pc2.war_leader_bulwark", "Baluarte do Líder de Guerra", "War-Leader's Bulwark", "Baluarte del líder de guerra", 10, 0, "Placa peitoral +1 resiliente que inspira aliados e concede presença imponente.", "A resilient +1 breastplate that inspires allies and projects a commanding presence.", "Una coraza +1 resistente que inspira a los aliados e impone una presencia de mando.", "armor", 280],
  ["item.pc2.unholy_armor", "Armadura Profana", "Unholy Armor", "Armadura profana", 13, 2500, "Armadura completa +2 resiliente com chifres ofensivos e uma ativação de translocar para criaturas profanas.", "A resilient +2 full plate with offensive horns and a teleport activation for unholy characters.", "Una armadura completa +2 resistente con cuernos ofensivos y una activación de teletransporte para criaturas impías.", "armor", 280],
  ["item.pc2.dragon_scales", "Placas de Dragão", "Dragon Plates", "Placas de dragón", 16, 10000, "Armadura completa de couro de dragão +2 resiliente maior com sopro de energia uma vez por dia.", "Greater resilient +2 dragon leather full plate with a once-per-day dragon breath.", "Armadura completa de cuero de dragón +2 resistente mayor con aliento de dragón una vez al día.", "armor", 281],
  ["item.pc2.dazzling_buckler", "Broquel Deslumbrante", "Dazzling Buckler", "Broquel deslumbrante", 2, 35, "Broquel mágico que concede bônus em Fintar enquanto está erguido e pode ofuscar um alvo.", "A magical buckler that boosts Feinting while raised and can dazzle a target.", "Un broquel mágico que mejora Engañar mientras está alzado y puede deslumbrar a un objetivo.", "shield", 281],
  ["item.pc2.explosive_shield", "Escudo Explosivo", "Explosive Shield", "Escudo explosivo", 5, 25, "Escudo mágico de madeira que explode quando é destruído, causando dano aos adversários próximos.", "A magical wooden shield that explodes when destroyed, damaging nearby enemies.", "Un escudo mágico de madera que explota al ser destruido y daña a los enemigos cercanos.", "shield", 281],
  ["item.pc2.medusa_scream", "Grito da Medusa", "Medusa's Scream", "Grito de la medusa", 13, 0, "Escudo de aço mágico que pode revelar o rosto de uma medusa e conjurar petrificar uma vez por dia.", "A magical steel shield that can reveal a medusa's face and cast petrify once per day.", "Un escudo de acero mágico que puede revelar el rostro de una medusa y lanzar petrificar una vez al día.", "shield", 281],
  ["item.pc2.dragonhide_shield", "Escudo de Couro de Dragão", "Dragon Leather Shield", "Escudo de cuero de dragón", 8, 400, "Escudo de couro de dragão que é imune a um tipo de dano conforme a tradição do dragão.", "A dragon leather shield immune to one damage type based on the dragon's tradition.", "Un escudo de cuero de dragón inmune a un tipo de daño según la tradición del dragón.", "shield", 277]
].map(([id, pt, en, es, level, gp, ptSummary, enSummary, esSummary, subCategory, page]) => ({
  id,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  mainCategory: "magic_items",
  subCategory,
  level,
  price: gp ? { gp } : undefined,
  bulk: subCategory === "armor" ? 2 : 1,
  traits: ["Mágico"],
  description: ptSummary,
  source: { book: PLAYER_CORE_2_SOURCE, page },
  ruleset: "remaster",
  needs_review: false
}));
for (const item of playerCore2ArmorAndShieldItems) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

// Catálogo Oficial de Fórmulas (Alquimia, Manufatura, Poções e Armadilhas)
PF2E_DATA.formulas = [
  { id: "form.alch.elixir_of_life_lesser", name: "Elixir da Vida Menor (Minor Elixir of Life)", names: { "pt-BR": "Elixir da Vida Menor", en: "Minor Elixir of Life", es: "Elixir de la vida menor" }, level: 1, price: { gp: 3 }, category: "Alquímico (Elixir)", craftingDC: 15, traits: ["Alquímico", "Consumível", "Elixir", "Cura"], description: "Restaura 1d6 Pontos de Vida e concede +1 de bônus de item em testes contra veneno e doenças por 10 min.", source: { book: "Livro do Jogador (Player Core)", page: 292 } },
  { id: "form.alch.alchemists_fire_lesser", name: "Fogo Alquímico Menor (Lesser Alchemist's Fire)", names: { "pt-BR": "Fogo Alquímico Menor", en: "Lesser Alchemist's Fire", es: "Fuego alquímico menor" }, level: 1, price: { gp: 3 }, category: "Alquímico (Bomba)", craftingDC: 15, traits: ["Alquímico", "Bomba", "Consumível", "Fogo", "Espalhar"], description: "Causa 1d8 de dano de fogo, 1 de dano de fogo persistente e 1 de dano de fogo por espalhamento.", source: { book: "Livro do Jogador (Player Core)", page: 291 } },
  { id: "form.alch.antidote_lesser", name: "Antídoto Menor (Lesser Antidote)", names: { "pt-BR": "Antídoto Menor", en: "Lesser Antidote", es: "Antídoto menor" }, level: 1, price: { gp: 3 }, category: "Alquímico (Elixir)", craftingDC: 15, traits: ["Alquímico", "Consumível", "Elixir"], description: "Concede +2 de bônus de item em testes de Fortitude contra venenos por 6 horas.", source: { book: "Livro do Jogador (Player Core)", page: 292 } },
  { id: "form.alch.silversheen", name: "Verniz Prateado (Silversheen)", names: { "pt-BR": "Verniz Prateado", en: "Silversheen", es: "Brillo plateado" }, level: 2, price: { gp: 6 }, category: "Alquímico (Óleo)", craftingDC: 16, traits: ["Alquímico", "Consumível", "Óleo"], description: "Reveste uma arma ou até 10 projéteis, fazendo com que contem como Prata por 1 hora.", source: { book: "Livro do Jogador (Player Core)", page: 294 } },
  { id: "form.alch.smokestick", name: "Bastão de Fumaça (Smokestick)", names: { "pt-BR": "Bastão de Fumaça", en: "Smokestick", es: "Vara de humo" }, level: 1, price: { gp: 3 }, category: "Alquímico (Consumível)", craftingDC: 15, traits: ["Alquímico", "Consumível"], description: "Gera uma nuvem densa de fumaça que obscurece a visão em uma emanação de 5 pés por 1 minuto.", source: { book: "Livro do Jogador (Player Core)", page: 294 } },
  { id: "form.pot.minor_healing_potion", name: "Poção de Cura Menor (Minor Healing Potion)", names: { "pt-BR": "Poção de Cura Menor", en: "Minor Healing Potion", es: "Poción de curación menor" }, level: 1, price: { gp: 4 }, category: "Mágico (Poção)", craftingDC: 15, traits: ["Mágico", "Consumível", "Poção", "Cura"], description: "Restaura 1d8 Pontos de Vida instantaneamente.", source: { book: "Livro do Jogador (Player Core)", page: 295 } },
  { id: "form.snare.spike_snare", name: "Armadilha de Espigões (Spike Snare)", names: { "pt-BR": "Armadilha de Espigões", en: "Spike Snare", es: "Lazo de púas" }, level: 1, price: { gp: 3 }, category: "Armadilha (Snare)", craftingDC: 15, traits: ["Armadilha", "Consumível", "Mecânico"], description: "Dispara contra a criatura que pisar, causando 2d8 de dano perfurante (Salvamento de Reflexos CD 17).", source: { book: "Livro do Jogador (Player Core)", page: 296 } }
];

// Fórmulas alquímicas confirmadas na tabela e nas descrições do Player Core 2
// local (pp. 283–288). Os efeitos resumidos mantêm a opção utilizável no
// construtor; a descrição integral continua pertencendo ao livro de origem.
const playerCore2Formulas = [
  ["formula.pc2.frightful_ampoule_minor", "Ampola Pavorosa Menor", "Minor Frightful Ampoule", "Ámpula pavorosa menor", 1, 3, 283, "Bomba", "Bomba mental que causa dano mental e dano colateral de medo."],
  ["formula.pc2.tanglefoot_bag_minor", "Bomba de Cola Menor", "Lesser Tanglefoot Bag", "Bolsa de maraña menor", 1, 3, 283, "Bomba", "Bomba adesiva que reduz a Velocidade do alvo e pode prendê-lo."],
  ["formula.pc2.weakening_bomb_minor", "Bomba de Esmorecimento Menor", "Lesser Weakening Bomb", "Bomba debilitante menor", 1, 3, 283, "Bomba", "Bomba venenosa que causa dano persistente e enfraquece o alvo."],
  ["formula.pc2.ghost_charge_minor", "Carga Fantasma Menor", "Lesser Ghost Charge", "Carga fantasmal menor", 1, 3, 284, "Bomba", "Bomba de vitalidade que causa dano colateral a criaturas próximas."],
  ["formula.pc2.alchemists_fire_minor", "Fogo Alquímico Menor", "Lesser Alchemist's Fire", "Fuego alquímico menor", 1, 3, 284, "Bomba", "Bomba de fogo que causa dano persistente e dano de espalhamento."],
  ["formula.pc2.frost_vial_minor", "Frasco Congelante Menor", "Lesser Frost Vial", "Vial de escarcha menor", 1, 3, 285, "Bomba", "Bomba de frio que causa dano e reduz a Velocidade do alvo."],
  ["formula.pc2.acid_flask_minor", "Frasco de Ácido Menor", "Lesser Acid Flask", "Frasco de ácido menor", 1, 3, 285, "Bomba", "Bomba de ácido que causa dano persistente e dano de espalhamento."],
  ["formula.pc2.detritus_stone_minor", "Pedra Detonante Menor", "Lesser Detonating Stone", "Piedra detonante menor", 1, 3, 285, "Bomba", "Bomba sônica que causa dano colateral a criaturas na área."],
  ["formula.pc2.bottled_lightning_minor", "Relâmpago Engarrafado Menor", "Lesser Bottled Lightning", "Relámpago embotellado menor", 1, 3, 285, "Bomba", "Bomba elétrica que deixa o alvo desprevenido até o próximo turno."],
  ["formula.pc2.antidote_minor", "Antídoto Menor", "Lesser Antidote", "Antídoto menor", 1, 3, 286, "Elixir", "Elixir que concede bônus de item contra venenos por 6 horas."],
  ["formula.pc2.antiplague_minor", "Antipeste Menor", "Lesser Antiplague", "Antiplaga menor", 1, 3, 286, "Elixir", "Elixir que concede bônus de item contra doenças por 24 horas."],
  ["formula.pc2.life_elixir_minimum", "Elixir da Vida Mínimo", "Minor Elixir of Life", "Elixir de la vida mínimo", 1, 3, 287, "Elixir", "Elixir que restaura 1d6 Pontos de Vida e protege contra doenças e venenos."],
  ["formula.pc2.gender_transition_minor", "Elixir de Transição de Gênero Menor", "Lesser Gender Transition Elixir", "Elixir de transición de género menor", 1, 1, 287, "Elixir", "Elixir de transformação gradual de características secundárias de gênero."],
  ["formula.pc2.cheetah_elixir_minor", "Elixir do Guepardo Menor", "Lesser Cheetah Elixir", "Elixir del guepardo menor", 1, 3, 288, "Elixir", "Elixir que melhora a mobilidade e a velocidade temporariamente."],
  ["formula.pc2.eagle_eye_elixir_minor", "Elixir do Olho de Águia Menor", "Lesser Eagle-Eye Elixir", "Elixir del ojo de águila menor", 1, 4, 288, "Elixir", "Elixir que aguça a visão e melhora a percepção de detalhes."],
].map(([id, pt, en, es, level, gp, page, category, summary]) => ({
  id,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": summary,
    en: `${en} is a Player Core 2 alchemical ${category.toLowerCase()} formula for character equipment and crafting.`,
    es: `${es} es una fórmula alquímica de ${category.toLowerCase()} del Player Core 2 para equipo y fabricación del personaje.`
  },
  level,
  price: { gp },
  category: `Alquímico (${category})`,
  craftingDC: 15 + level,
  traits: ["Alquímico", "Consumível", category],
  description: summary,
  source: { book: PLAYER_CORE_2_SOURCE, page },
  ruleset: "remaster",
  rarity: "common",
  needs_review: false
}));
for (const formula of playerCore2Formulas) {
  if (!(PF2E_DATA.formulas || []).some((candidate) => candidate.id === formula.id)) PF2E_DATA.formulas.push(formula);
}

// Variantes adicionais das bombas alquímicas listadas nas mesmas tabelas
// (PC2 pp. 283–285). O nível, preço e página são confirmados; o texto
// completo de cada variante ainda não foi transcrito para o motor, portanto
// estas entradas permanecem revisáveis até que seus efeitos sejam modelados.
const playerCore2BombVariants = [
  ["frightful_ampoule", "Ampola Pavorosa", "Frightful Ampoule", "Ampolla pavorosa", 283],
  ["tanglefoot_bag", "Bomba de Cola", "Tanglefoot Bag", "Bomba de cola", 283],
  ["weakening_bomb", "Bomba de Esmorecimento", "Weakening Bomb", "Bomba debilitante", 283],
  ["ghost_charge", "Carga Fantasma", "Ghost Charge", "Carga fantasmal", 284],
  ["alchemists_fire", "Fogo Alquímico", "Alchemist's Fire", "Fuego alquímico", 284],
  ["frost_vial", "Frasco Congelante", "Frost Vial", "Vial de escarcha", 285],
  ["acid_flask", "Frasco de Ácido", "Acid Flask", "Frasco de ácido", 285],
  ["detonating_stone", "Pedra Detonante", "Detonating Stone", "Piedra detonante", 285],
  ["bottled_lightning", "Relâmpago Engarrafado", "Bottled Lightning", "Relámpago embotellado", 285],
].flatMap(([slug, ptBase, enBase, esBase, page]) => [
  ["moderate", "Moderada", "Moderate", "Moderada", 3, 10],
  ["greater", "Maior", "Greater", "Mayor", 11, 250],
  ["superior", "Superior", "Major", "Superior", 17, 2500],
].map(([tier, ptTier, enTier, esTier, level, gp]) => ({
  id: `formula.pc2.${slug}_${tier}`,
  name: `${ptBase} ${ptTier} (${enBase} ${enTier})`,
  names: { "pt-BR": `${ptBase} ${ptTier}`, en: `${enBase} ${enTier}`, es: `${esBase} ${esTier}` },
  summaries: {
    "pt-BR": `Variante ${ptTier.toLowerCase()} da bomba alquímica ${ptBase.toLowerCase()}; os efeitos completos devem ser consultados na página ${page}.`,
    en: `${enTier} version of the ${enBase.toLowerCase()} alchemical bomb; consult page ${page} for the complete effects.`,
    es: `Versión ${esTier.toLowerCase()} de la bomba alquímica ${esBase.toLowerCase()}; consulta la página ${page} para los efectos completos.`
  },
  level,
  price: { gp },
  category: "Alquímico (Bomba)",
  craftingDC: 15 + level,
  traits: ["Alquímico", "Consumível", "Bomba"],
  description: `Variante ${ptTier.toLowerCase()} confirmada na tabela de itens alquímicos do Player Core 2.`,
  source: { book: PLAYER_CORE_2_SOURCE, page },
  ruleset: "remaster",
  rarity: "common",
  needs_review: true
})));
for (const formula of playerCore2BombVariants) {
  if (!(PF2E_DATA.formulas || []).some((candidate) => candidate.id === formula.id)) PF2E_DATA.formulas.push(formula);
}

// Outras entradas da tabela de itens alquímicos do Player Core 2 (pp. 291–296).
// São utilizáveis pelo personagem e têm metadados editoriais confirmados, mas
// continuam em revisão enquanto seus estágios/efeitos não estiverem no motor.
const playerCore2AlchemicalTableEntries = [
  ["bright_stick", "Bastão Brilhante", "Glow Rod", "Bastón luminoso", 1, { gp: 3 }, 295, "Ferramenta"],
  ["smoke_ball", "Bola de Fumaça", "Smoke Ball", "Bola de humo", 1, { gp: 3 }, 295, "Ferramenta"],
  ["forensic_dye", "Corante Forense", "Forensic Dye", "Tinte forense", 1, { gp: 3 }, 295, "Ferramenta"],
  ["phosphor", "Fósforo", "Phosphor", "Fósforo", 1, { pp: 2 }, 295, "Ferramenta"],
  ["snake_oil", "Óleo de Cobra", "Snake Oil", "Aceite de serpiente", 1, { gp: 2 }, 295, "Ferramenta"],
  ["ghost_ink", "Tinta Fantasma", "Ghost Ink", "Tinta fantasmal", 1, { gp: 3 }, 296, "Ferramenta"],
  ["belladonna", "Beladona", "Belladonna", "Belladona", 2, { gp: 5 }, 291, "Veneno"],
  ["arsenic", "Arsênico", "Arsenic", "Arsénico", 1, { gp: 3 }, 291, "Veneno"],
  ["giant_centipede_venom", "Veneno de Centopeia Gigante", "Giant Centipede Venom", "Veneno de ciempiés gigante", 1, { gp: 4 }, 294, "Veneno"],
  ["lethargy_poison", "Veneno de Letargia", "Lethargy Poison", "Veneno de letargo", 2, { gp: 7 }, 292, "Veneno"],
  ["black_adder_venom", "Veneno de Víbora Negra", "Black Adder Venom", "Veneno de víbora negra", 2, { gp: 6 }, 292, "Veneno"],
  ["cytillesh_oil", "Óleo de Cytillesh", "Cytillesh Oil", "Aceite de cytillesh", 3, { gp: 10 }, 292, "Veneno"],
  ["grave_root", "Raiz do Túmulo", "Grave Root", "Raíz de tumba", 3, { gp: 10 }, 293, "Veneno"],
  ["spider_venom", "Veneno de Aranha", "Spider Venom", "Veneno de araña", 5, { gp: 25 }, 294, "Veneno"],
  ["giant_scorpion_venom", "Veneno de Escorpião Gigante", "Giant Scorpion Venom", "Veneno de escorpión gigante", 6, { gp: 40 }, 292, "Veneno"],
  ["rooting_toxin", "Toxina de Enraizamento", "Rooting Toxin", "Toxina de enraizamiento", 7, { gp: 55 }, 293, "Veneno"],
  ["nettleseed_residue", "Resíduo de Urtiga", "Nettleweed Residue", "Residuo de ortiga", 8, { gp: 75 }, 293, "Veneno"],
  ["wyvern_poison", "Veneno de Wyvern", "Wyvern Poison", "Veneno de wyvern", 8, { gp: 80 }, 294, "Veneno"],
  ["weakening_powder", "Pó Debilitante", "Weakening Powder", "Polvo debilitante", 9, { gp: 110 }, 292, "Veneno"],
  ["spider_root", "Raiz de Aranha", "Spider Root", "Raíz de araña", 9, { gp: 110 }, 292, "Veneno"],
  ["aconite", "Acônito", "Aconite", "Acónito", 10, { gp: 155 }, 291, "Veneno"],
  ["draining_shadow", "Sombra Desgastante", "Draining Shadow", "Sombra agotadora", 10, { gp: 160 }, 293, "Veneno"],
  ["black_lotus_extract", "Extrato de Lótus Negra", "Black Lotus Extract", "Extracto de loto negro", 19, { gp: 6500 }, 292, "Veneno"],
  ["death_takings", "Lágrimas da Morte", "Tears of Death", "Lágrimas de la muerte", 20, { gp: 12000 }, 292, "Veneno"],
].map(([slug, pt, en, es, level, price, page, category]) => ({
  id: `formula.pc2.${slug}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Item alquímico de categoria ${category.toLowerCase()} listado na tabela do Player Core 2; consulte a página ${page} para os efeitos completos.`,
    en: `Player Core 2 alchemical ${category.toLowerCase()} listed in the item table; consult page ${page} for the complete effects.`,
    es: `Objeto alquímico de categoría ${category.toLowerCase()} listado en la tabla del Player Core 2; consulta la página ${page} para los efectos completos.`
  },
  level,
  price,
  category: `Alquímico (${category})`,
  traits: ["Alquímico", "Consumível", category],
  description: `Entrada de tabela confirmada na página ${page}; efeito completo pendente de modelagem.`,
  source: { book: PLAYER_CORE_2_SOURCE, page },
  ruleset: "remaster",
  rarity: "common",
  needs_review: true
}));
for (const formula of playerCore2AlchemicalTableEntries) {
  if (!(PF2E_DATA.formulas || []).some((candidate) => candidate.id === formula.id)) PF2E_DATA.formulas.push(formula);
}

// Cada veneno indexado como item utilizável também precisa aparecer na lista
// de fórmulas, para que preparação e inventário não evoluam em catálogos
// divergentes. A identidade permanece distinta (`item` vs `formula`), mas a
// proveniência e os metadados editoriais são preservados.
for (const item of (PF2E_DATA.itemCompendium || []).filter((candidate) => candidate.source?.book === PLAYER_CORE_2_SOURCE && candidate.subCategory === "poisons")) {
  const formulaId = item.id.replace(/^item\./, "formula.");
  if ((PF2E_DATA.formulas || []).some((candidate) => candidate.id === formulaId)) continue;
  PF2E_DATA.formulas.push({
    ...item,
    id: formulaId,
    category: "Alquímico (Veneno)",
    craftingDC: 15 + (Number(item.level) || 0),
    description: item.summaries?.["pt-BR"] || item.description,
    traits: ["Alquímico", "Consumível", "Veneno"],
  });
}

// Fórmulas alquímicas também representam opções compráveis/transportáveis.
// Quando a entrada ainda não tinha sua contraparte de inventário, materialize-a
// sem perder a identidade da fórmula nem inventar regras adicionais.
for (const formula of (PF2E_DATA.formulas || []).filter((candidate) => candidate.id?.startsWith("formula.pc2.") && candidate.source?.book === PLAYER_CORE_2_SOURCE)) {
  const itemId = formula.id.replace(/^formula\./, "item.");
  if ((PF2E_DATA.itemCompendium || []).some((candidate) => candidate.id === itemId)) continue;
  const categoryText = String(formula.category || "consumables").toLowerCase();
  const subCategory = categoryText.includes("bomba") ? "bombs"
    : categoryText.includes("elixir") ? "elixirs"
      : categoryText.includes("mutag") ? "mutagens"
        : categoryText.includes("veneno") ? "poisons"
          : categoryText.includes("ferrament") ? "alchemical_tools"
            : "consumables";
  PF2E_DATA.itemCompendium.push({
    ...formula,
    id: itemId,
    mainCategory: "consumables",
    subCategory,
    bulk: formula.bulk || "L",
    description: formula.summaries?.["pt-BR"] || formula.description,
  });
}

// Catálogo de Progressão Mágica, Tradições e Slots por Classe (Spellcasting)
PF2E_DATA.spellcastingByClass = {
  "Mago (Wizard)": { tradition: "Arcana", keyAbility: "int", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Clérigo (Cleric)": { tradition: "Divina", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Druida (Druid)": { tradition: "Primal", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Bardo (Bard)": { tradition: "Oculta", keyAbility: "cha", type: "Espontâneo", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Feiticeiro (Sorcerer)": { tradition: "Variável (Linhagem)", keyAbility: "cha", type: "Espontâneo", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [3], 2: [4], 3: [4, 3], 4: [4, 4], 5: [4, 4, 3], 6: [4, 4, 4], 7: [4, 4, 4, 3], 8: [4, 4, 4, 4], 9: [4, 4, 4, 4, 3], 10: [4, 4, 4, 4, 4] } },
  "Bruxo (Witch)": { tradition: "Variável (Patrono)", keyAbility: "int", type: "Preparado", cantrips: 5, initialFocusPoints: 1, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Oráculo (Oracle)": { tradition: "Divina", keyAbility: "cha", type: "Espontâneo", cantrips: 5, initialFocusPoints: 1, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Animista (Animist)": { tradition: "Divina", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Magus": { tradition: "Arcana", keyAbility: "int", type: "Preparado Limitado (Bounded)", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [1], 2: [2], 3: [2], 4: [2], 5: [2, 2], 6: [2, 2], 7: [2, 2], 8: [2, 2], 9: [2, 2], 10: [2, 2] } },
  "Convocador (Summoner)": { tradition: "Variável (Eidolon)", keyAbility: "cha", type: "Espontâneo Limitado (Bounded)", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [1], 2: [2], 3: [2], 4: [2], 5: [2, 2], 6: [2, 2], 7: [2, 2], 8: [2, 2], 9: [2, 2], 10: [2, 2] } },
  "Psíquico (Psychic)": { tradition: "Oculta", keyAbility: "int", type: "Espontâneo Consciente", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [1], 2: [2], 3: [2, 1], 4: [2, 2], 5: [2, 2, 1], 6: [2, 2, 2], 7: [2, 2, 2, 1], 8: [2, 2, 2, 2], 9: [2, 2, 2, 2, 1], 10: [2, 2, 2, 2, 2] } }
};

// Catálogo de Pacotes Iniciais de Equipamento por Classe (Class Starter Kits)
PF2E_DATA.classStarterKits = {
  "Guerreiro (Fighter)": {
    name: "Kit Inicial do Guerreiro",
    armor: "Cota de Malha (Chain Mail)",
    weapons: [
      { name: "Espada Longa (Longsword)", category: "Marcial", damage: "1d8 cortante", traits: ["Versátil P"], hands: "1" },
      { name: "Escudo de Aço (Steel Shield)", category: "Marcial", damage: "1d4 concussão", traits: ["Escudo", "Dureza 5", "PV 20"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Adaga (Dagger)", qty: 1, bulk: "L" },
      { name: "Corda de Cânhamo (50 pés)", qty: 1, bulk: "1" }
    ],
    remainingCoins: { gp: 3, sp: 8, cp: 0 }
  },
  "Ladino (Rogue)": {
    name: "Kit Inicial do Ladino",
    armor: "Armadura de Couro (Leather Armor)",
    weapons: [
      { name: "Florete (Rapier)", category: "Marcial", damage: "1d6 perfurante", traits: ["Acurada", "Desarmar", "Mortal d8"], hands: "1" },
      { name: "Adaga (Dagger)", category: "Simples", damage: "1d4 perfurante", traits: ["Ágil", "Acurada", "Arremesso 10 pés", "Versátil C"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Ferramentas de Ladrão (Thieves' Toolkit)", qty: 1, bulk: "L" },
      { name: "Adagas Extras (x3)", qty: 3, bulk: "L" }
    ],
    remainingCoins: { gp: 5, sp: 2, cp: 0 }
  },
  "Mago (Wizard)": {
    name: "Kit Inicial do Mago",
    armor: "Sem Armadura (Trajes de Explorador)",
    weapons: [
      { name: "Bordão (Staff)", category: "Simples", damage: "1d4 concussão", traits: ["Duas Mãos d8"], hands: "1" },
      { name: "Besta Leve (Light Crossbow)", category: "Simples", damage: "1d8 perfurante", traits: ["Distância 120 pés", "Recarregar 1"], hands: "2" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Grimório de Magias (Spellbook)", qty: 1, bulk: "L" },
      { name: "Virotes de Besta (x20)", qty: 20, bulk: "L" },
      { name: "Material de Escrita", qty: 1, bulk: "L" }
    ],
    remainingCoins: { gp: 6, sp: 5, cp: 0 }
  },
  "Clérigo (Cleric)": {
    name: "Kit Inicial do Clérigo",
    armor: "Armadura de Brunea (Scale Mail)",
    weapons: [
      { name: "Maça (Mace)", category: "Simples", damage: "1d6 concussão", traits: ["Empurrão"], hands: "1" },
      { name: "Escudo de Madeira (Wooden Shield)", category: "Simples", damage: "1d4 concussão", traits: ["Escudo", "Dureza 3", "PV 12"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Símbolo Sagrado de Madeira", qty: 1, bulk: "L" },
      { name: "Kit de Primeiros Socorros (Healer's Toolkit)", qty: 1, bulk: "1" }
    ],
    remainingCoins: { gp: 3, sp: 1, cp: 0 }
  },
  "Bárbaro (Barbarian)": {
    name: "Kit Inicial do Bárbaro",
    armor: "Armadura de Gibão Acolchoado (Hide Armor)",
    weapons: [
      { name: "Machado Grande (Greataxe)", category: "Marcial", damage: "1d12 cortante", traits: ["Varrer"], hands: "2" },
      { name: "Azagaias (Javelins x4)", category: "Simples", damage: "1d6 perfurante", traits: ["Arremesso 30 pés"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Tochas (x5)", qty: 5, bulk: "L" }
    ],
    remainingCoins: { gp: 7, sp: 4, cp: 0 }
  },
  "Bardo (Bard)": {
    name: "Kit Inicial do Bardo",
    armor: "Armadura de Couro Batido (Studded Leather)",
    weapons: [
      { name: "Espada Curta (Shortsword)", category: "Marcial", damage: "1d6 perfurante", traits: ["Ágil", "Acurada", "Versátil C"], hands: "1" },
      { name: "Chicote (Whip)", category: "Marcial", damage: "1d4 cortante", traits: ["Desarmar", "Acurada", "Alcance", "Derrubar", "Não-Letal"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Instrumento Musical Portátil (Alaúde/Flauta)", qty: 1, bulk: "1" }
    ],
    remainingCoins: { gp: 4, sp: 6, cp: 0 }
  },
  "Druida (Druid)": {
    name: "Kit Inicial do Druida",
    armor: "Armadura de Couro (Leather Armor)",
    weapons: [
      { name: "Foice Curta (Sickle)", category: "Simples", damage: "1d4 cortante", traits: ["Ágil", "Acurada", "Derrubar"], hands: "1" },
      { name: "Escudo de Madeira (Wooden Shield)", category: "Simples", damage: "1d4 concussão", traits: ["Escudo"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Foco Místico Druídico (Visco/Azevinho)", qty: 1, bulk: "-" },
      { name: "Kit de Primeiros Socorros (Healer's Toolkit)", qty: 1, bulk: "1" }
    ],
    remainingCoins: { gp: 5, sp: 3, cp: 0 }
  },
  "Patrulheiro (Ranger)": {
    name: "Kit Inicial do Patrulheiro",
    armor: "Armadura de Couro Batido (Studded Leather)",
    weapons: [
      { name: "Arco Longo (Longbow)", category: "Marcial", damage: "1d8 perfurante", traits: ["Distância 100 pés", "Mortal d10", "Voleio 30 pés"], hands: "2" },
      { name: "Espada Curta (Shortsword)", category: "Marcial", damage: "1d6 perfurante", traits: ["Ágil", "Acurada", "Versátil C"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Aljava com Flechas (x40)", qty: 40, bulk: "L" },
      { name: "Pederneira e Pederneira", qty: 1, bulk: "-" }
    ],
    remainingCoins: { gp: 4, sp: 8, cp: 0 }
  },
  "Campeão (Champion)": {
    name: "Kit Inicial do Campeão",
    armor: "Armadura de Talas (Splint Mail)",
    weapons: [
      { name: "Espada Larga (Bastard Sword)", category: "Marcial", damage: "1d8 cortante", traits: ["Duas Mãos d12"], hands: "1" },
      { name: "Escudo de Aço (Steel Shield)", category: "Marcial", damage: "1d4 concussão", traits: ["Escudo", "Dureza 5", "PV 20"], hands: "1" }
    ],
    items: [
      { name: "Mochila de Aventureiro (Adventurer's Pack)", qty: 1, bulk: "1" },
      { name: "Símbolo Sagrado de Madeira", qty: 1, bulk: "L" }
    ],
    remainingCoins: { gp: 2, sp: 4, cp: 0 }
  }
};

// Catálogo Oficial de Heranças Versáteis Detalhadas (Versatile Heritages)
PF2E_DATA.versatileHeritagesCatalog = {
  "Aasimar": {
    name: "Aasimar",
    traits: ["Aasimar", "Humanoide", "Celestial"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Você descende de seres celestiais, como anjos ou arcontes. Seu sangue sagrado concede beleza etérea e resistência a energias sagradas."
  },
  "Tiefling": {
    name: "Tiefling",
    traits: ["Tiefling", "Humanoide", "Ínfero", "Demônio"],
    senses: ["Visão no Escuro (Darkvision)"],
    vision: "Visão no Escuro (Darkvision)",
    description: "Marcado pela influência de diabos, demônios ou daemons, seu sangue manifesta chifres, cauda ou olhos incandescentes."
  },
  "Dhampir": {
    name: "Dhampir",
    traits: ["Dhampir", "Humanoide", "Morto-Vivo Negativo"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Filho do beijo de um vampiro, você vive entre a luz e as trevas, sendo curado por energia negativa/vazio."
  },
  "Duskwalker": {
    name: "Duskwalker",
    traits: ["Duskwalker", "Humanoide", "Psicopompo"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Uma alma reencarnada através de um pacto com psicopompos do Purgatório, protegida contra toques de mortos-vivos."
  },
  "Changeling": {
    name: "Changeling",
    traits: ["Changeling", "Humanoide"],
    senses: ["Visão no Escuro (Darkvision)"],
    vision: "Visão no Escuro (Darkvision)",
    description: "Filha de uma bruxa anciã deixada para ser criada por mortais, manifestando garras afiadas e heterocromia ocular."
  },
  "Ifrit": {
    name: "Ifrit",
    traits: ["Ifrit", "Humanoide", "Fogo", "Gênio"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Tocado pelo Plano Elemental do Fogo e pelos Efreeti, sua pele irradia calor e seu cabelo parece arder em brasa."
  },
  "Oread": {
    name: "Oread",
    traits: ["Oread", "Humanoide", "Terra", "Gênio"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Descendente de seres da Pedra e da Terra, seu corpo possui traços rochosos e firmeza inabalável."
  },
  "Sylph": {
    name: "Sylph",
    traits: ["Sylph", "Humanoide", "Ar", "Gênio"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    description: "Fluido e ágil como as correntes de vento elementais, capaz de se mover suavemente sem deixar rastros."
  },
  "Undine": {
    name: "Undine",
    traits: ["Undine", "Humanoide", "Água", "Gênio"],
    senses: ["Visão na Penumbra (Low-Light Vision)"],
    vision: "Visão na Penumbra (Low-Light Vision)",
    swimSpeed: 15,
    description: "Nascido das profundezas fluviais e oceânicas, possui membranas interdigitais e facilidade natural para nadar."
  }
};

// Catálogo Oficial de Condições de Jogo (Game Conditions)
PF2E_DATA.conditionsCatalog = {
  "frightened": { name: "Amedrontado (Frightened)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em todos os testes e CDs. Reduz em 1 no final de cada turno." },
  "sickened": { name: "Enjoado (Sickened)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em todos os testes e CDs. Não pode beber poções nem ingerir itens enquanto durar." },
  "clumsy": { name: "Desajeitado (Clumsy)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em testes baseados em Destreza, CA, Reflexos e ataques à distância." },
  "enfeebled": { name: "Debilitado (Enfeebled)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em testes baseados em Força e rolagens de dano corpo a corpo." },
  "drained": { name: "Drenado (Drained)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em testes de Fortitude. Reduz o PV máximo em Nível x Valor da condição." },
  "stupefied": { name: "Estupefato (Stupefied)", hasValue: true, maxValue: 4, type: "Status", description: "-X de penalidade de status em testes mentais (Int, Sab, Car), CD de Magias e Vontade. Teste de concentração CD 5+X ao conjurar." },
  "offGuard": { name: "Desprevenido (Off-Guard)", hasValue: false, type: "Circunstância", description: "-2 de penalidade de circunstância na Classe de Armadura (CA)." },
  "prone": { name: "Caído (Prone)", hasValue: false, type: "Circunstância", description: "Fica Desprevenido (-2 CA) e sofre -2 de penalidade de ataque em golpes corpo a corpo. Precisa da ação Levantar." },
  "blinded": { name: "Cego (Blinded)", hasValue: false, type: "Status", description: "Fica Desprevenido (-2 CA), tudo é terreno difícil e sofre -4 em Percepção visual." },
  "deafened": { name: "Surdo (Deafened)", hasValue: false, type: "Status", description: "Sofre -2 em Percepção auditiva e falha crítica automática em testes de iniciativa por som." },
  "immobilized": { name: "Imobilizado (Immobilized)", hasValue: false, type: "Status", description: "Não pode se mover de seu espaço por qualquer ação com o traço Movimento." },
  "blessed": { name: "Abençoado / Heroísmo (Blessed)", hasValue: false, type: "Status Positivo", description: "+1 de bônus de status em todas as jogadas de ataque." }
};

// Metadados confirmados nas tabelas de equipamento do Player Core (pp. 274-282).
// Os registros de armas/armaduras que vieram de outros suplementos permanecem
// fora deste mapa até que a página da edição correspondente seja confirmada.
const PLAYER_CORE_EQUIPMENT_METADATA = {
  weapons: {
    "Bastard Sword": ["Espada Bastarda", 279],
    "Battle Axe": ["Machado de Batalha", 279],
    "Blowgun": ["Zarabatana", 282],
    "Bo Staff": ["Bastão Bo", 279],
    "Club": ["Clava", 278],
    "Crossbow": ["Besta", 282],
    "Dagger": ["Adaga", 278],
    "Dart": ["Dardo", 282],
    "Falchion": ["Bracamante", 279],
    "Flail": ["Mangual", 279],
    "Gauntlet": ["Manopla", 278],
    "Glaive": ["Glaive", 279],
    "Greataxe": ["Machado Longo", 279],
    "Greatclub": ["Clava Pesada", 279],
    "Greatsword": ["Montante", 279],
    "Halberd": ["Alabarda", 279],
    "Hand Crossbow": ["Besta de Mão", 282],
    "Heavy Crossbow": ["Besta Pesada", 282],
    "Javelin": ["Azagaia", 282],
    "Kukri": ["Kukri", 279],
    "Lance": ["Lança de Cavalaria", 279],
    "Longbow": ["Arco Longo", 282],
    "Longsword": ["Espada Longa", 279],
    "Maul": ["Malho", 279],
    "Morningstar": ["Maça-Estrela", 278],
    "Nunchaku": ["Nunchaku", 279],
    "Pick": ["Picareta", 279],
    "Rapier": ["Rapieira", 279],
    "Scimitar": ["Cimitarra", 279],
    "Scythe": ["Segadeira", 279],
    "Shortbow": ["Arco Curto", 282],
    "Shortsword": ["Espada Curta", 279],
    "Shuriken": ["Shuriken", 282],
    "Sickle": ["Foice", 278],
    "Sling": ["Funda", 282],
    "Spear": ["Lança", 278],
    "Staff": ["Cajado", 278],
    "Trident": ["Tridente", 279],
    "Warhammer": ["Martelo de Guerra", 279],
    "Whip": ["Chicote", 279],
    "Fist": ["Punho", 278]
  },
  armors: {
    "Explorer's Clothing": ["Roupas de Explorador", 274],
    "Padded Armor": ["Armadura Acolchoada", 274],
    "Leather Armor": ["Armadura de Couro", 274],
    "Studded Leather": ["Armadura de Couro Batido", 274],
    "Chain Shirt": ["Camisa de Malha", 274],
    "Hide Armor": ["Gibão de Peles", 274],
    "Scale Mail": ["Brunea", 274],
    "Breastplate": ["Peitoral", 274],
    "Chain Mail": ["Cota de Malha", 274],
    "Half Plate": ["Meia-Armadura", 274],
    "Splint Mail": ["Armadura de Talas", 274],
    "Full Plate": ["Armadura Completa", 274],
    "Unarmored": ["Sem Armadura", 274]
  },
  shields: {
    "Buckler": ["Broquel", 275],
    "Steel Shield": ["Escudo de Aço", 275],
    "Wooden Shield": ["Escudo de Madeira", 275],
    "Tower Shield": ["Escudo Torre", 275]
  }
};

const localizedEquipmentSummary = (pt, en, es) => ({ "pt-BR": pt, en, es });
const PLAYER_CORE_SKILL_METADATA = {
  acrobatics: ["Acrobatismo", "Acrobatics", "Acrobatismo", 233],
  arcana: ["Arcanismo", "Arcana", "Arcanismo", 234],
  athletics: ["Atletismo", "Athletics", "Atletismo", 234],
  crafting: ["Manufatura", "Crafting", "Artesanía", 241],
  deception: ["Dissimulação", "Deception", "Engaño", 237],
  diplomacy: ["Diplomacia", "Diplomacy", "Diplomacia", 236],
  intimidation: ["Intimidação", "Intimidation", "Intimidación", 239],
  medicine: ["Medicina", "Medicine", "Medicina", 242],
  nature: ["Natureza", "Nature", "Naturaleza", 244],
  occultism: ["Ocultismo", "Occultism", "Ocultismo", 244],
  performance: ["Performance", "Performance", "Interpretación", 244],
  religion: ["Religião", "Religion", "Religión", 245],
  society: ["Sociedade", "Society", "Sociedad", 247],
  stealth: ["Furtividade", "Stealth", "Sigilo", 238],
  survival: ["Sobrevivência", "Survival", "Supervivencia", 246],
  thievery: ["Ladroagem", "Thievery", "Latrocinio", 240]
};
Object.entries(PLAYER_CORE_SKILL_METADATA).forEach(([id, [pt, en, es, page]]) => {
  const record = (PF2E_DATA.skills || []).find((skill) => skill.id === id);
  if (!record) return;
  Object.assign(record, {
    names: { "pt-BR": pt, en, es },
    summaries: localizedEquipmentSummary(
      record.description,
      `A core Pathfinder 2e skill used for its listed trained and untrained actions.`,
      `Una habilidad básica de Pathfinder 2e usada para sus acciones entrenadas y no entrenadas.`
    ),
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: false
  });
});

const ACTION_SPANISH_NAMES = {
  "Strike": "Golpear", "Stride": "Avanzar", "Step": "Paso", "Raise a Shield": "Levantar un escudo",
  "Take Cover": "Buscar cobertura", "Interact": "Interactuar", "Escape": "Escapar", "Leap": "Saltar",
  "Trip": "Derribo", "Grapple": "Agarrar", "Shove": "Empujar", "Disarm": "Desarmar", "Feint": "Fintar",
  "Demoralize": "Desmoralizar", "Treat Wounds": "Tratar heridas", "Battle Medicine": "Medicina de batalla",
  "Recall Knowledge": "Recordar conocimiento", "Seek": "Buscar", "Hide": "Esconderse", "Sneak": "Escabullirse",
  "Avoid Notice": "Evitar ser detectado", "Defend": "Defender", "Detect Magic": "Detectar magia", "Scout": "Explorar"
};
(PF2E_DATA.actions || []).forEach((record) => {
  const match = record.name.match(/^(.*?)\s*\(([^)]+)\)/);
  if (!match) return;
  const [, pt, en] = match;
  const es = ACTION_SPANISH_NAMES[en] || en;
  Object.assign(record, {
    names: { "pt-BR": pt.trim(), en: en.trim(), es },
    summaries: localizedEquipmentSummary(
      record.description,
      `Core action: ${en.trim()}.`,
      `Acción básica: ${es}.`
    )
  });
});

const CONDITION_SPANISH_NAMES = {
  "Frightened": "Asustado", "Off-Guard": "Desprevenido", "Enfeebled": "Debilitado", "Clumsy": "Torpe",
  "Drained": "Drenado", "Stupefied": "Atontado", "Grabbed": "Agarrado", "Prone": "Caído",
  "Blinded": "Cegado", "Confused": "Confundido", "Doomed": "Condenado", "Fatigued": "Fatigado",
  "Immobilized": "Inmovilizado", "Unconscious": "Inconsciente", "Slowed": "Lento", "Dying": "Moribundo",
  "Dazzled": "Deslumbrado", "Paralyzed": "Paralizado", "Petrified": "Petrificado", "Broken": "Roto",
  "Restrained": "Restringido", "Persistent Damage": "Daño persistente"
};
const localizeLegacyEffectRecords = (records, category, spanishNames) => {
  (records || []).forEach((record) => {
    const match = record.name.match(/^(.*?)\s*\(([^)]+)\)/);
    if (!match) return;
    const [, pt, en] = match;
    const english = en.trim();
    const spanish = spanishNames[english] || english;
    const slug = english.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    Object.assign(record, {
      id: record.id || `${category}.${slug}`,
      names: { "pt-BR": pt.trim(), en: english, es: spanish },
      summaries: localizedEquipmentSummary(
        record.description,
        `${category === "condition" ? "Condition" : "Benefit"}: ${english}.`,
        `${category === "condition" ? "Condición" : "Beneficio"}: ${spanish}.`
      )
    });
  });
};
localizeLegacyEffectRecords(PF2E_DATA.conditions, "condition", CONDITION_SPANISH_NAMES);
localizeLegacyEffectRecords(PF2E_DATA.buffs, "buff", {
  "Blessed": "Bendecido", "Quickened": "Acelerado", "Concealed": "Ocultado", "Invisible": "Invisible",
  "Shield Raised": "Escudo levantado", "Courageous Anthem": "Anthem valiente", "Rallying Anthem": "Anthem de ánimo",
  "Guidance": "Guía", "Dragon Stance": "Postura del dragón", "Tiger Stance": "Postura del tigre",
  "Mountain Stance": "Postura de la montaña", "Crane Stance": "Postura de la grulla"
});

// Registros históricos que já aparecem nos catálogos, mas ainda não têm o
// contrato trilíngue. Eles continuam marcados para revisão até a página do
// PDF e os pré-requisitos completos serem confirmados.
const LEGACY_UNVERIFIED_METADATA = {
  ancestries: {
    12: ["Kitsune", "Kitsune", "Kitsune", "Humanoides raposinos metamorfos ligados ao mundo espiritual.", "Foxlike shapeshifters tied to the spirit world.", "Cambiaformas con rasgos de zorro vinculados al mundo espiritual."],
    15: ["Azarketi", "Azarketi", "Azarketi", "Povo anfíbio adaptado à vida terrestre e aquática.", "An amphibious people adapted to life on land and underwater.", "Un pueblo anfibio adaptado a la vida terrestre y submarina."],
    17: ["Androide", "Android", "Androide", "Seres biotecnológicos com corpos artificiais e mentes conscientes.", "Biotechnological people with artificial bodies and conscious minds.", "Seres biotecnológicos con cuerpos artificiales y mentes conscientes."],
    19: ["Kayal", "Fetchling", "Hijo de las sombras", "Descendentes de habitantes do Plano das Sombras, adaptados à penumbra.", "Descendants of the Shadow Plane, adapted to dimness and darkness.", "Descendientes del Plano de las Sombras, adaptados a la penumbra."]
  },
  versatileHeritages: {
    "Ifrit (Toque do Fogo)": ["Ifrit", "Ifrit", "Ifrit", "Herança de fogo que manifesta resistência e afinidade ígnea.", "A fire heritage that manifests resistance and affinity with flames.", "Una herencia de fuego que manifiesta resistencia y afinidad con las llamas."],
    "Oread (Toque da Terra)": ["Oread", "Oread", "Oread", "Herança de terra ligada à pedra, minerais e resistência física.", "An earth heritage tied to stone, minerals, and physical resilience.", "Una herencia de tierra vinculada a la piedra, los minerales y la resistencia física."],
    "Sylph (Toque do Vento)": ["Sílfide", "Sylph", "Sílfide", "Herança de ar ligada ao vento, mobilidade e respiração livre.", "An air heritage tied to wind, mobility, and free breathing.", "Una herencia de aire vinculada al viento, la movilidad y la respiración libre."],
    "Undine (Toque da Água)": ["Ondina", "Undine", "Ondina", "Herança de água adaptada à natação e a ambientes aquáticos.", "A water heritage adapted to swimming and aquatic environments.", "Una herencia de agua adaptada a la natación y los entornos acuáticos."],
    "Ardande (Toque da Madeira)": ["Ardande", "Ardande", "Ardande", "Herança vegetal ligada à madeira, crescimento e vida natural.", "A plant heritage tied to wood, growth, and natural life.", "Una herencia vegetal vinculada a la madera, el crecimiento y la vida natural."],
    "Talos (Toque do Metal)": ["Talos", "Talos", "Talos", "Herança metálica ligada a ferro, aço e energia condutiva.", "A metal heritage tied to iron, steel, and conductive energy.", "Una herencia metálica vinculada al hierro, el acero y la energía conductora."],
    "Fantasma (Ghost)": ["Fantasma", "Ghost", "Fantasma", "Herança incorpórea presa ao mundo material por uma tarefa inacabada.", "An incorporeal heritage bound to the Material Plane by unfinished business.", "Una herencia incorpórea ligada al mundo material por un asunto pendiente."],
    "Ghoul (Carniçal)": ["Carniçal", "Ghoul", "Necrófago", "Herança morta-viva marcada por fome necrótica e sentidos predatórios.", "An undead heritage marked by necrotic hunger and predatory senses.", "Una herencia muerta viviente marcada por hambre necrótica y sentidos depredadores."],
    "Múmia (Mummy)": ["Múmia", "Mummy", "Momia", "Herança morta-viva preservada por ritos e maldições antigas.", "An undead heritage preserved by ancient rites and curses.", "Una herencia muerta viviente preservada por ritos y maldiciones antiguas."],
    "Vampiro (Vampire)": ["Vampiro", "Vampire", "Vampiro", "Herança morta-viva predatória ligada à noite e à sede de sangue.", "A predatory undead heritage tied to night and blood thirst.", "Una herencia muerta viviente depredadora ligada a la noche y la sed de sangre."],
    "Zumbi (Zombie)": ["Zumbi", "Zombie", "Zombi", "Herança morta-viva resiliente que persiste apesar de ferimentos terríveis.", "A resilient undead heritage that persists despite terrible wounds.", "Una herencia muerta viviente resistente que persiste pese a heridas terribles."]
  },
  archetypes: {
    "Espião Noturno (Shadowdancer)": ["Espião Noturno", "Shadowdancer", "Danzarín de sombras", "Arquétipo de furtividade que domina teleporte, escuridão e ilusões.", "A stealth archetype mastering teleportation, darkness, and illusion.", "Un arquetipo de sigilo que domina el teletransporte, la oscuridad y la ilusión."],
    "Dedicação: Bardo": ["Dedicação: Bardo", "Bard Dedication", "Dedicación de bardo", "Dedicação multiclasse que concede acesso a composição e magia oculta.", "A multiclass dedication granting access to compositions and occult magic.", "Una dedicación multiclase que concede acceso a composiciones y magia oculta."],
    "Dedicação: Clérigo": ["Dedicação: Clérigo", "Cleric Dedication", "Dedicación de clérigo", "Dedicação multiclasse que concede magia divina e vínculo com uma divindade.", "A multiclass dedication granting divine magic and a deity connection.", "Una dedicación multiclase que concede magia divina y vínculo con una deidad."],
    "Dedicação: Druida": ["Dedicação: Druida", "Druid Dedication", "Dedicación de druida", "Dedicação multiclasse que concede magia primal e poderes da natureza.", "A multiclass dedication granting primal magic and nature powers.", "Una dedicación multiclase que concede magia primordial y poderes de la naturaleza."],
    "Dedicação: Guerreiro": ["Dedicação: Guerreiro", "Fighter Dedication", "Dedicación de guerrero", "Dedicação multiclasse que amplia treinamento marcial e opções de combate.", "A multiclass dedication expanding martial training and combat options.", "Una dedicación multiclase que amplía el entrenamiento marcial y las opciones de combate."],
    "Dedicação: Ladino": ["Dedicação: Ladino", "Rogue Dedication", "Dedicación de pícaro", "Dedicação multiclasse que concede técnicas furtivas e perícias adicionais.", "A multiclass dedication granting rogue techniques and additional skills.", "Una dedicación multiclase que concede técnicas de pícaro y habilidades adicionales."],
    "Dedicação: Mago": ["Dedicação: Mago", "Wizard Dedication", "Dedicación de mago", "Dedicação multiclasse que concede grimório e conjuração arcana preparada.", "A multiclass dedication granting a spellbook and prepared arcane casting.", "Una dedicación multiclase que concede grimorio y lanzamiento arcano preparado."],
    "Dedicação: Magus": ["Dedicação: Magus", "Magus Dedication", "Dedicación de magus", "Dedicação multiclasse que combina ataques marciais e conjuração arcana.", "A multiclass dedication combining martial attacks and arcane casting.", "Una dedicación multiclase que combina ataques marciales y lanzamiento arcano."],
    "Dedicação: Patrulheiro": ["Dedicação: Patrulheiro", "Ranger Dedication", "Dedicación de explorador", "Dedicação multiclasse focada em Caçar Presa, exploração e combate à distância.", "A multiclass dedication focused on Hunt Prey, exploration, and ranged combat.", "Una dedicación multiclase centrada en Cazar presa, exploración y combate a distancia."],
    "Dedicação: Convocador": ["Dedicação: Convocador", "Summoner Dedication", "Dedicación de convocador", "Dedicação multiclasse que vincula um eidolon ao personagem.", "A multiclass dedication that binds an eidolon to the character.", "Una dedicación multiclase que vincula un eidolon al personaje."],
    "Dedicação: Bruxo": ["Dedicação: Bruxo", "Witch Dedication", "Dedicación de bruja", "Dedicação multiclasse que concede familiar patrono e magia de patronagem.", "A multiclass dedication granting a patron familiar and patron magic.", "Una dedicación multiclase que concede un familiar patrón y magia de patrón."],
    "Dedicação: Cineticista": ["Dedicação: Cineticista", "Kineticist Dedication", "Dedicación de cinético", "Dedicação multiclasse que abre portais elementais e impulsos cinéticos.", "A multiclass dedication opening elemental gates and kinetic impulses.", "Una dedicación multiclase que abre portales elementales e impulsos cinéticos."],
    "Dedicação: Psíquico": ["Dedicação: Psíquico", "Psychic Dedication", "Dedicación de psíquico", "Dedicação multiclasse que fortalece truques e poderes psiônicos.", "A multiclass dedication enhancing cantrips and psychic powers.", "Una dedicación multiclase que potencia trucos y poderes psíquicos."],
    "Dedicação: Taumaturgo": ["Dedicação: Taumaturgo", "Thaumaturge Dedication", "Dedicación de taumaturgo", "Dedicação multiclasse que concede implementos e Explorar Fraquezas.", "A multiclass dedication granting implements and Exploit Vulnerability.", "Una dedicación multiclase que concede implementos y Explotar vulnerabilidad."],
    "Dedicação: Exemplar": ["Dedicação: Exemplar", "Exemplar Dedication", "Dedicación de ejemplar", "Dedicação multiclasse que concede centelha divina e ícones sagrados.", "A multiclass dedication granting a divine spark and sacred ikons.", "Una dedicación multiclase que concede una chispa divina e iconos sagrados."],
    "Dedicação: Animista": ["Dedicação: Animista", "Animist Dedication", "Dedicación de animista", "Dedicação multiclasse que concede aparições e um receptáculo espiritual.", "A multiclass dedication granting apparitions and a spiritual vessel.", "Una dedicación multiclase que concede apariciones y un receptáculo espiritual."]
  },
  weapons: {
    "Adze (1d10 S)": ["Enxó", "Adze", "Azula", "Arma marcial pesada de corte e varredura.", "A heavy martial slashing weapon with sweep capabilities.", "Un arma marcial pesada cortante con capacidad de barrido."],
    "Air Repeater (1d4 P)": ["Repetidora de Ar", "Air Repeater", "Repetidora de aire", "Arma simples de disparo com pente de seis munições.", "A simple repeating firearm with a six-shot magazine.", "Un arma de fuego simple repetidora con cargador de seis disparos."],
    "Aklys (1d6 B)": ["Aklys", "Aklys", "Aklys", "Arma avançada amarrada, derrubadora e arremessável.", "An advanced tethered weapon that can trip and be thrown.", "Un arma avanzada atada que puede derribar y lanzarse."],
    "Alchemical Bomb (Special)": ["Bomba Alquímica", "Alchemical Bomb", "Bomba alquímica", "Arma consumível que usa um efeito alquímico elemental.", "A consumable weapon that uses an elemental alchemical effect.", "Un arma consumible que usa un efecto alquímico elemental."],
    "Alchemical Crossbow (1d8 P)": ["Besta Alquímica", "Alchemical Crossbow", "Ballesta alquímica", "Besta marcial preparada para entregar munição alquímica.", "A martial crossbow designed to deliver alchemical ammunition.", "Una ballesta marcial diseñada para entregar munición alquímica."],
    "Arbalest (1d10 P)": ["Arbalesta", "Arbalest", "Arbalesta", "Besta simples de alto dano e recarga lenta.", "A simple crossbow with high damage and a slow reload.", "Una ballesta simple de gran daño y recarga lenta."],
    "Arcabuz / Arquebus (1d8 P)": ["Arcabuz", "Arquebus", "Arcabuz", "Arma de fogo marcial de longo alcance e recarga.", "A long-ranged martial firearm with reload requirements.", "Un arma de fuego marcial de largo alcance que requiere recarga."],
    "Asp Coil (1d6 S)": ["Espiral de Áspide", "Asp Coil", "Espiral de áspid", "Arma avançada flexível para desarmar e atacar com acuidade.", "An advanced flexible weapon for disarming and precise attacks.", "Un arma avanzada flexible para desarmar y realizar ataques precisos."],
    "Atlatl (1d6 P)": ["Atlatl", "Atlatl", "Atlatl", "Arma simples propulsora que amplia o alcance de dardos.", "A simple propulsive weapon that extends dart range.", "Un arma simple propulsora que amplía el alcance de los dardos."],
    "Axe Musket - Melee (1d8 S)": ["Mosquete-Machado (corpo a corpo)", "Axe Musket (Melee)", "Mosquete-hacha (cuerpo a cuerpo)", "Arma de combinação que une machado e mecanismo de fogo.", "A combination weapon joining an axe with a firearm mechanism.", "Un arma combinada que une un hacha con un mecanismo de arma de fuego."],
    "Axe Musket - Ranged (1d6 P)": ["Mosquete-Machado (à distância)", "Axe Musket (Ranged)", "Mosquete-hacha (a distancia)", "Modo de disparo da arma de combinação mosquete-machado.", "The ranged mode of the axe musket combination weapon.", "El modo a distancia del arma combinada mosquete-hacha."],
    "Backpack Ballista (1d12 P)": ["Balista de Mochila", "Backpack Ballista", "Balista de mochila", "Arma marcial portátil de disparo pesado.", "A portable martial weapon for heavy ranged attacks.", "Un arma marcial portátil para ataques a distancia pesados."],
    "Backpack Catapult (1d12 B)": ["Catapulta de Mochila", "Backpack Catapult", "Catapulta de mochila", "Arma avançada portátil que arremessa projéteis de impacto.", "An advanced portable weapon that launches bludgeoning projectiles.", "Un arma avanzada portátil que lanza proyectiles contundentes."],
    "Broadsword / Espada Larga (1d8 S)": ["Espada Larga", "Broadsword", "Espada ancha", "Espada marcial versátil para cortes e estocadas.", "A versatile martial sword for slashing and thrusting.", "Una espada marcial versátil para cortar y apuñalar."],
    "Dueling Pistol / Pistola de Duelo (1d6 P)": ["Pistola de Duelo", "Dueling Pistol", "Pistola de duelo", "Arma de fogo marcial precisa para confrontos individuais.", "A precise martial firearm for one-on-one duels.", "Un arma de fuego marcial precisa para duelos individuales."],
    "Katar / Adaga de Punho (1d4 P)": ["Adaga de Punho", "Katar", "Katar", "Arma simples de punho com acuidade e técnicas de monge.", "A simple fist weapon with finesse and monk techniques.", "Un arma simple de puño con sutileza y técnicas de monje."],
    "Main-gauche / Adaga de Duelo (1d4 P)": ["Adaga de Duelo", "Main-gauche", "Main-gauche", "Adaga defensiva para aparar, desarmar e atacar com acuidade.", "A defensive dagger for parrying, disarming, and precise attacks.", "Una daga defensiva para parar, desarmar y atacar con precisión."],
    "Orc Knuckle Dagger (1d6 P)": ["Adaga de Punho Orc", "Orc Knuckle Dagger", "Daga de puño orca", "Arma marcial de punho orc para ataques ágeis e precisos.", "An orc martial fist weapon for agile, precise attacks.", "Un arma marcial de puño orca para ataques ágiles y precisos."],
    "Punching Dagger (1d4 P)": ["Adaga de Soco", "Punching Dagger", "Daga de puño", "Arma simples de punho com acuidade e golpes rápidos.", "A simple fist weapon with finesse and quick strikes.", "Un arma simple de puño con sutileza y golpes rápidos."],
    "Shield Boss / Umbo de Escudo (1d6 B)": ["Umbo de Escudo", "Shield Boss", "Umbo de escudo", "Acessório de escudo que transforma o umbo em arma contundente.", "A shield attachment that turns the boss into a bludgeoning weapon.", "Un accesorio de escudo que convierte el umbo en un arma contundente."],
    "Shield Spikes / Pontas de Escudo (1d6 P)": ["Pontas de Escudo", "Shield Spikes", "Púas de escudo", "Acessório de escudo que adiciona uma opção de ataque perfurante.", "A shield attachment that adds a piercing attack option.", "Un accesorio de escudo que añade una opción de ataque perforante."]
  },
  armors: {
    "Armored Cloak": ["Manto Blindado", "Armored Cloak", "Capa blindada"], "Armored Coat": ["Casaco Blindado", "Armored Coat", "Abrigo blindado"], "Automaton Chassis": ["Chassi de Autômato", "Automaton Chassis", "Chasis de autómata"], "Bakuwa Bony Plates": ["Placas Ósseas Bakuwa", "Bakuwa Bony Plates", "Placas óseas bakuwa"], "Buckle Armor": ["Armadura de Fivelas", "Buckle Armor", "Armadura de hebillas"], "Ceramic Plate": ["Placa de Cerâmica", "Ceramic Plate", "Placa de cerámica"], "Conrasu Reinforced Exoskeleton": ["Exoesqueleto Reforçado Conrasu", "Conrasu Reinforced Exoskeleton", "Exoesqueleto reforzado conrasu"], "Coral Armor": ["Armadura de Coral", "Coral Armor", "Armadura de coral"], "Coral Plate": ["Placa de Coral", "Coral Plate", "Placa de coral"]
  },
  shields: {
    "Caster's Targe": ["Targa de Conjurador", "Caster's Targe", "Targa de lanzador"], "Dart Shield": ["Escudo de Dardos", "Dart Shield", "Escudo de dardos"], "Gauntlet Buckler": ["Broquel-Manopla", "Gauntlet Buckler", "Broquel de guantelete"], "Harnessed Shield": ["Escudo com Arreio", "Harnessed Shield", "Escudo con arnés"], "Heavy Rondache": ["Rondache Pesado", "Heavy Rondache", "Rondache pesado"], "Hide Shield": ["Escudo de Couro", "Hide Shield", "Escudo de cuero"], "Klar": ["Klar", "Klar", "Klar"], "Meteor Shield": ["Escudo Meteórico", "Meteor Shield", "Escudo meteórico"], "Razor Disc": ["Disco de Lâminas", "Razor Disc", "Disco de hojas"], "Salvo Shield": ["Escudo de Salva", "Salvo Shield", "Escudo de salva"], "Swordstealer Shield": ["Escudo Rouba-Espadas", "Swordstealer Shield", "Escudo robaespadas"], "Sturdy Shield (Minor)": ["Escudo Resistente (Menor)", "Sturdy Shield (Minor)", "Escudo resistente (menor)"]
  }
};
const applyUnverifiedMetadata = (records, metadata, category) => {
  const prefixes = { ancestries: "ancestry", versatileHeritages: "heritage", archetypes: "archetype", weapons: "weapon", armors: "armor", shields: "shield" };
  (records || []).forEach((record, index) => {
    const data = category === "ancestries" ? metadata[index] : metadata[record.name];
    if (!data || (record.names && record.summaries)) return;
    const [pt, en, es, ptSummary, enSummary, esSummary] = data.length === 3
      ? [data[0], data[1], data[2], `Entrada de ${category === "armors" ? "armadura" : "escudo"} ${data[0]}.`, `${data[1]} ${category === "armors" ? "armor" : "shield"} catalog entry.`, `Entrada de ${category === "armors" ? "armadura" : "escudo"} ${data[2]}.`]
      : data;
    const slug = (en || pt).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const generatedId = `${prefixes[category] || category}.${slug}${category === "versatileHeritages" ? ".legacy_pending" : ""}`;
    Object.assign(record, {
      id: record.id || generatedId,
      names: { "pt-BR": pt, en, es },
      summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
      needs_review: true,
      ruleset: record.ruleset || "needs_review"
    });
  });
};
applyUnverifiedMetadata(Object.values(PF2E_DATA.ancestries), LEGACY_UNVERIFIED_METADATA.ancestries, "ancestries");
applyUnverifiedMetadata(PF2E_DATA.versatileHeritages, LEGACY_UNVERIFIED_METADATA.versatileHeritages, "versatileHeritages");
applyUnverifiedMetadata(PF2E_DATA.archetypes, LEGACY_UNVERIFIED_METADATA.archetypes, "archetypes");
applyUnverifiedMetadata(PF2E_DATA.weapons, LEGACY_UNVERIFIED_METADATA.weapons, "weapons");
applyUnverifiedMetadata(PF2E_DATA.armors, LEGACY_UNVERIFIED_METADATA.armors, "armors");
applyUnverifiedMetadata(PF2E_DATA.shields, LEGACY_UNVERIFIED_METADATA.shields, "shields");

// O índice e a descrição do arquétipo aparecem no Livro Básico local,
// incluindo a entrada da tabela de conteúdo na p. 382. A mecânica completa
// ainda permanece em revisão, mas a proveniência da opção é confirmada.
const shadowdancer = (PF2E_DATA.archetypes || []).find((record) => record.id === "archetype.shadowdancer");
if (shadowdancer) Object.assign(shadowdancer, {
  source: { book: "Pathfinder RPG Livro Básico (edição legada)", page: 382 },
  sourceApproximate: false,
  ruleset: "legacy",
  needs_review: true
});

// No Livro dos Mortos, estas opções são arquétipos de dedicação, não heranças
// versáteis. Mantê-las na coleção de heranças ofereceria uma escolha inválida
// durante a criação; movê-las conserva os dados localizados e a proveniência.
const undeadArchetypeSources = {
  "heritage.ghost.legacy_pending": 52,
  "heritage.ghoul.legacy_pending": 46,
  "heritage.mummy.legacy_pending": 56,
  "heritage.vampire.legacy_pending": 58,
  "heritage.zombie.legacy_pending": 60
};
for (const [heritageId, page] of Object.entries(undeadArchetypeSources)) {
  const index = (PF2E_DATA.versatileHeritages || []).findIndex((record) => record.id === heritageId);
  if (index < 0) continue;
  const [heritage] = PF2E_DATA.versatileHeritages.splice(index, 1);
  const archetypeId = heritageId.replace(/^heritage\./, "archetype.").replace(/\.legacy_pending$/, "");
  const archetype = (PF2E_DATA.archetypes || []).find((record) => record.id === archetypeId);
  if (archetype) {
    Object.assign(archetype, {
      category: archetype.category || "Undead Archetype",
      subtype: archetype.subtype || "standard",
      level: archetype.level || 2,
      dedicationLevel: archetype.dedicationLevel || 2,
      prerequisites: archetype.prerequisites || ["Você está morto-vivo"],
      source: { book: BOOK_DEAD_SOURCE, page },
      sourceApproximate: false,
      ruleset: "legacy"
    });
  }
}

// Os aliases antigos de Ardande e Talos apontam para as seções confirmadas do
// Rage of Elements. Eles continuam em revisão por serem registros legados.
for (const [heritageId, page] of [["heritage.ardande.legacy_pending", 46], ["heritage.talos.legacy_pending", 50]]) {
  const heritage = (PF2E_DATA.versatileHeritages || []).find((record) => record.id === heritageId);
  if (heritage) Object.assign(heritage, {
    source: { book: RAGE_ELEMENTS_SOURCE, page },
    sourceApproximate: false,
    ruleset: "remaster",
    needs_review: true
  });
}

// Proveniência confirmada no PDF local de Pólvora e Engrenagens: os dois
// dispositivos aparecem na tabela de armas à distância e nas descrições das
// páginas impressas 63–64. A página é certa, mas a transcrição mecânica ainda
// fica em revisão até a tabela completa ser conferida.
const backpackBallista = (PF2E_DATA.weapons || []).find((record) => record.id === "weapon.backpack_ballista");
if (backpackBallista) Object.assign(backpackBallista, {
  source: { book: GUNS_GEARS_SOURCE, page: 63 },
  sourceApproximate: false,
  needs_review: true
});
const backpackCatapult = (PF2E_DATA.weapons || []).find((record) => record.id === "weapon.backpack_catapult");
if (backpackCatapult) Object.assign(backpackCatapult, {
  source: { book: GUNS_GEARS_SOURCE, page: 64 },
  sourceApproximate: false,
  needs_review: true
});

// Estas armas aparecem na tabela de armas do Livro do Jogador 2, p. 275.
// A referência é confirmada, mas os efeitos individuais continuam em revisão
// até a transcrição mecânica ser confrontada linha a linha com o PDF.
const playerCore2LegacyWeaponIds = [
  "weapon.aklys", "weapon.alchemical_crossbow", "weapon.arbalest",
  "weapon.asp_coil", "weapon.atlatl", "weapon.main_gauche", "weapon.punching_dagger"
];
for (const weaponId of playerCore2LegacyWeaponIds) {
  const weapon = (PF2E_DATA.weapons || []).find((record) => record.id === weaponId);
  if (weapon) Object.assign(weapon, {
    source: { book: PLAYER_CORE_2_SOURCE, page: 275 },
    sourceApproximate: false,
    ruleset: "remaster",
    needs_review: true
  });
}

// Correção conferida na tabela de armas do Livro do Jogador 2, p. 275.
const verifiedAdze = (PF2E_DATA.weapons || []).find((record) => record.id === "weapon.adze");
if (verifiedAdze) Object.assign(verifiedAdze, {
  name: "Enxó (Adze)", category: "Marcial", damage: "1d10", damageType: "Cortante (Ct)",
  level: 0, price: "1 PO", bulk: 2, traits: ["Amplitude", "Enérgica", "Tripkee"],
  names: { "pt-BR": "Enxó", en: "Adze", es: "Azuela" },
  summaries: {
    "pt-BR": "Ferramenta de corte horizontal usada como arma marcial por construtores tripkee.",
    en: "A horizontal-bladed cutting tool used as a martial weapon by tripkee builders.",
    es: "Una herramienta de corte horizontal usada como arma marcial por constructores tripkee."
  },
  source: { book: PLAYER_CORE_2_SOURCE, page: 275 }, ruleset: "remaster", needs_review: false
});

// Entradas confirmadas nas tabelas de armas de fogo de Pólvora e Engrenagens
// (pp. 151 e 158 do PDF local). A nomenclatura mantém a tradução da edição
// brasileira e o nome inglês da fonte, sem confundir o catálogo legado com
// uma arma diferente.
const verifiedFirearms = {
  "weapon.air_repeater": {
    name: "Repetidor de Pressão (Pressure Repeater)", category: "Simples", damage: "1d4", damageType: "Perfuração (Pf)",
    level: 0, price: "5 PO", bulk: "L", traits: ["Ágil", "Repetição"],
    names: { "pt-BR": "Repetidor de Pressão", en: "Pressure Repeater", es: "Repetidor de presión" },
    summaries: { "pt-BR": "Arma de fogo simples que usa ar pressurizado e um carregador de seis projéteis.", en: "A simple firearm that uses pressurized air and a six-shot loader.", es: "Un arma de fuego simple que usa aire presurizado y un cargador de seis proyectiles." },
    source: { book: GUNS_GEARS_SOURCE, page: 151 }
  },
  "weapon.arquebus": {
    name: "Arcabuz (Arquebus)", category: "Marcial", damage: "1d8", damageType: "Perfuração (Pf)",
    level: 0, price: "10 PO", bulk: 2, traits: ["Coice", "Concussiva", "Fatal d12", "Recarga 1", "Alcance 150 pés"],
    names: { "pt-BR": "Arcabuz", en: "Arquebus", es: "Arcabuz" },
    summaries: { "pt-BR": "Arma de fogo marcial de longo alcance e forte recuo, usada por soldados e atiradores.", en: "A long-ranged martial firearm with powerful recoil, used by soldiers and marksmen.", es: "Un arma de fuego marcial de largo alcance y fuerte retroceso, usada por soldados y tiradores." },
    source: { book: GUNS_GEARS_SOURCE, page: 151 }
  },
  "weapon.dueling_pistol": {
    name: "Pistola de Duelo (Dueling Pistol)", category: "Marcial", damage: "1d6", damageType: "Perfuração (Pf)",
    level: 1, price: "12 PO", bulk: "L", traits: ["Concussiva", "Fatal d10", "Ocultável", "Recarga 1", "Alcance 60 pés"],
    names: { "pt-BR": "Pistola de Duelo", en: "Dueling Pistol", es: "Pistola de duelo" },
    summaries: { "pt-BR": "Arma de fogo marcial precisa e ocultável, criada para duelos e confrontos individuais.", en: "A precise, concealable martial firearm made for duels and one-on-one confrontations.", es: "Un arma de fuego marcial precisa y ocultable, creada para duelos y enfrentamientos individuales." },
    source: { book: GUNS_GEARS_SOURCE, page: 151 }
  },
  "weapon.axe_musket_melee": {
    name: "Machado-Mosquete (Axe Musket, melee)", category: "Marcial", damage: "1d8", damageType: "Cortante (Ct)",
    level: 1, price: "10 PO", bulk: 2, traits: ["Combinação", "Fusão crítica", "Amplitude"],
    names: { "pt-BR": "Machado-Mosquete (corpo a corpo)", en: "Axe Musket (Melee)", es: "Mosquete-hacha (cuerpo a cuerpo)" },
    summaries: { "pt-BR": "Forma corpo a corpo de uma arma combinada que une um machado a um mosquete.", en: "The melee form of a combination weapon joining an axe and a musket.", es: "La forma cuerpo a cuerpo de un arma combinada que une un hacha y un mosquete." },
    source: { book: GUNS_GEARS_SOURCE, page: 158 }
  },
  "weapon.axe_musket_ranged": {
    name: "Machado-Mosquete (Axe Musket, ranged)", category: "Marcial", damage: "1d6", damageType: "Perfuração (Pf)",
    level: 1, price: "10 PO", bulk: 2, traits: ["Combinação", "Concussiva", "Fatal d10", "Recarga 1", "Alcance 40 pés"],
    names: { "pt-BR": "Machado-Mosquete (à distância)", en: "Axe Musket (Ranged)", es: "Mosquete-hacha (a distancia)" },
    summaries: { "pt-BR": "Forma de disparo de uma arma combinada que une um machado a um mosquete.", en: "The firearm form of a combination weapon joining an axe and a musket.", es: "La forma de arma de fuego de un arma combinada que une un hacha y un mosquete." },
    source: { book: GUNS_GEARS_SOURCE, page: 158 }
  }
};
for (const [id, patch] of Object.entries(verifiedFirearms)) {
  const record = (PF2E_DATA.weapons || []).find((candidate) => candidate.id === id);
  if (record) Object.assign(record, patch, { ruleset: "legacy", needs_review: false });
}

// Demais armas de fogo mundanas presentes na Tabela 4-2 (p. 151). O campo
// range/reload é preservado para o picker, enquanto o motor de dano continua
// usando damage/damageType como nos registros históricos.
const additionalGunsGearsFirearms = [
  ["weapon.hand_cannon", "Canhão de Mão", "Hand Cannon", "Cañón de mano", "Simples", "1d6", "Modular Cn/Ct/Pf", "5 PO", 1, 1, "9 m", 1, ["Arma de fogo", "Modular"]],
  ["weapon.fire_lance", "Lança de Fogo", "Fire Lance", "Lanza de fuego", "Simples", "1d6", "Perfuração (Pf)", "5 PO", 2, 2, "3 m", 2, ["Arma de fogo"]],
  ["weapon.flintlock_musket", "Mosquete de Pederneira", "Flintlock Musket", "Mosquete de pedernal", "Simples", "1d6", "Perfuração (Pf)", "7 PO", 2, 2, "21 m", 1, ["Arma de fogo", "Ágil", "Repetição"]],
  ["weapon.coat_pistol", "Pistola de Casaco", "Coat Pistol", "Pistola de chaqueta", "Simples", "1d4", "Perfuração (Pf)", "6 PO", "L", 1, "9 m", 1, ["Arma de fogo", "Ocultável"]],
  ["weapon.flintlock_pistol", "Pistola de Pederneira", "Flintlock Pistol", "Pistola de pedernal", "Simples", "1d4", "Perfuração (Pf)", "6 PO", 1, 1, "12 m", 1, ["Arma de fogo"]],
  ["weapon.long_air_repeater", "Repetidor de Pressão Longo", "Long Air Repeater", "Repetidora de aire larga", "Simples", "1d8", "Perfuração (Pf)", "9 PO", 1, 1, "18 m", 0, ["Arma de fogo", "Repetição"]],
  ["weapon.blunderbuss", "Bacamarte", "Blunderbuss", "Trabuco", "Marcial", "1d8", "Perfuração (Pf)", "8 PO", 2, 2, "12 m", 1, ["Arma de fogo", "Concussiva", "Dispersão 1,5 m"]],
  ["weapon.harmona_gun", "Harmona", "Harmona Gun", "Pistola harmona", "Marcial", "1d10", "Impacto (Cn)", "10 PO", 2, 2, "45 m", 1, ["Arma de fogo", "Concussiva", "Fatal d10", "Ocultável"]],
  ["weapon.mithral_tree", "Árvore de Mithral", "Mithral Tree", "Árbol de mithral", "Marcial", "1d8", "Perfuração (Pf)", "9 PO", 1, 2, "45 m", 1, ["Arma de fogo", "Concussiva", "Fatal d8"]]
].map(([id, pt, en, es, category, damage, damageType, price, bulk, hands, range, reload, traits]) => ({
  id, name: `${pt} (${en})`, category, damage, damageType, level: 0, price, bulk, hands,
  range, reload, traits,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `${pt} da tabela de armas de fogo de Pólvora e Engrenagens, com alcance ${range} e recarga ${reload}.`,
    en: `${en} from the Guns & Gears firearm table, with a ${range} range increment and reload ${reload}.`,
    es: `${es} de la tabla de armas de fuego de Pólvora y Engranajes, con alcance de ${range} y recarga ${reload}.`
  },
  source: { book: GUNS_GEARS_SOURCE, page: 151 }, ruleset: "legacy", needs_review: false
}));
for (const weapon of additionalGunsGearsFirearms) {
  if (!(PF2E_DATA.weapons || []).some((candidate) => candidate.id === weapon.id)) PF2E_DATA.weapons.push(weapon);
}

const additionalAdvancedFirearms = [
  ["weapon.jezail", "Jezail", "Jezail", "Jezail", "Marcial", "1d8", "Perfuração (Pf)", "11 PO", 1, 1, "27 m", 1, ["Arma de fogo", "Apunhaladora", "Fatal d10"]],
  ["weapon.double_barrel_musket", "Mosquete de Cano Duplo", "Double-Barrel Musket", "Mosquete de doble cañón", "Marcial", "1d6", "Perfuração (Pf)", "11 PO", 2, 2, "18 m", 1, ["Arma de fogo", "Cano duplo", "Concussiva"]],
  ["weapon.pepperbox", "Pimenteiro", "Pepperbox", "Pimentero", "Marcial", "1d4", "Perfuração (Pf)", "12 PO", 1, 1, "18 m", 1, ["Arma de fogo", "Capacidade 3"]],
  ["weapon.dragon_mouth_pistol", "Pistola Boca de Dragão", "Dragon Mouth Pistol", "Pistola boca de dragón", "Marcial", "1d6", "Perfuração (Pf)", "9 PO", 1, 1, "6 m", 1, ["Arma de fogo", "Dispersão 1,5 m"]],
  ["weapon.double_barrel_pistol", "Pistola de Cano Duplo", "Double-Barrel Pistol", "Pistola de doble cañón", "Marcial", "1d4", "Perfuração (Pf)", "7 PO", 1, 1, "9 m", 1, ["Arma de fogo", "Cano duplo"]],
  ["weapon.clan_pistol", "Pistola de Clã", "Clan Pistol", "Pistola de clan", "Marcial", "1d6", "Perfuração (Pf)", "5 PO", "L", 1, "24 m", 1, ["Anão", "Arma de fogo", "Concussiva"]],
  ["weapon.throwing_weapon", "Arremessador", "Spear Launcher", "Lanzador", "Avançada", "1d6", "Perfuração (Pf)", "6 PO", 1, 2, "9 m", 1, ["Arma de fogo", "Dispersão 1,5 m"]],
  ["weapon.dwarven_scattergun", "Espingarda Enânica", "Dwarven Scattergun", "Escopeta enana", "Avançada", "1d8", "Perfuração (Pf)", "10 PO", 2, 2, "15 m", 1, ["Anão", "Arma de fogo", "Concussiva", "Dispersão 3 m"]]
].map(([id, pt, en, es, category, damage, damageType, price, bulk, hands, range, reload, traits]) => ({
  id, name: `${pt} (${en})`, category, damage, damageType, level: 1, price, bulk, hands,
  range, reload, traits,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `${pt} da tabela de armas de fogo de Pólvora e Engrenagens, com alcance ${range} e recarga ${reload}.`,
    en: `${en} from the Guns & Gears firearm table, with a ${range} range increment and reload ${reload}.`,
    es: `${es} de la tabla de armas de fuego de Pólvora y Engranajes, con alcance de ${range} y recarga ${reload}.`
  },
  source: { book: GUNS_GEARS_SOURCE, page: 151 }, ruleset: "legacy", needs_review: false
}));
for (const weapon of additionalAdvancedFirearms) {
  if (!(PF2E_DATA.weapons || []).some((candidate) => candidate.id === weapon.id)) PF2E_DATA.weapons.push(weapon);
}

// Munições e municiadores da mesma tabela (p. 151), disponíveis no inventário
// sem serem confundidos com armas equipáveis.
const gunsGearsAmmunition = [
  ["item.guns_gears.ten_bullets", "10 Balas", "10 Bullets", "10 balas", "1 PP", "L", "Conjunto de dez projéteis e pólvora para armas de fogo.", "A set of ten firearm bullets and powder.", "Un conjunto de diez balas y pólvora para armas de fuego."],
  ["item.guns_gears.loader_six_spheres", "Municiador com 6 Esferas", "6-Sphere Magazine", "Cargador de 6 esferas", "6 PP", "L", "Municiador substituível com seis esferas para armas de fogo compatíveis.", "A replaceable six-sphere magazine for compatible firearms.", "Un cargador reemplazable de seis esferas para armas de fuego compatibles."],
  ["item.guns_gears.loader_eight_spheres", "Municiador com 8 Esferas", "8-Sphere Magazine", "Cargador de 8 esferas", "8 PP", "L", "Municiador substituível com oito esferas para armas de fogo compatíveis.", "A replaceable eight-sphere magazine for compatible firearms.", "Un cargador reemplazable de ocho esferas para armas de fuego compatibles."]
].map(([id, pt, en, es, price, bulk, ptSummary, enSummary, esSummary]) => ({
  id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  mainCategory: "gear", subCategory: "ammunition", level: 0, price, bulk, traits: ["Munição"], description: ptSummary,
  source: { book: GUNS_GEARS_SOURCE, page: 151 }, ruleset: "legacy", needs_review: false
}));
for (const item of gunsGearsAmmunition) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

// Equipamentos e acessórios de armas consultados nas tabelas de Pólvora e
// Engrenagens (pp. 180–184). Os metadados estão disponíveis para criação e
// inventário; efeitos completos permanecem em revisão até a catalogação de
// cada variante e ativação.
const gunsGearsEquipment = [
  ["item.guns_gears.gunners_bandolier", "Bandoleira do Atirador", "Gunner's Bandolier", "Bandolera del tirador", 3, 180, "Equipamento para transportar e harmonizar armas de fogo e bestas de mão.", "Equipment for carrying and attuning firearms and hand crossbows.", "Equipo para transportar y armonizar armas de fuego y ballestas de mano."],
  ["item.guns_gears.immaculate_holster", "Coldre Imaculado", "Immaculate Holster", "Funda impecable", 3, 180, "Coldre mágico que limpa, oleia e recarrega armas compatíveis uma vez por dia.", "A magical holster that cleans, oils, and reloads compatible weapons once per day.", "Una funda mágica que limpia, aceita y recarga armas compatibles una vez al día."],
  ["item.guns_gears.lucky_draw_bandolier", "Bandoleira do Saque da Sorte", "Lucky Draw Bandolier", "Bandolera del golpe de suerte", 9, 180, "Bandoleira mágica que transforma cartas em munição temporária durante uma ativação.", "A magical bandolier that turns cards into temporary ammunition when activated.", "Una bandolera mágica que convierte cartas en munición temporal al activarse."],
  ["item.guns_gears.amplifying_scope", "Mira de Amplificação", "Amplifying Scope", "Mira amplificadora", 3, 181, "Mira anexada que amplia o alcance e auxilia a percepção através da arma.", "An attached scope that extends range and assists perception through the weapon.", "Una mira acoplada que amplía el alcance y ayuda a percibir a través del arma."],
  ["item.guns_gears.delineating_scope", "Mira de Delineamento", "Delineating Scope", "Mira delimitadora", 10, 181, "Mira que transforma o som de um impacto em luz para revelar o alvo atingido.", "A scope that turns the sound of an impact into light to reveal the struck target.", "Una mira que transforma el sonido de un impacto en luz para revelar al objetivo."],
  ["item.guns_gears.magnetite_scope", "Mira de Magnetita", "Magnetite Scope", "Mira de magnetita", 9, 181, "Mira para armas de fogo com dispersão que amplia o raio de dispersão.", "A scope for scatter firearms that increases their scatter radius.", "Una mira para armas de fuego con dispersión que aumenta su radio de dispersión."],
  ["item.guns_gears.scope_of_truth", "Mira da Verdade", "Scope of Truth", "Mira de la verdad", 13, 181, "Mira mágica que aprimora Buscar e permite enxergar através de certas ilusões.", "A magical scope that improves Seek and reveals certain illusions.", "Una mira mágica que mejora Buscar y revela ciertas ilusiones."],
  ["item.guns_gears.darkvision_scope", "Mira de Visão no Escuro", "Darkvision Scope", "Mira de visión en la oscuridad", 5, 181, "Mira que concede visão no escuro enquanto o usuário observa através dela.", "A scope that grants darkvision while the user looks through it.", "Una mira que concede visión en la oscuridad mientras se mira a través de ella."],
  ["item.guns_gears.weapon_harness", "Armação Portátil de Arma", "Weapon Harness", "Armazón portátil de arma", 1, 182, "Suporte portátil para estabilizar armas de fogo com recuo.", "A portable support for stabilizing firearms with the kickback trait.", "Un soporte portátil para estabilizar armas de fuego con el rasgo retroceso."],
  ["item.guns_gears.snipers_saddle", "Sela do Atirador", "Sniper's Saddle", "Silla del tirador", 2, 182, "Sela com armação retrátil que funciona como tripé para estabilizar uma arma.", "A saddle with a retractable frame that works as a tripod to stabilize a weapon.", "Una silla con armazón retráctil que funciona como trípode para estabilizar un arma."],
  ["item.guns_gears.immovable_tripod", "Tripé Imóvel", "Immovable Tripod", "Trípode inamovible", 10, 182, "Tripé mágico que pode ser ancorado no ar ou sob a água.", "A magical tripod that can be anchored in midair or underwater.", "Un trípode mágico que puede anclarse en el aire o bajo el agua."],
  ["item.guns_gears.shared_power_braces", "Brasões do Poder Partilhado", "Shared Power Braces", "Brazales del poder compartido", 3, 183, "Conjunto de emblemas que compartilha runas fundamentais entre duas armas.", "A set of emblems that shares fundamental runes between two weapons.", "Un conjunto de emblemas que comparte runas fundamentales entre dos armas."],
  ["item.guns_gears.breech_ejectors", "Ejetores de Culatra", "Breech Ejectors", "Expulsores de recámara", 3, 183, "Mecanismo consumível que acelera a recarga de uma arma de fogo de dois canos.", "A consumable mechanism that speeds reloading a double-barreled firearm.", "Un mecanismo consumible que acelera la recarga de un arma de fuego de doble cañón."],
  ["item.guns_gears.compressed_air_firing_system", "Sistema de Disparo de Ar Comprimido", "Compressed Air Firing System", "Sistema de disparo de aire comprimido", 4, 183, "Mecanismo anexado que permite disparar sob a água, com redução no alcance.", "An attached mechanism that allows firing underwater, with reduced range.", "Un mecanismo acoplado que permite disparar bajo el agua, con alcance reducido."],
  ["item.guns_gears.underwater_firing_mechanism", "Mecanismo de Disparo Submarino", "Underwater Firing Mechanism", "Mecanismo de disparo submarino", 9, 183, "Mecanismo mágico anexado que permite disparar em condições que impedem a ignição da pólvora.", "A magical attached mechanism that allows firing where gunpowder would not ignite.", "Un mecanismo mágico acoplado que permite disparar donde la pólvora no encendería."],
  ["item.guns_gears.screaming_skull", "Caveira Gritante", "Screaming Skull", "Calavera gritona", 12, 184, "Talismã consumível para uma arma de fogo ou besta, ligado a Intimidação.", "A consumable talisman for a firearm or crossbow, tied to Intimidation.", "Un talismán consumible para un arma de fuego o ballesta, ligado a Intimidación."]
].map(([id, pt, en, es, level, page, ptSummary, enSummary, esSummary]) => ({
  id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  description: ptSummary, mainCategory: level >= 3 ? "magic_items" : "gear", subCategory: "guns_gears", level, price: undefined, bulk: "L", traits: ["Pólvora e Engrenagens"],
  source: { book: GUNS_GEARS_SOURCE, page }, ruleset: "legacy", needs_review: true
}));
for (const item of gunsGearsEquipment) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

// Armas de fogo fantásticas, armengadas e combinadas consultadas nas pp.
// 155–168. São opções utilizáveis pelo personagem, mas as ativações e
// requisitos de manufatura continuam explicitamente marcados para revisão.
const gunsGearsFantasticWeapons = [
  ["detonating_breath", "Sopro Detonador", "Detonating Breath", "Aliento detonador", 8, 155],
  ["dragonet_rifle", "Rifle-Dragonete", "Dragonet Rifle", "Rifle de dragonete", 4, 155],
  ["carnifor", "Carníforo", "Carnifor", "Carníforo", 9, 156],
  ["petrifying_cannon", "Canhão Petrificante", "Petrifying Cannon", "Cañón petrificante", 15, 156],
  ["scream_launcher", "Disparador de Gritos", "Scream Launcher", "Lanzador de gritos", 9, 156],
  ["arachnid_armament", "Armamento Aracnídeo", "Arachnid Armament", "Armamento arácnido", 6, 156],
  ["thorn_launcher", "Lançador de Espinhos", "Thorn Launcher", "Lanzador de espinas", 6, 157],
  ["tentacle_cannon", "Canhão Tentacular", "Tentacle Cannon", "Cañón tentacular", 7, 157],
  ["spoon_armament", "Armamento de Colher", "Spoon Armament", "Armamento de cuchara", 1, 158],
  ["kaboom_armament", "Armamento Kabum", "Kaboom Armament", "Armamento kabum", 1, 158],
  ["liars_armament", "Armamento do Mentiroso", "Liar's Armament", "Armamento del mentiroso", 7, 158],
  ["arboreal_revenge", "Vingança do Arbóreo", "Arboreal Revenge", "Venganza del arbóreo", 6, 161],
  ["immolation_clan_pistol", "Pistola de Clã da Imolação", "Immolation Clan Pistol", "Pistola de clan de la inmolación", 10, 161],
  ["pact_bound_pistol", "Pistola Pacto-Vinculada", "Pactbound Pistol", "Pistola ligada por pacto", 10, 162],
  ["animated_dreamer", "Sonhadora Animada", "Animated Dreamer", "Soñadora animada", 15, 162],
  ["dashing_shooter", "Caçador Fanfarrão", "Dashing Shooter", "Cazador fanfarrón", 3, 163],
  ["ducal_defender", "Defensor do Ducado", "Ducal Defender", "Defensor del ducado", 13, 163],
  ["submersible_pistol", "Pistola Submersa", "Submersible Pistol", "Pistola sumergible", 8, 164],
  ["hyldarf_fang", "Presa de Hyldarf", "Hyldarf's Fang", "Colmillo de Hyldarf", 15, 165],
  ["sky_iris", "Íris do Céu", "Sky Iris", "Iris del cielo", 6, 166],
  ["charlatans_passing", "Passagem do Charlatão", "Charlatan's Passage", "Paso del charlatán", 15, 166],
  ["reapers_grip", "Aperto do Ceifador", "Reaper's Grip", "Agarre del segador", 11, 166],
  ["rowan_rifle", "Rifle de Sorveira", "Rowan Rifle", "Rifle de serbal", 16, 167],
  ["tigers_claw", "Garra do Tigre", "Tiger's Claw", "Garra del tigre", 11, 167],
  ["wonder_pistol", "Pistola da Maravilha", "Wonder Pistol", "Pistola de la maravilla", 13, 168]
].map(([id, pt, en, es, level, page]) => ({
  id: `item.guns_gears.fantastic_weapon.${id}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Arma de fogo fantástica de Pólvora e Engrenagens, nível ${level}; ativações e requisitos de manufatura devem ser conferidos na fonte.`,
    en: `Guns & Gears fantastic firearm, level ${level}; activations and Crafting requirements must be checked against the source.`,
    es: `Arma de fuego fantástica de Guns & Gears, nivel ${level}; las activaciones y requisitos de Artesanía deben confirmarse en la fuente.`
  },
  description: `Opção de arma de fogo fantástica da página ${page}.`,
  mainCategory: "magic_items",
  subCategory: "guns_gears_firearms",
  level,
  rarity: "uncommon",
  traits: ["Pólvora e Engrenagens", "Arma de fogo"],
  source: { book: GUNS_GEARS_SOURCE, page },
  ruleset: "legacy",
  needs_review: true
}));
for (const item of gunsGearsFantasticWeapons) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

const gunsGearsSpecialAmmunition = [
  ["glue_bullet", "Bala de Cola", "Glue Bullet", "Bala de pegamento", 4, 169],
  ["erosion_bullet", "Bala da Erosão", "Erosion Bullet", "Bala de erosión", 5, 169],
  ["faerie_bullet", "Bala Feérica", "Faerie Bullet", "Bala feérica", 7, 169],
  ["reliable_cartridge", "Cartucho Confiável", "Reliable Cartridge", "Cartucho fiable", 3, 170],
  ["dream_cartridge", "Cartucho Sonhador", "Dream Cartridge", "Cartucho soñador", 14, 170],
  ["awakened_metal_shot", "Disparo de Metal Desperto", "Awakened Metal Shot", "Disparo de metal despertado", 17, 170],
  ["aromatic_ammunition", "Munição Aromática", "Aromatic Ammunition", "Munición aromática", 2, 171],
  ["exsanguinating_ammunition", "Munição Exsanguinante", "Exsanguinating Ammunition", "Munición exsanguinante", 4, 171],
  ["meteor_shot", "Tiro Meteoro", "Meteor Shot", "Disparo meteoro", 7, 172],
  ["bridge_shot", "Tiro-Passarela", "Bridge Shot", "Disparo-pasarela", 7, 172],
  ["silent_shot", "Tiro Silenciante", "Silent Shot", "Disparo silencioso", 11, 172]
].map(([id, pt, en, es, level, page]) => ({
  id: `item.guns_gears.ammunition.${id}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Munição especial de Pólvora e Engrenagens, nível ${level}; efeito e compatibilidade devem ser conferidos na fonte.`,
    en: `Guns & Gears special ammunition, level ${level}; effect and compatibility must be checked against the source.`,
    es: `Munición especial de Guns & Gears, nivel ${level}; el efecto y la compatibilidad deben confirmarse en la fuente.`
  },
  description: `Munição especial da página ${page}.`,
  mainCategory: "gear",
  subCategory: "ammunition",
  level,
  rarity: "uncommon",
  bulk: "L",
  traits: ["Munição", "Pólvora e Engrenagens"],
  source: { book: GUNS_GEARS_SOURCE, page },
  ruleset: "legacy",
  needs_review: true
}));
for (const item of gunsGearsSpecialAmmunition) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

const gunsGearsSiegeEquipment = [
  ["explosive_ram", "Aríete Explosivo", "Explosive Ram", "Ariete explosivo", 7, 174],
  ["bombard", "Bombarda", "Bombard", "Bombarda", 5, 174],
  ["heavy_bombard", "Bombarda Pesada", "Heavy Bombard", "Bombarda pesada", 9, 174],
  ["cannon", "Canhão", "Cannon", "Cañón", 8, 174],
  ["alkenstar_cannon", "Canhão Alkenstar", "Alkenstar Cannon", "Cañón de Alkenstar", 15, 175],
  ["hellmouth_cannon", "Canhão Boca de Inferno", "Hellmouth Cannon", "Cañón boca de infierno", 11, 175],
  ["steelheart_21", "Coração de Aço 21", "Steelheart 21", "Corazón de acero 21", 13, 176],
  ["fire_dragonet", "Dragonete de Fogo", "Fire Dragonet", "Dragonete de fuego", 8, 176],
  ["alchemical_springald", "Espringal Alquímico", "Alchemical Springald", "Espringal alquímico", 13, 176],
  ["hwacha", "Hwacha", "Hwacha", "Hwacha", 4, 177],
  ["mortar", "Morteiro", "Mortar", "Mortero", 7, 177],
  ["chain_shot", "Disparo de Corrente", "Chain Shot", "Disparo de cadena", 0, 178],
  ["sambuca", "Sambuca", "Sambuca", "Sambuca", 3, 178]
].map(([id, pt, en, es, level, page]) => ({
  id: `item.guns_gears.siege.${id}`,
  name: `${pt} (${en})`,
  names: { "pt-BR": pt, en, es },
  summaries: {
    "pt-BR": `Equipamento de cerco de Pólvora e Engrenagens, nível ${level}; equipe, tripulação e regras de disparo devem ser conferidas na fonte.`,
    en: `Guns & Gears siege equipment, level ${level}; crew, operation, and firing rules must be checked against the source.`,
    es: `Equipo de asedio de Guns & Gears, nivel ${level}; la tripulación, operación y reglas de disparo deben confirmarse en la fuente.`
  },
  description: `Equipamento de cerco da página ${page}.`,
  mainCategory: "gear",
  subCategory: "guns_gears_siege",
  level,
  rarity: "uncommon",
  bulk: "—",
  traits: ["Pólvora e Engrenagens", "Cerco"],
  source: { book: GUNS_GEARS_SOURCE, page },
  ruleset: "legacy",
  needs_review: true
}));
for (const item of gunsGearsSiegeEquipment) {
  if (!(PF2E_DATA.items || []).some((candidate) => candidate.id === item.id)) PF2E_DATA.items.push(item);
}

// Entradas confirmadas nas tabelas de armas do Livro do Jogador local
// (pp. 278–281). Os IDs legados são preservados para não quebrar fichas
// existentes, mas os nomes seguem a terminologia da edição brasileira.
const verifiedPlayerCoreWeapons = {
  "weapon.katar": {
    source: { book: PLAYER_CORE_SOURCE, page: 278 }
  },
  "weapon.orc_knuckle_dagger": {
    source: { book: PLAYER_CORE_SOURCE, page: 279 }
  },
  "weapon.broadsword": {
    name: "Espada Longa (Longsword)", category: "Marcial", damage: "1d8", damageType: "Cortante (Ct)",
    level: 0, price: "1 PO", bulk: 1, traits: ["Versátil Pf"],
    names: { "pt-BR": "Espada Longa", en: "Longsword", es: "Espada larga" },
    summaries: { "pt-BR": "Espada marcial de uma mão com lâmina versátil para cortes ou estocadas.", en: "A martial one-handed sword with a versatile blade for slashing or thrusting.", es: "Una espada marcial de una mano con hoja versátil para cortar o apuñalar." },
    source: { book: PLAYER_CORE_SOURCE, page: 279 }
  },
  "weapon.shield_boss": {
    name: "Bossa de Escudo (Shield Boss)", category: "Marcial", damage: "1d6", damageType: "Impacto (Cn)",
    level: 0, price: "5 PP", bulk: "—", traits: ["Anexada ao escudo"],
    names: { "pt-BR": "Bossa de Escudo", en: "Shield Boss", es: "Bossa de escudo" },
    summaries: { "pt-BR": "Acessório anexado ao escudo que permite usá-lo para ataques contundentes.", en: "A shield attachment that lets the shield be used for bludgeoning attacks.", es: "Un accesorio unido al escudo que permite usarlo para ataques contundentes." },
    source: { book: PLAYER_CORE_SOURCE, page: 279 }
  },
  "weapon.shield_spikes": {
    name: "Cravos de Escudo (Shield Spikes)", category: "Marcial", damage: "1d6", damageType: "Perfuração (Pf)",
    level: 0, price: "5 PP", bulk: "—", traits: ["Anexados ao escudo"],
    names: { "pt-BR": "Cravos de Escudo", en: "Shield Spikes", es: "Clavos de escudo" },
    summaries: { "pt-BR": "Acessório anexado ao escudo que adiciona uma opção de ataque perfurante.", en: "A shield attachment that adds a piercing attack option.", es: "Un accesorio unido al escudo que añade una opción de ataque perforante." },
    source: { book: PLAYER_CORE_SOURCE, page: 279 }
  },
  "weapon.alchemical_bomb": {
    name: "Bomba Alquímica (Alchemical Bomb)", category: "Marcial", damage: "Especial", damageType: "Variável",
    level: 0, price: "Variável", bulk: "L", traits: ["Bomba"],
    names: { "pt-BR": "Bomba Alquímica", en: "Alchemical Bomb", es: "Bomba alquímica" },
    summaries: { "pt-BR": "Arma marcial consumível cujo dano e efeitos variam conforme a bomba escolhida.", en: "A martial consumable weapon whose damage and effects vary by bomb type.", es: "Un arma marcial consumible cuyo daño y efectos varían según el tipo de bomba." },
    source: { book: PLAYER_CORE_SOURCE, page: 281 }
  }
};
for (const [id, patch] of Object.entries(verifiedPlayerCoreWeapons)) {
  const record = (PF2E_DATA.weapons || []).find((candidate) => candidate.id === id);
  if (record) Object.assign(record, patch, { ruleset: "remaster", needs_review: false });
}

// Novas armas da tabela do Livro do Jogador 2 (p. 275). Estas entradas não
// substituem os registros legados e ficam disponíveis para novos personagens.
const playerCore2Weapons = [
  ["weapon.cruuk", "Cruuk", "Cruuk", "Cruuk", "Arma marcial tripkee arremessável, útil para caça e combate.", "A throwable martial tripkee weapon useful for hunting and combat.", "Un arma marcial tripkee arrojadiza, útil para la caza y el combate.", "Marcial", "1d6", "Impacto (Cn)", 0, "4 PP", "L", ["Enxó"]],
  ["weapon.hand_adze", "Enxó de Mão", "Hand Adze", "Azula de mano", "Ferramenta e arma marcial compacta para cortes precisos.", "A compact martial tool and weapon for precise slashing.", "Una herramienta y arma marcial compacta para cortes precisos.", "Marcial", "1d4", "Cortante (Ct)", 0, "5 PP", "L", ["Enxó"]],
  ["weapon.fangwire", "Fio de Presa", "Fangwire", "Alambre de colmillo", "Arma de emboscada kobold, fina e difícil de perceber.", "A kobold ambush weapon that is thin and difficult to notice.", "Un arma de emboscada kobold, fina y difícil de percibir.", "Marcial", "1d4", "Cortante (Ct)", 0, "4 PO", "L", ["Acuidade", "Agarrar", "Ágil", "Apunhalagem", "Kobold", "Mortal d8"]],
  ["weapon.khopesh", "Khopesh", "Khopesh", "Khopesh", "Espada curva incomum capaz de derrubar adversários.", "An uncommon curved sword capable of tripping foes.", "Una espada curva poco común capaz de derribar enemigos.", "Marcial", "1d8", "Cortante (Ct)", 0, "2 PO", 1, ["Derrubar"]],
  ["weapon.claw_blade", "Lâmina de Garras", "Claw Blade", "Hoja de garras", "Arma de mão amurrun com lâminas paralelas e versatilidade perfurante.", "An amurrun hand weapon with parallel blades and versatile piercing damage.", "Un arma de mano amurrun con hojas paralelas y daño perforante versátil.", "Marcial", "1d4", "Cortante (Ct)", 0, "2 PO", "L", ["Acuidade", "Ágil", "Amurrun", "Desarmar", "Mortal d8", "Versátil Pf"]],
  ["weapon.tengu_gale_blade", "Lâmina Grimpa Tengu", "Tengu Gale Blade", "Hoja de viento tengu", "Espada incomum tengu, leve e adequada para desarmar.", "An uncommon tengu sword designed for agile disarming attacks.", "Una espada tengu poco común diseñada para ataques ágiles y desarmes.", "Marcial", "1d6", "Cortante (Ct)", 0, "4 PO", "L", ["Acuidade", "Ágil", "Desarmar", "Tengu"]],
  ["weapon.mambele", "Mambele", "Mambele", "Mambele", "Faca-machado que causa dano adicional ao ser retirada do alvo.", "A knife-axe that deals extra harm when pulled from a target.", "Una cuchilla-hacha que causa daño adicional al retirarse del objetivo.", "Marcial", "1d6", "Cortante (Ct)", 0, "6 PP", 1, ["Arremesso 6 m", "Desarmar", "Mortal d8"]],
  ["weapon.breach_pike", "Pique de Rompimento", "Breach Pike", "Pica de ruptura", "Pique hobgoblin devastador, feito para romper escudos e estruturas.", "A devastating hobgoblin pike built to break shields and structures.", "Una pica hobgoblin devastadora para romper escudos y estructuras.", "Marcial", "1d6", "Perfuração (Pf)", 0, "8 PO", 1, ["Alcance", "Devastadora", "Hobgoblin"]],
  ["weapon.claw_whip", "Chicote com Garras", "Claw Whip", "Látigo con garras", "Arma avançada amurrun com alcance e capacidade de dificultar movimentos.", "An advanced amurrun weapon with reach that can hinder movement.", "Un arma avanzada amurrun con alcance que puede dificultar el movimiento.", "Avançada", "1d6", "Cortante (Ct)", 0, "5 PO", 1, ["Acuidade", "Alcance", "Amurrun", "Dificultadora"]],
  ["weapon.flying_talon", "Garra Voadora", "Flying Talon", "Garra voladora", "Arma avançada kobold acorrentada, arremessável e capaz de derrubar à distância.", "An advanced tethered kobold weapon that can be thrown and trip at range.", "Un arma avanzada kobold encadenada que puede lanzarse y derribar a distancia.", "Avançada", "1d4", "Perfuração (Pf)", 0, "6 PO", 1, ["Acorrentada", "Acuidade", "Ágil", "Arremesso 3 m", "Derrubar", "Derrubar à distância", "Kobold"]],
  ["weapon.ingenious_pick", "Picareta Engenhosa", "Ingenious Pick", "Pico ingenioso", "Picareta avançada kobold com dano modular e golpe fatal.", "An advanced kobold pick with modular damage and a deadly strike.", "Un pico kobold avanzado con daño modular y un golpe mortal.", "Avançada", "1d6", "Modular", 0, "10 PO", 1, ["Apunhalagem", "Fatal d10", "Kobold", "Modular Cn/Pf/Ct"]],
  ["weapon.capture_spetum", "Spetum de Captura", "Capture Spetum", "Spetum de captura", "Arma de haste hobgoblin para alcançar, derrubar e dificultar inimigos.", "A hobgoblin polearm for reaching, tripping, and hindering enemies.", "Un arma de asta hobgoblin para alcanzar, derribar y dificultar enemigos.", "Avançada", "1d10", "Perfuração (Pf)", 0, "9 PO", 2, ["Alcance", "Derrubar", "Dificultadora", "Hobgoblin"]],
  ["weapon.spirit_thresher", "Tritura-Espírito", "Spirit Thresher", "Triturador de espíritus", "Mangual kholo pesado que varre alvos e pode causar dano cortante.", "A heavy kholo flail that sweeps foes and can deal slashing damage.", "Un mangual kholo pesado que barre enemigos y puede causar daño cortante.", "Avançada", "1d12", "Impacto (Cn)", 0, "2 PO", 2, ["Amplitude", "Kholo", "Versátil Ct"]],
  ["weapon.thunder_sling", "Funda-Trovão", "Thunder Sling", "Honda atronadora", "Funda tengu marcial que dispara dardos com maior alcance e força.", "A martial tengu sling that launches darts with greater range and force.", "Una honda tengu marcial que lanza dardos con mayor alcance y fuerza.", "Marcial", "1d6", "Perfuração (Pf)", 0, "5 PO", "L", ["Ágil", "Propulsiva", "Tengu"]],
  ["weapon.daikyu", "Daikyu", "Daikyu", "Daikyu", "Arco avançado assimétrico, especialmente adequado para combate montado.", "An advanced asymmetrical bow especially suited to mounted combat.", "Un arco avanzado asimétrico especialmente adecuado para el combate montado.", "Avançada", "1d8", "Perfuração (Pf)", 0, "8 PO", 2, ["Enérgica", "Propulsiva"]]
].map(([id, pt, en, es, ptSummary, enSummary, esSummary, category, damage, damageType, level, price, bulk, traits]) => ({
  id,
  name: `${pt} (${en})`,
  category,
  damage,
  damageType,
  level,
  price,
  bulk,
  traits,
  names: { "pt-BR": pt, en, es },
  summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
  source: { book: PLAYER_CORE_2_SOURCE, page: 275 },
  ruleset: "remaster",
  needs_review: false
}));
for (const weapon of playerCore2Weapons) {
  if (!(PF2E_DATA.weapons || []).some((candidate) => candidate.id === weapon.id)) PF2E_DATA.weapons.push(weapon);
}

const PLAYER_CORE_2_ARCHETYPE_METADATA = {
  "Acrobata (Acrobat)": ["archetype.acrobat", "Acrobata", "Acrobat", "Acróbata", 184],
  "Arqueiro (Archer)": ["archetype.archer", "Arqueiro", "Archer", "Arquero", 186],
  "Duelista (Duelist)": ["archetype.duelist", "Duelista", "Duelist", "Duelista", 201],
  "Marechal (Marshal)": ["archetype.marshal", "Marechal", "Marshal", "Mariscal", 210],
  "Médico de Batalha (Medic)": ["archetype.medic", "Médico", "Medic", "Médico", 212],
  "Cavaleiro (Cavalier)": ["archetype.cavalier", "Cavaleiro", "Cavalier", "Caballero", 195],
  "Sentinela (Sentinel)": ["archetype.sentinel", "Sentinela", "Sentinel", "Centinela", 218],
  "Lutador (Wrestler)": ["archetype.wrestler", "Lutador de luta livre", "Wrestler", "Luchador", 207],
  "Mestre de Rituais (Ritualist)": ["archetype.ritualist", "Ritualista", "Ritualist", "Ritualista", 217],
  "Dedicação: Alquimista": ["archetype.alchemist_multiclass", "Dedicação: Alquimista", "Alchemist Dedication", "Dedicación de alquimista", 175],
  "Dedicação: Bárbaro": ["archetype.barbarian_multiclass", "Dedicação: Bárbaro", "Barbarian Dedication", "Dedicación de bárbaro", 176],
  "Dedicação: Campeão": ["archetype.champion_multiclass", "Dedicação: Campeão", "Champion Dedication", "Dedicación de campeón", 177],
  "Dedicação: Monge": ["archetype.monk_multiclass", "Dedicação: Monge", "Monk Dedication", "Dedicación de monje", 179],
  "Dedicação: Oráculo": ["archetype.oracle_multiclass", "Dedicação: Oráculo", "Oracle Dedication", "Dedicación de oráculo", 180],
  "Dedicação: Feiticeiro": ["archetype.sorcerer_multiclass", "Dedicação: Feiticeiro", "Sorcerer Dedication", "Dedicación de hechicero", 181],
  "Dedicação: Espadachim": ["archetype.swashbuckler_multiclass", "Dedicação: Espadachim", "Swashbuckler Dedication", "Dedicación de espadachín", 182]
};
Object.entries(PLAYER_CORE_2_ARCHETYPE_METADATA).forEach(([legacyName, [id, pt, en, es, page]]) => {
  const record = (PF2E_DATA.archetypes || []).find((archetype) => archetype.name === legacyName);
  if (!record) return;
  Object.assign(record, {
    id,
    names: { "pt-BR": pt, en, es },
    summaries: localizedEquipmentSummary(
      record.description || `Arquétipo ${pt}.`,
      `Player Core 2 archetype: ${en}.`,
      `Arquetipo de Player Core 2: ${es}.`
    ),
    source: { book: PLAYER_CORE_2_SOURCE, page },
    ruleset: "remaster",
    needs_review: false
  });
});

// Player Core 2, pp. 195–196: talentos do arquétipo Cavaleiro.
// Os efeitos completos ficam preservados no texto-resumo e os requisitos
// estruturais são usados pelo validador contextual antes da seleção.
const PLAYER_CORE_2_CAVALIER_FEATS = [
  ["cavalier_dedication", "Dedicação de Cavaleiro", "Cavalier Dedication", "Dedicación de caballero", 2, "Treinado em Natureza ou Sociedade", "Adquire um companheiro animal jovem que serve como sua montaria; ele deve ser pelo menos um tamanho maior que você."],
  ["knights_banner", "Estandarte do Cavaleiro", "Knight's Banner", "Estandarte del caballero", 4, "Dedicação de Cavaleiro; juramento a uma organização ou ideal", "Ergue o estandarte do juramento na montaria e inspira aliados próximos contra efeitos de medo."],
  ["knights_charge", "Investida do Cavaleiro", "Knight's Charge", "Carga del caballero", 4, "Dedicação de Cavaleiro", "Comanda a montaria para Andar duas vezes e realiza um Golpe durante o movimento."],
  ["rapid_mount", "Montar Rapidamente", "Rapid Mount", "Montar rápidamente", 4, "Dedicação de Cavaleiro; especialista em Natureza", "Monta uma criatura disposta e ordena uma ação com Comandar um Animal."],
  ["impressive_mount", "Montaria Impressionante", "Impressive Mount", "Montura impresionante", 4, "Dedicação de Cavaleiro", "A montaria se torna um companheiro animal maduro e pode agir com uma ação mesmo sem ser comandada."],
  ["defend_mount", "Defender Montaria", "Defend Mount", "Defender la montura", 6, "Dedicação de Cavaleiro", "Protege a montaria usando sua própria defesa contra um ataque acionador."],
  ["mounted_shield", "Escudo Montado", "Mounted Shield", "Escudo montado", 6, "Dedicação de Cavaleiro", "Enquanto montado, compartilha o bônus do escudo com a montaria e pode Bloquear por ela."],
  ["incredible_mount", "Montaria Incrível", "Incredible Mount", "Montura increíble", 8, "Montaria Impressionante", "A montaria se torna ágil ou selvagem e recebe capacidades adicionais."],
  ["trampling_charge", "Investida Atropelante", "Trampling Charge", "Carga arrolladora", 10, "Dedicação de Cavaleiro", "A montaria avança através dos espaços de adversários e causa dano com um Golpe."],
  ["unseat", "Desselar", "Unseat", "Desmontar", 10, "Dedicação de Cavaleiro; montado e empunhando uma arma de justa", "Ataca uma criatura montada e tenta derrubá-la da montaria."],
  ["specialized_mount", "Montaria Especializada", "Specialized Mount", "Montura especializada", 14, "Montaria Incrível", "A montaria adquire uma especialização, até três vezes com especializações diferentes."],
  ["legendary_knight", "Cavaleiro Lendário", "Legendary Knight", "Caballero legendario", 20, "Dedicação de Cavaleiro", "Fica acelerado enquanto montado, usando a ação adicional apenas para comandar a montaria."],
];
const PLAYER_CORE_2_CAVALIER_SUMMARIES = {
  cavalier_dedication: { en: "Gain a young animal companion as a mount; it must be at least one size larger than you.", es: "Obtienes un compañero animal joven como montura; debe ser al menos un tamaño mayor que tú." },
  knights_banner: { en: "Raise your oath's banner on your mount and inspire nearby allies against fear effects.", es: "Alzas el estandarte de tu juramento en tu montura e inspiras a los aliados cercanos contra el miedo." },
  knights_charge: { en: "Command your mount to Stride twice and make a Strike during the movement.", es: "Ordenas a tu montura Avanzar dos veces y haces un Golpe durante el movimiento." },
  rapid_mount: { en: "Mount a willing creature and give it an order with Command an Animal.", es: "Montas una criatura dispuesta y le das una orden con Comandar un animal." },
  impressive_mount: { en: "Your mount becomes a mature animal companion and can act with one action even when not commanded.", es: "Tu montura se vuelve un compañero animal maduro y puede actuar con una acción aunque no sea comandada." },
  defend_mount: { en: "Protect your mount by using your own defense against the triggering attack.", es: "Proteges a tu montura usando tu propia defensa contra el ataque desencadenante." },
  mounted_shield: { en: "While mounted, share your shield bonus with your mount and Shield Block for it.", es: "Mientras estás montado, compartes el bonificador del escudo con tu montura y puedes Bloquear con él." },
  incredible_mount: { en: "Your mount becomes nimble or savage and gains additional capabilities.", es: "Tu montura se vuelve ágil o salvaje y obtiene capacidades adicionales." },
  trampling_charge: { en: "Your mount moves through opponents' spaces and deals damage with a Strike.", es: "Tu montura atraviesa los espacios de los enemigos y causa daño con un Golpe." },
  unseat: { en: "Attack a mounted creature and attempt to knock it from its mount.", es: "Atacas a una criatura montada e intentas derribarla de su montura." },
  specialized_mount: { en: "Your mount gains a specialization, up to three times with different specializations.", es: "Tu montura obtiene una especialización, hasta tres veces con especializaciones distintas." },
  legendary_knight: { en: "While mounted, become quickened and use the extra action only to Command your mount.", es: "Mientras estás montado, quedas acelerado y solo puedes usar la acción adicional para Comandar tu montura." },
};
for (const [slug, pt, en, es, level, prereq, summary] of PLAYER_CORE_2_CAVALIER_FEATS) {
  const id = `feat.archetype.cavalier.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": summary,
      en: PLAYER_CORE_2_CAVALIER_SUMMARIES[slug].en,
      es: PLAYER_CORE_2_CAVALIER_SUMMARIES[slug].es,
    },
    description: summary,
    category: "Arquétipo",
    type: "Talento",
    level,
    archetypeId: "archetype.cavalier",
    prerequisites: [prereq],
    traits: ["Arquétipo"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 6 ? 195 : 196 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: false,
    rarity: "common",
  });
}

// Player Core 2, pp. 10–11: talentos de ancestralidade de Amurrun.
// Os nomes, níveis e pré-requisitos visíveis no PDF local são preservados;
// os efeitos completos permanecem em revisão até a conferência individual.
const PLAYER_CORE_2_AMURRUN_FEATS = [
  ["danca_do_povo_felino", "Dança do Povo-Felino", "Catfolk Dance", "Danza del pueblo felino", 1, "", "Uma manobra acrobática que desequilibra uma criatura adjacente."],
  ["dentes_de_sabre", "Dentes-de-Sabre", "Saberteeth", "Dientes de sable", 1, "", "Você possui mandíbulas desarmadas que causam 1d6 de dano perfurante."],
  ["familiaridade_armas_amurruni", "Familiaridade com Armas Amurruni", "Amurrun Weapon Familiarity", "Familiaridad con armas amurrun", 1, "", "Você recebe familiaridade com armas amurruni e um grupo de armas associado."],
  ["saber_amurruni", "Saber Amurruni", "Amurrun Lore", "Saber amurrun", 1, "", "Você se torna treinado em Acrobatismo, Sobrevivência e Saber de Amurrun."],
  ["soneca_de_gato", "Soneca de Gato", "Cat Nap", "Siesta felina", 1, "", "Uma soneca de dez minutos concede Pontos de Vida temporários por uma hora."],
  ["sorte_de_gato", "Sorte de Gato", "Cat's Luck", "Suerte felina", 1, "", "Você pode rejogar um salvamento de Reflexos uma vez por dia."],
  ["viajante_bem_recebido", "Viajante Bem-Recebido", "Well-Met Traveler", "Viajero bien recibido", 1, "", "Você se torna treinado em Diplomacia e pode substituir uma perícia já concedida."],
  ["bem_cuidado", "Bem-Cuidado", "Well-Groomed", "Bien aseado", 5, "", "Você recebe proteção adicional contra doenças."],
  ["cacador_orgulhoso", "Caçador Orgulhoso", "Proud Hunter", "Cazador orgulloso", 5, "", "Você pode usar a cobertura menor de aliados para se Esconder."],
  ["garras_de_escalada", "Garras de Escalada", "Climbing Claws", "Garras trepadoras", 5, "", "Você adquire uma Velocidade de escalada de 3 metros."],
  ["orientacao_graciosa", "Orientação Graciosa", "Graceful Guidance", "Guía grácil", 5, "", "Você pode Auxiliar um aliado em um salvamento de Reflexos."],
  ["patas_leves", "Patas Leves", "Light Paws", "Patas ligeras", 5, "", "Você atravessa obstruções ignorando terreno difícil durante o movimento."],
  ["saltador_nato", "Saltador Nato", "Natural Jumper", "Saltador nato", 5, "Especialista em Atletismo", "Você dobra ou triplica a distância de seus saltos verticais."],
  ["sorte_grande", "Sorte Grande", "Big Cat's Luck", "Gran suerte felina", 5, "Sorte de Gato", "Você pode aplicar Sorte de Gato a mais salvamentos e testes de perícia."],
  ["arranhao_agravante", "Arranhão Agravante", "Aggravating Scratch", "Arañazo agravante", 9, "Ataque desarmado de garra", "Seus acertos críticos com garras causam dano persistente de veneno."],
  ["espreitador_prudente", "Espreitador Prudente", "Cautious Sneak", "Merodeador prudente", 9, "", "Você pode Patrulhar e Evitar Ser Percebido simultaneamente."],
  ["evadir_condenacao", "Evadir Condenação", "Evade Doom", "Evitar la condena", 9, "", "Você pode evitar adquirir a condição condenado após um teste simples."],
  ["passo_silencioso", "Passo Silencioso", "Silent Step", "Paso silencioso", 9, "", "Você Dá um Passo e depois se Esconde ou Esgueira-se."],
  ["rosnado_do_predador", "Rosnado do Predador", "Predator's Growl", "Gruñido del depredador", 9, "Especialista em Intimidação", "Você pode Desmoralizar uma criatura recém-encontrada sem compartilhar idioma."],
  ["sorte_do_bando", "Sorte do Bando", "Pride's Luck", "Suerte de la manada", 9, "Sorte de Gato", "Aliados próximos que falharam contra o mesmo efeito também podem rejogar."],
  ["maldicao_do_gato_preto", "Maldição do Gato Preto", "Black Cat Curse", "Maldición del gato negro", 13, "", "Uma criatura próxima rejoga um salvamento bem-sucedido e usa o pior resultado."],
  ["miado", "Miado", "Meow", "Maullido", 13, "", "Seu miado transmite uma emoção mental e auditiva com efeito sobrenatural."],
  ["dez_vidas", "Dez Vidas", "Nine Lives", "Nueve vidas", 17, "Evadir Condenação", "Você pode reduzir o valor de morrendo quando um efeito fosse matá-lo."],
  ["evitar_problemas", "Evitar Problemas", "Avoid Trouble", "Evitar problemas", 17, "", "Você Anda até sua Velocidade quando uma criatura erra um ataque corpo a corpo contra você."],
  ["sorte_confiavel", "Sorte Confiável", "Reliable Luck", "Suerte fiable", 17, "Sorte de Gato", "Você pode usar Sorte de Gato uma vez por hora em vez de uma vez por dia."],
];
for (const [slug, pt, en, es, level, prereq, summary] of PLAYER_CORE_2_AMURRUN_FEATS) {
  const id = `feat.ancestry.amurrun.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const page = level >= 13 || (level === 9 && ["evadir_condenacao", "passo_silencioso", "rosnado_do_predador", "sorte_do_bando"].includes(slug)) ? 11 : 10;
  const prerequisiteList = prereq ? [prereq] : [];
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `${summary} Efeito completo pendente de revisão.`,
      en: `Amurrun ancestry feat; full effect pending review.`,
      es: `Dote de ascendencia amurrun; el efecto completo queda pendiente de revisión.`
    },
    description: summary,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Amurrun",
    prerequisites: prerequisiteList,
    traits: ["Ancestralidade", "Amurrun"],
    source: { book: PLAYER_CORE_2_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 14–15: talentos de ancestralidade de Hobgoblin.
const PLAYER_CORE_2_HOBGOBLIN_FEATS = [
  ["acoite_impiedoso", "Açoite Impiedoso", "Cruel Lash", "Azote despiadado", 1, ""],
  ["captura_sanguessuga", "Captura-Sanguessuga", "Leech Capture", "Captura de desertores", 1, ""],
  ["estudioso_alquimico", "Estudioso Alquímico", "Alchemical Scholar", "Erudito alquímico", 1, ""],
  ["familiaridade_armas_hobgoblinicas", "Familiaridade com Armas Hobgoblínicas", "Hobgoblin Weapon Familiarity", "Familiaridad con armas hobgoblin", 1, ""],
  ["reforco_cantoriano", "Reforço Cantoriano", "Cantorian Reinforcement", "Refuerzo cantoriano", 1, ""],
  ["rosto_de_pedra", "Rosto de Pedra", "Stone Face", "Rostro de piedra", 1, ""],
  ["saber_hobgoblino", "Saber Hobgoblino", "Hobgoblin Lore", "Saber hobgoblin", 1, ""],
  ["saude_vigorosa", "Saúde Vigorosa", "Vigorous Health", "Salud vigorosa", 1, ""],
  ["sorrateiro", "Sorrateiro", "Sneaky", "Escurridizo", 1, ""],
  ["goblinarca_sabio", "Goblinarca Sábio", "Wise Goblin", "Goblin sabio", 5, ""],
  ["reconhecer_emboscada", "Reconhecer Emboscada", "Recognize Ambush", "Reconocer emboscada", 5, ""],
  ["repreensao_agonizante", "Repreensão Agonizante", "Agonizing Rebuke", "Reprimenda agonizante", 5, ""],
  ["sargento_instrutor_especialista", "Sargento Instrutor Especialista", "Expert Drill Sergeant", "Sargento instructor experto", 5, ""],
  ["cavaleiro_perverso", "Cavaleiro Perverso", "Vicious Rider", "Jinete despiadado", 9, "Companheiro animal"],
  ["orgulho_em_armas", "Orgulho em Armas", "Arms Pride", "Orgullo de las armas", 9, ""],
  ["rejuvenescimento_cantoriano", "Rejuvenescimento Cantoriano", "Cantorian Rejuvenation", "Rejuvenecimiento cantoriano", 9, ""],
  ["taticas_de_esquadrao", "Táticas de Esquadrão", "Squad Tactics", "Tácticas de escuadrón", 9, ""],
  ["condicionamento_de_guerra", "Condicionamento de Guerra", "War Conditioning", "Acondicionamiento bélico", 13, ""],
  ["nao_vai_cair_aqui", "Não Vai Cair Aqui", "Not On My Watch", "No bajo mi guardia", 13, ""],
  ["grito_de_incentivo", "Grito de Incentivo", "Rallying Cry", "Grito de aliento", 17, ""],
  ["restauracao_cantoriana", "Restauração Cantoriana", "Cantorian Restoration", "Restauración cantoriana", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_HOBGOBLIN_FEATS) {
  const id = `feat.ancestry.hobgoblin.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade hobgoblin; efeito completo pendente de revisão.",
      en: "Hobgoblin ancestry feat; full effect pending review.",
      es: "Dote de ascendencia hobgoblin; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade hobgoblin: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Hobgoblin",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Hobgoblin"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 15 : 14 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 18–19: talentos de ancestralidade de Iruxi.
const PLAYER_CORE_2_IRUXI_FEATS = [
  ["armamentos_iruxitas", "Armamentos Iruxitas", "Iruxi Armaments", "Armamentos iruxi", 1, ""],
  ["corredor_pantanoso", "Corredor Pantanoso", "Marsh Runner", "Corredor de pantanos", 1, "Você tem uma Velocidade de natação"],
  ["elocucionista_de_repteis", "Elocucionista de Répteis", "Reptile Speaker", "Orador de reptiles", 1, ""],
  ["filhote_partenogenico", "Filhote Partenogênico", "Parthenogenic Child", "Cría partenogénica", 1, ""],
  ["magia_dos_ossos", "Magia dos Ossos", "Bone Magic", "Magia de los huesos", 1, ""],
  ["saber_iruxita", "Saber Iruxita", "Iruxi Lore", "Saber iruxi", 1, ""],
  ["aderencia_de_lagarto", "Aderência de Lagarto", "Lizard Grip", "Agarre de lagarto", 5, ""],
  ["cauda_flexivel", "Cauda Flexível", "Flexible Tail", "Cola flexible", 5, ""],
  ["envenenar_presas", "Envenenar Presas", "Poison Fangs", "Colmillos venenosos", 5, "Armamentos Iruxitas (Presas)"],
  ["nadador_agil", "Nadador Ágil", "Agile Swimmer", "Nadador ágil", 5, ""],
  ["soltar_a_cauda", "Soltar a Cauda", "Shed Tail", "Soltar la cola", 5, "Armamentos Iruxitas (Cauda)"],
  ["afiar_as_garras", "Afiar as Garras", "Sharpen Claws", "Afilar las garras", 9, "Armamentos Iruxitas (Garras)"],
  ["pendular", "Pêndulo", "Hang", "Colgarse", 9, ""],
  ["vantagem_de_terreno", "Vantagem de Terreno", "Terrain Advantage", "Ventaja del terreno", 9, ""],
  ["agressao_primal", "Agressão Primal", "Primal Assault", "Agresión primigenia", 13, ""],
  ["empossar_ossos", "Empossar Ossos", "Possess Bones", "Poseer huesos", 13, "Magia dos Ossos"],
  ["golpe_espiritual_iruxita", "Golpe Espiritual Iruxita", "Iruxi Spirit Strike", "Golpe espiritual iruxi", 13, ""],
  ["casca_de_fossil", "Casca de Fóssil", "Fossilized Skin", "Piel fosilizada", 17, "Magia dos Ossos"],
  ["transformacao_do_descendente", "Transformação do Descendente", "Descendant's Transformation", "Transformación del descendiente", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_IRUXI_FEATS) {
  const id = `feat.ancestry.iruxi.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade iruxi; efeito completo pendente de revisão.",
      en: "Iruxi ancestry feat; full effect pending review.",
      es: "Dote de ascendencia iruxi; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade iruxi: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Iruxi",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Iruxi"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 13 ? 19 : 18 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 22–23: talentos de ancestralidade de Kholo.
const PLAYER_CORE_2_KHOLO_FEATS = [
  ["cacador_de_bando", "Caçador de Bando", "Pack Hunter", "Cazador de manada", 1, ""],
  ["familiar_hiena", "Familiar Hiena", "Hyena Familiar", "Familiar hiena", 1, ""],
  ["familiaridade_armas_kholoanas", "Familiaridade com Armas Kholoanas", "Kholo Weapon Familiarity", "Familiaridad con armas kholo", 1, ""],
  ["nariz_sensivel", "Nariz Sensível", "Sensitive Nose", "Nariz sensible", 1, ""],
  ["perguntar_aos_ossos", "Perguntar aos Ossos", "Ask the Bones", "Preguntar a los huesos", 1, ""],
  ["saber_kholoano", "Saber Kholoano", "Kholo Lore", "Saber kholo", 1, ""],
  ["triturar", "Triturar", "Crunch", "Triturar", 1, ""],
  ["absorver_forca", "Absorver Força", "Absorb Strength", "Absorber fuerza", 5, ""],
  ["corrida_raivosa", "Corrida Raivosa", "Raging Sprint", "Carrera furiosa", 5, "Herança Kholo Canídeo"],
  ["espreitador_de_bando", "Espreitador de Bando", "Pack Stalker", "Merodeador de manada", 5, "Especialista em Furtividade"],
  ["gargalhada_distante", "Gargalhada Distante", "Distant Laugh", "Risa distante", 5, "Herança Kholo Bruxo"],
  ["resistencia_a_aflicao", "Resistência a Aflição", "Affliction Resistance", "Resistencia a las aflicciones", 5, ""],
  ["sangue_da_mao_direita", "Sangue da Mão Direita", "Right-Hand Blood", "Sangre de la mano derecha", 5, ""],
  ["sangue_da_mao_esquerda", "Sangue da Mão Esquerda", "Left-Hand Blood", "Sangre de la mano izquierda", 5, ""],
  ["cacador_de_emboscada", "Caçador de Emboscada", "Ambush Hunter", "Cazador de emboscadas", 9, ""],
  ["halito_de_mel", "Hálito de Mel", "Honeyed Breath", "Aliento de miel", 9, "Herança Kholo Docehálito"],
  ["kholo_risonho", "Kholo Risonho", "Laughing Kholo", "Kholo risueño", 9, "Mestre em Intimidação"],
  ["sabedoria_da_avo", "Sabedoria da Avó", "Grandmother's Wisdom", "Sabiduría de la abuela", 9, ""],
  ["ira_do_ancestral", "Ira do Ancestral", "Ancestor's Wrath", "Ira del ancestro", 13, ""],
  ["ruina_do_zelaossos", "Ruína do Zelaossos", "Bonekeeper's Ruin", "Ruina del guardahuesos", 13, ""],
  ["gargalhada_lendaria", "Gargalhada Lendária", "Legendary Laugh", "Risa legendaria", 17, "Kholo Risonho"],
  ["osso_empalador", "Osso Empalador", "Impaling Bone", "Hueso empalador", 17, ""],
  ["primeiro_a_atacar_primeiro_a_cair", "Primeiro a Atacar, Primeiro a Cair", "First to Strike, First to Fall", "Primero en golpear, primero en caer", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_KHOLO_FEATS) {
  const id = `feat.ancestry.kholo.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade kholo; efeito completo pendente de revisão.",
      en: "Kholo ancestry feat; full effect pending review.",
      es: "Dote de ascendencia kholo; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade kholo: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Kholo",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Kholo"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 23 : 22 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 26–27: talentos de ancestralidade de Kobold.
const PLAYER_CORE_2_KOBOLD_FEATS = [
  ["acanhamento", "Acanhamento", "Shrug Off", "Encogerse", 1, ""],
  ["armador_de_arapuca", "Armador de Arapuca", "Snarecrafter", "Artesano de trampas", 1, "Treinado em Manufatura"],
  ["desembestar", "Desembestar", "Dash Aside", "Apartarse", 1, ""],
  ["familiaridade_armas_koboldinas", "Familiaridade com Armas Koboldinas", "Kobold Weapon Familiarity", "Familiaridad con armas kobold", 1, ""],
  ["presenca_draconica", "Presença Dracônica", "Draconic Presence", "Presencia dracónica", 1, "Herança Kobold Dracoescama"],
  ["saber_koboldino", "Saber Koboldino", "Kobold Lore", "Saber kobold", 1, ""],
  ["acolhimento", "Acolhimento", "Follow the Crowd", "Acogida", 5, ""],
  ["asinhas", "Asinhas", "Winglets", "Alitas", 5, ""],
  ["genio_da_arapuca", "Gênio da Arapuca", "Snare Genius", "Genio de las trampas", 5, "Especialista em Manufatura; Manufatura de Arapucas"],
  ["implorar", "Implorar", "Beg", "Suplicar", 5, "Treinado em Dissimulação"],
  ["bem_de_perto", "Bem de Perto", "Up Close", "De cerca", 9, ""],
  ["entre_as_escamas", "Entre as Escamas", "Between the Scales", "Entre las escamas", 9, ""],
  ["grito_de_fuga", "Grito de Fuga", "Fleeing Cry", "Grito de huida", 9, ""],
  ["lutador_de_arbusto", "Lutador de Arbusto", "Bushwhacker", "Luchador de matorral", 9, ""],
  ["magicornio_evoluido", "Magicórnio Evoluído", "Evolved Kobold", "Kobold evolucionado", 9, "Herança Kobold Magicórnio"],
  ["voo_com_asinhas", "Voo com Asinhas", "Winged Flight", "Vuelo con alitas", 9, "Asinhas"],
  ["arapucas_perversas", "Arapucas Perversas", "Vicious Snares", "Trampas perversas", 13, ""],
  ["distracao_acrobatica", "Distração Acrobática", "Acrobatic Distraction", "Distracción acrobática", 13, "Especialista em Acrobatismo e Dissimulação"],
  ["magicornio_resplandecente", "Magicórnio Resplandecente", "Shining Kobold", "Kobold resplandeciente", 13, "Magicórnio Evoluído"],
  ["grandiosidade_do_benfeitor", "Grandiosidade do Benfeitor", "Benefactor's Grandeur", "Grandeza del benefactor", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_KOBOLD_FEATS) {
  const id = `feat.ancestry.kobold.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade kobold; efeito completo pendente de revisão.",
      en: "Kobold ancestry feat; full effect pending review.",
      es: "Dote de ascendencia kobold; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade kobold: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Kobold",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Kobold"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 27 : 26 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 30–31: talentos de ancestralidade de Tengu.
const PLAYER_CORE_2_TENGU_FEATS = [
  ["acoite_da_tempestade", "Açoite da Tempestade", "Storm's Lash", "Azote de la tormenta", 1, ""],
  ["agilidade_excepcional", "Agilidade Excepcional", "Uncanny Agility", "Agilidad excepcional", 1, ""],
  ["crocitar", "Crocitar", "Squawk", "Graznido", 1, ""],
  ["familiaridade_com_armas_tengu", "Familiaridade com Armas Tengu", "Tengu Weapon Familiarity", "Familiaridad con armas tengu", 1, ""],
  ["fogo_de_marinheiro", "Fogo de Marinheiro", "Sailor's Fire", "Fuego de marinero", 1, ""],
  ["procura_do_catador", "Procura do Catador", "Scavenger's Search", "Búsqueda del carroñero", 1, ""],
  ["saber_tengu", "Saber Tengu", "Tengu Lore", "Saber tengu", 1, ""],
  ["saltitar_sobre_um_dedo", "Saltitar sobre um Dedo", "Hop on One Finger", "Saltar sobre un dedo", 1, ""],
  ["comer_destino", "Comer Destino", "Eat Fortune", "Comer destino", 5, ""],
  ["forma_de_nariz_comprido", "Forma de Nariz Comprido", "Long-Nosed Form", "Forma de nariz largo", 5, ""],
  ["leque_de_penas", "Leque de Penas", "Feather Fan", "Abanico de plumas", 5, ""],
  ["roubo_da_gralha", "Roubo da Gralha", "Jackdaw Scrounger", "Robo de la graja", 5, ""],
  ["voo_altaneiro", "Voo Altaneiro", "Soaring Flight", "Vuelo elevado", 5, "Herança de Tengu Celestino"],
  ["forma_altaneira", "Forma Altaneira", "Soaring Form", "Forma elevada", 9, "Voo Altaneiro"],
  ["leque_do_deus_do_vento", "Leque do Deus do Vento", "Wind God's Fan", "Abanico del dios del viento", 9, "Leque de Penas"],
  ["garra_do_arauto", "Garra do Arauto", "Harbinger's Talon", "Garra del heraldo", 13, ""],
  ["glutao_de_agouros", "Glutão de Agouros", "Omen Eater", "Devorador de presagios", 13, "Comer Destino"],
  ["leque_do_deus_do_trovao", "Leque do Deus do Trovão", "Thunder God's Fan", "Abanico del dios del trueno", 13, "Leque de Penas"],
  ["forma_do_grande_tengu", "Forma do Grande Tengu", "Great Tengu Form", "Forma del gran tengu", 17, "Forma de Nariz Comprido"],
  ["tengu_enganador", "Tengu Enganador", "Trickster Tengu", "Tengu embaucador", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_TENGU_FEATS) {
  const id = `feat.ancestry.tengu.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade tengu; efeito completo pendente de revisão.",
      en: "Tengu ancestry feat; full effect pending review.",
      es: "Dote de ascendencia tengu; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade tengu: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Tengu",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Tengu"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 31 : 30 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 33–35: talentos de ancestralidade de Tripkee.
const PLAYER_CORE_2_TRIPKEE_FEATS = [
  ["andarilho_da_selva", "Andarilho da Selva", "Jungle Strider", "Caminante de la jungla", 1, ""],
  ["coaxar_aterrorizante", "Coaxar Aterrorizante", "Terrifying Croak", "Croar aterrador", 1, "Treinado em Intimidação"],
  ["croaxador", "Croaxador", "Croaker", "Croador", 1, ""],
  ["defesa_do_cacador", "Defesa do Caçador", "Hunter's Defense", "Defensa del cazador", 1, "Treinado em Natureza"],
  ["familiaridade_armas_tripkeenas", "Familiaridade com Armas Tripkeen", "Tripkee Weapon Familiarity", "Familiaridad con armas tripkee", 1, ""],
  ["saber_tripkeeno", "Saber Tripkeeno", "Tripkee Lore", "Saber tripkee", 1, ""],
  ["tripkee_noturno", "Tripkee Noturno", "Night Tripkee", "Tripkee nocturno", 1, ""],
  ["escalador_prodigio", "Escalador Prodígio", "Prodigious Climber", "Escalador prodigioso", 5, ""],
  ["expelir_estomago", "Expelir Estômago", "Eject Toxin", "Expulsar el estómago", 5, ""],
  ["lingua_longa", "Língua Longa", "Long Tongue", "Lengua larga", 5, "Herança Tripkee Línguaveloz"],
  ["rede_resiliente", "Rede Resiliente", "Resilient Net", "Red resistente", 5, ""],
  ["saltos_fantasticos", "Saltos Fantásticos", "Fantastic Leap", "Saltos fantásticos", 5, ""],
  ["tripkee_planador", "Tripkee Planador", "Gliding Tripkee", "Tripkee planeador", 5, "Herança Tripkee Flutuante"],
  ["absorver_toxinas", "Absorver Toxinas", "Absorb Toxins", "Absorber toxinas", 9, "Você não é imune a doenças ou venenos"],
  ["lingua_fixante", "Língua Fixante", "Grasping Tongue", "Lengua prensil", 9, "Tripkee Língua Longa"],
  ["salto_ricochete", "Salto Ricochete", "Ricochet Leap", "Salto de rebote", 9, "Salto na Parede"],
  ["umectacao", "Umectação", "Moisture", "Humectación", 9, ""],
  ["extremidades_envenenadas", "Extremidades Envenenadas", "Poisonous Extremities", "Extremidades venenosas", 13, ""],
  ["levantar_de_imediato", "Levantar de Imediato", "Instant Up", "Levantarse de inmediato", 13, ""],
  ["saltador_imbativel", "Saltador Imbatível", "Unbeatable Jumper", "Saltador imbatible", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_TRIPKEE_FEATS) {
  const id = `feat.ancestry.tripkee.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade tripkee; efeito completo pendente de revisão.",
      en: "Tripkee ancestry feat; full effect pending review.",
      es: "Dote de ascendencia tripkee; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade tripkee: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Tripkee",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Tripkee"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 35 : level >= 5 ? 34 : 33 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 38–39: talentos de ancestralidade de Ysoki.
const PLAYER_CORE_2_YSOKI_FEATS = [
  ["bolsa_jugal", "Bolsa-Jugal", "Cheek Pouches", "Bolsas de las mejillas", 1, ""],
  ["dedos_de_funileiro", "Dedos de Funileiro", "Tinkerer's Fingers", "Dedos de hojalatero", 1, ""],
  ["familiar_rato", "Familiar Rato", "Rat Familiar", "Familiar rata", 1, ""],
  ["incisivos_afiados", "Incisivos Afiados", "Sharp Fangs", "Incisivos afilados", 1, ""],
  ["linguagem_muridea", "Linguagem Murídea", "Rodent Speaker", "Habla roedora", 1, ""],
  ["navegador_de_tocas", "Navegador de Tocas", "Burrower", "Navegante de madrigueras", 1, ""],
  ["rato_de_caravana", "Rato de Caravana", "Pack Rat", "Rata de caravana", 1, ""],
  ["saber_ysokiano", "Saber Ysokiano", "Ysoki Lore", "Saber ysoki", 1, ""],
  ["armazenar_rapidamente", "Armazenar Rapidamente", "Quick Stow", "Guardar rápidamente", 5, "Bolsa-Jugal"],
  ["furor_encurralado", "Furor Encurralado", "Cornered Fury", "Furia acorralada", 5, ""],
  ["magia_de_rato", "Magia de Rato", "Rat Magic", "Magia de rata", 5, ""],
  ["rato_de_laboratorio", "Rato de Laboratório", "Lab Rat", "Rata de laboratorio", 5, ""],
  ["rolamento_ysokiano", "Rolamento Ysokiano", "Ysoki Roll", "Rodamiento ysoki", 5, ""],
  ["aglomerar", "Aglomerar", "Pack Together", "Amontonarse", 9, ""],
  ["boca_grande", "Boca Grande", "Big Mouth", "Boca grande", 9, "Bolsa-Jugal"],
  ["bolsa_jugal_excepcional", "Bolsa-Jugal Excepcional", "Exceptional Cheek Pouches", "Bolsas de mejillas excepcionales", 9, ""],
  ["forma_de_rato", "Forma de Rato", "Rat Form", "Forma de rata", 9, ""],
  ["escavador_de_tocas", "Escavador de Tocas", "Tunnel Digging", "Excavador de madrigueras", 13, ""],
  ["esfaqueador_de_canela", "Esfaqueador de Canela", "Shin Stabber", "Puñalada en la espinilla", 13, "Aglomerar"],
  ["invocar_o_enxame", "Invocar o Enxame", "Swarming Summons", "Invocar el enjambre", 17, "Linguagem Murídea"],
  ["maior_que_a_soma", "Maior que a Soma", "Greater Than the Sum", "Mayor que la suma", 17, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_YSOKI_FEATS) {
  const id = `feat.ancestry.ysoki.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de ancestralidade ysoki; efeito completo pendente de revisão.",
      en: "Ysoki ancestry feat; full effect pending review.",
      es: "Dote de ascendencia ysoki; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de ancestralidade ysoki: ${pt}.`,
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestry: "Ysoki",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Ancestralidade", "Ysoki"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 9 ? 39 : level >= 5 ? 38 : 37 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 64–65: primeiros talentos de classe de Alquimista.
const PLAYER_CORE_2_ALCHEMIST_FEATS = [
  ["familiar_alquimico", "Familiar Alquímico", "Alchemical Familiar", "Familiar alquímico", 1, ""],
  ["frascos_tranquilizantes", "Frascos Tranquilizantes", "Soothing Vials", "Frascos tranquilizantes", 1, "Campo de pesquisa Cirurgião"],
  ["lancar_de_longe", "Lançar de Longe", "Far Lob", "Lanzamiento lejano", 1, ""],
  ["zarabatana_toxica", "Zarabatana Tóxica", "Toxic Blowgun", "Cerbatana tóxica", 1, ""],
  ["bomba_de_fumaca", "Bomba de Fumaça", "Smoke Bomb", "Bomba de humo", 2, ""],
  ["elixires_coagulantes", "Elixires Coagulantes", "Coagulant Elixirs", "Elixires coagulantes", 2, ""],
  ["improvisar_mistura", "Improvisar Mistura", "Improvise Elixir", "Improvisar mezcla", 2, ""],
  ["mutagenico_revivificante", "Mutagênico Revivificante", "Revivifying Mutagen", "Mutágeno reanimador", 2, ""],
  ["veneno_pernicioso", "Veneno Pernicioso", "Pernicious Poison", "Veneno pernicioso", 2, ""],
  ["alquimia_duradoura", "Alquimia Duradoura", "Enduring Alchemy", "Alquimia duradera", 4, ""],
  ["elixir_revigorante", "Elixir Revigorante", "Invigorating Elixir", "Elixir vigorizante", 4, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_ALCHEMIST_FEATS) {
  const id = `feat.class.alchemist.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Alquimista; efeito completo pendente de revisão.",
      en: "Alchemist class feat; full effect pending review.",
      es: "Dote de clase de alquimista; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Alquimista: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.alchemist",
    className: "Alquimista",
    prerequisites: prereq ? [prereq] : [],
    requiredResearchField: slug === "frascos_tranquilizantes" ? "chirurgeon" : undefined,
    traits: ["Classe", "Alquimista"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 4 ? 65 : 64 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 225–226: talentos gerais novos do índice de opções.
const PLAYER_CORE_2_GENERAL_FEATS = [
  ["keep_pace", "Manter o Ritmo", "Keep Pace", "Mantener el ritmo", 3, "Constituição +2"],
  ["thorough_search", "Procura Minuciosa", "Thorough Search", "Búsqueda minuciosa", 3, "Especialista em Percepção"],
  ["improvised_repair", "Reparo Improvisado", "Improvised Repair", "Reparación improvisada", 3, "Nenhum"],
  ["vigorous_health", "Saúde Vigorosa", "Vigorous Health", "Salud vigorosa", 3, "Nenhum"],
  ["enthusiastic_follower", "Seguidor Entusiástico", "Enthusiastic Follower", "Seguidor entusiasta", 7, "Duro de Matar"],
  ["deathless", "Insensível à Morte", "Deathless", "Inmune a la muerte", 7, "Mestre em Percepção"],
  ["super_taster", "Super Degustador", "Super Taster", "Superdegustador", 11, "Mestre em Percepção"],
  ["caravan_leader", "Líder de Caravana", "Caravan Leader", "Líder de caravana", 11, "Carisma +3"],
  ["a_home_in_every_port", "Um Lar em Cada Porto", "A Home in Every Port", "Un hogar en cada puerto", 19, "Nenhum"],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_GENERAL_FEATS) {
  const id = `feat.general.pc2.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento geral do Player Core 2, nível ${level}; efeito completo pendente de revisão.`,
      en: `Player Core 2 general feat, level ${level}; full effect pending review.`,
      es: `Dote general de Player Core 2, nivel ${level}; efecto completo pendiente de revisión.`,
    },
    description: `Talento geral: ${pt}.`,
    category: "Geral",
    type: "Talento",
    level,
    prerequisites: prereq === "Nenhum" ? [] : [prereq],
    prereq: prereq === "Nenhum" ? [] : [prereq],
    traits: ["Geral"],
    source: { book: PLAYER_CORE_2_SOURCE, page: 225 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

const PLAYER_CORE_2_SKILL_FEATS = [
  ["varied", "armor_assistant", "Assistente de Armadura", "Armor Assistant", "Asistente de armadura", 1, "Treinado em Atletismo ou Saber (Guerra)"],
  ["varied", "certain_identification", "Identificação Certa", "Certain Identification", "Identificación certera", 2, "Especialista em Arcanismo, Natureza, Ocultismo ou Religião"],
  ["varied", "discreet_inquiry", "Inquérito Discreto", "Discreet Inquiry", "Indagación discreta", 2, "Especialista em Dissimulação ou Diplomacia"],
  ["varied", "city_eyes", "Olhos da Cidade", "City Eyes", "Ojos de la ciudad", 2, "Treinado em Diplomacia ou Sociedade"],
  ["varied", "slippery_prey", "Presa Escorregadia", "Slippery Prey", "Presa escurridiza", 2, "Treinado em Acrobatismo ou Atletismo"],
  ["varied", "consult_the_spirits", "Consultar os Espíritos", "Consult the Spirits", "Consultar a los espíritus", 7, "Mestre em Natureza, Ocultismo ou Religião"],
  ["varied", "acrobatics_thievery", "Furto Acrobático", "Acrobatic Theft", "Hurto acrobático", 7, "Especialista em Acrobatismo e Ladroagem"],
  ["acrobatics", "acrobatics_artist", "Artista Acrobático", "Acrobatic Artist", "Artista acrobático", 1, "Treinado em Acrobatismo"],
  ["acrobatics", "acrobatics_teamwork", "Acrobatismo em Equipe", "Acrobatics Teamwork", "Acrobacias en equipo", 2, "Especialista em Acrobatismo"],
  ["acrobatics", "rolling_fall", "Cair Rolando", "Rolling Landing", "Caída rodando", 2, "Queda do Gato"],
  ["acrobatics", "aerobatic_mastery", "Maestria Aerobática", "Aerobatic Mastery", "Maestría acrobática", 7, "Mestre em Acrobatismo"],
  ["diplomacy", "cutting_comment", "Comentário Maldoso", "Cutting Comment", "Comentario mordaz", 1, "Treinado em Diplomacia"],
  ["diplomacy", "evangelize", "Evangelizar", "Evangelize", "Evangelizar", 7, "Mestre em Diplomacia"],
  ["deception", "reserve_disguise", "Disfarce Reserva", "Reserve Disguise", "Disfraz de reserva", 2, "Especialista em Dissimulação"],
  ["deception", "seed_rumors", "Semear Rumores", "Seed Rumors", "Sembrar rumores", 2, "Especialista em Dissimulação"],
  ["deception", "double_talk", "Duplo Sentido", "Double Talk", "Doble sentido", 7, "Mestre em Dissimulação"],
  ["stealth", "armored_stealth", "Furtividade Armadurada", "Armored Stealth", "Sigilo con armadura", 2, "Especialista em Furtividade"],
  ["stealth", "distinct_shadow", "Sombra Distinta", "Distinctive Shadow", "Sombra distintiva", 2, "Especialista em Furtividade"],
  ["intimidation", "terrifying_resistance", "Resistência Aterrorizante", "Terrifying Resistance", "Resistencia aterradora", 2, "Especialista em Intimidação"],
  ["thievery", "deceptive_juggling", "Malabarismo Dissimulado", "Deceptive Juggling", "Malabarismo engañoso", 2, "Treinado em Ladroagem"],
  ["crafting", "craftsman_appraisal", "Avaliação do Artesão", "Craftsman's Appraisal", "Tasación del artesano", 1, "Treinado em Manufatura"],
  ["crafting", "improvised_tool", "Ferramenta Improvisada", "Improvised Tool", "Herramienta improvisada", 1, "Treinado em Manufatura"],
  ["crafting", "trap_crafting", "Manufatura de Arapucas", "Trap Crafting", "Fabricación de trampas", 1, "Treinado em Manufatura"],
  ["crafting", "quick_attach", "Afixar Rapidamente", "Quick Attach", "Fijación rápida", 7, "Mestre em Manufatura"],
  ["crafting", "signature_crafting", "Manufatura Emblemática", "Signature Crafting", "Fabricación emblemática", 7, "Mestre em Manufatura e Manufatura Mágica"],
  ["medicine", "risky_surgery", "Cirurgia Arriscada", "Risky Surgery", "Cirugía arriesgada", 1, "Treinado em Medicina"],
  ["medicine", "inoculation", "Inoculação", "Inoculation", "Inoculación", 1, "Treinado em Medicina"],
  ["medicine", "forensic_acumen", "Perspicácia Forense", "Forensic Acumen", "Perspicacia forense", 7, "Mestre em Medicina"],
  ["nature", "swift_rider", "Cavaleiro Expresso", "Swift Rider", "Jinete veloz", 1, "Treinado em Natureza"],
  ["nature", "influence_nature", "Influenciar Natureza", "Influence Nature", "Influir en la naturaleza", 7, "Mestre em Natureza"],
  ["occultism", "deceptive_worship", "Adoração Enganosa", "Deceptive Worship", "Adoración engañosa", 1, "Treinado em Ocultismo"],
  ["occultism", "root_magic", "Magia de Raízes", "Root Magic", "Magia de raíces", 7, "Mestre em Ocultismo"],
  ["performance", "distracting_performance", "Performance Distrativa", "Distracting Performance", "Interpretación distractora", 1, "Especialista em Performance"],
  ["religion", "pilgrims_charm", "Amuleto do Peregrino", "Pilgrim's Charm", "Amuleto del peregrino", 2, "Treinado em Religião e seguidor de uma religião específica"],
  ["religion", "exhort_the_faithful", "Exortar os Fiéis", "Exhort the Faithful", "Exhortar a los fieles", 2, "Especialista em Religião"],
  ["lore", "battle_planner", "Planejador de Batalha", "Battle Planner", "Planificador de batalla", 2, "Especialista em Saber (Guerra)"],
  ["survival", "environmental_guide", "Guia Ambiental", "Environmental Guide", "Guía ambiental", 7, "Mestre em Sobrevivência"],
  ["survival", "legendary_guide", "Guia Lendário", "Legendary Guide", "Guía legendaria", 15, "Lendário em Sobrevivência"],
  ["society", "contentious_gaze", "Olhar Conteúdo", "Contentious Gaze", "Mirada perspicaz", 1, "Treinado em Sociedade"],
  ["society", "subitizing", "Subitizar", "Subitizing", "Subitizar", 1, "Treinado em Sociedade"],
  ["society", "leverage_connections", "Aproveitar Conexões", "Leverage Connections", "Aprovechar contactos", 2, "Mestre em Sociedade"],
  ["society", "underground_network", "Rede Clandestina", "Underground Network", "Red clandestina", 2, "Especialista em Sociedade"],
  ["society", "biographical_eye", "Olhar Biográfico", "Biographical Eye", "Mirada biográfica", 7, "Mestre em Sociedade"],
];
for (const [skill, slug, pt, en, es, level, prereq] of PLAYER_CORE_2_SKILL_FEATS) {
  const id = `feat.skill.pc2.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de perícia de ${skill}, nível ${level}; efeito completo pendente de revisão.`,
      en: `${skill} skill feat, level ${level}; full effect pending review.`,
      es: `Dote de habilidad de ${skill}, nivel ${level}; efecto completo pendiente de revisión.`,
    },
    description: `Talento de perícia: ${pt}.`,
    category: "Perícia",
    type: "Talento",
    level,
    skill,
    prerequisites: [prereq],
    prereq: [prereq],
    requiresDeity: slug === "pilgrims_charm",
    traits: ["Perícia"],
    source: { book: PLAYER_CORE_2_SOURCE, page: skill === "varied" ? 225 : 226 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 65–69: talentos adicionais de Alquimista identificados
// no índice e nos blocos de talentos da classe.
const PLAYER_CORE_2_ALCHEMIST_FEATS_ADDITIONAL = [
  ["bombas_direcionais", "Bombas Direcionais", "Directional Bombs", "Bombas direccionales", 6, ""],
  ["bomba_grudenta", "Bomba Grudenta", "Sticky Bomb", "Bomba pegajosa", 8, ""],
  ["elixir_revigorante_aprimorado", "Elixir Revigorante Aprimorado", "Greater Invigorating Elixir", "Elixir vigorizante mejorado", 8, ""],
  ["envenenador_certeiro", "Envenenador Certeiro", "Precise Poisoner", "Envenenador certero", 8, ""],
  ["fisico_mutante", "Físico Mutante", "Mutagenic Flesh", "Cuerpo mutagénico", 8, ""],
  ["alcance_colateral_expandido", "Alcance Colateral Expandido", "Expanded Splash", "Salpicadura ampliada", 10, "Elixir Revigorante"],
  ["bomba_lancinante", "Bomba Lancinante", "Persistent Bomb", "Bomba lacerante", 16, ""],
  ["elixir_eterno", "Elixir Eterno", "Eternal Elixir", "Elixir eterno", 16, ""],
  ["elixires_improvaveis", "Elixires Improváveis", "Improbable Elixirs", "Elixires improbables", 18, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_ALCHEMIST_FEATS_ADDITIONAL) {
  const id = `feat.class.alchemist.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Alquimista; efeito completo pendente de revisão.",
      en: "Alchemist class feat; full effect pending review.",
      es: "Dote de clase de alquimista; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Alquimista: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.alchemist",
    className: "Alquimista",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Alquimista"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level >= 16 ? 69 : level >= 10 ? 68 : level >= 8 ? 67 : 66 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 77–78: talentos iniciais de Bárbaro.
const PLAYER_CORE_2_BARBARIAN_FEATS = [
  ["arremesso_enfurecido", "Arremesso Enfurecido", "Raging Throw", "Lanzamiento furioso", 1, ""],
  ["arrogancia_draconica", "Arrogância Dracônica", "Draconic Arrogance", "Arrogancia dracónica", 1, "Instinto de Dragão"],
  ["impeto_de_adrenalina", "Ímpeto de Adrenalina", "Adrenaline Rush", "Subidón de adrenalina", 1, ""],
  ["intimidacao_enfurecida", "Intimidação Enfurecida", "Raging Intimidation", "Intimidación furiosa", 1, ""],
  ["investida_subita", "Investida Súbita", "Sudden Charge", "Carga repentina", 1, ""],
  ["momento_de_clareza", "Momento de Clareza", "Moment of Clarity", "Momento de claridad", 1, ""],
  ["visao_agucada", "Visão Aguçada", "Keen Eyes", "Vista aguda", 1, ""],
  ["faro_agucado", "Faro Aguçado", "Keen Scent", "Olfato agudo", 2, ""],
  ["finalizacao_furiosa", "Finalização Furiosa", "Furious Finish", "Remate furioso", 2, ""],
  ["golpe_intimidador", "Golpe Intimidador", "Intimidating Strike", "Golpe intimidante", 2, ""],
  ["investida_arrebentadora", "Investida Arrebentadora", "Bashing Charge", "Carga demoledora", 2, "Treinado em Atletismo"],
  ["restabelecer_se", "Restabelecer-se", "Shake It Off", "Sacudírselo", 2, ""],
  ["retomar_o_folego", "Retomar o Fôlego", "Second Wind", "Segundo aliento", 2, ""],
  ["sem_escapatoria", "Sem Escapatória", "No Escape", "Sin escapatoria", 2, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_BARBARIAN_FEATS) {
  const id = `feat.class.barbarian.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Bárbaro; efeito completo pendente de revisão.",
      en: "Barbarian class feat; full effect pending review.",
      es: "Dote de clase de bárbaro; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Bárbaro: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.barbarian",
    className: "Bárbaro",
    prerequisites: prereq ? [prereq] : [],
    requiredSubclass: slug === "arrogancia_draconica" ? ["Instinto de Dragão"] : undefined,
    traits: ["Classe", "Bárbaro"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level === 1 ? 77 : 78 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 93–95: talentos iniciais de Campeão.
const PLAYER_CORE_2_CHAMPION_FEATS = [
  ["avanco_defensivo", "Avanço Defensivo", "Defensive Advance", "Avance defensivo", 1, ""],
  ["dominio_de_divindade", "Domínio de Divindade", "Deity's Domain", "Dominio de la divinidad", 1, ""],
  ["egoismo_continuo", "Egoísmo Contínuo", "Continual Selfishness", "Egoísmo continuo", 1, "causa da profanação"],
  ["lampejo_radiante", "Lampejo Radiante", "Radiant Beam", "Destello radiante", 1, "causa de esplendor"],
  ["montaria_fiel", "Montaria Fiel", "Faithful Steed", "Montura fiel", 1, ""],
  ["oracao_desesperada", "Oração Desesperada", "Desperate Prayer", "Oración desesperada", 1, ""],
  ["passo_desimpedido", "Passo Desimpedido", "Unimpeded Step", "Paso sin impedimentos", 1, "causa da libertação"],
  ["peso_da_culpa", "Peso da Culpa", "Weight of Guilt", "Peso de la culpa", 1, "causa da redenção"],
  ["repercussoes_de_ferro", "Repercussões de Ferro", "Iron Repercussions", "Repercusiones de hierro", 1, "causa da obediência"],
  ["represalia_agil", "Represália Ágil", "Agile Retribution", "Represalia ágil", 1, "causa da justiça"],
  ["vinganca_cruel", "Vingança Cruel", "Cruel Vengeance", "Venganza cruel", 1, "causa da iniquidade"],
  ["graca_divina", "Graça Divina", "Divine Grace", "Gracia divina", 2, ""],
  ["saude_divina", "Saúde Divina", "Divine Health", "Salud divina", 2, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_CHAMPION_FEATS) {
  const id = `feat.class.champion.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Campeão; efeito completo pendente de revisão.",
      en: "Champion class feat; full effect pending review.",
      es: "Dote de clase de campeón; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Campeão: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.champion",
    className: "Campeão",
    prerequisites: prereq ? [prereq] : [],
    requiredCause: prereq && /^causa\s+d[ae]/i.test(prereq) ? prereq : undefined,
    requiresDeity: slug === "dominio_de_divindade",
    requiredSanctification: prereq && /sagrado ou profano/i.test(prereq) ? ["holy", "unholy"] : prereq && /sagrado/i.test(prereq) ? "holy" : prereq && /profano/i.test(prereq) ? "unholy" : undefined,
    prohibitedSanctification: prereq && /não ser profano/i.test(prereq) ? "unholy" : undefined,
    traits: ["Classe", "Campeão"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level === 1 ? 94 : 95 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 95–99: demais talentos de Campeão listados no capítulo.
const PLAYER_CORE_2_CHAMPION_FEATS_ADDITIONAL = [
  ["aura_de_coragem", "Aura de Coragem", "Aura of Courage", "Aura de coraje", 4, "aura de campeão, sagrado"],
  ["aura_de_desespero", "Aura de Desespero", "Aura of Despair", "Aura de desesperación", 4, "aura de campeão, profano"],
  ["crueldade", "Crueldade", "Cruelty", "Crueldad", 4, "toque do vazio"],
  ["misericordia", "Misericórdia", "Mercy", "Misericordia", 4, "imposição de mãos"],
  ["seguranca", "Segurança", "Security", "Seguridad", 4, "escudos do espírito"],
  ["cavalo_de_guerra_leal", "Cavalo de Guerra Leal", "Loyal Warhorse", "Caballo de guerra leal", 6, "Montaria Fiel"],
  ["escudo_protetor", "Escudo Protetor", "Protective Shield", "Escudo protector", 6, "Bloqueio com Escudo"],
  ["expandir_aura", "Expandir Aura", "Expand Aura", "Expandir aura", 6, "aura de campeão"],
  ["golpe_reativo", "Golpe Reativo", "Reactive Strike", "Golpe reactivo", 6, ""],
  ["punicao_divina", "Punição Divina", "Divine Smite", "Castigo divino", 6, ""],
  ["bloqueio_rapido_com_escudo", "Bloqueio Rápido com Escudo", "Quick Shield Block", "Bloqueo de escudo rápido", 8, "Bloqueio com Escudo"],
  ["crueldade_maior", "Crueldade Maior", "Greater Cruelty", "Crueldad mayor", 8, "Crueldade"],
  ["curar_montaria", "Curar Montaria", "Heal Mount", "Curar montura", 8, "Montaria Fiel, imposição de mãos"],
  ["dominio_de_divindade_avancado", "Domínio de Divindade Avançado", "Advanced Deity's Domain", "Dominio avanzado de la divinidad", 8, "Domínio de Divindade"],
  ["misericordia_maior", "Misericórdia Maior", "Greater Mercy", "Misericordia mayor", 8, "Misericórdia"],
  ["segunda_bencao", "Segunda Bênção", "Second Blessing", "Segunda bendición", 8, "Bênção do Devoto"],
  ["seguranca_maior", "Segurança Maior", "Greater Security", "Seguridad mayor", 8, "Segurança"],
  ["armamento_radiante", "Armamento Radiante", "Radiant Armament", "Armamento radiante", 10, "armamento abençoado"],
  ["avanco_espectral", "Avanço Espectral", "Spectral Advance", "Avance espectral", 10, "ligeireza abençoada"],
  ["corcel_imponente", "Corcel Imponente", "Mighty Steed", "Corcel imponente", 10, "Cavalo de Guerra Leal"],
  ["escudo_da_retribuicao", "Escudo da Retribuição", "Shield of Retribution", "Escudo de la retribución", 10, "escudo abençoado, reação de campeão, Escudo Protetor"],
  ["aura_de_fe", "Aura de Fé", "Aura of Faith", "Aura de fe", 12, "sagrado ou profano"],
  ["contragolpe_abencoado", "Contragolpe Abençoado", "Blessed Counterstrike", "Contrataque bendecido", 12, "reação de campeão que concede resistência"],
  ["foco_devotado", "Foco Devotado", "Devoted Focus", "Enfoque devoto", 12, "magias de devoção"],
  ["golpe_macabro", "Golpe Macabro", "Grim Strike", "Golpe macabro", 12, "reação de campeão que concede dano extra"],
  ["misericordia_de_aflicao", "Misericórdia de Aflição", "Mercy of Affliction", "Misericordia de aflicción", 12, "Misericórdia"],
  ["muralha_divina", "Muralha Divina", "Divine Wall", "Muro divino", 12, "empunhar um escudo"],
  ["sacrificio_do_campeao", "Sacrifício do Campeão", "Champion's Sacrifice", "Sacrificio del campeón", 12, "não ser profano"],
  ["aura_de_determinacao", "Aura de Determinação", "Aura of Determination", "Aura de determinación", 14, "aura de campeão"],
  ["aura_de_retidao", "Aura de Retidão", "Aura of Righteousness", "Aura de rectitud", 14, "aura de campeão, sagrado"],
  ["aura_de_vida", "Aura de Vida", "Aura of Life", "Aura de vida", 14, "aura de campeão"],
  ["reflexos_divinos", "Reflexos Divinos", "Divine Reflexes", "Reflejos divinos", 14, ""],
  ["escudo_da_graca", "Escudo da Graça", "Shield of Grace", "Escudo de la gracia", 16, "Escudo Protetor"],
  ["instrumento_de_fervor", "Instrumento de Fervor", "Instrument of Zeal", "Instrumento del fervor", 16, "Contragolpe Abençoado ou Golpe Retributivo"],
  ["instrumento_de_matanca", "Instrumento de Matança", "Instrument of Slaughter", "Instrumento de matanza", 16, "reação de campeão que concede dano extra"],
  ["montaria_auspiciosa", "Montaria Auspiciosa", "Blessed Steed", "Montura auspiciosa", 16, "Corcel Imponente"],
  ["misericordia_definitiva", "Misericórdia Definitiva", "Ultimate Mercy", "Misericordia definitiva", 18, "Misericórdia"],
  ["retribuicao_agil", "Retribuição Ágil", "Agile Retribution", "Retribución ágil", 18, "reação de campeão"],
  ["toque_rejuvenescedor", "Toque Rejuvenescedor", "Rejuvenating Touch", "Toque rejuvenecedor", 18, "imposição de mãos"],
  ["armamento_exemplar", "Armamento Exemplar", "Exemplar Armament", "Armamento ejemplar", 20, "armamento abençoado"],
  ["defensor_sagrado", "Defensor Sagrado", "Sacred Defender", "Defensor sagrado", 20, ""],
  ["escudeiro_exemplar", "Escudeiro Exemplar", "Exemplar Shieldbearer", "Escudero ejemplar", 20, "escudo abençoado"],
  ["ligeireza_exemplar", "Ligeireza Exemplar", "Exemplar Speed", "Velocidad ejemplar", 20, "ligeireza abençoada"],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_CHAMPION_FEATS_ADDITIONAL) {
  const id = `feat.class.champion.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Campeão; efeito completo pendente de revisão.",
      en: "Champion class feat; full effect pending review.",
      es: "Dote de clase de campeón; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Campeão: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.champion",
    className: "Campeão",
    prerequisites: prereq ? [prereq] : [],
    requiredCause: prereq && /^causa\s+d[ae]/i.test(prereq) ? prereq : undefined,
    requiresDeity: slug === "dominio_de_divindade_avancado",
    requiredSanctification: prereq && /sagrado ou profano/i.test(prereq) ? ["holy", "unholy"] : prereq && /sagrado/i.test(prereq) ? "holy" : prereq && /profano/i.test(prereq) ? "unholy" : undefined,
    prohibitedSanctification: prereq && /não ser profano/i.test(prereq) ? "unholy" : undefined,
    traits: ["Classe", "Campeão"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 4 ? 95 : level <= 6 ? 96 : level <= 10 ? 97 : level <= 14 ? 98 : 99 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 106–112: índice completo de talentos de Espadachim.
// Os cabeçalhos e níveis são confirmados no texto local; efeitos ainda
// marcados para revisão não devem ser tratados como regras completas.
const PLAYER_CORE_2_SWASHBUCKLER_FEATS = [
  ["aparada_e_riposta", "Aparada e Riposta", "Buckler Expertise", "Parada y riposta", 18, ""],
  ["aparar_extravagante", "Aparar Extravagante", "Extravagant Parry", "Parada extravagante", 1, ""],
  ["acrobacia_provocante", "Acrobacia Provocante", "Tumbling Feint", "Finta acrobática", 6, ""],
  ["acrobatar_por_tras", "Acrobatar por Trás", "Tumble Behind", "Voltereta por detrás", 2, "Treinado em Acrobacia"],
  ["aproveite_o_espetaculo", "Aproveite o Espetáculo", "Enjoy the Show", "Disfruta del espectáculo", 2, ""],
  ["atleta_extravagante", "Atleta Extravagante", "Extravagant Athlete", "Atleta extravagante", 4, "Especialista em Atletismo"],
  ["arremesso_distrativo", "Arremesso Distrativo", "Distracting Toss", "Lanzamiento distractor", 8, ""],
  ["atrevimento", "Atrevimento", "Derring-Do", "Atrevimiento", 10, ""],
  ["conduzir_a_danca", "Conduzir a Dança", "Leading Dance", "Conducir la danza", 4, "Treinado em Performance"],
  ["corrida_desleal", "Corrida Desleal", "Dirty Trick", "Carrera sucia", 4, ""],
  ["danca_com_broquel", "Dança com Broquel", "Buckler Dance", "Danza con broquel", 10, ""],
  ["defesa_elegante", "Defesa Elegante", "Elegant Buckler", "Defensa elegante", 1, ""],
  ["deflexao_do_protetor", "Deflexão do Protetor", "Guardian's Deflection", "Desvío del protector", 4, ""],
  ["depois_de_voce", "Depois de Você", "After You", "Después de ti", 2, ""],
  ["enganar_a_morte", "Enganar a Morte", "Cheat Death", "Engañar a la muerte", 12, ""],
  ["equilibrar_as_coisas", "Equilibrar as Coisas", "Keep It Up", "Mantener el equilibrio", 4, ""],
  ["esquiva_vistosa", "Esquiva Vistosa", "Nimble Dodge", "Esquiva vistosa", 1, ""],
  ["fascinio_focado", "Fascínio Focado", "Focused Fascination", "Fascinación enfocada", 1, "Performance Fascinante"],
  ["finalizacao_atordoante", "Finalização Atordoante", "Stunning Finisher", "Remate aturdidor", 8, ""],
  ["finalizacao_combinada", "Finalização Combinada", "Combination Finisher", "Remate combinado", 6, ""],
  ["finalizacao_de_retirada", "Finalização de Retirada", "One for the Road", "Remate de retirada", 2, ""],
  ["finalizacao_desequilibrante", "Finalização Desequilibrante", "Unbalancing Finisher", "Remate desequilibrante", 2, ""],
  ["finalizacao_dupla", "Finalização Dupla", "Dual Finisher", "Remate doble", 8, ""],
  ["finalizacao_empaladora", "Finalização Empaladora", "Impaling Finisher", "Remate empalador", 4, ""],
  ["finalizacao_encadeada", "Finalização Encadeada", "Chaining Finisher", "Remate encadenado", 2, ""],
  ["finalizacao_ilimitada", "Finalização Ilimitada", "Unlimited Finisher", "Remate ilimitado", 20, ""],
  ["finalizacao_letal", "Finalização Letal", "Lethal Finisher", "Remate letal", 18, ""],
  ["finalizacao_mirada", "Finalização Mirada", "Targeted Finisher", "Remate dirigido", 10, ""],
  ["finalizacao_movel", "Finalização Móvel", "Mobile Finisher", "Remate móvil", 12, ""],
  ["finalizacao_perfeita", "Finalização Perfeita", "Perfect Finisher", "Remate perfecto", 14, ""],
  ["finalizacao_precisa", "Finalização Precisa", "Precise Finisher", "Remate preciso", 6, ""],
  ["finalizacao_revitalizante", "Finalização Revitalizante", "Revitalizing Finisher", "Remate revitalizante", 16, ""],
  ["finalizacao_sangrenta", "Finalização Sangrenta", "Bleeding Finisher", "Remate sangriento", 8, ""],
  ["finalizacao_tropega", "Finalização Trôpega", "Stumbling Finisher", "Remate tambaleante", 10, ""],
  ["finta_provocante", "Finta Provocante", "Challenging Feint", "Finta provocadora", 1, "Treinado em Dissimulação"],
  ["garbo_exemplar", "Garbo Exemplar", "Exemplar Panache", "Garbo ejemplar", 20, ""],
  ["golpe_reativo", "Golpe Reativo", "Reactive Strike", "Golpe reactivo", 6, ""],
  ["graca_mortal", "Graça Mortal", "Deadly Grace", "Gracia mortal", 16, ""],
  ["iniciativa_presuncosa", "Iniciativa Presunçosa", "Braggart's Initiative", "Iniciativa presuntuosa", 4, ""],
  ["lamina_rodopiante", "Lâmina Rodopiante", "Whirling Blade", "Hoja giratoria", 4, ""],
  ["lamina_voadora", "Lâmina Voadora", "Flying Blade", "Hoja voladora", 1, "golpe preciso"],
  ["lide_com_a_decepcao", "Lide com a Decepção", "Deal with Deception", "Lidiar con el engaño", 12, ""],
  ["manobras_ageis", "Manobras Ágeis", "Agile Maneuvers", "Maniobras ágiles", 6, ""],
  ["ousadia_vivaz", "Ousadia Vivaz", "Vivacious Bravado", "Bravata vivaz", 8, ""],
  ["quanto_maior_melhor", "Quanto Maior, Melhor", "The Bigger They Are", "Cuanto más grande, mejor", 12, ""],
  ["queda_com_rolamento", "Queda com Rolamento", "Rolling Landing", "Caída con rodadura", 1, "Treinado em Acrobacia"],
  ["riposta_conveniente", "Riposta Conveniente", "Convenient Riposte", "Riposta conveniente", 16, ""],
  ["rolamento_vistoso", "Rolamento Vistoso", "Fancy Roll", "Rodadura vistosa", 8, ""],
  ["saque_ameacador", "Saque Ameaçador", "Threatening Draw", "Desenvainado amenazador", 2, ""],
  ["sorte_na_vida", "Sorte na Vida", "Charmed Life", "Suerte en la vida", 2, "Carisma +2"],
  ["toque_desarmante", "Toque Desarmante", "Disarming Flair", "Toque desarmante", 1, ""],
  ["salto_extravagante", "Salto Extravagante", "Extravagant Leap", "Salto extravagante", 14, ""],
  ["reacoes_inesgotaveis", "Reações Inesgotáveis", "Infinite Reactions", "Reacciones inagotables", 20, ""],
  ["riposta_impossivel", "Riposta Impossível", "Impossible Riposte", "Riposta imposible", 14, ""],
  ["riposta_reflexiva", "Riposta Reflexiva", "Reflexive Riposte", "Riposta reflexiva", 10, ""],
  ["sorte_incrivel", "Sorte Incrível", "Incredible Luck", "Suerte increíble", 18, ""],
  ["troca_repentina", "Troca Repentina", "Sudden Swap", "Intercambio repentino", 10, ""],
  ["um_por_todos", "Um Por Todos", "One for All", "Uno por todos", 1, "Treinado em Diplomacia"],
  ["voce_e_o_proximo", "Você É o Próximo", "You're Next", "Tú eres el siguiente", 1, "Treinado em Intimidação"],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_SWASHBUCKLER_FEATS) {
  const id = `feat.class.swashbuckler.${String(slug).replace(/\s+/g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Espadachim; efeito completo pendente de revisão.",
      en: "Swashbuckler class feat; full effect pending review.",
      es: "Dote de clase de espadachín; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Espadachim: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.swashbuckler",
    className: "Espadachim",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Espadachim"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 1 ? 106 : level <= 2 ? 107 : level <= 4 ? 108 : level <= 8 ? 109 : level <= 10 ? 110 : level <= 14 ? 111 : 112 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 116–123: índice de talentos de Feiticeiro.
const PLAYER_CORE_2_SORCERER_FEATS = [
  ["ampliar_magia", "Ampliar Magia", "Widen Spell", "Ampliar conjuro", 1, ""],
  ["ascendencia_sanguinea", "Ascendência Sanguínea", "Bloodline Ascendancy", "Ascendencia sanguínea", 14, ""],
  ["ascensao_sanguinea", "Ascensão Sanguínea", "Blood Rising", "Ascensión sanguínea", 1, ""],
  ["barreira_de_energia", "Barreira de Energia", "Energy Barrier", "Barrera de energía", 10, ""],
  ["concentracao_sem_esforco", "Concentração sem Esforço", "Effortless Concentration", "Concentración sin esfuerzo", 16, ""],
  ["conduite_de_linhagem", "Conduíte de Linhagem", "Bloodline Conduit", "Conducto de linaje", 20, ""],
  ["conjuracao_acelerada", "Conjuração Acelerada", "Quickened Casting", "Lanzamiento acelerado", 10, ""],
  ["conjuracao_consistente", "Conjuração Consistente", "Steady Spellcasting", "Lanzamiento constante", 6, ""],
  ["despertar_sanguineo", "Despertar Sanguíneo", "Blood Wake", "Despertar sanguíneo", 1, ""],
  ["dividir_disparo", "Dividir Disparo", "Split Shot", "Disparo dividido", 4, ""],
  ["energia_avassaladora", "Energia Avassaladora", "Overwhelming Energy", "Energía abrumadora", 10, ""],
  ["entrelacar_dissipacao", "Entrelaçar Dissipação", "Interweave Dispel", "Entrelazar disipación", 14, ""],
  ["estender_magia", "Estender Magia", "Reach Spell", "Alcance del conjuro", 1, ""],
  ["evolucao_arcana", "Evolução Arcana", "Arcane Evolution", "Evolución arcana", 4, ""],
  ["evolucao_de_linhagem_cruzada", "Evolução de Linhagem Cruzada", "Crossblooded Evolution", "Evolución de linaje cruzado", 8, ""],
  ["evolucao_de_linhagem_cruzada_maior", "Evolução de Linhagem Cruzada Maior", "Greater Crossblooded Evolution", "Evolución de linaje cruzado mayor", 18, "Evolução de Linhagem Cruzada"],
  ["evolucao_divina", "Evolução Divina", "Divine Evolution", "Evolución divina", 4, ""],
  ["evolucao_espiritual_maior", "Evolução Espiritual Maior", "Greater Spiritual Evolution", "Evolución espiritual mayor", 12, ""],
  ["evolucao_fisica_maior", "Evolução Física Maior", "Greater Physical Evolution", "Evolución física mayor", 12, ""],
  ["evolucao_mental_maior", "Evolução Mental Maior", "Greater Mental Evolution", "Evolución mental mayor", 16, ""],
  ["evolucao_ocultista", "Evolução Ocultista", "Occult Evolution", "Evolución ocultista", 4, ""],
  ["evolucao_primal", "Evolução Primal", "Primal Evolution", "Evolución primordial", 4, ""],
  ["evolucao_vital_maior", "Evolução Vital Maior", "Greater Vital Evolution", "Evolución vital mayor", 16, ""],
  ["expansao_de_magia_emblematica", "Expansão de Magia Emblemática", "Signature Spell Expansion", "Expansión de conjuro emblemático", 10, ""],
  ["expansao_de_truque_magico", "Expansão de Truque Mágico", "Cantrip Expansion", "Expansión de truco mágico", 2, ""],
  ["explosao_de_poder", "Explosão de Poder", "Powerful Explosion", "Explosión de poder", 8, ""],
  ["familiar", "Familiar", "Familiar", "Familiar", 1, ""],
  ["familiar_melhorado", "Familiar Melhorado", "Improved Familiar", "Familiar mejorado", 2, "Familiar"],
  ["foco_de_linhagem", "Foco de Linhagem", "Bloodline Focus", "Enfoque de linaje", 12, ""],
  ["fundir_energia", "Fundir Energia", "Energy Fusion", "Fusión de energía", 10, ""],
  ["golpes_encantados", "Golpes Encantados", "Enchanted Strikes", "Golpes encantados", 4, ""],
  ["linhagem_avancada", "Linhagem Avançada", "Advanced Bloodline", "Linaje avanzado", 6, ""],
  ["linhagem_maior", "Linhagem Maior", "Greater Bloodline", "Linaje mayor", 10, "Linhagem Avançada"],
  ["maestria_em_moldamagia", "Maestria em Moldamagia", "Metamagic Mastery", "Maestría en metamágica", 20, ""],
  ["magia_cintilante", "Magia Cintilante", "Shining Spell", "Conjuro centelleante", 16, ""],
  ["magia_ecoante", "Magia Ecoante", "Echoing Spell", "Conjuro resonante", 18, ""],
  ["magia_propulsora", "Magia Propulsora", "Propulsive Spell", "Conjuro propulsor", 2, ""],
  ["magia_protetora", "Magia Protetora", "Protective Spell", "Conjuro protector", 6, ""],
  ["mutacao_de_linhagem", "Mutação de Linhagem", "Bloodline Mutation", "Mutación de linaje", 20, ""],
  ["perfeicao_de_linhagem", "Perfeição de Linhagem", "Bloodline Perfection", "Perfección de linaje", 20, ""],
  ["refletir_maleficio", "Refletir Malefício", "Reflective Spell", "Conjuro reflectante", 14, ""],
  ["resistencia_de_linhagem", "Resistência de Linhagem", "Bloodline Resistance", "Resistencia de linaje", 8, ""],
  ["retransmitir_magia", "Retransmitir Magia", "Steal Spell", "Transmitir conjuro", 6, ""],
  ["sangria_letal", "Sangria Letal", "Bloodletting", "Sangría letal", 2, ""],
  ["sentido_magico", "Sentido Mágico", "Magical Sense", "Sentido mágico", 12, ""],
  ["soberania_sanguinea", "Soberania Sanguínea", "Blood Sovereignty", "Soberanía sanguínea", 12, ""],
  ["truque_de_terraformacao", "Truque de Terraformação", "Terraforming Trick", "Truco de terraformación", 12, ""],
  ["ungir_aliado", "Ungir Aliado", "Consecrate Ally", "Ungir aliado", 2, ""],
  ["veu_magico", "Véu Mágico", "Magical Shroud", "Velo mágico", 14, ""],
  ["vortice_de_desvio", "Vórtice de Desvio", "Diversion Vortex", "Vórtice de desvío", 6, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_SORCERER_FEATS) {
  const id = `feat.class.sorcerer.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Feiticeiro; efeito completo pendente de revisão.",
      en: "Sorcerer class feat; full effect pending review.",
      es: "Dote de clase de hechicero; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Feiticeiro: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.sorcerer",
    className: "Feiticeiro",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Feiticeiro"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 1 ? 116 : level <= 4 ? 117 : level <= 8 ? 118 : level <= 12 ? 119 : level <= 16 ? 120 : level <= 18 ? 121 : 122 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 132–139: índice de talentos de Investigador.
const PLAYER_CORE_2_INVESTIGATOR_FEATS = [
  ["afericao_estrategica", "Aferição Estratégica", "Strategic Assessment", "Evaluación estratégica", 4, ""],
  ["apenas_os_fatos", "Apenas os Fatos", "Just the Facts", "Solo los hechos", 20, ""],
  ["as_do_trapaceiro", "Ás do Trapaceiro", "Trickster's Ace", "As del embaucador", 18, ""],
  ["botar_pressao", "Botar Pressão", "Apply Pressure", "Presionar", 12, ""],
  ["como_planejado", "Como Planejado", "As Planned", "Según lo planeado", 12, ""],
  ["compartilhar_tintura", "Compartilhar Tintura", "Share Elixir", "Compartir elixir", 12, ""],
  ["compra_implausivel", "Compra Implausível", "Implausible Purchase", "Compra implausible", 16, ""],
  ["compra_preditiva", "Compra Preditiva", "Predictive Purchase", "Compra predictiva", 6, ""],
  ["contorno_estrategico", "Contorno Estratégico", "Strategic Bypass", "Rodeo estratégico", 14, ""],
  ["descobertas_alquimicas", "Descobertas Alquímicas", "Alchemical Discoveries", "Descubrimientos alquímicos", 4, ""],
  ["descobridor_de_armadilhas", "Descobridor de Armadilhas", "Trap Finder", "Descubridor de trampas", 1, ""],
  ["detector_de_mentiras", "Detector de Mentiras", "Lie Detector", "Detector de mentiras", 4, ""],
  ["eliminar_pista_falsa", "Eliminar Pista Falsa", "Eliminate False Lead", "Eliminar pista falsa", 1, ""],
  ["especialista_em_abate", "Especialista em Abate", "Finishing Follow-Through", "Especialista en remates", 1, ""],
  ["estratagema_compartilhado", "Estratagema Compartilhado", "Shared Stratagem", "Estratagema compartido", 2, ""],
  ["estratagema_defensivo", "Estratagema Defensivo", "Defensive Stratagem", "Estratagema defensivo", 8, ""],
  ["estratagema_infalivel", "Estratagema Infalível", "Unerring Stratagem", "Estratagema infalible", 2, ""],
  ["estrategia_continua", "Estratégia Contínua", "Continual Strategy", "Estrategia continua", 10, ""],
  ["estrategista_atletico", "Estrategista Atlético", "Athletic Strategist", "Estratega atlético", 2, ""],
  ["estudos_flexiveis", "Estudos Flexíveis", "Flexible Studies", "Estudios flexibles", 1, ""],
  ["explorar_erro", "Explorar Erro", "Exploit Error", "Explotar error", 2, ""],
  ["fornecer_pistas_para_todos", "Fornecer Pistas para Todos", "Clue Everyone In", "Dar pistas a todos", 8, ""],
  ["fraquezas_conhecidas", "Fraquezas Conhecidas", "Known Weaknesses", "Debilidades conocidas", 1, ""],
  ["golpe_didatico", "Golpe Didático", "Didactic Strike", "Golpe didáctico", 16, ""],
  ["impacto_preciso", "Impacto Preciso", "Precise Impact", "Impacto preciso", 12, ""],
  ["investigacao_em_curso", "Investigação em Curso", "Investigation Ongoing", "Investigación en curso", 4, ""],
  ["investigador_do_submundo", "Investigador do Submundo", "Underworld Investigator", "Investigador del submundo", 1, ""],
  ["investigador_principal", "Investigador Principal", "Lead Investigator", "Investigador principal", 18, ""],
  ["ligar_os_pontos", "Ligar os Pontos", "Connect the Dots", "Conectar los puntos", 6, ""],
  ["lutar_as_cegas", "Lutar às Cegas", "Blind-Fight", "Luchar a ciegas", 8, ""],
  ["olhos_do_empirista", "Olhos do Empirista", "Empiricist's Eye", "Ojos del empirista", 12, ""],
  ["pesquisa_minuciosa", "Pesquisa Minuciosa", "Thorough Research", "Investigación minuciosa", 6, ""],
  ["pista_solida", "Pista Sólida", "Solid Lead", "Pista sólida", 2, ""],
  ["ponta_do_bisturi", "Ponta do Bisturi", "On the Tip of Your Tongue", "En la punta de la lengua", 4, ""],
  ["prever_o_perigo", "Prever o Perigo", "Predict the Future", "Prever el peligro", 12, ""],
  ["prontidao_de_detetive", "Prontidão de Detetive", "Detective's Readiness", "Preparación de detective", 4, ""],
  ["que_estranho", "Que Estranho", "That's Odd", "Qué extraño", 1, ""],
  ["quem_matou", "Quem Matou?", "Who Done It?", "¿Quién lo hizo?", 8, ""],
  ["raciocinar_rapidamente", "Raciocinar Rapidamente", "Reason Rapidly", "Razonar rápidamente", 12, ""],
  ["reconstruir_a_cena", "Reconstruir a Cena", "Reconstruct the Scene", "Reconstruir la escena", 16, ""],
  ["sentir_o_invisivel", "Sentir o Invisível", "Sense the Unseen", "Sentir lo invisible", 14, ""],
  ["so_mais_uma_coisa", "Só Mais Uma Coisa", "Just One More Thing", "Solo una cosa más", 10, ""],
  ["suspeito", "Suspeito", "Suspect", "Sospechoso", 2, ""],
  ["suspeito_de_oportunidade", "Suspeito de Oportunidade", "Suspect of Opportunity", "Sospechoso de oportunidad", 10, ""],
  ["todos_sao_suspeitos", "Todos são Suspeitos", "Everyone's a Suspect", "Todos son sospechosos", 20, ""],
  ["tracar_o_futuro", "Traçar o Futuro", "Predict the Future", "Trazar el futuro", 14, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_INVESTIGATOR_FEATS) {
  const id = `feat.class.investigator.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Investigador; efeito completo pendente de revisão.",
      en: "Investigator class feat; full effect pending review.",
      es: "Dote de clase de investigador; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Investigador: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.investigator",
    className: "Investigador",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Investigador"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 1 ? 132 : level <= 2 ? 133 : level <= 4 ? 134 : level <= 8 ? 135 : level <= 12 ? 136 : level <= 16 ? 137 : level <= 18 ? 138 : 139 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 146–149: primeiro bloco confirmado de talentos de Monge.
const PLAYER_CORE_2_MONK_FEATS = [
  ["arsenal_monastico", "Arsenal Monástico", "Monastic Arsenal", "Arsenal monástico", 1, ""],
  ["postura_da_arquearia_monastica", "Postura da Arquearia Monástica", "Monastic Archer Stance", "Postura de arquero monástico", 1, ""],
  ["postura_da_garca", "Postura da Garça", "Crane Stance", "Postura de la grulla", 1, ""],
  ["postura_da_montanha", "Postura da Montanha", "Mountain Stance", "Postura de la montaña", 1, ""],
  ["postura_do_dragao", "Postura do Dragão", "Dragon Stance", "Postura del dragón", 1, ""],
  ["postura_do_lobo", "Postura do Lobo", "Wolf Stance", "Postura del lobo", 1, ""],
  ["postura_do_tigre", "Postura do Tigre", "Tiger Stance", "Postura del tigre", 1, ""],
  ["postura_tropega", "Postura Trôpega", "Stumbling Stance", "Postura tambaleante", 1, ""],
  ["magias_de_ki", "Magias de Ki", "Ki Spells", "Conjuros de ki", 1, ""],
  ["agarrao_esmagador", "Agarrão Esmagador", "Crushing Grab", "Agarre aplastante", 2, ""],
  ["folha_dancante", "Folha Dançante", "Dancing Leaf", "Hoja danzante", 2, ""],
  ["golpe_atordoante", "Golpe Atordoante", "Stunning Fist", "Golpe aturdidor", 2, ""],
  ["postura_das_estrelas_cadentes", "Postura das Estrelas Cadentes", "Starlit Span Stance", "Postura de las estrellas fugaces", 2, ""],
  ["punho_elemental", "Punho Elemental", "Elemental Fist", "Puño elemental", 2, "agitação interna"],
  ["arsenal_monastico_avancado", "Arsenal Monástico Avançado", "Advanced Monastic Arsenal", "Arsenal monástico avanzado", 6, "Arsenal Monástico"],
  ["alinhar_ki", "Alinhar Ki", "Align Ki", "Alinear ki", 6, ""],
  ["defletir_projetil", "Defletir Projétil", "Deflect Projectile", "Desviar proyectil", 4, ""],
  ["harmonizar_corpo", "Harmonizar Corpo", "Harmonize Body", "Armonizar cuerpo", 4, ""],
  ["movimento_cauteloso", "Movimento Cauteloso", "Cautious Movement", "Movimiento cauteloso", 4, ""],
  ["postura_da_naja", "Postura da Naja", "Serpent Stance", "Postura de la cobra", 4, ""],
  ["rajada_de_manobras", "Rajada de Manobras", "Flurry of Maneuvers", "Ráfaga de maniobras", 4, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_MONK_FEATS) {
  const id = `feat.class.monk.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Monge; efeito completo pendente de revisão.",
      en: "Monk class feat; full effect pending review.",
      es: "Dote de clase de monje; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Monge: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.monk",
    className: "Monge",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Monge"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 1 ? 146 : level <= 2 ? 147 : level <= 4 ? 148 : 149 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 149–153: talentos intermediários de Monge.
const PLAYER_CORE_2_MONK_FEATS_INTERMEDIATE = [
  ["alvoroco_da_garca", "Alvoroço da Garça", "Crane Flutter", "Aleteo de la grulla", 6, "Postura da Garça"],
  ["arrasto_do_lobo", "Arrasto do Lobo", "Wolf Drag", "Arrastre del lobo", 6, "Postura do Lobo"],
  ["arremesso_giratorio", "Arremesso Giratório", "Whirling Throw", "Lanzamiento giratorio", 6, ""],
  ["corte_do_tigre", "Corte do Tigre", "Tiger Slash", "Tajo del tigre", 6, "Postura do Tigre"],
  ["fortaleza_da_montanha", "Fortaleza da Montanha", "Mountain Stronghold", "Fortaleza de la montaña", 6, "Postura da Montanha"],
  ["magias_de_ki_avancadas", "Magias de Ki Avançadas", "Advanced Ki Spells", "Conjuros de ki avanzados", 6, "Magias de Ki"],
  ["passo_na_agua", "Passo na Água", "Water Step", "Paso sobre el agua", 6, ""],
  ["rugido_do_dragao", "Rugido do Dragão", "Dragon Roar", "Rugido del dragón", 6, "Postura do Dragão"],
  ["soco_de_uma_polegada", "Soco de Uma Polegada", "One-Inch Punch", "Puñetazo de una pulgada", 6, ""],
  ["golpe_atordoante", "Golpe Atordoante", "Stunning Fist", "Golpe aturdidor", 2, ""],
  ["iniciado_das_sombras_fisgadoras", "Iniciado das Sombras Fisgadoras", "Whipfang Stalker Initiate", "Iniciado de las sombras mordaces", 8, ""],
  ["iniciado_dos_ventos_selvagens", "Iniciado dos Ventos Selvagens", "Wild Winds Initiate", "Iniciado de los vientos salvajes", 8, ""],
  ["interceptar_projetil", "Interceptar Projétil", "Intercept Projectile", "Interceptar proyectil", 8, ""],
  ["correr_na_parede", "Correr na Parede", "Wall Run", "Correr por la pared", 8, ""],
  ["disparo_imobilizante", "Disparo Imobilizante", "Stunning Shot", "Disparo inmovilizante", 8, ""],
  ["postura_da_floresta_emaranhada", "Postura da Floresta Emaranhada", "Tangling Forest Stance", "Postura del bosque enmarañado", 8, ""],
  ["postura_do_sangue_de_ferro", "Postura do Sangue de Ferro", "Ironblood Stance", "Postura de sangre de hierro", 8, ""],
  ["manobra_combinada", "Manobra Combinada", "Combination Maneuver", "Maniobra combinada", 8, ""],
  ["posicao_prevalente", "Posição Prevalente", "Prevailing Position", "Posición prevalente", 10, ""],
  ["aperto_dormente", "Aperto Dormente", "Sleeper Hold", "Agarre durmiente", 10, ""],
  ["envenenamento_da_naja", "Envenenamento da Naja", "Serpent Venom", "Veneno de la cobra", 10, "Postura da Naja"],
  ["golpe_de_jogar_para_tras", "Golpe de Jogar para Trás", "Knockback Strike", "Golpe de derribo", 10, ""],
  ["salto_do_vento", "Salto do Vento", "Wind Jump", "Salto del viento", 10, ""],
  ["foco_meditativo", "Foco Meditativo", "Meditative Focus", "Enfoque meditativo", 12, ""],
  ["interromper_ki", "Interromper Ki", "Disrupt Ki", "Interrumpir el ki", 12, ""],
  ["jogar_para_tras_aprimorado", "Jogar para Trás Aprimorado", "Improved Knockback", "Derribo mejorado", 12, "Golpe de Jogar para Trás"],
  ["respiracao_avassaladora", "Respiração Avassaladora", "Overwhelming Breath", "Respiración abrumadora", 12, ""],
  ["rolamento_de_esquiva", "Rolamento de Esquiva", "Dodge Roll", "Rodadura evasiva", 12, ""],
  ["tiro_focado", "Tiro Focado", "Focused Shot", "Disparo concentrado", 12, "Postura da Arquearia Monástica"],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_MONK_FEATS_INTERMEDIATE) {
  const id = `feat.class.monk.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Monge; efeito completo pendente de revisão.",
      en: "Monk class feat; full effect pending review.",
      es: "Dote de clase de monje; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Monge: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.monk",
    className: "Monge",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Monge"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 6 ? 150 : level <= 8 ? 151 : level <= 10 ? 152 : 153 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 153–156: talentos superiores de Monge.
const PLAYER_CORE_2_MONK_FEATS_HIGH = [
  ["chave_de_forma", "Chave de Forma", "Form Lock", "Llave de forma", 14, ""],
  ["forma_inigualavel", "Forma Inigualável", "Unmatched Form", "Forma inigualable", 14, ""],
  ["lufada_dos_ventos_selvagens", "Lufada dos Ventos Selvagens", "Wild Winds Gust", "Ráfaga de vientos salvajes", 14, ""],
  ["postura_da_lamina_voadora", "Postura da Lâmina Voadora", "Flying Blade Stance", "Postura de la hoja voladora", 14, ""],
  ["rasgo_da_floresta_emaranhada", "Rasgo da Floresta Emaranhada", "Tangling Forest Rake", "Zarpazo del bosque enmarañado", 14, "Postura da Floresta Emaranhada"],
  ["surto_do_sangue_de_ferro", "Surto do Sangue de Ferro", "Ironblood Surge", "Oleada de sangre de hierro", 14, "Postura do Sangue de Ferro"],
  ["teia_das_sombras", "Teia das Sombras", "Shadow's Web", "Telaraña de sombras", 14, ""],
  ["tremor_da_montanha", "Tremor da Montanha", "Mountain Tremor", "Temblor de la montaña", 14, "Postura da Montanha"],
  ["fundir_posturas", "Fundir Posturas", "Fuse Stances", "Fusionar posturas", 16, ""],
  ["golpe_estilhacador", "Golpe Estilhaçador", "Shattering Strike", "Golpe demoledor", 16, ""],
  ["magias_do_mestre_do_ki", "Magias do Mestre do Ki", "Master Ki Spells", "Conjuros del maestro del ki", 16, "Magias de Ki Avançadas"],
  ["mestre_de_muitos_estilos", "Mestre de Muitos Estilos", "Master of Many Styles", "Maestro de muchos estilos", 16, ""],
  ["soco_de_um_milimetro", "Soco de Um Milímetro", "One-Millimeter Punch", "Puñetazo de un milímetro", 16, ""],
  ["centrar_ki", "Centrar Ki", "Centering Ki", "Centrar el ki", 18, ""],
  ["magias_do_grao_mestre_do_ki", "Magias do Grão-Mestre do Ki", "Grandmaster Ki Spells", "Conjuros del gran maestro del ki", 18, "Magias do Mestre do Ki"],
  ["punhos_de_diamante", "Punhos de Diamante", "Diamond Fists", "Puños de diamante", 18, ""],
  ["rio_veloz", "Rio Veloz", "River Flow", "Río veloz", 18, ""],
  ["tiro_triangular", "Tiro Triangular", "Triangular Shot", "Disparo triangular", 18, ""],
  ["destruidor_de_deuses", "Destruidor de Deuses", "Godbreaker", "Destructor de dioses", 20, ""],
  ["ki_veloz", "Ki Veloz", "Swift Ki", "Ki veloz", 20, ""],
  ["rapidez_permanente", "Rapidez Permanente", "Constant Speed", "Velocidad permanente", 20, ""],
  ["tecnica_impossivel", "Técnica Impossível", "Impossible Technique", "Técnica imposible", 20, ""],
  ["tecnicas_imortais", "Técnicas Imortais", "Immortal Techniques", "Técnicas inmortales", 20, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_MONK_FEATS_HIGH) {
  const id = `feat.class.monk.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Monge; efeito completo pendente de revisão.",
      en: "Monk class feat; full effect pending review.",
      es: "Dote de clase de monje; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Monge: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.monk",
    className: "Monge",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Monge"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 14 ? 154 : level <= 16 ? 155 : level <= 18 ? 156 : 157 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

// Player Core 2, pp. 160–168: índice de talentos de Oráculo.
const PLAYER_CORE_2_ORACLE_FEATS = [
  ["a_caminhada_dos_mortos", "A Caminhada dos Mortos", "Walk the Dead", "La caminata de los muertos", 1, ""],
  ["aguas_da_criacao", "Águas da Criação", "Waters of Creation", "Aguas de la creación", 1, ""],
  ["ajustar_as_balancas", "Ajustar as Balanças", "Balance the Scales", "Ajustar las balanzas", 1, ""],
  ["ampliar_magia", "Ampliar Magia", "Widen Spell", "Ampliar conjuro", 8, ""],
  ["aviso_oracular", "Aviso Oracular", "Oracular Warning", "Advertencia oracular", 1, ""],
  ["caminhante_das_aguas", "Caminhante das Águas", "Water Walker", "Caminante de las aguas", 16, ""],
  ["coletar_saber", "Coletar Saber", "Gather Knowledge", "Recopilar conocimiento", 20, ""],
  ["conduite_de_eversao_e_vitalidade", "Conduíte de Eversão e Vitalidade", "Conduit of Void and Vitality", "Conducto de eversión y vitalidad", 4, ""],
  ["conduite_de_misterio", "Conduíte de Mistério", "Mystery Conduit", "Conducto del misterio", 10, ""],
  ["conhecimento_das_formas", "Conhecimento das Formas", "Knowledge of Forms", "Conocimiento de las formas", 6, ""],
  ["conjuracao_acelerada", "Conjuração Acelerada", "Quickened Casting", "Lanzamiento acelerado", 8, ""],
  ["conjuracao_consistente", "Conjuração Consistente", "Steady Spellcasting", "Lanzamiento constante", 6, ""],
  ["dicotomia_debilitante", "Dicotomia Debilitante", "Debilitating Dichotomy", "Dicotomía debilitante", 18, ""],
  ["dotado_de_poder", "Dotado de Poder", "Gifted Power", "Poder otorgado", 2, ""],
  ["efusao_divina", "Efusão Divina", "Divine Effusion", "Efusión divina", 12, ""],
  ["egide_divina", "Égide Divina", "Divine Aegis", "Égida divina", 1, ""],
  ["epifania_na_encruzilhada", "Epifania na Encruzilhada", "Crossroads Epiphany", "Epifanía en la encrucijada", 14, ""],
  ["estender_magia", "Estender Magia", "Reach Spell", "Alcance del conjuro", 2, ""],
  ["evitar_maldicao", "Evitar Maldição", "Cursebound Avoidance", "Evitar maldición", 12, ""],
  ["expansao_de_truque_magico", "Expansão de Truque Mágico", "Cantrip Expansion", "Expansión de truco mágico", 2, ""],
  ["fluencia_em_dominio", "Fluência em Domínio", "Domain Fluency", "Fluidez en el dominio", 2, ""],
  ["foco_da_revelacao", "Foco da Revelação", "Revelation Focus", "Enfoque de la revelación", 14, ""],
  ["fulgor_da_revelacao", "Fulgor da Revelação", "Revelation's Radiance", "Resplandor de la revelación", 18, ""],
  ["golpes_encantados", "Golpes Encantados", "Enchanted Strikes", "Golpes encantados", 4, ""],
  ["intervencao_espiritual", "Intervenção Espiritual", "Spiritual Intervention", "Intervención espiritual", 2, ""],
  ["julgamento_do_fogo_celeste", "Julgamento do Fogo Celeste", "Heaven's Burning Rebuke", "Juicio del fuego celeste", 10, ""],
  ["ler_desastre", "Ler Desastre", "Read Disaster", "Leer el desastre", 8, ""],
  ["magia_portentosa", "Magia Portentosa", "Portentous Spell", "Conjuro portentoso", 16, ""],
  ["mais_leve_que_o_ar", "Mais Leve que o Ar", "Lighter Than Air", "Más ligero que el aire", 14, ""],
  ["mil_visoes", "Mil Visões", "A Thousand Faces", "Mil visiones", 4, ""],
  ["misterio_diverso", "Mistério Diverso", "Diversified Mystery", "Misterio diverso", 16, ""],
  ["misterio_paradoxal", "Mistério Paradoxal", "Paradoxical Mystery", "Misterio paradójico", 20, ""],
  ["perspicacia_em_dominio", "Perspicácia em Domínio", "Domain Acumen", "Perspicacia en el dominio", 2, ""],
  ["prenunciar_dano", "Prenunciar Dano", "Foretell Harm", "Predecir daño", 1, ""],
  ["providencia_oracular", "Providência Oracular", "Oracular Providence", "Providencia oracular", 20, ""],
  ["repertorio_misterioso", "Repertório Misterioso", "Mystery of the Repertoire", "Repertorio misterioso", 14, ""],
  ["revelacao_avancada", "Revelação Avançada", "Advanced Revelation", "Revelación avanzada", 6, ""],
  ["revelacao_maior", "Revelação Maior", "Greater Revelation", "Revelación mayor", 12, ""],
  ["sentido_magico", "Sentido Mágico", "Magical Sense", "Sentido mágico", 12, ""],
  ["role_os_ossos_do_destino", "Role os Ossos do Destino", "Roll the Bones of Fate", "Tira los huesos del destino", 10, ""],
  ["sentido_espiritual", "Sentido Espiritual", "Spiritual Sense", "Sentido espiritual", 6, ""],
  ["surto_de_poder", "Surto de Poder", "Powerful Surge", "Oleada de poder", 8, ""],
  ["sussurros_de_fraqueza", "Sussurros de Fraqueza", "Whispers of Weakness", "Susurros de debilidad", 1, ""],
];
for (const [slug, pt, en, es, level, prereq] of PLAYER_CORE_2_ORACLE_FEATS) {
  const id = `feat.class.oracle.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": "Talento de classe de Oráculo; efeito completo pendente de revisão.",
      en: "Oracle class feat; full effect pending review.",
      es: "Dote de clase de oráculo; el efecto completo queda pendiente de revisión."
    },
    description: `Talento de classe de Oráculo: ${pt}.`,
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.oracle",
    className: "Oráculo",
    prerequisites: prereq ? [prereq] : [],
    traits: ["Classe", "Oráculo"],
    source: { book: PLAYER_CORE_2_SOURCE, page: level <= 2 ? 161 : level <= 6 ? 162 : level <= 10 ? 163 : level <= 14 ? 164 : level <= 18 ? 165 : 166 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common",
  });
}

const PLAYER_CORE_2_MISSING_ARCHETYPES = [
  ["archetype.blessed", "Abençoado", "Blessed One", "Bendecido", 183, "Carrega uma bênção divina capaz de curar ferimentos e remover condições nocivas."],
  ["archetype.snarecrafter", "Arapuqueiro", "Snarecrafter", "Fabricante de trampas", 185, "Transforma materiais comuns em arapucas letais preparadas com rapidez."],
  ["archetype.eldritch_archer", "Arqueiro Místico", "Eldritch Archer", "Arquero arcano", 187, "Combina magia e disparos para lançar feitiços por meio de ataques à distância."],
  ["archetype.archaeologist", "Arqueólogo", "Archaeologist", "Arqueólogo", 189, "Explora ruínas, identifica relíquias e sobrevive a tumbas perigosas em busca de conhecimento."],
  ["archetype.assassin", "Assassino", "Assassin", "Asesino", 190, "Planeja ataques precisos e usa venenos, disfarces e preparação para eliminar alvos."],
  ["archetype.martial_artist", "Artista Marcial", "Martial Artist", "Artista marcial", 191, "Aperfeiçoa golpes desarmados letais por meio de treinamento físico disciplinado."],
  ["archetype.bastion", "Bastião", "Bastion", "Bastión", 192, "Especializa-se em escudos e reações defensivas para proteger a si e seus aliados."],
  ["archetype.scout", "Batedor", "Scout", "Explorador", 193, "Reconhece o terreno, reúne informações e retorna sem ser percebido pelas linhas inimigas."],
  ["archetype.bounty_hunter", "Caçador de Recompensas", "Bounty Hunter", "Cazarrecompensas", 194, "Rastreia alvos, pesquisa suas fraquezas e os captura por recompensa."],
  ["archetype.celebrity", "Celebridade", "Celebrity", "Celebridad", 197, "Usa fama, presença e atuação para conquistar atenção e influenciar multidões."],
  ["archetype.dual_weapon_warrior", "Combatente de Duas Armas", "Dual-Weapon Warrior", "Combatiente de dos armas", 198, "Treina para lutar com duas armas e atacar com coordenação e velocidade."],
  ["archetype.dandy", "Dândi", "Dandy", "Dandi", 199, "Domina etiqueta, cultura e estilo refinado para navegar pela alta sociedade."],
  ["archetype.talisman_dabbler", "Diletante Talismânico", "Talisman Dabbler", "Aficionado de talismanes", 200, "Prepara talismãs temporários e aprende a extrair poder de pequenos artefatos mágicos."],
  ["archetype.scrounger", "Escarafunchador", "Scrounger", "Recolector", 202, "Improvisa armas, armaduras e equipamentos temporários com materiais encontrados."],
  ["archetype.gladiator", "Gladiador", "Gladiator", "Gladiador", 203, "Transforma combate competitivo e aplausos da multidão em força e confiança."],
  ["archetype.herbalist", "Herbalista", "Herbalist", "Herbolario", 204, "Cultiva e prepara remédios e consumíveis alquímicos naturais para tratar aliados."],
  ["archetype.weapon_improviser", "Improvisador de Armas", "Weapon Improviser", "Improvisador de armas", 205, "Luta eficazmente com qualquer objeto ao alcance, surpreendendo adversários."],
  ["archetype.linguist", "Linguista", "Linguist", "Lingüista", 206, "Estuda idiomas, códigos e padrões de fala para compreender e manipular comunicação."],
  ["archetype.mauler", "Malhador", "Mauler", "Manejador de armas pesadas", 209, "Usa armas de duas mãos e golpes devastadores para controlar o campo de batalha."],
  ["archetype.beastmaster", "Mestre das Feras", "Beastmaster", "Maestro de bestias", 213, "Forma um vínculo com vários companheiros animais e aprende a comandá-los."],
  ["archetype.familiar_master", "Mestre em Familiar", "Familiar Master", "Maestro de familiares", 215, "Aprimora um familiar para que ele ofereça mais habilidades e auxílio mágico."],
  ["archetype.pirate", "Pirata", "Pirate", "Pirata", 216, "Domina combate naval, cordames e a vida perigosa entre navios e portos."],
  ["archetype.scroll_trickster", "Trapaceiro de Pergaminhos", "Scroll Trickster", "Tramposo de pergaminos", 219, "Manipula pergaminhos temporários para ampliar suas opções mágicas."],
  ["archetype.poisoner", "Veneficista", "Poisoner", "Envenenador", 220, "Prepara e aplica venenos com precisão para explorar vulnerabilidades."],
  ["archetype.vigilante", "Vigilante", "Vigilante", "Vigilante", 221, "Mantém uma identidade dupla para investigar ameaças e agir longe dos olhos públicos."],
  ["archetype.viking", "Viking", "Viking", "Vikingo", 223, "Combina resistência, navegação e ferocidade marcial herdadas de uma cultura guerreira."]
];
PLAYER_CORE_2_MISSING_ARCHETYPES.forEach(([id, pt, en, es, page, summary]) => {
  PF2E_DATA.archetypes.push({
    id,
    name: `${pt} (${en})`,
    category: "Arquétipo",
    names: { "pt-BR": pt, en, es },
    summaries: localizedEquipmentSummary(summary, `Player Core 2 archetype: ${en}.`, `Arquetipo de Player Core 2: ${es}.`),
    description: summary,
    source: { book: PLAYER_CORE_2_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
    rarity: "common"
  });
});

const PLAYER_CORE_VERSATILE_HERITAGE_METADATA = {
  "Nephilim (Celestial / Aasimar)": ["heritage.nephilim.celestial", "Nefilim", "Nephilim", "Nefilim", 79, "Herança versátil de linhagem celestial ou aasimar."],
  "Nephilim (Infernal / Tiefling)": ["heritage.nephilim.infernal", "Nefilim", "Nephilim", "Nefilim", 79, "Herança versátil de linhagem infernal ou tiefling."],
  "Changeling (Cambionte / Filho de Bruxa)": ["heritage.changeling", "Cambiante", "Changeling", "Cambiante", 77, "Herança versátil ligada à linhagem de uma estriga e à magia ocultista."]
};
Object.entries(PLAYER_CORE_VERSATILE_HERITAGE_METADATA).forEach(([legacyName, [id, pt, en, es, page, summary]]) => {
  const record = (PF2E_DATA.versatileHeritages || []).find((heritage) => heritage.name === legacyName);
  if (!record) return;
  Object.assign(record, {
    id,
    names: { "pt-BR": pt, en, es },
    summaries: localizedEquipmentSummary(
      summary,
      `A versatile heritage tied to ${en.toLowerCase()} ancestry.`,
      `Una herencia versátil vinculada a la ascendencia ${es.toLowerCase()}.`
    ),
    source: { book: PLAYER_CORE_SOURCE, page },
    ruleset: "remaster",
    needs_review: false
  });
});

const BOOK_DEAD_PLAYABLE_ARCHETYPES = [
  ["archetype.exorcist", "Exorcista", "Exorcist", "Exorcista", 22, "Pacifica espíritos e transforma fragmentos de assombrações em poder purificador."],
  ["archetype.soul_warden", "Guardião das Almas", "Soul Warden", "Guardián de almas", 24, "Protege almas e usa um símbolo sagrado para resistir às ameaças da desmorte."],
  ["archetype.undead_slayer", "Matador de Mortos-Vivos", "Undead Slayer", "Cazador de no muertos", 26, "Estuda mortos-vivos e domina ferramentas para explorar suas fraquezas."],
  ["archetype.consecrated_necromancer", "Necromante Consagrado", "Consecrated Necromancer", "Nigromante consagrado", 28, "Canaliza necromancia por uma tradição divina, ocultista ou outra tradição compatível."],
  ["archetype.reanimator", "Reanimador", "Reanimator", "Reanimador", 34, "Cria e comanda servos mortos-vivos como extensão de sua prática necromântica."],
  ["archetype.ghoul", "Carniçal", "Ghoul", "Necrófago", 46, "A fome da desmorte concede garras, mordida e capacidades de um carniçal."],
  ["archetype.ghost", "Fantasma", "Ghost", "Fantasma", 52, "Permanece ligado ao mundo dos vivos por negócios inacabados e laços poderosos."],
  ["archetype.lich", "Lich", "Lich", "Liche", 54, "Prende sua alma a uma filactéria e busca a imortalidade por meio de necromancia."],
  ["archetype.mummy", "Múmia", "Mummy", "Momia", 56, "Retorna como morto-vivo preservado, envolto em maldições e ritos funerários."],
  ["archetype.vampire", "Vampiro", "Vampire", "Vampiro", 58, "Sobrevive como criatura da noite, vulnerável à luz do dia e sedenta por sangue."],
  ["archetype.zombie", "Zumbi", "Zombie", "Zombi", 60, "Um corpo reanimado que preserva parte da identidade enquanto luta contra a decomposição."]
];
BOOK_DEAD_PLAYABLE_ARCHETYPES.forEach(([id, pt, en, es, page, summary]) => {
  PF2E_DATA.archetypes.push({
    id,
    name: `${pt} (${en})`,
    category: "Mortos-vivos",
    ...(["archetype.ghost", "archetype.ghoul", "archetype.mummy", "archetype.vampire", "archetype.zombie"].includes(id) ? { level: 2, dedicationLevel: 2, prerequisites: ["Você está morto-vivo"] } : {}),
    names: { "pt-BR": pt, en, es },
    summaries: localizedEquipmentSummary(summary, `Book of the Dead playable archetype: ${en}.`, `Arquetipo jugable de Libro de los muertos: ${es}.`),
    description: summary,
    source: { book: BOOK_DEAD_SOURCE, page },
    ruleset: "legacy",
    needs_review: false,
    rarity: ["Exorcist", "Soul Warden", "Undead Slayer", "Reanimator"].includes(en) ? "uncommon" : "rare"
  });
});

const PLAYER_CORE_EQUIPMENT_SPANISH_NAMES = {
  "Bastard Sword": "Espada bastarda", "Battle Axe": "Hacha de batalla", "Blowgun": "Cerbatana",
  "Bo Staff": "Bastón bo", "Club": "Garrote", "Crossbow": "Ballesta", "Dagger": "Daga",
  "Dart": "Dardo", "Falchion": "Falcata", "Flail": "Mangual", "Gauntlet": "Guantelete",
  "Glaive": "Glaive", "Greataxe": "Hacha grande", "Greatclub": "Garrote grande", "Greatsword": "Espadón",
  "Halberd": "Alabarda", "Hand Crossbow": "Ballesta de mano", "Heavy Crossbow": "Ballesta pesada",
  "Javelin": "Jabalina", "Kukri": "Kukri", "Lance": "Lanza de caballería", "Longbow": "Arco largo",
  "Longsword": "Espada larga", "Maul": "Mazo", "Morningstar": "Maza estrellada", "Nunchaku": "Nunchaku",
  "Pick": "Pico", "Rapier": "Estoque", "Scimitar": "Cimitarra", "Scythe": "Guadaña",
  "Shortbow": "Arco corto", "Shortsword": "Espada corta", "Shuriken": "Shuriken", "Sickle": "Hoz",
  "Sling": "Honda", "Spear": "Lanza", "Staff": "Bastón", "Trident": "Tridente",
  "Warhammer": "Martillo de guerra", "Whip": "Látigo", "Fist": "Puño",
  "Explorer's Clothing": "Ropa de explorador", "Padded Armor": "Armadura acolchada", "Leather Armor": "Armadura de cuero",
  "Studded Leather": "Cuero tachonado", "Chain Shirt": "Camisa de cota de malla", "Hide Armor": "Armadura de piel",
  "Scale Mail": "Cota de escamas", "Breastplate": "Coraza", "Chain Mail": "Cota de malla",
  "Half Plate": "Media armadura", "Splint Mail": "Armadura de bandas", "Full Plate": "Armadura completa", "Unarmored": "Sin armadura",
  "Buckler": "Broquel", "Steel Shield": "Escudo de acero", "Wooden Shield": "Escudo de madera", "Tower Shield": "Escudo torre"
};
Object.entries(PLAYER_CORE_EQUIPMENT_METADATA).forEach(([category, metadata]) => {
  (PF2E_DATA[category] || []).forEach((record) => {
    const recordHeading = record.name.replace(/\s*\([^)]*\)\s*$/, "").split(" / ")[0].trim();
    const match = Object.entries(metadata).find(([englishName]) => recordHeading === englishName || record.name.includes(`(${englishName})`));
    if (!match) return;
    const [englishName, [portugueseName, page]] = match;
    const idPrefix = category === "shields" ? "shield" : category === "armors" ? "armor" : "weapon";
    const slug = englishName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const baseSummary = record.description || `${portugueseName} do equipamento de combate.`;
    Object.assign(record, {
      id: record.id || `${idPrefix}.${slug}`,
      names: {
        "pt-BR": portugueseName,
        en: englishName,
        es: PLAYER_CORE_EQUIPMENT_SPANISH_NAMES[englishName] || englishName
      },
      summaries: localizedEquipmentSummary(
        baseSummary,
        `${englishName} equipment entry from the Player Core table.`,
        `Entrada de equipo ${englishName} de la tabla de Player Core.`
      ),
      source: { book: PLAYER_CORE_SOURCE, page },
      ruleset: "remaster",
      needs_review: false
    });
  });
});

// Compatibilidade trilíngue para os catálogos legados que já existiam no builder.
// Os dados mecânicos e a proveniência permanecem os mesmos; este bloco só
// normaliza o contrato consumido pelos pickers React e legado.
const LEGACY_COMPANION_METADATA = {
  "pet.wolf": ["Lobo", "Wolf Companion", "Compañero lobo", "Companheiro veloz que ajuda a flanquear e derrubar inimigos.", "Fast companion that helps flank and trip enemies.", "Compañero veloz que ayuda a flanquear y derribar enemigos."],
  "pet.bear": ["Urso", "Bear Companion", "Compañero oso", "Companheiro resistente com mordidas e garras poderosas.", "Durable companion with powerful jaws and claws.", "Compañero resistente con poderosas mordidas y garras."],
  "pet.horse": ["Cavalo", "Horse Companion / Mount", "Compañero caballo / Montura", "Montaria veloz para investidas e combate montado.", "Fast mount for charges and mounted combat.", "Montura veloz para cargas y combate montado."],
  "pet.bird": ["Pássaro / Coruja", "Bird Companion", "Compañero ave", "Companheiro voador ágil para reconhecimento e ataques precisos.", "Agile flying companion for scouting and precise attacks.", "Compañero volador ágil para explorar y atacar con precisión."],
  "pet.big_cat": ["Gato Grande / Pantera", "Big Cat", "Gran felino / Pantera", "Companheiro furtivo que ajuda a deixar inimigos desprevenidos.", "Stealthy companion that helps leave enemies off-guard.", "Compañero sigiloso que ayuda a dejar desprevenidos a los enemigos."],
  "pet.dromaeosaur": ["Dromaeossauro", "Dromaeosaur Companion", "Compañero dromeosaurio", "Companheiro veloz especializado em cercar e flanquear inimigos.", "Fast companion specialized in surrounding and flanking enemies.", "Compañero veloz especializado en rodear y flanquear enemigos."],
  "pet.badger": ["Texugo", "Badger Companion", "Compañero tejón", "Companheiro resistente que cava e causa dano contínuo.", "Sturdy companion that burrows and deals persistent damage.", "Compañero resistente que excava y causa daño persistente."],
  "pet.familiar": ["Familiar Arcano / Místico", "Familiar", "Familiar arcano / místico", "Familiar que concede habilidades escolhidas ao seu mestre.", "A familiar that grants chosen abilities to its master.", "Familiar que concede habilidades elegidas a su amo."]
};
for (const record of (PF2E_DATA.pets || [])) {
  const metadata = LEGACY_COMPANION_METADATA[record.id];
  if (!metadata) continue;
  const [pt, en, es, ptSummary, enSummary, esSummary] = metadata;
  Object.assign(record, {
    names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }
  });
}

const LEGACY_SUMMARIES = {
  "item.gear.adventurers_pack": ["Kit essencial de exploração com mochila, abrigo, corda, luz e rações.", "Essential exploration kit with backpack, shelter, rope, light, and rations.", "Kit esencial de exploración con mochila, refugio, cuerda, luz y raciones."],
  "item.gear.backpack": ["Mochila que armazena equipamentos e reduz o volume dos primeiros itens guardados.", "A backpack that stores gear and reduces the Bulk of the first stored items.", "Mochila que guarda equipo y reduce la Carga de los primeros objetos almacenados."],
  "item.gear.healers_toolkit": ["Ferramentas necessárias para aplicar Medicina e Tratar Ferimentos.", "Tools required to use Medicine and Treat Wounds.", "Herramientas necesarias para usar Medicina y Tratar Heridas."],
  "item.gear.thieves_toolkit": ["Ferramentas necessárias para abrir fechaduras e desativar armadilhas.", "Tools required to pick locks and disable traps.", "Herramientas necesarias para abrir cerraduras y desactivar trampas."],
  "item.consumable.minor_healing_potion": ["Poção consumível que restaura 1d8 Pontos de Vida.", "A consumable potion that restores 1d8 Hit Points.", "Poción consumible que restaura 1d8 Puntos de Golpe."],
  "item.consumable.lesser_healing_potion": ["Poção consumível que restaura 2d8+5 Pontos de Vida.", "A consumable potion that restores 2d8+5 Hit Points.", "Poción consumible que restaura 2d8+5 Puntos de Golpe."],
  "item.magic.boots_of_elvenkind": ["Botas mágicas que aprimoram Acrobacia e permitem um Passo Élfico.", "Magic boots that improve Acrobatics and grant an Elven Step.", "Botas mágicas que mejoran Acrobacia y conceden un Paso élfico."],
  "item.magic.weapon_potency_1": ["Runa que concede bônus de item +1 nas jogadas de ataque da arma.", "A rune that grants a +1 item bonus to the weapon's attack rolls.", "Runa que concede un bonificador de objeto +1 a las tiradas de ataque del arma."],
  "form.alch.elixir_of_life_lesser": ["Fórmula de elixir alquímico que restaura Pontos de Vida.", "Formula for an alchemical elixir that restores Hit Points.", "Fórmula de un elixir alquímico que restaura Puntos de Golpe."],
  "form.alch.alchemists_fire_lesser": ["Fórmula de bomba alquímica que causa dano de fogo e fogo persistente.", "Formula for an alchemical bomb that deals fire and persistent fire damage.", "Fórmula de una bomba alquímica que causa daño de fuego y fuego persistente."],
  "form.alch.antidote_lesser": ["Fórmula de elixir que protege contra venenos.", "Formula for an elixir that protects against poisons.", "Fórmula de un elixir que protege contra venenos."],
  "form.alch.silversheen": ["Fórmula de revestimento alquímico que faz uma arma contar como prata.", "Formula for an alchemical coating that makes a weapon count as silver.", "Fórmula de un recubrimiento alquímico que hace que un arma cuente como plata."],
  "form.alch.smokestick": ["Fórmula de consumível que cria uma nuvem de fumaça obscurecedora.", "Formula for a consumable that creates an obscuring cloud of smoke.", "Fórmula de un consumible que crea una nube de humo que oscurece."],
  "form.pot.minor_healing_potion": ["Fórmula para fabricar uma Poção de Cura Menor.", "Formula for crafting a Minor Healing Potion.", "Fórmula para fabricar una Poción de curación menor."],
  "form.snare.spike_snare": ["Fórmula de armadilha que causa dano perfurante quando acionada.", "Formula for a snare that deals piercing damage when triggered.", "Fórmula de una trampa que causa daño perforante al activarse."]
};
for (const category of ["items", "formulas"]) {
  for (const record of (PF2E_DATA[category] || [])) {
    const summary = LEGACY_SUMMARIES[record.id];
    if (summary) record.summaries = { "pt-BR": summary[0], en: summary[1], es: summary[2] };
  }
}

// Aliases históricos usados por fichas antigas apontam para as entradas
// verificadas dos suplementos, mantendo a seleção compatível sem duplicar
// regras ou perder a fonte original.
const LEGACY_RECORD_ALIASES = [
  [PF2E_DATA.ancestries, "Athamaru (Povo-Peixe)", "Athamaru"],
  [PF2E_DATA.ancestries, "Surki (Povo-Inseto)", "Surki"],
  [PF2E_DATA.ancestries, "Tritão / Sereia (Merfolk)", "Povo-Sereia (Merfolk)"],
  [PF2E_DATA.classes, "Exemplar (Exemplar)", "Exemplar"]
];
for (const [collection, alias, canonical] of LEGACY_RECORD_ALIASES) {
  if (!collection?.[alias] || !collection?.[canonical]) continue;
  const legacySubclasses = Array.isArray(collection[alias].subclasses) ? [...collection[alias].subclasses] : null;
  Object.assign(collection[alias], collection[canonical], {
    id: `${collection[canonical].id}.legacy_alias.${alias.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`,
    name: alias
  });
  if (legacySubclasses && legacySubclasses.length > (collection[canonical].subclasses?.length || 0)) {
    collection[alias].subclasses = legacySubclasses;
  }
}

const HOWL_WILD_BEASTKIN = (PF2E_DATA.versatileHeritages || []).find((record) => record.name === "Beastkin (Toque Bestial / Teriantropo)");
if (HOWL_WILD_BEASTKIN) {
  Object.assign(HOWL_WILD_BEASTKIN, {
    id: "heritage.beastkin",
    names: { "pt-BR": "Beastkin", en: "Beastkin", es: "Bestial" },
    summaries: {
      "pt-BR": "Herança versátil que manifesta uma forma bestial e adaptações de animal.",
      en: "A versatile heritage that manifests a bestial form and animal adaptations.",
      es: "Una herencia versátil que manifiesta una forma bestial y adaptaciones animales."
    },
    source: { book: HOWL_WILD_SOURCE, page: 77 },
    ruleset: "remaster",
    needs_review: false
  });
}

// Howl of the Wild p. 19: Coral Athamaru's coral plates are a natural
// medium armor entry, not the generic heavy armor placeholder used before.
const coralPlateArmor = (PF2E_DATA.armors || []).find((record) => record.id === "armor.coral_plate");
if (coralPlateArmor) {
  Object.assign(coralPlateArmor, {
    category: "Média",
    acBonus: 4,
    dexCap: 1,
    checkPenalty: -2,
    speedPenalty: -5,
    strReq: 16,
    traits: ["Aquadinâmica", "Confortável"],
    description: "Placas de coral natural que cobrem o corpo de athamaru; não podem ser removidas e aceitam runas de armadura.",
    summaries: {
      "pt-BR": "Armadura média natural de coral para athamaru, com CA +4, limite de Destreza +1 e traços aquadinâmica e confortável.",
      en: "Natural medium coral armor for athamarus with +4 AC, a +1 Dexterity cap, and aquadynamic and comfort traits.",
      es: "Armadura media natural de coral para athamarus con +4 CA, límite de Destreza +1 y rasgos acuadinámica y cómoda."
    },
    source: { book: HOWL_WILD_SOURCE, page: 19 },
    ruleset: "remaster",
    needs_review: false
  });
}

const HOWL_WILD_ARCHETYPES = [
  ["archetype.beastmaster_howl_expansion", "Expansão do Mestre das Feras", "Beastmaster Expansion", "Expansión del Maestro de bestias", 66, "Expande as opções de companheiros e a progressão do arquétipo Mestre das Feras.", "Expands companion options and the Beastmaster archetype progression.", "Amplía las opciones de compañeros y la progresión del arquetipo Maestro de bestias."],
  ["archetype.clawdancer", "Dançarino das Garras", "Clawdancer", "Danzagarras", 68, "Arquétipo marcial que transforma movimento e ataques naturais em uma dança predatória.", "A martial archetype that turns movement and natural attacks into a predatory dance.", "Un arquetipo marcial que convierte el movimiento y los ataques naturales en una danza depredadora."],
  ["archetype.ostilli_host", "Hospedeiro de Ostilli", "Ostilli Host", "Anfitrión ostilli", 70, "Arquétipo que abriga uma criatura ostilli simbiótica e desenvolve seus poderes.", "An archetype that houses a symbiotic ostilli creature and develops its powers.", "Un arquetipo que alberga una criatura ostilli simbiótica y desarrolla sus poderes."],
  ["archetype.swarmkeeper", "Guardião do Enxame", "Swarmkeeper", "Guardián del enjambre", 72, "Arquétipo que conduz e combate ao lado de um enxame de pequenas criaturas.", "An archetype that commands and fights alongside a swarm of tiny creatures.", "Un arquetipo que dirige y combate junto a un enjambre de criaturas diminutas."],
  ["archetype.thlipit_contestant", "Competidor Thlipit", "Thlipit Contestant", "Competidor thlipit", 74, "Arquétipo inspirado no esporte thlipit, com técnicas de arremesso, deslocamento e competição.", "An archetype inspired by the thlipit sport, with throwing, movement, and competition techniques.", "Un arquetipo inspirado en el deporte thlipit, con técnicas de lanzamiento, movimiento y competición."],
  ["archetype.werecreature", "Licantropo", "Werecreature", "Licántropo", 76, "Arquétipo que manifesta uma forma híbrida bestial e poderes de uma criatura metamórfica.", "An archetype that manifests a bestial hybrid form and shapeshifter powers.", "Un arquetipo que manifiesta una forma híbrida bestial y poderes de cambiaformas."],
  ["archetype.wild_mimic", "Mímico Selvagem", "Wild Mimic", "Mímico salvaje", 80, "Arquétipo que imita formas, movimentos e características de animais selvagens.", "An archetype that mimics the forms, movements, and features of wild animals.", "Un arquetipo que imita las formas, movimientos y rasgos de animales salvajes."],
  ["archetype.winged_warrior", "Guerreiro Alado", "Winged Warrior", "Guerrero alado", 82, "Arquétipo aéreo que combina voo, mobilidade e combate marcial.", "An aerial archetype combining flight, mobility, and martial combat.", "Un arquetipo aéreo que combina vuelo, movilidad y combate marcial."]
];
for (const [id, pt, en, es, page, ptSummary, enSummary, esSummary] of HOWL_WILD_ARCHETYPES) {
  if ((PF2E_DATA.archetypes || []).some((record) => record.id === id)) continue;
  PF2E_DATA.archetypes.push({
    id, name: `${pt} (${en})`, subtype: "standard", names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    source: { book: HOWL_WILD_SOURCE, page }, ruleset: "remaster", needs_review: false
  });
}

const HOWL_WILD_COMPANIONS = [
  ["pet.howl.antelope", "Antílope", "Antelope", "Antílope", 91, "Companheiro veloz e montável que pode causar sangramento persistente.", "A swift mount companion that can cause persistent bleed damage.", "Compañero veloz y montable que puede causar daño persistente por sangrado."],
  ["pet.howl.elk", "Alce", "Elk", "Alce", 91, "Companheiro montável que intimida inimigos com seus chifres.", "A mount companion that frightens enemies with its antlers.", "Compañero montable que asusta a los enemigos con sus astas."],
  ["pet.howl.flying_squirrel", "Esquilo Voador", "Flying Squirrel", "Ardilla voladora", 92, "Companheiro que plana e dificulta o deslocamento dos inimigos.", "A companion that glides and hampers enemy movement.", "Compañero que planea y dificulta el movimiento enemigo."],
  ["pet.howl.giraffe", "Girafa", "Giraffe", "Jirafa", 92, "Companheiro montável de pescoço longo que amplia manobras de Empurrar.", "A long-necked mount that improves Shove maneuvers.", "Montura de cuello largo que mejora las maniobras de Empujar."],
  ["pet.howl.kangaroo", "Canguru", "Kangaroo", "Canguro", 92, "Companheiro saltador que combina mobilidade e ataques corporais.", "A leaping companion combining mobility and natural attacks.", "Compañero saltador que combina movilidad y ataques naturales."],
  ["pet.howl.mongoose", "Mangusto", "Mongoose", "Mangosta", 93, "Companheiro ágil que protege criaturas próximas contra flanqueamento.", "An agile companion that protects nearby creatures from flanking.", "Compañero ágil que protege a criaturas cercanas contra el flanqueo."],
  ["pet.howl.salamander", "Salamandra", "Salamander", "Salamandra", 93, "Companheiro anfíbio que secreta veneno e nada em águas rasas.", "An amphibious companion that secretes poison and swims in shallow water.", "Compañero anfibio que secreta veneno y nada en aguas poco profundas."],
  ["pet.howl.giant_eel", "Enguia Gigante", "Giant Eel", "Anguila gigante", 94, "Companheiro aquático avançado que cria ângulos inesperados para flanquear.", "An advanced aquatic companion that creates unexpected flanking positions.", "Compañero acuático avanzado que crea posiciones inesperadas de flanqueo."],
  ["pet.howl.giant_frog", "Sapo Gigante", "Giant Frog", "Rana gigante", 94, "Companheiro anfíbio avançado com língua de longo alcance e controle de reações.", "An advanced amphibious companion with a long-range tongue and reaction control.", "Compañero anfibio avanzado con lengua de largo alcance y control de reacciones."],
  ["pet.howl.hippogriff", "Hipogrifo", "Hippogriff", "Hipogrifo", 95, "Companheiro voador avançado para montaria e ataques aéreos.", "An advanced flying companion for mounted and aerial attacks.", "Compañero volador avanzado para ataques montados y aéreos."],
  ["pet.howl.riding_tarantula", "Tarântula de Montaria", "Riding Tarantula", "Tarántula de monta", 96, "Companheiro aracnídeo avançado que escala e perturba ações de concentração.", "An advanced arachnid companion that climbs and disrupts concentrate actions.", "Compañero arácnido avanzado que trepa y perturba acciones de concentración."],
  ["pet.howl.roc", "Roc", "Roc", "Roc", 96, "Companheiro voador colossal avançado capaz de carregar criaturas e empurrá-las.", "A colossal advanced flying companion able to carry and push creatures.", "Compañero volador colosal avanzado capaz de transportar y empujar criaturas."],
  ["pet.howl.umbrella_mushroom", "Cogumelo Guarda-Chuva", "Umbrella Mushroom", "Hongo sombrilla", 96, "Companheiro fungo avançado que flutua e deixa inimigos estupefatos.", "An advanced fungal companion that floats and leaves enemies stupefied.", "Compañero fúngico avanzado que flota y deja a los enemigos estupefactos."]
];
for (const [id, pt, en, es, page, ptSummary, enSummary, esSummary] of HOWL_WILD_COMPANIONS) {
  if ((PF2E_DATA.pets || []).some((record) => record.id === id)) continue;
  PF2E_DATA.pets.push({
    id, name: `${pt} (${en})`, type: "animal_companion", size: "Variável", speed: "Ver descrição",
    attacks: [], supportBenefit: ptSummary, description: ptSummary,
    names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
    source: { book: HOWL_WILD_SOURCE, page }, ruleset: "remaster", needs_review: true
  });
}

const HOWL_WILD_BASIC_COMPANION_STATS = {
  "pet.howl.antelope": { size: "Médio ou Grande", speed: "40 pés", hp: 6, abilityMods: { str: 2, dex: 3, con: 2, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Chifres", bonus: "—", damage: "1d6 perfurante", traits: ["Acurada"] }, { name: "Casco", bonus: "—", damage: "1d4 impacto", traits: ["Ágil", "Acurada"] }], supportBenefit: "Enquanto montado, Golpes que causam dano no alcance do antílope também causam 1d6 de sangramento persistente até o início do seu próximo turno.", specialAbility: "Montaria; Manobra Avançada: Retirada Saltitante." },
  "pet.howl.elk": { size: "Médio ou Grande", speed: "30 pés", hp: 8, abilityMods: { str: 3, dex: 2, con: 2, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Chifres", bonus: "—", damage: "1d8 perfurante", traits: [] }, { name: "Casco", bonus: "—", damage: "1d6 impacto", traits: ["Ágil"] }], supportBenefit: "Até o início do seu próximo turno, se você atingir e causar dano a uma criatura no alcance do alce, ela fica Amedrontada 1.", specialAbility: "Montaria; Manobra Avançada: Catapulta de Chifres." },
  "pet.howl.flying_squirrel": { size: "Pequeno", speed: "25 pés, escalada 25 pés", hp: 6, abilityMods: { str: 2, dex: 3, con: 1, int: -4, wis: 2, cha: 0 }, attacks: [{ name: "Mandíbulas", bonus: "—", damage: "1d6 perfurante", traits: ["Acurada"] }, { name: "Garra", bonus: "—", damage: "1d4 cortante", traits: ["Ágil", "Acurada"] }], supportBenefit: "Até o fim do seu próximo turno, um alvo atingido por seu Golpe no alcance do esquilo sofre –10 pés de penalidade de circunstância em seus Deslocamentos por 1 rodada.", specialAbility: "Planar; Manobra Avançada: Morte do Alto." },
  "pet.howl.giraffe": { size: "Grande", speed: "35 pés", hp: 8, abilityMods: { str: 3, dex: 2, con: 2, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Casco", bonus: "—", damage: "1d6 impacto", traits: ["Ágil"] }, { name: "Pescoço", bonus: "—", damage: "1d4 impacto", traits: ["Não-Letal", "Alcance 10 pés"] }], supportBenefit: "Enquanto montado na girafa, você não precisa de uma mão livre para Empurrar e um inimigo Empurrado move 10 pés (15 pés em sucesso crítico).", specialAbility: "Montaria; Manobra Avançada: Pisão Longo." },
  "pet.howl.kangaroo": { size: "Pequeno", speed: "30 pés", hp: 6, abilityMods: { str: 3, dex: 2, con: 2, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Pé", bonus: "—", damage: "1d6 impacto", traits: ["Ágil"] }], supportBenefit: "Até o início do seu próximo turno, o canguru conta como estando em seu espaço ou em um espaço vazio a até 5 pés para determinar flanqueamento.", specialAbility: "Salto horizontal de até 25 pés; Manobra Avançada: Chute Saltitante." },
  "pet.howl.mole": { size: "Pequeno", speed: "25 pés, escavação 20 pés", hp: 8, abilityMods: { str: 3, dex: 2, con: 2, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Mandíbulas", bonus: "—", damage: "1d8 perfurante", traits: [] }, { name: "Garra", bonus: "—", damage: "1d6 cortante", traits: ["Ágil"] }], supportBenefit: "Até o fim do seu próximo turno, se você atingir e causar dano a uma criatura adjacente à toupeira, ela fica Desajeitada 1 até sair da posição.", specialAbility: "Manobra Avançada: Emboscada Subterrânea." },
  "pet.howl.mongoose": { size: "Pequeno", speed: "25 pés, escavação 10 pés", hp: 4, abilityMods: { str: 2, dex: 3, con: 1, int: -4, wis: 1, cha: 1 }, attacks: [{ name: "Mandíbulas", bonus: "—", damage: "1d6 perfurante", traits: ["Acurada"] }, { name: "Garra", bonus: "—", damage: "1d4 cortante", traits: ["Ágil", "Acurada"] }], supportBenefit: "Até o fim do seu próximo turno, criaturas adjacentes ao mangusto não podem flanquear você.", specialAbility: "Manobra Avançada: Mordida Libertadora." },
  "pet.howl.salamander": { size: "Pequeno", speed: "20 pés, natação 10 pés", hp: 6, abilityMods: { str: 2, dex: 2, con: 2, int: -4, wis: 1, cha: 1 }, attacks: [{ name: "Cauda", bonus: "—", damage: "1d6 impacto", traits: [] }, { name: "Mandíbulas", bonus: "—", damage: "1d4 perfurante", traits: [] }], supportBenefit: "Até o início do seu próximo turno, uma criatura adjacente que atingir você ou a salamandra sofre 1d6 de dano de veneno.", specialAbility: "Visão no escuro; Manobra Avançada: Varredura Venenosa." }
};
for (const [id, stats] of Object.entries(HOWL_WILD_BASIC_COMPANION_STATS)) {
  const record = (PF2E_DATA.pets || []).find((candidate) => candidate.id === id);
  if (!record) continue;
  Object.assign(record, stats, { needs_review: false });
}

const HOWL_WILD_ADVANCED_COMPANION_STATS = {
  "pet.howl.giant_eel": { requiredLevel: 4, rarity: "uncommon", size: "Grande", speed: "10 pés, natação 40 pés", hp: 4, abilityMods: { str: 3, dex: 1, con: 2, int: -4, wis: 2, cha: 0 }, attacks: [{ name: "Mandíbulas", bonus: "—", damage: "1d8 perfurante", traits: [] }], supportBenefit: "Até o início do seu próximo turno, para determinar flanqueamento a enguia pode contar como estando em seu espaço ou em um espaço vazio a até 10 pés, escolhendo um espaço diferente a cada ataque.", specialAbility: "Aquático, montaria; Manobra Avançada: Estalo Nadador." },
  "pet.howl.giant_frog": { requiredLevel: 6, size: "Grande", speed: "20 pés, escalada 20 pés, natação 25 pés", hp: 6, abilityMods: { str: 2, dex: 2, con: 3, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Mandíbulas", bonus: "—", damage: "1d8 perfurante", traits: [] }, { name: "Língua", bonus: "—", damage: "1d4 impacto", traits: ["Alcance 15 pés"] }], supportBenefit: "Até o início do seu próximo turno, quando você atingir com sucesso uma criatura ameaçada pelo sapo, ela não pode usar reações acionadas por suas ações, a menos que seu nível seja maior que o seu.", specialAbility: "Anfíbio, montaria; Manobra Avançada: Agarrão com a Língua." },
  "pet.howl.hippogriff": { requiredLevel: 14, size: "Grande", speed: "30 pés, voo 60 pés", hp: 8, abilityMods: { str: 2, dex: 2, con: 2, int: -4, wis: 2, cha: 0 }, attacks: [{ name: "Bico", bonus: "—", damage: "1d6 perfurante", traits: [] }, { name: "Garra", bonus: "—", damage: "1d4 cortante", traits: ["Ágil"] }], supportBenefit: "Enquanto montado e após mover-se 10 pés ou mais antes de um Golpe corpo a corpo, adicione ao dano um bônus de circunstância igual ao dobro dos dados de dano da arma.", specialAbility: "Montaria; Manobra Avançada: Retirada Aérea." },
  "pet.howl.riding_tarantula": { requiredLevel: 6, size: "Grande", speed: "30 pés, escalada 30 pés", hp: 4, abilityMods: { str: 2, dex: 3, con: 1, int: -4, wis: 2, cha: 0 }, attacks: [{ name: "Presas", bonus: "—", damage: "1d6 perfurante mais veneno", traits: ["Acurada"] }, { name: "Perna", bonus: "—", damage: "1d4 perfurante", traits: ["Ágil", "Acurada"] }], supportBenefit: "Até o início do seu próximo turno, uma criatura atingida por seu Golpe que esteja no alcance da tarântula deve passar em um teste simples CD 5 ao usar uma ação de concentração ou perde a ação.", specialAbility: "Montaria a partir do 8º nível; Manobra Avançada: Rajada de Pelos." },
  "pet.howl.roc": { requiredLevel: 16, rarity: "uncommon", size: "Enorme", speed: "15 pés, voo 60 pés", hp: 8, abilityMods: { str: 3, dex: 1, con: 3, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Bico", bonus: "—", damage: "1d10 perfurante", traits: [] }, { name: "Garra", bonus: "—", damage: "1d8 cortante mais Agarrar", traits: ["Ágil"] }], supportBenefit: "Até o início do seu próximo turno, seus Golpes que causam dano a uma criatura ameaçada pelo roc empurram o alvo 5 pés para longe do roc.", specialAbility: "Montaria; Manobra Avançada: Arrebatar." },
  "pet.howl.umbrella_mushroom": { requiredLevel: 14, rarity: "uncommon", size: "Grande", speed: "15 pés, voo 30 pés", hp: 6, abilityMods: { str: 2, dex: 2, con: 3, int: -4, wis: 1, cha: 0 }, attacks: [{ name: "Haste", bonus: "—", damage: "1d8 impacto", traits: [] }], supportBenefit: "Até o início do seu próximo turno, seus Golpes que causam dano a uma criatura no alcance do cogumelo deixam o alvo Estupefato 1 por 1 rodada; o efeito tem o traço veneno.", specialAbility: "Traço fungo, montaria; reação avançada Flutuar ao cair." }
};
for (const [id, stats] of Object.entries(HOWL_WILD_ADVANCED_COMPANION_STATS)) {
  const record = (PF2E_DATA.pets || []).find((candidate) => candidate.id === id);
  if (!record) continue;
  Object.assign(record, stats, { needs_review: false });
}

// Magias de Howl of the Wild confirmadas no sumário e nas entradas do PDF
// local (pp. 85-88). Os resumos são descrições de catálogo; o texto integral
// de regras continua sendo consultado na fonte para evitar uma transcrição
// parcial apresentada como regra completa.
const HOWL_WILD_SPELLS = [
  ["spell.howl.albatross_curse", "Maldição do Albatroz", "Albatross Curse", "Maldición del albatros", 2, ["occult", "primal"], 85, "Amaldiçoa uma criatura com azar e limita sua capacidade de voar ou se manter segura.", "Curses a creature with misfortune and limits its ability to fly or remain safe.", "Maldice a una criatura con infortunio y limita su capacidad de volar o mantenerse a salvo."],
  ["spell.howl.antlion_trap", "Armadilha de Formigueiro-Leão", "Antlion Trap", "Trampa de hormiguero", 3, ["primal"], 85, "Cria uma armadilha escavada que prende e pune criaturas que atravessam a área.", "Creates a dug trap that restrains and punishes creatures crossing the area.", "Crea una trampa excavada que retiene y castiga a las criaturas que cruzan el área."],
  ["spell.howl.camel_spit", "Cuspe de Camelo", "Camel Spit", "Escupitajo de camello", 1, ["arcane", "primal"], 85, "Lança um jato corrosivo de cuspe contra um alvo distante.", "Projects a corrosive spit attack at a distant target.", "Proyecta un ataque de saliva corrosiva contra un objetivo distante."],
  ["spell.howl.claws_of_the_otter", "Garras da Lontra", "Claws of the Otter", "Garras de la nutria", 2, ["divine", "primal"], 85, "Concede garras e adaptações de lontra para lutar e se mover na água.", "Grants otter claws and adaptations for fighting and moving through water.", "Concede garras y adaptaciones de nutria para luchar y moverse en el agua."],
  ["spell.howl.confusing_cry", "Grito Confuso", "Confusing Cry", "Grito confuso", 5, ["divine", "primal"], 85, "Um chamado desconcertante confunde criaturas na área e atrapalha suas ações.", "A disorienting cry confuses creatures in the area and disrupts their actions.", "Un grito desconcertante confunde a las criaturas del área y perturba sus acciones."],
  ["spell.howl.croak_voice", "Voz de coaxar", "Croak Voice", "Voz de croar", 3, ["arcane", "primal"], 85, "Transforma a voz em um coaxar sobrenatural com efeitos sonoros e aquáticos.", "Transforms the voice into a supernatural croak with sonic and aquatic effects.", "Transforma la voz en un croar sobrenatural con efectos sónicos y acuáticos."],
  ["spell.howl.foraging_friends", "Amigos Forrageadores", "Foraging Friends", "Amigos forrajeadores", 1, ["primal"], 86, "Convoca pequenos ajudantes animais para procurar recursos e auxiliar a exploração.", "Calls small animal helpers to forage for resources and aid exploration.", "Llama a pequeños ayudantes animales para buscar recursos y ayudar en la exploración."],
  ["spell.howl.frog_tongue", "Língua de Sapo", "Frog Tongue", "Lengua de rana", 2, ["primal"], 86, "Estende uma língua pegajosa para alcançar, puxar ou manipular um alvo.", "Extends a sticky tongue to reach, pull, or manipulate a target.", "Extiende una lengua pegajosa para alcanzar, tirar o manipular un objetivo."],
  ["spell.howl.hidebound", "Couro Resistente", "Hidebound", "Piel curtida", 2, ["arcane", "primal"], 86, "Uma reação endurece a pele do alvo para reduzir o impacto de um ataque.", "A reaction hardens the target's hide to reduce the impact of an attack.", "Una reacción endurece la piel del objetivo para reducir el impacto de un ataque."],
  ["spell.howl.hippocampus_retreat", "Retirada do Hipocampo", "Hippocampus Retreat", "Retirada del hipocampo", 1, ["arcane", "primal"], 87, "Permite uma retirada veloz pela água, inspirada na agilidade de um hipocampo.", "Enables a swift retreat through water, inspired by a hippocampus's agility.", "Permite una retirada veloz por el agua, inspirada en la agilidad de un hipocampo."],
  ["spell.howl.luring_wail", "Uivo Atraente", "Luring Wail", "Lamento atrayente", 4, ["occult", "primal"], 87, "Um lamento irresistível atrai criaturas para uma posição escolhida.", "An irresistible wail draws creatures toward a chosen position.", "Un lamento irresistible atrae a las criaturas hacia una posición elegida."],
  ["spell.howl.primal_chorus", "Coro Primal", "Primal Chorus", "Coro primigenio", 3, ["primal"], 87, "Aliados entoam um coro natural que fortalece ataques, sentidos ou coordenação.", "Allies join a natural chorus that bolsters attacks, senses, or coordination.", "Los aliados entonan un coro natural que refuerza ataques, sentidos o coordinación."],
  ["spell.howl.sacred_beasts", "Feras Sagradas", "Sacred Beasts", "Bestias sagradas", 1, ["divine", "primal"], 87, "Invoca a bênção de animais sagrados para proteger ou orientar os alvos.", "Invokes the blessing of sacred animals to protect or guide the targets.", "Invoca la bendición de animales sagrados para proteger u orientar a los objetivos."],
  ["spell.howl.snake_fangs", "Presas de Serpente", "Snake Fangs", "Colmillos de serpiente", 4, ["primal"], 87, "Concede presas venenosas e uma mordida predatória por um período limitado.", "Grants venomous fangs and a predatory bite for a limited duration.", "Concede colmillos venenosos y una mordedura depredadora durante un tiempo limitado."],
  ["spell.howl.summon_stampede", "Invocar Estampida", "Summon Stampede", "Invocar estampida", 7, ["primal"], 88, "Convoca uma estampida de animais que atravessa a área e causa caos e dano.", "Summons a stampede of animals that crosses the area, causing chaos and damage.", "Convoca una estampida de animales que atraviesa el área y causa caos y daño."],
  ["spell.howl.summon_warden_of_the_wild", "Invocar Guardião da Natureza", "Summon Warden of the Wild", "Invocar guardián de lo salvaje", 8, ["primal"], 88, "Invoca um poderoso guardião primal para lutar ao lado do conjurador.", "Summons a powerful primal warden to fight alongside the caster.", "Convoca a un poderoso guardián primigenio para luchar junto al lanzador."]
];
for (const [id, pt, en, es, rank, traditions, page, ptSummary, enSummary, esSummary] of HOWL_WILD_SPELLS) {
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, rank, traditions,
    names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
    description: ptSummary,
    source: { book: HOWL_WILD_SOURCE, page }, ruleset: "remaster", needs_review: false
  });
}

// Índice de equipamentos e armas identificados nas tabelas de Howl of the
// Wild. Cabeçalhos e páginas foram conferidos no PDF local; efeitos, preços e
// requisitos individuais continuam pendentes para não inventar regras.
const HOWL_WILD_EQUIPMENT_INDEX = [
  ["item.howl.hodag_leather", "Couro de Hodag", "Hodag Leather", "Cuero de hodag", 101],
  ["item.howl.mamlambo_scale", "Escama de Mamlambo", "Mamlambo Scale", "Escama de mamlambo", 101],
  ["item.howl.mantis_plate", "Placa de Louva-a-Deus", "Mantis Plate", "Placa de mantis", 101],
  ["item.howl.arctic_worm_chitin_shield", "Escudo de Quitina de Verme Ártico", "Arctic Worm Chitin Shield", "Escudo de quitina de gusano ártico", 101],
  ["item.howl.hippopotamus_klar", "Klar de Hipopótamo", "Hippopotamus Klar", "Klar de hipopótamo", 101],
  ["item.howl.ankhrav_duster", "Poeira de Ankhrav", "Ankhrav Duster", "Polvo de ankhrav", 102],
  ["item.howl.black_scorpion_stingmace", "Maça-Ferrão de Escorpião Negro", "Black Scorpion Stingmace", "Maza aguijón de escorpión negro", 102],
  ["item.howl.bloodgorger_scythe", "Foice Devorasangue", "Bloodgorger Scythe", "Guadaña devoradora de sangre", 102],
  ["item.howl.catoblepas_maul", "Malho de Catoblepas", "Catoblepas Maul", "Gran maza de catoblepas", 103],
  ["item.howl.chimera_flail", "Mangual de Quimera", "Chimera Flail", "Mangual de quimera", 103],
  ["item.howl.giant_squid_lash", "Chicote de Lula Gigante", "Giant Squid Lash", "Látigo de calamar gigante", 104],
  ["item.howl.shuln_fang_katar", "Katar de Presa Shuln", "Shuln Fang Katar", "Katar de colmillo shuln", 104],
  ["item.howl.splithead_bow", "Arco Cabeça-Partida", "Splithead Bow", "Arco cabeza partida", 105],
  ["item.howl.storm_herald", "Arauto da Tempestade", "Storm Herald", "Heraldo de la tormenta", 105],
  ["item.howl.tidal_crossbow", "Besta das Marés", "Tidal Crossbow", "Ballesta de mareas", 106],
  ["item.howl.trollhound_pick", "Picareta de Cão-Troll", "Trollhound Pick", "Pico de sabueso troll", 106],
  ["item.howl.whip_tongue_sling", "Funda Língua-Chicote", "Whip-Tongue Sling", "Honda lengua látigo", 107],
  ["item.howl.alicorn_trigger", "Gatilho de Alicórnio", "Alicorn Trigger", "Gatillo de alicornio", 107],
  ["item.howl.fulmination_fang", "Presa de Fulminação", "Fulmination Fang", "Colmillo de fulminación", 108],
  ["item.howl.howler_pistol", "Pistola Uivante", "Howler Pistol", "Pistola aulladora", 108]
];
for (const [id, pt, en, es, page] of HOWL_WILD_EQUIPMENT_INDEX) {
  if ((PF2E_DATA.items || []).some((record) => record.id === id)) continue;
  PF2E_DATA.items.push({
    id, name: `${pt} (${en})`, category: "Equipamento", subcategory: "Howl of the Wild",
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Entrada de equipamento identificada na tabela de Howl of the Wild, página ${page}; dados mecânicos individuais aguardam conferência.`,
      en: `Equipment entry identified in the Howl of the Wild table on page ${page}; individual mechanics require confirmation.`,
      es: `Entrada de equipo identificada en la tabla de Howl of the Wild, página ${page}; sus reglas individuales requieren confirmación.`
    },
    description: `Cabeçalho de equipamento conferido no PDF local, p. ${page}.`,
    level: 0, price: "—", bulk: "—", traits: [], source: { book: HOWL_WILD_SOURCE, page },
    ruleset: "remaster", needs_review: true
  });
}

// Dedicacoes de arquétipos de engrenagens, confirmadas nas páginas locais
// 49–56. Os talentos posteriores permanecem no backlog até que seus efeitos
// completos sejam catalogados com segurança.
const GUNS_GEARS_DEDICATION_FEATS = [
  ["feat.archetype.inventor_dedication", "Dedicação de Inventor", "Inventor Dedication", "Dedicación de Inventor", 2, 49, ["Inteligência 14"], "archetype.inventor_multiclass", "Dedicação multiclasse para obter uma inovação e treinamento em Manufatura.", "A multiclass dedication that grants an innovation and Crafting training.", "Una dedicación multiclase que concede una innovación y entrenamiento en Artesanía."],
  ["feat.archetype.overwatch_dedication", "Dedicação de Vigilância", "Overwatch Dedication", "Dedicación de Vigilancia", 2, 50, ["Especialista em Percepção"], "archetype.overwatch", "Dedicação para observar o campo de batalha e coordenar aliados.", "A dedication for observing the battlefield and coordinating allies.", "Una dedicación para observar el campo de batalla y coordinar a los aliados."],
  ["feat.archetype.sterling_dynamo_dedication", "Dedicação de Dínamo Esterlino", "Sterling Dynamo Dedication", "Dedicación de Dínamo esterlino", 2, 52, [], "archetype.sterling_dynamo", "Dedicação que concede uma prótese dínamo esterlino personalizável para combate.", "A dedication that grants a customizable sterling dynamo prosthesis for combat.", "Una dedicación que concede una prótesis de dínamo esterlino personalizable para el combate."],
  ["feat.archetype.trapsmith_dedication", "Dedicação de Armadilheiro", "Trapsmith Dedication", "Dedicación de Armero de trampas", 4, 54, ["Dedicação de Snarecrafter ou talento de classe de patrulheiro Especialista em Arapuca"], "archetype.trapsmith", "Dedicação que incorpora engrenagens e vapor à fabricação de arapucas.", "A dedication that incorporates gears and steam into snare crafting.", "Una dedicación que incorpora engranajes y vapor a la fabricación de trampas."],
  ["feat.archetype.trick_driver_dedication", "Dedicação de Condutor Audaz", "Trick Driver Dedication", "Dedicación de Conductor temerario", 2, 55, [], "archetype.trick_driver", "Dedicação para pilotar veículos com manobras agressivas e precisas.", "A dedication for piloting vehicles with aggressive, precise maneuvers.", "Una dedicación para pilotar vehículos con maniobras agresivas y precisas."],
  ["feat.archetype.vehicle_mechanic_dedication", "Dedicação de Mecânico de Veículos", "Vehicle Mechanic Dedication", "Dedicación de Mecánico de vehículos", 2, 56, ["Inteligência +2", "Treinado em Manufatura"], "archetype.vehicle_mechanic", "Dedicação para construir, manter e aprimorar veículos.", "A dedication for building, maintaining, and improving vehicles.", "Una dedicación para construir, mantener y mejorar vehículos."]
];
for (const [id, pt, en, es, level, page, prerequisites, archetypeId, ptSummary, enSummary, esSummary] of GUNS_GEARS_DEDICATION_FEATS) {
  if (!(PF2E_DATA.feats || []).some((candidate) => candidate.id === id)) PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
    description: ptSummary, category: "Arquetipo", type: "Talento", level, prerequisites, prereq: prerequisites,
    archetypeId, traits: ["Arquetipo", "Dedicação"], source: { book: GUNS_GEARS_SOURCE, page }, ruleset: "legacy", needs_review: false
  });
}

// Subclasses eram mantidas apenas como strings dentro de cada classe. Exponha
// também registros reutilizáveis para o portal, filtros e futuras validações,
// preservando a origem da classe e sinalizando a ausência de página específica.
const subclassSeen = new Set();
PF2E_DATA.subclasses = [];
for (const [classKey, classRecord] of Object.entries(PF2E_DATA.classes || {})) {
  for (const rawSubclass of (classRecord.subclasses || [])) {
    const label = String(rawSubclass || "").trim();
    if (!label) continue;
    const match = label.match(/^(.*?)\s*\(([^()]+)\)$/);
    const pt = (match?.[1] || label).trim();
    const en = (match?.[2] || label).trim();
    const classId = classRecord.id || classKey.toLowerCase().replace(/[^a-z0-9]+/gi, "_");
    const slug = `${classId}.${en}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (subclassSeen.has(slug)) continue;
    subclassSeen.add(slug);
    PF2E_DATA.subclasses.push({
      id: `subclass.${slug}`,
      classId,
      className: classKey,
      name: `${pt} (${en})`,
      names: { "pt-BR": pt, en, es: en },
      summaries: {
        "pt-BR": `Subclasse de ${classRecord.names?.["pt-BR"] || classKey}; escolha e regras detalhadas devem ser confirmadas na fonte específica.`,
        en: `Subclass of ${classRecord.names?.en || classKey}; confirm the specific source for its detailed choice and rules.`,
        es: `Subclase de ${classRecord.names?.es || classKey}; confirma la fuente específica para su elección y reglas detalladas.`
      },
      ruleset: classRecord.ruleset || "needs_review",
      needs_review: true,
      source: undefined
    });
  }
}

// As subclasses derivadas preservam a referência da seção da classe até que
// a página individual de cada especialização seja conferida. A flag mantém
// essa referência auditável sem promover o registro a regra verificada.
for (const subclass of PF2E_DATA.subclasses) {
  const classRecord = Object.values(PF2E_DATA.classes || {}).find((candidate) => candidate?.id === subclass.classId);
  if (classRecord?.source?.book && Number.isInteger(classRecord.source.page)) {
    subclass.source = { book: classRecord.source.book, page: classRecord.source.page };
    subclass.sourceApproximate = true;
  }
}

// Livro do Jogador Remaster, pp. 114-115: o Patrono determina tradição,
// perícia, lição/hex inicial, magia e habilidade patronal do familiar.
const PLAYER_CORE_WITCH_PATRONS = [
  ["faiths_flamekeeper", "Guardião da Fé Irrefreável", "Faith's Flamekeeper", "Guardián de la Fe Inquebrantable", 114, "divine", "religion", "Lição do Abraço do Fervor", "Lesson of Fervor's Embrace", "Lección del Abrazo del Fervor", "Avivar o Coração", "Stoke the Heart", "Avivar el Corazón", "Comando", "Command", "Orden imperiosa", "Familiar do Espírito Restaurado", "Familiar of Restored Spirit", "Familiar del Espíritu Restaurado"],
  ["wilding_steward", "Sentinela dos Ermos", "Wilding Steward", "Guardián de las Tierras Salvajes", 114, "primal", "nature", "Lição da Fala Selvagem", "Lesson of Wild Speech", "Lección del Habla Salvaje", "Palavra dos Ermos", "Wilding Word", "Palabra Salvaje", "Convocar Animal ou Convocar Planta ou Fungo", "Summon Animal or Summon Plant or Fungus", "Convocar Animal o Convocar Planta u Hongo", "Familiar dos Sentidos Aguçados", "Familiar of Keen Senses", "Familiar de Sentidos Agudos"],
  ["the_inscribed_one", "O Inscrito", "The Inscribed One", "El Inscrito", 114, "arcane", "arcana", "Lição da Supremacia dos Glifos", "Lesson of Glyph's Supremacy", "Lección de la Supremacía de los Glifos", "Discernir Segredos", "Discern Secrets", "Discernir Secretos", "Arma Rúnica", "Runic Weapon", "Arma Rúnica", "Familiar da Escrita Fluida", "Familiar of Flowing Script", "Familiar de Escritura Fluida"],
  ["the_resentment", "O Ressentimento", "The Resentment", "El Resentimiento", 115, "occult", "occultism", "Lição da Impermanência da Força", "Lesson of Strength's Impermanence", "Lección de la Impermanencia de la Fuerza", "Mau-Olhado", "Evil Eye", "Mal de Ojo", "Enfraquecer", "Enfeeble", "Debilitar", "Familiar da Miséria Persistente", "Familiar of Ongoing Misery", "Familiar de la Miseria Persistente"],
  ["spinner_of_threads", "O Tecelão de Destinos", "Spinner of Threads", "Tejedor de Destinos", 115, "occult", "occultism", "Lição das Vicissitudes do Destino", "Lesson of Fate's Vicissitudes", "Lección de las Vicisitudes del Destino", "Tocar o Destino", "Nudge Fate", "Tocar el Destino", "Golpe Certeiro", "Sure Strike", "Golpe Certero", "Familiar da Sorte Equilibrada", "Familiar of Balanced Luck", "Familiar de la Suerte Equilibrada"],
  ["silence_in_snow", "O Silêncio Invernal", "Silence in Snow", "Silencio Invernal", 115, "primal", "nature", "Lição do Frio Invernal", "Lesson of Winter's Chill", "Lección del Frío Invernal", "Gelo Duradouro", "Clinging Ice", "Hielo Persistente", "Lufada de Vento", "Gust of Wind", "Ráfaga de Viento", "Familiar da Geada Congelante", "Familiar of Freezing Rime", "Familiar de Escarcha Helada"],
  ["starless_shadow", "A Sombra Inconstelada", "Starless Shadow", "Sombra sin Estrellas", 115, "occult", "occultism", "Lição dos Terrores da Noite", "Lesson of Night's Terrors", "Lección de los Terrores Nocturnos", "Mortalha da Noite", "Shroud of Night", "Sudario de la Noche", "Medo", "Fear", "Miedo", "Familiar da Noite que Espreita", "Familiar of Stalking Night", "Familiar de la Noche Acechante"]
].map(([slug, pt, en, es, page, tradition, patronSkill, lessonPt, lessonEn, lessonEs, hexPt, hexEn, hexEs, spellPt, spellEn, spellEs, abilityPt, abilityEn, abilityEs]) => ({
  slug, page, tradition, patronSkill, hexSpellId: `spell.player_core.witch.${slug}`, names: { "pt-BR": pt, en, es },
  initialLesson: { "pt-BR": lessonPt, en: lessonEn, es: lessonEs },
  hexCantrip: { "pt-BR": hexPt, en: hexEn, es: hexEs },
  familiarSpell: { "pt-BR": spellPt, en: spellEn, es: spellEs },
  familiarAbility: { "pt-BR": abilityPt, en: abilityEn, es: abilityEs }
}));
for (const patron of PLAYER_CORE_WITCH_PATRONS) {
  const record = PF2E_DATA.subclasses.find((candidate) => candidate.classId === "class.witch" && candidate.names?.en === `${patron.names.en} / ${patron.names.es}`);
  if (!record) continue;
  Object.assign(record, patron, {
    id: `subclass.class.witch.patron_${patron.slug}`,
    name: `${patron.names["pt-BR"]} (${patron.names.en} / ${patron.names.es})`,
    patron: true,
    summaries: {
      "pt-BR": `Patrono de Bruxa da tradição ${patron.tradition}; concede ${patron.hexCantrip["pt-BR"]} e ${patron.familiarAbility["pt-BR"]}.`,
      en: `Witch patron of the ${patron.tradition} tradition; grants ${patron.hexCantrip.en} and ${patron.familiarAbility.en}.`,
      es: `Patrón de Bruja de tradición ${patron.tradition}; concede ${patron.hexCantrip.es} y ${patron.familiarAbility.es}.`
    },
    source: { book: PLAYER_CORE_SOURCE, page: patron.page }, sourceApproximate: false, ruleset: "remaster", needs_review: false
  });
}

// Livro do Jogador Remaster, p. 183: a tese arcana é uma escolha independente
// da escola. Mantê-la como opção própria evita que trocar a tese sobrescreva
// o currículo/escola já escolhido pelo Mago.
const PLAYER_CORE_WIZARD_THESES = [
  ["spell_blending", "Mescla de Magia", "Spell Blending", "Mezcla de conjuros", "Troca dois espaços de mesmo ranque por um espaço até dois ranques maior durante as preparações.", "Trades two same-rank slots for one slot up to two ranks higher during daily preparations.", "Cambia dos espacios del mismo rango por uno de hasta dos rangos mayor durante las preparaciones."],
  ["experimental_spellshape", "Moldamagia Experimental", "Experimental Spellshape", "Moldeado de conjuros experimental", "Concede um talento de moldamagia de Mago de 1º nível e permite trocar a escolha nas preparações a partir do 4º nível.", "Grants a 1st-level Wizard spellshape feat and allows changing it during preparations from 4th level.", "Otorga una dote de moldeado de conjuros de Mago de nivel 1 y permite cambiarla durante las preparaciones desde nivel 4."],
  ["staff_nexus", "Nexo de Cajado", "Staff Nexus", "Nexo de bastón", "Concede um cajado improvisado e permite carregar o cajado durante as preparações diárias.", "Grants an improvised staff and lets you charge the staff during daily preparations.", "Otorga un bastón improvisado y permite cargarlo durante las preparaciones diarias."],
  ["improved_familiar_attunement", "Sintonização com Familiar Aprimorada", "Improved Familiar Attunement", "Sintonización mejorada con familiar", "Concede Familiar, uma habilidade adicional e Drenar Familiar em vez de Drenar Item Vinculado.", "Grants Familiar, one extra familiar ability, and Drain Familiar instead of Drain Bonded Item.", "Otorga Familiar, una habilidad adicional y Drenar Familiar en vez de Drenar objeto vinculado."],
  ["spell_substitution", "Substituição de Magia", "Spell Substitution", "Sustitución de conjuros", "Permite gastar 10 minutos para trocar uma magia preparada por outra do grimório em um espaço vazio.", "Lets you spend 10 minutes to replace a prepared spell with another spell from your spellbook in an empty slot.", "Permite gastar 10 minutos para sustituir un conjuro preparado por otro del libro de conjuros en un espacio vacío."]
];
const PLAYER_CORE_WIZARD_SCHOOLS = [
  ["ars_grammatica", "Escola da Ars Grammatica", "School of Ars Grammatica", "Escuela de Ars Grammatica", 186, "Guarita de Proteção", "Protective Wards", "Guardas protectoras"],
  ["protean_form", "Escola da Forma Proteana", "School of the Protean Form", "Escuela de la Forma Proteica", 187, "Embaralhar Corpo", "Scramble Body", "Desordenar cuerpo"],
  ["boundary", "Escola dos Limiares", "School of the Boundary", "Escuela de los Límites", 187, "Fortificar Convocação", "Fortify Summoning", "Fortalecer invocación"],
  ["battle_magic", "Escola da Magia Bélica", "School of Battle Magic", "Escuela de Magia Bélica", 188, "Raio de Força", "Force Bolt", "Rayo de fuerza"],
  ["civic_magic", "Escola da Magia Cívica", "School of Civic Magic", "Escuela de Magia Cívica", 188, "Terraplenagem", "Earthworks", "Movimiento de tierras"],
  ["mentalism", "Escola do Mentalismo", "School of Mentalism", "Escuela del Mentalismo", 188, "Ímpeto Cativante", "Charming Push", "Impulso encantador"],
  ["unified_magical_theory", "Escola da Teoria Mágica Unificada", "School of Unified Magical Theory", "Escuela de Teoría Mágica Unificada", 188, "Mão do Aprendiz", "Hand of the Apprentice", "Mano del aprendiz"]
];
for (const [slug, pt, en, es, page, spellPt, spellEn, spellEs] of PLAYER_CORE_WIZARD_SCHOOLS) {
  const record = PF2E_DATA.subclasses.find((candidate) => candidate.classId === "class.wizard" && candidate.names?.en === `${en} / ${es}`);
  if (!record) continue;
  Object.assign(record, {
    id: `subclass.class.wizard.school_${slug}`, school: true,
    name: `${pt} (${en} / ${es})`, names: { "pt-BR": pt, en, es },
    initialSchoolSpell: { "pt-BR": spellPt, en: spellEn, es: spellEs },
    summaries: {
      "pt-BR": `Currículo arcano de Mago; concede a magia de escola inicial ${spellPt}.`,
      en: `Wizard arcane curriculum; grants the initial school spell ${spellEn}.`,
      es: `Plan de estudios arcano de Mago; concede el conjuro inicial de escuela ${spellEs}.`
    },
    source: { book: PLAYER_CORE_SOURCE, page }, sourceApproximate: false, ruleset: "remaster", needs_review: false
  });
}
for (const [slug, pt, en, es, summaryPt, summaryEn, summaryEs] of PLAYER_CORE_WIZARD_THESES) {
  const id = `subclass.class.wizard.thesis_${slug}`;
  if (PF2E_DATA.subclasses.some((record) => record.id === id)) continue;
  PF2E_DATA.subclasses.push({
    id, classId: "class.wizard", className: "Mago (Wizard)", choiceField: "wizardThesis", thesis: true,
    name: `${pt} (${en} / ${es})`, names: { "pt-BR": pt, en, es }, summaries: { "pt-BR": summaryPt, en: summaryEn, es: summaryEs },
    source: { book: PLAYER_CORE_SOURCE, page: 183 }, sourceApproximate: false, ruleset: "remaster", needs_review: false
  });
}

// Segredos da Magia, pp. 62–64: os cinco estudos híbridos são a escolha de
// 1º nível do Magus. Eles não são arquétipos nem opções intercambiáveis de
// outra classe, portanto recebem registros próprios e verificáveis.
const SECRETS_OF_MAGIC_MAGUS_HYBRID_STUDIES = [
  ["twisting_tree", "Árvore Retorcida", "Twisting Tree", "Árbol retorcido", 62, "Transforma o cajado em arma marcial versátil e concede a magia de confluência Cajado Giratório.", "Makes a staff a versatile martial weapon and grants the Spinning Staff conflux spell.", "Convierte un bastón en un arma marcial versátil y concede el conjuro de confluencia Bastón giratorio."],
  ["inexorable_iron", "Ferro Inexorável", "Inexorable Iron", "Hierro inexorable", 62, "Canaliza armas pesadas para resistir ao combate e concede Golpe Estrondoso como magia de confluência.", "Channels heavy weapons to endure combat and grants Thunderous Strike as its conflux spell.", "Canaliza armas pesadas para resistir el combate y concede Golpe atronador como conjuro de confluencia."],
  ["laughing_shadow", "Sombra Jocosa", "Laughing Shadow", "Sombra jocosa", 62, "Aumenta mobilidade e dano contra alvos desprevenidos em Cascata Arcana; concede Agressão Dimensional.", "Improves mobility and damage against off-guard targets in Arcane Cascade; grants Dimensional Assault.", "Mejora movilidad y daño contra objetivos desprevenidos en Cascada arcana; concede Asalto dimensional."],
  ["sparkling_targe", "Targe Cintilante", "Sparkling Targe", "Broquel centelleante", 63, "Aprimora o escudo contra efeitos mágicos em Cascata Arcana e concede Golpe e Escudo.", "Improves a shield against magical effects in Arcane Cascade and grants Shielding Strike.", "Mejora el escudo contra efectos mágicos en Cascada arcana y concede Golpe y escudo."],
  ["starlit_span", "Vão Estrelado", "Starlit Span", "Vano estelar", 63, "Permite Golpe de Magia à distância no primeiro incremento e concede Estrela Cadente.", "Allows ranged Spellstrike within the first range increment and grants Shooting Star.", "Permite Golpe de conjuro a distancia dentro del primer incremento y concede Estrella fugaz."]
];
const MAGUS_CONFLUX_SPELL_BY_STUDY = {
  twisting_tree: "spinning_staff",
  inexorable_iron: "thunderous_strike",
  laughing_shadow: "dimensional_assault",
  sparkling_targe: "shielding_strike",
  starlit_span: "shooting_star"
};
for (const [slug, pt, en, es, page, summaryPt, summaryEn, summaryEs] of SECRETS_OF_MAGIC_MAGUS_HYBRID_STUDIES) {
  const record = PF2E_DATA.subclasses.find((candidate) => candidate.classId === "class.magus" && candidate.names?.en === `${en} / ${es}`);
  if (!record) continue;
  Object.assign(record, {
    id: `subclass.class.magus.hybrid_study_${slug}`, hybridStudy: true,
    confluxSpellId: `spell.secrets_of_magic.magus.${MAGUS_CONFLUX_SPELL_BY_STUDY[slug]}`,
    name: `${pt} (${en} / ${es})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": summaryPt, en: summaryEn, es: summaryEs },
    source: { book: SECRETS_OF_MAGIC_SOURCE, page }, sourceApproximate: false, ruleset: "legacy", needs_review: false
  });
}

// Livro do Jogador 2, pp. 161–163: os oito mistérios Remaster determinam
// as magias de revelação, a perícia concedida e a maldição do Oráculo.
const PLAYER_CORE_2_ORACLE_MYSTERIES = [
  ["ancestors", "Mistério dos Ancestrais", "Ancestors", "Antepasados", 161, "Vozes das gerações passadas guiam e atrapalham suas ações.", "Voices of past generations guide and hinder your actions.", "Las voces de generaciones pasadas guían y dificultan tus acciones."],
  ["battle", "Mistério da Batalha", "Battle", "Batalla", 161, "Forças bélicas concedem poder físico e conhecimento tático.", "Warlike forces grant physical power and tactical knowledge.", "Fuerzas bélicas conceden poder físico y conocimiento táctico."],
  ["flames", "Mistério das Chamas", "Flames", "Llamas", 161, "O fogo alimenta seu poder e exige que você permaneça em movimento.", "Fire fuels your power and demands that you keep moving.", "El fuego alimenta tu poder y exige que sigas moviéndote."],
  ["cosmos", "Mistério dos Cosmos", "Cosmos", "Cosmos", 162, "As estrelas e o espaço entre elas concedem seu poder.", "The stars and the space between them grant your power.", "Las estrellas y el espacio entre ellas conceden tu poder."],
  ["bones", "Mistério dos Ossos", "Bones", "Huesos", 162, "A morte está próxima e os mortos conversam com você.", "Death is close, and the dead speak with you.", "La muerte está cerca y los muertos hablan contigo."],
  ["lore", "Mistério do Saber", "Lore", "Saber", 163, "Conhecimento vasto e avassalador transborda para sua mente.", "Vast and overwhelming knowledge pours into your mind.", "Un conocimiento vasto y abrumador inunda tu mente."],
  ["tempest", "Mistério das Tempestades", "Tempest", "Tempestad", 163, "Ventos, ondas e tempestades respondem ao seu chamado.", "Winds, waves, and storms answer your call.", "Vientos, olas y tormentas responden a tu llamado."],
  ["life", "Mistério da Vida", "Life", "Vida", 163, "As energias vibrantes da vida fluem através de você e pelo mundo.", "The vibrant energies of life flow through you and the world.", "Las energías vibrantes de la vida fluyen por ti y por el mundo."]
];
for (const [slug, pt, en, es, page, summaryPt, summaryEn, summaryEs] of PLAYER_CORE_2_ORACLE_MYSTERIES) {
  const record = PF2E_DATA.subclasses.find((candidate) => candidate.classId === "class.oracle" && candidate.names?.en === `${en} / ${es}`);
  if (!record) continue;
  Object.assign(record, {
    id: `subclass.class.oracle.mystery_${slug}`, mystery: true,
    name: `${pt} (${en} / ${es})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": summaryPt, en: summaryEn, es: summaryEs },
    source: { book: PLAYER_CORE_2_SOURCE, page }, sourceApproximate: false, ruleset: "remaster", needs_review: false
  });
}

const PLAYER_CORE_WITCH_HEX_SUMMARIES = {
  faiths_flamekeeper: { "pt-BR": "O alvo recebe +2 de bônus de estado nas jogadas de dano; aumenta em 1 a cada dois ranques elevados.", en: "The target gains a +2 status bonus to damage rolls, increasing by 1 for every two heightened ranks.", es: "El objetivo obtiene +2 de bonificador de estado al daño, que aumenta en 1 cada dos rangos aumentados." },
  wilding_steward: { "pt-BR": "Protege você da hostilidade do alvo; animais, fungos e plantas sofrem penalidade adicional no salvamento.", en: "Hinders the target from harming you; animals, fungi, and plants take an additional penalty to the save.", es: "Dificulta que el objetivo te dañe; animales, hongos y plantas sufren una penalización adicional a la salvación." },
  the_inscribed_one: { "pt-BR": "Permite ao alvo Buscar, Recordar Conhecimento ou Sentir Motivação como ação livre com +1 de bônus de estado.", en: "Lets the target Seek, Recall Knowledge, or Sense Motive as a free action with a +1 status bonus.", es: "Permite al objetivo Buscar, Recordar Saber o Percibir Motivación como acción libre con +1 de bonificador de estado." },
  the_resentment: { "pt-BR": "Em uma falha de Vontade, o alvo fica enjoado 1, ou enjoado 2 em falha crítica, enquanto o hex for sustentado.", en: "On a failed Will save, the target becomes sickened 1, or sickened 2 on a critical failure, while the hex is sustained.", es: "Con una salvación de Voluntad fallida, el objetivo queda mareado 1, o mareado 2 con fallo crítico, mientras se mantenga el maleficio." },
  spinner_of_threads: { "pt-BR": "Concede retroativamente +1 de bônus de estado quando isso melhorar em um grau um teste recém-falhado do alvo.", en: "Retroactively grants a +1 status bonus when it improves the target's newly failed check by one degree.", es: "Concede retroactivamente +1 de bonificador de estado cuando mejora en un grado una prueba recién fallida del objetivo." },
  silence_in_snow: { "pt-BR": "Causa dano de frio e penalidade de circunstância nas Velocidades do alvo enquanto for sustentado.", en: "Deals cold damage and imposes a circumstance penalty to the target's Speeds while sustained.", es: "Inflige daño de frío e impone una penalización de circunstancia a las Velocidades del objetivo mientras se mantenga." },
  starless_shadow: { "pt-BR": "Uma falha de Vontade envolve o alvo em escuridão, fazendo luz forte contar como luz fraca e criaturas ficarem ocultadas.", en: "A failed Will save shrouds the target in darkness, making bright light count as dim light and creatures concealed.", es: "Una salvación de Voluntad fallida cubre al objetivo de oscuridad, haciendo que la luz brillante cuente como tenue y las criaturas queden ocultas." }
};
for (const patron of PLAYER_CORE_WITCH_PATRONS) {
  if (PF2E_DATA.spells.some((spell) => spell.id === patron.hexSpellId)) continue;
  PF2E_DATA.spells.push({
    id: patron.hexSpellId,
    name: `${patron.hexCantrip["pt-BR"]} (${patron.hexCantrip.en} / ${patron.hexCantrip.es})`,
    names: patron.hexCantrip,
    summaries: PLAYER_CORE_WITCH_HEX_SUMMARIES[patron.slug],
    description: PLAYER_CORE_WITCH_HEX_SUMMARIES[patron.slug]["pt-BR"],
    rank: 1, level: 1, focus: true, cantrip: true, actionType: "one-action", category: "Truque de Sortilégio", type: "Focus Cantrip",
    traditions: [patron.tradition], classId: "class.witch", classIds: ["class.witch"], requiredSubclass: [patron.names["pt-BR"], patron.names.en, patron.names.es],
    traits: ["Bruxo", "Incomum", "Sortilégio", "Truque"],
    source: { book: PLAYER_CORE_SOURCE, page: patron.slug === "spinner_of_threads" ? 375 : 374 }, ruleset: "remaster", needs_review: false
  });
}

// Rótulos históricos do Campeão são mantidos para importar fichas antigas,
// mas não devem competir com as causas remasterizadas no picker atual.
for (const subclass of PF2E_DATA.subclasses) {
  if (subclass.classId === "class.champion" && !subclass.causeId) subclass.legacyAlias = true;
}

// Player Core 2, pp. 90–93: causas remasterizadas do Campeão. Os quatro
// rótulos legados continuam no catálogo para importação, mas estas sete
// opções são as escolhas distintas apresentadas no texto local.
const PLAYER_CORE_2_CHAMPION_CAUSES = [
  ["esplendor", "Causa do Esplendor", "Cause of Splendor", "Causa del esplendor", 90, "sagrado"],
  ["iniquidade", "Causa da Iniquidade", "Cause of Iniquity", "Causa de la iniquidad", 90, "profano"],
  ["libertacao", "Causa da Libertação", "Cause of Liberation", "Causa de la liberación", 91, "sagrado ou profano"],
  ["justica", "Causa da Justiça", "Cause of Justice", "Causa de la justicia", 91, "sagrado ou profano"],
  ["obediencia", "Causa da Obediência", "Cause of Obedience", "Causa de la obediencia", 92, "sagrado ou profano"],
  ["profanacao", "Causa da Profanação", "Cause of Desecration", "Causa de la profanación", 92, "profano"],
  ["redencao", "Causa da Redenção", "Cause of Redemption", "Causa de la redención", 93, "sagrado"],
];
for (const [slug, pt, en, es, page, sanctification] of PLAYER_CORE_2_CHAMPION_CAUSES) {
  const id = `subclass.class.champion.cause_${slug}`;
  if ((PF2E_DATA.subclasses || []).some((record) => record.id === id)) continue;
  PF2E_DATA.subclasses.push({
    id,
    classId: "class.champion",
    className: "Campeão",
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Causa de Campeão com santificação ${sanctification}; efeitos completos pendentes de revisão.`,
      en: `Champion cause with ${sanctification} sanctification; full effects pending review.`,
      es: `Causa de campeón con santificación ${sanctification}; efectos completos pendientes de revisión.`
    },
    causeId: `champion.${slug}`,
    sanctification,
    source: { book: PLAYER_CORE_2_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Player Core 2, pp. 89 e 256-257: a progressão do Campeão é marcial, mas a
// classe recebe uma magia de devoção (magia de foco divina) desde o 1º nível.
// Ela não concede espaços nem truques; o motor usa este perfil somente para
// calcular CD, ataque e reserva de foco da própria classe.
const PLAYER_CORE_2_CHAMPION_FOCUS_SPELLCASTING = {
  tradition: "divine",
  traditionName: "Divina",
  keyAbility: "cha",
  type: "focus",
  initialFocusPoints: 1,
};
const playerCore2Champion = PF2E_DATA.classes["Campeão (Champion / Paladino)"];
if (playerCore2Champion) playerCore2Champion.focusSpellcasting = PLAYER_CORE_2_CHAMPION_FOCUS_SPELLCASTING;

// Player Core 2, pp. 256-257: as seis magias de devoção do Campeão. A fonte
// local confirma nomes, ranques, traços e requisitos; os resumos abaixo são
// estruturados para seleção e permanecem vinculados às páginas editoriais.
const PLAYER_CORE_2_CHAMPION_DEVOTION_SPELLS = [
  ["shields_of_the_spirit", "Escudos do Espírito", "Shields of the Spirit", "Escudos del espíritu", 1, 256, ["Campeão", "Concentração", "Espírito", "Foco", "Santificado"], "Você Ergue seu Escudo e concede +1 de bônus de estado na CA aos aliados em sua aura; atacantes sofrem dano espiritual.", "You Raise your Shield and grant allies in your aura a +1 status bonus to AC; attackers take spirit damage.", "Alzas tu escudo y otorgas a los aliados en tu aura un bonificador de estado +1 a la CA; los atacantes sufren daño espiritual.", { requiresShield: true }],
  ["lay_on_hands", "Imposição de Mãos", "Lay on Hands", "Imposición de manos", 1, 256, ["Campeão", "Cura", "Foco", "Manuseio", "Vitalidade"], "Cura uma criatura viva voluntária ou fere uma criatura morta-viva com vitalidade, concedendo proteção temporária ao aliado curado.", "Heals a willing living creature or harms an undead creature with vitality, granting temporary protection to a healed ally.", "Cura a una criatura viva voluntaria o daña a una criatura no muerta con vitalidad, otorgando protección temporal al aliado curado.", { requiresDeity: true, requiredDivineFont: "heal" }],
  ["touch_of_the_void", "Toque do Vazio", "Touch of the Void", "Toque del vacío", 1, 256, ["Campeão", "Eversão", "Foco", "Manuseio"], "Cura uma criatura morta-viva voluntária ou causa dano eversivo a uma criatura viva, com penalidade de CA em uma falha.", "Heals a willing undead creature or deals void damage to a living creature, with an AC penalty on a failure.", "Cura a una criatura no muerta voluntaria o inflige daño de vacío a una criatura viva, con penalización a la CA en un fallo.", { requiresDeity: true, requiredDivineFont: "harm" }],
  ["spectral_advance", "Avanço Espectral", "Spectral Advance", "Avance espectral", 5, 257, ["Campeão", "Concentração", "Espírito", "Foco", "Polimorfia"], "Move-se em forma espiritual sem ativar reações, ignorando terreno difícil e recebendo resistência durante o deslocamento.", "Move in spiritual form without triggering reactions, ignoring difficult terrain and gaining resistance during the movement.", "Te mueves en forma espiritual sin activar reacciones, ignoras terreno difícil y obtienes resistencia durante el movimiento."],
  ["heros_defiance", "Desafio do Herói", "Hero's Defiance", "Desafío del héroe", 10, 257, ["Campeão", "Concentração", "Cura", "Foco", "Vitalidade"], "Quando um ataque reduziria você a 0 PV, recupera vida antes do dano e pode evitar cair inconsciente ou morrendo.", "When an attack would reduce you to 0 HP, regain health before damage and may avoid becoming unconscious or dying.", "Cuando un ataque te reduciría a 0 PG, recuperas vida antes del daño y puedes evitar quedar inconsciente o moribundo."],
  ["champions_sacrifice", "Sacrifício do Campeão", "Champion's Sacrifice", "Sacrificio del campeón", 6, 257, ["Campeão", "Foco", "Manuseio"], "Em reação, recebe em vez de um aliado os efeitos de um acerto ou falha no salvamento que o atingiria.", "As a reaction, take the effects of a hit or failed save that would affect an ally instead.", "Como reacción, recibes en lugar de un aliado los efectos de un impacto o una salvación fallida que lo afectaría."],
];
for (const [slug, pt, en, es, rank, page, traits, ptSummary, enSummary, esSummary, gates = {}] of PLAYER_CORE_2_CHAMPION_DEVOTION_SPELLS) {
  const id = `spell.player_core_2.champion.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    focus: true, category: "Magia de Devoção", type: "Focus Spell", traditions: ["divine"],
    classId: "class.champion", classIds: ["class.champion"], className: "Campeão", prerequisites: ["Campeão"], requiresSelectedDeity: true, traits,
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary }, description: ptSummary,
    source: { book: PLAYER_CORE_2_SOURCE, page }, ruleset: "remaster", needs_review: false, rarity: "uncommon",
    ...gates,
  });
}

// Normalize heritages kept as historical strings inside ancestry records so
// pickers can enforce ancestry compatibility and the catalog contract.
const heritageSeen = new Set();
PF2E_DATA.heritages = [];
for (const [ancestryKey, ancestryRecord] of Object.entries(PF2E_DATA.ancestries || {})) {
  const ancestryId = ancestryRecord?.id || `ancestry.${String(ancestryKey).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
  const canonicalAncestryId = ancestryId.replace(/\.legacy_alias\..*$/, "");
  const ancestryLabel = ancestryRecord?.names?.["pt-BR"] || ancestryKey;
  for (const rawHeritage of ancestryRecord?.heritages || []) {
    const label = String(rawHeritage || "").trim();
    if (!label) continue;
    const heritageSlug = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const id = `heritage.${canonicalAncestryId}.${heritageSlug}`;
    const existing = PF2E_DATA.heritages.find((candidate) => candidate.id === id);
    if (existing) {
      if (!existing.ancestryIds.includes(ancestryId)) existing.ancestryIds.push(ancestryId);
      continue;
    }
    if (heritageSeen.has(id)) continue;
    heritageSeen.add(id);
    PF2E_DATA.heritages.push({
      id,
      ancestryId: canonicalAncestryId,
      ancestryIds: [ancestryId],
      ancestryName: ancestryKey,
      name: label,
      names: { "pt-BR": label, en: label, es: label },
      summaries: {
        "pt-BR": `Herança de ${ancestryLabel}; texto e tradução da fonte ainda precisam ser confirmados.`,
        en: `Heritage of ${ancestryLabel}; source text and translation still require confirmation.`,
        es: `Herencia de ${ancestryLabel}; el texto y la traducción de la fuente aún deben confirmarse.`
      },
      description: `Herança de ${ancestryLabel}.`,
      type: "Herança",
      ruleset: "needs_review",
      needs_review: true,
      source: undefined
    });
  }
}

// A página inicial da ancestralidade é uma referência de seção útil para
// heranças normalizadas que ainda não têm paginação individual confirmada.
// Mantemos needs_review para não confundir essa pista de proveniência com a
// validação mecânica do texto de cada herança.
for (const heritage of PF2E_DATA.heritages) {
  const ancestry = Object.values(PF2E_DATA.ancestries || {}).find((candidate) =>
    candidate?.id === heritage.ancestryId || candidate?.id === heritage.ancestryIds?.[0]
  );
  if (ancestry?.source?.book && Number.isInteger(ancestry.source.page)) {
    heritage.source = { book: ancestry.source.book, page: ancestry.source.page };
    heritage.sourceApproximate = true;
  }
}

// Battlecry!, p. 12: benefícios das cinco heranças de Jotunnato. Os nomes
// localizados deixam de ser apenas cópias do rótulo em português e os fatos
// mecânicos ficam estruturados para o builder/validador poder evoluir sem
// perder a proveniência da fonte.
const JOTUNBORN_HERITAGE_DETAILS = {
  jotunnato_guardiao: {
    names: { "pt-BR": "Jotunnato Guardião", en: "Keeper Jotunborn", es: "Jotunnato guardián" },
    summaries: {
      "pt-BR": "Você é treinado em Sobrevivência, recebe o talento Rastrear Vida Selvagem e +1 circunstancial para Rastrear animais.",
      en: "You are trained in Survival, gain the Survey Wildlife skill feat, and receive a +1 circumstance bonus to Track animals.",
      es: "Estás entrenado en Supervivencia, obtienes el talento Rastrear fauna y un bonificador circunstancial de +1 para Rastrear animales."
    },
    trainedSkills: ["survival"], grantsFeats: ["Survey Wildlife"], trackAnimalsBonus: 1
  },
  jotunnato_salta_planos: {
    names: { "pt-BR": "Jotunnato Salta-Planos", en: "Plane-Hopper Jotunborn", es: "Jotunnato saltaplanos" },
    summaries: {
      "pt-BR": "Seu tamanho é Médio e você recebe um truque da lista ocultista, conjurado como magia inata ocultista à vontade.",
      en: "Your size is Medium, and you gain one occult cantrip cast as an at-will occult innate spell.",
      es: "Tu tamaño es Mediano y obtienes un truco de la lista ocultista, lanzado como conjuro innato ocultista a voluntad."
    },
    size: "Médio", innateSpellChoice: { tradition: "occult", rank: "half-level-rounded-up", atWill: true }
  },
  jotunnato_sabio: {
    names: { "pt-BR": "Jotunnato Sábio", en: "Sage Jotunborn", es: "Jotunnato sabio" },
    summaries: {
      "pt-BR": "Você é treinado em Sociedade e recebe o talento geral Conhecimento Adicional para um Saber à sua escolha.",
      en: "You are trained in Society and gain the Additional Lore general feat for a Lore of your choice.",
      es: "Estás entrenado en Sociedad y obtienes el talento general Saber adicional para un Saber de tu elección."
    },
    trainedSkills: ["society"], grantsFeats: ["Additional Lore"]
  },
  jotunnato_guerreiro: {
    names: { "pt-BR": "Jotunnato Guerreiro", en: "Warrior Jotunborn", es: "Jotunnato guerrero" },
    summaries: {
      "pt-BR": "O dado de dano do seu punho aumenta para 1d6 e você não sofre penalidade ao fazer um ataque letal com o punho.",
      en: "Your fist's damage die increases to 1d6, and you take no penalty for making a lethal attack with your fist.",
      es: "El dado de daño de tu puño aumenta a 1d6 y no sufres penalización por realizar un Golpe letal con el puño."
    },
    fistDamageDie: "1d6", lethalFistNoPenalty: true
  },
  jotunnato_tecelao: {
    names: { "pt-BR": "Jotunnato Tecelão", en: "Weaver Jotunborn", es: "Jotunnato tejedor" },
    summaries: {
      "pt-BR": "Você é treinado em Manufatura e recebe +1 circunstancial para Perceber ao procurar detalhes ocultos, como portas secretas ou armadilhas.",
      en: "You are trained in Crafting and gain a +1 circumstance bonus to Seek when searching for hidden details such as secret doors or traps.",
      es: "Estás entrenado en Artesanía y obtienes un bonificador circunstancial de +1 a Buscar al buscar detalles ocultos, como puertas secretas o trampas."
    },
    trainedSkills: ["crafting"], seekHiddenDetailsBonus: 1
  }
};
for (const [slug, details] of Object.entries(JOTUNBORN_HERITAGE_DETAILS)) {
  const heritage = PF2E_DATA.heritages.find((candidate) => candidate.id === `heritage.ancestry.jotunborn.${slug}`);
  if (!heritage) continue;
  Object.assign(heritage, details, {
    name: `${details.names["pt-BR"]} (${details.names.en})`,
    description: details.summaries["pt-BR"],
    source: { book: "Battlecry! (Remaster)", page: 12 },
    sourceApproximate: false,
    ruleset: "remaster",
    needs_review: true
  });
}

// Dedicações multiclasse legadas usam o capítulo da classe correspondente
// como referência de seção quando a página própria da dedicação ainda não foi
// conferida no PDF local. Isso melhora a rastreabilidade sem promover a
// entrada a uma regra verificada nem esconder a necessidade de revisão.
const ARCHETYPE_CLASS_SECTION_REFERENCES = {
  "archetype.bard_dedication": "class.bard",
  "archetype.cleric_dedication": "class.cleric",
  "archetype.druid_dedication": "class.druid",
  "archetype.fighter_dedication": "class.fighter",
  "archetype.rogue_dedication": "class.rogue",
  "archetype.wizard_dedication": "class.wizard",
  "archetype.ranger_dedication": "class.ranger",
  "archetype.witch_dedication": "class.witch",
  "archetype.magus_dedication": "class.magus",
  "archetype.summoner_dedication": "class.summoner",
  "archetype.kineticist_dedication": "class.kineticist",
  "archetype.psychic_dedication": "class.psychic",
  "archetype.thaumaturge_dedication": "class.thaumaturge",
  "archetype.exemplar_dedication": "class.exemplar",
  "archetype.animist_dedication": "class.animist"
};
for (const archetype of PF2E_DATA.archetypes || []) {
  if (archetype.source?.book && Number.isInteger(archetype.source.page)) continue;
  const classId = ARCHETYPE_CLASS_SECTION_REFERENCES[archetype.id];
  if (!classId) continue;
  const classRecord = Object.values(PF2E_DATA.classes || {}).find((candidate) => candidate?.id === classId);
  if (!classRecord?.source?.book || !Number.isInteger(classRecord.source.page)) continue;
  archetype.source = { book: classRecord.source.book, page: classRecord.source.page };
  archetype.sourceApproximate = true;
}

// O compêndio expandido reúne entradas do Player Core que foram normalizadas
// antes da paginação individual. Vinculamos cada grupo à seção correspondente
// do PDF local, mas preservamos a revisão pendente e a marca de aproximação.
const COMPENDIUM_SECTION_REFERENCES = [
  { test: (id) => /_(rune|potency|striking|resilient|flaming|frost|shocking|returning|ghost_touch)_/.test(`_${id}_`), page: 308 },
  { test: (id) => /_(spacious_pouch|boots_of_elvenkind|cloak_of_elvenkind|goggles_of_night|wand_of_heal|staff_of_fire)$/.test(id), page: 300 },
  { test: (id) => /_(elixir|potion|alchemist_s_fire|acid_flask|frost_vial|bottled_lightning|tanglefoot_bag|antidote|antiplague|smokestick|sunrod|tindertwig)$/.test(id), page: 294 },
  { test: () => true, page: 291 }
];
for (const record of PF2E_DATA.itemCompendium || []) {
  if (record.source?.book && Number.isInteger(record.source.page)) continue;
  const reference = COMPENDIUM_SECTION_REFERENCES.find(({ test }) => test(String(record.id || "")));
  if (!reference) continue;
  record.source = { book: "Livro do Jogador (Player Core, Remaster)", page: reference.page };
  record.sourceApproximate = true;
}

// Traduções editoriais confirmadas para o primeiro lote do compêndio legado.
// O restante permanece explicitamente sinalizado pela auditoria até receber
// o mesmo tratamento, evitando que uma tradução automática seja apresentada
// como texto final de regra.
const COMPENDIUM_TRANSLATIONS = {
  "item.compendium.adventurer_s_pack": ["Mochila de Aventureiro", "Adventurer's Pack", "Mochila de aventurero", "Mochila contendo saco de dormir, 10 giz, pederneira e isqueiro, corda de 15m, 2 semanas de rações, sabão, 5 tochas e odre.", "A pack containing a bedroll, 10 pieces of chalk, flint and steel, 15m of rope, 2 weeks of rations, soap, 5 torches, and a waterskin.", "Mochila que contiene un saco de dormir, 10 tizas, pedernal y acero, 15 m de cuerda, 2 semanas de raciones, jabón, 5 antorchas y un odre."],
  "item.compendium.air_bladder": ["Bexiga de Ar", "Air Bladder", "Vejiga de aire", "Bolsa estanque de couro que armazena ar suficiente para respirar debaixo d'água por alguns minutos.", "A watertight leather bladder holding enough air to breathe underwater for a few minutes.", "Una bolsa estanca de cuero que contiene aire suficiente para respirar bajo el agua durante unos minutos."],
  "item.compendium.alchemist_s_lab": ["Laboratório de Alquimista", "Alchemist's Lab", "Laboratorio de alquimista", "Laboratório alquímico completo com retortas, destiladores e reagentes para fabricação de itens alquímicos.", "A complete alchemical laboratory with retorts, stills, and reagents for crafting alchemical items.", "Un laboratorio alquímico completo con retortas, destiladores y reactivos para fabricar objetos alquímicos."],
  "item.compendium.alchemist_s_lab_expanded": ["Laboratório de Alquimista (Expandido)", "Alchemist's Lab (Expanded)", "Laboratorio de alquimista (ampliado)", "Laboratório alquímico expandido que concede +1 de bônus de item em testes de Criação alquímica.", "An expanded alchemical laboratory that grants a +1 item bonus to alchemical Crafting checks.", "Un laboratorio alquímico ampliado que concede un bonificador de objeto +1 a las pruebas de Artesanía alquímica."],
  "item.compendium.alchemist_s_toolkit": ["Kit de Alquimista", "Alchemist's Toolkit", "Kit de alquimista", "Kit portátil de ferramentas e frascos alquímicos necessários para criar elixires e bombas em campo.", "A portable kit of tools and alchemical containers needed to create elixirs and bombs in the field.", "Un kit portátil de herramientas y recipientes alquímicos necesarios para crear elixires y bombas en el campo."],
  "item.compendium.animal_blind": ["Abrigo de Observação Animal", "Animal Blind", "Escondite para animales", "Esconderijo portátil camuflado para observar e caçar feras selvagens.", "A portable camouflaged hide for observing and hunting wild beasts.", "Un escondite portátil camuflado para observar y cazar bestias salvajes."],
  "item.compendium.animal_call": ["Chamado de Animal", "Animal Call", "Llamador de animales", "Apito especializado que reproduz o chamado de pássaros e animais de caça.", "A specialized whistle that imitates the calls of birds and hunting animals.", "Un silbato especializado que imita los sonidos de aves y animales de caza."],
  "item.compendium.armored_skirt": ["Saia Blindada", "Armored Skirt", "Falda blindada", "Saia de placas acoplável a armaduras leves ou médias, aumentando o bônus de CA em +1.", "A plate skirt attached to light or medium armor, increasing its AC bonus by 1.", "Una falda de placas que se acopla a armaduras ligeras o medias y aumenta su bonificador de CA en 1."],
  "item.compendium.artisan_s_toolkit": ["Kit de Artesão", "Artisan's Toolkit", "Kit de artesano", "Conjunto de ferramentas para ferraria, carpintaria, cantaria ou costura.", "A set of tools for blacksmithing, carpentry, masonry, or sewing.", "Un conjunto de herramientas para herrería, carpintería, cantería o costura."],
  "item.compendium.artisan_s_toolkit_sterling": ["Kit de Artesão Esterlino", "Artisan's Toolkit (Sterling)", "Kit de artesano (esterlino)", "Ferramentas de alta precisão que concedem +1 de bônus de item em testes de Manufatura.", "High-precision tools that grant a +1 item bonus to Crafting checks.", "Herramientas de alta precisión que conceden un bonificador de objeto +1 a las pruebas de Artesanía."],
  "item.compendium.atmospheric_breathing_suit": ["Traje de Respiração Atmosférica", "Atmospheric Breathing Suit", "Traje de respiración atmosférica", "Traje vedado com filtro mágico para respirar em ambientes com fumaça, gases ou no vácuo.", "A sealed suit with a magical filter for breathing in smoke, gas, or vacuum environments.", "Un traje sellado con un filtro mágico para respirar entre humo, gases o en el vacío."],
  "item.compendium.backpack": ["Mochila", "Backpack", "Mochila", "Mochila de couro resistente. Armazena até 4 de Carga, ignorando os primeiros 2 de Carga dos itens guardados nela.", "A sturdy leather backpack. It holds up to 4 Bulk, ignoring the first 2 Bulk of items stored inside.", "Una mochila de cuero resistente. Guarda hasta 4 de Carga e ignora las primeras 2 de Carga de los objetos almacenados."],
  "item.compendium.bandolier": ["Cartucheira", "Bandolier", "Bandolera", "Cartucheira tiracolo para armazenar até 8 itens de Carga Leve com acesso rápido.", "A shoulder bandolier that stores up to 8 Light Bulk items for quick access.", "Una bandolera para llevar hasta 8 objetos de Carga Ligera con acceso rápido."],
  "item.compendium.bedroll": ["Saco de Dormir", "Bedroll", "Saco de dormir", "Saco de dormir acolchoado para descanso confortável ao ar livre.", "A padded bedroll for comfortable rest outdoors.", "Un saco de dormir acolchado para descansar cómodamente al aire libre."],
  "item.compendium.belt_pouch": ["Bolsa de Cinto", "Belt Pouch", "Bolsa de cinturón", "Pequena bolsa de cinto para moedas, pedras preciosas ou poções.", "A small belt pouch for coins, gemstones, or potions.", "Una pequeña bolsa de cinturón para monedas, gemas o pociones."],
  "item.compendium.caltrops": ["Estrepes", "Caltrops", "Abrojos", "Estrepes de quatro pontas de ferro espalhados no chão para atrasar perseguidores.", "Four-pronged iron spikes scattered on the ground to slow pursuers.", "Púas de hierro de cuatro puntas esparcidas por el suelo para retrasar a los perseguidores."],
  "item.compendium.candle": ["Vela", "Candle", "Vela", "Vela de cera que ilumina um raio de 3m por 8 horas.", "A wax candle that sheds light in a 3-meter radius for 8 hours.", "Una vela de cera que ilumina en un radio de 3 metros durante 8 horas."],
  "item.compendium.chalk_10_pieces": ["Giz (10 pedaços)", "Chalk (10 pieces)", "Tiza (10 piezas)", "10 pedaços de giz coloridos para marcar masmorras e paredes.", "Ten pieces of colored chalk for marking dungeons and walls.", "Diez tizas de colores para marcar mazmorras y paredes."],
  "item.compendium.climbing_kit": ["Kit de Escalada", "Climbing Kit", "Kit de escalada", "Pítons, martelo, crampons e mosquetões para escaladas íngremes.", "Pitons, a hammer, crampons, and carabiners for steep climbs.", "Pitones, un martillo, crampones y mosquetones para escalar pendientes pronunciadas."],
  "item.compendium.compass": ["Bússola", "Compass", "Brújula", "Bússola magnética de bronze que concede +1 de bônus em testes de Sobrevivência para orientar-se.", "A bronze magnetic compass that grants a +1 item bonus to Survival checks to Sense Direction.", "Una brújula magnética de bronce que concede un bonificador de objeto +1 a las pruebas de Supervivencia para orientarse."],
  "item.compendium.crowbar": ["Pé de Cabra", "Crowbar", "Palanca", "Pé de cabra de ferro fundido para forçar portas e abrir baús trancados.", "A cast-iron crowbar for forcing doors and opening locked chests.", "Una palanca de hierro fundido para forzar puertas y abrir cofres cerrados."],
  "item.compendium.disguise_kit": ["Kit de Disfarce", "Disguise Kit", "Kit de disfraces", "Maquiagens, perucas, próteses e tecidos para criar disfarces convincentes com Enganação.", "Makeup, wigs, prosthetics, and fabric for creating convincing Deception disguises.", "Maquillaje, pelucas, prótesis y telas para crear disfraces convincentes con Engaño."],
  "item.compendium.dueling_cape": ["Capa de Duelo", "Dueling Cape", "Capa de duelo", "Capa pesada enrolada no braço usada em duelos para fintar ou aparar golpes (+1 CA).", "A heavy cape wrapped around the arm for feinting or parrying in duels (+1 AC).", "Una capa pesada enrollada en el brazo para fintar o parar golpes en duelos (+1 a la CA)."],
  "item.compendium.fishing_tackle": ["Equipamento de Pesca", "Fishing Tackle", "Equipo de pesca", "Varas, anzóis e redes para pesca de subsistência.", "Rods, hooks, and nets for subsistence fishing.", "Cañas, anzuelos y redes para pescar de subsistencia."],
  "item.compendium.flint_and_steel": ["Pederneira e Isqueiro", "Flint and Steel", "Pedernal y acero", "Pederneira e isqueiro de aço para acender fogueiras e tochas.", "Flint and a steel striker for lighting campfires and torches.", "Pedernal y un encendedor de acero para prender fogatas y antorchas."],
  "item.compendium.grappling_hook": ["Gancho de Escalada", "Grappling Hook", "Garfio de escalada", "Gancho de ferro de 4 garras para amarrar em cordas e escalar muros.", "A four-clawed iron hook for attaching to ropes and scaling walls.", "Un garfio de hierro de cuatro garras para sujetar cuerdas y escalar muros."],
  "item.compendium.healer_s_toolkit": ["Kit de Curandeiro", "Healer's Toolkit", "Kit de curandero", "Bandagens, unguentos, tesouras e talas para Primeiros Socorros e Tratar Ferimentos.", "Bandages, salves, scissors, and splints for First Aid and Treat Wounds.", "Vendajes, ungüentos, tijeras y férulas para Primeros auxilios y Tratar heridas."],
  "item.compendium.lantern_bullseye": ["Lanterna de Foco", "Lantern (Bullseye)", "Linterna de foco", "Lanterna de foco concentrado projetando um cone de luz brilhante de 18m.", "A focused lantern that projects a cone of bright light 18 meters long.", "Una linterna enfocada que proyecta un cono de luz brillante de 18 metros."],
  "item.compendium.lantern_hooded": ["Lanterna Furta-Fogo", "Lantern (Hooded)", "Linterna con capucha", "Lanterna furta-fogo com abas móveis para regular a intensidade da luz.", "A hooded lantern with movable shutters for regulating its light.", "Una linterna con capucha y contraventanas móviles para regular su luz."],
  "item.compendium.lock_simple": ["Cadeado Simples", "Lock (Simple)", "Cerradura simple", "Cadeado comum de ferro com chave (CD 20 para arrombar).", "A common iron lock with a key (DC 20 to Pick).", "Una cerradura común de hierro con llave (CD 20 para Forzarla)."],
  "item.compendium.lock_average": ["Fechadura Média", "Lock (Average)", "Cerradura media", "Fechadura sólida de aço temperado com mecanismo de 4 pinos (CD 25).", "A sturdy tempered-steel lock with a four-pin mechanism (DC 25).", "Una sólida cerradura de acero templado con mecanismo de cuatro pasadores (CD 25)."],
  "item.compendium.magnifying_glass": ["Lupa", "Magnifying Glass", "Lupa", "Lente de aumento para examinar pistas minuciosas (+1 em Percepção e Manufatura).", "A magnifying lens for examining fine clues (+1 to Perception and Crafting).", "Una lente de aumento para examinar pistas minuciosas (+1 a Percepción y Artesanía)."],
  "item.compendium.manacles_simple": ["Algemas Simples", "Manacles (Simple)", "Grilletes simples", "Algemas de ferro forjado para imobilizar prisioneiros.", "Wrought-iron manacles for restraining prisoners.", "Grilletes de hierro forjado para inmovilizar prisioneros."],
  "item.compendium.mirror": ["Espelho", "Mirror", "Espejo", "Pequeno espelho de vidro polido para espiar esquinas sem se expor.", "A small polished-glass mirror for checking around corners without exposing yourself.", "Un pequeño espejo de vidrio pulido para mirar alrededor de esquinas sin exponerse."],
  "item.compendium.oil_1_pint": ["Óleo (1 caneca)", "Oil (1 pint)", "Aceite (1 pinta)", "Óleo combustível para lanternas (queima por 6 horas) ou arremessável.", "Fuel oil for lanterns (burns for 6 hours) or for throwing.", "Aceite combustible para linternas (arde durante 6 horas) o para lanzar."],
  "item.compendium.piton": ["Píton", "Piton", "Pitón", "Píton de aço com olhal para fixação de cordas na rocha.", "A steel spike with an eyelet for securing ropes to rock.", "Una clavija de acero con argolla para fijar cuerdas a la roca."],
  "item.compendium.rations_1_week": ["Rações (1 semana)", "Rations (1 week)", "Raciones (1 semana)", "Rações de viagem não perecíveis (carne seca, nozes, queijo duro e biscoito).", "Nonperishable travel rations (jerky, nuts, hard cheese, and biscuits).", "Raciones de viaje no perecederas (carne seca, frutos secos, queso duro y galletas)."],
  "item.compendium.religious_symbol_wooden": ["Símbolo Religioso (Madeira)", "Religious Symbol (Wooden)", "Símbolo religioso (madera)", "Símbolo sagrado entalhado em madeira para foco divino de clérigos e campeões.", "A holy symbol carved from wood for clerics' and champions' divine focus.", "Un símbolo sagrado tallado en madera que sirve de foco divino para clérigos y campeones."],
  "item.compendium.religious_symbol_silver": ["Símbolo Religioso (Prata)", "Religious Symbol (Silver)", "Símbolo religioso (plata)", "Símbolo sagrado trabalhado em prata maciça finamente polida.", "A holy symbol crafted from finely polished solid silver.", "Un símbolo sagrado fabricado con plata maciza finamente pulida."],
  "item.compendium.rope_50_ft": ["Corda (15 metros)", "Rope (50 ft)", "Cuerda (15 metros)", "Corda de cânhamo trançado de 15 metros com carga de ruptura de 450 kg.", "Fifteen meters of braided hemp rope with a breaking load of 450 kilograms.", "Quince metros de cuerda de cáñamo trenzado con una carga de rotura de 450 kilogramos."],
  "item.compendium.sack": ["Saco", "Sack", "Saco", "Saco de juta para carregar até 8 de Carga de itens diversos.", "A burlap sack that can carry up to 8 Bulk of assorted items.", "Un saco de arpillera que puede llevar hasta 8 de Carga de objetos variados."],
  "item.compendium.scroll_case": ["Estojo de Pergaminho", "Scroll Case", "Estuche de pergaminos", "Tubo cilíndrico de couro encerado para proteger pergaminhos contra água e poeira.", "A waxed-leather cylinder that protects scrolls from water and dust.", "Un tubo cilíndrico de cuero encerado que protege pergaminos del agua y el polvo."],
  "item.compendium.signal_whistle": ["Apito de Sinal", "Signal Whistle", "Silbato de señales", "Apito agudo audível a mais de 800 metros em terreno aberto.", "A shrill whistle audible from more than 800 meters in open terrain.", "Un silbato agudo audible a más de 800 metros en terreno abierto."],
  "item.compendium.soap": ["Sabão", "Soap", "Jabón", "Barra de sabão perfumado para higiene pessoal em viagens.", "A scented bar of soap for personal hygiene while traveling.", "Una pastilla de jabón perfumado para la higiene personal durante los viajes."],
  "item.compendium.spyglass": ["Luneta", "Spyglass", "Catalejo", "Luneta de latão e lentes polidas que aproxima objetos distantes em até 10 vezes.", "A brass spyglass with polished lenses that magnifies distant objects up to ten times.", "Un catalejo de latón con lentes pulidas que aumenta hasta diez veces los objetos distantes."],
  "item.compendium.ten_foot_pole": ["Vara de 3 Metros", "Ten-foot Pole", "Pértiga de 3 metros", "Vara de madeira rígida de 3 metros para testar pisos e desarmar armadilhas.", "A rigid 3-meter wooden pole for testing floors and triggering traps from a distance.", "Una vara rígida de madera de 3 metros para probar suelos y activar trampas a distancia."],
  "item.compendium.thieves_tools": ["Ferramentas de Ladrão", "Thieves' Tools", "Herramientas de ladrón", "Gazuas, arames e alavancas para arrombar fechaduras e desativar armadilhas.", "Lockpicks, wires, and levers for picking locks and disabling traps.", "Ganzúas, alambres y palancas para forzar cerraduras y desactivar trampas."],
  "item.compendium.thieves_tools_infiltrator": ["Ferramentas de Ladrão (Infiltrador)", "Thieves' Tools (Infiltrator)", "Herramientas de ladrón (infiltrador)", "Ferramentas de arrombamento de alta liga metálica (+1 de bônus de item em Ladinagem).", "High-alloy burglary tools (+1 item bonus to Thievery).", "Herramientas de ganzuado de aleación superior (+1 de bonificador de objeto a Latrocinio)."],
  "item.compendium.torch": ["Tocha", "Torch", "Antorcha", "Tocha de madeira com estopa embebida em piche que queima por 1 hora (luz em 6m).", "A wooden torch with pitch-soaked cloth that burns for 1 hour (6-meter light).", "Una antorcha de madera con tela empapada en brea que arde durante 1 hora (luz de 6 metros)."],
  "item.compendium.waterskin": ["Odre", "Waterskin", "Odre", "Odre de couro com capacidade para 1 litro de água fresca.", "A leather waterskin holding 1 liter of fresh water.", "Un odre de cuero con capacidad para 1 litro de agua fresca."],
  "item.compendium.writing_set": ["Conjunto de Escrita", "Writing Set", "Juego de escritura", "Pena, tinta nanquim, pergaminhos e cera para selagem de cartas.", "A quill, ink, parchment, and sealing wax for writing and sealing letters.", "Una pluma, tinta, pergamino y cera de sellado para escribir y cerrar cartas."]
  ,"item.compendium.elixir_of_life_minor": ["Elixir da Vida (Menor)", "Elixir of Life (Minor)", "Elixir de vida (menor)", "Ao beber, recupera 1d6 Pontos de Vida e concede +1 de bônus de item em testes de Fortitude contra venenos e doenças por 1 hora.", "When consumed, you regain 1d6 Hit Points and gain a +1 item bonus to Fortitude saves against poisons and diseases for 1 hour.", "Al beberlo, recuperas 1d6 Puntos de Golpe y obtienes un bonificador de objeto +1 a las salvaciones de Fortaleza contra venenos y enfermedades durante 1 hora."]
  ,"item.compendium.elixir_of_life_lesser": ["Elixir da Vida (Inferior)", "Elixir of Life (Lesser)", "Elixir de vida (menor potente)", "Ao beber, recupera 3d6+6 Pontos de Vida e concede +1 de bônus de item em testes contra venenos e doenças.", "When consumed, you regain 3d6+6 Hit Points and gain a +1 item bonus to saves against poisons and diseases.", "Al beberlo, recuperas 3d6+6 Puntos de Golpe y obtienes un bonificador de objeto +1 a las salvaciones contra venenos y enfermedades."]
  ,"item.compendium.healing_potion_minor": ["Poção de Cura (Menor)", "Healing Potion (Minor)", "Poción de curación (menor)", "Poção mágica efervescente de coloração rubi que cura instantaneamente 1d8 Pontos de Vida.", "An effervescent ruby-colored magic potion that immediately restores 1d8 Hit Points.", "Una poción mágica efervescente de color rubí que restaura inmediatamente 1d8 Puntos de Golpe."]
  ,"item.compendium.healing_potion_lesser": ["Poção de Cura (Inferior)", "Healing Potion (Lesser)", "Poción de curación (menor potente)", "Poção mágica potente que cura instantaneamente 2d8+5 Pontos de Vida.", "A potent magic potion that immediately restores 2d8+5 Hit Points.", "Una potente poción mágica que restaura inmediatamente 2d8+5 Puntos de Golpe."]
  ,"item.compendium.alchemist_s_fire_lesser": ["Fogo Alquímico (Inferior)", "Alchemist's Fire (Lesser)", "Fuego alquímico (menor)", "Frasco volátil que causa 1d8 de dano de fogo no impacto, 1 de dano de fogo contínuo e 1 de dano de fogo em respingo.", "A volatile flask dealing 1d8 fire damage on impact, 1 persistent fire damage, and 1 splash fire damage.", "Un frasco volátil que causa 1d8 de daño de fuego al impactar, 1 de daño de fuego persistente y 1 de daño de fuego por salpicadura."]
  ,"item.compendium.acid_flask_lesser": ["Frasco de Ácido (Inferior)", "Acid Flask (Lesser)", "Frasco de ácido (menor)", "Causa 1 de dano de ácido, 1d6 de dano de ácido contínuo e 1 de dano de ácido em respingo.", "It deals 1 acid damage, 1d6 persistent acid damage, and 1 splash acid damage.", "Inflige 1 de daño de ácido, 1d6 de daño de ácido persistente y 1 de daño de ácido por salpicadura."]
  ,"item.compendium.frost_vial_lesser": ["Vial de Frio (Inferior)", "Frost Vial (Lesser)", "Vial de escarcha (menor)", "Causa 1d6 de dano de frio, 1 de respingo e aplica penalidade de -3m no deslocamento da vítima.", "It deals 1d6 cold damage, 1 splash damage, and gives the victim a –3-meter penalty to Speed.", "Inflige 1d6 de daño de frío, 1 de salpicadura y aplica una penalización de –3 metros a la Velocidad de la víctima."]
  ,"item.compendium.bottled_lightning_lesser": ["Relâmpago Engarrafado (Inferior)", "Bottled Lightning (Lesser)", "Rayo embotellado (menor)", "Causa 1d6 de dano elétrico, 1 de respingo e deixa o alvo Desprevenido até o início do próximo turno.", "It deals 1d6 electricity damage, 1 splash damage, and leaves the target off-guard until the start of its next turn.", "Inflige 1d6 de daño eléctrico, 1 de salpicadura y deja al objetivo desprevenido hasta el inicio de su próximo turno."]
  ,"item.compendium.tanglefoot_bag_lesser": ["Bolsa de Resina (Inferior)", "Tanglefoot Bag (Lesser)", "Bolsa de enredadera (menor)", "Bolsa de resina expansiva que gruda nas pernas do alvo, reduzindo a velocidade em 3m ou imobilizando no acerto crítico.", "An expanding resin bag that sticks to the target's legs, reducing Speed by 3 meters or immobilizing it on a critical hit.", "Una bolsa de resina expansiva que se adhiere a las piernas del objetivo, reduce su Velocidad en 3 metros o lo inmoviliza con un golpe crítico."]
  ,"item.compendium.antidote_lesser": ["Antídoto (Inferior)", "Antidote (Lesser)", "Antídoto (menor)", "Concede +2 de bônus de item em testes de salvaguarda contra venenos por 6 horas.", "It grants a +2 item bonus to saves against poisons for 6 hours.", "Concede un bonificador de objeto +2 a las salvaciones contra venenos durante 6 horas."]
  ,"item.compendium.antiplague_lesser": ["Antipeste (Inferior)", "Antiplague (Lesser)", "Antiplaga (menor)", "Concede +2 de bônus de item em testes de salvaguarda contra doenças por 24 horas.", "It grants a +2 item bonus to saves against diseases for 24 hours.", "Concede un bonificador de objeto +2 a las salvaciones contra enfermedades durante 24 horas."]
  ,"item.compendium.smokestick_lesser": ["Bastão de Fumaça (Inferior)", "Smokestick (Lesser)", "Bastón de humo (menor)", "Cria uma nuvem de fumaça espessa de 1,5m que concede Ocultação a criaturas dentro dela por 1 minuto.", "It creates a 1.5-meter cloud of thick smoke that gives creatures inside it concealment for 1 minute.", "Crea una nube de humo denso de 1,5 metros que proporciona ocultamiento a las criaturas dentro durante 1 minuto."]
  ,"item.compendium.sunrod": ["Bastão Solar", "Sunrod", "Bastón solar", "Bastão alquímico que brilha com luz solar viva de 6m por 6 horas após ser quebrado.", "An alchemical rod that shines with sunlight in a 6-meter radius for 6 hours after being broken.", "Una vara alquímica que brilla con luz solar en un radio de 6 metros durante 6 horas al romperse."]
  ,"item.compendium.tindertwig": ["Graveto de Ignição", "Tindertwig", "Ramita yesquera", "Fósforo alquímico de ignição instantânea que acende tochas em 1 única ação.", "An alchemical match that ignites instantly and lights torches with a single action.", "Una cerilla alquímica de ignición instantánea que enciende antorchas con una sola acción."]
  ,"item.compendium.1_weapon_potency_rune": ["Runa de Potência de Arma +1", "+1 Weapon Potency Rune", "Runa de potencia de arma +1", "Runa fundamental mágica que concede +1 de bônus de item em jogadas de ataque com a arma gravada.", "A fundamental magic rune granting a +1 item bonus to attack rolls with the etched weapon.", "Una runa mágica fundamental que concede un bonificador de objeto +1 a las tiradas de ataque con el arma grabada."]
  ,"item.compendium.2_weapon_potency_rune": ["Runa de Potência de Arma +2", "+2 Weapon Potency Rune", "Runa de potencia de arma +2", "Runa fundamental mágica que concede +2 de bônus de item em jogadas de ataque com a arma gravada.", "A fundamental magic rune granting a +2 item bonus to attack rolls with the etched weapon.", "Una runa mágica fundamental que concede un bonificador de objeto +2 a las tiradas de ataque con el arma grabada."]
  ,"item.compendium.3_weapon_potency_rune": ["Runa de Potência de Arma +3", "+3 Weapon Potency Rune", "Runa de potencia de arma +3", "Runa fundamental mágica que concede +3 de bônus de item em jogadas de ataque com a arma gravada.", "A fundamental magic rune granting a +3 item bonus to attack rolls with the etched weapon.", "Una runa mágica fundamental que concede un bonificador de objeto +3 a las tiradas de ataque con el arma grabada."]
  ,"item.compendium.striking_rune": ["Runa Impactante", "Striking Rune", "Runa impactante", "Runa fundamental que adiciona 1 dado extra de dano da arma ao acertar (2 dados no total).", "A fundamental rune that adds 1 extra weapon damage die on a hit (2 dice total).", "Una runa fundamental que añade 1 dado de daño adicional del arma al impactar (2 dados en total)."]
  ,"item.compendium.greater_striking_rune": ["Runa Impactante Maior", "Greater Striking Rune", "Runa impactante mayor", "Runa fundamental que adiciona 2 dados extras de dano da arma ao acertar (3 dados no total).", "A fundamental rune that adds 2 extra weapon damage dice on a hit (3 dice total).", "Una runa fundamental que añade 2 dados de daño adicionales del arma al impactar (3 dados en total)."]
  ,"item.compendium.major_striking_rune": ["Runa Impactante Superior", "Major Striking Rune", "Runa impactante mayor superior", "Runa fundamental lendária que adiciona 3 dados extras de dano da arma ao acertar (4 dados no total).", "A legendary fundamental rune that adds 3 extra weapon damage dice on a hit (4 dice total).", "Una runa fundamental legendaria que añade 3 dados de daño adicionales del arma al impactar (4 dados en total)."]
  ,"item.compendium.1_armor_potency_rune": ["Runa de Potência de Armadura +1", "+1 Armor Potency Rune", "Runa de potencia de armadura +1", "Runa fundamental que concede +1 de bônus de item na CA da armadura ou traje de explorador.", "A fundamental rune granting a +1 item bonus to the armor or explorer's clothing AC.", "Una runa fundamental que concede un bonificador de objeto +1 a la CA de la armadura o la ropa de explorador."]
  ,"item.compendium.resilient_rune": ["Runa Resiliente", "Resilient Rune", "Runa resistente", "Runa fundamental de armadura que concede +1 de bônus de item em todas as salvaguardas (Fortitude, Reflexos, Vontade).", "A fundamental armor rune granting a +1 item bonus to all saves (Fortitude, Reflex, and Will).", "Una runa fundamental de armadura que concede un bonificador de objeto +1 a todas las salvaciones (Fortaleza, Reflejos y Voluntad)."]
  ,"item.compendium.flaming_property_rune": ["Runa de Propriedade Flamejante", "Flaming Property Rune", "Runa de propiedad flamígera", "Adiciona 1d6 de dano de fogo adicional e 1d10 de dano contínuo de fogo no acerto crítico.", "It adds 1d6 additional fire damage and 1d10 persistent fire damage on a critical hit.", "Añade 1d6 de daño de fuego adicional y 1d10 de daño de fuego persistente con un golpe crítico."]
  ,"item.compendium.frost_property_rune": ["Runa de Propriedade Gélida", "Frost Property Rune", "Runa de propiedad gélida", "Adiciona 1d6 de dano de frio adicional e deixa o alvo Lento 1 no acerto crítico.", "It adds 1d6 additional cold damage and makes the target Slowed 1 on a critical hit.", "Añade 1d6 de daño de frío adicional y deja al objetivo ralentizado 1 con un golpe crítico."]
  ,"item.compendium.shocking_property_rune": ["Runa de Propriedade Chocante", "Shocking Property Rune", "Runa de propiedad impactante", "Adiciona 1d6 de dano elétrico adicional e propaga 1d4 de dano elétrico em criaturas adjacentes no crítico.", "It adds 1d6 additional electricity damage and deals 1d4 electricity damage to adjacent creatures on a critical hit.", "Añade 1d6 de daño eléctrico adicional y causa 1d4 de daño eléctrico a criaturas adyacentes con un golpe crítico."]
  ,"item.compendium.returning_property_rune": ["Runa de Propriedade Retornante", "Returning Property Rune", "Runa de propiedad retornante", "Quando você arremessa a arma gravada, ela retorna imediatamente à sua mão logo após o ataque.", "When you throw the etched weapon, it immediately returns to your hand after the attack.", "Cuando lanzas el arma grabada, vuelve inmediatamente a tu mano tras el ataque."]
  ,"item.compendium.ghost_touch_property_rune": ["Runa de Propriedade Toque Fantasma", "Ghost Touch Property Rune", "Runa de propiedad toque fantasmal", "A arma atinge criaturas incorpóreas com eficácia total, ignorando resistências a dano físico.", "The weapon affects incorporeal creatures with full effect, ignoring physical damage resistances.", "El arma afecta plenamente a las criaturas incorpóreas e ignora sus resistencias al daño físico."]
  ,"item.compendium.spacious_pouch_bag_of_holding": ["Bolsa Espaçosa (Bolsa de Carga)", "Spacious Pouch (Bag of Holding)", "Bolsa espaciosa (bolsa de contención)", "Bolsa mágica dimensional capaz de carregar até 25 de Carga enquanto pesa apenas 1 de Carga.", "A magical dimensional bag that can carry up to 25 Bulk while weighing only 1 Bulk.", "Una bolsa mágica dimensional capaz de transportar hasta 25 de Carga mientras pesa solo 1 de Carga."]
  ,"item.compendium.boots_of_elvenkind": ["Botas Élficas", "Boots of Elvenkind", "Botas élficas", "Botas leves que concedem +1 de bônus de item em testes de Furtividade e permitem ignorar terreno difícil suave.", "Light boots granting a +1 item bonus to Stealth checks and letting you ignore uneven ground.", "Botas ligeras que conceden un bonificador de objeto +1 a las pruebas de Sigilo y permiten ignorar terreno difícil menor."]
  ,"item.compendium.cloak_of_elvenkind": ["Manto Élfico", "Cloak of Elvenkind", "Capa élfica", "Manto cambiante que concede +1 de bônus em Furtividade e permite conjurar Invisibilidade 1 vez por dia.", "A shifting cloak granting a +1 bonus to Stealth and allowing you to cast invisibility once per day.", "Una capa cambiante que concede un bonificador +1 a Sigilo y permite lanzar invisibilidad una vez al día."]
  ,"item.compendium.goggles_of_night": ["Óculos da Noite", "Goggles of Night", "Gafas de la noche", "Óculos de lentes de quartzo escurecido que concedem Visão no Escuro contínua ao usuário investido.", "Goggles with dark quartz lenses that grant the invested wearer continuous darkvision.", "Gafas con lentes de cuarzo oscuro que conceden visión en la oscuridad permanente a quien las inviste."]
  ,"item.compendium.wand_of_heal_1st_rank": ["Varinha de Curar (1º Ranque)", "Wand of Heal (1st-Rank)", "Varita de curar (rango 1)", "Varinha entalhada em freixo que permite conjurar a magia Curar de 1º ranque uma vez ao dia (ou arriscar sobrecarga).", "An ash wand that lets you cast the 1st-rank heal spell once per day (or risk overcharging it).", "Una varita de fresno que permite lanzar curar de rango 1 una vez al día (o arriesgarse a sobrecargarla)."]
  ,"item.compendium.staff_of_fire": ["Cajado do Fogo", "Staff of Fire", "Bastón de fuego", "Cajado mágico forjado em madeira carbonizada com cargas diárias para conjurar Raio de Fogo e Mãos Flamejantes.", "A magic staff of charred wood with daily charges for casting Produce Flame and Burning Hands.", "Un bastón mágico de madera carbonizada con cargas diarias para lanzar producir llama y manos ardientes."]
};
for (const record of PF2E_DATA.itemCompendium || []) {
  const translation = COMPENDIUM_TRANSLATIONS[record.id];
  if (!translation) continue;
  const [pt, en, es, ptSummary, enSummary, esSummary] = translation;
  record.names = { "pt-BR": pt, en, es };
  record.summaries = { "pt-BR": ptSummary, en: enSummary, es: esSummary };
}

// Tipos de eidolon descritos na seção de Convocador/Eidolons de Segredos da
// Magia. A ficha permite escolher o tipo e mantém a proveniência da seção;
// matrizes de atributos, ataques e evoluções individuais continuam marcadas
// para revisão até serem modeladas campo a campo.
const SUMMONER_EIDOLONS = [
  ["pet.eidolon.devotion_abomination", "Abantesma da Devoção", "Devotion Phantom", "Abantesma de devoción", "Eidolon ocultista ligado à devoção e à proteção espiritual.", "An occult eidolon tied to devotion and spiritual protection.", "Eidolon ocultista ligado a la devoción y la protección espiritual."],
  ["pet.eidolon.rage_abomination", "Abantesma da Raiva", "Rage Phantom", "Abantesma de ira", "Abantesma ocultista movido por fúria e emoções intensas.", "An occult eidolon driven by rage and intense emotion.", "Eidolon ocultista impulsado por la ira y emociones intensas."],
  ["pet.eidolon.angel", "Anjo", "Angel", "Ángel", "Eidolon divino formado por essência celestial e poder de cura.", "A divine eidolon formed from celestial essence and healing power.", "Un eidolon divino formado de esencia celestial y poder curativo."],
  ["pet.eidolon.beast", "Besta", "Beast", "Bestia", "Eidolon primal de forma animal, adaptável a combate e exploração.", "A primal animal eidolon adaptable to combat and exploration.", "Un eidolon primal de forma animal, adaptable al combate y la exploración."],
  ["pet.eidolon.construct", "Constructo", "Construct", "Constructo", "Eidolon arcano construído com matéria e magia vinculadas ao convocador.", "An arcane eidolon built from matter and magic bound to its summoner.", "Un eidolon arcano construido con materia y magia vinculadas a su convocador."],
  ["pet.eidolon.demon", "Demônio", "Demon", "Demonio", "Eidolon divino de essência demoníaca e impulsos destrutivos.", "A divine eidolon of demonic essence and destructive impulses.", "Un eidolon divino de esencia demoníaca e impulsos destructivos."],
  ["pet.eidolon.dragon", "Dragão", "Dragon", "Dragón", "Eidolon arcano que manifesta a herança e o poder de um dragão.", "An arcane eidolon manifesting draconic heritage and power.", "Un eidolon arcano que manifiesta herencia y poder dracónicos."],
  ["pet.eidolon.fey", "Fada", "Fey", "Hada", "Eidolon primal de essência feérica, astuto e conectado à natureza.", "A primal eidolon of fey essence, cunning and connected to nature.", "Un eidolon primal de esencia feérica, astuto y conectado con la naturaleza."],
  ["pet.eidolon.plant", "Planta", "Plant", "Planta", "Eidolon primal de matéria vegetal e vitalidade natural.", "A primal eidolon of plant matter and natural vitality.", "Un eidolon primal de materia vegetal y vitalidad natural."],
  ["pet.eidolon.psychopomp", "Psicopompo", "Psychopomp", "Psicopompo", "Eidolon ocultista ligado ao ciclo das almas e à passagem dos mortos.", "An occult eidolon tied to the cycle of souls and passage of the dead.", "Un eidolon ocultista ligado al ciclo de las almas y al tránsito de los muertos."],
];
for (const [id, pt, en, es, ptSummary, enSummary, esSummary] of SUMMONER_EIDOLONS) {
  if ((PF2E_DATA.pets || []).some((record) => record.id === id)) continue;
  PF2E_DATA.pets.push({
    id,
    name: `${pt} (${en})`,
    type: "eidolon",
    category: "Eidolon",
    classId: "class.summoner",
    requiredLevel: 1,
    prerequisites: ["Convocador"],
    names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
    description: ptSummary,
    source: { book: "Segredos da Magia (pré-Remaster)", page: 43 },
    sourceApproximate: true,
    ruleset: "legacy",
    needs_review: true,
  });
}

// Segredos da Magia, pp. 43–50: parâmetros das duas matrizes de cada
// eidolon. São dados mecânicos comuns às traduções e ficam separados do
// texto localizado para que o motor possa calcular sem inferir defaults.
const SUMMONER_EIDOLON_PROFILES = {
  "pet.eidolon.devotion_abomination": { tradition: "occult", traits: ["abantesma", "eidolon", "etéreo"], size: ["Médio", "Pequeno"], speed: 7.5, skills: ["Medicine", "Occultism"], profiles: [{ name: "Guardião Baluarte", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 2, dexCap: 3 }, { name: "Protetor Veloz", abilities: { str: 14, dex: 18, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Golpe de Gavinha"] },
  "pet.eidolon.rage_abomination": { tradition: "occult", traits: ["abantesma", "eidolon", "etéreo"], size: ["Médio", "Pequeno"], speed: 7.5, skills: ["Intimidation", "Occultism"], senses: ["darkvision"], profiles: [{ name: "Amoque Colérico", abilities: { str: 18, dex: 14, con: 16, int: 8, wis: 10, cha: 12 }, acBonus: 2, dexCap: 3 }, { name: "Assassino Enfurecido", abilities: { str: 14, dex: 18, con: 16, int: 10, wis: 8, cha: 12 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Golpe Furioso"] },
  "pet.eidolon.angel": { tradition: "divine", traits: ["anjo", "celestial", "eidolon"], size: ["Médio", "Pequeno"], speed: 7.5, skills: ["Diplomacy", "Religion"], senses: ["darkvision"], profiles: [{ name: "Vingador Angelical", abilities: { str: 18, dex: 14, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }, { name: "Emissário Angelical", abilities: { str: 12, dex: 18, con: 12, int: 10, wis: 12, cha: 14 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Golpes Consagrados"] },
  "pet.eidolon.beast": { tradition: "primal", traits: ["besta", "eidolon"], size: ["Médio"], speed: 7.5, skills: ["Intimidation", "Nature"], senses: ["low-light vision"], profiles: [{ name: "Besta Brutal", abilities: { str: 18, dex: 14, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }, { name: "Besta Ligeira", abilities: { str: 14, dex: 18, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Investida da Besta"] },
  "pet.eidolon.construct": { tradition: "arcane", traits: ["astral", "construct", "eidolon"], size: ["Médio"], speed: 7.5, skills: ["Arcana", "Crafting"], senses: ["darkvision"], profiles: [{ name: "Constructo Combatente", abilities: { str: 18, dex: 14, con: 16, int: 12, wis: 10, cha: 8 }, acBonus: 2, dexCap: 3 }, { name: "Constructo Batedor", abilities: { str: 14, dex: 18, con: 16, int: 12, wis: 10, cha: 8 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Coração Constructo"] },
  "pet.eidolon.demon": { tradition: "divine", traits: ["demônio", "eidolon", "ínfero"], size: ["Médio", "Pequeno"], speed: 7.5, skills: ["Intimidation", "Religion"], senses: ["darkvision"], profiles: [{ name: "Demônio Demolidor", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 8, cha: 12 }, acBonus: 2, dexCap: 3 }], initialAbilities: ["Golpes Corrompidos"] },
  "pet.eidolon.dragon": { tradition: "arcane", traits: ["astral", "dragão", "eidolon"], size: ["Médio"], speed: 7.5, skills: ["Arcana", "Intimidation"], senses: ["darkvision"], profiles: [{ name: "Dragão Saqueador", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 2, dexCap: 3 }, { name: "Dragão Astuto", abilities: { str: 12, dex: 18, con: 12, int: 14, wis: 10, cha: 12 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Sopro"] },
  "pet.eidolon.fey": { tradition: "primal", traits: ["eidolon", "fada"], size: ["Pequeno", "Médio"], speed: 7.5, skills: ["Deception", "Nature"], senses: ["low-light vision"], profiles: [{ name: "Fada Escaramuçadora", abilities: { str: 14, dex: 18, con: 14, int: 10, wis: 10, cha: 12 }, acBonus: 1, dexCap: 4 }, { name: "Fada Trapaceira", abilities: { str: 12, dex: 18, con: 12, int: 12, wis: 8, cha: 16 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Magias de Presente das Fadas"] },
  "pet.eidolon.plant": { tradition: "primal", traits: ["eidolon", "planta"], size: ["Médio"], speed: 7.5, skills: ["Nature", "Survival"], senses: ["low-light vision"], profiles: [{ name: "Planta Guardiã", abilities: { str: 18, dex: 14, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }, { name: "Planta Rastejante", abilities: { str: 12, dex: 18, con: 16, int: 8, wis: 14, cha: 10 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Golpe de Gavinha"] },
  "pet.eidolon.psychopomp": { tradition: "occult", traits: ["eidolon", "monitor", "psicopompo"], size: ["Médio"], speed: 7.5, skills: ["Intimidation", "Religion"], senses: ["darkvision"], profiles: [{ name: "Guardião das Almas", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 8 }, acBonus: 2, dexCap: 3 }, { name: "Escriba dos Mortos", abilities: { str: 12, dex: 18, con: 12, int: 14, wis: 12, cha: 10 }, acBonus: 1, dexCap: 4 }], initialAbilities: ["Toque Espiritual"] }
};
for (const [id, profile] of Object.entries(SUMMONER_EIDOLON_PROFILES)) {
  const record = (PF2E_DATA.pets || []).find((pet) => pet.id === id);
  if (record) Object.assign(record, profile);
}

// Índice completo de impulsos apresentado nas seções de elementos e impulsos
// de Rage of Elements. O registro permite filtrar e escolher o talento; o
// texto de efeito individual ainda precisa de revisão mecânica por página.
const RAGE_OF_ELEMENTS_IMPULSES = [
  ["aerial_boomerang", "Aerial Boomerang", 1], ["air_cushion", "Air Cushion", 1], ["four_winds", "Four Winds", 1], ["whisper_on_the_wind", "Whisper on the Wind", 1], ["air_shroud", "Air Shroud", 4], ["clear_as_air", "Clear as Air", 6], ["flinging_updraft", "Flinging Updraft", 6], ["lightning_dash", "Lightning Dash", 4], ["cyclonic_ascent", "Cyclonic Ascent", 8], ["storm_spiral", "Storm Spiral", 8], ["ghosts_in_the_storm", "Ghosts in the Storm", 12], ["wiles_on_the_wind", "Wiles on the Wind", 12], ["body_of_air", "Body of Air", 14], ["crowned_in_tempests_fury", "Crowned in Tempest's Fury", 18], ["infinite_expanse_of_bluest_heaven", "Infinite Expanse of Bluest Heaven", 18],
  ["armor_in_earth", "Armor in Earth", 1], ["geologic_attunement", "Geologic Attunement", 1], ["stepping_stones", "Stepping Stones", 1], ["tremor", "Tremor", 1], ["calcifying_sand", "Calcifying Sand", 4], ["igneogenesis", "Igneogenesis", 4], ["sand_snatcher", "Sand Snatcher", 6], ["weight_of_stone", "Weight of Stone", 6], ["spike_skin", "Spike Skin", 8], ["swim_through_earth", "Swim Through Earth", 8], ["rattle_the_earth", "Rattle the Earth", 12], ["rock_rampart", "Rock Rampart", 12], ["assume_earths_mantle", "Assume Earth's Mantle", 14], ["rebirth_in_living_stone", "Rebirth in Living Stone", 18], ["the_shattered_mountain_weeps", "The Shattered Mountain Weeps", 18],
  ["burning_jet", "Burning Jet", 1], ["eternal_torch", "Eternal Torch", 1], ["flying_flame", "Flying Flame", 1], ["scorching_column", "Scorching Column", 1], ["blazing_wave", "Blazing Wave", 4], ["thermal_nimbus", "Thermal Nimbus", 4], ["crawling_fire", "Crawling Fire", 6], ["volcanic_escape", "Volcanic Escape", 6], ["kindle_inner_flames", "Kindle Inner Flames", 8], ["solar_detonation", "Solar Detonation", 8], ["architect_of_flame", "Architect of Flame", 12], ["furnace_form", "Furnace Form", 12], ["walk_through_the_conflagration", "Walk Through the Conflagration", 14], ["all_shall_end_in_flames", "All Shall End in Flames", 18], ["death_fire", "Death Fire", 18], ["ignite_the_sun", "Ignite the Sun", 18],
  ["flashforge", "Flashforge", 1], ["magnetic_pinions", "Magnetic Pinions", 1], ["metal_carapace", "Metal Carapace", 1], ["shard_strike", "Shard Strike", 1], ["magnetic_field", "Magnetic Field", 4], ["plate_in_treasure", "Plate in Treasure", 4], ["consume_power", "Consume Power", 6], ["scrap_barricade", "Scrap Barricade", 6], ["conductive_sphere", "Conductive Sphere", 8], ["retch_rust", "Retch Rust", 8], ["alloy_flesh_and_steel", "Alloy Flesh and Steel", 14], ["rain_of_razors", "Rain of Razors", 12], ["shattershields", "Shattershields", 12], ["beasts_of_slumbering_steel", "Beasts of Slumbering Steel", 18], ["hell_of_one_million_needles", "Hell of 1,000,000 Needles", 18],
  ["deflecting_wave", "Deflecting Wave", 1], ["ocean_balm", "Ocean's Balm", 1], ["tidal_hands", "Tidal Hands", 1], ["winters_clutch", "Winter's Clutch", 1], ["return_to_the_sea", "Return to the Sea", 4], ["winter_sleet", "Winter Sleet", 4], ["driving_rain", "Driving Rain", 6], ["torrent_in_the_blood", "Torrent in the Blood", 6], ["call_the_hurricane", "Call the Hurricane", 8], ["impenetrable_fog", "Impenetrable Fog", 8], ["glacial_prison", "Glacial Prison", 12], ["sea_glass_guardians", "Sea Glass Guardians", 12], ["barrier_of_boreal_frost", "Barrier of Boreal Frost", 14], ["ride_the_tsunami", "Ride the Tsunami", 18], ["usurp_the_lunar_reins", "Usurp the Lunar Reins", 18],
  ["fresh_produce", "Fresh Produce", 1], ["hail_of_splinters", "Hail of Splinters", 1], ["hardwood_armor", "Hardwood Armor", 1], ["timber_sentinel", "Timber Sentinel", 1], ["ravel_of_thorns", "Ravel of Thorns", 4], ["tumbling_lumber", "Tumbling Lumber", 4], ["dash_of_herbs", "Dash of Herbs", 6], ["wooden_palisade", "Wooden Palisade", 6], ["drifting_pollen", "Drifting Pollen", 8], ["sanguivolent_roots", "Sanguivolent Roots", 8], ["hedge_maze", "Hedge Maze", 12], ["witchwood_seed", "Witchwood Seed", 12], ["orchards_endurance", "Orchard's Endurance", 14], ["rouse_the_forests_fury", "Rouse the Forest's Fury", 18], ["turn_the_wheel_of_seasons", "Turn the Wheel of Seasons", 18],
  ["ambush_bladderwort", "Ambush Bladderwort", 4], ["lava_leap", "Lava Leap", 4], ["living_bonfire", "Living Bonfire", 4], ["whirling_grindstone", "Whirling Grindstone", 4], ["ash_strider", "Ash Strider", 6], ["desert_wind", "Desert Wind", 6], ["elemental_artillery", "Elemental Artillery", 6], ["chain_infusion", "Chain Infusion", 10], ["elemental_transformation", "Elemental Transformation", 10], ["effortless_impulse", "Effortless Impulse", 12], ["imperious_aura", "Imperious Aura", 16], ["omnikinesis", "Omnikinesis", 20],
];
for (const [slug, title, level] of RAGE_OF_ELEMENTS_IMPULSES) {
  const id = `feat.impulse.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${title} (Impulse)`, category: "Impulso", level,
    classId: "class.kineticist", prerequisites: ["Cineticista"],
    traits: ["Impulso", "Cineticista"],
    names: { "pt-BR": title, en: title, es: title },
    summaries: {
      "pt-BR": `Impulso elemental de ${title}; consulte a entrada da página para o efeito completo.`,
      en: `Elemental impulse ${title}; consult the page entry for the complete effect.`,
      es: `Impulso elemental ${title}; consulta la entrada de la página para el efecto completo.`,
    },
    description: `Impulso elemental ${title}; detalhes mecânicos pendentes de revisão.`,
    source: { book: "Rage of Elements (Remaster)", page: 24 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// War of Immortals, p. 22: índice de talentos do Animista. O índice fornece
// nomes e níveis; os efeitos individuais permanecem em revisão até a página
// de cada talento ser conferida no PDF local.
const WAR_IMMORTALS_ANIMIST_FEATS = [
  ["apparition_cloud", "Apparition Cloud", "Nuvem de Aparição", "Nube de aparición", 12],
  ["apparition_sense", "Apparition Sense", "Sentido de Aparição", "Sentido de aparición", 1],
  ["apparition_stabilization", "Apparition Stabilization", "Estabilização de Aparição", "Estabilización de aparición", 6],
  ["apparitions_enhancement", "Apparition's Enhancement", "Aprimoramento da Aparição", "Mejora de la aparición", 4],
  ["apparitions_quickening", "Apparition's Quickening", "Aceleração da Aparição", "Aceleración de la aparición", 10],
  ["apparitions_reflection", "Apparition's Reflection", "Reflexo da Aparição", "Reflejo de la aparición", 6],
  ["banish_falsehoods_of_flesh", "Banish Falsehoods of Flesh", "Banir Falsidades da Carne", "Desterrar falsedades de la carne", 14],
  ["blazing_spirit", "Blazing Spirit", "Espírito Flamejante", "Espíritu llameante", 6],
  ["cardinal_guardians", "Cardinal Guardians", "Guardiões Cardeais", "Guardianes cardinales", 14],
  ["channeled_protection", "Channeled Protection", "Proteção Canalizada", "Protección canalizada", 4],
  ["channelers_stance", "Channeler's Stance", "Postura do Canalizador", "Postura del canalizador", 1],
  ["circle_of_spirits", "Circle of Spirits", "Círculo de Espíritos", "Círculo de espíritus", 1],
  ["conceal_spell", "Conceal Spell", "Ocultar Magia", "Ocultar conjuro", 2],
  ["cycle_of_souls", "Cycle of Souls", "Ciclo das Almas", "Ciclo de las almas", 18],
  ["echoing_channel", "Echoing Channel", "Canal Ressonante", "Canal resonante", 18],
  ["embodiment_of_the_balance", "Embodiment of the Balance", "Encarnar o Equilíbrio", "Encarnación del equilibrio", 2],
  ["enhanced_familiar", "Enhanced Familiar", "Familiar Aprimorado", "Familiar mejorado", 2],
  ["eternal_guide", "Eternal Guide", "Guia Eterno", "Guía eterno", 20],
  ["fly_on_shadowed_wings", "Fly on Shadowed Wings", "Voar em Asas Sombrias", "Volar con alas sombrías", 10],
  ["forest_s_heart", "Forest's Heart", "Coração da Floresta", "Corazón del bosque", 16],
  ["grasping_spirits_spell", "Grasping Spirits Spell", "Magia dos Espíritos Agarradores", "Conjuro de espíritus aferradores", 2],
  ["grudge_strike", "Grudge Strike", "Golpe de Ressentimento", "Golpe de rencor", 6],
  ["incredible_familiar", "Incredible Familiar", "Familiar Incrível", "Familiar increíble", 10],
  ["instinctive_maneuvers", "Instinctive Maneuvers", "Manobras Instintivas", "Maniobras instintivas", 8],
  ["jester_s_gambol", "Jester's Gambol", "Pirueta do Bobo", "Cabriola del bufón", 16],
  ["medium_s_awareness", "Medium's Awareness", "Consciência do Médium", "Percepción del médium", 6],
  ["monstrous_inclinations", "Monstrous Inclinations", "Inclinações Monstruosas", "Inclinaciones monstruosas", 16],
  ["relinquish_control", "Relinquish Control", "Abandonar o Controle", "Renunciar al control", 1],
  ["roaring_heart", "Roaring Heart", "Coração Ruidoso", "Corazón rugiente", 6],
  ["shadows_within_shadows", "Shadows within Shadows", "Sombras dentro de Sombras", "Sombras dentro de sombras", 12],
  ["spirit_familiar", "Spirit Familiar", "Familiar Espiritual", "Familiar espiritual", 1],
  ["spiritual_expansion_spell", "Spiritual Expansion Spell", "Magia de Expansão Espiritual", "Conjuro de expansión espiritual", 2],
  ["spiritual_spellshape_stance", "Spiritual Spellshape Stance", "Postura de Moldagem Espiritual", "Postura de forma espiritual", 16],
  ["spirit_walk", "Spirit Walk", "Caminhada Espiritual", "Paseo espiritual", 8],
  ["spirits_sacrifice", "Spirit's Sacrifice", "Sacrifício do Espírito", "Sacrificio del espíritu", 18],
  ["true_channel", "True Channel Spell", "Magia do Canal Verdadeiro", "Conjuro del canal verdadero", 20],
  ["walk_the_wilds", "Walk the Wilds", "Caminhar pelos Ermos", "Caminar por lo salvaje", 4],
  ["whispers_of_warning", "Whispers of Warning", "Sussurros de Alerta", "Susurros de advertencia", 12],
  ["wind_seeker", "Wind Seeker", "Buscador do Vento", "Buscador del viento", 8],
];
for (const [slug, englishName, ptName, esName, level] of WAR_IMMORTALS_ANIMIST_FEATS) {
  const id = `feat.animist.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${ptName} (${englishName})`,
    category: "Talento de Classe",
    level,
    classId: "class.animist",
    prerequisites: ["Animista"],
    traits: ["Animista"],
    names: { "pt-BR": ptName, en: englishName, es: esName },
    summaries: {
      "pt-BR": `Talento de classe do Animista; consulte a página individual para o efeito completo.`,
      en: `Animist class feat; consult the individual page for the complete effect.`,
      es: `Talento de clase de animista; consulta la página individual para el efecto completo.`,
    },
    description: `Talento de classe do Animista; detalhes mecânicos pendentes de revisão.`,
    source: { book: WAR_IMMORTALS_SOURCE, page: 22 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, p. 30: primeiro talento apresentado na seção do Exemplar.
if (!(PF2E_DATA.feats || []).some((record) => record.id === "feat.exemplar.humble_strikes")) {
  PF2E_DATA.feats.push({
    id: "feat.exemplar.humble_strikes",
    name: "Golpes Humildes (Humble Strikes)",
    category: "Talento de Classe",
    level: 1,
    classId: "class.exemplar",
    prerequisites: ["Exemplar"],
    traits: ["Exemplar"],
    names: { "pt-BR": "Golpes Humildes", en: "Humble Strikes", es: "Golpes humildes" },
    summaries: {
      "pt-BR": "Talento de classe do Exemplar; consulte a página individual para o efeito completo.",
      en: "Exemplar class feat; consult the individual page for the complete effect.",
      es: "Talento de clase de ejemplar; consulta la página individual para el efecto completo.",
    },
    description: "Talento de classe do Exemplar; detalhes mecânicos pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page: 30 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, p. 35: talentos iniciais apresentados na seção do Exemplar.
const WAR_IMMORTALS_EXEMPLAR_FEATS = [
  ["energized_spark", "Energized Spark", "Centelha Energizada", "Chispa energizada"],
  ["sanctified_soul", "Sanctified Soul", "Alma Santificada", "Alma santificada"],
  ["twin_stars", "Twin Stars", "Estrelas Gêmeas", "Estrellas gemelas"],
  ["vow_of_mortal_defiance", "Vow of Mortal Defiance", "Voto de Desafio Mortal", "Voto de desafío mortal"],
];
for (const [slug, englishName, ptName, esName] of WAR_IMMORTALS_EXEMPLAR_FEATS) {
  const id = `feat.exemplar.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${ptName} (${englishName})`,
    category: "Talento de Classe",
    level: 1,
    classId: "class.exemplar",
    prerequisites: ["Exemplar"],
    traits: ["Exemplar"],
    names: { "pt-BR": ptName, en: englishName, es: esName },
    summaries: {
      "pt-BR": "Talento de classe do Exemplar; consulte a página individual para o efeito completo.",
      en: "Exemplar class feat; consult the individual page for the complete effect.",
      es: "Talento de clase de ejemplar; consulta la página individual para el efecto completo.",
    },
    description: "Talento de classe do Exemplar; detalhes mecânicos pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page: 35 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

const WAR_IMMORTALS_EXEMPLAR_FEATS_REMAINING = [
  ["only_the_worthy", "Only the Worthy", "Somente os Dignos", "Solo los dignos", 4],
  ["steel_on_steel", "Steel on Steel", "Aço contra Aço", "Acero contra acero", 4],
  ["through_the_needles_eye", "Through the Needle's Eye", "Através do Olho da Agulha", "A través del ojo de la aguja", 4],
  ["binding_serpents_celestial_arrow", "Binding Serpents Celestial Arrow", "Flecha Celestial das Serpentes Aprisionadoras", "Flecha celestial de serpientes vinculantes", 6],
  ["flow_of_war", "Flow of War", "Fluxo da Guerra", "Flujo de guerra", 6],
  ["motionless_cutter", "Motionless Cutter", "Cortador Imóvel", "Cortador inmóvil", 6],
  ["reactive_strike", "Reactive Strike", "Golpe Reativo", "Golpe reactivo", 6],
  ["additional_ikon", "Additional Ikon", "Ícone Adicional", "Icono adicional", 8],
  ["battle_hymn_to_the_lost", "Battle Hymn to the Lost", "Hino de Batalha aos Perdidos", "Himno de batalla a los perdidos", 8],
  ["raise_island", "Raise Island", "Erguer a Ilha", "Elevar la isla", 8],
  ["rejoice_in_solstice_storm", "Rejoice in Solstice Storm", "Alegria na Tempestade do Solstício", "Alegría en la tormenta del solsticio", 8],
  ["breath_of_vital_ash", "Breath of Vital Ash", "Sopro de Cinza Vital", "Aliento de ceniza vital", 10],
  ["exult_in_violence", "Exult in Violence", "Exultar na Violência", "Exultar en la violencia", 10],
  ["fish_from_the_falls_edge", "Fish from the Falls' Edge", "Pescar da Beira da Cachoeira", "Pescar del borde de las cascadas", 10],
  ["journey_of_the_sky_chariot", "Journey of the Sky Chariot", "Jornada da Carruagem Celeste", "Viaje del carro celeste", 10],
  ["mated_birds_in_paired_flight", "Mated Birds in Paired Flight", "Pássaros Acasalados em Voo Pareado", "Aves emparejadas en vuelo conjunto", 10],
  ["extract_vow_of_nonviolence", "Extract Vow of Nonviolence", "Extrair Voto de Não Violência", "Extraer voto de no violencia", 12],
  ["rapid_spark", "Rapid Spark", "Centelha Rápida", "Chispa rápida", 12],
  ["warped_by_rage", "Warped by Rage", "Distorcido pela Fúria", "Deformado por la furia", 12],
  ["compliant_gold", "Compliant Gold", "Ouro Submisso", "Oro obediente", 12],
  ["destined_victory", "Destined Victory", "Vitória Destinada", "Victoria destinada", 14],
  ["infinite_blades_celestial_arrow", "Infinite Blades Celestial Arrow", "Flecha Celestial das Lâminas Infinitas", "Flecha celestial de hojas infinitas", 14],
  ["gift_of_the_immortal_herb", "Gift of the Immortal Herb", "Dádiva da Erva Imortal", "Don de la hierba inmortal", 16],
  ["mark_of_the_sage", "Mark of the Sage", "Marca do Sábio", "Marca del sabio", 16],
  ["shroud_of_ghosts", "Shroud of Ghosts", "Sudário de Fantasmas", "Sudario de fantasmas", 16],
  ["strike_rivers_seize_winds", "Strike Rivers, Seize Winds", "Golpear Rios, Capturar Ventos", "Golpear ríos, atrapar vientos", 16],
  ["branched_tree_of_pain", "Branched Tree of Pain", "Árvore Ramificada da Dor", "Árbol ramificado del dolor", 18],
  ["eternity_incinerating_blaze", "Eternity-Incinerating Blaze", "Labareda Incineradora da Eternidade", "Resplandor incinerador de la eternidad", 18],
  ["seven_colored_cosmic_bridge", "Seven-Colored Cosmic Bridge", "Ponte Cósmica de Sete Cores", "Puente cósmico de siete colores", 18],
  ["sunwrecker", "Sunwrecker", "Destruidor do Sol", "Destructor del sol", 18],
  ["reach_for_immortality", "Reach for Immortality", "Alcançar a Imortalidade", "Alcanzar la inmortalidad", 20],
  ["remake_the_world", "Remake the World", "Refazer o Mundo", "Rehacer el mundo", 20],
];
for (const [slug, englishName, ptName, esName, level] of WAR_IMMORTALS_EXEMPLAR_FEATS_REMAINING) {
  const id = `feat.exemplar.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${ptName} (${englishName})`,
    category: "Talento de Classe",
    level,
    classId: "class.exemplar",
    prerequisites: ["Exemplar"],
    traits: ["Exemplar"],
    names: { "pt-BR": ptName, en: englishName, es: esName },
    summaries: {
      "pt-BR": "Talento de classe do Exemplar; consulte a página individual para o efeito completo.",
      en: "Exemplar class feat; consult the individual page for the complete effect.",
      es: "Talento de clase de ejemplar; consulta la página individual para el efecto completo.",
    },
    description: "Talento de classe do Exemplar; detalhes mecânicos pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page: 36 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, pp. 17–21: magias de receptáculo do Animista. São
// magias de foco de 1º nível; efeitos e alturas detalhadas ficam em revisão.
const WAR_IMMORTALS_ANIMIST_VESSEL_SPELLS = [
  ["traveling_workshop", "Traveling Workshop", "Oficina Itinerante", "Taller itinerante", 17],
  ["store_time", "Store Time", "Armazenar Tempo", "Almacenar tiempo", 18],
  ["garden_of_healing", "Garden of Healing", "Jardim de Cura", "Jardín de curación", 18],
  ["discomfiting_whispers", "Discomfiting Whispers", "Sussurros Perturbadores", "Susurros desconcertantes", 18],
  ["devouring_dark_form", "Devouring Dark Form", "Forma da Escuridão Devoradora", "Forma de oscuridad devoradora", 19],
  ["nymphs_grace", "Nymph's Grace", "Graça da Náiade", "Gracia de la ninfa", 19],
  ["tricksters_mirrors", "Trickster's Mirrors", "Espelhos do Trapaceiro", "Espejos del embaucador", 19],
  ["darkened_forest_form", "Darkened Forest Form", "Forma da Floresta Sombria", "Forma del bosque oscuro", 20],
  ["earths_bile", "Earth's Bile", "Bile da Terra", "Bilis de la tierra", 21],
  ["river_carving_mountains", "River Carving Mountains", "Rio que Esculpe Montanhas", "Río que esculpe montañas", 21],
  ["embodiment_of_battle", "Embodiment of Battle", "Encarnação da Batalha", "Encarnación de la batalla", 21],
];
for (const [slug, englishName, ptName, esName, page] of WAR_IMMORTALS_ANIMIST_VESSEL_SPELLS) {
  const id = `spell.animist.${slug}`;
  const existing = (PF2E_DATA.spells || []).find((record) => record.id === id);
  if (existing) {
    // Receptáculo é magia de foco divina do Animista. Alguns índices antigos
    // já continham o nome, mas sem tradição; sem este enriquecimento o picker
    // considerava a opção incompatível para o próprio Animista.
    Object.assign(existing, {
      rank: existing.rank ?? 1,
      focus: true,
      category: existing.category || "Magia de Foco",
      classId: existing.classId || "class.animist",
      classIds: existing.classIds || ["class.animist"],
      traditions: existing.traditions?.length ? existing.traditions : ["divine"],
    });
    continue;
  }
  PF2E_DATA.spells.push({
    id,
    name: `${ptName} (${englishName})`,
    rank: 1,
    focus: true,
    category: "Magia de Foco",
    classId: "class.animist",
    classIds: ["class.animist"],
    traditions: ["divine"],
    prerequisites: ["Animista"],
    traits: ["Animista", "Foco"],
    names: { "pt-BR": ptName, en: englishName, es: esName },
    summaries: {
      "pt-BR": "Magia de receptáculo do Animista; consulte a entrada individual para o efeito completo.",
      en: "Animist vessel focus spell; consult the individual entry for the complete effect.",
      es: "Conjuro de foco de receptáculo del animista; consulta la entrada individual para el efecto completo.",
    },
    description: "Magia de receptáculo do Animista; detalhes mecânicos pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, p. 57: talentos do arquétipo multiclasse de Exemplar.
const WAR_IMMORTALS_EXEMPLAR_MULTICLASS_FEATS = [
  ["exemplar_dedication", "Dedicação de Exemplar", "Exemplar Dedication", "Dedicación de Exemplar", 2],
  ["basic_glory", "Glória Básica", "Basic Glory", "Gloria básica", 4],
  ["exemplar_resiliency", "Resiliência de Exemplar", "Exemplar Resiliency", "Resiliencia de Exemplar", 4],
  ["advanced_glory", "Glória Avançada", "Advanced Glory", "Gloria avanzada", 6],
  ["exemplar_expertise", "Maestria de Exemplar", "Exemplar Expertise", "Pericia de Exemplar", 10],
  ["second_ikon", "Segundo Ícone", "Second Ikon", "Segundo icono", 12],
];
for (const [slug, pt, en, es, level] of WAR_IMMORTALS_EXEMPLAR_MULTICLASS_FEATS) {
  const id = `feat.archetype.exemplar_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de Exemplar, nível ${level}.`,
      en: `Exemplar multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de Exemplar, nivel ${level}.`,
    },
    description: `Talento do arquétipo multiclasse de Exemplar.`,
    category: "Arquetipo",
    type: "Talento",
    level,
    archetypeId: "archetype.exemplar_multiclass",
    prerequisites: ["Dedicação de Exemplar"],
    prereq: ["Dedicação de Exemplar"],
    traits: ["Arquetipo", "Multiclasse"],
    source: { book: WAR_IMMORTALS_SOURCE, page: 57 },
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, pp. 58–66: dedicações dos arquétipos de classe.
const WAR_IMMORTALS_CLASS_ARCHETYPE_DEDICATIONS = [
  ["avenger", "Vingador", "Avenger", "Vengador", 58, "Ladino", "Dedicação de Vingador para um ladino dedicado à causa de uma divindade.", "Avenger dedication for a rogue devoted to a deity's cause.", "Dedicación de Vengador para un pícaro dedicado a la causa de una deidad."],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", 60, "Bárbaro", "Dedicação de Furioso de Sangue para um bárbaro que canaliza magia através do sangue.", "Bloodrager dedication for a barbarian who channels magic through blood.", "Dedicación de Furioso de sangre para un bárbaro que canaliza magia a través de la sangre."],
  ["seneschal_witch", "Senescal de Bruxa", "Seneschal Witch", "Senescal de bruja", 62, "Bruxa que perdeu seu patrono", "Dedicação rara de Senescal para uma bruxa que perdeu seu patrono.", "Rare Seneschal dedication for a witch who lost their patron.", "Dedicación rara de Senescal para una bruja que perdió a su patrón."],
  ["vindicator", "Vindicador", "Vindicator", "Vindicador", 64, "Patrulheiro", "Dedicação de Vindicador para um patrulheiro que caça em nome de uma divindade.", "Vindicator dedication for a ranger who hunts in a deity's name.", "Dedicación de Vindicador para un explorador que caza en nombre de una deidad."],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", 66, "Guerreiro", "Dedicação incomum de Guerreiro da Lenda para um combatente marcado por uma história heroica.", "Uncommon Warrior of Legend dedication for a fighter marked by a heroic story.", "Dedicación poco común de Guerrero de leyenda para un combatiente marcado por una historia heroica."],
];
for (const [slug, pt, en, es, page, classPrerequisite, ptSummary, enSummary, esSummary] of WAR_IMMORTALS_CLASS_ARCHETYPE_DEDICATIONS) {
  const id = `feat.archetype.${slug}_dedication`;
  const classId = {
    "Ladino": "class.rogue",
    "Bárbaro": "class.barbarian",
    "Bruxa que perdeu seu patrono": "class.witch",
    "Patrulheiro": "class.ranger",
    "Guerreiro": "class.fighter",
  }[classPrerequisite];
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `Dedicação de ${pt} (${en} Dedication)`,
    names: { "pt-BR": `Dedicação de ${pt}`, en: `${en} Dedication`, es: `Dedicación de ${es}` },
    summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
    description: ptSummary,
    category: "Arquetipo",
    type: "Talento",
    level: 2,
    classId,
    prerequisites: [classPrerequisite],
    prereq: [classPrerequisite],
    archetypeId: `archetype.${slug.replace(/_witch$/, "")}`,
    traits: ["Arquetipo", "Dedicação"],
    source: { book: WAR_IMMORTALS_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
  });
}

// War of Immortals, pp. 59–68: talentos dos arquétipos de classe.
// Os textos completos permanecem em revisão; os níveis e páginas são mantidos
// para que o construtor filtre a progressão e preserve a proveniência.
const WAR_IMMORTALS_CLASS_ARCHETYPE_FEATS = [
  ["avenger", "Vingador", "Avenger", "Vengador", "zealous_inevitability", "Inevitabilidade Zelosa", "Zealous Inevitability", "Inevitabilidad fervorosa", 6, 59],
  ["avenger", "Vingador", "Avenger", "Vengador", "silence_the_profane", "Silenciar o Profano", "Silence the Profane", "Silenciar lo Profano", 8, 59],
  ["avenger", "Vingador", "Avenger", "Vengador", "shadow_of_death", "Sombra da Morte", "Shadow of Death", "Sombra de la Muerte", 10, 59],
  ["avenger", "Vingador", "Avenger", "Vengador", "slay", "Abater", "Slay", "Ejecutar", 12, 59],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "blood_calls_blood", "Sangue Chama Sangue", "Blood Calls Blood", "La sangre llama a la sangre", 4, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "rising_blood_magic", "Magia de Sangue Crescente", "Rising Blood Magic", "Magia de sangre creciente", 4, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "siphon_magic", "Sifonar Magia", "Siphon Magic", "Sifonar magia", 6, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "spelldrinker", "Bebedor de Magia", "Spelldrinker", "Bebedor de conjuros", 8, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "hematocritical", "Hemato Crítico", "Hematocritical", "Hematocrítico", 10, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "surging_blood_magic", "Magia de Sangue Impetuosa", "Surging Blood Magic", "Magia de sangre impetuosa", 12, 61],
  ["bloodrager", "Furioso de Sangue", "Bloodrager", "Furioso de sangre", "exultant_blood_magic", "Magia de Sangue Exultante", "Exultant Blood Magic", "Magia de sangre exultante", 18, 61],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "patrons_glamour", "Fascínio do Patrono", "Patron's Glamour", "Glamour del patrón", 4, 63],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "seneschal_spell", "Feitiço de Senescal", "Seneschal Spell", "Conjuro de senescal", 4, 63],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "multifaceted_will", "Vontade Multifacetada", "Multifaceted Will", "Voluntad multifacética", 6, 63],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "spiritual_secret", "Segredo Espiritual", "Spiritual Secret", "Secreto espiritual", 6, 64],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "watcher_on_the_wall", "Vigia no Muro", "Watcher on the Wall", "Vigía en el muro", 8, 64],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "patrons_whisper", "Sussurro do Patrono", "Patron's Whisper", "Susurro del patrón", 10, 64],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "unstable_patronage", "Patronato Instável", "Unstable Patronage", "Patronazgo inestable", 14, 64],
  ["seneschal", "Senescal", "Seneschal", "Senescal", "patron_reborn", "Patrono Renascido", "Patron Reborn", "Patrón renacido", 20, 64],
  ["vindicator", "Vindicador", "Vindicator", "Vindicador", "interrogate", "Interrogar", "Interrogate", "Interrogar", 6, 65],
  ["vindicator", "Vindicador", "Vindicator", "Vindicador", "disrupt_opposed_magic", "Romper Magia Oposta", "Disrupt Opposed Magic", "Interrumpir magia opuesta", 8, 65],
  ["vindicator", "Vindicador", "Vindicator", "Vindicador", "vindicators_judgment", "Julgamento do Vindicador", "Vindicator's Judgment", "Juicio del vindicador", 10, 65],
  ["vindicator", "Vindicador", "Vindicator", "Vindicador", "call_the_hunt", "Convocar a Caçada", "Call the Hunt", "Llamar a la cacería", 12, 65],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "heroic_defiance", "Desafio Heroico", "Heroic Defiance", "Desafío heroico", 4, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "piercing_doom", "Perfurar o Destino", "Piercing Doom", "Perforar la condena", 8, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "spear_of_doom", "Lança do Destino", "Spear of Doom", "Lanza de la condena", 10, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "know_thy_doom", "Conheça seu Destino", "Know Thy Doom", "Conoce tu condena", 12, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "only_my_doom_may_claim_me", "Somente Meu Destino Pode me Reclamar", "Only My Doom May Claim Me", "Solo mi condena puede reclamarme", 14, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "spear_dancer", "Dançarino da Lança", "Spear Dancer", "Bailarín de la lanza", 6, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "needle_in_the_gods_eyes", "Agulha nos Olhos dos Deuses", "Needle in the Gods' Eyes", "Aguja en los ojos de los dioses", 16, 67],
  ["warrior_of_legend", "Guerreiro da Lenda", "Warrior of Legend", "Guerrero de leyenda", "razors_edge", "Fio da Navalha", "Razor's Edge", "Filo de la navaja", 18, 67],
];
for (const [archetype, ptArchetype, enArchetype, esArchetype, slug, pt, en, es, level, page] of WAR_IMMORTALS_CLASS_ARCHETYPE_FEATS) {
  const id = `feat.archetype.${archetype}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo ${ptArchetype} para personagens que possuem a dedicação correspondente.`,
      en: `${enArchetype} archetype feat for characters with the corresponding dedication.`,
      es: `Dote del arquetipo ${esArchetype} para personajes con la dedicación correspondiente.`,
    },
    description: `Talento do arquétipo ${ptArchetype}.`,
    category: "Arquetipo",
    type: "Talento",
    level,
    archetypeId: `archetype.${archetype}`,
    prerequisites: [`Dedicação de ${ptArchetype}`],
    prereq: [`Dedicação de ${ptArchetype}`],
    traits: ["Arquetipo"],
    source: { book: WAR_IMMORTALS_SOURCE, page },
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, pp. 14–18: talentos de ancestralidade do Jotunnato.
const BATTLECRY_JOTUNBORN_FEATS = [
  ["caretakers_intuition", "Intuição do Cuidador", "Caretaker's Intuition", "Intuición del cuidador", 1, 14],
  ["caretakers_restoration", "Restauração do Cuidador", "Caretaker's Restoration", "Restauración del cuidador", 1, 14],
  ["jotunborn_weapon_familiarity", "Familiaridade com Armas Jotunnatas", "Jotunborn Weapon Familiarity", "Familiaridad con armas jotun", 1, 14],
  ["plane_stepping_dash", "Arrancada entre Planos", "Plane-Stepping Dash", "Embestida entre planos", 1, 14],
  ["jotuns_eyes", "Olhos de Jotun", "Jotun's Eyes", "Ojos de Jotun", 1, 14],
  ["jotunborn_grappler", "Agarrador Jotunnato", "Jotunborn Grappler", "Agarrador jotun", 1, 14],
  ["jotunborn_lore", "Saber Jotunnato", "Jotunborn Lore", "Saber jotun", 1, 14],
  ["call_the_first_tools", "Convocar as Primeiras Ferramentas", "Call the First Tools", "Llamar a las primeras herramientas", 5, 15],
  ["jotuns_battle_stance", "Postura de Batalha de Jotun", "Jotun's Battle Stance", "Postura de batalla de Jotun", 5, 15],
  ["jotuns_grasp", "Agarrão de Jotun", "Jotun's Grasp", "Agarre de Jotun", 5, 15],
  ["planar_resilience", "Resiliência Planar", "Planar Resilience", "Resiliencia planar", 5, 15],
  ["pounding_leap", "Salto Poderoso", "Pounding Leap", "Salto contundente", 5, 15],
  ["build_the_first_walls", "Construir as Primeiras Muralhas", "Build the First Walls", "Construir las primeras murallas", 9, 16],
  ["iivlars_deflection", "Deflexão de Iivlar", "Iivlar's Deflection", "Desvío del iivlar", 9, 16],
  ["jotuns_boost", "Impulso de Jotun", "Jotun's Boost", "Impulso de Jotun", 9, 16],
  ["plane_step", "Passo Planar", "Plane Step", "Paso planar", 9, 16],
  ["iivlars_boundary_break", "Ruptura da Fronteira de Iivlar", "Iivlar's Boundary Break", "Ruptura del límite del iivlar", 13, 17],
  ["jotuns_restoration", "Restauração de Jotun", "Jotun's Restoration", "Restauración de Jotun", 13, 17],
  ["plane_hop", "Salto Planar", "Plane Hop", "Salto planar", 13, 17],
  ["smoothing_stomp", "Pisada Suavizadora", "Smoothing Stomp", "Pisotón suavizante", 13, 17],
  ["jotuns_heart", "Coração de Jotun", "Jotun's Heart", "Corazón de Jotun", 17, 18],
  ["jotuns_transposition", "Transposição de Jotun", "Jotun's Transposition", "Transposición de Jotun", 17, 18],
  ["planar_traveler", "Viajante Planar", "Planar Traveler", "Viajero planar", 17, 18],
];
for (const [slug, pt, en, es, level, page] of BATTLECRY_JOTUNBORN_FEATS) {
  const id = `feat.ancestry.jotunborn.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de ancestralidade do Jotunnato, nível ${level}.`,
      en: `Jotunborn ancestry feat, level ${level}.`,
      es: `Dote de ascendencia jotun, nivel ${level}.`,
    },
    description: "Talento de ancestralidade do Jotunnato.",
    category: "Ancestralidade",
    type: "Talento",
    level,
    ancestryId: "ancestry.jotunborn",
    traits: ["Jotunnato"],
    source: { book: BATTLECRY_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, pp. 52–53: progressão dos arquétipos multiclasse.
const BATTLECRY_MULTICLASS_FEATS = [
  ["commander", "Comandante", "Commander", "Comandante", "dedication", "Dedicação", "Dedication", "Dedicación", 2, 52],
  ["commander", "Comandante", "Commander", "Comandante", "basic_field_training", "Treinamento de Campo Básico", "Basic Field Training", "Entrenamiento de campo básico", 4, 52],
  ["commander", "Comandante", "Commander", "Comandante", "tactical_excellence", "Excelência Tática", "Tactical Excellence", "Excelencia táctica", 4, 52],
  ["commander", "Comandante", "Commander", "Comandante", "advanced_field_training", "Treinamento de Campo Avançado", "Advanced Field Training", "Entrenamiento de campo avanzado", 6, 52],
  ["commander", "Comandante", "Commander", "Comandante", "officers_expertise", "Maestria do Oficial", "Officer's Expertise", "Pericia del oficial", 12, 52],
  ["commander", "Comandante", "Commander", "Comandante", "officers_mastery", "Maestria Superior do Oficial", "Officer's Mastery", "Maestría del oficial", 18, 52],
  ["guardian", "Guardião", "Guardian", "Guardián", "dedication", "Dedicação", "Dedication", "Dedicación", 2, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "armored_resistance", "Resistência Blindada", "Armored Resistance", "Resistencia blindada", 8, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "ironclad_fortitude", "Fortitude de Ferro", "Ironclad Fortitude", "Fortaleza de hierro", 12, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "basic_defender", "Defensor Básico", "Basic Defender", "Defensor básico", 4, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "guardian_resiliency", "Resiliência de Guardião", "Guardian Resiliency", "Resiliencia del guardián", 4, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "advanced_defender", "Defensor Avançado", "Advanced Defender", "Defensor avanzado", 6, 53],
  ["guardian", "Guardião", "Guardian", "Guardián", "guardians_intercept", "Interceptação do Guardião", "Guardian's Intercept", "Intercepción del guardián", 6, 53],
];
for (const [archetype, ptArchetype, enArchetype, esArchetype, slug, pt, en, es, level, page] of BATTLECRY_MULTICLASS_FEATS) {
  const id = `feat.archetype.${archetype}_multiclass.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  const dedicationLabel = `Dedicação de ${ptArchetype}`;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de ${ptArchetype}, nível ${level}.`,
      en: `${enArchetype} multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de ${esArchetype}, nivel ${level}.`,
    },
    description: `Talento do arquétipo multiclasse de ${ptArchetype}.`,
    category: "Arquetipo",
    type: "Talento",
    level,
    archetypeId: `archetype.${archetype}_multiclass`,
    prerequisites: slug === "dedication" ? [`Classe ${ptArchetype}`] : [dedicationLabel],
    prereq: slug === "dedication" ? [`Classe ${ptArchetype}`] : [dedicationLabel],
    traits: ["Arquetipo", "Multiclasse"],
    source: { book: BATTLECRY_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, pp. 25–35: talentos de classe do Comandante.
const BATTLECRY_COMMANDER_FEATS = [
  ["armored_regiment_training", "Treinamento de Regimento Blindado", "Armored Regiment Training", "Entrenamiento de regimiento blindado", 1, 25],
  ["combat_assessment", "Avaliação de Combate", "Combat Assessment", "Evaluación de combate", 1, 25],
  ["commanders_companion", "Companheiro do Comandante", "Commander's Companion", "Compañero del comandante", 1, 25],
  ["deceptive_tactics", "Táticas Enganosas", "Deceptive Tactics", "Tácticas engañosas", 1, 25],
  ["officers_medical_training", "Treinamento Médico do Oficial", "Officer's Medical Training", "Entrenamiento médico del oficial", 1, 25],
  ["plant_banner", "Plantar Estandarte", "Plant Banner", "Plantar estandarte", 1, 25],
  ["adaptive_stratagem", "Estratagema Adaptável", "Adaptive Stratagem", "Estratagema adaptable", 2, 27],
  ["defensive_swap", "Troca Defensiva", "Defensive Swap", "Intercambio defensivo", 2, 27],
  ["guiding_shot", "Disparo Orientador", "Guiding Shot", "Disparo guiado", 2, 27],
  ["rapid_assessment", "Avaliação Rápida", "Rapid Assessment", "Evaluación rápida", 2, 27],
  ["set_up_strike", "Preparar Golpe", "Set-Up Strike", "Preparar golpe", 2, 27],
  ["tactical_expansion", "Expansão Tática", "Tactical Expansion", "Expansión táctica", 2, 27],
  ["banners_inspiration", "Inspiração do Estandarte", "Banner's Inspiration", "Inspiración del estandarte", 4, 29],
  ["banner_twirl", "Giro do Estandarte", "Banner Twirl", "Giro del estandarte", 4, 29],
  ["observational_analysis", "Análise Observacional", "Observational Analysis", "Análisis observacional", 4, 29],
  ["shielded_recovery", "Recuperação Protegida", "Shielded Recovery", "Recuperación protegida", 4, 29],
  ["unsteadying_strike", "Golpe Desequilibrante", "Unsteadying Strike", "Golpe desequilibrante", 4, 29],
  ["battle_tested_companion", "Companheiro Testado em Batalha", "Battle-Tested Companion", "Compañero curtido en batalla", 6, 31],
  ["claim_the_field", "Reivindicar o Campo", "Claim the Field", "Reclamar el campo", 6, 31],
  ["efficient_preparation", "Preparação Eficiente", "Efficient Preparation", "Preparación eficiente", 6, 31],
  ["reactive_strike", "Golpe Reativo", "Reactive Strike", "Golpe reactivo", 6, 31],
  ["shield_warden", "Guardião do Escudo", "Shield Warden", "Guardián del escudo", 6, 31],
  ["defiant_banner", "Estandarte Desafiador", "Defiant Banner", "Estandarte desafiante", 8, 33],
  ["officers_education", "Educação do Oficial", "Officer's Education", "Educación del oficial", 8, 33],
  ["rallying_banner", "Estandarte de Reagrupamento", "Rallying Banner", "Estandarte de reagrupamiento", 8, 33],
  ["unrivaled_analysis", "Análise Inigualável", "Unrivaled Analysis", "Análisis inigualable", 8, 33],
  ["drilled_reflexes", "Reflexos Treinados", "Drilled Reflexes", "Reflejos entrenados", 10, 34],
  ["standard_bearers_sacrifice", "Sacrifício do Porta-Estandarte", "Standard-Bearer's Sacrifice", "Sacrificio del portaestandarte", 10, 34],
  ["targeting_strike", "Golpe de Mira", "Targeting Strike", "Golpe de puntería", 10, 34],
  ["fortunate_blow", "Golpe Afortunado", "Fortunate Blow", "Golpe afortunado", 12, 35],
  ["perfected_evaluations", "Avaliações Aperfeiçoadas", "Perfected Evaluations", "Evaluaciones perfeccionadas", 12, 35],
  ["reactive_interference", "Interferência Reativa", "Reactive Interference", "Interferencia reactiva", 12, 35],
  ["contact_with_the_enemy", "Contato com o Inimigo", "Contact with the Enemy", "Contacto con el enemigo", 14, 35],
  ["desperate_resuscitation", "Ressuscitação Desesperada", "Desperate Resuscitation", "Reanimación desesperada", 14, 35],
  ["quickening_banner", "Estandarte Acelerador", "Quickening Banner", "Estandarte acelerador", 14, 35],
  ["confusing_commands", "Comandos Confusos", "Confusing Commands", "Órdenes confusas", 16, 35],
  ["mercenary_reversal", "Reversão Mercenária", "Mercenary Reversal", "Reversión mercenaria", 18, 35],
  ["demand_surrender", "Exigir Rendição", "Demand Surrender", "Exigir rendición", 18, 35],
  ["glorious_banner", "Estandarte Glorioso", "Glorious Banner", "Estandarte glorioso", 20, 35],
  ["pennant_of_victory", "Pendente da Vitória", "Pennant of Victory", "Pendón de la victoria", 20, 35],
];
for (const [slug, pt, en, es, level, page] of BATTLECRY_COMMANDER_FEATS) {
  const id = `feat.class.commander.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de classe do Comandante, nível ${level}.`,
      en: `Commander class feat, level ${level}.`,
      es: `Dote de clase de Comandante, nivel ${level}.`,
    },
    description: "Talento de classe do Comandante.",
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.commander",
    traits: ["Comandante"],
    source: { book: BATTLECRY_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, pp. 41–51: talentos de classe do Guardião.
const BATTLECRY_GUARDIAN_FEATS = [
  ["bodyguard", "Guarda-Costas", "Bodyguard", "Guardaespaldas", 1, 41],
  ["defensive_advance", "Avanço Defensivo", "Defensive Advance", "Avance defensivo", 1, 41],
  ["larger_than_life", "Maior que a Vida", "Larger than Life", "Más grande que la vida", 1, 41],
  ["reactive_shield", "Escudo Reativo", "Reactive Shield", "Escudo reactivo", 1, 41],
  ["long_distance_taunt", "Provocação de Longa Distância", "Long-Distance Taunt", "Provocación a larga distancia", 1, 41],
  ["punishing_shove", "Empurrão Punitivo", "Punishing Shove", "Empujón punitivo", 1, 41],
  ["shield_warfare", "Guerra de Escudo", "Shield Warfare", "Guerra con escudo", 1, 41],
  ["shoulder_check", "Trombada", "Shoulder Check", "Golpe de hombro", 1, 41],
  ["aggressive_block", "Bloqueio Agressivo", "Aggressive Block", "Bloqueo agresivo", 2, 42],
  ["covering_stance", "Postura de Cobertura", "Covering Stance", "Postura de cobertura", 2, 42],
  ["hampering_stance", "Postura Impeditiva", "Hampering Stance", "Postura entorpecedora", 2, 42],
  ["phalanx_formation", "Formação de Falange", "Phalanx Formation", "Formación de falange", 2, 42],
  ["raise_haft", "Erguer o Cabo", "Raise Haft", "Alzar el asta", 2, 42],
  ["shield_your_eyes", "Proteja seus Olhos", "Shield Your Eyes", "Protege tus ojos", 2, 42],
  ["shielding_taunt", "Provocação Protetora", "Shielding Taunt", "Provocación protectora", 2, 42],
  ["taunting_strike", "Golpe Provocador", "Taunting Strike", "Golpe provocador", 2, 42],
  ["area_armor", "Armadura de Área", "Area Armor", "Armadura de área", 4, 44],
  ["armored_courage", "Coragem Blindada", "Armored Courage", "Coraje blindado", 4, 44],
  ["energy_interceptor", "Interceptor de Energia", "Energy Interceptor", "Interceptor de energía", 4, 44],
  ["flying_tackle", "Agarrão Voador", "Flying Tackle", "Placaje volador", 4, 44],
  ["not_so_fast", "Nem Tão Rápido!", "Not So Fast!", "¡No tan rápido!", 4, 44],
  ["proud_nail", "Prego Orgulhoso", "Proud Nail", "Clavo orgulloso", 4, 44],
  ["shielded_attrition", "Desgaste Protegido", "Shielded Attrition", "Desgaste protegido", 4, 44],
  ["disarming_intercept", "Interceptação Desarmadora", "Disarming Intercept", "Intercepción desarmadora", 6, 46],
  ["guarded_advance", "Avanço Guardado", "Guarded Advance", "Avance protegido", 6, 46],
  ["lock_down", "Conter", "Lock Down", "Bloquear", 6, 46],
  ["reactive_strike", "Golpe Reativo", "Reactive Strike", "Golpe reactivo", 6, 46],
  ["reflexive_shield", "Escudo Reflexivo", "Reflexive Shield", "Escudo reflexivo", 6, 46],
  ["retaliating_rescue", "Resgate Retaliatório", "Retaliating Rescue", "Rescate retaliatorio", 6, 46],
  ["ring_their_bell", "Fazer Soar o Sino", "Ring Their Bell", "Hacer sonar su campana", 6, 46],
  ["stomp_ground", "Bater o Pé no Chão", "Stomp Ground", "Pisar fuerte", 6, 46],
  ["shield_wallop", "Pancada de Escudo", "Shield Wallop", "Golpe de escudo", 8, 48],
  ["group_taunt", "Provocação em Grupo", "Group Taunt", "Provocación grupal", 8, 48],
  ["juggernaut_charge", "Investida do Colosso", "Juggernaut Charge", "Carga del ariete", 8, 48],
  ["mighty_bulwark", "Baluarte Poderoso", "Mighty Bulwark", "Baluarte poderoso", 8, 48],
  ["repositioning_block", "Bloqueio de Reposicionamento", "Repositioning Block", "Bloqueo de reposicionamiento", 8, 48],
  ["shield_from_arrows", "Escudo contra Flechas", "Shield from Arrows", "Escudo contra flechas", 8, 48],
  ["belly_flop", "Barrigada", "Belly Flop", "Plancha", 10, 49],
  ["get_behind_me", "Fique Atrás de Mim!", "Get Behind Me!", "¡Ponte detrás de mí!", 10, 49],
  ["momentum_strike", "Golpe de Ímpeto", "Momentum Strike", "Golpe de impulso", 10, 49],
  ["shield_salvation", "Salvação do Escudo", "Shield Salvation", "Salvación del escudo", 10, 49],
  ["sure_footed", "Pés Firmes", "Sure-Footed", "De pies firmes", 10, 49],
  ["tough_cookie", "Durão", "Tough Cookie", "Tipo duro", 10, 49],
  ["armor_break", "Rompedor de Armadura", "Armor Break", "Romper armadura", 12, 50],
  ["armored_counterattack", "Contra-Ataque Blindado", "Armored Counterattack", "Contraataque blindado", 12, 50],
  ["right_where_you_want_them", "Exatamente Onde Você Quer", "Right Where You Want Them", "Justo donde los quieres", 12, 50],
  ["scattering_charge", "Investida Dispersora", "Scattering Charge", "Carga dispersora", 12, 50],
  ["weakening_assault", "Assalto Enfraquecedor", "Weakening Assault", "Asalto debilitante", 12, 50],
  ["devastating_shield_wallop", "Pancada de Escudo Devastadora", "Devastating Shield Wallop", "Golpe de escudo devastador", 12, 50],
  ["paragons_guard", "Guarda do Paragon", "Paragon's Guard", "Guardia del parangón", 12, 50],
  ["blanket_defense", "Defesa Abrangente", "Blanket Defense", "Defensa general", 14, 51],
  ["bloody_denial", "Negação Sangrenta", "Bloody Denial", "Negación sangrienta", 14, 51],
  ["keep_up_the_good_fight", "Continue a Boa Luta", "Keep Up the Good Fight", "Sigue con la buena lucha", 14, 51],
  ["opening_stance", "Postura de Abertura", "Opening Stance", "Postura de apertura", 14, 51],
  ["clang", "Clang!", "Clang!", "¡Clang!", 16, 51],
  ["clobber", "Esmagar", "Clobber", "Aporrear", 16, 51],
  ["improved_reflexive_shield", "Escudo Reflexivo Aprimorado", "Improved Reflexive Shield", "Escudo reflexivo mejorado", 16, 51],
  ["never", "Nunca!", "Never!", "¡Nunca!", 16, 51],
  ["demolish_defenses", "Demolir Defesas", "Demolish Defenses", "Demoler defensas", 18, 51],
  ["perfect_protection", "Proteção Perfeita", "Perfect Protection", "Protección perfecta", 18, 51],
  ["quick_vengeance", "Vingança Rápida", "Quick Vengeance", "Venganza rápida", 18, 51],
  ["shield_from_spells", "Escudo contra Magias", "Shield from Spells", "Escudo contra conjuros", 18, 51],
  ["boundless_reprisal", "Retaliações sem Limite", "Boundless Reprisals", "Represalias ilimitadas", 20, 51],
  ["great_shield_mastery", "Maestria do Grande Escudo", "Great Shield Mastery", "Maestría del gran escudo", 20, 51],
  ["unyielding_force", "Força Inabalável", "Unyielding Force", "Fuerza inquebrantable", 20, 51],
];
for (const [slug, pt, en, es, level, page] of BATTLECRY_GUARDIAN_FEATS) {
  const id = `feat.class.guardian.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de classe do Guardião, nível ${level}.`,
      en: `Guardian class feat, level ${level}.`,
      es: `Dote de clase de Guardián, nivel ${level}.`,
    },
    description: "Talento de classe do Guardião.",
    category: "Classe",
    type: "Talento",
    level,
    classId: "class.guardian",
    traits: ["Guardião"],
    source: { book: BATTLECRY_SOURCE, page },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, p. 118: armas e equipamento mundanos do capítulo Armory.
const BATTLECRY_EQUIPMENT = [
  ["battle_lute", "Lute de Batalha", "Battle Lute", "Laúd de batalla", "1d4", "Contundente", 1, "7 PO", "Simples"],
  ["fauchard", "Fauchard", "Fauchard", "Fauchard", "1d8", "Cortante", 2, "1 PO 4 PP", "Marcial"],
  ["gaff", "Gancho", "Gaff", "Garfio", "1d6", "Impacto", 1, "1 PO", "Marcial"],
  ["scourge", "Chicote de Nós", "Scourge", "Azote", "1d4", "Cortante", 1, "1 PP", "Marcial"],
  ["bladed_gauntlet", "Manopla Lâmina", "Bladed Gauntlet", "Guantelete afilado", "1d4", "Cortante", "L", "5 PO", "Marcial"],
  ["lion_scythe", "Foice do Leão", "Lion Scythe", "Guadaña de león", "1d6", "Cortante", "L", "1 PO", "Marcial"],
  ["war_lance", "Lança de Guerra", "War Lance", "Lanza de guerra", "1d8", "Perfurante", 2, "4 PO", "Marcial"],
  ["aldori_dueling_sword", "Espada de Duelo Aldori", "Aldori Dueling Sword", "Espada de duelo aldori", "1d8", "Cortante", 1, "2 PO", "Avançada"],
  ["bladesweeper", "Varredor de Lâminas", "Bladesweeper", "Barrid hojas", "1d10", "Cortante", 2, "4 PO", "Avançada"],
  ["maul_spade", "Pá-Malho", "Maul-Spade", "Pala-mazo", "1d10", "Impacto", 2, "6 PO", "Avançada"],
  ["gauntlet_bow", "Arco de Manopla", "Gauntlet Bow", "Arco de guantelete", "1d4", "Perfurante", 1, "9 PO", "Marcial"],
  ["repeating_hand_crossbow", "Besta de Mão Repetidora", "Repeating Hand Crossbow", "Ballesta de mano repetidora", "1d6", "Perfurante", "L", "10 PO", "Avançada"],
];
for (const [slug, pt, en, es, damage, damageType, bulk, price, category] of BATTLECRY_EQUIPMENT) {
  const id = `weapon.battlecry.${slug}`;
  if ((PF2E_DATA.weapons || []).some((record) => record.id === id)) continue;
  PF2E_DATA.weapons.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Arma de Battlecry!, dano ${damage}, categoria ${category}.`,
      en: `Battlecry! weapon, ${damage} damage, ${category} category.`,
      es: `Arma de Battlecry!, daño ${damage}, categoría ${category}.`,
    },
    description: `Arma mundana de Battlecry!, dano ${damage}.`,
    category,
    damage,
    damageType,
    bulk,
    price,
    level: 0,
    source: { book: BATTLECRY_SOURCE, page: 118 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}
const BATTLECRY_GEAR = [
  ["repeater_bandolier", "Bandoleira de Repetidor", "Repeater Bandolier", "Bandolera de repetidor", "1 PO", "L"],
  ["war_saddle", "Sela de Guerra", "War Saddle", "Silla de guerra", "50 PO", 1],
];
for (const [slug, pt, en, es, price, bulk] of BATTLECRY_GEAR) {
  const id = `item.battlecry.${slug}`;
  if ((PF2E_DATA.items || []).some((record) => record.id === id)) continue;
  PF2E_DATA.items.push({
    id,
    name: `${pt} (${en})`,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Equipamento de Battlecry!, preço ${price}.`,
      en: `Battlecry! equipment, price ${price}.`,
      es: `Equipo de Battlecry!, precio ${price}.`,
    },
    description: "Equipamento mundano de Battlecry!.",
    category: "Equipamento",
    price,
    bulk,
    level: 0,
    source: { book: BATTLECRY_SOURCE, page: 118 },
    sourceApproximate: true,
    ruleset: "remaster",
    needs_review: true,
  });
}

// Battlecry!, pp. 120–125 e 132: índices das tabelas mágicas do armorial.
const BATTLECRY_MAGIC_ARMOR = [
  ["alkenstar_phalanx", "Falange de Alkenstar", "Alkenstar Phalanx", "Falange de Alkenstar", 14],
  ["ankhrav_carapace", "Carapaça de Ankhrav", "Ankhrav Carapace", "Caparazón de ankhrav", 7],
  ["autoload_leathers", "Couros de Autocarregamento", "Autoload Leathers", "Cueros de autocarga", 9],
  ["balloon_padding", "Acolchoamento de Balão", "Balloon Padding", "Acolchado de globo", 8],
  ["bismuth_armor", "Armadura de Bismuto", "Bismuth Armor", "Armadura de bismuto", 13],
  ["buoyant_buckle", "Fivela Flutuante", "Buoyant Buckle", "Hebilla flotante", 6],
  ["command_cuirass", "Couraça de Comando", "Command Cuirass", "Coraza de mando", 8],
  ["crafting_leathers", "Couros de Ofício", "Crafting Leathers", "Cueros de artesanía", 5],
  ["deep_pockets", "Bolsos Profundos", "Deep Pockets", "Bolsillos profundos", 6],
  ["deep_sea_plate", "Placas do Mar Profundo", "Deep Sea Plate", "Placas de las profundidades", 8],
  ["eagle_wing", "Asa de Águia", "Eagle Wing", "Ala de águila", 10],
  ["frost_furs", "Peles de Geada", "Frost Furs", "Pieles de escarcha", 14],
  ["grisly_brigandine", "Brigandina Macabra", "Grisly Brigandine", "Brigandina macabra", 12],
  ["incendiary_plate", "Placas Incendiárias", "Incendiary Plate", "Placas incendiarias", 20],
  ["juggernaut_plate", "Placas do Colosso", "Juggernaut Plate", "Placas del ariete", 19],
  ["lifting_leather", "Couro de Levantamento", "Lifting Leather", "Cuero de levantamiento", 8],
  ["locust_leather", "Couro de Gafanhoto", "Locust Leather", "Cuero de langosta", 8],
  ["message_mail", "Malha de Mensagem", "Message Mail", "Malla de mensajes", 8],
  ["shadow_shroud", "Sudário de Sombras", "Shadow Shroud", "Sudario de sombras", 10],
  ["thunder_mail", "Malha do Trovão", "Thunder Mail", "Malla del trueno", 15],
  ["umbral_armor", "Armadura Umbral", "Umbral Armor", "Armadura umbría", 10],
  ["wilderness_weave", "Trama dos Ermos", "Wilderness Weave", "Tejido de la espesura", 5],
];
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_ARMOR) {
  const id = `armor.battlecry.${slug}`;
  if ((PF2E_DATA.armors || []).some((record) => record.id === id)) continue;
  PF2E_DATA.armors.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Armadura mágica de Battlecry!, nível ${level}.`, en: `Battlecry! magic armor, level ${level}.`, es: `Armadura mágica de Battlecry!, nivel ${level}.` },
    description: "Armadura mágica de Battlecry!; efeito detalhado pendente de revisão.", category: "Armadura Mágica", level,
    source: { book: BATTLECRY_SOURCE, page: 120 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}
const BATTLECRY_MAGIC_SHIELDS = [
  ["bivouac_targe", "Broquel de Bivaque", "Bivouac Targe", "Rodela de vivac", 2],
  ["dragon_shield", "Escudo de Dragão", "Dragon Shield", "Escudo de dragón", 13],
  ["energized_shield", "Escudo Energizado", "Energized Shield", "Escudo energizado", 7],
  ["medics_shield", "Escudo do Médico", "Medic's Shield", "Escudo del médico", 14],
  ["siege_shield", "Escudo de Cerco", "Siege Shield", "Escudo de asedio", 3],
  ["sun_slayer", "Matador do Sol", "Sun Slayer", "Asolador del sol", 10],
  ["testudo_shield", "Escudo Testudo", "Testudo Shield", "Escudo testudo", 5],
  ["tiger_shield", "Escudo do Tigre", "Tiger Shield", "Escudo del tigre", 5],
  ["vambrace_of_gorum", "Vambrace de Gorum", "Vambrace of Gorum", "Brazal de Gorum", 20],
  ["vanguards_shield", "Escudo da Vanguarda", "Vanguard's Shield", "Escudo de la vanguardia", 13],
];
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_SHIELDS) {
  const id = `shield.battlecry.${slug}`;
  if ((PF2E_DATA.shields || []).some((record) => record.id === id)) continue;
  PF2E_DATA.shields.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Escudo mágico de Battlecry!, nível ${level}.`, en: `Battlecry! magic shield, level ${level}.`, es: `Escudo mágico de Battlecry!, nivel ${level}.` },
    description: "Escudo mágico de Battlecry!; efeito detalhado pendente de revisão.", category: "Escudo Mágico", level,
    source: { book: BATTLECRY_SOURCE, page: 124 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}
const BATTLECRY_MAGIC_AMMUNITION = [
  ["battering_ammunition", "Munição Impactante", "Battering Ammunition", "Munición contundente", 4],
  ["burrowing_bolt", "Virote Escavador", "Burrowing Bolt", "Virote excavador", 7],
  ["buoyant_shot", "Disparo Flutuante", "Buoyant Shot", "Disparo flotante", 5],
  ["calling_stone", "Pedra Chamadora", "Calling Stone", "Piedra llamadora", 7],
  ["extinguishing_ball", "Bola Extintora", "Extinguishing Ball", "Bola extintora", 8],
  ["flooding_bolt", "Virote Inundante", "Flooding Bolt", "Virote inundador", 8],
  ["infesting_shot", "Disparo Infestante", "Infesting Shot", "Disparo infestante", 10],
  ["miring_round", "Projétil Lamacento", "Miring Round", "Proyectil fangoso", 7],
  ["preserving_shot", "Disparo Preservador", "Preserving Shot", "Disparo preservador", 1],
  ["scouting_arrow", "Flecha de Reconhecimento", "Scouting Arrow", "Flecha de exploración", 8],
];
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_AMMUNITION) {
  const id = `item.battlecry.${slug}`;
  if ((PF2E_DATA.items || []).some((record) => record.id === id)) continue;
  PF2E_DATA.items.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Munição mágica de Battlecry!, nível ${level}.`, en: `Battlecry! magic ammunition, level ${level}.`, es: `Munición mágica de Battlecry!, nivel ${level}.` },
    description: "Munição mágica de Battlecry!; efeito detalhado pendente de revisão.", category: "Munição Mágica", level,
    source: { book: BATTLECRY_SOURCE, page: 132 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}
const BATTLECRY_MAGIC_WEAPONS = [
  ["belkzen_deadsmasher", "Esmagador de Mortos de Belkzen", "Belkzen Deadsmasher", "Destrozamuertos de Belkzen", 13],
  ["cavalry_commanders_lance", "Lança do Comandante de Cavalaria", "Cavalry Commander's Lance", "Lanza del comandante de caballería", 6],
  ["chain_of_command", "Cadeia de Comando", "Chain of Command", "Cadena de mando", 6],
  ["chainbreaker", "Quebra-Correntes", "Chainbreaker", "Rompecadenas", 5],
  ["dazzling_shortbow", "Arco Curto Deslumbrante", "Dazzling Shortbow", "Arco corto deslumbrante", 5],
  ["doomsweeper", "Varredor do Destino", "Doomsweeper", "Barredor de la condena", 8],
  ["draddeths_edge", "Fio de Draddeth", "Draddeth's Edge", "Filo de Draddeth", 16],
  ["final_stand", "Última Resistência", "Final Stand", "Última resistencia", 17],
  ["generals_word", "Palavra do General", "General's Word", "Palabra del general", 14],
  ["gravediggers_call", "Chamado do Coveiro", "Gravedigger's Call", "Llamada del sepulturero", 12],
  ["hells_judgment", "Julgamento do Inferno", "Hell's Judgment", "Juicio del infierno", 16],
  ["horselords_longbow", "Arco Longo do Senhor dos Cavalos", "Horselord's Longbow", "Arco largo del señor de los caballos", 6],
  ["jistkan_colossus_crusher", "Esmagador de Colossos Jistkan", "Jistkan Colossus Crusher", "Trituracolosos jistkan", 15],
  ["jistkan_war_crossbow", "Besta de Guerra Jistkan", "Jistkan War Crossbow", "Ballesta de guerra jistkan", 18],
  ["kithrender", "Rasgador de Kith", "Kithrender", "Desgarrakith", 16],
  ["lamentation_of_the_faithless", "Lamento dos Sem-Fé", "Lamentation of the Faithless", "Lamento de los sin fe", 25],
  ["last_hope", "Última Esperança", "Last Hope", "Última esperanza", 16],
  ["mageslayer", "Matamagos", "Mageslayer", "Matahechiceros", 8],
  ["radiant_victory", "Vitória Radiante", "Radiant Victory", "Victoria radiante", 6],
  ["reapers_toll", "Ceifa do Ceifador", "Reaper's Toll", "Peaje del segador", 15],
  ["revenant_blade", "Lâmina Revenante", "Revenant Blade", "Hoja revenante", 10],
  ["righteous_fury", "Fúria Justa", "Righteous Fury", "Furia justa", 15],
  ["talonstrike_blade", "Lâmina Golpe-Garra", "Talonstrike Blade", "Hoja golpegarra", 12],
  ["undead_scourge", "Flagelo dos Mortos-Vivos", "Undead Scourge", "Azote de muertos vivientes", 7],
  ["ulfen_shieldbreaker", "Quebra-Escudos Ulfen", "Ulfen Shieldbreaker", "Rompeescudos ulfen", 6],
];
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_WEAPONS) {
  const id = `weapon.battlecry.${slug}`;
  if ((PF2E_DATA.weapons || []).some((record) => record.id === id)) continue;
  PF2E_DATA.weapons.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Arma mágica de Battlecry!, nível ${level}.`, en: `Battlecry! magic weapon, level ${level}.`, es: `Arma mágica de Battlecry!, nivel ${level}.` },
    description: "Arma mágica de Battlecry!; efeito detalhado pendente de revisão.", category: "Arma Mágica", level,
    source: { book: BATTLECRY_SOURCE, page: 126 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// War of Immortals, pp. 146–147: Storied Equipment.
// The table statistics are indexed here; descriptive special rules remain under review.
const WAR_IMMORTALS_STORIED_ARMOR = [
  ["kilted_breastplate", "Peitoral com Kilt", "Kilted Breastplate", "Coraza con faldón", 1, 2, 3, -1, 1, "plate", ["flexible"]],
  ["rattan_armor", "Armadura de Rattan", "Rattan Armor", "Armadura de ratán", 1, 1, 4, -1, 0, "wood", ["aquadynamic"]],
  ["sankeit", "Sankeit", "Sankeit", "Sankeit", 1, 2, 3, -1, 1, "wood", ["laminar"]],
  ["lattice_armor", "Armadura de Treliça", "Lattice Armor", "Armadura de celosía", 2, 4, 1, -2, 3, "chain", ["skeletal", "laminar"]],
  ["niyah_at", "Niyah’at", "Niyah’at", "Niyah’at", 2, 3, 2, -2, 2, "skeletal", ["laminar"]],
];
for (const [slug, pt, en, es, level, ac, dexCap, checkPenalty, strength, group, traits] of WAR_IMMORTALS_STORIED_ARMOR) {
  const id = `armor.war_immortals.${slug}`;
  if ((PF2E_DATA.armors || []).some((record) => record.id === id)) continue;
  PF2E_DATA.armors.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Armadura de War of Immortals, nível ${level}.`, en: `War of Immortals armor, level ${level}.`, es: `Armadura de War of Immortals, nivel ${level}.` },
    description: "Armadura Storied Equipment; regras especiais e preço individual pendentes de revisão.", category: "Armadura", level, ac, dexCap, checkPenalty, strength, group, traits,
    source: { book: WAR_IMMORTALS_SOURCE, page: 146 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

const WAR_IMMORTALS_STORIED_WEAPONS = [
  ["fighting_oar", "Remo de Combate", "Fighting Oar", "Rema de combate", 1, "1d8", "B", 2, 2, "polearm", ["sweep", "versatile S"]],
  ["palstave", "Palstave", "Palstave", "Palstave", 1, "1d6", "S", 1, 1, "axe", ["sweep"]],
  ["war_gavel", "Malho de Guerra", "War Gavel", "Martillo de guerra", 1, "1d6", "B", 1, 1, "club", ["versatile P"]],
  ["combat_fishing_pole", "Vara de Pesca de Combate", "Combat Fishing Pole", "Caña de pesca de combate", 1, "1d6", "B", 1, 2, "club", ["backswing", "versatile B"]],
  ["gladius", "Gládio", "Gladius", "Gladius", 1, "1d6", "P", 1, 1, "sword", ["deadly d10", "versatile S"]],
  ["macuahuitl", "Macuahuitl", "Macuahuitl", "Macuahuitl", 1, "1d8", "S", 1, 2, "club", ["backswing", "tearing", "versatile B"]],
  ["war_javelin", "Azagaia de Guerra", "War Javelin", "Jabalina de guerra", 1, "1d6", "P", 1, 1, "dart", ["tethered", "thrown 30 ft."]],
  ["kestros", "Kestros", "Kestros", "Kestros", 1, "1d6", "P", 1, 1, "sling", ["concussive", "propulsive"]],
];
for (const [slug, pt, en, es, level, damage, damageType, bulk, hands, group, traits] of WAR_IMMORTALS_STORIED_WEAPONS) {
  const id = `weapon.war_immortals.${slug}`;
  if ((PF2E_DATA.weapons || []).some((record) => record.id === id)) continue;
  PF2E_DATA.weapons.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Arma Storied Equipment de War of Immortals, nível ${level}.`, en: `War of Immortals Storied Equipment weapon, level ${level}.`, es: `Arma Storied Equipment de War of Immortals, nivel ${level}.` },
    description: "Arma Storied Equipment; regras especiais, preço e munição associada pendentes de revisão.", category: "Arma", level, damage, damageType, bulk, hands, group, traits,
    source: { book: WAR_IMMORTALS_SOURCE, page: 147 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

const warFightingLureId = "item.war_immortals.fishing_lure";
if (!(PF2E_DATA.items || []).some((record) => record.id === warFightingLureId)) {
  PF2E_DATA.items.push({
    id: warFightingLureId, name: "Isca de Pesca (Fishing Lure)", names: { "pt-BR": "Isca de Pesca", en: "Fishing Lure", es: "Señuelo de pesca" },
    summaries: { "pt-BR": "Acessório de Vara de Pesca de Combate, nível 1.", en: "Combat fishing pole accessory, level 1.", es: "Accesorio de caña de pesca de combate, nivel 1." },
    description: "Acessório para a Vara de Pesca de Combate; efeitos detalhados pendentes de revisão.", category: "Equipamento", level: 1, bulk: "L", traits: ["tethered", "thrown 20 ft."],
    source: { book: WAR_IMMORTALS_SOURCE, page: 147 }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// War of Immortals, pp. 154–157: Mythic Spells index.
const WAR_IMMORTALS_MYTHIC_SPELLS = [
  ["rainbows_end", "Fim do Arco-Íris", "Rainbow's End", "Al final del arcoíris", 1, 156],
  ["banishing_touch", "Toque de Banimento", "Banishing Touch", "Toque desterrador", 2, 154],
  ["perceive_threads_of_fate", "Perceber os Fios do Destino", "Perceive the Threads of Fate", "Percibir los hilos del destino", 3, 155],
  ["it_is_written", "Está Escrito", "It Is Written", "Está escrito", 4, 155],
  ["tricksters_feathers", "Penas do Trapaceiro", "Trickster's Feathers", "Plumas del embaucador", 4, 157],
  ["diadem_of_divine_radiance", "Diadema do Esplendor Divino", "Diadem of Divine Radiance", "Diadema del resplandor divino", 5, 157],
  ["bounty_of_the_sky", "Dádiva do Céu", "Bounty of the Sky", "Dádiva del cielo", 6, 154],
  ["seize_identity", "Usurpar Identidade", "Seize Identity", "Usurpar identidad", 6, 156],
  ["final_fate_of_the_locust_host", "Destino Final da Horda de Locustas", "Final Fate of the Locust Host", "Destino final de la horda de langostas", 7, 154],
  ["part_the_mists_to_paradise", "Abrir as Brumas para o Paraíso", "Part the Mists to Paradise", "Abrir las brumas al paraíso", 8, 155],
  ["beseech_arcanotheign", "Suplicar a Arcanotheign", "Beseech Arcanotheign", "Suplicar a Arcanotheign", 9, 154],
  ["garden_of_the_green_mans_growth", "Jardim do Crescimento do Homem Verde", "Garden of the Green Man's Growth", "Jardín del crecimiento del Hombre Verde", 10, 155],
  ["summon_oliphaunt_of_jandelay", "Convocar Olifante de Jandelay", "Summon Oliphaunt of Jandelay", "Convocar al olifante de Jandelay", 10, 156],
];
for (const [slug, pt, en, es, rank, page] of WAR_IMMORTALS_MYTHIC_SPELLS) {
  const id = `spell.war_immortals.mythic.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    traditions: ["arcane", "divine", "occult", "primal"], category: "Magia Mítica", type: "Spell", traits: ["Mítico"],
    summaries: { "pt-BR": `Magia mítica de War of Immortals, ranque ${rank}.`, en: `War of Immortals mythic spell, rank ${rank}.`, es: `Conjuro mítico de War of Immortals, rango ${rank}.` },
    description: "Magia mítica; efeitos, requisitos de pontos míticos e tradições específicas permanecem pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// War of Immortals, pp. 158–162: Mythic Rituals index.
const WAR_IMMORTALS_MYTHIC_RITUALS = [
  ["band_of_heroes", "Bando de Heróis", "Band of Heroes", "Banda de héroes", 3, 159],
  ["wild_feast", "Banquete Selvagem", "Wild Feast", "Festín salvaje", 4, 159],
  ["world_in_shadow", "Mundo nas Sombras", "World in Shadow", "Mundo en sombras", 5, 160],
  ["kaiju_ward", "Proteção contra Kaiju", "Kaiju Ward", "Salvaguarda contra kaiju", 6, 160],
  ["city_of_sin", "Cidade do Pecado", "City of Sin", "Ciudad del pecado", 7, 159],
  ["unbearable_cacophony", "Cacofonia Insuportável", "Unbearable Cacophony", "Cacofonía insoportable", 7, 160],
  ["awaken_curse", "Despertar Maldição", "Awaken Curse", "Despertar maldición", 8, 158],
  ["create_demiplane", "Criar Semiplano", "Create Demiplane", "Crear semiplano", 8, 159],
  ["freedom", "Liberdade", "Freedom", "Libertad", 8, 159],
  ["imprisonment", "Aprisionamento", "Imprisonment", "Aprisionamiento", 8, 160],
  ["curse_of_calamity", "Maldição da Calamidade", "Curse of Calamity", "Maldición de calamidad", 9, 160],
  ["oceans_roar", "Rugido do Oceano", "Ocean's Roar", "Rugido del océano", 9, 161],
  ["void_harvest", "Colheita do Vazio", "Void Harvest", "Cosecha del vacío", 9, 161],
];
for (const [slug, pt, en, es, rank, page] of WAR_IMMORTALS_MYTHIC_RITUALS) {
  const id = `ritual.war_immortals.mythic.${slug}`;
  if ((PF2E_DATA.rituals || []).some((record) => record.id === id)) continue;
  PF2E_DATA.rituals.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    category: "Ritual Mítico", type: "Ritual", traits: ["Mítico"],
    summaries: { "pt-BR": `Ritual mítico de War of Immortals, ranque ${rank}; requer Ponto Mítico.`, en: `War of Immortals mythic ritual, rank ${rank}; requires a Mythic Point.`, es: `Ritual mítico de War of Immortals, rango ${rank}; requiere un Punto Mítico.` },
    description: "Ritual mítico; verificações, custos e efeitos completos permanecem pendentes de revisão.",
    source: { book: WAR_IMMORTALS_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// Battlecry!, pp. 84–92: Battle Magic. The local OEF extraction provides the
// stat-block headers and traditions; individual effects remain needs_review.
const BATTLECRY_BATTLE_SPELLS = [
  ["blinding_bottle", "Garrafa Cegante", "Blinding Bottle", "Botella cegadora", 5, ["arcane", "occult"], 84],
  ["blister_bomb", "Bomba de Bolhas", "Blister Bomb", "Bomba de ampollas", 3, ["arcane", "primal"], 84],
  ["boots_on_the_ground", "Pés no Chão", "Boots on the Ground", "Pies en tierra", 6, ["arcane", "occult"], 84],
  ["clockwork_devotion", "Devoção Mecânica", "Clockwork Devotion", "Devoción mecánica", 8, ["arcane"], 84],
  ["conquering_soldiers", "Soldados Conquistadores", "Conquering Soldiers", "Soldados conquistadores", 10, ["arcane", "divine"], 85],
  ["curse_of_recoil", "Maldição do Recuo", "Curse of Recoil", "Maldición del retroceso", 1, ["divine", "occult"], 85],
  ["dancing_shield", "Escudo Dançante", "Dancing Shield", "Escudo danzante", 2, ["arcane", "divine", "occult", "primal"], 85],
  ["desperate_repair", "Reparo Desesperado", "Desperate Repair", "Reparación desesperada", 5, ["arcane", "primal"], 86],
  ["dividing_trench", "Trincheira Divisória", "Dividing Trench", "Trinchera divisoria", 3, ["arcane", "primal"], 86],
  ["explosive_barrage", "Barragem Explosiva", "Explosive Barrage", "Bombardeo explosivo", 6, ["arcane", "primal"], 86],
  ["fallen_soldiers_lament", "Lamento do Soldado Caído", "Fallen Soldier's Lament", "Lamento del soldado caído", 4, ["divine", "occult"], 86],
  ["filter_air", "Filtrar o Ar", "Filter Air", "Filtrar el aire", 4, ["arcane", "divine", "primal"], 86],
  ["forced_mercy", "Misericórdia Forçada", "Forced Mercy", "Misericordia forzada", 1, ["divine", "occult"], 86],
  ["frozen_fog", "Névoa Congelada", "Frozen Fog", "Niebla congelada", 6, ["arcane", "primal"], 86],
  ["helpful_reload", "Recarga Prestativa", "Helpful Reload", "Recarga útil", 2, ["arcane", "divine", "occult"], 87],
  ["holy_host", "Exército Sagrado", "Holy Host", "Hueste sagrada", 8, ["divine", "occult"], 87],
  ["instant_minefield", "Campo Minado Instantâneo", "Instant Minefield", "Campo minado instantáneo", 5, ["arcane", "occult"], 88],
  ["jassims_allegiance", "Lealdade de Jassim", "Jassim's Allegiance", "Lealtad de Jassim", 10, ["arcane", "occult"], 88],
  ["lock_item", "Trancar Item", "Lock Item", "Bloquear objeto", 2, ["arcane", "primal"], 88],
  ["pest_swarm", "Enxame de Pragas", "Pest Swarm", "Enjambre de plagas", 4, ["arcane", "occult", "primal"], 89],
  ["shock_and_awe", "Choque e Pavor", "Shock and Awe", "Choque y pavor", 5, ["arcane", "occult"], 89],
  ["siege_weapons_blessing", "Bênção da Arma de Cerco", "Siege Weapon's Blessing", "Bendición del arma de asedio", 6, ["arcane", "divine", "occult"], 89],
  ["skeleton_army", "Exército de Esqueletos", "Skeleton Army", "Ejército de esqueletos", 6, ["arcane", "divine", "occult"], 90],
  ["steel_fortifications", "Fortificações de Aço", "Steel Fortifications", "Fortificaciones de acero", 2, ["arcane", "primal"], 90],
  ["sticky_fire", "Fogo Pegajoso", "Sticky Fire", "Fuego pegajoso", 2, ["arcane", "primal"], 91],
  ["unholy_army", "Exército Profano", "Unholy Army", "Ejército impío", 8, ["divine", "occult"], 91],
];
for (const [slug, pt, en, es, rank, traditions, page] of BATTLECRY_BATTLE_SPELLS) {
  const id = `spell.battlecry.battle_magic.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    category: "Magia de Batalha", type: "Spell", traditions, traits: ["Batalha"],
    summaries: {
      "pt-BR": `Magia de batalha de Battlecry!, ranque ${rank}.`,
      en: `Battlecry! battle magic spell, rank ${rank}.`,
      es: `Conjuro de batalla de Battlecry!, rango ${rank}.`,
    },
    description: "Magia de Battlecry!; efeito detalhado pendente de revisão.",
    source: { book: BATTLECRY_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// Battlecry!, pp. 92–95: Siege Rituals.
const BATTLECRY_SIEGE_RITUALS = [
  ["army_of_shadows", "Exército de Sombras", "Army of Shadows", "Ejército de sombras", 2, 92],
  ["oil_slicked_walls", "Muralhas Escorregadias de Óleo", "Oil-Slicked Walls", "Muros aceitosos", 2, 93],
  ["secure_siege_weapons", "Proteger Armas de Cerco", "Secure Siege Weapons", "Asegurar armas de asedio", 3, 94],
  ["reinforced_rations", "Rações Reforçadas", "Reinforced Rations", "Raciones reforzadas", 4, 93],
  ["plague_shot", "Projétil Pestilento", "Plague Shot", "Proyectil pestilente", 5, 93],
  ["sleepless_season", "Estação sem Sono", "Sleepless Season", "Estación sin sueño", 6, 94],
  ["sprawling_tunnels", "Túneis Extensos", "Sprawling Tunnels", "Túneles extensos", 7, 94],
  ["encroaching_woods", "Floresta Invasora", "Encroaching Woods", "Bosques invasores", 8, 92],
  ["antimagic_artifice", "Artifício Antimagia", "Antimagic Artifice", "Artificio antimagia", 9, 92],
  ["halt_death", "Deter a Morte", "Halt Death", "Detener la muerte", 10, 93],
];
for (const [slug, pt, en, es, rank, page] of BATTLECRY_SIEGE_RITUALS) {
  const id = `ritual.battlecry.siege.${slug}`;
  if ((PF2E_DATA.rituals || []).some((record) => record.id === id)) continue;
  PF2E_DATA.rituals.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    category: "Ritual de Cerco", type: "Ritual", traits: ["Cerco"],
    summaries: { "pt-BR": `Ritual de cerco de Battlecry!, ranque ${rank}.`, en: `Battlecry! siege ritual, rank ${rank}.`, es: `Ritual de asedio de Battlecry!, rango ${rank}.` },
    description: "Ritual de cerco; verificações, componentes e efeitos completos pendentes de revisão.",
    source: { book: BATTLECRY_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// Secrets of Magic, pp. 66–73: Magus class-feat index.
const SECRETS_OF_MAGIC_MAGUS_FEATS = [
  ["magus_analysis", "Análise do Magus", "Magus Analysis", "Análisis del magus", 1],
  ["raise_a_tome", "Erguer um Tomo", "Raise a Tome", "Alzar un tomo", 1],
  ["familiar", "Familiar", "Familiar", "Familiar", 1],
  ["arcane_fists", "Punhos Arcanos", "Arcane Fists", "Puños arcanos", 1],
  ["magic_parry", "Aparada de Magia", "Magic Parry", "Parada mágica", 2],
  ["spiritual_bain", "Bainha Espiritual", "Spiritual Bain", "Vaina espiritual", 2],
  ["cantrip_expansion", "Expansão de Truque Mágico", "Cantrip Expansion", "Expansión de trucos", 2],
  ["enhanced_familiar", "Familiar Melhorado", "Enhanced Familiar", "Familiar mejorado", 2],
  ["expansive_spellstrike", "Golpe de Magia Expansivo", "Expansive Spellstrike", "Golpe de conjuro expansivo", 2],
  ["forcefangs", "Presa de Força", "Force Fang", "Colmillo de fuerza", 2],
  ["consistent_spellcasting", "Conjuração Consistente", "Consistent Spellcasting", "Lanzamiento consistente", 4],
  ["staff_student", "Estudante do Cajado", "Staff Student", "Estudiante del bastón", 4],
  ["devastating_spellstrike", "Golpe de Magia Devastador", "Devastating Spellstrike", "Golpe de conjuro devastador", 4],
  ["distracting_spellstrike", "Golpe de Magia Distra­tivo", "Distracting Spellstrike", "Golpe de conjuro distractor", 4],
  ["attack_of_opportunity", "Ataque de Oportunidade", "Attack of Opportunity", "Ataque de oportunidad", 6],
  ["knowledge_is_power", "Conhecimento é Poder", "Knowledge Is Power", "El conocimiento es poder", 6],
  ["cascade_countermeasure", "Contramedida de Cascata", "Cascade Countermeasure", "Contramedida de cascada", 6],
  ["armored_tome", "Tomo Blindado", "Armored Tome", "Tomo blindado", 6],
  ["spell_swipe", "Arrebatar com Magia", "Spell Swipe", "Barrido de conjuros", 8],
  ["fused_staff", "Cajado Fundido", "Fused Staff", "Bastón fusionado", 8],
  ["capture_magic", "Capturar Magia", "Capture Magic", "Capturar magia", 8],
  ["rune_engraving", "Impressão Rúnica", "Rune Engraving", "Grabado rúnico", 8],
  ["standby_spell", "Magia em Espera", "Standby Spell", "Conjuro en espera", 8],
  ["sustaining_steel", "Aço que Sustenta", "Sustaining Steel", "Acero sustentador", 10],
  ["blazing_blur", "Bloqueio Ofuscante", "Blazing Blur", "Deslumbramiento llameante", 10],
  ["dimensional_disappearance", "Desaparecimento Dimensional", "Dimensional Disappearance", "Desaparición dimensional", 10],
  ["lunging_spellstrike", "Golpe de Magia de Estocada", "Lunging Spellstrike", "Golpe de conjuro de estocada", 10],
  ["meteoric_spellstrike", "Golpe de Magia Meteórico", "Meteoric Spellstrike", "Golpe de conjuro meteórico", 10],
  ["cascading_ray", "Raio Cascateante", "Cascading Ray", "Rayo en cascada", 10],
  ["quickened_casting", "Recarga Rápida", "Quickened Casting", "Lanzamiento acelerado", 10],
  ["conflux_focus", "Foco de Confluência", "Conflux Focus", "Foco de confluencia", 12],
  ["overwhelming_spellstrike", "Golpe de Magia Avassalador", "Overwhelming Spellstrike", "Golpe de conjuro abrumador", 12],
  ["magic_sense", "Sentido Mágico", "Magic Sense", "Sentido mágico", 12],
  ["rapid_assault", "Ataque Rápido", "Rapid Assault", "Asalto rápido", 14],
  ["supernatural_parry", "Aparada Sobrenatural", "Supernatural Parry", "Parada sobrenatural", 14],
  ["arcane_cowl", "Manto Arcano", "Arcane Cowl", "Manto arcano", 14],
  ["resonant_cascade", "Cascata Ressonante", "Resonant Cascade", "Cascada resonante", 16],
  ["conflux_wealth", "Manancial de Confluência", "Conflux Wealth", "Fuente de confluencia", 18],
  ["supreme_spellstrike", "Golpe de Magia Supremo", "Supreme Spellstrike", "Golpe de conjuro supremo", 20],
];
for (const [slug, pt, en, es, level] of SECRETS_OF_MAGIC_MAGUS_FEATS) {
  const id = `feat.class.magus.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, level,
    summaries: { "pt-BR": `Talento de classe do Magus, nível ${level}.`, en: `Magus class feat, level ${level}.`, es: `Dote de clase del magus, nivel ${level}.` },
    description: "Talento de Magus de Segredos da Magia; efeito detalhado pendente de revisão.", category: "Classe", type: "Talento", classId: "class.magus", traits: ["Magus"],
    source: { book: SECRETS_OF_MAGIC_SOURCE, page: 66 }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 25–29: talentos de classe do Psíquico.
const DARK_ARCHIVE_PSYCHIC_FEATS = [
  ["ancestral_mind", "Mente Ancestral", "Ancestral Mind", "Mente ancestral", 1],
  ["counter_thought", "Contrapensamento", "Counter Thought", "Contrapensamiento", 1],
  ["mental_buffer", "Barreira Mental", "Mental Buffer", "Amortiguador mental", 1],
  ["psychic_rapport", "Sintonia Psíquica", "Psychic Rapport", "Afinidad psíquica", 1],
  ["impose_order", "Impor Ordem", "Impose Order", "Imponer orden", 2],
  ["mind_over_matter", "Mente sobre Matéria", "Mind Over Matter", "Mente sobre materia", 2],
  ["psi_burst", "Explosão Psiônica", "Psi Burst", "Explosión psi", 2],
  ["warp_space", "Distorcer Espaço", "Warp Space", "Distorsionar el espacio", 2],
  ["unlimited_potential", "Potencial Ilimitado", "Unlimited Potential", "Potencial ilimitado", 2],
  ["astral_tether", "Laço Astral", "Astral Tether", "Lazo astral", 4],
  ["dream_guise", "Disfarce Onírico", "Dream Guise", "Disfraz onírico", 4],
  ["parallel_breakthrough", "Avanço Paralelo", "Parallel Breakthrough", "Avance paralelo", 4],
  ["steady_spellcasting", "Conjuração Estável", "Steady Spellcasting", "Lanzamiento estable", 4],
  ["thoughts_sense", "Sentido dos Pensamentos", "Thoughtsense", "Sentido de los pensamientos", 4],
  ["foreseen_failure", "Falha Prevista", "Foreseen Failure", "Fallo previsto", 6],
  ["mental_static", "Estática Mental", "Mental Static", "Estática mental", 6],
  ["scour_the_library", "Vasculhar a Biblioteca", "Scour the Library", "Rastrear la biblioteca", 6],
  ["shatter_space", "Despedaçar Espaço", "Shatter Space", "Desgarrar el espacio", 6],
  ["signature_spell_expansion", "Expansão de Magia Assinatura", "Signature Spell Expansion", "Expansión de conjuro de firma", 6],
  ["constant_levitation", "Levitação Constante", "Constant Levitation", "Levitación constante", 8],
  ["inertial_barrier", "Barreira Inercial", "Inertial Barrier", "Barrera inercial", 8],
  ["psi_catastrophe", "Catástrofe Psiônica", "Psi Catastrophe", "Catástrofe psi", 8],
  ["strain_mind", "Forçar a Mente", "Strain Mind", "Forzar la mente", 8],
  ["dark_personas_presence", "Presença da Persona Sombria", "Dark Persona's Presence", "Presencia de la persona oscura", 10],
  ["deep_roots", "Raízes Profundas", "Deep Roots", "Raíces profundas", 10],
  ["emotional_surge", "Surto Emocional", "Emotional Surge", "Oleada emocional", 10],
  ["psi_strikes", "Golpes Psiônicos", "Psi Strikes", "Golpes psi", 10],
  ["remove_presence", "Remover Presença", "Remove Presence", "Eliminar presencia", 10],
  ["deepest_wellspring", "Fonte Mais Profunda", "Deepest Wellspring", "Manantial más profundo", 12],
  ["no", "Não!!!", "No!!!", "¡¡¡No!!!", 12],
  ["become_thought", "Tornar-se Pensamento", "Become Thought", "Convertirse en pensamiento", 14],
  ["psychic_rapport_advanced", "Sintonia Psíquica Avançada", "Psychic Rapport", "Afinidad psíquica", 14],
  ["brain_drain", "Drenagem Cerebral", "Brain Drain", "Drenaje cerebral", 16],
  ["sixth_sense", "Sexto Sentido", "Sixth Sense", "Sexto sentido", 16],
  ["twin_psyche", "Psique Gêmea", "Twin Psyche", "Psique gemela", 16],
  ["cranial_detonation", "Detonação Craniana", "Cranial Detonation", "Detonación craneal", 18],
  ["conscious_spell_specialization", "Especialização Consciente em Magia", "Conscious Spell Specialization", "Especialización consciente de conjuros", 18],
  ["mental_balm", "Bálsamo Mental", "Mental Balm", "Bálsamo mental", 20],
  ["target_of_psychic_ire", "Alvo da Ira Psíquica", "Target of Psychic Ire", "Objetivo de la ira psíquica", 20],
];
for (const [slug, pt, en, es, level] of DARK_ARCHIVE_PSYCHIC_FEATS) {
  const id = `feat.class.psychic.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Talento de classe do Psíquico, nível ${level}.`, en: `Psychic class feat, level ${level}.`, es: `Dote de clase de Psíquico, nivel ${level}.` },
    description: "Talento de classe do Psíquico; efeito detalhado pendente de revisão.", category: "Classe", type: "Talento", level,
    classId: "class.psychic", traits: ["Psíquico"], source: { book: DARK_ARCHIVE_SOURCE, page: 25 }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 47–57: índice de talentos de classe do Taumaturgo.
const DARK_ARCHIVE_THAUMATURGE_FEATS = [
  ["familiar", "Familiar", "Familiar", "Familiar", 1], ["haunt_ingenuity", "Engenho Assombrado", "Haunt Ingenuity", "Ingenio embrujado", 1],
  ["ammunition_thaumaturgy", "Taumaturgia de Munição", "Ammunition Thaumaturgy", "Taumaturgia de munición", 1], ["diverse_lore", "Conhecimento Diverso", "Diverse Lore", "Conocimiento diverso", 1],
  ["divine_disharmony", "Desarmonia Divina", "Divine Disharmony", "Desarmonía divina", 1], ["root_to_life", "Raiz da Vida", "Root to Life", "Raíz de vida", 1], ["scroll_thaumaturgy", "Taumaturgia de Pergaminho", "Scroll Thaumaturgy", "Taumaturgia de pergaminos", 1],
  ["call_implement", "Chamar Implemento", "Call Implement", "Llamar implemento", 2], ["enhanced_familiar", "Familiar Aprimorado", "Enhanced Familiar", "Familiar mejorado", 2], ["esoteric_warden", "Guardião Esotérico", "Esoteric Warden", "Guardián esotérico", 2],
  ["talisman_esoterica", "Esotérica de Talismãs", "Talisman Esoterica", "Esoterismo de talismanes", 2], ["turn_away_misfortune", "Afastar Infortúnio", "Turn Away Misfortune", "Rechazar la desgracia", 2],
  ["breached_defenses", "Defesas Rompidas", "Breached Defenses", "Defensas quebradas", 4], ["instructive_strike", "Golpe Instrutivo", "Instructive Strike", "Golpe instructivo", 4], ["paired_link", "Ligação Pareada", "Paired Link", "Vínculo emparejado", 4], ["thaumaturgic_ritualist", "Ritualista Taumatúrgico", "Thaumaturgic Ritualist", "Ritualista taumatúrgico", 4],
  ["one_more_activation", "Mais uma Ativação", "One More Activation", "Una activación más", 6], ["scroll_esoterica", "Esotérica de Pergaminho", "Scroll Esoterica", "Esoterismo de pergaminos", 6], ["sympathetic_vulnerabilities", "Vulnerabilidades Simpáticas", "Sympathetic Vulnerabilities", "Vulnerabilidades simpáticas", 6],
  ["cursed_effigy", "Efígie Amaldiçoada", "Cursed Effigy", "Efigie maldita", 8], ["elaborate_talisman_esoterica", "Esotérica de Talismã Elaborado", "Elaborate Talisman Esoterica", "Esoterismo de talismán elaborado", 8], ["incredible_familiar", "Familiar Incrível", "Incredible Familiar", "Familiar increíble", 8], ["know_it_all", "Sabe-Tudo", "Know-It-All", "Sabelotodo", 8],
  ["share_weakness", "Compartilhar Fraqueza", "Share Weakness", "Compartir debilidad", 10], ["thaumaturges_investiture", "Investidura do Taumaturgo", "Thaumaturge's Investiture", "Investidura del taumaturgo", 10], ["twin_weakness", "Fraqueza Gêmea", "Twin Weakness", "Debilidad gemela", 10],
  ["elaborate_scroll_esoterica", "Esotérica de Pergaminho Elaborado", "Elaborate Scroll Esoterica", "Esoterismo de pergamino elaborado", 12], ["intensify_investiture", "Intensificar Investidura", "Intensify Investiture", "Intensificar investidura", 12], ["shared_warding", "Proteção Compartilhada", "Shared Warding", "Custodia compartida", 12], ["thaumaturges_demesne", "Domínio do Taumaturgo", "Thaumaturge's Demesne", "Dominio del taumaturgo", 12],
  ["esoteric_reflexes", "Reflexos Esotéricos", "Esoteric Reflexes", "Reflejos esotéricos", 14], ["grand_talisman_esoterica", "Grande Esotérica de Talismã", "Grand Talisman Esoterica", "Gran esoterismo de talismanes", 14], ["trespass_teleportation", "Teletransporte Intruso", "Trespass Teleportation", "Teletransporte intruso", 14],
  ["implements_flight", "Voo do Implemento", "Implement's Flight", "Vuelo del implemento", 16], ["seven_part_link", "Ligação de Sete Partes", "Seven-Part Link", "Vínculo de siete partes", 16], ["sever_magic", "Cortar Magia", "Sever Magic", "Cercenar magia", 16],
  ["grand_scroll_esoterica", "Grande Esotérica de Pergaminho", "Grand Scroll Esoterica", "Gran esoterismo de pergaminos", 18], ["implements_assault", "Assalto do Implemento", "Implement's Assault", "Asalto del implemento", 18], ["intense_implement", "Implemento Intenso", "Intense Implement", "Implemento intenso", 18],
  ["ubiquitous_weakness", "Fraqueza Ubíqua", "Ubiquitous Weakness", "Debilidad ubicua", 20], ["unlimited_demesne", "Domínio Ilimitado", "Unlimited Demesne", "Dominio ilimitado", 20], ["wonder_worker", "Obreiro de Maravilhas", "Wonder Worker", "Hacedor de maravillas", 20]
];
for (const [slug, pt, en, es, level] of DARK_ARCHIVE_THAUMATURGE_FEATS) {
  const id = `feat.class.thaumaturge.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({ id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": `Talento de classe do Taumaturgo, nível ${level}.`, en: `Thaumaturge class feat, level ${level}.`, es: `Dote de clase de Taumaturgo, nivel ${level}.` },
    description: "Talento de classe do Taumaturgo; efeito detalhado pendente de revisão.", category: "Classe", type: "Talento", level,
    classId: "class.thaumaturge", traits: ["Taumaturgo"], source: { book: DARK_ARCHIVE_SOURCE, page: 47 }, sourceApproximate: true, ruleset: "legacy", needs_review: true });
}

// Dark Archive, pp. 48–50: arquétipos multiclasse de Psíquico e Taumaturgo.
const DARK_ARCHIVE_MULTICLASS_FEATS = [
  ["psychic", "psychic_dedication", "Dedicação de Psíquico", "Psychic Dedication", "Dedicación de psíquico", 2, "Inteligência 14 ou Carisma 14", 48],
  ["psychic", "basic_thoughtform", "Forma-Pensamento Básica", "Basic Thoughtform", "Forma de pensamiento básica", 4, "Dedicação de Psíquico", 48],
  ["psychic", "basic_psychic_spellcasting", "Conjuração Psíquica Básica", "Basic Psychic Spellcasting", "Lanzamiento de conjuros psíquicos básico", 4, "Dedicação de Psíquico", 48],
  ["psychic", "advanced_thoughtform", "Forma-Pensamento Avançada", "Advanced Thoughtform", "Forma de pensamiento avanzada", 6, "Forma-Pensamento Básica", 48],
  ["psychic", "psi_development", "Desenvolvimento Psi", "Psi Development", "Desarrollo psi", 6, "Dedicação de Psíquico", 48],
  ["psychic", "expert_psychic_spellcasting", "Conjuração Psíquica Especialista", "Expert Psychic Spellcasting", "Lanzamiento de conjuros psíquicos experto", 12, "Conjuração Psíquica Básica", 48],
  ["psychic", "master_psychic_spellcasting", "Conjuração Psíquica Mestre", "Master Psychic Spellcasting", "Lanzamiento de conjuros psíquicos maestro", 12, "Conjuração Psíquica Especialista", 48],
  ["thaumaturge", "thaumaturge_dedication", "Dedicação de Taumaturgo", "Thaumaturge Dedication", "Dedicación de taumaturgo", 2, "Carisma 14", 49],
  ["thaumaturge", "basic_thaumaturgy", "Taumaturgia Básica", "Basic Thaumaturgy", "Taumaturgia básica", 4, "Dedicação de Taumaturgo", 50],
  ["thaumaturge", "advanced_thaumaturgy", "Taumaturgia Avançada", "Advanced Thaumaturgy", "Taumaturgia avanzada", 6, "Taumaturgia Básica", 50],
  ["thaumaturge", "implement_initiate", "Iniciação em Implemento", "Implement Initiate", "Iniciación en implemento", 6, "Dedicação de Taumaturgo", 50],
  ["thaumaturge", "magical_knowledge", "Conhecimento Mágico", "Magical Knowledge", "Conocimiento mágico", 8, "Dedicação de Taumaturgo; treinado em uma entre Arcanismo, Natureza, Ocultismo ou Religião e especialista em outra", 50],
  ["thaumaturge", "resolute", "Resoluto", "Resolute", "Resuelto", 12, "Dedicação de Taumaturgo e especialista em Vontade", 50],
];
for (const [archetype, slug, pt, en, es, level, prereq, page] of DARK_ARCHIVE_MULTICLASS_FEATS) {
  const archetypeId = `archetype.${archetype}_dedication`;
  const id = `feat.${archetypeId}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo multiclasse de ${archetype === "psychic" ? "Psíquico" : "Taumaturgo"}, nível ${level}.`,
      en: `${archetype === "psychic" ? "Psychic" : "Thaumaturge"} multiclass archetype feat, level ${level}.`,
      es: `Dote del arquetipo multiclase de ${archetype === "psychic" ? "psíquico" : "taumaturgo"}, nivel ${level}.`,
    },
    description: "Opção de arquétipo de Dark Archive; efeito detalhado pendente de revisão.", category: "Arquétipo", type: "Talento", level,
    archetypeId, prerequisites: [prereq], traits: ["Arquétipo", "Multiclasse"],
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 55–57: Aftermath feats (opções raras condicionadas a eventos).
const DARK_ARCHIVE_AFTERMATH_FEATS = [
  ["echo_of_the_fallen", "Eco dos Caídos", "Echo of the Fallen", "Eco de los caídos", 4, "Você ajudou a conduzir um espírito, fantasma ou assombração ao descanso.", 55],
  ["devils_eye", "Olho do Diabo", "Devil's Eye", "Ojo del diablo", 4, "Você fez um pacto com um diabo ou venceu um caso legal, duelo de astúcia ou disputa semelhante contra um diabo.", 55],
  ["lingering_chill", "Frio Persistente", "Lingering Chill", "Frío persistente", 4, "Você foi reduzido a 0 Pontos de Vida por um inimigo com o traço frio ou por uma habilidade desse inimigo.", 55],
  ["elysiums_cadence", "Cadência de Elysium", "Elysium's Cadence", "Cadencia de Elysium", 6, "Você festejou extensivamente com um azata ou teve um relacionamento romântico com um azata.", 56],
  ["jelly_body", "Corpo de Gelatina", "Jelly Body", "Cuerpo de gelatina", 6, "Você foi reduzido a 0 Pontos de Vida enquanto era engolfado por um limo.", 56],
  ["gift_of_the_hoard", "Presente do Tesouro", "Gift of the Hoard", "Regalo del tesoro", 10, "Você teve sucesso em uma tarefa importante dada por um dragão, como obter um tesouro especial para o covil dele.", 56],
  ["siphon_life", "Sifonar Vida", "Siphon Life", "Sifonar vida", 10, "Você foi reduzido a 0 Pontos de Vida por um inimigo com o traço negativo.", 56],
  ["petrified_skin", "Pele Petrificada", "Petrified Skin", "Piel petrificada", 12, "Você foi petrificado por um inimigo.", 56],
  ["dormant_eruption", "Erupção Adormecida", "Dormant Eruption", "Erupción latente", 14, "Você foi reduzido a 0 Pontos de Vida por um inimigo com o traço fogo ou por uma habilidade desse inimigo.", 57],
  ["sink_and_swim", "Afundar e Nadar", "Sink and Swim", "Hundirse y nadar", 14, "Você foi reduzido a 0 Pontos de Vida por um inimigo com o traço água ou por uma habilidade desse inimigo.", 57],
  ["fey_life", "Vida Feérica", "Fey Life", "Vida feérica", 16, "Você ajudou a salvar uma criatura feérica de um destino terrível e não é uma criatura feérica.", 57],
  ["walk_on_the_wind", "Caminhar no Vento", "Walk on the Wind", "Caminar sobre el viento", 16, "Você foi reduzido a 0 Pontos de Vida por um inimigo com o traço ar ou por uma habilidade desse inimigo.", 57],
];
for (const [slug, pt, en, es, level, prereq, page] of DARK_ARCHIVE_AFTERMATH_FEATS) {
  const id = `feat.dark_archive.aftermath.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento Aftermath raro de Dark Archive, nível ${level}.`,
      en: `Rare Dark Archive aftermath feat, level ${level}.`,
      es: `Dote Aftermath raro de Dark Archive, nivel ${level}.`,
    },
    description: "Talento Aftermath de Dark Archive; efeito detalhado pendente de revisão.", category: "Geral", type: "Talento", level,
    prerequisites: [prereq], traits: ["Raro", "Aftermath"], rarity: "rare",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, índice das opções (pp. 126, 140, 166, 168, 184, 186, 203, 204, 206).
const DARK_ARCHIVE_ARCHETYPES = [
  ["archetype.dark_archive.alter_ego", "Alter Ego", "Alter Ego", "Alter ego", 126],
  ["archetype.dark_archive.living_vessel", "Vaso Vivo", "Living Vessel", "Vasija viviente", 140],
  ["archetype.dark_archive.pactbinder", "Vinculador de Pactos", "Pactbinder", "Vinculador de pactos", 166],
  ["archetype.dark_archive.curse_maelstrom", "Maremoto de Maldições", "Curse Maelstrom", "Maremoto de maldiciones", 168],
  ["archetype.dark_archive.time_mage", "Mago do Tempo", "Time Mage", "Mago del tiempo", 184],
  ["archetype.dark_archive.chronoskimmer", "Crononavegador", "Chronoskimmer", "Crononavegante", 186],
  ["archetype.dark_archive.psychic_duelist", "Duelista Psíquico", "Psychic Duelist", "Duelista psíquico", 203],
  ["archetype.dark_archive.mind_smith", "Ferreiro da Mente", "Mind Smith", "Forjador mental", 204],
  ["archetype.dark_archive.sleepwalker", "Sonâmbulo", "Sleepwalker", "Sonámbulo", 206],
];
for (const [id, pt, en, es, page] of DARK_ARCHIVE_ARCHETYPES) {
  if ((PF2E_DATA.archetypes || []).some((record) => record.id === id)) continue;
  PF2E_DATA.archetypes.push({
    id, name: `${pt} (${en})`, subtype: "standard", dedicationLevel: 2,
    names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Arquétipo de Dark Archive; requisitos e talentos individuais pendentes de revisão.`,
      en: `Dark Archive archetype; individual prerequisites and feats pending review.`,
      es: `Arquetipo de Dark Archive; requisitos y dotes individuales pendientes de revisión.`,
    },
    description: "Arquétipo indexado pelo índice do livro; dedicação, pré-requisitos e efeitos individuais aguardam transcrição detalhada.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Secrets of Magic, pp. 142–145: focus spells for Summoner and Magus.
const SECRETS_OF_MAGIC_FOCUS_SPELLS = [
  ["summoner", "eidolons_ire", "Ira do Eidolon", "Eidolon's Wrath", "Ira del eidolón", 3, 142, ["class.summoner"]],
  ["summoner", "release_eidolon", "Libertar Eidolon", "Release Eidolon", "Liberar eidolón", 1, 142, ["class.summoner"]],
  ["summoner", "extend_boost", "Prolongar Impulsionamento", "Extend Boost", "Extender impulso", 1, 143, ["class.summoner"]],
  ["summoner", "evolution_surge", "Surto de Evolução", "Evolution Surge", "Oleada de evolución", 1, 143, ["class.summoner"]],
  ["summoner", "vital_bond_surge", "Surto de Vínculo Vital", "Vital Bond Surge", "Oleada de vínculo vital", 2, 143, ["class.summoner"]],
  ["magus", "dimensional_assault", "Agressão Dimensional", "Dimensional Assault", "Asalto dimensional", 1, 144, ["class.magus"]],
  ["magus", "quickened_assault", "Ataque Rápido", "Hasted Assault", "Asalto acelerado", 7, 144, ["class.magus"]],
  ["magus", "rune_engraving", "Impressão Rúnica", "Runic Impression", "Impresión rúnica", 4, 144, ["class.magus"]],
  ["magus", "spinning_staff", "Cajado Giratório", "Spinning Staff", "Bastón giratorio", 1, 144, ["class.magus"]],
  ["magus", "cascade_countermeasure", "Contramedida de Cascata", "Cascade Countermeasure", "Contramedida de cascada", 3, 145, ["class.magus"]],
  ["magus", "shooting_star", "Estrela Cadente", "Shooting Star", "Estrella fugaz", 1, 145, ["class.magus"]],
  ["magus", "shielding_strike", "Golpe e Escudo", "Shielding Strike", "Golpe y escudo", 1, 145, ["class.magus"]],
  ["magus", "thunderous_strike", "Golpe Estrondoso", "Thunderous Strike", "Golpe atronador", 1, 145, ["class.magus"]],
  ["magus", "force_fang", "Presa de Força", "Force Fang", "Colmillo de fuerza", 1, 145, ["class.magus"]],
];
for (const [classSlug, slug, pt, en, es, rank, page, classIds] of SECRETS_OF_MAGIC_FOCUS_SPELLS) {
  const id = `spell.secrets_of_magic.${classSlug}.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank, focus: true,
    traditions: ["arcane", "divine", "occult", "primal"], category: "Magia de Foco", type: "Focus Spell", classId: classIds[0], classIds,
    summaries: { "pt-BR": `Magia de foco de ${classSlug === "magus" ? "Magus" : "Convocador"}, ranque ${rank}.`, en: `${classSlug === "magus" ? "Magus" : "Summoner"} focus spell, rank ${rank}.`, es: `Conjuro de foco del ${classSlug === "magus" ? "magus" : "convocador"}, rango ${rank}.` },
    requiredSubclass: classSlug === "magus" ? Object.entries(MAGUS_CONFLUX_SPELL_BY_STUDY).filter(([, confluxSlug]) => confluxSlug === slug).map(([studySlug]) => `subclass.class.magus.hybrid_study_${studySlug}`) : undefined,
    description: "Magia de foco de Segredos da Magia; tradição específica e efeito completo dependem da escolha de classe e permanecem em revisão.",
    source: { book: SECRETS_OF_MAGIC_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Secrets of Magic, pp. 75–78: multiclass archetype feats for Summoner and Magus.
const SECRETS_OF_MAGIC_MULTICLASS_FEATS = [
  ["summoner", "summoner_dedication", "Dedicação de Convocador", "Summoner Dedication", "Dedicación de convocador", 2, "Carisma 14", 75],
  ["summoner", "initial_eidolon_ability", "Habilidade Inicial de Eidolon", "Initial Eidolon Ability", "Habilidad inicial del eidolón", 4, "Dedicação de Convocador", 76],
  ["summoner", "basic_synergy", "Sinergia Básica", "Basic Synergy", "Sinergia básica", 4, "Dedicação de Convocador", 76],
  ["summoner", "basic_summoner_spellcasting", "Conjuração Básica de Convocador", "Basic Summoner Spellcasting", "Lanzamiento de conjuros básico de convocador", 6, "Dedicação de Convocador", 76],
  ["summoner", "advanced_synergy", "Sinergia Avançada", "Advanced Synergy", "Sinergia avanzada", 6, "Sinergia Básica", 76],
  ["summoner", "expert_summoner_spellcasting", "Conjuração Especialista de Convocador", "Expert Summoner Spellcasting", "Lanzamiento de conjuros experto de convocador", 12, "Conjuração Básica de Convocador", 77],
  ["summoner", "combat_specialist_eidolon", "Eidolon Especialista em Combate", "Combat Specialist Eidolon", "Eidolón especialista en combate", 12, "Dedicação de Convocador", 77],
  ["summoner", "emblematic_synergy", "Sinergia Emblemática", "Signature Synergy", "Sinergia emblemática", 14, "Sinergia Avançada", 77],
  ["summoner", "master_summoner_spellcasting", "Conjuração Mestre de Convocador", "Master Summoner Spellcasting", "Lanzamiento de conjuros maestro de convocador", 18, "Conjuração Especialista de Convocador", 77],
  ["magus", "magus_dedication", "Dedicação de Magus", "Magus Dedication", "Dedicación de magus", 2, "Inteligência 14 ou Carisma 14", 78],
  ["magus", "hybrid_study", "Estudo Híbrido de Magia", "Hybrid Study", "Estudio híbrido", 4, "Dedicação de Magus", 78],
  ["magus", "spellstriker", "Golpeador de Magia", "Spellstriker", "Golpeador de conjuros", 4, "Dedicação de Magus", 78],
  ["magus", "basic_martial_magic", "Magia Marcial Básica", "Basic Martial Magic", "Magia marcial básica", 4, "Dedicação de Magus", 78],
  ["magus", "basic_magus_spellcasting", "Conjuração Básica de Magus", "Basic Magus Spellcasting", "Lanzamiento de conjuros básico de magus", 6, "Dedicação de Magus", 78],
  ["magus", "advanced_martial_magic", "Magia Marcial Avançada", "Advanced Martial Magic", "Magia marcial avanzada", 6, "Magia Marcial Básica", 78],
  ["magus", "expert_magus_spellcasting", "Conjuração Especialista de Magus", "Expert Magus Spellcasting", "Lanzamiento de conjuros experto de magus", 12, "Conjuração Básica de Magus", 78],
  ["magus", "master_magus_spellcasting", "Conjuração Mestre de Magus", "Master Magus Spellcasting", "Lanzamiento de conjuros maestro de magus", 18, "Conjuração Especialista de Magus", 78],
];
for (const [classSlug, slug, pt, en, es, level, prereq, page] of SECRETS_OF_MAGIC_MULTICLASS_FEATS) {
  const archetypeId = `archetype.${classSlug}_dedication`;
  const id = `feat.${archetypeId}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, level,
    summaries: { "pt-BR": `Talento do arquétipo multiclasse de ${classSlug === "magus" ? "Magus" : "Convocador"}, nível ${level}.`, en: `${classSlug === "magus" ? "Magus" : "Summoner"} multiclass archetype feat, level ${level}.`, es: `Dote del arquetipo multiclase de ${classSlug === "magus" ? "magus" : "convocador"}, nivel ${level}.` },
    description: "Talento de arquétipo de Segredos da Magia; efeito detalhado pendente de revisão.", category: "Arquétipo", type: "Talento",
    archetypeId, prerequisites: [prereq], prereq: [prereq], traits: ["Arquétipo", "Multiclasse"],
    source: { book: SECRETS_OF_MAGIC_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Livro dos Mortos, pp. 154–178: itens mágicos e consumíveis aplicáveis ao jogador.
const BOOK_OF_DEAD_MAGIC_ITEMS = [
  ["sinister_ring", "Anel Sinistro", "Sinister Ring", "Anillo siniestro", 5, "Item Mágico", 154],
  ["peachwood_weapon", "Arma de Pessegueiro", "Peachwood Weapon", "Arma de madera de melocotonero", 12, "Arma Mágica", 155],
  ["final_rest", "Descanso Final", "Final Rest", "Descanso final", 18, "Item Mágico", 156],
  ["feast_for_hungry_ghosts", "Banquete para Fantasmas Famintos", "Feast for Hungry Ghosts", "Festín para fantasmas hambrientos", 9, "Consumível", 156],
  ["celestial_peachwood_sword", "Espada de Pessegueiro Celestial", "Celestial Peachwood Sword", "Espada celestial de madera de melocotonero", 17, "Arma Mágica", 157],
  ["bottled_sunlight", "Luz Solar Engarrafada", "Bottled Sunlight", "Luz solar embotellada", 2, "Consumível", 158],
  ["ladys_spiral", "Espiral da Dama", "Lady's Spiral", "Espiral de la dama", 7, "Item Mágico", 159],
  ["dawnlight", "Luz da Alvorada", "Dawnlight", "Luz del alba", 3, "Item Mágico", 160],
  ["peachwood_talisman", "Talismã de Pessegueiro", "Peachwood Talisman", "Talismán de madera de melocotonero", 6, "Talismã", 161],
  ["undead_detection_ink", "Tinta de Detecção de Mortos-Vivos", "Undead Detection Ink", "Tinta de detección de muertos vivientes", 4, "Consumível", 162],
  ["ectoplasmic_marker", "Marcador Ectoplasmático", "Ectoplasmic Marker", "Marcador ectoplásmico", 3, "Consumível", 163],
  ["vital_salt", "Sal Vital", "Vital Salt", "Sal vital", 5, "Consumível", 164],
];
for (const [slug, pt, en, es, level, category, page] of BOOK_OF_DEAD_MAGIC_ITEMS) {
  const id = `item.book_of_dead.${slug}`;
  if ((PF2E_DATA.items || []).some((record) => record.id === id)) continue;
  PF2E_DATA.items.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, level, category, type: "Item",
    summaries: { "pt-BR": `Item de ${category.toLowerCase()} do Livro dos Mortos, nível ${level}; variantes e efeitos detalhados em revisão.`, en: `Book of the Dead ${category.toLowerCase()}, level ${level}; variants and detailed effects under review.`, es: `Objeto de ${category.toLowerCase()} del Libro de los Muertos, nivel ${level}; variantes y efectos detallados en revisión.` },
    description: "Item do Livro dos Mortos; variantes de nível, ativação e efeitos completos permanecem em `needs_review`.",
    // A origem do item não o torna uma criatura morta-viva; traços específicos
    // só devem ser adicionados depois da conferência da entrada individual.
    traits: [], source: { book: BOOK_DEAD_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Livro dos Mortos, pp. 22–54: arquétipos de jogador adicionais.
const BOOK_OF_DEAD_PLAYER_ARCHETYPES = [
  ["exorcist", "Exorcista", "Exorcist", "Exorcista", "Treinado em Religião", 22],
  ["soul_warden", "Guardião das Almas", "Soul Warden", "Guardián de almas", "Treinado em Religião", 24],
  ["consecrated_necromancer", "Necromante Consagrado", "Consecrated Necromancer", "Nigromante consagrado", "Treinado em Religião ou Ocultismo", 28],
  ["reanimator", "Reanimador", "Reanimator", "Reanimador", "Treinado em Medicina ou Ocultismo", 34],
  ["undead_master", "Mestre de Mortos-Vivos", "Undead Master", "Maestro de muertos vivientes", "Treinado em Natureza, Ocultismo ou Religião", 41],
  ["lich", "Lich", "Lich", "Liche", "Você é um conjurador e cumpre os requisitos de iniciação do arquétipo", 54],
];
for (const [slug, pt, en, es, prereq, page] of BOOK_OF_DEAD_PLAYER_ARCHETYPES) {
  const id = `archetype.book_of_dead.${slug}`;
  if ((PF2E_DATA.archetypes || []).some((record) => record.id === id)) continue;
  PF2E_DATA.archetypes.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, subtype: "standard", level: 2, dedicationLevel: 2,
    prerequisites: [prereq], prereq: [prereq], category: "Arquétipo", type: "Dedicação", traits: ["Arquétipo", "Morto-Vivo"],
    summaries: { "pt-BR": `Arquétipo de dedicação do Livro dos Mortos; requisitos e talentos individuais em revisão.`, en: `Book of the Dead dedication archetype; individual prerequisites and feats under review.`, es: `Arquetipo de dedicación del Libro de los Muertos; requisitos y dotes individuales en revisión.` },
    description: "Arquétipo do Livro dos Mortos indexado pelo sumário; efeitos de dedicação e talentos individuais permanecem em revisão.",
    source: { book: BOOK_DEAD_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Livro dos Mortos, p. 29: magia de foco inicial concedida pela Dedicação de
// Necromante Consagrado. A tradição acompanha a conjuração que qualificou a
// dedicação; por isso as quatro tradições ficam disponíveis após o gate.
const CONSECRATED_GROUND_SPELL = {
  id: "spell.book_of_dead.consecrated_ground", name: "Solo Consagrado (Consecrated Ground)",
  names: { "pt-BR": "Solo Consagrado", en: "Consecrated Ground", es: "Suelo consagrado" },
  rank: 1, level: 1, focus: true, category: "Magia de Foco", type: "Focus Spell",
  traditions: ["arcane", "divine", "occult", "primal"], archetypeId: "archetype.book_of_dead.consecrated_necromancer",
  prerequisites: ["Dedicação de Necromante Consagrado"], traits: ["Bondoso", "Necromancia", "Positivo", "Foco"],
  summaries: {
    "pt-BR": "Cria uma área hostil a mortos-vivos: causa dano positivo e bondoso, aumenta sua fraqueza a dano positivo e impede criações de mortos-vivos.",
    en: "Creates an area hostile to undead: it deals positive and good damage, increases weakness to positive damage, and counters undead creation.",
    es: "Crea un área hostil a los no muertos: inflige daño positivo y bueno, aumenta su debilidad al daño positivo y contrarresta la creación de no muertos."
  },
  description: "Magia de foco inicial de Necromante Consagrado.", source: { book: BOOK_DEAD_SOURCE, page: 29 }, ruleset: "legacy", needs_review: false, rarity: "uncommon"
};
if (!(PF2E_DATA.spells || []).some((record) => record.id === CONSECRATED_GROUND_SPELL.id)) PF2E_DATA.spells.push(CONSECRATED_GROUND_SPELL);

// Howl of the Wild, pp. 66–82: dedication feats for the new archetypes.
const HOWL_WILD_ARCHETYPE_DEDICATIONS = [
  ["clawdancer", "Dedicação de Dançarino das Garras", "Clawdancer Dedication", "Dedicación de Danzagarras", 68, "Treinado em Acrobacia"],
  ["ostilli_host", "Dedicação de Hospedeiro de Ostilli", "Ostilli Host Dedication", "Dedicación de anfitrión ostilli", 70, "Constituição 14"],
  ["swarmkeeper", "Dedicação de Guardião do Enxame", "Swarmkeeper Dedication", "Dedicación de guardián del enjambre", 72, "Treinado em Natureza"],
  ["thlipit_contestant", "Dedicação de Competidor Thlipit", "Thlipit Contestant Dedication", "Dedicación de competidor thlipit", 74, "Língua preênsil longa ou cauda"],
  ["werecreature", "Dedicação de Licantropo", "Werecreature Dedication", "Dedicación de licántropo", 76, "Você não é uma criatura morta-viva"],
  ["wild_mimic", "Dedicação de Mímico Selvagem", "Wild Mimic Dedication", "Dedicación de Mímico salvaje", 80, "Treinado em Natureza"],
  ["winged_warrior", "Dedicação de Guerreiro Alado", "Winged Warrior Dedication", "Dedicación de guerrero alado", 82, "Você possui ou obtém uma forma de voo"],
];
for (const [slug, pt, en, es, page, prereq] of HOWL_WILD_ARCHETYPE_DEDICATIONS) {
  const id = `feat.archetype.${slug}.dedication`;
  const archetypeId = `archetype.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, level: 2, dedicationLevel: 2,
    summaries: { "pt-BR": `Dedicação de arquétipo de Howl of the Wild; requisito: ${prereq}.`, en: `Howl of the Wild archetype dedication; prerequisite: ${prereq}.`, es: `Dedicación de arquetipo de Howl of the Wild; requisito: ${prereq}.` },
    description: "Dedicação de Howl of the Wild; efeitos e requisitos completos pendentes de revisão.", category: "Arquétipo", type: "Talento", archetypeId,
    prerequisites: [prereq], prereq: [prereq], traits: ["Arquétipo", "Dedicação"],
    source: { book: HOWL_WILD_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
    ...(slug === "winged_warrior" ? { requiresFlight: true } : {}),
    ...(slug === "thlipit_contestant" ? { requiresPrehensileTongueOrTail: true } : {}),
  });
}

// Howl of the Wild, pp. 58–65: Warden spells and Witches of the Wild.
const HOWL_WILD_WARDEN_AND_WITCH_SPELLS = [
  ["ranger", "keen_smell", "Olfato Aguçado", "Keen Smell", "Olfato agudo", 1, 58, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "slime_spit", "Cuspe de Limo", "Slime Spit", "Escupitajo de limo", 1, 58, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "canopy_crawler", "Rastejador de Copas", "Canopy Crawler", "Trepador del dosel", 2, 59, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "imitate_fauna", "Imitar Fauna", "Imitate Fauna", "Imitar fauna", 2, 59, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "distracting_decoy", "Isca Distraidora", "Distracting Decoy", "Señuelo distractor", 1, 59, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "threatening_mimicry", "Mimetismo Ameaçador", "Threatening Mimicry", "Mimetismo amenazador", 3, 60, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "warning_stripes", "Listras de Aviso", "Warning Stripes", "Rayas de advertencia", 3, 60, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "gluttonous_growth", "Crescimento Voraz", "Gluttonous Growth", "Crecimiento voraz", 5, 60, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "pack_breaker", "Rompedor de Matilha", "Pack Breaker", "Rompe jaurías", 5, 60, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["ranger", "pulverizing_wake", "Rastro Pulverizador", "Pulverizing Wake", "Estela pulverizadora", 5, 60, "Focus Spell", "Magia de Foco", ["primal"], "Warden"],
  ["witch", "sting_of_the_sea", "Ferrão do Mar", "Sting of the Sea", "Aguijón del mar", 1, 61, "Cantrip", "Truque Mágico", ["primal"], "Witch"],
  ["witch", "scroungers_glee", "Alegria do Escarafunchador", "Scrounger's Glee", "Alegría del recolector", 1, 62, "Cantrip", "Truque Mágico", ["primal"], "Witch"],
  ["witch", "murmuration", "Murmuração", "Murmuration", "Murmuración", 1, 62, "Cantrip", "Truque Mágico", ["primal"], "Witch"],
  ["witch", "blood_in_the_water", "Sangue na Água", "Blood in the Water", "Sangre en el agua", 3, 63, "Focus Spell", "Magia de Foco", ["primal"], "Witch"],
  ["witch", "mycological_malady", "Mal-Estar Micológico", "Mycological Malady", "Malestar micológico", 3, 64, "Focus Spell", "Magia de Foco", ["primal"], "Witch"],
  ["witch", "sheltering_wings", "Asas Protetoras", "Sheltering Wings", "Alas protectoras", 3, 65, "Focus Spell", "Magia de Foco", ["primal"], "Witch"],
];
for (const [classSlug, slug, pt, en, es, rank, page, type, category, traditions, sourceSection] of HOWL_WILD_WARDEN_AND_WITCH_SPELLS) {
  const id = `spell.howl.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank, focus: type === "Focus Spell",
    traditions, category, type, classId: `class.${classSlug}`, traits: [sourceSection],
    summaries: { "pt-BR": `${category} de Howl of the Wild para ${classSlug === "ranger" ? "Patrulheiro" : "Bruxa"}, ranque ${rank}.`, en: `Howl of the Wild ${category.toLowerCase()} for ${classSlug === "ranger" ? "Ranger" : "Witch"}, rank ${rank}.`, es: `${category} de Howl of the Wild para ${classSlug === "ranger" ? "explorador" : "bruja"}, rango ${rank}.` },
    description: `Opção da seção ${sourceSection} de Howl of the Wild; efeito completo pendente de revisão.`,
    source: { book: HOWL_WILD_SOURCE, page }, sourceApproximate: true, ruleset: "remaster", needs_review: true,
  });
}

// Dark Archive, pp. 25–29: psi cantrips exclusivos das mentes conscientes.
const DARK_ARCHIVE_PSYCHIC_CANTRIPS = [
  ["telekinetic_rend", "Rasgo Telecinético", "Telekinetic Rend", "Desgarro telequinético", 1, 25],
  ["vector_screen", "Tela Vetorial", "Vector Screen", "Pantalla vectorial", 3, 25],
  ["dancing_blade", "Lâmina Dançante", "Dancing Blade", "Hoja danzante", 5, 25],
  ["glimpse_weakness", "Vislumbrar Fraqueza", "Glimpse Weakness", "Vislumbrar debilidad", 1, 26],
  ["omnidirectional_scan", "Varredura Omnidirecional", "Omnidirectional Scan", "Escaneo omnidireccional", 3, 26],
  ["foresee_the_path", "Prever o Caminho", "Foresee the Path", "Prever el camino", 5, 26],
  ["thermal_stasis", "Estase Térmica", "Thermal Stasis", "Estasis térmica", 1, 27],
  ["entropic_wheel", "Roda Entrópica", "Entropic Wheel", "Rueda entrópica", 3, 27],
  ["redistribute_potential", "Redistribuir Potencial", "Redistribute Potential", "Redistribuir potencial", 5, 27],
  ["forbidden_thought", "Pensamento Proibido", "Forbidden Thought", "Pensamiento prohibido", 1, 28],
  ["shatter_mind", "Despedaçar a Mente", "Shatter Mind", "Destrozar la mente", 3, 28],
  ["contagious_idea", "Ideia Contagiosa", "Contagious Idea", "Idea contagiosa", 5, 28],
  ["imaginary_weapon", "Arma Imaginária", "Imaginary Weapon", "Arma imaginaria", 1, 29],
  ["astral_rain", "Chuva Astral", "Astral Rain", "Lluvia astral", 3, 29],
  ["hologram_cage", "Jaula de Holograma", "Hologram Cage", "Jaula de holograma", 5, 29],
  ["distortion_lens", "Lente de Distorção", "Distortion Lens", "Lente de distorsión", 1, 29],
  ["ghostly_shift", "Deslocamento Fantasmagórico", "Ghostly Shift", "Desplazamiento fantasmal", 3, 29],
  ["tesseract_tunnel", "Túnel de Tesserato", "Tesseract Tunnel", "Túnel de teseracto", 5, 29],
];
for (const [slug, pt, en, es, rank, page] of DARK_ARCHIVE_PSYCHIC_CANTRIPS) {
  const id = `spell.dark_archive.psychic.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    traditions: ["occult"], category: "Psi Cantrip", type: "Cantrip", classId: "class.psychic",
    traits: ["Psíquico", "Ocultista"],
    summaries: {
      "pt-BR": `Psi cantrip exclusivo do Psíquico, ranque ${rank}.`,
      en: `Psychic exclusive psi cantrip, rank ${rank}.`,
      es: `Truco psi exclusivo del Psíquico, rango ${rank}.`,
    },
    description: "Psi cantrip de Dark Archive; efeito detalhado pendente de revisão.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 104–107: magias Deviant; exigem uma habilidade desviante.
const DARK_ARCHIVE_DEVIANT_SPELLS = [
  ["bilocation", "Bilocação", "Bilocation", "Bilocación", 9, ["arcane", "occult"], 104],
  ["bracing_tendrils", "Gavinhas de Sustentação", "Bracing Tendrils", "Zarcillos de refuerzo", 3, ["arcane", "occult"], 104],
  ["empty_pack", "Mochila Vazia", "Empty Pack", "Mochila vacía", 2, ["arcane", "occult"], 104],
  ["focusing_hum", "Zumbido de Foco", "Focusing Hum", "Zumbido focalizador", 3, ["divine", "occult"], 104],
  ["implement_of_destruction", "Implemento de Destruição", "Implement of Destruction", "Implemento de destrucción", 4, ["divine", "occult"], 105],
  ["etheric_shards", "Estilhaços Etéricos", "Etheric Shards", "Esquirlas etéricas", 5, ["arcane", "occult"], 105],
  ["falling_sky", "Céu Cadente", "Falling Sky", "Cielo descendente", 8, ["arcane", "occult"], 105],
  ["poltergeists_fury", "Fúria do Poltergeist", "Poltergeist's Fury", "Furia del poltergeist", 6, ["arcane", "occult"], 106],
  ["momentary_recovery", "Recuperação Momentânea", "Momentary Recovery", "Recuperación momentánea", 7, ["arcane", "occult"], 106],
  ["rally_point", "Ponto de Reunião", "Rally Point", "Punto de reunión", 3, ["arcane", "occult"], 106],
  ["moths_supper", "Banquete das Mariposas", "Moth's Supper", "Banquete de polillas", 3, ["occult", "primal"], 106],
  ["sea_of_thought", "Mar de Pensamento", "Sea of Thought", "Mar de pensamiento", 3, ["arcane", "occult"], 106],
  ["shadow_spy", "Espião das Sombras", "Shadow Spy", "Espía de las sombras", 3, ["occult", "primal"], 107],
  ["soft_landing", "Pouso Suave", "Soft Landing", "Aterrizaje suave", 4, ["arcane", "occult", "primal"], 107],
  ["telekinetic_bombardment", "Bombardeio Telecinético", "Telekinetic Bombardment", "Bombardeo telequinético", 7, ["arcane", "occult"], 107],
];
for (const [slug, pt, en, es, rank, traditions, page] of DARK_ARCHIVE_DEVIANT_SPELLS) {
  const id = `spell.dark_archive.deviant.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank, traditions,
    category: "Deviant Spell", type: "Spell", requiresDeviant: true, traits: ["Desviante"],
    summaries: {
      "pt-BR": `Magia Deviant de Dark Archive, ranque ${rank}; requer habilidade desviante.`,
      en: `Dark Archive deviant spell, rank ${rank}; requires a deviant ability.`,
      es: `Conjuro Deviant de Dark Archive, rango ${rank}; requiere una habilidad desviada.`,
    },
    description: "Magia Deviant de Dark Archive; efeito detalhado pendente de revisão.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 142–145: magias de domínio apócrifo.
const DARK_ARCHIVE_APOCRYPHAL_DOMAINS = [
  ["euphoric_renewal", "Renovação Eufórica", "Euphoric Renewal", "Renovación eufórica", 4, "death", 142],
  ["frenzied_revelry", "Folguedo Frenético", "Frenzied Revelry", "Jolgorio frenético", 1, "indulgence", 142],
  ["cinder_gaze", "Olhar de Brasa", "Cinder Gaze", "Mirada de brasa", 1, "fire", 142],
  ["hollow_heart", "Coração Vazio", "Hollow Heart", "Corazón hueco", 1, "ambition", 143],
  ["shaken_confidence", "Confiança Abalada", "Shaken Confidence", "Confianza quebrada", 4, "confidence", 143],
  ["isolation", "Isolamento", "Isolation", "Aislamiento", 4, "darkness", 143],
  ["string_of_fate", "Fio do Destino", "String of Fate", "Hilo del destino", 1, "fate", 144],
  ["inevitable_destination", "Destino Inevitável", "Inevitable Destination", "Destino inevitable", 4, "travel", 144],
  ["victory_cry", "Grito de Vitória", "Victory Cry", "Grito de victoria", 1, "might", 144],
  ["purifying_veil", "Véu Purificador", "Purifying Veil", "Velo purificador", 4, "water", 144],
  ["weaponize_secret", "Armar Segredo", "Weaponize Secret", "Armar secreto", 4, "secrecy", 145],
  ["wind_whispers", "Sussurros do Vento", "Wind Whispers", "Susurros del viento", 4, "air", 145],
  ["wordsmith", "Mestre das Palavras", "Wordsmith", "Maestro de las palabras", 4, "knowledge", 145],
];
for (const [slug, pt, en, es, rank, domain, page] of DARK_ARCHIVE_APOCRYPHAL_DOMAINS) {
  const id = `spell.dark_archive.domain.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank, focus: true, domain,
    category: "Domínio Apócrifo", type: "Focus Spell", traditions: ["divine"], traits: ["Domínio", "Apócrifo"],
    summaries: {
      "pt-BR": `Magia de domínio apócrifo de ${domain}, foco ${rank}, de Dark Archive.`,
      en: `Dark Archive apocryphal ${domain} domain focus spell, focus ${rank}.`,
      es: `Conjuro de dominio apócrifo de ${domain} de Dark Archive, foco ${rank}.`,
    },
    description: "Magia de domínio apócrifo; efeitos e requisito de acesso ao domínio pendentes de revisão.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 181–183: magias temporais.
const DARK_ARCHIVE_TEMPORAL_SPELLS = [
  ["awaken_entropy", "Despertar Entropia", "Awaken Entropy", "Despertar la entropía", 6, 181],
  ["behold_the_weave", "Contemplar a Trama", "Behold the Weave", "Contemplar la trama", 3, 181],
  ["quicken_time", "Acelerar o Tempo", "Quicken Time", "Acelerar el tiempo", 5, 181],
  ["stagnate_time", "Estagnar o Tempo", "Stagnate Time", "Estancar el tiempo", 5, 181],
  ["loose_times_arrow", "Soltar a Flecha do Tempo", "Loose Time's Arrow", "Soltar la flecha del tiempo", 2, 182],
  ["morass_of_ages", "Pântano das Eras", "Morass of Ages", "Pantano de las eras", 4, 182],
  ["summon_irii", "Convocar Irii", "Summon Irii", "Convocar iri", 8, 182],
  ["suspended_retribution", "Retribuição Suspensa", "Suspended Retribution", "Retribución suspendida", 6, 183],
  ["time_pocket", "Bolso Temporal", "Time Pocket", "Bolsillo temporal", 3, 183],
  ["time_sense", "Sentido Temporal", "Time Sense", "Sentido temporal", 1, 183],
  ["temporal_twin", "Gêmeo Temporal", "Temporal Twin", "Gemelo temporal", 3, 183],
];
for (const [slug, pt, en, es, rank, page] of DARK_ARCHIVE_TEMPORAL_SPELLS) {
  const id = `spell.dark_archive.temporal.${slug}`;
  if ((PF2E_DATA.spells || []).some((record) => record.id === id)) continue;
  PF2E_DATA.spells.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, rank, level: rank,
    category: "Magia Temporal", type: rank === 1 ? "Cantrip" : "Spell", traditions: ["arcane", "occult"], traits: ["Temporal"],
    summaries: {
      "pt-BR": `Magia temporal de Dark Archive, ranque ${rank}.`,
      en: `Dark Archive temporal spell, rank ${rank}.`,
      es: `Conjuro temporal de Dark Archive, rango ${rank}.`,
    },
    description: "Magia temporal de Dark Archive; efeito detalhado e acesso individual pendentes de revisão.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 160–165: itens amaldiçoados e contratos do capítulo de itens.
const DARK_ARCHIVE_ITEMS = [
  ["book_of_lost_days", "Livro dos Dias Perdidos", "Book of Lost Days", "Libro de los días perdidos", 15, "Amaldiçoado", 160],
  ["gift_of_the_poisoned_heart", "Presente do Coração Envenenado", "Gift of the Poisoned Heart", "Regalo del corazón envenenado", 16, "Consumível Amaldiçoado", 160],
  ["calamity_glass", "Vidro da Calamidade", "Calamity Glass", "Vidrio de la calamidad", 11, "Amaldiçoado", 160],
  ["golden_goose", "Ganso Dourado", "Golden Goose", "Ganso dorado", 11, "Amaldiçoado", 160],
  ["rose_of_loves_lost", "Rosa dos Amores Perdidos", "Rose of Loves Lost", "Rosa de los amores perdidos", 10, "Consumível Amaldiçoado", 161],
  ["mistranslators_draft", "Rascunho do Tradutor Incorreto", "Mistranslator's Draft", "Borrador del mal traductor", 9, "Consumível Amaldiçoado", 161],
  ["tablet_of_chained_souls", "Tábua das Almas Acorrentadas", "Tablet of Chained Souls", "Tabla de almas encadenadas", 8, "Amaldiçoado", 161],
  ["ring_of_sneering_charity", "Anel da Caridade Zombeteira", "Ring of Sneering Charity", "Anillo de caridad burlona", 7, "Amaldiçoado", 161],
  ["taletellers_ring", "Anel do Contador de Histórias", "Taleteller's Ring", "Anillo del cuentacuentos", 9, "Amaldiçoado", 161],
  ["cryolite_eye", "Olho de Criolita", "Cryolite Eye", "Ojo de criolita", 6, "Contrato", 164],
  ["hand_hewed_face", "Rosto Esculpido à Mão", "Hand-Hewed Face", "Rostro tallado a mano", 7, "Contrato", 164],
  ["bottomless_purse", "Bolsa Inesgotável", "Bottomless Purse", "Bolsa inagotable", 8, "Contrato", 164],
  ["key_to_the_stomach", "Chave do Estômago", "Key to the Stomach", "Llave del estómago", 9, "Contrato", 165],
  ["vial_of_the_immortal_wellspring", "Frasco da Fonte Imortal", "Vial of the Immortal Wellspring", "Vial del manantial inmortal", 20, "Contrato", 165],
  ["lost_ember", "Brasa Perdida", "Lost Ember", "Brasa perdida", 10, "Contrato", 165],
  ["self_emptying_pocket", "Bolso que se Esvazia Sozinho", "Self-Emptying Pocket", "Bolsillo auto-vaciante", 9, "Contrato", 165],
  ["stone_of_unrivaled_skill", "Pedra da Habilidade Inigualável", "Stone of Unrivaled Skill", "Piedra de habilidad sin igual", 17, "Contrato", 165],
];
for (const [slug, pt, en, es, level, category, page] of DARK_ARCHIVE_ITEMS) {
  const id = `item.dark_archive.${slug}`;
  if ((PF2E_DATA.items || []).some((record) => record.id === id)) continue;
  const cursed = String(category).includes("Amaldiçoado");
  PF2E_DATA.items.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es }, category, subcategory: "Itens Mágicos",
    level, rarity: cursed ? "rare" : "uncommon", traits: ["Mágico", ...(cursed ? ["Amaldiçoado"] : ["Contrato"])],
    summaries: {
      "pt-BR": `Item de ${category.toLowerCase()} de Dark Archive, nível ${level}.`,
      en: `Dark Archive ${String(category).toLowerCase()} item, level ${level}.`,
      es: `Objeto de ${String(category).toLowerCase()} de Dark Archive, nivel ${level}.`,
    },
    description: "Item de Dark Archive; ativação, benefício e maldição detalhados pendentes de revisão.",
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Dark Archive, pp. 166–169: talentos dos arquétipos Pactbinder e Curse Maelstrom.
const DARK_ARCHIVE_ARCHETYPE_FEATS = [
  ["pactbinder", "pactbinder_dedication", "Dedicação de Vinculador de Pactos", "Pactbinder Dedication", "Dedicación de vinculador de pactos", 2, "Treinado em Diplomacia e treinado em Arcanismo, Natureza, Ocultismo ou Religião", 166],
  ["pactbinder", "sociable_vow", "Voto Sociável", "Sociable Vow", "Voto sociable", 4, "Dedicação de Vinculador de Pactos e especialista em Diplomacia", 166],
  ["pactbinder", "pact_of_fey_glamour", "Pacto do Glamour Feérico", "Pact of Fey Glamour", "Pacto del glamour feérico", 4, "Dedicação de Vinculador de Pactos", 166],
  ["pactbinder", "pact_of_draconic_fury", "Pacto da Fúria Dracônica", "Pact of Draconic Fury", "Pacto de furia dracónica", 6, "Dedicação de Vinculador de Pactos", 166],
  ["pactbinder", "pact_of_infernal_prowess", "Pacto da Proeza Infernal", "Pact of Infernal Prowess", "Pacto de proeza infernal", 8, "Dedicação de Vinculador de Pactos", 167],
  ["pactbinder", "pact_of_the_final_breath", "Pacto do Último Suspiro", "Pact of the Final Breath", "Pacto del último aliento", 12, "Dedicação de Vinculador de Pactos", 167],
  ["pactbinder", "pact_of_eldritch_eyes", "Pacto dos Olhos Sobrenaturais", "Pact of Eldritch Eyes", "Pacto de ojos sobrenaturales", 14, "Dedicação de Vinculador de Pactos", 167],
  ["curse_maelstrom", "curse_maelstrom_dedication", "Dedicação de Maremoto de Maldições", "Curse Maelstrom Dedication", "Dedicación de maremoto de maldiciones", 2, "Você está amaldiçoado ou já foi amaldiçoado", 168],
  ["curse_maelstrom", "familiar_oddities", "Excentricidades Familiares", "Familiar Oddities", "Rarezas familiares", 2, "Dedicação de Maremoto de Maldições e treinado em Ocultismo ou Saber de Maldições", 168],
  ["curse_maelstrom", "unnerving_expansion", "Expansão Perturbadora", "Unnerving Expansion", "Expansión inquietante", 4, "Dedicação de Maremoto de Maldições", 168],
  ["curse_maelstrom", "share_burden", "Compartilhar Fardo", "Share Burden", "Compartir carga", 6, "Dedicação de Maremoto de Maldições", 169],
  ["curse_maelstrom", "accursed_magic", "Magia Amaldiçoada", "Accursed Magic", "Magia maldita", 8, "Dedicação de Maremoto de Maldições", 169],
  ["curse_maelstrom", "counter_curse", "Contramaldición", "Counter Curse", "Contramaldición", 8, "Dedicação de Maremoto de Maldições", 169],
  ["curse_maelstrom", "torrential_backlash", "Rebote Torrencial", "Torrential Backlash", "Reversión torrencial", 10, "Dedicação de Maremoto de Maldições", 169],
  ["curse_maelstrom", "reverse_curse", "Reverter Maldição", "Reverse Curse", "Revertir maldición", 12, "Contramaldición", 169],
];
for (const [archetype, slug, pt, en, es, level, prereq, page] of DARK_ARCHIVE_ARCHETYPE_FEATS) {
  const archetypeId = `archetype.dark_archive.${archetype}`;
  const id = `feat.${archetypeId}.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento do arquétipo ${archetype === "pactbinder" ? "Vinculador de Pactos" : "Maremoto de Maldições"}, nível ${level}.`,
      en: `${archetype === "pactbinder" ? "Pactbinder" : "Curse Maelstrom"} archetype feat, level ${level}.`,
      es: `Dote del arquetipo ${archetype === "pactbinder" ? "Vinculador de pactos" : "Maremoto de maldiciones"}, nivel ${level}.`,
    },
    description: "Talento de Dark Archive; efeito detalhado pendente de revisão.", category: "Arquétipo", type: "Talento", level,
    archetypeId, prerequisites: [prereq], traits: ["Arquétipo"],
    source: { book: DARK_ARCHIVE_SOURCE, page }, sourceApproximate: true, ruleset: "legacy", needs_review: true,
  });
}

// Pólvora e Engrenagens (pré-Remaster), pp. 24–31 e 114–126:
// talentos de classe de Inventor e Pistoleiro. Os efeitos completos continuam
// marcados para revisão, mas nomes, níveis, classe e pré-requisitos já fazem
// parte do contrato de seleção do construtor.
const GUNS_GEARS_CLASS_FEATS = [
  ["inventor", "adulterar", "Adulterar", "Tamper", "Adulterar", 1, ""],
  ["inventor", "companheiro_prototipo", "Companheiro Protótipo", "Prototype Companion", "Compañero prototipo", 1, ""],
  ["inventor", "ferramentas_integradas", "Ferramentas Integradas", "Integrated Tools", "Herramientas integradas", 1, ""],
  ["inventor", "compactar_armadura", "Compactar Armadura", "Collapse Armor", "Compactar armadura", 2, "Inovação de armadura"],
  ["inventor", "compactar_construto", "Compactar Construto", "Collapse Construct", "Compactar constructo", 2, "Inovação de construto"],
  ["inventor", "compactar_arma", "Compactar Arma", "Collapse Weapon", "Compactar arma", 2, "Inovação de arma"],
  ["inventor", "inovacao_adaptavel", "Inovação Adaptável", "Adaptive Innovation", "Innovación adaptable", 2, "Inovação"],
  ["inventor", "sobrecarga_rapida", "Sobrecarga Rápida", "Quick Overload", "Sobrecarga rápida", 2, ""],
  ["inventor", "sobrecarga_instavel", "Sobrecarga Instável", "Unstable Overload", "Sobrecarga inestable", 2, ""],
  ["inventor", "gambiarra_util", "Gambiarra Útil", "Useful Contraption", "Artilugio útil", 4, ""],
  ["inventor", "inovacao_incremental", "Inovação Incremental", "Breakthrough Innovation", "Innovación incremental", 7, ""],
  ["inventor", "reflexos_rapidos", "Reflexos Rápidos", "Incredible Initiative", "Reflejos rápidos", 7, ""],
  ["inventor", "sobrecarga_magistral", "Sobrecarga Magistral", "Brilliant Overload", "Sobrecarga magistral", 7, ""],
  ["inventor", "especializacao_em_armas", "Especialização em Armas", "Weapon Specialization", "Especialización en armas", 7, ""],
  ["inventor", "especialidade_inventiva", "Especialidade Inventiva", "Inventive Expertise", "Pericia inventiva", 9, ""],
  ["inventor", "amplificador_ofensivo", "Amplificador Ofensivo", "Offensive Boost", "Amplificador ofensivo", 9, ""],
  ["inventor", "reconfiguracao_completa", "Reconfiguração Completa", "Complete Reconfiguration", "Reconfiguración completa", 13, ""],
  ["inventor", "maestria_em_armas", "Maestria em Armas de Inventor", "Inventor Weapon Mastery", "Maestría en armas de inventor", 13, ""],
  ["inventor", "especializacao_maior", "Especialização em Armas Maior", "Greater Weapon Specialization", "Especialización mayor en armas", 15, ""],
  ["inventor", "sobrecarga_inigualavel", "Sobrecarga Inigualável", "Unmatched Overload", "Sobrecarga inigualable", 15, ""],
  ["inventor", "inovacao_revolucionaria", "Inovação Revolucionária", "Revolutionary Innovation", "Innovación revolucionaria", 15, ""],
  ["inventor", "maestria_inventiva", "Maestria Inventiva", "Inventive Mastery", "Maestría inventiva", 17, ""],
  ["inventor", "invencao_infinita", "Invenção Infinita", "Infinite Invention", "Invención infinita", 19, ""],
  ["gunslinger", "as_da_besta", "Ás da Besta", "Crossbow Ace", "As de la ballesta", 1, ""],
  ["gunslinger", "disparo_de_cobertura", "Disparo de Cobertura", "Covering Fire", "Disparo de cobertura", 1, ""],
  ["gunslinger", "espada_e_pistola", "Espada e Pistola", "Sword and Pistol", "Espada y pistola", 1, ""],
  ["gunslinger", "estourar_fechadura", "Estourar Fechadura", "Blast Lock", "Reventar cerradura", 1, ""],
  ["gunslinger", "recarga_dupla", "Recarga Dupla", "Dual-Weapon Reload", "Recarga doble", 1, ""],
  ["gunslinger", "para_o_chao", "Para o Chão!", "Point-Blank Shot", "¡Al suelo!", 1, ""],
  ["gunslinger", "manufatura_de_municao", "Manufatura de Munição", "Munition Crafter", "Fabricante de munición", 1, ""],
  ["gunslinger", "armamentos_defensivos", "Armamentos Defensivos", "Defensive Armaments", "Armamentos defensivos", 2, ""],
  ["gunslinger", "arma_reserva_instantanea", "Arma Reserva Instantânea", "Instant Backup", "Arma de reserva instantánea", 2, ""],
  ["gunslinger", "girar_a_pistola", "Girar a Pistola", "Pistol Twirl", "Girar la pistola", 2, "Treinado em Dissimulação"],
  ["gunslinger", "recarga_arriscada", "Recarga Arriscada", "Risky Reload", "Recarga arriesgada", 2, ""],
  ["gunslinger", "saque_rapido", "Saque Rápido", "Quick Draw", "Desenvainado rápido", 2, ""],
  ["gunslinger", "tiro_de_aviso", "Tiro de Aviso", "Warning Shot", "Disparo de advertencia", 2, "Treinado em Intimidação"],
  ["gunslinger", "tiro_fingido", "Tiro Fingido", "Fake Out", "Disparo fingido", 2, ""],
  ["gunslinger", "atirador_avancado", "Atirador Avançado", "Advanced Shooter", "Tirador avanzado", 6, ""],
  ["gunslinger", "cauterizar", "Cauterizar", "Cauterize", "Cauterizar", 6, ""],
  ["gunslinger", "cortina_de_fumaca", "Cortina de Fumaça", "Smoke Curtain", "Cortina de humo", 8, ""],
  ["gunslinger", "dividir_bala", "Dividir Bala", "Diverting Shot", "Dividir bala", 8, ""],
  ["gunslinger", "perfurar_e_disparar", "Perfurar e Disparar", "Penetrating Fire", "Perforar y disparar", 8, ""],
  ["gunslinger", "saltar_e_disparar", "Saltar e Disparar", "Leap and Fire", "Saltar y disparar", 8, ""],
  ["gunslinger", "ataque_ressaltante", "Ataque Ressaltante", "Ricochet Shot", "Disparo rebotado", 10, ""],
  ["gunslinger", "derrubada_de_tiro_duplo", "Derrubada de Tiro Duplo", "Double Shot Knockdown", "Derribo de doble disparo", 10, ""],
  ["gunslinger", "disparo_penetrante", "Disparo Penetrante", "Penetrating Fire", "Disparo penetrante", 10, ""],
  ["gunslinger", "municoes_preciosas", "Munições Preciosas", "Precious Munitions", "Municiones preciosas", 10, "Maquinista de Munições"],
  ["gunslinger", "tiro_ardiloso", "Tiro Ardiloso", "Trick Shot", "Disparo engañoso", 10, ""],
];
for (const [classKey, slug, pt, en, es, level, prereq] of GUNS_GEARS_CLASS_FEATS) {
  const classId = classKey === "inventor" ? "class.inventor" : "class.gunslinger";
  const id = `feat.${classId}.${String(slug).replace(/ /g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (${en})`, names: { "pt-BR": pt, en, es },
    summaries: {
      "pt-BR": `Talento de classe de ${classKey === "inventor" ? "Inventor" : "Pistoleiro"}; efeito completo pendente de revisão.`,
      en: `${classKey === "inventor" ? "Inventor" : "Gunslinger"} class feat; full effect pending review.`,
      es: `Dote de clase de ${classKey === "inventor" ? "inventor" : "pistolero"}; efecto completo pendiente de revisión.`,
    },
    description: `Talento de classe: ${pt}.`, category: "Classe", type: "Talento", level,
    classId, className: classKey === "inventor" ? "Inventor" : "Pistoleiro",
    prerequisites: prereq ? [prereq] : [], traits: ["Classe", classKey === "inventor" ? "Inventor" : "Pistoleiro"],
    source: { book: GUNS_GEARS_SOURCE, page: classKey === "inventor" ? 24 : 114 },
    sourceApproximate: true, ruleset: "legacy", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 107–112: índice de talentos de Bardo.
// O efeito individual permanece em revisão, mas a opção já é selecionável
// somente por Bardo e respeita o nível do espaço.
const PLAYER_CORE_BARD_FEATS = [
  ["bem_versado", "Bem-Versado", 1], ["abertura_edificante", "Abertura Edificante", 2], ["composicao_prolongada", "Composição Prolongada", 1],
  ["estender_magia", "Estender Magia", 1], ["hino_de_cura", "Hino de Cura", 1], ["performance_marcial", "Performance Marcial", 1], ["performance versatil", "Performance Versátil", 1],
  ["saber_bardico", "Saber Bárdico", 1], ["audiencia_direcionada", "Audiência Direcionada", 2], ["cancao_de_forca", "Canção de Força", 2],
  ["empurrao_emocional", "Empurrão Emocional", 2], ["etude_do_mestre_do_saber", "Étude do Mestre do Saber", 2], ["expansao_de_truque_magico", "Expansão de Truque Mágico", 2],
  ["musa_multifacetada", "Musa Multifacetada", 2], ["polimata_esoterico", "Polímata Esotérico", 2], ["antifona_instigadora", "Antífona Instigadora", 4],
  ["em_sintonia", "Em Sintonia", 4], ["encorajar_avanco", "Encorajar Avanço", 4], ["ler_o_combate", "Ler o Combate", 4], ["magia_melodiosa", "Magia Melodiosa", 4],
  ["pesquisador_de_rituais", "Pesquisador de Rituais", 4], ["tempo_triplo", "Tempo Triplo", 4], ["versatilidade_emblematica", "Versatilidade Emblemática", 4],
  ["conhecimento_garantido", "Conhecimento Garantido", 6], ["conjuracao_consistente", "Conjuração Consistente", 6], ["coordenacao_defensiva", "Coordenação Defensiva", 6],
  ["educar_aliados", "Educar Aliados", 6], ["lamento_da_condenacao", "Lamento da Condenação", 6], ["harmonizar", "Harmonizar", 6], ["cancao_de_marcha", "Canção de Marcha", 6],
  ["acompanhar", "Acompanhar", 8], ["chamado_e_resposta", "Chamado e Resposta", 8], ["composicao_em_fortissimo", "Composição em Fortíssimo", 8], ["coragem_reflexiva", "Coragem Reflexiva", 8],
  ["pericia_ecletica", "Perícia Eclética", 8], ["sabe_tudo", "Sabe-Tudo", 8], ["visao_animica", "Visão Anímica", 8], ["casa_das_paredes_imaginarias", "Casa das Paredes Imaginárias", 10],
  ["composicao_inusitada", "Composição Inusitada", 10], ["conjuracao_acelerada", "Conjuração Acelerada", 10], ["encorajar_ataque", "Encorajar Ataque", 10], ["anotar_composicao", "Anotar Composição", 10],
  ["ode_ao_ouroboros", "Ode ao Ouroboros", 10], ["sinfonia_do_coracao_liberto", "Sinfonia do Coração Liberto", 10], ["ataque_compartilhado", "Ataque Compartilhado", 12],
  ["conhecimento_do_enigma", "Conhecimento do Enigma", 12], ["foco_inspirador", "Foco Inspirador", 12], ["polimata_ecletico", "Polímata Eclético", 12], ["reverberar", "Reverberar", 12],
  ["allegro", "Allegro", 14], ["antifona_do_vigor", "Antífona do Vigor", 14], ["balada tranquilizante", "Balada Tranquilizante", 14], ["capacidade_de_estudo", "Capacidade de Estudo", 16],
  ["concentracao_sem_esforco", "Concentração sem Esforço", 16], ["encorajar_devastacao", "Encorajar Devastação", 16], ["finale_retumbante", "Finale Retumbante", 16], ["voz_dissonante", "Voz Dissonante", 18],
  ["composicao_eterna", "Composição Eterna", 18], ["erudicao_profunda", "Erudição Profunda", 18], ["fruto_da_minha_imaginacao", "Fruto da Minha Imaginação", 18], ["polimata_impossivel", "Polímata Impossível", 18],
  ["aria_fatal", "Ária Fatal", 20], ["bis_perfeito", "Bis Perfeito", 20], ["flauteio_fascinante", "Flauteio Fascinante", 20], ["polimata_supremo", "Polímata Supremo", 20], ["sinfonia_da_musa", "Sinfonia da Musa", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_BARD_FEATS) {
  const id = `feat.class.bard.${String(slug).replace(/ /g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Bard)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Bardo; efeito completo pendente de revisão.", en: "Bard class feat; full effect pending review.", es: "Dote de clase de bardo; efecto completo pendiente de revisión." },
    description: `Talento de classe de Bardo: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.bard", className: "Bardo", prerequisites: [], traits: ["Classe", "Bardo"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 107 : level <= 8 ? 108 : level <= 14 ? 109 : 110 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 132–135: talentos de Clérigo presentes
// no índice e nos blocos da classe.
const PLAYER_CORE_CLERIC_FEATS = [
  ["simplicidade_mortal", "Simplicidade Mortal", 1], ["maos_agressoras", "Mãos Agressoras", 1], ["maos_curandeiras", "Mãos Curandeiras", 1],
  ["premonicao_de_salvacao", "Premonição de Salvação", 1], ["amedrontar_os_mortos", "Amedrontar os Mortos", 2], ["armadura_do_capelao_da_guerra", "Armadura do Capelão da Guerra", 2],
  ["ornar_armamento", "Ornar Armamento", 2], ["cura_comunal", "Cura Comunal", 2], ["exaurir_vida", "Exaurir Vida", 2], ["expansao_de_truque_magico", "Expansão de Truque Mágico", 2],
  ["fonte_versatil", "Fonte Versátil", 2], ["resposta_rapida", "Resposta Rápida", 2], ["canalizacao_direcionada", "Canalização Direcionada", 4], ["canalizar_punicao", "Canalizar Punição", 4],
  ["erguer_simbolo", "Erguer Símbolo", 4], ["golpe_restaurador", "Golpe Restaurador", 4], ["infusao_divina", "Infusão Divina", 4], ["solo_sagrado", "Solo Sagrado", 4],
  ["arma_divina", "Arma Divina", 6], ["conjuracao_consistente", "Conjuração Consistente", 6], ["energia_seletiva", "Energia Seletiva", 6], ["maos_magicas", "Mãos Mágicas", 6],
  ["refutacao_divina", "Refutação Divina", 6], ["subjugar", "Subjugar", 6], ["avanco_fervoroso", "Avanço Fervoroso", 8], ["canalizacao_restaurativa", "Canalização Restaurativa", 8],
  ["cremar_mortos_vivos", "Cremar Mortos-Vivos", 8], ["dominio_avancado", "Domínio Avançado", 8], ["sifao_do_vazio", "Sifão do Vazio", 8], ["surto_de_foco", "Surto de Foco", 8],
  ["santificar_armamento", "Santificar Armamento", 8], ["escudo_da_fe", "Escudo da Fé", 10], ["arma_castigante", "Arma Castigante", 10], ["provimento_de_guerra", "Provimento de Guerra", 10],
  ["recuperacao_heroica", "Recuperação Heroica", 10], ["salvacao_compartilhada", "Salvação Compartilhada", 10], ["alivio_fortunado", "Alívio Afortunado", 12], ["foco_em_dominios", "Foco em Domínios", 12],
  ["ornar_antimagia", "Ornar Antimagia", 12], ["provimento_compartilhado", "Provimento Compartilhado", 12], ["recuperacao_defensiva", "Recuperação Defensiva", 12], ["simbolo_enfraquecedor", "Símbolo Enfraquecedor", 12],
  ["banimento_rapido", "Banimento Rápido", 14], ["canalizar_bloqueio", "Canalizar Bloqueio", 14], ["fluxo_e_refluxo", "Fluxo e Refluxo", 14], ["premonicao_de_clareza", "Premonição de Clareza", 14],
  ["protecao_divina", "Proteção Divina", 14], ["armamento_duradouro", "Armamento Duradouro", 14], ["bencao_eterna", "Bênção Eterna", 16], ["punicao_continua", "Punição Contínua", 16],
  ["remediar", "Remediar", 16], ["ressuscitador", "Ressuscitador", 16], ["ruina_eterna", "Ruína Eterna", 16], ["apogeu_divino", "Apogeu Divino", 18],
  ["banimento_rapido_aprimorado", "Banimento Rápido Aprimorado", 18], ["canalizacao_ecoante", "Canalização Ecoante", 18], ["clareza_compartilhada", "Clareza Compartilhada", 18], ["inviolavel", "Inviolável", 18],
  ["possibilidade_milagrosa", "Possibilidade Milagrosa", 18], ["audiencia_do_avatar", "Audiência do Avatar", 20], ["canalizacao_de_moldamagia", "Canalização de Moldamagia", 20], ["milagreiro", "Milagreiro", 20], ["protecao_do_avatar", "Proteção do Avatar", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_CLERIC_FEATS) {
  const id = `feat.class.cleric.${String(slug).replace(/ /g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Cleric)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Clérigo; efeito completo pendente de revisão.", en: "Cleric class feat; full effect pending review.", es: "Dote de clase de clérigo; efecto completo pendiente de revisión." },
    description: `Talento de classe de Clérigo: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.cleric", className: "Clérigo", prerequisites: [], traits: ["Classe", "Clérigo"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 132 : level <= 8 ? 133 : level <= 14 ? 134 : 135 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), seção de Druida: opções de talento do índice
// local. O conteúdo mecânico individual fica sinalizado para revisão.
const PLAYER_CORE_DRUID_FEATS = [
  ["companheiro_animal", "Companheiro Animal", 1], ["empatia_com_animais", "Empatia com Animais", 1], ["empatia_com_plantas", "Empatia com Plantas", 1], ["nascido_da_tempestade", "Nascido da Tempestade", 1],
  ["familiar_melhorado", "Familiar Melhorado", 2], ["chamado_dos_ermos", "Chamado dos Ermos", 2], ["explorador_de_ordens", "Explorador de Ordens", 2], ["companheiro_animal_maduro", "Companheiro Animal Maduro", 4],
  ["convocacoes_elementais", "Convocações Elementais", 4], ["deslocamento_na_floresta", "Deslocamento na Floresta", 4], ["magia_de_ordem", "Magia de Ordem", 4], ["segredos_de_familiar_leshy", "Segredos de Familiar Leshy", 4],
  ["crescimento_do_carvalho", "Crescimento do Carvalho", 6], ["aspecto_de_inseto", "Aspecto de Inseto", 6], ["conjuracao_consistente", "Conjuração Consistente", 6], ["companheiro_incrivel", "Companheiro Incrível", 8],
  ["evocador_de_fadas", "Evocador de Fadas", 8], ["evocador_de_ventos", "Evocador de Ventos", 8], ["arma_pristina", "Arma Prístina", 10], ["aspecto_de_elemental", "Aspecto de Elemental", 10],
  ["aspecto_de_planta", "Aspecto de Planta", 10], ["lado_a_lado", "Lado a Lado", 10], ["foco_primal", "Foco Primal", 12], ["oasis_ambulante", "Oásis Ambulante", 12],
  ["companheiro_especializado", "Companheiro Especializado", 14], ["metamorfose_verdejante", "Metamorfose Verdejante", 14], ["natureza_atemporal", "Natureza Atemporal", 14], ["aspecto_de_monstruosidade", "Aspecto de Monstruosidade", 16],
  ["silvados_empaladores", "Silvados Empaladores", 16], ["ventos_ascendentes", "Ventos Ascendentes", 16], ["egide_primal", "Égide Primal", 18],
];
for (const [slug, pt, level] of PLAYER_CORE_DRUID_FEATS) {
  const id = `feat.class.druid.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Druid)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Druida; efeito completo pendente de revisão.", en: "Druid class feat; full effect pending review.", es: "Dote de clase de druida; efecto completo pendiente de revisión." },
    description: `Talento de classe de Druida: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.druid", className: "Druida", prerequisites: [], traits: ["Classe", "Druida"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 149 : level <= 8 ? 150 : level <= 14 ? 151 : 152 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 184–191: bloco inicial de talentos de
// Guerreiro. A seleção fica vinculada à classe; detalhes individuais ainda
// aguardam revisão editorial/mecânica.
const PLAYER_CORE_FIGHTER_FEATS = [
  ["ataque_fisgador", "Ataque Fisgador", 1], ["afericao_de_combate", "Aferição de Combate", 1], ["corte_duplo", "Corte Duplo", 1], ["escudo_reativo", "Escudo Reativo", 1],
  ["golpe_de_exatidao", "Golpe de Exatidão", 1], ["golpe_feroz", "Golpe Feroz", 1], ["investida_subita", "Investida Súbita", 1], ["postura_de_queima_roupa", "Postura de Queima-Roupa", 1],
  ["aparagem_de_duelo", "Aparagem de Duelo", 2], ["arremesso_ressaltante", "Arremesso Ressaltante", 2], ["bloqueio_agressivo", "Bloqueio Agressivo", 2], ["estocada", "Estocada", 2],
  ["frear_com_a_arma", "Frear com a Arma", 2], ["floreio_guerreiro", "Floreio Guerreiro", 2], ["atracar_em_combate", "Atracar em Combate", 2], ["reposicionamento_elegante", "Reposicionamento Elegante", 2],
  ["troca_veloz", "Troca Veloz", 2], ["guerreiro_pressao", "Guerreiro Pressão", 2], ["tiro_de_assistencia", "Tiro de Assistência", 2], ["aparagem_dupla", "Aparagem Dupla", 4],
  ["ataque_de_duas_maos", "Ataque de Duas Mãos", 4], ["deslocamento_com_escudo", "Deslocamento com Escudo", 4], ["empurrao_poderoso", "Empurrão Poderoso", 4], ["investida_abaloante", "Investida Abalroante", 4],
  ["jogar_no_chao", "Jogar no Chão", 4], ["reversao_rapida", "Reversão Rápida", 4], ["tiro_duplo", "Tiro Duplo", 4], ["tiro_em_retirada", "Tiro em Retirada", 4],
  ["varredura", "Varredura", 4], ["ataque_vantajoso", "Ataque Vantajoso", 6], ["deflexao_do_protetor", "Deflexão do Protetor", 6], ["escudo_protetor", "Escudo Protetor", 6],
  ["escudo_reflexivo", "Escudo Reflexivo", 6], ["estilhacar_defesas", "Estilhaçar Defesas", 6], ["foco_furioso", "Foco Furioso", 6], ["golpe_atordoante", "Golpe Atordoante", 6],
  ["punhalada_reveladora", "Punhalada Reveladora", 6], ["tiro_triplo", "Tiro Triplo", 6], ["treinamento_com_armas_avancadas", "Treinamento com Armas Avançadas", 6], ["postura_de_desarme", "Postura de Desarme", 6],
  ["postura_de_ricochete", "Postura de Ricochete", 6], ["ataque_de_posicionamento", "Ataque de Posicionamento", 8], ["bloqueio_rapido_com_escudo", "Bloqueio Rápido com Escudo", 8], ["bravura_ressonante", "Bravura Ressonante", 8],
  ["brecha_desorientadora", "Brecha Desorientadora", 8], ["golpe_de_derrubada", "Golpe de Derrubada", 8], ["lutar_as_cegas", "Lutar às Cegas", 8], ["mira_incrivel", "Mira Incrível", 8],
  ["postura_de_tiro_movel", "Postura de Tiro Móvel", 8], ["riposta_de_duelo", "Riposta de Duelo", 8], ["salto_subito", "Salto Súbito", 8],
];
for (const [slug, pt, level] of PLAYER_CORE_FIGHTER_FEATS) {
  const id = `feat.class.fighter.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Fighter)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Guerreiro; efeito completo pendente de revisão.", en: "Fighter class feat; full effect pending review.", es: "Dote de clase de guerrero; efecto completo pendiente de revisión." },
    description: `Talento de classe de Guerreiro: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.fighter", className: "Guerreiro", prerequisites: [], traits: ["Classe", "Guerreiro"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 184 : level <= 6 ? 185 : 186 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 214–218: primeiros blocos de talentos de
// Ladino. Pré-requisitos específicos de perícia/arma são adicionados conforme
// a revisão mecânica individual; o gate de classe e nível já é obrigatório.
const PLAYER_CORE_ROGUE_FEATS = [
  ["acrobatar_para_tras", "Acrobatar para Trás", 1], ["descobridor_de_armadilhas", "Descobridor de Armadilhas", 1], ["esquiva_agil", "Esquiva Ágil", 1], ["finta_provocante", "Finta Provocante", 1],
  ["finta_dupla", "Finta Dupla", 1], ["plantar_evidencia", "Plantar Evidência", 1], ["voce_e_o_proximo", "Você é o Próximo", 1], ["ataque_traicoeiro", "Ataque Traiçoeiro", 2],
  ["afanar", "Afanar", 2], ["braco_forte", "Braço Forte", 2], ["finta_de_distracao", "Finta de Distração", 2], ["gambito_sagaz", "Gambito Sagaz", 2], ["golpe_desequilibrante", "Golpe Desequilibrante", 2],
  ["mobilidade", "Mobilidade", 2], ["saque_rapido", "Saque Rápido", 2], ["surra_brutal", "Surra Brutal", 2], ["aviso_do_batedor", "Aviso do Batedor", 4], ["distracao_dupla", "Distração Dupla", 4],
  ["envenenar_arma", "Envenenar Arma", 4], ["golpeador_pavoroso", "Golpeador Pavoroso", 4], ["pisao_na_cabeca", "Pisada na Cabeça", 4], ["quanto_maior_o_tombo", "Quanto Maior o Tombo", 4],
  ["perseguicao_reativa", "Perseguição Reativa", 4], ["previsivel", "Previsível!", 4], ["sabotagem", "Sabotagem", 4], ["surpresa_do_malandro", "Surpresa do Malandro", 4],
  ["antecipa_emboscada", "Antecipar Emboscada", 6], ["arremesso_longinquo", "Arremesso Longínquo", 6], ["bandear", "Bandear", 6], ["desarme_astuto", "Desarme Astuto", 6],
  ["empurrar_e_derrubar", "Empurrar e Derrubar", 6], ["fica_esperto", "Fica Esperto", 6], ["golpe_escaramucador", "Golpe Escaramuçador", 6], ["passo_leve", "Passo Leve", 6], ["torcer_a_faca", "Torcer a Faca", 6],
  ["adiar_armadilha", "Adiar Armadilha", 8], ["arrebatar_suvenir", "Arrebatar Suvenir", 8], ["cambalhota_agil", "Cambalhota Ágil", 8], ["compra_preditiva", "Compra Preditiva", 8],
  ["na_mosca", "Na Mosca", 8], ["entrada_tatica", "Entrada Tática", 8], ["envenenar_arma_aprimorado", "Envenenar Arma Aprimorado", 8], ["estratagema_inspirado", "Estratagema Inspirado", 8],
];
for (const [slug, pt, level] of PLAYER_CORE_ROGUE_FEATS) {
  const id = `feat.class.rogue.${String(slug).replace(/ /g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Rogue)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Ladino; efeito completo pendente de revisão.", en: "Rogue class feat; full effect pending review.", es: "Dote de clase de pícaro; efecto completo pendiente de revisión." },
    description: `Talento de classe de Ladino: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.rogue", className: "Ladino", prerequisites: [], traits: ["Classe", "Ladino"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 214 : level <= 6 ? 215 : 216 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

const PLAYER_CORE_ROGUE_FEATS_ADDITIONAL = [
  ["golpeador_astuto", "Golpeador Astuto", 8], ["lutar_as_cegas", "Lutar às Cegas", 8], ["passo_de_recuo", "Passo de Recuo", 8], ["passo_lateral", "Passo Lateral", 8],
  ["golpe_agil", "Golpe Ágil", 10], ["adepto_da_furtividade", "Adepto da Furtividade", 10], ["debilitacoes_ferozes", "Debilitações Ferozes", 10], ["debilitacoes_metodicas", "Debilitações Metódicas", 10],
  ["debilitacoes_precisas", "Debilitações Precisas", 10], ["debilitacoes_taticas", "Debilitações Táticas", 10], ["tiro_de_derrubada", "Tiro de Derrubada", 12], ["finta_de_ricochete", "Finta de Ricochete", 12],
  ["interferencia_reativa", "Interferência Reativa", 12], ["preparacao", "Preparação", 12], ["salto_fantastico", "Salto Fantástico", 12], ["surgir_das_sombras", "Surgir das Sombras", 12],
  ["brecha_instantanea", "Brecha Instantânea", 14], ["deixar_uma_brecha", "Deixar uma Brecha", 14], ["fica_no_chao", "Fica no Chão!", 14], ["rolamento_defensivo", "Rolamento Defensivo", 14], ["sentir_o_que_nao_e_visto", "Sentir o que Não é Visto", 14],
  ["corte_dissipante", "Corte Dissipante", 16], ["brecha_cognitiva", "Brecha Cognitiva", 16], ["distracao_perfeita", "Distração Perfeita", 16], ["elusao_veloz", "Evasão Veloz", 16], ["passo_nas_nuvens", "Passo nas Nuvens", 16], ["quadro_em_branco", "Quadro em Branco", 16], ["reconstruir_a_cena", "Reconstruir a Cena", 16],
  ["compra_implausivel", "Compra Improvável", 18], ["furtividade_poderosa", "Furtividade Poderosa", 18], ["infiltracao_improvavel", "Infiltração Improvável", 18], ["distracao_reativa", "Distração Reativa", 20], ["epitome_da_furtividade", "Epítome da Furtividade", 20], ["golpeador_impossivel", "Golpeador Impossível", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_ROGUE_FEATS_ADDITIONAL) {
  const id = `feat.class.rogue.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Rogue)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Ladino; efeito completo pendente de revisão.", en: "Rogue class feat; full effect pending review.", es: "Dote de clase de pícaro; efecto completo pendiente de revisión." },
    description: `Talento de classe de Ladino: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.rogue", className: "Ladino", prerequisites: [], traits: ["Classe", "Ladino"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 10 ? 216 : level <= 16 ? 217 : 218 }, sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 264–270: talentos de Mago.
const PLAYER_CORE_WIZARD_FEATS = [
  ["ampliar_magia", "Ampliar Magia", 1], ["contramagica", "Contramágica", 1], ["estender_magia", "Estender Magia", 1], ["familiar", "Familiar", 1],
  ["ablacao_de_energia", "Ablação de Energia", 2], ["expansao_de_truque_magico", "Expansão de Truque Mágico", 2], ["familiar_melhorado", "Familiar Melhorado", 2], ["magia_nao_letal", "Magia Não Letal", 2], ["ocultar_magia", "Ocultar Magia", 2],
  ["convocar_ferramentas_magicas", "Convocar Ferramentas Mágicas", 4], ["foco_vinculado", "Foco Vinculado", 4], ["golpes_encantados", "Golpes Encantados", 4], ["matriz_de_protecao_magica", "Matriz de Proteção Mágica", 4],
  ["chegada_explosiva", "Chegada Explosiva", 6], ["conjuracao_consistente", "Conjuração Consistente", 6], ["dividir_espaco_de_magia", "Dividir Espaço de Magia", 6], ["ilusao_convincente", "Ilusão Convincente", 6], ["magia_irresistivel", "Magia Irresistível", 6],
  ["conservacao_de_vinculo", "Conservação de Vínculo", 8], ["conhecimento_e_poder", "Conhecimento é Poder", 8], ["magia_de_escola_avancada", "Magia de Escola Avançada", 8], ["retencao_de_forma", "Retenção de Forma", 8],
  ["adepto_de_pergaminhos", "Adepto de Pergaminhos", 10], ["conjuracao_acelerada", "Conjuração Acelerada", 10], ["energia_avassaladora", "Energia Avassaladora", 10], ["deteccao_magica_agucada", "Detecção Mágica Aguçada", 12], ["energia_forcosa", "Energia Forçosa", 12],
  ["sentido_magico", "Sentido Mágico", 12], ["trespassar_contramagica", "Trespassar Contramágica", 12], ["foco_de_vinculo", "Foco de Vínculo", 14], ["matriz_de_detonacao_secundaria", "Matriz de Detonação Secundária", 14],
  ["refletir_magia", "Refletir Magia", 14], ["vinculo_superior", "Vínculo Superior", 14], ["concentracao_sem_esforco", "Concentração sem Esforço", 16], ["magia_cintilante", "Magia Cintilante", 16],
  ["combinacao_de_magias", "Combinação de Magias", 20], ["maestria_em_magias", "Maestria em Magias", 20], ["maestria_em_moldamagia", "Maestria em Moldamagia", 20], ["poder_do_arquimago", "Poder do Arquimago", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_WIZARD_FEATS) {
  const id = `feat.class.wizard.${String(slug).replace(/ /g, "_")}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Wizard)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Mago; efeito completo pendente de revisão.", en: "Wizard class feat; full effect pending review.", es: "Dote de clase de mago; efecto completo pendiente de revisión." },
    description: `Talento de classe de Mago: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.wizard", className: "Mago", prerequisites: [], traits: ["Classe", "Mago"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 264 : level <= 8 ? 265 : 266 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 286–292: talentos de Patrulheiro.
const PLAYER_CORE_RANGER_FEATS = [
  ["abate_duplo", "Abate Duplo", 1], ["as_com_besta", "Ás com Besta", 1], ["cacula_de_monstros", "Caçador de Monstros", 1], ["companheiro_animal", "Companheiro Animal", 1],
  ["protetor_iniciado", "Protetor Iniciado", 1], ["tiro_a_caca", "Tiro à Caça", 1], ["mira_do_cacador", "Mira do Caçador", 2], ["rechacar_monstros", "Rechaçar Monstros", 2],
  ["saque_rapido", "Saque Rápido", 2], ["terreno_predileto", "Terreno Predileto", 2], ["empatia_com_animais", "Empatia com Animais", 2], ["aparagem_dupla", "Aparagem Dupla", 4],
  ["aviso_do_batedor", "Aviso do Batedor", 4], ["brado_do_companheiro", "Brado do Companheiro", 4], ["interromper_presa", "Interromper Presa", 4], ["presa_predileta", "Presa Predileta", 4],
  ["protetor_avancado", "Protetor Avançado", 4], ["recarga_em_movimento", "Recarga em Movimento", 4], ["tiro_longo", "Tiro Longo", 4], ["companheiro_animal_maduro", "Companheiro Animal Maduro", 6],
  ["protetor_magistral", "Protetor Magistral", 6], ["rastreador_rapido", "Rastreador Rápido", 6], ["recordacao_adicional", "Recordação Adicional", 6], ["tiro_estalido", "Tiro Estalido", 6],
  ["dadiva_do_protetor", "Dádiva do Protetor", 8], ["descobridor_de_perigos", "Descobridor de Perigos", 8], ["lutar_as_cegas", "Lutar às Cegas", 8], ["mestre_em_terreno", "Mestre em Terreno", 8],
  ["mira_letal", "Mira Letal", 8], ["companheiro_incrivel", "Companheiro Incrível", 10], ["cacador_de_monstros_magistral", "Caçador de Monstros Magistral", 10], ["camuflagem", "Camuflagem", 10],
  ["passo_do_guia", "Passo do Guia", 10], ["riposta_dupla", "Riposta Dupla", 10], ["tiro_penetrante", "Tiro Penetrante", 10], ["lado_a_lado", "Lado a Lado", 12],
  ["presa_dupla", "Presa Dupla", 12], ["segunda_ferroada", "Segunda Ferroada", 12], ["tiro_de_distracao", "Tiro de Distração", 12], ["sentir_o_que_nao_e_visto", "Sentir o que Não é Visto", 14],
  ["companheiro_furtivo", "Companheiro Furtivo", 14], ["orientacao_do_cacador", "Orientação do Caçador", 14], ["companheiro_especializado", "Companheiro Especializado", 16], ["cacador_de_monstros_lendario", "Caçador de Monstros Lendário", 16],
  ["recarga_do_protetor", "Recarga do Protetor", 16], ["riposta_dupla_aprimorada", "Riposta Dupla Aprimorada", 16], ["tiro_de_distracao_maior", "Tiro de Distração Maior", 16], ["excelencia_multipla", "Excelência Múltipla", 18],
  ["cacador_das_sombras", "Caçador das Sombras", 18], ["companheiro_magistral", "Companheiro Magistral", 18], ["rajada_impossivel", "Rajada Impossível", 18], ["saraivada_impossivel", "Saraivada Impossível", 18], ["tiro_perfeito", "Tiro Perfeito", 18],
  ["ameaca_tripla", "Ameaça Tripla", 20], ["ate_os_confins_da_terra", "Até os Confins da Terra", 20], ["escaramucador_irrevogavel", "Escaramuçador Irrevogável", 20], ["tiro_lendario", "Tiro Lendário", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_RANGER_FEATS) {
  const id = `feat.class.ranger.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Ranger)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Patrulheiro; efeito completo pendente de revisão.", en: "Ranger class feat; full effect pending review.", es: "Dote de clase de explorador; efecto completo pendiente de revisión." },
    description: `Talento de classe de Patrulheiro: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.ranger", className: "Patrulheiro", prerequisites: [], traits: ["Classe", "Patrulheiro"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 286 : level <= 8 ? 287 : 288 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Livro do Jogador (Remaster), pp. 114–119: talentos de Bruxo.
const PLAYER_CORE_WITCH_FEATS = [
  ["ampliar_magia", "Ampliar Magia", 1], ["armamentos_de_bruxo", "Armamentos de Bruxo", 1], ["contramagica", "Contramágica", 1], ["estender_magia", "Estender Magia", 1],
  ["expansao_de_truque_magico", "Expansão de Truque Mágico", 2], ["familiar_melhorado", "Familiar Melhorado", 2], ["idioma_de_familiar", "Idioma de Familiar", 2], ["licao_basica", "Lição Básica", 2], ["ocultar_magia", "Ocultar Magia", 2],
  ["golpe_empatico", "Golpe Empático", 4], ["ritos_de_convocacao", "Ritos de Convocação", 4], ["carga_de_bruxo", "Carga de Bruxo", 6], ["conjuracao_consistente", "Conjuração Consistente", 6], ["faca_cerimonial", "Faca Cerimonial", 6], ["licao_maior", "Lição Maior", 6],
  ["familiar_costurado", "Familiar Costurado", 8], ["familiar_espirito", "Familiar Espírito", 8], ["familiar_incrivel", "Familiar Incrível", 8], ["frasco_de_bruxo", "Frasco de Bruxo", 8], ["visao_na_cerrao", "Visão na Cerração", 8],
  ["comunhao_do_bruxo", "Comunhão do Bruxo", 10], ["conjuracao_acelerada", "Conjuração Acelerada", 10], ["licao_superior", "Lição Superior", 10], ["mais_fogo_para_a_panela", "Mais Fogo para a Panela", 10], ["foco_de_sortilegio", "Foco de Sortilégio", 12],
  ["magia_de_coventiculo", "Magia de Coventículo", 12], ["vassoura_de_bruxo", "Vassoura de Bruxo", 12], ["presenca_do_patrono", "Presença do Patrono", 14], ["refletir_magia", "Refletir Magia", 14], ["ritos_de_transfiguracao", "Ritos de Transfiguração", 14],
  ["concentracao_sem_esforco", "Concentração sem Esforço", 16], ["sifonar_poder", "Sifonar Poder", 16], ["dividir_sortilegio", "Dividir Sortilégio", 18], ["reivindicacao_do_patrono", "Reivindicação do Patrono", 18], ["cabana_do_bruxo", "Cabana do Bruxo", 20], ["mestre_dos_sortilegios", "Mestre dos Sortilégios", 20], ["verdade_do_patrono", "Verdade do Patrono", 20],
];
for (const [slug, pt, level] of PLAYER_CORE_WITCH_FEATS) {
  const id = `feat.class.witch.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Witch)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Bruxo; efeito completo pendente de revisão.", en: "Witch class feat; full effect pending review.", es: "Dote de clase de bruja; efecto completo pendiente de revisión." },
    description: `Talento de classe de Bruxo: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.witch", className: "Bruxo", prerequisites: [], traits: ["Classe", "Bruxo"],
    source: { book: PLAYER_CORE_SOURCE, page: level <= 2 ? 114 : level <= 8 ? 115 : 116 },
    sourceApproximate: true, ruleset: "remaster", needs_review: true, rarity: "common",
  });
}

// Segredos da Magia (pré-Remaster), pp. 144–151: talentos de Convocador.
const SECRETS_SUMMONER_FEATS = [
  ["arsenal_avancado", "Arsenal Avançado", 1], ["coracao_de_energia", "Coração de Energia", 1], ["estudos_duais", "Estudos Duais", 1], ["forma_planadora", "Forma Planadora", 1], ["fundir_se_ao_eidolon", "Fundir-se ao Eidolon", 1], ["libertar_eidolon", "Libertar Eidolon", 1], ["prolongar_impulsionamento", "Prolongar Impulsionamento", 1], ["sentidos_expandidos", "Sentidos Expandidos", 1],
  ["acao_vivaz", "Ação Vivaz", 2], ["combatente_a_distancia", "Combatente à Distância", 2], ["executante_de_magia", "Executante de Magia", 2], ["forma_anfibia", "Forma Anfíbia", 2], ["forma_de_corcel", "Forma de Corcel", 2], ["reforcar_eidolon", "Reforçar Eidolon", 2],
  ["sentido_de_vibracao", "Sentido de Vibração", 4], ["coracao_de_energia_dual", "Coração de Energia Dual", 4], ["defender_convocador", "Defender Convocador", 4], ["dispensa_reativa", "Dispensa Reativa", 4], ["encolher_bastante", "Encolher Bastante", 4], ["garras_sangrentas", "Garras Sangrentas", 4], ["movimento_em_sintonia", "Movimento em Sintonia", 4], ["parceiro_perito", "Parceiro Perito", 4], ["surto_de_vinculo_vital", "Surto de Vínculo Vital", 4],
  ["chegada_ostentosa", "Chegada Ostentosa", 6], ["frenesi_sanguinario", "Frenesi Sanguinário", 6], ["golpe_em_sintonia", "Golpe em Sintonia", 6], ["ira_do_eidolon", "Ira do Eidolon", 6], ["sair_de_fase", "Sair de Fase", 6], ["mestre_convocador", "Mestre Convocador", 6], ["oportunidade_do_eidolon", "Oportunidade do Eidolon", 6],
  ["adepto_de_magia", "Adepto de Magia", 8], ["aperto_constritor", "Aperto Constritor", 8], ["impulsionar_convocacoes", "Impulsionar Convocações", 8], ["miniaturizar", "Miniaturizar", 8], ["resistencia_a_energia", "Resistência a Energia", 8], ["tamanho_corpulento", "Tamanho Corpulento", 8],
  ["ataque_impelente", "Ataque Impelente", 10], ["despedacar_impiedoso", "Despedaçar Impiedoso", 10], ["elo_de_protecao", "Elo de Proteção", 10], ["forma_escavadora", "Forma Escavadora", 10], ["impacto_pesado", "Impacto Pesado", 10], ["transposicao", "Transposição", 10],
  ["chamado_do_convocador", "Chamado do Convocador", 12], ["foco_de_vinculo", "Foco de Vínculo", 12], ["membros_atracadores", "Membros Atracadores", 12], ["tamanho_agigantado", "Tamanho Agigantado", 12], ["transmogrificacao_flexivel", "Transmogrificação Flexível", 12],
  ["compartilhar_magia_de_eidolon", "Compartilhar Magia de Eidolon", 14], ["couraca_resiliente", "Couraça Resiliente", 14], ["forma_aerea", "Forma Aérea", 14], ["forma_repelente_de_magia", "Forma Repelente de Magia", 14],
  ["atropelar", "Atropelar", 16], ["concentracao_sem_esforco", "Concentração sem Esforço", 16], ["sentidos_sempre_vigilantes", "Sentidos Sempre Vigilantes", 16], ["manancial_de_vinculo", "Manancial de Vínculo", 18], ["mestre_de_magia", "Mestre de Magia", 18], ["transmogrificacao_verdadeira", "Transmogrificação Verdadeira", 18],
  ["aprimoramento_eterno", "Aprimoramento Eterno", 20], ["eidolon_gemeo", "Eidolon Gêmeo", 20], ["lendario_convocador", "Lendário Convocador", 20],
];
for (const [slug, pt, level] of SECRETS_SUMMONER_FEATS) {
  const id = `feat.class.summoner.${slug}`;
  if ((PF2E_DATA.feats || []).some((record) => record.id === id)) continue;
  PF2E_DATA.feats.push({
    id, name: `${pt} (Summoner)`, names: { "pt-BR": pt, en: String(pt), es: String(pt) },
    summaries: { "pt-BR": "Talento de classe de Convocador; efeito completo pendente de revisão.", en: "Summoner class feat; full effect pending review.", es: "Dote de clase de convocador; efecto completo pendiente de revisión." },
    description: `Talento de classe de Convocador: ${pt}.`, category: "Classe", type: "Talento", level,
    classId: "class.summoner", className: "Convocador", prerequisites: [], traits: ["Classe", "Convocador"],
    source: { book: SECRETS_OF_MAGIC_SOURCE, page: level <= 4 ? 144 : level <= 10 ? 145 : level <= 16 ? 146 : 147 },
    sourceApproximate: true, ruleset: "legacy", needs_review: true, rarity: "common",
  });
}

// Requisitos de postura/equipamento que dependem do estado atual da ficha.
// Mantemos esses gates estruturados para que os pickers possam ocultar opções
// incompatíveis, sem inferir estado quando uma ficha importada não o informa.
const CONTEXTUAL_PREREQUISITE_GATES = {
  "feat.class.dueling_parry": { requiresOneHandOneFree: true },
  "feat.class.double_slice": { requiresTwoMeleeWeapons: true },
  "feat.class.twin_takedown": { requiresTwoMeleeWeapons: true },
  "feat.class.champion.muralha_divina": { requiresShield: true },
  "feat.archetype.cavalier.unseat": { requiresMounted: true },
  "archetype.bullet_dancer": { requiredUnarmoredProficiency: "Especialista" },
};
for (const [id, gate] of Object.entries(CONTEXTUAL_PREREQUISITE_GATES)) {
  const record = (PF2E_DATA.feats || []).find((candidate) => candidate.id === id);
  if (record) Object.assign(record, gate);
  const archetype = (PF2E_DATA.archetypes || []).find((candidate) => candidate.id === id);
  if (archetype) Object.assign(archetype, gate);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PF2E_DATA;
}
