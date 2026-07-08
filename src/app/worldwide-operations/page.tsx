import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { readSiteContent } from "@/lib/storage";

export const metadata = {
  title: "Worldwide Operations"
};

export const dynamic = "force-dynamic";

export default async function WorldwideOperationsPage() {
  const content = await readSiteContent();

  return (
    <>
      <PageHero
        title="Worldwide Operations"
        text="Manpower pathways serving employers and candidates across India, Singapore, Philippines, Malaysia, the Gulf, London, Malta, Spain, South Asia and Africa."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Worldwide Infrastructure"
            title="Recruitment reach across major destination markets."
            text="Client-approved operations include India, Singapore, Philippines, Malaysia, Dubai, Kuwait, Bahrain, Oman, Saudi, Qatar, London, Malta, Spain, Nepal, Bangladesh, Sri Lanka and Africa."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.worldwideOperations.map((region) => (
              <div key={region} className="rounded-md border border-slate-200 bg-slate-50 p-5 font-black text-slate-900">{region}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
