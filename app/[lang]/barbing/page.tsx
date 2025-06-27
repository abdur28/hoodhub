import type { Metadata } from "next";
import BarbingPage from "./BarbingPage";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Professional Barbing Services - HoodHub | Master Cuts & Styling",
  description: "Experience precision barbering at HoodHub. Our master barbers specialize in classic cuts, modern styles, and luxury grooming services. Book your appointment today.",
  keywords: "barber, haircut, beard styling, men's grooming, luxury barbershop, professional barbing, hair styling",
};

export default async function Barbing({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return <BarbingPage lang={lang} dictionary={dictionary} />;
}