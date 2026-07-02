import { redirect } from "next/navigation";
import { LockKeyhole, Settings, UsersRound } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";
import { readRecords } from "@/lib/storage";
import { company } from "@/lib/site-data";

export const metadata = {
  title: "Admin Dashboard"
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams
}: {
  searchParams: { error?: string };
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

  const [applications, requirements] = await Promise.all([
    readRecords("applications"),
    readRecords("requirements")
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

        <DashboardTable title="Candidate Applications" records={applications} />
        <DashboardTable title="Employer Requirements" records={requirements} />

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

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-gold">{icon}</div>
      <p className="mt-4 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
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
