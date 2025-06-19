"use client";
import React from "react";
import { ShoppingBag, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface NavbarProps {
  variant?: "transparent" | "floating";
  className?: string;
}

const Navbar = ({ variant = "transparent", className = "" }: NavbarProps) => {
  const isTransparent = variant === "transparent";
  
  return (
    <nav className={`${isTransparent ? "bg-transparent" : "bg-white dark:bg-gray-900 shadow-lg"} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className={`${
                isTransparent 
                  ? "text-white" 
                  : "text-gray-900 dark:text-white"
              } font-franklin-condensed text-2xl md:text-3xl font-semibold tracking-tight hover:opacity-80 transition-opacity`}
            >
              HoodHub
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a
                href="/barbing"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Barbing
              </a>
              <a
                href="/tattoo"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Tattoo
              </a>
              <a
                href="/lifestyle"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Lifestyle
              </a>
            </div>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className={`${
                isTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              } transition-colors duration-200`}>
                <Link href="https://hoodskool.com">
                  <ShoppingBag className="h-5 w-5" />
                </Link>
              </button>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <button className={`${
                  isTransparent 
                    ? "text-white/80 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                } transition-colors duration-200`}
                >
                  <Link href="/sign-in">
                    <User className="h-5 w-5" />
                  </Link>
                </button>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button className={`${
              isTransparent 
                ? "text-white/80 hover:text-white" 
                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            } transition-colors duration-200`}>
              <Link href="https://hoodskool.com">
              <ShoppingBag className="h-5 w-5" />
              </Link>
            </button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <button className={`${
                isTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              } transition-colors duration-200`}>
                <Link href="/sign-in">
                  <User className="h-5 w-5" />
                </Link>
              </button>
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
              <SheetContent side="right" className="w-full sm:w-[380px] flex flex-col">
                {/* Hidden title for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Navigation */}
                <div className="flex-1 pt-10">
                  <nav className="space-y-1">
                    <a
                      href="/barbing"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Barbing
                    </a>
                    <a
                      href="/tattoo"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Tattoo
                    </a>
                    <a
                      href="/lifestyle"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Lifestyle
                    </a>
                    <a
                      href="https://hoodskool.com/"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      HoodSkool
                    </a>
                  </nav>
                  
                  <div className="mt-8 px-6">
                    <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  
                  <nav className="mt-8 space-y-1">
                    <a
                      href="/about"
                      className="block px-6 py-3 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="/contact"
                      className="block px-6 py-3 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Contact
                    </a>
                    <a
                      href="/careers"
                      className="block px-6 py-3 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Careers
                    </a>
                  </nav>
                </div>
                
                {/* CTA */}
                <div className="p-6">
                  <button className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300">
                    Book Appointment
                  </button>
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