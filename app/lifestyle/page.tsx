import type { Metadata } from "next";
import LifestylePage from "./LifestylePage";

export const metadata: Metadata = {
  title: "Lifestyle Services - HoodHub | Wellness & Self-Care",
  description: "Experience luxury lifestyle services at HoodHub including spa treatments, beauty services, and personal styling. Elevate your well-being with our premium offerings.",
  keywords: "spa services, beauty treatments, wellness, personal styling, luxury lifestyle, self-care, premium grooming",
};

export default function Lifestyle() {
  return <LifestylePage />;
}