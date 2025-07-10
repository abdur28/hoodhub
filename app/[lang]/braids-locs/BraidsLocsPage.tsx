"use client";
import React from "react";
import { motion } from "framer-motion";
import { Crown, Calendar, MapPin, Sparkles } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "../dictionaries";
import { braidsLocsImages } from "@/constants";

interface BraidsLocsPageProps {
  lang: string;
  dictionary: Dictionary;
}

const BraidsLocsPage = ({ lang, dictionary }: BraidsLocsPageProps) => {

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
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
          <Navbar variant="transparent" lang={lang} dictionary={dictionary} />
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
                {dictionary.braidsLocs.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.braidsLocs.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* First Content Block - Mobile: Image then Text, Desktop: Image Left, Text Right */}
          <div className="mb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Image */}
              <motion.div 
                className="w-full lg:w-1/2 order-1 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative h-[500px] lg:h-[600px] w-full rounded-4xl overflow-hidden bg-black group">
                  <Image
                    width={700}
                    height={700}
                    src={braidsLocsImages[0].url}
                    alt={braidsLocsImages[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div 
                className="w-full lg:w-1/2 order-2 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-xs md:text-sm lg:text-base font-franklin text-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {dictionary.braidsLocs.content.category}
                </motion.p>

                <motion.h2
                  className="text-4xl md:text-4xl lg:text-6xl font-franklin mb-6 md:mb-10 lg:mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {dictionary.braidsLocs.content.title1}
                </motion.h2>

                <motion.p
                  className="text-lg font-franklin text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {dictionary.braidsLocs.content.description1}
                </motion.p>

                {/* Decorative Element */}
                <motion.div
                  className="mt-8 flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-16 lg:w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                    <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                    <div className="w-16 lg:w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Second Content Block - Mobile: Image then Text, Desktop: Text Left, Image Right */}
          <div className="mb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text Content - Desktop Order */}
              <motion.div 
                className="w-full lg:w-1/2 order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-4xl md:text-4xl lg:text-6xl font-franklin mb-6 md:mb-10 lg:mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {dictionary.braidsLocs.content.title2}
                </motion.h2>

                <motion.p
                  className="text-lg font-franklin text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {dictionary.braidsLocs.content.description2}
                </motion.p>

                {/* Decorative Element */}
                <motion.div
                  className="mt-8 flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-16 lg:w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                    <div className="w-16 lg:w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Image - Desktop Order */}
              <motion.div 
                className="w-full lg:w-1/2 order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative h-[500px] lg:h-[600px] w-full rounded-4xl overflow-hidden bg-black group">
                  <Image
                    width={700}
                    height={700}
                    src={braidsLocsImages[1].url}
                    alt={braidsLocsImages[1].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
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
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-franklin text-white mb-6">
                {dictionary.braidsLocs.cta.title}
              </h2>
              <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl">
                {dictionary.braidsLocs.cta.subtitle}
              </p>
              
                <div className="flex items-center justify-center text-white/80 mb-4">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{dictionary.barbing.cta.hours}</span>
                </div>
                
                <div className="flex items-center justify-center text-white/80">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{dictionary.barbing.cta.address}</span>
                </div>
       
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/${lang}/book?service=braidslocks`}>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-franklin px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                >
                  {dictionary.braidsLocs.cta.button}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BraidsLocsPage;