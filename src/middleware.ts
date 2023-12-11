import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const {
    nextUrl: { origin, pathname, searchParams },
  } = request;
  const queryParams = new URLSearchParams(searchParams);
  const token = await getToken({ req: request });
  console.log(token);
  

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

  return NextResponse.next({ request });
}

export const config = { matcher: "/:path*" };
