import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import Header from '@/components/header';
import { ThemeProvider } from '@/contexts/theme-context';
// import { PageTransition } from '@/components/animations/page-transition';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.className} dark`}
    >
      <body className="min-h-[100dvh] bg-background text-foreground antialiased">
        <ThemeProvider>
          <SWRConfig
            value={{
              fallback: {
                // We do NOT await here
                // Only components that read this data will suspend
                '/api/user': getUser()
              }
            }}
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="page-transition">
                {children}
              </div>
            </div>
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
