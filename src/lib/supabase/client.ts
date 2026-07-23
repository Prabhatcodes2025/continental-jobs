import { env, isSupabaseConfigured } from "@/lib/env";

export function getSupabasePublicConfig() {
  return {
    configured: Boolean(env.supabaseUrl && env.supabaseAnonKey),
    url: env.supabaseUrl,
    anonKey: env.supabaseAnonKey
  };
}

export function createBrowserSupabaseConfig() {
  const config = getSupabasePublicConfig();

  if (!config.configured) {
    return {
      mode: "demo" as const,
      warning: "Supabase public keys are missing. Browser Supabase client is disabled."
    };
  }

  return {
    mode: "supabase" as const,
    url: config.url,
    anonKey: config.anonKey
  };
}

export { isSupabaseConfigured };
