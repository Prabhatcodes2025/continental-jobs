import { env, isSupabaseConfigured } from "@/lib/env";
import type { SupabaseTable } from "@/lib/supabase/types";

type AdminFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: string;
  prefer?: string;
};

export async function supabaseAdminFetch<T>(table: SupabaseTable, options: AdminFetchOptions = {}) {
  if (!isSupabaseConfigured()) {
    return { data: null as T | null, error: "Supabase service-role key is not configured. Demo mode is active." };
  }

  const query = options.query ? `?${options.query}` : "";
  const response = await fetch(`${env.supabaseUrl}/rest/v1/${table}${query}`, {
    method: options.method || "GET",
    headers: {
      apikey: env.supabaseServiceRoleKey,
      authorization: `Bearer ${env.supabaseServiceRoleKey}`,
      "content-type": "application/json",
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

export async function createSignedStorageUrl(bucket: string, path: string, expiresIn = 300) {
  if (!isSupabaseConfigured()) {
    return { signedUrl: "", error: "Supabase storage is not configured. Demo mode is active." };
  }

  const response = await fetch(`${env.supabaseUrl}/storage/v1/object/sign/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: env.supabaseServiceRoleKey,
      authorization: `Bearer ${env.supabaseServiceRoleKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ expiresIn }),
    cache: "no-store"
  });

  if (!response.ok) {
    return { signedUrl: "", error: await response.text() };
  }

  const payload = await response.json();
  return { signedUrl: payload.signedURL ? `${env.supabaseUrl}/storage/v1${payload.signedURL}` : "", error: "" };
}
