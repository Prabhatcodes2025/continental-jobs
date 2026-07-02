import { ConsentText } from "@/components/ConsentText";
import { FormSubmitButton } from "@/components/FormSubmitButton";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Apply for Job"
};

export default function ApplyPage({ searchParams }: { searchParams: { submitted?: string; error?: string } }) {
  return (
    <>
      <PageHero title="Apply for Job" text="Submit your candidate profile for overseas job opportunities, work abroad support and recruitment screening." />
      <section className="bg-white py-16">
        <form action="/api/applications" method="post" encType="multipart/form-data" className="mx-auto grid max-w-5xl gap-6 px-4 lg:px-8">
          {searchParams.submitted ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Thank you. Your application has been received and the recruitment team can follow up using your consent preferences.
            </div>
          ) : null}
          {searchParams.error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">
              Submission failed. Please check the required fields, upload size and consent boxes before trying again.
            </div>
          ) : null}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="sourcePage" value="/apply" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="fullName" label="Full Name" required />
            <Field name="mobile" label="Mobile / WhatsApp Number" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="location" label="Current Location" required />
            <Field name="passportStatus" label="Passport Status" required />
            <Field name="preferredCountry" label="Preferred Country" required />
            <Field name="jobCategory" label="Job Category" required />
            <Field name="experience" label="Experience" required />
            <FileField name="resume" label="Upload Resume" />
            <FileField name="passportCopy" label="Upload Passport Copy" />
            <FileField name="photo" label="Upload Photo" />
          </div>
          <label className="grid gap-2">
            <span className="label">Message</span>
            <textarea name="message" rows={5} className="field" placeholder="Tell us about your preferred role, country or availability." />
          </label>
          <ConsentText type="candidate" />
          <Check name="whatsappConsent" label="I consent to receive recruitment updates and responses through WhatsApp." />
          <Check name="privacyAgreement" label="I agree to the Privacy Policy and allow my submitted information to be processed for recruitment services." />
          <FormSubmitButton>Submit Application</FormSubmitButton>
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
      <input className="field file:mr-4 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white" name={name} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
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
