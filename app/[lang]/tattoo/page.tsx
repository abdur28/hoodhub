import type { Metadata } from "next";
import TattooPage from "./TattooPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Premium Tattoo Artistry - HoodHub | Custom Ink Masterpieces",
  description: "Transform your vision into permanent art with HoodHub's master tattoo artists. Custom designs, contemporary styles, and timeless masterpieces.",
  keywords: "tattoo artist, custom tattoo, ink art, tattoo design, permanent art, tattoo studio",
};

export default async function Tattoo({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <TattooPage lang={lang} dictionary={dictionary} />;
}