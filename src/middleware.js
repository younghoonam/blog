import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only redirect from `/`
  if (pathname !== "/") return NextResponse.next();

  // Get Accept-Language header
  const acceptLanguage = req.headers.get("accept-language") || "";
  const preferredLang = acceptLanguage.split(",")[0].split("-")[0]; // Extract first language

  // Determine target locale
  const locale = preferredLang === "ko" ? "ko" : "en";

  // Redirect to the localized route
  const url = new URL(`/${locale}`, req.nextUrl.origin);
  return NextResponse.redirect(url);
}

// Apply middleware only for "/"
export const config = {
  matcher: "/",
};
