import type { Metadata } from "next";
import BookPage from "./BookPage";
import { getUser } from "@/lib/data";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "Book Appointment - HoodHub | Schedule Your Service",
  description: "Book your appointment at HoodHub for premium barbering, tattoo artistry, and lifestyle services.",
  keywords: "book appointment, booking, barbering, tattoo, lifestyle services, HoodHub",
};

export default async function Book({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: any;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  const user = await getUser();
  const { service: selectedService, referralCode: referralCode } = await searchParams;

  return (
    <BookPage 
      lang={lang} 
      dictionary={dictionary}
      userAsString={user ? JSON.stringify(user) : ""}
      selectedService={selectedService}
      referral={referralCode}
    />
  );
}