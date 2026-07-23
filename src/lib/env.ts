type EnvMode = "supabase" | "demo";

const missingMessage = (name: string) =>
  `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill in the value.`;

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET || "",
  adminNotifyEmail: process.env.ADMIN_NOTIFY_EMAIL || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  crmWebhookUrl: process.env.CRM_WEBHOOK_URL || "",
  whatsappApiWebhookUrl: process.env.WHATSAPP_API_WEBHOOK_URL || ""
} as const;

export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(missingMessage(name));
  }

  return value;
}

export function optionalEnv(name: string) {
  return process.env[name] || "";
}

export function isSupabaseConfigured() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceRoleKey);
}

export function getRuntimeMode(): EnvMode {
  return isSupabaseConfigured() ? "supabase" : "demo";
}

export function isDemoModeAllowed() {
  return env.nodeEnv !== "production";
}

export function getAdminSessionSecret() {
  if (env.adminSessionSecret) return env.adminSessionSecret;
  if (env.nodeEnv !== "production") return "continental-local-demo-session-secret";
  throw new Error(missingMessage("ADMIN_SESSION_SECRET"));
}

export function validateServerEnvironment() {
  const warnings: string[] = [];

  if (!isSupabaseConfigured()) {
    warnings.push("Supabase is not configured. Development/demo fallback mode is active.");
  }

  if (env.nodeEnv === "production" && !isSupabaseConfigured()) {
    warnings.push("Production is missing Supabase keys. Admin and persistence will be limited.");
  }

  if (env.nodeEnv === "production" && (!env.adminSessionSecret || env.adminSessionSecret.length < 32)) {
    warnings.push("ADMIN_SESSION_SECRET should be set to a strong 32+ character secret in production.");
  }

  if (!env.resendApiKey) {
    warnings.push("RESEND_API_KEY is not configured. Email notifications will be logged but not sent.");
  }

  if (!env.crmWebhookUrl) {
    warnings.push("CRM_WEBHOOK_URL is not configured. CRM delivery will be disabled.");
  }

  return warnings;
}

export function assertSupabaseServerConfigured() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
}
