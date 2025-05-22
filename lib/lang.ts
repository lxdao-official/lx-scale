export type LangObj = 'zh' | 'en';

export function getLang(language?: string): LangObj {
    let lang: LangObj = 'en';
    if (language && ['zh', 'en'].includes(language)) {
        lang = language as 'zh' | 'en';
    }

    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname || "";
        lang = pathname.startsWith('/zh') ? 'zh' : 'en';
    }
    return lang;
}

export default function getT(language?: string) {
    const lang = getLang(language);
    return (langObj: { en: string; zh: string }) => langObj[lang];
}

export function getHref(language?: string) {
    const lang = getLang(language);
    return (href: string) => lang === 'en' ? href : `/${lang}${href}`;
}
