import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import { RainbowProvider } from "@/components/context/rainbow-kit";
import { Navbar } from '@/components/Navbar';
import { I18nProviderClient } from '@/locales/client';
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LXScale - 免费心理健康测评工具 | 专业心理量表测试平台',
  description: '提供免费、专业的心理健康测评服务。包含抑郁量表(PHQ-9、BDI-II、SDS)、焦虑量表(GAD-7、DASS-21)、强迫症量表(Y-BOCS)、睡眠量表(ISI)、压力量表(PSS-10)、心理症状量表(SCL-90)等多种国际标准心理测评工具。',
  keywords: [
    '心理测评', '心理量表', '抑郁测试', '焦虑测试', '心理健康', '免费测评',
    'PHQ-9', 'BDI-II', 'SDS', 'GAD-7', 'DASS-21', 'Y-BOCS', 'SCL-90', 'ISI', 'PSS-10',
    '抑郁自评量表', '焦虑自评量表', '强迫症量表', '睡眠质量', '压力测试',
    '心理筛查', '心理评估', '心理诊断', '心理健康检测', '心理状态评估',
    'mental health', 'depression scale', 'anxiety scale', 'psychological assessment',
    'free mental health test', 'online psychological evaluation'
  ].join(', '),
  authors: [{ name: 'LXScale Team' }],
  creator: 'LXScale',
  publisher: 'LXScale',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lxscale.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'LXScale - 免费心理健康测评工具',
    description: '专业的心理健康测评平台，提供抑郁、焦虑、强迫症等多种免费心理量表测试',
    url: 'https://lxscale.xyz',
    siteName: 'LXScale',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LXScale 心理健康测评平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LXScale - 免费心理健康测评工具',
    description: '专业的心理健康测评平台，提供多种免费心理量表测试',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LXScale',
    description: '免费专业的心理健康测评平台',
    url: 'https://lxscale.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lxscale.xyz/questionnaire?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LXScale',
      url: 'https://lxscale.xyz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lxscale.xyz/logo.png'
      }
    },
    sameAs: [
      'https://github.com/lxdao-official/lx-scale'
    ]
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-16Q8VG96ZV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-16Q8VG96ZV');
            `,
          }}
        />
        <meta name="apple-mobile-web-app-title" content="LXScale" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <RainbowProvider> */}
        <I18nProviderClient locale={locale}>
          <Navbar />
          <main>{children}</main>
        </I18nProviderClient>
        {/* </RainbowProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
