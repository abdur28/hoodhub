import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Footer from "@/components/sections/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import WhatsappPopUp from "@/components/WhatsappPopUp";
import { getDictionary } from './dictionaries';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const franklinGothic = localFont({
  src: [
    {
      path: "../fonts/FranklinGothic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/FranklinGothicITALIC.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/FranklinGothicCondensed.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-franklin-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HoodHub - Premium Fashion & Lifestyle Services",
  description: "Experience luxury barbering, tattoo artistry, and premium lifestyle services at HoodHub",
  keywords: "premium barbering, tattoo artistry, lifestyle services, HoodHub",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return (
    <ClerkProvider>
      <html lang={lang}>
        <head>
          <meta name="apple-mobile-web-app-title" content="Hoodhub" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${franklinGothic.variable} font-franklin antialiased`}
        >
          {children}
          <WhatsappPopUp />
          <Footer lang={lang} dictionary={dictionary} />
        </body>
      </html>
    </ClerkProvider>
  );
}