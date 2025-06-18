import type { Metadata } from "next";
import OurTeamPage from "./OurTeamPage";

export const metadata: Metadata = {
  title: "Our Team - HoodHub | Premium Fashion & Lifestyle Services",
  description: "Meet the talented artists and professionals behind HoodHub. Our team of barbers, tattoo artists, and lifestyle experts redefine personal expression.",
};

export default function OurTeam() {
  return <OurTeamPage />;
}