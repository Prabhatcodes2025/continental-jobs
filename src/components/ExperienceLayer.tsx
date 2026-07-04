"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, MessageCircle, Phone, Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { company } from "@/lib/site-data";

type ApplyContextValue = {
  openApply: () => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

const loadingMessage = "Preparing Your Global Journey...";
const preloaderDots = [
  { x: "13%", y: "22%", s: "3px", d: "0s" },
  { x: "82%", y: "18%", s: "2px", d: "0.35s" },
  { x: "72%", y: "74%", s: "4px", d: "0.7s" },
  { x: "21%", y: "78%", s: "2px", d: "1.1s" },
  { x: "38%", y: "13%", s: "3px", d: "1.45s" },
  { x: "88%", y: "52%", s: "2px", d: "1.8s" },
  { x: "9%", y: "58%", s: "2px", d: "2.15s" },
  { x: "56%", y: "86%", s: "3px", d: "2.5s" }
];

const orbitSparkles = [
  { size: "5px", orbit: "preloader-spark-orbit-a", delay: "0s" },
  { size: "3px", orbit: "preloader-spark-orbit-b", delay: "-0.55s" },
  { size: "4px", orbit: "preloader-spark-orbit-c", delay: "-1.1s" },
  { size: "2px", orbit: "preloader-spark-orbit-d", delay: "-1.65s" },
  { size: "3px", orbit: "preloader-spark-orbit-e", delay: "-2.2s" }
];

export function useApplyModal() {
  const context = useContext(ApplyContext);
  if (!context) {
    return { openApply: () => undefined };
  }
  return context;
}

export function ExperienceLayer({ children }: { children: ReactNode }) {
  const [applyOpen, setApplyOpen] = useState(false);
  const value = useMemo(() => ({ openApply: () => setApplyOpen(true) }), []);

  return (
    <ApplyContext.Provider value={value}>
      <Preloader />
      <RouteProgress />
      <CustomCursor />
      {children}
      <QuickActions />
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </ApplyContext.Provider>
  );
}

function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 360 : 1650);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader-shell fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050b14] px-5 text-white"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Loading Continental Mercantile Corporation"
          aria-live="polite"
        >
          <div className="preloader-aurora" />
          <div className="preloader-noise" />
          <div className="preloader-flash" />
          <div className="preloader-depth" aria-hidden="true">
            {preloaderDots.map((dot) => (
              <span
                key={`${dot.x}-${dot.y}`}
                className="preloader-depth-dot"
                style={
                  {
                    "--dot-x": dot.x,
                    "--dot-y": dot.y,
                    "--dot-size": dot.s,
                    "--dot-delay": dot.d
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className="preloader-stage relative grid w-full place-items-center text-center">
            <div className="preloader-orbit" aria-hidden="true">
              <span className="preloader-ring preloader-ring-outer" />
              <span className="preloader-ring preloader-ring-middle" />
              <span className="preloader-ring preloader-ring-inner" />
              <span className="preloader-ring preloader-ring-core" />
              {orbitSparkles.map((sparkle) => (
                <span
                  key={sparkle.orbit}
                  className={`preloader-spark-orbit ${sparkle.orbit}`}
                  style={{ "--spark-delay": sparkle.delay } as CSSProperties}
                >
                  <span className="preloader-spark" style={{ "--spark-size": sparkle.size } as CSSProperties} />
                </span>
              ))}
              <span className="preloader-lens" />
              <motion.div
                className="preloader-logo-shell"
                initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: "-50%", y: "-50%", scale: reduceMotion ? 1 : [0.8, 1, 1.018], filter: "blur(0px)" }}
                exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 1.12, filter: "blur(4px)" }}
                transition={{ duration: reduceMotion ? 0.18 : 0.72, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/brand/continental-logo.png"
                  alt="Continental Mercantile Corporation logo"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 118px, 136px"
                  className="object-contain"
                  priority
                  quality={100}
                />
              </motion.div>
            </div>
            <motion.p
              className="preloader-brand"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Continental Mercantile Corporation
            </motion.p>
            <p className="preloader-loading" aria-label={loadingMessage}>
              <span className="sr-only">{loadingMessage}</span>
              {loadingMessage.split("").map((letter, index) => (
                <motion.span
                  aria-hidden="true"
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.26, delay: reduceMotion ? 0 : 0.28 + index * 0.022, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              <span className="preloader-loading-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timeout = window.setTimeout(() => setActive(false), 420);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-1 bg-gradient-to-r from-gold via-white to-gold shadow-[0_0_24px_rgba(217,164,65,0.7)]"
      initial={false}
      animate={{ width: active ? "78%" : "100%", opacity: active ? 1 : 0 }}
      transition={{ duration: active ? 0.28 : 0.2, ease: "easeOut" }}
    />
  );
}

function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -80, y: -80 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("a,button,[data-magnetic],summary")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[95] hidden rounded-full border border-gold/50 mix-blend-screen md:block"
      animate={{
        x: position.x - (active ? 23 : 14),
        y: position.y - (active ? 23 : 14),
        width: active ? 46 : 28,
        height: active ? 46 : 28,
        backgroundColor: active ? "rgba(217,164,65,0.18)" : "rgba(217,164,65,0.08)"
      }}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.5 }}
    />
  );
}

function QuickActions() {
  const { openApply } = useApplyModal();

  return (
    <div className="fixed bottom-5 left-4 z-50 hidden flex-col gap-2 md:flex">
      <button type="button" onClick={openApply} className="quick-action" data-magnetic>
        <BriefcaseBusiness className="h-4 w-4" />
        Apply
      </button>
      <Link href="/manpower-requirement" className="quick-action" data-magnetic>
        <Send className="h-4 w-4" />
        Requirement
      </Link>
      <a href={`tel:${company.phones.kochi[0].replaceAll(" ", "")}`} className="quick-action" data-magnetic>
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a href={company.socialChat} className="quick-action" data-magnetic>
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    document.body.style.overflow = "";
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [closeModal, open]);

  useEffect(() => {
    if (open) {
      setStep(1);
      setStatus("idle");
      window.setTimeout(() => dialogRef.current?.focus(), 100);
    }
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: new FormData(form),
        headers: { accept: "application/json" }
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
      setStep(1);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-navy/78 px-4 py-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-gold/25 bg-white shadow-glow outline-none"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <div className="premium-band sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gold/20 p-5 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Soft Apply</p>
                <h2 id="apply-modal-title" className="mt-2 text-2xl font-black">Apply for Overseas Jobs</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                  A quick, consent-based application. You can upload documents now or share them later with the recruitment team.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
                aria-label="Close apply popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-5 p-5 md:p-7">
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="sourcePage" value="/apply-popup" />

              <div className="grid gap-2 md:grid-cols-3">
                {["Profile", "Preference", "Consent"].map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStep(index + 1)}
                    className={`rounded-md border px-4 py-3 text-left text-sm font-black transition ${
                      step === index + 1
                        ? "border-gold bg-gold/15 text-navy"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-gold/50"
                    }`}
                  >
                    <span className="mr-2 text-gold">0{index + 1}</span>
                    {label}
                  </button>
                ))}
              </div>

              {status === "success" ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm font-bold leading-6 text-emerald-800">
                  Thank you. Your application has been received. Our recruitment desk can follow up using your selected consent preferences.
                </div>
              ) : null}
              {status === "error" ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-bold leading-6 text-red-800">
                  Submission failed. Please check required fields, file size and consent boxes, then try again.
                </div>
              ) : null}

              <div className={step === 1 ? "grid gap-5 md:grid-cols-2" : "hidden"}>
                <ModalField name="fullName" label="Full Name" required />
                <ModalField name="mobile" label="Mobile / WhatsApp Number" required />
                <ModalField name="email" label="Email" type="email" required />
                <ModalField name="location" label="Current Location" required />
              </div>

              <div className={step === 2 ? "grid gap-5 md:grid-cols-2" : "hidden"}>
                <ModalField name="passportStatus" label="Passport Status" required />
                <ModalField name="preferredCountry" label="Preferred Country" required />
                <ModalField name="jobCategory" label="Job Category" required />
                <ModalField name="experience" label="Experience" required />
                <ModalFile name="resume" label="Upload Resume" />
                <ModalFile name="photo" label="Upload Photo" />
                <label className="grid gap-2 md:col-span-2">
                  <span className="label">Message</span>
                  <textarea className="field" name="message" rows={4} placeholder="Preferred role, country, availability or special notes." />
                </label>
              </div>

              <div className={step === 3 ? "grid gap-5" : "hidden"}>
                <div className="rounded-lg border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-slate-700">
                  You consent to Continental Mercantile Corporation contacting you by phone, email, SMS or WhatsApp for recruitment support.
                  Consent timestamp, source page and IP are stored for compliance.
                </div>
                <ModalCheck name="whatsappConsent" label="I consent to receive recruitment updates and responses through WhatsApp." />
                <ModalCheck name="privacyAgreement" label="I agree to the Privacy Policy and allow my information to be processed for recruitment services." />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <Link
                  href="/apply"
                  onClick={closeModal}
                  className="text-sm font-bold text-royal underline underline-offset-4"
                >
                  Open full application page
                </Link>
                <div className="flex gap-3">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep((value) => value - 1)} className="rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">
                      Back
                    </button>
                  ) : null}
                  {step < 3 ? (
                    <button type="button" onClick={() => setStep((value) => value + 1)} className="button-primary">
                      Continue
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting} className="button-primary disabled:cursor-wait disabled:opacity-70">
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ModalField({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field" name={name} type={type} required={required} />
    </label>
  );
}

function ModalFile({ name, label }: { name: string; label: string }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white" name={name} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
    </label>
  );
}

function ModalCheck({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
      <input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-gold" />
      <span>{label}</span>
    </label>
  );
}
