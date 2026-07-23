# Admin Guide

## Admin URL

Use:

```text
/admin
```

The existing admin route is preserved. Do not create another admin route.

## Authentication

Production:

- Supabase Auth email/password.
- User must have an active row in `profiles`.
- Role controls access.

Development without Supabase:

- Uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` only when `NODE_ENV !== "production"`.
- Dashboard clearly shows demo-mode warnings.

## Roles

- `super_admin`: full control, admin users and sensitive settings.
- `admin`: operational administration.
- `content_manager`: content, gallery, settings.
- `recruitment_manager`: applications and employer requirements.
- `viewer`: read-only dashboard access.

## Dashboard Sections

Current admin dashboard includes:

- New Candidate Applications.
- Applications Under Review.
- Shortlisted Candidates.
- New Employer Orders.
- Active Employer Requirements.
- Total Gallery Items.
- Active Services.
- Recent Activity.
- Recent submissions.
- Existing editable content form.

## Candidate Management

Supabase schema supports:

- Search/filter/sort/pagination.
- Status updates.
- Assignment.
- Internal notes.
- Secure resume/passport/photo paths.
- WhatsApp/email/phone actions.
- Bulk/archive/export workflows.

## Employer Manpower Orders

Supabase schema supports:

- Company and contact details.
- Project/country/location data.
- Worker categories and required count.
- Salary/facility/visa/mobilization details.
- Follow-up date.
- Assignment, notes, status and archive.

## Content Management

The current admin content editor preserves:

- Contact details.
- Indian Operations.
- Worldwide Operations.
- Gallery/activity images.

The Supabase schema additionally supports:

- Page content.
- Services.
- Industries.
- Recruitment process.
- Footer.
- Trust metrics.
- Draft/published status.

## Contact Settings

Use one source of truth:

- Corporate Office.
- Operations Office.
- Recruitment email.
- Header call number.
- Floating WhatsApp number.
- WhatsApp message templates.

Public pages should fall back to `src/lib/site-data.ts` if Supabase content is missing.

## Gallery Management

Supported categories:

- Corporate
- Indian Operations
- Worldwide Operations
- Oil & Gas
- Healthcare
- Hospitality
- Security
- Retail
- Construction
- MEP
- Shipbuilding
- Recruitment Campaigns

Store public gallery files in `public-media`.

## Operational Checklist

1. Confirm Supabase keys are present.
2. Confirm first admin profile is active.
3. Submit one candidate form.
4. Submit one employer order.
5. Verify dashboard counts.
6. Verify uploads are private.
7. Verify CRM/WhatsApp logs if URLs are configured.
