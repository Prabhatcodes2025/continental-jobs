import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { cookieName, createSessionValue } from "@/lib/auth";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

function safeCompare(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const expectedEmail = requiredEnv("ADMIN_EMAIL");
  const expectedPassword = requiredEnv("ADMIN_PASSWORD");

  if (!safeCompare(email, expectedEmail) || !safeCompare(password, expectedPassword)) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  response.cookies.set(cookieName, createSessionValue(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });
  return response;
}
