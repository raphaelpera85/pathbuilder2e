import { useEffect, useMemo, useState } from "react";
import { pathfinderSources } from "./data/sources";
import { useI18n, type MessageKey } from "./i18n";
import type { PickerItem, PickerType } from "./types";
import { useAccountViewState } from "./accountState";
import "./portal.css";

type PortalRoute = "builder" | "compendium" | "rules" | "library" | "privacy" | "admin";

const routes: PortalRoute[] = ["builder", "compendium", "rules", "library", "privacy", "admin"];
const navItems: Array<{ route: PortalRoute; label: MessageKey; icon: string }> = [
  { route: "builder", label: "navBuilder", icon: "⚔" },
  { route: "compendium", label: "navCompendium", icon: "📚" },
  { route: "rules", label: "navRules", icon: "⚖" },
  { route: "library", label: "navLibrary", icon: "🛡" },
  { route: "privacy", label: "navPrivacy", icon: "🔒" },
  { route: "admin", label: "navAdmin", icon: "◆" },
];

const catalogCategories: Array<{ type: PickerType; label: MessageKey }> = [
  { type: "ancestry", label: "ancestries" }, { type: "heritage", label: "heritages" }, { type: "class", label: "classes" },
  { type: "background", label: "backgrounds" }, { type: "weapon", label: "weapons" },
  { type: "armor", label: "armors" }, { type: "archetype", label: "archetypes" }, { type: "spell", label: "spells" },
  { type: "ritual", label: "rituals" }, { type: "feat", label: "feats" },
  { type: "condition", label: "conditions" }, { type: "buff", label: "buffs" },
];

const validationCopy = {
  "pt-BR": ["Nível entre 1 e 20.", "Ancestralidade, herança, antecedente e classe compatíveis.", "Quatro aprimoramentos livres de nível 1 em atributos distintos.", "Proficiência adiciona o nível somente a partir de Treinado.", "CA, PV, salvaguardas, Percepção, perícias, CDs e ataques usam cálculos consistentes.", "Itens, moedas, carga e edição das regras permanecem no JSON.", "Incertezas aparecem como avisos, nunca como regras inventadas."],
  en: ["Level between 1 and 20.", "Compatible ancestry, heritage, background, and class.", "Four free level-1 boosts applied to different attributes.", "Proficiency adds level only from Trained onward.", "AC, HP, saves, Perception, skills, DCs, and attacks use consistent calculations.", "Items, currency, bulk, and rules edition remain in the JSON.", "Uncertainty is shown as a warning, never as an invented rule."],
  es: ["Nivel entre 1 y 20.", "Ascendencia, herencia, trasfondo y clase compatibles.", "Cuatro aumentos libres de nivel 1 en atributos diferentes.", "La competencia suma el nivel solo desde Entrenado.", "CA, PG, salvaciones, Percepción, habilidades, CD y ataques usan cálculos consistentes.", "Objetos, monedas, carga y edición de reglas permanecen en el JSON.", "Las dudas aparecen como avisos, nunca como reglas inventadas."],
} as const;

function getRoute(): PortalRoute {
  const candidate = window.location.hash.replace(/^#\/?/, "") as PortalRoute;
  return routes.includes(candidate) ? candidate : "builder";
}

function CatalogPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PickerType | "all">("all");
  const entries = useMemo(() => catalogCategories.flatMap(({ type, label }) => {
    try {
      return window.app.getPickerItems(type).map((item) => ({ ...item, category: type, categoryLabel: t(label) }));
    } catch {
      return [];
    }
  }), [t]);
  const filtered = useMemo(() => entries.filter((entry) => {
    const categoryMatches = category === "all" || entry.category === category;
    const localizedName = entry.data.names?.[locale] ?? entry.name;
    const localizedSummary = entry.data.summaries?.[locale] ?? entry.data.description ?? "";
    const haystack = `${localizedName} ${entry.name} ${localizedSummary}`.toLocaleLowerCase(locale);
    const queryMatches = haystack.includes(query.trim().toLocaleLowerCase(locale));
    return categoryMatches && queryMatches;
  }), [category, entries, locale, query]);

  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>PATHBUILDER KNOWLEDGE BASE</span><h1>{t("compendiumTitle")}</h1><p>{t("compendiumIntro")}</p></header>
    <section className="catalog-toolbar" aria-label={t("searchOptions")}>
      <label><span>{t("catalogSearch")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={t("search")} /></label>
      <label><span>{t("filterCategory")}</span><select value={category} onChange={(event) => setCategory(event.target.value as PickerType | "all")}><option value="all">{t("allCategories")}</option>{catalogCategories.map((item) => <option key={item.type} value={item.type}>{t(item.label)}</option>)}</select></label>
      <strong className="catalog-count" aria-live="polite">{filtered.length} {t("results")}</strong>
    </section>
    {filtered.length === 0 ? <div className="portal-empty">{t("noCatalogResults")}</div> : <section className="catalog-grid" aria-label={t("compendiumTitle")}>
      {filtered.map((entry, index) => <CatalogCard key={`${entry.category}-${entry.name}-${index}`} entry={entry} />)}
    </section>}
  </main>;
}

function CatalogCard({ entry }: { entry: PickerItem & { category: PickerType; categoryLabel: string } }) {
  const { locale, t } = useI18n();
  const source = entry.data.source;
  const verified = Boolean(source?.book && source?.page);
  const legacy = verified && entry.data.ruleset === "legacy";
  const rarity = entry.data.rarity === "rare" ? t("rarityRare") : entry.data.rarity === "uncommon" ? t("rarityUncommon") : entry.data.rarity === "common" ? t("rarityCommon") : null;
  const castingTimes = entry.data.castingTimes as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const traditionNames = entry.data.traditionNames as Partial<Record<"pt-BR" | "en" | "es", string[]>> | undefined;
  const primaryChecks = entry.data.primaryChecks as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const facts = [
    typeof entry.data.rank === "number" ? `${t("rank")} ${entry.data.rank}` : null,
    castingTimes?.[locale] ? `${t("castingTime")}: ${castingTimes[locale]}` : null,
    traditionNames?.[locale]?.length ? `${t("traditions")}: ${traditionNames[locale]?.join(", ")}` : null,
    primaryChecks?.[locale] ? `${t("primaryCheck")}: ${primaryChecks[locale]}` : null,
  ].filter((fact): fact is string => Boolean(fact));
  return <article className="catalog-card">
    <div className="catalog-card-top"><div className="catalog-card-meta"><span>{entry.categoryLabel}</span>{rarity && <span className={`rarity-badge ${String(entry.data.rarity)}`}>{rarity}</span>}</div><span className={legacy ? "source-badge legacy" : verified ? "source-badge verified" : "source-badge review"}>{legacy ? t("catalogLegacy") : verified ? t("catalogVerified") : t("catalogReview")}</span></div>
    <h2>{entry.data.names?.[locale] ?? entry.name}</h2>
    {facts.length > 0 && <div className="catalog-facts">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}
    {(entry.data.summaries?.[locale] ?? entry.data.description) && <p>{entry.data.summaries?.[locale] ?? entry.data.description}</p>}
    <footer>{source?.book ? `${source.book}${source.page ? ` · p. ${source.page}` : ""}` : t("uncatalogued")}</footer>
  </article>;
}

function RulesPage() {
  const { locale, t } = useI18n();
  const rulesetLabel = (ruleset: "remaster" | "legacy" | "needs_review") => ruleset === "remaster" ? t("rulesetRemaster") : ruleset === "legacy" ? t("rulesetLegacy") : t("rulesetReview");
  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>PF2E RULES PROVENANCE</span><h1>{t("rulesTitle")}</h1><p>{t("rulesIntro")}</p></header>
    <section className="rules-layout">
      <article className="portal-panel"><h2>{t("validationTitle")}</h2><ul className="validation-list">{validationCopy[locale].map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article>
      <article className="portal-panel"><h2>{t("sourcesTitle")}</h2><p>{t("sourcesIntro")}</p><div className="source-list">{pathfinderSources.map((source) => <div className="source-row" key={source.id}><div><strong>{source.title}</strong><span>{source.pages} {t("pages")} · {t("pageCountVerified")}</span><small>{t("localLanguage")}: {source.language} · {t("languageInferred")}</small></div><div><span className={`ruleset-badge ${source.ruleset}`}>{rulesetLabel(source.ruleset)}</span><small>{source.linkedRecords} {t("linkedRecords")}</small></div></div>)}</div></article>
    </section>
  </main>;
}

function LibraryPage() {
  const { t } = useI18n();
  return <main className="portal-page library-page" id="portal-content" tabIndex={-1}>
    <section className="library-callout"><span className="library-icon" aria-hidden="true">🛡️</span><div><span>PATHBUILDER CLOUD</span><h1>{t("libraryPageTitle")}</h1><p>{t("libraryPageIntro")}</p><button type="button" onClick={() => window.dispatchEvent(new Event("pathbuilder:open-account"))}>{t("openAccount")}</button></div></section>
    <section className="privacy-card"><h2>{t("privacyTitle")}</h2><p>{t("privacyCopy")}</p></section>
  </main>;
}

function PrivacyPage() {
  const { t } = useI18n();
  const cards: Array<[MessageKey, MessageKey, string]> = [
    ["privacyLocalTitle", "privacyLocalCopy", "💻"], ["privacyCloudTitle", "privacyCloudCopy", "☁️"],
    ["privacyControlTitle", "privacyControlCopy", "🛡️"], ["privacyBooksTitle", "privacyBooksCopy", "📚"],
  ];
  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>PRIVACY BY DESIGN</span><h1>{t("privacyPageTitle")}</h1><p>{t("privacyPageIntro")}</p></header>
    <section className="privacy-grid">{cards.map(([title, copy, icon]) => <article className="portal-panel" key={title}><span className="panel-icon" aria-hidden="true">{icon}</span><h2>{t(title)}</h2><p>{t(copy)}</p></article>)}</section>
  </main>;
}

function AdminPage() {
  const { t } = useI18n();
  const account = useAccountViewState();
  const metrics = useMemo(() => {
    const records = catalogCategories.flatMap(({ type }) => {
      try { return window.app.getPickerItems(type); } catch { return []; }
    });
    return {
      verified: records.filter((record) => record.data.needs_review === false && record.data.source?.book && record.data.source?.page).length,
      review: records.filter((record) => record.data.needs_review !== false).length,
      sources: pathfinderSources.filter((source) => source.catalogStatus === "partial").length,
    };
  }, []);
  if (!account.isAdmin) return <main className="portal-page access-page" id="portal-content" tabIndex={-1}>
    <section className="access-card"><span aria-hidden="true">🔐</span><h1>{t("adminRestricted")}</h1><p>{account.configured ? t("adminRestrictedCopy") : t("adminLocalCopy")}</p><button type="button" onClick={() => window.dispatchEvent(new Event("pathbuilder:open-account"))}>{t("openAccount")}</button></section>
  </main>;
  return <main className="portal-page" id="portal-content" tabIndex={-1}>
    <header className="portal-hero"><span>ADMIN · {account.username}</span><h1>{t("adminTitle")}</h1><p>{t("adminIntro")}</p></header>
    <section className="metric-grid">
      <article><span>{t("adminVerified")}</span><strong>{metrics.verified}</strong></article>
      <article><span>{t("adminReview")}</span><strong>{metrics.review}</strong></article>
      <article><span>{t("adminSources")}</span><strong>{metrics.sources}</strong></article>
    </section>
    <section className="portal-panel admin-note"><h2>{t("adminReadOnly")}</h2><p>{t("adminReadOnlyCopy")}</p></section>
  </main>;
}

export function PortalPages() {
  const { t } = useI18n();
  const account = useAccountViewState();
  const [route, setRoute] = useState<PortalRoute>(getRoute);
  useEffect(() => {
    const update = () => setRoute(getRoute());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
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
    {route === "compendium" && <CatalogPage />}
    {route === "rules" && <RulesPage />}
    {route === "library" && <LibraryPage />}
    {route === "privacy" && <PrivacyPage />}
    {route === "admin" && <AdminPage />}
  </>;
}
