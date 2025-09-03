import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'BalanceAI - Test',
  description: 'Simple test layout'
};

const manrope = Manrope({ subsets: ['latin'] });

export default function SimpleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <div style={{ padding: '20px' }}>
          <h1>BalanceAI - Simple Mode</h1>
          {children}
        </div>
      </body>
    </html>
  );
}