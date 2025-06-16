import About from "@/components/sections/Abouts";
import Hero from "@/components/sections/Hero";
import Barbing from "@/components/sections/Barbing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Barbing />
      {/* other sections */}
    </main>
  );
}