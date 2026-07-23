import { getRuntimeMode } from "@/lib/env";
import { supabaseAdminFetch } from "@/lib/supabase/admin";

export async function readAdminDashboardCounts() {
  if (getRuntimeMode() === "demo") {
    return {
      mode: "demo" as const,
      candidateApplications: 0,
      applicationsUnderReview: 0,
      shortlistedCandidates: 0,
      newEmployerOrders: 0,
      activeEmployerRequirements: 0,
      galleryItems: 0,
      activeServices: 0,
      recentActivity: 0
    };
  }

  const [candidates, employers, gallery, services, activity] = await Promise.all([
    supabaseAdminFetch<Array<{ status: string }>>("candidate_applications", { query: "select=status&archived_at=is.null" }),
    supabaseAdminFetch<Array<{ status: string }>>("employer_requirements", { query: "select=status&archived_at=is.null" }),
    supabaseAdminFetch<Array<{ id: string }>>("gallery_items", { query: "select=id&active=eq.true" }),
    supabaseAdminFetch<Array<{ id: string }>>("services", { query: "select=id&active=eq.true" }),
    supabaseAdminFetch<Array<{ id: string }>>("activity_logs", { query: "select=id&order=created_at.desc&limit=10" })
  ]);

  const candidateRows = candidates.data || [];
  const employerRows = employers.data || [];

  return {
    mode: "supabase" as const,
    candidateApplications: candidateRows.length,
    applicationsUnderReview: candidateRows.filter((row) => row.status === "reviewing").length,
    shortlistedCandidates: candidateRows.filter((row) => row.status === "shortlisted").length,
    newEmployerOrders: employerRows.filter((row) => row.status === "new").length,
    activeEmployerRequirements: employerRows.filter((row) => row.status === "active").length,
    galleryItems: gallery.data?.length || 0,
    activeServices: services.data?.length || 0,
    recentActivity: activity.data?.length || 0
  };
}

export async function readRecentSubmissions() {
  if (getRuntimeMode() === "demo") {
    return { mode: "demo" as const, candidates: [], employers: [] };
  }

  const [candidates, employers] = await Promise.all([
    supabaseAdminFetch<Array<Record<string, unknown>>>("candidate_applications", {
      query: "select=id,application_number,full_name,email,phone,status,created_at&order=created_at.desc&limit=8"
    }),
    supabaseAdminFetch<Array<Record<string, unknown>>>("employer_requirements", {
      query: "select=id,order_number,company_name,contact_person,email,phone,status,created_at&order=created_at.desc&limit=8"
    })
  ]);

  return {
    mode: "supabase" as const,
    candidates: candidates.data || [],
    employers: employers.data || []
  };
}
