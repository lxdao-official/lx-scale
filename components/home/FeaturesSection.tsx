import {
  GithubIcon,
  Brain,
  Lock,
  LineChart,
  Users,
  HeartHandshake,
} from 'lucide-react';

import { getScopedI18n } from '@/locales/server';

export async function FeaturesSection() {
  const t = await getScopedI18n('component.home.features');
  return (
    <section className="py-24 bg-muted/20">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('why')}</h2>
          <p className="text-lg text-muted-foreground">{t('qualityTool')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <GithubIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{t('openSource')}</h3>
            <p className="text-muted-foreground">{t('openSourceDesc')}</p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('professionalScale')}
            </h3>
            <p className="text-muted-foreground">
              {t('professionalScaleDesc')}
            </p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('privacyProtection')}
            </h3>
            <p className="text-muted-foreground">
              {t('privacyProtectionDesc')}
            </p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('dataVisualization')}
            </h3>
            <p className="text-muted-foreground">
              {t('dataVisualizationDesc')}
            </p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('communityDriven')}
            </h3>
            <p className="text-muted-foreground">{t('communityDrivenDesc')}</p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('mentalHealthResources')}
            </h3>
            <p className="text-muted-foreground">
              {t('mentalHealthResourcesDesc')}
            </p>
          </div>
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">{t('buildEcosystem')}</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('openEcosystemDesc')}
          </p>
        </div>
      </div>
    </section>
  );
}
