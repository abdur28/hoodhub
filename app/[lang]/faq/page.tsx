import type { Metadata } from "next";
import FAQPage from "./FAQPage";

export const metadata: Metadata = {
  title: "FAQ - HoodHub | Frequently Asked Questions",
  description: "Get answers to common questions about HoodHub's barbering, tattoo artistry, and lifestyle services. Learn about booking, pricing, and what to expect.",
  keywords: "FAQ, questions, booking, pricing, barbering, tattoo, lifestyle services, appointments",
};

export default function FAQ() {
  return <FAQPage />;
}