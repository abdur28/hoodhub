"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] lg:h-[95vh] w-full overflow-hidden">
        {/* Background - Placeholder for carousel */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Placeholder for future carousel images */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]" />
        </div>

        {/* Transparent Navbar */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-franklin-condensed text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Premium Fashion &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                Lifestyle
              </span>{" "}
              Services
            </h1>
            <p className="font-franklin text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Experience luxury barbering, tattoo artistry, and premium lifestyle services 
              at HoodHub. Where style meets excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 py-4 rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105">
                Book Appointment
              </button>
              <button className="border-2 border-white/30 text-white font-franklin font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
                Explore Services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center text-white/60">
            <span className="font-franklin text-sm mb-2">Scroll Down</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;