"use client";
import React from "react";
import { ShoppingCart, User, Menu, Scissors, PaintBucket, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className={`${
                isTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              } transition-colors duration-200`}>
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button className={`${
              isTransparent 
                ? "text-white/80 hover:text-white" 
                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            } transition-colors duration-200`}>
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className={`${
              isTransparent 
                ? "text-white/80 hover:text-white" 
                : "text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            } transition-colors duration-200`}>
              <User className="h-5 w-5" />
            </button>
            
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
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-franklin-condensed text-xl text-left">
                    HoodHub Services
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  <a
                    href="/barbing"
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <Scissors className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-franklin font-semibold text-gray-900 dark:text-white">
                        Barbing
                      </h3>
                      <p className="font-franklin text-sm text-gray-600 dark:text-gray-400">
                        Professional cuts & styling
                      </p>
                    </div>
                  </a>
                  
                  <a
                    href="/tattoo"
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <PaintBucket className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-franklin font-semibold text-gray-900 dark:text-white">
                        Tattoo
                      </h3>
                      <p className="font-franklin text-sm text-gray-600 dark:text-gray-400">
                        Custom tattoo artistry
                      </p>
                    </div>
                  </a>
                  
                  <a
                    href="/lifestyle"
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <Star className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-franklin font-semibold text-gray-900 dark:text-white">
                        Lifestyle
                      </h3>
                      <p className="font-franklin text-sm text-gray-600 dark:text-gray-400">
                        Premium lifestyle services
                      </p>
                    </div>
                  </a>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-3 px-6 rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300">
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