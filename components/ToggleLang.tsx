'use client';
import { useEffect, useState } from 'react';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Check, Globe } from 'lucide-react';

export default function ChangeLocaleButton() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const locale = useCurrentLocale();
  const [textIndex, setTextIndex] = useState(0);

  const expectationTexts = [
    'Help us translate',
    '参与翻译贡献',
    'Ayuda a traducir',
    'Aidez à traduire',
    '翻訳にご協力を',
    '번역에 참여하세요'
  ];

  useEffect(() => {
    // Animation for text cycling
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % expectationTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [expectationTexts.length]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span className='hidden md:block'>{locale === 'zh' ? '中文' : 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel>选择语言 / Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => changeLocale('en')}
          className="flex items-center justify-between"
        >
          English
          {locale === 'en' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLocale('zh')}
          className="flex items-center justify-between"
        >
          中文 (Chinese)
          {locale === 'zh' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <a
          href="https://github.com/lxdao-official/lx-scale/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-2 text-sm text-primary hover:text-primary/80 flex items-center justify-center gap-1.5 group transition-colors"
        >
          <span className="animate-pulse">
            {expectationTexts[textIndex]}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70 group-hover:translate-x-0.5 transition-transform"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
