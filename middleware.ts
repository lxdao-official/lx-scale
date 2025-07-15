import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
    locales: ["zh", 'en'],
    defaultLocale: "en",
    urlMappingStrategy: "rewrite"
});

export function middleware(request: NextRequest) {
    // Skip i18n processing for SEO-related files
    if (
        request.nextUrl.pathname === '/sitemap.xml' ||
        request.nextUrl.pathname === '/robots.txt'
    ) {
        return NextResponse.next();
    }

    // Create a special path prefix /share/ to bypass language routing
    if (request.nextUrl.pathname.startsWith('/share/')) {
        // Redirect request to actual static resource location
        const newPath = request.nextUrl.pathname.replace('/share', '');
        return NextResponse.rewrite(new URL(newPath, request.url));
    }

    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/share/:path*"],
};