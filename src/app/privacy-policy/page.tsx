import { PageHero } from "@/components/PageHero";
import { contactDetails } from "@/lib/site-data";

export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" text="How Continental Mercantile Corporation collects, uses and protects candidate and employer information." />
      <section className="bg-white py-16">
        <article className="prose prose-slate mx-auto max-w-4xl px-4 lg:px-8">
          <p>We collect information submitted through job applications, employer requirement forms, phone, email and WhatsApp interactions to provide recruitment, staffing, study abroad and HR services.</p>
          <h2>Information We Collect</h2>
          <p>Personal details, contact details, passport status, job preferences, work experience, employer project details, uploaded documents, consent timestamp, source page, IP address and user agent may be stored for compliance and service delivery.</p>
          <h2>Use of Information</h2>
          <p>Information is used for candidate screening, employer coordination, documentation, interview scheduling, CRM updates, WhatsApp communication and legally required recruitment records.</p>
          <h2>WhatsApp Consent</h2>
          <p>When you opt in, we may contact you through WhatsApp about your enquiry, application, recruitment status or employer requirement. You may request to stop receiving WhatsApp messages at any time.</p>
          <h2>Contact</h2>
          <p>For privacy requests, contact {contactDetails.email}.</p>
        </article>
      </section>
    </>
  );
}
