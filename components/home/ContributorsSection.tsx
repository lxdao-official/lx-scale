import { Code, Lightbulb, Palette, Heart, Star, Github } from 'lucide-react';
import Image from 'next/image';

import { getScopedI18n, getCurrentLocale } from '@/locales/server';

enum Role {
  Developer,
  Designer,
  Psychologist,
  ContentEditor,
  TestEngineer,
}

interface Contributor {
  name: string;
  roleName: string;
  role: Role;
  avatarUrl: string;
  github?: string;
}

export async function ContributorsSection() {
  const t = await getScopedI18n('component.home.contributors');
  const locale = await getCurrentLocale();
  // 实际贡献者数据
  const contributors: Contributor[] = [
    {
      name: '0xhardman',
      roleName: t('developer'),
      role: Role.Developer,
      avatarUrl: 'https://avatars.githubusercontent.com/u/47655472',
      github: '0xhardman',
    },
    {
      name: 'ctyweb3',
      roleName: t('developer'),
      role: Role.Developer,
      avatarUrl: 'https://avatars.githubusercontent.com/u/173652098',
      github: 'ctyweb3',
    },
    {
      name: 'Neal',
      roleName: t('developer'),
      role: Role.Developer,
      avatarUrl: 'https://avatars.githubusercontent.com/u/13863422',
      github: 'snaildarter',
    }, {
      name: 'Keylen',
      roleName: t('developer'),
      role: Role.Developer,
      avatarUrl: 'https://avatars.githubusercontent.com/u/17230944',
      github: 'BiscuitCoder',
    }, {
      name: 'Sacultor',
      roleName: t('developer'),
      role: Role.Developer,
      avatarUrl: 'https://avatars.githubusercontent.com/u/190158638',
      github: 'Sacultor',
    },
  ];

  // 根据角色获取图标
  const getRoleIcon = (role: Role) => {
    switch (role) {
      case Role.Developer:
        return <Code className="h-4 w-4 text-primary" />;
        return <Code className="h-4 w-4 text-primary" />;
      case Role.Designer:
        return <Palette className="h-4 w-4 text-primary" />;
      case Role.Psychologist:
        return <Lightbulb className="h-4 w-4 text-primary" />;
      case Role.ContentEditor:
        return <Star className="h-4 w-4 text-primary" />;
      case Role.TestEngineer:
        return <Heart className="h-4 w-4 text-primary" />;
      default:
        return <Star className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <section className="py-24">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-background border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 relative">
                <Image
                  src={contributor.avatarUrl}
                  alt={`${contributor.name} avatar`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">{contributor.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                {getRoleIcon(contributor.role)}
                <span>{contributor.roleName}</span>
              </div>
              {contributor.github && (
                <a
                  href={`https://github.com/${contributor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  <Github className="h-3 w-3" />
                  <span>{contributor.github}</span>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 mb-16">
          <h3 className="text-xl font-semibold mb-6 text-center">
            {t('todoTitle')}
          </h3>
          <div className="bg-background border rounded-xl p-6 shadow-sm max-w-4xl mx-auto">
            {(() => {
              const todoItems =
                locale === 'zh'
                  ? [
                    'SEO 优化',
                    'Prompt 优化',
                  ]
                  : [
                    'SEO optimization',
                    'Prompt optimization',
                  ];

              return (
                <div className="space-y-6">
                  <ul className="space-y-3 list-none">
                    {todoItems.map((item, index) => (
                      <li
                        key={index}
                        className="border-l-4 border-primary/70 pl-4 py-1"
                      >
                        <p className="font-medium">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('callToAction', {
              githubRepo: (
                <a
                  href="https://github.com/lxdao-official/lx-scale"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  {t('github')}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
