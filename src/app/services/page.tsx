import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { company, industries, services } from "@/lib/site-data";

export const metadata = {
  title: "Our Business and Services"
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Business / Services"
        text="Work abroad, study abroad, migration, skill development, worldwide staffing, global recruitment, overseas education and HR solutions."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Service Portfolio" title="International recruitment services with compliance at the center." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="h-8 w-8 text-gold" />
                  <h2 className="mt-4 text-xl font-black text-slate-950">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                  <a href={company.socialChat} className="mt-5 inline-flex font-bold text-royal">Click to chat</a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Industries" title="Sectors we support." />
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {industries.map(([name]) => <div key={name} className="rounded-md bg-white p-5 font-bold shadow-sm">{name}</div>)}
          </div>
          <div className="mt-10">
            <Link href="/manpower-requirement" className="button-primary">Submit Employer Requirement</Link>
          </div>
        </div>
      </section>
    </>
  );
}
