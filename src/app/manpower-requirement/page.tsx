import { ConsentText } from "@/components/ConsentText";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Manpower Requirement"
};

export default function ManpowerRequirementPage({ searchParams }: { searchParams: { submitted?: string; error?: string } }) {
  return (
    <>
      <PageHero title="Employer / Client Manpower Requirement" text="Submit demand details, job categories, project location, salary, facilities, visa details and mobilization timeline." />
      <section className="bg-white py-16">
        <form action="/api/requirements" method="post" encType="multipart/form-data" className="mx-auto grid max-w-5xl gap-6 px-4 lg:px-8">
          {searchParams.submitted ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Thank you. Your manpower requirement has been received and is ready for employer coordination.
            </div>
          ) : null}
          {searchParams.error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">
              Submission failed. Please check required fields, upload size and consent boxes before trying again.
            </div>
          ) : null}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="sourcePage" value="/manpower-requirement" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="companyName" label="Company Name" required />
            <Field name="contactPerson" label="Contact Person" required />
            <Field name="designation" label="Designation" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="phone" label="Phone / WhatsApp" required />
            <Field name="country" label="Country" required />
            <Field name="projectLocation" label="Project Location" required />
            <Field name="categories" label="Required Job Categories" required />
            <Field name="workers" label="Number of Workers" required />
            <Field name="salaryRange" label="Salary Range" required />
            <Field name="facilities" label="Food / Accommodation Provided" required />
            <Field name="contractDuration" label="Contract Duration" required />
            <Field name="visaDetails" label="Visa / Work Permit Details" required />
            <Field name="mobilizationTime" label="Expected Mobilization Time" required />
            <FileField name="documents" label="Upload Demand Letter / Documents" />
          </div>
          <label className="grid gap-2">
            <span className="label">Message</span>
            <textarea name="message" rows={5} className="field" placeholder="Add job description, qualification, labour law compliance notes or special instructions." />
          </label>
          <ConsentText type="employer" />
          <Check name="whatsappConsent" label="I consent to receive requirement coordination messages through WhatsApp." />
          <Check name="termsAgreement" label="I agree to the Terms of Use and confirm the submitted manpower requirement is lawful and accurate." />
          <button className="button-primary w-fit" type="submit">Submit Requirement</button>
        </form>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field" name={name} type={type} required={required} />
    </label>
  );
}

function FileField({ name, label }: { name: string; label: string }) {
  return (
    <label className="grid gap-2">
      <span className="label">{label}</span>
      <input className="field" name={name} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
    </label>
  );
}

function Check({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
      <input name={name} type="checkbox" required className="mt-1 h-4 w-4 accent-gold" />
      <span>{label}</span>
    </label>
  );
}
