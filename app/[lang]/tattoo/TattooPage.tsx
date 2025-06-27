"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PenTool } from "lucide-react";
import { tattooImages, tattooStyles, tattooArtists } from "@/constants";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

const TattooPage = () => {
  const [activeStyle, setActiveStyle] = useState(0);

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
                Tattoo {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Studio
                </span>
              </h1>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Tattoo Gallery Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-left mb-16">
            <motion.p
              className="text-xs md:text-sm lg:text-base font-franklin text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              ARTISTIC EXPRESSION
            </motion.p>

            <motion.h2
              className="text-4xl md:text-4xl lg:text-6xl font-franklin mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ink Your Story with{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Artistry
              </span>
            </motion.h2>
          </div>

          {/* Gallery Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Large screens: masonry grid */}
            <div className="hidden lg:flex gap-4 h-[600px]">
              {/* First Column */}
              <div className="flex flex-col w-1/3 gap-4">
                <motion.div
                  className="h-2/3 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[0].url}
                    alt={tattooImages[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
                </motion.div>
                <motion.div
                  className="h-3/5 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[1].url}
                    alt={tattooImages[1].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col w-1/3 gap-4">
                <motion.div
                  className="h-3/5 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[2].url}
                    alt={tattooImages[2].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-2/5 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[3].url}
                    alt={tattooImages[3].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Third Column */}
              <div className="flex flex-col w-1/3 gap-4">
                <motion.div
                  className="h-2/3 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[4].url}
                    alt={tattooImages[4].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-3/5 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[5].url}
                    alt={tattooImages[5].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </div>

            {/* Small screens: 2 columns */}
            <div className="lg:hidden flex gap-3 h-[700px]">
              {/* First Column */}
              <div className="flex flex-col w-1/2 gap-3">
                <motion.div
                  className="h-3/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[0].url}
                    alt={tattooImages[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-2/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[1].url}
                    alt={tattooImages[1].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-2/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[2].url}
                    alt={tattooImages[2].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col w-1/2 gap-3">
                <motion.div
                  className="h-2/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    width={700}
                    height={700}
                    src={tattooImages[3].url}
                    alt={tattooImages[3].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-2/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[4].url}
                    alt={tattooImages[4].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="h-3/7 relative overflow-hidden rounded-2xl bg-black group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                                      width={700}
                                      height={700}
                    src={tattooImages[5].url}
                    alt={tattooImages[5].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-2xl font-franklin max-w-7xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Transform your vision into permanent art with our master tattoo artists. 
            We specialize in custom designs that tell your unique story, combining 
            traditional techniques with contemporary artistry to create{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-semibold">
              timeless masterpieces
            </span>
            {" "}{`that you'll treasure forever.`}
          </motion.p>

          {/* Tattoo Styles */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-franklin text-gray-900 mb-6">Artistic Styles We Master</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tattooStyles.map((style, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl transition-all ${
                    activeStyle === index
                      ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveStyle(index)}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                      <PenTool className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-franklin font-semibold text-gray-900">{style.name}</h4>
                      <p className="text-gray-600 font-franklin">{style.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Artists */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-franklin text-gray-900 mb-6">Our Master Artists</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tattooArtists.map((artist, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg md:h-[300px] h-[400px]"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0">
                    <Image
                                        width={700}
                                        height={700}
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h4 className="text-xl font-bold font-franklin">{artist.name}</h4>
                    <p className="text-yellow-400 font-franklin">{artist.specialty}</p>
                  </div>
                  
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-black to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-franklin text-white mb-6">
              Ready to Create Your Masterpiece?
            </h2>
            <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl mx-auto">
              Consult with our artists to bring your vision to life
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-franklin px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
            >
              <Link href="/book?service=tattoo">
              Book Your Consultation
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TattooPage;