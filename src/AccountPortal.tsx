import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  getCurrentSession,
  signIn,
  signOut,
  signUp,
  subscribeToAuth,
  type AuthSession,
  type UserProfile,
} from "./services/auth";
import {
  deleteCharacter,
  listCharacters,
  saveCharacter,
  type CloudCharacter,
} from "./services/characters";
import { isSupabaseConfigured } from "./lib/supabase";
import "./account.css";
import { useI18n } from "./i18n";
import { updateAccountViewState } from "./accountState";

type AuthMode = "signin" | "signup";

export function AccountPortal() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [characters, setCharacters] = useState<CloudCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openAccount = () => setOpen(true);
    window.addEventListener("pathbuilder:open-account", openAccount);
    return () => window.removeEventListener("pathbuilder:open-account", openAccount);
  }, []);

  const refreshCharacters = useCallback(async (user?: UserProfile) => {
    const targetUser = user || session?.user;
    if (!targetUser) {
      setCharacters([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const items = await listCharacters(targetUser);
      setCharacters(items);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("loadingSheets"));
    } finally {
      setLoading(false);
    }
  }, [session?.user, t]);

  useEffect(() => {
    void getCurrentSession().then((cur) => {
      setSession(cur);
      if (cur) void refreshCharacters(cur.user);
    });

    const unsubscribe = subscribeToAuth((nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        void refreshCharacters(nextSession.user);
      } else {
        setCharacters([]);
      }
    });
    return unsubscribe;
  }, [refreshCharacters]);

  useEffect(() => {
    updateAccountViewState({
      configured: isSupabaseConfigured,
      authenticated: Boolean(session),
      isAdmin: session?.user?.role === "admin",
      username: session?.user?.username ?? null,
    });
  }, [session]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const submitAuth = async (event: FormEvent) => {
    event.preventDefault();
    setWorking("auth");
    setError(null);
    setNotice(null);
    try {
      if (authMode === "signup") {
        const newSession = await signUp(username, email, password);
        setSession(newSession);
        setNotice("Conta criada com sucesso! Bem-vindo.");
      } else {
        const logged = await signIn(email, password);
        setSession(logged);
        setNotice("Conectado com sucesso!");
      }
      setPassword("");
      setOpen(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível autenticar.");
    } finally {
      setWorking(null);
    }
  };

  const saveCurrent = async () => {
    if (!session) return;
    setWorking("save");
    setError(null);
    setNotice(null);
    try {
      const char = (window as any).app?.getCurrentCharacter();
      if (!char) throw new Error("Nenhum personagem ativo no momento.");
      await saveCharacter(char, session.user);
      await refreshCharacters(session.user);
      setNotice(t("saveCurrent"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível salvar a ficha.");
    } finally {
      setWorking(null);
    }
  };

  const removeCharacter = async (character: CloudCharacter) => {
    if (!window.confirm(`Excluir '${character.name}'? Esta ação não pode ser desfeita.`)) return;
    if (!session) return;
    setWorking(character.id);
    setError(null);
    try {
      await deleteCharacter(character.id, session.user);
      setCharacters((current) => current.filter((item) => item.id !== character.id));
      setNotice("Personagem excluído com sucesso.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível excluir o personagem.");
    } finally {
      setWorking(null);
    }
  };

  const handleSignOut = async () => {
    setWorking("signout");
    await signOut();
    setSession(null);
    setCharacters([]);
    setWorking(null);
    setOpen(false);
    window.location.hash = "#/library";
  };

  return (
    <>
      <button ref={triggerRef} className="account-trigger" type="button" onClick={() => setOpen(true)}>
        <span aria-hidden="true">{session ? "🛡️" : "👤"}</span>
        {session?.user.username ?? t("signIn")}
        {session?.user.role === "admin" && <span className="admin-badge">{t("admin")}</span>}
      </button>

      {open && (
        <div className="account-overlay" onClick={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section ref={dialogRef} className="account-panel" role="dialog" aria-modal="true" aria-labelledby="account-title" tabIndex={-1}>
            <header className="account-header">
              <div>
                <span className="account-kicker">{isSupabaseConfigured ? "Nuvem (Supabase)" : "Armazenamento Seguro Local"}</span>
                <h2 id="account-title">{session ? `Biblioteca de ${session.user.username}` : t("yourAccount")}</h2>
              </div>
              <button className="account-close" onClick={() => setOpen(false)} aria-label={t("close")} type="button">✕</button>
            </header>

            {!session ? (
              <form className="auth-form" onSubmit={submitAuth}>
                <div className="auth-switch" role="tablist" aria-label={t("accountAccess")}>
                  <button role="tab" aria-selected={authMode === "signin"} type="button" className={authMode === "signin" ? "active" : ""} onClick={() => setAuthMode("signin")}>{t("signIn")}</button>
                  <button role="tab" aria-selected={authMode === "signup"} type="button" className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>{t("createAccount")}</button>
                </div>
                {authMode === "signup" && (
                  <label>{t("username")}<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Ex: mestre_arthur" required /></label>
                )}
                <label>{authMode === "signup" ? t("email") : "Usuário ou E-mail"}<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={authMode === "signup" ? "seu@email.com" : "seu_usuario ou seu@email.com"} required /></label>
                <label>{t("password")}<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="••••••••" required /></label>
                <button className="account-primary" disabled={working === "auth"} type="submit">
                  {working === "auth" ? t("wait") : authMode === "signup" ? t("createAccount") : t("signIn")}
                </button>
              </form>
            ) : (
              <div className="account-content">
                <div className="profile-summary">
                  <div className="profile-avatar">{session.user.username.slice(0, 1).toUpperCase()}</div>
                  <div>
                    <strong>{session.user.username}</strong>
                    <span>{session.user.email}</span>
                  </div>
                  {session.user.role === "admin" && <span className="admin-badge">{t("administrator")}</span>}
                </div>

                <div className="cloud-actions">
                  <button className="account-primary" onClick={saveCurrent} disabled={working === "save"} type="button">
                    {working === "save" ? t("saving") : t("saveCurrent")}
                  </button>
                  <button onClick={() => { (window as any).app?.createNewCharacter(); setOpen(false); window.location.hash = "#/builder"; }} type="button">
                    ➕ {t("newCharacter")}
                  </button>
                  <button onClick={() => refreshCharacters(session.user)} disabled={loading} type="button">
                    🔄 {t("refresh")}
                  </button>
                </div>

                <section className="cloud-library" aria-labelledby="library-title">
                  <div className="section-heading">
                    <h3 id="library-title">{t("myCharacters")}</h3>
                    <span>{characters.length}</span>
                  </div>
                  {loading && characters.length === 0 ? (
                    <div className="account-state" role="status">{t("loadingSheets")}</div>
                  ) : characters.length === 0 ? (
                    <div className="account-state">
                      <strong>{t("noSheets")}</strong>
                      <p>{t("noSheetsDescription")}</p>
                    </div>
                  ) : (
                    <div className="character-list">
                      {characters.map((character) => (
                        <article className="cloud-character" key={character.id}>
                          <button
                            className="character-load"
                            onClick={() => {
                              (window as any).app?.loadCharacter(character.data);
                              setOpen(false);
                              window.location.hash = "#/builder";
                            }}
                            type="button"
                          >
                            <strong>{character.name}</strong>
                            <span>{t("level")} {character.level} · {character.ruleset}</span>
                          </button>
                          <button
                            className="character-delete"
                            onClick={() => removeCharacter(character)}
                            disabled={working === character.id}
                            aria-label={`Excluir ${character.name}`}
                            type="button"
                          >
                            🗑
                          </button>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <button className="signout-button" onClick={handleSignOut} disabled={working === "signout"} type="button">
                  🚪 {t("signOut")}
                </button>
              </div>
            )}

            {error && <div className="account-feedback error" role="alert">{error}</div>}
            {notice && <div className="account-feedback success" role="status">{notice}</div>}
          </section>
        </div>
      )}
    </>
  );
}
