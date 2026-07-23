import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { renderSubmissionEmail, sendEmail } from "@/lib/notifications/email";
import { appendRecord, formDataToObject, saveUploads, sendWebhook, sendWhatsAppWebhook } from "@/lib/storage";
import { createSubmissionNumber, insertCandidateApplication } from "@/lib/supabase/mutations/submissions";
import { candidateSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const raw = formDataToObject(formData);
    const parsed = candidateSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const uploads = await saveUploads(formData, ["resume", "passportCopy", "photo"]);
    const now = new Date().toISOString();
    const applicationNumber = createSubmissionNumber("CAN");
    const meta = {
      uploads,
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "local",
      userAgent: request.headers.get("user-agent") || "unknown"
    };

    const supabaseResult = await insertCandidateApplication({
      application_number: applicationNumber,
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.mobile,
      whatsapp: parsed.data.mobile,
      current_location: parsed.data.location,
      passport_status: parsed.data.passportStatus,
      preferred_country: parsed.data.preferredCountry,
      job_category: parsed.data.jobCategory,
      experience_years: parsed.data.experience,
      message: parsed.data.message,
      resume_path: uploads[0] || null,
      passport_path: uploads[1] || null,
      photo_path: uploads[2] || null,
      source_page: parsed.data.sourcePage,
      status: "new",
      consent_privacy: true,
      consent_whatsapp: true,
      consent_timestamp: now,
      ip_address: meta.ipAddress,
      user_agent: meta.userAgent
    });

    if (supabaseResult.error) {
      throw new Error(supabaseResult.error);
    }

    const record = await appendRecord("applications", { ...parsed.data, applicationNumber }, meta);

    const webhookStatus = await sendWebhook("candidate_application", record);
    const whatsappWebhookStatus = await sendWhatsAppWebhook("candidate_application_whatsapp_opt_in", record);
    await Promise.allSettled([
      env.adminNotifyEmail
        ? sendEmail({
            to: env.adminNotifyEmail,
            subject: `New candidate application ${applicationNumber}`,
            html: renderSubmissionEmail({
              title: "New Candidate Application",
              intro: "A new candidate application has been submitted through the website.",
              fields: {
                "Application Number": applicationNumber,
                Name: parsed.data.fullName,
                Email: parsed.data.email,
                Phone: parsed.data.mobile,
                Country: parsed.data.preferredCountry,
                Category: parsed.data.jobCategory
              }
            })
          })
        : Promise.resolve({ status: "disabled" as const }),
      sendEmail({
        to: parsed.data.email,
        subject: "We received your application",
        html: renderSubmissionEmail({
          title: "Application Received",
          intro: "Thank you for contacting Continental Mercantile Corporation. Our recruitment team will review your application.",
          fields: {
            "Application Number": applicationNumber,
            Name: parsed.data.fullName,
            "Preferred Country": parsed.data.preferredCountry,
            "Job Category": parsed.data.jobCategory
          }
        })
      })
    ]);
    if (request.headers.get("accept")?.includes("text/html")) {
      return NextResponse.redirect(new URL("/apply?submitted=1", request.url), { status: 303 });
    }
    return NextResponse.json({ ok: true, id: record.id, webhookStatus, whatsappWebhookStatus });
  } catch (error) {
    if (request.headers.get("accept")?.includes("text/html")) {
      return NextResponse.redirect(new URL("/apply?error=1", request.url), { status: 303 });
    }
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Submission failed." },
      { status: 500 }
    );
  }
}
