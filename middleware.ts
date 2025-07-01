// // import { verifyToken } from "@/lib/aut";
// import { verifyToken } from "@/lib/aut";
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   // if there isn't token or invalid token redirect to login page
//   if (!token || !verifyToken(token)) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// // if you protect your admin page
// export const config = {
//   matcher: ["/admin/:path*"], // this is provide all road
// };

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  // matcher: ["/admin/:path*", "/profile/:path*"],
  matcher: ["/admin/:path*"],
};
