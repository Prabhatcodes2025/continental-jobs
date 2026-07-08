import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ImagePlus, LockKeyhole, MapPinned, Settings, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { isAdminAuthenticated } from "@/lib/auth";
import { activityCategories, contentFromFormData, defaultSiteContent, type OfficeContact, type SiteContent } from "@/lib/content";
import { readRecords, readSiteContent, saveGalleryImages, writeSiteContent } from "@/lib/storage";
import { company } from "@/lib/site-data";

export const metadata = {
  title: "Admin Dashboard"
};

export const dynamic = "force-dynamic";

async function updateSiteContent(formData: FormData) {
  "use server";

  if (!isAdminAuthenticated()) {
    redirect("/admin?error=1");
  }

  const imageFields = defaultSiteContent.gallery.map((_, index) => `gallery-${index}-image`);
  try {
    const uploaded = await saveGalleryImages(formData, imageFields);
    const imagePaths = imageFields.map((field) => uploaded[field] || "");
    const content = contentFromFormData(formData, imagePaths);

    await writeSiteContent(content);
    revalidatePath("/contact");
    revalidatePath("/gallery");
    revalidatePath("/indian-operations");
    revalidatePath("/worldwide-operations");
    revalidatePath("/");
  } catch (error) {
    console.error("Unable to save editable website content.", error);
    redirect("/admin?contentError=1");
  }

  redirect("/admin?updated=1");
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: { contentError?: string; error?: string; updated?: string };
}) {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return (
      <section className="premium-band min-h-[72vh] px-4 py-20 text-white">
        <div className="mx-auto max-w-md rounded-lg border border-white/12 bg-white/10 p-8 shadow-glow backdrop-blur">
          <LockKeyhole className="h-10 w-10 text-gold" />
          <h1 className="mt-5 text-3xl font-black">Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Protected dashboard for candidate applications, employer requirements and configurable CRM-ready settings.
          </p>
          {searchParams.error ? <p className="mt-4 rounded bg-red-500/20 p-3 text-sm font-bold text-red-100">Invalid admin credentials.</p> : null}
          <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
            <input name="email" type="email" className="field" placeholder="Admin email" required />
            <input name="password" type="password" className="field" placeholder="Password" required />
            <button className="button-primary" type="submit">Sign In</button>
          </form>
        </div>
      </section>
    );
  }

  const [applications, requirements, siteContent] = await Promise.all([
    readRecords("applications"),
    readRecords("requirements"),
    readSiteContent()
  ]);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">Admin</p>
            <h1 className="mt-3 text-4xl font-black text-slate-950">Continental Dashboard</h1>
            <p className="mt-3 text-slate-600">Local development dashboard. Connect PostgreSQL/Prisma and CRM webhooks for production.</p>
          </div>
          <form action={async () => {
            "use server";
            redirect("/");
          }}>
            <button className="button-primary" type="submit">Back to Website</button>
          </form>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Metric icon={<UsersRound className="h-7 w-7" />} label="Candidate Applications" value={applications.length} />
          <Metric icon={<UsersRound className="h-7 w-7" />} label="Employer Requirements" value={requirements.length} />
          <Metric icon={<Settings className="h-7 w-7" />} label="Configurable WhatsApp" value={company.phones.whatsapp} />
        </div>

        {searchParams.updated ? (
          <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
            Contact, locations and gallery content updated successfully.
          </div>
        ) : null}
        {searchParams.contentError ? (
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">
            Website content could not be saved in this environment. Public pages are still using fallback static data.
          </div>
        ) : null}

        <DashboardTable title="Candidate Applications" records={applications} />
        <DashboardTable title="Employer Requirements" records={requirements} />
        <ContentEditor content={siteContent} />

        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black text-slate-950">Configuration Notes</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Phone numbers, WhatsApp number, emails, addresses, gallery, jobs, services, countries, privacy
            policy and terms are structured for admin/CRM control. For production, persist settings in the
            Prisma <code>SiteSetting</code> table and connect <code>CRM_WEBHOOK_URL</code> / <code>WHATSAPP_API_WEBHOOK_URL</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-gold">{icon}</div>
      <p className="mt-4 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

function ContentEditor({ content }: { content: SiteContent }) {
  const offices = content.offices.length ? content.offices : defaultSiteContent.offices;
  const gallery = content.gallery.length ? content.gallery : defaultSiteContent.gallery;

  return (
    <form action={updateSiteContent} className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-navy p-6 text-white">
        <p className="text-sm font-black uppercase tracking-[0.26em] text-gold">Editable Website Content</p>
        <h2 className="mt-3 text-2xl font-black">Contact Information, Locations and Gallery</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Update client-facing contact details, Indian/worldwide operation lists and brochure-style activity images from here.
        </p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        {offices.map((office, index) => (
          <AdminOfficeFields key={office.title} office={office} index={index} />
        ))}
      </div>

      <div className="grid gap-6 border-t border-slate-200 p-6 lg:grid-cols-2">
        <label className="grid gap-2">
          <span className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-gold">
            <MapPinned className="h-4 w-4" /> Indian Operations
          </span>
          <textarea
            name="indianOperations"
            rows={7}
            className="field min-h-40"
            defaultValue={content.indianOperations.join("\n")}
          />
          <span className="text-xs font-semibold text-slate-500">Use one location per line.</span>
        </label>
        <label className="grid gap-2">
          <span className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-gold">
            <MapPinned className="h-4 w-4" /> Worldwide Operations
          </span>
          <textarea
            name="worldwideOperations"
            rows={7}
            className="field min-h-40"
            defaultValue={content.worldwideOperations.join("\n")}
          />
          <span className="text-xs font-semibold text-slate-500">Use one country/region per line.</span>
        </label>
      </div>

      <div className="border-t border-slate-200 p-6">
        <div className="flex items-start gap-3">
          <ImagePlus className="mt-1 h-6 w-6 text-gold" />
          <div>
            <h3 className="text-xl font-black text-slate-950">Gallery and Activity Images</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Manage images for Oil & Gas Recruitment, Healthcare, Hospitality, Security, Retail, Construction, MEP and Ship Building.
              Paste an existing image path or upload a new JPG/PNG/WEBP file for any row.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5">
          {gallery.map((item, index) => (
            <div key={`${item.title}-${index}`} className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr_1fr]">
              <div className="grid gap-3">
                <input name={`gallery-${index}-title`} className="field" defaultValue={item.title} aria-label={`Gallery ${index + 1} title`} />
                <textarea name={`gallery-${index}-caption`} className="field min-h-24" defaultValue={item.caption} aria-label={`Gallery ${index + 1} caption`} />
                <select name={`gallery-${index}-activity`} className="field" defaultValue={item.activity} aria-label={`Gallery ${index + 1} activity`}>
                  {[item.activity, ...activityCategories].filter((value, itemIndex, values) => value && values.indexOf(value) === itemIndex).map((activity) => (
                    <option key={activity} value={activity}>{activity}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-3">
                <input name={`gallery-${index}-src`} className="field" defaultValue={item.src} aria-label={`Gallery ${index + 1} image path`} />
                <input
                  name={`gallery-${index}-image`}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="field file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                  aria-label={`Upload gallery ${index + 1} image`}
                />
                <p className="rounded-md bg-white p-3 text-xs font-semibold text-slate-500">Current: {item.src}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-end border-t border-slate-200 bg-white/95 p-5 backdrop-blur">
        <button type="submit" className="button-primary">Save Contact, Locations and Gallery</button>
      </div>
    </form>
  );
}

function AdminOfficeFields({ office, index }: { office: OfficeContact; index: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-black text-slate-950">{office.title}</h3>
      <div className="mt-4 grid gap-3">
        <input name={`office-${index}-title`} className="field" defaultValue={office.title} aria-label={`${office.title} title`} />
        <input name={`office-${index}-subtitle`} className="field" defaultValue={office.subtitle} aria-label={`${office.title} subtitle`} />
        <textarea name={`office-${index}-address`} className="field min-h-24" defaultValue={office.address} aria-label={`${office.title} address`} />
        <textarea name={`office-${index}-phones`} className="field min-h-24" defaultValue={office.phones.join("\n")} aria-label={`${office.title} phones`} />
        <input name={`office-${index}-whatsapp`} className="field" defaultValue={office.whatsapp || ""} placeholder="WhatsApp number" aria-label={`${office.title} WhatsApp`} />
        <textarea name={`office-${index}-emails`} className="field min-h-24" defaultValue={office.emails.join("\n")} aria-label={`${office.title} emails`} />
        <input name={`office-${index}-website`} className="field" defaultValue={office.website || ""} placeholder="Website" aria-label={`${office.title} website`} />
        <textarea name={`office-${index}-managerPhones`} className="field min-h-20" defaultValue={(office.managerPhones || []).join("\n")} placeholder="PRO / Manager numbers" aria-label={`${office.title} manager phones`} />
      </div>
    </div>
  );
}

function DashboardTable({ title, records }: { title: string; records: unknown[] }) {
  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4">Name / Company</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Source</th>
              <th className="p-4">Consent Time</th>
              <th className="p-4">Uploads</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td className="p-5 text-slate-500" colSpan={6}>No submissions yet.</td></tr>
            ) : records.map((record, index) => {
              const row = record as Record<string, unknown>;
              return (
                <tr key={String(row.id || index)} className="border-t border-slate-100">
                  <td className="p-4 font-bold text-slate-900">{String(row.fullName || row.companyName || "-")}</td>
                  <td className="p-4 text-slate-600">{String(row.email || "-")}</td>
                  <td className="p-4 text-slate-600">{String(row.mobile || row.phone || "-")}</td>
                  <td className="p-4 text-slate-600">{String(row.sourcePage || "-")}</td>
                  <td className="p-4 text-slate-600">{String(row.consentTimestamp || "-")}</td>
                  <td className="p-4 text-slate-600">{Array.isArray(row.uploads) ? row.uploads.length : 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
