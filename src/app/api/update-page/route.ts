import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("secret") !== "123")
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });

  try {
    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Page Updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
