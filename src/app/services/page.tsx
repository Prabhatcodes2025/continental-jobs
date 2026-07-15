import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { academies, contactDetails, sectorCards, services, specializedRecruitment, whyContinental } from "@/lib/site-data";

export const metadata = {
  title: "Our Business and Services"
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our BUSINESS / SERVICES"
        text="Work abroad, study abroad, migration, skill development, worldwide staffing, global recruitment, overseas education and Human Resource Solutions."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Service Portfolio" title="International recruitment services with compliance at the center." />
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="premium-card flex h-full flex-col p-6" data-magnetic>
                  <Icon className="h-8 w-8 text-gold" />
                  <h2 className="mt-4 text-base font-black uppercase leading-snug tracking-[0.12em] text-royal">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                  <a href={contactDetails.whatsappUrl} className="mt-auto inline-flex pt-5 font-bold text-royal">Click to chat</a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Industries" title="Sectors we support." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectorCards.map((sector) => (
              <article key={sector.title} className="premium-card group h-full overflow-hidden" data-magnetic>
                <div className="aspect-[16/10] overflow-hidden bg-navy">
                  <Image
                    src={sector.src}
                    alt={sector.title}
                    width={900}
                    height={570}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-sm font-black uppercase leading-snug tracking-[0.12em] text-slate-950">{sector.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{sector.caption}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/manpower-requirement" className="button-primary">Submit Employer Requirement</Link>
          </div>
        </div>
      </section>
      <section className="premium-band py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">Why Continental</p>
              <h2 className="corporate-title mt-3 text-3xl font-black md:text-5xl">Built for urgent, compliant and high-quality recruitment mobilization.</h2>
              <p className="mt-5 leading-8 text-white/70">
                The brochure emphasizes worldwide offices, experienced recruitment managers, a large CV database,
                fast mobilization, worker welfare checks and trusted project execution for world-class companies.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {whyContinental.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-bold leading-6 text-white/85 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Specialised Recruitment Fields"
            title="Deep sector coverage for global projects."
            text="From healthcare to refinery shutdowns, retail chains, MEP projects, ship repair and hospitality, Continental positions itself as a specialist recruitment partner."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {specializedRecruitment.map((field) => (
              <article key={field.title} className="premium-card p-6" data-magnetic>
                <h2 className="text-xl font-black text-slate-950">{field.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{field.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Continental Academies"
            title="Training infrastructure for employability and global readiness."
            text="The brochure highlights academy programs for hotel management, oil and gas, technical studies and professional studies."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {academies.map((academy) => (
              <article key={academy.title} className="premium-card p-6" data-magnetic>
                <h2 className="text-lg font-black text-slate-950">{academy.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{academy.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
