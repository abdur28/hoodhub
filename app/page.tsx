import About from "@/components/sections/Abouts";
import Hero from "@/components/sections/Hero";
import Barbing from "@/components/sections/Barbing";
import BarbingCTA from "@/components/sections/BarbingCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Barbing />
      <BarbingCTA />
      {/* other sections */}
    </main>
  );
}