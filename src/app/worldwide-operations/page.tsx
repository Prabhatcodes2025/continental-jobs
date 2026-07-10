import { PageHero } from "@/components/PageHero";
import { WorldwideOperationsMap } from "@/components/OperationsMaps";
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
        title="WORLDWIDE OPERATIONS"
        text="Approved international recruitment presence across India, Australia, Singapore, Europe, Saudi, Dubai, Spain, Nepal, Sri Lanka, Philippines and Africa."
        official
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Worldwide Infrastructure"
            title="WORLDWIDE OPERATIONS"
            text="Client-approved operations include India, Australia, Singapore, Europe, Saudi, Dubai, Spain, Nepal, Sri Lanka, Philippines and Africa."
            official
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <WorldwideOperationsMap regions={content.worldwideOperations} />
            <div className="grid gap-4 sm:grid-cols-2">
              {content.worldwideOperations.map((region) => (
                <div key={region} className="rounded-md border border-slate-200 bg-slate-50 p-5 font-black uppercase tracking-wide text-slate-900">{region}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
