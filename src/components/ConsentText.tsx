import Link from "next/link";

export function ConsentText({ type }: { type: "candidate" | "employer" }) {
  return (
    <div className="rounded-md border border-gold/30 bg-gold/10 p-4 text-sm leading-6 text-slate-700">
      By submitting this form, you confirm that the information provided is accurate and consent to
      Continental Mercantile Corporation contacting you by phone, email, SMS or WhatsApp for{" "}
      {type === "candidate" ? "career and recruitment support" : "manpower requirement coordination"}.
      Consent details are stored with timestamp, source page and IP for compliance. Read our{" "}
      <Link className="font-bold text-royal underline" href="/privacy-policy">Privacy Policy</Link>{" "}
      and <Link className="font-bold text-royal underline" href="/terms-of-use">Terms of Use</Link>.
    </div>
  );
}
