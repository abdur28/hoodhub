"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Navbar from "@/components/Navbar";
import { Diamond, Star } from "lucide-react";
import { storyPhases, getLocalizedData } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "../dictionaries";

interface OurStoryPageProps {
  lang: string;
  dictionary: Dictionary;
}

const OurStoryPage = ({ lang, dictionary }: OurStoryPageProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Localize the story phases
  const localizedStoryPhases = getLocalizedData(storyPhases, dictionary, 'titleKey', 'contentKey');
  // We need to also handle the subtitle separately since it uses subtitleKey
  const localizedStoryPhasesWithSubtitle = localizedStoryPhases.map(phase => {
    if (phase.subtitleKey) {
      const keys = phase.subtitleKey.split(".");
      let value = dictionary;
      for (const key of keys) {
        value = value[key as keyof typeof value] as any;
      }
      return { ...phase, subtitle: value };
    }
    return phase;
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Initialize on mount
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform scroll progress to image index
  const imageIndex = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, localizedStoryPhasesWithSubtitle.length - 1]
  );

  // Update active phase based on scroll
  useEffect(() => {
    const unsubscribe = imageIndex.on("change", (value) => {
      setActivePhase(Math.floor(value));
    });
    
    return () => unsubscribe();
  }, [imageIndex]);

  // Calculate phase progress for animations
  const getPhaseProgress = (index: number) => {
    return useTransform(
      scrollYProgress,
      [
        (index - 0.5) / localizedStoryPhasesWithSubtitle.length,
        index / localizedStoryPhasesWithSubtitle.length,
        (index + 0.5) / localizedStoryPhasesWithSubtitle.length,
      ],
      [0, 1, 0]
    );
  };

  const isMobile = windowSize.width < 1024;

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
      {/* Section 1: Hero */}
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
            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-franklin text-white">
                {dictionary.ourStory.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.ourStory.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1.5: Story Introduction */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-franklin text-gray-900 mb-4">
              {dictionary.ourStory.genesis.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-franklin-italic">
              {dictionary.ourStory.genesis.subtitle}
            </p>
          </motion.div>

          {/* Expanded Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-2xl p-8 shadow-lg font-franklin"
            >
              <h3 className="text-2xl mb-4">{dictionary.ourStory.philosophy.title}</h3>
              <p className="text-gray-700 mb-4">
                {dictionary.ourStory.philosophy.paragraph1}
              </p>
              <p className="text-gray-700">
                {dictionary.ourStory.philosophy.paragraph2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TextGenerateEffect
                words={dictionary.ourStory.textEffect.content}
                className="text-gray-900 text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
                filter={true}
                duration={0.03}
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-center"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="p-4 rounded-full bg-gradient-to-r from-yellow-400/10 to-yellow-600/10"
                >
                  <Diamond className="w-8 h-8 text-yellow-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Scroll-based Journey */}
      <section className="relative bg-white">
        <div ref={targetRef} className="relative">
          {/* Mobile Progress Indicator */}
          {isMobile && (
            <div className="sticky top-5 z-5 px-4 mb-4 flex justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {localizedStoryPhasesWithSubtitle[activePhase]?.subtitle || "2019"}
                </span>
                <div className="flex items-center space-x-1">
                  {localizedStoryPhasesWithSubtitle.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === activePhase ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="sticky top-0 h-screen flex flex-col lg:flex-row">
            {/* Left Side - Sticky Images */}
            <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full bg-black overflow-hidden">
              {isMobile ? (
                // Mobile version - single image at a time
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b`} />
                    <Image
                      width={700}
                      height={700}
                      src={localizedStoryPhasesWithSubtitle[activePhase]?.image}
                      alt={localizedStoryPhasesWithSubtitle[activePhase]?.title || "HoodHub Story"}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Overlay Content */}
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 text-yellow-400">
                          {localizedStoryPhasesWithSubtitle[activePhase].icon && typeof localizedStoryPhasesWithSubtitle[activePhase].icon === "function" ?
                            React.createElement(localizedStoryPhasesWithSubtitle[activePhase].icon) : 
                            <Star className="w-8 h-8" />
                          }
                        </div>
                        <span className="text-yellow-400 text-2xl font-bold">
                          {localizedStoryPhasesWithSubtitle[activePhase]?.subtitle || "2019"}
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold">
                        {localizedStoryPhasesWithSubtitle[activePhase]?.title || "The Vision"}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                // Desktop version
                <AnimatePresence>
                  {localizedStoryPhasesWithSubtitle.map((phase, index) => {
                    const progress = getPhaseProgress(index);
                    const scale = useTransform(progress, [0, 1], [1.05, 1]);
                    
                    return (
                      <motion.div
                        key={phase.id}
                        style={{ 
                          opacity: progress,
                          scale,
                          zIndex: activePhase === index ? 10 : 1
                        }}
                        className="absolute inset-0"
                        initial={false}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-b `} />
                        <Image
                          width={700}
                          height={700}
                          src={phase.image}
                          alt={phase.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Image Overlay Content */}
                        <div className="absolute bottom-8 left-8 text-white">
                          <motion.div
                            style={{ opacity: progress }}
                            className="flex items-center gap-3 mb-4"
                          >
                            <phase.icon className="w-8 h-8 text-yellow-400" />
                            <span className="text-yellow-400 text-2xl font-bold">
                              {phase.subtitle}
                            </span>
                          </motion.div>
                          <motion.h3
                            style={{ opacity: progress }}
                            className="text-4xl font-bold"
                          >
                            {phase.title}
                          </motion.h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Right Side - Scrolling Content */}
            <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full bg-white">
              {isMobile ? (
                // Mobile version - single centered content
                <div className="h-full w-full flex items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full max-w-md px-4"
                    >
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-8 text-yellow-500">
                          {localizedStoryPhasesWithSubtitle[activePhase].icon && typeof localizedStoryPhasesWithSubtitle[activePhase].icon === "function" ?
                            React.createElement(localizedStoryPhasesWithSubtitle[activePhase].icon) : 
                            <Star className="w-8 h-8" />
                          }
                        </div>
                        <span className="text-yellow-500 text-xl font-bold">
                          {localizedStoryPhasesWithSubtitle[activePhase]?.subtitle || "2019"}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                        {localizedStoryPhasesWithSubtitle[activePhase]?.title || "The Vision"}
                      </h2>
                      
                      <p className="text-lg leading-relaxed font-franklin text-gray-700 mb-8 text-center">
                        {localizedStoryPhasesWithSubtitle[activePhase]?.content || ""}
                      </p>
                      
                      <div className="flex justify-center">
                        <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                // Desktop version
                localizedStoryPhasesWithSubtitle.map((phase, index) => {
                  const progress = getPhaseProgress(index);
                  const y = useTransform(progress, [0, 1], [30, 0]);
                  
                  return (
                    <motion.div
                      key={phase.id}
                      style={{ 
                        opacity: progress,
                        y,
                        zIndex: activePhase === index ? 10 : 1,
                      }}
                      className="absolute inset-0 flex items-center justify-center p-8"
                    >
                      <div className="max-w-lg w-full text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                          <phase.icon className="w-8 h-8 text-yellow-500" />
                          <span className="text-yellow-500 text-xl font-bold">
                            {phase.subtitle}
                          </span>
                        </div>
                        
                        <motion.h2 
                          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                          style={{ y }}
                        >
                          {phase.title}
                        </motion.h2>
                        
                        <motion.p 
                          className="text-lg md:text-xl font-franklin leading-relaxed text-gray-700 mb-8"
                          style={{ y }}
                        >
                          {phase.content}
                        </motion.p>
                        
                        <motion.div
                          style={{ opacity: progress }}
                          className="flex justify-center lg:justify-start"
                        >
                          <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Spacer for scroll height */}
          <div style={{ height: `${localizedStoryPhasesWithSubtitle.length * 100}vh` }} />
        </div>

        {/* Final CTA Section */}
        <div className="relative py-24 lg:py-32 bg-gradient-to-br from-black to-gray-900">
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
                {dictionary.ourStory.cta.title}
              </h2>
              <p className="text-xl font-franklin text-white/80 mb-8 max-w-2xl mx-auto">
                {dictionary.ourStory.cta.subtitle}
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
                  {dictionary.ourStory.cta.button}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;