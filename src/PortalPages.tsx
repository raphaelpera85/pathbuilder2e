import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  pathfinderSources,
  additionalDownloadResources,
  type PathfinderSource,
  GOOGLE_DRIVE_FOLDER_URL,
  BLANK_SHEET_DRIVE_URL,
  googleDriveMapFiles,
  GOOGLE_DRIVE_LIBRARY_FOLDERS,
} from "./data/sources";
import { googleDrivePdfs } from "./data/googleDrivePdfs";
import { useI18n, applyLegacyTranslations, getItemDisplayName, type MessageKey } from "./i18n";
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
  saveCharacter,
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
import { getWeaponImageAlt, getWeaponImageUrl } from "./weaponVisuals";
import { getItemImageAlt, getItemImageUrl } from "./itemVisuals";
import { SystemSelectorModal } from "./SystemSelectorModal";
import { OseCharacterCreatorModal, type OseCharacterCreatedData } from "./ose/OseCharacterCreatorModal";
import { OseCharacterSheet } from "./ose/OseCharacterSheet";
import type { RPGSystemId } from "./types";
import "./portal.css";

type PortalRoute = "builder" | "compendium" | "rules" | "downloads" | "library" | "campaigns" | "privacy" | "admin";

const routes: PortalRoute[] = ["builder", "compendium", "rules", "downloads", "library", "campaigns", "privacy", "admin"];
const navItems: Array<{ route: PortalRoute; label: MessageKey; shortLabel?: MessageKey; icon: string }> = [
  { route: "library", label: "navLibrary", shortLabel: "navLibraryShort", icon: "🛡" },
  { route: "campaigns", label: "navCampaigns", shortLabel: "navCampaignsShort", icon: "🏰" },
  { route: "builder", label: "navBuilder", icon: "⚔" },
  { route: "compendium", label: "navCompendium", icon: "📖" },
  { route: "rules", label: "navRules", shortLabel: "navRulesShort", icon: "📜" },
  { route: "downloads", label: "navDownloads", shortLabel: "navDownloadsShort", icon: "📚" },
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
  const inspectedCloseRef = useRef<HTMLButtonElement>(null);
  const [syncStatus, setSyncStatus] = useState<CatalogSyncStatus>(getCatalogSyncStatus());
  const [remoteItemsByCategory, setRemoteItemsByCategory] = useState<Partial<Record<PickerType, PickerItem[]>>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [catalogLoadFailed, setCatalogLoadFailed] = useState(false);

  // Efeito para carregar dados remotos do Supabase
  useEffect(() => {
    let isMounted = true;
    setIsCatalogLoading(true);
    setCatalogLoadFailed(false);
    const loadCategory = async (type: PickerType) => {
      try {
        const result = await fetchCatalogCategory(type);
        if (isMounted) {
          if (result.items.length > 0) {
            setRemoteItemsByCategory((prev) => ({ ...prev, [type]: result.items }));
          }
          // Um fallback local em uma categoria não deve esconder que as demais
          // continuam sendo servidas pelo Supabase.
          if (result.source === "supabase") {
            setSyncStatus((prev) => ({ ...prev, source: "supabase" }));
          }
        }
        return result;
      } catch (err) {
        console.warn(`[Catalog] Não foi possível carregar ${type}:`, err);
        return null;
      }
    };

    if (category === "all") {
      // Carrega todas as 18 categorias relacionais do Supabase em lotes paralelos
      const allTypes: PickerType[] = catalogCategories.map((c) => c.type);
      const BATCH_SIZE = 4;
      (async () => {
        let degraded = false;
        for (let i = 0; i < allTypes.length; i += BATCH_SIZE) {
          if (!isMounted) break;
          const batch = allTypes.slice(i, i + BATCH_SIZE);
          const results = await Promise.all(batch.map((type) => loadCategory(type)));
          degraded = degraded || results.some((result) => !result || result.source !== "supabase");
        }
        if (isMounted) {
          setCatalogLoadFailed(degraded);
          setIsCatalogLoading(false);
        }
      })();
    } else {
      void loadCategory(category).then((result) => {
        if (!isMounted) return;
        setCatalogLoadFailed(!result || result.source !== "supabase");
        setIsCatalogLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setIsCatalogLoading(true);
    setCatalogLoadFailed(false);
    try {
      const typesToSync: PickerType[] = category === "all" ? catalogCategories.map((c) => c.type) : [category];
      const BATCH_SIZE = 4;
      let degraded = false;
      for (let i = 0; i < typesToSync.length; i += BATCH_SIZE) {
        const batch = typesToSync.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(
          batch.map(async (type) => {
            const result = await fetchCatalogCategory(type, { forceRemote: true });
            if (result.items.length > 0) {
              setRemoteItemsByCategory((prev) => ({ ...prev, [type]: result.items }));
            }
            if (result.source === "supabase") setSyncStatus((prev) => ({ ...prev, source: "supabase" }));
            return result;
          })
        );
        degraded = degraded || results.some((result) => result.source !== "supabase");
      }
      setCatalogLoadFailed(degraded);
    } finally {
      setIsSyncing(false);
      setIsCatalogLoading(false);
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

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const activeFiltersCount = (category !== "all" ? 1 : 0) +
    (rulesetFilter !== "all" ? 1 : 0) +
    (rarityFilter !== "all" ? 1 : 0) +
    (bookFilter !== "all" ? 1 : 0);

  useEffect(() => {
    if (!inspectedEntry) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusCloseButton = window.requestAnimationFrame(() => inspectedCloseRef.current?.focus());
    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setInspectedEntry(null);
        return;
      }
      if (event.key !== "Tab" || !inspectedCloseRef.current) return;
      const dialog = inspectedCloseRef.current.closest("[role=dialog]");
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.removeEventListener("keydown", handleDialogKeyDown);
      previousFocus?.focus();
    };
  }, [inspectedEntry]);

  return <main className="portal-page portal-catalog-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero">
      <span>{t("compendiumKicker")}</span>
      <h1>{t("compendiumTitle")}</h1>
      <p>{t("compendiumIntro")}</p>
    </header>
    <section className={`catalog-toolbar ${showMobileFilters ? "filters-expanded" : "filters-collapsed"}`} aria-label={t("searchOptions")}>
      <div className="catalog-toolbar-top-row">
        <label className="catalog-search-label"><span>{t("catalogSearch")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={t("search")} /></label>
        <button
          type="button"
          className={`catalog-mobile-filter-btn ${activeFiltersCount > 0 ? "has-active" : ""}`}
          onClick={() => setShowMobileFilters((prev) => !prev)}
          aria-expanded={showMobileFilters}
        >
          {showMobileFilters ? "✕ " : "⚙️ "}
          {showMobileFilters ? t("hideFilters") : t("toggleFilters")}
          {activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
        </button>
      </div>
      <div className="catalog-filters-collapsible">
        <label><span>{t("filterCategory")}</span><select value={category} onChange={(event) => setCategory(event.target.value as PickerType | "all")}><option value="all">{t("allCategories")}</option>{catalogCategories.map((item) => <option key={item.type} value={item.type}>{t(item.label)}</option>)}</select></label>
        <label><span>{t("filterRuleset")}</span><select value={rulesetFilter} onChange={(event) => setRulesetFilter(event.target.value)}><option value="all">{t("allRulesets")}</option><option value="remaster">{t("rulesetRemaster")}</option><option value="legacy">{t("rulesetLegacy")}</option><option value="needs_review">{t("rulesetReview")}</option></select></label>
        <label><span>{t("filterRarity")}</span><select value={rarityFilter} onChange={(event) => setRarityFilter(event.target.value)}><option value="all">{t("allRarities")}</option><option value="common">{t("rarityCommon")}</option><option value="uncommon">{t("rarityUncommon")}</option><option value="rare">{t("rarityRare")}</option></select></label>
        {availableBooks.length > 0 && <label><span>{t("filterBook")}</span><select value={bookFilter} onChange={(event) => setBookFilter(event.target.value)}><option value="all">{t("allBooks")}</option>{availableBooks.map((b) => <option key={b} value={b}>{localizeSourceBook(b, locale)}</option>)}</select></label>}
      </div>
      <div className="catalog-toolbar-bottom-row">
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
      </div>
    </section>
    {isCatalogLoading && entries.length === 0 ? <div className="portal-empty" role="status">{t("loadingCatalog")}</div>
      : catalogLoadFailed && entries.length === 0 ? <div className="portal-empty" role="alert"><p>{t("catalogLoadFailed")}</p><button type="button" onClick={handleManualSync} disabled={isSyncing}>{t("retry")}</button></div>
      : filtered.length === 0 ? <div className="portal-empty">{t("noCatalogResults")}</div> : <section className="catalog-grid" aria-label={t("compendiumTitle")}>
      {filtered.map((entry, index) => <CatalogCard key={`${entry.category}-${entry.name}-${index}`} entry={entry} onInspect={() => setInspectedEntry(entry)} />)}
    </section>}

    {/* MODAL DE INSPEÇÃO DETALHADA */}
    {inspectedEntry && <div className="compendium-modal-overlay" onClick={() => setInspectedEntry(null)} role="dialog" aria-modal="true" aria-labelledby="compendium-modal-title">
      <div className="compendium-modal" onClick={(e) => e.stopPropagation()}>
        <header className="compendium-modal-header">
          <div className="compendium-modal-title">
            <span className="category-tag">{inspectedEntry.categoryLabel}</span>
            <h2 id="compendium-modal-title">{getItemDisplayName(inspectedEntry, locale)}</h2>
          </div>
          <button ref={inspectedCloseRef} type="button" className="compendium-modal-close" onClick={() => setInspectedEntry(null)} aria-label={t("close")}>✕</button>
        </header>

        <div className="compendium-modal-body">
          {(inspectedEntry.category === "weapon" || inspectedEntry.category === "item" || inspectedEntry.category === "gear") && <img className="weapon-visual weapon-visual-modal" src={inspectedEntry.category === "weapon" ? getWeaponImageUrl(inspectedEntry.data) : getItemImageUrl(inspectedEntry.data)} alt={inspectedEntry.category === "weapon" ? getWeaponImageAlt(getItemDisplayName(inspectedEntry, locale), inspectedEntry.data, locale) : getItemImageAlt(getItemDisplayName(inspectedEntry, locale), inspectedEntry.data, locale)} />}
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
            {inspectedEntry.data.variantFamily ? <div className="stat-box"><strong>{locale === "en" ? "Variant" : locale === "es" ? "Variante" : "Variante"}</strong><span>{inspectedEntry.data.variantRole === "ranged" ? (locale === "en" ? "Ranged" : locale === "es" ? "A distancia" : "À distância") : inspectedEntry.data.variantRole === "melee" ? (locale === "en" ? "Melee" : locale === "es" ? "Cuerpo a cuerpo" : "Corpo a corpo") : inspectedEntry.data.variantFamily}</span></div> : null}
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
  const isWeapon = entry.category === "weapon";
  const isItem = entry.category === "item" || entry.category === "gear";
  const displayName = getItemDisplayName(entry, locale);
  const range = entry.data.rangeFeet ?? entry.data.range;
  const facts = [
    isWeapon && entry.data.damage ? `${t("damage")}: ${String(entry.data.damage)}` : null,
    isWeapon && entry.data.damageType ? `${t("damageType")}: ${String(entry.data.damageType)}` : null,
    isWeapon && range != null ? `${t("range")}: ${String(range)} ${t("feet")}` : null,
    isWeapon && entry.data.hands !== undefined ? `${t("hands")}: ${String(entry.data.hands)}` : null,
    isWeapon && entry.data.reload != null ? `${t("reload")}: ${String(entry.data.reload)}` : null,
    isWeapon && entry.data.weaponCategory ? `${t("weaponCategory")}: ${String(entry.data.weaponCategory)}` : null,
    isWeapon && entry.data.weaponGroup ? `${t("weaponGroup")}: ${String(entry.data.weaponGroup)}` : null,
    typeof entry.data.rank === "number" ? `${t("rank")} ${entry.data.rank}` : null,
    typeof entry.data.level === "number" ? `${t("level")} ${entry.data.level}` : null,
    castingTimes?.[locale] ? `${t("castingTime")}: ${castingTimes[locale]}` : null,
    getTraditionDisplayNames(entry.data.traditions, traditionNames, locale).length
      ? `${t("traditions")}: ${getTraditionDisplayNames(entry.data.traditions, traditionNames, locale).join(", ")}` : null,
    (primaryChecks?.[locale] || primaryChecks?.["pt-BR"] || primaryChecks?.en)
      ? `${t("primaryCheck")}: ${getLocalizedSkillName(primaryChecks?.[locale] || primaryChecks?.["pt-BR"] || primaryChecks?.en, locale)}` : null,
    entry.data.price ? `${t("price")}: ${formatPriceToLocale(entry.data.price, locale)}` : null,
    entry.data.variantFamily ? `${locale === "en" ? "Variant" : locale === "es" ? "Variante" : "Variante"}: ${entry.data.variantRole === "ranged" ? (locale === "en" ? "Ranged" : locale === "es" ? "A distancia" : "À distância") : entry.data.variantRole === "melee" ? (locale === "en" ? "Melee" : locale === "es" ? "Cuerpo a cuerpo" : "Corpo a corpo") : entry.data.variantFamily}` : null,
  ].filter((fact): fact is string => Boolean(fact));
  return <article className="catalog-card interactive" onClick={onInspect} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onInspect?.()} role="button" aria-label={displayName}>
    <div className="catalog-card-top"><div className="catalog-card-meta"><span>{entry.categoryLabel}</span>{rarity && <span className={`rarity-badge ${String(entry.data.rarity)}`}>{rarity}</span>}</div><div className="catalog-card-status"><span className={legacy ? "source-badge legacy" : verified ? "source-badge verified" : "source-badge review"}>{legacy ? t("catalogLegacy") : verified ? t("catalogVerified") : t("catalogReview")}</span>{approximateSource && <span className="source-badge review">{t("sourceSectionReference")}</span>}{translationPending && <span className="source-badge translation-pending">{t("translationPending")}</span>}</div></div>
    {(isWeapon || isItem) && <img className="weapon-visual weapon-visual-card" src={isWeapon ? getWeaponImageUrl(entry.data) : getItemImageUrl(entry.data)} alt={isWeapon ? getWeaponImageAlt(displayName, entry.data, locale) : getItemImageAlt(displayName, entry.data, locale)} loading="lazy" />}
    <h2>{displayName}</h2>
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

  const allDownloadItems = useMemo(() => [...additionalDownloadResources, ...pathfinderSources], []);

  const filteredSources = useMemo(() => {
    return allDownloadItems.filter((source) => {
      const title = localizeSourceTitle(source, locale).toLowerCase();
      const filename = (source.filename || "").toLowerCase();
      const matchesQuery = !query || title.includes(query.toLowerCase()) || filename.includes(query.toLowerCase());
      const matchesRuleset = rulesetFilter === "all" || source.ruleset === rulesetFilter;
      const matchesLang = langFilter === "all" || source.language === langFilter;
      return matchesQuery && matchesRuleset && matchesLang;
    });
  }, [allDownloadItems, query, rulesetFilter, langFilter, locale]);

  return (
    <section className="downloads-section" aria-label={t("downloadsTitle")}>
      <div className="downloads-header-card">
        <div className="downloads-header-info">
          <span className="downloads-kicker">{t("downloadsKicker")}</span>
          <h2>{t("downloadsTitle")}</h2>
          <p>{t("downloadsIntro")}</p>
          <small className="downloads-note">ℹ️ {t("downloadDirectNote")}</small>
        </div>
      </div>

      {/* CARD DE DESTAQUE: FICHA EM BRANCO PARA IMPRESSÃO */}
      <div className="blank-sheet-featured-card" role="region" aria-label={t("downloadBlankSheet")}>
        <div className="blank-sheet-featured-info">
          <div className="blank-sheet-featured-badge-row">
            <span className="blank-sheet-featured-kicker">
              🖨️ {locale === "en" ? "Printable Template" : locale === "es" ? "Plantilla para Imprimir" : "Ficha Oficial para Impressão"}
            </span>
            <span className="ruleset-badge remaster">{t("rulesetRemaster")}</span>
          </div>
          <h3>📄 {t("downloadBlankSheet")}</h3>
          <p>
            {locale === "en"
              ? "Official 4-page character sheet template in PDF format. Ready to print directly in high resolution or fill out manually for in-person tabletop sessions."
              : locale === "es"
                ? "Plantilla de ficha de personaje oficial de 4 páginas en PDF. Lista para imprimir en alta resolución o rellenar a mano para partidas presenciales."
                : "Modelo oficial de ficha de personagem de 4 páginas em PDF. Pronta para imprimir em alta resolução ou preencher à mão para mesas de RPG presenciais."}
          </p>
          <div className="blank-sheet-meta">
            <span className="book-meta-item">📄 4 {t("pages")}</span>
            <span className="book-meta-item">🌐 {locale === "en" ? "Portuguese (Brazil)" : locale === "es" ? "Portugués (Brasil)" : "Português (Brasil)"}</span>
            <span className="book-meta-item">📦 ficha.pdf</span>
          </div>
        </div>
        <div className="blank-sheet-featured-actions">
          <a
            href="./ficha.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-print-direct"
            title={locale === "en" ? "Open PDF directly for printing" : locale === "es" ? "Abrir PDF directamente para imprimir" : "Abrir PDF diretamente para imprimir"}
          >
            🖨️ {locale === "en" ? "Print / Open PDF" : locale === "es" ? "Imprimir / Abrir PDF" : "Imprimir / Abrir PDF"}
          </a>
          <a
            href={BLANK_SHEET_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download-primary"
            aria-label={locale === "en" ? "Download Blank Sheet from Google Drive" : locale === "es" ? "Descargar Ficha en Blanco de Google Drive" : "Baixar Ficha em Branco no Google Drive"}
            title={locale === "en" ? "Download Blank Sheet from Google Drive" : locale === "es" ? "Descargar Ficha en Blanco de Google Drive" : "Baixar Ficha em Branco no Google Drive"}
          >
            <span aria-hidden="true">📥</span> {t("downloadPdfDirect")}
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
              {source.id === "official-blank-sheet" && (
                <a
                  href="./ficha.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-print-direct"
                  title={locale === "en" ? "Print / Open PDF" : locale === "es" ? "Imprimir / Abrir PDF" : "Imprimir / Abrir PDF"}
                >
                  🖨️ {locale === "en" ? "Print PDF" : locale === "es" ? "Imprimir PDF" : "Imprimir PDF"}
                </a>
              )}
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
  const { t, locale } = useI18n();
  return (
    <main className="portal-page" id="portal-content" tabIndex={-1}>
      <header className="portal-hero">
        <span>{t("downloadsKicker")}</span>
        <h1>{t("downloadsTitle")}</h1>
        <p>{t("downloadsIntro")}</p>
      </header>
      <BookDownloadsSection />
      <MapDownloadsSection locale={locale} />
      <GoogleDrivePdfDownloadsSection locale={locale} />
      <GoogleDriveLibrarySection locale={locale} />
    </main>
  );
}

function GoogleDrivePdfDownloadsSection({ locale }: { locale: "pt-BR" | "en" | "es" }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const labels = locale === "en"
    ? { kicker: "COMPLETE PDF INDEX · GOOGLE DRIVE", title: "All library PDFs", intro: "Direct links to every active PDF in the synchronized RPG library. Exact duplicates were removed from the active collection.", search: "Search PDFs...", previous: "Previous", next: "Next", empty: "No PDF matches this search", showing: "PDFs", page: "Page" }
    : locale === "es"
      ? { kicker: "ÍNDICE COMPLETO DE PDF · GOOGLE DRIVE", title: "Todos los PDFs de la biblioteca", intro: "Enlaces directos a cada PDF activo de la biblioteca RPG sincronizada. Los duplicados exactos fueron retirados de la colección activa.", search: "Buscar PDFs...", previous: "Anterior", next: "Siguiente", empty: "Ningún PDF coincide con la búsqueda", showing: "PDFs", page: "Página" }
      : { kicker: "ÍNDICE COMPLETO DE PDFs · GOOGLE DRIVE", title: "Todos os PDFs da biblioteca", intro: "Links diretos para cada PDF ativo da biblioteca RPG sincronizada. Os duplicados exatos foram retirados da coleção ativa.", search: "Buscar PDFs...", previous: "Anterior", next: "Próxima", empty: "Nenhum PDF corresponde à busca", showing: "PDFs", page: "Página" };
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return googleDrivePdfs.filter((pdf) => !normalizedQuery || pdf.name.toLowerCase().includes(normalizedQuery));
  }, [query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
  useEffect(() => setPage(0), [query]);
  useEffect(() => { if (page >= pageCount) setPage(pageCount - 1); }, [page, pageCount]);

  return <section className="downloads-section google-drive-pdfs-section" aria-label={labels.title}>
    <div className="downloads-header-card google-drive-pdfs-header-card">
      <div className="downloads-header-info">
        <span className="downloads-kicker">{labels.kicker}</span>
        <h2>📚 {labels.title}</h2>
        <p>{labels.intro}</p>
        <small className="downloads-note">ℹ️ {filtered.length} {labels.showing} · links open directly in Google Drive.</small>
      </div>
    </div>
    <div className="downloads-filter-bar">
      <input type="search" placeholder={labels.search} value={query} onChange={(event) => setQuery(event.target.value)} className="downloads-search-input" aria-label={labels.search} />
    </div>
    {visible.length > 0 ? <div className="downloads-grid google-drive-pdfs-grid">
      {visible.map((pdf) => <article className="book-download-card google-drive-pdf-card" key={pdf.fileId}>
        <div className="book-card-top"><div className="book-card-title-group"><h3>{pdf.name}</h3><span className="book-alt-title">Google Drive · PDF</span></div><span className="ruleset-badge legacy">PDF</span></div>
        <div className="book-card-meta"><span className="book-meta-item">📄 PDF</span><span className="book-meta-item">🌐 Google Drive</span></div>
        <div className="book-card-actions"><a href={`https://drive.google.com/uc?export=download&id=${pdf.fileId}`} target="_blank" rel="noopener noreferrer" className="btn-download-primary" aria-label={`Download PDF: ${pdf.name}`}>📥 {locale === "en" ? "Download PDF" : locale === "es" ? "Descargar PDF" : "Baixar PDF"}</a></div>
      </article>)}
    </div> : <p className="library-empty-state">{labels.empty}</p>}
    <div className="library-pagination" aria-label={`${labels.page} ${page + 1} de ${pageCount}`}>
      <button type="button" disabled={page === 0} onClick={() => setPage((current) => current - 1)}>← {labels.previous}</button>
      <span>{labels.page} {page + 1} / {pageCount}</span>
      <button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((current) => current + 1)}>{labels.next} →</button>
    </div>
  </section>;
}

function MapDownloadsSection({ locale }: { locale: "pt-BR" | "en" | "es" }) {
  const { t } = useI18n();
  const driveUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`;
  const localizeMapName = (name: string) => {
    if (locale === "en") return name;
    const prefix = locale === "es" ? "Mapa póster de Pathfinder" : "Mapa de Pôster Pathfinder";
    return name.replace(/^Pathfinder (Poster )?Map Folio/, prefix);
  };
  return <section className="downloads-section maps-download-section" aria-label={t("mapsTitle")}>
    <div className="downloads-header-card maps-header-card">
      <div className="downloads-header-info">
        <span className="downloads-kicker">{t("mapsKicker")}</span>
        <h2>🗺️ {t("mapsTitle")}</h2>
        <p>{t("mapsIntro")}</p>
        <small className="downloads-note">ℹ️ Links diretos para arquivos compartilhados no Google Drive.</small>
      </div>
      <span className="map-count-badge">{googleDriveMapFiles.length} {t("mapsCount")}</span>
    </div>
    <div className="downloads-grid maps-grid">
      {googleDriveMapFiles.map((map) => <article className="book-download-card map-download-card" key={map.fileId}>
        <div className="book-card-top"><div className="book-card-title-group"><h3>{localizeMapName(map.name)}</h3><span className="book-alt-title">Google Drive · {map.sizeLabel}</span></div><span className="ruleset-badge legacy">PDF</span></div>
        <div className="book-card-meta"><span className="book-meta-item">📄 {map.sizeLabel}</span><span className="book-meta-item">🌐 Google Drive</span></div>
        <div className="book-card-actions"><a href={driveUrl(map.fileId)} target="_blank" rel="noopener noreferrer" className="btn-download-primary" aria-label={`${t("downloadMap")}: ${localizeMapName(map.name)}`}><span aria-hidden="true">📥</span> {t("downloadMap")}</a></div>
      </article>)}
    </div>
    <div className="downloads-repo-actions"><a href={GOOGLE_DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="btn-repo-link secondary">📁 Abrir pasta completa no Google Drive</a></div>
  </section>;
}

function GoogleDriveLibrarySection({ locale }: { locale: "pt-BR" | "en" | "es" }) {
  const labels = locale === "en"
    ? { kicker: "FULL LIBRARY · GOOGLE DRIVE", title: "Images and files", intro: "Open each organized folder to browse and download the complete synchronized library.", open: "Open folder", note: "The folders open directly in Google Drive." }
    : locale === "es"
      ? { kicker: "BIBLIOTECA COMPLETA · GOOGLE DRIVE", title: "Imágenes y archivos", intro: "Abre cada carpeta organizada para explorar y descargar la biblioteca sincronizada completa.", open: "Abrir carpeta", note: "Las carpetas se abren directamente en Google Drive." }
      : { kicker: "BIBLIOTECA COMPLETA · GOOGLE DRIVE", title: "Imagens e arquivos", intro: "Abra cada pasta organizada para navegar e baixar toda a biblioteca sincronizada.", open: "Abrir pasta", note: "As pastas abrem diretamente no Google Drive." };
  const folderUrl = (fileId: string) => `https://drive.google.com/drive/folders/${fileId}`;
  return <section className="downloads-section library-assets-section" aria-label={labels.title}>
    <div className="downloads-header-card library-assets-header-card"><div className="downloads-header-info"><span className="downloads-kicker">{labels.kicker}</span><h2>🗂️ {labels.title}</h2><p>{labels.intro}</p><small className="downloads-note">ℹ️ {labels.note}</small></div></div>
    <div className="library-folder-grid">{GOOGLE_DRIVE_LIBRARY_FOLDERS.map((folder) => <article className="book-download-card library-folder-card" key={folder.fileId}><div className="library-folder-icon" aria-hidden="true">{folder.id === "art" ? "🖼️" : folder.id === "maps" ? "🗺️" : folder.id === "adventures" ? "🏰" : folder.id === "books" ? "📚" : "📄"}</div><div className="book-card-top"><div className="book-card-title-group"><h3>{folder.titles[locale]}</h3><span className="book-alt-title">{folder.countLabels[locale]}</span></div></div><div className="book-card-actions"><a href={folderUrl(folder.fileId)} target="_blank" rel="noopener noreferrer" className="btn-download-primary">📁 {labels.open}</a></div></article>)}</div>
  </section>;
}

type LibraryAsset = { path: string; name: string; group: "arte" | "mapas" | "arquivos" | "outros"; section: string; kind: "image" | "file"; size: number; url: string };

function LibraryAssetsSection({ locale }: { locale: "pt-BR" | "en" | "es" }) {
  const [assets, setAssets] = useState<LibraryAsset[]>([]);
  const [activeGroup, setActiveGroup] = useState<LibraryAsset["group"]>("arte");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);
  const pageSize = 60;

  useEffect(() => {
    let active = true;
    fetch("/api/library")
      .then((response) => response.ok ? response.json() as Promise<{ assets?: LibraryAsset[] }> : Promise.reject(new Error("library unavailable")))
      .then((payload) => { if (active) { setAssets(payload.assets || []); setAvailable(true); } })
      .catch(() => { if (active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  const labels = locale === "en"
    ? { title: "Library media", intro: "Illustrations, creatures, items, scenes, maps and files from your RPG library.", arte: "Illustrations", mapas: "Maps & tiles", arquivos: "Books & files", outros: "Other", search: "Search the library...", open: "Open", download: "Download", previous: "Previous", next: "Next", local: "Local library", unavailable: "Start the local server to load the library.", noLibraryFiles: "No files found.", assetsCatalogued: "assets catalogued" }
    : locale === "es"
      ? { title: "Medios de la biblioteca", intro: "Ilustraciones, criaturas, objetos, escenas, mapas y archivos de tu biblioteca RPG.", arte: "Ilustraciones", mapas: "Mapas y tiles", arquivos: "Libros y archivos", outros: "Otros", search: "Buscar en la biblioteca...", open: "Abrir", download: "Descargar", previous: "Anterior", next: "Siguiente", local: "Biblioteca local", unavailable: "Inicia el servidor local para cargar la biblioteca.", noLibraryFiles: "No se encontraron archivos.", assetsCatalogued: "recursos catalogados" }
      : { title: "Mídias da biblioteca", intro: "Ilustrações, criaturas, itens, cenas, mapas e arquivos da sua biblioteca de RPG.", arte: "Ilustrações", mapas: "Mapas e tiles", arquivos: "Livros e arquivos", outros: "Outros", search: "Buscar na biblioteca...", open: "Abrir", download: "Baixar", previous: "Anterior", next: "Próxima", local: "Biblioteca local", unavailable: "Inicie o servidor local para carregar a biblioteca.", noLibraryFiles: "Nenhum arquivo encontrado.", assetsCatalogued: "assets catalogados" };

  const filtered = useMemo(() => assets.filter((asset) => asset.group === activeGroup && (!query || `${asset.name} ${asset.path}`.toLowerCase().includes(query.toLowerCase()))), [assets, activeGroup, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
  useEffect(() => { setPage(0); }, [activeGroup, query]);

  const countFor = (group: LibraryAsset["group"]) => assets.filter((asset) => asset.group === group).length;
  const groupLabels: Array<[LibraryAsset["group"], string]> = [["arte", labels.arte], ["mapas", labels.mapas], ["arquivos", labels.arquivos], ["outros", labels.outros]];
  const formatSize = (bytes: number) => bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

  return <section className="downloads-section library-assets-section" aria-label={labels.title}>
    <div className="downloads-header-card library-assets-header-card">
      <div className="downloads-header-info"><span className="downloads-kicker">🖼️ {labels.local}</span><h2>{labels.title}</h2><p>{labels.intro}</p><small className="downloads-note">ℹ️ {available === false ? labels.unavailable : `${assets.length} ${labels.assetsCatalogued}`}</small></div>
    </div>
    {available === true && <>
      <div className="library-asset-tabs" role="tablist" aria-label={labels.title}>
        {groupLabels.map(([group, label]) => <button key={group} type="button" className={activeGroup === group ? "active" : ""} onClick={() => setActiveGroup(group)} role="tab" aria-selected={activeGroup === group}>{label} <span>{countFor(group)}</span></button>)}
      </div>
      <div className="downloads-filter-bar"><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="downloads-search-input" aria-label={labels.search} /></div>
      {visible.length > 0 ? <div className="library-assets-grid">
        {visible.map((asset) => <article className="library-asset-card" key={asset.path}>
          {asset.kind === "image" ? <a href={asset.url} target="_blank" rel="noopener noreferrer" className="library-asset-preview"><img src={asset.url} alt={asset.name} loading="lazy" /></a> : <div className="library-file-preview" aria-hidden="true">📄</div>}
          <div className="library-asset-body"><h3 title={asset.name}>{asset.name}</h3><small title={asset.path}>{asset.section} · {formatSize(asset.size)}</small><div className="book-card-actions"><a href={asset.url} target="_blank" rel="noopener noreferrer" className="btn-repo-link secondary">{asset.kind === "image" ? labels.open : labels.download}</a>{asset.kind === "image" && <a href={asset.url} download={asset.name} className="btn-download-primary">📥 {labels.download}</a>}</div></div>
        </article>)}
      </div> : <div className="portal-empty">{labels.noLibraryFiles}</div>}
      {pageCount > 1 && <div className="library-pagination"><button type="button" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}>{labels.previous}</button><span>{page + 1} / {pageCount}</span><button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>{labels.next}</button></div>}
    </>}
  </section>;
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
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false);
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>("all");
  const [isOseWizardOpen, setIsOseWizardOpen] = useState(false);
  const [activeOseCharacter, setActiveOseCharacter] = useState<OseCharacterCreatedData | null>(null);

  useEffect(() => {
    const handleOpenWizard = () => setIsOseWizardOpen(true);
    const handleLoadOse = (e: CustomEvent<OseCharacterCreatedData>) => {
      if (e.detail) setActiveOseCharacter(e.detail);
    };
    window.addEventListener("pathbuilder:open-ose-wizard", handleOpenWizard);
    window.addEventListener("pathbuilder:load-ose-character", handleLoadOse as EventListener);
    return () => {
      window.removeEventListener("pathbuilder:open-ose-wizard", handleOpenWizard);
      window.removeEventListener("pathbuilder:load-ose-character", handleLoadOse as EventListener);
    };
  }, []);

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
    setIsSystemModalOpen(true);
  };

  const handleSelectSystem = (systemId: RPGSystemId) => {
    setIsSystemModalOpen(false);
    if (systemId === "ose") {
      setIsOseWizardOpen(true);
      return;
    }
    (window as any).app?.createNewCharacter(systemId);
    window.location.hash = "#/builder";
  };

  const handleLoadCharacter = (char: CloudCharacter) => {
    const charData = (char.data || {}) as any;
    const sysId = char.system_id || charData.system_id || charData.systemId;
    if (sysId === "ose") {
      setActiveOseCharacter(charData);
      return;
    }
    (window as any).app?.loadCharacter(char.data);
    window.location.hash = "#/builder";
  };

  const handleSaveOseCharacter = async (char: OseCharacterCreatedData) => {
    try {
      if (session) {
        setWorking(char.id);
        const saved = await saveCharacter(char, session.user);
        setCharacters((prev) => {
          const idx = prev.findIndex((c) => (c.character_key || c.id) === char.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
        window.dispatchEvent(new Event("pathbuilder:characters-changed"));
        setNotice(t("saveCurrent"));
      } else {
        localStorage.setItem(`ose_guest_${char.id}`, JSON.stringify(char));
        setNotice("Ficha salva localmente no navegador!");
      }
      setActiveOseCharacter(char);
      setIsOseWizardOpen(false);
    } catch (err: any) {
      setError(err?.message || t("saveCharacterFailed"));
    } finally {
      setWorking(null);
    }
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
              onClick={() => setIsSystemModalOpen(true)}
            >
              {t("createGuestSheet")}
            </button>
          </div>
        </div>
        <SystemSelectorModal
          isOpen={isSystemModalOpen}
          onClose={() => setIsSystemModalOpen(false)}
          onSelectSystem={handleSelectSystem}
        />
        <OseCharacterCreatorModal
          isOpen={isOseWizardOpen}
          onClose={() => setIsOseWizardOpen(false)}
          onCharacterCreated={(newChar) => {
            handleSaveOseCharacter(newChar);
          }}
        />
        {activeOseCharacter && (
          <OseCharacterSheet
            character={activeOseCharacter}
            onCloseSheet={() => setActiveOseCharacter(null)}
            onUpdateCharacter={(updated: OseCharacterCreatedData) => {
              handleSaveOseCharacter(updated);
            }}
          />
        )}
      </main>
    );
  }

  const filteredCharacters = selectedSystemFilter === "all"
    ? characters
    : characters.filter(
        (c) => (c.system_id || (c.data as any)?.system_id || (c.data as any)?.systemId || "pf2e") === selectedSystemFilter
      );

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

        {/* Filtro por Sistema de RPG */}
        <div className="system-filter-tabs flex flex-wrap gap-2 my-4" role="tablist" aria-label={t("systemLabel")}>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSystemFilter === "all" ? "active" : ""
            }`}
            style={{
              backgroundColor: selectedSystemFilter === "all" ? "var(--primary-color, #f97316)" : "rgba(255, 255, 255, 0.06)",
              color: selectedSystemFilter === "all" ? "#ffffff" : "var(--text-color, #f8fafc)",
              border: "1px solid var(--border-color, #334155)",
            }}
            onClick={() => setSelectedSystemFilter("all")}
          >
            🎲 {t("filterAllSystems")} ({characters.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSystemFilter === "pf2e" ? "active" : ""
            }`}
            style={{
              backgroundColor: selectedSystemFilter === "pf2e" ? "#f97316" : "rgba(255, 255, 255, 0.06)",
              color: selectedSystemFilter === "pf2e" ? "#ffffff" : "var(--text-color, #f8fafc)",
              border: "1px solid var(--border-color, #334155)",
            }}
            onClick={() => setSelectedSystemFilter("pf2e")}
          >
            ⚔️ Pathfinder 2e (
            {
              characters.filter(
                (c) => (c.system_id || (c.data as any)?.system_id || (c.data as any)?.systemId || "pf2e") === "pf2e"
              ).length
            }
            )
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSystemFilter === "dnd5e" ? "active" : ""
            }`}
            style={{
              backgroundColor: selectedSystemFilter === "dnd5e" ? "#ef4444" : "rgba(255, 255, 255, 0.06)",
              color: selectedSystemFilter === "dnd5e" ? "#ffffff" : "var(--text-color, #f8fafc)",
              border: "1px solid var(--border-color, #334155)",
            }}
            onClick={() => setSelectedSystemFilter("dnd5e")}
          >
            🐉 D&D 5e (
            {
              characters.filter(
                (c) => (c.system_id || (c.data as any)?.system_id || (c.data as any)?.systemId || "pf2e") === "dnd5e"
              ).length
            }
            )
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSystemFilter === "t20" ? "active" : ""
            }`}
            style={{
              backgroundColor: selectedSystemFilter === "t20" ? "#3b82f6" : "rgba(255, 255, 255, 0.06)",
              color: selectedSystemFilter === "t20" ? "#ffffff" : "var(--text-color, #f8fafc)",
              border: "1px solid var(--border-color, #334155)",
            }}
            onClick={() => setSelectedSystemFilter("t20")}
          >
            🛡️ Tormenta 20 (
            {
              characters.filter(
                (c) => (c.system_id || (c.data as any)?.system_id || (c.data as any)?.systemId || "pf2e") === "t20"
              ).length
            }
            )
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSystemFilter === "ose" ? "active" : ""
            }`}
            style={{
              backgroundColor: selectedSystemFilter === "ose" ? "#d97706" : "rgba(255, 255, 255, 0.06)",
              color: selectedSystemFilter === "ose" ? "#ffffff" : "var(--text-color, #f8fafc)",
              border: "1px solid var(--border-color, #334155)",
            }}
            onClick={() => setSelectedSystemFilter("ose")}
          >
            🎲 Old-School Essentials (
            {
              characters.filter(
                (c) => (c.system_id || (c.data as any)?.system_id || (c.data as any)?.systemId || "pf2e") === "ose"
              ).length
            }
            )
          </button>
        </div>

        {loading ? (
          <div className="portal-empty">{t("loadingCharacters")}</div>
        ) : filteredCharacters.length === 0 ? (
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
            {filteredCharacters.map((char) => {
              const charData = (char.data || {}) as any;
              const systemId = char.system_id || charData.system_id || charData.systemId || "pf2e";
              const systemBadge = systemId === "ose" ? "🎲 OSE" : systemId === "dnd5e" ? "🐉 D&D 5e" : systemId === "t20" ? "🛡️ Tormenta 20" : "⚔️ Pathfinder 2e";
              const badgeColor = systemId === "ose" ? "#d97706" : systemId === "dnd5e" ? "#ef4444" : systemId === "t20" ? "#3b82f6" : "#f97316";

              return (
                <article className="char-library-card" key={char.id}>
                  <div className="char-card-header">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: `${badgeColor}22`,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}44`,
                          }}
                        >
                          {systemBadge}
                        </span>
                      </div>
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

      <SystemSelectorModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
        onSelectSystem={handleSelectSystem}
      />

      <OseCharacterCreatorModal
        isOpen={isOseWizardOpen}
        onClose={() => setIsOseWizardOpen(false)}
        onCharacterCreated={(newChar) => {
          handleSaveOseCharacter(newChar);
        }}
      />

      {activeOseCharacter && (
        <OseCharacterSheet
          character={activeOseCharacter}
          onCloseSheet={() => setActiveOseCharacter(null)}
          onUpdateCharacter={(updated: OseCharacterCreatedData) => {
            handleSaveOseCharacter(updated);
          }}
        />
      )}
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
    if (dashboardMetrics?.catalogVerifiedCount !== undefined && dashboardMetrics?.catalogReviewCount !== undefined) {
      return {
        verified: dashboardMetrics.catalogVerifiedCount,
        review: dashboardMetrics.catalogReviewCount,
        sources: pathfinderSources.filter((source) => source.catalogStatus === "partial").length,
      };
    }
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
  }, [dashboardMetrics?.catalogVerifiedCount, dashboardMetrics?.catalogReviewCount, dashboardMetrics?.catalogCounts]);

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
        {dashboardMetrics?.isRemote && (
          <span style={{
            background: "rgba(16, 185, 129, 0.15)",
            color: "#10b981",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "12px",
            padding: "2px 8px",
            fontSize: "11px",
            fontWeight: "bold",
            marginLeft: "8px"
          }}>
            ⚡ Supabase
          </span>
        )}
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
        <span className="metric-subtext">{t("adminVisitsRegistered")}</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("registeredAccounts")}</span>
          <span className="metric-badge">👥 {dashboardMetrics?.adminUsers ?? 1} {t("adminAdmins")}</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.registeredAccounts.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">{t("adminUsersRegistered")}</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("charactersCreated")}</span>
          <span className="metric-badge">🧙 Remaster: {dashboardMetrics?.characterRulesetDistribution.remaster ?? 0}</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.charactersCreated.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">{t("adminSheetsSaved")}</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("activeCampaigns")}</span>
          <span className="metric-badge">🎲 {t("adminTables")}</span>
        </div>
        <strong>{dashboardMetrics ? dashboardMetrics.activeCampaigns.toLocaleString(locale) : "—"}</strong>
        <span className="metric-subtext">{t("adminCampaignsActive")}</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("adminVerified")}</span>
          <span className="metric-badge">✅ {t("adminSupabase")}</span>
        </div>
        <strong>{compendiumMetrics.verified.toLocaleString(locale)}</strong>
        <span className="metric-subtext">{t("adminItemsRules")}</span>
      </article>

      <article>
        <div className="metric-header">
          <span>{t("adminReview")}</span>
          <span className="metric-badge">⏳ {t("adminQueue")}</span>
        </div>
        <strong>{compendiumMetrics.review.toLocaleString(locale)}</strong>
        <span className="metric-subtext">{t("adminRecordsReview")}</span>
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
                <th>{t("tableUser")}</th>
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
                    {t("noRecentAccesses")}
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
                <th>{t("tableUser")}</th>
                <th>{t("tableEmail")}</th>
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
  }, [route]);

  useEffect(() => {
    const onBuilder = route === "builder";
    const pageLabel = navItems.find((item) => item.route === route)?.label;
    const updateTitle = () => {
      if (onBuilder) {
        applyLegacyTranslations(localStorage.getItem("pathbuilder.locale") === "en" ? "en" : localStorage.getItem("pathbuilder.locale") === "es" ? "es" : "pt-BR");
      } else if (pageLabel) {
        document.title = `${t(pageLabel)} | Pathbuilder 2e Local`;
      }
    };
    updateTitle();
    const titleFrame = window.requestAnimationFrame(updateTitle);
    window.addEventListener("pathbuilder:character-render", updateTitle);
    return () => {
      window.cancelAnimationFrame(titleFrame);
      window.removeEventListener("pathbuilder:character-render", updateTitle);
    };
  }, [route, t]);

  const navRef = useRef<HTMLElement>(null);
  const [scrollState, setScrollState] = useState({ canLeft: false, canRight: false });

  const updateScrollState = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const canLeft = el.scrollLeft > 4;
    const canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setScrollState((prev) => (prev.canLeft !== canLeft || prev.canRight !== canRight ? { canLeft, canRight } : prev));
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const activeEl = el.querySelector<HTMLElement>('[aria-current="page"]');
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [route]);

  const scrollNav = (direction: "left" | "right") => {
    const el = navRef.current;
    if (!el) return;
    const delta = direction === "left" ? -180 : 180;
    if (typeof el.scrollBy === "function") {
      el.scrollBy({ left: delta, behavior: "smooth" });
    } else {
      el.scrollLeft += delta;
    }
    setTimeout(updateScrollState, 150);
  };

  return <>
    <div className={`portal-nav-wrapper ${scrollState.canLeft ? "has-scroll-left" : ""} ${scrollState.canRight ? "has-scroll-right" : ""}`}>
      {scrollState.canLeft && (
        <button
          type="button"
          className="portal-nav-scroll-btn portal-nav-scroll-btn-left"
          onClick={() => scrollNav("left")}
          aria-label="Rolar menu para a esquerda"
          tabIndex={0}
        >
          ‹
        </button>
      )}
      <nav ref={navRef} className="portal-nav" aria-label={t("navLabel")}>
        {navItems.filter((item) => item.route !== "admin" || account.isAdmin).map((item) => (
          <a key={item.route} href={`#/${item.route}`} aria-current={route === item.route ? "page" : undefined}>
            <span aria-hidden="true">{item.icon}</span>
            <span className="nav-label-full">{t(item.label)}</span>
            <span className="nav-label-short">{t(item.shortLabel || item.label)}</span>
          </a>
        ))}
      </nav>
      {scrollState.canRight && (
        <button
          type="button"
          className="portal-nav-scroll-btn portal-nav-scroll-btn-right"
          onClick={() => scrollNav("right")}
          aria-label="Rolar menu para a direita"
          tabIndex={0}
        >
          ›
        </button>
      )}
    </div>
    {route === "library" && <LibraryPage />}
    {route === "campaigns" && <CampaignsPage />}
    {route === "compendium" && <CatalogPage />}
    {route === "rules" && <RulesPage />}
    {route === "downloads" && <DownloadsPage />}
    {route === "privacy" && <PrivacyPage />}
    {route === "admin" && <AdminPage />}
  </>;
}
