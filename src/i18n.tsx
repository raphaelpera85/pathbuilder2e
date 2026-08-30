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
    newPassword: "Nova senha", changePassword: "Modificar senha", deleteAccount: "Excluir minha conta", signOut: "Sair desta conta",
    pickerCompendium: "Compêndio PF2e", searchOptions: "Buscar opções", search: "Buscar...", availableOptions: "Opções disponíveis",
    noOption: "Nenhuma opção encontrada", searchAnother: "Tente buscar por outro nome.", selectDetails: "Selecione um item para ver os detalhes.",
    accept: "Aceitar", cancel: "Cancelar", source: "Fonte", uncatalogued: "Ainda não catalogada", baseHp: "PV base",
    speed: "Velocidade", feet: "pés", hpPerLevel: "PV por nível", keyAbility: "Atributo-chave", damage: "Dano", traits: "Traços",
    select: "Selecionar", ancestries: "Ancestralidades", classes: "Classes", backgrounds: "Antecedentes", weapons: "Armas",
    armors: "Armaduras", heritages: "Heranças", archetypes: "Arquétipos", spells: "Magias", rituals: "Rituais", feats: "Talentos", items: "Equipamentos", pets: "Mascotes & Companheiros", actions: "Ações", conditions: "Condições", buffs: "Benefícios", size: "Tamanho", configuration: "Configuração", landSpeed: "Deslocamento terrestre", swimSpeed: "Deslocamento de natação", climbSpeed: "Deslocamento de escalada",
    rank: "Ranque", traditions: "Tradições", castingTime: "Conjuração", primaryCheck: "Teste primário", spellCatalog: "Catálogo de Magias", addManualSpell: "Adicionar Magia Manualmente", addRitual: "Adicionar Ritual", knownSpells: "Magias Conhecidas", knownRituals: "Rituais Aprendidos",
    navLabel: "Navegação principal", navBuilder: "Construtor", navCompendium: "Compêndio", navRules: "Regras e fontes", navLibrary: "Biblioteca e perfil", navPrivacy: "Privacidade", navAdmin: "Curadoria", navCampaigns: "Campanhas do Mestre",
    campaignsTitle: "Campanhas e Mesas de RPG", campaignsIntro: "Organize suas aventuras, acompanhe as fichas dos seus jogadores em tempo real e gerencie iniciativa e sessões.",
    gmEmail: "E-mail do Mestre (Game Master)", linkGM: "Vincular Mestre", linkedGM: "Mestre Vinculado", unlinkGM: "Desvincular Mestre",
    createCampaign: "Nova Campanha / Mesa", campaignName: "Nome da Campanha", campaignSchedule: "Dia / Horário", campaignDescription: "Sinopse da Aventura",
    manageParty: "Aventureiros da Mesa", inspectSheet: "Inspecionar Ficha", sharedPlayerSheets: "Fichas de Jogadores Vinculadas",
    noSharedSheets: "Nenhuma ficha de jogador vinculada ao seu e-mail ainda.", noSharedSheetsDesc: "Peça aos seus jogadores para inserirem seu e-mail de mestre na aba Detalhes da ficha ou na Biblioteca.",
    initiativeTracker: "Rastreador de Iniciativa & Combate", sessionJournal: "Diário de Sessões & Anotações", addSession: "Registrar Nova Sessão", addCombatant: "Adicionar Combatente / NPC",
    compendiumTitle: "Compêndio de criação", compendiumIntro: "Consulte as opções disponíveis no construtor. Registros sem livro e página confirmados permanecem marcados para revisão.",
    allCategories: "Todas as categorias", results: "resultados", catalogReview: "Requer revisão", catalogVerified: "Fonte Remaster", catalogLegacy: "Fonte pré-Remaster", rulesetRemaster: "Remaster", rulesetLegacy: "Pré-Remaster", rulesetReview: "A revisar", rarityCommon: "Comum", rarityUncommon: "Incomum", rarityRare: "Raro",
    rulesTitle: "Regras e fontes", rulesIntro: "Referência operacional para criar fichas consistentes e separar conteúdo Remaster, legado e personalizado.",
    validationTitle: "Validação da ficha", sourcesTitle: "Biblioteca de fontes", sourcesIntro: "Somente metadados locais verificados são exibidos; o portal não reproduz capítulos dos livros.",
    pages: "páginas", metadataVerified: "Metadados verificados", contentPending: "Conteúdo pendente de catalogação", localLanguage: "Idioma",
    pageCountVerified: "Total de páginas verificado", languageInferred: "Idioma inferido pelo nome do arquivo",
    linkedRecords: "registros vinculados",
    libraryPageTitle: "Biblioteca e perfil", libraryPageIntro: "Crie sua conta, salve personagens privados, altere usuário ou senha e gerencie suas fichas.",
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
    newPassword: "New password", changePassword: "Change password", deleteAccount: "Delete my account", signOut: "Sign out",
    pickerCompendium: "PF2e Compendium", searchOptions: "Search options", search: "Search...", availableOptions: "Available options",
    noOption: "No options found", searchAnother: "Try searching for another name.", selectDetails: "Select an item to view its details.",
    accept: "Accept", cancel: "Cancel", source: "Source", uncatalogued: "Not catalogued yet", baseHp: "Base HP",
    speed: "Speed", feet: "feet", hpPerLevel: "HP per level", keyAbility: "Key ability", damage: "Damage", traits: "Traits",
    select: "Select", ancestries: "Ancestries", classes: "Classes", backgrounds: "Backgrounds", weapons: "Weapons",
    armors: "Armor", heritages: "Heritages", archetypes: "Archetypes", spells: "Spells", rituals: "Rituals", feats: "Feats", items: "Gear & Items", pets: "Pets & Companions", actions: "Actions", conditions: "Conditions", buffs: "Benefits", size: "Size", configuration: "Configuration", landSpeed: "Land Speed", swimSpeed: "Swim Speed", climbSpeed: "Climb Speed",
    rank: "Rank", traditions: "Traditions", castingTime: "Casting", primaryCheck: "Primary check", spellCatalog: "Spell Catalog", addManualSpell: "Add Spell Manually", addRitual: "Add Ritual", knownSpells: "Known Spells", knownRituals: "Learned Rituals",
    navLabel: "Main navigation", navBuilder: "Builder", navCompendium: "Compendium", navRules: "Rules & sources", navLibrary: "Library & profile", navPrivacy: "Privacy", navAdmin: "Curation", navCampaigns: "GM Campaigns",
    campaignsTitle: "RPG Campaigns and Tables", campaignsIntro: "Organize your adventures, track your players' character sheets in real time, and manage initiative and sessions.",
    gmEmail: "Game Master (GM) Email", linkGM: "Link GM", linkedGM: "Linked GM", unlinkGM: "Unlink GM",
    createCampaign: "New Campaign / Table", campaignName: "Campaign Name", campaignSchedule: "Schedule", campaignDescription: "Adventure Synopsis",
    manageParty: "Adventuring Party", inspectSheet: "Inspect Sheet", sharedPlayerSheets: "Linked Player Sheets",
    noSharedSheets: "No player sheets linked to your email yet.", noSharedSheetsDesc: "Ask your players to enter your GM email on their character sheet Details tab or Library.",
    initiativeTracker: "Initiative & Combat Tracker", sessionJournal: "Session Journal & Notes", addSession: "Log New Session", addCombatant: "Add Combatant / NPC",
    compendiumTitle: "Character creation compendium", compendiumIntro: "Browse the options available in the builder. Records without a confirmed book and page remain flagged for review.",
    allCategories: "All categories", results: "results", catalogReview: "Needs review", catalogVerified: "Remaster source", catalogLegacy: "Pre-Remaster source", rulesetRemaster: "Remaster", rulesetLegacy: "Pre-Remaster", rulesetReview: "Needs review", rarityCommon: "Common", rarityUncommon: "Uncommon", rarityRare: "Rare",
    rulesTitle: "Rules & sources", rulesIntro: "Operational reference for consistent sheets and clear separation of Remaster, legacy, and custom content.",
    validationTitle: "Sheet validation", sourcesTitle: "Source library", sourcesIntro: "Only verified local metadata is shown; the portal does not reproduce book chapters.",
    pages: "pages", metadataVerified: "Metadata verified", contentPending: "Content pending cataloguing", localLanguage: "Language",
    pageCountVerified: "Page count verified", languageInferred: "Language inferred from filename",
    linkedRecords: "linked records",
    libraryPageTitle: "Library & profile", libraryPageIntro: "Create an account, save private characters, change your username or password, and manage your sheets.",
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
    level: "Nivel", rulesReview: "Reglas por revisar", profileSettings: "Configuración del perfil", updateUsername: "Actualizar usuario",
    newPassword: "Nueva contraseña", changePassword: "Cambiar contraseña", deleteAccount: "Eliminar mi cuenta", signOut: "Cerrar sesión",
    pickerCompendium: "Compendio PF2e", searchOptions: "Buscar opciones", search: "Buscar...", availableOptions: "Opciones disponibles",
    noOption: "No se encontraron opciones", searchAnother: "Prueba buscar otro nombre.", selectDetails: "Selecciona un elemento para ver los detalles.",
    accept: "Aceptar", cancel: "Cancelar", source: "Fuente", uncatalogued: "Aún no catalogada", baseHp: "PG base",
    speed: "Velocidad", feet: "pies", hpPerLevel: "PG por nivel", keyAbility: "Característica clave", damage: "Daño", traits: "Rasgos",
    select: "Seleccionar", ancestries: "Ascendencias", classes: "Clases", backgrounds: "Trasfondos", weapons: "Armas",
    armors: "Armaduras", heritages: "Herencias", archetypes: "Arquetipos", spells: "Conjuros", rituals: "Rituales", feats: "Dotes", items: "Objetos y Equipo", pets: "Mascotas y Compañeros", actions: "Acciones", conditions: "Condiciones", buffs: "Beneficios", size: "Tamaño", configuration: "Configuración", landSpeed: "Velocidad terrestre", swimSpeed: "Velocidad de nado", climbSpeed: "Velocidad de trepar",
    rank: "Rango", traditions: "Tradiciones", castingTime: "Lanzamiento", primaryCheck: "Prueba principal", spellCatalog: "Catálogo de Conjuros", addManualSpell: "Añadir Conjuro Manualmente", addRitual: "Añadir Ritual", knownSpells: "Conjuros Conocidos", knownRituals: "Rituales Aprendidos",
    navLabel: "Navegación principal", navBuilder: "Creador", navCompendium: "Compendio", navRules: "Reglas y fuentes", navLibrary: "Biblioteca y perfil", navPrivacy: "Privacidad", navAdmin: "Curaduría", navCampaigns: "Campañas del DJ",
    campaignsTitle: "Campañas y Mesas de RPG", campaignsIntro: "Organiza tus aventuras, sigue las fichas de tus jugadores en tiempo real y gestiona iniciativa y sesiones.",
    gmEmail: "Correo del Director de Juego (DJ)", linkGM: "Vincular DJ", linkedGM: "DJ Vinculado", unlinkGM: "Desvincular DJ",
    createCampaign: "Nueva Campaña / Mesa", campaignName: "Nombre de la Campaña", campaignSchedule: "Horario", campaignDescription: "Sinopsis de la Aventura",
    manageParty: "Grupo de Aventureros", inspectSheet: "Inspeccionar Ficha", sharedPlayerSheets: "Fichas de Jugadores Vinculadas",
    noSharedSheets: "Aún no hay fichas de jugadores vinculadas a tu correo.", noSharedSheetsDesc: "Pide a tus jugadores que introduzcan tu correo de DJ en la pestaña Detalles de su ficha o en la Biblioteca.",
    initiativeTracker: "Rastreador de Iniciativa y Combate", sessionJournal: "Diario de Sesiones y Pistas", addSession: "Registrar Nueva Sesión", addCombatant: "Añadir Combatiente / PNJ",
    compendiumTitle: "Compendio de creación", compendiumIntro: "Consulta las opciones disponibles en el creador. Los registros sin libro y página confirmados permanecen marcados para revisión.",
    allCategories: "Todas las categorías", results: "resultados", catalogReview: "Requiere revisión", catalogVerified: "Fuente Remaster", catalogLegacy: "Fuente pre-Remaster", rulesetRemaster: "Remaster", rulesetLegacy: "Pre-Remaster", rulesetReview: "Por revisar", rarityCommon: "Común", rarityUncommon: "Poco común", rarityRare: "Raro",
    rulesTitle: "Reglas y fuentes", rulesIntro: "Referencia operativa para crear fichas consistentes y separar contenido Remaster, legado y personalizado.",
    validationTitle: "Validación de la ficha", sourcesTitle: "Biblioteca de fuentes", sourcesIntro: "Solo se muestran metadatos locales verificados; el portal no reproduce capítulos de los libros.",
    pages: "páginas", metadataVerified: "Metadatos verificados", contentPending: "Contenido pendiente de catalogación", localLanguage: "Idioma",
    pageCountVerified: "Total de páginas verificado", languageInferred: "Idioma inferido por el nombre del archivo",
    linkedRecords: "registros vinculados",
    libraryPageTitle: "Biblioteca y perfil", libraryPageIntro: "Crea tu cuenta, guarda personajes privados, cambia tu usuario o contraseña y administra tus fichas.",
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
    formulas: "Fórmulas y Artesanía", allRulesets: "Todos los Conjuntos de Reglas", allRarities: "Todas las Raridades", allBooks: "Todos los Libros / Fuentes",
    inspectDetails: "Detalles del Registro", filterRuleset: "Filtrar Reglas", filterRarity: "Filtrar Raridad", filterBook: "Filtrar Libro / Fuente",
    bulk: "Volumen (Bulk)", price: "Precio", prerequisites: "Requisitos previos", actionsCount: "Acciones necesarias", itemDetails: "Especificaciones y Efectos",
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

