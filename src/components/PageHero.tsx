import Link from "next/link";

export function PageHero({
  title,
  text,
  official = false,
  eyebrow = null,
  size = "default",
  secondaryLabel = "SUBMIT REQUIREMENT"
}: {
  title: string;
  text: string;
  official?: boolean;
  eyebrow?: string | null;
  size?: "default" | "compact";
  secondaryLabel?: string;
}) {
  const titleLines = title.toUpperCase().split("\n");
  const titleSize = size === "compact" ? "text-3xl sm:text-4xl md:text-5xl" : "text-4xl md:text-6xl";

  return (
    <section className="premium-band text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-24">
        {eyebrow ? <p className="text-sm font-black uppercase tracking-[0.3em] text-gold">{eyebrow}</p> : null}
        <h1 className={`${eyebrow ? "mt-4" : ""} max-w-5xl ${titleSize} font-black leading-tight corporate-title-caps`}>
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/apply" className="button-primary">APPLY FOR A JOB</Link>
          <Link href="/manpower-requirement" className="button-secondary">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}
