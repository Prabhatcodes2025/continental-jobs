import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, contactDetails, globalRegions, indianOffices } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="premium-band text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">{company.descriptor}</p>
          <h2 className="brand-word mt-3 max-w-full text-xl leading-tight sm:text-2xl md:text-3xl">CONTINENTAL MERCANTILE CORPORATION</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
            A premium international recruitment, work abroad, study abroad and Human Resource Solutions
            organization with regional Indian operations and global recruitment reach.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
            <a href={`tel:${contactDetails.corporateOffice.phones[0].tel}`} className="footer-pill">
              <Phone className="h-4 w-4" /> {contactDetails.corporateOffice.phones[0].display}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="footer-pill">
              <Mail className="h-4 w-4" /> {contactDetails.email}
            </a>
            <a href={contactDetails.whatsappUrl} className="footer-pill">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <span className="footer-pill">
              <MapPin className="h-4 w-4" /> Corporate Office
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold uppercase tracking-[0.12em] text-gold">INDIAN OPERATIONS</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{indianOffices.join(" / ")}</p>
        </div>
        <div>
          <h3 className="font-bold uppercase tracking-[0.12em] text-gold">GLOBAL REACH</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{globalRegions.join(" / ")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© 2026 {company.name}. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-gold">Terms of Use</Link>
            <Link href="/admin" className="hover:text-gold">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
