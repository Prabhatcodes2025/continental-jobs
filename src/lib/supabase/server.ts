import { env, isSupabaseConfigured } from "@/lib/env";
import type { SupabaseTable } from "@/lib/supabase/types";

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  prefer?: string;
  query?: string;
  authToken?: string;
};

function supabaseHeaders(authToken?: string) {
  const token = authToken || env.supabaseAnonKey;
  return {
    apikey: env.supabaseAnonKey,
    authorization: `Bearer ${token}`,
    "content-type": "application/json"
  };
}

export async function supabaseRestFetch<T>(table: SupabaseTable, options: FetchOptions = {}) {
  if (!isSupabaseConfigured()) {
    return { data: null as T | null, error: "Supabase is not configured. Demo mode is active." };
  }

  const query = options.query ? `?${options.query}` : "";
  const response = await fetch(`${env.supabaseUrl}/rest/v1/${table}${query}`, {
    method: options.method || "GET",
    headers: {
      ...supabaseHeaders(options.authToken),
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    return { data: null as T | null, error: await response.text() };
  }

  if (response.status === 204) {
    return { data: null as T | null, error: "" };
  }

  return { data: (await response.json()) as T, error: "" };
}

export async function signInWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    return { session: null, user: null, error: "Supabase is not configured. Demo mode is active." };
  }

  const response = await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: supabaseHeaders(),
    body: JSON.stringify({ email, password }),
    cache: "no-store"
  });

  if (!response.ok) {
    return { session: null, user: null, error: "Invalid email or password." };
  }

  const payload = await response.json();
  return {
    session: {
      accessToken: String(payload.access_token || ""),
      refreshToken: String(payload.refresh_token || ""),
      expiresIn: Number(payload.expires_in || 0)
    },
    user: payload.user || null,
    error: ""
  };
}

export async function getProfileByUserId(userId: string, accessToken: string) {
  const query = new URLSearchParams({
    id: `eq.${userId}`,
    select: "id,email,full_name,role,status,last_login_at"
  }).toString();
  return supabaseRestFetch<Array<Record<string, unknown>>>("profiles", { query, authToken: accessToken });
}
