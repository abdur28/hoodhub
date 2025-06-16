"use client";
import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, Scissors } from "lucide-react";

const BarbingCTA = () => {
  return (
    <section className="relative z-0 -mt-8 h-[50vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2340&auto=format&fit=crop"
          alt="Luxury barbershop interior"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlay for better visual hierarchy */}
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">

          {/* Description */}
          <motion.p
            className="text-lg md:text-2xl text-white/90 font-franklin max-w-7xl mx-auto mb-8 md:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the artistry of professional grooming in our premium barbershop. 
            Our master barbers combine traditional techniques with modern style to create 
            the perfect look that defines your personality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex  gap-4 md:gap-6 justify-end items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Primary CTA */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 md:px-10 py-3 md:py-4 text-base md:text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group min-w-[200px]"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Book Appointment
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BarbingCTA;