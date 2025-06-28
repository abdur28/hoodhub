import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { getDictionary } from '../dictionaries';

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Simple Hero */}
      <section className="relative h-[25vh] w-full overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Transparent Navbar */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
        </div>
      </section>

      {/* Content */}
      <section className="relative rounded-t-4xl bg-white -mt-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          {children}
        </div>
      </section>
    </div>
  );
}