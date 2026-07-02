import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { indianOffices } from "@/lib/site-data";

export const metadata = {
  title: "Indian Operations"
};

export default function IndianOperationsPage() {
  return (
    <>
      <PageHero
        title="Indian Operations"
        text="Kochi headquarters with regional offices and sourcing corridors across Delhi, Mumbai, Kolkata, Chennai, Surat, Trichy, Kushinagar, Vizag and Cochin."
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
            <div className="mt-8 grid grid-cols-2 gap-3">
              {indianOffices.map((office) => (
                <div key={office} className="rounded-md border border-slate-200 bg-slate-50 p-4 font-bold">{office}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
