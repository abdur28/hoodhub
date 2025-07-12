"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Diamond, Calendar, MapPin, Scissors, Heart, Sparkles } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { femaleServices, maleServices, getLocalizedData } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "../dictionaries";

interface LifestylePageProps {
  lang: string;
  dictionary: Dictionary;
}

const LifestylePage = ({ lang, dictionary }: LifestylePageProps) => {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  // Localize the services data
  const localizedFemaleServices = getLocalizedData(femaleServices, dictionary, 'titleKey', 'descriptionKey');
  const localizedMaleServices = getLocalizedData(maleServices, dictionary, 'titleKey', 'descriptionKey');
  
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
                {dictionary.lifestyle.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.lifestyle.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              className="text-xs md:text-sm lg:text-base font-franklin text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {dictionary.lifestyle.services.category}
            </motion.p>

            <motion.h2
              className="text-4xl md:text-4xl lg:text-6xl font-franklin mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {dictionary.lifestyle.services.title} <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{dictionary.lifestyle.services.titleHighlight}</span>
            </motion.h2>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-franklin text-gray-700">
                {dictionary.lifestyle.services.description}
              </p>
            </motion.div>
          </div>

          {/* Female Services Section */}
          <div className="mb-24">
            <div className="flex items-center justify-center mb-12">
              <motion.div 
                className="w-20 lg:w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
              <motion.h3
                className="text-3xl md:text-4xl font-franklin mx-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {dictionary.lifestyle.forHer.title} <span className="text-pink-500">{dictionary.lifestyle.forHer.highlight}</span>
              </motion.h3>
              <motion.div 
                className="w-20 lg:w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {localizedFemaleServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setActiveService(service.id)}
                  onHoverEnd={() => setActiveService(null)}
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer">
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={700}
                        height={700}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-franklin font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/90 font-franklin text-sm leading-relaxed">
                        {service.description}
                      </p>
                      
                      {activeService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          <Link href={`/${lang}/book`}>
                            <button className="text-xs bg-yellow-500/90 text-black px-4 py-2 rounded-full font-franklin font-medium">
                              {dictionary.lifestyle.bookNow}
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Separator */}
          <motion.div
            className="mb-24 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-16 bg-gradient-to-b from-yellow-500 to-yellow-600"></div>
              <Sparkles className="w-8 h-8 text-yellow-500 p-1.5 bg-white rounded-full" />
              <div className="w-0.5 h-16 bg-gradient-to-t from-yellow-500 to-yellow-600"></div>
            </div>
          </motion.div>

          {/* Male Services Section */}
          <div>
            <div className="flex items-center justify-center mb-12">
              <motion.div 
                className="w-20 lg:w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
              <motion.h3
                className="text-3xl md:text-4xl font-franklin mx-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {dictionary.lifestyle.forHim.title} <span className="text-blue-500">{dictionary.lifestyle.forHim.highlight}</span>
              </motion.h3>
              <motion.div 
                className="w-20 lg:w-32 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {localizedMaleServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setActiveService(service.id)}
                  onHoverEnd={() => setActiveService(null)}
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 cursor-pointer">
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={700}
                        height={700}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-franklin font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/90 font-franklin text-sm leading-relaxed">
                        {service.description}
                      </p>
                      
                      {activeService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          <Link href={`/${lang}/book`}>
                            <button className="text-xs bg-yellow-500/90 text-black px-4 py-2 rounded-full font-franklin font-medium">
                              {dictionary.lifestyle.bookNow}
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-5xl mx-auto mt-24 mb-16">
            <motion.h2
              className="text-4xl md:text-4xl lg:text-6xl font-franklin text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {dictionary.lifestyle.benefits.title} <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{dictionary.lifestyle.benefits.titleHighlight}</span> {dictionary.lifestyle.benefits.titleEnd}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-franklin font-semibold mb-4">{dictionary.lifestyle.benefits.personalizedCare.title}</h3>
                <p className="text-gray-700">
                  {dictionary.lifestyle.benefits.personalizedCare.description}
                </p>
              </motion.div>
              
              <motion.div
                className="text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Diamond className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-franklin font-semibold mb-4">{dictionary.lifestyle.benefits.premiumProducts.title}</h3>
                <p className="text-gray-700">
                  {dictionary.lifestyle.benefits.premiumProducts.description}
                </p>
              </motion.div>
              
              <motion.div
                className="text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scissors className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-franklin font-semibold mb-4">{dictionary.lifestyle.benefits.masterCraftsmanship.title}</h3>
                <p className="text-gray-700">
                  {dictionary.lifestyle.benefits.masterCraftsmanship.description}
                </p>
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
                {dictionary.lifestyle.cta.title}
              </h2>
              <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl mx-auto">
                {dictionary.lifestyle.cta.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                <div className="flex items-center justify-center text-white/80">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{dictionary.lifestyle.cta.hours}</span>
                </div>
                
                <div className="flex items-center justify-center text-white/80">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{dictionary.barbing.cta.address}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/${lang}/book?service=lifestyle`}>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-franklin px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                >
                  {dictionary.lifestyle.cta.button}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifestylePage;