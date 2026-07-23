import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { renderSubmissionEmail, sendEmail } from "@/lib/notifications/email";
import { appendRecord, formDataToObject, saveUploads, sendWebhook, sendWhatsAppWebhook } from "@/lib/storage";
import { createSubmissionNumber, insertEmployerRequirement } from "@/lib/supabase/mutations/submissions";
import { requirementSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const raw = formDataToObject(formData);
    const parsed = requirementSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const uploads = await saveUploads(formData, ["documents"]);
    const now = new Date().toISOString();
    const orderNumber = createSubmissionNumber("EMP");
    const meta = {
      uploads,
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "local",
      userAgent: request.headers.get("user-agent") || "unknown"
    };

    const supabaseResult = await insertEmployerRequirement({
      order_number: orderNumber,
      company_name: parsed.data.companyName,
      contact_person: parsed.data.contactPerson,
      designation: parsed.data.designation,
      email: parsed.data.email,
      phone: parsed.data.phone,
      whatsapp: parsed.data.phone,
      country: parsed.data.country,
      project_location: parsed.data.projectLocation,
      job_categories: parsed.data.categories,
      workers_required: parsed.data.workers,
      salary_range: parsed.data.salaryRange,
      food_provided: parsed.data.facilities,
      accommodation_provided: parsed.data.facilities,
      contract_duration: parsed.data.contractDuration,
      visa_details: parsed.data.visaDetails,
      mobilization_timeline: parsed.data.mobilizationTime,
      labour_compliance: parsed.data.message,
      message: parsed.data.message,
      document_path: uploads[0] || null,
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

    const record = await appendRecord("requirements", { ...parsed.data, orderNumber }, meta);

    const webhookStatus = await sendWebhook("employer_requirement", record);
    const whatsappWebhookStatus = await sendWhatsAppWebhook("employer_requirement_whatsapp_opt_in", record);
    await Promise.allSettled([
      env.adminNotifyEmail
        ? sendEmail({
            to: env.adminNotifyEmail,
            subject: `New employer manpower order ${orderNumber}`,
            html: renderSubmissionEmail({
              title: "New Employer Manpower Order",
              intro: "A new employer/client manpower order has been submitted through the website.",
              fields: {
                "Order Number": orderNumber,
                Company: parsed.data.companyName,
                Contact: parsed.data.contactPerson,
                Email: parsed.data.email,
                Phone: parsed.data.phone,
                Country: parsed.data.country,
                Workers: parsed.data.workers
              }
            })
          })
        : Promise.resolve({ status: "disabled" as const }),
      sendEmail({
        to: parsed.data.email,
        subject: "We received your manpower order",
        html: renderSubmissionEmail({
          title: "Manpower Order Received",
          intro: "Thank you for contacting Continental Mercantile Corporation. Our employer desk will review your requirement.",
          fields: {
            "Order Number": orderNumber,
            Company: parsed.data.companyName,
            "Project Location": parsed.data.projectLocation,
            "Job Categories": parsed.data.categories,
            "Workers Required": parsed.data.workers
          }
        })
      })
    ]);
    if (request.headers.get("accept")?.includes("text/html")) {
      return NextResponse.redirect(new URL("/manpower-requirement?submitted=1", request.url), { status: 303 });
    }
    return NextResponse.json({ ok: true, id: record.id, webhookStatus, whatsappWebhookStatus });
  } catch (error) {
    if (request.headers.get("accept")?.includes("text/html")) {
      return NextResponse.redirect(new URL("/manpower-requirement?error=1", request.url), { status: 303 });
    }
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Submission failed." },
      { status: 500 }
    );
  }
}
