import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const productMatch = pathname.match(/^\/products\/(indoor|decoration|gift|discounted)$/);
  if (productMatch) {
    const category = productMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = '/products';
    url.search = `?category=${category}`;
    return NextResponse.redirect(url);
  }

  const blogMatch = pathname.match(/^\/blog\/(care|health|intro)$/);
  if (blogMatch) {
    const category = blogMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = '/blog';
    url.search = `?category=${category}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/:path*', '/blog/:path*'],
};