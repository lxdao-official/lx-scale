import { Button } from '@/components/ui/button';
import { ExternalLink, Wallet, Github, Heart, Mail } from 'lucide-react';
import { getScopedI18n } from '@/locales/server';

export async function SupportSection() {
  const t = await getScopedI18n('component.home.support');
  return (
    <section className="py-24 bg-muted/20 rounded-t-3xl">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('sectionTitle')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('sectionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-background border rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center lg:items-start">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              {t('developmentTitle')}
            </h3>
            <p className="text-muted-foreground mb-6 text-center lg:text-left">
              {t('developmentDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>{t('donateButton')}</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{t('contactButton')}</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 bg-primary/5 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">LX</div>
                <div className="text-sm text-muted-foreground">
                  {t('projectName')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Github className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('openSourceTitle')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('openSourceDescription')}
            </p>
            <a
              href="https://github.com/lxdao-official/lx-scale"
              target="_blank"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              <span>{t('visitGithub')}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('shareTitle')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('shareDescription')}
            </p>
            <Button variant="ghost" size="sm" className="text-primary">
              {t('shareButton')}
            </Button>
          </div>

          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('feedbackTitle')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('feedbackDescription')}
            </p>
            <Button variant="ghost" size="sm" className="text-primary">
              {t('feedbackButton')}
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>{t('nonProfitNotice')}</p>
        </div>
      </div>
    </section>
  );
}
