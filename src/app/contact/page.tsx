import Image from "next/image";
import Link from "next/link";
import { Building2, Globe2, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { IndiaOperationsMap } from "@/components/OperationsMaps";
import { PageHero } from "@/components/PageHero";
import { mailHref, phoneHref, whatsappHref, type OfficeContact } from "@/lib/content";
import { readSiteContent } from "@/lib/storage";

export const metadata = {
  title: "Contact Us"
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await readSiteContent();

  return (
    <>
      <PageHero
        title="Contact Us"
        text="Connect with Continental Mercantile Corporation through the Corporate Office, Operations Office, Regional Offices and worldwide recruitment network."
      />

      <section className="premium-band py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">Official Contact Information</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              Corporate support for candidates, employers and global partners.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72">
              Every contact point below is clickable for fast calling, email and WhatsApp communication.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {content.offices.map((office, index) => (
              <MotionReveal key={office.title} delay={index * 0.08}>
                <OfficeCard office={office} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
          <MotionReveal>
            <OperationsPanel
              icon={<MapPin className="h-6 w-6" />}
              eyebrow="Regional Offices"
              title="Approved Indian operations."
              text="Regional sourcing, interview coordination, documentation and mobilization support across the latest client-approved Indian operations list."
              items={content.indianOperations}
            />
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <OperationsPanel
              icon={<Globe2 className="h-6 w-6" />}
              eyebrow="Worldwide Operations"
              title="Global employer and candidate network."
              text="A premium international footprint for global recruitment, work abroad, migration and employer requirement coordination."
              items={content.worldwideOperations}
            />
          </MotionReveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <MotionReveal>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
              <IndiaOperationsMap locations={content.indianOperations} />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <div className="rounded-lg border border-gold/25 bg-navy p-8 text-white shadow-glow">
              <Sparkles className="h-9 w-9 text-gold" />
              <h2 className="mt-5 text-3xl font-black md:text-5xl">Ready to start a recruitment conversation?</h2>
              <p className="mt-5 leading-8 text-white/72">
                Candidates can apply for overseas opportunities, and employers can submit requirements with job categories,
                project location, salary, accommodation, visa details and deployment timelines.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/apply" className="button-primary">Candidate Application</Link>
                <Link href="/manpower-requirement" className="button-secondary">Employer Requirement</Link>
                <a href={whatsappHref(content.offices[0]?.whatsapp || content.offices[0]?.phones[0] || "")} className="button-primary">
                  WhatsApp CTA
                </a>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

function OfficeCard({ office }: { office: OfficeContact }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-lg border border-white/12 bg-white/[0.07] p-6 shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/45">
      <div className="absolute right-5 top-5 h-14 w-14 opacity-25 transition group-hover:opacity-45">
        <Image src="/brand/continental-logo.png" alt="" fill sizes="56px" className="object-contain" />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold">
        <Building2 className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-2xl font-black">{office.title}</h2>
      <p className="mt-2 leading-7 text-white/70">{office.subtitle}</p>
      <p className="mt-5 flex gap-3 text-sm leading-7 text-white/78">
        <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
        <span>{office.address}</span>
      </p>

      <ContactGroup icon={<Phone className="h-4 w-4" />} label="Phone">
        {office.phones.map((phone) => (
          <a key={phone} href={phoneHref(phone)} className="block font-bold text-white transition hover:text-gold">
            {phone}
          </a>
        ))}
      </ContactGroup>

      {office.whatsapp ? (
        <ContactGroup icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp">
          <a href={whatsappHref(office.whatsapp)} className="inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-navy shadow-[0_0_28px_rgba(217,164,65,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f1c66e]">
            {office.whatsapp}
          </a>
        </ContactGroup>
      ) : null}

      {office.managerPhones?.length ? (
        <ContactGroup icon={<Phone className="h-4 w-4" />} label="PRO / Manager">
          {office.managerPhones.map((phone) => (
            <a key={phone} href={phoneHref(phone)} className="block font-bold text-white transition hover:text-gold">
              {phone}
            </a>
          ))}
        </ContactGroup>
      ) : null}

      <ContactGroup icon={<Mail className="h-4 w-4" />} label="Email">
        {office.emails.map((email) => (
          <a key={email} href={mailHref(email)} className="block break-all font-bold text-white transition hover:text-gold">
            {email}
          </a>
        ))}
      </ContactGroup>

      {office.website ? (
        <a href={`https://${office.website.replace(/^https?:\/\//, "")}`} className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.18em] text-gold underline underline-offset-4">
          {office.website}
        </a>
      ) : null}
    </div>
  );
}

function ContactGroup({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="mt-5 rounded-md border border-white/10 bg-white/[0.05] p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-gold">
        {icon}
        {label}
      </p>
      <div className="space-y-1 text-sm leading-6">{children}</div>
    </div>
  );
}

function OperationsPanel({
  icon,
  eyebrow,
  title,
  text,
  items
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">{icon}</div>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.26em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-slate-950">{title}</h2>
      <p className="mt-4 leading-8 text-slate-600">{text}</p>
      <div className="mt-7 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:border-gold/55 hover:bg-gold/20">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
