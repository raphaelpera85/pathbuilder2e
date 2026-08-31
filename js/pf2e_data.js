/**
 * COMPÊNDIO COMPLETO PATHFINDER 2E (REMASTER & SUPLEMENTOS) - 100% PT-BR
 * Contém todas as 23 Classes, 30+ Ancestralidades, Heranças Versáteis, 
 * 40+ Antecedentes, Perícias, Armas, Armaduras, Magias e Regras de Criação.
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
      subclasses: ["Patrono do Silêncio Noturno", "Patrono do Destino Tecido", "Patrono da Tempestade Selvagem", "Patrono dos Males Risonhos"]
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
      subclasses: ["Escola de Artes Cívicas", "Escola de Magia de Batalha", "Escola de Fronteiras Mentais", "Escola do Velo Unificado (Generalista)"]
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
      subclasses: ["Lâmina Risonha (Laughing Shadow)", "Defensor Cintilante (Sparkling Targe)", "Giro Inexorável (Inexorable Iron)", "Árvore de Raios (Starlit Span)"]
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
      subclasses: ["Mistério da Batalha", "Mistério dos Ossos", "Mistério das Chamas", "Mistério dos Cosmos", "Mistério das Tempestades", "Mistério da Vida"]
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

Object.entries(GUNS_GEARS_CATALOG.ancestries).forEach(([name, record]) => {
  if (PF2E_DATA.ancestries[name]) Object.assign(PF2E_DATA.ancestries[name], record, { source: { book: GUNS_GEARS_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});
Object.entries(GUNS_GEARS_CATALOG.classes).forEach(([name, record]) => {
  if (PF2E_DATA.classes[name]) Object.assign(PF2E_DATA.classes[name], record, { source: { book: GUNS_GEARS_SOURCE, page: record.page }, ruleset: "legacy", needs_review: false });
});

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

const BOOK_DEAD_SOURCE = "Livro dos Mortos (pré-Remaster)";
PF2E_DATA.ancestries["Esqueleto (Skeleton)"] = {
  id: "ancestry.skeleton", hp: 6, size: "Médio", speed: 25,
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
    subtype: "class", dedicationLevel: 2, prerequisites: ["Ladino", "Divindade e arma favorita compatíveis"],
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
    subtype: "class", dedicationLevel: 2, rarity: "rare", prerequisites: ["Bruxa que perdeu seu patrono"],
    names: { "pt-BR": "Senescal", en: "Seneschal", es: "Senescal" },
    summaries: { "pt-BR": "Arquétipo raro de classe para uma bruxa sem patrono que assume a custódia de poder oculto remanescente.", en: "A rare witch class archetype for a witch without a patron who becomes the steward of lingering occult power.", es: "Un arquetipo raro de clase de bruja sin patrón que se convierte en custodio de un poder oculto remanente." }
  },
  {
    id: "archetype.vindicator", name: "Vindicador (Vindicator)", page: 64,
    subtype: "class", dedicationLevel: 2, prerequisites: ["Patrulheiro", "Divindade compatível"],
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
  PF2E_DATA.classes["Exemplar (Exemplar)"] = PF2E_DATA.classes["Exemplar"];
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

// Catálogo Oficial Expandido de Equipamentos & Itens
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

// Catálogo de Progressão Mágica, Tradições e Slots por Classe (Spellcasting)
PF2E_DATA.spellcastingByClass = {
  "Mago (Wizard)": { tradition: "Arcana", keyAbility: "int", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Clérigo (Cleric)": { tradition: "Divina", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Druida (Druid)": { tradition: "Primal", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Bardo (Bard)": { tradition: "Oculta", keyAbility: "cha", type: "Espontâneo", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Feiticeiro (Sorcerer)": { tradition: "Variável (Linhagem)", keyAbility: "cha", type: "Espontâneo", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [3], 2: [4], 3: [4, 3], 4: [4, 4], 5: [4, 4, 3], 6: [4, 4, 4], 7: [4, 4, 4, 3], 8: [4, 4, 4, 4], 9: [4, 4, 4, 4, 3], 10: [4, 4, 4, 4, 4] } },
  "Bruxo (Witch)": { tradition: "Variável (Patrono)", keyAbility: "int", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Oráculo (Oracle)": { tradition: "Divina", keyAbility: "cha", type: "Espontâneo", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Animista (Animist)": { tradition: "Divina", keyAbility: "wis", type: "Preparado", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [2], 2: [3], 3: [3, 2], 4: [3, 3], 5: [3, 3, 2], 6: [3, 3, 3], 7: [3, 3, 3, 2], 8: [3, 3, 3, 3], 9: [3, 3, 3, 3, 2], 10: [3, 3, 3, 3, 3] } },
  "Magus": { tradition: "Arcana", keyAbility: "int", type: "Preparado Limitado (Bounded)", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [1], 2: [2], 3: [2], 4: [2], 5: [2, 2], 6: [2, 2], 7: [2, 2], 8: [2, 2], 9: [2, 2], 10: [2, 2] } },
  "Invocador (Summoner)": { tradition: "Variável (Eidolon)", keyAbility: "cha", type: "Espontâneo Limitado (Bounded)", cantrips: 5, focusPoolMax: 3, slotsPerLevel: { 1: [1], 2: [2], 3: [2], 4: [2], 5: [2, 2], 6: [2, 2], 7: [2, 2], 8: [2, 2], 9: [2, 2], 10: [2, 2] } },
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
    ruleset: "remaster",
    needs_review: false,
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PF2E_DATA;
}
