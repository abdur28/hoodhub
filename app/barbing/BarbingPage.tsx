"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Diamond, Calendar, MapPin } from "lucide-react";
import { barbingImages, barbingServices } from "@/constants";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";

const BarbingPage = () => {
  const [selectedImage, setSelectedImage] = useState(barbingImages[0]);
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[200%] h-[200%]"
            animate={{
              x: ["-25%", "-75%", "-25%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `radial-gradient(circle, rgba(180,83,9,0.15) 0%, rgba(0,0,0,0) 70%)`
            }}
          />
          
          <motion.div 
            className="absolute top-3/4 left-3/4 w-[150%] h-[150%]"
            animate={{
              x: ["-50%", "-90%", "-50%"],
              rotate: [360, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `radial-gradient(circle, rgba(120,53,15,0.1) 0%, rgba(0,0,0,0) 70%)`
            }}
          />
        </div>

        {/* Transparent Navbar */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <Navbar variant="transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-franklin text-white">
                Premium {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    Barbering
                </span>
              </h1>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Barbing Experience Section */}
      <section className="relative rounded-t-[4rem] bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            {/* Images Section */}
            <motion.div 
              className="w-full lg:w-1/2 order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Main Display Image */}
              <div className="relative mb-6">
                <motion.div
                  key={selectedImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-[500px] lg:h-[600px] w-full rounded-4xl overflow-hidden bg-black group"
                >
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                </motion.div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex justify-end gap-3 md:gap-4">
                {barbingImages.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-full overflow-hidden transition-all duration-300 ${
                      selectedImage.id === image.id
                        ? "ring-3 ring-yellow-500 ring-offset-2 ring-offset-white"
                        : "hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 hover:ring-offset-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="w-full lg:w-1/2 order-2 lg:order-2 text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Subtitle */}
              <motion.p
                className="text-xs md:text-sm lg:text-base font-franklin text-gray-700 "
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                LUXURY GROOMING EXPERIENCE
              </motion.p>

              {/* Title */}
              <motion.h2
                className="text-4xl md:text-4xl lg:text-6xl font-franklin mb-6 md:mb-10 lg:mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Master the Art of Grooming
              </motion.h2>

              {/* Description */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-franklin text-gray-700 mb-4">
                  At HoodHub, barbering is elevated to an art form. Our master barbers combine 
                  traditional techniques with modern innovation to create styles that reflect 
                  your individuality.
                </p>
                <p className="text-lg font-franklin text-gray-700">
                  Each appointment is a personalized experience where craftsmanship meets 
                  luxury, resulting in not just a haircut, but a transformation.
                </p>
              </motion.div>

              {/* Services */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-franklin text-gray-900 mb-6">Our Signature Services</h3>
                
                <div className="space-y-4">
                  {barbingServices.map((service, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        activeService === index
                          ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveService(index)}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start">
                        <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                          <Scissors className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-franklin font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-gray-600 font-franklin">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-20 lg:w-32 h-0.25 md:h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  <Scissors className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                  <div className="w-20 lg:w-32 h-0.25 md:h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-black to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex flex-col items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-4xl md:text-5xl font-franklin text-white mb-6">
                Ready for Transformation?
              </h2>
              <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl">
                Book your premium grooming experience with our master barbers
              </p>
              
              <div className="flex items-center text-white/80 mb-4">
                <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                <span>Mon-Sun: 10am - 9pm</span>
              </div>
              
              <div className="flex items-center text-white/80">
                <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                <span>123 Style Street, Fashion District, Moscow</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-franklin px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
              >
                Book Your Appointment
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarbingPage;