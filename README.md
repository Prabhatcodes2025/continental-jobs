# Continental Mercantile Corporation Website

Premium Next.js website and Supabase-ready admin/backend for Continental Mercantile Corporation.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Zod validation
- Supabase-ready PostgreSQL/Auth/Storage architecture
- Local JSON/file fallback for development without keys

## Public Website

Includes:

- Homepage
- About
- Chairman Message
- Services
- Indian Operations
- Worldwide Operations
- Recruitment Process
- Documents Required
- Apply
- Employers / Manpower Requirement
- Gallery
- Contact
- Privacy Policy
- Terms of Use

The approved frontend design and content are preserved. Public pages fall back to approved static data if Supabase content is unavailable.

## Backend/Admin

Existing admin route is preserved at:

```text
/admin
```

Backend capabilities:

- Supabase-ready admin authentication.
- Development-only local admin fallback when Supabase keys are missing.
- Candidate application endpoint.
- Employer manpower order endpoint.
- Server-side Zod validation.
- File upload validation.
- Readable submission numbers:
  - `CMC-CAN-YYYY-000000`
  - `CMC-EMP-YYYY-000000`
- CRM/WhatsApp webhook readiness.
- Webhook log table.
- Activity log table.
- Contact/content/gallery admin editing.

## Setup

Install dependencies:

```bash
pnpm install
```

Create local environment file:

```bash
cp .env.example .env.local
```

Run development server:

```bash
pnpm dev
```

Build:

```bash
pnpm build
```

## Supabase Setup

Read:

- `SUPABASE_SETUP.md`
- `REQUIRED_KEYS.md`
- `SECURITY.md`

Run migration:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Or paste:

```text
supabase/migrations/001_initial_schema.sql
```

into Supabase SQL Editor.

## Environment Variables

Required for Supabase production:

```env
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_SITE_URL=""
ADMIN_SESSION_SECRET=""
```

Development-only fallback:

```env
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

Optional:

```env
ADMIN_NOTIFY_EMAIL=""
RESEND_API_KEY=""
CRM_WEBHOOK_URL=""
WHATSAPP_API_WEBHOOK_URL=""
```

## Documentation

- `BACKEND_AUDIT.md`: existing backend/admin audit and implementation plan.
- `SUPABASE_SETUP.md`: project setup, migrations, buckets, RLS and first admin.
- `ADMIN_GUIDE.md`: admin dashboard and workflow guide.
- `SECURITY.md`: auth, RLS, upload, webhook and deployment security.
- `REQUIRED_KEYS.md`: all required and optional keys with usage notes.

## Demo/Fallback Mode

If Supabase keys are missing:

- Public website still renders.
- Admin dashboard opens in clearly marked demo mode.
- Forms validate and use local development storage.
- Missing email/CRM/WhatsApp keys do not crash the site.

This mode is for development only. Production should use Supabase Auth, PostgreSQL and Storage.
