"use client";
import React from "react";
import { ShoppingBag, User, Menu, Calendar } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
            <Link 
              href="/" 
              className={`${
                isTransparent 
                  ? "text-white" 
                  : "text-gray-900 dark:text-white"
              } font-franklin-condensed text-2xl md:text-3xl font-semibold tracking-tight hover:opacity-80 transition-opacity`}
            >
              HoodHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link
                href="/barbing"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Barbing
              </Link>
              <Link
                href="/tattoo"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Tattoo
              </Link>
              <Link
                href="/lifestyle"
                className={`${
                  isTransparent 
                    ? "text-white/90 hover:text-white" 
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } font-franklin text-sm font-medium transition-colors duration-200`}
              >
                Lifestyle
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
                      About
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/our-story" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Our Story
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/our-team" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Our Team
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/faq" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/contact" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
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
                <Link 
                  href="/bookings"
                  className={`${
                    isTransparent 
                      ? "text-white/80 hover:text-white" 
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  } transition-colors duration-200`}
                >
                  <Calendar className="h-5 w-5" />
                </Link>
              </SignedIn>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link 
                  href="/sign-in"
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
                href="/sign-in"
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
                    <SignedIn>
                      <Link
                        href="/bookings"
                        className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        My Bookings
                      </Link>
                    </SignedIn>
                    <Link
                      href="/barbing"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Barbing
                    </Link>
                    <Link
                      href="/tattoo"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Tattoo
                    </Link>
                    <Link
                      href="/lifestyle"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Lifestyle
                    </Link>
                    <Link
                      href="https://hoodskool.com/"
                      className="block px-6 py-4 font-franklin text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      HoodSkool
                    </Link>
                  </nav>
                  
                  <div className="mt-8 px-6">
                    <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  
                  <nav className="mt-8 space-y-1">
                    <div className="px-6 py-2 font-franklin font-medium text-gray-900 dark:text-white">
                      About
                    </div>
                    <Link
                      href="/our-story"
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/our-team"
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Our Team
                    </Link>
                    <Link
                      href="/faq"
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-8 py-2 font-franklin text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
                
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