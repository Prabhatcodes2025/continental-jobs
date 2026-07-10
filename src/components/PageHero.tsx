import Link from "next/link";

export function PageHero({ title, text, official = false }: { title: string; text: string; official?: boolean }) {
  return (
    <section className="premium-band text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-gold">Continental Mercantile Corporation</p>
        <h1 className={`mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl ${official ? "corporate-title-caps" : "corporate-title"}`}>
          {official ? title.toUpperCase() : title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/apply" className="button-primary">APPLY FOR A JOB</Link>
          <Link href="/manpower-requirement" className="button-secondary">Submit Requirement</Link>
        </div>
      </div>
    </section>
  );
}
