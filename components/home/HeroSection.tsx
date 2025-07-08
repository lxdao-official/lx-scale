import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Shield } from 'lucide-react';
import { getScopedI18n } from '@/locales/server';

export async function HeroSection() {
  const t = await getScopedI18n('component.home.hero');
  return (
    <section className="min-h-[calc(100vh-4rem)] py-16 flex items-center">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {t('title')}
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              {t('sectionTitle')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('selfAssessmentTool')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/questionnaire">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg gap-2 w-full sm:w-auto"
                  asChild
                >
                  <span>
                    {t('startTest')} <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </Link>
              <Link
                href="https://github.com/lxdao-official/lx-scale"
                target="_blank"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg w-full sm:w-auto"
                >
                  {t('viewSourceCode')}
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">{t('completelyFree')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm">{t('localProcessing')}</span>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="https://www.producthunt.com/products/lxscale?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-lxscale" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=989739&theme=light&t=1751949702359" 
                  alt="LXScale - Professional psychological scale testing platform | Product Hunt" 
                  style={{ width: '250px', height: '54px' }} 
                  width="250" 
                  height="54" 
                />
              </a>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="bg-muted/50 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              {t('projectPurpose')}
            </h2>
            <div className="prose text-sm space-y-4">
              <p>{t('paidServices')}</p>
              <p>{t('economicBurden')}</p>
              <p>{t('breakBarrier')}</p>
              <p>{t('lxSpirit')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-muted-foreground border-t pt-8">
          <p className="mb-2">{t('collectionTools')}</p>
          <p className="mb-2 font-medium">{t('resultReference')}</p>
          <p>{t('noDataCollection')}</p>
        </div>
      </div>
    </section>
  );
}
