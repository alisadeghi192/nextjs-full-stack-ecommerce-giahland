import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getMeAction } from "./features/auth/actions/me.actions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const productMatch = pathname.match(
    /^\/products\/(indoor|decoration|gift|discounted)$/,
  );
  if (productMatch) {
    const category = productMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    url.search = `?category=${category}`;
    return NextResponse.redirect(url);
  }

  const blogMatch = pathname.match(/^\/blog\/(care|health|styling)$/);
  if (blogMatch) {
    const category = blogMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = "/blog";
    url.search = `?category=${category}`;
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment")
  ) {
    const { user } = await getMeAction();

    if (user?.isBlocked) {
      const url = request.nextUrl.clone();
      url.pathname = "/blocked";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/products/:path*",
    "/blog/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/payment/:path*",
  ],
};
