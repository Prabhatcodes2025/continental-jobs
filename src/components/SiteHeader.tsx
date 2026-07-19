"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ApplyTrigger } from "@/components/ApplyTrigger";
import { contactDetails, navItems } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-[75] w-full border-b border-gold/15 text-white shadow-xl shadow-black/20 backdrop-blur-xl"
      style={{ backgroundColor: "rgba(7, 17, 31, 0.98)" }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 lg:px-5 xl:gap-3">
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src="/brand/continental-logo.png"
            alt="Continental logo"
            width={54}
            height={54}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-gold/50 sm:h-12 sm:w-12"
            priority
          />
          <span className="brand-lockup min-w-0 whitespace-nowrap">
            <span className="brand-word brand-word-main block leading-none">
              CONTINENTAL
            </span>
            <span className="brand-word-sub block leading-tight">
              MERCANTILE CORPORATION
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 text-[11px] font-semibold text-white/80 xl:flex 2xl:text-[13px]">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-1.5 py-2 transition hover:bg-white/10 hover:text-gold 2xl:px-2.5 ${
                pathname === href ? "bg-gold/15 text-gold" : ""
              }`}
              data-magnetic
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href={`tel:${contactDetails.corporateOffice.phones[0].tel}`} className="button-secondary whitespace-nowrap px-2.5 py-2 text-[10.5px] 2xl:px-3 2xl:text-xs">
            <PhoneCall className="mr-1.5 h-4 w-4" />
            CALL INDIAN HEADQUARTERS
          </a>
          <ApplyTrigger className="button-primary whitespace-nowrap px-2.5 py-2 text-[10.5px] 2xl:px-3 2xl:text-xs" showArrow={false}>APPLY FOR A JOB</ApplyTrigger>
        </div>

        <div className="shrink-0 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="site-mobile-menu"
          className="site-mobile-menu absolute left-0 right-0 top-full z-[80] grid max-h-[calc(100vh-68px)] gap-1 overflow-y-auto border-t border-gold/20 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl xl:hidden"
          style={{ backgroundColor: "rgba(7, 17, 31, 0.99)" }}
        >
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex min-h-11 items-center rounded-md px-4 py-2 text-sm font-semibold hover:bg-white/10 ${
                pathname === href ? "bg-gold/15 text-gold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <a
              href={`tel:${contactDetails.corporateOffice.phones[0].tel}`}
              className="button-secondary min-h-11 w-full whitespace-normal px-4 py-3 text-center text-xs"
              onClick={() => setMobileOpen(false)}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              CALL INDIAN HEADQUARTERS
            </a>
            <div onClick={() => setMobileOpen(false)}>
              <ApplyTrigger className="button-primary min-h-11 w-full whitespace-normal px-4 py-3 text-xs" showArrow={false}>APPLY FOR A JOB</ApplyTrigger>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
