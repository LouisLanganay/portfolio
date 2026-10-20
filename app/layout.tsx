import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Poppins } from "next/font/google";
import clsx from 'clsx';
import { TechBadgeProvider } from '@/contexts/TechBadgeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import SmartPopup from '@/components/SmartPopup';
import { MotionProvider } from '@/components/MotionProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.louisl.me'),
  title: 'Louis Langanay - Portfolio',
  description: "Louis Langanay, AI engineer and full-stack developer. I build AI agents, MCP servers and LLM features, and the web apps around them.",
  applicationName: 'Louis Langanay - Portfolio',
  authors: [{ name: 'Louis Langanay' }],
  keywords: ['portfolio', 'AI engineer', 'AI agents', 'MCP', 'Claude Code', 'LLM', 'full-stack developer', 'web', 'Epitech'],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/114762819?v=4',
  },
  appleWebApp: {
    title: 'Louis Langanay',
    capable: true,
  },
  openGraph: {
    type: 'website',
    title: 'Louis Langanay - Portfolio',
    description: "Louis Langanay, AI engineer and full-stack developer. I build AI agents, MCP servers and LLM features, and the web apps around them.",
    url: 'https://www.louisl.me',
    siteName: 'Louis Langanay - Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Louis Langanay - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Louis Langanay - Portfolio',
    description: "Louis Langanay, AI engineer and full-stack developer. I build AI agents, MCP servers and LLM features, and the web apps around them.",
    images: ['/og-image.png'],
  },
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          'font-poppins transition-colors duration-300',
          poppins.className
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' forcedTheme='dark'>
          <MotionProvider>
          <TechBadgeProvider>
            <div className='dark:bg-tertiary-600 bg-white h-fit min-h-screen flex flex-col relative'>
              <Header />
              <div className='flex flex-col flex-1 z-2 items-center'>
                <div className='max-w-4xl px-5 py-10 w-full'>
                  {children}
                  <SpeedInsights />
                </div>
                <Analytics />
              </div>
              <Footer />
            </div>
            <Suspense fallback={null}>
              <SmartPopup />
            </Suspense>
          </TechBadgeProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
