import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/site-data";

export const metadata = {
  title: "Contact Us"
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        text="Reach the Kochi corporate office, candidate recruitment desk or employer manpower requirement team."
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 lg:px-8">
          <div className="rounded-lg border border-slate-200 p-6">
            <MapPin className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-black">Corporate Office</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{company.office}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-6">
            <Phone className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-black">Phone / WhatsApp</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{company.phones.kochi.join(" / ")}<br />{company.phones.main}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-6">
            <Mail className="h-8 w-8 text-gold" />
            <h2 className="mt-4 font-black">Email</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{company.emails.work}<br />{company.emails.jobs}<br />{company.emails.chairman}</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-3 px-4 lg:px-8">
          <Link href="/apply" className="button-primary">Candidate Application</Link>
          <Link href="/manpower-requirement" className="button-primary">Employer Requirement</Link>
          <a href={company.socialChat} className="button-primary">WhatsApp Chat</a>
        </div>
      </section>
    </>
  );
}
