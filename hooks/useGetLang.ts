import { useCurrentLocale } from '@/locales/client';

// Get current language hook - using next-international language detection
export default function useGetLang(): string {
  return useCurrentLocale();
}

// Multi-language text processing hook
export function useT() {
  const lang = useGetLang();
  // Since lang is string type, cannot directly access langObj as index, type assertion processing here
  return (langObj: { en: string; zh: string }) => {
    const safeLang: "en" | "zh" = lang === "zh" ? "zh" : "en";
    return langObj[safeLang];
  };
}

export function useHref() {
  const lang = useGetLang();

  return (href: string) => {
    return lang === 'en' ? href : `/${lang}${href}`;
  };
}
