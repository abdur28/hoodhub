"use client";
import React, { useState, useEffect } from "react";
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
  Youtube,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Dictionary } from "../dictionaries";

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

interface ContactPageProps {
  lang: string;
  dictionary: Dictionary;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const ContactPage = ({ lang, dictionary }: ContactPageProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous status messages when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: "" });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    if (formStatus.type) {
      setFormStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: result.message || 'Your message has been sent successfully! We\'ll get back to you soon.'
        });
        
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      } else {
        setFormStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: "contactPage.info.visit.title",
      detailsKey: "contactPage.info.visit.details",
      color: "text-yellow-500"
    },
    {
      icon: Phone,
      titleKey: "contactPage.info.call.title", 
      detailsKey: "contactPage.info.call.details",
      color: "text-green-500"
    },
    {
      icon: Mail,
      titleKey: "contactPage.info.email.title",
      detailsKey: "contactPage.info.email.details",
      color: "text-blue-500"
    },
    {
      icon: Clock,
      titleKey: "contactPage.info.hours.title",
      detailsKey: "contactPage.info.hours.details",
      color: "text-purple-500"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/hoodhubmsk/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <FloatingNav lang={lang} dictionary={dictionary} />
      
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
                {dictionary.contactPage.hero.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.contactPage.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative rounded-t-4xl bg-white py-20 lg:py-32 -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              // Get title from dictionary
              const titleKeys = info.titleKey.split(".");
              let title = dictionary;
              for (const key of titleKeys) {
                title = title[key as keyof typeof title] as any;
              }

              // Get details from dictionary
              const detailsKeys = info.detailsKey.split(".");
              let details = dictionary;
              for (const key of detailsKeys) {
                details = details[key as keyof typeof details] as any;
              }

              return (
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
                  <h3 className="text-xl font-franklin font-semibold mb-3">{title as any}</h3>
                  {Array.isArray(details) ? details.map((detail, i) => (
                    <p key={i} className="text-gray-600 font-franklin">{detail}</p>
                  )) : <p className="text-gray-600 font-franklin">{details as any}</p>}
                </motion.div>
              );
            })}
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
                {dictionary.contactPage.form.title} {" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {dictionary.contactPage.form.titleHighlight}
                </span>
              </h2>
              
              {/* Status Message */}
              {formStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    formStatus.type === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {formStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <p className="font-franklin">{formStatus.message}</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-franklin font-medium text-gray-700">
                      {dictionary.contactPage.form.name} *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder={dictionary.contactPage.form.namePlaceholder}
                      className="font-franklin"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-franklin font-medium text-gray-700">
                      {dictionary.contactPage.form.email} *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder={dictionary.contactPage.form.emailPlaceholder}
                      className="font-franklin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-franklin font-medium text-gray-700">
                      {dictionary.contactPage.form.phone}
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder={dictionary.contactPage.form.phonePlaceholder}
                      className="font-franklin"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-franklin font-medium text-gray-700">
                      {dictionary.contactPage.form.service}
                    </Label>
                    <Select 
                      name="service" 
                      value={formData.service} 
                      onValueChange={handleSelectChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="font-franklin w-full">
                        <SelectValue placeholder={dictionary.contactPage.form.servicePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barbing">{dictionary.contactPage.form.services.barbing}</SelectItem>
                        <SelectItem value="tattoo">{dictionary.contactPage.form.services.tattoo}</SelectItem>
                        <SelectItem value="lifestyle">{dictionary.contactPage.form.services.lifestyle}</SelectItem>
                        <SelectItem value="consultation">{dictionary.contactPage.form.services.consultation}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-franklin font-medium text-gray-700">
                    {dictionary.contactPage.form.message} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    placeholder={dictionary.contactPage.form.messagePlaceholder}
                    className="font-franklin resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold py-4 text-lg hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      {dictionary.contactPage.form.submit}
                    </>
                  )}
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
                  {dictionary.contactPage.whyChoose.title} <span className="text-yellow-500">{dictionary.contactPage.whyChoose.titleHighlight}</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">{dictionary.contactPage.whyChoose.experts.title}</h4>
                      <p className="text-gray-600 font-franklin">{dictionary.contactPage.whyChoose.experts.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">{dictionary.contactPage.whyChoose.premium.title}</h4>
                      <p className="text-gray-600 font-franklin">{dictionary.contactPage.whyChoose.premium.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-franklin font-semibold mb-1">{dictionary.contactPage.whyChoose.personalized.title}</h4>
                      <p className="text-gray-600 font-franklin">{dictionary.contactPage.whyChoose.personalized.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
                <h4 className="text-xl font-franklin font-semibold mb-6 text-center">{dictionary.contactPage.quickActions.title}</h4>
                
                <div className="space-y-4">
                  <Link href={`/${lang}/book`} className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <span className="font-franklin font-medium">{dictionary.contactPage.quickActions.book}</span>
                  </Link>

                  <Link href='https://wa.me/+79776000146' className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="font-franklin font-medium">{dictionary.contactPage.quickActions.whatsapp}</span>
                  </Link>
                  
                  <Link href='tel:+79776000146' className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-xl transition-colors duration-300 shadow-sm">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="font-franklin font-medium">{dictionary.contactPage.quickActions.call}</span>
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-xl font-franklin font-semibold mb-6 text-center">{dictionary.contactPage.social.title}</h4>
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
              {dictionary.contactPage.map.title} <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{dictionary.contactPage.map.titleHighlight}</span>
            </h2>
            <p className="text-lg font-franklin text-gray-600 max-w-2xl mx-auto">
              {dictionary.contactPage.map.description}
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Map />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;