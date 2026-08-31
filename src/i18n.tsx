import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "pt-BR" | "en" | "es";

const LOCALE_KEY = "pathbuilder.locale";
const LOCALE_EVENT = "pathbuilder:locale-change";

const messages = {
  "pt-BR": {
    language: "Idioma", portuguese: "Português", english: "English", spanish: "Español", menu: "Menu",
    ancestry: "Ancestralidade", background: "Antecedente", characterClass: "Classe", heritage: "Herança", classFeat: "Talento de Classe",
    account: "Minha conta", signIn: "Entrar", admin: "Admin", cloud: "Pathbuilder Cloud",
    yourLibrary: "Sua biblioteca", yourAccount: "Sua conta", close: "Fechar",
    localMode: "Modo local ativo", localModeDescription: "Configure as variáveis Supabase para habilitar contas e fichas na nuvem.",
    accountAccess: "Acesso à conta", createAccount: "Criar conta", username: "Usuário", email: "E-mail", password: "Senha", confirmPassword: "Confirmar senha", passwordsDontMatch: "As senhas não coincidem.", rememberAccount: "Lembrar minha conta",
    wait: "Aguarde…", adventurer: "Aventureiro", administrator: "Administrador", saving: "Salvando…",
    saveCurrent: "Salvar ficha atual", newCharacter: "Novo personagem", refresh: "Atualizar", myCharacters: "Meus personagens",
    loadingSheets: "Carregando suas fichas…", noSheets: "Nenhuma ficha salva", noSheetsDescription: "Abra ou crie um personagem e salve uma cópia na sua conta.",
    level: "Nível", rulesReview: "Regras a revisar", profileSettings: "Configurações do perfil", updateUsername: "Atualizar usuário",
    currentPassword: "Senha atual", newPassword: "Nova senha", changePassword: "Modificar senha", deleteAccount: "Excluir minha conta", deleteAccountConfirm: "Excluir sua conta e todos os personagens? Esta ação não pode ser desfeita.", profileUpdated: "Perfil atualizado.", profileUpdateFailed: "Não foi possível atualizar o perfil.", passwordUpdated: "Senha atualizada.", passwordUpdateFailed: "Não foi possível atualizar a senha.", deleteAccountFailed: "Não foi possível excluir a conta.", signOut: "Sair desta conta",
    pickerCompendium: "Compêndio PF2e", searchOptions: "Buscar opções", search: "Buscar...", availableOptions: "Opções disponíveis", advancedFilters: "Filtros avançados",
    noOption: "Nenhuma opção encontrada", searchAnother: "Tente buscar por outro nome.", selectDetails: "Selecione um item para ver os detalhes.",
    accept: "Aceitar", cancel: "Cancelar", source: "Fonte", uncatalogued: "Ainda não catalogada", baseHp: "PV base",
    speed: "Velocidade", feet: "pés", hpPerLevel: "PV por nível", keyAbility: "Atributo-chave", damage: "Dano", traits: "Traços",
    select: "Selecionar", ancestries: "Ancestralidades", classes: "Classes", subclasses: "Subclasses", backgrounds: "Antecedentes", weapons: "Armas",
    armors: "Armaduras", shields: "Escudos", heritages: "Heranças", archetypes: "Arquétipos", spells: "Magias", rituals: "Rituais", feats: "Talentos", items: "Equipamentos", pets: "Mascotes & Companheiros", actions: "Ações", conditions: "Condições", buffs: "Benefícios", size: "Tamanho", configuration: "Configuração", landSpeed: "Deslocamento terrestre", swimSpeed: "Deslocamento de natação", climbSpeed: "Deslocamento de escalada",
    rank: "Ranque", traditions: "Tradições", castingTime: "Conjuração", primaryCheck: "Teste primário", spellCatalog: "Catálogo de Magias", addManualSpell: "Adicionar Magia Manualmente", addRitual: "Adicionar Ritual", knownSpells: "Magias Conhecidas", knownRituals: "Rituais Aprendidos",
    navLabel: "Navegação principal", navBuilder: "Construtor", navCompendium: "Compêndio", navRules: "Regras e fontes", navLibrary: "Biblioteca e perfil", navPrivacy: "Privacidade", navAdmin: "Curadoria", navCampaigns: "Campanhas do Mestre",
    campaignsTitle: "Campanhas e Mesas de RPG", campaignsIntro: "Organize suas aventuras, acompanhe as fichas dos seus jogadores em tempo real e gerencie iniciativa e sessões.", campaignsActive: "Campanhas ativas", connectedPlayerSheets: "Fichas de jogadores conectadas", gmEmailLabel: "Seu e-mail de Mestre", yourTables: "Suas mesas de RPG", newTable: "Nova mesa", noCampaigns: "Nenhuma campanha criada ainda.", createFirstCampaign: "Criar primeira campanha", linkMySheet: "Vincular minha ficha a um Mestre", playerModeDescription: "Você também é jogador em outra mesa? Indique o e-mail do seu Mestre:", selectCharacter: "Selecione seu personagem…", grantGmAccess: "Conceder acesso ao Mestre", accessAccount: "Acessar minha conta", loginCampaigns: "Faça login na sua conta", loginCampaignsDescription: "Para organizar campanhas, gerenciar mesas de RPG e acessar fichas enviadas por jogadores em tempo real, conecte-se à sua conta.",
    gmEmail: "E-mail do Mestre (Game Master)", linkGM: "Vincular Mestre", linkedGM: "Mestre Vinculado", unlinkGM: "Desvincular Mestre", flexibleSchedule: "Horário flexível", noAssignedCharacters: "Nenhum personagem foi atribuído a esta mesa ainda.", selectLinkedPlayers: "Selecione jogadores na lista abaixo de fichas vinculadas para adicioná-los.", availableSheetsTitle: "Adicionar fichas disponíveis a esta campanha", noLinkedSheets: "Nenhuma ficha vinculada ao seu e-mail.", monsterNpcPlaceholder: "Nome do monstro / NPC", closeForm: "Fechar formulário", newSession: "Registrar nova sessão", sessionTitlePlaceholder: "Título da sessão", sessionSummaryPlaceholder: "Resumo dos acontecimentos, decisões dos jogadores e segredos descobertos…", saveSessionLog: "Salvar registro da sessão", noSessions: "Nenhuma sessão registrada para esta aventura ainda.", manageRpgGroups: "Gerencie grupos de RPG, aventureiros e encontros em um só lugar.", campaignDescriptionPlaceholder: "Descreva o cenário, a premissa da campanha e os ganchos de aventura…", playerLabel: "Jogador", guestLabel: "Convidado", levelLabel: "Nível", speedLabel: "Velocidade", noCombat: "Nenhum combate em andamento. Role a iniciativa do grupo ou adicione monstros abaixo.", selectOrCreateCampaign: "Selecione ou crie uma campanha", campaignNamePlaceholder: "Nome da campanha", sessionSchedule: "Horário das sessões", sessionSchedulePlaceholder: "Ex.: Quintas-feiras às 19:30", systemEdition: "Sistema / Edição", playerInspect: "Jogador", noDeity: "Nenhuma especificada", noBackstory: "Sem histórico preenchido.", historyDeity: "Histórico e divindade",
    createCampaign: "Nova Campanha / Mesa", campaignName: "Nome da Campanha", campaignSchedule: "Dia / Horário", campaignDescription: "Sinopse da Aventura", deleteCampaign: "Excluir Mesa", campaignTableName: "Nome da Campanha / Mesa", adventureNotes: "Sinopse da Aventura & Notas Iniciais", createRpgTable: "Criar Mesa de RPG", removeFromCampaign: "Remover desta campanha", rollPartyInitiative: "Rolar Iniciativa do Grupo", combatant: "Combatente", type: "Tipo", monsterNpc: "Monstro/NPC", removeFromCombat: "Remover do combate", addToCombat: "Adicionar ao Combate", cancelAction: "Cancelar", treasureGranted: "Tesouro Concedido", treasureFoundPlaceholder: "Tesouros e itens encontrados (loot)",
    manageParty: "Aventureiros da Mesa", inspectSheet: "Inspecionar Ficha", sharedPlayerSheets: "Fichas de Jogadores Vinculadas",
    noSharedSheets: "Nenhuma ficha de jogador vinculada ao seu e-mail ainda.", noSharedSheetsDesc: "Peça aos seus jogadores para inserirem seu e-mail de mestre na aba Detalhes da ficha ou na Biblioteca.",
    initiativeTracker: "Rastreador de Iniciativa & Combate", sessionJournal: "Diário de Sessões & Anotações", addSession: "Registrar Nova Sessão", addCombatant: "Adicionar Combatente / NPC",
    compendiumTitle: "Compêndio de criação", compendiumIntro: "Consulte as opções disponíveis no construtor. Registros sem livro e página confirmados permanecem marcados para revisão.",
    allCategories: "Todas as categorias", results: "resultados", catalogReview: "Requer revisão", catalogVerified: "Fonte Remaster", catalogLegacy: "Fonte pré-Remaster", sourceSectionReference: "Referência de seção", translationPending: "Tradução pendente", rulesetRemaster: "Remaster", rulesetLegacy: "Pré-Remaster", rulesetReview: "A revisar", rarityCommon: "Comum", rarityUncommon: "Incomum", rarityRare: "Raro",
    rulesTitle: "Regras e fontes", rulesIntro: "Referência operacional para criar fichas consistentes e separar conteúdo Remaster, legado e personalizado.",
    validationTitle: "Validação da ficha", sourcesTitle: "Biblioteca de fontes", sourcesIntro: "Metadados locais verificados e referências de seção marcadas para revisão são exibidos; o portal não reproduz capítulos dos livros.",
    pages: "páginas", metadataVerified: "Metadados verificados", contentPending: "Conteúdo pendente de catalogação", localLanguage: "Idioma",
    pageCountVerified: "Total de páginas verificado", languageInferred: "Idioma inferido pelo nome do arquivo",
    linkedRecords: "registros vinculados",
    libraryPageTitle: "Biblioteca e perfil", libraryPageIntro: "Crie sua conta, salve personagens privados, altere usuário ou senha e gerencie suas fichas.", libraryAccessTitle: "Acesso à sua biblioteca", libraryAccessIntro: "Entre na sua conta para acessar e gerenciar apenas seus personagens, ou crie uma conta em segundos.", enter: "Entrar", createNewAccount: "Criar nova conta", usernameOrEmail: "Usuário ou e-mail", createMyAccount: "Criar minha conta", signInToAccount: "Entrar na minha conta", processing: "Processando…", testOnly: "Deseja apenas testar?", guestModeDescription: "Você pode acessar o construtor diretamente sem login no modo rápido.", createGuestSheet: "Criar ficha rápida (convidado)", connectedAs: "Conectado como", libraryManageCopy: "Gerencie seus personagens criados. Apenas você tem acesso às suas fichas nesta conta.", createNewCharacterCta: "Criar novo personagem", signOutAccount: "Sair da conta", myCharactersTitle: "Meus personagens", loadingCharacters: "Carregando seus personagens…", noCharactersTitle: "Você ainda não possui nenhum personagem nesta conta", noCharactersDescription: "Clique no botão abaixo para criar sua primeira ficha no construtor completo com regras Remaster e IA.", startFirstCharacter: "Começar primeiro personagem", human: "Humano", warrior: "Guerreiro", armorClassShort: "CA", hitPointsShort: "PV", updatedAt: "Atualizado", openBuilder: "Abrir no construtor", deleteSheet: "Excluir ficha", accountCreatedNotice: "Conta criada com sucesso! Verifique seu e-mail para confirmar.", welcomeNotice: "Conta criada com sucesso! Bem-vindo.", signedInNotice: "Conectado com sucesso!", authenticationFailed: "Falha na autenticação.", characterDeletedNotice: "Personagem excluído com sucesso.", deleteCharacterFailed: "Erro ao excluir o personagem.", deleteCharacterConfirm: "Excluir este personagem da sua conta?", saveCharacterFailed: "Não foi possível salvar a ficha.", loadAccountFailed: "Não foi possível carregar as fichas.",
    openAccount: "Abrir minha conta", privacyTitle: "Privacidade por padrão", privacyCopy: "As fichas na nuvem são protegidas por usuário; o modo local continua disponível sem cadastro.",
    privacyPageTitle: "Privacidade e dados", privacyPageIntro: "Entenda quais dados ficam no dispositivo, quais podem ir para o Supabase e como manter o controle da sua conta.",
    privacyLocalTitle: "Modo local", privacyLocalCopy: "Personagens locais e preferência de idioma permanecem no armazenamento deste navegador. Nenhuma conta é necessária.",
    privacyCloudTitle: "Conta e nuvem", privacyCloudCopy: "Ao habilitar o Supabase, e-mail, usuário e fichas salvas são associados ao identificador autenticado e protegidos por políticas por usuário.",
    privacyControlTitle: "Seus controles", privacyControlCopy: "No perfil, você pode alterar usuário e senha, excluir fichas individualmente, sair da conta ou solicitar a exclusão da conta e de seus personagens.",
    privacyBooksTitle: "Livros e compêndio", privacyBooksCopy: "Os PDFs locais não são enviados nem publicados pelo portal. O compêndio guarda apenas metadados, páginas de referência e resumos originais.",
    adminTitle: "Curadoria do compêndio", adminIntro: "Painel somente leitura para acompanhar cobertura das fontes e registros que ainda exigem validação.",
    adminRestricted: "Acesso administrativo necessário", adminRestrictedCopy: "Entre com uma conta cujo perfil tenha o papel admin para consultar esta página.",
    adminLocalCopy: "O Supabase ainda não está configurado neste ambiente; a identidade administrativa não pode ser verificada.",
    adminVerified: "Registros verificados", adminReview: "Fila de revisão", adminSources: "Fontes parciais", adminReadOnly: "Curadoria somente leitura", adminReadOnlyCopy: "Edição e publicação de regras só serão habilitadas após existir uma API administrativa com auditoria e políticas RLS específicas.",
    noCatalogResults: "Nenhum registro corresponde aos filtros.", filterCategory: "Filtrar categoria", catalogSearch: "Buscar no compêndio",
    formulas: "Fórmulas & Alquimia", allRulesets: "Todos os Conjuntos de Regras", allRarities: "Todas as Raridades", allBooks: "Todos os Livros / Fontes",
    inspectDetails: "Detalhes do Registro", filterRuleset: "Filtrar Regras", filterRarity: "Filtrar Raridade", filterBook: "Filtrar Livro / Fonte",
    bulk: "Carga (Bulk)", price: "Preço", prerequisites: "Pré-requisitos", actionsCount: "Ações necessárias", itemDetails: "Especificações & Efeitos",
    hidePlan: "Ocultar Plano", showPlan: "Mostrar Plano", characterName: "Nome do Personagem", ready: "Pronto", variantRules: "Variantes",
    armorClass: "CA", hitPoints: "PV", noShield: "Sem Escudo (+0)", shieldRaised: "Escudo Erguido (+2 CA)", raiseShield: "Erguer", lowerShield: "Abaixar",
    fortitude: "Fortitude", reflex: "Reflexos", will: "Vontade", heroPoints: "Pontos Heroicos:", classDc: "CD de Classe", perception: "Percepção", initiative: "Iniciativa",
    skillsTitle: "PERÍCIAS", normalVision: "Visão Normal", darkvision: "Visão no Escuro", lowLightVision: "Visão na Penumbra",
    rest8h: "💤 Descansar (8h)", shieldBlock: "🛡️ Bloqueio c/ Escudo", recoveryCheck: "🎲 Teste de Recuperação", addCondition: "➕ Adicionar Condição",
    endTurn: "⏱️ Fim do Turno", clearConditions: "✨ Limpar Condições", addBuff: "➕ Adicionar Buff", noActiveConditions: "Nenhuma condição ativa.",
    tabWeapons: "Armas", tabDefense: "Defesa", tabGear: "Equipamentos", tabSpells: "Magias", tabPets: "Mascotes", tabDetails: "Detalhes", tabFeats: "Talentos", tabActions: "Ações", tabFormulas: "Fórmulas & Alquimia",
    simpleWeapons: "Armas Simples", martialWeapons: "Armas Marciais", advancedWeapons: "Armas Avançadas", unarmedAttacks: "Ataques Desarmados",
    addWeapon: "➕ Adicionar Arma", printSheet: "🖨️ Imprimir Ficha", attackMap: "Ataque (MAP):", none: "Nenhum",
    noWeaponsEquipped: "Nenhuma arma equipada. Clique em 'Adicionar Arma' para escolher no compêndio!",
    totalBulk: "Carga Total:", starterKitOneClick: "🎒 Equipar Kit Inicial (1-Clique)", addItem: "➕ Adicionar Item",
    changeArmor: "🛡️ Trocar Armadura", toggleShield: "🛡️ Alternar Escudo",
    spellcaster: "✨ Conjurador", spellDc: "CD de Magia:", spellAttack: "Ataque Mágico:", focusPoints: "Pontos de Foco:", recoverAllSlots: "💤 Recuperar Todos os Slots",
    addPetBtn: "➕ Adicionar Companheiro / Familiar / Montaria", noPetsMsg: "Nenhum mascote ou companheiro animal associado.",
    aiAssistantFree: "✨ Assistente IA (Grátis)", viewPlanMobile: "Plano (Níveis)", viewStatsMobile: "Ficha & Perícias", viewContentMobile: "Ações & Abas",
  },
  en: {
    language: "Language", portuguese: "Português", english: "English", spanish: "Español", menu: "Menu",
    ancestry: "Ancestry", background: "Background", characterClass: "Class", heritage: "Heritage", classFeat: "Class Feat",
    account: "My account", signIn: "Sign in", admin: "Admin", cloud: "Pathbuilder Cloud",
    yourLibrary: "Your library", yourAccount: "Your account", close: "Close",
    localMode: "Local mode active", localModeDescription: "Configure the Supabase variables to enable accounts and cloud character sheets.",
    accountAccess: "Account access", createAccount: "Create account", username: "Username", email: "Email", password: "Password", confirmPassword: "Confirm password", passwordsDontMatch: "Passwords do not match.", rememberAccount: "Remember my account",
    wait: "Please wait…", adventurer: "Adventurer", administrator: "Administrator", saving: "Saving…",
    saveCurrent: "Save current sheet", newCharacter: "New character", refresh: "Refresh", myCharacters: "My characters",
    loadingSheets: "Loading your sheets…", noSheets: "No saved sheets", noSheetsDescription: "Open or create a character and save a copy to your account.",
    level: "Level", rulesReview: "Rules need review", profileSettings: "Profile settings", updateUsername: "Update username",
    currentPassword: "Current password", newPassword: "New password", changePassword: "Change password", deleteAccount: "Delete my account", deleteAccountConfirm: "Delete your account and all characters? This cannot be undone.", profileUpdated: "Profile updated.", profileUpdateFailed: "Could not update the profile.", passwordUpdated: "Password updated.", passwordUpdateFailed: "Could not update the password.", deleteAccountFailed: "Could not delete the account.", signOut: "Sign out",
    pickerCompendium: "PF2e Compendium", searchOptions: "Search options", search: "Search...", availableOptions: "Available options", advancedFilters: "Advanced filters",
    noOption: "No options found", searchAnother: "Try searching for another name.", selectDetails: "Select an item to view its details.",
    accept: "Accept", cancel: "Cancel", source: "Source", uncatalogued: "Not catalogued yet", baseHp: "Base HP",
    speed: "Speed", feet: "feet", hpPerLevel: "HP per level", keyAbility: "Key ability", damage: "Damage", traits: "Traits",
    select: "Select", ancestries: "Ancestries", classes: "Classes", subclasses: "Subclasses", backgrounds: "Backgrounds", weapons: "Weapons",
    armors: "Armor", shields: "Shields", heritages: "Heritages", archetypes: "Archetypes", spells: "Spells", rituals: "Rituals", feats: "Feats", items: "Gear & Items", pets: "Pets & Companions", actions: "Actions", conditions: "Conditions", buffs: "Benefits", size: "Size", configuration: "Configuration", landSpeed: "Land Speed", swimSpeed: "Swim Speed", climbSpeed: "Climb Speed",
    rank: "Rank", traditions: "Traditions", castingTime: "Casting", primaryCheck: "Primary check", spellCatalog: "Spell Catalog", addManualSpell: "Add Spell Manually", addRitual: "Add Ritual", knownSpells: "Known Spells", knownRituals: "Learned Rituals",
    navLabel: "Main navigation", navBuilder: "Builder", navCompendium: "Compendium", navRules: "Rules & sources", navLibrary: "Library & profile", navPrivacy: "Privacy", navAdmin: "Curation", navCampaigns: "GM Campaigns",
    campaignsTitle: "RPG Campaigns and Tables", campaignsIntro: "Organize your adventures, track your players' character sheets in real time, and manage initiative and sessions.", campaignsActive: "Active campaigns", connectedPlayerSheets: "Connected player sheets", gmEmailLabel: "Your GM email", yourTables: "Your RPG tables", newTable: "New table", noCampaigns: "No campaigns created yet.", createFirstCampaign: "Create first campaign", linkMySheet: "Link my sheet to a GM", playerModeDescription: "Are you also a player in another table? Enter your GM's email:", selectCharacter: "Select your character…", grantGmAccess: "Grant GM access", accessAccount: "Access my account", loginCampaigns: "Sign in to your account", loginCampaignsDescription: "To organize campaigns, manage RPG tables, and access player sheets in real time, sign in to your account.",
    gmEmail: "Game Master (GM) Email", linkGM: "Link GM", linkedGM: "Linked GM", unlinkGM: "Unlink GM", flexibleSchedule: "Flexible schedule", noAssignedCharacters: "No character has been assigned to this table yet.", selectLinkedPlayers: "Select players from the linked sheets below to add them.", availableSheetsTitle: "Add available sheets to this campaign", noLinkedSheets: "No sheet is linked to your email.", monsterNpcPlaceholder: "Monster / NPC name", closeForm: "Close form", newSession: "Log new session", sessionTitlePlaceholder: "Session title", sessionSummaryPlaceholder: "Summary of events, player decisions, and secrets discovered…", saveSessionLog: "Save session log", noSessions: "No session has been recorded for this adventure yet.", manageRpgGroups: "Manage RPG groups, adventurers, and encounters in one place.", campaignDescriptionPlaceholder: "Describe the setting, campaign premise, and adventure hooks…", playerLabel: "Player", guestLabel: "Guest", levelLabel: "Level", speedLabel: "Speed", noCombat: "No combat in progress. Roll group initiative or add monsters below.", selectOrCreateCampaign: "Select or create a campaign", campaignNamePlaceholder: "Campaign name", sessionSchedule: "Session schedule", sessionSchedulePlaceholder: "E.g. Thursdays at 7:30 PM", systemEdition: "System / Edition", playerInspect: "Player", noDeity: "None specified", noBackstory: "No backstory filled in.", historyDeity: "History & deity",
    createCampaign: "New Campaign / Table", campaignName: "Campaign Name", campaignSchedule: "Schedule", campaignDescription: "Adventure Synopsis", deleteCampaign: "Delete table", campaignTableName: "Campaign / Table name", adventureNotes: "Adventure synopsis & initial notes", createRpgTable: "Create RPG Table", removeFromCampaign: "Remove from this campaign", rollPartyInitiative: "Roll party initiative", combatant: "Combatant", type: "Type", monsterNpc: "Monster/NPC", removeFromCombat: "Remove from combat", addToCombat: "Add to combat", cancelAction: "Cancel", treasureGranted: "Treasure granted", treasureFoundPlaceholder: "Treasures and items found (loot)",
    manageParty: "Adventuring Party", inspectSheet: "Inspect Sheet", sharedPlayerSheets: "Linked Player Sheets",
    noSharedSheets: "No player sheets linked to your email yet.", noSharedSheetsDesc: "Ask your players to enter your GM email on their character sheet Details tab or Library.",
    initiativeTracker: "Initiative & Combat Tracker", sessionJournal: "Session Journal & Notes", addSession: "Log New Session", addCombatant: "Add Combatant / NPC",
    compendiumTitle: "Character creation compendium", compendiumIntro: "Browse the options available in the builder. Records without a confirmed book and page remain flagged for review.",
    allCategories: "All categories", results: "results", catalogReview: "Needs review", catalogVerified: "Remaster source", catalogLegacy: "Pre-Remaster source", sourceSectionReference: "Section reference", translationPending: "Translation pending", rulesetRemaster: "Remaster", rulesetLegacy: "Pre-Remaster", rulesetReview: "Needs review", rarityCommon: "Common", rarityUncommon: "Uncommon", rarityRare: "Rare",
    rulesTitle: "Rules & sources", rulesIntro: "Operational reference for consistent sheets and clear separation of Remaster, legacy, and custom content.",
    validationTitle: "Sheet validation", sourcesTitle: "Source library", sourcesIntro: "Verified local metadata and section references flagged for review are shown; the portal does not reproduce book chapters.",
    pages: "pages", metadataVerified: "Metadata verified", contentPending: "Content pending cataloguing", localLanguage: "Language",
    pageCountVerified: "Page count verified", languageInferred: "Language inferred from filename",
    linkedRecords: "linked records",
    libraryPageTitle: "Library & profile", libraryPageIntro: "Create an account, save private characters, change your username or password, and manage your sheets.", libraryAccessTitle: "Access your library", libraryAccessIntro: "Sign in to access and manage only your characters, or create an account in seconds.", enter: "Sign in", createNewAccount: "Create new account", usernameOrEmail: "Username or email", createMyAccount: "Create my account", signInToAccount: "Sign in to my account", processing: "Processing…", testOnly: "Just want to try it?", guestModeDescription: "You can open the builder directly without signing in using quick mode.", createGuestSheet: "Create quick sheet (guest)", connectedAs: "Signed in as", libraryManageCopy: "Manage your characters. Only you can access the sheets in this account.", createNewCharacterCta: "Create new character", signOutAccount: "Sign out", myCharactersTitle: "My characters", loadingCharacters: "Loading your characters…", noCharactersTitle: "You do not have any characters in this account yet", noCharactersDescription: "Click below to create your first sheet in the full Remaster and AI builder.", startFirstCharacter: "Start first character", human: "Human", warrior: "Warrior", armorClassShort: "AC", hitPointsShort: "HP", updatedAt: "Updated", openBuilder: "Open in builder", deleteSheet: "Delete sheet", accountCreatedNotice: "Account created! Check your email to confirm it.", welcomeNotice: "Account created! Welcome.", signedInNotice: "Signed in successfully!", authenticationFailed: "Authentication failed.", characterDeletedNotice: "Character deleted successfully.", deleteCharacterFailed: "Could not delete the character.", deleteCharacterConfirm: "Delete this character from your account?", saveCharacterFailed: "Could not save the sheet.", loadAccountFailed: "Could not load the sheets.",
    openAccount: "Open my account", privacyTitle: "Private by default", privacyCopy: "Cloud sheets are protected per user; local mode remains available without an account.",
    privacyPageTitle: "Privacy and data", privacyPageIntro: "Learn which data stays on your device, what may be stored in Supabase, and how to keep control of your account.",
    privacyLocalTitle: "Local mode", privacyLocalCopy: "Local characters and your language preference remain in this browser's storage. No account is required.",
    privacyCloudTitle: "Account and cloud", privacyCloudCopy: "When Supabase is enabled, email, username, and saved sheets are tied to the authenticated identifier and protected by per-user policies.",
    privacyControlTitle: "Your controls", privacyControlCopy: "From your profile, you can change username and password, delete individual sheets, sign out, or request deletion of the account and its characters.",
    privacyBooksTitle: "Books and compendium", privacyBooksCopy: "Local PDFs are neither uploaded nor published by the portal. The compendium stores only metadata, reference pages, and original summaries.",
    adminTitle: "Compendium curation", adminIntro: "Read-only dashboard for tracking source coverage and records that still require validation.",
    adminRestricted: "Administrator access required", adminRestrictedCopy: "Sign in with an account whose profile has the admin role to view this page.",
    adminLocalCopy: "Supabase is not configured in this environment, so administrative identity cannot be verified.",
    adminVerified: "Verified records", adminReview: "Review queue", adminSources: "Partial sources", adminReadOnly: "Read-only curation", adminReadOnlyCopy: "Rule editing and publishing will only be enabled after an audited admin API and dedicated RLS policies exist.",
    noCatalogResults: "No records match the filters.", filterCategory: "Filter category", catalogSearch: "Search the compendium",
    formulas: "Formulas & Crafting", allRulesets: "All Rulesets", allRarities: "All Rarities", allBooks: "All Books / Sources",
    inspectDetails: "Record Details", filterRuleset: "Filter Ruleset", filterRarity: "Filter Rarity", filterBook: "Filter Book / Source",
    bulk: "Bulk", price: "Price", prerequisites: "Prerequisites", actionsCount: "Required Actions", itemDetails: "Specifications & Effects",
    hidePlan: "Hide Plan", showPlan: "Show Plan", characterName: "Character Name", ready: "Ready", variantRules: "Variants",
    armorClass: "AC", hitPoints: "HP", noShield: "No Shield (+0)", shieldRaised: "Shield Raised (+2 AC)", raiseShield: "Raise", lowerShield: "Lower",
    fortitude: "Fortitude", reflex: "Reflex", will: "Will", heroPoints: "Hero Points:", classDc: "Class DC", perception: "Perception", initiative: "Initiative",
    skillsTitle: "SKILLS", normalVision: "Normal Vision", darkvision: "Darkvision", lowLightVision: "Low-Light Vision",
    rest8h: "💤 Rest (8h)", shieldBlock: "🛡️ Shield Block", recoveryCheck: "🎲 Recovery Check", addCondition: "➕ Add Condition",
    endTurn: "⏱️ End Turn", clearConditions: "✨ Clear Conditions", addBuff: "➕ Add Buff", noActiveConditions: "No active conditions.",
    tabWeapons: "Weapons", tabDefense: "Defense", tabGear: "Gear", tabSpells: "Spells", tabPets: "Pets", tabDetails: "Details", tabFeats: "Feats", tabActions: "Actions", tabFormulas: "Formulas & Alchemy",
    simpleWeapons: "Simple Weapons", martialWeapons: "Martial Weapons", advancedWeapons: "Advanced Weapons", unarmedAttacks: "Unarmed Attacks",
    addWeapon: "➕ Add Weapon", printSheet: "🖨️ Print Sheet", attackMap: "Attack (MAP):", none: "None",
    noWeaponsEquipped: "No weapon equipped. Click 'Add Weapon' to choose from the compendium!",
    totalBulk: "Total Bulk:", starterKitOneClick: "🎒 Equip Starter Kit (1-Click)", addItem: "➕ Add Item",
    changeArmor: "🛡️ Change Armor", toggleShield: "🛡️ Toggle Shield",
    spellcaster: "✨ Spellcaster", spellDc: "Spell DC:", spellAttack: "Spell Attack:", focusPoints: "Focus Points:", recoverAllSlots: "💤 Recover All Slots",
    addPetBtn: "➕ Add Companion / Familiar / Mount", noPetsMsg: "No companion or animal associate linked.",
    aiAssistantFree: "✨ AI Assistant (Free)", viewPlanMobile: "Plan (Levels)", viewStatsMobile: "Sheet & Skills", viewContentMobile: "Actions & Tabs",
  },
  es: {
    language: "Idioma", portuguese: "Português", english: "English", spanish: "Español", menu: "Menú",
    ancestry: "Ascendencia", background: "Trasfondo", characterClass: "Clase", heritage: "Herencia", classFeat: "Dote de clase",
    account: "Mi cuenta", signIn: "Ingresar", admin: "Admin", cloud: "Pathbuilder Cloud",
    yourLibrary: "Tu biblioteca", yourAccount: "Tu cuenta", close: "Cerrar",
    localMode: "Modo local activo", localModeDescription: "Configura las variables de Supabase para habilitar cuentas y fichas en la nube.",
    accountAccess: "Acceso a la cuenta", createAccount: "Crear cuenta", username: "Usuario", email: "Correo", password: "Contraseña", confirmPassword: "Confirmar contraseña", passwordsDontMatch: "Las contraseñas no coinciden.", rememberAccount: "Recordar mi cuenta",
    wait: "Espera…", adventurer: "Aventurero", administrator: "Administrador", saving: "Guardando…",
    saveCurrent: "Guardar ficha actual", newCharacter: "Nuevo personaje", refresh: "Actualizar", myCharacters: "Mis personajes",
    loadingSheets: "Cargando tus fichas…", noSheets: "No hay fichas guardadas", noSheetsDescription: "Abre o crea un personaje y guarda una copia en tu cuenta.",
    level: "Nivel", rulesReview: "Regras por revisar", profileSettings: "Configuración del perfil", updateUsername: "Actualizar usuario",
    currentPassword: "Contraseña actual", newPassword: "Nueva contraseña", changePassword: "Cambiar contraseña", deleteAccount: "Eliminar mi cuenta", deleteAccountConfirm: "¿Eliminar tu cuenta y todos los personajes? Esta acción no se puede deshacer.", profileUpdated: "Perfil actualizado.", profileUpdateFailed: "No se pudo actualizar el perfil.", passwordUpdated: "Contraseña actualizada.", passwordUpdateFailed: "No se pudo actualizar la contraseña.", deleteAccountFailed: "No se pudo eliminar la cuenta.", signOut: "Cerrar sesión",
    pickerCompendium: "Compendio PF2e", searchOptions: "Buscar opciones", search: "Buscar...", availableOptions: "Opciones disponibles", advancedFilters: "Filtros avanzados",
    noOption: "No se encontraron opciones", searchAnother: "Prueba buscar otro nombre.", selectDetails: "Selecciona un elemento para ver los detalles.",
    accept: "Aceptar", cancel: "Cancelar", source: "Fuente", uncatalogued: "No catalogada aún", baseHp: "PG base",
    speed: "Velocidad", feet: "pies", hpPerLevel: "PG por nivel", keyAbility: "Atributo clave", damage: "Daño", traits: "Rasgos",
    select: "Seleccionar", ancestries: "Ascendencias", classes: "Clases", subclasses: "Subclases", backgrounds: "Trasfondos", weapons: "Armas",
    armors: "Armaduras", shields: "Escudos", heritages: "Herencias", archetypes: "Arquetipos", spells: "Conjuros", rituals: "Rituales", feats: "Dotes", items: "Equipo y Objetos", pets: "Mascotas y Compañeros", actions: "Acciones", conditions: "Condiciones", buffs: "Beneficios", size: "Tamaño", configuration: "Configuración", landSpeed: "Velocidad terrestre", swimSpeed: "Velocidad de nado", climbSpeed: "Velocidad de escalada",
    rank: "Rango", traditions: "Tradiciones", castingTime: "Lanzamiento", primaryCheck: "Prueba primaria", spellCatalog: "Catálogo de Conjuros", addManualSpell: "Añadir Conjuro Manualmente", addRitual: "Añadir Ritual", knownSpells: "Conjuros Conocidos", knownRituals: "Rituales Aprendidos",
    navLabel: "Navegación principal", navBuilder: "Creador", navCompendium: "Compendio", navRules: "Reglas y fuentes", navLibrary: "Biblioteca y perfil", navPrivacy: "Privacidad", navAdmin: "Curaduría", navCampaigns: "Campañas del DJ",
    campaignsTitle: "Campañas y Mesas de Rol", campaignsIntro: "Organiza tus aventuras, sigue las fichas de tus jugadores en tiempo real y gestiona iniciativa y sesiones.", campaignsActive: "Campañas activas", connectedPlayerSheets: "Fichas de jugadores conectadas", gmEmailLabel: "Tu correo de DJ", yourTables: "Tus mesas de rol", newTable: "Nueva mesa", noCampaigns: "Aún no hay campañas creadas.", createFirstCampaign: "Crear primera campaña", linkMySheet: "Vincular mi ficha a un DJ", playerModeDescription: "¿También eres jugador en otra mesa? Indica el correo de tu DJ:", selectCharacter: "Selecciona tu personaje…", grantGmAccess: "Conceder acceso al DJ", accessAccount: "Acceder a mi cuenta", loginCampaigns: "Inicia sesión en tu cuenta", loginCampaignsDescription: "Para organizar campañas, gestionar mesas de rol y acceder a fichas de jugadores en tiempo real, inicia sesión.",
    gmEmail: "Correo del Director de Juego (DJ)", linkGM: "Vincular DJ", linkedGM: "DJ Vinculado", unlinkGM: "Desvincular DJ", flexibleSchedule: "Horario flexible", noAssignedCharacters: "Aún no se ha asignado ningún personaje a esta mesa.", selectLinkedPlayers: "Selecciona jugadores de las fichas vinculadas para añadirlos.", availableSheetsTitle: "Añadir fichas disponibles a esta campaña", noLinkedSheets: "No hay ninguna ficha vinculada a tu correo.", monsterNpcPlaceholder: "Nombre del monstruo / PNJ", closeForm: "Cerrar formulario", newSession: "Registrar nueva sesión", sessionTitlePlaceholder: "Título de la sesión", sessionSummaryPlaceholder: "Resumen de acontecimientos, decisiones de los jugadores y secretos descubiertos…", saveSessionLog: "Guardar registro de sesión", noSessions: "Aún no se ha registrado ninguna sesión para esta aventura.", manageRpgGroups: "Gestiona grupos de rol, aventureros y encuentros en un solo lugar.", campaignDescriptionPlaceholder: "Describe el escenario, la premisa de la campaña y los ganchos de aventura…", playerLabel: "Jugador", guestLabel: "Invitado", levelLabel: "Nivel", speedLabel: "Velocidad", noCombat: "No hay combate en curso. Tira la iniciativa del grupo o añade monstruos abajo.", selectOrCreateCampaign: "Selecciona o crea una campaña", campaignNamePlaceholder: "Nombre de la campaña", sessionSchedule: "Horario de las sesiones", sessionSchedulePlaceholder: "Ej.: Jueves a las 19:30", systemEdition: "Sistema / Edición", playerInspect: "Jugador", noDeity: "Ninguna especificada", noBackstory: "Sin historial rellenado.", historyDeity: "Historial y divinidad",
    createCampaign: "Nueva Campaña / Mesa", campaignName: "Nombre de la Campaña", campaignSchedule: "Horario", campaignDescription: "Sinopsis de la Aventura", deleteCampaign: "Eliminar mesa", campaignTableName: "Nombre de la campaña / mesa", adventureNotes: "Sinopsis de la aventura y notas iniciales", createRpgTable: "Crear mesa de rol", removeFromCampaign: "Quitar de esta campaña", rollPartyInitiative: "Tirar iniciativa del grupo", combatant: "Combatiente", type: "Tipo", monsterNpc: "Monstruo/PNJ", removeFromCombat: "Quitar del combate", addToCombat: "Añadir al combate", cancelAction: "Cancelar", treasureGranted: "Tesoro concedido", treasureFoundPlaceholder: "Tesoros y objetos encontrados (botín)",
    manageParty: "Grupo de Aventureros", inspectSheet: "Inspeccionar Ficha", sharedPlayerSheets: "Fichas de Jugadores Vinculadas",
    noSharedSheets: "Aún no hay fichas de jugadores vinculadas a tu correo.", noSharedSheetsDesc: "Pide a tus jugadores que introduzcan tu correo de DJ en la pestaña Detalles de su ficha o en la Biblioteca.",
    initiativeTracker: "Rastreador de Iniciativa y Combate", sessionJournal: "Diario de Sesiones y Pistas", addSession: "Registrar Nueva Sesión", addCombatant: "Añadir Combatiente / PNJ",
    compendiumTitle: "Compendio de creación", compendiumIntro: "Consulta las opciones disponibles en el creador. Los registros sin libro y página confirmados permanecen marcados para revisión.",
    allCategories: "Todas las categorías", results: "resultados", catalogReview: "Requiere revisión", catalogVerified: "Fuente Remaster", catalogLegacy: "Fuente pre-Remaster", sourceSectionReference: "Referencia de sección", translationPending: "Traducción pendiente", rulesetRemaster: "Remaster", rulesetLegacy: "Pre-Remaster", rulesetReview: "Por revisar", rarityCommon: "Común", rarityUncommon: "Poco común", rarityRare: "Raro",
    rulesTitle: "Reglas y fuentes", rulesIntro: "Referencia operativa para crear fichas consistentes y separar contenido Remaster, legado y personalizado.",
    validationTitle: "Validación de la ficha", sourcesTitle: "Biblioteca de fuentes", sourcesIntro: "Se muestran metadatos locales verificados y referencias de sección marcadas para revisión; el portal no reproduce capítulos de los libros.",
    pages: "páginas", metadataVerified: "Metadatos verificados", contentPending: "Contenido pendiente de catalogación", localLanguage: "Idioma",
    pageCountVerified: "Total de páginas verificado", languageInferred: "Idioma inferido por el nombre del archivo",
    linkedRecords: "registros vinculados",
    libraryPageTitle: "Biblioteca y perfil", libraryPageIntro: "Crea tu cuenta, guarda personajes privados, cambia tu usuario o contraseña y administra tus fichas.", libraryAccessTitle: "Acceso a tu biblioteca", libraryAccessIntro: "Inicia sesión para acceder y administrar solo tus personajes, o crea una cuenta en segundos.", enter: "Ingresar", createNewAccount: "Crear nueva cuenta", usernameOrEmail: "Usuario o correo", createMyAccount: "Crear mi cuenta", signInToAccount: "Ingresar a mi cuenta", processing: "Procesando…", testOnly: "¿Solo quieres probar?", guestModeDescription: "Puedes abrir el creador directamente sin iniciar sesión en modo rápido.", createGuestSheet: "Crear ficha rápida (invitado)", connectedAs: "Sesión iniciada como", libraryManageCopy: "Administra tus personajes. Solo tú puedes acceder a las fichas de esta cuenta.", createNewCharacterCta: "Crear nuevo personaje", signOutAccount: "Cerrar sesión", myCharactersTitle: "Mis personajes", loadingCharacters: "Cargando tus personajes…", noCharactersTitle: "Aún no tienes personajes en esta cuenta", noCharactersDescription: "Haz clic abajo para crear tu primera ficha en el creador completo con reglas Remaster e IA.", startFirstCharacter: "Comenzar primer personaje", human: "Humano", warrior: "Guerrero", armorClassShort: "CA", hitPointsShort: "PG", updatedAt: "Actualizado", openBuilder: "Abrir en el creador", deleteSheet: "Eliminar ficha", accountCreatedNotice: "¡Cuenta creada! Revisa tu correo para confirmarla.", welcomeNotice: "¡Cuenta creada! Bienvenido.", signedInNotice: "Sesión iniciada correctamente.", authenticationFailed: "Falló la autenticación.", characterDeletedNotice: "Personaje eliminado correctamente.", deleteCharacterFailed: "No se pudo eliminar el personaje.", deleteCharacterConfirm: "¿Eliminar este personaje de tu cuenta?", saveCharacterFailed: "No se pudo guardar la ficha.", loadAccountFailed: "No se pudieron cargar las fichas.",
    openAccount: "Abrir mi cuenta", privacyTitle: "Privacidad por defecto", privacyCopy: "Las fichas en la nube están protegidas por usuario; el modo local sigue disponible sin registro.",
    privacyPageTitle: "Privacidad y datos", privacyPageIntro: "Descubre qué datos quedan en tu dispositivo, cuáles pueden guardarse en Supabase y cómo mantener el control de tu cuenta.",
    privacyLocalTitle: "Modo local", privacyLocalCopy: "Los personajes locales y tu idioma permanecen en el almacenamiento de este navegador. No se necesita una cuenta.",
    privacyCloudTitle: "Cuenta y nube", privacyCloudCopy: "Al habilitar Supabase, el correo, el usuario y las fichas guardadas se asocian al identificador autenticado y se protegen con políticas por usuario.",
    privacyControlTitle: "Tus controles", privacyControlCopy: "Desde el perfil puedes cambiar usuario y contraseña, eliminar fichas, cerrar sesión o solicitar la eliminación de la cuenta y sus personajes.",
    privacyBooksTitle: "Libros y compendio", privacyBooksCopy: "Los PDF locales no son enviados ni publicados por el portal. El compendio guarda solo metadatos, páginas de referencia y resúmenes originales.",
    adminTitle: "Curaduría del compendio", adminIntro: "Panel de solo lectura para acompañar la cobertura de fuentes y los registros que aún requieren validación.",
    adminRestricted: "Se requiere acceso administrativo", adminRestrictedCopy: "Inicia sesión con una cuenta cuyo perfil tenga el rol admin para consultar esta página.",
    adminLocalCopy: "Supabase no está configurado en este entorno; no se puede verificar la identidad administrativa.",
    adminVerified: "Registros verificados", adminReview: "Cola de revisión", adminSources: "Fuentes parciales", adminReadOnly: "Curaduría de solo lectura", adminReadOnlyCopy: "La edición y publicación de reglas solo se habilitará cuando exista una API administrativa auditada y políticas RLS específicas.",
    noCatalogResults: "Ningún registro coincide con los filtros.", filterCategory: "Filtrar categoría", catalogSearch: "Buscar en el compendio",
    formulas: "Fórmulas y Artesanía", allRulesets: "Todos los Conjuntos de Regras", allRarities: "Todas las Raridades", allBooks: "Todos los Libros / Fuentes",
    inspectDetails: "Detalles del Registro", filterRuleset: "Filtrar Reglas", filterRarity: "Filtrar Raridad", filterBook: "Filtrar Libro / Fuente",
    bulk: "Volumen (Bulk)", price: "Precio", prerequisites: "Requisitos previos", actionsCount: "Acciones necesarias", itemDetails: "Especificaciones y Efectos",
    hidePlan: "Ocultar Plan", showPlan: "Mostrar Plan", characterName: "Nombre del Personaje", ready: "Listo", variantRules: "Variantes",
    armorClass: "CA", hitPoints: "PG", noShield: "Sin Escudo (+0)", shieldRaised: "Escudo Levantado (+2 CA)", raiseShield: "Alzar", lowerShield: "Bajar",
    fortitude: "Fortaleza", reflex: "Reflejos", will: "Voluntad", heroPoints: "Puntos Heroicos:", classDc: "CD de Clase", perception: "Percepción", initiative: "Iniciativa",
    skillsTitle: "HABILIDADES", normalVision: "Visión Normal", darkvision: "Visión en la Oscuridad", lowLightVision: "Visión en la Penumbra",
    rest8h: "💤 Descansar (8h)", shieldBlock: "🛡️ Bloqueo con Escudo", recoveryCheck: "🎲 Prueba de Recuperación", addCondition: "➕ Añadir Condición",
    endTurn: "⏱️ Fin del Turno", clearConditions: "✨ Limpiar Condiciones", addBuff: "➕ Añadir Buff", noActiveConditions: "Ninguna condición activa.",
    tabWeapons: "Armas", tabDefense: "Defensa", tabGear: "Equipo", tabSpells: "Conjuros", tabPets: "Mascotas", tabDetails: "Detalles", tabFeats: "Dotes", tabActions: "Acciones", tabFormulas: "Fórmulas y Alquimia",
    simpleWeapons: "Armas Simples", martialWeapons: "Armas Marciales", advancedWeapons: "Armas Avanzadas", unarmedAttacks: "Ataques Desarmados",
    addWeapon: "➕ Añadir Arma", printSheet: "🖨️ Imprimir Ficha", attackMap: "Ataque (MAP):", none: "Ninguno",
    noWeaponsEquipped: "¡Ninguna arma equipada. Haz clic en 'Añadir Arma' para elegir en el compendio!",
    totalBulk: "Volumen Total:", starterKitOneClick: "🎒 Equipar Kit Inicial (1-Clic)", addItem: "➕ Añadir Objeto",
    changeArmor: "🛡️ Cambiar Armadura", toggleShield: "🛡️ Alternar Escudo",
    spellcaster: "✨ Conjurador", spellDc: "CD de Conjuro:", spellAttack: "Ataque de Conjuro:", focusPoints: "Puntos de Foco:", recoverAllSlots: "💤 Recuperar Todos los Espacios",
    addPetBtn: "➕ Añadir Compañero / Familiar / Montura", noPetsMsg: "Ningún compañero o mascota asociada.",
    aiAssistantFree: "✨ Asistente IA (Gratis)", viewPlanMobile: "Plan (Niveles)", viewStatsMobile: "Ficha y Habilidades", viewContentMobile: "Acciones y Pestañas",
  },
} as const;

export type MessageKey = keyof typeof messages["pt-BR"];

const legacy: Record<string, MessageKey> = {
  "Menu": "menu", "Novo Personagem": "newCharacter", "Ancestralidade": "ancestry", "Antecedente": "background",
  "Classe": "characterClass", "Herança": "heritage", "Talento de Classe": "classFeat", "Nível": "level", "Armas": "weapons",
  "Armaduras": "armors", "Condições": "conditions", "Salvar ficha atual": "saveCurrent", "Configurações do perfil": "profileSettings",
  "Aceitar": "accept", "Cancelar": "cancel", "Buscar...": "search", "Compêndio PF2e": "pickerCompendium",
  "Catálogo de Magias": "spellCatalog", "Adicionar Magia Manualmente": "addManualSpell", "Adicionar Ritual": "addRitual",
  "Magias Conhecidas": "knownSpells", "Rituais Aprendidos": "knownRituals",
};

export function getStoredLocale(): Locale {
  const value = typeof window !== "undefined" ? window.localStorage?.getItem(LOCALE_KEY) : null;
  return value === "en" || value === "es" || value === "pt-BR" ? value : "pt-BR";
}

export function translate(locale: Locale, key: MessageKey): string {
  return messages[locale][key] ?? messages["pt-BR"][key];
}

export function applyLegacyTranslations(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.title = locale === "pt-BR"
    ? "Pathbuilder 2e Local — Construtor de Personagens PF2e"
    : locale === "en"
      ? "Pathbuilder 2e Local — PF2e Character Builder"
      : "Pathbuilder 2e Local — Creador de Personajes PF2e";
}

interface I18nValue { locale: Locale; setLocale: (locale: Locale) => void; t: (key: MessageKey) => string }
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);
  const setLocale = useCallback((next: Locale) => {
    window.localStorage?.setItem(LOCALE_KEY, next);
    setLocaleState(next);
    window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: next }));
  }, []);
  useEffect(() => {
    applyLegacyTranslations(locale);
    const sync = (event: Event) => setLocaleState((event as CustomEvent<Locale>).detail);
    window.addEventListener(LOCALE_EVENT, sync);
    return () => window.removeEventListener(LOCALE_EVENT, sync);
  }, [locale]);
  const value = useMemo<I18nValue>(() => ({ locale, setLocale, t: (key) => translate(locale, key) }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export const CLASS_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Alquimista": { "pt-BR": "Alquimista", en: "Alchemist", es: "Alquimista" },
  "Animista": { "pt-BR": "Animista", en: "Animist", es: "Animista" },
  "Bárbaro": { "pt-BR": "Bárbaro", en: "Barbarian", es: "Bárbaro" },
  "Bardo": { "pt-BR": "Bardo", en: "Bard", es: "Bardo" },
  "Bruxo": { "pt-BR": "Bruxo", en: "Witch", es: "Brujo" },
  "Campeão": { "pt-BR": "Campeão", en: "Champion", es: "Campeón" },
  "Cineticista": { "pt-BR": "Cineticista", en: "Kineticist", es: "Cinético" },
  "Clérigo": { "pt-BR": "Clérigo", en: "Cleric", es: "Clérigo" },
  "Comandante": { "pt-BR": "Comandante", en: "Commander", es: "Comandante" },
  "Convocador": { "pt-BR": "Convocador", en: "Summoner", es: "Convocador" },
  "Druida": { "pt-BR": "Druida", en: "Druid", es: "Druida" },
  "Espadachim": { "pt-BR": "Espadachim", en: "Swashbuckler", es: "Espadachín" },
  "Exemplar": { "pt-BR": "Exemplar", en: "Exemplar", es: "Ejemplar" },
  "Feiticeiro": { "pt-BR": "Feiticeiro", en: "Sorcerer", es: "Hechicero" },
  "Guardião": { "pt-BR": "Guardião", en: "Guardian", es: "Guardián" },
  "Guerreiro": { "pt-BR": "Guerreiro", en: "Fighter", es: "Guerrero" },
  "Inventor": { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" },
  "Investigador": { "pt-BR": "Investigador", en: "Investigator", es: "Investigador" },
  "Ladino": { "pt-BR": "Ladino", en: "Rogue", es: "Pícaro" },
  "Mago": { "pt-BR": "Mago", en: "Wizard", es: "Mago" },
  "Magus": { "pt-BR": "Magus", en: "Magus", es: "Magus" },
  "Monge": { "pt-BR": "Monge", en: "Monk", es: "Monje" },
  "Oráculo": { "pt-BR": "Oráculo", en: "Oracle", es: "Oráculo" },
  "Pistoleiro": { "pt-BR": "Pistoleiro", en: "Gunslinger", es: "Pistolero" },
  "Psíquico": { "pt-BR": "Psíquico", en: "Psychic", es: "Psíquico" },
  "Ranger": { "pt-BR": "Ranger", en: "Ranger", es: "Ranger" },
  "Taumaturgo": { "pt-BR": "Taumaturgo", en: "Thaumaturge", es: "Taumaturgo" },
};

export const ANCESTRY_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Humano": { "pt-BR": "Humano", en: "Human", es: "Humano" },
  "Anão": { "pt-BR": "Anão", en: "Dwarf", es: "Enano" },
  "Elfo": { "pt-BR": "Elfo", en: "Elf", es: "Elfo" },
  "Gnomo": { "pt-BR": "Gnomo", en: "Gnome", es: "Gnomo" },
  "Goblin": { "pt-BR": "Goblin", en: "Goblin", es: "Goblin" },
  "Halfling": { "pt-BR": "Halfling", en: "Halfling", es: "Mediano" },
  "Leshy": { "pt-BR": "Leshy", en: "Leshy", es: "Leshy" },
  "Orc": { "pt-BR": "Orc", en: "Orc", es: "Orco" },
  "Amurrun (Catfolk)": { "pt-BR": "Amurrun (Povo-Gato)", en: "Catfolk", es: "Hombre-gato" },
  "Ysoki (Ratfolk)": { "pt-BR": "Ysoki (Povo-Rato)", en: "Ratfolk", es: "Hombre-rata" },
  "Kobold": { "pt-BR": "Kobold", en: "Kobold", es: "Kóbold" },
  "Iruxi (Lizardfolk)": { "pt-BR": "Iruxi (Povo-Lagarto)", en: "Lizardfolk", es: "Hombre-lagarto" },
  "Tripkee (Grippli)": { "pt-BR": "Tripkee (Povo-Rã)", en: "Tripkee", es: "Tripkee" },
  "Tengu": { "pt-BR": "Tengu", en: "Tengu", es: "Tengu" },
  "Kholo (Gnoll)": { "pt-BR": "Kholo (Gnoll)", en: "Kholo", es: "Kholo" },
  "Centauro (Centaur)": { "pt-BR": "Centauro", en: "Centaur", es: "Centauro" },
  "Minotauro (Minotaur)": { "pt-BR": "Minotauro", en: "Minotaur", es: "Minotauro" },
  "Animal Desperto (Awakened Animal)": { "pt-BR": "Animal Desperto", en: "Awakened Animal", es: "Animal Despierto" },
  "Tritão / Sereia (Merfolk)": { "pt-BR": "Tritão / Sereia", en: "Merfolk", es: "Tritón / Sirena" },
  "Athamaru (Povo-Peixe)": { "pt-BR": "Athamaru", en: "Athamaru", es: "Athamaru" },
  "Surki (Povo-Inseto)": { "pt-BR": "Surki", en: "Surki", es: "Surki" },
  "Autômato (Automaton)": { "pt-BR": "Autômato", en: "Automaton", es: "Autómata" },
  "Esqueleto (Skeleton)": { "pt-BR": "Esqueleto", en: "Skeleton", es: "Esqueleto" },
  "Jotunnato (Jotunborn)": { "pt-BR": "Jotunnato", en: "Jotunborn", es: "Jotunborn" },
};

export const BACKGROUND_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Guarda da Cidade": { "pt-BR": "Guarda da Cidade", en: "Guard", es: "Guardia de la Ciudad" },
  "Guarda da Cidade (Guard)": { "pt-BR": "Guarda da Cidade", en: "Guard", es: "Guardia de la Ciudad" },
  "Acróbata (Acrobat)": { "pt-BR": "Acróbata", en: "Acrobat", es: "Acróbata" },
  "Artesão (Artisan)": { "pt-BR": "Artesão", en: "Artisan", es: "Artesano" },
  "Artista (Artist)": { "pt-BR": "Artista", en: "Artist", es: "Artista" },
  "Batedor Selvagem (Wilderness Scout)": { "pt-BR": "Batedor Selvagem", en: "Scout", es: "Explorador" },
  "Caçador (Hunter)": { "pt-BR": "Caçador", en: "Hunter", es: "Cazador" },
  "Charlatão (Charlatan)": { "pt-BR": "Charlatão", en: "Charlatan", es: "Charlatán" },
  "Cozinheiro (Cook)": { "pt-BR": "Cozinheiro", en: "Cook", es: "Cocinero" },
  "Criminoso (Criminal)": { "pt-BR": "Criminoso", en: "Criminal", es: "Criminal" },
  "Curandeiro de Campo (Field Medic)": { "pt-BR": "Curandeiro de Campo", en: "Field Medic", es: "Médico de Campaña" },
  "Detetive (Detective)": { "pt-BR": "Detetive", en: "Detective", es: "Detective" },
  "Duelista de Oppara (Dueling Noble)": { "pt-BR": "Duelista de Oppara", en: "Dueling Noble", es: "Noble Duelista" },
  "Emissário (Emissary)": { "pt-BR": "Emissário", en: "Emissary", es: "Emisario" },
  "Eremita (Hermit)": { "pt-BR": "Eremita", en: "Hermit", es: "Ermitaño" },
  "Escudeiro (Squire)": { "pt-BR": "Escudeiro", en: "Squire", es: "Escudero" },
  "Estudante da Academia (Scholar)": { "pt-BR": "Estudante da Academia", en: "Scholar", es: "Erudito" },
  "Gladiador (Gladiator)": { "pt-BR": "Gladiador", en: "Gladiator", es: "Gladiador" },
  "Herdeiro Nobre (Noble)": { "pt-BR": "Herdeiro Nobre", en: "Noble", es: "Noble" },
  "Marinheiro (Sailor)": { "pt-BR": "Marinheiro", en: "Sailor", es: "Marinero" },
  "Mercador (Merchant)": { "pt-BR": "Mercador", en: "Merchant", es: "Comerciante" },
  "Mineiro (Miner)": { "pt-BR": "Mineiro", en: "Miner", es: "Minero" },
  "Nômade (Nomad)": { "pt-BR": "Nômade", en: "Nomad", es: "Nómada" },
  "Prisioneiro (Prisoner)": { "pt-BR": "Prisioneiro", en: "Prisoner", es: "Prisionero" },
  "Trabalhador Braçal (Laborer)": { "pt-BR": "Trabalhador Braçal", en: "Laborer", es: "Obrero" },
  "Taverneiro (Barkeeper)": { "pt-BR": "Taverneiro", en: "Barkeeper", es: "Tabernero" }
};

export const SKILL_TRANSLATIONS: Record<string, Record<Locale, string>> = {
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
  performance: { "pt-BR": "Performance", en: "Performance", es: "Interpretación" },
  religion: { "pt-BR": "Religião", en: "Religion", es: "Religión" },
  society: { "pt-BR": "Sociedade", en: "Society", es: "Sociedad" },
  stealth: { "pt-BR": "Furtividade", en: "Stealth", es: "Sigilo" },
  survival: { "pt-BR": "Sobrevivência", en: "Survival", es: "Supervivencia" },
  thievery: { "pt-BR": "Ladinagem", en: "Thievery", es: "Latrocinio" }
};

export const SIZE_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Miúdo": { "pt-BR": "Miúdo", en: "Tiny", es: "Diminuto" },
  "Pequeno": { "pt-BR": "Pequeno", en: "Small", es: "Pequeño" },
  "Médio": { "pt-BR": "Médio", en: "Medium", es: "Mediano" },
  "Grande": { "pt-BR": "Grande", en: "Large", es: "Grande" },
  "Enorme": { "pt-BR": "Enorme", en: "Huge", es: "Enorme" },
  "Imenso": { "pt-BR": "Imenso", en: "Gargantuan", es: "Gargantuesco" }
};

export const SENSE_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  "Visão Normal": { "pt-BR": "Visão Normal", en: "Normal Vision", es: "Visión Normal" },
  "Visão no Escuro": { "pt-BR": "Visão no Escuro", en: "Darkvision", es: "Visión en la Oscuridad" },
  "Visão na Penumbra": { "pt-BR": "Visão na Penumbra", en: "Low-Light Vision", es: "Visión en la Penumbra" },
  "Visão Maior no Escuro": { "pt-BR": "Visão Maior no Escuro", en: "Greater Darkvision", es: "Visión en la Oscuridad Mayor" }
};

export function getItemDisplayName(item: { name?: string; data?: any } | undefined | null, locale: Locale = "pt-BR"): string {
  if (!item) return "";
  if (item.data?.names?.[locale]) return item.data.names[locale];

  const rawName = item.name || item.data?.name || "";
  if (!rawName) return "";

  for (const [key, mapping] of Object.entries(CLASS_TRANSLATIONS)) {
    if (rawName.startsWith(key) || rawName.includes(key)) {
      return mapping[locale] ?? rawName;
    }
  }
  for (const [key, mapping] of Object.entries(ANCESTRY_TRANSLATIONS)) {
    if (rawName.startsWith(key) || rawName === key) {
      return mapping[locale] ?? rawName;
    }
  }
  for (const [key, mapping] of Object.entries(BACKGROUND_TRANSLATIONS)) {
    if (rawName.startsWith(key) || rawName === key) {
      return mapping[locale] ?? rawName;
    }
  }

  const match = rawName.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (match) {
    const ptPart = match[1].trim();
    const enParts = match[2].split("/").map((s: string) => s.trim());
    if (locale === "en") return enParts[0] || ptPart;
    if (locale === "pt-BR") return ptPart;
    if (locale === "es") return item.data?.names?.["es"] || ptPart;
  }

  return rawName;
}

function BrazilFlag() {
  return (
    <svg viewBox="0 0 32 22" className="flag-svg" aria-hidden="true">
      <rect width="32" height="22" fill="#009b3a" rx="2" />
      <polygon points="16,2.5 30,11 16,19.5 2,11" fill="#fedf00" />
      <circle cx="16" cy="11" r="5.2" fill="#002776" />
      <path d="M11.2,11.8 C13.5,9.2 18.5,9.2 20.8,11.8" fill="none" stroke="#ffffff" strokeWidth="0.9" />
    </svg>
  );
}

function USAFlag() {
  return (
    <svg viewBox="0 0 32 22" className="flag-svg" aria-hidden="true">
      <rect width="32" height="22" fill="#b22234" rx="2" />
      <path d="M0,3.38 H32 M0,6.77 H32 M0,10.15 H32 M0,13.54 H32 M0,16.92 H32 M0,20.31 H32" stroke="#ffffff" strokeWidth="1.69" />
      <rect width="13.5" height="11.85" fill="#3c3b6e" />
      <circle cx="2.7" cy="2.4" r="0.8" fill="#ffffff" />
      <circle cx="6.7" cy="2.4" r="0.8" fill="#ffffff" />
      <circle cx="10.8" cy="2.4" r="0.8" fill="#ffffff" />
      <circle cx="4.7" cy="5.9" r="0.8" fill="#ffffff" />
      <circle cx="8.7" cy="5.9" r="0.8" fill="#ffffff" />
      <circle cx="2.7" cy="9.4" r="0.8" fill="#ffffff" />
      <circle cx="6.7" cy="9.4" r="0.8" fill="#ffffff" />
      <circle cx="10.8" cy="9.4" r="0.8" fill="#ffffff" />
    </svg>
  );
}

function SpainFlag() {
  return (
    <svg viewBox="0 0 32 22" className="flag-svg" aria-hidden="true">
      <rect width="32" height="22" fill="#aa151b" rx="2" />
      <rect y="5.5" width="32" height="11" fill="#f1bf00" />
      <circle cx="8" cy="11" r="2.8" fill="#aa151b" />
      <circle cx="8" cy="11" r="1.8" fill="#f1bf00" />
      <rect x="7.4" y="9.8" width="1.2" height="2.4" fill="#aa151b" />
    </svg>
  );
}

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="locale-switcher" title={t("language")}>
      <label htmlFor="locale-hidden-select" className="sr-only">
        {t("language")}
      </label>
      <select
        id="locale-hidden-select"
        className="sr-only"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        <option value="pt-BR">Português (Brasil)</option>
        <option value="en">English (USA)</option>
        <option value="es">Español (España)</option>
      </select>

      <button
        type="button"
        className={`flag-btn ${locale === "pt-BR" ? "active" : ""}`}
        onClick={() => setLocale("pt-BR")}
        title="Português (Brasil)"
        aria-pressed={locale === "pt-BR"}
        aria-label="Português (Brasil)"
      >
        <BrazilFlag />
      </button>

      <button
        type="button"
        className={`flag-btn ${locale === "en" ? "active" : ""}`}
        onClick={() => setLocale("en")}
        title="English (USA)"
        aria-pressed={locale === "en"}
        aria-label="English (USA)"
      >
        <USAFlag />
      </button>

      <button
        type="button"
        className={`flag-btn ${locale === "es" ? "active" : ""}`}
        onClick={() => setLocale("es")}
        title="Español (España)"
        aria-pressed={locale === "es"}
        aria-label="Español (España)"
      >
        <SpainFlag />
      </button>
    </div>
  );
}
