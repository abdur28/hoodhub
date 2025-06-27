
import type { Metadata } from "next";
import OurStoryPage from "./OurStoryPage";

export const metadata: Metadata = {
  title: "Our Story - HoodHub | Premium Fashion & Lifestyle Services",
  description: "Discover the journey of HoodHub, where artistry meets precision in premium barbering, tattoo artistry, and luxury lifestyle services.",
};

export default function OurStory() {
  return <OurStoryPage />;
}