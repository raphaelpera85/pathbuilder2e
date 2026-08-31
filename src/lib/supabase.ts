import { createClient } from "@supabase/supabase-js";

export const SUPABASE_PROJECT_URL = "https://wjmrrqrretculeyxpngc.supabase.co";
export const SUPABASE_PROJECT_KEY = "sb_publishable_eB9E_zqLfcMkF6N69qX9OA_fuNRfawT";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || SUPABASE_PROJECT_URL)?.trim();
const supabasePublishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PROJECT_KEY)?.trim();

// Testes de contrato devem permanecer determinísticos e nunca depender da rede.
// O build de produção continua usando a configuração pública padrão ou .env.local.
const isTestEnvironment = import.meta.env.MODE === "test";
export const isSupabaseConfigured = !isTestEnvironment && Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
