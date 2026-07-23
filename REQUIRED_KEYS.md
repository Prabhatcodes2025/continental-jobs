# Required Keys

## Required Immediately

### `NEXT_PUBLIC_SUPABASE_URL`

- Where to get it: Supabase Project Settings, API.
- Public or secret: Public.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Browser/server connection to Supabase project.

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- Where to get it: Supabase Project Settings, API.
- Public or secret: Public, but still project-specific.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Supabase Auth and public RLS-safe requests.

### `SUPABASE_SERVICE_ROLE_KEY`

- Where to get it: Supabase Project Settings, API, service role key.
- Public or secret: Secret.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Server-side admin inserts, private storage signed URLs, webhook logs.
- Important: Never expose in client components or browser bundles.

## Required For Deployment/Config

### `NEXT_PUBLIC_SITE_URL`

- Where to get it: Production site domain, for example `https://continental-jobs.vercel.app`.
- Public or secret: Public.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Metadata, callbacks, canonical URLs and production integrations.

### `ADMIN_SESSION_SECRET`

- Where to get it: Generate with a password manager or `openssl rand -base64 48`.
- Public or secret: Secret.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Signing admin session cookies.

## Development-Only Fallback

### `ADMIN_EMAIL`

- Where to get it: Choose a local development admin email.
- Public or secret: Secret in practice.
- Add locally: `.env.local`.
- Add in Vercel: Not recommended after Supabase Auth is configured.
- Needed for: Development-only fallback login when Supabase keys are missing.

### `ADMIN_PASSWORD`

- Where to get it: Generate a local development password.
- Public or secret: Secret.
- Add locally: `.env.local`.
- Add in Vercel: Not recommended after Supabase Auth is configured.
- Needed for: Development-only fallback login when Supabase keys are missing.

## Optional Later

### `RESEND_API_KEY`

- Where to get it: Resend dashboard.
- Public or secret: Secret.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Candidate/employer acknowledgement emails and admin notifications.

### `ADMIN_NOTIFY_EMAIL`

- Where to get it: Company email inbox for admin notifications.
- Public or secret: Private operational config.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Internal notification recipient.

### `CRM_WEBHOOK_URL`

- Where to get it: CRM or automation provider.
- Public or secret: Secret/private integration URL.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Sending candidate/employer submissions to CRM.

### `WHATSAPP_API_WEBHOOK_URL`

- Where to get it: WhatsApp Business API middleware/provider.
- Public or secret: Secret/private integration URL.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Consent-based WhatsApp workflow integration.

### CAPTCHA Keys

- Where to get it: Turnstile, reCAPTCHA, hCaptcha or chosen provider.
- Public or secret: Usually one public site key and one secret server key.
- Add locally: `.env.local`.
- Add in Vercel: Project Settings, Environment Variables.
- Needed for: Bot/spam protection before high-traffic production launch.
