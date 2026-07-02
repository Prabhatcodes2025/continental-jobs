import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { company, seoKeywords } from "@/lib/site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.continentalmanpower.com"),
  title: {
    default: "Continental Mercantile Corporation | Overseas Manpower Consultancy Kochi",
    template: "%s | Continental Mercantile Corporation"
  },
  description:
    "43+ year international manpower consultancy from Kochi for work abroad, Gulf jobs, Europe work permits, global recruitment, staffing, study abroad and HR solutions.",
  keywords: seoKeywords,
  openGraph: {
    title: "Continental Mercantile Corporation",
    description: "International recruitment, overseas manpower supply and work abroad consultancy.",
    images: ["/brand/corporate-office-kochi.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: company.name,
    url: `https://${company.website}`,
    founder: company.chairmanFull,
    address: company.office,
    email: company.emails.work,
    telephone: company.phones.main,
    areaServed: ["India", "Middle East", "Europe", "Africa", "Asia", "United Kingdom", "Australia", "Canada"]
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
