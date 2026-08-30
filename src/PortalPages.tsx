import { useEffect, useMemo, useState, type FormEvent } from "react";
import { pathfinderSources } from "./data/sources";
import { useI18n, getItemDisplayName, type MessageKey } from "./i18n";
import type { PickerItem, PickerType } from "./types";
import { useAccountViewState } from "./accountState";
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
  type CloudCharacter,
} from "./services/characters";
import "./portal.css";

type PortalRoute = "builder" | "compendium" | "rules" | "library" | "privacy" | "admin";

const routes: PortalRoute[] = ["builder", "compendium", "rules", "library", "privacy", "admin"];
const navItems: Array<{ route: PortalRoute; label: MessageKey; icon: string }> = [
  { route: "library", label: "navLibrary", icon: "🛡" },
  { route: "builder", label: "navBuilder", icon: "⚔" },
  { route: "compendium", label: "navCompendium", icon: "📖" },
  { route: "rules", label: "navRules", icon: "📜" },
  { route: "privacy", label: "navPrivacy", icon: "🔒" },
  { route: "admin", label: "navAdmin", icon: "⚙" },
];

const catalogCategories: Array<{ type: PickerType; label: MessageKey }> = [
  { type: "ancestry", label: "ancestries" },
  { type: "heritage", label: "heritages" },
  { type: "class", label: "classes" },
  { type: "background", label: "backgrounds" },
  { type: "archetype", label: "archetypes" },
  { type: "spell", label: "spells" },
  { type: "ritual", label: "rituals" },
  { type: "feat", label: "feats" },
  { type: "weapon", label: "weapons" },
  { type: "armor", label: "armors" },
  { type: "condition", label: "conditions" },
  { type: "buff", label: "buffs" },
];

const validationCopy: Record<"pt-BR" | "en" | "es", string[]> = {
  "pt-BR": [
    "Classes Remaster usam CD de classe Treinado no nível 1 e salvamentos por proficiência.",
    "Perícias e Saberes recebem modificadores de atributo, proficiência e nível do personagem.",
    "Magias organizam ranques de 1 a 10 e validam compatibilidade com tradições da classe.",
    "Exportação PDF preserva os 1087 campos de formulário editáveis oficiais do Pathfinder 2e.",
  ],
  en: [
    "Remaster classes use Trained class DC at level 1 and proficiency-based saves.",
    "Skills and Lores compute ability, proficiency, and character level modifiers.",
    "Spells organize ranks 1 through 10 and validate class tradition compatibility.",
    "PDF export preserves all 1,087 official fillable Pathfinder 2e form fields.",
  ],
  es: [
    "Las clases Remaster usan CD de clase Entrenada a nivel 1 y salvaciones por competencia.",
    "Las habilidades y saberes calculan modificadores de atributo, competencia y nivel.",
    "Los conjuros organizan rangos del 1 al 10 y validan compatibilidad con tradiciones.",
    "La exportación PDF preserva los 1.087 campos de formulario editables oficiales de PF2e.",
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
  const entries = useMemo(() => catalogCategories.flatMap(({ type, label }) => {
    try {
      return (window as any).app?.getPickerItems(type).map((item: any) => ({ ...item, category: type, categoryLabel: t(label) })) || [];
    } catch {
      return [];
    }
  }), [t]);
  const filtered = useMemo(() => {
    const list = entries.filter((entry) => {
      const categoryMatches = category === "all" || entry.category === category;
      const localizedName = getItemDisplayName(entry, locale);
      const localizedSummary = entry.data.summaries?.[locale] ?? entry.data.description ?? "";
      const haystack = `${localizedName} ${entry.name} ${localizedSummary}`.toLocaleLowerCase(locale);
      const queryMatches = haystack.includes(query.trim().toLocaleLowerCase(locale));
      return categoryMatches && queryMatches;
    });

    return list.slice().sort((a, b) => {
      const nameA = getItemDisplayName(a, locale);
      const nameB = getItemDisplayName(b, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [category, entries, locale, query]);

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
    <h2>{getItemDisplayName(entry, locale)}</h2>
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
  const [session, setSession] = useState<AuthSession | null>(null);
  const [characters, setCharacters] = useState<CloudCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadUserCharacters = async (activeSession: AuthSession) => {
    setLoading(true);
    setError(null);
    try {
      const list = await listCharacters(activeSession.user);
      setCharacters(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar fichas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getCurrentSession().then((cur) => {
      setSession(cur);
      if (cur) void loadUserCharacters(cur);
    });

    const unsubscribe = subscribeToAuth((next) => {
      setSession(next);
      if (next) void loadUserCharacters(next);
      else setCharacters([]);
    });
    return unsubscribe;
  }, []);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setWorking("auth");
    setError(null);
    setNotice(null);
    try {
      if (authMode === "signup") {
        const next = await signUp(username, email, password);
        setSession(next);
        setNotice("Conta criada com sucesso! Bem-vindo.");
      } else {
        const next = await signIn(email, password);
        setSession(next);
        setNotice("Conectado com sucesso!");
      }
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha na autenticação.");
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
    if (!window.confirm(`Excluir '${char.name}' da sua conta?`)) return;
    if (!session) return;
    setWorking(char.id);
    try {
      await deleteCharacter(char.id, session.user);
      setCharacters((prev) => prev.filter((c) => c.id !== char.id));
      setNotice("Personagem excluído com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir.");
    } finally {
      setWorking(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    setCharacters([]);
  };

  if (!session) {
    return (
      <main className="portal-page library-auth-page" id="portal-content" tabIndex={-1}>
        <div className="auth-card-hero">
          <span className="auth-kicker">PATHBUILDER 2E · CONSTRUTOR DE PERSONAGENS</span>
          <h1>Acesso à Sua Biblioteca</h1>
          <p>Entre na sua conta para acessar e gerenciar apenas os seus personagens, ou crie uma conta em segundos.</p>
        </div>

        <div className="auth-main-container">
          <form className="auth-card" onSubmit={handleAuth}>
            <div className="auth-switch" role="tablist">
              <button
                type="button"
                className={authMode === "signin" ? "active" : ""}
                onClick={() => { setAuthMode("signin"); setError(null); setNotice(null); }}
              >
                Entrar
              </button>
              <button
                type="button"
                className={authMode === "signup" ? "active" : ""}
                onClick={() => { setAuthMode("signup"); setError(null); setNotice(null); }}
              >
                Criar Nova Conta
              </button>
            </div>

            {authMode === "signup" && (
              <label>
                Nome de Usuário
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: MestreArthur"
                  required
                />
              </label>
            )}

            <label>
              {authMode === "signup" ? "E-mail" : "Usuário ou E-mail"}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={authMode === "signup" ? "seu@email.com" : "seu_usuario ou seu@email.com"}
                required
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </label>

            <button className="auth-submit-btn" type="submit" disabled={working === "auth"}>
              {working === "auth" ? "Processando…" : authMode === "signup" ? "Criar Minha Conta" : "Entrar na Minha Conta"}
            </button>

            {error && <div className="account-feedback error" role="alert">{error}</div>}
            {notice && <div className="account-feedback success" role="status">{notice}</div>}
          </form>

          <div className="auth-guest-card">
            <span className="guest-icon">⚔️</span>
            <h3>Deseja apenas testar?</h3>
            <p>Você pode acessar o construtor diretamente sem login no modo rápido.</p>
            <button
              type="button"
              className="guest-btn"
              onClick={() => {
                (window as any).app?.createNewCharacter();
                window.location.hash = "#/builder";
              }}
            >
              Criar Ficha Rápida (Convidado)
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
          <span className="account-kicker">CONECTADO COMO</span>
          <h1>Biblioteca de {session.user.username}</h1>
          <p>Gerencie seus personagens criados. Apenas você tem acesso às suas fichas nesta conta.</p>
        </div>
        <div className="library-header-actions">
          <button className="create-char-hero-btn" type="button" onClick={handleCreateNew}>
            ➕ Criar Novo Personagem
          </button>
          <button className="signout-alt-btn" type="button" onClick={handleSignOut}>
            🚪 Sair da Conta
          </button>
        </div>
      </header>

      {error && <div className="account-feedback error" role="alert">{error}</div>}
      {notice && <div className="account-feedback success" role="status">{notice}</div>}

      <section className="library-characters-section">
        <div className="section-heading">
          <h2>Meus Personagens</h2>
          <span className="char-count-badge">{characters.length}</span>
        </div>

        {loading ? (
          <div className="portal-empty">Carregando seus personagens…</div>
        ) : characters.length === 0 ? (
          <div className="portal-empty-card">
            <span className="empty-icon">📜</span>
            <h3>Você ainda não possui nenhum personagem nesta conta</h3>
            <p>Clique no botão abaixo para criar sua primeira ficha no construtor completo com regras Remaster e IA.</p>
            <button type="button" className="create-char-hero-btn" onClick={handleCreateNew}>
              ➕ Começar Primeiro Personagem
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
                        {charData.ancestry || "Humano"} · {charData.class || "Guerreiro"}
                      </span>
                    </div>
                    <span className="char-level-badge">Nível {char.level}</span>
                  </div>

                  <div className="char-card-stats">
                    <span><strong>CA:</strong> {charData.ac || 10 + Number(char.level)}</span>
                    <span><strong>PV:</strong> {charData.maxHp || 20}</span>
                    <span><strong>Atualizado:</strong> {new Date(char.updated_at).toLocaleDateString()}</span>
                  </div>

                  <div className="char-card-actions">
                    <button
                      className="btn-card-open"
                      type="button"
                      onClick={() => handleLoadCharacter(char)}
                    >
                      ⚔️ Abrir no Construtor
                    </button>
                    <button
                      className="btn-card-delete"
                      type="button"
                      onClick={() => handleDeleteCharacter(char)}
                      disabled={working === char.id}
                      title="Excluir ficha"
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
    <header className="portal-hero"><span>PRIVACY BY DESIGN</span><h1>{t("privacyPageTitle")}</h1><p>{t("privacyPageIntro")}</p></header>
    <section className="privacy-grid">{cards.map(([title, copy, icon]) => <article className="portal-panel" key={title}><span className="panel-icon" aria-hidden="true">{icon}</span><h2>{t(title)}</h2><p>{t(copy)}</p></article>)}</section>
  </main>;
}

function AdminPage() {
  const { t } = useI18n();
  const account = useAccountViewState();
  const metrics = useMemo(() => {
    const records = catalogCategories.flatMap(({ type }) => {
      try { return (window as any).app?.getPickerItems(type) || []; } catch { return []; }
    });
    return {
      verified: records.filter((record: any) => record.data.needs_review === false && record.data.source?.book && record.data.source?.page).length,
      review: records.filter((record: any) => record.data.needs_review !== false).length,
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
    {route === "library" && <LibraryPage />}
    {route === "compendium" && <CatalogPage />}
    {route === "rules" && <RulesPage />}
    {route === "privacy" && <PrivacyPage />}
    {route === "admin" && <AdminPage />}
  </>;
}
