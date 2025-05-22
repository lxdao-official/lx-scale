'use client';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Button } from './ui/button';

export default function ChangeLocaleButton() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const locale = useCurrentLocale();
  const handleChangeLocale = () => {
    if (locale === 'zh') {
      changeLocale('en');
    } else {
      changeLocale('zh');
    }
  };

  return (
    <Button onClick={handleChangeLocale}>
      {locale === 'zh' ? 'EN' : '中文'}
    </Button>
  );
}
