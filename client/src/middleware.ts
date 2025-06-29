// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "@/lib/session";

// export async function middleware(req: NextRequest) {
//   const session = await getSession();

//   const protectedPaths = ["/dashboard"];

//   if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
//     if (!session) {
//       return NextResponse.redirect(new URL("/auth/signin", req.url));
//     }
//   }

//   if (
//     req.nextUrl.pathname === "/auth/signin" ||
//     req.nextUrl.pathname === "/auth/signup"
//   ) {
//     if (session) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/signin", "/auth/signup"],
// };
export  async function middleware() {} // when developing, this is the default export