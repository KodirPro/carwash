import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    revalidatePath("/", "layout");

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error: any) {
    console.log("===> Page not updated");
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
