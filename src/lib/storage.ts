import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultSiteContent, type SiteContent } from "@/lib/content";
import { optionalEnv } from "@/lib/env";

type SubmissionRecord<T> = T & {
  id: string;
  createdAt: string;
  consentTimestamp: string;
  ipAddress: string;
  userAgent: string;
  uploads: string[];
  crmStatus: "queued" | "sent" | "disabled" | "failed";
};

const dataDir = path.join(process.cwd(), "storage", "data");
const uploadsDir = path.join(process.cwd(), "storage", "uploads");
const publicGalleryDir = path.join(process.cwd(), "public", "uploads", "gallery");
const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

async function ensureStorage() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(publicGalleryDir, { recursive: true });
}

export async function appendRecord<T>(
  bucket: "applications" | "requirements",
  data: T,
  meta: { ipAddress: string; userAgent: string; uploads: string[] }
) {
  await ensureStorage();
  const file = path.join(dataDir, `${bucket}.json`);
  let existing: Array<SubmissionRecord<T>> = [];

  try {
    existing = JSON.parse(await readFile(file, "utf8"));
  } catch {
    existing = [];
  }

  const now = new Date().toISOString();
  const record: SubmissionRecord<T> = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    consentTimestamp: now,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
    uploads: meta.uploads,
    crmStatus: optionalEnv("CRM_WEBHOOK_URL") ? "queued" : "disabled"
  };

  existing.unshift(record);
  await writeFile(file, JSON.stringify(existing, null, 2));
  return record;
}

export async function readRecords(bucket: "applications" | "requirements") {
  await ensureStorage();
  const file = path.join(dataDir, `${bucket}.json`);

  try {
    return JSON.parse(await readFile(file, "utf8")) as unknown[];
  } catch {
    return [];
  }
}

export async function readSiteContent() {
  await ensureStorage();
  const file = path.join(dataDir, "site-content.json");

  try {
    const saved = JSON.parse(await readFile(file, "utf8")) as Partial<SiteContent>;
    return {
      offices: saved.offices?.length ? saved.offices : defaultSiteContent.offices,
      indianOperations: saved.indianOperations?.length ? saved.indianOperations : defaultSiteContent.indianOperations,
      worldwideOperations: saved.worldwideOperations?.length ? saved.worldwideOperations : defaultSiteContent.worldwideOperations,
      gallery: saved.gallery?.length ? saved.gallery : defaultSiteContent.gallery
    } satisfies SiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await ensureStorage();
  const file = path.join(dataDir, "site-content.json");
  await writeFile(file, JSON.stringify(content, null, 2));
}

export async function saveUploads(formData: FormData, fieldNames: string[]) {
  await ensureStorage();
  const saved: string[] = [];

  for (const name of fieldNames) {
    const file = formData.get(name);
    if (!(file instanceof File) || file.size === 0) {
      continue;
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`${name} exceeds the 5MB upload limit.`);
    }

    if (!allowedTypes.has(file.type)) {
      throw new Error(`${name} must be PDF, DOC, DOCX, JPG or PNG.`);
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-120);
    const storedName = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const destination = path.join(uploadsDir, storedName);
    await writeFile(destination, Buffer.from(await file.arrayBuffer()));
    saved.push(storedName);
  }

  return saved;
}

export async function saveGalleryImages(formData: FormData, fieldNames: string[]) {
  await ensureStorage();
  const saved: Record<string, string> = {};

  for (const name of fieldNames) {
    const file = formData.get(name);
    if (!(file instanceof File) || file.size === 0) {
      continue;
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`${name} exceeds the 5MB upload limit.`);
    }

    if (!allowedImageTypes.has(file.type)) {
      throw new Error(`${name} must be JPG, PNG or WEBP.`);
    }

    const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const destination = path.join(publicGalleryDir, safeName);
    await writeFile(destination, Buffer.from(await file.arrayBuffer()));
    saved[name] = `/uploads/gallery/${safeName}`;
  }

  return saved;
}

export function formDataToObject(formData: FormData) {
  const result: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      result[key] = value.trim();
    }
  }

  return result;
}

export async function sendWebhook(kind: string, payload: unknown) {
  const url = optionalEnv("CRM_WEBHOOK_URL");
  if (!url) {
    return "disabled";
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        kind,
        payload,
        notifyEmail: optionalEnv("ADMIN_NOTIFY_EMAIL"),
        sentAt: new Date().toISOString()
      })
    });
    return "sent";
  } catch {
    return "failed";
  }
}

export async function sendWhatsAppWebhook(kind: string, payload: unknown) {
  const url = optionalEnv("WHATSAPP_API_WEBHOOK_URL");
  if (!url) {
    return "disabled";
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, payload, consentBased: true, sentAt: new Date().toISOString() })
    });
    return "sent";
  } catch {
    return "failed";
  }
}
