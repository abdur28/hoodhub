import About from "@/components/sections/Abouts";
import Hero from "@/components/sections/Hero";
import Barbing from "@/components/sections/Barbing";
import BarbingCTA from "@/components/sections/BarbingCTA";
import Tattoo from "@/components/sections/Tattoo";
import Lifestyle from "@/components/sections/Lifestyle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Barbing />
      <BarbingCTA />
      <Tattoo />
      <Lifestyle />
      {/* other sections */}
    </main>
  );
}