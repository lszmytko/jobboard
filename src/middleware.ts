import { NextRequest, NextResponse } from "next/server";

import { verifyJwtToken } from "./app/api/utils";

const adminRoutes = [
  "/api/editoffer",
  "/api/editworkeroffer",
  "/api/deleteoffer",
  "/api/deleteworkeroffer",
  "/api/handleofferactivation",
  "/api/handleworkerofferactivation",
];

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("jwtToken")?.value;

  const isAuthenticated = await verifyJwtToken(token ?? "");

  if (!isAuthenticated) {
    if (adminRoutes.includes(req.nextUrl.pathname)) {
      console.log("jestesmy tutaj 1", req.nextUrl.pathname);
      return Response.json(
        { success: false, message: "authentication failed" },
        { status: 401 }
      );
    }
    console.log("jestesmy tutaj", req.nextUrl.pathname);

    if (req.nextUrl.pathname.startsWith("/adminpanel")) {
      const url = req.nextUrl.clone();
      url.pathname = "/adminlogin";
      url.searchParams.delete("page");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminpanel/:path*", ...adminRoutes],
};
