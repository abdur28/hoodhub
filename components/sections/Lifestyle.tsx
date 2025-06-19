"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, Diamond } from "lucide-react";
import { femaleServices, maleServices } from "@/constants";
import Link from "next/link";



const Lifestyle = () => {
  const [activeGender, setActiveGender] = useState<"male" | "female">("female");
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = activeGender === "male" ? maleServices : femaleServices;

  return (
    <section className="bg-white relative z-10 -mt-8 rounded-4xl py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Subtitle */}
          <motion.p
            className="text-xs md:text-sm lg:text-base font-franklin text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PREMIUM LIFESTYLE SERVICES
          </motion.p>

          {/* Title */}
          <motion.h2
            className="text-4xl md:text-4xl lg:text-6xl font-franklin  mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Lifestyle
            </span>
          </motion.h2>

          {/* Gender Toggle */}
          <motion.div
            className="inline-flex bg-gray-100 rounded-full p-1 "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setActiveGender("female")}
              className={`relative px-8 py-3 rounded-full font-franklin font-medium transition-all duration-300 ${
                activeGender === "female"
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {activeGender === "female" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Her</span>
            </button>
            <button
              onClick={() => setActiveGender("male")}
              className={`relative px-8 py-3 rounded-full font-franklin font-medium transition-all duration-300 ${
                activeGender === "male"
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {activeGender === "male" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Him</span>
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGender}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Service Card */}
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* Title */}
                      <h3 className="text-2xl font-franklin font-semibold text-white mb-2">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 font-franklin text-sm leading-relaxed">
                        {service.description}
                      </p>

                      {hoveredService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <button className="text-xs bg-yellow-500/90 text-black px-4 py-2 rounded-full font-franklin font-medium">
                        <Link href='/book'>
                          Book Now
                        </Link>
                        </button>
                      </motion.div>
                    )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-20 lg:w-32 h-0.25 md:h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
              <Diamond className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              <div className="w-20 lg:w-32 h-0.25 md:h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </div>
        </motion.div>

        {/* Bottom Section with Description and CTA */}
        <div className="text-center">
          {/* Motto */}
          <motion.p
            className="text-lg md:text-2xl font-franklin max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the epitome of{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-semibold">
              luxury
            </span>
            {" "}and{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-semibold">
              self-care
            </span>
            {" "}with our premium lifestyle services designed to enhance your personal style and well-being
          </motion.p>



          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
              <Link href='/book?service=lifestyle' className="group">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 md:px-10 py-3 md:py-4 text-base md:text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group min-w-[200px]"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Book Consultation
              </Button>
              </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;