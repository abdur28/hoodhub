import React from "react";
import { redirect } from "next/navigation";
import { getDictionary } from '../dictionaries';
import Navbar from "@/components/Navbar";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { checkAdminAccess } from "@/lib/admin";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  // Check admin access
  const isAdmin = await checkAdminAccess();
  if (!isAdmin) {
    redirect(`/${lang}/`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Navbar */}
      <div className="relative z-40 bg-white shadow-sm">
        <Navbar variant="floating" lang={lang} dictionary={dictionary} />
      </div>

      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {dictionary.admin?.title || 'Admin Dashboard'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {dictionary.admin?.subtitle || 'Manage your business operations'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {children}
      </div>
    </div>
  );
}