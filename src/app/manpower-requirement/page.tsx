import { ConsentText } from "@/components/ConsentText";
import { FormSubmitButton } from "@/components/FormSubmitButton";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { Award, BadgeCheck, BriefcaseBusiness, CalendarClock, ClipboardList, FileText, Globe2, GraduationCap, ListChecks, MapPinned, Scale, WalletCards } from "lucide-react";

export const metadata = {
  title: "Employer Requirement"
};

const employerInfoCards = [
  {
    title: "Project Details",
    text: "Project details and project location.",
    icon: MapPinned
  },
  {
    title: "Job Categories",
    text: "Required job categories and number of workers.",
    icon: BriefcaseBusiness
  },
  {
    title: "Worker Source",
    text: "Countries from where workers are required.",
    icon: Globe2
  },
  {
    title: "Job Description",
    text: "Detailed job description for each category.",
    icon: FileText
  },
  {
    title: "Qualification",
    text: "Minimum qualification and experience.",
    icon: GraduationCap
  },
  {
    title: "Salary & Benefits",
    text: "Salary, benefits, food, accommodation and facilities.",
    icon: WalletCards
  },
  {
    title: "Contract & Visa",
    text: "Contract duration and visa or entry permit processing time.",
    icon: CalendarClock
  },
  {
    title: "Mobilization",
    text: "Expected mobilization timeline.",
    icon: ClipboardList
  },
  {
    title: "Labour Compliance",
    text: "Labour law compliance in the country of employment.",
    icon: Scale
  },
  {
    title: "Other Terms",
    text: "Other specifications or terms offered to workers.",
    icon: ListChecks
  }
];

export default function ManpowerRequirementPage({ searchParams }: { searchParams: { submitted?: string; error?: string } }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/brand/corporate-office-kochi.png"
            alt=""
            fill
            sizes="100vw"
            className="scale-[1.02] object-contain object-center opacity-95 motion-safe:animate-[hero-kenburns_18s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/78 to-navy/35" />
        </div>
        <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-8 px-4 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-gold">
              Employer Requirement Desk
            </p>
            <h1 className="corporate-title-caps mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              EMPLOYER / CLIENT REQUIREMENT
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              Submit demand details, job categories, project location, salary, facilities, visa details and mobilization timeline.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#client-manpower-order-form" className="button-primary max-w-full whitespace-normal text-center leading-snug">
                CLIENTS MANPOWER ORDER SUBMIT
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      <CorporateInfoStrip />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">Employer Desk</p>
          <h2 className="corporate-title-caps mt-3 text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
            CLIENTS MANPOWER ORDER
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Employers can submit overseas manpower requirements with project details, job categories, salary terms, facilities, visa information and mobilization timelines.
          </p>
          <Link href="#client-manpower-order-form" className="button-primary mt-7 max-w-full whitespace-normal text-center leading-snug">
            CLIENTS MANPOWER ORDER SUBMIT
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Employer Information Required"
            title="What we need to start the recruitment process."
            text="The brochure asks employers to share project, category, salary, facility, visa and labour-law details before mobilization begins."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {employerInfoCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="premium-card h-full p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <form id="client-manpower-order-form" action="/api/requirements" method="post" encType="multipart/form-data" className="mx-auto grid max-w-5xl scroll-mt-28 gap-6 px-4 lg:px-8">
          {searchParams.submitted ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Thank you. Your requirement has been received and is ready for employer coordination.
            </div>
          ) : null}
          {searchParams.error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">
              Submission failed. Please check required fields, upload size and consent boxes before trying again.
            </div>
          ) : null}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="sourcePage" value="/manpower-requirement" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="companyName" label="Company Name" required />
            <Field name="contactPerson" label="Contact Person" required />
            <Field name="designation" label="Designation" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="phone" label="Phone / WhatsApp" required />
            <Field name="country" label="Country" required />
            <Field name="projectLocation" label="Project Location" required />
            <Field name="categories" label="Required Job Categories" required />
            <Field name="workers" label="Number of Workers" required />
            <Field name="salaryRange" label="Salary Range" required />
            <Field name="facilities" label="Food / Accommodation Provided" required />
            <Field name="contractDuration" label="Contract Duration" required />
            <Field name="visaDetails" label="Visa / Work Permit Details" required />
            <Field name="mobilizationTime" label="Expected Mobilization Time" required />
            <FileField name="documents" label="Upload Demand Letter / Documents" />
          </div>
          <label className="grid gap-2">
            <span className="label">Message</span>
            <textarea name="message" rows={5} className="field" placeholder="Add job description, qualification, labour law compliance notes or special instructions." />
          </label>
          <ConsentText type="employer" />
          <Check name="whatsappConsent" label="I consent to receive requirement coordination messages through WhatsApp." />
          <Check name="termsAgreement" label="I agree to the Terms of Use and confirm the submitted requirement is lawful and accurate." />
          <FormSubmitButton>CLIENTS MANPOWER ORDER SUBMIT</FormSubmitButton>
        </form>
      </section>
    </>
  );
}

function CorporateInfoStrip() {
  const services = ["WORK ABROAD", "STUDY ABROAD", "MIGRATION", "SKILL DEVELOPMENT"];
  const countries = ["INDIA", "AUSTRALIA", "EUROPE", "SINGAPORE", "SAUDI ARABIA", "KUWAIT", "BAHRAIN", "DUBAI", "PHILIPPINES", "NEPAL"];

  return (
    <section className="bg-[#1497be] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-full bg-white p-2 shadow-xl">
              <Image src="/brand/continental-logo.png" alt="Continental eagle logo" fill sizes="64px" className="object-contain p-2" />
            </div>
            <div className="min-w-0">
              <p className="font-serif text-2xl font-black uppercase leading-none tracking-[0.05em] text-white sm:text-3xl">CONTINENTAL</p>
              <p className="mt-1 font-serif text-sm font-black uppercase tracking-[0.12em] text-white/90 sm:text-base">MERCANTILE CORPORATION</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {services.map((item) => (
              <span key={item} className="rounded-md border border-white/25 bg-white/12 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] shadow-sm backdrop-blur">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <span className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/25 bg-navy/35 px-4 py-2 shadow-lg backdrop-blur">
              <BadgeCheck className="h-5 w-5 text-gold" />
              <span className="grid leading-tight">
                <strong className="font-serif text-sm uppercase tracking-[0.08em]">ISO 9001</strong>
                <small className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/75">Certified</small>
              </span>
            </span>
            <span className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/25 bg-navy/35 px-4 py-2 shadow-lg backdrop-blur">
              <Award className="h-5 w-5 text-gold" />
              <span className="grid leading-tight">
                <strong className="font-serif text-sm uppercase tracking-[0.08em]">43+ Years</strong>
                <small className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/75">Recruitment</small>
              </span>
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-3 gap-y-2 border-t border-white/25 pt-5 text-center text-xs font-black uppercase tracking-[0.08em] text-white/92 sm:text-sm">
          {countries.map((country, index) => (
            <span key={country} className="inline-flex items-center gap-3">
              {country}
              {index < countries.length - 1 ? <span className="text-white/45" aria-hidden="true">•</span> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field" name={name} type={type} required={required} />
    </label>
  );
}

function FileField({ name, label }: { name: string; label: string }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white" name={name} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
    </label>
  );
}

function Check({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
      <input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-gold" />
      <span>{label}</span>
    </label>
  );
}
