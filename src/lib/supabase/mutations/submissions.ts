import { getRuntimeMode } from "@/lib/env";
import { supabaseAdminFetch } from "@/lib/supabase/admin";
import type { CandidateApplicationInsert, EmployerRequirementInsert } from "@/lib/supabase/types";

export function createSubmissionNumber(prefix: "CAN" | "EMP") {
  const year = new Date().getFullYear();
  const sequence = `${Date.now()}`.slice(-6);
  return `CMC-${prefix}-${year}-${sequence}`;
}

export async function insertCandidateApplication(payload: CandidateApplicationInsert) {
  if (getRuntimeMode() === "demo") {
    return { mode: "demo" as const, data: payload, error: "" };
  }

  const result = await supabaseAdminFetch<Array<CandidateApplicationInsert>>("candidate_applications", {
    method: "POST",
    body: payload,
    prefer: "return=representation"
  });

  return { mode: "supabase" as const, data: result.data?.[0] || null, error: result.error };
}

export async function insertEmployerRequirement(payload: EmployerRequirementInsert) {
  if (getRuntimeMode() === "demo") {
    return { mode: "demo" as const, data: payload, error: "" };
  }

  const result = await supabaseAdminFetch<Array<EmployerRequirementInsert>>("employer_requirements", {
    method: "POST",
    body: payload,
    prefer: "return=representation"
  });

  return { mode: "supabase" as const, data: result.data?.[0] || null, error: result.error };
}

export async function logWebhookAttempt(payload: {
  webhook_type: string;
  payload: unknown;
  response?: unknown;
  status: "disabled" | "sent" | "failed";
  attempts?: number;
}) {
  if (getRuntimeMode() === "demo") {
    return { mode: "demo" as const, error: "" };
  }

  const result = await supabaseAdminFetch("webhook_logs", {
    method: "POST",
    body: { ...payload, attempts: payload.attempts || 1 },
    prefer: "return=minimal"
  });

  return { mode: "supabase" as const, error: result.error };
}
