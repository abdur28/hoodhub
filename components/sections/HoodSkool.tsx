"use client";
import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { EdgeCarousel, ShopCard } from "@/components/ui/carousel";
import Link from "next/link";
import { hoodskoolProducts } from "@/constants";
import { Button } from "../ui/button";

const HoodSkool = () => {
  return (
    <section className="bg-black relative z-0 -mt-8 py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Header Section */}
        <div className="flex flex-row items-end justify-between gap-6 mb-12">
          <div>
            {/* Subtitle */}
            <motion.p
              className="text-xs md:text-sm lg:text-base font-franklin text-white/90"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Fashion Meets{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Lifestyle
              </span>
            </motion.p>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-4xl lg:text-6xl font-franklin text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              HoodSkool
              
            </motion.h2>
          </div>

          {/* Shop All Link */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="https://hoodskool.com/" 
              className="inline-flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-300 group"
            >
              <span className="font-franklin text-lg">Shop All</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl font-franklin text-gray-300 max-w-3xl leading-relaxed mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Discover our curated collection of premium streetwear, accessories, and lifestyle essentials. 
          Each piece is carefully selected to embody the essence of contemporary urban culture.
        </motion.p>
      </div>

      {/* Edge-to-Edge Product Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <EdgeCarousel>
          {hoodskoolProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
              viewport={{ once: true }}
            >
              <ShopCard
                id={product.id}
                src={product.src}
                title={product.title}
                price={product.price}
                category={product.category}
                link={product.link}
              />
            </motion.div>
          ))}
        </EdgeCarousel>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        viewport={{ once: true }}
      >
        <Link 
          href="https://hoodskool.com/"
        >
            <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 md:px-10 py-3 md:py-4 text-base md:text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group min-w-[200px]"
                >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore Full Collection
            </Button>
          
        </Link>
      </motion.div>
    </section>
  );
};

export default HoodSkool;