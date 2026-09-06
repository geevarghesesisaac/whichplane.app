import type { Metadata } from 'next';
import { B612, Space_Mono } from 'next/font/google';
import { CurrencyProvider } from '@/lib/currency';
import './globals.css';

const b612 = B612({
  variable: '--font-b612',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'WhichPlane — AV-OPS Flight Search & Aircraft Equipment Discovery',
  description:
    'Search flights prioritizing aircraft equipment, composite cabin comfort (A350/787), fuselage geometry, and technical fleet intelligence.',
  keywords: [
    'flight search',
    'aircraft type',
    'airbus a380',
    'boeing 747',
    'boeing 787 dreamliner',
    'airbus a350-1000',
    'exclude 737 max',
    'avgeek',
    'cabin altitude',
    'whichplane'
  ],
  authors: [{ name: 'Creddio Platforms' }],
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    title: 'Whichplane',
  },
  openGraph: {
    title: 'WhichPlane — Flight Search by Aircraft Type & Cabin Comfort',
    description:
      'Search flights prioritizing aircraft equipment, composite cabin comfort (787/A350), and equipment confidence.',
    url: 'https://whichplane.app',
    siteName: 'WhichPlane',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${b612.variable} ${spaceMono.variable} h-full antialiased light`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Whichplane" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f9ff] text-[#0b1c30] font-sans">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}
