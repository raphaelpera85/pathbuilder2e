import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { withRequestTimeout } from "./requestTimeout";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  created_at: string;
}

export interface AuthSession {
  user: UserProfile;
  expires_at: number;
}

export function buildUserProfileFromAuth(
  authUser: { id: string; email?: string | null; user_metadata?: { username?: string }; created_at?: string },
  profile?: Partial<UserProfile> | null,
): UserProfile {
  const email = authUser.email || profile?.email || "";
  return {
    id: authUser.id,
    username: profile?.username || authUser.user_metadata?.username || email.split("@")[0] || "Aventureiro",
    email,
    role: profile?.role === "admin" || email.toLowerCase() === "raphaelpera85@gmail.com" ? "admin" : "user",
    created_at: authUser.created_at || profile?.created_at || new Date(0).toISOString(),
  };
}

const LOCAL_USERS_KEY = "pf2e_local_users_v1";
const LOCAL_SESSION_KEY = "pf2e_local_active_session_v1";
const AUTH_STATE_EVENT = "pf2e:auth-state-change";

// AccountPortal e PortalPages podem montar ao mesmo tempo. Compartilhar a
// leitura inicial impede que uma árvore renderize login enquanto a outra já
// encontrou a sessão persistida.
let cachedSession: AuthSession | null | undefined;
let sessionRequest: Promise<AuthSession | null> | null = null;
let authEventEpoch = 0;
let supabaseAuthSubscription: { unsubscribe: () => void } | null = null;

function ensureSupabaseAuthSubscription(): void {
  if (supabaseAuthSubscription || !isSupabaseConfigured || !supabase) return;
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
    const eventEpoch = ++authEventEpoch;

    // O SDK emite INITIAL_SESSION antes de getSession terminar. Um null
    // nesse ponto não é uma confirmação de logout e não deve apagar a sessão
    // persistida nem fazer a biblioteca voltar para o formulário de login.
    if (event === "INITIAL_SESSION" && !nextSession) return;

    cachedSession = undefined;
    if (!nextSession) {
      cachedSession = null;
      window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: null }));
      return;
    }

    // Não chame getSession dentro do callback do Supabase: o SDK pode manter
    // o lock interno de autenticação enquanto o callback aguarda a leitura.
    const fallback: AuthSession = {
      user: buildUserProfileFromAuth(nextSession.user),
      expires_at: nextSession.expires_at ? nextSession.expires_at * 1000 : Date.now() + 86400000,
    };
    cachedSession = fallback;
    window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: fallback }));

    // Hidrata username/role do perfil somente depois de liberar o callback.
    void Promise.resolve().then(async () => {
      const current = await readCurrentSession();
      if (eventEpoch !== authEventEpoch || !current) return;
      cachedSession = current;
      window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: current }));
    });
  });
  supabaseAuthSubscription = subscription;
}

interface StoredLocalUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "user" | "admin";
  created_at: string;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const enc = new TextEncoder();
    const keyData = enc.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", keyData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback para ambientes sem crypto.subtle
  let hash = 0;
  const str = password + salt;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return String(Math.abs(hash));
}

function getStoredLocalUsers(): StoredLocalUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredLocalUsers(users: StoredLocalUser[]): void {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Erro ao salvar usuários locais:", err);
  }
}

function notifyAuthChange(session: AuthSession | null): void {
  authEventEpoch += 1;
  cachedSession = session;
  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: session }));
}

async function readCurrentSession(): Promise<AuthSession | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { session }, error } = await withRequestTimeout(
        supabase.auth.getSession(),
        8_000,
        "A verificação da sua sessão demorou para responder.",
      );
      if (error || !session) return null;

      // A sessão do Auth continua válida mesmo quando a leitura opcional do
      // perfil falha ou está lenta. Não transforme esse segundo request em
      // um falso logout/login infinito; os metadados do usuário fornecem um
      // fallback seguro até a próxima hidratação.
      let profile: any = null;
      try {
        const result = await withRequestTimeout(
          supabase
            .from("profiles")
            .select("id,username,role,email")
            .eq("id", session.user.id)
            .maybeSingle(),
          8_000,
          "O perfil demorou para responder.",
        );
        profile = result.data;
      } catch (profileError) {
        console.warn("Perfil não disponível; usando metadados da sessão.", profileError);
      }

      return {
        user: buildUserProfileFromAuth(session.user, profile),
        expires_at: session.expires_at ? session.expires_at * 1000 : Date.now() + 86400000,
      };
    } catch {
      return null;
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (session.expires_at && session.expires_at < Date.now()) {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  // Register the SDK listener before the first read. Otherwise an auth event
  // can hydrate a valid session while this older getSession() result is still
  // in flight, and the stale null would make the library show the login form.
  ensureSupabaseAuthSubscription();
  if (cachedSession !== undefined) return cachedSession;
  if (!sessionRequest) sessionRequest = readCurrentSession();
  const requestEpoch = authEventEpoch;
  try {
    const result = await sessionRequest;
    if (requestEpoch !== authEventEpoch && cachedSession !== undefined) {
      return cachedSession;
    }
    cachedSession = result;
    return cachedSession;
  } finally {
    sessionRequest = null;
  }
}

export async function signIn(emailOrUsername: string, password: string): Promise<AuthSession> {
  const cleanId = emailOrUsername.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    cachedSession = undefined;
    const isEmail = cleanId.includes("@");
    let emailToUse = cleanId;

    if (!isEmail) {
      // Busca email pelo username na tabela de perfis
      try {
        const { data: profile } = await withRequestTimeout(supabase
          .from("profiles")
          .select("id,username,email")
          .ilike("username", cleanId)
          .maybeSingle(), 8_000, "A busca do usuário demorou para responder.");

        if (profile && (profile as any).email) {
          emailToUse = (profile as any).email;
        }
      } catch {
        // segue com cleanId
      }
    }

    const { data, error } = await withRequestTimeout(
      supabase.auth.signInWithPassword({ email: emailToUse, password }),
      8_000,
      "O login demorou para responder. Tente novamente.",
    );

    if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("invalid login credentials") || msg.includes("invalid_grant") || msg.includes("invalid credentials")) {
        throw new Error("E-mail, usuário ou senha incorretos.");
      }
      if (msg.includes("email not confirmed")) {
        throw new Error("E-mail ainda não confirmado. Verifique a mensagem de confirmação na sua caixa de entrada.");
      }
      throw error;
    }

    if (!data.session) throw new Error("Não foi possível iniciar a sessão.");
    const session = await getCurrentSession();
    if (!session) throw new Error("Falha ao obter perfil do usuário.");
    notifyAuthChange(session);
    return session;
  }

  // Autenticação Local
  const users = getStoredLocalUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
  );
  if (!user) {
    throw new Error("Usuário ou e-mail não cadastrado.");
  }

  const computedHash = await hashPassword(password, user.salt);
  if (computedHash !== user.passwordHash) {
    throw new Error("Senha incorreta.");
  }

  const session: AuthSession = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    },
    expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 dias
  };

  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  notifyAuthChange(session);
  return session;
}

export async function signUp(username: string, email: string, password: string): Promise<AuthSession & { pendingConfirmation?: boolean }> {
  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!/^[a-zA-Z0-9_]{3,32}$/.test(cleanUsername)) {
    throw new Error("O nome de usuário deve ter de 3 a 32 letras, números ou _.");
  }
  if (!cleanEmail.includes("@") || cleanEmail.length < 5) {
    throw new Error("Informe um e-mail válido.");
  }
  if (password.length < 6) {
    throw new Error("A senha deve ter no mínimo 6 caracteres.");
  }

  if (isSupabaseConfigured && supabase) {
    cachedSession = undefined;
    // 1. Verificar se o nome de usuário já está em uso na tabela profiles
    try {
      const { data: existingProfile } = await withRequestTimeout(supabase
        .from("profiles")
        .select("id")
        .ilike("username", cleanUsername)
        .maybeSingle(), 8_000, "A verificação do usuário demorou para responder.");

      if (existingProfile) {
        throw new Error(`O nome de usuário '${cleanUsername}' já está em uso.`);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("já está em uso")) throw err;
    }

    const { data, error } = await withRequestTimeout(
      supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { username: cleanUsername },
          emailRedirectTo: `${window.location.origin}/`,
        },
      }),
      8_000,
      "O cadastro demorou para responder. Tente novamente.",
    );

    if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("already registered") || msg.includes("already exists") || msg.includes("unique")) {
        throw new Error(`O e-mail '${cleanEmail}' já possui uma conta cadastrada.`);
      }
      throw error;
    }

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      throw new Error(`O e-mail '${cleanEmail}' já possui uma conta cadastrada.`);
    }

    // Tenta atualizar/inserir o perfil do usuário para garantir sincronização
    if (data.user?.id) {
      try {
        await withRequestTimeout(
          supabase.from("profiles").upsert({
            id: data.user.id,
            username: cleanUsername,
            email: cleanEmail,
            role: cleanEmail === "raphaelpera85@gmail.com" ? "admin" : "user",
          }),
          8_000,
          "A sincronização do perfil demorou para responder.",
        );
      } catch {
        // trigger no banco lida se necessário
      }
    }

    if (!data.session) {
      return {
        user: {
          id: data.user?.id || "temp",
          username: cleanUsername,
          email: cleanEmail,
          role: cleanEmail === "raphaelpera85@gmail.com" ? "admin" : "user",
          created_at: new Date().toISOString(),
        },
        expires_at: 0,
        pendingConfirmation: true,
      };
    }

    const session = await getCurrentSession();
    if (session) notifyAuthChange(session);
    return session!;
  }

  // Cadastro Local
  const users = getStoredLocalUsers();
  if (users.some((u) => u.username.toLowerCase() === cleanUsername.toLowerCase())) {
    throw new Error(`O nome de usuário '${cleanUsername}' já está em uso.`);
  }
  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    throw new Error(`O e-mail '${cleanEmail}' já possui uma conta cadastrada.`);
  }

  const salt = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Math.random());
  const passwordHash = await hashPassword(password, salt);
  const isFirstUser = users.length === 0;

  const newUser: StoredLocalUser = {
    id: `usr_${globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID().slice(0, 8) : Date.now()}`,
    username: cleanUsername,
    email: cleanEmail,
    passwordHash,
    salt,
    role: isFirstUser ? "admin" : "user",
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredLocalUsers(users);

  const session: AuthSession = {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      created_at: newUser.created_at,
    },
    expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };

  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  notifyAuthChange(session);
  return session;
}

export async function signOut(): Promise<void> {
  try {
    if (isSupabaseConfigured && supabase) {
      await withRequestTimeout(supabase.auth.signOut({ scope: "local" }), 8_000, "O encerramento da sessão demorou para responder.");
    }
  } finally {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    notifyAuthChange(null);
  }
}

function validateUsername(username: string): string {
  const clean = username.trim();
  if (!/^[a-zA-Z0-9_]{3,32}$/.test(clean)) {
    throw new Error("O nome de usuário deve ter de 3 a 32 letras, números ou _.");
  }
  return clean;
}

function requireSession(session?: AuthSession | null): AuthSession {
  if (!session) throw new Error("Sessão ausente.");
  return session;
}

export async function updateUsername(username: string, currentSession?: AuthSession | null): Promise<AuthSession> {
  const cleanUsername = validateUsername(username);
  const active = requireSession(currentSession ?? await getCurrentSession());

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await withRequestTimeout(supabase
      .from("profiles")
      .update({ username: cleanUsername })
      .eq("id", active.user.id)
      .select("username")
      .single(), 8_000, "A atualização do usuário demorou para responder.");
    if (error) throw error;
    const next = { ...active, user: { ...active.user, username: (data as any)?.username || cleanUsername } };
    notifyAuthChange(next);
    return next;
  }

  const users = getStoredLocalUsers();
  if (users.some((user) => user.id !== active.user.id && user.username.toLowerCase() === cleanUsername.toLowerCase())) {
    throw new Error(`O nome de usuário '${cleanUsername}' já está em uso.`);
  }
  const index = users.findIndex((user) => user.id === active.user.id);
  if (index < 0) throw new Error("Conta local não encontrada.");
  users[index] = { ...users[index], username: cleanUsername };
  saveStoredLocalUsers(users);
  const next = { ...active, user: { ...active.user, username: cleanUsername } };
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(next));
  notifyAuthChange(next);
  return next;
}

export async function changePassword(newPassword: string, currentPassword: string, currentSession?: AuthSession | null): Promise<void> {
  if (newPassword.length < 6) throw new Error("A senha deve ter no mínimo 6 caracteres.");
  const active = requireSession(currentSession ?? await getCurrentSession());

  if (isSupabaseConfigured && supabase) {
    const { error } = await withRequestTimeout(
      supabase.auth.updateUser({ password: newPassword }),
      8_000,
      "A alteração da senha demorou para responder.",
    );
    if (error) throw error;
    return;
  }

  const users = getStoredLocalUsers();
  const index = users.findIndex((user) => user.id === active.user.id);
  if (index < 0) throw new Error("Conta local não encontrada.");
  if (await hashPassword(currentPassword, users[index].salt) !== users[index].passwordHash) {
    throw new Error("Senha atual incorreta.");
  }
  users[index] = { ...users[index], passwordHash: await hashPassword(newPassword, users[index].salt) };
  saveStoredLocalUsers(users);
}

export async function deleteAccount(currentSession?: AuthSession | null): Promise<void> {
  const active = requireSession(currentSession ?? await getCurrentSession());
  if (isSupabaseConfigured && supabase) {
    const { error } = await withRequestTimeout(
      supabase.functions.invoke("delete-account", { body: {} }),
      8_000,
      "A exclusão da conta demorou para responder.",
    );
    if (error) throw error;
  } else {
    saveStoredLocalUsers(getStoredLocalUsers().filter((user) => user.id !== active.user.id));
    localStorage.removeItem(`pf2e_user_${active.user.id}_characters_v1`);
  }
  await signOut();
}

export function subscribeToAuth(callback: (session: AuthSession | null) => void): () => void {
  const handler = (event: Event) => {
    callback((event as CustomEvent).detail);
  };
  window.addEventListener(AUTH_STATE_EVENT, handler);
  ensureSupabaseAuthSubscription();

  return () => {
    window.removeEventListener(AUTH_STATE_EVENT, handler);
  };
}
