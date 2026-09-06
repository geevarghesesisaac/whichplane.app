import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WhichPlane — Fly The Plane You Actually Want To Fly',
  description:
    'Aircraft-first flight search and discovery. Filter by composite widebodies (A350/787), exclude 737 MAX, chase the remaining A380 and 747 routes, and verify equipment confidence.',
  keywords: [
    'flight search',
    'aircraft type',
    'airbus a380',
    'boeing 747',
    'boeing 787 dreamliner',
    'airbus a350',
    'exclude 737 max',
    'avgeek',
    'airline fleet',
    'cabin altitude',
    'whichplane'
  ],
  authors: [{ name: 'Creddio' }],
  openGraph: {
    title: 'WhichPlane — Flight Search by Aircraft Type & Cabin Comfort',
    description:
      'Search flights prioritizing aircraft type, composite cabin comfort (787/A350), and equipment confidence.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
