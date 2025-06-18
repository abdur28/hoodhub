import type { Metadata } from "next";
import BarbingPage from "./BarbingPage";

export const metadata: Metadata = {
  title: "Professional Barbing Services - HoodHub | Master Cuts & Styling",
  description: "Experience precision barbering at HoodHub. Our master barbers specialize in classic cuts, modern styles, and luxury grooming services. Book your appointment today.",
  keywords: "barber, haircut, beard styling, men's grooming, luxury barbershop, professional barbing, hair styling",
};

export default function Barbing() {
  return <BarbingPage />;
}