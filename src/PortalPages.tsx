import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  pathfinderSources,
  type PathfinderSource,
  GITHUB_REPO_URL,
  GITHUB_LIVROS_FOLDER_URL,
  GOOGLE_DRIVE_FOLDER_URL
} from "./data/sources";
import { useI18n, getItemDisplayName, type MessageKey } from "./i18n";
import type { PickerItem, PickerType } from "./types";
import { useAccountViewState } from "./accountState";
import { formatPriceToLocale } from "./utils/economy";
import { getLocalizedSkillName, getTraditionDisplayNames, localizePrerequisiteText } from "./PickerModal";
import {
  getCurrentSession,
  signIn,
  signOut,
  signUp,
  subscribeToAuth,
  type AuthSession,
} from "./services/auth";
import {
  deleteCharacter,
  listCharacters,
  renameCharacter,
  type CloudCharacter,
} from "./services/characters";
import {
  getAdminDashboardMetrics,
  recordAppAccess,
  type AdminDashboardMetrics,
} from "./services/admin";
import {
  fetchCatalogCategory,
  getCatalogSyncStatus,
  type CatalogSyncStatus,
} from "./services/catalog";
import { CampaignsPage } from "./CampaignsPage";
import "./portal.css";

type PortalRoute = "builder" | "compendium" | "rules" | "downloads" | "library" | "campaigns" | "privacy" | "admin";

const routes: PortalRoute[] = ["builder", "compendium", "rules", "downloads", "library", "campaigns", "privacy", "admin"];
const navItems: Array<{ route: PortalRoute; label: MessageKey; icon: string }> = [
  { route: "library", label: "navLibrary", icon: "🛡" },
  { route: "campaigns", label: "navCampaigns", icon: "🏰" },
  { route: "builder", label: "navBuilder", icon: "⚔" },
  { route: "compendium", label: "navCompendium", icon: "📖" },
  { route: "rules", label: "navRules", icon: "📜" },
  { route: "downloads", label: "navDownloads", icon: "📚" },
  { route: "privacy", label: "navPrivacy", icon: "🔒" },
  { route: "admin", label: "navAdmin", icon: "⚙" },
];

const catalogCategories: Array<{ type: PickerType; label: MessageKey }> = [
  { type: "ancestry", label: "ancestries" },
  { type: "heritage", label: "heritages" },
  { type: "class", label: "classes" },
  { type: "subclass", label: "subclasses" },
  { type: "background", label: "backgrounds" },
  { type: "archetype", label: "archetypes" },
  { type: "spell", label: "spells" },
  { type: "ritual", label: "rituals" },
  { type: "feat", label: "feats" },
  { type: "item", label: "items" },
  { type: "formula", label: "formulas" },
  { type: "pet", label: "pets" },
  { type: "action", label: "actions" },
  { type: "weapon", label: "weapons" },
  { type: "armor", label: "armors" },
  { type: "shield", label: "shields" },
  { type: "condition", label: "conditions" },
  { type: "buff", label: "buffs" },
];

function localizeSourceBook(book: string, locale: "pt-BR" | "en" | "es"): string {
  const translations: Array<[RegExp, string, string, string]> = [
    [/Livro do Jogador 2|Player Core 2/i, "Livro do Jogador 2", "Player Core 2", "Núcleo del jugador 2"],
    [/Livro do Jogador|Player Core/i, "Livro do Jogador", "Player Core", "Núcleo del jugador"],
    [/Segredos da Magia|Secrets of Magic/i, "Segredos da Magia", "Secrets of Magic", "Secretos de la magia"],
    [/Pólvora e Engrenagens|Guns & Gears/i, "Pólvora e Engrenagens", "Guns & Gears", "Pólvora y engranajes"],
    [/Livro dos Mortos|Book of the Dead/i, "Livro dos Mortos", "Book of the Dead", "Libro de los muertos"],
    [/Guerra dos Imortais|War of Immortals/i, "Guerra dos Imortais", "War of Immortals", "Guerra de los inmortales"],
    [/Dark Archive/i, "Arquivo Sombrio", "Dark Archive", "Archivo oscuro"],
    [/Rage of Elements/i, "Fúria dos Elementos", "Rage of Elements", "Furia de los elementos"],
    [/Howl of the Wild/i, "Uivo da Natureza", "Howl of the Wild", "Aullido de lo salvaje"],
    [/Battlecry/i, "Grito de Batalha!", "Battlecry!", "¡Grito de batalla!"],
    [/Livro Básico|Core Rulebook/i, "Livro Básico", "Core Rulebook", "Reglamento básico"],
    [/Manual do Jogador/i, "Manual do Jogador PF2e", "PF2e Player Guide compilation", "Compilación del manual del jugador PF2e"],
    [/Guia Completo do Jogador/i, "Guia Completo do Jogador PF2e", "PF2e Player Guide compilation", "Compilación de guía del jugador PF2e"],
  ];
  const match = translations.find(([pattern]) => pattern.test(book));
  return match ? match[locale === "pt-BR" ? 1 : locale === "en" ? 2 : 3] : book;
}

function localizeSourceTitle(source: PathfinderSource, locale: "pt-BR" | "en" | "es"): string {
  if (source.titles?.[locale]) return source.titles[locale];
  if (locale === "pt-BR") return source.title;
  return localizeSourceBook(source.title, locale);
}

function localizeSourceLanguage(language: PathfinderSource["language"], locale: "pt-BR" | "en" | "es"): string {
  if (language === "pt-BR") return locale === "en" ? "Brazilian Portuguese" : locale === "es" ? "Portugués brasileño" : "Português (Brasil)";
  return locale === "es" ? "Inglés" : "English";
}

const validationCopy: Record<"pt-BR" | "en" | "es", string[]> = {
  "pt-BR": [
    "Classes Remaster usam CD de classe Treinado no nível 1 e salvamentos por proficiência.",
    "Perícias e Saberes recebem modificadores de atributo, proficiência e nível do personagem.",
    "Magias organizam ranques de 1 a 10 e validam compatibilidade com tradições da classe.",
    "A exportação PDF mantém editáveis os campos do modelo oficial que são preservados pelo preenchimento.",
  ],
  en: [
    "Remaster classes use Trained class DC at level 1 and proficiency-based saves.",
    "Skills and Lores compute ability, proficiency, and character level modifiers.",
    "Spells organize ranks 1 through 10 and validate class tradition compatibility.",
    "PDF export keeps the official template fields editable when they are preserved by the fill operation.",
  ],
  es: [
    "Las clases Remaster usan CD de clase Entrenada a nivel 1 y salvaciones por competencia.",
    "Las habilidades y saberes calculan modificadores de atributo, competencia y nivel.",
    "Los conjuros organizan rangos del 1 al 10 y validan compatibilidad con tradiciones.",
    "La exportación PDF mantiene editables los campos de la plantilla oficial que conserva el rellenado.",
  ],
};

function getRoute(): PortalRoute {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (routes.includes(hash as PortalRoute)) {
    return hash as PortalRoute;
  }
  // Se não houver hash especificado, abre a biblioteca/login por padrão
  return "library";
}

function CatalogPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PickerType | "all">("all");
  const [rulesetFilter, setRulesetFilter] = useState<string>("all");
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [bookFilter, setBookFilter] = useState<string>("all");
  const [inspectedEntry, setInspectedEntry] = useState<(PickerItem & { category: PickerType; categoryLabel: string }) | null>(null);
  const [syncStatus, setSyncStatus] = useState<CatalogSyncStatus>(getCatalogSyncStatus());
  const [remoteItemsByCategory, setRemoteItemsByCategory] = useState<Partial<Record<PickerType, PickerItem[]>>>({});
  const [isSyncing, setIsSyncing] = useState(false);

  // Efeito para carregar dados remotos do Supabase
  useEffect(() => {
    let isMounted = true;
    const loadCategory = async (type: PickerType) => {
      try {
        const result = await fetchCatalogCategory(type);
        if (isMounted && result.items.length > 0) {
          setRemoteItemsByCategory((prev) => ({ ...prev, [type]: result.items }));
          setSyncStatus((prev) => ({ ...prev, source: result.source }));
        }
      } catch (err) {
        console.warn(`[Catalog] Não foi possível carregar ${type}:`, err);
      }
    };

    if (category === "all") {
      // Carrega todas as 18 categorias relacionais do Supabase em lotes paralelos
      const allTypes: PickerType[] = catalogCategories.map((c) => c.type);
      const BATCH_SIZE = 4;
      (async () => {
        for (let i = 0; i < allTypes.length; i += BATCH_SIZE) {
          if (!isMounted) break;
          const batch = allTypes.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map((type) => loadCategory(type)));
        }
      })();
    } else {
      loadCategory(category);
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const typesToSync: PickerType[] = category === "all" ? catalogCategories.map((c) => c.type) : [category];
      const BATCH_SIZE = 4;
      for (let i = 0; i < typesToSync.length; i += BATCH_SIZE) {
        const batch = typesToSync.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async (type) => {
            const result = await fetchCatalogCategory(type, { forceRemote: true });
            if (result.items.length > 0) {
              setRemoteItemsByCategory((prev) => ({ ...prev, [type]: result.items }));
              setSyncStatus((prev) => ({ ...prev, source: result.source }));
            }
          })
        );
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const entries = useMemo(() => catalogCategories.flatMap(({ type, label }) => {
    const remote = remoteItemsByCategory[type];
    if (remote && remote.length > 0) {
      return remote.map((item) => ({ ...item, category: type, categoryLabel: t(label) }));
    }
    // Quando o Supabase está configurado e online, as informações devem vir exclusivamente dele
    if (syncStatus.isConfigured && syncStatus.isOnline) {
      return [];
    }
    try {
      return (window as any).app?.getPickerItems(type, { includeIncompatible: true }).map((item: any) => ({ ...item, category: type, categoryLabel: t(label) })) || [];
    } catch {
      return [];
    }
  }), [remoteItemsByCategory, syncStatus.isConfigured, syncStatus.isOnline, t]);

  const availableBooks = useMemo(() => {
    const books = new Set<string>();
    entries.forEach((e) => {
      if (e.data?.source?.book) books.add(e.data.source.book);
    });
    return Array.from(books).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    const list = entries.filter((entry) => {
      const categoryMatches = category === "all" || entry.category === category;
      const rulesetMatches = rulesetFilter === "all" ||
        (rulesetFilter === "remaster" && entry.data?.ruleset === "remaster") ||
        (rulesetFilter === "legacy" && entry.data?.ruleset === "legacy") ||
        (rulesetFilter === "needs_review" && (entry.data?.ruleset === "needs_review" || entry.data?.needs_review === true));
      const rarityMatches = rarityFilter === "all" || (entry.data?.rarity || "common") === rarityFilter;
      const bookMatches = bookFilter === "all" || entry.data?.source?.book === bookFilter;

      const localizedName = getItemDisplayName(entry, locale);
      const localizedSummary = entry.data?.summaries?.[locale] ?? entry.data?.description ?? "";
      const haystack = `${localizedName} ${entry.name} ${localizedSummary} ${entry.data?.traits?.join(" ") || ""}`.toLocaleLowerCase(locale);
      const queryMatches = haystack.includes(query.trim().toLocaleLowerCase(locale));
      return categoryMatches && rulesetMatches && rarityMatches && bookMatches && queryMatches;
    });

    return list.slice().sort((a, b) => {
      const nameA = getItemDisplayName(a, locale);
      const nameB = getItemDisplayName(b, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [bookFilter, category, entries, locale, query, rarityFilter, rulesetFilter]);

  return <main className="portal-page portal-catalog-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero">
      <span>{t("compendiumKicker")}</span>
      <h1>{t("compendiumTitle")}</h1>
      <p>{t("compendiumIntro")}</p>
    </header>
    <section className="catalog-toolbar" aria-label={t("searchOptions")}>
      <label className="catalog-search-label"><span>{t("catalogSearch")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={t("search")} /></label>
      <label><span>{t("filterCategory")}</span><select value={category} onChange={(event) => setCategory(event.target.value as PickerType | "all")}><option value="all">{t("allCategories")}</option>{catalogCategories.map((item) => <option key={item.type} value={item.type}>{t(item.label)}</option>)}</select></label>
      <label><span>{t("filterRuleset")}</span><select value={rulesetFilter} onChange={(event) => setRulesetFilter(event.target.value)}><option value="all">{t("allRulesets")}</option><option value="remaster">{t("rulesetRemaster")}</option><option value="legacy">{t("rulesetLegacy")}</option><option value="needs_review">{t("rulesetReview")}</option></select></label>
      <label><span>{t("filterRarity")}</span><select value={rarityFilter} onChange={(event) => setRarityFilter(event.target.value)}><option value="all">{t("allRarities")}</option><option value="common">{t("rarityCommon")}</option><option value="uncommon">{t("rarityUncommon")}</option><option value="rare">{t("rarityRare")}</option></select></label>
      {availableBooks.length > 0 && <label><span>{t("filterBook")}</span><select value={bookFilter} onChange={(event) => setBookFilter(event.target.value)}><option value="all">{t("allBooks")}</option>{availableBooks.map((b) => <option key={b} value={b}>{localizeSourceBook(b, locale)}</option>)}</select></label>}
      <div className="catalog-source-badge" title={syncStatus.isConfigured ? "Conectado ao Supabase com 18 tabelas relacionais" : "Modo offline local"}>
        <span className="source-indicator-dot" style={{ backgroundColor: syncStatus.source === "supabase" ? "#10b981" : syncStatus.source === "local_cache" ? "#3b82f6" : "#f59e0b" }} />
        <span className="source-indicator-text">
          {syncStatus.source === "supabase"
            ? (locale === "en" ? "☁️ Supabase Cloud" : locale === "es" ? "☁️ Nube Supabase" : "☁️ Supabase Conectado")
            : syncStatus.source === "local_cache"
              ? (locale === "en" ? "⚡ Local Cache" : locale === "es" ? "⚡ Caché Local" : "⚡ Cache Offline")
              : (locale === "en" ? "💾 Local Catalog" : locale === "es" ? "💾 Catálogo Local" : "💾 Catálogo Integrado")}
        </span>
        {syncStatus.isConfigured && (
          <button
            type="button"
            className="catalog-sync-btn"
            onClick={handleManualSync}
            disabled={isSyncing}
            title={locale === "en" ? "Sync with Supabase" : locale === "es" ? "Sincronizar con Supabase" : "Sincronizar com Supabase"}
          >
            {isSyncing ? "⏳" : "🔄"}
          </button>
        )}
      </div>
      <strong className="catalog-count" aria-live="polite">{filtered.length} {t("results")}</strong>
    </section>
    {filtered.length === 0 ? <div className="portal-empty">{t("noCatalogResults")}</div> : <section className="catalog-grid" aria-label={t("compendiumTitle")}>
      {filtered.map((entry, index) => <CatalogCard key={`${entry.category}-${entry.name}-${index}`} entry={entry} onInspect={() => setInspectedEntry(entry)} />)}
    </section>}

    {/* MODAL DE INSPEÇÃO DETALHADA */}
    {inspectedEntry && <div className="compendium-modal-overlay" onClick={() => setInspectedEntry(null)} role="dialog" aria-modal="true">
      <div className="compendium-modal" onClick={(e) => e.stopPropagation()}>
        <header className="compendium-modal-header">
          <div className="compendium-modal-title">
            <span className="category-tag">{inspectedEntry.categoryLabel}</span>
            <h2>{getItemDisplayName(inspectedEntry, locale)}</h2>
          </div>
          <button className="compendium-modal-close" onClick={() => setInspectedEntry(null)} aria-label={t("close")}>✕</button>
        </header>

        <div className="compendium-modal-body">
          {/* TRAITS & BADGES */}
          <div className="compendium-modal-badges">
            {inspectedEntry.data.rarity && <span className={`rarity-badge ${String(inspectedEntry.data.rarity)}`}>{inspectedEntry.data.rarity}</span>}
            <span className={inspectedEntry.data.ruleset === "remaster" ? "ruleset-badge remaster" : inspectedEntry.data.ruleset === "legacy" ? "ruleset-badge legacy" : "ruleset-badge needs_review"}>
              {inspectedEntry.data.ruleset === "remaster" ? t("rulesetRemaster") : inspectedEntry.data.ruleset === "legacy" ? t("rulesetLegacy") : t("rulesetReview")}
            </span>
            {inspectedEntry.data.sourceApproximate && <span className="source-badge review">{t("sourceSectionReference")}</span>}
            {hasFallbackTranslation(inspectedEntry) && <span className="source-badge translation-pending">{t("translationPending")}</span>}
            {inspectedEntry.data.traits?.map((trait: string) => <span key={trait} className="trait-tag">{getLocalizedTrait(trait, locale)}</span>)}
          </div>

          {/* STATS MATRIX */}
          <div className="compendium-stats-grid">
            {inspectedEntry.data.level !== undefined ? <div className="stat-box"><strong>{t("level")}</strong><span>{String(inspectedEntry.data.level)}</span></div> : null}
            {inspectedEntry.data.rank !== undefined ? <div className="stat-box"><strong>{t("rank")}</strong><span>{String(inspectedEntry.data.rank)}</span></div> : null}
            {inspectedEntry.data.hp !== undefined ? <div className="stat-box"><strong>{t("baseHp")}</strong><span>{String(inspectedEntry.data.hp)}</span></div> : null}
            {inspectedEntry.data.speed !== undefined ? <div className="stat-box"><strong>{t("speed")}</strong><span>{String(inspectedEntry.data.speed)} {t("feet")}</span></div> : null}
            {inspectedEntry.data.damage ? <div className="stat-box"><strong>{t("damage")}</strong><span>{String(inspectedEntry.data.damage)}</span></div> : null}
            {inspectedEntry.data.price ? <div className="stat-box"><strong>{t("price")}</strong><span>{formatPriceToLocale(inspectedEntry.data.price, locale)}</span></div> : null}
            {inspectedEntry.data.bulk !== undefined ? <div className="stat-box"><strong>{t("bulk")}</strong><span>{String(inspectedEntry.data.bulk)}</span></div> : null}
            {inspectedEntry.data.prerequisites ? <div className="stat-box"><strong>{t("prerequisites")}</strong><span>{formatCatalogValue(inspectedEntry.data.prerequisites, locale)}</span></div> : null}
          </div>

          {/* DESCRIPTION */}
          <div className="compendium-modal-description">
            <h3>{t("itemDetails")}</h3>
            <p>{String(inspectedEntry.data.summaries?.[locale] ?? inspectedEntry.data.description ?? inspectedEntry.summary ?? "")}</p>
          </div>

          {/* SOURCE CITATION */}
          <footer className="compendium-modal-footer">
            <strong>{t("source")}:</strong>
            <span>{inspectedEntry.data.source?.book ? `${inspectedEntry.data.sourceApproximate ? `${t("sourceSectionReference")}: ` : ""}${localizeSourceBook(inspectedEntry.data.source.book, locale)} · p. ${inspectedEntry.data.source.page ?? "-"}` : inspectedEntry.data.needs_review ? t("sourcePending") : t("uncatalogued")}</span>
          </footer>
        </div>
      </div>
    </div>}
  </main>;
}

function hasFallbackTranslation(entry: { data?: { id?: string; summaries?: Partial<Record<"pt-BR" | "en" | "es", string>> } }): boolean {
  const summaries = entry.data?.summaries;
  const pt = summaries?.["pt-BR"];
  const en = summaries?.en;
  const es = summaries?.es;
  return String(entry.data?.id ?? "").startsWith("item.compendium.")
    && Boolean(pt)
    && pt === en
    && en === es;
}

export function formatCatalogValue(value: unknown, locale: "pt-BR" | "en" | "es", key = ""): string {
  if (Array.isArray(value)) return value.map((entry) => formatCatalogValue(entry, locale, key)).join(", ");
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([childKey, item]) => `${localizeCatalogKey(childKey, locale)}: ${formatCatalogValue(item, locale, childKey)}`)
      .join(", ");
  }
  return localizeCatalogValue(value, locale, key);
}

function localizeCatalogValue(value: unknown, locale: "pt-BR" | "en" | "es", key: string): string {
  const enumLabels: Record<string, Record<"pt-BR" | "en" | "es", string>> = {
    ability: { "pt-BR": "atributo", en: "ability", es: "atributo" },
    attribute: { "pt-BR": "atributo", en: "attribute", es: "atributo" },
    level: { "pt-BR": "nível", en: "level", es: "nivel" },
    skill: { "pt-BR": "perícia", en: "skill", es: "habilidad" },
    feat: { "pt-BR": "talento", en: "feat", es: "dote" },
  };
  const raw = String(value ?? "");
  if (key === "type" && enumLabels[raw]) return enumLabels[raw][locale];
  return localizePrerequisiteText(value, locale);
}

function localizeCatalogKey(key: string, locale: "pt-BR" | "en" | "es"): string {
  const labels: Record<string, Record<"pt-BR" | "en" | "es", string>> = {
    type: { "pt-BR": "Tipo", en: "Type", es: "Tipo" },
    minimum: { "pt-BR": "Mínimo", en: "Minimum", es: "Mínimo" },
    maximum: { "pt-BR": "Máximo", en: "Maximum", es: "Máximo" },
    value: { "pt-BR": "Valor", en: "Value", es: "Valor" },
    level: { "pt-BR": "Nível", en: "Level", es: "Nivel" },
    rank: { "pt-BR": "Grau", en: "Rank", es: "Rango" },
    ability: { "pt-BR": "Atributo", en: "Ability", es: "Atributo" },
    attribute: { "pt-BR": "Atributo", en: "Attribute", es: "Atributo" },
    skill: { "pt-BR": "Perícia", en: "Skill", es: "Habilidad" },
    feat: { "pt-BR": "Talento", en: "Feat", es: "Dote" },
    class: { "pt-BR": "Classe", en: "Class", es: "Clase" },
    ancestry: { "pt-BR": "Ancestralidade", en: "Ancestry", es: "Ascendencia" },
    minimumModifier: { "pt-BR": "Modificador mínimo", en: "Minimum modifier", es: "Modificador mínimo" },
    requiresSpellcasting: { "pt-BR": "Exige conjuração", en: "Requires spellcasting", es: "Requiere lanzamiento de conjuros" },
  };
  return labels[key]?.[locale] || key;
}

function getLocalizedTrait(trait: string, locale: "pt-BR" | "en" | "es"): string {
  const legacyApp = typeof window !== "undefined" ? (window as any).app : null;
  return legacyApp?.localizeTrait?.(trait, locale) || trait;
}

function CatalogCard({ entry, onInspect }: { entry: PickerItem & { category: PickerType; categoryLabel: string }; onInspect?: () => void }) {
  const { locale, t } = useI18n();
  const source = entry.data.source;
  const approximateSource = Boolean(entry.data.sourceApproximate);
  const verified = Boolean(source?.book && source?.page) && !approximateSource;
  const legacy = verified && entry.data.ruleset === "legacy";
  const translationPending = hasFallbackTranslation(entry);
  const rarity = entry.data.rarity === "rare" ? t("rarityRare") : entry.data.rarity === "uncommon" ? t("rarityUncommon") : entry.data.rarity === "common" ? t("rarityCommon") : null;
  const castingTimes = entry.data.castingTimes as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const traditionNames = entry.data.traditionNames as Partial<Record<"pt-BR" | "en" | "es", string[]>> | undefined;
  const primaryChecks = entry.data.primaryChecks as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const facts = [
    typeof entry.data.rank === "number" ? `${t("rank")} ${entry.data.rank}` : null,
    typeof entry.data.level === "number" ? `${t("level")} ${entry.data.level}` : null,
    castingTimes?.[locale] ? `${t("castingTime")}: ${castingTimes[locale]}` : null,
    getTraditionDisplayNames(entry.data.traditions, traditionNames, locale).length
      ? `${t("traditions")}: ${getTraditionDisplayNames(entry.data.traditions, traditionNames, locale).join(", ")}` : null,
    (primaryChecks?.[locale] || primaryChecks?.["pt-BR"] || primaryChecks?.en)
      ? `${t("primaryCheck")}: ${getLocalizedSkillName(primaryChecks?.[locale] || primaryChecks?.["pt-BR"] || primaryChecks?.en, locale)}` : null,
    entry.data.price ? `${t("price")}: ${formatPriceToLocale(entry.data.price, locale)}` : null,
  ].filter((fact): fact is string => Boolean(fact));

  return <article className="catalog-card interactive" onClick={onInspect} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onInspect?.()} role="button" aria-label={getItemDisplayName(entry, locale)}>
    <div className="catalog-card-top"><div className="catalog-card-meta"><span>{entry.categoryLabel}</span>{rarity && <span className={`rarity-badge ${String(entry.data.rarity)}`}>{rarity}</span>}</div><div className="catalog-card-status"><span className={legacy ? "source-badge legacy" : verified ? "source-badge verified" : "source-badge review"}>{legacy ? t("catalogLegacy") : verified ? t("catalogVerified") : t("catalogReview")}</span>{approximateSource && <span className="source-badge review">{t("sourceSectionReference")}</span>}{translationPending && <span className="source-badge translation-pending">{t("translationPending")}</span>}</div></div>
    <h2>{getItemDisplayName(entry, locale)}</h2>
    {facts.length > 0 && <div className="catalog-facts">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}
    {(entry.data.summaries?.[locale] ?? entry.data.description) && <p>{entry.data.summaries?.[locale] ?? entry.data.description}</p>}
    <footer>{source?.book ? `${approximateSource ? `${t("sourceSectionReference")}: ` : ""}${localizeSourceBook(source.book, locale)}${source.page ? ` · p. ${source.page}` : ""}` : entry.data.needs_review ? t("sourcePending") : t("uncatalogued")}</footer>
  </article>;
}

function BookDownloadsSection() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [rulesetFilter, setRulesetFilter] = useState<string>("all");
  const [langFilter, setLangFilter] = useState<string>("all");

  const rulesetLabel = (ruleset: "remaster" | "legacy" | "needs_review") =>
    ruleset === "remaster" ? t("rulesetRemaster") : ruleset === "legacy" ? t("rulesetLegacy") : t("rulesetReview");

  const filteredSources = useMemo(() => {
    return pathfinderSources.filter((source) => {
      const title = localizeSourceTitle(source, locale).toLowerCase();
      const filename = (source.filename || "").toLowerCase();
      const matchesQuery = !query || title.includes(query.toLowerCase()) || filename.includes(query.toLowerCase());
      const matchesRuleset = rulesetFilter === "all" || source.ruleset === rulesetFilter;
      const matchesLang = langFilter === "all" || source.language === langFilter;
      return matchesQuery && matchesRuleset && matchesLang;
    });
  }, [query, rulesetFilter, langFilter, locale]);

  return (
    <section className="downloads-section" aria-label={t("downloadsTitle")}>
      <div className="downloads-header-card">
        <div className="downloads-header-info">
          <span className="downloads-kicker">{t("downloadsKicker")}</span>
          <h2>{t("downloadsTitle")}</h2>
          <p>{t("downloadsIntro")}</p>
          <small className="downloads-note">ℹ️ {t("downloadDirectNote")}</small>
        </div>
        <div className="downloads-repo-actions">
          <a
            href={GOOGLE_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-repo-link gdrive"
          >
            <span aria-hidden="true">☁️</span> {t("openGoogleDriveFolder")}
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-repo-link"
          >
            <span aria-hidden="true">🐙</span> {t("openGithubRepo")}
          </a>
          <a
            href={GITHUB_LIVROS_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-repo-link secondary"
          >
            <span aria-hidden="true">📁</span> {t("openLivrosFolder")}
          </a>
        </div>
      </div>

      <div className="downloads-filter-bar">
        <input
          type="search"
          placeholder={t("searchBooks")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="downloads-search-input"
          aria-label={t("searchBooks")}
        />
        <select
          value={rulesetFilter}
          onChange={(e) => setRulesetFilter(e.target.value)}
          className="downloads-filter-select"
          aria-label={t("filterRuleset")}
        >
          <option value="all">{t("allRulesets")}</option>
          <option value="remaster">{t("rulesetRemaster")}</option>
          <option value="legacy">{t("rulesetLegacy")}</option>
        </select>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="downloads-filter-select"
          aria-label={t("localLanguage")}
        >
          <option value="all">{t("allLanguages")}</option>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="downloads-grid">
        {filteredSources.map((source) => (
          <article className="book-download-card" key={source.id}>
            <div className="book-card-top">
              <div className="book-card-title-group">
                <h3>{localizeSourceTitle(source, locale)}</h3>
                {source.titles?.en && source.titles?.["pt-BR"] && (
                  <span className="book-alt-title">
                    {locale === "pt-BR" ? source.titles.en : source.titles["pt-BR"]}
                  </span>
                )}
              </div>
              <span className={`ruleset-badge ${source.ruleset}`}>
                {rulesetLabel(source.ruleset)}
              </span>
            </div>

            <div className="book-card-meta">
              <span className="book-meta-item">
                📄 {source.pages} {t("pages")}
              </span>
              <span className="book-meta-item">
                🌐 {localizeSourceLanguage(source.language, locale)}
              </span>
              <span className="book-meta-item">
                🔗 {source.catalogStatus === "pending" ? t("contentPending") : `${source.linkedRecords} ${t("linkedRecords")}`}
              </span>
            </div>

            {source.filename && (
              <div className="book-card-filename" title={source.filename}>
                <code>📦 {source.filename}</code>
              </div>
            )}

            <div className="book-card-actions">
              <a
                href={source.driveUrl || GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-primary"
                aria-label={`${t("downloadPdfDirect")}: ${localizeSourceTitle(source, locale)}`}
                title={`${t("downloadPdfDirect")}: ${localizeSourceTitle(source, locale)}`}
              >
                <span aria-hidden="true">📥</span> {t("downloadPdfDirect")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DownloadsPage() {
  const { t } = useI18n();
  return (
    <main className="portal-page" id="portal-content" tabIndex={-1}>
      <header className="portal-hero">
        <span>{t("downloadsKicker")}</span>
        <h1>{t("downloadsTitle")}</h1>
        <p>{t("downloadsIntro")}</p>
      </header>
      <BookDownloadsSection />
    </main>
  );
}

function RulesPage() {
  const { locale, t } = useI18n();
  const rulesetLabel = (ruleset: "remaster" | "legacy" | "needs_review") => ruleset === "remaster" ? t("rulesetRemaster") : ruleset === "legacy" ? t("rulesetLegacy") : t("rulesetReview");
  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>{t("rulesKicker")}</span><h1>{t("rulesTitle")}</h1><p>{t("rulesIntro")}</p></header>
    <section className="rules-layout">
      <article className="portal-panel"><h2>{t("validationTitle")}</h2><ul className="validation-list">{validationCopy[locale].map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article>
      <article className="portal-panel"><h2>{t("sourcesTitle")}</h2><p>{t("sourcesIntro")}</p><div className="source-list">{pathfinderSources.map((source) => <div className="source-row" key={source.id}><div><strong>{localizeSourceTitle(source, locale)}</strong><span>{source.pages} {t("pages")} · {t("pageCountVerified")}</span><small>{t("localLanguage")}: {localizeSourceLanguage(source.language, locale)} · {t("languageInferred")}</small></div><div><span className={`ruleset-badge ${source.ruleset}`}>{rulesetLabel(source.ruleset)}</span><small>{source.catalogStatus === "pending" ? t("contentPending") : `${source.linkedRecords} ${t("linkedRecords")}`}</small></div></div>)}</div></article>
    </section>
    <div style={{ marginTop: "36px" }}>
      <BookDownloadsSection />
    </div>
  </main>;
}

function LibraryPage() {
  const { t, locale } = useI18n();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [characters, setCharacters] = useState<CloudCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("pf2e_remembered_login") || "";
    } catch {
      return "";
    }
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const charactersLoadIdRef = useRef(0);
  const sessionRef = useRef<AuthSession | null>(null);

  const loadUserCharacters = async (activeSession: AuthSession) => {
    const requestId = ++charactersLoadIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const list = await listCharacters(activeSession.user);
      if (requestId !== charactersLoadIdRef.current) return;
      setCharacters(list);
    } catch (err) {
      if (requestId !== charactersLoadIdRef.current) return;
      setError(t("loadAccountFailed"));
    } finally {
      if (requestId === charactersLoadIdRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    let initialSessionResolved = false;
    const applySession = (next: AuthSession | null) => {
      if (!active) return;
      sessionRef.current = next;
      setSession(next);
      setSessionReady(true);
      if (next) void loadUserCharacters(next);
      else {
        charactersLoadIdRef.current += 1;
        setLoading(false);
        setCharacters([]);
      }
    };
    void getCurrentSession().then((cur) => {
      if (!active) return;
      initialSessionResolved = true;
      // A null event can arrive while Supabase is still hydrating a persisted
      // session. The resolved read is authoritative for the initial render.
      applySession(cur);
    });

    const unsubscribe = subscribeToAuth((next) => {
      if (!initialSessionResolved && !next) {
        return;
      }
      applySession(next);
    });
    const refreshAfterCharacterChange = () => {
      if (sessionRef.current) void loadUserCharacters(sessionRef.current);
    };
    window.addEventListener("pathbuilder:characters-changed", refreshAfterCharacterChange);
    return () => {
      active = false;
      unsubscribe();
      window.removeEventListener("pathbuilder:characters-changed", refreshAfterCharacterChange);
    };
  }, []);

  if (!sessionReady) {
    return (
      <main className="portal-page library-auth-page" id="portal-content" tabIndex={-1}>
        <div className="portal-empty" role="status">{t("loadingSheets")}</div>
      </main>
    );
  }

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setWorking("auth");
    setError(null);
    setNotice(null);
    try {
      if (authMode === "signup") {
        if (password !== confirmPassword) {
          setError(t("passwordsDontMatch"));
          setWorking(null);
          return;
        }
        const next = await signUp(username, email, password);
        if ((next as any)?.pendingConfirmation) {
          setNotice(t("accountCreatedNotice"));
        } else {
          sessionRef.current = next;
          setSession(next);
          setSessionReady(true);
          void loadUserCharacters(next);
          setNotice(t("welcomeNotice"));
        }
      } else {
        const next = await signIn(email, password);
        sessionRef.current = next;
        setSession(next);
        setSessionReady(true);
        void loadUserCharacters(next);
        setNotice(t("signedInNotice"));
      }
      if (rememberMe) {
        try {
          localStorage.setItem("pf2e_remembered_login", email.trim());
        } catch {
          // ignore
        }
      } else {
        try {
          localStorage.removeItem("pf2e_remembered_login");
        } catch {
          // ignore
        }
      }
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(t("authenticationFailed"));
    } finally {
      setWorking(null);
    }
  };

  const handleCreateNew = () => {
    (window as any).app?.createNewCharacter();
    window.location.hash = "#/builder";
  };

  const handleLoadCharacter = (char: CloudCharacter) => {
    (window as any).app?.loadCharacter(char.data);
    window.location.hash = "#/builder";
  };

  const handleDeleteCharacter = async (char: CloudCharacter) => {
    if (!window.confirm(`${t("deleteCharacterConfirm")} ${char.name}`)) return;
    if (!session) return;
    setWorking(char.id);
    try {
      await deleteCharacter(char.id, session.user);
      setCharacters((prev) => prev.filter((c) => c.id !== char.id));
      window.dispatchEvent(new Event("pathbuilder:characters-changed"));
      setNotice(t("characterDeletedNotice"));
    } catch (err) {
      setError(t("deleteCharacterFailed"));
    } finally {
      setWorking(null);
    }
  };

  const handleRenameCharacter = async (char: CloudCharacter) => {
    if (!session) return;
    const nextName = window.prompt(t("renamePrompt"), char.name)?.trim();
    if (!nextName || nextName === char.name) return;
    setWorking(char.id);
    setError(null);
    try {
      const renamed = await renameCharacter(char.character_key || char.id, nextName, session.user);
      setCharacters((prev) => prev.map((item) => item.id === char.id ? renamed : item));
      window.dispatchEvent(new Event("pathbuilder:characters-changed"));
      setNotice(t("saveCurrent"));
    } catch (err) {
      setError(t("saveCharacterFailed"));
    } finally {
      setWorking(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    sessionRef.current = null;
    charactersLoadIdRef.current += 1;
    setSession(null);
    setSessionReady(true);
    setLoading(false);
    setCharacters([]);
  };

  if (!session) {
    return (
      <main className="portal-page library-auth-page" id="portal-content" tabIndex={-1}>
        <div className="auth-card-hero">
          <span className="auth-kicker">{t("libraryKicker")}</span>
          <h1>{t("libraryAccessTitle")}</h1>
          <p>{t("libraryAccessIntro")}</p>
        </div>

        <div className="auth-main-container">
          <form className="auth-card" onSubmit={handleAuth}>
            <div className="auth-switch" role="tablist">
              <button
                type="button"
                className={authMode === "signin" ? "active" : ""}
                onClick={() => { setAuthMode("signin"); setError(null); setNotice(null); }}
              >
                {t("enter")}
              </button>
              <button
                type="button"
                className={authMode === "signup" ? "active" : ""}
                onClick={() => { setAuthMode("signup"); setError(null); setNotice(null); }}
              >
                {t("createNewAccount")}
              </button>
            </div>

            {authMode === "signup" && (
              <label>
                {t("username")}
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={locale === "en" ? "GameMasterArthur" : locale === "es" ? "MaestroArthur" : "MestreArthur"}
                  required
                />
              </label>
            )}

            <label>
              {authMode === "signup" ? t("email") : t("usernameOrEmail")}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={authMode === "signup"
                  ? (locale === "pt-BR" ? "email@exemplo.com" : locale === "es" ? "correo@ejemplo.com" : "email@example.com")
                  : (locale === "pt-BR" ? "usuário / e-mail" : locale === "es" ? "usuario / correo" : "username / email")}
                required
              />
            </label>

            <label>
              {t("password")}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </label>

            {authMode === "signup" && (
              <label>
                {t("confirmPassword")}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </label>
            )}

            <label className="auth-remember-label" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--pb-text, #cbd5e1)", margin: "4px 0 10px", userSelect: "none" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "var(--pb-orange, #f97316)", width: "16px", height: "16px", cursor: "pointer" }}
              />
              <span>{t("rememberAccount")}</span>
            </label>

            <button className="auth-submit-btn" type="submit" disabled={working === "auth"}>
              {working === "auth" ? t("processing") : authMode === "signup" ? t("createMyAccount") : t("signInToAccount")}
            </button>

            {error && <div className="account-feedback error" role="alert">{error}</div>}
            {notice && <div className="account-feedback success" role="status">{notice}</div>}
          </form>

          <div className="auth-guest-card">
            <span className="guest-icon">⚔️</span>
            <h3>{t("testOnly")}</h3>
            <p>{t("guestModeDescription")}</p>
            <button
              type="button"
              className="guest-btn"
              onClick={() => {
                (window as any).app?.createNewCharacter();
                window.location.hash = "#/builder";
              }}
            >
              {t("createGuestSheet")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="portal-page library-dashboard-page" id="portal-content" tabIndex={-1}>
      <header className="library-dash-header">
        <div>
          <span className="account-kicker">{t("connectedAs")}</span>
          <h1>{t("yourLibrary")} · {session.user.username}</h1>
          <p>{t("libraryManageCopy")}</p>
        </div>
        <div className="library-header-actions">
          <button className="create-char-hero-btn" type="button" onClick={handleCreateNew}>
            ➕ {t("createNewCharacterCta")}
          </button>
          <button className="signout-alt-btn" type="button" onClick={handleSignOut}>
            🚪 {t("signOutAccount")}
          </button>
        </div>
      </header>

      {error && <div className="account-feedback error" role="alert">{error}</div>}
      {notice && <div className="account-feedback success" role="status">{notice}</div>}

      <section className="library-characters-section">
        <div className="section-heading">
          <h2>{t("myCharactersTitle")}</h2>
          <span className="char-count-badge">{characters.length}</span>
        </div>

        {loading ? (
          <div className="portal-empty">{t("loadingCharacters")}</div>
        ) : characters.length === 0 ? (
          <div className="portal-empty-card">
            <span className="empty-icon">📜</span>
            <h3>{t("noCharactersTitle")}</h3>
            <p>{t("noCharactersDescription")}</p>
            <button type="button" className="create-char-hero-btn" onClick={handleCreateNew}>
              ➕ {t("startFirstCharacter")}
            </button>
          </div>
        ) : (
          <div className="characters-library-grid">
            {characters.map((char) => {
              const charData = (char.data || {}) as any;
              return (
                <article className="char-library-card" key={char.id}>
                  <div className="char-card-header">
                    <div>
                      <h3>{char.name}</h3>
                      <span className="char-class-ancestry">
                        {charData.ancestry || t("human")} · {charData.class || t("warrior")}
                      </span>
                    </div>
                    <span className="char-level-badge">{t("level")} {char.level}</span>
                  </div>

                  <div className="char-card-stats">
                    <span><strong>{t("armorClassShort")}:</strong> {charData.ac || 10 + Number(char.level)}</span>
                    <span><strong>{t("hitPointsShort")}:</strong> {charData.maxHp || 20}</span>
                    <span><strong>{t("updatedAt")}:</strong> {new Date(char.updated_at).toLocaleDateString(locale)}</span>
                  </div>

                  <div className="char-card-actions">
                    <button
                      className="btn-card-open"
                      type="button"
                      onClick={() => handleLoadCharacter(char)}
                    >
                      ⚔️ {t("openBuilder")}
                    </button>
                    <button
                      className="btn-card-rename"
                      type="button"
                      onClick={() => handleRenameCharacter(char)}
                      disabled={working === char.id}
                      aria-label={`${t("renameCharacter")} ${char.name}`}
                      title={t("renameCharacter")}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-card-delete"
                      type="button"
                      onClick={() => handleDeleteCharacter(char)}
                      disabled={working === char.id}
                      title={t("deleteSheet")}
                    >
                      🗑️
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function PrivacyPage() {
  const { t } = useI18n();
  const cards: Array<[MessageKey, MessageKey, string]> = [
    ["privacyLocalTitle", "privacyLocalCopy", "💻"], ["privacyCloudTitle", "privacyCloudCopy", "☁️"],
    ["privacyControlTitle", "privacyControlCopy", "🛡️"], ["privacyBooksTitle", "privacyBooksCopy", "📚"],
  ];
  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>{t("privacyKicker")}</span><h1>{t("privacyPageTitle")}</h1><p>{t("privacyPageIntro")}</p></header>
    <section className="privacy-grid">{cards.map(([title, copy, icon]) => <article className="portal-panel" key={title}><span className="panel-icon" aria-hidden="true">{icon}</span><h2>{t(title)}</h2><p>{t(copy)}</p></article>)}</section>
  </main>;
}

function AdminPage() {
  const { t, locale } = useI18n();
  const account = useAccountViewState();
  const [dashboardMetrics, setDashboardMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const compendiumMetrics = useMemo(() => {
    if (dashboardMetrics?.catalogCounts && Object.keys(dashboardMetrics.catalogCounts).length > 0) {
      const totalCatalog = Object.values(dashboardMetrics.catalogCounts).reduce((acc, count) => acc + count, 0);
      return {
        verified: totalCatalog,
        review: 0,
        sources: pathfinderSources.filter((source) => source.catalogStatus === "partial").length,
      };
    }
    const records = catalogCategories.flatMap(({ type }) => {
      try { return (window as any).app?.getPickerItems(type, { includeIncompatible: true }) || []; } catch { return []; }
    });
    const review = records.filter((record: any) => record.data?.needs_review === true || record.data?.ruleset === "needs_review").length;
    return {
      verified: Math.max(0, records.length - review),
      review,
      sources: pathfinderSources.filter((source) => source.catalogStatus === "partial").length,
    };
  }, [dashboardMetrics?.catalogCounts]);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await getAdminDashboardMetrics();
      setDashboardMetrics(data);
    } catch (e) {
      console.warn("Erro ao buscar métricas admin:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account.isAdmin) {
      loadMetrics();
    }
  }, [account.isAdmin]);

  const exportReport = () => {
    if (!dashboardMetrics) return;
    const reportData = {
      title: "Pathbuilder 2e Local - Relatório de Gestão & Auditoria",
      generatedAt: new Date().toISOString(),
      admin: account.username,
      metrics: {
        totalAccesses: dashboardMetrics.totalAccesses,
        accessesToday: dashboardMetrics.accessesToday,
        registeredAccounts: dashboardMetrics.registeredAccounts,
        charactersCreated: dashboardMetrics.charactersCreated,
        activeCampaigns: dashboardMetrics.activeCampaigns,
        adminUsers: dashboardMetrics.adminUsers,
        compendiumVerified: compendiumMetrics.verified,
        compendiumReviewQueue: compendiumMetrics.review,
      },
      characterDistribution: dashboardMetrics.characterRulesetDistribution,
      users: dashboardMetrics.usersList,
      recentAccessLogs: dashboardMetrics.recentAccesses,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pathbuilder2e-gestao-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback(t("metricsUpdated"));
    setTimeout(() => setFeedback(null), 3000);
  };

  if (!account.isAdmin) return <main className="portal-page access-page" id="portal-content" tabIndex={-1}>
    <section className="access-card"><span aria-hidden="true">🔐</span><h1>{t("adminRestricted")}</h1><p>{account.configured ? t("adminRestrictedCopy") : t("adminLocalCopy")}</p><button type="button" onClick={() => window.dispatchEvent(new Event("pathbuilder:open-account"))}>{t("openAccount")}</button></section>
  </main>;

  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero">
      <span>ADMIN · {account.username}</span>
      <h1>{t("adminTitle")}</h1>
      <p>{t("adminIntro")}</p>
    </header>

    <div className="admin-toolbar">
      <div className="admin-toolbar-info">
        <span className="role-badge admin">🛡️ {t("administrator")}</span>
        {dashboardMetrics?.lastUpdated && (
          <span style={{ color: "var(--pb-text-muted)", fontSize: "11px", marginLeft: "10px" }}>
            {t("updatedAt")}: {new Date(dashboardMetrics.lastUpdated).toLocaleTimeString(locale)}
          </span>
        )}
      </div>
      <div className="admin-toolbar-actions">
        <button className="admin-btn" type="button" onClick={loadMetrics} disabled={loading}>
          {loading ? "⏳" : "🔄"} {t("refreshMetrics")}
        </button>
        <button className="admin-btn admin-btn-primary" type="button" onClick={exportReport} disabled={!dashboardMetrics}>
          📥 {t("exportAuditReport")}
        </button>
      </div>
    </div>

    {feedback && (
      <div className="account-feedback success" style={{ margin: "0 0 16px 0" }}>
        {feedback}
      </div>
    )}

    {/* Primary KPIs: Accesses, Registered Accounts, Characters Created */}
    <section className="metric-grid">
      <article>
        <div className="metric-header">
          <span>{t("totalAccesses")}</span>
          <span className="metric-badge">👁️ +{dashboardMetrics?.accessesToday ?? 0} {t("accessesToday").toLowerCase()}</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.totalAccesses.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">Visitas e sessões registradas</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("registeredAccounts")}</span>
          <span className="metric-badge">👥 {dashboardMetrics?.adminUsers ?? 1} admins</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.registeredAccounts.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">Usuários cadastrados no banco</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("charactersCreated")}</span>
          <span className="metric-badge">🧙 Remaster: {dashboardMetrics?.characterRulesetDistribution.remaster ?? 0}</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.charactersCreated.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">Fichas criadas e salvas na nuvem</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("activeCampaigns")}</span>
          <span className="metric-badge">🎲 Mesas</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.activeCampaigns.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">Campanhas ativas criadas</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("adminVerified")}</span>
          <span className="metric-badge">✅ Pronto</span>
        </div>
        <strong>{compendiumMetrics.verified.toLocaleString(locale)}</strong>
        <span className="metric-subtext">Itens, magias e talentos oficiais</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("adminReview")}</span>
          <span className="metric-badge">⏳ Fila</span>
        </div>
        <strong>{compendiumMetrics.review.toLocaleString(locale)}</strong>
        <span className="metric-subtext">Registros aguardando revisão</span>
      </article>
    </section>

    {/* Tables Section: Recent Visits Log & Registered Users */}
    <div className="admin-sections-grid">
      <section className="admin-table-panel">
        <h2>📊 {t("recentVisitsLog")} ({dashboardMetrics?.recentAccesses?.length ?? 0})</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t("timestampColumn")}</th>
                <th>{t("routeColumn")}</th>
                <th>{t("userTypeColumn")}</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {dashboardMetrics && dashboardMetrics.recentAccesses && dashboardMetrics.recentAccesses.length > 0 ? (
                dashboardMetrics.recentAccesses.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleTimeString(locale)}</td>
                    <td><span className="route-pill">#/{log.route}</span></td>
                    <td>
                      <span className={`role-badge ${log.userType}`}>{log.userType}</span>
                    </td>
                    <td>{log.username || (log.userType === "guest" ? t("guest") : "Anônimo")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "var(--pb-text-muted)", padding: "16px" }}>
                    Nenhum acesso recente registrado nesta sessão.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-table-panel">
        <h2>👥 {t("registeredUsersList")} ({dashboardMetrics?.usersList?.length ?? 0})</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>E-mail</th>
                <th>{t("roleColumn")}</th>
                <th>{t("registeredDate")}</th>
              </tr>
            </thead>
            <tbody>
              {dashboardMetrics && dashboardMetrics.usersList && dashboardMetrics.usersList.length > 0 ? (
                dashboardMetrics.usersList.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.email || "—"}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>{user.role}</span>
                    </td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(locale)
                        : "Recente"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "var(--pb-text-muted)", padding: "16px" }}>
                    Nenhuma conta cadastrada encontrada no banco de dados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <section className="portal-panel admin-note">
      <h2>{t("adminReadOnly")}</h2>
      <p>{t("adminReadOnlyCopy")}</p>
    </section>
  </main>;
}

export function PortalPages() {
  const { t } = useI18n();
  const account = useAccountViewState();
  const [route, setRoute] = useState<PortalRoute>(getRoute);
  useEffect(() => {
    const update = () => {
      const currentRoute = getRoute();
      setRoute(currentRoute);
      recordAppAccess(currentRoute);
    };
    recordAppAccess(getRoute());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useLayoutEffect(() => {
    const builder = document.getElementById("legacy-builder-root");
    const characterTab = document.getElementById("topCharTab");
    const onBuilder = route === "builder";
    if (builder) builder.hidden = !onBuilder;
    if (characterTab) characterTab.hidden = !onBuilder;
    document.body.classList.toggle("portal-page-active", !onBuilder);
    if (!onBuilder) requestAnimationFrame(() => document.getElementById("portal-content")?.focus({ preventScroll: true }));
    const pageLabel = navItems.find((item) => item.route === route)?.label;
    const updateTitle = () => {
      if (!onBuilder && pageLabel) document.title = `${t(pageLabel)} | Pathbuilder 2e Local`;
    };
    updateTitle();
    window.addEventListener("pathbuilder:character-render", updateTitle);
    return () => window.removeEventListener("pathbuilder:character-render", updateTitle);
  }, [route, t]);

  return <>
    <nav className="portal-nav" aria-label={t("navLabel")}>
      {navItems.filter((item) => item.route !== "admin" || account.isAdmin).map((item) => <a key={item.route} href={`#/${item.route}`} aria-current={route === item.route ? "page" : undefined}><span aria-hidden="true">{item.icon}</span>{t(item.label)}</a>)}
    </nav>
    {route === "library" && <LibraryPage />}
    {route === "campaigns" && <CampaignsPage />}
    {route === "compendium" && <CatalogPage />}
    {route === "rules" && <RulesPage />}
    {route === "downloads" && <DownloadsPage />}
    {route === "privacy" && <PrivacyPage />}
    {route === "admin" && <AdminPage />}
  </>;
}
