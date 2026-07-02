import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, globalRegions, indianOffices } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="premium-band text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">{company.group}</p>
          <h2 className="mt-3 text-3xl font-black">{company.shortName}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
            A premium international manpower, staffing, work abroad, study abroad and HR solutions
            organization headquartered in Kochi with regional Indian operations and global recruitment reach.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
            <a href={`tel:${company.phones.kochi[0].replaceAll(" ", "")}`} className="footer-pill">
              <Phone className="h-4 w-4" /> {company.phones.kochi[0]}
            </a>
            <a href={`mailto:${company.emails.work}`} className="footer-pill">
              <Mail className="h-4 w-4" /> {company.emails.work}
            </a>
            <a href={company.socialChat} className="footer-pill">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <span className="footer-pill">
              <MapPin className="h-4 w-4" /> Kochi HQ
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold">Indian Offices</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{indianOffices.join(" / ")}</p>
        </div>
        <div>
          <h3 className="font-bold text-gold">Global Reach</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{globalRegions.slice(0, 12).join(" / ")}</p>
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
