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
  title: 'LXScale - 心理测评工具',
  description: '提供各类心理测评量表',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang="en">
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
