import { isSupabaseConfigured, supabase } from "../lib/supabase";

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

const LOCAL_USERS_KEY = "pf2e_local_users_v1";
const LOCAL_SESSION_KEY = "pf2e_local_active_session_v1";
const AUTH_STATE_EVENT = "pf2e:auth-state-change";

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
  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: session }));
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id,username,role,email")
        .eq("id", session.user.id)
        .maybeSingle();

      const userRole = (profile as any)?.role === "admin" || session.user.email?.toLowerCase() === "raphaelpera85@gmail.com" ? "admin" : "user";
      const username = (profile as any)?.username || session.user.user_metadata?.username || session.user.email?.split("@")[0] || "Aventureiro";

      return {
        user: {
          id: session.user.id,
          username,
          email: session.user.email || (profile as any)?.email || "",
          role: userRole,
          created_at: session.user.created_at,
        },
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

export async function signIn(emailOrUsername: string, password: string): Promise<AuthSession> {
  const cleanId = emailOrUsername.trim().toLowerCase();

  if (isSupabaseConfigured && supabase) {
    const isEmail = cleanId.includes("@");
    let emailToUse = cleanId;

    if (!isEmail) {
      // Busca email pelo username na tabela de perfis
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id,username,email")
          .ilike("username", cleanId)
          .maybeSingle();

        if (profile && (profile as any).email) {
          emailToUse = (profile as any).email;
        }
      } catch {
        // segue com cleanId
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });

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
    // 1. Verificar se o nome de usuário já está em uso na tabela profiles
    try {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .ilike("username", cleanUsername)
        .maybeSingle();

      if (existingProfile) {
        throw new Error(`O nome de usuário '${cleanUsername}' já está em uso.`);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("já está em uso")) throw err;
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { username: cleanUsername },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

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
        await supabase.from("profiles").upsert({
          id: data.user.id,
          username: cleanUsername,
          email: cleanEmail,
          role: cleanEmail === "raphaelpera85@gmail.com" ? "admin" : "user",
        });
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
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut({ scope: "local" });
  }
  localStorage.removeItem(LOCAL_SESSION_KEY);
  notifyAuthChange(null);
}

export function subscribeToAuth(callback: (session: AuthSession | null) => void): () => void {
  const handler = (event: Event) => {
    callback((event as CustomEvent).detail);
  };
  window.addEventListener(AUTH_STATE_EVENT, handler);

  let supabaseUnsub: (() => void) | undefined;
  if (isSupabaseConfigured && supabase) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (nextSession) {
        const cur = await getCurrentSession();
        callback(cur);
      } else {
        callback(null);
      }
    });
    supabaseUnsub = () => subscription.unsubscribe();
  }

  return () => {
    window.removeEventListener(AUTH_STATE_EVENT, handler);
    if (supabaseUnsub) supabaseUnsub();
  };
}
