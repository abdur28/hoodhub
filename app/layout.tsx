import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/sections/Footer";

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
      path: "./fonts/FranklinGothic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FranklinGothicITALIC.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/FranklinGothicCondensed.ttf",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${franklinGothic.variable} font-franklin antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}