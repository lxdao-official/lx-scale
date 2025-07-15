import { useCurrentLocale } from '@/locales/client';

// 获取当前语言hook - 使用 next-international 的语言检测
export default function useGetLang(): string {
  return useCurrentLocale();
}

// 多语言文本处理hook
export function useT() {
  const lang = useGetLang();
  // 由于 lang 是 string 类型，不能直接作为索引访问 langObj，这里做类型断言处理
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
