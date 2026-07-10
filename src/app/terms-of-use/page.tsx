import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Terms of Use"
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" text="Website usage terms for candidates, employers and visitors." />
      <section className="bg-white py-16">
        <article className="prose prose-slate mx-auto max-w-4xl px-4 lg:px-8">
          <p>This website provides information and enquiry forms for international recruitment, staffing, work abroad, study abroad, migration and Human Resource Solutions.</p>
          <h2>Accuracy of Information</h2>
          <p>Users must submit accurate information and valid documents. False, incomplete or misleading information may result in rejection of an enquiry or application.</p>
          <h2>No Guaranteed Placement</h2>
          <p>Submission of a form does not guarantee job placement, visa approval, work permit approval or employer selection. Final outcomes depend on employer, legal, immigration and documentation requirements.</p>
          <h2>Employer Requirements</h2>
          <p>Employers must provide lawful demand details, salary, accommodation, facilities, contract duration, job descriptions and labour law compliance information.</p>
          <h2>Communication Consent</h2>
          <p>By submitting forms with consent, users agree to be contacted by phone, email, SMS or WhatsApp regarding the enquiry.</p>
        </article>
      </section>
    </>
  );
}
