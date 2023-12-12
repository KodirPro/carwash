import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const {
    nextUrl: { origin, pathname, searchParams },
  } = req;
  const queryParams = new URLSearchParams(searchParams);
  const token = await getToken({ req });

  if (
    ["/", "/api/client", "/api/auth/signout", "/api/update-page"].includes(
      pathname,
    ) &&
    !token
  )
    return NextResponse.redirect(
      new URL(`/api/auth/signin?${queryParams}`, origin),
    );

  if (pathname.startsWith("/api/auth/signin") && token)
    return NextResponse.redirect(new URL(`/?${queryParams}`, origin));

  return NextResponse.next({ request: req });
}

export const config = { matcher: "/:path*" };
