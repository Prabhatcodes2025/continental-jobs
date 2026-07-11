import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ApplyTrigger } from "@/components/ApplyTrigger";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { HeroGlobe } from "@/components/HeroGlobe";
import { MotionReveal } from "@/components/MotionReveal";
import { IndiaOperationsMap, WorldwideOperationsMap } from "@/components/OperationsMaps";
import { SectionHeader } from "@/components/SectionHeader";
import {
  company,
  contactDetails,
  industries,
  recruitmentSteps,
  services
} from "@/lib/site-data";
import { readSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await readSiteContent();

  return (
    <>
      <section className="premium-band relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-28">
          <Image src="/brand/corporate-office-kochi.png" alt="" fill sizes="100vw" className="object-contain" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/55" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <MotionReveal>
            <div>
              <p className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-gold">
                43+ years of global recruitment
              </p>
              <h1 className="corporate-title-caps mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                PATHWAY TO GLOBAL CAREERS
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                {company.shortName} connects skilled talent with trusted employers across the Gulf,
                Europe, Asia, Africa and approved destination markets through compliant recruitment, documentation and mobilization.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ApplyTrigger>APPLY FOR A JOB</ApplyTrigger>
                <Link href="/manpower-requirement" className="button-secondary">
                  SUBMIT REQUIREMENT
                </Link>
                <Link href="/chairman-message" className="button-secondary">
                  CONTACT CHAIRMAN OFFICE
                </Link>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <div className="rounded-lg border border-white/12 bg-white/10 p-5 shadow-glow backdrop-blur">
              <HeroGlobe />
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  [43, "+", "Years"],
                  [25, "+", "Countries"],
                  [9001, "", "ISO 9001"],
                  [24, "/7", "Recruitment Support"]
                ].map(([value, suffix, label]) => (
                  <div key={label} className="rounded-md border border-white/10 bg-white/10 p-4 text-center">
                    <p className="text-3xl font-black text-gold">
                      <AnimatedCounter value={Number(value)} suffix={String(suffix)} />
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white py-18">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeader
            eyebrow="Our Business"
            title="Recruitment services built for serious employers and serious careers."
            text="A complete international workforce desk covering sourcing, screening, documentation, mobilization, HR support and education pathways."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.title} delay={index * 0.03}>
                  <article className="premium-card h-full p-6" data-magnetic>
                    <Icon className="h-8 w-8 text-gold" />
                    <h3 className="mt-4 text-lg font-black text-slate-950">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                    <a href={contactDetails.whatsappUrl} className="mt-5 inline-flex text-sm font-bold text-royal">
                      Chat on WhatsApp <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Featured Industries" title="Trusted across high-demand recruitment categories." align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map(([name, Icon]) => (
              <div key={name} className="premium-card p-5" data-magnetic>
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-3 text-sm font-black text-slate-900">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <MotionReveal>
            <SectionHeader
              eyebrow="Indian Operations"
              title="INDIAN OPERATIONS"
              text={`${content.indianOperations.join(", ")} and allied sourcing corridors support candidate access across India.`}
              official
            />
            <div className="mt-8">
              <IndiaOperationsMap locations={content.indianOperations} />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <SectionHeader
              eyebrow="Worldwide Operations"
              title="WORLDWIDE OPERATIONS"
              text="Built for employers that need compliant, documented, mobilization-ready talent."
              official
            />
            <div className="mt-8">
              <WorldwideOperationsMap regions={content.worldwideOperations} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {content.worldwideOperations.map((region) => (
                <div key={region} className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-gold/40 hover:bg-white hover:text-navy">
                  {region}
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="premium-band py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <MotionReveal>
            <Image src="/brand/chairman-sajeevan.png" alt="Chairman and Managing Director Sajeevan Thumpayil" width={900} height={650} sizes="(min-width: 1024px) 42vw, 100vw" className="rounded-lg object-cover shadow-glow" loading="lazy" />
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-gold">Chairman&apos;s Message</p>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">Human resources, handled with trust and responsibility.</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Our mission is to connect ambition with opportunity through ethical recruitment, skill readiness,
              talent acquisition and international HR solutions for sectors including oil and gas, hospitality,
              healthcare, engineering and technical studies.
            </p>
            <Link href="/chairman-message" className="button-primary mt-8">Read Full Message</Link>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Recruitment Process" title="RECRUITMENT PROCESS" align="center" official />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {recruitmentSteps.map((step, index) => (
              <div key={step} className="premium-card p-6" data-magnetic>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-black text-gold">
                  {index + 1}
                </span>
                <p className="mt-4 font-bold leading-7 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Gallery" title="Brand references, office presence and active recruitment campaigns." />
          <GalleryLightbox compact items={content.gallery} />
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-gold">Ready to move forward?</p>
            <h2 className="mt-3 text-3xl font-black">Candidates and employers can start here.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ApplyTrigger showArrow={false}><CheckCircle2 className="mr-2 h-4 w-4" /> APPLY FOR A JOB</ApplyTrigger>
            <Link href="/manpower-requirement" className="button-secondary"><Globe2 className="mr-2 h-4 w-4" /> Employer Form</Link>
            <Link href="/contact" className="button-secondary"><Sparkles className="mr-2 h-4 w-4" /> Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
