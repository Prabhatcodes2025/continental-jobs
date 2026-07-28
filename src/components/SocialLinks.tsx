import type { ReactNode } from "react";

type SocialLink = {
  key: string;
  label: string;
  url?: string;
};

const icons: Record<string, ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.2V6.6c0-.8.5-1 1-1h1.7V2.8A22 22 0 0 0 14.2 2c-2.5 0-4.1 1.5-4.1 4.2v2H7.4v3.2h2.7V22h3.4V11.4h2.8l.4-3.2H14Z" /></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 2.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Z" /></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.1a3 3 0 0 0-2.1-2.1C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.9A3 3 0 0 0 4.5 19c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.9ZM10 15.4V8.6l6 3.4-6 3.4Z" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5A2.2 2.2 0 1 1 5 7.9 2.2 2.2 0 0 1 5 3.5ZM3.3 9.2h3.4V21H3.3V9.2Zm5.8 0h3.2v1.6h.1a3.5 3.5 0 0 1 3.2-1.9c3.4 0 4.1 2.3 4.1 5.2V21h-3.4v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9.1V9.2Z" /></svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 10.5 21.1 2h-1.8l-6.4 7.4L7.8 2H2l7.8 11.3L2 22h1.8l6.8-7.8 5.4 7.8h5.8l-8.1-11.5Zm-2.4 2.8-.8-1.1L4.2 3.3H7l5 7.1.8 1.1 6.6 9.3h-2.8l-5.3-7.5Z" /></svg>
  )
};

export function SocialLinks({ links, className = "" }: { links: SocialLink[]; className?: string }) {
  const activeLinks = links.filter((link) => link.url?.trim());
  if (!activeLinks.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Social media links">
      {activeLinks.map((link) => (
        <a
          key={link.key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
        >
          <span className="social-icon h-4 w-4 fill-current">{icons[link.key]}</span>
        </a>
      ))}
    </div>
  );
}
