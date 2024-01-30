import { NextRequest, NextResponse } from "next/server";
import { auth, verifyJwtToken } from "./utils";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("jwtToken")?.value;

  const isAuthenticated = await verifyJwtToken(token ?? "");

  if (!isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/adminlogin";
    url.searchParams.delete("page");
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: "/adminpanel/:path*",
};
