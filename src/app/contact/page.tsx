import Image from "next/image";
import Link from "next/link";
import { Building2, Globe2, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { IndiaOperationsMap } from "@/components/OperationsMaps";
import { PageHero } from "@/components/PageHero";
import { TrustBadges } from "@/components/TrustBadges";
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
        title="CONTACT US"
        text="Connect with Continental Mercantile Corporation through approved corporate, operations and international recruitment contact channels."
        secondaryLabel="SUBMIT MANPOWER ORDER"
      />

      <section className="premium-band py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">CONTACT DETAILS</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              CORPORATE SUPPORT FOR CANDIDATES, EMPLOYERS AND GLOBAL PARTNERS.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72">
              Every contact point below is clickable for fast calling, email and WhatsApp communication.
            </p>
            <div className="mt-6">
              <TrustBadges compact />
            </div>
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
              title="REGIONAL OPERATIONS"
              items={content.indianOperations}
            />
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <OperationsPanel
              icon={<Globe2 className="h-6 w-6" />}
              title="WORLDWIDE PRESENCE"
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
              <h2 className="mt-5 text-3xl font-black md:text-5xl">START A CONVERSATION</h2>
              <p className="mt-5 leading-8 text-white/72">
                Candidates can apply for overseas opportunities, and employers can submit requirements with job categories,
                project location, salary, accommodation, visa details and deployment timelines.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a
                  href="https://wa.me/918907090001?text=Hello%2C%20I%20would%20like%20to%20submit%20my%20CV%20for%20an%20overseas%20opportunity."
                  className="button-primary px-4 py-3 text-center text-xs sm:text-sm"
                >
                  WHATSAPP YOUR CV
                </a>
                <a
                  href="mailto:recruitments@continentalmanpower.com?subject=CV%20Submission%20-%20Candidate%20Application"
                  className="button-secondary px-4 py-3 text-center text-xs sm:text-sm"
                >
                  EMAIL YOUR CV
                </a>
                <Link href="/manpower-requirement" className="button-secondary px-4 py-3 text-center text-xs sm:text-sm">
                  EMPLOYER MANPOWER ORDER
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}

function OfficeCard({ office }: { office: OfficeContact }) {
  const isOperationsOffice = office.title.toLowerCase().includes("operations");
  const phones = isOperationsOffice ? office.phones.slice(0, 1) : office.phones;
  const whatsapp = office.whatsapp || (isOperationsOffice ? office.phones[1] : undefined);
  const whatsappUrl = whatsapp
    ? isOperationsOffice
      ? `https://wa.me/${normalizedWhatsappNumber(whatsapp)}`
      : whatsappHref(whatsapp)
    : "";

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

      <ContactGroup icon={<Phone className="h-4 w-4" />} label="PHONE">
        {phones.map((phone) => (
          <a key={phone} href={phoneHref(phone)} className="block font-bold text-white transition hover:text-gold">
            {isOperationsOffice ? formatOperationsNumber(phone) : phone}
          </a>
        ))}
      </ContactGroup>

      {whatsapp ? (
        <ContactGroup icon={<MessageCircle className="h-4 w-4" />} label="WHATSAPP">
          <a href={whatsappUrl} className="inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-navy shadow-[0_0_28px_rgba(217,164,65,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f1c66e]">
            {isOperationsOffice ? formatOperationsNumber(whatsapp) : whatsapp}
          </a>
        </ContactGroup>
      ) : null}

      {office.managerPhones?.length ? (
        <ContactGroup icon={<Phone className="h-4 w-4" />} label="PRO / MANAGER">
          {office.managerPhones.map((phone, index) => {
            const display = isOperationsOffice ? operationsManagerDisplay(index) : phone;
            return (
              <div key={`${phone}-${index}`}>
                {isOperationsOffice ? (
                  <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/48">
                    {index === 0 ? "PRO" : "MANAGER"}
                  </span>
                ) : null}
                <a href={phoneHref(display)} className="block font-bold text-white transition hover:text-gold">
                  {display}
                </a>
              </div>
            );
          })}
        </ContactGroup>
      ) : null}

      <ContactGroup icon={<Mail className="h-4 w-4" />} label="EMAIL">
        {office.emails.map((email) => (
          <a key={email} href={mailHref(email)} className="block break-all font-bold text-white transition hover:text-gold">
            {email}
          </a>
        ))}
      </ContactGroup>

      {office.website ? (
        <ContactGroup icon={<Globe2 className="h-4 w-4" />} label="WEBSITE">
          <a href={`https://${office.website.replace(/^https?:\/\//, "")}`} className="block break-all font-bold text-white transition hover:text-gold">
            {office.website}
          </a>
        </ContactGroup>
      ) : null}
    </div>
  );
}

function normalizedWhatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^00/, "");
  return digits.startsWith("91") ? digits : `91${digits}`;
}

function formatOperationsNumber(phone: string) {
  const digits = normalizedWhatsappNumber(phone).replace(/^91/, "");
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

function operationsManagerDisplay(index: number) {
  return index === 0 ? "🇮🇳 +91 98950 50050" : "🇮🇳 +91 89070 90002";
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
  title,
  items
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">{icon}</div>
      <h2 className="mt-5 corporate-title-caps text-3xl font-black text-slate-950">{title}</h2>
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
