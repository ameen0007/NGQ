import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass paths that shouldn't be blocked
  if (
    pathname.startsWith('/_next') ||     // Next.js static files
    pathname.startsWith('/api') ||       // API routes (including our PDF route)
    pathname.startsWith('/admin') ||     // Admin dashboard
    pathname.startsWith('/login') ||     // Login page
    pathname.startsWith('/coming-soon') || // The coming soon page itself
    pathname === '/favicon.ico'          // Favicon
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
