"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Scissors } from "lucide-react";
import { barbingImages } from "@/constants";

const Barbing = () => {
  const [selectedImage, setSelectedImage] = useState(barbingImages[0]);

  return (
    <section className="bg-neutral-200 relative z-10 rounded-b-4xl py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Images Section - Left on large, top on small */}
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
                  className={`relative h-[60px] w-[60px] md:h-[80px] md:w-[80px]  rounded-full overflow-hidden transition-all duration-300 ${
                    selectedImage.id === image.id
                      ? "ring-3 ring-yellow-500 ring-offset-2 ring-offset-neutral-200"
                      : "hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 hover:ring-offset-neutral-200"
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

          {/* Content Section - Right on large, bottom on small */}
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
              PROFESSIONAL BARBING
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

            {/* Motto */}
            <motion.p
              className="text-lg md:text-2xl text-right font-franklin-italic text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Where precision meets{" "}
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent font-semibold">
                passion
              </span>
              {", "}
              crafting the perfect cut that defines your{" "}
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent font-semibold">
                style
              </span>
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              className="mt-8 flex justify-center  "
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
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
  );
};

export default Barbing;