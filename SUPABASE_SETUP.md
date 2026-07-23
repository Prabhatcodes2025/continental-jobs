# Supabase Setup

## 1. Create Supabase Project

1. Go to Supabase.
2. Create a new project.
3. Choose the closest production region.
4. Save the database password in a password manager.

## 2. Add Environment Variables

Copy `.env.example` to `.env.local` locally and fill:

```env
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_SESSION_SECRET=""
```

Optional integrations:

```env
RESEND_API_KEY=""
ADMIN_NOTIFY_EMAIL=""
CRM_WEBHOOK_URL=""
WHATSAPP_API_WEBHOOK_URL=""
```

## 3. Run Migrations

Recommended with Supabase CLI:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Alternative:

1. Open Supabase SQL Editor.
2. Paste `supabase/migrations/001_initial_schema.sql`.
3. Run the SQL.

## 4. Create Storage Buckets

The migration inserts these buckets:

- `candidate-documents` private
- `public-media` public

Verify in Supabase Storage that:

- `candidate-documents` is private.
- `public-media` is public.
- MIME and size policies match the SQL migration.

## 5. Apply RLS Policies

The migration enables RLS on all sensitive tables and adds policies for:

- Public form inserts.
- Public read of active/published content.
- Admin role-based reads/updates.
- Private document access for admins only.
- Public media read.

Do not disable RLS in production.

## 6. Create First Admin User

1. In Supabase Dashboard, go to Authentication.
2. Create a user with email/password.
3. Copy the auth user UUID.
4. Insert a matching profile:

```sql
insert into public.profiles (id, email, full_name, role, status)
values (
  'AUTH_USER_UUID',
  'admin@example.com',
  'Primary Administrator',
  'super_admin',
  'active'
);
```

## 7. Link Auth User To Profiles Table

The `profiles.id` must exactly match `auth.users.id`.

Use:

```sql
select id, email from auth.users;
select id, email, role, status from public.profiles;
```

## 8. Configure Vercel Environment Variables

In Vercel project settings, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_SESSION_SECRET`

Optional:

- `RESEND_API_KEY`
- `ADMIN_NOTIFY_EMAIL`
- `CRM_WEBHOOK_URL`
- `WHATSAPP_API_WEBHOOK_URL`

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.

## 9. Redeploy

After adding environment variables:

```bash
pnpm build
```

Then redeploy through Vercel.

## 10. Verify Forms/Admin

Test:

- Candidate application submission.
- Employer manpower order submission.
- Admin login with Supabase email/password.
- Candidate and employer rows in Supabase tables.
- Webhook logs when webhook URLs are configured.
- Public pages still render if content tables are empty.

## Demo/Fallback Mode

If Supabase keys are missing:

- Public pages keep rendering with approved static content.
- Forms validate and return a safe success path using local development storage.
- Admin dashboard opens with clear demo-mode warnings.
- This is for development only and must not replace Supabase production auth.
