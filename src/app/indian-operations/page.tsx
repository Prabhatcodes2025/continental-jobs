import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { readSiteContent } from "@/lib/storage";

export const metadata = {
  title: "Indian Operations"
};

export const dynamic = "force-dynamic";

export default async function IndianOperationsPage() {
  const content = await readSiteContent();

  return (
    <>
      <PageHero
        title="Indian Operations"
        text="Cochin headquarters with regional offices and sourcing corridors across Madurai, Bombay, Gujarat, Jaipur, Delhi, Kolkata, Siliguri, Vizag and allied manpower hubs."
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <Image src="/brand/indian-operations-map.png" alt="Indian operations map" width={900} height={900} className="rounded-lg border border-slate-200" />
          <div>
            <h2 className="text-3xl font-black text-slate-950">Regional access for national recruitment.</h2>
            <p className="mt-4 leading-8 text-slate-600">
              The Indian operations network supports candidate sourcing, interviews, documentation, medical
              coordination and mobilization for overseas employer requirements.
            </p>
            <div className="mt-6 rounded-lg border border-gold/25 bg-gold/10 p-5">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">Indian Infrastructure</p>
              <p className="mt-3 leading-7 text-slate-700">
                The brochure highlights regional infrastructure across Kerala, Maharashtra, Gujarat,
                West Bengal, Tamil Nadu, Andhra Pradesh and North India, supporting interviews,
                sourcing and worker mobilization from multiple manpower corridors.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {content.indianOperations.map((office) => (
                <div key={office} className="premium-card p-4 font-bold">{office}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
