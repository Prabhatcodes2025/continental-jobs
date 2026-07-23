# Security Notes

## Secrets

- Never commit `.env.local`, `.env`, `.env.production` or `.env.development`.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only.
- Do not import server Supabase helpers into client components.
- Rotate secrets if they are ever pasted into chat, screenshots or commits.

## Authentication

- Production admin login uses Supabase Auth.
- Admin access requires an active `profiles` row.
- Development fallback credentials are disabled in production.
- Admin sessions are signed HTTP-only cookies.

## Authorization

RLS policies enforce:

- Public users can insert applications and employer requirements.
- Public users cannot read submitted applications or employer orders.
- Public users can read only active/published content.
- Admin access is role-based.
- Only `super_admin` manages admin profiles.

## File Uploads

Private bucket:

- `candidate-documents`
- resumes
- passports
- photos
- employer documents

Public bucket:

- `public-media`
- gallery
- industry images
- service images
- branding assets

Validation:

- Resume: PDF/DOC/DOCX, max 5 MB.
- Passport: PDF/JPG/PNG, max 5 MB.
- Photo: JPG/PNG/WebP, max 3 MB.
- Employer document: PDF/DOC/DOCX, max 10 MB.
- Gallery: JPG/PNG/WebP, max 8 MB.

Use UUID paths and signed URLs for private documents.

## Form Security

- Server-side Zod validation is used.
- Consent, IP, user agent and source page are captured.
- Honeypot `website` field exists in schemas.
- Add CAPTCHA/rate-limit provider before high-traffic launch.

## Webhooks

- Save database row before sending webhooks.
- Webhook failures must not fail the main submission.
- Log webhook attempts in `webhook_logs`.
- Do not send WhatsApp messages directly without a proper provider credential and consent workflow.

## Production Verification

Before launch verify:

- No service-role key appears in client bundles.
- RLS is enabled on all sensitive tables.
- Private storage bucket is not public.
- Admin APIs are protected.
- Public pages render when Supabase is temporarily unavailable.
- Error messages are friendly and do not expose secrets.
