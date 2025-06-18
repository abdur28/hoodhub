"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Style Street", "Downtown District, NY 10001"],
      color: "text-yellow-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(123) 456-7890", "Text & WhatsApp Available"],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@hoodhub.com", "info@hoodhub.com"],
      color: "text-blue-500"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Sun: 10AM - 9PM", "Appointments Available"],
      color: "text-purple-500"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav />
      
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
                Get in {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    Touch
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative rounded-t-[4rem] bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${info.color} bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-franklin font-semibold mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 font-franklin">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-franklin mb-8">
                Send us a {" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Message
                </span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-franklin font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                      className="font-franklin"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-franklin font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="font-franklin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-franklin font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      className="font-franklin"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-franklin font-medium text-gray-700">
                      Service Interest
                    </Label>
                    <Select name="service" value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                      <SelectTrigger className="font-franklin w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barbing">Professional Barbing</SelectItem>
                        <SelectItem value="tattoo">Tattoo Artistry</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle Services</SelectItem>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-franklin font-medium text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your vision or any questions you have..."
                    className="font-franklin resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-franklin font-semibold mb-6">
                  Why Choose <span className="text-yellow-500">HoodHub?</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">Expert Artisans</h4>
                      <p className="text-gray-600 font-franklin">Our team of master barbers, tattoo artists, and lifestyle specialists bring years of experience and passion to every service.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">Premium Experience</h4>
                      <p className="text-gray-600 font-franklin">Every appointment is a luxury experience designed to exceed your expectations and enhance your personal style.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">Personalized Service</h4>
                      <p className="text-gray-600 font-franklin">We take time to understand your vision and create customized solutions that reflect your unique personality.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
                <h4 className="text-xl font-franklin font-semibold mb-6 text-center">Quick Actions</h4>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <span className="font-franklin font-medium">Book Appointment</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="font-franklin font-medium">WhatsApp Us</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="font-franklin font-medium">Call Now</span>
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-xl font-franklin font-semibold mb-6 text-center">Follow Our Journey</h4>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-12 h-12 bg-gray-100 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm ${social.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5 text-gray-600" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-franklin mb-4">
              Find <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-lg font-franklin text-gray-600 max-w-2xl mx-auto">
              Located in the heart of the fashion district, our studio is easily accessible and designed for your comfort.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Placeholder for map - you would integrate with Google Maps or similar */}
            <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-franklin font-semibold mb-2">Interactive Map</h3>
                <p className="text-gray-600 font-franklin">
                  123 Style Street, Downtown District, NY 10001
                </p>
                <button className="mt-4 bg-yellow-500 text-black px-6 py-3 rounded-full font-franklin font-medium hover:bg-yellow-600 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;