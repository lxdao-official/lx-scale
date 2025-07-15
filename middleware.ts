import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
    locales: ["zh", 'en'],
    defaultLocale: "zh",
    urlMappingStrategy: "rewrite"
});

export function middleware(request: NextRequest) {
    // 跳过SEO相关文件的i18n处理
    if (
        request.nextUrl.pathname === '/sitemap.xml' ||
        request.nextUrl.pathname === '/robots.txt'
    ) {
        return NextResponse.next();
    }

    // 创建一个特殊路径前缀 /share/ 绕过语言路由
    if (request.nextUrl.pathname.startsWith('/share/')) {
        // 将请求重定向到实际的静态资源位置
        const newPath = request.nextUrl.pathname.replace('/share', '');
        return NextResponse.rewrite(new URL(newPath, request.url));
    }

    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/share/:path*"],
};