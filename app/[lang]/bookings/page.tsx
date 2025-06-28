import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";
import { getUser } from "@/lib/data";
import { redirect } from "next/navigation";
import { getDictionary } from '../dictionaries';

export const metadata: Metadata = {
  title: "My Bookings - HoodHub | Manage Your Appointments",
  description: "View and manage your upcoming and past appointments at HoodHub. Cancel or reschedule your bookings for barbering, tattoo, and lifestyle services.",
  keywords: "my bookings, appointments, manage bookings, cancel appointment, HoodHub",
};

export default async function Bookings({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'ru');
  const user = await getUser();

  if (!user) {
    return redirect(`/${lang}/sign-in`);
  }

  return (
    <BookingsPage 
      lang={lang} 
      dictionary={dictionary}
      userAsString={JSON.stringify(user)}
    />
  );
}