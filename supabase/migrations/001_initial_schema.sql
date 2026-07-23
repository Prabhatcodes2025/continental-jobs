-- Continental Mercantile Corporation - Supabase initial schema
-- Run in Supabase SQL editor or with: supabase db push

create extension if not exists "pgcrypto";

create type public.admin_role as enum ('super_admin', 'admin', 'content_manager', 'recruitment_manager', 'viewer');
create type public.profile_status as enum ('invited', 'active', 'disabled');
create type public.candidate_status as enum ('new', 'reviewing', 'shortlisted', 'interview', 'selected', 'rejected', 'deployed', 'archived');
create type public.employer_status as enum ('new', 'contacted', 'requirement_review', 'proposal_sent', 'active', 'completed', 'rejected', 'archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role public.admin_role not null default 'viewer',
  status public.profile_status not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  application_number text not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  current_location text,
  nationality text,
  passport_status text,
  preferred_country text,
  job_category text,
  experience_years text,
  qualification text,
  message text,
  resume_path text,
  passport_path text,
  photo_path text,
  source_page text not null default '/apply',
  status public.candidate_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  consent_privacy boolean not null default false,
  consent_whatsapp boolean not null default false,
  consent_timestamp timestamptz not null default now(),
  ip_address text,
  user_agent text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.employer_requirements (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  company_name text not null,
  contact_person text not null,
  designation text,
  email text not null,
  phone text not null,
  whatsapp text,
  country text,
  project_location text,
  job_categories text,
  workers_required text,
  salary_range text,
  food_provided text,
  accommodation_provided text,
  contract_duration text,
  visa_details text,
  mobilization_timeline text,
  labour_compliance text,
  message text,
  document_path text,
  source_page text not null default '/manpower-requirement',
  status public.employer_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  follow_up_at timestamptz,
  consent_privacy boolean not null default false,
  consent_whatsapp boolean not null default false,
  consent_timestamp timestamptz not null default now(),
  ip_address text,
  user_agent text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_settings (
  id uuid primary key default gen_random_uuid(),
  corporate_label text not null,
  corporate_description text,
  corporate_address text,
  corporate_phones text[] not null default '{}',
  corporate_whatsapp text,
  corporate_email text,
  operations_label text not null,
  operations_description text,
  operations_address text,
  operations_phones text[] not null default '{}',
  operations_whatsapp text,
  operations_email text,
  operations_pro_number text,
  operations_manager_number text,
  recruitment_email text,
  website text,
  header_call_number text,
  floating_whatsapp_number text,
  whatsapp_message text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create table public.indian_operations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  office_type text,
  state text,
  display_order integer not null default 0,
  map_x numeric,
  map_y numeric,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.worldwide_operations (
  id uuid primary key default gen_random_uuid(),
  country_name text not null unique,
  country_code text,
  region text,
  flag_code text,
  map_x numeric,
  map_y numeric,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  icon text,
  image_path text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.industries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  icon text,
  image_path text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  caption text,
  image_path text not null,
  alt_text text not null,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recruitment_process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number integer not null,
  phase text,
  title text not null,
  description text,
  icon text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(step_number)
);

create table public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  heading text,
  subheading text,
  body text,
  button_text text,
  button_url text,
  image_path text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'published',
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null,
  unique(page_key, section_key)
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create table public.webhook_logs (
  id uuid primary key default gen_random_uuid(),
  webhook_type text not null,
  payload jsonb,
  response jsonb,
  status text not null check (status in ('disabled', 'sent', 'failed', 'retrying')),
  attempts integer not null default 1,
  created_at timestamptz not null default now()
);

create index candidate_applications_status_idx on public.candidate_applications(status);
create index candidate_applications_created_idx on public.candidate_applications(created_at desc);
create index candidate_applications_assigned_idx on public.candidate_applications(assigned_to);
create index employer_requirements_status_idx on public.employer_requirements(status);
create index employer_requirements_created_idx on public.employer_requirements(created_at desc);
create index employer_requirements_assigned_idx on public.employer_requirements(assigned_to);
create index gallery_items_active_order_idx on public.gallery_items(active, display_order);
create index page_content_lookup_idx on public.page_content(page_key, section_key, status);
create index activity_logs_created_idx on public.activity_logs(created_at desc);
create index webhook_logs_created_idx on public.webhook_logs(created_at desc);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger candidate_applications_updated_at before update on public.candidate_applications for each row execute function public.set_updated_at();
create trigger employer_requirements_updated_at before update on public.employer_requirements for each row execute function public.set_updated_at();
create trigger indian_operations_updated_at before update on public.indian_operations for each row execute function public.set_updated_at();
create trigger worldwide_operations_updated_at before update on public.worldwide_operations for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger industries_updated_at before update on public.industries for each row execute function public.set_updated_at();
create trigger gallery_items_updated_at before update on public.gallery_items for each row execute function public.set_updated_at();
create trigger recruitment_process_steps_updated_at before update on public.recruitment_process_steps for each row execute function public.set_updated_at();

create or replace function public.current_admin_role()
returns public.admin_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and status = 'active'
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_admin_role() in ('super_admin', 'admin', 'content_manager', 'recruitment_manager')
$$;

alter table public.profiles enable row level security;
alter table public.candidate_applications enable row level security;
alter table public.employer_requirements enable row level security;
alter table public.contact_settings enable row level security;
alter table public.indian_operations enable row level security;
alter table public.worldwide_operations enable row level security;
alter table public.services enable row level security;
alter table public.industries enable row level security;
alter table public.gallery_items enable row level security;
alter table public.recruitment_process_steps enable row level security;
alter table public.page_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.activity_logs enable row level security;
alter table public.webhook_logs enable row level security;

create policy "profiles read own or super admin" on public.profiles for select using (id = auth.uid() or public.current_admin_role() = 'super_admin');
create policy "profiles super admin manage" on public.profiles for all using (public.current_admin_role() = 'super_admin') with check (public.current_admin_role() = 'super_admin');

create policy "public insert candidate applications" on public.candidate_applications for insert with check (true);
create policy "admins read candidate applications" on public.candidate_applications for select using (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager', 'viewer'));
create policy "recruitment admins update candidate applications" on public.candidate_applications for update using (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager'));

create policy "public insert employer requirements" on public.employer_requirements for insert with check (true);
create policy "admins read employer requirements" on public.employer_requirements for select using (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager', 'viewer'));
create policy "recruitment admins update employer requirements" on public.employer_requirements for update using (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'recruitment_manager'));

create policy "public read active indian operations" on public.indian_operations for select using (active = true);
create policy "public read active worldwide operations" on public.worldwide_operations for select using (active = true);
create policy "public read active services" on public.services for select using (active = true);
create policy "public read active industries" on public.industries for select using (active = true);
create policy "public read active gallery" on public.gallery_items for select using (active = true);
create policy "public read active recruitment steps" on public.recruitment_process_steps for select using (active = true);
create policy "public read published page content" on public.page_content for select using (status = 'published');
create policy "public read site settings" on public.site_settings for select using (true);
create policy "public read contact settings" on public.contact_settings for select using (true);

create policy "content admins manage public content" on public.indian_operations for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage worldwide operations" on public.worldwide_operations for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage services" on public.services for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage industries" on public.industries for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage gallery" on public.gallery_items for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage recruitment steps" on public.recruitment_process_steps for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "content admins manage page content" on public.page_content for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "admins manage settings" on public.site_settings for all using (public.current_admin_role() in ('super_admin', 'admin')) with check (public.current_admin_role() in ('super_admin', 'admin'));
create policy "admins manage contact settings" on public.contact_settings for all using (public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));
create policy "admins read activity logs" on public.activity_logs for select using (public.current_admin_role() in ('super_admin', 'admin', 'viewer'));
create policy "admins insert activity logs" on public.activity_logs for insert with check (public.current_admin_role() in ('super_admin', 'admin', 'content_manager', 'recruitment_manager'));
create policy "admins read webhook logs" on public.webhook_logs for select using (public.current_admin_role() in ('super_admin', 'admin'));
create policy "service role inserts webhook logs" on public.webhook_logs for insert with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('candidate-documents', 'candidate-documents', false, 10485760, array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png','image/webp']),
  ('public-media', 'public-media', true, 8388608, array['image/jpeg','image/png','image/webp','image/svg+xml'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "admins read private candidate documents" on storage.objects for select using (bucket_id = 'candidate-documents' and public.is_admin());
create policy "public can upload candidate documents" on storage.objects for insert with check (bucket_id = 'candidate-documents');
create policy "public read public media" on storage.objects for select using (bucket_id = 'public-media');
create policy "content admins manage public media" on storage.objects for all using (bucket_id = 'public-media' and public.current_admin_role() in ('super_admin', 'admin', 'content_manager')) with check (bucket_id = 'public-media' and public.current_admin_role() in ('super_admin', 'admin', 'content_manager'));

insert into public.contact_settings (
  corporate_label, corporate_description, corporate_address, corporate_phones, corporate_whatsapp, corporate_email,
  operations_label, operations_description, operations_address, operations_phones, operations_whatsapp, operations_email,
  operations_pro_number, operations_manager_number, recruitment_email, website, header_call_number, floating_whatsapp_number, whatsapp_message
) values (
  'CORPORATE OFFICE', 'Corporate office for international client dealings and control of Indian operations.',
  'Continental Towers, Near Ernakulam South, Cochin, Kerala - 11, India',
  array['0091 890 70 900 50','0091 890 70 900 60'], '8907090001', 'recruitments@continentalmanpower.com',
  'OPERATIONS OFFICE', 'Operational support for client handling and all visa-processing activities.',
  '"Devdutt", Near Taj Hotel, Bandra(W), Mumbai-50',
  array['0091 890 70 900 10','0091 890 70 900 20'], '8907090020', 'gulfrecruitments@continentalmanpower.com',
  '+91 98950 50050', '+91 89070 90002', 'recruitments@continentalmanpower.com', 'continentalmanpower.com',
  '+918907090050', '+918907090001', 'Hello Continental Mercantile Corporation, I would like to know more.'
);

insert into public.indian_operations (name, office_type, state, display_order, active) values
('Cochin', 'corporate_office', 'Kerala', 1, true),
('Madurai', 'regional', 'Tamil Nadu', 2, true),
('Bombay', 'operations_office', 'Maharashtra', 3, true),
('Gujarat', 'regional', 'Gujarat', 4, true),
('Jaipur', 'regional', 'Rajasthan', 5, true),
('Delhi', 'regional', 'Delhi', 6, true),
('Kolkata', 'regional', 'West Bengal', 7, true),
('Siliguri', 'regional', 'West Bengal', 8, true),
('Vizag', 'regional', 'Andhra Pradesh', 9, true)
on conflict (name) do update set active = excluded.active, display_order = excluded.display_order;

insert into public.worldwide_operations (country_name, country_code, region, flag_code, display_order, active) values
('India', 'IN', 'Asia', 'in', 1, true),
('Singapore', 'SG', 'Far East', 'sg', 2, true),
('Philippines', 'PH', 'Far East', 'ph', 3, true),
('Malaysia', 'MY', 'Far East', 'my', 4, true),
('Dubai / UAE', 'AE', 'Middle East', 'ae', 5, true),
('Kuwait', 'KW', 'Middle East', 'kw', 6, true),
('Bahrain', 'BH', 'Middle East', 'bh', 7, true),
('Oman', 'OM', 'Middle East', 'om', 8, true),
('Saudi Arabia', 'SA', 'Middle East', 'sa', 9, true),
('Qatar', 'QA', 'Middle East', 'qa', 10, true),
('London / UK', 'GB', 'Europe / UK', 'gb', 11, true),
('Malta', 'MT', 'Europe / UK', 'mt', 12, true),
('Spain', 'ES', 'Europe / UK', 'es', 13, true),
('Croatia', 'HR', 'Europe / UK', 'hr', 14, true),
('Nepal', 'NP', 'Asia', 'np', 15, true),
('Bangladesh', 'BD', 'Asia', 'bd', 16, true),
('Sri Lanka', 'LK', 'Asia', 'lk', 17, true),
('Kenya', 'KE', 'Africa', 'ke', 18, true),
('Ghana', 'GH', 'Africa', 'gh', 19, true),
('Uganda', 'UG', 'Africa', 'ug', 20, true),
('Nigeria', 'NG', 'Africa', 'ng', 21, true),
('Africa', 'AF', 'Africa', 'africa', 22, true)
on conflict (country_name) do update set active = excluded.active, display_order = excluded.display_order;

insert into public.site_settings (key, value) values
('brand', '{"companyName":"CONTINENTAL MERCANTILE CORPORATION","years":"43+","iso":"ISO 9001 Certified","website":"continentalmanpower.com"}'::jsonb),
('footer', '{"globalReachExcludes":[],"companyName":"CONTINENTAL MERCANTILE CORPORATION"}'::jsonb)
on conflict (key) do update set value = excluded.value;
