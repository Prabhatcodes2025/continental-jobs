export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  official = false
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  official?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl ${official ? "corporate-title-caps" : "corporate-title-caps"}`}>
        {title.toUpperCase()}
      </h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-600">{text}</p> : null}
    </div>
  );
}
