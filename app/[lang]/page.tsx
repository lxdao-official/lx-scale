import Link from 'next/link';
// import Image from "next/image";
import { Button } from '@/components/ui/button';
import getT, { getHref } from '@/lib/lang';

/**
 * 主页组件，根据传入的语言参数渲染页面。
 * @param params - 包含语言参数的对象。
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: paramLang } = await params;

  const T = getT(paramLang);
  const href = getHref(paramLang);

  return (
    <div className="flex flex-col min-h-screen">
      <Button className="cursor-pointer">
        <Link href={href('/questionnaire')}>
          {T({ en: 'Learn More', zh: '了解详情' })} 
        </Link>
      </Button>
    </div>
  );
}
