import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let res: any;
  const data = await req.json();
  const { link = "http://.", method, ...body } = data;
  const cache = "no-cache";
  const token = await getToken({ req });
  const Authorization =
    "Basic " + Buffer.from(`${token?.name}:${token?.sub}`).toString("base64");

  if (method === "POST") {
    res = await fetch(link, {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      body: JSON.stringify(body),
      method,
      cache,
    });
  } else {
    res = await fetch(new URL(`?${new URLSearchParams(body)}`, link), {
      headers: { Authorization },
      cache,
    });
  }

  if (res) {
    // return new NextResponse(res);
    if (res.ok) {
      try {
        const data = await res.json();

        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        return NextResponse.next({ request: req });
      }
    } else return NextResponse.json({}, { status: res.status });
  } else NextResponse.json({ message: "SERVER ERROR" }, { status: 500 });
}
