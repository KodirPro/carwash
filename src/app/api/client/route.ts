import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;
  const queryParams = new URLSearchParams(searchParams);
  const link = queryParams.get("link") || "";
  queryParams.delete("link");

  const res = await fetch(new URL(`?${queryParams}`, link), {
    cache: "no-cache",
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } else return NextResponse.json({}, { status: res.status });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { link, ...body } = data;

  const res = await fetch(data.link, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-cache",
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } else return NextResponse.json({}, { status: res.status });
}
