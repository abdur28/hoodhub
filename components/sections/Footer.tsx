"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Scissors,
  PaintBucket,
  Diamond,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  lang: string;
  dictionary: Dictionary;
}

const Footer = ({ lang, dictionary }: FooterProps) => {
  const [email, setEmail] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const services = [
    { name: dictionary.footer.services.barbing.haircuts, href: `/${lang}/barbing`, icon: Scissors },
    { name: dictionary.footer.services.barbing.beard, href: `/${lang}/barbing`, icon: Scissors },
    { name: dictionary.footer.services.tattoo.custom, href: `/${lang}/tattoo`, icon: PaintBucket },
    { name: dictionary.footer.services.tattoo.consultation, href: `/${lang}/tattoo`, icon: PaintBucket },
    { name: dictionary.footer.services.lifestyle.spa, href: `/${lang}/lifestyle`, icon: Diamond },
    { name: dictionary.footer.services.lifestyle.style, href: `/${lang}/lifestyle`, icon: Diamond },
  ];

  const quickLinks = [
    { name: dictionary.footer.quickLinks.about, href: `/${lang}/our-story` },
    { name: dictionary.footer.quickLinks.book, href: `/${lang}/book` },
    { name: dictionary.footer.quickLinks.team, href: `/${lang}/our-team` },
    { name: dictionary.footer.quickLinks.careers, href: `/${lang}/contact` },
    { name: dictionary.footer.quickLinks.faq, href: `/${lang}/faq` },
    { name: dictionary.footer.quickLinks.contact, href: `/${lang}/contact` },
  ];

  const legalLinks = [
    { name: dictionary.footer.legal.privacy, href: `/${lang}/privacy-policy` },
    { name: dictionary.footer.legal.terms, href: `/${lang}/terms` },
  ];

  return (
    <footer className="bg-white relative overflow-hidden rounded-t-4xl -mt-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <section className="border-b border-gray-200 pb-8 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-franklin font-semibold mb-4">
                  {dictionary.footer.newsletter.title}{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {dictionary.footer.newsletter.titleHighlight}
                  </span>
                </h3>
                <p className="text-gray-600 font-franklin max-w-md">
                  {dictionary.footer.newsletter.subtitle}
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dictionary.footer.newsletter.placeholder}
                  className="px-6 py-4 bg-gray-50 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 font-franklin focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-w-[300px]"
                  required
                />
                <Button
                  type="submit"
                  className="h-max bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-franklin font-semibold px-8 py-4 rounded-full hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-all duration-300 group"
                >
                  {dictionary.footer.newsletter.subscribe}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Main Footer Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* Company Info - Always Visible */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link href={`/${lang}`} className="inline-block mb-6">
                  <h2 className="font-franklin-condensed text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    HoodHub
                  </h2>
                </Link>
                
                <p className="text-gray-600 font-franklin leading-relaxed mb-6">
                  {dictionary.footer.company.description}
                </p>

                {/* Contact Info - Collapsible on Mobile */}
                <div className="lg:block">
                  {/* Mobile Collapsible */}
                  <div className="lg:hidden">
                    <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                        <h3 className="font-franklin font-semibold text-lg text-gray-900">{dictionary.footer.contact.title}</h3>
                        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${contactOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-franklin">{dictionary.footer.contact.address}</p>
                              <p className="text-gray-600 font-franklin">{dictionary.footer.contact.city}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <a href={`tel:${dictionary.footer.contact.phone}`} className="text-gray-900 font-franklin hover:text-yellow-500 transition-colors">
                              {dictionary.footer.contact.phone}
                            </a>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <a href={`mailto:${dictionary.footer.contact.email}`} className="text-gray-900 font-franklin hover:text-yellow-500 transition-colors">
                              {dictionary.footer.contact.email}
                            </a>
                          </div>

                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-gray-900 font-franklin">{dictionary.footer.contact.hours}</p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Desktop Always Visible */}
                  <div className="hidden lg:block space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-franklin text-sm">{dictionary.footer.contact.address}</p>
                        <p className="text-gray-600 font-franklin text-sm">{dictionary.footer.contact.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <a href={`tel:${dictionary.footer.contact.phone}`} className="text-gray-900 font-franklin text-sm hover:text-yellow-500 transition-colors">
                        {dictionary.footer.contact.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <a href={`mailto:${dictionary.footer.contact.email}`} className="text-gray-900 text-sm font-franklin hover:text-yellow-500 transition-colors">
                        {dictionary.footer.contact.email}
                      </a>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-franklin text-sm">{dictionary.footer.contact.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Services - Collapsible on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {/* Mobile Collapsible */}
                <div className="lg:hidden">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <h3 className="font-franklin font-semibold text-xl text-gray-900">{dictionary.footer.services.title}</h3>
                      <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-6">
                      <ul className="space-y-3">
                        {services.map((service, index) => (
                          <li key={index}>
                            <Link
                              href={service.href}
                              className="flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors duration-300 group"
                            >
                              <service.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                              <span className="font-franklin">{service.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Desktop Always Visible */}
                <div className="hidden lg:block">
                  <h3 className="font-franklin font-semibold text-xl mb-6 text-gray-900">{dictionary.footer.services.title}</h3>
                  <ul className="space-y-3">
                    {services.map((service, index) => (
                      <li key={index}>
                        <Link
                          href={service.href}
                          className="flex items-center gap-3 text-gray-600 hover:text-yellow-500 transition-colors duration-300 group"
                        >
                          <service.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-franklin">{service.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Quick Links - Collapsible on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Mobile Collapsible */}
                <div className="lg:hidden">
                  <Collapsible open={quickLinksOpen} onOpenChange={setQuickLinksOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <h3 className="font-franklin font-semibold text-xl text-gray-900">{dictionary.footer.quickLinks.title}</h3>
                      <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${quickLinksOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-6">
                      <ul className="space-y-3">
                        {quickLinks.map((link, index) => (
                          <li key={index}>
                            <Link
                              href={link.href}
                              className="text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-franklin"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* HoodSkool Link */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-franklin font-semibold text-lg mb-3 text-gray-900">{dictionary.footer.fashion.title}</h4>
                        <Link
                          href="https://hoodskool.com/"
                          className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-300 group"
                        >
                          <span className="font-franklin">{dictionary.footer.fashion.visit}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Desktop Always Visible */}
                <div className="hidden lg:block">
                  <h3 className="font-franklin font-semibold text-xl mb-6 text-gray-900">{dictionary.footer.quickLinks.title}</h3>
                  <ul className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-franklin"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* HoodSkool Link */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-franklin font-semibold text-lg mb-3 text-gray-900">{dictionary.footer.fashion.title}</h4>
                    <Link
                      href="https://hoodskool.com/"
                      className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-300 group"
                    >
                      <span className="font-franklin">{dictionary.footer.fashion.visit}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Social Media - Always Visible */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="font-franklin font-semibold text-xl mb-6 text-gray-900">{dictionary.footer.social.title}</h3>
                
                {/* Social Media */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Copyright */}
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-600 font-franklin"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span>{dictionary.footer.legal.copyright}</span>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-franklin text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;