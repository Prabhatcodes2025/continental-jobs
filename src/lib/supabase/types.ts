export type AdminRole = "super_admin" | "admin" | "content_manager" | "recruitment_manager" | "viewer";

export type RecordStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "selected"
  | "rejected"
  | "deployed"
  | "archived";

export type EmployerRequirementStatus =
  | "new"
  | "contacted"
  | "requirement_review"
  | "proposal_sent"
  | "active"
  | "completed"
  | "rejected"
  | "archived";

export type SupabaseMode = "supabase" | "demo";

export type SupabaseTable =
  | "profiles"
  | "candidate_applications"
  | "employer_requirements"
  | "contact_settings"
  | "indian_operations"
  | "worldwide_operations"
  | "services"
  | "industries"
  | "gallery_items"
  | "recruitment_process_steps"
  | "page_content"
  | "site_settings"
  | "activity_logs"
  | "webhook_logs";

export type CandidateApplicationInsert = {
  application_number: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp?: string | null;
  current_location?: string | null;
  nationality?: string | null;
  passport_status?: string | null;
  preferred_country?: string | null;
  job_category?: string | null;
  experience_years?: string | null;
  qualification?: string | null;
  message?: string | null;
  resume_path?: string | null;
  passport_path?: string | null;
  photo_path?: string | null;
  source_page: string;
  status?: RecordStatus;
  consent_privacy: boolean;
  consent_whatsapp: boolean;
  consent_timestamp: string;
  ip_address?: string | null;
  user_agent?: string | null;
};

export type EmployerRequirementInsert = {
  order_number: string;
  company_name: string;
  contact_person: string;
  designation?: string | null;
  email: string;
  phone: string;
  whatsapp?: string | null;
  country?: string | null;
  project_location?: string | null;
  job_categories?: string | null;
  workers_required?: string | null;
  salary_range?: string | null;
  food_provided?: string | null;
  accommodation_provided?: string | null;
  contract_duration?: string | null;
  visa_details?: string | null;
  mobilization_timeline?: string | null;
  labour_compliance?: string | null;
  message?: string | null;
  document_path?: string | null;
  source_page: string;
  status?: EmployerRequirementStatus;
  consent_privacy: boolean;
  consent_whatsapp: boolean;
  consent_timestamp: string;
  ip_address?: string | null;
  user_agent?: string | null;
};
