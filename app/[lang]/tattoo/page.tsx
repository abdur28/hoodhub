import type { Metadata } from "next";
import TattooPage from "./TattooPage";

export const metadata: Metadata = {
  title: "Premium Tattoo Artistry - HoodHub | Custom Ink Masterpieces",
  description: "Transform your vision into permanent art with HoodHub's master tattoo artists. Custom designs, contemporary styles, and timeless masterpieces.",
};

export default function Tattoo() {
  return <TattooPage />;
}