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
  weapons: [
    { name: "Rapieira (Rapier)", category: "Marcial", damage: "1d6", damageType: "Perfuração", bulk: 1, traits: ["Acurada (Finesse)", "Mortal d8", "Desarmar"] },
    { name: "Adaga (Dagger)", category: "Simples", damage: "1d4", damageType: "Perfuração/Cortante", bulk: "L", traits: ["Ágil", "Acurada", "Arremesso 10 pés", "Versátil C"] },
    { name: "Adaga de Duelo (Main-gauche)", category: "Simples", damage: "1d4", damageType: "Perfuração", bulk: "L", traits: ["Ágil", "Acurada", "Aparar (Parry)", "Desarmar", "Versátil C"] },
    { name: "Espada Curta (Shortsword)", category: "Simples", damage: "1d6", damageType: "Perfuração/Cortante", bulk: "L", traits: ["Ágil", "Acurada", "Versátil C"] },
    { name: "Espada Longa (Longsword)", category: "Marcial", damage: "1d8", damageType: "Cortante", bulk: 1, traits: ["Versátil P"] },
    { name: "Espadão (Greatsword)", category: "Marcial", damage: "1d12", damageType: "Cortante", bulk: 2, traits: ["Duas Mãos", "Versátil P"] },
    { name: "Arco Longo Composto", category: "Marcial", damage: "1d8", damageType: "Perfuração", bulk: 2, traits: ["Propulsivo", "Mortal d10", "Voleio 30 pés", "Alcance 100 pés"] },
    { name: "Arco Curto Composto", category: "Marcial", damage: "1d6", damageType: "Perfuração", bulk: 1, traits: ["Propulsivo", "Mortal d10", "Alcance 60 pés"] },
    { name: "Besta Pesada (Heavy Crossbow)", category: "Simples", damage: "1d10", damageType: "Perfuração", bulk: 2, traits: ["Recarga 2", "Alcance 120 pés"] },
    { name: "Pistola de Duelo (Dueling Pistol)", category: "Marcial", damage: "1d6", damageType: "Perfuração", bulk: 1, traits: ["Concussiva", "Fatal d10", "Recarga 1", "Alcance 60 pés"] },
    { name: "Arcabuz (Arquebus)", category: "Marcial", damage: "1d8", damageType: "Perfuração", bulk: 2, traits: ["Concussiva", "Fatal d12", "Recarga 1", "Alcance 150 pés", "Voleio 30 pés"] },
    { name: "Machado de Guerra (Battleaxe)", category: "Marcial", damage: "1d8", damageType: "Cortante", bulk: 1, traits: ["Varredura (Sweep)"] },
    { name: "Machado Grande (Greataxe)", category: "Marcial", damage: "1d12", damageType: "Cortante", bulk: 2, traits: ["Varredura (Sweep)"] },
    { name: "Martelo de Guerra (Warhammer)", category: "Marcial", damage: "1d8", damageType: "Impacto", bulk: 1, traits: ["Empurrão (Shove)"] },
    { name: "Mangual Pesado (Flail)", category: "Marcial", damage: "1d6", damageType: "Impacto", bulk: 1, traits: ["Derrubar (Trip)", "Desarmar"] },
    { name: "Lança Montada (Lance)", category: "Marcial", damage: "1d8", damageType: "Perfuração", bulk: 2, traits: ["Investida de Justa d10", "Alcance"] },
    { name: "Bordão (Staff)", category: "Simples", damage: "1d4", damageType: "Impacto", bulk: 1, traits: ["Duas Mãos d8"] },
    { name: "Chifrada de Bode Montês (Bóreas)", category: "Desarmado", damage: "1d6", damageType: "Impacto", bulk: "-", traits: ["Empurrão (Shove)", "Precisão +1d8"] }
  ],

  // ==========================================
  // 7. ARMADURAS OFICIAIS (ARMORS COMPENDIUM)
  // ==========================================
  armors: [
    { name: "Sem Armadura (Roupas Explorador)", category: "Sem Armadura", acBonus: 0, dexCap: 5, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 0 },
    { name: "Armadura de Couro", category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 1 },
    { name: "Couro Batido Reforçado", category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: 0, speedPenalty: 0, strReq: 10, bulk: 1 },
    { name: "Cota de Malha (Chain Shirt)", category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, bulk: 1 },
    { name: "Gibão de Peles (Hide)", category: "Média", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: -5, strReq: 12, bulk: 2 },
    { name: "Brunea / Peitoral de Aço (Breastplate)", category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 14, bulk: 2 },
    { name: "Cota de Malha Completa (Chain Mail)", category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 16, bulk: 2 },
    { name: "Armadura de Placas Completa (Full Plate)", category: "Pesada", acBonus: 6, dexCap: 0, checkPenalty: -3, speedPenalty: -10, strReq: 18, bulk: 4 }
  ],

  // ==========================================
  // 7.1 ESCUDOS OFICIAIS (SHIELDS COMPENDIUM)
  // ==========================================
  shields: [
    { name: "Broquel (Buckler)", acBonus: 1, hardness: 3, maxHp: 6, bt: 3, speedPenalty: 0, bulk: "L", description: "Escudo leve preso ao antebraço que deixa a mão livre para segurar objetos." },
    { name: "Escudo de Madeira (Wooden Shield)", acBonus: 2, hardness: 3, maxHp: 12, bt: 6, speedPenalty: 0, bulk: 1, description: "Escudo clássico de madeira leve e acessível." },
    { name: "Escudo de Aço (Steel Shield)", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: 0, bulk: 1, description: "Escudo resistente de aço forjado para bloquear golpes pesados." },
    { name: "Escudo Torre (Tower Shield)", acBonus: 2, hardness: 5, maxHp: 20, bt: 10, speedPenalty: -5, bulk: 4, description: "Escudo maciço que permite a ação Pegar Cobertura para conceder +4 na CA." },
    { name: "Escudo Robusto Menor (Sturdy Shield Minor)", acBonus: 2, hardness: 8, maxHp: 64, bt: 32, speedPenalty: 0, bulk: 1, description: "Escudo mágico reforçado desenvolvido para absorção contínua de dano em combate." }
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
  { id: "feat.general.toughness", name: "Robustez (Toughness)", names: { "pt-BR": "Robustez", en: "Toughness", es: "Dureza" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Ganha +1 PV por nível e reduz em 1 a CD de salvamento contra a morte.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.fleet", name: "Movimento Rápido (Fleet)", names: { "pt-BR": "Movimento Rápido", en: "Fleet", es: "Pies veloces" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Aumenta seu deslocamento em terra em +5 pés.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.incredible_initiative", name: "Iniciativa Incrível (Incredible Initiative)", names: { "pt-BR": "Iniciativa Incrível", en: "Incredible Initiative", es: "Iniciativa increíble" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "+2 de bônus de circunstância em testes de iniciativa.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.diehard", name: "Duro de Matar (Diehard)", names: { "pt-BR": "Duro de Matar", en: "Diehard", es: "Difícil de matar" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Você morre apenas em Morrendo 5 em vez de Morrendo 4.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.fast_recovery", name: "Recuperação Rápida (Fast Recovery)", names: { "pt-BR": "Recuperação Rápida", en: "Fast Recovery", es: "Recuperación rápida" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Constituição +2", description: "Recupera o dobro de PV descansando e ganha +2 em testes contra doenças e venenos.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.shield_block", name: "Bloqueio com Escudo (Shield Block)", names: { "pt-BR": "Bloqueio com Escudo", en: "Shield Block", es: "Bloqueo con escudo" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], actions: "reaction", prereq: "Treinado com Escudos", description: "[Reação] Absorve dano físico até a Dureza do escudo ao sofrer um ataque.", source: { book: "Livro do Jogador (Player Core)", page: 256 }, ruleset: "remaster" },
  { id: "feat.general.weapon_proficiency", name: "Treinamento com Armas Gerais (Weapon Proficiency)", names: { "pt-BR": "Treinamento com Armas", en: "Weapon Proficiency", es: "Competencia con armas" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Torna-se Treinado em armas marciais ou simples adicionais.", source: { book: "Livro do Jogador (Player Core)", page: 257 }, ruleset: "remaster" },
  { id: "feat.general.armor_proficiency", name: "Treinamento com Armaduras Gerais (Armor Proficiency)", names: { "pt-BR": "Treinamento com Armaduras", en: "Armor Proficiency", es: "Competencia con armaduras" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Torna-se Treinado no próximo escalão de armaduras.", source: { book: "Livro do Jogador (Player Core)", page: 257 }, ruleset: "remaster" },
  { id: "feat.general.canny_acumen", name: "Percepção Astuta (Canny Acumen)", names: { "pt-BR": "Percepção Astuta", en: "Canny Acumen", es: "Agudeza perspicaz" }, type: "Talento Geral", category: "Geral", level: 1, traits: ["Geral"], prereq: "Nenhum", description: "Torna-se Especialista em uma salvaguarda ou Percepção (Mestre no nv 17).", source: { book: "Livro do Jogador (Player Core)", page: 257 }, ruleset: "remaster" },
  { id: "feat.skill.battle_medicine", name: "Medicina de Batalha (Battle Medicine)", names: { "pt-BR": "Medicina de Batalha", en: "Battle Medicine", es: "Medicina de batalla" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia", "Cura"], actions: 1, prereq: "Treinado em Medicina", description: "[1 Ação] Restaura PV de um aliado adjacente usando Medicina em pleno combate.", source: { book: "Livro do Jogador (Player Core)", page: 247 }, ruleset: "remaster" },
  { id: "feat.skill.continual_recovery", name: "Recuperação Contínua (Continual Recovery)", names: { "pt-BR": "Recuperação Contínua", en: "Continual Recovery", es: "Recuperación continua" }, type: "Talento de Perícia", category: "Perícia", level: 2, traits: ["Geral", "Perícia"], prereq: "Especialista em Medicina", description: "Permite Tratar Ferimentos a cada 10 minutos em vez de 1 hora.", source: { book: "Livro do Jogador (Player Core)", page: 248 }, ruleset: "remaster" },
  { id: "feat.skill.ward_medic", name: "Tratamento de Emergência Múltiplo (Ward Medic)", names: { "pt-BR": "Tratamento de Emergência Múltiplo", en: "Ward Medic", es: "Médico de guardia" }, type: "Talento de Perícia", category: "Perícia", level: 2, traits: ["Geral", "Perícia"], prereq: "Especialista em Medicina", description: "Trata ferimentos de 2 ou mais criaturas ao mesmo tempo.", source: { book: "Livro do Jogador (Player Core)", page: 248 }, ruleset: "remaster" },
  { id: "feat.skill.bon_mot", name: "Palavra Mordaz (Bon Mot)", names: { "pt-BR": "Palavra Mordaz", en: "Bon Mot", es: "Palabra mordaz" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia", "Auditivo", "Mental"], actions: 1, prereq: "Treinado em Diplomacia", description: "[1 Ação] Diplomacia vs Vontade para impor -2 em Percepção e salvamentos de Vontade.", source: { book: "Livro do Jogador (Player Core)", page: 248 }, ruleset: "remaster" },
  { id: "feat.skill.intimidating_glare", name: "Olhar Intimidador (Intimidating Glare)", names: { "pt-BR": "Olhar Intimidador", en: "Intimidating Glare", es: "Mirada intimidatoria" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia", "Visual"], prereq: "Treinado em Intimidação", description: "Permite Desmoralizar sem falar e sem penalidade de idioma.", source: { book: "Livro do Jogador (Player Core)", page: 249 }, ruleset: "remaster" },
  { id: "feat.skill.battle_cry", name: "Grito de Batalha (Battle Cry)", names: { "pt-BR": "Grito de Batalha", en: "Battle Cry", es: "Grito de batalla" }, type: "Talento de Perícia", category: "Perícia", level: 7, traits: ["Geral", "Perícia"], prereq: "Mestre em Intimidação", description: "[Ação Livre] Usa Desmoralizar imediatamente ao rolar iniciativa.", source: { book: "Livro do Jogador (Player Core)", page: 249 }, ruleset: "remaster" },
  { id: "feat.skill.scare_to_death", name: "Assustar até a Morte (Scare to Death)", names: { "pt-BR": "Assustar até a Morte", en: "Scare to Death", es: "Matar del susto" }, type: "Talento de Perícia", category: "Perícia", level: 15, traits: ["Geral", "Perícia", "Morte", "Medo"], actions: 1, prereq: "Lendário em Intimidação", description: "[1 Ação] Intimidação letal que pode matar o alvo de medo em acerto crítico.", source: { book: "Livro do Jogador (Player Core)", page: 249 }, ruleset: "remaster" },
  { id: "feat.skill.cat_fall", name: "Queda Felina (Cat Fall)", names: { "pt-BR": "Queda Felina", en: "Cat Fall", es: "Caída de gato" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia"], prereq: "Treinado em Acrobacia", description: "Reduz ou anula totalmente dano sofrido por quedas.", source: { book: "Livro do Jogador (Player Core)", page: 249 }, ruleset: "remaster" },
  { id: "feat.skill.powerful_leap", name: "Salto Poderoso (Powerful Leap)", names: { "pt-BR": "Salto Poderoso", en: "Powerful Leap", es: "Salto poderoso" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia"], prereq: "Treinado em Atletismo", description: "Aumenta o alcance horizontal e vertical de todos os seus saltos.", source: { book: "Livro do Jogador (Player Core)", page: 250 }, ruleset: "remaster" },
  { id: "feat.skill.quick_jump", name: "Salto Rápido (Quick Jump)", names: { "pt-BR": "Salto Rápido", en: "Quick Jump", es: "Salto rápido" }, type: "Talento de Perícia", category: "Perícia", level: 1, traits: ["Geral", "Perícia"], actions: 1, prereq: "Treinado em Atletismo", description: "[1 Ação] Executa saltos longos e altos com 1 ação sem precisar de impulso prévio.", source: { book: "Livro do Jogador (Player Core)", page: 250 }, ruleset: "remaster" },
  { id: "feat.ancestry.natural_ambition", name: "Ambição Natural (Natural Ambition)", names: { "pt-BR": "Ambição Natural", en: "Natural Ambition", es: "Ambición natural" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Humano", level: 1, traits: ["Humano"], prereq: "Ancestralidade Humana", description: "Concede 1 talento de classe de nível 1 adicional.", source: { book: "Livro do Jogador (Player Core)", page: 44 }, ruleset: "remaster" },
  { id: "feat.ancestry.general_training", name: "Treinamento Versátil (General Training)", names: { "pt-BR": "Treinamento Versátil", en: "General Training", es: "Entrenamiento general" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Humano", level: 1, traits: ["Humano"], prereq: "Ancestralidade Humana", description: "Concede 1 talento geral de 1º nível à sua escolha.", source: { book: "Livro do Jogador (Player Core)", page: 44 }, ruleset: "remaster" },
  { id: "feat.ancestry.stonecunning", name: "Sabedoria das Rochas (Stonecunning)", names: { "pt-BR": "Sabedoria das Rochas", en: "Stonecunning", es: "Conocimiento de la piedra" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Anão", level: 1, traits: ["Anão"], prereq: "Ancestralidade Anã", description: "Bônus para detectar armadilhas e passagens secretas em pedra.", source: { book: "Livro do Jogador (Player Core)", page: 40 }, ruleset: "remaster" },
  { id: "feat.ancestry.nimble_elf", name: "Elfo Ágil (Nimble Elf)", names: { "pt-BR": "Elfo Ágil", en: "Nimble Elf", es: "Elfo ágil" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Elfo", level: 1, traits: ["Elfo"], prereq: "Ancestralidade Élfica", description: "+5 pés de deslocamento base em terra.", source: { book: "Livro do Jogador (Player Core)", page: 48 }, ruleset: "remaster" },
  { id: "feat.ancestry.burn_it", name: "Queime Tudo! (Burn It!)", names: { "pt-BR": "Queime Tudo!", en: "Burn It!", es: "¡A quemarlo!" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Goblin", level: 1, traits: ["Goblin"], prereq: "Ancestralidade Goblin", description: "Adiciona bônus de dano a magias, bombas e ataques de fogo.", source: { book: "Livro do Jogador (Player Core)", page: 56 }, ruleset: "remaster" },
  { id: "feat.ancestry.halfling_luck", name: "Sorte dos Halflings (Halfling Luck)", names: { "pt-BR": "Sorte dos Halflings", en: "Halfling Luck", es: "Suerte de los medianos" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Halfling", level: 1, traits: ["Halfling", "Fortuna"], actions: "free", prereq: "Ancestralidade Halfling", description: "[Ação Livre] Rerrola uma falha em teste ou salvaguarda 1x por dia.", source: { book: "Livro do Jogador (Player Core)", page: 60 }, ruleset: "remaster" },
  { id: "feat.ancestry.orc_ferocity", name: "Ferocidade Orc (Orc Ferocity)", names: { "pt-BR": "Ferocidade Orc", en: "Orc Ferocity", es: "Ferocidad orca" }, type: "Talento Ancestral", category: "Ancestralidade", ancestry: "Orc", level: 1, traits: ["Orc"], actions: "reaction", prereq: "Ancestralidade Orc", description: "[Reação] Evita cair inconsciente e sobrevive com 1 PV.", source: { book: "Livro do Jogador (Player Core)", page: 64 }, ruleset: "remaster" },
  { id: "feat.class.power_attack", name: "Golpe Furioso (Vicious Swing / Power Attack)", names: { "pt-BR": "Golpe Furioso", en: "Vicious Swing", es: "Golpe feroz" }, type: "Talento de Classe", category: "Classe", className: "Guerreiro (Fighter)", level: 1, traits: ["Guerreiro", "Flourish"], actions: 2, prereq: "Classe Guerreiro", description: "[2 Ações] Ataque com arma corpo a corpo que causa +1 dado de dano adicional.", source: { book: "Livro do Jogador (Player Core)", page: 142 }, ruleset: "remaster" },
  { id: "feat.class.sudden_charge", name: "Carga Repentina (Sudden Charge)", names: { "pt-BR": "Carga Repentina", en: "Sudden Charge", es: "Carga súbita" }, type: "Talento de Classe", category: "Classe", className: "Guerreiro (Fighter)", level: 1, traits: ["Guerreiro", "Flourish", "Aberto"], actions: 2, prereq: "Classe Guerreiro ou Bárbaro", description: "[2 Ações] Anda 2 vezes e desfere um ataque corpo a corpo no final.", source: { book: "Livro do Jogador (Player Core)", page: 142 }, ruleset: "remaster" },
  { id: "feat.class.dueling_parry", name: "Aparar em Duelo (Dueling Parry)", names: { "pt-BR": "Aparar em Duelo", en: "Dueling Parry", es: "Parada en duelo" }, type: "Talento de Classe", category: "Classe", className: "Guerreiro (Fighter)", level: 1, traits: ["Guerreiro"], actions: 1, prereq: "Empunhando 1 arma de 1 mão e outra mão livre", description: "[1 Ação] Concede +2 de CA de circunstância com a mão livre.", source: { book: "Livro do Jogador (Player Core)", page: 143 }, ruleset: "remaster" },
  { id: "feat.class.reactive_strike", name: "Golpe Reativo / Ataque de Oportunidade (Reactive Strike)", names: { "pt-BR": "Golpe Reativo", en: "Reactive Strike", es: "Golpe reactivo" }, type: "Talento de Classe", category: "Classe", className: "Guerreiro (Fighter)", level: 1, traits: ["Guerreiro"], actions: "reaction", prereq: "Classe Guerreiro", description: "[Reação] Ataca inimigos que se movimentam ou realizam ações no seu alcance.", source: { book: "Livro do Jogador (Player Core)", page: 141 }, ruleset: "remaster" },
  { id: "feat.class.nimble_dodge", name: "Esquiva Ágil (Nimble Dodge)", names: { "pt-BR": "Esquiva Ágil", en: "Nimble Dodge", es: "Esquiva ágil" }, type: "Talento de Classe", category: "Classe", className: "Ladino (Rogue)", level: 1, traits: ["Ladino"], actions: "reaction", prereq: "Classe Ladino ou Espadachim", description: "[Reação] Concede +2 de CA de circunstância contra um ataque recebido.", source: { book: "Livro do Jogador (Player Core)", page: 168 }, ruleset: "remaster" },
  { id: "feat.class.reach_spell", name: "Estender Magia (Reach Spell)", names: { "pt-BR": "Estender Magia", en: "Reach Spell", es: "Alargar conjuro" }, type: "Talento de Classe", category: "Classe", className: "Mago (Wizard)", level: 1, traits: ["Concentração", "Manipulação"], actions: 1, prereq: "Conjurador de Magias", description: "[1 Ação] Aumenta o alcance da próxima magia em +30 pés.", source: { book: "Livro do Jogador (Player Core)", page: 204 }, ruleset: "remaster" },
  { id: "feat.class.hunted_shot", name: "Tiro do Caçador (Hunted Shot)", names: { "pt-BR": "Tiro do Caçador", en: "Hunted Shot", es: "Disparo cazador" }, type: "Talento de Classe", category: "Classe", className: "Patrulheiro (Ranger)", level: 1, traits: ["Flourish", "Patrulheiro"], actions: 1, prereq: "Classe Patrulheiro", description: "[1 Ação] Dispara 2 flechas consecutivas contra sua Presa Caçada.", source: { book: "Livro do Jogador (Player Core)", page: 156 }, ruleset: "remaster" },
  { id: "feat.class.twin_takedown", name: "Derrubada Dupla (Twin Takedown)", names: { "pt-BR": "Derrubada Dupla", en: "Twin Takedown", es: "Derribo gemelo" }, type: "Talento de Classe", category: "Classe", className: "Patrulheiro (Ranger)", level: 1, traits: ["Flourish", "Patrulheiro"], actions: 1, prereq: "Empunhando duas armas corpo a corpo", description: "[1 Ação] Ataca com as duas armas corpo a corpo na mesma ação.", source: { book: "Livro do Jogador (Player Core)", page: 156 }, ruleset: "remaster" },
  { id: "feat.class.bleeding_finisher", name: "Finalizador Sangrento (Bleeding Finisher)", names: { "pt-BR": "Finalizador Sangrento", en: "Bleeding Finisher", es: "Remate sangriento" }, type: "Talento de Classe", category: "Classe", className: "Espadachim (Swashbuckler)", level: 2, traits: ["Espadachim", "Finalizador"], actions: 1, prereq: "Classe Espadachim", description: "[1 Ação Finalizadora] Causa dano de sangramento persistente contínuo.", source: { book: "Livro do Jogador 2 (Player Core 2)", page: 110 }, ruleset: "remaster" }
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PF2E_DATA;
}

