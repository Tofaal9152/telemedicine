import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  const publicAuthRoutes = [
    "/auth/signin",
    "/auth/signup",
    // "/auth/signup",
    // "/auth/forget-password",
    // "/auth/verify-otp",
  ];

  // If not logged in and not on an auth page, redirect to /auth/signin
  if (!session && !publicAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If logged in and on an auth page, redirect to /
  if (session && publicAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
