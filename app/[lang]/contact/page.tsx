import type { Metadata } from "next";
import ContactPage from "./ContactPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Contact Us - HoodHub | Get in Touch",
  description: "Contact HoodHub for appointments, consultations, and inquiries. Visit our premium barbering, tattoo, and lifestyle studio in the heart of the city.",
  keywords: "contact, appointment, booking, consultation, barbershop, tattoo studio, lifestyle services",
};

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <ContactPage lang={lang} dictionary={dictionary} />;
}