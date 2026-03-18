import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import StoreProvider from '@/components/providers/StoreProvider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default:  'API Insight — API Failure Monitoring & Root Cause Analysis',
    template: '%s · API Insight',
  },
  description: 'Catch API failures instantly, identify root causes with AI, and fix them before users notice. Free forever for small projects.',
  keywords:    ['API monitoring', 'error tracking', 'root cause analysis', 'Express middleware', 'API health'],
  authors:     [{ name: 'API Insight' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}>
        <StoreProvider>
          {children}
          <Toaster richColors position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
