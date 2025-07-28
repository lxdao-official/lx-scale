'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
// import { useCurrentLocale } from '@/locales/client';
import ToggleLang from './ToggleLang';
import { Suspense } from 'react';
import { useScopedI18n } from '@/locales/client';
import GitHubStarButton from './GitHubStarButton';

export function Navbar() {
  const pathname = usePathname();
  const t = useScopedI18n('component.navBar');

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg font-medium flex items-center gap-2"
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              LX
            </div>
            <span className='hidden md:block'>{t('title')}</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className={`${true ? 'font-medium' : 'text-muted-foreground'
              } hover:text-foreground transition-colors`}
          >
            {t('introduce')}
          </Link>
          <Link
            href="/questionnaire"
            className={`${pathname.startsWith('/questionnaire')
              ? 'font-medium'
              : 'text-muted-foreground'
              } hover:text-foreground transition-colors`}
          >
            {t('questionsList')}
          </Link>
          <GitHubStarButton
            user="lxdao-official"
            repo="lx-scale"
            size="normal"
            showCount={true}
          />


          <Suspense fallback={<div className="w-8 h-8" />}>
            <ToggleLang />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
