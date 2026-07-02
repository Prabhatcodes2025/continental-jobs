import { PageHero } from "@/components/PageHero";
import { requiredDocuments } from "@/lib/site-data";

export const metadata = {
  title: "Documents Required"
};

export default function DocumentsRequiredPage() {
  return (
    <>
      <PageHero
        title="Documents Required"
        text="Prepare candidate and employer documents before submission for faster screening, visa and mobilization coordination."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
            <ul className="grid gap-4">
              {requiredDocuments.map((document) => (
                <li key={document} className="rounded-md bg-white p-4 font-bold shadow-sm">{document}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
