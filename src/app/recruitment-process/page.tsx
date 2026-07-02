import { PageHero } from "@/components/PageHero";
import { recruitmentSteps } from "@/lib/site-data";

export const metadata = {
  title: "Recruitment Process"
};

export default function RecruitmentProcessPage() {
  return (
    <>
      <PageHero
        title="Recruitment Process"
        text="A structured employer and candidate workflow from manpower requirement to deployment support."
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
    </>
  );
}
