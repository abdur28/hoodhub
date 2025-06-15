import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Placeholder content to demonstrate floating navbar */}
      <section className="h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-franklin-condensed font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg font-franklin text-gray-600 dark:text-gray-300">
            Scroll back up to see the floating navbar in action
          </p>
        </div>
      </section>
      
      <section className="h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-franklin-condensed font-bold text-gray-900 dark:text-white mb-4">
            About HoodHub
          </h2>
          <p className="text-lg font-franklin text-gray-600 dark:text-gray-300">
            More content sections here...
          </p>
        </div>
      </section>
    </main>
  );
}