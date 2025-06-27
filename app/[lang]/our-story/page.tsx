import type { Metadata } from "next";
import OurStoryPage from "./OurStoryPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Our Story - HoodHub | Premium Fashion & Lifestyle Services",
  description: "Discover the journey of HoodHub, where artistry meets precision in premium barbering, tattoo artistry, and luxury lifestyle services.",
  keywords: "HoodHub story, company history, brand journey, artistry, craftsmanship, premium services",
};

export default async function OurStory({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <OurStoryPage lang={lang} dictionary={dictionary} />;
}