import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
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
  title: 'LXScale - Free Mental Health Assessment Tools | Professional Psychological Scales',
  description: 'Free professional mental health assessment platform. Includes depression scales (PHQ-9, BDI-II, SDS), anxiety scales (GAD-7, DASS-21), OCD scale (Y-BOCS), sleep scale (ISI), stress scale (PSS-10), and psychological symptom scale (SCL-90).',
  keywords: [
    'mental health', 'depression scale', 'anxiety scale', 'psychological assessment',
    'free mental health test', 'online psychological evaluation',
    'PHQ-9', 'BDI-II', 'SDS', 'GAD-7', 'DASS-21', 'Y-BOCS', 'SCL-90', 'ISI', 'PSS-10',
    'depression screening', 'anxiety screening', 'OCD assessment', 'sleep quality', 'stress test',
    'psychological screening', 'mental health evaluation', 'psychological diagnosis',
    '心理测评', '心理量表', '抑郁测试', '焦虑测试', '心理健康', '免费测评'
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
      'zh': '/zh',
      'en-US': '/',
      'en': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'LXScale - Free Mental Health Assessment Tools 🧠',
    description: '🔬 Professional psychological assessment platform with AI analysis. Free depression, anxiety, OCD, and stress tests. Get instant results and professional insights.',
    url: 'https://lxscale.xyz',
    siteName: 'LXScale',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/apple-icon.png',
        width: 180,
        height: 180,
        alt: 'LXScale - Free Mental Health Assessment Platform with AI Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LXDAO_Official',
    creator: '@0xhardman', 
    title: 'LXScale - Free Mental Health Assessment Tools 🧠',
    description: '🔬 Professional psychological scales | 🤖 AI analysis | 📊 Instant results | 🆓 Completely free - Start your mental health assessment now!',
    images: {
      url: '/apple-icon.png',
      alt: 'LXScale - Free Mental Health Assessment Platform with AI Analysis',
    },
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

  // Structured data
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
        <meta name="apple-mobile-web-app-title" content="LXScale" />
        <meta name="baidu-site-verification" content="codeva-hMa3lbSIwc" />
        
        {/* Additional social media optimization */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta name="twitter:domain" content="lxscale.xyz" />
        <meta name="twitter:url" content="https://lxscale.xyz" />
        
        {/* Baidu optimization: point to Chinese version as main page */}
        <link rel="alternate" hrefLang="zh-CN" href="https://lxscale.xyz/zh" />
        <link rel="alternate" hrefLang="zh" href="https://lxscale.xyz/zh" />
        <link rel="alternate" hrefLang="en" href="https://lxscale.xyz" />
        <link rel="alternate" hrefLang="x-default" href="https://lxscale.xyz" />
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
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-16Q8VG96ZV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-16Q8VG96ZV');
          `}
        </Script>
      </body>
    </html>
  );
}
