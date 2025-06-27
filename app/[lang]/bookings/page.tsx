import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";
import { getUser } from "@/lib/data";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Bookings - HoodHub | Manage Your Appointments",
  description: "View and manage your upcoming and past appointments at HoodHub. Cancel or reschedule your bookings for barbering, tattoo, and lifestyle services.",
  keywords: "my bookings, appointments, manage bookings, cancel appointment, HoodHub",
};

export default async function Bookings() {
  const user = await getUser();

  if (!user) {
    // Redirect to sign-in if not authenticated
    return redirect("/sign-in");
  }

  return <BookingsPage userAsString={JSON.stringify(user)} />;
}