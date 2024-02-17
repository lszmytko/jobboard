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

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://jobboard-hazel.vercel.app",
        "https://www.jobboard-hazel.vercel.app",
        "https://vetpraca.vettech.pl",
        "https://www.vetpraca.vettech.pl",
      ]
    : ["http://localhost:3000"];

export async function middleware(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin") ?? "";

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: { "Content-Type": "text/plain" },
    });
  }

  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  const token = req.cookies.get("jwtToken")?.value;

  console.log("token", token);

  const isAuthenticated = await verifyJwtToken(token ?? "");

  if (!isAuthenticated) {
    if (adminRoutes.includes(req.nextUrl.pathname)) {
      return Response.json(
        { success: false, message: "authentication failed" },
        { status: 401 }
      );
    }

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
  matcher: [
    "/adminpanel/:path*",
    "/api/:path*",
    "/api/editoffer",
    "/api/editworkeroffer",
    "/api/deleteoffer",
    "/api/deleteworkeroffer",
    "/api/handleofferactivation",
    "/api/handleworkerofferactivation",
  ],
};
