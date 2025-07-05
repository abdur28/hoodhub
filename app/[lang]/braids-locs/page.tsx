import type { Metadata } from "next";
import BraidsLocsPage from "./BraidsLocsPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Braids & Locs - HoodHub | Professional Hair Braiding & Loc Services",
  description: "Expert braiding and loc services at HoodHub. Professional styling for natural hair with precision and artistry. Book your appointment today.",
  keywords: "braids, locs, dreadlocks, natural hair, hair braiding, protective styles, HoodHub",
};

export default async function BraidsLocs({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  
  return <BraidsLocsPage lang={lang} dictionary={dictionary} />;
}