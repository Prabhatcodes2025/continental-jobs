import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { cookieName, createSessionValue } from "@/lib/auth";
import { env, isDemoModeAllowed, isSupabaseConfigured } from "@/lib/env";
import { getProfileByUserId, signInWithPassword } from "@/lib/supabase/server";

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

  if (isSupabaseConfigured()) {
    const auth = await signInWithPassword(email, password);
    const userId = auth.user?.id ? String(auth.user.id) : "";
    const profile = userId && auth.session?.accessToken ? await getProfileByUserId(userId, auth.session.accessToken) : null;
    const activeProfile = Array.isArray(profile?.data) ? profile.data[0] : null;
    const status = activeProfile?.status ? String(activeProfile.status) : "";

    if (auth.error || !activeProfile || status !== "active") {
      return NextResponse.redirect(new URL("/admin?error=1", request.url), { status: 303 });
    }

    const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
    response.cookies.set(cookieName, createSessionValue(email), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: auth.session?.expiresIn || 60 * 60 * 8,
      path: "/"
    });
    return response;
  }

  if (!isDemoModeAllowed() || !env.adminEmail || !env.adminPassword) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), { status: 303 });
  }

  const expectedEmail = env.adminEmail;
  const expectedPassword = env.adminPassword;

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
