import Link from "next/link";
import { company, globalRegions, indianOffices } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#05080f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">{company.group}</p>
          <h2 className="mt-3 text-3xl font-black">{company.shortName}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
            A premium international manpower, staffing, work abroad, study abroad and HR solutions
            organization headquartered in Kochi with regional Indian operations and global recruitment reach.
          </p>
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
