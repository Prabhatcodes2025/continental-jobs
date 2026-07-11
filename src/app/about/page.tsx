import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { company, services } from "@/lib/site-data";

export const metadata = {
  title: "About Us"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={"43 YEARS IN\nGLOBAL RECRUITMENTS\nAND SKILL DEVELOPMENT"}
        text="Continental Mercantile Corporation Pvt Ltd supports global employers and candidates with ethical overseas recruitment, staffing, study abroad, migration and skill development services."
        official
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader
              eyebrow="About Continental"
              title="Built in India, connected to the world."
              text={`${company.shortName} operates from ${company.office}, with regional offices and sourcing networks across India. The company focuses on compliant international recruitment, talent acquisition and documentation-led deployment.`}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Ethical Process", "Global Reach", "Employer Trust"].map((item) => (
                <div key={item} className="rounded-md border border-slate-200 p-5 text-sm font-black text-slate-900">{item}</div>
              ))}
            </div>
          </div>
          <Image src="/brand/corporate-office-kochi.png" alt="Continental corporate office in India" width={900} height={700} className="rounded-lg bg-white object-contain shadow-xl" />
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Services under one accountable recruitment desk." />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
