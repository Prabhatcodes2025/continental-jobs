# Backend Audit

## Current Framework And Version

- Next.js App Router application.
- React 18, TypeScript, Tailwind CSS, Framer Motion, Zod.
- `package.json` currently resolves Next through the lockfile at `14.2.35`.
- Prisma schema exists, but active persistence was local JSON before this Supabase-ready pass.

## Existing Admin Routes

- `src/app/admin/page.tsx`
  - Existing admin login screen.
  - Existing dashboard route.
  - Existing editable content form for contacts, operations lists and gallery.
- `src/app/api/admin/login/route.ts`
  - Existing POST login route.
  - Preserved and upgraded to prefer Supabase Auth when configured.
  - Development-only local credential fallback remains for missing-key demo mode.

## Existing Authentication Logic

- `src/lib/auth.ts` signs an HTTP-only admin session cookie.
- Previous implementation required `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
- Current implementation:
  - Uses Supabase Auth when Supabase keys are available.
  - Validates active profile rows from `profiles`.
  - Uses a signed cookie for route gating.
  - Uses local fallback only outside production.

## Existing API Routes And Form Handling

- `src/app/api/applications/route.ts`
  - Candidate application form endpoint.
  - Zod validation.
  - File upload handling.
  - IP, user-agent, source page and consent capture.
  - CRM and WhatsApp webhook-ready calls.
- `src/app/api/requirements/route.ts`
  - Employer manpower order endpoint.
  - Zod validation.
  - File upload handling.
  - IP, user-agent, source page and consent capture.
  - CRM and WhatsApp webhook-ready calls.

## Existing Database Or ORM Setup

- `prisma/schema.prisma` exists with early PostgreSQL models.
- The active application path did not depend on Prisma at runtime.
- New Supabase SQL migration lives at `supabase/migrations/001_initial_schema.sql`.

## Existing Environment Variables

Previously documented:

- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_NOTIFY_EMAIL`
- `CRM_WEBHOOK_URL`
- `WHATSAPP_API_WEBHOOK_URL`

Current `.env.example` now separates:

- Supabase public/server keys.
- deployment/site values.
- development-only fallback admin values.
- optional email, CRM and WhatsApp integration values.

## Existing File Upload Implementation

- `src/lib/storage.ts`
  - Local development uploads into `storage/uploads`.
  - Gallery image uploads into `public/uploads/gallery`.
  - MIME allow-list and size checks.
  - Sanitized filenames and UUID paths.

## Existing Mock/Demo Data

- `src/lib/site-data.ts`
  - Approved contact details.
  - Approved Indian Operations list.
  - Approved Worldwide Operations list with only approved countries.
  - Services, industries, recruitment steps, gallery references and SEO data.
- `src/lib/content.ts`
  - Default editable site content.
- `src/lib/storage.ts`
  - Local JSON fallback records under `storage/data`.

## Existing CRM/Webhook Structure

- `sendWebhook()` and `sendWhatsAppWebhook()` already existed.
- They now also call Supabase-ready `webhook_logs` when configured.
- Missing webhook URLs do not block form submissions.

## Existing Contact/Gallery/Content Configuration

- Contact details are centrally represented in `src/lib/site-data.ts`.
- Editable admin content can override selected values through local JSON.
- Public pages fall back to approved static content if editable data is unavailable.

## What Works

- Public pages render without database keys.
- Candidate and employer forms validate server-side.
- File upload validation exists.
- Admin route exists.
- Content editor exists.
- CRM/WhatsApp webhook hooks exist.
- Production build works after dependency access is available.

## What Is Incomplete

- Supabase project keys are not present.
- Real Supabase Auth users/profiles are not created yet.
- Supabase Storage buckets must be created/applied in the Supabase project.
- Fine-grained admin pages are currently represented in dashboard modules, not split into many routes.
- Email provider is prepared but not fully wired to Resend templates.
- CSV/XLSX export UI is not fully implemented yet.

## What Must Be Replaced

- Development fallback `ADMIN_EMAIL` / `ADMIN_PASSWORD` must not be used as production admin auth.
- Local JSON persistence should remain fallback only after Supabase is configured.
- Permanent local upload storage should not be used on Vercel production.

## What Should Be Preserved

- Approved frontend design and content.
- Existing admin route.
- Existing form endpoints.
- Zod validation.
- Local demo fallback behavior.
- Central approved contact/company data.
- Public-page fallback to approved static content.

## Security Issues Found

- Previous hardcoded password login was production-blocking.
- Missing Supabase RLS policies.
- Missing private document storage policy.
- Missing audit-log table.
- Missing webhook-log table.
- Missing central environment validation.

## Production Blockers

- Add Supabase keys.
- Run SQL migration.
- Create first Supabase Auth admin user.
- Link that user to `profiles`.
- Configure Vercel environment variables.
- Configure persistent Supabase Storage buckets.
- Optionally configure Resend, CRM and WhatsApp webhook endpoints.

## Implementation Plan

1. Preserve existing public frontend and admin route.
2. Add central env validation and demo/Supabase runtime detection.
3. Add Supabase-ready REST integration layer.
4. Add full SQL migration with tables, indexes, RLS and storage policies.
5. Update admin login to prefer Supabase Auth and keep dev-only fallback.
6. Update form APIs to generate application/order numbers and insert through Supabase when configured.
7. Keep local JSON fallback for development without keys.
8. Add backend/admin documentation and required key report.
9. Build and fix TypeScript/Next issues.
