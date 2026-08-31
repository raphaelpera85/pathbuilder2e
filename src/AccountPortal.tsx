import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  getCurrentSession,
  changePassword,
  deleteAccount,
  signIn,
  signOut,
  signUp,
  subscribeToAuth,
  updateUsername,
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
  const [profileUsername, setProfileUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
    let active = true;
    let authEventReceived = false;
    void getCurrentSession().then((cur) => {
      if (!active || authEventReceived) return;
      setSession(cur);
      setProfileUsername(cur?.user.username || "");
      if (cur) void refreshCharacters(cur.user);
    });

    const unsubscribe = subscribeToAuth((nextSession) => {
      authEventReceived = true;
      setSession(nextSession);
      setProfileUsername(nextSession?.user.username || "");
      if (nextSession) {
        void refreshCharacters(nextSession.user);
      } else {
        setCharacters([]);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
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
        if (password !== confirmPassword) {
          setError(t("passwordsDontMatch") || "As senhas não coincidem.");
          setWorking(null);
          return;
        }
        const newSession = await signUp(username, email, password);
        if ((newSession as any)?.pendingConfirmation) {
          setNotice(t("accountCreatedNotice"));
        } else {
          setSession(newSession);
          setNotice(t("welcomeNotice"));
          setOpen(false);
        }
      } else {
        const logged = await signIn(email, password);
        setSession(logged);
        setNotice(t("signedInNotice"));
        setOpen(false);
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
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("authenticationFailed"));
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
      setError(caught instanceof Error ? caught.message : t("saveCharacterFailed"));
    } finally {
      setWorking(null);
    }
  };

  const removeCharacter = async (character: CloudCharacter) => {
    if (!window.confirm(`${t("deleteCharacterConfirm")} ${character.name}`)) return;
    if (!session) return;
    setWorking(character.id);
    setError(null);
    try {
      await deleteCharacter(character.id, session.user);
      setCharacters((current) => current.filter((item) => item.id !== character.id));
      setNotice(t("characterDeletedNotice"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("deleteCharacterFailed"));
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

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    if (!session) return;
    setWorking("profile"); setError(null); setNotice(null);
    try {
      const next = await updateUsername(profileUsername, session);
      setSession(next);
      setNotice(t("profileUpdated"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("profileUpdateFailed"));
    } finally { setWorking(null); }
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!session) return;
    setWorking("password"); setError(null); setNotice(null);
    try {
      await changePassword(newPassword, currentPassword, session);
      setCurrentPassword(""); setNewPassword("");
      setNotice(t("passwordUpdated"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("passwordUpdateFailed"));
    } finally { setWorking(null); }
  };

  const removeAccount = async () => {
    if (!session || !window.confirm(t("deleteAccountConfirm"))) return;
    setWorking("delete-account"); setError(null); setNotice(null);
    try {
      await deleteAccount(session);
      setSession(null); setCharacters([]); setOpen(false);
      window.location.hash = "#/library";
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("deleteAccountFailed"));
    } finally { setWorking(null); }
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
                <label>{authMode === "signup" ? t("email") : t("usernameOrEmail")}<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={authMode === "signup" ? "you@example.com" : "username or you@example.com"} required /></label>
                <label>{t("password")}<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="••••••••" required /></label>
                {authMode === "signup" && (
                  <label>{t("confirmPassword")}<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={6} placeholder="••••••••" required /></label>
                )}
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "var(--pb-text, #cbd5e1)", margin: "4px 0 10px", userSelect: "none" }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: "var(--pb-orange, #f97316)", width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <span>{t("rememberAccount")}</span>
                </label>
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

                <details className="profile-settings">
                  <summary>{t("profileSettings")}</summary>
                  <form onSubmit={saveProfile}>
                    <label>{t("username")}<input value={profileUsername} onChange={(event) => setProfileUsername(event.target.value)} minLength={3} maxLength={32} required /></label>
                    <button type="submit" disabled={working === "profile"}>{working === "profile" ? t("wait") : t("updateUsername")}</button>
                  </form>
                  <form onSubmit={savePassword}>
                    <label>{t("currentPassword")}<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} minLength={6} required /></label>
                    <label>{t("newPassword")}<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={6} required /></label>
                    <button type="submit" disabled={working === "password"}>{working === "password" ? t("wait") : t("changePassword")}</button>
                  </form>
                  <button className="danger-button" type="button" onClick={removeAccount} disabled={working === "delete-account"}>{t("deleteAccount")}</button>
                </details>

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
