import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentSession, type UserProfile } from "./auth";
import { withRequestTimeout } from "./requestTimeout";

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  route: string;
  userType: "admin" | "user" | "guest";
  username?: string;
  userId?: string;
  userAgent?: string;
}

export interface AdminDashboardMetrics {
  totalAccesses: number;
  accessesToday: number;
  registeredAccounts: number;
  charactersCreated: number;
  activeCampaigns: number;
  adminUsers: number;
  recentAccesses: AccessLogEntry[];
  usersList: {
    id: string;
    username: string;
    email?: string;
    role: "admin" | "user";
    createdAt?: string;
  }[];
  characterRulesetDistribution: {
    remaster: number;
    legacy: number;
    other: number;
  };
  catalogCounts?: Record<string, number>;
  catalogVerifiedCount?: number;
  catalogReviewCount?: number;
  isRemote?: boolean;
  lastUpdated: string;
}

const LOCAL_ACCESS_COUNT_KEY = "pb2e_total_access_count";
const LOCAL_ACCESS_LOGS_KEY = "pb2e_access_logs_history";
const LOCAL_DAILY_PREFIX = "pb2e_daily_access_";

function getTodayKey(): string {
  const now = new Date();
  return `${LOCAL_DAILY_PREFIX}${now.toISOString().slice(0, 10)}`;
}

/**
 * Registra um acesso ou navegação no aplicativo (com fallback local resiliente e envio ao Supabase quando disponível)
 */
export async function recordAppAccess(
  route: string = "builder",
  metadata?: Record<string, unknown>
): Promise<void> {
  const timestamp = new Date().toISOString();
  const todayKey = getTodayKey();

  // Atualiza contador local imediatamente
  try {
    const currentCount = parseInt(localStorage.getItem(LOCAL_ACCESS_COUNT_KEY) || "0", 10);
    localStorage.setItem(LOCAL_ACCESS_COUNT_KEY, String(currentCount + 1));

    const todayCount = parseInt(localStorage.getItem(todayKey) || "0", 10);
    localStorage.setItem(todayKey, String(todayCount + 1));
  } catch {
    // Silencia erros de storage se bloqueado
  }

  // Identifica sessão de usuário ativa
  let sessionUser: UserProfile | null = null;
  try {
    const session = await getCurrentSession();
    sessionUser = session?.user || null;
  } catch {
    // Segue como visitante
  }

  const logEntry: AccessLogEntry = {
    id: `acc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp,
    route: route || "builder",
    userType: sessionUser?.role === "admin" ? "admin" : sessionUser ? "user" : "guest",
    username: sessionUser?.username,
    userId: sessionUser?.id,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 100) : undefined,
    ...metadata,
  };

  // Salva no histórico de logs locais (mantendo até os últimos 150 registros)
  try {
    const rawLogs = localStorage.getItem(LOCAL_ACCESS_LOGS_KEY);
    const logs: AccessLogEntry[] = rawLogs ? JSON.parse(rawLogs) : [];
    logs.unshift(logEntry);
    if (logs.length > 150) logs.length = 150;
    localStorage.setItem(LOCAL_ACCESS_LOGS_KEY, JSON.stringify(logs));
  } catch {
    // Silencia erros de storage
  }

  // Envia registro ao Supabase de forma assíncrona caso configurado
  if (isSupabaseConfigured && supabase) {
    try {
      // Tenta gravar na tabela site_visits se existir (não bloqueia UI em caso de falha)
      await withRequestTimeout(
        supabase.from("site_visits").insert({
          route: logEntry.route,
          user_type: logEntry.userType,
          user_id: logEntry.userId || null,
          username: logEntry.username || null,
          user_agent: logEntry.userAgent || null,
          metadata: metadata || {},
        }),
        3_000,
        "Registro de acesso timeout"
      );
    } catch {
      // Falha silenciosa para não impactar a navegação do usuário
    }
  }
}

/**
 * Consulta todas as métricas consolidadas do painel de administração diretamente do Supabase
 */
export async function getAdminDashboardMetrics(): Promise<AdminDashboardMetrics> {
  const todayKey = getTodayKey();
  let localTotalAccess = 0;
  let localTodayAccess = 0;
  let localRecentLogs: AccessLogEntry[] = [];

  try {
    localTotalAccess = parseInt(localStorage.getItem(LOCAL_ACCESS_COUNT_KEY) || "0", 10);
    localTodayAccess = parseInt(localStorage.getItem(todayKey) || "0", 10);
    const rawLogs = localStorage.getItem(LOCAL_ACCESS_LOGS_KEY);
    localRecentLogs = rawLogs ? JSON.parse(rawLogs) : [];
  } catch {
    // Fallback padrão
  }

  let totalAccesses = localTotalAccess;
  let accessesToday = localTodayAccess;
  let recentAccesses = localRecentLogs;
  let totalAccounts = 0;
  let totalCharacters = 0;
  let totalCampaigns = 0;
  let adminCount = 0;
  let usersList: AdminDashboardMetrics["usersList"] = [];
  let rulesetStats = { remaster: 0, legacy: 0, other: 0 };
  let catalogCounts: Record<string, number> = {};
  let catalogVerifiedCount: number | undefined;
  let catalogReviewCount: number | undefined;
  let isRemote = false;

  // Busca dados do Supabase se configurado
  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Contagem e listagem de acessos remotos (site_visits)
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [totalVisitsRes, todayVisitsRes, recentVisitsRes] = await Promise.all([
        withRequestTimeout(
          supabase.from("site_visits").select("id", { count: "exact", head: true }),
          5_000,
          "Consulta total visitas demorou"
        ),
        withRequestTimeout(
          supabase
            .from("site_visits")
            .select("id", { count: "exact", head: true })
            .gte("created_at", todayStart.toISOString()),
          5_000,
          "Consulta visitas hoje demorou"
        ),
        withRequestTimeout(
          supabase
            .from("site_visits")
            .select("id, route, user_type, username, user_id, user_agent, created_at")
            .order("created_at", { ascending: false })
            .limit(50),
          6_000,
          "Consulta logs recentes demorou"
        ),
      ]);

      if (typeof totalVisitsRes.count === "number") {
        totalAccesses = totalVisitsRes.count;
        isRemote = true;
      }
      if (typeof todayVisitsRes.count === "number") {
        accessesToday = todayVisitsRes.count;
      }
      if (recentVisitsRes.data && Array.isArray(recentVisitsRes.data)) {
        recentAccesses = recentVisitsRes.data.map((v: any) => ({
          id: v.id,
          timestamp: v.created_at,
          route: v.route || "builder",
          userType: (v.user_type as any) || "guest",
          username: v.username || undefined,
          userId: v.user_id || undefined,
          userAgent: v.user_agent || undefined,
        }));
      }
    } catch (e) {
      console.warn("Aviso ao carregar site_visits do Supabase:", e);
    }

    try {
      // 2. Contagem e listagem de perfis cadastrados (profiles)
      const { data: profiles, count: pCount } = await withRequestTimeout(
        supabase
          .from("profiles")
          .select("id, username, email, role, created_at", { count: "exact" })
          .order("created_at", { ascending: false }),
        6_000,
        "Consulta de perfis demorou."
      );

      if (profiles && Array.isArray(profiles) && profiles.length > 0) {
        totalAccounts = profiles.length;
        adminCount = profiles.filter((p: any) => p.role === "admin" || p.email === "raphaelpera85@gmail.com").length;
        usersList = profiles.map((p: any) => ({
          id: p.id,
          username: p.username || "Usuário",
          email: p.email ? p.email.replace(/(?<=^.{3}).+(?=@)/, "***") : undefined, // Email protegido
          role: (p.role === "admin" || p.email === "raphaelpera85@gmail.com" ? "admin" : "user") as "admin" | "user",
          createdAt: p.created_at,
        }));
        isRemote = true;
      } else if (typeof pCount === "number") {
        totalAccounts = pCount;
      }
    } catch (e) {
      console.warn("Aviso ao carregar perfis para o painel admin:", e);
    }

    try {
      // 3. Contagem e estatísticas de personagens criados (characters)
      const { data: characters, count: cCount } = await withRequestTimeout(
        supabase.from("characters").select("id, ruleset, level", { count: "exact" }),
        6_000,
        "Consulta de personagens demorou."
      );

      if (characters && Array.isArray(characters)) {
        totalCharacters = characters.length;
        rulesetStats = { remaster: 0, legacy: 0, other: 0 };
        for (const char of characters) {
          if (char.ruleset === "remaster") rulesetStats.remaster++;
          else if (char.ruleset === "legacy") rulesetStats.legacy++;
          else rulesetStats.other++;
        }
        isRemote = true;
      } else if (typeof cCount === "number") {
        totalCharacters = cCount;
      }
    } catch (e) {
      console.warn("Aviso ao carregar personagens para o painel admin:", e);
    }

    try {
      // 4. Contagem de campanhas (campaigns)
      const { count: campCount } = await withRequestTimeout(
        supabase.from("campaigns").select("id", { count: "exact", head: true }),
        6_000,
        "Consulta de campanhas demorou."
      );
      if (typeof campCount === "number") {
        totalCampaigns = campCount;
        isRemote = true;
      }
    } catch {
      // Segue
    }

    try {
      // 5. Contagem de registros e status de revisão do catálogo no Supabase (18 tabelas)
      const catalogTables = [
        "catalog_ancestries", "catalog_heritages", "catalog_classes", "catalog_subclasses",
        "catalog_backgrounds", "catalog_archetypes", "catalog_spells", "catalog_rituals",
        "catalog_feats", "catalog_items", "catalog_weapons", "catalog_armors",
        "catalog_shields", "catalog_formulas", "catalog_pets", "catalog_actions",
        "catalog_conditions", "catalog_buffs"
      ];
      let totalCat = 0;
      let totalRev = 0;
      await Promise.all(
        catalogTables.map(async (tbl) => {
          try {
            const [{ count: total }, { count: reviewCount }] = await Promise.all([
              supabase.from(tbl).select("id", { count: "exact", head: true }),
              supabase.from(tbl).select("id", { count: "exact", head: true }).eq("ruleset", "needs_review"),
            ]);
            if (typeof total === "number") {
              catalogCounts[tbl] = total;
              totalCat += total;
            }
            if (typeof reviewCount === "number") {
              totalRev += reviewCount;
            }
          } catch {
            // Segue
          }
        })
      );
      if (totalCat > 0) {
        catalogVerifiedCount = Math.max(0, totalCat - totalRev);
        catalogReviewCount = totalRev;
        isRemote = true;
      }
    } catch {
      // Segue
    }
  }

  // Fallbacks locais caso Supabase esteja offline ou não configurado
  if (totalAccounts === 0) {
    try {
      const localUsersRaw = localStorage.getItem("pb2e_local_users_db");
      if (localUsersRaw) {
        const localUsers = JSON.parse(localUsersRaw);
        totalAccounts = Object.keys(localUsers).length;
        usersList = Object.entries(localUsers).map(([id, u]: [string, any]) => ({
          id,
          username: u.username || id,
          email: u.email,
          role: u.role || "user",
        }));
        adminCount = usersList.filter((u) => u.role === "admin").length;
      }
    } catch {
      // Segue
    }
  }

  if (totalCharacters === 0) {
    try {
      const localCharsRaw = localStorage.getItem("pb2e_cloud_characters_v1");
      if (localCharsRaw) {
        const localChars = JSON.parse(localCharsRaw);
        if (Array.isArray(localChars)) {
          totalCharacters = localChars.length;
          for (const char of localChars) {
            if (char.ruleset === "remaster") rulesetStats.remaster++;
            else if (char.ruleset === "legacy") rulesetStats.legacy++;
            else rulesetStats.other++;
          }
        }
      }
    } catch {
      // Segue
    }
  }

  return {
    totalAccesses,
    accessesToday,
    registeredAccounts: Math.max(totalAccounts, usersList.length),
    charactersCreated: totalCharacters,
    activeCampaigns: totalCampaigns,
    adminUsers: Math.max(adminCount, 1),
    recentAccesses,
    usersList,
    characterRulesetDistribution: rulesetStats,
    catalogCounts,
    catalogVerifiedCount,
    catalogReviewCount,
    isRemote,
    lastUpdated: new Date().toISOString(),
  };
}
