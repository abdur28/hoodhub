import React from "react";
import Navbar from "@/components/Navbar";
import { getDictionary } from '../dictionaries';

export default async function AuthLayout({
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
      {/* Navbar */}
      <div className="relative z-40">
        <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
      </div>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Gradient Background */}
        <div 
          className="absolute top-1/4 left-1/4 w-[200%] h-[200%]"
          style={{
            background: `radial-gradient(circle, rgba(180,83,9,0.08) 0%, rgba(0,0,0,0) 70%)`
          }}
        />
        
        <div 
          className="absolute top-3/4 left-3/4 w-[150%] h-[150%]"
          style={{
            background: `radial-gradient(circle, rgba(120,53,15,0.06) 0%, rgba(0,0,0,0) 70%)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="w-max">
          {/* Auth Component Container */}
          <div className="bg-white rounded-2xl mb-20 shadow-2xl overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}