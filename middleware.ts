import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow access to the maintenance page and assets
  const allowedPaths = [
    "/maintenance",
    "/favicon.ico",
    "/images",
    "/_next",
    "/public",
  ];
  const urlPath = request.nextUrl.pathname;

  const isAllowed = allowedPaths.some((path) => urlPath.startsWith(path));

  // Redirect all other requests to /maintenance
  if (!isAllowed) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
