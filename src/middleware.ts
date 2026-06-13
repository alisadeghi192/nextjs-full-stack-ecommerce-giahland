import { getMeAction } from '@/features/auth/actions/me.actions';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async  function  middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

   if (pathname.startsWith('/user')) {
    const { user } = await getMeAction();
    
    if (!user) {
      return NextResponse.redirect(new URL('/login-register', request.url));
    }
    
    if (user.role === 'plant-doctor') {
      if (pathname.includes('/wishlist') || pathname.includes('/orders')) {
        return NextResponse.redirect(new URL('/user', request.url));
      }
    }
  }

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
  matcher: ['/products/:path*', '/blog/:path*', '/user/:path*'],
};