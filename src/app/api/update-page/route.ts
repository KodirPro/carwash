import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    revalidateTag("data");

    return NextResponse.redirect(process.env.NEXTAUTH_URL || "");
  } catch (error: any) {
    console.log("===> Page not updated");

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
