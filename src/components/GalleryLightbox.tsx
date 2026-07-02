"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { galleryItems } from "@/lib/site-data";

export function GalleryLightbox({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<(typeof galleryItems)[number] | null>(null);

  return (
    <>
      <div className={compact ? "mt-10 grid gap-5 md:grid-cols-4" : "mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:px-8"}>
        {galleryItems.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            data-magnetic
          >
            <div className="overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                width={compact ? 600 : 900}
                height={compact ? 700 : 900}
                sizes={compact ? "(min-width: 768px) 25vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                className={compact ? "h-56 w-full object-cover transition duration-500 group-hover:scale-105" : "h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"}
                loading="lazy"
              />
            </div>
            <div className={compact ? "p-4" : "p-6"}>
              <h3 className={compact ? "font-black" : "text-xl font-black"}>{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[85] grid place-items-center bg-navy/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-glow"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-navy/85 p-2 text-white backdrop-blur transition hover:bg-navy"
                aria-label="Close gallery image"
              >
                <X className="h-5 w-5" />
              </button>
              <Image src={active.src} alt={active.title} width={1200} height={1000} className="max-h-[72vh] w-full object-contain bg-slate-950" />
              <div className="p-5">
                <h2 className="text-xl font-black text-slate-950">{active.title}</h2>
                <p className="mt-2 text-slate-600">{active.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

