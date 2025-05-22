import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
    locales: ["zh", 'en'],
    defaultLocale: "zh",
    // urlMappingStrategy: "rewrite"  // 添加这一行，确保URL重写策略
});

export function middleware(request: NextRequest) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};