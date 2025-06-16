"use client";
import React from "react";
import { motion } from "motion/react";
import { EdgeCarousel, ImageCard } from "@/components/ui/carousel";
import { aboutData } from "@/constants";


const About = () => {
  return (
    <section className="bg-white  py-16 rounded-t-4xl -my-8 relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-franklin text-gray-900 mb-6"
        >
          Where Style Meets{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Artistry
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl mx-auto font-franklin"
        >
          At HoodHub, we transform personal expression into art. Our skilled professionals 
          combine traditional craftsmanship with modern innovation to deliver experiences 
          that exceed expectations.
        </motion.p>
      </div>

      {/* Edge-to-Edge Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <EdgeCarousel>
          {aboutData.map((item) => (
            <ImageCard
              key={item.id}
              src={item.src}
              title={item.title}
              category={item.category}
            />
          ))}
        </EdgeCarousel>
      </motion.div>
    </section>
  );
};

export default About;