// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar", "zh", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always show the locale in the URL
  localePrefix: "always",

  // Detect user's preferred locale from Accept-Language header
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames, exclude API routes, static files, and Next.js internals
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _static (inside /public)
    // - all root files inside /public (e.g. favicon.ico)
    // - FIGMA-DESIGN folder
    // - dashboard (we'll handle this with redirects)
    "/((?!api|_next|_static|FIGMA-DESIGN|dashboard|.*\\..*|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
