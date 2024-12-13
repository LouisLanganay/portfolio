import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Footer, Header } from '@/components';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Poppins } from '@next/font/google';
import clsx from 'clsx';
import { TechBadgeProvider } from '@/contexts/TechBadgeContext';

export const metadata: Metadata = {
  title: 'Louis Langanay - Portfolio',
  description: "Louis Langanay's portfolio, a student in computer science, passionate about web development.",
  applicationName: 'Louis Langanay - Portfolio',
  authors: [{ name: 'Louis Langanay' }],
  keywords: ['portfolio', 'projects', 'dev', 'developer', 'web', 'student'],
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
    description: "Louis Langanay's portfolio, a student in computer science, passionate about web development.",
    url: 'https://portfolio-brown-phi-30.vercel.app/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Louis Langanay - Portfolio',
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
        <ThemeProvider attribute='class'>
          <TechBadgeProvider>
            <div className='dark:bg-tertiary-600 bg-white h-fit min-h-screen flex flex-col relative'>
              <Header />
              <div className='flex flex-col flex-1 z-[2] items-center'>
                <div className='max-w-4xl px-5 py-10 w-full'>
                  {children}
                  <SpeedInsights />
                </div>
                <Analytics />
              </div>
              <Footer />
            </div>
          </TechBadgeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
