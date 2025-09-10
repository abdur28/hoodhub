"use client";
import React from "react";
import { motion } from "motion/react";
import { ImageCard } from "@/components/ui/carousel";
import { aboutData, getLocalizedData } from "@/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar } from "lucide-react";

interface AboutProps {
  lang: string;
  dictionary: Dictionary;
}

const About = ({ lang, dictionary }: AboutProps) => {
  const localizedAboutData = getLocalizedData(aboutData, dictionary, 'titleKey', 'categoryKey');

  return (
    <section className="bg-white py-16 rounded-t-4xl -my-8 relative z-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-franklin text-gray-900 mb-6"
        >
          {dictionary.home.about.title}{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {dictionary.home.about.titleHighlight}
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl mx-auto font-franklin"
        >
          {dictionary.home.about.subtitle}
        </motion.p>

                  {/* CTA Buttons */}
          <motion.div
            className="flex gap-4 mt-8 -mb-4 md:gap-6 justify-start items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Primary CTA */}
            <Link href={`/${lang}/book`} className="group">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 md:px-10 py-3 md:py-4 text-base md:text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group min-w-[200px]"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {dictionary.buttons.bookAppointment}
              </Button>
            </Link>
          </motion.div>
      </div>

      {/* Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {localizedAboutData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <ImageCard
                src={item.src}
                title={item.title}
                category={item.category}
                link={item.link}
                className="w-full max-w-sm"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;