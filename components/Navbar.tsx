"use client";
import React, { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, Calendar, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface NavbarProps {
  variant?: "transparent" | "floating";
  className?: string;
  lang: string;
  dictionary: Dictionary;
}

const Navbar = ({ variant = "transparent", className = "", lang, dictionary }: NavbarProps) => {
  const isTransparent = variant === "transparent";
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const response = await fetch('/api/admin/check');
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);
  
  return (
    <nav className={`${isTransparent ? "bg-transparent" : "bg-white shadow-lg"} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href={`/${lang}`}
              className="flex items-center h-max w-28 md:w-40 bg-white p-3 rounded-4xl hover:opacity-90 transition-opacity duration-200"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link
                href={`https://hoodskool.com/`}
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                {dictionary.nav.clothing}
              </Link>
              <Link
                href={`/${lang}/barbing`}
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                {dictionary.nav.barbing}
              </Link>
              <Link
                href={`/${lang}/tattoo`}
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                {dictionary.nav.tattoo}
              </Link>
              <Link
                href={`/${lang}/braids-locs`}
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                {dictionary.nav.braidslocks}
              </Link>
              
              {/* About with Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <span
                      className={`${
                        isTransparent 
                          ? "text-white/90 hover:text-white" 
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      } font-franklin text-sm font-medium transition-colors duration-200`}
                    >
                      {dictionary.nav.about}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link 
                      href={`/${lang}/our-story`}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {dictionary.nav.ourStory}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href={`/${lang}/our-team`}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {dictionary.nav.ourTeam}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href={`/${lang}/faq`}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {dictionary.nav.faq}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href={`/${lang}/contact`}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {dictionary.nav.contact}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Icons and Language Switcher */}
            <div className="flex items-center space-x-4">
              {/* Admin Link */}
              {isAdmin && (
                <Link 
                  href={`/${lang}/admin`}
                  className={`${
                    isTransparent 
                      ? "text-white/80 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  } transition-colors duration-200`}
                  title={dictionary.nav.admin || "Admin"}
                >
                  {dictionary.nav.admin || "Admin"}
                </Link>
              )}

              <SignedIn>
                <Link 
                  href={`/${lang}/bookings`}
                  className={`${
                    isTransparent 
                      ? "text-white/80 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  } transition-colors duration-200`}
                >
                  <Calendar className="h-5 w-5" />
                </Link>
              </SignedIn>

              {/* Language Switcher */}
              <LanguageSwitcher currentLang={lang} isTransparent={isTransparent} />
              
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link 
                  href={`/${lang}/sign-in`}
                  className={`${
                    isTransparent 
                      ? "text-white/80 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  } transition-colors duration-200`}
                >
                  <User className="h-5 w-5" />
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} isTransparent={isTransparent} />
            
            <Link 
              href="https://hoodskool.com"
              className={`${
                isTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              } transition-colors duration-200`}
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link 
                href={`/${lang}/sign-in`}
                className={`${
                  isTransparent 
                    ? "text-white/80 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                } transition-colors duration-200`}
              >
                <User className="h-5 w-5" />
              </Link>
            </SignedOut>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className={`${
                  isTransparent 
                    ? "text-white/80 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                } transition-colors duration-200`}>
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                <div className="flex-1 pt-10">
                  <nav className="space-y-1">
                    {/* Admin Link for Mobile */}
                    {isAdmin && (
                      <Link
                        href={`/${lang}/admin`}
                        className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{dictionary.nav.admin || "Admin Dashboard"}</span>
                        </div>
                      </Link>
                    )}
                    <SignedIn>
                      <Link
                        href={`/${lang}/bookings`}
                        className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {dictionary.nav.myBookings}
                      </Link>
                    </SignedIn>
                    <Link
                      href={`/${lang}/barbing`}
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {dictionary.nav.barbing}
                    </Link>
                    <Link
                      href={`/${lang}/tattoo`}
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {dictionary.nav.tattoo}
                    </Link>
                    <Link
                      href={`/${lang}/lifestyle`}
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {dictionary.nav.lifestyle}
                    </Link>
                    <Link
                      href={`/${lang}/braids-locs`}
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {dictionary.nav.braidslocks}
                    </Link>
                    <Link
                      href="https://hoodskool.com/"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {dictionary.nav.clothing}
                    </Link>
                  </nav>
                  
                  <div className="mt-8 px-6">
                    <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  
                  <nav className="mt-8 space-y-1">
                    <div className="px-6 py-2 font-franklin font-medium text-gray-900 dark:text-white">
                      {dictionary.nav.about}
                    </div>
                    <Link
                      href={`/${lang}/our-story`}
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {dictionary.nav.ourStory}
                    </Link>
                    <Link
                      href={`/${lang}/our-team`}
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {dictionary.nav.ourTeam}
                    </Link>
                    <Link
                      href={`/${lang}/faq`}
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {dictionary.nav.faq}
                    </Link>
                    <Link
                      href={`/${lang}/contact`}
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {dictionary.nav.contact}
                    </Link>
                  </nav>
                </div>
                
                <div className="p-6">
                  <Link href={`/${lang}/book`}>
                    <button className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300">
                      {dictionary.nav.bookAppointment}
                    </button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;