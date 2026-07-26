import {
  generateAccessToken,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth/auth.helpers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getMeAction } from "./features/auth/actions/me.actions";

type TokenPayload = {
  userId: string;
  role: string;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // example (/products/indoor) => (/products?category=indoor)
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
  // example (/blog/care) => (/blog?category=care)
  const blogMatch = pathname.match(/^\/blog\/(care|health|styling)$/);
  if (blogMatch) {
    const category = blogMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = "/blog";
    url.search = `?category=${category}`;
    return NextResponse.redirect(url);
  }
  // redirect logged in user to his dashboard if go to /login-register
  if (pathname === "/login-register") {
    const accessToken = await getAccessTokenFromCookie();
    let isLoggedIn = false;

    if (accessToken) {
      const payload = verifyAccessToken(accessToken) as TokenPayload | null;
      if (payload?.userId) {
        isLoggedIn = true;
      }
    }
    if (isLoggedIn) {
      const payload = verifyAccessToken(accessToken!) as TokenPayload | null;
      const redirectPath =
        payload?.role === "admin" ? "/admin/dashboard" : "/user/profile";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }
  // route protection
  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment")
  ) {
    const accessToken = await getAccessTokenFromCookie();
    let payload = accessToken
      ? (verifyAccessToken(accessToken) as TokenPayload | null)
      : null;
    // if there is no verified payload try refresh token payload
    if (!payload) {
      const refreshToken = await getRefreshTokenFromCookie();
      if (refreshToken) {
        const refreshPayload = verifyRefreshToken(
          refreshToken,
        ) as TokenPayload | null;
        // if there is refresh token payload refresh access token
        if (refreshPayload?.userId) {
          const newAccessToken = generateAccessToken({
            userId: refreshPayload.userId,
            role: refreshPayload.role,
          });
          await setAccessTokenCookie(newAccessToken);
          payload = refreshPayload;
        }
      }
    }
    // else redirect to /login-register
    if (!payload) {
      const loginUrl = new URL("/login-register", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const result = await getMeAction();
    const user = result.user;
    // redirect logged out user to /login-register
    if (!user) {
      const loginUrl = new URL("/login-register", request.url);
      return NextResponse.redirect(loginUrl);
    }
    // if user is blocked prevent access to protected routes and redirect to blocked page
    if (user.isBlocked) {
      const url = request.nextUrl.clone();
      url.pathname = "/blocked";
      return NextResponse.redirect(url);
    }
    // redirect user to his panel
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      const fallbackUrl = "/user/profile";
      return NextResponse.redirect(new URL(fallbackUrl, request.url));
    }

    if (pathname.startsWith("/user") && user.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/login-register",
    "/products/:path*",
    "/blog/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/payment/:path*",
  ],
};
