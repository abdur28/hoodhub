import About from "@/components/sections/Abouts";
import Hero from "@/components/sections/Hero";
import Barbing from "@/components/sections/Barbing";
import BarbingCTA from "@/components/sections/BarbingCTA";
import Tattoo from "@/components/sections/Tattoo";
import Lifestyle from "@/components/sections/Lifestyle";
import HoodSkool from "@/components/sections/HoodSkool";
import { getDictionary } from './dictionaries';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <main className="min-h-screen overflow-hidden">
      <Hero lang={lang} dictionary={dictionary} />
      <About lang={lang} dictionary={dictionary} />
      <Barbing lang={lang} dictionary={dictionary} />
      <BarbingCTA lang={lang} dictionary={dictionary} />
      <Tattoo lang={lang} dictionary={dictionary} />
      <Lifestyle lang={lang} dictionary={dictionary} />
      <HoodSkool lang={lang} dictionary={dictionary} />
    </main>
  );
}