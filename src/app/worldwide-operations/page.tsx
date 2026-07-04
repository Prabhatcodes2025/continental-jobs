import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { globalRegions } from "@/lib/site-data";

export const metadata = {
  title: "Worldwide Operations"
};

export default function WorldwideOperationsPage() {
  return (
    <>
      <PageHero
        title="Worldwide Operations"
        text="Manpower pathways serving employers and candidates across the Middle East, Asia, Far East, Africa, Europe, UK, Australia, Singapore and Canada."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Worldwide Infrastructure"
            title="Recruitment reach across major destination markets."
            text="Brochure references include India, Australia, UK, Europe, Canada, Saudi, Kuwait, Bahrain, Dubai, Nepal and allied sourcing networks across the Middle East, Asia, Far East, Africa and Europe."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {globalRegions.map((region) => (
              <div key={region} className="rounded-md border border-slate-200 bg-slate-50 p-5 font-black text-slate-900">{region}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
