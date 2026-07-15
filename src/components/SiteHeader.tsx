"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { ApplyTrigger } from "@/components/ApplyTrigger";
import { contactDetails, navItems } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="site-header sticky top-0 z-[75] border-b border-gold/15 text-white shadow-xl shadow-black/20 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(7, 17, 31, 0.98)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <Image
            src="/brand/continental-logo.png"
            alt="Continental logo"
            width={54}
            height={54}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/50"
            priority
          />
          <span className="min-w-0 whitespace-nowrap">
            <span className="brand-word block text-sm leading-tight">
              CONTINENTAL
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
              Mercantile
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 text-[13px] font-semibold text-white/80 xl:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-2.5 py-2 transition hover:bg-white/10 hover:text-gold ${
                pathname === href ? "bg-gold/15 text-gold" : ""
              }`}
              data-magnetic
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href={`tel:${contactDetails.corporateOffice.phones[0].tel}`} className="button-secondary px-3 py-2 text-xs">
            <PhoneCall className="mr-2 h-4 w-4" />
            CALL INDIAN HEADQUARTERS
          </a>
          <ApplyTrigger className="button-primary px-3 py-2 text-xs" showArrow={false}>APPLY FOR A JOB</ApplyTrigger>
        </div>

        <div className="relative xl:hidden">
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
            <ApplyTrigger className="button-primary mt-2 py-2" showArrow={false}>APPLY FOR A JOB</ApplyTrigger>
            <a
              href={contactDetails.whatsappUrl}
              className="button-secondary py-2 text-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              WHATSAPP
            </a>
          </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
