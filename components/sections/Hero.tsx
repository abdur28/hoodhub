"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { heroImages } from "@/constants";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface HeroProps {
  lang: string;
  dictionary: Dictionary;
}

const Hero = ({ lang, dictionary }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    // Set first load to false after initial render
    const firstLoadTimer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 100);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000); // Change image every 12 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(firstLoadTimer);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] lg:h-[95vh] w-full overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0 bg-black">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: isFirstLoad ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              <Image
                width={1000}
                height={1000}
                src={heroImages[currentImageIndex].url.mobile}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover lg:hidden"
              />
              <Image
                width={1000}
                height={1000}
                src={heroImages[currentImageIndex].url.desktop}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover hidden lg:block"
              />
              {/* Dark overlay for better text readability if needed later */}
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Transparent Navbar */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
        </div>

      </section>
    </div>
  );
};

export default Hero;