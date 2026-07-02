# Continental Mercantile Corporation Website

Modern Next.js website for Continental Mercantile Corporation Pvt Ltd / The Continental Group.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Zod validation
- Prisma schema for PostgreSQL
- Local JSON submission storage for development

## Features

- Premium navy, white and gold corporate theme
- Home, About, Chairman Message, Services, Indian Operations, Worldwide Operations, Recruitment Process, Documents Required, Apply, Employer Requirement, Gallery, Contact, Privacy Policy and Terms pages
- Candidate job application form with file upload support
- Employer manpower requirement form with file upload support
- WhatsApp opt-in consent text and required consent checkboxes
- Consent timestamp, IP address, user agent and source page capture
- Floating WhatsApp button and service page chat links
- Admin login and dashboard for local submissions
- CRM webhook-ready API structure
- Prisma PostgreSQL schema for production database
- SEO metadata and EmploymentAgency schema

## Setup

This project is a Next.js application, so local runtime configuration belongs in `.env.local`.

1. Install dependencies:

```bash
pnpm install
```

2. Create the local environment file:

```bash
cp .env.example .env.local
```

3. Fill `.env.local` with real credentials for your machine or deployment environment. Do not commit `.env.local`, `.env`, `.env.production` or `.env.development`.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="replace-with-random-secret"
ADMIN_NOTIFY_EMAIL="admin@example.com"
CRM_WEBHOOK_URL=""
WHATSAPP_API_WEBHOOK_URL=""
```

4. Replace placeholders before production:

- `DATABASE_URL`: managed PostgreSQL connection string
- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD`: strong admin login password
- `ADMIN_SESSION_SECRET`: long random string used to sign admin sessions
- `ADMIN_NOTIFY_EMAIL`: internal email included in CRM webhook payloads
- `CRM_WEBHOOK_URL`: optional external CRM endpoint
- `WHATSAPP_API_WEBHOOK_URL`: optional WhatsApp Business API or middleware endpoint for consent-based follow-up

5. Run development server:

```bash
pnpm dev
```

6. Build for production:

```bash
pnpm build
```

If pnpm reports ignored build scripts for Prisma packages, approve them once in your environment:

```bash
pnpm approve-builds
```

The current codebase was verified with the local Next binary:

```bash
node_modules/.bin/next build
```

## Database

The app includes `prisma/schema.prisma` for PostgreSQL production persistence. Current API routes use local JSON files under `storage/data` for development so the project works before a database is provisioned.

For production:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

Then replace the local JSON persistence in `src/lib/storage.ts` with Prisma writes, or add a repository layer that chooses Prisma when `DATABASE_URL` is available.

## Uploads

Development uploads are stored under `storage/uploads`. Allowed formats are PDF, DOC, DOCX, JPG and PNG with a 5MB limit per file.

For Vercel or cloud deployment, connect S3, Cloudflare R2, UploadThing or another persistent object storage provider.

## Deployment Notes

- Set all environment variables in the host dashboard. For Vercel/Next.js, configure them in the project Environment Variables panel rather than committing env files.
- Use a managed PostgreSQL database for form persistence.
- Configure `CRM_WEBHOOK_URL` for external CRM integration.
- Configure `WHATSAPP_API_WEBHOOK_URL` or the chosen WhatsApp Business API provider.
- Keep admin credentials, database URLs, API keys and tokens out of the repository.
- Use HTTPS in production so consent and uploaded documents are transmitted securely.

## Environment Safety

The repository intentionally tracks only `.env.example`. The following local/production env files are ignored by Git:

- `.env`
- `.env.local`
- `.env.production`
- `.env.development`
