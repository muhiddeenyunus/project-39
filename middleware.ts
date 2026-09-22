import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/?login=1", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
