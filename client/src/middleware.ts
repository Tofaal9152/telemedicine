import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  // Protected routes
  const protectedPaths = ["/dashboard"];
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  // Public auth routes: redirect if already logged in
  const publicAuthRoutes = [
    "/auth/signin",
    // "/auth/signup",
    // "/auth/forget-password",
    // "/auth/verify-otp",
  ];

  // const isResetConfirm = pathname.startsWith("/auth/password/reset/confirm");

  if (
    session &&
    publicAuthRoutes.includes(pathname)
    // || isResetConfirm
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/signin",
    // "/auth/signup",
    // "/auth/forget-password",
    // "/auth/password/reset/confirm/:path*",
    // "/auth/verify-otp",
  ],
};
