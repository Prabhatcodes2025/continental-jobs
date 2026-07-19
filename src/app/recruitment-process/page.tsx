import { PageHero } from "@/components/PageHero";
import { employerStartInfo, recruitmentSteps } from "@/lib/site-data";

export const metadata = {
  title: "Recruitment Process"
};

export default function RecruitmentProcessPage() {
  return (
    <>
      <PageHero
        title="CONTINENTAL'S RECRUITMENT PROCESS"
        text="A structured employer and candidate workflow from requirement to deployment support."
        official
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="space-y-5">
            {recruitmentSteps.map((step, index) => (
              <div key={step} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[80px_1fr]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl font-black text-gold">{index + 1}</span>
                <div>
                  <h2 className="text-xl font-black text-slate-950">{step}</h2>
                  <p className="mt-2 leading-7 text-slate-600">
                    Each stage includes verification, clear communication and documented consent so the process remains transparent for candidates and employers.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">Before Interviews</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Employer information required to begin.</h2>
              <p className="mt-5 leading-8 text-slate-600">
                Complete inputs help Continental finalize recruitment procedures, source sufficient CVs,
                prepare interviews and mobilize selected workers without avoidable delays.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {employerStartInfo.map((item) => (
                <div key={item} className="premium-card p-4 text-sm font-bold leading-6 text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
