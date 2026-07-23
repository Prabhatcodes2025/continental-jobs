import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { getAdminSessionSecret } from "@/lib/env";

const cookieName = "continental_admin_session";

function secret() {
  return getAdminSessionSecret();
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionValue(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 8, provider: "continental-admin" })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySession(value?: string) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (Buffer.byteLength(signature) !== Buffer.byteLength(expected)) return false;
  const valid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdminAuthenticated() {
  return verifySession(cookies().get(cookieName)?.value);
}

export { cookieName };
