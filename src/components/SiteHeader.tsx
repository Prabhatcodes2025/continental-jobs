"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { ApplyTrigger } from "@/components/ApplyTrigger";
import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="site-header sticky top-0 z-[75] border-b border-gold/15 text-white shadow-xl shadow-black/20 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(7, 17, 31, 0.98)" }}
    >
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

        <nav className="hidden items-center gap-1 text-sm font-semibold text-white/80 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-gold ${
                pathname === href ? "bg-gold/15 text-gold" : ""
              }`}
              data-magnetic
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${company.phones.kochi[0].replaceAll(" ", "")}`} className="button-secondary py-2">
            <PhoneCall className="mr-2 h-4 w-4" />
            Call Kochi
          </a>
          <ApplyTrigger className="button-primary py-2" showArrow={false}>Apply Now</ApplyTrigger>
        </div>

        <div className="relative lg:hidden">
          <button type="button" onClick={() => setMobileOpen((value) => !value)} className="rounded-md p-2 text-white" aria-label="Toggle navigation menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          {mobileOpen ? (
          <nav
            className="site-mobile-menu absolute right-0 z-[80] mt-3 grid w-72 gap-1 rounded-lg border border-gold/20 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(7, 17, 31, 0.99)" }}
          >
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded px-3 py-2 text-sm font-semibold hover:bg-white/10 ${
                  pathname === href ? "bg-gold/15 text-gold" : ""
                }`}
              >
                {label}
              </Link>
            ))}
            <ApplyTrigger className="button-primary mt-2 py-2" showArrow={false}>Apply Now</ApplyTrigger>
          </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
