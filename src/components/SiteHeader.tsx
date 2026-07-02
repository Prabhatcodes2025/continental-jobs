import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";
import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-white shadow-xl shadow-black/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/brand/continental-logo.png"
            alt="Continental logo"
            width={54}
            height={54}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/50"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase tracking-wide text-white">
              Continental
            </span>
            <span className="block truncate text-xs font-semibold text-gold">
              Mercantile Corporation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-white/80 lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${company.phones.kochi[0].replaceAll(" ", "")}`} className="button-secondary py-2">
            <PhoneCall className="mr-2 h-4 w-4" />
            Call Kochi
          </a>
          <Link href="/apply" className="button-primary py-2">
            Apply Now
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="list-none rounded-md p-2 text-white">
            <Menu className="h-6 w-6" />
          </summary>
          <nav className="absolute right-0 mt-3 grid w-64 gap-1 rounded-md border border-white/10 bg-navy p-3 shadow-2xl">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="rounded px-3 py-2 text-sm font-semibold hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
