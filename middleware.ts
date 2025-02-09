// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define all valid paths explicitly
const EXACT_PATHS = new Set([
  '/',
  '/search',
  '/meals'
]);

// Define regex patterns for dynamic routes
const DYNAMIC_PATTERNS = [
  /^\/recipeinfo\/[^/]+$/  // Matches /recipeinfo/{id}
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow Next.js internal routes and static files
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if it's an exact match
  if (EXACT_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Check if it matches any dynamic pattern
  const matchesDynamicPattern = DYNAMIC_PATTERNS.some(pattern => 
    pattern.test(pathname)
  );

  if (matchesDynamicPattern) {
    return NextResponse.next();
  }

  // If no matches found, rewrite to the not-found page
  const url = request.nextUrl.clone();
  url.pathname = '/not-found';
  return NextResponse.rewrite(url);
}

// Configure matcher to run middleware on all routes except Next.js internals
export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    // Skip all files with extensions (.jpg, .png, etc)
    '/((?!_next/|api/|.*\\.[^/]*$).*)',
  ],
};