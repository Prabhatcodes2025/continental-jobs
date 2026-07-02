import { NextRequest, NextResponse } from "next/server";
import { appendRecord, formDataToObject, saveUploads, sendWebhook, sendWhatsAppWebhook } from "@/lib/storage";
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
    const record = await appendRecord("requirements", parsed.data, {
      uploads,
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || "local",
      userAgent: request.headers.get("user-agent") || "unknown"
    });

    const webhookStatus = await sendWebhook("employer_requirement", record);
    const whatsappWebhookStatus = await sendWhatsAppWebhook("employer_requirement_whatsapp_opt_in", record);
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
