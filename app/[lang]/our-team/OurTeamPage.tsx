"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import {  Instagram, Twitter, MessageCircle, X } from "lucide-react";
import { teamMembers, getLocalizedData } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "../dictionaries";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface OurTeamPageProps {
  lang: string;
  dictionary: Dictionary;
}

const OurTeamPage = ({ lang, dictionary }: OurTeamPageProps) => {
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Localize the team members data
  const localizedTeamMembers = getLocalizedData(teamMembers, dictionary, undefined, undefined, 'nameKey');

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      
      // Initial check
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMember = (id: number) => {
    if (isMobile) {
      setActiveMember(activeMember === id ? null : id);
    }
  };

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
                {dictionary.ourTeam.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.ourTeam.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-franklin text-gray-900 mb-4">
              {dictionary.ourTeam.collective.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-franklin-italic">
              {dictionary.ourTeam.collective.subtitle}
            </p>
          </motion.div>

          {/* Team Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {localizedTeamMembers.map((member) => (
              <motion.div 
                key={member.id}
                variants={item}
                className="group relative overflow-hidden rounded-2xl shadow-xl h-[450px]"
                whileHover={{ y: isMobile ? 0 : -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => toggleMember(member.id)}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    width={700}
                    height={700}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5  to-black/10" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold font-franklin">{member.name}</h3>
                    <p className="text-yellow-400 font-franklin">{member.role}</p>
                  </div>
                  
                  {/* Bio - Conditional display based on device */}
                  <div className={`
                    ${isMobile 
                      ? (activeMember === member.id ? 'max-h-40' : 'max-h-0') 
                      : 'max-h-0 group-hover:max-h-40'} 
                    overflow-hidden transition-all duration-500
                  `}>
                    <p className="text-sm font-light mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.social.instagram} className="hover:text-yellow-400 transition-colors">
                        <Instagram size={20} />
                      </a>
                      <a href={member.social.twitter} className="hover:text-yellow-400 transition-colors">
                        <Twitter size={20} />
                      </a>
                      <a href={member.social.whatsapp} className="hover:text-yellow-400 transition-colors">
                        <MessageCircle size={20} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Close button for mobile when expanded */}
                  {isMobile && activeMember === member.id && (
                    <button 
                      className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-black/50 rounded-full z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMember(null);
                      }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Updated CTA Section */}
      <div className=" py-28 lg:py-32 bg-gradient-to-br from-black to-gray-900 overflow-hidden">
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
              {dictionary.ourTeam.cta.title}
            </h2>
            <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl mx-auto">
              {dictionary.ourTeam.cta.subtitle}
            </p>
            <Link href={`/${lang}/book`}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-franklin px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
              >
                {dictionary.ourTeam.cta.button}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurTeamPage;