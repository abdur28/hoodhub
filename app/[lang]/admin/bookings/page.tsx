import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";
import { getDictionary } from '../../dictionaries';

export const metadata: Metadata = {
  title: "Booking Management - Admin | HoodHub",
  description: "Manage all bookings, view schedules, and administer appointments.",
  keywords: "admin, bookings, appointments, schedule, management, HoodHub",
};

export default async function Bookings({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');

  return (
    <BookingsPage 
      lang={lang} 
      dictionary={dictionary}
    />
  );
}