"use client";
import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <div className="relative z-40">
        <Navbar variant="transparent" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[200%] h-[200%]"
          animate={{
            x: ["-25%", "-75%", "-25%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: `radial-gradient(circle, rgba(180,83,9,0.08) 0%, rgba(0,0,0,0) 70%)`
          }}
        />
        
        <motion.div 
          className="absolute top-3/4 left-3/4 w-[150%] h-[150%]"
          animate={{
            x: ["-50%", "-90%", "-50%"],
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: `radial-gradient(circle, rgba(120,53,15,0.06) 0%, rgba(0,0,0,0) 70%)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-max"
        >

          {/* Auth Component Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl mb-20 shadow-2xl overflow-hidden"
          >
              {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}