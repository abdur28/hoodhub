import About from "@/components/sections/Abouts";
import Hero from "@/components/sections/Hero";
import Barbing from "@/components/sections/Barbing";
import BarbingCTA from "@/components/sections/BarbingCTA";
import Tattoo from "@/components/sections/Tattoo";
import Lifestyle from "@/components/sections/Lifestyle";
import HoodSkool from "@/components/sections/HoodSkool";

export default function Home() {
  return (
    <main className="min-h-screen  overflow-hidden">
      <Hero />
      <About />
      <Barbing />
      <BarbingCTA />
      <Tattoo />
      <Lifestyle />
      <HoodSkool />
      {/* other sections */}
    </main>
  );
}