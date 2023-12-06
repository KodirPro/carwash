import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const {
    nextUrl: { origin, pathname, searchParams },
  } = request;
  const queryParams = new URLSearchParams(searchParams);
  // AUTH
  console.log(request);
  if (pathname.startsWith("/api/auth/signin")) {
    if (pathname.startsWith("/sign-out"))
      return NextResponse.redirect(new URL(`?${queryParams}`, origin));
  }
  return NextResponse.next({ request });
}

export const config = { matcher: "/" };
