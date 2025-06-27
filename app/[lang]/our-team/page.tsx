import type { Metadata } from "next";
import OurTeamPage from "./OurTeamPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Our Team - HoodHub | Premium Fashion & Lifestyle Services",
  description: "Meet the talented artists and professionals behind HoodHub. Our team of barbers, tattoo artists, and lifestyle experts redefine personal expression.",
  keywords: "HoodHub team, barbers, tattoo artists, lifestyle experts, professionals, stylists",
};

export default async function OurTeam({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <OurTeamPage lang={lang} dictionary={dictionary} />;
}