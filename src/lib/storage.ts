import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultSiteContent, type GalleryEntry, type OfficeContact, type SiteContent } from "@/lib/content";
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

async function tryEnsureStorage() {
  try {
    await ensureStorage();
    return true;
  } catch (error) {
    console.error("Storage initialization failed. Falling back to static data.", error);
    return false;
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0);
}

function normalizeOffice(value: unknown, fallback: OfficeContact): OfficeContact {
  if (!value || typeof value !== "object") return fallback;
  const office = value as Partial<OfficeContact>;

  return {
    title: typeof office.title === "string" && office.title.trim() ? office.title : fallback.title,
    subtitle: typeof office.subtitle === "string" && office.subtitle.trim() ? office.subtitle : fallback.subtitle,
    address: typeof office.address === "string" && office.address.trim() ? office.address : fallback.address,
    phones: isStringArray(office.phones) ? office.phones : fallback.phones,
    emails: isStringArray(office.emails) ? office.emails : fallback.emails,
    whatsapp: undefined,
    website: undefined,
    managerPhones: undefined
  };
}

function normalizeGalleryEntry(value: unknown, fallback: GalleryEntry): GalleryEntry {
  if (!value || typeof value !== "object") return fallback;
  const item = value as Partial<GalleryEntry>;

  return {
    title: typeof item.title === "string" && item.title.trim() ? item.title : fallback.title,
    caption: typeof item.caption === "string" && item.caption.trim() ? item.caption : fallback.caption,
    src: typeof item.src === "string" && item.src.trim() ? item.src : fallback.src,
    activity: typeof item.activity === "string" && item.activity.trim() ? item.activity : fallback.activity
  };
}

function normalizeSiteContent(saved: Partial<SiteContent>): SiteContent {
  const recruitmentEmail = typeof saved.recruitmentEmail === "string" && saved.recruitmentEmail.trim() ? saved.recruitmentEmail : defaultSiteContent.recruitmentEmail;
  const offices = defaultSiteContent.offices.map((fallback, index) => ({
    ...normalizeOffice(saved.offices?.[index], fallback),
    emails: [recruitmentEmail]
  }));
  const savedGallery = Array.isArray(saved.gallery) ? saved.gallery : [];
  const gallery = defaultSiteContent.gallery.map((fallback, index) => normalizeGalleryEntry(savedGallery[index], fallback));

  return {
    recruitmentEmail,
    offices,
    indianOperations: isStringArray(saved.indianOperations) ? saved.indianOperations : defaultSiteContent.indianOperations,
    worldwideOperations: isStringArray(saved.worldwideOperations) ? saved.worldwideOperations : defaultSiteContent.worldwideOperations,
    gallery
  };
}

export async function appendRecord<T>(
  bucket: "applications" | "requirements",
  data: T,
  meta: { ipAddress: string; userAgent: string; uploads: string[] }
) {
  const storageReady = await tryEnsureStorage();
  const file = path.join(dataDir, `${bucket}.json`);
  let existing: Array<SubmissionRecord<T>> = [];

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

  if (!storageReady) {
    return record;
  }

  try {
    existing = JSON.parse(await readFile(file, "utf8"));
  } catch {
    existing = [];
  }

  try {
    existing.unshift(record);
    await writeFile(file, JSON.stringify(existing, null, 2));
  } catch (error) {
    console.error(`Unable to persist ${bucket} record. Continuing without local storage.`, error);
  }

  return record;
}

export async function readRecords(bucket: "applications" | "requirements") {
  const file = path.join(dataDir, `${bucket}.json`);

  try {
    return JSON.parse(await readFile(file, "utf8")) as unknown[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error(`Unable to read ${bucket} records. Returning an empty list.`, error);
    }
    return [];
  }
}

export async function readSiteContent() {
  const file = path.join(dataDir, "site-content.json");

  try {
    const saved = JSON.parse(await readFile(file, "utf8")) as Partial<SiteContent>;
    return normalizeSiteContent(saved);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Unable to read editable site content. Falling back to static defaults.", error);
    }
    return defaultSiteContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await ensureStorage();
  const file = path.join(dataDir, "site-content.json");
  await writeFile(file, JSON.stringify(content, null, 2));
}

export async function saveUploads(formData: FormData, fieldNames: string[]) {
  if (!(await tryEnsureStorage())) {
    return [];
  }
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
  if (!(await tryEnsureStorage())) {
    return {};
  }
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
