import { env } from "@/lib/env";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export function renderSubmissionEmail({
  title,
  intro,
  fields
}: {
  title: string;
  intro: string;
  fields: Record<string, string | number | undefined>;
}) {
  const rows = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([label, value]) => `<tr><td style="padding:8px 12px;color:#64748b">${label}</td><td style="padding:8px 12px;color:#0b1f33;font-weight:700">${value}</td></tr>`)
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:640px;margin:auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        <div style="background:#07182d;color:#fff;padding:24px">
          <p style="margin:0;color:#d7a942;font-weight:800;letter-spacing:2px;text-transform:uppercase">Continental Mercantile Corporation</p>
          <h1 style="margin:10px 0 0;font-family:Georgia,serif">${title}</h1>
        </div>
        <div style="padding:24px">
          <p style="color:#334155;line-height:1.7">${intro}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:18px">${rows}</table>
        </div>
      </div>
    </div>
  `;
}

export async function sendEmail(payload: EmailPayload) {
  if (!env.resendApiKey) {
    console.warn("RESEND_API_KEY is missing. Email notification skipped.", payload.subject);
    return { status: "disabled" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.resendApiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: "Continental Mercantile Corporation <no-reply@continentalmanpower.com>",
      ...payload
    })
  });

  return { status: response.ok ? ("sent" as const) : ("failed" as const), responseStatus: response.status };
}
