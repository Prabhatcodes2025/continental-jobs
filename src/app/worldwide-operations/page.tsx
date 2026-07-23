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
        text="Approved international recruitment presence across India, Singapore, Philippines, Malaysia, Dubai / UAE, Kuwait, Bahrain, Oman, Saudi Arabia, Qatar, London / UK, Malta, Spain, Croatia, Nepal, Bangladesh, Sri Lanka, Kenya, Ghana, Uganda, Nigeria and Africa."
        official
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Worldwide Infrastructure"
            title="WORLDWIDE OPERATIONS"
            text="Client-approved operations include India, Singapore, Philippines, Malaysia, Dubai / UAE, Kuwait, Bahrain, Oman, Saudi Arabia, Qatar, London / UK, Malta, Spain, Croatia, Nepal, Bangladesh, Sri Lanka, Kenya, Ghana, Uganda, Nigeria and Africa."
            official
          />
          <div className="mt-10">
            <WorldwideOperationsMap regions={content.worldwideOperations} />
          </div>
        </div>
      </section>
    </>
  );
}
