import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import {
  deleteCharacter,
  listCharacters,
  saveCharacter,
  type CloudCharacter,
} from "./services/characters";
import "./account.css";
import { useI18n } from "./i18n";
import { updateAccountViewState } from "./accountState";

interface Profile {
  id: string;
  username: string;
  role: "user" | "admin";
}

type AuthMode = "signin" | "signup";

export function AccountPortal() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [characters, setCharacters] = useState<CloudCharacter[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openAccount = () => setOpen(true);
    window.addEventListener("pathbuilder:open-account", openAccount);
    return () => window.removeEventListener("pathbuilder:open-account", openAccount);
  }, []);

  useEffect(() => {
    updateAccountViewState({
      configured: isSupabaseConfigured,
      authenticated: Boolean(session),
      isAdmin: profile?.role === "admin",
      username: profile?.username ?? null,
    });
  }, [profile, session]);

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
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const refreshCharacters = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      setCharacters(await listCharacters());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t("loadingSheets"));
    } finally {
      setLoading(false);
    }
  }, [session, t]);

  const loadProfile = useCallback(async (activeSession: Session) => {
    if (!supabase) return;
    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("id,username,role")
      .eq("id", activeSession.user.id)
      .single();
    if (profileError) throw profileError;
    setProfile(data as Profile);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setCharacters([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    void Promise.all([loadProfile(session), refreshCharacters()]).catch((caught) => {
      setError(caught instanceof Error ? caught.message : "Não foi possível carregar o perfil.");
    });
  }, [loadProfile, refreshCharacters, session]);

  const submitAuth = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setWorking("auth");
    setError(null);
    setNotice(null);
    try {
      if (authMode === "signup") {
        if (!/^[a-zA-Z0-9_]{3,32}$/.test(username)) {
          throw new Error("Use de 3 a 32 letras, números ou _ no usuário.");
        }
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (authError) throw authError;
        if (!data.session) setNotice("Conta criada. Confirme o link enviado para seu e-mail.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
      }
      setPassword("");
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
      await saveCharacter(window.app.getCurrentCharacter(), session.user);
      await refreshCharacters();
      setNotice(t("saveCurrent"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível salvar a ficha.");
    } finally {
      setWorking(null);
    }
  };

  const removeCharacter = async (character: CloudCharacter) => {
    if (!window.confirm(`Excluir '${character.name}' da nuvem? Esta ação não pode ser desfeita.`)) return;
    setWorking(character.id);
    setError(null);
    try {
      await deleteCharacter(character.id);
      setCharacters((current) => current.filter((item) => item.id !== character.id));
      setNotice(t("deleteAccount"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível excluir o personagem.");
    } finally {
      setWorking(null);
    }
  };

  const updateUsername = async () => {
    if (!supabase || !session || !/^[a-zA-Z0-9_]{3,32}$/.test(username)) {
      setError("Use de 3 a 32 letras, números ou _ no usuário.");
      return;
    }
    setWorking("username");
    const { error: updateError } = await supabase.from("profiles").update({ username }).eq("id", session.user.id);
    if (updateError) setError(updateError.message);
    else {
      setProfile((current) => current ? { ...current, username } : current);
      setNotice("Nome de usuário atualizado.");
    }
    setWorking(null);
  };

  const updatePassword = async () => {
    if (!supabase || newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setWorking("password");
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) setError(updateError.message);
    else {
      setNewPassword("");
      setNotice("Senha atualizada.");
    }
    setWorking(null);
  };

  const removeAccount = async () => {
    if (!supabase || !session) return;
    const confirmation = window.prompt("Digite EXCLUIR para apagar sua conta e todas as fichas:");
    if (confirmation !== "EXCLUIR") return;
    setWorking("delete-account");
    setError(null);
    const { error: invokeError } = await supabase.functions.invoke("delete-account", { body: {} });
    if (invokeError) {
      setError(invokeError.message);
      setWorking(null);
      return;
    }
    await supabase.auth.signOut({ scope: "local" });
    setOpen(false);
    setWorking(null);
  };

  const signOut = async () => {
    if (!supabase) return;
    setWorking("signout");
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    if (signOutError) setError(signOutError.message);
    setWorking(null);
  };

  return (
    <>
      <button ref={triggerRef} className="account-trigger" type="button" onClick={() => setOpen(true)}>
        <span aria-hidden="true">{session ? "🛡️" : "👤"}</span>
        {profile?.username ?? (session ? t("account") : t("signIn"))}
        {profile?.role === "admin" && <span className="admin-badge">{t("admin")}</span>}
      </button>

      {open && (
        <div className="account-overlay" onClick={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section ref={dialogRef} className="account-panel" role="dialog" aria-modal="true" aria-labelledby="account-title" tabIndex={-1}>
            <header className="account-header">
              <div>
                <span className="account-kicker">{t("cloud")}</span>
                <h2 id="account-title">{session ? t("yourLibrary") : t("yourAccount")}</h2>
              </div>
              <button className="account-close" onClick={() => setOpen(false)} aria-label={t("close")} type="button">✕</button>
            </header>

            {!isSupabaseConfigured ? (
              <div className="account-state warning" role="status">
                <strong>{t("localMode")}</strong>
                <p>{t("localModeDescription")}</p>
              </div>
            ) : !session ? (
              <form className="auth-form" onSubmit={submitAuth}>
                <div className="auth-switch" role="tablist" aria-label={t("accountAccess")}>
                  <button role="tab" aria-selected={authMode === "signin"} type="button" className={authMode === "signin" ? "active" : ""} onClick={() => setAuthMode("signin")}>{t("signIn")}</button>
                  <button role="tab" aria-selected={authMode === "signup"} type="button" className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>{t("createAccount")}</button>
                </div>
                {authMode === "signup" && (
                  <label>{t("username")}<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label>
                )}
                <label>{t("email")}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
                <label>{t("password")}<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={authMode === "signup" ? "new-password" : "current-password"} minLength={8} required /></label>
                <button className="account-primary" disabled={working === "auth"} type="submit">
                  {working === "auth" ? t("wait") : authMode === "signup" ? t("createAccount") : t("signIn")}
                </button>
              </form>
            ) : (
              <div className="account-content">
                <div className="profile-summary">
                  <div className="profile-avatar">{(profile?.username ?? session.user.email ?? "U").slice(0, 1).toUpperCase()}</div>
                  <div><strong>{profile?.username ?? t("adventurer")}</strong><span>{session.user.email}</span></div>
                  {profile?.role === "admin" && <span className="admin-badge">{t("administrator")}</span>}
                </div>

                <div className="cloud-actions">
                  <button className="account-primary" onClick={saveCurrent} disabled={working === "save"} type="button">{working === "save" ? t("saving") : t("saveCurrent")}</button>
                  <button onClick={() => window.app.createNewCharacter()} type="button">{t("newCharacter")}</button>
                  <button onClick={refreshCharacters} disabled={loading} type="button">{t("refresh")}</button>
                </div>

                <section className="cloud-library" aria-labelledby="library-title">
                  <div className="section-heading"><h3 id="library-title">{t("myCharacters")}</h3><span>{characters.length}</span></div>
                  {loading && characters.length === 0 ? (
                    <div className="account-state" role="status">{t("loadingSheets")}</div>
                  ) : characters.length === 0 ? (
                    <div className="account-state"><strong>{t("noSheets")}</strong><p>{t("noSheetsDescription")}</p></div>
                  ) : (
                    <div className="character-list">
                      {characters.map((character) => (
                        <article className="cloud-character" key={character.id}>
                          <button className="character-load" onClick={() => { window.app.loadCharacter(character.data); setOpen(false); }} type="button">
                            <strong>{character.name}</strong>
                            <span>{t("level")} {character.level} · {character.ruleset === "needs_review" ? t("rulesReview") : character.ruleset}</span>
                          </button>
                          <button className="character-delete" onClick={() => removeCharacter(character)} disabled={working === character.id} aria-label={`Excluir ${character.name}`} type="button">🗑</button>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <details className="profile-settings">
                  <summary>{t("profileSettings")}</summary>
                  <label>{t("username")}<input value={username || profile?.username || ""} onChange={(event) => setUsername(event.target.value)} /></label>
                  <button onClick={updateUsername} disabled={working === "username"} type="button">{t("updateUsername")}</button>
                  <label>{t("newPassword")}<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" minLength={8} /></label>
                  <button onClick={updatePassword} disabled={working === "password"} type="button">{t("changePassword")}</button>
                  <button className="danger-button" onClick={removeAccount} disabled={working === "delete-account"} type="button">{t("deleteAccount")}</button>
                </details>

                <button className="signout-button" onClick={signOut} disabled={working === "signout"} type="button">{t("signOut")}</button>
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
