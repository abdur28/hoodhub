import type { Metadata } from "next";
import LifestylePage from "./LifestylePage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Lifestyle Services - HoodHub | Wellness & Self-Care",
  description: "Experience luxury lifestyle services at HoodHub including spa treatments, beauty services, and personal styling. Elevate your well-being with our premium offerings.",
  keywords: "spa services, beauty treatments, wellness, personal styling, luxury lifestyle, self-care, premium grooming",
};

export default async function Lifestyle({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <LifestylePage lang={lang} dictionary={dictionary} />;
}