'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import  {useT, useHref} from '@/hooks/useGetLang';

export function Navbar() {
  const [langText, setLangText] = useState<string>();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 根据路径直接判断语言状态
  useEffect(() => {
    setLangText(pathname?.startsWith('/zh') ? 'EN': '中文');
  }, [pathname]);

  const T = useT();
  const href = useHref();

  /** 切换语言处理函数 */
  const toggleLang = () => {
    const newPath = langText === 'EN' 
      ? pathname?.replace(/^\/zh/, '') || '/' 
      : `/zh${pathname}`;
    replace(newPath);
  };

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-14 px-4 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href={href('/')}
            className="text-lg font-medium flex items-center gap-2"
          >
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              LX
            </div>
            <span> {T({en: 'LXScale', zh: 'LX 量表'})}</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href={ href("/intro") }
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {T({en: 'Introduction', zh: '介绍'})}
          </Link>
          <Link href={href("/questionnaire")} className="font-medium">
            {T({en: 'Questionnaires', zh: '问答列表'})}
          </Link>
          <Link
            href="https://github.com/lxdao-official/lx-checker"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {T({en: 'Repository', zh: '开源仓库'})}
          </Link>

          <Link
            href="javaScript:void(0)"
            color="inherit"
            className=""
            style={{ cursor: 'pointer' }}
            onClick={toggleLang}
          >
            {langText}
          </Link>
        </nav>
      </div>
    </header>
  );
}
