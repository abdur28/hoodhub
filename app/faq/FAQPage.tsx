"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown,
  MessageCircle
} from "lucide-react";
import { faqSections } from "@/constants";
import Link from "next/link";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
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
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    FAQ
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-franklin mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg font-franklin text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about our services, booking process, and what to expect during your visit to HoodHub.
            </p>
          </motion.div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 ${section.color} bg-gray-100 rounded-full flex items-center justify-center`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-franklin font-semibold">{section.title}</h3>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <Collapsible
                      key={faq.id}
                      open={openItems[faq.id]}
                      onOpenChange={() => toggleItem(faq.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <motion.div
                          className="flex items-center justify-between w-full p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-300 text-left"
                          whileHover={{ y: -2 }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-franklin font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h4>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                              openItems[faq.id] ? 'rotate-180' : ''
                            }`}
                          />
                        </motion.div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <motion.div
                          className="px-6 pb-6 pt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-600 font-franklin leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>
                {/* Contact CTA */}
        <div
            className="py-28 text-center p-8 text-white"
          >
            <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-franklin font-semibold mb-4">
              Still have questions?
            </h3>
            <p className=" font-franklin mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-franklin px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-gray-300 text-gray-700 font-franklin px-6 py-3 rounded-full hover:border-yellow-400 transition-all duration-300"
              >
                <Link href="/book">
                  Book Consultation
                </Link>
              </motion.button>
            </div>
          </div>
    </div>
  );
};

export default FAQPage;